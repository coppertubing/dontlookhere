//utilized in canvas floors to combat vram usage
env.stage.locales["golem"] = [
    [".empty.plain", "/img/local/embassy/tiles/empty.gif",],
    [".empty.circle", "/img/local/embassy/tiles/circle.gif",],
    [".prop.blocks", "/img/local/embassy/tiles/occupied.gif",],
    [".blocks.darktile", "/img/textures/black.gif",],
]
env.stage.locales.golem_tunnel = env.stage.locales.golem

env.stages.golemSafeCheck = () => {
    setTimeout(()=>{
        if(isStageClear()) {
            content.classList.add('safe')
            if(env.stage.name == "g_lobby") toggleBgm(env.embassy.music_golems);
            else toggleBgm(env.embassy.music_golems_cleared);
        } else {
            content.classList.remove('safe')
            toggleBgm(env.embassy.music_unsafe_golems)
        }
    })
}

env.stages.golemStageInit = (stage) => {
    content.classList.add('show-walls', 'collapse', 'show-vn')

    env.stage.wallH = env.stage.stageH - 2
    env.stage.wallW = env.stage.stageW - 2

    var annoyingMacEdgeCasePrevention
    annoyingMacEdgeCasePrevention = setInterval(()=>{
        if(document.querySelector('.husk img:not([src^="/"])')) {
            try{
                env.COMBAT_ACTORS.husk.regenAllSprites()
            } catch(e) {
                chatter({actor: 'actual_site_error', text: e, readout: true})
            }
        } else {
            clearInterval(annoyingMacEdgeCasePrevention)
        }
    }, 200)
    
    if(check("PAGE!!mboss")) { //change to carry sprite
        content.classList.add('itzilout')
    }
        
    env.stages.golemSafeCheck()
}

/* GLOBAL GOELM PROPS */
env.stageEntities["○"] = { class: "empty circle" }
env.stageEntities['‼'] = { class: "blocks darktile" }
env.stageEntities['▀'] = { 
    class: "prop blocks",
    contains: {
        class: "dyingqou",
        examineEntity: "qou body",
        html: `<figure></figure>`
    }
}

env.stageEntities['◘'] = { //for test purposes only
    contains: {
        id: "foe",
        class: "evil newevil staysdead",
        type: "attendant_squad_1",
        dialogue: "genericenemy",
        html: `<figure class="spiregolem"><div class="target" entity="attendant"></div></figure>`
    }
}

env.stageEntities['┠'] = { 
    class: "blocks notile",
    contains: {
        class: "sconce",
        examineEntity: "cavelight",
        html: `<figure></figure>`
    }
}

env.stageEntities['┰'] = { 
    class: "blocks notile turn90",
    contains: {
        class: "sconce",
        examineEntity: "cavelight",
        html: `<figure></figure>`
    }
}

env.stageEntities['┨'] = { 
    class: "blocks notile turn180",
    contains: {
        class: "sconce",
        examineEntity: "cavelight",
        html: `<figure></figure>`
    }
}

env.stageEntities['┻'] = { 
    class: "blocks notile turn270",
    contains: {
        class: "sconce",
        examineEntity: "cavelight",
        html: `<figure></figure>`
    }
}

env.stageEntities['╟'] = { 
    class: "blocks notile",
    contains: {
        class: "sconce busted",
        examineEntity: "cavelight",
        html: `<figure></figure>`
    }
}

env.stageEntities['╤'] = { 
    class: "blocks notile turn90",
    contains: {
        class: "sconce busted",
        examineEntity: "cavelight",
        html: `<figure></figure>`
    }
}

env.stageEntities['╢'] = { 
    class: "blocks notile turn180",
    contains: {
        class: "sconce busted",
        examineEntity: "cavelight",
        html: `<figure></figure>`
    }
}

env.stageEntities['╧'] = { 
    class: "blocks notile turn270",
    contains: {
        class: "sconce busted",
        examineEntity: "cavelight",
        html: `<figure></figure>`
    }
}

env.stageEntities['Ԯ'] = { 
    class: "prop blocks",
    contains: {
        class: "flora bristle",
        examineEntity: "veilk spear",
    } 
}

env.stageEntities['١'] = { 
    class: "prop blocks",
    contains: {
        class: "flora offering",
        examineEntity: "adull's altar",
    } 
}

env.stageEntities['٢'] = { 
    class: "prop blocks",
    contains: {
        class: "flora guktik",
        examineEntity: "guktik ward",
    } 
}

env.stageEntities['٤'] = { 
    class: "prop blocks",
    contains: {
        class: "flora bristle small",
        examineEntity: "veilk spear",
    } 
}

env.stageEntities['٦'] = { 
    class: "prop blocks",
    contains: {
        class: "flora offering small",
        examineEntity: "adull's altar",
    } 
}

env.stageEntities['٧'] = { 
    class: "prop blocks",
    contains: {
        class: "flora guktik small",
        examineEntity: "guktik ward",
    } 
}

env.stageEntities['b'] = { 
    class: "blocks notile",
    contains: {
        class: "deadtainer",
        //this looks unhinged but these are the sides of the box
        html: `<span></span><span></span><span></span><span></span><span></span>`
    }
}
        
env.stageEntities['|'] = {
    class: "darktile",
    contains: {
        dyp: {
            image: 'url(/img/local/embassy/sludgecolumn.gif)',
            width: 1,
            height: 3,
            cross: true,
            transform: 'rotateY(45deg)'
        }
    } 
},
        
env.stageEntities['┼'] = {
    class: "blocks notile",
    contains: {
        class: "isopod_host",
        html: "<figure class='isopod'><div class='isopod_joint'><div class='target' entity='dog'></div></div></figure>"
    }
},

/* FOES */
env.stageEntities['0'] = {
    contains: {
        id: "foe",
        class: "evil newevil staysdead initial-evil",
        type: "g_prelobby1",
        dialogue: "genericenemy",
        html: env.COMBAT_ACTORS['husk'].graphic
    }
},

env.stageEntities['1'] = {
    contains: {
        id: "foe",
        class: "evil newevil staysdead initial-evil",
        type: "g_prelobby2",
        dialogue: "genericenemy",
        html: env.COMBAT_ACTORS['surgeon_golem'].graphic
    }
},

env.stageEntities['2'] = {
    contains: {
        id: "foe",
        class: "evil newevil staysdead initial-evil",
        type: "g_prelobby3",
        dialogue: "genericenemy",
        html: env.COMBAT_ACTORS['pressure_golem'].graphic
    }
},

env.stageEntities['3'] = {
    contains: {
        id: "foe",
        class: "evil newevil staysdead m-evil",
        type: "g_m1",
        dialogue: "genericenemy",
        html: env.COMBAT_ACTORS['husk'].graphic
    }
},

env.stageEntities['4'] = {
    contains: {
        id: "foe",
        class: "evil newevil staysdead m-evil",
        type: "g_m2",
        dialogue: "genericenemy",
        html: env.COMBAT_ACTORS['constructor_golem'].graphic
    }
},

env.stageEntities['5'] = {
    contains: {
        id: "foe",
        class: "evil newevil staysdead m-evil",
        type: "g_m3",
        dialogue: "genericenemy",
        html: env.COMBAT_ACTORS['husk'].graphic
    }
},

env.stageEntities['6'] = {
    contains: {
        id: "foe",
        class: "evil newevil staysdead s-evil",
        type: "g_s1",
        dialogue: "genericenemy",
        html: env.COMBAT_ACTORS['husk'].graphic
    }
},

env.stageEntities['7'] = {
    contains: {
        id: "foe",
        class: "evil newevil staysdead s-evil",
        type: "g_s2",
        dialogue: "genericenemy",
        html: env.COMBAT_ACTORS['pressure_golem'].graphic
    }
},

env.stageEntities['8'] = {
    contains: {
        id: "foe",
        class: "evil newevil staysdead s-evil",
        type: "g_s3",
        dialogue: "genericenemy",
        html: env.COMBAT_ACTORS['pressure_golem'].graphic
    }
},

env.stageEntities['9'] = {
    contains: {
        id: "foe",
        class: "evil newevil staysdead o-evil",
        type: "g_o1",
        dialogue: "genericenemy",
        html: env.COMBAT_ACTORS['husk'].graphic
    }
},

env.stageEntities['@'] = {
    contains: {
        id: "foe",
        class: "evil newevil staysdead o-evil",
        type: "g_o2",
        dialogue: "genericenemy",
        html: env.COMBAT_ACTORS['basic_golem'].graphic
    }
},

env.stageEntities["Y"] = {
    class: "blocks darktile",
    contains: {
        class: "savepoint always-targeted",
        id: "savepoint",
        examineEntity: "save iteration",
    }
},

env.stages['golem_test'] = {
    locale: "golem",
    creature: env.stageEntities.embassyCreature,
    exec: function () {
        env.stages.golemStageInit(this)
        content.querySelector('.cornerwall.north').classList.add('meltnorth')
    },
    entities: {        
        "}": {
            class: "door slim left",
            teleportTarget: "nothing",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'akizet', text: 'it is locked', readout: true})
        },

        "]": {
            class: "door slim sludged left",
            teleportTarget: "nothing",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'akizet', text: 'it is locked', readout: true})
        },
        
        "{": {
            class: "door slim right",
            teleportTarget: "nothing",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'akizet', text: 'it is locked', readout: true})
        },
        
        "[": {
            class: "door slim sludged right",
            teleportTarget: "nothing",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'akizet', text: 'it is locked', readout: true})
        },

        "%": {
            class: "locked",
            teleportTarget: "test",
            lockFlag: "permalocked"
        },

        "☺": {
            class: "placeholder blocks"
        },
        
        "t": {
            class: "door slim up",
            teleportTarget: "g_personnel_tunnel",
            teleportSpot: 17
        },
    },
    width: 7,
    plan: `
        Ṇ......
        .░░░░░.
        ┠░░░░░┨
        %░░░░░%
        ┠░░░▀░┨
        .░░p░░.
        ..┻t┻.Ṡ
    `
}


