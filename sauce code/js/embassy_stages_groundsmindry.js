/* base ref:
    Cavik: v
    Bozko: k
    Gakvu: G
    Tozik: T
    Miltza: M
    Karik: m (mindcores)
    IK: Æ
    telyu: V
    idril: Ĵ
*/

env.stageEntities['m'] = { 
    class:"prop chartile blocks",
    contains: {
        id: "mindcores",
        class: "mindcores karik character collapser",
        examineEntity: "karik",
        html: env.stageEntities.mindcoresHTML
    }
}

env.stageEntities['Æ'] = { 
    class:"prop chartile blocks",
    contains: {
        id: "ikgolem",
        class: "ikgolem character collapser awake",
        examineEntity: "ik golem",
        html: env.stageEntities.ikgolemHTML // in embassy.js
    }
}

env.stageEntities["☺"] = {
    class: "blocks notile",
    contains: {
        class: "savepoint always-targeted face-creature",
        id: "savepoint",
        examineEntity: "save iteration",
    }
},

env.stage.locales["mind"] = [
    [".empty.plain", "/img/blank.gif"],
    [".darktile, .nothing", "/img/blank.gif?+clear"],
    [".notile", "/img/blank.gif"], // shows ground underneath
    [".darkborder", "/img/local/embassy/mind/marbleborder_dark.gif"],
    [".darkwarble", "/img/local/embassy/mind/marbleborder_dark_warble.gif"],
    [".darkmind", "/img/local/embassy/mind/darkmind.gif"]
]

env.stage.locales["mind"].underFloor = {
    sprite: "/img/local/embassy/mind/marbling.gif",
    fit: "auto",
    position: "top",
    repeat: "repeat"
}

env.stages.grmStageInit = (stage) => {
    content.classList.add('show-walls', 'collapse', 'show-vn')

    env.stage.wallH = env.stage.stageH - 2
    env.stage.wallW = env.stage.stageW - 2

    if(isStageClear()) {
        content.classList.add('safe')
        if(env.stage.name == "g_lobby") toggleBgm(env.embassy.music_golems);
        else toggleBgm(env.embassy.music_golems_cleared);
    } else {
        content.classList.remove('safe')
        toggleBgm(env.embassy.music_unsafe_golems)
    }

    if(!page.blockStageBGMChange) switch(env.stage.name) {
        case "embassy_relocator":
            toggleBgm(page.bgm) // default
        break

        case "grm_dull_front":
        case "grm_dull_back":
            toggleBgm(env.grm.music_dullmind)
        break

        case "hall_lesser-dull":
        case "hall_dull-spine":
        case "grm_spine":
        case "hall_spine-heart":
        case "grm_heart":
            switch(env.stage.name) {
                case "hall_lesser-dull": env.grm.music_peace1.rate(0.75)
            }
            toggleBgm(env.grm.music_peace1)
        break

        case "hall_heart-entry":
        case "grm_entry":
        case "hall_entry-lesser":
        case "grm_lesser":
        case "grm_core":
            if(check("PAGE!!e4prog") > 8) {
                toggleBgm(env.grm.music_runningoutoftime)
                env.grm.music_runningoutoftime.rate(1)
                if(check("PAGE!!e4prog") >= 14) { env.grm.music_runningoutoftime.rate(0.75) }
            } else {
                toggleBgm(env.grm.music_coresong)
            }
        break

        
        default:
            toggleBgm(env.grm.music_coresong)
        break
    }

    if(page.party) {
        var search = ""
        page.party.forEach(m=>{
            page.party.forEach((m, i)=>{
                if(!check(`PAGE!!${m.slug}-gone`)) search += `${i > 0 ? ", " : ""}.character.${m.slug}`
            })
        })
        env.stage.real.querySelectorAll(search).forEach(char=>char.classList.add('connector'))
    }
}

env.stageEntities['ṇ'] = { 
    class:"blocks cwall north cornerwall darktile",
    contains: {
        html: `
            <canvas class="wall w-wall" sprite="/img/local/embassy/mind/marbling_pillars_short_m.gif" fit="stretch" baseWidth="[wallH]" baseHeight="3.5"></canvas>
            <canvas class="wall n-wall" sprite="/img/local/embassy/mind/marbling_pillars_short_m.gif" fit="stretch" baseWidth="[wallW]" baseHeight="3.5"></canvas>
        `
    }
}

env.stageEntities['Ṇ'] = { // version with the window
    class:"blocks cwall north cornerwall darktile",
    contains: {
        html: `
            <canvas class="wall w-wall" sprite="/img/local/embassy/mind/marbling_pillars_short_m.gif" fit="stretch" baseWidth="[wallH]" baseHeight="3.5"></canvas>
            <canvas class="wall n-wall" sprite="/img/local/embassy/mind/marbling_pillars_short_mwindow.gif" fit="stretch" baseWidth="[wallW]" baseHeight="3.5"></canvas>
        `
    }
}    

env.stageEntities['Ṡ'] = {
    class:"blocks cwall south cornerwall darktile",
    contains: {
        html: `
            <canvas class="wall e-wall" sprite="/img/local/embassy/mind/marbling_pillars_short_m.gif" fit="stretch" baseWidth="[wallH]" baseHeight="3.5"></canvas>
            <canvas class="wall s-wall" sprite="/img/local/embassy/mind/marbling_pillars_short_m.gif" fit="stretch" baseWidth="[wallW]" baseHeight="3.5"></canvas>
        `
    }
}

env.stageEntities['b'] = {
    class: "blocks notile",
    contains: {
        class: "deadtainer",
        html: `<span></span><span></span><span></span><span></span><span></span>`
    }
}

env.stageEntities['‼'] = { class: "blocks darktile" }
env.stageEntities['○'] = { class: "blocks notile" }
env.stageEntities['-'] = { class: "notile" }
env.stageEntities['▓'] = { 
    class: "darkmind",
}
env.stageEntities['▒'] = { 
    class: "darkborder",
}

env.stageEntities["&"] = { /* placeholder devil */
    class: "notile",
    contains: {
        dyp: {
            class: "critta",
            image: 'url(/img/sprites/combat/foes/formless_5.gif)',
            width: 1.5,
            height: 2,
            transform: "rotateY(90deg)"
        }
    } 
}

env.stageEntities.idril = `<figure>
    <div class="body"></div>
    <div class="head"></div>
    <div class="arm"></div>
</figure>`

env.stageEntities['Ĵ'] = {
    class:"prop chartile blocks",
    contains: {
        id: "idril",
        class: "idril character",
        examineEntity: "idril",
        examinePriority: 2,
        html: env.stageEntities.idril
    }
}

env.stageEntities.telyu = `<figure>
    <div class="head"></div>
    <div class="torso"></div>
    <div class="legs"></div>
</figure>`

env.stageEntities['V'] = {
    class:"prop chartile blocks",
    contains: {
        id: "telyu",
        class: "telyu character",
        examineEntity: "telyu",
        examinePriority: 2,
        html: env.stageEntities.telyu
    }
}

env.stageEntities['ṃ'] = { 
    class:"prop chartile blocks",
    contains: {
        id: "mindcores",
        class: "mindcores karik character collapser",
        examineEntity: "karik",
        html: env.stageEntities.mindcoresHTML
    }
}

