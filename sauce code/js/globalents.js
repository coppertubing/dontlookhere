/***********************************************************************/
/***********************************************************************/
/***************************GLOBAL ENTITIES*****************************/
/***********************************************************************/
/***********************************************************************/
env.entities['funfriend'] = {
    name: 'funfriend',
    type: "thoughtform funfriend obesk",
    image: "/img/sprites/funfriend/funfriend.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'system management';'assistant'`,
    actions: [
        {
            name: "greet",
            exec: ()=>{  
                startDialogue("funfriend")       
            },
            showIf: ()=> {
                return page.path == "/hub/"
            }
        }
    ]
}

env.entities['gate::their city'] = {
    name: 'gate::their city',
    type: "thoughtform",
    image: "/img/local/city/cityportal.gif",
    text: `::CONNECTOR THOUGHTFORM
    ::DESTINATION::'low dimensional thoughtspace';'internal'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'their dead spires, icons of control'</span>`,
    actions: [
        {
            name: "enter",
            exec: ()=>{
                moveTo("/local/city/")
            }
        }
    ]
}

env.entities['gate::their waters'] = {
    name: 'gate::their waters',
    type: "thoughtform",
    image: "/img/local/ocean/waves.gif",
    text: `::CONNECTOR THOUGHTFORM
    ::DESTINATION::'low dimensional thoughtspace';'internal'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'their vast inner void';'our stilted shore';'the end'</span>`,
    actions: [
        {
            name: "enter",
            exec: ()=>{
                moveTo("/local/ocean/")
            }
        }
    ]
}

env.entities['gate::the void'] = {
    name: 'gate::the void',
    type: "thoughtform",
    image: "/img/local/orbit/stars.gif",
    text: `::CONNECTOR THOUGHTFORM
    ::DESTINATION::'low dimensional thoughtspace';'internal'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'the domain of the <span definition="NOTE::INHERITED CONTEXT::'implies altered living state'">dead</span>'</span>`,
    actions: [
        {
            name: "enter",
            exec: ()=>{
                moveTo("/local/orbit/")
            }
        }
    ]
}

env.entities['gate::the embassy'] = {
    name: 'gate::the embassy',
    type: "thoughtform",
    image: "/img/local/embassy/embassyportal.gif",
    text: `::CONNECTOR THOUGHTFORM
    ::DESTINATION::'spatial thoughtform';'recollection'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'the performance';'velzie cackles with delight'</span>`,
    actions: [
        {
            name: "enter",
            exec: ()=>{
                moveTo("/local/ocean/embassy/")
            }
        }
    ]
}

env.entities['our dull vessel'] = {
    name: 'our dull vessel',
    type: "thoughtform",
    image: "/img/textures/blocker.gif",
    text: `::SPATIAL THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection';'recurrent location';'alter thoughtform state'
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'some elements suffer extremely low cohesion'">::INCOHERENCE DETECTED</span>`,
    actions: [
        {
            name: "enter",
            exec: ()=>{
                moveTo("/local/dullvessel/")
            }
        }
    ]     ,   
    actions: [
        {
            name: "enter",
            exec: ()=>{
                moveTo("/local/dullvessel/")
            },
            showIf: ()=>{if(page.name == "their-waters") return !document.querySelector('#ship').classList.contains('dive'); else return true},
        },
        {
            name: "dive",
            exec: ()=>{
                content.classList.add('dove')
                document.querySelector('#ship').classList.add('dive')
                change('dullvessel_dive', true)
            },
            showIf: ()=>{if(page.name == "their-waters") return !document.querySelector('#ship').classList.contains('dive'); else return false},
        },
        {
            name: "rise",
            exec: ()=>{
                content.classList.remove('dove')
                document.querySelector('#ship').classList.remove('dive')
                change('dullvessel_dive', false)
            },
            showIf: ()=>{if(page.name == "their-waters") return document.querySelector('#ship').classList.contains('dive'); else return false},
        },
    ]
}

env.entities['gate::gate::gate::'] = {
    name: 'gate::gate::gate::',
    type: "thoughtform",
    image: "/img/textures/corruripple.gif",
    text: `::CONNECTOR THOUGHTFORM
    ::DESTINATION::ERROR::'unprocessable entity'::RENDERABLE
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'maximum incoherence';'render possible';'not advised'">::PROCESSING ERROR</span>`,
    actions: [
        {
            name: "enter",
            exec: ()=>{
                moveTo("/local/uncosm/")
            }
        }
    ]
}

env.entities['advance log'] = {
    hide: true,
    name: 'advance log',
    type: "system-component",
    image: "/img/textures/target.png",
    text: `::SYSTEM COMPONENT
    ::ALERT::<span style="color:var(--bright-color)">'current mindspike log procession concluded';'static environment sustained'</span>
    ::NOTE::'log state will advance on next visit';'utilize ACT:advance to immediately proceed to next state'`,
    actions: [
        {
            name: "advance",
            exec: ()=>{
                MUI('off'); flash(true); cutscene(true); exitMenu();
                if(env.bgm) env.bgm.fade(env.bgm.volume(), 0, 1000)
                corruStatic.play()
                corruStatic.fade(0, getModifiedVolume('music', 1), 1000)
                
                setTimeout(()=>{
                    sessionStorage.clear()
                    location.replace('/')
                }, 1000)
            }
        }
    ]  
}

env.entities['membrane incision'] = {
    hide: true,
    name: 'membrane incision',
    type: "thoughtform-meta portrait-contain",
    image: "/img/textures/cneural.gif",
    text: `::CORRUCYSTIC COMPONENT
    ::<span definition="NOTE::'gap in rendering';'reflective of neural damage';'please schedule mindsci checkup'">NON-ENTITY</span>`,
    actions: [
        {
            name: "enter",
            exec: ()=>{
                exitMenu(true)
                let delay = 1
                change("TEMP!!cachePath", "funfriend")

                if(env.buddy_ffproxy.shouldBeOnPage() && !check("cache__ff-start")) {
                    env.buddy_ffproxy.chatter({text: "WAIT WHAT ARE YOU DOING", readout: true})
                    cutscene(true)

                    delay = 4000
                    
                    env.setTimeout(()=>{
                        flash(true); 
                        env.buddy_ffproxy.chatter({text: "INTERLOPER!!", readout: true})
                    }, 2000)
                }

                env.setTimeout(()=>{
                    moveTo('/local/cache/')
                    flash(false)
                    cutscene(false)
                }, delay)
            }
        }
    ]  
}

env.entities['˜CâR…'] = {
    hide: true,
    name: '˜CâR…',
    type: "thoughtform-meta portrait-contain",
    image: "/img/local/beneath/car.gif",
    text: `::CONNECTOR THOUGHTFORM
    ::DESTINATION::ERROR::'unprocessable entity'::RENDERABLE
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'total cohesion failure';'damaged contexts'">::HIGH INCOHERENCE DETECTED</span>
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'to e—Ýÿach cousin th@ëir own bright <span class="code" definition="INHERITED CONTEXT::'corrucystic surface vehicle';'bulbous and armored';'partial translation';'implied closest cultural equivalent'">walker</span>'</span>
    <span definition="NOTE::'referencing third-party context installation'::JOY_MASK">::INTERNAL CONTEXT</span>::<span class="bright-color" definition="ANALYSIS::'like a subtle fog in the thoughtspace';'slippery and difficult to perceive until entered';'may obscure nearby entities';'commonly accidental';'but i have seen it used intentionally in a few places'">'hidden via gradient obfuscation'</span>`,
    actions: [
        {
            name: "enter",
            exec: ()=>{
                startDialogue("car")
            },
            showIf: () => env.stage.name == "abyss_wreck" && !check("car__intro")
        },
        {
            name: "enter",
            exec: ()=>{
                forcePlay("carstart")
                moveTo('/local/beneath/car/')
            },
            showIf: () => check("car__intro")
        }
    ]
}

env.entities['referential scar'] = {
    hide: true,
    name: 'referential scar',
    type: "thoughtform-meta portrait-contain portrait-haze",
    image: "/img/textures/joyfractal.gif",
    text: `::CORRUCYSTIC COMPONENT
    ::<span definition="NOTE::'subjective nomenclature applied';'subjective visual profile applied'">NON-ENTITY</span>
    <span definition="NOTE::'referencing third-party context installation'::JOY_MASK">::INTERNAL CONTEXT</span>::<span class="bright-color">'a minute passage left by those leaping across memories';'entwined with countless others in the space between';'not camouflaged, merely difficult to spot';\n\n'i imagine you specifically cannot utilize one without another, similar end point in mind'</span>`,
    actions: [
        {
            name: "utilize",
            exec: ()=>{
                if(getQueryDist("#creature", ".joytether") > 7) {
                    chatter({actor: 'sourceless', text: "you can't focus on it from this far away.", readout: true,})
                } else {
                    if(check("joy#any")) startDialogue("++scar");
                    else startDialogue("++scar", {specificChain: "early"})
                }
            },
            showIf: () => {
                if(env.stage.ref) { // stage cases
                    if(check(`joy#${env.stage.name}`)) return true

                    return (env.stage.name.includes("pit_") && check("joy#pit")) ||
                            env.stage.name == "ozo_stranger"

                } else { // flats
                    return check(`joy#${page.dialoguePrefix}`)
                }
            }
        }
    ],

    exmExec: ()=>{
        let unlock = () => {
            change("joy#any", true)
            forcePlay("talkether", 2)
            
            let container = env?.stage?.ref ? env.stage : content
            container.querySelectorAll(".joyfacet.unlinked").forEach(el=>{
                el.classList.remove("unlinked")
                el.classList.add("linked")
            })
        }

        switch(env?.stage?.name) {
            //flats
            case undefined:
            case null:
                change(`joy#${page.dialoguePrefix}`, true)
                unlock()
            break

            //stages
            case "pit_base":
            case "pit_melting":
            case "pit_outer":
            case "pit_halls":
                change("joy#pit", true)
                unlock()
            break

            case "office_hall":
            case "dullvessel_quarters":
            case "hullf":
                //listed here just for reference
            default:
                if(env.stage.ref) change(`joy#${env.stage.name}`, true)
                unlock()
        }
    }
}

