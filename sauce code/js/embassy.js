/* general definitions */
env.storingSwap = false
env.embassy = {
    relocatorDestination: (location) => {
        if(!location) return

        var destination = {
            place: null,
            spot: null,
            shouldFace: false
        }

        switch(location) {
            case "personnel":
                destination.place = "embassy_personnel"
                destination.spot = "115"
            break

            case "recreation":
                destination.place = "embassy_recreation"
                destination.spot = "136"
            break

            case "research":
                destination.place = "embassy_research"
                destination.spot = 56
                destination.shouldFace = "right"
            break

            case "groundsmindry":
                destination.place = "grm_entry"
                destination.shouldFace = "down"
            break
        }

        document.querySelectorAll('.teleport[slug="R"]').forEach(pad=>{
            pad.classList.remove('locked')
            pad.setAttribute('teleport-target', destination.place)
            pad.setAttribute('spot', destination.spot)
            pad.setAttribute('shouldface', destination.shouldFace)
        })
    },

    setFocus: (subject)=>{
        if(subject) document.querySelector('.focusplane').setAttribute('focus', subject)
        else document.querySelector('.focusplane').removeAttribute('focus')
    },

    //extra stuff for showing/hiding things
    updateStageData: ()=>{
        document.querySelector('#realgrid').setAttribute('embassyday', check('PAGE!!embassy_day'));
        content.setAttribute('embassyday', check('PAGE!!embassy_day'))
        
        switch(env.stage.name) {
            case "embassy_quarters":
                env.stage.wallW = 5
                env.stage.wallH = 5
            break

            case "embassy_recreation":
                env.stage.wallW = 11
                env.stage.wallH = 11
            break

            case "embassy_personnel":
                env.stage.wallW = 5;
                env.stage.wallH =  17;
            break

            case "embassy_research":
                env.stage.wallW = 11;
                env.stage.wallH =  11;
            break

            case "embassy_archivalvein":
                env.stage.wallW = 13;
                env.stage.wallH =  3;
            break

            case "embassy_archivalcore":
                env.stage.wallW = 5;
                env.stage.wallH =  5;
            break
        }
    },

    initializeEmbassyCombatSettings: ({ep = 2} = {}) => {
        //load up shared music/sounds
        env.embassy.music_collapse = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/embassy_collapse.ogg'],
            preload: true,
            loop: true,
            volume: 1,
            sprite: {
                __default: [20, 119930, true]
            }
        })

        env.embassy.music_signal = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/collapsesignal.ogg'],
            preload: true,
            loop: true,
            volume: 1,
            sprite: {
                __default: [20, 73990, true]
            },
        })

        switch(ep) {
            case 2:
                env.embassy.music_safe = new Howl({
                    onload: function () {page.howls.push(this)},
                    src: ['/audio/embassy_safe.ogg'],
                    preload: true,
                    loop: true,
                    volume: 0,
                    sprite: {
                        __default: [0, 179998, true]
                    }
                })
        
                env.embassy.music_combat = new Howl({
                    onload: function () {page.howls.push(this)},
                    src: ['/audio/embassy_combat.ogg'],
                    preload: true,
                    loop: true,
                    volume: 1,
                    sprite: {
                        __default: [0, 159988, true]
                    }
                })
        
                env.embassy.music_unsafe = new Howl({
                    onload: function () {page.howls.push(this)},
                    src: ['/audio/embassy_unsafe.ogg'],
                    preload: true,
                    loop: true,
                    volume: 0,
                    sprite: {
                        __default: [0, 85330, true]
                    }
                })
        
                env.embassy.music_p1boss = new Howl({
                    onload: function () {page.howls.push(this)},
                    src: ['/audio/embassy_movefriendboss.ogg'],
                    preload: true,
                    loop: true,
                    volume: 1,
                    sprite: {
                        intro: [0, 24000],
                        __default: [24000, 96000, true]
                    }
                })

                env.embassy.music_p1boss_suspense = new Howl({
                    onload: function () {page.howls.push(this)},
                    src: ['/audio/embassy_movefriendintro.ogg'],
                    preload: true,
                    loop: true,
                    volume: 1,
                    sprite: {
                        __default: [1, 23950, true]
                    }
                })

                env.embassy.music_p1boss_laststand = new Howl({
                    onload: function () {
                        page.howls.push(this)
                        this.intendedVol = 0.8
                    },
                    src: ['/audio/embassy_mflaststand.ogg'],
                    preload: true,
                    volume: 0.8,
                })

                //ogg works for this now :)
                env.embassy.music_bstrdcombat = new Howl({
                    onload: function () {page.howls.push(this)},
                    src: ['/audio/embassy_bstrdcomb.ogg'],
                    preload: true,
                    volume: 1,
                    sprite: {
                        __default: [1, 131800, true]
                    }
                })

                env.combat.defaults.bgm = env.embassy.music_combat
                env.combat.defaults.lossDialogue = 'd3_loss'
                env.combat.defaults.endCallback = (loser)=>{
                    if(document.querySelectorAll('.evil').length == 0) {
                        switch(env.stage.name) {
                            case "embassy_recreation":
                                startDialogue('d3_rec_clear')
                            break
                            
                            case "embassy_cpersonnel": 
                                startDialogue('d3_person_clear')
                            break
                            
                            case "embassy_archivalintro": 
                                startDialogue('d3_archiveintro')
                            break
        
                            default: 
                                startDialogue('d3_genericenemyvictory')
                        }
                    } else {
                        startDialogue('d3_genericenemyvictory')
                    }
                }
        
                if(!env.loadedSave) {
                        page.party = [
                        {
                            slug: "akizet",
                            name: "Akizet",
                            combatActor: "akizet",
                            class: "Surface Veteran",
                            hp: 15,
                        },
                
                        {
                            slug: "gakvu",
                            name: "Gakvu",
                            combatActor: "gakvu",
                            class: "Conspicuous Insider",
                            hp: 10,
                        },
                
                        {
                            slug: "tozik",
                            name: "Tozik",
                            combatActor: "tozik",
                            class: "Inquisitive Technician",
                            hp: 10,
                        },
                    ]
                    page.party.inventory = []
                }
        
                env.loadedSave = false
            break

            case 3:
                //defaults and music
                page.party.reorganizable = true
                env.embassy.music_golems_combat = new Howl({
                    src: ['/audio/embassy_golems_combat.ogg'],
                    preload: true,
                    loop: true,
                    volume: 1,
                    sprite: {
                        __default: [0, 159988, true]
                    }
                })
                env.combat.defaults.lossDialogue = 'loss'
                env.combat.defaults.bgm = env.embassy.music_golems_combat

                //if miltza isn't in the party, we add her!
                if(!page.party.find(m => m.slug == "miltza")) {
                    env.embassy.addPartyMember('miltza')
            
                    //swap gakvu with miltza per the ending of collapse part 1
                    //gotta 0-delay it (to run after current runtime) cuz otherwise it doesn't work
                    setTimeout(()=>{
                        [page.party[1], page.party[3]] = [page.party[3], page.party[1]]
                        vn.renderParty()
                    }, 0)        
                }

                //used in dynamic combat for embassy_golems to mix up the start spot a little
                env.embassy.randomBgmTime = () => {if(Math.random() > 0.5) env.bgm.seek(92)}

                env.combat.defaults.endCallback = (loser)=>{
                    setTimeout(()=>env.stages.golemSafeCheck(), 500)
                    if(document.querySelectorAll('.evil').length == 0) {
                        switch(env.stage.name) {
                            case "golem_test":
                                startDialogue('intro')
                            break
            
                            case "g_lobby":
                                startDialogue('lobby_clear')
                            break
            
                            case "g_m_hall":
                                startDialogue('m_clear')
                            break
            
                            case "g_m_major":
                                startDialogue('genericenemyvictory')
                            break
            
                            case "g_s_metals":
                                startDialogue('genericenemyvictory')
                            break
            
                            case "g_s_sfer":
                                startDialogue('s_vats')
                            break
            
                            case "g_s_storage":
                                startDialogue('genericenemyvictory')
                            break
            
                            case "g_o_hall":
                                startDialogue('genericenemyvictory')
                            break
            
                            default: 
                                startDialogue('genericenemyvictory')
                        }
                    } else {
                        startDialogue('genericenemyvictory')
                    }
            
                    //for EP3, after each combat, heal inactive party members for some HP
                    if(loser.name != "ally") {
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
                    }
                }
            break

            case 3.99:
                page.party.partyLimit = 7
                if(check("PAGE!!archivesclear") && check("PAGE!!archivesclear") != "skipped") addItem(env.ITEM_LIST.symbiotic_rifle)
            break
        }

        //shared post-ep3 settings
        if(ep >= 3) {
            page.flags.augmentMax = 3
            if(check("PAGE!!mboss")) page.flags.augmentMax++
            if(check("PAGE!!oboss")) page.flags.augmentMax++
            if(check("PAGE!!sboss")) page.flags.augmentMax++
            if(check('PAGE!!augments') && ep != 3.99) body.classList.add('augments-enabled')
            page.party.reorganizable = true
        }

        //collapse always has party
        page.partyMenuEnabled = true
        content.classList.add('party-enabled')

        //sorry cyst always stays
        if(check("PAGE!!archivesclear") && check("PAGE!!archivesclear") != "skipped") addItem(env.ITEM_LIST.sorry_cyst)
        
        //set up interval to listen for low HP and show suggestions
        //ep4 works differently so we don't do this there
        if(ep != 3.99) env.setInterval(()=>{
            if(partyHasLowHealth() && (checkItem(env.ITEM_LIST.restorative) > 0)) 
                document.querySelectorAll('#stage-navigator, #party-menu').forEach(el=>el.classList.add('low-health'))
            else 
                document.querySelectorAll('#stage-navigator, #party-menu').forEach(el=>el.classList.remove('low-health'))
        }, 2000)

        
    },

    setDay: (day = 1, {skipDialogue = false, specificZone = false} = {})=>{
        MUI('off')

        change("PAGE!!embassy_day", day)
        body.classList.add('daychanging')
        document.addEventListener('keydown', stageKeypress) //multiple application is not a problem since this is a reference, look it up dude

        switch(day) {
            case 3.5: //this is only used in test pages as of launch, will likely remove
                env.embassy.initializeEmbassyCombatSettings()
                if(!specificZone) changeStage('embassy_relocator'); else changeStage(specificZone)
            break

            case 3:
                if(!specificZone) changeStage('embassy_research', false, 'right'); else changeStage(specificZone)
                if(!skipDialogue) { 
                    cutscene(true)
                    setTimeout(()=>{cutscene(false)}, 500)
                    startDialogue('d3_start')
                    content.classList.add('fade-stage')

                    if(check("visited_localoceanembassygolem")) env.ADVANCE_RATE = 1000
                } 

                env.embassy.initializeEmbassyCombatSettings()
                
                // the embassy pass will add more but until golem there's no use for masks
                page.maskHungerNote = "\nRESONANCE::'detected in upcoming memory stream'";
                page.maskUnityNote = "\nRESONANCE::'detected in upcoming memory stream'";
            break

            case 2:
                changeStage('embassy_quarters', false, 'left')
                if(!skipDialogue) startDialogue('d2_start')
                ratween(env.bgm, 1, 1000)
                change("PAGE!!akiroomunlocked", false)

                page.maskHungerNote = "\nRESONANCE::'none within this particular memory segment';'await further repairs'";
                page.maskUnityNote = "\nRESONANCE::'none within this particular memory segment';'await further repairs'";
            break

            case 1:
                changeStage('embassy_quarters', false, 'left')
                if(!skipDialogue) startDialogue('d1_start')
                ratween(env.bgm, 1, 1000)
                change("PAGE!!akiroomunlocked", true) 

                page.maskHungerNote = "\nRESONANCE::'none within this particular memory segment';'await further repairs'";
                page.maskUnityNote = "\nRESONANCE::'none within this particular memory segment';'await further repairs'";
            break
        }

        setTimeout(()=>{
            body.classList.remove('daychanging')
            document.querySelector('.dayselect').classList.add('derender')
        }, 2000)
        
    },

    slowCam: (toggle = null) => {
        switch(toggle) {
            case null: 
                content.classList.toggle('slowcam')
            break

            case true:
                content.classList.add('slowcam')
            break
            
            default:           
                content.classList.remove('slowcam')
        }
    },

    debug: () => {
        document.documentElement.classList.add('debug')
        content.classList.add('debug')
    },

    //collapse save management
    //a save within a save - imagine that!
    collapseSave: ({effects = false, callback} = {}) => {
        let savedPageFlags = JSON.parse(JSON.stringify(page.flags))
        change("collapseSave", {
            saveZone: env.stage.name,
            pageFlags: {... savedPageFlags},
            party: JSON.parse(JSON.stringify(page.party)),
            inventory: JSON.parse(JSON.stringify(page.party.inventory))
        })

        if(effects) {
            cutscene(true); flash(true)
            setTimeout(()=>{
                cutscene(false); flash(false);
                readoutAdd({message: `NOTE::'iteration saved successfully'`, name:"sys", show: true, forceMini: true})

                if(!check("TEMP!!refreshsuggest") && check("PAGE!!e4prog")) setTimeout(() => {
                    if(!check("widegamer", "adapter")) readoutAdd({message: `NOTE::'consider refreshing';'positive performance impact'`, name:"sys", show: true, forceMini: true});
                    else readoutAdd({message: `NOTE::'consider refreshing';'positive performance impact';'utilize NAV menu to avoid losing position'`, name:"sys", show: true, forceMini: true})

                    change("TEMP!!refreshsuggest", true)
                    setTimeout(() => {
                        change("TEMP!!refreshsuggest", false)                        
                    }, 600000);
                }, 1500);
                if(callback) callback()
            }, 500  )
        } else if(callback) callback()
    },

    //takes 1, 2, or 3 (but 3 doesn't xist yet so don't pass that :P)
    newCollapseIteration: (part) => {
        switch(part) {
            case 1:
                cutscene(false)
                env.embassy.setDay(3)
                change('collapseSave', false)
            break

            case 2:
                cutscene(false)
                change("collapseSave", GlobalSaves.collapseSave_ep3start)
                change("TEMP!!ep2->ep3transfer", true)
                moveTo("/local/ocean/embassy/golem/")
            break

            case 3:
                cutscene(false)
                change("collapseSave", GlobalSaves.collapseSave_ep4start)
                change("TEMP!!ep3->e43transfer", true)
                moveTo("/local/ocean/embassy/groundsmindry/")
            break
        }
    },

    loadCollapseSave: () => {
        let collapseSave = check('collapseSave')
        if(!collapseSave) throw 'no save'

        page.saveZone = collapseSave.saveZone
        page.flags = {... collapseSave.pageFlags}
        page.party = []

        page.flags.deadGuys = {}
        for (const roomName in flags.collapseSave.pageFlags.deadGuys) {
            const room = flags.collapseSave.pageFlags.deadGuys[roomName];
            page.flags.deadGuys[roomName] = [... room]
        }
        
        page.party.inventory = []
        collapseSave.inventory.forEach(item=>{
            console.log(item)
            page.party.inventory.push([... item])
        })
        
        collapseSave.party.forEach(member => {
            if(typeof member.combatActor == "object") member.combatActor = member.combatActor.slug;

            //detect if using a nonexistent party member - caused by saving with a mod
            //we create a temporary bug member to avoid bricking the save
            if(typeof env.COMBAT_ACTORS[member.combatActor] == "undefined") {
                chatter({actor: 'actual_site_error', text: `${member.name} does not exist!`, readout: true})

                env.COMBAT_ACTORS[member.combatActor] = { ...env.COMBAT_ACTORS.hallucination }
                let errorMember = env.COMBAT_ACTORS[member.combatActor]
                errorMember.slug = member.combatActor
                errorMember.readoutActor = "bugviend"
                errorMember.portrait = `<img class="portrait" src="/img/sprites/combat/foes/hallucinations/eyetransparent.gif">`
                errorMember.portraitUrl = '/img/sprites/combat/foes/hallucinations/eyetransparent.gif'
                errorMember.reactions.catchall = env.COMBAT_ACTORS.translation_golem.reactions.catchall
                errorMember.initialStatusEffects = [["incoherent", 1]]
                member.class = "Rendering Error"
            }

            page.party.push({... member})
        })

        //keep items up to date
        page.party.inventory.forEach(itemPair=>{
            //only 'updates' the item if it exists in what we're expecting
            let item = env.ITEM_LIST[itemPair[0].slug]
            if(item) itemPair[0] = item;
            
            //otherwise it's a mod item that isn't loaded. harmless to keep as-is...
            //unless it has a combat action that doesn't exist
            else {
                if(itemPair[0].combatAction) delete itemPair[0].combatAction
                if(itemPair[0].exec) delete itemPair[0].exec
            }
        })

        vn.renderParty()
    },

    //see vn2.js
    //this is basically a legacy function for the oldest VN system, so don't rely on it
    vn: (settings) => {
        if(!sessionStorage['vn1warn']) {
            console.warn("this is a backwards-compatibility function for vn1, don't use it. i've set this up to be as compatible as i can with ep2, but in the future you should use the window-level \"vn.pos()\" func. see the comments above this for more details")
            sessionStorage['vn1warn'] = true
        }

        content.classList.add('vn1-backwards-compat')

        //quick reordering, we want certain people to be first
        let newSettings = {}
        if(settings.gakvu) newSettings.gakvu = settings.gakvu
        if(settings.miltza) newSettings.miltza = settings.miltza //miltza's usually centered in ep2
        if(settings.tozik) newSettings.tozik = settings.tozik

        for (const char in settings) {
            newSettings[char] = settings[char]
            if(char == "bg" || char == "fade") continue

            //amend old positions
            switch(char) {
                case "tozik":
                    newSettings[char] = newSettings[char].replaceAll('defocus', 'downright')
                break

                case "gakvu":
                    newSettings[char] = newSettings[char].replaceAll('defocus', 'downleft')
                break
                
                default:
                    if(newSettings[char] != "" &&
                        env.currentDialogue.chainName != "d3_movefriend_finish" &&
                        env.currentDialogue.chainName != "d3_mind"
                    ) {
                        newSettings[char] += " abs" //all other characters were absolute in ep2 most of the time
                    }
            }

            if(newSettings[char] == "") newSettings[char] = "hide";
            else if(!newSettings[char].includes('show') && !newSettings[char].includes('hide')) newSettings[char] = "show " + newSettings[char]
        }

        vnObj.pos(newSettings)
    },

    echoChatter: (part) => {
        let delay = 0

        switch(part) {
            case 1:
                body.classList.add('nomenus')

                chatter({actor: "echo", text: "hello akizet, i am glad it is you who connected", delay: delay += 3000})
                chatter({actor: "echo", text: "as it is with worry for your well-being that this message finds you", delay: delay += 4000})
                chatter({actor: "echo", text: "it must be said immediately:", delay: delay += 3000})
                chatter({actor: "echo", text: "information regarding our team's latest findings must not be shared with anyone at any point", delay: delay += 4000})

                env.setTimeout(()=>{
                    changeBgm(env.embassy.music_suspense, {length: 9000})
                }, delay - 10)

                chatter({actor: "akizet", text: "yes... as we had agreed", delay: delay += 3000, readout: true})
                chatter({actor: "akizet", text: "what is the purpose of this message?", delay: delay += 3000, readout: true})

                chatter({actor: "echo", text: "we are in great danger, akizet", delay: delay += 3000})
                chatter({actor: "echo", text: "though we agreed in work, there can be no casual hints of our knowledge", delay: delay += 4000})
                chatter({actor: "echo", text: "no sharing with larval relations", delay: delay += 3000})
                chatter({actor: "echo", text: "not anyone you think you can trust", delay: delay += 3000})
                chatter({actor: "echo", text: "no one", delay: delay += 2000})

                chatter({actor: "sourceless", text: "apprehension from the echo saturates the environment", delay: delay += 3000, readout: true})
                chatter({actor: "sourceless", text: "i can feel that this delusional paranoia is not even its true message", delay: delay += 3000, readout: true})
                chatter({actor: "sourceless", text: `in my <span definition="NOTE::INHERITED CONTEXT::'implies altered living state'">death</span>, i have never had patience for such meandering exchanges`, delay: delay += 3000, readout: true})

                chatter({actor: "akizet", text: "why? do not waste my time, cease with this drama", delay: delay += 4000, readout: true})

                chatter({actor: "echo", text: "i presumed you might react this way", delay: delay += 3000})
                chatter({actor: "echo", text: "but i had to place my warning first, out of precaution", delay: delay += 3000})
                chatter({actor: "echo", text: "you want to know why:", delay: delay += 3000})
                chatter({actor: "echo", text: "come and see", delay: delay += 3000})

                env.setTimeout(()=>{
                    body.classList.add("pathstep1")
                }, delay + 2000)
            break

            case 2:
                MUI("on")
                body.classList.add("pathstep2")
                chatter({actor: "akizet", text: "yes, i understand"})

                chatter({actor: "echo", text: "thank you", delay: delay += 3000})
                chatter({actor: "echo", text: "if only i could truly hear you agree", delay: delay += 2000})
                chatter({actor: "echo", text: "but i cannot risk any side knowing i have told you", delay: delay += 3000})
                chatter({actor: "echo", text: "so this cyst will erase its purpose shortly", delay: delay += 4000})

                env.setTimeout(()=>{
                    body.classList.add("pathstep3")
                }, delay + 2000)

                chatter({actor: "echo", text: "but trust that i will know your response based on your actions", delay: delay += 4000})
                
                env.setTimeout(()=>{
                    startDialogue("echo2")
                }, delay + 3000)
            break

            case 3:
                MUI("on")
                chatter({actor: "sourceless", text: "there is no response - no thought, no meaning", delay: delay += 3000, readout: true})
                chatter({actor: "sourceless", text: "in reality, i feel a strange runoff near my cyst-bearing receptor", delay: delay += 3000, readout: true})
                let warningBgm = env.bgm

                env.setTimeout(()=>{
                    play("criticalError", 0.65)
                    env.stage.current.detonate()
                    forceSwapCam(true)
                    ratween(env.bgm, 2, 5000)
                }, delay += 4000)

                chatter({actor: "sourceless quiet", text: "it is destroying itself...", delay, readout: true})
                
                env.setTimeout(()=>{
                    forceSwapCam(false)
                }, delay + 5000)

                env.setTimeout(()=>{
                    changeStage("embassy_quarters", 10, "down")
                    startDialogue("echo3")
                    body.classList.remove('nomenus')
                }, delay + 5100)

                env.setTimeout(()=>{ // reset for closeout of this day
                    warningBgm.rate(1)
                }, delay + 6500)
            break
        }
    },

    addPartyMember: (name) => {
        switch(name) {
            case "miltza":
                if(page.party.find(m=>m.slug=="miltza")) return;

                page.party.push({
                    slug: "miltza",
                    name: "Miltza",
                    class: "Cynical Artist",
                    hp: 10,
                    combatActor: "miltza"
                })
            break

            case "bozcav":
                if(page.party.find(m=>m.slug=="cavik")) return;

                page.party.push({
                    slug: "cavik",
                    name: "Cavik",
                    class: "Hopeful Engineer",
                    hp: 10,
                    combatActor: "cavik"
                })

                page.party.push({
                    slug: "bozko",
                    name: "Bozko",
                    class: "Burdened Guardian",
                    hp: 25,
                    combatActor: "bozko"
                })
            break

            case "ikgolem":
                if(page.party.find(m=>m.slug=="ikgolem")) return;

                page.party.push({
                    slug: "ikgolem",
                    name: "IK Golem",
                    class: "Destructive Golem",
                    hp: 20,
                    combatActor: "ikgolem"
                })
            break
        }
    },

    day3Signal: ()=> {
        content.classList.add('painprep')
        setTimeout(()=>{
            env.recentSfx = false; play('criticalError', 0.25);
            ratween(env.bgm, 1.5, 6000)
            content.classList.add('painmode')
            setTimeout(()=>content.classList.remove('showfocus'), 1000)
        }, 500)
    },

    day3Static: (length = 10000)=>{
        changeBgm(env.embassy.music_signal, {length, seek: 0});
    },

    

    //for specific cutscene items to avoid skip-duping
    //not using actual flags since it's always an intra-dialogue thing
    reasons: {},
    conditionalItem: (newItem, n = 1, reason) => {
        if(reason) if(env.embassy.reasons[reason]) return false;

        if(addItem(newItem, n)) {
            if(reason) env.embassy.reasons[reason] = true
        }
    }

}

