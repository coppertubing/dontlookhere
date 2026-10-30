// ep4 object
env.grm = {
    //quick wrapper for starting and page-marking
    startDialogue: (name) => {
        startDialogue(name)
        change(`PAGE!!${name}`, true)
    },

    /* specific calls since ep4 is linear */
    combat: (sequence) => {
        if(CombatScene.SCENARIOS[sequence] && !env?.rpg?.active) {
            pauseSwapCam(true)
            content.insertAdjacentHTML(`beforeend`, `<combat-scene scenario='${sequence}'></combat-scene>`)
        }
    },

    // should handle everything necessary to restart the fight
    startRetryOffer: ()=> {
        if(env.rpg.retry || env?.currentDialogue?.active) return;
        
        env.rpg.cancelClose = true
        startDialogue("loss")
        env.rpg.retry = true
    },

    defaultRetry: (callback, autoStartScene = true) => {
        env.rpg.cancelClose = false
        MUI("off")
        vfx({type: "skip", state: true, useCutscene: true})
        let vol = Howler.volume()
        Howler.volume(0)

        if(env?.rpg?.classList) closeCombat(env.rpg.allyTeam, true)

        setTimeout(() => {
            if(callback) callback()
            if(autoStartScene) content.insertAdjacentHTML(`beforeend`, `<combat-scene scenario='${env.lastScenario.name}'></combat-scene>`)
        }, 3000)

        setTimeout(() => {
            vfx({type: "skip", state: false, useCutscene: false})
            Howler.volume(vol)
        }, 4500);
    },

    //new way of giving items in EP4
    lootboxCheck: (validActorSlugs) => {
        let specificSpawn = false
        let spawnChance = 0
        let totalItems = page.party.inventory.reduce((sum, item) => sum + item[0].group ? item[1] : 0, 0)
        if(!env.rpg.itemSpawns) env.rpg.itemSpawns = 0

        if(checkItem("restorative") < 6 && !env.rpg.restorativeDrop) {
            specificSpawn = "restorative"
            spawnChance = 0.75
            env.rpg.restorativeDrop = true

        } else if(totalItems < 12 && env.rpg.itemSpawns < 2) {
            spawnChance = 0.075

        } else if(totalItems < 12 && env.rpg.itemSpawns < 4) {
            spawnChance = 0.03

        } else {
            spawnChance = 0.01
        }

        if(Math.random() < spawnChance) {
            let pick = env.rpg.enemyTeam.members.find(m=>validActorSlugs.includes(m.originalSlug) && !m.holdingItem)
            if(pick) {
                let chosenSpawn = env.ITEM_LIST[["satik_cyst", "aima_cyst", "kavruka", "restorative", "satik_cyst", "aima_cyst", "kavruka", "satik_cyst", "aima_cyst", "kavruka", "restorative", "satik_cyst", "aima_cyst", "kavruka", "disabler"].sample()]
                pick.holdingItem = {
                    name: specificSpawn || chosenSpawn.slug,
                    qty: chosenSpawn.batches
                }

                addStatus({target: pick, status: "lootbox"})
                env.rpg.itemSpawns++
            }
        }
    },

    skipSpineIntro: () => {
        change("PAGE!!cavikblunder", "DELETE")
        if(env?.rpg?.allyTeam && env.rpg.scenario.name == "ep4_split_1_ing") closeCombat(env.rpg.allyTeam, true)
            
        if(!env?.rpg?.miltzaSkipState) {
            setTimeout(() => {
                env.grm.combat("ep4_split_2_ing") 
            }, 1100)

            setTimeout(() => {
                env.rpg.miltzaSkipState()
            }, 1200)

        } else env.rpg.miltzaSkipState()

        if(check("gameplay_off")) { 
            cutscene(true); 
            setTimeout(()=>{startDialogue("spine_miltza_nogame"); cutscene(false)}, 1500)
        }
    },

    skipLesserBossIntro: () => {
        if(!env?.rpg?.lesserSkipState) {
            setTimeout(() => {
                env.grm.combat("ep4_lesserboss_ing")
            }, 1100)

            setTimeout(() => {
                env.rpg.lesserSkipState()
            }, 1200)

        } else env.rpg.lesserSkipState()

        if(check("gameplay_off")) { 
            cutscene(true); 
            setTimeout(()=>{startDialogue("lesserboss_nogame"); cutscene(false)}, 1500)
        }
    },

    startDialogueOnce: (name, force) => {
        if(!page.flags?.startOnce) page.flags.startOnce = []
        if(page.flags.startOnce.includes(name) && !force) return;
        
        startDialogue(name)
        page.flags.startOnce.push(name)
    },

    music_embassy_uncanny: new Howl({
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
    }),

    music_coresong: new Howl({
        onload: function () {page.howls.push(this)},
        src: ['/audio/coresong.ogg'],
        preload: true,
        loop: true,
        volume: 0,
        sprite: {
            __default: [0, 9999999, true]
        }
    }),

    music_peace1: new Howl({
        onload: function () {page.howls.push(this)},
        src: ['/audio/ep4peace.ogg'],
        preload: true,
        loop: true,
        volume: 0,
        sprite: {
            __default: [2, 9999999, true]
        }
    }),

    music_dullmind: new Howl({
        onload: function () {page.howls.push(this)},
        src: ['/audio/ep4dull.ogg'],
        preload: true,
        loop: true,
        volume: 0,
        sprite: {
            __default: [2, 9999999, true]
        }
    }),

    music_runningoutoftime: new Howl({
        onload: function () {
            page.howls.push(this)
            this.intendedVol = 0.6
        },
        src: ['/audio/saiikotense.ogg'],
        preload: true,
        loop: true,
        volume: 0.6,
        sprite: {
            __default: [2, 9999999, true]
        }
    }),

    music_admission: new Howl({
        onload: function () {page.howls.push(this)},
        src: ['/audio/solaadmission.ogg'],
        preload: true,
        loop: true,
        volume: 1,
        sprite: {
            __default: [2, 9999999, true]
        }
    }),

    music_oki: new Howl({
        onload: function () {page.howls.push(this)},
        src: ['/audio/okidoia.ogg'],
        preload: true,
        loop: true,
        volume: 1,
        sprite: {
            __default: [20, 9999999, true]
        },
    }),

    music_antag: new Howl({
        onload: function () {page.howls.push(this)},
        src: ['/audio/antagpeace.ogg'],
        preload: true,
        loop: true,
        volume: 1,
        sprite: {
            __default: [10, 9999999, true]
        },
    }),

    velamb: new Howl({
        onload: function () {page.howls.push(this)},
        src: ['/audio/depths_vel.ogg'],
        preload: true,
        loop: true,
        volume: 0,
        sprite: {
            __default: [10, 9999999, true]
        }
    }),

    velvisit: function() {
        flash(true)
        content.insertAdjacentHTML('beforeend', `<div id="vello"><div class="face" id="velzieface"></div><div class="bg"></div></div>`)
        changeBgm(env.grm.velamb)
        setTimeout(()=>{env.recentSfx = false;play('criticalError', 1)}, 75)
        setTimeout(()=>{body.classList.add('vello');content.classList.add('collapse');env.stage.real.remove()}, 1000)
        setTimeout(()=>flash(false), 1200)
    },

    velbye: function() {
        content.classList.add('voodbye')
        setTimeout(()=>play('criticalError', 0.75), 300)
        changeBgm(page.bgm, {length: 5000, rate: 0.75})
        setTimeout(() => {
            window.vello.remove()
            body.classList.remove("vello")
            content.classList.remove("voodbye")
        }, 10000)
    },

    daemonScatter: function(el) {
        let id = el.parentElement.id
        env.stage.querySelectorAll(`#${id}`).forEach(pEl=>{
            pEl.classList.add('scatterquickruuun')
            setTimeout(() => {
                pEl.style.animation = `SCRAM 0.5s linear`
            }, 400)
            setTimeout(() => {
                pEl.classList.add('scrammed')
            }, 2000)
        })
    },

    mask: (ev) => {
        console.log("called", ev)
        switch(env.stage.name) {
            case "grm_entry":
                if((ev.detail.oldMask == "joy" || ev.detail.mask == "joy")) refreshStage()
            break

            case "grm_lesser":
                if(check("PAGE!!e4prog") == 15 && 
                    ((ev.detail.oldMask == "freedom" || ev.detail.mask == "freedom") && !check("groundstrd")) ||
                    ((ev.detail.oldMask == "hunger" || ev.detail.mask == "hunger"))
                ) refreshStage()
            break
        }
    }
}

