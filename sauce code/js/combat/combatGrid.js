env.ADVANCE_RATE = 1000

/*
    a new 2D version of the combat system, allowing us to use a stage-like presentation for more advanced combat
    this main class is the top-level thing that's added to the DOM to start combat!
    it will manage teams and turns, delegating to lesser classes for rendering and interaction

    NOTABLY - this will work the same as env.rpg! it will occupy env.rpg like a regular fight would, and be compatible with many functions that interact with it
*/
class CombatScene extends HTMLElement {
    /************************************
    *************************************
                INIT ZONE
    *************************************
    ************************************/
    // the scenario needs to be provided at construction
    // this is NOT when combat is initialized, we just get things ready
    constructor() {
        super()

        this.scenario = CombatScene.SCENARIOS[this.getAttribute('scenario')]
        if (!this.scenario) {
            let er = `scenario ${this.getAttribute('scenario')} is not defined in CombatScene.SCENARIOS`
            printError(er, true)
            throw er
        }

        this.scenario.name = this.getAttribute('scenario')

        takePartySnapshot(this.scenario.name) // snapshot may not be used everywhere but it's a safe assumption

        this.turnData = { turn: 0 }
        this.grid = document.createElement('combat-grid')
        this.grid.classList.add("grid-plane")
        this.grid.scene = this
        this.grid.scenario = this.scenario
        this.grid.style.setProperty("--playercontrol-rotation-raw", "135")
        this.grid.style.setProperty("--playercontrol-tilt-raw", "30")
        if(this.scenario.combatClass) {
            this.scenario.combatClass.split(" ").forEach(cc =>this.classList.add(cc))
        }
        this.id = "combat"
        this.state = false

        this.keypress = (e) => { 
            if(env.rpg.turnData) if(!env.rpg.turnData.twistRefresh) {env.rpg.turnData.twistRefresh = true; env.rpg.refresh()}

            if(e.key.toLowerCase() == "shift" && env.rpg.state == "normal" && !env.currentDialogue?.active && env.rpg.currentTeam.name == "ally") {
                env.rpg.state = "looking"

            } else if(!this.pauseControls) this.playerCamControl(e.key.toLowerCase()) 
        }

        this.keyup = (e) => {
            if(!env.currentDialogue?.active && e.key.toLowerCase() === 'shift' && env.rpg.state == "looking" && env.rpg.currentTeam.name == "ally") {
                env.rpg.state = 'normal'
            }
        }

        this.toggleLooking = () => {
            if(env.rpg.currentTeam.name != "ally") return;

            if(env.rpg.state == "looking") {
                env.rpg.state = "normal"
            } else {
                if(env.rpg.state == "normal") {
                    env.rpg.state = "looking"
                }
            }
        }

        document.addEventListener('keydown', this.keypress)
        document.addEventListener('keyup', this.keyup)
        
        /* this ended up being too janky (CSS scaling busted shit up big time bc of no perspective) but maybe eventually we'll use it
        this.wheel = (e) => this.playerZoomControl(e)
        document.addEventListener('wheel', this.wheel, {passive: true})
        */
    }

    //automatically called when the element is added to the DOM
    //this is essentially the equivalent to startCombat - it's all initialized when added
    //i know this all seems pretty redundant but we're basically making a sequel to the system within the same game
    //enough is changed in various places to where a combined function would get a little wack
    connectedCallback() {
        try {
        body.classList.add('in-combat', 'nomenus', 'in-grid-combat')
        this.appendChild(this.grid) // the grid needs to be added before we load in actors and combat data (spawn reasons)

        this.classList.add("intro", "team-intro")
        this.insertAdjacentHTML('beforeend', `
            <div id="enemy-team" class="team"></div>
            <div id="ally-team" class="team"></div>
            <div class="key-navigator">
                <div class="stage-arrows">
                    <div class="up" key="w" onclick="javascript:env.rpg.playerCamControl('w')"><i class="cicon ci-up"></i></div>
                    <div class="left" key="a" onclick="javascript:env.rpg.playerCamControl('a')"><i class="cicon ci-left"></i></div>
                    <div class="down" key="s" onclick="javascript:env.rpg.playerCamControl('s')"><i class="cicon ci-down"></i></div>
                    <div class="right" key="d" onclick="javascript:env.rpg.playerCamControl('d')"><i class="cicon ci-right"></i></div>
                    <div class="look" key="hold shift" definition="NOTICE::'toggles LOOKING mode';'click on tile to move camera';'only functions during ally movement phase'" onclick="javascript:env.rpg.toggleLooking()"><i class="cicon ci-nav"></i></div>
                </div>
            </div>
        `)

        //env.rpg initialization
        env.rpg = this
        env.rpg.active = true
        env.rpg.settings = this.scenario
        env.rpg.turnOrder = []
        env.rpg.teams = []
        env.rpg.actors = {}
        env.rpg.actorList = []
        env.rpg.entCount = 0
        env.rpg.globalListeners = {}
        env.rpg.telegraphQueue = []
        env.rpg.highlightedActors = new Set()
        createRPGeffectMessage()
    
        env.rpg.enemyTeam = {name: "enemy", members: []}
        env.rpg.allyTeam = {name: "ally", members: []}
        env.rpg.neutralTeam = {name: "neutral", members: []}
        
        env.rpg.teams.push(env.rpg.allyTeam, env.rpg.enemyTeam)
        env.rpg.is2D = true

        //team initialization
        this.partyLimit = page?.party?.partyLimit || 100 // bet you wont
        let initAllyTeam = this.scenario.initAllyTeam()
        initAllyTeam.forEach((member, i) => {
            if(i >= this.partyLimit ) return
    
            let newActor = initializeActor(member,
                {
                    team: env.rpg.allyTeam,
                    enemyTeam: env.rpg.enemyTeam,
                    matchPartyHP: true,
                    usePartySlug: (member.components || member.critta) ? true : false //for generated chars, set their combat actor slug to their party slug
                }
            )
    
            if(this.scenario.actorPreprocess) this.scenario.actorPreprocess(newActor)
            if(newActor.base?.events?.onInitialize) newActor.base.events.onInitialize(newActor)
    
            //determine any overrides or extra actions
            newActor.member = member
            newActor.actions = getAlteredActorActions({member, actor: newActor})
        });
    
        let initEnemyTeam = this.scenario.initEnemyTeam()
        initEnemyTeam.forEach(member => {
            let newActor = initializeActor(member,
                {
                    team: env.rpg.enemyTeam,
                    enemyTeam: env.rpg.allyTeam,
                    uniqify: true
                }
            )
    
            if(this.scenario.actorPreprocess) this.scenario.actorPreprocess(newActor)
            if(newActor.base?.events?.onInitialize) newActor.base.events.onInitialize(newActor)
            newActor.actions = getAlteredActorActions({member: newActor, actor: newActor})
        });

        //UI initialization
        //creates turn order, actor panels, then spawn on grid
        env.rpg.teams.forEach((team, i) => {
            env.rpg.turnOrder = env.rpg.turnOrder.concat(team.members);
            team.members.forEach((actor, i) => {
                initializeActorUI({actor, team})
                actor.box.classList.add('compactor')
                if(actor.statusEffects.length) triggerStatusEvents({target: actor, eventName: "onCombatStart"})

                //find a good spawn point on the grid
                let spawnPool
                if(this.grid.spawnPoints[actor.base.slug]?.length) { spawnPool = actor.base.slug }
                else if(this.grid.spawnPoints[team.name]?.length) { spawnPool = team.name }
                else spawnPool = "lastresort"

                console.log("actor", actor, "spawn pool", spawnPool)

                let spawnPoint = this.grid.spawnPoints[spawnPool].sample({remove: true});
                if(this.grid.spawnPoints[spawnPool].length == 0) delete this.grid.spawnPoints[spawnPool];

                //create an actor object on the chosen tile
                spawnPoint.createActor(actor)
            });
        });

        env.rpg.querySelectorAll('.sprite, .daemon').forEach(e=>{
            e.style.animationDelay = `-${Math.random() * 10}s`
        })

        MUI("prohibit")
        env.setTimeout(()=>{
            MUI("deprohibit")
            this.classList.remove('intro', 'team-intro');
            body.classList.add('cull-stage')
            content.classList.remove('show-vn')
        }, this.grid.scenario.hardOpen ? 0 : 1000);
   
        //start at end of list so it loops around
        this.currentActorIndex = env.rpg.turnOrder.length - 1
        this.currentActor = env.rpg.turnOrder[env.rpg.currentActorIndex]
        if(env.rpg.turnOrder[0].piece) env.rpg.turnOrder[0].piece.focusOnTile()
        updateStats()

        setTimeout(() => advanceTurn(), 100)

        if(this.scenario.bgm) { // remember this is a function in this version
            let bgm = this.scenario.bgm()
            toggleBgm(bgm, true)
            setTimeout(()=>{
                if(this.scenario.bgmRate) {
                    ratween(env.bgm, this.scenario.bgmRate)
                    env.bgm.intendedRate = this.scenario.bgmRate || 1
                } else env.bgm.intendedRate = env.bgm.rate()
            }, 100)
        }
        if(this.scenario.bgmStart) env.bgm.seek(this.scenario.bgmStart)
        if(this.scenario.bgmVol) { env.bgm.volume(getModifiedVolume('music', this.scenario.bgmVol)); env.bgm.intendedVol = this.scenario.bgmVol }
        if(this.scenario.startCallback) this.scenario.startCallback();
        } catch(e) { alert(e); console.log(e) }
    }

    refresh() { // what's the point of refreshing?
        // i ask myself this constantly.
        // why does firefox eventually inexplicably start rendering at a lower frame rate under the same conditions,
        // unless we slightly jostle the RPG frame for 10 milliseconds periodically?
        // i guess we have to jumpscare the browser with a GPU transform on the containing element periodically
        // so it doesn't doze off? wtf
        // i almost wish this didn't work cause it'd be easier to go like 'oh well, that's just how it runs'
        if(!isFirefoxOnWindows()) return;
        env.rpg.classList.add("refresh-anim")
        setTimeout(()=>env.rpg.classList.remove("refresh-anim"), 10)
    }

    /************************************
    *************************************
             RPG MANAGEMENT
    *************************************
    ************************************/
    // reroutes from the old system to allow us to override things like enemyTurn, etc