env.stages['grm_entry'] = {
    creature: env.stageEntities.embassyCreature,
    locale: "mind",
    enterDirection: "down",
    exec: function () {
        env.stages.grmStageInit(this)
        switch(check("PAGE!!e4prog")) {
            case false: /* first entrance */
                env.grm.startDialogueOnce("entrance")
            break

            case 1:
                env.stage.real.style.setProperty("--progProceedTransform", `translate(-200%, -100%) rotateY(-90deg) translate(-120%) rotateY(90deg)`)
            break

            case 10: /* return state */
                env.grm.startDialogueOnce("entry_loopprogress")
            break
        }

        //better way of setting stances than css hardcoding probably
        env.stage.real.querySelectorAll(".character").forEach(el=>{
            if(el.id.startsWith("gakvu")) el.style.setProperty("--charTransform", "rotateY(20deg)");
            else if(el.id.startsWith("bozko")) el.style.setProperty("--charTransform", "rotateY(45deg)");
            else if(el.id.startsWith("ikgol")) el.style.setProperty("--charTransform", "rotateY(-45deg)");
            else if(el.id.startsWith("mindcores")) {
                el.style.transition = "unset"
                el.style.setProperty("--charTransform", "rotateY(90deg) translateX(-230%) rotateY(-90deg) translateX(100%) translateY(-70%)")
            }
        })

        this.markCharEvents()
        step()
    },

    underFloor: {
        sprite: "/img/local/embassy/mind/marbling_fade.gif",
        fit: "auto",
        position: "bottom",
        repeat: "no-repeat",
    },

    markCharEvents: function () {
        if(check("PAGE!!e4prog", 1)) {
            body.querySelectorAll(".character.cavik").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!entrance_cavik")))
            body.querySelectorAll(".character.tozik").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!entrance_tozik")))
        } else if(check("PAGE!!e4prog", 13)) {
            body.querySelectorAll(".character.gakvu").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!loopback_gakvu")))
            body.querySelectorAll(".character.idril").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!loopback_idril")))
            body.querySelectorAll(".character.bozko").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!loopback_bozko")))
            body.querySelectorAll(".character.karik").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!loopback_karik")))
            body.querySelectorAll(".creaturesprite").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!loopback_akizet")))
        }
    },

    entities: {
        "?": {
            class: "blocks",
            contains: {
                examineEntity: "entrance test",
                dyp: {
                    width: 1.5,
                    height: 3,
                }
            } 
        },

        'd': {
            class: "door grand down",
            teleportTarget: "grm_core",
            teleportSpot: 294,
            shouldFace: "down"
        },

        'Ć': {
            class: "door angled left warpmega3",
            teleportTarget: "hall_heart-entry",
            teleportSpot: 66,
            shouldFace: "left",
            lockFlag: "EXEC::check('PAGE!!e4prog') > 999",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'no going back', readout: true})
        },

        'Ł': {
            class: "door angled right warp1",
            teleportTarget: "hall_entry-lesser"
        },

        'C': {
            class: "door angled left",
            teleportTarget: "hall_heart-entry",
            teleportSpot: 66,
            shouldFace: "left",
            lockFlag: "EXEC::check('PAGE!!e4prog') > 999",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'not this way, not yet', readout: true}),
            /*
            contains: {
                class: "lonewall",
                html: `<canvas class="wall e-wall" sprite="/img/local/embassy/mind/marbling_pillars_short_m.gif" fit="stretch-y" position="bottom left" baseWidth="5" baseHeight="3.5"></canvas>`
            }
            */
        },

        'L': {
            class: "door angled right",
            lockFlag: "EXEC::check('PAGE!!e4prog') >= 2 && check('PAGE!!e4prog') < 10",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'not until the team is reassembled', readout: true}),
            teleportTarget: "hall_entry-lesser",
            contains: {
                class: "lonewall",
                html: `<canvas class="wall e-wall" sprite="/img/local/embassy/mind/marbling_pillars_short_m.gif" fit="stretch-y" position="bottom left" baseWidth="5" baseHeight="3.5"></canvas>`
            }
        },

        'F': {
            class: "door up",
            lockFlag: "permalocked",
            teleportTarget: "grm_core",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'there is no turning back now', readout: true}),
        },
        
        "6": {
            class: "blocks notile",
            contains: {
                dyp: {
                    class: "angletable",
                    image: 'url(/img/local/embassy/mind/table.gif)',
                    width: 3,
                    height: 2,
                    transform: "translateY(-40%) rotateX(90deg) rotate(180deg) translateY(75%)",
                    style: "background-size: 100% 100%;"
                }
            } 
        },
        
        "7": {
            class: "blocks notile",
            contains: {
                dyp: {
                    class: "angletable",
                    image: 'url(/img/local/embassy/mind/table.gif)',
                    width: 3,
                    height: 2,
                    transform: "translateY(-40%) rotateX(90deg) translateY(50%)",
                    style: "background-size: 100% 100%;"
                }
            } 
        },
        
        "%": {
            class: "blocks notile",
            contains: {
                dyp: {
                    class: "sigil",
                    image: 'url(/img/local/embassy/mind/groundsmind_corrupt.gif)',
                    width: 4,
                    height: 4,
                    transform: "translateY(-30%) translateZ(calc(var(--gridTileSize) * 1))"
                }
            } 
        },
        
        
        ")": {
            class: "blocks notile",
            contains: {
                dyp: {
                    class: "sigil",
                    image: 'url(/img/local/embassy/mind/groundsmind_corrupt_worse.gif)',
                    width: 4.25,
                    height: 4.25,
                    transform: "translateY(-30%) translateZ(calc(var(--gridTileSize) * 1))"
                }
            } 
        },
        
        "☄": {
            class: "blocks notile",
            contains: {
                dyp: {
                    class: "sigil",
                    image: 'url(/img/local/embassy/mind/groundsmind_corrupt_swarmfailure.gif)',
                    width: 4,
                    height: 4,
                    transform: "translateY(-30%) translateZ(calc(var(--gridTileSize) * 1))"
                }
            } 
        },

        '☧': {
            class: "door angled left",
            teleportTarget: "hall_heart-entry",
            teleportSpot: 66,
            shouldFace: "left",
            lockFlag: "EXEC::check('PAGE!!e4prog') > 999",
            lockExec: ()=>chatter({actor: 'actual_site_error', text: 'waabababababababa', readout: true}),
            contains: {
                class: "lonewall",
                html: `<canvas class="wall w-wall" sprite="/img/local/embassy/mind/marbling_pillars_short_m_collapse.gif" fit="stretch-y" position="bottom left" baseWidth="5" baseHeight="3.5"></canvas>`
            }
        },

        '☭': {
            class: "door angled right",
            lockFlag: "EXEC::check('PAGE!!e4prog') >= 2 && check('PAGE!!e4prog') < 10",
            lockExec: ()=>chatter({actor: 'actual_site_error', text: 'waabababababababa', readout: true}),
            teleportTarget: "hall_entry-lesser",
            contains: {
                class: "lonewall",
                html: `<canvas class="wall e-wall" sprite="/img/local/embassy/mind/marbling_pillars_short_m_collapse.gif" fit="stretch-y" position="bottom left" baseWidth="5" baseHeight="3.5"></canvas>`
            }
        },
        
        "♦": {
            class: "blocks notile mapholder",
            contains: {
                examineEntity: "map",
                html: `<figure>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </figure>`,
                dyp: {
                    class: "pyramid pyrasol",
                    width: 1,
                    height: 1,
                    image: "transparent"
                }
            } 
        },
        
        "⟡": {
            class: "blocks notile mapholder",
            contains: {
                examineEntity: "map",
                html: `<figure>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </figure>`,
                dyp: {
                    class: "pyramid pyrasol badscreen",
                    width: 1,
                    height: 1,
                    image: "transparent",
                    transform: "rotateX(-10deg) rotate(-10deg) translateY(20%)"
                }
            } 
        },

        'Ṇ': { // version with the window
            class:"blocks cwall north cornerwall",
            contains: {
                html: `
                    <canvas class="wall w-wall" sprite="/img/local/embassy/mind/marbling_pillars_short_m.gif" position="bottom right" fit="stretch-y" baseWidth="5" baseHeight="3.5"></canvas>
                    <canvas class="wall n-wall" sprite="/img/local/embassy/mind/marbling_pillars_short_mwindow.gif" fit="stretch" baseWidth="[wallW]" baseHeight="3.5"></canvas>
                `
            }
        },   

        'E': { // messed up version
            class:"blocks cwall north cornerwall",
            contains: {
                html: `
                    <canvas class="wall w-wall" style="display: none" sprite="/img/local/embassy/mind/marbling_pillars_short_m.gif" position="bottom right" fit="stretch-y" baseWidth="5" baseHeight="3.5"></canvas>
                    <canvas class="wall n-wall" sprite="/img/local/embassy/mind/reentrywall.gif" fit="stretch" baseWidth="[wallW]" baseHeight="6"></canvas>
                `
            }
        },      

        '+': { // ultra messed up physical verison
            class:"blocks cwall north cornerwall",
            contains: {
                html: `
                    <canvas class="wall w-wall" style="display: none" sprite="/img/local/embassy/mind/marbling_pillars_short_m.gif" position="bottom right" fit="stretch-y" baseWidth="5" baseHeight="3.5"></canvas>
                    <canvas class="wall n-wall" sprite="/img/local/embassy/mind/marbling_pillars_short_mwindow_collapse.gif" fit="stretch" baseWidth="[wallW]" baseHeight="3.5"></canvas>
                `
            }
        },      
        
        p: { //player spawn point
            class: "empty darkborder",
            contains: {
                slug: 'p',
                id: "creature",
                class: "player ally-sprite",
                type: "player"
            }
        },

        "1": {
            class: "blocks darktile",
            contains: {
                examineEntity: "spire status",
                dyp: {
                    width: 1.5,
                    height: 2,
                    image: "url(/img/local/embassy/mind/map_mind.gif)",
                    noback: true,
                    transform: `rotateY(90deg) translateY(-20%)`,
                    style: `background-size: 100% 100%;`,
                }
            }
        },

        "2": {
            class: "blocks darktile",
            contains: {
                examineEntity: "spire status",
                dyp: {
                    width: 1.5,
                    height: 2,
                    image: "url(/img/local/embassy/mind/map_heart.gif)",
                    noback: true,
                    transform: `rotateY(90deg) translateY(-20%)`,
                    style: `background-size: 100% 100%;`,
                }
            }
        },

        "3": {
            class: "blocks darktile",
            contains: {
                examineEntity: "spire status",
                dyp: {
                    width: 1.5,
                    height: 2,
                    image: "url(/img/local/embassy/mind/map_spine.gif)",
                    noback: true,
                    transform: `rotateY(-90deg) translateY(-20%)`,
                    style: `background-size: 100% 100%;`,
                }
            }
        },

        "4": {
            class: "blocks darktile",
            contains: {
                examineEntity: "spire status",
                dyp: {
                    width: 1.5,
                    height: 2,
                    image: "url(/img/local/embassy/mind/map_structure.gif)",
                    noback: true,
                    transform: `rotateY(-90deg) translateY(-20%)`,
                    style: `background-size: 100% 100%;`,
                }
            }
        },

        "!": {
            class: "blocks darktile",
            contains: {
                dyp: {
                    width: 3,
                    height: 3,
                    image: "url(/img/local/embassy/mind/corner.gif)",
                    noback: true,
                    transform: `rotateX(90deg) translate(33%, 17%)`,
                    style: `background-size: 100% 100%;`,
                }
            }
        },

        "@": {
            class: "blocks darktile",
            contains: {
                dyp: {
                    width: 3,
                    height: 3,
                    image: "url(/img/local/embassy/mind/corner_flip.gif)",
                    noback: true,
                    transform: `rotateX(90deg) translate(-33%, 17%)`,
                    style: `background-size: 100% 100%;`,
                }
            }
        },

        "m": {
            class:"prop blocks notile",
            contains: {
                id: "mindcores",
                class: "mindcores karik character collapser",
                examineEntity: "karik",
                html: env.stageEntities.mindcoresHTML
            }
        },

        "|": {
            class: "notile",
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/sludgecolumndark.gif)',
                    width: 1,
                    height: 5,
                    cross: true,
                    transform: 'rotateY(45deg)'
                }
            } 
        },

        ";": {
            class: "notile",
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/sludgecolumndark.gif)',
                    width: 1,
                    height: 5,
                    cross: true,
                    transform: 'rotateY(45deg) translateX(50%)'
                }
            } 
        }
    },

    width: 11,

    plans: {
        default: `
            Ṇ....%.....
            .░░░○♦○░░░.
            .░░░░6░░░░$
            C░░░░░░░░░L
            .░░░░░░░░░.
            .░░░░░░░░░.
            .○░░░░░░░○.
            .○○░░░░░○○.
            .○○○░░░○○○.
            .‼‼‼▒▒▒‼‼‼.
            .‼‼‼▒▒▒‼‼‼.
            .‼‼1▒▒▒4‼‼.
            .‼‼‼▒▒▒‼‼‼.
            .‼‼‼▒▒▒‼‼‼.
            .‼‼2▒▒▒3‼‼.
            .‼‼‼▒▒▒‼‼‼.
            .‼‼‼▒p▒‼‼‼.
            .....F.....
        `, 

        initialstep: `
            Ṇ....%.....
            .░░░○♦○G░░.
            .░░░T6░░░░$
            C░░░░░░░░░L
            .░░░░░░░░░.
            .░░░░░░░░░.
            .○░░░░░░░○.
            .○○░░░░░○○.
            .○○○░░░○○○.
            .‼‼‼▒▒▒‼‼‼.
            .‼‼‼▒▒v‼‼‼.
            .‼‼1▒▒▒4‼‼.
            .‼‼‼▒▒▒‼‼‼.
            .‼‼‼▒▒▒‼‼‼.
            .‼‼2▒▒▒3‼‼.
            .‼‼‼▒▒▒‼‼‼.
            .‼‼‼▒p▒‼‼‼.
            .....F.....
        `, 

        fullteam: `
            Ṇ....%.....
            .░░░○♦○G░░.
            .░░░░6░p░Æ.
            C░░░T░v░░░L
            .░k░░░░░░M.
            .░░░░░░░░░.
            .○░░░░░░░○.
            .○○░░░░░○○.
            .○○○░░░○○○.
            .‼‼‼▒▒▒‼‼‼.
            .‼‼‼▒▒▒‼‼‼.
            .‼‼1▒▒▒4‼‼.
            .‼‼‼▒▒▒‼‼‼.
            .‼‼‼▒▒▒‼‼‼.
            .‼‼2▒▒▒3‼‼.
            .‼‼‼▒▒▒‼‼‼.
            .‼‼‼▒▒▒‼‼‼.
            .....F.....
        `, 

        returning: `
            E○○○m)○○○○○
            ○░░░○♦○░░░○
            ○░░░Ĵ6G░░☺○
            Ćp░░░░░░░░Ł
            ○░░░░░k░░░○
            ○░░░░░░░░░○
            ○○░░░░░░░○○
            ○○○░░░░░○○○
            ○○○○░░░○○○○
            ○‼‼‼▒▒▒‼‼‼○
            ○‼‼‼▒▒▒‼‼‼○
            ○‼‼‼▒▒▒‼‼‼○
            ○‼‼‼▒▒▒‼‼‼○
            ○‼‼‼▒▒▒‼‼‼○
            ○‼‼‼▒▒▒‼‼‼○
            ○‼‼‼▒▒▒‼‼‼○
            ○‼‼‼▒▒▒‼‼‼○
            ○○○○○F○○○○○
        `, 

        final: `
            +....☄.....
            .░░░○♦○░░░.
            .░░|░6░░░░$
            ☧░░░░░░░░░☭
            .|░░░░░░░░.
            .░░░░░░░|░.
            .○░░|░░░░○.
            .○○░░░░░○○.
            .○○○░░░○○○.
            .‼‼‼▒▒▒‼‼‼.
            .‼‼‼▒▒▒‼‼‼.
            .‼‼‼▒▒▒‼‼‼.
            .‼‼‼|▒▒‼‼‼.
            .‼‼‼▒▒▒‼‼‼.
            .‼‼‼▒▒|‼‼‼.
            .‼‼‼▒▒▒‼‼‼.
            .‼‼‼▒p▒‼‼‼.
            .....F.....
        `, 

        final2: `
            +....☄.....
            .░░░○⟡○░░░.
            .░░|░6░░░░$
            ☧░░░░░░░░░☭
            .|░░░░░░░░.
            .░░░░░░░|░.
            .○░░|░░░|○.
            .;○░░░░|○○.
            .○|○░░|○;○.
            .‼‼;▒|;‼‼‼.
            .‼‼‼;;|‼‼‼.
            .‼‼‼|||‼‼‼.
            .‼‼‼|▒▒‼‼‼.
            .‼‼‼▒▒▒‼‼‼.
            .‼‼‼▒▒|‼‼‼.
            .‼‼‼▒▒▒‼‼‼.
            .‼‼‼▒p▒‼‼‼.
            .....F.....
        `, 
    },

    getPlan: function() {
        let plan = this.plans.default
        this.entities.p.class = "empty darkborder"
        this.underFloor.sprite = "/img/local/embassy/mind/marbling_fade.gif"
        this.enterDirection = "down"
        
        switch(check("PAGE!!e4prog")) {
            case 1:
                plan = this.plans.initialstep
            break

            case 2:
                plan = this.plans.fullteam
                this.entities.p.class = "empty"
            break

            case 13:
                plan = this.plans.returning
                this.entities.p.class = "empty"   
                this.underFloor.sprite = "/img/local/embassy/mind/reentryfloor.gif"
                this.enterDirection = "right"
            break

            case 16:
                plan = this.plans.final
                this.underFloor.sprite = "/img/local/embassy/mind/marbling_fade_collapse.gif"
                this.enterDirection = "down"
            break

            case 17:
                plan = this.plans.final2
                this.underFloor.sprite = "/img/local/embassy/mind/marbling_fade_collapse2.gif"
                this.enterDirection = "down"
            break
        }

        return plan
    },
}

