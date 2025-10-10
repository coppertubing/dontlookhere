
/* 
    repeatable RPG play elements (is it a roguelite? idk how genres work)
*/

env.crittaCount = 0
class CrittaMap extends HTMLElement {
    constructor() {
        super()

        //there should only ever be one
        if(this.getAttribute("generated")) return; // opera GX fix
        if(env.crittaMap) { printError("a new map has been spawned even though one already exists", true) }
        env.crittaMap = this
        
        //initialize references
        this.selectedNode = null
        this.playerShip = null
        
        this.innerHTML = `
            <button class="button" intent="closemenu" onclick="env.e3a2.toggleMap()">Close</button>
            <ul id="globals"></ul>
            <figure id="map"></figure>
            <div class="exchangescreen"></div>
        `
        this.map = this.querySelector("#map")
        this.globalList = this.querySelector("#globals")
        this.id = `map${env.crittaCount++}`
        this.loops = 0 // times looped on this element
        this.adjustTension("=", 0) // global difficulty
        this.weights = {} // reward weighting
        this.globalModifiers = {} // received from looping or wagers. structured i.e. {modSlug: modQty, ...}
        this.currentRowSetting = CrittaMap.ROWSETTINGS.base;
        this.baseFishChance = 0.1
        this.applyOptions()
        this.generate() 

        this.addEventListener("click", this.clickEvent.bind(this))
        content.setAttribute('tension', this.tension)

        if(env.e3a2) env.e3a2.updateExchangeScreen()
    }

    //applies terminal options
    applyOptions() {
        if(check("e3a2_tension")) {this.adjustTension("=", Number(check("e3a2_tension") - 1))}
        if(check("e3a2_fishchance")) {this.baseFishChance = Number(check("e3a2_fishchance"))}
    }

    //generates a layout for this world
    generate() {
        // clear the map
        this.map.innerHTML = `
            <div class="path"></div>
            <critta-ship></critta-ship>
        `
        this.selectedNode = null
        this.classList.add("generating")
        this.removeAttribute("sidelock")
        
        //first get all possible elements that the nodes can be
        this.possibleZoneComponents = []
        for (const componentName in env.COMBAT_COMPONENTS) {
            const component = env.COMBAT_COMPONENTS[componentName]
            if(component.dontSpawnNormally) continue
            component.slug = componentName
            this.possibleZoneComponents.push(component)
        }
        this.possibleZoneComponents = shuffle(this.possibleZoneComponents)
        this.currentComponentIndex = 0

        //decide difficulty 
        console.log("generating new map. special is", this.getAttribute("special"))
        if(!this.getAttribute("special")) {
            if(this.tension >= 3) {
                console.log("hard")
                this.currentRowSetting = CrittaMap.ROWSETTINGS.hard;
                this.setAttribute("rowsetting", "hard")
            } else if(this.tension >= 1) {
                console.log("adv")
                this.currentRowSetting = CrittaMap.ROWSETTINGS.advanced
                this.setAttribute("rowsetting", "adv")
            } else {
                console.log("base")
                this.currentRowSetting = CrittaMap.ROWSETTINGS.base;
                this.setAttribute("rowsetting", "base")
            }
        } else {
            console.log("removing rowsetting since special is used")
            this.removeAttribute("rowsetting")
        }

        //we'll cycle through the shuffled array for spawning to make sure there's a good variety of effects and rewards vs pure random
        //generate row by row
        for (const [i, rowData] of this.currentRowSetting.entries()) {
            let rowContents = ``
            let difficultyPool = shuffle(rowData.difficulties)

            for (let j = 0; j < rowData.count; j++) {
                let id = `node${env.crittaCount++}`
                rowContents += `
                    <critta-node
                        id="${id}"
                        difficulty="${difficultyPool.shift()}"
                        component="${this.possibleZoneComponents[this.currentComponentIndex].slug}"
                        ${rowData.sideLock ? `sidelock="true"`: ``}
                    ></critta-node>
                `

                if(this.currentComponentIndex == this.possibleZoneComponents.length - 1) this.currentComponentIndex = 0;
                else this.currentComponentIndex++
            }

            this.map.insertAdjacentHTML(`beforeend`, `<section class="critta-row" style="--count: ${rowData.count};" depth="${i}">${rowContents}</section>`)
        }
        this.rows = [... this.querySelectorAll('.critta-row')]
        this.adjustDepth(this.rows.length - 1)
        this.classList.remove("generating")
        this.removeAttribute("special")
        this.setAttribute("generated", true)
    }

    //updates the active row, controlling what's in range
    adjustDepth(depth) {
        this.depth = depth
        this.querySelectorAll(".current-depth").forEach(el=>{
            el.classList.remove("current-depth")
            el.classList.add("cleared-depth")
        })
        this.rows[depth].classList.add("current-depth")
        content.setAttribute('depth', this.depth)
    }

    //on selecting a node, mark it as glowy and also re-check if it's in range
    selectNodeID(id) {
        if(!this.playerShip.canMove) return
        if(this.selectedNode?.id == id) { return this.clearSelectedNode() }

        this.clearSelectedNode()
        let node = document.getElementById(id)

        if(node) {
            this.selectedNode = node
            node.classList.add('selected')
            node.openMenu()
        }
    }

    clearSelectedNode() {
        if(!this.playerShip.canMove) return

        if(this.selectedNode) {
            this.selectedNode.closeMenu()
            this.selectedNode.classList.remove('selected')
            this.selectedNode = null
        }
    }

    //handler for clicking off stuff, eventual buttons, etc
    clickEvent(event) {
        let el = event.target
        if(body.classList.contains("in-dialogue")) return

        if(el.tagName == "FIGURE" || el.tagName == "SECTION" || el.tagName == "CRITTA-ZONE") {
            this.clearSelectedNode()
        }

        if(el.classList.contains("exchangescreen")) startDialogue("merchant")
    }

    //adjusts and updates map tension via "+"/"-"/"=" mods
    //also keeps the tension display up to date
    adjustTension(mod, amt) {
        switch(mod) {
            case "+": this.tension += amt; break;
            case "-": this.tension -= amt; break;
            case "=": this.tension = amt; break;
        }

        this.tension = Math.clamp(this.tension, 0, 5)
        this.setAttribute("tension", this.tension)
        content.setAttribute("tension", this.tension)

        //create a display in the modifier list to help tell the player what's happening
        let foeHelp = ``
        for (const [groupSlug, chance] of CrittaMap.TENSIONWEIGHT[this.tension]) {
            if(foeHelp) foeHelp += ';';
            foeHelp += `'${chance != 1 ? `${chance * 100}% ` : ''}${env.COMBAT_GROUPS[groupSlug].name}'`
        }

        let el = this.globalList.querySelector(`li[mod="tension"]`)
        
        //tension affects a few things and i want to make it clear
        let definition = 
            `TENSION::${this.tension + 1}/6
            ANALYSIS::'thoughtspace revision stress';'affects valid foe forms';'affects valid shell impulses'
            CURRENT FOES::${foeHelp}`

        if(this.tension >= 1) definition += `\n2+::ACTION IMPULSES AVAILABLE`; else definition += `\n2+::???`
        if(this.tension >= 3) definition += `\n4+::FATED IMPULSES AVAILABLE`; else definition += `\n4+::???`

        let outerHTML = `<li mod="tension" qty="${this.tension + 1}" style="--priority: -10;" definition="${definition}"></li>`

        if(!el) this.globalList.insertAdjacentHTML('beforeend', outerHTML) 
        else el.outerHTML = outerHTML

        content.setAttribute('tension', this.tension)

        //we also update minibosses since this affects what they can roll, and they're rolled in advance
        this.map.querySelectorAll('critta-node[difficulty="3"]').forEach(el=> el.generate())
    }

    //renamed 'mod' to 'adjustment' here for clarity lol
    adjustModQty(modSlug, adjustment, amt) {
        if(!this.globalModifiers[modSlug]) this.globalModifiers[modSlug] = 0;

        switch(adjustment) {
            case "+": this.globalModifiers[modSlug] += amt; break;
            case "-": this.globalModifiers[modSlug] -= amt; break;
            case "=": this.globalModifiers[modSlug] = amt; break;
        }

        if(this.globalModifiers[modSlug]) {
            let mod = env.MODIFIERS[modSlug]
            let el = this.globalList.querySelector(`li[mod=${modSlug}]`)
            let outerHTML = `<li mod="${modSlug}" qty="${this.globalModifiers[modSlug]}" style="--icon: url(${mod.icon});--priority: ${mod.priority};" definition="REVISION::${mod.name.toUpperCase()}\n${mod.getHelp(true).replace(/<\/?[^>]+(>|$)/g, "")}"></li>`
            if(!el) {
                this.globalList.insertAdjacentHTML('beforeend', outerHTML)
            } else {
                el.outerHTML = outerHTML
            }
            
        } else {
            this.globalList.querySelectorAll(`li[mod=${modSlug}]`).forEach(el=>el.remove())            
        }
    }

    getModQty(modSlug) {
        return this.globalModifiers[modSlug] ? this.globalModifiers[modSlug] : 0
    }

    //gets array of global modifiers in order of priority
    getModArray() {
        return Object.entries(this.globalModifiers)
            .map(modSet => env.MODIFIERS[modSet[0]])
            .sort((a, b) => b.priority - a.priority)
    }

    //static definitions for the rows that should be generated (top to bottom)
    /*
    {
        count: # (number of nodes in this row. centered space-between flexwise),
        difficulties: [] //difficulties that can be used in this row. should be same # as count
            4 - boss (firmament)
            3 - miniboss selection
            2 - hard 
            1 - normal
            0 - easy

        rewards: [] // a list of reward types that must be included in this. once expended, will fall back to random
    }
    */
    static ROWSETTINGS = {
        base: [
            {
                count: 1,
                difficulties: [... "4"]
            },
            {
                count: 3,
                difficulties: [... "333"],
            },
            {
                count: 2,
                difficulties: [... "21"],
                sideLock: true
            },
            {
                count: 4,
                difficulties: [... "1201"],
                sideLock: true
            },
            {
                count: 4,
                difficulties: [... "1000"],
                sideLock: true
            },
            {
                count: 2,
                difficulties: [... "000"],
                sideLock: true
            },
        ],

        advanced: [
            {
                count: 1,
                difficulties: [... "4"]
            },
            {
                count: 2,
                difficulties: [... "33"]
            },
            {
                count: 2,
                difficulties: [... "21"],
                sideLock: true
            },
            {
                count: 4,
                difficulties: [... "0121"],
                sideLock: true
            },
            {
                count: 2,
                difficulties: [... "12"],
                sideLock: true
            },
            {
                count: 2,
                difficulties: [... "12"],
                sideLock: true
            },
        ],

        hard: [
            {
                count: 1,
                difficulties: [... "4"]
            },
            {
                count: 2,
                difficulties: [... "33"]
            },
            {
                count: 2,
                difficulties: [... "33"],
                sideLock: true
            },
            {
                count: 1,
                difficulties: [... "2"],
                sideLock: true
            },
            {
                count: 2,
                difficulties: [... "22"],
                sideLock: true
            },
            {
                count: 2,
                difficulties: [... "21"],
                sideLock: true
            },
        ],
        
        intrusive: [
            {
                count: 1,
                difficulties: [... "4"]
            },
            {
                count: 1,
                difficulties: [... "3"]
            },
        ]
    }

    /* Tension enemy ratings determine the chance of enemies/minibosses spawning from different pools.
        0: 80% collapse, 20% golem
        1: 45% collapse, 45% golem, 10% daemon 
        2: 70% golem, 20% daemon, 10% collapse
        3: 50% golem, 50% daemon
        4: 80% daemon, 20% golem
        5: 100% daemon
    */
    static TENSIONWEIGHT = {
        '0': [["collapse", 1]],
        '1': [["collapse", 0.5], ["golem", 0.5]],
        '2': [["golem", 0.7], ["collapse", 0.2], ["daemon", 0.1]],
        '3': [["golem", 0.6], ["daemon", 0.4]],
        '4': [["daemon", 0.8], ["golem", 0.2]],
        '5': [["daemon", 1]],
    }
}
customElements.define('critta-map', CrittaMap);

/***************************************/
/* crittanodes are where most of the magic happens
    they represent fights and steps in your journey
*/
/***************************************/
class CrittaNode extends HTMLElement {
    constructor() {
        super()
        
        if(this.getAttribute("generated")) return; // opera GX fix

        // see the difficulties under ROWSETTINGS above
        this.difficulty = this.getAttribute("difficulty")
        let component = this.getAttribute("component")
        this.component = component ? env.COMBAT_COMPONENTS[this.getAttribute("component")] : false
        this.generate()

        //determine the 'side' this node is on - used in sidelock
        this.sideLock = this.getAttribute("sidelock") == "true" ? true : false
        this.setThisAndAttribute("side", this.figureOutSideMyGodItIs2InTheMorningFUCKKK())

        this.addEventListener("click", this.clickEvent.bind(this))
    }

    /* 
        on generation, a crittanode looks at its difficulty and selects a formation
    */
    generate() {        
        switch(this.difficulty) {
            case "3": // minibosses specifically are generated all at once, formation chosen via tension rating
                let group = env.COMBAT_GROUPS[weightRand(CrittaMap.TENSIONWEIGHT[env.crittaMap.tension])]                
                this.formation = env.COMBAT_FORMATIONS[group.miniboss_formations.sample()]
            break
        
            default:
                this.formation = env.COMBAT_FORMATIONS[env.COMBAT_FORMATIONS[this.difficulty].sample()]
        }

        //we only worry about generating modifiers on non-firmament fights
        if(this.difficulty != "4") {
            if(this.component.combatModifiers) {
                let modifierSlug = this.component.combatModifiers.sample()
                this.modifier = env.MODIFIERS[modifierSlug]
                this.setAttribute("modifier", modifierSlug)
            }

            //additionally, we should know what rewards a node will have to begin with
            let possibleRewards = Object.entries(CrittaReward.REWARDTYPES).map(([rewardType, rewardData]) => [rewardData, (typeof rewardData.baseWeight == "undefined" ? 0 : rewardData.baseWeight) + (env.crittaMap.weights[rewardType] || 0)])
            console.log("te", this.difficulty, typeof this.difficulty)
            switch(this.difficulty) {
                case "0":
                case "1":
                    this.rewards = [CrittaReward.REWARDTYPES["component"]]
                break

                case "2":
                case "3":
                    this.rewards = [CrittaReward.REWARDTYPES["impulse"]]
                break

                default:
                    this.rewards = []
            }

            //do reward rolls
            //weightRand is a new thing in corru.js near rand
            for (let i = 0; i < Math.clamp(Number(this.difficulty) + 1, 1, 3); i++) {
                this.rewards.push(weightRand(possibleRewards))
            }

        } else {
            this.rewards = [CrittaReward.REWARDTYPES.global]
        }
        
        this.innerHTML = `<div class="rewardpreview"></div>`
        let rewardPreview = this.querySelector(".rewardpreview")

        //collect reward info
        let rewards = ``;
        for (const reward of this.rewards) {
            rewards += `<li class="reward" type="${reward.slug}" definition="ANALYSIS::'${reward.name.toLowerCase()}';${reward.description}"></li>`
        }

        rewardPreview.insertAdjacentHTML('beforeend', rewards)

        this.setAttribute("generated", true)
    }