    //controls enemy AI
    enemyTurn(enemy) {
        if(!enemy.piece) return; // enemies have to have pieces in this gamemode
        //clearTimeout(env.rpg.enemyBugout)
        
        /*
        //we don't start this during cutscenes
        if(!env.currentDialogue?.active) env.rpg.enemyBugout = setTimeout(()=>{
            if( // if an enemy turn has been taking 20s
                env.rpg.currentActor == enemy &&
                !env?.currentDialogue?.active
            ) {
                chatter({actor: 'bugout', text: `pobem maybe detected`, readout: true})
                console.log(
                    "BUGOUT triggered",
                    "!env.rpg.buttondrop:", !env.rpg.buttondrop,
                    "(enemy turn stuck):", env.rpg.currentActor.team.name == "enemy" && env.rpg.bugoutState.enemyGoing,
                    "(pathfinding slow):", env.rpg.lastPathfindPerformance > 20,
                    "(scene state stuck):", env.rpg.state && env.rpg.state == env.rpg.bugoutState.sceneState,
                    "(beenEnding):", env.rpg.bugoutState.beenEnding,
                    "(turn going weirdly long):", env.rpg.bugoutState.ticks > 4 && !env.rpg.turnData?.showingActions && !env.rpg.turnData.endingTurn
                );
                env.rpg.insertAdjacentHTML("beforeend", `<button class="panicbutton" onclick="startDialogue('bugout')" definition="INTERNAL CONTEXT::'heyyy thanks for using my framing device %-P';'looks like something might b busted sorrry dude';'but its ok i got u';'i made a little guy 2 help';'u know what they say about expiermental technogogy';'::ATTENTION:INVALID SPACING SYNTAX\n\n'If u didnt break it u didnt use it'\n      - johnythan\n\n'::ERROR:INVALID CONTEXT">panic button</button>`); 
            }
        }, 20000)
        */

        //account for actor distances in target pools - initially unsorted
        //console.log("enemy_actordist", performance.now())
        let actorDistances = enemy.piece.getActorDistance({includeSelf: true})
        //console.log("enemy_actordist", performance.now())
        /*
            actorDistances becomes an array i.e.
            [
                {
                    actor: {... actor object ( can access team name via actor.team.name )},
                    endDistance: #, (how far enemy is if they follow the path to this actor. if 1, then there's a valid path all the way to right next to the actor. if higher, then can't get into melee range)
                    pathDistance: #, (how many steps the enemy needs to take to get to the end distance)
                    rawDistance: #, (how far the enemy is at the start (includes end tile, so do this - 1 for "space between"))
                    path: [array of combat-tiles], (the steps needed to be taken. can take this into account for movement)
                }
            ] 
        */

        //we want to collect possible action paths - these are in descending order of priority for default AI
        let actionMap = {
            inRange: [],
            inRangeIfMove: [],
            outOfRange: []
        }
        
        let actionNamePool = enemy.actions
        if(hasStatus(enemy, "windup") && enemy.windupActions) { actionNamePool = enemy.windupActions }
        else if(!enemy.windupActions) { removeStatus(enemy, "windup") } 

        const eligible = (action, actor) => {
            //check a special eligibility thingy before anything else
            let good = true
            if(action.specialEligibility) {
                good = action.specialEligibility({user: enemy, target: actor});
            }
            if(!good) return false;

            let type = action.type
            if(type.includes('autohit')) {
                return actor.slug == enemy.slug
            } else if (type.includes('support') && type.includes('rez')) {
                return actor.team.name === 'enemy' && actor.state === 'dead'
            } else if (type.includes('support') && !type.includes('self')) {
                return actor.team.name === 'enemy' && actor.state !== 'dead'
            } else if (type.includes('support')) {
                return actor.team.name === 'enemy' && actor.state !== 'dead' && actor.slug != enemy.slug
            } else if (type.includes('rez')) {
                return actor.team.name === 'enemy' && actor.state === 'dead'
            } else if (type.includes('target')) {
                return actor.team.name === 'ally' && actor.state !== 'dead'
            } else {
                return true;
            }
        }

        const addAction = (type, actor, action, tile, info) => {
            const actionObj = { type, actor, action, tile, info };
            if (type === 'act') {
                actionMap.inRange.push(actionObj);
            } else if (type === 'moveact') {
                actionMap.inRangeIfMove.push(actionObj);
            } else if (type === 'oor') {
                actionMap.outOfRange.push(actionObj);
            }
        }

        // note - "priority target" is not something that's supported right now unlike in the normal system
        // targeting system as a whole is different so we'll need to figure that out later if it matters
        // also enemies don't consider if there's a valid path for pathRequires yet because I didn't need that
        actorDistances.forEach(dist => {
            actionNamePool.forEach(actionName => {
                let action = env.ACTIONS[actionName]
                let usable = true

                //action-based disable checks
                // like disable if but in the opposite direction specifically for enemy AI. might seem redundant but there's a lot of "only if team is enemy then disable" type stuff
                if(action.enemyUsageIf) usable = action.enemyUsageIf(enemy, {actorDistances}) 
                if(usable && action.disableIf) usable = !action.disableIf(enemy)

                //avoidChaining filtering - some abilities shouldn't be used repeatedly
                if(enemy.lastUsed) if(enemy.lastUsed.avoidChaining && (action.slug == enemy.lastUsed.slug)) usable = false

                // determine movement
                if (usable) {
                    let range = (action?.stats?.range || action.range || 1)
                    let move = (enemy.move === 0 ? 0 : enemy.move || 3) + (enemy?.effectiveStats?.moveMod || 0)
                    if(action.type == "autohit") range = 0; //means it's an instant cast

                    /* 
                        valid pools: 
                        
                        ACT: An action must be in range, and have LOS (or ignore LOS).
                        MOVEACT: An action must be in range + movement, and have LOS in a valid tile in the movement, WITHIN the range.
                        OOR: An action must be out of range.

                        ACT LOS fail: we should traverse the path between actors until we find something that's next best. If it's movable, then we send to MOVEACT instead.
                        MOVEACT fail: if the endtile doesn't have LOS, downgrade to OOR.
                    */

                    // rawDistance includes the end tile btw
                    if (dist.rawDistance <= range) { // in range on paper
                        // check for LOS here - if none, then downgrade to MOVEACT and don't do this add.
                        let LOS = action.ignoresLOS || enemy.piece.tile.hasSightLineTo(dist.actor.piece.tile)
                        if (LOS && eligible(action, dist.actor)) { return addAction('act', dist.actor, action, null, dist) }
                    }
                    
                    // in range and usable this turn if they move
                    if (
                        (dist.rawDistance <= move + range) &&
                        (dist.path.length - 1) <= move && 
                        dist.endDistance <= range
                    )  {
                        /* let's assume the enemy has 5 move, and this action has a range of 3, and the end distance is 2
                            0, oor
                            1, oor
                            2, oor
                            3, ir+LOS
                            4, ir+LOS

                            slice the array to start at dist.path.length (5) - range (3)

                            we want to go to the closest tile that's in range (ir) and has line of sight (LOS)
                            therefore, we need to slice the dist.path array to only be the in-range tiles (as in, in range of the action, the 'range' variable)
                            but remember, there's also dist.endDistance, which tells us how far away the last tile in dist.path is from the target.
                            but since this is after the check for dist.endDistance <= range, there should always be at least one tile in the slice
                        */

                        if (eligible(action, dist.actor)) {
                            let inRangeTiles = dist.path.slice(dist.path.length - range)
                            let selectedTile

                            //console.log("current in range tiles", inRangeTiles)

                            if(action.ignoresLOS) {
                                selectedTile = inRangeTiles[0]
                            } else {
                                selectedTile = inRangeTiles.find(tile => tile.hasSightLineTo(dist.actor.piece.tile))
                            }

                            //console.log(enemy.slug, dist, inRangeTiles, selectedTile)
                            if(selectedTile) return addAction('moveact', dist.actor, action, selectedTile, dist)
                        }
                    }

                    // can't use this turn even with movement, so just find a way to get closer (even if invalid)
                    if (eligible(action, dist.actor)) return addAction('oor', dist.actor, action, dist.path[move] || dist.path[dist.path.length - 1], dist)
                }
            })
        })
        //console.log("enemy_actioncheck", performance.now())
        //console.log("enemy selections are", actionMap)

        //so we can avoid cases where enemies dance between targets in outOfRangeMove and flounder around obstacles
        //if they focus on one target until a better one comes along, that'd work better
        let actorActionSelection = {actor: enemy, action: env.ACTIONS["nothing"]}
        let pool
        if(actionMap.inRange.length && actionMap.inRangeIfMove.length) pool = actionMap.inRange.concat(actionMap.inRangeIfMove)
        else if(actionMap.inRange.length) pool = actionMap.inRange
        else if(actionMap.inRangeIfMove.length) pool = actionMap.inRangeIfMove
        else if(actionMap.outOfRange.length) pool = actionMap.outOfRange
        else {
            // will this ever happen?
            throw 'hello this shouldnt happen probably but there are no valid actions in the action map'
        }

        actorActionSelection = pool.sample()

        /* 
            DISPLAY ACTION STEPS
            enemies show their work
        */
        const executionTime = env.ADVANCE_RATE * 0.33;
        let steps = 0
        let action = actorActionSelection.action
        let target = actorActionSelection.actor
        let selectedTile = target.piece.tile

        //variance is an integer indicating i.e. "can be selected tile, OR variance-sized square around selected tile"
        //this can cheat range, but it's fine
        if(action?.aoe?.variance) {
            console.log("!!!! VARIANCE")
            let variance = this.grid.markTiles({
                originTile: selectedTile,
                shape: "square",
                size: action.aoe.variance,
                includesOrigin: true
            })

            console.log("variance is", variance)
            selectedTile = variance.sample()
            console.log("final is,", selectedTile)            
        }

        this.targetingFor = {actor: enemy, action, selectedTile}
        // focus on actor only if it'd meaningfully affect the camera
        if(
            enemy.piece.getDistance(env.rpg.lastActor) > 4
        ) {
            enemy.piece.focusOnTile()
        }

        let actionCallback = () => {
            setTimeout(()=>{
                try {
                    var actionResult
                    switch(action.type.includes('special')) {					
                        case true:
                            if(action.aoe) this.grid.handleActionAOE({originActor: enemy, targetTile: selectedTile, action})
                            else useAction(enemy, action, target);
                        break;

                        default: 
                            setTimeout(()=>{ advanceTurn(enemy)}, env.ADVANCE_RATE);

                            if(action.aoe) { // we don't useAction if it's an AOE, that has its own useAction execution
                                console.log("detected aoe", action.aoe, action)
                                this.grid.handleActionAOE({originActor: enemy, targetTile: selectedTile, action})
                            } else {
                                actionResult = useAction(enemy, action, target);
                                
                                //animate if needed
                                if(action.anim && enemy.sprite) {
                                    enemy.sprite.classList.add(action.anim);
                                    setTimeout(function(){
                                        enemy.sprite.classList.remove(action.anim)
                                    }, action.animDuration ? (action.animDuration + 100) : 600);
                                }
    
                                //also handle any special frameClass similarly, but with a little more of a delay on removal
                                if(action.frameClass) {
                                    env.rpg.classList.add(action.frameClass);
                                    setTimeout(function(){
                                        env.rpg.classList.remove(action.frameClass)
                                    }, action.animDuration ? (action.animDuration + 400) : 1000);
                                }
    
                                switch(actionResult.hit) {
                                    case "crit":
                                        reactDialogue(enemy, 'crit');
                                        break;
                                    case true:
                                        reactDialogue(enemy, 'hit');
                                        break;
                                    case false:
                                        reactDialogue(enemy, 'miss');
                                        break;
                                    case "nothing":
                                        break;
                                }
                            }				
                    }
                } catch(e) {printError(e); printError('proceeding to next turn', false); setTimeout(()=>advanceTurn(enemy), env.ADVANCE_RATE); }
            }, actorActionSelection.type == "act" ? env.ADVANCE_RATE : 0);
        }

        let actionAnimationCallback = () => {
            let innerSteps = 0
            if(!action.type.includes("autohit") && action.range != 0) {
                // Show the targeting range of the selected action
                if(action.targeting != "special") setTimeout(() => {
                    enemy.piece.startTargeting(action)
                }, executionTime * innerSteps++)
        
                // Highlight the selected target's tile
                setTimeout(() => {
                    selectedTile.classList.add('enemy-targeted')
                    selectedTile.focusOnThisTile()

                    //todo: this is redundant and should be combined with combatTile onMouseEnter's func somehow
                    if(action.aoe) {
                        this.uncleanedTargets = this.grid.getAoETargets({
                            tile: selectedTile,
                            actor: enemy,
                            action: action,
                            actingOn: "valid",
                            onEachValidTile: ({tile, data}) => {                    
                                //console.log("in each valid tile", tile, data)
                                if(tile.piece) {
                                    if(action.aoe.canHit) 
                                        if(!action.aoe.canHit(enemy, tile.piece.actor))
                                            return;
            
                                    tile.piece.actor.highlight("tile")
                                }
                                
                                tile.classList.add("aoe-preview")
                                if(action.beneficial) tile.classList.add("aoe-preview-beneficial")
                            }
                        })

                        env.rpg.uncleanedClasses = ["aoe-preview", "aoe-preview-beneficial"]
                    }
                }, executionTime * innerSteps++)
            }

            //hide the selection and attack!
            setTimeout(() => {
                //todo: combine this with combatTile's onmouseleave event, it's copied
                if(this.uncleanedTargets) {
                    this.uncleanedTargets.forEach(tile=>{
                        tile.classList.remove(... env.rpg.uncleanedClasses)
                        if(tile.piece) tile.piece.actor.highlight(false)
                    })
                    delete this.uncleanedTargets
                }

                selectedTile.classList.remove('enemy-targeted')
                if(enemy.piece) enemy.piece.endTargeting()
                actionCallback()
            }, executionTime * innerSteps++)
        }

        // we first display movement plans if the enemy has any
        if(actorActionSelection.type == 'moveact' || (actorActionSelection.type == 'oor' && actorActionSelection.tile != enemy.piece.tile)) {
            // If the enemy is moving, display the enemy's movement
            setTimeout(() => {
                enemy.piece.startMovement()
            }, executionTime * steps++)

            // Show selected tile the enemy is moving to
            setTimeout(() => {
                actorActionSelection.tile.classList.add('enemy-moving-to')
            }, executionTime * steps++)


            // Trigger the enemy moving to that tile
            setTimeout(() => {
                actorActionSelection.tile.classList.remove('enemy-moving-to')
                try {
                    enemy.piece.endMovement()
                    switch(actorActionSelection.type) {
                        case 'moveact':
                            enemy.piece.stepToTile(actorActionSelection.tile, {endCallback: actionAnimationCallback})
                        break

                        case 'oor':
                            enemy.lastUsed = false

                            if(actorActionSelection?.info?.pathDistance) enemy.piece.stepToTile(actorActionSelection.tile, {endCallback: ()=>setTimeout(()=>advanceTurn(enemy), env.ADVANCE_RATE)})
                            else advanceTurn(enemy)
                        break
                    }
                } catch(e) { // enemy died during turn movement
                    console.warn(e, "enemy died during turn movement")
                    advanceTurn(enemy)
                }
            }, executionTime * steps++)
        } else if(actorActionSelection.type == 'act') {
            enemy.lastUsed = false
            actionAnimationCallback()
        } else if(actorActionSelection.type == 'oor') {
            enemy.lastUsed = false
            advanceTurn(enemy)
        }
    }

    //player related stuff
    //this happens in a few spots in advanceTurn if it's a valid advance
    advanceMod(position, {skipped = false, upcomingActor} = {}) {
        switch(position) {
            case "prehalt": // done before checking if the advance should be stopped, useful for telegraphed actions
                if( // we only go in here if a turn was halted, AND last actor != this actor. (in case of multi-turns)
                    (this.grid.tileEffects.length && !env.rpg.haltedAttempt) &&
                    (env.rpg.currentActor != env.rpg.lastActor)
                ) {
                    //console.log("effectAdvance", performance.now())
                    this.grid.advanceTileEffects({prevActor: env.rpg.currentActor, actor: upcomingActor})
                    //console.log("effectAdvance", performance.now())

                    //halt and execute any telegraphs
                    if(env.rpg.telegraphQueue.length) {
                        env.rpg.halt = "telegraph"
                    }
                }
                
                // end movement phase for current actor if necessary
                //console.log("advancemod before", performance.now())
                if(this.currentActor.piece) this.currentActor.piece.classList.remove("acting")

                if(this.grid?.movableTiles) {
                    //custom call instead of just piece.endMovement since pieces are removed on death and it can get weird
                    this.grid.movableTiles.forEach(tile=>tile.classList.remove("movable"))
                    delete this.movingFor
                    delete this.grid.movableTiles
                }

                if(env.rpg.highlightedActors.size) clearActorHighlights()
                
                //console.log("clearing targetingFor")
                delete this.targetingFor

                if(env.rpg.currentActor != env.rpg.lastActor) {
                    env.rpg.currentActor.box.classList.remove("current-turn")
                    env.rpg.currentActor.box.classList.add("compactor")
                }
            break

            case "halted": // on a successfully halted turn, we can look at the reason and execute telegraphs if needed
                if(env.rpg.haltedAttempt && env.rpg.halt == "telegraph") {
                    //telegraphs use an async animation we can await
                    //it's possible for more than one telegraph to exist
                    try { 
                        this.grid.runTelegraphsInQueue()
                    } catch(e) { printError(e) }
                }
            break

            case "before": // can be treated like the end of the previous actor's turn - currentActor still refers to the previous person

                //run any turn-ending related events
                //console.log("starttileeffectcheck", performance.now())
                if(this.currentActor?.piece?.tile?.effects?.length) this.currentActor.piece.tile.effects.forEach(effect => {
                    if(effect.host?.events?.onActorAffected) effect.host.events.onActorAffected({actor: this.currentActor, reason: "endturn"})
                })
                //console.log("endtileeffectcheck", performance.now())

                if(this.currentActor.state != "dead") {
                    this.grid.advanceTileEffects({actor: this.currentActor, tickType: "onTurnEnd"})
                }
                
                //console.log("done before", performance.now())
            break

            case "after": // this is after all values have been changed and attacks/moves are in motion - NOT the end of their turn.
                //console.log("advancemod after", performance.now())
                if(this.currentActor.state != "dead") {
                    env.rpg.currentActor.box.classList.add("current-turn")
                    env.rpg.currentActor.piece.classList.add("acting")
                    env.rpg.currentActor.box.classList.remove("compactor")

                    // if it's an ally, show movement
                    if(this.currentActor.team.name == "ally" && !skipped && !this.currentActor.npc) {
                        //console.log("showmove", performance.now())
                        this.currentActor.piece.startMovement()
                        //console.log("showmove", performance.now())
                    }
                        
                    //console.log("focus", performance.now())
                    if(this.currentActor.piece.tile && this.currentActor.team.name == "ally") this.grid.focusOnTile(this.currentActor.piece.tile)
                    //console.log("focus", performance.now())
                }
                    
                //console.log("done after", performance.now())
            break
        }
    }

    //todo - targeting doesn't account for special conditions (i.e. dead only) yet
    showTargets(actor, action, actionItem = false) {
        var itemNote = "";
        if(actionItem) {itemNote = `<span class='item-note'>(via ${actionItem.name})</span>`}
        actor.box.insertAdjacentHTML('beforeend',
            `
            <div class="target-notice">
                <span><span class="neutral">${action.verb ? action.verb : action.name}</span> ${action.subject ? action.subject : action.type.includes("movement") && action.type.includes("ground") ? "where" : "whom"}?</span>
                ${itemNote}
                <span class="target-nevermind">NEVERMIND</span>
            </div>
            `
        )
        
        env.rpg.state = "targeting"
        actor.piece.startTargeting(action, actionItem)

        env.rpg.classList.add('targeting')
        var targetNotice = env.rpg.querySelector('.target-notice')
        setTimeout(()=>{ targetNotice.classList.add('active') }, 200)
    
        //hides the notice & shows their skills again if they go back
        env.rpg.nevermind = ()=>{
            actor.piece.endTargeting()
            MUI("off")
            targetNotice.classList.remove('active')
            clearActionsDisplay()
            showActions(actor)

            delete env.rpg.nevermind
        }
        env.rpg.querySelector('.target-nevermind').addEventListener('mousedown', env.rpg.nevermind)
    }

    //creates a neutral actor - for use primarily with breakable scenery
    //neutral actors have no turns or AI and must rely on statuses + events to really do anything
    createNeutralActor(baseActorSlug, tile) {
        let newActor = initializeActor(baseActorSlug,
            {
                team: env.rpg.neutralTeam,
                uniqify: true
            }
        )

        if(this.scenario.actorPreprocess) this.scenario.actorPreprocess(newActor)
        if(newActor.base?.events?.onInitialize) newActor.base.events.onInitialize(newActor)
        newActor.actions = getAlteredActorActions({member: newActor, actor: newActor})

        tile.createActor(newActor)

        /* since we don't initialize the UI, we have to start status effects here */
        if(newActor.initialStatusEffects) {
            console.log("initial status effects", newActor.initialStatusEffects)
            newActor.initialStatusEffects.forEach(status=>addStatus({target: newActor, status: status[0], length: status[1], noReact: true, noUpdate: true}))
        }
    }


