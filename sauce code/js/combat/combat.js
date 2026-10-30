///COMBAT LOOP & AI
if(typeof env.ADVANCE_RATE == "undefined") env.ADVANCE_RATE = 1500;

//initialize the combat scene
//settings takes...
/*
    bgm - howler file
    bgmRate - if absent, won't change rate
    bgmStart - start time of track, if absent will be at beginning
    combatClass - applies to combat element
    startCallback() - called at start of combat
    endCallback(loser) - called at end of combat, notably prior to env.rpg being 'deleted'
    actorPreprocess(actor) - called just prior to the processing of each new actor as they're spawned (FOR E3A2)
    actorSpriteProcess(actor) - called after creating the sprite for an actor
    turnCallback(actor, prevActor) - called at the start of each turn
    inciterID - origin entity ID that started combat, used mostly for stage controls
    dry - creates combat object in env without actually starting combat, for use with certain combat interceptors
    teamAlterations - takes a sorta status/component/augment-like alterations list to apply based on team (FOR E3A2)
        i.e. { 
            all: [alterations],
            (teamname, i.e. "ally" or "enemy"): [alterations],
            (actor base slug, i.e. "cavik"): [alterations]
            ...
        } (all are optional - no stats object because we want alterations to enemy stats to be visible via status usually)
*/
function startCombat(initEnemyTeam, initAllyTeam, settings = {}) {
    //if the player is somehow in a freemouse stage state, we pause that
    if(env?.stage?.freemove) {
        setTimeout(() => {
            if(!env.forcingSwap) pauseFreemove(true)
        }, 50)
    }

    console.log("starting combat with settings", settings)
    if(body.getAttribute("menu") == "party") togglePartyMenu()
    if(!settings.dry) {
        body.classList.add('in-combat', 'nomenus')
        MUI("off")

        //initialize the entire combat window and RPG object

        /* 
            todo: proper shiftdetail toggle
                <button id="detail-toggle" definition="NOTICE::'toggles shift-detail for this combat';'continuously shows detailed information until toggled again or combat ends'" onclick="play('elevator', 2);shiftDetailToggle(!env.shiftDetail, true)">
                    <i class="cicon ci-zoomin"></i>
                    <i class="cicon ci-zoomout"></i>
                </button>

            kinda works as is but needs work. gonna fix
        */
    
        var sceneTemplate = settings.sceneTemplate ? settings.sceneTemplate : `
            <div id="combat" class="intro team-intro unshifted">
                <div id="enemy-graphic"></div>
                <div class="render-filter"></div>
                <div id="enemy-team" class="team"></div>
                <div id="ally-team" class="team"></div>
                ${settings.bg ? settings.bg : ``}
            </div>
        `;
        content.insertAdjacentHTML('beforeend', sceneTemplate)
        env.rpg = document.querySelector('#combat')
    } else {
        env.rpg = {dry: true}
    }

    //we add everything else as properties
    env.rpg.active = !settings.dry
    env.rpg.settings = settings
    env.rpg.turnData = { turn: 0 }
    env.rpg.turnOrder = []
    env.rpg.teams = []
    env.rpg.actors = {}
    env.rpg.actorList = []
    env.rpg.entCount = 0
    env.rpg.globalListeners = {}
    env.rpg.highlightedActors = new Set()
    env.rpg.initializing = true
    createRPGeffectMessage()

    env.rpg.enemyTeam = {name: "enemy", members: [], initial: initEnemyTeam};
    env.rpg.allyTeam = {name: "ally", members: [], initial: initAllyTeam};

    env.rpg.teams.push(env.rpg.allyTeam)
    env.rpg.teams.push(env.rpg.enemyTeam)

    let partyLimit = page.party.partyLimit || 3
    initAllyTeam.forEach((member, i) => {
        if(i >= partyLimit ) return

        let newActor = initializeActor(member,
            {
                team: env.rpg.allyTeam,
                enemyTeam: env.rpg.enemyTeam,
                matchPartyHP: page.party.noPreserveHealth ? false : true,
                usePartySlug: (member.components || member.critta) ? true : false //for generated chars, set their combat actor slug to their party slug
            }
        )

        if(settings.actorPreprocess) settings.actorPreprocess(newActor)
        if(newActor.base?.events?.onInitialize) newActor.base.events.onInitialize(newActor)

        //determine any overrides or extra actions
        newActor.member = member
        newActor.actions = getAlteredActorActions({member, actor: newActor})
    })

    initEnemyTeam.forEach(member => {
        let newActor = initializeActor(member,
            {
                team: env.rpg.enemyTeam,
                enemyTeam: env.rpg.allyTeam,
                uniqify: true
            }
        )

        if(settings.actorPreprocess) settings.actorPreprocess(newActor)
        if(newActor.base?.events?.onInitialize) newActor.base.events.onInitialize(newActor)
        newActor.actions = getAlteredActorActions({member: newActor, actor: newActor})
    })
    
    env.rpg.baseAdvanceRate = env.ADVANCE_RATE

    if(!settings.dry) {
        //creates the turn order and actor panels
        env.rpg.teams.forEach((team, i) => {
            env.rpg.turnOrder = env.rpg.turnOrder.concat(team.members);
            team.members.forEach((actor, i) => {
                initializeActorUI({actor, team})
                if(actor.statusEffects.length) triggerStatusEvents({target: actor, eventName: "onCombatStart"})
            })
        })

        //stage the battlezone, handle start callbacks and intros
        env.rpg = content.querySelector('#combat')

        env.rpg.querySelectorAll('.sprite, .daemon').forEach(e=>{
            e.style.animationDelay = `-${Math.random() * 10}s`
        })

        if(settings.combatClass) {
            if(typeof settings.combatClass.split == "function") env.rpg.classList.add(... settings.combatClass.split(" ").filter(className => className != ""));
            else printError(`failed to apply combatClass ${settings.combatClass}`, true)
        }

        MUI("prohibit")
        setTimeout(()=>{
            env.rpg.classList.remove('intro', 'team-intro');
            body.classList.add('cull-stage')
            content.classList.remove('show-vn')
            MUI("deprohibit")
        }, env.rpg.settings.hardOpen ? 0 : 1000);
        
        //start at end of list so it loops around
        env.rpg.currentActorIndex = env.rpg.turnOrder.length - 1
        env.rpg.currentActor = env.rpg.turnOrder[env.rpg.currentActorIndex]
        updateStats()

        //initialize stun immunity on each actor with special stun immunity
        env.rpg.turnOrder.forEach(actor=>{
            if(actor.effectiveStats.stunImmunityMod) addStatus({target: actor, status: "stun_immune", length: actor.effectiveStats.stunImmunityMod, noReact: true})
        })

        setTimeout(() => {
            console.log("ADVANCE - initial")
            advanceTurn(false, {ignoreTime: true})
        }, 100)

        setTimeout(()=>{
            env.rpg.initializing = false
        }, 1000)

        if(settings.bgm) toggleBgm(settings.bgm, true)
        setTimeout(()=>{
            if(settings.bgmRate) {
                ratween(env.bgm, settings.bgmRate)
                env.bgm.intendedRate = settings.bgmRate || 1
            } else env.bgm.intendedRate = env.bgm.rate()
        }, 100)
        if(settings.bgmStart) env.bgm.seek(settings.bgmStart)
        if(settings.bgmVol) { env.bgm.volume(getModifiedVolume('music', settings.bgmVol)); env.bgm.intendedVol = settings.bgmVol }
        if(settings.startCallback) settings.startCallback();

        //if(env.rpg.classList.contains("crittamode")) env.toggleMouseThrottleLowSpeed(true)
        env.rpg.enemyTeam.element = env.rpg.querySelector('#enemy-team')
        env.rpg.allyTeam.element = env.rpg.querySelector('#ally-team')
    }

    env.rpg.refresh = ()=>{
        if(!isFirefoxOnWindows()) return;
        env.rpg.classList.add("refresh-anim")
        setTimeout(()=>env.rpg.classList.remove("refresh-anim"), 10)
    }
}

//initializes a given actor from the combatActorsJson
//this also adds them to a team!!
function initializeActor(actorSpecifier, {team, enemyTeam, matchPartyHP = false, uniqify = false, usePartySlug = false, alsoCreateUIElements = false, side = "right", dry = false}) {
    let slug = actorSpecifier.combatActor || actorSpecifier
    var newActor = JSON.parse(JSON.stringify(env.COMBAT_ACTORS[slug])) //can be either a party member object, or a string

    //if the actor has a special slug case, use it - usually only for bosses or generated characters
    if(dry) {
        newActor.dry = true;
        if(!env.rpg || !env.rpg.actors) env.rpg = { actors: {}, entCount: 0, dry: true }
    }

    if(usePartySlug && actorSpecifier.slug) newActor.slug = actorSpecifier.slug
    if(!newActor.slug) newActor.slug = slug 
    newActor.base = env.COMBAT_ACTORS[slug]
    newActor.base.slug = slug

    //unique-ifies the slug so there can be multiples of the same actor
    newActor.originalSlug = newActor.slug
    newActor.originalName = newActor.name
    if(uniqify && !newActor.unique) { 
        newActor.slug = newActor.slug + env.rpg.entCount++

        //also adds some numeric designation if there's multiple of the same name
        if(team.initial && !dry) {
            let dupeCount = team.initial.filter(member => {
                let memberSlug = typeof member == 'string' ? member : member.slug
                let memberName = member.name || env.COMBAT_ACTORS[memberSlug].name
                return memberSlug == newActor.originalSlug || memberName == env.COMBAT_ACTORS[newActor.originalSlug].name
            }).length

            if(dupeCount > 1 || env.rpg?.turnData?.turn > 0) {
                if(!env.rpg.dupeNames) env.rpg.dupeNames = 0
                env.rpg.dupeNames++
                const symbolOffset = env.rpg.dupeNames <= 12 ? env.rpg.dupeNames : env.rpg.dupeNames + 56 // this skip is to get around emoji-like chars
                newActor.name = newActor.name + ` ${String.fromCharCode(9787 + symbolOffset)}`
            }
        }
    }

    //apply any base stat changes from components
    let stats = generateCombatStats(actorSpecifier)
    if(stats) {
        newActor.stats = stats
        if(stats.maxhp) newActor.maxhp += stats.maxhp
    }

    //should only affect editable members, i.e. in critta-map gameplay
    if(actorSpecifier.portraitUrl) {
        newActor.portraitUrl = actorSpecifier.portraitUrl
    }
    
    //if the actor is a party character, we attempt to match HP
    //we check this twice since status effects can do stuff with hp on spawn
    let matchHP = () => {
        if(matchPartyHP && page.party) {
            let reference = page.party.find(m=>m.slug == newActor.slug)
            if(reference) {
                if(reference.hp) {
                    newActor.hp = reference.hp
                } else {
                    console.log(`no HP reference for ${newActor.slug}, falling back to max`)
                    newActor.hp = newActor.maxhp
                }
            } else {
                console.log(`no party reference for ${newActor.slug}`)
            }
        } else if(!newActor.hp) newActor.hp = newActor.maxhp
    }
    
    matchHP()
    
    if(!dry) {
        env.rpg.actorList.push(newActor)
        side == "right" ? team.members.push(newActor) : team.members.unshift(newActor)
        newActor.team = team
        newActor.enemyTeam = enemyTeam

        newActor.bp = 0
        newActor.state = newActor.state ? newActor.state : 'living' 
    }

    env.rpg.actors[newActor.slug] = newActor
    newActor.statusEffects = []
    newActor.events = {}

    if(dry) { //when dry-creating, the status display element doesn't exist, so we add things differently
        console.log("initializing dry actor statuses for", newActor.slug)
        if(newActor.initialStatusEffects) newActor.initialStatusEffects.forEach(status=>{
            console.log(" - adding initialStatus", status)
            addStatus({target: newActor, status: status[0], length: status[1], noReact: true, noUpdate: true, forceAdd: true, runEvents: false, dry: true})
        })

        if(page.party) {
            let partyGuy = page.party.find(member => member.slug == newActor.slug)
            if(partyGuy) {
                if(partyGuy.initialStatusEffects) {
                    partyGuy.initialStatusEffects.forEach(status=>addStatus({target: newActor, status: status[0], length: status[1], noReact: true, noUpdate: true, forceAdd: true, dry: true}))
                }

                if(partyGuy.name != newActor.name) newActor.name = partyGuy.name
            }
        }

        //when dry generating, we also want to update their actions and etc here
        if(actorSpecifier.components || actorSpecifier.critta) {
            newActor.member = actorSpecifier
            newActor.actions = getAlteredActorActions({member: newActor.member, actor: newActor})
        }
    } else if(alsoCreateUIElements && !dry) initializeActorUI({actor: newActor, team})

    //maxhp can be altered by the statuses initialized
    if(matchPartyHP && newActor.hp != newActor.maxhp) {
        matchHP()
        console.log(`initialized actor ${newActor.name} (${newActor.slug}) with ${newActor.hp}/${newActor.maxhp} HP`)
    }

    /* assign some handy little functions used in EP4 mainly */
    if(!dry) newActor.highlight = (state) => {

        if(newActor.piece) {
            newActor.piece.classList.toggle('highlight', state)
            
            //ing todo - we really oughta move this somewhere else
            if(state && env.rpg?.targetingFor?.action?.stats?.kb && env.rpg.hoveredTile && env.rpg.state == "targeting") {
                let direction

                //ing todo: make this account for pulls, from-actor kb, etc via new kbType on action stats
                if(env.rpg.targetingFor.action.stats.kbType == "fromOrigin") {
                    direction = env.rpg.targetingFor.actor.piece.tile.getRelativeDirection(newActor.piece.tile)
                } else if(newActor.piece.tile != env.rpg.hoveredTile) {
                    direction = env.rpg.hoveredTile.getRelativeDirection(newActor.piece.tile)
                } else {
                    direction = env.rpg.targetingFor.actor.piece.tile.getRelativeDirection(newActor.piece.tile)
                }

                console.log("predicting kb in direction", direction, "with kb value", env.rpg.targetingFor.action.stats.kb)
                let kbPreviewTiles = newActor.piece.predictKnockback({
                    direction: direction,
                    strength: env.rpg.targetingFor.action.stats.kb,
                    alsoDraw: true
                })

                console.log("would  highlight", kbPreviewTiles)
            }
        }

        newActor.highlighted = state        
        if(newActor.box) {
            newActor.box.classList.toggle('highlight', state)
            if(state == "piece") {
                newActor.box.classList.remove("compactor")
            } else if(state == "tile") {
                newActor.box.classList.add("highlight-from-tile")
            } else {
                if(newActor != env.rpg.currentActor) newActor.box.classList.toggle('compactor', !state)
                newActor.box.classList.remove("highlight-from-tile")
            }
        }

        if (state) { env.rpg.highlightedActors.add(newActor) } 
        else { env.rpg.highlightedActors.delete(newActor) }
    }

    return newActor
}

function clearActorHighlights() {
    env.rpg.highlightedActors.forEach(actor => actor.highlight(false))
    env.rpg.highlightedActors.clear()
    if(env.rpg.kbPredictionTiles) env.rpg.kbPredictionTiles.clearTiles()
}

//creates visual elements for a new actor
function initializeActorUI({actor, team, side, animateIn = false}) {
    let i = team.members.findIndex(act => act == actor)
    var actorTemplate = `
        <div id="%SLUG" style="--index: ${i}" index="${i}" class="actor ${team.name}actor ${actor.specialClass || ""} ${animateIn ? "phasing" : ""}">
            <div class="clickbox" actor-id="%SLUG"><div class="hitpredict"></div></div>
            %PORTRAIT
            <div class="statusbg"></div>
            <span class="statdisplay">
                <span class="name"></span>
                <span class="statuses"></span>
                <span class="points">
                    <span class="hp"></span>
                    <span class="bp" definition="BARRIER_MAX::1/2 max HP"></span>
                </span>
                <span class="state"></span>
            </span>
            <div class="passives"></div>
            <div class="actions"></div>
            <div class="floatbox"></div>
            <div class="combat-dialogue"></div>
        </div>
    `
    
    var portrait = ""
    var insertSpot = side == "left" ? 'afterbegin' : 'beforeend'
    if(actor.portrait) {portrait = actor.portrait.replaceAll("[[PORTRAITURL]]", actor.portraitUrl)}
    if(team.name == "enemy" && env.rpg.settings?.combatClass?.includes("crittamode")) actorTemplate = actorTemplate.replace(`<div class="actions"></div>`, `<details class="enemy-actions"><summary definition="NOTE::'analysis granted via vessel terminals'">ACTIONS</summary></details>`)

    content.querySelector(`#${team.name}-team`).insertAdjacentHTML(insertSpot, actorTemplate.replaceAll('%SLUG', actor.slug).replaceAll('%PORTRAIT', portrait))
    actor.box = content.querySelector(`.team #${actor.slug}.actor`)
    actor.box.actor = actor // self referential
    actor.hitBox = actor.box.querySelector(".floatbox")
    actor.clickBox = actor.box.querySelector(".clickbox")

    if(animateIn) setTimeout(()=>{
        actor.box.classList.remove('phasing')
        if(actor.sprite) actor.sprite.classList.remove('phasing')
    }, 100)

    /* in combat-scene, hovering a box will focus on the character */
    if(env.rpg.is2D) {
        //on mouseenter, highlight and focus on actor
        actor.box.addEventListener('mouseenter', function(ev){
            if(env.rpg.currentActor == actor || env.rpg.state == "animating" || env.rpg.classList.contains("targeting") || !actor.piece) return;
            env.rpg.grid.focusOnTile(actor.piece.tile)
            actor.highlight("box")
        })

        //on mouseleave, focus back on env.rpg.currentActor and remove highlight
        actor.box.addEventListener('mouseleave', function(){
            if(env.rpg.currentActor == actor || env.rpg.state == "animating" || env.rpg.classList.contains("targeting") || !env.rpg.currentActor.piece) return;
            env.rpg.grid.focusOnTile(env.rpg.currentActor.piece.tile)
            actor.highlight(false)
        })
    }

    if(team.name == "enemy") { 
        //only enemies get full on graphics
        let graphic = actor.graphic.replaceAll('%SLUG', actor.slug)
        if(animateIn) graphic = graphic.replace('sprite-wrapper', 'sprite-wrapper phasing')
        switch(env.rpg.tagName) {
            case "COMBAT-SCENE":
                actor.readyGraphic = graphic
            break

            default:
                content.querySelector('#enemy-graphic').insertAdjacentHTML(insertSpot, graphic)
        }

        //in crittamode, you can see enemy actions, and the zones that affect them
        if(env.rpg.settings?.combatClass?.includes("crittamode")) {
            content.querySelector(`#${actor.slug}.actor .enemy-actions`).insertAdjacentHTML('beforeend', generatePartyActions(actor, {actor}))
        }
    } else {
        //allies have components via their party members
        //enemies CAN have components directly on the object
        let componentSource = false
        if(actor.member?.components) componentSource = actor.member;
        else if (actor.components) componentSource = actor;
        
        if(componentSource !== false) actor.box.insertAdjacentHTML('beforeend', generateComponentDisplay(componentSource))
    }

    actor.sprite = content.querySelector(`#${actor.slug}-sprite-wrapper`)
    if(actor.sprite) actor.sprite.setAttribute("for", `${actor.base.slug}`)

    //handle any special spritework
    if(actor.base.events) {
        if(!env.rpg.is2D && actor.base.events.onSpriteCreation) actor.base.events.onSpriteCreation(actor.sprite)
        if(actor.base.events.onSpawn) actor.base.events.onSpawn(actor)
    }
    if(!env.rpg.is2D && env.rpg.settings.actorSpriteProcess) env.rpg.settings.actorSpriteProcess(actor)

    //if any actors should start with status effects, initialize them now that the element exists
    if(actor.initialStatusEffects) {
        actor.initialStatusEffects.forEach(status=>addStatus({target: actor, status: status[0], length: status[1], noReact: true, noUpdate: true, forceAdd: true}))
    }

    //ditto but at the party member level
    if(page.party) {
        let partyGuy = page.party.find(member => member.slug == actor.slug)
        if(partyGuy) {
            if(partyGuy.initialStatusEffects) {
                partyGuy.initialStatusEffects.forEach(status=>addStatus({target: actor, status: status[0], length: status[1], noReact: true, noUpdate: true, forceAdd: true}))
            }

            if(partyGuy.name != actor.name) actor.name = partyGuy.name
        }
    }
}

// new unified function for adding an actor
//  - team must be one of env.rpg.allyTeam, env.rpg.enemyTeam, or env.rpg.neutralTeam
//  - neutral actors skip UI initialization and turn-order updates
//  - only allies or enemies get UI
function midCombatActorAdd(team, actorSpecifier, side = "right", {location = "spawn", specificTile, specificEquipment, anim, animDuration} = {}) {
    if(!env.rpg?.active) return false;
    if(!env.rpg.is2D && team.name == "neutral") throw "no support for neutrals in 1D combat";

    let enemyTeam
    switch(team.name) {
        case "enemy": enemyTeam = env.rpg.allyTeam; break;
        case "ally": enemyTeam = env.rpg.enemyTeam; break;
    }

    let actor = initializeActor(actorSpecifier, {
        team,
        enemyTeam,
        uniqify: true,
        side
    });
    env.rpg.actors[actor.slug] = actor

    //preprocessing
    if(env.rpg.settings.actorPreprocess) env.rpg.settings.actorPreprocess(actor)
    if(actor.base?.events?.onInitialize) actor.base.events.onInitialize(actor)
    actor.actions = getAlteredActorActions({member: actor, actor, specificEquipment})

    if(env.rpg.is2D) {
        env.rpg.grid.replaceActorPiece({target: actor, location, specificTile, anim, animDuration})

        if(team.name == "neutral" && actor.initialStatusEffects) { // since neutrals don't get UI, we handle their initials here
            actor.initialStatusEffects.forEach(
                status => addStatus({target: actor, status: status[0], length: status[1], noReact: true, noUpdate: true})
            )

            //no further action needed for neutrals so bye bye
            return actor
        }
    }

    //update turn order, etc
    initializeActorUI({actor, team, side, animateIn: true})

    //rebuild turn order based on who's supposed to be next, but only if they're on the left
    let nextActor = env.rpg.turnOrder[(env.rpg.currentActorIndex + 1) % env.rpg.turnOrder.length]
    env.rpg.turnOrder = []
    env.rpg.teams.forEach(t => { env.rpg.turnOrder = env.rpg.turnOrder.concat(t.members) })
    if(side == "left") env.rpg.currentActorIndex = env.rpg.turnOrder.findIndex(a => a === nextActor) - 1;

    if(env.rpg.is2D && actor.box) { actor.box.classList.add("compactor") }
    updateStats()

    if(actor.effectiveStats.stunImmunityMod) addStatus({target: actor, status: "stun_immune", length: actor.effectiveStats.stunImmunityMod, noReact: true})
    delayAdvance(env.ADVANCE_RATE * 0.2)

    return actor
}

// removes something from any team
//  - you can specify fast
//  - optionally can leave sprites behind, which is useful for some obstacle related stuff in EP4
function midCombatActorRemove(actor, {noSpriteRemoval = false, fast = false} = {}) {
    let team = actor.team

    team.members = team.members.filter(a => a.slug !== actor.slug)
    delete env.rpg.actors[actor.slug]
    env.rpg.actorList = env.rpg.actorList.filter(a => a.slug !== actor.slug)
    actor.removed = true

    let removeList = [actor.box]
    let spriteEl = env.rpg.is2D ? (actor.piece || actor.deadPiece) : actor.sprite
    if(!noSpriteRemoval && spriteEl) removeList.push(spriteEl)

    removeList.forEach(el => {
        if(!el) return;
        
        setTimeout(() => el.classList.add('phasing'), fast ? 0 : (env.rpg.is2D ? 1000 : 200))
        setTimeout(() => el.remove(), fast ? 0.1 : (env.rpg.is2D ? 4000 : 1000))
    })

    // this guy is going away so we make sure no lingering tileEffects treat them as the origin anymore
    if(env.rpg.is2D) env.rpg.grid.tileEffects.forEach(effect => {
        if(effect.origin === actor) {
            effect.origin = false
            if(effect.requiresOrigin) env.rpg.grid.deleteTileEffect(effect)
        }
    })

    // update the turnOrder according to who is supposed to be next
    let nextActor = env.rpg.turnOrder[(env.rpg.currentActorIndex + 1) % env.rpg.turnOrder.length]
    if(nextActor == actor) nextActor = env.rpg.turnOrder[(env.rpg.currentActorIndex + 2) % env.rpg.turnOrder.length]

    let oldTurnOrder = env.rpg.turnOrder

    //the turnorder may rarely have multiples of the same actor, so we need to filter out this actor instead of just reforming it normally
    env.rpg.turnOrder = oldTurnOrder.filter(a => a !== actor)
    env.rpg.currentActorIndex = env.rpg.turnOrder.findIndex(a => a === nextActor) - 1

    if(env.rpg.currentActor == actor && !env.rpg.haltedByBufferTime) { // if there's no advance queued we probably want to do this to avoid softlock
        delayAdvance(env.ADVANCE_RATE * 0.2)
        advanceTurn(actor)
    }

    // unhook events from statuses
    actor.statusEffects.forEach(s => removeStatus(actor, s.slug, {runEvents: false, forceRemoveStatus: true, from: 'midcombatdelete', noUpdate: true}))
}

//old versions for older mod support
function midCombatEnemyAdd(actorSpecifier, side = "right", {location, specificTile} = {}) {
    console.warn("there's a new midCombatActorAdd command you can use instead")
    return midCombatActorAdd(env.rpg.enemyTeam, actorSpecifier, side, {location, specificTile})
}

function midCombatEnemyRemove(actor, {noSpriteRemoval = false, fast = false} = {}) {
    console.warn("there's a new midCombatActorRemove command you can use instead")
    return midCombatActorRemove(actor, {noSpriteRemoval, fast})
}

function teamDeadCheck() {
    //check if either team is dead
    var aTeamIsDead = false;
    env.rpg.teams.forEach((team, i) => {
        var teamIsDead = true;
        team.members.forEach(actor => {
            if(actor.state != "dead") {
                teamIsDead = false;
            } else if(actor.lastStand == true) {
                teamIsDead = false;
            }
        });

        if(teamIsDead) {
            if(i == 0) {
                aTeamIsDead = env.rpg.allyTeam;
            } else {
                aTeamIsDead = env.rpg.enemyTeam;
            }
        }
    });

    return aTeamIsDead
}

function endCombatIfTeamDead() {
    if(!env.rpg.active) return true;

    let deadTeam = teamDeadCheck()
    if(teamDeadCheck() !== false) {
        if(env.rpg.active) endCombat(deadTeam)
        return true
    }
}

//adds extra time to the next delayed advance
function delayAdvance(ms) {
    if(!env.rpg) return;
    if(!env.rpg.delayAdvanceTime) env.rpg.delayAdvanceTime = ms
    else env.rpg.delayAdvanceTime += ms
}

