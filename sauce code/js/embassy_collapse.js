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

env.embassy.startOrSkipArchivalIntroFight = () => {
    env.embassy.startOrSkipFight({
        specificFormation: 'archive_intro',
        winCallback: () => { change("PAGE!!aintro", "cleared");refreshStage() },
        winDialogue: 'd3_archiveintro'
    })
}

env.embassy.music_embassy_uncanny = new Howl({
    onload: function () {
        page.howls.push(this)
        this.intendedVol = 0.9
    },
    src: ['/audio/bs_uncanny.ogg'],
    preload: true,
    loop: true,
    volume: 0.9,
    sprite: {
        __default: [0, 9999999, true]
    }
})

env.embassy.startTutorialGolem = ()=>{
    /*
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
    */
   
    if(!check("PAGE!!skiptut")) {
        cutscene(true)
        setTimeout(()=>env.rpg.classList.add('hideteams'), 100)
        setTimeout(()=>{
            startDialogue('d3_tutorial_start')
            cutscene(false)
        }, 2000)
    }

    changeBgm(env.embassy.music_unsafe, {rate: 1})
    env.embassy.startOrSkipFight({
        specificFormation: 'tutorial_golem',
        winCallback: () => { ratween(env.bgm, 0.5) },
        winDialogue: "d3_tutorial_end"
    })
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
    MUI("off")
    env.combat.dynamicCombat({
        specificFormation: 'movefriend_survival',
        specificCallback: (loser) => {
            if(loser.name == "ally") env.combat.lossState()
            else if(intensity == "low") env.embassy.endMovefriendBoss()
        }
    })
    
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
    //readoutAdd({message: `NOTE::'received ${amt} SFER CUBE'`, name:"sys", show: true, forceMini: true})
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
        content.classList.remove('innerfocus', 'showfocus', 'fade-stage', 'painprep', 'painmode', 'timefocus', 'timefocus2', 'timefocusaki')
        content.classList.add('collapse')
        flash(false)
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
        change("PAGE!!movefoeactive", true)
        refreshStage({noFlash: true})
        content.classList.remove('painprep', 'painhalf', 'painmode')
        vfx({type: "darkflash", state: false})
        specialCam(false)
        vn.done()
    },

    d3_movefriend_finish: ()=>{
        specialCam(false)
        change("PAGE!!movefoeactive", "DELETE")
        refreshStage({noFlash: true})
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
                if(!check("PAGE!!recreation", "cleared")) {
                    if(check("PAGE!!recreation", "dangerous")) {
                        chatter({actor: 'sourceless', text: 'IT IS TOO DANGEROUS, WE MUST DESTROY THESE FOES', readout: true})
                    } else {
                        playerMoveTo(4, 6, "down")
                        startDialogue("d3_rec_investigate")
                    }
                } else {
                    startDialogue('d3_rec_body1')
                    change("PAGE!!mindcore1extracted", true)
                    if(check("PAGE!!mindcore1extracted") && check("PAGE!!mindcore2extracted")) change("PAGE!!recreation_leavable", true)
                }
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
                if(!check("PAGE!!recreation", "cleared")) {
                    if(check("PAGE!!recreation", "dangerous")) {
                        chatter({actor: 'sourceless', text: 'IT IS TOO DANGEROUS, WE MUST DESTROY THESE FOES', readout: true})
                    } else {
                        playerMoveTo(7, 3, "down")
                        startDialogue("d3_rec_investigate")
                    }
                } else {
                    startDialogue('d3_rec_body2')
                    change("PAGE!!mindcore2extracted", true)
                    if(check("PAGE!!mindcore2extracted") && check("PAGE!!mindcore1extracted")) change("PAGE!!recreation_leavable", true)
                }
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
            showIf: ()=> check('PAGE!!eyeexamined', false) && check("PAGE!!weirdload", false)
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
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'a utility golem borrowed from the maintenance ${processDefinitionsInString("θsegment")} below';'controlled by groundsmind?';'made incoherent by the noise?'</span>`,
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
        damn, i was kinda hoping the FBX patch would help with this
        not a big surprise, honestly
        i don't know if you've ever actually tried to open thoughtstreams with violence before,
        but after '52 they seriously locked that shit down
        of course, i accounted for this
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
        but i didn't make it
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
        EVER SINCE THE GROUNDSMIND SAW FIT TO HAVE IT REST IN OUR RESEARCH CENTER,
        USING ITS EFFECTS WHETHER WHOLLY OR PARTIALLY HAS BECOME A STANDARD PRACTICE
        RARELY IS IT DRAWN AWAY FROM US, OFTEN RETURNED IN SHORT ORDER
        FEW OTHER OPERATIONS USE IT TO SUCH DRASTIC POSITIVE EFFECT

    tozik
        next

    sourceless
        SUCH PLEASANT SPEED! SO MUCH TIME FREED!
        WHO SAYS VELZIE CANNOT SMILE WITH COMPASSION?
        OUTSIDE OF OUR CONNECTION, I SENSE OUR ASSISTANT GOLEM ATTACHING A LISTENER
            EXEC::document.querySelector('.redundancy').style.setProperty('--dataoffset', 3)

    gakvu
        loaded!
    
    sourceless
        MEMORY OF A SIGNAL-RECORD CYST RADIATES THROUGH OUR CONNECTION
        AN IDENTIFIER PRECEDES ITS ABRIDGED LOG: PRE-CONTACT, θeye 4, θradiant 0
        TOZIK FLEXES THE NERVE OF THE TIMESTOPPER, 
        AND IT BACKS HIS MIND WITH THE FULL WEIGHT OF ITS INTELLECT
        GIVING THE APPEARANCE OF THE REVIEW'S INSTANT COMPLETION
        BUT HIS THOUGHTS CARRY A FAMILIAR FATIGUE AS HE RELEASES IT

    tozik
        no drift, no changes, all is aligned
        next one
    
    sourceless
        THEN COMES ANOTHER SIGNAL-RECORD - PRE-CONTACT, θeye 4, θradiant 1
            EXEC::document.querySelector('.redundancy').style.setProperty('--dataoffset', 6)
        TOZIK'S MIND PASSES OVER ITS SUMMARY, SLIGHTLY DISINTERESTED
        THE MUNDANITY OF THIS INVESTIGATION, NECESSARY AS IT MAY BE, SET IN LONG AGO...
        ESPECIALLY TO ME--IT FEELS POINTLESS BENEATH THE RECEPTORS OF MY WORK WITH GORDON'S TEAM
        EVEN NOW MY MIND RACES TOWARDS DISTANT TOPICS
        ESPECIALLY CAVIK... NO NO, I SHOULD NOT THINK ABOUT IT NOW
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
        AND WITH AN IMPULSE, THE GRAND CYST'S FLESH BECOMES AS MY OWN,
            EXEC::vfx({type: "darkflash", state: true});ratween(env.bgm, 0.25)
            WAIT::2000
            THEN::content.classList.add("timefocus");vfx({type: "darkflash", state: false})
        MY MINDCORE FLOATING IN ITS OCEAN OF ROILING CORRU
            EXEC::content.classList.add("timefocusaki")
        A PILOT CONDUCTING THE VAST WAVES OF ITS CAPACITY FOR THOUGHT
        THE LISTENER DATA, BOTH LOGGED IN THIS RECORD AND FETCHED FROM OUR ARCHIVES, IS TERRIBLY DENSE
        LIKE ALL THE OTHERS
        SO I COMMENCE COMPARISON
    
    timestopper
        Á–ßÎú,Û†Àç?¿ã„gøò#mÞüÐï>ùô7ÿ}ÿ¦ÿúŽõþ‹¾òêéÎÆ|žVÅDVQ½‘îîf
        Ç—ÌïØÅáô(·â±Ð1HQÒî¿ð#c@¥5HàH†²ŠœDÍ
    
    sys
        ATTENTION::'large amount of unprocessable data';'advancing stream to next coherent data'
            EXEC::flash(true)

    sourceless
        ...
        HALFWAY THROUGH THE θradiant's REVIEW, THROUGH SUBJECTIVE θwinks,
            EXEC::content.classList.add('timefocus2');flash(false)
        I FEEL ALREADY THAT I WILL FIND NO DISCREPANCIES, 
        LIKE EVERY OTHER COMPARISON WE HAVE DONE
        BUT TOZIK IS RIGHT TO INSIST THAT WE BE THOROUGH
        IF ONE SPIKE HAS BEEN KEPT SECRET FROM THE COLLECTIVE,
        WHAT MORE COULD BE KEPT FROM US?
        NO LESS THAN TOTAL CERTAINTY WILL SUFFICE
    
    timestopper
        ÷‹œúXA†E0Ýã…z”Õš:U´Õp^F¡;Ž|¿T&
        NFöÁ>ÅMÚÒÞ‰Ù’Ö»ã¶„]œ,iÿo#à¶ÀßsÊz<Ùœ&çqž³
    
    sys
        ATTENTION::'large amount of unprocessable data';'advancing stream to next coherent data'
            EXEC::vfx({type: "darkflash", state: true})

    sourceless
        --PULL AWAY FROM THE ABSTRACT TETHERS THAT CONNECT MY THOUGHTS TO ITS FLESH
            EXEC::vfx({type: "darkflash", state: true});ratween(env.bgm, 1)
            WAIT::2000
            THEN::content.classList.remove("timefocus", "timefocusaki", "timefocus2");vfx({type: "darkflash", state: false})
        AND MY MIND EMERGES FROM THE TIMESTOPPER AT LAST
        FOR THE OTHERS, BARELY A LARVAL BREATH COULD HAVE PASSED
    
    akizet
        this one matches as well
    
    tozik
        hmm...
        the two spikes we know of are still the only discrepancies
        i believe we have reviewed enough

    akizet
        you would cease here? are you sure?

    tozik
        if my raw thought theory is correct, even accounting for some organic drift,
        we have well passed the point where another equidistant spike might have been found
        i may continue on my own to be certain, 
        but the important periods have been covered
        thank you for your help, this would have taken much longer alone
    
    gakvu
        you owe me a receptor curl
    
    tozik
        not happening
        we should see these cysts returned - disconnect that listener, i will...
            EXEC::env.embassy.day3Static();
        ...huh

    sourceless
        SOMETHING IS WRONG
        THE OTHERS FEEL IT TOO
    
    gakvu
        hey,
    
    tozik
        quiet
        i hear it
    
    sourceless
        ...
        ...
        
    tozik
        what is that?
        is that coming from the listeners?
    
    sourceless
        IT IS A SORT OF WHISPER... I MUST LISTEN CLOSELY
        BUT JUST AS I SEEM TO GRASP THE MESSAGE...
        PAIN
            EXEC::env.embassy.day3Signal();
            WAIT::6000

    sourceless quiet
        A WORDLESS IMPULSE SEIZING EVERY CORNER OF MY MIND
        IT DOES NOT FEEL INTENDED FOR ME
        YET IT CRAWLS AND WRITHES THROUGH MY FLESH
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
        THE GLOW OF THE CYSTIC GLASS HAS DIMMED, THE CHAMBER DARK

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
        an impact? an explosive?
    
    tozik
        not seeing any physical damage
    
    sourceless
        GAKVU RUMMAGES THROUGH HER FALSE VEILK SKIN COAT, PRODUCING A SMALL CORRUCYST
        A COMMUNICATIONS DEVICE, THOUGH IT MELTS IN HER CLAWS
    
    gakvu
        Îè§¤ÿ
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
        wait, mine is working
    
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
        i have never felt anything like that before...
        could this be the bright cousins? an attack??
        or... some sort of dull collision?

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
        but this is far beyond the ability of the bright cousins
            EXEC::specialCam(false)
    
    gakvu
        well, whatever is happening,
        if our equipment is getting sludged...
        then the internals of the spire must be, too
        we should get out of here
    
    akizet
        agreed - let us gather the others in this θsegment
        and stay behind me
    
    sourceless
        AFTER THAT MOMENT OF AGREEMENT, WE ALL SEEM TO REALIZE THE SAME THING
        DESPITE THE CONNECTORS LACKING A PHYSICAL TETHER,
        WE ARE STILL CONNECTED TO THE TIMESTOPPER, ITS NERVE STILL PLAINLY WITHIN REACH
    
    timestopper
        WAS THIS ALWAYS REMOTE CAPABLE?

    tozik
        yes
        did you not listen when we first got it?
    
    gakvu
        hehe
            EXEC::env.embassy.vn({tgolem: 'showleft'})

    sourceless
        AS GAKVU REACHES TO REMOVE HER CONNECTOR, OUR ASSISTANT GOLEM SCRAPES AGAINST THE FLOOR
            EXEC::env.embassy.vn({tgolem: 'display show', gakvu: 'defocus', tozik: 'defocus'})
        WE CEASE MOVEMENT, GAZES CONVERGING UPON IT
            EXEC::changeBgm(env.embassy.music_unsafe, {rate: 1})
        IT HAS DRAGGED ITSELF TO AN UNEASY HOVER, AN ODD CONTROL SIGIL MADE APPARENT
            EXEC::env.embassy.vn({tgolem: 'display show center'})
        SOMETHING IN THE GROUNDSMINDRY IS DIRECTING IT - BUT NOT VEKOA?
    
    aggressor
        o   ut o  u  t o 
        i w  wi ll n no t let
    
    gakvu
        hello?
    
    sourceless
        THE CONSTRUCT TWISTS ABOUT IN THE AIR, MOVING AWAY, THEN TOWARDS US
        SOMETHING ABOUT ITS CONTROL IS CONFUSED, BUT ONLY FOR A θblink
        FOR ITS STYLIZED ARMS SUDDENLY SHARPEN INTO SPIKES, AND IT RUSHES TOWARDS GAKVU
            EXEC::env.embassy.vn({tgolem: 'display show approach'})
        ÷Œ€T$0 - THIS IS AN ATTACK
    
    akizet
        get back!!

    sourceless
        EXPERIMENTALLY, I FLEX THE NERVE OF THE TIMESTOPPER CONNECTOR
        AND AS IT LENDS ITS THINKING FLESH TO US, TIME DOES SLOW, 
        BUT NOT TO THE DEGREE OF OUR PREVIOUS WORK - SUCH IS THE REMOTE TRADEOFF
        THESE TWO ARE UNPREPARED FOR COMBAT, BUT WITH MY TIME ON THE SURFACE
        YES, I CAN SAVE THEM
        THOUGHTS THAT COULD ONLY BE GAKVU'S ECHO THROUGH OUR CONNECTION
    
    timestopper
        WHAT DO I DO WHAT DO I DO
        IT IS GOING RIGHT FOR MY MINDCORE IT IS GOING TO KILL ME
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
        in our altered time, careful maneuvers can be taken
        the golem rushes for gakvu, left vulnerable in its haste
        a perfect opportunity to strike
        and after my attacks create an opening,
        i can direct the others to follow through...

    sys
        EXECUTING::"structure direction";"thoughtform combat"::

    plainsys
        reduce health of opponents to proceed
            EXEC::env.rpg.classList.remove('hideteams')
        select allied actions strategically
        take note of lingering status effects; vital for success
        hover for detail; temporary effects displayed in text above HP
            EXEC::var boxSize = env.rpg.enemyTeam.members[0].box.getClientRects()[0];mousePing({x: boxSize.x + boxSize.width * 0.5, y: boxSize.y + boxSize.height * 0.5, duration: 3000, scale: 10});mousePing({x: boxSize.x + boxSize.width * 0.5, y: boxSize.y + boxSize.height * 0.5, duration: 6000, scale: 10})
        special effects displayed in icons below HP
            EXEC::var iconBox = env.rpg.enemyTeam.members[0].statusEffects[0].passiveIconElement.getClientRects()[0];mousePing({x: iconBox.x + iconBox.width * 0.5, y: iconBox.y + iconBox.height * 0.5, duration: 3000, scale: 20});mousePing({x: iconBox.x + iconBox.width * 0.5, y: iconBox.y + iconBox.height * 0.5, duration: 6000, scale: 20})
        survive
    sys
        ::END

____SHOWONCE
    moth
        okay, a little concise, but...
        it works!!
        sorry. staying quiet
        let's get to the bottom of this
____END

    sourceless
        this golem utilizes an assistant frame
        evasive by virtue of its disparate thin components, and terribly durable
        and so i sharpen my claws, 
        for piercing corru is the surest method of both weakening and destroying it
        though--it may just as easily be disoriented with blunt force
        i could also simply get in the way, preparing to deflect it...
    
    RESPONSES::akizet
        take action<+>END
            FAKEEND::proceed
`)