    /************************************
    *************************************
             STATE MANAGEMENT
    *************************************
    ************************************/
    //used for styling, limiting, click events, etc.
    set state(newState) {
        //console.log("newState", newState, newState == false, newState == "false")
        if(newState == false || newState == "false") {
            this.setAttribute('state', 'normal')
        } else this.setAttribute('state', newState)
    }

    get state() {
        return this.getAttribute('state')
    }

    // we also want to store and set some extra stuff in this version of the system
    set currentActor(newActor) {
        //could handle some cleanup here
        if(newActor && newActor != this._currentActor) {
            this.setAttribute("actor", newActor.slug)
            this.setAttribute("team", newActor.team.name)
            this.currentTeam = newActor.team
        }
        this._currentActor = newActor
    }

    get currentActor() {
        return this._currentActor
    }
    
    disconnectedCallback() {
        document.removeEventListener('keydown', this.keypress)
        document.removeEventListener('keyup', this.keyup)
        //document.removeEventListener('wheel', this.wheel)
    }

    /************************************
    *************************************
                CAM ZONE     
    *************************************
    ************************************/
    playerCamControl(direction) {
        const rotationRaw = parseFloat(this.grid.style.getPropertyValue("--playercontrol-rotation-raw"))
        const tiltRaw = parseFloat(this.grid.style.getPropertyValue("--playercontrol-tilt-raw"))

        if ((direction === "w" || direction === "arrowup") && tiltRaw <= 75) this.grid.style.setProperty("--playercontrol-tilt-raw", tiltRaw + 15) 
        else if ((direction === "s" || direction === "arrowdown") && tiltRaw >= 30) this.grid.style.setProperty("--playercontrol-tilt-raw", tiltRaw - 15)  
        else if ((direction === "a" || direction === "arrowleft")) this.grid.style.setProperty("--playercontrol-rotation-raw", rotationRaw - 45)
        else if ((direction === "d" || direction === "arrowright")) this.grid.style.setProperty("--playercontrol-rotation-raw", rotationRaw + 45)
    
        let hoveringActor = env?.hovering?.classList ? env.hovering.classList.contains("actor") || env.hovering.closest(".actor") : false
        if(env.rpg.highlightedActors.size && this.state != "targeting" && !hoveringActor) {
            clearActorHighlights()
        }
    }

    playerZoomControl(event) {
        if(typeof this.zoomLevel == "undefined") this.zoomLevel = 0
        this.zoomLevel = Math.clamp(this.zoomLevel + Math.sign(event.deltaY), -10, 10)
        this.grid.style.setProperty('--playercontrol-zoom-raw', this.zoomLevel)
    }

    //almost identical to the stage setCam function, but targets the grid specifically
    //called like env.rpg.setCam({})
    setCam({
        x = false,
        y = false,
        height = false,
        distance = false,
        offsetCamera = false,

        //are combat grid specific controls
        playerRotation = false,
        playerTilt = false,

        //used for first-person-like views for some moments
        perspective = false,
        gridTileSize = false,
        detailMode = false,
        hideAllies = false
    } = {}) {
        let setSomething = false
    
        if(x !== false) {this.grid.style.setProperty("--camera-x", x); setSomething = true} else this.grid.style.removeProperty("--camera-x");
        if(y !== false) {this.grid.style.setProperty("--camera-y", y); setSomething = true} else this.grid.style.removeProperty("--camera-y");
        if(height !== false) {this.grid.style.setProperty("--camera-height", height); setSomething = true} else this.grid.style.removeProperty("--camera-height");
        if(distance !== false) {this.grid.style.setProperty("--camera-distance", distance); setSomething = true} else this.grid.style.removeProperty("--camera-distance");
        if(offsetCamera !== false) {this.grid.style.setProperty("--camera-offset", offsetCamera); setSomething = true} else this.grid.style.removeProperty("--camera-offset");
        
        if(playerRotation !== false) {this.grid.style.setProperty("--playercontrol-rotation", `${playerRotation}deg`); setSomething = true} else this.grid.style.removeProperty("--playercontrol-rotation");
        if(playerTilt !== false) {this.grid.style.setProperty("--playercontrol-tilt", `${playerTilt}deg`); setSomething = true} else this.grid.style.removeProperty("--playercontrol-tilt");
        
        if(perspective !== false) {this.grid.style.setProperty("--perspective", perspective); this.grid.classList.add('perspective'); setSomething = true} else {this.grid.style.removeProperty("--perspective"); this.grid.classList.remove('perspective')}
        if(gridTileSize !== false) {this.grid.style.setProperty("--gridTileSize", `${gridTileSize}px`); setSomething = true} else this.grid.style.removeProperty("--gridTileSize");
        if(detailMode !== false) {
            switch(detailMode) {
                case "tiny":
                    this.grid.classList.add("tinydetailmode"); 

                default:
                    this.grid.classList.add("detailmode"); 
            }
            
            setSomething = true
        } else this.grid.classList.remove("detailmode");
        if(hideAllies !== false) {this.grid.classList.add("hideallies"); setSomething = true} else this.grid.classList.remove("hideallies");
    
        if(setSomething) { // marker to reset on step
            this.grid.customCam = true
        } else {
            this.grid.customCam = false
        }
    }

    /************************************
    *************************************
                STATIC ZONE     
    *************************************
    ************************************/
    // similar to stage definitions, but specifically for combat scenarios
    // think of it like a marriage between env.stages and env.formations
    // you can add to this like CombatScene.scenarios['test'] = { ... }
    static SCENARIOS = {
        // similar to startCombat parameters, can take MOST of the same values:
        'test': {
            initEnemyTeam: ()=> [
                "container", "container", "veilklight", "veilklight", "container", "container"
            ], // array of enemy actors returned by function
            initAllyTeam: ()=> page.party || [ /* ditto, should usually be page.party */ 

                {
                    slug: "akizet",
                    name: "Akizet",
                    combatActor: "akizet",
                    class: "Surface Veteran",
                    hp: 15,
                }
            ], 

            //bgm: howler object RETURNED BY FUNCTION CALL (main difference from startCombat)
            //this lets us not have to define/load the music until it's needed
            bgm: () => new Howl({
                onload: function () {page.howls.push(this)},
                src: ['/audio/daemon_midboss.ogg'],
                preload: true,
                loop: true,
                volume: 1,
                rate: 0.2,
                sprite: {
                    __default: [5, 189990, true]
                }
            }),
            
            //bgmRate: 1 (if absent, won't change rate)
            bgmRate: 0.5,

            //bgmStart: 20 (if absent, won't change start time)
            bgmStart: 30,

            //combatClass: "" - applied to the combat-scene element
            combatClass: "ep4scene",

            //all callbacks are optional
            //startCallback: ()=>{} - called when combat starts
            startCallback: ()=> console.log("starting"),

            //endCallback: (loser)=>{} - called when combat ends
            endCallback: (loser)=> console.log("ending", loser),

            //turnCallback: (actor, prevActor)=>{} - called at the start of each turn
            turnCallback: (actor)=> console.log("turn", actor),

            //actorSpriteProcess: (actor)=>{} - called after creating the sprice for an actor
            actorSpriteProcess: (actor)=> console.log("sprite", actor),

            //SCENARIO STAGE INFO
            //stage related values may not support everything that cystStage does, but should cover most needs
            width: 11,
            plan: `
                ░░░░░░░░░O░
                ░░O░░░░░░░░
                ░░░░░░░O░░░
                ░░░░O░░░░░░
                ░O░░111░░░░
                ░░░░░♠░░O░░
                ░░░░░░░░░░░
                ░░░░O░░░░O░
                ░░O░░░░░░░░
                ░░░░░^░░░░░
                ░O░░░░░░░░O
                
            `,
            entities: {
                //basic arbitrary prop
                "1": {
                    class: "blocks los",
                    contains: {
                        html: "<div class='proptest'>LOS</div>"
                    }
                },
                
                //dyps are supported though, same syntax as regular stage
                "^": {
                    class: "blocks los prop notile",
                    contains: {
                        html: `<figure>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </figure>`,
                        dyp: {
                            class: "pyramid pyrapod",
                            width: 3,
                            height: 3,
                            image: "transparent"
                        }
                    } 
                },

                //if not enough spawn points to spawn each actor, we start selecting random stage spots, so beware
                // can specify team
                "♥": { spawnPoint: "ally" },
                "♠": { spawnPoint: "enemy" },

                // can specify entity slug
                "○": { spawnPoint: "container" },

                // independent actor/obstacle
                // things spawned this way are part of the 'neutral' team
                // they can be hit by anyone, but are unaffected by turn-based status effects like puncture (subject to change)
                "O": { 
                    contains: {
                        actor: "dull_container"
                    }
                },
            }
        }
    }
}

// a new stage-like system specifically for combat scenarios
// I know this basically repeats the stage system in some ways,
// but it made more sense to me to keep the two separate, due to how differently we're handling tiles and entities
// it will be much simpler overall and isn't designed around exploration or moving between multiple stages
class CombatGrid extends HTMLElement {
    constructor() { super() }

    // initialization handled on connection bc grid is not created with relevant data at time of constructor
    connectedCallback() { 
        this.plan = this.scenario.plan.replace(/\s/g, '').split('')

        // Create a 2D array to represent the grid
        this.grid = []
        let row = []
        for (let i = 0; i < this.plan.length; i++) {
            if (i > 0 && i % this.scenario.width === 0) {
                this.grid.push(row)
                row = []
            }
            row.push(this.initializeCombatTile(this.plan[i], i % this.scenario.width, Math.floor(i / this.scenario.width)))
        }
        this.grid.push(row)

        this.width = this.scenario.width
        this.height = Math.ceil(this.plan.length / this.scenario.width)
        this.style.setProperty('--stage-width', this.width);
        this.style.setProperty('--stage-height', this.height);

        //useful tile references
        this.spawnPoints = { lastresort: [] } // a map of spawn points by team, base slug, and finally last resort tiles
        this.tilesByType = {} // a map of tile classes to arrays of tiles with those classes
        this.pieceMap = {} // a map of actor slugs to tile coordinates for verification purposes
        this.neighborMap = new Map() // map of tiles and their 1-square radius neighbors

        //tile effect setup
        this.tileEffects = [ /* just effectObj  (we're not storing length here - it's at the tile level) */ ]
        
        this.renderGrid()
        this.addEventListener('click', this.onClick.bind(this))
    }

    //used only for initialization - do not try to add tiles afterwards with this
    initializeCombatTile(slug, x, y) {
        const tile = document.createElement('combat-tile')
        tile.setAttribute('slug', slug)
        tile.setAttribute('x', x)
        tile.setAttribute('y', y)
        tile.grid = this
        tile.scenario = this.scenario
        tile.scene = this.scene
        return tile
    }

    getTileFromCoordinates(x, y) {
        if (y < 0 || y >= this.grid.length || x < 0 || x >= this.grid[0].length) { return null }
        return this.grid[y][x]
    }

