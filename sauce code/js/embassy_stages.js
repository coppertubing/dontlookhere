//utilized in canvas floors to combat vram usage
env.stage.locales["research"] = [
    [".empty", "/img/local/embassy/tiles/empty.gif"],
    [".prop.blocks:not(.myseat, .bstrdbosspanel)", "/img/local/embassy/tiles/occupied.gif"]
]

env.stages['embassy_research'] = {
    creature: env.stageEntities.embassyCreature,
    locale: "research",
    
    exec: ()=> { 
        change("PAGE!!beenToResearch", true)
        env.embassy.updateStageData()
        content.classList.remove("archivehall")

        switch(check("PAGE!!embassy_day")) {
            case 3:
                document.querySelectorAll('.bozko.character, .kazki.character, .cavik.character, .gakvu.character, .tozik.character').forEach(e=>{
                    e.parentElement.classList.remove('prop', 'blocks')
                    e.parentElement.innerHTML = ""
                })
                
                if(!content.classList.contains("collapse")) toggleBgm(env.embassy.music)
                else if(isStageClear()) toggleBgm(env.embassy.music_collapse)
                else toggleBgm(env.embassy.music_unsafe)

                if(
                    check("PAGE!!crelocator_intro") && 
                    !check("PAGE!!archiveopen") &&
                    check("embassy__d3_movecmb-start") &&
                    !check("gameplay_off")
                ) {
                    startDialogue("d3_bstrdreveal")
                    document.querySelectorAll(".gridpiece[slug='4']").forEach(el=>{el.innerHTML = ""; el.classList.remove('prop', 'blocks')})
                } else if(check("PAGE!!archiveopen")) {
                    document.querySelectorAll(".gridpiece[slug='4']").forEach(el=>{el.innerHTML = ""; el.classList.remove('prop', 'blocks')})
                }
            break

            case 2:
                document.querySelectorAll('.character').forEach(e=>{
                    e.parentElement.classList.remove('prop', 'blocks')
                    e.parentElement.innerHTML = ""
                })
                
                toggleBgm(env.embassy.music)
            break

            case 1:
                if(!check("PAGE!!d1_kbcollected")) {
                    document.querySelectorAll('.kazki.character, .bozko.character').forEach(e=>{
                        e.parentElement.classList.remove('prop', 'blocks')
                        e.parentElement.innerHTML = ""
                    })
                }

                toggleBgm(env.embassy.music)
            break
        }
        
        env.stage.current.onStep()
    },

    onStep: ()=>{
        if(check("PAGE!!archiveopen")) {
            document.querySelectorAll('.holedoor').forEach(el=>el.classList.remove('hide'))
        }
    },

    entities: {
        r: {
            class: "door left",
            teleportSpot: 13,
            teleportTarget: "embassy_relocator",
            shouldFace: "up",
            exec: ()=>env.embassy.relocatorReturn = "research"
        },

        C: {
            class:"prop blocks",
            contains: {
                class: "timestopper",
                examineEntity: "timestopper",
                html: `
                <div class="layers">
                    <canvas class="timestople t1" sprite="/img/local/embassy/timestoptimize.gif, /img/textures/spotgradientinverse.gif" fit="stretch" baseWidth="5" baseHeight="5"></canvas>
                    <canvas class="timestople t2" sprite="/img/local/embassy/timestoptimize.gif, /img/textures/spotgradientinverse.gif" fit="stretch" baseWidth="4.5" baseHeight="4.5"></canvas>
                    <canvas class="timestople t3" sprite="/img/local/embassy/timestoptimize.gif, /img/textures/spotgradientinverse.gif" fit="stretch" baseWidth="4" baseHeight="4"></canvas>
                    <canvas class="timestople t4" sprite="/img/local/embassy/timestoptimize.gif, /img/textures/spotgradientinverse.gif" fit="stretch" baseWidth="3.5" baseHeight="3.5"></canvas>
                    <canvas class="timestople t5" sprite="/img/local/embassy/timestoptimize.gif, /img/textures/spotgradientinverse.gif" fit="stretch" baseWidth="3" baseHeight="3"></canvas>
                    <canvas class="timestople t6" sprite="/img/local/embassy/timestoptimize.gif, /img/textures/spotgradientinverse.gif" fit="stretch" baseWidth="2.5" baseHeight="2.5"></canvas>
                </div>
                <div class="tendrils">
                    <canvas class="timetendril t1" sprite="/img/local/embassy/timestoppertop.gif" fit="stretch" baseWidth="5" baseHeight="5"></canvas>
                    <canvas class="timetendril t2" sprite="/img/local/embassy/timestoppertop.gif" fit="stretch" baseWidth="5" baseHeight="5"></canvas>
                    <canvas class="timetendril t3" sprite="/img/local/embassy/timestoppertop.gif" fit="stretch" baseWidth="5" baseHeight="5"></canvas>
                </div>`
            }
        },

        c: {
            class:"prop blocks genericblocker",
        },

        "1": {
            class: "prop blocks",
            contains: {
                class: "chair",
                html: `<figure style="transform: rotateY(0deg)"></figure>`
            }
        },

        "2": {
            class: "prop myseat blocks",
            contains: {
                class: "chair hastarget",
                html: `<figure style="transform: rotateY(-45deg)">
                    <div class="target" entity="my seat"></div>
                </figure>`
            }
        },

        "3": {
            class: "prop blocks",
            contains: {
                class: "chair",
                html: `<figure style="transform: rotateY(45deg)"></figure>`
            }
        },

        "4": {
            class: "prop blocks",
            contains: {
                class: "chair",
                html: `<figure style="transform: rotateY(0deg)"></figure>`
            }
        },

        "5": {
            class: "prop blocks",
            contains: {
                class: "chair",
                html: `<figure style="transform: rotateY(-45deg)"></figure>`
            }
        },

        "6": {
            class: "prop blocks",
            contains: {
                class: "chair",
                html: `<figure style="transform: rotateY(45deg)"></figure>`
            }
        },

        D: {
            class:"prop blocks",
            contains: {
                class: "desk",
                html: `<figure>
                    <div class="doodad d1">
                        <div class="target" entity="cyst pile"></div>
                    </div>
                    <div class="doodad d2">
                        <div class="target" entity="cyst cluster"></div>
                    </div>
                    <div class="doodad d3">
                        <div class="target" entity="cyst pile"></div>
                    </div>
                    <div class="doodad d4">
                        <div class="target" entity="summarizer"></div>
                    </div>
                </figure>`
            }
        },

        d: {
            class:"prop blocks",
            contains: {
                class: "deskleg"
            }
        },

        L: {
            class:"prop blocks",
            contains: {
                class: "listener",
                examineEntity: "listener",
                html: `<figure>
                    <div class="cyst"></div>
                    <div class="cyst"></div>
                    <div class="cyst"></div>
                    <div class="callscreen"></div>
                </figure>`
            }
        },

        "☻": {
            class: "holedoor hide",
            teleportTarget: "embassy_archivalintro",
            teleportSpot: 4,
            lockFlag: "PAGE!!archiveopen",
            shouldFace: 'up'
        }
    },

    width: 13,
    plan: [
        'N','l','G','L','░','░','L','░','░','L','░','l','.',
        '.','░','░','░','░','░','░','░','░','░','░','░','.',
        '.','░','░','░','░','░','1','░','░','░','░','░','.',
        '.','░','░','░','6','c','T','c','2','░','░','░','.',
        '.','░','░','░','c','c','c','c','c','░','░','d','.',
        'r','p','░','░','c','c','C','c','c','░','v','D','.',
        '.','░','░','░','c','c','c','c','c','░','░','d','.',
        '.','░','░','░','5','c','c','c','3','░','░','░','.',
        '.','░','░','░','K','░','4','░','░','░','░','░','☻',
        '.','░','░','░','░','░','k','░','░','░','░','░','.',
        '.','l','░','░','░','░','░','░','░','░','░','l','S',
    ]
}

