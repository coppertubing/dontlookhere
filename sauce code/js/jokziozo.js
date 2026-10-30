page.maskJoyNote = "\nLOCAL_RESONANCE::'moderate';'minor spatial thoughtspace'"

createEntity({
    name: 'council',
    image: check('recosm_state', 'killed') ? '/img/sprites/council/godportrait.gif' : '/img/sprites/council/portrait.gif',
    type: "thoughtform obesk portrait-haze portrait-auto portrait-center",
    text: `::UNPROCESSABLE THOUGHTFORM
    ::<span definition="NOTE::'non-standard format';'implies connector thoughtform';'self-connected'">UNUSUAL SIGNATURE</span>
    ::??-?_##)__L2xvY2FsL296by8`,
    actions: [
        {
            name: "hello",
            exec: ()=>{ startDialogue('council_intro'); env.jokzi.councilToggle()},
            showIf: [["ozo__council_intro", false], ["stageroom", "ozo_council"]]
        },
        {
            name: "greet",
            exec: ()=>{ startDialogue('council'); env.jokzi.councilToggle()},
            showIf: [["ozo__council_intro", true], ["stageroom", "ozo_council"]]
        },
        {
            name: "unity",
            class: "act-ozo",
                showIf: [["mask", "unity"], ["stageroom", "ozo_council"]],
                exec: ()=>{
                cutscene(true)

                chatter({actor: 'council', text: 'yes, yes!!', readout: true, delay: 2000})
                chatter({actor: 'council', text: 'just like that!!', readout: true, delay: 4000})

                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)

                setTimeout(()=>{
                    vfx({type: 'beacon', state: false})
                    cutscene(false)
                }, 4000)
            },
        }
    ]
})

/* e4a1 note - fairy entity is in globalents now */
createEntity({
    name: 'isabel',
    image: '/img/local/uncosm/ozo/flowerfriend_portrait.gif',
    type: "thoughtform obesk portrait-cover portrait-haze",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'joy'
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'no cohesion';'signature corruption'">::INCOHERENCE DETECTED</span>
    ::INHERITED CONTEXT::<span style='color: var(--bright-color)'>'resembles earth ground-parÙãÆƒ-ÌC__ERROR::'unprocessable'__;'bearer of kind dreams'</span>`,
    actions: [
        {
            name: "hello",
            exec: ()=> startDialogue('isabel_intro'),
            showIf: [["ozo__isabel_intro", false], ["stageroom", "ozo_flower"]]
        },
        {
            name: "greet",
            exec: ()=> startDialogue('isabel'),
            showIf: [["ozo__isabel_intro", true], ["stageroom", "ozo_flower"]]
        },
            
        {
            name: "unity",
            class: "act-ozo",
            showIf: [["mask", "unity"]],
            exec: ()=>{
                cutscene(true)

                chatter({actor: 'isabel', text: 'and what a home it is, right?', readout: true, delay: 2000})

                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)

                setTimeout(()=>{
                    vfx({type: 'beacon', state: false})
                    cutscene(false)
                }, 2000)
            },
        }
    ],

    exmExec: ()=> {
        entityOffPageMarkScanned("beautiful parasite", "..__CITY_SURFACE__..")
    }

})

createEntity({
    name: 'effigy',
    type: "thoughtform portrait-bright portrait-cover",
    image: "/img/local/uncosm/ozo/akieffigy_portrait.gif",
    text: `::INCOMPLETE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'malformed entity';'potential tampering'">::INCOHERENCE DETECTED</span>
    ::INHERITED CONTEXT::<span style='color: var(--bright-color)'>'isabel! isabel! isabel!'</span>`,

    exmExec: ()=>{
        if(!check('earlyeffigy') && !check("ozo__isabel_intro")) {
            change('earlyeffigy', true)
            chatter({actor: 'moth', text: "this is so weird... i think that's meant to be akizet", readout: true, delay: 3000})
            chatter({actor: 'moth', text: "is isabel editing these akizet memories?", readout: true, delay: 7000})
        }
    },

    actions: [
        {
            name: "greet",
            exec: ()=>{
                let effigy = env.targetedEntityParent
                let text = "isabel!! ahaha isabelll!!!"
                switch(effigy.getAttribute('type')) {
                    case "dancer": text = [
                            `ahahahaha`, 
                            `hehehehe`, 
                            `waaawaawaaoo`, 
                            `weuee!! ÿæÿ`
                        ].sample({noRepeat: true})
                    break

                    case "dancersad": text = [
                        `hahaha...`,
                        `wee...`,
                        `..heehee...`,
                    ].sample({noRepeat: true})
                    break

                    case "fawner": text = [
                        `isabel! isabel!`, 
                        `isabel we should dance!`,
                        `isabel! it is the interloper!`,
                        `hi interloper!`,
                        `isabel when is the next dream?`,
                    ].sample({noRepeat: true})
                    break

                    case "worrier": text = [
                        `what's wrong with her...?`, 
                        `hi interloper...`,
                        `isabel will fix her!`,
                        `isabel can fix anything!`,
                        `could this happen to me??`,
                    ].sample({noRepeat: true})
                    break

                    case "gamer": text = [
                        `ok i move E*–IÓ to ú!N`, 
                        `that is an illegal move`, 
                        `ummmmmmm`,
                        `how did you get that corner`,
                        `you can't move that one!! try the other corner`,
                        `ok ¾B{& to ±¢qQ then i use my G³{¼`,
                        `fool!! that mistake will be your last!`,
                        `behold! Ý×ß to )q9Ì¼... you are done!`,
                        `not now interloper i'm beating her`,
                        `not now interloper i'm losing really bad`,
                        `i have all of the veins, what are you going to do?`,
                    ].sample({noRepeat: true})
                    break

                    case "gamersad": text = [
                        `bored...`,
                        `i used to have a friend i think`,
                        `the dancing one does not like my games`,
                        `it used to be so lively...`,
                        `it's not very fun anymore`,
                    ].sample({noRepeat: true})
                    break

                    case "sipper": text = [
                        `ahh... citrus...`,
                        `come drink with me!`,
                        `we should drink forever!`,
                        `never enough! never enough!`,
                        `i can feel it in my receptors!`,
                        `do you know when the next dream is?`,
                    ].sample({noRepeat: true})                        
                    break

                    case "somber": text = [
                            `too dangerous...`, 
                            `i want to go back`, 
                            `council please fix`, 
                            `i miss this one`, 
                            `it's still in there`
                        ].sample({noRepeat: true})
                    break

                    case "lonely": text = [
                            `...`, 
                            `so quiet here interloper`, 
                            `i could rot here forever`, 
                            `i used to be scared of this place`,
                            `i could sleep here forever`
                        ].sample({noRepeat: true})
                    break

                    case "hider": text = [
                            `hm hmmm hmm hmm`, 
                            `i like to visit here just in case`, 
                            `one day she'll come back`, 
                            `i saw a eye once`, // intentional typo don't fucking fix this or i;'l👽
                        ].sample({noRepeat: true})
                    break

                    case "asker": text = [
                            `oh? oh oh oh?`, 
                            `really? cool! how??`, 
                            `wait i wasn't listening can you say that again`, 
                            `ohhhh i ohhh i get it ohh`,
                            `huhh? you just tore it up??`,
                        ].sample({noRepeat: true})
                    break

                    default: text = [
                        "hi interloper"
                    ]
                }

                chatter({
                    actor: "effigy",
                    text,
                    readout: true,
                    customEl: effigy,
                    delay: 300
                })
            }
        },
        {
            name: "unity",
            class: "act-ozo",
            showIf: [["mask", "unity"]],
            exec: ()=>{
                cutscene(true)
                let effigy = env.targetedEntityParent

                switch(env.stage.name) {
                    case "ozo_adrift_dancers":
                        chatter({actor: 'effigy', text: "it's ok! we're just playing outside!", readout: true, delay: 2000, customEl: effigy})
                    break                    

                    default:
                        chatter({actor: 'effigy', text: "ok! but i'm already here!", readout: true, delay: 2000, customEl: effigy})
                    break                    
                }

                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)

                setTimeout(()=>{
                    vfx({type: 'beacon', state: false})
                    cutscene(false)
                }, 2000)
            },
        }
    ]
})

createEntity({
    name: 'sun',
    image: '/img/local/uncosm/ozo/the_unmatched_power_of_the_sun.gif',
    type: "thoughtform obesk portrait-haze portrait-auto portrait-center",
    text: `::INCOMPLETE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'malformed entity';'potential tampering'">::INCOHERENCE DETECTED</span>
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'the screaming eye that reared the bright cousins';'requires ocular manipulation to directly observe'</span>`
})

createEntity({
    hide: true,
    name: "interviewer",
    type: "thoughtform portrait-cover",
    image: "/img/local/ocean/ship/interviewerportrait.gif",
    text: `::INCOMPLETE THOUGHTFORM
    ::SIGNATURE ILLEGIBLE`,
    actions: [
        {
            name: "hello?",
            exec: ()=>{
                startDialogue("lady_shattered")
            },
            showIf: ["stageroom", "ozo_lady"]
        },

        {
            name: "unity",
            class: "act-ozo",
            showIf: [["mask", "unity"]],
            exec: ()=>{
                cutscene(true)

                chatter({actor: 'incoviewer', text: 'peace...', readout: true, delay: 2000})

                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)

                setTimeout(()=>{
                    vfx({type: 'beacon', state: false})
                    cutscene(false)
                }, 3000)
            },
        }
    ]
})

createEntity({
    hide: true,
    name: 'gate::L‹ïAöIÁå',
    image: '/img/socials/cache.gif',
    type: "thoughtform",
    text: `::CONNECTOR THOUGHTFORM
    ::DESTINATION::ERROR::'unprocessable entity'::RENDERABLE`,
    actions: [
        {
            name: "enter",
            exec: ()=>{ 
                change("TEMP!!from", "ozo")
                moveTo("/local/cache/")
            },
            showIf: "PAGE!!usedCache"
        },
        {
            name: "enter",
            exec: ()=>{
                cutscene(true)
                flash(true)
                MUI("off")
                readoutAdd({message: `ERROR::'invalid destination';'no coherency';'locating closest coherent position'`, name:"sys", readout: true, delay: 2000})
                setTimeout(()=>{
                    flash(false)
                    cutscene(false)
                    moveTo("/local/depths/")
                }, 4000)
            },
            showIf: ["PAGE!!usedCache", false]
        }
    ]
})

createEntity({
    name: 'gate::gate::?/::G:a;;T:E',
    image: '/img/textures/corruripple.gif',
    type: "thoughtform",
    text: `::CONNECTOR THOUGHTFORM
    ::DESTINATION::ERROR::'unprocessable entity'::RENDERABLE
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'maximum incoherence';'render possible';'not advised'">::PROCESSING ERROR</span>`,
    actions: [
        {
            name: "enter",
            exec: ()=>{ 
                change("TEMP!!from", "ozo_fairy")
                moveTo("/local/beneath/")
            },
        }
    ]
})

createEntity({
    name: 'gate::gaGATE::te::?/..::G:a;;T:E',
    image: '/img/local/uncosm/ozo/fairyviscera.gif',
    type: "thoughtform portrait-cover",
    text: `::CONNECTOR THOUGHTFORM
    ::DESTINATION::ERROR::'unprocessable entity'::NON-RENDERABLE
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'destination exceeds incoherence threshold';'recommend repair'">::PROHIBITIVE INCOHERENCE</span>`
})