env.grm.music_runningoutoftime.intendedVol = 0.75

// set up debug element upload
if (window.location.href.includes('concepting')) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    let clickedElement

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('dypcontent') || event.target.closest('.dypcontent')) {

            alert(`Width: ${event.target.offsetWidth}, Height: ${event.target.offsetHeight}`)

            clickedElement = event.target
            fileInput.click()
        }
    })

    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Set the clicked div's background image to the selected file
                clickedElement.style.backgroundImage = `url(${e.target.result})`
            };
            
            reader.readAsDataURL(this.files[0]); // Read the file
        }
    })
}


/* existing entity upgrading so we don't have to redefine or keep stacking actions on character entities */
//fromGroundsmindry is basically just a general flag for, "this is from groundsmindry.js so it's already been handled"
if(env.entities.cavik) if(!env.entities.cavik.actions.find(action => action.fromGroundsmindry)) {
    env.entities.cavik.actions.push(
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("entrance_cavik")
            },
            showIf: [["stageroom", "grm_entry"], ["PAGE!!e4prog", 1]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("lesser_tozcav")
            },
            showIf: [["stageroom", "grm_lesser"], ["PAGE!!e4prog", 2]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("dull_cavidril")
            },
            showIf: [["stageroom", "grm_dull_back"], ["PAGE!!e4prog", 4]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("spine_cavmil")
            },
            showIf: [["stageroom", "grm_spine"]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("final_cavik")
            },
            showIf: [["stageroom", "grm_lesser"], ["PAGE!!e4prog", 15]],
            fromGroundsmindry: true
        },
    )
}