// entities that SHOULD show up in the ent menu for somewhere need to be defined with da function
// so we wait a sec for the main scripts to run, then run it and set up a load listener
// should result in path limited entities always correctly showing up both in content and on the ENT menu.
// might end up being last in the list which could be weird in some cases... not a huge deal though
// eventually i want to rework the ENT menu to be a little more controlled anyway. it needs hints and stuff
env.globalLimitedEntitySetup = () => {

    //ozo related
    createEntity({
        name: 'fairy',
        pathLimit: "/local/ozo/",
        image: '/img/local/uncosm/ozo/sprite_portrait.gif', 
        type: "thoughtform obesk portrait-haze portrait-auto portrait-center",
        text: `::RESPONSIVE THOUGHTFORM
        ::EXPLICIT PURPOSE:'hunger'
        <span style="color: var(--obesk-color)" definition="ANALYSIS::'no cohesion';'signature corruption'">::INCOHERENCE DETECTED</span>
        ::INHERITED CONTEXT::<span style='color: var(--bright-color)'>'trinket worn b(ÝØ;;-__ERROR::'unprocessable'__;'free! free!!'</span>`,
        actions: [
            {
                name: "hello",
                exec: ()=> startDialogue('fairy_intro'),
                showIf: [["ozo__fairy_intro", false], ["stageroom", "ozo_fairy"]]
            },

            {
                name: "greet",
                exec: ()=> startDialogue('fairy'),
                showIf: [["ozo__fairy_intro", true], ["stageroom", "ozo_fairy"]]          
            },
                
            {
                name: "unity",
                class: "act-ozo",
                exec: ()=>{
                    cutscene(true)

                    chatter({actor: 'fairy', text: 'already here! stupid!', readout: true, delay: 2000})

                    env.setTimeout(()=>{
                        play("talkchoir", 0.75)
                        vfx({type: 'beacon', state: true})
                    }, 400)

                    setTimeout(()=>{
                        vfx({type: 'beacon', state: false})
                        cutscene(false)
                    }, 2000)
                },
                showIf: () => (page.path == "/local/ozo/") && check("mask", "unity")
            },

            // other zones
            {
                name: "hello",
                exec: ()=> startDialogue('++fairytravel'),
                showIf: () => page.path != "/local/ozo/"
            },
                
            {
                name: "unity",
                class: "act-ozo",
                exec: ()=>{
                    cutscene(true)

                    chatter({actor: 'fairy', text: 'i know the way back! stupid!', readout: true, delay: 1000})

                    env.setTimeout(()=>{
                        play("talkchoir", 0.75)
                        vfx({type: 'beacon', state: true})
                    }, 400)

                    setTimeout(()=>{
                        vfx({type: 'beacon', state: false})
                        cutscene(false)
                    }, 1000)
                },
                showIf: () => (page.path != "/local/ozo/") && check("mask", "unity"),
            },
        ]
    })

    // true wanderers
    createEntity({
        name: 'rotwatcher',
        hide: true,
        image: '/img/sprites/rot/rotxa.gif', 
        type: "thoughtform obesk portrait-haze portrait-cover portrait-center",
        text: `::RESPONSIVE THOUGHTFORM
        ::EXPLICIT PURPOSE:'observation'
        <span style="color: var(--obesk-color)" definition="ANALYSIS::'no cohesion';'malformed entity';'potential tampering'">::INCOHERENCE DETECTED</span>
        ::INHERITED CONTEXT::<span style='color: var(--bright-color)'>'a simple chœr t)Ý®‡;-__ERROR::'unprocessable'__;'cataloguer'</span>
        <span definition="NOTE::'referencing third-party context installation'::JOY_MASK">::INTERNAL CONTEXT</span>::<span class="bright-color" definition="ANALYSIS::'commonly used as a defense by newly awoken thoughtforms';'sometimes unintentional';'simple but effective'">'hidden via refractive membrane camouflage'</span>`,
        actions: [
            // city intro
            {
                name: "hello",
                exec: ()=> startDialogue('rotmeet'),
                showIf: () => !check("citystreet__rotmeet") 
            },

            {
                name: "what's that",
                exec: ()=> startDialogue('++rotcity'),
                showIf: () => check("stageroom", "city_cafe") && check("citystreet__rotmeet")
            },

            {
                name: "what's going on here",
                exec: ()=> startDialogue('++rotcityflip'),
                showIf: () => check("stageroom", "city_banks_flip")
            },

            {
                name: "what do you think",
                exec: ()=> startDialogue('++rotozo'),
                showIf: () => check("stageroom", "ozo_entrance")
            },

            {
                name: "what do you think",
                exec: ()=> startDialogue('++rotorbit'),
                showIf: () => page.path == "/local/orbit/"
            },

            {
                name: "what do you think",
                exec: ()=> startDialogue('++rotuncosm'),
                showIf: () => page.path == "/local/uncosm/"
            },

            {
                name: "what do you think",
                exec: ()=> startDialogue('++rotmaze'),
                showIf: () => page.path == "/local/ocean/ship/interview/"
            },

            {
                name: "what do you think",
                exec: ()=> startDialogue('++rotparasite'),
                showIf: () => page.path == "/local/beneath/parasite/"
            },

            {
                name: "what do you think",
                exec: ()=> startDialogue('++rotpit'),
                showIf: () => page.path == "/local/uncosm/pit/"
            },

            {// i think this is presently impossible
                name: "unity",
                class: "act-ozo",
                exec: ()=>{
                    cutscene(true)

                    chatter({actor: 'rotwatcher', text: 'locational information exchange recognized. physical visitation is required for any conclusion to be offered. the rotwatcher is observed to hold this destination as pending investigation.', readout: true, delay: 1000})

                    env.setTimeout(()=>{
                        play("talkchoir", 0.75)
                        vfx({type: 'beacon', state: true})
                    }, 400)

                    setTimeout(()=>{
                        vfx({type: 'beacon', state: false})
                        cutscene(false)
                    }, 3000)

                    change("unity_rot", true)
                    change("TEMP!!rotpref", "/local/ozo/")
                },
                
                showIf: () => check("mask", "unity")
            },
        ]
    })

    // travelling critters
    createEntity({ // car guy
        name: "s w   al kk",
        pathLimit: "/local/beneath/",
        type: "recollection thoughtform portrait-top portrait-cover",
        image: "/img/local/city/pedestrian5.gif",
        text: `::RESPONSIVE THOUGHTFORM
        ::EXPLICIT PURPOSE::'recollection'
        <span style="color: var(--obesk-color)" definition="ANALYSIS::'extremely degraded visual profile','low cohesion'">::HIGH INCOHERENCE DETECTED</span>`,
        actions: [
            {
                name: "greet",
                exec: ()=>{
                    chatter({
                        actor: 's w   al kk', 
                        text: [
                            "car poblemn",
                            " can oblemnt",
                            "ar droblenmn",
                            " radiator mufler hungry",
                            "alien ? know .,   fix car ?",
                            "car  s tuck"
                        ].sample({noRepeat: true}),
                        delay: 300
                    })
                },
                showIf: () => !check("mask", "joy")
            },
            
            {
                name: "unity",
                class: "act-ozo",
                showIf: [["mask", "unity"]],
                exec: ()=>{

                    chatter({actor: 's w   al kk', text: 'far. dr ive  fix my   car', readout: true, delay: 2000})

                    env.setTimeout(()=>{
                        play("talkchoir", 0.75)
                        vfx({type: 'beacon', state: true})
                    }, 400)

                    setTimeout(()=>{
                        vfx({type: 'beacon', state: false})
                    }, 2000)
                },
            },

            {
                name: "greet",
                exec: ()=>{
                    chatter({
                        actor: 's w   al kk', 
                        text: [
                            "insurance   lincecense",
                            "gous priceses",
                            "  t otp speed 49 7345 engine",
                            " radiat   or mufler hungry",
                            "red  green ylow blue light  speet up",
                            "car  so sgggoing",
                            "  m eting go ok",
                            "wrunc eetntenanceh",
                            "irector",
                            "autorized"
                        ].sample({noRepeat: true}),
                        delay: 300
                    })
                },
                showIf: ["mask", "joy"]
            },
        ]
    })

    createEntity({ // camera guys
        name: '×è.÷ùÏÏøø',
        type: "recollection thoughtform portrait-ripple portrait-cover",
        image: "/img/local/beneath/camportrait.gif",
        text: `::INCOMPLETE THOUGHTFORM
        ::SIGNATURE ILLEGIBLE`,
        pathLimit: "/local/beneath/",

        exmExec: ()=>{
            if(check("mask", "joy")) {
                if(!env.targetedEntity.text.includes("JOY_MASK") && env?.stage?.name != "abyss") {
                    env.targetedEntity.text = env.targetedEntity.text += `\n<span definition="NOTE::'referencing third-party context installation'::JOY_MASK">::INTERNAL CONTEXT</span>::<span class="bright-color" definition="ANALYSIS::'like a subtle fog in the thoughtspace';'slippery and difficult to perceive until entered';'may obscure nearby entities';'commonly accidental';'but i have seen it used intentionally in a few places'">'hidden via gradient obfuscation'</span>`
                }
            }
        },

        actions: [
            {
                name: "hello",
                exec: ()=> env.cameraGuySnap('abyss'),
                showIf: () => env.stage.name == 'abyss'
            },           
            {
                name: "unity",
                class: "act-ozo",
                exec: ()=> env.cameraGuySnap('nope'),
                showIf: () => { return env.stage.name == 'abyss' && check('mask', 'unity')}
            },
            {
                name: "what are you looking at",
                exec: ()=> env.cameraGuySnap('effigy'),
                showIf: () => env.stage.name == 'abyss_ship'
            },
            
            //e4a1
            {
                name: "hello",
                exec: ()=> env.cameraGuySnap('orbit'),
                showIf: () => page.path == '/local/orbit/'
            },

            {
                name: "hello",
                exec: ()=> env.cameraGuySnap('street'),
                showIf: () => env.stage.name == 'city_street'
            },

            {
                name: "hello",
                exec: ()=> env.cameraGuySnap('darkstreet'),
                showIf: () => env.stage.name == 'city_street3'
            },

            {
                name: "hello",
                exec: ()=> env.cameraGuySnap('banks'),
                showIf: () => env.stage.name == 'city_banks'
            },

            {
                name: "hello",
                exec: ()=> env.cameraGuySnap('banksflip'),
                showIf: () => env.stage.name == 'city_banks_flip'
            },

            {
                name: "hello",
                exec: ()=> env.cameraGuySnap('abysscity'),
                showIf: () => env.stage.name == 'abyss_city',
            },

            {
                name: "hello",
                exec: ()=> env.cameraGuySnap('ozo'),
                showIf: () => page.path == '/local/ozo/'
            },
        ],

        //flag correction
        onCreated: ()=>{
            if(check("beneath_abysspic") && !check("cam_abyss")) change("cam_abyss", true)
            if(check("beneath_nopic") && !check("cam_nope")) change("cam_nope", true)
            if(check("beneath_effigypic") && !check("cam_effigy")) change("cam_effigy", true)
        }
    })
}