env.stages['embassy_personnel'] = {
    creature: env.stageEntities.embassyCreature,
    exec: ()=> { 
        env.embassy.updateStageData()
        env.embassy.regenRandobesk()

        switch(check("PAGE!!embassy_day")) {
            case 3:
                document.querySelectorAll('.character:not(.collapser)').forEach(e=>{
                    e.parentElement.classList.remove('prop', 'blocks')
                    e.parentElement.innerHTML = ""
                })
                
                if(isStageClear()) toggleBgm(env.embassy.music_collapse)
                else toggleBgm(env.embassy.music_unsafe)
            break

            case 2:
                toggleBgm(env.embassy.music)
            break

            case 1:
                document.querySelectorAll('.character.cavik, .character.bozko').forEach(e=>{
                    e.parentElement.classList.remove('prop', 'blocks')
                    e.parentElement.innerHTML = ""
                })

                toggleBgm(env.embassy.music)
            break
        }
    },
    locale: "research",

    entities: {
        "r": {
            class: "door up",
            teleportSpot: 37,
            teleportTarget: "embassy_relocator",
            shouldFace: 'up',
            exec: ()=>env.embassy.relocatorReturn = "personnel"
        },
        
        "}": {
            class: "door left",
            teleportSpot: 85,
            teleportTarget: "nothing",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'akizet', text: 'it is locked', readout: true})
        },
        
        "{": {
            class: "door right",
            teleportSpot: 85,
            teleportTarget: "nothing",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'akizet', text: 'it is locked', readout: true})
        },

        "a": {
            class: "door right",
            teleportSpot: 15,
            teleportTarget: "embassy_quarters"
        },

        "g": {
            class:"prop blocks",
            contains: {
                id: "spiregolem",
                class: "spiregolem",
                examineEntity: "attendant"
            }
        },
    },

    enterDirection: "down",
    width: 7,
    plan: [
        'N','l','░','g','░','l','.',
        '}','░','░','░','░','░','.',
        '.','░','░','░','░','░','.',
        '.','░','░','░','░','░','a',
        '.','░','░','░','░','░','.',
        '}','░','░','░','░','░','.',
        '.','░','░','░','░','+','.',
        '.','░','░','░','░','░','{',
        '.','░','░','░','░','░','.',
        '}','░','░','░','░','░','.',
        '.','░','░','░','░','v','.',
        '.','░','░','░','░','░','{',
        '.','░','░','░','░','k','.',
        '}','░','░','░','░','░','.',
        '.','░','░','░','░','░','.',
        '.','░','░','░','░','░','{',
        '.','l','░','p','░','l','S',
        '.','.','.','r','.','.','.',
    ],
}

env.stages['embassy_quarters'] = {
    locale: "research",
    creature: env.stageEntities.embassyCreature,
    exec: ()=> { 
        env.embassy.updateStageData()
        toggleBgm(page.bgm)
    },

    entities: {
        "q": {
            class: "door left",
            teleportSpot: 26,
            teleportTarget: "embassy_personnel",
            shouldFace: 'left',
            lockFlag: "PAGE!!akiroomunlocked",
            lockExec: ()=>chatter({actor: 'akizet', text: 'i should check the cyst first', readout: true})
        },

        d: {
            class:"prop blocks",
            contains: {
                class: "desk",
                html: `<figure>
                    <div class="doodad d1">
                        <div class="target" entity="face stand"></div>
                    </div>
                    <div class="doodad d2">
                        <div class="target" entity="kalstik stand"></div>
                    </div>
                    <div class="doodad d3">
                        <div class="target" entity="cyst cluster"></div>
                    </div>
                    <div class="doodad catalyst"><div class="target" entity="mystery cyst"></div></div>
                </figure>`
            }
        },

        b: {
            class:"prop blocks",
            contains: {
                class: "bed",
                examineEntity: "rejuvenation chamber",
                html: `<figure></figure>`
            }
        },

        c: {
            class: "prop blocks",
            contains: {
                class: "container",
                html: `<figure style="transform: rotateY(45deg)">
                    <div class="target" entity="container"></div>
                </figure>`
            }
        },

        o: {
            class: "prop blocks",
            contains: {
                class: "container",
                html: `<figure style="transform: rotateY(135deg)">
                    <div class="target" entity="container"></div>
                </figure>`
            }
        },

        C: {
            class: "prop blocks",
            contains: {
                class: "container",
                html: `<figure style="transform: rotateY(215deg) translateZ(calc(-0.2 * var(--gridTileSize)))">
                    <div class="target" entity="container"></div>
                </figure>`
            }
        },

        L: {
            class: "prop blocks",
            contains: {
                class: "closet",
                examineEntity: "clothing storage",
                html: `<figure></figure>`
            }
        },

        x: {
            class:"prop blocks",
            contains: {
                class: "deskleg"
            }
        },

        X: {
            class:"prop blocks genericblocker",
        },
    },

    width: 7,
    enterDirection: 'left',
    plan: [
        'N','l','x','d','x','l','.',
        '.','░','░','░','░','X','.',
        'q','░','░','░','p','b','.',
        '.','░','░','░','░','X','.',
        '.','l','o','L','C','l','S',
    ]
}