if(env.entities.tozik) if(!env.entities.tozik.actions.find(action => action.fromGroundsmindry)) {
    env.entities.tozik.actions.push(
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("entrance_tozik")
            },
            showIf: [["stageroom", "grm_entry"], ["PAGE!!e4prog", 1]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("lesser_tozcav")
            },
            showIf: [["stageroom", "grm_lesser"], ["PAGE!!e4prog", 2]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("dull_gaktoz")
            },
            showIf: [["stageroom", "grm_dull_back"], ["PAGE!!e4prog", 4]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("spine_boztoz")
            },
            showIf: [["stageroom", "grm_spine"]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("heart_tozgakmil")
            },
            showIf: [["stageroom", "grm_heart"]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("final_tozik")
            },
            showIf: [["stageroom", "grm_lesser"], ["PAGE!!e4prog", 15]],
            fromGroundsmindry: true
        },
    )
}

if(env.entities.gakvu) if(!env.entities.gakvu.actions.find(action => action.fromGroundsmindry)) {
    env.entities.gakvu.actions.push(
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("dull_gaktoz")
            },
            showIf: [["stageroom", "grm_dull_back"], ["PAGE!!e4prog", 4]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("lesser_gakvu")
            },
            showIf: [["stageroom", "grm_lesser"], ["PAGE!!e4prog", 2]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("spine_gakdril")
            },
            showIf: [["stageroom", "grm_spine"]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("heart_tozgakmil")
            },
            showIf: [["stageroom", "grm_heart"]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("loopback_gakvu")
            },
            showIf: [["stageroom", "grm_entry"], ["PAGE!!e4prog", 13]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("final_gakvu")
            },
            showIf: [["stageroom", "grm_lesser"], ["PAGE!!e4prog", 15]],
            fromGroundsmindry: true
        },
    )
}

if(env.entities.bozko) if(!env.entities.bozko.actions.find(action => action.fromGroundsmindry)) {
    env.entities.bozko.actions.push(
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("dull_boz")
            },
            showIf: [["stageroom", "grm_dull_front"], ["PAGE!!e4prog", 4]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("lesser_bozko")
            },
            showIf: [["stageroom", "grm_lesser"], ["PAGE!!e4prog", 2]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("spine_boztoz")
            },
            showIf: [["stageroom", "grm_spine"]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("loopback_bozko")
            },
            showIf: [["stageroom", "grm_entry"], ["PAGE!!e4prog", 13]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("final_bozko")
            },
            showIf: [["stageroom", "grm_lesser"], ["PAGE!!e4prog", 15]],
            fromGroundsmindry: true
        },
    )
}