env.stages['g_personnel'] = {
    locale: "golem",
    creature: env.stageEntities.embassyCreature,
    exec: function () {
        env.stages.golemStageInit(this)
        content.querySelector('.cornerwall.north').classList.add('meltnorth')

        if(!check("PAGE!!gp")) {
            startDialogue("personnel")
        }
    },
    entities: {        
        "}": {
            class: "door slim left",
            teleportTarget: "nothing",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'akizet', text: 'it is locked', readout: true})
        },

        "]": {
            class: "door slim sludged left",
            teleportTarget: "nothing",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'akizet', text: 'the wall has caved in', readout: true})
        },
        
        "{": {
            class: "door slim right",
            teleportTarget: "nothing",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'akizet', text: 'it is locked', readout: true})
        },
        
        "[": {
            class: "door slim sludged right",
            teleportTarget: "nothing",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'akizet', text: 'there is nothing here anymore', readout: true})
        },

        "M": {
            class: "door down melthole locked",
            teleportSpot: 13,
            lockFlag: "permalocked",
            teleportTarget: "embassy_relocator",
            shouldFace: "up",
            lockExec: ()=>chatter({actor: 'akizet', text: 'movefriend is gone for now, there is no way back', readout: true})
        },

        "☺": {
            class: "placeholder blocks"
        },
        
        "t": {
            class: "door slim up",
            teleportTarget: "g_personnel_tunnel",
            teleportSpot: 7,
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'lobby'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_L.gif);",
                }
            } 
        },

        '╒': { 
            class: "prop blocks reaniqou",
            contains: {
                class: "dyingqou",
                examineEntity: "qou body",
                html: `<figure></figure>`
            }
        },

        'Ṇ': { 
            class:"blocks cwall north cornerwall",
            contains: {
                html: `
                    <canvas class="wall" sprite="/img/local/embassy/golemwall.gif, /img/local/embassy/mossdesign.gif, /img/local/embassy/wallcover.gif" repeat="repeat-x" fit="auto, contain, stretch" baseWidth="[wallH]" baseHeight="3"></canvas>
                    <canvas class="wall" sprite="/img/local/embassy/golemwallmelt.gif, /img/local/embassy/wallcover.gif" repeat="repeat-x" fit="auto, stretch" baseWidth="[wallW]" baseHeight="3"></canvas>
                `
            }
        },
    },
    width: 7,
    plan: `
        Ṇ......
        ]..M..[
        .░░p░░.
        ]▀░░░░{
        ┠░░░░░┨
        }╒░░╒░{
        .b░b░▀.
        }░░░b░[
        ..┻t┻.Ṡ
    `,

    html: `
        <canvas class="golemceiling" sprite="/img/local/embassy/golemceiling.gif, /img/local/embassy/ceilingcover.gif" fit="auto, stretch" repeat="repeat" baseWidth="[wallW]" baseHeight="[wallH]"></canvas>
    `
}

env.stages['g_personnel_tunnel'] = {
    locale: "golem_tunnel",
    creature: env.stageEntities.embassyCreature,
    exec: function () {
        env.stages.golemStageInit(this)
    },
    entities: {
        "%": {
            class: "locked",
            teleportTarget: "test",
            lockFlag: "permalocked"
        },

        "☺": {
            class: "placeholder blocks"
        },
        
        "P": {
            class: "door slim down",
            teleportTarget: "g_personnel",
            teleportSpot: 52,
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'personnel'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_P.gif);"
                }
            } 
        },
        
        "L": {
            class: "door slim up",
            teleportTarget: "g_lobby",
            shouldFace: "right",
            teleportSpot: 78,
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'lobby'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_L.gif);",
                }
            } 
        },

        'Ṇ': { 
            class:"blocks cwall north cornerwall",
            contains: {
                html: `
                    <canvas class="wall" sprite="/img/local/embassy/golemwall_slice.gif, /img/local/embassy/mossdesign2_slice.gif, /img/local/embassy/wallcover_slice.gif, /img/local/embassy/golemtunnel_window.gif" repeat="repeat-x" fit="auto, stretch-y, stretch, auto" baseWidth="[wallH]" baseHeight="3"></canvas>
                    <canvas class="wall" sprite="/img/local/embassy/golemwall_slice.gif, /img/local/embassy/mossdesign2_slice.gif, /img/local/embassy/wallcover_slice.gif, /img/local/embassy/golemtunnel_window.gif" repeat="repeat-x" fit="auto, stretch-y, stretch, auto" baseWidth="[wallW]" baseHeight="3"></canvas>
                `
            }
        },

        'Ṡ': { 
            class:"blocks cwall south cornerwall",
            contains: {
                html: `
                    <canvas class="wall" sprite="/img/local/embassy/golemwall_slice.gif, /img/local/embassy/mossdesign2_slice.gif, /img/local/embassy/wallcover_slice.gif, /img/local/embassy/golemtunnel_window.gif" repeat="repeat-x" fit="auto, stretch-y, stretch, auto" baseWidth="[wallH]" baseHeight="3"></canvas>
                    <canvas class="wall" sprite="/img/local/embassy/golemwall_slice.gif, /img/local/embassy/mossdesign2_slice.gif, /img/local/embassy/wallcover_slice.gif, /img/local/embassy/golemtunnel_window.gif" repeat="repeat-x" fit="auto, stretch-y, stretch, auto" baseWidth="[wallW]" baseHeight="3"></canvas>
                `
            }
        },
    },
    width: 5,
    plan: `
        Ṇ┰P┰.
        .░p░.
        .░░░.
        .b░░.
        .░░░.
        .░░░.
        .░░░.
        ☺░░░☺
        .░░░.
        .░░░.
        .░░░.
        .░░b.
        .░1░.
        .░░░.
        .┻L┻Ṡ
    `,

    html: `
        <canvas class="golemceiling" sprite="/img/textures/black.gif" fit="stretch" baseWidth="[wallW]" baseHeight="[wallH]"></canvas>
    `
}

env.stages['g_lobby'] = {
    locale: "golem_tunnel",
    enterDirection: "down",
    creature: env.stageEntities.embassyCreature,
    exec: function () {
        env.stages.golemStageInit(this)
        if(!check("PAGE!!gl")) {
            startDialogue("lobby_danger")
        } else if(check("postbstrdgeli")) {
            startDialogue('gelialtered')
            change("postbstrdgeli", "DELETE")
        }
        
        if(!check("PAGE!!bozcav")) env.stage.querySelectorAll('.character.cavik, .character.bozko').forEach(e=>{
            e.parentElement.classList.remove('prop', 'blocks')
            e.parentElement.innerHTML = ""
        })
        
        if(check("PAGE!!goverride")) env.stage.querySelectorAll(".big.sludged").forEach(el=>el.classList.remove('sludged'))

        //hide the ikgolem tile cause we're doin some trix here
        env.stage.querySelectorAll('.gridpiece[slug="Æ"').forEach(el=>el.classList.add('notile'))
        
        //replace mindcores with the ikgolem as needed
        if(check("PAGE!!ikgolem")) env.stage.querySelectorAll('.gridpiece[slug="m"]').forEach(el=>el.innerHTML = "")
        else env.stage.querySelectorAll('.gridpiece[slug="Æ"').forEach(el=>el.innerHTML = "")

        //show proceed option near tozik once boss is beat
        if(check("PAGE!!golboss") && env.ep4) {
            env.stage.querySelectorAll('.gridpiece[slug="€"]').forEach(el=>{el.classList.remove('hide')})
        } else {
            env.stage.querySelectorAll('.gridpiece[slug="€"]').forEach(el=>{el.classList.add('hide')})
        }
    },
    entities: {
        "%": {
            class: "locked",
            teleportTarget: "test",
            lockFlag: "permalocked"
        },

        "☺": {
            class: "placeholder blocks"
        },

        "☻": {
            class: "prop blocks gelitable",
            contains: {
                class: "geli character face-creature",
                examineEntity: "geli",
                html: `<figure>
                    <div class="head"></div>
                    <div class="body"></div>
                </figure>`
            }
        },
        
        "P": {
            class: "door slim left",
            teleportTarget: "g_personnel_tunnel",
            teleportSpot: 67,
            shouldFace: 'down',
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'personnel'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_P.gif);"
                }
            } 
        },
        
        "O": {
            class: "door slim left",
            teleportTarget: "g_o_hall1",
            lockFlag: "PAGE!!geli",
            shouldFace: "up",
            lockExec: ()=>chatter({actor: 'akizet', text: 'it is locked. perhaps that golem can help', readout: true}),
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'minor operations'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_MO.gif);"
                }
            } 
        },
        
        "%": {
            class: "door slim right",
            teleportTarget: "g_m_hall",
            lockFlag: "PAGE!!geli",
            teleportSpot: 13,
            shouldFace: "up",
            lockExec: ()=>chatter({actor: 'akizet', text: 'it is locked. perhaps that golem can help', readout: true}),
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'manufacturing'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_M.gif);"
                }
            } 
        },
        
        "ś": {
            class: "door slim right",
            teleportTarget: "g_s_metals",
            lockFlag: "PAGE!!geli",
            teleportSpot: 13,
            shouldFace: "up",
            lockExec: ()=>chatter({actor: 'akizet', text: 'it is locked. perhaps that golem can help', readout: true}),
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'sfer supply'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_SS.gif);"
                }
            } 
        },
        
        "^": {
            teleportTarget: "g_boss",
            lockFlag: "PAGE!!bosslock",
            lockExec: ()=>chatter({actor: 'akizet', text: 'it is locked', readout: true})
        },
        
        "₧": {
            class: "door down big sludged",
            teleportTarget: "g_boss",
            lockFlag: "PAGE!!bosslock",
            lockExec: ()=> isStageClear() ? startDialogue('lobby_bossdoor') : chatter({actor: 'sourceless', text: 'IT IS TOO DANGEROUS, WE MUST DESTROY THESE FOES', readout: true}), 
            examineEntity: "grand door",
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'advanced operations'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_AV.gif);"
                }
            } 
        },
        
        "τ": {
            class: "door slim up sludged",
            teleportTarget: "g_s_metals",
            lockFlag: "permalocked",
            lockExec: ()=> {
                if((check("mask") == "hunger") && (check("PAGE!!geliawake")) ) {
                    if(check("geli_beacon", false)) {
                        startDialogue("geli_beacon_fallback")
                    } else {
                        startDialogue("add2warn")                        
                    }
                } else {
                    chatter({actor: 'akizet', text: 'whatever this was connected to is gone now', readout: true})
                }
            },
            contains: {
                dyp: {
                    class: "vesselgap hungeronly",
                    image: 'transparent',
                    width: 3,
                    height: 3,
                    noback: true,
                    transform: `rotateY(90deg) translateX(25%) rotateY(-90deg) rotateY(180deg)`
                }
            } 
        },

        c: {
            class:"prop blocks genericblocker",
        },

        "f": {
            class: "blocks",
            contains: {
                examineEntity: "veilk spear",
                dyp: {
                    canvas: {
                        sprite: "/img/local/embassy/f1.gif",
                        fit: "stretch",
                        position: "bottom"
                    },
                    width: 1.5,
                    height: 3,
                    transform: 'rotateY(45deg)',
                }
            } 
        },

        "+": {
            class: "blocks",
            contains: {
                examineEntity: "veilk spear",
                class: "ihatethisthing",
                dyp: {
                    canvas: {
                        sprite: "/img/local/embassy/f1.gif",
                        fit: "stretch",
                        position: "bottom"
                    },
                    width: 1.5,
                    height: 3,
                    transform: 'rotateY(45deg)'
                }
            } 
        },
        
        "F": {
            class: "blocks",
            contains: {
                examineEntity: "veilk spear",
                dyp: {
                    canvas: {
                        sprite: "/img/local/embassy/f1.gif",
                        fit: "stretch",
                        position: "bottom"
                    },
                    width: 1.5,
                    height: 3,
                    transform: 'rotateY(-45deg)',
                }
            } 
        },

        'Ṇ': { 
            class:"blocks cwall north cornerwall",
            contains: {
                html: `
                    <canvas class="wall" sprite="/img/local/embassy/golemwall_slice.gif, /img/local/embassy/wallcover_slice.gif, /img/local/embassy/golemtunnel_window.gif" repeat="repeat-x" fit="auto, stretch, auto" baseWidth="[wallH]" baseHeight="3"></canvas>
                    <canvas class="wall" sprite="/img/local/embassy/golemwall_slice.gif, /img/local/embassy/wallcover_slice.gif, /img/local/embassy/golemtunnel_window.gif" repeat="repeat-x" fit="auto, stretch, auto" baseWidth="[wallW]" baseHeight="3"></canvas>
                `
            }
        },

        'Ṡ': { 
            class:"blocks cwall south cornerwall",
            contains: {
                html: `
                    <canvas class="wall" sprite="/img/local/embassy/golemwall_slice.gif, /img/local/embassy/wallcover_slice.gif, /img/local/embassy/golemtunnel_window.gif" repeat="repeat-x" fit="auto, stretch, auto" baseWidth="[wallH]" baseHeight="3"></canvas>
                    <canvas class="wall" sprite="/img/local/embassy/golemwall_slice.gif, /img/local/embassy/wallcover_slice.gif, /img/local/embassy/golemtunnel_window.gif" repeat="repeat-x" fit="auto, stretch, auto" baseWidth="[wallW]" baseHeight="3"></canvas>
                `
            }
        },
    },
    width: 11,
    plan: `
        Ṇ..Æ.₧...€.
        .fMmY░░GTF.
        .░░░░░░░░░.
        O░░░k░v░░░%
        .░░░‼c‼░░░.
        .░░░c☻c░░░.
        .░░░‼c‼░░░.
        P░░░░░░2░░ś
        .░░░░p░░░░.
        .F░░░░░░░+.
        .....τ....Ṡ
    `,

    html: `
        <canvas class="golemceiling" sprite="/img/textures/black.gif" fit="stretch" baseWidth="[wallW]" baseHeight="[wallH]"></canvas>
    `
}