/* e3a2 engoodening addition for the reworked cyst scene */
env.stages['echovision'] = {
    locale: "echo",
    creature: env.stageEntities.embassyCreature,
    exec: ()=> { 
        env.embassy.updateStageData()
        toggleBgm(page.bgm)

        content.querySelectorAll(".path-limited").forEach((el, i)=>{
            el.style.setProperty("--floatyform", `translate(${rand(-700, 700)}%, ${rand(-200, 200)}%) rotate(${rand(-180, 180)}deg) rotateX(${rand(-180, 180)}deg) rotateY(${rand(-180, 180)}deg)`)
        });
        
        [".empty", ".step1.empty", ".step2.empty", ".step3.empty"].forEach(stepClass=>{
            let query = content.querySelectorAll(stepClass)
            query.forEach((step, i)=>{
                step.style.setProperty("--i", query.length - i)
                setTimeout(()=>step.classList.add("initialized"), 10)
            })
        })
    },

    detonate: ()=>{
        document.querySelectorAll(".gridpiece.empty").forEach(el=>el.style.transform = `translateZ(-50px) translate(${rand(-700, 700)}%, ${rand(-200, 200)}%) rotate(${rand(-180, 180)}deg) rotateX(${rand(-180, 180)}deg) rotateY(${rand(-180, 180)}deg)`)
        body.classList.add("detonating")
    },

    leaveExec: ()=>{
        body.classList.remove("detonating", "pathstep1", "pathstep2", "pathstep3", "pathstep0")
    },

    entities: {
        "░": {
            class: "empty plain step0 path-limited"
        },

        "1": {
            class: "empty plain step1 path-limited"
        },

        "e": {
            class: "empty plain step1 path-limited dialoguetile",
            exec: ()=>{
                if(!check("PAGE!!e1")) startDialogue("echo1")
            }
        },

        "!": {
            class: "blocks step1 path-limited floaty"
        },

        "2": {
            class: "empty plain step2 path-limited"
        },

        "@": {
            class: "blocks step2 path-limited floaty"
        },

        "3": {
            class: "empty plain step3 path-limited"
        },

        "#": {
            class: "blocks step3 path-limited floaty"
        },

        "O": {
            class: "notile echohost",
            contains: {
                dyp: {
                    class: "echosprite",
                    image: 'url(/img/textures/disruptionM.gif)',
                    width: 0.25,
                    height: 0.25,
                }
            } 
        },

        "T": {
            class: "notile echoprop grouphost",
            contains: {
                html: `<div class="wake"></div><div class="silent"></div>`,
                dyp: {
                    class: "groupgfx",
                    image: "transparent",
                    width: 1,
                    height: 1,
                    transform: "translate(100%, -200%)"
                }
            } 
        },

        "C": {
            class: "notile echoprop callhost",
            contains: {
                dyp: {
                    class: "callgfx",
                    width: 2,
                    height: 2,
                    transform: "translate(-50%, -75%)",
                    image: "url(/img/local/ocean/ship/m.gif)"
                }
            } 
        },

        "R": {
            class: "notile crowdhost",
            contains: {
                html: "<div class='crowd'></div><div class='crowd'></div>",
                dyp: {
                    class: "crowdgfx",
                    image: "transparent",
                    width: 1,
                    height: 1,
                    transform: "translate(100%, -100%) translateZ(var(--gridTileSize))"
                }
            } 
        },
    },

    width: 5,
    enterDirection: 'down',
    plan: `
        O####
        #333#
        ##3##
        .#3.#
        #.3..
        ..2..
        @.2..
        ..2.@
        ..2..
        @R2@.
        .T2C@
        @.2..
        !.1..
        ..e!!
        ..1..
        .!1.!
        ..1..
        ..1!.
        ..░..
        ..░..
        ..░..
        ░.░..
        ..░.░
        ░.░░.
        .░░░░
        ░░p░.
    `
}