if(env.entities.miltza) if(!env.entities.miltza.actions.find(action => action.fromGroundsmindry)) {
    env.entities.miltza.actions.push(
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("lesser_miltza")
            },
            showIf: [["stageroom", "grm_lesser"], ["PAGE!!e4prog", 2]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("dull_milkar")
            },
            showIf: [["stageroom", "grm_dull_back"], ["PAGE!!e4prog", 4]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("spine_cavmil")
            },
            showIf: [["stageroom", "grm_spine"]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("heart_tozgakmil")
            },
            showIf: [["stageroom", "grm_heart"]],
            fromGroundsmindry: true
        },
    )
}

if(env.entities["akizetesche"]) if(!env.entities["akizetesche"].actions.find(action => action.fromGroundsmindry)) {
    env.entities["akizetesche"].actions.push(
        {
            name: "think",
            exec: ()=> {
                env.grm.startDialogue("loopback_akizet")
            },
            showIf: [["stageroom", "grm_entry"], ["PAGE!!e4prog", 13]],
            fromGroundsmindry: true
        },
        {
            name: "calls?",
            exec: ()=> {
                env.grm.startDialogue("final_akizet")
            },
            showIf: [["stageroom", "grm_lesser"], ["PAGE!!e4prog", 15]],
            fromGroundsmindry: true
        },
    )
}

//karik is brand new here!
//but we hide because they're basically just "mindcores" still, no point in a new entry
createEntity({
    name: 'karik',
    hide: true,
    type: "thoughtform qou obesk portrait-contain collapse",
    image: "/img/local/embassy/mindcore2portrait.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'karik, re-de-bodied';'velzie wills them to lack a body it seems'</span>`,
    alternateOf: "mindcores",
    actions: [
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("dull_milkar")
            },
            showIf: [["stageroom", "grm_dull_back"], ["PAGE!!e4prog", 4]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("spine_kartel")
            },
            showIf: [["stageroom", "grm_spine"]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("loopback_karik")
            },
            showIf: [["stageroom", "grm_entry"], ["PAGE!!e4prog", 13]],
            fromGroundsmindry: true
        },
    ]
})



createEntity({
    name: 'ik golem',
    type: "thoughtform qou obesk portrait-contain collapse",
    image: "/img/sprites/obesk/ikgol/portrait_awake.gif",
    pathLimit: "/local/ocean/embassy/golem",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'itzil and karik re-bodied as one';'a storm rages within'</span>
    <span style='color: var(--friend-color)'>::ADDITIONAL VISUAL CONTEXT</span>
    <span style='color: var(--obesk-color)'>+</span>'pressure chassis designed for deep ocean work'
    <span style='color: var(--obesk-color)'>+</span>'spherical appendages contain dull pulse excavation tools'`,
    actions: [
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("lesser_ik")
            },
            showIf: [["stageroom", "grm_lesser"], ["PAGE!!e4prog", 2]],
            fromGroundsmindry: true
        },
    ]
})

createEntity({
    name: 'idril',
    type: "thoughtform qou obesk portrait-contain collapse",
    image: "/img/sprites/obesk/idril/portrait.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection' 
    <span style='color: var(--friend-color)'>::RECONSTRUCTED SIGNATURE CONTEXT</span>
    <span style='color: var(--friend-color)'>+</span>'outer ${processDefinitionsInString("vaznian")} <span definition="INHERITED CONTEXT::'focused on expressive, simple shapes';'partial translation';'inherited description-generated noun'">personalism</span> influence'
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("jut")} receptors, outward'
    <span style='color: var(--friend-color)'>+</span>'symbolic of <span definition="INHERITED CONTEXT::'common technical descriptor';'reference to nature of dull engineer operations';'partial translation';'inherited description-generated noun'">split presence</span>'
    <span style='color: var(--friend-color)'>+</span>'<span definition="INHERITED CONTEXT::'in celebration of my forever waking dreams!'">self-designed signature</span>'`,
    actions: [
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("dull_cavidril")
            },
            showIf: [["stageroom", "grm_dull_back"], ["PAGE!!e4prog", 4]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("spine_gakdril")
            },
            showIf: [["stageroom", "grm_spine"]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("loopback_idril")
            },
            showIf: [["stageroom", "grm_entry"], ["PAGE!!e4prog", 13]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("final_idrilik")
            },
            showIf: [["stageroom", "grm_lesser"], ["PAGE!!e4prog", 15]],
            fromGroundsmindry: true
        },
    ]
})

