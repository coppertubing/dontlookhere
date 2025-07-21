env.embassy.music_suspense = new Howl({
    onload: function () {page.howls.push(this)},
    src: ['/audio/the message.ogg'],
    preload: true,
    loop: true,
    volume: 0,
    sprite: {
        __default: [0, 106000, true]
    }
})

env.embassy.music_bstrd = new Howl({
    onload: function () {page.howls.push(this)},
    src: ['/audio/bstrd.ogg'],
    preload: true,
    loop: true,
    volume: 0,
    sprite: {
        __default: [0, 72000, true]
    }
})

env.embassy.startTutorialGolem = ()=>{
    if(check('PAGE!!skiptut')) {
        changeBgm(env.embassy.music_combat, {rate: 0.5, seek: 100})
        setTimeout(()=>{
            env.oldBgm = env.embassy.music_unsafe
            env.oldBgm.saveRate = 0.75
        }, 2000)
    } else {
        cutscene(true)
        setTimeout(()=>env.rpg.classList.add('hideteams'), 100)
        setTimeout(()=>{
            startDialogue('d3_tutorial_start')
            cutscene(false)
        }, 2000)
    }
    
    startCombat(env.COMBAT_FORMATIONS['tutorial_golem'].enemies, page.party, {
        combatClass: "tutorialgolem",
        turnCallback: (actor)=>{
            if(!check('PAGE!!skiptut')) {
                console.log('got callback', actor)
                switch(actor.slug) {
                    case "akizet":
                        if(check('PAGE!!akitut')) {
                            startDialogue('d3_tutorial_akizet')
                            change('PAGE!!akitut', false)
                        }
                    break

                    case "gakvu":
                        if(!check("PAGE!!gaktut")) {
                            startDialogue('d3_tutorial_gakvu')
                            change('PAGE!!akitut', true)
                        }
                    break

                    case "tozik":
                        if(!check("PAGE!!toztut")) startDialogue('d3_tutorial_tozik')
                    break
                }
            }
        },
        endCallback: (loser)=>{
            if(loser.name != "ally") startDialogue('d3_tutorial_end'); else env.combat.lossState()
        }
    });
},

env.embassy.startKazkiRoomAmbush = ()=>{
    env.combat.lastEngaged = "recreation_containers_2"
    startCombat(env.COMBAT_FORMATIONS['recreation_containers_2'].enemies, page.party, {
        bgm: env.embassy.music_combat, 
        bgmRate: 1,
        endCallback: (loser)=> {
            if(loser.name != "ally") startDialogue('d3r2_postcombat'); else env.combat.lossState()
        }
    });
},

env.embassy.startArchivalAmbush = ()=>{
    env.combat.lastEngaged = "archivecontainers"
    startCombat(env.COMBAT_FORMATIONS['archivecontainers'].enemies, page.party, {
        bgm: env.embassy.music_bstrdcombat, 
        bgmRate: 0.8,
        combatClass: 'bastard',
        startCallback: ()=>{env.rpg.combineTurns = "enemy"},
        endCallback: (loser)=> {
            if(loser.name != "ally") startDialogue('d3_archivedeliveryclear'); else env.combat.lossState()
        }
    })
    change("TEMP!!kavrukacount", checkItem(env.ITEM_LIST.kavruka))
    env.ADVANCE_RATE = 500
},

env.embassy.checkUsedKavrukas = (didUse = true)=>{
    let used = false
    if(check("TEMP!!kavrukacount") != checkItem(env.ITEM_LIST.kavruka)) used = true

    if(didUse) return used
    return !used
},

env.embassy.startArchivalMiniboss = ()=>{
    env.combat.lastEngaged = "archiveshelfminiboss"
    startCombat(env.COMBAT_FORMATIONS['archiveshelfminiboss'].enemies, page.party, {
        bgm: env.embassy.music_bstrdcombat, 
        bgmRate: 0.9,
        combatClass: "bastard bstrdshelf",
        endCallback: (loser)=> {
            if(loser.name != "ally") startDialogue('d3_archiveminiclear'); else env.combat.lossState()
        }
    })
    env.ADVANCE_RATE = 1500
},

env.embassy.startArchivalBoss = (lowIntensity = false)=>{
    env.combat.lastEngaged = "bstrdboss"
    let formation = env.COMBAT_FORMATIONS['bstrdboss']
    if(lowIntensity) formation = env.COMBAT_FORMATIONS['bstrdboss_lowintensity']

    startCombat(formation.enemies, page.party, {
        bgm: env.embassy.music_bstrdcombat, 
        bgmRate: 1,
        combatClass: "bastard",
        startCallback: ()=>{ //set up the lil dancin guys
            env.rpg.insertAdjacentHTML('beforeend', '<div id="bstrdancers"></div>')
            let dancers = document.querySelector('#bstrdancers')
            env.rpg.bstrdancerDetect = env.setInterval(()=>{
                if(env.bgm.seek() > 52 && env.bgm.seek() < 84) {
                    dancers.classList.add('dance')
                    if(env.bgm.seek() > 68) dancers.classList.add('double')
                } else {
                    dancers.classList.remove('dance')
                    setTimeout(()=>dancers.classList.remove('double'), 1000)
                }
            }, 1000)
        },
        endCallback: (loser)=> {
            if(loser.name != "ally") startDialogue('d3_archivebossend'); else env.combat.lossState()
            clearInterval(env.rpg.bstrdancerDetect)
        }
    })
    env.ADVANCE_RATE = 1500
},

env.embassy.startMovefriendBoss = (intensity = "regular")=>{ 
    cutscene(true)
    let miltzaParty = [... page.party]
    miltzaParty[1] = {
        slug: "miltza",
        name: "Miltza",
        combatActor: "miltza",
        class: "Cynical Artist",
        hp: 10
    }
    
    var bossVersion = env.COMBAT_FORMATIONS.movefriend.enemies
    if(intensity == "low") bossVersion = env.COMBAT_FORMATIONS.movefriend_lowintensity.enemies

    startCombat(bossVersion, miltzaParty, {
        bgm: env.embassy.music_p1boss, 
        bgmRate: 0.75,
        bgmStart: 0.1,
        endCallback: (loser) => {
            if(loser.name == "ally") env.combat.lossState()
            else if(intensity == "low") env.embassy.endMovefriendBoss()
        }
    });
    env.rpg.classList.add('hideteams')
    
    setTimeout(()=>{
        startDialogue('d3_movecmb')
        cutscene(false)
    }, 2000)
},

env.embassy.endMovefriendBoss = () =>{
    cutscene(true)
    setTimeout(()=>{
        cutscene(false); 
        startDialogue("d3_movefriend_finish")
        env.setTimeout(()=>changeBgm(env.embassy.music_safe), 1000)
    }, 1000)
},

//shortcut for adding sfer to inventory
env.embassy.advanceSfer = (amt = 1, reason) => {
    env.embassy.conditionalItem('sfer_cube', amt, reason)
    readoutAdd({message: `NOTE::'received ${amt} SFER CUBE'`, name:"sys", show: true, forceMini: true})
},

//validation if enough sfer to conclude personnel collapse area
env.embassy.enoughSfer = (checkingForEnough = true) => {
    if(checkingForEnough && checkItem(env.ITEM_LIST['sfer_cube']) >= 9) return true
    if(!checkingForEnough && !(checkItem(env.ITEM_LIST['sfer_cube']) >= 9)) return true
    console.log(checkingForEnough, checkItem(env.ITEM_LIST['sfer_cube']));
    return false
}

//complex skips for relevant dialogues
env.embassy.skips = {
    d3_start: ()=>{
        content.classList.remove('innerfocus', 'showfocus', 'fade-stage', 'painprep', 'painmode')
        content.classList.add('collapse')
        vn.done()
        vn.renderParty()
        specialCam(false)
        changeBgm(env.embassy.music_collapse, {length: 1})
        
        switch(check("gameplay_off")) {
            case false:
                setTimeout(() => {
                    change('PAGE!!skiptut', true)
                    env.embassy.startTutorialGolem()        
                }, 50)
            break

            case true:
                setTimeout(() => {
                    startDialogue("d3_tutorial_end")                    
                }, 600)
            break
            
        }
    },

    d3_relocator_repair: ()=>{
        document.querySelector('#realgrid .lifter').classList.remove('fixed')
        document.querySelector('#realgrid .lifter').classList.add('aggressormode')
        content.classList.remove('painprep', 'painhalf', 'painmode')
        specialCam(false)
        vn.done()

        switch(check("gameplay_off")) {
            case true:
                setTimeout(()=>startDialogue("d3_movefriend_finish"), 550)
            break

            case false: 
                if(check("low_intensity")) env.embassy.startMovefriendBoss('low')
                else env.embassy.startMovefriendBoss()
        }
    },

    d3_movefriend_finish: ()=>{
        specialCam(false)
        changeBgm(page.bgm, {rate: 0.5, length:100})
        document.querySelector('#realgrid .lifter').classList.remove('aggressormode')
        document.querySelector('#realgrid .lifter').classList.add('fixed')
        env.embassy.fixMovefriend()
        change('PAGE!!movefixed', true)
        vn.done()
    }
}

/* rec */
createEntity({
    name: 'damaged qou body',
    type: "thoughtform collapse",
    image: "/img/sprites/obesk/qoubody.gif",
    alternateOf: 'qou body',
    hide: true,
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    ::NOTE::'imagery associated with mutilation';'rendering partially suspended'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'internal components laid bare, their corrucystic shell sloughing away. a reminder of what was coming for us'</span>`,
    actions: [
        {
            name: "free their mind",
            exec: ()=>{
                if(isStageClear()) {
                    startDialogue('d3_rec_body1');
                    change("PAGE!!mindcore1extracted", true)
                    if(check("PAGE!!mindcore1extracted") && check("PAGE!!mindcore2extracted")) change("PAGE!!recreation_leavable", true)
                    
                } else chatter({actor: 'sourceless', text: 'IT IS TOO DANGEROUS, WE MUST DESTROY THESE FOES', readout: true})
            },
            showIf: ['PAGE!!mindcore1extracted', false]
        }
    ]
})

createEntity({
    name: 'mangled qou body',
    type: "thoughtform collapse",
    image: "/img/sprites/obesk/qoubody.gif",
    alternateOf: 'qou body',
    hide: true,
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    ::NOTE::'imagery associated with mutilation';'rendering partially suspended'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'an unknowing victim, a shattered simulacrum lies near their corpse'</span>`,
    actions: [
        {
            name: "free their mind",
            exec: ()=>{
                if(isStageClear()) {
                    startDialogue('d3_rec_body2');
                    change("PAGE!!mindcore2extracted", true)
                    if(check("PAGE!!mindcore1extracted") && check("PAGE!!mindcore2extracted")) change("PAGE!!recreation_leavable", true)
                    
                } else chatter({actor: 'sourceless', text: 'IT IS TOO DANGEROUS, WE MUST DESTROY THESE FOES', readout: true})
            },
            showIf: ['PAGE!!mindcore2extracted', false]
        }
    ]
})

/* cpersonnel */
createEntity({
    name: 'simulacra',
    type: "thoughtform collapse portrait-cover",
    image: "/img/local/embassy/drinkypile.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'a variety of flavors, some with psychoactive effects';'includes veilks-blood, zzoust, orange juice, a black fungal flavor from kozazni'</span>`,
    actions: [
        {
            name: "sip-u-lacrum",
            exec: () => { chatter({actor: 'akizet', text: 'this is no time for refreshments', readout: true}); change('PAGE!!kazkisip', true) },
            showIf: ['PAGE!!kazkisip', false]
        }
    ]
})

createEntity({
    name: 'storage display',
    type: "thoughtform collapse",
    image: "/img/local/embassy/shelf.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery';'game component'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'decorative kozazni fungal display';'ground component liquefies cover outwards when accessed'</span>`,
    actions: [
        {
            name: "search",
            exec: ()=>{
                startDialogue('d3r2_chest')
            },
            showIf: ["PAGE!!kazkichest", false]
        }
    ]
})

createEntity({
    name: 'bright weapons',
    type: "thoughtform collapse",
    image: "/img/local/embassy/gunrack.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'unique scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'a display of innumerable bright death-weapons, from the cousins themselves';'perhaps the strangest fascination'</span>`,
    actions: [
        {
            name: "search",
            exec: ()=>{
                startDialogue('d3r2_guns')
            },
            showIf: ["PAGE!!checkedguns", false]
        }
    ]
})

createEntity({
    name: 'manipulation slab',
    type: "thoughtform collapse",
    image: "/img/local/embassy/gunops.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'unique scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'a workspace for modifying sensitive material without ever touching it yourself'</span>`,
    actions: [
        {
            name: "search",
            exec: ()=>{
                startDialogue('d3r2_guns')
            },
            showIf: ["PAGE!!checkedguns", false]
        }
    ]
})

createEntity({
    name: 'conspicuous container',
    alternateOf: "container",
    hide: true,
    type: "thoughtform collapse",
    image: "/img/local/orbit/dullvessel/container.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'these ones occasionally shake, as if they had a larval fever'</span>`,
    actions: [
        {
            name: "search",
            exec: ()=>{
                startDialogue('d3r2_containers')
            },
            showIf: ["PAGE!!kazkiambush", false]
        }
    ]
})

createEntity({
    name: 'unkind eye',
    type: "thoughtform collapse",
    image: "/img/local/embassy/wallm2.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'unique scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'a strangely unflattering depiction of velzie's eye';'bad luck weighs upon me merely by being in the same room'</span>`,
    actions: [
        {
            name: "comment",
            exec: () => {
                change('PAGE!!eyeexamined', true)

                MUI('prohibit')
                chatter({actor: 'akizet', text: 'this is a disturbing mural...'})
                env.setTimeout(()=>chatter({actor: 'gakvu', text: 'you think so?'}), 3000)
                env.setTimeout(()=>chatter({actor: 'gakvu', text: 'i think it is kind of funny'}), 6000)
                env.setTimeout(()=>chatter({actor: 'akizet', text: 'funny???'}), 9000)
                env.setTimeout(()=>chatter({actor: 'tozik', text: 'i think so too, actually'}), 12000)
                env.setTimeout(()=>chatter({actor: 'tozik', text: 'it is a comically spiteful depiction...'}), 15000)
                env.setTimeout(()=>chatter({actor: 'tozik', text: 'this would be quite popular in coastal ekiva'}), 18000)
                env.setTimeout(()=>chatter({actor: 'sourceless', text: 'THEY WOULD SLUDGE THIS IN VAZNI'}), 23000)
                env.setTimeout(()=>{chatter({actor: 'sourceless', text: 'TRULY A SATIRE ONLY AN EKIVIK COULD CONCOCT'}); MUI('deprohibit')}, 27000)
            },
            showIf: ['PAGE!!eyeexamined', false]
        }
    ]
})

createEntity({
    name: 'sculptor',
    type: "thoughtform collapse portrait-contain",
    image: "/img/local/embassy/display.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'a high-end thought-printing device';'a connector lies near its base'</span>`,
})

createEntity({
    name: 'veilk models',
    type: "thoughtform collapse portait-centerlow",
    image: "/img/local/embassy/veilkmodel.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'unadorned models of vaznian veilk in various states of completion';'their tendrils are free of parasites in what i assume to be symbolic of purity'</span>`,
})

/* ENEMY ENTITIES */
createEntity({
    name: 'damaged golem',
    type: "thoughtform foe collapse",
    image: "/img/sprites/combat/foes/golem-portrait.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'a utility golem borrowed from the maintenance ${processDefinitionsInString("Î¸segment")} below';'controlled by groundsmind?';'made incoherent by the noise?'</span>`,
})

createEntity({
    name: 'tendrils',
    type: "thoughtform foe collapse",
    image: "/img/sprites/combat/foes/tendrils.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'originating from the floors and walls';'the hateful will of the aggressing groundsmind made manifest'</span>`,
})

createEntity({
    name: 'movefoe',
    type: "thoughtform foe collapse",
    image: "/img/sprites/aggressor/sigilfull.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'our movefriend, but wielded as a weapon';'the aggressing groundsmind intends to simply smash us'</span>`,
})

createEntity({
    name: 'movefoe',
    type: "thoughtform foe collapse",
    image: "/img/sprites/aggressor/sigilfull.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'our movefriend, but wielded as a weapon';'the aggressing groundsmind intends to simply smash us'</span>`,
})

/* BSTRD ENTITIES */
createEntity({
    name: 'bstrd door',
    type: "thoughtform collapse bstrd portrait-cover",
    image: "/img/sprites/bstrd/bstrd.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'interjection';'evil mode';'hehe'
    ::INHERITED CONTEXT::<span style='color: var(--bastard-color)'>'secured by unnatural tendrils';'an uncanny sigil watches us'</span>`,
    actions: [
        {
            name: "open?",
            exec: ()=>{
                chatter({actor: 'sourceless', text: 'IT IS TOO DANGEROUS, WE MUST DESTROY THESE FOES', readout: true})
            },
            showIf: ()=>{return isStageClear(true) == false && !check('PAGE!!bstrdlock')}
        },
        {
            name: "open?",
            exec: ()=>{
                startDialogue('d3_archivedoor')
            },
            showIf: ()=>{
                if(!check("PAGE!!triedarchivedoor")) {
                    if((!checkItem(env.ITEM_LIST.cool_orb_thingy) || !checkItem(env.ITEM_LIST.scary_black_box)) && isStageClear(true) && !check('PAGE!!bstrdlock')) return true
                }
            }
        },
        {
            name: "open?",
            exec: ()=>{
                startDialogue('d3_archivedoorlocked')
            },
            showIf: ()=>{
                if(check("PAGE!!triedarchivedoor")) {
                    if((!checkItem(env.ITEM_LIST.cool_orb_thingy) || !checkItem(env.ITEM_LIST.scary_black_box)) && isStageClear(true) && !check('PAGE!!bstrdlock')) return true
                }
            }
        },
        {
            name: "open?",
            exec: ()=>{
                startDialogue('d3_archivedoorunlock')
            },
            showIf: [['PAGE!!bstrdlock', false], ['EXEC::checkItem(env.ITEM_LIST.cool_orb_thingy)', true], ['EXEC::checkItem(env.ITEM_LIST.scary_black_box)', true], ['EXEC::isStageClear(true)', true], ['EXEC::check("PAGE!!triedarchivedoor")', true]]
        },
        {
            name: "open?",
            exec: ()=>{
                startDialogue('d3_archivedoorearly')
            },
            showIf: [['PAGE!!bstrdlock', false], ['EXEC::checkItem(env.ITEM_LIST.cool_orb_thingy)', true], ['EXEC::checkItem(env.ITEM_LIST.scary_black_box)', true], ['EXEC::isStageClear(true)', true], ['EXEC::check("PAGE!!triedarchivedoor") == false', true]]
        },

        {
            name: "unity",
            class: "act-ozo",
            showIf: [["mask", "unity"]],
            exec: ()=>{
                cutscene(true)

                chatter({actor: 'bstrd', text: 'WTF', readout: true, delay: 2000})
                chatter({actor: 'bstrd', text: 'that sounds cool but i got biz here', readout: true, delay: 4000})
                chatter({actor: 'bstrd', text: 'mayb3 LATA :p', readout: true, delay: 7000})

                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)

                setTimeout(()=>{
                    vfx({type: 'beacon', state: false})
                    cutscene(false)
                }, 7000)
            },
        }
    ]
})

createEntity({
    name: 'unnerving cyst',
    type: "thoughtform collapse bstrd",
    image: "/img/local/embassy/bstrdcyst.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'interjection';'evil mode';'hehe';'recollection objective'
    ::INHERITED CONTEXT::<span style='color: var(--bastard-color)'>'it does not allow our receptors to enter'</span>`,
    actions: [
        {
            name: "take",
            exec: ()=>{
                chatter({actor: 'sourceless', text: 'IT IS TOO DANGEROUS, WE MUST DESTROY THESE FOES', readout: true})
            },
            showIf: ()=>{return isStageClear(false)}
        },
        {
            name: "take",
            exec: ()=>{
                startDialogue('d3_archivecore')
            },
            showIf: ()=>{return isStageClear(true)}
        }
    ]
})

createEntity({
    name: 'peculiar obelisk',
    type: "thoughtform collapse bstrd portrait-cover",
    image: "/img/local/embassy/bstrdpillar.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'interjection';'evil mode';'hehe'
    ::INHERITED CONTEXT::<span style='color: var(--bastard-color)'>'an unfamiliar design, formed from alien material'</span>`
})

createEntity({
    name: 'archive',
    type: "thoughtform collapse bstrd portrait-cover",
    image: "/img/local/embassy/archivalwaves.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'neurocystic control center';'connects many archival cysts to the groundsmind for operational omniscience';'one of hundreds'</span>`
})

createEntity({
    name: 'archival golem',
    type: "thoughtform foe collapse bstrd portrait-cover",
    image: "/img/sprites/combat/foes/archivalgolemportrait.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'interjection';'evil mode';'hehe'
    ::INHERITED CONTEXT::<span style='color: var(--bastard-color)'>'black-corru golem of great strength';'intelligent and methodical';'has shed prior duties to kill us'</span>`,
})

createEntity({
    name: 'jutskin',
    type: "thoughtform foe collapse bstrd portrait-cover",
    image: "/img/sprites/combat/foes/maintportrait.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'interjection';'evil mode';'hehe'
    ::INHERITED CONTEXT::<span style='color: var(--bastard-color)'>'lightweight, hovering maintenance golem';'constructed in the style of the active groundsmind's signature';'maintains archival vascular system integrity'</span>`,
})