env.stages['hall_entry-lesser'] = {
    creature: env.stageEntities.embassyCreature,
    locale: "mind",
    enterDirection: "right",
    exec: function () {
        env.stages.grmStageInit(this)
    },
    entities: {
        'E': {
            class: "door angled left",
            teleportTarget: "grm_entry",
            teleportSpot: 42,
            shouldFace: "left"
        },

        'L': {
            class: "door angled right fuckthisdoor", /* doesn't load on chrome for some reason. might load if we animate it */
            teleportTarget: "grm_lesser",
        },

        'x': {
            class: "door angled up",
            teleportTarget: "g_lobby",
            teleportSpot: 42,
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'personnel and secondary chambers, unwilling to open to us', readout: true})
        },

        "F": {
            class: "prop blocks notile",
            contains: {
                examineEntity: "adull's altar",
                dyp: {
                    image: "url(/img/local/embassy/f2_bright.gif)",
                    cross: true,                    
                    width: 1.5,
                    height: 2.5,
                    transform: 'rotateY(-45deg)',
                }
            } 
        },

        '1': {
            class: "door angled up warpmega1",
            teleportTarget: "g_lobby",
            teleportSpot: 42,
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sourceless', text: '...', readout: true})
        },

        '2': {
            class: "door angled up warpmega2",
            teleportTarget: "g_lobby",
            teleportSpot: 42,
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sourceless', text: '...', readout: true})
        },

        '3': {
            class: "door angled up warpmega3",
            teleportTarget: "g_lobby",
            teleportSpot: 42,
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sourceless', text: '...', readout: true})
        },

        '4': {
            class: "door angled right warpmega1",
            teleportTarget: "grm_lesser",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sys', text: "NOTICE::'utilize PROCEED entity';'precaution to allow iteration saving'", readout: true})
        },
    },

    width: 17,

    plans: {
        default: `
            Ṇ................
            .░░░░F░░░░░F░░░░.
            .░░░░░░░░░░░░░░░.
            Ep░░░░░░░░░░░░░░L
            .░░░░░░░░░░░░░░░.
            .░░░░F░░░░░F░░░░.
            ...x....x....x..Ṡ
        `, 

        warped: `
            .............................
            .░░░░░░░░░░░░░░░░░░░░░░░░░░░$
            Ep░░░░░░░░░░░░░░░░░░░░░░░░░░4
            .░░░░░░░░░░░░░░░░░░░░░░░░░░░.
            ......1.......2.......3......
        `, 
    },

    getPlan: function() {
        let plan

        if(check("PAGE!!e4prog") == 13) {
            plan = this.plans.warped
            this.width = 29
            this.ignoreUnderFloor = true
        } else {
            plan = this.plans.default
            this.width = 17
            this.ignoreUnderFloor = false
        }

        //potentially some direct string alteration before returning the plan too
        return plan
    },
}