/* team members */
createEntity({
    name: 'akizetesche',
    type: "thoughtform qou obesk akizet",
    image: "/img/sprites/akizet/portrait.gif",
    noProcess: true,
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection locus'
    <span style='color: var(--friend-color)'>::RECONSTRUCTED SIGNATURE CONTEXT</span>
    <span style='color: var(--friend-color)'>+</span>'<span definition="INHERITED CONTEXT::'ethnic implication';'origination from continent';'vazni'">vaznian</span> surrealist influence'
    <span style='color: var(--friend-color)'>+</span>'mark of <span definition="INHERITED CONTEXT::'home';'vaznian cave-city'">oltazni</span>'
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("vel")}  receptors, curled'
    <span style='color: var(--friend-color)'>+</span>'<span definition="INHERITED CONTEXT::'i just think they are cool'">cousinly eyes</span>'
    <span style='color: var(--friend-color)'>+</span>'self-designed signature'`,
    pathLimit: "/local/ocean/embassy/",
    actions: [
        {
            name: "think to self",
            exec: ()=>{
                startDialogue('d1_akizet')
            }, 
            showIf: ["PAGE!!embassy_day", 1]
        },
        {
            name: "ruminate over cyst",
            exec: ()=>{
                startDialogue('d2_akizet')
            }, 
            showIf: ()=> check("PAGE!!embassy_day", 2) && env.stage.name != "echovision"
        },
        {
            name: "try calling someone",
            exec: ()=>{
                startDialogue('s_calls')
            }, 
            showIf: [["PAGE!!embassy_day", 3.5], ["PAGE!!sboss", true]]
        }
    ]
})

createEntity({
    name: 'cavik',
    type: "thoughtform qou obesk cavik portrait-contain",
    image: "/img/sprites/obesk/cavik/portrait.gif",
    noProcess: true,
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    <span style='color: var(--friend-color)'>::RECONSTRUCTED SIGNATURE CONTEXT</span>
    <span style='color: var(--friend-color)'>+</span>'<span definition="INHERITED CONTEXT::'ethnic implication';'origination from continent';'vazni'">vaznian</span> surrealist influence'
    <span style='color: var(--friend-color)'>+</span>'mark of <span definition="INHERITED CONTEXT::'home';'vaznian cave-city';'let fly the eyes!!'">oltazni</span>'
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("jut")} receptors, backward'
    <span style='color: var(--friend-color)'>+</span>'self-designed signature'`,
    pathLimit: "/local/ocean/embassy/",
    actions: [
        {
            name: "greet",
            exec: ()=>{
                startDialogue('d1_cavik')
            },
            showIf: ["stageroom", "embassy_research"],
        },
        {
            name: "join the chat",
            exec: ()=>{
                startDialogue('d2_bozkocavik')
            }, 
            showIf: ["stageroom", "embassy_personnel"]
        },
        {
            name: "chat",
            exec: ()=>{
                startDialogue('cavik')
            }, 
            showIf: ["PAGE!!embassy_day", 3.5]
        }
    ]
})