env.stages['embassy_recreation'] = {
    creature: env.stageEntities.embassyCreature,
    locale: "research",
    exec: ()=> { 
        env.embassy.updateStageData()
        env.embassy.regenRandobesk()
        change("PAGE!!recreation_leavable", true)

        switch(check("PAGE!!embassy_day")) {
            case 3:
                document.querySelectorAll('.character:not(.collapser), .prop .chair, .prop .container').forEach(e=>{
                    e.parentElement.classList.remove('prop', 'blocks')
                    e.parentElement.innerHTML = ""
                })
                
                if(!check('PAGE!!crecreation_intro')) {
                    startDialogue("d3_rec_enter")
                    change('PAGE!!crecreation_intro', true)

                    if(!check("PAGE!!mindcore1extracted") || !check("PAGE!!mindcore2extracted")) change("PAGE!!recreation_leavable", false)
                }
                
                if(isStageClear()) toggleBgm(env.embassy.music_collapse)
                else toggleBgm(env.embassy.music_unsafe)

                document.querySelectorAll('.gridpiece[slug="r"]').forEach(el=>{el.setAttribute('spot', 22); el.setAttribute('shouldFace', 'right')})
            break

            case 1:
                document.querySelectorAll('.character.tozik, .character.gakvu, .collapseonly').forEach(e=>{
                    e.parentElement.classList.remove('prop', 'blocks')
                    e.parentElement.innerHTML = ""
                })
                toggleBgm(env.embassy.music)
            break

            default:
                document.querySelectorAll('.character.bozko, .character.kazki, .collapseonly').forEach(e=>{
                    e.parentElement.classList.remove('prop', 'blocks')
                    e.parentElement.innerHTML = ""
                })
                toggleBgm(env.embassy.music)
            break
        }
    },

    onStep: ()=>{
        if(!content.classList.contains("collapse")){
            env.stage.real.classList.add("dynocam")
            if(env.stage.creatureLoc.y < 6) {
                env.stage.container.setAttribute("swapos", "bar")
            } else if(env.stage.creatureLoc.x > 7) {
                env.stage.container.setAttribute("swapos", "kazkicorner")
            } else {
                env.stage.container.removeAttribute("swapos")
            }
        }
    },

    //greater than 7 on both xy = kazkibozko corner

    entities: {
        "r": {
            class: "door up",
            teleportSpot: 13,
            teleportTarget: "embassy_relocator",
            shouldFace: "up",
            lockFlag: "PAGE!!recreation_leavable",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'WE ARE NOT LEAVING WITHOUT FREEING THE TWO QOU', readout: true}),
            exec: ()=>env.embassy.relocatorReturn = "recreation"
        },

        "B": {
            class: "prop blocks",
            contains: {
                class: "bar",
                html: `<figure><div class="target" entity="simulacra dispensary"></div></figure>`,
            }
        },

        "t": {
            class: "prop blocks",
            contains: {
                class: "table",
                html: `<figure></figure>`
            }
        },

        b: {
            class:"prop blocks genericblocker",
        },

        d: {
            class:"prop blocks",
            contains: {
                class: "deskleg"
            }
        },

        "f": {
            class:"prop blocks",
            contains: {
                id: "barfriend",
                examineEntity: "barfriend",
                class: "barfriend character collapser",
                html: `<figure></figure>`
            }
        },

        "A": {
            class: "prop blocks",
            contains: {
                class: "canopy",
                html: `<figure>
                    <div class="lid"></div>
                    <div class="deskleg"></div>
                </figure>`
            }
        },

        "↔": {
            class: "prop blocks",
            contains: {
                class: "chair",
                html: `<figure style="transform: rotateY(90deg)"></figure>`
            }
        },

        "↕": {
            class: "prop blocks",
            contains: {
                class: "chair",
                html: `<figure></figure>`
            }
        },

        "O": {
            class: "cornerbooth blocks genericblocker",
            contains: {
                class: "boothwalls",
                html: `<figure></figure>`
            }
        },

        "W": {
            class: "prop blocks",
            contains: {
                class: "window",
                html: `<figure>
                    <div class="target" entity="window"></div>
                </figure>`
            }
        },

        c: {
            class: "prop blocks",
            contains: {
                class: "container",
                html: `<figure style="transform: rotateY(-45deg)"></figure>`
            }
        },

        L: {
            class:"prop blocks",
            contains: {
                class: "listener",
                examineEntity: "listener",
                html: `<figure>
                    <div class="cyst"></div>
                    <div class="cyst"></div>
                    <div class="cyst"></div>
                    <div class="callscreen"></div>
                </figure>`
            }
        },

        "ö": {
            contains: {
                id: "foe",
                class: "evil staysdead collapseonly",
                type: "recreation_containers_1",
                dialogue: "d3_genericenemy",
                html: `<figure class="evilcontainer"><div class="target" entity="hostile container"></div></figure>`
            }
        },

        "6": {
            contains: {
                id: "foe",
                class: "evil staysdead collapseonly",
                type: "recreation_containers_2",
                dialogue: "d3_genericenemy",
                html: `<figure class="evilcontainer"><div class="target" entity="hostile container"></div></figure>`
            }
        },

        "ô": {
            contains: {
                id: "foe",
                class: "evil staysdead collapseonly",
                type: "recreation_containers_3",
                dialogue: "d3_genericenemy",
                html: `<div class="collapsed lamp"><figure><div class="target" entity="hostile veilklight"></div></figure></div>`
            }
        },

        "Q": {
            class: "prop chartile blocks",
            contains: {
                class: "dyingqou collapseonly",
                examineEntity: "damaged qou body",
                html: `<figure></figure>`
            }
        },

        "q": {
            class: "prop chartile blocks",
            contains: {
                class: "dyingqou collapseonly",
                examineEntity: "mangled qou body",
                html: `<figure></figure>`
            }
        },

        'N': { 
            class: "blocks cwall north",
            contains: {
                html: `
                    <canvas class="wall" sprite="/img/local/embassy/tiles/cavewall.gif" repeat="repeat-x" fit="stretch-y" baseWidth="[wallW]" baseHeight="6"></canvas>
                    <canvas class="wall" sprite="/img/local/embassy/tiles/cavewall.gif" repeat="repeat-x" fit="stretch-y" baseWidth="[wallH]" baseHeight="6"></canvas>
                `
            }
        },

        'S': { 
            class: "blocks cwall south",
            contains: {
                html: `
                    <canvas class="wall" sprite="/img/local/embassy/tiles/cavewall.gif" repeat="repeat-x" fit="stretch-y" baseWidth="[wallH]" baseHeight="6"></canvas>
                    <canvas class="wall" sprite="/img/local/embassy/tiles/cavewall.gif" repeat="repeat-x" fit="stretch-y" baseWidth="[wallW]" baseHeight="6"></canvas>
                `
            }
        },
    },

    width: 13,
    plan: [
        'N','░','░','b','b','b','B','b','b','b','░','░','.',
        '.','░','+','b','b','b','f','b','b','b','+','░','.',
        '.','░','░','░','░','░','ô','q','T','░','░','░','.',
        '.','░','░','↕','░','░','░','░','░','↕','░','░','.',
        'G','6','↔','A','↔','░','░','░','↔','A','↔','░','.',
        '.','░','░','↕','Q','░','░','░','+','↕','░','░','.',
        '.','░','░','░','░','░','ö','░','░','░','░','░','.',
        '.','░','░','░','░','░','░','░','░','░','░','░','.',
        '.','░','░','░','░','░','░','░','░','░','░','░','.',
        '.','c','-','░','░','░','░','░','░','░','░','K','.',
        '.','L','c','░','░','░','p','░','░','░','k','W','S',
        '.','.','.','.','.','.','r','.','.','.','.','.','O',
    ]
}

/* COLLAPSE STAGES */

env.stages['embassy_cpersonnel'] = {
    creature: env.stageEntities.embassyCreature,
    exec: ()=> { 
        env.embassy.updateStageData()
                
        if(isStageClear()) toggleBgm(env.embassy.music_collapse)
        else toggleBgm(env.embassy.music_unsafe)

        if(!check('PAGE!!cpersonnel_intro')) {
            startDialogue("d3_person_intro")
            change('PAGE!!cpersonnel_intro', true)
        }        
    },
    locale: "research",

    entities: {
        "r": {
            class: "door up",
            teleportSpot: 26,
            teleportTarget: "embassy_relocator",
            shouldFace: 'left',
            exec: ()=>env.embassy.relocatorReturn = "personnel"
        },
        
        "}": {
            class: "door left",
            teleportSpot: 85,
            teleportTarget: "nothing",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'akizet', text: 'it is locked', readout: true})
        },
        
        "{": {
            class: "door right",
            teleportSpot: 85,
            teleportTarget: "nothing",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'akizet', text: 'it is locked', readout: true})
        },

        ">": {
            class: "door left",
            teleportTarget: "embassy_cquarters1",
            shouldFace: "right"
        },

        "<": {
            class: "door left",
            teleportTarget: "embassy_cquarters2",
            shouldFace: "left"
        },

        "♥": {
            class: "door left",
            teleportTarget: "embassy_cquarters3",
            shouldFace: "left",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'akizet', text: 'it is locked', readout: true})
            /*lockFlag: "PAGE!!q3unlocked",
            lockExec: ()=>startDialogue('d3_person_locked')*/
        }, 

        "Q": {
            class: "prop blocks",
            contains: {
                class: "dyingqou collapseonly",
                examineEntity: "qou body",
                html: `<figure></figure>`
            }
        },

        "ö": {
            contains: {
                id: "foe",
                class: "evil staysdead collapseonly",
                type: "attendant_squad_1",
                dialogue: "d3_genericenemy",
                html: `<figure class="spiregolem"><div class="target" entity="attendant"></div></figure>`
            }
        },

        "☻": {
            contains: {
                id: "foe",
                class: "evil staysdead collapseonly",
                type: "attendant_squad_2",
                dialogue: "d3_genericenemy",
                html: `<figure class="spiregolem"><div class="target" entity="attendant"></div></figure>`
            }
        },

        "♦": {
            contains: {
                id: "foe",
                class: "evil staysdead collapseonly",
                type: "attendant_squad_3",
                dialogue: "d3_genericenemy",
                html: `<figure class="spiregolem"><div class="target" entity="attendant"></div></figure>`
            }
        },
    },

    enterDirection: "down",
    width: 7,
    plan: [
        'N','l','Q','░','░','l','.',
        '<','░','░','░','░','░','.',
        '.','░','░','░','░','░','.',
        '.','░','░','░','░','░','{',
        '.','░','░','░','░','░','.',
        '}','░','░','░','░','Q','.',
        '.','░','ö','░','░','░','.',
        '.','░','░','░','░','░','{',
        '.','Q','░','♦','░','░','.',
        '>','░','░','░','░','░','.',
        '.','░','░','░','░','░','.',
        '.','░','░','░','░','░','{',
        '.','l','░','p','░','l','S',
        '.','.','.','r','.','.','.',
    ]
}

