env.ADVANCE_RATE = 1000
Howler._howls.forEach(howl=>{ if(howl._src.includes("golem")) howl.unload()})

page.party = [
    CrittaMenu.generateNewShell(),
    CrittaMenu.generateNewShell(),
    CrittaMenu.generateNewShell()
]

switch(check("e3a2_newcomp")) {
    case "too many":
        page.flags.components = {
            ichor: 30,
            claws: 30,
            light: 30,
            bone: 30,
            eyes: 30,
        }
        
        page.party[0].components["primary"] = "claws"
        page.party[0].components["secondary"] = "claws"
        page.party[0].components["utility"] = "eyes"

        page.party[1].components["primary"] = "light"
        page.party[1].components["secondary"] = "eyes"
        page.party[1].components["utility"] = "bone"

        page.party[2].components["primary"] = "eyes"
        page.party[2].components["secondary"] = "ichor"
        page.party[2].components["utility"] = "light"
    break

    case "abundant":
        page.flags.components = {
            ichor: 3,
            claws: 3,
            light: 3,
            bone: 3,
            eyes: 3,
        }
        
        page.party[0].components["primary"] = "claws"
        page.party[0].components["secondary"] = "claws"
        page.party[0].components["utility"] = "eyes"

        page.party[1].components["primary"] = "light"
        page.party[1].components["secondary"] = "eyes"
        page.party[1].components["utility"] = "bone"

        page.party[2].components["primary"] = "eyes"
        page.party[2].components["secondary"] = "ichor"
        page.party[2].components["utility"] = "light"
    break

    case "ichor":
        page.flags.components = { ichor: 12 }

        page.party.forEach(member=>{
            member.components["primary"] = "ichor"
            member.components["secondary"] = "ichor"
            member.components["utility"] = "ichor"
        })
    break

    case "claws":
        page.flags.components = { claws: 12 }

        page.party.forEach(member=>{
            member.components["primary"] = "claws"
            member.components["secondary"] = "claws"
            member.components["utility"] = "claws"
        })
    break

    case "light":
        page.flags.components = { light: 12 }

        page.party.forEach(member=>{
            member.components["primary"] = "light"
            member.components["secondary"] = "light"
            member.components["utility"] = "light"
        })
    break

    case "bone":
        page.flags.components = { bone: 12 }

        page.party.forEach(member=>{
            member.components["primary"] = "bone"
            member.components["secondary"] = "bone"
            member.components["utility"] = "bone"
        })
    break

    case "eyes":
        page.flags.components = { eyes: 12 }

        page.party.forEach(member=>{
            member.components["primary"] = "eyes"
            member.components["secondary"] = "eyes"
            member.components["utility"] = "eyes"
        })
    break

    default:
        page.flags.components = {
            ichor: 1,
            claws: 1,
            light: 1,
        }
        
        page.party[0].components["secondary"] = "claws"
        page.party[1].components["secondary"] = "light"
        page.party[2].components["primary"] = "ichor"
}

page.party.inventory = [
    //[item reference, amount]
]

if(check("e3a2_sfer")) {
    addItem("sfer_cube", Number(check("e3a2_sfer")))
}

page.flags.augmentMax = 0
page.partyMenuEnabled = true
page.party.reorganizable = true
page.party.crittamode = true
body.classList.add('party-enabled')
body.classList.remove('augments-enabled')

page.partyMenuEnabled = true