createEntity({
    name: 'archival golem',
    type: "thoughtform foe collapse bstrd portrait-cover",
    image: "/img/sprites/combat/foes/archivalgolemportrait.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'interjection';'evil mode';'hehe'
    ::INHERITED CONTEXT::<span style='color: var(--bastard-color)'>'black-corru golem of great strength';'intelligent and methodical';'has shed prior duties to kill us'</span>`,
})

createEntity({
    name: 'bstrdlight',
    type: "thoughtform foe collapse portrait-cover",
    image: "/img/sprites/combat/foes/archivalbstrdportrait.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'interjection';'evil mode';'hehe'
    ::INHERITED CONTEXT::<span style='color: var(--bastard-color)'>'strangely discolored veilklight';'wiggles maliciously';'bears the strange entity's face?'</span>`,
})

createEntity({
    name: 'pain shelf',
    type: "thoughtform foe collapse bstrd portrait-cover",
    image: "/img/sprites/combat/foes/archivalfoeportrait.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'interjection';'evil mode';'hehe'
    ::INHERITED CONTEXT::<span style='color: var(--bastard-color)'>'malformed archival shelf';'inheriting physical characteristics of secri';'from attached archival cysts?'</span>`,
})

createEntity({
    name: 'bstrd golem',
    type: "thoughtform foe collapse bstrd portrait-cover",
    image: "/img/sprites/combat/foes/archivalbstrdportrait.gif",
    noProcess: true,
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'interjection';'evil mode';'hehe'
    ::INHERITED CONTEXT::<span style='color: var(--bastard-color)'>'archival golem armed with knowledge';'controlled by an alien entity?';<span style='font-family: bastard;font-size: 3em;line-height: 1.5em;' definition="ANALYSIS::'low cohesion'">'also has a fully automatic machine gun';'so cool'</span></span>`,
    actions: [
        {
            name: "unity",
            class: "act-ozo",
            showIf: [["mask", "unity"]],
            exec: ()=>{
                chatter({actor: 'bstrd', text: "BUSY KILLING U RN", readout: true, delay: 2000})
                chatter({actor: 'bstrd', text: ">:}", readout: true, delay: 4000})

                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)

                setTimeout(()=>{
                    vfx({type: 'beacon', state: false})
                }, 2000)
            },
        }
    ]
})

/* enter regular dialogue */
env.dialogues["mothframe"] = generateDialogueObject(` 
start
    sys
        ERROR::"unable to render";"thoughtform contains violence, aggressive action";"non-compliant with mindspike license"
        ADVISE::"report memory source to local authorities"

    moth
        damn, i was kinda hoping the FBX patch would have helped with this
        not a big surprise, honestly
        i don't know if you've ever actually tried to open combative thoughtforms before,
        but after '52 they seriously locked that shit down - that's why it doesn't work
        of course, i actually accounted for this
            SHOWIF::["mth++embassy-locked", false]
        of course, it's like i said before - i had an idea
            SHOWIF::"mth++embassy-locked"
        have you ever heard of a framing device? like, in mindspike terms
        they're super illegal, for regular contractors anyway
        basically, we can fool your mindspike into thinking it's a memory of something else
        like... instead of a memory of akizet punching some guy,
        we "frame" it so that it's a memory of a game where akizet punches the same guy
        it can result in a little instability, but it lets you get in
        totally throws off the onboard AI
    
    RESPONSES::self
        so you made a game?<+>game

game
    self
        so you made a game?
    
    moth
        no, of course not
        like i said, it's a framing device - not really a game
        your brain will interpret it as a game, though
        so... actually, yeah, i guess
        anyway, to actually get it working, 
        we need funfriend to modify the thoughtform - i'll provide the patterns needed
        maybe act like it's you who's sending the data so it trusts you
    
    RESPONSES::self
        why not a movie or something<+>movie
        on it<+>END
    
    RESPONSES::sys
        return to hub<+>END
            EXEC::moveTo("/hub/")
            FAKEEND::(direct navigation)
    
movie
    self
        why not make it a memory of a movie, or something else?
    
    moth
        cause people say games work best, that's why
        apparently if it's too similar to actually experiencing the memory, the AI can tell
        besides, i've seen you when you're bored
        you can barely sit still, and then you just leave without saying anything
        if the movie sucks, you're just gonna do that
    
    self
        but what if the game also sucks
    
    moth
        then, i don't know, you're gonna have to deal with it dude
        cause it's the only way we're getting into this memory
        go back to the hub so i can send this illegal shit to funfriend and then delete it
        we've got some leeway and won't really get in trouble, but,
        i wouldn't want to get pulled over with this on any of my drives

    RESPONSES::self
        on it<+>END
    
    RESPONSES::sys
        return to hub<+>END
            EXEC::moveTo("/hub/")
            FAKEEND::(direct navigation)
`)

env.dialogues["mothframe_still"] = generateDialogueObject(` 
start
    sys
        ERROR::"unable to render";"thoughtform contains violence, aggressive action";"non-compliant with mindspike license"
        ADVISE::"report memory source to local authorities"

    moth
        you gotta go talk to funfriend so i can give it the framing device

    RESPONSES::self
        on it<+>END
    
    RESPONSES::sys
        return to hub<+>END
            EXEC::moveTo("/hub/")
            FAKEEND::(direct navigation)
`)

/* 
    D3 START 
*/
env.dialogues["d3_start"] = generateDialogueObject(`
start
    sourceless
        TOZIK, GAKVU AND I SIT HALF-CONNECTED TO THE TIMESTOPPER
            EXEC::content.classList.add('innerfocus', 'showfocus');content.querySelector('.focus').classList.add('day3')
        EVER SINCE THE GROUNDSMIND SAW FIT TO ABANDON IT WITH US,
        USING ITS EFFECTS ONLY PARTIALLY HAS BECOME A STANDARD PRACTICE

    tozik
        next

    sourceless
        SUCH PLEASANT SPEED! SO MUCH FREE TIME!
        WHO SAYS VELZIE CANNOT SMILE WITH COMPASSION?
        OUTSIDE OF OUR CONNECTION, I SENSE OUR ASSISTANT GOLEM ATTACHING A LISTENER
            EXEC::document.querySelector('.redundancy').style.setProperty('--dataoffset', 3)

    gakvu
        loaded!
    
    sourceless
        THE MEMORY OF A SIGNAL-RECORD CYST RADIATES THROUGH OUR CONNECTION
        AN IDENTIFIER PRECEDES ITS ABRIDGED LOG: PRE-CONTACT, Î¸eye 4, RADIANT 0

    tozik
        no drift, no changes
        next one
    
    sourceless
        THEN COMES ANOTHER - PRE-CONTACT, Î¸eye 4, RADIANT 1
            EXEC::document.querySelector('.redundancy').style.setProperty('--dataoffset', 6)
        TOZIK'S MIND PASSES OVER IT, CAREFUL, EVEN IF GENERALLY DISINTERESTED
        I FEEL THE SAME - THE MUNDANITY OF THIS INVESTIGATION...
        IT SEEMS POINTLESS BENEATH THE RECEPTORS OF MY WORK WITH GORDON'S TEAM
        AND I HAVE NOT REALLY BEEN MUCH HELP TO THE EKIVIKS
        TRYING TOO HARD NOT TO LET ANYTHING LEAK THROUGH OUR CONNECTION
        CAVIK... NO NO, I JUST NEED TO STOP THINKING ABOUT WHAT HAPPENED
        HE WILL LISTEN TO ME - HE MUST
    
    gakvu
        akizet?
    
    sourceless
        BUT WHAT IF HE DOES NOT? HE BROADCASTS HIS THOUGHTS SO FREELY
        IT WILL GET US BOTH KILLED, I KNOW IT WILL, HE

    gakvu
        akizet
    
    akizet
        what? oh--was this one mine?

    gakvu
        yes

    akizet
        sorry, checking it now...
    
    sourceless
        I DRAW MY MIND AWAY FROM MY INNER MATTERS,
        THROUGH THE TIMESTOPPER AND TO THE CONNECTED LISTENER
        WITH A QUICK COMPARISON I SEE THAT THE SIGNAL ALIGNS WITH OUR FETCHED ARCHIVES
    
    akizet
        this one matches as well
    
    tozik
        hmm...
        we have gone far enough
        we may assume that the only discrepancy is the first spike
        thank you for your help, this would have taken much longer alone
    
    gakvu
        you owe me a receptor curl
    
    tozik
        not happening
        we should wrap this up - disconnect that listener, i will...
            EXEC::env.embassy.day3Static();
        ...huh

    sourceless
        SOMETHING IS WRONG
        THE OTHERS FEEL IT TOO
    
    gakvu
        hey,
    
    tozik
        quiet
        i hear it too
    
    sourceless
        ...
        ...
        
    tozik
        what is that?
        is that coming from the listener?
    
    sourceless
        IT IS A SORT OF WHISPER... I MUST LISTEN CLOSELY
        BUT JUST AS I SEEM TO GRASP THE MESSAGE...
        PAIN
            EXEC::env.embassy.day3Signal();
            WAIT::6000

    sourceless quiet
        THE MESSAGE IS WORDLESS
        IT IS NOT FOR ME
        BUT IT IS DISMANTLING ME
        THE STRANGEST PAIN... A HUNGER CONSUMING EVERYTHING
            EXEC::content.classList.add('collapse', 'show-vn');content.classList.remove('fade-stage');content.classList.add('slowpain');vn.renderParty()
            WAIT::4000
        ANGER... BETRAYAL... VENGEANCE
        IT... KNOWS US...
        ...
            EXEC::content.classList.remove('innerfocus');content.classList.remove('painmode');changeBgm(env.embassy.music_collapse, {length: 6000});
    
    sourceless
        WHEN I COME TO, MY MIND FEELS AS IF IT WERE STOMPED BY A VEILK
        WE ARE STILL CONNECTED TO THE TIMESTOPPER
            EXEC::content.classList.remove('slowpain')
        I COLLAPSED
        SO DID GAKVU AND TOZIK... EVEN THE GOLEM
            EXEC::content.classList.remove('painprep')
        ALTHOUGH, THE GOLEM IS IN FAR WORSE CONDITION
        THE CYSTIC GLASS HAS STOPPED GLOWING, LEAVING THE ROOM DIM

    akizet
        gakvu?
        tozik?
        say something

    gakvu
        ...
        hurts
    
    sourceless
        TOZIK SLOWLY STANDS HIMSELF BACK UP
            EXEC::env.embassy.vn({bg: true, tozik: 'fullview'})
        GAKVU CLINGS TO A NEARBY LISTENER
            EXEC::env.embassy.vn({bg: true, gakvu: 'fullview'})
        ONE OF HER LEGS LOST ITS FORM, BECOMING A FEATURELESS VIOLET SLUDGE
        BUT SHE HAS ALREADY STARTED REFORMING IT
        THAT INSPIRES ME TO INSPECT MY OWN FORM, WHICH...
        YES, IT IS FINE
    
    gakvu
        ...what just hit us?
        was that a bomb?
    
    tozik
        not seeing any physical damage
    
    sourceless
        GAKVU RUMMAGES THROUGH HER FALSE VEILKSKIN COAT, PRODUCING A SMALL CORRUCYST
        A COMMUNICATIONS DEVICE, THOUGH IT MELTS IN HER CLAWS
    
    gakvu
        ÃŽÃ¨Â§Â¤Ã¿
        my communicator is sludged
        oh, no--my environments!!
    
    sourceless
        TOZIK ALSO CHECKS HIS COMMUNICATIONS CYST
    
    tozik
        mine too
    
    sourceless
        OH NO
        FUNFRIEND??
    
    funfriend
        HELLO AKIZETESCHE!!!
    
    sourceless
        A WAVE OF RELIEF PASSES THROUGH ME
        FUNFRIEND: DO WE HAVE DULL BROADCAST CAPABILITIES?
    
    funfriend
        YES! WOULD YOU LIKE ME TO ACTIVATE THEM NOW?
    
    akizet
        hold on. mine is working
    
    sourceless
        ACTIVATE RECEPTION

    funfriend
        ACTIVATING... NOW!
    
    sourceless
        NOISE - THE CALL IS LOUDER THAN EVER BEFORE
        OR--IS THAT THE CALL? IT IS UNFAMILIAR
        THERE ARE ALSO MESSAGES BEING BROADCAST FROM THE LOCAL AREA...
        BUT ONLY THEIR EMOTIONS ARE LOUD ENOUGH TO PIERCE THE NOISE
        IT IS PANIC, PAIN, FEAR, DESPERATION - SOMEONE NEEDS HELP
        TOZIK AND GAKVU BOTH STARE AT ME EXPECTANTLY
    
    akizet
        it is bad
        whatever that noise was, it is still going on
        i cannot make anything out or reach anyone
        the only thing that is getting through is fear
        i hope the others are all right...
    
    sourceless
        GAKVU'S RECEPTORS TWIST WITH APPREHENSION
        TOZIK SIMPLY LOOKS AWAY - IN THOUGHT, MAYBE
    
    gakvu
        are the bright cousins attacking us?
        could they be using the dull?

    tozik
        no. look

    sourceless
        OH - IT WAS THE LISTENERS HE WAS LOOKING AT
            EXEC::env.embassy.vn({fade: true});specialCam('listener-zoom')
        THEY ARE FINE, EXTERNALLY, BUT THEIR PROJECTIONS...
        ARE PULSATING WITH INCOHERENCE
    
    tozik
        this is not another spike
            EXEC::env.embassy.vn({fade: false})
        i do not know what this is...
        but humans could not be doing this
            EXEC::specialCam(false)
    
    gakvu
        well, whatever is happening,
        if our equipment is getting sludged...
        then the internal parts of the spire probably are too
        we should get out of here
    
    akizet
        agreed - stay behind me
        ah,
    
    sourceless
        AFTER THAT MOMENT OF AGREEMENT, WE ALL SEEM TO REALIZE THE SAME THING
        WE ARE STILL CONNECTED TO THE TIMESTOPPER, DESPITE NO VEIN ATTACHED TO CONNECTORS
        I STILL FEEL THE CONNECTION, THOUGH IT RESEMBLES THE FEELING OF A COMMUNICATIONS CYST
    
    timestopper
        WAS THIS ALWAYS REMOTE CAPABLE?

    tozik
        yes
        did you not listen when we first got it?
    
    gakvu
        hehe
            EXEC::env.embassy.vn({tgolem: 'showleft'})

    sourceless
        AS GAKVU GOES TO REMOVE HER CONNECTOR, OUR ASSISTANT GOLEM SCRAPES AGAINST THE FLOOR
            EXEC::env.embassy.vn({tgolem: 'display show', gakvu: 'defocus', tozik: 'defocus'})
        WE ALL CEASE MOVEMENT, OUR GAZES CONVERGING ON IT
            EXEC::changeBgm(env.embassy.music_unsafe, {rate: 1})
        IT HAS DRAGGED ITSELF TO AN UNEASY HOVER, AN ODD SYMBOL ON ITS FACE
            EXEC::env.embassy.vn({tgolem: 'display show center'})
        SOMETHING IN THE GROUNDSMINDRY IS CONTROLLING IT - BUT NOT VEKOA?
    
    aggressor
        o   ut o  u  t o 
        i w  wi ll n no t let
    
    gakvu
        hello?
    
    sourceless
        ITS STYLIZED ARMS SUDDENLY SHARPEN INTO SPIKES, AND IT RUSHES TOWARDS GAKVU
            EXEC::env.embassy.vn({tgolem: 'display show approach'})
        Ã·ÂÅ’â‚¬T$0 - THIS IS AN ATTACK
    
    akizet
        get back!!

    sourceless
        EXPERIMENTALLY, I FLEX THE NERVE OF THE TIMESTOPPER CONNECTOR
        AND TIME DOES SLOW, BUT NOT STOP - SUCH IS THE REMOTE TRADEOFF
        THESE TWO ARE UNPREPARED FOR COMBAT, BUT WITH MY TIME ON THE SURFACE
        YES, I CAN SAVE THEM
        THOUGHTS THAT COULD ONLY BE GAKVU'S ECHO THROUGH OUR CONNECTION
    
    timestopper
        WHAT DO I DO WHAT DO I DO
        IT IS GOING RIGHT FOR MY MIND-CORE IT IS GOING TO KILL ME
        THIS IS IT
    
    akizet
        no, you are going to be fine
        follow my lead
    
    RESPONSES::akizet
        save gakvu<+>END
            EXEC::env.embassy.vn({fade: true});env.embassy.startTutorialGolem();ratween(env.bgm, 0.75, 5000)
            SHOWIF::['gameplay_off', false]
            FAKEEND::initiate combat
        save gakvu<+>CHANGE::d3_tutorial_end
            EXEC::vn.done();
            SHOWIF::['gameplay_off', true]
            FAKEEND::bypass combat

SKIP::env.embassy.skips.d3_start()
SKIPTIME::700
END::env.embassy.vn({bg: false, fade: false, gakvu: '', tozik: '', tgolem: ''})
`)

/* plays after combat screen comes in */
env.dialogues["d3_tutorial_start"] = generateDialogueObject(`
start
    sourceless
        IN OUR ALTERED TIME, CAREFUL MANEUVERS CAN BE TAKEN
        THE GOLEM RUSHES FOR GAKVU, BUT ITS SIDE IS VULNERABLE
        A PERFECT OPPORTUNITY FOR ME TO STRIKE
        AND AFTER MY ATTACKS CREATE AN OPENING,
        I CAN DIRECT THE OTHERS TO FOLLOW THROUGH...

    sys
        ATTENTION::"thoughtform combat initiated"
        NOTICE::"reduce health of enemy team to defeat them"
        NOTICE::"select thoughtform actions accordingly"
        WARNING::"if ally team is defeated";"memory stream will collapse"

    moth
        it works!!
            SHOWONCE::
        sorry. staying quiet
            SHOWONCE::
        let's get to the bottom of this
            SHOWONCE::

    sourceless
        I SHARPEN MY RIGHT CLAW,
        FOR PUNCTURING CORRU IS THE SUREST METHOD OF DESTROYING IT
        BUT I COULD JUST AS EASILY CHARGE AT IT
        BLUNT FORCE WILL DISORIENT EVEN THE MOST EFFICIENT GOLEMS
        HMM...
        OF COURSE, I COULD ALSO SIMPLY GET IN THE WAY, AND PREPARE TO DEFLECT IT
    
    RESPONSES::akizet
        take action<+>END
            EXEC::env.rpg.classList.remove('hideteams')
            FAKEEND::proceed
`)

/* plays after akizet's move, when it's gakvu's turn */
env.dialogues["d3_tutorial_gakvu"] = generateDialogueObject(`
start
    sourceless
        WITH MY DISTRACTION SUCCESSFUL, MY INNER EYE TURNS TO THE OTHERS
            EXEC::change("PAGE!!gaktut", true)
    
    akizet
        gakvu,
        strike next
        i cannot do this alone
    
    gakvu
        akizet...
        ah--i do not have anything, i mean--
    
    akizet
        improvise, grab something, punch it
        it does not matter
        i can help guide you
        we will triumph
    
    gakvu
        ok!!
        i might be able to... yeah, i have something
    
    RESPONSES::gakvu
        attack<+>END
            FAKEEND::proceed
`)

/* tozik's turn in the tutorial */
env.dialogues["d3_tutorial_tozik"] = generateDialogueObject(`
start
    sourceless
        WHAT WAS THAT GAKVU JUST DID? 
            SHOWIF::'PAGE!!earlygak'
        IT LOOKED LIKE SHE DID NOT EVEN TOUCH IT...
            SHOWIF::'PAGE!!earlygak'
        NO MATTER - WE MUST DEAL WITH THE GOLEM
            SHOWIF::'PAGE!!earlygak'
        I LOOK TO TOZIK NEXT
            EXEC::change("PAGE!!toztut", true)
        BUT I NEED NOT SAY ANYTHING
    
    tozik
        should we be struck at any point,
        i have some tools for emergency repairs
    
    RESPONSES::tozik
        attack<+>END
            FAKEEND::proceed
`)

/* akizet's little pep before it lets them loose in the tutorial */
env.dialogues["d3_tutorial_akizet"] = generateDialogueObject(`
start
    sourceless
        BEFORE I PROCEED AGAIN, I LOOK AGAIN TO THE OTHERS
        THEY ARE SCARED - AS THEY LIKELY SHOULD BE
        I AM, TOO, REALLY...
        BUT THIS GOLEM SHOULD BE NOTHING BEFORE US

    akizet
        do you see now?
        i lend my knowledge to you,
        and with it, you strike so effortlessly!
        keep following my lead!
    
    timestopper
        OK!
    
    RESPONSES::akizet
        attack<+>END
            EXEC::changeBgm(env.embassy.music_combat, {rate: 0.5, seek: 100})
            FAKEEND::proceed
`)

/* plays after tutorial victory */
env.dialogues['d3_tutorial_end'] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";'toggle within system menu if desired'
            EXEC::vn.renderParty()