env.stages['g_boss'] = {
    locale: "golem",
    creature: env.stageEntities.embassyCreature,
    enterDirection: "down",
    exec: function () {
        env.stages.golemStageInit(this)
        if(!check("PAGE!!golboss")) {
            env.stage.querySelectorAll('.gridpiece[slug="T"]').forEach(el=>{el.classList.add('hide')})
            startDialogue("boss")
        } else {
            env.stages['g_boss'].hideBoss()
            env.stages['g_boss'].removeHatch()
        }
    },

    onStep: ()=>{
        env.stage.real.classList.add("dynocam")
        if(env.stage.creatureLoc.y <= 4 && env.stage.creatureLoc.x >= 4) {
            env.stage.container.setAttribute("swapos", "imp")
        } else {
            env.stage.container.removeAttribute("swapos")
        }
    },

    hideBoss: () =>{
        env.stage.querySelectorAll('.gridpiece[slug="☺"]').forEach(el=>{el.innerHTML = ""; el.classList.remove('prop', 'blocks')})
    },

    removeHatch: () =>{
        env.stage.querySelectorAll('.hasbp').forEach(el=>el.classList.add('openhatch'))
    },

    entities: {
        "%": {
            class: "locked",
            teleportTarget: "test",
            lockFlag: "permalocked"
        },

        "☺": {
            class: "prop chartile blocks",
            contains: {
                class: "boss",
                examineEntity: "qou body",
                html: `<div class="sprite-wrapper golemsprite bossgolem">
                    <img src="/img/sprites/combat/foes/golemboss.gif" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/golemboss-head_stage.gif">
                    </div>
                    <img src="/img/sprites/combat/foes/golemboss-body_stage.gif" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/golemboss-arms_stage.gif" class="sprite golemsprite-arms">

                    <div class="target" entity="foundation golem"></div>
                </div>`
            }
        },
        
        "L": {
            class: "door big up",
            teleportTarget: "g_lobby",
            teleportSpot: 16,
            shouldFace: "up",
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'lobby'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_L.gif);"
                }
            } 
        },

        "♥": {
            class: "prop blocks notile gelitable left",
            contains: {
                class: "dullbeam",
                html: "<figure><span></span><span></span><span></span><span></span></figure>"
            }
        },

        "♦": {
            class: "prop blocks notile gelitable right",
            contains: {
                class: "dullbeam",
                html: "<figure><span></span><span></span><span></span><span></span></figure>"
            }
        },

        "C": {
            class: "blocks",
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/golemcorpse.gif)',
                    width: 2,
                    height: 1,
                }
            } 
        },

        "H": {
            class: "notile",
            contains: {
                examineEntity: "stowed tools",
                dyp: {
                    image: 'url(/img/local/embassy/wallhatch_small.gif)',
                    width: 1.5,
                    height: 1.5,
                    class: "archivalhatch",
                    noback: true,
                    transform: 'translate(-35%, -50%) rotateY(-90deg)',
                }
            }
        },

        ";": {
            class: "notile hasbp",
            contains: {
                examineEntity: "impressor",
                dyp: {
                    image: 'url(/img/local/embassy/wallhatch_small.gif)',
                    width: 1.5,
                    height: 1.5,
                    class: "archivalhatch",
                    noback: true,
                    transform: 'translate(-35%, -50%) rotateY(-90deg)',
                }
            }
        },

        "h": {
            class: "notile",
            contains: {
                examineEntity: "stowed tools",
                dyp: {
                    image: 'url(/img/local/embassy/wallhatch_small.gif)',
                    width: 1.5,
                    height: 1.5,
                    class: "archivalhatch",
                    noback: true,
                    transform: 'translate(35%, -50%) rotateY(90deg)',
                }
            }
        },

        "J": {
            class: "notile",
            contains: {
                examineEntity: "stowed tools",
                dyp: {
                    image: 'url(/img/local/embassy/wallhatch_small.gif)',
                    width: 1.5,
                    height: 1.5,
                    class: "archivalhatch",
                    noback: true,
                    transform: 'translateY(-50%) translateZ(calc(var(--gridTileSize) * 0.51))',
                }
            }
        },

        "D": {
            class: "darktile",
            contains: {
                dyp: {
                    class: "cornerdesk",
                    image: 'transparent',
                    width: 0,
                    height: 0,
                    transform: 'rotateX(90deg) translateY(50%) translateZ(calc(var(--gridTileSize) * 0.75)) rotateZ(-20deg) rotateX(-10deg) rotateY(10deg)',
                }
            } 
        },

        "d": {
            class: "notile",
            contains: {
                dyp: {
                    class: "cornerdesk",
                    image: 'transparent',
                    width: 0,
                    height: 0,
                    transform: 'rotateX(90deg) translateY(var(--gridTileSize)) translateZ(calc(var(--gridTileSize) * 0.75)) rotateZ(-180deg) rotateX(-10deg) rotateY(10deg)',
                }
            } 
        }, 

        'Ṇ': { 
            class:"blocks cwall north cornerwall",
            contains: {
                html: `
                    <canvas class="wall" sprite="/img/textures/panelpatterntranshort.gif, /img/textures/fadein.gif, /img/local/embassy/wallcover.gif" position="bottom, top" repeat="repeat-x" fit="stretch-y, auto, stretch" baseWidth="[wallH]" baseHeight="3"></canvas>
                    <canvas class="wall" sprite="/img/textures/panelpatterntranshort.gif, /img/textures/fadein.gif, /img/local/embassy/wallcover.gif" position="bottom, top" repeat="repeat-x" fit="stretch-y, auto, stretch" baseWidth="[wallW]" baseHeight="3"></canvas>
                `
            }
        },

        'Ṡ': { 
            class:"blocks cwall south cornerwall",
            contains: {
                html: `
                    <canvas class="wall" sprite="/img/textures/panelpatterntranshort.gif, /img/textures/fadein.gif, /img/local/embassy/wallcover.gif" position="bottom, top" repeat="repeat-x" fit="stretch-y, auto, stretch" baseWidth="[wallH]" baseHeight="3"></canvas>
                    <canvas class="wall" sprite="/img/textures/panelpatterntranshort.gif, /img/textures/fadein.gif, /img/local/embassy/wallcover.gif" position="bottom, top" repeat="repeat-x" fit="stretch-y, auto, stretch" baseWidth="[wallW]" baseHeight="3"></canvas>
                `
            }
        },
    },
    width: 9,
    plan: `
        Ṇ..J.J...
        .D▀‼C░░░.
        h‼|░░░░░;
        .░░░░░░░.
        .♥░░☺░░♦.
        .░░░░░░‼.
        h░C░░░|‼H
        .░░░p‼‼‼d
        ....L...Ṡ
    `,

    html: `
        <canvas class="golemceiling" sprite="/img/textures/black.gif" fit="stretch" baseWidth="[wallW]" baseHeight="[wallH]"></canvas>
    `
}