    //determines if the node is on the left or right side, or if it intersects both
    // note from a few months later - for the record i wasn't staying up until 2AM to figure out how to tell which side something's on LOL
    // that's kinda how this reads... but it's actually because I only implemented limited paths the night before launch based on some feedback
    figureOutSideMyGodItIs2InTheMorningFUCKKK() {
        var thisRect = this.getBoundingClientRect()
        var mapRect = env.crittaMap.map.getBoundingClientRect()
        var mapCenter = mapRect.left + mapRect.width / 2
    
        if (
            thisRect.left < mapCenter &&
            thisRect.right > mapCenter
        ) {
            return "center"
        } else if (thisRect.left < mapCenter) {
            return "left"
        } else {
            return "right"
        }
    }

    //when a node is moved to, either trigger a fight or note it was safe
    onMovedTo() {
        console.log("sidelock?", this.sideLock, this.side)
        if(this.sideLock && this.side != "center") {
            env.crittaMap.setAttribute("sidelock", this.side)
            console.log("locking")
        } else {
            env.crittaMap.removeAttribute("sidelock")
            console.log("unlocking")
        }

        chatter({actor: 'sourceless', text: `daemons spring forth from the ocean!`, readout: true})

        let classes = `${this.difficulty == "4" ? "" : "crittamode"}${this.formation.class ? ` ${this.formation.class}` : ""}`
        let effectiveEnemies = this.formation.enemies

        let bgm = this.formation.getBgm ? this.formation.getBgm() : this.difficulty >= 2 ? env.e3a2.preferredBgm.boss : env.e3a2.preferredBgm.combat

        //random!
        if(typeof bgm == "string") {
            let category = env.e3a2.tracks[bgm.split("-")[1]]
            let options = Object.entries(category).filter(t=>shouldItShow(t[1]))

            bgm = options.sample()[1]
            bgm.load()
            
            console.log("got random", category, options, bgm)
        }

        let bgmRate = this.formation.bgmRate ? this.formation.bgmRate : bgm.intendedRate ? bgm.intendedRate : 1
        let bgmStart = 0
        let bgmVol = env.bgm.volume()
        
        if(bgm._src.includes("daemon_midboss")) {
            switch(this.difficulty) {
                case 2: bgmRate = 0.75; break
                case 3: bgmRate = 0.85; break
                case 4: bgmRate = 1; break
            }
        }

        if(bgm.randomRates) bgmRate = bgm.randomRates.sample()
        if(bgm.randomStarts) bgmStart = bgm.randomStarts.sample()

        bgm.intendedRate = bgmRate
        let settings = {
            effectiveEnemies, // we pass the formation this way because we want to allow global modifiers to poke it
            party: page.party,
            bgm,
            bgmRate,
            bgmStart,
            bgmVol,
            teamAlterations: this.getAlterations(),
            combatClass: classes,
            manualStop: true,
            manualStopCallback: (loser)=> this.handleVictory(loser),
            endCallback: (loser) => this.complete(loser), //me looking at a loser: "this.complete(loser)"
            actorPreprocess: (actor) => CrittaNode.daemonSpawn(actor, "preprocess"),
            actorSpriteProcess: (actor) => CrittaNode.daemonSpawn(actor, "sprite"),
            startCallback: ()=> {
                if(this.component) env.rpg.setAttribute('component', this.component.slug);
                if(this.modifier) env.rpg.insertAdjacentHTML('beforeend', `<div component="${this.component.slug}" definition="EFFECT::${this.modifier.getHelp().toUpperCase()}" class="modifier">${this.modifier.name}</div>`);
                env.rpg.setAttribute('tension', this.tension);
            }
        }

        for (const modifier of env.crittaMap.getModArray()) {
            if(modifier.beforeCombat) modifier.beforeCombat(settings)
        }

        let finalEnemies = []
        settings.effectiveEnemies.forEach(enemySlug => {
            let group = env.COMBAT_GROUPS[weightRand(CrittaMap.TENSIONWEIGHT[env.crittaMap.tension])]
            if(group[enemySlug]) { // if their slug is in here, use that instead cause they're generic/replace-intended
                let selection = group[enemySlug].sample()
                switch(typeof group[enemySlug]) {
                    case "object": // (array)
                        finalEnemies = finalEnemies.concat(selection)
                    break

                    default: finalEnemies.push(selection)
                }
            } else { // otherwise trust that the enemy exists
                finalEnemies.push(enemySlug)
            }
        })
        settings.effectiveEnemies = finalEnemies
        

        try{
            startCombat(settings.effectiveEnemies, settings.party, settings)
        } catch(e) { printError(e) }
    }

    //a function for displaying a success/rewards dialog within combat itself, and a button to continue
    handleVictory(loser) {
        if(env.rpg.handling) return;
        env.rpg.handling = true
        ratween(env.bgm, 0.25)

        if(this.type == "boss") {
            if(loser.name == "enemy") return; //handled by status
        }

        switch(loser.name) {
            case "enemy": // SUCCESS - the daemons sink beneath the ocean. {REWARD TABLE} [CONTINUE]
                env.rpg.insertAdjacentHTML(`beforeend`, `
                    <div id="crittaresult" class="hideresult">
                        <h1><span>Success :)</span></h1>
                        <button class="button">Retrieve Resources</button>
                    </div>
                `)
                
                if(env.crittaMap.depth > 0) env.crittaMap.adjustDepth(env.crittaMap.depth - 1)
            break
            
            case "ally": // FAILURE - active shells have been broken. [CONTINUE]
                env.rpg.insertAdjacentHTML(`beforeend`, `
                    <div id="crittaresult" class="hideresult">
                        <h1><span>Failure :(</span></h1>
                        <button class="button">Continue</button>
                    </div>
                `)
                if(env.e3a2) env.e3a2.clearWarningListener()
            break
        }

        setTimeout(()=>{
            env.rpg.querySelector('#crittaresult').classList.remove('hideresult')
            if(check("PAGE!!dream")) play('talkgel', 0.9);
            else play('talkgal', 0.4);
                
        }, 400)

        env.rpg.querySelectorAll(`.button`).forEach(e=>{
            e.addEventListener('mouseenter', ()=>play('muiHover'))
            e.addEventListener('click', ()=> {
                play('muiClick')
                
                if(loser.name == "enemy") {
                    this.reapRewards(loser);
                    env.rpg.classList.add('reaping-rewards')
                }
                else this.complete(loser);

                e.style.pointerEvents = "none"
                e.disabled = true
            })
        })
    }

    //when a node is 'completed', we mark it so
    //win/loss type stuff goes here too
    complete(loser) { // "ally", "enemy", or "nofight"
        if(this.completed) return;
        this.completed = true

        if(loser == "nofight") {
            chatter({actor: 'sourceless', text: `nothing's here.`, readout: true})
        
        } else switch(loser.name) {
            case "enemy":
                if(this.type == "boss") { // boss defeat has a whole thing going on
                    return
                }
                
                let healed = false
                
                page.party.slice(page.party.partyLimit || 3, page.party.length).forEach(member=>{
                    if(member.hp == member.maxhp) return
    
                    healed = true
                    let combatActor = env.COMBAT_ACTORS[member.combatActor]
                    member.hp += combatActor.maxhp * 0.5
    
                    if(member.hp > combatActor.maxhp) member.hp = combatActor.maxhp
                })
    
                if(healed) readoutAdd({
                    message: `<div class="action-text">NOTE::'inactive party members regenerated HP'</div>`, 
                    name: "sourceless", 
                    type: "sourceless combat", 
                    show: true,
                    forceMini: true,
                    sfx: false
                })

                this.setThisAndAttribute('completed', true)
                
                //only 10% chance for fishy spot cause fishies are so fucked up. on april 1st it's 25% chance
                let chance = env.crittaMap.baseFishChance;
                let today = new Date()
                if(today.getMonth() === 3 && today.getDate() === 1) chance = 0.25;

                setTimeout(()=>{
                    if(env.e3a2.startFishing && Math.random() < chance) {
                        [... content.querySelectorAll(".fishy")].sample().classList.add("active")
                        if(Math.random() < 0.3) [... content.querySelectorAll(".fishy")].sample().classList.add("active") // chance for more than one
                        chatter({actor: 'sourceless', text: `the water around the vessel stirs...`, readout: true, sfx: false})
                        play("talkchoir", 0.5)
                    }
                }, 2000)
            break

            case "ally":
                if(env.e3a2 && body.getAttribute("menu") == "crittamap") {
                    env.e3a2.toggleMap(true)
                }
                env.combat.lossState(check("PAGE!!dream") ? "dreamdeath" : "death")
                content.classList.add('goodbye');content.classList.add('dying')
                closeCombat(loser)

                if(page.pixi) {
                    page.pixi.stop()
                    page.pixi.view.classList.add("still", "fade")
                }
            break
        }
    }

    //nodes give rewards based on generation
    //recursively called after each reward to reap all of them
    reapRewards(loser, i = 0) {
        let reward = this.rewards[i]
        if(!reward) throw 'somehow exceeded node reward length';
        
        let id = `reward${env.crittaCount++}`
        content.insertAdjacentHTML(`beforeend`, `<critta-reward id="${id}" class="pre-show" type="${reward.slug}" difficulty="${this.difficulty}" component="${this.component.slug}"></critta-reward`)

        let rewardEl = content.querySelector(`critta-reward#${id}`)
        setTimeout(() => rewardEl.activate(), 100);
        
        if(i < this.rewards.length - 1) {
            rewardEl.completeCallback = () => {
                this.reapRewards(loser, i+1)
            }
        } else {
            rewardEl.completeCallback = () => closeCombat(loser)
            if(env.e3a2) env.e3a2.updateExchangeScreen()     
        }
    }

    getModifiers() {
        let modifiers = []
        if(this.modifier) modifiers.push(this.modifier);
        modifiers = modifiers.concat(env.crittaMap.getModArray())

        return modifiers
    }

    getAlterations() {
        var endAlterations = {}
        let modifiers = this.getModifiers()

        if(modifiers.length) {
            for (const modifier of modifiers) {
                if(modifier.alterations) for(const teamName in modifier.alterations) {
                    if(!endAlterations[teamName]) endAlterations[teamName] = [].concat(modifier.alterations[teamName])
                    else endAlterations[teamName] = endAlterations[teamName].concat(modifier.alterations[teamName])
                }                    
            }
        }

       return endAlterations
    }

    getRewardsList() {
        let rewardsList = []

        this.rewards.forEach(reward => { 
            let existingCount = rewardsList.find(r => r[0].name == reward.name)
            if(existingCount) existingCount[1]++
            else rewardsList.push([reward, 1])
        })

        return rewardsList
    }

    // generation for the interaction menu for this node
    // doubles as both the options display for a selected node,
    // and the tooltip for an unselected node
    /* 
        this should compile...
        - encounter difficulty
        - zones affecting, their rewards and modifiers
        - reward chances
    */
    getInteractionHTML(inRange = false) {
        // determine node name strings
        let nodeDensity, densityDefinition, specialClass, difficultyClass, headsUp, headsUpHelp
        switch(this.difficulty) {
            case "0":
                nodeDensity = "low"
                densityDefinition= "'scarce unallocated resources';'lesser thoughtforms'"
                difficultyClass = "low"
            break

            case "1":
                nodeDensity = "normal"
                densityDefinition= "'conglomeration of unallocated resources and thoughtforms'"
                difficultyClass = "mid"
            break

            case "2":
                nodeDensity = "high"
                densityDefinition= "'plentiful unallocated resources';'greater thoughtforms'"
                difficultyClass = "high"
            break

            case "3":
                nodeDensity = "special"
                densityDefinition= "'unallocated high-threat thoughtform'"
                difficultyClass = "miniboss"
                
                headsUp = this.formation.name
                headsUpHelp = this.formation.help
            break

            case "4":
                nodeDensity = "???"
                densityDefinition= "'intersection of enormous thoughtform';'extreme HP pool';'persists between iterations'"
                difficultyClass = "boss"
            break
        }

        // display modifiers
        let mainModString = false
        if(this.component && this.modifier) {
            mainModString = `<div component="${this.component.slug}" definition="EFFECT::${this.modifier.getHelp().toUpperCase()}" class="modifier">${this.modifier.name}</div>`
        }

        //determine how we want to angle this menu to fit on screen
        let thisBounds = this.getBoundingClientRect()
        let thisCenterX = thisBounds.left + thisBounds.width / 2
        let thisCenterY = thisBounds.top + thisBounds.height / 2

        let mapBounds = env.crittaMap.getBoundingClientRect()
        let mapCenterX = mapBounds.left + mapBounds.width / 2
        let mapCenterY = mapBounds.top + mapBounds.height / 2

        let position
        if (thisCenterY < mapCenterY && thisCenterX < mapCenterX) {
            position = "upper-left";
        } else if (thisCenterY < mapCenterY && thisCenterX > mapCenterX) {
            position = "upper-right";
        } else if (thisCenterY > mapCenterY && thisCenterX < mapCenterX) {
            position = "lower-left";
        } else if (thisCenterY > mapCenterY && thisCenterX > mapCenterX) {
            position = "lower-right";
        }

        //clear if completed
        if(this.completed) {
            nodeDensity = "empty"
            densityDefinition = "'previously harvested resources'"
            difficultyClass = "cleared"
        }

        //collect reward info
        let rewardsList = this.getRewardsList()

        let rewards = ``;
        for (const [reward, count] of rewardsList) {
            rewards += `<li class="reward" definition="ANALYSIS::${reward.description}">${reward.name}${count > 1 ? ` x ${count}` : ""}</li>`            
        }

        // finally, compile details
        let bossHP = check("e3a2bosshp")
        if(bossHP < 0 || !bossHP) {
            bossHP = 1000000
            change("e3a2bosshp", 1000000)
        }

        let template = `
        <aside id="infopanel-${this.id}" class="infopanel ${specialClass ? specialClass : ""}" difficulty="${difficultyClass}" ${this.completed ? "cleared" : ""} position="${position}">
            ${mainModString && !this.completed ? mainModString : ""}

            <div class="title">
                <span class="type ${difficultyClass}" definition="ANALYSIS::${densityDefinition}">DENSITY::${nodeDensity}</span>
            </div>

            ${this.difficulty < 4 ? `
                <ul class="rewards">${rewards}</ul>
            `
            ://if it is a boss, show this instead
            `<span class="bosshp" definition="NOTICE::'limited iteration intersection';'damage will not reset between iterations'">${bossHP}HP*</span>`}

            ${headsUp ? `<span class="bossname" definition="ANALYSIS::${ headsUpHelp }">${headsUp}</span>` : `` }

            ${
                inRange ?
                `
                <div class="buttons">
                    <button class="button" intent="go">Proceed</button>
                    <button class="button" intent="cancel">Cancel</button>
                </div>
                `
                :
                `
                <div class="buttons">
                    <button class="button" disabled intent="cancel">Unavailable</button>
                </div>
                `
            }
            </div>
        </aside>
        `

        return template
    }