createEntity({
    name: 'bozko',
    type: "thoughtform qou obesk bozko",
    image: "/img/sprites/obesk/bozko/portrait.gif",
    noProcess: true,
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    <span style='color: var(--friend-color)'>::RECONSTRUCTED SIGNATURE CONTEXT</span>
    <span style='color: var(--friend-color)'>+</span>'<span definition="INHERITED CONTEXT::'why bother?';'self-designing takes too long'">self-image intuited signature</span>'
    <span style='color: var(--friend-color)'>+</span>'extreme-pressure qou-body formation'
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("kiv")} receptors, flourished'`,
    pathLimit: "/local/ocean/embassy/",
    actions: [
        {
            name: "join the chat",
            exec: ()=>{
                startDialogue('d1_kazkibozko')
            },
            showIf: ["stageroom", "embassy_recreation"],
        },
        {
            name: "greet",
            exec: ()=>{
                startDialogue('d1_bozko_research')
            },
            showIf: ["stageroom", "embassy_research"],
        },
        {
            name: "join the chat",
            exec: ()=>{
                startDialogue('d2_bozkocavik')
            }, 
            showIf: ["stageroom", "embassy_personnel"]
        },
        {
            name: "chat",
            exec: ()=>{
                startDialogue('bozko')
            }, 
            showIf: ["PAGE!!embassy_day", 3.5]
        }
    ]
})