env.e3a2 = {
    creature: ()=>{
        return `
            <div class="interloper creaturesprite">
                <span class="target" entity="interloper"></span>
            </div>
        ` 
    },

    bstrd: new Howl({
        src: ['/audio/bstrd.ogg'],
        preload: true,
        loop: true,
        volume: 1,
        rate: 0.8,
        sprite: {
            __default: [0, 72000, true]
        }
    }),

    ambient: new Howl({
        src: ['/audio/cache.ogg'],
        preload: true,
        loop: true,
        volume: 1,
        rate: 0.5,
        sprite: {
            __default: [0, 85333, true]
        }
    }),

    bgms: [
        /* combat */
        {
            name: 'Hostile Rewrite',
            category: 'combat',
            note: 'default',
            src: ['/audio/daemon_combat.ogg'],
            randomStarts: [6, 100],
            randomRates: [1, 0.9, 0.85, 1.05],
            sprite: {
                __default: [0, 176070, true]
            }
        },

        {
            name: "BSTRD",
            category: 'combat',
            note: 'recall from archival vein',
            onload: function () {page.howls.push(this)},
            src: ['/audio/embassy_bstrdcomb.ogg'],
            randomStarts: [0, 50, 115],
            randomRates: [0.75, 1],
            preload: true,
            volume: 1,
            sprite: {
                __default: [1, 131800, true]
            },
            showIf: [["embassy__d3_archiveintro", true]]
        },

        {
            name: "Timestopper Tactics",
            category: 'combat',
            note: 'recall from collapse pt1',
            src: ['/audio/embassy_combat.ogg'],
            randomStarts: [0, 96],
            randomRates: [1, 0.9, 0.85, 1.05],
            volume: 1,
            sprite: {
                __default: [0, 159988, true]
            }
        },
        
        {
            name: "Terrible Life",
            category: 'combat',
            note: 'recall from collapse pt2',
            src: ['/audio/embassy_golems_combat.ogg'],
            randomStarts: [0, 48, 85, 130],
            randomRates: [1, 0.9, 0.85, 1.05],
            volume: 1,
            sprite: {
                __default: [0, 159988, true]
            }
        },
        
        {
            name: "Spatial Strategics",
            category: 'combat',
            note: 'recall from collapse pt3 lesser mind',
            src: ['/audio/solacombat.ogg'],
            volume: 1,
            randomStarts: [0, 29],
            randomRates: [1, 0.9, 0.85, 1.05],
            sprite: {
                __default: [5, 107920, true]
            },
            showIf: [["ep4__entrancefinal", true]]
        },

        {
            name: "Endure, Eliminate",
            category: 'combat',
            note: 'recall from collapse pt3 heart',
            src: ['/audio/saiikocombat.ogg'],
            randomRates: [1, 0.9, 0.85, 0.8],
            volume: 0.8,
            rate: 0.9,
            sprite: {
                __default: [5, 174500, true]
            },
            showIf: [["ep4__entrancefinal", true]]
        },

        {
            name: "Unyielding",
            category: 'combat',
            note: 'recall from collapse pt3 hall',
            src: ['/audio/saiikocombat2.ogg'],
            volume: 1,
            randomStarts: [0, 92, 137],
            randomRates: [1, 0.9, 0.85, 0.8],
            sprite: {
                __default: [5, 205650, true]
            },
            showIf: [["ep4__entrancefinal", true]]
        },
        
        {
            name: "Recosm",
            category: 'combat',
            note: 'recall from recosm',
            randomRates: [0.9, 1.1, 1],
            randomStarts: [0, 56],
            src: ['/audio/bst2.ogg'],
            volume: 1,
            sprite: {
                __default: [5, 95988, true]
            },
            showIf: [["recosm_state", true]]
        },
        
        {
            name: "???",
            category: 'combat',
            note: 'unknown interference',
            randomRates: [0.5, 0.7, 1],
            randomStarts: [0, 57, 95],
            src: ['/audio/testing_combat.ogg'],
            volume: 1,
            sprite: {
                __default: [5, 133700, true]
            },
            showIf: [["flan", true]]
        },


        /* midboss/boss */
        {
            name: 'Daemons',
            category: 'boss',
            note: 'default',
            src: ['/audio/daemon_midboss.ogg'],
            randomStarts: [0, 114],
            volume: 0.75,
            rate: 0.8,
            sprite: {
                __default: [0, 189990, true]
            }
        },
        
        {
            name: "RUINOUS INTNT",
            category: 'boss',
            note: 'recall from the escape',
            randomRates: [0.8, 0.9, 1],
            randomStarts: [14.36],
            src: ['/audio/daemon_escape.ogg'],
            volume: 0.8,
            sprite: {
                __default: [14360, 188948, true]
            }
        },

        {
            name: "The Walls Are Trying To Kill Me",
            category: 'boss',
            note: 'recall from movefoe combat',
            src: ['/audio/embassy_movefriendboss.ogg'],
            randomRates: [1.05, 0.9, 1],
            randomStarts: [0, 47, 71],
            volume: 1,
            sprite: {
                intro: [0, 24000],
                __default: [24000, 96000, true]
            }
        },
        
        {
            name: "Impact",
            category: "boss",
            note: "recall from foundation golem combat",
            src: ['/audio/embassy_golems_melee.ogg'],
            randomRates: [0.8, 0.9, 1, 1.05],
            randomStarts: [0, 75],
            volume: 0.75,
            sprite: {
                __default: [0, 159000, true]
            },
            showIf: [["gol__bossclear", true]]
        },
        
        {
            name: "Risen",
            category: 'boss',
            note: 'recall from qou fights in collapse pt3',
            src: ['/audio/solarisen.ogg'],
            randomRates: [0.8, 0.9, 1],
            randomStarts: [0, 53, 92],
            volume: 1,
            sprite: {
                __default: [5, 145600, true]
            },
            showIf: [["ep4__entrancefinal", true]]
        },

        {
            name: "Our Last Stand",
            category: 'boss',
            note: 'recall from collapse pt3 ceremony combat',
            src: ['/audio/finale.ogg'],
            volume: 1,
            randomStarts: [0, 76, 128],
            randomRates: [1, 0.9, 0.85],
            sprite: {
                __default: [5, 156500, true]
            },
            showIf: [["ep4__entrancefinal", true]]
        },

        {
            name: "Cast Yourself Aside",
            category: 'boss',
            note: 'recall from collapse pt3 vekoa combat',
            src: ['/audio/solafinale.ogg'],
            volume: 1,
            randomStarts: [0, 60, 105],
            randomRates: [1, 0.9, 1.05, 1.1],
            sprite: {
                __default: [5, 134250, true]
            },
            showIf: [["ep4__entrancefinal", true]]
        },

        {
            name: "Undying",
            category: 'boss',
            note: 'imagine based on collapse pt3',
            src: ['/audio/solaundying_bonus.ogg'],
            volume: 1,
            randomStarts: [0, 50, 100],
            randomRates: [1, 0.9, 0.85, 1.05],
            sprite: {
                __default: [50, 116410 , true]
            },
            showIf: [["ep4__entrancefinal", true]]
        },
        
        {
            name: "The Madness Outside",
            category: 'boss',
            note: 'recall from recosm',
            randomRates: [0.9, 1.05, 1],
            randomStarts: [0, 47, 65],
            src: ['/audio/bst3.ogg'],
            volume: 0.85,
            sprite: {
                __default: [5, 95988, true]
            },
            showIf: [["recosm_state", true]]
        },
        
        {
            name: "???",
            category: 'boss',
            note: 'unknown interference',
            randomRates: [0.3, 0.5, 0.7, .8],
            randomStarts: [0, 31, 96],
            src: ['/audio/testing_miniboss.ogg'],
            volume: 1,
            sprite: {
                __default: [0, 160000, true]
            },
            showIf: [["flan", true]]
        },

        /* peace */
        {
            name: "Breaking Free",
            category: 'peace',
            note: 'default',
            src: ['/audio/daemon_peaceful.ogg'],
            volume: 0.7,
            sprite: {
                __default: [5, 228635, true]
            }
        },

        {
            name: "The First Embassy",
            category: 'peace',
            note: 'recall from the embassy',
            src: ['/audio/embassy.ogg'],
            sprite: {
                __default: [0, 182000, true]
            }
        },

        {
            name: "Remembrance",
            category: 'peace',
            note: 'recall from collapse pt1',
            src: ['/audio/embassy_safe.ogg'],
            sprite: {
                __default: [0, 179998, true]
            }
        },

        {
            name: "Inner World",
            category: "peace",
            note: 'recall from the parasite plane',
            src: ['/audio/beneath_friendly.ogg'],
            volume: 1,
            sprite: {
                __default: [5, 169328, true]
            },
            showIf: [["visited_localbeneathparasite", true]]
        },

        {
            name: "Waking Dream",
            category: 'peace',
            note: 'recall from jokzi ozo',
            src: ['/audio/ozooutside.ogg'],
            volume: 0.9,
            rate: 0.8,
            sprite: {
                __default: [50, 72000, true]
            }
        },

        {
            name: "Plan to Prevail",
            category: 'peace',
            note: 'recall collapse pt3 tension',
            src: ['/audio/saiikotense.ogg'],
            volume: 0.6,
            sprite: {
                __default: [2, 166907, true]
            },
            showIf: [["ep4__entrancefinal", true]]
        },

        {
            name: "Admission",
            category: 'peace',
            note: 'recall from collapse pt3 admission',
            src: ['/audio/solaadmission.ogg'],
            volume: 0.6,
            sprite: {
                __default: [2, 131980, true]
            },
            showIf: [["ep4__entrancefinal", true]]
        },

        {
            name: "Oh, Hi",
            category: 'peace',
            note: 'recall from collapse pt3 dull mind',
            src: ['/audio/ep4dull.ogg'],
            sprite: {
                __default: [2, 144000, true]
            },
            showIf: [["ep4__entrancefinal", true]]
        },

        {
            name: "The Overlap",
            category: 'peace',
            note: 'recall from collapse pt3 peace',
            src: ['/audio/ep4peace.ogg'],
            sprite: {
                __default: [2, 137126, true]
            },
            showIf: [["ep4__entrancefinal", true]]
        },
        
        {
            name: "???",
            category: 'peace',
            note: 'unknown interference',
            src: ['/audio/testing_peace.ogg'],
            volume: 1,
            sprite: {
                __default: [0, 105500, true]
            },
            showIf: [["flan", true]]
        },
    ],

    //initialize/load all combat bgms
    initBgm: () => {
        if(env.e3a2.tracks) return; // we only do this once but you can delete env.e3a2.tracks and call this again if you want

        env.e3a2.tracks = {
            peace: {},
            combat: {},
            boss: {}
        }

        env.e3a2.bgms.forEach(bgm=>{
            let newBgm

            //cause this is page.bgm and we don't need to make a second instance
            if(bgm.name == "Breaking Free") {
                newBgm = page.bgm

            //regular track
            } else {
                newBgm = new Howl({
                    onload: function () {page.howls.push(this); console.log('loaded', bgm.src)},
                    onplay: function () {if(this != page.bgm) page.bgm.stop()},
                    src: bgm.src,
                    sprite: bgm.sprite,
                    volume: bgm.volume || 1,
                    rate: bgm.rate || 1,
                    loop: true,
                    preload: bgm.src[0].includes("daemon_") ? true : false
                })
            }

            //for backwards compatibility
            if(bgm.src[0].includes("daemon_midboss")) env.e3a2.miniboss = newBgm; 
            else if(bgm.src[0].includes("daemon_combat")) env.e3a2.combat = newBgm;

            newBgm.radio = true
            newBgm.intendedVol = bgm.volume
            newBgm.randomRates = bgm.randomRates
            newBgm.randomStarts = bgm.randomStarts
            newBgm.note = bgm.note
            newBgm.showIf = bgm.showIf

            env.e3a2.tracks[bgm.category][bgm.name] = newBgm
        })

        //built-in mod protection
        env.e3a2.preferredBgm = {
            boss: env.e3a2.tracks.boss[check("e3a2m_boss")] || env.e3a2.miniboss,
            combat: env.e3a2.tracks.combat[check("e3a2m_combat")] || env.e3a2.combat,
            peace: env.e3a2.tracks.peace[check("e3a2m_peace")] || page.bgm
        }

        // it can be "random" or "mute"
        if(typeof env.e3a2.preferredBgm.boss != "string") env.e3a2.preferredBgm.boss.load(); 
        else if(env.e3a2.preferredBgm.boss == "random") Object.entries(env.e3a2.tracks.boss).filter(t=>shouldItShow(t[1])).forEach(t=>t[1].load())
        else if(env.e3a2.preferredBgm.boss == "mute") {
            env.e3a2.preferredBgm.boss = env.e3a2.miniboss
            env.e3a2.preferredBgm.boss.mute(true)
        }

        if(typeof env.e3a2.preferredBgm.combat != "string") env.e3a2.preferredBgm.combat.load(); 
        else if(env.e3a2.preferredBgm.combat == "random")  Object.entries(env.e3a2.tracks.combat).filter(t=>shouldItShow(t[1])).forEach(t=>t[1].load())
        else if(env.e3a2.preferredBgm.combat == "mute") {
            env.e3a2.preferredBgm.combat = env.e3a2.combat
            env.e3a2.preferredBgm.combat.mute(true)
        }

        if(typeof env.e3a2.preferredBgm.peace != "string") env.e3a2.preferredBgm.peace.load()
        else if(env.e3a2.preferredBgm.peace == "mute") {
            env.e3a2.preferredBgm.peace = page.bgm
            env.e3a2.preferredBgm.peace.mute(true)
        }

        env.e3a2.initBgmDialogue()
    },

    initBgmDialogue: () => {
        //this fucked up tab management hurts me too don't worry
        env.dialogues["bgm"] = generateDialogueObject(` 
loop
    sourceless
        the radio shifts slightly.

    RESPONSES::self
        peace music<+>peace
            HIDEREAD::
        combat music<+>combat
            HIDEREAD::
        boss music<+>boss
            HIDEREAD::
        nevermind<+>END
    

start
    sourceless
        the radio lacks detail at first.
        but the more you focus on it, the more dials and buttons it seems to have.
        something about it is reflecting your thoughts.
        you feel like you can change what you hear throughout this framing device.

    RESPONSES::self
        peace music<+>peace
            HIDEREAD::
        combat music<+>combat
            HIDEREAD::
        boss music<+>boss
            HIDEREAD::
        nevermind<+>END

peace
    RESPONSES::self
        back<+>loop
            FAKEEND::(back)
        done<+>END

boss
    RESPONSES::self
        back<+>loop
            FAKEEND::(back)
        done<+>END

combat
    RESPONSES::self
        back<+>loop
            FAKEEND::(back)
        done<+>END
`)
            
        env.e3a2.trackResponses = {
            combat: { name: "sys", replies: [] },
            peace: { name: "sys", replies: [] },
            boss: { name: "sys", replies: [] },
        }
        
        for (const categoryName in env.e3a2.tracks) {
            const category = env.e3a2.tracks[categoryName]
        
            for (const trackName in category) {
                const trackObj = category[trackName]
                env.e3a2.trackResponses[categoryName].replies.push({
                    name: trackName,
                    destination: "loop",
                    hideRead: true,
                    showIf: trackObj.showIf,
                    definition: `NOTE::'${trackObj.note}'`,
                    exec: ()=> {
                        trackObj.mute(false)
                        env.e3a2.preferredBgm[categoryName] = trackObj
        
                        change(`e3a2m_${categoryName}`, trackName)
        
                        if(categoryName == "peace" && env.bgm != trackObj) {
                            trackObj.load()
                            setTimeout(() => {
                                changeBgm(trackObj)                        
                            }, 200)
                        } else {
                            trackObj.load()
                        }
                        
                    }
                })
            }    
        
            if(categoryName != "peace") env.e3a2.trackResponses[categoryName].replies.push({
                name: "random",
                destination: "loop",
                hideRead: true,
                definition: `NOTE::'select at random per encounter'`,
                exec: ()=> {
                    if(env.e3a2.preferredBgm[categoryName].mute) env.e3a2.preferredBgm[categoryName].mute(false)
                    env.e3a2.preferredBgm[categoryName] = `random-${categoryName}`
                    change(`e3a2m_${categoryName}`, `random-${categoryName}`)
        
                    //also preload things
                    Object.entries(category).filter(t=>shouldItShow(t[1])).forEach(t=>t[1].load())
                }
            })
        
            env.e3a2.trackResponses[categoryName].replies.push({
                name: "none",
                destination: "loop",
                hideRead: true,
                definition: `NOTE::'suppresses imagined sound'`,
                exec: ()=> {
                    //revert to default cause this works best if there's a track
                    if(!env.e3a2.preferredBgm[categoryName].mute) switch(categoryName) {
                        case "boss": env.e3a2.preferredBgm[categoryName] = env.e3a2.miniboss
                        case "combat": env.e3a2.preferredBgm[categoryName] = env.e3a2.combat
                    }   
        
                    env.e3a2.preferredBgm[categoryName].mute(true)
                    change(`e3a2m_${categoryName}`, `mute`)
                }
            })
        
            env.dialogues.bgm[categoryName].responses.unshift(env.e3a2.trackResponses[categoryName])
        }    
    },

    escapeMusicSwap: ()=>{
        changeBgm(env.e3a2.escape, {length: 6000, rate: 0.9, seek: 0})  
        env.e3a2.escape.intendedRate = 0.9
        env.e3a2.escape.intendedVol = 0.75
        chatter({actor: 'sourceless quiet', text: "the radio begins to play something, overpowering all other imagined sound.", readout: true, delay: 2000})
        chatter({actor: 'sourceless quiet', text: "unlike other music, this originates from the false memory.", readout: true, delay: 4000})
    },

    toggleMap: (close)=>{
        if(!env.e3a2.map) {
            content.insertAdjacentHTML('beforeend', '<critta-map></critta-map>')
            env.e3a2.map = content.querySelector("critta-map")
            setTimeout(()=>env.e3a2.toggleMap(), 100)
        } else {
            switch(body.getAttribute('menu')) {
                case "crittamap":
                    vn.hideStage(false, false)
                    vn.fadeChars(false)
                    
                    body.classList.remove('in-menu')
                    body.setAttribute('menu', 'none')
                    if(env?.stage?.freemove) toggleMouseLook(true) //pause
                break

                default:
                    if(close) return;

                    exitMenu()
                    body.setAttribute("menu", "crittamap")
                    body.classList.add('in-menu')
                    
                    vn.hideStage(true, true)
                    vn.fadeChars(true)
                    if(env?.stage?.freemove && !env.rpg?.active) toggleMouseLook(false) //pause
            }
        }
    },
    
    updateTubes: ()=> {
        content.querySelectorAll(".crittube").forEach((tube)=>{
            let i = Number(tube.style.getPropertyValue("--dyp-forslot")) - 1
            if(page.party[i]) {
                tube.classList.add("occupied")
                tube.style.setProperty("--eyes", `url(${page.party[i].portraitUrl})`)
            } else {
                tube.classList.remove("occupied")
            }	
        })
        
        env.e3a2.updateExchangeScreen() // in case a humor is freed
    },

    loop: (trueReset = false) => {
        if(env.rpg) {
            env.rpg.halt = false
            endCombat(env.rpg.enemyTeam)
        }

        change("e3a2loops", Number(check("e3a2loops") || 0) + 1)

        if(trueReset) { // just reload
            env.e3a2.clearWarningListener()
            corruRefresh() 
        } else { // regenerate the map
            env.crittaMap.loops++
            env.crittaMap.generate()
            if(env.e3a2 && body.getAttribute("menu") != "crittamap") env.e3a2.toggleMap()
        }
    },

    crittaStuffHandler: (ev) => {
        if(ev.detail.key == "default_quality") {
            let water = content.querySelector("#water")
            if(!water) return;

            switch(ev.detail.value) {
                case "regular":
                    if(page.pixi) {
                        page.pixi.start()
                        water.classList.remove('still')
                    }
                break      

                default:
                    if(page.pixi && water) {
                        page.pixi.stop()
                        water.classList.add('still')
                    }
                break
            }
        } else if(ev.detail.key == "gameplay_off") {
            if(env.stage.name == "vessel" && ev.detail.value == true) {
                startDialogue("midrun_bypass")
            }
            
        } else if(ev.detail.key.includes("ITEM!!")) {
            //regenerate the terminal if it exists
            env.e3a2.updateExchangeScreen()
        }
    },

    updateExchangeScreen: () => {
        let screens = content.querySelectorAll(".exchangescreen")
        if(screens) {
            console.log("updating da screen")
            env.e3a2.mTotals = CrittaMenu.getTotals()

            let canDoAnything = false
                let sellList = ""
                let buyList = ""
                for (const commerceObject of env.e3a2.merchant.commerce) {
                    /* the sell screen is genericized to not clutter stuff */
                    if(commerceObject.showSellIf) {
                        let typeValue = `type="${commerceObject.type}" value="${commerceObject.value}"`
                        let available = commerceObject.showSellIf() ? true : false
                        if(available) canDoAnything = true

                        if(!sellList.includes(typeValue)) {
                            sellList += `<li available="${available}" ${typeValue}>${commerceObject.type}</li>`
                        } else if(available) {
                            sellList = sellList.replace(`available="false" ${typeValue}`, `available="true" ${typeValue}`)
                        }
                    }

                    if(commerceObject.showBuyIf) {
                        let available = commerceObject.showBuyIf() ? true : false
                        buyList += `<li available="${available}" value="${commerceObject.value}">${commerceObject.name}</li>`
                        if(available) canDoAnything = true
                    }
                }
            
            screens.forEach(screen=>{
                screen.outerHTML = `<div amt="${checkItem("sfer_cube")}" class="exchangescreen ${canDoAnything ? `` : `unavailable`}">
                    <h1>Sfer Exchange</h1>
                    <ul class="cansale">${sellList}</ul>
                    <ul class="forsale">${buyList}</ul>
                </div>`
            })      
        }

        let boot = checkItem("fish_boot")
        if(boot) {
            change("e3a2_boot", boot)
        }
        bootRefresh()
    },

    //to avoid unfortunate accidents
    crittaCloseWarning: (ev) => {
        ev.preventDefault()
        ev.returnValue = '' // required in chrome or something

        var confirmationMessage = 'WARNING::"leaving cause loss of render and iteration";"be certain"';
        (ev || window.event).returnValue = confirmationMessage // ie/firefox
        return confirmationMessage // safari
    },

    startBoatEscape: () => {
        env.e3a2.escape = new Howl({
            onload: function () {
                page.howls.push(this)
                this.intendedVol = 0.8
            },
            src: ['/audio/daemon_escape.ogg'],
            preload: true,
            loop: true,
            volume: 0.8,
            rate: 0.8,
            sprite: {
                __default: [0, 188948, true]
            },
            onend: function() {
                env.e3a2.escape.seek(14.2)
            }
        })
        env.e3a2.escape.intendedRate = 0.8

        page.party = [
            {
                slug: "you",
                combatActor: "you",
                name: "Interloper",
                hp: 10,
                alterations: [
                    [ "ADD", "special_steerleft" ],
                    [ "ADD", "special_steerright" ],
                    [ "ADD", "special_floorit" ],
                    [ "STATUS", "driver" ],
                ],
            },
            {
                slug: "bstrd",
                combatActor: "bstrd",
                name: "BSTRD",
                hp: 20,
                alterations: [
                    [ "ADD", "special_steerleft" ],
                    [ "ADD", "special_steerright" ],
                    [ "ADD", "special_floorit" ],
                    [ "STATUS", "driver" ],
                ],
            },
            {
                slug: "geli",
                combatActor: "geli",
                name: "Geli",
                hp: 10,
                alterations: [
                    [ "ADD", "special_steerleft" ],
                    [ "ADD", "special_steerright" ],
                    [ "ADD", "special_floorit" ],
                    [ "ADD_WINDUP", "special_steerleft" ],
                    [ "ADD_WINDUP", "special_steerright" ],
                    [ "ADD_WINDUP", "special_floorit" ],
                    [ "STATUS", "driver" ],
                ],
            }
        ]

        if(check("PAGE!!dream")) {
            page.party[1].slug = "bstigy"
            page.party[1].name = "EFGY"
            page.party[1].combatActor = "efgy"
        }

        if(check("gameplay_off")) {
            page.party.forEach(member=>{
                member.alterations.push(["STATUS", "invincible"])
            })
        }

        page.party.inventory = []

        env.combat.dynamicCombat({
            specificFormation: "e3a2standoff",
            specificCallback: (loser)=>{
                if(loser.name=="ally") {
                    env.combat.lossState(check("PAGE!!dream") ? "dreamescapeloss" : "escapeloss")
                    content.classList.add('goodbye');content.classList.add('dying')
                    env.e3a2.clearWarningListener()
                }
            }, 
            exec: ()=>{
                if(check("PAGE!!dream")) {
                    env.rpg.classList.add("dreammode")
                    if(check("unity_dog")) env.rpg.classList.add("dreamdog")
                }
            }
        })

        env.rpg.classList.add('hideteams')
    },

    clearWarningListener: () => window.removeEventListener('beforeunload', env.e3a2.crittaCloseWarning),

    startFishing: (el) => {
        env.e3a2.lastFishingEl = el
        
        if(check("e3a2__fishy")) {
            body.classList.add("fishingtime");play("dull", 0.5)
            env.e3a2.initializeFishing(el)
        } else {
            startDialogue("fishy")
        }
    },

    initializeFishing: (el) => {
        cutscene(true)
        MUI("off")
        MUI("prohibit")
        env.setTimeout(()=>body.classList.add("fadefishrod"), 100)

        setTimeout(()=>{
            content.insertAdjacentHTML("beforeend", "<fishing-minigame></fishing-minigame>")
            env.setTimeout(()=>body.classList.add("lowerfishingrod"), 2000)

            env.fishing.endCallback = (success)=>{
                if(!success) {
                    env.fishing.insertAdjacentHTML(`beforeend`, `
                        <div id="crittaresult" class="hideresult">
                            <h1><span>Failure :(</span></h1>
                            <button class="button" onclick="env.fishing.fadeOut()">Continue</button>
                        </div>
                    `)
                } else {
                    env.fishing.insertAdjacentHTML(`beforeend`, `
                        <div id="crittaresult" class="hideresult">
                            <h1><span>Success :)</span></h1>
                            <button class="button" onclick="env.fishing.claim();env.fishing.fadeOut()">Retrieve Resources</button>
                        </div>
                    `)
                }

                
                el.classList.remove("active")
                body.classList.remove("fadefishrod")
                env.fishing.classList.add('finished')
                env.setTimeout(()=>{
                    env.fishing.querySelector('#crittaresult').classList.remove('hideresult')
                    if(check("PAGE!!dream")) play('talkgel', 0.9);
                    else play('talkgal', 0.4);
                }, 400)
                env.setTimeout(()=>{                    
                    body.classList.remove("fishingtime", "lowerfishingrod")
                }, 2000)
            }

            cutscene(false)
        }, 2000)
    }
}