/* plays after akizet's move, when it's gakvu's turn */
env.dialogues["d3_tutorial_gakvu"] = generateDialogueObject(`
start
    sourceless
        with a violent shove, it impacts some equipment, floating components clattering apart briefly
            SHOWIF::'EXEC::hasStatus(env.rpg.enemyTeam.members[0], env.STATUS_EFFECTS.stun.slug)'
        with its flesh punctured, it is only a matter of time before it breaks down
            SHOWIF::'EXEC::hasStatus(env.rpg.enemyTeam.members[0], env.STATUS_EFFECTS.puncture.slug)'
        with my rapid approach, its attention is drawn from gakvu
            SHOWIF::'EXEC::hasStatus(env.rpg.actors.akizet, env.STATUS_EFFECTS.focused.slug)'

        and so, distraction successful, my inner eye turns to the others
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

____SHOWIF::'EXEC::hasStatus(env.rpg.enemyTeam.members[0], env.STATUS_EFFECTS.destabilized.slug)'
        its flesh shimmers and ripples bizarrely--what is that??
        was that gakvu's doing? she did not even touch it...
        it does at least look like it may receive our strikes easier, but...
____SHOWIF::['EXEC::!hasStatus(env.rpg.enemyTeam.members[0], env.STATUS_EFFECTS.destabilized.slug)', 'PAGE!!earlygak']
        the golem recoils as if struck, a limb shimmering with strain, yet...
        was that gakvu's doing? she did not even touch it!
____END
        no matter - a question that must wait 
        i look to tozik next,
            EXEC::change("PAGE!!toztut", true)
        but an impulse from him makes clear i need not say anything
    
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
        THEY ARE SCARED - AS THEY SHOULD BE
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
        ATTENTION::"thoughtform combat gameplay bypassed";"toggle within system menu if desired"
            EXEC::vn.renderParty()

    sourceless
        OUR ASSISTANT GOLEM ACTED WITH SUCH...
        DESPERATION, TO KILL US
        EVERY PIECE OF IT GRADUALLY SHIFTED TO ITS MOST AGGRESSIVE POSSIBLE FORM
        BUT FINALLY, AND NOT WITHOUT STRUGGLE,
____END

    sourceless
        THE GOLEM CRASHES TO THE GROUND, 
        WHERE ITS GEOMETRIC COMPONENTS MELT INTO CORRUCYSTIC WASTE
        GAKVU, TOZIK AND I SHARE A LOOK - ONE OF TRIUMPH, BUT SHOCK
            EXEC::env.embassy.vn({bg: true, gakvu: 'fullview', tozik: 'fullview'})
        THEIR CLAWS AND RECEPTORS TREMBLE LIKE A FIRST-WATCH CAVERNGUARD'S
    
    akizet
        if this is happening everywhere...
        ...
        listen
        stay close to me, and keep the timestopper connectors on
        we should use it as long as we can
        but we need to get out of here
        let us see if movefriend is still operational
    
    sourceless
        THE OTHERS SIMPLY DIP THEIR RECEPTORS IN AFFIRMATION AND STAY CLOSE
        AN UNEASY TENSION SITS BETWEEN US IN THE TIMESTOPPER'S CONNECTION
        WHICH, IS A LITTLE STRANGE... IT IS AN APPROPRIATE TIME FOR FEAR, BUT,
        ARE THEY AFRAID OF ME?

    sys
        NOTICE::'gameplay may be toggled in the SYS menu'

    sourceless
        JUST AS WE SET OUT TO LEAVE,
        THE GOLEM'S CHASSIS FALLS APART, AND OUT SPILL SOME COMMON REPAIR CYSTS

    sys
        ITEM_RECEIVED::"<span definition="INHERITED CONTEXT::${env.ITEM_LIST['eq_restorative'].description}">restorative satchel</span>"
            EXEC::env.embassy.conditionalItem('eq_restorative', 1, 'tutrest');change("PAGE!!inventoryTutorial", true)
        EXECUTING::"structure direction";"items"::

    plainsys
        items are often granted through success
        each carries permanent unique effect; may grant actions or passive statuses
        restorative satchel effect::
            AUTOADVANCE::
    
    definitionget
        TEXEC::definitionRender({getAttribute: () => "STATUS++item_restorative"}, {returnHTML: true})

    plainsys
        items are not consumed; uses restored each encounter
        equip items according to preferred composition
        utilize PARTY MENU; open with impulse; Z

    sys
        ::END
            AUTOADVANCE::

    sourceless
        NOT OUT OF THE ORDINARY FOR AN ASSISTANT GOLEM
        BUT A SUSPICIOUS FORTUNE NONETHELESS
        VELZIE ONLY OFFERS A GIFT IN ONE CLAW WHEN THE OTHER IS POISED TO STRIKE

    RESPONSES::akizet
        keep moving<+>END
            EXEC::revertBgm();env.embassy.vn({bg: false, gakvu: '', tozik: ''})

    RESPONSES::sys
        open party menu<+>END
            EXEC::revertBgm();env.embassy.vn({bg: false, gakvu: '', tozik: ''});cutscene(true);env.partyPending = true

SKIP::env.embassy.conditionalItem('eq_restorative', 1, 'tutrest');vn.done();revertBgm()
END::env.partyPending == true ? (cutscene(false), togglePartyMenu(), env.partyPending = false) : false
`)

env.dialogues["d3_connector"] = generateDialogueObject(`
start

____SHOWIF::['PAGE!!connectors', false]
    sourceless
        IT MAY BE HANDY TO HAVE ANOTHER CONNECTOR
        SO I GO TO PULL ONE OF THE CONNECTED ONES FREE...
        ONLY FOR IT TO MEET MY CLAW WITH A DREADFUL SOFTNESS
        IT IS SLUDGED - THEY ALL ARE

    akizet
        what...
        they are dead??
        but the timestopper is fine!!!

    tozik
        hmmm...
        most smaller devices seem to have been broken by that signal
        these are entirely self-contained when inactive, so...
        whatever allowed the timestopper to stay intact was not afforded here
        unfortunate as it is
        we should protect the ones we have dearly
____SHOWIF::'PAGE!!connectors'
    sourceless
        IT IS NO USE - THEY ARE ALL GONE
            SHOWIF::'PAGE!!connectors'
____END
    
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
        œúX†A
        WHAT ARE OUR OTHER OPTIONS?
    
    tozik
        wait, let me see...
            EXEC::env.embassy.vn({tozik: 'defocus'});
    
    sourceless
        TOZIK KNEELS NEAR ITS FACE, EXAMINING THE PORTIONS OF IT THAT EXTEND OUT OF THE CURVED WALL
____SHOWIF::'PAGE!!earlytoz'
        HE LEANS ABOUT, PRODDING AT ITS EXTERNAL CYSTIC GLASS USING THE SAME TOOL HE ATTACKED WITH
        I DID NOT GET A GOOD LOOK BEFORE, BUT I SEE CLEARLY NOW
        OUT OF ONE OF HIS CLAWS HAS EXTENDED A CORRUSKIVI, ANCHORING TO A FINGER
____SHOWIF::['PAGE!!earlytoz', false]
        HE LEANS ABOUT, PRODDING AT ITS EXTERNAL CYSTIC GLASS, 
        USING SOME SORT OF SHARPENED IMPLEMENT...
        WHAT IS THAT? I HAVE NEVER SEEN HIM EXPOSE THAT IMPLANT BEFORE
        A CORRUSKIVI! THAT IS THE NAME! IT ANCHORS TO A FINGER
____END
        I DO RECALL SOME VAGUE REFERENCES TO HIS PAST WORK,
        BUT IT IS SURPRISING TO SEE HIM STILL CARRY IT
        
    tozik
        from what i can see, just the regulatory organs are sludged
        so it is dying, but not dead
            EXEC::env.embassy.vn({bg: true, tozik: 'fullview'})
        i can fix it...
        no, i <em>could</em> fix it, if we had a way to get some materials
        but nothing in our chamber is usable,
        and this is the only path availed to us
        we are trapped
    
    akizet
        what...
        we cannot wait!
    
    tozik
        obviously
    
    sourceless
        TOZIK'S RECEPTORS TWIST SLIGHTLY, AND HE REMAINS SILENT... NO IDEAS, I SUPPOSE
        GAKVU IS STRANGELY QUIET, LEANING AGAINST THE WALL NEAR OUR PATH TO RESEARCH
    
    akizet
        well...
        what about recreation? is that not just a few θtendrils lower-away? 
    
    tozik
        do you intend to claw through the flesh of the walls? swim through the spireblood?
        the density here is almost at natural spire levels
        no amount of surface experience will let you break through a single θtendril,
        let alone a 'few'
        be reasonable
        ...
        sorry

    sourceless
        TOZIK STILL FACES AWAY, THOUGH HIS STANCE AND HIDDEN RECEPTORS SAY ALL
        I UNDERSTAND HIS FRUSTRATION, BUT... WHAT ELSE CAN WE DO?
        ...
        THERE IS A MOMENT OF NOTHING AS WE THINK, LIKE A CLOUD PASSING UNDERNEATH THE EYE
        GAKVU PUSHES HERSELF OFF THE WALL, FEELING AT THE EDGES OF THE RELOCATOR
            EXEC::env.embassy.vn({gakvu: 'defocus'});
        
    gakvu
        ...hm
        listen
        if you two agree never to tell anyone about this
        i can make us a path to the nearby chambers

    sourceless
        I STARE, BAFFLED. TOZIK TURNS
    
    gakvu
        our favorite recreation is pretty close
            EXEC::env.embassy.vn({gakvu: 'fullview'});
        and that one corner was under regeneration,
        so those containers that were nearby probably have sfer
        and... there is a personnel θtendril nearby, too
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
        THERE IS A PULSE OF STRANGE THOUGHT, THE MOVEFRIEND'S CAVITY LURCHING TO A SIDE
        AND IT IS RESHAPED - A PATH IS FORMING, SLOWLY, AS IF IT WERE FORMED BY OUR CARRIER
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
        A GRIM TIME, BUT... HER MANEUVER DID WORK
        I SENSE TOZIK'S FRUSTRATION - HE ALSO WOULD REALLY LIKE TO KNOW
        OF COURSE, GAKVU IS NOT OBLIVIOUS,
        DROPPING HER CLAWS ALONG WITH HER VEL'S MASK

    gakvu
        forgive me. vel instinct
        my mindcore follows a mobile groundsmindry pattern
    
    tozik
        that is illegal
            EXEC::env.embassy.vn({tozik: 'fullview'});
    
    gakvu
        oh yes it is
        velzie's wrath, right?
        do not talk about this again, or i am dead. seriously
    
    akizet
        wait - can you make a path further? 
        to the exterior, or to the hangar?
    
    gakvu
        not with the movefriend lodged where it is
        i can manipulate its limbs to form some paths, but...
        it has a very complex system for traversing the spireblood and corroyi
        trying to orient myself with it would surely burn through my reserves
        we are better off waiting for rescue than trying something like that
        let us see what we can find around here, first
    
    sourceless
        SHE SPEAKS WITH SUCH DEEP FAMILIARITY...
        HOW COULD SHE HAVE HAD THIS ABILITY FOR SO LONG? AND FROM WHERE???
        NEVER ONCE HAS EVEN A HINT OF IT SURFACED
        FURTHER THOUGHT DELIVERS A SPIKE OF ANXIETY THROUGH MY CORE
        IS SHE WHAT I WAS WARNED ABOUT?
        I MUST TAKE THIS AT FACE VALUE FOR NOW
        WE HAVE FAR MORE PRESSING MATTERS
        FOR THE PATH TO RECREATION IS OPEN,
        AND WE NEED TO FIND ENOUGH MATERIALS TO REPAIR THIS MOVEFRIEND
    
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
        SHE HOLDS HER PALMS OUT AGAIN, AND AGAIN THE CHAMBER LURCHES
            EXEC::change("PAGE!!cpersonnel_unlocked", true);
        TENDRILS FORMING A LONG PATH TO THAT PERSONNEL θtendril NEARBY
        THE MINDCORES NEARBY ARE STARING... THEY DID NOT PROMISE LIKE WE DID
        BUT GAKVU CAN TALK TO THEM LATER!

    akizet
        which θtendril was this again?

    gakvu
        eyes closed
        could be any one

    sourceless
        KAZKI RELOCATED TO BE NEAR THE RECREATION HUB RECENTLY, RIGHT?
        SHOULD VELZIE HAVE A KIND PATH FOR US, IT COULD BE HERS...
        I KNOW SHE WOULD BE HEARTBROKEN IF HER COUSINLY GIFTS WERE LOST
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
        in our entrance, i am struck by the chaos
            EXEC::change("PAGE!!recenter", true)
        fixtures are overturned, broken apart, but settled
        like an invasion came and left in our brief unconsciousness
        and a few...
        a few qou bodies...
        are strewn about the wreckage
        shared horror rings through our connection
        but larval mortality rests far in the past
    
    akizet
        it is likely that only their bodies have collapsed
        we need to see if the mindcores are recoverable
    
    sourceless
        the container displacement is particularly unusual, some showing signs of impact
        and--is that the barfriend? it seems intact...
        gakvu and tozik both slink behind me
        i can feel that gakvu's attitude has shifted in the face of final death
        and tozik coldly examines the scene, particularly the containers
    
    tozik
        much of this was brought in service of the renovation
        so sfer will be within these, possibly enough for us to work with...
        along with some other tools that may prove helpful
    
    sourceless
        our goals here are clear enough, but...
        they do not move from my side
        the path we formed did not intersect with another, so,
        whatever attacked these qou,
        is still in the chamber...
        we should exercise caution

    RESPONSES::akizet
        investigate<+>END

SKIP::
`)