env.jokzi = {
    flowerCheck: (modStage = true) => {
        let flowers = 0
        
        if(!check("effigy_fawners") && modStage) {
            env.stage.querySelectorAll('.gridpiece[slug="a"], .gridpiece[slug="A"]').forEach(el=>{
                el.innerHTML = ""
                el.classList.remove('dyp')
                el.classList.add('neglected')
            })
        } else { 
            if(modStage) env.stage.querySelectorAll('.gridpiece[slug="◘"').forEach(el=>el.classList.remove('neglected')); 
            flowers++ 
        }
        
        if(!check("effigy_dancer") && modStage) {
            env.stage.querySelectorAll('.gridpiece[slug="Ř"]').forEach(el=>{
                el.innerHTML = ""
                el.classList.remove('dyp', 'blocks')
                el.classList.add('neglected')
            })

            env.stage.querySelectorAll('.gridpiece[slug="ä"]').forEach(el=>{
                el.querySelector('.akieffigy:last-child').remove()
                let remainingEffigy = el.querySelector('.akieffigy')

                remainingEffigy.setAttribute('type', 'dancersad')
                remainingEffigy.classList.add('solo')
            })
        } else { 
            if(modStage) env.stage.querySelectorAll('.gridpiece[slug="◙"').forEach(el=>el.classList.remove('neglected'));
            flowers++ 
        }
        
        if(!check("effigy_gamer") && modStage) {
            env.stage.querySelectorAll('.gridpiece[slug="P"], .gridpiece[slug="Ȑ"], .gridpiece[slug="Â"]').forEach(el=>{
                el.innerHTML = ""
                el.classList.remove('dyp', 'blocks')
                el.classList.add('neglected')
            })

            env.stage.querySelectorAll('.gridpiece[slug="Ä"] .akieffigy').forEach(el=>{
                el.setAttribute('type', 'gamersad')
                el.classList.add('solo')
            })
        } else { 
            if(modStage) env.stage.querySelectorAll('.gridpiece[slug="♀"').forEach(el=>el.classList.remove('neglected')); 
            flowers++ 
        }

        if(!check("effigy_sipper") && modStage) {
            env.stage.querySelectorAll('.gridpiece[slug="ü"], .gridpiece[slug="Ŕ"]').forEach(el=>{
                el.innerHTML = ""
                el.classList.remove('dyp')
                el.classList.add('neglected')
            })
        } else { 
            if(modStage) env.stage.querySelectorAll('.gridpiece[slug="○"').forEach(el=>el.classList.remove('neglected')); 
            flowers++ 
        }

        switch(flowers) {
            case 0:
                change("PAGE!!flowers", "few")
            break
            
            case 1: case 2:
                change("PAGE!!flowers", "low")
            break

            case 3:
                change("PAGE!!flowers", "high")
            break
        
            case 4:
                change("PAGE!!flowers", "done")
            break
        }
    },

    receptorcycle: ()=>{
        let councilReceptors = content.querySelector('.receptors')
        if(councilReceptors) {
            councilReceptors.src = "/img/sprites/council/transitone.gif"

            setTimeout(()=>{
                councilReceptors.src = [
                    "/img/sprites/council/jut.gif",
                    "/img/sprites/council/kiv.gif",
                    "/img/sprites/council/tir.gif",
                    "/img/sprites/council/vel.gif",
                    "/img/sprites/council/cousinly.gif"
                ].sample({noRepeat: true})
            }, 1000)
        }
    },

    councilToggle: ()=>{
        cutscene(true)
        flash(true)
        setTimeout(()=>{
            body.classList.toggle('councilfocus')
            setTimeout(()=>{flash(false); cutscene(false)}, 400)
        }, 400)
    },

    randomizeTiles: ()=>{
        env.stage.querySelectorAll(".raised-floaty").forEach((e) => e.style.animationDelay = `${-1 * rand(1, 20)}s`)
    },
    
    stageCheck: ()=>{
        switch(env.stage.name) {
            case "ozo_entrance":
                if(check("citystreet__flower_beacon")) {
                    env.stage.querySelectorAll('.gridpiece[slug="1"], .gridpiece[slug="f"]').forEach(el=>{
                        el.classList.remove('raised-floaty')
                    })

                    env.stage.querySelectorAll('.gridpiece[slug="1"]').forEach(el=>{
                        el.classList.remove('gap', 'blocks')
                    })
                }
            break

            case "ozo_flat":
                body.classList.add('cull-stage');
                setTimeout(()=>{body.classList.add('cloudpush')}, 500)
            break

            case "ozo_fairy":
                if(!check("localorbit__fairy_beacon")) {
                    body.classList.add('nofairy')
                    env.stage.querySelectorAll('#realgrid .gridpiece[slug=░]').forEach(el=>el.classList.add('neglected'))
                }
            break

            case "ozo_council": 
                if(check('recosm_state', 'killed')) {
                    content.querySelector('.council .face').src = "/img/sprites/council/godface.gif"
                }

                if(check("PAGE!!depressed")) {
                    content.querySelector('.council').setAttribute('dance', 0)
                }

                if(check("citystreet__flower_beacon")) env.stage.querySelectorAll(".noisabel").forEach(el=>el.classList.remove('neglected'))
                if(check("localorbit__fairy_beacon")) env.stage.querySelectorAll(".nofairy").forEach(el=>el.classList.remove('neglected'))

                let friendTally = 0
                if(check("localorbit__fairy_beacon")) friendTally++;
                if(check("citystreet__flower_beacon")) friendTally++;
                if(check("e3a2__escapewin")) friendTally++;

                //only start dialogues if an event isn't going to trigger
                if(env.jokzi.event ? (env.jokzi.event.type == "normal" || !env.jokzi.event.type.includes("c_") || env.jokzi.event.type.includes("c_") && env.jokzi.event.observed) : true) {
                    if(!check("ozo__council_lady") && check("unity_lady")) {
                        startDialogue('council_lady')

                    } else if(!check("ozo__council_geliback") && check("e3a2__escapewin")) {
                        startDialogue('council_geliback')

                    } else if(!check("ozo__council_wakizet") && check("pit__f3_unity")){
                        startDialogue('council_wakizet')

                    } else if(
                        (!check("ozo__council_dance") && friendTally >= 2) ||
                        location.search.includes('dancedebug')
                    ) {
                        startDialogue('council_dance')
                    }
                }

                if(check("e3a2__escapewin")) {
                    env.stage.querySelectorAll(".nogeli").forEach(el=>el.classList.remove('neglected', 'raised-floaty', 'raised', 'blocks'))
                } else {
                    env.stage.querySelectorAll(".lostdoor").forEach(el=>{
                        el.classList.remove('door', 'up', 'teleport')
                        el.classList.add('blocks', 'nothing')
                    })
                }

                env.jokzi.councilVisualizer(true) //force update
            break

            case "ozo_flower": //effigy checks
                env.jokzi.flowerCheck()
                
                //requires MOST effigies, but if you're missing the really hard to find one that's ok B)
                if(
                    check("ozo__isabel_intro") 
                    && 
                    (
                        ((check("PAGE!!flowers", "high") || check("PAGE!!flowers", "done")) && !check("ozo__isabel_joy")) 
                        || check("TEMP!!forcejoyintro")
                    )
                ) {
                    startDialogue('isabel_joy')
                } 
            break

            case "ozo_adrift_dancers":
                if(!check("effigy_dancer")) {
                    env.stage.querySelectorAll('.gridpiece[slug="ä"]').forEach(el=>{
                        el.innerHTML = ""
                        el.classList.remove('dyp', 'blocks')
                        el.classList.add('neglected')
                    })
                }
            break

            case "ozo_adrift_darkroom":
            case "ozo_adrift_emptydream":
                change("ozo_enterdark", true)
                env.stage.querySelectorAll('.gridpiece[slug="♠"] .dypcontent, .gridpiece[slug="♥"] .dypcontent').forEach(el=>{
                    el.style.setProperty('--dyp-transform', `translateY(${rand(-100, 100)}%) rotateY(${rand(-20, 20)}deg)`)
                    
                })
            break

            case "ozo_lostone":
                //edge case protection that's not very well guarded here
                //this can only happen if you closed out during the frame win transition to her room
                //not adjusting the dialogue because you deserve what you get if you do this
                if(!check("ozo__ozogeli")) startDialogue("ozogeli")

                if(check("++bsteli-replay")) env.stage.querySelectorAll(".e3a2loop").forEach(el=>el.classList.add('ready'))

                // we get this basically at any point after you free her and it's after EP4
                // to kinda simulate some time passing...
                // although i guess most people will only get her afterwards lol so wateva
                if(check("freedomtut")) {
                    playerMoveTo(0, 6, "right")
                    chatter({actor: 'bsteli::bstrd', text: "u're NOT geting out of this EZ", readout: true})
                    chatter({actor: 'bsteli::bstrd', text: 'PUT THE MASK ON INTERPOLATOUR!!!!!!!', readout: true, delay: 2000})
                } else if(check("ozo__ozogeli") && (!check("ozo__geli_freedom-tried") && check("ep4__entrancefinal")) || check("TEMP!!forcegelimask")) {
                    startDialogue('geli_freedom')
                } 
            break
        }

        env.jokzi.randomizeTiles()

        //one more for music
        switch(env.stage.name) {
            case "ozo_entrance":
            case "ozo_adrift_dancers":
            case "ozo_stranger":
                if(!env.bgm._src.includes("outside.ogg")) {
                    changeBgm(env.jokzi.outsideMusic, {length: 200, pause: true})
                }
            break
            
            case "ozo_fairy":
                if(!env.bgm._src.includes("abyss.ogg") && !check("localorbit__fairy_beacon")) {
                    changeBgm(env.jokzi.abyssMusic, {length: 200, pause: true})
                }
            break

            case "ozo_adrift_darkroom":
            case "ozo_adrift_emptydream":
                if(!env.bgm._src.includes("abyss.ogg")) {
                    if(env.jokzi.adriftMusic.seek() == 0) env.jokzi.adriftMusic.seek(15)
                    changeBgm(env.jokzi.adriftMusic, {length: 200, pause: true})
                }
            break

            case "ozo_council":
            default:
                if(check("PAGE!!depressed")) {
                    if(!env.bgm._src.includes("outside.ogg")) {
                        changeBgm(env.jokzi.outsideMusic, {length: 200, pause: true})
                    }
                    break
                }

                if(!env.bgm._src.includes("ozoloop")) {
                    changeBgm(env.jokzi.loop, {length: 200, pause: true})
                    page.bgm.rate(1)
                }
            break
        }

        if(!check("unity_lady")) {
            env.stage.querySelectorAll('.ladyonly').forEach(el=>{
                el.classList.add('hide')
                el.classList.remove('teleport')
            })
        }

        if(isFirefoxOnWindows()) {
            setTimeout(()=>{
                env.stage.querySelectorAll(".raised, .raised-floaty:not(.locked)").forEach((el, i)=>{
                    el.style.setProperty("--floatyform", `translateZ(-50px) rotateX(${rand(-180, 180)}deg) rotateY(${rand(-180, 180)}deg) rotateZ(${rand(-180, 180)}deg)`)
                })
            }, 200)
        }
    },
    
    abyssMusic: new Howl({
        src: ['/audio/beneath_abyss.ogg'],
        preload: true,
        loop: true,
        volume: 1,
        rate: 0.8,
        sprite: {
            __default: [0, 170667, true]
        }
    }),
    
    adriftMusic: new Howl({
        src: ['/audio/november.ogg'],
        preload: true,
        loop: true,
        volume: 1,
        rate: 0.6,
        sprite: {
            __default: [50, 106500, true]
        }
    }),
    
    outsideMusic: new Howl({
        onload: function () {
            page.howls.push(this)
            this.intendedVol = 0.8
        },
        src: ['/audio/ozooutside.ogg'],
        preload: true,
        loop: true,
        volume: 0.8,
        rate: 0.8,
        sprite: {
            __default: [50, 72000, true]
        }
    }),
    
    intro: new Howl({
        onload: function () {
            page.howls.push(this)
            this.intendedVol = 0.8
        },
        src: ['/audio/ozointro.ogg'],
        preload: true,
        volume: 0.8,
        rate: 1,
        onend: function() {
            change("PAGE!!ozointrodone", true)
            env.jokzi.loop.play()
            env.bgm = env.jokzi.loop
            env.bgm.volume(getModifiedVolume('music', 0.8))
            env.bgm.rate(1)
        }
    }),
    
    loop: new Howl({
        src: ['/audio/ozoloop.ogg'],
        onload: function () {
            page.howls.push(this)
            this.intendedVol = 0.8
        },
        preload: true,
        loop: true,
        volume: 0.8,
        rate: 1,
        sprite: {
            __default: [20, 215055, true]
        }
    }),

    //the music is rather intense, so we slow it during dialogue. shortcut for that
    toggleSlow: (state)=>{
        if(check("PAGE!!depressed")) return
        if(state) {
            ratween(env.bgm, 0.5)
        } else {
            ratween(env.bgm, 1)
        }
    },

    //song timings
    councilIntroVisRanges: [
        [41, "intro"], // before this is intro
        [77, "vocal"], // before this is vocal
    ],

    councilVisRanges: [
        [28.5, "arp1"], // before this is upbeat arps
        [63, "arp2"], // before this is upbeat arps with a bit more intensity
        [109, "arp3"], // before this is downbeat arps
        [140, "outro"], // before this is the glitchy outro/loop 
        [178, "intro"], // before this is intro
        [213, "vocal"], // before this is vocal (SHOULD BE THE END LENGTH)
    ],

    //for use with a setTimeout
    councilVisualizer: (force = false)=>{
        if(check("PAGE!!depressed")) return

        let time = env.bgm.seek()
        let currentTrackedState = body.getAttribute("songstate")
        let currentRange

        //detect the song being played - can be intro or loop
        if(env.bgm._src.includes("ozoloop.ogg")) {
            currentRange = env.jokzi.councilVisRanges
            
        } else if(env.bgm._src.includes("ozointro.ogg")) {
            currentRange = env.jokzi.councilIntroVisRanges

        } else return //incorrect song, do nothing

        //find the first range the time is inside and 
        for (const range of currentRange) {
            if(time < range[0]) {
                env.jokzi.state = range[1] //the range name
                break 
            }
        }

        //update content
        let updated = false
        if(currentTrackedState != env.jokzi.state) {
            body.setAttribute("songstate", env.jokzi.state)
            updated = true
        }

        let council = content.querySelector('.council')

        if(updated || force) {
            switch(env.jokzi.state) {
                case "intro":
                    /* 
                        clouds are closed totally
                        dance with raising arms, side to side, in a dance where they're trying to start something
                        the tiles around them should be still, but lowered
                    */

                if(council) council.setAttribute('dance', 4)
                break
                
                case "vocal":
                    /* 
                        spinny dance 
                        clouds part somewhat, spiral should be visibly moving slowly
                        tiles raise and lower slowly
                    */

                if(council) council.setAttribute('dance', 3)
                break
                
                case "arp1":
                    /* 
                        arm swing dance
                        clouds should part all the way, the spiral more actively doing their thing
                        the tiles do their dance
                    */

                if(council) council.setAttribute('dance', 1)
                break
                
                case "arp2":
                    /* 
                        same dance, but the background spins faster
                    */

                if(council) council.setAttribute('dance', 2)
                break
                
                case "arp3":
                    /* 
                        clouds start to return and move faster as well,
                        incoherence visible in background
                    */

                if(council) council.setAttribute('dance', 3)
                break
                
                case "outro":
                    /* 
                        buggier disconnected dance
                        clouds close completely
                    */

                if(council) council.setAttribute('dance', 2)
                break
            }
        }
    },

    dance: (state)=>{
        if(state) { //starting dance
            change("ozodance", true)
            changeBgm(env.jokzi.intro)
            change("PAGE!!depressed", false)
            body.classList.remove('depressed')
            content.classList.add('dancing')

        } else { //stopping dance
            change("ozodance", false)
            changeBgm(env.jokzi.outsideMusic)
            change("PAGE!!depressed", true)
            body.removeAttribute("songstate")
            body.classList.add('depressed')
            content.classList.remove("dancing")
            content.querySelector('.council').setAttribute('dance', 0)
        }
        
        if(env.jokzi.event) if(env.jokzi.event.danceChange) env.jokzi.event.danceChange(state)
    },

    mask: (ev) => {
        if(ev.detail.mask == "freedom") return;
        switch(env.stage.name) {
            case "ozo_adrift_dancers":
            case "ozo_entrance":
                if(ev.detail.oldMask == "joy" || ev.detail.mask == "joy") refreshStage()
            break
        }
    }    
}

env.stageEntities['▒'] = { 
    class: "shiny",
}

env.stageEntities['▓'] = { 
    class: "neglected",
}

env.stageEntities['?'] = { 
    class: "raised-floaty raised blocks"
}

/* portable characters */
env.stageEntities["Ϣ"] = { // fairy
    class: "critical notile",
    contains: {
        dyp: {
            image: 'transparent',
            width: 6,
            height: 6,
        },

        html: `
            <figure class="ozofriend eyefriend">
                <div class="target" entity="fairy"></div>
                <img class="body" src="/img/local/uncosm/ozo/sprite_body.gif">
                <div class="head">
                    <img src="/img/local/uncosm/ozo/sprite_mask.gif">
                </div>
            </figure>
        `
    }
},

env.stageEntities["Ϥ"] = { // isabel
    class: "critical",
    contains: {
        dyp: {
            width: 1,
            height: 3,
            image: 'transparent',
        },

        html: `
            <figure class="ozofriend flowerfriend">
                <div class="target" entity="isabel"></div>
                <img class="body" src="/img/local/uncosm/ozo/flowerfriend_body.gif">
                <div class="head">
                    <img src="/img/local/uncosm/ozo/flowerfriend_head.gif">
                </div>
            </figure>
        `
    } 
},

env.stageEntities["Ϩ"] = { // geli
    class: "critical",
    contains: {
        html: `<figure class="ozofriend geli bstrdized">
            <div class="target" entity="GELI"></div>
            <div class="head"><img src="/img/sprites/obesk/geli/bsteli/stage/active_head.gif"></div>
            <div class="body"><img src="/img/sprites/obesk/geli/bsteli/stage/active_body.gif"></div>
        </figure>`,

        dyp: {
            image: "transparent",
            width: 1,
            height: 2.2
        },
    } 
},

