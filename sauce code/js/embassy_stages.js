//utilized in canvas floors to combat vram usage
env.stage.locales["research"] = [
    [".empty", "/img/local/embassy/tiles/empty.gif"],
    [".prop.blocks:not(.myseat, .bstrdbosspanel)", "/img/local/embassy/tiles/occupied.gif"],
    [".prop.fakeevil", "/img/sprites/combat/fakeevil.gif"],
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
                env.stage.querySelectorAll('.bozko.character, .kazki.character, .cavik.character, .gakvu.character, .tozik.character').forEach(e=>{
                    e.parentElement.classList.remove('prop', 'blocks')
                    e.parentElement.innerHTML = ""
                })
                
                if(!check("PAGE!!reverting")) {
                    if(!content.classList.contains("collapse")) toggleBgm(env.embassy.music)
                    else if(isStageClear()) toggleBgm(env.embassy.music_collapse)
                    else toggleBgm(env.embassy.music_unsafe)
                }

                if(
                    check("PAGE!!crelocator_intro") && 
                    !check("PAGE!!archiveopen") &&
                    check("embassy__d3_movecmb-start") &&
                    !check("gameplay_off")
                ) {
                    startDialogue("d3_bstrdreveal")
                    env.stage.querySelectorAll(".gridpiece[slug='4']").forEach(el=>{el.innerHTML = ""; el.classList.remove('prop', 'blocks')})
                } else if(check("PAGE!!archiveopen")) {
                    env.stage.querySelectorAll(".gridpiece[slug='4']").forEach(el=>{el.innerHTML = ""; el.classList.remove('prop', 'blocks')})
                }
            break

            case 2:
                env.stage.querySelectorAll('.character').forEach(e=>{
                    e.parentElement.classList.remove('prop', 'blocks')
                    e.parentElement.innerHTML = ""
                })
                
                toggleBgm(env.embassy.music)
            break

            case 1:
                if(!check("PAGE!!d1_kbcollected")) {
                    env.stage.querySelectorAll('.kazki.character, .bozko.character').forEach(e=>{
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
            env.stage.querySelectorAll('.holedoor').forEach(el=>el.classList.remove('hide'))
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
    plan: `
        NlGL░░L░░L░l.
        .░░░░░░░░░░░.
        .░░░░░1░░░░░.
        .░░░6cTc2░░░.
        .░░░ccccc░░d.
        rp░░ccCcc░vD.
        .░░░ccccc░░d.
        .░░░5ccc3░░░.
        .░░░K░4░░░░░☻
        .░░░░░k░░░░░.
        .l░░░░░░░░░lS
    `
}

env.stages['embassy_personnel'] = {
    creature: env.stageEntities.embassyCreature,
    exec: ()=> { 
        env.embassy.updateStageData()
        env.embassy.regenRandobesk()

        switch(check("PAGE!!embassy_day")) {
            case 3:
                env.stage.querySelectorAll('.character:not(.collapser)').forEach(e=>{
                    e.parentElement.classList.remove('prop', 'blocks')
                    e.parentElement.innerHTML = ""
                })
                
                if(isStageClear()) toggleBgm(env.embassy.music_collapse)
                else toggleBgm(env.embassy.music_unsafe)
            break

            case 2:
                toggleBgm(env.embassy.music)
            break

            case -1:
            case 1:
                env.stage.querySelectorAll('.character.cavik, .character.bozko').forEach(e=>{
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
    plan: `
        Nl░g░l.
        }░░░░░.
        .░░░░░.
        .░░░░░a
        .░░░░░.
        }░░░░░.
        .░░░░+.
        .░░░░░{
        .░░░░░.
        }░░░░░.
        .░░░░v.
        .░░░░░{
        .░░░░k.
        }░░░░░.
        .░░░░░.
        .░░░░░{
        .l░p░lS
        ...r...
    `
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
    plan: `
        Nlxdxl.
        .░░░░X.
        q░░░pb.
        .░░░░X.
        .loLClS
    `
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
        env.stage.querySelectorAll(".gridpiece.empty").forEach(el=>el.style.transform = `translateZ(-50px) translate(${rand(-700, 700)}%, ${rand(-200, 200)}%) rotate(${rand(-180, 180)}deg) rotateX(${rand(-180, 180)}deg) rotateY(${rand(-180, 180)}deg)`)
        body.classList.add("detonating")
    },

    leaveExec: ()=>{
        body.classList.remove("detonating", "pathstep1", "pathstep2", "pathstep3", "pathstep0")
    },

    entities: {
        "░": {
            class: "empty plain step0 mainpath blocks path-limited"
        },

        "1": {
            class: "empty plain step1 mainpath blocks  path-limited"
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
            class: "empty plain step2 mainpath blocks  path-limited"
        },

        "@": {
            class: "blocks step2 path-limited floaty"
        },

        "3": {
            class: "empty plain step3 mainpath blocks path-limited"
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

        if(check("PAGE!!weirdload")) {
            changeBgm(env.embassy.music_embassy_uncanny)
            return;
        }

        env.embassy.regenRandobesk()
        change("PAGE!!recreation_leavable", true)
        switch(check("PAGE!!embassy_day")) {
            case 3:
                env.stage.querySelectorAll('.character:not(.collapser)').forEach(e=>{
                    e.parentElement.classList.remove('prop', 'blocks')
                    e.parentElement.innerHTML = ""
                })
                
                if(!check("PAGE!!recreation") && !check("PAGE!!recenter")) {
                    startDialogue("d3_rec_enter")
                }

                if(!check("PAGE!!recreation") || check("PAGE!!recreation", "cleared")) toggleBgm(env.embassy.music_collapse);
                else if(check("PAGE!!recreation", "dangerous")) toggleBgm(env.embassy.music_unsafe);

                if(!check("PAGE!!mindcore1extracted") || !check("PAGE!!mindcore2extracted")) change("PAGE!!recreation_leavable", false)

                env.stage.querySelectorAll(".randomrotate").forEach(el=>el.style.setProperty("--dyp-transform", `rotateY(${rand(0, 360)}deg)`))
                env.stage.querySelectorAll(".viscera").forEach(el=>el.style.setProperty("--visceraAngle", `${rand(0, 360)}deg`))
                env.stage.querySelectorAll('.gridpiece[slug="r"]').forEach(el=>{el.setAttribute('spot', 22); el.setAttribute('shouldFace', 'right')})
            break

            case 1:
                env.stage.querySelectorAll('.character.tozik, .character.gakvu, .collapseonly, .bt').forEach(e=>{
                    e.parentElement.classList.remove('prop', 'blocks')
                    e.parentElement.innerHTML = ""
                })
                toggleBgm(env.embassy.music)
            break

            case -1:
                env.stage.querySelectorAll('.character:not(.bt), .collapseonly').forEach(e=>{
                    e.parentElement.classList.remove('prop', 'blocks')
                    e.parentElement.innerHTML = ""
                })

                toggleBgm(env.embassy.music)
                startDialogue("d0_meetup")
            break

            default:
                env.stage.querySelectorAll('.character.bozko, .character.kazki, .collapseonly, .bt').forEach(e=>{
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
        
        "R": {
            class: "door up",
            teleportSpot: 13,
            teleportTarget: "embassy_relocator",
            shouldFace: "up",
            lockFlag: "permalocked",
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

        C: {
            class: "prop blocks",
            contains: {
                class: "collapsetainer randomrotate",
                dyp: {
                    width: 1.5, 
                    height: 1.25,
                    image: `url(/img/local/orbit/dullvessel/container.gif)`,
                },
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

        l: {
            class:"prop blocks",
            contains: {
                class: "listener busted",
                examineEntity: "damaged listener",
                html: `<figure>
                    <div class="cyst"></div>
                    <div class="cyst"></div>
                    <div class="cyst"></div>
                </figure>`
            }
        },

        "ö": {
            contains: {
                id: "foe",
                class: "evil collapseonly",
                html: `<figure class="evilcontainer"><div class="target" entity="hostile container"></div></figure>`
            }
        },

        "Ü": {
            class: "prop blocks",
            contains: {
                class: "collapsetainer randomrotate",
                dyp: {
                    width: 1.5, 
                    height: 1.25,
                    image: `url(/img/local/embassy/containerbusted.gif)`,
                },
                examineEntity: "hostile container",
            },
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

        "9": {
            class:"prop chartile blocks",
            contains: {
                id: "kazki",
                class: "kazki character bt",
                examineEntity: "kazki",
                examinePriority: 2,
                html: `<figure>
                    <div class="head"></div>
                    <div class="body"></div>
                    <div class="legs"></div>
                </figure>`
            }
        },

        "8": {
            class:"prop chartile blocks",
            contains: {
                id: "gakvu",
                class: "gakvu character bt",
                examineEntity: "gakvu",
                examinePriority: 2,
                html: env.stageEntities.gakvuHTML
            }
        },

        "@": {
            class: "dangertile",
            exec: () => env.embassy.startOrSkipFight({
                specificFormation: 'recreation_survival',
                winCallback: () => { if(env?.rpg?.actors) change("PAGE!!listenerEchoCount", env.rpg.actors?.listener?.pulseCount >= 6 ? 'all' : 'some') },
                skipCallback: () => { change("PAGE!!listenerEchoCount", 'all') },
                winDialogue: 'd3_rec_clear'
            })
        },
        
        "Ṿ": {
            class: "viscera",
        },

        E: { 
            class:"prop blocks notile",
            contains: {
                examineEntity: "ÃwÃIÏ",
                dyp: {
                    class: "weirdeyes hungeronly",
                    width: 1,
                    height: 1,
                    image: "url(/img/sprites/combat/foes/hallucinations/eyetransparent_purble.gif)",
                    transform: `translateY(-100%) translateX(-8000px) rotateY(90deg) translateX(var(--tile-1))`
                }              
            }
        },

        "®": {
            class: "empty plain resourcereturn",
            shouldFace: "left"
        },
    },

    width: 13,
    enterDirection: "down",
    plans: {
        base: `
            N░░bbbBbbb░░.
            .░+bbbfbbb+░.
            .░░░98░░T░░░.
            .░░↕░░░░░↕░░.
            G░↔A↔░░░↔A↔░.
            .░░↕░░░░+↕░░.
            .░░░░░░░░░░░.
            .░░░░░░░░░░░.
            .░░░░░░░░░░░.
            .c░░░░░░░░░K.
            .Lc░░░p░░░kWS
            ......r.....O
        `,

        collapse: `
            N░░bbbBbbb░░.
            .░+bbbfbbb+░.
            .░░░░░Ṿq░░░░.
            E░░░░░░░░░░░.
            ®░░A░░░░░A░░.
            .░░ṾQ░░Ṿ░CC░.
            .░░░░░░░░░░░.
            .░C░░░░░C░░░.
            .░░░░░░░░░░░.
            .░░░C░░░░░░░.
            .L░░░░p░░░░WS
            ......r.....O
        `,

        collapse_danger: `
            N░░bbbBbbb░░.
            .░+bbbfbbb+░.
            .░░░░░Ṿq░░░░.
            E░░░░░░░░░░░.
            ®░░A░p░░░A@@.
            .@░ṾQ░░Ṿ@@ö░.
            .@@░░░@@öö░░.
            .░ö@@@ö░░░░░.
            .░░░ö░░░░░░░.
            .░░░░░░░░░░░.
            .L░░░░░░░░░WS
            ......r.....O
        `,

        empty: `
            .░░bbbBbbb░░.
            .░░bbbbbbb░░.
            .░░░░░░░░░░░.
            E░░↕░░░░░↕░░.
            ®░↔A↔░░░↔A↔░.
            .░░↕░░░░░↕░░.
            .░░░░░░░░░░░.
            .░░░░░░░░░░░.
            .░░░░░░░░░░░.
            .░░░░░░░░░░░.
            .L░░░░p░░░░W.
            ......R.....O
        `
    },
    
    getPlan: function() {
        if(check("PAGE!!weirdload")) return this.plans.empty
        if(check("PAGE!!embassy_day", 3)) {
            if(check("PAGE!!recreation", "dangerous")) return this.plans.collapse_danger
            if(check("PAGE!!recreation", "cleared")) return this.plans.collapse_danger.replaceAll("ö", "Ü").replaceAll("@", "░").replaceAll("L", "l")
            else return this.plans.collapse

        } else return this.plans.base
    },

    planAdjustment: function(plan) {
        let newPlan = plan
        
        if(!check("mask", "hunger")) {
            newPlan = plan.replaceAll("E", ".")
        }

        return newPlan 
    },
}

createEntity({
    name: 'ÃwÃIÏ',
    type: "thoughtform collapse",
    image: "/img/textures/corruripple.gif",
    hide: true,
    text: `::CORRUCYSTIC COMPONENT
    ::<span definition="NOTE::'gap in rendering';'reflective of neural damage';'please schedule mindsci checkup'">NON-ENTITY</span>`,
    actions: [
        {
            name: "look closer",
            exec: ()=> check("PAGE!!weirdload") ? (change("TEMP!!from", "ep2_hunger"), moveTo("/local/ocean/embassy/resources/")) : startDialogue("ep2hungerwarn")
        }
    ]
})

// resourcesport
env.dialogues["ep2hungerwarn"] = generateDialogueObject(`
start
    sourceless
        what is that?
            EXEC::change("foundresourcegate", true)
        a flickering in the projection of the walls?
        something about it inspires a strange, sickly shiver
        perhaps it is best to ignore it, but...

    sys
        ALERT::"exiting iteration";"recollection locus unable to proceed"
        WARNING::"unsaved iteration progress will be lost"
    
____SHOWONCE::
____SHOWIF::["visited_localoceanembassyresources", false]
    moth
        whaat the fuck okay hold on
        whatever you pointed her at didn't show up on my end at first,
        but now that it's coming into focus, that looks liike...
+____NESTIF::["visited_localbeneathembassy"]
    moth
        well, it's not bstrd's frame thing again
+____END
    moth
        that's some sort of link to an underlying bunch of resources
        don't think that sort of thing's meant to render at all lol
        but you've got that mask now, so might be worth a shot?
        i'll force a save here if you want
____SHOWIF::["visited_localoceanembassyresources", true]
    moth
        another resource connection, looks like
____END

    RESPONSES::sys
        save and proceed<+>save
            FAKEEND::(exit iteration)
        
        proceed without saving<+>END
            EXEC::change("TEMP!!from", "ep2_hunger");moveTo("/local/ocean/embassy/resources/")
            FAKEEND::(exit iteration)
    
    RESPONSES::self
        don't go<+>END
            FAKEEND::(back out)

save
    sys
        ATTENTION::'saving iteration...'
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'
        ATTENTION::'proceeding'

    RESPONSES::self
        ok<+>END
            EXEC::change("TEMP!!from", "ep2_hunger");moveTo("/local/ocean/embassy/resources/")
`)

/* COLLAPSE STAGES */

env.stages['embassy_cpersonnel'] = {
    creature: env.stageEntities.embassyCreature,
    exec: ()=> {
        env.embassy.updateStageData()
        env.stage.querySelectorAll(".viscera").forEach(el=>el.style.setProperty("--visceraAngle", `${rand(0, 360)}deg`))
                        
        if(check("PAGE!!cpersonnel", "cleared")) toggleBgm(env.embassy.music_collapse)
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
                type: "recreation_containers_3",
                dialogue: "d3_genericenemy",
                html: `<div class="collapsed lamp"><figure><div class="target" entity="hostile veilklight"></div></figure></div>`
            }
        },

        "@": {
            class: "dangertile",
            exec: () => env.embassy.startOrSkipFight({
                specificFormation: 'personnel_attendant',
                winCallback: () => { change("PAGE!!cpersonnel", "cleared");refreshStage(); },
                winDialogue: 'd3_person_clear'
            }),
        },
        
        "Ṿ": {
            class: "viscera",
        },
    },

    enterDirection: "down",
    width: 7,
    plans: {
        base: `
            NlQṾ░░.
            <░░░░░.
            .░░░░░.
            .♦░░░░{
            .@@ö░Q.
            }░░@@♦.
            .░░░@@.
            .░Ṿ░░░{
            .Q░░░░.
            >░░░░░.
            .░░░░░.
            .░░░░░{
            .░░p░lS
            ...r...
        `,

        clear: `
            NlQṾ░░.
            <░░░░░.
            .░░░░░.
            .Ṿ░░░░{
            .░░Ṿ░Q.
            }Ṿ░░Ṿ░.
            .░░░░░.
            .░Ṿ░░░{
            .Q░░░░.
            >░░░░░.
            .░░░░░.
            .░░░░░{
            .░░p░lS
            ...r...
        `,
    },

    getPlan: function() {
        if(check("PAGE!!cpersonnel", "cleared")) return this.plans.clear
        return this.plans.base
    }    
}

env.stages['embassy_cquarters1'] = {
    creature: env.stageEntities.embassyCreature,
    exec: ()=> { 
        env.embassy.updateStageData()

        if(check("PAGE!!weirdload")) {
            changeBgm(env.embassy.music_embassy_uncanny)
            return;
        }

        toggleBgm(env.embassy.music_safe)

        if(!check('PAGE!!miltzameet')) {
            startDialogue("d3r1")
            change('PAGE!!miltzameet', true)
        } else env.stage.querySelectorAll('.character.miltza').forEach(e=>{
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

        "Q": {
            class: "door left",
            teleportSpot: 64,
            teleportTarget: "embassy_cpersonnel",
            lockFlag: "permalocked",
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
                        <div class="joydood joyonly"><div class="target" entity="▣"></div></div>
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

        "®": {
            class: "empty plain resourcereturn",
            shouldFace: "up"
        }
    },

    width: 7,
    shouldFace: 'left',
    plans: {
        base: `
            ...z...
            .lxdxl.
            .░░░░X.
            qp░░░b.
            .░░o░X.
            .lCLM░.
            ...i...
        `,

        empty: `
            ...z...
            .lxdxl.
            .░░®░X.
            Qp░░░b.
            .░░░░X.
            .l░░░l.
            .......
        `,
    },

    getPlan: function() {
        return this.plans.base
    },

    planAdjustment: function(plan) {
        let newPlan = plan
        
        if(!check("mask", "joy")) {
            newPlan = plan.replaceAll("E", ".")
        }

        return newPlan 
    },    
}

createEntity({ // todo
    name: '▣',
    type: "thoughtform collapse",
    image: "/img/textures/corruripple.gif",
    hide: true,
    text: `::CORRUCYSTIC COMPONENT
    ::<span definition="NOTE::'gap in rendering';'reflective of neural damage';'please schedule mindsci checkup'">NON-ENTITY</span>`,
    actions: [
        {
            name: "look closer",
            exec: ()=> check("PAGE!!weirdload") ? (change("TEMP!!from", "ep2_joy"), moveTo("/local/ocean/embassy/resources/")) : startDialogue("ep2joywarn")
        }
    ]
})

// resourcesport
env.dialogues["ep2joywarn"] = generateDialogueObject(`
start
    sourceless
        cute! a little cloud figure to join the veilk!
            EXEC::change("foundresourcegate", true)
        is that a swarm projection?
        i tilt my head side to side, and,
        no, it... it does not change, no matter my perspective
        what a curious thing
        something about it inspires a strange, sickly shiver
        perhaps it is best to ignore it, but...
        i must stick my claw in it

    sys
        ALERT::"exiting iteration";"recollection locus unable to proceed"
        WARNING::"unsaved iteration progress will be lost"
    
____SHOWONCE::
____SHOWIF::["visited_localoceanembassyresources", false]
    moth
        whaat the fuck okay hold on
        whatever you pointed her at didn't show up on my end at first,
        but now that it's coming into focus, that looks liike...
+____NESTIF::["visited_localbeneathembassy"]
        well, it's not BSTRD's frame thing again
+____END
        that's some sort of link to an underlying bunch of resources
        don't think that sort of thing's meant to render at all lol
        but you've got that mask now, so might be worth a shot?
        i'll force a save here if you want
____SHOWIF::["visited_localoceanembassyresources", true]
    moth
        another resource connection, looks like
____END

    RESPONSES::sys
        save and proceed<+>save
            FAKEEND::(exit iteration)
        
        proceed without saving<+>END
            EXEC::change("TEMP!!from", "ep2_joy");moveTo("/local/ocean/embassy/resources/")
            FAKEEND::(exit iteration)
    
    RESPONSES::self
        don't go<+>END
            FAKEEND::(back out)

save
    sys
        ATTENTION::'saving iteration...'
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'
        ATTENTION::'proceeding'

    RESPONSES::self
        ok<+>END
            EXEC::change("TEMP!!from", "ep2_joy");moveTo("/local/ocean/embassy/resources/")
`)

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
                    <div class="target" entity="container"></div>
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
    plan: `
        .......
        .lXbXl.
        ↔d░░░░.
        gD░░░pq
        .d░░░c.
        .lCLcI.
        .......
    `
}

//ARCHIVAL BONUS AREA FOR EP2
//Archival intro - short connective area with intro enemy
env.stageEntities["⚳"] = {
    class: "prop fakeevil",
    contains: {
        class: "lamp bstrd collapsed",
        html: `<figure><div class="target" entity="hostile veilklight"></div></figure>`
    }
}

env.stageEntities["⚕"] = {
    contains: {
        id: "foe",
        class: "evil staysdead collapseonly maintcloak",
        type: "archivecloaktainer",
        dialogue: "d3_genericenemy",
        html: `<figure class="spritestack">
            <img class="sprite" style="width: 100%;" src="/img/sprites/combat/foes/maintcloak.gif">
            <img class="sprite mainthead" src="/img/sprites/combat/foes/mainthead.gif">
            <img class="sprite mainthead perp" src="/img/sprites/combat/foes/mainthead.gif">
            <div class="target" entity="jutskin"></div>
        </figure>`
    }
}

env.stageEntities["⚴"] = {
    contains: {
        id: "foe",
        class: "evil staysdead collapseonly",
        type: "archivetutorial",
        dialogue: "d3_bstrdintro",
        html: `<figure class="archivalgolem"><div class="target" entity="archival golem"></div></figure>`
    }
}

env.stageEntities["⚷"] = {
    contains: {
        id: "foe",
        class: "evil collapseonly",
        html: `<figure class="evilcontainer"><div class="target" entity="hostile container"></div></figure>`
    }    
}

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

        "♠": {
            exec: ()=> {
                if(env.stage.querySelectorAll('.evil') && !check("PAGE!!archivewarn")) {
                    chatter({actor: 'akizet', text: 'beware - it is as i feared', readout: true})
                    setTimeout(()=>chatter({actor: 'akizet', text: 'archival golems are formed of black corru...', readout: true}), 2000)
                    setTimeout(()=>chatter({actor: 'akizet', text: 'they are particularly tough!', readout: true}), 4000)
                    change("PAGE!!archivewarn", true)
                }
            }
        },

        "@": {
            class: "dangertile",
            exec: () => check("PAGE!!lastFight", "archive_intro") ? env.embassy.startOrSkipArchivalIntroFight() : startDialogue("d3_bstrdintro")
        },
    },

    width: 3,
    plan: `
        .v.
        .p.
        .♠.
        .░.
        .░.
        .░.
        .░.
        .░.
        .@.
        .⚴.
        .░.
        .░.
        .░.
        .░.
        .░.
        .░.
        .^.
    `,

    getPlan: function() {
        if(check("PAGE!!aintro", "cleared")) return this.plan.replace("⚴", "░").replace("@", "░")
        return this.plan
    }
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
            lockExec: ()=>chatter({actor: 'akizet', text: 'these strange tethers prevent us from opening it normally...', readout: true})
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

        "@": {
            class: "dangertile",
            exec: () => env.embassy.startOrSkipFight({
                specificFormation: 'archivecommon',
                winCallback: () => { change("PAGE!!ahallmix", "cleared");refreshStage() },
                skipCallback: () => {
                    chatter({ actor: "sourceless", text: `these golems were twisted by that strange light...`, readout: true, forceMini: true, delay: 2000})
                    chatter({ actor: "sourceless", text: `becoming more dangerous, but more easily torn apart`, readout: true, forceMini: true, delay: 5000})
                }
            })
        },

        "#": {
            class: "dangertile",
            exec: () => env.embassy.startOrSkipFight({
                specificFormation: 'archivecloaktainer',
                winCallback: () => { change("PAGE!!ahallcloak", "cleared");refreshStage() },
                skipCallback: () => {
                    chatter({ actor: "sourceless", text: `a terrible collection of useless miscellany bashed against us`, readout: true, forceMini: true, delay: 2000})
                    chatter({ actor: "sourceless", text: `though shielded by the jutskin, their fluid forms held little resistance`, readout: true, forceMini: true, delay: 5000})
                }
            })
        },

        "1": { reference: "⚴" },
        "2": { reference: "⚕" },
        "3": { reference: "⚳" },
        "4": { reference: "⚕" },
        "5": { reference: "⚷" }
    },

    width: 15,
    plan: `
        .......v.......
        N░2@░░░░░░░#55.
        }░1@░░░░░░░#4░{
        .░3@░░░p░░░#55S
        .......^.......
    `,

    html: `
        <canvas class="veinceiling" sprite="/img/local/embassy/archivalceiling.gif" baseWidth="13.5" baseHeight="3"></canvas>
    `,

    getPlan: function() {
        let plan = this.plan
        if(check("PAGE!!ahallmix", "cleared")) plan = plan.replaceAll("@", "░").replaceAll("1", "░").replaceAll("2", "░").replaceAll("3", "░")
        if(check("PAGE!!ahallcloak", "cleared")) plan = plan.replaceAll("#", "░").replaceAll("4", "░").replaceAll("5", "░")
        return plan
    }
}

//spherical-ish room, thingy in center
env.stages['embassy_archivalcore'] = {
    creature: env.stageEntities.embassyCreature,
    exec: ()=> { 
        env.embassy.updateStageData()
        env.stage.querySelectorAll(".viscera").forEach(el=>el.style.setProperty("--visceraAngle", `${rand(0, 360)}deg`))
        
        if(isStageClear()) toggleBgm(env.embassy.music_collapse)
        else toggleBgm(env.embassy.music_unsafe)

        content.classList.add("archives", "show-walls")
        if(checkItem(env.ITEM_LIST.cool_orb_thingy) || check("PAGE!!archivesclear")) env.stage.current.hidePillarCyst()
    },

    hidePillarCyst: ()=>{
        env.stage.querySelectorAll(".bstrdpillar").forEach(el=>el.classList.add('nocyst'))
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

        "@": {
            class: "dangertile",
            exec: () => env.embassy.startOrSkipFight({
                specificFormation: 'archivedouble',
                winCallback: () => { change("PAGE!!acore", "cleared");refreshStage(); },
                skipCallback: () => {
                    chatter({ actor: "sourceless", text: `these golems are far more hardy than they have any right to be`, readout: true, forceMini: true, delay: 2000})
                    chatter({ actor: "sourceless", text: `one misstep and we would certainly have met with our final deaths`, readout: true, forceMini: true, delay: 5000})
                }
            })
        },
        
        "Ṿ": {
            class: "viscera",
        },
    },

    width: 7,
    plan: `
        ...ë...
        N░░⚴░░.
        .░⚕░@@.
        EP░░@p>
        .░⚳░@@.
        .░░⚴░░S
        ...e...
    `,

    getPlan: function() {
        let plan = this.plan
        if(check("PAGE!!acore", "cleared")) plan = plan.replaceAll("@", "░").replaceAll("⚳", "Ṿ").replaceAll("⚕", "Ṿ").replaceAll("⚴", "░")
        return plan
    },

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
        
        if(!check("PAGE!!acontainers")) {
            toggleBgm(env.embassy.music_unsafe)
            if(!check("PAGE!!archiveambush")) startDialogue("d3_archivedelivery")
        } else {
            toggleBgm(env.embassy.music_collapse)
        }
    },

    onStep: ()=>{        
        if(checkItem(env.ITEM_LIST.scary_black_box) || check("PAGE!!archivesclear")) {
            env.stage.querySelectorAll('.bstrdbosspanel').forEach(el=>el.classList.remove('bstrdbosspanel'))
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
                html: `<figure><div class="target" entity="bstrdlight"></div></figure>`
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

        "@": {
            class: "dangertile",
            exec: () => env.embassy.startOrSkipFight({
                specificFormation: 'archivecontainers',
                winCallback: () => { change("PAGE!!acontainers", "cleared");refreshStage(); },
                winDialogue: "d3_archivedeliveryclear"
            })
        },
    },

    width: 7,
    plan: `
        .......
        .░⚷⚷░░.
        .░⚷░@@.
        c├⚳░@p>
        .░⚷░@@.
        .░⚷⚷░░.
        .......
    `,

    getPlan: function() {
        let plan = this.plan
        if(check("PAGE!!acontainers", "cleared")) plan = plan.replaceAll("@", "░").replaceAll("⚳", "░").replaceAll("⚷", "░")  
        if(checkItem(env.ITEM_LIST.scary_black_box) || check("PAGE!!archivesclear")) plan = plan.replaceAll("├", "░")
        return plan
    }
}

//like the archival core, but glitchy
env.stages['embassy_archivalcore_sensitive'] = {
    enterDirection: "left",
    creature: env.stageEntities.embassyCreature,
    exec: ()=> { 
        env.embassy.updateStageData()
        content.classList.add("archives", "show-walls")

        if(!check("PAGE!!ashelf")) {
            toggleBgm(env.embassy.music_unsafe)
            if(!check("PAGE!!archivemini")) {
                startDialogue("d3_archivemini")
                change('PAGE!!archivemini', true)
            }
        } else {
            toggleBgm(env.embassy.music_collapse)
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
            class: "prop chartile fakeevil",
            contains: {
                class: "bstrdshelf",
                html: `<figure><div class="target" entity="pain shelf"></div></figure>`
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

        "@": {
            class: "dangertile",
            exec: () => env.embassy.startOrSkipFight({
                specificFormation: 'archiveshelfminiboss',
                winCallback: () => { change("PAGE!!ashelf", "cleared");refreshStage(); },
                winDialogue: "d3_archiveminiclear"
            })
        },
    },

    width: 7,
    plan: `
        ...ë...
        ..Y.░..
        .░░⚕@@.
        <░ô░@p>
        .░░⚳@@.
        ..░░░..
        ...e...
    `,

    getPlan: function() {
        let plan = this.plan
        if(check("PAGE!!ashelf", "cleared")) plan = plan.replaceAll("@", "░").replaceAll("⚳", "░").replaceAll("⚕", "░").replaceAll("ô", "░");
        else plan = plan.replaceAll("Y", "░")
        return plan
    }    
}

//boss room
env.stages['embassy_archivalboss'] = {
    creature: env.stageEntities.embassyCreature,
    shouldFace: 'down',
    exec: ()=> { 
        env.embassy.updateStageData()

        if(check("PAGE!!aboss")) {
            content.classList.add("archives", "show-walls")
            toggleBgm(env.embassy.music_collapse)

        } else {
            toggleBgm(env.embassy.music_bstrd)
            content.classList.add("archives", "bastard")
            startDialogue("d3_archiveboss")
        }

        env.stage.current.onStep()
    },

    onStep: ()=>{
        if(check("PAGE!!aboss")) {
            content.classList.remove("bastard")
            env.stage.querySelectorAll('.maintcloak, .lamp, .bstrdboss').forEach(el=>{
                el.parentElement.classList.remove('prop', 'blocks', 'bstrdbosspanel')
                el.parentElement.innerHTML = ""
            })

            if(!check("gameplay_off") && check("PAGE!!archivesclear") != "skipped") {
                env.stage.current.showPillar()
                if(checkItem(env.ITEM_LIST.sorry_cyst)) env.stage.current.hidePillarCyst()
            }
        }
    },

    bossCollapse: ()=>{
        env.stage.querySelectorAll('.bstrdboss').forEach(el=>el.classList.add('broke'))
    },

    removeBastardBG: ()=>{  
        content.classList.remove("bastard")
    },

    showPillar: ()=>{
        env.stage.querySelectorAll(".bstrdpillar").forEach(el=>el.parentElement.classList.remove('hide'))
    },

    hidePillarCyst: ()=>{
        env.stage.querySelectorAll(".bstrdpillar").forEach(el=>el.classList.add('nocyst'))
    },

    clearBossPals: ()=>{
        env.stage.querySelectorAll('.bstrdbosspanel').forEach(el=>el.classList.remove('bstrdbosspanel'))
        env.stage.querySelectorAll('.maintcloak, .lamp').forEach(el=>{
            el.parentElement.classList.remove('prop', 'blocks', 'bstrdbosspanel')
            el.parentElement.innerHTML = ""
        })
        initializeFloorCanvas(env.stage.current, env.stage.real)
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
        
        "P": {
            class:"prop blocks notile hide",
            contains: {
                class: "bstrdpillar",
                examineEntity: "peculiar obelisk",
                html: `<figure></figure>`
            }
        },

        "@": {
            class: "dangertile",
            exec: () => env.embassy.startOrSkipFight({
                specificFormation: 'bstrdboss',
                winDialogue: "d3_archivebossend"
            })
        },
    },

    width: 7,
    plan: `
        .⚕.P░⚳.
        .░.ö..░
        ░......
        ..░░░░.
        .░@@@░.
        ..@p@..
        ..@@@..
        ...^...
    `,

    getPlan: function() {
        let plan = this.plan
        if(check("PAGE!!archivesclear")) plan = plan.replaceAll("@", "░").replaceAll("ö", "░").replaceAll("⚷", "░").replaceAll("⚕", "░")
        return plan
    }
}

//e4a1
env.stages['embassy_hangar'] = {
    entities: {
        v: { 
            class:"prop blocks notile",
            contains: {
                dyp: {
                    width: 6,
                    height: 6,
                    image: "url(/img/local/orbit/dullvessel/dockedvessel.gif)",
                    transform: `translateY(10%)`
                }              
            }
        }
    },

    width: 1,

    plan:  `
        v
        .
        .
        .
        .
        .
        p
    `,
}