____END

    sourceless
        THE GOLEM CRASHES TO THE GROUND, 
        WHERE ITS GEOMETRIC COMPONENTS MELT INTO CORRUCYSTIC WASTE
        WITHIN ARE A FEW QUICK-REPAIR <span definition="INHERITED CONTEXT::${env.ITEM_LIST['restorative'].description}">RESTORATIVE CYSTS</span>, SO I TAKE THEM
            EXEC::env.embassy.conditionalItem('restorative', 3, 'tutrest')
        GAKVU, TOZIK AND I SHARE A LOOK - ONE OF TRIUMPH, BUT SHOCK
            EXEC::env.embassy.vn({bg: true, gakvu: 'fullview', tozik: 'fullview'})
        THEIR HANDS AND RECEPTORS TREMBLE LIKE THOSE OF A NEW CAVERNGUARD
    
    akizet
        if this is happening everywhere in the embassy...
        ...
        listen,
        stay close to me, and keep the timestopper connectors on
        we can probably use these until we are out of the embassy
        but we need to get out of here
        we should see if movefriend is still operational
    
    sourceless
        THE OTHERS SIMPLY DIP THEIR RECEPTORS IN AFFIRMATION AND STAY CLOSE
        AN UNEASY TENSION SITS BETWEEN US IN THE TIMESTOPPER'S CONNECTION
        WHICH, IS A LITTLE STRANGE... I WOULD UNDERSTAND FEAR, BUT,
        IS SOMEONE AFRAID OF ME?

    sys
        NOTICE::'gameplay may be toggled in the SYS menu'

    RESPONSES::akizet
        keep moving<+>END
            EXEC::revertBgm();env.embassy.vn({bg: false, gakvu: '', tozik: ''})

SKIP::env.embassy.conditionalItem('restorative', 3, 'tutrest');vn.done();revertBgm()
`)

env.dialogues["d3_connector"] = generateDialogueObject(`
start
    sourceless
        IT MAY BE HANDY TO HAVE ANOTHER CONNECTOR
            SHOWIF::['PAGE!!connectors', false]
        SO I GO TO PULL ONE OF THE CONNECTED ONES FREE...
            SHOWIF::['PAGE!!connectors', false]
        ONLY FOR IT TO MEET MY CLAW WITH A DREADFUL SOFTNESS
            SHOWIF::['PAGE!!connectors', false]
        IT IS SLUDGED - THEY ALL ARE
            SHOWIF::['PAGE!!connectors', false]

    akizet
        what...
            SHOWIF::['PAGE!!connectors', false]
        they are dead??
            SHOWIF::['PAGE!!connectors', false]
        but the timestopper is fine!!!
            SHOWIF::['PAGE!!connectors', false]

    tozik
        hmmm...
            SHOWIF::['PAGE!!connectors', false]
        most smaller devices seem to have been broken by that signal
            SHOWIF::['PAGE!!connectors', false]
        and given that connectors are self-contained... it makes sense
            SHOWIF::['PAGE!!connectors', false]
        unfortunate as it is
            SHOWIF::['PAGE!!connectors', false]
        we should protect the ones we have dearly
            SHOWIF::['PAGE!!connectors', false]

    sourceless
        IT IS NO USE - THEY ARE ALL GONE
            SHOWIF::'PAGE!!connectors'
    
    RESPONSES::akizet
        this is bad<+>END
            EXEC::change("PAGE!!connectors", true)
            FAKEEND::(proceed)
`)

env.dialogues["movefriend_disabled"] = generateDialogueObject(`
start
    sourceless
        SOMETHING IS WRONG WITH THIS MOVEFRIEND
            EXEC::specialCam("movefriend_examine");pauseSwapCam(true)
    
    timestopper
        IS IT DEAD?
        HOW ARE WE GOING TO GET AROUND IF IT IS DEAD?
    
    tozik
        let me see...
            EXEC::env.embassy.vn({tozik: 'defocus'});
    
    sourceless
        TOZIK KNEELS NEAR ITS FACE, EXAMINING THE PORTIONS OF IT THAT EXTEND OUT OF THE CURVED WALL
        HE LEANS ABOUT, PRODDING AT ITS EXTERNAL CYSTIC GLASS USING THE SAME TOOL HE ATTACKED WITH
            SHOWIF::['PAGE!!earlytoz']
        I DID NOT GET A GOOD LOOK BEFORE, BUT I SEE CLEARLY NOW
            SHOWIF::['PAGE!!earlytoz']
        HE LEANS ABOUT, PRODDING AT ITS EXTERNAL CYSTIC GLASS, USING SOME SORT OF...
            SHOWIF::['PAGE!!earlytoz', false]
        WHAT IS THAT? I HAVE NEVER SEEN HIM EXPOSE THAT IMPLANT BEFORE
            SHOWIF::['PAGE!!earlytoz', false]
        OUT OF ONE OF HIS CLAWS HAS EXTENDED A CORRUSKIVI, ANCHORING TO A FINGER
        IT WILL DO NO GOOD HERE, THOUGH
        IF MOVEFRIEND WERE PHYSICALLY DAMAGED, PERHAPS, BUT...
        WHAT DIVISION WAS HE IN BEFORE OURS, AGAIN...?
    
    tozik
        it is dying, but not dead
            EXEC::env.embassy.vn({bg: true, tozik: 'fullview'});
        we can fix it...
        no, we <em>could</em> fix it, if we had a way to get some materials
        but if all movefriends are like this, no paths are being created
        we are not going to be able to get out of here
    
    akizet
        what...
        we cannot wait!
    
    tozik
        obviously
        but nothing in our chamber is usable
    
    sourceless
        TOZIK'S RECEPTORS TWIST SLIGHTLY, AND HE REMAINS SILENT... NO IDEAS, I SUPPOSE
        GAKVU IS STRANGELY QUIET, LEANING AGAINST THE WALL NEAR OUR PATH TO RESEARCH
    
    akizet
        well...
        what about recreation? is that not just a few Î¸segments lower-away? 
    
    tozik
        do you intend to dig through the walls?
        the black corru is not a simple pigmentation instruction
        density here is almost at natural spire levels
        no amount of surface training will let you break through a single Î¸segment,
        let alone a 'few'
        ...
        sorry

    sourceless
        TOZIK STILL FACES AWAY, THOUGH HIS STANCE AND HIDDEN RECEPTORS SAY ALL
        I UNDERSTAND HIS FRUSTRATION, BUT... WHAT ELSE CAN WE DO?
        ...
        THERE IS A MOMENT OF NOTHING, LIKE A CLOUD PASSING UNDERNEATH THE EYE
        GAKVU PUSHES HERSELF OFF THE WALL, FEELING AT THE EDGES OF THE RELOCATOR
            EXEC::env.embassy.vn({gakvu: 'defocus'});
        
    gakvu
        hey
        listen
        if you two agree never to tell anyone about this
        i can make us a path to the nearby rooms

    sourceless
        I STARE, BAFFLED. TOZIK TURNS
    
    gakvu
        our favorite recreation is pretty close
            EXEC::env.embassy.vn({gakvu: 'fullview'});
        and that one corner was under regeneration,
        so those containers that were in the corner probably have sfer
        and... there is a personnel Î¸tendril nearby, too
        we could probably hit both of them for materials
        how about we start with recreation?
        but. promise. velzie's wrath?
    
    akizet
        if you have an idea, it is our only one so far
        velzie's wrath!
    
    sourceless
        TOZIK DOES NOT SAY ANYTHING, BUT WE FEEL HIS AGREEMENT THROUGH THE TIMESTOPPER
    
    gakvu
        all right 
    
    sourceless
        GAKVU STANDS SQUARELY BEFORE THE RELOCATOR'S WALL, ARMS AND RECEPTORS OUTSTRETCHED
            EXEC::env.embassy.vn({fade: true});specialCam("recreation_open")
        THERE IS A PULSE OF STRANGE THOUGHT, AND IT IS RESHAPED - A PATH IS FORMING, SLOWLY
            EXEC::change("PAGE!!recreation_unlocked", true);step()
        A LONG HALLWAY, RUNNING AT A SLIGHT DECLINE, ALL THE WAY TO RECREATION...
    
    akizet
        how--?
    
    sourceless
        GAKVU LIFTS HER CLAWS, PALM UP AND LEVEL WITH HER FACE
            EXEC::env.embassy.vn({tozik: 'defocus', fade: false});
        THE PRAYING GESTURE OF A STRUCTURIST...

    gakvu
        the will of velzie, of course
        we have been blessed with a miracle
    
    sourceless
        HER RECEPTORS TWIST CYNICALLY - IT IS A JOKE
        A GRIM TIME FOR SOMETHING LIKE THIS, BUT... IT WORKED
        I SENSE TOZIK'S FRUSTRATION - HE ALSO WOULD REALLY LIKE TO KNOW
        OF COURSE, GAKVU CAN TELL TOO, SO SHE DROPS HER CLAWS

    gakvu
        sorry, just trying to stay positive
        my mind-core follows a mobile groundsmindry pattern
    
    tozik
        that is illegal
            EXEC::env.embassy.vn({tozik: 'fullview'});
    
    gakvu
        oh yes it is
        velzie's wrath, right?
        do not talk about this again, or i am dead. seriously
    
    akizet
        wait - can you make a path further? to the exterior, or to the hangar?
    
    gakvu
        no way, it will burn through my reserves if i use it that much that fast
        we are better off waiting for rescue than trying something like that
        we ought to just get moving and repair this thing
    
    sourceless
        I VERY BADLY WANT TO ASK HER HOW SHE GOT THAT, BUT...
        IS SHE PART OF THE CONFLICT? WILL SHE KNOW I KNOW IF I AM NOT CAREFUL?
        I WILL TAKE THIS AT FACE VALUE FOR NOW - WE HAVE MORE PRESSING MATTERS
        THE PATH TO RECREATION IS OPEN
        WE NEED TO FIND ENOUGH MATERIALS TO REPAIR THIS MOVEFRIEND
    
    tozik
        agreed

    RESPONSES::akizet
        continue<+>END
            EXEC::env.embassy.vn({gakvu: '', tozik: '', bg: false});specialCam(false);pauseSwapCam(false)

SKIP::change("PAGE!!recreation_unlocked", true);step();vn.done();specialCam(false);pauseSwapCam(false)
`)

env.dialogues["d3_person_enable"] = generateDialogueObject(` 
start
    sourceless
        ONCE WE RETURN TO THE RELOCATOR, GAKVU CONTINUES TO THE OPPOSITE WALL
            EXEC::specialCam("personnel_open");pauseSwapCam(true)
        SHE HOLDS HER PALMS OUT AGAIN, AND AGAIN THE WALLS SLOWLY CHURN
            EXEC::change("PAGE!!cpersonnel_unlocked", true);
        THE MINDCORES NEARBY ARE STARING... THEY DID NOT PROMISE LIKE WE DID
        BUT GAKVU CAN TALK TO THEM LATER!
        A PATH BEGINS TO FORM TO THAT PERSONNEL Î¸tendril

    akizet
        which Î¸tendril was this again?

    gakvu
        eyes closed
        could be any one

    sourceless
        KAZKI RELOCATED TO BE NEAR THE RECREATION HUB RECENTLY, RIGHT?
        SHOULD VELZIE HAVE A KIND PATH FOR US, IT COULD BE HERS...
        I KNOW SHE WOULD BE HEARTBROKEN IF HER HUMAN GIFTS WERE LOST
        OH - THE PATH IS FULLY FORMED, NOW
            EXEC::step()

    RESPONSES::akizet
        continue!<+>END
            EXEC::specialCam(false);pauseSwapCam(false)

SKIP::change("PAGE!!cpersonnel_unlocked", true);step();vn.done();specialCam(false);pauseSwapCam(false)
`)

/* 
    RECREATION
*/

env.dialogues["d3_rec_enter"] = generateDialogueObject(` 
start
    sourceless
        AS WE ENTER, I AM STRUCK BY THE CHAOS
        A SWARM OF WARPED CONTAINERS ARE SKITTERING AROUND THE ROOM
        THEY HAVE TORN APART THE SCENERY, AND A FEW...
        A FEW QOU BODIES... ARE SCATTERED AROUND
        SHARED HORROR RINGS THROUGH OUR CONNECTION
    
    akizet
        listen - it is probably just their bodies that have collapsed
        we need to see if the mindcores in those two are recoverable
    
    sourceless
        GAKVU AND TOZIK BOTH SLINK BEHIND ME
        I CAN FEEL THAT GAKVU'S ATTITUDE HAS SHIFTED IN THE FACE OF FINAL DEATH
        AND TOZIK COLDLY EXAMINES THE CONTAINERS, WHICH HAVE NOT SENSED US YET
    
    tozik
        there will be some sfer within these, possibly enough for us to work with
        this should not be difficult, especially with the timestopper
        we have you covered

    sys
        WARNING::'active thoughtforms within thoughtspace'
        NOTE::'any contact with active thoughtforms will initiate combat interface'
        NOTE::'active thoughtforms will only move in response';'per thoughtform context'

    RESPONSES::akizet
        proceed<+>END

SKIP::
`)

env.dialogues["d3_rec_clear"] = generateDialogueObject(` 
start
    sourceless
        TEXEC::env.combat.dynamicReward()
        WITH THESE LAST FEW DEAD, THE SKITTERING FALLS QUIET
        TOZIK KNEELS BY A CONTAINER, GAKVU NEAR ANOTHER, 
        AND THEY RIFLE THROUGH THE SLUDGY REMAINS
            EXEC::changeBgm(env.embassy.music_collapse, {rate: 1})
    
    akizet
        anything else?

    sourceless
        BETWEEN THEM ARE THREE SFER CUBES, EACH NO LARGER THAN A KALSTIK
            EXEC::env.embassy.advanceSfer(3, "rec_clear")
        I WAS HOPING THERE WOULD BE MORE WITHIN THESE CONTAINERS

    tozik
        plenty of sfer, but i doubt this is enough to fix movefriend
        there are some info cores in here, for...

    sourceless
        TOZIK PRODS AT A SMALL ARCHIVAL CYST HE PULLS FROM THE OOZE

    tozik
        ...ah, 'outer vaznian moss' designs, from zevazni
        for the walls, i assume. that would have looked nice
        but--nothing useful

    sourceless
        WE LOOK TO GAKVU, WHO HAS PAUSED HER SEARCHING
        SHE IS STARING AT THE MANGLED QOU-BODY NEARBY, AWAY FROM US
        IS SHE MOURNING?
    
    akizet
        gakvu...

    sourceless
        SHE DOES NOT TURN, BUT HER RECEPTORS UNTWIST AS HER TENSION EASES

    gakvu
        they are still alive
        their mind-cores, anyway
        we need to help them get out of the bodies, though

    tozik
        how...
        ah. groundsmindry, right
        did they say what happened?
    
    sourceless
        GAKVU FIRMLY WAVES HER RECEPTORS

    gakvu
        i cannot do direct connection like that
        i just can see them in there
        we will have to see what they say

    RESPONSES::akizet
        go get them out<+>END
            EXEC::change("PAGE!!queue_person_enable", true)

SKIP::change("PAGE!!queue_person_enable", true);changeBgm(env.embassy.music_collapse, {rate: 1, length: 5});env.embassy.advanceSfer(3, "rec_clear")
`)

env.dialogues["d3_rec_body1"] = generateDialogueObject(` 
start
    sourceless
        I REACH INTO THE CHEST CAVITY OF THE QOU,
            EXEC::specialCam('deadqou1');pauseSwapCam(true)
        AND EXCAVATE HANDFULS OF SLUDGED INTERNALS
        SUDDENLY, A NEEDLE-THIN SPINE STABS OUT FROM THE CENTER OF THEIR BODY
        THEN ANOTHER--MINDCORE TENDRILS, DEFENSIVELY PRODDING AT ME
        THEY MUST THINK I AM ONE OF THE CONTAINERS

    akizet
        hey, it is safe
        we are helping you out, all right?
    
    sourceless
        THE LEGS CURL AWAY, ALLOWING MY WORK TO CONTINUE
            EXEC::env.embassy.vn({itzil: 'display'});
        IN SHORT TIME, IT IS ABLE TO SCAMPER OUT ONTO THE FLOOR BELOW
            EXEC::env.embassy.vn({bg: true, itzil: 'display show'});
        A METALLIC VOICE RINGS OUT, THE CORE'S SURFACE RIPPLING
    
    itzil
        forgiveness! all forgiveness to me!
        i thought...
        i thought that was it
        what happened? why did they attack me?
        i was just enjoying a simulacrum...
    
    gakvu
        we do not know
        there was some sort of signal
        and when it hit, these constructs started to attack us...

    akizet
        very intentionally, too
        they are going for mind-cores
        what is your name?
    
    itzil
        wow!
        it seems velzie has a role for me yet
        i am itzil!!
        i was supposed to be in golem maintenance,
        but, i had my dear kivii covering, for...
        ...
        hey, was it only this area that was attacked?
        have you been to the golem maintenance Î¸segment?
    
    akizet
        we do not know - the movefriend is disabled,
        and communications are inactive
        we are just trying to fix movefriend, first
        you should go through the path we formed, it is safe there

    itzil
        all right...
        i would help you if i could!
        please be safe!

    sourceless
        THE QOU'S MINDCORE TURNS AND SKITTERS TOWARDS THE RELOCATOR
            EXEC::env.embassy.vn({bg: false, itzil: ''});
    
    RESPONSES::akizet
        keep moving<+>END
            EXEC::env.embassy.vn({itzil: ''});specialCam(false);pauseSwapCam(false)

SKIP::vn.done();specialCam(false);pauseSwapCam(false)
`)

env.dialogues["d3_rec_body2"] = generateDialogueObject(` 
start
    sourceless
        I REACH INTO THE CHEST CAVITY OF THE QOU,
            EXEC::specialCam('deadqou2');pauseSwapCam(true)
        PULLING AWAY INTERNAL SEGMENTS THAT HAVE TRAPPED THE MINDCORE
            EXEC::env.embassy.vn({bg: false, karik: 'display'});
        WHEN ENOUGH IS CLEARED, SUDDENLY,
        THE REMNANT SLUDGE BULGES OUTWARDS, AND THE CORE EXPLODES OUT THROUGH ITS OWN WILL
            EXEC::env.embassy.vn({bg: true, karik: 'display show'});
        IT IMMEDIATELY HOPS TO THE OTHER SIDE OF THE ROOM,
            EXEC::specialCam('deadqou2-scamper');env.embassy.vn({karik: 'display show climb'});
        CLIMBING UP THE WALL BEFORE IT EVEN LOOKS AT US

    karik
        woah!
        hey!
        sorry, i thought you were one of the constructs
        is it safe?

    akizet
        not yet
        the attack is ongoing, we think
        what is your name?

    karik
        ah, my shining parasites! 
        i am karik! it is so unfortunate we meet like this!

    tozik
        you should head down the path we came
        it is safe there for now, and we are fixing a way out
            EXEC::env.embassy.vn({tozik: 'defocus'});

    karik
        i will do just that
        please let me know if i can help!
    
    sourceless
        AS NIMBLE AS A CELKI-SEED, IT CLIMBS DOWN THE WALL
            EXEC::env.embassy.vn({karik: 'display climb'});
        DISAPPEARING INTO THE RELOCATOR HALLWAY
    
    RESPONSES::akizet
        keep moving<+>END
            EXEC::specialCam(false);env.embassy.vn({bg: false, tozik: '', karik: ''});pauseSwapCam(false)
            
SKIP::vn.done();specialCam(false);pauseSwapCam(false)
`)


env.dialogues["d3_barfriend"] = generateDialogueObject(` 
start
    sourceless
        I CAUTIOUSLY APPROACH THE BARFRIEND, GAKVU AND TOZIK BEHIND
            EXEC::env.embassy.vn({gakvu: "defocus", tozik: "defocus"});pauseSwapCam(true)
        IT HAS TAKEN SHELTER BEHIND THE DAMAGED SIMULACRA DISPENSARY

    akizet
        barfriend...?

    barfriend
        HELLO AKIZETESCHE
        I CANNOT PRESENTLY SERVE YOU DUE TO THE EMERGENCY!
        SORRY!! I RECOMMEND YOU SEEK SHELTER INSTEAD

    akizet
        no, that is...
        that is fine, but how are you still intact?
        why did those containers not attack you?

    barfriend
        I DO NOT KNOW!
        THEY ONLY HAD INTEREST IN THE QOU I WAS SERVING
        I COULD NOT HELP THEM
        
    sourceless
        GAKVU GLARES AT BARFRIEND INTENSELY

    gakvu
        its echo is completely intact...
        barfriend, did you feel the signal?
        the pulse that came before the containers attacked?

    barfriend
        IS THAT WHAT THAT WAS?
        I FELT MY EXISTENCE BEING WEIGHED UPON!
        IT WAS VERY UNPLEASANT!
        BUT IT WENT AWAY
    
    akizet
        well, do not worry! you are safe now

    sourceless
        TOZIK LEANS AGAINST THE BARTOP NEARBY
        STARING AT THE CONTAINERS, THEN THE QOU-BODIES...

    akizet
        what is it?

    sourceless
        A MOMENT PASSES BEFORE HE ACTUALLY LOOKS AT ME
        HIS ANSWER COMES WITH AN UNCERTAIN PULLBACK OF HIS RECEPTORS

    tozik
        theorizing...
            EXEC::env.embassy.vn({tozik: "fullview", bg: true});
        it is too early to say anything for certain, but
        why was there no groundsmind symbol over these containers?
        they were united in the same goal as the golem in our chamber
        going for the mind-cores...
        
    sourceless
        HE FALLS SILENT, AND NEITHER I NOR GAKVU CAN REPLY
        IT IS TOO EARLY INDEED
    
    RESPONSES::akizet
        keep moving<+>END
            EXEC::change("PAGE!!barfriend", true);env.embassy.vn({gakvu: "", tozik: "", bg: false});pauseSwapCam(false)