    renderGrid() {
        this.innerHTML = `
            <div id='combat-rotator' class='grid-container'>
                <div id='combat-extra'>
                    <div id='combat-animator' class='grid-animator'>
                        <div id='combat-realgrid' class='realgrid'></div>
                    </div>
                </div>
            </div>`
        this.rotator = this.querySelector('#combat-rotator')
        this.extraAnimator = this.querySelector('#combat-extra')
        this.animator = this.querySelector('#combat-animator')
        this.realgrid = this.querySelector('#combat-realgrid')
        
        // renderrr. CombatTile connectedcallback does the work for us
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                this.realgrid.appendChild(this.grid[i][j])
            }
        }

        // one more loop to cache the 1-square neighbors of each tile, used often in pathfinding
        /* optimized mini-version of 1-square getNeighbors to satiate firefox's JIT */
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                let neighbors = []

                for (let o = -1; o <= 1; o++) {
                    for (let p = -1; p <= 1; p++) {
                        if(o === 0 && p === 0) continue;

                        const neighborX = this.grid[i][j].x + o
                        const neighborY = this.grid[i][j].y + p
                        const tile = this.getTileFromCoordinates(neighborX, neighborY)
                        if(tile) neighbors.push(tile)
                    }
                }
                
                this.neighborMap.set(this.grid[i][j], neighbors)
            }
        }
    }

    focusOnTile(tile) {
        if(!tile) return;
        this.style.setProperty('--stage-steps-x', tile.x)
        this.style.setProperty('--stage-steps-y', tile.y)
        if(env.rpg.highlightedActors.size) clearActorHighlights()
    }

    // places an actor piece back on the board
    replaceActorPiece({target, location, specificTile}) {
        if(target?.piece?.tile) return; // they're already on the board
        if(target.deadPiece) {
            target.deadPiece.remove()
            delete target.deadPiece
        }

        console.log("got target", target, location)
        let newTile
        switch(location) {
            case "currentActor": // finds the closest touching tile to the current actor and places the piece there
                try {
                    if(env.rpg.currentActor?.piece?.tile) newTile = env.rpg?.currentActor?.piece?.tile.getClosestOpenTile();
                    else newTile = target.team.members.find(m=>m.state == "living").piece.tile.getClosestOpenTile()
                } catch(e) {printError(e)}

            case "specificTile":
                if(specificTile) if(!specificTile.piece && !newTile) newTile = specificTile
            

            default: // this means the location isn't a special case and we should target by tile class
                if(location && location != "currentActor" && !newTile) {
                    newTile = this.tilesByType[location].filter(tile=>!tile.piece).sample()
                    if(newTile) break
                    console.log("no valid tile found in", this.tilesByType[location])
                }

                //if there's no location specified, or no valid spawn points, then we continue to regular spawn behavior

            case "spawn": // finds any valid spawn position, preferring team/slug names like regular spawns
                
                if(!newTile && this.spawnPoints[target?.base?.slug]) { newTile = this.spawnPoints[target?.base?.slug].filter(tile => !tile.piece).sample() }
                if(!newTile && this.spawnPoints[target?.team?.name]) { newTile = this.spawnPoints[target?.team?.name].filter(tile => !tile.piece).sample() }
                if(!newTile) { newTile = this.spawnPoints.lastresort.filter(tile => !tile.piece).sample() }
                
            break
        }

        if(newTile) newTile.createActor(target); else printError(`couldn't rez ${target.slug} due to no valid tiles given location req (${location})`, true)
    }

    clearMovableTiles() {
        this.movableTiles.forEach(tile=>tile.classList.remove("movable"))
        delete env.rpg.movingFor
        delete this.movableTiles
    }

    /************************************
    *************************************
          TILE MANAGEMENT (aoes, effects, etc)
    *************************************
    ************************************/
    //markTiles is our main function for managing tile states
    //used to add classes i.e. "targetable", "movable", so on and so forth
    markTiles({ 
        // global requirements
        originTile, // origin point
        shape = "square", // accepts: "square", "circle", "line", "angular", "cone", "ring", "custom"
        customShape,

        // situational requirements
        size, // required for all shapes presently but in the future will not be
        direction, // required for specific shapes - up, down, left, right, up-left, up-right, ...

        // optional
        includesOrigin = false, // if origin should be included in the marking
        addClass, // class to add to valid tiles

        // optional checks for common requirements
        ignoresObstacles = false, // if 'blocks' doesn't matter, set to true
        ignoresActors = true, // set to false to fail potential tiles if they have actors
        requiresPath = false, // to check if origin has a valid path to each potential tile
        ignoresLOS = false, //typically we DO care about LOS so this is false by default
        
        // optional functions
        onTileCheck, // additional check function on a tile's validity. return end validity in case of alteration
        onEachValidTile, // function executed on each valid tile (don't add classes this way, it's extra)
        onEachValidTileActor, // like the above, but specifically for actors on each valid tile

        // return modifications
        // pleaseReturn can take... "valid" for valid tiles, or "actors" for actors on valid tiles
        pleaseReturn = "valid", 

        // passthrough data - give an object here and you can do stuff with it in checks
        data
    }) {
        if(!originTile) return [];

        const validTiles = []
        if(includesOrigin) validTiles.push(originTile)

        function push(tile) {
            let validity = true
            if(onTileCheck) {
                validity = onTileCheck({tile, validity, validTiles, data})
            }
            
            if(validity && (ignoresLOS || originTile.hasSightLineTo(tile))) {
                validTiles.push(tile)
            }
        }

        const baseTiles = originTile.getNeighbors({size, shape, direction, customShape})
        switch(shape) {
            default:
                const openSet = [originTile]
                const visited = new Set()
                visited.add(originTile)
        
                //requires pathfinding goes a bit more in depth
                //used most frequently in on-turn movement, but also some actions
                //might require a path to use them (i.e. akizet's movement-based charge)
                if(requiresPath) {
                    while (openSet.length > 0) {
                        const tile = openSet.shift()
                        const neighbors = tile.getNeighbors({size, shape, direction, customShape})

                        for (const neighbor of neighbors) {
                            if(
                                visited.has(neighbor) ||
                                (!ignoresObstacles && neighbor.blocking === true) || 
                                (!ignoresActors && neighbor.piece)
                            ) continue

                            const path = originTile.pathfindTo(neighbor)
                            if (path && baseTiles.includes(neighbor)) {
                                const pathDistance = path.length - 1
                                if (pathDistance <= size) {
                                    push(neighbor)
                                    openSet.push(neighbor)
                                    visited.add(neighbor)
                                }
                            }
                        }
                    } 
                    
                } else { //otherwise it's basic
                    for (const neighbor of baseTiles) {
                        if(
                            (!ignoresObstacles && neighbor.blocking === true) || 
                            (!ignoresActors && neighbor.piece)
                        ) continue

                        push(neighbor)
                    }
                }
            break
        }

        //do any processing
        validTiles.forEach(tile => {
            if(addClass) tile.classList.add(addClass)
            if(onEachValidTile) onEachValidTile({tile, data})
            if(tile?.piece?.actor && onEachValidTileActor) onEachValidTileActor({tile, actor: tile.piece.actor, data})
        })

        switch(pleaseReturn) {
            case "actors": return validTiles.map(tile => tile.piece?.actor).filter(actor => actor !== undefined)
            default: return validTiles
        }
    }

    //returns either actors or tiles for an action. requires a selected tile
    getAoETargets({
        // AOE TARGET TILE
        // the specific point the AOE is being cast on
        tile,

        // AOE ORIGIN OPTIONS: either one of these, not both
        // only required for line-from, cone, and custom (because those require relativity)
        actor,  // actor origin of the AOE effect, can be null
        originTile,

        // AOE DATA OPTIONS: either one of these, not both
        /* see actions file for examples, but the aoeData object is generally like...
            { 
                size: 2, 
                shape: "circle", (any valid shape taken by markTiles)
                customShape: `...` (if shape is "custom" - again, see actions for clear examples)
                canHit: (user, target) => { return ... }, (if the target should be hit)
                
                you can pass "effect:" but it won't do anything because that's a targeting/action thing, not a markTiles thing
            },
        */
        action, 
        aoeData,

        //optional function enhancements combined with this before passing to markTiles
        onEachValidTile,
        onEachValidTileActor,
        onTileCheck,

        // basically renamed pleaseReturn, but does the filtering in the tileCheck, not the return
        // this means onEachValidTile/etc can act upon the results immediately
        // can get the markTiles stock of 'valid' (tiles) or 'actors'
        // but this function also takes "allies" or "foes", which requires actor to be passed, but does some filtering for you before returning
        actingOn = "valid"
    }) {
        let aoe = action ? (action?.stats?.aoe || action.aoe) : aoeData

        let tileCheck = ({tile, validity}) => { // TODO: handle other related validity checks here
            let newValidity = validity
            switch(actingOn) {
                case "actors": newValidity = tile.piece; break
                case "allies": newValidity = tile.piece && tile?.piece?.actor?.team?.name == actor?.team.name; break
                case "foes": newValidity = tile.piece && tile?.piece?.actor?.team?.name == actor?.enemyTeam.name; break
            }
            
            if(onTileCheck) {
                newValidity = onTileCheck({tile, validity})
            }

            return newValidity
        }

        //obj passed to markTiles, modified based on aoe.shape needs
        let markPassData = {
            originTile: tile,
            shape: aoe.shape,
            size: aoe.size,
            onTileCheck: tileCheck,
            pleaseReturn: (actingOn == "allies" || actingOn == "foes") ? "actors" : actingOn,

            //AOE optionals
            //we make some assumptions about what's wanted if not specified 
            //some just fall back to the markTiles default otherwise
            onEachValidTile,
            onEachValidTileActor,
            ignoresObstacles: typeof aoe.ignoresObstacles == "undefined" ? true : aoe.ignoresObstacles,
            ignoresActors: aoe.ignoresActors,
            requiresPath: aoe.requiresPath,
            ignoresLOS: aoe.ignoresLOS,
            customShape: aoe.customShape, // only present for custom shape, harmless to pass if not present
        }
        
        switch(aoe.shape) {
            case "line-from":
                markPassData.shape = "line"
            case "cone": 
            case "custom":
                markPassData.originTile = originTile || (aoe.distant ? tile : actor.piece.tile)
                markPassData.direction = aoe.distant ? markPassData.originTile.getRelativeDirection(actor.piece.tile, true) : markPassData.originTile.getRelativeDirection(tile)
                markPassData.includesOrigin = typeof aoe.includesOrigin == "undefined" ? false : aoe.includesOrigin
            break

            default:
                markPassData.includesOrigin = typeof aoe.includesOrigin == "undefined" ? true : aoe.includesOrigin
            break
        }

        return env.rpg.grid.markTiles(markPassData)
    }

    // shared shortcut function used by player and enemy targeting
    // uses an action's AOE effects on a target tile (typically one that contains a target)
    // returns affected targets, or false
    handleActionAOE({originActor, targetTile, action}) {
        if(!action.aoe) return false;

        let effectExec = () => {
            if(action.aoe?.effect) {
                let aoeTiles = this.getAoETargets({
                    tile: targetTile,
                    actor: originActor,
                    action,
                    pleaseReturn: "valid"
                })
                
                action.aoe.effect({user: originActor, tiles: aoeTiles, selectedTile: targetTile})
            }
        }
        
        if(action?.aoe?.effectBeforeExec) effectExec();
        let potentialTargets = this.getAoETargets({
            tile: targetTile,
            actor: originActor,
            action: action,
            actingOn: "actors" ,
            onTileCheck: ({tile, validity, validTiles, data}) => {
                if(action.aoe?.canHit && tile?.piece?.actor) {
                    return action.aoe.canHit(originActor, tile?.piece?.actor)
                } else return validity
            }
        })

        if(potentialTargets.length || action.type.includes("ground")) {
            let strikeLogic = ()=>{
                if(action.aoe && !action?.aoe?.effectBeforeExec) effectExec();

                let initialAction
                if(potentialTargets.length) potentialTargets.forEach((targetActor, i) => {
                    if(!i) {
                        initialAction = useAction(originActor, action, potentialTargets[0], {sceneAnim: action.sceneAnim, noUseMessage: action.type.includes("telegraph")})
                        return
                    }

                    setTimeout(()=>{
                        useAction(originActor, action, targetActor, {actionMessageIndex: initialAction.i, sceneAnim: action.sceneAnim, noUseMessage: action.type.includes("telegraph")})
                    }, i * env.ADVANCE_RATE * 0.1)
                });

                //meaning this is a ground target and a self-exec
                else if(action.type.includes("self")) useAction(originActor, action, originActor, {sceneAnim: action.sceneAnim})
            }

            if(this.scene.uncleanedTargets) this.cleanUncleanedTargets()

            //we do and return an async animation if it's got one
            if(action.sceneAnim && originActor?.piece?.tile && targetTile) {
                this.scene.state = "animating"
                return env.COMBAT_ANIMS[action.sceneAnim].exec({strikeLogic, originXY: {x: originActor.piece.tile.x, y: originActor.piece.tile.y}, targetXY: {x: targetTile.x, y: targetTile.y}, origin: originActor, action})
            } else {
                strikeLogic()
                return true
            }
        }

        return false
    }

    // tile effects work pretty similarly to status effects
    // creates an effect that watches a set of tiles
    // notably, you can pass "telegraphFor" (action slug) and it'll execute that action on anyone
    // standing in the tile when the effect expires, with the origin considered
    createTileEffect({
        tiles,
        effect: effectName, 
        length = 1, 
        origin, // who the tile effect is created by

        //telegraph only section obviously
        telegraphFor, // action slug to be used on expiration
        telegraphAnim, // string name of something defined in combat_anims. needs to be the new promise format to work
        telegraphFrom, // (optional) original caster, if not origin 
        telegraphExec, // (optional) can be used in place of telegraphFor, arbitrary code executed on affected tiles when tg goes off

        //for tile effects that move, basically. can be 'anchored' to things in different ways
        anchorType, // can specify either "origin" (anchor to creator), "actor" (specify in anchorTo), or "tile" (anchor to changeable tile position)
        anchorCoordinates, // anchor tile coordinates - can be changed to create a moving effect (i.e. projectile)
        anchorActor, //obv

        originTile, // not strictly required but often used with specifically made actions and tile effects
        data, // general use tile-effect data accessible from within events
        specialClass, //classes added to the tileEffect's html effect
        specialHTML, //additional HTML added to the effect (doesnt overwrite existing)

        //overrides hover info as desired
        specialName,
        specialHelp,
        specialRequiresOrigin, //overrides if an effect should be removed on origin removal
    }) {
        if(!CombatGrid.TILE_EFFECTS[effectName]) {
            chatter({actor: 'actual_site_error', text: `you're trying to add an effect that doesn't exist !\n(${effectName})`, readout: true})
            console.log("tried to add effect right here")
            return false
        }

        let effectObj = {... CombatGrid.TILE_EFFECTS[effectName]}
        let effectId = env.rpg.entCount++

        effectObj.id = effectId
        effectObj.origin = origin || false 
        effectObj.tiles = [] // will check for valid tiles below
        if(!anchorType) effectObj.originTile = originTile 
        if(!originTile && effectObj.tiles.length == 1) effectObj.originTile = effectObj.tiles[0]
        effectObj.telegraphFrom = telegraphFrom // this is only necessary for effects anchored to actors that they did not create. (i.e. cavik planting a bomb on someone - he's telegraphFrom, while that someone is origin for anchoring purposes)
        effectObj.telegraphFor = telegraphExec || (telegraphFor ? env.ACTIONS[telegraphFor] : false)
        effectObj.telegraphAnim = telegraphAnim ? env.COMBAT_ANIMS[telegraphAnim] : false
        effectObj.data = data
        effectObj.specialClass = specialClass
        effectObj.specialHTML = specialHTML
        if(specialName) effectObj.name = specialName
        if(specialHelp) effectObj.help = specialHelp
        if(specialRequiresOrigin !== undefined) effectObj.requiresOrigin = specialRequiresOrigin
        if(effectObj.events) {
            effectObj.events = {... effectObj.events}
            effectObj.events.effect = effectObj
        }
        
        if(effectObj?.events?.onInitialize) effectObj.events.onInitialize()
        
        //if an anchorType exist, we track the positions of tiles relative to the focus point
        if(anchorType) {
            let anchorTo = anchorActor || origin
            
            //console.log("!!! ANCHORING TO", anchorTo)
            if(anchorType == "origin" || anchorType == "actor") {
                if(!anchorTo.hostingEffects) anchorTo.hostingEffects = []
                anchorTo.hostingEffects.push(effectObj)
                effectObj.anchorActor = anchorTo
                effectObj.originTile = anchorTo.piece.tile
            }

            effectObj.anchorType = anchorType
            effectObj.anchorTo = anchorCoordinates || anchorTo?.piece?.tile?.coordinates
            if(anchorType == "tile" && !effectObj.anchorTo) effectObj.anchorTo = tiles[0] ? tiles[0].coordinates : false;
            if(effectObj.anchorTo) {
                effectObj.anchorTo = {x: effectObj.anchorTo.x, y: effectObj.anchorTo.y} // we make a new object so it isn't a pointer if tile coordinates are passed
                effectObj.tileRelativity = []
                effectObj.originTile = this.getTileFromCoordinates(effectObj.anchorTo.x, effectObj.anchorTo.y)
            } else {
                console.warn(`tried to anchor for ${effectObj.name}, but there was no valid anchor (no tiles or actors)`)
                return false;
            }
        }

        try { 
            // iterate through tiles to determine which ones we actually include in this new effect
            // for example, some effects have .stacks = true, which means if you apply burn to burn, the old burn is extended
            // BUT if stacks is undefined or false, we can freely create the new effect
            tiles.forEach(tile=>{
                //if it stacks with previous versions of the same effect, find that effect if one exists and increase it
                if(effectObj.stacks) {
                    let existing = tile.getEffects(effectName)
                    if(existing.length) {
                        existing[0].length += length
                        return // not doing any adds for this tile
                    }
                }

                //no stack, or does stack but no existing effect, so proceed with adding effect
                tile.addToEffect(effectObj, {length, addingBy: "creation"})

                if(effectObj.anchorType) {
                    effectObj.tileRelativity.push({x: tile.x - effectObj.anchorTo.x, y: tile.y - effectObj.anchorTo.y, tile})
                }
            })

            //if we have any tiles, proceed. if not, return because unnecessary
            if(effectObj.tiles.length) {
                this.tileEffects.push(effectObj)
            } else {
                console.log("didn't add tileEffects because of woke", tiles)
                return false
            }

            //track any new global events
            //non-global events are handled directly in this,
            //but a tile effect might want to keep tabs on some status events basically
            if(typeof effectObj.events != "undefined") {
                //re-assign the functions so they get the right 'this'
                let effectEvents = {... CombatGrid.TILE_EFFECTS[effectName].events}
                effectObj.events = effectEvents
                //also pass self for "this.effect" reference
                effectObj.events.effect = effectObj

                if(effectObj?.events?.onCreated) effectObj.events.onCreated()
            }

        } catch (e) { console.log('error tiles', tiles); printError(`problem in applying ${effectName} to ${tiles.length} tiles: ${e}`); console.log(e)}

        return effectObj
    }

    //similar to removeStatus, where we unhook events and such before deleting it
    deleteTileEffect(effectObj) {
        if(!effectObj || effectObj.deleted) return;
        if(effectObj?.events?.onDeleted) effectObj.events.onDeleted()
        this.tileEffects = this.tileEffects.filter(obj => obj != effectObj)

        effectObj.deleted = true

        //remove any tiles if this is a manual removal
        if(effectObj.tiles.length) effectObj.tiles.forEach(tile=>tile.removeFromEffect(effectObj, {removingBy: "delete"}))
        if(effectObj.anchorActor) {
            effectObj.anchorActor.hostingEffects = effectObj.anchorActor.hostingEffects.filter(obj => obj != effectObj)
        }
    }

    //called in advanceMod, this ticks down the length on each tileEffect tile if it isn't infinite.
    advanceTileEffects({prevActor, actor, tickType} = {}) {
        let looping = (actor.team.name == "ally" && prevActor?.team?.name == "enemy") && !tickType
        
        this.tileEffects.forEach(effect => {
            if(
                //we return if it's either got a specific tickType and this tileEffect doesn't have one,
                //or if it doesn't and the tickType is specified
                (tickType && effect.tickType != tickType) ||
                (!tickType && effect.tickType) ||
                (!effect.tickEvenIfOriginDead && actor?.state == "dead") // this resolves to false if there's no origin btw
            ) return;

            //on loop, we cast on neutral actors
            if(looping) {
                effect.tiles.forEach(tile=>{
                    if (
                        tile?.piece?.actor?.team?.name == "neutral" &&
                        effect?.events?.onActorAffected
                    ) effect.events.onActorAffected({actor: tile.piece.actor, reason: "turnend"})
                })
            }

            if(
                //if there is an origin actor, we advance ONLY if it's their turn
                //otherwise, we do it on turnOrder index loop
                //or!! if the tileEffect is advanceEveryTurn!
                (
                    (effect.origin && (effect.origin != actor )) ||
                    (!effect.origin && !looping) 
                )
                    &&
                !effect.advanceEveryTurn
            ) return;

            this.advanceTileEffect(effect, actor)
        })
    }

    //process for advancing a specific effect
    //can pass an actor of whose turn it's advancing on if it's helpful for onEffectAdvance
    advanceTileEffect(effectObj, incitingActor) {
        //collect tiles removed
        if(!effectObj.infinite) {
            let removedTiles = []

            effectObj.tiles.forEach(tile => {
                tile.effectMap[effectObj.id].length--
                if(tile.effectMap[effectObj.id].length <= 0) {
                    if(!effectObj.telegraphFor) tile.removeFromEffect(effectObj, {removingBy: "advance"})
                    removedTiles.push(tile)
                }
            })

            if(!effectObj.telegraphFor) {
                removedTiles.forEach(tile => {
                    let i = effectObj.tiles.indexOf(tile);
                    if (i > -1) effectObj.tiles.splice(i, 1)
                })

                if(!effectObj.tiles.length) this.deleteTileEffect(effectObj)
            }
            
            // telegraph tiles are instead removed in the telegraph resolve
            // this queues it up to happen when we return from this function
            if(removedTiles.length && effectObj.telegraphFor) { 
                this.addTelegraphToQueue(effectObj)
            }
        }

        if(effectObj.tiles.length && effectObj?.events?.onEffectAdvance) effectObj.events.onEffectAdvance({incitingActor})
    }

    //for anchored tile effects only, moves them based on a delta and their tileRelativity array (list of effect positions relative to anchor)
    moveTileEffect(effectObj, {
        //one of these
        delta, /* {x, y} to move */
        position /* {x, y} to set to */,
        directional /* {direction, strength} similar to knockback specs */
    }) {
        if(!effectObj.anchorType) { console.warn("tried to move effect", effectObj, "but it isn't anchored"); return }
        if(!effectObj?.tiles?.length) { 
            console.warn("tried to move effect", effectObj, "with no tiles left in effect, so we're going to delete it");
            this.deleteTileEffect(effectObj)
            return
        }
        try { 
            let newAnchorX, newAnchorY
            if(delta) {
                newAnchorX = effectObj.anchorTo.x + delta.x
                newAnchorY = effectObj.anchorTo.y + delta.y
            } else if(position) {
                newAnchorX = position.x
                newAnchorY = position.y
            } else if(directional) {
                newAnchorX = effectObj.anchorTo.x + (directional.direction.includes("left") ? -1 : directional.direction.includes("right") ? 1 : 0) * directional.strength
                newAnchorY = effectObj.anchorTo.y + (directional.direction.includes("up") ? -1 : directional.direction.includes("down") ? 1 : 0) * directional.strength
            }

            let oldOrigin = effectObj.originTile
            effectObj.anchorTo.x = newAnchorX
            effectObj.anchorTo.y = newAnchorY
            effectObj.originTile = this.getTileFromCoordinates(newAnchorX, newAnchorY)

            //assumes that all tiles are the same length - for anchored effects, can't imagine a scenario where they wouldn't be
            let length = effectObj.tiles[0].effectMap[effectObj.id].length

            //get new tile position map based on the new center
            const newTiles = effectObj.tileRelativity.map(relativity => {
                const newX = newAnchorX + relativity.x
                const newY = newAnchorY + relativity.y
                return this.getTileFromCoordinates(newX, newY)
            }).filter(tile => tile) // get rid of any null/falses from off-grid coords

            //only remove what isn't going to stay
            effectObj.tiles.forEach(tile => {
                if (!newTiles.includes(tile)) tile.removeFromEffect(effectObj, { removingBy: "shifting" })
            })

            //if it's fully left the grid, we treat it as gone
            if(!newTiles.length && !effectObj.tiles.length) {
                this.deleteTileEffect(effectObj)
                return
            }
        
            //add da new stuff
            newTiles.forEach(tile => {
                if (!effectObj.tiles.includes(tile)) tile.addToEffect(effectObj, { length, addingBy: "shifting" })
            })

            //for updating graphical stuff
            //new originTile might not exist (i.e. stepped off stage)
            if(effectObj.originTile) effectObj.originTile.makeEffectOriginTile(effectObj, true)
            if(oldOrigin) oldOrigin.makeEffectOriginTile(effectObj, false)
        } catch(e) {printError(e)}
    }

    addTelegraphToQueue(effect) {
        effect.resolve = () => {
            effect.affectedActors = effect.tiles.map(tile => tile?.piece?.actor).filter(actor => actor)
            console.log('hi, in the resolve now for', effect.name, effect)
            
            if(typeof effect.telegraphFor == "function") {
                effect.telegraphFor(effect)
            } else {
                env.GENERIC_ACTIONS.teamWave({
                    arbitraryActorList: effect.affectedActors,
                    exec: (actor, i)=>{
                        useAction(effect.telegraphFrom || effect.origin, effect.telegraphFor, actor, {sceneAnim: true, tileEffect: effect})
                    }
                })
            }
        }
        
        env.rpg.telegraphQueue.push(effect)
    }

    //trigger telegraph animation/action usage
    runTelegraphsInQueue({noAdvance = false, forActor} = {}) {
        if(env.rpg.halt == "telegraph") env.rpg.halt = false
        let renderedQueue = []

        env.rpg.telegraphQueue.forEach((telegraphEffect) => {
            if(forActor) {
                if(telegraphEffect.telegraphFrom && telegraphEffect.telegraphFrom != forActor) {
                    return
                } else if(!telegraphEffect.telegraphFrom && telegraphEffect.origin != forActor) {
                    return
                }
            }

            renderedQueue.push(
                async () => {
                    console.log("running telegraph", telegraphEffect.name, telegraphEffect, "which has tiles", telegraphEffect.tiles)
                    if(telegraphEffect.telegraphAnim) {
                        
                        //prioritize focusing on ally pieces if there are any
                        let focus = 
                            telegraphEffect.tiles.find(t=>t?.piece?.actor?.team?.name == "ally") ||
                            telegraphEffect.tiles.find(t=>t?.piece?.actor?.team?.name == "enemy") ||
                            telegraphEffect?.telegraphFrom?.tile ||
                            telegraphEffect?.origin?.tile ||
                            telegraphEffect.tiles.find(t=>t?.piece?.actor?.team?.name == "neutral") || 
                            telegraphEffect?.originTile

                        if(focus) {
                            console.log("focus is", focus, "from stack", 
                                telegraphEffect.tiles.find(t=>t?.piece?.actor?.team?.name == "ally"),
                                telegraphEffect.tiles.find(t=>t?.piece?.actor?.team?.name == "enemy"),
                                telegraphEffect?.telegraphFrom?.tile,
                                telegraphEffect?.origin?.tile,
                                telegraphEffect.tiles.find(t=>t?.piece?.actor?.team?.name == "neutral") 
                            )
                            focus.focusOnThisTile()
                        } else {
                            console.log(
                                telegraphEffect.tiles.find(t=>t?.piece?.actor?.team?.name == "ally"),
                                telegraphEffect.tiles.find(t=>t?.piece?.actor?.team?.name == "enemy"),
                                telegraphEffect?.telegraphFrom?.tile,
                                telegraphEffect?.origin?.tile,
                                telegraphEffect.tiles.find(t=>t?.piece?.actor?.team?.name == "neutral") 
                            )
                        }

                        await telegraphEffect.telegraphAnim.exec({
                            strikeLogic: telegraphEffect.resolve,
                            tileEffect: telegraphEffect
                        })

                    } else {
                        telegraphEffect.resolve()
                    }

                    try{
                        env.rpg.grid.deleteTileEffect(telegraphEffect)
                    } catch(e) {printError(e)}
                }
            )
        })

        let currentActor = env.rpg.currentActor
        console.log("we haven't executed yet and the current actor is", currentActor)
        console.log("functions are", renderedQueue)
        setTimeout(()=>{
            (async () => {
                for (const telegraph of renderedQueue) {
                    //console.log("!!!!!!!!! TELEGRAPH GOING")
                    await telegraph()
                    //console.log("!!!!!!!!! TELEGRAPH FULLY AWAITED")
                }

                env.rpg.telegraphQueue = [];
                if(!noAdvance) advanceTurn(currentActor);
            })()
        }, env.ADVANCE_RATE * 0.10)

        return env.rpg.telegraphQueue.length
    }

    /************************************
    *************************************
          CLICK EVENT MANAGEMENT
    *************************************
    ************************************/
    // The combat-grid will handle click events for everything it contains.
    // you can click either on an actor or a tile
    onClick(ev) {
        if(env.currentDialogue.active || env.rpg?.currentActor?.team?.name != "ally") return;

        const target = ev.target
        let selectedActor, selectedTile, activeActor, activeAction, actionItem

        // activeActor/Action is based on current "for" data
        // we prioritize targeting over anything else
        if (this.scene.targetingFor) {activeActor = this.scene.targetingFor.actor; activeAction = this.scene.targetingFor.action; actionItem = this.scene.targetingFor.actionItem}
        else if (this.scene.movingFor) {activeActor = this.scene.movingFor}

        //selected actor/tile is based on click
        if (target instanceof CombatTile) { selectedTile = target; selectedActor = selectedTile?.piece?.actor }
        else if (target instanceof CombatActor) { selectedActor = target.actor; selectedTile = target.tile }

        //console.log(`CLICK STATE\nselectedActor`, selectedActor, `\nselectedTile`, selectedTile, `\nactiveActor`, activeActor, `\nactiveAction`, activeAction, `\nstate`, this.scene.state)

        //we can always assume a tile is involved
        if(selectedTile) switch (this.scene.state) {
            /* 
                normal: a state where nothing is actively happening, no process requires care                    
            */
            case 'normal': 
                //players can freely click-move during this period if it's an ally turn and a valid tile
                //console.log("normal", !selectedActor, selectedTile.classList.contains("moviable"), activeActor?.team?.name == "ally")
                if(!selectedActor && selectedTile.classList.contains("movable") && activeActor?.team?.name == "ally") {
                    activeActor.piece.cancelStepAnimation()
                    activeActor.piece.stepToTile(selectedTile)
                    if(env.rpg.markedPreviewTiles) { env.rpg.markedPreviewTiles.forEach(tile => tile.classList.remove(... env.rpg.markedPreviewTileClasses)); env.rpg.markedPreviewTiles = false }
                    //no need to call "endMovement" because that's explicitly for the end of the move phase
                    //done in advanceMod
                }
            break

            /* 
                targeting: a state where someone is targeting an action
                should prevent most other commands/interactions until complete or cancelled
            */
            case 'targeting':
                if(selectedTile.classList.contains('targetable')) {
                    this.scene.targetingFor.selectedTile = selectedTile
                    //valid single-target selection
                    if(selectedActor && !activeAction.aoe) {
                        //console.log('entering target with', activeActor, activeAction, selectedActor)
                        chooseTarget(activeActor, activeAction, selectedActor, actionItem)
                        activeActor.piece.endTargeting()

                    //AOE selection check
                    //if it's an AOE, we use markTiles to check for potential hits
                    //if no actors are found, then we don't do anything
                    } else if(activeAction.aoe) {
                        if(activeAction.type.includes("movement") && (selectedTile.piece && selectedTile.piece != activeActor.piece)) return;

                        //console.log("detected aoe", activeAction.aoe, activeAction)
                        let aoeResults = this.handleActionAOE({originActor: activeActor, targetTile: selectedTile, action: activeAction})

                        if(aoeResults) {
                            activeActor.piece.endTargeting()
                            completeTargeting(activeActor, activeAction, actionItem, false) 
                            if(typeof aoeResults == "object" && !activeAction.type.includes("special")) {
                                aoeResults.then(() => {
                                    advanceTurn(activeActor)
                                })
                            } else if(aoeResults === true && !activeAction.type.includes("special")) {
                                setTimeout(()=>advanceTurn(activeActor), env.ADVANCE_RATE)
                            }
                            
                        }
                    }
                }
            break

            /* 
                animating is used to say that something is happening that shouldn't be interrupted
                i.e. stepToTile is running
                todo: if an error happens here, we'll softlock... so maybe add a fallback later
            */
            case 'animating': break

            /*
                looking is when you're holding shift, allowing you to click-view around
            */
            case 'looking':
                selectedTile.focusOnThisTile()
        }
    }

    cleanUncleanedTargets() {
        if(this.scene.uncleanedTargets) {
            this.scene.uncleanedTargets.forEach(tile=>{
                if(this.scene.uncleanedClasses) tile.classList.remove(... this.scene.uncleanedClasses)
                if(tile.piece) tile.piece.actor.highlight(false)
            })
            delete this.scene.uncleanedTargets
            delete this.scene.uncleanedClasses
        }
    }

    /************************************
    *************************************
            TILE EFFECT ZONE     
    *************************************
    ************************************/
    // similar to statuses, but applied to groups of tiles instead of actors
    // these can act like a variety of things - damage tiles, buff fields, telegraphs, etc
    
    // you can add to this like CombatGrid.TILE_EFFECTS['test'] = { ... }
    static TILE_EFFECTS = {}

    //similar to stage system, default entities
    static ENTITIES = {
        "░": {}, // regular ground tile
        '.': {class: "blocks nevertile notile"}, // blocks invisibly, should be used for stage edges
        ",": { class: "blocks notile"}, // blocks visibly, use this for things that can be changed
    }
}