env.dialogues["d3_rec_investigate"] = generateDialogueObject(` 
start
    sourceless
        tozik kneels, corruskivi drawn
            EXEC::change("PAGE!!recreation", "dangerous");pauseSwapCam(true)
        and, just as he places its edge against the melting flesh...
        movement--behind, before, all around
            EXEC::refreshStage()
        as if we had disturbed the antennae of a sleeping beast
        all containers with the capacity to move writhe towards us,
        melting and stretching into violent shapes

    gakvu
        akizet?
    
    sourceless
        i flex the nerve of the timestopper
        just as the golem was drawn against us
        so too are these simple furnishings...
            EXEC::setCam({rotation: 145})
        adrenaline-like impulses resonate through our connection

    akizet
        stand with me
        if we could incapacitate our assistant golem,
        then these will be nothing before us

    timestopper
        no look listen

    sourceless
        realization starts from gakvu, and flows through the rest of us
        she was not calling my attention to the approach, but instead,
        to the spare listener in the corner
            EXEC::setCam({x: 3, y: 8, rotation: 140})
        its mass undulates strangely, visualization pulsing nearly out of its socket
        and even in this slowed time, senseless thought resonates from it,
        unending quiet nonsense whispered past our minds

    timestopper
        that started just now
        surely no coincidence
        no time to study - they draw closer
        prepare yourselves

    sourceless
        we have but a θblink to organize
    
    sys
        EXECUTING::"structure direction";"scenario"::
            EXEC::setCam({rotation: 180, offsetCamera: "rotateX(-25deg) translateY(-100%)"})

    plainsys
        hostile entities engaged by entering marked tiles
        encounters may occasionally be optional
        not currently applicable

    sys
        ::END

____SHOWIF::'EXEC::page.party.some((member)=>member.equipment.filter(i=>i).length)'
____END


    RESPONSES::akizet
        fight!!<+>END
            EXEC::pauseSwapCam(false);setCam();playerMoveTo(env.stage.creatureLoc.x, env.stage.creatureLoc.y, "up")
        
SKIP::change("PAGE!!recreation", "dangerous");refreshStage();toggleBgm(env.embassy.music_unsafe);pauseSwapCam(false);setCam();playerMoveTo(env.stage.creatureLoc.x, env.stage.creatureLoc.y, "up")
`)

env.dialogues["d3_rec_clear"] = generateDialogueObject(` 
start
____SHOWIF::["PAGE!!listenerEchoCount", "all"]
    sourceless
        the manipulated listener and containers cave under our strikes
            EXEC::change("PAGE!!recreation", "cleared");refreshStage()
        contents and record cysts scattered out into pools of sludge

____SHOWIF::["PAGE!!listenerEchoCount", "some"]
    sourceless
        we still stand ready for the remaining containers on approach, but...
        the altered listener surely somehow directed them,
        for their crawling towards us grows clumsy and sluggish, barely a threat
        naturally, we do not hesitate - they are quelled quickly
            EXEC::flash(true);change("PAGE!!recreation", "cleared")
            WAIT::2000
            THEN::play('stab', 0.5);refreshStage()
____END

    sourceless
        and the chamber grows quiet
        tozik kneels by a container, gakvu near another,
        and they rifle through the sludgy remains
            EXEC::changeBgm(env.embassy.music_collapse, {rate: 1})
        but i am unwilling to let my guard down
    
    akizet
        anything of use?

    sourceless
        between them are a few new tools--kavrukas, sensory cysts...
        but only three sfer cubes, each no larger than a kalstik
            EXEC::env.embassy.advanceSfer(3, "rec_clear")
        a terribly disappointing harvest
        gakvu turns over some of the freed tools in her claws
    
    sys
        ITEM_RECEIVED::"<span definition="INHERITED CONTEXT::${env.ITEM_LIST['eq_kavruka'].description}">kavruka satchel</span>"
            EXEC::env.embassy.conditionalItem('eq_kavruka', 1, 'reckav')
            AUTOADVANCE::
    
    definitionget
        TEXEC::definitionRender({getAttribute: () => "STATUS++item_kavruka"}, {returnHTML: true})

    sys
        ITEM_RECEIVED::"<span definition="INHERITED CONTEXT::${env.ITEM_LIST['eq_aima_cyst'].description}">aima cyst</span>"
            EXEC::env.embassy.conditionalItem('eq_aima_cyst', 1, 'reckai')
            AUTOADVANCE::
    
    definitionget
        TEXEC::definitionRender({getAttribute: () => "STATUS++item_aima"}, {returnHTML: true})

    gakvu
        these are not exactly weapons, but...
        i can imagine how we might use them

    tozik
        not enough sfer to fix movefriend
        most of the heavy containers held miscellaneous archives...

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
        these ones are still alive
        their mindcores, anyway

    tozik
        how...
        ah. groundsmindry, right
    
    gakvu
        connection may not be possible,
        but any corrucystic mind is easy enough to sense

    RESPONSES::akizet
        get them out<+>END
            EXEC::change("PAGE!!queue_person_enable", true)

    RESPONSES::sys
        open party menu<+>END
            EXEC::change("PAGE!!queue_person_enable", true);cutscene(true);env.partyPending = true

SKIP::change("PAGE!!recreation", "cleared");refreshStage();change("PAGE!!queue_person_enable", true);changeBgm(env.embassy.music_collapse, {rate: 1, length: 5});env.embassy.conditionalItem('eq_kavruka', 1, 'reckav');env.embassy.conditionalItem('eq_aima_cyst', 1, 'reckai')
END::env.partyPending == true ? (cutscene(false), togglePartyMenu(), env.partyPending = false) : false
`)