createEntity({
    name: 'telyu',
    type: "thoughtform qou obesk portrait-contain collapse",
    image: "/img/sprites/obesk/telyu/portrait.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    <span style='color: var(--friend-color)'>::RECONSTRUCTED SIGNATURE CONTEXT</span>
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("vaznian")} surrealist influence'
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("vel")} receptors, curled, performer paint pattern'
    <span style='color: var(--friend-color)'>+</span>'<span definition="NOTE::INHERITED CONTEXT::'partial translation';'inherited description-generated noun'">cloaking skin</span> representation';'${processDefinitionsInString("tuvazu")} heritage tail'
    <span style='color: var(--friend-color)'>+</span>'<span definition="INHERITED CONTEXT::'carrying tradition into death';'for ancestors left behind'">self-designed signature</span>'`,
    actions: [
        {
            name: "greet",
            exec: ()=> {
                env.grm.startDialogue("entrance_tozik")
            },
            showIf: [["stageroom", "grm_entry"], ["PAGE!!e4prog", 1]],
            fromGroundsmindry: true
        },
        {
            name: "approach",
            exec: ()=> {
                env.grm.startDialogue("spine_kartel")
            },
            showIf: [["stageroom", "grm_spine"]],
            fromGroundsmindry: true
        },
    ]
})

/* prop and misc entities*/
createEntity({
    name: 'spire status',
    type: "thoughtform collapse portrait-dark",
    image: "/img/local/embassy/mind/map_structure_small.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'visual display utilizing luminescent corru swarms';'saying through intricate diagrams and warnings what we already know';'little time remains'</span>`
})

createEntity({
    name: 'map',
    type: "thoughtform collapse portrait-dark",
    image: "/img/local/embassy/mind/map_groundsmindry.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'unique scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'layout is five major chambers, including this one, surrounding the core';'connective halls lined with personnel and lesser operation chambers';'appears distorted around core'</span>`
})

createEntity({
    name: "adull's altar",
    type: "thoughtform collapse portrait-dark portrait-top",
    image: "/img/local/embassy/f2_dark.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'recreation of carnivorous stationary fauna';'hollow central structure captures organic material for sustenance';'fruit-bulb forms over time';'ekivik religious significance'</span>`
})

createEntity({
    name: "lesser mind status",
    type: "thoughtform collapse portrait-dark",
    image: "/img/local/embassy/mind/map_mind_small.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'unique scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'highlights requests for help and archival connectivity loss';'swarm projection stopped reorienting some time ago';'last reports of sudden immense strain across entire system'</span>`
})

createEntity({
    name: "support pod",
    type: "thoughtform collapse portrait-top portrait-blocker",
    image: "/img/local/embassy/mind/mindoorfadelocked.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'similar in composition to groundsmindry core';'for secondary groundsmind support in times of need';'permits direct connection to core, spire-wide archival spine connectivity, and archival knowledge pool';'a grave mistake'</span>`
})

createEntity({
    name: "silencing spire",
    type: "thoughtform collapse portrait-dark portrait-contain",
    image: "/img/local/embassy/mind/silencesphere.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'unique scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'purported to project a thin denial structure into the dull plane';'specifics of technology beyond my understanding'</span>`
})

createEntity({
    name: "dullima pod",
    type: "thoughtform collapse portrait-dark portrait-contain",
    image: "/img/local/embassy/mind/observationpod.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'connects to entwined maintenance drone within dull plane';'suspends physical senses in favor of approximations to dull perception'</span>`
})

createEntity({
    name: "spinal tether",
    type: "thoughtform collapse portrait-dark portrait-contain",
    image: "/img/local/embassy/mind/spineterminal.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'unique scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'direct lift to base of archival system overhead';'used in delivery of heavy materials and knowledge';'potential escape route if not for widespread archival system collapse'</span>`
})