    // when clicking a node, mark it as the selected node on the map
    // open menu as appropriate
    // also handles menu buttons
    clickEvent(event) {
        let el = event.target 
        if(!el.classList || body.classList.contains("in-dialogue")) return

        if(el.classList.contains("button")) {
            switch(el.getAttribute('intent')) {
                case "go":
                    if(!check("bosswarn") && this.difficulty == "4") {
                        startDialogue("bosswarn")
            
                    } else {
                        env.crittaMap.playerShip.moveTo(this,
                            {
                                done: ()=>{
                                    this.onMovedTo()
                                }
                            }
                        )

                        this.closeMenu()                            
                    }                 
                break

                case "cancel":
                    env.crittaMap.clearSelectedNode()
                break
            }
            
        } else if(el.tagName == "CRITTA-NODE") { // clicking on the node itself
            if(env.crittaMap.selectedNode == this) { // toggling off
                env.crittaMap.clearSelectedNode()

            } else { // new selection
                env.crittaMap.selectNodeID(this.id)

            }
        }
    }

    openMenu() {
        let sideLockedOut = false
        let currentLock = env.crittaMap.getAttribute("sidelock")
        if(currentLock != this.side && this.side != "center" && currentLock) {
            sideLockedOut = true
        }

        if(
            this.parentElement.classList.contains("current-depth") &&
            !sideLockedOut
        ) {
            this.insertAdjacentHTML('beforeend',this.getInteractionHTML(true))
        } else {
            this.insertAdjacentHTML('beforeend',this.getInteractionHTML(false))
        }
    }

    closeMenu() {
        this.querySelectorAll('.infopanel').forEach(el=>el.remove())
    }
    
    // on removing a node, clear selection if selected (i.e. in the case of generated nodes)
    disconnectedCallback() {
        if(env.crittaMap.selectedNode == this) env.crittaMap.clearSelectedNode()
    }

    setThisAndAttribute(attribute, value) {
        this[attribute] = value
        if(value === false) this.removeAttribute(attribute)
        else this.setAttribute(attribute, value)
    }

    //alters an actor being spawned in startCombat() to have a daemon like appearance
    //all enemies will have mimic versions of their sprite to swap to, some might need additional processing
    static daemonSpawn(actor, event) {
        if(actor.team.name == "ally" || actor?.specialClass?.includes("daemonactor") || actor?.specialClass?.includes("intrusive")) return;

        switch(event) {
            case "preprocess":
                //daemons don't talk
                actor.specialReactions = {}
        
                //actor-specific overrides
                switch(actor.originalSlug) {
                    case "kivii":
                        actor.name = "Greater Husk"
                    break;

                    case "bstrdboss_lowintensity":
                        actor.name = "Gun Golem"
                    break;

                    case "bstrdshelf":
                        actor.statusImmunities = ["stun"]
                    break
                }
            break

            case "sprite":
                if(!actor.sprite) {
                    return
                }

                //do mimic swap
                actor.sprite.querySelectorAll("img").forEach(el=> el.src = el.src.replace(".gif", "") + "_mimic.gif" )
                actor.sprite.classList.add("daemon-mimic")
                actor.sprite.querySelectorAll(".target").forEach(el=>el.setAttribute("entity", "daemon mimic"))
                
                //actor-specific sprite settings
                switch(actor.originalSlug) {
                    case "bstrdboss_lowintensity":
                        actor.sprite.querySelectorAll('img').forEach(el=> {if(el.src.includes("bstface")) el.remove()} )
                    break;

                    case "husk":
                        setTimeout(()=>{
                            actor.sprite.setAttribute("type", 4)
                            actor.sprite.setAttribute("b", 4)
                            actor.sprite.setAttribute("t", 3)
                            actor.sprite.querySelector("img.basis").src = `/img/sprites/combat/foes/husks/type4_bottom1_mimic.gif`
                        }, 100)
                    break;
                }
            break
        }
    }
}
customElements.define('critta-node', CrittaNode);


/***************************************/
/* player controller 
    just represents the vessel position, only has a function to control movement animation
    positioned via vmin so scaling is predictable
*/
/***************************************/
class CrittaShip extends HTMLElement {
    constructor() {
        super()
        if(this.getAttribute("generated")) return; // opera GX fix

        this.innerHTML = ``
        this.canMove = true
        env.crittaMap.playerShip = this
        this.setAttribute("generated", true)
    }

    
    moveTo(node, settings) {
        if(!this.canMove) return

        let nodePos = node.getBoundingClientRect()
        let mapPos = env.crittaMap.getBoundingClientRect()
        let vminX = (((nodePos.x - mapPos.x) + nodePos.width / 2) / mapPos.height) * 100
        let vminY = (((nodePos.y - mapPos.y) + nodePos.height / 2) / mapPos.width) * 100

        this.style.setProperty("--x", `${vminX}vmin`)
        this.style.setProperty("--y", `${vminY}vmin`)

        this.canMove = false

        setTimeout(()=>{
            if(settings.done) settings.done()
        }, 2000)
        setTimeout(()=>{
            this.canMove = true
        }, 4000)
    }
}
customElements.define('critta-ship', CrittaShip);


/***************************************/
/* reward selection controller 
    animation, generation, and general handler for the choice reward system
    presents a bunch of options based on the attribute setup

    it has a lifecycle like...
    - PENDING: constructed and added to page, creates entire interface but hidden. callbacks can be assigned in this time
    - ACTIVE: animates in, mostly controlled via css, active state where it's taking up the screen
    - CLAIMED: closing state - after selection is made, animate out and self-remove, do any callbacks
*/
/***************************************/
class CrittaReward extends HTMLElement {
    constructor() {
        super()
        if(this.getAttribute("generated")) return; // opera GX fix

        this.typeName = this.getAttribute("type")
        this.type = CrittaReward.REWARDTYPES[this.typeName]
        this.component = this.getAttribute("component")
        this.difficulty = this.getAttribute("difficulty")
        this.id = this.id || `reward${env.crittaCount++}`

        this.openCallback = false
        this.completeCallback = false
 
        if(!env.crittaMap) {env.e3a2.toggleMap(true); setTimeout(()=>env.e3a2.toggleMap(false))}
        if(env.crittaMap.tension >= 4 && this.typeName == "impulse") {
            this.classList.add('excessive')
        }

        this.generate()
        
        env.rewardScreenActive = true
        setTimeout(() => {
            if(env?.stage?.freemove && !env.rpg?.active) toggleMouseLook(false) //pause
            console.log(env?.stage?.freemove, !env.rpg?.active, "attempted to pause")
        }, 200)
    }

    // begins the "PENDING" stage
    // gets options from this' type and constructs the HTML
    generate() {
        this.rewardSet = this.type.getOptions(this)
        
        //everything is controlled by radio buttons, so labels are what contains all the magic
        let contents = ``
        for (const [i, rewardObj] of Object.entries(this.rewardSet)) {
            
            let labelContent = ``
            switch(rewardObj.displayType) {
                case "component":
                    labelContent = `
                        <span class="display">
                            <span class="component" usage="${rewardObj.amtHeld}">${rewardObj.component.slug}</span>
                        </span>
                        <span class="info">
                            <span class="name">${rewardObj.quantity > 1 ? `${rewardObj.quantity}x ` : ""}${rewardObj.name}</span>
                            <span class="description">${rewardObj.description}</span>
                        </span>
                    `
                break

                case "image":
                    labelContent = `
                        <span class="display">
                            <img class="${this.getAttribute('type')}-img ${rewardObj.imageClass || ""}" src="${rewardObj.image}">
                        </span>
                        <span class="info">
                            <span class="name">${rewardObj.name}</span>
                            <span class="description">${rewardObj.description}</span>
                        </span>
                    `
                break

                case "imageSet":
                    labelContent = `
                        <span class="display" style="--totalImages: ${rewardObj.imageSet.length}">
                            ${
                                rewardObj.imageSet.map((image, i) => `<img class="${this.getAttribute('type')}-img" style="--thisIndex: ${i}" src="${image}">`).join("\n")
                            }
                        </span>
                        <span class="info">
                            <span class="name">${rewardObj.name}</span>
                            <span class="description">${rewardObj.description}</span>
                        </span>
                    `
                break
            }

            contents += `<div class="reward-option ${rewardObj.class ? rewardObj.class : ''}" style="--index: ${Number(i)}" ${rewardObj.component ? `component="${typeof rewardObj.component == "object" ? rewardObj.component.slug : rewardObj.component}"` : ""}>
                <input type="radio" name="${this.id}-reward" value="${i}" id="${this.id}-${i}">
                <label for="${this.id}-${i}">
                    ${labelContent}
                </label>
            </div>`
        }

        let actorSelection = ``
        if(this.type.actorSelection) {
            for (let i = 0; i < page.party.length; i++) {
                const member = page.party[i];
                actorSelection += `<div class="actor-option" style="--index: ${i}">
                    <input type="radio" name="${this.id}-actor" value="${member.slug}" id="${member.slug}-actor">
                    <label for="${member.slug}-actor">
                        ${generatePartySlide(member)}
                    </label>
                </div>`
            }

            actorSelection = `<fieldset class="actor-choice" type="actor" help="select a shell" style="--total: ${page.party.length}">${actorSelection}</fieldset>`
        }

        this.innerHTML = `
            <h1 definition="NOTICE::${this.type.description}">${this.type.name}</h1>
            <fieldset type="main" help="${this.type.help}" style="--total: ${this.rewardSet.length}">${contents}</fieldset>
            ${this.type.actorSelection ? actorSelection : ""}
            <div class="buttons">
                <button disabled class="button" intent="confirm">Confirm</button>
                ${this.type.canDecline ? `<button class="button" intent="decline">Decline</button>` : ""}
            </div>
        `

        this.querySelectorAll(".partymember").forEach(el=>el.classList.add("partymember-editable", "crittamember"))
        
        //account for all required selections
        this.confirm = this.querySelector('button[intent="confirm"]')
        this.fieldsets = [... this.querySelectorAll('fieldset')]
        this.selections = {}

        this.fieldsets.forEach(fieldset => {
            let thisType = fieldset.getAttribute('type')
            this.selections[thisType] = false

            //if a reward has an eligibility check for a party member, execute that and disable/deselect as needed
            fieldset.addEventListener('change', () => {
                this.selections[thisType] = fieldset.querySelector('input[type="radio"]:checked')

                if(thisType == "main" && this.type.actorSelection) {
                    let selectedReward = this.rewardSet[this.selections.main.value]
                    if(selectedReward.eligibilityCheck) for (const member of page.party) {
                        let eligible = selectedReward.eligibilityCheck(member)
                        let el = this.querySelector(`input[value="${member.slug}"]`)

                        if(eligible) {
                            el.disabled = false
                        } else {
                            el.disabled = true
                            if(el.checked) {
                                el.checked = false
                                this.selections.actor = false
                            }
                        }
                    }
                }

                this.checkReadiness()
            })
        })
        
        this.confirm.addEventListener('click', () => {
            let ready = this.checkReadiness()
            if(!ready) return;

            this.classList.add('confirmed')
            this.confirm.disabled = true

            this.type.reapOption(
                this, 
                this.rewardSet[this.selections.main.value], 
                this.type.actorSelection ? page.party.find(member=>member.slug == this.selections.actor.value) : false
            )
            
            this.closeout()
        })
        
        this.querySelectorAll('button[intent="decline"]').forEach(el=>el.addEventListener('click', () => {
            this.closeout()
        }))

        this.setAttribute("generated", true)
    }

    // marks the confirm button as either disabled or not based on selections
    checkReadiness() {
        let canProceed = true
        for (const [selectionType, selectionValue] of Object.entries(this.selections)) if(!selectionValue) canProceed = false
        this.confirm.disabled = !canProceed

        return canProceed
    }

    // animate in via CSS, lock off other stuff as needed, callbacks
    activate() {
        this.classList.remove("pre-show")
        if(this.openCallback) this.openCallback();
    }

    //animate out, remove, callbacks
    closeout() {
        this.classList.add("pre-show", "fading")
        if(this.completeCallback) this.completeCallback();

        delete env.rewardScreenActive
        setTimeout(()=>{
            if(env?.stage?.freemove && !env.rewardScreenActive) toggleMouseLook(true) //unpause
            console.log(env?.stage?.freemove, "attempted to unpause")
        }, 500)
        
        setTimeout(()=>{
            this.remove()
        }, 2000)
    }