env.dialogues["d3_rec_body1"] = generateDialogueObject(` 
start
    sourceless
        I REACH INTO THE CHEST CAVITY OF THE QOU,
            EXEC::specialCam('deadqou1');pauseSwapCam(true)
        AND EXCAVATE HANDFULS OF SLUDGED INTERNALS
        SUDDENLY, A HAIR-THIN SPINE STABS OUT FROM THE CENTER OF THEIR BODY
        THEN ANOTHER--MINDCORE TENDRILS, DEFENSIVELY PRODDING AT ME
        THEY MUST THINK I AM ONE OF THE CONTAINERS

    akizet
        relax, it is safe
        i am helping you out of there
    
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
        and after it hit, our golem tried to kill us...

    akizet
        with very specific intent, too
        it aimed for her mindcore
        you are lucky to have survived so long!
        what is your name?
    
    itzil
        wow!
        they did bash against me for a while, but...
        they must have thought i was dead when i stopped moving!
        it seems velzie has a role for me yet!
        i am itzil!!
        i was supposed to be in golem maintenance,
        but, i had my dear kivii covering, for...
        ...
        hey, was it only this area that was attacked?
        have you been to the golem maintenance θsegment?
    
    akizet
        we do not know - the movefriend is disabled,
        and communications are unusable
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
        sorry, i thought you were one of the containers
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

/* 
    this now has a few states
    - early - talking before the fight. recalled the fight, shared some info
    - revisit - talking after the fight, while having done 'early'. we get the original tozik theorizing
    - regular - talking only after the fight. we get both some recollection and theorizing
*/
env.dialogues["d3_barfriend"] = generateDialogueObject(`
early
    sourceless
        I CAUTIOUSLY APPROACH THE BARFRIEND, GAKVU AND TOZIK BEHIND
            EXEC::env.embassy.vn({gakvu: "defocus", tozik: "defocus"});pauseSwapCam(true)
        IT HAS TAKEN SHELTER BEHIND THE DAMAGED SIMULACRA DISPENSARY

    akizet
        barfriend...?

    barfriend
        hello akizetesche
        i cannot presently serve you due to critical dispensary damage!
        sorry!! i recommend you seek shelter instead!

    akizet
        no, that is...
        that is fine, but what happened here?
        to these qou?

    barfriend
        i am not entirely certain!
        there was a painful noise! i felt my existence being weighed upon!!
        and then there was an unexpected lapse in my consciousness!
        when this lapse concluded, 
        the qou that i was serving were being torn apart by the containers!

    akizet
        what?!
    
    sourceless
        we draw together defensively, glancing over the displaced containers
        they share a common mobile form, capable of very basic movement instruction...
        but little else. how could they be used to such violent ends?

    tozik
        did they attack you?

    barfriend
        no! they did not react to my presence in any fashion!
        after, they became inactive!

    sourceless
        gakvu glares at the barfriend intensely

    gakvu
        its echo is completely intact...
        barfriend, the 'painful noise',
        did it feel like a transmission of thought?
        we felt something very similar

    barfriend
        yes!
        i could not discern its exact meaning!
        but it was very overwhelming!!

    sourceless
        tozik's gaze draws over the containers, then the golem, and back...
        receptors twisted in troubled thought
        he looks at me, and with an impulse through our connection,
        it is known: further investigation can wait--we must take action
    
    akizet
        thank you, barfriend
    
    RESPONSES::akizet
        keep moving<+>END
            EXEC::change("PAGE!!barfriend", "early");env.embassy.vn({gakvu: "", tozik: "", bg: false});pauseSwapCam(false)

SKIP::vn.done();specialCam(false);pauseSwapCam(false)

revisit
    sourceless
        we approach the barfriend once more
            EXEC::env.embassy.vn({gakvu: "defocus", tozik: "defocus"});pauseSwapCam(true)
        it still shelters behind the damaged display
        gakvu focuses on the golem, through its flesh

    gakvu
        its echo is the same as before... no threat

    akizet
        barfriend, did you feel what the listener was doing?
    
    barfriend
        yes! the same painful noise! the same weight!
        it was very unpleasant!

    akizet
        i see. do not worry!
        the source is dealt with, you are safe
    
    gakvu
        odd...
        why was it not compelled to attack us?
        surely its sharp arms would serve better in slaughter than those clumsy things

    sourceless
        TOZIK LEANS AGAINST THE BARTOP NEARBY
        STARING AT THE CONTAINERS, THEN THE QOU-BODIES...

    akizet
        what is it?

    sourceless
        A θblink PASSES BEFORE HE ACTUALLY LOOKS AT ME
        HIS ANSWER COMES WITH AN UNCERTAIN PULLBACK OF HIS RECEPTORS

    tozik
        theorizing...
            EXEC::env.embassy.vn({tozik: "fullview", bg: true});
        it is too early to say anything for certain, but,
        the containers lack any components that could hold instruction for very long
        only direct, focused control could have driven them this way...
        was that what the listener was emanating? groundsmindry instruction?

    sourceless
        HE DIRECTS ATTENTION TO GAKVU EXPECTANTLY

    gakvu
        i...
        tozik, i do not know
        it felt nothing like vekoa's instruction
        regardless, you know well that the listeners have no capacity for this
        they are little more than a shell for their sensor in the dull
        
    sourceless
        gakvu falls silent suddenly, as if there were a vein to pull further to expose some organ of truth
        but with a simple exchange of impulses, we recognize the need to press forward
        there will be time to investigate when we have escaped with our θdeaths
    
    RESPONSES::akizet
        keep moving<+>END
            EXEC::env.embassy.vn({gakvu: "", tozik: "", bg: false});pauseSwapCam(false)

SKIP::vn.done();specialCam(false);pauseSwapCam(false)


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
        barfriend, did you feel anything strange?
        a painful transmission of thought before or during the attack?

    barfriend
        IS THAT WHAT THAT WAS?
        YES! I FELT MY EXISTENCE BEING WEIGHED UPON!
        i could not discern its exact meaning!
        but IT WAS VERY UNPLEASANT!
        BUT IT WENT AWAY
    
    akizet
        well, do not worry! you are safe now

    sourceless
        TOZIK LEANS AGAINST THE BARTOP NEARBY
        STARING AT THE CONTAINERS, THEN THE QOU-BODIES...

    akizet
        what is it?

    sourceless
        A θblink PASSES BEFORE HE ACTUALLY LOOKS AT ME
        HIS ANSWER COMES WITH AN UNCERTAIN PULLBACK OF HIS RECEPTORS

    tozik
        theorizing...
            EXEC::env.embassy.vn({tozik: "fullview", bg: true});
        it is too early to say anything for certain, but,
        the containers lack any components that could hold instruction for very long
        only directly focused control could have driven them this way...
        was that what the listener was emanating? groundsmindry instruction?

    sourceless
        HE DIRECTS ATTENTION TO GAKVU EXPECTANTLY

    gakvu
        i...
        tozik, i do not know
        it felt nothing like vekoa's instruction
        regardless, you know well that the listeners have no capacity for this
        they are little more than a shell for their sensor in the dull
        
    sourceless
        gakvu falls silent suddenly, as if there were a vein to pull further to expose some organ of truth
        but with a simple exchange of impulses, we recognize the need to press forward
        there will be time to investigate when we have escaped with our lives
    
    RESPONSES::akizet
        keep moving<+>END
            EXEC::env.embassy.vn({gakvu: "", tozik: "", bg: false});pauseSwapCam(false)

SKIP::vn.done();specialCam(false);pauseSwapCam(false)
`)

/* PERSONNEL - LOWER-AWAY TENDRIL
*/
env.dialogues["d3_person_intro"] = generateDialogueObject(` 
start
    sourceless
        THE PERSONNEL θtendril IS DARK, LIT BARELY BY THE LIGHTS OF THE INCOHERENT
        AN ATTENDANT BEARS THE SAME STRANGE SIGIL AS OUR GOLEM...
        AND SOME VEILKLIGHTS CARRY THE SAME DISTORTION AS THE HOSTILE CONTAINERS
        THOUGH WE CLEARLY ENTER INTO THEIR SIGHT, THEY DO NOT MOVE,
        IN A SORT OF PASSIVE STASIS?
        PERHAPS THE GROUNDSMIND'S ATTENTION IS ELSEWHERE?
        WE PEER ABOUT CAREFULLY, QUIETLY, UNDER THEIR NOTICE FOR NOW
        A SHARED VOICE RINGS THROUGH THE TIMESTOPPER
    
    timestopper
        LOOK! THERE!
        THERE ARE MORE QOU-BODIES
        CAN WE HELP?
        CAREFUL
        I STILL SENSE SOMETHING CONTROLLING THESE CONSTRUCTS
        I AM CERTAIN THEY WILL STRIKE AS SOON AS WE DRAW NEAR
        TREAD CAREFULLY
    
    RESPONSES::akizet
        stay behind me<+>END

SKIP::
`)

//ING TODO - finally use this for a boss ?
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
        THE θtendril STANDS SILENT
            EXEC::pauseSwapCam(true)
____SHOWIF::'gameplay_off'
        TO SEE CONTAINERS WIELDED AGAINST US WAS UNUSUAL,
        BUT THIS GOLEM SEEMED TO BE ALTERED BY THE VEILKLIGHTS
        THEIR GLOW CARRIED THE SLIGHTEST TINGE OF THE DULL...
        SHIFTING ITS FLESH, SHARPENING IT, RESHAPING IT
        BUT IT FELL BEFORE US REGARDLESS
____END
        IMMEDIATELY, GAKVU GOES TO CHECK A NEARBY QOU
            EXEC::env.embassy.vn({bg: true, tozik: "defocus", gakvu: "defocus"});pauseSwapCam(true)
    
    gakvu
        these ones...
        the attendant directly struck the mindcores
        there is nothing we can do for them
    
    sourceless
        SHE IS FROZEN THERE, BY THEIR CORPSE
        HER SORROW SPREADS INTO OUR CONNECTORS
        WE HAVE LITTLE TO OFFSET IT 
        BUT I AM NO STRANGER TO ITS BITE

____SHOWIF::"pau|miltza"
    sourceless
        MILTZA KEEPS HER DISTANCE, TRYING NOT TO STARE
        I CAN CLEARLY IMAGINE THE TERROR SHE IS FEELING BY HER AVOIDANCE
        HER RECEPTORS BALL WITH DISCOMFORT, 
        SURELY AT THE COLDNESS THAT WE TREAT HER FALLEN NEIGHBORS WITH
        BUT THERE IS LITTLE TIME FOR MOURNING
____END
        TOZIK PREOCCUPIES HIMSELF WITH LOOKING THROUGH DEBRIS
        THE STILL-GLOWING CORE OF A VEILKLIGHT CATCHES HIS ATTENTION

    sys
        ITEM_RECEIVED::"<span definition="INHERITED CONTEXT::${env.ITEM_LIST['eq_fusedlight'].description}">fused light</span>"
            EXEC::env.embassy.conditionalItem('eq_fusedlight', 1, 'pers')
            AUTOADVANCE::
    
    definitionget
        TEXEC::definitionRender({getAttribute: () => "STATUS++item_fusedlight"}, {returnHTML: true})
    
    gakvu
        ...
        this does not make any sense...
        they really are killing <em>everyone</em>...

    sourceless
        WHAT I EXPECTED TO BE HORROR IN HER VOICE, 
        IS INSTEAD SOMETHING LIKE MORBID CURIOSITY
        MILTZA'S STANCE GROWS TENSE, BUT SHE SAYS NOTHING
            SHOWIF::"pau|miltza"
        TOZIK CEASES HIS RUMMAGING TO WATCH GAKVU FOR A θblink
        THERE IS SOME FAMILIARITY IN HER GAZE UPON THAT BODY--A FRIEND?
        NO, A FALLEN FRIEND WOULD COMMAND MOURNING, NOT... THIS
        I CAN TELL HE WANTS TO PRY, BUT HE DOES NOT
        AND I WOULD RATHER NOT DO THAT NOW, MYSELF...
    
    tozik
        well,
            EXEC::env.embassy.vn({bg: true, tozik: "fullview"})

    sourceless
        TOZIK PULLS A SFER CUBE FROM THE REMAINS OF A CONTAINER
            EXEC::env.embassy.advanceSfer(1, "person_clear")
    
____SHOWIF::['PAGE!!movefixed', false]
    tozik
        we still need some more sfer
            SHOWIF::['PAGE!!miltzameet', false]
        we should check the rooms that are not broken
            SHOWIF::['PAGE!!miltzameet', false]

        we have what we need to fix movefriend
            SHOWIF::['PAGE!!miltzameet', true]
        we should head back to the relocator
            SHOWIF::['PAGE!!miltzameet', true]
____SHOWIF::['PAGE!!movefixed', true]
    tozik
        nothing more to be found here
____END

    RESPONSES::akizet
        continue<+>END
            EXEC::env.embassy.vn({bg: false, tozik: "", gakvu: ""});pauseSwapCam(false)

    RESPONSES::sys
        open party menu<+>END
            EXEC::env.embassy.vn({bg: false, tozik: "", gakvu: ""});pauseSwapCam(false);cutscene(true);env.partyPending = true;

SKIP::env.embassy.advanceSfer(1, "person_clear");vn.done();pauseSwapCam(false);env.embassy.conditionalItem('eq_fusedlight', 1, 'pers')
END::env.partyPending == true ? (cutscene(false), togglePartyMenu(), env.partyPending = false) : false
`)

env.dialogues["d3r2"] = generateDialogueObject(`
start
    sourceless
        THIS IS...
            EXEC::pauseSwapCam(true)

    gakvu
        kazki's room!!
            EXEC::env.embassy.vn({gakvu: "fullview"})
        i thought this θtendril looked familiar

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
        THERE ARE SOME UPKEEP TOOLS, MOST MELTING...
        SOME OF THESE ARE TOO POORLY MARKED TO DISCERN,
        BUT SOME CYSTS--WHICH I ASSUME MUST BE MEMORY CYSTS--REMAIN INTACT!
        I AM NOT SURE WHAT SHE WOULD WANT US TO BRING, SO,
        I COLLECT A FEW OF THOSE
            EXEC::change("d3_kazkichest", true)
        WHILE I STAND, GAKVU PRODS AT THE COVER THAT REFORMS
    
    gakvu
        strange that this still works
            EXEC::env.embassy.vn({bg: true, gakvu: "fullview"})
        stranger still was the variety of intact or sludged cores in there...
        it feels like what is breaking or attacking is completely random, right?
    
    tozik
        this has been troubling me too
            EXEC::env.embassy.vn({tozik: "fullview"})
        for example, why are the doors not 'biting' us?
        or the timestopper, why is it cooperating?
        i have an idea...
        but i need to see more

    RESPONSES::akizet
        keep moving<+>END
            EXEC::change("PAGE!!kazkichest", true);vn.done();pauseSwapCam(false)

SKIP::change("d3_kazkichest", true);change("PAGE!!kazkichest", true);vn.done();pauseSwapCam(false)
`)

env.dialogues["d3r2_guns"] = generateDialogueObject(`
start
    sourceless
        WE PRY SOME OF THE WEAPONS FROM THE ADHESIVE SKIN OF THE DISPLAY
        BUT I DO NOT EVEN KNOW WHERE TO START
            EXEC::change("PAGE!!checkedguns", true);specialCam("kazkiguns");pauseSwapCam(true)
        MILTZA EXPERIMENTALLY TURNS OVER A SMALL WEAPON THAT HER CLAWS NEARLY ECLIPSE
            SHOWIF::"pau|miltza"
        TOZIK NONCOMITTALLY TAKES ONE OF THE LARGE ONES BY ITS LONG CYLINDRICAL END
            EXEC::vnp({tozik: "show shiftleft"})
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

____SHOWIF::"pau|miltza"
        AND AS WE WATCH HIM, A METALLIC CLATTER TEARS OUR ATTENTION TO MILTZA
            EXEC::vnp({miltza: "show"})
        A CIRCULAR COMPONENT OF THE SMALL WEAPON SHE HELD IS DISLOCATED,
        RELEASING SIX LITTLE DEAD METAL CYLINDERS THAT SCATTER ABOUT 
        CERTAINLY SOME SORT OF FUEL

    miltza
        ah!!
        sorry...

    sourceless
        IN SHORT TIME, THEY ARE COLLECTED AGAIN
        REPLACED AND SLID BACK INTO THEIR LITTLE HOLES
        DELICATELY, MILTZA RETURNS IT TO THE EXAMINATION SLAB
____END

    RESPONSES::akizet
        keep looking<+>END
            EXEC::specialCam(false);vn.done();pauseSwapCam(false)
`)

env.dialogues["d3r1"] = generateDialogueObject(`
start
    sourceless
        AS WE STEP INTO THE ROOM, AN UNFAMILIAR TIR QOU LEAPS AT US
            EXEC::pauseSwapCam(true);env.embassy.vn({miltza: "display far"})

    sourceless
        SHE HOLDS A DISABLER - AN EXTREMELY POTENT CORRUCYSTIC DECONSTRUCTOR
            EXEC::env.embassy.vn({bg: true, tozik: "defocus", gakvu: "defocus", miltza: "far show"})
        ITS SPIKES PROTRUDE OUTWARDS, CLEARLY ON THE VERGE OF TRIGGERING,
        BUT OUR FAMILIAR APPEARANCE CREATES ENOUGH HESITATION FOR THOUGHT
        
    miltza
        stay back!!
        wait
        are you...?

    akizet
        relax
        we are not here to hurt you
        but we are looking for materials to repair the movefriend
        do you have anything?
    
    sourceless
        HER RECEPTORS, BALLED TIGHTLY, GRADUALLY UNFOLD
        INTENSE TERROR FADES INTO REALIZATION AND HOPE
        HER GAZE BREAKS AWAY IN THOUGHT ONLY AFTER A θblink

    miltza
        oh...
        oh!!
        yes! here!
    
    sourceless
        SHE DIGS OUT SOME SFER CUBES FROM THE REMAINS OF NEARBY CONTAINERS, SURELY DESTROYED BY HER HAND
            EXEC::env.embassy.advanceSfer(2, "miltza")
        NEARLY TUMBLING INTO THE MESS WITH HER FRANTIC MOVEMENTS
        AND I SHOULD EXPECT THIS LEVEL OF PANIC, NATURALLY
        BUT THE STRENGTH OF HER REACTION IS SO FAMILIAR...
        A DISTANT VISION OF THE PAST, OF CAVEBOUND REACTIONS TO INFESTATION
    
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
        i do not know... they were murmurs alone, and i could not get anything through to them
        but, you seem like good defenders - funny that you are not even kiv!
        here, take my disabler!
        you can probably use it better than me, anyway!

    sys
        ITEM_RECEIVED::"<span definition="INHERITED CONTEXT::${env.ITEM_LIST['eq_disabler'].description}">disabler</span>"
            EXEC::env.embassy.conditionalItem('eq_disabler', 1, 'miltzabler')
            AUTOADVANCE::
    
    definitionget
        TEXEC::definitionRender({getAttribute: () => "STATUS++item_disabler"}, {returnHTML: true})

    akizet
        oh--thank you!

    sourceless
        SHE QUICKLY TURNS TO SEARCH THROUGH HER OVERTURNED FURNITURE
        GATHERING LITTLE CYSTS AND TRINKETS INTO HER FORM

    akizet
        miltza, we still are not sure of the extent of this attack...
        we have gathered some other survivors, but really--
        the damage we have witnessed so far is unconscionable
        you could stay and shelter, but i really do recommend that you...

    sourceless
        URGENTLY, HER GAZE FIXES BACK UPON ME, WAVING HER THIRD ARM WITH INTENSE DISMISSAL
    
    miltza
        no no no no, i understand--i will join you!!
        we have to get out of here
        i am just going to gather some things, then go shelter in the lift!

    sourceless
        SHE RETURNS TO HER SEARCH
            EXEC::env.embassy.vn({miltza: "display far"})

    akizet
        be safe, my friend. we will see you again soon

    RESPONSES::akizet
        continue<+>END
            EXEC::env.embassy.vn({bg: false, tozik: "", gakvu: "", miltza: ""});pauseSwapCam(false)

    RESPONSES::sys
        open party menu<+>END
            EXEC::env.embassy.vn({bg: false, tozik: "", gakvu: "", miltza: ""});pauseSwapCam(false);cutscene(true);env.partyPending = true;

SKIP::env.embassy.advanceSfer(2, "miltza");env.embassy.conditionalItem('eq_disabler', 1, 'miltzabler');vn.done();pauseSwapCam(false)
END::env.partyPending == true ? (cutscene(false), togglePartyMenu(), env.partyPending = false) : false
`)