env.stages['g_m_hall'] = {
    locale: "golem",
    creature: env.stageEntities.embassyCreature,
    exec: function () {
        env.stages.golemStageInit(this)
        
        if(check("PAGE!!mboss")) {
            env.stage.querySelectorAll('.gridpiece[slug="K"]').forEach(el=>el.innerHTML = "")
        }
    },
    entities: {
        "%": {
            class: "locked",
            teleportTarget: "test",
            lockFlag: "permalocked"
        },

        "☺": {
            class: "placeholder blocks"
        },
        
        "L": {
            class: "door slim down",
            teleportTarget: "g_lobby",
            teleportSpot: 42,
            shouldFace: "left",
            lockExec: ()=>{if(isStageClear()) startDialogue('m_door'); else chatter({actor: 'sourceless', text: 'IT IS TOO DANGEROUS, WE MUST DESTROY THESE FOES', readout: true})},
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'lobby'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_L.gif);"
                }
            } 
        },
        
        //the sfer hall should maybe be locked until sfer is gone through first (or at least visited to open shortcut)
        "]": {
            class: "door slim left",
            teleportTarget: "g_s_sfer",
            lockFlag: "PAGE!!smcut",
            teleportSpot: 52,
            shouldFace: "left",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'this one is simply locked', readout: true}),
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'sfer supply'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_SS.gif);"
                }
            } 
        },

        "<": {
            class: "door slim right",
            teleportTarget: "g_m_minor",  
            teleportSpot: 13,
            shouldFace: "up",
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'lesser vats';'augments'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_LV.gif);"
                }
            } 
        },

        "(": {
            class: "door slim right",
            teleportTarget: "g_m_major",
            teleportSpot: 16,
            shouldFace: "up",
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'greater vats';'large formations'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_GV.gif);"
                }
            } 
        },

        "^": {
            class: "door slim up kaboom",
            teleportTarget: "g_m_dist",
            lockFlag: "PAGE!!gmdoor",
            teleportSpot: 13,
            shouldFace: "up",
            lockExec: ()=> {
                if(isStageClear()) {
                    startDialogue('m_door')
                } else {
                    chatter({actor: 'sourceless', text: 'we must clear the area first', readout: true})
                }
            },
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'distribution';'archival connection'"></span>`,
                examineEntity: "distribution door",
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_D.gif);"
                }
            } 
        },

        "D": {
            class: "notile",
            contains: {
                dyp: {
                    class: "cornerdesk",
                    image: 'transparent',
                    width: 0,
                    height: 0,
                    transform: 'rotateX(90deg) translateY(50%) translateZ(calc(var(--gridTileSize) * 0.75))',
                }
            } 
        },

        "d": {
            class: "notile",
            contains: {
                dyp: {
                    class: "cornerdesk alt",
                    image: 'transparent',
                    width: 0,
                    height: 0,
                    style: "left: 0;top: unset;bottom: 0;",
                    transform: 'rotateX(-90deg) translateZ(calc(var(--gridTileSize) * -0.75))',
                }
            } 
        },

        "H": {
            contains: {
                dyp: {
                    image: 'url(/img/sprites/obesk/chair.gif)',
                    width: 1.25,
                    height: 2,
                    transform: 'rotateY(45deg)',
                }
            } 
        },

        "h": {
            class: "notile",
            contains: {
                dyp: {
                    image: 'url(/img/sprites/obesk/chair.gif)',
                    width: 1.25,
                    height: 2,
                    transform: 'rotateY(125deg) rotateX(-90deg) translateY(-90%) translateZ(-1px)',
                }
            } 
        },

        "≤": {
            class: "notile",
            contains: {
                dyp: {
                    image: 'url(/img/sprites/obesk/chair.gif)',
                    width: 1.25,
                    height: 2,
                    transform: 'rotateY(156deg) rotateX(-90deg) translateY(-80%) translateZ(-1px)',
                }
            } 
        },

        "g": {
            class: "notile",
            contains: {
                dyp: {
                    image: 'url(/img/sprites/obesk/cystrack.gif)',
                    width: 2,
                    height: 1,
                    transform: 'translateX(-20%) translateY(-75%) rotateY(90deg) translateX(25%)',
                }
            } 
        },

        "C": {
            class: "notile",
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/golemcorpse.gif)',
                    width: 2,
                    height: 1,
                    transform: 'translateY(-100%)',
                }
            } 
        },

        "σ": {
            class: "notile",
            contains: {
                examineEntity: "instruction workspace",
                dyp: {
                    image: 'url(/img/local/embassy/analysis_golemhead.gif)',
                    width: 1,
                    height: 1,
                    transform: 'translateY(-75%) rotateY(90deg) translateX(-50%)',
                }
            } 
        },

        "θ": {
            class: "notile",
            contains: {
                examineEntity: "instruction workspace",
                dyp: {
                    image: 'url(/img/local/embassy/analysis_golemarm.gif)',
                    width: 1,
                    height: 1,
                    transform: 'translateY(-75%) rotateY(90deg) translateX(-50%)',
                }
            } 
        },

        "►": {
            class: "notile",
            contains: {
                dyp: {
                    examineEntity: "summarizer",
                    image: 'url(/img/sprites/obesk/scanner.gif)',
                    width: 1.5,
                    height: 1,
                    transform: 'translateY(-100%)',
                }
            } 
        },

        "K": {
            class: "blocks notile",
            contains: {
                class: "mindcores character",
                examineEntity: "mindcores",
                examinePriority: 2,
                html: env.stageEntities.mindcoresHTML,
                dyp: {
                    image: 'transparent',
                    width: 1.5,
                    height: 0.5,
                    transform: 'translateY(-100%) rotateY(-90deg) translateX(-90%) rotateY(90deg) translateX(-20%)',
                }
            } 
        },

        'Ṇ': { 
            class:"blocks cwall north cornerwall",
            contains: {
                html: `
                    <canvas class="wall" sprite="/img/textures/friend.gif, /img/textures/fadein.gif, /img/textures/panelpatterntranshort.gif, /img/local/embassy/golemwall_slice.gif, /img/local/embassy/golemtunnel_window.gif, /img/local/embassy/wallcover.gif" repeat="repeat, repeat-x, repeat, repeat, repeat, no-repeat" fit="stretch, auto, stretch-y, auto, auto, stretch" baseWidth="[wallH]" baseHeight="3"></canvas>
                    <canvas class="wall" sprite="/img/textures/friend.gif, /img/textures/fadein.gif, /img/textures/panelpatterntranshort.gif, /img/local/embassy/golemwall_slice.gif, /img/local/embassy/golemtunnel_window.gif, /img/local/embassy/wallcover.gif" repeat="repeat, repeat-x, repeat, repeat, repeat, no-repeat" fit="stretch, auto, stretch-y, auto, auto, stretch" baseWidth="[wallW]" baseHeight="3"></canvas>
                `
            }
        },

        'Ṡ': { 
            class:"blocks cwall south cornerwall",
            contains: {
                html: `
                    <canvas class="wall" sprite="/img/textures/friend.gif, /img/textures/fadein.gif, /img/textures/panelpatterntranshort.gif, /img/local/embassy/golemwall_slice.gif, /img/local/embassy/golemtunnel_window.gif, /img/local/embassy/wallcover.gif" repeat="repeat, repeat-x, repeat, repeat, repeat, no-repeat" fit="stretch, auto, stretch-y, auto, auto, stretch" baseWidth="[wallH]" baseHeight="3"></canvas>
                    <canvas class="wall" sprite="/img/textures/friend.gif, /img/textures/fadein.gif, /img/textures/panelpatterntranshort.gif, /img/local/embassy/golemwall_slice.gif, /img/local/embassy/golemtunnel_window.gif, /img/local/embassy/wallcover.gif" repeat="repeat, repeat-x, repeat, repeat, repeat, no-repeat" fit="stretch, auto, stretch-y, auto, auto, stretch" baseWidth="[wallW]" baseHeight="3"></canvas>
                `
            }
        },

    },
    width: 9,
    //maintenance hall should have some fiends, perhaps some destroyed scenery
    plan: `
        Ṇ...L....
        .DC.p░░b.
        .σH░░░░░.
        .g░░░░░░<
        ]░░░3░░░.
        .θ░░░░░░(
        hg░░░░░░.
        .dC►░░░b.
        ..≤K^...Ṡ
    `,

    html: `
        <canvas class="golemceiling" sprite="/img/textures/black.gif" fit="stretch" baseWidth="[wallW]" baseHeight="[wallH]"></canvas>
    `
}