createEntity({
    name: "malvi's body",
    alternateOf: "possessed archivist",
    type: "thoughtform collapse portrait-dark",
    image: "/img/sprites/combat/foes/archivistportrait.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'unique scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'the esteemed archivist, malvi';'was still living, yet twisted against us--how?';'no recognizable internal components'</span>`,
    actions: [
        {
            name: "examine",
            exec: ()=>startDialogue("spine_malvi"),
        },
    ]
})

createEntity({
    name: "knowledge pool",
    type: "thoughtform collapse portrait-blocker",
    image: "/img/local/embassy/mind/sludgecystlayer.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'unique scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'spinal roots provide direct system connection';'manage reservoir of rich archival sludge and countless groundsmindry-connected cysts';'likely extends beneath entire segment';'also likely being rapidly consumed by ceremony'</span>`
})

createEntity({
    name: "heart terminal",
    type: "thoughtform collapse portrait-dark",
    image: "/img/local/embassy/mind/map_heart_small.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'unique scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'broad view of major corroyi and spireblood resource veins, with associated lesser hearts';'downward pressure becoming major issue';'implies other specialized terminals and connection points should be visible in room';'where are they?'</span>`
})

createEntity({
    name: "priority branch",
    type: "thoughtform collapse portrait-dark portrait-top portrait-auto",
    image: "/img/local/embassy/mind/littleshelf.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'unique scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'exact purpose unknown to me';'for us, merely a stand to place explosives';'likely holds cysts in queue for addition to knowledge pool'</span>`
})