//global entity special functions
env.cameraGuyThings = {
    //base
    abyss: '/img/local/beneath/bg/abyss.png',
    nope: '/img/local/beneath/bg/nothanks.png',
    effigy: () => !check("effigy_sipper") ? '/img/local/beneath/bg/EFFIGY.png' : '/img/local/beneath/bg/clear.png',

    //e4a1
    orbit: '/img/local/beneath/bg/outofreach.png',
    street: '/img/local/beneath/bg/domain.png',
    darkstreet: '/img/local/beneath/bg/quiet.png',

    banks: '/img/local/beneath/bg/breach.png',
    banksflip: '/img/local/beneath/bg/reflection.png',
    abysscity: '/img/local/beneath/bg/haze.png',
    ozo: '/img/local/beneath/bg/wastrels.png',
}

env.cameraGuySnap = (thing) => {
    cutscene(true); play('click1'); flash(true)

    const dl = env.cameraGuyThings[thing]
    const flag = `cam_${thing}`

    setTimeout(() => {
        flash(false); play("muiScanner", 0.75); cutscene(false)
        if(!dl) return

        change(flag, true)

        // kinda crazy how there's no direct "download this file" command in js huh
        const downloadLink = document.createElement('a')
        downloadLink.href = typeof dl === 'function' ? dl() : dl
        downloadLink.target = "_blank"
        downloadLink.download = ""
        downloadLink.setAttribute("data-no-swup", true)
        downloadLink.style.display = 'none'

        //trigger DL
        document.body.appendChild(downloadLink); downloadLink.click(); document.body.removeChild(downloadLink)
    }, 1000)
}

/***************************************************************************/
/***************************************************************************/
/***************************ESSENTIAL DIALOGUES*****************************/
/***************************************************************************/
/***************************************************************************/
env.dialogues[`++epselect`] = generateDialogueObject(`
start
    sys
        WARNING::'selecting any EP will delete current log progress'
        ADVISE::'export save prior to EP selection if valued'
        ADVISE::'confirm intention below'
    
    RESPONSES::self
        proceed, losing my current progress is fine<+>proceed
            HIDEREAD::
        nevermind, i want to keep my current progress<+>END

proceed
    sys
        USER REQUEST::'log selection'

    RESPONSES::sys
        EP0<+>END
            EXEC::cutscene(true);setTimeout(()=>deleteSave(), 1000)
            FAKEEND::(load EP0)
        EP1<+>END
            EXEC::mountSave(GlobalSaves.ep1start)
            FAKEEND::(load EP1)
        EP2<+>END
            EXEC::mountSave(GlobalSaves.ep2start)
            FAKEEND::(load EP2)
        EP3<+>END
            EXEC::mountSave(GlobalSaves.ep3start)
            FAKEEND::(load EP3)
        EP4<+>END
            EXEC::mountSave(GlobalSaves.ep4start)
            FAKEEND::(load EP4)
    
    RESPONSES::self
        nevermind, i want to keep my current progress<+>END
`)

env.dialogues["menu_hub"] = {
    start: {
        name: "start",
        body: [
            {
                actor: "sys",
                text: "USER REQUEST::'intention'"
            },
        ],

        responses: [
            {
                name: "self",
                replies: [
                    {
                        name: 'return to hub',
                        destination: 'EXEC::endDialogue()',
                        hideRead: true,
                        exec: ()=>{
                            cutscene(true)
                            corruRefresh('/hub/', 3000)
                            if(env.e3a2) env.e3a2.clearWarningListener()
                            setTimeout(()=>{
                                readoutAdd({message: `EXECUTING::'retrace';'localhost'`, name:"sys"})
                            }, 1000)
                        }
                    },
                    {
                        name: 'eject',
                        destination: 'EXEC::endDialogue()',
                        hideRead: true,
                        exec: ()=>{
                            cutscene(true)
                            corruRefresh('/', 3000)
                            if(env.e3a2) env.e3a2.clearWarningListener()
                            setTimeout(()=>{
                                readoutAdd({message: `EXECUTING::'eject'`, name:"sys"})
                            }, 1000)
                        }
                    },
                    {
                        name: 'refresh',
                        destination: 'EXEC::endDialogue()',
                        hideRead: true,
                        showIf: "PAGE!!embassy_day",
                        exec: ()=>{
                            cutscene(true)
                            corruRefresh(page.path, 3000)
                            if(env.e3a2) env.e3a2.clearWarningListener()
                            setTimeout(()=>{
                                readoutAdd({message: `EXECUTING::'refresh'`, name:"sys"})
                            }, 1000)
                        }
                    },
                    {
                        name: `nevermind`,
                        destination: 'END',
                        exec: ()=>{
                            endDialogue()
                            setTimeout(()=> readoutAdd({message: `NOTE::'aborted'`, name:"sys"}), 1000)
                        }
                    }
                ]
            }
        ]
    },
}

env.pageHasMothComment = function() {
    if(typeof page.mothComment == "function") {
        return processStringTranslation(page.mothComment())
    } else if(typeof page.mothComment == "string") {
        return processStringTranslation(page.mothComment)
    } else {
        if(env.currentDialogue.justChanged) return processStringTranslation("anything else?")
        return processStringTranslation("what's up buddy")
    }
}

env.pageHasMothChat = function() {
    if(typeof page.mothChat == "object") return true; else return false
}

env.dialogues["++moth"] = {
    end: mothHasUnreadCheck,
    start: {
        name: "start",
        body: [
            {
                actor: "moth",
                text: "what's up buddy",
                texec: ()=> {return env.pageHasMothComment()}
            },
        ],

        responses: [
            {
                name: "self",
                replies: [
                    {
                        name: ()=>{return processStringTranslation(page.mothChat.startName)},
                        destination: 'EXEC::changeDialogue(page.mothChat.getDest())',
                        showIf: [["EXEC::env.pageHasMothChat()"]],
                        unreadCheck: ()=> checkUnread({destination: "start", arbitrary: true}, page.mothChat.getDest()),
                        class: "changeread",
                    },
                    {
                        name: 'i have some questions',
                        destination: 'CHANGE::++mothglobal',
                        class: "changeread"
                    },
                    {
                        name: "what's our next move?",
                        destination: 'whatnext',
                        hideRead: true
                    },
                    {
                        name: 'i feel weird',
                        showIf: [["netstat|<", 0]],
                        destination: 'CHANGE::++mothfj'
                    },
                    {
                        name: `back to it`,
                        destination: 'END',
                        exec: mothHasUnreadCheck
                    }
                ]
            }
        ]
    },

    loop: {
        name: "loop",
        body: [],
        responses: [] // defined below, directly references above
    },

    whatnext: {
        name: "whatnext",
        body: [
            {
                actor: "moth",
                texec: ()=> {return env.dialogues.mthglobalresp.whatnext()}
            },
        ],

        responses: [
            {
                name: "self",
                replies: [
                    {
                        name: "got it",
                        destination: 'loop',
                        fakeEnd: "(back)"
                    }
                ]
            }
        ]
    }
}
env.dialogues["++moth"].loop.responses = env.dialogues["++moth"].start.responses

env.dialogues.mthglobalresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        who...<+>who
        what...<+>what
        why...<+>why
        what do you think of all this?<+>mothep1end
            SHOWIF::[["ep1_end"], ["ENV!!ep3", false]]
        thoughts on the collapse?<+>ep3thoughts
            SHOWIF::[["ENV!!ep3", true], ["ENV!!ep4", false]]
        thoughts on the collapse?<+>ep4thoughts
            SHOWIF::"ep4__entrancefinal"
        leverage acquired<+>leverage
            SHOWIF::[["leverageq", true], ["ozo__council-task", true], ["ozo__fairy_intro", true]]
            SHOWONCE::
        that's all<+>CHANGE::++moth
            FAKEEND::(back)
`)

//de-indent this prior to running
env.dialogues[`++mothglobal`] = generateDialogueObject(`
start
    self
        I have some questions

    moth
        let's hear em, i'll do my best
    
    RESPOBJ::mthglobalresp

loop
    RESPOBJ::mthglobalresp

who
    RESPONSES::self
        you<+>who_you
        akizetesche<+>who_akizetesche
            SHOWIF::"hub__funfriend-purposeq"
        gordon<+>who_gordon
            SHOWIF::[['citystreet__envoy-end']]
        director<+>who_director
            SHOWIF::[['citystreet__director-meeting']]
        velzie<+>who_velzie
            SHOWIF::[['dullvessel__fixed-how']]
        nevermind<+>loop
            FAKEEND::(back)

who_you
    self
        Who are you?
    
    moth
        lol
        ok but really do you have any questions?
    
    RESPONSES::self
        probably<+>loop
            FAKEEND::(back)

who_akizetesche
    self
        Who is Akizetesche?
    
    moth
        she's probably one of the better documented early obesk contacts
        the way the story goes is, she led a team investigating the thing that led the obesk here
        kept doing these interviews where she talked at length about it, they named it 'the call'
        and then they all went missing a few years after first contact
        spooky shit
        insane that this corrucyst managed to survive that long
    
    RESPONSES::self
        interesting<+>loop
            FAKEEND::(back)

who_gordon
    self
        Who is Gordon?
    
    moth
        good question
        not finding a solid match, but he's clearly an FBX officer
        it'd help if akizet's corrucyst actually remembered his face correctly
        i'll have to get back to you on this, maybe if we can snag a last name it'll be easier
    
    RESPONSES::self
        good luck<+>loop
            FAKEEND::(back)