createEntity({
    name: 'kazki',
    type: "thoughtform qou obesk kazki",
    image: "/img/sprites/obesk/kazki/portrait.gif",
    noProcess: true,
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    <span style='color: var(--friend-color)'>::RECONSTRUCTED SIGNATURE CONTEXT</span>
    <span style='color: var(--friend-color)'>+</span>'<span definition="INHERITED CONTEXT::'ethnic implication';'origination from continent';'vazni'">vaznian</span> surrealist influence'
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("tir")}  receptors, fungal stylization'
    <span style='color: var(--friend-color)'>+</span>'separative qou-body representation'
    <span style='color: var(--friend-color)'>+</span>'<span definition="INHERITED CONTEXT::'collaboration work of kozazni-native';'geverikanesche jut zhekarri'">externally-designed signature</span>'`,
    pathLimit: "/local/ocean/embassy/",
    actions: [
        {
            name: "join the chat",
            exec: ()=>{
                startDialogue('d1_kazkibozko')
            },
            showIf: ["stageroom", "embassy_recreation"],
        },
        {
            name: "greet",
            exec: ()=>{
                startDialogue('d1_kazki_research')
            },
            showIf: ["stageroom", "embassy_research"],
        },
        {
            name: "greet",
            exec: ()=>{
                startDialogue('d2_kazki')
            }, 
            showIf: ["stageroom", "embassy_relocator"]
        }
    ]
})

createEntity({
    name: 'tozik',
    type: "thoughtform qou obesk tozik portrait-contain portrait-blocker",
    image: "/img/sprites/obesk/tozik/portrait.gif",
    noProcess: true,
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    <span style='color: var(--friend-color)'>::RECONSTRUCTED SIGNATURE CONTEXT</span>
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("ekivik")} geometric influence'
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("jut")} receptors, upward'
    <span style='color: var(--friend-color)'>+</span>'<span definition="INHERITED CONTEXT::'their black pupils are striking'">cousinly eyes</span>'
    <span style='color: var(--friend-color)'>+</span>'self-designed signature'`,
    pathLimit: "/local/ocean/embassy/",
    actions: [
        {
            name: "greet",
            exec: ()=>{
                startDialogue('d1_tozik')
            },
            showIf: [["stageroom", "embassy_research"], ["PAGE!!embassy_day", 1]],
        },
        {
            name: "greet",
            exec: ()=>{
                startDialogue('d2_tozik')
            }, 
            showIf: [["stageroom", "embassy_recreation"], ["PAGE!!embassy_day", 2]]
        },
        {
            name: "convene",
            exec: ()=>{
                startDialogue('d3_c')
            }, 
            showIf: ["PAGE!!embassy_day", 3]
        },
        {
            name: "chat",
            exec: ()=>{
                startDialogue('tozik')
            }, 
            showIf: ["PAGE!!embassy_day", 3.5]
        }
    ]
})