// this is a utility class used for pathfinding in CombatTile
// min-heap type containa for pathfinding so we don't have to spam sort
class TilePriorityQueue {
    constructor() {
        this._nodes = []
        this._nodeSet = new Set()
    }

    enqueue(priority, key) {
        const node = { key, priority }
        this._nodes.push(node)
        this._nodeSet.add(key)
        this._bubbleUp(this._nodes.length - 1)
    }

    dequeue() {
        const root = this._nodes[0]
        const lastNode = this._nodes.pop()
        this._nodeSet.delete(root.key)

        if (this._nodes.length > 0) {
            this._nodes[0] = lastNode
            this._bubbleDown(0)
        }

        return root.key
    }

    includes(key) {
        return this._nodeSet.has(key)
    }

    isEmpty() {
        return this._nodes.length === 0
    }

    _bubbleUp(index) {
        const node = this._nodes[index]
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2)
            const parent = this._nodes[parentIndex]
            if (node.priority >= parent.priority) break

            this._nodes[index] = parent
            index = parentIndex
        }
        this._nodes[index] = node
    }

    _bubbleDown(index) {
        const length = this._nodes.length
        const node = this._nodes[index]

        while (true) {
            let leftChildIndex = 2 * index + 1
            let rightChildIndex = 2 * index + 2
            let smallest = index

            if (leftChildIndex < length && this._nodes[leftChildIndex].priority < this._nodes[smallest].priority) {
                smallest = leftChildIndex
            }

            if (rightChildIndex < length && this._nodes[rightChildIndex].priority < this._nodes[smallest].priority) {
                smallest = rightChildIndex
            }

            if (smallest === index) break

            this._nodes[index] = this._nodes[smallest]
            index = smallest
        }
        
        this._nodes[index] = node
    }

    clear() {
        this._nodes = []
        this._nodeSet.clear()
    }
}

// CombatTiles are similar to .gridpiece elements in the regular stage system,
// but are intended to offer more control over contents, movement, and interaction
class CombatTile extends HTMLElement {
    constructor() { super() }