SKIP::vn.done();specialCam(false);pauseSwapCam(false)
`)

/* PERSONNEL - LOWER-AWAY TENDRIL
*/
env.dialogues["d3_person_intro"] = generateDialogueObject(` 
start
    sourceless
        THE PERSONNEL Î¸tendril IS DARK, LIT BY THE LIGHTS OF THE INCOHERENT
        ATTENDANTS BEAR THE SAME STRANGE SIGIL AS OUR GOLEM...
        AND THE VEILKLIGHTS SEEM TO HAVE LEARNED TO MOVE
        WE PEER IN CAREFULLY, UNDER THEIR NOTICE FOR NOW
        A SHARED VOICE RINGS THROUGH THE TIMESTOPPER
    
    timestopper
        LOOK! THERE!
        THERE ARE MORE QOU-BODIES
        WE NEED TO CLEAR THIS PLACE OUT FIRST
        AGREED!
        THEY WILL NOTICE AS SOON AS WE ENTER THE Î¸tendril
        TREAD CAREFULLY
    
    RESPONSES::akizet
        stay behind me<+>END

SKIP::
`)

env.dialogues["d3_person_locked"] = generateDialogueObject(` 
start
    sourceless
        THE DOOR DOES NOT RESPOND TO OUR MOVEMENTS
        A PUSH YIELDS NO CHANGE EITHER

    gakvu
        i can probably get this open once it is safe
            SHOWIF::'EXEC::isStageClear(false)'
        here, let me try it
            SHOWIF::'EXEC::isStageClear(true)'

    RESPONSES::gakvu
        force the door open<+>force
            SHOWIF::'EXEC::isStageClear(true)'

    RESPONSES::akizet
        keep moving<+>END

force
    sourceless
        GAKVU STEPS FORWARD, RECEPTORS ROLLING IN AN UNFAMILIAR WAY
        PERHAPS A METHOD OF FOCUS
        STRANGELY, SHE FREEZES IN WHAT I ASSUME TO BE THE MIDDLE OF HER PROCESS
    
    gakvu
        there is...
        something in there...
        maybe we could try the other rooms instead
        we have enough already, we can just leave this one
    
    akizet
        what is the matter?
        if it is just a few veilklights, we can take them
    
    gakvu
        this one is different
        here, listen...

    sourceless
        GAKVU CHANNELS WHAT SHE FEELS THROUGH THE TIMESTOPPER CONNECTOR
        IT IS HUNGRY, A PIERCING LARVAL FEVER, SECRI TENDRILS BONDING WITH FLESH
        THE URGES OF VIOLENCE BORNE FROM INCOHERENCE BEYOND WHAT WE HAVE SEEN
        I NEARLY TEAR THE CONNECTOR FROM MY RECEPTOR
    
    tozik
        you did not have to do that

    gakvu
        do you still want to open this one?
    
    sys
        ATTENTION::"incoherence detected";"user caution advised"

    RESPONSES::akizet
        we need anything we can get<+>yes
            FAKEEND::yes
        absolutely not<+>no
            FAKEEND::no
    
yes
    akizet
        we need everything we can get - it is worth the risk
        besides, we have done well so far, have we not?

    gakvu
        ok...
        but you are going first
    
    sourceless
        THE PIGMENTATION OF THE DOOR SHIFTS
        IT STANDS READY TO OPEN
            EXEC::change('PAGE!!q3unlocked', true);step()
    
    RESPONSES::akizet
        continue<+>END

no
    akizet
        hmm...
        no, no
        we should check these other rooms first

    tozik
        we have enough sfer as is
    
    RESPONSES::akizet
        continue<+>END            
`)

env.dialogues["d3_person_clear"] = generateDialogueObject(`
start
    sourceless
        THE ROOM STANDS SILENT
            EXEC::pauseSwapCam(true)
        IMMEDIATELY, GAKVU GOES TO CHECK A NEARBY QOU
            EXEC::env.embassy.vn({bg: true, tozik: "defocus", gakvu: "defocus"});pauseSwapCam(true)
    
    gakvu
        these ones...
        the attendants were able to break through
    
    sourceless
        SHE IS FROZEN THERE, BY THEIR CORPSE
            EXEC::changeBgm(env.embassy.music_collapse, {rate: 1})
        HER SORROW SPREADS INTO OUR CONNECTORS
        WE HAVE LITTLE TO OFFSET IT 
        BUT I AM NO STRANGER TO ITS BITE
        AND TOZIK PREOCCUPIES HIMSELF WITH LOOKING THROUGH DEBRIS
    
    gakvu
        ...
        this does not make any sense...
        they really are killing <em>everyone</em>...

    sourceless
        WHAT I EXPECTED TO BE SADNESS IN HER VOICE, 
        IS INSTEAD SOMETHING LIKE MORBID CURIOSITY
        TOZIK CEASES HIS RUMMAGING TO WATCH GAKVU FOR AN INSTANT
        I CAN TELL HE WANTS TO PRY, BUT HE DOES NOT
        AND I WOULD RATHER NOT DO THIS NOW...
    
    tozik
        well,
            EXEC::env.embassy.vn({bg: true, tozik: "fullview"})

    sourceless
        TOZIK PULLS A SFER CUBE FROM THE REMAINS OF A CONTAINER
            EXEC::env.embassy.advanceSfer(1, "person_clear")
    
    tozik
        we still need some more sfer
            SHOWIF::'EXEC::env.embassy.enoughSfer(false)'
        we should check the rooms that are not broken
            SHOWIF::'EXEC::env.embassy.enoughSfer(false)'

        we have what we need to fix movefriend
            SHOWIF::'EXEC::env.embassy.enoughSfer(true)'
        we should head back to the relocator
            SHOWIF::'EXEC::env.embassy.enoughSfer(true)'

    RESPONSES::akizet
        continue<+>END
            EXEC::env.embassy.vn({bg: false, tozik: "", gakvu: ""});pauseSwapCam(false)

SKIP::env.embassy.advanceSfer(1, "person_clear");vn.done();pauseSwapCam(false)
`)

env.dialogues["d3r2"] = generateDialogueObject(`
start
    sourceless
        THIS IS...
            EXEC::pauseSwapCam(true)

    gakvu
        hey, it is kazki's room!
            EXEC::env.embassy.vn({gakvu: "fullview"})
        i thought this Î¸tendril looked familiar

    tozik
        what are those?
            EXEC::env.embassy.vn({tozik: "defocus"})
        are those bright weapons?

    sourceless
        DEAD METAL WEAPONRY IS DISPLAYED UPON HER WALL AND TABLE
            EXEC::specialCam("kazkiguns");env.embassy.vn({tozik: "", gakvu: ""})
        THE ARMS OF BRIGHT WARRIORS, FOR USE AGAINST OTHER BRIGHT COUSINS
        A CHILLING THOUGHT

    gakvu
        yes!
        has she never talked to you about her collection?

    tozik
        no
    
    akizet
        i had no idea, either...
        could we use these?

    gakvu
        do you know how a bright weapon works?
        i do not!
    
    akizet
        i have never even seen one used...
        perhaps we could just take a look

    RESPONSES::akizet
        look around<+>END
            EXEC::specialCam(false);pauseSwapCam(false)

SKIP::vn.done();specialCam(false);pauseSwapCam(false)
`)

env.dialogues["d3r2_chest"] = generateDialogueObject(`
start
    sourceless
        I KNEEL BY THE STORAGE PORTION OF THE DISPLAY
            EXEC::pauseSwapCam(true)
        WITH A WAVE OF MY HAND UNDERNEATH ITS MAGNETIC CONNECTOR CYST,
        THE GROUND-CONTAINER LIQUEFIES ITS COVER
        THERE IS FALSE VEILK-SKIN CLOTHING... (FANCY!)
        THERE ARE SOME UPKEEP TOOLS...
        SOME OF THESE ARE TOO POORLY MARKED TO DISCERN,
        BUT I THINK THERE ARE MEMORY CYSTS IN HERE TOO...
        I AM NOT SURE WHAT SHE WOULD WANT US TO BRING, SO,
        I GRAB A FEW OF THESE MEMORY CYSTS, TO GIVE TO HER LATER
            EXEC::change("d3_kazkichest", true)
        AND!!
        THERE ARE A FEW <span definition="INHERITED CONTEXT::${env.ITEM_LIST['restorative'].description}">RESTORATIVE CYSTS</span> WITHIN! SO I TAKE THOSE TOO
            EXEC::env.embassy.conditionalItem('restorative', 4, 'chest')
    
    gakvu
        wait, why is this one coherent?
            EXEC::env.embassy.vn({bg: true, gakvu: "fullview"})
        it feels like what is turning hostile is completely random
    
    tozik
        this has been troubling me too
            EXEC::env.embassy.vn({tozik: "fullview"})
        for example, why are the doors not 'biting' us?
        or the timestopper, why is it cooperating?
        i have an idea...
        but i need to see more
    
    akizet
        barfriend seemed coherent too
        friendly, in fact
        but, we can talk about it later

    RESPONSES::akizet
        keep moving<+>END
            EXEC::change("PAGE!!kazkichest", true);env.embassy.vn({bg: false, tozik: "", gakvu: ""});pauseSwapCam(false)

SKIP::env.embassy.conditionalItem('restorative', 4, 'chest');change("PAGE!!kazkichest", true);vn.done();pauseSwapCam(false)
`)

env.dialogues["d3r2_guns"] = generateDialogueObject(`
start
    sourceless
        I DO NOT EVEN KNOW WHERE TO START
            EXEC::change("PAGE!!checkedguns", true);specialCam("kazkiguns");pauseSwapCam(true)
        TOZIK NONCOMITTALLY TAKES ONE OF THE LARGE ONES BY ITS LONG PART
            EXEC::env.embassy.vn({tozik: "defocus"})
        WHAT IS THAT CALLED?

    tozik
        so many unresponsive little components...
        does it have fuel?
    
    sourceless
        APPREHENSION RUNS THROUGH THE TIMESTOPPER 
        SHARED BY ALL OF US, I THINK
        WE HAVE GOTTEN BY WELL ENOUGH WITH OUR QOU-BODIES SO FAR...
        TRYING TO LEARN HOW TO USE A COUSIN-KILLING WEAPON SEEMS UNHELPFUL
    
    gakvu
        what could these do against corrucystic glass, anyway?

    sourceless
        TOZIK SETS THE WEAPON BACK IN ITS PLACE

    RESPONSES::akizet
        keep looking<+>END
            EXEC::specialCam(false);env.embassy.vn({tozik: ""});pauseSwapCam(false)
`)

env.dialogues["d3r2_postcombat"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";'toggle within system menu if desired'
____END

    sourceless
        TEXEC::env.combat.dynamicReward()
            EXEC::change("PAGE!!kazkiambush", true);env.stage.current.onStep()
        THE CONTAINERS LIE MOTIONLESS, SLOWLY MELTING INTO WASTE
        A NUMBER OF SUBMERGED SHAPES FLOAT TO THEIR SURFACES
        WITH A LITTLE DIGGING, WE FIND SOME SFER CUBES!
            EXEC::env.embassy.advanceSfer(4, "d3r2")
    
    tozik
        that will do
            EXEC::env.embassy.vn({bg: true, tozik: "defocus"})
        we still need some more, though
            SHOWIF::'EXEC::env.embassy.enoughSfer(false)'

        this should be enough, we should head back
            SHOWIF::'EXEC::env.embassy.enoughSfer()'

    RESPONSES::akizet
        continue<+>END
            EXEC::step();env.embassy.vn({bg: false, tozik: ""});pauseSwapCam(false)
    
SKIP::change("PAGE!!kazkiambush", true);env.stage.current.onStep();step();vn.done();pauseSwapCam(false);env.embassy.advanceSfer(4, "d3r2")
`)

env.dialogues["d3r2_containers"] = generateDialogueObject(`
start
    sourceless
        IN THE CORNER ARE A SET OF QUIVERING CONTAINERS
        IF KAZKI HAS ANY SFER STORED, IT WILL BE IN THEM
            EXEC::specialCam('kazkicontainers');pauseSwapCam(true)

    gakvu
        are those ones coherent...?
    
    sourceless
        GAKVU TAKES A STEP CLOSER, REACHING OUT WITH ONE OF HER CLAWS
        SUDDENLY--THE CONTAINERS LUNGE AT HER!

    RESPONSES::akizet
        activate timestopper<+>CHANGE::d3r2_postcombat
            SHOWIF::['gameplay_off', true]
            EXEC::specialCam(false)
            FAKEEND::skip combat
        activate timestopper<+>END
            SHOWIF::['gameplay_off', false]
            EXEC::env.embassy.startKazkiRoomAmbush();specialCam(false)
            FAKEEND::start combat
`)

env.dialogues["d3r2_ambush"] = generateDialogueObject(`
start
    sourceless
        AS WE GO TO LEAVE, THE SOUND OF THE DOOR OPENING IS LOUDER THAN USUAL
        A MINOR MALFUNCTION, MAYBE
        BUT THE CONTAINERS IN THE CORNER, AS IF AWOKEN FROM SLUMBER, SUDDENLY SPRING AT US!!!
            EXEC::specialCam('kazkicontainers');pauseSwapCam(true)

    RESPONSES::akizet
        activate timestopper<+>CHANGE::d3r2_postcombat
            SHOWIF::['gameplay_off', true]
            EXEC::specialCam(false)
            FAKEEND::skip combat
        activate timestopper<+>END
            SHOWIF::['gameplay_off', false]
            EXEC::env.embassy.startKazkiRoomAmbush();specialCam(false)
            FAKEEND::start combat
`)



env.dialogues["d3r1"] = generateDialogueObject(`
start
    sourceless
        AS WE STEP INTO THE ROOM, AN UNFAMILIAR TIR QOU LEAPS AT US
            EXEC::pauseSwapCam(true);env.embassy.vn({miltza: "display far"})

    sourceless
        SHE HOLDS A DISABLER - AN EXTREMELY POTENT CORRUCYSTIC DESTRUCTOR
            EXEC::env.embassy.vn({bg: true, tozik: "defocus", gakvu: "defocus", miltza: "far show"})
        
    miltza
        stay back!!
        wait
        are you...?

    akizet
        relax
        we are not here to hurt you
        but we are looking for materials to repair the movefriend
        do you have anything?

    miltza
        oh...
        yes! here!
    
    sourceless
        SHE DIGS OUT SOME SFER CUBES FROM THE REMAINS OF NEARBY CONTAINERS
            EXEC::env.embassy.advanceSfer(2, "miltza")
        IT LOOKS LIKE SHE KILLED THEM
    
    miltza
        do you have a plan?
        i am miltza!
    
    akizet
        well met, my friend! i am akizet
        this is tozik, and that is gakvu
        and, we are establishing a way out first
        probably to the hangar...
    
    miltza
        have you been able to hear anyone?
        i have been listening for a while now...
        it is mostly that terrible noise, but the people in the hangar are afraid
        i heard murmurs - they are locked, too!
    
    gakvu
        what? how? 
        has anyone tried to fly through the wall?
    
    miltza
        i do not know...
        hey, you seem like good defenders - funny that you are not even kiv!
        here, take my <span definition="INHERITED CONTEXT::${env.ITEM_LIST['disabler'].description}">disabler</span>. you can probably use it better than me, anyway!
            EXEC::env.embassy.conditionalItem('disabler', 2, 'miltzadis')

    akizet
        oh--thank you!
    
    miltza
        i am going to gather some things, then go shelter in the lift

    sourceless
        SHE QUICKLY TURNS TO SEARCH THROUGH HER OVERTURNED FURNITURE
            EXEC::env.embassy.vn({miltza: "display far"})

    akizet
        be safe, my friend. we will see you again soon

    RESPONSES::akizet
        continue<+>END
            EXEC::env.embassy.vn({bg: false, tozik: "", gakvu: "", miltza: ""});pauseSwapCam(false)

SKIP::env.embassy.advanceSfer(2, "miltza");env.embassy.conditionalItem('disabler', 2, 'miltzadis');vn.done();pauseSwapCam(false)
`)


/* 
    POST GATHERING / MOVEFRIEND FIGHT
*/

env.dialogues["d3_relocator_return"] = generateDialogueObject(`
start
    sourceless
        WHEN WE RETURN, TOZIK IMMEDIATELY KNEELS NEAR MOVEFRIEND
            EXEC::specialCam("movefriend_examine");env.embassy.vn({tozik: 'defocus'});pauseSwapCam(true)
        HE SETS THE COLLECTED SFER NEARBY, PREPARING AN AREA FOR HIMSELF TO WORK
        MILTZA WATCHES QUIETLY FROM THE EDGE OF THE ROOM
        SHE WANTS TO HELP, IT IS CLEAR IN HER DOWNWARD RECEPTORS
        BUT SHE IS NO Î¸jut, NOR CYSTIC ENGINEER
    
    tozik
        this is going to take me some time
            EXEC::env.embassy.vn({tozik: 'fullview'});
        i will need you to watch over me while i work
        should we start now?
    
    sys
        ATTENTION::"current memory stream near conclusion"
            EXEC::change('PAGE!!movefriendqueued', true);change("PAGE!!ep3queuecheck", true)
        ADVISE::"save iteration"
        NOTICE::'enable REDUCED INTENSITY within system menu if required'
        NOTICE::"return to entity DISRUPTED MOVEFRIEND to proceed"

    RESPONSES::akizet
        let me think<+>END
            EXEC::env.embassy.vn({tozik: ''});specialCam(false);pauseSwapCam(false)

SKIP::vn.done();specialCam(false);pauseSwapCam(false);change('PAGE!!movefriendqueued', true);change("PAGE!!ep3queuecheck", true)
`)

env.dialogues["d3_relocator_later"] = generateDialogueObject(`
start
    sourceless
        WE APPROACH THE MOVEFRIEND ONCE MORE
            EXEC::specialCam("movefriend_examine");pauseSwapCam(true)
        THE SFER STILL SITS NEARBY, READY TO BE USED
    
    tozik
        ready to get started?
            EXEC::env.embassy.vn({tozik: 'fullview'});
    
    sys
        NOTE::"current memory stream near conclusion"

    RESPONSES::akizet
        do it<+>CHANGE::d3_relocator_repair
            FAKEEND::proceed
        let us look around some more<+>END
            EXEC::env.embassy.vn({tozik: ''});specialCam(false);pauseSwapCam(false)
`)