env.stages['embassy_cquarters1'] = {
    creature: env.stageEntities.embassyCreature,
    exec: ()=> { 
        env.embassy.updateStageData()
        toggleBgm(env.embassy.music_safe)

        if(!check('PAGE!!miltzameet')) {
            startDialogue("d3r1")
            change('PAGE!!miltzameet', true)
        } else document.querySelectorAll('.character.miltza').forEach(e=>{
            e.parentElement.classList.remove('prop', 'blocks')
            e.parentElement.innerHTML = ""
        })
    },
    locale: "research",

    entities: {
        "q": {
            class: "door left",
            teleportSpot: 64,
            teleportTarget: "embassy_cpersonnel",
            shouldFace: 'right',
        },

        d: {
            class:"prop blocks",
            contains: {
                class: "desk",
                html: `<figure>
                    <div class="doodad d1">
                        <div class="target" entity="cyst cluster"></div>
                    </div>
                    <div class="doodad d2">
                        <div class="target" entity="veilk models"></div>
                    </div>
                    <div class="doodad d3">
                        <div class="target" entity="sculptor"></div>
                    </div>
                </figure>`
            }
        },

        b: {
            class:"prop blocks",
            contains: {
                class: "bed",
                examineEntity: "rejuvenation chamber",
                html: `<figure></figure>`
            }
        },

        c: {
            class: "prop blocks",
            contains: {
                class: "container destroyed",
                html: `<figure style="transform: rotateY(45deg)">
                    <div class="target" entity="container"></div>
                </figure>`
            }
        },

        o: {
            class: "prop blocks",
            contains: {
                class: "container destroyed",
                html: `<figure style="transform: rotateY(-100deg);">
                    <div class="target" entity="container"></div>
                </figure>`
            }
        },

        C: {
            class: "prop blocks",
            contains: {
                class: "container",
                html: `<figure style="transform: rotateY(215deg) translateZ(calc(-0.2 * var(--gridTileSize)))">
                    <div class="target" entity="container"></div>
                </figure>`
            }
        },

        L: {
            class: "prop blocks",
            contains: {
                class: "closet",
                examineEntity: "clothing storage",
                html: `<figure></figure>`
            }
        },

        x: {
            class:"prop blocks",
            contains: {
                class: "deskleg"
            }
        },

        X: {
            class:"prop blocks genericblocker",
        },

        i: {
            class:"prop blocks notile",
            contains: {
                class: "lamp",
                html: `<figure><div class="target" entity="veilklight"></div></figure>`
            }
        },

        z: {
            class:"prop blocks notile",
            contains: {
                class: "eyeart",
                html: `<figure><div class="target" entity="unkind eye"></div></figure>`
            }
        },
    },

    width: 7,
    shouldFace: 'left',
    plan: [
        '.','.','.','z','.','.','.',
        '.','l','x','d','x','l','.',
        '.','░','░','░','░','X','.',
        'q','p','░','░','░','b','.',
        '.','░','░','o','░','X','.',
        '.','l','C','L','M','░','.',
        '.','.','.','i','.','.','.',
    ]
}

env.stages['embassy_cquarters2'] = {
    creature: env.stageEntities.embassyCreature,

    exec: ()=> { 
        env.embassy.updateStageData()
        toggleBgm(env.embassy.music_safe)

        if(!check('PAGE!!kazkiroom')) {
            startDialogue("d3r2")
            change('PAGE!!kazkiroom', true)
        }
        
        env.stage.current.onStep()
    },
    locale: "research",

    onStep: ()=>{
        if(check("PAGE!!kazkiambush")) {
            content.querySelectorAll('#realgrid .container:not(.destroyed)').forEach(el=>{
                el.classList.add('destroyed')
            })
        }
    },

    entities: {
        "q": {
            class: "door right fakeunlock",
            teleportSpot: 8,
            teleportTarget: "embassy_cpersonnel",
            shouldFace: 'right',
            lockFlag: "PAGE!!kazkiambush",
            lockExec: ()=>startDialogue('d3r2_ambush')
        },

        C: {
            class:"prop blocks genericblocker",
        },

        b: {
            class:"prop blocks",
            contains: {
                class: "bed",
                examineEntity: "rejuvenation chamber",
                html: `<figure></figure>`
            }
        },

        X: {
            class:"prop blocks genericblocker",
        },

        "↔": {
            class: "prop blocks notile",
            contains: {
                class: "chair",
                html: `<figure style="transform: translateX(180%) translateZ(calc(var(--gridTileSize) * 0.4)) rotateY(40deg)"></figure>`
            }
        },

        D: {
            class:"prop blocks",
            contains: {
                class: "desk",
                html: `<figure>
                    <div class="doodad d1">
                        <div class="target" entity="simulacra"></div>
                    </div>
                    <div class="doodad d2">
                        <div class="target" entity="manipulation slab"></div>
                    </div>
                    <div class="doodad d3">
                        <div class="target" entity="face stand"></div>
                    </div>
                </figure>`
            }
        },

        I: {
            class:"prop blocks",
            contains: {
                class: "lamp collapsed",
                html: `<figure><div class="target" entity="veilklight"></div></figure>`
            }
        },

        d: {
            class:"prop blocks",
            contains: {
                class: "deskleg"
            }
        },

        c: {
            class: "prop blocks",
            contains: {
                class: "container showalways",
                html: `<figure style="transform: rotateY(-135deg)">
                    <div class="target" entity="conspicuous container"></div>
                </figure>`
            }
        },

        g: {
            class: "prop blocks notile",
            contains: {
                class: "kazkiguns",
                html: `<div class="target" entity="bright weapons"></div>`
            }
        },

        L: {
            class: "prop blocks",
            contains: {
                class: "shelf",
                examineEntity: "storage display",
                html: `<figure></figure>`
            }
        },
    },

    width: 7,
    shouldFace: 'left',
    plan: [
        '.','.','.','.','.','.','.',
        '.','l','X','b','X','l','.',
        '↔','d','░','░','░','░','.',
        'g','D','░','░','░','p','q',
        '.','d','░','░','░','c','.',
        '.','l','C','L','c','I','.',
        '.','.','.','.','.','.','.',
    ]
}