    // initialization handled on connection bc also not created with relevant data at time of constructor
    connectedCallback() {
        //get the entity and render anything it needs to go on stage
        const slug = this.getAttribute('slug')
        if(!slug) {
            let er = `no slug attribute defined for combat-tile`
            printError(er, true); throw er
        }

        if (this.scenario?.entities?.[slug]) this.entity = this.scenario.entities[slug]
        else if (CombatGrid.ENTITIES && CombatGrid.ENTITIES[slug]) this.entity = CombatGrid.ENTITIES[slug];

        if (!this.entity) {
            let er = `tile entity ${this.getAttribute('slug')} undefined in either scenario or CombatGrid.ENTITIES`
            printError(er, true); throw er
        }

        if (this.entity.class) {
            this.entity.class.split(' ').forEach(className => {
                //hardblock tiles are tiles that explicitly block because of their definition
                //softblock tiles are also a thing, but are usually temporary or created by statuses/effects
                if(className == "blocks") this.classList.add("hardblock");
                this.classList.add(className)

                if(!this.grid.tilesByType[className]) this.grid.tilesByType[className] = []
                this.grid.tilesByType[className].push(this)
            })
        } else { 
            if(!this.grid.tilesByType["basic"]) this.grid.tilesByType["basic"] = []
            this.grid.tilesByType["basic"].push(this)
        }

        if(this.entity.spawnPoint) {
            if(!this.grid.spawnPoints[this.entity.spawnPoint]) this.grid.spawnPoints[this.entity.spawnPoint] = []
            this.grid.spawnPoints[this.entity.spawnPoint].push(this)
        } else {
            if(!this.entity.class) this.grid.spawnPoints.lastresort.push(this);
            else if(!this.entity.class.includes("blocks") && !this.entity.class.includes("unsafe")) this.grid.spawnPoints.lastresort.push(this);
        }

        // Set custom style variables for "x" and "y"
        this.x = parseInt(this.getAttribute('x'));
        this.y = parseInt(this.getAttribute('y'));
        this.coordinates = {x: this.x, y: this.y}

        this.renderContains()
        this.insertAdjacentHTML(`beforeend`, `<div class="tile-effects"></div>`)
        this.effectsEl = this.querySelector(".tile-effects")
        this.effects = []
        this.effectMap = {} // for quick id-based checking
        this.pseudopieces = [] // tile effects sometimes serve as proxies for a main piece

        if(this.classList.contains("nevertile") && this.nevertile != "reverted") {
            // this is a virtual tile used for padding/spacing
            // the less DOM elements, the better
            this.makeNevertile()
        } else {
            //this is a real tile
            this.addEventListener('mouseenter', this.onMouseEnter.bind(this))
            this.addEventListener('mouseleave', this.onMouseLeave.bind(this))
        }
    }

    //nevertiles are simply added/removed as needed
    //culling tiles that aren't ever going to be used in a combat stage helps reduce memory usage
    //though it's pretty rare that you'll ever need to deNevertile if you plan stages right
    makeNevertile(force) {
        if(this.neverTile && !force) return; // force is for if you're trying to nevertile a "reverted" one
        this.nevertile = true
        this.remove()
    }

    deNevertile() {
        if(!this.nevertile) return;
        this.nevertile = "reverted"
        env.rpg.grid.realgrid.insertAdjacentElement('beforeend', this)
    }


    //can be either a string name or effectObj
    //simple check to see if tile is affected
    hasEffect(effect) {
        const existingEffects = this.effects.filter(effectObj => {
            if (typeof effect === "string") {
                return effectObj.host.slug === effect
            } else { 
                return effectObj.host === effect
            }
        })

        return existingEffects.length > 0 ? existingEffects : false
    }

    //can be either a string name or effectObj
    //returns array of existing effects 
    getEffects(effect) {
        const existingEffects = this.effects.filter(effectObj => {
            if (typeof effect === "string") {
                return effectObj.host.slug === effect
            } else {
                return Object.keys(effect).every(key => effectObj.host[key] === effect[key])
            }
        })

        return existingEffects;
    }

    //must be an object this time
    //if we specify 'creation', this means there's no need to check if the tile is already in the effect
    //renders effect HTML
    addToEffect(effectObj, {length = 1, addingBy = false} = {}) {
        if(
            (addingBy != "creation" && this.effectMap[effectObj.id]) || // don't do anything if it's already in the specified effect
            (effectObj.blockedByLOS && this.classList.contains("los")) // some effects won't go on LOS
        ) {  
            this.removeFromEffectRelativity(effectObj)
            return false
        }
        
        let effectHTML
        if(!effectObj.invisible) {
            this.effectsEl.insertAdjacentHTML(`beforeend`, `<div class="effectfx effectfx-${effectObj.slug} ${effectObj.class || ""} ${effectObj.specialClass || ""} ${effectObj.originTile == this ? `effectfx-origin` : ''}" style="--i: ${this.effects.length}" team="${effectObj.origin?.team?.name}" effectid="${effectObj.id}">${effectObj.effectHTML || ""}${effectObj.specialHTML || ""}</div>`)
            effectHTML = this.effectsEl.querySelector(`.effectfx[effectid="${effectObj.id}"]`)
        }

        effectObj.tiles.push(this)
        if(effectObj.anchorType && addingBy != "shifting") effectObj.tileRelativity.push({x: this.x - effectObj.anchorTo.x, y: this.y - effectObj.anchorTo.y, tile: this})

        let details = {
            host: effectObj,
            fx: effectHTML,
            length
        }
        this.effects.push(details)
        this.effectMap[effectObj.id] = details
        
        if(effectObj?.events?.onTileAdded) effectObj.events.onTileAdded({tile: this, reason: addingBy})

        //some tile effects act as pseudopieces, meaning they're proxy targets for a main actor
        if(effectObj.pseudopiece) {
            this.pseudopieces.push(effectObj.id)
            this._hasPseudopiece = true
        }

        this.classList.add("effectbearer")
        this.setAttribute("definition", "TILE++")
        
        //actors are affected by fields when tiles get them under most cases
        if(effectObj?.events?.onActorAffected && this.piece && addingBy != "shifting") effectObj.events.onActorAffected({tile: this, actor: this.piece.actor, reason: "created"});
        //might still do it for some special effects that hit on shift/creation
        else if(effectObj.hitOnShift && this.piece) effectObj.events.onActorAffected({tile: this, actor: this.piece.actor, reason: "shifting"});

        //this can also trigger onEnter, even if shifting
        if(effectObj?.events?.onEnter && this.piece) effectObj.events.onEnter({actor: this.piece.actor})

        return true
    }

    //shortcut for swapping origin tile of effects
    makeEffectOriginTile(effectObj, state = true) {
        let thisInstance = this.effectMap[effectObj.id]
        if(thisInstance) {
            thisInstance.fx.classList.toggle(`effectfx-origin`, state)
        }
    }

    //can be either a string name or effectObj (but object is best)
    //removes effect HTML, handles deletion of effect if no other tiles left
    removeFromEffect(effect, {removingBy} = {}) {
        let effectObj

        if(typeof effect == "object") effectObj = this.effectMap[effect.id]
        else if(typeof effect == "string") effectObj = this.effects.find((existing) => existing.host.slug === effect)

        //done only if not found/not necessary
        if(typeof effectObj == "undefined") { 
            return false 
        }

        //remove pseudopiece assignment
        if(effectObj.host.pseudopiece) {
            this.pseudopieces = this.pseudopieces.filter(f => f != effectObj.host.id)
            if(!this.pseudopieces.length) this._hasPseudopiece = false
        }

        //remove the effects, handle removal
        if(effectObj.fx) effectObj.fx.remove()

        //we only do this filter thing if advanceTileEffects isn't being used, because it has its own more performant way of doing this
        if(removingBy != "advance") effectObj.host.tiles = effectObj.host.tiles.filter(tile => tile !== this);

        //handle any tile removal, and remove the effect if we aren't already doing this
        if(effectObj.host?.events?.onTileRemoved) effectObj.host.events.onTileRemoved({tile: this})
        if(effectObj.host?.events?.onLeave && this.piece) effectObj.host.events.onLeave({actor: this.piece.actor})
        if(effectObj.host.tiles.length === 0 && removingBy != "delete" && removingBy != "shifting") env.rpg.grid.deleteTileEffect(effectObj.host);

        //a non-shift or non-deletion means it's a specific tile removal we need to do
        //and get rid of it from the effect's anchored relativity list
        // we need to compare not the tiles, but the x + anchorTo.x, and y + anchorTo.y. it's a relative array
        else if(effectObj.host.tiles.length > 0 && removingBy == "consumed" && effectObj.host.anchorType) this.removeFromEffectRelativity(effectObj.host)

        this.effects = this.effects.filter(existing => existing !== effectObj)
        delete this.effectMap[effectObj.host.id]

        if(!this.effects.length) {
            this.classList.remove("effectbearer")
            this.removeAttribute("definition")
        }

        return true
    }

    removeFromEffectRelativity(effectObj) {
        if (!effectObj.anchorType) return
        effectObj.tileRelativity = effectObj.tileRelativity.filter(entry => {
            const relX = this.x - effectObj.anchorTo.x
            const relY = this.y - effectObj.anchorTo.y
            return !(entry.x === relX && entry.y === relY)
        })

        if(effectObj.tileRelativity.length == 0) this.grid.deleteTileEffect(effectObj)
    }

    renderContains() {
        // Render any HTML the entity requires
        if(this.entity?.contains) {
            this.classList.add("combat-prop")
            let contents = generateStageEntityContents(this.entity)
            if(this.entity.contains.dyp) this.innerHTML = `<div class="dyp">${generateStageEntityContents(this.entity)}</div>`
            else this.innerHTML = contents
        }

        // if this is being initialized, then also create any neutral actors (i.e. breakable props) it should start with
        if(!this.initialized) {
            if (this.entity?.contains?.actor) {
                setTimeout(()=>{
                    console.log("spawning independent actor", this.entity.contains.actor)
                    env.rpg.createNeutralActor(this.entity.contains.actor, this)
                }, 100)
            }

            this.initialized = true
        }
    }

    //takes an actorObj and creates a combat-actor element on this tile for that actor
    //connects the two in any way that matters
    createActor(actor) {
        const combatActor = document.createElement('combat-actor')
        combatActor.actor = actor
        combatActor.tile = this
        combatActor.scene = this.scene
        combatActor.setAttribute("for", actor?.base?.slug || actor.slug)

        this.grid.realgrid.appendChild(combatActor)
        this.piece = combatActor
    }

    set x(value) {
        this._x = parseInt(value);
        this.setAttribute('x', value);
        this.style.setProperty('--x', value);
    }

    get x() {
        return this._x;
    }

    set y(value) {
        this._y = parseInt(value);
        this.setAttribute('y', value);
        this.style.setProperty('--y', value);
    }

    get y() {
        return this._y;
    }

    set piece(piece) {
        this._piece = piece

        if(piece == null) {
            if(this?._piece?.actor?.tileClass) this.classList.remove(... this._piece.actor.tileClass.split(" "))
            this.classList.remove("piecebearer")
            this.removeAttribute("team")
        } else {
            if(piece?.actor?.tileClass) this.classList.add(... piece.actor.tileClass.split(" "))
            this.classList.add("piecebearer")
            this.setAttribute("team", piece.actor.team.name)
            this.grid[piece.actor.slug] = this
        }
    }

    get piece() { 
        // prioritize an explicit piece on the tile, if there is one
        let gotten = this._piece

        //if we have a piece, verify it first
        if(gotten & this.grid.pieceMap[gotten?.actor?.slug] != this) {
            gotten = null
            this.piece = null
        }

        // if there is no explicit piece, then see if there's any pseudopieces we can return instead
        // unlikely that there'll ever be collisions but we default to the last (topmost) pseudopiece
        if(!gotten && this?.pseudopieces?.length) {
            gotten = this.effectMap[this.pseudopieces[this.pseudopieces.length - 1]]?.host?.origin?.piece
        }

        return gotten
    }

    /* DOM events */
    onMouseEnter(ev) {
        if(this.scene.currentTeam.name != "ally") return;

        if(this.scene.uncleanedTargets) this.grid.cleanUncleanedTargets()

        let targetingFor = this.scene.targetingFor

        // if we're in targeting and the user is hovering over a targetable tile, we should show the AOE effects if any
        if(this.classList.contains("targetable") && this.scene.state == "targeting" && this.scene?.targetingFor?.action?.aoe) {            
            this.scene.uncleanedTargets = this.grid.getAoETargets({
                tile: this,
                actor: targetingFor.actor,
                action: targetingFor.action,
                actingOn: "valid",
                onEachValidTile: ({tile, data}) => {               
                    if(tile.piece) {
                        if(targetingFor.action.aoe.canHit) 
                            if(!targetingFor.action.aoe.canHit(targetingFor.actor, tile.piece.actor))
                                return;

                        if(targetingFor.action.aoe.canHighlight) {
                            if(targetingFor.action.aoe.canHighlight(targetingFor.actor, tile.piece.actor)) tile.piece.actor.highlight("tile")
                        } else {
                            tile.piece.actor.highlight("tile")
                        }                        
                    }
                    
                    tile.classList.add("aoe-preview")
                    if(targetingFor.action.beneficial) tile.classList.add("aoe-preview-beneficial")
                }
            })

            this.scene.uncleanedClasses = ["aoe-preview", "aoe-preview-beneficial"]
            
        // if we're in targeting and hovering over a targetable tile, but the action is a regular single target,
        } else if(this.classList.contains("targetable") && this.scene.state == "targeting") {
            this.scene.uncleanedTargets = [this]
            this.scene.uncleanedClasses = []

            if(this.piece) {
                this.piece.actor.highlight("piece")
            }
        }

        //this one is just for 'distant' extra aoes, as in 'target' origin
        if(this.scene.uncleanedTargets && targetingFor?.action?.stats?.extraAOE) for (const aoeName in targetingFor.action.stats.extraAOE) {
            const aoeInfo = targetingFor.action.stats.extraAOE[aoeName]

            if(aoeInfo.origin == "target")  {
                this.scene.uncleanedTargets = this.scene.uncleanedTargets.concat(env.rpg.grid.markTiles({
                    originTile: this,
                    shape: aoeInfo.shape || 'square',
                    size: aoeInfo.size || 1,
                    addClass: aoeInfo.addClass,
                    ignoresObstacles: aoeInfo.ignoresBlocks,
                    ignoresLOS: aoeInfo.ignoresLOS,
                    ignoresActors: aoeInfo.ignoresActors,
                    requiresPath: aoeInfo.requiresPath,
                    includesOrigin: typeof aoeInfo.includesOrigin == "undefined" ? true : aoeInfo.includesOrigin,
                    onEachValidTile: ({tile, data}) => {
                        if(tile.piece) if(aoeInfo.canHit) if(!aoeInfo.canHit(targetingFor.actor, tile.piece.actor)) return;
                        tile.classList.add(aoeInfo.addClass)
                    }
                }))

                this.scene.uncleanedClasses.push(aoeInfo.addClass)
            }
        }

        // if we're in neutral state and this tile has an actor piece, we should highlight their box
        else if(this.piece && this.scene.state == "normal") { 
            if(this.piece && this.piece?.actor != env.rpg.currentActor) this.piece.actor.highlight("piece")
        }
    }
    
    //clean up any AOE targeting previews
    onMouseLeave(ev) {
        if(env.rpg.currentTeam.name != "ally") return;
        this.grid.cleanUncleanedTargets()

        if(this.piece && this.scene.state == "normal" && this.piece?.actor != env.rpg.currentActor) this.piece.actor.highlight(false)
    }