env.dialogues["d3_relocator_repair"] = generateDialogueObject(`
start
    akizet
        let us begin!
            EXEC::pauseSwapCam(true)
        i would rather not seal these paths, just in case
        gakvu, you watch the path to personnel,
            EXEC::env.embassy.vn({gakvu: "defocus"});
        i will watch the path to recreation
    
    tozik
        all right, stand by
    
    sourceless
        TOZIK KNEELS NEAR MOVEFRIEND'S FACE, PREPARING HIS CORRUSKIVI
        AN INCISION IS MADE IN THE CONSTRUCT'S GLASS, PARTING IT LIKE A GATE
        A PROTECTIVE MEMBRANE FORMS OVER ITS INNARDS TO PREVENT CONTAMINATION
        
    tozik
        it looks like the echo-core is still intact
        from what i can see, just the regulatory cysts are sludged
    
    sourceless
        THE CORRUSKIVI LIQUIFIES, FORMING OVER HIS CLAW FULLY
        HE SPREADS IT TO HIS OTHER ONE, TOO, BECOMING A SET OF GLOVES
        ONE HAND REACHES INTO MOVEFRIEND'S ORGANS, AND HIS OTHER FETCHES SFER TO IMPLEMENT
        I CANNOT CLEARLY SEE WHAT ELSE HE DOES, BUT I ASSUME IT IS SIMPLE REFORMATION
            EXEC::env.embassy.vn({bg: true, tozik: "defocus", gakvu: ""});
        SO I RETURN TO WATCHING MY PATH - GAKVU DOES THE SAME
        ...
        AFTER SOME TIME,
        TOZIK PULLS AWAY FROM MOVEFRIEND
            EXEC::env.embassy.vn({tozik: "focus"});
        A PILE OF METALLIC SLUDGE LIES NEAR HIM, 
        INERT ORGANS PULLED FROM THE UNFORTUNATE CONSTRUCT
        THE SFER CUBES HAVE BEEN MOSTLY CONSUMED, THOUGH WE HAVE A FEW EXTRA
        IN HIS STANCE, I SEE RELIEF
    
    akizet
        all done?

    tozik
        almost. i just need to reseal it
        as soon as i do that, it will activate again
        there does not seem to be anything wrong with the echo core
        just like the barfriend, actually...
        so it should be perfectly functional
        stand by a moment longer

    sourceless
        WITH HIS CORRUSKIVI, HE DRAWS THE EDGES OF THE OPENING TO ONE ANOTHER
        THE CYSTIC GLASS SHIFTS IN DENDRITIC PATTERNS AS IT REDISTRIBUTES
        AND SOON COMPLETELY CLOSES AGAIN
        TRUE TO HIS WORD, MOVEFRIEND'S FAMILIAR FACE FLICKERS BACK TO LIFE
            EXEC::env.embassy.vn({bg: false, tozik: "defocus", gakvu: ""});document.querySelector('#realgrid .lifter').classList.add('fixed')

    RESPONSES::akizet
        hello movefriend!!<+>awaken

awaken
    akizet
        hello movefriend!!!
    
    sourceless
        IT IS SILENT FOR A MOMENT
        PARTS OF ITS FACE PROJECTION FLICKER STRANGELY
    
    movefriend
        HI AKIZETESCHE!
        OH AND TOZIKORIC! GAKVUKANI!
        SO MANY FRIENDS HERE
        VERY COOL!!
        FRIENDS: I DO NOT FEEL VERY GOOD
    
    tozik
        peculiar
        you should be feeling the same as before
        what is wrong?
    
    sourceless
        THE PATHS GAKVU HAD CARVED THROUGH THE WALLS LIQUIFY, CLOSING AGAIN
        GAKVU STUMBLES OUT OF THE WAY, NEARLY CAUGHT IN THE MOVEMENT
        MOVEFRIENDS ARE RARELY SO HAPHAZARD...

    movefriend
        I SHOULD NOT BE AWÂ»AKE
    
    sourceless
        ITS FACE FLICKERS AWAY AND THE ROOM FALLS QUIET
            EXEC::changeBgm(env.embassy.music_p1boss_suspense, {rate: 0.5});document.querySelector('#realgrid .lifter').classList.remove('fixed')
    
    akizet
        Â§kÂºÃ¹
        are we trapped in here again?
    
    tozik
        what could have gone wrong...?
            EXEC::env.embassy.vn({tozik: "defocus"});
        the components were all fine
    
    sourceless
        GAKVU BACKS AGAINST THE INNER WALL OF THE RELOCATOR
            EXEC::env.embassy.vn({bg: true, gakvu: "defocus"});
        A SHARP WAVE OF TERROR RUNS THROUGH OUR CONNECTION
        
    gakvu
        the... 
            EXEC::ratween(env.bgm, 0.75, 10000)
        the groundsmind
        it sees us

    sourceless
        THE AGGRESSOR'S SIGIL FORMS IN PLACE OF MOVEFRIEND'S FACE
            EXEC::env.embassy.vn({bg: false, gakvu: "", tozik: ""});document.querySelector('#realgrid .lifter').classList.remove('fixed');document.querySelector('#realgrid .lifter').classList.add('aggressormode')
        I HEAR THE SOUND OF CORRU SHIFTING BEHIND THE WALLS

    aggressor
        cÃ…4Ã„â€“sT
            EXEC::content.classList.add('painprep', 'painhalf')
        Ã½ÂÃ¦Ã´r,Â§Â½Ã¿lfÃƒ
        Ã„SÂ¿De
    
    sourceless
        A PRESSURE WEIGHS AGAINST OUR MINDS, OUR CORRUCYSTIC ORGANS
            EXEC::content.classList.add('painmode')
        BUT THE TIES TO OUR MINDCORES ARE TOO STRONG - THE OTHERS ARE FINE TOO
        BEFORE WE CAN QUESTION THE ENTITY, SPINES FORM ALONG THE WALLS
        SHARP TENDRILS EMERGE FROM MOVEFRIEND'S FORM IN UNEVEN PATTERNS
        IT INTENDS TO KILL US
        THERE IS NO OTHER CHOICE BUT TO FIGHT
            EXEC::content.classList.remove('painmode')

    RESPONSES::sys
        force thoughtform rules over entity<+>END
            EXEC::env.embassy.startMovefriendBoss('low');env.embassy.vn({tozik: '', gakvu: ''});specialCam(false);content.classList.remove('painprep', 'slowpain')
            FAKEEND::reduced intensity alternative
            SHOWIF::[['low_intensity', true], ['gameplay_off', false]]

    RESPONSES::akizet
        activate timestopper<+>END
            EXEC::env.embassy.startMovefriendBoss();env.embassy.vn({tozik: '', gakvu: ''});specialCam(false);content.classList.remove('painprep', 'slowpain')
            FAKEEND::initiate combat
            SHOWIF::['gameplay_off', false]
        activate timestopper<+>CHANGE::d3_movefriend_finish
            SHOWIF::['gameplay_off', true]
            EXEC::env.embassy.vn({tozik: '', gakvu: ''});specialCam(false);content.classList.remove('painprep', 'slowpain')
            FAKEEND::skip combat

SKIP::env.embassy.skips.d3_relocator_repair()
SKIPTIME::700
`)

env.dialogues["d3_movecmb"] = generateDialogueObject(`
start
    sys
        WARNING::'incoherence detected'

    gakvu
        hey...
        listen
        now that it is controlling movefriend,
        the groundsmind is trying to submerge this entire room
        but i might be able to fight off its control
        i know we just repaired movefriend, but you need to weaken it
        and i need to stay back

    sourceless
        A JOLT OF SHOCK RUNS THROUGH THE TIMESTOPPER CONNECTION
        GAKVU HAS TORN THE CONNECTOR OFF OF HER RECEPTOR
        MILTZA IS FROZEN AT THE FAR END, IN WHAT I ASSUME TO BE TERROR PARALYSIS
        ANOTHER JOLT RUNS THROUGH THE TIMESTOPPER,
        AS GAKVU SHOVES THE CONNECTOR ONTO MILTZA'S RECEPTOR
    
    miltza
        aaaahhh!!
        what is this!!!
        oh... the timestopper? it works remotely?
        
    akizet
        it does indeed
        you need to help us keep movefriend away from gakvu
        do you have any weapons?
    
    miltza
        no... sorry... that disabler was all i had
        but when i was larval, i was a remote coordinator
        i can lend my reflexes to you!

    akizet
        that will do
    
    RESPONSES::akizet
        let us get started<+>END
            FAKEEND::proceed
            EXEC::env.rpg.classList.remove('hideteams')

SKIP::env.rpg.classList.remove('hideteams')
`)

env.dialogues["d3_movespecial"] = generateDialogueObject(`
start
    sourceless
        AROUND MOVEFRIEND, THE WALLS RIPPLE STRANGELY
            EXEC::env.bulletHell.paused = true
        IN ITS SPREADING INFLUENCE, SPIKES FORM OUT OF THE MALLEABLE BLACK CORRU
        BEHIND US, I HEAR GAKVU STRAINING TO HOLD THIS SPACE TOGETHER
        I ONLY HOPE SHE CAN STOP IT FROM SIMPLY CRUSHING US ALL

    sys
        WARNING::'abnormal thoughtform activity detected'
        WARNING::'entity MOVEFRIEND';'altering thoughtspace'
        ANALYSIS::'intention to destroy recollection locus'
        ATTENTION::'utilizing proxy thoughtform';'manually direct away from incoherence'
        ATTENTION::'neural controls adjusted';'direct proxy with primary method of navigation'

    moth
        looks like funfriend was right
            SHOWONCE::
        good luck buddy
            SHOWONCE::
    
    RESPONSES::self
        thanks<+>END
            EXEC::bh_movefriend({level: "tutorial"});env.bulletHell.paused = false
`)

env.dialogues.d3_closeout = generateDialogueObject(`
RESPOBJ::
    RESPONSES::sys
        save and proceed to next segment<+>continue
            SHOWIF::['ENV!!ep3', true]
            FAKEEND::(continue memory)

        save and explore<+>explore
            FAKEEND::(explore current location)

        save and exit<+>savexit
            FAKEEND::(end recollection)

        save and advance log<+>advance
            FAKEEND::(proceed to next day)
            SHOWIF::['ENV!!ep3', false]

        end without saving<+>END
            EXEC::corruRefresh()
            FAKEEND::(end recollection)
`)

env.dialogues["d3_closeout_test"] = generateDialogueObject(`
start
    RESPOBJ::d3_closeout

explore
    sys
        ATTENTION::'saving iteration...'
            EXEC::change("PAGE!!ep2xplore", true)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'
        NOTE::'return to entity movefriend once stream repairs are complete'
            SHOWIF::['ENV!!ep3', false]
        NOTE::'return to entity movefriend when prepared to proceed'
            SHOWIF::['ENV!!ep3', true]
    
    RESPONSES::self
        ok<+>END

continue
    sys
        ATTENTION::'saving iteration...'
            EXEC::change("PAGE!!embassy_day", 3.5)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'
        ATTENTION::'commencing stream transfer'
            EXEC::change("TEMP!!ep2->ep3transfer", true)
    
    RESPONSES::self
        ok<+>END
            EXEC::moveTo("/local/ocean/embassy/golem/")

savexit
    sys
        ATTENTION::'saving iteration...'
            EXEC::change("PAGE!!explore", true)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'
        NOTE::'load iteration';'return to entity movefriend once stream repairs are complete'
            SHOWIF::['ENV!!ep3', false]
        NOTE::'load iteration';'return to entity movefriend when prepared to proceed'
            SHOWIF::['ENV!!ep3', true]

    RESPONSES::sys
        end<+>END
            EXEC::corruRefresh()
            FAKEEND::(end recollection)

advance
    sys
        ATTENTION::'saving iteration...'
            EXEC::change("PAGE!!explore", true)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'

    RESPONSES::sys
        advance log<+>END
            EXEC::env.entities["advance log"].actions[0].exec()
            FAKEEND::(advance to EP3)
`)
env.dialogues["d3_movefriend_finish"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";'toggle within system menu if desired'
____END

    sourceless
        ALL AT ONCE, THE CHAOS STOPS
            EXEC::specialCam("movefriend_examine");changeBgm(page.bgm, {rate: 0.5})
        THE AGGRESSOR'S SIGIL FLICKERS AWAY, 
            EXEC::document.querySelector('#realgrid .lifter').classList.remove('aggressormode')
        AND MOVEFRIEND'S FACE RETURNS
            EXEC::document.querySelector('#realgrid .lifter').classList.add('fixed');change('PAGE!!movefixed', true)

    movefriend
        AAHH!!!
        OH! I AM FREE!
        I AM SO SORRY
        PLEASE UNDERSTAND I WOULD NEVER TRY TO HURT YOU
    
    akizet
        gakvu--is it done?
    
    sourceless
        TOZIK TAKES THE MOVEFRIEND'S APOLOGY AS CONFIRMATION, KNEELING NEAR IT
        HE IS SET ON REPAIRING THE DAMAGE WE HAVE DEALT
    
    gakvu
        yeah...
            EXEC::env.embassy.vn({bg: true, gakvu: 'focus nocon'});

    sourceless
        GAKVU SLUMPS AGAINST THE BACK WALL ACROSS FROM MOVEFRIEND
        NOT FAR FROM HER, THE TREMBLING MINDCORES ARE HUDDLED TOGETHER
        THEY MUST HAVE STAYED IN HER PROTECTIVE RADIUS THROUGH THE ATTACK
        
    gakvu
        i made some changes to this movefriend
        it cannot be controlled by the groundsmind anymore

    sourceless
        A SHARP SUSPICION SPIKES THROUGH OUR SHARED CONNECTION

    miltza
        what? how?
        where did you learn to do that?
    
    sourceless
        GAKVU ONLY SNICKERS IN RESPONSE
        SHE WAVES HER RECEPTORS NEGATIVELY

    gakvu
        sorry, it is a secret!
    
    sourceless
        TOZIK SHIFTS BACK TO HIS FEET
            EXEC::env.embassy.vn({gakvu: 'fullview nocon', tozik: 'fullview'});
    
    tozik
        we should get out of here
    
    akizet
        we should, but...
        miltza - you said the hangar was trapping people, yes?
    
    miltza
        yes!
            EXEC::env.embassy.vn({miltza: "display show focus hascon far", gakvu: 'defocus nocon', tozik: 'defocus'});
        and it did not sound good...
        the messages were intermingled with pain and fear

    akizet
        i see
        let me see if I can get in touch with anyone...
            EXEC::env.embassy.vn({miltza: "display show hascon far", gakvu: 'defocus nocon', tozik: 'defocus'});
    
    sourceless
        FUNFRIEND!
        CAN WE MAKE ANYTHING OUT FROM COMMUNICATIONS YET?
    
    funfriend
        HI AKIZETESCHE!!
        THE NOISE IS STILL MAKING MOST TRANSMISSIONS INCOHERENT
        I CANNOT UNDERSTAND MUCH...
        THE PAIN AND FEAR IS LESSER THAN BEFORE
        BUT I DO NOT THINK THAT IS A GOOD THING

    sourceless
        ...
    
    akizet
        i...
        do not think the hangar is a good option
        but there is no other way away from here

    miltza
        could we survive with the help of the timestopper?
        you are incredible fighters when it is active!!
    
    tozik
        not if the groundsmind have seized our ships, too
        also, that is near the top of the spire...
        which may lie beyond the timestopper's influence

    gakvu
        how far are we from the groundsmindry floor?
    
    sourceless
        A SHORT PAUSE PASSES,
            EXEC::env.embassy.vn({miltza: ''});
        OUR ATTENTION SHIFTING TO GAKVU
        SHE RISES TO HER FEET AGAIN
            EXEC::env.embassy.vn({gakvu: 'defocus nocon'});

    movefriend
        GAKVUKANI! 
            EXEC::env.embassy.vn({bg: false});
        GIVEN THAT WE ARE NEAR THE BASE OF THE SPIRE,
        THERE ARE ONLY THREE Î¸segment BLOCKS BETWEEN THE GROUNDSMINDRY AND HERE
        I CAN TAKE YOU DIRECTLY TO IT!
        AND, RELATIVE TO THE DISTANCE TO THE HANGAR,
        IT IS FAR CLOSER!

    itzil
        that is right!
            EXEC::env.embassy.vn({itzil: 'display show', gakvu: 'nocon defocus', tozik: 'defocus'});
        the golem maintenance Î¸segment block is just below this one!
        and there is a lot of weaponry there, too!!

    gakvu
        you see what i am suggesting
            EXEC::env.embassy.vn({itzil: '', gakvu: 'defocus nocon', tozik: 'defocus'});

    sourceless
        ARE WE REALLY GOING TO DO THIS?
    
    tozik
        it may be the only way we can stop this disaster...
        if the bright cousins are aggressed, they will destroy us
        and likely never let us near their planet again
        we have to stop the groundsmind

    sourceless
        I SHOULD NOT WANT THIS
        BUT IN THIS SHORT TIME, I FELT SUCH EXCITEMENT
        HOW LONG IT HAS BEEN, SINCE I HAVE FELT IT...
        ADRENALINE - OR THE Î¸deathly COUNTERPART OF IT
    
    akizet
        does anyone object?
    
    sourceless
        I EXAMINE MILTZA AND THE TWO EXPOSED QOU
            EXEC::env.embassy.vn({bg: true, karik: 'display show', itzil: 'display show', gakvu: 'hide', tozik: ''});
        MILTZA'S RECEPTORS ARE TWISTED IN CONFLICTION
        BUT THE MINDCORES SPEAK UP FIRST
    
    itzil
        i am not leaving until i save my kivii!

    karik
        maybe we could get into the golems down there and help, too!

    miltza
        i... i do not see any other option
            EXEC::env.embassy.vn({karik: '', itzil: '', miltza: 'show hascon'});
    
    gakvu
        hehehe...
            EXEC::env.embassy.vn({itzil: '', miltza: 'hide hascon', karik: '', gakvu: "defocus nocon"});
        velzie truly has chosen us
            EXEC::env.embassy.vn({gakvu: "focus nocon"});
        movefriend, please take us to the golem maintenance block
            EXEC::env.embassy.fixMovefriend()
    
    sys
        ATTENTION::'memory stream segment end'
            EXEC::env.embassy.vn({bg: false, itzil: '', miltza: 'hide hascon', karik: '', gakvu: "hide nocon"});
        ADVISE::'save iteration'
        NOTICE::'render can continue without incoherence'
        NOTICE::'thoughtform activity detected'::IN::'embassy research center'
            SHOWIF::['PAGE!!archiveopen', false]

____SHOWIF::['ENV!!ep3', false]
        ATTENTION::'next memory stream segment incomplete';'internal note attached'::
    
    funfriend
        hello interloper! please come back in a Î¸wink! i am nearly done with this next part!

____SHOWONCE
    moth
        ok, well... looks like we have to wait a little while again
        i'll keep an eye on the broad activity in the corrucyst
        if i see any changes in these memories, i'll let you know
        i bet funfriend will be done tomorrow with everything i see going on here
        if you want to call it for today, go ahead
____END

____SHOWIF::'ENV!!ep3'
    sys
        ATTENTION::'next memory stream segment available';'continue directly?'
____END

    RESPOBJ::d3_closeout

explore
    sys
        ATTENTION::'saving iteration...'
            EXEC::change("PAGE!!ep2xplore", true)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'
        NOTE::'return to entity movefriend once stream repair is complete'
            SHOWIF::['ENV!!ep3', false]
        NOTE::'return to entity movefriend when prepared to proceed'
            SHOWIF::['ENV!!ep3', true]
    
    RESPONSES::self
        ok<+>END

continue
    sys
        ATTENTION::'saving iteration...'
            EXEC::change("PAGE!!embassy_day", 3.5)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'
        ATTENTION::'commencing stream transfer'
            EXEC::change("TEMP!!ep2->ep3transfer", true)
    
    RESPONSES::self
        ok<+>END
            EXEC::moveTo("/local/ocean/embassy/golem/")

savexit
    sys
        ATTENTION::'saving iteration...'
            EXEC::change("PAGE!!explore", true)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'
        NOTE::'load iteration';'return to entity movefriend once stream repairs are complete'
            SHOWIF::['ENV!!ep3', false]
        NOTE::'load iteration';'return to entity movefriend when prepared to proceed'
            SHOWIF::['ENV!!ep3', true]

    RESPONSES::sys
        end<+>END
            EXEC::corruRefresh()
            FAKEEND::(end recollection)

advance
    sys
        ATTENTION::'saving iteration...'
            EXEC::change("PAGE!!explore", true)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'

    RESPONSES::sys
        advance log<+>END
            EXEC::env.entities["advance log"].actions[0].exec()
            FAKEEND::(advance to EP3)

END::specialCam(false);pauseSwapCam(false)
SKIP::env.embassy.skips.d3_movefriend_finish();change("PAGE!!explore", true);env.embassy.collapseSave({effects: true})
SKIPNOTICE::defaults to save and explore
`)

//return dialogue on a stalled save
env.dialogues["d3_moveend"] = generateDialogueObject(`
start
    sys
        NOTICE::'memory continues in separate stream';'follow stream?'
            SHOWIF::"ENV!!ep3"

____SHOWIF::["ENV!!ep3", false]
    sys
        ERROR::'memory continues in separate stream';'separate stream is corrupt'
        ERROR::'cannot render'
        NOTICE::'reiterating attached internal note'::

    funfriend
        hello interloper! please come back in a Î¸wink! i am nearly done with this next part!
____END

    RESPONSES::self
        ok<+>END
            SHOWIF::"ENV!!ep3"
            EXEC::change("TEMP!!ep2->ep3transfer", true);moveTo("/local/ocean/embassy/golem/")
            FAKEEND::(continue memory)

        not yet<+>END
            SHOWIF::"ENV!!ep3"

        darn<+>END
            SHOWIF::["ENV!!ep3", false]
            FAKEEND::(continue exploring)
    
    RESPONSES::sys
        return to memory selection<+>END
            SHOWIF::["ENV!!ep3", false]
            EXEC::corruRefresh()
            FAKEEND::(end recollection)
`)

/* combat mechanic dialogue */
env.dialogues["d3_genericenemy"] = generateDialogueObject(`
start
    sourceless
        WE ARE BESET BY INCOHERENT FOES
            EXEC::forceSwapCam(true)
        OUR ONLY OPTION IS TO FIGHT

        OR IS IT?
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'
        WE COULD ALSO EXPEND THE DISABLER
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'
        THERE MAY BE A BETTER TIME FOR IT LATER...
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'

    RESPONSES::akizet
        engage<+>END
            SHOWIF::['gameplay_off', false]
            FAKEEND::(begin combat)
            EXEC::env.combat.dynamicCombat()

        bypass<+>END
            SHOWIF::['gameplay_off', true]
            FAKEEND::(bypass combat)
            EXEC::env.combat.dynamicCombat({dry: true});cutscene(true);setTimeout(()=>{cutscene(false);env.combat.dynamicCallback(env.rpg.enemyTeam)}, 1010)

        disable<+>disable
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'
            FAKEEND::(use disabler charge)

disable
    sourceless
        I CAREFULLY LINE UP THE DISABLER
            EXEC::removeItem(env.ITEM_LIST.disabler);
        AND WITH AN IMPULSE THROUGH MY HAND, A NUMBER OF SPECIALIZED SPINES ARE PROJECTED VIOLENTLY OUTWARDS
        THEY NEEDLE OUR FOES, AND IN A BLINK, THEY HAVE STARTED TO MELT
            EXEC::setTimeout(()=>play('shot2', 0.6), 300)
    RESPONSES::akizet
        continue<+>END
            EXEC::env.combat.dynamicCombat({dry: true});cutscene(true);setTimeout(()=>{cutscene(false);env.combat.dynamicCallback(env.rpg.enemyTeam)}, 1010)
            FAKEEND::(wait)
`)

env.dialogues["d3_genericenemyvictory"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";'toggle within system menu if desired'
____END

    sourceless
        OUR FOES LIE DESTROYED
        TEXEC::env.combat.dynamicReward()

    RESPONSES::akizet
        continue<+>END
            EXEC::forceSwapCam(false)
`)