createEntity({
    name: 'gakvu',
    type: "thoughtform qou obesk gakvu portrait-contain",
    image: "/img/sprites/obesk/gakvu/portrait.gif",
    noProcess: true,
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    <span style='color: var(--friend-color)'>::RECONSTRUCTED SIGNATURE CONTEXT</span>
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("ekivik")} geometric influence'
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("vel")} receptors, curled, angular stylization'
    <span style='color: var(--friend-color)'>+</span>'<span definition="INHERITED CONTEXT::'my real coat does this too it is covered in fungus'">self-designed signature</span>'`,
    pathLimit: "/local/ocean/embassy/",
    actions: [
        {
            name: "greet",
            exec: ()=>{
                startDialogue('d1_gakvu')
            },
            showIf: [["stageroom", "embassy_research"], ["PAGE!!embassy_day", 1]],
        },
        {
            name: "greet",
            exec: ()=>{
                startDialogue('d2_gakvu')
            }, 
            showIf: [["stageroom", "embassy_recreation"], ["PAGE!!embassy_day", 2]]
        },
        {
            name: "convene",
            exec: ()=>{
                startDialogue('d3_c')
            }, 
            showIf: ["PAGE!!embassy_day", 3]
        },
        {
            name: "chat",
            exec: ()=>{
                startDialogue('gakvu')
            }, 
            showIf: ["PAGE!!embassy_day", 3.5]
        },
        {
            name: "toggle cloak",
            exec: ()=> {
                change("gakpause", "TOGGLE")
                content.classList.toggle('gakpause')
                setTimeout(() => {
                    chatter({actor: "gakvu", readout: true, text: ["ok", "sure", "no problem", "really? now? all right", "ok akizet"].sample() })
                }, 400);
            },
            showIf: ()=> (check("PAGE!!embassy_day") > 3) || check("embassy__d3_c-coat")
        }
    ]
})

createEntity({
    name: 'miltza',
    type: "thoughtform qou obesk collapse portrait-cover portrait-blocker",
    image: "/img/sprites/obesk/miltza/portrait.gif",
    noProcess: true,
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    <span style='color: var(--friend-color)'>::RECONSTRUCTED SIGNATURE CONTEXT</span>
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("ekivik")} geometric influence'
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("tir")} receptors, clawed'
    <span style='color: var(--friend-color)'>+</span>'<span definition="INHERITED CONTEXT::'religious significance'">additional okizika arm</span>'
    <span style='color: var(--friend-color)'>+</span>'self-designed signature'`,
    pathLimit: "/local/ocean/embassy/",
    actions: [
        {
            name: "chat",
            exec: ()=>{
                startDialogue('d3_miltza')
            }, 
            showIf: ["PAGE!!embassy_day", 3]
        },
        {
            name: "chat",
            exec: ()=>{
                startDialogue('miltza')
            }, 
            showIf: ["PAGE!!embassy_day", 3.5]
        }
    ]
})

createEntity({
    name: 'movefriend',
    type: "thoughtform",
    image: "/img/local/embassy/liftfriend.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection';'connector'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'one of many within the flesh of the embassy'</span>`,
    pathLimit: "/local/ocean/embassy/",
    actions: [
        {
            name: "greet",
            exec: ()=>{  
                startDialogue("embassyRelocator")
            },
            showIf: ()=>{return (check("PAGE!!embassy_day") < 3)}
        },
        {
            name: "golem maintenance",
            exec: ()=>startDialogue("d3_moveend"),
            showIf: ()=>{return (check("PAGE!!embassy_day") == 3)}
        }
    ]
})

createEntity({
    hide: true,
    name: 'save iteration',
    type: "system-component",
    image: "/img/textures/target.png",
    text: `::SYSTEM COMPONENT
    ::UTILIZE TO PRESERVE ITERATION PROGRESS`,
    pathLimit: "/local/ocean/embassy/",
    actions: [
        {
            name: "save",
            exec: ()=>{
                env.embassy.collapseSave({effects: true})
            }
        }
    ]    
})

createEntity({
    name: 'mindcores',
    type: "thoughtform qou obesk portrait-contain collapse",
    image: "/img/local/embassy/mindcoresprites.gif",
    pathLimit: "/local/ocean/embassy/",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'itzil and karik, briefly de-bodied'</span>`,
    actions: [
        {
            name: "chat",
            exec: ()=>{
                startDialogue('d3_mind')
            }, 
            showIf: ["PAGE!!embassy_day", 3]
        },
        {
            name: "chat",
            exec: ()=>{
                startDialogue('mindcores')
            }, 
            showIf: ["PAGE!!embassy_day", 3.5]
        },
        {
            name: "blow up the door",
            exec: ()=>{
                startDialogue('m_door')
            }, 
            showIf: () => {
                return (
                    env.stage.name == `g_m_hall` &&
                    !check("PAGE!!gmdoor")
                )
            }
        }
    ]
})

createEntity({
    name: 'ik golem',
    type: "thoughtform qou obesk portrait-contain collapse",
    image: "/img/sprites/obesk/ikgol/portrait.gif",
    pathLimit: "/local/ocean/embassy/golem",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'itzil and karik re-bodied as one, though itzil is only a passenger for now'</span>
    <span style='color: var(--friend-color)'>::ADDITIONAL VISUAL CONTEXT</span>
    <span style='color: var(--obesk-color)'>+</span>'pressure chassis designed for deep ocean work'
    <span style='color: var(--obesk-color)'>+</span>'spherical appendages contain dull pulse excavation tools'`,
    actions: [
        {
            name: "chat",
            exec: ()=>{
                startDialogue('mindcores')
            }, 
            showIf: ["PAGE!!embassy_day", 3.5]
        }
    ]
})

createEntity({
    name: 'container',
    type: "thoughtform",
    image: "/img/local/orbit/dullvessel/container.gif",
    pathLimit: "/local/ocean/embassy/",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'`
})

createEntity({
    name: 'qou body',
    type: "thoughtform collapse",
    image: "/img/sprites/obesk/qoubody.gif",
    pathLimit: "/local/ocean/embassy/",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    ::NOTE::'imagery associated with mutilation';'rendering partially suspended'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'countless puncture marks embossed in their metallic remains'</span>`
})

createEntity({
    name: 'summarizer',
    type: "thoughtform",
    image: "/img/sprites/obesk/scanner.gif",
    pathLimit: "/local/ocean/embassy/",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'preventative device for context-switchers syndrome'</span>`
})

/* COMMON ENEMIES */
createEntity({
    name: 'hostile container',
    type: "thoughtform foe collapse",
    image: "/img/sprites/combat/foes/inc.gif",
    pathLimit: "/local/ocean/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'it has formed its own eyes';'it shambles around as if violently ill';</span>`,
})

createEntity({
    name: 'hostile veilklight',
    type: "thoughtform foe collapse portrait-cover",
    image: "/img/sprites/combat/foes/foelampbase.gif",
    pathLimit: "/local/ocean/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'partially melted and reformed';'its light component has been repurposed to create anomalous effects'</span>`,
})

// proceed entity - used mainly for linear progression in groundsmindry
// but also appears in golem maintenance after boss beating to transition
env.stageEntities["$"] = {
    class: "blocks notile",
    contains: {
        dyp: {
            class: 'savepoint proceed always-targeted',
            image: 'url(/img/textures/target.png)',
            width: 1,
            height: 1,
            transform: `var(--progProceedTransform)`,
            noback: true,
        },
        examineEntity: "save/proceed",
    }
}