//ARCHIVAL BONUS AREA FOR EP2
//Archival intro - short connective area with intro enemy
//should probably shift styles based on depth
env.stages['embassy_archivalintro'] = {
    creature: env.stageEntities.embassyCreature,
    exec: ()=> { 
        env.embassy.updateStageData()

        if(isStageClear()) toggleBgm(env.embassy.music_collapse)
        else toggleBgm(env.embassy.music_unsafe)

        content.classList.remove("archives", "show-walls")
        content.classList.add("archivehall")

        setTimeout(env.stage.current.onStep, 500)
    },

    onStep: ()=>{
        let strength = Math.clamp((1 / (env.stage.stageH - 3)) * (env.stage.creatureLoc.y - 3), 0, 1)
        content.style.setProperty('--bstrdcontrol', strength)  
    },
    locale: "research",

    entities: {
        "v": {
            class: "door down",
            teleportSpot: 115,
            teleportTarget: "embassy_research",
            shouldFace: 'left',
        },

        "^": {
            class: "door up bstrdoor",
            teleportSpot: 52,
            teleportTarget: "embassy_archivalvein",
            shouldFace: 'down',
        },

        "ö": {
            contains: {
                id: "foe",
                class: "evil staysdead collapseonly",
                type: "archivetutorial",
                dialogue: "d3_bstrdintro",
                html: `<figure class="archivalgolem"><div class="target" entity="archival golem"></div></figure>`
            }
        },

        "♠": {
            exec: ()=> {
                if(document.querySelectorAll('.evil') && !check("PAGE!!archivewarn")) {
                    chatter({actor: 'akizet', text: 'beware - it is as i feared', readout: true})
                    setTimeout(()=>chatter({actor: 'akizet', text: 'archival golems are formed of black corru...', readout: true}), 2000)
                    setTimeout(()=>chatter({actor: 'akizet', text: 'they are particularly tough!', readout: true}), 4000)
                    change("PAGE!!archivewarn", true)
                }
            }
        },
    },

    width: 3,
    plan: [
        '.','v','.',
        '.','p','.',
        '.','♠','.',
        '.','░','.',
        '.','░','.',
        '.','░','.',
        '.','░','.',
        '.','░','.',
        '.','░','.',
        '.','░','.',
        '.','░','.',
        '.','░','.',
        '.','░','.',
        '.','░','.',
        '.','░','.',
        '.','ö','.',
        '.','^','.',
    ],
}

//Main archival hall - a long hall you exit from the center, with a door directly in front - locked tho
//both sides have doors
env.stages['embassy_archivalvein'] = {
    creature: env.stageEntities.embassyCreature,
    exec: ()=> { 
        env.embassy.updateStageData()
        
        if(isStageClear()) toggleBgm(env.embassy.music_collapse)
        else toggleBgm(env.embassy.music_unsafe)

        content.classList.add("archives", "show-walls")
        content.classList.remove("archivehall", "bastard")
    },
    locale: "research",

    entities: {
        "^": {
            class: "door up",
            teleportSpot: 46,
            teleportTarget: "embassy_archivalintro",
            shouldFace: 'down',
        },

        "v": {
            class: "door down always-targeted",
            teleportTarget: "embassy_archivalcore_sensitive",
            teleportSpot: 45,
            examineEntity: "bstrd door",
            lockFlag: "PAGE!!bstrdlock",
            shouldFace: 'left',
            lockExec: ()=>chatter({actor: 'akizet', text: 'it is locked', readout: true})
        },

        "}": {
            class: "door left",
            teleportSpot: 26,
            teleportTarget: "embassy_archivalcore",
            shouldFace: 'left'
        },
        
        "{": {
            class: "door right",
            teleportSpot: 26,
            teleportTarget: "embassy_archivaldelivery",
            shouldFace: 'left'
        },

        "ö": {
            contains: {
                id: "foe",
                class: "evil staysdead collapseonly",
                type: "archivecommon",
                dialogue: "d3_genericenemy",
                html: `<figure class="archivalgolem"><div class="target" entity="archival golem"></div></figure>`
            }
        },

        "£": {
            contains: {
                id: "foe",
                class: "evil staysdead collapseonly maintcloak",
                type: "archivecloaktainer",
                dialogue: "d3_genericenemy",
                html: `<figure class="spritestack">
                    <img class="sprite" style="width: 100%;" src="/img/sprites/combat/foes/maintcloak.gif">
                    <img class="sprite" src="/img/sprites/combat/foes/mainthead.gif">
                    <img class="sprite" src="/img/sprites/combat/foes/mainthead.gif">
                    <div class="target" entity="jutskin"></div>
                </figure>`
            }
        },

        'N': { 
            class: "blocks cwall north",
            contains: {
                html: `
                    <canvas class="wall" sprite="/img/local/embassy/tiles/archivalwall.gif" repeat="repeat-x" fit="auto" baseWidth="[wallW]" baseHeight="3"></canvas>
                    <canvas class="wall" sprite="/img/local/embassy/tiles/archivalwall.gif" repeat="repeat-x" fit="auto" baseWidth="[wallH]" baseHeight="3"></canvas>
                `
            }
        },

        'S': { 
            class: "blocks cwall south",
            contains: {
                html: `
                    <canvas class="wall" sprite="/img/local/embassy/tiles/archivalwall.gif" repeat="repeat-x" fit="auto" baseWidth="[wallH]" baseHeight="3"></canvas>
                    <canvas class="wall" sprite="/img/local/embassy/tiles/archivalwall.gif" repeat="repeat-x" fit="auto" baseWidth="[wallW]" baseHeight="3"></canvas>
                `
            }
        },
    },

    width: 15,
    plan: [
        '.','.','.','.','.','.','.','v','.','.','.','.','.','.','.',
        'N','░','░','░','░','░','░','░','░','░','░','░','░','░','.',
        '}','░','ö','░','░','░','░','░','░','░','░','░','£','░','{',
        '.','░','░','░','░','░','░','p','░','░','░','░','░','░','S',
        '.','.','.','.','.','.','.','^','.','.','.','.','.','.','.',
        
    ],

    html: `
        <canvas class="veinceiling" sprite="/img/local/embassy/archivalceiling.gif" baseWidth="13.5" baseHeight="3"></canvas>
    `
}