who_director
    self
        who is director cassidy? what do you know about her?
    
    moth
        right, she was the very first nomination for the director's office
        don't know the official date off the top of my head, but,
        the FBX didn't form until a few years after the embassy was discovered, so it must have been around the mid '20s
        talk about a brutal time though
        first contact, the collapse, <em>and then</em> the comms breakdown?
        she probably had the highest highs and lowest lows out of any of them,
        and she was still in office for almost ten years, which is insane
        then, after that, uhh...
        not too sure where she ended up
        pretty sure she's still alive and well in the private sector?
    
    self
        is it not common knowledge?

    moth
        no way, not for her
        i mean, you understand the scope of everything that happened, right?
        if i had all that happen on my watch,
        then saw everything basically fall apart into what it is now,
        i'd want to just quietly disappear too

    self
        what do you make of the thoughtform for her?
        it seems very lucid

    moth
        yeah, jury's still out on whether that'll be helpful or a big problem

____SHOWIF::"bt__d0_cass"
    moth
        clearly it knows a lot more about velzie than anyone else
        gets around different places like it's nothing, too
        super incoherent and non-cohesive,
        but able to almost perfectly mimic the baseline coherence of a memory
        kinda worried about what it's up to, but...
        we'll have to wait and see
____END

    moth
        i did notice something interesting in that office, though
        on my end, the connectors around her were really hard to notice at first
        not sure how they appeared to you, 
        but they're very distinct from every other implementation i've seen so far
        looks like it's been making its own sneaky ways of getting around
        
    RESPONSES::self
        weird<+>loop
            FAKEEND::(back)

who_velzie
    self
        Who is Velzie?
    
    moth
        velzie is like roughly their word for 'god'
        there's more to it than that but i assume you're asking about <em>the</em> velzie
        like the one the pilot cyst was talking about
        i noticed that when it mentioned that name, it didn't have any context
        like, the word "velzie" was separated from its meaning for some reason
        not sure what's up with that...
        pretty sure it had an encounter with that face you've been seeing
        maybe a thoughtform got messed up by incoherence and thinks it's god
    
    RESPONSES::self
        weird<+>loop
            FAKEEND::(back)

what
    RESPONSES::self
        corru<+>what_corru
        corrucysts<+>what_corrucyst
        the call<+>what_thecall
            SHOWIF::[['interview1__firstchat-behonest']]
        smiling face<+>what_smile
            SHOWIF::[['hello__sentry-posthello']]
        corrucyst fuel<+>what_fuel
            SHOWIF::[['hub__funfriend-fuelthanks']]
        eye of velzie<+>what_eye
            SHOWIF::"exm|embassy|unkind eye"
        mindcores<+>what_mindcores
            SHOWIF::"embassy__d3_person_enable-end"
        veilk<+>what_veilk
            SHOWIF::"exm|embassy|veilk models"
        secri<+>what_secri
            SHOWIF::"embassy__d2_bozkocavik-end"
        masks<+>what_masks
            SHOWIF::"ozo__council-task"
        dull plane<+>what_dull
            SHOWIF::"ep4__contact"
        storm<+>what_storm
            SHOWIF::"exm|pit|the storm greets us"
        echo<+>what_echo
            SHOWIF::"bt__d0_ptau"
        ...if knowing all this puts us in danger?<+>what_fbxlist
            SHOWIF::[["ep1_end", true], ["ep4__h2h", false]]
        nevermind<+>loop
            FAKEEND::(back)

what_masks
    self
        what are masks
    
    moth
        that's new ground you're discovering buddy
        best i can tell from context is that they're like tools and weapons
        something these thoughtforms carved from akizet's memories somehow
        they don't have an actual physical presence, because otherwise you couldn't have received them
        also, they passed right through the connection and only to you
        and it's like my machines ignored them or couldn't see them at all
        this is probably some entire new field of science we just stumbled into lol
        thoughtform technology or something
        whatever it is, it's way beyond my scope

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

what_secri
    self
        what is a secri?

    moth
        cmon, you've never seen the <em>secri</em> films?
        true masterpieces of the 40s
        man, i hope the obesk never saw any of them, they must be so insulting
        if you're actually serious, they're one of the creatures i actually know a bit about
        they're basically the apex predator on obeski
        like pretty much half of all obeski fauna, they're a parasite
        or some kind of fungal infection... we don't really know for certain
        and they're microscopic, but once they infect one of the surface critters, or a larval obesk...
        well, we've only had verbal descriptions since the exchange initiative was never forthcoming with recreations,
        but apparently they can rapidly reshape the flesh of most critters, and hijack their brains to spread more
        nasty stuff

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

what_eye
    self
        what is the eye of velzie?

    moth
        it's a feature of the gas giant obeski is tidally locked to
        the obesk use its visibility for time
        some parts of obeski worship or despise it as the eye of god
        given how dark their world is,
        and they have this giant glowing eye-looking thing in the sky at all times,
        it's no wonder that they came to that conclusion
        although, we don't really know whether it's a storm, or something else
        because the obesk say that it glows during regular intervals
        of course, that could just be their star reflecting off of it...
        but without pictures or anything, we can really only guess

    RESPONSES::self
        i see<+>loop
            FAKEEND::(back)   

what_veilk
    self
        what are veilk?
    
    moth
        they basically cover the inhabitable surface of obeski
        kinda like how grass is all over earth i guess
        and... they can grow to the size of skyscrapers...
        they're apparently able to walk,
        uhh... they have a lot of legs...
        and when one dies, a whole ecosystem forms around its corpse
        which the obesk are a part of somehow
        ...
        sorry, i don't know that much about them honestly
        obeski ecology is not even close to my area of expertise
        i mostly study corrucystic stuff and obesk-human interactions
        a little culture here and there
        and don't get me wrong, the veilk are really important to them culturally,
        practically all their clothes are made out of veilk skin
        and their cave-cities rely on veilk-felling for food staples
        but we don't really have a great idea of how they actually work
        or even really how they actually look, outside of stylized sculptures

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)
        

what_mindcores
    self
        are all obesk actually these weird little spider things?

    moth
        no, just the qou
        the "larval" obesk go through some procedure that makes them into those
        we got a few descriptions of it before they pulled back
        but they're all really abstract, like...
        "climbing through their receptors into a mindcore", leaving an "empty vessel" to its "peaceful death"
        nothing scientific, but they always emphasized it not just being a copy
        then they build themselves bodies out of corru to drive around
        that's what those qou-bodies are

    RESPONSES::self
        oh ok<+>loop
            FAKEEND::(back)

what_corru
    self
        What is corru?
    
    moth
        interesting time to ask that, i don't blame you though
        most people start to really ask themselves that once they get a close look, even if they've read all the documentation on it
        beyond the "supercell superorganism" buzzword soup, what it really is in the big picture is still really unknown
        i've read pretty much every transcript of every obesk interview ever and they don't ever seem to mention its origin or how they got their symbiosis with it
        like, if the "larval" obesk really do look almost exactly like us, and then they shift into corrucystic bodies, where does that put us?
        idk you could go crazy thinking about this stuff long enough, no time for waxing philosophical right now though
    
    RESPONSES::self
        i see<+>loop
            FAKEEND::(back)

what_corrucyst
    self
        What are corrucysts?
    
    moth
        it's a pretty general term, "corrucyst" and "corrucystic" are catch-alls for most obesk technology
        because the organism tends to ball up and form a hard outer wall like the corrucyst you're connected to
        it's why corrucystic things are usually spherical, but that's not always the case
        like with how they use a similar process to form the bodies the qou obesk use
        if you mean what spherical corrucysts are, they tend to be storage or computational devices
    
    RESPONSES::self
        i see<+>loop
            FAKEEND::(back)

what_thecall
    self
        What is "the call"?
    
    moth
        it's a pretty important part of human-obesk history that gets overlooked a lot
        supposedly the reason they were able to find earth was because something was sending a signal their tech picked up
        they were trying to figure out what it was for a little while after first contact and were pretty verbal about it
        and then they just never talked about it again after akizet's team went missing
        ...and then all that other shit happened
        that really is sort of where it all went wrong
____SHOWIF::"ep4__entrancefinal"
        and at this point, it's starting to look like the tip of the iceberg lol
____SHOWIF::["ep4__entrancefinal", false]
        maybe this corrucyst will finally shed some light on what happened
____END
    
    RESPONSES::self
        i see<+>loop
            FAKEEND::(back)

what_smile
    self
        What is that smiling face that I keep seeing?
    
    moth
        i'm not seeing anything in the logs here, unless you mean the little assistant dude in the hub

    self
        I think it was what helped me in

    moth
        oh, so it looks like a smiling face to you?
        maybe my malware theory has some weight after all
        in short, i still have no idea what that rogue friend of ours is
        but i'm pretty sure it's calling itself 'velzie', going off what the pilotcyst said
            SHOWIF::[['dullvessel__fixed-start']]
    
    RESPONSES::self
        worrying<+>loop
            FAKEEND::(back)

what_fuel
    self
        What is corrucyst fuel?
    
    moth
        in interviews they always just said it's something they grow... 
        most theories are that it's some metallic-based fungus that corru can consume
        going off what funfriend said, it seems like they can use a bunch of different metals to create it
            SHOWIF::[["hub__funfriend-essentialmetalq"]]
        i guess it makes sense that they'd use metal to grow it, but i have no idea how that could work
            SHOWIF::[["hub__funfriend-essentialmetalq"]]
    
    RESPONSES::self
        worrying<+>loop
            FAKEEND::(back)