env.stageEntities["€"] = {
    class: "blocks darktile",
    contains: {
        dyp: {
            class: 'savepoint proceed always-targeted',
            image: 'url(/img/textures/target.png)',
            width: 1,
            height: 1,
            transform: `var(--progProceedTransform)`,
            noback: true,
        },
        examineEntity: "continue memory stream",
        examinePriority: 2
    }
}


createEntity({
    name: 'continue memory stream',
    type: "system-component",
    hide: true,
    image: "/img/textures/target.png",
    text: `::SYSTEM COMPONENT
    ::UTILIZE TO CONTROL MEMORY STREAM`,
    actions: [
        { /* ep bridge */
            name: "proceed",
            exec: ()=>{
                startDialogue("e4_transition")
            },
            showIf: ()=>{return check("PAGE!!golboss") && env.stage.name == "g_lobby" && !env?.rpg?.active}
        },
    ]
})

createEntity({
    name: 'save/proceed',
    type: "system-component",
    hide: true,
    image: "/img/textures/target.png",
    text: `::SYSTEM COMPONENT
    ::UTILIZE TO CONTROL MEMORY STREAM`,
    actions: [ 
        {
            name: "save & heal",
            exec: ()=>{
                let healed = false
                let healnames = ""
                
                page.party.forEach(member=>{
                    if(!check(`PAGE!!${member.slug}-gone`) && member.hp) {
                        let combatActor = env.COMBAT_ACTORS[member.combatActor]
                        if(member.hp > combatActor.maxhp) member.hp = combatActor.maxhp
                        if(member.hp >= Math.floor(combatActor.maxhp * 0.5)) return
        
                        healnames += `'${member.name}';`
                        member.hp = Math.floor(combatActor.maxhp * 0.5)
                        healed = true
                    }
                })
    
                if(healed) readoutAdd({
                    message: `<div class="action-text">NOTE::${healnames}'restored HP to 50% max'</div>`, 
                    name: "sourceless", 
                    type: "sourceless combat", 
                    show: true,
                    forceMini: true,
                    sfx: false
                })
                else readoutAdd({
                    message: `<div class="action-text">NOTE::'no healing completed';'only restores under 50% max'</div>`, 
                    name: "sourceless", 
                    type: "sourceless combat", 
                    show: true,
                    forceMini: true,
                    sfx: false
                })

                env.embassy.collapseSave({effects: true})
            },
            showIf: ()=>check("PAGE!!e4prog") && !env?.rpg?.active
        },
        { /* ep bridge */
            name: "proceed",
            exec: ()=>{
                startDialogue("e4_transition")
            },
            showIf: ()=>{return check("PAGE!!golboss") && env.stage.name == "g_lobby" && !env?.rpg?.active}
        },

        { /* proceed tutorial */
            name: "proceed",
            exec: ()=>{
                startDialogue("entrance_proceed")
            },
            showIf: ()=>{return check("PAGE!!e4prog", 1) && env.stage.name == "grm_entry" && !env?.rpg?.active}
        },

        { /* lessser combat start */
            name: "proceed",
            exec: ()=>{
                startDialogue("lesser_attack")
            },
            showIf: ()=>{return check("PAGE!!e4prog", 2) && env.stage.name == "grm_lesser" && !env?.rpg?.active}
        },

        { /* h2h trigger in lesser-dull hall */
            name: "proceed",
            exec: ()=>{
                startDialogue("h2h")
            },
            showIf: ()=>{return check("PAGE!!e4prog", 2) && env.stage.name == "hall_lesser-dull" && !env?.rpg?.active}
        },

        { /* continue into contact and dull mind */
            name: "proceed",
            exec: ()=>{
                startDialogue("contact")
            },
            showIf: ()=>{return check("PAGE!!e4prog", 3) && env.stage.name == "hall_lesser-dull" && !env?.rpg?.active}
        },

        { /* dull continue talk + warning after contact */
            name: "proceed",
            exec: ()=>{
                startDialogue("setout")
            },
            showIf: ()=>{return check("PAGE!!e4prog", 4) && env.stage.name == "grm_dull_front" && !env?.rpg?.active}
        },

        { /* spine continue */
            name: "proceed",
            exec: ()=>{
                startDialogue("spine_bomb")
            },
            showIf: ()=>{return check("PAGE!!e4prog", 7) && env.stage.name == "grm_spine" && !env?.rpg?.active}
        },

        { /* heart continue */
            name: "proceed",
            exec: ()=>{
                startDialogue("heart_bomb")
            },
            showIf: ()=>{return check("PAGE!!e4prog", 10) && env.stage.name == "grm_heart" && !env?.rpg?.active}
        },

        { /* split continue */
            name: "proceed",
            exec: ()=>{
                startDialogue("split_connect")
            },
            showIf: ()=>{return check("PAGE!!e4prog", 12) && env.stage.name == "hall_heart-entry" && !env?.rpg?.active}
        },

        { /* entry reloop continue */
            name: "proceed",
            exec: ()=>{
                startDialogue("entry_loopproceed")
            },
            showIf: ()=>{return check("PAGE!!e4prog", 13) && !env?.rpg?.active}
        },

        { /* lesser mind pre-core entry */
            name: "proceed",
            exec: ()=>{
                startDialogue("vekoaboss")
            },
            showIf: ()=>{return check("PAGE!!e4prog", 15) && !env?.rpg?.active}
        },
    ]
})


/* global embassy actors */
env.dialogueActors["movefriend"] = {
    elementID: "movefriend0",
    image: "/img/local/embassy/liftfriend.gif",
    type: "obesk uppercase",
    voice: ()=>play('talk', 0.8)
}

env.dialogueActors["tozik"] = {
    name: "tozik",
    expressions: {
        default: {
            type: "obesk qou tozik portrait-contain portrait-blocker",
            element: ".truecreature .tozik",
            voice: ()=>play('talk', 1),
            image: ()=>check("PAGE!!tozpain") ? "/img/sprites/obesk/tozik/portrait_pain.gif" : "/img/sprites/obesk/tozik/portrait.gif",
        },

        mutter: {
            type: "obesk qou tozik portrait-contain portrait-bright mutter",
            element: ".truecreature .tozik",
            voice: ()=>play('talk', 0.8),
            image: "/img/sprites/obesk/tozik/portrait_pain.gif",
        },
    }
}

env.dialogueActors["gakvu"] = {
    image: "/img/sprites/obesk/gakvu/portrait.gif",
    element: ".truecreature .gakvu",
    type: "obesk qou gakvu portrait-contain",
    voice: ()=>play('talklaugh', 1)
}

env.dialogueActors["kazki"] = {
    image: "/img/sprites/obesk/kazki/portrait.gif",
    type: "obesk qou kazki portrait-contain",
    voice: ()=>play('talklaugh', 1.2)
}

env.dialogueActors["bozko"] = {
    image: "/img/sprites/obesk/bozko/portrait.gif",
    type: "obesk qou bozko portrait-contain",
    voice: ()=>play('talk', 0.8)
}

env.dialogueActors["cavik"] = {
    image: "/img/sprites/obesk/cavik/portrait.gif",
    type: "obesk qou cavik portrait-contain",
    voice: ()=>play('talk', 1.3)
}

env.dialogueActors["groundsmind"] = {
    image: "/img/local/embassy/groundsmindportrait.gif",
    type: "obesk groundsmind qou",
    voice: ()=>play('talkhigh', 1.2)
}

env.dialogueActors["timestopper"] = {
    type: "timestopper obesk uppercase",
    voice: ()=>play('talkhigh', 0.6)
}

env.dialogueActors["echo"] = {
    image: "/img/textures/disruptionM.gif",
    type: "obesk echo uppercase",
    voice: ()=>play('talkcroak', 1.2),
    element: "#realgrid .echosprite",
}

env.dialogueActors["aggressor"] = {
    image: "/img/sprites/aggressor/sigilback.gif",
    type: "incoherent",
    voice: ()=>play('talksignal')
}