//spherical-ish room, thingy in center
env.stages['embassy_archivalcore'] = {
    creature: env.stageEntities.embassyCreature,
    exec: ()=> { 
        env.embassy.updateStageData()
        
        if(isStageClear()) toggleBgm(env.embassy.music_collapse)
        else toggleBgm(env.embassy.music_unsafe)

        content.classList.add("archives", "show-walls")
        if(checkItem(env.ITEM_LIST.cool_orb_thingy)) env.stage.current.hidePillarCyst()
    },

    hidePillarCyst: ()=>{
        document.querySelectorAll(".bstrdpillar").forEach(el=>el.classList.add('nocyst'))
    },
    locale: "research",

    entities: {
        ">": {
            class: "door right",
            teleportSpot: 31,
            teleportTarget: "embassy_archivalvein",
            shouldFace: 'right',
        },

        "e": {
            class:"prop blocks notile",
            contains: {
                class: "archive",
                examineEntity: "archive",
                html: `<figure></figure>`                
            }
        },

        "ë": {
            class:"prop blocks notile",
            contains: {
                class: "archive opposite",
                examineEntity: "archive",
                html: `<figure></figure>`                
            }
        },
        
        "E": {
            class:"prop blocks notile",
            contains: {
                class: "archive side",
                examineEntity: "archive",
                html: `<figure></figure>`                
            }
        },
        
        "P": {
            class:"prop blocks notile",
            contains: {
                class: "bstrdpillar",
                examineEntity: "peculiar obelisk",
                html: `<figure><div class="target" priority="2" entity="unnerving cyst"></div></figure>`                
            }
        },

        "ö": {
            contains: {
                id: "foe",
                class: "evil staysdead collapseonly",
                type: "archivedouble",
                dialogue: "d3_genericenemy",
                html: `<figure class="archivalgolem"><div class="target" entity="archival golem"></div></figure>`
            }
        },

        'N': { 
            class: "blocks cwall north",
            contains: {
                html: `
                    <canvas class="wall" sprite="/img/local/embassy/tiles/archivalwall.gif" repeat="repeat-x" fit="auto" baseWidth="[wallW]" baseHeight="3"></canvas>
                    <canvas class="wall" sprite="/img/local/embassy/tiles/archivalwall.gif" repeat="repeat-x" fit="auto" baseWidth="[wallH]" baseHeight="3"></canvas>
                `
            }
        },

        'S': { 
            class: "blocks cwall south",
            contains: {
                html: `
                    <canvas class="wall" sprite="/img/local/embassy/tiles/archivalwall.gif" repeat="repeat-x" fit="auto" baseWidth="[wallH]" baseHeight="3"></canvas>
                    <canvas class="wall" sprite="/img/local/embassy/tiles/archivalwall.gif" repeat="repeat-x" fit="auto" baseWidth="[wallW]" baseHeight="3"></canvas>
                `
            }
        },
    },

    width: 7,
    plan: [
        '.','.','.','ë','.','.','.',
        'N','░','░','░','░','░','.',
        '.','░','░','░','░','░','.',
        'E','P','ö','░','░','p','>',
        '.','░','░','░','░','░','.',
        '.','░','░','░','░','░','S',
        '.','.','.','e','.','.','.',
    ],

    html: `
        <canvas class="veinsphere" sprite="/img/local/embassy/archivalspherecanvas.gif" baseWidth="7" baseHeight="7"></canvas>
    `
}

//spherical-ish room, thingy in center
env.stages['embassy_archivaldelivery'] = {
    creature: env.stageEntities.embassyCreature,
    exec: ()=> { 
        env.embassy.updateStageData()
        content.classList.add("archives", "show-walls")
        
        if(!check("PAGE!!archiveambush")) {
            toggleBgm(env.embassy.music_unsafe)
            startDialogue("d3_archivedelivery")
        } else {
            toggleBgm(env.embassy.music_collapse)
        }
        
        env.stage.current.onStep()
    },

    onStep: ()=>{
        if(check("PAGE!!archiveambush")) {
            content.querySelectorAll('#realgrid .container').forEach(el=>{
                el.classList.add('destroyed')
            })
            
            document.querySelectorAll('.lamp').forEach(e=>{
                e.parentElement.classList.remove('prop', 'blocks')
                e.parentElement.innerHTML = ""
            })
        
            if(checkItem(env.ITEM_LIST.scary_black_box)) {
                document.querySelectorAll('.bstrdbosspanel').forEach(el=>el.classList.remove('bstrdbosspanel'))
            }
        } 
    },
    locale: "research",

    entities: {
        ">": {
            class: "door right",
            teleportSpot: 43,
            teleportTarget: "embassy_archivalvein",
            shouldFace: 'left',
        },

        c: {
            class:"prop blocks notile",
            contains: {
                class: "corwall",
                html: `<figure></figure>`
            }
        },

        "ô": {
            class: "prop blocks",
            contains: {
                class: "lamp bstrd collapsed",
                html: `<figure><div class="target" entity="hostile veilklight"></div></figure>`
            }
        },

        'ö': {
            class: "prop blocks",
            contains: {
                class: "container evilcontainer-static",
                html: `<figure style="transform: rotateY(-60deg)"><div class="target" entity="hostile container"></div></figure>`
            }
        },

        '¿': {
            class: "prop blocks",
            contains: {
                class: "container evilcontainer-static",
                html: `<figure style="transform: rotateY(60deg)"><div class="target" entity="hostile container"></div></figure>`
            }
        },

        '├': {
            class: "prop blocks bstrdbosspanel",
        },

        "h": {
            contains: {
                id: "foe",
                class: "evil staysdead collapseonly",
                type: "archivecontainers",
                dialogue: "d3_genericenemy",
                html: ``
            }
        },
    },

    width: 7,
    plan: [
        '.','.','.','.','.','.','.',
        '.','░','¿','¿','░','░','.',
        '.','░','¿','░','░','░','.',
        'c','├','ô','░','░','p','>',
        '.','░','ö','░','░','░','.',
        '.','░','ö','ö','░','░','.',
        '.','.','.','.','.','.','.',
    ]
}