/* 
    POST GATHERING / MOVEFRIEND FIGHT
*/

env.dialogues["d3_relocator_return"] = generateDialogueObject(`
start
    sourceless
        WHEN WE RETURN, TOZIK IMMEDIATELY DRAWS NEAR MOVEFRIEND
            EXEC::specialCam("movefriend_examine");env.embassy.vn({tozik: 'defocus'});pauseSwapCam(true)
        HE SETS THE COLLECTED SFER NEARBY, PREPARING AN AREA FOR HIMSELF TO WORK
        MILTZA WATCHES QUIETLY FROM THE EDGE OF THE ROOM
        SHE WANTS TO HELP, IT IS CLEAR IN HER DOWNWARD RECEPTORS
        BUT SHE IS NO θjut, NOR CYSTIC ENGINEER
    
    tozik
        this is going to take me some time
            EXEC::env.embassy.vn({tozik: 'fullview'});
        i will need you to watch over me while i work
        should we start now?

____SHOWIF::["PAGE!!kazkiroom", false]
    miltza
        wait--! i saw other unlocked gates when i ran in here,
        behind the, assailants...
        there could still be other survivors!
    
    tozik
        between you and the three bodies,
        that was likely most of the qou within that θtendril
        but...

    sourceless
        some worry spikes through our connection,
        impulses of deference pointing to my mind

    tozik
        i will not deny the possibility
        akizet?
    
    akizet
        we should help everyone we can...
    
    sourceless
        i draw my gaze over the ekiviks
        both resolute, but clearly shaken by all that has transpired
        these attacks seem to be so targeted, 
        that one mistake, one little twist of the path by velzie...
        i could lose them both

    akizet
        ...but i do not want to risk your lives unnecessarily
        that one attendant killed three qou
        every single fight we start is another handing off of our fates to velzie
        are you willing to push through with me?

    tozik
        yes
    
    gakvu
        akizet...
        the timestopper is not the only advantage we hold

    sourceless
        her coiled receptors loosen, playful confidence briefly returning in her tone
        there is such a swelling of trust in my judgement through our connection

    tozik
        make the decision quickly
        if our θsegment is in this state, 
        the whole structure of the embassy must be falling apart

    akizet
        let me think, then
____END

    sys
        EXECUTING::"structure direction";"imminent stream finale"::
            EXEC::change('PAGE!!movefriendqueued', true);change("PAGE!!ep3queuecheck", true)

    plainsys
        current memory stream near conclusion
        abnormal structure detected; iteration saving advised
        consider activating LOW INTENSITY if hardware is limited; system menu
        return to entity; DISRUPTED MOVEFRIEND; when prepared to proceed

    sys
        ::END
    
    RESPONSES::akizet
        prepare<+>END
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
            EXEC::pauseSwapCam(true);vn.done()
        i would rather not seal these paths, just in case
        gakvu, you watch the path to personnel,
        i will watch the path to recreation
    
    tozik
        all right, stand by
            EXEC::vnp({tozik: "show", bg: true})
    
    sourceless
        TOZIK KNEELS NEAR MOVEFRIEND'S FACE, PREPARING HIS CORRUSKIVI
        AN INCISION IS MADE IN THE CONSTRUCT'S GLASS, PARTING IT LIKE A GATE
        A PROTECTIVE MEMBRANE FORMS OVER ITS INNARDS TO PREVENT CONTAMINATION
    
    sourceless
        THE CORRUSKIVI LIQUIFIES, FORMING OVER HIS CLAW FULLY
        HE SPREADS IT TO HIS OTHER ONE, TOO, BECOMING A SET OF GLOVES
        ONE HAND REACHES INTO MOVEFRIEND'S ORGANS, AND HIS OTHER FETCHES SFER TO IMPLEMENT
        I CANNOT CLEARLY SEE WHAT ELSE HE DOES, BUT I ASSUME IT IS SIMPLE REFORMATION
            EXEC::vnp({tozik: "show far", bg: true})
        SO I RETURN TO WATCHING MY PATH - GAKVU DOES THE SAME
        ...
        AFTER SOME TIME,
        TOZIK PULLS AWAY FROM MOVEFRIEND
            EXEC::vnp({tozik: "show shiftright"})
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
            EXEC::vnp({tozik: "show shiftright", bg:false});document.querySelector('#realgrid .lifter').classList.add('fixed')

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
        MUCH TO MOVE MUCH TO DO
        VERY COOL!!
        FRIENDS: PROBLEM
        I AM SUFFERING ??
    
    tozik
        peculiar
        you should be feeling the same as before
        what is wrong?
    
    sourceless
        OUR MOVEFRIEND'S FACE RIPPLES STRANGELY, EMITTING A MEANINGLESS WARBLING VOCAL TONE
        THE PATHS GAKVU HAD CARVED WITH THE MOVEFRIEND'S TENDRILS LIQUIFY, CLOSING AGAIN
        GAKVU STUMBLES OUT OF THE WAY, NEARLY CAUGHT IN THE MOVEMENT
        MOVEFRIENDS ARE RARELY SO HAPHAZARD...

    movefriend
        I SHOULD NOT BE AW»AKE
    
    sourceless
        ITS FACE FLICKERS AWAY AND THE ROOM FALLS QUIET
            EXEC::changeBgm(env.embassy.music_p1boss_suspense, {rate: 0.5});document.querySelector('#realgrid .lifter').classList.remove('fixed')
    
    akizet
        §kºù
        are we trapped in here again?
    
    tozik
        what could have gone wrong...?
        the components were all fine
    
    sourceless
        GAKVU BACKS AGAINST THE INNER WALL OF THE RELOCATOR
            EXEC::vnp({bg: true, gakvu: "show shiftright"})
        A SHARP WAVE OF TERROR RUNS THROUGH OUR CONNECTION
        
    gakvu
        the... 
            EXEC::ratween(env.bgm, 0.75, 10000)
        the groundsmind, she...
        it sees us

    sourceless
        THE AGGRESSOR'S SIGIL FORMS IN PLACE OF MOVEFRIEND'S FACE   
            EXEC::vfx({type: "darkflash", state: true});vn.done()
            WAIT::1000
            THEN::change("PAGE!!movefoeactive", true);changeStage('embassy_relocator')
            NOTE::should inherit darkflash classes
        I HEAR THE SOUND OF CORRU SHIFTING BEHIND THE WALLS

    aggressor
        cÅ4Ä–sT
            EXEC::content.classList.add('painprep', 'painhalf');vfx({type: "darkflash", state: false})
        ýæôr,§½ÿlfÃ
        ÄS¿De
    
    sourceless quiet
        A PRESSURE WEIGHS AGAINST OUR MINDS, OUR CORRUCYSTIC ORGANS
            EXEC::content.classList.add('painmode');play("criticalError", 0.5)
        BUT THE TIES TO OUR MINDCORES ARE TOO STRONG - THE OTHERS ARE FINE TOO
        MILTZA QUICKLY GATHERS THE EXPOSED MINDCORES INTO HER CLAWS, STAYING CLOSE
        
    sourceless
        BEFORE WE CAN QUESTION THE ENTITY, SPINES FORM ALONG THE WALLS
        SHARP TENDRILS EMERGE FROM MOVEFRIEND'S FORM IN UNEVEN PATTERNS
        IT IS CLEAR ENOUGH: IT INTENDS TO KILL US
        THERE IS NO CHOICE BUT TO FIGHT
            EXEC::content.classList.remove('painmode')

    RESPONSES::akizet
        activate timestopper<+>END
            EXEC::vn.done();specialCam(false);content.classList.remove('painprep', 'slowpain');ratween(env.bgm, 1)
            FAKEEND::prepare

SKIP::env.embassy.skips.d3_relocator_repair()
SKIPTIME::700
`)

env.dialogues["d3_movecmb"] = generateDialogueObject(`
start
    sys
        WARNING::'incoherence detected'

    sourceless
        with a flex of the timestopper's nerves, we are drawn into altered time again
        immediately, our minds race to find a solution

    timestopper
        do we destroy it?
        no we cannot escape without the movefriend
        harming it is out of the question
        then what?
    
    sourceless
        a θblink of strain comes through gakvu's link
        our collective attention is drawn to a particular spot
        the feeling of some shape laying behind the section of flesh,
        warping under the strain of this aggressor's mind

    gakvu
        there--behind that region of flesh, see??
        i feel it, a relay linked to the embassy's spine
        it feels the same as that listener
        so, if we can destroy it...
        maybe i can seize and reverse what has been done
        
    timestopper
        then our target is clear
    
    RESPONSES::akizet
        attack!<+>END
            FAKEEND::proceed

SKIP::
`)

env.dialogues["d3_moveshift"] = generateDialogueObject(`
start
    sys
        NOTICE::"utilized intra-combat checkpoint"
            SHOWIF::"PAGE!!mfcheck"

    sourceless
        the groundsmindry relay within the movefriend is crushed to sludge
        yet nothing appears to change?!
    
    timestopper
        why has it not ceased its attack?!
        must we destroy it? 
        no we cannot it is our only way around
        let me--
        
    sourceless
        gakvu draws much of the timestopper's focus for an instant
        soon after, she speaks through its connection

    gakvu
        §§š¦l&
        its body is still following the instruction
        we just need its echo working
        if i can reactivate it, i think it will go back to normal!!
        cover me

    timestopper
        is this chance enough to risk our lives?

    gakvu
        i doubt you have a better idea
        if the movefriend is destroyed, then we are doomed
        just cover me
        you will need a fighter in my place
        here--

    sourceless
        a jolt of shock runs through our connection, followed by a new silence
            EXEC::midCombatActorRemove(env.rpg.actors.gakvu)
            WAIT::600
        gakvu has removed her connector, charging for...
        miltza? who huddles with the mindcores, shielding them bodily
        suddenly, another jolt follows, with a new connection,
        AS GAKVU SHOVES THE CONNECTOR ONTO MILTZA'S RECEPTOR
            EXEC::midCombatActorAdd(env.rpg.allyTeam, "miltza", "right", {specificEquipment: page.party.find(m=>m.slug == "gakvu").equipment})
    
    miltza
        aaaahhh!!
        what is--this??
        oh... the timestopper? why did you--?
        
    akizet
        you need to help us keep movefriend away from gakvu
        do you have any weapons?
    
    miltza
        what!! no,
        no--sorry... that disabler was all i had
        but in my larval life, i was a remote coordinator
        i... could lend my eye to you?

    akizet
        that will do
        follow my instruction exactly and you will be safe
        i promise, miltza

    sourceless
        as a portion of my combat experience flows through her,
        surface-level memories of countless hunts and executions, the reflexes they formed...
        the intense hesitation i initially felt from her fades into the background
        an acknowledging impulse confirms--i may count on her

    sys
        NOTICE::"intra-combat stream checkpoint enabled"
            SHOWIF::["PAGE!!mfcheck", false]
            EXEC::change("PAGE!!mfcheck", true)

____SHOWIF::"low_intensity"
    sys
        WARNING::"hardware-sensitive memory sequence"
        NOTICE::"bypass if performance is untenable"
____END

    RESPONSES::sys
        bypass<+>CHANGE::d3_movefriend_finish
            SHOWIF::"low_intensity"
            FAKEEND::bypass sensitive sequence
            EXEC::vfx({type: "darkflash", state: true});endCombat(env.rpg.enemyTeam);env.embassy.endMovefriendBoss();change("PAGE!!mfskip", true)
    
    RESPONSES::akizet
        protect gakvu<+>END
            EXEC::env.rpg.halt = false;advanceTurn()
            FAKEEND::proceed
`)


env.dialogues["d3_movespecial"] = generateDialogueObject(`
start
    sourceless
        AROUND MOVEFRIEND, THE WALLS RIPPLE STRANGELY
            EXEC::env.bulletHell.paused = true
        as sure as gakvu suggests, it still follows some grim precept
        and IN ITS SPREADING INFLUENCE, SPIKES FORM OUT OF THE SHIFTING BLACK CORRU
        BEHIND US, GAKVU STRAINS TO HOLD THIS SPACE TOGETHER
        I ONLY HOPE SHE CAN STOP IT FROM SIMPLY CRUSHING US ALL

    sys
        WARNING::'abnormal thoughtform activity detected'
        EXECUTING::"structure direction";"proxy thoughtform"::

    plainsys
        entity; MOVEFRIEND; altering structure rule specifications
        utilize proxy thoughtform to avoid damaging effects
        direct proxy with primary method of navigation
        survive

    sys
        ::END

    moth
        looks like funfriend was right
            SHOWONCE::
        good luck buddy
            SHOWONCE::
    
    RESPONSES::self
        thanks<+>END
            EXEC::bh_movefriend({level: "healthy3"});env.bulletHell.paused = false
`)