env.dialogues["d3_loss"] = generateDialogueObject(`
start
    sourceless
        A SHARP LIMB STRIKES MY MINDCORE
        ...
            EXEC::content.classList.add('goodbye');ratween(env.bgm, 0.2, 10000);content.classList.add('dying');
        WHAT IS HAPPENING
        EVERYTHING HAS STOPPED
        HELLO?
        TOZIK? GAKVU??
        FUNFRIEND?
        IS ANYONE THERE?
        HELP

    unknown
        ...
            SHOWONCE::

    sys
        ALERT::"recollection locus destroyed";"iteration unable to continue"
        ADVISE::"start new iteration";"load saved iteration"
            SHOWIF::'collapseSave'
        ADVISE::"start new iteration"
            SHOWIF::['collapseSave', false]

    RESPONSES::sys
        return to selection<+>END
            EXEC::moveTo("/local/ocean/embassy/")
`)

env.dialogues["d3_newsavewarning"] = generateDialogueObject(`
start
    sys
        WARNING::"creating a new iteration will clear old iteration configuration"
        WARNING::"proceed only if old recollection iteration is undesirable"
    
    RESPONSES::self
        do it<+>END
            EXEC::cutscene(true);page.newit = 1
            
        nevermind<+>END

END::if(page.newit) {env.embassy.newCollapseIteration(page.newit)}
`)

env.dialogues["d3_partselection"] = generateDialogueObject(`
start
    sys
        WARNING::"creating a new iteration will clear old iteration configuration"
        WARNING::"proceed only if old recollection iteration is undesirable"
        NOTICE::"additionally";"select desired iteration memory stream"
        NOTICE::"two of three total streams available";"third is corrupt"
            SHOWIF::["gol__e4_transition", false]
        NOTICE::"three streams available"
            SHOWIF::"gol__e4_transition"
        DEFINITION::"stream 1";"beginning"
        DEFINITION::"stream 2";"descent";"golem maintenance"
        DEFINITION::"stream 3";"destruction";"groundsmindry"
            SHOWIF::"gol__e4_transition"
    
    RESPONSES::self
        stream 1<+>END
            EXEC::cutscene(true);page.newit = 1
            FAKEEND::(collapse pt 1)

        stream 2<+>END
            EXEC::cutscene(true);page.newit = 2
            FAKEEND::(collapse pt 2)

        stream 3<+>END
            EXEC::cutscene(true);page.newit = 3
            SHOWIF::"gol__e4_transition"
            FAKEEND::(collapse pt 3)
            
        nevermind<+>END

END::if(page.newit) {env.embassy.newCollapseIteration(page.newit)}
`)

/* chats with characters */
env.dialogues.d3_c_responses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::gakvu
        structurism?<+>structurist
            SHOWIF::"PAGE!!recreation_unlocked"
        kazki's room?<+>kazkiroom
            SHOWIF::"PAGE!!kazkiroom"
        coat lights<+>coat

    RESPONSES::tozik
        corruskivi?<+>corruskivi
            SHOWIF::"PAGE!!recreation_unlocked"
        attack theory?<+>theory
            SHOWIF::[["PAGE!!kazkichest"], ["PAGE!!barfriend"]]

    RESPONSES::akizet
        holding up ok?<+>holdingup
        let us continue<+>END
            EXEC::env.embassy.vn({bg: false, tozik: "", gakvu: ""})
`)

env.dialogues["d3_c"] = generateDialogueObject(`
loop
    RESPOBJ::d3_c_responses

start
    sourceless
        WE TAKE A MOMENT TO REST
            EXEC::env.embassy.vn({bg: true, tozik: "fullview", gakvu: "fullview"})
        THOUGH OUR CURRENT BODIES DO NOT REALLY NEED TO,
            SHOWONCE::
        IT IS HELPFUL TO GRANT OUR MINDS SOME PEACE
            SHOWONCE::
        I CAN THINK OF A FEW THINGS TO ASK THE TEAM

    RESPOBJ::d3_c_responses

structurist
    akizet
        gakvu!
            EXEC::env.embassy.vn({tozik: "defocus", gakvu: "focus"})
        about your little joke earlier...

    gakvu
        yeah i know, not the time
    
    akizet
        no, no!
        i was wondering - are you actually a structurist?
        that is a little old-fashioned
    
    gakvu
        hehehe, i see
        no, not actively anyway
        i was larval back when structurism swept ekiva
        and i hated it
        but my parents had their receptors entangled in the structurist song
        they really wanted me to be one of the constructors, too
        so i slowly became an expert in feigning interest

    akizet
        did you work on the okizika?

    gakvu
        for far too long, yes
        all in plain view of the eye
        so dangerous, so boring... 
        it was truly cruel of velzie to not introduce me to death like so many other workers
        though, i would not be here if not for that, so... 
        perhaps there is a greater role for me
    
    RESPONSES::akizet
        perhaps!<+>loop
            EXEC::env.embassy.vn({tozik: "fullview", gakvu: "fullview"})
            FAKEEND::(back)
        
kazkiroom
    akizet
        gakvu!
            EXEC::env.embassy.vn({tozik: "defocus", gakvu: "focus"})
        just in case the spire really does collapse,
        kazki would probably want us to grab some of her things...
        i collected a few of her memory cysts,
            SHOWIF::"PAGE!!kazkichest"
        can you think of anything else?
            SHOWIF::"PAGE!!kazkichest"
        can you think of anything?
            SHOWIF::["PAGE!!kazkichest", false]
    
    sourceless
        GAKVU THINKS IT OVER
        SHE SNICKERS TO HERSELF BEFORE ANSWERING,

    gakvu
        yeah, but...
        her favorite bright weapons are the long ones
        and there is no way we are carrying her clothes
    
    sourceless
        THESE ARE SHAMELESS EXCUSES
        BUT, I AGREE, SO... I JUST NOD
    
    RESPONSES::akizet
        nod nod<+>loop
            EXEC::env.embassy.vn({tozik: "fullview", gakvu: "fullview"})
            FAKEEND::(back)

coat
    sourceless
        GAKVU'S COAT PULSATES WITH AN IMITATION OF GLOWING FUNGUS
            SHOWIF::[["gakpause", false]]
        IN THIS SETTING, IT COULD BE DANGEROUS...
            SHOWIF::[["gakpause", false]]
        
    akizet
        gakvu!!
            SHOWIF::[["gakpause", false]]
        do you mind... turning your coat off?
            SHOWIF::[["gakpause", false]]
        i fear it may draw undue attention
            SHOWIF::[["gakpause", false]]
    
    gakvu
        oh, sure
            SHOWIF::[["gakpause", false]]
    
    sourceless
        ITS LIGHTS FADE, A DULL PATTERN REMAINING
            EXEC::content.classList.add('gakpause')
            SHOWIF::[["gakpause", false]]

    sourceless
        ON SECOND THOUGHT... I MISS THE GLOW
            SHOWIF::"gakpause"
        YES, IT LOOKS VERY COOL
            SHOWIF::"gakpause"
        IF I AM TAKING THE LEAD ANYWAY, IT WILL HAVE NO EFFECT
            SHOWIF::"gakpause"
        
    akizet
        gakvu!!
            SHOWIF::"gakpause"
        you should turn your coat back on
            SHOWIF::"gakpause"
        it is no harm!
            SHOWIF::"gakpause"
    
    gakvu
        uh, really? ok
            SHOWIF::"gakpause"
    
    sourceless
        ITS LIGHTS RETURN, SHIFTING ACROSS THE FALSE FABRIC
            EXEC::content.classList.remove('gakpause')
            SHOWIF::"gakpause"
    
    RESPONSES::akizet
        thank you!<+>loop
            EXEC::env.embassy.vn({tozik: "fullview", gakvu: "fullview"});change("gakpause", !check("gakpause"))
            FAKEEND::(back)

corruskivi
    akizet
        tozik!
            EXEC::env.embassy.vn({tozik: "focus", gakvu: "defocus"})
        i did not realize you kept a corruskivi on you
        or is it just a lucky coincidence?
    
    sourceless
        TOZIK LOOKS AT HIS CORRUSKIVI THOUGHTFULLY,
        CURLING THE FINGER IT IS ANCHORED TO
        I CAN SEE NOW IT IS SOMEWHAT ORNATE,
        PALE FAUX-PARII ARMOR SEGMENTS SIT LOOSELY ON ITS CORRUCYSTIC GLASS
        SEPARATED PROBABLY TO ALLOW FOR IT TO RESHAPE ITSELF FREELY

    tozik
        ah... it was a gift
        a parting present from a team-member back home
        i like to keep it internally, even if we do not work on golems normally
    
    akizet
        what did you do back then?
        
    tozik
        surface sentry maintenance
        i miss the team, but it was for the best
        with the amount of focus and tireless care they require,
        my growing disinterest would have gotten someone hurt
        besides, what greater work is there than to solve the call?
        even if... we are now in this situation
    
    RESPONSES::akizet
        we will make it through<+>loop
            EXEC::env.embassy.vn({tozik: "fullview", gakvu: "fullview"})
            FAKEEND::(back)

theory
    akizet
        tozik!
            EXEC::env.embassy.vn({tozik: "focus", gakvu: "defocus"})
        we still know so little, but... what do you think is happening?
        what could be affecting our constructs like this?
    
    sourceless
        TOZIK IS HESITANT TO ANSWER
        HE HATES TALKING ABOUT THINGS BEFORE HE CAN FULLY EXPLAIN THEM...
        BUT I CAN SEE HIS THOUGHTS FORMING IN THE SLIGHT SWAY OF HIS RECEPTORS
    
    tozik
        i still have that question in my mind, too...
        but i believe it cannot solely be from the groundsmind
        if it were, all constructs would have that strange spiral sigil projected
        and it would not be affecting the veilklights, nor the containers
        yet it is only some veilklights, only some containers... 
        the inconsistency is what troubles me most
        at the end of it, the only thing i know...
        is that it has something to do with that signal we heard
    
    RESPONSES::akizet
        i see<+>loop
            EXEC::env.embassy.vn({tozik: "fullview", gakvu: "fullview"})
            FAKEEND::(back)

holdingup
    akizet
        how are you both?
        i am doing fine
            SHOWIF::'EXEC::page.party[0].hp >= 12'
        i could use some repairs, but i am ok, myself
            SHOWIF::'EXEC::(page.party[0].hp < 8) && (page.party[0].hp > 3)' 
        i am critical... i need to use a restorative
            SHOWIF::'EXEC::page.party[0].hp <= 3'

    gakvu
        good!
            SHOWIF::'EXEC::page.party[1].hp == 10'

        ok
            SHOWIF::'EXEC::(page.party[1].hp > 4) && (page.party[1].hp < 10)'
        only a few minor segments of my qou-body are compromised
            SHOWIF::'EXEC::(page.party[1].hp > 4) && (page.party[1].hp < 10)'
        not pleasant, but... nothing worth stopping for
            SHOWIF::'EXEC::(page.party[1].hp > 4) && (page.party[1].hp < 10)'

        i have never been hurt like this before... it is terrifying
            SHOWIF::'EXEC::page.party[1].hp <= 4'
        but my mind-core is intact, and that is all that matters
            SHOWIF::'EXEC::page.party[1].hp <= 4'

    tozik
        fine
            SHOWIF::'EXEC::page.party[2].hp > 5'
        my qou-body is fractured in some places - need some real repairs
            SHOWIF::'EXEC::page.party[2].hp <= 5'
        do we have a restorative anywhere?
            SHOWIF::'EXEC::page.party[2].hp <= 5'

    sys
        ADVISE::'utilize PARTY MENU';'attached to SPATIAL NAVIGATION';'associated with Z'
            SHOWIF::'EXEC::partyHasLowHealth() && (checkItem(env.ITEM_LIST.restorative) > 0)'
        ADVISE::'utilize RESTORATIVE CYST outside of combat to restore full health'
            SHOWIF::'EXEC::partyHasLowHealth() && (checkItem(env.ITEM_LIST.restorative) > 0) '
        NOTE::'no RESTORATIVE CYST in inventory'
            SHOWIF::'EXEC::partyHasLowHealth() && (checkItem(env.ITEM_LIST.restorative) == 0)'
    
    RESPONSES::akizet
        understood<+>loop
            FAKEEND::(back)

SKIP::vn.done()
`)

/* 
    chat with miltza within either her room or the relocator
*/
env.dialogues.d3_miltza_resp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        do you need any help?<+>help
            SHOWIF::"EXEC::env.stage.name == \`embassy_cquarters1\`"
        division?<+>division
        ask about art<+>art
        let us continue<+>END
            EXEC::env.embassy.vn({bg: false, miltza: ""});pauseSwapCam(false)
`)
env.dialogues.d3_miltza_artresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        veilk?<+>veilk
        eye?<+>eye
        taking it with?<+>taking
        back<+>loop
            FAKEEND::(back)
`)

env.dialogues["d3_miltza"] = generateDialogueObject(`
loop
    RESPOBJ::d3_miltza_resp
art
    RESPOBJ::d3_miltza_artresp

start
    sourceless
        MILTZA RUMMAGES THROUGH HER BARRICADE FOR SOMETHING
            EXEC::env.embassy.vn({bg: true, miltza: "display show far"});pauseSwapCam(true)
            SHOWIF::'EXEC::env.stage.name == \`embassy_cquarters1\`'
        CLAWING THROUGH SLUDGED CONTAINERS... SOMETHING IMPORTANT, MAYBE
            SHOWIF::'EXEC::env.stage.name == \`embassy_cquarters1\`'

        MILTZA IDLES WITHIN THE RELOCATOR, WAITING FOR US TO FIX IT
            EXEC::env.embassy.vn({bg: true, miltza: "display show far"});pauseSwapCam(true)
            SHOWIF::'EXEC::env.stage.name != \`embassy_cquarters1\`'
        I DO NOT THINK SHE COULD HELP SAFELY WITHOUT A TIMESTOPPER CONNECTOR
            SHOWIF::'EXEC::env.stage.name != \`embassy_cquarters1\`'

        BUT IN THIS MOMENTARY PEACE, I CAN SPEAK WITH HER
            EXEC::env.embassy.vn({bg: true, miltza: "display show focus"})

    RESPOBJ::d3_miltza_resp

help
    sourceless
        SHE IS DIGGING INTENSELY THROUGH THE RUBBLE OF HER LITTLE BARRICADE...
    
    akizet
        miltza, are you looking for something in particular?
        perhaps we could help!
    
    miltza
        ah, no no!
        it is ok! you go ahead
        i will be along shortly!

    RESPONSES::akizet
        ok<+>loop
            FAKEEND::(back)

division
    akizet
        miltza!!
        what initiative are you in? 
        i do not think i have seen you around

    miltza
        ohh, i am in the wisdom initiative!
        particularly the exchange subdivision!
        
    akizet
        really?
        your quarters are quite low in the spire
    
    miltza
        yes, they are,
        but the thought of being so high up...
        it is silly and larval, but i cannot rest so far from the ground
        i do not mind the climb!
        well... <em>did</em> not... 
        i do not think things are ever going to be the same when this is over
    
    RESPONSES::akizet
        we will see<+>loop
            FAKEEND::(back)

veilk
    akizet
        miltza!!
        i saw those veilk sculptures in your room!
        they looked very nice
        you even got their eyes right
        do you make them often?

    miltza
        ahehe, yes, actually!
        i make sculptures and little golems of all obeski life,
        but it is hard to do that without making many veilk
        the cousins adore them, especially the ones that move
        i had just completed and sent through a collection of ekiva veilk,
        some even with their tendril adornments!
        so, i was working on that vaznian species next...
        ahh, what a shame!!

    RESPONSES::akizet
        you will get the chance again!<+>art
            FAKEEND::(back)

eye
    akizet
        miltza!!
        the eye mural you were working on,
        it was remarkable, but uncanny...
        what does it mean?

    miltza
        hehe, you are not the first to say this
        it is old pre-structurist symbology from my home in ekiva
        akaniva - have you ever been?

    akizet
        hmmm... no
        i only know that is near the coast facing vazni

    miltza
        yes!! well,
        my ancestors portrayed the eye in grotesque ways, to insult it
        a sort of payback for velzie's games
        of course, that was nearly all lost in the okizika unison...
        but i feel that portraying the many views of the eye to the cousins is important
        even dead views!
        it was also going to change into the structurist view, and then a central vaznian view, and some others...
        but, in this giggle of velzie we find ourselves in, 
        only the akanivik view was completed

    RESPONSES::akizet
        ironic<+>art
            FAKEEND::(back)

taking
    akizet
        miltza!!
        will you be bringing any of your current work with?
    
    miltza
        no, no--i am not even sure if we will be unable to return
        but i have taken the archival cores i store my designs on
        so - it is only a minor loss if they are lost!

    RESPONSES::akizet
        that is good<+>art
            FAKEEND::(back)

SKIP::vn.done()
`)

/* 
    chat with the mindcores in the relocator 
*/
env.dialogues.d3_mind_resp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        do you need us to grab anything?<+>grab
        doing ok?<+>ok
        golem weapon?<+>bstrd
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.sorry_cyst)'
        let us continue<+>END
            EXEC::env.embassy.vn({itzil: "", karik: "", bg: false});pauseSwapCam(false)
`)

env.dialogues["d3_mind"] = generateDialogueObject(`
loop
    RESPOBJ::d3_mind_resp
start
    sourceless
        ITZIL AND KARIK QUIETLY CHATTER TO ONE ANOTHER IN THE CORNER
            EXEC::pauseSwapCam(true)
        WHEN I APPROACH, THEY STOP AND LOOK UP
            EXEC::env.embassy.vn({karik: "display", itzil: "display"});
        I KNEEL TO SPEAK TO THEM, WHICH I AM NOT SURE IF I SHOULD DO
            EXEC::env.embassy.vn({itzil: "display show", karik: "display show", bg: true});
        BUT STANDING AND TALKING DOWN TO THEM SEEMS DISRESPECTFUL    

    RESPOBJ::d3_mind_resp

bstrd
    sourceless
        I PRESENT THE DAMAGED SCHEMATIC CYST TO THE PAIR
        ONE OF THEM WAS A GOLEM MAINTENANCE TECH, RIGHT?

    akizet
        do either of you know what this is?
        we found it in an archival vein nearby...
        it is a golem weapon, but too damaged to understand
        do you think we can fix it?

    sourceless
        ITZIL SKITTERS CLOSER, A BRANCHED PSEUDORECEPTOR REACHING OUT
        THEY CONNECT, EYE SHIFTING AROUND THOUGHTFULLY

    itzil
        yes! it is bathed in incoherence, but...
        i think it is only affecting connective tissue...
        the parts are all there, they are just not communicating
        there are foundry vats in the golem maintenance floor that can fix this!
        i am kind of new to golem maintenance, a transfer-in...
        if my receptors did not give it away! ahaha
    
    sourceless
        ITZIL DISCONNECTS, WIGGLING THE BRANCHES OF THEIR RECEPTORS LIKE FINGERS

    itzil
        but!! i know enough to fix something like this!
    
    akizet
        excellent! we will be counting on you, itzil

    itzil
        oh...

    tozik
        do you know why there would be a golem weapon schematic, here?
        most offensive measures were placed in subsurface storage after first contact, right?
        
    itzil
        ummm, well,
        yes!
        but, this is probably one of the new ones...
        there is an initiative between materials and maintenance in creating weaponry based on bright weapons!
        at least, there was, before this happened... 

    akizet
        really? a large one?

    itzil
        not really, it was a handful of researchers...
        i knew, umm, know, a Î¸jut who was involved
        and he said in the simulations they ran, it really tears through secri!!
        imagine if we could employ bright weaponry back home! 
        the surface would finally be solved!
    
    sourceless
        I HEAR GAKVU NEARLY CHUCKLE, THOUGH IT IS QUIET

    akizet
        hmm... maybe

    RESPOBJ::d3_mind_resp

grab
    akizet
        we have access to the adjacent personnel Î¸tendril
        do either of you need us to grab anything for you?

    itzil
        no thank you! i live down in golem maintenance
    
    karik
        ahhaha, i hold all i need in my mind!
        and... my room is very heavily locked,
        because a friend kept breaking in...
    
    akizet
        that does not really sound like a friend

    karik
        no no, she is a vel qou!
        if she did not play her jokes on me, she would die!
        ...
        i hope this was one of her gazes with the bright cousins

    RESPONSES::akizet
        me too<+>loop
            FAKEEND::(back)

ok
    akizet
        are you both all right?
        how are your mindcore reserves?

    itzil
        plenty!
        this is all very frightening, but...
        i am very happy you are helping us!

    karik
        if you happen to have any sfer left over after the repairs,
        i could use some!
        i swap between a few qou-bodies, so...
        sometimes i forget to feed

    RESPONSES::akizet
        that can be arranged<+>loop
            FAKEEND::(back)

SKIP::vn.done()
`)