//moves to the next actor and lets them act
function advanceTurn(advanceIfItsThisActorsTurn, {ignoreTime = false, clearActions = true} = {}) {
    if(env.rpg.refresh && env.rpg.is2D) env.rpg.refresh()

    //bugout protection
    //combatBugoutRefresh() no bugout protection for you lol get softlocked
    // no but seriously we tried this and it sucked and kept getting false positives
    // was more harmful to the experience to leave in than the chance of weird behavior
    // will revisit later

    //if an actor is passed, only advance the turn if it's still their turn
    if(advanceIfItsThisActorsTurn) { 
        if(env.rpg.currentActor != advanceIfItsThisActorsTurn) {
            console.trace()
            console.warn(`ADVANCETURN - attempted to advance turn for ${advanceIfItsThisActorsTurn?.slug} when it's ${env.rpg.currentActor?.slug}'s turn, so ignoring call. halt: ${env.rpg.halt}`)
            return false
        }
    }

    if(clearActions) clearActionsDisplay();

    //combat-scene may run telegraphed actions for someone before their actual turn happens
    let upcomingI = (env.rpg.currentActorIndex + 1) % env.rpg.turnOrder.length
    let upcomingActor = env.rpg.turnOrder[upcomingI] || env.rpg.turnOrder[0] // fallback in edge case removals
    //console.log("upcoming i is", upcomingI, "which means", upcomingActor)

    //hardskips will go to the next actor without changing anything
    //this will lock up if everyone has hardskip, so don't do that
    while(upcomingActor?.hardSkip) {
        upcomingI = (upcomingI + 1) % env.rpg.turnOrder.length
        upcomingActor = env.rpg.turnOrder[upcomingI]
    }

    //scene will go here to run telegraphs
    if(!env.rpg.halt && env.rpg.is2D) env.rpg.advanceMod("prehalt", {upcomingActor})
    
    //if we need some buffer time before actually advancing, we delay the call
    //we don't set up delayed advances if we're in halt mode
    if(!env.rpg.halt && !ignoreTime && ((Date.now() - env.rpg.lastUpdate) < env.ADVANCE_RATE * 0.8) || env.rpg.delayAdvanceTime) {
        console.log("ADVANCETURN - setting a delayed advance for", advanceIfItsThisActorsTurn?.slug, env.rpg.halt)
        
        let delayTime = env.ADVANCE_RATE + (env.rpg.delayAdvanceTime || 0)
        env.rpg.delayAdvanceTime = 0 //reset for next time
        setTimeout(()=>advanceTurn(advanceIfItsThisActorsTurn), delayTime)

        env.rpg.haltedByBufferTime = true
        return false
    }

    //if there's a previous action effect message, we wrap it up
    if(!env.debug) {
        switch(typeof env.rpg.combineTurns) {
            case "string": // optional team-based combination used sparingly
                if(
                    (env.rpg.combineTurns == env.rpg.currentActor.team.name) &&
                    (env.rpg.currentActor.team.name == upcomingActor?.team?.name)
                ) 
            break;

            default: 
                env.rpg.effectMessage.close()

                if( // set up the combination header
                    env.rpg.combineTurns == upcomingActor?.team?.name &&
                    env.rpg.currentActor.team.name != upcomingActor?.team?.name
                ) env.rpg.effectMessage.action({
                    user: env.rpg.enemyTeam.members[0],
                    target: env.rpg.enemyTeam.members[0],
                    action: "we are beset by incoherent foes",
                    reason: "enemy turn",
                    actionMessageIndex: -2 // 0 is false, -1 is treated as false for other reasons. -2 is intentional
                })  
        }
    } 

    //sometimes we halt for various reasons
    if(env.rpg.halt) {
        env.rpg.haltedAttempt = true
        if(env.rpg.is2D) env.rpg.advanceMod("halted", {upcomingActor})
        return false
    }

    //combat-scene has some extra handling before we actually advance
    if(env.rpg.is2D) env.rpg.advanceMod("before", {upcomingActor})
        
    /* handle statuses related to the previous actor if applicable */
    let prevActor = env.rpg.currentActor
    if(prevActor && prevActor?.state != "dead") { 
        if(prevActor.events?.onTurnEnd || env.rpg.globalListeners?.GLOBAL_onTurnEnd?.length) triggerStatusEvents({target: prevActor, eventName: "onTurnEnd"})

        if(prevActor != upcomingActor) {
            var removingStatuses = []
        
            prevActor.statusEffects.forEach((status, i) => {       
                if(status.tickType == "onTurnEnd" && !status.justCreated) {
                    if(!status.infinite && !status.passive) status.duration -= 1;
                    if(status.duration <= 0) removingStatuses.push(status)
                } else if(status.justCreated) {
                    status.justCreated = false
                }
            });

            removingStatuses.forEach((status) => { if(!status.infinite && !status.passive) removeStatus(prevActor, status.slug, {from: "expire"}) })
            updateStats({actor: prevActor})
        }
    }

    //turnCallback before the second haltcheck
    if(env.rpg.settings.turnCallback) try { env.rpg.settings.turnCallback(upcomingActor, prevActor) } catch(e) { printError('turn callback failed'); printError(e) }

    // one more halt check since global turn events might alter this
    if(env.rpg.halt) {
        env.rpg.haltedAttempt = true
        if(env.rpg.is2D) env.rpg.advanceMod("halted", {upcomingActor})
        return false
    }

    // set up new turn data
    // turnData is an arbitrary object refreshed every turn for holding onto data as needed
    // good for setting turn-specific flags
    env.rpg.lastTurnData = env.rpg.turnData
    if(!env.rpg.turnData) env.rpg.turnData = { turn: 0 }
    else env.rpg.turnData = { turn: env.rpg.turnData.turn + 1 }

    // actual advance happens here
    env.rpg.haltedAttempt = false
    env.rpg.haltedByBufferTime = false
    env.rpg.lastRedirector = false
    env.rpg.lastActor = env.rpg.currentActor
    if(env.rpg.emergencyTurnEndEl) {
        env.rpg.emergencyTurnEndEl?.remove()
        delete env.rpg.emergencyTurnEndEl
    }
    
    env.rpg.currentActorIndex = upcomingI
    env.rpg.currentActor = upcomingActor

    console.log("CURRENTACTOR UDPATE!!!", env.rpg.currentActor.slug)

    if(env.rpg.currentActor.advanceModifier) env.ADVANCE_RATE = env.rpg.currentActor.advanceModifier * env.rpg.baseAdvanceRate;
    else if((env.ADVANCE_RATE != env.rpg.baseAdvanceRate) && !env.tempAdvanceRateStorage) env.ADVANCE_RATE = env.rpg.baseAdvanceRate

    // swap turn indicators
    if(prevActor.box) prevActor.box.classList.remove('current-turn')
    if(upcomingActor.box) upcomingActor.box.classList.add('current-turn')

    //console.log("advance info is", env.rpg.lastActor, env.rpg.currentActor)
    
    if(!env.rpg.currentActor) { env.rpg.currentActor = env.rpg.turnOrder[0]; console.log("error - no current actor") }
    let actor = env.rpg.currentActor;
    console.log(`ADVANCED TO ${actor.slug}`)

    //check if either team is dead
    //console.log("deadcheck before", performance.now())
    if(endCombatIfTeamDead()) return
    //console.log("deadcheck after", performance.now())

    //apply actor's statuses
    var skipTurn = false
    if(actor.state != "dead" && actor != env.rpg.lastActor) {
        //console.log("statuscheck before", performance.now())
        //console.log(`CHECKING ACTOR ${actor.slug} STATUS`);
        /* run status effects */
        var removingStatuses = []
        if(actor.events?.onTurn || env.rpg.globalListeners?.GLOBAL_onTurn?.length) triggerStatusEvents({target: actor, eventName: "onTurn"})
        actor.statusEffects.forEach((status, i) => {
            if(status.tickType) return; // anything with a tickType should be specially controlled
            //console.log(`    EYEBALLIN ${status.slug} - ${status.duration} (${i}) `);

            if(status.skipTurn) skipTurn = true

            //console.log(`        EXECUTING EFFECT`);
            //console.log(actor, actor.statusEffects)
            
            if(!status.infinite && !status.passive) {
                if(status.delayFirstTickForActorsOnTheRight && status.justCreated) {
                    console.log()
                    console.log(`        delayed first tick`);
                } else {
                    status.duration -= 1       
                    //console.log(`        REDUCED LENGTH TO ${status.duration}`);
                }
            }

            if(status.duration <= 0) removingStatuses.push(status)
        });

        /* after running effects, remove statuses that have expired */
        removingStatuses.forEach((status) => {
            if(!status.infinite && !status.passive) {
                removeStatus(actor, status.slug, {from: "expire"})
            }
        })
        //console.log("statuscheck after", performance.now())
    }

    //may be advanced by updateStats within status effects
    if(env.rpg.currentActor != actor) {
        console.log("ADVANCETURN - detected currentActor mismatch", env.rpg.currentActor, actor)
        return;
    }

    //reset 'turnover' class - this is what hides the action menus
    if(actor.team.name == "ally") actor.box.querySelector(".actions").classList.remove("turnover")

    if(skipTurn && actor.state != "dead" && !actor.firmSkip) {
        console.log("ADVANCE - skipTurn")
        if(env.rpg.is2D) env.rpg.advanceMod("after", {skipped: true})
        advanceTurn(actor)
        updateStats({actor})
        return;
    }

    //enable actions if they didn't die from status effects (if they did, advance turn)
    //if player controlled, show actions for that character
    //console.log("updatestats", performance.now())
    if(actor.state != "dead" && actor.team.name == "ally") {
        if(!actor.npc) { // npc allies have their own calls in statuses. sounds insane but no time to update enemy turn
            updateStats({actor})
            showActions(actor)
        }
    } else if(actor.state != "dead" || actor.lastStand) { //if enemy, run enemy AI
        try {
            updateStats({actor})

            //todo: this is a little bruteforce but it makes sure tile effects have a bit of time to go off before targeting begins
            // ideally we just handle onActorAffected tileEffects actually before advanceTurn is called, like after using an action
            if(env.rpg.is2D) setTimeout(()=>enemyTurn(actor), 50);
            else enemyTurn(actor)
        } catch(e) {printError(e); printError('proceeding to next turn', false); setTimeout(()=>advanceTurn(actor), env.ADVANCE_RATE); }
    } else {
        console.log("ADVANCE - dead", actor.slug)
        if(env.rpg.is2D) env.rpg.advanceMod("after", {skipped: true})
        advanceTurn(actor, {ignoreTime: true})
    }
    //console.log("updatestats end", performance.now())

    if(env.rpg.is2D) env.rpg.advanceMod("after")

    if(env.rpg.enemyTeam.members.length > 6) {
        env.rpg.enemyTeam.element.classList.add("team-overflow")
    }
}

function combatBugoutRefresh() {
    return false; // disabled for now still

    clearInterval(env.rpg.bugoutInterval)
    env.rpg.bugoutState = { ticks: 0 }
    env.rpg.bugoutInterval = setInterval(() => {
        //not halted or in dialogue, which would be intentional
        if(body.classList.contains("in-dialogue") || env.rpg.halt) return;

        if(
            !env.rpg.buttondrop && 
            (
                ( // enemy turn that's stuck
                    env.rpg.currentActor.team.name == "enemy" && env.rpg.bugoutState.enemyGoing
                ) 
                ||
                ( // been stuck in the same non-standard state
                    env.rpg.state && env.rpg.state == env.rpg.bugoutState.sceneState
                )
                ||
                ( // the turn has "been ending" for at least 20 seconds (weird)
                    env.rpg.bugoutState.beenEnding
                )
                || //turn has been going for 2 minutes and no actions are showing, also not the end of a turn
                env.rpg.bugoutState.ticks > 4 && !env.rpg.turnData?.showingActions && !env.rpg.turnData.endingTurn
            )
        ) {
            //chatter({actor: 'bugout', text: `pobem maybe detected`, readout: true})
            console.warn(
                "BUGOUT triggered",
                `current actor: ${env.rpg.currentActor?.slug}`,
                "(enemy turn stuck):", env.rpg.currentActor.team.name == "enemy" && env.rpg.bugoutState.enemyGoing,
                // "(pathfinding slow):", env.rpg.lastPathfindPerformance > 20,
                `(scene state stuck on ${env.rpg.state}):`, env.rpg.state && env.rpg.state == env.rpg.bugoutState.sceneState,
                "(beenEnding):", env.rpg.bugoutState.beenEnding,
                "(turn going weirdly long):", env.rpg.bugoutState.ticks > 4 && !env.rpg.turnData?.showingActions && !env.rpg.turnData.endingTurn
            );

            //todo: ditch alert
            //alert(`showing bugout now, check F12 console immediately before continuing to see why (it'll say true or false a bunch of times but this is useful to me)`)
            //env.rpg.insertAdjacentHTML("beforeend", `<button class="panicbutton" onclick="startDialogue('bugout')" definition="INTERNAL CONTEXT::'heyyy thanks for using my framing device %-P';'looks like something might b busted sorrry dude';'but its ok i got u';'i made a little guy 2 help';'u know what they say about expiermental technogogy';'::ATTENTION:INVALID SPACING SYNTAX\n\n'If u didnt break it u didnt use it'\n      - johnythan\n\n'::ERROR:INVALID CONTEXT">panic button</button>`); 
            env.rpg.buttondrop = true
        }

        if(env.rpg.is2D && env.rpg.state && env.rpg.state != "normal") {
            env.rpg.bugoutState.sceneState = env.rpg.state
        }
        
        if(env.rpg.currentActor.team.name == "enemy") {
            env.rpg.bugoutState.enemyGoing = true
        }

        if(env.rpg.turnData.endingTurn) {
            env.rpg.bugoutState.beenEnding = true
        }
        
        env.rpg.bugoutState.ticks++
    }, 30000);
}

//displays the possible actions for a player controlled character
function showActions(actor) {
    if(env.rpg.turnData.showingActions) { clearActionsDisplay() }
    env.rpg.turnData.showingActions = true
    let baseActor = env.COMBAT_ACTORS[actor.slug] //gets the original object with included functions
    let rpgActor = env.rpg.allyTeam.members.find(member => member.slug == actor.slug) //gets live object with statuses, hp, etc
    if(!actor.box) return;

    triggerStatusEvents({target: actor, eventName: "onBeforeShowActions", context: {actor} })

    let actionsEl = actor.box.querySelector(`.actions`);
    actor.box.classList.add('acting');

    //activate their windup options if they have windup
    let actionPool = actor.actions
    if(hasStatus(rpgActor, "windup") && actor.windupActions) { 
        actionPool = actor.windupActions
    }

    //some statuses grant actions! yay!
    if(actor?.grantedActions?.length) actionPool = actionPool.concat(actor.grantedActions);

    //to avoid weird softlocks
    if(env.rpg.is2D && hasStatus(actor, "fear") && actor.actions.includes("scene_evade")) {
        actionPool = [...actor.actions]
        actionPool.push("cower")
    }

    actionPool = actionPool.map(actName => env.ACTIONS[actName])
    actionPool.forEach(action => {
        let definition = `ACTION++${action.slug}`
        let disabled = false

        if(action.disableIf) disabled = action.disableIf(actor)
        if(disabled) definition = disabled
        
        const actionEl = document.createElement('span')
        actionEl.classList.add('action')
        if(disabled) { actionEl.classList.add('disabled') }
        actionEl.setAttribute('action', action.slug)
        actionEl.setAttribute('definition', definition)
        actionEl.setAttribute('fromactor', actor.slug)
        actionEl.textContent = action.name
        actionEl.action = action
        
        if(action.itemAction) {
            if(!actionsEl.querySelector('.item-container')) actionsEl.insertAdjacentHTML('afterbegin', `<div class="item-container"></div>`)
            actionsEl.querySelector('.item-container').appendChild(actionEl)
        } else {
            actionsEl.appendChild(actionEl)
        }
    })

    actor.box.querySelectorAll(`.action:not(.disabled)`).forEach(el=>{
        el.addEventListener('mousedown', function(e){
            if(e.button !== 0) return; // leftclick
            
            MUI("off")
            let actionItem = el.item
            let action = el.action
            let parentEl = actor.box.querySelector(".actions")
    
            if(action.type.includes("target") || action.type.includes("ground")) {
                showTargets(actor, action, actionItem);
            } else { //DOES NOT NEED A TARGET - handle any special execs (i.e. auto AOEs or something) in the action itself
                chooseTarget(actor, action, actor, actionItem);
            }
            
            //hides action list
            parentEl.classList.add('turnover')
        })

        //in combat scene, we also show some range info if it's relevant
        if(env.rpg.is2D){
            let action = el.action
            //on mouse enter, we'll set up the env.rpg.markedPreviewTiles and env.rpg.markedPreviewTileClasses arrays
            el.addEventListener('mouseenter', function(){
                if(env.rpg.markedPreviewTiles && env.rpg.markedPreviewAction != action) { 
                    env.rpg.markedPreviewTiles.forEach(tile => tile.classList.remove(... env.rpg.markedPreviewTileClasses)) 
                } else if((env.rpg.markedPreviewTiles && env.rpg.markedPreviewAction == action)) return; //only show/render range stuff when relevant

                if( //we return here because we only care about removing AOE markers for self/special
                    (action.type.includes("autohit") || action.type.includes("special")) && 
                    !action?.stats?.extraAOE
                ) { env.rpg.markedPreviewTiles = false; return; }

                env.rpg.markedPreviewAction = action
                env.rpg.markedPreviewTileClasses = ["targetable-preview"]
                
                if(!action.type.includes("autohit") && !action.type.includes("special")) {
                    env.rpg.markedPreviewTiles = env.rpg.grid.markTiles({
                        originTile: actor.piece.tile,
                        shape: action.targeting || 'square',
                        size: action?.stats?.range || action.range || 1,
                        addClass: "targetable-preview",
                        ignoresObstacles: action.ignoresBlocks,
                        ignoresLOS: action.ignoresLOS,
                        ignoresActors: typeof action.ignoresActors == "undefined" ? true : action.ignoresActors,
                        requiresPath: action.requiresPath,
                        includesOrigin: typeof action.includesOrigin != "undefined" ? action.includesOrigin : action.type.includes("self"),
                        markingForActionTarget: true,
                        onTileCheck: ({tile}) => {
                            let validity = true
                            if(tile.untargetable) validity = false
                            if(action?.aoe?.tileFilter) validity = action.aoe.tileFilter(tile, validity, actor) // additional arbitrary per-tile filter defined at action level

                            return validity
                        }
                    })
                    
                    //specialTiles is an action function that can add arbitrary tiles
                    if(action?.aoe?.specialTiles) {
                        let specialTiles = action.aoe.specialTiles(actor)
                        specialTiles.forEach(t=>t.classList.add('targetable-preview'))
                        env.rpg.markedPreviewTiles = env.rpg.markedPreviewTiles.concat(specialTiles)
                    }
                } else {
                    env.rpg.markedPreviewTiles = []
                }
                
                let handleExtraAOE = (aoeInfo) => {
                    if(
                        aoeInfo.origin == "self" &&
                        (!aoeInfo.showIf || aoeInfo.showIf(actor, actor, action))
                    )  {
                        env.rpg.markedPreviewTiles = env.rpg.markedPreviewTiles.concat(env.rpg.grid.markTiles({
                            originTile: actor.piece.tile,
                            shape: aoeInfo.shape || 'square',
                            size: aoeInfo.size || 1,
                            addClass: aoeInfo.addClass,
                            ignoresObstacles: aoeInfo.ignoresBlocks,
                            ignoresLOS: aoeInfo.ignoresLOS,
                            ignoresActors: aoeInfo.ignoresActors,
                            requiresPath: aoeInfo.requiresPath,
                            includesOrigin: typeof aoeInfo.includesOrigin == "undefined" ? true : aoeInfo.includesOrigin,
                        }))

                        env.rpg.markedPreviewTileClasses.push(aoeInfo.addClass)
                    }
                }

                if(action?.stats?.extraAOE) for (const aoeName in action.stats.extraAOE) {
                    const aoeInfo = action.stats.extraAOE[aoeName]
                    handleExtraAOE(aoeInfo)
                }

                if(actor.extraAOEFromStatuses) actor.extraAOEFromStatuses.forEach(aoeInfo => {
                    handleExtraAOE(aoeInfo)
                })
            })

            el.addEventListener('mouseleave', function(){
                if(env.rpg.markedPreviewTiles) { 
                    env.rpg.markedPreviewTiles.forEach(tile => tile.classList.remove(... env.rpg.markedPreviewTileClasses)) 
                    env.rpg.markedPreviewAction = false
                }
            })
        }
    })
}

// both for regular use and updateStats async handling
function clearActionsDisplay() {
    env.rpg.classList.remove('targeting')
    env.rpg.actorList.forEach(actor => {
        if(actor.box) {
            if(actor.clickBox) {
                actor.clickBox.removeEventListener('mousedown', actor.clickCallback)
                if(actor.clickBox.hitPredict) actor.clickBox.hitPredict.innerHTML = ``
            }
            
            actor.box.classList.remove('targetable', 'target-source')
            actor.box.querySelectorAll('.actions .action, .actions .item-container').forEach(el=>el.remove())
            actor.box.querySelectorAll('.actions').forEach(el=>el.classList.remove('turnover'))
            actor.box.querySelectorAll('.target-notice').forEach(el=>{
                el.classList.remove('active')
                setTimeout(()=>env.rpg ? el.remove() : '', 200)
            })

        }
    })
}

//on target-type player actions, lets you pick an actor to hit before executing
function showTargets(actor, action, actionItem = false) {
    if(env.rpg.is2D && !action.type.includes("boxtarg")) return env.rpg.showTargets(actor, action, actionItem);

    if(env.rpg?.effectMessage?.last) env.rpg.effectMessage.closeAnim(env.rpg.effectMessage.last.display)

    var itemNote = ""
    if(actionItem) {itemNote = `<span class='item-note'>(via ${actionItem.name})</span>`}
    env.rpg.querySelector(`.actor#${actor.slug}`).insertAdjacentHTML('beforeend',
        `
        <div class="target-notice">
            <span><span class="neutral">${action.verb ? action.verb : action.name}</span> whom?</span>
            ${itemNote}
            <span class="target-nevermind">NEVERMIND</span>
        </div>
        `
    )

    env.rpg.turnOrder.forEach(a => {
        if(a.box) a.box.preTargetPosition = a.box.getBoundingClientRect()  
    })

    clearEffectLines()
    env.rpg.classList.add('targeting')

    //animates the target notice in after a short delay
    var targetNotice = env.rpg.querySelector('.target-notice')
    setTimeout(()=>{
        targetNotice.classList.add('active');
    }, 200);

    //hides the notice & shows their skills again if they go back
    env.rpg.nevermind = ()=>{
        MUI("off")
        targetNotice.classList.remove('active')
        clearActionsDisplay()
        showActions(actor)
        clearEffectLines()

        delete env.rpg.nevermind
    }
    env.rpg.querySelector('.target-nevermind').addEventListener('mousedown', env.rpg.nevermind);

    //makes the targetable actor panels glow and execute chooseTarget when clicked
    let validTargets = new Set()
    if(action.type.includes("self")) validTargets.add(actor) // normally can't self target
    env.rpg.actorList.forEach(targetActor => {
        if(
            targetActor.untargetable // untargetable by any means (unless self?)
        ) return;

        let add = false

        ////ADD CHECKS
        //assumes all non-dead targets are valid by default when targeting
        //formerly you couldn't attack last-stand targets but that's changing
        if(action.type.includes("target") && targetActor.state != "dead") add = true

        //rez is targeted to include da dead in addition to normal targets
        if(action.type.includes("rez") && targetActor.state == "dead") add = true

        ////REMOVE CHECKS
        //supports are team-exclusive to caster
        if(action.type.includes("support") && targetActor.team != actor.team) add = false

        //can't target self unless specified
        if(!action.type.includes("self") && actor == targetActor) add = false


        if(add) validTargets.add(targetActor)
    })

    console.log("targets", validTargets)

    //add targetable states
    validTargets.forEach(target => { 
        if(target.box) {
            target.box.classList.add('targetable')
            if(env.rpg.is2D) target.box.classList.remove('compactor')
            let clickBox = target.clickBox
            insertHitPredictHTML(actor, action, target, clickBox)

            //store the event as a prop on the element for later dispelling
            if(clickBox.clickCallback) clickBox.removeEventListener('mousedown', clickBox.clickCallback)
            clickBox.clickCallback = (e) => {
                if(e.button !== 0) return; // has to be leftclick
                chooseTarget(actor, action, target, actionItem)
            }

            if(clickBox.mouseEnterCallback) clickBox.removeEventListener('mouseenter', clickBox.mouseEnterCallback)
            clickBox.mouseEnterCallback = (e) => { // used to draw warnings
                triggerStatusEvents({target, eventName: "onTargetHover", context: {targetingActor: actor, action} })
            }

            clickBox.addEventListener('mousedown', clickBox.clickCallback)
            clickBox.addEventListener('mouseenter', clickBox.mouseEnterCallback)
        } else console.log("no box for", target)
    })
}

function insertHitPredictHTML(actor, action, target, hitPredictHost) {
    //console.log("hithost is", hitPredictHost, "for target", target)
    //hitprediction display added with the ing update
    let actionInfo = { 
        acc: action?.stats?.accuracy || action.accuracy,
        crit: action?.stats?.crit || action.crit,
        amt: action?.stats?.amt || action.amt,
        autohit: action?.stats?.autohit || action.autohit,
        type: action?.stats?.type || action.type,
        forceCrit: action?.stats?.forceCrit || action.forceCrit,
    }
    
    let hitPredict = calculateHit(actor, target, actionInfo)
    if(action.autohit || action?.stats?.autohit) hitPredict.auto = true
    hitPredictHost.hitPredict = hitPredictHost.querySelector('.hitpredict')
    
    let accClass = ''
    if(!hitPredict.auto) {
        if(hitPredict.acc < actionInfo.acc) accClass = 'obesk-shadow'
        else if(hitPredict.acc > actionInfo.acc) accClass = 'friend-shadow'
    }
    
    let critClass = ''
    if(hitPredict.crit) {
        if(hitPredict.crit < actionInfo.crit) critClass = 'obesk-shadow'
        else if(hitPredict.crit > actionInfo.crit) critClass = 'friend-shadow'
    }
    
    hitPredictHost.hitPredict.innerHTML = `
        <span class="predstat pred-acc ${accClass}" stat="hit">${hitPredict.auto ? `autohit` : `${(hitPredict.acc * 100).toFixed(2)}%`}</span>
        ${hitPredict.crit ? `<span class="predstat pred-crit ${critClass}" stat="crit">${(hitPredict.crit * 100).toFixed(2)}%</span>` : ``}
    `

    if((hitPredict.amtMod || hitPredict.flatAmt) && actionInfo.amt != 0) {
        let amtText = ``
        let show = false
        let flatClass = ''
        let modClass = ''

        if(hitPredict.flatAmt) {
            show = true
            amtText += hitPredict.flatAmt > 0 ? `+${hitPredict.flatAmt}` : `${hitPredict.flatAmt}`
            flatClass = hitPredict.flatAmt > 0 ? 'friend-shadow' : 'obesk-shadow'
        }

        if(hitPredict.amtMod != 1) {
            show = true
            if(amtText) amtText += `, `
            amtText += `x${hitPredict.amtMod}`
            modClass = hitPredict.amtMod < 1 ? 'obesk-shadow' : 'friend-shadow'
        }

        if(show) {
            let amtClass = flatClass || modClass
            if(flatClass && modClass && flatClass !== modClass) amtClass = ''
            hitPredictHost.hitPredict.innerHTML += `<span class="predstat pred-amt ${amtClass}" stat="mod">${amtText}</span>`
        }
    }
}

//once a target is chosen for a target-type player action, hide the notice and execute the action!
function chooseTarget(actor, action, target, actionItem = false){
    let actionResult = useAction(actor, action, target);
    delete env.rpg.nevermind
    
    switch(actionResult.hit) {
        case null: case 'nothing': break;
        case 'critbuff': reactDialogue(actor, 'crit_buff'); break;
        case 'crit': reactDialogue(actor, 'crit'); break;
        case true: reactDialogue(actor, 'hit'); break;
        case false: reactDialogue(actor, 'miss'); break;
    }
    completeTargeting(actor, action, actionItem)
}

//handles cleanup for a player character targeting sequence
function completeTargeting(actor, action, actionItem, advance = true) {
    //hides the notice
    env.rpg.turnData.showingActions = false
    env.rpg.turnData.endingTurn = true
    actor.box.querySelectorAll('.target-notice').forEach(el=>el.classList.remove('active'))
    
    env.rpg.classList.remove('targeting')
    env.rpg.classList.add('recently-targeted')
    setTimeout(()=>env.rpg.classList.remove('recently-targeted'), 500)
    setTimeout(()=>actor.box.querySelectorAll('.target-notice').forEach(el=>el.remove()), 200);

    // "special" types handle advances on their own terms
    if(!action.type.includes("special") && advance) setTimeout(()=>advanceTurn(actor), env.ADVANCE_RATE);

    //removed any marked tiles
    if(env.rpg.markedPreviewTiles) { env.rpg.markedPreviewTiles.forEach(tile => tile.classList.remove(... env.rpg.markedPreviewTileClasses)); env.rpg.markedPreviewTiles = false }

    if(actionItem && !actionItem.infinite) {
        removeItem(actionItem)
    }

    env.rpg.actorList.forEach(actor => {
        if(actor.clickBox) {
            actor.clickBox.removeEventListener('mousedown', actor.clickBox.clickCallback)
            actor.clickBox.removeEventListener('mouseenter', actor.clickBox.mouseEnterCallback)
            if(actor.clickBox.hitPredict) actor.clickBox.hitPredict.innerHTML = ``
        }
    })

    actor.box.querySelectorAll('.actions .action, .actions .item-container').forEach(el=>el.remove())
    actor.box.querySelector('.actions').classList.remove('turnover')
    env.rpg.actorList.forEach(actor=> actor.box ? (actor.box.classList.remove('targetable', 'target-source', 'acting') && (!env.rpg.is2D || actor.box.classList.add('compactor'))) : false)

    //in 2D mode, we also end movement
    if(actor.piece) {
        env.rpg.turnData.acted = true
        actor.piece.endMovement()
    }
}