/* combat entities */
createEntity({
    hide: true,
    name: "spectral moron",
    type: "thoughtform collapse portrait-spectral portrait-cover",
    image: "/img/viendbot.png",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: blue'>'a terrible deceiver';'constantly makes estimates';'goes over them without fail'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "spectral mass",
    type: "thoughtform collapse portrait-spectral portrait-topish portrait-auto",
    image: "/img/sprites/combat/foes/formless-eyes_12.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'entity pressing through the overlap';'an unformed limb of the ceremony';'bears no eyes, yet i feel them upon me';'strikes clumsily, without focus'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'highly limited visual profile';'reconstruction incomplete'">::INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "spectral figure",
    type: "thoughtform collapse portrait-spectral portrait-topish portrait-auto",
    image: "/img/sprites/combat/foes/shaped_1.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'entity pressing through the overlap';'a distantly familiar shape';'throws the punches of a skilled fighter'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "spectral shape",
    type: "thoughtform collapse portrait-spectral portrait-topish portrait-auto",
    image: "/img/sprites/combat/foes/shaped_2.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'entity pressing through the overlap';'a distantly familiar shape';'somehow sunders the overlap to create terrible detonations'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "spectral attendant",
    type: "thoughtform collapse portrait-spectral portrait-topish portrait-auto",
    image: "/img/sprites/combat/foes/attendant_spectral.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'entity pressing through the overlap';'the unsteady shape of an attendant';'strikes by vision alone with a flickering limb'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "spectral jutskin",
    type: "thoughtform collapse portrait-spectral portrait-topish portrait-auto",
    image: "/img/sprites/combat/foes/jutskin_spectral.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'entity pressing through the overlap';'the writhing shape of an attendant';'restores gaps in the torn light of its fellow imitations'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "heart parasite",
    type: "thoughtform collapse portrait-spectral portrait-bottom portrait-auto",
    image: "/img/sprites/combat/foes/heart_freak.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'corru drawn up into the overlap, accumulated over an invisible shape';'draws from all vital sources with its ${processDefinitionsInString("akozak")}-like limbs'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'highly limited visual profile';'reconstruction incomplete'">::INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "parasitic limb",
    type: "thoughtform collapse portrait-spectral portrait-topish portrait-auto",
    image: "/img/sprites/combat/foes/splittendril_attacker_dangle_spaced.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'${processDefinitionsInString("akozak")}-like limb';'even mimics its behavior, drawing us close that it may bite'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'highly limited visual profile';'reconstruction incomplete'">::INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "parasitic siphon",
    type: "thoughtform collapse portrait-spectral portrait-top portrait-auto",
    image: "/img/sprites/combat/foes/splittendril_attacker.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'${processDefinitionsInString("akozak")}-like limb';'dutifully tears from all we have built'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'highly limited visual profile';'reconstruction incomplete'">::INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "spectral golem",
    hide: true, // no longer obtainable, doing this to make it disappear
    type: "thoughtform collapse portrait-spectral portrait-topish portrait-auto",
    image: "/img/sprites/combat/foes/golem_spectral.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'entity pressing through the overlap';'an impression of a general purpose golem';'its long limbs are effective in distant attack'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "spectral glazika",
    type: "thoughtform collapse portrait-spectral portrait-topish portrait-auto",
    image: "/img/sprites/combat/foes/glazika_spectral.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'entity pressing through the overlap';'like a simple glazika at first';'but it directs limbs beyond or beneath our perception'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "possessed archivist",
    type: "thoughtform collapse portrait-spectral portrait-top portrait-auto",
    image: "/img/sprites/combat/foes/archivistportrait.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'the esteemed archivist, malvi';'still living, yet twisted against us--how?'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "spectral archival golem",
    type: "thoughtform collapse portrait-spectral portrait-topish portrait-auto",
    image: "/img/sprites/combat/foes/archivalgolem_spectral.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'entity pressing through the overlap';'projects the imposing shape of an archival golem';'relentlessly pursues a target with single mind'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "spectral eye",
    type: "thoughtform collapse portrait-spectral portrait-center portrait-auto",
    image: "/img/sprites/combat/foes/kazeye_dull_tiny.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'entity pressing through the overlap';'the attention of the ceremony made manifest upon ${processDefinitionsInString("velzie's stage")}';'forcibly reduces the size of the overlap to consume all'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "possessed miltza",
    type: "thoughtform collapse portrait-spectral portrait-topish portrait-auto",
    image: "/img/sprites/obesk/miltza/gridtiny_warp.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'miltza...';'i still wonder if she found what she spent her ${processDefinitionsInString("θdeath")} hoping for'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "reanimated golem",
    type: "thoughtform collapse portrait-spectral portrait-topish portrait-auto",
    image: "/img/sprites/combat/foes/ikgolem_spectral.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'our ${processDefinitionsInString("golem")}, its cleaved halves writhing with the ${processDefinitionsInString("ceremony's")} interference';'reanimated to destroy us';'receptors imply it takes joy in its attempts';'utilizes enormous strength and volatile dull light'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "spectral kiv",
    type: "thoughtform collapse portrait-spectral portrait-topish portrait-auto",
    image: "/img/sprites/combat/foes/kivii/spectral.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'entity pressing through the overlap';'the all too familiar shape of dozkallvi as she appeared to us';'forms large limbs to disrupt and attack'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "spectral qou",
    type: "thoughtform collapse portrait-spectral portrait-topish portrait-auto",
    image: "/img/sprites/combat/foes/itzka_spectral.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'some terrible amalgamation stemming from the festering corpses of dozkallvi and our golem';'seems to laugh as ${processDefinitionsInString("velzie's stage")} closes around us'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "vivid vel",
    type: "thoughtform collapse portrait-spectral portrait-top portrait-auto",
    image: "/img/sprites/combat/foes/spectral_vel.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'the clear image of a vel qou';'their claws and stance feel familiar';'relentlessly pursues a single target with incredible speed'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "vivid jut",
    type: "thoughtform collapse portrait-spectral portrait-top portrait-auto",
    image: "/img/sprites/combat/foes/spectral_jut.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'the clear image of a jut qou';'seems to channel ceremonial resources to mend allies merely with their keen eye';'sunders the overlap explosively'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "vivid kiv",
    type: "thoughtform collapse portrait-spectral portrait-top portrait-auto",
    image: "/img/sprites/combat/foes/spectral_kiv.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'the clear image of a kiv qou';'defends the vein with their... life?';'i suppose it is no longer ${processDefinitionsInString("θdeath")}';'a silent determination burns in their gaze'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "vivid archivist",
    type: "thoughtform collapse portrait-spectral portrait-top portrait-auto",
    image: "/img/sprites/combat/foes/archivist1_spectral.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'the clear image of our once esteemed archivist, malvi';'flickers about and draws ceremonial mass into the overlap';'forms into golems to delay us';'something about their incoherent shouting...';'it is as if they are present, aware, knowing they cannot fix this - why do they still fight?'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "ceremony",
    type: "thoughtform collapse portrait-spectral portrait-contain",
    image: "/img/local/embassy/mind/corewarp.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'apparently a normally innocuous procedure';'now made to be a parasite';'feasts upon the embassy's flesh and minds to bloom into horrific destruction'</span>`,
})