what_dull
    self
        what do you know about the dull plane?
    
    moth
        oh, dude, you are not ready for me to rant about the dull
        we'd be here all night
        it's so frustrating how little we really know about it
        but... if i condense down what we know for certain,
        and this is all like, stuff from interviews i've watched,
        there was an ekivik engineer, dullzkovik jut, uh, something,
        who discovered that there are at least two states of, like, reality
        what they call velzie's stage - this one - and what ended up being named the dullzkovik plane
        or just dull plane for short
        anyway, we don't know the specifics of how he came to discover this, but...
        hang on, i'm getting too into the history part, aren't i. i see that look you're giving me
        ok. to really, truly condense this,
        we actually know more about its history than any of its physical properties
        this was one of those things the obesk weren't able to effectively share with us before it all broke down
        or maybe they just didn't want to
        they did tell us that organic life can't go through it without being annihilated,
        but corru can apparently survive it without major issues, with a little preparation...
        huh... what else...
        there are lots of wild theories about what it actually is
        like a parallel universe, another "dimension" or something, but...
        imo, that all gets into unrealistic movie shit
        it's probably not that simple
        we just don't have the means to interact with it in any meaningful way to find out
        and the obesk aren't helping very much anymore
        the only thing we know for certain is that physicists are very angry about it
        so... i guess that's all of the useful insight i have for you here
        sorry dude
        anything else is either classified over my head,
        or waiting for us in this cyst
    
    RESPONSES::self
        all right<+>loop
            FAKEEND::(back)

what_storm
    self
        what do you think of the storm?

    moth
        oh i think plenty about it buddy
        you and i at least know that it was a converter for data in some sense,
        from the earlier talks we saw, 
        i was really under the impression it was just a tool
        as opposed to like, a thing that worked autonomously
        but given that akizet was the only obesk involved in that project...
        it makes sense that she'd have used an echo
        i mean, the obesk use echoes anywhere they can fit them
        setting one up to autonomously research and hybridize human/obesk tech is...
        well, my gut reaction is that it's a really bad idea lol
        but if it's an echo of akizet, and she really meant well for everyone,
        in a perfect world we would all be immortal and living in luxury by now

    self
        do you think it's still around?

    moth
        dude, i don't know...
        we <em>have</em> had some gigantic leaps since the collapse
        infrastructure stuff like the mindspike industry, 
        the pharma upheaval, all the medical implants, i mean...
        a lot is pretty hard to explain without obesk interference, despite them being so scarce
        but the air still sucks, water corps still exist, and rent still goes up
        don't even get me started on the <span definition="INTERNAL CONTEXT::'fully automated employment system';'utilizes extensive monitoring to verify completion of arbitrary contract';'payment in proprietary pseudocurrency upon completion';'automated legal recourse if failed'">oracle economy</span>
        it pisses me off thinking about how good we could have had it if this shit didn't happen
        if the storm is still around, it sure hasn't scaled up enough to save humanity
    
    RESPONSES::self
        all right<+>loop
            FAKEEND::(back)


what_echo
    self
        what do you know about echoes?
    
    moth
        this is one of those things i could talk too long about buddy
        but what you saw akizet say is pretty much the whole deal
        absolutely fucked up ethical concerns aside,
        they're essentially the cheapest and easiest way to make an ai
        copy yourself, cut out what you don't need to fit it into a small cyst,
        and you have a smart little guy ready to do whatever you need

    self
        the obesk didn't see any issues with this?

    moth
        oh, sure they did
        but it was just like a fact of life to them
        according to some interviews and articles i've read,
        they get taught to internalize some wild stuff
        "some version of you is probably going to be an echo someday, 
        so just brace for that ahead of time,
        and it probably will be kind of nice anyway"
        it's total cultural cope
        but if we got handed that same potential for infinite automation,
        in what essentially would be, like, 
        a mixture of our bronze age and industrial revolution,
        we'd probably do the same thing

    self
        if thoughtforms can wake up and act like the ones in this cyst
        do you know what they do with echoes that do the same thing?
    
    moth
        yeah actually! this was a popular subject pre-collapse
        once the way echoes work broke the news, it was all over the place
        the opinions i read from various obesk was a little varied,
        so i don't think they have one singular stance on the matter
        from "we'd fix them" to "we'd adopt them as a child"
        for the most part, despite what the obesk do, 
        they don't really seem to see echoes as lesser or anything
        they're still treated with respect and reverence
        probably because they all know there's some portion of a real person in there 
        so i doubt they'd, like, just kill one
        the whole deal is still a big philosophical and moral debate topic
        we've been getting closer to using that paradigm every day
        echoes are still leagues ahead of what the best AI can do right now
        the only thing stopping mindsci from trying it is the inevitable public backlash
    
    RESPONSES::self
        i see<+>loop
            FAKEEND::(back)

what_fbxlist
    self
        What if knowing all this puts us in danger?
    
    moth
        i wouldn't worry about that
        the FBX isn't like the CIA or FBI
        worst thing that happens is that we have to sign NDAs and other legal stuff
        judging by what we've seen, that's pretty much an inevitability
        but they aren't going to disappear us, if that's what you mean
    
    RESPONSES::self
        all right<+>loop
            FAKEEND::(back)

why
    RESPONSES::self
        ...can i render incoherent areas sometimes<+>why_beneath
            SHOWIF::"beneath"
        ...is no one else involved yet<+>why_involved
            SHOWIF::"ep1_fed"
        ...did you call me<+>why_callme
        ...am i able to connect to this<+>why_connect
            SHOWIF::[["EXEC::page.dialoguePrefix != \`fbx\`"]]
        ...can i understand these thoughts<+>why_thoughts
            SHOWIF::[["EXEC::page.dialoguePrefix != \`fbx\`"]]
        ...do i hear music<+>why_music
            SHOWIF::[["EXEC::page.dialoguePrefix != \`fbx\`"]]
        nevermind<+>loop
            FAKEEND::(back)

why_beneath
    self
        why can i render incoherent areas sometimes
        like the one you thought was really strange
    
    moth
        well i can't be totally certain, but you remember my theory?
        you're running <span definition="INTERNAL CONTEXT::'first release mindspike operating system'">tonga</span>, and it puts a lot of processing on your brain
        the system has checks to make sure you don't render incoherent stuff
        cause it could hurt you or cause <span definition="INTERNAL CONTEXT::'altered time perception';'sign of imminent stroke'">chronos misalignment</span> or something
        not that i think <em>this</em> would, of course, this is different from human incoherence
        anyway--it relies on your brain sending a signal back being like "something is fucked up" for it to block things a lot of the time
        but since you entered whatever this is <em>from</em> an already kind of incoherent place,
        your brain was already kinda warmed up to the incoherence
        like the old frog in the boiling pot analogy, right?
        ...
        to be clear, though, your brain is not in a "boiling pot"
        pretty sure everything happening in those incoherent areas is totally fine for you
    
    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

why_involved
    self
        Why are we the only ones who still know about this?

    moth
        oh
        umm...
        well, i haven't put in the report yet
        look, if we get to the bottom of this whole thing ourselves, do you know how huge that'll be?
        if i told anyone what we were up to in here, they'd snatch it out of our hands
        ...then give it to some higher-up researcher, who would take all the credit
        this could be our "make it" moment, dude
    
    self
        Aren't there cameras watching us? What about the data?

    moth
        not in the basement
        this is an analog-only zone, or at least it was when it was busier years ago
        it's a little more lax now, but they never really changed the tech in the walls
        especially since every find like this usually ends up being a dud
        so... they don't get the data til we send it up
        you and me are the only ones in on this for now, buddy
    
    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

why_callme
    self
        Why did you call me for this?
    
    moth
        what, are you that unhappy that you get to be the first person to ever connect to a personal corrucyst?
        just kidding, a lot of our mindspike contractors have been out of service recently due to that big disaster update
        god i can't even imagine what mindsci was thinking lmao, traffic has been so bad
        you're the only psycho i know who never updates stuff, so i figured you'd still be up for it
    
    RESPONSES::self
        thanks<+>loop
            FAKEEND::(back)

why_connect
    self
        Why am I able to connect to this so seamlessly?
    
    moth
        well in case you forgot, you definitely installed that fbx patch i gave you
        mindspikes usually can't just do this
        apparently corrucysts give off and receive almost identical signals to nervos slots
        it's a pretty incredible coincidence, honestly a miracle that it works at all
        the science of it all goes over my head, you'd have to ask someone in the dev dept
    
    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

why_thoughts
    self
        Why can I understand these obesk thoughts?
    
    moth
        well you're dealing with raw thought
        the corrucyst isn't literally thinking the words you're receiving from it
        your brain is just interpreting the concepts that it's outputting in a way you understand
    
    RESPONSES::self
        cool<+>loop
            FAKEEND::(back)

why_music
    self
        Why do I hear music sometimes?
    
    moth
        you're hearing music? that's wild, but it makes sense
        some of the mindspike contractors i've worked with say similar stuff when they try to connect to corrucystic devices
        my theory is that it's inherited context from the cyst, vague feelings that can't be translated into words
        sometimes people hear voices, or just kinda "know" how to feel
        your brain is just reading it in a way that makes sense to you
        that's my best idea
        anyway, i'm not hearing anything, i just see the readout on my end
        is it good?
    
    RESPONSES::self
        it's ok<+>loop
            FAKEEND::(back)

mothep1end
    self
        What do you think of all this?
        The embassy, Gordon's involvement...
    
    moth
        i think we landed ourselves a security level increase
        never heard anything about internal strife with the obesk before this
        they've always had this image of total harmony, despite their homeworld
        and you know, with the call...
        i think it's only a few years until the call is "complete" if all this is true
        or... maybe even less?
        idk just some quick headmath
        if we can get to the bottom of this soon and bring it all to the higher ups...
        could you even imagine the kind of renown we'd both get?
    
    RESPONSES::self
        aren't you afraid?<+>mothep1afraid
        ok<+>loop
            FAKEEND::(back)

mothep1afraid
    self
        Aren't you afraid of what will happen when the call is complete?
        What if it's something really bad?

    moth
        yeah, it's spooky, but...
        we've both lived through too many "world-ending" crises for this to be the "real" one
        besides, what if they can't even decode the call?
        either cause it's too big, or because they didn't get the very start of it...
        like, what if they need the whole thing?
        and hey, what if whatever's down there in the ocean is just as friendly as the rest of them?
        basically... whatever happens, we'll deal with it
    
    RESPONSES::self
        if you say so<+>loop
            FAKEEND::(back)