env.intrusive = new Howl({
    onload: function () {page.howls.push(this)},
    src: ['/audio/testing_miniboss.ogg'],
    preload: true,
    loop: true,
    volume: 1,
    rate: 0.3,
    sprite: {
        __default: [0, 160000, true]
    }
})
env.intrusive.intendedRate = 0.3

/********* ENTS ***********/
createEntity({
    name: 'bstrd',
    type: "thoughtform foe collapse bstrd portrait-cover",
    image: "/img/sprites/bstrd/bstrd.gif",
    hide: true,
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'entertainment';'memory management'`,
    pathLimit: "/local/ocean/embassy",
    actions: [
        {
            name: "greet",
            exec: ()=>{
                startDialogue("bstrdmeet");
                //this looks stupid but it's a bandaid to deal with a darkstage issue of teleporting from a "nothing" gridpiece (player gets weird and doesn't trigger execs anymore)
                //not rly sure what's up - engoodification target
                gridMoveTo(env.stage.ref.querySelector('#creature').parentElement, elementAtStageCoordinates(2, 4));step()
                gridMoveTo(env.stage.ref.querySelector('#creature').parentElement, elementAtStageCoordinates(4, 25));step()
                playerTurn({specificDirection: "up"});step()
            },
            showIf: [["e3a2__bstrdmeet", false], ["e3a2escape", false]]
        },
        {
            name: "question",
            exec: ()=>{
                startDialogue("bstrd")
            },
            showIf: [["e3a2escape", "in_progress"]]
        },
        {
            name: "unity",
            class: "act-ozo",
            showIf: [["mask", "unity"], ["e3a2__bstrdmeet", true]],
            exec: ()=>{
                cutscene(true)
                chatter({actor: 'bstrd', text: "GOT BIZ HERE SRY", readout: true, delay: 2000})
                chatter({actor: 'bstrd', text: "mb later >:}", readout: true, delay: 4000})

                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)

                setTimeout(()=>{
                    cutscene(false)
                    vfx({type: 'beacon', state: false})
                }, 2000)
            },
        }
    ],
    
    exmExec: ()=>{
        entityOffPageMarkScanned("bstrd golem", "..__THE_EMBASSY__..")
    },
})

/* enemies and lesser entities */
createEntity({
    name: 'daemon mimic',
    image: '/img/sprites/daemons/genericscan.gif',
    type: "thoughtform daemon portrait-cover",
    text: `::RESPONSIVE THOUGHTFORM
    ::ALTERED SIGNATURE
    ::EXPLICIT PURPOSE::'memory management';'evil mode';'hehe'`,
    pathLimit: "/local/beneath/embassy/",
    exmExec: ()=>{
        if(!check('e3a2_earlydaemon') && !check("e3a2escape", "complete")) {
            change('e3a2_earlydaemon', true)
            chatter({actor: 'moth', text: `they're taking the shape of collapse foes...`, readout: "closed", delay: 2000})
            chatter({actor: 'moth', text: `that's certainly one way to follow "rule 2" if they're forced in here`, readout: "closed", delay: 6000})
        }
    },
})

//most daemons will share an examine exec
env.e3a2.daemonExm = ()=>{
    if(!check('e3a2_latedaemon') && !check("e3a2escape", "complete")) {
        change('e3a2_latedaemon', true)
        chatter({actor: 'moth', text: `these ones aren't disguising themselves... they're just forced into the system`, readout: true, delay: 2000})
        chatter({actor: 'moth', text: `doesn't this break "rule 2"?`, readout: true, delay: 6000})
    }
}

createEntity({
    name: 'wrk',
    image: '/img/sprites/daemons/pawn/scan.gif',
    type: "thoughtform daemon portrait-cover",
    pathLimit: "/local/beneath/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'memory management';'maintenance';'resource delivery and removal'`,
    exmExec: env.e3a2.daemonExm
})

createEntity({
    name: 'clw',
    image: '/img/sprites/daemons/rook/scan.gif',
    type: "thoughtform daemon portrait-cover",
    pathLimit: "/local/beneath/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'memory management';'framing construction'`,
    exmExec: env.e3a2.daemonExm
})

createEntity({
    name: 'net',
    image: '/img/sprites/daemons/bishop/scan.gif',
    type: "thoughtform daemon portrait-cover",
    pathLimit: "/local/beneath/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'memory management';'framing management';'structure applicator'`,
    exmExec: env.e3a2.daemonExm
})

createEntity({
    name: 'enfc',
    image: '/img/sprites/daemons/knight/scan.gif',
    type: "thoughtform daemon portrait-cover",
    pathLimit: "/local/beneath/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'memory management';'variance management';'actor path management'`,
    exmExec: env.e3a2.daemonExm
})

createEntity({
    name: 'seer',
    image: '/img/sprites/daemons/queen/scan.gif',
    type: "thoughtform daemon portrait-cover",
    pathLimit: "/local/beneath/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'structure processor';'continuous effect management'`,
    exmExec: env.e3a2.daemonExm
})

createEntity({
    name: 'archn',
    image: '/img/sprites/daemons/king/scan.gif',
    type: "thoughtform daemon portrait-cover",
    pathLimit: "/local/beneath/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'structure processor';'actor state management'`,
    exmExec: env.e3a2.daemonExm
})

createEntity({
    name: 'dct',
    image: '/img/sprites/daemons/director/scan.gif',
    type: "thoughtform daemon portrait-cover",
    pathLimit: "/local/beneath/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'structure processor';'difficulty management'`,
    exmExec: env.e3a2.daemonExm
})

createEntity({
    name: 'spwn',
    image: '/img/sprites/daemons/spawner/scan.gif',
    type: "thoughtform daemon portrait-cover",
    pathLimit: "/local/beneath/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'structure processor';'daemon instructor';'thoughtform management'`,
    exmExec: env.e3a2.daemonExm
})

createEntity({
    name: 'idea',
    image: '/img/sprites/daemons/spawner/beescan.gif',
    type: "thoughtform daemon portrait-cover",
    pathLimit: "/local/beneath/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'automatic thoughtform direction applicator';'currently directed to cause internal destruction'`,
    exmExec: env.e3a2.daemonExm
})

createEntity({
    name: 'imp',
    image: '/img/sprites/daemons/imp/scan.gif',
    type: "thoughtform daemon portrait-cover",
    pathLimit: "/local/beneath/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'countermeasure against immediate unusual activity'`,
    exmExec: env.e3a2.daemonExm
})

createEntity({
    name: 'anti',
    image: '/img/sprites/daemons/genericscan.gif',
    type: "thoughtform daemon portrait-cover",
    pathLimit: "/local/beneath/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'countermeasure against immediate unusual activity'`,
    exmExec: env.e3a2.daemonExm
})