env.stages['grm_lesser'] = {
    creature: env.stageEntities.embassyCreature,
    locale: "mind",
    enterDirection: "right",
    exec: function () {
        env.stages.grmStageInit(this)
        switch(check("PAGE!!e4prog")) {
            case 2: /* first entrance */
                env.grm.startDialogueOnce("lesser")

                //better way of setting stances than css hardcoding probably
                env.stage.real.querySelectorAll(".character").forEach(el=>{
                    if(el.id.startsWith("gakvu")) el.style.setProperty("--charTransform", "rotateY(-60deg)");
                    else if(el.id.startsWith("cavik")) el.style.setProperty("--charTransform", "rotateY(-45deg)");
                    else if(el.id.startsWith("tozik")) el.style.setProperty("--charTransform", "rotateY(45deg)")
                })

                env.stage.real.style.setProperty("--progProceedTransform", `rotateY(180deg) translateY(-100%)`)
            break

            case 15: /* final loopback */
                env.stage.real.style.setProperty("--progProceedTransform", `translateX(-100%) rotateY(-90deg) translateX(75%) translateY(-100%) rotateY(90deg)`)
                content.querySelector(".character.idril").classList.add('karikbearer')
                change("PAGE!!tozpain", true) 
                
                env.stage.real.querySelectorAll(".character").forEach(el=>{
                    if(el.id.startsWith("idril")) {
                        el.classList.add("karikbearer")
                        el.style.setProperty("--charTransform", "rotateY(180deg)");
                    } else if(el.id.startsWith("bozko")) el.style.setProperty("--charTransform", "rotateY(180deg)");
                    else if(el.id.startsWith("tozik")) {
                        el.style.setProperty("--charTransform", "rotateY(180deg)");
                        el.classList.add("tozpain")
                    }
                    
                })
            break
        }

        this.markCharEvents()
    },

    markCharEvents: function () {
        switch(check("PAGE!!e4prog")) {
            case 2:
                body.querySelectorAll(".character.cavik").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!lesser_tozcav")))
                body.querySelectorAll(".character.miltza").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!lesser_miltza")))
                body.querySelectorAll(".character.tozik").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!lesser_tozcav")))
                body.querySelectorAll(".character.gakvu").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!lesser_gakvu")))
                body.querySelectorAll(".character.bozko").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!lesser_bozko")))
                body.querySelectorAll(".character.ikgolem").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!lesser_ik")))
            break

            case 15:
                body.querySelectorAll(".character.idril").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!final_idrilik")))
                body.querySelectorAll(".character.cavik").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!final_cavik")))
                body.querySelectorAll(".character.gakvu").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!final_gakvu")))
                body.querySelectorAll(".character.bozko").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!final_bozko")))
                body.querySelectorAll(".character.tozik").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!final_tozik")))
                body.querySelectorAll(".creaturesprite").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!final_akizet")))
            break
        }
    },

    entities: {
        'd': {
            class: "door grand down",
            teleportTarget: "grm_core",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'this goes to the core chamber... it seems unwise to enter presently', readout: true}),
        },

        'D': {
            class: "door grand down lit critical",
            teleportTarget: "grm_core",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sys', text: "NOTICE::'utilize PROCEED entity';'precaution to allow iteration saving'", readout: true})
        },

        'E': {
            class: "door angled left",
            teleportTarget: "hall_entry-lesser",
            teleportSpot: 66,
            shouldFace: "left",
            lockFlag: "EXEC::check('PAGE!!e4prog', 1)",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'this leads back to entry... it is not time to leave yet', readout: true}),
        },

        'L': {
            class: "door angled right",
            teleportTarget: "hall_lesser-dull",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sourceless', text: check("PAGE!!e4prog", 15) ? 'there is nothing for us there' : 'this leads to the dull mind, but there is no need to go there yet', readout: true})
        },

        "☻": {
            class: "prop blocks notile",
            contains: {
                examineEntity: "lesser mind status",
                dyp: {
                    width: 3,
                    height: 3,
                    image: "url(/img/local/embassy/projectorscreen.gif)",
                    noback: true,
                    transform: `translateY(-50%) translateZ(100px)`,
                    style: `background-size: 100% 100%;`,
                }
            }
        }, 

        "♥": {
            class: "prop blocks notile",
            contains: {
                examineEntity: "lesser mind status",
                dyp: {
                    width: 2.5,
                    height: 3,
                    image: "url(/img/local/embassy/mind/map_mind.gif)",
                    transform: `translate(-39%, -5%)`,
                    style: `background-size: contain`,
                }
            }
        }, 

        "♠": {
            class: "prop blocks notile",
            contains: {
                dyp: {
                    width: 2.5,
                    height: 6,
                    image: "url(/img/local/embassy/mind/map_mind_megawarp.gif)",
                    transform: `translate(-39%, -5%)`,
                    style: `background-size: contain`,
                }
            }
        }, 
        
        "♦": {
            class: "blocks notile",
            contains: {
                examineEntity: "support pod",
                html: `<figure>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </figure>`,
                dyp: {
                    class: "pyramid pyrapod",
                    width: 3,
                    height: 3,
                    image: "transparent"
                }
            } 
        },
        
        "≈": {
            class: "blocks nothing",
            contains: {
                html: `<figure>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </figure>`,
                dyp: {
                    class: "pyramid warped pyrapod",
                    width: 3,
                    height: 3,
                    image: "transparent"
                }
            } 
        },

        "O": {
            class: "prop blocks notile",
            contains: {
                class: "marbletable",
                dyp: {
                    width: 3,
                    height: 3,
                    image: "url(/img/local/embassy/mind/marbling_circle.gif)",
                    transform: `translateY(-103%) rotateX(90deg)`,
                    style: `background-size: 100% 100%;bottom: unset;`,
                }
            }
        },

        "∇": {
            class: "prop blocks notile",
            contains: {
                class: "marbletable warped",
                dyp: {
                    width: 3,
                    height: 3,
                    image: "url(/img/local/embassy/mind/marbling_circle.gif)",
                    transform: `translateY(-103%) rotateX(90deg)`,
                    style: `background-size: 100% 100%;bottom: unset;`,
                }
            }
        },

        //twisted walls
        '^': { // with the window
            class:"blocks cwall north cornerwall",
            contains: {
                html: `
                    <canvas class="wall w-wall" sprite="/img/local/embassy/mind/marbling_pillars_short_m_warped.gif" fit="stretch" baseWidth="[wallH]" baseHeight="3.5"></canvas>
                    <canvas class="wall n-wall" sprite="/img/local/embassy/mind/marbling_pillars_short_m_warpedwindow.gif" fit="stretch" baseWidth="[wallW]" baseHeight="3.5"></canvas>
                `
            }
        }, 
        
        ';': {
            class:"blocks cwall south cornerwall",
            contains: {
                html: `
                    <canvas class="wall e-wall" sprite="/img/local/embassy/mind/marbling_pillars_short_m_warped.gif" fit="stretch" baseWidth="[wallH]" baseHeight="3.5"></canvas>
                    <canvas class="wall s-wall" sprite="/img/local/embassy/mind/marbling_pillars_short_m_warped.gif" fit="stretch" baseWidth="[wallW]" baseHeight="3.5"></canvas>
                `
            }
        },
        
        '┼': {
            class:"blocks vekoaholder notile",
            contains: {
                dyp: {
                    image: 'url(/img/sprites/vekoa/vekoaspec.gif)',
                    width: 2,
                    height: 2.23,
                }
            }
        },

        '+': {
            class:"blocks cwall north cornerwall critical",
            contains: {
                html: `
                    <canvas class="wall w-wall" style="display: none;" sprite="/img/blank.gif" fit="stretch" baseWidth="[wallH]" baseHeight="3.5"></canvas>
                    <canvas class="wall n-wall" sprite="/img/blank.gif, /img/local/embassy/mind/window_short.gif" fit="stretch" baseWidth="[wallW]" baseHeight="3.5"></canvas>
                `
            }
        },

        '▒': {
            class: "notile"
        },

        'τ': {
            class: "notile",
            blockIf: () => !check("mask", "joy")
        },
        
        "!": {
            class: "gap"
        },

        '?': {
            teleportTarget: "out_early",
            shouldFace: "up"
        },
    },

    width: 15,
    plans: {
        default: `
            Ṇ......d.......
            .░░░░░░░░░░░░░.
            .░░░░░░░░░░░░░.
            Ep░░░░░░░░░░░░L
            .░░░░░░░░░░░░░.
            .░░░░░░░░░░░░░.
            .‼‼‼░░░░░░░‼‼‼.
            .‼♦‼░░-O♥░░‼♦‼.
            .‼‼‼░░░░░░░‼‼‼.
            .░░░░░░░░░░░░░.
            .░░░░░░░░░░░░░.
            .‼‼‼░░‼‼‼░░‼‼‼.
            .‼♦‼░░‼♦‼░░‼♦‼.
            .‼‼‼░░‼‼‼░░‼‼‼.
            ..............Ṡ
        `, 

        team: `
            Ṇ......d.......
            .░░░M░Æ░░░░░░░.
            .░░░░░░░░░░░░░.
            Ep░░░░░░░░G░░░L
            .░░░░░░░░░░░░░.
            .░░░░░░░░░░░░░.
            .‼‼‼░░T░v░░‼‼‼.
            .‼♦‼░░-O♥░░‼♦‼.
            .‼‼‼░░░░░░░‼‼‼.
            .░░░░░░░░░░░░░.
            .░░░░░░░░░░░░░.
            .‼‼‼$k‼‼‼░░‼‼‼.
            .‼♦‼░░‼♦‼░░‼♦‼.
            .‼‼‼░░‼‼‼░░‼‼‼.
            ..............Ṡ
        `, 

        transition1: `
            Ṇ......d.......
            .░░░░░░░░░░░░░.
            .░░░░░░░░░░░░░.
            Ep░░░░░░░░░░░░L
            .░░░░░░░░░░░░░.
            .░░░░░░░░░░░░░.
            .‼‼‼░░░░░░░‼‼‼.
            .‼♦‼░░-O♥░░‼♦‼.
            .‼‼‼░░░░░░░‼‼‼.
            .░░░░░░░░░░░░░.
            .░░░░░░░░░░░░░.
            .‼‼‼░░‼‼‼░░‼‼‼.
            .‼♦‼░░‼♦‼░░‼♦‼.
            .‼‼‼░░‼‼‼░░‼‼‼.
            ..............Ṡ
        `, 

        transition2: `
            ^......d.......
            .░░░░░░░░░░░░░.
            .░░░░░░░░░░░░░.
            Ep░░░░░░░░░░░░L
            .░░░░░░░░░░░░░.
            .░░░░░░░░░░░░░.
            .‼‼‼░░░░░░░‼‼‼.
            .‼≈‼░░-∇♠░░‼≈‼.
            .‼‼‼░░░░░░░‼‼‼.
            .░░░░░░░░░░░░░.
            .░░░░░░░░░░░░░.
            .‼‼‼░░‼‼‼░░‼‼‼.
            .‼≈‼░░‼≈‼░░‼≈‼.
            .‼‼‼░░‼‼‼░░‼‼‼.
            ..............;
        `, 

        //14 can use assembled, but with vekoa in front of the door
        assembled_vekoa: `
            +......D$......
            .▒▒▒▒▒▒┼▒▒▒▒▒▒.
            .▒▒▒▒▒▒▒▒▒▒▒▒▒.
            Ep▒▒▒▒▒▒▒▒▒▒▒▒L
            .▒▒▒▒▒▒▒▒▒▒▒▒▒.
            .▒▒▒▒▒▒▒▒▒▒▒▒▒.
            ...............
        `, 

        assembled: `
            +......D$......
            .▒▒▒v▒▒▒▒▒▒G▒▒.
            .▒▒▒▒▒▒▒▒▒▒▒▒▒.
            Ep▒▒▒▒▒▒▒▒▒▒▒▒L
            .▒▒▒▒▒▒▒▒▒▒▒▒▒.
            .▒▒▒▒▒▒k▒Ĵ▒▒▒▒.
            .....T........!
            .............!.
            ..........?!!!.
        `, 
    },

    baseUnderFloor: {
        sprite: "/img/local/embassy/mind/lesserfloor.gif",
        fit: "auto",
        position: "bottom",
        repeat: "no-repeat",
    },

    altUnderFloor: {
        sprite: "/img/local/embassy/mind/darkfloor_lesser.gif",
        fit: "auto",
        position: "top",
        repeat: "no-repeat",
    },

    getPlan: function() {
        let plan = this.plans.default
        this.underFloor = this.baseUnderFloor

        if(check("PAGE!!e4prog") == 2) {
            plan = this.plans.team

            switch(check("TEMP!!lshift")) {
                case "1": plan = this.plans.transition1; break
                case "2": plan = this.plans.transition2; break
            }
            
        } else if(check("PAGE!!e4prog", 13)) {
            plan = this.plans.transition2
            
        } else if(check("PAGE!!e4prog", 14)) {
            this.underFloor = this.altUnderFloor
            plan = this.plans.assembled_vekoa

        } else if(check("PAGE!!e4prog") == 15) {
            this.underFloor = this.altUnderFloor
            plan = this.plans.assembled
        }

        //potentially some direct string alteration before returning the plan too
        return plan
    },

    planAdjustment: (plan) => {
        if(check("mask-freedom") && !check("groundstrd")) return plan
        else return plan.replaceAll("!", ".").replaceAll("?", ".")
    }
}

env.stages['hall_lesser-dull'] = {
    creature: env.stageEntities.embassyCreature,
    locale: "mind",
    enterDirection: "right",
    exec: function () {
        env.stages.grmStageInit(this)

        env.stage.real.querySelectorAll(".character").forEach(el=>{
            if(el.id.startsWith("cavik")) el.style.setProperty("--charTransform", "rotateY(-45deg)");
            else if(el.id.startsWith("tozik")) el.style.setProperty("--charTransform", "rotateY(45deg)");
            else if(el.id.startsWith("bozko")) el.style.setProperty("--charTransform", "rotateY(45deg)");
            else if(el.id.startsWith("miltza")) el.style.setProperty("--charTransform", "rotateY(-45deg)");
        })
    },

    underFloor: {
        sprite: "/img/local/embassy/mind/marbling_h2h.gif",
        fit: "stretch",
        position: "center"
    },

    entities: {
        "?": {
            class: "blocks",
            contains: {
                examineEntity: "lesser-dull hall test",
                dyp: {
                    width: 1.5,
                    height: 3,
                }
            } 
        },
        
        'L': {
            class: "door angled left warp1",
            teleportTarget: "grm_lesser",
            teleportSpot: 58,
            shouldFace: "left",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'absolutely not', readout: true})
        },

        'D': {
            class: "door angled right",
            teleportTarget: "grm_dull_front",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sys', text: "NOTICE::'utilize PROCEED entity';'precaution to allow iteration saving'", readout: true})
        },

        '2': {
            class: "door angled up warp3",
            teleportTarget: "g_lobby",
            teleportSpot: 42,
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'is this a door?', readout: true})
        }, 

        '3': {
            class: "door angled up warp2",
            teleportTarget: "g_lobby",
            teleportSpot: 42,
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'i am not sure how to open this', readout: true})
        }, 

        'x': {
            class: "door angled up",
            teleportTarget: "g_lobby",
            teleportSpot: 42,
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'personnel and secondary chambers, unwilling to open to us', readout: true})
        }, 

        'Ṇ': { // version with the window
            class:"blocks cwall north cornerwall",
            contains: {
                html: `
                    <canvas class="wall w-wall" style="display: none" sprite="/img/local/embassy/mind/marbling_pillars_short_m.gif" fit="stretch" baseWidth="[wallH]" baseHeight="3.5"></canvas>
                    <canvas class="wall n-wall" sprite="/img/local/embassy/mind/h2h_dents.gif" fit="stretch" baseWidth="[wallW]" baseHeight="5.25"></canvas>
                `
            }
        }, 
        
        'Ṡ': {
            class:"blocks cwall south cornerwall",
            contains: {
                html: `
                    <canvas class="wall e-wall" sprite="/img/textures/black.gif" fit="stretch" baseWidth="[wallH]" baseHeight="3.5"></canvas>
                    <canvas class="wall s-wall" sprite="/img/local/embassy/mind/h2h_dents_basic.gif" fit="stretch" baseWidth="[wallW]" baseHeight="5.25"></canvas>
                `
            }
        }
    },

    width: 15,

    plans: {
        default: `
            Ṇ..............
            .----------▒▒▒.
            .----------▒▒▒$
            Lp---------▒▒▒D
            .----------▒▒▒.
            .----------▒▒▒.
            ...2...3...x..Ṡ
        `, 

        karik: `
            Ṇ..............
            .----------▒▒ṃ.
            .----------▒▒▒$
            Lp---------▒▒▒D
            .----------▒▒▒.
            .----------▒▒▒.
            ...2...3...x..Ṡ
        `, 

        team: `
            Ṇ..............
            .--------G-▒Mṃ.
            .----------▒▒▒$
            Lp---------▒▒▒D
            .-------k--▒▒v.
            .----------▒▒T.
            ...2...3...x..Ṡ
        `, 
    },

    getPlan: function() {
        let plan = this.plans.default
        if(check("PAGE!!e4prog") < 4) {
            plan = this.plans.team
        }

        //potentially some direct string alteration before returning the plan too
        return plan
    },
    
}