createEntity({
    name: "ceremony vein",
    type: "thoughtform collapse portrait-bright portrait-contain",
    image: "/img/local/embassy/mind/ceremonyveintop.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'corrucystic organs and critical structures of the ${processDefinitionsInString("ceremony")}';'made physical by the recession of the overlap'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "ceremony tendril",
    type: "thoughtform collapse portrait-spectral portrait-auto",
    image: "/img/sprites/combat/foes/splittendril.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'enormous limbs, partially intersecting with ${processDefinitionsInString("velzie's stage")}';'feasts upon the embassy's flesh and minds to bloom into horrific destruction'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: "vekoa",
    type: "thoughtform collapse portrait-spectral portrait-top portrait-auto",
    image: "/img/sprites/vekoa/vekoaspec.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'vekoa, the groundsmind';'the parasite's first and most critical victim';'her image, her body, wielded against us';'without sense?'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

createEntity({ // this is only here to remove an old instance
    name: "spectral dull golem",
    hide: true,
    type: "thoughtform collapse portrait-spectral portrait-topish portrait-auto",
    image: "/img/sprites/combat/foes/itzka_spectral.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'some terrible amalgamation stemming from the festering corpses of dozkallvi and our golem';'seems to laugh as ${processDefinitionsInString("velzie's stage")} closes around us'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

createEntity({ // this is only here to remove an old instance
    name: "spectral horror",
    hide: true,
    type: "thoughtform collapse portrait-spectral portrait-topish portrait-auto",
    image: "/img/sprites/combat/foes/itzka_spectral.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'some terrible amalgamation stemming from the festering corpses of dozkallvi and our golem';'seems to laugh as ${processDefinitionsInString("velzie's stage")} closes around us'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

createEntity({ // this is only here to remove an old instance
    name: "spectral glazika",
    hide: true,
    type: "thoughtform collapse portrait-spectral portrait-topish portrait-auto",
    image: "/img/sprites/combat/foes/itzka_spectral.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'some terrible amalgamation stemming from the festering corpses of dozkallvi and our golem';'seems to laugh as ${processDefinitionsInString("velzie's stage")} closes around us'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'limited visual profile';'utilizing best reconstruction'">::MINOR INCOHERENCE DETECTED</span>`,
})

/* e4a1 stuff */
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
                cutscene(true)
                chatter({actor: 'bstrd', text: "huh HEY !!! HEY!!! WTF!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", readout: true, delay: 1000})
                chatter({actor: 'bstrd', text: "!!!!!! !!!!!!!! !!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!!! !!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", readout: true, delay: 3000})
                chatter({actor: 'bstrd', text: "U cantot in BE IN HERE!!!!!! !!!", readout: true, delay: 6000})
                chatter({actor: 'bstrd', text: "FUUU*K ITS NOT REUDY", readout: true, delay: 10000})
                chatter({actor: 'bstrd', text: "u didnt see anything >%^{", readout: true, delay: 12000})
                change("groundstrd", true)
                setTimeout(()=>{
                    cutscene(false)
                    env.stage.querySelectorAll(`.bstrd`).forEach(pEl=>{
                        pEl.style.setProperty('--dyp-transform', 'translateY(0)')
                        pEl.classList.add('scatterquickruuun')
                        setTimeout(() => {
                            pEl.style.animation = `SCRAM 0.5s linear`
                        }, 400)
                        setTimeout(() => {
                            pEl.classList.add('scrammed')
                        }, 2000)
                    })
                }, 9000)
            }
        },
    ]
})


createEntity({
    name: 'continue',
    type: "system-component",
    hide: true,
    image: "/img/textures/target.png",
    text: `::SYSTEM COMPONENT
    ::UTILIZE TO CONTROL MEMORY STREAM`,
    actions: [ 
        { // uses the page-stored fight
            name: "retry combat",
            exec: ()=>{
                env.lastScenario.retry()
            }
        },
    ]
})