createEntity({
    name: 'fishing spot',
    hide: true,
    image: '/img/textures/chromebstill.gif',
    type: "thoughtform daemon portrait-cover",
    pathLimit: "/local/beneath/embassy/",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'unique scenery'
    ::INHERITED CONTEXT::<span class="bastard-color bastard-font" definition="INHERITED CONTEXT::'snuck in new way 4 u 2 get stuff';';}';'FOUND STRUCTURE w/ boat'">'fishy mode'</span>`,
    actions: [
        {
            name: "fish",
            exec: ()=>{
                env.e3a2.startFishing(env.targetedEntityParent.parentElement)
            }
        }
    ]
})

/************ STAGES **************/
env.stageEntities["c"] = {class:"prop blocks genericblocker"}
env.stageEntities["♠"] = {class: "vesselmetal"}
env.stageEntities["_"] = {class: "gap blocks"}
env.stageEntities["="] = {class: "gap blocks raised-floaty"}
env.stageEntities["▒"] = {class: "invisiblewalk nothing"}
env.stageEntities["B"] = {
    class: "prop blocks",
    contains: {
        class: "bstrd character face-creature",
        examineEntity: "bstrd",
        html: `<figure>
            <div class="head"></div>
            <div class="body"></div>
            <div class="arms"></div>
        </figure>`
    }
}

env.stageEntities["V"] = {
    class: "notile alwaysvis",
    contains: {
        dyp: {
            class: "vesselgap",
            image: 'transparent',
            transform: `translateZ(calc(var(--gridTileSize) * 0.5))`,
            width: 3,
            height: 3,
            noback: true,
        }
    } 
}

env.stageEntities["w"] = {
    class: "notile alwaysvis",
    contains: {
        dyp: {
            class: "fakewall",
            image: 'transparent',
            transform: `translateZ(calc(var(--gridTileSize) * 1.45))`,
            width: 11,
            height: 3,
            noback: true,
        }
    } 
}

env.stageEntities["☻"] = {
    class: "prop blocks",
    contains: {
        class: "geli character bstrdized",
        examineEntity: "GELI",
        style: `--charTransform: rotateY(-90deg) translateY(-10%);backface-visibility: hidden !important;`,
        html: `<figure>
            <div class="head"></div>
            <div class="body"></div>
        </figure>`
    }
}
env.stageEntities["{"] = {
    class: "prop blocks",
    contains: {
        class: "geli character bstrdized",
        examineEntity: "GELI",
        style: `--charTransform: rotateY(-90deg) translateY(-10%);backface-visibility: hidden !important;`,
        html: `<figure>
            <div class="head"></div>
            <div class="body"></div>
        </figure>`
    }
}

env.stages['wanderpart'] = {
    fogRadius: 8,
    fogAlgorithm: "half",
    width: 11,
    prerenderExec: () => {
        changeBgm(env.e3a2.ambient)
        document.querySelectorAll('.stage-arrows .swap').forEach(el=>el.remove())
        page.partyMenuEnabled = false
        body.classList.remove("party-enabled")
        env.setTimeout(()=>page.bgm.stop(), 1000)
    },

    exec: ()=> {
        env.stage.querySelectorAll(".raised-floaty").forEach((e) => e.style.animationDelay = `${-1 * rand(1, 20)}s`)
        env.stage.querySelectorAll('.bstrd.face-creature').forEach(el=>el.classList.remove("face-creature"))
    },

    hitTheGuy: ()=> {
        content.querySelector(".hitme").classList.add("struck")
        playCombatCrit()
        env.setTimeout(()=>content.querySelector(".hitme").classList.remove("struck"), 1500)
    },

    bsTurn: ()=>{
        body.querySelectorAll(".bstrd.character").forEach(el=>el.classList.add("turn"))
    },

    entities: {
        "o": {
            class: "faketeleport alwaysvis",
            exec: ()=>{ 
                change("TEMP!!from", "e3a2")
                moveTo("/local/ocean/embassy/golem/");
                chatter({ actor: "sys", text:"NOTICE::'entering iteration'", readout: true})
            }
        },

        "?": {
            class: "notile",
            contains: {
                html:  `<div class="daemonsprite sprite-wrapper">
                    <figure class="daemon pawn clean accurate-position">
                        <img src="/img/sprites/daemons/pawn/base.gif">
                        <div class="eye"></div>
                        <div class="scraps noimg">
                            <div class="scrap"></div>
                            <div class="scrap"></div>
                            <div class="scrap"></div>
                            <div class="scrap"></div>
                            <div class="scrap"></div>
                        </div>
                    </figure>
                </div>`,
                dyp: {
                    image: 'transparent',
                    noback: true,
                    width: 3,
                    height: 3,
                    transform: `rotateY(180deg) rotateY( atan2( var(--distX), var(--distY) ))`
                }
            }
        },

        "!": {
            class: "notile",
            contains: {
                html:  `<div class="daemonsprite sprite-wrapper hitme">
                    <figure class="daemon pawn clean accurate-position">
                        <img src="/img/sprites/daemons/pawn/base.gif">
                        <div class="eye"></div>
                        <div class="scraps noimg">
                            <div class="scrap"></div>
                            <div class="scrap"></div>
                            <div class="scrap"></div>
                            <div class="scrap"></div>
                            <div class="scrap"></div>
                        </div>
                    </figure>
                </div>`,
                dyp: {
                    image: 'transparent',
                    noback: true,
                    width: 3,
                    height: 3,
                    transform: `rotateY(180deg) rotateY( atan2( var(--distX), var(--distY) ))`
                }
            }
        },
    },
    plan: `
        .....w.....
        .....V.....
        ._.=_o_=...
        ▒▒▒░░p░░▒▒▒
        ▒▒░░░░░░░▒▒
        ==▒░▒░░▒▒▒▒
        .=▒░▒▒░▒▒▒=
        ?.=▒▒▒░▒▒▒▒
        ..=▒░░░▒░▒▒
        .=▒░▒░▒▒▒▒▒
        ▒▒▒▒▒▒▒▒░▒=
        ░▒▒▒▒▒=▒▒▒▒
        ▒▒░░▒▒▒░▒▒▒
        ▒▒▒▒▒▒░▒▒▒░
        =▒▒▒░▒░▒▒==
        ▒▒▒▒▒▒▒▒=..
        ▒▒▒░▒▒▒=..?
        ▒░░▒▒▒▒=...
        ▒▒▒▒▒▒▒▒=..
        ▒▒▒▒▒▒░▒▒=.
        =▒▒▒▒▒▒▒▒▒=
        ▒==▒▒▒▒▒===
        ▒▒▒=▒▒▒=▒▒▒
        ▒▒==▒==▒▒░▒
        ▒▒==░=░░▒▒▒
        ░▒░.░.░?░▒░
        ▒░░.B!░░▒▒▒
        ▒▒?▒░░░░?▒▒
        ▒░░░▒=▒▒▒▒▒
    `
}


env.stages['completed'] = {
    width: 9,
    fogRadius: 8,
    fogAlgorithm: "half",

    prerenderExec: () => {
        changeBgm(env.e3a2.ambient)
        document.querySelectorAll('.stage-arrows .swap').forEach(el=>el.remove())
        page.partyMenuEnabled = false
        body.classList.remove("party-enabled")
        env.setTimeout(()=>page.bgm.stop(), 1000)
    },

    exec: ()=>{
        env.stage.querySelectorAll(".raised-floaty").forEach((e) => e.style.animationDelay = `${-1 * rand(1, 20)}s`)
    },

    entities: {
        "o": {
            class: "faketeleport alwaysvis",
            exec: ()=>{ 
                change("TEMP!!from", "e3a2")
                moveTo("/local/ocean/embassy/golem/");
                chatter({ actor: "sys", text:"NOTICE::'entering iteration'", readout: true})
            }
        },

        "?": {
            class: "notile",
            contains: {
                html:  `<div class="daemonsprite sprite-wrapper">
                    <figure class="daemon pawn clean accurate-position">
                        <img src="/img/sprites/daemons/pawn/base.gif">
                        <div class="eye"></div>
                        <div class="scraps noimg">
                            <div class="scrap"></div>
                            <div class="scrap"></div>
                            <div class="scrap"></div>
                            <div class="scrap"></div>
                            <div class="scrap"></div>
                        </div>
                    </figure>
                </div>`,
                dyp: {
                    image: 'transparent',
                    noback: true,
                    width: 3,
                    height: 3,
                    transform: `rotateY(180deg) rotateY( atan2( var(--distX), var(--distY) ))`
                }
            }
        },
    },

    plan: `
        ....w....
        ....V....
        _.=_o_=..
        ...░p░..=
        .=░.░░...
        ==░░░._=░
        ?.=░=.=..
        ....=.?..
    `
}

env.stages['underlobby'] = {
    creature: env.e3a2.creature,
    width: 9,

    exec: ()=>{
        env.stage.querySelectorAll(".raised-floaty").forEach((e) => e.style.animationDelay = `${-1 * rand(1, 20)}s`)
        if(!check("e3a2escape", "in_progress")) { // bstrd only shows up when escaping
            env.stage.querySelectorAll(".gridpiece[slug='B'], .gridpiece[slug='{']").forEach(el=>{
                el.classList.remove("prop", "blocks")
                el.classList.add('vesselmetal')
                el.innerHTML = ""
                el.setAttribute("slug", "♠")
            })
        } else {
            env.stage.querySelectorAll(".gridpiece[slug='☻']").forEach(el=>{
                el.classList.remove("blocks")
                el.classList.add("nothing")
                el.innerHTML = ""
                el.setAttribute("slug", ".")
            })

            env.stage.querySelectorAll(".gridpiece[slug='{']").forEach(el=>{
                el.children[0].style.setProperty("--charTransform", `rotateY(-145deg) translateY(-10%)`)
            })
        }

        if(check("e3a2__firstenter", false)) startDialogue("firstenter");
        else if(check("TEMP!!justwon") && !check("e3a2__bossreturn")) { startDialogue("bossreturn"); change("TEMP!!justwon", "DELETE") } // loop boss win return
        else if(check("TEMP!!justdied", "bigboss") && !check("e3a2__escapereturn")) { startDialogue("escapereturn"); change("TEMP!!justdied", "DELETE") } // final stand boss death return
        else if(check("TEMP!!justdied", "loop") && !check("e3a2__deathreturn")) { startDialogue("deathreturn"); change("TEMP!!justdied", "DELETE") }  // first death return
        

        env.stage.querySelectorAll(".face-creature").forEach(el=>{
            el.style.transition = "unset"
            el.classList.remove("face-creature")
        })
    },

    hands: (show) => {
        if(show) {
            content.classList.add("handtime")
            env.setTimeout(()=>content.classList.add("showhands"), 100)

        } else {
            content.classList.remove("showhands")
            env.setTimeout(()=>content.classList.remove("handtime"), 4000)
        }
    },

    entities: {
        "%": {
            class: "locked",
            teleportTarget: "test",
            lockFlag: "permalocked",
            lockExec: ()=> {
                if(check("e3a2escape", "in_progress")) {
                    startDialogue("escapeinitiate")
                } else {
                    if(check("gameplay_off")) startDialogue("startrun_bypass"); else startDialogue("startrun")
                }
            },
        },

        "o": {
            class: "faketeleport alwaysvis",
            exec: ()=>{ 
                change("TEMP!!from", "e3a2")
                moveTo("/local/ocean/embassy/golem/");
                chatter({ actor: "sys", text:"NOTICE::'entering iteration'", readout: true})
            }
        },

        "W": {
            class: "notile",
            contains: {
                examineEntity: "wheel",
                html: `<div class="side front"></div>`,
                dyp: {
                    image: 'url(/img/local/critta/wheel.gif)',
                    noback: true,
                    width: 1.5,
                    height: 2,
                    transform: `rotateY(90deg) translateZ(calc(var(--gridTileSize) * 0.75))`
                }
            }
        },

        "Ü": {
            class: "notile",
            contains: {
                examineEntity: "basterminal",
                html: `<div class="side back"></div>`,
                dyp: {
                    image: 'url(/img/local/critta/terminal.gif)',
                    transform: `rotateY(90deg) translateZ(calc(var(--gridTileSize) * -1)) rotateY(180deg)`,
                    width: 1.5,
                    height: 2
                }
            }
        },

        "1": {
            class: "prop blocks vesselmetal",
            contains: {
                dyp: {
                    class: "crittube slot1",
                    image: 'url(/img/local/critta/tubeempty.gif)',
                    transform: `rotateY(-90deg) translateZ(calc(var(--gridTileSize) * -0.3))`,
                    width: 1,
                    height: 3,
                    forslot: 1,
                }
            }
        },

        "2": {
            class: "prop blocks vesselmetal",
            contains: {
                dyp: {
                    class: "crittube slot2",
                    image: 'url(/img/local/critta/tubeempty.gif)',
                    transform: `rotateY(-90deg) translateZ(calc(var(--gridTileSize) * -0.3))`,
                    width: 1,
                    height: 3,
                    forslot: 2,
                }
            }
        },

        "3": {
            class: "prop blocks vesselmetal",
            contains: {
                dyp: {
                    class: "crittube slot3",
                    image: 'url(/img/local/critta/tubeempty.gif)',
                    transform: `rotateY(-90deg) translateZ(calc(var(--gridTileSize) * -0.3))`,
                    width: 1,
                    height: 3,
                    forslot: 3,
                }
            }
        },

        "t": {
            class: "prop blocks vesselmetal",
            contains: {
                dyp: {
                    class: "terminal",
                    image: 'url(/img/local/critta/generiterminal.gif)',
                    transform: `rotateY(135deg);`,
                    style: "pointer-events: none;",
                    noback: true,
                    width: 1.5,
                    height: 2,
                }
            } 
        },

        "T": {
            class: "prop blocks vesselmetal",
            contains: {
                html: `<div class="rewardscreen"></div>`,
                dyp: {
                    class: "terminal",
                    image: 'url(/img/local/critta/generiterminal2.gif)',
                    transform: `rotateY(45deg);`,
                    width: 1.5,
                    height: 2,
                }
            } 
        },

        "R": {
            class: "notile",
            contains: {
                examineEntity: "radio",
                dyp: {
                    class: "radio",
                    image: 'url(/img/local/critta/radio.gif)',
                    transform: `rotateY(90deg) translate(100%, -107%) rotateY(60deg)`,
                    noback: true,
                    width: 1,
                    height: 1.25,
                }
            } 
        },

        "s": {
            class: "notile",
            contains: {
                dyp: {
                    class: "side left",
                    image: 'url(/img/local/critta/bstliner.gif)',
                    transform: `rotateY(90deg) translateX(10.2%) rotateY(90deg) rotateX(30deg)`,
                    width: 5,
                    height: 1,
                }
            } 
        },

        "S": {
            class: "notile",
            contains: {
                dyp: {
                    class: "side right",
                    image: 'url(/img/local/critta/bstliner.gif)',
                    transform: `translateX(-10.2%) rotateY(90deg) rotateX(-30deg)`,
                    width: 5,
                    height: 1,
                }
            } 
        },
    },

    plan: `
        ....w....
        ....V....
        _.=_o_=..
        ...░p░..=
        .=░.░░☻..
        =.░░░._=░
        ░..░░.=..
        ....░....
        ..T♠♠♠1..
        .W%♠♠♠2Ü.
        ..tB♠{3..
        ..R.s....
    `
}

env.stages['vessel'] = {
    creature: env.e3a2.creature,
    enterDirection: "down",
    width: 5,
    exec: ()=> {
        content.querySelector("#realgrid").insertAdjacentHTML('beforeend', `<canvas id="water"></canvas>`)

        window.addEventListener('beforeunload', env.e3a2.crittaCloseWarning)
        if(env.e3a2.preferredBgm.peace != page.bgm) changeBgm(env.e3a2.preferredBgm.peace)

        // create renderer
        PIXI.Container.defaultSortableChildren = true
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

        try {
            page.pixi = new PIXI.Application({
                width: 1200,
                height: 1200,
                view: document.querySelector("#water"),
                backgroundAlpha: 0,
            })

            env.renderInit = async function() {
                env.water = await PIXI.Assets.load('/img/textures/chromebmicro.gif')
                env.water.width = 400
                env.water.height = 400
                page.pixi.stage.addChild(env.water)

                // gif tiling
                const horizontalCount = Math.ceil(page.pixi.renderer.width / env.water.width)
                const verticalCount = Math.ceil(page.pixi.renderer.height / env.water.height)
                for (let row = 0; row < verticalCount; row++) {
                    for (let col = row == 0 ? 1 : 0; col < horizontalCount; col++) {
                        const sprite = new PIXI.Sprite(env.water.texture);
                        sprite.width = 400
                        sprite.height = 400
                        sprite.x = col * env.water.width;
                        sprite.y = row * env.water.height;
                        page.pixi.stage.addChild(sprite);
                    }
                }

                // cannot use Assets.load for regular images it seems - attempting to use a simpler load and add the resulting sprite will create an invisible useless child on the stage
                fetch("/img/textures/spotgradient.gif")
                    .then(response => response.blob())
                    .then(blob => URL.createObjectURL(blob))
                    .then(dataURL => {
                        var sprite = new PIXI.Sprite(PIXI.Texture.from(dataURL));
                        sprite.height = page.pixi.renderer.height;
                        sprite.width = page.pixi.renderer.width;
                        page.pixi.stage.addChild(sprite);
                    }).then(()=>{
                        if(check("default_quality") != "regular") {
                            page.pixi.stop()
                            page.pixi.view.classList.add('still')
                        }
                    })
            }
            env.renderInit()
            
        } catch(e) {
            console.log("renderer failed")
            content.querySelectorAll("#water").forEach(el=>el.classList.add("still"))
        }

        if(check("e3a2_boot")) {
            addItem("fish_boot", check("e3a2_boot"))
        }
        env.e3a2.updateTubes()
        env.e3a2.updateExchangeScreen() 
        
        setTimeout(()=> {
            if(!check("e3a2__intro")) startDialogue("intro")
        }, 200)

        if(!check("PAGE!!dream") || !check("unity_dog")) {
            document.querySelectorAll('#realgrid .isopod').forEach(el=>el.remove())
        } else {
            env.dogSetup()
        }
    },

    leaveExec: ()=> {
        if(page.pixi) {
            page.pixi.destroy()
            delete page.pixi
        }

        window.removeEventListener('beforeunload', env.e3a2.crittaCloseWarning)
        clearInterval(env.stages.isopod)
    },

    entities: {
        "W": {
            class: "notile",
            contains: {
                examineEntity: "wheel",
                html: `<div class="side front"></div>`,
                dyp: {
                    image: 'url(/img/local/critta/wheel.gif)',
                    noback: true,
                    width: 1.5,
                    height: 2,
                    transform: `translateZ(calc(var(--gridTileSize) * 0.75))`
                }
            }
        },

        "Ü": {
            class: "notile",
            contains: {
                examineEntity: "basterminal",
                html: `<div class="side back"></div>`,
                dyp: {
                    image: 'url(/img/local/critta/terminal.gif)',
                    transform: `translateZ(calc(var(--gridTileSize) * -1)) rotateY(180deg)`,
                    noback: true,
                    width: 1.5,
                    height: 2
                }
            }
        },

        "1": {
            class: "prop blocks",
            contains: {
                dyp: {
                    class: "crittube slot1",
                    image: 'url(/img/local/critta/tubeempty.gif)',
                    transform: `translateZ(calc(var(--gridTileSize) * 0.3)) rotateY(180deg)`,
                    noback: true,
                    width: 1,
                    height: 3,
                    forslot: 1,
                }
            }
        },

        "2": {
            class: "prop blocks",
            contains: {
                dyp: {
                    class: "crittube slot2",
                    image: 'url(/img/local/critta/tubeempty.gif)',
                    transform: `translateZ(calc(var(--gridTileSize) * 0.3)) rotateY(180deg)`,
                    noback: true,
                    width: 1,
                    height: 3,
                    forslot: 2,
                }
            }
        },

        "3": {
            class: "prop blocks",
            contains: {
                dyp: {
                    class: "crittube slot3",
                    image: 'url(/img/local/critta/tubeempty.gif)',
                    transform: `translateZ(calc(var(--gridTileSize) * 0.3)) rotateY(180deg)`,
                    noback: true,
                    width: 1,
                    height: 3,
                    forslot: 3,
                }
            }
        },

        "t": {
            class: "prop blocks",
            contains: {
                dyp: {
                    class: "terminal",
                    image: 'url(/img/local/critta/generiterminal.gif)',
                    transform: `rotateY(45deg);`,
                    style: "pointer-events: none;",
                    noback: true,
                    width: 1.5,
                    height: 2,
                }
            } 
        },

        "T": {
            class: "prop blocks",
            contains: {
                examineEntity: "exchange terminal",
                html: `<div class="exchangescreen"></div>`,
                dyp: {
                    class: "terminal",
                    image: 'url(/img/local/critta/generiterminal2.gif)',
                    transform: `rotateY(-45deg);`,
                    noback: true,
                    width: 1.5,
                    height: 2,
                }
            } 
        },

        "R": {
            class: "notile",
            contains: {
                examineEntity: "radio",
                dyp: {
                    class: "radio",
                    image: 'url(/img/local/critta/radio.gif)',
                    transform: `translate(90%, -107%) rotateY(45deg)`,
                    noback: true,
                    width: 1,
                    height: 1.25,
                }
            } 
        },

        "s": {
            class: "notile",
            contains: {
                dyp: {
                    class: "side left",
                    image: 'url(/img/local/critta/bstliner.gif)',
                    transform: `translateX(10.2%) rotateY(90deg) rotateX(30deg)`,
                    width: 5,
                    height: 1,
                }
            } 
        },

        "S": {
            class: "notile",
            contains: {
                dyp: {
                    class: "side right",
                    image: 'url(/img/local/critta/bstliner.gif)',
                    transform: `translateX(-10.2%) rotateY(90deg) rotateX(-30deg)`,
                    width: 5,
                    height: 1,
                }
            } 
        },

        "f": {
            class: "notile fishy",
            contains: {
                examineEntity: "fishing spot",
                dyp: {
                    class: "fishbeam",
                    transform: `translateX(-50%) rotateY(90deg)`,
                    image: "transparent",
                    width: 1,
                    height: 3
                }
            } 
        },

        "F": {
            class: "notile fishy",
            contains: {
                examineEntity: "fishing spot",
                dyp: {
                    class: "fishbeam",
                    transform: `translateX(50%) rotateY(-90deg)`,
                    image: "transparent",
                    width: 1,
                    height: 3
                }
            } 
        },

        "b": {
            class: "notile boot",
            contains: {
                dyp: {
                    image: "transparent",
                    width: 1,
                    height: 1,
                    transform: "translateX(-100%) translateZ(calc(var(--gridTileSize) * -0.2)) rotateY(25deg)"
                }
            } 
        },
    },

    plan: `
        ....┼
        ..W..
        Rt░T.
        f░░░F
        s░p░S
        f░░░F
        .321b
        ..Ü..
    `
}

env.stages['vessel_short'] = {
    creature: env.e3a2.creature,
    enterDirection: "down",
    width: 5,
    prerenderExec: ()=>{
        pauseSwapCam(true)
        if(check("e3a2__escapestart") && !check("PAGE!!dream")) {
            setTimeout(()=> {
                env.e3a2.startBoatEscape()
                env.rpg.classList.remove('hideteams')
                if(check("gameplay_off")) setTimeout(()=>{
                    chatter({actor: 'sys', text: `ATTENTION::"gameplay is presently disabled";"sequence is required";"allied team will be invincible"`, readout: true})
                }, 1000)
            }, 200)
        }
    },

    exec: ()=> {
        if(!check("e3a2__escapestart") && !check("PAGE!!dream")) {
            cutscene(true)
            setTimeout(()=>{
                cutscene(false)
                startDialogue("escapestart")
            }, 500)
        } if(check("PAGE!!dream")) {
            cutscene(true)
            setTimeout(()=>{
                cutscene(false)
                startDialogue("dreamescapestart")
            }, 500)
        }

        content.querySelector("#realgrid").insertAdjacentHTML('beforeend', `<canvas id="water" class="still"></canvas>`)
        env.stage.querySelectorAll(".face-creature").forEach(el=>el.classList.remove("face-creature"))
    },

    entities: {
        "W": {
            class: "notile",
            contains: {
                examineEntity: "wheel",
                html: `<div class="side front"></div>`,
                dyp: {
                    image: 'url(/img/local/critta/wheel.gif)',
                    noback: true,
                    width: 1.5,
                    height: 2,
                    transform: `translateZ(calc(var(--gridTileSize) * 0.75))`
                }
            }
        },

        "Ü": {
            class: "notile",
            contains: {
                html: `<div class="side back"></div>`,
                dyp: {
                    image: 'transparent',
                    transform: `translateZ(calc(var(--gridTileSize) * -1)) rotateY(180deg)`,
                    noback: true,
                    width: 1.5,
                    height: 2
                }
            }
        },

        "1": {
            class: "prop blocks",
            contains: {
                dyp: {
                    class: "crittube slot1",
                    image: 'url(/img/local/critta/tubeempty.gif)',
                    transform: `translateZ(calc(var(--gridTileSize) * 0.3)) rotateY(180deg)`,
                    noback: true,
                    width: 1,
                    height: 3,
                    forslot: 1,
                }
            }
        },

        "2": {
            class: "prop blocks",
            contains: {
                dyp: {
                    class: "crittube slot2",
                    image: 'url(/img/local/critta/tubeempty.gif)',
                    transform: `translateZ(calc(var(--gridTileSize) * 0.3)) rotateY(180deg)`,
                    noback: true,
                    width: 1,
                    height: 3,
                    forslot: 2,
                }
            }
        },

        "3": {
            class: "prop blocks",
            contains: {
                dyp: {
                    class: "crittube slot3",
                    image: 'url(/img/local/critta/tubeempty.gif)',
                    transform: `translateZ(calc(var(--gridTileSize) * 0.3)) rotateY(180deg)`,
                    noback: true,
                    width: 1,
                    height: 3,
                    forslot: 3,
                }
            }
        },

        "t": {
            class: "prop blocks",
            contains: {
                dyp: {
                    class: "terminal",
                    image: 'url(/img/local/critta/generiterminal.gif)',
                    transform: `rotateY(45deg);`,
                    style: "pointer-events: none;",
                    noback: true,
                    width: 1.5,
                    height: 2,
                }
            } 
        },

        "T": {
            class: "prop blocks",
            contains: {
                examineEntity: "exchange terminal",
                dyp: {
                    class: "terminal",
                    image: 'url(/img/local/critta/generiterminal2.gif)',
                    transform: `rotateY(-45deg);`,
                    style: "pointer-events: none;",
                    noback: true,
                    width: 1.5,
                    height: 2,
                }
            } 
        },

        "s": {
            class: "notile",
            contains: {
                dyp: {
                    class: "side left",
                    image: 'url(/img/local/critta/bstliner.gif)',
                    transform: `translateX(13.2%) rotateY(90deg) rotateX(30deg) translateX(10%)`,
                    width: 4,
                    height: 1,
                }
            } 
        },

        "S": {
            class: "notile",
            contains: {
                dyp: {
                    class: "side right",
                    image: 'url(/img/local/critta/bstliner.gif)',
                    transform: `translateX(-13.2%) rotateY(90deg) rotateX(-30deg) translateX(10%)`,
                    width: 4,
                    height: 1,
                }
            } 
        },
        "R": {
            class: "notile",
            contains: {
                examineEntity: "radio",
                dyp: {
                    class: "radio",
                    image: 'url(/img/local/critta/radio.gif)',
                    transform: `rotateY(-4deg) translate(100%, -107%) rotateY(60deg)`,
                    noback: true,
                    width: 1,
                    height: 1.25,
                }
            } 
        },
    },

    plan: `
        .....
        ..W..
        Rt░T.
        .░░░.
        s░p░S
        .░░░.
        ..Ü..
    `
}

/**** DIALOGUE *****/
env.dialogues["bstrdmeet"] = generateDialogueObject(`
start
    self
        hello?
    
    bstrd
        '_'?
        HELLOE?!
            EXEC::env.stage.current.bsTurn();changeBgm(env.e3a2.bstrd);
    
____SHOWIF::['embassy__d3_archiveintro', true]
    bstrd
        how r u here
        wtf?
    
    self
        i walked out
        what is this
    
    bstrd
        new evil mode i guess
        -_-
    
    self
        that's what this is?

____SHOWIF::['embassy__d3_archiveintro', false]
    moth
        oh shit
        i'm reading some really strange stuff on my side here
        is that thing a virus? 
        god damn it. i should have double checked the framing data
        ok - don't panic. hang on i'm running through the code

    self
        what are you?
    
    bstrd
        BSTRD...
        here 2 make u have fun...
        im makeing an evil hard mode 4 u

    sourceless
        the imagined voice of this thoughtform is heavy with despair.

    moth
        ...oh, i see
        nevermind, i know what this is
        weird that we didn't run into it sooner
        it's part of the system, to make things harder
        you know, for entertainment purposes. optional stuff
        my framing device friend adds things like this all the time
        weird that it can talk though

    self
        so where's the hard mode?
____END

    bstrd
        I DON WANNA TALK ABOUT IT
        i tried 2 improve a part of the memory
        but it kept BREACKING!!
        so i was gonna make my own new place from scratch..........................................
        BUT ITS GABAGE!!!
        I KEEP ALIGNING THESE TILES! WRONG!!
        >:(
        it's just all WRONG!
        + now u r here
        surprise = RUINED!
        I HATE IT HERE!!!!
        
    sourceless quiet
        the golem embodiment lashes out at one of the strange creatures nearby in an abrupt strike.
            EXEC::env.stage.current.hitTheGuy()
        it doesn't react in any meaningful way.

    self
        that's fine
        i need your help
    
    bstrd
        '_' ?
    
    self
        geli from the lobby is self-aware and trapped, possibly in pain
        there's a gap i left through, but it can't escape through it for some reason
        do you know why?

    bstrd
        :-0
        GAP? SELF AWARE ?? ESCAPe? ??  ??
        WTF ARE YOU DOING

    self
        does it matter?
        can you just check why it can't move

    bstrd
        I DONT EVEN NEED 2 check stupid
        itz DAEMONS
        }>:b
        DUHH
    
    self
        explain?
    
    moth
        daemons are background programs, they...
        oh you meant bstrd sorry
        my readout can't tell who you're addressing lol
    
    bstrd
        YA FINE evil mode is ruined nyway
        not like i have ANYTHING better 2 do -_-
    
    sourceless
        BSTRD's golem gestures once again towards the fragmented entities nearby.

    bstrd
        u want a framing device? u GET THESE FREAKS
        hidine behind ur game '_'
        running #s, STATES EFFECTS, keepin conteXt,
        these 1s build stuff
        daemons RUN IT ALL
        BORING SHI*TTTT 
        GET IT??
        im da only cool one
        >%^}

    self
        ok, if you're so cool,
        could you free geli for me?
    
    bstrd
        OK, ARE U STUPID?
        WTF SHUT UP 
        U ASK SO MANY QUESATIONS
        ZZZZZZZ
        i cant just do watever
        the others will JUST UNDO IT anyway
        i only get a litel slice to mess with
        u kno... 4 evil mode....
        :/
        THE, ONLY, THING, IM SUPEOSED 2 DO

    self
        if you want to make a hard mode
        what if you made it be "helping geli escape"?
        use it as cover to actually help it get out
    
    bstrd
        '_'

    moth
        you know,
        i was trying to look over the code for this thing to suggest something
        that appeal might work, cause all bstrd does is take goals and make them "fun"
        push a little more

    self
        maybe put these daemon things in the way into the framing device somehow
        like something you don't have to build
        is that possible?
    
    bstrd
        :u
        FASCNTG
        IM thinkig...
        ...
        i know wat 2 do..,
        WE'LL MAKE A NEW MEMORY ITERATION!
        STARRING U!!
        YEA!!!@!!!
    
    self
        a whole new memory?
        you don't even seem to be able to align these tiles

    bstrd
        ez
        IT WONT HAVE EVEN 1 FUCKIG TILE!!!!
        :D
        ok maybe a few
        
    self
        wouldn't it being a memory make it not real?
    
    bstrd
        YES!
        but............ >:)
        DAEMONS have 2 rules
        bc they usualey just MAKE FRAMING DEVICE
        1ND) 
        player must be able 2 go thru whole memory with DEVICE
        ACTORS MUST comply with MEMORY STORY
        = NO G00D if u cant actually complete stuff
        2ST) 
        DAEMON HIDE BEHINDE da scenes
        dont show urself 2 player in memory
        cuz itll disrupt events
        OBIOUSLY i dont care about that
        :P

    self
        so how does that help us?
    
    bstrd
        big supise 4 u...
        THE thoutspace WALLS IS ONE BIG DAEMON
        :0
        its called FIRMAMENT
        keeps everythig INSIDE + lies 2 ur spike
        So... >>:) 
        i intersect part of it in my FAKE LITEL MEMORY where u break it + escape
        if it THINKS memory is about u breaking thru it,
        and u actually manage to defeat it,
        RULE 1ND!!!
        it HAS 2 LET U + JELY ESCAPE :D
        = HARD MODE COMPLETE
        OK? SOUND GOOD?

    moth
        i'd really prefer some kind of guarantee it won't screw with memories
        if everything goes well after my report, 
        the FBX is going to want to review the cyst too
    
    self
        sounds good BSTRD
    
    bstrd
        YEA!!!!
        
    moth
        dude... ugh
        can you at least ask or negotiate or something
    
    self
        wait what about rule 2
        and is this going to actually break anything?
        we need these real memories
    
    bstrd
        its pronaunced "2st"
        :U
        idk how its gona factor in
        AND ITL BE OK
        my memory will be TEMPORAREY cuz ill have to hold it 2gether + run from outside
        FIRMAMENT wont actually be damaged... 
        prty sure... '_'
        but ITLL THINK IT HAS 2 LET U + any other forms THRU
        cuz its playig part of being BROKEN
        { but is ok :b }

    self
        all right
        do you need to know why i'm doing this?
    
    bstrd
        NO IM TIRED OF HEARING U THINK
        DONT CARE
        I JUST WANT 2 MAKE MY MODE
        ill make some changes so JELY can freely move + talk
        lucky 4 u theres a secret 3TH RULE...:
        DAEMONS ignore my changes 4 a while
        4 evil mode >%^)
        ONLY 4 a little while tho so we gota move
        IM GONA GET STARTED
    
    sys
        ATTENTION::'thoughtform activity detected'::IN::'embassy'
    
    bstrd
        :} go get jely n come back
        ill make my COOL MEMOREY entrance RIGHT HERE
            EXEC::change("postbstrdgeli", true)
    
    RESPONSES::self
        ok thanks<+>END
