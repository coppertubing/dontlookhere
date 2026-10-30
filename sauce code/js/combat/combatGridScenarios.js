/* scenario definitions outside of the class */
CombatScene.SCENARIOS['sandbox'] = {
    initEnemyTeam: ()=> [
        "sandboxer",
    ], // array of enemy actors returned by function
    initAllyTeam: ()=> page.party.filter(m=>["cavik", "miltza", "akizet"].includes(m.slug)), 

    bgm: () => new Howl({
        onload: function () {page.howls.push(this)},
        src: ['/audio/beneath_friendly.ogg'],
        preload: true,
        loop: true,
        volume: 1,
        sprite: {
            __default: [5, 169328, true]
        }
    }),
    bgmStart: 20,
    bgmRate: 0.4,
    combatClass: "ep4scene",
    teamAlterations: {
        ally: [["ADD", "win"], ["ADD", "tele_directbeam"]],
        //cavik: [["REMOVE", "scene_cavik_attack"], ["ADDLEFT", "scene_cavik_attack_desperation"], ["ADD", "bomb_plant"], ["ADD", "special_bomb_detonate"]],
    },
    startCallback: ()=> {
        const spawnMenu = document.createElement('div')
        spawnMenu.classList.add('spawnmenu');
        spawnMenu.innerHTML = `<style>
            .spawnmenu {
                position: absolute;
                bottom: 0;
                right: 0;
                display: flex;
                flex-direction: column;
                z-index: 1000;
            }

            .spawnmenu span {
                color: black;
            }

            .spawnmenu button {
                font-size: 12px;
            }
        </style>
        <span>SPAWNMENU</span>`;

        [
            "arch_dummy",
            "arch_formless",
            "arch_bomber",
            "arch_puncher",
            "arch_harasser",
            "arch_channeler",
            "arch_sniper",
            "arch_charger",
            "arch_puller",
            "arch_support",
            "arch_formless_enraged",
            "vekoa_golem",
            "spine_keeper_ing",
            "destructible_adull",
            "destructible_volatile"
        ].forEach(actor => spawnMenu.innerHTML += `<button for="${actor}">${actor}</button>`)

        spawnMenu.querySelectorAll('button').forEach(el=>{
            el.addEventListener('click', () => midCombatActorAdd(env.rpg.enemyTeam, el.getAttribute('for')))
        })

        env.rpg.appendChild(spawnMenu);
                
        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 99
        })
    },
    endCallback: (loser)=> console.log("ending", loser),
    turnCallback: (actor)=> env.grm.lootboxCheck(["arch_formless", "arch_harasser"]),
    actorSpriteProcess: (actor)=> console.log("sprite", actor),

    //SCENARIO STAGE INFO
    width: 11,
    plan: `
        .....S.....
        11111111111
        !!!!!!!!!!!
        !♠♠♠♠♠♠♠♠♠!
        !♠♠░░♠░░♠♠!
        !░░░░░░░░░!
        !░░░░c░░░░!
        ░♠♠░░░░░♠░░
        ░♠░░░♠░░♠♠░
        ░░░░░░░░░░░
        ░░░░░░░░░░░
        ░░♥♥♥♥♥♥♥░░
    `,
    entities: {
        "♥": { spawnPoint: "ally" },
        "♠": { spawnPoint: "enemy" },
        "S": { spawnPoint: "sandboxer" },
        "c": {class: "center basic"},
        "1": {
            class: "blocks los",
            contains: {
                html: "<div class='proptest'>da testing zone</div>"
            }
        },

        "!": {
            class: 'damagetile'
        },

        "^": { class: "basic upface upshoot"},
        "v": { class: "basic downface downshoot"},
        ">": { class: "basic rightface rightshoot"},
        "<": { class: "basic leftface leftshoot"},
    }
}

CombatScene.SCENARIOS['ep4_intro_1'] = {
    initEnemyTeam: ()=> [
        "arch_formless",
        "arch_formless",
        "arch_formless",
        "arch_puncher",
        "arch_support",
    ], // array of enemy actors returned by function
    initAllyTeam: ()=> page.party.filter(m=>["akizet", "bozko", "ikgolem"].includes(m.slug)), 

    bgm: () => {
        if(!page.solaCombat) page.solaCombat = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/solacombat.ogg'],
            preload: true,
            loop: true,
            volume: 1,
            rate: 0.9,
            sprite: {
                __default: [5, 107920, true]
            }
        })
        return page.solaCombat
    },
    bgmRate: 0.5,
    bgmStart: 62,
    combatClass: "ep4scene introscene",
    startCallback: ()=> {
        if(!page.retryingP1 && page.name == "pale-halls") env.rpg.classList.add("fpv", "hideteams");
        env.rpg.grid.style.setProperty("--playercontrol-rotation-raw", 0);env.rpg.grid.style.setProperty("--playercontrol-tilt-raw", 45)

        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 99
        })
    },
    turnCallback: (actor)=> {
        if(env?.rpg?.turnData?.turn) {
            env.grm.lootboxCheck(["arch_puncher"])
        }
    },

    manualStop: true,
    manualStopCallback: (loser)=> {
        if(loser.name == "enemy") {
            startDialogue("lesser_attack2")
        }
        else env.grm.startRetryOffer()
    },
    retry: () => env.grm.defaultRetry(() => page.retryingP1 = true),
    nogame: () => { startDialogue("combatadjust", {specificChain: "nogame"}) }, //used only in bugout protection
    
    teamAlterations: {
        ally: [["ADD", "win"]]
    },

    //SCENARIO STAGE INFO
    width: 9,
    plan: `
        eee1^1eee
        e░░111░░e
        e░░♠!♠░░e
        e░♠░♠░♠░e
        11░░!░░11
        ^1░░c░░1^
        11░░!░░11
        e░♥░A░♥░e
        e░░░!░░░e
        e░░111░░e
        eee1^1eee
    `,
    entities: {
        "1": {
            class: "blocks los notile",
        },

        "^": {
            class: "blocks los prop notile",
            contains: {
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

        "♥": { spawnPoint: "ally" },
        "♠": { spawnPoint: "enemy" },
        "A": { spawnPoint: "akizet" },
        'c': {
            class: "basic center", 
        },
        "e": { class: "basic notile damagetile" },
        "!": { class: "basic warppoint" }
    }
}

CombatScene.SCENARIOS['ep4_intro_2'] = {
    initEnemyTeam: ()=> [
        "arch_bomber",
        "arch_harasser",
        "arch_bomber",
    ], // array of enemy actors returned by function
    initAllyTeam: ()=> page.party.filter(m=>["gakvu", "miltza", "cavik"].includes(m.slug)),

    bgm: () => {
        if(!page.solaCombat) page.solaCombat = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/solacombat.ogg'],
            preload: true,
            loop: true,
            volume: 1,
            rate: 0.8,
            sprite: {
                __default: [5, 107920, true]
            }
        })
        return page.solaCombat
    },
    bgmRate: 0.7,
    combatClass: "ep4scene introscene",
    startCallback: ()=> {
        env.rpg.grid.style.setProperty("--playercontrol-rotation-raw", 45);env.rpg.grid.style.setProperty("--playercontrol-tilt-raw", 45)

        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 99
        })
    },
    turnCallback: (actor)=> env.grm.lootboxCheck(["arch_channeler"]),

    hardOpen: true,
    manualStop: true,
    manualStopCallback: (loser)=> {
        if(loser.name == "enemy") startDialogue("lesser_attack3")
        else env.grm.startRetryOffer()
    },
    retry: () => env.grm.defaultRetry(),
    nogame: () => { startDialogue("lesser_attack2", {specificChain: "nogame"}) }, //used only in bugout protection
    
    teamAlterations: {
        ally: [["ADD", "win"]]
    },

    //SCENARIO STAGE INFO
    width: 11,
    plan: `
        eeee1^1eeee
        e░░░111░░░e
        e░░♠░♠░♠░░e
        e░░░░░░░░░e
        11░.....░11
        ^1R..c..R1^
        11░.....░11
        e░░░░░░░░░e
        e░░♥░♥░♥░░e
        e░░░111░░░e
        eeee1^1eeee
    `,
    entities: {
        "1": {
            class: "blocks los notile",
        },

        "R": { spawnPoint: "rift_item" },

        "^": {
            class: "blocks los prop notile",
            contains: {
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

        "♥": { spawnPoint: "ally" },
        "♠": { spawnPoint: "enemy" },
        "O": { 
            contains: {
                actor: "destructible_table"
            }
        },
        'c': {slug: 'c', class: "blocks nevertile center"},
        "e": { class: "basic notile damagetile" },
    }
}

CombatScene.SCENARIOS['ep4_intro_3'] = {
    initEnemyTeam: ()=> [ 
        // what if it's just a big circular encroaching of formless
        // and as more are wiped, more actual enemies show up
        "vekoa_boss",
        "arch_bomber",
        "arch_bomber",
        "arch_puncher",
        "arch_puncher",
        "arch_sniper",
        "arch_sniper",
        "arch_support",
    ], // array of enemy actors returned by function
    initAllyTeam: ()=> page.party.filter(m=>!["tozik"].includes(m.slug)), 

    bgm: () => {
        if(!page.solaCombat) page.solaCombat = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/solacombat.ogg'],
            preload: true,
            loop: true,
            volume: 1,
            rate: 1,
            sprite: {
                __default: [5, 107920, true]
            }
        })
        return page.solaCombat
    },
    bgmRate: 1,
    combatClass: "ep4scene introscene",
    hardOpen: true,

    startCallback: ()=> {
        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 99
        })

        env.rpg.actorList.forEach(a => a.base.slug == "arch_formless" ? a.hp = 3 : false)
        updateStats()

        setTimeout(()=>{env.rpg.setGridProperty("--playercontrol-rotation", `-45deg`);env.rpg.setGridProperty("--playercontrol-tilt", `-30deg`)}, 25)
    },
    turnCallback: (actor)=> {
        /* long enough as it is
        if(env.rpg.turnData.turn >= 20 && env.rpg.enemyTeam.members.length < 4 && !env.rpg.spawnedBackup) {
            midCombatActorAdd(env.rpg.enemyTeam, "arch_puncher", "right")
            midCombatActorAdd(env.rpg.enemyTeam, "arch_support", "right")
            midCombatActorAdd(env.rpg.enemyTeam, "arch_bomber", "right")
            env.rpg.spawnedBackup = true
        } 
        */ 
    },

    endCallback: (loser)=> {
        if(loser.name == "ally") env.grm.startRetryOffer()
    },
    retry: () => env.grm.defaultRetry(),
    nogame: () => { startDialogue("lesser_attack3", {specificChain: "nogame"}) }, //used only in bugout protection
    
    teamAlterations: {
        ally: [["ADD", "win"]]
    },

    //SCENARIO STAGE INFO
    width: 13,
    plan: `
        ......d......
        111eeeeeee111
        1^19░░○6░91^1
        111░░8░8░░111
        e9░░░░░░░░░9e
        e7░░░░░░░░░7e
        111░░░░░░░111
        1^1░░░c░░░1^1
        111░░░░░░░111
        e░░░♥░♥░♥░░░e
        e░░░░♥♥♥░░░░e
        e░░░░111░░░░e
        e░░░░1^1░░░░e
        eeeee111eeeee
    `,
    entities: {
        "1": { class: "blocks los notile" },
 
        "♥": { spawnPoint: "ally" },
        "♠": { spawnPoint: "enemy" },

        'c': {
            class: "basic center", 
            contains: {
                actor: "destructible_table"
            }
        },

        "^": {
            class: "blocks los prop notile",
            contains: {
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
        "○": { spawnPoint: "vekoa_boss" },
        "9": { spawnPoint: "arch_sniper" },
        "8": { spawnPoint: "arch_puncher" },
        "7": { spawnPoint: "arch_bomber" },
        "6": { spawnPoint: "arch_support" },
        "e": { class: "basic notile damagetile" },
        "d": { 
            class: "notile blocks bigdoortainer",
            contains: {
                dyp: {
                    class: "bigdoor",
                    width: 4.5,
                    height: 4.5,
                    image: "url(/img/local/embassy/mind/bigdoor.gif)",
                    noback: true,
                }
            } 
        },
    }
}

CombatScene.SCENARIOS['ep4_intro_cinematic'] = {
    initEnemyTeam: ()=> [
        "vekoa_boss",
        "arch_formless",
    ], // array of enemy actors returned by function
    initAllyTeam: ()=> [ /* ditto, should usually be page.party */                 
        {
            slug: "akizet",
            name: "Akizet",
            combatActor: "akizet",
            hp: 15,
        },

        {
            slug: "gakvu",
            name: "Gakvu",
            combatActor: "gakvu",
            hp: 10,
        },

        {
            slug: "miltza",
            name: "Miltza",
            hp: 10,
            combatActor: "miltza"
        },

        {
            slug: "cavik",
            name: "Cavik",
            hp: 10,
            combatActor: "cavik"
        },

        {
            slug: "bozko",
            name: "Bozko",
            hp: 25,
            combatActor: "bozko"
        },

        {
            slug: "ikgolem",
            name: "IK Golem",
            hp: 20,
            combatActor: "ikgolem"
        },
    ], 

    bgm: () => new Howl({
        onload: function () {page.howls.push(this)},
        src: ['/audio/daemon_midboss.ogg'],
        preload: true,
        loop: true,
        volume: 1,
        rate: 0.4,
        sprite: {
            __default: [5, 189990, true]
        }
    }),
    bgmStart: 20,
    bgmRate: 0.4,
    combatClass: "ep4scene",
    hardOpen: true,
    startCallback: ()=> console.log("starting"),
    endCallback: (loser)=> console.log("ending", loser),
    turnCallback: (actor)=> console.log("turn", actor),
    actorSpriteProcess: (actor)=> console.log("sprite", actor),

    //SCENARIO STAGE INFO
    width: 13,
    plan: `
        ......d......
        111eeeeeee111
        1^1♠♠♠○♠♠♠1^1
        111♠♠♠♠♠♠♠111
        e░░░░░░░░░░░e
        e░░░░░░░░░░░e
        111░░♥░♥░░111
        1^1░♥░c░♥░1^1
        111░░♥░♥░░111
        e♠░░░░░░░░░♠e
        e♠░░░░░░░░░♠e
        e░░♠♠111♠♠░░e
        e░░♠♠1^1♠♠░░e
        eeeee111eeeee
    `,
    entities: {
        "1": {
            class: "blocks los",
            contains: {
                html: "<div class='proptest'>LOS</div>"
            }
        },
 
        "♥": { spawnPoint: "ally" },
        "♠": { spawnPoint: "enemy" },
        "R": { spawnPoint: "rift_item" },

        'c': {
            class: "basic center", 
            contains: {
                actor: "destructible_table"
            }
        },

        "^": {
            class: "blocks los notile",
            contains: {
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
        "○": { spawnPoint: "vekoa_boss" },
        "e": { class: "basic notile damagetile" },
        "d": { 
            class: "notile blocks",
            contains: {
                dyp: {
                    width: 4.5,
                    height: 4.5,
                    image: "url(/img/local/embassy/mind/bigdoor.gif)",
                    noback: true,
                }
            } 
        },
    }
}

CombatScene.SCENARIOS['ep4_spine'] = {
    initEnemyTeam: ()=> [
        "spine_archivist",
    ], 
    initAllyTeam: ()=> page.party.filter(m=>!["ikgolem"].includes(m.slug)), 

    bgm: () => {
        if(!page.solaRisen) page.solaRisen = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/solarisen.ogg'],
            preload: true,
            loop: true,
            volume: 1,
            sprite: {
                __default: [5, 145600, true]
        }})

        return page.solaRisen
    },
    bgmRate: 0.3,
    combatClass: "ep4scene spinelift",
    startCallback: ()=> {
        flash(true);setTimeout(()=>{startDialogue("archivist");flash(false)}, 1000)
        
        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 99
        })

        env.rpg.spawnGolems = () => {
            ratween(env.bgm, 1)
            env.bgm.intendedRate = 1

            midCombatActorAdd(env.rpg.enemyTeam, "spine_keeper", "left")
            midCombatActorAdd(env.rpg.enemyTeam, "spine_keeper", "left")
            midCombatActorAdd(env.rpg.enemyTeam, "spine_keeper", "left")
            midCombatActorAdd(env.rpg.enemyTeam, "spine_keeper", "left")

            play("dull")
        }
        
        //cutscene functions
        env.rpg.archivistCutscene = (step) => { 
            let archivist = env.rpg.actors.spine_archivist    
            switch(step) {
                case 1:
                    archivist.piece.focusOnTile()
                break

                case 2:
                    env.bgm.intendedRate = 1.1
                    ratween(env.bgm, 1.1)
                    env.rpg.classList.add("megawarp")
                    
                    removeStatus(archivist, "shroud", {forceRemoveStatus: true})
                    removeStatus(archivist, "archivist_split_focus", {forceRemoveStatus: true})
                    addStatus({target: archivist, status: "kb_immune", noReact: true, runEvents: false})

                    //move everyone to safe zone
                    let possibleTiles = env.rpg.grid.tilesByType.safetile.filter(tile=>!tile.piece && !tile.classList.contains("damagetile") && !tile.blocking).concat(env.rpg.grid.tilesByType.centermatrix.filter(tile=>!tile.piece))
                    env.rpg.allyTeam.members.forEach(m=>{
                        if(m.piece) {
                            dest = possibleTiles.sample({remove: true})
                            m.piece.animateToTile(dest, {animation: "tossed", duration: 1000})
                        }
                    })
                    
                    archivist.sprite.classList.add("archivist-mega")
                    archivist.sprite.querySelector('img').src = "/img/sprites/combat/foes/archivist2.gif"
                    env.rpg.grid.tilesByType.untargetable.forEach(tile=>tile.classList.remove("untargetable"))
                    env.rpg.grid.tilesByType.los.forEach(tile=>tile.classList.remove("hardblock", "blocks", "los", "notile"))
                    env.rpg.grid.tilesByType.falloff.forEach(tile=>{
                        tile.classList.remove("basic", "falloff")
                        tile.classList.add("blocks", "notile")
                        tile.makeNevertile()                        
                    })

                    env.rpg.grid.tilesByType.falloffintodamage.forEach(tile=>{
                        tile.classList.add("notile", "damagetile")
                    })

                    env.rpg.grid.tilesByType['spineholder'][0].querySelector('.dyp').remove()
                    env.rpg.grid.tilesByType['spineholder'][0].classList.remove("notile")
                    
                    env.rpg.grid.createTileEffect({
                        tiles: env.rpg.grid.tilesByType.falloffintodamage, 
                        effect: "scene_edge",
                        length: 99
                    })
                    
                    env.rpg.grid.tilesByType.damagetile.forEach(tile=>tile.effects.forEach(effect=>tile.removeFromEffect(effect.host)))
                    vfx({type: "flash", state: false, delay: 1000})
                break

                case 3:
                    
                break
            }
        }


    },

    endCallback: (loser)=> {
        if(loser.name == "ally") env.grm.startRetryOffer();
        else page.name == "pale-halls" ? startDialogue("spine_clear") : false // account for loss
    },
    
    retry: () => env.grm.defaultRetry(),
    nogame: () => { startDialogue(env.rpg.p2 ? "archivist2" : "archivist", {specificChain: "nogame"}) }, //used only in bugout protection
    
    turnCallback: (actor)=> {
        if(env.rpg.actors?.spine_archivist?.state == "lastStand" && !env.rpg.p2) {
            env.rpg.halt = true

            let archivist = env.rpg.actors.spine_archivist
            env.rpg.p2 = true            
            env.rpg.enemyTeam.members.filter(enemy=>enemy.slug != archivist.slug).forEach(m=>midCombatActorRemove(m))
            env.rpg.classList.add('hideteams')

            archivist.maxhp = 60
            archivist.hp = archivist.maxhp
            archivist.lastStand = false
            archivist.state = "living"
            archivist.box.classList.remove("last-stand")

            
            archivist.actions = archivist.lastStandActions
            archivist.move = 5
            updateStats(archivist)

            //doubleturn
            env.rpg.turnOrder = env.rpg.allyTeam.members.concat(env.rpg.enemyTeam.members[0], env.rpg.enemyTeam.members[0])
            env.rpg.currentActorIndex = 5

            startDialogue('archivist2')
        } else if(!env.rpg.p2) {
            env.grm.lootboxCheck(["spine_keeper"])
        }
    },
    actorSpriteProcess: (actor)=> console.log("sprite", actor),
    
    teamAlterations: {
        ally: [["ADD", "win"]]
    },

    //SCENARIO STAGE INFO
    width: 19,
    plan: `
        ........eee........
        ........fnf........
        ........fff........
        ........fff........
        ........FFF........
        ...C.,,,░░░,,,.C...
        .....,,░░░░░,,.....
        .....,F░░░░░F,.....
        efffF░░░111░░░Ffffe
        enffF░░░1♠1░░░Fffne
        efffF░░░111░░░Ffffe
        .....,F░░░░░F,.....
        .....,,♥░♥░♥,,.....
        ...C....♥♥♥....C...
        ........FFF........
        ........fff........
        ........fff........
        ........fnf........
        ........eee........
    `,
    entities: {
        "1": {
            class: "blocks los notile centermatrix",
        },

        "░": {class: "safetile"}, // regular ground tile

        "e": { class: "basic notile damagetile unsafe falloff" }, 
        "♥": { spawnPoint: "ally" },
        "♠": { 
            spawnPoint: "spine_archivist", 
            class: "center centermatrix spineholder notile untargetable",
            contains: {
                class: "spinecolumn",
                dyp: {
                    image: 'url(/img/local/embassy/mind/spinering.gif)',
                    width: 6,
                    height: 6,
                    noback: true,
                    style: "background-size: 100% 100%;bottom: unset;"
                }
            }
        },

        "C": {
            class: "notile hidelow untargetable blocks",
            contains: {
                html: "<div class='spinepool-actor warp'></div>",
                dyp: {
                    image: 'transparent',
                    width: 3,
                    height: 3,
                    style: "transform: translateZ(-1px);bottom: unset;pointer-events: none;"
                }
            }
        },


        "n": { spawnPoint: "enemy", class: "basic falloff" },
        "!": { class: "basic summonpoint" },
        "f": { class: "basic falloff" },
        "F": { class: "basic falloffintodamage" }
    }
}