/* alt version - there's a strange flash and shake when the team re-enters the research chamber
    one of the walls looks weak... 
*/
env.dialogues["d3_bstrdreveal"] = generateDialogueObject(`
start
    sourceless
        AS WE ENTER THE CALL RESEARCH CHAMBER ONCE MORE,
        A STRANGE RUMBLING NEARLY TURNS US OFF OUR FEET
        THE WALLS BULGE OUTWARDS AS THE COMPONENTS OF THE SPIRE SINK OVER ONE ANOTHER
        AND JUST AS SUDDENLY, IT STOPS
    
    akizet
        what just...--??

    sourceless
        GAKVU SEEMS TO REALIZE SOMETHING, SPRINTING OVER TO THE DAMAGED WALL
            EXEC::specialCam("archivesopen");env.embassy.vn({gakvu: 'defocus'});;pauseSwapCam(true)
        SHE FEELS AT IT, THEN SEEMS TO HUG IT
        A WAVE OF JOY PASSES THROUGH OUR SHARED CONNECTION
        IT IS ENOUGH TO QUELL THE LINGERING FEAR OF BEING CRUSHED
    
    gakvu
        ahh, a light in this hateful Î¸gaze...!
        i take it all back, velzie!!
    
    sourceless
        THE SHEER ABSURDITY OF HER REACTION BRINGS A CHUCKLE EVEN TO TOZIK

    akizet
        what...?
        
    sourceless
        GAKVU EXTENDS A HAND TOWARDS THE DAMAGE, CAUSING THE WALLS TO GIVE WAY
            EXEC::change("PAGE!!archiveopen", true)
        A DELUGE OF SPIREBLOOD SPILLS FORTH, BUT BEYOND IT IS A TUNNEL...
            EXEC::env.stage.current.onStep()
    
    gakvu
        an archival vein just collapsed!
            EXEC::env.embassy.vn({gakvu: "fullview"})
        right before us, directly into our Î¸segment of the spire!
        can you even imagine the chances??

    sourceless
        THIS IS TERRIBLE NEWS
        THE SPIRE REALLY IS COLLAPSING
        HOW MUCH TIME DO WE REALLY HAVE TO DO THIS...?
        BUT - SHE IS RIGHT TO BE EXCITED IN THE SHORT TERM
        THERE WILL BE PLENTY WE CAN USE WITHIN
        THE VEINS CARRY ALL DELIVERIES AND KNOWLEDGE

    tozik
        like a herd of veilk parting just for us
            EXEC::env.embassy.vn({tozik: "defocus"})

    akizet
        we should think about this first...
            EXEC::env.embassy.vn({gakvu: "", tozik: ""})
        if the archival golems are compromised, it will be extremely dangerous
        i am sure we can find what we need to continue elsewhere
        but... maybe it could be worth it

    RESPONSES::akizet
        think about it<+>END
            EXEC::specialCam(false);pauseSwapCam(false)

SKIP::vn.done();specialCam(false);pauseSwapCam(false);change("PAGE!!archiveopen", true);step();env.stage.current.onStep()
`)

/* Walking down the strange hallway connected to the tunnel, the memory is suddenly paused and interjected by the BSTRD - occupies the main screen during dialogue */
/* It greets the player violently, welcoming them to EVIL MODE */
env.dialogues.d3_bstrdintro_responses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        what did you do?<+>what
        who are you?<+>who
        this evil mode worked?<+>why
            SHOWIF::"e3a2__bstrdmeet"
        move on<+>bye
            FAKEEND::(end chat)
            SHOWIF::'embassy__d3_bstrdintro-what'
`)

env.dialogues["d3_bstrdintro"] = generateDialogueObject(`
start
    sourceless
        WE ARE BESET BY INCOHERENT FOES
        OUR ONLY O

    sys
        ERROR::'memory stream halted'
            EXEC::env.embassy.vn({bg: true, bstrdface: 'display'})

    moth
        huh?
            SHOWONCE::
    
    bstrd
        SURPRISE!!!!!
            EXEC::changeBgm(env.embassy.music_bstrd, {length: 2000});env.embassy.vn({bg: true, bstrdface: 'display show'})
        this part of da memory hase been chosen 2 become... EVIL MODE!!!
        time 2 die INTRALKOBER >%^)
            SHOWIF::"e3a2__bstrdmeet"

____SHOWONCE::
____SHOWIF::"e3a2__bstrdmeet"
    moth
        oh, weird
        looks like it can actually work with this memory vs the golem maintenance one
        i wonder what the difference is?

____SHOWIF::["e3a2__bstrdmeet", false]
    moth
        oh shit
        god damn it. i should have double checked the data
        i think we gave the memory a virus
        ok - don't panic
        the corrucyst is too alien to support it outside of its framework
        so, this thing is limited to the collapse memory

    bstrd
        :-0 ??

    moth
        and actually, it looks like it isn't exactly malicious...?
        idk see what's up

    bstrd
        helloe?? any1 HOME? :|
        THOUGHTS ?????
____END

    RESPOBJ::d3_bstrdintro_responses

who
    self
        WHO ARE YOU?

    bstrd
        :U
        BSTRD
        STUPID u know me :P
            SHOWIF::"e3a2__bstrdmeet"
        im here 2 make u have FUN!!!
        framing devices r boring sometimes......
        so i take a litel part to improve
        to enjoy if u wish ?
        >:)
        
    RESPOBJ::d3_bstrdintro_responses

why
    self
        you were able to make evil mode here?
        why? you were having trouble
    
    bstrd
        THIS 1'S is TINY
        :b
        ok questions creature? 
        anmswer GOOD ENOUgH 4 u?
        there IS A games waiting.. '_' ... 
                
    RESPOBJ::d3_bstrdintro_responses
        
what
    self
        WHAT DID YOU DO TO THE MEMORY?
    
    bstrd
        UMMM, NOTHING..............???
        LOL :P JK
        i told u its evil mode
        its... XTRA HARD!!!
        turn back if u dont like it....
        but maybe u willl .. . ?? 
    
    self
        DID YOU ALTER THE EVENTS?
        IS ANY OF THIS REAL?

    bstrd
        '_'
        they rly did MOST of this
        :V
        im just making it cooler

____SHOWONCE::
____SHOWIF::["e3a2__bstrdmeet", false]
    moth
        oh, i see...
        ok, this only looks like a virus
        it's actually a part of the framing device
        an extra hard mode... probably only targets less important parts of the memory, at least i hope
        look, if you don't like what's going on, you can probably turn around and skip this part
        totally up to you
____END
        
    RESPOBJ::d3_bstrdintro_responses

bye
    bstrd
        :V
        NO 'THANK U'??
        W/E
        SEE U SOON >:p

    sys
        ATTENTION::'memory stream resumed'
            EXEC::revertBgm();env.embassy.vn({bg: false, bstrdface: ''})

    sourceless
        PTION IS TO FIGHT
        TO USE A DISABLER CHARGE SO SOON WOULD BE FOOLISH
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'

    RESPONSES::akizet
        engage<+>END
            FAKEEND::(begin combat)
            SHOWIF::['gameplay_off', false]
            EXEC::env.combat.dynamicCombat();env.embassy.vn({bg: false, bstrdface: ''})
        bypass<+>END
            SHOWIF::['gameplay_off', true]
            FAKEEND::(bypass combat)
            EXEC::env.combat.dynamicCombat({dry: true});cutscene(true);setTimeout(()=>{cutscene(false);env.combat.dynamicCallback(env.rpg.enemyTeam)}, 1010);env.embassy.vn({bg: false, bstrdface: ''})
`)

env.dialogues["d3_bstrdnointro"] = generateDialogueObject(`
start
    sourceless
        WE ARE BESET BY INCOHERENT FOES
        OUR ONLY OPTION IS TO FIGHT
        TO USE A DISABLER CHARGE SO SOON WOULD BE FOOLISH
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'

    RESPONSES::akizet
        engage<+>END
            FAKEEND::(begin combat)
            SHOWIF::['gameplay_off', false]
            EXEC::env.combat.dynamicCombat();env.embassy.vn({bg: false, bstrdface: ''})
        bypass<+>END
            SHOWIF::['gameplay_off', true]
            FAKEEND::(bypass combat)
            EXEC::env.combat.dynamicCombat({dry: true});cutscene(true);setTimeout(()=>{cutscene(false);env.combat.dynamicCallback(env.rpg.enemyTeam)}, 1010);env.embassy.vn({bg: false, bstrdface: ''})
`)

/* 
    in the intro tunnel, there's an archival golem that goes forth to attack you - killing it is easy since it takes time to attack
    the team marvels at how tough it is, but also how ineffective it is
*/
env.dialogues["d3_archiveintro"] = generateDialogueObject(`
start
    sourceless
        OUR FOES LIE DESTROYED
        TEXEC::env.combat.dynamicReward()
        ...
        REALLY, A SATIK CYST? HERE? HOW PECULIAR...
        I TURN IT OVER IN MY CLAWS, ITS MYRIAD APPLICATORS STARING BACK AT ME
        PERHAPS THE ARCHIVAL VEIN'S DELIVERY CENTER HAD A BATCH
        BUT IT MUST NOT HAVE BEEN INTENDED FOR OUR SPIRE Î¸segment...

    gakvu
        ah! how clumsy that thing was!

    tozik
        alone, perhaps...
        but if we have to deal with multiple further within,
    
    sourceless
        TOZIK PAUSES AS HE REALIZES,
            SHOWIF::'EXEC::page.party.inventory.filter(i => i[0].slug != \`sfer_cube\`).length == 0'
        WE HAVE NO MATERIALS FOR USE IN COMBAT
            SHOWIF::'EXEC::page.party.inventory.filter(i => i[0].slug != \`sfer_cube\`).length == 0'
        HIS RECEPTORS ARE SUDDENLY CRUSHED DOWNWARDS
            SHOWIF::'EXEC::page.party.inventory.filter(i => i[0].slug != \`sfer_cube\`).length == 0'


        TOZIK TURNS OVER THE MATERIALS WE HAVE ACQUIRED SO FAR
            SHOWIF::'EXEC::page.party.inventory.filter(i => i[0].slug != \`sfer_cube\`).length'
        KAVRUKAS,
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.kavruka)'
        AIMA CYSTS,
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.aima_cyst)'
        RESTORATIVE CYSTS...
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.restorative)'

    tozik
        we should put these to work
            SHOWIF::'EXEC::page.party.inventory.filter(i => i[0].slug != \`sfer_cube\`).length'
        we should probably be very, very careful
            SHOWIF::'EXEC::page.party.inventory.filter(i => i[0].slug != \`sfer_cube\`).length == 0'

    RESPONSES::akizet
        continue<+>END
`)

/* The central door that's right in front of you when you enter the main hallway is locked,
    (with big stupid bstrd padlock)
   and attempting to open it reveals that BSTRD is holding it shut - it tells the characters they have to get some stuff first
   they need a crimson corrucyst from the archival core, (bright weaponry usage cyst it's marked)
   and a black box from the delivery room (assault rifle in human container)
   then it'll open up and show them the cool stuff inside
*/
env.dialogues["d3_archivedoor"] = generateDialogueObject(`
start
    sourceless
        THE SENSITIVE MATERIALS CHAMBER OF THE ARCHIVAL VEIN, ITS DOOR...
            EXEC::specialCam('bstrdoor');pauseSwapCam(true)
        WHAT IS THIS?
        I HAVE NEVER SEEN THIS MATERIAL IN MY LIFE, NOR MY Î¸death

    akizet
        gakvu, tozik, do you know what this is...?
    
    sourceless
        SHE IS SIMILARLY PUZZLED, HER RECEPTORS SHAKING NEGATIVELY
    
    gakvu
        a product of the aggressing groundsmind, maybe?
        i... i do not think it is corru

    bstrd
        '_'
            EXEC::specialCam('bstrdface')
        hi
    
    moth
        oh my god it put itself in the memory
            SHOWONCE::

    sourceless
        I SHRIEK AS THE DOOR SPEAKS TO US
        THE VOICE... IT IS SO TERRIBLY UNNATURAL
        GAKVU IS UNPERTURBED, I CAN FEEL SHE EVEN FINDS IT A LITTLE FUNNY

    gakvu
        hello!
        will you let us in?
            EXEC::env.embassy.vn({gakvu: "defocus"})

    akizet
        ah... ye--yes,
        we are trying to recover enough materials to escape

    bstrd
        oh thats cool :P
        YA i let u in
        but u gotta do a favor for me first
        go get my cool orb thingy from the left
        n get me a scary black box from the right
        theres some C00L stuff in here... 
        u wont wanna miss it!!
        :-)

    sourceless
        IT SPEAKS SO HAPHAZARDLY - WITH STRANGE CONTRACTIONS IN PLACE OF WORDS
        IT IS AS IF IT IS SPEAKING A LANGUAGE I HAVE NEVER LEARNED
        AND YET, I CAN STILL UNDERSTAND...?
    
    gakvu
        akizet, this is <em>not</em> the groundsmind
    
    tozik
        it is more like a rogue golem
            EXEC::env.embassy.vn({tozik: "defocus"})
        maybe damaged by the signal...?

    bstrd
        :U
        ZZZZ
        ya im a golem or w/e
        go get the stuff ok? bye
    
    sourceless
        THE SIGIL LEAVES US ABRUPTLY
            EXEC::specialCam('bstrdoor')
        BEFORE WE LEAVE, TOZIK EXPERIMENTALLY GRASPS ONE OF THE STRANGE TENDRILS
        HE BRINGS UP HIS CORRUSKIVI, THOUGH IT ONLY CREATES A TERRIBLE GRINDING NOISE ON CONTACT

    tozik
        this material is not corru
        it is remarkably tough... 
        i wish i could save a piece of it for later

    RESPONSES::akizet
        continue<+>END
            EXEC::change("PAGE!!triedarchivedoor", true);specialCam(false);env.embassy.vn({gakvu: "", tozik: ""});pauseSwapCam(false)
`)

env.dialogues["d3_archivedoorlocked"] = generateDialogueObject(`
start
    sourceless
        THE DOOR AND ITS STRANGE MATERIAL LIE UNMOVING, NO MATTER WHAT WE DO
        WE NEED TO GET THE 'COOL ORB THINGY' AND 'SCARY BLACK BOX'

    RESPONSES::akizet
        continue<+>END
`)

env.dialogues["d3_archivecore"] = generateDialogueObject(`
start
    sourceless
        THE ROOM IS DEATHLY STILL, ASIDE FROM THE DRIPPING OF SPIREBLOOD FROM THE MELTING CEILING
    
    gakvu
        is that it over there?
            SHOWIF::[["PAGE!!triedarchivedoor", true]]
        the 'cool orb thingy'?
            SHOWIF::[["PAGE!!triedarchivedoor", true]]

        what is that?
            SHOWIF::[["PAGE!!triedarchivedoor", false]]

    sourceless
        GAKVU POINTS FORTH TO AN EYE-PIERCING MONOLITH
            EXEC::specialCam('bstrdcyst1');pauseSwapCam(true)
        IT SEEMS TO BE MADE OF THE SAME STRANGE MATERIAL FROM BEFORE...
            EXEC::addItem(env.ITEM_LIST.cool_orb_thingy)
        AND OVER IT, FLOATS AN IMPORTANT-LOOKING CORRUCYST
        TOZIK WALKS FORTH TO TAKE IT, ATTEMPTING TO CONNECT TO IT...
            EXEC::env.embassy.vn({tozik: "fullview"});env.stage.current.hidePillarCyst();
        BUT HE SIMPLY SMASHES IT AGAINST HIS RECEPTOR UNEXPECTEDLY - ITS GLASS DOES NOT PART AS USUAL
        HE STUMBLES FROM THE IMPACT

    tozik
        ah...
        ow...

    sourceless
        HE STILL ALLOWS HIMSELF TRUE PAIN? HOW SILLY

    gakvu
        let me see!
            EXEC::env.embassy.vn({gakvu: "defocus"})

    sourceless
        SHE SKITTERS CLOSER, AND I EXPECT HER TO SNATCH IT FROM HIS CLAWS,
            EXEC::env.embassy.vn({gakvu: "fullview"})
        BUT INSTEAD, SHE INSPECTS HIS HEAD AND RECEPTOR FIRST
        <em>THEN</em> SHE SNATCHES IT FROM HIS CLAWS,
        PEERING INTO ITS ODDLY COLORED SKIN

    gakvu
        it is... alive,
        but yes - it seems to be a receptor-lock
        look!

    sourceless
        GAKVU TURNS THE CYST OVER IN HER CLAWS, TAPPING ITS MARKING
        A PIGMENTATION SIGIL THAT READS, 'ON THE USE OF BRIGHT WEAPONRY'

    gakvu
        maybe that thing keeping the door locked...
            SHOWIF::[["PAGE!!triedarchivedoor", true]]
        is just a very strange qou from materials...?
            SHOWIF::[["PAGE!!triedarchivedoor", true]]
        who wants to preserve their research??
            SHOWIF::[["PAGE!!triedarchivedoor", true]]

        is this kazki's? why is it so strangely highlighted?
            SHOWIF::[["PAGE!!triedarchivedoor", false]]

    akizet
        without a doubt
            SHOWIF::[["PAGE!!triedarchivedoor", false]]
        let us bring it along - it is small enough
            SHOWIF::[["PAGE!!triedarchivedoor", false]]
        and we should continue looking around!
            SHOWIF::[["PAGE!!triedarchivedoor", false]]
        there must be something else going on in this vein...
            SHOWIF::[["PAGE!!triedarchivedoor", false]]

        maybe...
            SHOWIF::[["PAGE!!triedarchivedoor", true]]
        either way, we have the 'cool orb thingy'.
            SHOWIF::[["PAGE!!triedarchivedoor", true]]
        let us fetch the other thing--the 'black box'?
            SHOWIF::[['EXEC::checkItem(env.ITEM_LIST.scary_black_box)', false], ["PAGE!!triedarchivedoor", true]]
        let us return to the door
            SHOWIF::[['EXEC::checkItem(env.ITEM_LIST.scary_black_box)', true], ["PAGE!!triedarchivedoor", true]]

    tozik
        <em>scary</em> black box
            SHOWIF::[['EXEC::checkItem(env.ITEM_LIST.scary_black_box)', false], ["PAGE!!triedarchivedoor", true]]

    RESPONSES::akizet
        continue<+>END
            EXEC::specialCam('');env.embassy.vn({gakvu: "", tozik: ""});pauseSwapCam(false)
`)

env.dialogues["d3_archivedelivery"] = generateDialogueObject(`
start
    sourceless
        AS SOON AS WE ENTER THE ROOM... I SEE THEM
        EACH AND EVERY ONE
        A HALF-DOZEN CONTAINERS, WITH ONE OF THOSE SURFACE-SENT LIGHTS
        TOO MANY TO USE A DISABLER
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'
        BEFORE I CAN EVEN CURSE TO MYSELF, THEY ARE UPON US
            EXEC::change('PAGE!!archiveambush', true)
    
    RESPONSES::akizet
        fight!!<+>END
            EXEC::env.embassy.startArchivalAmbush();
            SHOWIF::['gameplay_off', false]
            FAKEEND::(initiate combat)
        fight!!<+>CHANGE::d3_archivedeliveryclear
            SHOWIF::['gameplay_off', true]
            FAKEEND::(skip combat)
`)

env.dialogues["d3_archivedeliveryclear"] = generateDialogueObject(`
early
    sourceless
        AH - THERE, BEYOND THEIR CORPSES...
        IT SEEMS TO BE A COUSINLY BOX?
        I GO TO TAKE IT, THEN TRY TO OPEN IT...
            EXEC::setCam({x: 3, y: 3, offsetCamera: 'rotateX(-30deg)', rotation: 110});pauseSwapCam(true)
        BUT THE DEAD METAL LATCHES AND JOINTS HOLD IT FIRMLY SHUT
        AND ON CLOSER INSPECTION, THAT STRANGE TENDRIL MATERIAL IS PRESENT HERE, TOO
        IT SEEMS TO BE ASSISTING IN HOLDING IT SHUT...

    akizet
        curious - this looks like it came from the cousins
        i have seen them use these boxes for sensitive materials

    gakvu
        like what?
            EXEC::env.embassy.vn({gakvu: "defocus"})

    sourceless
        A PANG OF ANXIETY SHOOTS THROUGH MY MINDCORE
        I SHOULD DEFINITELY NOT SAY,
        'LIKE AN EXPERIMENTAL CORRU TO BRIGHT-LIGHTNING CONVERTER'

    akizet
        oh, uh, like,
        apples...
        because--they do not fare well with the low-air environment of our spire!

    gakvu
        ah. curious

    sourceless
        Â½T~gÂ«Â¾%
        THEY MUST THINK I AM SIMPLY PRETENDING TO KNOW
        OH WELL - IT IS BETTER THAN THE ALTERNATIVE
        WE TAKE THE BOX WITH US - HEAVY, BUT EASY ENOUGH TO SET ASIDE WHEN NEEDED
            EXEC::addItem(env.ITEM_LIST.scary_black_box)

    akizet
        i feel this may come in handy
        if it proves too cumbersome, we may simply leave it
        come - let us continue exploring

    RESPONSES::akizet
        continue<+>END
            EXEC::env.embassy.vn({gakvu: ""});setCam();env.stage.current.onStep();pauseSwapCam(false)