env.stageEntities["Ϯ"] = { // stowaway
    class: "critical",
    contains: {
        class: "stowaway",
        html: `<figure class="ozofriend fakerloper">
            <div class="target" entity="interloper"></div>
            <div class="body"><img src="/img/sprites/loper.gif"></div>
        </figure>`,
        dyp: {
            image: "transparent",
            width: 1,
            height: 2,
        },
    } 
},

env.stageEntities["ϵ"] = { // effigy
    class: "critical",
    contains: {
        dyp: {
            width: 1.5,
            height: 2,
            image: 'transparent',
        },

        html: `
            <figure class="ozofriend akieffigy" type="wanderer">
                <div class="target" entity="effigy"></div>
                <img class="body" src="/img/local/uncosm/ozo/akieffigy_body.gif">
                <img class="head" src="/img/local/uncosm/ozo/akieffigy_head.gif">
            </figure>
        `
    } 
},

env.stageEntities["ϵ"] = { // effigy
    class: "critical",
    contains: {
        dyp: {
            width: 1.5,
            height: 2,
            image: 'transparent',
        },

        html: `
            <figure class="ozofriend akieffigy" type="wanderer">
                <div class="target" entity="effigy"></div>
                <img class="body" src="/img/local/uncosm/ozo/akieffigy_body.gif">
                <img class="head" src="/img/local/uncosm/ozo/akieffigy_head.gif">
            </figure>
        `
    } 
},

env.stageEntities["Ε"] = { // effigy
    class: "critical",
    contains: {
        dyp: {
            width: 1.5,
            height: 2,
            image: 'transparent',
        },

        html: `
            <figure class="ozofriend akieffigy" type="wanderer">
                <div class="target" entity="effigy"></div>
                <img class="body" src="/img/local/uncosm/ozo/akieffigy_body2.gif">
                <img class="head" src="/img/local/uncosm/ozo/akieffigy_head2.gif">
            </figure>
        `
    } 
},

env.stageEntities['æ'] = {
    class: "critical",
    contains: {
        examineEntity: "ækiZ¥Ét",
        class: "face-creature wakizet",
        dyp: {
            width: 0.75,
            height: 2.1,
            image: 'url(/img/sprites/akizet/wakizet/wakizet.gif)',
            style: `
                transform: rotateX(-90deg) rotateY(180deg) rotateY(var(--faceAngle));
                transition: transform 3s ease-in-out;
            `
        },
    }
}

createEntity({
    name: "ækiZ¥Ét",
    type: "recollection thoughtform portrait-contain portrait-blocker freedomon",
    image: "/img/sprites/akizet/wakizet/wakizetportrait.gif",
    text: `::INCOMPLETE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection';<span style='color: var(--obesk-color)'>'defense'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'no cohesion';'malformed entity';'potential tampering'">::INCOHERENCE DETECTED</span>
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'to approach is to die';'stay away';'your only warning'</span>`,
    actions: [
        {
            name: "speak",
            exec: ()=>{ startDialogue('wakizet')},
            showIf: [["stageroom", "ozo_stranger"]]
        },
        {
            name: "unity",
            class: "act-ozo",
            showIf: [["mask", "unity"], ["stageroom", "ozo_stranger"]],
            exec: ()=>{
                cutscene(true)

                chatter({actor: 'wakizet', text: '...', readout: true, delay: 2000})
                chatter({actor: 'wakizet', text: 'yes, i know, interloper', readout: true, delay: 4000})

                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)

                setTimeout(()=>{
                    vfx({type: 'beacon', state: false})
                    cutscene(false)
                }, 4000)
            },
        }
    ]
})

//utilized in canvas floors to combat vram usage
env.stage.locales["clouded"] = [
    [".empty:not(.neglected)", "/img/local/uncosm/ozo/tiles/ozo.gif",],
    [".shiny", "/img/local/uncosm/ozo/tiles/ozo.gif",],
    [".neglected", "/img/local/uncosm/ozo/tiles/neglected.gif",],
    [".vesselmetal", "/img/local/uncosm/ozo/tiles/vesselmetal.gif",],
    [".blocks.vesselmetal", "/img/textures/black.gif",],
]

env.stages['ozo_flat'] = {
    locale: "flat",
    exec: env.jokzi.stageCheck,
    width: 1,
    plan: `p`
}

env.stages['ozo_entrance'] = {
    locale: "clouded",
    exec: ()=>{
        env.jokzi.stageCheck()
        setTimeout(()=>env.stage.current.onStep(), 300)
    },

    onStep: ()=>{
        let strength = Math.clamp((1 / (env.stage.stageH - 3)) * (env.stage.creatureLoc.y - 3), 0, 1)
        document.querySelector(`#ozobg`).style.setProperty('--cloudpart', strength)  
    },

    entities: {
        "O": {
            class: "blocks notile",
            contains: {
                id: "porthole",
                class: "portal",
                examineEntity: "gate::L‹ïAöIÁå",
                html: `<figure></figure>`
            }
        },
        
        "p": { //player spawn point
            class: "neglected",
            contains: {
                id: "creature",
                class: "player ally-sprite",
                type: "player"
            }
        },

        "S": {
            class: "door up",
            teleportTarget: "ozo_council"
        },

        "F": {
            class: "door right locked notile raised-floaty blocks",
            teleportTarget: "permalocked",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sys', text: "NOTICE::'prohibitive incoherence'", readout: true})
        },

        "f": {
            class: "door left locked notile raised-floaty blocks",
            teleportTarget: "ozo_adrift_dancers",
            lockFlag: "citystreet__flower_beacon",
            shouldFace: "up",
            teleportSpot: 13,
            lockExec: ()=>chatter({actor: 'sys', text: "NOTICE::'prohibitive incoherence'", readout: true})
        },

        "J": {
            class: "door up notile blocks fakeunlock",
            teleportTarget: "ozo_stranger",
            shouldFace: "up",
            teleportSpot: 13
        },

        "=": {
            class: "gap blocks raised-floaty",
        },

        /* these become accessible eventually*/
        "1": {
            class: "gap blocks raised-floaty",
        },

        "2": {
            class: "gap blocks raised-floaty",
        },

        P: {
            class: "funnycloud",
            contains: {
                class: "joyonly freedomonly",
                examineEntity: "×è.÷ùÏÏøø",
                html: `<div class="joygarnish garnishprop"></div>`,
                dyp: {
                    class: "camguy lookdown",
                    image: 'url(/img/local/beneath/lost_pedestrian1_lookdown.gif)',
                    width: 2,
                    height: 2,
                    transform: "rotateX(-80deg)"
                }
            } 
        },

        ⳉ: {
            contains: { 
                class: "rotainer",
                examineEntity: "rotwatcher",
                html: `
                    <figure class="rotfig"></figure>
                    <style id="rotwatcherstyle">
                        @import url(/css/rotwatcher.css)
                    </style>
                `,
                dyp: {
                    image: 'transparent',
                    width: 3,
                    height: 2.5,
                    transform: `rotateY(100deg) translateX(100%) translateY(-50%)`,
                    style: `--baseTransform: rotateX(-90deg) var(--dyp-transform);`,
                }
            } 
        },

        ϧ: {
            class: "notile",
            contains: { 
                class: "rotxamine",
                dyp: {
                    image: 'url(/img/sprites/rot/rotxa.gif)',
                    width: 3,
                    height: 2,
                    transform: `rotateY(100deg) translateX(100%) translateY(-50%)`,
                    style: `--baseTransform: rotateX(-90deg) var(--dyp-transform);`,
                }
            } 
        }
    },
    
    width: 9,

    plans: {
        default: `
            ....O....
            ....pP...
            ....▓.=..
            ..=.▓▓...
            ...▓▓.=..
            =..▓▓?...
            f1▓▓▓▓...
            =..?▓▓...
            ...▓▓....
            ..?.▓?.=.
            ..??▓▓▓2F
            ...▓▓?=.=
            ..▓▓▓....
            ...▓▓▓?..
            ..▓?▓▓▓..
            ....▓▓?..
            ..??▓?...
            ....S....
        `, 

        // e3a2 todo - on mask change reload
        joy: `
            ....O....
            ....pP...
            ....▓.=..
            ..=.▓▓▓▓.
            ...▓▓.=▓.
            =..▓▓?.▓.
            f1▓▓▓▓.▓.
            =..?▓▓.J.
            ...▓▓....
            ..?.▓?.=.
            ..??▓▓▓2F
            ...▓▓?=.=
            ..▓▓▓....
            ...▓▓▓?..
            ..▓?▓▓▓..
            .ⳉϧ.▓▓?..
            ..??▓?...
            ....S....
        `,
    },

    getPlan: function() {
        if(check("mask", "joy") || check("pit__f3_unity")) { // once you get her, it stays open
            return this.plans.joy
        } else {
            return this.plans.default
        }
    },

    planAdjustment: function (plan) {
        let newPlan = plan

        if(!check("effigy_sipper")) newPlan = plan.replace('P', '=')

        if(!check("mask", "joy") || env?.buddy_globalRotwatcher?.currentLocation != page.path) {
            newPlan = newPlan.replace("ⳉ", ".")
            newPlan = newPlan.replace("ϧ", ".")
        }
        
        if(this.eventModifier) newPlan = this.eventModifier(newPlan, this) 

        return newPlan
    }
}

env.stages['ozo_stranger'] = {
    locale: "clouded",
    exec: ()=>{
        env.jokzi.stageCheck()
        if(check("joysearch") && !check("pit__f3_unity")) startDialogue("joy_mysterydoor");
        else if(check("joysearch")) startDialogue("joy_mysterydoor_late");
          
        env.stage.querySelectorAll("#ozofacet").forEach(el=>{
            if(check("joy#any")) el.classList.add('linked')
            else el.classList.add('unlinked')
        })
    },

    entities: {
        "J": {
            class: "door down notile blocks",
            teleportTarget: "ozo_entrance",
            shouldFace: "down",
            teleportSpot: 61,
        },

        "=": {
            class: "gap blocks raised-floaty",
        },
        
        "p": { //player spawn point
            class: "neglected",
            contains: {
                id: "creature",
                class: "player ally-sprite",
                type: "player"
            }
        },

        "a": {
            contains: {
                dyp: {
                    width: 1.5,
                    height: 2,
                    image: 'transparent',
                    transform: 'translate(-20%) rotateY(220deg)'
                },

                html: `
                    <figure class="ozofriend akieffigy" type="hider">
                        <div class="target" entity="effigy"></div>
                        <img class="body" src="/img/local/uncosm/ozo/akieffigy_body.gif">
                        <img class="head" src="/img/local/uncosm/ozo/akieffigy_head.gif">
                    </figure>
                `
            } 
        },

        "Ä": { // event effigies
            contains: {
                dyp: {
                    class: "face-creature",
                    width: 1.5,
                    height: 2,
                    image: 'transparent',
                },

                html: `
                    <figure class="ozofriend akieffigy" type="asker">
                        <div class="target" entity="effigy"></div>
                        <img class="body" src="/img/local/uncosm/ozo/akieffigy_body.gif">
                        <img class="head" src="/img/local/uncosm/ozo/akieffigy_head.gif">
                    </figure>
                `
            } 
        },
        
        "ĵ": {
            class: "notile blocks",
            contains: {
                html: `<div class="target joytarget" entity="referential scar"></div>`,
                class: "joyfacet",
                id: "ozofacet",
                unique: true,
                dyp: {
                    image: 'transparent',
                    width: 1.75,
                    height: 2.25,
                    transform: "rotateY(180deg)"
                }
            } 
        },
        
        "ṙ": {
            class: "neglected ozofacetlanding",
            shouldFace: "down",
        },

    },

    width: 7,

    plans: {
        default: `
            =..J.=.
            ..▓p▓..
            .=▓▓▓▓.
            .▓▓▓▓=.
            =.=▓▓..
            ..▓▓=a=
            ...▓..=
            =..ṙ=..
            ...ĵ..=
        `,

        wakizet: `
            =..J.=.
            ..▓p▓..
            .=▓▓▓▓.
            .▓▓▓▓=.
            =.=▓▓..
            .?▓▓=a=
            .?æ▓..=
            =.?ṙ=..
            ...ĵ..=
        `,
    },

    getPlan: function() { // will eventually have a more complete version
        if(check("pit__f3_unity")) return this.plans.wakizet
        return this.plans.default
    },

    planAdjustment: function (plan) {
        let newPlan = plan
        if(this.eventModifier) newPlan = this.eventModifier(newPlan, this) 
        
        if(plan.includes("æ") && !check("joysearch")) newPlan = newPlan.replace("a", ".")

        return newPlan
    }
}

env.stage.locales["council"] = env.stage.locales["clouded"]

env.stages['ozo_council'] = {
    exec: env.jokzi.stageCheck,
    locale: "council",
    entities: {
        "☺": {
            class: "notile councilblock",
            contains: {
                class: "councilform",
                html: `
                    <div class="target" entity="council"></div>
                    <div class="councilwrap face-creature" id="councilwrap">
                        <div class="council" dance="1">
                            <img class="base" src="/img/sprites/council/coat_bot.gif">
                            <div class="head">
                                <img class="face" src="/img/sprites/council/face.gif">
                                <img class="receptors" src="/img/sprites/council/vel.gif">
                            </div>
                            <div class="torso">
                                <img class="top" src="/img/sprites/council/coat_top.gif">
                                <img class="mid" src="/img/sprites/council/coat_mid.gif">
                                <img class="bot" src="/img/sprites/council/coat_bot.gif">
                            </div>
                            <div class="arm left"> <div class="hand"></div> </div>
                            <div class="arm right"> <div class="hand"></div> </div>
                        </div>
                    </div>

                    <div class="thoughts">
                        <div class="thought"></div>
                        <div class="thought"></div>
                        <div class="thought"></div>
                        <div class="thought"></div>
                    </div>
                `
            }
        },

        "1": {
            class: "raised-1 raised blocks"
        },

        "2": {
            class: "raised-2 raised blocks"
        },

        "=": {
            class: "neglected empty noisabel"
        },

        "_": {
            class: "neglected empty nofairy"
        },

        "▓": {
            class: "neglected empty nogeli"
        },

        "?": {
            class: "raised-floaty raised blocks nogeli"
        },

        "!": { // event placement
            class: "empty plain"
        },

        "e": {
            class: "door down",
            teleportTarget: "ozo_entrance",
            shouldFace: "down",
            teleportSpot: 148
        },

        "N": {
            class: "door up lostdoor",
            teleportTarget: "ozo_lostone",
            shouldFace: "up",
            lockFlag: "e3a2__escapewin"
        },

        "f": {
            class: "door left flowerdoor",
            teleportTarget: "ozo_flower",
            shouldFace: "up",
            teleportSpot: 13,
            lockFlag: "citystreet__flower_beacon",
            lockExec: ()=>{
                chatter({actor: 'sys', text: "NOTICE::'prohibitive incoherence'", readout: true})
                if(!check("PAGE!!triedBrokenCouncilDoor") && check("ozo__council")) {
                    change("PAGE!!triedBrokenCouncilDoor", true)
                    chatter({actor: 'council', text: "that part is in terrible disrepair, dear interloper", readout: true, delay: 2000})
                    chatter({actor: 'council', text: "once our friends are all back, the gates will open", readout: true, delay: 5000})
                }
            }
        },

        "F": {
            class: "door right fairydoor",
            teleportTarget: "ozo_fairy",
            shouldFace: "up",
            teleportSpot: 16,
            lockFlag: "localorbit__fairy_beacon",
            lockExec: ()=>{
                chatter({actor: 'sys', text: "NOTICE::'prohibitive incoherence'", readout: true})
                if(!check("PAGE!!triedBrokenCouncilDoor") && check("ozo__council")) {
                    change("PAGE!!triedBrokenCouncilDoor", true)
                    chatter({actor: 'council', text: "that part is in terrible disrepair, dear interloper", readout: true, delay: 2000})
                    chatter({actor: 'council', text: "once our friends are all back, the gates will open", readout: true, delay: 5000})
                }
            }
        },
    },

    width: 11,
    plan: `
        .....e.....
        .....p.....
        ...░=░░_...
        ..===░░_░..
        .==░░1░___.
        .===121_░_.
        f==12☺21__F
        .=░=121░__.
        .====1!___.
        ..░?▓░░?_..
        ...?░▓?▓...
        ....▓▓▓....
        .....N.....
    `,

    planAdjustment: function (plan) {
        let newPlan = plan
        if(this.eventModifier) newPlan = this.eventModifier(newPlan, this) 
        return newPlan
    }
}