    /* 
        reward types all share key functions and properties
    */
    static REWARDTYPES = {

        // gives a selection of one humor out of three. guaranteed to use thisReward's component
        component: {
            slug: "component",
            name: "Humor Cache",
            description: "'behavioral organelle';'influences available actions'",
            help: "select humor\nequippable shell alteration",
            baseWeight: 1.5,
            getOptions: function (thisReward) {
                let rewardSet = []

                //collect valid components to show
                let components = []
                if(thisReward.component) components.push(env.COMBAT_COMPONENTS[thisReward.component])
                for (let i = 0; i < (thisReward.component ? 2 : 3); i++) {
                    let validChoices = env.crittaMap.possibleZoneComponents.filter(possible => !components.includes(possible))
                    components.push(validChoices.sample())
                }

                //construct rewardSet objects
                //we want to display the actions you can get from humors in this screen
                for (const component of components) {
                    let actionList = ``

                    for (const slotName of ["primary", "secondary", "utility"]) {
                        if(component[slotName]) {
                            component[slotName].alterations

                            actionList += `<li slot="${slotName}">
                                <h2>${slotName}</h2>
                                ${CrittaMenu.generateComponentEffectHTML(component.slug, slotName, {displayOnly: true})}
                            </li>`
                        }
                    }
                    
                    let description = `
                        <span>IMBUEMENT::${component.description}</span>
                        <span class="accent-color">IMPARTS::${component.help}</span>

                        ${ actionList ? 
                        `
                        <ul class="component-actions">
                            ${actionList}
                        </ul>` : ``
                        }
                    `

                    rewardSet.push({
                        name: component.name,
                        amtHeld: page.flags.components[component.slug] || "0",
                        quantity: 1,
                        displayType: "component",
                        component,
                        description,
                    })
                }

                return rewardSet
            },

            //takes a rewardObj from a rewardSet
            reapOption: function (thisReward, rewardObj) {
                CrittaReward.safeAdd(page.flags.components, rewardObj.component.slug, rewardObj.quantity)
                chatter({actor: 'sys', text: `NOTICE::'retrieved resource';'${rewardObj.quantity} ${rewardObj.component.name.toLowerCase()}'`, readout: false})
            }
        },

        // gives a selection of one impulse out of 3. one is guaranteed to be this component's type
        impulse: {
            slug: "impulse",
            name: "Impulse Cache",
            description: "'knowledge pattern organelle';'permanently alters proficiencies'",
            help: "select impulse\npermanent shell alterations",
            actorSelection: true,
            canDecline: true,
            baseWeight: 0.5,

            // generates selection from status effects
            getOptions: function (thisReward) {
                let rewardSet = []

                // collect valid statuses to select from
                let possibleImpulses = []

                for (const impulse of Object.entries(env.STATUS_EFFECTS).filter(entry => entry[1].impulse)) {
                    switch(impulse[1].impulse.type) {
                        case "common":
                            possibleImpulses.push(impulse)
                        break

                        case "action":
                            if(env.crittaMap.tension < 1) continue;
                            possibleImpulses.push(impulse)
                        break

                        case "fated":
                            if(env.crittaMap.tension < 3) continue;
                            possibleImpulses.push(impulse)
                        break
                    }
                }

                possibleImpulses = shuffle(possibleImpulses)
                
                let rewardImpulses = []
                let themedReward
                if(thisReward.component) {
                    let componentIndex = possibleImpulses.findIndex(status => status[1].impulse.component == thisReward.component)
                    if(componentIndex) {
                        themedReward = possibleImpulses.splice(componentIndex, 1)[0]
                        rewardImpulses.push(themedReward)
                    }
                }
                //then the randoms to fill the rest of the slots
                for (let i = 0; i < (themedReward ? 2 : 3); i++) rewardImpulses.push(possibleImpulses.shift());

                //construct rewardSet objects
                for (const [statusSlug, status] of rewardImpulses) {
                    let description = status.help
                    switch(status.impulse.type) {
                        case "fated":
                            description += `\n<span style="color: var(--neutral-color)">shells can only have one fated impulse, but it can be replaced with another</span>`
                        break

                        case "action":
                            description += `\n<span style="color: var(--neutral-color)">shells can only have one action impulse, but it can be replaced with another</span>`
                        break
                    }

                    rewardSet.push({
                        name: status.name,
                        description: description,
                        quantity: 1,
                        displayType: "image",
                        image: status.icon,
                        component: status.impulse.component ? status.impulse.component : false,
                        impulse: status,
                        imageClass: `passive-${statusSlug}`,
                        //we don't let you stack
                        eligibilityCheck: (member) => {
                            //check to make sure they don't already have it
                            return (
                                (member.alterations ? !member.alterations.some(alteration => alteration[1] == statusSlug && alteration[2] == "IMPULSE") : true)
                                && //then check and see if the status itself has an eligibility check
                                (typeof status.impulse.eligibility == "function" ? status.impulse.eligibility(member): true)
                            )
                        }
                    })
                }

                return rewardSet
            },

            reapOption: function (thisReward, rewardObj, selectedActor) {
                if(!selectedActor.alterations) selectedActor.alterations = []
                //if you picked a fated or action impulse, overwrite the old one
                let overwritten = false

                if(rewardObj.impulse.impulse.type == "fated" || rewardObj.impulse.impulse.type == "action") {
                    selectedActor.alterations = selectedActor.alterations.filter(alter=>{
                        if(alter[3] == rewardObj.impulse.impulse.type) {
                            overwritten = env.STATUS_EFFECTS[alter[1]]
                            return false
                        } else {
                            return true
                        }
                    })
                }

                console.log('this type is', rewardObj.impulse.impulse.type, 'so overwrrite is', overwritten)

                selectedActor.alterations.push(["STATUS", rewardObj.impulse.slug, "IMPULSE", rewardObj.impulse.impulse.type])
                chatter({actor: 'sys', text: `NOTICE::${overwritten ? `${rewardObj.impulse.impulse.type} impulse <span definition="EFFECT::${processHelp(overwritten, {caps: true})}">${overwritten.name.toUpperCase()}</span> overwritten` : 'shell imprinted with impulse'}'shell imprinted with impulse';'<span definition="EFFECT::${processHelp(rewardObj.impulse, {caps: true})}">${rewardObj.impulse.name.toUpperCase()}</span>'`, readout: overwritten ? true : false})
            }
        },

        item: {
            slug: "item",
            name: "Item Cache",
            description: "'single-use actions and materials'",
            help: "select collection\nexchange at terminal if needed",
            baseWeight: 0.75,
            
            //items can be from one of three sets - support, offense, special.
            //item caches always offer one from each set
            options: {
                support: [
                    ["restorative", 4, "ichor"],
                    ["satik_cyst", 4, "bone"],
                ],

                offense: [
                    ["kavruka", 4, "claws"],
                    ["aima_cyst", 4, "eyes"],
                    ["error", 4, "light"],
                ],

                special: [
                    ["sfer_cube", 5],
                    ["disabler", 2, "claws"],
                    ["drill", 1, "bstrd"],
                    ["rot", 1, "bstrd"],
                    ["rewrite", 1, "bstrd"],
                    ["empower", 1, "bstrd"],
                ]

            },

            // generates selection from sets of valid item rewards, held within here
            getOptions: function (thisReward) {
                let rewardSet = []

                for (const [setName, itemSelections] of Object.entries(this.options)) {
                    let hitMax

                    //only show items that they aren't capped on
                    let validItems = itemSelections.filter(([itemSlug, amt]) => {
                        let currentQty = checkItem(itemSlug)
                        let ref = env.ITEM_LIST[itemSlug]

                        if((currentQty + amt) > ref.max) return false;
                        else return true
                    })
                    if(validItems.length == 0) {validItems.push(["sfer_cube", 5]); hitMax = true}
                    
                    let itemSet = validItems.sample()
                    let [itemSlug, itemQty] = itemSet
                    let itemRef = env.ITEM_LIST[itemSlug]
                    let currentQty = checkItem(itemSlug)
                    let itemAction = check("PAGE!!2dcombat") ? (itemRef.sceneAction || itemRef.combatAction) : itemRef.combatAction

                    rewardSet.push({
                        name: `${itemRef.name} <span class="qty">(${itemQty})</span>`,
                        description: `
                        <div class="item-details">
                            ${(itemRef.exec || itemRef.combatAction) ? `<div class="item-usage">
                                ${itemRef.exec ? `<span class="item-ooc">${processHelp(itemRef, {specialObj: itemRef.oocnote})}</span>` : ``}
                                ${itemRef.combatAction ? `<span class="item-ic"><span definition="ACTION++${itemAction.slug}">${itemAction.name.toUpperCase()}</span></span>` : ``}
                            </div>`
                            : 
                            `<div class="item-description">::FUNCTION::${processHelp(itemRef, {specialObj: itemRef.description})}</div>`
                            }
                            ${currentQty ? `<div class="currently-held">current inventory: ${checkItem(itemSlug)} / ${itemRef.max}</div>` : ''}
                        </div>
                        `,
                        displayType: "image",
                        image: itemRef.image,
                        itemSet,
                        component: itemSet[2] ? itemSet[2] : false,
                        class: setName
                    })
                }
                
                return rewardSet
            },

            //should add items in sequence based on the table
            reapOption: function (thisReward, rewardObj) {
                let [itemSlug, qty] = rewardObj.itemSet
                let itemObj = env.ITEM_LIST[itemSlug]

                if(!addItem(itemSlug, qty)) {
                    chatter({actor: 'sys', text: `ATTENTION::'unable to retrieve item due to maximum';'${itemObj.name}';'automatically converted to ${qty} sfer cube'`, readout: false})
                    addItem("sfer_cube", qty)
                } else {
                    chatter({actor: 'sys', text: `NOTICE::'retrieved resource';'${qty}';'${itemObj.name.toLowerCase()}'`, readout: false})
                }
            }
        },

        fish: {
            slug: "fish",
            name: "Fishy",
            description: "'special single-use actions or materials'",
            help: "claim catch or feed to terminal",
            baseWeight: 0,

            getOptions: function (thisReward) {
                let rewardSet = []

                let fishRewards = [
                    [page.lastCaughtFish.item, 1, page.lastCaughtFish.component],
                    ["sfer_cube", 2]
                ]

                for (const itemSet of fishRewards) {
                    let [itemSlug, itemQty] = itemSet
                    console.log(itemSet, fishRewards, itemSlug, itemQty)
                    let itemRef = env.ITEM_LIST[itemSlug]
                    let currentQty = checkItem(itemSlug)

                    rewardSet.push({
                        name: `${itemRef.name} <span class="qty">(${itemQty})</span>`,
                        description: `
                        <div class="item-details">
                            <div class="item-description">::FUNCTION::${itemRef.description}</div>
                            ${(itemRef.exec || itemRef.combatAction) ? `<div class="item-usage">
                                ${itemRef.exec ? `<span class="item-ooc">${itemRef.oocnote}</span>` : ``}
                                ${itemRef.combatAction ? `<span class="item-ic">${itemRef.combatAction.desc}</span>` : ``}
                            </div>`
                            : ``
                            }
                            ${currentQty ? `<div class="currently-held">current inventory: ${checkItem(itemSlug)} / ${itemRef.max}</div>` : ''}
                        </div>
                        `,
                        displayType: "image",
                        image: itemRef.image,
                        itemSet,
                        component: itemSet[2] ? itemSet[2] : false,
                        class: itemSlug == "sfer_cube" ? "special" : "fish"
                    })
                }
                
                return rewardSet
            },

            //should add items in sequence based on the table
            reapOption: function (thisReward, rewardObj) {
                let [itemSlug, qty] = rewardObj.itemSet
                let itemObj = env.ITEM_LIST[itemSlug]

                if(!addItem(itemSlug, qty)) {
                    chatter({actor: 'sys', text: `ATTENTION::'unable to retrieve item due to maximum';'${itemObj.name}';'automatically converted to ${qty} sfer cube'`, readout: false})
                    addItem("sfer_cube", qty)
                } else {
                    chatter({actor: 'sys', text: `NOTICE::'retrieved resource';'${qty}';'${itemObj.name.toLowerCase()}'`, readout: false})
                }

                if(check("STAGE!!freedomtoggled")) {
                    change("STAGE!!freedomtoggled", "DELETE")
                    mask({name: "freedom", toggle: true, playSound: false})
                }
            }
        },

        // global modifiers that can stack
        global: {
            slug: "global",
            name: "Iteration Revision",
            description: "'revision to iteration procedure'",
            help: "select adversarial revision\npersists until iteration loss\nor render cessation",
            baseWeight: 0, // does not spawn normally
            
            getOptions: function (thisReward) {
                let rewardSet = []

                //we get all globals that are allowed to spawn
                //and filter out anything that shouldn't stack
                let possibleGlobals = shuffle(Object.entries(env.MODIFIERS).filter(entry => {
                    let stacks = entry[1].stacks
                    if(typeof entry[1].stacks == "number") if(env.crittaMap.getModQty(entry[0]) >= entry[1].stacks) stacks = false;

                    return (
                        entry[1].global &&
                        shouldItShow(entry[1]) &&
                        !(!stacks && env.crittaMap.getModQty(entry[0]))
                
                    )
                }))

                let globalOptions = []

                if(possibleGlobals.length < 4) globalOptions = possibleGlobals;
                else for (let i = 0; i < 3; i++) globalOptions.push(possibleGlobals.shift())
                
                for (const [modSlug, mod] of globalOptions) {
                    
                    let description = mod.getHelp()
                    let name = mod.name
                    let num = env.crittaMap.getModQty(modSlug)
                    if(mod.tension) description += `\n<span class="${mod.tension > 1 ? "obesk" : "neutral"}-color" definition="NOTICE::'will raise difficulty of opponents'">${mod.tension > 0 ? `+${mod.tension}` : mod.tension } TENSION</span>`
                    if(typeof mod.stacks == "number" && num) name += ` <span class="neutral-color" definition="NOTICE::'limited revision';'cannot be enacted more than maximum number'">(${num}/${mod.stacks})</span>`

                    rewardSet.push({
                        name,
                        description, 
                        quantity: 1,
                        displayType: "image",
                        image: mod.icon,
                        modSlug,
                        class: modSlug,
                        mod,
                    })
                }

                return rewardSet
            },

            //should add items in sequence based on the table
            reapOption: function (thisReward, rewardObj) {
                env.crittaMap.adjustModQty(rewardObj.modSlug, "+", 1)
                if(rewardObj.mod.onChosen) rewardObj.mod.onChosen();
                env.crittaMap.generate()            
            }
        },
    }

    //initializer and adder for some rewards
    static safeAdd(pool, name, value) { if(pool[name]) pool[name] += value; else pool[name] = value }
}
customElements.define('critta-reward', CrittaReward);