CombatScene.SCENARIOS['ep4_heart'] = {
    initEnemyTeam: ()=> [
        "arch_charger",
        "arch_harasser",
        "arch_harasser",
        "arch_support",
    ], // array of enemy actors returned by function

    initAllyTeam: ()=> page.party.filter(m=>!["ikgolem"].includes(m.slug)),

    bgm: () => {
        if(!page.saiikoCombat) page.saiikoCombat = new Howl({
            onload: function () {
                page.howls.push(this)
                this.intendedVol = 0.8
            },
            src: ['/audio/saiikocombat.ogg'],
            preload: true,
            loop: true,
            volume: 0.8,
            rate: 0.9,
            sprite: {
                __default: [5, 174500, true]
            }
        })
        return page.saiikoCombat
    },
    bgmVol: 0.8,
    bgmRate: 0.9,
    combatClass: "ep4scene",
    
    teamAlterations: {
        ally: [["ADD", "win"]]
    },

    startCallback: ()=> {
        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 99,
        })
    },

    manualStop: true,
    manualStopCallback: (loser)=> {
        console.log("manualstop called")
        if(loser.name == "enemy") {
            
            flash(true)
            //phase 2: split the team, spawn wall
            if(!env.rpg.p2) setTimeout(()=> {
                env.rpg.p2 = true
                env.rpg.grid.tileEffects.forEach(e => {
                    if(e.slug != "scene_edge") {
                        env.rpg.grid.deleteTileEffect(e)
                    }
                }) 

                env.rpg.actorList.forEach(m=> m.originalSlug == "destructible_box" ? midCombatActorRemove(m, {fast: true}) : false)

                combatRevive(env.rpg.actors.akizet)
                combatRevive(env.rpg.actors.cavik)
                combatRevive(env.rpg.actors.tozik)
                combatRevive(env.rpg.actors.gakvu)
                combatRevive(env.rpg.actors.bozko)
                combatRevive(env.rpg.actors.miltza)

                setTimeout(()=>{
                    env.rpg.allyTeam.members.forEach(m=>{
                        if(m.piece) switch(m.slug) {
                            case "akizet": m.piece.moveToCoords(6, 2, {follow: false}); break;
                            case "bozko": m.piece.moveToCoords(5, 2, {follow: false}); break;
                            case "gakvu": m.piece.moveToCoords(4, 2, {follow: false}); break;
                            case "cavik": m.piece.moveToCoords(4, 8, {follow: false}); break;
                            case "tozik": m.piece.moveToCoords(5, 8, {follow: false}); break;
                            case "miltza": m.piece.moveToCoords(6, 8, {follow: false}); break;
                        }
                    })

                    env.rpg.actors.cavik.actions.push("bomb_plant", "special_bomb_detonate")
                    midCombatActorAdd(env.rpg.enemyTeam, "destructible_heart_wall")
                    
                    startDialogue("heart_wall")
                    env.rpg.halt = false
                    if(env.rpg.haltedAttempt) advanceTurn()

                    flash(false)                    
                }, 1000)
            }, 1000); else {
                startDialogue("heart_clear")
            } 
        }
        else env.grm.startRetryOffer()
    },

    endCallback: (loser)=> {
        if(loser.name == "ally") env.grm.startRetryOffer();
        else page.name == "pale-halls" ? startDialogue("heart_clear") : false
    },
    retry: () => env.grm.defaultRetry(()=>{startDialogue("heart");flash(true)}, false),
    nogame: () => { startDialogue(env.rpg.p2 ? "heart_wall" : "heart", {specificChain: "nogame"}) }, //used only in bugout protection

    coolHeartMechanicIStealForTheFinaleAlsoLol: (actor, prevActor, force) => {
        let teamswap = actor.team.name == "ally" && prevActor.team.name == "enemy"
        if(env.rpg.scenario.name.includes("vek")) teamswap = prevActor.originalSlug == "vekoa_1v1" && actor.originalSlug == "vekoa_1v1"

        if(force || (env.rpg?.turnData?.turn && teamswap)) {
            const directions = ["up-down", "down-up", "left-right", "right-left"];
            const selectedDirections = [directions.sample({remove: true}), directions.sample({remove: true})];

            selectedDirections.forEach((selectedDirection, i) => {
                let originTile, tiles
                let shapeString = 'xxoxx'
                let direction

                switch (selectedDirection) {
                    case "up-down":
                        originTile = env.rpg.grid.getTileFromCoordinates(5, 0);
                        direction = "down"
                        break;
                    case "down-up":
                        originTile = env.rpg.grid.getTileFromCoordinates(5, 10);
                        direction = "down"
                        break;
                    case "left-right":
                        originTile = env.rpg.grid.getTileFromCoordinates(0, 5);
                        direction = "left"
                        break;
                    case "right-left":
                        originTile = env.rpg.grid.getTileFromCoordinates(10, 5);
                        direction = "left"
                        break;
                }

                tiles = env.rpg.grid.markTiles({
                    originTile: originTile, 
                    shape: "custom",
                    customShape: shapeString,
                    direction,
                    ignoresObstacles: true,
                    ignoresLOS: true,
                    includesOrigin: true
                })

                let dir = selectedDirection.split('-')[1]
                let origin = false
                let strength = 2
                let length = 1
                if(env.rpg.scenario.name.includes("vek")) {
                    length = i == 0 ? 2 : 3
                    origin = env.rpg.actors.akizet
                    strength = 1
                }

                let e = env.rpg.grid.createTileEffect({
                    tiles,
                    originTile,
                    effect: "telegraph",
                    telegraphAnim: "heartbash",
                    specialName: "Spatial Bash",
                    specialHelp: "knocks all ALLY actors in specified direction in specified order",
                    origin,
                    length,
                    specialClass: `heartbash hb-${dir} hb-${i}`,
                    data: {
                        rotation: (dir == "up" || dir == "down") ? "90" : "0"
                    },
                    telegraphExec: (effect) => {
                        env.rpg.actorList.forEach(m => {
                            if ((m.team.name !== "enemy") && m.piece) m.piece.knockback({
                                direction: dir,
                                strength: strength,
                                ignoreMods: true
                            })
                        })

                        switch(dir) {
                            case "up": 
                                env.rpg.grid.realgrid.style.setProperty("--personal-offset", "rotateX(15deg)")
                            break
                            case "down": 
                                env.rpg.grid.realgrid.style.setProperty("--personal-offset", "rotateX(-15deg)")
                            break
                            case "left": 
                                env.rpg.grid.realgrid.style.setProperty("--personal-offset", "rotateY(-15deg)")
                            break
                            case "right": 
                                env.rpg.grid.realgrid.style.setProperty("--personal-offset", "rotateY(15deg)")
                            break
                        }
                    }
                });

                if(env.rpg.scenario.name.includes("vek")) e.advanceEveryTurn = true
            });

            if(!force) chatter({actor: 'sourceless', text: `an impact impends!`, readout: true, duration: 8000})
        }
    },

    turnCallback: (actor, prevActor, force)=> {
        CombatScene.SCENARIOS["ep4_heart"].coolHeartMechanicIStealForTheFinaleAlsoLol(actor, prevActor, force)

        if(env.rpg.p2 && env.rpg.actors?.destructible_heart_wall?.state == "lastStand") {
            env.rpg.halt = true
            startDialogue("heart_clear")
        } else if(!env.rpg.p2) {
            env.grm.lootboxCheck(["arch_charger","arch_channeler","arch_support"])
        }
    },

    //SCENARIO STAGE INFO
    width: 11,
    plan: `
        111eeeee111
        1R♥░♥░♥░♥R1
        1R░♥░♥░♥░R1
        eR░░░░░░░Re
        e░░░░░░░░░e
        e░░░░c░░░░e
        e░░░░░░░░░e
        eR░░░░░░░Re
        1R░3░4░3░R1
        1R░♠░♠░♠░R1
        111eeeee111
    `,
    entities: { 
        "3": { spawnPoint: "arch_puller" },
        "4": { spawnPoint: "arch_charger" },
        "♥": { spawnPoint: "ally" },
        "♠": { spawnPoint: "enemy" },
        "R": { class: "basic respawn"},
        "%": { spawnPoint: "arch_channeler" },
        "c": { class: "basic center",
            spawnPoint: "destructible_heart_wall",
            contains: {
                html: `<figure>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </figure>`,
                dyp: {
                    class: "pyramid pyrasol heartspike noveins",
                    width: 3,
                    height: 3,
                    image: "transparent",
                    transform: "rotateX(180deg) translateY(-25%)"
                }
            } 
        }, 
        "e": { class: "basic notile damagetile", contains: { actor: "destructible_box" } }, 
        "1": { class: "basic notile damagetile" },

        "a": {
            contains: { actor: "destructible_box" }
        },

    }
}

CombatScene.SCENARIOS['ep4_split1'] = {
    initEnemyTeam: ()=> [
        "arch_puncher",
        "arch_support",
        "arch_formless",
        "arch_formless",
    ], // array of enemy actors returned by function
    initAllyTeam: ()=> page.party.filter(m=>["tozik", "miltza", "cavik"].includes(m.slug)),
    bgm: () => {
        if(!page.saiikoCombat2) page.saiikoCombat2 = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/saiikocombat2.ogg'],
            preload: true,
            loop: true,
            volume: 1,
            sprite: {
                __default: [5, 205650, true]
        }})

        return page.saiikoCombat2
    },
    
    bgmRate: 0.9,
    bgmVol: 0.9,
    combatClass: "ep4scene",
    startCallback: ()=>{
        env.rpg.grid.style.setProperty("--playercontrol-rotation-raw", 45);env.rpg.grid.style.setProperty("--playercontrol-tilt-raw", 30)

        env.rpg.halt = true
        env.rpg.enemyTeam.members.forEach(m=>m.hp = 6)
        env.rpg.style.setProperty("--stageshrink", 0)

        //cutscene elongatorrr
        env.rpg.longmode = () => {
            play('criticalError', 0.6)
            
            //add tiles back to stage2, knockback, spawn in tendril
            let stage1NoTile = env.rpg.querySelectorAll(".stage1.notile:not(.fakegap)")
            let stage2NoTile = env.rpg.querySelectorAll(".stage2.notile:not(.fakegap)")
            
            stage2NoTile.forEach(tile => tile.classList.remove("notile"))
            setTimeout(()=>{
                env.rpg.turnOrder.forEach(a=>(a.originalSlug != "split_eye" && !a.originalSlug.includes("destructible")) ? a.piece.knockback({direction: 'down', strength: 8, ignoreMods: true}) : false)
            }, 100)

            setTimeout(()=>{
                midCombatActorAdd(env.rpg.neutralTeam, "destructible_split_tendril_2")
            }, 1000)


            setTimeout(()=>{
                play('criticalError', 0.4)
            
                stage1NoTile.forEach(tile => tile.classList.remove("notile"))
                setTimeout(()=>{
                    env.rpg.turnOrder.forEach(a=>(a.originalSlug != "split_eye" && !a.originalSlug.includes("destructible")) ? a.piece.knockback({direction: 'down', strength: 9, ignoreMods: true}) : false)
                }, 100)
    
                setTimeout(()=>{
                    midCombatActorAdd(env.rpg.neutralTeam, "destructible_split_tendril_1")
                }, 500)
            }, 2000)

        }

    },

    endCallback: (loser)=> {
        if(loser.name == "ally") env.grm.startRetryOffer();
        else startDialogue("split_clearhall")
    },
    
    retry: () => {
        env.grm.defaultRetry(()=>{flash(true);startDialogue("split_connect");changeBranch("connect")})
    },
    nogame: () => { startDialogue("split_connect", {specificChain: "nogame"}) }, //used only in bugout protection

    turnCallback: (actor)=> {
        if(!env.rpg.introDone) return;

        if(env.rpg.actors?.split_eye?.state == "lastStand") {
            env.rpg.enemyTeam.members.filter(enemy=>enemy.slug != "split_eye").forEach(m=>midCombatActorRemove(m))
            startDialogue("split_clearhall")
        }

        if((!env.rpg.actors.destructible_split_tendril_1 || env.rpg.actors?.destructible_split_tendril_1?.hp == 0) && !env.rpg.firstspawn) {
            env.rpg.effectMessage.action({
                user: env.rpg.actors.split_eye,
                hit: 'crit',
                action: `a tendril releases the hall`
            })

            env.rpg.silenceFailedPathfinding = true
            let tiles = env.rpg.grid.tilesByType.stage2warp.filter(t=>!t.piece)
            env.rpg.turnOrder.forEach(m=>{
                if(m.piece && (m.originalSlug.startsWith("arch_") || m.team.name == "ally")) {
                    m.piece.moveToTile(tiles.sample({remove: true}))
                }
            })


            if(!check("gameplay_off")) {
                cutscene(true)
                env.setTimeout(()=>{
                    env.rpg.effectMessage.action({
                        user: env.rpg.actors.split_eye,
                        action: `its remnants split apart into new foes!`
                    })
                    midCombatActorAdd(env.rpg.enemyTeam, "arch_puller", "right", {location: "spawn1"}).hp = 5
                    midCombatActorAdd(env.rpg.enemyTeam, "arch_bomber", "right", {location: "spawn1"}).hp = 5
                    midCombatActorAdd(env.rpg.enemyTeam, "arch_formless", "right", {location: "spawn1"}).hp = 1
                    midCombatActorAdd(env.rpg.enemyTeam, "arch_formless", "right", {location: "spawn1"}).hp = 1
                    midCombatActorAdd(env.rpg.enemyTeam, "arch_formless", "right", {location: "spawn1"}).hp = 1
                    midCombatActorAdd(env.rpg.enemyTeam, "arch_formless", "right", {location: "spawn1"}).hp = 1
                }, 200)
            }

            setTimeout(()=>{
                flash(true)
            }, 800)

            setTimeout(()=>{
                cutscene(false)
                env.rpg.grid.tilesByType.stage1.forEach(t=>{
                    t.makeNevertile()
                    t.classList.add("blocks", "notile")
                    if(t?.piece?.actor?.originalSlug == "destructible_adull") {
                        t.piece.actor.hp = 0
                        updateStats({actor: t.piece.actor})
                    }
                })
                env.rpg.grid.classList.add("shrink1")

                if(env.rpg.currentActor.team.name == "ally") env.rpg.currentActor.piece.startMovement()

                flash(false)
                env.rpg.style.setProperty("--stageshrink", 8);
            }, 1000)

            env.rpg.firstspawn = true
        }

        if((!env.rpg.actors.destructible_split_tendril_2 || env.rpg.actors?.destructible_split_tendril_2?.hp == 0)  && !env.rpg.secondspawn) {
            let tiles = env.rpg.grid.tilesByType.stage3warp.filter(t=>!t.piece)
            env.rpg.silenceFailedPathfinding = true
            env.rpg.turnOrder.forEach(m=>{
                if(m.piece && (m.originalSlug.startsWith("arch_") || m.team.name == "ally")) {
                    m.piece.moveToTile(tiles.sample({remove: true}))
                }
            })

            env.rpg.effectMessage.action({
                user: env.rpg.actors.split_eye,
                hit: 'crit',
                action: `a tendril releases the hall`
            })
            
            if(!check("gameplay_off")) {
                cutscene(true)
                env.setTimeout(()=>{
                    env.rpg.effectMessage.action({
                        user: env.rpg.actors.split_eye,
                        action: `its remnants split apart into new foes!`
                    })
                    
                    midCombatActorAdd(env.rpg.enemyTeam, "arch_formless", "right", {location: "spawn2"}).hp = 5
                    midCombatActorAdd(env.rpg.enemyTeam, "arch_puncher", "right", {location: "spawn2"}).hp = 5
                    midCombatActorAdd(env.rpg.enemyTeam, "arch_support", "right", {location: "spawn2"}).hp = 5
                    midCombatActorAdd(env.rpg.enemyTeam, "arch_bomber", "right", {location: "spawn2"}).hp = 5
                }, 200)
            }

            env.rpg.secondspawn = true

            setTimeout(()=>{
                flash(true)
            }, 800)

            setTimeout(()=>{
                cutscene(false)
                env.rpg.grid.tilesByType.stage2.forEach(t=>{
                    t.makeNevertile(); 
                    t.classList.add("blocks", "notile")
                    if(t?.piece?.actor?.originalSlug == "destructible_adull") {
                        t.piece.actor.hp = 0
                        updateStats({actor: t.piece.actor})
                    }
                })
                env.rpg.grid.classList.add("shrink2")
                env.rpg.style.setProperty("--stageshrink", 16)

                if(env.rpg.currentActor.team.name == "ally") env.rpg.currentActor.piece.startMovement()

                flash(false)
            }, 1000)
        }

        env.grm.lootboxCheck(["arch_puncher","arch_bomber","arch_support","arch_formless"])
    },
    actorSpriteProcess: (actor)=> console.log("sprite", actor),
    
    teamAlterations: {
        ally: [["ADD", "win"]],
        cavik: [["ADD", "bomb_plant"], ["ADD", "special_bomb_detonate"]],
    },

    //SCENARIO STAGE INFO
    width: 7,
    plan: `
        ...D...
        .,<v<,.
        .░]]]░.
        .░]♠░░.
        .e♠]♠e.
        .░]♠]░.
        .░]░]░.
        .░♥♥♥░.
        ._____.
        .__2__.
        .-[[[-.
        .-[[[-.
        .a[[[a.
        .-[-[-.
        .-----.
        .-----.
        .+++++.
        .++1++.
        .=====.
        .=====.
        .A===A.
        .=====.
        .=====.
        .=====.
        ...d...
    `,
    entities: {
        "<": {
            class: "notile"
        },
        
        "1": { 
            class: "stage1 notile fakegap",
            spawnPoint: "destructible_split_tendril_1"
        },
        
        "2": { 
            class: "stage2 notile fakegap",
            spawnPoint: "destructible_split_tendril_2"
        },
 
        "░": { class: "stage3warp basic"},
        "♥": { spawnPoint: "ally", class: "basic stage3warp" },
        "♠": { spawnPoint: "enemy", class: "basic" },
        "[": { class: "basic spawn1 stage2 stage2warp notile" },
        "]": { class: "basic spawn2 stage3warp" },
        "v": { 
            spawnPoint: "split_eye",
        },
        
        "D": {
            class: "notile blocks",
            contains: {
                dyp: {
                    width: 2.5,
                    height: 2.5,
                    image: "url(/img/local/embassy/mind/mindoorfade_warp1.gif)",
                    noback: true
                }
            }
        },
        
        "d": {
            class: "notile blocks",
            contains: {
                dyp: {
                    class: "backdoor",
                    width: 2.5,
                    height: 2.5,
                    image: "url(/img/local/embassy/mind/mindoorfadelocked_warp1.gif)",
                    noback: true,
                    transform: `rotateY(180deg) translateZ(calc(100px * var(--stageshrink)))`
                }
            }
        },

        "A": {
            class: "stage1 basic",
            contains: { actor: "destructible_adull" }
        },

        "a": {
            class: "stage2 basic",
            contains: { actor: "destructible_adull" }
        },

        "e": {
            contains: { actor: "destructible_adull" }
        },
        
        "w": {
            class: "notile blocks",
            contains: {
                dyp: {
                    class: "backwall left",
                    width: 3,
                    height: 2.5,
                    image: "url(/img/local/embassy/mind/marbling_pillars_short_m_warped.gif)",
                    noback: true,
                    transform: `rotateY(180deg) translateZ(calc(100px * var(--stageshrink)))`
                }
            }
        },
        
        "W": {
            class: "notile blocks",
            contains: {
                dyp: {
                    class: "backwall right",
                    width: 3,
                    height: 2.5,
                    image: "url(/img/local/embassy/mind/marbling_pillars_short_m_warped.gif)",
                    noback: true,
                    transform: `rotateY(180deg) translateZ(calc(100px * var(--stageshrink)))`
                }
            }
        },       

        "=": { class: "stage1 basic notile"},
        "+": { class: "stage1 basic notile fakegap"},
        "-": { class: "stage2 basic notile stage2warp"},
        "_": { class: "stage2 basic notile fakegap"},
    }
}