//enemy AI
function enemyTurn(enemy) {
    //determine target pools
    //enemy/ally is relative to the player's POV, i.e. "enemy" are enemy's allies
    var targetPools = {
        enemy_dead: env.rpg.enemyTeam.members.filter(actor => actor.state == "dead"),
        enemy_alive: env.rpg.enemyTeam.members.filter(actor => (actor.state != "dead") && (actor.slug != enemy.slug)),
        enemy_all: env.rpg.enemyTeam.members.filter(actor => (actor.slug != enemy.slug)),

        ally_alive: env.rpg.allyTeam.members.filter(actor => actor.state != "dead"),
        everyone_alive: env.rpg.allyTeam.members.concat(env.rpg.enemyTeam.members)
    }

    let priority = env.rpg.allyTeam.members.filter(actor=>actor.priorityTarget && actor.state != "dead")
    if(priority.length) {
        targetPools.ally_alive = priority
    }

    //if the enemy has a special per-turn check, execute it here
    var shouldBreak = false;
    if(enemy.turnCheck) { shouldBreak = env.COMBAT_TURNCHECKS[enemy.turnCheck](enemy, {targets: targetPools}) }
    if(shouldBreak) return;

    if(enemy.firmSkip) {
        setTimeout(()=>advanceTurn(enemy, {ignoreTime: true}), env.ADVANCE_RATE * 0.5)

        if(env.rpg.is2D) {
            enemy.highlight("piece")
        }

        return
    }

    //redirect to alternate system if needed
    if(env.rpg.is2D) return env.rpg.enemyTurn(enemy)

    //proceed with action selection
    //if the enemy has the 'windup' status, draw from windupActions instead
    let actionNamePool = enemy.actions
    enemy.statusEffects.forEach(status => {
        if(status.grantsActions) {
            actionNamePool = actionNamePool.concat(status.grantsActions)
        }
    })

    //windup overrides granted actions as an edge case thing but i don't think this ever happens anyway
    if(hasStatus(enemy, "windup") && enemy.windupActions) { actionNamePool = enemy.windupActions }
    else if(!enemy.windupActions) { removeStatus(enemy, "windup") }

    let actionPool = []
    actionNamePool.forEach(actionName => {
        let action = env.ACTIONS[actionName]
        let usable = true
        if(action.itemAction == "2D") return; // skip actions that are specifically for 2D combat

        //action-based disable checks
        if(action.enemyUsageIf) usable = action.enemyUsageIf(enemy) 
        if(usable && action.disableIf) usable = !action.disableIf(enemy)

        //avoidChaining filtering - some abilities shouldn't be used repeatedly
        if(enemy.lastUsed) 
            if(enemy.lastUsed.avoidChaining && (action.slug == enemy.lastUsed.slug))
                usable = false

        //last man standing support skill avoidance
        //basically, if they're the last guy trying to use an ally non-self buff, try to pick an attack or self-buff instead
        if(
            targetPools.enemy_alive.length == 0 &&
            (
                action.type.includes('support') && 
                !action.type.includes('self') &&
                !action.type.includes("rez")
            )
        ) usable = false

        //if it has a targetFilter and there's no actor in the env.rpg.turnOrder that fits the bill
        if(usable && action.targetFilter) {
            let filteredTargets = env.rpg.turnOrder.filter(actor => action.targetFilter(enemy, actor))
            if(!filteredTargets.length) usable = false
            else action.filteredTargets = filteredTargets // briefly store filtered targets on action. this sucks
        }
        
        if(usable) actionPool.push(action)
    })

    let action = actionPool.length ? actionPool.sample() : env.ACTIONS["nothing"]

    var target
    if(action.filteredTargets) {
        target = action.filteredTargets.sample()
        delete action.filteredTargets
    } else {
        if(action.type.includes('self')) {
            targetPools.enemy_alive.push(enemy)
            targetPools.everyone_alive.push(enemy)
        }

        if(action.type.includes('random')) {
            target = targetPools.everyone_alive.sample()
        } else if (action.type.includes('rez') && action.type.includes('support')) {
            target = targetPools.enemy_all.sample()
        } else if (action.type.includes('rez')) {
            target = targetPools.enemy_dead.sample()
        } else if (action.type.includes('support')) {
            target = targetPools.enemy_alive.sample()
        } else {
            target = targetPools.ally_alive.sample()
        }
    }

    var executionTime = (env.ADVANCE_RATE * 0.5)
    setTimeout(()=>{
        try {
            switch(action.type.includes('special')) {					
                case true:
                    useAction(enemy, action, target);
                    break;

                default: 
                    var hit = useAction(enemy, action, target);
                    setTimeout(()=>advanceTurn(enemy), (env.ADVANCE_RATE * 1.5) + (enemy?.advanceTimeModifier ? enemy.advanceTimeModifier : 0));

                    switch(hit) {
                        case null: case "nothing":
                            break;
                        case "crit":
                            reactDialogue(enemy, 'crit');
                            break;
                        case true:
                            reactDialogue(enemy, 'hit');
                            break;
                        case false:
                            reactDialogue(enemy, 'miss');
                            break;
                    }					
            }
        } catch(e) {printError(e); printError('proceeding to next turn', false); setTimeout(()=>advanceTurn(enemy), env.ADVANCE_RATE); }
        //actor.history.push(action)
    }, executionTime);
}

//endstate, checks who won and then displays it
function endCombat(loser) {
    if(!env.rpg || !env.rpg?.active) return; // rpg isn't even started yet bro
    if(env.rpg.halt) return false
    //if(env.rpg.classList.contains("crittamode")) env.toggleMouseThrottleLowSpeed(false)

    let effectiveLoser = loser || env.rpg.enemyTeam //default to enemy loss
    //clearInterval(env.rpg.bugoutInterval)

    //if manualStop is used, you have to manually call closeCombat()
    if(!env.rpg.settings.manualStop) {
        closeCombat(effectiveLoser)
    } else {
        env.rpg.halt = true
        if(env.rpg.settings.manualStopCallback) env.rpg.settings.manualStopCallback(effectiveLoser)
    }
}

//shortcut for the procedure of closing the combat window and reverting
function closeCombat(loser, hardClose) {
    if(!env.rpg || (!env.rpg?.active && !hardClose)) return;

    console.trace()
    console.log("called close with", loser, hardClose)
    env.rpg.active = false
    shiftDetailToggle(false, true)
    if(env.rpg.classList) env.rpg.classList.add('shutdown')
    clearActionsDisplay()

    //end-of-combat party handling
    if(loser.name == "enemy" && !page.party.noPreserveHealth) env.rpg.allyTeam.members.forEach(member => {
        //if the ally team has any regen stacks, we turn those into health
        let regen = member.statusEffects.find(status => status.slug == "regen")
        if(regen){
            member.hp += regen.duration
            if (member.hp > member.maxhp) member.hp = member.maxhp
            
            readoutAdd({
                message: `<div class="action-text">NOTE::'${member.name}';'remaining REGEN consumed for ${regen.duration}HP'</div>`, 
                name: "sourceless", 
                type: "sourceless combat", 
                show: true,
                forceMini: true,
                sfx: false
            })
        }

        //update party representative
        try {
            page.party.find(m=>m.slug == member.slug).hp = member.hp || 1; //if anyone's downed, they return to 1HP at end of combat
        } catch(e) { console.log('specified party member not found', e)}
    });

    setTimeout(()=>{
        body.classList.remove('cull-stage', 'in-grid-combat', 'in-combat', 'nomenus')
        content.classList.add('show-vn')

        //runs any custom callback, otherwise runs the default formation callback
        console.log(loser)
        if(env.rpg.settings.endCallback) env.rpg.settings.endCallback(loser); else env.COMBAT_FORMATIONS.default_callback(loser);

        //endcallback might cancel close
        console.log("trying to close,", env.rpg.cancelClose, hardClose)
        if(!env.rpg.cancelClose || hardClose) {
            console.log("in shutdown")
            env.rpg.active = false
            env.rpg.classList.add('over')
            if(env.rpg.settings.bgm) revertBgm(hardClose ? 0 : 1000)
            setTimeout(()=>{
                env.rpg.remove()
                env.rpg = false
            }, hardClose ? 0 : 1000)
        }
    }, hardClose ? 0 : env.ADVANCE_RATE)
}

////////////////// COMBAT MECHANICS ////////////////
//generic skill use, takes a string and executes the skill
function useAction(user, action, initialTarget, settings = {}) {
    settings.user = user
    settings.action = action
    settings.target = initialTarget
    settings.initialTarget = initialTarget
    settings.settings = settings // self referential to pass down
    env.rpg.lastAction = settings

    console.log(`${user?.slug} is trying to use ${action?.slug} on ${initialTarget?.slug}`, settings)

    //these can alter the user, action, target, or anything before use
    if(settings.triggerActionUseEvent !== false) {
        triggerStatusEvents({target: user, eventName: "onBeforeAction", context: settings })
        triggerStatusEvents({target: initialTarget, eventName: "onBeforeActedUpon", context: settings })
    }

    return useActionLogic(settings)
}

function useActionLogic({user, action, target, triggerActionUseEvent = true, beingUsedAsync = false, reason = false, force = false, noUseMessage, actionMessageIndex, sceneAnim, tileEffect, importantActionMessage, incitingStatus, redirectable = true, settings} = {}) {
    if(env.rpg.halt === true && !force) { return "none" } // don't execute if you aren't supposed to 
    let assumedMessageIndex = actionMessageIndex || env.rpg?.effectMessage?.current?.actions?.length

    //we want to stop actions that can't or shouldn't be repeated asynchronously
    if(beingUsedAsync && action.noRepeat && !force) { console.log(user, action, target, `cancelled due to action being noRepeat`); return "nothing" }

    //then we open a new receipt if needed
    if(!env.rpg.effectMessage.current && !noUseMessage) env.rpg.effectMessage.initialize() 

    //do base animation
    //if there's a sceneAnim, we actually don't do the regular anim, assuming it's being handled by the scene code
    //console.log("USEACTION CALL", action.anim, user.sprite, sceneAnim)
    if(action.anim && user.sprite && !sceneAnim) {
        //console.log("USEACTION CALL SUCCESS")
        user.sprite.classList.add(action.anim)
        setTimeout(function(){
            user.sprite.classList.remove(action.anim)
        }, action.animDuration ? (action.animDuration + 100) : 600)
    }

    //also handle any special frameClass similarly, but with a little more of a delay on removal
    if(action.frameClass) {
        env.rpg.classList.add(action.frameClass);
        setTimeout(function(){
            env.rpg.classList.remove(action.frameClass)
        }, action.animDuration ? (action.animDuration + 400) : 1000);
    }

    let hit = action.exec(user, target, beingUsedAsync, {actionMessageIndex: assumedMessageIndex, tileEffect, reason})
    if(!beingUsedAsync) user.lastHardUsed = action
    user.lastUsed = action

    //and track the result in the receipt if needed 
    if(typeof action.usage == "object" && !noUseMessage && action.usage) assumedMessageIndex = env.rpg.effectMessage.action({user, action, target: env.rpg.lastRedirector || target, hit, actionMessageIndex, reason, isMinor: beingUsedAsync ? true : false, showFullDetail: importantActionMessage, status: incitingStatus})

    //also events yay
    if(triggerActionUseEvent) {
        triggerStatusEvents({target: settings.user, eventName: "onAction", context: {settings, user, action, target: env.rpg.lastRedirector || target, hit, beingUsedAsync, reason, effectiveMessageIndex: assumedMessageIndex} })
        triggerStatusEvents({target: env.rpg.lastRedirector || target, eventName: "onActedUpon", context: {settings, user, action, target: env.rpg.lastRedirector || target, hit, beingUsedAsync, reason, effectiveMessageIndex: assumedMessageIndex} })
    }

    return {
        hit,
        i: assumedMessageIndex
    }
}

//combatHit deals damage or heals to the given actor, taking into account status effects and accuracy
//also adds a little animation to the target based on the type of ability
function combatHit(initialTarget, settings) { // wrapper for modifying logic via events - no assignment necessary

    //these events run regardless of runEvents - runEvents mainly references onHit, onStruck, etc.
    //just look at context.runEvents in an if if you need to
    settings.initialTarget = initialTarget
    triggerStatusEvents({target: initialTarget, eventName: "onBeforeCombatHit", context: settings })
    if(settings.origin) triggerStatusEvents({target: settings.origin, eventName: "onBeforeOutgoingCombatHit", context: settings })

    if(settings.cancel) return false // cancelled by an event
    return combatHitLogic(initialTarget, settings)
}

function calculateHit(origin, target, {amt = 0, acc = 1, crit = 0, forceCrit = false, autohit = false, type = 'hp'}) {
    //collect multipliers from statuses and stats
    var amtMod = 1 // dmg multiplier
    var accMod = 1 // acc multiplier
    var critMod = 1 // crit multiplier
    var flatAmtMod = 0
    var flatAccMod = 0
    var flatHealMod = 0
    var flatCritMod = 0
    var effectiveAmt = amt
    var effectiveCrit = crit
    var effectiveAcc = acc

    if(!target.effectiveStats) updateStats({actor: target})
    amtMod += target.effectiveStats.incomingMult || 0
    accMod += target.effectiveStats.incomingToHit || 0
    critMod += target.effectiveStats.incomingCrit || 0
    flatAmtMod += target.effectiveStats.incomingFlat || 0
    flatCritMod += target.effectiveStats.incomingFlatCrit || 0
    flatAccMod += target.effectiveStats.incomingFlatToHit || 0
    flatHealMod += target.effectiveStats.incomingFlatHeal || 0

    if(origin) {
        if(!origin.effectiveStats) updateStats({actor: origin})
        amtMod += origin.effectiveStats.outgoingMult || 0
        accMod += origin.effectiveStats.outgoingToHit || 0
        critMod += origin.effectiveStats.outgoingCrit || 0
        flatAmtMod += origin.effectiveStats.outgoingFlat || 0
        flatCritMod += origin.effectiveStats.outgoingFlatCrit || 0
        flatAccMod += origin.effectiveStats.outgoingFlatToHit || 0
        flatHealMod += origin.effectiveStats.outgoingFlatHeal || 0
    }

    //flat mods applied before any multipliers
    if(flatAccMod != 0) effectiveAcc += flatAccMod
    if(flatCritMod != 0) effectiveCrit += flatCritMod
    if(flatAmtMod != 0 && amt > 0 && type != "barrier") { // flat amts only block out attacks
        effectiveAmt += flatAmtMod
        effectiveAmt = Math.max(0, effectiveAmt)
    }
    if(flatHealMod != 0 && amt < 0 && type != "barrier") { // flat heals only help out heals
        effectiveAmt += flatHealMod * -1 // so we can write statuses as having -2 to heal distinct from -2 meaning a 2HP heal
        effectiveAmt = Math.min(0, effectiveAmt) // and they can't go below 0
    }

    // determine totals - amount mod can't go under 0, acc/crit need to be between 0 and 1 (crit capped at 95%)
    amtMod = Math.max(amtMod, 0)
    totalAcc = autohit ? 1 : Math.clamp(Math.round(accMod * effectiveAcc * 100) / 100, 0, 1)
    totalCrit = Math.clamp(Math.round(critMod * effectiveCrit * 100) / 100, 0, 0.95)
    totalAmt = (effectiveAmt * amtMod)

    if(forceCrit) totalCrit = 1

    //console.log("combathitcalc", {amt, acc, crit, effectiveAmt, effectiveAcc, effectiveCrit, amtMod, accMod, critMod, flatAmtMod, flatAccMod, flatCritMod}, {totalAmt, totalAcc, totalCrit})

    return {
        amt: totalAmt,
        acc: totalAcc,
        crit: totalCrit,
        amtMod: amtMod,
        flatAmt: flatAmtMod
    }
}

function getRedirectedTarget(initialTarget) {
    if(!initialTarget) throw "combatHit error - must have target"

    let target = initialTarget
    env.rpg.lastRedirector = false

    //determine if attack should go elsewhere
    let redirectionStatus = false
    target.statusEffects.forEach(status => { if(status.redirectToOrigin && status.origin != target.name) redirectionStatus = status })

    if(redirectionStatus) target = redirectionStatus.origin
    return target
}

//actual logic
function combatHitLogic(initialTarget, {
    amt = 0, 
    acc = 1, 
    crit = 0, 
    origin = false, 
    autohit = false, 
    type = 'hp', 
    runEvents = true, 
    redirectable = true, 
    beneficial = false, 
    noKill = false, 
    ignoreMods = false, 
    dontDrawEffectLine = false, 
    forceCrit = false,
    preHitExec = false
}) {
    if(!initialTarget) throw "combatHit error - must have target"
    console.log("entering combathit with", initialTarget.name, amt, acc, crit, origin ? origin.name : 'no origin', redirectable, beneficial, noKill, ignoreMods)
    target = initialTarget
    env.rpg.lastRedirector = false

    if(redirectable && !beneficial) target = getRedirectedTarget(initialTarget)
    if(redirectable && (target != initialTarget)) {
        triggerStatusEvents({target: initialTarget, eventName: "onRedirect", context: {initialTarget, origin, redirectedTarget: target} })
        env.rpg.lastRedirector = target
    }

    //normally i'd put this in singleTarget() but sometimes redirection won't be at the action level
    if(typeof preHitExec == "function") preHitExec({origin, target, initialTarget})

    //console.log(`COMBAT HIT: ${target.slug}, ${amt}, ${acc}, ${crit}`, target, origin);
    let totalAmt, totalAcc, totalCrit, originalHP, originalBP
    originalHP = initialTarget.hp
    originalBP = initialTarget.bp

    if(ignoreMods) {
        totalAmt = amt
        totalCrit = crit
        totalAcc = acc
    } else {
        let calculated = calculateHit(origin, target, {amt, acc, crit, autohit, type, forceCrit})
        totalAmt = calculated.amt
        totalAcc = calculated.acc
        totalCrit = calculated.crit
    }

    //console.log(`hit totals are: ACC: ${totalAcc}, CRIT: ${totalCrit}, AMT: ${totalAmt} with a ${critMod} crit modifier`)

    //determine total damage, then deal damage + crit if necessary
    var hit = false
    var finalAmt = 0
    if(Math.random() < totalAcc) {
        finalAmt += totalAmt;
        hit = true;

        if(Math.random() < totalCrit && type != "barrier") {
            finalAmt += totalAmt;
            hit = "crit";
        }

        //setup for effectMessage if needed
        env.rpg.effectMessage.affect({target, initializeOnly: true})
    }

    //round to whole number, rounding up if positive, or down if negative
    if(finalAmt > 0) finalAmt = Math.ceil(finalAmt)
    else if(finalAmt < 0) finalAmt = Math.floor(finalAmt)

    //apply changes, determine reaction animation type
    var damageClass = "untyped"
    switch(type) {
        case "hp":
            //deal BP damage before HP damage, heals go through though
            if(target.bp && finalAmt > 0) {
                //console.log('subtracting barrier', finalAmt, target.bp)
                target.bp -= finalAmt

                //if damage exceeds barrier, go through to HP
                if(target.bp < 0) {
                    //console.log('removing additional HP', target.bp * -1)
                    target.hp -= target.bp * -1
                }
            } else {
                //console.log('subtracting finalAmt', finalAmt)
                target.hp -= finalAmt
                
                //some abilities (esp. self inflicted) cannot kill
                if(target.hp <= 0 && noKill) {
                    target.hp = 1
                }
            }

            if(hit && amt > 0) damageClass = "struck" //hit with attack that was, at least originally, damaging
            else if(amt > 0) damageClass = "evade" 
            else if(hit && amt == 0) damageClass = "status"
            else if(hit && amt < 0) damageClass = "buff"
        break

        case "barrier":
            if(target.hp > 0) target.bp += finalAmt
            if(finalAmt > 0) damageClass = "buff";
            else damageClass = "struck"
        break
    }

    //one-hit protection - if the target is at max health, and being hit with something >= maxHP, health is instead 1
    if(type == "hp" && (target.hp == target.maxhp) && target.hp <= 0) {
        target.hp = 1

        
        setTimeout(()=>env.rpg.effectMessage.action({
            user: target,
            target: target,
            reason: "attention",
            action: `'%TARGET';'one-hit protection activated'`
        }))
    }

    //if damage reduction mitigated an attack completely, alert the player
    //if it's a direct attack (run events), the finalAmt is 0 but initial is greater than 0, it's a total block
    //console.log('should show mitigation?', runEvents, finalAmt == 0, amt > 0, damageClass)

    /* this is a little verbose and unneeded rn
    if(runEvents && (finalAmt == 0) && (amt > 0) && damageClass == "struck") {
        
        setTimeout(()=>env.rpg.effectMessage.action({
            user: target,
            target: target,
            reason: "attention",
            action: `'%TARGET';'complete damage mitigation'`,
            isMinor: true
        }))
    }
    */
    
    //briefly applies the animations
    let actorElements = [];
    if(target.box) actorElements.push(target.box)
    if(target.sprite) actorElements.push(target.sprite)
        
    if(env.rpg.is2D && damageClass == "struck") { env.rpg.refresh() }
    actorElements.forEach(el=>el.classList.add(damageClass))
    setTimeout(()=>actorElements.forEach(el=>el.classList.remove(damageClass)), 250)

    if(isNaN(target.hp)) {
        target.hp = 0
        printError(`combat set HP to NaN on ${target.name}, due to ${origin ? origin.name : "no origin combatHit"}. setting to 0 instead`, true)
        console.log(`${target.name} hit NaN error right here`)
    }

    //if it was a heal, make sure they don't overheal
    if(target.hp > target.maxhp) target.hp = target.maxhp

    //also limit bp
    if(target.bp > (target.maxhp * 0.5)) target.bp = Math.floor(target.maxhp * 0.5)
    if(target.bp < 0) target.bp = 0

    //handle on X events
    //due to the timeout, these are often reassigned
    let trackedTarget = target 
    let trackedOrigin = origin
    let hitContext = { subject: trackedTarget, origin: trackedOrigin, attack: finalAmt, runEvents, beneficial, initialAmt: amt, damageClass }
    let struckContext = { subject: trackedOrigin, target: trackedTarget, attack: finalAmt, runEvents, beneficial, initialAmt: amt, damageClass }

    if(runEvents) {
        setTimeout(()=>{
            switch(damageClass) {
                case "struck":
                    if(trackedOrigin) {
                        triggerStatusEvents({target: trackedOrigin, eventName: "onHit", context: hitContext })
                        triggerStatusEvents({target: trackedTarget, eventName: "onStruck", context: struckContext })

                        if(hit == "crit") {
                            triggerStatusEvents({target: trackedOrigin, eventName: "onCrit", context: hitContext })
                            triggerStatusEvents({target: trackedTarget, eventName: "onCritStruck", context: struckContext })
                        }
                    }
                break

                case "evade":
                    if(trackedOrigin) triggerStatusEvents({target: trackedOrigin, eventName: "onMiss", context: hitContext })
                    triggerStatusEvents({target: trackedTarget, eventName: "onEvade", context: struckContext })
                break

                case "buff": // "buff" is a sort of misnomer, but we're using damage classes here
                    // this is any heal or BP application
                    if(trackedOrigin) triggerStatusEvents({target: trackedOrigin, eventName: "onBuff", context: hitContext })
                    triggerStatusEvents({target: trackedTarget, eventName: "onBuffed", context: struckContext })
                break
            }
        }, 100)
    }

    //this event is ran any time anything has a chance to change HP, regardless of runEvents
    //but runEvents is passed, so if something should only happen on the first hit of something, you can look at that
    triggerStatusEvents({target, eventName: "onCombatHit", context: hitContext})

    if(hit && amt && ((!origin || !origin?.box) || env.rpg.is2D)) { // we only send these if there's no origin (i.e. from status), or if it's a grid plane
        let size = 1
        if(amt > 10) size = 1.5;
        if(amt > 100) size = 2;
        if(amt > 1000) size = 4;

        sendFloater({
            target,
            type: "hit",
            amt: finalAmt,
            size,
            hit,
            damageType: type
        })

        env.rpg.effectMessage.affect({target})
    }

    //return whether it was a hit, miss, or crit and update
    updateStats({actor: target})
    if(origin.box && target.box && amt != 0 && !dontDrawEffectLine && !env.rpg.is2D) {
        let color = "bright"
        if(hit == "crit") color = "neutral"
        else if(beneficial) color = "friend"
        else if(hit) color = "obesk"

        let amt = hit == false ? "MISS" : Math.abs(finalAmt)
        if(amt == 0 || (amt != 0 && hit == "miss")) amt = false; // no floater for true 0 damage/status-only hits and misses
        else if(finalAmt == 0) { color = "bright"; amt = "0" }
    
        //try not to lie about how much BP the target actually received
        if(type == "barrier") amt = Math.min(amt, Math.floor(target.maxhp * 0.5) - originalBP)

        let effectClass = `baseline combat-hit`

        // identical to floater classes because we use the same styling
        effectClass += ` result-${hit == false ? "miss" : hit == "crit" ? "crit" : "true"}`
        effectClass += ` type-${type}`
        effectClass += ` amt-${finalAmt == 0 ? "blocked" : (finalAmt > 0 ? "positive" : "negative")}`

        // the count is used as an offset so each hit is fairly readable
        if(!env.rpg.turnData[`${origin.slug}-${target.slug}-lines`]) env.rpg.turnData[`${origin.slug}-${target.slug}-lines`] = 0;
        env.rpg.turnData[`${origin.slug}-${target.slug}-lines`]++
        let lineCount = env.rpg.turnData[`${origin.slug}-${target.slug}-lines`]
        let variation = Math.random() * (lineCount * 10) - (lineCount * 5)

        drawEffectLine(origin, target, { 
            duration: 4000,
            color,
            angleDriftAmount: 15,
            effectClass: `baseline combat-hit ${effectClass}`,
            amt,
            style: `--count: ${lineCount - 1}; --variation: ${variation}px`
        })
    }

    if(target?.piece) target.piece.flashStatPlate()   

    return hit;
}

//un-dead's a target visually
function combatRevive(target, {location = "currentActor", force = false, noReplace = false} = {}) {
    if(!target) {
        console.warn('combatrevive tried to revive a nonexistent target - as in the object is undefined or something', target)
        console.trace()
        return
    }

    if(target?.state == "living" || (target?.state == "lastStand" && !force)) {
        console.log("combatrevive returning because", target.state, force)
        return;
    }

    if(target.state == "lastStand" && force) {
        if(target.box) target.box.classList.remove("last-stand")
    }

    target.state = "living"
    if(target.box) target.box.classList.remove('dead')
    if(target.sprite) target.sprite.classList.remove('dead')
    if(target.hp == 0) target.hp = 1
    console.log("combatrevive updating with data", target.state, target.hp)

    updateStats({actor: target})
    if(env.rpg.is2D && !noReplace) env.rpg.grid.replaceActorPiece({target, location});
}

//applies status effect to the given actor, taking into account...
//* already existing same status effects (adds to duration)
//* if status has a 'removes' array, (i.e. evasion removes vulnerable) removes all statuses of that type
function addStatus(settings) { // wrapper for modifying logic via events - no assignment necessary
    if(!settings.length) settings.length = 1 // sanity default
    if(settings.runEvents !== false) {
        triggerStatusEvents({target: settings.target, eventName: "onBeforeAddStatus", context: settings })
        if(settings.origin) triggerStatusEvents({target: settings.origin, eventName: "onBeforeInflictStatus", context: settings }) // special version for the origin
    }
    
    if(settings.noAdd) return false
    return addStatusLogic(settings)
}