env.dialogues.d3_closeout = generateDialogueObject(`
RESPOBJ::
    RESPONSES::sys
        save<+>explore
            FAKEEND::(continue)

        do not<+>END
            FAKEEND::(continue)
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
        ATTENTION::"thoughtform combat gameplay bypassed";"toggle within system menu if desired"
            EXEC::env.hoverIntervalRate = env.defaultHoverRate

    sourceless
        THROUGH OUR CAREFUL STRIKES UPON AN ORGAN HIDDEN WITHIN ITS FLESH,
        AS TO NOT JEOPARDIZE OUR SOLE METHOD OF TRANSPORTATION,
        WE DESTROY THE METHOD BY WHICH MOVEFRIEND IS EXTERNALLY MANIPULATED
        ITS GROUNDSMINDRY RELAY CRUMBLES, 
        AND WITH SOME EFFORT, GAKVU MANAGES TO REACTIVATE ITS ECHO,
        OVERRIDING THE HOSTILE INSTRUCTION
____SHOWIF::[['PAGE!!mfskip', true], ['low_intensity', true]]
    sys
        ATTENTION::"hardware-sensitive memory sequence skipped"
            EXEC::env.hoverIntervalRate = env.defaultHoverRate

    sourceless
        WITH SOME EFFORT, GAKVU MANAGES TO REACTIVATE ITS ECHO,
        OVERRIDING THE HOSTILE INSTRUCTION
            EXEC::vfx({type: "darkflash", state: false})
____END

    sourceless
        ALL AT ONCE, THE CHAOS STOPS
            EXEC::specialCam("movefriend_examine");changeBgm(page.bgm, {rate: 0.5});env.hoverIntervalRate = env.defaultHoverRate
        THE AGGRESSOR'S SIGIL FLICKERS AWAY, 
            EXEC::document.querySelector('#realgrid .lifter').classList.remove('aggressormode')
        AND MOVEFRIEND'S FACE RETURNS
            EXEC::document.querySelector('#realgrid .lifter').classList.add('fixed');change('PAGE!!movefixed', true)

    movefriend
        AAHH!!!
        OH!! WHAT IS ALL THIS?
        I AM SO SORRY
        PLEASE UNDERSTAND I WOULD NEVER TRY TO HURT YOU
    
    akizet
        gakvu--is it done?
    
    sourceless
        TOZIK TAKES THE MOVEFRIEND'S APOLOGY AS CONFIRMATION,
        KNEELING NEAR IT, SET ON CONFIRMING ITS STABILITY
    
    gakvu
        yeah...
            EXEC::env.embassy.vn({bg: true, gakvu: 'focus nocon'});

    sourceless
        GAKVU SLUMPS AGAINST THE BACK WALL ACROSS FROM MOVEFRIEND
        NOT FAR FROM HER, THE TREMBLING MINDCORES ARE HUDDLED TOGETHER
        THEY MUST HAVE STAYED IN HER PROTECTIVE RADIUS THROUGH THE ATTACK
        
    gakvu
        overpowering that control was... exhausting
        all of this should keep movefriend independent, i think

    sourceless
        THERE IS A MOMENT OF SILENCE, RELIEF
        BUT THEN A SHARP SUSPICION SPIKES THROUGH OUR SHARED CONNECTION

    miltza
        gakvu
        where did you learn to do that?
    
    sourceless
        GAKVU ONLY SNICKERS IN RESPONSE
        SHE WAVES HER RECEPTORS NEGATIVELY

    gakvu
        sorry, it is a secret!
    
    sourceless
        IF NOT FOR MILTZA'S CONNECTOR, I WOULD HAVE NO SUSPICION OF HER SUDDEN DREAD
        DIFFERENT, DISTINCT, EXPERTLY SUPPRESSED FROM BEING SHOWN PHYSICALLY
        A TRULY PECULIAR RESPONSE...
        GAKVU'S JOY IN TRIUMPH AND LACK OF CONNECTION LEAVE HER CLUELESS
        TOZIK SHIFTS BACK TO HIS FEET, UNINTERESTED IN THE ISSUE
            EXEC::env.embassy.vn({gakvu: 'fullview nocon', tozik: 'fullview'});
    
    tozik
        we should get out of here
    
    akizet
        we should, but...
        miltza - you said the hangar was trapping people, yes?

    sourceless
        MY QUESTION PULLS HER AWAY FROM SOME INTERNAL TOIL THAT LEFT HER MOTIONLESS
    
    miltza
        ah - yes, well...
            EXEC::env.embassy.vn({miltza: "display show focus hascon far", gakvu: 'defocus nocon', tozik: 'defocus'});
        the connection was poor, but that was the impression i gathered
        it did not sound good...
        the messages were intermingled with pain and fear

    akizet
        i see
        let me see if i can get in touch with anyone...
            EXEC::env.embassy.vn({miltza: "display show hascon far", gakvu: 'defocus nocon', tozik: 'defocus'});
    
    sourceless
        FUNFRIEND!
        CAN WE MAKE ANYTHING OUT FROM COMMUNICATIONS YET?
    
    funfriend
        HI AKIZETESCHE!!
        THE NOISE IS STILL MAKING MOST TRANSMISSIONS INCOHERENT
        I CANNOT UNDERSTAND MUCH
        THE AMBIENT PAIN AND FEAR IS FAR LESSER THAN BEFORE
        BUT I DO NOT THINK THAT IS A GOOD THING

    sourceless
        ...
    
    akizet
        we... should avoid the hangar 
        but that leaves few other options for safe escape

    miltza
        could we survive with the help of the timestopper?
        you are incredible fighters when it is active!!
    
    tozik
        not if the groundsmind has seized our vessels, too
        also, that is near the top of the spire...
        which may lie beyond the timestopper's influence

    gakvu
        how far are we from the groundsmindry floor?
    
    sourceless
        THERE IS A SHORT SILENCE,
            EXEC::env.embassy.vn({miltza: ''});
        OUR ATTENTION SHIFTING TO GAKVU
        SHE RISES TO HER FEET AGAIN
            EXEC::env.embassy.vn({gakvu: 'defocus nocon'});

    movefriend
        GAKVUKANI! 
            EXEC::env.embassy.vn({bg: false});
        THERE ARE ONLY THREE θsegment BLOCKS BETWEEN THE GROUNDSMINDRY AND HERE
        I CAN TAKE YOU DIRECTLY TO IT!
        AND, RELATIVE TO THE DISTANCE TO THE HANGAR,
        IT IS FAR CLOSER!

    itzil
        that is right!
            EXEC::env.embassy.vn({itzil: 'display show', gakvu: 'nocon defocus', tozik: 'defocus'});
        the golem maintenance θsegment block is just below this one!
        we could produce some armaments there, easily!!

    gakvu
        you see what i am suggesting
            EXEC::env.embassy.vn({itzil: '', gakvu: 'defocus nocon', tozik: 'defocus'});

    sourceless
        ARE WE REALLY GOING TO DO THIS?

    miltza
        you truly think <em>we</em> could stop this?
    
    tozik
        who else?
        escaping the immediate disaster is possible
        but this could be happening outside
        just think of the countless golems and constructs deployed
        if the bright cousins are aggressed by even one, they will destroy us
        likely never to let us near their planet again
        to say nothing of the final deaths a total collapse would bring
        we may be the only ones with an advantage
        yes, we must stop the groundsmind

    sourceless
        WE EXCHANGE GAZES, DISBELIEF MIXED WITH REALIZATION
        THE NOTION IS ABSURD, YES,
        BUT WHAT IF THERE REALLY IS NO ONE ELSE WHO STANDS A CHANCE?
        PERSONALLY, A SICKLY EXCITEMENT SWELLS IN MY CORE
        WITH A BRIEF REFLECTION, I AM NEARLY FRIGHTENED TO ACKNOWLEDGE...
        I HAVE NEVER FELT MORE AT HOME ON THIS BRIGHT WORLD
        WHAT A TWISTED SHAPE VELZIE HAS LEFT ME
    
    akizet
        ...does anyone object?
    
    sourceless
        I EXAMINE MILTZA AND THE TWO EXPOSED QOU
            EXEC::env.embassy.vn({bg: true, karik: 'display show', itzil: 'display show', gakvu: 'hide', tozik: ''});
        MILTZA'S RECEPTORS TWIST AND WRING WITH CONFLICTION
        BUT THE MINDCORES SPEAK UP FIRST
    
    itzil
        i am not leaving until i find my kivii!

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
            EXEC::env.embassy.vn({bg: false, itzil: '', miltza: 'hide hascon', karik: '', gakvu: "hide nocon"});vfx({type: "darkflash", state: true});change("PAGE!!movefoeactive", "DELETE")
            WAIT::1000
            THEN::refreshStage({noFlash: true});vfx({type: "darkflash", state: false});
        ADVISE::'save iteration'
        NOTICE::'render can continue without incoherence'
        NOTICE::'additional activity detected'::IN::'research center'
            SHOWIF::['PAGE!!archiveopen', false]

____SHOWIF::['ENV!!ep3', false]
        ATTENTION::'next memory stream segment incomplete';'internal note attached'::
    
    funfriend
        hello interloper! please come back in a θwink! i am nearly done with this next part!

____SHOWONCE
    moth
        ok, well... looks like we have to wait a little while again
        i'll keep an eye on the broad activity in the corrucyst
        if i see any changes in these memories, i'll let you know
        i bet funfriend will be done tomorrow with everything i see going on here
        if you want to call it for today, go ahead
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

END::specialCam(false);pauseSwapCam(false);change("PAGE!!ep2xplore", true)
SKIP::env.embassy.skips.d3_movefriend_finish();change("PAGE!!ep2xplore", true);env.embassy.collapseSave({effects: true})
SKIPNOTICE::will save the iteration
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
        hello interloper! please come back in a θwink! i am nearly done with this next part!
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

//ing todo: this is no longer used
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
        THEY NEEDLE OUR FOES, AND IN A θblink, THEY HAVE STARTED TO MELT
            EXEC::setTimeout(()=>play('shot2', 0.6), 300)
    RESPONSES::akizet
        continue<+>END
            EXEC::env.combat.dynamicCombat({dry: true});cutscene(true);setTimeout(()=>{cutscene(false);env.combat.dynamicCallback(env.rpg.enemyTeam)}, 1010)
            FAKEEND::(wait)
`)