CombatScene.SCENARIOS['ep4_split2'] = {
    initEnemyTeam: ()=> [
        "split_miltza",
        "vekoa_boss"
    ], // array of enemy actors returned by function
    initAllyTeam: ()=> page.party.filter(m=>["tozik", "miltza", "cavik"].includes(m.slug)), 

    teamAlterations: {
        ally: [["ADD", "bomb_plant"], ["ADD", "special_bomb_detonate"], ["ADD", "win"]]
    },

    bgm: () => {return env.grm.music_runningoutoftime}, 
    bgmStart: 20,
    bgmRate: 0.7,
    combatClass: "ep4scene",
    startCallback: ()=> {
        env.rpg.halt = true
        env.rpg.actors.cavik.hp = env.rpg.actors.cavik.maxhp

        env.rpg.actors.split_miltza.piece.classList.add('hide')
        env.rpg.actors.vekoa_boss.piece.classList.add('hide')

        //for calling in cutscene
        env.rpg.createDamageTiles = ()=> {
            if(env.rpg.madeTiles) return;
            env.rpg.grid.createTileEffect({
                tiles: env.rpg.grid.tilesByType.damagetile, 
                effect: "scene_edge",
                length: 999
            })
            env.rpg.madeTiles = true
        }

        env.rpg.uppies = env.rpg.querySelectorAll("combat-actor[for='tozik'], .deadtainer, .spinecolumn")

        env.rpg.up1 = () => env.rpg.uppies.forEach(e => {
            e.classList.add('lift-ready')
            setTimeout(()=>e.classList.add('lifting'), 1000)
        })

        env.rpg.up2 = () => env.rpg.uppies.forEach(e => {
            setTimeout(() => {
                if(env.rpg.actors.tozik) midCombatActorRemove(env.rpg.actors.tozik)
                e.remove()
            }, 5000);
        })

        env.rpg.refresh = () => {
            env.rpg.classList.add("refresh-anim")
            setTimeout(()=>env.rpg.classList.remove("refresh-anim"), 10)
        }

        if(!page.solaMiltzaCombat) page.solaMiltzaCombat = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/solamiltza.ogg'],
            preload: true,
            loop: true,
            volume: 1,
            sprite: {
                __default: [5, 168640, true]
        }})

        page.solaMiltzaCombat.intendedRate = 0.9

        //this is kind of an elaborate setup so skpping the intro takes a lil work
        env.rpg.miltzaSkipState = () => {
            env.rpg.halt = true
            env.rpg.actors.cavik.piece.moveToCoords(2, 8, {follow: false})
            env.rpg.actors.split_miltza.piece.moveToCoords(12, 7, {follow: false})
            env.rpg.actors.split_miltza.piece.classList.remove('hide')

            if(env.rpg.actors.miltza) midCombatActorRemove(env.rpg.actors.miltza, {fast: true})
            if(env.rpg.actors.tozik) midCombatActorRemove(env.rpg.actors.tozik, {fast: true})
            if(env.rpg.actors.vekoa_boss) midCombatActorRemove(env.rpg.actors.vekoa_boss, {fast: true})
            if(!env.bgm._src.includes("solamiltza")) toggleBgm(page.solaMiltzaCombat, false)

            env.rpg.uppies.forEach(e=>e.remove())

            env.rpg.actors.cavik.piece.focusOnTile()
            env.rpg.setCam()
            env.rpg.classList.remove('hideteams')
            env.rpg.classList.add("fearmode", "darkwobble", "miltzamode")
            env.rpg.querySelectorAll('.movable').forEach(t=>t.classList.remove('movable'))
            env.rpg.actors.split_miltza.hp = env.rpg.actors.split_miltza.maxhp - 3
            env.rpg.actors.split_miltza.piece.moveToCoords(12, 7)
            updateStats()

            if(!env.rpg.madeTiles) env.rpg.createDamageTiles()

            setTimeout(() => {
                env.rpg.currentActorIndex = 1
                env.rpg.currentActor = env.rpg.actors.split_miltza
                env.rpg.halt = false
                removeStatus(env.rpg.actors.cavik, "fear")
                addStatus({target: env.rpg.actors.split_miltza, status: "unnatural_carapace", length: 2})
                advanceTurn()
                env.rpg.actors.cavik.highlight(true)
                if(check("gameplay_off")) {
                    env.rpg.halt = true; 
                    startDialogue("spine_miltza_nogame")
                }
            }, 3000)
        }

        env.rpg.gakvuDies = () => {
            env.rpg.actors.split_miltza.sprite.classList.add('autosize')
            env.rpg.actors.split_miltza.sprite.querySelector('img').style.filter = ""
            env.rpg.actors.split_miltza.sprite.querySelector('img').style.width = "175px"
            env.rpg.actors.split_miltza.sprite.querySelector('img').src = "/img/sprites/obesk/miltza/gakvusdeadbodygakvudiesinepisode4.gif?4"
        }

        env.rpg.telyuDrop = () => {
            if(!env.rpg.lastDrop) env.rpg.lastDrop = -1000
            if((env.rpg.turnData.turn - env.rpg.lastDrop > 4)) {
                let position = [
                    env.rpg.grid.getTileFromCoordinates(3, 7),
                    env.rpg.grid.getTileFromCoordinates(7, 3),
                    env.rpg.grid.getTileFromCoordinates(7, 11),
                    env.rpg.grid.getTileFromCoordinates(7, 9),
                    env.rpg.grid.getTileFromCoordinates(5, 7),
                    env.rpg.grid.getTileFromCoordinates(7, 5),
                    env.rpg.grid.getTileFromCoordinates(9, 7),
                    env.rpg.grid.getTileFromCoordinates(11, 7)
                ].filter(t => !t.piece).sample()

                if(!check("PAGE!!cavikblunder") && env.rpg.lastDrop == -1000) position = env.rpg.grid.getTileFromCoordinates(7, 4);

                if(position) {
                    let tiles = env.rpg.grid.markTiles({
                        originTile: position,
                        size: 2,
                        shape: "circle",
                        includesOrigin: true
                    })
                    
                    env.rpg.lastDropEffect = env.rpg.grid.createTileEffect({
                        tiles, 
                        length: 2,
                        origin: env.rpg.actors.cavik,
                        effect: "telegraph",
                        telegraphExec: (telEffect) => {
                            let targets = telEffect.tiles.map(p=>p?.piece?.actor).filter(a=>a)
                            if(targets.length) env.GENERIC_ACTIONS.teamWave({
                                arbitraryActorList: targets,
                                exec: (actor, i) => {
                                    playCombatCrit("crit", 0.5)
                                    if(actor.team.name == "enemy") {
                                        addStatus({target: actor, status: "stun", length: 1})
                                        combatHit(actor, {amt: 4, autohit: true})
                                    }
                                    if(actor.piece) actor.piece.knockback({ 
                                        direction: telEffect.originTile.getRelativeDirection(actor.piece.tile), 
                                        strength: actor.team.name == "enemy" ? 6 : 2
                                    })
                                },
                            })
                            setTimeout(() => {
                                midCombatActorAdd(env.rpg.neutralTeam, "destructible_minishelf", "right", {location: "specificTile", specificTile: telEffect.originTile})                                
                            }, 100)
                        },
                        telegraphAnim: "telegraph",
                        originTile: position
                    })

                    env.rpg.lastDrop = env.rpg.turnData.turn
                }
            }
        }

    },

    turnCallback: (actor) => {
        if(!env.rpg.phase2) {
            let twisted = getStatus(env.rpg.actors.split_miltza, "unnatural_carapace")

            //on a delay because cavik may die from DoT damage
            //regular phase 2 if you hit her with bombs
            if(((twisted?.duration == 0) || !twisted)) {
                env.rpg.halt = true

                setTimeout(() => {
                    if(env.rpg.active) {
                        startDialogue("spine_miltzaphase")
                        removeStatus(env.rpg.actors.split_miltza, "unnatural_carapace")
                    }
                }, 400)
            } 
            
            //also enter it if you break every root lol
            //not cavik's fault though he's gonna blame you idiot
            else if(env.rpg.neutralTeam.members.every(m=>m.hp == 0)) {
                env.rpg.halt = true

                setTimeout(() => {
                    if(env.rpg.active) {
                        change("PAGE!!cavikblunder", true)
                        startDialogue("spine_miltzaphase")
                    }
                }, 400)
            }
        } else env.rpg.telyuDrop()
    },

    endCallback: (loser)=> {
        env.rpg.miltzaSkipState = false
        if(loser.name == "ally") env.grm.startRetryOffer();
        else page.name == "pale-halls" ? startDialogue("spine_miltzaclear") : false
    },
    
    retry: () => {
        env.grm.defaultRetry(env.grm.skipSpineIntro)
    },
    nogame: () => { startDialogue(env.rpg.phase2 ? "spine_miltzaphase" : "spine_miltza_nogame", {specificChain: "nogame"}) }, //used only in bugout protection

    actorSpriteProcess: (actor)=> console.log("sprite", actor),

    //SCENARIO STAGE INFO
    width: 15,
    plan: `
        ♠♠...VVdVV.....
        .....VVVVV.....
        ..###░░░░░###..
        ..#C#░░░░░#C#..
        ..###░░░░░###..
        //░░░░░░░░░░░,,
        //░░░░░░░░░░░,,
        //░░░░bc░░░░░,D
        //░░░░░░░░░░░,,
        //░░░░░░░░░░░,,
        ..###░░░░░###..
        ..#C#░░░░░#C#..
        ..###░░░░░###..
        .....&&♥&&.....
        .....&1F2&.....
    `,
    entities: { 
        //i.e. downface is on the top side cause it faces down
        //used for effect spawns
        "♠": { spawnPoint: "enemy", class: "nevertile" },
        "♥": { spawnPoint: "ally", class: "damagetile upface" },
        "1": { spawnPoint: "tozik", class: "damagetile upface" },
        "2": { spawnPoint: "miltza", class: "damagetile upface" },

        "V": { class: "basic downface damagetile" },
        "&": { class: "basic upface damagetile" },
        "/": { class: "basic rightface damagetile" },
        ",": { class: "basic leftface damagetile" },

        "c": { class: "basic center",
            contains: {
                class: "spinecolumn",
                dyp: {
                    image: 'url(/img/local/embassy/mind/spinering.gif)',
                    width: 7,
                    height: 7,
                    noback: true,
                    style: "background-size: 100% 100%;transform: translateZ(1px);bottom: unset;"
                }
            }
        },

        "b": {
            class: "basic boxtainer",
            contains: {
                class: "deadtainer",
                html: `<span></span><span></span><span></span><span></span><span></span>`
            }
        },

        "C": {
            class: "notile",
            contains: {
                actor: "destructible_spineroot",
                html: "<div class='spinepool'></div>",
                dyp: {
                    image: 'transparent',
                    width: 3,
                    height: 3,
                    style: "transform: translateZ(-1px);bottom: unset;pointer-events: none;"
                }
            }
        },

        "D": { 
            class: "basic leftface damagetile bigdoortainer",
            contains: {
                dyp: {
                    class: "bigdoor",
                    width: 4.5,
                    height: 4.5,
                    image: "url(/img/local/embassy/mind/bigdoor.gif)",
                    noback: true,
                    transform: "translateX(10%) rotateY(-90deg)"
                }
            } 
        },
        
        "d": {
            class: "basic downface damagetile",
            contains: {
                dyp: {
                    width: 2.5,
                    height: 2.5,
                    image: "url(/img/local/embassy/mind/mindoorfadelocked_warp1.gif)",
                    noback: true,
                    transform: "rotateY(-90deg) translateX(-25%) rotateY(90deg)"
                }
            }
        },
        
        "F": {
            class: "basic upface damagetile",
            contains: {
                dyp: {
                    width: 2.5,
                    height: 2.5,
                    image: "url(/img/local/embassy/mind/mindoorfade_warp1.gif)",
                    noback: true,
                    transform: "rotateY(90deg) translateX(-25%) rotateY(90deg)",
                }
            }
        },
        
        "#": {class: "basic roottile notile"},
    }
}

CombatScene.SCENARIOS['ep4_lesserboss'] = {
    initEnemyTeam: ()=> [
        "cutscenedriver",
    ], // array of enemy actors returned by function
    initAllyTeam: ()=> page.party.filter(m=>["akizet", "gakvu", "cavik", "bozko"].includes(m.slug)),

    bgm: () => {
        if(!page.solaRisen) page.solaRisen = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/solarisen.ogg'],
            preload: true,
            loop: true,
            volume: 1,
            sprite: {
                __default: [5, 145600, true]
        }})

        return page.solaRisen
    },
    bgmRate: 0.4,
    combatClass: "ep4scene",

    startCallback: ()=> {          
        env.rpg.lesserSkipState = () => {
            env.rpg.halt = true
            if(!env.rpg.actors.lesser_kivii) midCombatActorAdd(env.rpg.enemyTeam, "lesser_kivii", "left", {location: "spawn"}) 
            if(!env.rpg.actors.lesser_itzil) midCombatActorAdd(env.rpg.enemyTeam, "lesser_itzil", "left", {location: "spawn"})
            if(env.rpg.actors.cutscenedriver) midCombatActorRemove(env.rpg.actors.cutscenedriver, {fast: true})

            env.rpg.classList.remove("hideteams")

            setTimeout(() => {
                env.rpg.actors.lesser_kivii.piece.moveToCoords(7, 7, {follow: false})
                env.rpg.actors.lesser_itzil.piece.moveToCoords(7, 9, {follow: false})
                env.rpg.currentActorIndex = env.rpg.turnOrder.length - 1
                env.rpg.currentActor = env.rpg.turnOrder[env.rpg.currentActorIndex]
                env.rpg.halt = false
                env.rpg.actors.akizet.piece.focusOnTile()

                if(check("gameplay_off")) {
                    env.rpg.halt = true; 
                    startDialogue("lesserboss_nogame")
                }
                
                ratween(env.bgm, 0.8);env.bgm.intendedRate = 0.8;

                advanceTurn()
            }, 2000)
        }

        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 99
        })
    },

    endCallback: (loser)=> {
        env.rpg.lesserSkipState = false
        if(loser.name == "ally") env.grm.startRetryOffer()
    },
    
    retry: () => {
        env.grm.defaultRetry(env.grm.skipLesserBossIntro)
    },
    nogame: () => { startDialogue(env.rpg.actors.lesser_itzka ? "lesserboss_phase" : "lesserboss_nogame", {specificChain: "nogame"}) }, //used only in bugout protection
    
    turnCallback: (actor)=> console.log("turn", actor),
    actorSpriteProcess: (actor)=> console.log("sprite", actor),
    
    teamAlterations: {
        ally: [
            ["ADD", "win"]
        ],
        cavik: [["ADD", "bomb_plant"], ["ADD", "special_bomb_detonate"]],
    },

    //SCENARIO STAGE INFO
    width: 13,
    plan: `
        eTTTvTTTvTTTe
        L░░░░111░░░░R
        o♥░░░1p1░░░☺O
        L♥░░░111░░░░R
        >♥░░░░░░░░░░<
        L111░111░111R
        L1p1░1P1░1p1R
        L111░111░111R
        >░░░░░░░░░░░<
        L111░111░111R
        L1p1░1p1░1p1R
        L11121113111R
        eDDD^DDD^DDDe
        ♠............
    `,  //this row is a bonus area where dozka hides
    entities: {
        "1": {
            class: "noborder fakelos pseudofade"
        },
        
        "o": {
            class: "basic notile damagetile rightshoot",
            contains: {
                dyp: {
                    width: 2.5,
                    height: 2.5,
                    image: "url(/img/local/embassy/mind/mindoorfade_lost.gif)",
                    noback: true,
                    transform: "translateX(-25%) rotateY(90deg)"
                }
            }
        },
        
        "O": {
            class: "basic notile damagetile leftshoot",
            contains: {
                dyp: {
                    width: 2.5,
                    height: 2.5,
                    image: "url(/img/local/embassy/mind/mindoorfade_lost.gif)",
                    noback: true,
                    transform: "translateX(25%) rotateY(-90deg)"
                }
            }
        },

        "e": { class: "basic notile damagetile" },
        "T": { class: "basic notile damagetile downshoot" },
        "R": { class: "basic notile damagetile leftshoot" },
        "L": { class: "basic notile damagetile rightshoot" },
        "D": { class: "basic notile damagetile upshoot" },

        "p": { class: "noborder pseudofade", contains: { actor: "destructible_lesserpod" } },
        "P": { class: "noborder pseudofade center", contains: { actor: "destructible_lesserpod" }, spawnPoint: "lesser_itzka" },

        "☺": { spawnPoint: "cavik" },
        "♥": { spawnPoint: "ally" },
        "♠": { class: "nevertile blocks", spawnPoint: "enemy" },
        "2": { spawnPoint: "lesser_itzil" },
        "3": { spawnPoint: "lesser_kivii" },

        "^": { class: "basic notile damagetile upface upshoot" },
        "v": { class: "basic notile damagetile downface downshoot" },
        ">": { class: "basic notile damagetile rightface rightshoot" },
        "<": { class: "basic notile damagetile leftface leftshoot" },
    }
}