    /* A* pathfinding algorithm zone */
    //will return null if no path is found by default
    static pathfindTo(startTile, endTile, {
        //you can pass a "towards" option to say - just get the closest path possible
        //towards returns will be an object with detailed results rather than an array
        //used mostly in enemy pathfinding failures (i.e. no valid path to target)
        towards = false
    } = {}) {
        const start = performance.now()

        let pathInfo = _pathfindLogic(startTile, endTile)

        if(towards) {
            let towardsResults = _pathfindTowardsLogic(endTile, pathInfo)
            const end = performance.now()
            env.rpg.lastPathfindPerformance = end - start
            return towardsResults

        } else {
            
            if(pathInfo.success) {
                let path = _reconstructPath(pathInfo.cameFrom, endTile)
                const end = performance.now()
                env.rpg.lastPathfindPerformance = end - start
                return path
            } else if(startTile.scene.state == "animating" && !env.rpg.allowFailedPathfinding) { // emergency breakout to avoid softlock
                const end = performance.now()
                env.rpg.lastPathfindPerformance = end - start

                 // only break this way if it's not in cutscene
                if(!env.currentDialogue.active && env.rpg.currentActor?.team?.name == "enemy") {
                    if(!env.silenceFailedPathfinding) printError(`pathfinding failed during an animation sequence within ${env.rpg.currentActor.name}'s turn!`, true)
                    startTile.scene.state = false 
                    advanceTurn()
                } else if(!env.currentDialogue.active && env.rpg.currentActor?.team?.name == "ally" & env.rpg.currentActor.piece) {
                    env.rpg.currentActor.piece.startMovement() // we just restart movement for allies since this is only movement related usually
                } 
            }

            return null
        }
    }

    //gets neighbors in primitive shapes
    static getNeighbors(tile, {size = 1, shape = 'square', direction, customShape} = {}) {
        const neighbors = []
        const directions = ['up', 'down', 'left', 'right', 'up-left', 'up-right', 'down-left', 'down-right']

        switch (shape) {
            case 'square':
            case 'circle':
                for (let i = -size; i <= size; i++) {
                    for (let j = -size; j <= size; j++) {
                        if(i === 0 && j === 0) continue; //skip the current tile

                        const neighborX = tile.x + i;
                        const neighborY = tile.y + j;

                        if(
                            (shape == "square" && neighborX >= 0 && neighborX < tile.grid.width && neighborY >= 0 && neighborY < tile.grid.height)
                            ||
                            (shape == "circle" && Math.sqrt(i * i + j * j) <= size && neighborX >= 0 && neighborX < tile.grid.width && neighborY >= 0 && neighborY < tile.grid.height)
                        ) {
                            neighbors.push(tile.grid.getTileFromCoordinates(neighborX, neighborY))
                        }
                    }
                }
            break

            case 'squareRing':
                for (let i = -size; i <= size; i++) {
                    for (let j = -size; j <= size; j++) {
                        if (Math.abs(i) === size || Math.abs(j) === size) {
                            const neighborX = tile.x + i;
                            const neighborY = tile.y + j;

                            if (neighborX >= 0 && neighborX < tile.grid.width && neighborY >= 0 && neighborY < tile.grid.height) {
                                neighbors.push(tile.grid.getTileFromCoordinates(neighborX, neighborY));
                            }
                        }
                    }
                }
            break

            case 'ring':
                for (let i = -size; i <= size; i++) {
                    for (let j = -size; j <= size; j++) {
                        if (Math.abs(i) === size || Math.abs(j) === size) {
                            const neighborX = tile.x + i;
                            const neighborY = tile.y + j;

                            if (neighborX >= 0 && neighborX < tile.grid.width && neighborY >= 0 && neighborY < tile.grid.height) {
                                neighbors.push(tile.grid.getTileFromCoordinates(neighborX, neighborY));
                            }
                        }
                    }
                }
            break
            
            case 'line': 
                let dx = 0
                let dy = 0
        
                switch (direction) {
                    case 'up': dy = -1; break
                    case 'down': dy = 1; break
                    case 'left': dx = -1; break
                    case 'right': dx = 1; break
                    case 'up-left': dx = -1; dy = -1; break
                    case 'up-right': dx = 1; dy = -1; break
                    case 'down-left': dx = -1; dy = 1; break
                    case 'down-right': dx = 1; dy = 1; break
                    default: throw new Error(`Invalid neighbor line direction: ${direction}`)
                }
        
                for (let i = 0; i < size; i++) {
                    const neighborX = tile.x + dx * (i + 1)
                    const neighborY = tile.y + dy * (i + 1)
        
                    if (neighborX >= 0 && neighborX < tile.grid.width && neighborY >= 0 && neighborY < tile.grid.height)
                        neighbors.push(tile.grid.getTileFromCoordinates(neighborX, neighborY))
        
                    else break //stop adding neighbors if it runs off the grid
                }                
            break

            case 'angular': //like line but limited to 45deg directions
                for (let direction of directions) neighbors.push(...tile.getNeighbors({ size: size, shape: 'line', direction: direction }))
            break

            case 'plus': //like line but limited to cardinal directions
                for (let direction of ['up', 'left', 'down', 'right']) neighbors.push(...tile.getNeighbors({ size: size, shape: 'line', direction: direction }))
            break

            case 'cone': // like a square that expands outwards in a given direction
                let coneDirections = []
                switch (direction) {
                    case 'up': coneDirections = ['up', 'up-left', 'up-right']; break;
                    case 'down': coneDirections = ['down', 'down-left', 'down-right']; break;
                    case 'left': coneDirections = ['left', 'up-left', 'down-left']; break;
                    case 'right': coneDirections = ['right', 'up-right', 'down-right']; break;
                    case 'up-left': coneDirections = ['up', 'left', 'up-left']; break;
                    case 'up-right': coneDirections = ['up', 'right', 'up-right']; break;
                    case 'down-left': coneDirections = ['down', 'left', 'down-left']; break;
                    case 'down-right': coneDirections = ['down', 'right', 'down-right']; break;
                    default: throw new Error(`Invalid neighbor cone direction: ${direction}`);
                }

                for (let coneDirection of coneDirections) {
                    neighbors.push(...tile.getNeighbors({ size: size, shape: 'line', direction: coneDirection }));
                }
            break

            case 'custom':
                /* 
                    customShape is a string i.e.
                    customShape = `
                        xx.xx
                        ..x..
                        xxoxx
                        x...x
                        xxxxx
                    `

                    or 
                    customShape = `
                        xxxxx
                        ..x..
                        ..o..
                    ` (as in, it doesn't need to be equidistant or in the center)
                */
                let baseShapeGrid = customShape.trim().split('\n').map(row => row.replaceAll(" ", "").split(''))
                let transformedShapeGrid = baseShapeGrid
                
                if(direction != "up") {
                    switch(direction) {
                        case 'up-left': case 'down-left': case 'left': transformedShapeGrid = baseShapeGrid[0].map((val, index) => baseShapeGrid.map(row => row[index])).reverse(); break;
                        case 'up-right': case 'down-right': case 'right': transformedShapeGrid = baseShapeGrid[0].map((val, index) => baseShapeGrid.map(row => row[index])).reverse().map(row => row.reverse()); break;
                        case 'down': transformedShapeGrid = baseShapeGrid.reverse(); break;
                    }
                }

                let finalShapeRows = transformedShapeGrid.map(row => row.join(''))
                

                console.log("got custom shape direction", direction, transformedShapeGrid, finalShapeRows, "from original", baseShapeGrid)
                let originX, originY

                for (let y = 0; y < finalShapeRows.length; y++) {
                    const row = finalShapeRows[y];
                    for (let x = 0; x < row.length; x++) {
                        if (row[x] === 'o') {
                            originX = x;
                            originY = y;
                            //console.log("origin is", originX, originY)
                        }
                    }
                }

                for (let y = 0; y < finalShapeRows.length; y++) {
                    const row = finalShapeRows[y];
                    for (let x = 0; x < row.length; x++) {
                        if (row[x] === 'x') {
                            const neighborX = tile.x + (x - originX);
                            const neighborY = tile.y + (y - originY);
                            if (neighborX >= 0 && neighborX < tile.grid.width && neighborY >= 0 && neighborY < tile.grid.height) {
                                neighbors.push(tile.grid.getTileFromCoordinates(neighborX, neighborY));
                            }
                        }
                    }
                }
                console.log("neighbors", neighbors)
            break
        }

        return neighbors
    }

    //checks for any LOS-blocking tiles between this and the target
    //adaptation of Bresenham line algo
    static hasSightLineTo(startTile, endTile) {
        if(!startTile || !endTile) { 
            console.log(startTile, endTile)
            throw 'queried tiles do not exist. probably means the scene stage plan is missing some definitions'
        }
        let x0 = startTile.x, y0 = startTile.y;
        let x1 = endTile.x, y1 = endTile.y;
        let dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
        let sx = (x0 < x1) ? 1 : -1, sy = (y0 < y1) ? 1 : -1;
        let err = dx - dy
    
        while(true) { // 
            if(startTile.grid.getTileFromCoordinates(x0, y0).blocksLOS) { return false }
    
            if(x0 === x1 && y0 === y1) break
            let e2 = 2 * err
            if(e2 > -dy) { err -= dy; x0 += sx }
            if(e2 < dx) { err += dx; y0 += sy }
        }
    
        return true
    }
    
    distFrom(endTile) {
        return Math.floor(Math.sqrt(Math.pow(this._x - endTile._x, 2) + Math.pow(this._y - endTile._y, 2)));
    }
    
    heuristicCostEstimate(endTile) {
        return Math.abs(this._x - endTile._x) + Math.abs(this._y - endTile._y);
    }

    getRelativeDirection(endTile, invert = false) {
        let dx = endTile.x - this.x
        let dy = endTile.y - this.y

        if(invert) {
            dx = dx * -1
            dy = dy * -1
        }

        if (dx === 0 && dy === 0) return 'none'
        else if (dx === 0) return dy > 0 ? 'down' : 'up'
        else if (dy === 0) return dx > 0 ? 'right' : 'left'
        else if (dx > 0 && dy > 0) return 'down-right'
        else if (dx > 0 && dy < 0) return 'up-right'
        else if (dx < 0 && dy > 0) return 'down-left'
        else if (dx < 0 && dy < 0) return 'up-left'
        else return 'unknown'
    }

    //shortcuts
    //returns one of the closest open tiles, or false if none are found within 4 steps
    getClosestOpenTile({avoidDamageTiles = true, direction = null} = {}) {
        if(!this.piece) return this // cuz it's open :b

        let radius = 1
        let validTiles = []
        let fallbackTiles = []
        let visitedTiles = new Set()

        while (validTiles.length === 0 && radius < 4) {
            for (let x = this.x - radius; x <= this.x + radius; x++) {
                for (let y = this.y - radius; y <= this.y + radius; y++) {
                    const tile = this.grid.getTileFromCoordinates(x, y)
                    if (tile && !tile.piece && !tile.blocking && !visitedTiles.has(tile)) {
                        if (direction) {
                            const relativeDirection = this.getRelativeDirection(tile)
                            if (!relativeDirection.includes(direction) && relativeDirection !== direction.split('-')[0] && relativeDirection !== direction.split('-')[1]) {
                                fallbackTiles.push(tile)
                                visitedTiles.add(tile)
                                continue
                            }
                        }
                        validTiles.push(tile)
                        visitedTiles.add(tile)
                    }
                }
            }
            radius++
        }

        if(validTiles.length === 0) validTiles = fallbackTiles
        if(validTiles.length === 0) return false

        if(avoidDamageTiles) {
            let baseTiles = validTiles
            validTiles = validTiles.filter(tile => !tile.classList.contains("damagetile"))
            //we avoid, but will fall back to them if needed
            if(validTiles.length) return validTiles.sample();
            else return baseTiles.sample()
        }

        return validTiles.sample()
    }

    focusOnThisTile() {
        this.grid.focusOnTile(this)
    }

    getTileByRelativity(dx, dy) {
        return this.grid.getTileFromCoordinates(this.x + dx, this.y + dy)
    }

    /* instances shortcut */
    hasSightLineTo(endTile) { return CombatTile.hasSightLineTo(this, endTile) } 
    getNeighbors(options) { return CombatTile.getNeighbors(this, options) } 
    pathfindTo(endTile, options) { return CombatTile.pathfindTo(this, endTile, options) } 

    //we do this to limit DOM interaction during pathfinding
    static get observedAttributes() { return ['class'] }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'class') {
            if(this.classList.contains('blocks')) {
                this.blocking = true // counts as obstacle and cannot go through
            } else if(this.classList.contains('nopass')) {
                this.blocking = "soft" // can target, just not go through
            } else {
                this.blocking = false
            }

            this.untargetable = this.classList.contains("untargetable")

            this.blockLOS = this.classList.contains('los')
        }
    }
}

//CombatActors represent actors on the grid! their actual actors (i.e. hp, statuses, actions) are still represented via regular combat logic/declarations
//this class mainly controls position, movement and notably pathfinding on the grid
class CombatActor extends HTMLElement {
    constructor() { super() }

    connectedCallback() {
        this.grid = this.tile.grid
        this.x = this.tile.x;
        this.y = this.tile.y;

        //we assume that the actor is set in advance
        if(this.actor.graphic) {
            this.innerHTML = `
            <div class="actor-stand ${this.actor.base.standClass || ""}" for="${this.actor.base.slug}" team="${this.actor.team.name}">
                ${this.actor.graphic.replaceAll('%SLUG', this.actor.slug)}
                <div class="floatbox"></div>
                <div class="combat-dialogue"></div>
            </div>
            `

            //there's probably a smarter way of doing this lol whatever
            this.actor.sprite = this.firstElementChild.children[0]
            this.actor.sprite.hitBox = this.firstElementChild.children[1]
            this.actor.sprite.dialogueBox = this.firstElementChild.children[2]
        } else this.actor.sprite = this

        if(this.actor.base.events) {
            if(this.actor.base.events.onPieceCreation) this.actor.base.events.onPieceCreation(this.actor.sprite)
            if(this.actor.sprite && this.actor.base.events.onSpriteCreation) this.actor.base.events.onSpriteCreation(this.actor.sprite)
        }
        if(env.rpg.settings.actorSpriteProcess) env.rpg.settings.actorSpriteProcess(this.actor)

        if(this.innerHTML.includes("entity=")) this.classList.add('has-target')

        this.actor.piece = this
        this.setAttribute("team", this.actor.team.name)
    }

    startTargeting(action, actionItem) {
        this.scene.state = "targeting"
        if(env.rpg.currentTeam.name == "ally") this.scene.targetingFor = {actor: this.actor, action, actionItem}

        this.scene.currentTargetableTiles = this.grid.markTiles({
            originTile: this.tile,
            shape: action.targeting || 'square', // to be altered per action
            size: action?.stats?.range || action.range || 1,
            addClass: "targetable",
            ignoresObstacles: action.ignoresBlocks || false,
            ignoresActors: typeof action.ignoresActors == "undefined" ? true : action.ignoresActors,
            requiresPath: action.requiresPath || false,
            includesOrigin: typeof action.includesOrigin != "undefined" ? action.includesOrigin : action.type.includes("self"),
            ignoresLOS: action.ignoresLOS,
            onTileCheck: ({tile, validity, validTiles, data}) => {
                if(tile.piece && action.type.includes("opponent") && tile?.piece?.actor?.team?.name == this.actor.team.name) return false
                if(tile.untargetable) return false

                if(tile.piece && !action.type.includes("movement")) { 
                    if(this.scene.targetingFor.action?.aoe?.canHit) 
                        if(!this.scene.targetingFor.action.aoe.canHit(this.scene.targetingFor.actor, tile.piece.actor)) 
                            return false 
                } else if(action.type.includes("movement") && tile.piece) return false // movement actions move to the selected tile
                return true
            }
        })

        this.scene.statPlates = []
        this.scene.actorList.forEach(actor=>{
            if(actor?.piece?.tile) {
                let statPlate = document.createElement('div')
                statPlate.classList.add('piece-stat')
                statPlate.textContent = `${actor.hp}HP${actor.bp ? `::${actor.bp}BP` : ``}`
                this.scene.statPlates.push(statPlate)
                actor.piece.tile.insertAdjacentElement('beforeend', statPlate)
            }
        })

        env.rpg.refresh()
    }