class CrittaMenu extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = `
        <div id="cauldron">
            <button class="button" intent="close">Close</button>
            <div id="palette"> <!-- should be generated from core list of components --> </div>
            <div id="canvas">
                <!-- for consistency, when a slot is filled, it should contain a component type-->
                <div class="slot" slot="primary"><div class="component"></div></div>
                <div class="slotart" slot="primary"></div>

                <div class="slot" slot="secondary"><div class="component"></div></div>
                <div class="slotart" slot="secondary"></div>

                <div class="slot" slot="utility"><div class="component"></div></div>
                <div class="slotart" slot="utility"></div>
                <div class="slotart" slot="bonus"></div>
            </div>
            <div id="critta-info">
                <div class="identity"> 
                    <div class="portrait">
                        <img src="/img/placeholdportrait.gif" class="partymember-portrait">
                        <input class="imgurl" name="imgurl" type="text" value="/img/placeholdportrait.gif"> <!-- this should only show if you hover over the image -->                        
                        <details class="eyedrop"></details>
                        <button class="button" intent="randomize" definition="NOTE::'draw from cached signature appearances'">Random</button>
                    </div>
                    <div class="numbers statdisplay">
                        <div class="core statpool"></div>
                    </div>
                </div>
                <div class="stats">
                    <input name="name" class="name" value="critta" type="text" maxlength="13">
                    <div class="partymember-actions"></div>
                </div>
            </div>
            <div class="buttons">
                <button class="button" definition="NOTE::'solidify entity composition'" intent="save">Save</button>
                <button class="button" definition="NOTE::'reset to current entity composition'" intent="reset">Reset</button>
            </div>
        </div>
        `
        
        //initialize references
        this.palette = this.querySelector("#palette")
        this.canvas = this.querySelector("#canvas")
        this.info = this.querySelector("#critta-info")
        this.selectedMember = this.getAttribute("member")
        this.totals = {} // i.e. { "eyes": {total: 0, used: 0}, ... } - used for availability on components, etc
        this.limbo = {} // i.e. { "eyes": 1, ...} - pending changes, keeps track of the number of 'unsaved' elements being used. can be negative (i.e. previously present element removed)
        this.eyeDrop = this.querySelector('.eyedrop')
        env.crittaMenu = this

        //generate eye selection
        let totalEyes = `<summary definition="NOTICE::'access fragments of cached network signatures'">Toggle Cache</summary>
        <div class='eyelist'>`
        for (const eyeURL of CrittaMenu.possibleShellEyes) {
            totalEyes += `<img src="${eyeURL}" class="eyeselect">`
        }
        totalEyes += "</div>"
        this.eyeDrop.innerHTML = totalEyes

        this.update()
    }

    //collect and log the number of components unlocked, and in use.
    updateNumbers() {
        this.totals = CrittaMenu.getTotals()
    }

    static getTotals() {
        let totals = {}
        let thisMenu = env.crittaMenu

        //collect from flags or define if needed
        for (const componentName in env.COMBAT_COMPONENTS) {
            if(!totals[componentName]) totals[componentName] = {total: 0, used: 0}
            if(page.flags?.components) if(page.flags.components[componentName]) totals[componentName].total = page.flags.components[componentName]
            
            if(thisMenu) {
                if(typeof thisMenu.limbo[componentName] != "undefined") totals[componentName].used += thisMenu.limbo[componentName];
                else thisMenu.limbo[componentName] = 0 //define limbo sections here
            }
        }

        //collect those in full use
        for (const member of page.party) { 
            if(member.components) for (const slotName in member.components) {
                const slotContents = member.components[slotName]
                totals[slotContents].used += 1
            }

            //also calculate augment usage since those are powered by additional components here
            if(member.augments) for (const augmentName of member.augments) {
                const augment = env.ACTOR_AUGMENTS.generic[augmentName]
                const componentName = augment.component[1]

                totals[componentName].used += augment.cost
            }
        }

        //determine availability
        for (const componentName in totals) {
            if (Object.hasOwnProperty.call(totals, componentName)) {
                const componentTotals = totals[componentName]
                componentTotals.available = componentTotals.total - componentTotals.used                
            }
        }

        return totals
    }

    // called whenever the entity attribute is changed, or a component is changed
    update() {
        console.log('updating')
        this.updateNumbers()
        this.allowClose = false

        // clear out palette and update with appropriate contents
        this.palette.innerHTML = ""
        for (const componentName in env.COMBAT_COMPONENTS) {
            if(shouldItShow(env.COMBAT_COMPONENTS[componentName])) this.palette.insertAdjacentHTML(`beforeend`, this.generateComponentHTML(componentName, this.totals))
        }

        if(this.selectedMember) {
            // if there's not yet a current entity copy, or it's different from the actual selection, update the copy
            if(!this.editingMember || this.editingMember?.slug != this.selectedMember) { 
                console.log('redefining editingMember', this.editingMember?.slug, this.selectedMember )
                this.resetEditingMember()
            }

            // update the component display based on the member's components
            let currentSlots = this.canvas.querySelectorAll(".slot")
            for (const el of currentSlots) {
                let thisSlot = el.getAttribute("slot")
                let newHTML = ""
                let currentComponent = this.editingMember.components[thisSlot]

                if(currentComponent) {
                    newHTML = this.generateComponentHTML(currentComponent, this.totals)
                    newHTML += CrittaMenu.generateComponentEffectHTML(currentComponent, thisSlot, {editingMember: this.editingMember})
                    newHTML += `<button class="component-clear button" intent="clearslot">Clear</button>`
                    if(el.getAttribute('component') != currentComponent) el.setAttribute("component", currentComponent)
                } else {
                    newHTML = `<div class="component" component="empty" definition="EMPTY\nNOTE::'will utilize unaltered ability'"></div>`
                    newHTML += CrittaMenu.generateComponentEffectHTML("empty", thisSlot, {editingMember: this.editingMember})
                    if(el.getAttribute('component')) el.removeAttribute("component")
                }
                
                el.innerHTML = newHTML
            }

            let slotArt = this.canvas.querySelectorAll(".slotart")
            for (const el of slotArt) {
                let slot = this.canvas.querySelector(`.slot[slot="${el.getAttribute("slot")}"]`)
                if(slot) el.setAttribute("component", slot.getAttribute("component") || "empty");
                else {
                    el.setAttribute("component", env.COMBAT_ACTORS.generic.events.onSpawn(false, this.editingMember) || "empty")
                }
            }
            
    
            // fill out the info panel based on the member's data and components
            this.info.querySelector(".name").value = this.editingMember.name

            let portraitUrl = this.editingMember.portraitUrl || `/img/placeholdportrait.gif`
            this.info.querySelector(".partymember-portrait").src = portraitUrl
            this.info.querySelector(".imgurl").value = portraitUrl

            // display stats
            this.info.querySelector('.statdisplay').innerHTML = `
                <div class="core statpool"></div>
            `

            let statsCoreEl = this.info.querySelector('.statdisplay .core')

            let stats = generateCombatStats(this.editingMember)
            let statLists = CrittaMenu.generateStatHTMLObject(stats, {member: this.editingMember, editingMember: this.editingMember})

            if(statLists?.core) statsCoreEl.innerHTML = statLists.core
            
            //enforce HP display even if unaltered
            if(!statsCoreEl.querySelector('.stat[type="maxhp"]')) {
                statsCoreEl.insertAdjacentHTML(`afterbegin`,`
                    <div class="stat" 
                        type="maxhp" 
                        pretty="${env.STATDATA["maxhp"].display}"
                        definition="INFO::${env.STATDATA["maxhp"].description}"
                    >${env.COMBAT_ACTORS[this.editingMember.combatActor].maxhp}</div>
                `)
            }

            // display actions
            let actionsEl = this.info.querySelector(".partymember-actions")
            actionsEl.innerHTML = "<h2>Actions</h2>" + generatePartyActions(this.editingMember)

            //mark unsaved changes if necessary
            this.notifyUnsaved()

            //add hover sounds where appropriate
            this.querySelectorAll(`.component, button, input, .eyeselect, summary`).forEach(e=>{
                if(e.eventsInitialized) return

                switch(e.tagName) {
                    case "INPUT":
                        e.addEventListener('mouseenter', ()=>play('muiHover', 1.5))
                        e.addEventListener('keydown', ()=>play("muiReadout", 1.5))
                        e.addEventListener('focusout', ()=>play("click2", 1.25))
                    break

                    case "BUTTON":
                        e.addEventListener('mouseenter', ()=>play('muiHover', 1))
                    break

                    default:
                        e.addEventListener('mouseenter', ()=>play('obeskHover', 1.5, 0.5))
                    break
                }

                e.eventsInitialized = true
            })

            //do any animations
            if(this.resetAnim) {
                let anim = this.resetAnim
                this.classList.add(anim)
                setTimeout(() => {
                    this.classList.remove(anim)
                }, anim == "omega-saved" ? 200 : 100);
                this.resetAnim = false
            }
        }
    }


    // display customization 
    customizeCritta({name = "", portraitUrl = ""}) {
        if(name) {
            this.editingMember.name = name
        }

        if(portraitUrl) {
            this.editingMember.portraitUrl = portraitUrl
            this.info.querySelector(".partymember-portrait").src = portraitUrl
            this.info.querySelector(".imgurl").value = portraitUrl
        }
    }

    //generates an HTML string for a component selection, specifically for the palette
    generateComponentHTML(componentName, totals) {
        let component = env.COMBAT_COMPONENTS[componentName]
        let componentTotals = totals[componentName]
        return `
            <div 
                class="component ${componentTotals.available ? "" : "out-of-stock"} ${componentTotals.total ? "" : "undiscovered"}" 
                component="${componentName}"
                ${
                    componentTotals.total ? 
                    `definition="component::'${component.name.toLowerCase()}'\nINHERITED CONTEXT::${component.description}\nUSAGE::${componentTotals.used}/${componentTotals.total}"` 
                    : 
                    `definition="component::'unknown component type';'find within iteration for analysis'"`
                }
                usage="${componentTotals.used}/${componentTotals.total}"
            ></div>
        `
    }

    // click tracking
    clickEvent(event) {
        let el = event.target 
        console.log(el)
        if(!el.classList) return // we use classes for targeting

        /* 
            On component click:
                If the component is in the palette and has none available, return and do nothing.

                If no selection, select the component
                
                If selection is el, clear selection.

                If currentSelection is in palette,
                    if el is in palette, just update selection
                    if el is in slot, replace critta slot with selection

                If currentSelection is in a slot,
                    if el is in palette, replace the slot with the el (same func as above reversed?)
                    if el is in slot, replace slot with el, but also delete old slot

                If any changes happened, update.

        */
        if(el.classList.contains("component")) {
            if(
                el.parentElement == this.palette && this.totals[el.getAttribute('component')].available == 0
            ) {
                return

            } else if(!this.currentSelection) {
                play("obeskHover", 0.75)
                this.selectComponent(el)

            } else if(this.currentSelection == el) {
                play("click1", 1.5)
                this.clearSelection()

            } else if(this.currentSelection.parentElement == this.palette) { // palette swap
                if(el.parentElement == this.palette) { // update palette selection
                    this.selectComponent(el)
                    play("obeskHover", 0.75)

                } else { // slot swap
                    this.modifySlot(el.parentElement, this.currentSelection)
                    this.update()
                    play("dull", 2)
                }
                
            } else if(this.currentSelection.parentElement.classList.contains("slot")) { // slot swap
                if(el.parentElement == this.palette) { // modify from palette
                    this.modifySlot(this.currentSelection.parentElement, el)
                    this.update()

                } else { // slot swap
                    if(this.currentSelection.getAttribute('component') == "empty") { // clicking on a slot with an empty slot selected
                        this.modifySlot(this.currentSelection.parentElement, el, {swappingFrom: el.parentElement.getAttribute("slot"), noNumberChange: true})
                    } else { // clicking on an occupied slot with a selected component
                        this.modifySlot(el.parentElement, this.currentSelection, {swappingFrom: this.currentSelection.parentElement.getAttribute("slot"), noNumberChange: true})
                    }

                    this.update()
                } 

                play("dull", 2)
            }
            
            this.eyeDrop.open = false
        }

        //handling for when the clear, save, or cancel buttons are clicked.
        else if(el.classList.contains("button")) {
            switch(el.getAttribute("intent")) {
                case "clearslot":
                    this.modifySlot(el.parentElement, false, {specificComponentName: "empty"})
                    play("muiClick")
                    this.eyeDrop.open = false
                break

                case "save":
                    // update member
                    let i = page.party.findIndex(member => member.slug == this.editingMember.slug)
                    if(i >= 0) page.party[i] = this.editingMember
                    else throw 'party member not found!!'

                    this.editingMember.justSaved = "just-saved"

                    //apply pending augment changes
                    if(this.editingMember.augmentChanges) {
                        for (const augmentSlug of this.editingMember.augmentChanges.add) addAugment(this.editingMember.slug, augmentSlug)
                        for (const augmentSlug of this.editingMember.augmentChanges.remove) removeAugment(this.editingMember.slug, augmentSlug)

                        delete this.editingMember.augmentChanges
                    }

                    if(!this.editingMember.recentSaves) this.editingMember.recentSaves = 1
                    else this.editingMember.recentSaves++

                    if(this.editingMember.recentSaves > 10) {
                        this.editingMember.justSaved = "omega-saved"
                        this.resetAnim = "omega-saved"
                        playCombatCrit()
                    } else {
                        play("hit", 1.25)
                        this.resetAnim = "saved"
                    }
                    
                    clearTimeout(this.spamTimer)
                    this.spamTimer = setTimeout(()=>this.editingMember.recentSaves = 0, 1000)
                    
                    this.limbo = {}
                    this.clearSelection()
                    this.resetEditingMember()
                    togglePartyMenu(true)
                    this.eyeDrop.open = false
                    if(env.e3a2) env.e3a2.updateTubes()
                break

                case "reset":
                    // reset to member reference
                    this.limbo = {}
                    this.clearSelection()
                    this.resetEditingMember()
                    play("obeskToggle", 1.5, 0.5)
                    this.resetAnim = "saved"
                    this.editingMember.recentSaves = 0
                    this.eyeDrop.open = false
                break

                case "close":
                    if(!unsavedMenuWarning()) {
                        toggleCrittaMenu()
                        play('muiClick', 1)
                        this.eyeDrop.open = false
                    }
                return

                case "randomize":
                    this.editingMember.portraitUrl = CrittaMenu.possibleShellEyes.sample({noRepeat: true})
                    this.editingMember.name = CrittaMenu.getShellName()
                    play('talkfairy', 1.5)
                    this.resetAnim = "saved"
                break
            }
            
            this.update()
        }

        //selecting a new eye set to use
        else if(el.classList.contains("eyeselect")) {
            this.editingMember.portraitUrl = el.src
            play('talkfairy', 1.5)
            this.resetAnim = "saved"
            this.update()
        }

        //handling for when toggling an augment on/off
        else if(el.classList.contains("augment-option")) {
            this.eyeDrop.open = false

            if(!this.editingMember.augmentChanges) {
                this.editingMember.augmentChanges = {add: [], remove: []}
            }

            let augmentSlug = el.getAttribute('slug')
            let augmentComponent = el.getAttribute("parent-component")

            // if the augment is equipped, toggle it off
            // if it was in add, then instead just remove it
            if(el.getAttribute('inuse') == "true") {
                if(this.editingMember.augmentChanges.add.includes(augmentSlug)) 
                    this.editingMember.augmentChanges.add = this.editingMember.augmentChanges.add.filter(slug => slug != augmentSlug)
                else this.editingMember.augmentChanges.remove.push(augmentSlug)

                this.limbo[augmentComponent] -= Number(el.getAttribute("cost"))
                console.log('subtracting because toggled off manually')
                this.update()
            }

            // if the augment is not equipped and is affordable, toggle it on
            else if(el.getAttribute('affordable') == "true") {
                if(this.editingMember.augmentChanges.remove.includes(augmentSlug)) 
                    this.editingMember.augmentChanges.remove = this.editingMember.augmentChanges.remove.filter(slug => slug != augmentSlug)
                else this.editingMember.augmentChanges.add.push(augmentSlug)

                this.limbo[augmentComponent] += Number(el.getAttribute("cost"))
                console.log('adding because toggled on manually')
                this.update()
            }

            this.clearSelection()
        }

        else if(el.tagName == "INPUT") {
            this.eyeDrop.open = false
            play("click2", 1.5)
        }
    }

    // event for handling image and name input changes
    // these typically DON'T call this.update()
    inputEvent(event) {
        let el = event.target 
        console.log(el.value)

        switch(el.name) {
            // update image src and save in member
            case "imgurl":
                this.editingMember.portraitUrl = el.value
                this.querySelector('#critta-info .portrait img').src = el.value
            break

            // update member name silently 
            case "name":
                this.editingMember.name = el.value?.toUpperCase()
            break
        }

        this.notifyUnsaved()
    }

    // changes a slot based on an origin component element and destination slot element
    // replacing is an optional specification of slotName if the origin component should be removed from the editingMember
    // (typically in the event of a swap)
    modifySlot(slotEl, componentEl, {swappingFrom = false, specificComponentName, noNumberChange} = {}) {
        let editingSlot = slotEl.getAttribute("slot")
        let newComponentType = componentEl ? componentEl.getAttribute("component") : specificComponentName
        if(!newComponentType) return false
        let oldComponentType = this.editingMember.components[editingSlot] || "empty"

        console.log('updating slot', editingSlot, 'with', newComponentType)
        
        //commit update
        if(newComponentType == "empty") {
            delete this.editingMember.components[editingSlot]
        } else {
            this.editingMember.components[editingSlot] = newComponentType
        }

        //swap or replace as needed
        if(swappingFrom && oldComponentType != "empty") {
            this.editingMember.components[swappingFrom] = oldComponentType
        } else if(swappingFrom && oldComponentType == "empty") {
            delete this.editingMember.components[swappingFrom]
        }

        //if there are augments in the destination that would be lost, mark them as being staged for removal
        //additionally, if there are augments in the origin that would be lost, mark them as removed too
        this.removeAugments(editingSlot, oldComponentType)
        if(swappingFrom) this.removeAugments(swappingFrom, newComponentType);

        if(oldComponentType != "empty" && !noNumberChange) this.limbo[oldComponentType] -= 1
        if(newComponentType != "empty" && !noNumberChange) this.limbo[newComponentType] += 1

        this.clearSelection()
    }

    // shortcut for marking all augments for a component and slot combination as removed
    removeAugments(slotName, componentName) {
        //collect all augments in use and not being removed, or any being added
        let effectiveAugments = []
        if(this.editingMember.augments) effectiveAugments = effectiveAugments.concat(this.editingMember.augments)
        if(this.editingMember.augmentChanges) {
            effectiveAugments = effectiveAugments.concat(this.editingMember.augmentChanges.add)
            effectiveAugments = effectiveAugments.filter(aug => !this.editingMember.augmentChanges.remove.includes(aug))
        } else { // also initialize here if needed since we'll be using it
            this.editingMember.augmentChanges = {add: [], remove: []}
        }

        // for each one, remove from add or add to remove if appropriate, adjusting the limbo point count for each one
        for (const augmentSlug of effectiveAugments) {
            const augment = env.ACTOR_AUGMENTS.generic[augmentSlug]
            if(augment.component[0] == slotName && augment.component[1] == componentName) {
                if(this.editingMember.augmentChanges.add.find(aug => aug == augmentSlug)) { // staged augment
                    this.editingMember.augmentChanges.add = this.editingMember.augmentChanges.add.filter(aug => aug != augmentSlug)
                    console.log('subtracting because removeAugments was called')
                    
                } else { // active augment
                    this.editingMember.augmentChanges.remove.push(augmentSlug)
                }
                
                this.limbo[componentName] -= augment.cost                
            } 
        }
    }

    resetEditingMember() {
        this.editingMember = JSON.parse(JSON.stringify(page.party.find(member=>member.slug == this.selectedMember)))
    }

    // marks an element and clears previous selection
    // element is assumed to be a component
    selectComponent(el) {
        this.querySelectorAll('.selected').forEach(el=>el.classList.remove('selected'))
        el.classList.add('selected')
        this.currentSelection = el
        this.classList.add('has-selection')
    }

    // clears selection if there is one
    clearSelection() {
        this.querySelectorAll('.selected').forEach(el=>el.classList.remove('selected'))
        this.classList.remove('has-selection')
        delete this.currentSelection
    }

    // generation functions
    connectedCallback() {
        this.addEventListener('mousedown', this.clickEvent)
        this.addEventListener('input', this.inputEvent)
    }

    disconnectedCallback() {
        this.removeEventListener('mousedown', this.clickEvent)
        this.removeEventListener('input', this.inputEvent)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`crittamenu attribute '${name}' changed from '${oldValue}' to '${newValue}'`);
        
        if (name === 'member') {
            this.selectedMember = newValue
            this.limbo = {}
            this.clearSelection()
            this.update()
        }
    }

    notifyUnsaved() { 
        //track unsaved state
        if(this.hasUnsavedChanges()) {
            this.setAttribute('unsaved', 'true')
            env.unsavedChanges = true
        } else {
            this.removeAttribute('unsaved')
            env.unsavedChanges = false
        } 
    }

    hasUnsavedChanges() {
        let isUnsaved = false

        for (const changeName in this.limbo) {
            if(this.limbo[changeName] != 0) isUnsaved = true
        }

        if(this.editingMember.augmentChanges) for (const changelistName in this.editingMember.augmentChanges) {
            if(this.editingMember.augmentChanges[changelistName].length) isUnsaved = true
        }

        let selectedMemberRef = page.party.find(member=>member.slug == this.selectedMember)
        if(
            this.editingMember.name != selectedMemberRef.name ||
            this.editingMember.portraitUrl != selectedMemberRef.portraitUrl
        ) isUnsaved = true

        //also check the *order* of components, even if limbo is empty
        for (const slotName in this.editingMember.components) {
            if(selectedMemberRef.components[slotName] != this.editingMember.components[slotName])
                isUnsaved = true
        }

        return isUnsaved
    }

    // generates a list of selectable or already-selected augments for the given component and character
    static generateAugmentListHTML(componentName, slotName, {editingMember = {}} = {}) {
        // get all augments that affect this component, checking their showifs
        let augmentList = []
        augmentList.availablePoints = env.crittaMenu.totals[componentName].available

        for (const augmentName in env.ACTOR_AUGMENTS.generic) {
            const augment = env.ACTOR_AUGMENTS.generic[augmentName]
            if(!augment.component) continue
            if(slotName != augment.component[0] || componentName != augment.component[1]) continue

            let inUse = false
            let show = getShowValidity(augment.showIf, editingMember)

            if(editingMember.augments) {
                if(editingMember.augments.find(aug => aug == augment.slug)) inUse = true
            }

            //also check to see if it's an augment that's in pending changes
            if(editingMember.augmentChanges) {
                if(editingMember.augmentChanges.add.find(aug => aug == augment.slug)) inUse = true
                if(editingMember.augmentChanges.remove.find(aug => aug == augment.slug)) inUse = false
            }
            
            if(show) {
                augmentList.push(
                    {
                        augment,
                        unlocked: getShowValidity(augment.unlocks),
                        affordable: augment.cost <= augmentList.availablePoints,
                        inUse 
                    }
                )
            }
        }
        
        // generate HTML for them and whether they've been selected already in the current member
        let showAnything = false
        let returnHTML = `
            <div class="augment-options">
                ${(()=>{
                    let componentAugments = ""
                    
                    augmentList.forEach(augmentData=>{
                        showAnything = true
                        let augment = augmentData.augment
                        componentAugments += `<div class="augment-option noclosemenu"
                            member="${editingMember.slug}"
                            actor="${editingMember.combatActor}"
                            slug="${augment.slug}"
                            inuse="${augmentData.inUse}"
                            unlocked="${augmentData.unlocked}"
                            affordable="${augmentData.affordable}"
                            cost="${augment.cost}"
                            parent-component="${componentName}"
                            style="--img: url(${augment.image || "/img/sprites/combat/items/aimacyst.gif"})"
                            definition="${augmentData.unlocked ? 
                                `AUGMENT::'${augment.name}'\nCOST::${augment.cost} ${componentName.toUpperCase()}${augmentData.affordable || augmentData.inUse ? `${augmentData.inUse ? " (click to remove)" : ``}` : " (cannot afford)"}\nINHERITED CONTEXT::\n\t${augment.description.replaceAll(';', '\n\t')}`
                                : 
                                `AUGMENT::UNKNOWN\nNOTICE::'obtain data source to utilize'`
                            }
                            "
                        >
                        </div>`
                    })

                    return componentAugments
                })()}
            </div>
        `
        
        return showAnything ? returnHTML : ""
    }

    //generates an object with stat lists for use in stat displays
    static generateStatHTMLObject(stats, {member, slotName, componentName, editingMember = {}} = {}) {
        let returnStats = {
            core: "",
            in: "",
            out: ""
        }

        let component = false
        if(componentName) component = env.COMBAT_COMPONENTS[componentName][slotName]

        //if a specific component is specified, we can also get a list of perma/auto statuses from it
        if(component?.alterations || member?.components) {
            function addStatusLine(statusObj) {
                returnStats.core += `
                    <div class="stat status" 
                        type="status" 
                        pretty="${statusObj.name}"
                        definition="STATUS++${statusObj.slug}"
                        good="${statusObj.beneficial ? String(statusObj.beneficial).replace("true", "good") : "bad"}"
                    >+ ${statusObj.name}</div>
                `
            }

            function addActionLine(actionObj, override = "ADD") {
                let effectiveOverride = override
                switch(effectiveOverride) {
                    case "ADD": break
                    default:
                        effectiveOverride = env.ACTIONS[override].name
                }

                returnStats.core += `
                    <div class="stat action" 
                        type="action"
                        override="${effectiveOverride}"
                        definition="ACTION++${actionObj.slug}"
                    >${actionObj.name}</div>
                `
            }

            //for components, we also compile any used augments to display the proper end effect
            if(component?.alterations) {
                let effectiveAlterations = [... component.alterations]

                //get all augments that...
                    // that AREN'T in pending remove AND are currently in use
                    // are in the pending add
                let effectiveAugments = []
                if(editingMember.augments) effectiveAugments = effectiveAugments.concat(editingMember.augments)
                if(editingMember.augmentChanges) {
                    effectiveAugments = effectiveAugments.concat(editingMember.augmentChanges.add)
                    effectiveAugments = effectiveAugments.filter(aug => !editingMember.augmentChanges.remove.includes(aug))
                }

                //combine the gathered augments with the effective alterations
                //filter down to just those for this specific component and slot
                for (const augmentSlug of effectiveAugments) {
                    const augment = env.ACTOR_AUGMENTS.generic[augmentSlug]
                    if(augment.component[0] == slotName && augment.component[1] == componentName) effectiveAlterations = effectiveAlterations.concat(augment.alterations)
                }

                console.log('effective augments are', effectiveAugments, 'alts are', effectiveAlterations)
                for (const alteration of effectiveAlterations) {
                    if(alteration[0] == "STATUS") addStatusLine(env.STATUS_EFFECTS[alteration[1]]);
                    else switch(alteration[0]) {
                        case "ADD":
                            addActionLine(env.ACTIONS[alteration[1]])
                        break
                        
                        default:
                            addActionLine(env.ACTIONS[alteration[1]], alteration[0])
                    }
                }

            //otherwise, if a member is specified, we can get their collective statuses that way
            } else if(member?.components || member?.alterations || member?.augments) {
                for (const statusObj of getPassiveStatusesForPartyMember(member)) {
                    addStatusLine(statusObj)
                }
            }
        }

        for (const statName in stats) {
            const statInfo = env.STATDATA[statName]

            if(statInfo) {
                var statValue = stats[statName]
                let goodClass = false

                //we show all HP if a member is specified
                if(statName == "maxhp" && member) {
                    statValue += env.COMBAT_ACTORS[member.combatActor].maxhp
                }

                if(statValue > 0) {
                    switch(statInfo.good) {
                        case "+":
                            goodClass = "good"
                        break
                        case "-":
                            goodClass = "bad"
                        break
                    }
                } else if (statValue < 0) {
                    switch(statInfo.good) {
                        case "+":
                            goodClass = "bad"
                        break
                        case "-":
                            goodClass = "good"
                        break
                    }
                }
                
                let list = "core"
                if(statName.includes("incoming")) list = "in"
                else if(statName.includes("outgoing")) list = "out"

                returnStats[list] += `
                    <div class="stat ${statName.includes("outgoing") ? "outgoing" : ""} ${statName.includes("incoming") ? "incoming" : ""}" 
                        type="${statName}" 
                        pretty="${statInfo ? statInfo.display : statName}"
                        definition="INFO::${statInfo ? statInfo.description : "'not found'"}"
                        ${goodClass ? `good=${goodClass}` : ""}
                    >${statValue > 0 && statName != "maxhp" ? "+" : ""}${statInfo.percentage ?
                        `${statValue * 100}%`
                        :
                        statValue
                    }</div>
                `
            }
        }

        returnStats.all = returnStats.core + returnStats.in + returnStats.out
        if(returnStats.all == "") return false
        return returnStats
    }

    //generates an HTML string for use in the "canvas", to display a slotted component's effect
    static generateComponentEffectHTML(componentName, slotName, {editingMember, displayOnly} = {}) {
        console.log('generating effect for', componentName)
        let component = env.COMBAT_COMPONENTS[componentName][slotName]
        let nameHTML = ``
        let augmentHTML = ``
        let statHTML = ``

        //determine the name to display for the effect - typically the ability name, status name, or "STAT EFFECT"
        //components only grant one ability or passive (usually)
        if(component.alterations) {
            let effectiveObj = false
            //i.e. [["secondary", "stab"]]
            switch(component.alterations[0][0]) {
                case "STATUS":
                    effectiveObj = env.STATUS_EFFECTS[component.alterations[0][1]]
                    nameHTML = `<span class="name component-status" definition="EFFECT::'stat benefit'">PASSIVE</span>`
                break

                default:
                    effectiveObj = env.ACTIONS[component.alterations[0][1]]
                    nameHTML = `<span class="name component-ability" slot="${slotName}" definition="ACTION++${effectiveObj.slug}">${effectiveObj.name}</span>`
            }
        } else {
            nameHTML = `<span class="name component-stats" definition="EFFECT::'stat benefit'">PASSIVE</span>`
        }

        let statLists = CrittaMenu.generateStatHTMLObject(component.stats, {slotName, componentName, editingMember})
        if(statLists) statHTML = `<div class="statdisplay micro">${statLists.all}</div>`

        augmentHTML = displayOnly ? `` : CrittaMenu.generateAugmentListHTML(componentName, slotName, {editingMember})

        let returnHTML = `
            <div class="componenteffect">
                <div class="details">
                    ${nameHTML}
                    ${statHTML}
                </div>
                <div class="augs">
                    ${augmentHTML}
                </div>
            </div>
        `
        
        return returnHTML
    }

    static get observedAttributes() {
        return ['member'] // List of attributes to observe for changes
    }

    // Returns a new member, does not add it to party by itself
    static generateNewShell() {
        //get identity
        let portraitUrl = this.possibleShellEyes.sample()
        let name = this.getShellName()

        let newCritta = {
            slug: `generic${env.crittaCount++}`,
            combatActor: "generic",
            components: {},
            name,
            portraitUrl,
            critta: true
        }

        return newCritta
    }

    static getShellName() {
        let nameLength = rand(3, 6)
        let name = ""
        for (let i = 0; i < nameLength; i++) {
            name += this.incoherentLibrary.sample()
        }
        return name
    }

    //identity pools - the incoherent library becomes an array that's randomly selected from to make incoherent names
    static incoherentLibrary = [... "wµ¬îV°0KöÂFå÷ú*¼iÿfÝ~üxÛ4BœpºQôuæÕ¡ÔUCÅïSáMÓ”ƒûTÉÊÎý¯Ÿaéõž-&5«¶¾ßì6¢Ëlã‰çÄ£+¤yàdÙmzItj®½ðŠYÜ#±b©íLÚÆÐš„"]
    static possibleShellEyes = [ // shell eyes are both internal (i.e. jakkrabbit) and external corru enjoyer submissions (to be credited on /credits/)
        "/img/sprites/randobesk/signatures/jakkrabbitart1.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart2.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart3.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart4.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart5.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart6.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart7.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart8.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart9.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart10.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart11.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart12.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart13.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart14.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart15.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart16.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart17.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart18.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart19.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart20.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart21.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart22.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart23.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart24.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart25.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart26.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart27.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart28.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart29.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart30.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart31.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart32.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart33.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart34.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart35.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart36.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart37.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart38.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart39.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart40.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart41.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart42.gif",
        "/img/sprites/randobesk/signatures/jakkrabbitart43.gif",
        "/img/sprites/randobesk/signatures/chickenmcnuggets1.png",
        "/img/sprites/randobesk/signatures/chickenmcnuggets2.png",
        "/img/sprites/randobesk/signatures/krookedreality1.png",
        "/img/sprites/randobesk/signatures/krookedreality2.png",
        "/img/sprites/randobesk/signatures/krookedreality3.png",
        "/img/sprites/randobesk/signatures/krookedreality4.png",
        "/img/sprites/randobesk/signatures/krookedreality5.png",
        "/img/sprites/randobesk/signatures/krookedreality6.png",
        "/img/sprites/randobesk/signatures/krookedreality7.png",
        "/img/sprites/randobesk/signatures/krookedreality8.png",
        "/img/sprites/randobesk/signatures/krookedreality9.png",
        "/img/sprites/randobesk/signatures/krookedreality10.png",
        "/img/sprites/randobesk/signatures/krookedreality11.png",
        "/img/sprites/randobesk/signatures/krookedreality12.png",
        "/img/sprites/randobesk/signatures/krookedreality13.png",
        "/img/sprites/randobesk/signatures/beeka1.png",
        "/img/sprites/randobesk/signatures/adr_furret1.gif",
        "/img/sprites/randobesk/signatures/sola1.gif",
        "/img/sprites/randobesk/signatures/sola2.gif",
        "/img/sprites/randobesk/signatures/saiiko.gif",
        "/img/sprites/randobesk/signatures/cyberwaves1.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon3.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon4.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon5.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon6.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon7.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon8.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon9.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon10.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon11.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon12.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon13.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon14.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon15.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon18.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon19.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon20.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon21.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon22.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon24.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon25.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon26.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon27.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon28.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon29.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon30.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon31.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon32.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon33.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon34.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon35.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon36.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon37.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon38.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon39.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon40.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon41.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/genericeyesicon42.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/incoherentthoughtform2.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes1.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes2.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes3.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes4.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes5.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes6.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes7.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes8.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes9.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes10.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes11.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes12.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes13.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes14.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes15.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes16.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes17.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes18.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes19.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes20.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes21.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes22.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes23.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes24.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes25.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes26.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/bonusgenericeyes27.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/mysteriouslighteye1.png",
        "/img/sprites/randobesk/signatures/spacedotexe1.png",
        "/img/sprites/randobesk/signatures/jadrek1.gif",
        "/img/sprites/randobesk/signatures/kazne1.gif",
        "/img/sprites/randobesk/signatures/grimm1.png",
        "/img/sprites/randobesk/signatures/grimm2.png",
        "/img/sprites/randobesk/signatures/chemelia1.png",
        "/img/sprites/randobesk/signatures/chemelia2.png",
        "/img/sprites/randobesk/signatures/chemelia3.png",
        "/img/sprites/randobesk/signatures/chemelia4.png",
        "/img/sprites/randobesk/signatures/chemelia5.png",
        "/img/sprites/randobesk/signatures/joael1.gif",
        "/img/sprites/randobesk/signatures/rayka1.gif",
        "/img/sprites/randobesk/signatures/nova1.png",
        "/img/sprites/randobesk/signatures/nova3.png",
        "/img/sprites/randobesk/signatures/nova4.png",
        "/img/sprites/randobesk/signatures/theelement1.png",
        "/img/sprites/randobesk/signatures/cantharus1.gif",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/ocorkeleyesiconanimated.gif",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/ocyvoraeyesicon.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/ocuniveleyesicon.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/ocalmineyesicon.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/ocukelzeeyesicon.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/ockelsieyeicon.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/ocmournaeyesicon.png",
        "/img/sprites/randobesk/signatures/rainbowcutieo3o/oceliaseyesicon.png",
        "/img/sprites/randobesk/signatures/victoria1.gif",
        "/img/sprites/randobesk/signatures/nova2.png",
        "/img/sprites/randobesk/signatures/sha1.gif",
        "/img/sprites/randobesk/signatures/octo1.png",
        "/img/sprites/randobesk/signatures/pocl1.gif",
        "/img/sprites/randobesk/signatures/pocl2.gif",
        "/img/sprites/randobesk/signatures/pocl3.gif",
        "/img/sprites/randobesk/signatures/pocl4.gif",
    ]
}