CombatScene.SCENARIOS['ep4_vek_pt1'] = {
    initEnemyTeam: ()=> [
        "destructible_epicenter_vein",
        "arch_formless",
        "arch_formless",
        "arch_formless",
        "arch_formless",
        "arch_formless",
        "arch_formless",
        "arch_formless",
        "arch_formless",
        "arch_harasser",
        "arch_harasser",
        "arch_puller",
        "arch_puller",
        "arch_support",
    ], // array of enemy actors returned by function
    initAllyTeam: ()=> page.party.filter(m=>["akizet", "gakvu", "cavik", "bozko"].includes(m.slug)),
    
    teamAlterations: {
        ally: [["ADD", "win"], ["STATUS", "desperation"]],
        gakvu: [["scene_gakvu_attack", "scene_gakvu_attack_desperation"]],
        cavik: [["scene_cavik_attack", "scene_cavik_attack_desperation"], ["ADD", "bomb_plant"], ["ADD", "special_bomb_detonate"]],
        bozko: [["scene_bozko_attack", "scene_bozko_attack_desperation"]]
    },

    bgm: () => {
        if(!page.finaleSong) page.finaleSong = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/finale.ogg'],
            preload: true,
            loop: true,
            sprite: {
                __default: [5, 999999999, true]
            }
        })

        return page.finaleSong
    },

    bgmStart: 0,
    bgmRate: 1,
    combatClass: "ep4scene finale finale",
    startCallback: ()=> {
        env.rpg.bossProgress = 0

        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 999,
            origin: env.rpg.actors.vekoa_eye
        })

        env.rpg.clearCavikSpot = () => {
            if(!env.rpg.actors.cavik.piece) combatRevive(env.rpg.actors.cavik);
            [
                env.rpg.grid.getTileFromCoordinates(8, 14),
                env.rpg.grid.getTileFromCoordinates(8, 13),
                env.rpg.grid.getTileFromCoordinates(8, 12)
            ].forEach((t, i)=>{
                if(t.piece) {
                    let direction
                    switch(i) {
                        case 0: direction = "left"; break
                        case 1: direction = "right"; break
                        case 2: direction = "up"; break
                    }
                    t.piece.knockback({direction, strength: 3, ignoreMods: true})
                }
            })
        }

        env.rpg.p2 = () => {
            env.rpg.grid.tileEffects.forEach(e => {
                if(e.slug != "scene_edge") {
                    env.rpg.grid.deleteTileEffect(e)
                }
            }) 
            
            setTimeout(() => {
                //clear tiles as needed
                let allySpots = [
                    env.rpg.grid.getTileFromCoordinates(8, 14),
                    env.rpg.grid.getTileFromCoordinates(8, 15),
                    env.rpg.grid.getTileFromCoordinates(9, 15),
                    env.rpg.grid.getTileFromCoordinates(7, 15)
                ]

                env.rpg.enemyTeam.members.forEach(m=>m.slug.startsWith("arch_") ? midCombatActorRemove(m, {fast: true}) : 0)

                //clear ally spot
                allySpots.forEach(tile=>{
                    if(!tile?.piece) return;
                    tile.piece.moveToTile(tile.getTileByRelativity(0, -7))
                })

                //relocate for cutscene
                env.rpg.allyTeam.members.forEach(m=>{
                    if(m.state == "dead") {
                        m.hp = 1
                        combatRevive(m)
                    }
                })

                setTimeout(()=>{
                    env.rpg.actors.cavik.piece.moveToCoords(8, 15)
                    env.rpg.actors.akizet.piece.moveToCoords(8, 14)
                    env.rpg.actors.bozko.piece.moveToCoords(9, 15)
                    env.rpg.actors.gakvu.piece.moveToCoords(7, 15)
                }, 400)


                //clear vekoa cutscene spot
                env.rpg.grid.markTiles({
                    originTile: env.rpg.grid.getTileFromCoordinates(8, 11),
                    shape: "square",
                    size: 2
                }).forEach(tile=>{
                    if(tile?.piece) tile.piece.knockback({direction: "left", strength: 6, ignoreMods: true})
                }) 
            }, 200);

            setTimeout(() => {   
                flash(false)  

                //this is where we do a lot of cutscene stuff with vekoa
                //spawns in front of the core, where we get some dialogue
                //then ultimately transition to her solo fight pt1
                midCombatActorAdd(env.rpg.enemyTeam, "vekoa_boss")

                midCombatActorAdd(env.rpg.enemyTeam, "arch_formless")
                midCombatActorAdd(env.rpg.enemyTeam, "arch_formless")
                midCombatActorAdd(env.rpg.enemyTeam, "arch_formless")
                midCombatActorAdd(env.rpg.enemyTeam, "arch_formless")
                midCombatActorAdd(env.rpg.enemyTeam, "arch_formless")
                midCombatActorAdd(env.rpg.enemyTeam, "arch_formless")
                midCombatActorAdd(env.rpg.enemyTeam, "arch_formless")
                midCombatActorAdd(env.rpg.enemyTeam, "arch_formless")   

                env.rpg.grid.tileEffects.forEach(e => {
                    if(e.slug != "scene_edge") {
                        env.rpg.grid.deleteTileEffect(e)
                    }
                }) 
            }, 600)
        }

        
        env.rpg.p2strike = () => {
            //vekoa hits gakvu off to the side, then bozko, cavik, and finally akizet
            playCombatCrit("fear")
            env.rpg.actors.gakvu.piece.knockback({direction:"up-left", strength: 3, follow: false})
            env.rpg.actors.bozko.piece.knockback({direction:"up-right", strength: 3, follow: false})
            env.rpg.actors.cavik.piece.knockback({direction:"up-right", strength: 4, follow: false})
        }
    },
    
    manualStop: true,
    manualStopCallback: (loser)=> {
        if(loser.name == "ally") env.grm.startRetryOffer()
    },
    retry: () => env.grm.defaultRetry(),

    turnCallback: (actor)=> {
        switch(env.rpg.bossProgress) {
            
            //at 0 progress, we spawn more enemies if they start to run low
            case 0:
                if(env.rpg.enemyTeam.members.length < 5) {
                    env.rpg.halt = true

                    let selection = ["arch_formless", "arch_puncher", "arch_harasser", "arch_bomber", "arch_puller"]
                    for (let i = 0; i < 5; i++) {
                        midCombatActorAdd(env.rpg.enemyTeam, selection.sample(), "right")
                    }

                    play("dull")

                    env.rpg.effectMessage.action({
                        user: actor,
                        target: actor,
                        isMinor: true,
                        action: `more shapes spring forth from the ceremony...`
                    })

                    if(!env.rpg.akicallout && env.rpg.actors.akizet.state != "dead") {
                        env.rpg.actors.akizet.piece.focusOnTile()
                        env.rpg.akicallout = true
                        rpgDialogue(env.rpg.actors.akizet, "they will just keep coming...", true, 2000)
                        setTimeout(()=>rpgDialogue(env.rpg.actors.akizet, "then we must ignore them", true, 4000), 2000)
                        setTimeout(()=>rpgDialogue(env.rpg.actors.akizet, "focus on the veins at all costs!!", true, 6000), 4000)                        
                        setTimeout(() => {
                            env.rpg.halt = false
                            if(env.rpg.haltedAttempt) advanceTurn()
                        }, 8000);
                    } else {
                        env.rpg.halt = false
                        if(env.rpg.haltedAttempt) advanceTurn()
                    }
                }
            break

            case 1:
                if(env.rpg.actors?.vekoa_wall?.state == "lastStand") {
                    flash(true)
                    env.rpg.halt = true
                    env.rpg.classList.add('hideteams')
                    startDialogue("vekoa_p2")

                    env.rpg.enemyTeam.members.forEach(m=>m.slug.startsWith("vekoa_wall") ? midCombatActorRemove(m) : 0)
                    env.rpg.enemyTeam.members.forEach(m=>m.slug.startsWith("arch_") ? midCombatActorRemove(m) : 0)

                    vfx({type: "flash", state: false, delay: 500})
                }
            break
        }

        env.grm.lootboxCheck(["arch_channeler","arch_puller","arch_support","arch_formless"])
    },

    //SCENARIO STAGE INFO
    width: 17,
    plan: `
        .......DND.......
        .....DD░░░DD.....
        ....VV░░░░♠,,....
        ...VV♠░♠░♠░░,,...
        ..VV♠♠░░♠░░♠♠,,..
        .RR░░???????♠░LL.
        RR░♠♠?!!!!!?♠♠░LL
        R♠♠░░?!111!?░░♠♠L
        W░♠♠♠?!1e1!?♠♠░░E
        Rrrrr?!111!?rrrrL
        R&r♠♠?!!!!!?♠♠r/L
        .&&░░???2???░░//.
        ..&&░░░░░░░░░//..
        ...&T░░░░░░░t/...
        ....&&♥♥░♥♥//....
        .....UU░w░UU.....
        .......USU.......
    `,
    entities: {
        "r": { class: "basic respawn"},

        "N": { class: "northdril notile", spawnPoint: "destructible_epicenter_vein" },
        "E": { class: "eastdril notile", },
        "S": { class: "southdril notile",  },
        "W": { class: "westdril notile", },
        "_": { class: "westdril notile blocks", },

        "♥": { spawnPoint: "ally" },
        "♠": { spawnPoint: "enemy" },

        "2": { spawnPoint: "vekoa_boss", class: "basic dimmer"},
        
        "w": { class: "basic", spawnPoint: "vekoa_wall" },
        "T": { class: "basic upface rightface rightlowerface notile damagetile", spawnPoint: "vekoa_wall_tendril" },
        "t": { class: "basic upface leftface leftlowerface notile damagetile", spawnPoint: "vekoa_wall_tendril" },

        "e": { class: "center blocks notile", contains: {
            class: "marbletable coreholder",
            dyp: {
                width: 5,
                height: 5,
                image: "url(/img/local/embassy/mind/corewarp.gif?)",
                transform: `rotateX(90deg) translateZ(1px)`,
            }
        }},

        "V": { class: "basic downface rightface notile damagetile" },
        ",": { class: "basic downface leftface notile damagetile" },
        "&": { class: "basic upface rightface rightlowerface notile damagetile" },
        "/": { class: "basic upface leftface leftlowerface notile damagetile" },

        "U": { class: "basic upface uplowerface notile damagetile" },
        "L": { class: "basic leftface notile damagetile" },
        "R": { class: "basic rightface notile damagetile" },
        "D": { class: "basic downface notile damagetile" },

        "1": { class: "blocks los notile" },
        "!": {class: "basic notile", },
        '?': { class: "basic dimmer"},

        'i': {
            class: "los blocks",
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

        'I': {
            class: "los blocks",
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
    }
}

CombatScene.SCENARIOS['ep4_vek_pt2'] = {
    initEnemyTeam: ()=> [
        "vekoa_1v1",
        "vekoa_eye"
    ], // array of enemy actors returned by function
    initAllyTeam: ()=> page.party.filter(m=>["akizet"].includes(m.slug)),

    bgm: () => {
        if(!page.solaFinaleMelee) page.solaFinaleMelee = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/solafinale.ogg'],
            preload: true,
            loop: true,
            volume: 1,
            sprite: {
                __default: [5, 134250, true]
            }
        })

        return page.solaFinaleMelee
    },

    bgmRate: 0.8,
    combatClass: "finale vek1v1",
    hardOpen: true,
    
    startCallback: ()=> {
        env.rpg.turnOrder = [env.rpg.turnOrder[0], env.rpg.turnOrder[0], env.rpg.turnOrder[1], env.rpg.turnOrder[1], env.rpg.turnOrder[2]]
        env.rpg.currentActorIndex = env.rpg.turnOrder.length - 1
        env.rpg.actors.akizet.move = 1
        env.rpg.actors.vekoa_eye.npc = true

        env.rpg.actors.vekoa_1v1.hp = 35
        updateStats()

        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 999,
            origin: env.rpg.actors.vekoa_eye
        })
    },
    manualStop: true,
    manualStopCallback: (loser)=> {
        if(loser.name == "ally" && env.rpg.actors.vekoa_1v1.state != "lastStand") env.grm.startRetryOffer();
        else if(env.rpg.actors.vekoa_1v1.state == "lastStand") {
            env.rpg.halt = true
            startDialogue("vekoa_p3")
        }
    },
    retry: () => env.grm.defaultRetry(),
    turnCallback: (actor)=> {
        if(env.rpg.enemyTeam.members.every(m=>m.state == "lastStand")) {
            env.rpg.halt = true
            startDialogue("vekoa_p3")
        }        
    },
    
    teamAlterations: {
        ally: [
            ["REMOVE", "akizet_attack"], 
            ["REMOVE", "scene_akizet_attack"], 
            ["REMOVE", "scene_frenzy"], 
            ["REMOVE", "scene_evade"], 
            ["ADD", "vekfight_assault"], 
            ["ADD", "vekfight_rush"],
            ["ADD", "win"],
            ["STATUS", "desperation"],
        ]
    },

    //SCENARIO STAGE INFO
    width: 9,
    plan: `
        ...!!!...
        ..░░♥░░..
        .░?????░.
        !░?111?░!
        !░?1e1?░!
        !░?111?░!
        .░?????░.
        ..░░♠░░..
        ...!!!...
    `,
    entities: {
        "♥": { spawnPoint: "ally" },
        "♠": { spawnPoint: "enemy" },
        '!': {slug: '.', class: "notile damagetile"}, // obstacle

        
        "1": { class: "blocks los notile" },
        '?': { class: "basic"},

        "e": { class: "center notile", spawnPoint: "vekoa_eye", 
            contains: {
            class: "marbletable coreholder",
            dyp: {
                width: 4,
                height: 4,
                image: "url(/img/local/embassy/mind/corewarp.gif?)",
                transform: `rotateX(90deg) translateZ(1px)`,
            }
        }},
    }
}


CombatScene.SCENARIOS['ep4_vek_pt3'] = {
    initEnemyTeam: ()=> [
        "destructible_epicenter_vein",
        "vekoa_golem",
        "vekoa_golem",
        "arch_formless",
        "arch_formless",
        "arch_formless",
        "arch_formless",
        "arch_support",
        "arch_support",
    ], // array of enemy actors returned by function
    initAllyTeam: ()=> page.party.filter(m=>["gakvu", "cavik", "bozko"].includes(m.slug)), 
    
    teamAlterations: {
        ally: [["ADD", "win"], ["STATUS", "desperation"]],
        gakvu: [["scene_gakvu_attack", "scene_gakvu_attack_desperation"]],
        cavik: [["scene_cavik_attack", "scene_cavik_attack_desperation"], ["ADD", "bomb_plant"], ["ADD", "special_bomb_detonate"]],
        bozko: [["scene_bozko_attack", "scene_bozko_attack_desperation"]]
    },

    bgm: () => {
        if(!page.finaleSong) page.finaleSong = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/finale.ogg'],
            preload: true,
            loop: true,
            sprite: {
                __default: [5, 999999999, true]
            }
        })

        return page.finaleSong
    },

    bgmRate: 1,
    combatClass: "ep4scene finale slice",
    hardOpen: true,
    startCallback: ()=> {
        env.rpg.bossProgress = 3

        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 999,
            origin: env.rpg.actors.vekoa_eye
        })

        addStatus({target: env.rpg.actors.destructible_epicenter_vein0, status: "shroud"})
    },
    manualStop: true,
    manualStopCallback: (loser)=> {
        if(loser.name == "ally") env.grm.startRetryOffer();
        else startDialogue('vekoa_p4')
    },
    retry: () => env.grm.defaultRetry(()=>startDialogue('vekoa_p3')),
    turnCallback: (actor) => {

        if(!env.rpg.actorList.filter(a=>a.slug.includes("vekoa_golem")).length) {
            //we skip past killing the vein so it can happen in akizet's side            
            env.rpg.halt = true
            startDialogue("vekoa_p4")

        } else if(env.rpg?.turnData?.turn > 5 && env.rpg.currentActor.team.name == "ally" && !env.rpg.tozik) {
            env.rpg.halt = true
            env.rpg.tozik = true
            startDialogue("vekoa_p3_tozik")

        } else if(env.rpg.enemyTeam.members.length < 5) {
            let selection = ["arch_formless", "arch_puncher", "arch_harasser", "arch_puller"]
            for (let i = 0; i < 3; i++) {
                midCombatActorAdd(env.rpg.enemyTeam, selection.sample(), "right")
            }

            play("dull")

            env.rpg.effectMessage.action({
                user: env.rpg.allyTeam.members[0],
                target: env.rpg.allyTeam.members[0],
                action: `more shapes spring forth from the ceremony...`
            })
        }

        env.grm.lootboxCheck(["arch_formless"])
    },

    //SCENARIO STAGE INFO
    width: 19,
    plan: `
        ........_N_........
        .......!D░D!.......
        ......!D░░░D!......
        ....!!V░░░░░,!!....
        ....V░♠T♠░♠T♠░,....
        ....V░♠░♠░░░♠O,....
        ...VPPPPPP♠PP♠P,...
        ...VP♠PPPCPPPPP,...
        ..RPPPP♠PPPP♠PPPL..
        .RPt?PPPPP♠PP♠PPPL.
        RPPPP♥PPP♥PPP♥PPPPL
        UUUUUUUUUUUUUUUUUUU
        ...................
        ...................
        ...................
        ...................
        .........e.........
    `,
    entities: {
        "1": {
            class: "blocks los",
            contains: {
                html: "<div class='proptest'>LOS</div>"
            }
        },

        "N": { class: "northdril notile blocks combatprop", spawnPoint: "destructible_epicenter_vein" },
        "E": { class: "eastdril notile blocks combatprop", },
        "S": { class: "southdril notile blocks combatprop",  },
        "W": { class: "westdril notile blocks combatprop", },
        "_": { class: "westdril notile blocks", },

        "♥": { spawnPoint: "ally" },
        "♠": { spawnPoint: "enemy" },
        "?": { spawnPoint: "arch_support" },
        "P": { class: "basic respawn" },

        "2": { spawnPoint: "vekoa_boss" },
        "C": { class: "basic center" },
        
        "w": { class: "basic", spawnPoint: "vekoa_wall" },
        "T": { class: "basic", spawnPoint: "vekoa_golem" },
        "t": { class: "basic", spawnPoint: "telyu" },
        "O": { class: "basic", spawnPoint: "tozik_npc" },

        "e": { class: "center notile", 
            contains: {
            class: "marbletable coreholder",
            dyp: {
                width: 8,
                height: 8,
                image: "url(/img/local/embassy/mind/corewarp.gif?)",
                transform: `rotateX(90deg) translateZ(1px)`,
                }
            }
        },

        '!': { class: "notile damagetile"},

        "V": { class: "basic downface rightface notile damagetile" },
        ",": { class: "basic downface leftface notile damagetile" },
        "&": { class: "basic upface rightface notile damagetile" },
        "/": { class: "basic upface leftface notile damagetile" },

        "U": { class: "basic upface notile damagetile" },
        "L": { class: "basic leftface notile damagetile" },
        "R": { class: "basic rightface notile damagetile" },
        "D": { class: "basic downface notile damagetile" },
    }
}

CombatScene.SCENARIOS['ep4_vek_pt4'] = {
    initEnemyTeam: ()=> [ "vekoa_1v1", "vekoa_eye" ], 
    initAllyTeam: ()=> page.party.filter(m=>["akizet"].includes(m.slug)),

    bgm: () => {
        if(!page.solaFinaleMelee) page.solaFinaleMelee = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/solafinale.ogg'],
            preload: true,
            loop: true,
            volume: 1,
            sprite: {
                __default: [5, 134250, true]
            }
        })

        return page.solaFinaleMelee
    },

    bgmRate: 0.9,
    combatClass: "finale vek1v1",
    hardOpen: true,
    startCallback: ()=> {
        env.rpg.bossProgress = 4
        env.rpg.turnOrder = [env.rpg.turnOrder[0], env.rpg.turnOrder[0], env.rpg.turnOrder[1], env.rpg.turnOrder[1], env.rpg.turnOrder[2]]
        env.rpg.currentActorIndex = env.rpg.turnOrder.length - 1
        env.rpg.actors.akizet.move = 1
        env.rpg.actors.akizet.hp = 15
        env.rpg.actors.vekoa_eye.npc = true

        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 999,
            origin: env.rpg.actors.vekoa_eye
        })
    },
    manualStop: true,
    manualStopCallback: (loser)=> {
        if(loser.name == "ally" && env.rpg.actors.vekoa_1v1.state != "lastStand") env.grm.startRetryOffer();
        else if(env.rpg.actors.vekoa_1v1.state == "lastStand") {
            env.rpg.halt = true
            startDialogue("vekoa_p5")
        }
    },
    retry: () => env.grm.defaultRetry(()=>startDialogue('vekoa_p4')),
    turnCallback: (actor, prevActor)=> {
        if(env.rpg.enemyTeam.members.every(m=>m.state == "lastStand")) {
            env.rpg.halt = true
            startDialogue("vekoa_p5")
        } else {
            CombatScene.SCENARIOS["ep4_heart"].coolHeartMechanicIStealForTheFinaleAlsoLol(actor, prevActor)
        }
    },
    
    teamAlterations: {
        ally: [
            ["REMOVE", "akizet_attack"], 
            ["REMOVE", "scene_akizet_attack"], 
            ["REMOVE", "scene_frenzy"], 
            ["REMOVE", "scene_evade"], 
            ["ADD", "vekfight_assault"], 
            ["ADD", "vekfight_rush"],
            ["ADD", "win"],
            ["STATUS", "desperation"],
        ]
    },

    //SCENARIO STAGE INFO
    width: 11, 
    plan: `
        ,,vvvvvvv,,
        ,,,_!!!__,,
        >__░░░░░__<
        >_░?????░_<
        >!░?111?░!<
        >!░?1e1?░!<
        >!░?111?░!<
        >_░??♥♠?░_<
        >__░░░░░__<
        ,,__!!!__,,
        ,,^^^^^^^,,
    `,
    entities: {
        "♥": { spawnPoint: "ally", class: 'basic' },
        "♠": { spawnPoint: "enemy", class: 'basic'},
        "e": { spawnPoint: "vekoa_eye" },
        '!': {class: "notile damagetile"}, // obstacle

        "_": { class: "notile blocks" },
        "^": { class: "notile blocks upface upshoot"},
        "v": { class: "notile blocks downface downshoot"},
        ">": { class: "notile blocks rightface rightshoot"},
        "<": { class: "notile blocks leftface leftshoot"},

        
        "1": { class: "blocks los notile" },
        '?': { class: "basic"},

        "e": { class: "center notile coretile", spawnPoint: "vekoa_eye", 
            contains: {
            class: "marbletable coreholder",
            dyp: {
                width: 4,
                height: 4,
                image: "url(/img/local/embassy/mind/corewarp.gif?)",
                transform: `rotateX(90deg) translateZ(1px)`,
            }
        }},
    }
}