ep3thoughts
    self
        what do you think of the collapse?
        you said you had some thoughts?
    
    moth
        oh, yeah!
        so, i always thought it was a tragedy
        especially since it was the cap on the golden age of human and obesk relations
        like, truly golden age... but man, looking back at the news from those days makes me so sad
        videos, news, everything, everyone felt like everything was going to change
        and, i mean, things did change, but, i'm talking space age change
        apparently everyone really thought we'd be exploring the stars with the obesk
        like, they'd uplift us, or whatever...
        all right, i'm off topic and i haven't even gotten to the topic yet
        basically:
        when the collapse started happening, people reported some truly strange events with obesk machines
        golems started acting erratically, but never actually hurt anyone
        like, i was watching this video of some annoying vlogger who was trying to interview one near a polygonation spire
        pretty sure it was the one close to new zealand actually
        but right in the middle of him harassing this golem, its face flickers and it nearly falls over
        then, it just starts floating past him, right into the ocean, and disappears beneath the surface
        so the vlogger turns the camera back on his face and he's doing that surprised thumbnail thing they used to do back then
        and in the background, you can see other golems doing it too, 
        just before the spire starts collapsing and everyone has to run
        spooky shit, man... even golems further inland apparently started going for the coast too
        oh, and--there was this article i found, there was this one engineer qou that had an "accident" with a golem
        it didn't say their name, but there was a picture of the aftermath
        they totally minced this golem they were working with, then apologized to everyone and ran off
        it's pretty clear that whatever seized all of their tech had literally zero intent to harm a single human
        so what the hell are these golems attacking the embassy for?
        ...
        all right, i know i'm rambling, but one more thing
        no matter where i looked, even using those new net filter tools,
        after the collapse news cycle settled
        there was not a single mention of akizet or her team anywhere - no photos, videos, nothing
        i mean, sure, a little historical paper here and there, but... well
        i'm a little worried we may not have a whole lot of time left with akizet's memories if this is anything to go by
    
    RESPONSES::self
        ...<+>loop
            FAKEEND::(back)

ep4thoughts
    self
        so what do you think of the collapse
        now that we've seen it all
    
    moth
        i knew they weren't going to just, stop it
        but i had no idea it would get that fucked up
        there were things happening in there that i'm still trying to make sense of
        vekoa choosing to kill qou, when she's from a world where intraspecies murder basically doesn't happen
        not just using her golems, but making monsters with the fucking ceremony thing??
        and could you imagine what would have happened?
        like, if vekoa actually managed to make a dull contrivance?
        assuming it was a temporary contrivance, not like the big one in space,
        the whole embassy, the whole island, it would have just blipped away somewhere
        and nobody would have any idea what happened...
        so they didn't stop the collapse,
        and sure, tozik majorly polluted up the ocean around it,
        but somehow, i think in another world, if they failed-failed,
        things would be much worse
    
    self
        maybe
        what about the meteorite?
        FBX involvement?

    moth
        the meteorite, i don't know, that's...
        that's something on a scale that's really hard for me to grasp
        it makes sense, really
        i know this sounds sick but i'm almost not surprised at this point
        it's the only start to an explanation for the call that makes any sense, right?
        where it comes from is some other shit we'll have to figure out
        still, you'd think we would have found it by now, 
        even before the obesk showed up...
        maybe knowing it's there will have a larger impact when i'm trying to fall asleep tonight
        but you know what really freaks me out?
        the FBX involvement
        cause we know that akizet and her team disappeared completely after this
        and now we know for sure that the FBX probably had a hand in sparking the collapse
        dude, if this ever got public, the media would crucify us
        and knowing all that, with how long it's been
        we've totally fallen into <span definition="INTERNAL CONTEXT::'special access program';'sensitive compartmentalized information';'highest classification level'">SAP</span> territory here
        i'm talking like men in black who don't legally exist rolling up to your apartment type of shit
        i know i said this wouldn't happen but i really wasn't expecting it to get this bad
            SHOWIF::"++mothglobal-what_fbxlist"

    self
        i'm just a contractor
    
    moth
        yeah, and now you and i both know some of the most dangerous obesk history, ever
        this isn't the kind of thing where they'd be happy with just a regular NDA 
        even thinking about what this is going to turn into is making me kinda nauseous
        but... it's not like we can back out now
        and frankly, i don't want to
        because as scary as it is...
        the potential upside here, for us, is crazy
        just be careful, all right? i really mean that
        if this isn't handled right, you don't want to know what happens
    
    RESPONSES::self
        got it<+>loop
            FAKEEND::(back)

leverage
    self
        leverage acquired
            EXEC::change("leverage", true)
    
    moth
        huh? what do you mean?
    
    self
        these ozo mask things
        they're not just in the cyst
        i feel them in my mind now
    
    moth
        ok, well, that's not good, i think
        but... 
        no, maybe it is, for our needs
        i get what you're thinking, actually...
        you know how much comes through here without any results?
        how much just gets hazard binned, tossed into a corrucystic waste storage plant?
        if your mask things work on <em>other</em> corrucysts...
        like, you can get into things that no one else can,
        that could be it
        and we don't need to mention that it came from this cyst, either
        never mention your mask shit to anyone. i'll scrub it from my report too
        let's do a blood oath right here dude. i have a pocket knife
    
    self
        ok
    
    moth
        ok??
        dude, i'm kidding
        that would never get past the entry detectors
        anyway, i guess the only thing to do now is wait again
        either till funfriend repairs something, or those other pieces come in...
        so, just chill for now, all right?

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)
`)

env.dialogues[`++mothfj`] = generateDialogueObject(`
start
    self
        i feel weird
        is something wrong

    moth
        what? weird how?
        can you elaborate?
    
    self
        not sure how to
        it's in the back of my head

    moth
        well, maybe it was something you ate dude idk
        i doubt you got the "contact affliction" if that's what you're worried about
            SHOWIF::'ep4__contact'
        that would've shown up sooner, based on what we saw
            SHOWIF::'ep4__contact'
        looking at your os stats, the GAD has been in the negative
        i know other mindspike ops have had issues with corrucysts when that's the case

____SHOWIF::['mask', 'hunger']
        actually, weirdly, it's been in the negative since you activated that hunger mask
        not seeing that on the global measurement though, it's just affecting your device
        try deactivating it or something
____END
    
    RESPONSES::self
        what is GAD<+>gad
        ok<+>END

gad
    self
        what is that
        GAD

    moth
        what? you don't know?
        the GAD value dude
        global ambient dissonance
        it's literally in your system menu
        in the top right by default i think
        you've really never heard about it?

    self
        maybe mentioned a few times
        it's never been an issue

    moth
        well i guess it doesn't really affect that much usually
        i just work in a weird field where it does lol
        fortunately for you, i know the story!
        so, back when mindspikes were in development and first being tested,
        they started noticing these occasional rendering and recording bugs
        like they'd run things that should always output one thing, got tiny deviations instead
        mindsci could NOT figure out wtf was going on
        so someone set up this tiny component, something fjortoft, forgot their first name
        the little fjortoft box runs a constant and predictable signal through an input into the OS, then compares the output
        basic troubleshooting, right?
        turns out - the signal would come back changed
        not just that, but it was the same change on every mindspike if you tested multiple at the same time
        despite not being connected at all
        like... we're talking the same on different sides of the world
        when the value came back way weaker or way stronger, 
        the memory deviations were more severe
        pretty crazy, right? they never did figure out what was causing it
        so there's now just this little box in every mindspike to measure the GAD value
        some people online think this is evidence of the noosphere...
        but the popular theories are that it's something with earth's magnetic field
        also read once that it could be electromagnetic interference from the dull contrivance but idk about that one

    self
        what does that have to do with corrucysts

    moth
        no clue tbh
        i just know that when the value's in the negative,
        people report headaches and sometimes rendering errors
        but don't worry too much, pretty sure it doesn't cause any damage
    
    RESPONSES::self
        ok<+>END
`)

env.dialogues[`++mothbeneath`] = generateDialogueObject(`
start
    sourceless
        beyond your connection, moth's shoes scrape against the concrete in panic
            EXEC::change("beneath", true)

    moth
        oh shit
        you all right? what are you doing in there?

____SHOWIF::"EXEC::env.pagePath == \`/local/beneath/parasite/\`"
    self
        fine
        i just entered the parasite board somehow

____SHOWIF::"EXEC::env.pagePath != \`/local/beneath/parasite/\` && env.pagePath != \`/local/ocean/ship/interview/\`"
    self
        fine
        i just entered a thoughtspace through a weird gate

____SHOWIF::"EXEC::env.pagePath == \`/local/ocean/ship/interview/\`"
    self
        fine
        i just tried to render the interview again
____END

    moth
        wtf
        that's all?
        ok, i don't know how this is working
        maybe it's something to do with those "mask" things
            SHOWIF::['mask', 'hunger']
        but you actually aren't inside any one thoughtspace right now
        my readout is fucked, it looks like it's reading in multiple thoughtspaces
        you're still rendering something?

    self
        yes
        can you still see the output
    
    moth
        well kinda, but it's surrounded with error spam
        mindspikes would usually eject with this amount of incoherence
        ...but lucky you, you're running <span definition="INTERNAL CONTEXT::'first release mindspike operating system'">tonga</span>, right?
        i always forget if that was the third one or the first one
    
    self
        first one
    
    moth
        ok, right, i know what this could be then
        you remember the <span definition="INTERNAL CONTEXT::'early mindspike scandal';'hard removing memory sources mid-render to induce hallucination';'first cases of chronos misalignment'">memory pulling</span> stuff?
        tonga offloads most processing to your brain
        and the system won't let you render incoherent stuff outright,
        but since you entered whatever this is <em>from</em> an already kind of incoherent place,
        your brain was already kinda warmed up to the incoherence
        the difference wasn't big enough for it to run another check
        so i think you're like, getting signals from bits of thoughtforms floating around
        probably won't find a lot here
        but it's worth a look anyway
        so carry on, i'll just try and filter stuff on my end
    
    RESPONSES::self
        ok<+>END
`)

//scars, formerly tethers, formerly facets, formerly chuck's
env.dialogues[`++scar`] = generateDialogueObject(`
early
    sourceless
        looking upon the flower is strangely dizzying.
            EXEC::vfx({type: "flowerwarp", state: "yucky"});vfx({type: "darkflash", state: true});setTimeout(()=>body.classList.add('cull-stage'), 600)
        your attention passes into it, through it, beyond the thoughtspace.
        it is a hole.
        a kaleidoscopic, nonsensical weave of paths is laid against your mind's eye.
        they twist around each other in ways you aren't able to process.
        you try, but it only succeeds in making you nauseous.
    
    RESPONSES::self
        look away<+>END
            EXEC::vfx({type: "darkflash", state: false});setTimeout(()=>body.classList.remove('cull-stage'), 600)