env.stages['grm_dull_front'] = {
    creature: env.stageEntities.embassyCreature,
    locale: "mind",
    enterDirection: "right",
    exec: function () {
        env.stages.grmStageInit(this)
        this.markCharEvents()

        env.stage.real.style.setProperty("--progProceedTransform", `translate(400%, -100%) rotateY(-90deg) translateX(-300%) translateZ(150px)`)
    },

    markCharEvents: function () {
        if(check("PAGE!!e4prog", 4)) {
            body.querySelectorAll(".character.bozko").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!dull_boz")))
        }
    },

    entities: {
        'd': {
            class: "door grand down",
            teleportTarget: "grm_core",
            teleportSpot: 49,
            shouldFace: "up",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'the grand doors to the core... here, they are wounded and clogged by spireblood, unable to open', readout: true}),
            
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/mind/floorsludge.gif)',
                    width: 5,
                    height: 4,
                    style: "transform: translateY(100%) translateZ(1px);background-size: 100% 100%;"
                }
            }
        },

        'L': {
            class: "door angled left",
            teleportTarget: "hall_lesser-dull",
            teleportSpot: 58,
            shouldFace: "left",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'we are not going back that way', readout: true}),
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/mind/floorsludge.gif)',
                    width: 3,
                    height: 4,
                    style: "transform: rotate(-90deg) translateY(100%) translateZ(1px);background-size: 100% 100%;"
                }
            }
        }, 

        'N': {
            class: "door angled right",
            teleportTarget: "hall_dull-spine",
            lockFlag: "EXEC::check('PAGE!!e4prog', 5)",
            lockExec: ()=>chatter({actor: 'sys', text: "NOTICE::'utilize PROCEED entity';'precaution to allow iteration saving'", readout: true}),
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/mind/floorsludge.gif)',
                    width: 3,
                    height: 4,
                    style: "transform: translateX(-150%) rotate(90deg) translateZ(1px);background-size: 100% 100%;"
                }
            }
        },

        '^': {
            class: "",
            teleportTarget: "grm_dull_back",
        },

        'Ṡ': {
            class:"blocks cwall south cornerwall",
            contains: {
                html: `
                    <canvas class="wall e-wall" style="display: none;" sprite="/img/blank.gif" fit="stretch" baseWidth="[wallH]" baseHeight="3.5"></canvas>
                    <canvas class="wall s-wall" sprite="/img/local/embassy/mind/dullwall.gif" fit="stretch" baseWidth="[wallW]" baseHeight="5"></canvas>
                `
            }
        },

        'Ṇ': {
            class:"blocks cwall north cornerwall",
            contains: {
                html: `
                    <canvas class="wall w-wall" style="display: none;" sprite="/img/blank.gif" fit="stretch" baseWidth="[wallH]" baseHeight="3.5"></canvas>
                    <canvas class="wall n-wall" sprite="/img/blank.gif, /img/local/embassy/mind/window_short.gif" fit="stretch" baseWidth="[wallW]" baseHeight="3.5"></canvas>
                `
            }
        }     
    },

    underFloor: {
        sprite: "/img/local/embassy/mind/darkfloor.gif",
        fit: "auto",
        position: "center",
        repeat: "no-repeat",
    },

    width: 15,
    plans: {
        thankyouoctoforfixingthememoryleak: `
            Ṇ......d.......
            .○○▒▒▒▒▒▒▒▒▒▒▒.
            .bb▒▒▒▒▒▒▒▒▒bb.
            Lp▒▒▒▒▒▒▒▒▒b▒▒N
            .b▒▒▒▒▒▒▒▒▒▒▒b.
            .○b▒▒▒▒▒▒▒▒▒▒▒.
            .......^..$...Ṡ
        `, 

        bigboz: ` 
            Ṇ......d.......
            .○○▒▒▒▒▒▒▒▒▒▒▒.
            .bb▒▒▒▒▒▒▒▒▒bb.
            Lp▒▒▒▒▒▒▒▒kb▒▒N
            .b▒▒▒▒▒▒▒▒▒▒▒b.
            .○b▒▒▒▒▒▒▒▒▒▒▒.
            .......^..$...Ṡ
        `, 
    },

    getPlan: function() {
        let plan = this.plans.thankyouoctoforfixingthememoryleak
        if(check("PAGE!!e4prog") == 4) {
            plan = this.plans.bigboz
        }

        return plan
    },
}


env.stage.locales["dullback"] = [
    [".empty.plain, .darktile, .nothing, .notile", "/img/blank.gif"],
    [".darkborder", "/img/local/embassy/mind/marbleborder_dark.gif"],
    [".darkmind", "/img/local/embassy/mind/darkmind.gif"]
]

env.stages['grm_dull_back'] = {
    creature: env.stageEntities.embassyCreature,
    enterDirection: "up",
    locale: "dullback",

    exec: function () {
        env.stages.grmStageInit(this)
        
        env.stage.real.querySelectorAll(".character").forEach(el=>{
            if(el.id.startsWith("idril")) el.style.setProperty("--charTransform", "rotateY(45deg)");
            else if(el.id.startsWith("cavik")) el.style.setProperty("--charTransform", "rotateY(135deg)");
        })

        this.markCharEvents()
    },

    markCharEvents: function () {
        if(check("PAGE!!e4prog", 4)) {
            body.querySelectorAll(".character.miltza").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!dull_milkar")))
            body.querySelectorAll(".character.karik").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!dull_milkar")))

            body.querySelectorAll(".character.tozik").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!dull_gaktoz")))
            body.querySelectorAll(".character.gakvu").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!dull_gaktoz")))

            body.querySelectorAll(".character.idril").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!dull_cavidril")))
            body.querySelectorAll(".character.cavik").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!dull_cavidril")))
        }
    },

    entities: {
        p: { //player spawn point
            class: "notile",
            contains: {
                slug: 'p',
                id: "creature",
                class: "player ally-sprite",
                type: "player"
            }
        },      

        'd': {
            teleportTarget: "grm_dull_front",
            teleportSpot: 82,
            shouldFace: "down"
        },

        "1": {
            class: "notile",
            contains: {
                examineEntity: "dullima pod",
                dyp: {
                    image: 'url(/img/local/embassy/mind/observationpod.gif)',
                    width: 4,
                    height: 4,
                    noback: true,
                    transform: 'rotateY(180deg) translateY(-10%) rotateX(-30deg)',
                }
            }
        },

        "2": {
            class: "notile",
            contains: {
                examineEntity: "dullima pod",
                dyp: {
                    image: 'url(/img/local/embassy/mind/observationpod_warp.gif)',
                    width: 4,
                    height: 4.5,
                    noback: true,
                    transform: 'rotateY(90deg) translateY(-10%) rotateX(-30deg)',
                }
            }
        },

        "3": {
            class: "notile",
            contains: {
                examineEntity: "dullima pod",
                dyp: {
                    image: 'url(/img/local/embassy/mind/observationpod.gif)',
                    width: 4,
                    height: 4,
                    noback: true,
                    transform: 'rotateY(-90deg) translateY(-10%) rotateX(-30deg)',
                }
            }
        },

        'Ṇ': {
            class:"blocks cwall north cornerwall",
            contains: {
                html: `
                    <div></div>
                    <canvas class="wall n-wall" sprite="/img/local/embassy/mind/dullwall_tran.gif" fit="stretch" baseWidth="[wallW]" baseHeight="5"></canvas>
                `
            }
        },

        's': {
            class: "prop blocks",
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/mind/tempstack.gif)',
                    width: 2,
                    height: 1,
                    style: "background-size: 100% 100%;",
                    transform: "translate(-22%) rotateY(-45deg) rotateX(20deg)"
                }
            }
        },

        "C": {
            class: "blocks notile",
            contains: {
                class: "hidelow",
                dyp: {
                    image: 'url(/img/local/embassy/golemcorpse.gif)',
                    width: 2,
                    height: 1,
                    transform: 'rotateY(20deg)',
                }
            } 
        },

        "V": {
            class: "blocks notile",
            contains: {
                class: "hidelow",
                dyp: {
                    image: 'url(/img/local/embassy/golemcorpse.gif)',
                    width: 2,
                    height: 1,
                    transform: 'rotateY(-45deg)',
                }
            } 
        },

        "r": {
            class: "blocks notile",
            contains: {
                class: "hidelow",
                dyp: {
                    image: 'url(/img/local/embassy/golemcorpse.gif)',
                    width: 2,
                    height: 1,
                    transform: 'rotateY(135deg)',
                }
            } 
        },

        "e": {
            class: "blocks notile",
            contains: {
                dyp: {
                    image: 'url(/img/sprites/obesk/cystrack.gif)',
                    width: 2,
                    height: 1,
                    transform: 'rotateY(31deg) translateX(100%) translateY(-100%) rotateY(-16deg)',
                }
            } 
        },       
        
        "♦": {
            class: "blocks silencespire notile",
            contains: {
                examineEntity: "silencing spire",
                html: `<figure>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </figure>`,

                dyp: {
                    class: "pyramid silencer",
                    width: 1,
                    height: 1.5,
                    image: "transparent"
                }
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

        "9": {
            class: "blocks notile",
            contains: {
                dyp: {
                    width: 2,
                    height: 4,
                    image: "url(/img/textures/friend.gif)",
                    transform: `translateX(25%) rotateY(90deg)`
                }
            } 
        },

        "B": {
            class: "blocks notile",
            contains: {
                class: "deadtainer megatainer",
                html: `<span></span><span></span><span></span><span></span><span></span>`
            }
        },
    },

    underFloor: {
        sprite: "/img/local/embassy/mind/dullbackfloor_bigger_warp.gif",
        fit: "auto",
        position: "center",
        repeat: "no-repeat",
    },

    width: 9,
    plans: {
        empty: ` 
            Ṇ...d....
            .---p---.
            .-------.
            .-------.
            .-------.
            2---♦---3
            .-------.
            .-------.
            .r-b----.
            .CVbbbV-.
            ...e1....
        `,

        revamp: ` 
            Ṇ...d....
            .---pGT-.
            .-------.
            .M------.
            .ṃ------.
            2---♦---3
            .-------.
            .-------.
            .rvbĴ---.
            .CVbbbV-.
            ...e1....
        `,
    },

    getPlan: function() {
        if(check("PAGE!!e4prog") >= 4) return this.plans.revamp;
        return this.plans.empty
    },
}

env.stages['hall_dull-spine'] = {
    creature: env.stageEntities.embassyCreature,
    locale: "mind",
    enterDirection: "right",
    exec: function () {
        env.stages.grmStageInit(this)
    },

    entities: {
        'D': {
            class: "door angled left",
            teleportTarget: "grm_dull_front",
            teleportSpot: 58,
            shouldFace: "left"
        }, 

        'N': {
            class: "door angled right warp1 fakeunlock",
            lockFlag: "permalocked",
            lockExec: ()=>startDialogue("spine"),
            teleportTarget: "grm_spine",
        },

        'Ṇ': { // version with the window
            class:"blocks cwall north cornerwall",
            contains: {
                html: `
                    <canvas class="wall w-wall" sprite="/img/textures/black.gif" fit="stretch" baseWidth="[wallH]" baseHeight="3.5"></canvas>
                    <canvas class="wall n-wall" sprite="/img/local/embassy/mind/twistywindow.gif" fit="stretch" baseWidth="[wallW]" baseHeight="3.5"></canvas>
                `
            }
        }, 
        
        'Ṡ': {
            class:"blocks cwall south cornerwall",
            contains: {
                html: `
                    <canvas class="wall e-wall" style="display: none" sprite="/img/textures/black.gif" fit="stretch" baseWidth="[wallH]" baseHeight="3.5"></canvas>
                    <canvas class="wall s-wall" sprite="/img/local/embassy/mind/twistydoors.gif" fit="stretch" baseWidth="[wallW]" baseHeight="3.5"></canvas>
                `
            }
        },
        
        p: { //player spawn point
            class: "empty darkborder",
            contains: {
                slug: 'p',
                id: "creature",
                class: "player ally-sprite",
                type: "player"
            }
        },      

        "1": {
            class: "door angled up",
            teleportTarget: "g_lobby",
            teleportSpot: 42,
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'nothing...', readout: true})
        },

        x: {
            teleportTarget: "g_lobby",
            teleportSpot: 42,
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'i am not sure how to open this', readout: true})
        },
    },

    underFloor: {
        sprite: "/img/local/embassy/mind/twistyfloor.gif",
        fit: "auto",
        position: "center"
    },

    width: 15,

    plan: `
        Ṇ..............
        .▒▒▒----------.
        .▒▒▒----------.
        Dp▒▒----------N
        .▒▒▒----------.
        .▒▒▒----------.
        ...1...x...x..Ṡ
    `
}