    endTargeting() {
        delete env.rpg.nevermind
        this.scene.state = false
        if(this.scene.currentTargetableTiles) this.scene.currentTargetableTiles.forEach(tile => tile.classList.remove('targetable'))
        if(this.scene?.statPlates?.length) this.scene.statPlates.forEach(statPlate=>statPlate.remove())
    }

    //on player turns, you can move an actor around as much as you want within their starting range
    //doesn't lock in their position until you take an action, which is what actually ends their turn
    startMovement() {
        if(this.actor.move === 0) return; //nomove
        if(this.scene.movingFor) this.endMovement(); // to re-init movement as needed

        this.scene.state = false
        this.scene.movingFor = this.actor
        this.grid.movableTiles = this.grid.markTiles({
            originTile: this.tile,
            shape: 'square',
            size: (this.actor.move || 3) + (this.actor?.effectiveStats?.moveMod || 0),
            requiresPath: true,
            ignoresActors: false,
            addClass: "movable",
            ignoresLOS: true,
            includesOrigin: true
        })

        env.rpg.refresh()
    }

    endMovement() {
        if(!env.rpg.movingFor || !this.grid.movableTiles) return;

        this.grid.movableTiles.forEach(tile=>tile.classList.remove("movable"))
        if(this.scene.movingFor == this.actor) {
            delete this.scene.movingFor
            delete this.grid.movableTiles
        }

        env.rpg.refresh()
    }
    
    //walks a character to their chosen tile
    stepToTile(tile, {speed = 200, stepCallback, endCallback} = {}) {
        this.scene.state = "animating"
        let path = this.tile.pathfindTo(tile)
        if (path) {
            let i = 0
            const animateStep = () => {
                try{ 
                    if (i < path.length) {
                        const nextTile = path[i]
                        this.moveToTile(nextTile, {follow: false, reason: "stepping"})
                        this.animateTimeout = setTimeout(animateStep, speed + ++i)
                        if (stepCallback) stepCallback(nextTile, {timeout, endCallback}); // in case of some sort of cancellation
                    } else {
                        this.scene.state = false
                        if(endCallback) endCallback()
                    }
                } catch(e) {printError(e)}
            }
            this.animateTimeout = setTimeout(animateStep, 0)
        } else if(!env.rpg.allowFailedPathfinding) { // force it bc this function is only called when something should be valid anyway
            path = false
            this.teleportToTile(tile)
        } else {
            path = false
        }

        //we animate to da tile
        tile.focusOnThisTile()

        //call immediately if it's a self-animate
        if(this.tile == tile) { 
            console.warn('DETECTED SELF-TILE END')
            if(endCallback) endCallback() 
        }

        env.rpg.refresh()

        return path
    }
    cancelStepAnimation() { clearTimeout(this.animateTimeout); this.scene.state = false }

    //like above but with coords
    stepToCoords(x, y, options) {
        const tile = this.grid.getTileFromCoordinates(x, y);
        if (tile) {
            this.stepToTile(tile, options)
        } else {
            printError(`Invalid coordinates: (${x}, ${y})`, true);
        }
    }

    //special animation type
    animateToTile(tile, {duration, animation, endCallback, follow = false} = {}) {
        this.scene.state = "animating"

        let oldTile = this.tile

        this.style.setProperty("--anim-x-from", oldTile.x)
        this.style.setProperty("--anim-y-from", oldTile.y)
        this.style.setProperty("--anim-x-to", tile.x)
        this.style.setProperty("--anim-y-to", tile.y)

        this.classList.add(`actoranim-${animation}`)

        if(follow) tile.focusOnThisTile()

        setTimeout(() => {
            this.moveToTile(tile, {follow, reason: "animating"})
            this.classList.remove(`actoranim-${animation}`)
            if(endCallback) endCallback()            
        }, duration + 50) //buffer time

        env.rpg.refresh()
    }

    //direct move - teleports actor to position
    moveToTile(tile, {follow = true, reason} = {}) {
        if (this.tile == tile || !this.tile) { return }

        if(tile.piece) {
            console.warn(this, "tried to move to a tile with someone on it", tile, "probably due to changing circumstances")
            return
        }

        let oldTile = this.tile
        this.tile = tile

        //if the tile they're leaving has tileEffects, check for any that have an onLeave
        oldTile.effects.forEach(effect => {
            if(tile.effectMap[effect.host.id]) return; // they're moving to another tile within the same effect
            if(effect.host?.events?.onLeave) effect.host.events.onLeave({actor: this.actor})
        })

        if(this.actor.hostingEffects) { // if this actor is host to any effect
            this.actor.hostingEffects.forEach(effect => {
                if(!effect.anchorActor) return; // only do this for anchored effects
                
                this.grid.moveTileEffect(effect, {position: {x: this.x, y: this.y}})
            })
        }

        if(follow) this.grid.focusOnTile(tile)
        
        //if the tile they're entering has tileEffects, check for relevant events
        this.tile.effects.forEach(effect => {
            //only do onEnter if the one they're coming from isn't in it
            if(effect.host?.events?.onEnter && !oldTile.effectMap[effect.host.id]) effect.host.events.onEnter({actor: this.actor});

            if(reason) {
                //console.log(reason, oldTile, tile, effect.host?.events?.onActorAffected)
                if(reason == "knockback" && 
                    oldTile != tile && 
                    effect.host?.events?.onActorAffected &&
                    (
                        //we only hit enemies with knockback effects once
                        (// and don't do it if their old tile was the same effect
                            !env.rpg.turnData[`${this.actor.slug}-${effect.host.id}`] &&
                            !oldTile.effectMap[effect.host.id]
                        ) 
                        ||              
                        //unless it's retriggerable          
                        effect.host.knockbackRetrigger
                    )
                ) {
                    effect.host.events.onActorAffected({tile: this.tile, actor: this.actor, reason });
                    env.rpg.turnData[`${this.actor.slug}-${effect.host.id}`] = true
                }
                
            }
        })

        //hard call
        if(!reason && this.actor == env.rpg.currentActor && !env.rpg?.turnData?.acted && this.actor.team.name == "ally") {
            this.startMovement() //refresh movement if needed
        }
    }

    //shortcut for calling moveToTile on a slight delay and adding teleport class to actor
    teleportToTile(tile, settings = {}) {
        this.classList.add("teleporting")
        if(settings.instant) {
            this.moveToTile(tile, settings)
            this.classList.remove("teleporting")
        } else {
            env.setTimeout(() => this.moveToTile(tile, settings), 10)
            env.setTimeout(() => this.classList.remove("teleporting"), 200)
        }
    }
    moveToCoords(x, y, options) {
        const tile = this.grid.getTileFromCoordinates(x, y);
        if (tile) {
            this.moveToTile(tile, options);
        } else {
            printError(`Invalid coordinates: (${x}, ${y})`, true);
        }
    }

    //dist shortcut - can take an RPG actor object, combat-actor, or combat-tile
    getDistance(target, {detailed = false} = {}) {
        let targetX, targetY;
        if(target?.piece?.tile) {targetX = target.piece.tile.x; targetY = target.piece.tile.y; } 
        else if(target instanceof CombatActor) { targetX = target.tile.x; targetY = target.tile.y; } 
        else if(target instanceof CombatTile) { targetX = target.x; targetY = target.y; } 
        else {
            console.warn("can't get distance for this entity type", target)
            return null
        }

        const dx = Math.abs(this.x - targetX)
        const dy = Math.abs(this.y - targetY)
        const distance = Math.floor(Math.sqrt(dx * dx + dy * dy))

        if(detailed) {
            if(target.piece.tile == this.tile) return { rawDistance: distance, pathDistance: 0, path: [], canEnter: true};

            const path = this.tile.pathfindTo(target?.piece.tile || target.tile || target, { towards: true })
            if(typeof path.pathDistance == "undefined") return { rawDistance: distance, pathDistance: path.length - 1, path, canEnter: true}
            return { rawDistance: distance, pathDistance: path.pathDistance, path: path.path, endDistance: path.distance, canEnter: false }
        }

        return distance
    }

    //dist shortcut - takes an array of actors (or none), gets the distance from each
    getActorDistance({actors, includeSelf} = {}) {
        const distances = []
        let list = actors || env.rpg.turnOrder

        list.forEach(actor => {
            if ((actor !== this.actor || includeSelf) && actor.piece) {
                const distance = this.getDistance(actor, {detailed: true})
                distance.actor = actor
                distances.push(distance)
            }
        })

        return distances
    }

    // knock this actor back in the specified direction with the specified strength
    // notably, this doesn't just push them back until they hit something, but will also try 
    // to knock them further diagonally if the strength is not yet spent
    // can pass an onImpact function for any extra effects desired
    knockback({direction, strength = 1, onImpact = false, ignoreMods = false, follow = true} = {}) {
        if(this.actor?.immunities?.knockback) return false;

        if(env.rpg.movingFor == this.actor) {
            this.cancelStepAnimation()
            this.scene.state = "animating"
            this.endMovement(); // stop moving in case of KB
        }

        let effectiveDirection = direction
        if(effectiveDirection == "random" || effectiveDirection == "none" || !direction) {
            if(effectiveDirection == "none") console.warn("KB got direction 'none', choosing a random direction instead", this)
            effectiveDirection = ['up', 'down', 'left', 'right', 'up-left', 'up-right', 'down-left', 'down-right'].sample()
        }

        let dx = effectiveDirection.includes('left') ? -1 : effectiveDirection.includes('right') ? 1 : 0;
        let dy = effectiveDirection.includes('up') ? -1 : effectiveDirection.includes('down') ? 1 : 0;
        let remainingStrength = strength;
        let originalTile = this.tile

        //if it's negative KB, we invert the direction BEFORE any mods
        if(remainingStrength < 0) {
            dx = dx * -1
            dy = dy * -1
            remainingStrength = remainingStrength * -1
        }

        //some statuses may reduce or increase the strength of knockback (.knockmod)
        if(!ignoreMods && this.actor?.statusEffects?.length) {
            this.actor.statusEffects.forEach(status => {
                if(status.knockmod) remainingStrength += status.knockmod;
            });
        }
        
        while (remainingStrength > 0) {
            let nextTile = this.grid.getTileFromCoordinates(this.x + dx, this.y + dy);

            // in the case of pseudopieces attached to this
            let nextTilePiece //nextTile can be null
            if(nextTile) nextTilePiece = nextTile.piece == this ? null : nextTile.piece 

            //if the next tile is blocked, try to move in the x or y direction separately
            if (!nextTile || nextTilePiece || nextTile.blocking) {
                if (dx !== 0 && dy !== 0) {
                        //try moving in the x direction only
                        let xTile = this.grid.getTileFromCoordinates(this.x + dx, this.y)
                        if (xTile && !xTile.piece && !xTile.blocking) {
                            nextTile = xTile
                    } else {
                        //try moving in the y direction only
                        let yTile = this.grid.getTileFromCoordinates(this.x, this.y + dy)
                        if (yTile && !yTile.piece && !yTile.blocking) {
                            nextTile = yTile
                        }
                    }
                }
            }

            if (nextTile && !nextTilePiece && !nextTile.blocking) {
                this.moveToTile(nextTile, {follow: false, reason: "knockback"})
                remainingStrength--

            //if they hit SOMEONE rather than a generic obstacle, transfer some knockback to them before trying again
            } else if(nextTile && nextTilePiece) {
                if(onImpact) {onImpact({remainingStrength}); console.log("IMPACT!!")}
                nextTilePiece.knockback({direction: effectiveDirection, strength: remainingStrength - 1})
                remainingStrength--

            // they hit something hard and can't keep going
            } else {
                if(onImpact) {onImpact({earlyEnd: true, remainingStrength}); console.log("IMPACT!!")}
                break
            }
        }
        
        if(this.actor == env.rpg.currentActor) {
            if(follow) this.focusOnTile()
            
            //some fallback protection
            if(env.rpg.movingFor != this.actor && env.rpg.turnData.showingActions) {
                this.startMovement()
                this.scene.state = false
            }
        }

        return true
    }

    //misc shortcuts
    focusOnTile() {
        if(this.tile) this.grid.focusOnTile(this.tile)
    }

    //when setting a tile, we ensure the piece is removed from the previous position
    set tile(tile) {
        if(
            (this._tile && tile == this._tile) || // no change necessary
            tile?.piece // don't go to a tile that has a piece
        ) return;

        if(tile) { // updating existing position
            if(this._tile) this._tile.piece = null // clear old piece

            //update self settings and new tile
            this._tile = tile
            this._tile.piece = this
            this.x = tile.x
            this.y = tile.y
        } else { // clearing bc dead or something
            this._tile = tile
        }
    }

    get tile() { 
        return this._tile
    }

    set x(value) {
        this.lastX = this._x
        this._x = parseInt(value);
        this.setAttribute('x', value);
        this.style.setProperty('--x', value);
    }

    get x() {
        return this._x;
    }

    set y(value) {
        this.lastY = this._y
        this._y = parseInt(value);
        this.setAttribute('y', value);
        this.style.setProperty('--y', value);
    }

    get y() {
        return this._y;
    }

    //on remove, take it off da tile
    disconnectedCallback() {
        if(this.tile) {
            this.tile.piece = null
            this.tile = null
        }
    }
}


// Register the custom elements
customElements.define('combat-scene', CombatScene)
customElements.define('combat-grid', CombatGrid)
customElements.define('combat-tile', CombatTile)
customElements.define('combat-actor', CombatActor)

// this is all a horrific optimization measure to try and fight firefox's JIT interpreter's deoptimization
// it literally makes this take 1s to run and hangs up the main thread if firefox suddenly turns up its nose at it
// i'm pretty sure it only happens if you have the debugger open for a while though, so it's probably just a me thing
// that didn't stop me from going crazy over it for a few days
_openSet = new TilePriorityQueue()
_cameFrom = new Map()
_gScore = new Map()
_fScore = new Map()
_visited = new Set()

function _pathfindLogic(startTile, endTile) {
    _openSet.clear()
    _cameFrom.clear()
    _gScore.clear()
    _fScore.clear()
    _visited.clear()
    let success = false

    _gScore.set(startTile, 0);
    _fScore.set(startTile, startTile.heuristicCostEstimate(endTile));
    _openSet.enqueue(_fScore.get(startTile), startTile);

    while (!_openSet.isEmpty()) { 
        let current = _openSet.dequeue()
        if (current === endTile) { success = true; break }
        _visited.add(current)

        let neighbors = env.rpg.grid.neighborMap.get(current)
        for (let neighbor of neighbors) {
            if (_visited.has(neighbor) || neighbor?._piece || neighbor?._hasPseudopiece || neighbor?.blocking) continue;

            let tentativeGScore = _gScore.get(current) + current.distFrom(neighbor)
            if (tentativeGScore < _gScore.get(neighbor) || !_gScore.has(neighbor)) {
                _cameFrom.set(neighbor, current)
                _gScore.set(neighbor, tentativeGScore)
                _fScore.set(neighbor, _gScore.get(neighbor) + neighbor.heuristicCostEstimate(endTile))
                if (!_openSet.includes(neighbor)) _openSet.enqueue(_fScore.get(neighbor), neighbor)
            }
        }
    }

    return {
        openSet: _openSet,
        cameFrom: _cameFrom,
        visited: _visited,
        success
    }
}

function _pathfindTowardsLogic(endTile, pathInfo) {
    let closestTile = null;
    let closestDistance = Infinity;

    for (let tile of pathInfo.visited) {
        const distance = tile.distFrom(endTile);
        if (distance < closestDistance) {
            closestTile = tile;
            closestDistance = distance;
        }
    }

    if (closestTile) {
        const path = _reconstructPath(pathInfo.cameFrom, closestTile);
        const pathDistance = path.length - 1;
        return { path, pathDistance, distance: closestDistance }
    }

    return null
}

function _reconstructPath(cameFrom, current) {
    const totalPath = [current]
    while (cameFrom.has(current)) {
        current = cameFrom.get(current)
        totalPath.unshift(current)
    }
    return totalPath
}