CombatScene.SCENARIOS['ep4_vek_pt5'] = {
    initEnemyTeam: ()=> [
        "destructible_split_tendril_3",
        "destructible_split_tendril_4",
        "destructible_epicenter_vein",
        "arch_puncher",
        "arch_support",
        "arch_formless",
        "arch_formless",
        "arch_formless",
        "arch_formless",
        "arch_formless_enraged",
        "arch_formless_enraged",
    ], // array of enemy actors returned by function
    initAllyTeam: ()=> {
        team = page.party.filter(m=>["gakvu", "cavik", "bozko"].includes(m.slug))
        team.push(
            {
                slug: "telyu",
                name: "Telyu",
                hp: 25,
                combatActor: "telyu"
            },
            {
                slug: "tozik",
                name: "Tozik",
                hp: 25,
                combatActor: "tozik_npc"
            }
        )
        return team
    },
    
    teamAlterations: {
        ally: [["ADD", "win"], ["STATUS", "desperation"]],
        gakvu: [["scene_gakvu_attack", "scene_gakvu_attack_desperation"]],
        cavik: [["scene_cavik_attack", "scene_cavik_attack_desperation"], ["ADD", "bomb_plant"], ["ADD", "special_bomb_detonate"]],
        bozko: [["scene_bozko_attack", "scene_bozko_attack_desperation"]]
    },

    bgm: () => {
        if(!page.finaleSong) page.finaleSong = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/finale.ogg'],
            preload: true,
            loop: true,
            sprite: {
                __default: [5, 999999999, true]
            }
        })

        return page.finaleSong
    },
    bgmRate: 1,

    combatClass: "ep4scene finale hall",
    hardOpen: true,
    startCallback: ()=> {
        env.rpg.bossProgress = 5
        env.rpg.classList.add("tendrilveal")

        
        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType["damagetile-left"], 
            effect: "scene_edge",
            length: 999,
            data: {
                direction: "right"
            }
        })

        
        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType["damagetile-right"], 
            effect: "scene_edge",
            length: 999,
            data: {
                direction: "left"
            }
        })
    },
    manualStop: true,
    manualStopCallback: (loser)=> {
        if(loser.name == "ally") env.grm.startRetryOffer()
            else startDialogue("vekoa_p6")
    },
    retry: () => env.grm.defaultRetry(),
    turnCallback: (actor)=> {
        if(actor.team.name == "enemy" && env.rpg?.lastActor?.team?.name == "ally") {
            
            let possible = [...env.rpg.grid.tilesByType["downshoot"]]
            let selected = [possible.sample({remove: true}), possible.sample({remove: true}), ]
        
            env.rpg.grid.createTileEffect({
                tiles: selected, 
                effect: "projectile_itzka",
                anchorType: "tile",
                data: {
                    turnTickType: "ally",
                    direction: "down"
                }
            })
        }

        if(env.rpg.actorList.filter(a=>a.originalSlug.startsWith("destructible_split_tendril")).length == 0) {
            startDialogue("vekoa_p6")
        } else {
            if(env.rpg.enemyTeam.members.length < 3 && !env.rpg.actors.destructible_split_tendril_3) {
                env.rpg.halt = true

                let selection = ["arch_formless_enraged"]
                for (let i = 0; i < 6; i++) {
                    midCombatActorAdd(env.rpg.enemyTeam, selection.sample(), "right", {location: "respawn"})
                }

                play("dull")

                env.rpg.effectMessage.action({
                    user: actor,
                    target: actor,
                    isMinor: true,
                    action: `more shapes spring forth from the ceremony...`
                })

                if(!env.rpg.callout && env.rpg.actors.cavik.state != "dead") {
                    env.rpg.callout = true
                    env.rpg.actors.cavik.piece.focusOnTile()
                    rpgDialogue(env.rpg.actors.cavik, "she's making more...", true, 2000)
                    setTimeout(()=>rpgDialogue(env.rpg.actors.cavik, "just push ahead!!", true, 4000), 2000)
                    setTimeout(() => {
                        env.rpg.halt = false
                        if(env.rpg.haltedAttempt) advanceTurn()
                    }, 4000);
                } else {
                    env.rpg.halt = false
                    if(env.rpg.haltedAttempt) advanceTurn()
                }
            }
        }
    },
    actorSpriteProcess: (actor)=> console.log("sprite", actor),

    //SCENARIO STAGE INFO
    width: 7,
    plan: `
        ?..N..!
        ?vvvvv!
        ?░░░░░!
        ?░░░░░!
        ?░░░░░!
        9░░3░░0
        ?+░░░+!
        ?░░░+░!
        ?░+░░░!
        ?░░░░░!
        ?░░░+░!
        ?+░░░░!
        ?░░░░+!
        9░░2░░0
        ?♠+♠+♠!
        ?+♠+♠+!
        ?♠+♠+♠!
        ?+++++!
        ?+♥+♥+!
        ?+♥♥♥+!
        ?+++++!
        .^^^^^.
        .......
        .......
        .......
        .......
        ...e...
    `,
    entities: {
        "1": {
            class: "blocks los",
            contains: {
                html: "<div class='proptest'>LOS</div>"
            }
        },

        "N": { 
            class: "northdril blocks notile combatprop", 
            spawnPoint: "destructible_epicenter_vein" 
        },

        "e": { class: "center notile", 
            contains: {
            class: "marbletable coreholder",
            dyp: {
                width: 10,
                height: 10,
                image: "url(/img/local/embassy/mind/corewarp.gif?)",
                transform: `rotateX(90deg) translateZ(1px)`,
                }
            }
        },

        "♥": { spawnPoint: "ally" },
        "♠": { spawnPoint: "enemy"},
        '!': { class: "notile damagetile-right"},
        '?': { class: "notile damagetile-left"},
        '0': { class: "notile damagetile-right blocks"},
        '9': { class: "notile damagetile-left blocks"},
        '^': { class: "notile blocks upshoot" },
        'v': { class: "downshoot" },
        '+': { class: "basic respawn" },

        "2": { 
            spawnPoint: "destructible_split_tendril_3"
        },

        "3": { 
            spawnPoint: "destructible_split_tendril_4"
        },
 
    }
}

CombatScene.SCENARIOS['ep4_vek_pt6'] = {
    initEnemyTeam: ()=> [ "vekoa_1v1", "vekoa_eye" ], 
    initAllyTeam: ()=> page.party.filter(m=>["akizet"].includes(m.slug)), 

    bgm: () => {
        if(!page.solaFinaleMelee) page.solaFinaleMelee = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/solafinale.ogg'],
            preload: true,
            loop: true,
            volume: 1,
            sprite: {
                __default: [5, 134250, true]
            }
        })

        return page.solaFinaleMelee
    },

    bgmRate: 1,
    combatClass: "finale vek1v1 pt4",
    hardOpen: true,
    startCallback: ()=> {
        env.rpg.bossProgress = 6
        env.rpg.turnOrder = [env.rpg.turnOrder[0], env.rpg.turnOrder[0], env.rpg.turnOrder[1], env.rpg.turnOrder[1], env.rpg.turnOrder[2]]
        env.rpg.currentActorIndex = env.rpg.turnOrder.length - 1
        env.rpg.actors.akizet.move = 1
        env.rpg.actors.akizet.hp = 15
        env.rpg.actors.vekoa_eye.npc = true

        env.rpg.actors.vekoa_1v1.sprite.querySelector('img').src = "/img/sprites/vekoa/vekoaspec_activefreak.gif";
        env.rpg.actors.vekoa_1v1.sprite.classList.add('freakmode')

        env.rpg.actors.vekoa_1v1.actions = ["tele_vekoa_rampage", "vekfight_assault", "special_vekoa_rush"]
        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 999,
            origin: env.rpg.actors.vekoa_eye
        })
    },

    manualStop: true,
    manualStopCallback: (loser)=> {
        if(loser.name == "ally") {
            env.bgm.intendedRate = 0.75
            ratween(env.bgm, 0.75)
            change("PAGE!!akizetblunder", true)
            setTimeout(()=>{
                startDialogue("vekoaboss_clear")
            }, 2000)
        }
    },
    retry: () => env.grm.defaultRetry(),
    
    turnCallback: (actor, prevActor)=> {
        if(env.rpg.enemyTeam.members.every(m=>m.state == "lastStand")) {
            env.rpg.halt = true
            startDialogue("vekoaboss_clear")
        } else {
            CombatScene.SCENARIOS["ep4_heart"].coolHeartMechanicIStealForTheFinaleAlsoLol(actor, prevActor)
        }
    },
    
    teamAlterations: {
        ally: [
            ["REMOVE", "akizet_attack"], 
            ["REMOVE", "scene_akizet_attack"], 
            ["REMOVE", "scene_frenzy"], 
            ["REMOVE", "scene_evade"], 
            ["ADD", "vekfight_assault"], 
            ["ADD", "vekfight_rush"],
            ["ADD", "win"],
            ["STATUS", "desperation"],
        ]
    },

    //SCENARIO STAGE INFO
    width: 11,
    plan: `
        ,,vvvvvvv,,
        ,,!!!!!!!,,
        >!!░░░░░!!<
        >!░░░░░░░!<
        >!░░111░░!<
        >!♥░1e1░░!<
        >!♠░111░░!<
        >!░░░░░░░!<
        >!!░░░░░!!<
        ,,!!!!!!!,,
        ,,^^^^^^^,,
    `,
    entities: {
        "░": { class: "basic safetile", },
        "♥": { spawnPoint: "ally", class: 'basic' },
        "♠": { spawnPoint: "enemy", class: 'basic'},
        "e": { spawnPoint: "vekoa_eye" },
        '!': { class: "notile damagetile"}, // obstacle

        "_": { class: "notile blocks" },
        "^": { class: "notile blocks upface upshoot"},
        "v": { class: "notile blocks downface downshoot"},
        ">": { class: "notile blocks rightface rightshoot"},
        "<": { class: "notile blocks leftface leftshoot"},

        
        "1": { class: "blocks los notile" },
        '?': { class: "basic"},

        "e": { class: "center notile coretile", spawnPoint: "vekoa_eye", 
            contains: {
            class: "marbletable coreholder",
            dyp: {
                width: 4,
                height: 4,
                image: "url(/img/local/embassy/mind/corewarp.gif?)",
                transform: `rotateX(90deg) translateZ(1px)`,
                }
            }
        },
    }
}

CombatScene.SCENARIOS['epitest'] = {
    initEnemyTeam: ()=> [
        "vekoa_epicenter_projectile",
    ],
    initAllyTeam: ()=> [     
        
        {
            slug: "gakvu",
            name: "Gakvu",
            combatActor: "gakvu",
            class: "Inquisitive Technician",
            hp: 10,
        },
        
        {
            slug: "gakvu",
            name: "Gakvu",
            combatActor: "bozko",
            class: "Inquisitive Technician",
            hp: 10,
        },
    ], 

    combatClass: "ep4scene",

    bgm: () => {
        if(!page.finaleSong) page.finaleSong = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/finale.ogg'],
            preload: true,
            loop: true,
            sprite: {
                __default: [5, 999999999, true]
            }
        })

        return page.finaleSong
    },
    
    teamAlterations: {
        ally: [["STATUS", "stun"]]
    },

    //SCENARIO STAGE INFO
    width: 9,
    plan: `
        ...░♥░...
        ..♥░░░♥..
        .♥░░░░░♥.
        ░░░...░░░
        ░░░.e.░░░
        ░░░...░░░
        .░░░░░░░.
        ..░░░░░..
        ...░░░...
    `,
    entities: {
        "1": {
            class: "blocks los",
            contains: {
                html: "<div class='proptest'>LOS</div>"
            }
        },

        "♥": { spawnPoint: "ally" },
        "♠": { spawnPoint: "enemy" },
        "e": { spawnPoint: "vekoa_epicenter_projectile" },
        '!': {slug: '.', class: "notile damagetile"} // obstacle
    }
}


/* ep4 ing revisit intro stuff... the 'ingtro'... */
CombatScene.SCENARIOS['ep4_ingtro_1'] = {
    initEnemyTeam: ()=> [
        "arch_puncher_tutorial",
    ],
    initAllyTeam: ()=> page.party.filter(m=>["akizet"].includes(m.slug)), 

    bgm: () => {
        if(!page.solaCombat) page.solaCombat = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/solacombat.ogg'],
            preload: true,
            loop: true,
            volume: 1,
            rate: 0.9,
            sprite: {
                __default: [5, 107920, true]
            }
        })
        return page.solaCombat
    },
    bgmRate: 0.5,
    bgmStart: 62,
    combatClass: "ep4scene introscene",
    startCallback: ()=> {
        if(!page.retryingP1 && page.name == "pale-halls") env.rpg.classList.add("fpv", "hideteams");
        setTimeout(()=>{env.rpg.setGridProperty("--playercontrol-rotation", `-90deg`);env.rpg.setGridProperty("--playercontrol-tilt", `-45deg`)}, 25)

        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 99
        })
    },

    manualStop: true,
    manualStopCallback: (loser)=> {
        if(loser.name == "enemy") {
            startDialogue("lesser_attack2")
        }
        else env.grm.startRetryOffer()
    },
    retry: () => env.grm.defaultRetry(() => page.retryingP1 = true),
    nogame: () => { startDialogue("combatadjust", {specificChain: "nogame"}) }, //used only in bugout protection
    
    teamAlterations: {
        ally: [["ADD", "win"]]
    },

    //SCENARIO STAGE INFO
    width: 7,
    plan: `
        111e111
        1^1░1^1
        111♠111
        e░░!░░e
        e░░c░░e
        e░░!░░e
        111A111
        1^1░1^1
        111e111
    `,
    entities: {
        "1": {
            class: "blocks los notile",
        },

        "^": {
            class: "blocks los prop notile",
            contains: {
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

        "♥": { spawnPoint: "ally" },
        "♠": { spawnPoint: "enemy" },
        "A": { spawnPoint: "akizet" },
        "T": { spawnPoint: "ceremony_tendril_plus" },
        'c': {
            class: "basic center", 
        },
        "e": { class: "basic notile damagetile" },
        "!": { class: "basic warppoint" }
    }
}

CombatScene.SCENARIOS['ep4_ingtro_2'] = {
    initEnemyTeam: ()=> [
        "arch_sniper",
        "arch_sniper",
        "arch_puncher",
        "arch_support",
        "ceremony_tendril_plus",
    ],
    initAllyTeam: ()=> page.party.filter(m=>["akizet", "bozko", "cavik"].includes(m.slug)),

    bgm: () => {
        if(!page.solaCombat) page.solaCombat = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/solacombat.ogg'],
            preload: true,
            loop: true,
            volume: 1,
            rate: 0.8,
            sprite: {
                __default: [5, 107920, true]
            }
        })
        return page.solaCombat
    },
    bgmRate: 0.7,
    combatClass: "ep4scene introscene",
    startCallback: ()=> {
        setTimeout(()=>{env.rpg.setGridProperty("--playercontrol-rotation", `-45deg`);env.rpg.setGridProperty("--playercontrol-tilt", `-30deg`)}, 25)

        env.rpg.enemyTeam.members.forEach(m=>{ // a little reduction
            if(m.base.slug != "ceremony_tendril_plus" && m.base.slug != "arch_puncher") m.hp = Math.floor(m.hp * 0.5)
        })
        updateStats()

        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 99
        })
    },

    hardOpen: true,
    manualStop: true,
    manualStopCallback: (loser)=> {
        if(loser.name == "enemy") startDialogue("lesser_attack3")
        else env.grm.startRetryOffer()
    },

    turnCallback: () => {
        let tendril = env.rpg.enemyTeam.members.find(e=>e.base.slug == "ceremony_tendril_plus")
        if(!tendril || tendril?.hp == 0) {
            env.rpg.halt = true
            startDialogue("lesser_attack3")            
        }
    },

    retry: () => env.grm.defaultRetry(),
    nogame: () => { startDialogue("lesser_attack3", {specificChain: "nogame"}) }, //used only in bugout protection
    
    teamAlterations: {
        ally: [["ADD", "win"]]
    },

    //SCENARIO STAGE INFO
    width: 11,
    plan: `
        ee░S░T░S░ee
        eee░░s░░eee
        eeee░u░eeee
        e111░░░111e
        e1^1e░e1^1e
        e111e░e111e
        eeee░░░eeee
        eee░░░░░eee
        e░░░░░░░░░e
        e░░░░░░░░░e
        e░░♥░♥░♥░░e
        e░░░111░░░e
        eeee1^1eeee
    `,
    entities: {
        "1": {
            class: "blocks los notile",
        },

        "R": { spawnPoint: "rift_item" },

        "^": {
            class: "blocks los prop notile",
            contains: {
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

        "♥": { spawnPoint: "ally" },
        "♠": { spawnPoint: "enemy" },
        "u": { spawnPoint: "arch_puncher" },
        "S": { spawnPoint: "arch_sniper" },
        "s": { spawnPoint: "arch_support" },
        "O": { 
            contains: {
                actor: "destructible_table"
            }
        },
        'c': {slug: 'c', class: "blocks nevertile center"},
        "e": { class: "basic notile damagetile" },
        "T": { spawnPoint: "ceremony_tendril_plus" },
    }
}

CombatScene.SCENARIOS['ep4_ingtro_3'] = {
    initEnemyTeam: ()=> [
        "arch_bomber",
        "arch_bomber",
        "arch_bomber",
        "ceremony_tendril_plus",
        "ceremony_tendril_plus",
    ],
    initAllyTeam: ()=> page.party.filter(m=>["gakvu", "miltza", "ikgolem"].includes(m.slug)),

    bgm: () => {
        if(!page.solaCombat) page.solaCombat = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/solacombat.ogg'],
            preload: true,
            loop: true,
            volume: 1,
            rate: 0.8,
            sprite: {
                __default: [5, 107920, true]
            }
        })
        return page.solaCombat
    },
    bgmRate: 0.85,
    combatClass: "ep4scene introscene",
    startCallback: ()=> {
        setTimeout(()=>{env.rpg.setGridProperty("--playercontrol-rotation", `135deg`);env.rpg.setGridProperty("--playercontrol-tilt", `-30deg`)}, 25)

        env.rpg.enemyTeam.members.forEach(m=>{ // a little reduction
            if(m.base.slug == "ceremony_tendril_plus") m.hp = 20
        })

        updateStats()

        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 99
        })
    },

    hardOpen: true,
    manualStop: true,

    turnCallback: () => {
        let tendril = env.rpg.enemyTeam.members.filter(e=>e.base.slug == "ceremony_tendril_plus")
        if(!tendril.length || tendril.every(e=>e.hp == 0)) {
            env.rpg.halt = true
            startDialogue("lesser_attack4")            
        }
    },
    
    manualStopCallback: (loser)=> {
        if(loser.name == "enemy") startDialogue("lesser_attack4")
        else env.grm.startRetryOffer()
    },
    retry: () => env.grm.defaultRetry(),
    nogame: () => { startDialogue("lesser_attack4", {specificChain: "nogame"}) }, //used only in bugout protection
    
    teamAlterations: {
        ally: [["ADD", "win"]]
    },

    //SCENARIO STAGE INFO
    width: 11,
    plan: `
        eeee1^1eeee
        eeee111eeee
        eee░B░░░eee
        eeu░░░░░░ee
        eT░░░░░░░░e
        e░u░░░░░░░e
        eu░░♥♥♥░░ue
        e░░░░░░░u░e
        e░░░░░░░░Te
        ee░B░░░░uee
        eee░░░B░eee
        eeee111eeee
        eeee1^1eeee
    `,
    entities: {
        "1": {
            class: "blocks los notile",
        },

        "^": {
            class: "blocks los prop notile",
            contains: {
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

        "♥": { spawnPoint: "ally" },
        "♠": { spawnPoint: "enemy" },
        "u": { spawnPoint: "arch_formless" },
        "B": { spawnPoint: "arch_bomber" },
        "O": { 
            contains: {
                actor: "destructible_table"
            }
        },
        'c': {slug: 'c', class: "blocks nevertile center"},
        "e": { class: "basic notile damagetile" },
        "T": { spawnPoint: "ceremony_tendril_plus", class: "basic notile damagetile" },
    }
}

CombatScene.SCENARIOS['ep4_sping'] = { //i was gonna write ep4_spine_ing but i laughed
    initEnemyTeam: ()=> [
        "spine_archivist_ing",
        "ceremony_tendril_plus",
        "ceremony_tendril_plus",
        "ceremony_tendril_plus",
    ], 
    initAllyTeam: ()=> page.party.filter(m=>!["ikgolem"].includes(m.slug)).slice(0, -2), 

    bgm: () => {
        if(!page.solaRisen) page.solaRisen = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/solarisen.ogg'],
            preload: true,
            loop: true,
            volume: 1,
            sprite: {
                __default: [5, 145600, true]
        }})

        return page.solaRisen
    },
    bgmRate: 1,
    combatClass: "ep4scene spinelift",
    startCallback: ()=> {        
        flash(true);setTimeout(()=>{startDialogue("archivist");flash(false)}, 1000)
        env.bgm.rate(0.2)

        // decide who gets the 'greeting'
        // there'll always be at least one of these three present
        let greeter = env.rpg.allyTeam.members.filter(m => ["akizet", "cavik", "tozik"].includes(m.slug)).sample()
        change("PAGE!!archivistgreeter", greeter.slug)
        change("PAGE!!archivistgreeteristozik", greeter.slug == "tozik")

        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 99
        })
        setTimeout(()=>{env.rpg.setGridProperty("--playercontrol-rotation", `45deg`);env.rpg.setGridProperty("--playercontrol-tilt", `-30deg`)}, 25)

        env.rpg.archivistCutscene = (step) => { 
            let archivist = env.rpg.actors.spine_archivist_ing

            switch(step) {
                case 1:
                    archivist.piece.focusOnTile()
                break

                case 2: // archivist drops down to fight
                    env.rpg.p2 = true
                    env.rpg.classList.remove('spinelift')
                    archivist.noHPDisplay = false
                    delete archivist.statusImmunities
                    archivist.piece.focusOnTile()
                    removeStatus(archivist, "shroud", {forceRemoveStatus: true})
                    addStatus({target: archivist, status: "stun_immune", length: 2, force: true})

                    env.rpg.grid.tilesByType['spineholder'][0].querySelector('.dyp').remove()
                    env.rpg.grid.tilesByType['spineholder'][0].classList.remove("notile", "untargetable")
                    env.rpg.grid.tilesByType.los.forEach(tile=>tile.classList.remove("hardblock", "blocks", "los", "notile"))

                    env.rpg.grid.tilesByType.falloffintodamage.forEach(tile=>{
                        tile.classList.add("notile", "damagetile")
                        tile.classList.remove("blocks")
                    })
                    
                    env.rpg.grid.createTileEffect({
                        tiles: env.rpg.grid.tilesByType.falloffintodamage, 
                        effect: "scene_edge",
                        length: 99
                    })

                    archivist.maxhp = 160
                    archivist.hp = archivist.maxhp
                    archivist.lastStand = false
                    archivist.state = "living"
                    archivist.box.classList.remove("last-stand")

                    archivist.actions = archivist.defenseActions
                    updateStats(archivist)

                    env.rpg.archivistDropped = true
                break

                case 3: // all tendrils are broken but the archivist is still up. remove all other enemies
                    env.rpg.p3 = true
                    
                    if(archivist.hp) {
                        archivist.move = 3
                        env.bgm.intendedRate = 1.1
                        ratween(env.bgm, 1.1)
                        archivist.sprite.classList.add("archivist-mega")
                        archivist.sprite.querySelector('img').src = "/img/sprites/combat/foes/archivist2.gif"
                        archivist.actions = archivist.lastStandActions
                        addStatus({target: archivist, status: "carapace", length: 2, force: true})
                        addStatus({target: archivist, status: "stun_immune", length: 2, force: true})
                    }

                    env.rpg.enemyTeam.members.filter(enemy=>enemy.slug != archivist.slug).forEach(m=>m.hp = 0)
                    env.rpg.allyTeam.members.forEach(m=>{
                        if(hasStatus(m, "story_targeted")) removeStatus(m, "story_targeted")
                    })
                    updateStats()
                    setTimeout(()=>env.rpg.removePendingPieces(), 500)

                    env.rpg.classList.add("megawarp")
                    env.rpg.classList.remove('ep4scene')
                break
            }
        }

        let archivist = env.rpg.actors.spine_archivist_ing
    },

    endCallback: (loser)=> {
        if(loser.name == "ally") env.grm.startRetryOffer();
        else page.name == "pale-halls" ? startDialogue("spine_clear") : false // account for loss
    },
    
    retry: () => env.grm.defaultRetry(),
    nogame: () => { startDialogue(env.rpg.p2 ? "archivist2" : "archivist", {specificChain: "nogame"}) }, //used only in bugout protection
    
    turnCallback: (actor)=> {
        if(env.rpg.turnData.turn == 0) return;
        if(env.rpg.allyTeam.members.filter(m=>m.state != "dead").length == 0) { return console.log("all allies are dead") }
        if(!env.rpg.halt && !env.currentDialogue?.active) { // means it's already doing something
            if(!env.rpg.p2 && (env.rpg.tendrilsKilled >= 2 || env.rpg.enemyTeam.members.filter(m=>m.base.slug == "spine_keeper_ing").length == 0)) { console.log("halting for p2"); env.rpg.halt = true; startDialogue("archivist2") }
            else if(!env.rpg.p3 && env.rpg.actors.spine_archivist_ing.hp == 0) { console.log("halting for p3a"); env.rpg.halt = true; startDialogue("archivist3b") }
            else if(!env.rpg.p3 && env.rpg.tendrilsKilled >= 3) { console.log("halting for p3b"); env.rpg.halt = true; startDialogue("archivist3a") }
        }
    },

    teamAlterations: {
        ally: [["ADD", "win"]]
    },

    //SCENARIO STAGE INFO
    width: 19,
    plan: `
        ........e*e........
        ........░░░........
        ........░░░........
        ........░░░........
        ........░░░........
        ...C.,,,░F░,,,.C...
        .....,▓▓▓▓▓▓▓,.....
        .....,▓▓▓▓▓▓▓,.....
        e░░░░░▓▓111▓▓░░░░░e
        (░░░░F▓▓1♠1▓▓F░░░░&
        e░░░░░▓▓111▓▓░░░░░e
        .....,▓▓▓▓▓▓▓,.....
        .....,▓▓▓▓▓▓▓,.....
        ...C.,,,♥░♥,,,.C...
        ........♥♥♥........
        ........░░░........
        ........░░░........
        ........░░░........
        ........eee........
    `,
    entities: {
        "1": {
            class: "blocks los notile centermatrix",
        },

        "F": {
            class: "basic firstspawn",
            spawnPoint: "spine_keeper_ing"
        },

        "░": {class: "basic safetile"}, // regular ground tile
        "▓": {class: "basic safetile centermatrix"},
        "e": { class: "basic notile damagetile unsafe falloff" }, 

        "♥": { spawnPoint: "ally" },

        "(": { class: "basic notile damagetile unsafe falloff tendril1", spawnPoint: "ceremony_tendril_plus" }, 
        "*": { class: "basic notile damagetile unsafe falloff tendril2", spawnPoint: "ceremony_tendril_plus" }, 
        "&": { class: "basic notile damagetile unsafe falloff tendril3", spawnPoint: "ceremony_tendril_plus" }, 

        "♠": { 
            spawnPoint: "spine_archivist_ing", 
            class: "center centermatrix spineholder notile untargetable",
            contains: {
                class: "spinecolumn",
                dyp: {
                    image: 'url(/img/local/embassy/mind/spinering.gif)',
                    width: 6,
                    height: 6,
                    noback: true,
                    style: "background-size: 100% 100%;bottom: unset;"
                }
            }
        },

        "C": {
            class: "notile hidelow untargetable blocks",
            contains: {
                html: "<div class='spinepool-actor warp'></div>",
                dyp: {
                    image: 'transparent',
                    width: 3,
                    height: 3,
                    style: "transform: translateZ(-1px);bottom: unset;pointer-events: none;"
                }
            }
        },

        ",": { class: "blocks notile falloffintodamage" }
    }
}


