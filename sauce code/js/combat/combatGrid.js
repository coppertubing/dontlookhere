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
        env.lastScenario = this.scenario

        this.specialProps = {}
        this.turnData = { turn: 0 }
        this.grid = document.createElement('combat-grid')
        this.grid.classList.add("grid-plane")
        this.grid.scene = this
        this.grid.scenario = this.scenario
        if(this.scenario.combatClass) {
            this.scenario.combatClass.split(" ").forEach(cc =>this.classList.add(cc))
        }
        this.id = "combat"
        this.state = false

        this.keypress = (e) => { 
            if(env.rpg.turnData) if(!env.rpg.turnData.twistRefresh) {env.rpg.turnData.twistRefresh = true; env.rpg.refresh()}

            if(e.key.toLowerCase() == "shift" && env.rpg.state == "normal" && !env.currentDialogue?.active && env.rpg.currentTeam.name == "ally" && !env.currentDefinition.startsWith("ACTION++") && !env.currentDefinition.startsWith("STATUS++")) {
                env.rpg.state = "looking"
                env.rpg.toggleStatPlates(true)

            } else if(!this.pauseControls && !env.currentDialogue?.active) this.playerCamControl(e.key.toLowerCase())

            if(e.key.toLowerCase() == "e") {
                env.rpg.toggleTemporarySpeedup({state: true, speed: 200})
            }
        }

        this.keyup = (e) => {
            if(!env.currentDialogue?.active && e.key.toLowerCase() === 'shift' && env.rpg.state == "looking" && env.rpg.currentTeam.name == "ally") {
                env.rpg.state = 'normal'
                env.rpg.toggleStatPlates(false)
            }
        }

        this.toggleLooking = () => {
            if(env.rpg.currentTeam.name != "ally") return;

            if(env.rpg.state == "looking") {
                env.rpg.state = "normal"
                env.rpg.toggleStatPlates(false)
            } else if(env.rpg.state == "normal") {
                env.rpg.state = "looking"
                env.rpg.toggleStatPlates(true)
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
            <div class="render-filter"></div>
            <div id="enemy-team" class="team"></div>
            <div id="ally-team" class="team"></div>
            <div class="key-navigator">
                <div class="stage-arrows">
                    <div class="up" key="w" onclick="javascript:env.rpg.playerCamControl('w')"><i class="cicon ci-up"></i></div>
                    <div class="left" key="a" onclick="javascript:env.rpg.playerCamControl('a')"><i class="cicon ci-left"></i></div>
                    <div class="down" key="s" onclick="javascript:env.rpg.playerCamControl('s')"><i class="cicon ci-down"></i></div>
                    <div class="right" key="d" onclick="javascript:env.rpg.playerCamControl('d')"><i class="cicon ci-right"></i></div>
                    <div class="look" key="hold shift" definition="NOTICE::'toggles LOOKING mode';'click on tile to move camera';'only functions during ally movement phase'" onclick="javascript:env.rpg.toggleLooking()"><i class="cicon ci-nav"></i></div>
                    <div class="speed" key="e" definition="NOTICE::'speed up time for rest of enemy team turns'" onclick="javascript:env.rpg.toggleTemporarySpeedup({state: true, speed: 200})"><i class="cicon ci-right"></i></div>
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
        env.rpg.actorsToRemovePiecesOf = new Set()
        env.rpg.highlightedActors = new Set()
        env.rpg.baseAdvanceRate = env.ADVANCE_RATE
        createRPGeffectMessage()
    
        env.rpg.enemyTeam = {name: "enemy", members: []}
        env.rpg.allyTeam = {name: "ally", members: []}
        env.rpg.neutralTeam = {name: "neutral", members: []}
        
        env.rpg.teams.push(env.rpg.allyTeam, env.rpg.enemyTeam)
        env.rpg.is2D = true

        //team initialization
        this.partyLimit = page?.party?.partyLimit || 100 // bet you wont
        let initAllyTeam = this.scenario.initAllyTeam()
        env.rpg.allyTeam.initial = initAllyTeam
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
        env.rpg.enemyTeam.initial = initEnemyTeam
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

        //initialize stun immunity on each actor with special stun immunity
        env.rpg.turnOrder.forEach(actor=>{
            if(actor.effectiveStats.stunImmunityMod) addStatus({target: actor, status: "stun_immune", length: actor.effectiveStats.stunImmunityMod, noReact: true})
        })

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
        
        this.setGridProperty("--playercontrol-rotation", "135deg")
        this.setGridProperty("--playercontrol-tilt", "-30deg")
        
        env.rpg.enemyTeam.element = env.rpg.querySelector('#enemy-team')
        env.rpg.allyTeam.element = env.rpg.querySelector('#ally-team')
    }

    refresh() { // what's the point of refreshing?
        // i ask myself this constantly.
        // why does firefox eventually inexplicably start rendering at a lower frame rate under the same conditions,
        // unless we slightly jostle the RPG frame for 10 milliseconds periodically?
        // i guess we have to jumpscare the browser with a GPU transform on the containing element periodically
        // so it doesn't doze off? wtf
        // i almost wish this didn't work cause it'd be easier to go like 'oh well, that's just how it runs'
        if(!isFirefoxOnWindows()) return;
        //console.trace()
        env.rpg.classList.add("refresh-anim")
        setTimeout(()=>env.rpg.classList.remove("refresh-anim"), 10)
    }

    //welcome to antivariables. this is me hating on CSS variables after my loving relationship with them for 4 years
    //turns out they're performance hell if you use them like i have been
    //basically, instead of relying on CSS to cascade down with some really frequently changing stuff,
    //i'm now having it directly set the transforms. specifically useful when there's a LOT of things listening to these
    // ONLY USING THIS FOR OFTEN-CHANGING STUFF PRESENTLY
    setGridProperty(property, value) {
        this.specialProps[property] = value
        this.updatePropertyListeners({changedProp: property})
    }

    //takes a prop (i.e. --playercontrol-rotation) and directly updates the intendedtransform
    updatePropertyListeners({changedProp, specificEl, forceTransformVariable, forceDirectAttribute}) {
        let listeners = specificEl || this.querySelectorAll(`[listeningfor*="${changedProp}"]`)
        if(specificEl) listeners = [listeners]
        
        //listeners can either ask for the variable to be set (used in pseudoelements), or to have the transform directly set
        listeners.forEach(el => {
            try { 
                let attributeList = el.getAttribute("listeningfor")
                let transformVariable = el.getAttribute("transformvariable") || forceTransformVariable

                if(!attributeList) return;

                if(el.getAttribute("directattribute") || forceDirectAttribute) {
                    for(const [prop, value] of Object.entries(this.specialProps)) {
                        if(attributeList.includes(prop) && prop.includes("--")) el.style.setProperty(prop, value)
                    }
                }
                
                if((!forceDirectAttribute || forceDirectAttribute == "both") && !el.hasAttribute("directattribute")) {
                    let transform = el.getAttribute('intendedtransform')

                    for(const [prop, value] of Object.entries(this.specialProps)) {
                        if(prop.includes("--")) transform = transform.replaceAll(`var(${prop})`, value)
                    }
                    
                    if(transformVariable) {
                        el.style.setProperty(transformVariable, transform)
                        //console.log(`final transform variable on ${el.id} is`, transformVariable, "which was set to", el.style.getPropertyValue(transformVariable))
                    } else {
                        el.style.transform = transform
                        //console.log(`final transform on ${el.id} is`, transform, "which was set to", el.style.transform)
                    }
                }
            } catch(e) { 
                console.log(changedProp, el, e)
                printError(e)
                printError(`problem updating property listeners for ${changedProp} on element ${el.toString()}`)
            }
        })
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
        let actorDistances = enemy.piece.getActorDistance({includeSelf: true, avoidHazardTiles: enemy?.immunities?.scene_edge ? true : false}) // technically there are other sorts of hazard tiles but let's keep it simple
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

            if(action.targetFilter) good = action.targetFilter(enemy, actor) 
            if(!good) return false;

            let type = action.type
            if(type.includes('autohit')) {
                return actor.slug == enemy.slug
            } else if (type.includes('support') && type.includes('rez')) {
                return actor.team.name === 'enemy' && actor.state === 'dead'
            } else if (type.includes('support') && !type.includes('self')) {
                return actor.team.name === 'enemy' && actor.state !== 'dead' && actor.slug != enemy.slug
            } else if (type.includes('support')) {
                return actor.team.name === 'enemy' && actor.state !== 'dead'
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

                        if(eligible(action, dist.actor)) {
                            let inRangeTiles = dist.path.slice(dist.path.length - range)
                            let safeTiles = inRangeTiles.filter(tile => !tile.hazardous)
                            let selectedTile

                            //console.log("current in range tiles", inRangeTiles)

                            // proceed if there are safe tiles available
                            if(safeTiles.length > 0) {
                                if(action.ignoresLOS) {
                                    selectedTile = safeTiles[0]
                                } else {
                                    selectedTile = safeTiles.find(tile => tile.hasSightLineTo(dist.actor.piece.tile))
                                }

                                //console.log(enemy.slug, dist, inRangeTiles, selectedTile)
                                if(selectedTile) return addAction('moveact', dist.actor, action, selectedTile, dist)
                            }
                        }
                    }

                    // can't use this turn even with movement, so just find a way to get closer (even if invalid)
                    if(eligible(action, dist.actor)) {
                        // furthest tile the enemy can reach
                        let moveIndex = Math.min(move, dist.path.length - 1)
                        let targetTile = dist.path[moveIndex]
                        
                        // default target is hazardous, find the furthest safe tile we can reach
                        // kinda sloppy but most stage arrangements should make this ok
                        if(targetTile.hazardous) {
                            for (let i = moveIndex; i >= 0; i--) {
                                if(!dist.path[i].hazardous) {
                                    targetTile = dist.path[i]
                                    break
                                }
                            }
                        }
                        
                        return addAction('oor', dist.actor, action, targetTile, dist)
                    }
                }
            })
        })
        //console.log("enemy_actioncheck", performance.now())
        console.log("enemy selections are", actionMap)

        //so we can avoid cases where enemies dance between targets in outOfRangeMove and flounder around obstacles
        //if they focus on one target until a better one comes along, that'd work better
        let actorActionSelection
        let pool
        if(actionMap.inRange.length && actionMap.inRangeIfMove.length) pool = actionMap.inRange.concat(actionMap.inRangeIfMove)
        else if(actionMap.inRange.length) pool = actionMap.inRange
        else if(actionMap.inRangeIfMove.length) pool = actionMap.inRangeIfMove
        else if(actionMap.outOfRange.every(act=>act.tile == enemy.piece.tile) && enemy.lastResortActions) { // if they're boxed in and have a last resort action (MUST BE SELF/SPECIAL), use it
            pool = enemy.lastResortActions.map(actionName => {
                let action = env.ACTIONS[actionName]
                return {actor: enemy, action, type: "act", tile: enemy.piece.tile}
            })
        } else if(actionMap.outOfRange.length) pool = actionMap.outOfRange
        else {
            console.warn("no valid actions in actor's action map. maybe a problem if there's no targetFilters involved")
            pool = [{actor: enemy, action: env.ACTIONS["nothing"], type: "act", tile: null}]
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
            let variance = this.grid.markTiles({
                originTile: selectedTile,
                shape: "square",
                size: action.aoe.variance,
                includesOrigin: true
            })

            selectedTile = variance.sample()         
        }

        this.targetingFor = {actor: enemy, action, selectedTile, target: actorActionSelection.actor}

        // focus on actor only if it'd meaningfully affect the camera
        let cameraDelay = 0
        if(
            enemy.piece.getDistance(env.rpg.lastActor) > 4
        ) {
            enemy.piece.focusOnTile()
            cameraDelay = 500
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
                }, (executionTime * innerSteps++) + cameraDelay)
        
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
                }, (executionTime * innerSteps++) + cameraDelay)
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
            }, (executionTime * innerSteps++) + cameraDelay)
        }

        // we first display movement plans if the enemy has any
        if(actorActionSelection.type == 'moveact' || (actorActionSelection.type == 'oor' && actorActionSelection.tile != enemy.piece.tile)) {
            // If the enemy is moving, display the enemy's movement
            setTimeout(() => {
                enemy.piece.startMovement()
            }, (executionTime * steps++) + cameraDelay)

            // Show selected tile the enemy is moving to
            setTimeout(() => {
                actorActionSelection.tile.classList.add('enemy-moving-to')
            }, (executionTime * steps++) + cameraDelay)

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
            }, (executionTime * steps++) + cameraDelay)
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
                    (env.rpg.currentActor != upcomingActor)
                ) {
                    //console.log("effectAdvance", performance.now())
                    this.grid.advanceTileEffects({prevActor: env.rpg.currentActor, actor: upcomingActor})
                    //console.log("effectAdvance", performance.now())

                    //halt and execute any telegraphs
                    if(env.rpg.telegraphQueue.length) {
                        env.rpg.halt = "telegraph"
                    }
                }

                if(!env.rpg.halt && env.rpg.actorsToRemovePiecesOf.size) {
                    env.rpg.halt = "deadPieces"
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

                if((env.rpg.currentActor != env.rpg.lastActor) && env.rpg.currentActor.box) {
                    env.rpg.currentActor.box.classList.remove("current-turn")
                    env.rpg.currentActor.box.classList.add("compactor")
                }

                //run any turn-ending related events
                //console.log("starttileeffectcheck", performance.now())
                if(this.currentActor?.piece?.tile?.effects?.length) this.currentActor.piece.tile.effects.forEach(effect => {
                    if(
                        effect.host?.events?.onActorAffected && 
                        !env?.rpg?.turnData?.calledTileEffects && 
                        (effect.tickEvenIfOriginDead || this.currentActor?.state != "dead") 
                    ) {
                        effect.host.events.onActorAffected({actor: this.currentActor, reason: "turnend"})

                        // if the effect is affectNearbyOnTurnEnd we also want to trigger it for anyone in the tile effect generally
                        if(effect.host.affectNearbyOnTurnEnd && effect.host?.anchorActor == this.currentActor) {
                            effect.host.tiles.filter(t => t.piece && (t.piece.actor != this.currentActor)).forEach(t => {
                                effect.host.events.onActorAffected({actor: t.piece.actor, reason: "turnend-nearby"})
                            })
                        }
                    }
                })

                //separately from onActorAffected, an 'onAnyTurnEnd' (whereas the above is for the current actor mainly)
                env.rpg.turnOrder.forEach(actor=>{
                    if(actor?.piece?.tile?.effects?.length && actor.state != "dead") {
                        actor.piece.tile.effects.forEach(effect=>{
                            if(effect?.host?.events?.onAnyTurnEnd) effect.host.events.onAnyTurnEnd({actor})
                        })
                    }
                })

                //console.log("endtileeffectcheck", performance.now())

                if(this.currentActor.state != "dead" && !env?.rpg?.turnData?.calledTileEffects) {
                    this.grid.advanceTileEffects({actor: this.currentActor, tickType: "onTurnEnd"})
                }

                env.rpg.turnData.calledTileEffects = true
                env.rpg.forceStopMovement = false // fallback
                
                //console.log("done before", performance.now())
            break

            case "halted": // on a successfully halted turn, we can look at the reason and execute telegraphs if needed
                if(env.rpg.haltedAttempt && env.rpg.halt == "telegraph") {
                    //telegraphs use an async animation we can await
                    //it's possible for more than one telegraph to exist
                    try { 
                        this.grid.runTelegraphsInQueue()
                    } catch(e) { printError(e) }
                }

                if(env.rpg.actorsToRemovePiecesOf.size) {
                    this.removePendingPieces()
                }
            break

            case "before": // can be treated like the end of the previous actor's turn - currentActor still refers to the previous person
                if(upcomingActor?.team?.name == "ally") this.toggleTemporarySpeedup({state: false})
            break

            case "after": // this is after all values have been changed and attacks/moves are in motion - NOT the end of their turn.
                //console.log("advancemod after", performance.now())
                if(this.currentActor.state != "dead" && this.currentActor.box) {
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

                //lockup prevention
                if(env.rpg.state == "animating") setTimeout(()=>{
                    if(env.rpg.state == "animating") env.rpg.state = "normal"
                }, 500)
            break
        }
    }

    toggleTemporarySpeedup({speed, state}) {
        if(env.currentDialogue?.active || env.rpg.halt) return;

        let actualState = (state !== undefined) ? state : !env.tempAdvanceRateStorage
        console.log("actualState for toggleTemporarySpeedup is", actualState)

        if(actualState && !env.tempAdvanceRateStorage) {
            if(env.rpg.currentActor.team.name == "enemy") {
                env.tempAdvanceRateStorage = env.ADVANCE_RATE
                env.ADVANCE_RATE = speed
                console.log("advance rate set to", speed, "for enemy turn")
                this.classList.add("spedup")
                play("talkrot1", 3)
                chatter({actor: 'plainsys', text: `processing speed increased`, readout: true})
            } else {
                console.log("current actor isn't team enemy so not doing")
            }
        } else if(env.tempAdvanceRateStorage) {
            env.ADVANCE_RATE = env.tempAdvanceRateStorage
            delete env.tempAdvanceRateStorage
            this.classList.remove("spedup")
            console.log("advance rate reset to normal", env.ADVANCE_RATE)
            chatter({actor: 'plainsys', text: `processing speed normalized`, readout: true})
        }
    }

    removePendingPieces(asyncCall = false) {
        env.rpg.actorsToRemovePiecesOf.forEach(actor=> this.removePendingPiece(actor, asyncCall))
        env.rpg.actorsToRemovePiecesOf.forEach(actor=> env.rpg.actorsToRemovePiecesOf.delete(actor))
        
        if(env.rpg.halt == "deadPieces" && !asyncCall) setTimeout(() => {
            env.rpg.halt = false
            advanceTurn(env.rpg.currentActor)
        }, 500)
    }

    removePendingPiece(actor) {
        let removed = false
        if(actor.piece) {
            actor.deadPiece = actor.piece // we separate because many things use .piece as a reference for if an actor has a grid presence
            if(actor.piece.tile) {
                actor.lastLivingTile = actor.piece.tile
                actor.piece.tile.piece = null
            }
            actor.piece.tile = null
            actor.piece = null

            env.rpg.updatePropertyListeners({specificEl: actor.deadPiece.stand, forceDirectAttribute: true})
            actor.deadPiece.style.setProperty("--rotsnap", env.rpg.specialProps["--playercontrol-rotation"])
            actor.deadPiece.style.setProperty("--dieangle", `${rand(-30, 30)}deg`)
            actor.deadPiece.classList.add('deadpiece')

            setTimeout(() => {
                triggerStatusEvents({target: actor, eventName: "onPieceRemove"})
            }, 500)

            removed = true
        }

        env.rpg.actorsToRemovePiecesOf.delete(actor)
        return removed
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

            env.rpg.toggleStatPlates(false)
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
            this._state = "normal"
            this.setAttribute('state', 'normal')
        } else {
            this._state = newState
            this.setAttribute('state', newState)
        }

        // emergency fallback. if we're animating after 15 seconds from the last animation,
        // something's busted. this might fix it
        if(newState == "animating" && !env.rpg.specialAnimation) {
            clearTimeout(this._stateTimeout)
            this._stateTimeout = setTimeout(() => {
                if(this._state == "animating") {
                    this._state = "normal"
                    this.setAttribute('state', 'normal')
                    console.warn(`ANIMATION TIMEOUT WAS TRIGGERED!!! last animation called: ${env.rpg.lastActionAnimation}`)
                }
            }, 15000)
        }
    }

    get state() {
        return this._state
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
        const rotationRaw = parseFloat(this.specialProps["--playercontrol-rotation"].replace('deg', '')) || 0
        const tiltRaw = (parseFloat(this.specialProps["--playercontrol-tilt"].replace('deg', '')) * -1) || 0

        if ((direction === "w" || direction === "arrowup") && tiltRaw <= 75) this.setGridProperty("--playercontrol-tilt", `${(tiltRaw + 15) * -1}deg`) 
        else if ((direction === "s" || direction === "arrowdown") && tiltRaw >= 30) this.setGridProperty("--playercontrol-tilt", `${(tiltRaw - 15) * -1}deg`)  
        else if ((direction === "a" || direction === "arrowleft")) this.setGridProperty("--playercontrol-rotation", `${rotationRaw - 45}deg`)
        else if ((direction === "d" || direction === "arrowright")) this.setGridProperty("--playercontrol-rotation", `${rotationRaw + 45}deg`)
    
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
        if(env.rpg.cameraLock) return;

        let setSomething = false
    
        if(x !== false) {this.setGridProperty("--camera-x", x); setSomething = true};
        if(y !== false) {this.setGridProperty("--camera-y", y); setSomething = true};
        if(height !== false) {this.grid.style.setProperty("--camera-height", height); setSomething = true} else this.grid.style.removeProperty("--camera-height");
        if(distance !== false) {this.grid.style.setProperty("--camera-distance", distance); setSomething = true} else this.grid.style.removeProperty("--camera-distance");
        if(offsetCamera !== false) {this.grid.style.setProperty("--camera-offset", offsetCamera); setSomething = true} else this.grid.style.removeProperty("--camera-offset");
        
        if(playerRotation !== false) {this.specialProps.oldRotation = this.specialProps["--playercontrol-rotation"]; this.setGridProperty("--playercontrol-rotation", `${playerRotation}deg`); this.grid.style.setProperty("--playercontrol-rotation", `${playerRotation}deg`); setSomething = true} else if(this.specialProps.oldRotation !== undefined) {this.setGridProperty("--playercontrol-rotation", this.specialProps.oldRotation); delete this.specialProps.oldRotation; this.grid.style.removeProperty("--playercontrol-rotation")};
        if(playerTilt !== false) {this.specialProps.oldTilt = this.specialProps["--playercontrol-tilt"]; this.setGridProperty("--playercontrol-tilt", `${playerTilt}deg`); this.grid.style.setProperty("--playercontrol-tilt", `${playerTilt}deg`); setSomething = true} else if(this.specialProps.oldTilt !== undefined) {this.setGridProperty("--playercontrol-tilt", this.specialProps.oldTilt); delete this.specialProps.oldTilt; this.grid.style.removeProperty("--playercontrol-tilt")};

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

    //toggles the display of actor statPlates
    toggleStatPlates(state) {
        this.actorList.forEach(actor=>{
            if(actor?.piece) {
                actor.piece.toggleStatPlate(state)
            }
        })
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
            <div id='combat-rotator' class='grid-container' listeningfor="--playercontrol-tilt--playercontrol-rotation" intendedtransform="
        rotateX(90deg) 
        translateY(calc(var(--perspective) - (var(--gridTileSize) * var(--camera-distance))))
        translateZ(calc(var(--camera-height) * -1 * var(--gridTileSize)))
        rotateX(var(--playercontrol-tilt))
        rotateZ(var(--playercontrol-rotation))
        var(--camera-offset)">
                <div id='combat-extra'>
                    <div id='combat-animator' class='grid-animator'>
                        <div id='combat-realgrid' class='realgrid' listeningfor="--camera-x--camera-y" intendedtransform="translateY(calc(var(--camera-y) * var(--gridTileSize) * -1)) 
        translateX(calc(var(--camera-x) * var(--gridTileSize) * -1))    
        var(--personal-offset)"></div>
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
        if(!tile || env.rpg.cameraLock) return;
        env.rpg.setGridProperty('--camera-x', tile.x) 
        env.rpg.setGridProperty('--camera-y', tile.y)
        if(env.rpg.highlightedActors.size) clearActorHighlights()
    }

    // places an actor piece back on the board
    // animation is any actorAnim)
    // ING TODO - remove default animation
    replaceActorPiece({target, location, specificTile, anim = "fallin", animDuration = 500}) {
        if(target.deadPiece) {
            target.deadPiece.remove()
            delete target.deadPiece

        } else if(target.piece) { // if their pre-deadpiece is still on the board somehow
            env.rpg.actorsToRemovePiecesOf.delete(target)
            target.piece.remove()

            if(target.piece.tile) target.piece.tile.piece = null
            target.piece.tile = null
            target.piece = null
        }

        console.log("replaceactorpiece got", target, location, specificTile)
        let newTile
        switch(location) {
            case "currentActor": // finds the closest touching tile to the current actor and places the piece there
                try {
                    if(env.rpg.currentActor?.piece?.tile) newTile = env.rpg?.currentActor?.piece?.tile.getClosestOpenTile();
                    else {
                        let targetTile = target.team.members.find(m=>m.state == "living")?.piece?.tile
                        if(!targetTile) targetTile = target.team.members[0]?._piece?.tile || target.team.members[0]?.deadpiece?.tile || target.lastLivingTile
                        if(targetTile) newTile = targetTile.getClosestOpenTile()
                    }
                } catch(e) {printError(e)}

            case "specificTile":
                if(specificTile) if(!specificTile.piece && !newTile) newTile = specificTile
            

            default: // this means the location isn't a special case and we should target by tile class
                if(location && location != "currentActor" && location != "specificTile" && !newTile) {
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

        if(anim && target.piece) {
            env.rpg.updatePropertyListeners({specificEl: target.piece.stand, forceDirectAttribute: "both"})
            env.rpg.updatePropertyListeners({specificEl: target.sprite, forceDirectAttribute: "both"})
            env.rpg.updatePropertyListeners({specificEl: target.sprite.hitBox, forceDirectAttribute: "both"})
            
            target.piece.classList.add(`actoranim-${anim}`)
            setTimeout(()=>{
                target.piece.classList.remove(`actoranim-${anim}`)
            }, animDuration + 50)
        }

        else if(target.piece) setTimeout(() => {
            env.rpg.updatePropertyListeners({specificEl: target.piece.stand})
            env.rpg.updatePropertyListeners({specificEl: target.sprite})
            env.rpg.updatePropertyListeners({specificEl: target.sprite.hitBox})
        }, 50)
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
        pathMarkTo, // a tile that we'll get the path to, and then markTiles the passed specs to every tile on the way

        // optional checks for common requirements
        ignoresObstacles = false, // if 'blocks' doesn't matter, set to true
        ignoresActors = true, // set to false to fail potential tiles if they have actors
        requiresPath = false, // to check if origin has a valid path to each potential tile
        ignoresLOS = false, //typically we DO care about LOS so this is false by default
        markingForActionTarget = false, // if this is true, we don't care that some tiles are "soft" blocks - they should be targetable for requiresPath
        
        // optional functions
        onTileCheck, // additional check function on a tile's validity. return end validity in case of alteration
        onEachValidTile, // function executed on each valid tile (don't add classes this way, it's extra)
        onEachValidTileActor, // like the above, but specifically for actors on each valid tile

        // return modifications
        // pleaseReturn can take... "valid" for valid tiles, or "actors" for actors on valid tiles
        pleaseReturn = "valid", 
        sortByOriginDistance = true,

        // passthrough data - give an object here and you can do stuff with it in checks
        data
    }) {
        if(!originTile) return [];

        // pathMarkTo lets us draw sillay shapelines
        // probably should only do this with circles and squares cause I have no idea what will happen with others
        if(pathMarkTo) {
            const path = originTile.pathfindTo(pathMarkTo, {ignoresActors, ignoresObstacles})
            if(!path) return []

            const allValidTiles = new Set()
            for(const pathTile of path) {
                const results = this.markTiles({ 
                    // kill me
                    originTile: pathTile, shape, customShape, size, direction,
                    includesOrigin, addClass, ignoresObstacles, ignoresActors,
                    requiresPath, ignoresLOS, markingForActionTarget,
                    onTileCheck, onEachValidTile, onEachValidTileActor,
                    pleaseReturn, sortByOriginDistance: false, data
                })
                for(const result of results) allValidTiles.add(result)
            }

            let returnValue = [...allValidTiles]
            if(sortByOriginDistance) {
                returnValue.sort((a, b) => {
                    const aTile = a.piece ? a.piece.tile : a
                    const bTile = b.piece ? b.piece.tile : b
                    return aTile.distFrom(originTile) - bTile.distFrom(originTile)
                })
            }

            return returnValue
        }

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
                                (!ignoresObstacles && (
                                    neighbor.blocking === true ||
                                    (neighbor.blocking === "soft" && !markingForActionTarget)
                                )) ||
                                (!ignoresActors && neighbor.piece)
                            ) continue

                            const path = originTile.pathfindTo(neighbor, {ignoresActors, ignoresObstacles, pathfindingForTargeting: markingForActionTarget})
                            if(path && baseTiles.includes(neighbor)) {
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

        let returnValue = pleaseReturn == "actors" ? validTiles.map(tile => tile.piece?.actor).filter(actor => actor !== undefined) : validTiles
        if(sortByOriginDistance) {
            returnValue.sort((a, b) => {
                const aTile = a.piece ? a.piece.tile : a
                const bTile = b.piece ? b.piece.tile : b
                const aDistance = aTile.distFrom(originTile)
                const bDistance = bTile.distFrom(originTile)
                return aDistance - bDistance
            })
        }
        
        return returnValue
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
                case "nonallies": newValidity = tile.piece && tile?.piece?.actor?.team?.name != actor?.team.name; break
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
            pleaseReturn: (actingOn == "allies" || actingOn == "foes" || actingOn == "nonallies") ? "actors" : actingOn,

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

                if(aoe.distant == "onTargetTile") {
                    markPassData.originTile = tile.getTileByRelativity(
                        Math.sign(actor.piece.tile.x - tile.x),
                        Math.sign(actor.piece.tile.y - tile.y)
                    )
                }

                //ing update - not toooo sure why i did this
                //markPassData.direction = aoe.distant ? markPassData.originTile.getRelativeDirection(actor.piece.tile, true) : markPassData.originTile.getRelativeDirection(tile)
                markPassData.direction = markPassData.originTile.getRelativeDirection(tile)
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
    handleActionAOE({originActor, targetTile, action, actionSettings = {}}) {
        if(!action.aoe) return false;
        env.rpg.lastUpdate = Date.now()
        delayAdvance(200)

        let effectExec = () => {
            if(action.aoe?.effect) {
                let aoeTiles = this.getAoETargets({
                    tile: targetTile,
                    actor: originActor,
                    action,
                    pleaseReturn: "valid"
                })
                
                action.aoe.effect({user: originActor, tiles: aoeTiles, selectedTile: targetTile, beingUsedAsync: actionSettings.beingUsedAsync})
            }
        }
        
        if(action?.aoe?.effectBeforeExec) effectExec()
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
                if(action.aoe && !action?.aoe?.effectBeforeExec) effectExec()

                let initialAction
                if(potentialTargets.length) potentialTargets.forEach((targetActor, i) => {
                    if(!i) {
                        initialAction = useAction(originActor, action, potentialTargets[0], {sceneAnim: action.sceneAnim, noUseMessage: action.type.includes("telegraph"), ... actionSettings})
                        return
                    }

                    setTimeout(()=>{
                        useAction(originActor, action, targetActor, {actionMessageIndex: initialAction.i, sceneAnim: action.sceneAnim, noUseMessage: action.type.includes("telegraph"), ... actionSettings})
                    }, i * env.ADVANCE_RATE * 0.1)
                })

                //meaning this is a ground target and a self-exec
                else if(action.type.includes("self")) useAction(originActor, action, originActor, {sceneAnim: action.sceneAnim, ... actionSettings})
            }

            if(this.scene.uncleanedTargets) this.cleanUncleanedTargets()

            //we do and return an async animation if it's got one
            if(action.sceneAnim && originActor?.piece?.tile && targetTile) {
                let anim = env.COMBAT_ANIMS[action.sceneAnim]
                if(!anim) throw `no animation definition found for ${action.sceneAnim}`
                
                if(!actionSettings.beingUsedAsync) {
                    env.rpg.lastActionAnimation = action.sceneAnim
                    this.scene.state = "animating"
                    if(anim?.duration) { delayAdvance(anim.duration + 100) }
                }

                return anim.exec({strikeLogic, originXY: {x: originActor.piece.tile.x, y: originActor.piece.tile.y}, targetXY: {x: targetTile.x, y: targetTile.y}, origin: originActor, targetTile, potentialTargets, action, data: actionSettings})
            } else {
                setTimeout(()=>strikeLogic(), 20)
                return true
            }
        }

        return false
    }

    //similar to how handleActionAOE uses sceneAnims, this function lets you specify any arbitrary resolve with any arbitrary animation
    handleAnim(sceneAnim, strikeLogic, settings = {
        // you probably want to pass these unless it's specifically an animation that doesn't need them
        origin,
        targetTile, /* or */ target,

        //interpreted from above if not passed
        originXY,
        targetXY,

        //bonus data
        potentialTargets, // list of tiles with potential targets in em
        action,
        tileEffect,
        data
    }) {
        if(!settings.originXY) settings.originXY = settings.origin?.piece?.tile ? {x: settings.origin.piece.tile.x, y: settings.origin.piece.tile.y} : null
        if(!settings.targetXY) settings.targetXY = settings.targetTile ? {x: settings.targetTile.x, y: settings.targetTile.y} : (settings.target?.piece?.tile ? {x: settings.target.piece.tile.x, y: settings.target.piece.tile.y} : null)

        if(env.COMBAT_ANIMS[sceneAnim] && (settings.originXY || settings.targetXY)) {
            env.rpg.lastUpdate = new Date() + env.COMBAT_ANIMS[sceneAnim].duration
            return env.COMBAT_ANIMS[sceneAnim].exec({strikeLogic, ...settings})
        } else {
            throw 'insufficient stuff for animation idiot'
        }
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
        makeInfinite,

        //telegraph only section obviously
        telegraphFor, // action slug to be used on expiration
        telegraphAnim, // string name of something defined in combat_anims. needs to be the new promise format to work
        telegraphFrom, // (optional) original caster, if not origin 
        telegraphExec, // (optional) can be used in place of telegraphFor, arbitrary code executed on affected tiles when tg goes off
        additionalTelegraphExec, // (optional) additional function executed regardless of the telegraph type
        telegraphTargets, // (optional) "allies" or "foes" to target the resolve solely by team.
        noTelegraphFocus, // (optional) set true to not focus on any tile automatically while telegraphing

        //for tile effects that move, basically. can be 'anchored' to things in different ways
        anchorType, // can specify either "origin" (anchor to creator), "actor" (specify in anchorTo), or "tile" (anchor to changeable tile position)
        anchorCoordinates, // anchor tile coordinates - can be changed to create a moving effect (i.e. projectile)
        anchorActor, //obv

        originTile, // not strictly required but often used with specifically made actions and tile effects
        data, // general use tile-effect data accessible from within events
        direction, // used mostly in styling for the effect FX
        specialClass, //classes added to the tileEffect's html effect
        specialHTML, //additional HTML added to the effect (doesnt overwrite existing)

        //overrides hover info as desired
        specialName,
        specialHelp,
        specialRequiresOrigin, //overrides if an effect should be removed on origin removal
        specialRenderEffect, //can pass 'false' to not render at all, or 'anchor' to only render on anchor tile
        specialAlwaysHappenFirst, // in a run telegraphs call, will be sorted to the front
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
        effectObj.originTeam = origin?.team
        effectObj.tiles = [] // will check for valid tiles below
        effectObj.originTile = originTile 
        if(!originTile && effectObj.tiles.length == 1) effectObj.originTile = effectObj.tiles[0]
        effectObj.telegraphFrom = telegraphFrom // this is only necessary for effects anchored to actors that they did not create. (i.e. cavik planting a bomb on someone - he's telegraphFrom, while that someone is origin for anchoring purposes)
        effectObj.telegraphFor = telegraphExec || (telegraphFor ? env.ACTIONS[telegraphFor] : false)
        effectObj.telegraphAnim = telegraphAnim ? env.COMBAT_ANIMS[telegraphAnim] : false
        effectObj.telegraphTargets = telegraphTargets
        effectObj.noTelegraphFocus = noTelegraphFocus
        effectObj.additionalTelegraphExec = additionalTelegraphExec
        effectObj.direction = direction
        effectObj.data = data
        effectObj.specialClass = specialClass
        effectObj.specialHTML = specialHTML
        effectObj.justCreated = true
        effectObj.createdTurn = env.rpg.turnData.turn
        if(specialAlwaysHappenFirst) effectObj.alwaysHappenFirst = true
        if(makeInfinite) effectObj.infinite = true
        if(specialName) effectObj.name = specialName
        if(specialHelp) effectObj.help = specialHelp
        if(specialRequiresOrigin !== undefined) effectObj.requiresOrigin = specialRequiresOrigin
        if(specialRenderEffect) effectObj.renderEffect = specialRenderEffect
        if(effectObj.events) {
            effectObj.events = {... effectObj.events}
            effectObj.events.effect = effectObj
        }
        
        if(effectObj?.events?.onInitialize) effectObj.events.onInitialize()
        
        //if an anchorType exist, we track the positions of tiles relative to the focus point
        if(anchorType) {
            let anchorTo
            
            switch(anchorType) {
                case "tile": anchorTo = originTile; break
                case "origin": anchorTo = origin; break
                case "actor": anchorTo = anchorActor; break
            }
            
            //console.log("!!! ANCHORING TO", anchorTo)
            if(anchorType == "origin" || anchorType == "actor") {
                if(!anchorTo.hostingEffects) anchorTo.hostingEffects = []
                anchorTo.hostingEffects.push(effectObj)
                effectObj.anchorActor = anchorTo
                if(!effectObj.originTile) effectObj.originTile = anchorTo.piece.tile
            }

            effectObj.anchorType = anchorType
            effectObj.anchorTo = anchorCoordinates || anchorTo?.coordinates || effectObj?.originTile?.coordinates
            if(anchorType == "tile" && !effectObj.anchorTo) effectObj.anchorTo = tiles[0] ? tiles[0].coordinates : false;
            else effectObj.anchorTo = anchorTo?.piece?.tile?.coordinates
            
            if(effectObj.anchorTo) {
                effectObj.anchorTo = {x: effectObj.anchorTo.x, y: effectObj.anchorTo.y} // we make a new object so it isn't a pointer if tile coordinates are passed
                effectObj.tileRelativity = []
                if(!effectObj.originTile) effectObj.originTile = this.getTileFromCoordinates(effectObj.anchorTo.x, effectObj.anchorTo.y)
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
                    console.log("pushing relativity for", tile, "with anchorTo", effectObj.anchorTo, tile.x - effectObj.anchorTo.x, tile.y - effectObj.anchorTo.y)
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
                (!tickType && effect.tickType)
            ) return;

            //on loop, we cast on neutral actors
            if(looping) {
                effect.tiles.forEach(tile=>{
                    if (
                        tile?.piece?.actor?.team?.name == "neutral" &&
                        effect?.events?.onActorAffected &&
                        !env.rpg.turnData.loopCalled
                    ) effect.events.onActorAffected({actor: tile.piece.actor, reason: "turnend"})
                })

                env.rpg.turnData.loopCalled = true
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

            //avoiding ticking at the end of the turn that it was created on (i.e. selfcast miltza direction)
            if(tickType == "onTurnEnd" && effect.justCreated) {
                effect.justCreated = false
                return
            }

            if(effect?.events?.onBeforeEffectAdvance) effect.events.onBeforeEffectAdvance({incitingActor: actor})
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

            if(newAnchorX == effectObj.anchorTo.x && newAnchorY == effectObj.anchorTo.y) return console.warn("tried to move effect", effectObj, "to own position");

            let oldOrigin = effectObj.originTile
            effectObj.anchorTo.x = newAnchorX
            effectObj.anchorTo.y = newAnchorY
            effectObj.originTile = this.getTileFromCoordinates(newAnchorX, newAnchorY)
            console.log("new origin set", effectObj.originTile, "from old origin", oldOrigin, "with new anchor coordinates", effectObj.anchorTo)

            //assumes that all tiles are the same length - for anchored effects, can't imagine a scenario where they wouldn't be
            let length = effectObj.tiles[0].effectMap[effectObj.id].length

            //get new tile position map based on the new center
            const newTiles = effectObj.tileRelativity.map(relativity => {
                const newX = newAnchorX + relativity.x
                const newY = newAnchorY + relativity.y
                return this.getTileFromCoordinates(newX, newY)
            }).filter(tile => tile) // get rid of any null/falses from off-grid coords

            console.log("current tiles are", effectObj.tiles, "and new tiles are", newTiles)

            //only remove what isn't going to stay
            effectObj.tiles.forEach(tile => {
                if(!newTiles.includes(tile)) tile.removeFromEffect(effectObj, { removingBy: "shifting" })
            })

            //if it's fully left the grid, we treat it as gone
            if(!newTiles.length && !effectObj.tiles.length) {
                console.log("effect has fully left the grid, deleting", effectObj)
                this.deleteTileEffect(effectObj)
                return
            }
        
            //add da new stuff
            newTiles.forEach(tile => {
                if(!effectObj.tiles.includes(tile)) tile.addToEffect(effectObj, { length, addingBy: "shifting" })
            })

            //for updating graphical stuff
            //new originTile might not exist (i.e. stepped off stage)
            if(effectObj.originTile) effectObj.originTile.makeEffectOriginTile(effectObj, true)
            if(oldOrigin) oldOrigin.makeEffectOriginTile(effectObj, false)
            if(effectObj.events?.onShifted) effectObj.events.onShifted({oldOrigin, newOrigin: effectObj.originTile})
        } catch(e) {printError(e)}
    }

    addTelegraphToQueue(effect) {
        effect.resolve = () => {
            effect.affectedActors = effect.tiles.map(tile => tile?.piece?.actor).filter(actor => actor)
            switch(effect.telegraphTargets) {
                case "allies": effect.affectedActors = effect.affectedActors.filter(actor => actor.team.name == effect.originTeam.name); break
                case "foes": effect.affectedActors = effect.affectedActors.filter(actor => actor.team.name != effect.originTeam.name); break // should catch neutrals
            }
            
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

            if(effect.additionalTelegraphExec) effect.additionalTelegraphExec(effect)
            if(effect.events?.onTelegraphResolve) effect.events.onTelegraphResolve()
            effect.ranTelegraph = true
        }
        
        env.rpg.telegraphQueue.push(effect)
    }

    //trigger telegraph animation/action usage
    runTelegraphsInQueue({noAdvance = false, forActor} = {}) {
        if(env.rpg.halt == "telegraph") env.rpg.halt = false
        let renderedQueue = []

        env.rpg.telegraphQueue.sort((a, b) => {
            if(a.alwaysHappenFirst && !b.alwaysHappenFirst) return -1
            else if(!a.alwaysHappenFirst && b.alwaysHappenFirst) return 1
            else return 0
        })

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
                    if(!env.rpg.active) return;

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

                        if(focus && !telegraphEffect.noTelegraphFocus) {
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
                        if(!telegraphEffect.keepAfterTelegraph && env.rpg.active) env.rpg.grid.deleteTileEffect(telegraphEffect)
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
                        if(
                            activeAction.type.includes("movement") && 
                            (selectedTile.piece && selectedTile.piece != activeActor.piece) && 
                            activeAction.ignoresActors == false
                        ) return;

                        console.log("passing targeting check")

                        //console.log("detected aoe", activeAction.aoe, activeAction)
                        let aoeResults = this.handleActionAOE({originActor: activeActor, targetTile: selectedTile, action: activeAction})

                        if(aoeResults) {
                            activeActor.piece.endTargeting()
                            completeTargeting(activeActor, activeAction, actionItem, false) 
                            if(typeof aoeResults == "object" && !activeAction.type.includes("special")) {
                                aoeResults.then(() => {
                                    setTimeout(()=> advanceTurn(activeActor), env.ADVANCE_RATE * 0.1)
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
        if(
            !effectObj.invisible &&
            effectObj.renderEffect !== false &&
            (
                typeof effectObj.renderEffect == "undefined" ||
                (effectObj.renderEffect == "originTile" && effectObj.originTile == this)   
            )
        ) {
            if(!this.effectsEl) {
                this.effectsEl = document.createElement("div")
                this.effectsEl.classList.add("tile-effects")
                this.classList.add('has-visible-effects')
                this.appendChild(this.effectsEl)
            }

            this.effectsEl.insertAdjacentHTML(`beforeend`, `<div class="effectfx effectfx-${effectObj.slug} ${effectObj.class || ""} ${effectObj.specialClass || ""} ${effectObj.originTile == this ? `effectfx-origin` : ''}" style="--i: ${this.effects.length}" team="${effectObj.origin?.team?.name}" effectid="${effectObj.id}" ${effectObj.direction ? `direction="${effectObj.direction}"` : ''}>${effectObj.effectHTML || ""}${effectObj.specialHTML || ""}</div>`)
            effectHTML = this.effectsEl.querySelector(`.effectfx[effectid="${effectObj.id}"]`)
        }

        effectObj.tiles.push(this)
        if(effectObj.anchorType && addingBy != "shifting") {
            let relObj = {
                x: this.x - effectObj.anchorTo.x,
                y: this.y - effectObj.anchorTo.y,
                tile: this
            }

            if(!effectObj.tileRelativity.find(rel => rel.x == relObj.x && rel.y == relObj.y)) {
                effectObj.tileRelativity.push(relObj)
            }
        }

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
        if(effectObj.tileClass) this.classList.add(effectObj.tileClass)
        this.setAttribute("definition", "TILE++")
        
        //actors are affected by fields when tiles get them under most cases
        if(effectObj?.events?.onActorAffected && this.piece && addingBy != "shifting") effectObj.events.onActorAffected({tile: this, actor: this.piece.actor, reason: "created"});
        //might still do it for some special effects that hit on shift/creation
        else if(effectObj.hitOnShift && this.piece) effectObj.events.onActorAffected({tile: this, actor: this.piece.actor, reason: "shifting"});

        //this can also trigger onEnter, even if shifting
        if(effectObj?.events?.onEnter && this.piece) effectObj.events.onEnter({actor: this.piece.actor})

        if(effectObj.cameraListener && effectObj.originTile == this) {
            this.cameraListener = true
            this.setAttribute("listeningfor", "--playercontrol-tilt--playercontrol-rotation")
            this.setAttribute("directattribute", true)
            env.rpg.updatePropertyListeners({specificEl: this, forceDirectAttribute: true})
        }

        //keep track of if pathfinding may want to avoid
        this.updateIfHazardous()

        return true
    }

    //shortcut for swapping origin tile of effects
    makeEffectOriginTile(activeObj, state = true) {
        let thisInstance = this.effectMap[activeObj.id]
        let effectObj = thisInstance?.host

        if(!effectObj) return;
        if(thisInstance?.fx) {
            if(!state && effectObj.renderEffect == "originTile" && effectObj.originTile != this) {
                thisInstance.fx.remove()
                thisInstance.fx = false
                if(!this.effects.length) {
                    this.classList.remove("effectbearer")
                    this.removeAttribute("definition")
                    if(this.effectsEl) {
                        this.effectsEl.remove()
                        this.classList.removeStatus('has-visible-effects')
                        delete this.effectsEl
                    }
                }
            } else thisInstance.fx.classList.toggle(`effectfx-origin`, state)
        } else if(state && effectObj.renderEffect == "originTile" && effectObj.originTile == this) {
            if(!this.effectsEl) {
                this.effectsEl = document.createElement("div")
                this.effectsEl.classList.add("tile-effects")
                this.classList.add('has-visible-effects')
                this.appendChild(this.effectsEl)
            }

            this.effectsEl.insertAdjacentHTML(`beforeend`, `<div class="effectfx effectfx-${effectObj.slug} ${effectObj.class || ""} ${effectObj.specialClass || ""} ${effectObj.originTile == this ? `effectfx-origin` : ''}" style="--i: ${this.effects.length}" team="${effectObj.origin?.team?.name}" effectid="${effectObj.id}" ${effectObj.direction ? `direction="${effectObj.direction}"` : ''}>${effectObj.effectHTML || ""}${effectObj.specialHTML || ""}</div>`)
            let effectHTML = this.effectsEl.querySelector(`.effectfx[effectid="${effectObj.id}"]`)
            let details = {
                host: effectObj,
                fx: effectHTML,
                length: thisInstance.length
            }

            this.effects[this.effects.findIndex(effect => effect.host.id === effectObj.id)] = details
            this.effectMap[effectObj.id] = details
        }

        if(effectObj?.events?.onOriginChange) effectObj.events.onOriginChange({tile: this})
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

        this.classList.remove(effectObj.host.tileClass)
        if(!this.effects.length) {
            this.classList.remove("effectbearer")
            this.removeAttribute("definition")
            if(this.effectsEl) {
                this.effectsEl.remove()
                delete this.effectsEl
            }
        }

        if(this.cameraListener && !this.effects.some(effect => effect.host.cameraListener)) {
            this.cameraListener = false
            this.removeAttribute("listeningfor")
            this.removeAttribute("directattribute")
        }

        this.updateIfHazardous()
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
        if(piece == null) {
            if(this?._piece?.actor?.tileClass) this.classList.remove(... this._piece.actor.tileClass.split(" "))
            this.classList.remove("piecebearer")
            this.removeAttribute("team")
            this._lastPiece = this._piece
            this._piece = piece
        } else {
            if(piece?.actor?.tileClass) this.classList.add(... piece.actor.tileClass.split(" "))
            this.classList.add("piecebearer")
            this.setAttribute("team", piece.actor.team.name)
            this.grid[piece.actor.slug] = this
            this._piece = piece
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
        if(env.rpg.kbPredictionTiles) env.rpg.kbPredictionTiles.clearTiles()

        let targetingFor = this.scene.targetingFor

        // if we're in targeting and the user is hovering over a targetable tile, we should show the AOE effects if any
        if(this.classList.contains("targetable") && this.scene.state == "targeting" && this.scene?.targetingFor?.action?.aoe) {        
            this.scene.hoveredTile = this

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
            this.scene.hoveredTile = this

            this.scene.uncleanedTargets = [this]
            this.scene.uncleanedClasses = []

            if(this.piece) {
                this.piece.actor.highlight("piece")
            }
        }

        //this one is just for 'distant' extra aoes, as in 'target' origin
        let handleExtraAOE = (aoeInfo) => {
            if(
                aoeInfo.origin == "target" &&
                (!aoeInfo.showIf || aoeInfo.showIf(targetingFor.actor, this.piece?.actor, targetingFor.action))
            )  {
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

            //dash-towards types will just get the pathfind-to landing point
            } else if(aoeInfo.origin == "dash-towards") {
                let dashLanding = this.getClosestOpenTile({ignoresActors: true, ignoresObstacles: true, pathfindFrom: targetingFor.actor.piece.tile})
                
                if(dashLanding) {
                    if(dashLanding.piece && dashLanding.piece == targetingFor.actor.piece) dashLanding = targetingFor.actor.piece.tile // no movement necessary
                    else if(dashLanding.piece) dashLanding = dashLanding.getClosestOpenTile({ignoresActors: false, ignoresObstacles: false, pathfindFrom: targetingFor.actor.piece.tile}) // since the path ignores some stuff, we get the closest actual open tile
                    if(aoeInfo.canHit && dashLanding.piece) if(!aoeInfo.canHit(targetingFor.actor, dashLanding.piece.actor)) return;
                    dashLanding.classList.add(aoeInfo.addClass)
                    this.scene.uncleanedTargets.push(dashLanding)
                    this.scene.uncleanedClasses.push(aoeInfo.addClass)
                }

            //pull-towards are like dash-towards, but find the closest point to the targeting actor
            } else if(aoeInfo.origin == "pull-towards" && this.piece) {
                let pullLanding = targetingFor.actor.piece.tile.getClosestOpenTile({ignoresActors: true, ignoresObstacles: true, pathfindFrom: this})

                if(pullLanding) {
                    if(pullLanding.piece && pullLanding.piece == this.piece) pullLanding = this // no movement necessary
                    else pullLanding = pullLanding.getClosestOpenTile() // since the path ignores some stuff, we get the closest actual open tile
                    if(aoeInfo.canHit && pullLanding.piece) if(!aoeInfo.canHit(targetingFor.actor, pullLanding.piece.actor)) return;
                    pullLanding.classList.add(aoeInfo.addClass)
                    this.scene.uncleanedTargets.push(pullLanding)
                    this.scene.uncleanedClasses.push(aoeInfo.addClass)
                }
            }
        }

        if(this.scene.uncleanedTargets) {
            if(targetingFor?.action?.stats?.extraAOE) for (const aoeName in targetingFor.action.stats.extraAOE) {
                const aoeInfo = targetingFor.action.stats.extraAOE[aoeName]
                handleExtraAOE(aoeInfo)
            }

            if(targetingFor?.actor?.extraAOEFromStatuses?.length) targetingFor.actor.extraAOEFromStatuses.forEach(aoeInfo =>{
                handleExtraAOE(aoeInfo)
            })
        }

        // if we're in neutral state and this tile has an actor piece, we should highlight their box
        else if(this.piece && this.scene.state == "normal") { 
            if(this.piece && this.piece?.actor != env.rpg.currentActor) this.piece.actor.highlight("piece")
        } 
    
        // if we're in neutral state and there's movement, draw a path from the origin to the destination
        // to show you the path you'll take
        else if(this.scene.state == "normal" && this.scene.movingFor && this.classList.contains("movable")) {
            env.rpg.querySelectorAll('.allypathing').forEach(line=>line.close())
            this.scene.movingFor.piece.tile.drawPathLine(this, {drawEffectLineSettings: {duration: 500, angleDriftAmount: 0, effectClass: "pathing allypathing"}})
        }
    }
    
    //clean up any AOE targeting previews
    onMouseLeave(ev) {
        if(env.rpg.currentTeam.name != "ally") return;
        this.grid.cleanUncleanedTargets()
        this.scene.hoveredTile = false

        if(this.piece && this.scene.state == "normal" && this.piece?.actor != env.rpg.currentActor) this.piece.actor.highlight(false)
    }

    /* A* pathfinding algorithm zone */
    //will return null if no path is found by default
    static pathfindTo(startTile, endTile, {
        //you can pass a "towards" option to say - just get the closest path possible
        //towards returns will be an object with detailed results rather than an array
        //used mostly in enemy pathfinding failures (i.e. no valid path to target)
        towards = false,

        //for pathfound actions
        ignoresActors = false,
        ignoresObstacles = false,
        pathfindingForTargeting = false,
        
        //for enemy pathfinding - avoid landing on hazardous tiles
        avoidHazardTiles = false
    } = {}) {
        const start = performance.now()

        let pathInfo = _pathfindLogic(startTile, endTile, {ignoresActors, ignoresObstacles, pathfindingForTargeting, avoidHazardTiles})

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
                    if(!env.silenceFailedPathfinding) {
                        printError(`pathfinding failed during an animation sequence within ${env.rpg.currentActor.name}'s turn!`, true)
                        console.log("pathfind fail data:", startTile, endTile)
                        console.trace()
                    }
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
        if(endTile.blockLOS) { return false }
        
        let x0 = startTile.x, y0 = startTile.y;
        let x1 = endTile.x, y1 = endTile.y;
        let dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
        let sx = (x0 < x1) ? 1 : -1, sy = (y0 < y1) ? 1 : -1;
        let err = dx - dy
    
        while(true) {  
            if(startTile.grid.getTileFromCoordinates(x0, y0).blockLOS) { return false }
                
            if(x0 === x1 && y0 === y1) break
            let e2 = 2 * err
            if(e2 > -dy) { err -= dy; x0 += sx }
            if(e2 < dx) { err += dx; y0 += sy }
        }
    
        return true
    }

    //drawEffectLine chain between two tiles
    static drawPathLine(startTile, endTile, { towards = false, towardsLength = false, drawEffectLineSettings = {duration: 5000, angleDriftAmount: 0, effectClass: "pathing"} } = {}) { 
        let path

        if(towards) {
            path = startTile.pathfindTo(endTile, {towards: true})?.path
            if(path) {
                if(towardsLength) path = path.slice(0, towardsLength + 1)
            }
        } else {
            path = startTile.pathfindTo(endTile)
        }

        //calls drawEffectLine between each tile in the path
        if(path) {
            for(let i = 0; i < path.length - 1; i++) {
                drawEffectLine(path[i], path[i + 1], drawEffectLineSettings)
            }
        }
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
    updateIfHazardous() {
        this.hazardous = this.effects.some(effectObj => effectObj.host.hazardous)
    }

    //returns one of the closest open tiles, or false if none are found within 4 steps
    //pathfind is like getting the closest open by pathfinding with regular settings (i.e. respecting actors and obstacles)
    getClosestOpenTile({avoidDamageTiles = true, direction = null, pathfindFrom = false, ignoresObstacles, ignoresActors, searchRadius = 4} = {}) {
        if(!this.piece && !this.offLimitsExceptFor) return this // cuz it's open :b

        let validTiles = []
        let fallbackTiles = []

        if(!pathfindFrom) {
            let radius = 1
            let visitedTiles = new Set()

            while (validTiles.length === 0 && radius < searchRadius) {
                for (let x = this.x - radius; x <= this.x + radius; x++) {
                    for (let y = this.y - radius; y <= this.y + radius; y++) {
                        const tile = this.grid.getTileFromCoordinates(x, y)
                        if (tile && !tile.piece && !tile.blocking && !visitedTiles.has(tile) && !tile.offLimitsExceptFor) {
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
        } else {
            let pathfindResults = pathfindFrom.pathfindTo(this, {towards: true, ignoresObstacles, ignoresActors})
            if(pathfindResults?.path?.length) validTiles.push(pathfindResults.path.pop())
            else if(pathfindResults?.length) validTiles.push(pathfindResults.pop())
        }

        if(validTiles.length === 0) validTiles = fallbackTiles
        if(validTiles.length === 0) return false

        if(avoidDamageTiles) {
            let baseTiles = validTiles
            validTiles = validTiles.filter(tile => !tile.classList.contains("damagetile") && !tile.hazardous)
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

    //checks if there's a clear line between this tile and a target tile
    //returns the blocking tile if any LOS-blocking tile or piece-holding tile is in the path
    //returns the target tile if the line is clear
    traceTo(targetTile, {ignoresActors = false, teamFocus = false, ignoreSpecificTeam = false} = {}) {
        if(!targetTile) return false
        if(this === targetTile) return targetTile
        if(targetTile.blockLOS) return targetTile

        let x0 = this.x, y0 = this.y
        let x1 = targetTile.x, y1 = targetTile.y
        let dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0)
        let sx = (x0 < x1) ? 1 : -1, sy = (y0 < y1) ? 1 : -1
        let err = dx - dy

        while(true) {
            if(x0 === x1 && y0 === y1) break

            let e2 = 2 * err
            if(e2 > -dy) { err -= dy; x0 += sx }
            if(e2 < dx) { err += dx; y0 += sy }

            //skip the endpoint itself
            if(x0 === x1 && y0 === y1) break

            const tile = this.grid.getTileFromCoordinates(x0, y0)
            if(!tile) return false
            if(tile.blockLOS) return tile
            if(!ignoresActors && (tile._piece || tile._hasPseudopiece)) {
                let piece = tile._piece || tile.piece
                if(piece && !piece?.actor?.noTrace) {
                    if(teamFocus) {
                        if(piece?.actor?.team?.name == teamFocus) return tile
                    } else if(ignoreSpecificTeam) {
                        if(piece?.actor?.team?.name != ignoreSpecificTeam) return tile
                    } else return tile
                }
            }
        }

        return targetTile
    }

    //traces in a cardinal direction until hitting the grid edge, an obstacle, or an actor
    //returns an array of tiles in the path
    //the last tile is the one that stopped the trace (obstacle/actor) or the last valid tile
    traceDirection(direction, {ignoresActors = false, teamFocus = false, ignoreSpecificTeam = false} = {}) {
        let dx = 0, dy = 0
        switch (direction) {
            case 'up': dy = -1; break
            case 'down': dy = 1; break
            case 'left': dx = -1; break
            case 'right': dx = 1; break
            case 'up-left': dx = -1; dy = -1; break
            case 'up-right': dx = 1; dy = -1; break
            case 'down-left': dx = -1; dy = 1; break
            case 'down-right': dx = 1; dy = 1; break
            default: return []
        }

        const traced = []
        let x = this.x + dx, y = this.y + dy

        while(true) {
            const tile = this.grid.getTileFromCoordinates(x, y)
            if(!tile) break

            if(tile.blockLOS) { traced.push(tile); break }
            if(!ignoresActors && (tile._piece || tile._hasPseudopiece)) {
                let piece = tile._piece || tile.piece
                if(piece && !piece?.actor?.noTrace) {
                    if(teamFocus) {
                        if(piece?.actor?.team?.name == teamFocus) { traced.push(tile); break }
                    } else if(ignoreSpecificTeam) {
                        if(piece?.actor?.team?.name != ignoreSpecificTeam) { traced.push(tile); break }   
                    } else { traced.push(tile); break }
                }
            }

            traced.push(tile)
            x += dx
            y += dy
        }

        return traced
    }

    /* instances shortcut */
    hasSightLineTo(endTile) { return CombatTile.hasSightLineTo(this, endTile) } 
    getNeighbors(options) { return CombatTile.getNeighbors(this, options) } 
    pathfindTo(endTile, options) { return CombatTile.pathfindTo(this, endTile, options) } 
    drawPathLine(endTile, options) { return CombatTile.drawPathLine(this, endTile, options || {drawEffectLineSettings: {duration: 5000, angleDriftAmount: 0, effectClass: "pathing"}}) }

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

    static TRANSFORMS = {
        default: "translateY(-50%) rotateX(-90deg) rotateY(var(--playercontrol-rotation)) rotateX(calc(var(--playercontrol-tilt) * -0.5))",
        destructible: "unset",
        statPlate: `translateZ(var(--statHeight)) rotateX(calc(-90deg)) rotateY(var(--playercontrol-rotation)) rotateX(calc(var(--playercontrol-tilt) * -1)) translateY(calc(var(--gridTileSize) * -1)) translateZ(1000px)`,
        floatBox: `translateZ(75px) rotateX(calc(-90deg)) rotateY(var(--playercontrol-rotation)) rotateX(calc(var(--playercontrol-tilt) * -1)) translateY(calc(var(--gridTileSize) * -1)) translateZ(800px)`,
        statusPainter: `rotateX(calc(-90deg)) rotateY(var(--playercontrol-rotation)) rotateX(calc(var(--playercontrol-tilt) * -1)) translateY(calc(var(--gridTileSize) * -1)) translateZ(200px)`
    }

    connectedCallback() {
        this.grid = this.tile.grid
        this.x = this.tile.x;
        this.y = this.tile.y;

        //we assume that the actor is set in advance
        if(this.actor.graphic) {
            this.innerHTML = `
            <div class="actor-stand ${this.actor.base.standClass || ""}" for="${this.actor.base.slug}" team="${this.actor.team.name}" listeningfor="--playercontrol-rotation--playercontrol-tilt" ${CombatActor.TRANSFORMS[this.actor.base.standClass] ? `intendedtransform="${CombatActor.TRANSFORMS[this.actor.base.standClass]}"` : `intendedtransform="${CombatActor.TRANSFORMS.default}"`}>
                ${this.actor.graphic.replaceAll('%SLUG', this.actor.slug)}
                <div class="combat-dialogue"></div>
            </div>
            <div class="floatbox" listeningfor="--playercontrol-rotation--playercontrol-tilt" intendedtransform="${CombatActor.TRANSFORMS.floatBox}"></div>
            `

            if(this.actor.base.pieceClass) this.classList.add(this.actor.base.pieceClass)

            //there's probably a smarter way of doing this lol whatever
            this.stand = this.firstElementChild
            this.actor.sprite = this.firstElementChild.children[0]
            this.actor.sprite.hitBox = this.lastElementChild
            this.actor.sprite.dialogueBox = this.firstElementChild.children[1]


            if(this.actor.painter != "nopainter") {
                //set up the "status-painter"
                this.actor.sprite.statusPainter = document.createElement("div")
                this.actor.sprite.statusPainter.classList.add("statuspainter")

                if(this.actor.painter == "stand") {
                    this.appendChild(this.actor.sprite.statusPainter)
                    this.actor.sprite.statusPainter.classList.add("standpainter")
                    this.actor.sprite.statusPainter.setAttribute("listeningfor", "--playercontrol-rotation--playercontrol-tilt")
                    this.actor.sprite.statusPainter.setAttribute("intendedtransform", CombatActor.TRANSFORMS.statusPainter)
                } else {
                    this.actor.sprite.statusPainter.classList.add('sprite-wrapper') // for the styling. probably no knock-on effects
                    this.stand.appendChild(this.actor.sprite.statusPainter)
                }
            }

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
        let ignoresActors = typeof action.ignoresActors == "undefined" ? true : action.ignoresActors

        this.scene.currentTargetableTiles = this.grid.markTiles({
            originTile: this.tile,
            shape: action.targeting || 'square', // to be altered per action
            size: action?.stats?.range || action.range || 1,
            addClass: "targetable",
            includesOrigin: typeof action.includesOrigin != "undefined" ? action.includesOrigin : action.type.includes("self"),
            requiresPath: action.requiresPath,
            ignoresObstacles: action.ignoresBlocks,
            ignoresActors: ignoresActors,
            ignoresLOS: action.ignoresLOS,
            markingForActionTarget: true,
            onTileCheck: ({tile, validity, validTiles, data}) => {
                if(tile.piece && action.type.includes("opponent") && tile?.piece?.actor?.team?.name == this.actor.team.name) return false
                if(tile.untargetable) return false

                if(tile.piece && !action.type.includes("movement")) { 
                    if(this.scene.targetingFor.action?.aoe?.canHit) 
                        if(!this.scene.targetingFor.action.aoe.canHit(this.scene.targetingFor.actor, tile.piece.actor)) 
                            return false 
                } else if((action.type.includes("movement") && tile.piece) && !ignoresActors) return false // movement actions move to the selected tile. if it ignoresActors then it can move to a tile with someone on it, but if it doesn't, then it probably has a backup case
                return true
            }
        })

        env.rpg.toggleStatPlates(false) // to refresh em just in case
        env.rpg.toggleStatPlates(true)
        env.rpg.refresh()
    }

    endTargeting() {
        delete env.rpg.nevermind
        this.scene.state = false
        
        if(this.scene.currentTargetableTiles) this.scene.currentTargetableTiles.forEach(tile => tile.classList.remove('targetable'))
        if(env.rpg.kbPredictionTiles) env.rpg.kbPredictionTiles.clearTiles()
        env.rpg.toggleStatPlates(false)
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
        this.toggleStatPlate(true)
        setTimeout(() => this.toggleStatPlate(false), env.ADVANCE_RATE) // just a little reminder flash
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
    stepToTile(tile, {speed = env.ADVANCE_RATE * 0.2, stepCallback, endCallback, follow = true} = {}) {
        this.scene.state = "animating"
        tile.offLimitsExceptFor = this // weird pseudoblock state only used for movement

        let path = this.tile.pathfindTo(tile)
        if (path) {
            let i = 0
            const animateStep = () => {
                try{ 
                    if (i < path.length && !env.rpg.forceStopMovement) {
                        const nextTile = path[i]
                        this.moveToTile(nextTile, {follow: false, reason: "stepping"})
                        this.animateTimeout = setTimeout(animateStep, speed + ++i)
                        if (stepCallback) stepCallback(nextTile, {timeout, endCallback}); // in case of some sort of cancellation
                    } else if(env.rpg.forceStopMovement) {
                        delete env.rpg.forceStopMovement
                        tile.offLimitsExceptFor = false
                    
                    } else {
                        this.scene.state = false
                        if(endCallback) endCallback()
                        tile.offLimitsExceptFor = false
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
        if(follow) tile.focusOnThisTile()

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
    animateToTile(tile, {duration, animation, endCallback, follow = false, specialReason} = {}) {
        this.scene.state = "animating"

        let oldTile = this.tile

        this.style.setProperty("--anim-x-from", oldTile.x)
        this.style.setProperty("--anim-y-from", oldTile.y)
        this.style.setProperty("--anim-x-to", tile.x)
        this.style.setProperty("--anim-y-to", tile.y)
        env.rpg.updatePropertyListeners({specificEl: this.stand, forceDirectAttribute: true})

        this.classList.add(`actoranim-${animation}`)

        if(follow) tile.focusOnThisTile()
        
        // mark tile as not possible to go to during animation
        tile.offLimitsExceptFor = this // weird pseudoblock state only used for movement
        env.rpg.lastUpdate = Date.now()
        
        setTimeout(() => {
            if(env.rpg.haltedByBufferTime) delayAdvance(duration)
                
            //if(env.rpg.currentActor.team.name == "ally") this.scene.state = false
            this.moveToTile(tile, {follow, reason: specialReason || "animating"})
            this.classList.remove(`actoranim-${animation}`)
            tile.offLimitsExceptFor = false
            if(endCallback) endCallback()
            if(this.classList.contains("deadpiece")) {
                this.classList.remove("deadpiece")
                setTimeout(()=> this.classList.add("deadpiece"), 50) // retrigger in case it got cancelled by the anim
            }
        }, duration + 50) //buffer time

        env.rpg.refresh()
    }

    //direct move - teleports actor to position
    moveToTile(tile, {follow = true, reason} = {}) {
        if(this.tile == tile || !this.tile || (tile.offLimitsExceptFor && tile.offLimitsExceptFor != this)) { return }
        this.toggleStatPlate(false)

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
            //or if the effect is marked as alwaysTriggerOnEnter
            if(
                effect.host?.events?.onEnter && 
                (!oldTile.effectMap[effect.host.id] || effect.host.alwaysTriggerOnEnter)
            ) effect.host.events.onEnter({actor: this.actor});

            if(reason) {
                if(reason == "knockbackEnd" && 
                    oldTile != tile && 
                    effect.host?.events?.onActorAffected &&
                    (
                        //we only hit enemies with knockback effects once
                        !env.rpg.turnData[`${this.actor.slug}-${effect.host.id}`]
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
        tile.offLimitsExceptFor = this

        if(settings.instant) {
            this.moveToTile(tile, settings)
            this.classList.remove("teleporting")
        } else {
            env.setTimeout(() => {
                this.moveToTile(tile, settings)
                tile.offLimitsExceptFor = false
            }, 10)
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

    //shortcut for knocking a piece off to some other random tile
    displace({possibleTiles, endCallback} = {}) {
        //get pieces that have no distortion
        let tiles = possibleTiles

        console.log("got ppossible tiles", possibleTiles)
        if(!tiles) tiles = env.rpg.grid.tilesByType.basic.filter(t=>{
            return !t.piece && (t.effects.length == 0 || !t.effects.some(e=>e.host.slug == "scene_edge"))
        })

        console.log("ending up with these tiles to displace to", tiles)

        let launchTile = tiles.sample()

        //fall back to any tile
        if(!launchTile) launchTile = env.rpg.grid.tilesByType.basic.filter(t=>!t.piece && !t.classList.contains("noland")).sample()

        if(launchTile) {
            let actor = this.actor
            let isCurrentActor = actor == env.rpg.currentActor
            if(actor.piece) {
                actor.displacing = true
                actor.piece.animateToTile(launchTile, {animation: "displace", duration: 1000, follow: isCurrentActor, endCallback: ()=>{
                    actor.displacing = false
                    if(env.rpg.movingFor == actor && env.rpg.turnData.showingActions) actor.piece.startMovement()
                    if(endCallback) endCallback()
                }})
            }
        }
    }

    //dist shortcut - can take an RPG actor object, combat-actor, or combat-tile
    getDistance(target, {detailed = false, avoidHazardTiles = false} = {}) {
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

            const path = this.tile.pathfindTo(target?.piece.tile || target.tile || target, { towards: true, avoidHazardTiles })
            if(typeof path.pathDistance == "undefined") return { rawDistance: distance, pathDistance: path.length - 1, path, canEnter: true}
            return { rawDistance: distance, pathDistance: path.pathDistance, path: path.path, endDistance: path.distance, canEnter: false }
        }

        return distance
    }

    //dist shortcut - takes an array of actors (or none), gets the distance from each
    getActorDistance({actors, includeSelf, avoidHazardTiles = false} = {}) {
        const distances = []
        let list = actors || env.rpg.turnOrder

        list.forEach(actor => {
            if ((actor !== this.actor || includeSelf) && actor.piece) {
                const distance = this.getDistance(actor, {detailed: true, avoidHazardTiles})
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
    knockback({direction, strength = 1, onImpact = false, ignoreMods = false, follow = true, falloff = true} = {}) {
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
            })
        }
        
        while (remainingStrength > 0) {
            let nextTile = this.grid.getTileFromCoordinates(this.x + dx, this.y + dy);
            env.rpg.lastUpdate = Date.now()

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
            
            //final check
            nextTilePiece = nextTile?.piece == this ? null : nextTile?.piece
            
            let lastTile = this.tile
            if(lastTile.knockHighlightTimeout) {
                lastTile.classList.remove("knockedover", lastTile.knockDirectionClass)
                clearTimeout(lastTile.knockHighlightTimeout)
            }
            
            lastTile.knockDirectionClass = `kbo-${effectiveDirection.replace(" ", "-")}`
            setTimeout(() => lastTile.classList.add("knockedover", lastTile.knockDirectionClass), 10)
            lastTile.knockHighlightTimeout = setTimeout(() => {
                lastTile.classList.remove("knockedover", lastTile.knockDirectionClass)
                lastTile.knockHighlightTimeout = null
            }, 1610) // what was i cooking with this number

            if(nextTile && !nextTilePiece && !nextTile.blocking) {
                remainingStrength--
                this.moveToTile(nextTile, {follow: false, reason: remainingStrength == 0 ? "knockbackEnd" : "knockback"})

            //if they hit SOMEONE rather than a generic obstacle, transfer some knockback to them before trying again
            } else if(nextTile && nextTilePiece) {
                if(onImpact) {onImpact({remainingStrength}); console.log("IMPACT!!")}
                nextTilePiece.knockback({direction: effectiveDirection, strength: falloff ? remainingStrength - 1 : remainingStrength, falloff})
                if(!falloff && !nextTile.piece) this.moveToTile(nextTile, {follow: false, reason: remainingStrength == 0 ? "knockbackEnd" : "knockback"})
                
                remainingStrength--

            // they hit something hard and can't keep going
            } else {
                if(onImpact) {onImpact({earlyEnd: true, remainingStrength}); console.log("IMPACT!!")}
                break
            }
        }
        
        //knockbackEnd calling for early termination
        if(remainingStrength > 0 && this.tile != originalTile) {
            this.tile.effects.forEach(effect => {
                if(effect.host?.events?.onActorAffected && 
                    (!env.rpg.turnData[`${this.actor.slug}-${effect.host.id}`] || effect.host.knockbackRetrigger)
                ) {
                    effect.host.events.onActorAffected({tile: this.tile, actor: this.actor, reason: "knockbackEnd"})
                    env.rpg.turnData[`${this.actor.slug}-${effect.host.id}`] = true
                }
            })
        }
        
        if((this.actor == env.rpg.currentActor) && env.rpg.state == "animating") {
            if(follow) this.focusOnTile()
            
            //some fallback protection
            if(env.rpg.movingFor != this.actor && env.rpg.turnData.showingActions) {
                this.startMovement()
                this.scene.state = false
            }
        }

        return true
    }

    //predicts the knockback path without actually moving the piece
    //returns an array of tiles that would be traversed during knockback, in order
    //if we draw, then it'll add a kb-path class to the affected tiles, and give them a --direction style variable to rotate a floaty line to demonstrate path
    predictKnockback({direction, strength = 1, ignoreMods = false, alsoDraw = false} = {}) {
        if(this.actor?.immunities?.knockback) return [];

        let effectiveDirection = direction
        if(effectiveDirection == "random" || effectiveDirection == "none" || !direction) {
            if(effectiveDirection == "none") console.warn("predictKB got direction 'none', choosing a random direction instead", this)
            effectiveDirection = ['up', 'down', 'left', 'right', 'up-left', 'up-right', 'down-left', 'down-right'].sample()
        }

        let dx = effectiveDirection.includes('left') ? -1 : effectiveDirection.includes('right') ? 1 : 0
        let dy = effectiveDirection.includes('up') ? -1 : effectiveDirection.includes('down') ? 1 : 0
        let remainingStrength = strength
        let x = this.x
        let y = this.y
        let path = []

        //if it's negative KB, we invert the direction BEFORE any mods
        if(remainingStrength < 0) {
            dx = dx * -1
            dy = dy * -1
            remainingStrength = remainingStrength * -1
        }

        //some statuses may reduce or increase the strength of knockback (.knockmod)
        if(!ignoreMods && this.actor?.statusEffects?.length) {
            this.actor.statusEffects.forEach(status => {
                if(status.knockmod) remainingStrength += status.knockmod
            })
        }
        
        while(remainingStrength > 0) {
            let nextTile = this.grid.getTileFromCoordinates(x + dx, y + dy)

            // in the case of pseudopieces attached to this
            let nextTilePiece //nextTile can be null
            if(nextTile) nextTilePiece = nextTile.piece == this ? null : nextTile.piece 

            //if the next tile is blocked, try to move in the x or y direction separately
            if (!nextTile || nextTilePiece || nextTile.blocking) {
                if (dx !== 0 && dy !== 0) {
                    //try moving in the x direction only
                    let xTile = this.grid.getTileFromCoordinates(x + dx, y)
                    if (xTile && !xTile.piece && !xTile.blocking) {
                        nextTile = xTile
                    } else {
                        //try moving in the y direction only
                        let yTile = this.grid.getTileFromCoordinates(x, y + dy)
                        if (yTile && !yTile.piece && !yTile.blocking) {
                            nextTile = yTile
                        }
                    }
                }
            }
            
            //final check
            nextTilePiece = nextTile?.piece == this ? null : nextTile?.piece

            if (nextTile && !nextTilePiece && !nextTile.blocking) {
                path.push(nextTile)
                x = nextTile.x
                y = nextTile.y
                remainingStrength--

            //if they would hit someone, stop prediction and return current path
            } else if(nextTile && nextTilePiece) {
                break

            // they would hit something hard and can't keep going
            } else {
                break
            }
        }

        // calc the direction for each step in the path and apply visualization
        if(alsoDraw) {
            if(!env.rpg.kbPredictionTiles) {
                env.rpg.kbPredictionTiles = new Set()
                env.rpg.kbPredictionTiles.clearTiles = function() {
                    //console.log("removing tiles")
                    this.forEach(tile => {
                        tile.kbVisualizers?.forEach(vis => vis.remove())
                        tile.kbVisualizers.clear()
                    })
                    this.clear()
                }
            }

            let prevX = this.x
            let prevY = this.y
            
            path.forEach((tile, index) => {
                let stepDx = tile.x - prevX
                let stepDy = tile.y - prevY
                let angle = Math.atan2(stepDy, stepDx) * 180 / Math.PI
                
                //console.log("adding", tile, "with angle", angle, "from step dx", stepDx, "and step dy", stepDy)
                let kbVis = document.createElement('div')
                kbVis.classList.add('kb-vis')
                if(index === path.length - 1) kbVis.classList.add('kb-vis-final')
                kbVis.style.setProperty('--direction', angle + 'deg')
                tile.appendChild(kbVis)

                if(!tile.kbVisualizers) tile.kbVisualizers = new Set()
                tile.kbVisualizers.add(kbVis)
                env.rpg.kbPredictionTiles.add(tile)
                
                prevX = tile.x
                prevY = tile.y
            })
        }
        
        return path
    }

    //for use in combatHit, addStatus, any time you'd want to only briefly show the statplate
    flashStatPlate(duration = env.ADVANCE_RATE * 2) {
        let plate
        setTimeout(() => {
            plate = this.toggleStatPlate(true)
            setTimeout(()=>{
                if(this?.statPlate == plate) this.toggleStatPlate(false)
            }, duration)
        }, env.ADVANCE_RATE * 0.25)
    }

    // this also will swap to an outlined sprite temporarily
    toggleStatPlate(state) {
        this.showingStatPlate = state
        if(state) {
            if(this.statPlate) this.toggleStatPlate(false)
            this.insertAdjacentElement('beforeend', this.getStatPlate())
        
            if(this.actor.team.name != "ally" && !this.actor.noOutline && !this.actor.outlined) {
                this.actor.outlined = true
                this.actor.sprite.querySelectorAll('img').forEach(img => {
                    img.src = img.src.replace('.gif', '_outline.gif')
                })
            }

        } else if(this.statPlate) {
            this.statPlate.remove()
            this.statPlate = null

            if(this.actor.team.name != "ally" && !this.actor.noOutline && this.actor.outlined) {
                this.actor.sprite.querySelectorAll('img').forEach(img => {
                    img.src = img.src.replace('_outline', '')
                })
                this.actor.outlined = false
            }
        }
        
        return this.statPlate
    }

    getStatPlate() {
        let actor = this.actor
        let statPlate = document.createElement('div')
        statPlate.classList.add('piece-stat')
        statPlate.setAttribute("listeningfor", `--playercontrol-rotation--playercontrol-tilt`)
        statPlate.setAttribute("intendedtransform", CombatActor.TRANSFORMS.statPlate)
        statPlate.classList.add(`${actor.team.name}-colors`)
        env.rpg.updatePropertyListeners({specificEl: statPlate})

        let hpDisplay = `${actor.hp}HP${actor.bp ? `::${actor.bp}BP` : ``}`
        /*
        let statusHTML = ""
        if(actor.box) statusHTML = actor.box.querySelector('.statuses').innerHTML

            <div class="ps-statuses">${statusHTML}</div>
        */
        statPlate.innerHTML = `
            ${actor.base.noHPDisplay ? '' : `<div class="ps-hp">${hpDisplay}</div>`}
            <div class="ps-hitpredict"><div class="hitpredict"></div></div>
        `

        if(env.rpg.state == "targeting") insertHitPredictHTML(this.scene.targetingFor.actor, this.scene.targetingFor.action, this.actor, statPlate.querySelector('.ps-hitpredict'))
        this.statPlate = statPlate

        return statPlate
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
            this._lastTile = this._tile
            this._tile = tile
            this._tile.piece = this
            this.x = tile.x
            this.y = tile.y
        } else { // clearing bc dead or something
            this._lastTile = this._tile
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
        this.toggleStatPlate(false)
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

//ing update - you should never use ignoresActors/ignoresObstacles in legitimate animations
//it's mostly for pathfound actions
function _pathfindLogic(startTile, endTile, {ignoresActors, ignoresObstacles, pathfindingForTargeting, avoidHazardTiles = false} = {}) {
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
            if (
                _visited.has(neighbor) || 
                (!ignoresActors && neighbor?._piece) || 
                (!ignoresActors && neighbor?._hasPseudopiece) || 
                (!ignoresObstacles && (neighbor?.blocking === true || (neighbor?.blocking === "soft" && !pathfindingForTargeting))) ||
                (avoidHazardTiles && neighbor?.hazardous)
            ) continue;

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