//actual logic
function addStatusLogic({
    target, //actor being given the status
    origin, //actor that applied the status
    status: statusName, //status name as string
    length = 1, //number of rounds to apply
    noUpdate, // don't update stats after adding (used by startCombat as actors with starting statuses are initialized)
    noReact, //don't have the user react to the application
    noFloater,
    runEvents = true,
    makeInfinite,
    forceAdd, //bypass the death limit
    dontDrawIconLine = false, //draws an effect line from origin to target when status is applied by default
    iconLineClasses = "",
    dry, // whether this is part of an abstract actor object outside of an actual round or not
    makeUnique, // whether this status is allowed to stack length with others of its slug, or if it's treated as a separate entity (i.e. multiple separate vulnerables. don't do this but that's an example)
    makeSilent,
    data
}) {
    if(!target) {
        printError(`tried to add status ${statusName} to non-existent target (from ${origin?.name || "unknown origin"})`)
        return false
    }

    if(
        (!forceAdd && (target.state == "dead" || (target.hp == 0 && target.state != "lastStand"))) || 
        (!dry && !env?.rpg?.active)
    ) return; // can't add statuses to the dead or if combat isn't active

    if(!env.STATUS_EFFECTS[statusName]) {
        chatter({actor: 'actual_site_error', text: `you're trying to add a status that doesn't exist to ${target.name}!\n(${statusName})`, readout: true})
        console.warn("tried to add status right here")
        console.trace()
        return false
    }

    console.log(`APPLYING ${statusName}`);
    let statusObj = {... env.STATUS_EFFECTS[statusName]}
    statusObj.turnCreated = env?.rpg?.turnData?.turn || 0
    if(data) statusObj.data = data
    let effectiveStatusName = statusName
    let statusId = env.rpg.entCount++
    let extendingExistingStatus = false
    if(makeInfinite) statusObj.infinite = true

    //first check for immunity. used to be a messy try catch and relies on something that might not exist (statusImmunities) so this is a stopgap until the rework
    let isImmune = false
    if(target.statusImmunities) if(target.statusImmunities.includes(statusName)) isImmune = true // old way of doing it
    if(target.immunities) if(target.immunities[statusName]) isImmune = true // new way of doing it

    if(isImmune && !dry) {
        //console.log(`    ${target.slug} IMMUNE TO ${statusName}`);
        //console.log(`    SUBBING ${statusObj.substitute}`)
        setTimeout(()=>{
            env.rpg.effectMessage.action({
                user: origin,
                target: target,
                reason: "attention",
                action: `'%TARGET';'${statusName} immunity'${statusObj.substitute ? `;'substituting ${statusObj.substitute}'` : ""}`
            })
        }, 20)

        if(!statusObj.substitute) return; else {
            effectiveStatusName = statusObj.substitute
            statusObj = {... env.STATUS_EFFECTS[effectiveStatusName]}
        }
    }

    let totalLength = length
    if(target.effectiveStats?.incomingStatusFlat) totalLength += target.effectiveStats.incomingStatusFlat
    if(origin?.effectiveStats?.outgoingStatusFlat) totalLength += origin.effectiveStats.outgoingStatusFlat
    totalLength = Math.max(1, totalLength) // you can't nullify a status this way   

    //setup for effectMessage if needed
    if(!dry) env.rpg.effectMessage.affect({target, initializeOnly: true})

    try { 
        let existing = target.statusEffects.findIndex(existingStatus => existingStatus.slug == effectiveStatusName);
        //console.log(`    EXISTING INDEX: ${existing}`);

        if(existing >= 0 && !makeUnique) {
            //console.log(`    ADDING ${length} TO EXISTING ${effectiveStatusName}`);
            target.statusEffects[existing].duration += totalLength;
            if(target.statusEffects[existing].max && target.statusEffects[existing].duration > target.statusEffects[existing].max) target.statusEffects[existing].duration = target.statusEffects[existing].max
            if(origin) target.statusEffects[existing].origin = origin
            extendingExistingStatus = true
            statusObj = target.statusEffects[existing]
            //console.log(target.statusEffects);

        } else {
            //console.log(`    CREATING NEW ${effectiveStatusName} FOR ${length} TURNS`);
            statusObj.id = statusId
            statusObj.duration = totalLength
            statusObj.origin = origin || target // default to assuming target self-applied
            statusObj.affecting = target

            if(statusObj.max && statusObj.duration > statusObj.max) statusObj.duration = statusObj.max

            //to avoid ticking on own turn (thanks @brightcousinkuvi) (nvm i changed it again) (but brightcousinkuvi will remain in this space) (yay)
            // ING TODO - THIS IS CAUSING STUN TO LAST LONGER THAN IT SHOULD
            statusObj.justCreated = env.rpg.currentActor == target
            
            //also prevents redirection scam-like incidents where a turn of redirection is wasted on an ally phase
            if(!statusObj.justCreated && statusObj.delayFirstTickForActorsOnTheRight && !dry) {
                if(
                    env.rpg.turnOrder.findIndex((m)=> m == statusObj.origin) <
                    env.rpg.turnOrder.findIndex((m)=> m == statusObj.affecting)
                ) statusObj.justCreated = true
            }

            target.statusEffects.push(statusObj);
        }
        
        //if the target doesn't have the status effect already, add it to the background
        let targetEl = target.box
        if(targetEl) {
            targetEl.classList.add(`status-${statusObj.slug}`)

            if(!statusObj.silent && !makeSilent){
                //all statuses get visual effect
                if(!targetEl.querySelector(`.statusbg .statusfx-${statusObj.slug}`)) {
                    targetEl.querySelector(`.statusbg`).insertAdjacentHTML('beforeend', `<div class="statusfx statusfx-${statusObj.slug} ${statusObj.styleClass ? statusObj.styleClass : ''}"></div>`)
                }

                //passives have their own display
                if(statusObj.passive && !targetEl.querySelector(`.passives .passive-${statusObj.slug}`)) {
                    let passivesContainer = targetEl.querySelector('.passives')
                    let el = document.createElement('span')
                    el.classList.add('status-effect', `passive-${statusObj.slug}`, statusObj.beneficial ? statusObj.beneficial === true ? 'good' : statusObj.beneficial : 'bad')
                    if(statusObj.passiveClass) el.classList.add(`passivetype-${statusObj.passiveClass}`)
                    el.style.setProperty('--img', `url(${statusObj.icon || '/img/placeholdportrait.gif'})`)
                    el.setAttribute('definition', `STATUS++${statusObj.slug}`)
                    el.statusObj = statusObj
                    statusObj.passiveIconElement = el
                    passivesContainer.appendChild(el); 
                }   
            } else if(makeSilent) statusObj.silent = true
        } else if(!dry) {
            console.warn(`${target.slug}'s actor box was unable to be found (probably due to ethereal). this might be unintended if it isn't a neutral actor`)
        }

        if(!dry) {
            let visuals = []
            if(target.sprite) visuals.push(target.sprite)
            if(target.box && target.box.querySelector('.portrait')) visuals.push(target.box.querySelector('.portrait'))

            visuals.forEach(el=>el.classList.add(`spritestatus-${statusObj.slug}`))
            setTimeout(()=>{
                if(
                    target.sprite?.statusPainter && 
                    statusObj.paintable &&
                    !extendingExistingStatus &&
                    hasStatus(target, statusObj.slug) // in case it gets immediately removed, i.e. repairs with no BP or something weird
                ) { target.sprite.statusPainter.insertAdjacentHTML('beforeend', `<div class="statuspaint painter-${statusObj.slug}"></div>`) }
            }, 100)
        }

        //remove any conflicting statuses 
        if(statusObj.removes) statusObj.removes.forEach(counterStatusName =>{
            removeStatus(target, counterStatusName)
        })

        if(!dry) { // final wrapups - setting up and triggering events, etc
            if(runEvents ) {
                triggerStatusEvents({target, eventName: "onAddStatus", context: {target, statusObj, totalLength, extendingExistingStatus, data} });
                if(origin) triggerStatusEvents({target: origin, eventName: "onInflictStatus", context: {target, statusObj, totalLength, data} }); // special version for the origin
            }
            
            if(!noReact) reactDialogue(target, `receive_${statusName}`);
            if(!noUpdate) {
                updateStats({actor: target})

                if(!noFloater) sendFloater({ 
                    target,
                    type: "status",
                    amt: length,
                    status: statusObj
                })
            }
        }

        //track any new status events
        if(typeof statusObj.events != "undefined") {
            //re-assign the functions so they get the right 'this'
            let statusEvents = {... env.STATUS_EFFECTS[effectiveStatusName].events}
            statusObj.events = statusEvents

            for (const onEventName in statusObj.events) {
                if(dry && onEventName != "onCreated") continue; // this should allow for correct stat setup without causing other issues i think
                const onEventFunc = statusObj.events[onEventName]

                // global event listening is tracked a little differently for performance
                let eventPool
                if(onEventName.includes("GLOBAL")) {
                    if(typeof env.rpg.globalListeners[onEventName] == "undefined") env.rpg.globalListeners[onEventName] = []
                    eventPool = env.rpg.globalListeners
                } else {
                    if(typeof target.events[onEventName] == "undefined") target.events[onEventName] = []
                    eventPool = target.events
                }

                //only add a new event if the status doesn't already exist
                if(!extendingExistingStatus) {
                    eventPool[onEventName].push({id: statusId, exec: onEventFunc, status: statusObj})

                    //also upgrade the statusObject to refer to itself in its events container
                    statusObj.events.status = statusObj
                }
            }
        }

        if(existing < 0 || makeUnique) {
            console.log('not existing, so passing', statusObj, 'for', target)
            
            if(makeUnique) {
                env.rpg.dupeNames = env.rpg.dupeNames ? env.rpg.dupeNames++ : 1
                const symbolOffset = env.rpg.dupeNames <= 12 ? env.rpg.dupeNames : env.rpg.dupeNames + 56 // this skip is to get around emoji-like chars
                statusObj.name = statusObj.name + ` ${String.fromCharCode(9787 + symbolOffset)}`
            }

            triggerStatusEvents({target, eventName: "onCreated", context: {target, statusObj}, allowDryExecution: true })
        }

        statusObj.base = env.STATUS_EFFECTS[statusName]
    } catch (e) { printError(`problem in applying ${statusName} to ${target.name} (${target.slug}): ${e}`)}

    let effectiveOrigin = origin || target
    if(effectiveOrigin?.box && target?.box && !dontDrawIconLine && !noUpdate && !dry && !env.rpg.is2D) { // we don't send these in combatGrid
        let color = "bright"
        if(statusObj.beneficial) color = "friend"
        else color = "obesk"

        let selfOrigin = origin == target || !origin
        let effectClass = `baseline icon${iconLineClasses ? ` ${iconLineClasses}` : `` }`
        if(selfOrigin) effectClass += ` selforigin${target.team.name == "enemy" ? " enemyflip" : ""}`  
        
        let lineCount = 1
        let variation = 0
        if(origin) {
            if(!env.rpg.turnData[`${origin.slug}-${target.slug}-statuslines`]) env.rpg.turnData[`${origin.slug}-${target.slug}-statuslines`] = 0;
            env.rpg.turnData[`${origin.slug}-${target.slug}-statuslines`]++
            lineCount = env.rpg.turnData[`${origin.slug}-${target.slug}-statuslines`]
            variation = Math.random() * (lineCount * 10) - (lineCount * 5)
        }

        drawEffectLine(effectiveOrigin, target, {
            color,
            effectClass,
            selfOrigin,
            angleDriftAmount: selfOrigin ?
                 target.team.name == "ally" ? 180 : -180
                 : 15,
            duration: !env.rpg.is2D ? 
                (selfOrigin ? 3000 : false) :
                (selfOrigin ? 3000 : 1000 ),
            style: `
                --icon: url(${statusObj.icon || `/img/sprites/combat/statuses/${statusObj.slug}.gif`});
                --count: ${lineCount - 1}; 
                --variation: ${variation}px
            `
        })
    }

    if(statusObj.skipTurn || statusObj.hardSkip) advanceTurn(target)

    if(!dry) env.rpg.effectMessage.affect({target})
    if(target?.piece) target.piece.flashStatPlate()   
    return statusObj
}

function removeStatus(target, removingStatusName, {runEvents = true, forceRemoveStatus = false, from, noUpdate = false, noFloater = false} = {}) {
    //setup for effectMessage if needed
    if(from != "expire") env.rpg.effectMessage.affect({target, initializeOnly: true})
    let statusObj

    let removed = false
    target.statusEffects.forEach((status, i) => {
        if(status.slug == removingStatusName && (!status.passive || forceRemoveStatus || status.passive == "removable")) {
            statusObj = status
            removed = true
            target.statusEffects.splice(i, 1);

            if(target.box) { 
                target.box.classList.remove(`status-${status.slug}`)
                target.box.querySelectorAll(`.statusfx-${status.slug}, .passive-${status.slug}`).forEach(el=>el.remove())
                target.box.querySelectorAll(".portrait").forEach(el=>el.classList.remove(`spritestatus-${status.slug}`))
            }

            if(target.sprite) { target.sprite.classList.remove(`spritestatus-${status.slug}`) }
            if(target.sprite?.statusPainter) { target.sprite.statusPainter.querySelectorAll(`.painter-${status.slug}`).forEach(el => el.remove()) }

            //clear status events
            //console.log("checking events for", target.slug)
            if(runEvents) triggerStatusEvents({target, eventName: "onRemoveStatus", context: {target, removingStatusName} });
            if(target.events) {
                //console.log(target.slug, "has events")
                for (const eventType in status.events) {
                    if(eventType == "status") continue;
                    
                    if(target.events[eventType]) {
                        target.events[eventType] = target.events[eventType].filter(listener => listener.id != status.id)
                        if(target.events[eventType].length == 0) delete target.events[eventType]
                    }
                    if(env.rpg.globalListeners[eventType]) {
                        env.rpg.globalListeners[eventType] = env.rpg.globalListeners[eventType].filter(listener => listener.id != status.id)
                        if(env.rpg.globalListeners[eventType].length == 0) delete env.rpg.globalListeners[eventType]
                    }
                }
            }
            
            if(from != "expire") env.rpg.effectMessage.affect({target})

            if(!noUpdate) {
                updateStats({actor: target})
                
                if(from != "death" && !noFloater && !statusObj.silent) sendFloater({
                    target,
                    type: "status",
                    amt: -1,
                    status: statusObj
                })

            } 
        }
    })

    return removed
}

function hasStatus(target, checkStatusName) {
    if(!target) return null
    if(!env.STATUS_EFFECTS[checkStatusName]) {
        chatter({actor: 'actual_site_error', text: `you're checking for a status that doesn't exist!\n(${checkStatusName})`, readout: true})
        return 0
    }
    
    var hasDuration = 0;
    let status = target.statusEffects.find(status => status.slug == checkStatusName)
    if(status) {
        hasDuration = status.duration
    }

    return hasDuration
}

//like hasStatus, but returns the status instead of the duration.
//honestly not sure why I set up hasStatus like that but for now these are two separate functions
function getStatus(target, checkStatusName) {
    if(!env.STATUS_EFFECTS[checkStatusName]) {
        chatter({actor: 'actual_site_error', text: `you're checking for a status that doesn't exist!\n(${checkStatusName})`, readout: true})
        return 0
    }
    
    var hasStatus = false
    target.statusEffects.forEach((status) => {
        if(status.slug == checkStatusName) {
            hasStatus = status
        }
    })

    return hasStatus
}

//turns an actor's statuses into their opposite effect, if applicable
//can provide an extra condition function if desired - condition(statusObj), return whether or not to invert
function invertStatuses(target, condition = false) {
    
    // get list of all statuses and their opposites
    let changeTally = {}
    target.statusEffects.forEach(statusObj => {
        if(statusObj.opposite) {
            let proceed = typeof condition == "function" ? condition(statusObj) : true;

            if(proceed) {
                let thisStatusTally = changeTally[statusObj.slug]
                let oppositeStatusTally = changeTally[statusObj.opposite]
                changeTally[statusObj.opposite] = oppositeStatusTally ? oppositeStatusTally + statusObj.duration : statusObj.duration
                changeTally[statusObj.slug] = thisStatusTally ? thisStatusTally -= statusObj.duration : statusObj.duration * -1
            }
        }
    })

    console.log('inversion tally is', changeTally)

    let adds = []
    let removes = []
    for (const statusName in changeTally) {
        if(changeTally[statusName] > 0) adds.push({statusName, duration: changeTally[statusName]});
        else removes.push({statusName, duration: changeTally[statusName]});
    }

    for (const statusInfo of removes) {
        removeStatus(target, statusInfo.statusName, {runEvents: false})
    }

    for(const statusInfo of adds) {
        addStatus({target, status: statusInfo.statusName, length: statusInfo.duration, noReact: true, runEvents: false})
    }
}

/* runs through possible status events for a target's status list */
// also returns context in case it needs to be used
function triggerStatusEvents({target, eventName, context, allowDryExecution}) {
    if(!target && !env?.rpg?.is2D) {
        console.log('EVENT ERROR - ', target, eventName, context)
        throw `an event (${eventName}) just tried to happen without a target. context in console`
    } else if(!target && env.rpg.is2D) return context || {}; // bypass target failure in 2D since this is actually fine usually

    let effectiveContext = typeof context == "object" ? context : {}
    //console.log(!env.rpg.active, !allowDryExecution)
    if(!env.rpg.active && !allowDryExecution) return effectiveContext;

    //console.log(`triggering ${eventName} for ${target.name} with context`, context)
    if(target.events) try {
        //console.log("checking events for", target.slug, eventName, target.events[eventName])
        target.events[eventName]?.forEach(event =>{
            //console.log('triggering event for', target, eventName, event)
            //console.log("executing event", eventName, effectiveContext)
            event.exec(effectiveContext)
        })
    } catch(e) {
        printError(e)
    }

    //as of EP3ADD2 this is expanded to include all events - used to just be onCrit - this probably won't cause many issues
    if(env.rpg.active) {
        effectiveContext.originalEventTarget = target
        triggerGlobalStatusEvents({eventName: `GLOBAL_${eventName}`, context: effectiveContext})
    }

    // changes may be made to the context by events in certain cases, so we bring that back
    return effectiveContext
}

/* runs through all actors for global statuses */
/* probably don't call this one too much... */
function triggerGlobalStatusEvents({eventName, context}) {
    try {
        env.rpg.globalListeners[eventName]?.forEach(event =>{
            //console.log('executing global listener', eventName, context)
            event.exec(context)
        })
    } catch(e) {
        printError(e)
    }
}

function createStatusElement(status) {
    const el = document.createElement('span')
    el.classList.add(
        'status-effect',
        `statustext-${status.slug}`,
        `ticktype-${status.tickType}`,
        `status-${status.beneficial ? status.beneficial == "complex" ? 'complex' : 'good' : 'bad'}`
    )

    if(status.subEffect) el.classList.add('status-subeffect')

    el.setAttribute('definition', `STATUS++${status.slug}`)
    el.style.setProperty('--img', `url(${status.icon || `/img/sprites/combat/statuses/${status.slug}.gif`})`)
    el.statusObj = status

    const nameEl = document.createElement('span')
    nameEl.classList.add('status-name')
    nameEl.textContent = status.name
    el.appendChild(nameEl)

    if(!status.infinite) {
        const countEl = document.createElement('span')
        countEl.classList.add('status-count')
        countEl.textContent = status.duration
        el.appendChild(countEl)
    }

    return el
}

//updates actor stat displays, sets them to dead if they're dead
function updateStatsProcess(actor) {
    let actorEl = actor.box
    let actorWrapperEl = actor.sprite

    triggerStatusEvents({target: actor, eventName: "onBeforeUpdateStats", context: {actor} })

    if(isNaN(actor.hp)) { 
        printError(`${actor.name}'s HP is presently NaN which means something really fucked just happened`, true) 
        actor.hp = 0
    }

    actor.hp = Math.floor(actor.hp)
    
    if(actor.hp < 0 || actor.state == "dead") { actor.hp = 0 }
    if(actor.hp == 0 && actor.state != "lastStand") {
        if(actor.hp == 0 && actor.state != 'dead' && !actor.lastStand) { //enemy is dead
            actor.hp = 0
            actor.bp = 0
            actor.state = "dead"
            reactDialogue(actor, 'dead')

            if(actorEl) actorEl.classList.add('dead')
            if(actorWrapperEl) {
                actorWrapperEl.classList.add('predead')
                setTimeout(()=>{actorWrapperEl.classList.add('dead')}, 300); // so the shrink happens after the strike animation
            }

            triggerStatusEvents({target: actor, eventName: "onDeath"}) 
            
        } else if(actor.hp == 0 && actor.state != 'dead' && actor.lastStand) { //enemy has a last stand state
            actor.hp = 0
            actor.bp = 0
            actor.state = "lastStand"
            if(actorWrapperEl) actorWrapperEl.classList.add('last-stand')
            if(actorEl) actorEl.classList.add('last-stand')

            triggerStatusEvents({target: actor, eventName: "onLastStand"}) 
        }

        let removingStatuses = []
        actor.statusEffects.forEach(status=>{ if(status.passive || status.persist) return; removingStatuses.push(status) })
        removingStatuses.forEach(status=>removeStatus(actor, status.slug, {from: "death"}))
        actor.lastDownedStatuses = removingStatuses // for reference
    }

    //generate current stats for hit calculations
    let hardSkip = false
    let firmSkip = false
    let untargetable = false
    actor.effectiveStats = {
        outgoingMult: actor?.stats?.outgoingMult || 0,
        outgoingToHit: actor?.stats?.outgoingToHit || 0,
        outgoingFlatToHit: actor?.stats?.outgoingFlatToHit || 0,
        outgoingFlat: actor?.stats?.outgoingFlat || 0,
        outgoingCrit: actor?.stats?.outgoingCrit || 0,
        outgoingFlatCrit: actor?.stats?.outgoingFlatCrit || 0,
        outgoingFlatHeal: actor?.stats?.outgoingFlatHeal || 0,
        incomingMult: actor?.stats?.incomingMult || 0,
        incomingFlat: actor?.stats?.incomingFlat || 0,
        incomingToHit: actor?.stats?.incomingToHit || 0,
        incomingFlatToHit: actor?.stats?.incomingFlatToHit || 0,
        incomingCrit: actor?.stats?.incomingCrit || 0,
        incomingFlatCrit: actor?.stats?.incomingFlatCrit || 0,
        incomingFlatHeal: actor?.stats?.incomingFlatHeal || 0,
        moveMod: actor?.stats?.moveMod || 0,
        stunImmunityMod: actor?.stats?.stunImmunityMod || 0,
        incomingStatusFlat: actor?.stats?.incomingStatusFlat || 0,
        outgoingStatusFlat: actor?.stats?.outgoingStatusFlat || 0,
    }

    actor.grantedActions = []
    actor.prohibited = {}
    actor.actionDefStatusReplacers = []
    actor.actionDefSpecialNotatorStatuses = []
    if(env?.rpg?.is2D) actor.extraAOEFromStatuses = []
    
    //we do status stuff before the main actorEl updates because this way there's only one status loop
    if(actorEl) actorEl.querySelector('.statuses').innerHTML = "" //reset to add programmatically
    //console.log("statusupdate", performance.now())

    let visCount = 0
    actor.statusEffects.forEach(status => { 
        if(status.hardSkip) hardSkip = true
        if(status.firmSkip) firmSkip = true
        if(status.untargetable) untargetable = true
        if(status.max && status.duration >= status.max) status.duration = status.max

        //to be referenced in disableIf text
        if(status.prohibitUtility) actor.prohibited.utility = status
        if(status.prohibitSecondary) actor.prohibited.secondary = status

        //handle stat accumulation
        for (const prop in status) if (status.hasOwnProperty(prop)) {
            if (actor.effectiveStats.hasOwnProperty(prop)) {
                actor.effectiveStats[prop] += status[prop] || 0
            }
        }

        if(status.grantsActions) {
            status.grantsActions.forEach(actionSlug => {
                let actionObj = env.ACTIONS[actionSlug]
                //actions may be limited by their type if they're an itemAction
                if(
                    !actionObj.itemAction ||
                    (
                        actionObj.itemAction &&
                        (
                            (actionObj.itemAction == "2D" && check("PAGE!!2dcombat")) ||
                            (actionObj.itemAction == "1D" && !check("PAGE!!2dcombat")) ||
                            actionObj.itemAction === true
                        )
                    )
                ) actor.grantedActions.push(actionSlug)

            })
        }
        if(status.actionDefStatusReplacer) actor.actionDefStatusReplacers.push(status.actionDefStatusReplacer)
        if(status.actionDefSpecialNotator) actor.actionDefSpecialNotatorStatuses.push(status)
        if(env?.rpg?.is2D && status.extraAOE) for (const aoeName in status.extraAOE) {
            //console.log("we're in 2D and", status.slug, "has extraAOE", aoeName, "so we're adding it to", actor.name, "extraAOEFromStatuses")
            actor.extraAOEFromStatuses.push(status.extraAOE[aoeName])
            //console.log("added extraAOE", status.extraAOE[aoeName], "to actor", actor.name, actor.extraAOEFromStatuses)
        }
        
        //add regular statuses ONLY here
        //passives are statuses, but aren't updated each turn and have their own display. see addStatus for them
        if(actorEl) if(!status.passive && !status.silent && !status.subEffect) {
            visCount++
            const statusesEl = actorEl.querySelector('.statuses')
            const el = createStatusElement(status)
            statusesEl.appendChild(el)
            
            //look for any sub-statuses to this status
            actor.statusEffects.forEach(subStatus => {
                if(subStatus.subEffect == status.slug) {
                    const subEl = createStatusElement(subStatus)
                    statusesEl.appendChild(subEl)
                }
            })
        } else if(status.passive) hasPassives = true
    })

    actor.hardSkip = hardSkip
    actor.firmSkip = firmSkip
    actor.untargetable = untargetable
    
    if(actorEl) {
        actorEl.style.setProperty("--bp", Math.clamp(actor.bp, 0, 15))
        actorEl.querySelector('.name').innerHTML = actor.name
        actorEl.querySelector('.hp').innerHTML = actor.hp || "DOWN"
        actorEl.querySelector('.state').innerHTML = actor.state

        //special barrier stuff
        if(actor.bp > 0) {
            actorEl.querySelector('.bp').innerHTML = actor.bp
            actorEl.style.setProperty('--bp', Math.clamp(actor.bp, 0, 15))
            actorEl.setAttribute('barrier', true)
        } else {
            actorEl.querySelector('.bp').innerHTML = ""
            actorEl.style.removeProperty('--bp')
            actorEl.removeAttribute('barrier')
        }

        //add tip about DOWN if no HP
        if(actor.state == "lastStand") actorEl.querySelector('.hp').setAttribute("definition", "EFFECT::UTILIZING UNUSUAL RULESET")
        else if(!actor.hp) actorEl.querySelector('.hp').setAttribute("definition", "EFFECT::SKIP TURN UNTIL END OF COMBAT")
        else actorEl.querySelector('.hp').setAttribute("definition", `MAX::${actor.maxhp}`)

        //status compactor version if there's a shitton of statuses (4 or 6 or more depending on screen)
        let overflowCount = window.innerWidth < 1366 || window.innerHeight < 768 ? 3 : 5
        if(env.rpg.is2D) overflowCount = 0 // this is a really compact view
        if((visCount > overflowCount) && !env.rpg.noStatusOverflow) actorEl.classList.add("status-overflow"); else if(!actorEl.intentionalStatusOverflow) actorEl.classList.remove("status-overflow")

        //mainly for CombatGrid 
        if(visCount) actorEl.classList.add("has-statuses"); else actorEl.classList.remove("has-statuses")
    }

    if(actor.state == "dead") {
        //handle if the actor is dead but it's their turn due to async stuff
        if(
            env.rpg.currentActor == actor && 
            actor.team.name == "ally"
        ) {
            clearActionsDisplay()
            console.log("ADVANCE - current actor is dead")

            //quick clear if 2d
            if(env.rpg.is2D && env.rpg.grid.movableTiles) env.rpg.grid.clearMovableTiles();

            advanceTurn(actor)
        }

        //if we're in grid, also set up their piece to be freakin dead
        if(env.rpg.is2D && actor?.piece?.tile) {
            setTimeout(() => {
                if(actor.state == "dead") {
                    env.rpg.actorsToRemovePiecesOf.add(actor)
                    if(actor.piece) actor.piece.classList.add("dyingpiece")
                }

                // if we advance to a player character, then this character dies to async attacks, need to mark removal
                setTimeout(()=>{
                    if(env.rpg?.movingFor?.team?.name == "ally" && actor.state == "dead") {
                        env.rpg.removePendingPiece(actor, true)
                        env.rpg.movingFor.piece.startMovement() // restart in case they were in range to block a tile
                    }
                }, env.ADVANCE_RATE * 0.1)

            }, 10)
        }
    } else if(env.rpg.is2D && actor?.piece && actor?.piece?.tile) {
        actor.piece.tile.piece = actor.piece // redundant reinforcement of position just in case
    }

    triggerStatusEvents({target: actor, eventName: "onUpdateStats", context: {actor} })

    if(actor.highlighted) actor.highlight(false)
    endCombatIfTeamDead()
}

function updateStats({actors, actor} = {}) {
    env.rpg.lastUpdate = Date.now() // since this function is called in any actor-affecting area, we use this to set the advanceTurn buffer time
    if(actor) {
        updateStatsProcess(actor)
    } else if(actors) {
        actors.forEach(updateStatsProcess)
    } else {
        env.rpg.turnOrder.forEach(updateStatsProcess)
    }
}

///////DIALOGUE AND MESSAGES
//displays a 'x uses Y on Z' message. messageNum used to make unique identifiers for messages
var messageNum = 0;
function actionMessage(origin, action, desiredTarget, hit = "none", duration = false, id = false) {
    console.warn("you should probably not be using actionMessage anymore, use the new effectMessage system instead\nthis will be removed in a future update")
    //control for optional or flexible parameters
    var actionIsString = (typeof action == "string")
    var target = desiredTarget;
    if(typeof desiredTarget == "undefined") target = origin;

    //figure out who's on what team
    var originTeam, targetTeam;
    env.rpg.teams.forEach((team, i) => {
        team.members.forEach((actor, i) => {
            if(actor.slug == origin.slug) {
                originTeam = team.name
            } //not 'else if' because it could be self-targeted

            if(actor.slug == (target.slug || 0)) {
                targetTeam = team.name
            }
        });
    });

    //control conditional text/formatting
    var hitType = "none"
    var hitText = false
    var modClass = ""; //used to border if there's a crit
    switch(hit){
        case "none": break

        case true:
            hitType = "hit"
        break

        case "critbuff":
        case "crit":
            hitType = "crit"
            modClass = "use-crit"
        break

        case false: 
            hitType="miss"
    }
    if(action.usage) hitText = action.usage[hitType] || false //refer to action usage text for result

    var actionText;
    if(actionIsString) {
        actionText = action
            .replaceAll("%USER", `<span class="${originTeam}">${origin.name}</span>`)
            .replaceAll("%TARGET", `<span class="${targetTeam}">${target.name}</span>`);
        
    } else if(action.usage) {
        actionText = action.usage.act
            .replaceAll("%USER", `<span class="${originTeam}">${origin.name}</span>`)
            .replaceAll("%TARGET", `<span class="${targetTeam}">${target.name}</span>`);
    }
        
    if(hitText) {
        hitText = 
            `<br><div class="hit-text">` +
            (hitText
            .replaceAll("%USER", `<span class="${originTeam}">${origin.name}</span>`)
            .replaceAll("%TARGET", `<span class="${targetTeam}">${target.name}</span>`)) +
            `</div>`
        ;
    } else {
        hitText = "";
    }

    let currentNum = messageNum++;
    env.rpg.querySelector(`#${originTeam}-team .actor`).insertAdjacentHTML('beforebegin', `<div class="use-message ${modClass}" style="z-index: ${10 + (currentNum % 9)}" id="m-${currentNum}">${actionText}${hitText}</div>`);
    let useMessage = env.rpg.querySelector(`#m-${currentNum}`)
    setTimeout(()=>{
        useMessage.classList.add('active')
        var readoutMessage
        if(actionIsString) {
            readoutMessage = `<div class="action-text" definition="ANALYSIS::'UTILIZED INCOHERENT ACTION'::RESULT::'UNKNOWN'">${actionText}</div> ${hitText.replaceAll('<br>', '')}`
        } else {
            readoutMessage = `
                <div class="action-text" 
                    definition="ANALYSIS::'UTILIZED THOUGHTFORM ACTION'::'${action.name.toUpperCase()}'::RESULT::'${hit ? "SUCCESS" : "FAILED"}'"
                >
                    ${actionText}
                </div>
                
                ${hitText.replaceAll('<br>', '')} 
                
                <br>
                <div class="action-description" definition="ANALYSIS::${action.help}">COMMAND::${action.desc}</div>
            `
        }

        readoutAdd({
            message: readoutMessage, 
            name: "sourceless", 
            type: "sourceless combat", 
            show: false,
            sfx: false
        })
    }, 100);	
                
    setTimeout(function(){
        useMessage.classList.add('shrink');
        setTimeout(function(){useMessage.remove()}, 400);
    }, duration ? duration : env.ADVANCE_RATE * 1.5);
}