env.stages['grm_spine'] = {
    creature: env.stageEntities.embassyCreature,
    locale: "mind",
    enterDirection: "right",
    exec: function () {
        env.stages.grmStageInit(this)
        this.markCharEvents()
        env.stage.real.querySelectorAll(".character").forEach(el=>{
            if(el.id.startsWith("gakvu")) el.style.setProperty("--charTransform", "rotateY(45deg)");
            else if(el.id.startsWith("idril")) el.style.setProperty("--charTransform", "rotateY(-45deg)");
            else if(el.id.startsWith("mindcores")) el.style.setProperty("--charTransform", "rotateY(-90deg)");
            else if(el.id.startsWith("cavik")) el.style.setProperty("--charTransform", "rotateY(135deg)");
            else if(el.id.startsWith("telyu")) {
                el.classList.add("karikbearer")
                el.style.setProperty("--charTransform", "rotateY(-135deg)");
            }
        })
    },

    markCharEvents: function () {
        if(check("PAGE!!e4prog", 7)) {
            body.querySelectorAll(".character.cavik").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!spine_cavmil")))
            body.querySelectorAll(".character.miltza").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!spine_cavmil")))

            body.querySelectorAll(".character.gakvu").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!spine_gakdril")))
            body.querySelectorAll(".character.idril").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!spine_gakdril")))

            body.querySelectorAll(".character.bozko").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!spine_boztoz")))
            body.querySelectorAll(".character.tozik").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!spine_boztoz")))

            body.querySelectorAll(".character.telyu").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!spine_kartel")))
            body.querySelectorAll(".character.karik").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!spine_kartel")))
        }
    },

    entities: {
        'd': {
            class: "door grand down",
            teleportTarget: "grm_core",
            teleportSpot: 63,
            shouldFace: "up",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sourceless', text: `vekoa is surely still too strong for us to deal with directly yet`, readout: true}),
            /*
            contains: {
                class: "lonewall",
                html: `<canvas class="wall n-wall" sprite="/img/local/embassy/mind/marbling_pillars_dark_short.gif" fit="stretch" baseWidth="5" baseHeight="3.5"></canvas>`
            }
            */
        },

        'D': {
            class: "door angled left",
            teleportTarget: "hall_dull-spine",
            teleportSpot: 58,
            shouldFace: "down",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'the way back to the dull mind... i have no need to go this way', readout: true}),
            /*
            contains: {
                class: "lonewall",
                html: `<canvas class="wall w-wall" sprite="/img/local/embassy/mind/marbling_pillars_dark_short.gif" fit="stretch-y" position="bottom left" baseWidth="5" baseHeight="3.5"></canvas>`
            }
            */
        },

        'C': {
            class: "door angled right",
            teleportTarget: "hall_spine-heart",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sys', text: "NOTICE::'utilize PROCEED entity';'precaution to allow iteration saving'", readout: true}),
            /*
            contains: {
                class: "lonewall",
                html: `<canvas class="wall e-wall" sprite="/img/local/embassy/mind/marbling_pillars_dark_short.gif" fit="stretch-y" position="bottom left" baseWidth="5" baseHeight="3.5"></canvas>`
            }
            */
        },

        "Ü": { 
            class: "prop blocks notile",
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/projectorbig_tiny.gif)',
                    width: 5,
                    height: 5,
                    noback: true,
                    transform: 'translateX(-10%) rotateY(100deg) rotate(152deg) translate(-50%, 100%)',
                    style: "background-position: bottom"
                }
            }
        },

        "☻": {
            class: "prop blocks notile",
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/projectorbig_tiny.gif)',
                    width: 5,
                    height: 5,
                    noback: true,
                    transform: 'rotateY(-90deg) translateX(700%) rotateY(-90deg) translateX(50%) translateY(-50%) rotate(152deg)',
                    style: "background-position: bottom;transform-origin: center;"
                }
            }
        },

        "^": {
            class: "nothing",
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/archivalwaves.gif)',
                    width: 1,
                    height: 3.5,
                    class: "archivalhatch",
                    transform: "rotateY(180deg)",
                    style: `background-size: 100% 100%;bottom: 100%;`
                }
            }
        },    
        
        "I": {
            class: "blocks notile",
            contains: {
                dyp: {
                    width: 4.95,
                    height: 7.82,
                    image: "url(/img/local/embassy/mind/spinemid.png)",
                    transform: "translateZ(-900px) rotateY(180deg) rotateX(63.45deg)",
                    style: "background-size: 100% 100%;"
                }
            } 
        },

        "<": {
            class: "blocks",
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/projectorbig_tiny.gif)',
                    width: 6,
                    height: 3,
                    noback: true,
                    transform: 'translate(-10%) rotateY(-90deg)',
                    style: "background-size: 100% 100%;"
                }
            }
        },

        ">": {
            class: "blocks",
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/projectorbig_tiny.gif)',
                    width: 6,
                    height: 3,
                    noback: true,
                    transform: 'translate(10%) rotateY(90deg)',
                    style: "background-size: 100% 100%;"
                }
            }
        },

        "8": {
            class: "blocks notile",
            contains: {
                class: "spineconnector",
                html: `<figure style="display: none"></figure>`,
                dyp: {
                    width: 9,
                    height: 9.5,
                    noback: true,
                    image: "url(/img/local/embassy/mind/spinetop.png)",
                    transform: `translateZ(calc(var(--gridTileSize) * -0.5)) translateY(-36%) rotateX(-13deg) rotateY(180deg)`,
                    style: `background-size: 100% 100%;`,
                }
            }
        },

        "τ": {
            class: "blocks darktile",
            contains: {
                dyp: {
                    width: 3,
                    height: 5,
                    image: "url(/img/local/embassy/mind/spinebot.png)",
                    style: `transform: rotate(180deg) translateY(120%); background-size: 100% 100%; bottom: 0;`,
                }
            }
        },

        "!": {
            class: "notile",
            contains: {
                examineEntity: "archival hatch",
                dyp: {
                    image: 'url(/img/local/embassy/archivalhatch.gif)',
                    width: 3,
                    height: 3,
                    class: "archivalhatch",
                    noback: true,
                    transform: 'rotateY(-20deg) translate(-150%, -100%) rotateY(180deg) rotate(-45deg) rotateY(-40deg)',
                }
            }
        },

        "@": {
            class: "notile",
            contains: {
                examineEntity: "archival hatch",
                dyp: {
                    image: 'url(/img/local/embassy/archivalhatch.gif)',
                    width: 0.75,
                    height: 3,
                    class: "archivalhatch",
                    noback: true,
                    transform: 'rotateY(180deg) translateY(-50%) rotateX(-60deg)',
                    style: "background-size: 100% 100%;"
                }
            }
        },

        "#": {
            class: "notile",
            contains: {
                examineEntity: "archival hatch",
                dyp: {
                    image: 'url(/img/local/embassy/archivalhatch.gif)',
                    width: 3,
                    height: 3,
                    class: "archivalhatch",
                    noback: true,
                    transform: 'rotateY(-90deg) translate(-100%, -200%) rotateX(-90deg) rotate(30deg)',
                }
            }
        },

        "%": {
            class: "notile",
            contains: {
                examineEntity: "archival hatch",
                dyp: {
                    image: 'url(/img/local/embassy/archivalhatch.gif)',
                    width: 3,
                    height: 3,
                    class: "archivalhatch",
                    noback: true,
                    transform: 'rotate(180deg) rotateY(180deg)',
                }
            }
        },

        "&": {
            class: "notile",
            contains: {
                examineEntity: "archival hatch",
                dyp: {
                    image: 'url(/img/local/embassy/archivalhatch.gif)',
                    width: 3,
                    height: 3,
                    class: "archivalhatch",
                    noback: true,
                    transform: 'translate(300%, 100%) rotateY(229deg)',
                }
            }
        },

        "5": {
            class: "notile", 
            contains: {
                class: "spinecross hidelow",
                dyp: {
                    image: 'url(/img/local/embassy/mind/spinalanchorbig.gif)',
                    width: 3.6,
                    height: 3.4,
                    cross: true,
                    transform: "translateY(5%)"
                }
            }
        },

        "4": {
            class: "notile",
            contains: {
                class: "pooltarget",
                examineEntity: "knowledge pool",
                dyp: {
                    width: 1,
                    height: 1,
                    image: "transparent",
                    style: `
                        transform: translateX(-100%);
                        position: absolute;
                        bottom: 0;
                    `
                }
            }
        },

        "S": {
            class: "notile",
            contains: {
                class: "spinecross",
                dyp: {
                    image: 'url(/img/local/embassy/mind/spinespike_shorter.gif)',
                    width: 6,
                    height: 6.4,
                    cross: true,
                    transform: "rotateY(45deg)"
                }
            }
        },

        "*": {
            class: "blocks",
            contains: {
                html: `<span class="spineterminal"><div class="target" entity="spinal tether"></div></span>`,
                class: "spineterminalhost",
            }
        },

        "Q": {
            class: "prop chartile blocks",
            contains: {
                examineEntity: "malvi's body",
                dyp: {
                    image: 'url(/img/local/embassy/mind/archivistcorpse.gif)',
                    width: 2,
                    height: 1.5,
                    transform: 'rotateY(180deg)'
                }
            }
        },
    },

    underFloor: {
        sprite: "/img/local/embassy/mind/spinefloor.gif",
        fit: "auto",
        position: "center",
        repeat: "no-repeat",
    },

    width: 17,
    plans: {
        default: `
            ........d........
            .○○○○○░░░░░○○○○○.
            .○○○○○M░░░░○○○○○.
            .○○54○v░░░░○○54○.
            .○○○○○░░░░░○○○○○.
            .○○○○○░░░░░○○○○○.
            .░░░░░░░░░░░░░░░.
            .░░░░░░░░░░░░░░░$
            Dp░░░░░░S░░░░░░░C
            .░░░░░░░*░░░░░░░.
            .░░░Q░░GbĴ░░░░░V.
            .○○○○○░░░░░○○○○○.
            .○○○○○░░░░░○○○○○.
            .○○54○░░░░░○○54○.
            .○○○○○░░░░░○○○○○.
            .○○○○○░k░T░☻○○○○.
            .................
        `,

        empty: `
            ........d........
            .○○○○○░░░░░○○○○○.
            .○○○○○░░░░░○○○○○.
            .○○5○○░░░░░○○5○○.
            .○○○○○░░░░░○○○○○.
            .○○○○○░░░░░○○○○○.
            .░░░░░░░░░░░░░░░.
            .░░░░░░░░░░░░░░░$
            Dp░░░░░░S░░░░░░░C
            .░░░░░░░*░░░░░░░.
            .░░░Q░░░░░░░░░░░.
            .○○○○○░░░░░○○○○○.
            .○○○○○░░░░░○○○○○.
            .○○5○○░░░░░○○5○○.
            .○○○○○░░░░░○○○○○.
            .○○○○○░░░░░☻○○○○.
            .................
        `
    },

    getPlan: function() {
        if(check("PAGE!!e4prog") <= 6) {
            return this.plans.empty
        }

        return this.plans.default
    }
}