createEntity({
    name: 'parasite plane',
    hide: true,
    pathLimit: "/local/dullvessel/",
    type: "thoughtform ep1on",
    image: "/img/local/orbit/dullvessel/parasite.gif",
    text: `::EXPERIENTIAL THOUGHTFORM
    ::NON-RENDERABLE
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'destination exceeds incoherence threshold';'recommend repair'">::PROHIBITIVE INCOHERENCE</span>
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'a simple game of resource management and theft';'an oltazni favorite'</span>`,
    actions: [
        {
            name: "enter",
            exec: ()=>{  
                change("TEMP!!from", "ozo")
                moveTo("/local/beneath/parasite/")
            },
            showIf: ()=>{return check("netstat|<", 0)},
        }
    ]
})


env.stage.locales["flowers"] = [
    [".empty.plain", "/img/local/uncosm/ozo/tiles/grass.gif",],
    [".dyp", "/img/local/uncosm/ozo/tiles/ozo.gif",],
    [".neglected", "/img/local/uncosm/ozo/tiles/neglected.gif",],
]

env.stages['ozo_flower'] = {
    exec: env.jokzi.stageCheck,
    locale: "flowers",
    entities: {
        "☺": {
            contains: {
                dyp: {
                    image: 'transparent',
                    width: 1,
                    height: 3,
                },
            }
        },

        "c": {
            class: "ozowall door down",
            teleportTarget: "ozo_council",
            shouldFace: "right",
            teleportSpot: 67,
            contains: {
                dyp: {
                    width: 7,
                    height: 3,
                    image: 'url(/img/local/uncosm/ozo/flowercitywall.gif)',
                    noback: true,
                    style: "pointer-events: none;",
                    transform: "translateZ(calc(var(--gridTileSize) * 0.5))"
                }
            } 
        },

        "F": {
            class: "ozowall notile",
            contains: {
                dyp: {
                    width: 7,
                    height: 3,
                    image: 'url(/img/local/uncosm/ozo/flowercitywall.gif)',
                    noback: true,
                    style: "pointer-events: none;",
                    transform: "rotateY(-90deg) translateZ(calc(var(--gridTileSize) * 0.5))"
                }
            } 
        },

        "f": {
            class: "ozowall notile",
            contains: {
                dyp: {
                    width: 7,
                    height: 3,
                    image: 'url(/img/local/uncosm/ozo/flowercitywall.gif)',
                    noback: true,
                    style: "pointer-events: none;",
                    transform: "rotateY(90deg) translateZ(calc(var(--gridTileSize) * 0.5))"
                }
            } 
        },

        "U": {
            class: "ozowall critical",
            contains: {
                dyp: {
                    width: 7,
                    height: 3,
                    image: 'url(/img/local/uncosm/ozo/flowercitywallparted.gif)',
                noback: true,
                    transform: "rotateY(180deg) translateZ(calc(var(--gridTileSize) * 0.5))",
                },

                html: `
                    <figure class="ozofriend flowerfriend">
                        <div class="target" entity="isabel"></div>
                        <img class="body" src="/img/local/uncosm/ozo/flowerfriend_body.gif">
                        <div class="head">
                            <img src="/img/local/uncosm/ozo/flowerfriend_head.gif">
                        </div>
                    </figure>
                `
            } 
        },

        "╞": {
            class: "ozowall critical",
            contains: {
                dyp: {
                    width: 7,
                    height: 3,
                    image: 'url(/img/local/uncosm/ozo/flowercitywallparted.gif)',
                    noback: true,
                    transform: "rotateY(180deg) translateZ(calc(var(--gridTileSize) * 0.5))",
                },
            } 
        },

        "t": {
            class: "notile",
            contains: {
                dyp: {
                    width: 2,
                    height: 4,
                    image: 'url(/img/local/uncosm/ozo/flowertowersmall.gif)',
                    noback: true,
                    style: "pointer-events: none;",
                    transform: "rotateY(-180deg) translateZ(calc(var(--gridTileSize) * 0.4))"
                }
            } 
        },

        "a": {
            contains: {
                dyp: {
                    width: 1.5,
                    height: 2,
                    image: 'transparent',
                    transform: 'translate(-20%) rotateY(220deg)'
                },

                html: `
                    <figure class="ozofriend akieffigy" type="fawner">
                        <div class="target" entity="effigy"></div>
                        <img class="body" src="/img/local/uncosm/ozo/akieffigy_body.gif">
                        <img class="head" src="/img/local/uncosm/ozo/akieffigy_head.gif">
                    </figure>
                `
            } 
        },

        "A": {
            contains: {
                dyp: {
                    width: 1.5,
                    height: 2,
                    image: 'transparent',
                    transform: 'translate(20%) rotateY(-200deg)'
                },

                html: `
                    <figure class="ozofriend akieffigy" type="fawner">
                        <div class="target" entity="effigy"></div>
                        <img class="body" src="/img/local/uncosm/ozo/akieffigy_body2.gif">
                        <img class="head" src="/img/local/uncosm/ozo/akieffigy_head2.gif">
                    </figure>
                `
            } 
        },

        "Ä": {
            contains: {
                dyp: {
                    width: 1.5,
                    height: 2,
                    image: 'transparent',
                },

                html: `
                    <figure class="ozofriend akieffigy" type="gamer">
                        <div class="target" entity="effigy"></div>
                        <img class="body" src="/img/local/uncosm/ozo/akieffigy_body.gif">
                        <img class="head" src="/img/local/uncosm/ozo/akieffigy_head.gif">
                    </figure>
                `
            } 
        },

        "Â": {
            contains: {
                dyp: {
                    width: 1.5,
                    height: 2,
                    image: 'transparent',
                    transform: 'rotateY(180deg)'
                },

                html: `
                    <figure class="ozofriend akieffigy" type="gamer">
                        <div class="target" entity="effigy"></div>
                        <img class="body" src="/img/local/uncosm/ozo/akieffigy_body.gif">
                        <img class="head" src="/img/local/uncosm/ozo/akieffigy_head.gif">
                    </figure>
                `
            } 
        },

        "ü": {
            class: "critical",
            contains: {
                dyp: {
                    class: "sipper",
                    width: 1.5,
                    height: 2,
                    image: 'transparent',
                    transform: 'rotateY(45deg)'
                },

                html: `
                    <figure class="ozofriend akieffigy" type="sipper">
                        <div class="target" entity="effigy"></div>
                        <img class="body" src="/img/local/uncosm/ozo/akieffigy_body2.gif">
                        <img class="head" src="/img/local/uncosm/ozo/akieffigy_head2.gif">
                    </figure>
                `
            } 
        },

        "ä": {
            class: "dancerzets critical",
            contains: {
                dyp: {
                    width: 1.5,
                    height: 2,
                    image: 'transparent',
                },

                html: `
                    <figure class="ozofriend akieffigy" style="--baseTransform: translateZ(calc(var(--gridTileSize) * 0.5));--danceMult: -0.25;" type="dancer">
                        <div class="target" entity="effigy"></div>
                        <img class="body" src="/img/local/uncosm/ozo/akieffigy_body2.gif">
                        <img class="head" src="/img/local/uncosm/ozo/akieffigy_head2.gif">
                    </figure>
                    
                    <figure class="ozofriend akieffigy" style="--baseTransform: translateZ(calc(var(--gridTileSize) * -0.5));--danceMult: 0.25;animation-delay: -1s;" type="dancer">
                        <div class="target" entity="effigy"></div>
                        <img class="body" src="/img/local/uncosm/ozo/akieffigy_body2.gif">
                        <img class="head" src="/img/local/uncosm/ozo/akieffigy_head2.gif">
                    </figure>
                `
            } 
        },
        
        R: {
            contains: {
                dyp: {
                    width: 2,
                    height: 2.5,
                    image: 'url(/img/local/city/flowerstill.gif)',
                    transform: "rotateY(45deg)"
                }
            } 
        },
        
        r: {
            contains: {
                dyp: {
                    width: 2,
                    height: 2.5,
                    image: 'url(/img/local/city/flowerstill.gif)',
                    transform: "rotateY(-45deg)"
                }
            } 
        },
            
        P: {
            class:"blocks",
            contains: {
                class: "parasiteboard",
                html: `<div class="target" entity="parasite plane"></div><figure class="boardproper"></figure><figure class="column"><div class="target" entity="cystic column"></div></figure>`
            }
        },

        L: {
            class: "door right ladyonly flowerdoor",
            teleportTarget: "ozo_lady",
            shouldFace: "up"
        },

        "◘": {
            class: "neglected"
        },

        "○": {
            class: "neglected"
        },

        "◙": {
            class: "neglected"
        },

        "♀": {
            class: "neglected"
        },
        
        "Ŕ": {
            contains: {
                dyp: {
                    width: 2,
                    height: 2.5,
                    image: 'url(/img/local/city/flowerstill.gif)',
                    transform: "rotateY(45deg)"
                }
            } 
        },
        
        "Ř": {
            contains: {
                dyp: {
                    width: 2,
                    height: 2.5,
                    image: 'url(/img/local/city/flowerstill.gif)',
                    transform: "rotateY(45deg)"
                }
            } 
        },
        
        "Ȑ": {
            contains: {
                dyp: {
                    width: 2,
                    height: 2.5,
                    image: 'url(/img/local/city/flowerstill.gif)',
                    transform: "rotateY(45deg)"
                }
            } 
        },

        "!": { // event thing
            class: "empty plain"
        },

        "_": {
            class: "blocks shiny alwaysshine"
        }
    },

    width: 9,
    plan: `
        ....c....
        .Ŕü○p▓▓▓.
        .○○○○░▓▓L
        .Ř◙○♀♀Är.
        f◙ä◙░♀P♀F
        .r◙◙♀♀ÂȐ.
        .◙◘░░◘◘◘.
        .◘◘◘◘!◘◘.
        ..tAUat..
        ...?.?...
    `,

    planAdjustment: function (plan) {
        let newPlan = plan
        if(this.eventModifier) newPlan = this.eventModifier(newPlan, this)
        if(typeof newPlan == "object") newPlan = newPlan.join("")

        if(check("joysearch")) newPlan = newPlan.replace("A", "_")
        return newPlan
    }
}

env.stages['ozo_lady'] = {
    exec: env.jokzi.stageCheck,
    locale: "flowers",
    entities: {
        "c": {
            class: "door down",
            teleportTarget: "ozo_flower",
            teleportSpot: 25,
            shouldFace: "left"
        },
        
        L: {
            class: "notile",
            contains: {
                examineEntity: "interviewer",
                dyp: {
                    class: "interviewer",
                    width: 1,
                    height: 2,
                    image: 'url(/img/local/ocean/ship/interviewerfragment.gif)',
                    transform: "rotateY(180deg) translateY(-25%)"
                }
            } 
        },
        
        R: {
            class: "notile",
            contains: {
                dyp: {
                    width: 2,
                    height: 2.5,
                    image: 'url(/img/local/city/flowerstill.gif)',
                    transform: "rotateY(45deg)"
                }
            } 
        },
        
        r: {
            class: "notile",
            contains: {
                dyp: {
                    width: 2,
                    height: 2.5,
                    image: 'url(/img/local/city/flowerstill.gif)',
                    transform: "rotateY(-45deg)"
                }
            } 
        },

        "a": {
            contains: {
                dyp: {
                    width: 1.5,
                    height: 2,
                    image: 'transparent',
                    transform: 'rotateY(-20deg)'
                },

                html: `
                    <figure class="ozofriend akieffigy" type="worrier">
                        <div class="target" entity="effigy"></div>
                        <img class="body" src="/img/local/uncosm/ozo/akieffigy_body.gif">
                        <img class="head" src="/img/local/uncosm/ozo/akieffigy_head.gif">
                    </figure>
                `
            } 
        },

        "A": {
            contains: {
                dyp: {
                    width: 1.5,
                    height: 2,
                    image: 'transparent',
                    transform: 'rotateY(50deg)'
                },

                html: `
                    <figure class="ozofriend akieffigy" type="worrier">
                        <div class="target" entity="effigy"></div>
                        <img class="body" src="/img/local/uncosm/ozo/akieffigy_body2.gif">
                        <img class="head" src="/img/local/uncosm/ozo/akieffigy_head.gif">
                    </figure>
                `
            } 
        },

        "=": {
            class: "gap blocks raised-floaty",
        },

    },

    width: 9,
    plan: `
        ....c....
        ..░░p░░..
        ..░░░░...
        ...░░░▓..
        ...▓░░▓▓.
        ..▓▓░░▓▓.
        ▓▓▓A░a▓▓▓
        ▓??...?▓▓
        ▓.=R.r..▓
        .=?.L?=..
        .=.r.R..=
    `,

    planAdjustment: function (plan) {
        let newPlan = plan
        if(this.eventModifier) newPlan = this.eventModifier(newPlan, this) 
        return newPlan
    }
}

env.stage.locales["space"] = [
    [".empty.plain", "/img/local/uncosm/ozo/tiles/hollow.gif",],
    [".neglected", "/img/local/uncosm/ozo/tiles/neglected.gif",],
]