/* effectMessageS */
// used to display turn actions in more detail (may sometimes stretch across turns unintentionally (outside of enemies) but w/e)
// to replace actionMessage completely and display turn results and multi-action/multi-hit events more plainly
// this is essentially a static class we're making into a part of env.rpg
// but env.rpg is often deleted/replaced, so a function that bundles it into the object
// yea i know it's stupid but i don't want to rework combat into a proper class right now LOL
// maybe with da reframing
function createRPGeffectMessage() {
    env.rpg.effectMessage = {
        last: false, // just for debug mainly. holds last object rather than simply deleting
        current: false, // effectMessages only exist for brief periods of time

        /* 
            to create a new object, set elements and base object
        */
        initialize: function() {
            if(this.current || env.currentDialogue.active || env.rpg.stopMessages) return;
            if(this.last && this.last.display) this.closeAnim(this.last.display)
            this.current = {

                //list of all actions and sub-actions used
                //you might think we'd tie combat hits etc directly to the action that caused them, but the system doesn't have support for that yet
                //we gotta rewrite actions and stuff for that
                actions: [/* 
                    {
                        origin: {actor},
                        actionText: "", // i.e. the very first "Akizet stabs X",
                        hits: [
                            {
                                target: {actor},
                                text: "", // i.e. the subtext, "X bleed sludgy corru"
                                result: "hit/crit/miss/etc"
                            }
                            //separate action uses can point to the same ID and stack hit text/targets/etc. so we have like "x was hit by bomb", "y was hit by shrapnel", "z evaded shrapnel" as subtext
                        ],
                    }
                */],
                
                //list of all actors affected by these actions
                affected: {/*
                    container0: {
                        initial: {
                            hp: 10
                            bp: 2,
                            dead: false,
                            statuses: {
                                regen: 2
                            }
                        },
                        
                        end: {
                            hp: 2,
                            bp: 0,
                            dead: false, // (could be different to say 'downed this round' or vice versa for 'rezzed this round')
                            statuses: {
                                puncture: 6
                            }
                        }
                    }
                */}
            }

            //initialize the HTML element
            const effectMessageElement = document.createElement('div')
            effectMessageElement.classList.add('effect-message')
            effectMessageElement.innerHTML = `
                <div class="message-actions"></div>
                <div class="message-affected"></div>
            `
            env.rpg.appendChild(effectMessageElement)
            this.current.display = effectMessageElement
            this.current.display.actions = effectMessageElement.querySelector(".message-actions")
            this.current.display.affected = effectMessageElement.querySelector(".message-affected")      
        },

        /* 
            to handle adding/updating action results. 
            Calls initialize if there is no current effectMessages object.
            action can also be a solo-passed string, which makes it be an arbitrary addition to the action text basically
                i.e. env.rpg.effectMessage.action({action: "hi"})
        */
        action: function({user, action, target, hit, specialHitText, actionMessageIndex, reason, showFullDetail = false, isMinor = false, force = false, initialize = true, icon = false, status = false, combineLikeAction = false}) {
            if(env.rpg.stopMessages || !this.current && !initialize || env.currentDialogue.active) return -1 // we require this to be .initialize()d first, done in useAction
            else if(initialize && !env.rpg.effectMessage.current) this.initialize()

            let current = this.current

            //control conditional text/formatting
            let hitType = "none"
            let hitText = false

            switch(hit){
                case "none": break

                case "critbuff":
                case "crit":
                    hitType = "crit"
                break

                case true:
                    hitType = "hit"
                break

                case false: 
                    hitType="miss"
            }

            let genUsageText = typeof action == "string" ? action : action?.usage?.act
            if(!genUsageText) return false;
            if(action.usage) {
                hitText = action.usage[hitType] || false //refer to action usage text for result 
            } 
            
            if(force && !hitText && typeof action == "string") hitText = action

            let actionText = (genUsageText)
                .replaceAll("%USER", `<span class="${user?.team?.name}">${user?.name}</span>`)
                .replaceAll("%TARGET", `<span class="${target?.team?.name}">${target?.name}</span>`)
            
            if(hitText || specialHitText) {
                hitText = (hitText || specialHitText)
                    .replaceAll("%USER", `<span class="${user?.team?.name}">${user?.name}</span>`)
                    .replaceAll("%TARGET", `<span class="${target?.team?.name}">${target?.name}</span>`)
            }

            //console.log("!!!!!!!!!!!! in add for action", hit, hitType, action, hitText, actionMessageIndex)
            //the hit object - actionText is used as the "primary" text, so not used for subtext
            let hitObj = {
                target,
                text: hitText,
                result: hitType,
                action,
                count: 1
            }

            //determine if it's for an existing thing then push it
            let finalIndex = 0
            let effectiveIndex = actionMessageIndex
            if(typeof actionMessageIndex == "object") effectiveIndex = actionMessageIndex?.i // cause we might just pass the action hit return which has the i

            if(typeof effectiveIndex == "undefined") { 
                // figure out if there's an identical action in the list
                // it's way more efficient to just pass the index though so this is a fallback

                // combineLikeAction means "combine if the action string is the same"
                if(combineLikeAction) effectiveIndex = env.rpg.effectMessage.current.actions.findIndex(actionEntry => (actionEntry.action == action))

                // otherwise match by both user and reason
                else effectiveIndex = env.rpg.effectMessage.current.actions.findIndex(action => (action.user == user) && ((!reason && !action.reason) || (action.reason == reason)))
                if(effectiveIndex == -1) effectiveIndex = false
            } 

            console.log("entering with effectiveindex", effectiveIndex)
            
            if(current.actions[effectiveIndex]) { //exists, so adding to this
                let currentAction = current.actions[effectiveIndex]
                if(!hitText && !force) {console.log(`no hit text so returning`, hitObj); return -1}; // no text = no action for subtext
                finalIndex = effectiveIndex

                //find if there's an identical message for this hit, and if so, increase the 'count'
                let similarHit = current.actions[finalIndex].hits.find(h=>
                    h.action == action &&
                    h.target == target &&
                    h.result == hitObj.result &&
                    h.text == hitObj.text
                )

                if(similarHit) {
                    similarHit.count++
                } else {
                    current.actions[finalIndex].hits.push(hitObj)

                    //crit, hit, miss, in order of 'best hit' priority
                    if(currentAction.bestHit != hitType) {
                        if(
                            (hitType == "hit" && currentAction.bestHit == "miss") ||
                            (hitType == "crit" && currentAction.bestHit != "crit")
                        ) currentAction.bestHit = hitType
                    }               
                }
                
                if(showFullDetail) current.actions[finalIndex].showFullDetail = true
                

            } else { //doesn't, so creating
                current.incitingActor = user

                let actionUse = {user, action, actionText, isMinor, reason, status, icon, bestHit: hitType, hits: hitObj.text ? [hitObj] : [], showFullDetail: showFullDetail}
                console.log(actionUse)

                if(current.actions.length == 0) {
                    current.display.setAttribute("type", hitType)
                    current.display.setAttribute("team", user?.team?.name)
                }
                
                if(current.actions.length && current?.actions[0]?.isMinor) { //avoid highlighting "minor actions", i.e. async that happen before others
                    //shouldn't happen super often, so probably won't end up scrambling expected indexes
                    current.actions.unshift(actionUse)
                    finalIndex = 0
                } else {
                    current.actions.push(actionUse) 
                    finalIndex = current.actions.length - 1
                }
            }

            //rerender
            this.updateDisplay({actionIndex: finalIndex})

            //return the action index
            return finalIndex
        },

        /* 
            to handle adding affected actors and tracking changes
        */
        affect: function({target, initializeOnly}) {
            if(env.rpg.stopMessages || !this.current || (initializeOnly && this.current.affected[target.slug]) || env.currentDialogue.active) return;

            let summary = {
                hp: target.hp,
                bp: target.bp,
                dead: (target.hp <= 0) && target.state != "lastStand",
                statuses: target.statusEffects.reduce((obj, status) => {obj[status.slug] = status.duration; return obj}, {})
            }
            
            if(!this.current.affected[target.slug]) { //create the actor
                this.current.affected[target.slug] = {
                    actor: target,
                    initial: summary,
                    end: summary
                }
            } else { //this is an update
                this.current.affected[target.slug].end = summary
            }
            
            // re-render display
            this.updateDisplay({affectedSlug: target.slug})
        },

        //either takes specific things to update, or regenerates/initializes as a whole
        //this function handles the animation too
        updateDisplay: function({affectedSlug, actionIndex}) {
            if(env.rpg.stopMessages || this?.current?.actions[0]?.isMinor) return;

            //console.log("!!!!!!!! updating", affectedSlug, actionIndex)
            //check to see if we're just updating a little bit
            //or inserting specifically
            const subject = affectedSlug || actionIndex
            if(subject) { // we can mix reliably because affected is always a slug (text#), and actionIndex is always number
                let groupEl = affectedSlug ? this.current.display.affected : this.current.display.actions
                let element = groupEl.querySelector(`#ms-${subject}`)
                let result = affectedSlug ? this.getAffectedHTML(subject, element) : this.getActionHTML(subject, element)

                if(actionIndex && element) { // update hit count if needed
                    let subjectAction = this.current.actions[actionIndex]
                    let totalHits = subjectAction.hits.reduce((sum, hit) => sum + hit.count, 0)
                    if(totalHits > 1) element.setAttribute("totalhits", totalHits)
                }

                //for whatever reason, the changes rendered are no longer needed. i.e. healing back damage taken within time of message
                if(!result && element) return element.remove() 

                if(result && element) {
                    element.innerHTML = result
                    //if besthit, this is an action
                    if(element.getAttribute("besthit")) element.setAttribute("besthit", this.current.actions[subject].bestHit)
                } else if(result) {
                    groupEl.insertAdjacentHTML('beforeend', result)
                    element = groupEl.querySelector(`#ms-${subject}`)
                }

                if(element && !affectedSlug) { // we only animate action effects, affected only show in readout log after close
                    element.classList.add('shake-crazy-anim-once')
                    setTimeout(() => element.classList.remove('shake-crazy-anim-once'), 300)
                }

            //full regenerate from scratch
            } else {
                console.log("full regen")
                let affectedHTML = ''
                let actionHTML = ''

                //gen HTML
                for (const affected in this.current.affected) affectedHTML += this.getAffectedHTML(affected);
                this.current.actions.forEach((effectAction, i) => actionHTML += this.getActionHTML(i));

                //set, easy
                this.current.display.affected.innerHTML = affectedHTML
                this.current.display.actions.innerHTML = actionHTML
            }
        },


        /* 
            these both return HTML for use in above
        */
        getAffectedHTML: function(affectedSlug, onlyInner) {
            /* object reference: 
                container0: {
                    initial: {
                        hp: 10
                        bp: 2,
                        dead: false,
                        statuses: {
                            regen: 2
                        }
                    },
                    
                    end: {
                        hp: 2,
                        bp: 0,
                        dead: false, // (could be different to say 'downed this round' or vice versa for 'rezzed this round')
                        statuses: {
                            puncture: 6
                        }
                    }
               }
            */
            const subject = this.current.affected[affectedSlug]
            const initial = subject.initial
            const end = subject.end
            const knownStatuses = new Set()

            // Collect all the status names from initial and end
            for (const statusName in initial.statuses) knownStatuses.add(statusName);
            for (const statusName in end.statuses) knownStatuses.add(statusName);

            let statChanges = ''
            let statusChanges = ''

            // Check if the actor is dead
            if (end.dead) {
                statChanges += "<span class='stat down bad'>+DOWN</span>"
            } else {
                if(initial.dead && !end.dead) statChanges += "<span class='stat down good'>-DOWN</span>"
                if(initial.hp !== end.hp) statChanges += `<span class='stat core hp'><span class="stat-amt">${end.hp - initial.hp}</span><span class="${end.hp < initial.hp ? 'bad' : 'good'}">HP</span></span>`
                if(initial.bp !== end.bp) statChanges += `<span class='stat core bp'><span class="stat-amt">${end.bp - initial.bp}</span><span class="${end.bp < initial.bp ? 'bad' : 'good'}">BP</span></span>`
                
                for (const statusName of knownStatuses) {
                    let status = env.STATUS_EFFECTS[statusName]
                    if(initial.statuses[statusName] !== end.statuses[statusName]) {
                        let changeValue = (end.statuses[statusName] || 0) - (initial.statuses[statusName] || 0)
                        let changeMod = changeValue > 0 ? `+` : `-`

                        let goodnessClass
                        if(status.beneficial) goodnessClass = changeValue > 0 ? 'good' : 'bad'
                        else goodnessClass = changeValue > 0 ? 'bad' : 'good'

                        statusChanges += `<span class='stat status status-${statusName}'>
                            ${changeValue > 0 ? changeMod : ""}${!(status.infinite || status.passive) ? `${changeValue}T:` : changeValue < 0 ? "-" : ""}<span class="${goodnessClass}" definition="STATUS++${statusName}">${status.name}</span>
                        </span>`
                    }
                }
            }

            //console.log("!!!!!!!! checking rerender affect results", statChanges, statusChanges)
            if(!statChanges && !statusChanges) return '' // if empty like this, should be removed

            let summaryHTML = `
                ${onlyInner ? '' : `<div class="affected" id="ms-${affectedSlug}" team="${subject.actor.team.name}">`}
                    <div class="affected-name ${subject.actor.team.name}">${subject.actor.name}</div>
                    ${statChanges ? `<div class="affected-stats">${statChanges}</div>` : ''}
                    ${statusChanges ? `<div class="affected-statuses">${statusChanges}</div>` : ''}
                ${onlyInner ? '' : '</div>'}`
            return summaryHTML
        },

        getActionHTML: function(actionIndex, onlyInner) {
            /* object reference:
                {
                    origin: {actor},
                    actionText: "", // i.e. the very first "Akizet stabs X",
                    hits: [
                        {
                            target: {actor},
                            text: "", // i.e. the subtext, "X bleed sludgy corru"
                            result: "hit/crit/miss/etc"
                        }
                        //separate action uses can point to the same ID and stack hit text/targets/etc. so we have like "x was hit by bomb", "y was hit by shrapnel", "z evaded shrapnel" as subtext
                    ],
                }
            */
            let subjectAction = this.current.actions[actionIndex]
            let actionHTML

            //the first action is a little more split up than subsequent/reaction actions, to have big text but also preserve readability
            //"reason" doesn't matter for the first hit
            if(actionIndex == 0) {
                actionHTML = `
                    ${onlyInner ? '' : `<div id="ms-${actionIndex}">`}
                        <!-- first action hit -->
                        <div class="action" besthit="${subjectAction.bestHit}">
                            <div class="action-main" ${subjectAction.action?.details || subjectAction.action?.help ? `definition="ACTION++${subjectAction.action.slug}"` : ``}>${subjectAction.actionText}</div>
                            ${subjectAction.hits.length ? (subjectAction.hits[0].text != subjectAction.actionText ?
                            `<div class="action-hits">
                                <div class="action-hit ${subjectAction.hits[0].result}">${subjectAction.hits[0].text}<span class="action-hit-count" count=${subjectAction.hits[0].count}>${subjectAction.hits[0].count}</span></div>
                            </div>` : '') : ''
                            }
                        </div>

                        ${subjectAction.hits.length > 1 ? 
                        `<!-- subsequent first-action-hits if necessary -->
                        <div class="action action-extra subaction ${subjectAction.reason ? "action-async" : ""}" besthit="${subjectAction.bestHit}" ${subjectAction.reason ? `reason="${subjectAction.reason}"` : ""}>
                            <div class="action-hits">
                                ${subjectAction.hits.map((hit, i) => i != 0 ? `<div class="action-hit ${hit.result}">${hit.text}<span class="action-hit-count" count=${hit.count}>${hit.count}</span></div>` : '').join('')}
                            </div>
                        </div>` : ''
                        }
                    ${onlyInner ? '' : '</div>'}`
            } else { 
                //sub (or subsequent) actions are things like impulses or attack drone. primarily "reason" origin
                // important ones are divs, less important ones are spans
                // this only matters for the purposes of :last-of-type styling
                important = subjectAction.showFullDetail
                let isFirstMinimizable = !important && this.current.actions.slice(0, actionIndex).every(a => !a.showFullDetail)
                let icon = subjectAction.status ? (subjectAction.status.icon || `/img/sprites/combat/statuses/${subjectAction.status.slug}.gif`) : subjectAction.icon
                let definition = false
                if(subjectAction.status) definition = `STATUS++${subjectAction.status.slug}`
                else if(subjectAction.action?.details || subjectAction.action?.help) definition = `ACTION++${subjectAction.action.slug}`

                //if it's an action, we have the definition around the whole main reason.
                //if it's a status, we only have it around the reason text, so it can get the status def underline
                actionHTML = `${onlyInner ? '' : `<${important ? 'div' : 'span'} class="action subaction ${subjectAction.reason ? "action-async" : ""} ${important ? `important` : "minimizable"} ${isFirstMinimizable ? "first-minimizable" : ""} ${subjectAction.reason ? `hasreason` : 'noreason'} " besthit="${subjectAction.bestHit}" id="ms-${actionIndex}" ${subjectAction.reason ? `reason="${subjectAction.reason}"` : ""}>`}
                        <div class="action-main" ${definition && !subjectAction.status ? `definition="${definition}"` : ''}>${subjectAction.reason ? `<span class="action-reason ${icon ? `reason-icon ${subjectAction?.status ? (subjectAction?.status?.beneficial ? (subjectAction.status.beneficial == "complex" ? "neutral-color" : "friend-color") : "obesk-color") : "neutral-color"}` : "neutral-color"}" ${icon ? `style="--icon: url(${icon})"` : ''} ${definition && subjectAction.status ? `definition="${definition}"` : ''}>${subjectAction.reason.toUpperCase()}</span>` : ''}<span class="action-text">${subjectAction.actionText}</span></div>
                        <div class="action-hits">
                            ${subjectAction.hits.map(hit => `<div class="action-hit ${hit.result}">${hit.text}<span class="action-hit-count" count=${hit.count}>${hit.count}</span></div>`).join('')}
                        </div>
                    ${onlyInner ? '' : `</${important ? 'div' : 'span'}>`}`

                console.log("made action html", actionHTML)
            }

            return actionHTML
        },

        /* 
            Logs the final message effect, then deletes effectMessage object.
        */
        close: function() {
            if(!this.current) return;
            //console.log("!!!!!!!! closing out")
            let currentDisplay = this.current.display

            clearInterval(this.current.interval)
            readoutAdd({
                message: currentDisplay.outerHTML,
                actor: "combat",
                show: false,
                sfx: false
            })

            //delete current object
            currentDisplay.classList.add("fading")
            env.setTimeout(() => this.closeAnim(currentDisplay), 4000)
            this.last = this.current
            delete this.current
        },

        /* to be called earlier if needed*/
        closeAnim: function(display) {
            if(!display || !display.parentElement) return;
            display.classList.add('animate-out')
            env.setTimeout(()=>display.remove(), 600)
        }
    }
}


/* DIALOGUE */
//display little amounts of dialogue for an actor 
//now can take a duration thanks 2 sha
var dialogueNum = 0;
function rpgDialogue(actor, text, useVoice = false, duration = env.rpg.is2D ? 8000 : 4000, usePiece) {
    let currentNum = dialogueNum++
    let dialogueBox = usePiece ? actor.sprite.dialogueBox : actor.box.querySelector('.combat-dialogue')

    if(!dialogueBox) return;
    dialogueBox.insertAdjacentHTML('beforeend', `<span id="d-${currentNum}"><pre>${text}</pre></span>`)
    let currentMessage = dialogueBox.lastElementChild

    let dialogueActor = getDialogueActor(actor.readoutActor)
    console.log("got", dialogueActor, actor)
    if(useVoice === true && dialogueActor) {
        env.recentSfx = false // rpgdialogue always overrides sfx
        if(typeof dialogueActor.voice == "function" || typeof dialogueActor.activeVoice == "function") {
            dialogueActor.activeVoice ? dialogueActor.activeVoice() : dialogueActor.voice()
        }
    }
    
    setTimeout(function() {
        currentMessage.classList.add('active')
        dialogueBox.classList.add('speaking')
        if(!env.rpg.is2D) actor.box.classList.add('speaking')
        if(actor.readoutActor) chatter({ text, actor: actor.readoutActor, readout: false, sfx: false })
        
        setTimeout(function() {
            currentMessage.classList.remove('active')
            setTimeout(function() {
                currentMessage.remove()
            }, 200)
        }, duration)
        
        setTimeout(function() {
            if(dialogueBox.childElementCount == 0) {
                dialogueBox.classList.remove('speaking')
                if(!env.rpg.is2D) actor.box.classList.remove('speaking')
            }
        }, duration * 2)
    }, env.ADVANCE_RATE * 0.25)
}

//shortcut to display dialogue for an actor's reaction, if it exists
//env.rpg.enemyTeam.members.some(member => member.name == "Husk")
function reactDialogue(actor, intendedEvent) {
    let event = intendedEvent
    let reactions = actor.specialReactions || actor?.base?.reactions
    let selectedReaction

    //not all actors have reactions
    if(typeof reactions != "undefined") {
        //some reaction types are fallbacks
        if(event == "receive_regen" && typeof reactions[event] == 'undefined') event = "receive_buff"
    
        if(reactions.hasOwnProperty(event)) { selectedReaction = reactions[event].sample()}
        else if(reactions.hasOwnProperty('catchall')) { selectedReaction = reactions['catchall'].sample()}
    }

    //console.log(actor, intendedEvent, selectedReaction)

    try {
        if(selectedReaction) {
            //it can be a function that returns a string too
            if(typeof selectedReaction == "function") {
                selectedReaction = selectedReaction()

            //or an object with optional controls
            /* 
                {
                    text: `whatever`,
                    duration: ####ms, (defaults to env.ADVANCE_RATE * 1.5 if absent)
                    useVoice: true/false, (defaults to false if absent),
                    exec: (intendedEvent)=>{} (optional extra exec called because why not)
                }
            */
            } else if(typeof selectedReaction == "object") {
                if(selectedReaction.exec) selectedReaction.exec(intendedEvent)
                return rpgDialogue(actor, selectedReaction.text, selectedReaction.useVoice, selectedReaction.duration)
            }

            if(selectedReaction == "") return;
            rpgDialogue(actor, selectedReaction)
        }
    } catch(e) { console.warn('reactdialogue failed', e) } // silent fail
}

//makes a little floaty message appear near someone's hitbox or grid sprite
//can be either damage, or a status
function sendFloater({
    target, 
    type, /* 'status', 'hit', or 'arbitrary' */
    amt, /* damage or status turns */
    size: initialSize = env.rpg.is2D ? 0.75 : 1, 
    specialClass, /* arbitrary */

    /* hits */
    hit,
    damageType, /* 'hp' or 'barrier' */

    /* status only */
    status,

    /* arb floater */
    arbitraryString,
    beneficial = true

} = {}) {
    if(!target.hitBox && !(env.rpg.is2D && target.piece)) return

    if(status && !env.rpg.is2D) return; //temporarily shelving status floaters unless you're in 2D

    //floaters of same type are briefly stored for stacking
    let floatHostEl = env.rpg.is2D ? target.sprite.hitBox : target.hitBox
    if(!floatHostEl.floaters) floatHostEl.floaters = {}

    //type-specific-turnnum, so floaters aren't combined outside of their origin turn
    let floaterName = type == "status" ? `status-${status.slug}-${env.rpg?.turnData?.turn || 0}` : `${type}-${damageType}-${env.rpg?.turnData?.turn || 0}`

    let childCount = floatHostEl.childElementCount
    let offset = (childCount * 100)
    let variance = Math.min(childCount * 5, 30)
    let size = initialSize

    let floaterEl, newEl
    //we skip storing/accessing arbitraries and misses
    if(type != "arbitrary" && !(type == "hit" && !hit)) floaterEl = floatHostEl.floaters[floaterName]

    if(floaterEl) { // found one
        clearTimeout(floaterEl.deleteTimeout)
        offset = floaterEl.style.getPropertyValue("--offset")
        floaterEl.classList.remove("floating")
        newEl = false
    } else {
        floaterEl = document.createElement("span")
        floaterEl.id = `float${env.rpg.entCount++}`
        newEl = true
    }

    floaterEl.classList.add("floater")
    setTimeout(()=>floaterEl.classList.add("floating"), 10) // this is the animation class
    if(specialClass) floaterEl.classList.add(specialClass)

    if(newEl) floaterEl.amt = amt
    else floaterEl.amt += amt

    let innerHTML
    
    switch(type) {
        case "status":
            floaterEl.classList.add("statusfloat", `status-${status.beneficial ? (status.beneficial == "complex" ? "complex" : "good") : "bad"}`)
            floaterEl.style.setProperty("--icon", `url(${status.icon ? status.icon : `/img/sprites/combat/statuses/${status.slug}.gif`})`)
            floaterEl.setAttribute("beneficial", status.beneficial || false)
            if(status.passive) floaterEl.setAttribute("passive", status.passive)
            floaterEl.status = status
            innerHTML = ((status.infinite || status.passive) ? 
                (floaterEl.amt <= 0 ? "-" : "+") // infinite
                : (floaterEl.amt <= 0 ? "-" : `+${floaterEl.amt}T:`)) // normal
                + status.name
        break
        case "hit":
            floaterEl.classList.add("hitfloat", `result-${hit}`, `type-${damageType}`,
                `amt-${floaterEl.amt == 0 ? "blocked" : (floaterEl.amt > 0 ? "positive" : "negative")}`)
            innerHTML = Math.abs(floaterEl.amt) || "0"
        break
        case "arbitrary":
            floaterEl.classList.add(`good-${beneficial}`, "arbfloat")
            innerHTML = arbitraryString
        break
    }

    floaterEl.style.setProperty("--angle", env.rpg.is2D ? 0 : rand(-variance, variance))
    floaterEl.style.setProperty("--position", env.rpg.is2D ? 0 : rand(-25, 25))
    floaterEl.style.setProperty("--size", size)
    floaterEl.innerHTML = `<div class="floatcontent">${innerHTML}</div>`

    if(floatHostEl.floaters[floaterName]) {
        floaterEl.style.setProperty("--offset", offset) // fetched
    } else {
        if(type === "hit") {
            floaterEl.style.setProperty("--offset", (env.rpg.is2D ? -50 : (offset * 0.5)) + "%")
        } else {
            floaterEl.style.setProperty("--offset", (offset + (env?.rpg?.is2D ? 110 : 50)) + "%")
        }
    }

    floatHostEl.appendChild(floaterEl)
    
    if(type != "arbitrary" && !(type == "hit" && !hit)) floatHostEl.floaters[floaterName] = floaterEl

    floaterEl.deleteTimeout = setTimeout(() => {
        if(floaterEl && !env.pauseFloaters) {
            floaterEl.remove()
            delete floatHostEl.floaters[floaterName]
        }
    }, (size + 1) * 1500)
}

//replaces placeholder strings for the "help" string on an attack, status, or action
function processHelp(obj, {caps = false, specialObj = false} = {}) {
    let newHelp = specialObj ? specialObj : obj.help
    if(typeof newHelp == "function") newHelp = newHelp()

    if(obj.origin) newHelp = newHelp.replaceAll("[[ORIGIN]]", obj.origin.name);
    else newHelp = newHelp.replaceAll("[[ORIGIN]]", "user")

    if(caps) newHelp = newHelp.toUpperCase()
    return newHelp
}