env.stages['g_m_minor'] = {
    locale: "golem",
    creature: env.stageEntities.embassyCreature,
    exec: function () {
        env.stages.golemStageInit(this)
        if(!check("PAGE!!minvats")) startDialogue("m_min")
    },
    entities: {
        "^": {
            class: "door slim down",
            teleportTarget: "g_m_hall",
            teleportSpot: 34,
            shouldFace: "left",
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'manufacturing'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_M.gif);"
                }
            } 
        },

        "☺": {
            class: "placeholder blocks"
        },

        "Ü": {
            class: "prop blocks",
            contains: {
                examineEntity: "lesser terminal",
                dyp: {
                    image: 'url(/img/local/embassy/terminal_online.gif)',
                    width: 1,
                    height: 3,
                    transform: 'translateY(-25%)',
                }
            }
        },

        "╢": {
            class: "prop blocks notile",
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/vat.gif)',
                    width: 1,
                    height: 3,
                    transform: 'translateY(-25%)',
                    cross: true
                }
            }
        },

        "┐": {
            class: "prop blocks notile",
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/vatbroke.gif)',
                    width: 1,
                    height: 3,
                    transform: 'translateY(-25%)',
                    cross: true
                }
            }
        },

        'Ṇ': { 
            class:"blocks cwall north cornerwall",
            contains: {
                html: `
                    <canvas class="wall" sprite="/img/local/embassy/vatwall.gif, /img/textures/panelpatterntranshort.gif, /img/textures/fadein.gif, /img/local/embassy/wallcover.gif" position="center, bottom, top" repeat="repeat-x" fit="stretch, stretch-y, auto, stretch" baseWidth="[wallH]" baseHeight="3"></canvas>
                    <canvas class="wall" sprite="/img/local/embassy/vatwall.gif, /img/textures/panelpatterntranshort.gif, /img/textures/fadein.gif, /img/local/embassy/wallcover.gif" position="center, bottom, top" repeat="repeat-x" fit="stretch, stretch-y, auto, stretch" baseWidth="[wallW]" baseHeight="3"></canvas>
                `
            }
        },

        'Ṡ': { 
            class:"blocks cwall south cornerwall",
            contains: {
                html: `
                    <canvas class="wall" sprite="/img/local/embassy/vatwall.gif, /img/textures/panelpatterntranshort.gif, /img/textures/fadein.gif, /img/local/embassy/wallcover.gif" position="center, bottom, top" repeat="repeat-x" fit="stretch, stretch-y, auto, stretch" baseWidth="[wallH]" baseHeight="3"></canvas>
                    <canvas class="wall" sprite="/img/local/embassy/vatwall.gif, /img/textures/panelpatterntranshort.gif, /img/textures/fadein.gif, /img/local/embassy/wallcover.gif" position="center, bottom, top" repeat="repeat-x" fit="stretch, stretch-y, auto, stretch" baseWidth="[wallW]" baseHeight="3"></canvas>
                `
            }
        },
    },
    width: 9,
    //a minor vats (square tech) with a central control, some storage
    plan: `
        Ṇ..┰^┰...
        .b░░p░░b.
        .░░░░░░b.
        .░░░░░4░.
        .░.╢Ü╢.░.
        .╢┐.╢.╢┐.
        ........Ṡ
    `,

    html: `
        <canvas class="golemceiling" sprite="/img/textures/black.gif" fit="stretch" baseWidth="[wallW]" baseHeight="[wallH]"></canvas>
    `
}

env.stages['g_m_major'] = {
    locale: "golem",
    creature: env.stageEntities.embassyCreature,
    exec: function () {
        env.stages.golemStageInit(this)

        if(!check("PAGE!!majvatsnote") && check("PAGE!!mboss")) {
            startDialogue("m_maj")
            change("PAGE!!majvatsnote", true)
        }

        change("PAGE!!majvats", true)
    },
    entities: {
        "^": {
            class: "door slim down",
            teleportTarget: "g_m_hall",
            teleportSpot: 52,
            shouldFace: "left",
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'manufacturing'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_M.gif);"
                }
            } 
        },

        "☻": {
            class: "prop blocks notile",
            contains: {
                examineEntity: "greater terminal",
                class: "ikterminal",
                dyp: {
                    image: 'url(/img/local/embassy/projectorbig.gif)',
                    width: 3,
                    height: 3,
                    transform: 'rotateY(180deg) translateZ(calc(var(--gridTileSize) * 1.51)) translateY(10%)',
                }
            }
        },

        "↓": {
            class: "prop blocks notile",
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/projectorscreen.gif)',
                    width: 1.5,
                    height: 1.5,
                    transform: 'translateX(-33.5%) rotateY(90deg) translateY(-50%) translateX(33.3%)',
                }
            }
        },

        "◙": {
            class: "prop blocks notile",
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/projectorscreen.gif)',
                    width: 1.5,
                    height: 1.5,
                    transform: 'translateX(33.5%) rotateY(90deg) translateY(-50%) translateX(33.3%)',
                }
            }
        },

        "☺": {
            class: "blocks notile"
        },

        "♦": {
            class: "blocks notile",
            contains: {
                dyp: {
                    image: 'transparent',
                    width: 3,
                    height: 3,
                    class: "majorvatwall",
                    transform: 'rotateY(180deg) translateZ(calc(var(--gridTileSize) * 0.5))',
                }
            }
        },

        "☼": {
            class: "blocks notile",
            contains: {
                dyp: {
                    image: 'transparent',
                    width: 4.3,
                    height: 3,
                    class: "majorvatwall",
                    transform: 'translateZ(calc(var(--gridTileSize) * -1)) rotateY(-135deg)',
                }
            }
        },

        "♫": {
            class: "blocks notile",
            contains: {
                dyp: {
                    image: 'transparent',
                    width: 4.3,
                    height: 3,
                    class: "majorvatwall",
                    transform: 'translateZ(calc(var(--gridTileSize) * -1)) rotateY(135deg)',
                }
            }
        },

        "♣": {
            class: "blocks notile",
            contains: {
                dyp: {
                    image: 'transparent',
                    width: 2,
                    height: 3,
                    class: "majorvatwall",
                    transform: 'translateX(-25%) rotateY(-90deg) translateX(25%)',
                }
            }
        },

        "♠": {
            class: "blocks notile",
            contains: {
                dyp: {
                    image: 'transparent',
                    width: 2,
                    height: 3,
                    class: "majorvatwall",
                    transform: 'translateX(25%) rotateY(90deg) translateX(-25%)',
                }
            }
        },

        'O': { 
            class: "prop blocks notile",
            contains: {
                class: "golemparts",
                html: `<figure>
                    <img src="/img/local/embassy/ikgolemhead.gif" class="ikh">
                    <img src="/img/local/embassy/ikgolembody.gif" class="ikb">
                    <img src="/img/local/embassy/ikgolemarm.gif" class="ika">
                    <img src="/img/local/embassy/ikgolemarm.gif" class="ika">
                </figure>`
            }
        },

        'Ṇ': { 
            class:"blocks cwall north cornerwall",
            contains: {
                html: `
                    <canvas class="wall"></canvas>
                    <canvas class="wall" sprite="/img/textures/panelpatterntranshort.gif, /img/textures/fadein.gif, /img/local/embassy/wallcover.gif" position="bottom, top" repeat="repeat-x" fit="stretch-y, auto, stretch" baseWidth="[wallW]" baseHeight="3"></canvas>
                `
            }
        },

    },
    width: 11,
    //a central vat (square tech) with some doodads around it, storage
    //would be cool if there was a terminal and the golem parts could be moved into the vats
    plan: `
        Ṇ...┰^┰....
        .‼b░░p░bb‼.
        ..‼░░░░b...
        .☺♫‼░░░‼☼☺.
        .☺☺♠░░░♣☺☺.
        .☺☺◙░░░↓☺☺.
        .☺☺☺☺♦☺☺☺☺.
        .....☻O....
    `,

    html: `
    <canvas class="golemceiling majordome" sprite="/img/local/embassy/golemceiling.gif, /img/local/embassy/ceilingcover.gif" fit="auto, stretch" repeat="repeat" baseWidth="9" baseHeight="3"></canvas>
    <canvas class="golemceiling majorcolumn" sprite="/img/local/embassy/golemceiling.gif, /img/local/embassy/ceilingcover.gif" fit="auto, stretch" repeat="repeat-y" baseWidth="3" baseHeight="5"></canvas>
    `
}