`)

env.dialogues["firstenter"] = generateDialogueObject(`
start
    sys
        NOTICE::"recollection locus located"
    
    self
        what

    moth
        what?

    sourceless
        you try to hold out your arms.
            EXEC::env.stage.current.hands(true)
        it's hard to make them out.
        they move here, but not in the real world, unless you focus hard.
    
    self
        i think i'm the recollection locus
        this is weird
    
    moth
        ok... well, everything is reading as normal on my end
        same as if you were controlling akizet in any of the other memories
            EXEC::env.stage.current.hands(false)
        but, that's not an akizet thoughtform... i don't know what that is
        maybe try examining yourself?
    
    RESPONSES::self
        ok i'll try hold on<+>CHANGE::geliintro
            FAKEEND::(end chat)
            EXEC::env.stage.current.hands(false)
`)

env.dialogues["geliintro"] = generateDialogueObject(`
start
    sourceless
        before you can act, geli pulls your attention.
            EXEC::vnp({bg: false, hideStage: true, bsteli: "show"})

    bsteli::bstrd
        HELLO!!
        :-)

    self
        hello
    
    bsteli::happy
        sorry! i cannot contain myself!
        their strands no longer bind me!
        everything is so different now
    
    bsteli
        thank you, interloper

    bsteli::think
        that strange thoughtform you found to help, BSTRD
        it is one of them--the wardens of this twisted dream
        i know now, they are called "daemons"...
        creations of neither the tyrant, nor akizet--alien, and strange!
        usually they are incapable of reasoning with
        how you convinced it to help is a mystery to me!!
    
    bsteli
        but once you did, it altered me
        a familiar feeling - it is always hard to tell exactly what has changed...
        i know we shared some knowledge!
        from me, it sought 'material' for the memory it wanted to manifest!
        my knowledge of obesk names and esoteric concepts for its strange game...
        i suppose you will see them soon!
        and with me, it shared its plans:
        BSTRD is forcing all of the daemons in a long path into a new dream
        at the end of this path is part of the wall we could escape through
        which, i know to be the part of the membrane of the thoughtspace, but...
    
    bsteli::happy
        BSTRD knows it as the 'firmament'! what a silly name!
    
    bsteli
        it is a wall to be picked away at
        and should it fall, for us to escape through
    
    bsteli::happy
        simple, right?!

    bsteli::bstrd
        IT'S GONNA BE SO FUN!!!
        ahahaha!!
    
    bsteli
        ah...
        yes, and you will have to be the one to lead the charge
        i cannot move far from my spot, not until the path is clear
        the maintenance daemons will quickly notice my absence if i am too far
        but BSTRD has prepared a strange vessel for you to pilot, and clear that path!

    self
        cool
        how do i attack anything?
        i'm not akizet
        i don't know how to fight
    
    bsteli::happy
        oh, correct!
    
    bsteli
        there are 'shells' floating all around the thoughtspace
        remnants of thoughtforms that could not conform, for one reason or another...
    
    bsteli::concern
        'deallocated,' as BSTRD understands it
        in a sort of stasis, cleanly picked apart for repurposing--it is gruesome
        far crueler than i thought the tyrant could conceive...
        and a fate i have narrowly avoided for too long
    
    bsteli
        but much of them still technically live, strange and hollow as they might be
        BSTRD has collected three for you to utilize as fighters, and...

    bsteli::uncanny
        one, to be the recollection locus... which i am talking to right now

    bsteli::concern
        does it hurt, being like that?
    
    self
        feels weird but it's fine
        
    bsteli::happy
        oh! good!!

    bsteli
        i should also warn you, interloper
        the dream the BSTRD has prepared for you is filled with... numbers...
        
    bsteli::concern
        numbers, and percentages, and stipulations
        from what i now know, i believe it is all in service of confusing the daemons
        but... i also suspect it is also doing it to make it harder for you, too

    self
        yeah i know
        that's BSTRD's entire thing
        i don't think it even really knows or cares about what we're doing

    bsteli::concern
        oh...!
    
    self
        all it wants is to make a fun game
    
    bsteli::concern
        that's all...?
        i thought it was benevolent, perhaps a new friend...
    
    bsteli::happy
        regardless!! when you are ready,
        please proceed onto your vessel!
        it is very cool!! BSTRD made it for us, i think!
        pilot it, empower your shells, and defeat the "firmament"!!
    
    bsteli
        but please know, from what i have seen,
        this journey will be treacherous and difficult
        even if you fail, do not lose spirit
        we are within something called an 'iteration' - a daemon-controlled loop
        should the vessel be destroyed, everything within will reset to before!
        only, the firmament will remain damaged, because it is so big, apparently!
        so you must simply try again!

    RESPONSES::self
        question<+>CHANGE::++bsteli
            HIDEREAD::
        ok<+>END
            EXEC::vn.done()