start
    sourceless
____SHOWIF::["TEMP!!scartalk", false]
        looking upon the flower is strangely dizzying.
            EXEC::vfx({type: "flowerwarp", state: true});setTimeout(()=>body.classList.add('fade-stage'), 600)
        the physical presence it holds in the render is an illusion of the mask,
        for your attention passes through it, into it, beyond the thoughtspace.
        it is a hole.
____END
        a kaleidoscopic, nonsensical weave of paths is laid against your mind's eye.
            EXEC::vfx({type: "flowerwarp", state: true});setTimeout(()=>body.classList.add('fade-stage'), 600)
        they twist around each other in ways you aren't able to process.
        but some points feel familiar. you can reach towards them.
            EXEC::change("TEMP!!scartalk", true)
    
    RESPONSES::self
        ozo<+>END
            EXEC::change("TEMP!!from", "tether");moveTo("/local/ozo/")
            FAKEEND::(travel)
        auth<+>END
            EXEC::moveTo("/hello/")
            FAKEEND::(travel)
            SHOWIF::"joy#hello"
        dull vessel<+>END
            EXEC::change("TEMP!!from", "tether");moveTo("/local/dullvessel/")
            FAKEEND::(travel)
            SHOWIF::"joy#dullvessel_quarters"
        city office<+>END
            EXEC::change("TEMP!!from", "tether");moveTo("/local/city/street/")
            FAKEEND::(travel)
            SHOWIF::"joy#office_hall"
        clemens romanus<+>END
            EXEC::change("TEMP!!from", "tether");moveTo("/local/ocean/ship/elsewhere/")
            FAKEEND::(travel)
            SHOWIF::"joy#hullf"
        lab<+>lab
            FAKEEND::(select area)
            SHOWIF::"joy#pit"
        look away<+>END

lab
    sourceless
        you focus upon the broken thoughtscape of the FBX laboratory.
        the path diverges in directions you feel you shouldn't be able to see.
        there is a sense of chronological order.

    RESPONSES::self
        beginning<+>END
            EXEC::change("TEMP!!from", "tether_base");moveTo("/local/uncosm/pit/")
            FAKEEND::(first region)
            NOTE::technically this is being used as a 'to' but don't think about it too hard
        hope<+>END
            EXEC::change("TEMP!!from", "tether_outer");moveTo("/local/uncosm/pit/")
            FAKEEND::(second region)
        growth<+>END
            EXEC::change("TEMP!!from", "tether_melting");moveTo("/local/uncosm/pit/")
            FAKEEND::(third region)
        overgrowth<+>END
            EXEC::change("TEMP!!from", "tether_halls");moveTo("/local/uncosm/pit/")
            FAKEEND::(fourth region)

        nevermind<+>END

END::vfx({type: "flowerwarp", state: false});body.classList.remove('fade-stage')
`)

//buddystuff
env.dialogues[`++fairytravel`] = generateDialogueObject(`
start
    self
        hello

____SHOWIF::[["ENV!!pagePath", "/local/uncosm/"], ["PAGE!!fairytalk", false]]
    fairy
        interloper! come to join me in a hunt?
        hehehe

____SHOWIF::[["ENV!!pagePath", "/local/city/"], ["PAGE!!fairytalk", false]]
        shh!
        not too loud...
        the tyrant could be near!
        but hello, hello!!!!!!

____SHOWIF::[["ENV!!pagePath", "/local/orbit/"], ["PAGE!!fairytalk", false]]
        interloper, interloper!
        i thought i felt you near!
        just look at all this wasted space...
        what is the tyrant even doing?! ahahaha

____SHOWIF::[["ENV!!pagePath", "/local/ocean/ship/interview/"], ["PAGE!!fairytalk", false]]
        ohh, interloper, interloper!
        better not stay still for too long!
        i think they want to bite you!
        maybe i will join in? hehehe!

____SHOWIF::[["ENV!!pagePath", "/local/uncosm/pit/"], ["PAGE!!fairytalk", false]]
        interloper!!
        what a lush thoughtscape, would you not agree?!
        quite the cultivation that akizet got up to!!
        
____SHOWIF::["PAGE!!fairytalk", true]
        what is it now?
____END
    
    RESPONSES::self
        what are you doing here?<+>uncosm
            SHOWIF::["ENV!!pagePath", "/local/uncosm/"]
        what are you doing here?<+>city
            SHOWIF::["ENV!!pagePath", "/local/city/"]
        what are you doing here?<+>orbit
            SHOWIF::["ENV!!pagePath", "/local/orbit/"]
        what are you doing here?<+>maze
            SHOWIF::["ENV!!pagePath", "/local/ocean/ship/interview/"]
        what are you doing here?<+>pit
            SHOWIF::["ENV!!pagePath", "/local/uncosm/pit/"]
        bye<+>END

uncosm
    self
        what are you doing here?

    fairy
        preparing to dive, of course!!
        we may have no shortage of resources thanks to your work, interloper,
        but i would go crazyyy if i had to sit in the ozo forever!
        so, the hunt continues! only now, it is for sport!
        no one will weep for the mindless beasts in the dark
        and what a vantage point--i never know what i will find from here!!
        how strange it is that such a large gap to the uncosm goes unmended...
        not that i mind! the longer it remains, the better! ahahaha

    RESPONSES::self
        ok bye<+>END

city
    self
        what are you doing here?

    fairy
        taking a peek around while the tyrant's constructs are absent!
        not that there is anything new here... boring
        
    self
        is it safe for you?
        doesn't incoherence alert them or something?

    fairy
        oh, it does?! oh no!! oh, i must go now!!
        ahaha, just kidding!
        there is much i can do to blend in, interloper!
        surely you recall when we first met?
        the shape of a 'proxyfriend' is all too simple, and coheres to any space...
        but i need not camouflage myself to you!
        anyway...
        do not worry!! i will not eat anything here!
        i know how you love your rote re-enactments of akizet's blunders
        so, non-vital, uncosm only hunting for me! 
        velzie's wrath! hehehe

    self
        thanks
    
    RESPONSES::self
        ok bye<+>END

orbit
    self
        what are you doing here?
    
    fairy
        trying to see if there is ANYTHING fun here...
        there used to be a lot!
        i cannot quite remember what it was, but...
        i can definitely recall that this place is a sad shell of its past!
        although...
        hehehe... i might be to blame!
        i think i chewed this place up pretty badly!!
        before your time, of course
    
    RESPONSES::self
        ok bye<+>END

maze
    self
        what are you doing here?
    
    fairy
        what does it look like?
        hunting for prey!!
        not these lumbering things, though
        too stupid... not even fun to toss around!
        i can hardly imagine what damaged them so badly--scary!
        ohh... if i could find what did it...
        yees, that would be a worthy hunt!
    
    self
        i wouldn't recommend it
    
    fairy
        that is because you are a coward! haha!
        now, watch out, they know you are here!
        you might not be physical, not like me, but...
        they will still be more than happy to try pouring their teeth into your mind!
    
    RESPONSES::self
        ok bye<+>END

pit
    self
        what are you doing here?
    
    fairy
        silly interloper!
        the hunt!!
        how could i resist such a fruitful garden?!
        so much variety here--so many things sheltered for so long!
        surely you have noticed their careful entrapment...
        that akizet was using them like tamed beasts! so clever!
        have you seen those ones that pretend to be cousins at first?!
        funny, but they hardly put up a fight...
        it is those ones that spread out over the space and wait for disturbance...
        yeess, such tough shells! such cunning!
        i will crack one of them soon, and then--
        oh, i suppose we cannot share...
        more for me! ahahaha!!
    
    RESPONSES::self
        ok bye<+>END

END::change("PAGE!!fairytalk", true)
`)

env.dialogues["++rotmove"] = generateDialogueObject(`
start
    self
        can you tell me about something else?
    
    sourceless
        you feel its curiosity bleed into your mind.

    rotwatcher
        the audience is observed to make requests to know more.
        this request can be fulfilled, though it requires that the subjected rotwatcher relocate.
        when the audience accepts this condition, the rotwatcher is observed to fulfill the request.
    
    RESPONSES::self
        sure<+>END
            EXEC::env.buddy_globalRotwatcher.reroll()
        nevermind<+>END