//special
if(check("e3a2__dreamescapewin")) CrittaMenu.possibleShellEyes.push("/img/local/uncosm/ozo/akieffigy_portrait_bstrd_nobg.gif")

customElements.define('critta-menu', CrittaMenu);

/* 
    boat escape - a controller and visualizer for the mechanic of the escape sequence
    controls three rows of obstacles, as well as player data (progress/direction/row)
*/

class BoatEscape extends HTMLElement {
    constructor() {
        super()

        //spawn boat in center, facing forward, on the ground
        this.boatCol = 1
        this.direction = 0
        this.boatAir = 0
        this.unnaturalMoving = false

        //oneliner to get the sequence as a proper array in the right order
        this.sequence = this.sequenceRef.split('\n').map(line => line.trim().split('')).reverse()
        this.style.setProperty("--length", this.sequence.length)

        //spawn first five lines
        for (let i = 0; i < 5; i++) this.spawnRow(i, i+1)

        env.boatEscape = this
        this.boat = content.querySelector("#boat")
        env.pauseWallSpawn = true

        setTimeout(()=>{
            env.rpg.allyTeam.members[0].sprite = document.querySelector(".boatgfx.interloper .sprite-wrapper")
            env.rpg.allyTeam.members[1].sprite = document.querySelector(".boatgfx.bstrd .sprite-wrapper")
            env.rpg.allyTeam.members[2].sprite = document.querySelector(".boatgfx.geli .sprite-wrapper")
            env.rpg.allyTeam.members.forEach(mem=>{
                mem.sprite.id = `${mem.slug}-sprite-wrapper`
            })
        }, 500)
    }