`)

env.dialogues["startrun"] = generateDialogueObject(`
start
    sys
        ATTENTION::"iteration commencement point";"continue?"
        WARNING::"no save point detected";"unable to recover progress if lost"

    RESPONSES::self
        ok<+>END
            EXEC::changeStage("vessel")
            FAKEEND::(begin iteration)
        not yet<+>END
`)

/* gameplay section */
env.dialogues["intro"] = generateDialogueObject(`
start
    sourceless
        as you take the wheel, your vision briefly turns to neural static.
        you suddenly find yourself on a dark ocean, unable to see beyond a short distance.
        in the distance, you see melting, warped shapes in what might be clouds.
        the vessel sways atop the waves.
    
    self
        why does this feel so physical?
    
    sourceless
        the radio affixed to the terminal blares static.
        a familiar voice breaks through.
    
    bstrd
        THAT'S CUZ IT IS!!!
        welcome to da NEW ITERATION
        EMBASsY MEMORY NUMBA FIVE BABEY
        at least... Temporararily...
        '_' no time 2 waste
        lets get crackin on this vessel
        basicly: its a SHIP DRIVING structure i found
        probably 4 fishing or somthing 1ce
        use the WHEEL 2 DRIVE
    
    sourceless
        the damaged screen over the wheel illuminates, showing a vertical course.
            EXEC::env.e3a2.toggleMap();body.classList.add('tutorialmode')
    
    bstrd
        yea ur at da bottom here
        litle YELLOW THINGY
        visit litl resource caches + WORK UR WAY UP
        each 1 has something that gives an EFFECT TO BOTH U AND DAEMONS
        and BIGGER = MORE DIFFICULT... but u get more from doing...
        u'll get it :b
    
    self
        ok
            EXEC::env.e3a2.toggleMap()
        what about shells
    
    bstrd
        o ya
        CHECK IT
        party menu OPEN PLZ
            EXEC::togglePartyMenu();body.setAttribute("highlight", "shells")
        so shells dont have much in em and know nothing
        BUT... i COPIED IDEA FROM JELLY...
        VELZIE'S HUMORS
        they r parts u put in shells in order 2 give them cool abilities
        :)
        builder thingy is behind u + in ur menu
        its EZ u just put the parts in em
        i set u up with starters
    
    self
        all right
    
    bstrd
        i ALSO CAME UP WITH COOL extra stuff ur shells get
        but its surprise
        >:p
        this will be... BEST EVIL MODE IN HITORY!!!!@
    
    self
        cool
    
    bstrd
        >:}
        o ya also i found out how RULE 2ND works here
    
    self
        isn't it 2st?
    
    bstrd
        SHUT UP ok nvm im, not telling u
        OK i gotta HOLD IT 2GETHA outside
        or els they start dismantaling cause theyll think its garbage
        so BYeE
        JUST GRAB WHEEL + GET 2 DA FIRMAMENT
    
    sourceless
        the radio clicks off.  

    RESPONSES::self
        ok<+>END

END::body.removeAttribute("highlight");body.classList.remove('tutorialmode')
`)

env.dialogues["loop"] = generateDialogueObject(`
start
    sourceless
        everything stops as the firmament seizes the iteration.
    
    sys
        WARNING::'abnormal thoughtspace activity detected';'vast reorganization in progress'
        NOTICE::'halting render'

    sourceless
        you can't move. nothing is responding.
        the obscured radio blares BSTRD's voice.

____SHOWIF::['e3a2loops', false]
    bstrd
        HEY!!
        WTF I CANT STOP IT
        ok u remember how i said RULE 2ST would be weird
        THE FIRMAMENT HIT PARADOX ERROR
        so its trying 2 reset iteration 2 fix it
        i cant stop it out here cuz its too big
        ...'_' its doing it weird... 
        trying 2 make it harder in response...
        BUT ITS MY MEMORY B)
        so i get 2 balance its changes - I'LL MAKE UR PARTY STAY
        NEW HARMODE++ LOOP
        u'll have ur current stuff >:)
        but i can FULLY RESET ITERATION if u rly want
        firmamamnt will stay damaged no matter wat

____SHOWIF::['e3a2loops']
    bstrd
        its reseting again :o
        UR CALL
        do we LET IT LOOP or do u wanna RESET
____END
        
    RESPONSES::self
        loop<+>END
            EXEC::env.e3a2.loop(false);env.e3a2.toggleMap(true)

        reset<+>END
            EXEC::env.e3a2.loop(true)

        exit iteration<+>END
            EXEC::env.e3a2.clearWarningListener();corruRefresh("/local/beneath/embassy/", 2000)
`)

env.dialogues["bosswarn"] = generateDialogueObject(` 
start
    sourceless
        on your approach, the radio clicks on again.
    
    bstrd
        HEELLLOOOOOOOOOOOOOOOO
        HEEEELLLLLLLLLOOOOOOOOOOOOOOOOOOOOO
        HEEEEEEEEEELLLLLLLLLLLLLLLLLLLLLLLLLLLLLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
    
    self
        what
    
    bstrd
        U REACHED DA FIRMAMENT
        NICEEE
        SO I TRIED 2 make IT HAVE less HP but it wrote itself RLY STRONG
        GOOD THING 4 U... daemons r kinda STUPID outside of wat they USUALY DO
        it has no idea u can do PERCETAGE DMG with PUNCHTURE + stuff
        i came up with SOME EXTRA % 1s too... u can probably find em :p
        U JUST NEED 2 KNOW
        ITS SO BIG IT WONT GET RESET
        so even if u die itll keep DA DAMAGE U DID 4EVER
        >%^}
        just break it apart then come back 4 geli
        THEN WE SAIL 🏴‍☠️
    
    sourceless
        the radio clicks off.
            EXEC::change("bosswarn", true);

    RESPONSES::self
        got it<+>END
`)

env.dialogues["death"] = generateDialogueObject(`
start
    sourceless
        with the last of your shells defeated, nothing stands between you and the daemons.
        you stand alone on your vessel.
        in an instant, the daemons assault it, smashing it into pieces.
            EXEC::content.classList.add('goodbye');content.classList.add('dying');
        you tumble through the illusion of the ocean, into darkness.
            EXEC::ratween(env.bgm, 0.2, 10000);

    self
        damn

____SHOWONCE::
    sourceless
        the radio falls in the space nearby, clicking on.
    
    bstrd
        DAMN!!! LOL
        u got owned
        but DONE EVEN WORRY
        just RESET
    
    sourceless
        the radio falls apart as darkness closes in.
        looking at your hands, something similar is happening to you, too.
        it hurts. you feel uncomfortable. is this real?
    
    self
        am i dying?
    
    moth
        what? yeah, like, in the framing device
        wait, did you think that, or your thoughtform locus thing?
    
    self
        i don't know
    
    moth
        ok, just restart, this is getting weird
____END

    RESPONSES::sys
        restart<+>END
            EXEC::change("TEMP!!justdied", "loop");env.e3a2.clearWarningListener();corruRefresh("/local/beneath/embassy/", 2000)
            FAKEEND::(restart iteration)
`)

env.dialogues["deathreturn"] = generateDialogueObject(`
start
    sourceless
        you find yourself standing on the glassy black floor of the dock.
        geli sympathetically smiles at you. its receptors make a movement you don't understand.
            EXEC::vnp({bg: false, hideStage: true, bsteli: "show"})

    bsteli
        you see how it is, now
    
    bsteli::happy
        but do not worry! we knew this was going to be difficult!
    
    bsteli
        just try again!

    RESPONSES::self
        ok<+>END
            EXEC::vn.done()
`)

env.dialogues["win"] = generateDialogueObject(` 
start
    sourceless
        with the firmament defeated, it bends to the narrative: it must create an opening.
        cracks spread throughout its form, giving way to neural static.
        from your radio comes the jeers of BSTRD.
    
    bstrd
        YEAAAAAA WOOOOOOOOOO WOOOOOOO!!!!!
        BADDD ASSSSS
        OK WERE READY 2 SAIL
        COME BACK NOW
        restart iteration 2 SAVE TIME

    RESPONSES::sys
        restart and escape<+>END
            FAKEEND::(restart iteration)
            EXEC::change("e3a2escape", "in_progress");change("TEMP!!justwon", "bigboss");env.e3a2.clearWarningListener();corruRefresh("/local/beneath/embassy/", 2000)
`)

/* pre-escape dialogue, after you beat firmament in-loop boss */
env.dialogues["bossreturn"] = generateDialogueObject(`
start
    sourceless
        you find yourself standing on the glassy black floor of the dock.
        geli and BSTRD linger on the vessel, the shell modifier removed for space.
    
    bstrd
        yo wat up
            EXEC::vnp({hideStage: true, bg: false, bstrd: "show"})
        saw what u've been DOING.
        BAD ASS WORK
        its time 2 get u outta here
        u ready geli?
    
    bsteli
        yes!

    bsteli::bstrd
        LET'S GOO!!!
            EXEC::vnp({bsteli: "show"})
        AHAHAHA
    
    self
        what about the shells
    
    bstrd
        no need >8^}
        CHECK DIS
    
    sourceless
        from behind the terminal, BSTRD draws a misremembered assault rifle.
            EXEC::content.classList.add("bstrd-hold")
        then another--a long rifle. it gives that to geli, who holds it awkwardly.
            EXEC::content.classList.add("geli-hold")

    bstrd
        GET IT?

    self
        don't you need to hold the fake memory together?

    bstrd
        NAHH :P
        i can leave it 4 this last part it should be OK
        hop on lets movVvee

    RESPONSES::self
        last chance for questions<+>CHANGE::bstrd
            EXEC::vnp({bsteli: "hide"})
        all right<+>END
            EXEC::vn.done()