env.dialogueActors["itzil"] = {
    image: "/img/local/embassy/mindcore1portrait.gif",
    type: "obesk qou",
    voice: ()=>play('talkcore', 2)
}

env.dialogueActors["karik"] = {
    image: "/img/local/embassy/mindcore2portrait.gif",
    type: "obesk qou",
    voice: ()=>play('talkcore', 1)
}

env.dialogueActors["itzil quiet"] = {
    name: "itzil",
    image: "/img/local/embassy/mindcore1portrait.gif",
    type: "obesk qou",
    voice: false
}

env.dialogueActors["karik quiet"] = {
    name: "karik",
    image: "/img/local/embassy/mindcore2portrait.gif",
    type: "obesk qou",
    voice: false
}

env.dialogueActors["miltza"] = {
    image: "/img/sprites/obesk/miltza/portrait.gif",
    type: "obesk qou portrait-cover",
    voice: ()=>play('talkgal', 0.8)
}

/* global stage info */
//this is now a function that returns the html that should be used for the truecreature
env.stageEntities.embassyCreatures = {
    akizet: `<div class="akizet creaturesprite" pos><div class="akihead graphic"></div> <span class="target" entity="akizetesche"></span></div>`,
    gakvu: `<div class="gakvu creaturesprite" pos><figure><div class="head graphic"></div><div class="body graphic"></div></figure> <span class="target" entity="gakvu"></span></div>`,
    tozik: `<div class="tozik creaturesprite" pos><figure><div class="head graphic"></div><div class="body graphic"></div></figure> <span class="target" entity="tozik"></span></div>`,
    miltza: `<div class="miltza creaturesprite" pos><figure><div class="head graphic"></div><div class="body graphic"></div><div class="arms graphic"></div></figure> <span class="target" entity="miltza"></span></div>`,
    cavik: `<div class="cavik creaturesprite" pos><figure><div class="head graphic"></div><div class="body graphic"></div><div class="arms graphic"></div><div class="legs graphic"></div></figure> <span class="target" entity="cavik"></span></div>`,
    bozko: `<div class="bozko creaturesprite" pos><figure><div class="head graphic"></div><div class="body graphic"></div><div class="arms graphic"></div></figure> <span class="target" entity="bozko"></span></div>`,
    ikgolem: `<div class="ikgolem creaturesprite" pos><figure><div class="head graphic"></div><div class="body graphic"></div><div class="arms graphic"></div></figure> <span class="target" entity="ik golem"></span></div>`,
}
env.stageEntities.embassyCreature = () => {
    let creature
    switch(check("PAGE!!embassy_day")) {
        case 3.5:
            creature = env.stageEntities.embassyCreatures.akizet

            //get second and third members, placing them and adding their positions
            //creature sprite strings need to have 'pos' which is replaced and gives them their transform based on their party placement
            try { creature += env.stageEntities.embassyCreatures[page.party[1].slug].replace("pos", 'pos="left"') } catch(e) { console.log(e) }
            try { creature += env.stageEntities.embassyCreatures[page.party[2].slug].replace("pos", 'pos="right"') } catch(e) { console.log(e) }
            
        return creature

        case 3: //no positioning required for day 3 cause its always these guys
            creature = env.stageEntities.embassyCreatures.akizet + env.stageEntities.embassyCreatures.tozik.replace("pos", 'pos="right"') + env.stageEntities.embassyCreatures.gakvu.replace("pos", 'pos="left"')
        return creature

        default: //in times of peace, akizets are known to drink
            return `
                <div class="akizet creaturesprite">
                    <div class="akihead graphic"></div> <span class="target" entity="akizetesche"></span>
                    <div class="drinklayer graphic" drink="none">
                        <div class="target" entity="orange simulacrum"></div>
                    </div>
                </div>
            `
    }
}

env.stageEntities['-'] = { 
    class: "prop chartile blocks",
    contains: {
        id: "randchar",
        class: "character randobesktile"
    } 
}

env.stageEntities['+'] = { 
    class: "prop chartile blocks",
    contains: {
        id: "randchar",
        class: "character randobesktile turned"
    } 
}

//research embassy walls
env.stageEntities['N'] = { 
    class:"blocks cwall north",
    contains: {
        html: `
            <canvas class="wall" sprite="/img/local/embassy/tiles/wallgeneric.gif" repeat="repeat-x" fit="auto" baseWidth="[wallW]" baseHeight="3"></canvas>
            <canvas class="wall" sprite="/img/local/embassy/tiles/wallgeneric.gif" repeat="repeat-x" fit="auto" baseWidth="[wallH]" baseHeight="3"></canvas>
        `
    }
}
env.stageEntities['S'] = { 
    class:"blocks cwall south",
    contains: {
        html: `
            <canvas class="wall" sprite="/img/local/embassy/tiles/wallgeneric.gif" repeat="repeat-x" fit="auto" baseWidth="[wallH]" baseHeight="3"></canvas>
            <canvas class="wall" sprite="/img/local/embassy/tiles/wallgeneric.gif" repeat="repeat-x" fit="auto" baseWidth="[wallW]" baseHeight="3"></canvas>
        `
    }
}

//golem walls - unlike the above which are place against the stage tiles,
//these ones are placed in the corners. just a small transform difference
//primarily done to not have to specify wallW and wallH constantly by just subtracting 2 from the value in the stageInit
env.stageEntities['Ṇ'] = { 
    class:"blocks cwall north cornerwall",
    contains: {
        html: `    
            <canvas class="wall" sprite="/img/local/embassy/golemwall.gif, /img/local/embassy/mossdesign.gif, /img/local/embassy/wallcover.gif" repeat="repeat-x" fit="auto, contain, stretch" baseWidth="[wallH]" baseHeight="3"></canvas>
            <canvas class="wall" sprite="/img/local/embassy/golemwall.gif, /img/local/embassy/mossdesign.gif, /img/local/embassy/wallcover.gif" repeat="repeat-x" fit="auto, contain, stretch" baseWidth="[wallW]" baseHeight="3"></canvas>
        `
    } 
}

env.stageEntities['Ṡ'] = { 
    class:"blocks cwall south cornerwall",
    contains: {
        html: `
            <canvas class="wall" sprite="/img/local/embassy/golemwall.gif, /img/local/embassy/mossdesign.gif, /img/local/embassy/wallcover.gif" repeat="repeat-x" fit="auto, contain, stretch" baseWidth="[wallH]" baseHeight="3"></canvas>
            <canvas class="wall" sprite="/img/local/embassy/golemwall.gif, /img/local/embassy/mossdesign.gif, /img/local/embassy/wallcover.gif" repeat="repeat-x" fit="auto, contain, stretch" baseWidth="[wallW]" baseHeight="3"></canvas>
        `
    } 
}

env.stageEntities['l'] = {
    class:"prop blocks",
    contains: {
        class: "lamp",
        html: `<figure><div class="target" entity="veilklight"></div></figure>`
    }
}


env.stageEntities.cavikHTML = `<figure>
<div class="head"></div>
<div class="body"></div>
<div class="arms"></div>
<div class="legs"></div>
</figure>`

env.stageEntities['v'] = {
    class:"prop chartile blocks caviktile",
    contains: {
        id: "cavik",
        examineEntity: "cavik",
        class: "cavik character",
        examinePriority: 2,
        html: env.stageEntities.cavikHTML
    }
}

env.stageEntities.bozkoHTML = `<figure>
<div class="head"></div>
<div class="body"></div>
<div class="arms"></div>
</figure>`

env.stageEntities['k'] = {
    class:"prop chartile blocks bozkotile",
    contains: {
        id: "bozko",
        class: "bozko character",
        examineEntity: "bozko",
        examinePriority: 2,
        html: env.stageEntities.bozkoHTML
    }
}