///////////GLOBAL COMBAT CONTROLS
env.combat = {
    /* 
        default settings that should be overridden when you're in a new context
    */
    defaults: {
        bgm: null,
        endCallback: false,
        lossDialogue: null,
    },

    /*  dynamicCombat is used by dialogues started by grid enemies walking into the player
        it accesses info known by the dialogue object (specifically the grid entity that started the dialogue) to determine what should happen
        it has these params:
            dry: used by startCombat, indicates it should creates combat object in env without actually starting combat, for use with certain combat interceptors (like old disabler)
            specificFormation: takes a formation name, used when you want to call this command directly rather than from the origin entity
    */
    dynamicCombat: ({dry = false, specificFormation, specificCallback, exec} = {dry: false})=>{        
        let entID = env.currentDialogue.originEntityID
        let ent = document.querySelector(env.currentDialogue.originEntityID); 
        env.combat.lastEngaged = specificFormation ? specificFormation : ent.getAttribute('type')
        env.combat.lastInciter = ent

        //potential formation settings
        let formation = env.COMBAT_FORMATIONS[env.combat.lastEngaged]
        env.ADVANCE_RATE = formation.advanceRate || 1500

        startCombat(formation.enemies, page.party, {
            dry,
            inciterID: entID, 
            bgm: typeof formation.getBgm == "function" ? formation.getBgm() : env.combat.defaults.bgm, 
            bgmRate: formation.bgmRate || 1,
            bgmVol: formation.bgmVol || 1,
            startCallback: exec || formation.startCallback,
            endCallback: specificCallback ? specificCallback : 
                formation.endCallback ? formation.endCallback : 
                    env.combat.dynamicCallback,
            turnCallback: formation.turnCallback,
            combatClass: formation.class,
            sceneTemplate: formation.sceneTemplate,
            bg: formation.bg
        });
    },

    dynamicCallback: (loser)=>{
        if(loser.name != "ally") {
            if(env.combat.lastInciter) env.combat.markEnemyDead(env.combat.lastInciter)
            env.COMBAT_FORMATIONS.default_callback(loser)
            if(env.combat.defaults.endCallback !== false) env.combat.defaults.endCallback(loser)
        } else {
            env.combat.lossState()
        }
    },

    dynamicReward: ()=>{
        try {
            let formation = env.COMBAT_FORMATIONS[env.combat.lastEngaged]
            let reward = formation.rewards ? formation.rewards[rand(0, formation.rewards.length)] : false

            if(reward) {
                let rewardItem = env.ITEM_LIST[reward]
                let rewardSuccess = addItem(rewardItem, rewardItem.batches)
                if(rewardSuccess) {
                    return `WITHIN THE DEBRIS, I FIND A${['a', 'e', 'i', 'o', 'u'].some(letter => rewardItem.name.toLowerCase().startsWith(letter)) ? "N" : ""} <span definition="INHERITED CONTEXT::${rewardItem.description}">${rewardItem.name}!</span>`
                } else {
                    return `THERE ARE NO DEVICES IN THE DEBRIS`
                }
            } else {
                return "THERE ARE NO DEVICES IN THE DEBRIS"
            }
        } catch(e) { return e }
    },

    lossScramble: ()=>{
        content.querySelectorAll('#realgrid .gridpiece, .truecreature').forEach(el=>{
            el.classList.remove("tile-in-canvas")
            el.style.transform = `rotateX(${rand(0, 360)}deg) rotateY(${rand(0, 360)}deg) rotateZ(${rand(0, 360)}deg)`
            el.style.opacity = 1
        })
        
        content.querySelectorAll('#realgrid .gridpiece *').forEach(el=>{
            el.style.animationPlayState = "paused";
        })
    },

    lossState: (dialogue)=>{
        env.combat.lossScramble()

        forceSwapCam(false)
        if(dialogue) startDialogue(dialogue)
        else startDialogue(env.combat.defaults.lossDialogue)
    },

    //this should take an entity contained within a gridpiece
    //we can use origin-spot to mark it dead
    markEnemyDead: (el)=>{
        if(!page.flags.deadGuys) page.flags.deadGuys = {}
        if(!page.flags.deadGuys[env.stage.name]) page.flags.deadGuys[env.stage.name] = []

        try{
            page.flags.deadGuys[env.stage.name].push(Number(el.getAttribute('origin-spot')))
        } catch(e) { /* no element */ }
    },

    has: (slug) => {
        return env.rpg.turnOrder.some(member => member.slug.includes(slug))
    }
}



//////////COMBAT-ADJACENT MENUS
if(!body.querySelector('#party-menu')) body.insertAdjacentHTML('beforeend', '<div id="party-menu" class="menu-box menu" menu="party"></div>')
/* fills in #party-menu with party info and inventory usage ability */
function togglePartyMenu(refresh = false) {
    if(env.rpg?.active && !env.rpg?.dry) {
        return; // don't fuck with a combat that's already open
    }

    if(!body.querySelector('#party-menu')) body.insertAdjacentHTML('beforeend', '<div id="party-menu" class="menu-box menu" menu="party"></div>')
    if(body.getAttribute('menu') == 'party' && refresh == false) {
        if(unsavedMenuWarning()) return; else env.unsavedChanges = false
        
        body.classList.remove('in-menu')
        body.setAttribute('menu', 'none')
        toggleCrittaMenu() //only does anything if there is one on-page
        MUI('off') // call this again to trigger freemove related stuff

        if(window.vn) {
            vn.hideStage(false, false)
            vn.fadeChars(false)
        }
    } else {
        MUI('off')

        if(window.vn) {
            vn.hideStage(false, false)
            vn.fadeChars(false)
        }

        if(env?.stage?.freemove) setTimeout(()=>{
            toggleMouseLook(false)
            
            //notify the user where their mouse is
            mousePing({duration: 400})
        }, 100)

        //clear the menu, set up with new stuff
        let menu = document.querySelector('#party-menu')
        if(check("PAGE!!embassy_day", 3.99)) menu.classList.add("e4menu")
        // <div class="augmentmenu button" onclick="toggleAugmentMenu()">AUGMENTS</div>
        menu.innerHTML = `
            <div class="menureturn button" onclick="exitMenu()">RETURN</div>
            <div id='party-members' class='${page.party.reorganizable ? "reorganizable" : ""}'></div>
            <div id="party-inventory">
                <h3>Inventory</h3>
            </div>
        `
        let memMenu = document.querySelector('#party-members')
        let invMenu = document.querySelector('#party-inventory')

        //used to clean up events here
        function clearItemSelection() {
            memMenu.classList.remove('party-targeting')
            memMenu.querySelectorAll('.eligible').forEach(el=>{
                el.classList.remove('eligible')
                el.querySelector('.item-clicktarget').remove()
            })
            
            memMenu.querySelectorAll('.use-event').forEach(el=>{
                el.removeEventListener('click', el.useEvent)
            })

            invMenu.querySelectorAll('target-origin').forEach(el=>el.classList.remove('target-origin'))
            togglePartyMenu(true)
        }
        
        //sort party members so gone members are at the end
        page.party.sort((a, b) => {
            const aGone = check(`PAGE!!${a.slug}-gone`)
            const bGone = check(`PAGE!!${b.slug}-gone`)
            return aGone - bGone
        })

        //for each party member, we add a div with all their info
        page.party.forEach((member, i) => {
            if(i == 0 && page.party.reorganizable) memMenu.insertAdjacentHTML('beforeend', `
                <h3 class="party-title party-active">ACTIVE MEMBERS</h3>
            `)

            //separator if over 3 members
            if(i == (page.party.partyLimit || 3) && page.party.reorganizable) memMenu.insertAdjacentHTML('beforeend', `
                <h3 class="party-title party-inactive">INACTIVE MEMBERS</h3>
            `)
            
            memMenu.insertAdjacentHTML('beforeend', generatePartySlide(member, {useDryReference: true}))
        })

        //set up reorg methods, ONLY if reorg is enabled
        if(page.party.reorganizable) {
            env.draggable = new Draggable.Swappable(memMenu.querySelectorAll(`.partymember:not(.partymember-gone)`), {
                draggable: '.partymember',
                swapThreshold: 0.5,
                mirror: {
                    appendTo: document.body,
                    clone: true,
                    constrainDimensions: true
                },
            })    

            env.draggable.on("drag:start", e => {                
                if(
                    memMenu.classList.contains('party-targeting') ||
                    e.data.sensorEvent.data.target.classList.contains("partymember-edit") ||
                    e.data.sensorEvent.data.target.closest("partymember-equipment")
                ) {
                    e.cancel()
                    return //no dragging during item use, equipment, or edittyy
                }

                //storing the original index because it actively swaps while dragging around, but still remembers the origin point
                let partyLimit = page.party.partyLimit || 3
                let sourceIndex = Array.from(e.source.parentElement.children).indexOf(e.source)
                
                if(page.party.reorganizable) {
                    sourceIndex = sourceIndex - 1 //active members title adjustment
                    if(sourceIndex >= partyLimit) sourceIndex = sourceIndex - 1 //inactive members titles adjustment
                }
                
                document.querySelector("#party-members").classList.add('reorganizing')
                e.source.dataset.originalIndex = sourceIndex
                e.source.dataset.member = page.party[sourceIndex].slug
            })

            env.draggable.on("drag:stop", e => {
                document.querySelector("#party-members").classList.remove('reorganizing')
            })

            env.draggable.on('mirror:create', (e) => {
                e.source.style.opacity = '0.5';
                e.source.classList.remove('just-saved', 'omega-saved');
            })

            env.draggable.on('swappable:swap', (e)=>{
                let partyLimit = page.party.partyLimit || 3
                let sourceIndex = Array.from(e.dragEvent.source.parentElement.children).indexOf(e.dragEvent.source)
                let overIndex = Array.from(e.over.parentElement.children).indexOf(e.over)
                
                //indices get adjusted for the title elements cause i'm sillay
                if(page.party.reorganizable) {
                    sourceIndex = sourceIndex - 1 // active members title
                    if(sourceIndex >= partyLimit) sourceIndex = sourceIndex - 1 // inactive members
                    
                    overIndex = overIndex - 1 // ditto
                    if(overIndex >= partyLimit) overIndex = overIndex - 1
                }
                
                // Get the original index from drag:start
                let originalIndex = parseInt(e.dragEvent.source.dataset.originalIndex)
                let sourceMember = page.party[sourceIndex]
                let overMember = page.party[overIndex]
                
                //moving a required member out
                let originalMember = page.party.find(m=>m.slug == e.dragEvent.source.dataset.member)
                if(originalMember?.mustBeInParty && originalIndex < partyLimit && overIndex >= partyLimit) {
                    e.cancel()
                    return
                }
                
                //trying to swap with a mustbeinparty member
                if(overMember?.mustBeInParty && overIndex < partyLimit && originalIndex >= partyLimit) {
                    e.cancel()
                    return
                }
            })

            env.draggable.on('swappable:swapped', (e)=>{
                newOrder = []

                document.querySelectorAll('#party-members .partymember:not(.draggable--original)').forEach(el=>{
                    newOrder.push(page.party.find(member => member.slug == el.getAttribute('memberslug')))
                })

                //console.log(newOrder)

                newOrder.forEach((member, i) => {
                    //console.log('updating', )
                    page.party[i] = member
                })

                if(window.vn) window.vn.renderParty()
                updateStageCreature()
            })
        }

        //also construct the inventory display
        page.party.inventory.forEach(itemRef => {
            let item = itemRef[0];
            var usable = "";
            var useClass = "none";
            var usage = "";
            let itemAction = check("PAGE!!2dcombat") ? (item.sceneAction || item.combatAction) : item.combatAction

            if(item.type == "equipment") {
                useClass = "eq";
                let status = env.STATUS_EFFECTS[item.alterations.find(a=>a[0] == "STATUS")[1]]
                usage = `
                    <div class="item-usage">
                        <span class="item-eq">${definitionRender({getAttribute: () => `STATUS++${status.slug}`}, {returnHTML: true})}</span>
                        ${/* temporary maybe-permanent disable of this */ false && status?.grantsActions ? 
                            status.grantsActions.map(grantActionSlug => {
                                let grantAction = env.ACTIONS[grantActionSlug]
                                return `<span class="item-ic"><span definition="ACTION++${grantAction.slug}">${grantAction.name.toUpperCase()}</span></span>`
                            }).join("\n")
                        : ``}
                    </div>
                `
                usable = "equip to actor using [+] icon"

            } else if(item.exec && itemAction) {
                usable = "usable now or in combat::click to use";
                useClass = "both";
                usage = `
                    <div class="item-usage">
                        <span class="item-ic item-legacy"><span definition="ACTION++${itemAction.slug}">${itemAction.name.toUpperCase()}</span></span>
                        <span class="item-ooc item-legacy">${processHelp(item, {specialObj: item.oocnote})}</span>
                    </div>
                `;

            } else if(item.exec) {
                usable = "usable out of combat::click to use";
                useClass = "ooc";
                usage = `
                    <div class="item-usage">
                        <span class="item-ooc item-legacy">${processHelp(item, {specialObj: item.oocnote})}</span>
                    </div>
                `;

            } else if(itemAction) {
                usable = "usable in combat";
                useClass = "ic";
                usage = `
                    <div class="item-usage">
                        <span class="item-ic item-legacy"><span definition="ACTION++${itemAction.slug}">${itemAction.name.toUpperCase()}</span></span>
                    </div>
                `;
            }

            invMenu.insertAdjacentHTML('beforeend', `
                <div class="item item-${item.slug}" usability="${useClass}">
                    <div class="item-portrait ${item.noteClass ? item.noteClass : ""}">
                        <img class="item-image${item.imgClass ? ` ${item.imgClass}`: ""} " src="${item.image}">
                    </div>
                    <div class="item-details">
                        <div class="item-stats">
                            <div class="item-name">${item.name}</div>
                            ${item.infinite ? "" : `<div class="item-qty">${item.max ? itemRef[1] : itemRef[1] > 1 ? itemRef[1] : ''}${item.max ? ` / ${item.max}` : `${itemRef[1] > 1 ? ' held' : ''}`}</div>`}
                        </div>
                        <div class="item-description">::FUNCTION::${item.description}</div>
                        ${usage}
                        ${usable ? `<div class="item-usability">${usable}</div>` : ""}
                    </div>
                    ${page.party.crittamode && item.slug != "sfer_cube" ? `
                    <div class="item-sell">
                        <button definition="NOTE::'exchange for 1 sfer cube'${canSellItem(item) ? "" : ";'must have unequipped quantity'"}" class="item-sell-button button nodefstyle" ${canSellItem(item) ? "" : "disabled"} onclick="sellItem('${item.slug}')">SELL</button>
                    </div>                        
                    ` : ''}
                </div>
            `)

            let itemEl = invMenu.querySelector(`.item-${item.slug}`)
         
            //set up the usage event if it's something they can use out of combat
            if(useClass == "ooc" || useClass=="both") {
                //set up the confirmation notice based on what kind of item type it is
                var confirmation = `
                    <span class="item-usage-popup item-targeting-${item.type}">
                        <span class="item-name">${item.name}</span>
                        <span class="item-ooc">${processHelp(item, {specialObj: item.oocnote})}</span>
                        <span class="item-use">DO IT</span>
                        <span class="item-cancel">NEVERMIND</span>
                    </span>
                `;
                itemEl.insertAdjacentHTML('beforeend', confirmation);

                //set up the event to...
                    //add party-targeting to .party-targets
                    //add .target-origin to the item
                    //add .eligible to eligible targets, along with a top-level click target
                    //add the click event to click targets
                let itemRef = item //creates permanent ref for click event below
                itemEl.addEventListener('click', (ev)=>{
                    if(!memMenu.classList.contains('party-targeting')) { //only do this if you aint already targeting
                        memMenu.classList.add('party-targeting')
                        itemEl.classList.add('target-origin')
                        
                        console.log("testing for", itemRef.slug, itemRef, itemRef.type)
                        if(itemRef.type == "target") {
                            memMenu.querySelectorAll('.partymember').forEach(el=>{
                                if(!el.classList.contains("partymember-gone")) {
                                    el.classList.add('eligible') //this may become more granular later (i.e. only target living)
                                    el.insertAdjacentHTML('beforeend', `<div class="item-clicktarget" memberslug="${el.getAttribute('memberslug')}"></div>`)
                                }
                            })

                            memMenu.querySelectorAll('.item-clicktarget').forEach(el=>{
                                let useEvent = ()=> { 
                                    let target = page.party.find(member=>member.slug == el.getAttribute("memberslug"));
                                    env.ITEM_EXEC[itemRef.exec](target)
                                    clearItemSelection()
                                }

                                el.useEvent = useEvent
                                el.classList.add("use-event")
                                el.addEventListener('click', useEvent)
                            })
                        } else {
                            let useEvent = ()=> { 
                                env.ITEM_EXEC[itemRef.exec]()
                                clearItemSelection()
                            }

                            document.querySelectorAll('.item-use').forEach(el=>{
                                try{
                                    el.addEventListener('click', useEvent)
                                    el.classList.add("use-event")
                                    el.useEvent = useEvent
                                }catch(e){printError(e)}
                            })
                        }

                        menu.querySelectorAll(`.item-clicktarget`).forEach(e=>{
                            e.addEventListener('mouseenter', ()=>play('muiHover'))
                            e.addEventListener('click', ()=> play('muiClick'))
                        })
                    }
                })
            }
        });

        //on nevermind click, revert to normal
        menu.querySelectorAll('.item-cancel').forEach(el=>el.addEventListener('click', clearItemSelection))

        //set up sound effects
        menu.querySelectorAll(`.menureturn, .item[usability="both"], .item[usability="ooc"], .item-cancel, button`).forEach(e=>{
            e.addEventListener('mouseenter', ()=>play('muiHover'))
            e.addEventListener('click', ()=> play('muiClick'))
        })

        //show menu
        body.classList.add('in-menu')
        body.setAttribute('menu', 'party')
        if(!refresh) play('muiScanner')

        //all animations should have played
        env.queuedItemAnimations = []
    }
}

//used to open or close the customization menu for component-based characters
//the HTML isn't generated here since this is a custom self-contained HTML element, we just add it to the page!
//additionally, it behaves a little differently from other menus, since this one is open /while/ you're in the party menu.
function toggleCrittaMenu(memberSlug) {
    let existingMenu = body.querySelector('critta-menu')

    if(!existingMenu) { //toggle menu on
        if(!memberSlug) return
        body.insertAdjacentHTML("beforeend", `<critta-menu menu="party" member="${memberSlug}"></critta-menu>`) // no fancy animation for now
        clearTimeout(env.closeCrittaMenuTimeout)
        setTimeout(()=>{body.querySelector("critta-menu").style.opacity = 1}, 100)

        if(window.vn) {
            vn.hideStage(true, true)
            vn.fadeChars(true)
        }

    } if(existingMenu && !memberSlug) { //no member specified is always a toggle menu off
        env.unsavedChanges = false
        body.querySelector("critta-menu").style.opacity = 0
        env.closeCrittaMenuTimeout = setTimeout(()=>existingMenu.remove(), 500)

        if(window.vn) {
            vn.hideStage(false, false)
            vn.fadeChars(false)
        }

    } else if(existingMenu && memberSlug != existingMenu.getAttribute("member")) { // swap to new member
        if(unsavedMenuWarning()) return; else env.unsavedChanges = false;
        existingMenu.setAttribute("member", memberSlug)
    }
}

//takes a party member and generates a party menu slide for them
function generatePartySlide(member, {useDryReference = false, noEquipment = false, detailedPassives = false} = {}) {
    let combatActor = env.COMBAT_ACTORS[member.combatActor]
    let title 
    let editable = false
    let maxhp = combatActor.maxhp

    // defined characters have classes, while modular ones need some extra generation
    if(!member.components) {
        title = `
        <div class="partymember-subtitle partymember-liner nodefstyle" ${combatActor.description ? `definition="ACTOR::${combatActor.description}"` : ""}>
            <span class="partymember-filler"></span>
            <span class="partymember-class">${member.class}</span>
            <span class="partymember-filler"></span>
        </div>`
    } else {
        if(!env?.crittaMap?.disableShellEditing) editable = true
        title = `
        ${!env?.crittaMap?.disableShellEditing ? 
            `<div class="partymember-editzone partymember-liner">
                <button class="button partymember-edit" onclick="toggleCrittaMenu('${member.slug}')" definition="INFO::'alter composition of combative thoughtform'">Modify</button>
            </div>` 
            : 
            ``
        }
        ${generateComponentDisplay(member)}
        `   
    }

    if(member.critta) {
        let stats = generateCombatStats(member)
        if(stats) if(stats.maxhp) maxhp += stats.maxhp
    }

    let passives = ""
    let passiveStatusList = getPassiveStatusesForPartyMember(member)
    if(detailedPassives){
        for(const passive of passiveStatusList) {
            passives += `
                <div class="partymember-fullpassive" definition="STATUS++${passive.slug}">
                    ${definitionRender({getAttribute: () => `STATUS++${passive.slug}`}, {returnHTML: true})}
                </div>
            `.replace("::</h6>", "</h6>")
        }
    } else for(const passive of passiveStatusList) {
        passives += `
            <div class="partymember-passive status-effect passive-${passive.slug} ${passive.beneficial ? String(passive.beneficial).replace("true", "good") : "bad"} ${passive?.impulse?.type && passive?.impulse?.type != "common" ? `${passive.impulse.type}-impulse` : ""}" 
                style="--img: url(${passive.icon || `/img/placeholdportrait.gif`})"
                definition="STATUS++${passive.slug}"
            ></div>
        `
    }

    let currentHP = typeof member.hp == "undefined" ? maxhp : member.hp
    if(currentHP > maxhp) currentHP = maxhp; //overflow is purely visual since HP is set correctly on combat start
    let displayHP = page.party.noPreserveHealth ? maxhp : `${currentHP}/${maxhp}`

    let gone = false
    if(check(`PAGE!!${member.slug}-gone`)) {
        let val = check(`PAGE!!${member.slug}-gone`) // can be custom string
        gone = true
        displayHP = val && val !== true ? val : "gone"
    }

    let slide = `
    <div class="partymember partymember-${member.slug} ${check(`PAGE!!${member.slug}-gone`) ? "partymember-gone" : ""} ${member.critta ? "crittamember" : ""} ${member.justSaved ? member.justSaved : ""} ${page.party.reorganizable && !check(`PAGE!!${member.slug}-gone`) ? "draggable" : ""} ${editable ? "partymember-editable" : ""}" memberslug="${member.slug}">
        <div class="partymember-title partymember-liner">
            <span class="partymember-name">::${member.name}::</span>
            <span class="partymember-filler"></span>
            <span class="partymember-hp" data-hp="${currentHP}">${displayHP}</span>
        </div>

        <img src="${member.portraitUrl || combatActor.portraitUrl}" class="partymember-portrait" aria-hidden="true">

        <div class="partymember-actions">
            <h2>Actions</h2>
            ${generatePartyActions(member, {createDryReference: useDryReference})}
        </div>
        
        ${
            noEquipment ? "" :
            `<partymember-equipment member="${member.slug}" ${gone ? "gone" : ""}></partymember-equipment>`
        }        

        ${passives ? `<div class="partymember-passives passives ${detailedPassives ? "detailed-passives" : ""} ${passiveStatusList.length > 12 ? passiveStatusList.length > 30 ? "megaoverflow" : "passiveoverflow" : ""}">
            ${passives}
        </div>`: ``}

        ${title}
    </div>`

    delete member.justSaved
    return slide
}

//returns an HTML string for displaying party member composition
function generateComponentDisplay(member) {
    if(!member.components) return;
    let stats = generateCombatStats(member)
    let returnStats = {
        core: "",
        in: "",
        out: ""
    }

    for (const statName in stats) {
        const statInfo = env.STATDATA[statName]
        if(statInfo) {
            var statValue = stats[statName]

            //we show all HP if a member is specified
            if(statName == "maxhp") statValue += env.COMBAT_ACTORS[member.combatActor].maxhp
            
            let list = "core"
            if(statName.includes("incoming")) list = "in"
            else if(statName.includes("outgoing")) list = "out"

            returnStats[list] += `\n${statValue > 0 && statName != "maxhp" ? "+" : ""}${statInfo.percentage ?
                    `${statValue * 100}%`
                    :
                    statValue
                } ${statInfo ? statInfo.display : statName}`
        }
    }

    //also accumulate totals of components
    let componentTotals = {}
    for (const slot in member.components) {
        const component = env.COMBAT_COMPONENTS[member.components[slot]]

        componentTotals[component.name] = componentTotals[component.name] || 0
        componentTotals[component.name] += 1
    }

    if(member.augments) for (const augmentSlug of member.augments) {
        let augment = env.ACTOR_AUGMENTS.generic[augmentSlug]
        if(augment?.component) {
            let component = env.COMBAT_COMPONENTS[augment.component[1]]
            componentTotals[component.name] = componentTotals[component.name] || 0
            componentTotals[component.name] += 2
        }
    }
    
    console.log("component totals for", member.slug, componentTotals)

    let componentTotalString = ""
    for (const compName in componentTotals) {
        componentTotalString += `\n${compName.toUpperCase()}::${componentTotals[compName]}`
    }

    return `<div class="partymember-composition" definition="BASE STATS::${componentTotalString}${(returnStats.core + returnStats.in + returnStats.out) || "\n10HP"}">
        <div class="partymember-slot" slot="primary" component="${member.components.primary}"></div>
        <div class="partymember-slot" slot="secondary" component="${member.components.secondary}"></div>
        <div class="partymember-slot" slot="utility" component="${member.components.utility}"></div>
    </div>`
}

//gets an HTML string list of actions this party member can use
//highlights windup actions as well
//ing update - creating a dry reference makes a fake env.rpg actor object with all initial statuses, etc.
//this lets us have statuses that alter actions/status grants be reflected in da menus
function generatePartyActions(member, {createDryReference = false, actor} = {}) {
    let returnString = ``
    let combatActor = env.COMBAT_ACTORS[member.combatActor || member.originalSlug]
    if(member.mimic) combatActor = member.mimic
    if(createDryReference) {
        updateStats({actor: initializeActor(member, {dry: true, usePartySlug: true}) })
    }

    let pool = combatActor.actions
    if(check("PAGE!!embassy_day", 3.99)) pool = combatActor.sceneActions || pool

    returnString += generatePoolActions(member, pool, {useDryReference: createDryReference, actor})
    if(combatActor.windupActions && !check("PAGE!!embassy_day", 3.99)) returnString += generatePoolActions(member, combatActor.windupActions, {poolClass: 'windup-action', poolNotice: "'requires WINDUP';", useDryReference: createDryReference, actor})

    return returnString
}

//takes a party member and ability pool and generates an HTML list for that pool
function generatePoolActions(member, pool, {poolClass = "", poolNotice = "", useDryReference = false, actor} = {}) {
    let returnString = ``

    pool = getAlteredActorActions({member, specificPool: pool})
    pool.forEach(actionSlug => {
        let action = env.ACTIONS[actionSlug]
        returnString += `
            <span class="partymember-action ${poolClass} ${action.itemAction ? 'itemaction' : ''}" definition="ACTION++${action.slug}" ${(!actor && useDryReference) ? `fromactor="${member.slug}"` : ""} ${(actor && !useDryReference) ? `fromactor="${actor.slug}"` : ""}>
                ${action.name}
            </span>
        `
    })

    return returnString
}

//takes a member object and gets their stats for their actor
//returns false if no stats generated
function generateCombatStats(member) {
    let stats = false

    if(member.components) for (const componentSlot in member.components) {
        const component = env.COMBAT_COMPONENTS[member.components[componentSlot]][componentSlot] //i.e. env.COMBAT_COMPONENTS['eyes']['primary']
        
        if(component.stats) {
            for (const statName in component.stats) {
                const statValue = component.stats[statName]
                if(!stats) stats = {}
                        
                if(!stats[statName]) stats[statName] = statValue
                else stats[statName] += statValue
            }
        }
    }

    //alterations presently only supports specific stats, otherwise the stat object would be weird and messy
    if(member.alterations) for (const [name, value] of member.alterations) {
        switch(name) {
            case "maxhp":
                if(!stats) stats = {}
                if(!stats[name]) stats[name] = value
                else stats[name] += value
            break
        }
    }

    return stats
}

//takes a party member, returns a list of status objects that they have from alterations/components/augments
function getPassiveStatusesForPartyMember(member) {
    let statuses = new Set()

    if(member.components) for (const componentSlot in member.components) {
        const component = env.COMBAT_COMPONENTS[member.components[componentSlot]][componentSlot] //i.e. env.COMBAT_COMPONENTS['eyes']['primary']
        if(component.alterations) for (const alteration of component.alterations) {
            if(alteration[0] == "STATUS") statuses.add(env.STATUS_EFFECTS[alteration[1]])
            else if(alteration[0] == "ACTORSTATUS" && member.combatActor == alteration[2]) statuses.add(env.STATUS_EFFECTS[alteration[1]])
        }
    }

    if(member.augments) if(env.ACTOR_AUGMENTS[member.combatActor]) for (const augmentName of member.augments) {
        const augment = env.ACTOR_AUGMENTS[member.combatActor][augmentName] || env.ACTOR_AUGMENTS["all"][augmentName]
        if(augment?.alterations) for (const alteration of augment.alterations) {
            if(alteration[0] == "STATUS") statuses.add(env.STATUS_EFFECTS[alteration[1]])
            else if(alteration[0] == "ACTORSTATUS" && member.combatActor == alteration[2]) statuses.add(env.STATUS_EFFECTS[alteration[1]])
        }
    }

    /* presently we don't want to do this because the item slots act as passive info on hover
    if(member.equipment && member.equipment?.length) {
        member.equipment.forEach(itemSlug=>{
            let equipment = env.ITEM_LIST[itemSlug]
            if(equipment.alterations) for (const alteration of equipment.alterations) {
                if(alteration[0] == "STATUS") statuses.add(env.STATUS_EFFECTS[alteration[1]])
                else if(alteration[0] == "ACTORSTATUS" && member.combatActor == alteration[2]) statuses.add(env.STATUS_EFFECTS[alteration[1]])
            }
        })
    }
    */

    if(member.alterations) for (const alteration of member.alterations) {
        if(alteration[0] == "STATUS") {
            let uniqueStatus = { ... env.STATUS_EFFECTS[alteration[1]] }
            uniqueStatus.beneficial = "unique"
            statuses.add(uniqueStatus)
        }
    }

    return [... statuses]
}

function partyHasLowHealth () {
    isLow = false
    
    page.party.forEach(member=>{
        if(member.hp <= (env.COMBAT_ACTORS[member.combatActor].maxhp / 2)) isLow = true
    })
    
    return isLow
}

/* SPECIAL COMBAT AUDIO CONTROLS */
//when you crit, the music slows down a little for a brief time
function playCombatCrit(soundName = 'crit', pitch) {
    forcePlay(soundName, pitch);
    if(env.critSpeedUp) return

    if(!env.bgm.intendedRate) env.bgm.intendedRate = env.bgm.rate()
    
    let lastBgmSeen = env.bgm._src
    env.critSpeedUp = true
    let briefRate = ((env.bgm.rate() - 0.4) < 0) ? 0.1 : env.bgm.rate() - 0.4
    ratween(env.bgm, briefRate, env.ADVANCE_RATE * 0.2)
    setTimeout(()=>{
        if(env.bgm._src == lastBgmSeen) ratween(env.bgm, env.bgm.intendedRate, env.ADVANCE_RATE * 0.75)
        env.critSpeedUp = false
    }, env.ADVANCE_RATE * 0.21)
}