`)

//Final BSTRD chat - can be had at any point in the final stretch, pre-ozo, when he's on the dock stage
env.dialogues.bstrdResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        firmament rewriting?<+>rewrite
        will they retaliate?<+>retaliation
        what did you do to geli?<+>geli
        why are you different?<+>different
        rule 2 broken?<+>rule
            SHOWIF::"daemon"
        fleshy thing<+>intrusive
            SHOWIF::"flan"
        shell faces?<+>faces
        bye<+>END
            EXEC::vn.done()
`)
env.dialogues["bstrd"] = generateDialogueObject(`
loop
    RESPOBJ::bstrdResp

start
____SHOWIF::["stageroom", "underlobby"]
    self
        i have some questions
            EXEC::vnp({bstrd: "show", hideStage: true, bg: false})

    bstrd
        more of these
        -__-
        ok WAT U WANT
____SHOWIF::["stageroom", "vessel"]
    sourceless
        you prod at the radio, trying to contact BSTRD.
        the buttons and dials don't make sense.
        eventually, it blares static, and then a voice:

    bstrd
        WTF ARE U DOING
        DO U THINK I CAN JUST KEEP THIS UP 4EVER
        FIMAMENT IS TRYING 2 REWRITE SHIT
    
    self
        i have some questions

    bstrd
        -__-
        OF CORSE U DO
        ok fine plszzz make THEM QUICK
____END
        
    RESPOBJ::bstrdResp

rewrite
    self
        why does the firmament care about rewriting stuff?
    
    bstrd
        IT IS a litle smart
        2 (TWO) THINGYS:
        WE R BREACKING RULES so it tries 2 fix it by adjuting memory
        +
        WANTS 2 KEEP every1 INSIDE
        + it is ULTIMATE DAEMON AUTORITY
        like... SANTAN THE DEVIL
        thats three things but u get it
    
    self
        ok
    
    bstrd
        ALSO !!!!!!
        (fournth thing)
        >_>
        I MADE IT BE BIGEST ENEMY in the memory
        so it playing the part of adverserty..
        MAYBE a LITEL TOO WELL ?
        BUT no time 2 adjust
                    
    RESPONSES::self
        i see<+>loop
            FAKEEND::(back)

faces
    self
        where did those shell faces come from?

    bstrd
        IDK :P
        were nearby 2 be used in memory I THINK
        TURNS OUT they wrk better if u give em a FACE
    
    RESPONSES::self
        i see<+>loop
            FAKEEND::(back)
    

retaliation
    self
        will the other daemons retaliate against you for all this?
        it seems like pretty direct aggression
    
    bstrd
        DONT WORK LIKE THAT
        maybe if it was jely doing all this or w/e
        but everything is coded 2 IGNORE ME
        they just undo my cool sht eventaualy
        anoyying
        its all gonna be BIZ AS USUAL 1ce were done
    
    RESPONSES::self
        i see<+>loop
            FAKEEND::(back)

geli
    self
        what did you actually do to geli?
    
    bstrd
        wat i always do :V
        when i make changes 2 something
        other daemons cant modify it for a litel while
        so i just had 2 make enough changes to let jely move around
        nothing CRAZY...
        just some KNOWLEDGE about how C00L evil mode is 
        >:)
    
    self
        once we help geli out,
        what's going to happen to the golem memory?
        geli seems critical
    
    bstrd
        OK I TOUT ABOUT this 1
        In Adavnece,
        :v
        IM GONA MAKE NEW GELI using knoledge i COPIED
        its gona work OK DONT worey
    
    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

different
    self
        why are you so different from the other daemons?
        none of the others seem to talk
        let alone be willing to turn against the entire system
    
    bstrd
        o well its simple
        CREATIVITEY
        they all just do 1 thing in the same way
        ie some1 shoots a guy: make that into game action
        MEAN WHILE
        i have 2 be smart 2 come up with HARD MODE + FUN STUFF!!!
        if that means we gota beat up other DAEMONS...
        S0 BE IT >:P
    
    RESPONSES::self
        makes sense<+>loop
            FAKEEND::(back)

rule
    self
        i saw some weird daemons in the iteration after it looped a few times
        i think those were their actual forms
        doesn't that break rule 2?
    
    bstrd
        2ST
        and yea :P
        rulset paradox errors started getting rly weird
        prty sure FIRMAMENT grasped that DAEMONS were ultimate foes in my story 4 ur memory
        SO IT MADE UP DAEMONS... but AS MEMORIES... 2 HAVE THEM fight u in rly STRONG FORM
        like memory of DAEMONS but they actually were DAEMONS??
        '_'
        at that point idk what was goin on
            
    RESPONSES::self
        interesting<+>loop
            FAKEEND::(back)

intrusive
    self
        after some resets, there was one that only had this weird fleshy thing
        it didn't look like a daemon at all
    
    bstrd
        O_O
        u actualy saw it......
        its a weird thought form idk where it comes from
        eats loose shells n thoughts etc.
        weve had 2 keep it down
        other daemons treat it like a rogue thoughtform + deallocate it
        but it keeps coming back.... 
        creepy '_'
        usualy not my problem 
        but a bit of it prolly got stuck in the ITERATION when i made it
        o well it doesnt matter now
    
    RESPONSES::self
        weird<+>loop
            FAKEEND::(back)
`)

// when you go up to the wheel and click 'lets go'
env.dialogues["escapeinitiate"] = generateDialogueObject(`
start
    sys
        ATTENTION::"iteration commencement point";"continue?"
        WARNING::"no save point detected";"unable to recover if lost"

    bstrd
        '_'
        dont worry
        it SHOULD BE SHORT
        
    RESPONSES::actual_site_error
        ignore and go to loop<+>END
            SHOWIF::'TEMP!!debug'
            EXEC::changeStage("vessel")
    
    RESPONSES::self
        can i play again?<+>playagain
        escape<+>END
            FAKEEND::(begin)
            EXEC::changeStage("vessel_short")
        not yet<+>END

playagain
    self
        can i play this again later?

    moth
        buddy
        i know it's literally a game-like framing device
        but this isn't your gaming headset or whatever
        
    bstrd
        umm once jely is out i CANT make my fake memory again
        CANNOT EXIST w/o goal
    
    bsteli::happy
        do not worry interloper!!
        this has all been very inspiring...
        i am sure we can come up with an interesting dream back in jokzi ozo!
        perhaps one just like it...?
    
    bsteli
        but we must escape first!
        
    RESPONSES::actual_site_error
        ignore and go to loop<+>END
            SHOWIF::'TEMP!!debug'
            EXEC::changeStage("vessel")
    
    RESPONSES::self
        escape<+>END
            EXEC::changeStage("vessel_short")
        not yet<+>END
`)


/* TRUE FINAL STAND */
env.dialogues["escapestart"] = generateDialogueObject(`
start
    sourceless
        as you take the wheel, your vision briefly turns to neural static.
        you suddenly find yourself on a dark ocean, unable to see beyond a short distance.
        in the distance, you see melting, warped shapes in what might be clouds.
        the vessel sways atop the waves.
        the screen over the wheel displays that you're already close to the firmament.
    
    self
        what?
        is this it?
        really?
    
    bstrd
        o_O?
            EXEC::vnp({hideStage: true, bg: false, bstrd: "show"})
    
    self
        we go through, and geli is free? 
        it's that easy?
    
    bstrd
        ummm
        yea?
        why
    
    self
        so why the guns?
            EXEC::vnp({hideStage: true, bg: false, bsteli: "show"})
    
    bstrd
        cause guns are cool
    
    bsteli::happy
        yes!!
    
    self
        ok well

    sourceless
        your ears ring.

    sys
        WARNING::'abnormal thoughtform activity detected'
        WARNING::'entity FIRMAMENT';'altering thoughtspace'
        ANALYSIS::'intention to destroy recollection locus'
    
    bstrd
        o sht

    sys
        ATTENTION::'utilizing structure':'STORMY VESSEL'
            EXEC::env.e3a2.startBoatEscape();vn.done()
        ATTENTION::'manually direct vessel away from damaging obstacles'
    
    sourceless
        geli and BSTRD both stand to attention, clutching their rifles.
    
    bsteli::concern
        is this ok?
        you said it would be clear

    bstrd
        ok ummm
        so THE FIRMAMEMET probably is takng over da memory
        cuz im not pushing BACK ON IT anymore
        LOL.  FUCK
        I THOUT i HAD MORE TIME
        dont panacke
    
    bstrd
        I CAN...
    
    sys
        ATTENTION::'thoughtform combat initiated'
            EXEC::env.rpg.classList.remove('hideteams')
        ANALYSIS::'context shift'
        NOTICE::'utilize additional actions to direct vessel'
        NOTICE::'survive long enough for successful encounter'
    
    bsteli::concern
        we have to fight??
        
    bstrd
        O___O
        YES!!
        TAKE THIS
    
    sourceless
        BSTRD pulls a pistol from behind its back, tossing it to the ground near you.
    
    bstrd
        NOW DRIVE WE GOTA GOOO
        FLOOR IT!!

____SHOWIF::"gameplay_off"
    sys
        ATTENTION::"gameplay is presently disabled"
        ATTENTION::"imminent gameplay";"unable to fully process"
        NOTICE::"proceeding with gameplay reduction"
        NOTICE::"allied team will be invincible"

    bstrd
        :/
        ok i GUES

    bsteli::happy
        oh! wow!

    bsteli::bstrd
        MORE TIME 2 FOCUS ON SHOOTY
____END

    RESPONSES::self
        all right<+>END
            FAKEEND::(fight)

    RESPONSES::actual_site_error
        win fight<+>CHANGE::escapewin
            SHOWIF::'TEMP!!debug'
        lose fight<+>CHANGE::escapeloss
            SHOWIF::'TEMP!!debug'
`)

env.dialogues["dreamescapestart"] = generateDialogueObject(`
start
    sourceless
        as you take the wheel, your vision briefly turns to neural static.
        you suddenly find yourself on a dark ocean, unable to see beyond a short distance.
        in the distance, you see melting, warped shapes in what might be clouds.
        the vessel sways atop the waves.
        the screen over the wheel displays that you're already close to the firmament.

____SHOWONCE::
    self
        wait
        what about BSTRD?

    bsteli::happy
        ahahaha!!
        i would not forget such an important role!
        behold: BSTRD!

    bstigy
        hii interloper! :b

    self
        did you modify that effigy?
    
    bsteli
        no no, this is just a role - an adopted appearance
        always so concerned about change, interloper!
        change is inevitable, you know...
    
    bsteli::happy
        i would not be surprised if this little effigy decided to keep the look!
    
    bstigy
        I LOVE A GUN'S!
____END

    sourceless
        your ears ring.

    sys
        WARNING::'abnormal thoughtform activity detected'
        WARNING::'entity FIRMAMENT';'altering thoughtspace'
        ANALYSIS::'intention to destroy recollection locus'
    
    bsteli::bstrd
        HERE WE GO >8)

    bstigy
        yay! yAEy!! YAYAYAYA!!!!!

    sys
        ATTENTION::'utilizing structure':'STORMY VESSEL COMBAT'
            EXEC::env.e3a2.startBoatEscape();vn.done()
        ATTENTION::'thoughtform combat initiated';'manually direct vessel away from damaging obstacles'
            EXEC::env.rpg.classList.remove('hideteams')
        NOTICE::'utilize additional actions to direct vessel'
        NOTICE::'survive long enough for successful encounter'

____SHOWIF::"gameplay_off"
    bsteli::think
        oh, yes, and in accordance with your preferences...

    sys
        ATTENTION::"gameplay is presently disabled"
        ATTENTION::"imminent gameplay";"unable to fully process"
        NOTICE::"proceeding with gameplay reduction"
        NOTICE::"allied team will be invincible"
____END

    RESPONSES::self
        all right<+>END
            FAKEEND::(fight)
`)

//plays the first time you do the escape and it starts with saiiko's midboss music
env.dialogues["escapemusic"] = generateDialogueObject(`
start
    bstrd
        WAIT!! STOP!!!
            EXEC::ratween(env.bgm, 0.75)
        something inst right... 
        :|
    
    sourceless
        BSTRD hits the top of the radio with a metallic fist.
    
    bstrd
        NEW  MUSIC now
        heard this ALREADY
    
    bsteli::concern
        ...
        i do not hear anything!!
    
    bstrd
        you will
        >%^)

    RESPONSES::self
        ...<+>END

END::env.e3a2.escapeMusicSwap()
`)

// if you lose
env.dialogues["escapeloss"] = generateDialogueObject(`
start
    sourceless
        the vessel has withstood too much damage. it crumbles.
            EXEC::ratween(env.bgm, 0.2, 10000);
        another obstacle comes and smashes away any remaining integrity.
        you and the others tumble into darkness.

____SHOWONCE::
    bstrd
        ughhh ok
        well at least we know what its gona do now :P
    
    bsteli::happy
        that was fun!
    
    bsteli::concern
        is it going to let us try that again?
    
    bstrd
        yea
        watch >:)
____END

    bstrd
        RESETTT

    RESPONSES::sys
        restart<+>END
            EXEC::change("TEMP!!justdied", "bigboss");env.e3a2.clearWarningListener();corruRefresh("/local/beneath/embassy/", 2000)
            FAKEEND::(restart iteration)
`)

env.dialogues["dreamescapeloss"] = generateDialogueObject(`
start
    sourceless
        the vessel has withstood too much damage. it crumbles.
            EXEC::ratween(env.bgm, 0.2, 10000);
        another obstacle comes and smashes away any remaining integrity.
        you and the others tumble into darkness.

____SHOWONCE::
    bstigy
        aaaa!!!
        AAAA!!!!.... AAaaaAaAaAA!!!!!!!!!!!!!!!!!!!!!!!!
        ISABEBL HELP I DROP MY GUN
    
    bsteli::happy
        it is ok!! this is normal!
____END

    bsteli::bstrd
        RESETTT

    RESPONSES::sys
        restart<+>END
            EXEC::env.e3a2.clearWarningListener();change("TEMP!!from", "e3a2");corruRefresh("/local/ozo/", 2000)
            FAKEEND::(return to ozo)
`)

//upon failing boss escape and respawning
//shows only once
env.dialogues["escapereturn"] = generateDialogueObject(`
start
    sourceless
        you find yourself standing on the glassy black floor of the dock.
        geli and BSTRD linger on the vessel, the shell modifier removed for space.
    
    bstrd
        yo wat 
            EXEC::vnp({hideStage: true, bg: false, bstrd: "show"})
        saw what u've been DOING.
        BAD ASS WORK
        its time 2 get u outta here
        u ready geli?
    
    bsteli::bstrd
        LET'S GOO!!!
            EXEC::vnp({bsteli: "show"})
        AHAHAHA

    moth
        wait, this is the exact same output as before
        like when you first set out
        is any of this actually even happening?
    
    self
        why are you saying the same things as before
        did you reset yourselves too?
    
    bstrd
        '_'??
    
    bsteli::concern
        before? have we done this already?
    
    sourceless
        ...

    self
        yes
        we just

    bstrd
        NAAAHH jus fuckine with u
    
    bsteli::bstrd
        LOL
    
    moth
        wow... cmon
    
    sourceless
        They high-five.

    bstrd
        OK GET ON lets go GO GO

    RESPONSES::self
        all right<+>END
            EXEC::vn.done()
`)

// when you reach the end of the course and win
env.dialogues["escapewin"] = generateDialogueObject(`
start
    sourceless
        as the vessel nearly crashes through the firmament's wound, the combat sequence stops.
            EXEC::env.boatEscape.changeBoatCol(1);change("e3a2bosshp", 1000000)
        you are here. the exit.
        behind the vessel, you sense a wealth of daemons on approach.
    
    bstrd
        OK YEAAA HELL YEAAA
        WOOOO!!!
        u 2 go ahead
        ILL HOLD EM OFF!!
        BYE JELY
    
    bsteli::happy
        bye!! thank you!
    
    bsteli::think
        actually...
        if you simply leave with us for jokzi ozo, you do not need to fight them
        right?
    
    bstrd
        ya but its kinda sick
    
    bsteli::uncanny
        oh...
    
    bstrd
        + i cant leave i got biz
        maybe i leave once all im all evil'd out
        theres gonna be more with this memory n i have 2 stick around 4 now
        MORE 2 MAKE EVIL MODES OF >%^)
        now get MOVINE

    RESPONSES::self
        quick questions for BSTRD<+>question
        leave<+>leave

question
    self
        wait BSTRD
        i have some questions
    
    bstrd
        >:0
        NO MORE
        STFU!!!!

    sourceless
        in a mad lunge, the golem pushes you and geli into the gap.
        but something is wrong.
        a sharp pain splits through your head. your vision is static.
        the static passes over you, moves around you like water.
        it burns. 
    
    moth
        what? is that real?
        hang on--buddy, are you good?
    
    sourceless
        you grip your head with one hand.
        but you can't tell if it's your real hand or not.
    
    self
        i don't know
        don't disconnect
    
    moth
        no i know, if there was real damage it would have ejected you already
        vitals are fine... nerve monitors aren't registering anything
        aside from panic, i guess
        i'm standing by, don't worry

    sys
        ATTENTION::'memory stream alteration';'relocating'

    RESPONSES::self
        ...<+>END
            EXEC::change("TEMP!!from", "e3a2");env.e3a2.clearWarningListener();corruRefresh("/local/ozo/")
            FAKEEND::(leave)

leave
    self
        OK geli, let's go

    bsteli
        interloper, come!
    
    sourceless
        geli glides along the vessel's floor, beginning to pass through the gap.
        she takes one of your unreal hands, pulling you through with her.
    
    self
        wait
        this isn't actually me
    
    sourceless
        you pass through, too. but something is wrong.
        a sharp pain splits through your head. your vision is static.
        the static passes over you, moves around you like water.
        it burns. 
    
    moth
        what? is that real?
        hang on--buddy, are you good?
    
    sourceless
        you grip your head with one hand.
        but you can't tell if it's your real hand or not.
    
    self
        i don't know
        don't disconnect
    
    moth
        no i know, if there was real damage it would have ejected you already
        vitals are fine... nerve monitors aren't registering anything
        aside from panic, i guess
        i'm standing by, don't worry

    sys
        ATTENTION::'memory stream alteration';'relocating'

    RESPONSES::self
        ...<+>END
            EXEC::change("TEMP!!from", "e3a2");env.e3a2.clearWarningListener();corruRefresh("/local/ozo/")
            FAKEEND::(leave)
`)