    // called to advance the state of the sequence
    // increments progress and spawns in anything that should be visible
    // if naturalMove is false, won't move the boat - happens in the case of landing on a current
    advance({naturalMove = true, dontAdvance = false} = {}) {
        let boatObstacles = this.querySelectorAll("boat-obstacle")
        boatObstacles.forEach(obstacle=>{
            let newDistance = Number(obstacle.distance) - 1

            if(newDistance < 0) {
                obstacle.set("distance", -5)
                obstacle.style.setProperty("--opacity", 0)

                env.setTimeout(()=>{
                    obstacle.remove()
                }, 600)
            } else {
                obstacle.set("distance", newDistance)
            }
        })

        //spawn new row as well
        this.spawnRow(this.lastSpawnedRow + 1)

        //move boat in the direction it's facing
        if(naturalMove && !this.unnaturalMoving) {
            if(this.direction != BoatEscape.DIRECTIONS.forward) {
                this.changeBoatCol(this.boatCol + this.direction)
            }
        } else if(!naturalMove && !dontAdvance) { // to prevent double advancement from tiles
            this.unnaturalMoving = true
            env.rpg.halt = true
            clearTimeout(this.unnaturalMoveTimeout)
            let currentActor = env.rpg.currentActor

            content.classList.add('shifting')
            this.unnaturalMoveTimeout = setTimeout(()=>{
                content.classList.remove('shifting')
                this.unnaturalMoving = false
                env.rpg.halt = false
                if(env.rpg.haltedAttempt == true) advanceTurn(currentActor)
            }, 200)
        }

        //if the boat is in the air, it won't trigger anything, but we will decrement height and stuff
        if(this.boatAir >= 1) {
            this.boatAir--
            env.rpg.style.setProperty("--air", this.boatAir)
            env.rpg.setAttribute("air", this.boatAir)
            if(this.boatAir == 0) {
                env.rpg.classList.remove('midair')
                env.rpg.removeAttribute("air")
            }
        }

        //otherwise, proceed as normal and execute contact/movement events
        this.checkContact()

        //reset direction only if forced by an edge
        if(this.boatCol == 0 || this.boatCol == 2) {
            this.direction = BoatEscape.DIRECTIONS.forward
            setTimeout(()=>{
                this.adjustBoatAngle()
            }, 200)
        }

        //do events afterwards
        boatObstacles.forEach(obstacle=>{
            obstacle.on("advance")
        })

        //update styles
        this.updateBoatSteerLimit()
    }

    updateBoatSteerLimit() {
        if(env.boatEscape.boatCol == 0 || env.boatEscape.direction == -1) {
            env.rpg.setAttribute("stopsteer", "left")
        } else if(env.boatEscape.boatCol == 2 || env.boatEscape.direction == 1) {
            env.rpg.setAttribute("stopsteer", "right")
        } else {
            env.rpg.removeAttribute("stopsteer")
        }
    }

    checkContact() {
        let inAir = this.boatAir > 0
        //execute anything in the same spot as the boat
        //this should be only one thing
        let sameSpot = this.querySelector(`boat-obstacle[distance="0"][col="${this.boatCol}"`) 
        if(sameSpot) {
            //console.log(sameSpot, !inAir, sameSpot.typeRef.hitsAir)
            if(!inAir || sameSpot.typeRef.hitsAir) {
                sameSpot.on("contact")
                //console.log("CONTACT!")
            }
        }
    }

    //spawns a specific row from the sequence
    //we presently assume that the distance defaults to 5
    spawnRow(row, distance = 5) {
        if(row < this.lastSpawnedRow || row > this.sequence.length) return;

        const thisRow = this.sequence[row]
        //console.log('spawning row', row, thisRow)
        if(thisRow) {
            //console.log("row exists, so proceeding")
            let spawn = ''
            thisRow.forEach((obs, j) => {
                //console.log("processing", obs, j)
                if(obs != 0) spawn += `<boat-obstacle type="${obs}" distance="${distance}" col="${j}"></boat-obstacle>`
            })
            this.insertAdjacentHTML("beforeend", spawn)
        } else {
            console.log("row apparently does not exist")
        }

        this.lastSpawnedRow = row
        this.style.setProperty("--progress", this.lastSpawnedRow)
    }

    //steers the boat relatively
    steer(dir) {
        this.direction = Math.clamp(this.direction + BoatEscape.DIRECTIONS[dir], -1, 1)
        this.adjustBoatAngle()
        this.updateBoatSteerLimit()
        //console.log('steering is now', this.direction)
    }

    //updates boat angle based on direction
    adjustBoatAngle() {
        switch(this.direction) {
            case -1: this.boat.style.setProperty('--directionAngle', "-40deg"); break
            case 0: this.boat.style.setProperty('--directionAngle', "0deg"); break
            case 1: this.boat.style.setProperty('--directionAngle', "40deg"); break
        }
    }

    //changes the lane of the boat
    changeBoatCol(col) {
        if(col > 2 || col < 0) return console.log('attempted illegal col change', col)

        this.boatCol = col
        this.boat.style.setProperty("--col", col)
    }

    //ditto, but does so relatively and advances when appropriate
    //also handles weird ones like upleft
    //this is usually only used by tiles, so we also halt advance temporarily
    shiftBoat(direction) {
        console.log("shifting", direction)
        let currentActor = env.rpg.currentActor
        env.setTimeout(()=>{
            switch(direction) {
                case "forward":
                    this.advance({naturalMove: false})
                break

                case "upleft":
                case "upright":
                case "left":
                case "right":
                    // todo: this just makes pads/etc not do anything if someone dies on them. is that really the best solution?
                    var desiredDirection = BoatEscape.DIRECTIONS[direction.replace("up", "")]
                    this.changeBoatCol(this.boatCol + desiredDirection)

                    if(direction.includes("up")) {
                        this.advance({naturalMove: false, dontAdvance: currentActor.hp == 0})
                    }
                break
            }

            this.checkContact()
        }, 100)
    }

    //launches the boat in the air, with the passed val being the 'height' of the launch
    //the height determines the number of advances the boat will pass over and not trigger obstacles
    launchBoat(height) {
        env.rpg.classList.add('midair')
        this.boatAir = height
        this.advance({naturalMove: false})
    }

    //used in reverse order for ease of writing, so top is last, bottom is first
    /* 0 1 - empty or damage obstacle */
    /* ↑ → ← ↖ ↗ - currents */
    /* A I R - items*/
    sequenceRef = `
        000
        000
        000
        DDD
        ☄☄☄
        ŝŝŝ
        →ŝ←
        ↗↑↖
        ↗↑↖
        ↗↑↖
        ↗↑↖
        ↗↑↖
        111
        111
        1S1
        1S1
        1^1
        1↑1
        1↑1
        1↑1
        1↑1
        111
        11S
        11S
        11↑
        11↑
        11↑
        11↑
        11↑
        111
        S11
        S11
        ^11
        ↑11
        ↑11
        ↑11
        ↑11
        111
        1S1
        1S1
        1^1
        1↑1
        1↑1
        1↑1
        1↑1
        1I1
        ☄☄☄
        RRR`
        //above is the "finale" - lots of speed, jumping, culminating in a big crash through the wall

        + `
        ÖÖÖ
        000
        000
        000
        000
        001
        00S
        000
        000
        R00
        000
        000
        100
        S00
        000
        000
        00I
        000
        000
        000
        001
        00S
        000
        000
        ☼☼☼
        000
        000
        000
        000
        000
        CCC`
        //DCT encounter

        + `
        100
        ☄☄☄
        001
        000
        111
        111
        S1S
        0S0
        010
        R1I
        010
        000
        000
        000
        ???`

        //above is a breather area where you can restore HP and whatnot before the big DCT encounter

        + `
        000
        00R
        001
        100
        ↗00
        ↑00
        K01
        100
        0A←
        01↑
        000
        001
        ↑0K
        000
        0↗K
        01↑
        101
        0S0
        000
        1==
        000
        VVV
        000
        000`
        //after the corridor bits, we transition into a sort of mini-boss
        //the intention is to use geli's moveset for big damage

        + `
        IRI
        ☄☄☄
        000
        101
        101
        110
        110
        110
        100
        I10
        010
        01K
        010
        010
        110
        110
        110
        S00
        01↑
        010
        ↑10
        010
        1P1
        101
        101
        11↖
        11↑
        11↑
        11↑
        →↗0
        →0A
        001
        000
        I00
        1PP`
        
        //after the into, above is a bit of corridor navigation while fighting
        //this lets BSTRD shine mainly
        + `
        000
        000
        RRR
        000
        000
        ☄☄☄
        ○○○
        111
        111
        111
        1S1
        ↗↑↖
        ↗0↖
        1↑1
        1↑1
        1↑1
        1↑1
        1!1
        010
        101
        101
        1♥♥
        001
        011
        000
        101
        000
        000
        010
        000
        000
        1↑0
        000
        ↑00
        00↑
        ☼☼☼
        1↑1
        ↗11
        ↑11
        ↑11
        011
        000
        000
        110
        110
        110
        00R
        000
        011
        011
        0↖1
        101
        101
        000
        000
        ☼☼☼
        ↗1↖
        000
        100
        ♠♠♠
        OOO
        --1
        ---
    `
    // (above) starts with a "intro/tutorial" sequence with various tiles

    static DIRECTIONS = {
        left: -1,
        forward: 0,
        right: 1,
    }
    
}
customElements.define('boat-escape', BoatEscape);


/* 
    obstacles have these data/attributes...
    - a type (rock/geyser/boost/etc)
    - distance (from boat)
    - col

    they also keep track of most non-function stuff via attributes for styling, i.e.
    - onAdvance - what happens each turn
    - onContact - what happens if distance is 0 and col = boatcol
    - onPass - what happens if distance is 0 and col != boatcol
*/
class BoatObstacle extends HTMLElement {
    constructor() {
        super()

        this.set("col", this.getAttribute("col"))
        this.set("distance", this.getAttribute("distance"))
        this.set("type", this.getAttribute("type"))
        this.typeRef = BoatObstacle.types[this.type]
        console.log('ref is', this.typeRef, 'for', this.type)
        this.typeRef.class ? this.classList.add(... BoatObstacle.types[this.type].class.split(" ")) : false;
        this.contacted = false

        this.innerHTML = `<figure></figure>`
    }