env.stages['ozo_fairy'] = {
    exec: env.jokzi.stageCheck,
    leaveExec: ()=>{ body.classList.remove('nofairy') },
    locale: "space",
    entities: {
        "☺": {
            class: "notile critical fairybased",
            contains: {
                dyp: {
                    image: 'transparent',
                    width: 6,
                    height: 6,
                    transform: 'rotateY(180deg)'
                },

                html: `
                    <figure class="ozofriend eyefriend">
                        <div class="target" entity="fairy"></div>
                        <img class="body" src="/img/local/uncosm/ozo/sprite_body.gif">
                        <div class="head">
                            <img src="/img/local/uncosm/ozo/sprite_mask.gif">
                        </div>
                    </figure>
                `
            }
        },

        "c": {
            class: "door down",
            teleportTarget: "ozo_council",
            shouldFace: "left",
            teleportSpot: 75
        },

        "V": {
            class: "notile fairybased",
            contains: {
                class: "distant-dull",
                dyp: { // DO NOT FUCKING CANVASIFY THIS ONE IT'S SO MUCH WORSE SOMEHOW
                    image: 'url(/img/local/orbit/dullportal_backed_small.gif)',
                    width: 500,
                    height: 500,
                    transform: 'rotateY(180deg) translateY(-25%) translateZ(-180000px)'
                },
            }
        },

        "P": {
            class: "notile",
            contains: {
                class: "fairyportal",
                dyp: {
                    image: 'url(/img/local/uncosm/ozo/fairyportal.gif)',
                    width: 15,
                    height: 15,
                    transform: 'translateY(-10%) rotateY(180deg) translateZ(400px)'
                },
            }
        },

        "Ṿ": {
            class: "notile",
            contains: {
                class: "viscera",
                dyp: {
                    image: 'url(/img/local/uncosm/ozo/fairyviscera.gif)',
                    width: 3,
                    height: 2,
                    transform: 'rotateX(-90deg)'
                },
            }
        },

        "Ṽ": {
            class: "notile",
            contains: {
                class: "viscera",
                dyp: {
                    image: 'url(/img/local/uncosm/ozo/fairyviscera2.gif)',
                    width: 2.5,
                    height: 2,
                    transform: 'rotateX(-90deg)'
                },
            }
        },
        
        "ö": {
            class: "blocks notile fairygate",
            contains: {
                id: "porthole",
                class: "portal",
                examineEntity: "gate::gaGATE::te::?/..::G:a;;T:E",
                html: `<figure></figure>`
            }
        },
        
        "Ö": {
            class: "blocks notile fairygate fairygate2",
            contains: {
                id: "porthole",
                class: "portal",
                examineEntity: "gate::gate::?/::G:a;;T:E",
                html: `<figure></figure>`
            }
        },

        "!": { // event loc
            class: "neglected"
        }
    },

    width: 11,
    plan: `
        .....c.....
        ....░p▓....
        ...▓░░▓░Ṿ..
        .Ṽ░▓░░▓▓░..
        .░?▓░░░?▓░.
        .▓▓▓░▓▓▓▓▓.
        .░░▓░▓░▓░░.
        .▓.?...?.░.
        .!?..☺Ṿ.?▓.
        .▓.??PV.?░.
        .▓.ÖṼ.▓ö.▓.
        ..▓....▓▓▓.
        .?.▓.▓▓▓...
    `,

    planAdjustment: function (plan) {
        let newPlan = plan
        if(this.eventModifier) newPlan = this.eventModifier(newPlan, this) 
        return newPlan
    }
}