CombatScene.SCENARIOS['ep4_heart_ing_old'] = {
    initEnemyTeam: ()=> [
        "heart_parasite",
        "destructible_heart_wall_inner",
        "destructible_heart_wall_outer",
        "heart_tendril",
        "heart_tendril",
        "heart_tendril",
    ], 
    initAllyTeam: ()=> page.party.filter(m=>!["ikgolem"].includes(m.slug)).slice(0, -2), 

    bgm: () => {
        if(!page.saiikoCombat) page.saiikoCombat = new Howl({
            onload: function () {
                page.howls.push(this)
            },
            src: ['/audio/saiikocombat.ogg'],
            preload: true,
            loop: true,
            volume: 0.8,
            rate: 0.9,
            sprite: {
                __default: [5, 174500, true]
            }
        })
        return page.saiikoCombat
    },
    bgmVol: 0.8,
    bgmRate: 0.9,
    combatClass: "ep4scene",

    startCallback: ()=> {
        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 99
        })
        setTimeout(()=>{env.rpg.setGridProperty("--playercontrol-rotation", `45deg`);env.rpg.setGridProperty("--playercontrol-tilt", `-30deg`)}, 25)
    },

    endCallback: (loser)=> { // ing todo - update with heart stuff
        if(loser.name == "ally") env.grm.startRetryOffer();
        else page.name == "pale-halls" ? startDialogue("heart_clear") : false // account for loss
    },
    
    retry: () => env.grm.defaultRetry(),
    nogame: () => { startDialogue(env.rpg.p2 ? "archivist2" : "archivist", {specificChain: "nogame"}) }, //used only in bugout protection
    
    turnCallback: (actor)=> {
        if(env.rpg.phase2 && !env.rpg.updatedActions) {
            env.rpg.updatedActions = true
            env.rpg.enemyTeam.members.forEach(m=>{
                if(m.base.slug == "heart_tendril") m.actions = m.phase2Actions
            })
        }
    },

    teamAlterations: {
        ally: [["ADD", "win"]]
    },

    //SCENARIO STAGE INFO
    width: 13,
    plan: `
        eee^ee^ee^eee
        e░░░░░░░░░░░e
        e░T░░░T░░░T░e
        <CCC░░░░░CCC>
        e░░░░░H░░░░░e
        e░░░░░h░░░░░e
        <░T░░░c░░░T░>
        e░░░░░░░░░░░e
        e░░░░░░░░░░░e
        <CCC♥♥░♥♥CCC>
        e░T░░♥T♥░░T░e
        e░░░░░░░░░░░e
        eeeveeveeveee
    `,
    entities: {
        "c": {
            class: "center",
            spawnPoint: "heart_parasite",
            contains: {
                html: `<figure>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </figure>`,
                dyp: {
                    class: "pyramid pyrasol heartspike noveins",
                    width: 3,
                    height: 3,
                    image: "transparent",
                    transform: "rotateX(180deg) translateY(-25%)"
                }
            } 
        },
        
        "h": {
            spawnPoint: "destructible_heart_wall_inner",
        },
        
        "H": {
            spawnPoint: "destructible_heart_wall_outer",
        },

        "░": {class: "safetile"},
        "e": { class: "basic notile damagetile unsafe" },

        "^": { class: "notile upzone damagetile unsafe", spawnPoint: "heart_tendril" },
        "v": { class: "notile downzone damagetile unsafe"},
        ">": { class: "notile rightzone damagetile unsafe"},
        "<": { class: "notile leftzone damagetile unsafe"},

        "C": { contains: { actor: "destructible_box" } }, 
        "♥": { spawnPoint: "ally" },
        "T": { class: "basic tendril" },
    }
}


CombatScene.SCENARIOS['ep4_heart_ing'] = {
    initEnemyTeam: ()=> [
        "heart_parasite",
        "heart_siphon",
        "heart_siphon",
        "heart_siphon",
        "heart_siphon",
    ], 
    initAllyTeam: ()=> page.party.filter(m=>!["ikgolem"].includes(m.slug)).slice(0, -2), 

    bgm: () => {
        if(!page.saiikoCombat) page.saiikoCombat = new Howl({
            onload: function () {
                page.howls.push(this)
                this.intendedVol = 0.8
            },
            src: ['/audio/saiikocombat.ogg'],
            preload: true,
            loop: true,
            volume: 0.8,
            rate: 0.9,
            sprite: {
                __default: [5, 174500, true]
            }
        })
        return page.saiikoCombat
    },
    bgmVol: 0.8,
    bgmRate: 0.9,
    combatClass: "ep4scene",

    startCallback: ()=> {
        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 99
        })
        setTimeout(()=>{env.rpg.setGridProperty("--playercontrol-rotation", `45deg`);env.rpg.setGridProperty("--playercontrol-tilt", `-30deg`)}, 25)
    },

    endCallback: (loser)=> { // ing todo - update with heart stuff
        if(loser.name == "ally") env.grm.startRetryOffer();
        else page.name == "pale-halls" ? startDialogue("heart_clear") : false // account for loss
    },
    
    retry: () => env.grm.defaultRetry(),
    nogame: () => { startDialogue(env.rpg.p2 ? "archivist2" : "archivist", {specificChain: "nogame"}) }, //used only in bugout protection
    
    turnCallback: (actor)=> {
        if(env.rpg.phase2 && !env.rpg.updatedActions) {
            env.rpg.updatedActions = true
            env.rpg.enemyTeam.members.forEach(m=>{
                if(m.base.slug == "heart_tendril") m.actions = m.phase2Actions
            })
        }
    },

    teamAlterations: {
        ally: [["ADD", "win"]]
    },

    //SCENARIO STAGE INFO
    width: 13,
    plan: `
        eeeeeeeeeeeee
        eT░░░░░░░░░Te
        e░░░░░░░░░░░e
        e░░░░░░░░░░░e
        e░░░░░░░░░░░e
        e░░░░░░░░░░░e
        e░░░░░c░░░░░e
        e░░░░░░░░░░░e
        e░░░░░░░░░░░e
        e░░░♥♥░♥♥░░░e
        e░░░░░░░░░░░e
        eT░░░░░░░░░Te
        eeeeeeeeeeeee
    `,
    entities: {
        "c": {
            class: "center",
            spawnPoint: "heart_parasite",
            contains: {
                html: `<figure>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </figure>`,
                dyp: {
                    class: "pyramid pyrasol heartspike noveins",
                    width: 3,
                    height: 3,
                    image: "transparent",
                    transform: "rotateX(180deg) translateY(-25%)"
                }
            } 
        },

        "░": {class: "safetile"},
        "e": { class: "basic notile damagetile unsafe" },
        "♥": { spawnPoint: "ally" },
        "T": { class: "basic tendril damagetile unsafe", spawnPoint: "heart_siphon" },
    }
}

CombatScene.SCENARIOS['ep4_split_1_ing'] = {
    initEnemyTeam: ()=> [
        "destructible_split_wall", 
        "destructible_split_wall",
        "ceremony_tendril_plus_split",
    ], // array of enemy actors returned by function
    initAllyTeam: ()=> page.party.filter(m=>["tozik", "miltza", "cavik"].includes(m.slug)),
    bgm: () => {
        if(!page.saiikoCombat2) page.saiikoCombat2 = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/saiikocombat2.ogg'],
            preload: true,
            loop: true,
            volume: 1,
            sprite: {
                __default: [5, 205650, true]
        }})

        return page.saiikoCombat2
    },
    
    bgmRate: 0.9,
    bgmVol: 0.9,
    combatClass: "ep4scene",
    startCallback: ()=>{
        setTimeout(()=>{env.rpg.setGridProperty("--playercontrol-rotation", `-45deg`);env.rpg.setGridProperty("--playercontrol-tilt", `-45deg`)}, 25)
    },

    endCallback: (loser)=> {
        if(loser.name == "ally") env.grm.startRetryOffer()
    },
    
    retry: () => {
        env.grm.defaultRetry()
    },
    nogame: () => { startDialogue("split_connect", {specificChain: "nogame"}) }, //used only in bugout protection

    turnCallback: (actor)=> {
        if(env.rpg.tendrilsKilled) startDialogue("split_clearhall_ing")
    },
    
    actorSpriteProcess: (actor)=> console.log("sprite", actor),
    
    teamAlterations: {
        ally: [["ADD", "win"]]
    },

    //SCENARIO STAGE INFO
    width: 5,
    plan: `
        ..D..
        ░░T░░
        ░░░░░
        ░░░░░
        ░░░░░
        e░░░e
        ░░░░B
        B░░BB
        ░░O░░
        ░░░░░
        e░BBe
        ░░░░░
        BB░░░
        ░░░BB
        ░░░░░
        e░░░e
        ░░░░░
        ░░░░░
        ░░O░░
        ░░░░░
        ░B░░░
        ░░░░░
        ░♥♥♥░
        ░░░░░
        ░░░░░
        ░░♠░░
        ..d..
    `,
    entities: {        
        "1": { 
            class: "stage1 notile fakegap",
            spawnPoint: "destructible_split_tendril_1"
        },

        "♥": { spawnPoint: "ally" },
        "♠": { spawnPoint: "enemy" },
        
        "D": {
            class: "notile blocks",
            contains: {
                dyp: {
                    width: 2.5,
                    height: 2.5,
                    image: "url(/img/local/embassy/mind/mindoorfade_warp1.gif)",
                    noback: true
                }
            }
        },
        
        "d": {
            class: "notile blocks",
            contains: {
                dyp: {
                    class: "backdoor",
                    width: 2.5,
                    height: 2.5,
                    image: "url(/img/local/embassy/mind/mindoorfadelocked_warp1.gif)",
                    noback: true,
                    transform: `rotateY(180deg) translateZ(50px)`
                }
            }
        },

        "e": {
            contains: { actor: "destructible_adull" }
        },
        "O": { 
            spawnPoint: "destructible_split_wall",
        },
        "B": {
            contains: { 
                actor: "destructible_box"
            }
        },
        "T": { 
            spawnPoint: "ceremony_tendril_plus_split" 
        },
    }
}

