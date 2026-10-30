
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
            <critta-flashsale></critta-flashsale>
            <div class="button" intent="gamemode" id="gamemodeselect"></div>
        `

        this.map = this.querySelector("#map")
        this.globalList = this.querySelector("#globals")
        this.id = `map${env.crittaCount++}`
        this.loops = 0 // times looped on this element
        this.adjustTension("=", 0) // global difficulty
        this.weights = {} // reward weighting
        this.globalModifiers = {} // received from looping or wagers. structured i.e. {modSlug: modQty, ...}
        this.currentRowSetting = CrittaMap.ROWSETTINGS.base;
        this.baseFishChance = 0.15
        this.sferDeclineBonus = 0
        this.onNodeGenerationEvents = [/* (node) => {something to do with the node} */]
        
        this.gamemodeSelect = this.querySelector("#gamemodeselect")
        this.gamemode = CrittaMap.GAMEMODES.base
        if(!check("framemodes_unlocked") && !check("PAGE!!tempmodeselection")) {
            this.gamemodeSelect.remove()
        }

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

        // delete custom statuses from this iteration to avoid memory leakin on looong runs
        // unless it's from a shellmode reward!
        if(this.customStatuses) {
            for (const status of this.customStatuses) {
                if(!env.STATUS_EFFECTS[status.slug].retainBetweenLoops) delete env.STATUS_EFFECTS[status.slug]
            }

            if(this.customStatuses.length) this.customStatuses = this.customStatuses.filter(status => env.STATUS_EFFECTS[status.slug]?.retainBetweenLoops)
        }
        
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

        switch(el.getAttribute("intent")) {
            case "gamemode":
                if(!this.shipmoving) content.insertAdjacentHTML(`beforeend`, `<critta-reward id="" type="gamemode"></critta-reward>`)
            break
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
            ANALYSIS::'revision tension increases both powerful foe presence and resources'
            CURRENT FOES::${foeHelp}`

        if(this.tension > 0) definition += `\n1+::ACTION IMPULSES AVAILABLE`; else definition += `\n1+::???`
        if(this.tension > 1) definition += `\n2+::FATED IMPULSES AVAILABLE`; else definition += `\n2+::???`

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
                difficulties: [... "11"],
                sideLock: true
            },
            {
                count: 4,
                difficulties: [... "1100"],
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

    /* 
        Tension enemy ratings determine the chance of enemies/minibosses spawning from different pools. 
        rebalanced according to the fact that few runs go beyond 2 or 3 loops, 
        so we want to make sure people can at least see the higher tiers without needing to grind a lot
    */
    static TENSIONWEIGHT = {
        '0': [["collapse", 1]],
        '1': [["collapse", 0.3], ["golem", 0.6], ["daemon", 0.1]],
        '2': [["golem", 0.5], ["collapse", 0.1], ["daemon", 0.4]],
        // past here we just slowly slide into daemon territory further
        '3': [["golem", 0.4], ["daemon", 0.6]],
        '4': [["daemon", 0.8], ["golem", 0.2]],
        // Doom
        '5': [["daemon", 1]],
    }

    /* 
        gamemodes are basically just a wrapper with a name/desc for execs that re-weight things or change various things
        
    */
    static GAMEMODES = {
        base: { 
            slug: "base",
            name: "BSTRD's Vision",
            image: "/img/sprites/combat/modifiers/default_mode.gif",
            component: "rot",
            help: "fast-paced and generous<br><br><n-col>no alterations, default</n-col>",
            setExec: function () {
                env.crittaMap.gamemode = CrittaMap.GAMEMODES.base
                //sorry nothing
            }
        },

        // slow mode is analogous to Regular in the original crittamode
        // rewards are throttled, more things are gated
        // should make for a longer journey, with the higher tensions being far more dangerous
        slow: {
            slug: "slow",
            name: "Starved Dream",
            image: "/img/sprites/combat/modifiers/slow_mode.gif",
            component: "bone",
            help: "slow and methodical, a longer journey<br><br><n-col>caches</n-col> are <o-col>less numerous and generous</o-col><br>reward types limited by node density<br><br><n-col>powerful shop offerings</n-col> are <o-col>limited to higher TENSION</o-col>",
            setExec: function() {
                env.crittaMap.gamemode = CrittaMap.GAMEMODES.slow

                //this means that both minor and moderate nodes will have only one reward
                //balances out since minor will only have components now, moderates are rewarding in that they can give other stuff
                env.crittaMap.rewardMod = -1
                env.crittaMap.baseSferSalePrice = 1

                // shop gated more heavily
                CrittaFlashSale.OFFERINGS.specificImpulse.minimumTension = 1
                CrittaFlashSale.OFFERINGS.specificItem.minimumTension = 1

                CrittaFlashSale.OFFERINGS.specificImpulse.possibleImpulses.forEach(i=>{
                    if(["retaliation", "ichor_last_stand", "impatient", "active_support", "visionary"].includes(i.slug)) i.minimumTension += 2
                    if(["fated_bone", "fated_ichor", "fated_claws", "fated_eyes", "fated_light"].includes(i.slug)) i.minimumTension += 4
                })

                // nodes
                env.crittaMap.difficultyMods = {
                    diff0: {
                        possibleRewards: ["component"] // minor only gives humors
                    },

                    // impulses and equipment only show up on moderate threat or higher
                    diff1: {},

                    // majors and bosses no longer have guaranteed impulse
                    diff2: {
                        baseRewards: [], 
                    },

                    // bosses will no longer offer equipment
                    // mainly because it feels really bad at later tensions
                    diff3: {
                        baseRewards: [],
                        possibleRewards: ["impulse", "component"]
                    },
                }
                
                env.crittaMap.generate()
            }
        },

        // shellmode has the player gathering shells rather than humors or impulses, with quality generated based on difficulty/iteration count
        // so, we drop humors, reduce node rewards similarly to above, and disable editing
        shell: {
            slug: "shell",
            name: "Shellmode",
            image: "/img/sprites/combat/modifiers/shell_mode.gif",
            component: "light",
            showIf: () => check("framemode_fairy") || check("PAGE!!tempmodeselection"),
            help: "so many will die!!! ahahaahaha!!!!!!<br><br><n-col>shell editing</n-col> is <o-col>DISABLED</o-col><br><n-col>shells <o-col>DOWN</o-col></n-col> on combat end are <o-col>DELETED</o-col><br><br><n-col>shell caches replace humor caches</n-col><br><f-col>quality increases with node density and TENSION</f-col><br><br><n-col>SHELLGRINDER</n-col> eats shells to offer <f-col>powerful boons</f-col>",
            setExec: function() {
                env.crittaMap.gamemode = CrittaMap.GAMEMODES.shell

                //like slow, this means that both minor and moderate nodes will have only one reward
                //difficulty increase gives better shells so it's fine though
                env.crittaMap.rewardMod = -1
                CrittaReward.REWARDTYPES.component.baseWeight = 0
                CrittaReward.REWARDTYPES.component.dontSpawnNormally = true
                CrittaReward.REWARDTYPES.shell.baseWeight = 1
                CrittaReward.REWARDTYPES.shell.dontSpawnNormally = false

                // disable editing. even names and images. if a shell's ugly but really good statwise you have to make an incineration value call
                env.crittaMap.disableShellEditing = true
                page.flags.components = {} // you won't be spending these

                // nodes
                env.crittaMap.difficultyMods = {
                    // majors and bosses no longer have guaranteed impulse in line with the reduced rewards
                    diff2: {
                        baseRewards: [], 
                    },

                    // bosses will no longer offer equipment
                    diff3: {
                        baseRewards: [],
                        possibleRewards: ["impulse", "shell"]
                    },
                }

                // set up shell loss
                env.crittaMap.loseDeadShells = true

                // add shell grinder
                if(page.path == "/concepts/critta/") {
                    let button = document.createElement('button')
                    button.id = "concept-shellgrinder"
                    button.textContent = "STEP UP TO SHELL GRINDER"
                    button.addEventListener("click", ()=>{
                        content.insertAdjacentHTML(`beforeend`, `<critta-reward id="waaaa" type="shellGrinderApproach"></critta-reward>`)
                    })
                    content.querySelector("critta-map").appendChild(button)

                }
                env.crittaMap.generate()
                
                if(env?.stage?.name == "vessel") refreshStage({specificPlan: "shellmode"})
            }
        }
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
        this.bonusModifiers = []
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
                this.modifierStatus = this.modifier.getStatus()
                if(this.modifierStatus) this.style.setProperty("--modifierIcon", `url(${this.modifierStatus.icon})`)
                this.setAttribute("modifier", modifierSlug)
            }

            //additionally, we should know what rewards a node will have to begin with
            let possibleRewards = Object.entries(CrittaReward.REWARDTYPES).map(([rewardType, rewardData]) => [rewardData, (typeof rewardData.baseWeight == "undefined" ? 0 : rewardData.baseWeight) + (env.crittaMap.weights[rewardType] || 0)])
            
            //filter down to possible rewards if it's limited for this difficulty
            if(env.crittaMap.difficultyMods) if(env.crittaMap.difficultyMods[`diff${this.difficulty}`]?.possibleRewards) {
                possibleRewards = possibleRewards.filter(r => env.crittaMap.difficultyMods[`diff${this.difficulty}`]?.possibleRewards.includes(r[0].slug))
            }

            console.log("te", this.difficulty, typeof this.difficulty)
            switch(this.difficulty) {
                case "2":
                case "3":
                    this.rewards = env.crittaMap.difficultyMods?.diff3?.baseRewards ? [... env.crittaMap.difficultyMods.diff3.baseRewards] : [CrittaReward.REWARDTYPES["impulse"]]
                break

                default:
                    this.rewards = []
            }

            //do reward rolls
            //weightRand is a new thing in corru.js near rand
            for (let i = 0; i < Math.clamp(Number(this.difficulty) + 1 + (env.crittaMap.rewardMod || 0), 1, 3); i++) {
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
        if(env.crittaMap?.onNodeGenerationEvents?.length > 0) for (const event of env.crittaMap.onNodeGenerationEvents) env.MODIFIERS[event].onNodeGeneration(this)

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
        env.crittaMap.currentNode = this

        console.log("sidelock?", this.sideLock, this.side)
        if(this.sideLock && this.side != "center") {
            env.crittaMap.setAttribute("sidelock", this.side)
            console.log("locking")
        } else {
            env.crittaMap.removeAttribute("sidelock")
            console.log("unlocking")
        }

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
                
                if(env.rpg.classList.contains("nomodifierintro")) {
                    env.rpg.insertAdjacentHTML('beforeend', `<div component="${this.component.slug}" definition="${this.modifierStatus ? `STATUS++${this.modifierStatus.slug}` : `EFFECT::${this.modifier.getHelp().toUpperCase()}`}" class="modifier" style="--icon: url(${this.modifierStatus ? this.modifierStatus.icon : ''})">${this.modifier.name}</div>`);

                } else if(this.modifier) {
                    env.rpg.classList.add('hideteams')
                    env.rpg.insertAdjacentHTML('beforeend', `<div component="${this.component.slug}" definition="${this.modifierStatus ? `STATUS++${this.modifierStatus.slug}` : `EFFECT::${this.modifier.getHelp().toUpperCase()}`}" class="modifier intro"  style="--icon: url(${this.modifierStatus ? this.modifierStatus.icon : ''})">${this.modifier.name}</div>`);
                    if(this.modifier.getStatus) env.rpg.classList.add(`modifierstyle-${this.modifier.getStatus().slug}`)
                    let modifierEl = env.rpg.querySelector('.modifier.intro')
                    bgm.rate(0.1)

                    setTimeout(() => {
                        bgm.rate(0.1)
                        env.rpg.classList.remove('hideteams')
                    }, 400)
                    
                    setTimeout(() => {
                        ratween(bgm, bgmRate, 4000)
                        if(this.component.sound) play(this.component.sound, 0.75)
                        env.rpg.turnOrder.forEach(actor=>{
                            drawEffectLine(modifierEl, actor.box, {
                                color: this.component.color || 'bastard',
                                effectClass: `baseline icon componentline component-${this.component.slug}`,
                                duration: 3000,
                                angleDriftAmount: 0,
                                style: `
                                    --icon: url(${this.modifierStatus.icon || `/img/sprites/combat/statuses/${this.modifierStatus.slug}.gif`});
                                    --count: 0; 
                                    --variation: 0px
                                `
                            })
                        })
                    }, 1400)

                    setTimeout(() => {
                        modifierEl.classList.remove('intro')
                    }, 4000);
                }
                env.rpg.setAttribute('tension', this.tension);
                
                if(this.formation.startCallback) this.formation.startCallback(settings)

                env.rpg.insertAdjacentHTML(`beforeend`, `
                    <button class="forfeit-combat" onmouseenter="play('muiHover')" onclick="play('muiClick');forfeitCombatDialog()">FORFEIT</button>
                `)
                env.rpg.forfeitEl = env.rpg.querySelector('.forfeit-combat')
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
        if(env.rpg.forfeitEl) env.rpg.forfeitEl.remove()

        ratween(env.bgm, 0.25)
        console.log(this, loser, env.rpg.actors.critta_boss)
        console.trace()
        if(this.difficulty == 4) {
            if(loser.name == "ally" && env?.rpg?.actors?.critta_boss) {
                console.log("in the zone")
                if(env.rpg.actors.critta_boss.hp > 0) {
                    startDialogue(check("PAGE!!dream") ? "dreamloop" : "loop")
                    env.rpg.handling = false
                    return;
                }
            }
        } else if(env.crittaMap.loseDeadShells) {
            let deadShells = env.rpg.allyTeam.members.filter(actor=>actor.state == "dead" && actor.member)
            if(deadShells.length > 0) {
                let deadShellNames = deadShells.map(s=>s.name).join(", ")
                let deadShellSlugs = deadShells.map(s=>s.member.slug)
                chatter({actor: 'sourceless', text: `${deadShellNames} ${deadShells.length > 1 ? 'are' : 'is'} lost.`, readout: true, sfx: false, duration: 10000})

                deadShellSlugs.forEach(slug => {
                    let i = page.party.findIndex(member => member.slug === slug)
                    page.party[i].lossReason = "combat"
                    if(!env.crittaMap.lostShells) env.crittaMap.lostShells = []
                    env.crittaMap.lostShells.push(page.party[i])

                    if(i !== -1) page.party.splice(i, 1)
                })
            }
        }

        switch(loser.name) {
            case "enemy": // SUCCESS - the daemons sink beneath the ocean. {REWARD TABLE} [CONTINUE]
                env.rpg.insertAdjacentHTML(`beforeend`, `
                    <div id="crittaresult" class="hideresult">
                        <h1><span>${((this.difficulty == 4) && env.rpg.actors.critta_boss.hp > 0) ? `Success? :/` : `Success :)` }</span></h1>
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

                this.reapRewards(loser)
                env.rpg.classList.add('reaping-rewards')

                e.style.pointerEvents = "none"
                e.disabled = true
            })
        })
    }

    //when a node is 'completed', we mark it so
    //win/loss type stuff goes here too
    complete(loser) { // "ally", "enemy", or "nofight"
        if(this.completed) return;

        if(env.rpg.forfeitEl) env.rpg.forfeitEl.remove()
        if(loser == "nofight") {
            chatter({actor: 'sourceless', text: `nothing's here.`, readout: true})
        
        } else switch(loser.name) {
            case "enemy":                
                //ing rework note - not removed in case we reimplement as a global modifier
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

                env.crittaMap.lastSuccessfulNode = this
                this.setThisAndAttribute('completed', true)
                CrittaFlashSale.reroll()
                
                //only 10% chance for fishy spot cause fishies are so fucked up. on april 1st it's 50% chance
                let chance = env.crittaMap.baseFishChance;
                let today = new Date()
                if(today.getMonth() === 3 && today.getDate() === 1) chance = 0.50;

                setTimeout(()=>{
                    if(env.e3a2.startFishing && Math.random() < chance) {
                        [... content.querySelectorAll(".fishy")].sample().classList.add("active")
                        if(Math.random() < 0.3) [... content.querySelectorAll(".fishy")].sample().classList.add("active") // chance for more than one
                        chatter({actor: 'sourceless', text: `the water around the vessel stirs...`, readout: true, sfx: false})
                        play("talkchoir", 0.5)
                    }
                }, 2000)
            break

            case "ally": // ing rework todo - this is now in sacrifice_giveup, change to instead reapLoss
                env.crittaMap.playerShip.moveTo(env.crittaMap.lastSuccessfulNode || this, { retryOffset: env.crittaMap.lastSuccessfulNode ? false : true})
            break
        }
    }

    //nodes give rewards based on generation
    //recursively called after each reward to reap all of them
    reapRewards(loser, i = 0) {
        let reward = this.rewards[i]
        if(!reward) throw 'somehow exceeded node reward length';

        if(loser.name == "ally") reward = CrittaReward.REWARDTYPES["sacrifice"]
        
        let id = `reward${env.crittaCount++}`
        content.insertAdjacentHTML(`beforeend`, `<critta-reward id="${id}" class="pre-show" type="${reward.slug}" difficulty="${this.difficulty}" component="${this.component.slug}"></critta-reward>`)

        let rewardEl = content.querySelector(`critta-reward#${id}`)
        setTimeout(() => rewardEl.activate(), 100);
        
        if((i < this.rewards.length - 1) && (loser.name != "ally")) {
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
        if(this.bonusModifiers.length) modifiers = modifiers.concat(this.bonusModifiers)
        modifiers = modifiers.concat(env.crittaMap.getModArray())

        return modifiers
    }

    // mainly just for the shellmode thing but this could have other uses
    addStatusModifier(status) {
        if(!this.bonusModifiers) this.bonusModifiers = []
        this.bonusModifiers.push({
            name: status.name,
            getHelp: ()=> status.help,
            getStatus: ()=> status,
            alterations: {
                all: [ ["STATUS", status.slug] ]
            }
        })
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
                densityDefinition= "'scarce resources';'expect low difficulty'"
                difficultyClass = "low"
            break

            case "1":
                nodeDensity = "normal"
                densityDefinition= "'difficulty in line with or lesser than standard scenarios'"
                difficultyClass = "mid"
            break

            case "2":
                nodeDensity = "high"
                densityDefinition= "'plentiful resources';'expect great resistance'"
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
                densityDefinition= "'intersection of enormous thoughtform';'extreme HP pool persists between iterations'"
                difficultyClass = "boss"
            break
        }

        // display modifiers
        let mainModString = false
        if(this.component && this.modifier) {
            let def = `EFFECT::${this.modifier.getHelp().toUpperCase()}`
            mainModString = `<div component="${this.component.slug}" definition="${def}" class="modifier">${this.modifier.name}</div>`

            if(this.modifierStatus) {
                def = definitionRender({getAttribute: () => `STATUS++${this.modifierStatus.slug}`}, {returnHTML: true})
                mainModString = `
                    <div class="modifierinfo" component="${this.component.slug}" style="--icon: url(${this.modifierStatus.icon})">
                        <div class="modifier" definition="STATUS++${this.modifierStatus.slug}">${this.modifier.name}</div>
                        <div class="modifierstatus">${def.replace(` impulse">`, `">`)}</div>
                    </div>
                `
            }

            if(this.bonusModifiers.length) {
                this.bonusModifiers.forEach(modifier => {
                    def = definitionRender({getAttribute: () => `STATUS++${modifier.getStatus().slug}`}, {returnHTML: true})
                    mainModString += `
                        <div class="modifierinfo submod ${this.bonusModifiers.length > 1 ? 'multiplemod' : ''}" component="rot" style="--icon: url(${modifier.getStatus().icon})">
                            <div class="modifier" definition="STATUS++${modifier.getStatus().slug}">${modifier.name}</div>
                            <div class="modifierstatus">${def.replace(` impulse">`, `">`)}</div>
                        </div>
                    `
                })
            }
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
                    case "movefoe_frame":
                        actor.name = "Wavefoe"
                    break;

                    case "kivii":
                        actor.name = "Greater Husk"
                    break;

                    case "husk_observer":
                    case "lesserhusk_observer":
                        actor.name = "Vigilant Husk"
                    break;

                    case "husk_striker":
                        actor.name = "Relentless Husk"
                    break;

                    case "husk_support":
                        actor.name = "Vital Husk"
                    break;

                    case "husk_guard_frame":
                        actor.name = "Guardian Husk"
                    break;

                    case "bstrdboss_lowintensity":
                        actor.name = "Gun Golem"
                    break;

                    case "bstrdshelf":
                        actor.statusImmunities = ["stun"]
                    break
                }
            break

            case "sprite": //ing todo - temporarily disabled husk mimic
                if(!actor.sprite || actor.originalSlug == "husk" || actor.originalSlug == "hallucination") {
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

                    case "lesserhusk":
                        setTimeout(()=>{
                            actor.sprite.setAttribute("dtype", "lh")
                            actor.sprite.setAttribute("type", "1")
                            actor.sprite.setAttribute("b", "2")
                            actor.sprite.setAttribute("t", "3")
                            actor.sprite.querySelector("img.basis").src = `/img/sprites/combat/foes/husks/type1_bottom2_mimic.gif`
                        }, 100)
                    break;

                    case "lesserhusk_stabber":
                        setTimeout(()=>{
                            actor.sprite.setAttribute("dtype", "ls")
                            actor.sprite.setAttribute("type", "4")
                            actor.sprite.setAttribute("b", "1")
                            actor.sprite.setAttribute("t", "3")
                            actor.sprite.querySelector("img.basis").src = `/img/sprites/combat/foes/husks/type4_bottom1_mimic.gif`
                        }, 100)
                    break;

                    case "lesserhusk_observer":
                        setTimeout(()=>{
                            actor.sprite.setAttribute("dtype", "lo")
                            actor.sprite.setAttribute("type", "2")
                            actor.sprite.setAttribute("b", "1")
                            actor.sprite.setAttribute("t", "1")
                            actor.sprite.querySelector("img.basis").src = `/img/sprites/combat/foes/husks/type2_bottom1_mimic.gif`
                        }, 100)
                    break;

                    case "husk_guard_frame":
                        setTimeout(()=>{
                            actor.sprite.setAttribute("dtype", "hg")
                            actor.sprite.setAttribute("type", "3")
                            actor.sprite.setAttribute("b", "2")
                            actor.sprite.setAttribute("t", "2")
                            actor.sprite.querySelector("img.basis").src = `/img/sprites/combat/foes/husks/type3_bottom2_mimic.gif`
                        }, 100)
                    break;

                    case "husk_support":
                        setTimeout(()=>{
                            actor.sprite.setAttribute("dtype", "hs")
                            actor.sprite.setAttribute("type", "1")
                            actor.sprite.setAttribute("b", "2")
                            actor.sprite.setAttribute("t", "2")
                            actor.sprite.querySelector("img.basis").src = `/img/sprites/combat/foes/husks/type1_bottom2_mimic.gif`
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
        this.style.setProperty("--y", `${vminY + (settings.retryOffset ? 10 : 0)}vmin`)

        this.canMove = false
        env.crittaMap.classList.add("shipmoving")
        env.crittaMap.shipmoving = true

        // this is removed on your first movement
        if(env.crittaMap.gamemodeSelect) env.crittaMap.gamemodeSelect.remove()

        setTimeout(()=>{
            if(settings.done) settings.done()
            this.canMove = true
            env.crittaMap.classList.remove("shipmoving")
            env.crittaMap.shipmoving = true
        }, 2000)
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
        this.usesSferBonus = this.hasAttribute("nosferbonus") ? false : (this.type.ignoresSferBonus ? false : true) // to specify via sale insertion
        this.fixedSferSalePrice = this.getAttribute("specialprice") ? Number(this.getAttribute("specialprice")) : false
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
                        <span class="info ${rewardObj.infoClass || ""}">
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

                case "actor":
                    labelContent = `
                        <span class="info">
                            ${generatePartySlide(rewardObj.actor, {noEquipment: true, detailedPassives: true})}
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
                const member = page.party[i]

                let specialAlterations = member.alterations ? [...new Set(member.alterations.map(impulse => impulse[3]).filter(type => type != "common"))] : false
                let hasSpecialImpulseFlags = ""
                if(specialAlterations?.length) {
                    specialAlterations.forEach(type => {
                        hasSpecialImpulseFlags += ` has-${type}-impulse`
                    })
                }

                actorSelection += `<div class="actor-option ${hasSpecialImpulseFlags}" style="--index: ${i}">
                    <input type="radio" name="${this.id}-actor" value="${member.slug}" id="${member.slug}-actor">
                    <label for="${member.slug}-actor">
                        ${generatePartySlide(member, {noEquipment: true})}
                    </label>
                </div>`
            }

            actorSelection = `<fieldset class="actor-choice" type="actor" help="select a shell" style="--total: ${page.party.length}">
                ${page.party.length > 4 ? `<div class="actor-overflow">` : ""}
                ${actorSelection}
                ${page.party.length > 4 ? `</div>` : ""}
            </fieldset>`
        }

        this.salePrice = this.fixedSferSalePrice || ((this.type.declineValue || env.crittaMap.baseSferDeclineValue || 2) + (this.usesSferBonus ? env.crittaMap.sferDeclineBonus : 0))
        this.innerHTML = `
            <div class="reward-wrapper">
                <h1 definition="NOTICE::${this.type.description}">${this.type.name}</h1>
                <fieldset type="main" help="${this.type.help}" style="--total: ${this.rewardSet.length}">${contents}</fieldset>
                ${this.type.actorSelection ? actorSelection : ""}
                <div class="buttons">
                    <button disabled class="button" intent="confirm">Confirm</button>
                    ${this.type.canDecline ? `<button class="button" definition="NOTE::'exchange for ${this.salePrice} sfer cubes'" intent="decline">Decline</button>` : ""}
                </div>
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
            fieldset.trigger = () => {
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

                    // also mark when it's a replacable impulse type, i.e. fated or action
                    if(selectedReward?.impulse?.impulse?.type && selectedReward?.impulse?.impulse?.type != "common") {
                        this.setAttribute("impulsereplace", `${selectedReward?.impulse?.impulse?.type}`)
                    } else this.removeAttribute("impulsereplace")
                }

                setTimeout(() => {
                    this.checkReadiness()                    
                }, 50)
            }

            fieldset.addEventListener('change', fieldset.trigger)
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
            chatter({actor: 'plainsys', text: `resource exchanged for ${this.salePrice} sfer cubes`, readout: true})
            addItem('sfer_cube', this.salePrice)
            this.closeout()
        }))

        this.setAttribute("generated", true)
        if(this.type.onGenerate) this.type.onGenerate(this)
    }

    // marks the confirm button as either disabled or not based on selections
    checkReadiness() {
        let canProceed = true
        for (const [selectionType, selectionValue] of Object.entries(this.selections)) {
            console.log('checking readiness on', selectionType, selectionValue)
            if(!selectionValue) canProceed = false
            console.log('canProceed is now', canProceed)
        }
        
        // if the selected reward doesn't need an actor, ignore that requirement
        if(!this.type.actorSelection) canProceed = true

        // if the reward type does have actor selection, but the selected reward doesn't need an actor, ignore that requirement
        console.log('checking actor selection bypass for', this.type.actorSelection, this.selections?.main?.value, this.rewardSet[this.selections?.main?.value])
        if(this.type.actorSelection && this.selections?.main?.value) 
            if(this.rewardSet[this.selections.main.value].picksActor === false) canProceed = true 
        console.log('final canProceed is', canProceed)

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
            description: "'behavioral organelle';'forms basis of shell';'grants unique actions'",
            help: "select humor\nequippable shell alteration",
            baseWeight: 1,
            canDecline: true,
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
                chatter({actor: 'sys', text: `NOTICE::'retrieved resource';'${rewardObj.quantity} ${rewardObj.component.name.toLowerCase()}'`, readout: true})
            }
        },

        // gives a selection of one impulse out of 3. one is guaranteed to be this component's type
        impulse: {
            slug: "impulse",
            name: "Impulse Cache",
            description: "'knowledge pattern organelle';'grants selection of permanent passive effect'",
            help: "select impulse\npermanent shell alterations",
            actorSelection: true,
            canDecline: true,
            baseWeight: 0.25,

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
                            if(env.crittaMap.tension < 2) continue;
                            possibleImpulses.push(impulse)
                        break
                    }
                }

                possibleImpulses = shuffle(possibleImpulses)

                let themedOnly = thisReward.getAttribute("componentexclusive")
                
                let rewardImpulses = []
                let themedReward

                //if it's themedOnly, all three are drawn here. otherwise, just one is
                if(thisReward.component) {
                    for(let i = 0; i < (themedOnly ? 3 : 1); i++) {
                        let componentIndex = possibleImpulses.findIndex(status => status[1].impulse.component == thisReward.component)
                        if(componentIndex != -1) {
                            themedReward = possibleImpulses.splice(componentIndex, 1)[0]
                            rewardImpulses.push(themedReward)
                        }
                    }
                } else themedOnly = false // just in case

                //then the randoms to fill the rest of the slots if not themedOnly
                if(!themedOnly) for (let i = 0; i < (themedReward ? 2 : 3); i++) rewardImpulses.push(possibleImpulses.shift());

                //construct rewardSet objects
                for (const [statusSlug, status] of rewardImpulses) {
                    let defRenderEl = document.createElement('div')
                    defRenderEl.innerHTML = definitionRender({getAttribute: () => `STATUS++${status.slug}`}, {returnHTML: true})
                    defRenderEl.querySelector('.actiondef-status-icon')?.remove()
                    defRenderEl.querySelector('h6')?.remove()
                    let prunedDef = defRenderEl.querySelector('.actiondef-status')?.innerHTML || ''

                    let description = prunedDef.trim()
                    let infoClass
                    switch(status.impulse.type) {
                        case "fated":
                            description += CrittaReward.STRINGS.fatedHelp
                            infoClass = "fated-impulse-title"
                        break

                        case "action":
                            description += CrittaReward.STRINGS.actionHelp
                            infoClass = "action-impulse-title"
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
                        infoClass,
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
                if(overwritten) chatter({actor: 'plainsys', text: `<p>${rewardObj.impulse.impulse.type} impulse <b-col definition="STATUS++${overwritten.slug}">${overwritten.name}</b-col> impulse overwritten with <b-col definition="STATUS++${rewardObj.impulse.slug}">${rewardObj.impulse.name}</b-col></p>`, readout: true})
            },
        },

        // gives a selection of one impulse out of 3. one is guaranteed to be this component's type
        // the element has to have an extra attribute for the specific impulse ID
        /* 
            <critta-reward id="${id}" class="pre-show" type="${reward.slug}" impulse="${impulse.slug}"></critta-reward>
        */
        specificImpulse: {
            slug: "specificImpulse",
            name: "Impulse Assignment",
            description: "'knowledge pattern organelle';'grants permanent passive'",
            help: "grant permanent alteration to shell",
            actorSelection: true,
            canDecline: true,
            ignoresSferBonus: true,
            baseWeight: 0, // does not spawn normally

            // generates selection from status effects
            getOptions: function (thisReward) {
                let impulseSlug = thisReward.getAttribute("impulse")
                let status = env.STATUS_EFFECTS[impulseSlug]

                let defRenderEl = document.createElement('div')
                defRenderEl.innerHTML = definitionRender({getAttribute: () => `STATUS++${status.slug}`}, {returnHTML: true})
                defRenderEl.querySelector('h6')?.remove()
                defRenderEl.querySelector('.actiondef-status-icon')?.remove()
                let prunedDef = defRenderEl.querySelector('.actiondef-status')?.innerHTML || ''
                let description = prunedDef.trim()
                
                let infoClass
                switch(status.impulse.type) {
                    case "fated":
                        description += CrittaReward.STRINGS.fatedHelp
                        infoClass = "fated-impulse-title"
                    break

                    case "action":
                        description += CrittaReward.STRINGS.actionHelp
                        infoClass = "action-impulse-title"
                    break
                }

                return [{
                    name: status.name,
                    description: description,
                    quantity: 1,
                    displayType: "image",
                    image: status.icon,
                    component: status.impulse.component ? status.impulse.component : false,
                    impulse: status,
                    imageClass: `passive-${status.slug}`,
                    infoClass,
                    eligibilityCheck: (member) => {
                        //check to make sure they don't already have it
                        return (
                            (member.alterations ? !member.alterations.some(alteration => alteration[1] == status.slug && alteration[2] == "IMPULSE") : true)
                            && //then check and see if the status itself has an eligibility check
                            (typeof status.impulse.eligibility == "function" ? status.impulse.eligibility(member) : true)
                        )
                    }
                }]
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
                if(overwritten) chatter({actor: 'plainsys', text: `<p>${rewardObj.impulse.impulse.type} impulse <b-col definition="STATUS++${overwritten.slug}">${overwritten.name}</b-col> impulse overwritten with <b-col definition="STATUS++${rewardObj.impulse.slug}">${rewardObj.impulse.name}</b-col></p>`, readout: true})
            },

            onGenerate: (element) => { // checks the impulse so you don't have to click it first. it's only the one
                element.querySelector('input').checked = true
                element.querySelector('fieldset').trigger()
            }
        },

        item: {
            slug: "item",
            name: "Equipment Cache",
            description: "'powerful equipment'",
            help: "select option\nor decline for 1 sfer",
            baseWeight: 0.75,
            canDecline: true,

            //item caches always offer one support item, one offense item, and then another selected from both (plus a chance for sfer)
            options: {
                support: [
                    ["eq_restorative", 1, "ichor"],
                    ["eq_satik", 1, "ichor"],
                    ["eq_shell", 1, "bone"],
                    ["eq_surge", 1, "claws"],
                    ["eq_siphon", 1, "ichor"],
                    ["eq_spikes", 1, "bone"],
                    ["eq_fusedlight", 1, "light"],
                ],

                offense: [
                    ["eq_kavruka", 1, "claws"],
                    ["eq_pariispike", 1, "claws"],
                    ["eq_disabler", 1, "bone"],
                    ["eq_aima_cyst", 1, "eyes"],
                    ["eq_antistatus", 1, "ichor"],
                    ["eq_wound", 1, "claws"],
                ]
            },

            // generates selection from sets of valid item rewards, held within here
            getOptions: function (thisReward) {
                let rewardSet = []

                if(!this.madeCombinedPool) {
                    this.options.combined = this.options.support.concat(this.options.offense)
                    this.options.combined.push(["sfer_cube", 5, "bone"])
                    this.madeCombinedPool = true
                }

                for (const [setName, itemSelections] of Object.entries(this.options)) {
                    //filter out items that are already being offered - mainly for combined pool
                    let validItems = itemSelections.filter(([itemSlug, amt]) => !rewardSet.some(rewardObj => rewardObj.itemSet[0] == itemSlug))
                    if(validItems.length == 0) {validItems.push(["sfer_cube", 5, "bone"])}
                    
                    let itemSet = validItems.sample()
                    let [itemSlug, itemQty] = itemSet
                    let itemRef = env.ITEM_LIST[itemSlug]
                    let currentQty = checkItem(itemSlug)
                    let itemAction = check("PAGE!!2dcombat") ? (itemRef.sceneAction || itemRef.combatAction) : itemRef.combatAction
                    let status = false
                    if(itemRef.type == "equipment") status = env.STATUS_EFFECTS[itemRef.alterations.find(a=>a[0] == "STATUS")[1]]

                    rewardSet.push({
                        name: `${itemRef.name}${itemQty > 1 ? ` <span class="qty">(${itemQty})</span>` : ''}`,
                        description: `
                        <div class="item-details">
                            <div class="item-usage">
                                ${itemRef.exec ? `<span class="item-ooc">${processHelp(itemRef, {specialObj: itemRef.oocnote})}</span>` : ``}
                                ${itemRef.combatAction ? `<span class="item-ic"><span definition="ACTION++${itemAction.slug}">${itemAction.name.toUpperCase()}</span></span>` : ``}
                                ${status ? `<span class="item-eq">${definitionRender({getAttribute: () => `STATUS++${status.slug}`}, {returnHTML: true})}</span>` : ``}
                                ${status?.grantsActions ? 
                                    status.grantsActions.map(grantActionSlug => {
                                        let grantAction = env.ACTIONS[grantActionSlug]
                                        return `<span class="item-eq-action"><span definition="ACTION++${grantAction.slug}">${grantAction.name.toUpperCase()}</span></span>`
                                    }).join("\n")
                                : ``}
                            </div>
                            ${currentQty ? `<div class="currently-held">CURRENT_INVENTORY::'${checkItem(itemSlug)}${itemRef.max ? ` / ${itemRef.max}` : ''}'</div>` : ''}
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
                    chatter({actor: 'sys', text: `NOTICE::'retrieved resource';'${qty}';'${itemObj.name.toLowerCase()}'`, readout: true})
                }
            }
        },

        fish: {
            slug: "fish",
            name: "Fishy",
            description: "'special single-use actions or materials'",
            help: "claim catch or feed to terminal",
            baseWeight: 0,
            canDecline: true,

            getOptions: function (thisReward) {
                let rewardSet = []

                let fishRewards = [
                    [page.lastCaughtFish.item, 1, page.lastCaughtFish.component]
                ]

                for (const itemSet of fishRewards) {
                    let [itemSlug, itemQty] = itemSet
                    console.log(itemSet, fishRewards, itemSlug, itemQty)
                    let itemRef = env.ITEM_LIST[itemSlug]
                    let currentQty = checkItem(itemSlug)

                    rewardSet.push({
                        name: `${itemRef.name}${itemQty > 1 ? ` <span class="qty">(${itemQty})</span>` : ''}`,
                        description: `
                        <div class="item-details">
                            <div class="item-description">::FUNCTION::${itemRef.description}</div>
                            ${(itemRef.exec || itemRef.combatAction) ? `<div class="item-usage">
                                ${itemRef.exec ? `<span class="item-ooc">${itemRef.oocnote}</span>` : ``}
                                ${itemRef.combatAction ? `<span class="item-ic">${itemRef.combatAction.desc}</span>` : ``}
                            </div>`
                            : ``
                            }
                            ${currentQty ? `<div class="currently-held">CURRENT_INVENTORY::'${checkItem(itemSlug)}${itemRef.max ? ` / ${itemRef.max}` : ''}'</div>` : ''}
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
                    chatter({actor: 'sys', text: `NOTICE::'retrieved resource';'${qty}';'${itemObj.name.toLowerCase()}'`, readout: true})
                }

                if(check("STAGE!!freedomtoggled")) {
                    change("STAGE!!freedomtoggled", "DELETE")
                    mask({name: "freedom", toggle: true, playSound: false})
                }
            },

            onGenerate: (element) => { // checks the fish so you don't have to click it first. it's only the one
                element.querySelector('input').checked = true
                element.querySelector('fieldset').trigger()
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
                    if(mod.tension) description += `\n\n<span class="${mod.tension > 1 ? "bastard" : "neutral"}-color" definition="NOTICE::'will raise difficulty of opponents'">${mod.tension > 0 ? `+${mod.tension}` : mod.tension } TENSION</span>`
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

        // when you lose, you get a choice of what to sacrifice to keep going
        sacrifice: {
            slug: "sacrifice",
            name: "Continuation Ritual",
            description: "'sacrifice to continue iteration'",
            help: "pay to proceed",
            baseWeight: 0, // does not spawn normally
            actorSelection: true,
            
            getOptions: function (thisReward) {
                let rewardSet = []

                let possibleSacrifices = shuffle(Object.entries(env.MODIFIERS).filter(entry => {
                    return (
                        entry[1].sacrifice &&
                        shouldItShow(entry[1]) &&
                        !entry[1].giveUp
                
                    )
                }))

                let sacrificeOptions = []

                //sacrifices are always 2 actual options, and 1 true give up option
                if(possibleSacrifices.length < 2) sacrificeOptions = possibleSacrifices;
                else for (let i = 0; i < 2; i++) sacrificeOptions.push(possibleSacrifices.shift())
                sacrificeOptions.push(["sacrifice_giveup", env.MODIFIERS["sacrifice_giveup"]])

                if(page.party.length == 0) sacrificeOptions = [["sacrifice_giveup", env.MODIFIERS["sacrifice_giveup"]]] // force giveup if you lose all your shells somehow
                
                for (const [sacSlug, sacrifice] of sacrificeOptions) {
                    let description = sacrifice.getHelp()
                    let name = sacrifice.name

                    rewardSet.push({
                        name,
                        description,
                        quantity: 1,
                        displayType: "image",
                        image: sacrifice.icon,
                        component: sacrifice.component ? sacrifice.component : false,
                        class: sacSlug,
                        picksActor: sacrifice.picksActor,
                        sacrifice,
                        eligibilityCheck: (member) => {
                            if(typeof sacrifice.picksActor == "function") return sacrifice.picksActor(member);
                            else if(typeof sacrifice.picksActor == "boolean") return sacrifice.picksActor;
                            else return false;
                        }
                    })
                }

                return rewardSet
            },
            
            reapOption: function (thisReward, rewardObj, selectedActor) {
                if(rewardObj.sacrifice.onChosen) rewardObj.sacrifice.onChosen(selectedActor)
            }
        },

        // special gamemode cache: shell
        // lets you select one of three randomly generated shells with their own impulses and humors
        // amount they have of each is partially decided by difficulty and tension
        shell: {
            slug: "shell",
            name: "Shell Cache",
            description: "'bundled organelle';'grants selection of new fighter'",
            help: "select shell",
            canDecline: true,
            baseWeight: 0, // does not spawn normally

            getOptions: function (thisReward) {
                let rewardSet = []
                let shells = [CrittaMenu.generateNewShell(), CrittaMenu.generateNewShell(), CrittaMenu.generateNewShell()]
                let thisComponent = thisReward.component
                if(thisComponent == "intrusive") thisComponent = "light"

                /* 
                    shell rating is like so:
                        - basicToGive / augmentsToGive
                            - minimum 1
                            - Difficulty added
                            - Tension added

                            - if under 3, randomly fill two slots
                            - if 3, coinflip on whether to fully augment one slot, or split across all 3 slots
                            - 4 to 5, get one augment then fill slots with basic until full
                            - 6, get one augment then flip on whether to augment again, or fill rest with basic slots
                            - 7 and 8, get two augments and fill slots
                            - 9 and over, fully augged

                            - any spillover is given to impulsesToGive cause we like fun

                        - impulsesToGive will be based on difficulty and tension
                            - minimum 0
                            - difficulty added
                            - tension added
                            - if it's over 9, then a fated or action impulse of thisReward.component is guaranteed

                        - thisReward.component will decide what the majority of impulses and humors will be
                */

                let rating = 1 + Number(thisReward.difficulty) + env.crittaMap.tension + (env.crittaMap?.shellRatingBonus || 0)
                console.log("rating for shell rewards is", rating, "with difficulty", thisReward.difficulty, "and tension", env.crittaMap.tension)

                // there's a lot of impulses so we're gathering this before the shell loop
                let impulses = []

                for (const impulse of Object.entries(env.STATUS_EFFECTS).filter(entry => entry[1].impulse)) {
                    switch(impulse[1].impulse.type) {
                        case "common":
                            impulses.push(impulse)
                        break

                        case "action":
                            if(env.crittaMap.tension < 1) continue;
                            impulses.push(impulse)
                        break

                        case "fated":
                            if(env.crittaMap.tension < 2) continue;
                            impulses.push(impulse)
                        break
                    }
                }

                shells.forEach(shell => {
                    shell.components = {}
                    shell.augments = []
                    shell.alterations = []
                    shell.rating = rating

                    // determine humors and augments first
                    let basicsToGive = 1 + rating
                    let augmentsToGive = 0

                    // nothing, we're filling slots
                    if (basicsToGive < 3) { 

                    // coinflip on whether to fully augment one slot, or split across all 3 slots
                    } else if (basicsToGive === 3) { 
                        if(Math.random() < 0.5) {
                            augmentsToGive = 1
                            basicsToGive = 0
                        }

                    // get one augment then fill slots with basic until full
                    } else if (basicsToGive >= 4 && basicsToGive <= 5) { 
                        augmentsToGive = 1
                        basicsToGive -= 3

                    // get one augment then flip on whether to augment again, or fill rest with basic slots
                    } else if (basicsToGive === 6) { 
                        if(Math.random() < 0.5) {
                            augmentsToGive = 2
                            basicsToGive = 0
                        } else {
                            augmentsToGive = 1
                            basicsToGive -= 3
                        }

                    // get two augments and fill slots
                    } else if (basicsToGive === 7 || basicsToGive === 8) {
                        augmentsToGive = 2
                        basicsToGive -= 6

                    // full augments babey
                    } else if (basicsToGive >= 9) { 
                        augmentsToGive = 3
                        basicsToGive -= 9 // still want to track this in case we can spend them on bonus impulses
                    }

                    let remainingSlots = ["primary", "secondary", "utility"]

                    console.log("shell", shell.name, "has", augmentsToGive, "augments and", basicsToGive, "basics to give with rating", rating)
                    // give augments first
                    if(augmentsToGive) {
                        let possibleAugments = Object.entries(env.ACTOR_AUGMENTS.generic).filter(([slug, augment]) => remainingSlots.includes(augment.component[0]))
                        let relevantAugments = possibleAugments.filter(([slug, augment]) => augment.component[1] == thisComponent)
                        
                        // first one will always be of the relevant component
                        for (let i = 0; i < augmentsToGive; i++) {
                            let augmentToGive
                            
                            if(i == 0 && relevantAugments.length) {
                                augmentToGive = relevantAugments.sample({remove: true})
                                possibleAugments = possibleAugments.filter(aug => aug !== augmentToGive)
                            } else {
                                augmentToGive = possibleAugments.sample({remove: true})
                            }

                            remainingSlots = remainingSlots.filter(slot => slot != augmentToGive[1].component[0])
                            shell.components[augmentToGive[1].component[0]] = augmentToGive[1].component[1]
                            shell.augments.push(augmentToGive[0])
                            console.log("gave shell", shell.name, "augment", augmentToGive[0], "in slot", augmentToGive[1].component[0], "with component", augmentToGive[1].component[1],"remaining slots", remainingSlots)
                        }
                    }

                    // then basics
                    let basicsSpent = 0
                    if(basicsToGive) {
                        // anything that can spawn normally, so modded stuff is included
                        let possibleComponents = Object.entries(env.COMBAT_COMPONENTS).filter(c=>!c[1].dontSpawnNormally).map(c=>c[0])
                        let relevantComponent = possibleComponents.find(c=>c == thisComponent)

                        for(let i = 0; i < basicsToGive; i++) {
                            if(!remainingSlots.length) break
                            basicsSpent++
                            
                            let slot = remainingSlots.sample({remove: true})
                            let componentToGive = i == 0 ? relevantComponent : possibleComponents.sample()
                            shell.components[slot] = componentToGive
                            console.log("gave shell", shell.name, "basic component", componentToGive, "in slot", slot, "remaining slots", remainingSlots)
                        }
                    }

                    // now impulses, with a bonus given based on basics leftover
                    let impulsesToGive = rating + basicsToGive - basicsSpent
                    console.log("impulsesToGive is", impulsesToGive, "with rating", rating, "and basicsToGive", basicsToGive, "and basicsSpent", basicsSpent)
                    if(impulsesToGive > 0) {
                        let possibleImpulses = [... impulses]

                        // first half of impulses given will always be of this component type, if possible
                        // also, if we're over 9 impulsesToGive, always give either a fated or action impulse of thisReward.component
                        for(let i = 0; i < impulsesToGive; i++) {
                            if(!possibleImpulses.length) break
                            let impulse
                            
                            // first half or if over 9, prioritize relevant component
                            let givenSpecial
                            if(i < impulsesToGive / 2 || (impulsesToGive > 9 && !givenSpecial)) {
                                let relevantImpulses = possibleImpulses.filter(([slug, status]) => status.impulse.component == thisComponent)
                                if(relevantImpulses.length) {
                                    impulse = relevantImpulses.sample({remove: true})
                                    possibleImpulses = possibleImpulses.filter(imp => imp !== impulse)
                                    givenSpecial = true
                                } else {
                                    impulse = possibleImpulses.sample({remove: true})
                                }
                            } else {
                                impulse = possibleImpulses.sample({remove: true})
                            }
                            
                            shell.alterations.push([
                                "STATUS",
                                impulse[0],
                                "IMPULSE",
                                impulse[1].impulse.type
                            ])
                        }
                    }

                    //bonus for intrusive shells
                    if(thisReward.component == "intrusive") {
                        shell.alterations.push([
                            "STATUS",
                            ["destabilized_p_obliteration", "destabilized_p_statuses", "destabilized_p_support", "destabilized_p_surge", "light_extreme"].sample(),
                            "IMPULSE",
                            "common"
                        ])
                    } 
                })
                
                shells.forEach(shell => {
                    console.log("generated shell offer", shell)
                    rewardSet.push({
                        name: shell.name,
                        quantity: 1,
                        displayType: "actor",
                        imageClass: "actor",
                        image: shell.portraitUrl,
                        actor: shell,
                    })
                })

                return rewardSet
            },

            reapOption: function (thisReward, rewardObj) {
                page.party.push(rewardObj.actor)
            },
        },

        // the first phase of using the shell grinder - gives you a choice of shell to destroy, OR the choice to back off
        // easier than a new thing, more soulful than a dialogue choice
        shellGrinderApproach: {
            slug: "shellGrinderApproach",
            name: "OMINOUS MACHINE",
            description: "'cast a shell to be sacrificed';'receive powerful rewards'",
            help: "you need this interloper",
            actorSelection: true,
            baseWeight: 0, 

            // there's always just these two
            getOptions: function (thisReward) {
                let rewardSet = []
                
                rewardSet.push({
                    name: "SACRIFICE SHELL",
                    description: "choose a shell to sacrifice",
                    quantity: 1,
                    displayType: "image",
                    image: "/img/sprites/combat/modifiers/sacrifice_shell.gif",
                    component: "intrusive",
                    picksActor: true,
                    eligibilityCheck: (member) => true
                })
                
                rewardSet.push({
                    name: "BACK AWAY",
                    description: "be a coward",
                    quantity: 1,
                    displayType: "image",
                    image: "/img/sprites/combat/modifiers/back_away.gif",
                    component: "light",
                    picksActor: false,
                    eligibilityCheck: (member) => false
                })

                return rewardSet
            },
            
            reapOption: function (thisReward, rewardObj, selectedActor) {
                if(selectedActor) {
                    env.MODIFIERS.sacrifice_shell.onChosen(selectedActor)
                    selectedActor.lossReason = "grinder"
                    cutscene(true)
                    ratween(env.bgm, 0.25)
                    vfx({type: "darkflash", state: true})
                    play("talkfairy", 0.25)
                    setTimeout(()=>play("stab"), 250)
                    setTimeout(()=>play("stab", 0.5), 750)
                    setTimeout(()=>{play("stab", 0.25);forcePlay("talkfairy", 0.25)}, 1500)
                    setTimeout(()=>{
                        ratween(env.bgm, 1)
                        let id = `reward${env.crittaCount++}`
                        content.insertAdjacentHTML(`beforeend`, `<critta-reward id="${id}" type="shellGrinderReward" component="light"></critta-reward>`)
                    }, 2000)
                    setTimeout(()=>{
                        cutscene(false);
                        vfx({type: "darkflash", state: false})
                    }, 3000)
                } else {
                    MUI("deprohibit")
                    chatter({ actor: "fairy", text: [
                        "think about it interloper...",
                        "you WILL need this!",
                        "so you choose failure!! ahahaaha!!!!"
                    ].sample(), readout: true, delay: 800})
                    return // nothing
                }
            }
        },

        // metarewards for choosing to kill a shell
        // we also store the shell you discarded, for... reasons...
        shellGrinderReward: {
            slug: "shellGrinderReward",
            name: "THE SKY COILS WITH JOY",
            description: "'select a blessing'",
            help: "shell rating improves all future shells found\nthe rest is up to chance! hehehee!!!",
            actorSelection: true,
            baseWeight: 0, 

            possibleModifierStatuses: ["light_extreme", "light_laughterhouse", "eyes_hypercritical", "claws_rabid", "bone_spikes", "bone_ablative", "aug_eyes_direction", "aug_eyes_advantage", "destabilized_n_unsteady", "destabilized_n_flow", "destabilized_n_squishy", "destabilized_p_obliteration", "destabilized_p_surge"],

            // for now these are hardcoded
            getOptions: function (thisReward) {
                let rewardSet = []
                
                rewardSet.push({
                    name: "FINER CROP",
                    description: "<f-col>+1 to future shell rating</f-col><br>rating determines number of humors, augments, and impulses",
                    quantity: 1,
                    displayType: "image",
                    image: "/img/sprites/combat/modifiers/finer_crop.gif",
                    component: "rot",
                    picksActor: false,
                    eligibilityCheck: (member) => false,
                    onPick: () => {
                        if(!env.crittaMap.shellRatingBonus) env.crittaMap.shellRatingBonus = 0  
                        env.crittaMap.shellRatingBonus += 1
                        play("obeskToggle", 0.5)
                    }
                })

                let status = env.MODIFIERS.global_megaglee.makeNewStatus({power: 2, oneOff: true, forceBeneficial: true, retain: true})
                rewardSet.push({
                    name: `BLESSING::${status.name}`,
                    description: `grants a <n-col>randomly formed passive</n-col> to selected shell<br>${definitionRender({getAttribute: () => `STATUS++${status.slug}`}, {returnHTML: true})}`,
                    quantity: 1,
                    displayType: "image",
                    image: "/img/sprites/combat/modifiers/shell_blessing.gif",
                    component: "eyes",
                    impulse: status,
                    imageClass: `passive-${status.slug}`,
                    infoClass: `info-${status.slug}`,
                    picksActor: true,
                    eligibilityCheck: (member) => true,
                    onPick: (member) => {
                        member.alterations = member.alterations || []
                        member.alterations.push(["STATUS", status.slug, "IMPULSE", "BLESSING"])
                        play("obeskToggle", 0.5)
                    }
                })
                
                
                let modifierStatus = env.STATUS_EFFECTS[this.possibleModifierStatuses.sample()]
                rewardSet.push({
                    name: `PACT::${modifierStatus.name}`,
                    description: `<n-col>all nodes</n-col> in this iteration <n-col>gain modifier</n-col><br>${definitionRender({getAttribute: () => `STATUS++${modifierStatus.slug}`}, {returnHTML: true})}`,
                    quantity: 1,
                    displayType: "image",
                    image: modifierStatus.icon,
                    component: "light",
                    picksActor: false,
                    eligibilityCheck: (member) => false,
                    onPick: () => {
                        env.crittaMap.querySelectorAll("critta-node").forEach(node=>node.addStatusModifier(modifierStatus))
                        play("obeskToggle", 0.5)
                    }
                })

                return rewardSet
            },
            
            reapOption: function (thisReward, rewardObj, selectedActor) {
                MUI("deprohibit")
                rewardObj.onPick(selectedActor)
            }
        },

        // yet another meta reward type
        // this is just for gamemode selection
        gamemode: {
            slug: "gamemode",
            name: "FRAME SHIFT",
            description: "'select a gamemode'",
            help: "'alters the rules of the dream'",
            baseWeight: 0, 

            getOptions: function (thisReward) {
                let rewardSet = []
                
                let gamemodes = Object.entries(CrittaMap.GAMEMODES)
                gamemodes.forEach(([modeSlug, mode])=>{
                    if(shouldItShow(mode)) rewardSet.push({
                        name: mode.name,
                        description: mode.help,
                        quantity: 1,
                        displayType: "image",
                        image: mode.image || "/img/sprites/combat/passives/hunger.gif",
                        component: mode.component || "intrusive",
                        mode
                    })
                })

                return rewardSet
            },
            
            reapOption: function (thisReward, rewardObj, selectedActor) {
                if(rewardObj.mode.slug == "base") return; // this is mostly the decline option

                rewardObj.mode.setExec()
                play("elevator", 0.75)
                env.crittaMap.gamemodeSelect.remove()
            }
        },
    }

    //initializer and adder for some rewards
    static safeAdd(pool, name, value) { 
        if(pool[name]) pool[name] += value; else pool[name] = value 
        if(CrittaFlashSale.flashSaleScreens) CrittaFlashSale.refreshAll()
    }

    static STRINGS = {
        fatedHelp: `\n\n<bst-col>shells can only have one fated impulse</bst-col>`,
        actionHelp: `\n\n<bst-col>shells can only have one action impulse</bst-col>`,
    }
}
customElements.define('critta-reward', CrittaReward)


// ing update - new 'ON DA MENU' trade system in favor of the overly involved dialogue or some full-fledged shop system
class CrittaFlashSale extends HTMLElement {
    //we out here abusing semantic tags
    static TEMPLATE = () => `
        <header>
            <h1 definition="ANALYSIS::'new offer after every node';'u may lock it if u want ,'^)'">DA MENU</h1>
        </header>

        <section class="flashsale-offering">
            <button class="flashsale-reroll" intent="reroll"><span class="flashsale-reroll-title">REROLL<br>SFER::2</span></button>
            <section class="flashsale-banner">
                <figure>
                    <img class="flashsale-image" src="/img/konstrukttiny.gif"></img>
                </figure>            
                <h3><bst-col>${check("PAGE!!dream") ? "GELI DELI" : "BSTRD BARGAIN"}</bst-col></h3>
            </section>
            <figcaption>
                <article><p class="bastard-font bastard-color" style="font-size: 2em;">NEW OFFER EACH FIGHT >%^)</p></article>
                <aside></aside>
            </figcaption>
        </section>

        <main>
            <button definition="ANALYSIS::'pay specified number of humor'" class="flashsale-button flashsale-basebutton" disabled intent="humor" amt="0" component="">humor</button>
            <button definition="ANALYSIS::'toggle lock';'prevents reroll of offering after fights'" class="flashsale-button flashsale-lock" disabled intent="lock" amt="0" component="">lock</button>
            <button definition="ANALYSIS::'pay specified number of sfer'" class="flashsale-button flashsale-basebutton" disabled intent="sfer" amt="0">sfer</button>
        </main>
    `

    constructor() {
        super()
        // no need for GX fix because all screens have shared global state
        
        this.addEventListener("click", this.clickEvent.bind(this))
        //todo: event listener for corruChanged to see if you have enough components/items
        this.innerHTML = CrittaFlashSale.TEMPLATE()
        this.figureEl = this.querySelector('section figure')
        this.imageEl = this.figureEl.querySelector('img')
        this.titleEl = this.querySelector('section h3')
        this.captionContainerEl = this.querySelector('section figcaption')
        this.descriptionEl = this.captionContainerEl.querySelector('article')
        this.truncatedDescriptionEl = this.captionContainerEl.querySelector('aside')
        this.buttonHumor = this.querySelector('button[intent="humor"]')
        this.buttonLock = this.querySelector('button[intent="lock"]')
        this.buttonSfer = this.querySelector('button[intent="sfer"]')
        this.buttonReroll = this.querySelector('button[intent="reroll"]')
        CrittaFlashSale.locked = CrittaFlashSale.locked || false

        if(!CrittaFlashSale.flashSaleScreens) CrittaFlashSale.flashSaleScreens = []
        CrittaFlashSale.flashSaleScreens.push(this)
        //we reroll only via node success, you don't start with anything on this screen except the base template
        this.refresh()

        if(!CrittaFlashSale.tracking) { // could unhook this but navigation from this page deletes everything so w/e
            document.addEventListener('corru_changed', CrittaFlashSale.changeTracker)
        }
    }

    clickEvent(event) {
        //detects if you're clicking a button with intent="humor", intent="lock", or intent="sfer"
        let el = event.target
        if(!el.hasAttribute('intent') || el.disabled) return;

        let intent = el.getAttribute('intent')
        if(!intent) return;

        switch(intent) {
            case "humor":
                play('muiClick')
                CrittaFlashSale.buy('humor')
            break
            
            case "lock":
                play('muiClick')
                CrittaFlashSale.toggleLock()
            break
            
            case "sfer":
                play('muiClick')
                CrittaFlashSale.buy('sfer')
            break
            
            case "reroll":
                play("muiToggle", 2)
                CrittaFlashSale.buy('reroll', this.buttonReroll)
            break
        }
    }

    //refreshes interface according to current offering. also used to see if you can afford whatever's up after changes
    refresh() {
        if(!CrittaFlashSale.offering) return;

        //info updates
        let offering = CrittaFlashSale.offering
        let component = offering.component ? offering.component : ""
        this.setAttribute("component", component)
        this.imageEl.src = offering.img
        this.imageEl.setAttribute("type", offering.type)

        this.titleEl.innerText = offering.specialTitle || offering.infoObject.name
        this.titleEl.setAttribute("type", offering.type)

        let description // prefers to pick and display these in order: status definition, or .help, or .description
        if(offering.specialDescription) {
            description = `<center>${offering.specialDescription}</center>`
            this.truncatedDescriptionEl.innerHTML = ``
            this.captionContainerEl.classList.remove("has-status")
        } else if(offering.status) {
            description = definitionRender({getAttribute: () => `STATUS++${offering.status.slug}`}, {returnHTML: true})
            this.truncatedDescriptionEl.innerHTML = `<span class="neutral-color" definition="STATUS++${offering.status.slug}">EFFECT::<span class="bright-color" style="pointer-events: none;">${offering.status.name}</span></span>`
            this.captionContainerEl.classList.add("has-status")
        } else if(offering.infoObject) {
            description = typeof offering.infoObject.help == "function" ? offering.infoObject.help() : offering.infoObject.help
            description = description || offering.infoObject.description // some items without statuses will have this

            description = `<p>${description}</p>`
            this.truncatedDescriptionEl.innerHTML = ``
            this.captionContainerEl.classList.remove("has-status")
        }
        this.descriptionEl.innerHTML = description

        //cost button updates
        let humorTotals = CrittaMenu.getTotals()
        this.buttonHumor.setAttribute("amt", offering.humorCost)
        this.buttonHumor.innerText = `${offering.humorType}::${offering.humorCost}`
        this.buttonHumor.disabled = (humorTotals[offering.humorType].available) < offering.humorCost
        this.buttonHumor.setAttribute("component", offering.humorType || "")
        if(this.buttonHumor.disabled) {
            this.buttonHumor.classList.add("flashsale-unaffordable")
            this.buttonHumor.classList.remove("flashsale-affordable")
        } else {
            this.buttonHumor.classList.remove("flashsale-unaffordable")
            this.buttonHumor.classList.add("flashsale-affordable")
        }

        this.buttonLock.innerText = CrittaFlashSale.locked ? "UNLOCK" : "LOCK"
        this.buttonLock.classList.toggle("locked", CrittaFlashSale.locked)
        this.buttonLock.disabled = false // you can always toggle lock but it starts disabled

        this.buttonSfer.setAttribute("amt", offering.sferCost)
        this.buttonSfer.innerText = `sfer::${offering.sferCost}`
        this.buttonSfer.disabled = (checkItem("sfer_cube") < offering.sferCost)
        if(this.buttonSfer.disabled) {
            this.buttonSfer.classList.add("flashsale-unaffordable")
            this.buttonSfer.classList.remove("flashsale-affordable")
        } else {
            this.buttonSfer.classList.remove("flashsale-unaffordable")
            this.buttonSfer.classList.add("flashsale-affordable")
        }

        this.buttonReroll.disabled = CrittaFlashSale.locked || (checkItem("sfer_cube") < 2)
        if(this.buttonReroll.disabled) {
            this.buttonReroll.classList.remove("flashsale-affordable")
        } else {
            this.buttonReroll.classList.add("flashsale-affordable")
        }
    }

    static changeTracker(ev) {
        if(ev.detail.key.includes('ITEM!!')) CrittaFlashSale.refreshAll()
    }

    static refreshAll() {
        if(!CrittaFlashSale.flashSaleScreens) return;
        for(const screen of CrittaFlashSale.flashSaleScreens) screen.refresh()
    }

    //selects something new from possible options
    //offerings are stored on a global level so we can have multiple synchronized flashsale screens
    static reroll(force) {
        if(CrittaFlashSale.locked && !force) return;

        //maybe todo - can use type to add special weight conditions with revisions or something
        CrittaFlashSale.possibleOfferings = Object.entries(CrittaFlashSale.OFFERINGS).map(([type, data]) => [data, (typeof data.baseWeight == "undefined" ? 0 : data.baseWeight)])

        //filter based on minimum tension
        CrittaFlashSale.possibleOfferings = CrittaFlashSale.possibleOfferings.filter(([data]) => {
            if(typeof data.minimumTension == "number") return env.crittaMap.tension >= data.minimumTension;
            return true;
        })
        
        if(CrittaFlashSale.offeringGroup) CrittaFlashSale.possibleOfferings = CrittaFlashSale.possibleOfferings.filter(([data]) => data !== CrittaFlashSale.offeringGroup)
        CrittaFlashSale.offeringGroup = weightRand(CrittaFlashSale.possibleOfferings)
        CrittaFlashSale.offering = CrittaFlashSale.offeringGroup.getOffering()

        CrittaFlashSale.toggleLock(false) //simultaneously unlocks after buying and refreshes all
    }

    //prevents rerolling except by force
    static toggleLock(state) {
        CrittaFlashSale.locked = typeof state == "boolean" ? state : !CrittaFlashSale.locked
        CrittaFlashSale.refreshAll()
    }

    //this is only ever called if you can already afford stuff, so we don't need to do checks
    static buy(method, element) {
        switch(method) {
            case "humor":
                CrittaReward.safeAdd(page.flags.components, CrittaFlashSale.offering.humorType, -CrittaFlashSale.offering.humorCost)    
            break

            case "sfer":
                removeItem("sfer_cube", CrittaFlashSale.offering.sferCost)
            break

            case "reroll":
                removeItem("sfer_cube", 2)
                play('muiClick')
                element.classList.add('flashsale-rerolling')
                setTimeout(() => {
                    element.classList.remove('flashsale-rerolling')
                }, 400)
                CrittaFlashSale.reroll(true)
                chatter({actor: 'plainsys', text: `consumed 2 sfer cube for reroll`, readout: false})
                return; // just a reroll!
            break
        }

        play('muiClick')
        CrittaFlashSale.offeringGroup.reapExec(CrittaFlashSale.offering)
        CrittaFlashSale.reroll(true)
    }

    //planned offerings are - specific items (weird ones), specific impulses (weird ones), impulse cache, fish spot (rare)
    static OFFERINGS = {
        specificItem: {
            slug: "specificItem",
            baseWeight: 1,
            minimumTension: 0,
            possibleItems: [
                { slug: "eq_rot", quantity: 1, component: "rot", humorCost: 2, sferCost: 4 },
                { slug: "eq_translator", quantity: 1, component: "light", humorCost: 2, sferCost: 4 },
                { slug: "eq_rifle", quantity: 1, component: "rot", humorCost: 4, sferCost: 8 } // expensive as fuck because this is free plan/enact more or less
            ], //mainly for either weird ones or early access

            getOffering: function () {
                /* 
                    { // rewardObj schema
                        img,
                        type, (string of offering type, maybe used for styling)
                        quantity, (if applicable)
                        infoObject (anything that has "name", and "description" or "help", so we don't have to define more strings),
                        status, // will display status definition instead of .help/.desc if provided
                        humorCost,
                        humorType,
                        sferCost
                    }
                */

                let itemSelect = this.possibleItems.sample()
                let item = env.ITEM_LIST[itemSelect.slug]

                return { // rewardObj schema
                    img: item.image,
                    type: "item",
                    component: itemSelect.component,
                    infoObject: item,
                    status: item.type == "equipment" ? env.STATUS_EFFECTS[item.alterations.find(alt=>alt[0]=="STATUS")[1]] : false,
                    sferCost: itemSelect.sferCost || 2,
                    humorCost: itemSelect.humorCost || 1,
                    humorType: itemSelect.humorTypes ? itemSelect.humorTypes.sample() : ["claws", "bone", "ichor", "light", "eyes"].sample(),
                    quantity: itemSelect.quantity || 1,
                }
            },

            //reapExec is post paying, so it's just delivery
            reapExec: function(rewardObj) {
                console.log('should get item from', rewardObj)

                addItem(rewardObj.infoObject.slug, rewardObj.quantity || 1)
                chatter({actor: 'plainsys', text: `retrieved resource ${rewardObj.quantity ? rewardObj.quantity + "::" : ""}${rewardObj.infoObject.name.toUpperCase()}`, readout: true})
            },
        },

        specificImpulse: {
            slug: "specificImpulse",
            baseWeight: 1,
            declineValue: 1,
            minimumTension: 0,
            ignoresSferBonus: true,
            possibleImpulses: [
                { slug: "daemon_rot", humorCost: 3, sferCost: 4},
                { slug: "daemon_bomb", humorCost: 3, sferCost: 4},
                
                { slug: "light_laughterhouse", humorCost: 2, sferCost: 3, humorTypes: ["light", "claws", "eyes"]},
                { slug: "light_humorist", humorCost: 2, sferCost: 3 },

                // action impulses
                { slug: "retaliation", humorCost: 2, sferCost: 3, humorTypes: ["bone"], minimumTension: 0,},
                { slug: "ichor_last_stand", humorCost: 2, sferCost: 3, humorTypes: ["ichor"], minimumTension: 0,},
                { slug: "impatient", humorCost: 2, sferCost: 3, humorTypes: ["claws"], minimumTension: 0,},
                { slug: "active_support", humorCost: 2, sferCost: 3, humorTypes: ["eyes"], minimumTension: 0,},
                { slug: "visionary", humorCost: 2, sferCost: 3, humorTypes: ["light"], minimumTension: 0,},

                // fates
                { slug: "fated_bone", humorCost: 4, sferCost: 6, humorTypes: ["bone"], minimumTension: 0,},
                { slug: "fated_ichor", humorCost: 4, sferCost: 6, humorTypes: ["ichor"], minimumTension: 0,},
                { slug: "fated_claws", humorCost: 4, sferCost: 6, humorTypes: ["claws"], minimumTension: 0,},
                { slug: "fated_eyes", humorCost: 4, sferCost: 6, humorTypes: ["eyes"], minimumTension: 0,},
                { slug: "fated_light", humorCost: 4, sferCost: 6, humorTypes: ["light"], minimumTension: 0,},
                
            ],  //mainly for either weird ones or early access to actions and fates

            getOffering: function () {
                // filter out any impulses that every shell already has
                let availableImpulses = this.possibleImpulses.filter(impulseSelect => {
                    return !page.party.every(m=>m.alterations ? m.alterations.some(alteration => alteration[1] == impulseSelect.slug && alteration[2] == "IMPULSE"): false)
                })

                // also check against minimum tension if it exists
                availableImpulses = availableImpulses.filter(impulseSelect => {
                    if(typeof impulseSelect.minimumTension == "number") return env.crittaMap.tension >= impulseSelect.minimumTension;
                    return true;
                })

                if(availableImpulses.length == 0) {
                    //all specific impulses are taken, fallback to impulse cache
                    return CrittaFlashSale.OFFERINGS.impulseCache.getOffering()
                }

                let impulseSelect = availableImpulses.sample()
                let impulse = env.STATUS_EFFECTS[impulseSelect.slug]

                return {
                    img: impulse.icon,
                    type: "impulse",
                    component: impulse?.impulse?.component,
                    infoObject: impulse,
                    status: impulse,
                    sferCost: impulseSelect.sferCost || 2,
                    humorCost: impulseSelect.humorCost || 1,
                    humorType: impulseSelect.humorTypes ? impulseSelect.humorTypes.sample() : ["claws", "bone", "ichor", "light", "eyes"].sample()
                }
            },

            reapExec: function(rewardObj) {
                console.log('should get impulse from', rewardObj)
                let id = `reward${env.crittaCount++}`
                content.insertAdjacentHTML(`beforeend`, `<critta-reward id="${id}" specialprice="1" nosferbonus class="pre-show" type="specificImpulse" impulse="${rewardObj.infoObject.slug}"></critta-reward>`)
                let rewardEl = document.getElementById(id)
                setTimeout(() => rewardEl.activate(), 100)
            },
        },

        impulseCache: { // specifically gives impulses ONLY from the component shown
            slug: "impulseCache",
            baseWeight: 0.75,
            minimumTension: 0,

            getOffering: function () {
                let component = ["claws", "bone", "ichor", "light", "eyes"].sample()

                return {
                    img: `/img/sprites/combat/statuses/lootbox_frame.gif`,
                    type: "cache",
                    component: component,
                    infoObject: CrittaReward.REWARDTYPES.impulse,
                    specialTitle: CrittaReward.REWARDTYPES.impulse.name.split(" ")[0],
                    specialDescription: `'grants permanent passive';\n'exclusively offers <span style="text-shadow: 1px 1px var(--${env.COMBAT_COMPONENTS[component].color || "bright"}-color)">${component.toUpperCase()}</span> impulses'`,
                    sferCost: 3,
                    humorCost: 2,
                    humorType: component
                }
            },

            reapExec: function(rewardObj) {
                console.log('should get impulse cache from', rewardObj)
                let id = `reward${env.crittaCount++}`
                content.insertAdjacentHTML(`beforeend`, `<critta-reward id="${id}" specialprice="1"nosferbonus class="pre-show" type="impulse" difficulty="2" componentexclusive="true" component="${rewardObj.component}"></critta-reward>`)
                let rewardEl = document.getElementById(id)
                setTimeout(() => rewardEl.activate(), 100)
            },
        },

        itemCache: {
            slug: "itemCache",
            baseWeight: 0.75,
            minimumTension: 0,

            getOffering: function () {
                let component = ["claws", "bone", "ichor", "light", "eyes"].sample()

                return {
                    img: `/img/sprites/combat/statuses/lootbox_corru.gif`,
                    type: "cache",
                    component: "light",
                    infoObject: CrittaReward.REWARDTYPES.item,
                    specialTitle: CrittaReward.REWARDTYPES.item.name.split(" ")[0],
                    specialDescription: `'grants powerful equipment'`,
                    sferCost: 4,
                    humorCost: 2,
                    humorType: component
                }
            },

            reapExec: function(rewardObj) {
                console.log('should get item cache from', rewardObj)
                let id = `reward${env.crittaCount++}`
                content.insertAdjacentHTML(`beforeend`, `<critta-reward id="${id}" class="pre-show" specialprice="1" nosferbonus type="item" difficulty="2" component="${rewardObj.component}"></critta-reward>`)
                let rewardEl = document.getElementById(id)
                setTimeout(() => rewardEl.activate(), 100)
            },
        },

        fishingHole: {
            slug: "fishingHole",
            baseWeight: 0.3,
            minimumTension: 0,

            getOffering: function () {
                let component = ["claws", "bone", "ichor", "light", "eyes"].sample()

                return {
                    img: `/img/sprites/combat/items/lonefish.gif`,
                    type: "fish",
                    component: "rot",
                    specialTitle: "fishing hole",
                    specialDescription: `'fishy time'`,
                    sferCost: 4,
                    humorCost: 2,
                    humorType: component
                }
            },

            reapExec: function(rewardObj) {
                [... content.querySelectorAll(".fishy")].sample().classList.add("active")
                if(Math.random() < 0.3) [... content.querySelectorAll(".fishy")].sample().classList.add("active") // chance for more than one
                chatter({actor: 'sourceless', text: `the water around the vessel stirs...`, readout: true, sfx: false})
                setTimeout(()=>play("talkchoir", 0.5), 2000)
            },
        },
    }
}
customElements.define('critta-flashsale', CrittaFlashSale)

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
            if(!this.editingMember || this.editingMember?.partySlug != this.selectedMember) { 
                console.log('redefining editingMember', this.editingMember?.partySlug, this.selectedMember )
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
            actionsEl.innerHTML = "<h2>Actions</h2>" + generatePartyActions(this.editingMember, {createDryReference: true})

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

            // in case any humors are freed
            if(CrittaFlashSale) CrittaFlashSale.refreshAll()
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
                    let i = page.party.findIndex(member => member.slug == this.editingMember.partySlug)
                    if(i >= 0) {
                        let oldMemberVersion = page.party[i]
                        this.editingMember.equipment = oldMemberVersion.equipment // item slots are only in the party menu, so if you change them while editing it should use the 'old member'
                        this.editingMember.slug = this.editingMember.partySlug // no longer 'genericediting'
                        page.party[i] = this.editingMember
                    }
                    else throw 'party member not found!!'

                    this.editingMember.justSaved = "just-saved"

                    //apply pending augment changes
                    if(this.editingMember.augmentChanges) {
                        for (const augmentSlug of this.editingMember.augmentChanges.add) addAugment(this.editingMember.partySlug, augmentSlug)
                        for (const augmentSlug of this.editingMember.augmentChanges.remove) removeAugment(this.editingMember.partySlug, augmentSlug)

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
            change("PAGE!!usedAugment", true)

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

        // for dry generation purposes, to be distinct from the party menu
        this.editingMember.partySlug = this.selectedMember
        this.editingMember.slug = "genericediting" 
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
                    
                    //ing update - augments will either be a status that explains what it does, OR just the first action it grants
                    //anything more complex than replacing one action should prooobably have a status as its first thing to explain it, even if it's an invisible no-effect status just for the description
                    //this won't happen in my current plans though that's just a note for modders 
                    augmentList.forEach(augmentData=>{
                        showAnything = true
                        let augment = augmentData.augment
                        let augmentDefinition = augment.alterations[0][0] == "STATUS" ? `STATUS++${augment.alterations[0][1]}` : `ACTION++${augment.alterations[0][1]}`
                        componentAugments += `<div class="augment-option noclosemenu ${(!check("PAGE!!usedAugment") && augmentData.affordable) ? "notinteractedyet" : ""}"
                            member="${editingMember.partySlug}"
                            actor="${editingMember.combatActor}"
                            slug="${augment.slug}"
                            inuse="${augmentData.inUse}"
                            unlocked="${augmentData.unlocked}"
                            affordable="${augmentData.affordable}"
                            cost="${augment.cost}"
                            parent-component="${componentName}"
                            style="--img: url(${augment.image || "/img/sprites/combat/items/aimacyst.gif"})"
                            definition="${augmentDefinition}"
                            fromActor="genericediting"
                            extraDefinitionNote="${augmentData.unlocked ? 
                                `<span class='augnote'><n-col>AUGMENT::</n-col>'${augment.name}'\n<n-col>COST::</n-col>${augment.cost} ${componentName.toUpperCase()}${augmentData.affordable || augmentData.inUse ? `${augmentData.inUse ? " <n-col>(click to remove)</n-col>" : ``}` : " <o-col>(cannot afford)</o-col>"}\n<n-col>INFO::</n-col>${augment.description}</span>`
                                : 
                                `<span class='augnote'><n-col>AUGMENT::</n-col>UNKNOWN\n<n-col>NOTICE::</n-col>'obtain data source to utilize'</span>`
                            }"
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
                        fromactor="genericediting"
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
                    nameHTML = `<span class="name component-ability" slot="${slotName}" definition="ACTION++${effectiveObj.slug}" fromactor="genericediting">${effectiveObj.name}</span>`
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
            name += env.incoherentLibrary.sample()
        }
        return name
    }

    //identity pools
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