    // generation functions
    connectedCallback() {

    }

    disconnectedCallback() {

    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(oldValue != newValue) {
            this.set(name, newValue)
        }
    }


    on(event) {
        if(event == "contact" && this.contacted && !BoatObstacle.types[this.type].repeatContact) { // enforce single contact
            return console.log("attempted double contact", this.type)
        } else if(event == "contact") this.contacted = true

        if(typeof BoatObstacle.types[this.type][event] == "function") BoatObstacle.types[this.type][event](this)
    }

    set(attribute, value) {
        this[attribute] = value
        if(value === false) {
            this.removeAttribute(attribute)
            this.style.removeProperty(attribute)
        } else {
            this.setAttribute(attribute, value)
            this.style.setProperty(`--${attribute}`, value)
        }
    }    

    static types = {
        "1" : {
            class: "harmful",
            contact: () => {
                let possibleTargets = env.rpg.allyTeam.members.filter(member => member.hp > 0)
                if(possibleTargets) {
                    let target = possibleTargets.sample()
                    chatter({actor: 'sourceless', text: `${target.name} is struck by a tendril`, readout: true})
                    playCombatCrit("fear")
                    combatHit(target, {amt: 3, crit: 0, autohit: true})
                    addStatus({target, origin: false, status: "puncture", length: 2})
                    addStatus({target, origin: false, status: "vulnerable", length: 2})
                    addStatus({target, origin: false, status: "destabilized", length: 2})
                }
            }
        },

        "↑": {
            class: "movement",
            contact: () => {
                env.boatEscape.shiftBoat("forward")
                play("miss", 0.5, 0.5, 0.4)
            }
        },

        "→": {
            class: "movement",
            contact: () => {
                env.boatEscape.shiftBoat("right")
            }
        },

        "←": {
            class: "movement",
            contact: () => {
                env.boatEscape.shiftBoat("left")
                play("miss", 0.5, 0.5, 0.4)
            }
        },

        "↖": {
            class: "movement",
            contact: () => {
                env.boatEscape.shiftBoat("upleft")
                play("miss", 0.5, 0.5, 0.4)
            }
        },

        "↗": {
            class: "movement",
            contact: () => {
                env.boatEscape.shiftBoat("upright")
                play("miss", 0.5, 0.5, 0.4)
            }
        },

        "S": {
            class: "spring",
            contact: () => {
                console.log('calling launch')
                env.boatEscape.launchBoat(4)
                env.rpg.allyTeam.members.forEach(mem=>addStatus({target: mem, origin: false, status: "focused", length: 2}))
                chatter({actor: 'sourceless', text: `the vessel is launched into the air!!`, readout: true})
            }
        },

        "K": {
            class: "pickup kavruka",
            contact: (thisObstacle) => {
                useAction(env.rpg.allyTeam.members[0], env.ACTIONS["special_attack_all"], env.rpg.enemyTeam.members[0], {triggerActionUseEvent: false, beingUsedAsync: true, force: true})
                chatter({actor: 'sys', text: `NOTICE::'used kavruka'`, readout: true})
                thisObstacle.classList.add('spent')
            }
        },

        "A": {
            class: "pickup aima",
            contact: (thisObstacle) => {
                useAction(env.rpg.allyTeam.members[0], env.ACTIONS["special_spy_all"], env.rpg.enemyTeam.members[0], {triggerActionUseEvent: false, beingUsedAsync: true, force: true})
                chatter({actor: 'sys', text: `NOTICE::'used aima cyst'`, readout: true})
                thisObstacle.classList.add('spent')
            }
        },

        "I": {
            class: "pickup satik",
            contact: (thisObstacle) => {
                useAction(env.rpg.allyTeam.members[0], env.ACTIONS["special_strong_barrier_allies"], env.rpg.enemyTeam.members[0], {triggerActionUseEvent: false, beingUsedAsync: true, force: true})
                chatter({actor: 'sys', text: `NOTICE::'used satik cyst'`, readout: true})
                thisObstacle.classList.add('spent')
            }
        },

        "R": {
            class: "pickup restorative",
            contact: (thisObstacle) => {
                useAction(env.rpg.allyTeam.members[0], env.ACTIONS["restore"], env.rpg.allyTeam.members[0], {triggerActionUseEvent: false, beingUsedAsync: true, force: true})
                useAction(env.rpg.allyTeam.members[0], env.ACTIONS["restore"], env.rpg.allyTeam.members[1], {triggerActionUseEvent: false, beingUsedAsync: true, force: true})
                useAction(env.rpg.allyTeam.members[0], env.ACTIONS["restore"], env.rpg.allyTeam.members[2], {triggerActionUseEvent: false, beingUsedAsync: true, force: true})
                chatter({actor: 'sys', text: `NOTICE::'used restorative cyst'`, readout: true})
                thisObstacle.classList.add('spent')
            }
        },

        //spawns
        "☼": {
            class: "invisible",
            hitsAir: true,
            contact: () => {
                sfxmap.stop()
                play('dull', 0.8, 1)
                midCombatActorAdd(env.rpg.enemyTeam, "critta_knight_boat", "right")
                midCombatActorAdd(env.rpg.enemyTeam, "critta_knight_boat", "right")
                
                chatter({actor: 'sourceless', text: `a threat approaches`, readout: true})
            }
        },

        "P": {
            class: "invisible",
            hitsAir: true,
            contact: () => {
                if(env.rpg.enemyTeam.members >= 7) return;
                sfxmap.stop()
                play('dull', 0.8, 1)
                midCombatActorAdd(env.rpg.enemyTeam, "critta_pawn_boat", "right")
                midCombatActorAdd(env.rpg.enemyTeam, "critta_pawn_boat", "right")
                midCombatActorAdd(env.rpg.enemyTeam, "critta_pawn_boat", "right")
                
                chatter({actor: 'sourceless', text: `a threat approaches`, readout: true})
            }
        },

        "^": {
            class: "movement",
            contact: () => {
                env.boatEscape.shiftBoat("forward")
                
                if(env.rpg.enemyTeam.members >= 5) return;
                sfxmap.stop()
                play('dull', 0.8, 1)
                midCombatActorAdd(env.rpg.enemyTeam, "critta_pawn_boat", "right")
                midCombatActorAdd(env.rpg.enemyTeam, "critta_pawn_boat", "right")
                midCombatActorAdd(env.rpg.enemyTeam, "critta_pawn_boat", "right")
                
                chatter({actor: 'sourceless', text: `a threat approaches`, readout: true})
            }
        },

        "V": {
            class: "invisible",
            hitsAir: true,
            contact: () => {
                // make some space for royalty
                let pawns = env.rpg.enemyTeam.members.filter(member => member.originalSlug == "critta_pawn_boat")
                pawns.forEach(pawn=>{
                    midCombatActorRemove(pawn)
                })

                if(env.rpg.enemyTeam.members >= 5) {
                    env.rpg.enemyTeam.members[1].hp = 0
                    env.rpg.enemyTeam.members[2].hp = 0
                    env.rpg.enemyTeam.members[3].hp = 0
                    env.rpg.enemyTeam.members[4].hp = 0
                    updateStats({actors: env.rpg.enemyTeam.members})
                }

                
                chatter({actor: 'sourceless', text: `a threat approaches`, readout: true})

                env.pauseWallSpawn = true
                sfxmap.stop()
                play('dull', 0.8, 1)
                midCombatActorAdd(env.rpg.enemyTeam, "critta_king_boat")
                midCombatActorAdd(env.rpg.enemyTeam, "critta_bishop_boat")
                midCombatActorAdd(env.rpg.enemyTeam, "critta_knight_boat")
                midCombatActorAdd(env.rpg.enemyTeam, "critta_queen_boat")

                setTimeout(()=>rpgDialogue(env.rpg.allyTeam.members[2], "OH..!!", true, 5000))
            }
        },

        "C": {
            class: "invisible",
            hitsAir: true,
            contact: () => {
                sfxmap.stop()
                play('dull', 0.8, 1)
                midCombatActorAdd(env.rpg.enemyTeam, "critta_jester_boat", "right")
                
                chatter({actor: 'sourceless', text: `a threat approaches`, readout: true})
                setTimeout(()=>rpgDialogue(env.rpg.allyTeam.members[1], "BIGG PROBLEMS FAR AHEAD", true, 5000), 2000)
                setTimeout(()=>rpgDialogue(env.rpg.allyTeam.members[1], "WE GOT2 KILL QUICK!!", true, 5000), 5000)

                ratween(env.bgm, 0.8, 10000)
                env.bgm.intendedRate = 0.8
            }
        },
        
        "-": {
            class: "invisible",
            hitsAir: true,
            contact: () => {
                env.pauseWallSpawn = true
            }
        },

        "+": {
            class: "invisible",
            hitsAir: true,
            contact: () => {
                env.pauseWallSpawn = false
            }
        },

        "☄": {//clears out
            class: "invisible",
            hitsAir: true,
            contact: () => {
                let miscGuys = env.rpg.enemyTeam.members.filter(member => member.originalSlug != "critta_boss_boat")
                miscGuys.forEach(pawn=>{
                    midCombatActorRemove(pawn)
                })
            }
        },

        "ŝ": {
            class: "spring",
            contact: () => {
                let miscGuys = env.rpg.enemyTeam.members.filter(member => member.originalSlug != "critta_boss_boat")
                miscGuys.forEach(pawn=>{
                    midCombatActorRemove(pawn)
                })
                
                env.boatEscape.launchBoat(4)
                env.rpg.allyTeam.members.forEach(mem=>addStatus({target: mem, origin: false, status: "focused", length: 2}))
                chatter({actor: 'sourceless', text: `the vessel is launched into the air!!`, readout: true})
            },
        },

        //dialogue triggers
        "D": {
            class: "invisible",
            hitsAir: true,
            contact: () => {
                
                let pawns = env.rpg.enemyTeam.members.filter(member => member.originalSlug == "critta_pawn_boat")
                pawns.forEach(pawn=>{
                    midCombatActorRemove(pawn)
                })

                ratween(env.bgm, 0.5, 10000)
                env.rpg.classList.add("finalair")

                if(check("PAGE!!dream")) {
                    startDialogue("dreamescapewin")
                } else {
                    startDialogue("escapewin")
                    change("e3a2escape", "complete")
                }
            }
        },

        "♠": {
            class: "invisible",
            hitsAir: true,
            contact: () => {
                rpgDialogue(env.rpg.allyTeam.members[1], "we GET 1 SEC 2 get the hang of this", true, 5000)
                setTimeout(() => rpgDialogue(env.rpg.allyTeam.members[1], "other DAEMONS incoming", true, 5000), 3000)
                setTimeout(() => rpgDialogue(env.rpg.allyTeam.members[1], "watch out 4 MOMENTUM!!!", true, 5000), 6000)
            }
        },

        "♥": {
            class: "invisible",
            hitsAir: true,
            contact: () => {
                rpgDialogue(env.rpg.allyTeam.members[1], "close 1 incoming! STEER @ LAST SEC!!", true, 5000)
            }
        },

        "!": {
            class: "invisible",
            hitsAir: true,
            contact: () => {
                rpgDialogue(env.rpg.allyTeam.members[1], "STEER STRAIGHT QUICK!!", true, 5000)
            }
        },

        "○": {
            class: "invisible",
            hitsAir: true,
            contact: () => {
                rpgDialogue(env.rpg.allyTeam.members[2], "ahahahahaha!!", true, 5000)
            }
        },

        "=": {
            class: "invisible",
            hitsAir: true,
            contact: () => {
                rpgDialogue(env.rpg.allyTeam.members[1], "GELI USE RIFLE SCOPE 4 THESE 1S", true, 5000)
            }
        },

        "?": {
            class: "invisible",
            hitsAir: true,
            contact: () => {
                if(env.rpg.enemyTeam.members.length > 1) {
                    rpgDialogue(env.rpg.allyTeam.members[1], "ok WE NEED 2 CLEAR", true, 5000)
                } else {
                    rpgDialogue(env.rpg.allyTeam.members[1], "ok GET RDY", true, 5000)
                }
                setTimeout(() => rpgDialogue(env.rpg.allyTeam.members[1], "I FEEL BIG 1 COMING", true, 5000), 4000)
            }
        },

        "O": {
            class: "invisible",
            hitsAir: true,
            contact: () => {
                if(!env.bgm._src.includes("escape")) {
                    startDialogue("escapemusic")
                }
            }
        },

        "Ö": {
            class: "invisible",
            hitsAir: true,
            contact: () => {
                if(env.bgm._src.includes("escape")) {
                    rpgDialogue(env.rpg.allyTeam.members[1], "ALMOT THERE!!!", true, 5000)
                    ratween(env.bgm, 1, 10000)
                    env.bgm.intendedRate = 1
                }
            }
        },

        /* special DCT attack telegraphs */
        "W": {
            class: "jestersplash",
            repeatContact: true,
            contact: (thisObstacle) => {
                console.log("contact with jester splash")
                if(thisObstacle.classList.contains("attacking")) {
                    console.log("so we're launching and attacking")
                    env.boatEscape.launchBoat(4)
                    chatter({actor: 'sourceless', text: `the vessel is launched into the air!!`, readout: true})

                    let possibleTargets = env.rpg.allyTeam.members.filter(member => member.hp > 0)
                    if(possibleTargets) {
                        let target = possibleTargets.sample()
                        chatter({actor: 'sourceless', text: `${target.name} is struck by a tendril`, readout: true})
                        playCombatCrit("fear")
                        combatHit(target, {amt: 5, crit: 0, autohit: true})
                        addStatus({target, origin: false, status: "puncture", length: 2})
                        addStatus({target, origin: false, status: "vulnerable", length: 2})
                        addStatus({target, origin: false, status: "destabilized", length: 2})
                    }
                }
            },

            advance: (thisObstacle) => {
                if(thisObstacle.classList.contains("attacking")) {
                    thisObstacle.remove()
                }
            }
        },

        "🌊": {
            class: "jesterwave",
            contact: (thisObstacle) => {
                console.log("contact with jester wave")
                console.log("so we're launching and attacking")
                env.boatEscape.launchBoat(3)
                chatter({actor: 'sourceless', text: `the vessel is launched into the air!!`, readout: true})

                let possibleTargets = env.rpg.allyTeam.members.filter(member => member.hp > 0)
                if(possibleTargets) {
                    let target = possibleTargets.sample()
                    chatter({actor: 'sourceless', text: `${target.name} is dazed by the impact!`, readout: true})
                    playCombatCrit()
                    combatHit(target, {amt: 3, crit: 0, autohit: true})
                    addStatus({target, origin: false, status: "stun", length: 1})
                }
            },

            advance: (thisObstacle) => {
                if(this.unnaturalMoving) return;
                let distance = Number(thisObstacle.getAttribute("distance"))
                distance = distance - 1
                thisObstacle.setAttribute("distance", distance)
                env.boatEscape.checkContact()
            }
        }
    }

    static get observedAttributes() {
        return ['distance', 'col'] // List of attributes to observe for changes
    }
}
customElements.define('boat-obstacle', BoatObstacle);