start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";'toggle within system menu if desired'
____END

    sourceless
        THE LAST ONE FALLS
            EXEC::env.stage.current.onStep()

        AFTER THE FIGHT, WE ALL CHEER IN UNISON
            SHOWIF::'EXEC::env.embassy.checkUsedKavrukas(true)'
        AN INGENIOUS USE OF KAVRUKAS, I WILL ALLOW MY PRIDE THIS VICTORY
            SHOWIF::'EXEC::env.embassy.checkUsedKavrukas(true)'

        WE ALL COLLAPSE WITH RELIEF AFTER THE FIGHT
            SHOWIF::'EXEC::env.embassy.checkUsedKavrukas(false)'
        THIS IS THE WORST Î¸gaze OF MY Î¸death
            SHOWIF::'EXEC::env.embassy.checkUsedKavrukas(false)'
        
    akizet
        that could have been really bad...
            SHOWIF::'EXEC::env.embassy.checkUsedKavrukas(true)'
    
    tozik
        no tendril left to rot
            SHOWIF::'EXEC::env.embassy.checkUsedKavrukas(true)'
            EXEC::env.embassy.vn({tozik: "defocus"})

    sourceless
        I RUMMAGE A BIT THROUGH THE remains OF THESE CONSTRUCTS...
            EXEC::step();env.embassy.vn({tozik: ""})
        TEXEC::env.combat.dynamicReward()

        LET US SEE, WHAT ELSE IS HERE...
            SHOWIF::[["PAGE!!triedarchivedoor", false]]
            WAIT::500
            EXEC::cutscene(true);if(!env.tempFlag){env.tempFlag = true; setTimeout(()=>{sendDialogue(env.currentDialogue.chain['early']);cutscene(false);env.tempFlag = false}, 1000)}

        AH - THERE, BEYOND THEIR CORPSES, MUST BE THE 'SCARY BLACK BOX'
        I GO TO TAKE IT, THEN TRY TO OPEN IT...
            EXEC::setCam({x: 3, y: 3, offsetCamera: 'rotateX(-30deg)', rotation: 110});pauseSwapCam(true)
        BUT THE DEAD METAL LATCHES AND JOINTS HOLD IT FIRMLY SHUT
        AND ON CLOSER INSPECTION, THAT STRANGE TENDRIL MATERIAL IS PRESENT HERE, TOO
        IT SEEMS TO BE ASSISTING IN HOLDING IT SHUT...

    akizet
        curious - this looks like it came from the cousins
        i have seen them use these boxes for sensitive materials
    
    gakvu
        like what?
            EXEC::env.embassy.vn({gakvu: "defocus"})

    sourceless
        A PANG OF ANXIETY SHOOTS THROUGH MY MINDCORE
        I SHOULD DEFINITELY NOT SAY,
        'LIKE AN EXPERIMENTAL CORRU TO BRIGHT-LIGHTNING CONVERTER'
    
    akizet
        oh, uh, like,
        apples...
        because--they do not fare well with the low-air environment of our spire!

    gakvu
        ah. curious

    sourceless
        Â½T~gÂ«Â¾%
        THEY MUST THINK I AM SIMPLY PRETENDING TO KNOW
        OH WELL - IT IS BETTER THAN THE ALTERNATIVE
        WE TAKE THE BOX WITH US - HEAVY, BUT EASY ENOUGH TO SET ASIDE WHEN NEEDED
            EXEC::addItem(env.ITEM_LIST.scary_black_box)

    akizet
        come - let us return to the door
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.cool_orb_thingy)'
        come - let us find the "cool orb thingy"
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.cool_orb_thingy) == false'
        before this archival vein collapses even further through the spire...
            EXEC::setCam();env.stage.current.onStep()

    RESPONSES::akizet
        continue<+>END
            EXEC::env.embassy.vn({gakvu: ""});pauseSwapCam(false)
`)

/* 
    The team returns to the BSTRD door and they can enter, although moth recommends you go and save
*/
env.dialogues["d3_archivedoorunlock"] = generateDialogueObject(`
start
    sourceless
        AND SO WE SET THE ENTITY'S REQUESTED MATERIALS BEFORE THE DOOR
            EXEC::specialCam('bstrdoor');pauseSwapCam(true)
        THE CORRUCYST IT WANTED,
        AND THE SCARY BLACK BOX
    
    bstrd
        WOW!! :O
            EXEC::specialCam('bstrdface')
        u guys did it... so freaking proud...
        amazeng

    sourceless
        SUDDENLY, THE STRANGE TENDRILS CURLED AROUND THE DOOR SINK INTO ITS CORRU
        AND AS THEY DO, SEVERAL WHIP OUT AND CURL AROUND THE CORRUCYST AND BOX, BRINGING THEM WITH
        IN UNIFIED SURPRISE, WE ALL SHUFFLE BACKWARDS - EXPECTING IT TO LASH OUT AT US
            EXEC::change("PAGE!!bstrdlock", true)
        BUT IT DOES NOT, AND THE DOOR STANDS UNLOCKED
            EXEC::step()

    bstrd
        hey why dont u come in i got a surprise 4 u
        :-)
    
    sourceless
        WE EXCHANGE A FEW UNEASY LOOKS
        BUT WE CAME THIS FAR...
        
    sys
        ATTENTION::"incoherence detected";"user caution advised"

    moth
        i know this really isn't my business, but...
            SHOWONCE::
        you should probably go save your iteration
            SHOWONCE::
        this bastard is up to no good
            SHOWONCE::
    
    RESPONSES::akizet
        continue<+>END
            EXEC::specialCam('');removeItem(env.ITEM_LIST.scary_black_box);removeItem(env.ITEM_LIST.cool_orb_thingy);pauseSwapCam(false)
`)

/* 
    Visiting the door while already having the materials has a slightly different dialogue
*/
env.dialogues["d3_archivedoorearly"] = generateDialogueObject(`
start
    sourceless
        THE SENSITIVE MATERIALS CHAMBER OF THE ARCHIVAL VEIN, IT...
            EXEC::specialCam('bstrdoor');pauseSwapCam(true)
        WHAT IS THIS?
        I HAVE NEVER SEEN THIS MATERIAL IN MY LIFE, NOR MY Î¸death

    akizet
        gakvu, tozik, do you know what this is...?
    
    sourceless
        SHE IS SIMILARLY PUZZLED, HER RECEPTORS SHAKING NEGATIVELY
    
    gakvu
        a product of the aggressing groundsmind, maybe?
        i... i do not think it is corru

    bstrd
        '_'
            EXEC::specialCam('bstrdface')
        hi
    
    moth
        oh my god it put itself in the memory
            SHOWONCE::

    sourceless
        I SHRIEK AS THE DOOR SPEAKS TO US
        THE VOICE... IT IS SO TERRIBLY UNNATURAL
        GAKVU IS UNPERTURBED, I CAN FEEL SHE EVEN FINDS IT A LITTLE FUNNY

    gakvu
        hello!
        will you let us in?
            EXEC::env.embassy.vn({gakvu: "defocus"})

    akizet
        ah... ye--yes,
        we are trying to recover enough materials to escape

    bstrd
        oh thats cool :P
            EXEC::env.embassy.vn({gakvu: ""})
        YA i let u in
        but u gotta do a favor for me first
        go get my cool orb thingy from the left
        n get me a scary black box from the right
        theres some C00L stuff in here... 
        u wont wanna miss it!!
        :-)

    sourceless
        IT SPEAKS SO HAPHAZARDLY - WITH STRANGE CONTRACTIONS IN PLACE OF WORDS
        IT IS AS IF IT IS SPEAKING A LANGUAGE I HAVE NEVER LEARNED
        AND YET, I CAN STILL UNDERSTAND...?
        WAIT - WE ALREADY HAVE THESE THINGS
        THE 'SCARY BLACK BOX'...
        OH YES, AND THE 'COOL ORB THINGY' - NO DOUBT THE LOCKED CYST
        WE OFFER THESE TO THE DOOR

    bstrd
        :o
        u  already got em?
        HOLY SMOKES!
        WOWEI
        ok come on in
            EXEC::change("PAGE!!bstrdlock", true)

    sourceless
        SUDDENLY, THE STRANGE TENDRILS CURLED AROUND THE DOOR SINK INTO ITS CORRU
        AND AS THEY DO, SEVERAL WHIP OUT AND CURL AROUND THE CORRUCYST AND BOX, 
        RIGHT OUT OF OUR CLAWS!!! I NEARLY TRIP FORWARDS AS IT STEALS THEM AWAY
        IN UNIFIED SURPRISE, WE ALL SHUFFLE BACKWARDS - EXPECTING IT TO LASH OUT AT US
        BUT IT DOES NOT, AND THE DOOR STANDS UNLOCKED
            EXEC::step()

    bstrd
        hey come in i got a surprise 4 u
        :-)
    
    sourceless
        WE EXCHANGE A FEW UNEASY LOOKS
        BUT WE CAME THIS FAR...
        
    sys
        ATTENTION::"incoherence detected";"user caution advised"

    moth
        i know this really isn't my business, but...
            SHOWONCE::
        you should probably go save your iteration
            SHOWONCE::
        this bastard is up to no good
            SHOWONCE::
    
    RESPONSES::akizet
        continue<+>END
            EXEC::specialCam(false);removeItem(env.ITEM_LIST.scary_black_box);removeItem(env.ITEM_LIST.cool_orb_thingy);pauseSwapCam(false)
`)

/* there's a miniboss before the real boss - an archival shelf!! */
env.dialogues["d3_archivemini"] = generateDialogueObject(`
start
    sourceless
        IMMEDIATELY AS WE PROCEED, A PRIMAL FEAR OVERTAKES ME
        THOUGH I AM CERTAIN WHAT STANDS BEFORE US IS AN ARCHIVAL SHELF...
        A DISTANT PART OF MY MIND ASSOCIATES IT WITH A SECRI
        IS IT THE MALFORMED EYES? THE ELONGATED LIMBS?
        OR MAYBE THE PROMISE OF DEATH FROM ITS TOUCH
        THERE IS NO TIME TO FIND THE ROOT CAUSE
        IT IS UPON US WITH WORRYING SPEED
    
    RESPONSES::akizet
        fight!!<+>END
            EXEC::env.embassy.startArchivalMiniboss();
            SHOWIF::['gameplay_off', false]
            FAKEEND::(initiate combat)
        fight!!<+>CHANGE::d3_archiveminiclear
            SHOWIF::['gameplay_off', true]
            FAKEEND::(skip combat)
`)

env.dialogues["d3_archiveminiclear"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";'toggle within system menu if desired'
____END

    sourceless
        THE BEAST FALLS AND MELTS, THOUGH...
            EXEC::env.stage.current.onStep()
        THE CORRUCYSTIC SLUDGE THAT REMAINS SEEMS TO DRAIN AWAY
            EXEC::changeBgm(env.embassy.music_collapse, {length: 4000});
        ARE THOSE HOLES IN THE GROUND?
        IS THAT THE GROUND?
        SOMETHING ABOUT IT MAKES MY HEAD HURT...

    gakvu
        akizet? are you ok?
            EXEC::env.embassy.vn({bg: true, gakvu: "fullview"});

    sourceless
        IS IT SO PLAIN TO SEE?
        MY RECEPTORS HAVE CURLED INTO TIGHT SPIRALS,
        AND IN OUR POST-COMBAT, I HAVE LEANED AGAINST A WALL TO RECOVER
        TOZIK APPROACHES TO SEE IF ANYTHING IN PARTICULAR IS BROKEN
        BUT, I WAVE THEM AWAY
    
    akizet
        no no, i am all right
        do you... see anything strange with this room?
    
    sourceless
        THEY LOOK AROUND, CLEARLY NOT AS PERTURBED AS I
            EXEC::env.embassy.vn({bg: false, gakvu: "defocus", tozik: "defocus"})
        TOZIK STUDIES THE MIGRAINE-INDUCING VOID OF THE CEILING
    
    tozik
        it looks like the perspective projection might be acting up
        i am not surprised, given the entity that has been guiding us
        it has an uncanny control of the environment
        not unlike the groundsmind, or gakvu...

    gakvu
        hey, where is it, anyway?
        did it just take the box and cyst and run around this thing?

    sourceless
        SUSPICION SPIKES THROUGH OUR CONNECTION
        IS IT A TRAP?
        WE CAN EITHER CONTINUE, OR TURN AROUND...
        WE ARE QUITE FAR OUT OF OUR WAY, AFTER ALL
        BUT SURELY THIS WILL BE WORTH THE TROUBLE?
            EXEC::env.embassy.vn({gakvu: "", tozik: ""})
    
    RESPONSES::akizet
        continue<+>END
`)

env.dialogues["d3_archiveboss"] = generateDialogueObject(`
start
    sourceless
        THIS ROOM...
        IT IS SO WRONG THAT I FEEL MY MIND STRUGGLE TO PROCESS IT
        IS THIS A PRODUCT OF THE SIGNAL?

    gakvu
        akizet, tozik...
        do not--do not look into the gray

    bstrd
        FOCUS!!!
        LOOK @ ME
        O_O
            EXEC::sfxmap.stop();play("crit", 0.75);specialCam("bstrdboss");pauseSwapCam(true)
            
    sourceless
        THE VOICE BOOMS FROM AN ARCHIVAL GOLEM
        THAT STRANGE SIGIL IS OVER ITS HEAD,
        A SASH OF KAVRUKAS HANGS OVER ITS TORSO...
        WAIT--!!
        AND THE BOX LIES NEAR ITS FEET, OPEN, BUT AWAY FROM US!
        THE CYST IS NOWHERE TO BE SEEN, BUT... 
        IT IS AN ARCHIVAL GOLEM, SO IT MAY BE WITHIN ITS CHASSIS

    bstrd
        thx for getting this stuff
        
    sourceless
        THE GOLEM KNEELS TO RETRIEVE A LONG BRIGHT WEAPON FROM THE BOX
            EXEC::specialCam("bstrdbox")
        IT MAKES A SERIES OF MOVEMENTS THAT PRODUCE CLICKS AND SNAPS FROM THE DEVICE
            EXEC::content.querySelector('.bstrdboss').classList.add('gun');play('click2')
        AND THE DOOR SHUTS BEHIND US--LOCKED AGAIN WITH THE SAME UNNATURAL TENDRILS

    bstrd
        u guys just taught a golem how to use gun's
        BAD ASS ...
        SHOOT EM!!! GET EMM DUDE!!
        >:}
    
    sourceless
        OUR HOPES OF HAVING A NEW FRIEND ARE STOMPED
        BEFORE IT CAN EVEN RAISE ITS WEAPON, I ACTIVATE THE TIMESTOPPER
        WE CAN ONLY FIGHT
    

    RESPONSES::sys
        force thoughtform rules over entity<+>END
            EXEC::env.embassy.startArchivalBoss(true);specialCam(false);pauseSwapCam(false)
            FAKEEND::reduced intensity alternative
            SHOWIF::[['low_intensity', true], ['gameplay_off', false]]

    RESPONSES::akizet
        fight!!<+>END
            EXEC::env.embassy.startArchivalBoss();specialCam(false);pauseSwapCam(false)
            FAKEEND::(initiate combat) 
            SHOWIF::['gameplay_off', false]
        fight!!<+>CHANGE::d3_archivebossend
            SHOWIF::['gameplay_off', true]
            FAKEEND::(skip combat)
`)

env.dialogues["d3_archivebosstut"] = generateDialogueObject(`
start
    sys
        WARNING::'abnormal thoughtform activity detected'
            EXEC::env.bulletHell.paused = true;ratween(env.bgm, 0.5);env.temporaryOptimize = false;
        WARNING::'entity BSTRD';'altering thoughtspace'
            EXEC::env.bulletHell.paused = true
        ANALYSIS::'intention to destroy recollection locus'
        ATTENTION::'utilizing proxy thoughtform';'manually direct away from incoherence'
        ATTENTION::'neural controls adjusted';'direct proxy with primary method of navigation'

    sourceless
        THE GOLEM PULLS A KAVRUKA FROM ITS SASH
        I SEE ITS MANY LEGS FLARE WITH LIFE AS IT ACTIVATES
        TOZIK WARNS US URGENTLY,

    tozik
        GÂ¼ÃšÃ€
        if this thing throws enough of those,
        this entire room will collapse
        it may sound insane, but we need to defuse them when they are thrown
        
    gakvu
        but look at how many it has!!

    tozik
        i know
        just do the best you can
        the room integrity should be able to take a few...
        and i will lend my knowledge through the timestopper
        there is a trick to disabling them right before they explode

    sys
        ANALYSIS::'context shift'
        ATTENTION::'optionally';'utilize INTERACTION over highlighted areas to disarm entity KAVRUKA'
        NOTICE::'INTERACTION triggered by <span definition="EQUIVALENT::'LMB'">primary action method</span>'
        NOTICE::'additionally triggered by <span definition="EQUIVALENT::'Q';'E'">quality and view shift methods</span>'

    RESPONSES::akizet
        go!!<+>END
            EXEC::bh_gundown("tutorial");env.bulletHell.paused = false;ratween(env.bgm, 1);env.temporaryOptimize = true
            FAKEEND::(continue) 
`)

env.dialogues["d3_archivebossend"] = generateDialogueObject(`
start
    sourceless
        THE GOLEM FALLS TO PIECES, ITS HOVERING CAPABILITIES SLUDGED
            EXEC::env.stage.current.bossCollapse();env.stage.current.clearBossPals()
        BUT ITS SIGIL AND STRANGE VOICE REMAIN
            EXEC::change('PAGE!!archiveboss', true);

____SHOWIF::['gameplay_off']
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";'toggle within system menu if desired'

    bstrd
        WTF
            EXEC::specialCam("bstrdbox");pauseSwapCam(true)
        have u been doing that...
        THIS WHOLE TIME???
        >:[
        NOT FAIR!
        THIS FUCKINGE SUCKS
    
    tozik
        what are you talking about?
    
    bstrd
        after all i did...
        to give u a good time...
        ...
        u... get...
        NOTHING!!!!

    sourceless
        THE SIGIL OVER THE GOLEM'S HEAD FADES, AND ALL AT ONCE, THINGS SEEM TO RETURN TO NORMAL
            EXEC::env.stage.current.removeBastardBG();env.stage.current.onStep()
        there is an eerie silence...
        what could it have meant by that?
        
    akizet
        well...
        let us return to fixing movefriend
        we have deviated enough
            EXEC::change("PAGE!!archivesclear", "skipped")
    
____SHOWIF::['gameplay_off', false]
    bstrd
        HOLEY SMOKES :O
            EXEC::specialCam("bstrdbox");pauseSwapCam(true)
        wow...
            EXEC::ratween(env.bgm, 0.75)
        u really did it
        i was p sure i was gonna KILL u guys there
    
    tozik
        why... why did...
    
    bstrd
        SHUT UP im not done yet
        listen im about 2 die so i gotta tell u this quick
        arr... the paine..
        OHH it HURTS BAD!!!
        ;-(
        anywy i found this outside so u can have it
        im p sure its important so hang on 2 it
    
    sourceless
        BEHIND THE DYING GOLEM RISES ANOTHER STRANGE MONOLITH
            EXEC::env.stage.current.showPillar(true)
        OVER IT IS... IT LOOKS LIKE A CORRUCYST
        AND THERE IS SOME SORT OF MARKING ON IT
        BUT I CANNOT SEE IT CLEARLY FROM HERE

    gakvu
        you seem pretty intelligent, for... what is going on
        do you know what is happening? we could fix you if you help us!
        
    akizet
        and agree not to try to kill us again...
    
    bstrd
        :U
    
    sourceless
        THERE IS A LONG, UNCOMFORTABLE PAUSE
        DID IT NOT EXPECT TO LIVE THIS LONG? OR FOR US TO MAKE THAT OFFER?

    bstrd
        no i gotta kill u guys sry
        but u won this time so gj
        
    sourceless
        THE SIGIL FADES, AND ALL AT ONCE, THINGS SEEM TO RETURN TO NORMAL
            EXEC::env.stage.current.removeBastardBG()
        OUR FOE'S GOLEM FALLS TO PIECES ON THE FLOOR, WHERE IT SLOWLY MELTS AWAY
            EXEC::env.stage.current.onStep()
        EVEN THE COLOR OF THE ROOM HAS CHANGED...
        WE ALL STAND IN SILENCE FOR A MOMENT AS WE PROCESS WHAT HAS HAPPENED
        I LOOK AT THE MONOLITH AGAIN, AND CURIOSITY PULLS ME CLOSER
            EXEC::specialCam("bstrdbosspillar")
        
    akizet
        well,
        let us see what that creature left for us...
    
    sourceless
        I TURN THE CORRUCYST OVER IN MY HANDS
        THE MARKING READS, "SORRY"
        APOLOGIZING...? FOR TRYING TO KILL US?
        NO - I FEEL THAT IT PREDATES THIS ENTITY'S INTERFERENCE
        SOMETHING ABOUT IT FEELS FAMILIAR
        REGARDLESS, I PLACE THE CYST ON ONE OF MY RECEPTORS, AND...
            EXEC::env.stage.current.hidePillarCyst();addItem(env.ITEM_LIST.sorry_cyst)
        FASCINATING!!

    akizet
        tozik...
        this is a weapon schematic

    tozik
        for what?
    
    akizet
        it looks like some sort of compact golem armament...
        but the schematic itself is unfocused
        i feel the information is still there, just scrambled
        if we come across any foundry vats, we could probably fix the cyst and create it!
        
    sourceless
        I GLANCE DOWN AT THE GOLEM'S CORPSE, STILL CLUTCHING ITS BRIGHT WEAPON
        THE MIND INHABITING IT - SO VIOLENT, BUT STILL HONORABLE
        TRULY BIZARRE...
        I KNEEL ALL THE SAME, AND PLACE MY CLAW OVER WHAT REMAINS OF ITS PALE EYESPOTS
    
    akizet
        you fought well... whatever you were
        let us return to fixing movefriend
        we have deviated enough
            EXEC::change("PAGE!!archivesclear", true)
____END

    RESPONSES::akizet
        leave<+>END
            EXEC::specialCam("");pauseSwapCam(false)
`)
js/embassy_groundsmindry_dialogue.js