env.stages['hall_spine-heart'] = {
    creature: env.stageEntities.embassyCreature,
    locale: "mind",
    enterDirection: "right",
    exec: function () {
        env.stages.grmStageInit(this)
    },

    entities: {
        'N': {
            class: "door angled left warp1",
            teleportTarget: "grm_spine",
            teleportSpot: 58,
            shouldFace: "left",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'we have done all we needed back in the spinal connection', readout: true})
        },

        'C': {
            class: "door angled right warp1 fakeunlock",
            teleportTarget: "grm_heart",
            lockFlag: "permalocked",
            lockExec: ()=>startDialogue("heart"),
        },

        'Ṇ': { // version with the window
            class:"blocks cwall north cornerwall",
            contains: {
                html: `
                    <canvas class="wall w-wall" style="display: none" sprite="/img/textures/black.gif" fit="stretch" baseWidth="5" baseHeight="3.5"></canvas>
                    <canvas class="wall n-wall" sprite="/img/local/embassy/mind/splitwindow.gif" fit="stretch" baseWidth="13" baseHeight="3.5"></canvas>
                `
            }
        }, 
        
        'Ṡ': {
            class:"blocks cwall south cornerwall",
            contains: {
                html: `
                    <canvas class="wall e-wall" style="display: none" sprite="/img/textures/black.gif" fit="stretch" baseWidth="5" baseHeight="3.5"></canvas>
                    <canvas class="wall s-wall" sprite="/img/local/embassy/mind/splitdoors.gif" fit="stretch" baseWidth="13" baseHeight="3.5"></canvas>
                `
            }
        },

        '1': {
            teleportTarget: "g_lobby",
            teleportSpot: 42,
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'the door squirms away from us', readout: true})
        },

        '2': {
            teleportTarget: "g_lobby",
            teleportSpot: 42,
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sourceless', text: '...', readout: true})
        },

        '3': {
            teleportTarget: "g_lobby",
            teleportSpot: 42,
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'it is hidden from us in the coil of the ceremony', readout: true})
        },

        '▒': {
            class: "darkwarble",
        },
    },

    underFloor: {
        sprite: "/img/local/embassy/mind/splitfloor.gif",
        fit: "auto",
        position: "top right",
        repeat: "no-repeat",
    },

    width: 15,

    plan: `
        Ṇ..............
        .░░░░░○○○░░░░░.
        .░░░░░○○○░░░░░.
        Np░░░░○○○░░░░░C
        .░░░░░○○○░░░░░.
        .░░░░░○○○░░░░░.
        ...1.▒▒2▒▒.3..Ṡ 
        ....▒▒...▒▒....
        .....▒▒.▒▒.....
        ....▒▒...▒▒....
        .....▒▒▒▒▒.....
    `
}

env.stages['grm_heart'] = {
    creature: env.stageEntities.embassyCreature,
    locale: "mind",
    enterDirection: "right",

    
    exec: function () {
        env.stages.grmStageInit(this)
        this.markCharEvents()

        switch(check("PAGE!!e4prog")) {
            case 11: 
                env.stage.real.querySelectorAll(".character").forEach(el=>{
                    if(el.id.startsWith("cavik")) el.style.setProperty("--charTransform", "rotateY(-135deg)");
                    else if(el.id.startsWith("idril")) el.style.setProperty("--charTransform", "rotateY(70deg)");
                    else if(el.id.startsWith("bozko")) el.style.setProperty("--charTransform", "  rotateY(45deg)");
                    else if(el.id.startsWith("mindcores")) el.style.setProperty("--charTransform", "rotateY(-90deg)");
                })
            break

            default:  
                env.stage.real.querySelectorAll(".character").forEach(el=>{
                    if(el.id.startsWith("miltza")) el.style.setProperty("--charTransform", "rotateY(-45deg)");
                    else if(el.id.startsWith("gakvu")) el.style.setProperty("--charTransform", "rotateY(-135deg)");
                })
            break
        }
    },

    markCharEvents: function () {
        if(check("PAGE!!e4prog", 10)) {
            body.querySelectorAll(".character.miltza").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!heart_tozgakmil")))
            body.querySelectorAll(".character.gakvu").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!heart_tozgakmil")))
            body.querySelectorAll(".character.tozik").forEach(el=>el.classList.toggle("hassomethingtosay", !check("PAGE!!heart_tozgakmil")))
        }
    },
    
    entities: {
        'd': {
            class: "door grand down weird",
            teleportTarget: "grm_core",
            teleportSpot: 153,
            shouldFace: "right",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'soon... but not until we weaken the ceremony further', readout: true}),
        },

        'N': {
            class: "door angled left warpmega2",
            teleportTarget: "hall_spine-heart",
            teleportSpot: 58,
            shouldFace: "down",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'the others will be back in a θblink', readout: true}),
        },

        'E': {
            class: "door angled right warp1",
            teleportTarget: "hall_heart-entry",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sys', text: "NOTICE::'utilize PROCEED entity';'precaution to allow iteration saving'", readout: true})
        },
        
        "♦": {
            class: "blocks notile",
            contains: {
                examineEntity: "heart terminal",
                html: `<figure>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </figure>`,
                dyp: {
                    class: "pyramid pyrasol heartspike",
                    width: 3,
                    height: 3,
                    image: "transparent"
                }
            } 
        },

        "!": {
            class: "blocks notile",
            contains: {
                class: "spireheart",
                dyp: {
                    transform: `translateX(calc(var(--gridTileSize) * -1))`,
                    image: "url(/img/local/embassy/mind/heart.gif)",
                    width: 15,
                    height: 11,
                }
            } 
        },

        "?": {
            class: "blocks notile",
            contains: {
                class: "spireheart",
                dyp: {
                    transform: `translateX(calc(var(--gridTileSize) * -1))`,
                    image: "url(/img/local/embassy/mind/heartcollapse.gif)",
                    width: 15,
                    height: 11,
                }
            } 
        },

        'Ṇ': { // version with the window
            class:"blocks cwall north cornerwall critical",
            contains: {
                html: `
                    <canvas class="wall w-wall" style="display: none"></canvas>
                    <canvas class="wall n-wall" sprite="/img/local/embassy/mind/window_weird.gif" fit="stretch" baseWidth="[wallW]" baseHeight="3.5"></canvas>
                `
            }
        }, 
    },

    underFloor: {
        sprite: "/img/local/embassy/mind/heartfloor.gif",
        fit: "auto",
        repeat: "no-repeat",
    },
    
    width: 15,
    plans: {
        nofriends: `
            Ṇ○○○○○○d○○○○○○○
            ○░░░░░░░░░░░░░○
            ○░░░░░░░░░░░░░$
            Np░░░░░░░░░░░░E
            ○░░░░░░░░░░░░░○
            ○░░░░░░░░░░░░░○
            ○░░░░░░░░░░░░░○
            ○░░░░░░░░░░░░░○
            ○░░░░░░○░░░░░░○
            ○░░░░░○○○░░░░░○
            ○░░░░○○♦!○░░░░○
            ○░░░░░○○○░░░░░○
            ○░░░░░░○░░░░░░○
            ○░░░░░░░░░░░░░○
        `,

        friends: `
            Ṇ○○○○○○d○○○○○○○
            ○░░░░░░░░░░░░░○
            ○░░░░░░░░░░░░░$
            Np░░░░░░░░░░░░E
            ○░░░░░░░░░░░░░○
            ○░░░░░░░░░░░░░○
            ○░░░░░░░░░░░░░○
            ○░░░░░MTG░░░░░○
            ○░░░░░░○░░░░░░○
            ○░░░░░○○○░░░░░○
            ○░░░░○○♦!○░░░░○
            ○░░░░░○○○░░░░░○
            ○░░░░░░○░░░░░░○
            ○░░░░░░░░░░░░░○
        `, 

        bombmode: `
            Ṇ○○○○○○d○○○○○○○
            ○░░░░░░░░░░░░░○
            ○░░░░░░░░░░░░░$
            N░░░░░░░░░░░░pE
            ○░M░░░░░░░░░░░○
            ○░░░░░░░░░░░░░○
            ○░░░░░░m░░░░░░○
            ○░░░░░vbĴ░░░░░○
            ○░░░░░░○░░k░░░○
            ○░░░░T○○○░░░░░○
            ○░░░░○○♦!○░░░░○
            ○░░░░░○○○░░░░░○
            ○░░░░░░○░░░░░░○
            ○░░░░░░░░░░░░░○
        `, 

        collapsing: `
            Ṇ○○○○○○d○○○○○○○
            ○░░░░░░░░░░░░░○
            ○░░░░░░░░░░░░░$
            Np░░░░░░░░░░░░E
            ○░░░░░░░░░░░░░○
            ○░░░░░░░░░░░░░○
            ○░░░░░░░░░░░░░○
            ○░░░░░░░░░░░░░○
            ○░░░░░░○░░░░░░○
            ○░░░░░○○○░░░░░○
            ○░░░░○○○?○░░░░○
            ○░░░░░○○○░░░░░○
            ○░░░░░░○░░░░░░○
            ○░░░░░░░░░░░░░○
        `, 
    },

    getPlan: function() {
        let plan

        switch(check("PAGE!!e4prog")) {
            case 10: plan = this.plans.friends; break;
            default: plan = this.plans.nofriends
        }

        return plan
    },
}

env.stages['hall_heart-entry'] = {
    creature: env.stageEntities.embassyCreature,
    locale: "mind",
    enterDirection: "right",
    exec: function () {
        env.stages.grmStageInit(this)

        if(check("PAGE!!e4prog", 13)) {
            env.stage.real.querySelectorAll(".character").forEach(el=>{
                if(el.id.startsWith("gakvu")) el.style.setProperty("--charTransform", "rotateY(0deg)");
                else if(el.id.startsWith("bozko")) el.style.setProperty("--charTransform", "rotateY(90deg)");
                else if(el.id.startsWith("idril")) el.classList.add("karikbearer")
            })
        } else {
            env.stage.real.querySelectorAll(".character").forEach(el=>{
                if(el.id.startsWith("gakvu")) el.style.setProperty("--charTransform", "rotateY(90deg)");
                else if(el.id.startsWith("bozko")) el.style.setProperty("--charTransform", "rotateY(90deg)");
                else if(el.id.startsWith("idril")) el.classList.add("karikbearer")
            })
        }
    },

    entities: {
        'C': {
            class: "door angled left",
            teleportTarget: "grm_heart",
            teleportSpot: 58,
            shouldFace: "left",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'sourceless', text: 'that is not an option', readout: true})
        },

        'E': {
            class: "door angled right",
            teleportTarget: "grm_entry",
            teleportSpot: 34,
            shouldFace: "right"
        },

        'x': {
            class: "door angled up",
            teleportTarget: "g_lobby",
            teleportSpot: 42,
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'actual_site_error', text: 'gakvu episode 4', readout: true})
        },

        'Ṇ': { // version with the window
            class:"blocks cwall north cornerwall",
            contains: {
                html: `
                    <canvas class="wall w-wall" sprite="/img/local/embassy/mind/hearthallsides.gif" fit="stretch" baseWidth="[wallH]" baseHeight="3.5"></canvas>
                    <canvas class="wall n-wall" sprite="/img/local/embassy/mind/hearthallwindow.gif" fit="stretch" baseWidth="[wallW]" baseHeight="3.5"></canvas>
                `
            }
        }, 
        
        'Ṡ': {
            class:"blocks cwall south cornerwall",
            contains: {
                html: `
                    <canvas class="wall e-wall" sprite="/img/local/embassy/mind/hearthallsides.gif" fit="stretch" baseWidth="[wallH]" baseHeight="3.5"></canvas>
                    <canvas class="wall s-wall" sprite="/img/local/embassy/mind/hearthalldoors.gif" fit="stretch" baseWidth="[wallW]" baseHeight="3.5"></canvas>
                `
            }
        }
    },

    underFloor: {
        sprite: "/img/local/embassy/mind/hearthallfloor.gif",
        fit: "auto",
        repeat: "no-repeat",
    },

    width: 15,
    plans: {
        prehelping: `
            Ṇ..............
            .-Ĵ○----------.
            .--○$k--------.
            Cp-○----------E
            .--○-G--------.
            .--○----------.
            ..............Ṡ
        `, 

        helping: `
            Ṇ..............
            .-Ĵ○-----&----.
            .--○$k--------.
            Cp-○---&------E
            .--○-G---&----.
            .--○-------&--.
            ..............Ṡ
        `, 

        posthelp: `
            Ṇ..............
            .░░░░░░ĴG░░░░░.
            .░░░░░░░░░░░░░.
            Cp░░░░░░░░░░░░E
            .░░░░░░░░░k░░░.
            .░░░░░░░░░░░░░.
            ...x...x...x..Ṡ
        `, 
    },

    getPlan: function() {
        let plan = this.plans.helping
        if(check("PAGE!!e4prog") > 12) {plan = this.plans.posthelp}

        return plan
    },
}