/* INVENTORY CONTROLS */
//adds an item to the inventory
//stacks existing ones
//returns FALSE if it's old and at its max or would go over
//can take either an object (old way) or item slug string (new way - wanted to standardize a bit)
function addItem(newItem, n = 1) {
    let itemObj = typeof newItem == "string" ? env.ITEM_LIST[newItem] : newItem

    if(!itemObj) {
        chatter({actor: 'actual_site_error', text: `you're trying to add an item that doesn't exist!`, readout: true})
        itemObj = env.ITEM_LIST.error
    }

    let i = page.party.inventory.findIndex(item => item[0].slug === itemObj.slug);
    let newNum

    // postep4todo: make item adds not fail if they WOULD go over max, only if they ARE at max
    // only reason this isn't done for EP4 is because it would screw with loot dialogue in earlier episodes that rely on the failure
    if(i >= 0) {
        if(itemObj.max && (page.party.inventory[i][1] + n) > itemObj.max) { return false }
        page.party.inventory[i][1] += n
        newNum = page.party.inventory[i][1]
    } else { //it's new, ignore anything over the max
        let maxN = itemObj.max ? ((n < itemObj.max) ? n : itemObj.max) : n
        page.party.inventory.push([itemObj, maxN])
        newNum = maxN
    }

    document.dispatchEvent(new CustomEvent('corru_changed', { detail: { key: `ITEM!!${itemObj.slug}`, value: newNum} }));
    return true
}

//removes an item (object from main list) from inventory
//can also take a string for the slug
//returns false if you didn't have any
function removeItem(removeItem, n = 1) {
    let itemObj = typeof removeItem == "string" ? env.ITEM_LIST[removeItem] : removeItem

    let i = page.party.inventory.findIndex(item => item[0].slug === itemObj.slug);
    if(i >= 0) {
        if((page.party.inventory[i][1] - n) <= 0) {
            page.party.inventory.splice(i, 1);
            document.dispatchEvent(new CustomEvent('corru_changed', { detail: { key: `ITEM!!${itemObj.slug}`, value: 0} }));
        } else {
            page.party.inventory[i][1] -= n;
            document.dispatchEvent(new CustomEvent('corru_changed', { detail: { key: `ITEM!!${itemObj.slug}`, value: page.party.inventory[i][1]} }));
        }

        return true;
    } else {
        return false;
    }
}

// crittamode specific but built into main party menu
// sells ONE of a selected item for 1 sfer_cube
// only works if its quantity isn't fully equipped
function sellItem(sellItem) {
    if(canSellItem(sellItem)) {
        let itemObj = typeof sellItem == "string" ? env.ITEM_LIST[sellItem] : sellItem
        removeItem(itemObj, 1)
        chatter({actor: 'plainsys', text: `resource exchanged for 1 sfer cube`, readout: true})
        addItem('sfer_cube', 1)
        if(body.getAttribute('menu') == 'party') togglePartyMenu(true)
    }
}

function canSellItem(sellItem) {
    let itemObj = typeof sellItem == "string" ? env.ITEM_LIST[sellItem] : sellItem
    let i = page.party.inventory.findIndex(item => item[0].slug === itemObj.slug);
    if(i >= 0) {
        if(itemObj.type == "equipment") {
            let totalEquipped = 0
            page.party.forEach(member=>{
                if(member.equipment) member.equipment.forEach(equippedItemSlug=>{
                    if(equippedItemSlug == itemObj.slug) totalEquipped += 1
                })
            })

            if(totalEquipped >= page.party.inventory[i][1]) return false
        }
        return true 
    } else {
        return false
    }
}

//checks for an item (object from main list )
//can also take a string slug name
//returns the amount you have
function checkItem(checkItem) {
    if(!page.party) { console.warn("tried to check for an item on a page with no party"); return false; }

    let effectiveCheckItem = typeof checkItem == "string" ? env.ITEM_LIST[checkItem] : checkItem
    if(!effectiveCheckItem) {
        chatter({actor: 'actual_site_error', text: `you're checking for an item that doesn't exist!`, readout: true})
    }
    let i = page.party.inventory.findIndex(item => item[0].slug === effectiveCheckItem.slug);

    var amt = 0;
    if(i >= 0) {
        amt = page.party.inventory[i][1];
    }
    return amt;
}

//checks to see if an item is at its max in inventory
//can also take a string slug name
//returns true/false
function maxxedItem(checkItem) {
    let effectiveCheckItem = typeof checkItem == "string" ? env.ITEM_LIST[checkItem] : checkItem
    let i = page.party.inventory.findIndex(item => item[0].slug === effectiveCheckItem.slug)

    if(i >= 0) {
        if((page.party.inventory[i][1]) >= effectiveCheckItem.max) return true 
    }

    return false    
}

/* AUGMENT CONTROLS */
//returns an array of characters, their augments, whether they're in use and can be afforded, etc.
//intended for use with UI elements
//requires that page.party exists
function getAugments() {
    if(!page.flags.augmentCount) page.flags.augmentCount = 0
    if(!page.flags.augmentMax) page.flags.augmentMax = 3

    function arrayify(poolObj) {
        let pool = []
        for (const augmentName in poolObj)  pool.push(poolObj[augmentName])
        return pool
    }

    //for each party member, display augments and their states
    let globalPool = arrayify(env.ACTOR_AUGMENTS.all)
    let augmentsData = {}

    page.party.forEach(member=>{
        let pool = [... arrayify(env.ACTOR_AUGMENTS[member.combatActor] || {})].concat(globalPool)
        let returnPool = []

        pool.forEach(augment=>{
            let inUse = false
            if(member.augments) if(member.augments.find(aug => aug == augment.slug)) inUse = true

            let show = getShowValidity(augment.showIf, member)
            if(member.components && augment.component) {
                if(member.components[augment.component[0]] != augment.component[1]) show = false
            }
            
            if(show) {
                returnPool.push(
                    {
                        augment,
                        unlocked: getShowValidity(augment.unlocks),
                        affordable: augment.cost <= page.flags.augmentMax - page.flags.augmentCount,
                        inUse 
                    }
                )
            }
        })

        if(returnPool.length) {
            augmentsData[member.slug] = returnPool
        }
    })

    return augmentsData
}

function addAugment(memberSlug, augmentSlug) {
    let member = page.party.find(mem=>mem.slug == memberSlug)
    let augment = env.ACTOR_AUGMENTS.all[augmentSlug] || env.ACTOR_AUGMENTS[member.combatActor][augmentSlug]

    if(!member.augments) member.augments = []
    member.augments.push(augmentSlug)
    
    if(augment.equipExec) augment.equipExec(memberSlug)

    if(!page.flags.augmentCount) page.flags.augmentCount = augment.cost
    else page.flags.augmentCount += augment.cost
}

function removeAugment(memberSlug, augmentSlug) {
    let member = page.party.find(mem=>mem.slug == memberSlug)
    let augment = env.ACTOR_AUGMENTS.all[augmentSlug] || env.ACTOR_AUGMENTS[member.combatActor][augmentSlug]

    member.augments = member.augments.filter(aug => aug != augmentSlug)
    if(member.augments.length == 0) delete member.augments

    if(augment.unequipExec) augment.unequipExec(memberSlug)

    if(page.flags.augmentCount) page.flags.augmentCount = Math.max(0, page.flags.augmentCount - augment.cost)
}

//ing update - equipment functions very similar structure to augments, but enough of a different system to justify its own handling
//no need to check for equipment slot limits here because that's handled in the UI
//slotIndex is optional in both of these
function addEquipment(memberSlug, itemSlug, slotIndex) {
    console.log(itemSlug, slotIndex)
    let member = page.party.find(mem=>mem.slug == memberSlug)
    let equipment = env.ITEM_LIST[itemSlug]
    if(!equipment || !equipment.type == "equipment") throw printError("that item either doesn't exist or isn't equipment")
    
    if(!member.equipment) member.equipment = []
    if(!env.queuedItemAnimations ) env.queuedItemAnimations = []
    env.queuedItemAnimations.push({memberSlug, slotIndex})

    if(typeof slotIndex !== 'undefined') {
        if(member.equipment[slotIndex]) { removeEquipment(memberSlug, member.equipment[slotIndex], slotIndex) }
        member.equipment[slotIndex] = itemSlug
    } else member.equipment.push(itemSlug)
}

function removeEquipment(memberSlug, itemSlug, slotIndex) {
    console.log('removing', itemSlug, slotIndex)
    let member = page.party.find(mem=>mem.slug == memberSlug)

    let equipment = env.ITEM_LIST[itemSlug]
    if(!equipment || !equipment.type == "equipment") throw printError("that item either doesn't exist or isn't equipment")
    
    if(!member.equipment) return;
    
    if(typeof slotIndex !== 'undefined') if(member.equipment[slotIndex] === itemSlug) {
        delete member.equipment[slotIndex]
    } else member.equipment = member.equipment.filter(item => item != itemSlug)
}

function hasEquipment(memberSlug, itemSlug) {
    let member = page.party.find(mem => mem.slug == memberSlug)
    if(!member?.equipment) return false
    
    return member.equipment.includes(itemSlug)
}

//takes an array of actions (initialPool), spits out an altered list based on alterations provided
//alterations can be from whatever (i.e. augment or party-level), just gotta pass the alteration list directly
function makeAlterations({initialPool, alterationList, actor}) {
    //alterations are arrays: ["origin ability name/special keyword", "new ability name"]
    //and alterationList is just an array of those
    //"ADD" is a special origin that will just add it to the actor
    let newPool = [... initialPool]

    alterationList.forEach(alter=>{
        let originAbility = alter[0]
        let newAbility = alter[1]
        let tertiaryData = alter[2] || ""

        // TODO - update windup across the board to not use a separate pool... this gets fucked up
        // we could just make it so that actions have statuses they require in order to work, maybe statuses hide abilities or something. idk but i hate multiple pools
        switch(originAbility) {
            case "ADD_WINDUP":
            case "ADD":
            case "ADDLEFT":
                if(originAbility.includes("_WINDUP") && actor) {
                    if(!actor.windupActions) {actor.windupActions = []}

                    if(originAbility == "ADDLEFT") actor.windupActions.unshift(newAbility)
                    else actor.windupActions.push(newAbility)
                } else if(originAbility.includes("_WINDUP")) { // for party view mainly - no actor is passed
                    if(!newPool.newWindupActions) newPool.newWindupActions = []
                    
                    if(originAbility == "ADDLEFT") actor.newWindupActions.unshift(newAbility)
                    else newPool.newWindupActions.push(newAbility)
                } else {
                    if(originAbility == "ADDLEFT") newPool.unshift(newAbility)
                    else newPool.push(newAbility)
                    
                }
            break


            case "STATUS":            
            case "ACTORSTATUS": // ["ACTORSTATUS", "passivename", "akizet"] - actor-conditional passive
                if(actor) {
                    if(originAbility == "ACTORSTATUS" && actor.slug != tertiary) return;

                    //this is a timeout because this only ever happens at the exact second combat starts
                    //if we just wait a lil then we can do addStatus as normal
                    if(actor.dry) addStatus({target: actor, status: alter[1], length: 1, noReact: true, runEvents: false, dontDrawIconLine: true, dry: true})
                    else setTimeout(()=>{
                        addStatus({target: actor, status: alter[1], length: 1, noReact: true, runEvents: false, dontDrawIconLine: true})
                    }, 100)
                }
            break

            case "REMOVE_WINDUP":
            case "REMOVE":
                if(originAbility.includes("_WINDUP") && actor) {
                    if(actor.windupActions) actor.windupActions = windupActions.filter(actionName => actionName != newAbility)
                } else {
                    newPool = newPool.filter(actionName => actionName != newAbility)     
                }           

                if(newAbility == "ALL") {
                    newPool = []
                }
            break

            default:
                try {
                    newPool[newPool.indexOf(originAbility)] = newAbility
                } catch(e) { console.log('ability swap failed', e)}
        }
    })

    return newPool
}

/* 
    processor function for handling the pipeline of character action alterations from a party member or enemy
    the order goes like this:
        COMPONENTS > AUGMENTS > EQUIPMENT > ALTERATIONS > TEAM ALTERATIONS
        components are used by generated characters for ep3add2
        augments are used by party members sometimes
        equipment is used by party members sometimes
        alterations can be applied abritrarily typically via special fishy items
        team alterations are provided via settings on startCombat, for EP3ADD2's zone effects

    actor can be passed to initiate statuses on them
    returns the final list of abilities they have
*/
function getAlteredActorActions({member, actor, specificPool = false, specificEquipment = false}) {
    let pool

    if(specificPool) pool = [... specificPool];
    else {
        let effectiveActor 
        if(member.combatActor) effectiveActor = env.COMBAT_ACTORS[member.combatActor]; // party member
        else effectiveActor = env.COMBAT_ACTORS[member.originalSlug]; // enemy actor object 

        //console.log("effectiveActor", effectiveActor, "with input", member, actor)

        //sometimes, actors might have special alternate action pools in 2D mode
        if(env?.rpg?.is2D && effectiveActor.sceneActions) {
            pool = [... effectiveActor.sceneActions]
        } else {
            pool = [... effectiveActor.actions]
        }
    }
    
    if(member.components) {
        for (const componentSlot in member.components) {
            const componentName = member.components[componentSlot]
            const component = env.COMBAT_COMPONENTS[componentName][componentSlot]
            if(component.alterations) pool = makeAlterations({initialPool: pool, alterationList: component.alterations, actor})
        }
    }

    //applies augment alterations in order
    //also accounts for if this party member is currently being edited as a generic actor
    if(member.augments || member.augmentChanges) {
        let allAugments = [... member.augments || []]
        
        if(member.augmentChanges) {
            allAugments = allAugments.concat(member.augmentChanges.add)
            allAugments = allAugments.filter(aug => !member.augmentChanges.remove.includes(aug))
        }

        allAugments.forEach(augmentName =>{
            let augment

            if(env.ACTOR_AUGMENTS[member.combatActor]) {
                augment = env.ACTOR_AUGMENTS[member.combatActor][augmentName] || env.ACTOR_AUGMENTS.all[augmentName]
            } else {
                augment = env.ACTOR_AUGMENTS.all[augmentName]
            }
            
            if(augment.alterations) pool = makeAlterations({initialPool: pool, alterationList: augment.alterations, actor})
        })
    }

    if(
        (member.equipment && member.equipment?.length) ||
        specificEquipment
    ) {
        let equipmentList = specificEquipment || member.equipment
        equipmentList.forEach(itemSlug=>{
            let equipment = env.ITEM_LIST[itemSlug]
            let alterations = equipment?.alterations

            // if we're not in combat but the equipment has a status,
            // it may grant actions - which we want to show in the party slides!
            if(!env?.rpg?.active && alterations?.length) {
                alterations = equipment.alterations.map(alt => [...alt])
                let actionGrants = []
                alterations.forEach(alt => {
                    console.log('checking alt', alt)
                    if(alt[0] == "STATUS") {
                        let passive = env.STATUS_EFFECTS[alt[1]]
                        if(passive.grantsActions) passive.grantsActions.forEach(act =>{
                            let actionObj = env.ACTIONS[act]
                            
                            //actions may be limited by their type if they're an itemAction
                            if(
                                !actionObj.itemAction ||
                                (
                                    actionObj.itemAction &&
                                    (
                                        (actionObj.itemAction == "2D" && check("PAGE!!2dcombat")) ||
                                        (actionObj.itemAction == "1D" && !check("PAGE!!2dcombat")) ||
                                        actionObj.itemAction === true
                                    )
                                )
                            ) actionGrants.push(["ADD", act])
                        })
                    }
                })
                alterations = alterations.concat(actionGrants)
            }

            if(equipment?.alterations) pool = makeAlterations({initialPool: pool, alterationList: alterations, actor})
        })
    }

    if(member.alterations) {
        pool = makeAlterations({initialPool: pool, alterationList: member.alterations, actor})
    }

    //finally, detect any alterations from the teamAlterations setting
    
    if(env.rpg) {
        let teamAlterations = env.rpg?.settings?.teamAlterations
        
        //CTRL only works in the embassy
        let ctrlActive = false
        if(
            actor?.team?.name != "neutral" &&
            check("PAGE!!embassy_day") &&
            (
                check("PAGE!!lever-Ξ") ||
                check("lever-Δ") ||
                check("lever-Λ") ||
                check("lever-Ψ")
            )
        ) {
            ctrlActive = true
        }

        if(env.rpg.active && (teamAlterations || ctrlActive)) {
            let combatAlterations = []
            if(!teamAlterations) teamAlterations = {}

            if(teamAlterations.all) combatAlterations = combatAlterations.concat(teamAlterations.all)
            if(actor) {
                if(ctrlActive && actor.team.name != "neutral") combatAlterations.push(["STATUS", "ctrl"])
                if(teamAlterations[actor.team.name]) combatAlterations = combatAlterations.concat(teamAlterations[actor.team.name]);
                if(teamAlterations[actor.originalSlug]) combatAlterations = combatAlterations.concat(teamAlterations[actor.originalSlug]);
            }

            pool = makeAlterations({initialPool: pool, alterationList: combatAlterations, actor})
        }
    }

    return pool
}

if(!body.querySelector('#augment-menu')) body.insertAdjacentHTML('beforeend', '<div id="augment-menu" class="obesk-menu menu" menu="augment"></div>')
function toggleAugmentMenu(refresh = false) {
    if(body.getAttribute('menu') == 'augment' && refresh == false) {
        exitMenu()
        if(window.vn) {
            vn.hideStage(true, true)
            vn.fadeChars(false)
        }
    } else {
        MUI('off')
        sfxmap.stop()
        env.recentSfx = false
        
        //clear the menu, set up with new stuff
        let menu = document.querySelector('#augment-menu')
        let augmentStatus = getAugments()
        //console.log('returning from status with', augmentStatus)

        //anonymous inner functions for updating stuff
        function getDots() { //show usage in dots
            let dots = ""
            let currentUsage = page.flags.augmentCount || 0
            for (let i = 0; i < (page.flags.augmentMax || 3); i++) {
                let newString = `<span class="augment-dot`
                if(currentUsage) {
                    currentUsage--
                    newString += ` augment-dot-used" definition="NOTICE::'augment point in use'"></span>`
                } else newString += `" definition="NOTICE::'augment point not in use'"></span>`

                dots += newString
            }

            return dots
        }

        function updateMembers() {
            page.party.forEach((member, i) => {
                let combatActor = env.COMBAT_ACTORS[member.combatActor]
                let memberAugmentList = augmentStatus[member.components ? member.slug : member.combatActor] // generated characters use their party slug
                if(!memberAugmentList) return

                document.querySelector(`.augment-member[slug="${member.slug}"]`).innerHTML = `
                    <div class="augment-member-portrait" slug="${member.slug}" style="--img: url(${combatActor.portraitUrl.replace('.gif', '_holo.gif')})">${member.name}</div>
                    <div class="augment-options">
                        ${(()=>{
                            let memberAugments = ""
                            
                            memberAugmentList.forEach(augmentData=>{
                                let augment = augmentData.augment
                                memberAugments += `<div class="augment-option"
                                    member="${member.slug}"
                                    actor="${member.combatActor}"
                                    slug="${augment.slug}"
                                    inuse="${augmentData.inUse}"
                                    unlocked="${augmentData.unlocked}"
                                    affordable="${augmentData.affordable}"
                                    cost="${augment.cost}"
                                    style="--img: url(${augment.image || "/img/sprites/combat/items/aimacyst.gif"})"
                                    definition="${augmentData.unlocked ? 
                                        `AUGMENT::'${augment.name}'\nCOST::${augment.cost}${augmentData.affordable || augmentData.inUse ? `${augmentData.inUse ? " (click to remove)" : ""}` : " (cannot afford)"}\nINHERITED CONTEXT::\n\t${augment.description.replaceAll(';', '\n\t')}`
                                        : 
                                        `AUGMENT::UNKNOWN\nNOTICE::'locate augment locus within memory'`
                                    }
                                    "
                                >
                                </div>`
                            })

                            return memberAugments
                        })()}
                    </div>
                `
            })
        }

        //actual creation of menu elements
        menu.innerHTML = `
            <div id="augment-stats" ${page.flags.augmentCount >= page.flags.augmentMax ? "class='augment-capped'" : ""}>
                <div class="menureturn button" onclick="exitMenu()">RETURN</div>
                <div class="augment-usage">
                    ${getDots()}
                </div>
                <div class="augment-header" aria-hidden="true">A</div>
                <div class="augment-copy">hi!! internal ecosystem is doing ok!! please input desired creation!!</div>
            </div>
            <div id="augment-members"></div>
        `
        let augList = document.querySelector('#augment-members')

        let augmentMembers = ""
        page.party.forEach((member, i) => {
            let memberAugmentList = augmentStatus[member.components ? member.slug : member.combatActor] // generated characters use their party slug
            if(!memberAugmentList) return //they have nothing

            augmentMembers += `<div class="augment-member" slug="${member.slug}"></div>`
        })
        
        augList.insertAdjacentHTML('beforeend', augmentMembers)
        updateMembers()

        //set up events
        function setUpOptionEvents(el) {
            let memberSlug = el.getAttribute('member')
            let augSlug = el.getAttribute('slug')
            let usage = document.querySelector('.augment-usage')

            el.addEventListener('click', ()=> {
                change("PAGE!!augmented", true)
                if(el.getAttribute('inuse') == "true") {
                    removeAugment(memberSlug, augSlug)
                } else if(el.getAttribute('affordable') == "true" && el.getAttribute('unlocked') == "true") {
                    addAugment(memberSlug, augSlug)
                }
                
                augmentStatus = getAugments()
                usage.innerHTML = getDots()
                updateMembers()
                menu.querySelectorAll(`.augment-option`).forEach(el=>setUpOptionEvents(el))
            })

            el.addEventListener('mouseenter', ()=>play('obeskHover', true, 0.5))
            el.addEventListener('click', ()=> play('obeskClick'))
        }

        menu.querySelectorAll(`.augment-option`).forEach(el=>setUpOptionEvents(el))

        //set up other sound effects
        menu.querySelectorAll(`.menureturn`).forEach(e=>{
            e.addEventListener('mouseenter', ()=>play('obeskHover', true, 0.5))
            e.addEventListener('click', ()=> play('obeskClick'))
        })

        document.querySelectorAll('.augment-member, #augment-stats, .augment-dot').forEach((el, i)=>{
            el.style.animationDelay = `${i * -0.5}s`
        })

        //show menu
        body.setAttribute('menu', 'augment')
        body.classList.add('in-menu')
        if(!refresh) {
            play('obeskToggle', 1.5)
            if(window.vn) {
                vn.hideStage(true, true)
                vn.fadeChars(true)
            }
        }
    }
}

/* cleanup - to be called when leaving a combat page */
function combatCleanup() {
    document.querySelectorAll('#party-menu, #augment-menu').forEach(el=>el.remove())
    page.partyMenuEnabled = false
}

env.dialogues["bugout"] = generateDialogueObject(`
start
    sys
        ATTENTION::'internal command';'memory stream halted'
            EXEC::ratween(env.bgm, 0.3)
        
____SHOWONCE::
    moth
        huh?
    
    self
        i don't know
        it started running bad
        and there was a button
____END
    
    bugout
        memory browber anomaly detected
        select measure to fixing please

    sys
        OPTION::'forcibly advance turn';'might fix it';'hope for best'
        OPTION::'restart combat sequence'
            SHOWIF::'EXEC::env?.rpg?.scenario?.retry'
        OPTION::'temporarily activate no gameplay mode';'retain narrative significance'
            SHOWIF::'EXEC::env?.rpg?.scenario?.nogame'
        OPTION::'autowin';'forces all foes to 0 HP and advances turn'
        OPTION::'autolose';'forces all allies to 0 HP and advances turn'

    bugout
        please also reports how happen to devepober
        you should never see me o_o

    RESPONSES::sys
        ADVANCE<+>END
            EXEC::advanceTurn()
        RETRY<+>END
            EXEC::cutscene(true);setTimeout(()=>{cutscene(false);env.rpg.scenario.retry()}, 1000)
            SHOWIF::'EXEC::env?.rpg?.scenario?.retry'
        NOGAME<+>END
            EXEC::cutscene(true);setTimeout(()=>{cutscene(false);env.rpg.scenario.nogame()}, 1000)
            SHOWIF::'EXEC::env?.rpg?.scenario?.nogame'
        AUTOWIN<+>END
            EXEC::cutscene(true);setTimeout(()=>{cutscene(false);env.rpg.enemyTeam.members.forEach(m=>m.hp = 0);updateStats();advanceTurn()}, 1000)
        AUTOLOSE<+>END
            EXEC::cutscene(true);setTimeout(()=>{cutscene(false);env.rpg.allyTeam.members.forEach(m=>m.hp = 0);updateStats();advanceTurn()}, 1000)
        NVM<+>END
            FAKEEND::(don't do anything)

END::ratween(env.bgm, env.bgm.intendedRate || 1)
`)

/* ing rework equipment element for party slides */
class PartyMemberEquipment extends HTMLElement {
    constructor() { super() }

    connectedCallback() {
        this.innerHTML = "" // can get reset by dragging

        const memberSlug = this.getAttribute('member')
        const member = page.party.find(m => m.slug === memberSlug)
        if(!member) throw printError("tried to make equipment menu for nonexistent member")
        
        if(!member.equipment) member.equipment = []
        const equipmentLimit = member.equipmentLimit || 2
        
        const container = document.createElement('div')
        container.className = 'equipment-container'

        for (let i = 0; i < equipmentLimit; i++) {
            const slot = this.createSlot(member, i)
            container.appendChild(slot)
        }

        container.addEventListener('mouseenter', (e) => {
            if((e.target.classList.contains('equipment-slot') && !e.target.classList.contains('active'))) {
                play('obeskHover', 1)
            } else if(e.target.classList.contains('equipment-option')) {
                play('obeskHover', 0.75)
            }
        }, true)

        if(this.hasAttribute('gone')) this.removeAllEquipment(member)
        this.appendChild(container)
    }

    //the equipment menu for a member is just a few slot circles
    //that manifest a menu when clicked letting you add/remove appropriately
    createSlot(member, index) {
        const slot = document.createElement('div')
        slot.classList.add('equipment-slot', 'nodefstyle')
        if(check("PAGE!!inventoryTutorial")) slot.classList.add('tutorial-highlight')
        
        const equippedItem = member.equipment?.[index]
        if(equippedItem) {
            const item = env.ITEM_LIST[equippedItem]
            let statusSlug = item.alterations.find(a=>a[0] == "STATUS")[1]

            slot.setAttribute("item", item.slug)
            slot.classList.add('filled')
            if(item.noteClass) slot.classList.add(`note-${item.noteClass}`)
            slot.style.setProperty('--image', `url(${item.image})`)
            slot.style.setProperty('--statusIcon', `url(${env.STATUS_EFFECTS[statusSlug].icon || `/img/sprites/combat/statuses/${statusSlug}.gif`})`)
            slot.setAttribute("definition", `STATUS++${statusSlug}`)
            if(!env.queuedItemAnimations ) env.queuedItemAnimations = []

            env.queuedItemAnimations.forEach(queued=>{
                if(queued.memberSlug == member.slug && queued.slotIndex == index && !queued.fired) {
                    slot.classList.add('newly-equipped')
                    queued.fired = true
                }
            })
        } else {
            const emptyIcon = document.createElement('span')
            emptyIcon.className = 'equipment-empty-slot'
            emptyIcon.textContent = '+'
            slot.setAttribute("definition", `NOTICE::'empty item slot';'utilize LMB to equip'`)
            slot.appendChild(emptyIcon)
        }

        //the click menu "dropdown" thingy
        const menu = this.createMenu(member, index)
        slot.appendChild(menu)
        slot.addEventListener('click', (e) => {
            e.stopPropagation()
            this.toggleMenu(menu)
            if(check("PAGE!!inventoryTutorial")) change("PAGE!!inventoryTutorial", "DELETE")
        })

        return slot
    }
    
    toggleMenu(menu, state) {
        const active = menu.classList.contains('active')
        const toggle = state !== undefined ? state : !active

        //shift it if it's on the left side
        const distanceToMiddle = Math.abs(this.getBoundingClientRect().left - (window.innerWidth / 2))
        const distanceToRight = window.innerWidth - this.getBoundingClientRect().right
        if(distanceToMiddle < distanceToRight) {
            menu.classList.add('leftside')
        } else menu.classList.remove('leftside')

        console.log("toggling menu", toggle)
        play('obeskToggle')

        if(toggle) {
            menu.parentElement.classList.add('active')
            menu.parentElement.setAttribute("holdef", menu.parentElement.getAttribute("definition"))
            menu.parentElement.removeAttribute("definition")
            if(env.openEquipmentSlotMenu && env.openEquipmentSlotMenu != menu) env.openEquipmentSlotMenu.parentElement.classList.remove('active')
            env.openEquipmentSlotMenu = menu

            this.boundCloseMenuEvent = this.closeMenuEvent.bind(this)
            document.addEventListener('click', this.boundCloseMenuEvent)
        } else {
            menu.parentElement.classList.remove('active')
            menu.parentElement.setAttribute("definition", menu.parentElement.getAttribute("holdef"))
            menu.parentElement.removeAttribute("holdef")
            if(env.openEquipmentSlotMenu == menu) delete env.openEquipmentSlotMenu

            if(this.boundCloseMenuEvent) {
                document.removeEventListener('click', this.boundCloseMenuEvent)
                delete this.boundCloseMenuEvent
            }
        }
    }