env.stageEntities['K'] = {
    class:"prop chartile blocks",
    contains: {
        id: "kazki",
        class: "kazki character",
        examineEntity: "kazki",
        examinePriority: 2,
        html: `<figure>
            <div class="head"></div>
            <div class="body"></div>
            <div class="legs"></div>
        </figure>`
    }
}

env.stageEntities.gakvuHTML = `<figure>
<div class="head"></div>
<div class="body"></div>
</figure>`

env.stageEntities['G'] = {
    class:"prop chartile blocks",
    contains: {
        id: "gakvu",
        class: "gakvu character",
        examineEntity: "gakvu",
        examinePriority: 2,
        html: env.stageEntities.gakvuHTML
    }
}


env.stageEntities.tozikHTML = `<figure>
<div class="head"></div>
<div class="body"></div>
</figure>`

env.stageEntities['T'] = {
    class:"prop chartile blocks",
    contains: {
        id: "tozik",
        class: "tozik character",
        examineEntity: "tozik",
        examinePriority: 2,
        html: env.stageEntities.tozikHTML
    }
}

env.stageEntities.miltzaHTML = `
    <figure>
        <div class="head"></div>
        <div class="body"></div>
        <div class="arms"></div>
    </figure>
`
env.stageEntities['M'] = { 
    class:"prop chartile blocks",
    contains: {
        id: "miltza",
        class: "miltza character collapser",
        examineEntity: "miltza",
        html: env.stageEntities.miltzaHTML
    }
}

env.stageEntities.mindcoresHTML = `<figure></figure>`
env.stageEntities['m'] = { 
    class:"prop chartile blocks",
    contains: {
        id: "mindcores",
        class: "mindcores character collapser",
        examineEntity: "mindcores",
        html: env.stageEntities.mindcoresHTML
    }
}

env.stageEntities.ikgolemHTML = `<figure>
    <div class="head"></div>
    <div class="body"></div>
    <div class="arms"></div>
</figure>`
env.stageEntities['Æ'] = { 
    class:"prop chartile blocks",
    contains: {
        id: "ikgolem",
        class: "ikgolem character collapser",
        examineEntity: "ik golem",
        html: env.stageEntities.ikgolemHTML
    }
}

env.embassy.fixMovefriend = () => {
    document.querySelectorAll('.target[entity="disrupted movefriend"]').forEach(e=>{
        e.setAttribute('entity', 'movefriend')
    })
}
env.stages['embassy_relocator'] = {
    creature: env.stageEntities.embassyCreature,
    exec: ()=> { 
        env.embassy.updateStageData()

        switch(check("PAGE!!embassy_day")) {
            case 3.99: case 3.5:
                content.classList.remove('collapse')
                content.classList.add('show-vn')

                //rewrite teleports to fit the golem page
                document.querySelectorAll('.teleport:not([slug="R"])').forEach(el=>{
                    el.classList.add('locked')
                    el.setAttribute('lockflag', "permalocked")
                })
                
                document.querySelectorAll('.teleport[slug="R"]').forEach(el=>{
                    if(check("PAGE!!embassy_day", 3.99)) {
                        el.setAttribute('teleport-target', 'grm_entry')
                        el.setAttribute('shouldface', 'down')
                        el.removeAttribute('spot')
                    } else {
                        el.setAttribute('teleport-target', 'g_personnel')
                        el.setAttribute('shouldface', 'up')
                    }
                })

                document.querySelectorAll('.character').forEach(e=>{
                    e.parentElement.classList.remove('prop', 'blocks')
                    e.parentElement.innerHTML = ""
                })

                //continue to regular day 3 case as well

            case 3:
                toggleBgm(env.embassy.music_safe)
                document.querySelectorAll('.character:not(.collapser)').forEach(e=>{
                    e.parentElement.classList.remove('prop', 'blocks')
                    e.parentElement.innerHTML = ""
                })

                if(!check("PAGE!!miltzameet")) document.querySelectorAll('.character.miltza').forEach(e=>{
                        e.parentElement.classList.remove('prop', 'blocks')
                        e.parentElement.innerHTML = ""
                })                

                if(!check("PAGE!!recreation_leavable")) document.querySelectorAll('.character.mindcores').forEach(e=>{
                    e.parentElement.classList.remove('prop', 'blocks')
                    e.parentElement.innerHTML = ""
                })

                if(check("PAGE!!embassy_day") == 3) {
                    if(check("PAGE!!movefixed")) {
                        document.querySelector('#realgrid .lifter').classList.add('fixed')
                    } else {
                        document.querySelectorAll('.target[entity="movefriend"]').forEach(e=>{
                            e.setAttribute('entity', 'disrupted movefriend')
                        })
                    }

                    if(!check('PAGE!!crelocator_intro')) {
                        startDialogue("movefriend_disabled")
                        change('PAGE!!crelocator_intro', true)
                    } else if(check("PAGE!!queue_person_enable") && !check('PAGE!!cpersonnel_unlocked')) {
                        startDialogue("d3_person_enable")
                        change('PAGE!!queue_person_enable', false)
                    } else if(env.embassy.enoughSfer() && !check('PAGE!!movefriendqueued')) {
                        startDialogue("d3_relocator_return")
                        change('PAGE!!movefriendqueued', true)
                    }      
                }          
            break

            case 1:
                env.embassy.regenRandobesk()
                document.querySelectorAll('.character.kazki, .character.collapser').forEach(e=>{
                    e.parentElement.classList.remove('prop', 'blocks')
                    e.parentElement.innerHTML = ""
                })
                toggleBgm(page.bgm)
                env.embassy.relocatorDestination(env.embassy.relocatorReturn) 

            break

            case 2:
                env.embassy.regenRandobesk()
                document.querySelectorAll('.character.collapser').forEach(e=>{
                    e.parentElement.classList.remove('prop', 'blocks')
                    e.parentElement.innerHTML = ""
                })
                toggleBgm(page.bgm)
                env.embassy.relocatorDestination(env.embassy.relocatorReturn)
            break

            default: //not one of the original /embassy/ pages, i.e. EP3
                document.querySelectorAll('.character:not(.collapser)').forEach(e=>{
                    e.parentElement.classList.remove('prop', 'blocks')
                    e.parentElement.innerHTML = ""
                })                
            break
        }
    },

    entities: {
        R: {
            teleportSpot: 56,
            teleportTarget: "embassy_research",
            shouldFace: "right"
        },
        
        g: {
            class: "blocks",
            contains: {
                class: "lifter",
                id: "movefriend",
                examineEntity: "movefriend",
                html: `<figure></figure>`
            }
        },

        "%": {
            class: "locked",
            teleportTarget: "embassy_recreation",
            lockFlag: "PAGE!!recreation_unlocked",
            shouldFace:"down"
        },

        "^": {
            class: "locked",
            teleportTarget: "embassy_cpersonnel",
            lockFlag: "PAGE!!cpersonnel_unlocked"
        },

        "Y": {
            class: "blocks",
            contains: {
                class: "savepoint always-targeted",
                id: "savepoint",
                examineEntity: "save iteration",
            }
        },
    },

    width: 7,
    plan: [
        '.','.','.','.','.','.','.',
        '.','.','.','R','.','.','.',
        '.','.','M','p','m','.','.',
        '%','K','░','░','░','+','^',
        '.','.','░','░','░','.','.',
        '.','.','.','░','Y','.','.',
        '.','.','.','g','.','.','.',
    ],

    html: ()=>{
        if(content.classList.contains("collapse")) {
            return `
            <canvas class="relocator" sprite="/img/local/embassy/elevatordark.gif" baseWidth="7" baseHeight="7"></canvas>
            <canvas class="relocator" sprite="/img/local/embassy/elevatordark.gif" baseWidth="7" baseHeight="7"></canvas>
            `
        } else {
            return `
            <canvas class="relocator" sprite="/img/local/embassy/elevator.gif" baseWidth="7" baseHeight="7"></canvas>
            <canvas class="relocator" sprite="/img/local/embassy/elevator.gif" baseWidth="7" baseHeight="7"></canvas>
            `
        }
    }
}