//ing todo: this is no longer used
env.dialogues["d3_genericenemyvictory"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";"toggle within system menu if desired"
____END

    sourceless
        OUR FOES LIE DESTROYED
        TEXEC::env.combat.dynamicReward()

    RESPONSES::akizet
        continue<+>END
            EXEC::forceSwapCam(false)
`)

env.dialogues["d3_newsavewarning"] = generateDialogueObject(`
start
    sys
        EXECUTING::"structure direction";"iteration restart"::

    plainsys
        creation of new iteration will delete prior iteration configuration
        proceed only if prior iteration state is undesirable

    sys
        END::
    
    RESPONSES::self
        do it<+>END
            EXEC::cutscene(true);page.newit = 1
            
        nevermind<+>END

END::if(page.newit) {env.embassy.newCollapseIteration(page.newit)}
`)

env.dialogues["d3_partselection"] = generateDialogueObject(`
start
    sys
        EXECUTING::"structure direction";"stream selection"::

    plainsys
        creation of new iteration will delete prior iteration configuration
        proceed only if prior iteration state is undesirable
        additionally; select desired memory stream
        two of three total streams available; third suffers prohibitive incoherence
            SHOWIF::[["gol__bossclear", false], ["ENV!!ep4", false]]
        three streams available
            SHOWIF::[["gol__bossclear", true], ["ENV!!ep4", true]]
        stream 1; beginning; research
        stream 2; descent; golem maintenance
        stream 3; destruction; groundsmindry
            SHOWIF::[["gol__bossclear", true], ["ENV!!ep4", true]]
        if selected stream has preceding streams
        equipment from previously completed optional segments will be granted
        
    sys
        END::

    RESPONSES::self
        stream 1<+>END
            EXEC::cutscene(true);page.newit = 1
            FAKEEND::(1/3: research)

        stream 2<+>END
            EXEC::cutscene(true);page.newit = 2
            FAKEEND::(2/3: maintenance)

        stream 3<+>END
            EXEC::cutscene(true);page.newit = 3
            SHOWIF::[["gol__bossclear", true], ["ENV!!ep4", true]]
            FAKEEND::(3/3: groundsmindry)
            
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
        i had simply never seen a hint of it from you
    
    gakvu
        hehehe, i see
        on the surface only, akizet
        i was larval back when structurism swept ekiva
        and i hated it
        but my parents had their receptors entangled in the structurist song
        they saw sure that i became one of the constructors, too
        so i slowly became an expert in feigning interest

    akizet
        a constructor? so--you worked on the okizika?

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
        GAKVU'S GAZE DRIFTS IN THOUGHT
        SHE SNICKERS TO HERSELF BEFORE ANSWERING,

    gakvu
        yes, but...
        her favorite bright weapons are the larger ones
        and there is no way we are carrying her clothes
    
    sourceless
        THESE ARE SHAMELESS EXCUSES
        BUT, I AGREE, SO... I SIMPLY NOD MY RECEPTORS
    
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
        would you please... turn your coat off?
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
        is that a permanent fixture of your qou-body?
        or just a lucky coincidence?
    
    sourceless
        TOZIK LOOKS AT HIS CORRUSKIVI THOUGHTFULLY,
        CURLING THE FINGER IT IS ANCHORED TO
        I CAN SEE NOW IT IS SOMEWHAT ORNATE,
        PALE FAUX-PARII ARMOR SEGMENTS SIT LOOSELY ON ITS CORRUCYSTIC GLASS
        SEPARATED PROBABLY TO ALLOW FOR IT TO RESHAPE ITSELF FREELY

    tozik
        ah... it was a gift
        a parting present from a team-member back home
        i like to keep it internally, even if we do not work on constructs
    
    akizet
        what did you do back then?
        
    tozik
        surface sentry maintenance
        i miss the team, but it was for the best
        with the amount of focus and tireless care they require,
        my growing disinterest would have allowed an infestation
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
        that troubles me still, too...
        i believe it cannot solely be from our groundsmind
        the amount of control being exerted, 
        especially if this attack stretches across the entire embassy...
        it is beyond anything i would have thought possible
        the groundmindry core is a grand cyst, yes, but,
        this is simply too intricate an attack for one mind to conduct all at once
        ...
        the inconsistency is what troubles me most
        only some constructs, surely each with some common element, but...
        we have no time to dissect every foe that is found
        the only certainty we have is the terrible noise that started all of this
    
    RESPONSES::akizet
        i see<+>loop
            EXEC::env.embassy.vn({tozik: "fullview", gakvu: "fullview"})
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
            SHOWIF::["stageroom", "embassy_cquarters1"]
        division?<+>division
        ask about art<+>art
        help fight<+>fight
            HIDEREAD::
            SHOWIF::[["stageroom", "embassy_relocator"], ["PAGE!!ep2xplore", true], ["PAGE!!earlymiltza", false]]
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
____SHOWIF::["stageroom", "embassy_cquarters1"]
        MILTZA RUMMAGES THROUGH HER BARRICADE FOR SOMETHING
            EXEC::env.embassy.vn({bg: true, miltza: "display show far"});pauseSwapCam(true)            
        DIGGING THROUGH SLUDGED CONTAINERS, STAINING HER CLAWS... SOMETHING IMPORTANT, MAYBE
____SHOWIF::["stageroom", "embassy_relocator"]
        MILTZA IDLES WITHIN THE RELOCATOR, WAITING ANXIOUSLY
            EXEC::env.embassy.vn({bg: true, miltza: "display show far"});pauseSwapCam(true)
        I DO NOT THINK SHE COULD HELP SAFELY WITHOUT A TIMESTOPPER CONNECTOR
____END::

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
        ah, no no! no no no
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

    sourceless
        that explains why we have not crossed paths
        there may be no restriction on quarters selection, but...
        a small unease still sets in my receptors

    akizet
        your chamber is quite low in the spire
        do you work with our auxiliaries?
    
    miltza
        oh, yes, it is! and, not often...
        really, it is the thought of being so high up...
        it may be silly and larval, but i struggle to rest so far from the ground
        and--i do not mind the climb!
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
        and the accuracy in their eyes is impressive!
        do you make them often?

    sourceless
        it takes her a θblink to break out of some inner thought,
        but the mundane topic eases her receptors, mind shifting way from the attack

    miltza
        ah--yes, actually! ahehe...
        i make sculptures and little golems of all obeski life,
        but it is hard to do that without making many veilk
        the cousins adore them, especially the ones that move
        i had just completed and sent through a collection of ekiva veilk,
        some even with their tendril adornments!
        so, i was working on that vaznian species next...
        ahh, what a shame...

    RESPONSES::akizet
        you will get the chance again!<+>art
            FAKEEND::(back)

eye
    akizet
        miltza!!
        the eye mural you were working on,
        it was remarkable, but uncanny...
        what does it mean?

    sourceless
        tension eases away from her receptors in recollection

    miltza
        hehe, you are not the first to say this...
        it is old pre-structurist symbology from my home in ekiva!
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
    
    sourceless
        a brief silence holds, her receptors gently balling up
    
    miltza
        ...but, in this giggle of velzie we find ourselves in,
        only the akanivik view was completed

    RESPONSES::akizet
        ironic<+>art
            FAKEEND::(back)

taking
    akizet
        miltza!!
        will you be bringing any of your current work with?
    
____SHOWIF::["stageroom", "embassy_cquarters1"]
    miltza
        what? oh!
    
    sourceless
        her gaze twists to the large mural, the veilk statues, which...
        ...would they be good as a bludgeoning tool?
    
    miltza
        i do wish we could...
        the mural is some of my favorite work, and somewhat intricate
    
    sourceless
        one of her claws digs out a small cyst from her containers, tucking it into her garment
    
    miltza
        but there is no reasonable way to carry any of it!
        instead, i am simply collecting the archival cores i store my designs upon
        i do wish i... kept things better organized...
    
    sourceless
        her panic shows in her hastened little laugh as she returns to digging

    miltza
        in our endless θdeaths, the work can simply be done again, right?

____SHOWIF::["stageroom", "embassy_relocator"]
    miltza
        ah, i do wish we could...
        but, there is no reasonable way to carry any of it!
        we may pray i can return, at least for the mural...
        that one is rather intricate, but far too large and fragile
        for now, i have just gathered archival cysts i keep my designs upon
        in our endless θdeaths, the work can simply be done again, right?
____END

    RESPONSES::akizet
        of course<+>art
            FAKEEND::(back)

fight
    akizet
        miltza!
        you fought well, despite the circumstances
    
    miltza
        oh! thank you, akizet!!
        yes, i...
        i really have you to thank for the strikes,
        but i am glad my mind could be of use
        my coordination was rarely in more than matters of travel and basic defense,
        but i still had the same training as any other
        it all came back to me rather quickly
        the surface never does leave us, truly, ahehe...
    
    sourceless
        she fidgets with her third claw
        is that apprehension?
        perhaps she knows already what i will ask next
    
    akizet
        indeed
        there may be more for us to find before we set out
        tozik and gakvu will need to stay with us, but...
        would you consider swapping in with one of their connections?
        i am certain your skill could be critical in surviving what may come

    miltza
        me?!
        akizet, i... if i must, i suppose?
        i am a tir, an artist, akizet--this really is not my space!
    
    sourceless
        she stumbles over her excuse
        were we not forced into defending ourselves,
        i am certain tozik and gakvu would have responded the same
    
    akizet
        the timestopper affords us much, miltza
        you felt what i offer you, and i saw what you were capable of
        stay close and you will be fine
    
    sourceless
        my confidence strikes a baffled silence into her
        miltza's receptors, which had closed like balled claws,
        gradually loosen their tension
    
    miltza
        ...ok, i will help, but...
        only if you think it is strictly necessary

    sys
        NOTICE::'additional party member';'MILTZA';'now available'
            EXEC::env.embassy.addPartyMember('miltza');change("PAGE!!earlymiltza", true)
        NOTICE::'manage party members in menu';'Z';'drag from or into active party'

    RESPOBJ::d3_miltza_resp

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
        i knew, umm, know, a θjut who was involved
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
        we have access to the adjacent personnel θtendril
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
        i hope this was one of her θgazes with the bright cousins

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
        MILTZA DRAWS CLOSER TO THE EXIT HALL, WISELY
            SHOWIF::"pau|miltza"
        GAKVU SEEMS ACUTELY AWARE OF THE SITUATION, SPRINTING OVER TO THE DAMAGED WALL
            EXEC::specialCam("archivesopen");vnp({gakvu: "show downleft"});pauseSwapCam(true)
        SHE FEELS AT IT, THEN SEEMS TO HUG IT
        A WAVE OF JOY PASSES THROUGH OUR SHARED CONNECTION
        IT IS ENOUGH TO QUELL THE LINGERING FEAR OF BEING CRUSHED
    
    gakvu
        ahh, a light in this hateful θgaze...!
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
            EXEC::vnp({gakvu: "show"})
        right before us, directly into our θsegment of the spire!
        can you even imagine the chances??

____SHOWIF::"pau|miltza"
    miltza
        oh!
        if it is still connected to the spine...
        we may be able to get through the archival system itself!!
            EXEC::vnp({gakvu: "show", miltza: "show"})

    gakvu
        we are not so blessed, miltza
        even from here i can feel the vein's alerts
        it is entirely dislocated
____END

    sourceless
        THIS IS TERRIBLE NEWS
        THE SPIRE REALLY IS COLLAPSING
        HOW MUCH TIME DO WE REALLY HAVE TO DO THIS...?
        BUT - SHE IS RIGHT TO BE EXCITED IN THE SHORT TERM
        THERE WILL BE PLENTY WE CAN USE WITHIN
        THE VEINS CARRY ALL DELIVERIES AND KNOWLEDGE

    tozik
        more tools might lay within
        like a herd of veilk parting just for us
            EXEC::vnp({tozik: "show"})

    akizet
        we should think about this first...
            EXEC::vn.done()
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
        ONCE AGAIN WE ARE BESET BY INCOHERENT FOES
        OUR ONLY OPTION IS--
            AUTOADVANCE::

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
        THEERE BE TREAUSER!!!!
    
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
        an extra hard mode... yeah, of course they'd put this in here
        probably only targets less important parts of the memory, at least i hope
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
        --TO FIGHT

    RESPONSES::akizet
        engage<+>END
            FAKEEND::(begin combat)
            SHOWIF::['gameplay_off', false]
            EXEC::env.embassy.startOrSkipArchivalIntroFight();env.embassy.vn({bg: false, bstrdface: ''})

        bypass<+>END
            SHOWIF::['gameplay_off', true]
            FAKEEND::(skip combat)
            EXEC::env.embassy.startOrSkipArchivalIntroFight();env.embassy.vn({bg: false, bstrdface: ''})
`)

env.dialogues["d3_archiveintro"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";"toggle within system menu if desired"
    
    sourceless
        WHILE IT IS A FRIGHTENINGLY POWERFUL COMBATANT,
        ITS SIZE AND SLOWNESS LEND WELL TO DISRUPTIVE ATTACK
        AND SO, AFTER SOME STRUGGLE,
____END

    sourceless
        THE GOLEM COLLAPSES INTO A PILE OF DENTED LIMBS
        FROM ITS CHEST CAVITY SPILLS A WEALTH OF...
        REALLY? SATIK CYSTS? HERE? HOW PECULIAR...
        I TURN ONE OVER IN MY CLAWS, ITS MYRIAD APPLICATORS STARING BACK AT ME
        PERHAPS CARRIED OUT OF PRECAUTION, IN THE EVENT OF VEIN FAILURE?
        IT IS RARE TO SEE THESE USED IN TIMES OF PEACE
    
    sys
        ITEM_RECEIVED::"<span definition="INHERITED CONTEXT::${env.ITEM_LIST['eq_satik'].description}">satik cysts</span>"
            EXEC::env.embassy.conditionalItem('eq_satik', 1, 'aintro')
            AUTOADVANCE::
    
    definitionget
        TEXEC::definitionRender({getAttribute: () => "STATUS++item_satik"}, {returnHTML: true})

    gakvu
        ah! how clumsy that thing was!

____SHOWIF::"pau|miltza"
    miltza
        not clumsy,
        but far too precise...
        it was looking for openings
        
    tozik
        one was simple enough to deal with

____SHOWIF::["pau|miltza", false]
    tozik
        alone, perhaps...
____END

        but if we have to deal with multiple further within...

    sourceless
        with a brief look over the tools and weapons collected so far,
        the realization is shared through our connection

    tozik
        we should be very, very careful

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
        I HAVE NEVER SEEN THIS MATERIAL IN MY LIFE, NOR MY θdeath

    akizet
        gakvu, tozik, do you know what this is...?
            SHOWIF::["pau|miltza", false]
        do any of you know what this is?
            SHOWIF::"pau|miltza"
    
    sourceless
        GAKVU IS SIMILARLY PUZZLED, HER RECEPTORS SHAKING NEGATIVELY
    
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
            SHOWIF::["pau|miltza", false]
        MILTZA AND I SHRIEK IN UNISON AS THE DOOR SPEAKS TO US
            SHOWIF::["pau|miltza", true]
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
            SHOWIF::"PAGE!!triedarchivedoor"
        the 'cool orb thingy'?
            SHOWIF::"PAGE!!triedarchivedoor"

        what is that?
            SHOWIF::[["PAGE!!triedarchivedoor", false]]

    sourceless
        GAKVU POINTS FORTH TO AN EYE-PIERCING MONOLITH
            EXEC::specialCam('bstrdcyst1');pauseSwapCam(true)
        IT SEEMS TO BE MADE OF THE SAME STRANGE MATERIAL FROM BEFORE...
            EXEC::addItem(env.ITEM_LIST.cool_orb_thingy)
        AND OVER IT, FLOATS AN IMPORTANT-LOOKING CORRUCYST
        TOZIK WALKS FORTH TO TAKE IT, ATTEMPTING TO CONNECT TO IT...
            EXEC::vnp({tozik: "show"});env.stage.current.hidePillarCyst();
        BUT HE SIMPLY SMASHES IT AGAINST HIS RECEPTOR UNEXPECTEDLY - ITS GLASS DOES NOT PART AS USUAL
        HE STUMBLES FROM THE IMPACT

    tozik
        ah...
        ow...

    sourceless
        HE STILL ALLOWS HIMSELF TRUE PAIN? HOW SILLY

    gakvu
        let me see!
            EXEC::vnp({gakvu: "showleft far"})

    sourceless
        SHE SKITTERS CLOSER, AND I EXPECT HER TO SNATCH IT FROM HIS CLAWS,
            EXEC::env.embassy.vn({gakvu: "show"})
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

____SHOWIF::["pau|miltza", true]
    miltza
        oh! i believe there is a small group in wisdom who collects this information...
            EXEC::env.embassy.vn({miltza: "show shiftright"})
        a side project, in understanding the cousins' history of war, you see--
        but it is very strange to see here!
        and especially in this color??
____END

____SHOWIF::["PAGE!!triedarchivedoor", true]
    gakvu
        maybe that thing keeping the door locked...
        is just a very strange qou from materials...?
            SHOWIF::["pau|miltza", true]
        is just a very strange qou from wisdom...?
            SHOWIF::["pau|miltza", false]
        who wants to preserve their research??

    miltza
        nonsense! i certainly would know of such an eccentric!!
            SHOWIF::["pau|miltza", true]

    akizet
        maybe...
            SHOWIF::["pau|miltza", false]
        either way, we have the 'cool orb thingy'

____SHOWIF::["PAGE!!triedarchivedoor", false]
    gakvu
        is this kazki's? why is it so strangely highlighted?

    akizet
        without a doubt
        let us bring it along - it is small enough
        and we should continue looking around!
        there must be something else going on in this vein...

____END
        let us fetch the other thing--the 'black box'?
            SHOWIF::[['EXEC::checkItem(env.ITEM_LIST.scary_black_box)', false], ["PAGE!!triedarchivedoor", true]]
        let us return to the door
            SHOWIF::[['EXEC::checkItem(env.ITEM_LIST.scary_black_box)', true], ["PAGE!!triedarchivedoor", true]]

    tozik
        <em>scary</em> black box
            SHOWIF::[['EXEC::checkItem(env.ITEM_LIST.scary_black_box)', false], ["PAGE!!triedarchivedoor", true]]

    RESPONSES::akizet
        continue<+>END
            EXEC::specialCam('');vn.done();pauseSwapCam(false)
`)

env.dialogues["d3_archivedelivery"] = generateDialogueObject(`
start
    sourceless
        AS SOON AS WE ENTER THE ROOM... I SEE THEM
        EACH AND EVERY ONE
        A HALF-DOZEN CONTAINERS, WITH ONE OF THOSE SURFACE-SENT LIGHTS
        THEY WILL BE UPON US IN AN INSTANT
            EXEC::change('PAGE!!archiveambush', true)
    
    RESPONSES::akizet
        fight!!<+>END
            FAKEEND::(prepare for combat)
`)