//like the archival core, but glitchy
env.stages['embassy_archivalcore_sensitive'] = {
    enterDirection: "left",
    creature: env.stageEntities.embassyCreature,
    exec: ()=> { 
        env.embassy.updateStageData()
        content.classList.add("archives", "show-walls")
        
        env.stage.current.onStep()

        if(!check("PAGE!!archivemini")) {
            toggleBgm(env.embassy.music_unsafe)
            startDialogue("d3_archivemini")
            setTimeout(()=>{change('PAGE!!archivemini', true), 100})
        } else {
            toggleBgm(env.embassy.music_collapse)
        }
    },

    onStep: ()=>{
        if(check("PAGE!!archivemini")) {
            document.querySelectorAll('.grid-plane .bstrdshelf, #grid-ref .bstrdshelf').forEach(el=>{
                el.parentElement.classList.remove('prop', 'blocks')
                el.parentElement.innerHTML = ""
            })
        }
    },
    locale: "research",

    entities: {
        ">": {
            class: "door right",
            teleportSpot: 22,
            teleportTarget: "embassy_archivalvein",
            shouldFace: 'up',
        },

        "<": {
            class: "door left",
            teleportTarget: "embassy_archivalboss",
            teleportSpot: 45,
            lockFlag: "PAGE!!archivemini",
            shouldFace: 'down',
        },

        "e": {
            class:"prop blocks notile",
            contains: {
                class: "archive",
                examineEntity: "archive",
                html: `<figure></figure>`                
            }
        },

        "ë": {
            class:"prop blocks notile",
            contains: {
                class: "archive opposite",
                examineEntity: "archive",
                html: `<figure></figure>`                
            }
        },
        
        "E": {
            class:"prop blocks notile",
            contains: {
                class: "archive side",
                examineEntity: "archive",
                html: `<figure></figure>`                
            }
        },

        "ô": {
            class: "prop chartile blocks",
            contains: {
                class: "bstrdshelf",
                html: `<figure><div class="target" entity="hostile archive"></div></figure>`
            }
        },

        "Y": {
            class: "blocks",
            contains: {
                class: "savepoint always-targeted shelfroom",
                id: "savepoint",
                examineEntity: "save iteration",
            }
        },
    },

    width: 7,
    plan: [
        '.','.','.','ë','.','.','.',
        '.','.','Y','.','░','.','.',
        '.','░','░','░','.','░','.',
        '<','░','ô','░','░','p','>',
        '.','░','░','.','░','░','.',
        '.','.','░','░','░','.','.',
        '.','.','.','e','.','.','.',
    ]
}

//boss room
env.stages['embassy_archivalboss'] = {
    creature: env.stageEntities.embassyCreature,
    shouldFace: 'down',
    exec: ()=> { 
        env.embassy.updateStageData()

        content.classList.add("archives", "bastard")
        
        env.stage.current.onStep()
    },

    onStep: ()=>{
        if(check("PAGE!!archiveboss")) {
            toggleBgm(env.embassy.music_collapse)
            content.classList.add("archives", "show-walls")
            content.classList.remove("bastard")
            document.querySelectorAll('.maintcloak, .lamp, .bstrdboss').forEach(el=>{
                el.parentElement.classList.remove('prop', 'blocks', 'bstrdbosspanel')
                el.parentElement.innerHTML = ""
            })

            if(!check("gameplay_off") && check("PAGE!!archivesclear") != "skipped") {
                env.stage.current.showPillar()
                if(checkItem(env.ITEM_LIST.sorry_cyst)) env.stage.current.hidePillarCyst()
            }
        } else {
            toggleBgm(env.embassy.music_bstrd)
            startDialogue("d3_archiveboss")
            content.classList.add("archives", "bastard")
        }
    },

    bossCollapse: ()=>{
        document.querySelectorAll('.bstrdboss').forEach(el=>el.classList.add('broke'))
    },

    removeBastardBG: ()=>{  
        content.classList.remove("bastard")
    },

    showPillar: ()=>{
        document.querySelectorAll(".bstrdpillar").forEach(el=>el.parentElement.classList.remove('hide'))
    },

    hidePillarCyst: ()=>{
        document.querySelectorAll(".bstrdpillar").forEach(el=>el.classList.add('nocyst'))
    },

    clearBossPals: ()=>{
        document.querySelectorAll('.bstrdbosspanel').forEach(el=>el.classList.remove('bstrdbosspanel'))
        document.querySelectorAll('.maintcloak, .lamp').forEach(el=>{
            el.parentElement.classList.remove('prop', 'blocks', 'bstrdbosspanel')
            el.parentElement.innerHTML = ""
        })
    },
    locale: "research",

    entities: {
        "^": {
            class: "door up",
            teleportSpot: 22,
            teleportTarget: "embassy_archivalvein",
            shouldFace: 'up',
        },

        "ö": {
            contains: {
                id: "boss",
                class: "prop blocks bstrdbosspanel",
                html: `<figure class="archivalgolem bstrdboss"><div class="target" entity="bstrd golem"></div></figure>`
            }
        },

        "ô": {
            class: "prop blocks notile",
            contains: {
                class: "lamp bstrd collapsed",
                html: `<figure><div class="target" entity="hostile veilklight"></div></figure>`
            }
        },

        "£": {
            class: "notile",
            contains: {
                id: "foe",
                class: "evil staysdead collapseonly maintcloak",
                type: "archivecloaktainer",
                dialogue: "d3_genericenemy",
                html: `<figure class="spritestack">
                    <img class="sprite" style="width: 100%;" src="/img/sprites/combat/foes/maintcloak.gif">
                    <img class="sprite" src="/img/sprites/combat/foes/mainthead.gif">
                    <img class="sprite" src="/img/sprites/combat/foes/mainthead.gif">
                    <div class="target" entity="jutskin"></div>
                </figure>`
            }
        },
        
        "P": {
            class:"prop blocks notile hide",
            contains: {
                class: "bstrdpillar",
                examineEntity: "peculiar obelisk",
                html: `<figure></figure>`                
            }
        },
    },

    width: 7,
    plan: [
        '.', '.', '.', 'P', '░', '░', '.', 
        '.', '░', '£', 'ö', 'ô', '.', '░', 
        '░', '.', '.', '.', '.', '.', '.', 
        '.', '.', '░', '░', '░', '░', '.', 
        '.', '░', '.', '░', '░', '░', '.', 
        '.', '.', '░', '░', '░', '.', '.', 
        '.', '.', '░', 'p', '░', '.', '.', 
        '.', '.', '.', '^', '.', '.', '.', 
    ]
}