env.stages['g_m_dist'] = {
    locale: "golem",
    creature: env.stageEntities.embassyCreature,
    exec: function () {
        env.stages.golemStageInit(this)
        if(!check("PAGE!!mboss")) {
            startDialogue("m_boss")
        } else {
            env.stages['g_m_dist'].removeBoss()
        }

        if(check("PAGE!!ikgolem")) env.stage.querySelectorAll('.gridpiece[slug="s"]').forEach(el=>{el.innerHTML = "";el.classList.remove('blocks', 'darktile')})
    },

    removeBoss: function () {
        env.stage.querySelectorAll('.gridpiece[slug="☻"').forEach(el=>{el.innerHTML = ""; el.classList.remove('prop', 'blocks')})
    },

    entities: {
        "^": {
            class: "door slim down",
            teleportTarget: "g_m_hall",
            teleportSpot: 67,
            shouldFace: "down",
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'manufacturing'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_M.gif);"
                }
            } 
        },

        "☻": {
            class: "blocks darktile",
            contains: {
                class: "boss evil newevil important",
                html: env.COMBAT_ACTORS['kivii'].graphic.replace("combat.gif", "1.gif")
            }
        },

        "H": {
            class: "notile",
            contains: {
                examineEntity: "archival hatch",
                dyp: {
                    image: 'url(/img/local/embassy/archivalhatch.gif)',
                    width: 3,
                    height: 3,
                    class: "archivalhatch",
                    noback: true,
                    transform: 'translateX(-17%) rotateY(-90deg)',
                }
            }
        },

        "h": {
            class: "notile",
            contains: {
                examineEntity: "archival hatch",
                dyp: {
                    image: 'url(/img/local/embassy/archivalhatch.gif)',
                    width: 3,
                    height: 3,
                    class: "archivalhatch",
                    noback: true,
                    transform: 'translateX(17%) rotateY(90deg)',
                }
            }
        },

        "J": {
            class: "notile",
            contains: {
                examineEntity: "archival hatch",
                dyp: {
                    image: 'url(/img/local/embassy/archivalhatch.gif)',
                    width: 3,
                    height: 3,
                    class: "archivalhatch",
                    noback: true,
                    transform: 'translateZ(calc(var(--gridTileSize) * -0.51)) rotateY(180deg)',
                }
            }
        },

        "C": {
            class: "blocks",
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/golemcorpse.gif)',
                    width: 2,
                    height: 1,
                    transform: 'rotateY(20deg)',
                }
            } 
        },

        "V": {
            class: "blocks",
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/golemcorpse.gif)',
                    width: 2,
                    height: 1,
                    transform: 'rotateY(-45deg)',
                }
            } 
        },

        "S": {
            class: "blocks",
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/golemcorpse_ik.gif)',
                    width: 2.5,
                    height: 1.5,
                    transform: 'rotateY(20deg)',
                }
            } 
        },

        "s": {
            class: "blocks ikswap",
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/golemcorpse_ik.gif)',
                    width: 2.5,
                    height: 1.5,
                    transform: 'rotateY(20deg)',
                }
            } 
        },

        "Ü": {
            class: "notile",
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/terminal.gif)',
                    width: 2,
                    height: 2,
                    transform: 'rotateY(180deg) translateZ(calc(var(--gridTileSize) * 0.52)) translateY(-25%)',
                }
            }
        },

        "D": {
            class: "darktile",
            contains: {
                dyp: {
                    class: "cornerdesk archival",
                    image: 'transparent',
                    width: 0,
                    height: 0,
                    transform: 'rotateX(90deg) translateY(50%) translateZ(calc(var(--gridTileSize) * 0.75)) rotateZ(-20deg) rotateX(-10deg) rotateY(10deg)',
                }
            } 
        },

        "d": {
            class: "notile",
            contains: {
                dyp: {
                    class: "cornerdesk archival",
                    image: 'transparent',
                    width: 0,
                    height: 0,
                    transform: 'rotateX(90deg) translateY(50%) translateZ(calc(var(--gridTileSize) * 0.75))  rotateZ(-180deg) rotateX(-10deg) rotateY(10deg)',
                }
            } 
        },
        
        "g": {
            class: "notile",
            contains: {
                dyp: {
                    image: 'url(/img/sprites/obesk/cystrack.gif)',
                    width: 2,
                    height: 1,
                    transform: 'translateX(50%) rotateY(90deg) translateY(-50%) rotateX(-100deg) rotateY(9deg)',
                }
            } 
        },

        ">": {
            class: "notile",
            contains: {
                dyp: {
                    image: 'url(/img/sprites/obesk/chair.gif)',
                    width: 1.25,
                    height: 2,
                    transform: 'rotateY(125deg) rotateX(-90deg) translateY(-90%) translateZ(-1px)',
                }
            } 
        },
        
        "ù": {
            class: "darktile",
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/sludgecolumnwall.gif)',
                    width: 2,
                    height: 3,
                    transform: 'rotateY(135deg) translateX(25%)'
                }
            } 
        },

        'Ṇ': { 
            class:"blocks cwall north cornerwall",
            contains: {
                html: `
                    <canvas class="wall" sprite="/img/textures/fadein.gif, /img/textures/panelpatterntranshort.gif, /img/local/embassy/wallcover.gif" position="top, bottom" repeat="repeat-x" fit="auto, stretch-y, stretch" baseWidth="[wallH]" baseHeight="3"></canvas>
                    <canvas class="wall" sprite="/img/textures/fadein.gif, /img/textures/panelpatterntranshort.gif, /img/local/embassy/wallcover.gif" position="top, bottom" repeat="repeat-x" fit="auto, stretch-y, stretch" baseWidth="[wallW]" baseHeight="3"></canvas>
                `
            }
        },

        'Ṡ': { 
            class:"blocks cwall south cornerwall",
            contains: {
                html: `
                    <canvas class="wall" sprite="/img/textures/fadein.gif, /img/textures/panelpatterntranshort.gif, /img/local/embassy/wallcover.gif" position="top, bottom" repeat="repeat-x" fit="auto, stretch-y, stretch" baseWidth="[wallH]" baseHeight="3"></canvas>
                    <canvas class="wall" sprite="/img/textures/fadein.gif, /img/textures/panelpatterntranshort.gif, /img/local/embassy/wallcover.gif" position="top, bottom" repeat="repeat-x" fit="auto, stretch-y, stretch" baseWidth="[wallW]" baseHeight="3"></canvas>
                `
            }
        }
    },
    width: 9,
    //┠┰┨┻
    //shelves of golem parts, spilled containers, dead qou
    //the boss is in front of some sort of equipment, with the override off to the side
    plan: `
        Ṇ..┰^┰...
        .‼‼░p░░b.
        h‼|░░░░░H
        >‼‼V░░░C.
        ┠D‼░░C░b┨
        g‼V░☻░░‼.
        h|s░░░‼‼H
        .░░░░‼Sùd
        ..Ü┻J┻..Ṡ
    `,

    html: `
        <canvas class="golemceiling" sprite="/img/textures/black.gif" fit="stretch" baseWidth="[wallW]" baseHeight="[wallH]"></canvas>
    `
}

env.stages['g_s_metals'] = {
    locale: "golem",
    creature: env.stageEntities.embassyCreature,
    exec: function () {
        env.stages.golemStageInit(this)
    },
    entities: {        
        "L": {
            class: "door slim down",
            teleportTarget: "g_lobby",
            teleportSpot: 86,
            shouldFace: "left",
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'lobby'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_L.gif);"
                }
            } 
        },

        "v": {
            class: "door slim up",
            teleportTarget: "g_s_sfer",
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'sfer generation'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_SG.gif);"
                }
            } 
        },        

        "☺": {
            class: "placeholder blocks"
        },

        "☻": {
            class: "prop blocks",
            contains: {
                class: "dyingqou",
                examineEntity: "preprocessing metals",
                html: `<figure></figure>`
            }
        },

        "¥": {
            class: "prop blocks",
            contains: {
                class: "processor",
                examineEntity: "preprocessing metals",
                html: `<figure></figure>`
            }
        },

        "╝": {
            class: "prop blocks",
            contains: {
                class: "processor sludged",
                examineEntity: "preprocessing metals",
                html: `<figure></figure>`
            }
        },

        c: {
            class: "prop blocks",
            contains: {
                class: "container",
                html: `<figure style="transform: rotateY(-90deg)">
                    <div class="target" entity="container"></div>
                </figure>`
            }
        },

        "◙": {
            class: "prop blocks",
            contains: {
                class: "scrapmetal",
                html: `<figure></figure>`
            }
        },

        "♥": {
            class: "dyp blocks",
            contains: {
                class: "testdyp",
                examineEntity: "preprocessing metals",
                dyp: {
                    image: 'url(/img/local/embassy/f1.gif)',
                    width: 1,
                    height: 2,
                    transform: 'rotateY(45deg)',
                    cross: true
                }
            }
        },

        "0": {
            class:"prop blocks genericblocker",
        },
    },
    width: 9,
    //this should be a repository for essential metals that are being used for golem maintenance specifically
    plan: `
        Ṇ...L....
        .00░p░░b.
        .0¥░░░░b.
        .◙0░░░░c┨
        .0╝░6░░b.
        .00░░░░b.
        ....v...Ṡ
    `,

    html: `
        <canvas class="golemceiling" sprite="/img/local/embassy/golemceiling.gif, /img/local/embassy/ceilingcover.gif" fit="auto, stretch" repeat="repeat" baseWidth="[wallW]" baseHeight="[wallH]"></canvas>
    `
}

env.stages['g_s_sfer'] = {
    locale: "golem",
    creature: env.stageEntities.embassyCreature,
    exec: function () {
        env.stages.golemStageInit(this)

        if(check("unity_dog")) {
            document.querySelectorAll('#realgrid .isopod').forEach(el=>el.remove())
        } else {
            env.dogSetup()
        }
    },

    leaveExec: function () {
        clearInterval(env.stages.isopod)
    },

    entities: {
        "^": {
            class: "door slim down",
            teleportTarget: "g_s_metals",
            teleportSpot: 49,
            shouldFace: "down",
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'sfer supply'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_SS.gif);"
                }
            } 
        },

        "v": {
            class: "door slim up",
            teleportTarget: "g_s_storage",
            lockFlag: "EXEC::isStageClear()",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'we should not rush ahead without securing this area', readout: true}),
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'sfer storage';'dull delivery'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_ST.gif);"
                }
            } 
        },  

        "m": {
            class: "door slim right",
            teleportTarget: "g_m_hall",
            lockFlag: "PAGE!!smcut",
            teleportSpot: 37,
            shouldFace: "right",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'this one is simply locked', readout: true}),
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'manufacturing'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_M.gif);"
                }
            } 
        },  

        "V": {
            class: "notile",
            contains: {
                class: "sfervat",
                html: `<figure></figure>`
            }
        },   

        "¶": {
            class: "notile",
            contains: {
                class: "sfervat busted",
                html: `<figure></figure>`
            }
        },  

        "B": {
            class: "notile",
            contains: {        
                class: "deadtainer vatbase",
                //this looks unhinged but these are the sides of the box
                html: `<span></span><span></span><span></span><span></span><span></span>`
            }
        },

        "_": {
            class: "notile",
            contains: {        
                class: "deadtainer vatbase otherside",
                html: `<span></span><span></span><span></span><span></span><span></span>`
            }
        },

        "ò": {
            class: "notile",
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/vatspill.gif)',
                    width: 3,
                    height: 3,
                    transform: 'rotateY(90deg) translateX(33%) rotateX(-90deg) translateZ(-1px) translateY(-40%)',
                }
            } 
        },

        "Ü": {
            class: "prop blocks",
            contains: {
                examineEntity: "inactive terminal",
                dyp: {
                    image: 'url(/img/local/embassy/terminal.gif)',
                    width: 1,
                    height: 3,
                    transform: 'rotateY(90deg) translateY(-25%)',
                }
            }
        },

        "↓": {
            class: "prop blocks",
            contains: {
                examineEntity: "ruined glazika",
                dyp: {
                    image: 'url(/img/local/embassy/ruinedglazika.gif)',
                    width: 3,
                    height: 3,
                    noback: true,
                    transform: 'rotateX(90deg) translateZ(2px) translate(90%, 80%)',
                }
            }
        },
    },
    width: 9,
    //this should almost look like a mix between an aquarium and a garden
    //with vats built into walls and repositories for materials no longer needed

    plan: `
        Ṇ...^...┼
        ..░░p░░..
        VB░░░░░_.
        ..░░░░░..
        ..░░░░░░.
        .Ü░░7░░░m
        ..░░░░░░.
        .↓░░░░░..
        ¶B░░░░░_.
        .ò░░░░░..
        ....v...Ṡ
    `,

    html: `
        <canvas class="golemceiling" sprite="/img/local/embassy/golemceiling.gif, /img/local/embassy/ceilingcover.gif" fit="auto, stretch" repeat="repeat" baseWidth="[wallW]" baseHeight="[wallH]"></canvas>
    `
}