env.dialogues["d3_archivedeliveryclear"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";"toggle within system menu if desired"

    sourceless
        IT IS IMPOSSIBLE TO AVOID EVERY STRIKE FROM SO MANY CONSTRUCTS
        WE ARE BATTERED BY THE CONTAINERS UNCEASINGLY,
        GIVEN DEADLY SHAPE BY THE DIRECTION OF THIS DISCOLORED VEILKLIGHT, SOMEHOW
        EVEN WE ARE AFFECTED BY ITS WARPING
        BUT IT IS FOR THIS REASON THAT WE TEAR THEM APART SO EFFECTIVELY
____END

    sourceless
        THE LAST ONE FALLS
            EXEC::env.stage.current.onStep()

____SHOWIF::'PAGE!!archruka'
        AFTER THE FIGHT, WE ALL CHEER IN UNISON
        AN INGENIOUS USE OF KAVRUKAS, I WILL ALLOW OUR PRIDE THIS VICTORY
        
    akizet
        that could have been agonizing...
    
    tozik
        no tendril left to rot
            EXEC::vnp({tozik: "show shiftleft"})

____SHOWIF::['PAGE!!archruka', false]
    sourceless
        WE ALL COLLAPSE WITH RELIEF AFTER THE FIGHT
        THIS IS THE WORST θgaze OF MY θdeath

____END

    sourceless
        I RUMMAGE A BIT THROUGH THE remains OF THESE CONSTRUCTS...
            EXEC::step();vnp({tozik: "hide"})
    
    sys
        ITEM_RECEIVED::"<span definition="INHERITED CONTEXT::${env.ITEM_LIST['eq_siphon'].description}">vecrivi</span>"
            EXEC::env.embassy.conditionalItem('eq_siphon', 1, 'delivery')
            AUTOADVANCE::
    
    definitionget
        TEXEC::definitionRender({getAttribute: () => "STATUS++item_siphon"}, {returnHTML: true})

    sourceless
        AH - AND THERE, BEYOND THEIR CORPSES,
            SHOWIF::"PAGE!!triedarchivedoor"
        THAT MUST BE THE 'SCARY BLACK BOX'
            SHOWIF::"PAGE!!triedarchivedoor"
        SOME SORT OF COUSINLY BOX?
            SHOWIF::["PAGE!!triedarchivedoor", false]

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
            EXEC::vnp({gakvu: "show"})

    sourceless
        A PANG OF ANXIETY SHOOTS THROUGH MY MINDCORE
        'LIKE COMPONENTS FOR AN EXPERIMENTAL CORRU-TO-LIGHTNING CONVERTER'
        YES, WHY WOULD I KNOW ABOUT THIS, IF NOT FOR MY SUBVERSIVE ACTIONS?
        NO I MUST BE REASONABLE--THEY USE THESE ALL THE TIME I THINK
        WHAT ELSE DO THEY PUT IN THEM žõœgÓô

____SHOWIF::"pau|miltza"
    miltza
        ah! i see these in exchange...
            EXEC::vnp({miltza: "show"})

    sourceless
        I CEDE THE STAGE TO MILTZA GLEEFULLY
        HER RECEPTORS LOSE SOME OF THEIR TENSION IN HER RECOLLECTION
    
    miltza
        we often receive, ah...
        received... brittle and delicate displays, in them!
        like things made of their dead glass, or that 'ceramic' material!

    tozik
        is that all?
        
    miltza
        well, the soft interior lends well to deliveries of any type, i think...
        this could truly be anything

____SHOWIF::["pau|miltza", false]
    akizet
        oh, ah, like,
        apples...
        because--they do not fare well with the low-air environment of our spire!

    gakvu
        ah. curious

    sourceless
        ½T~g«¾%
        THEY MUST THINK I AM SIMPLY PRETENDING TO KNOW
        OH WELL - IT IS BETTER THAN THE ALTERNATIVE
____END

    sourceless
        WE TAKE THE BOX WITH US
        HEAVY, BUT EASY ENOUGH TO SET ASIDE WHEN NEEDED
            EXEC::addItem(env.ITEM_LIST.scary_black_box)

    akizet
        come - let us return to the door
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.cool_orb_thingy)'
        come - let us continue our search
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.cool_orb_thingy) == false'
        before this archival vein collapses even further through the spire...
            EXEC::setCam();env.stage.current.onStep()

    RESPONSES::akizet
        continue<+>END
            EXEC::vn.done();setCam();env.stage.current.onStep();pauseSwapCam(false)
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
        I HAVE NEVER SEEN THIS MATERIAL IN MY LIFE, NOR MY θdeath

    akizet
        gakvu, tozik, do you know what this is...?
            SHOWIF::["pau|miltza", false]
        do any of you know what this is?
            SHOWIF::"pau|miltza"
    
    sourceless
        GAKVU IS SIMILARLY PUZZLED, HER RECEPTORS SHAKING NEGATIVELY
    
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
            SHOWIF::["pau|miltza", false]
        MILTZA AND I SHRIEK IN UNISON AS THE DOOR SPEAKS TO US
            SHOWIF::["pau|miltza", true]
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
        THE TIMESTOPPER AFFORDS US JUST A BLINK TO COORDINATE...
    
    RESPONSES::akizet
        get ready!!<+>END
            FAKEEND::(prepare for combat)
`)

env.dialogues["d3_archiveminiclear"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";"toggle within system menu if desired"

    sourceless
        THE SHELF-BEAST STRETCHES ACROSS NEARLY THE ENTIRE CHAMBER
        ITS LONG LIMBS NEARLY IMPOSSIBLE TO AVOID...
        BUT WE SOON HAVE IT BLEEDING FROM EVERY ANGLE,
        SOFT-SHELLED EXTENSIONS SEVERED AND DRAINING ITS LIFE AWAY
____END

    sourceless
        THE BEAST FALLS AND MELTS, THOUGH...
        ITS SLUDGE SEEMS TO DRAIN AWAY INTO... THE FLOOR...?
            EXEC::changeBgm(env.embassy.music_collapse, {length: 4000});
        ARE THOSE HOLES IN THE FLOOR?
        HOW CAN THERE BE HOLES? IS THAT THE FLOOR?
        SOMETHING ABOUT IT MAKES MY MIND SPIN...

    gakvu
        akizet? are you well?
            EXEC::vnp({bg: true, gakvu: "show"})

____SHOWIF::"pau|miltza"
    sourceless
        MILTZA DRAWS NEAR, A WORRIED CLASP IN HER RECEPTORS
            EXEC::vnp({miltza: "show"})
        EVEN IN HER SKITTISH FEAR,
        SHE APPROACHES LIKE A TIR INTENT ON CALMING A SPIRALLING SURFACE SURVIVOR
____END

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
            EXEC::vnp({gakvu: "hide", miltza: "hide", tozik: "show shiftright", bg: false})
        TOZIK STUDIES THE MIGRAINE-INDUCING VOID OF THE CEILING
    
    tozik
        it looks like the perspective projection might be acting up
        i am not surprised, given the entity that has been guiding us
        it has an uncanny control of the environment
        not unlike the groundsmind, or gakvu...

    gakvu
        where is it, anyway?
        did it just take the box and cyst and run around this thing?

    sourceless
        SUSPICION SPIKES THROUGH OUR CONNECTION
        IS IT A TRAP?
        WE CAN EITHER CONTINUE, OR TURN AROUND...
        WE ARE QUITE FAR OUT OF OUR WAY, AFTER ALL
        BUT SURELY THIS WILL BE WORTH THE TROUBLE?
            EXEC::vn.done()
    
    RESPONSES::akizet
        continue<+>END
`)

env.dialogues["d3_archiveboss"] = generateDialogueObject(`
start
    sourceless
        THIS CHAMBER...
        IT IS SO WRONG THAT I STRUGGLE TO PROCESS IT
        IS THIS A PRODUCT OF THE SIGNAL? HAVE I GROWN MAD?
        EVEN GAKVU NEARLY STUMBLES INTO ME, DISORIENTED

    gakvu
        do not--
        do not look beyond the walls

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

    RESPONSES::akizet
        prepare!!<+>END
            EXEC::specialCam(false);pauseSwapCam(false)
            FAKEEND::(initiate combat) 
`)


env.dialogues["d3_bstrd_shift"] = generateDialogueObject(` 
start
    sourceless
        the golem's weapon is pointed towards us, but it falters
        its stance gains an uncanny disappointment?

    bstrd
        ummm :I
        i was GONNA use TARGETETED
        BUT da TTENDANT DID that.. .........
        F*UCK IT!!
            EXEC::setTimeout(()=>{env.bgm.intendedRate = 0.4;playCombatCrit();flash(true);addStatus({target: env.rpg.actors.bstrdboss, status: "incoherent", length: 1, noReact: true})}, 300)
            AUTOADVANCE::
            WAIT::2000
            THEN::env.rpg.classList.add('bonked');
        
    sys
        ERROR::"severe structure violation detected";"reforming"
            EXEC::makeBoxesDraggable(env.rpg.allyTeam)
            WAIT::2000
            THEN::flash(false)
        EXECUTING::"structure direction";"thoughtform combat"::
        
    plainsys
        <span class="bastard-font">I GOT IN HERE :b</span>
        <span class="bastard-font">U drag em NOW</span>
        <span class="bastard-font">THESE 1s</span>
            EXEC::env.rpg.classList.add('draghighlight');setTimeout(()=>env.rpg.classList.remove('draghighlight'), 5000)
        <span class="bastard-font">hehe...; watch out for bad %^)</span>
        <span class="bastard-font">BETWER WATCH REAL GOOD 4 DA BAD >>%^)</span>
        <span class="bastard-font">looks like DIS</span>
            EXEC::env.rpg.bstrdTotal = spawnBstrdShot({x:50, y:50, origin: env.rpg.actors.bstrdboss,  count: 1, size: 15, telegraphTime: 3000})
            WAIT::5000
        <span class="bastard-font">and ummmmm</span>
        <span class="bastard-font">like tis ;)</span>
            EXEC::env.rpg.bstrdTotal = env.rpg.allyTeam.members.reduce((acc, m) => acc + m.hp, 0);spawnBstrdShot({pattern: "targeted", target: env.rpg.actors.akizet, origin: env.rpg.actors.bstrdboss, count: 3, size: 20, telegraphTime: 3000})
            WAIT::5000
        <span class="bastard-font">LOL; LMAO; OWNED; %P</span>
            SHOWIF::'EXEC::env.rpg.allyTeam.members.reduce((acc, m) => acc + m.hp, 0) < env.rpg.bstrdTotal'
        <span class="bastard-font">:b u got it ALRADY</span>
            SHOWIF::'EXEC::env.rpg.allyTeam.members.reduce((acc, m) => acc + m.hp, 0) >= env.rpg.bstrdTotal'

    sys
        ::END
    
    sourceless
        ...after some disorientation, i find myself steadied again
        and no sooner does the golem brace to activate its weapon--

    RESPONSES::akizet
        take action!!<+>END
            EXEC::env.rpg.continueBstrdAttack();env.bgm.intendedRate = 1;ratween(env.bgm, 1)
            FAKEEND::proceed
`)

env.dialogues["d3_archivebossend"] = generateDialogueObject(`
start
    sourceless
        THE GOLEM FALLS TO PIECES, ITS HOVERING CAPABILITIES SLUDGED
            EXEC::env.stage.current.bossCollapse();env.stage.current.clearBossPals()
        BUT ITS SIGIL AND STRANGE VOICE REMAIN
            EXEC::change('PAGE!!aboss', true);

____SHOWIF::['gameplay_off']
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";"toggle within system menu if desired"

    sourceless
        I SUDDENLY REALIZE I CANNOT RECALL HOW WE WON
        WHAT... DID IT DO? DID IT DO ANYTHING?
        WE EACH EXCHANGE CONFUSED GLANCES

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
            EXEC::change("PAGE!!archivesclear", "skipped");refreshStage({noFlash: true})
    
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
        im p sure its important lol someone messed with it
    
    sourceless
        BEHIND THE DYING GOLEM RISES ANOTHER STRANGE MONOLITH
            EXEC::env.stage.current.showPillar(true)
        OVER IT IS... IT LOOKS LIKE A CORRUCYST
        AND THERE IS SOME SORT OF MARKING ON IT
        BUT I CANNOT SEE IT CLEARLY FROM HERE

    gakvu
        wait
        you are the most reasonable entity we have come across so far
        do you know what is happening? 
        we could fix you, if you help us!

    miltza
        fix?! it tried to--!!
            SHOWIF::"pau|miltza"

    sourceless
        flatly, almost disrespectfully, gakvu hushes her
            SHOWIF::"pau|miltza"

    gakvu
        entertain me for just a θblink miltza
            SHOWIF::"pau|miltza"
    
    bstrd
        :U
    
    sourceless
        THERE IS A LONG, UNCOMFORTABLE PAUSE
        DID IT NOT EXPECT TO LIVE THIS LONG? 
        OR FOR US TO MAKE THAT OFFER?

    bstrd
        no i gotta kill u guys sry
        but u won this time so gj
        
    sourceless
        THE SIGIL FADES, AND ALL AT ONCE, THINGS SEEM TO RETURN TO NORMAL
            EXEC::env.stage.current.removeBastardBG()
        OUR FOE'S GOLEM FALLS TO PIECES ON THE FLOOR, WHERE IT BEGINS TO SLOWLY MELT AWAY
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
        THE MIND THAT INHABITED IT SOUGHT SUCH SENSELESS VIOLENCE
        BUT NOT WITHOUT A TWISTED HONOR, REMINISCENT OF A GUKTIK
        TRULY BIZARRE...
        I KNEEL ALL THE SAME, AND PLACE MY CLAW OVER WHAT REMAINS OF ITS PALE EYESPOTS
    
    akizet
        you fought well... whatever you were
        let us return to fixing movefriend
        we have deviated enough
            EXEC::change("PAGE!!archivesclear", true);refreshStage({noFlash: true})

    sourceless
        BY THE TIME I RISE, OUR FOE HAS FULLY DISSOLVED
            EXEC::specialCam("bstrdbox")
        BRIGHT WEAPON, CYSTS, AND ALL,
        FADING INTO THE WARPED NOTHING BEYOND THE CHAMBER
        WITH THE FINAL DISAPPEARANCE OF ANY HINT OF VISCERA,
        EVEN THE COLOR OF THE ROOM SHIFTS, NO LONGER AS DIZZYING
        THE PRESENCE HAS FULLY LEFT US
____END

    RESPONSES::akizet
        leave<+>END
            EXEC::specialCam("");pauseSwapCam(false)
`)