env.stages['ozo_lostone'] = {
    locale: "clouded",
    width: 9,

    exec: ()=>{
        env.jokzi.stageCheck()

        if(!check("unity_dog")) {
            env.stage.querySelectorAll('#realgrid .isopod').forEach(el=>el.remove())
        } else {
            env.dogSetup()
        }
    },

    leaveExec: ()=>{
        clearInterval(env.stages.isopod)
    },

    entities: {
        "c": {
            teleportTarget: "ozo_council",
            teleportSpot: 126,
            shouldFace: "down"
        },

        "%": {
            class: "locked e3a2loop",
            teleportTarget: "blablabalbalbal",
            lockFlag: "permalocked",
            lockExec: ()=> {
                if(env.stage.name == 'ozo_lostone' && check('++bsteli-replay')) {
                    if(content.getAttribute("event")) if(content.getAttribute("event").includes("geli") && content.getAttribute("event") != "w_geli") {
                        return chatter({actor: "sourceless", text: "geli isn't here.", readout: true})
                    }
                    
                    //no gameplay mode is not considered here bc optional replay
                    startDialogue('dreamchoice')
                }
            },
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
                    width: 1.5,
                    height: 2,
                }
            } 
        },

        "T": {
            class: "prop blocks vesselmetal",
            contains: {
                dyp: {
                    class: "terminal",
                    image: 'url(/img/local/critta/generiterminal2.gif)',
                    transform: `rotateY(45deg);`,
                    style: "pointer-events: none;",
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

        "☻": {
            class: "prop blocks vesselmetal",
            contains: {
                html: `<figure class="ozofriend geli bstrdized">
                    <div class="target" entity="GELI"></div>
                    <div class="head"><img src="/img/sprites/obesk/geli/bsteli/stage/active_head.gif"></div>
                    <div class="body"><img src="/img/sprites/obesk/geli/bsteli/stage/active_body.gif"></div>
                </figure>`,
                dyp: {
                    image: "transparent",
                    width: 1,
                    height: 2.2,
                    transform: "rotateY(160deg)"
                },
            } 
        },

        "☺": {
            class: "prop blocks vesselmetal",
            contains: {
                html: `<figure class="ozofriend fakerloper">
                    <div class="target" entity="interloper"></div>
                    <div class="body"><img src="/img/sprites/loper.gif"></div>
                </figure>`,
                dyp: {
                    image: "transparent",
                    width: 1,
                    height: 2,
                    transform: "rotateY(0deg)"
                },
            } 
        },

        "ž": {
            class: "notile",
            contains: {
                class: "distant-frame",
                dyp: { // DO NOT CANVASIFY AS WELL
                    image: 'url(/img/local/uncosm/ozo/frame_distant.gif)',
                    width: 1000,
                    height: 1000,
                    transform: 'rotateY(135deg) translateY(5%) translateZ(-160000px)'
                },
            }
            
        },
                "Ÿ": {
            class: "notile daemoncrowd",
            contains: {
                class: "distant-daemons",
                dyp: { // STILL DON'T CANVASIFY
                    image: 'url(/img/local/uncosm/ozo/frame_daemoncrowd.gif)',
                    width: 1000,
                    height: 1000,
                    transform: 'rotateY(135deg) translateY(10%) translateZ(-140000px)'
                },
            }
        },

        "♠": {class: "vesselmetal"},
        "_": {class: "gap blocks"},
        "=": {class: "gap blocks raised-floaty"},
        "░": {class: "empty neglected"},
        "f": {
            class: "empty neglected",
            exec: ()=>{
                if(check("freedomtut")) {
                    startDialogue("geli_freedom", {specificChain: "tried"})
                    change("freedomtut", "DELETE")
                }
            }
        },

        "!": {class: "vesselmetal"} // event position
    },

    plan: `
        _.=_c_=.┼
        ...░p░..=
        =.f░░._=░
        .░.░░.=..
        ░...░....
        ░.T♠♠☺1..
        ░W%♠♠!2Ü.
        ..t☻♠♠3..
        žŸR.s....
    `,

    planAdjustment: function (plan) {
        let newPlan = plan
        if(this.eventModifier) newPlan = this.eventModifier(newPlan, this) 
        return newPlan
    }
}

/* ADRIFT - PARTS OF OZO THAT ARE DETACHED, OUT OF REPAIR, ETC */
env.stages['ozo_adrift_dancers'] = {
    locale: "clouded",
    exec: ()=>{
        env.jokzi.stageCheck()
        document.querySelector(`#ozobg`).style.setProperty('--cloudpart', 1)  
    },

    entities: {        
        "p": { //player spawn point
            class: "neglected",
            contains: {
                id: "creature",
                class: "player ally-sprite",
                type: "player"
            }
        },

        "S": {
            class: "door down",
            teleportTarget: "ozo_entrance",
            teleportSpot: "55",
            shouldFace: "right"
        },

        "f": {
            class: "door up locked notile raised-floaty",
            teleportTarget: "permalocked",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sys', text: "NOTICE::'prohibitive incoherence'", readout: true})
        },
        
        "ä": {
            class: "dancerzets critical",
            contains: {
                dyp: {
                    width: 1.5,
                    height: 2,
                    image: 'transparent',
                },

                html: `
                    <figure class="ozofriend akieffigy" style="--baseTransform: translateZ(calc(var(--gridTileSize) * 0.5));--danceMult: -0.25;" type="dancer">
                        <div class="target" entity="effigy"></div>
                        <img class="body" src="/img/local/uncosm/ozo/akieffigy_body2.gif">
                        <img class="head" src="/img/local/uncosm/ozo/akieffigy_head2.gif">
                    </figure>
                    
                    <figure class="ozofriend akieffigy" style="--baseTransform: translateZ(calc(var(--gridTileSize) * -0.5));--danceMult: 0.25;animation-delay: -1s;" type="dancer">
                        <div class="target" entity="effigy"></div>
                        <img class="body" src="/img/local/uncosm/ozo/akieffigy_body2.gif">
                        <img class="head" src="/img/local/uncosm/ozo/akieffigy_head2.gif">
                    </figure>
                `
            } 
        },

        "=": {
            class: "gap blocks raised-floaty",
        },

        "F": {
            class: "door darkdoor up",
            teleportTarget: "ozo_adrift_darkroom",
            teleportSpot: "62",
            shouldFace: "up"
        },

        "¤": {
            class: "notile",
            contains: {
                html: `
                    <div class="target joyonly" entity="˜CâR…"></div>
                    <div class="joyonly joygarnish garnishportal caseportal"><div class="carsign"></div></div>
                `,
                dyp: {
                    image: 'url(/img/local/beneath/car.gif)',
                    width: 3,
                    height: 3,
                    transform: "rotateY(-90deg)"
                }
            } 
        },

        "ø": {
            contains: {
                examineEntity: "s w   al kk",
                html: `<div class="joyonly joygarnish garnishprop"></div>`,
                dyp: {
                    class: "civvie swalk face-creature",
                    image: 'url(/img/local/city/pedestrian5.gif)',
                    width: 1.5,
                    height: 2,
                    transform: "rotateY(180deg) rotateY(var(--faceAngle))",
                    style: "transition: transform 400ms ease-in-out;"
                }
            } 
        },

        "j": {
            class: "neglected",
        }

    },

    width: 9,
    plan: `
        ....S....
        ....p....
        ....▓....
        .▓▓▓▓▓?=f
        .▓?.ä.=..
        .▓=..?...
        =▓jjjjjj¤
        .▓?.?..ø.
        .F.......
    `,

    planAdjustment: (plan) => {
        let newPlan = plan

        if(content.getAttribute("event") == "c_effigies" || content.getAttribute("event") == "f_effigies") newPlan = plan.replace("ä", "▓")

        if(!check("mask", "joy") || !check("car__intro")) newPlan = plan.replace('ø', '.').replace('¤', '.').replaceAll("j", ".")
        if(this.eventModifier) newPlan = this.eventModifier(newPlan, this) 

        return newPlan
    }
}

env.stages['ozo_adrift_darkfield'] = {
    exec: env.jokzi.stageCheck,
    locale: "darkclouds",
    entities: {
        "c": {
            teleportTarget: "ozo_adrift_dancers",
            shouldFace: "down"
        },
    },

    width: 11,
    plan: `
        .....c.....
        ....░p░....
        .░░░░░░░░░.
        .░░░░░░░░░.
        .░░░░░░░░░.
        .░░░░░░░░░.
        .░░░░░░░░░.
        .░░░░░░░░░.
        .░░░░░░░░░.
        .░░░░░░░░░.
        ...........
    `,

    planAdjustment: function (plan) {
        let newPlan = plan
        if(this.eventModifier) newPlan = this.eventModifier(newPlan, this) 
        return newPlan
    }
}

env.stages['ozo_adrift_darkroom'] = {
    exec: ()=>{
        env.jokzi.stageCheck();
        ratween(env.bgm, 0.60, 200)
    },
    locale: "darkclouds",
    entities: {
        "c": {
            class: "ozowall door down darkdoor alwaysvis",
            teleportTarget: "ozo_adrift_dancers",
            shouldFace: "down",
            teleportSpot: 64,
            contains: {
                dyp: {
                    class: "hosting",
                    width: 5,
                    height: 3,
                    image: 'transparent',
                    style: "pointer-events: none;",
                    transform: "translateZ(calc(var(--gridTileSize) * 0.5))"
                },

                html: `
                    <figure class="darksides"></figure>
                    <figure class="otherside"></figure>
                    <figure class="wall"></figure>
                `
            },
        },

        "C": {
            class: "ozowall door up darkdoor darker alwaysvis",
            teleportTarget: "ozo_adrift_emptydream",
            shouldFace: "up",
            teleportSpot: 37,
            contains: {
                dyp: {
                    class: "hosting",
                    width: 5,
                    height: 3,
                    image: 'transparent',
                    style: "pointer-events: none;",
                    transform: "translateZ(calc(var(--gridTileSize) * -0.5)) rotateY(180deg)"
                },

                html: `
                    <figure class="darksides"></figure>
                    <figure class="otherside"></figure>
                    <figure class="wall"></figure>
                `
            },
        },

        "F": {
            class: "ozowall notile alwaysvis",
            contains: {
                dyp: {
                    canvas: {
                        sprite: "/img/local/uncosm/ozo/pockmarksdark.gif",
                        fit: "stretch"
                    },
                    width: 5,
                    height: 3,
                    style: "pointer-events: none;",
                    transform: "rotateY(-90deg) translateZ(calc(var(--gridTileSize) * 0.5))"
                }
            } 
        },

        "f": {
            class: "ozowall notile alwaysvis",
            contains: {
                dyp: {
                    canvas: {
                        sprite: "/img/local/uncosm/ozo/pockmarksdark.gif",
                        fit: "stretch"
                    },
                    width: 5,
                    height: 3,
                    style: "pointer-events: none;",
                    transform: "rotateY(90deg) translateZ(calc(var(--gridTileSize) * 0.5))"
                }
            } 
        },

        "☺": {
            class: "alwaysvis",
            contains: {
                dyp: {
                    class: "unknown1",
                    image: 'url(/img/local/uncosm/ozo/unkn1.gif)',
                    transform: "rotateY(145deg)",
                    width: 3,
                    height: 3,
                },
            }
        },

        "♥": {
            class: "alwaysvis notile",
            contains: {
                dyp: {
                    canvas: {
                        sprite: "/img/textures/spotgradientinverse.gif",
                        fit: "stretch"
                    },
                    class: "quiet",
                    width: 10,
                    height: 10,
                },
            }
        },

        "♠": {
            class: "alwaysvis notile",
            contains: {
                dyp: {
                    class: "quiet",
                    image: 'url(/img/local/uncosm/ozo/unkn1.gif)',
                    width: 10,
                    height: 10,
                },
            }
        },

        '▒': {
            class: "invisiblewalk nothing",
        },

        '░': {
            class: "invisiblewalk nothing",
        },
    },

    fogRadius: 10,
    fogAlgorithm: "half",
    width: 25,
    plan: `
        ▒▒▒▒▒▒▒▒▒...c...▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒.░░p░░.▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒.░░░░░.▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒f░░░░░F▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒.░░░░░.▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒.░░░░░.▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒♥▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒♥▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒.▒▒▒▒▒.▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒.░☺░░░.▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒.░░░░░.▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒f░░░░░F▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒.░░░░░.▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒.░░░░░.▒▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒...C...▒▒▒▒▒▒▒▒▒
    `,

    planAdjustment: function (plan) {
        let newPlan = plan
        if(this.eventModifier) newPlan = this.eventModifier(newPlan, this) 
        return newPlan
    }
}

env.stages['ozo_adrift_emptydream'] = {
    exec: ()=>{
        env.jokzi.stageCheck();
        ratween(env.bgm, 0.15, 200)
    },
    locale: "darkclouds",
    entities: {
        "c": {
            class: "ozowall door down darkdoor darker alwaysvis",
            teleportTarget: "ozo_adrift_dancers",
            shouldFace: "down",
            teleportSpot: 64,
        },

        "○": {
            class: "alwaysvis notile",
            contains: {
                dyp: {
                    canvas: {
                        sprite: "/img/local/uncosm/ozo/vista.gif",
                        fit: "contain",
                        position: "bottom center"
                    },
                    class: "vista",
                    width: 25,
                    height: 35,
                    transform: "translateY(70%)"
                },
            }
        },

        "♥": {
            class: "alwaysvis notile",
            contains: {
                dyp: {
                    class: "quiet",
                    image: 'url(/img/textures/spotgradientinversetiny.gif)',
                    width: 10,
                    height: 10,
                },
            }
        },

        '▒': {
            class: "invisiblewalk nothing",
        },

        '!': {
            class: "invisiblewalk nothing",
        },
    },

    fogRadius: 5,
    fogAlgorithm: "half",
    width: 15,
    plan: `
        .....??.??.....
        .....?.c.?.....
        .....?░p▒?.....
        .....?░▒░?.....
        ......▒▒░......
        .....?░▒!......
        ......?..?.....
        ...............
        ...............
        ...............
        ...............
        ...............
        ...............
        ...............
        ...............
        ...............
        ...............
        .♥.............
        ...............
        ...............
        ...............
        ...............
        ...............
        ...............
        ...............
        ...............
        ...............
        ...............
        ...............
        ...............
        ...............
        ...............
        ...............
        .............♥.
        ...............
        ...............
        ...............
        ...............
        ...............
        ...............
        ...............
        ...............
        ...............
        ...............
        .......○.......
    `,
    
    planAdjustment: function (plan) {
        let newPlan = plan
        if(this.eventModifier) newPlan = this.eventModifier(newPlan, this)
        return newPlan
    }
}

//called on visit, determines what event (if any) to apply to ozo
env.jokzi.runEvents = () => {
    //special event test bypass
    const eventParam = new URLSearchParams(window.location.search).get('setevent')
    if(eventParam && env.jokzi.events[eventParam]) return env.jokzi.setEvent(eventParam);

    // if any on-enter mask reception is pending, don't queue any events

    // joy mask is pending if you've spoken to isabel at least once, and have enough of the ffigies
    let joyMaskPending = (
        check("TEMP!!forcejoyintro") || 
        (
            !check("ozo__isabel_joy") && 
            (
                (check("PAGE!!flowers", "high") || check("PAGE!!flowers", "done")) && !check("ozo__isabel_joy") && check("ozo__isabel")
            ) 
        )
    )

    // freedom mask is pending if you've saved geli, completed entrance finale, and haven't had the chat yet
    let freedomMaskPending = check("TEMP!!forcegelimask") || check("freedomtut") || (
        !check("ozo__geli_freedom") && 
        (
            (check("ep4__entrancefinal") && check("ozo__ozogeli"))
        )
    )

    
    if(joyMaskPending || freedomMaskPending) {
        console.log(`not using events due to pending mask reception. joy pending: ${joyMaskPending}, freedom pending: ${freedomMaskPending}`)
        return 
    }

    // events are more common the longer it's been since the last one
    let eventLikelihoodModifier = (check("e_ozo") || 0) * 0.05

    //generate a weighted list to use weightRand with, also apply some useful stuff for later
    let weightedList = Object.entries(env.jokzi.events).map(ev => {
        let weight = (ev[1].weight || 0.3) + (ev[1].weightMod ? ev[1].weightMod() : 0)

        if(ev[0] != "normal") weight += eventLikelihoodModifier;
        ev[1].type = ev[0]

        if(weight <= 0 || !shouldItShow(ev[1])) {
            //console.log("should show is", shouldItShow(ev[1]), "weight is", weight, "skipping", ev[0])
            return false
        }

        else return [
            ev[1], weight
        ]

    }).filter(ev => ev !== false)

    //choose event
    env.jokzi.setEvent(weightRand(weightedList).type)
}

env.jokzi.setEvent = (name) => {
    console.log("setting event", name)
    env.jokzi.event = env.jokzi.events[name]
    env.jokzi.event.type = name

    //once the event is chosen, act on it in some way
    content.setAttribute("event", env.jokzi.event.type)
    switch(env.jokzi.event.type) {
        case "normal":
            change('e_ozo', "++")
        break

        default:
            env.jokzi.event.chosen()
    }

    env.jokzi.event.seen = ()=> {
        change("e_ozo", 0)
        change(`eo_${name}`, true)
        env.jokzi.event.observed = true
    }

    change(`PAGE!!${name}`, true)
}

/**** 
 * OZO EVENT SYSTEM
 * upon visit, there may be an "event" that's chosen based on flags, rarity, etc
 * weights are modified by a variety of factors to ensure that not all events are experienced at once,
 * but that it's still very likely for someone to see all of them over their playtime
****/
env.jokzi.listeners = [] // special event listeners on doc to be cleared when leaving
env.jokzi.events = {
    normal: { },

    // COUNCIL ZONE
    c_geli: {
        // geli dialogue in council room
        weight: 0.15,
        showIf: [["e3a2__escapewin", true], ["ozo__ozogeli", true], ["ozo__e_c_geli", false]], // one-time
        chosen: ()=>{
            // add geli to council
            env.jokzi.oldCouncilPlan = env.stages.ozo_council.plan
            env.stages.ozo_council.plan = convertStagePlanStringToArray(env.stages.ozo_council.plan)
            env.stages.ozo_council.plan[92] = "Ϩ"

            // remove geli from geliroom and style appropriately
            env.jokzi.oldLostOnePlan = env.stages.ozo_lostone.plan
            env.stages.ozo_lostone.plan = convertStagePlanStringToArray(env.stages.ozo_lostone.plan)
            env.stages.ozo_lostone.plan[66] = "♠"

            let listener = {
                type: "stage_change",
                exec: (ev) => {
                    if(ev.detail.stage == "ozo_council" && !env.jokzi.event.observed) {
                        startDialogue("e_c_geli")
                        env.jokzi.event.seen()
                    }
                }
            }
            
            document.addEventListener(listener.type, listener.exec)
            env.jokzi.listeners.push(listener)

            //should adjust actions in this room to just be 'meet me in my region' chatter
            env.entities["GELI"].actions.push({
                name: "let's talk",
                exec: ()=>{
                    env.jokzi.event.complete()
                },
                showIf: ["stageroom", "ozo_council"]
            })
        },

        complete: ()=> {
            cutscene(true)
            chatter({ actor: "bsteli::happy", text:"all right!", readout: true, delay: 400})
            chatter({ actor: "bsteli", text:"meet me in my region!", readout: true, delay: 2000})

            setTimeout(() => {
                cutscene(false)

                vfx({type: "flash", state: true})
                env.jokzi.event.completed = true
                
                setTimeout(()=>{
                    content.setAttribute("event", "normal")
                    env.stage.querySelectorAll(".gridpiece[slug='Ϩ']").forEach(el=>{
                        el.innerHTML = ""
                        el.classList.remove('critical', 'dyp', 'blocks')
                        el.classList.add('empty', 'plain')
                    })
                    chatter({actor: "sys", text: "ATTENTION::'thoughtform activity detected';'resource location altered'", readout: true})
                    env.stages.ozo_council.plan = env.jokzi.oldCouncilPlan
                    env.stages.ozo_lostone.plan = env.jokzi.oldLostOnePlan
                    vfx({type: "flash", state: false})
                }, 800)
                
            }, 3000);
        },
    },

    c_isabel: {         
        // isabel chattin with council
        weight: 0.15,
        showIf: [["ozo__isabel_intro", true], ["ozo__council_lady", true], ["unity_lady", true], ["ozo__e_c_isabel", false]], // one-time
        chosen: ()=>{
            // add isabel to council, remove from home stage temporarily
            env.jokzi.oldCouncilPlan = env.stages.ozo_council.plan
            env.stages.ozo_council.plan = convertStagePlanStringToArray(env.stages.ozo_council.plan)
            env.stages.ozo_council.plan[80] = "Ϥ"

            env.jokzi.oldFlowerPlan = env.stages.ozo_flower.plan
            env.stages.ozo_flower.plan = convertStagePlanStringToArray(env.stages.ozo_flower.plan)
            env.stages.ozo_flower.plan[76] = "╞"

            let listener = {
                type: "stage_change",
                exec: (ev) => {
                    if(ev.detail.stage == "ozo_council" && !env.jokzi.event.observed) {
                        startDialogue("e_c_isabel")
                        env.jokzi.event.seen()
                    }
                }
            }
            document.addEventListener(listener.type, listener.exec)
            env.jokzi.listeners.push(listener)

            //should adjust actions in this room to just be 'meet me in my region' chatter
            env.entities["isabel"].actions.push({
                name: "let's talk",
                exec: ()=>{
                    env.jokzi.event.complete()
                },
                showIf: ["stageroom", "ozo_council"]
            })
        },

        complete: ()=> {
            cutscene(true)
            chatter({ actor: "isabel", text:"let us leave the council, then", readout: true, delay: 400})
            chatter({ actor: "isabel", text:"come to me, interloper", readout: true, delay: 2000})

            setTimeout(() => {
                cutscene(false)

                vfx({type: "flash", state: true})
                env.jokzi.event.completed = true
                
                setTimeout(()=>{
                    content.setAttribute("event", "normal")
                    env.stage.querySelectorAll(".gridpiece[slug='Ϥ']").forEach(el=>{
                        el.innerHTML = ""
                        el.classList.remove('critical', 'dyp', 'blocks')
                        el.classList.add('empty', 'plain')
                    })
                    chatter({actor: "sys", text: "ATTENTION::'thoughtform activity detected';'resource location altered'", readout: true})
                    env.stages.ozo_council.plan = env.jokzi.oldCouncilPlan
                    env.stages.ozo_flower.plan = env.jokzi.oldFlowerPlan
                    vfx({type: "flash", state: false})
                }, 800)
                
            }, 3000);
        },
    },

    c_fairy: {
        weight: 0.15,
        showIf: [["ozo__fairy_intro", true], ["fbx__ep3intro", true], ["ozo__e_c_fairy", false]], // one-time
        // fairy chattin with council
        chosen: ()=>{
            // add fairy to council, remove from home stage temporarily
            env.jokzi.oldCouncilPlan = env.stages.ozo_council.plan
            env.stages.ozo_council.plan = convertStagePlanStringToArray(env.stages.ozo_council.plan)
            env.stages.ozo_council.plan[108] = "Ϣ"

            env.jokzi.oldFairyPlan = env.stages.ozo_fairy.plan
            env.stages.ozo_fairy.plan = convertStagePlanStringToArray(env.stages.ozo_fairy.plan)
            env.stages.ozo_fairy.plan[93] = "."

            let listener = {
                type: "stage_change",
                exec: (ev) => {
                    if(ev.detail.stage == "ozo_council" && !env.jokzi.event.observed) {
                        startDialogue("e_c_fairy")
                        env.jokzi.event.seen()
                    }
                }
            }
            document.addEventListener(listener.type, listener.exec)
            env.jokzi.listeners.push(listener)
        },

        complete: ()=> {
            cutscene(false)

            vfx({type: "flash", state: true})
            env.jokzi.event.completed = true
            
            setTimeout(()=>{
                content.setAttribute("event", "normal")
                env.stage.querySelectorAll(".gridpiece[slug='Ϣ']").forEach(el=>{
                    el.innerHTML = ""
                    el.classList.remove('critical', 'dyp', 'blocks')
                    el.classList.add('empty', 'nothing')
                })
                
                env.stages.ozo_council.plan = env.jokzi.oldCouncilPlan
                env.stages.ozo_fairy.plan = env.jokzi.oldFairyPlan
                vfx({type: "flash", state: false})
            }, 800)
        },
    },
    
    c_stow: {
        //stowaway chilling
        weight: -0.1, // one-time events are prioritized over this one
        showIf: [["e3a2__escapewin", true], ["ozo__ozogeli", true]], //not one-time
        chosen: ()=>{
            //add/remove stowaway as necessary - no need for room return
            env.stages.ozo_council.plan = convertStagePlanStringToArray(env.stages.ozo_council.plan)
            env.stages.ozo_council.plan[84] = "Ϯ" 

            env.stages.ozo_lostone.plan = convertStagePlanStringToArray(env.stages.ozo_lostone.plan)
            env.stages.ozo_lostone.plan[50] = "♠"

            let listener = {
                type: "stage_change",
                exec: (ev) => {
                    if(ev.detail.stage == "ozo_council" && !env.jokzi.event.observed) {
                        env.jokzi.event.seen()
                    }
                }
            }
            document.addEventListener(listener.type, listener.exec)
            env.jokzi.listeners.push(listener)

            env.entities["interloper"].actions.push({
                name: "you should join in",
                exec: ()=>{env.jokzi.event.complete(); change("PAGE!!jig", true)},
                showIf: [["ozodance", true], ["stageroom", "ozo_council"], ["PAGE!!jig", false]]
            })
        },

        complete: ()=> {
            chatter({ actor: "stowaway", text:"join in", readout: true, delay: 400})
            content.classList.add('stowaway-jig')
        },
    },
    
    c_effigies: {
        //effigies chilling
        weight: -0.1, // one-time events are prioritized over this one
        showIf: [["citystreet__flower_beacon", true], ["effigy_dancer", true], ["effigy_fawners", true], ["effigy_gamer", true]], //not one-time
        chosen: ()=>{ // not removing them from flower stage bc too much would get fucked up
            env.jokzi.oldCouncilPlan = env.stages.ozo_council.plan
            env.stages.ozo_council.plan = convertStagePlanStringToArray(env.stages.ozo_council.plan)
            env.stages.ozo_council.plan[84] = "Ε"
            env.stages.ozo_council.plan[80] = "Ε"
            env.stages.ozo_council.plan[62] = "ϵ"
            env.stages.ozo_council.plan[58] = "Ε"
            env.stageEntities["ϵ"].contains.html = env.stageEntities["ϵ"].contains.html.replaceAll("wanderer", "dancer")
            env.stageEntities["Ε"].contains.html = env.stageEntities["Ε"].contains.html.replaceAll("wanderer", "dancer")

            // e4a1 - adrift_dancers alterations moved to its planAdjustment

            env.jokzi.oldLadyPlan = env.stages.ozo_lady.plan
            env.stages.ozo_lady.plan = convertStagePlanStringToArray(env.stages.ozo_lady.plan)
            env.stages.ozo_lady.plan[59] = "░" 
            env.stages.ozo_lady.plan[57] = "░" 

            let listener = {
                type: "stage_change",
                exec: (ev) => {
                    if(ev.detail.stage == "ozo_council" && !env.jokzi.event.observed) {
                        env.jokzi.event.seen()
                    }
                }
            }
            document.addEventListener(listener.type, listener.exec)
            env.jokzi.listeners.push(listener)
        },

        danceChange: (state)=>{
            if(state) return;
            env.jokzi.event.complete()
            cutscene(true)
        },

        complete: ()=> {
            chatter({ actor: "effigy", text:"aww!!", readout: true, delay: 400})
            chatter({ actor: "effigy", text:"we'll come back later!", readout: true, delay: 2000})

            setTimeout(()=>{
                vfx({type: "flash", state: true})
                env.jokzi.event.completed = true
            }, 2000)
            
            setTimeout(()=>{
                content.setAttribute("event", "normal")
                env.stage.querySelectorAll(".gridpiece[slug='ϵ'], .gridpiece[slug='Ε']").forEach(el=>{
                    el.innerHTML = ""
                    el.classList.remove('critical', 'dyp', 'blocks')
                    el.classList.add('empty', 'plain')
                })
                
                chatter({actor: "sys", text: "ATTENTION::'thoughtform activity detected';'resource location altered'", readout: true})
                env.stages.ozo_council.plan = env.jokzi.oldCouncilPlan
                env.stages.ozo_lady.plan = env.jokzi.oldLadyPlan
                vfx({type: "flash", state: false})
                cutscene(false)
            }, 3000)
        },
    },

    // FAIRY ZONE
    f_geli: {
        //geli chat with da fairy
        weight: 0.15,
        showIf: [["ozo__fairy_intro", true], ["e3a2__escapewin", true], ["ozo__ozogeli", true], ["ozo__e_f_geli", false]], //one-time
        chosen: ()=>{
            env.jokzi.oldFairyPlan = env.stages.ozo_fairy.plan
            env.stages.ozo_fairy.plan = convertStagePlanStringToArray(env.stages.ozo_fairy.plan)
            env.stages.ozo_fairy.plan[72] = "Ϩ"

            env.jokzi.oldLostOnePlan = env.stages.ozo_lostone.plan
            env.stages.ozo_lostone.plan = convertStagePlanStringToArray(env.stages.ozo_lostone.plan)
            env.stages.ozo_lostone.plan[66] = "♠"

            let listener = {
                type: "stage_change",
                exec: (ev) => {
                    if(ev.detail.stage == "ozo_fairy" && !env.jokzi.event.observed) {
                        startDialogue("e_f_geli")
                        env.jokzi.event.seen()
                    }
                }
            }
            document.addEventListener(listener.type, listener.exec)
            env.jokzi.listeners.push(listener)
        },

        complete: ()=> {
            cutscene(false)

            vfx({type: "flash", state: true})
            env.jokzi.event.completed = true
            
            setTimeout(()=>{
                content.setAttribute("event", "normal")
                env.stage.querySelectorAll(".gridpiece[slug='Ϩ']").forEach(el=>{
                    el.innerHTML = ""
                    el.classList.remove('critical', 'dyp', 'blocks')
                    el.classList.add('empty', 'neglected')
                })
                
                env.stages.ozo_lostone.plan = env.jokzi.oldLostOnePlan
                env.stages.ozo_fairy.plan = env.jokzi.oldFairyPlan
                vfx({type: "flash", state: false})
            }, 800)
        },
    },

    f_stow: {
        //stowaway chillin with da fairy
        weight: 0.15,
        showIf: [["ozo__fairy_intro", true], ["e3a2__escapewin", true], ["ozo__ozogeli", true], ["ozo__e_f_stow", false]], //one-time
        chosen: ()=>{
            env.jokzi.oldFairyPlan = env.stages.ozo_fairy.plan
            env.stages.ozo_fairy.plan = convertStagePlanStringToArray(env.stages.ozo_fairy.plan)
            env.stages.ozo_fairy.plan[70] = "Ϯ"

            env.jokzi.oldLostOnePlan = env.stages.ozo_lostone.plan
            env.stages.ozo_lostone.plan = convertStagePlanStringToArray(env.stages.ozo_lostone.plan)
            env.stages.ozo_lostone.plan[50] = "♠"

            let listener = {
                type: "stage_change",
                exec: (ev) => {
                    if(ev.detail.stage == "ozo_fairy" && !env.jokzi.event.observed) {
                        startDialogue("e_f_stow")
                        env.jokzi.event.seen()
                    }
                }
            }
            document.addEventListener(listener.type, listener.exec)
            env.jokzi.listeners.push(listener)
        },

        complete: ()=> {},
    },

    f_effigies: {
        //effigies chillin with da fairy
        weight: 0.1,
        showIf: [["ozo__fairy_intro", true], ["citystreet__flower_beacon", true], ["effigy_gamer", true], ["ozo__e_f_effigies", false]],
        chosen: ()=>{
            env.jokzi.oldFairyPlan = env.stages.ozo_fairy.plan
            env.stages.ozo_fairy.plan = convertStagePlanStringToArray(env.stages.ozo_fairy.plan)
            
            env.stages.ozo_fairy.plan[81] = "Ε"
            env.stages.ozo_fairy.plan[83] = "Ε"
            env.stageEntities["Ε"].class = "critical notile"
            env.stageEntities["Ε"].contains.html = env.stageEntities["Ε"].contains.html.replaceAll("wanderer", "learner")

            // e4a1 - adrift_dancers alterations moved to its planAdjustment
            
            let listener = {
                type: "stage_change",
                exec: (ev) => {
                    if(ev.detail.stage == "ozo_fairy" && !env.jokzi.event.observed) {
                        startDialogue("e_f_effigies")
                        env.jokzi.event.seen()
                    }
                }
            }
            document.addEventListener(listener.type, listener.exec)
            env.jokzi.listeners.push(listener)
        },

        complete: ()=> {},
    },

    // ISABEL ZONE
    i_gelistow: {
        weight: 0.15,
        showIf: [["ozo__isabel_intro", true], ["e3a2__escapewin", true], ["ozo__ozogeli", true], ["effigy_dancer", true], ["ozo__e_i_gelistow", false]],
        chosen: ()=>{
            env.jokzi.oldFlowerPlan = env.stages.ozo_flower.plan
            env.stages.ozo_flower.plan = convertStagePlanStringToArray(env.stages.ozo_flower.plan)
            env.stages.ozo_flower.plan[68] = "Ϩ"
            env.stages.ozo_flower.plan[38] = "Ϯ"
            
            env.stageEntities['Ϯ'].contains.html += `
                <div class='dancerzets'>
                    <figure class="ozofriend akieffigy" style="--baseTransform: translateZ(calc(var(--gridTileSize) * 0.5));--danceMult: -0.25;" type="dancer">
                        <div class="target" entity="effigy"></div>
                        <img class="body" src="/img/local/uncosm/ozo/akieffigy_body2.gif">
                        <img class="head" src="/img/local/uncosm/ozo/akieffigy_head2.gif">
                    </figure>
                    
                    <figure class="ozofriend akieffigy" style="--baseTransform: translateZ(calc(var(--gridTileSize) * -0.5));--danceMult: 0.25;animation-delay: -1s;" type="dancer">
                        <div class="target" entity="effigy"></div>
                        <img class="body" src="/img/local/uncosm/ozo/akieffigy_body2.gif">
                        <img class="head" src="/img/local/uncosm/ozo/akieffigy_head2.gif">
                    </figure>
                </div>
            `

            env.jokzi.oldLostOnePlan = env.stages.ozo_lostone.plan
            env.stages.ozo_lostone.plan = convertStagePlanStringToArray(env.stages.ozo_lostone.plan)
            env.stages.ozo_lostone.plan[66] = "♠"
            env.stages.ozo_lostone.plan[50] = "♠"

            let listener = {
                type: "stage_change",
                exec: (ev) => {
                    if(ev.detail.stage == "ozo_flower" && !env.jokzi.event.observed) {
                        startDialogue("e_i_gelistow")
                        env.jokzi.event.seen()
                    }
                }
            }
            document.addEventListener(listener.type, listener.exec)
            env.jokzi.listeners.push(listener)

            env.entities["GELI"].actions.push({
                name: "let's talk",
                exec: ()=>{
                    env.jokzi.event.complete()
                },
                showIf: ["stageroom", "ozo_flower"]
            })
        },

        complete: ()=> {
            cutscene(true)
            chatter({ actor: "bsteli::happy", text:"all right!", readout: true, delay: 400})
            chatter({ actor: "bsteli", text:"meet me in my region!", readout: true, delay: 2000})

            setTimeout(() => {
                cutscene(false)

                vfx({type: "flash", state: true})
                env.jokzi.event.completed = true
                
                setTimeout(()=>{
                    chatter({actor: "sys", text: "ATTENTION::'thoughtform activity detected';'resource location altered'", readout: true})
                    content.setAttribute("event", "normal")
                    env.stage.querySelectorAll(".gridpiece[slug='Ϩ']").forEach(el=>{
                        el.innerHTML = ""
                        el.classList.remove('critical', 'dyp', 'blocks')
                        el.classList.add('empty', 'plain')
                    })
                    env.stage.querySelectorAll(".ozofriend.fakerloper").forEach(el=>el.remove())
                    
                    env.stages.ozo_lostone.plan = env.jokzi.oldLostOnePlan
                    env.stages.ozo_flower.plan = env.jokzi.oldFlowerPlan
                    vfx({type: "flash", state: false})
                }, 800)
                
            }, 3000);
        },
    },

    i_stow: {
        weight: -0.2,
        showIf: [["e3a2__escapewin", true], ["ozo__ozogeli", true], ["effigy_dancer", true]], // not one-time
        chosen: ()=>{
            env.jokzi.oldFlowerPlan = env.stages.ozo_flower.plan
            env.stages.ozo_flower.plan = convertStagePlanStringToArray(env.stages.ozo_flower.plan)
            env.stages.ozo_flower.plan[38] = "Ϯ"
            
            env.stageEntities['Ϯ'].contains.html += `
                <div class='dancerzets'>
                    <figure class="ozofriend akieffigy" style="--baseTransform: translateZ(calc(var(--gridTileSize) * 0.5));--danceMult: -0.25;" type="dancer">
                        <div class="target" entity="effigy"></div>
                        <img class="body" src="/img/local/uncosm/ozo/akieffigy_body2.gif">
                        <img class="head" src="/img/local/uncosm/ozo/akieffigy_head2.gif">
                    </figure>
                    
                    <figure class="ozofriend akieffigy" style="--baseTransform: translateZ(calc(var(--gridTileSize) * -0.5));--danceMult: 0.25;animation-delay: -1s;" type="dancer">
                        <div class="target" entity="effigy"></div>
                        <img class="body" src="/img/local/uncosm/ozo/akieffigy_body2.gif">
                        <img class="head" src="/img/local/uncosm/ozo/akieffigy_head2.gif">
                    </figure>
                </div>
            `

            env.jokzi.oldLostOnePlan = env.stages.ozo_lostone.plan
            env.stages.ozo_lostone.plan = convertStagePlanStringToArray(env.stages.ozo_lostone.plan)
            env.stages.ozo_lostone.plan[50] = "♠"

            let listener = {
                type: "stage_change",
                exec: (ev) => {
                    if(ev.detail.stage == "ozo_flower" && !env.jokzi.event.observed) {
                        env.jokzi.event.seen()
                    }
                }
            }
            document.addEventListener(listener.type, listener.exec)
            env.jokzi.listeners.push(listener)
        },

        complete: ()=> {},
    },

    i_geli: {
        weight: 0.1,
        showIf: [["ozo__isabel_intro", true], ["e3a2__escapewin", true], ["ozo__ozogeli", true], ["ozo__e_i_geli", false]],
        chosen: ()=>{
            env.jokzi.oldFlowerPlan = env.stages.ozo_flower.plan
            env.stages.ozo_flower.plan = convertStagePlanStringToArray(env.stages.ozo_flower.plan)
            env.stages.ozo_flower.plan[68] = "Ϩ"

            env.jokzi.oldLostOnePlan = env.stages.ozo_lostone.plan
            env.stages.ozo_lostone.plan = convertStagePlanStringToArray(env.stages.ozo_lostone.plan)
            env.stages.ozo_lostone.plan[66] = "♠"

            let listener = {
                type: "stage_change",
                exec: (ev) => {
                    if(ev.detail.stage == "ozo_flower" && !env.jokzi.event.observed) {
                        startDialogue("e_i_geli")
                        env.jokzi.event.seen()
                    }
                }
            }
            document.addEventListener(listener.type, listener.exec)
            env.jokzi.listeners.push(listener)

            env.entities["GELI"].actions.push({
                name: "let's talk",
                exec: ()=>{
                    env.jokzi.event.complete()
                },
                showIf: ["stageroom", "ozo_flower"]
            })
        },

        complete: ()=> {
            cutscene(true)
            chatter({ actor: "bsteli::happy", text:"all right!", readout: true, delay: 400})
            chatter({ actor: "bsteli", text:"meet me in my region!", readout: true, delay: 2000})

            setTimeout(() => {
                cutscene(false)

                vfx({type: "flash", state: true})
                env.jokzi.event.completed = true
                
                setTimeout(()=>{
                    chatter({actor: "sys", text: "ATTENTION::'thoughtform activity detected';'resource location altered'", readout: true})
                    content.setAttribute("event", "normal")
                    env.stage.querySelectorAll(".gridpiece[slug='Ϩ']").forEach(el=>{
                        el.innerHTML = ""
                        el.classList.remove('critical', 'dyp', 'blocks')
                        el.classList.add('empty', 'plain')
                    })
                    
                    env.stages.ozo_lostone.plan = env.jokzi.oldLostOnePlan
                    env.stages.ozo_flower.plan = env.jokzi.oldFlowerPlan
                    vfx({type: "flash", state: false})
                }, 800)
                
            }, 3000);
        },
    },

    i_fairy: {
        weight: 0,
        showIf: [["ozo__isabel_intro", true], ["ozo__fairy_intro", true], ["secavik", "beaconed"], ["ozo__e_i_fairy", false]],
        chosen: ()=>{
            env.jokzi.oldFlowerPlan = env.stages.ozo_flower.plan
            env.stages.ozo_flower.plan = convertStagePlanStringToArray(env.stages.ozo_flower.plan)
            env.stages.ozo_flower.plan[108] = "Ϣ"

            env.jokzi.oldFairyPlan = env.stages.ozo_fairy.plan
            env.stages.ozo_fairy.plan = convertStagePlanStringToArray(env.stages.ozo_fairy.plan)
            env.stages.ozo_fairy.plan[93] = "."

            let listener = {
                type: "stage_change",
                exec: (ev) => {
                    if(ev.detail.stage == "ozo_flower" && !env.jokzi.event.observed) {
                        startDialogue("e_i_fairy")
                        env.jokzi.event.seen()
                    }
                }
            }
            document.addEventListener(listener.type, listener.exec)
            env.jokzi.listeners.push(listener)
        },

        complete: ()=> {
            cutscene(false)

            vfx({type: "flash", state: true})
            env.jokzi.event.completed = true
            
            setTimeout(()=>{
                content.setAttribute("event", "normal")
                env.stage.querySelectorAll(".gridpiece[slug='Ϣ']").forEach(el=>{
                    el.innerHTML = ""
                    el.classList.remove('critical', 'dyp', 'blocks')
                    el.classList.add('empty', 'nothing')
                })
                
                env.stages.ozo_flower.plan = env.jokzi.oldFlowerPlan
                env.stages.ozo_fairy.plan = env.jokzi.oldFairyPlan
                vfx({type: "flash", state: false})
            }, 800)
        },
    },

    // DARK ZONE
    d_effigy1: {
        weight: -0.2,
        showIf: [["citystreet__flower_beacon", true], ["unity_lady", true]],
        chosen: ()=>{
            env.stages.ozo_adrift_darkroom.plan = convertStagePlanStringToArray(env.stages.ozo_adrift_darkroom.plan)
            env.stages.ozo_adrift_darkroom.plan[1539] = "ϵ"
            env.stageEntities["ϵ"].class = "critical alwaysvis still"
            env.stageEntities["ϵ"].contains.html = env.stageEntities["ϵ"].contains.html.replaceAll("wanderer", "lonely")

            env.stages.ozo_lady.plan = convertStagePlanStringToArray(env.stages.ozo_lady.plan)
            env.stages.ozo_lady.plan[57] = "░" 

            let listener = {
                type: "stage_change",
                exec: (ev) => {
                    if(ev.detail.stage == "ozo_adrift_darkroom" && !env.jokzi.event.observed) {
                        env.jokzi.event.seen()
                    }
                }
            }
            document.addEventListener(listener.type, listener.exec)
            env.jokzi.listeners.push(listener)
        },

        complete: ()=> {},
    },

    d_effigy2: {
        weight: -0.2,
        showIf: [["citystreet__flower_beacon", true], ["unity_lady", true]],
        chosen: ()=>{
            env.stages.ozo_adrift_emptydream.plan = convertStagePlanStringToArray(env.stages.ozo_adrift_emptydream.plan)
            env.stages.ozo_adrift_emptydream.plan[81] = "ϵ"
            env.stageEntities["ϵ"].class = "critical alwaysvis still"
            env.stageEntities["ϵ"].contains.html = env.stageEntities["ϵ"].contains.html.replaceAll("wanderer", "somber")

            env.stages.ozo_lady.plan = convertStagePlanStringToArray(env.stages.ozo_lady.plan)
            env.stages.ozo_lady.plan[59] = "░" 

            let listener = {
                type: "stage_change",
                exec: (ev) => {
                    if(ev.detail.stage == "ozo_adrift_emptydream" && !env.jokzi.event.observed) {
                        env.jokzi.event.seen()
                    }
                }
            }
            document.addEventListener(listener.type, listener.exec)
            env.jokzi.listeners.push(listener)
        },

        complete: ()=> {},
    },

    d_stow: { 
        weight: -0.1,
        showIf: [["e3a2__escapewin", true], ["ozo__ozogeli", true]],
        chosen: ()=>{
            env.stages.ozo_adrift_emptydream.plan = convertStagePlanStringToArray(env.stages.ozo_adrift_emptydream.plan)
            env.stages.ozo_adrift_emptydream.plan[81] = "Ϯ"
            env.stageEntities["Ϯ"].class += " alwaysvis"
            
            env.stages.ozo_lostone.plan = convertStagePlanStringToArray(env.stages.ozo_lostone.plan)
            env.stages.ozo_lostone.plan[50] = "♠"

            let listener = {
                type: "stage_change",
                exec: (ev) => {
                    if(ev.detail.stage == "ozo_adrift_emptydream" && !env.jokzi.event.observed) {
                        env.jokzi.event.seen()
                    }
                }
            }
            document.addEventListener(listener.type, listener.exec)
            env.jokzi.listeners.push(listener)

            env.entities["interloper"].actions.push({
                name: "hello?",
                exec: ()=>{
                    let text = [
                        "away",
                        "hear you",
                        "closer",
                        "still here",
                        "come back"
                    ].sample()
    
                    chatter({
                        actor: "stowaway",
                        text,
                        readout: true,
                        customEl: env.targetedEntityParent,
                        delay: 300
                    })
                }
            })
        },

        complete: ()=> {},
    },

    // e4a1 events for wakizet
    // slightly higher prio except for dark ozo
    d_wakizet: { 
        weight: -0.1,
        showIf: [["pit__f3_unity", true], ["ozo__wakizet-bt", true], ["ozo__e_w_d", false]],

        //hopefully a more sane way of handling event modifications lol
        //that hardcode shit got me rolling in the duirt like a beetle
        wakizetRoomModifier: (plan, stage) => {
            return plan.replace("æ", ".")            
        },

        darkRoomModifier: (plan, stage) => {
            return plan.replace("!", "æ")
        },

        chosen: function() {
            env.stages.ozo_stranger.eventModifier = this.wakizetRoomModifier
            env.stages.ozo_adrift_emptydream.eventModifier = this.darkRoomModifier

            let listener = {
                type: "stage_change",
                exec: (ev) => {
                    if(ev.detail.stage == "ozo_adrift_emptydream" && !env.jokzi.event.observed) {
                        startDialogue("e_w_d")
                        env.jokzi.event.seen()
                    }
                }
            }
            
            document.addEventListener(listener.type, listener.exec)
            env.jokzi.listeners.push(listener)
        },

        complete: ()=> {
            cutscene(false)

            vfx({type: "flash", state: true})
            env.jokzi.event.completed = true

            delete env.stages.ozo_adrift_emptydream.eventModifier
            delete env.stages.ozo_stranger.eventModifier
            
            setTimeout(()=>{
                content.setAttribute("event", "normal")
                refreshStage()
            }, 800)
        },
    },

    w_council: { 
        weight: 0.2,
        showIf: [["pit__f3_unity", true], ["ozo__wakizet-bt", true], ["ozo__e_w_council", false]],
        
        wakizetRoomModifier: (plan, stage) => plan.replace("æ", "."),
        eventRoomModifier: (plan, stage) => plan.replace("!", "æ"),

        chosen: function() {
            env.stages.ozo_stranger.eventModifier = this.wakizetRoomModifier
            env.stages.ozo_council.eventModifier = this.eventRoomModifier

            let listener = {
                type: "stage_change",
                exec: (ev) => {
                    if(ev.detail.stage == "ozo_council" && !env.jokzi.event.observed) {
                        startDialogue("e_w_council")
                        env.jokzi.event.seen()
                    }
                }
            }
            
            document.addEventListener(listener.type, listener.exec)
            env.jokzi.listeners.push(listener)

            env.entities["ækiZ¥Ét"].actions.push({
                name: "let's talk",
                exec: ()=>{
                    env.jokzi.event.complete()
                },
                showIf: ["stageroom", "ozo_council"]
            })
        },

        complete: ()=> {
            cutscene(true)
            chatter({ actor: "wakizet", text:"fine", readout: true, delay: 400})
            chatter({ actor: "wakizet", text:"come to my shelter", readout: true, delay: 2000})

            delete env.stages.ozo_council.eventModifier
            delete env.stages.ozo_stranger.eventModifier

            setTimeout(() => {
                cutscene(false)

                vfx({type: "flash", state: true})
                env.jokzi.event.completed = true
                
                setTimeout(()=>{
                    content.setAttribute("event", "normal")
                    chatter({actor: "sys", text: "ATTENTION::'thoughtform activity detected';'resource location altered'", readout: true})
                    refreshStage()
                }, 800)
                
            }, 3000);
        },
    },

    w_isabel: { 
        weight: 0.2,
        showIf: [["pit__f3_unity", true], ["ozo__wakizet-bt", true], ["ozo__e_w_isabel", false], ["ozo__isabel", true]],
        
        wakizetRoomModifier: (plan, stage) => plan.replace("æ", "."),
        eventRoomModifier: (plan, stage) => plan.replace("!", "æ"),

        chosen: function() {
            env.stages.ozo_stranger.eventModifier = this.wakizetRoomModifier
            env.stages.ozo_flower.eventModifier = this.eventRoomModifier

            let listener = {
                type: "stage_change",
                exec: (ev) => {
                    if(ev.detail.stage == "ozo_flower" && !env.jokzi.event.observed) {
                        startDialogue("e_w_isabel")
                        env.jokzi.event.seen()
                    }
                }
            }
            
            document.addEventListener(listener.type, listener.exec)
            env.jokzi.listeners.push(listener)

            env.entities["ækiZ¥Ét"].actions.push({
                name: "let's talk",
                exec: ()=>{
                    env.jokzi.event.complete()
                },
                showIf: ["stageroom", "ozo_flower"]
            })
        },

        complete: ()=> {
            cutscene(true)
            chatter({ actor: "wakizet", text:"fine. but we speak alone", readout: true, delay: 400})
            chatter({ actor: "wakizet", text:"come to my shelter", readout: true, delay: 2000})
            chatter({ actor: "wakizet", text:"isabel, we will finish later", readout: true, delay: 5000})

            delete env.stages.ozo_flower.eventModifier
            delete env.stages.ozo_stranger.eventModifier

            setTimeout(() => {
                cutscene(false)

                vfx({type: "flash", state: true})
                env.jokzi.event.completed = true
                
                setTimeout(()=>{
                    content.setAttribute("event", "normal")
                    chatter({actor: "sys", text: "ATTENTION::'thoughtform activity detected';'resource location altered'", readout: true})
                    refreshStage()
                }, 800)
                
            }, 6000);
        },
    },

    w_effigies: { 
        weight: 0.2,
        showIf: [["pit__f3_unity", true], ["ozo__wakizet-bt", true], ["ozo__e_w_effigies", false]],
        
        wakizetRoomModifier: (plan, stage) => plan.replaceAll("?", "Ä"),
        eventRoomModifier: (plan, stage) => plan.replace("A", ".").replace("a", ".").replace("Ä", "░"),

        chosen: function() {
            env.stages.ozo_stranger.eventModifier = this.wakizetRoomModifier
            env.stages.ozo_flower.eventModifier = this.eventRoomModifier

            let listener = {
                type: "stage_change",
                exec: (ev) => {
                    if(ev.detail.stage == "ozo_stranger" && !env.jokzi.event.observed) {
                        startDialogue("e_w_effigies")
                        env.jokzi.event.seen()
                    }
                }
            }
            
            document.addEventListener(listener.type, listener.exec)
            env.jokzi.listeners.push(listener)
        },

        complete: ()=> {
            cutscene(false)

            vfx({type: "flash", state: true})
            env.jokzi.event.completed = true

            delete env.stages.ozo_flower.eventModifier
            delete env.stages.ozo_stranger.eventModifier
            
            setTimeout(()=>{
                content.setAttribute("event", "normal")
                refreshStage()
            }, 800)
        },
    },

    w_fairy: { 
        weight: 0.2,
        showIf: [["pit__f3_unity", true], ["ozo__wakizet-bt", true], ["ozo__e_w_fairy", false]],
        
        wakizetRoomModifier: (plan, stage) => plan.replace("æ", "."),
        eventRoomModifier: (plan, stage) => plan.replace("!", "æ"),

        chosen: function() {
            env.stages.ozo_stranger.eventModifier = this.wakizetRoomModifier
            env.stages.ozo_fairy.eventModifier = this.eventRoomModifier

            let listener = {
                type: "stage_change",
                exec: (ev) => {
                    if(ev.detail.stage == "ozo_fairy" && !env.jokzi.event.observed) {
                        startDialogue("e_w_fairy")
                        env.jokzi.event.seen()
                    }
                }
            }
            
            document.addEventListener(listener.type, listener.exec)
            env.jokzi.listeners.push(listener)
        },

        complete: ()=> {
            cutscene(false)

            vfx({type: "flash", state: true})
            env.jokzi.event.completed = true

            delete env.stages.ozo_fairy.eventModifier
            delete env.stages.ozo_stranger.eventModifier
            
            setTimeout(()=>{
                content.setAttribute("event", "normal")
                refreshStage()
            }, 800)
        },
    },

    w_geli: { 
        weight: 0.2,
        showIf: [["pit__f3_unity", true], ["ozo__wakizet-bt", true], ["ozo__e_w_geli", false]],
        
        wakizetRoomModifier: (plan, stage) => plan.replace("æ", "."),
        eventRoomModifier: (plan, stage) => plan.replace("!", "æ"),

        chosen: function() {
            env.stages.ozo_stranger.eventModifier = this.wakizetRoomModifier
            env.stages.ozo_lostone.eventModifier = this.eventRoomModifier

            let listener = {
                type: "stage_change",
                exec: (ev) => {
                    if(ev.detail.stage == "ozo_lostone" && !env.jokzi.event.observed) {
                        startDialogue("e_w_geli")
                        env.jokzi.event.seen()
                    }
                }
            }
            
            document.addEventListener(listener.type, listener.exec)
            env.jokzi.listeners.push(listener)

            env.entities["ækiZ¥Ét"].actions.push({
                name: "let's talk",
                exec: ()=>{
                    env.jokzi.event.complete()
                },
                showIf: ["stageroom", "ozo_lostone"]
            })
        },

        complete: ()=> {
            cutscene(true)
            chatter({ actor: "wakizet", text:"fine", readout: true, delay: 400})
            chatter({ actor: "wakizet", text:"come to my shelter", readout: true, delay: 2000})

            delete env.stages.ozo_lostone.eventModifier
            delete env.stages.ozo_stranger.eventModifier

            setTimeout(() => {
                cutscene(false)

                vfx({type: "flash", state: true})
                env.jokzi.event.completed = true
                
                setTimeout(()=>{
                    content.setAttribute("event", "normal")
                    chatter({actor: "sys", text: "ATTENTION::'thoughtform activity detected';'resource location altered'", readout: true})
                    refreshStage()
                }, 800)
                
            }, 3000);
        },
    },

    /*
    flagged: {
        weight: 0,
        showIf: ()=>!check('hi'), // can be used to make only-once events

        chosen: ()=>{

        },

        weightMod: () => { // return is added to the weight. can be used for stuff like "more likely or even guaranteed if you've seen xyz"
            return 0.25
        }
    }
    */
}