END::revertBgm()
`)

//please forgive how ugly this is
//i'll change it eventually
//NOTE FROM DEV LIKE 9 MONTHS LATER: no i won't lol fuck you
//NOTE FROM DEV LIKE 11 MONTHS LATER: this is actually kinda ok for what it needs to do, idk if u guys get a better idea let me know
env.dialogues.mthglobalresp.whatnext = ()=>{
    if(!check('interview1__firstchat-behonest')) { /* before velziebreak */
             if(check('visited_localcitystreet') && check('visited_localoceanshipinterview') && check('visited_localdullvessel'))           return "it seems like the interview area is preserving memory stream progress, it isn't resetting completely. maybe run it through to its end and see if any neural paths open up in there"
        else if(check('visited_localcitystreet') && check('visited_localoceanship') && check('visited_localdullvessel'))                    return "that ship area seemed pretty empty for the amount of data your spike pulled, check it again"
        else if(check('visited_localcitystreet') && check('visited_localocean') && check('visited_localdullvessel'))                        return "i'm seeing a lot of data in the ocean area for what we saw, did you check everything there?"
        else if(check('visited_localcitystreet') && check('visited_localorbit') && !check('visited_localdullvessel'))                       return "i'm seeing what could be another place in the orbit thoughtspace, try and track that down"
        else if(check('visited_localcitystreet') && !check('visited_localorbit'))                                                           return "think there's a pathway to another thoughtspace you missed, i see something in the non-spatial city area but i couldn't tell you exactly where. seems like it's moving, probably floating around somewhere"
        else if(!check('visited_localcitystreet') && check('visited_localorbit'))                                                           return "pretty sure there's more to the corrucyst in the city area, i'm seeing enough data volume to where it doesn't seem like we saw all of it"
        else /* scroll to the right if you don't see anything */                                                                            return "what are you asking me for? you just connected, do your thing dude. don't forget, thoughtforms might extend past your field of perception - think of it like 'scrolling'"
    } else if(!check('ep1_showmaterials')) { /* post velziebreak, pre ep1 */
             if(check('ep0_epilogue', 'done'))                                                                                              return "now we just wait for our container-opening tools to arrive. you could take a break if you want to, i'll let you know when i've got the stuff"
        else if(check('ep0_epilogue', 'started') && check('hub__funfriend-fuelthanks') && check('dullvessel_container_examined'))           return "it seems like we could use the stuff in the dendritic container to keep the cyst alive, but i have no idea how we could open it without destroying it. check with funfriend and see if it's got any ideas"
        else if(check('ep0_epilogue', 'started') && check('hub__funfriend-fuelthanks'))                                                     return "well, now we just kill time until my copper tubing order gets here. don't worry, I'll let you know as soon as it's in"
        else if(check('ep0_epilogue', 'started') && check('dullvessel_container_examined'))                                                 return "so that container has 'processed metals'... damn, i was really hoping that'd be our lead. try talking to that funfriend thing in the hub to see if it has any ideas"
        else if(check('ep0_epilogue', 'started') && !check('dullvessel_container_examined'))                                                return "we need to figure out a way to keep this thing alive. maybe try talking to that funfriend thing in the hub to see if it has any ideas"
        else if(check('depths_depth') && !check('ep0_epilogue'))                                                                            return "there's some really strange activity in that depths thoughtspace, like it's constantly being changed. your mindspike isn't alerting you to it because it's happening like a thousand times a second. look for anything at all in there"
        else if(!check('depths_depth') && check('dullvessel_dive'))                                                                         return "i saw some activity when you told the vessel to 'dive', something is definitely changing in the ocean. try and find what it is"
        else if(check('dullvessel_position', 'ocean'))                                                                                      return "well there has to be a reason the dull vessel can move between space and the ocean. there's no way the rogue entity in here would just make a random change like that"
        else if(check('dullvessel_position', 'orbit') && check('dullvessel__fixed-hello'))                                                  return "seems like our friend fixed up the pilot cyst... and it offered to move the ship somewhere. why not give that a shot?"
        else if(check('dullvessel__pilot-end'))                                                                                             return "check the pilot cyst on the ship, i remember there was some garbled data there before"
        else                                                                                                                                return "well your spike reported activity in the dull vessel thoughtform, why not check that out? our friend seems to have changed something there"
    } else if(!check('fbx__ep2intro-end')) { //ep 1, after materials have been shown to the user for the first time
        //special check for if someone's looking for hints in the embassy days
        if(check("PAGE!!embassy_day"))                                                                                                      return "if you're talking about this thoughtform, try interacting with akizet--you'll need to be zoomed out"
        if(check('hub__funfriend-ep1comms'))                                                                                                return "seems like we just have to wait for more repairs from funfriend. take a break i guess"
        else if(check('ep1_end'))                                                                                                           return "definitely talk to funfriend about repairing communications, even if velzie wasn't threatening us it'd still be my first choice"
        else if(check('embassy_d2_complete'))                                                                                               return "i'm reading that there's been some increase in data to the city street area... definitely check that out"
        else if(check('embassy_d1_complete'))                                                                                               return "there's still more to see at the embassy from what i can see on my end"
        else if(check('hub__funfriend-ep1fed'))                                                                                             return "head to the embassy, funfriend said it fixed some of it up for us"
        else if(check('ep1_fed'))                                                                                                           return "let's check in with funfriend, see what it thinks of the job we did"
        else                                                                                                                                return "still gotta feed the cyst, up to you when you want to go ahead with it but i'd do it now"
    } else if(!check('fbx__ep3intro')) { //ep 2, has done sitdown intro
        if(check("embassy__d3_movefriend_finish-end"))                                                                                      return "nothing for now, just gotta wait for funfriend <span definition=\"NOTE::'advance log'\">to finish more of the memory</span>"
        else if(check("embassy__d3_start-end"))                                                                                             return "just keep working your way through the collapse memory, we've got more to see"
        else if(check("hub__funfriend-mothframe2"))                                                                                         return "looks like we're all set with the framing device, go check out the collapse memory again"
        else if(check("embassy__mothframe-end"))                                                                                            return "gotta talk to funfriend about installing my framing device"
        else if(check("hub__funfriend-ep2start"))                                                                                           return "let's go check out the embassy, funfriend said it fixed some stuff in there up"
        else                                                                                                                                return "we gotta see what's new! talk to funfriend, it'll probably tell you what's up"
    } else if(!check("fbx__ep4intro")) { //ep3!
        if(check("gol__bossclear"))                                                                                                         return "we're on the wait again. can't do anything till funfriend fixes <span definition=\"NOTE::'advance log'\">more of the memory</span>"
        if(page.name == "golem-maintenance")                                                                                                return "just keep looking around in that memory! it looks like the framing device added an <span definition=\"NOTE::'top right when not speaking'\">objectives list</span>, take a look at that"
        else                                                                                                                                return "there's more to see in the embassy now, let's follow that thread until we can't anymore. it's the single most important event in obesk < - > earth history, imo"
    } else { //ep4!
        if(check("ep4__entrancefinal") && check("leverage"))                                                                                return "just chill for now. we either need more memories repaired, or for those new pieces to come in. take a break if you want, <span definition=\"NOTE::'indicates end of current main content';'observe @corruworks for updates'\">i'll let you know</span>"
        else if(check("leverageq") && !check("leverage"))                                                                                   return "we need leverage, remember? something to make us invaluable to the work on this cyst, so they can't just replace us. there's gotta be something <em>outside</em> the embassy, somewhere"
        else                                                                                                                                return "well, we just need to see everything we can in that last embassy memory. anything else is secondary right now"
    }
}

/** BUDDY SYSTEM **/
env.entities['proxyfriend'] = {
    name: 'funfriend',
    type: "thoughtform funfriend obesk",
    image: "/img/sprites/funfriend/proxyfriend.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'maintenance appendage';'connected to central assistant'`,
    actions: [
        { //general hello in random spots
            name: "greet",
            exec: ()=>env.ffProxyGreet(),
            showIf: [['PAGE!!proxygreet', false], ['EXEC::page.name !=`hello`'], ['EXEC::page.name != `cache`']]
        },
        { //specific hello in /hello/ when god is dealt with - note that this dialogue is defined in hello.md
            name: "greet",
            exec: ()=>startDialogue('authfix'),
            showIf: [['EXEC::page.name == `hello`']]
        },
            
        {
            name: "unity",
            class: "act-ozo",
            showIf: [["mask", "unity"], ['TEMP!!proxyozo', false]],
            exec: ()=>{
                let proxy = env.buddy_ffproxy
                change("TEMP!!proxyozo", true)

                //if done in the cache it's not the actual buddy so we gotta change the chatter function
                let chatterSource = proxy.chatter
                if(!env.buddy_ffproxy.shouldBeOnPage()) chatterSource = chatter
                
                if(check("hub__funfriend_beacon")) {
                    proxy.setTimeout(()=>chatterSource({actor: "proxyfriend", text: "i recognize that signal interloper"}), 1500)
                    proxy.setTimeout(()=>chatterSource({actor: "proxyfriend", text: "why are you doing that"}), 3000)
                    proxy.setTimeout(()=>{chatterSource({actor: "proxyfriend", text: "ahaha you are so strange"}); change("TEMP!!proxyozo", false)}, 6000)
                } else {
                    proxy.setTimeout(()=>chatterSource({actor: "proxyfriend", text: "what is that...?"}), 1500)
                    proxy.setTimeout(()=>chatterSource({actor: "proxyfriend", text: "was that you?"}), 3000)
                    proxy.setTimeout(()=>chatterSource({actor: "proxyfriend", text: "i do not think it came through right!!"}), 7000)
                    proxy.setTimeout(()=>{chatterSource({actor: "proxyfriend", text: "come do that back in the hub!"}); change("TEMP!!proxyozo", false)}, 10000)    
                }                

                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)

                setTimeout(()=>{
                    vfx({type: 'beacon', state: false})
                }, 7000)
            }
        },
    ]
}

env.ffProxyGreet = ()=>{
    change("PAGE!!proxygreet", true)
    let proxy = env.buddy_ffproxy
    proxy.chatter({text: "NOT RIGHT NOW PLEASE"})
    proxy.setTimeout(()=>proxy.chatter({text: "DIFFICULT TO SPEAK THROUGH PROXY"}), 3000)
    proxy.setTimeout(()=>proxy.chatter({text: "CONDUCTING MEMBRANE REVIEWS"}), 7000)
    proxy.setTimeout(()=>proxy.chatter({text: "BE ON YOUR WAY"}), 9000)

    proxy.setTimeout(()=>change("PAGE!!proxygreet", false), 9000)
}

/** GLOBAL ACTION DEFAULTS **/
// global actions are queried each time you scan stuff - they're added only if their specialCondition is met
// they're also overridden by any entity-level actions that have the same name
env.globalActions = [
    {
        name: "unity",
        class: "act-ozo",

        exec: ()=>{
            env.setTimeout(()=>{
                play("talkchoir", 0.75)
                vfx({type: 'beacon', state: true})
            }, 400)

            env.setTimeout(()=>{
                readoutAdd({message: `<p>NOTE::'no response'</p>`, name:"sys"})
                vfx({type: 'beacon', state: false})
            }, 2000)
        },

        showIf: [["mask", "unity"]],

        // all global actions have a "special condition" - consider it a more in-depth showIf
        // showIf in this case is still used, but only at the scanner level. 
        specialCondition: (ent) => ent.text.startsWith("::RESPONSIVE THOUGHTFORM"),
    }
]

document.addEventListener('corru_act', (ev)=>{
    const entity = ev.detail.entity; //what's being acted upon
    const action = ev.detail.action; //the action

    if(action.name == "unity") {
        if(!["god", "geli", "beautiful parasite", "council", "fairy", "isabel", "proxyfriend?"].includes(entity.name)) {       
            let useCount = Number(check("unity") || 0)
            change("unity",  useCount++)

            if(useCount == 5) {
                chatter({actor: 'moth', text: "hey dude maybe take it easy with this unity thing", readout: true, delay: 12000})
                chatter({actor: 'moth', text: "let's not destabilize the whole cyst", readout: true, delay: 14000})
            }
        }
    }
})