env.stages['grm_core'] = {
    creature: env.stageEntities.embassyCreature,
    locale: "core",
    exec: function () {
        env.stages.grmStageInit(this)
    },
    enterDirection: "down",

    entities: {
        "?": {
            class: "blocks",
            contains: {
                examineEntity: "core test",
                dyp: {
                    width: 1.5,
                    height: 3,
                }
            } 
        },

        'L': {
            class: "door up grand",
            teleportTarget: "grm_lesser",
            teleportSpot: 22,
            shouldFace: "up",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'actual_site_error', text: 'this room is just for da cutscene', readout: true}),
        },

        'D': {
            class: "door right grand",
            teleportTarget: "grm_dull_front",
            teleportSpot: 22,
            shouldFace: "up",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'actual_site_error', text: 'this room is just for da cutscene', readout: true}),
        },

        'P': {
            class: "door down grand",
            teleportTarget: "grm_spine",
            teleportSpot: 22,
            shouldFace: "up",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'actual_site_error', text: 'this room is just for da cutscene', readout: true}),
        },

        'C': {
            class: "door left grand",
            teleportTarget: "grm_heart",
            teleportSpot: 22,
            shouldFace: "up",
            lockFlag: "permalocked",
            lockExec: ()=>chatter({actor: 'actual_site_error', text: 'this room is just for da cutscene', readout: true}),
        },

        "M": {
            class: "blocks darkmind gelitable",
            contains: {
                examineEntity: "echo chamber",
                dyp: {
                    image: 'url(/img/local/embassy/mindscanner.gif)',
                    width: 7,
                    height: 12,
                    cross: true,
                    transform: 'translateY(39%) rotateY(45deg)'
                }
            } 
        },

        '}': {
            class: "notile",
            contains: {
                class: "lonewall",
                html: `<canvas
                style="transform: translateY(-10%) rotateX(-90deg) rotateY(-45deg) translate(-50%, -50%)"
                class="wall e-wall" sprite="/img/local/embassy/mind/marbling_core_invert.gif" fit="stretch-y" position="bottom left" baseWidth="8.5" baseHeight="5"></canvas>`
            }
        },   

        ']': {
            class: "notile",
            contains: {
                class: "lonewall",
                html: `<canvas
                style="transform: translateY(10%) rotateX(-90deg) rotateY(-135deg) translate(-50%, -50%)"
                class="wall e-wall" sprite="/img/local/embassy/mind/marbling_core_invert.gif" fit="stretch-y" position="bottom left" baseWidth="8.5" baseHeight="5"></canvas>`
            }
        },  

        '{': {
            class: "notile",
            contains: {
                class: "lonewall",
                html: `<canvas
                style="transform: translate(11.5%, -10%) rotateX(-90deg) rotateY(45deg) translate(-50%, -50%)"
                class="wall e-wall" sprite="/img/local/embassy/mind/marbling_core_invert.gif" fit="stretch-y" position="bottom left" baseWidth="8.5" baseHeight="5"></canvas>`
            }
        },   

        '[': {
            class: "notile",
            contains: {
                class: "lonewall",
                html: `<canvas
                style="transform: translate(11.5%, 10%) rotateX(-90deg) rotateY(135deg) translate(-50%, -50%)"
                class="wall e-wall" sprite="/img/local/embassy/mind/marbling_core_invert.gif" fit="stretch-y" position="bottom left" baseWidth="8.5" baseHeight="5"></canvas>`
            }
        },    
        
        'x': {
            class: "notile"
        },

        'N': {
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/mind/veintest.gif)',
                    width: 8,
                    height: 6,
                    transform: "rotateY(90deg) translateY(-50%) rotateX(-60deg) translateY(10%)",
                    style: "background-size: 100% 100%;",
                    noback: true,
                }
            }
        },

        'n': {
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/mind/veintest.gif)',
                    width: 8,
                    height: 6,
                    transform: "rotateY(-90deg) translateY(-50%) rotateX(-60deg) translateY(10%)",
                    style: "background-size: 100% 100%;",
                    noback: true,
                }
            }
        },

        'e': {
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/mind/veintest.gif)',
                    width: 8,
                    height: 6,
                    transform: "rotateY(180deg) translateY(-50%) rotateX(-60deg) translateY(10%)",
                    style: "background-size: 100% 100%;",
                    noback: true,
                }
            }
        },

        'E': {
            contains: {
                dyp: {
                    image: 'url(/img/local/embassy/mind/veintest.gif)',
                    width: 8,
                    height: 6,
                    transform: "translateY(-50%) rotateX(-60deg) translateY(10%)",
                    style: "background-size: 100% 100%;",
                    noback: true,
                }
            }
        },

        "O": {
            class: "prop blocks notile",
            contains: {
                class: "marbletable coreholder",
                dyp: {
                    width: 6,
                    height: 6,
                    image: "url(/img/local/embassy/mind/marbling_circle.gif)",
                    noback: true,
                    transform: `translateY(-5%) rotateX(90deg)`,
                    style: `background-size: 100% 100%;bottom: unset;`,
                }
            }
        }, 
    },

    width: 17,

    plan: `
        ........P........
        .......▓▓▓.......
        ......░▓▓▓░......
        .....░░▓▓▓░░.....
        ...x░░░▓▓▓░░░x...
        ...░░░░▓▓▓░░░░...
        ..░░░░░▓▓▓░░░░░..
        .░░░░░░▓e▓░░░░░░.
        C░░░░░░nON░░░░░░D
        .░░░░░░░E░░░░░░░.
        ..░░░░░░░░░░░░░..
        ...░░░░░░░░░░░...
        ...x░░░░░░░░░x...
        .....░░░░░░░.....
        ......░░░░░......
        .......░p░.......
        ........L........
    `
}

/* e4a1 little sneka peka */
env.stages['out_early'] = {
    fogRadius: 8,
    fogAlgorithm: "half",
    width: 11,

    exec: ()=> {
        env.stage.querySelectorAll(".raised-floaty").forEach((e) => e.style.animationDelay = `${-1 * rand(1, 20)}s`)
        env.stage.querySelectorAll('.bstrd.face-creature').forEach(el=>el.classList.remove("face-creature"))
    },

    onStep: ()=>{
        let strength = Math.clamp((1 / (env.stage.stageH - 3)) * (env.stage.creatureLoc.y - 3), 0, 1)
        content.style.setProperty('--bstrdcontrol', strength)  
    },

    //possibly the most scuffed way of limiting styles? the idea was interesting to me
    //i don't want these styles to even be considered by the renderer off this zone since there's an import
    //there's probably some shadowroot namespace bullshit i could do but it's not that serious
    html: `
        <style>
            @import url(/css/stage/beneath.css);

            #realgrid .gridpiece.invisiblewalk:empty {
                background: transparent;
                border: unset;
            }

            #realgrid .bstrd .head {
                background-image: url(/img/sprites/combat/foes/bstface.gif), url(/img/sprites/combat/foes/bsthead.gif);
            }

            #realgrid .bstrd .body {
                background-image: url(/img/sprites/combat/foes/bstbody.gif);
            }

            #realgrid .bstrd .arms {
                background-image: url(/img/sprites/combat/foes/bstarms.gif);
            }

            .bstrd-hold #realgrid .bstrd .arms {
                background-image: url(/img/sprites/combat/foes/bstgun.gif);
            }

            #realgrid .character.bstrd {
                height: calc(var(--gridTileSize) * 2.5);
                width: calc(var(--gridTileSize) * 1.5);
            }

            body[quality="regular"] .character.bstrd .arms, body[quality="regular"] .character.bstrd .head {
                animation: TINYHOVER 3s ease-in-out infinite alternate;
            }

            body#out_early #content {
                background: transparent;
            }

            body#out_early #content::after {
                background: black;
                opacity: calc(1 - var(--bstrdcontrol, 0))
            }

            body#out_early::after {
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
                display: block;
                background-image: url(/img/textures/fadeinlong.gif), url(/img/textures/corruripplebastard.gif), url(/img/textures/static.gif);
                background-size: 100% 100%, auto, auto;
                transform: unset;
            }

            .scatterquickruuun {
                animation-fill-mode: forwards !important;
                animation-delay: 0.4s !important;
            }

            .scrammed {
                display: none !important;
            }

            @keyframes SCRAM {
                0% { transform: rotateX(-90deg) var(--dyp-transform) translateY(0%) scaleX(1); opacity: 1}
                100% { transform: rotateX(-90deg) var(--dyp-transform) translateY(-100%) scaleX(0.2); opacity: 0}
            }
        </style>
    `,

    entities: {
        "B": {
            class: "prop notile",
            contains: {
                class: "bstrd character face-creature",
                examineEntity: "bstrd",
                html: `<figure>
                    <div class="head"></div>
                    <div class="body"></div>
                    <div class="arms"></div>
                </figure>`,
            }
        },

        "?": {
            class: "notile",
            contains: {
                html:  `<div class="daemonsprite sprite-wrapper" onmouseenter="env.grm.daemonScatter(this)">
                    <figure class="daemon rook accurate-position">
                        <img src="/img/sprites/daemons/rook/body.gif">
                        <div class="eye"></div>
                        <div class="eye"></div>
                        <div class="eye"></div>
                        <div class="eye"></div>
                        <div class="eye"></div>
                        <div class="leftarm">
                            <div class="downarm">
                                <div class="upclaw"></div>
                                <div class="downclaw"></div>
                            </div>
                        </div>
                        <div class="rightarm">
                            <div class="downarm">
                                <div class="upclaw"></div>
                                <div class="downclaw"></div>
                            </div>
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
                html:  `<div class="daemonsprite sprite-wrapper" onmouseenter="env.grm.daemonScatter(this)">
                    <figure class="daemon pawn accurate-position">
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

        "=": {class: "gap blocks raised-floaty"},
        "_": {class: "gap blocks"},
        "▒": {class: "invisiblewalk nothing"},

        "9": { teleportTarget: "grm_lesser" }
    },

    plan: `
        ._.=_9_=...
        ▒▒=░░p░=▒▒=
        =▒=░░░░░=▒▒
        .=▒░▒░░▒▒=▒
        .=▒░▒▒=▒▒▒=
        ..=▒▒▒░▒▒▒▒
        ..=▒░░░▒░=▒
        ..=▒░▒░▒===
        ...=▒▒▒▒=..
        .=.==▒▒=...
        ....=▒==...
        .?.=.==.=.!
        =..=..=..=.
        ....=....=.
        ▒==▒▒▒?▒=.=
        .▒▒=!B▒=▒▒.
    `,

    planAdjustment: (plan)=>{
        if(check("groundstrd")) return plan.replaceAll("!", ".").replaceAll("?", ".").replaceAll("B", ".")

        return plan
    }
}