CombatScene.SCENARIOS['ep4_split_2_ing'] = {
    initEnemyTeam: ()=> [
        "split_miltza",
        "vekoa_boss",
        "destructible_spineroot",
        "destructible_spineroot",
        "destructible_spineroot",
        "destructible_spineroot",
    ], // array of enemy actors returned by function
    initAllyTeam: ()=> page.party.filter(m=>["tozik", "miltza", "cavik"].includes(m.slug)), 

    teamAlterations: {
        ally: [["ADD", "win"]]
    },

    bgm: () => {return env.grm.music_runningoutoftime}, 
    bgmStart: 20,
    bgmRate: 0.7,
    combatClass: "ep4scene",
    startCallback: ()=> {
        env.rpg.halt = true
        env.rpg.actors.cavik.hp = env.rpg.actors.cavik.maxhp

        env.rpg.actors.split_miltza.piece.classList.add('hide')
        env.rpg.actors.vekoa_boss.piece.classList.add('hide')

        env.rpg.actors.cavik.specialReactions = env.COMBAT_REACTIONS.perturbed

        //for calling in cutscene
        env.rpg.createDamageTiles = ()=> {
            if(env.rpg.madeTiles) return;
            env.rpg.grid.createTileEffect({
                tiles: env.rpg.grid.tilesByType.damagetiletobe, 
                effect: "scene_edge",
                length: 999
            })
            env.rpg.grid.tilesByType.damagetiletobe.forEach(tile=>tile.classList.add('damagetile'))
            env.rpg.grid.tilesByType.damageTile = env.rpg.grid.tilesByType.damagetiletobe
            env.rpg.madeTiles = true
        }

        env.rpg.uppies = env.rpg.querySelectorAll("combat-actor[for='tozik'], .deadtainer, .spinecolumn")

        env.rpg.up1 = () => env.rpg.uppies.forEach(e => {
            e.classList.add('lift-ready')
            setTimeout(()=>e.classList.add('lifting'), 1000)
        })

        env.rpg.up2 = () => env.rpg.uppies.forEach(e => {
            setTimeout(() => {
                if(env.rpg.actors.tozik) midCombatActorRemove(env.rpg.actors.tozik)
                e.remove()
            }, 5000);
        })

        env.rpg.refresh = () => {
            env.rpg.classList.add("refresh-anim")
            setTimeout(()=>env.rpg.classList.remove("refresh-anim"), 10)
        }

        //for final cutscene
        env.rpg.burnEverything = ()=>{
            let basicTiles = [... env.rpg.grid.tilesByType.basic]
            let safeTilesForCutscene = env.rpg.grid.markTiles({ originTile: env.rpg.actors.cavik.piece.tile, shape: "square", size: 2, includesOrigin: true})
            let cutsceneFireTiles = basicTiles.filter(tile=> !safeTilesForCutscene.includes(tile) )

            env.rpg.grid.createTileEffect({
                tiles: cutsceneFireTiles, 
                effect: "chemical_fire",
            })
        }

        if(!page.solaMiltzaCombat) page.solaMiltzaCombat = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/solamiltza.ogg'],
            preload: true,
            loop: true,
            volume: 1,
            sprite: {
                __default: [5, 168640, true]
        }})

        page.solaMiltzaCombat.intendedRate = 0.9

        //this is kind of an elaborate setup so skpping the intro takes a lil work
        env.rpg.miltzaSkipState = () => {
            env.rpg.halt = true
            env.rpg.actors.cavik.piece.moveToCoords(2, 8, {follow: false})
            env.rpg.actors.split_miltza.piece.moveToCoords(12, 7, {follow: false})
            env.rpg.actors.split_miltza.piece.classList.remove('hide')

            if(env.rpg.actors.miltza) midCombatActorRemove(env.rpg.actors.miltza, {fast: true})
            if(env.rpg.actors.tozik) midCombatActorRemove(env.rpg.actors.tozik, {fast: true})
            if(env.rpg.actors.vekoa_boss) midCombatActorRemove(env.rpg.actors.vekoa_boss, {fast: true})
            if(!env.bgm._src.includes("solamiltza")) toggleBgm(page.solaMiltzaCombat, false)

            env.rpg.uppies.forEach(e=>e.remove())

            env.rpg.actors.cavik.piece.focusOnTile()
            env.rpg.setCam()
            env.rpg.classList.remove('hideteams')
            env.rpg.classList.add("fearmode", "darkwobble", "miltzamode")
            env.rpg.querySelectorAll('.movable').forEach(t=>t.classList.remove('movable'))
            env.rpg.actors.split_miltza.piece.moveToCoords(12, 7)
            updateStats()

            if(!env.rpg.madeTiles) env.rpg.createDamageTiles()

            env.rpg.enemyTeam.members.filter(m=>m.base.slug=="destructible_spineroot").forEach(m=>addStatus({target: m, status: "bomb_volatile"}))

            setTimeout(() => {
                env.rpg.currentActorIndex = 1
                env.rpg.currentActor = env.rpg.actors.split_miltza
                env.rpg.halt = false
                removeStatus(env.rpg.actors.cavik, "terror")
                advanceTurn()
                env.rpg.actors.cavik.highlight(true)
                if(check("gameplay_off")) {
                    env.rpg.halt = true; 
                    startDialogue("spine_miltza_nogame")
                }
            }, 3000)
        }

        env.rpg.gakvuDies = () => {
            env.rpg.actors.split_miltza.sprite.classList.add('autosize')
            env.rpg.actors.split_miltza.sprite.querySelector('img').style.filter = ""
            env.rpg.actors.split_miltza.sprite.querySelector('img').style.width = "175px"
            env.rpg.actors.split_miltza.sprite.querySelector('img').src = "/img/sprites/obesk/miltza/gakvusdeadbodygakvudiesinepisode4.gif?4"
        }

        env.rpg.telyuDrop = () => {
            if(!env.rpg.lastDrop) env.rpg.lastDrop = -1000
            if((env.rpg.turnData.turn - env.rpg.lastDrop > 6)) {
                let positions = [
                    env.rpg.grid.getTileFromCoordinates(3, 7),
                    env.rpg.grid.getTileFromCoordinates(7, 3),
                    env.rpg.grid.getTileFromCoordinates(7, 11),
                    env.rpg.grid.getTileFromCoordinates(7, 9),
                    env.rpg.grid.getTileFromCoordinates(5, 7),
                    env.rpg.grid.getTileFromCoordinates(7, 5),
                    env.rpg.grid.getTileFromCoordinates(9, 7),
                    env.rpg.grid.getTileFromCoordinates(11, 7)
                ].filter(t => !t.piece)

                for(let i = 0; i < 2; i++) {
                    let position = positions.sample({remove: true})
                    if(position) {
                        let tiles = env.rpg.grid.markTiles({
                            originTile: position,
                            size: 1,
                            shape: "circle",
                            includesOrigin: true
                        })

                        env.rpg.grid.createTileEffect({
                            tiles, 
                            length: 2,
                            origin: env.rpg.actors.cavik,
                            effect: "telegraph",
                            telegraphExec: (telEffect) => {
                                let targets = telEffect.tiles.map(p=>p?.piece?.actor).filter(a=>a)
                                if(targets.length) env.GENERIC_ACTIONS.teamWave({
                                    arbitraryActorList: targets,
                                    exec: (actor, i) => {
                                        playCombatCrit("crit", 0.5)
                                        if(actor.team.name == "enemy") {
                                            addStatus({target: actor, status: "stun", length: 1})
                                        }

                                        if(actor.piece) actor.piece.knockback({ 
                                            direction: telEffect.originTile.getRelativeDirection(actor.piece.tile), 
                                            strength: actor.team.name == "enemy" ? 6 : 2
                                        })
                                    },
                                })
                                setTimeout(() => {
                                    midCombatActorAdd(env.rpg.neutralTeam, "destructible_volatile", "right", {location: "specificTile", specificTile: telEffect.originTile})                                
                                }, 100)
                            },
                            telegraphAnim: "telegraph",
                            originTile: position
                        })
                    }
                }

                env.rpg.lastDrop = env.rpg.turnData.turn
            }
        }

        env.rpg.randomChatterArray = [
            [
                [env.rpg.actors.cavik, "miltza... why did you..."],
                [env.rpg.actors.split_miltza, "#Æ=°!Ì–N*Ë=W`", 3000],
            ],
            [
                [env.rpg.actors.cavik, "we can talk!!"],
                [env.rpg.actors.cavik, "please...?", 2000],
                [env.rpg.actors.split_miltza, "Ø…N#Y“›S–ê•", 6000],
            ],
            [
                [env.rpg.actors.split_miltza, "cl o½ se ®±… r", 6000],
            ],
            [
                [env.rpg.actors.cavik, "i do not..."],
                [env.rpg.actors.cavik, "want to do this, miltza, but...", 3000],
                [env.rpg.actors.split_miltza, "F¤RG«-ŒV|…~£Ù%{", 8000],
            ],
        ]

    },

    turnCallback: (actor) => {
        if(!env.rpg.classList.contains("doorincombat")) env.rpg.classList.add("doorincombat")
        if(!env.rpg.phase2) {
            let twisted = env.rpg.actors.split_miltza.hp < env.rpg.actors.split_miltza.maxhp * 0.8

            //on a delay because cavik may die from DoT damage
            //regular phase 2 if you figure out how to damage her
            if(twisted) {
                env.rpg.halt = true

                setTimeout(() => {
                    if(env.rpg.active) {
                        startDialogue("spine_miltzaphase")
                    }
                }, 400)
            } 
            
            //also enter it if you break every root lol
            //not cavik's fault though he's gonna blame you idiot
            else if(!twisted && env.rpg.enemyTeam.members.filter(m=>m.base.slug=="destructible_spineroot").every(m=>m.hp == 0)) {
                env.rpg.halt = true

                setTimeout(() => {
                    if(env.rpg.active) {
                        change("PAGE!!cavikblunder", true)
                        startDialogue("spine_miltzaphase")
                    }
                }, 400)
            }
        } else env.rpg.telyuDrop()

        if(actor.slug == "cavik" && env.rpg.randomChatterArray?.length && !env.rpg.halt && env.rpg?.turnData?.turn > 1) {
            let chatter = env.rpg.randomChatterArray.shift()
            chatter.forEach(c => {
                setTimeout(() => {
                    rpgDialogue(c[0], c[1], true, 8000, true)
                }, c[2] || 0)
            })
        }
    },

    endCallback: (loser)=> {
        env.rpg.miltzaSkipState = false
        if(loser.name == "ally") env.grm.startRetryOffer();
        else page.name == "pale-halls" ? startDialogue("spine_miltzaclear") : false
    },
    
    retry: () => {
        env.grm.defaultRetry(env.grm.skipSpineIntro)
    },
    nogame: () => { startDialogue(env.rpg.phase2 ? "spine_miltzaphase" : "spine_miltza_nogame", {specificChain: "nogame"}) }, //used only in bugout protection

    actorSpriteProcess: (actor)=> console.log("sprite", actor),

    //SCENARIO STAGE INFO
    width: 15,
    plan: `
        ♠♠...VVdVV.....
        .....VVVVV.....
        ..###%░%░%###..
        ..#C#%░%░%#C#..
        ..###%%%%%###..
        //%%%░░░░░%%%,,
        //░░%░░%░░%░░,,
        //%%%░bc%░%%%,D
        //░░%░░%░░%░░,,
        //%%%░░░░░%%%,,
        ..###%%%%%###..
        ..#C#%░%░%#C#..
        ..###%░%░%###..
        .....&&♥&&.....
        .....&1F2&.....
    `,
    entities: { 
        //i.e. downface is on the top side cause it faces down
        //used for effect spawns
        "♠": { spawnPoint: "enemy", class: "nevertile" },
        "♥": { spawnPoint: "ally", class: "damagetiletobe upface" },
        "1": { spawnPoint: "tozik", class: "damagetiletobe upface" },
        "2": { spawnPoint: "miltza", class: "damagetiletobe upface" },

        "V": { class: "basic downface damagetiletobe" },
        "&": { class: "basic upface damagetiletobe" },
        "/": { class: "basic rightface damagetiletobe" },
        ",": { class: "basic leftface damagetiletobe" },
        "%": { class: "basic spytile"},

        "c": { class: "basic center",
            contains: {
                class: "spinecolumn",
                dyp: {
                    image: 'url(/img/local/embassy/mind/spinering.gif)',
                    width: 7,
                    height: 7,
                    noback: true,
                    style: "background-size: 100% 100%;transform: translateZ(1px);bottom: unset;"
                }
            }
        },

        "b": {
            class: "basic boxtainer spytile",
            contains: {
                class: "deadtainer",
                html: `<span></span><span></span><span></span><span></span><span></span>`
            }
        },

        "C": {
            class: "notile",
            spawnPoint: "destructible_spineroot",
            contains: {
                html: "<div class='spinepool'></div>",
                dyp: {
                    image: 'transparent',
                    width: 3,
                    height: 3,
                    style: "transform: translateZ(-1px);bottom: unset;pointer-events: none;"
                }
            }
        },

        "D": { 
            class: "basic leftface damagetiletobe bigdoortainer",
            contains: {
                dyp: {
                    class: "bigdoor",
                    width: 4.5,
                    height: 4.5,
                    image: "url(/img/local/embassy/mind/bigdoor.gif)",
                    noback: true,
                    transform: "translateX(10%) rotateY(-90deg)"
                }
            } 
        },
        
        "d": {
            class: "basic downface damagetiletobe",
            contains: {
                dyp: {
                    width: 2.5,
                    height: 2.5,
                    image: "url(/img/local/embassy/mind/mindoorfadelocked_warp1.gif)",
                    noback: true,
                    transform: "rotateY(-90deg) translateX(-25%) rotateY(90deg)"
                }
            }
        },
        
        "F": {
            class: "basic upface damagetiletobe",
            contains: {
                dyp: {
                    width: 2.5,
                    height: 2.5,
                    image: "url(/img/local/embassy/mind/mindoorfade_warp1.gif)",
                    noback: true,
                    transform: "rotateY(90deg) translateX(-25%) rotateY(90deg)",
                }
            }
        },
        
        "#": {class: "basic roottile notile"},
    }
}

CombatScene.SCENARIOS['ep4_lesserboss_ing'] = {
    initEnemyTeam: ()=> [
        "cutscenedriver",
        //"lesser_kivii_ing",
        //"lesser_itzil_ing",
    ], // array of enemy actors returned by function
    initAllyTeam: ()=> page.party.filter(m=>["akizet", "gakvu", "cavik", "bozko"].includes(m.slug)),

    bgm: () => {
        if(!page.solaRisen) page.solaRisen = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/solarisen.ogg'],
            preload: true,
            loop: true,
            volume: 1,
            sprite: {
                __default: [5, 145600, true]
        }})

        return page.solaRisen
    },
    bgmRate: 0.4,
    combatClass: "ep4scene",

    startCallback: ()=> {          
        env.rpg.lesserSkipState = () => {
            env.rpg.halt = true
            if(!env.rpg.actors.lesser_kivii_ing) midCombatActorAdd(env.rpg.enemyTeam, "lesser_kivii_ing", "left")
            if(!env.rpg.actors.lesser_itzil_ing) midCombatActorAdd(env.rpg.enemyTeam, "lesser_itzil_ing", "left") 
            if(env.rpg.actors.cutscenedriver) midCombatActorRemove(env.rpg.actors.cutscenedriver, {fast: true})

            env.rpg.classList.remove("hideteams")

            setTimeout(() => {
                env.rpg.currentActorIndex = env.rpg.turnOrder.length - 1
                env.rpg.currentActor = env.rpg.turnOrder[env.rpg.currentActorIndex]
                env.rpg.halt = false
                env.rpg.actors.akizet.piece.focusOnTile()

                if(check("gameplay_off")) {
                    env.rpg.halt = true; 
                    startDialogue("lesserboss_nogame")
                }
                
                ratween(env.bgm, 0.8);env.bgm.intendedRate = 0.8;

                advanceTurn()
            }, 2000)
        }

        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 99
        })
        
        env.rpg.phaseChange = ()=>{
            env.rpg.grid.tileEffects.forEach(e=>{
                if(e.slug != "pseudopiece") env.rpg.grid.deleteTileEffect(e)
            })

            env.rpg.actorList.forEach(a=>{
                if(a.base.slug == "destructible_bomb" || a.base.slug == "lesser_kivii_gauntlet") midCombatActorRemove(a, {fast: true})
            })

            env.rpg.mainDamageEffect = env.rpg.grid.createTileEffect({
                tiles: env.rpg.grid.tilesByType.realdamage, 
                effect: "scene_edge",
                length: 99
            })

            env.rpg.grid.tilesByType.tempdamage.forEach(t=>t.classList.remove("notile", "damagetile"))

            setTimeout(()=>{
                setTimeout(()=>{
                    midCombatActorAdd(env.rpg.enemyTeam, "lesser_itzka")
                }, 400)

                setTimeout(()=>{
                    env.rpg.actors.lesser_itzka.piece.moveToTile(env.rpg.grid.tilesByType.center[0])
                }, 1000)

                midCombatActorRemove(env.rpg.actors.lesser_kivii_ing, {fast: true})
                midCombatActorRemove(env.rpg.actors.lesser_itzil_ing, {fast: true})
            }, 100)
        }
    },

    endCallback: (loser)=> {
        env.rpg.lesserSkipState = false
        if(loser.name == "ally") env.grm.startRetryOffer()
    },
    
    retry: () => {
        env.grm.defaultRetry(env.grm.skipLesserBossIntro)
    },
    nogame: () => { startDialogue(env.rpg.actors.lesser_itzka ? "lesserboss_phase" : "lesserboss_nogame", {specificChain: "nogame"}) }, //used only in bugout protection
    
    turnCallback: (actor)=> {
        if(!env.rpg.enemyTeam.members.every(m=>m.state == "lastStand")) return;

        env.rpg.halt = true

        startDialogue("lesserboss_phase")
    },
    actorSpriteProcess: (actor)=> console.log("sprite", actor),
    
    teamAlterations: {
        ally: [
            ["ADD", "win"]
        ],
    },

    //SCENARIO STAGE INFO
    width: 15,
    plan: `
        eeeeeee^eeeeeee
        e░░░░░░░░░░░░░e
        e♥♥░░░░░░░░░░░e
        o♥♥░░░░░░░░░░☺O
        e♥♥░░░░░░░░░░░e
        e░░░░░░░░░░░░░e
        e░111░EEE░111░e
        <░1p1░EKE░1p1░>
        e░111░EEE░111░e
        e░░░░░░I░░░░░░e
        e░111░111░111░e
        e░1p1░1p1░1p1░e
        e░111░111░111░e
        e░░░░░░░░░░░░░e
        eeeeeeeveeeeeee
    `,  //this row is a bonus area where dozka hides
    entities: {
        "1": {
            class: "noborder fakelos pseudofade"
        },
        
        "o": {
            class: "basic notile damagetile realdamage",
            contains: {
                dyp: {
                    width: 2.5,
                    height: 2.5,
                    image: "url(/img/local/embassy/mind/mindoorfade_lost.gif)",
                    noback: true,
                    transform: "translateX(-25%) rotateY(90deg)"
                }
            }
        },
        
        "O": {
            class: "basic notile damagetile realdamage",
            contains: {
                dyp: {
                    width: 2.5,
                    height: 2.5,
                    image: "url(/img/local/embassy/mind/mindoorfade_lost.gif)",
                    noback: true,
                    transform: "translateX(25%) rotateY(-90deg)"
                }
            }
        },

        "e": { class: "basic notile damagetile realdamage" },
        "E": { class: "basic notile damagetile tempdamage" },

        "p": { class: "noborder pseudofade", contains: { actor: "destructible_lesserpod" } },

        "I": { spawnPoint: "lesser_itzil_ing" },
        "K": { class: "center basic notile damagetile", spawnPoint: "lesser_kivii_ing" },

        "☺": { spawnPoint: "cavik" },
        "♥": { spawnPoint: "ally" },

        "^": { class: "notile upzone damagetile realdamage" },
        "v": { class: "notile downzone damagetile realdamage"},
        ">": { class: "notile rightzone damagetile realdamage"},
        "<": { class: "notile leftzone damagetile realdamage"},
    }
}

CombatScene.SCENARIOS['ep4_vek_pt1_ing'] = {
    initEnemyTeam: ()=> [
        "destructible_epicenter_vein",
        "finale_eye"
    ], // array of enemy actors returned by function
    initAllyTeam: ()=> page.party.filter(m=>["akizet", "gakvu", "cavik", "bozko"].includes(m.slug)),
    
    teamAlterations: {
        ally: [["ADD", "win"], ["STATUS", "desperation"]],
        cavik: [["ADD", "tele_directbeam"]],
    },

    bgm: () => {
        if(!page.finaleSong) page.finaleSong = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/finale.ogg'],
            preload: true,
            loop: true,
            sprite: {
                __default: [5, 999999999, true]
            }
        })

        return page.finaleSong
    },

    bgmStart: 0,
    bgmRate: 1,
    combatClass: "ep4scene finale finale",
    startCallback: ()=> {
        env.rpg.bossProgress = 0
        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 999
        })

        env.rpg.clearCavikSpot = () => {
            if(!env.rpg.actors.cavik.piece) combatRevive(env.rpg.actors.cavik);
            [
                env.rpg.grid.getTileFromCoordinates(8, 14),
                env.rpg.grid.getTileFromCoordinates(8, 15),
                env.rpg.grid.getTileFromCoordinates(8, 16)
            ].forEach((t, i)=>{
                if(t.piece) {
                    let direction
                    switch(i) {
                        case 0: direction = "left"; break
                        case 1: direction = "right"; break
                        case 2: direction = "up"; break
                    }
                    t.piece.knockback({direction, strength: 3, ignoreMods: true})
                }
            })
        }

        env.rpg.p2 = () => {
            env.rpg.grid.tileEffects.forEach(e => {
                if(e.slug != "scene_edge") {
                    env.rpg.grid.deleteTileEffect(e)
                }
            }) 
            
            setTimeout(() => {
                //clear tiles as needed
                let allySpots = [
                    env.rpg.grid.getTileFromCoordinates(8, 15),
                    env.rpg.grid.getTileFromCoordinates(8, 14),
                    env.rpg.grid.getTileFromCoordinates(9, 15),
                    env.rpg.grid.getTileFromCoordinates(7, 15)
                ]
                
                env.rpg.neutralTeam.members.forEach(m=>midCombatActorRemove(m, {fast: true}))
                env.rpg.enemyTeam.members.forEach(m=>m.slug.startsWith("vekqou") ? midCombatActorRemove(m, {fast: true}) : 0)

                //clear ally spot
                allySpots.forEach(tile=>{
                    if(!tile?.piece) return;
                    tile.piece.moveToTile(tile.getTileByRelativity(0, -7))
                })

                //relocate for cutscene
                env.rpg.allyTeam.members.forEach(m=>{
                    if(m.state == "dead") {
                        m.hp = 1
                        combatRevive(m)
                    }
                })

                setTimeout(()=>{
                    env.rpg.actors.cavik.piece.moveToCoords(8, 15)
                    env.rpg.actors.akizet.piece.moveToCoords(8, 14)
                    env.rpg.actors.bozko.piece.moveToCoords(9, 15)
                    env.rpg.actors.gakvu.piece.moveToCoords(7, 15)
                }, 400)


                //clear vekoa cutscene spot
                env.rpg.grid.markTiles({
                    originTile: env.rpg.grid.getTileFromCoordinates(8, 11),
                    shape: "square",
                    size: 2
                }).forEach(tile=>{
                    if(tile?.piece) tile.piece.knockback({direction: "left", strength: 6, ignoreMods: true})
                }) 
            }, 200);

            setTimeout(() => {   
                //this is where we do a lot of cutscene stuff with vekoa
                //spawns in front of the core, where we get some dialogue
                //then ultimately transition to her solo fight pt1
                midCombatActorAdd(env.rpg.enemyTeam, "vekoa_boss")

                env.rpg.grid.tileEffects.forEach(e => {
                    if(e.slug != "scene_edge") {
                        env.rpg.grid.deleteTileEffect(e)
                    }
                }) 
            }, 600)
        }

        
        env.rpg.p2strike = () => {
            //vekoa hits gakvu off to the side, then bozko, cavik, and finally akizet
            playCombatCrit("fear")
            env.rpg.actors.gakvu.piece.knockback({direction:"up-left", strength: 3, follow: false})
            env.rpg.actors.bozko.piece.knockback({direction:"up-right", strength: 3, follow: false})
            env.rpg.actors.cavik.piece.knockback({direction:"up-right", strength: 4, follow: false})
        }
    },
    
    manualStop: true,
    manualStopCallback: (loser)=> {
        if(loser.name == "ally") env.grm.startRetryOffer()
    },
    retry: () => env.grm.defaultRetry(),

    turnCallback: (actor)=> {
        if(env.rpg.bossProgress && env?.rpg?.finalVein.hp === 0) {
            flash(true)
            env.rpg.halt = true
            env.rpg.classList.add('hideteams')
            startDialogue("vekoa_p2")

            env.rpg.enemyTeam.members.forEach(m=>m.slug.startsWith("vekqou") ? midCombatActorRemove(m) : 0)
            env.rpg.enemyTeam.members.forEach(m=>m.slug.startsWith("destructible") ? midCombatActorRemove(m) : 0)

            vfx({type: "flash", state: false, delay: 500})
            
        }
    },

    //SCENARIO STAGE INFO
    width: 17,
    plan: `
        .vvvvvVVNVVvvvvv.
        >....ee░░░ee....<
        >...ee░░░░░ee...<
        >..ee░░░░░░░ee..<
        >.ee░░░░░░░░░ee.<
        >ee░░???????░░ee<
        /e░░░?!!!!!?░░░e,
        /░░░░?!111!?░░░░,
        /░░░░?!1E1!?░░░░,
        /ffff?!111!?░fff,
        /efff?!!!!!?ff░e,
        >eeff???2???ffee<
        >.eef░░░░░░░fee.<
        >..ee░♠♠░♠♠░ee..<
        >...ee♥♥░♥♥ee...<
        >....ee♠♦♠ee....<
        .^^^^^66S66^^^^^.
    `,
    entities: {
        "N": { class: "northdril notile damagetile", spawnPoint: "destructible_epicenter_vein" },
        "S": { class: "southdril notile damagetile",  },
        "♥": { spawnPoint: "ally" },
        "♠": { spawnPoint: "enemy" },
        "♦": { spawnPoint: "vekqou_guard" },
        "f": { spawnPoint: "arch_formless" },

        "2": { spawnPoint: "vekoa_boss", class: "basic dimmer"},

        "e": { class: "basic notile damagetile" },

        "V": { class: "basic notile damagetile aim_down aimtile" },
        "/": { class: "basic notile damagetile aim_right aimtile" },
        ",": { class: "basic notile damagetile aim_left aimtile" },
        "6": { class: "basic notile damagetile aim_up aimtile" },

        "v": { class: "nevertile blocks notile damagetile aim_down aimtile"},
        ">": { class: "nevertile blocks notile damagetile aim_right aimtile" },
        "<": { class: "nevertile blocks notile damagetile aim_left aimtile" },
        "^": { class: "nevertile blocks notile damagetile aim_up aimtile" },

        "E": { class: "center notile", 
            spawnPoint: "finale_eye",
            contains: {
                class: "marbletable coreholder",
                dyp: {
                    width: 5,
                    height: 5,
                    image: "url(/img/local/embassy/mind/corewarp.gif?)",
                    transform: `rotateX(90deg) translateZ(1px)`,
                },
            }
        },

        "1": { class: "blocks notile" },
        "!": { class: "basic notile damagetile", },
        '?': { class: "basic dimmer"},

        'i': {
            class: "los blocks",
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

        'I': {
            class: "los blocks",
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
    }
}

CombatScene.SCENARIOS['ep4_vek_pt2_ing'] = {
    initEnemyTeam: ()=> [
        "vekoa_eye_ing",
        "vekoa_1v1_ing",
    ], // array of enemy actors returned by function
    initAllyTeam: ()=> page.party.filter(m=>["akizet"].includes(m.slug)),

    bgm: () => {
        if(!page.solaFinaleMelee) page.solaFinaleMelee = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/solafinale.ogg'],
            preload: true,
            loop: true,
            volume: 1,
            sprite: {
                __default: [5, 134250, true]
            }
        })

        return page.solaFinaleMelee
    },

    bgmRate: 0.8,
    combatClass: "finale vek1v1",
    hardOpen: true,
    
    startCallback: ()=> {
        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 999,
            origin: env.rpg.actors.vekoa_eye_ing
        })

        env.rpg.actors.akizet.specialReactions = env.COMBAT_REACTIONS.perturbed
    },
    manualStop: true,
    manualStopCallback: (loser)=> {
        if(loser.name == "ally" && env.rpg.actors.vekoa_1v1_ing.state != "lastStand") env.grm.startRetryOffer();
        else if(env.rpg.actors.vekoa_1v1_ing.state == "lastStand") {
            env.rpg.halt = true
            startDialogue("vekoa_p3")
        }
    },
    retry: () => env.grm.defaultRetry(),
    turnCallback: (actor)=> {
        if(env.rpg.enemyTeam.members.every(m=>m.state == "lastStand")) {
            env.rpg.halt = true
            startDialogue("vekoa_p3")
        }        
    },
    
    teamAlterations: {
        ally: [
            ["ADD", "win"],
            ["STATUS", "desperation"],
        ]
    },

    //SCENARIO STAGE INFO
    width: 13,
    plan: `
        ...vvvvvvv...
        .............
        .....!!!.....
        >...░░♥░░...<
        >..░░░░░░░..<
        >.!░░111░░!.<
        >.!░░1e1░░!.<
        >.!░░111░░!.<
        >..░░░░░░░..<
        >...░░♠░░...<
        .....!!!.....
        .............
        ...^^^^^^^...
    `,
    entities: {
        "♥": { spawnPoint: "ally" },
        "♠": { spawnPoint: "enemy" },
        '!': {slug: '.', class: "notile damagetile"}, // obstacle

        "v": { class: "nevertile notile damagetile aim_down aimtile"},
        ">": { class: "nevertile notile damagetile aim_right aimtile" },
        "<": { class: "nevertile notile damagetile aim_left aimtile" },
        "^": { class: "nevertile notile damagetile aim_up aimtile" },
        
        "1": { class: "blocks los notile centermatrix" },

        "e": { class: "center notile centermatrix", spawnPoint: "vekoa_eye_ing", 
                contains: {
                class: "marbletable coreholder",
                dyp: {
                    width: 4,
                    height: 4,
                    image: "url(/img/local/embassy/mind/corewarp.gif?)",
                    transform: `rotateX(90deg) translateZ(1px)`,
                }
            }
        },
    }
}