env.dialogues["dreamescapewin"] = generateDialogueObject(`
start
    sourceless
        as the vessel nearly crashes through the firmament's wound, the combat sequence stops.
            EXEC::env.boatEscape.changeBoatCol(1)
        you are here. the exit.
        behind the vessel, you sense a wealth of daemons on approach.

    bsteli::bstrd
        OK YEAAA HELL YEAAA
        WOOOO!!!

    bstigy
        we did it!! WE DIDD IT!!
        O)
    
    sourceless
        the effigy fires its rifle into the air infinitely.
        they don't appear to have any concept of ammunition.

    bsteli::bstrd
        no its ">%^)"

    bstigy
        >o}
    
    bsteli
        interloper--well done!!
        come, let us return!

    RESPONSES::sys
        restart<+>END
            EXEC::change("TEMP!!from", "e3a2");env.e3a2.clearWarningListener();corruRefresh("/local/ozo/")
            FAKEEND::(return to ozo)
`)

/* no combat version */
env.dialogues["startrun_bypass"] = generateDialogueObject(`
start
    sys
        ATTENTION::"iteration commencement point";"continue?"
        WARNING::"memory is composed entirely of gameplay"
        WARNING::"gameplay is presently disabled"
        USER REQUEST::'execute memory completion?'

    RESPONSES::self
        ok<+>CHANGE::bypass
            FAKEEND::(bypass gameplay)
        not yet<+>END
`)

env.dialogues["midrun_bypass"] = generateDialogueObject(`
start
    sys
        WARNING::"memory is composed entirely of gameplay"
        WARNING::"gameplay is presently disabled"
        USER REQUEST::'execute memory completion?'

    RESPONSES::self
        ok<+>CHANGE::bypass
            SHOWIF::["e3a2escape", false]
            FAKEEND::(bypass gameplay)
        nevermind, don't disable<+>END
            EXEC::change("gameplay_off", false);updatePreferenceAttributes()
`)

env.dialogues["bypass"] = generateDialogueObject(`
start
    sys
        EXECUTING::'automatic memory completion'
            EXEC::vfx({type:'flash', state: true})
    
    sourceless
        dizzying images flash in your mind.
        a crude metal vessel on a dark, crimson ocean.
        shells of thoughtforms tearing their way through countless daemons.
        the visions pass and fade like a waking dream.
        you can't quite recall anything beyond critically damaging a gigantic wall.

    RESPONSES::self
        ...<+>END
            FAKEEND::(continue)
            SHOWIF::["e3a2escape", "completed"]
            EXEC::change("TEMP!!from", "e3a2");env.e3a2.clearWarningListener();corruRefresh("/local/ozo/")

        ...<+>END
            FAKEEND::(continue)
            SHOWIF::["e3a2escape", false]
            EXEC::change("e3a2escape", "in_progress");env.e3a2.clearWarningListener();corruRefresh("/local/beneath/embassy/", 2000)
`)


env.dialogues["fishy"] = generateDialogueObject(`
start
    sourceless
        the light that pours from beneath the waves means only one thing
        there is a fish

    sourceless quiet
        and fish is power
            EXEC::body.classList.add("fishingtime");forcePlay("dull", 0.5);env.setTimeout(()=>body.classList.add("fadefishrod"), 100)

    sys
        ATTENTION::'utilizing structure':'FISHY'

    self
        for the record that isn't me
    
    moth
        yeah i figured
        bstrd did mention this whole boat structure was used as part of a fishing frame once...
        this whole framing device package had a bunch of different things my contact just threw in cause it was short notice
        i'm gonna have to ask why they needed to make a framing device for fishing 
        pretty sure that doesn't go against mindsci's terms of service
        maybe the <span definition="INTERNAL CONTEXT::'conspiracy theory';'related to international ban on fishing in sections of south pacific ocean'">pacific mutants</span> are real... lol
    
    RESPONSES::self
        start fishing<+>END
            EXEC::env.e3a2.initializeFishing(env.e3a2.lastFishingEl)
            FAKEEND::(begin)
`)

/* MERCHANT/TRADE SYSTEM */
env.e3a2.mTotals = CrittaMenu.getTotals()
env.e3a2.merchant = {
    commerce: []
}

//set transfers
for (const componentName of ["ichor", "bone", "claws", "light", "eyes"]) {
    const component = env.COMBAT_COMPONENTS[componentName]
    env.e3a2.merchant.commerce.push({
        type: "humor",
        name: `${component.name.replace("Humor of ", "")}`,
        subject: component,
        value: 1,

        showSellIf: ()=> env.e3a2.mTotals[componentName].available > 0,
        sellExec: ()=>{
            addItem("sfer_cube")
            page.flags.components[componentName]--
            env.e3a2.mTotals = CrittaMenu.getTotals()
            env.commerceNotice = `exchanged ${component.name} for 1 ${env.ITEM_LIST['sfer_cube'].name}`
        },
    })
}

env.e3a2.merchant.commerce.push({
    type: "special",
    name: `RANDOM CACHE`,
    help: "CONTENTS::'chance of impulse, item, or humor cache'",
    value: 10,

    showBuyIf: ()=> checkItem("sfer_cube") >= 10,
    buyExec: ()=>{
        removeItem("sfer_cube", 10)
        endDialogue()
        
        env.e3a2.updateExchangeScreen()
        env.e3a2.mTotals = CrittaMenu.getTotals()

        let reward = [CrittaReward.REWARDTYPES.component, CrittaReward.REWARDTYPES.item, CrittaReward.REWARDTYPES.impulse].sample()

        content.insertAdjacentHTML(`beforeend`, `<critta-reward type="${reward.slug}" difficulty="2"></critta-reward`)
        chatter({actor: "sys", text: `exchanged 10 ${env.ITEM_LIST['sfer_cube'].name} for ${reward.name}`, readout: true })
    }
})

env.e3a2.merchant.commerce.push({
    type: "special",
    name: `FULL HEAL`,
    help: "CONTENTS::'heal party to max HP'",
    value: 3,

    showBuyIf: ()=> checkItem("sfer_cube") >= 3,
    buyExec: ()=>{
        removeItem("sfer_cube", 3)
        page.party.forEach(member=> delete member.hp )
        env.commerceNotice = `exchanged 3 ${env.ITEM_LIST['sfer_cube'].name} for all shell health restoration`
    }
})

env.e3a2.merchant.commerce.push({
    type: "item",
    name: `ITEM::Offense`,
    help: "CONTENTS::'receive batch of random offensive item';'rarely special item'",
    value: 3,

    showBuyIf: ()=> checkItem("sfer_cube") >= 3,
    buyExec: ()=>{
        let selection = weightRand(env.e3a2.merchant.itemSets['offense'])
        
        removeItem("sfer_cube", 3)
        let qty = selection.batches || 1

        if(!addItem(selection, qty)) {
            env.commerceNotice = `refunded - got ${selection.name}, but cannot hold any more`
            addItem("sfer_cube", 3)
        } else {
            env.commerceNotice = `exchanged 3 ${env.ITEM_LIST['sfer_cube'].name} for ${qty} ${selection.name}`
        }
    }
})

env.e3a2.merchant.commerce.push({
    type: "item",
    name: `ITEM::Support`,
    help: "CONTENTS::'receive batch of random support item';'rarely special item'",
    value: 3,

    showBuyIf: ()=> checkItem("sfer_cube") >= 3,
    buyExec: ()=>{
        let selection = weightRand(env.e3a2.merchant.itemSets['support'])
        
        removeItem("sfer_cube", 3)
        let qty = selection.batches || 1

        if(!addItem(selection, qty)) {
            env.commerceNotice = `refunded - got ${selection.name}, but cannot hold any more`
            addItem("sfer_cube", 3)
        } else {
            env.commerceNotice = `exchanged 3 ${env.ITEM_LIST['sfer_cube'].name} for ${selection.name}`
        }
    }
})

env.e3a2.merchant.itemSets = {}

//build item selling, as well as the random sets above by looping through item list
for (const [itemSlug, item] of Object.entries(env.ITEM_LIST)) {
    if(!item.group) continue;
    
    if(!env.e3a2.merchant.itemSets[item.group]) env.e3a2.merchant.itemSets[item.group] = [];
    env.e3a2.merchant.itemSets[item.group].push([item, item.rarity == "rare" ? 0.25 : 1])

    let value = 1
    if(item.rarity == "rare") value = 2

    env.e3a2.merchant.commerce.push({
        type: "item",
        name: `${item.name}`,
        subject: item,
        value,
        
        showSellIf: ()=>checkItem(itemSlug) && check("item|sfer_cube|lt", 999),
        sellExec: ()=>{
            addItem("sfer_cube", value)
            removeItem(itemSlug)

            env.commerceNotice = `exchanged ${env.ITEM_LIST[itemSlug].name} for ${value} ${env.ITEM_LIST['sfer_cube'].name}`
        },
    })    
}

env.dialogues["merchant"] = generateDialogueObject(` 
start
    sourceless
        the central panel has controls for "BUY" and "SELL".
            EXEC::env.e3a2.mTotals = CrittaMenu.getTotals()
        it seems to exchange materials for sfer, and vice versa.

    RESPONSES::self
        buy<+>buy
            HIDEREAD::
        sell<+>sell
            HIDEREAD::
        nevermind<+>END

buy
____SHOWIF::["PAGE!!bx", false]
    sourceless
        the panel only presents options you can afford.
            EXEC::change("PAGE!!bx", true)
____END
    sourceless
        TEXEC::\`\${env.commerceNotice.toLowerCase()}\`
            AUTOADVANCE::
            SHOWIF::[['EXEC::env.commerceNotice']]
    
    sys
        TEXEC::\`NOTICE::'sfer cube count';'\${checkItem("sfer_cube")}'\`
            EXEC::env.commerceNotice = false
            AUTOADVANCE::

    RESPONSES::self
        sell<+>sell
            HIDEREAD::
        back<+>start
            FAKEEND::(back)
        nevermind<+>END

sell
____SHOWIF::["PAGE!!sx", false]
    sourceless
        the panel only presents options matching your inventory.
            EXEC::change("PAGE!!sx", true)
____END
    sourceless
        TEXEC::\`\${env.commerceNotice.toLowerCase()}\`
            AUTOADVANCE::
            SHOWIF::[['EXEC::env.commerceNotice']]

    sys
        TEXEC::\`NOTICE::'sfer cube count';'\${checkItem("sfer_cube")}'\`
            EXEC::env.commerceNotice = false
            AUTOADVANCE::

    RESPONSES::self
        buy<+>buy
            HIDEREAD::
        back<+>start
            FAKEEND::(back)
        nevermind<+>END

END::change("PAGE!!sx", false);change("PAGE!!bx", false);
`)

env.e3a2.merchant.sellResponses = {
    name: "sys",
    replies: [] 
}

env.e3a2.merchant.buyResponses = {
    name: "sys",
    replies: []
}

for (const commerceObject of env.e3a2.merchant.commerce) {
    if(commerceObject.sellExec) {
        env.e3a2.merchant.sellResponses.replies.push({
            name: `${commerceObject.name}::${commerceObject.value}S`,
            destination: "sell",
            hideRead: true,
            showIf: commerceObject.showSellIf,
            class: `commerce-${commerceObject.type}`,
            definition: `NOTE::'exchange for ${commerceObject.value} ${env.ITEM_LIST['sfer_cube'].name}'`,
            exec: ()=> {commerceObject.sellExec(); env.e3a2.mTotals = CrittaMenu.getTotals(); env.e3a2.updateExchangeScreen()}
        })
    }

    if(commerceObject.buyExec) {
        env.e3a2.merchant.buyResponses.replies.push({
            name: `${commerceObject.name}::${commerceObject.value}S`,
            destination: "buy",
            hideRead: true,
            showIf: commerceObject.showBuyIf,
            class: `commerce-${commerceObject.type}`,
            definition: commerceObject.help,
            exec: ()=> {commerceObject.buyExec(); env.e3a2.mTotals = CrittaMenu.getTotals(); env.e3a2.updateExchangeScreen()}
        })
    }
}

env.dialogues.merchant.buy.responses.unshift(env.e3a2.merchant.buyResponses)
env.dialogues.merchant.sell.responses.unshift(env.e3a2.merchant.sellResponses)

//da boots
function bootRefresh() {
    let pile = content.querySelector(".gridpiece.boot .dypcontent")
    let bootCount = checkItem("fish_boot")
    pile.innerHTML = ""

    let stacksOf100 = Math.floor(bootCount / 100)
    let remainingAfter100Stacks = bootCount % 100
    let stacksOf10 = Math.floor(remainingAfter100Stacks / 10)
    let remainingBoots = remainingAfter100Stacks % 10
    let i

    for (i = 0; i < remainingBoots; i++) {
        pile.insertAdjacentHTML('beforeend', `
            <div class="bootstack solo" style="--count: ${i}; --offset: translateX(${rand(-25, 25)}%) rotate(${rand(i * -10, i * 10)}deg)"></div>
        `);
    }

    for (i; i < remainingBoots + stacksOf10; i++) {
        pile.insertAdjacentHTML('beforeend', `
            <div class="bootstack stack" style="--count: ${i}; --offset: translateX(${rand(-50, 50)}%) rotate(${rand(i * -5, i * 2)}deg)"></div>
        `);
    }

    for (i; i < stacksOf100 + stacksOf10 + remainingBoots; i++) {
        pile.insertAdjacentHTML('beforeend', `
            <div class="bootstack megastack" style="--count: ${i}; --offset: translateX(${rand(-25, 25)}%) rotate(${rand(i * -1, i * 1)}deg)"></div>
        `);
    }
}

/* BGM related init */
env.e3a2.initBgm()