    closeMenuEvent(e) {
        if(env.openEquipmentSlotMenu && !env.openEquipmentSlotMenu.contains(e.target)) {
            this.toggleMenu(env.openEquipmentSlotMenu, false)
        }
    }

    createMenu(member, slotIndex) {
        const menu = document.createElement('div')
        menu.className = 'equipment-menu'

        const equipmentItems = page.party.inventory.filter(([item]) => item.type == "equipment")
        const equippedCounts = {}
        page.party.forEach(m => {
            m.equipment?.forEach(augSlug => equippedCounts[augSlug] = (equippedCounts[augSlug] || 0) + 1)
        })

        //if you have something in here, you get the option to remove it
        const currentEquipment = member.equipment?.[slotIndex]
        if(currentEquipment) {
            const removeOption = document.createElement('div')
            removeOption.className = 'equipment-option equipment-remove'
            removeOption.textContent = 'REMOVE'
            removeOption.addEventListener('click', (e) => {
                e.stopPropagation()
                this.toggleMenu(menu, false)
                this.unequipItem(member, slotIndex, currentEquipment)
            })
            menu.appendChild(removeOption)
        }

        //real options
        equipmentItems.forEach(([item, quantity]) => {
            const equipped = equippedCounts[item.slug] || 0
            const available = quantity - equipped
            const disabled = available <= 0 && item.slug !== currentEquipment

            //we hide it completely if the actor already has one of this slug,
            //or it's fully used by someone else
            if(hasEquipment(member.slug, item.slug) || disabled) return;
            
            //they're little squares that just show the item image and quantity
            const option = document.createElement('div')
            const status = env.STATUS_EFFECTS[item.alterations.find(a=>a[0] == "STATUS")[1]]
            option.classList.add('nodefstyle', 'equipment-option')
            option.style.setProperty('--image', `url(${item.image})`)
            option.style.setProperty('--quantity', `${quantity > 1 ? `${available}/${quantity}` : ''}`)
            option.innerHTML = `
                <div class="equipment-option-image ${item.noteClass ? item.noteClass : ""} nodefstyle" definition="STATUS++${status.slug}"></div>
                <div class="equipment-option-name equipment-option-detail">${item.name}</div>
                <div class="equipment-option-status equipment-option-detail" definition="STATUS++${status.slug}">${status.name}</div>
            `
            
            option.addEventListener('click', (e) => {
                e.stopPropagation()
                this.equipItem(member, slotIndex, item.slug)
                play('obeskClick')
                this.toggleMenu(menu, false)
            })

            menu.appendChild(option)
        })

        return menu
    }

    equipItem(member, slotIndex, itemSlug) {
        addEquipment(member.slug, itemSlug, slotIndex)
        togglePartyMenu(true)
    }

    unequipItem(member, slotIndex, itemSlug) {
        removeEquipment(member.slug, itemSlug, slotIndex)
        togglePartyMenu(true)
    }

    removeAllEquipment(member) {
        member.equipment?.forEach((itemSlug, index) => {
            if(itemSlug) this.unequipItem(member, index, itemSlug)
        })
    }
}

if(!customElements.get('partymember-equipment')) {
    customElements.define('partymember-equipment', PartyMemberEquipment);
}

//draws an effect line between two elements
//could be actor boxes, or a passive icon into an actor, so on and so forth
function drawEffectLine(origin, target, {
    duration = false, // we have defaults
    effectClass = false, 
    color = `no`,
    angleDrift = true,
    angleDriftAmount = 10,
    style = false,
    innerHTML = false,

    //special attribute info
    selfOrigin = false,
    amt = false,
    text = false, // same but arbitrary

    //positional options
    ignoreTargetingOffset = false,
    force = false
} = {}) {
    if(env.rpg.initializing) return;
    let effOrigin = getPrimaryEffectElement(origin)
    let effTarget = getPrimaryEffectElement(target)

    //for weird shit
    if(env.rpg.effectLineTargetIsAlwaysOrigin) effOrigin = effTarget

    if(!effOrigin || !effTarget || (env?.rpg?.noLineMode && !force) ) return;

    // make da line
    const line = document.createElement('div')
    line.classList.add('effectline')
    line.style.setProperty("--color", `var(--${color}-color)`)
    if(effectClass) line.classList.add(...effectClass.split(' ')); else line.classList.add('baseline');
    if(selfOrigin || effOrigin == effTarget) line.classList.add('selforigin')

    // optionals
    if(duration) line.style.setProperty("--duration", `${duration}ms`)
    if(amt !== false) line.setAttribute("amt", amt)
    if(innerHTML) line.innerHTML = innerHTML
    if(style) line.style.cssText += style // mostly for CSS vars
    if(text !== false) {
        line.setAttribute("text", text)
        line.classList.add('text')
    }
    
    // in 2D, if we can, we try to draw it *on* the grid.
    if(env.rpg.is2D && effOrigin.tagName == "COMBAT-TILE" && effTarget.tagName == "COMBAT-TILE") {
        // so for a 2D line, we need to put the origin at the X/Y of the origin, and then do all the math rigamarole from there...
        //console.log("xy for exchange", `${effTarget.x}, ${effTarget.y}`, "and", `${effOrigin.x}, ${effOrigin.y}`)

        const deltaX = (effTarget.x - effOrigin.x) * 100
        const deltaY = (effTarget.y - effOrigin.y) * 100
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        // grid is far more sensitive to drift so we scale it waaay down
        const angle = (Math.atan2(deltaY, deltaX) * (180 / Math.PI)) + (angleDrift ? Math.clamp(Math.random() * angleDriftAmount - angleDriftAmount / 2, -3, 3) : 0)

        // 2deets
        line.style.setProperty("--originX", `${50 + (effOrigin.x * 100)}px`)
        line.style.setProperty("--originY", `${50 + (effOrigin.y * 100)}px`)
        line.style.setProperty("--distance", `${distance}px`)
        line.style.setProperty("--angle", `${angle}deg`)
        line.style.setProperty("--uprightAngle", `${-angle}deg`)
        if(env.rpg.specialProps) {
            line.setAttribute("listeningfor", "--playercontrol-rotation, --playercontrol-tilt")
            line.setAttribute("directattribute", true)
            line.style.setProperty('--playercontrol-rotation', env.rpg.specialProps['--playercontrol-rotation'])
            line.style.setProperty('--playercontrol-tilt', env.rpg.specialProps['--playercontrol-tilt'])
        }

        // killllll
        env.rpg.grid.realgrid.appendChild(line)
    } else {
        const rpgRect = env.rpg.getBoundingClientRect()
        let originRect = effOrigin.getBoundingClientRect()
        let targetRect = effTarget.getBoundingClientRect()

        //targeting can offset boxes so we check if those were stored
        //this will go for the position halfway down the screen when targeting if we don't correct it
        let originTop = originRect.top
        let targetTop = targetRect.top

        if((env.rpg.classList.contains("targeting") || env.rpg.classList.contains("recently-targeted")) && !ignoreTargetingOffset) {
            if(effOrigin.preTargetPosition) originTop = effOrigin.preTargetPosition.top
            if(effTarget.preTargetPosition) targetTop = effTarget.preTargetPosition.top
        }

        let originX = originRect.left + originRect.width / 2 - rpgRect.left
        let originY = originTop + originRect.height / 2 - rpgRect.top
        let targetX = targetRect.left + targetRect.width / 2 - rpgRect.left
        let targetY = targetTop + targetRect.height / 2 - rpgRect.top

        const deltaX = targetX - originX
        const deltaY = targetY - originY
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        const angle = (Math.atan2(deltaY, deltaX) * (180 / Math.PI)) + (angleDrift ? (Math.random() * angleDriftAmount - angleDriftAmount / 2) : 0)

        //1D deets
        line.style.setProperty("--originX", `${originX}px`)
        line.style.setProperty("--originY", `${originY}px`)
        line.style.setProperty("--distance", `${distance}px`)
        line.style.setProperty("--angle", `${angle}deg`)
        line.style.setProperty("--uprightAngle", `${-angle}deg`)

        //hit it
        env.rpg.appendChild(line)
    }
    
    setTimeout(() => line.classList.add('drawn'), 50)
    
    line.close = () => {
        if(line.closed) return;
        line.closed = true

        setTimeout(() => line.classList.remove('drawn'), 50)
        setTimeout(() => line.remove(), 425)
    }

    setTimeout(line.close, (duration || 4000) + 500)
    return line
}

// drawEffectLine primarily works with statuses, actor objects, and then HTML elements
// in 2D, we want to prioritize using pieces, even for passive effects, since it's far more visible there
function getPrimaryEffectElement(obj) {
    let returnElement = false
    if(env?.rpg?.is2D) {
        if(obj.tagName == "COMBAT-TILE") returnElement = obj
        else if(obj?.piece || obj?.deadPiece) returnElement = obj?.piece?.tile || obj?.piece?._lastTile || obj?.deadPiece?._lastTile
        else if(obj.passiveIconElement) returnElement = obj?.affecting?.piece?.tile || obj?.affecting?.piece?._lastTile || obj?.affecting?.deadPiece?._lastTile
    }

    if(!returnElement) {
        returnElement = obj.passiveIconElement || obj.box || (obj instanceof HTMLElement ? obj : null)
    }

    return returnElement
}


function clearEffectLines() {
    env.rpg.querySelectorAll('.effectline').forEach(line=>line.close())
}


function forfeitCombatDialog() {
    if((env.forfeitDialog || !env?.rpg?.active) && !env?.rpg?.halt) return;
    play("muiClick", 3)
    
    env.forfeitDialog = document.createElement('div')
    env.forfeitDialog.id = 'dialogue-skip'
    env.forfeitDialog.className = 'skip-combat'
    env.forfeitDialog.innerHTML = `
      <span class="skip-notice">CONFIRM::'forfeit current combat'</span>
      <div class="skip-dialog">
        <button id="skip-yes" class="button" onmouseenter="play('muiHover')" onclick="play('muiClick');env.forfeitYes()">confirm</button>
        <button id="skip-no" class="button" onmouseenter="play('muiHover')" onclick="play('muiClick');env.forfeitNo()">retract</button>
      </div>
    `
    document.body.appendChild(env.forfeitDialog)

    env.forfeitYes = () => {
        env.forfeitDialog.remove()
        delete env.forfeitDialog

        if(!env?.rpg?.active) return;

        playCombatCrit()
        endCombat(env.rpg.allyTeam)
    }

    env.forfeitNo = () => {
        env.forfeitDialog.remove()
        delete env.forfeitDialog
    }
}

// multiple things use the dragging function here
// despite having draggable.js, we need something more custom since that uses mirrors for everything
// uses vw/vh
function makeDraggable(el, state = true) {
    if(!env.rpg?.active) return;
    
    if(!state) {
        if(el._dragCleanup) { el._dragCleanup(); delete el._dragCleanup}
        return
    }

    let isDragging = false
    let offsetX = 0
    let offsetY = 0
    
    // Initialize position if not set
    if(typeof el.x === 'undefined') {
        const elRect = el.getBoundingClientRect()
        const rpgRect = env.rpg.getBoundingClientRect()
        el.x = ((elRect.left + elRect.width / 2) - rpgRect.left) / rpgRect.width * 100
        el.y = ((elRect.top + elRect.height / 2) - rpgRect.top) / rpgRect.height * 100
    }
    
    const onMouseDown = (e) => {
        if(e.button !== 0) return; //left click
        
        isDragging = true
        el.classList.add('dragging')
        
        const rect = el.getBoundingClientRect()
        offsetX = e.clientX - (rect.left + rect.width / 2)
        offsetY = e.clientY - (rect.top + rect.height / 2)
        e.preventDefault()
    }
    
    const onMouseMove = (e) => {
        if(!isDragging) return;
        
        const rpgRect = env.rpg.getBoundingClientRect()
        const newX = ((e.clientX - offsetX - rpgRect.left) / rpgRect.width) * 100
        const newY = ((e.clientY - offsetY - rpgRect.top) / rpgRect.height) * 100
        
        el.x = Math.clamp(newX, 5, 95)
        el.y = Math.clamp(newY, 5, 95)

        el.style.transform = `translate(${el.x}vw, ${el.y}vh) var(--baseOffset)`
    }
    
    const onMouseUp = () => {
        if(!isDragging) return;
        isDragging = false
        el.classList.remove('dragging')
    }
    
    el.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    
    //cleanup func
    el._dragCleanup = () => {
        el.removeEventListener('mousedown', onMouseDown)
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
    }
}

//collision detection between two elements - limited to circles and boxes
//mode can be 'circlecircle', 'circlerect', or 'rect'
//this uses math instead of elementsFromPosition like bullethell so it's a little more restrictive
//but might perform better!!!
function checkElementCollision(el1, el2, mode = 'rect') {
    const rect1 = el1.getBoundingClientRect()
    const rect2 = el2.getBoundingClientRect()
    
    switch(mode) {
        case 'circlecircle': {
            const center1X = rect1.left + rect1.width / 2
            const center1Y = rect1.top + rect1.height / 2
            const center2X = rect2.left + rect2.width / 2
            const center2Y = rect2.top + rect2.height / 2

            const distance = Math.sqrt(
                Math.pow(center1X - center2X, 2) + 
                Math.pow(center1Y - center2Y, 2)
            )
            
            return distance < (rect1.width / 2 + rect2.width / 2)
        }
        
        case 'circlerect': { // uses the closest point on the rectangle to the circle center
            const circleCenterX = rect1.left + rect1.width / 2
            const circleCenterY = rect1.top + rect1.height / 2
            const circleRadius = rect1.width / 2
            
            const closestX = Math.clamp(circleCenterX, rect2.left, rect2.right)
            const closestY = Math.clamp(circleCenterY, rect2.top, rect2.bottom)
            
            const distance = Math.sqrt(
                Math.pow(circleCenterX - closestX, 2) + 
                Math.pow(circleCenterY - closestY, 2)
            )
            
            return distance < circleRadius
        }
        
        case 'rect':
        default: {
            return !(
                rect1.right < rect2.left ||
                rect1.left > rect2.right ||
                rect1.bottom < rect2.top ||
                rect1.top > rect2.bottom
            )
        }
    }
}

/* actor box move gimmick */
/* you can drag a team box around with this */
function makeBoxesDraggable(team, random) {
    if(!env.rpg.active || !team) return;
    const teamContainer = env.rpg.querySelector(`#${team.name}-team`)
    const actorBoxes = teamContainer.querySelectorAll('.actor')
    
    //get their original positions before modifying
    const boxPositions = Array.from(actorBoxes).map((box) => {
        const boxRect = box.getBoundingClientRect()
        const rpgRect = env.rpg.getBoundingClientRect()

        box.classList.add('status-overflow') // more fair box sizing enforced
        box.intentionalStatusOverflow = true

        return {
            box,
            x: boxRect.left - rpgRect.left,
            y: boxRect.top - rpgRect.top,
            width: boxRect.width,
            height: boxRect.height,
            rpgWidth: rpgRect.width,
            rpgHeight: rpgRect.height
        }
    })
    
    boxPositions.forEach(({box, x, y, width, height, rpgWidth, rpgHeight}) => {
        //create wrapper element
        const wrapper = document.createElement('div')
        wrapper.classList.add('freeposition-box', 'grabbable')
        
        //need to move this out of the team container for positioning
        env.rpg.appendChild(wrapper)
        wrapper.appendChild(box)
        box.classList.add('freeposition')
        
        //initial position is either random or where it was 
        if(random) {
            wrapper.x = rand(10, 90)
            wrapper.y = rand(10, 90)
        } else {
            wrapper.x = (((x + width / 2) / rpgWidth) * 100)
            wrapper.y = ((y + height / 2) / rpgHeight) * 100
        }

        wrapper.style.setProperty('--positionTransform', `translate(${wrapper.x}vw, ${wrapper.y}vh)`)
        makeDraggable(wrapper, true)
    })
}

function revertBoxPositions(team) {
    if(!env.rpg || !team) return;
    const teamContainer = env.rpg.querySelector(`#${team.name}-team`)
    const freeBoxes = env.rpg.querySelectorAll(`.freeposition-box`)
    
    freeBoxes.forEach(wrapper => {
        const box = wrapper.querySelector('.actor')
        if(!box) return;
        
        //i don't think we'll ever have multiple teams freepositioned but just in case 
        const actorSlug = box.id
        const actor = team.members.find(m => m.slug === actorSlug)
        if(!actor) return;
        
        if(wrapper._dragCleanup) { wrapper._dragCleanup(); delete wrapper._dragCleanup }
        teamContainer.appendChild(box)
        wrapper.remove()
    })
}

//checks for collisions between free-positioned actors and active damage zones
function checkFreeDamageCollisions(team, specificDamageElement = null) {
    if(!env.rpg?.active || (!env.rpg.freeDamageElements?.length && !specificDamageElement)) return;

    const freeActors = team.members
        .map(m => m.box)
        .filter(box => box.classList.contains('freeposition'))
    if(freeActors.length === 0) return;

    const damageElements = specificDamageElement ? [specificDamageElement] : env.rpg.freeDamageElements
    freeActors.forEach(actorBox => {
        const actor = actorBox.actor        
        
        damageElements.forEach(damageEl => {
            if(!damageEl.active || env.rpg.halt) return;
            
            const shape = damageEl.getAttribute('shape') || 'rectangle'
            const mode = shape === 'circle' ? 'circlerect' : 'rect'
            
            if(checkElementCollision(damageEl, actorBox, mode) && damageEl.contact) damageEl.contact(actor)
        })
    })
}

// draws a telegraph reticle, then makes it briefly damaging after a delay
// does NOT add to the freeDamageElements array, because it's a once-off thing
function spawnBstrdShot({
    pattern = "random", // "targeted" or "random"
    target, // target actor for "targeted" pattern
    count = 3, // number of shots to spawn
    size = 10, // size in vmax
    sizeDrift = 3, // random size drift in vmax
    telegraphTime = 3000, // time before activation in ms
    staggerTime = 0, // delay between each shot spawn in ms
    startDelay = 0, // initial delay before first shot in ms
    origin, // origin actor for hit calc
    x: specifiedX, // optional X position in vw
    y: specifiedY // optional Y position in vh
} = {}) {
    if(!env.rpg?.active) return;
    const rpgRect = env.rpg.getBoundingClientRect()

    if(target?.box && origin?.box && pattern === "targeted") {
        forcePlay("talklaugh", 0.5)
        drawEffectLine(origin, target, {
            color: "bastard",
            effectClass: "baseline icon bstrdaim",
            duration: 3000,
            force: true,
            style: `--icon: url(/img/sprites/combat/statuses/bstrdgunner.gif)`,
        })
    }
    
    for(let i = 0; i < count; i++) {
        setTimeout(() => {
            let x, y;
            
            // Use specified coordinates if provided
            if(typeof specifiedX !== 'undefined' && typeof specifiedY !== 'undefined') {
                x = specifiedX
                y = specifiedY
            } else if(pattern === "targeted" && target?.box) {
                //scatter around the position
                const targetRect = target.box.getBoundingClientRect()
                const targetX = ((targetRect.left + targetRect.width / 2) - rpgRect.left) / rpgRect.width * 100
                const targetY = ((targetRect.top + targetRect.height / 2) - rpgRect.top) / rpgRect.height * 100
                
                //30vmax aiming radius dependent on size
                const angle = Math.random() * Math.PI * 2
                const distance = Math.random() * 30 * (size / 10)
                x = targetX + Math.cos(angle) * distance
                y = targetY + Math.sin(angle) * distance

                //but within the bounds of the screen
                x = Math.clamp(x, 5, 95)
                y = Math.clamp(y, 5, 95)
            } else { // easy random position
                x = rand(5, 95)
                y = rand(5, 95) 
            }
            
            const reticle = document.createElement('div')
            reticle.classList.add('freepos-zone', 'freepos-circle', 'freepos-bstrdshot', 'freepos-bstrdshot-windup')
            reticle.setAttribute('shape', 'circle')
            reticle.style.setProperty('--size', Math.max(size + rand(-sizeDrift, sizeDrift), 5))
            reticle.style.setProperty('--positionTransform', `translate(${x}vw, ${y}vh)`)
            reticle.style.setProperty('--aimtime', `${telegraphTime}ms`)
            
            reticle.contact = (actor) => {
                if(actor.state == "dead") return;
                
                if(combatHit(actor, {
                    amt: 1,
                    origin: origin,
                    type: 'hp',
                    acc: 7,
                })) {
                    actor.box.classList.add('struck')
                    addStatus({target: actor, status: "puncture", origin, length: 1})
                    setTimeout(() => actor.box.classList.remove('struck'), 200)
                } else {
                    actor.box.classList.add('evade')
                    setTimeout(() => actor.box.classList.remove('evade'), 200)
                }
            }
            
            //activate - only checks for damage once as the shot passes
            env.rpg.appendChild(reticle)
            setTimeout(() => {
                reticle.classList.remove('freepos-bstrdshot-windup')
                reticle.active = true
                checkFreeDamageCollisions(env.rpg.allyTeam, reticle)
                play('shot', 0.75, 0.5)

                if(origin) origin.sprite.classList.add('scramble')
                
                // removal
                if(!env.debug) setTimeout(() => {
                    reticle.remove()
                    if(origin) origin.sprite.classList.remove('scramble')
                }, 200)
            }, telegraphTime)
        }, i * staggerTime + startDelay)
    }
}

// spawns draggable kavrukas that you can position to avoid damage
// but they combine to cause trouble...
function spawnKavrukaToss({
    count = 1, // yaa
    baseSize = 10, // size in vmax
    sizeDrift = 3, // random size drift in vmax
    fuseTime = 5000, // time you have to drag it around
    staggerTime = 0, // delay between each kavruka spawn in ms
    origin // origin actor for combat hit calc
} = {}) {
    if(!env.rpg?.active) return;
    
    if(!env.rpg.freeDamageElements) env.rpg.freeDamageElements = []
    if(!env.rpg.kavrukaZones) env.rpg.kavrukaZones = []
    
    for(let i = 0; i < count; i++) {
        setTimeout(() => {
            const kavruka = document.createElement('div')
            kavruka.x = rand(10, 90)
            kavruka.y = rand(10, 90)

            let size = baseSize + rand(-sizeDrift, sizeDrift)

            kavruka.classList.add('freepos-zone', 'freepos-circle', 'freepos-kavruka', 'grabbable')
            kavruka.setAttribute('shape', 'circle')
            kavruka.style.setProperty('--size', Math.max(size / 3, 5)) // initial draggable size is fairly small
            kavruka.style.setProperty('--realSize', size) // for VFX 
            kavruka.style.setProperty('--positionTransform', `translate(${kavruka.x}vw, ${kavruka.y}vh)`)
            kavruka.style.setProperty('--fuseTime', `${fuseTime}ms`)
            kavruka.explosionSize = size
            
            env.rpg.appendChild(kavruka)
            play("miss", 0.75)
            makeDraggable(kavruka, true)
            
            //explosion time
            setTimeout(() => {
                kavruka.exploded = true
                makeDraggable(kavruka, false)

                const explodeVfx = document.createElement('div')
                explodeVfx.classList.add('kavruka-explosion-vfx', 'freepos-zone')
                explodeVfx.style.setProperty('--positionTransform', `translate(${kavruka.x}vw, ${kavruka.y}vh)`)
                explodeVfx.style.setProperty('--size', kavruka.explosionSize)
                env.rpg.appendChild(explodeVfx)

                setTimeout(() => explodeVfx.classList.add('vis'), 20)
                setTimeout(() => explodeVfx.classList.remove('vis'), 800)
                setTimeout(() => explodeVfx.remove(), 10000)

                play('shot1', 0.75)
                
                //collision check - combine if overlapping, otherwise create new damage zone
                let combined = false
                kavruka.classList.add('exploding')
                kavruka.style.setProperty('--size', size) // full size for collision
                if(env?.rpg?.actors?.bstrdboss?.box && !env.rpg.bstrdboom) {
                    let explodedOnBstrd = checkElementCollision(kavruka, env.rpg.actors.bstrdboss.box, 'circlerect')
                    if(explodedOnBstrd) {
                        env.rpg.bstrdboom = true
                        rpgDialogue(env.rpg.actors.bstrdboss, env.STATUS_EFFECTS.bstrd_boss.strings.niceTry1, true, 8000)
                        setTimeout(() => {
                            rpgDialogue(env.rpg.actors.bstrdboss, env.STATUS_EFFECTS.bstrd_boss.strings.niceTry2, true, 8000)                            
                        }, 3000)
                    }
                }

                env.rpg.kavrukaZones.forEach(otherKavruka => {
                    if(checkElementCollision(kavruka, otherKavruka, 'circlecircle')) {
                        otherKavruka.explosionSize += size * 0.5
                        otherKavruka.style.setProperty('--size', otherKavruka.explosionSize)                   
                        combined = true
                        kavruka.remove()
                
                        //check for other growth
                        setTimeout(()=>checkKavrukaMerge(), 800) //check again in case of chain merges
                    }
                })
                
                //only create damage zone if not combined
                if(!combined) {
                    env.rpg.kavrukaZones.push(kavruka)
                    kavruka.active = true
                    kavruka.classList.add('active', 'freepos-fire')
                    kavruka.classList.remove('freepos-kavruka', 'grabbable', 'exploding')
                    kavruka.style.setProperty('--size', kavruka.explosionSize)
                    
                    //kavrukas use a generic combatHit
                    kavruka.contact = (actor) => {
                        if(actor.hp == 0) return;

                        const lastHit = env.rpg.turnData[`${actor.slug}-lastfirehit`]
                        if(lastHit && performance.now() - lastHit < 1500) return;
                        env.rpg.turnData[`${actor.slug}-lastfirehit`] = performance.now()

                        if(combatHit(actor, {
                            amt: 1,
                            type: 'hp',
                            acc: 7,
                        })) {
                            play("status", 0.75, 0.5)
                            actor.box.classList.add('struck')
                            setTimeout(() => actor.box.classList.remove('struck'), 250)

                            drawEffectLine(actor, actor, {
                                color: "bastard",
                                effectClass: "baseline icon selforigin bastard-font",
                                angleDriftAmount: 180,
                                duration: 3000,
                                style: `
                                    --icon: url(/img/textures/bflametiny.gif);
                                    --count: 0; 
                                    --variation: 10px
                                `,
                                text: "BURNING"
                            })

                        } else {
                            play("miss", 0.75, 0.5)
                            actor.box.classList.add('evade')
                            setTimeout(() => actor.box.classList.remove('evade'), 250)
                        }
                    }
                    
                    env.rpg.freeDamageElements.push(kavruka)
                    checkFreeDamageCollisions(env.rpg.allyTeam, kavruka) //initial check only, otherwise handled by an outside interval
                }
            }, fuseTime)
        }, i * staggerTime)
    }
}

//kavrukas will merge their fires if they overlap!
function checkKavrukaMerge() {
    if(!env.rpg?.kavrukaZones?.length) return;
    
    let mergedZones = new Set()
    let zonesToRemove = []
    
    env.rpg.kavrukaZones.forEach((zone1, i) => {
        if(mergedZones.has(zone1) || !zone1.exploded) return;
        
        env.rpg.kavrukaZones.forEach((zone2, j) => {
            if(i >= j || mergedZones.has(zone2) || !zone2.exploded) return;

            if(checkElementCollision(zone1, zone2, 'circlecircle')) {
                //merge into the bigger one
                let biggerZone = zone1.explosionSize >= zone2.explosionSize ? zone1 : zone2
                let smallerZone = biggerZone === zone1 ? zone2 : zone1
                
                //add it up
                biggerZone.explosionSize += smallerZone.explosionSize * 0.5
                biggerZone.style.setProperty('--size', biggerZone.explosionSize)

                //shrink the smaller zone away
                smallerZone.style.setProperty('--positionTransform', `translate(${smallerZone.x}vw, ${smallerZone.y}vh)`)
                smallerZone.style.setProperty('--futurePositionTransform', `translate(${biggerZone.x}vw, ${biggerZone.y}vh)`)
                smallerZone.classList.add('merging')
                setTimeout(() => {
                    smallerZone.remove()
                }, 800)
                
                mergedZones.add(smallerZone)
                zonesToRemove.push(smallerZone)
            }
        })
    })
    
    //cleanup merged zones from arrays
    if(zonesToRemove.length > 0) {
        env.rpg.kavrukaZones = env.rpg.kavrukaZones.filter(z => !zonesToRemove.includes(z))
        env.rpg.freeDamageElements = env.rpg.freeDamageElements.filter(z => !zonesToRemove.includes(z))

        setTimeout(()=>checkKavrukaMerge(), 800) //check again in case of chain merges
    }
}

//reduces size by a percentage
function shrinkKavrukaZones(amt = 0.75) {
    if(!env.rpg?.kavrukaZones?.length) return;

    env.rpg.kavrukaZones.forEach(z=>{
        z.explosionSize = z.explosionSize * amt
        if(z.explosionSize < 3) {
            z.classList.add('merging')
            z.removing = true
            setTimeout(()=>z.remove(), 800)
        } else z.style.setProperty("--size", z.explosionSize)
    })

    env.rpg.kavrukaZones = env.rpg.kavrukaZones.filter(z=>!z.removing)
}