CombatScene.SCENARIOS['ep4_vek_pt3_ing'] = {
    initEnemyTeam: ()=> [
        "destructible_epicenter_vein",
        "vekqou_archivist",
        "arch_support",
        "arch_support",
        "arch_support",
    ], // array of enemy actors returned by function
    initAllyTeam: ()=> page.party.filter(m=>["gakvu", "cavik", "bozko"].includes(m.slug)), 
    
    teamAlterations: {
        ally: [["ADD", "win"], ["STATUS", "desperation"]],
        cavik: [["ADD", "tele_directbeam"]],
    },

    bgm: () => {
        if(!page.finaleSong) page.finaleSong = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/finale.ogg'],
            preload: true,
            loop: true,
            sprite: {
                __default: [5, 999999999, true]
            }
        })

        return page.finaleSong
    },

    bgmRate: 1,
    combatClass: "ep4scene finale slice",
    hardOpen: true,
    startCallback: ()=> {
        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 999,
            origin: env.rpg.actors.vekoa_eye
        })

        env.rpg.randomChatterArray = [
            [
                [env.rpg.actors.vekqou_archivist, "˜^è›HD;_¤CHœN¢…'"]
            ],
            [
                [env.rpg.actors.vekqou_archivist, "×˜Œ*—NØW——e{WªÄ³]T"],
            ],
            [
                [env.rpg.actors.vekqou_archivist, "=ÆLL‹ú‰T(Gb8TH£(8R˜"],
            ],
            [
                [env.rpg.actors.vekqou_archivist, "F¤RGÄŒV|…y~£Ù%{"],
            ],
            [
                [env.rpg.actors.vekqou_archivist, "¤„S¾4<.ÝYø–¬U"],
                [env.rpg.actors.vekqou_archivist, "|:Sõ¸ø¼—n", 5000],
            ],
        ]

        removeStatus(env.rpg.actors.destructible_epicenter_vein0, "finale_vein", {forceRemoveStatus: true})
        addStatus({target: env.rpg.actors.destructible_epicenter_vein0, status: "archivist_split_focus_finale_subject"})
        addStatus({target: env.rpg.actors.destructible_epicenter_vein0, status: "shroud"})
    },
    manualStop: true,
    manualStopCallback: (loser)=> {
        if(loser.name == "ally") env.grm.startRetryOffer();
        else startDialogue('vekoa_p4')
    },
    retry: () => env.grm.defaultRetry(()=>startDialogue('vekoa_p3')),
    turnCallback: (actor) => {

        if(env.rpg.actors.vekqou_archivist.state == "lastStand") {
            //we skip past killing the vein so it can happen in akizet's side            
            env.rpg.halt = true
            startDialogue("vekoa_p4")

        } else if(env.rpg?.turnData?.turn > 5 && env.rpg.currentActor.team.name == "ally" && !env.rpg.tozik) {
            env.rpg.halt = true
            env.rpg.tozik = true
            startDialogue("vekoa_p3_tozik")
        }

        if(actor.slug == "vekqou_archivist" && env.rpg.randomChatterArray?.length && !env.rpg.halt) {
            let chatter = env.rpg.randomChatterArray.shift()
            chatter.forEach(c => {
                setTimeout(() => {
                    rpgDialogue(c[0], c[1], true, 8000, true)
                }, c[2] || 0)
            })
        }
    },

    //SCENARIO STAGE INFO
    width: 19,
    plan: `
        ........_N_........
        .......!!♠!!.......
        ......!!♠a♠!!......
        ....!!!♠░♠░♠!!!....
        ....!♠♠░░A░░♠♠!....
        ...!!♠░♠░░♠░?O!!...
        ...!♠a?░░░░░a♠♠!...
        ..!!♠░░░░a░░░░♠!!..
        .!!♠░░♠a░░░a♠░♠♠!!.
        !!♠tX░░░░░░░░░░♠♠!!
        !a♠♠░♥░░░♥░░░♥♠♠♠a!
        !!!!!!!!!!!!!!!!!!!
        ...................
        ...................
        ...................
        ...................
        .........e.........
    `,
    entities: {
        "1": {
            class: "blocks los",
            contains: {
                html: "<div class='proptest'>LOS</div>"
            }
        },

        "N": { class: "northdril notile blocks combatprop", spawnPoint: "destructible_epicenter_vein" },
        "E": { class: "eastdril notile blocks combatprop", },
        "S": { class: "southdril notile blocks combatprop",  },
        "W": { class: "westdril notile blocks combatprop", },
        "_": { class: "westdril notile blocks", },

        "♥": { spawnPoint: "ally" },
        "♠": { spawnPoint: "enemy" },
        "?": { spawnPoint: "arch_support" },
        "X": { spawnPoint: "arch_support" },
        "A": { spawnPoint: "vekqou_archivist", class: "archivistjump" },
        "a": { spawnpoint: "enemy", class: "basic archivistjump"},
        "P": { class: "basic respawn" },

        "2": { spawnPoint: "vekoa_boss" },
        "C": { class: "basic center" },
        
        "w": { class: "basic", spawnPoint: "vekoa_wall" },
        "T": { class: "basic", spawnPoint: "vekoa_golem" },
        "t": { class: "basic", spawnPoint: "telyu" },
        "O": { class: "basic", spawnPoint: "tozik_npc" },

        "e": { class: "notile blocks", 
            contains: {
            class: "marbletable coreholder",
            dyp: {
                width: 8,
                height: 8,
                image: "url(/img/local/embassy/mind/corewarp.gif?)",
                transform: `rotateX(90deg) translateZ(1px)`,
                }
            }
        },

        '!': { class: "notile damagetile"},

        "V": { class: "basic downface rightface notile damagetile" },
        ",": { class: "basic downface leftface notile damagetile" },
        "&": { class: "basic upface rightface notile damagetile" },
        "/": { class: "basic upface leftface notile damagetile" },

        "U": { class: "basic upface notile damagetile" },
        "L": { class: "basic leftface notile damagetile" },
        "R": { class: "basic rightface notile damagetile" },
        "D": { class: "basic downface notile damagetile" },
    }
}



CombatScene.SCENARIOS['ep4_vek_pt4_ing'] = {
    initEnemyTeam: ()=> [ "vekoa_eye_ing", "vekoa_1v1_ing" ], 
    initAllyTeam: ()=> page.party.filter(m=>["akizet"].includes(m.slug)),

    bgm: () => {
        if(!page.solaFinaleMelee) page.solaFinaleMelee = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/solafinale.ogg'],
            preload: true,
            loop: true,
            volume: 1,
            sprite: {
                __default: [5, 134250, true]
            }
        })

        return page.solaFinaleMelee
    },

    bgmRate: 0.9,
    combatClass: "finale vek1v1",
    hardOpen: true,
    startCallback: ()=> {
        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 999,
            origin: env.rpg.actors.vekoa_eye_ing
        })

        env.rpg.actors.akizet.specialReactions = env.COMBAT_REACTIONS.perturbed
        env.rpg.allowArchbombHitOnEnemies = true
    },
    manualStop: true,
    manualStopCallback: (loser)=> {
        if(loser.name == "ally" && env.rpg.actors.vekoa_1v1_ing.state != "lastStand") env.grm.startRetryOffer();
        else if(env.rpg.actors.vekoa_1v1_ing.state == "lastStand") {
            env.rpg.halt = true
            startDialogue("vekoa_p5")
        }
    },
    retry: () => env.grm.defaultRetry(()=>startDialogue('vekoa_p4')),
    turnCallback: (actor, prevActor)=> {
        if(env.rpg.enemyTeam.members.every(m=>m.state == "lastStand")) {
            env.rpg.halt = true
            startDialogue("vekoa_p5")
        } else {
            CombatScene.SCENARIOS["ep4_heart"].coolHeartMechanicIStealForTheFinaleAlsoLol(actor, prevActor)
        }
    },
    
    teamAlterations: {
        ally: [
            ["ADD", "win"],
            ["STATUS", "desperation"],
        ]
    },

    //SCENARIO STAGE INFO
    width: 13,
    plan: `
        ...vvvvvvv...
        .............
        .....!!!.....
        >...░░░░░...<
        >..░░░░░░░..<
        >.!░░111░░!.<
        >.!░░1e1░░!.<
        >.!░░111░░!.<
        >..░░░♥♠░░..<
        >...░░░░░...<
        .....!!!.....
        .............
        ...^^^^^^^...
    `,
    entities: {
        "♥": { spawnPoint: "ally" },
        "♠": { spawnPoint: "enemy" },
        '!': {slug: '.', class: "notile damagetile"}, // obstacle

        "v": { class: "nevertile notile damagetile aim_down aimtile"},
        ">": { class: "nevertile notile damagetile aim_right aimtile" },
        "<": { class: "nevertile notile damagetile aim_left aimtile" },
        "^": { class: "nevertile notile damagetile aim_up aimtile" },
        
        "1": { class: "blocks los notile centermatrix" },

        "e": { class: "center notile centermatrix", spawnPoint: "vekoa_eye_ing", 
                contains: {
                class: "marbletable coreholder",
                dyp: {
                    width: 4,
                    height: 4,
                    image: "url(/img/local/embassy/mind/corewarp.gif?)",
                    transform: `rotateX(90deg) translateZ(1px)`,
                }
            }
        },
    }
}


CombatScene.SCENARIOS['ep4_vek_pt5_ing'] = {
    initEnemyTeam: ()=> [
        "destructible_split_tendril_3",
        "destructible_split_tendril_4",
        "destructible_epicenter_vein",
        "split_advancer",
        "arch_bomber",
        "arch_bomber",
    ], // array of enemy actors returned by function
    initAllyTeam: ()=> {
        team = page.party.filter(m=>["gakvu", "cavik", "bozko"].includes(m.slug))
        team.push(
            {
                slug: "telyu",
                name: "Telyu",
                hp: 25,
                combatActor: "telyu"
            },
            {
                slug: "tozik",
                name: "Tozik",
                hp: 25,
                combatActor: "tozik_npc"
            }
        )
        return team
    },
    
    teamAlterations: {
        ally: [["ADD", "win"], ["STATUS", "desperation"]],
        cavik: [["ADD", "tele_directbeam"]],
    },

    bgm: () => {
        if(!page.finaleSong) page.finaleSong = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/finale.ogg'],
            preload: true,
            loop: true,
            sprite: {
                __default: [5, 999999999, true]
            }
        })

        return page.finaleSong
    },
    bgmRate: 1,

    combatClass: "ep4scene finale hall",
    hardOpen: true,
    startCallback: ()=> {
        env.rpg.bossProgress = 5
        env.rpg.classList.add("tendrilveal")

        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType["damagetile-left"], 
            effect: "scene_edge",
            length: 999,
            data: {
                direction: "right"
            }
        })
        
        env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType["damagetile-right"], 
            effect: "scene_edge",
            length: 999,
            data: {
                direction: "left"
            }
        })
    },
    manualStop: true,
    manualStopCallback: (loser)=> {
        if(loser.name == "ally") env.grm.startRetryOffer()
            else startDialogue("vekoa_p6")
    },
    retry: () => env.grm.defaultRetry(),
    turnCallback: (actor)=> {
        if(env.rpg.actorList.filter(a=>a.originalSlug.startsWith("destructible_split_tendril")).length == 0) {
            startDialogue("vekoa_p6")
        }
    },
    actorSpriteProcess: (actor)=> console.log("sprite", actor),

    getSceneEdgeLandingTiles: () => {
        let actor = env.rpg.actors.destructible_split_tendril_3 || env.rpg.actors.destructible_split_tendril_4
        
        if(actor) {
            return env.rpg.grid.markTiles({
                originTile: actor.piece.tile,
                shape: "custom",
                customShape: `
                    ..o..
                    xxxxx
                    xxxxx
                    xxxxx
                    xxxxx
                `,
            })
        }
    },

    //SCENARIO STAGE INFO
    width: 7,
    plan: `
        ?..N..!
        ?vvvvv!
        ?░░░░░!
        ?░░░░░!
        ?░░░░░!
        9░░3░░0
        ?+░░░+!
        ?░░░+♠!
        ?░+░░░!
        ?░░░░░!
        ?░░░+░!
        ?+♠░░░!
        ?░░░░+!
        9░░2░░0
        ?+++++!
        ?+++++!
        ?+♥+♥+!
        ?+♥♥♥+!
        ?+++++!
        ?+++++!
        ?+++++!
        .^^1^^.
        .......
        .......
        .......
        .......
        ...e...
    `,
    entities: {
        "N": { 
            class: "northdril blocks notile combatprop", 
            spawnPoint: "destructible_epicenter_vein" 
        },

        "e": { class: "center notile", 
            contains: {
            class: "marbletable coreholder",
            dyp: {
                width: 10,
                height: 10,
                image: "url(/img/local/embassy/mind/corewarp.gif?)",
                transform: `rotateX(90deg) translateZ(1px)`,
                }
            }
        },

        "♥": { spawnPoint: "ally" },
        "1": { spawnPoint: "split_advancer"},
        "♠": { spawnPoint: "enemy"},
        '!': { class: "notile damagetile-right"},
        '?': { class: "notile damagetile-left"},
        '0': { class: "notile damagetile-right blocks"},
        '9': { class: "notile damagetile-left blocks"},
        '^': { class: "notile blocks upshoot" },
        'v': { class: "downshoot" },
        '+': { class: "basic respawn" },

        "2": { 
            spawnPoint: "destructible_split_tendril_3"
        },

        "3": { 
            spawnPoint: "destructible_split_tendril_4"
        },
 
    }
}

CombatScene.SCENARIOS['ep4_vek_pt6_ing'] = {
    initEnemyTeam: ()=> [ "vekoa_eye_ing", "vekoa_1v1_ing" ], 
    initAllyTeam: ()=> page.party.filter(m=>["akizet"].includes(m.slug)), 

    bgm: () => {
        if(!page.solaFinaleMelee) page.solaFinaleMelee = new Howl({
            onload: function () {page.howls.push(this)},
            src: ['/audio/solafinale.ogg'],
            preload: true,
            loop: true,
            volume: 1,
            sprite: {
                __default: [5, 134250, true]
            }
        })

        return page.solaFinaleMelee
    },

    bgmRate: 1,
    combatClass: "finale vek1v1 pt4 pt6",
    hardOpen: true,
    startCallback: ()=> {
        env.rpg.turnOrder = [env.rpg.turnOrder[0], env.rpg.turnOrder[0],  env.rpg.turnOrder[1], env.rpg.turnOrder[2], env.rpg.turnOrder[2]]
        env.rpg.currentActorIndex = env.rpg.turnOrder.length - 1

        env.rpg.actors.vekoa_1v1_ing.sprite.querySelector('img').src = "/img/sprites/vekoa/vekoaspec_activefreak.gif";
        env.rpg.actors.vekoa_1v1_ing.sprite.classList.add('freakmode')

        //env.rpg.actors.vekoa_1v1_ing.actions = ["tele_vekoa_rampage", "vekfight_assault", "special_vekoa_rush"]

        env.rpg.scene_edge = env.rpg.grid.createTileEffect({
            tiles: env.rpg.grid.tilesByType.damagetile, 
            effect: "scene_edge",
            length: 999,
            origin: env.rpg.actors.vekoa_eye_ing
        })
        env.rpg.allowArchbombHitOnEnemies = true

        env.rpg.actors.akizet.specialReactions = env.COMBAT_REACTIONS.perturbed

        setTimeout(() => {
            addStatus({target: env.rpg.actors.akizet, status: "empowered", length: 6, noReact: true, runEvents: false, noUpdate: true})
            addStatus({target: env.rpg.actors.akizet, status: "focused", length: 1, noReact: true, noUpdate: true})
            addStatus({target: env.rpg.actors.akizet, status: "evasion", length: 3, noReact: true, runEvents: false, noUpdate: true})            
        }, 200)
    },

    manualStop: true,
    manualStopCallback: (loser)=> {
        if(loser.name == "ally") {
            env.bgm.intendedRate = 0.75
            ratween(env.bgm, 0.75)
            change("PAGE!!akizetblunder", true)
            setTimeout(()=>{
                startDialogue("vekoaboss_clear")
            }, 2000)
        }
    },
    retry: () => env.grm.defaultRetry(),
    
    turnCallback: (actor, prevActor)=> {
        if(env.rpg.enemyTeam.members.every(m=>m.state == "lastStand")) {
            env.rpg.halt = true
            startDialogue("vekoaboss_clear")
        } else {
            CombatScene.SCENARIOS["ep4_heart"].coolHeartMechanicIStealForTheFinaleAlsoLol(actor, prevActor)
        }
    },
    
    teamAlterations: {
        ally: [
            ["ADD", "win"],
            ["STATUS", "desperation"],
        ]
    },

    //SCENARIO STAGE INFO
    width: 13,
    plan: `
        ...vvvvvvv...
        .............
        ...!!!!!!!...
        >.!!░░░░░!!.<
        >.!░░░░░░░!.<
        >.!░░111░░!.<
        >.!♥░1e1░░!.<
        >.!♠░111░░!.<
        >.!░░░░░░░!.<
        >.!!░░░░░!!.<
        ...!!!!!!!...
        .............
        ...^^^^^^^...
    `,
    entities: {
        "♥": { spawnPoint: "ally" },
        "♠": { spawnPoint: "enemy" },
        '!': {slug: '.', class: "notile damagetile"}, // obstacle

        "v": { class: "nevertile notile damagetile aim_down aimtile"},
        ">": { class: "nevertile notile damagetile aim_right aimtile" },
        "<": { class: "nevertile notile damagetile aim_left aimtile" },
        "^": { class: "nevertile notile damagetile aim_up aimtile" },
        
        "1": { class: "blocks los notile centermatrix" },

        "e": { class: "center notile centermatrix", spawnPoint: "vekoa_eye_ing", 
                contains: {
                class: "marbletable coreholder",
                dyp: {
                    width: 4,
                    height: 4,
                    image: "url(/img/local/embassy/mind/corewarp.gif?)",
                    transform: `rotateX(90deg) translateZ(1px)`,
                }
            }
        },
    }
}