env.stages['g_s_storage'] = {
    locale: "golem",
    creature: env.stageEntities.embassyCreature,
    exec: function () {
        env.stages.golemStageInit(this)
        if(!check("PAGE!!sboss")) {
            startDialogue("s_boss")
            content.classList.add('dullified')
        }

        env.stages['g_s_storage'].removeBoss(true)
    },

    leaveExec: function () {
        content.classList.remove('dullified', 'busted')
    },

    removeBoss: function (removeBeamsToo = false) {
        if(check('PAGE!!sboss')) {
            env.stage.querySelectorAll('.gridpiece[slug="☻"').forEach(el=>{el.innerHTML = ""; el.classList.remove('prop', 'blocks')})
            if(removeBeamsToo) env.stages['g_s_storage'].normalize()
        }
    },

    normalize: function () {
        //busts up the walls, removes dull
        content.classList.remove('dullified')
        content.classList.add('busted')

        //turns the beams into boxes
        env.stage.querySelectorAll('.dullbeam').forEach(el=>{
            el.classList.remove('dullbeam')
            el.classList.add('deadtainer', 'special')
            el.parentElement.classList.remove('prop')
            el.innerHTML = el.innerHTML.replace('<figure>', "").replace("</figure>", "")
            el.insertAdjacentHTML('beforeend', "<span></span><span></span>")
        })

        //update walls
        env.stage.querySelectorAll("canvas.wall").forEach(wall=>{
            wall.setAttribute("sprite", "/img/local/embassy/golemwallmelt.gif, /img/local/embassy/wallcover.gif" )
            wall.setAttribute("repeat", "repeat-x" )
            wall.setAttribute("fit", "auto, stretch")
            wall.setAttribute("baseHeight", "3.3")
        })

        initializeAssetCanvases(true)
    },

    entities: {
        "^": {
            class: "door slim down",
            teleportTarget: "g_s_sfer",
            teleportSpot: 85,
            shouldFace: "down",
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'sfer generation'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_SG.gif);"
                }
            } 
        },

        "☺": {
            class: "prop blocks notile",
            contains: {
                class: "dullbeam",
                html: "<figure><span></span><span></span><span></span><span></span></figure>"
            }
        },

        "☻": {
            class: "prop blocks notile",
            contains: {
                class: "boss",
                examineEntity: "qou body",
                html: `<div class="sprite-wrapper golemsprite dullzika" id="%SLUG-sprite-wrapper" style="transform: rotateY(180deg)">
                    <img src="/img/sprites/combat/foes/turboglazika.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/turboglazika-hat.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/turboglazika-eyes.gif" id="%SLUG-golemsprite-neck" class="sprite golemsprite-neck">
                    <img src="/img/sprites/combat/foes/turboglazika-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                </div>`
            }
        },

        'Ṇ': { 
            class:"blocks cwall north cornerwall",
            contains: {
                html: `
                    <canvas class="wall" sprite="/img/local/embassy/golemwallmeltfadedoubledull.gif" fit="stretch" baseWidth="[wallH]" baseHeight="5"></canvas>
                    <canvas class="wall" sprite="/img/local/embassy/golemwallmeltfadedoubledull.gif" fit="stretch" baseWidth="[wallW]" baseHeight="5"></canvas>
                `
            }
        },

        'Ṡ': { 
            class:"blocks cwall south cornerwall",
            contains: {
                html: `
                    <canvas class="wall" sprite="/img/local/embassy/golemwallmeltfadedoubledull.gif" fit="stretch" baseWidth="[wallH]" baseHeight="5"></canvas>
                    <canvas class="wall" sprite="/img/local/embassy/golemwallmeltfadedoubledull.gif" fit="stretch" baseWidth="[wallW]" baseHeight="5"></canvas>
                `
            }
        }

    },
    width: 9,
    plan: `
        Ṇ...^....
        .░░░p░░░.
        .░░☺░░░░.
        .░|░░░☺░.
        .░☺░☻░░░.
        .░░░☺░|░.
        .░░░|░░░.
        ........Ṡ
    `,

    html: `
        <canvas class="golemceiling" sprite="/img/local/embassy/golemceiling.gif, /img/local/embassy/ceilingcover.gif" fit="auto, stretch" repeat="repeat" baseWidth="[wallW]" baseHeight="[wallH]"></canvas>
    `
}

env.stages['g_o_hall1'] = {
    locale: "golem",
    creature: env.stageEntities.embassyCreature,
    exec: function () {
        env.stages.golemStageInit(this)
    },
    entities: {
        "☺": {
            class: "placeholder blocks"
        },

        "L": {
            class: "door slim down",
            teleportTarget: "g_lobby",
            teleportSpot: 34,
            shouldFace: "right",
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'lobby'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_L.gif);"
                }
            } 
        },

        "d": {
            class: "door slim left",
            teleportTarget: "g_o_r_dull",
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'dull analysis'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_DA.gif);"
                }
            } 
        },
        
        "[": {
            class: "door slim sludged right",
            teleportTarget: "nothing",
            lockFlag: "permalocked",
        },

        "A": {
            class: "notile",
            contains: {
                examineEntity: "archival sludge",
                dyp: {
                    class: "archivalsludge",
                    image: 'url(/img/local/embassy/archivalwall_busted.gif)',
                    width: 6,
                    height: 3,
                    noback: true,
                    transform: 'rotateY(20deg) translateX(38%) rotateY(180deg)',
                }
            } 
        },

        'Ṡ': { 
            class:"blocks cwall south cornerwall",
            contains: {
                html: `
                    <canvas class="wall" sprite="/img/local/embassy/golemwall.gif, /img/local/embassy/mossdesign.gif, /img/local/embassy/wallcover.gif" repeat="repeat-x" fit="auto, contain, stretch" baseWidth="[wallH]" baseHeight="3"></canvas>
                    <canvas class="wall" sprite="/img/local/embassy/archivalwall.gif" repeat="repeat-x" fit="stretch" baseWidth="[wallW]" baseHeight="3"></canvas>
                `
            }
        },
    },
    width: 7,
    plan: `
        Ṇ.┰L┰..
        .░░p░░.
        ┠░░░░░╢
        d░░░░|[
        ╟░|....
        .A.....
        ......Ṡ
    `,

    html: `
        <canvas class="golemceiling" sprite="/img/local/embassy/golemceiling_busted.gif, /img/local/embassy/ceilingcover.gif" fit="auto, stretch" repeat="repeat" baseWidth="[wallW]" baseHeight="[wallH]"></canvas>
    `
}

env.stages['g_o_hall2'] = {
    locale: "golem",
    creature: env.stageEntities.embassyCreature,
    exec: function () {
        env.stages.golemStageInit(this)
    },
    entities: {
        "☺": {
            class: "placeholder blocks"
        },

        "D": {
            class: "door slim left",
            teleportTarget: "g_o_r_friends",
            teleportSpot: 64,
            shouldFace: "left",
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'friends';'echo research'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_ER.gif);"
                }
            } 
        },

        "]": {
            class: "door slim sludged left",
            teleportTarget: "nothing",
            lockFlag: "permalocked",
        },
        
        "[": {
            class: "door slim sludged right",
            teleportTarget: "nothing",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'akizet', text: 'it has no yield', readout: true})
        },

        "☻": {
            exec: ()=> {
                if(!check("PAGE!!bozcav")) startDialogue("ops_bozcav")
            }
        },

        "t": {
            class: "door slim up",
            teleportTarget: "g_o_r_translation",
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'translation'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_T.gif);"
                }
            } 
        },

        "A": {
            class: "notile",
            contains: {
                examineEntity: "archival sludge",
                dyp: {
                    class: "archivalsludge",
                    image: 'url(/img/local/embassy/archivalwall_busted.gif)',
                    width: 6,
                    height: 3,
                    noback: true,
                    transform: 'translateZ(calc(var(--gridTileSize) * 1)) translateX(-27%) rotateY(10deg)',
                }
            } 
        },

        "a": {
            class: "notile",
            contains: {
                examineEntity: "archival sludge",
                dyp: {
                    class: "archivalsludge",
                    image: 'url(/img/local/embassy/archivalwall_busted.gif)',
                    width: 6,
                    height: 3,
                    noback: true,
                    transform: 'rotateY(100deg)',
                }
            } 
        },
        
        "ù": {
            class: "darktile",
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/sludgecolumnwall.gif)',
                    width: 2,
                    height: 3,
                    transform: 'rotateY(107deg) translateX(-27%)'
                }
            } 
        },

        'Ṇ': { 
            class:"blocks cwall south cornerwall",
            contains: {
                html: `
                    <canvas class="wall" sprite="/img/local/embassy/archivalwall.gif" repeat="repeat-x" fit="stretch" baseWidth="[wallH]" baseHeight="3"></canvas>
                    <canvas class="wall" sprite="/img/local/embassy/archivalwall.gif" repeat="repeat-x" fit="stretch" baseWidth="[wallW]" baseHeight="3"></canvas>
                    
                `
            }
        },

    },
    width: 7,
    //archival vein overlap - the stone is here, but the hall is split by holes in the ceiling
    //that have given way to archival vein looking walls, partially melted
    //the player loops through 4 side rooms before being able to reach the last one
    plan: `
        Ṇ....A.
        .....ù.
        D☻p░░░[
        ╟|░░░░┨
        ..░░░░.
        ..░░░|╢
        .a░░░░[
        ..|░░░┨
        ..░░░Y.
        ..╧t┻.Ṡ
    `,

    html: `
        <canvas class="golemceiling" sprite="/img/local/embassy/golemceiling_busted.gif, /img/local/embassy/ceilingcover.gif" fit="auto, stretch" repeat="repeat" baseWidth="[wallW]" baseHeight="[wallH]"></canvas>
    `
}

env.stages['g_o_r_dull'] = {
    locale: "golem",
    creature: env.stageEntities.embassyCreature,
    exec: function () {
        env.stages.golemStageInit(this)
    },
    entities: {
        "%": {
            class: "locked",
            teleportTarget: "test",
            lockFlag: "permalocked"
        },

        "H": {
            class: "door slim right",
            teleportTarget: "g_o_hall1",
            teleportSpot: 22,
            shouldFace: "right",
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'minor operations'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_MO.gif);"
                }
            } 
        },

        "D": {
            class: "door slim up",
            teleportTarget: "g_o_r_friends",
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'friends';'echo research'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_ER.gif);"
                }
            } 
        },

        "☺": {
            class: "prop blocks notile gelitable",
            contains: {
                class: "dullbeam",
                html: "<figure><span></span><span></span><span></span><span></span><span><div class='target' entity='dull structure'></div></span></figure>"
            }
        },

        "Ü": {
            class: "prop blocks notile",
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/terminal_busted.gif)',
                    width: 1,
                    height: 3,
                    transform: 'translateY(-25%)',
                }
            }
        },

    },
    width: 11,
    plan: `
        ...........
        .....○.....
        ....○○○....
        ...○○○○○...
        ..○○.Ü.○○..
        .○○○.☺.○○pH
        ..○○.Ü.○○..
        ...○○○○○...
        ....○○○....
        .....○.....
        .....D.....
    `,

    html: `
        <canvas class="golemceiling dullrug" sprite="/img/textures/black.gif, /img/local/embassy/dullrug.gif" fit="stretch, auto" repeat="repeat, no-repeat" position="center" baseWidth="[wallW]" baseHeight="[wallH]"></canvas>
        <canvas class="golemceiling dullrug" sprite="/img/textures/black.gif, /img/local/embassy/dullrug.gif" fit="stretch, auto" repeat="repeat, no-repeat" position="center" baseWidth="[wallW]" baseHeight="[wallH]"></canvas>
    `
}

env.stages['g_o_r_friends'] = {
    locale: "golem",
    creature: env.stageEntities.embassyCreature,
    exec: function () {
        env.stages.golemStageInit(this)
    },
    entities: {
        "%": {
            class: "locked",
            teleportTarget: "test",
            lockFlag: "permalocked"
        },

        "H": {
            class: "door slim right",
            teleportTarget: "g_o_hall2",
            teleportSpot: 15,
            shouldFace: "right",
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'minor operations'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_MO.gif);"
                }
            } 
        },

        "D": {
            class: "door slim down",
            teleportTarget: "g_o_r_dull",
            teleportSpot: 104,
            shouldFace: "down",
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'dull analysis'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_DA.gif);"
                }
            } 
        },

        "☺": {
            class: "placeholder blocks"
        },

        "F": {
            class: "blocks notile",
            contains: {
                examineEntity: "shelf",
                dyp: {
                    image: 'url(/img/local/embassy/archivalshelf_busted.gif)',
                    width: 5,
                    height: 3,
                    transform: 'rotateY(45deg)',
                    noback: true,
                }
            } 
        },

        "Ƒ": {
            class: "blocks notile",
            contains: {
                examineEntity: "shelf",
                dyp: {
                    image: 'url(/img/local/embassy/archivalshelf_noback.gif)',
                    width: 5,
                    height: 3,
                    transform: 'rotateY(-135deg)',
                    noback: true,
                }
            } 
        },

        "f": {
            class: "blocks notile",
            contains: {
                examineEntity: "shelf",
                dyp: {
                    image: 'url(/img/local/embassy/archivalshelf_noback.gif)',
                    width: 5,
                    height: 3,
                    transform: 'rotateY(-45deg)',
                    noback: true,
                }
            } 
        },

        "ƒ": {
            class: "blocks notile",
            contains: {
                examineEntity: "shelf",
                dyp: {
                    image: 'url(/img/local/embassy/archivalshelf_busted.gif)',
                    width: 5,
                    height: 3,
                    transform: 'rotateY(135deg)',
                    noback: true,
                }
            } 
        },

        "h": {
            class: "notile",
            contains: {
                examineEntity: "archival hatch",
                dyp: {
                    image: 'url(/img/local/embassy/archivalhatch.gif)',
                    width: 3,
                    height: 3,
                    class: "archivalhatch",
                    noback: true,
                    transform: 'translateX(17%) rotateY(90deg)',
                }
            }
        },

        "m": {
            class: "blocks notile",
            contains: {
                examineEntity: "echo chamber",
                dyp: {
                    image: 'url(/img/local/embassy/mindscanner.gif)',
                    width: 1,
                    height: 3,
                    cross: true,
                    transform: 'rotateY(45deg)'
                }
            } 
        },

        "M": {
            class: "blocks notile",
            contains: {
                examineEntity: "echo chamber",
                dyp: {
                    image: 'url(/img/local/embassy/mindscanner_closed.gif)',
                    width: 1,
                    height: 3,
                    cross: true,
                    transform: 'rotateY(45deg)'
                }
            } 
        }

    },
    width: 11,
    plan: `
        .....D.....
        .....p.....
        ....○○○....
        ..F○○○○○f..
        ..M○○○○|○..
        h○○○○○○○○○H
        ..m|○@○○○..
        ..ƒ○○○○○Ƒ..
        ....M○M....
        .....m.....
        ...........
    `,

    html: `
        <canvas class="golemceiling" sprite="/img/local/embassy/golemceiling.gif, /img/local/embassy/ceilingcover.gif" fit="auto, stretch" repeat="repeat" baseWidth="[wallW]" baseHeight="[wallH]"></canvas>
        <canvas class="golemceiling" sprite="/img/local/embassy/golemceiling.gif, /img/local/embassy/ceilingcover.gif" fit="auto, stretch" repeat="repeat" baseWidth="[wallW]" baseHeight="[wallH]"></canvas>
    `
}

env.stages['g_o_r_translation'] = {
    locale: "golem",
    creature: env.stageEntities.embassyCreature,
    exec: function () {
        toggleBgm(env.embassy.music_television)
        if(!check("PAGE!!obosslearn")) {
            startDialogue("ops_boss")
        } else if(check("PAGE!!obossrun") && !check('PAGE!!oboss')) {
            startDialogue("ops_boss_return")
        }
      
        env.stages['g_o_r_translation'].removeWordfriend()
    },
    removeWordfriend: function () {
        if(check('PAGE!!oboss')) {
            env.stage.querySelectorAll('.gridpiece[slug="W"').forEach(el=>{el.innerHTML = ""; el.classList.remove('prop', 'blocks', 'chartile'); el.classList.add('empty', 'circle')})
            initializeFloorCanvas(env.stage.current, env.stage.real)
        }
    },

    entities: {
        "%": {
            class: "locked",
            teleportTarget: "test",
            lockFlag: "permalocked"
        },

        "H": {
            class: "door slim down",
            teleportTarget: "g_o_hall2",
            teleportSpot: 59,
            shouldFace: "down",
            contains: {
                html: `<span class='sign' definition="INHERITED CONTEXT::'minor operations'"></span>`,
                dyp: {
                    class: "doorsign",
                    style: "--signImage: url(/img/local/embassy/sign_MO.gif);"
                }
            } 
        },

        "A": {
            class: "notile",
            contains: {
                examineEntity: "lightning terminals",
                dyp: {
                    image: 'url(/img/local/embassy/tvs_warped.gif)',
                    width: 3.775,
                    height: 3,
                    noback: true,
                    transform: 'rotateY(180deg)',
                }
            } 
        },

        "a": {
            class: "notile",
            contains: {
                examineEntity: "lightning terminals",
                dyp: {
                    class: "tvstatic",
                    image: 'url(/img/local/embassy/tvs.gif)',
                    width: 3.775,
                    height: 3,
                    noback: true,
                    transform: 'rotateY(120deg) translateX(-11%)',
                }
            } 
        },

        "t": {
            class: "notile",
            contains: {
                examineEntity: "lightning terminals",
                dyp: {
                    image: 'url(/img/local/embassy/tvs_warped.gif)',
                    width: 3.775,
                    height: 3,
                    noback: true,
                    transform: 'rotateY(241deg) translateX(11%)',
                }
            } 
        },

        "W": {
            class: "prop chartile blocks",
            contains: {
                class: "wordfriend",
                examineEntity: "qou body",
                html: `<div class="sprite-wrapper">
                    <div class="spinny">
                        <img src="/img/sprites/combat/foes/translator_core.gif" class="sprite diamond">
                        <img src="/img/sprites/combat/foes/translator_core.gif" class="sprite diamond">
                    </div>

                    <div class="orbs">
                        <div class="orb"></div>
                        <div class="orb"></div>
                        <div class="orb"></div>
                    </div>

                    <div class="orbs">
                        <div class="orb"></div>
                        <div class="orb"></div>
                    </div>

                    <div class="target" entity="damaged golem"></div>
                </div>`
            }
        }
    },
    width: 11,
    plan: `
        .....H.....
        .....p.....
        ....○○○|...
        ...|○○○○.|.
        .|.○○○○○...
        ..a○○W○○t..
        ...○○○○○...
        .....A.....
        ...........
        ...........
        ...........
    `,

    html: `
        <canvas class="golemceiling dullrug" sprite="/img/textures/blackstaticSTILL.gif" fit="auto" repeat="repeat" baseWidth="[wallW]" baseHeight="[wallH]"></canvas>
        <canvas class="golemceiling dullrug" sprite="/img/textures/blackstaticSTILL.gif" fit="auto" repeat="repeat" baseWidth="[wallW]" baseHeight="[wallH]"></canvas>
    `
}