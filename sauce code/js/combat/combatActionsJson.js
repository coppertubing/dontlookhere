
/*
    duration: ms duration of animation
    type: sprite/screen
    exec: (action, origin, target) { should end by doing action.exec() }
*/
if(typeof env.COMBAT_ANIMS == "undefined") env.COMBAT_ANIMS = {
    shoot: { //a symbol appears on sprite, spins, then resolves
        duration: 400,
        type: "sprite",
        exec: (action, origin, target)=>{
            //animations are done on the box if no sprite
            let zone = target.sprite || target.box
            
            play('click1')
            zone.insertAdjacentHTML('beforeend', `<div class="special-anim-shoot ${target.slug}-shot"></div>`)
            env.rpg.querySelectorAll(`#ally-team .actor#${target.slug}, #enemy-graphic #${target.slug}-sprite-wrapper`).forEach(el=>el.insertAdjacentHTML('beforeend', `<div class="special-anim-shoot ${target.slug}-shot"></div>`))

            //conclude by running action exec
            let duration = 400
            setTimeout(()=>{
                console.log('removing now')
                zone.querySelectorAll(`.special-anim-shoot.${target.slug}-shot`).forEach(el=> el.remove())
            }, duration * 2)
        }
    },
    
    flare: { //a symbol appears on sprite, spins, then resolves
        duration: 250,
        type: "sprite",
        exec: (action, origin, target)=>{
            //animations are done on the box if no sprite
            let zone = target.sprite || target.box

            zone.insertAdjacentHTML('beforeend', `<div class="special-anim-flare ${target.slug}-shot"></div>`)
            env.rpg.querySelectorAll(`#ally-team .actor#${target.slug}, #enemy-graphic #${target.slug}-sprite-wrapper`).forEach(el=>el.insertAdjacentHTML('beforeend', `<div class="special-anim-flare ${target.slug}-shot"></div>`))

            //conclude by running action exec
            setTimeout(()=>{
                //console.log('removing now')
                zone.querySelectorAll(`.special-anim-flare.${target.slug}-shot`).forEach(el=> el.remove())
            },  500)
        }
    },


    // new animation type that lets us do cool stuff on da grid
    telegraph: {
        duration: 2000,
        type: "tile", // affecting tiles. used only in 2D
        exec: async function ({strikeLogic, tileEffect}) {
            let tiles = [...tileEffect.tiles] //bc we use them in a timeout after removal

            //console.log("trying for", strikeLogic, tileEffect)
            for (let tile of tiles) { tile.classList.add('telegraphing') }
            //console.log("waiting", performance.now())
            await wait(1000)
            //console.log("done waiting", performance.now())
            if(strikeLogic) strikeLogic() // does whatever you want at the 'peak' of the animation

            env.setTimeout(() => {
                for (let tile of tiles) {
                    tile.classList.remove('telegraphing')
                }
            }, 0)

            env.rpg.grid.deleteTileEffect(tileEffect)
            
            await wait(1000)
        }
    },

    archtelegraph: {
        duration: 2500,
        type: "tile", // affecting tiles. used only in 2D
        exec: async function ({strikeLogic, tileEffect}) {
            let tiles = [...tileEffect.tiles]

            await wait(500)

            for (let tile of tiles) { tile.classList.add('archtelegraph') }
            await wait(400)
            if(strikeLogic) strikeLogic()

            await wait(1600)
            env.setTimeout(() => {
                for (let tile of tiles) {
                    tile.classList.remove('archtelegraph')
                }
            }, 0)

            env.rpg.grid.deleteTileEffect(tileEffect)
            
            await wait(800)
        }
    },

    harasserBlink: {
        duration: 2000,
        type: "tile", // affecting tiles. used only in 2D
        exec: async function ({strikeLogic, tileEffect}) {
            if(tileEffect?.origin?.state != "living" || tileEffect?.anchorActor?.state != "living") {
                env.rpg.grid.deleteTileEffect(tileEffect)
                return
            }
            let user = tileEffect.origin
            let target = tileEffect.anchorActor

            play("talkfairy", 0.75)
            user.piece.teleportToTile(target.piece.tile.getClosestOpenTile(), {follow: true, instant: true})

            await wait(1000)

            if(strikeLogic) strikeLogic(); // assumes you set things up here before charging

            if(user.hauntedTileEffect) env.rpg.grid.deleteTileEffect(user.hauntedTileEffect)

            await wait(1000)
        }
    },

    charge: {
        duration: 4000,
        type: "tile", // affecting tiles. used only in 2D
        exec: async function ({strikeLogic, tileEffect}) {
            let user = tileEffect.origin

            console.log('entering charge with data',
                user?.selfMark,
                user?.targetMark?.tiles,
                user?.piece
            )

            if(!user.selfMark || !user?.targetMark?.tiles[0] || !user.piece) {
                if(user.selfMark) env.rpg.grid.deleteTileEffect(user.selfMark);
                if(user.targetMark) env.rpg.grid.deleteTileEffect(user.targetMark);
                if(user.charge) env.rpg.grid.deleteTileEffect(user.charge)
                return
            }

            if(strikeLogic) strikeLogic(); // assumes you set things up here before charging
            
            //note this doesn't consider path which is probably going to cause issues
            env.rpg.allowFailedPathfinding = true
            if(user?.targetMark?.tiles[0]) user.piece.stepToTile(user.targetMark.tiles[0].getClosestOpenTile())
            env.rpg.allowFailedPathfinding = false
            
            await wait(3000)

            if(user.selfMark) env.rpg.grid.deleteTileEffect(user.selfMark)
            if(user.targetMark) env.rpg.grid.deleteTileEffect(user.targetMark)
            if(user.charge) env.rpg.grid.deleteTileEffect(user.charge)
        }
    },

    heartbash: {
        duration: 2500,
        type: "tile", // affecting tiles. used only in 2D
        exec: async function ({strikeLogic, tileEffect}) {
            env.rpg.stopMessages = true
            env.rpg.classList.add('heartbash-transition')
            env.rpg.grid.extraAnimator.classList.add('shake-anim')
            env.rpg.grid.style.setProperty("--playercontrol-rotation-raw", tileEffect.data.rotation)
            env.rpg.grid.style.setProperty("--playercontrol-tilt-raw", 60)
            env.rpg.setCam({x: 5, y: 5, distance: 10, height: -2})

            await wait(700)
            
            if(strikeLogic) strikeLogic();
            playCombatCrit("shot5", 0.5);
            env.rpg.grid.deleteTileEffect(tileEffect)
            env.rpg.grid.extraAnimator.classList.remove('shake-anim')
            
            await wait(1200)
            env.rpg.classList.remove('heartbash-transition')
            await wait(100)
            env.rpg.grid.realgrid.style.removeProperty("--personal-offset")
            await wait(500)
            env.rpg.stopMessages = false
            env.rpg.setCam()
        }
    },

    bombtoss: {
        type: "exchange", // going from one character to another. used only in 2D
        exec: async function ({strikeLogic, originXY, targetXY, action, origin, target}) {
            play("miss", 1)

            if(origin.sprite) {
                origin.sprite.classList.add(action.anim)
                setTimeout(function(){
                    origin.sprite.classList.remove(action.anim)
                }, 600)
            }

            let bomb = document.createElement('div')
            bomb.classList.add('bombtoss-exchange')
            if(origin.team.name == "enemy") bomb.classList.add('warp')

            //the base position is the target xy so that we can easily animate the explosion there
            //animation basically runs in reverse
            bomb.style.setProperty('--destX', targetXY.x)
            bomb.style.setProperty('--destY', targetXY.y)
            bomb.style.setProperty('--x', originXY.x)
            bomb.style.setProperty('--y', originXY.y)
            if(action.beneficial) bomb.classList.add("friendbomb")
            bomb.innerHTML = "<figure></figure>"
            env.rpg.grid.realgrid.appendChild(bomb)

            //explode after the 500ms anim
            await wait(500)
            bomb.classList.add("exploding")

            //animate the explosion
            await wait(100)
            if (strikeLogic) strikeLogic()
            await wait(300)

            // Clean up the bomb element after the animation
            bomb.remove()
        }
    }
}

if(typeof env.ACTIONS == "undefined") env.ACTIONS = {
    win: {
        slug: "win",
        name: "Win",
        type: 'autohit+hidden',
        desc: "'just win'",
        anim: "",
        help: "win",
        usage: {
            act: "%USER WINS LOL"
        },
        exec: function(user, target) {
            env.rpg.enemyTeam.members.forEach(m=>m.hp=0)
            updateStats()
            return 'nothing'
        }
    },

    nothing: {
        slug: "nothing",
        name: "Nothing",
        type: 'autohit+hidden',
        desc: "'just nothing'",
        anim: "",
        help: "NOTHING",
        usage: {
            act: "%USER IS IDLE"
        },
        exec: function(user, target) {
            return 'nothing';
        }
    },

    cower: {
        slug: "cower",
        name: "Endure",
        type: 'autohit',
        anim: "",
        usage: {
            act: "%USER PUSHES THROUGH THE HORROR"
        },

        details: {
            onUse: `'remove [STATUS::fear]'`,
            flavor: "'focus on what matters'"
        },

        stats: {
            status: {
                fear: {name: "fear", showReference: true}
            }
        },

        exec: function(user, target) {
            removeStatus(user, "fear")
            return 'nothing'
        }
    },

    truly_nothing: { /* no usage tag vs normal nothing. basically works like a stun turn skip*/
        slug: "truly_nothing",
        name: "Nothing",
        type: 'autohit+hidden',
        desc: "'just nothing'",
        anim: "",
        help: "NOTHING",
        range: 10,
        exec: function(user, target) { return 'nothing' }
    },

    evade: {
        slug: "evade",
        name: "Focus",
        type: 'autohit',
        anim: "",
        beneficial: true,

        usage: {
            act: "%USER LOOKS FOR AN OPENING"
        },

        details: {
            onUse: () => `'gain [STATUS::focused] [STATUS::evasion]'`,
            flavor: "'deliberate on the moment and its opportunities'"
        },

        stats: {
            status: {
                evasion: {
                    name: 'evasion',
                    length: 1
                },
                focused: {
                    name: 'focused',
                    length: 1
                },                
            }
        },
        
        exec: function(user, target) {
            play('mend', 0.5);
            addStatus({target: user, status: this.stats.status.evasion.name, length: this.stats.status.evasion.length, noReact: true}); 
            addStatus({target: user, status: this.stats.status.focused.name, length: this.stats.status.focused.length, noReact: true}); 
            return 'nothing';
        },

        disableIf: (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" },
        avoidChaining: true
    },

    skitter: {
        slug: "skitter",
        name: "Skitter",
        type: 'autohit',
        anim: "skitter",
        usage: {
            act: "%USER SKITTERS WILDLY AROUND THE ROOM"
        },
        details: {
            onUse: () => `'gain [STATUS::evasion]'`,
            flavor: "'focus on evading incoming attacks';'hide vulnerabilities'"
        },

        stats: {
            status: {
                evasion: {
                    name: 'evasion',
                    length: 1
                },              
            }
        },
        exec: function(user, target) {
            addStatus({target: user, status: "evasion", length: 1, noReact: true}); 
            return 'nothing';
        },
        avoidChaining: true,
        enemyUsageIf: (actor) => { return actor.hp < actor.maxhp },
        disableIf: (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" }
    },

    malfunction: {
        slug: "malfunction",
        name: "Malfunction",
        type: 'autohit',
        desc: "'suffer from internal deterioration'",
        anim: "skitter",
        help: "-1HP, +1T:VULNERABLE",
        usage: {
            act: "%USER'S SKIN WRITHES"
        },
        acc: 100,
        crit: -1,
        exec: function(user, target) {
            combatHit(user, {amt: 1, acc: this.accuracy, crit: this.crit, origin: user})
            addStatus({target: user, status: "vulnerable", length: 1, noReact: true}); 
            return 'nothing';
        }
    },

    attack: {
        slug: "attack",
        name: "Attack",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER ATTACKS %TARGET",
            crit: "A FRIGHTENING BLOW",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        details: {
            flavor: `'improvise'`,
            onHit: `'[STAT::amt]'`,
        },
        stats: {
            accuracy: .9,
            crit: 0.1,
            amt: 2,
        },
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
            })
        }
    },

    akizet_attack: {
        slug: "akizet_attack",
        name: "Overwhelm",
        type: 'target',
        anim: "basic-attack",

        usage: {
            act: "%USER CHARGES %TARGET",
            crit: "%TARGET IS LEFT REELING",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },

        details: {
            onHit: `'boldly assault for [STAT::amt]'`,
            onCrit: `'inflict immense physical trauma';'[STATUS::stun]'`,
        },

        stats: {
            accuracy: 0.8,
            crit: 0.2,
            amt: 2,
            status: {
                stun: {
                    name: 'stun',
                    length: 1
                }
            }
        },

        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                critStatus: this.stats.status.stun
            })
        }
    },

    eviscerate: {
        slug: "eviscerate",
        name: "Eviscerate",
        type: 'target',
        anim: "basic-attack",
       
        usage: {
            act: "%USER CLAWS AT %TARGET",
            crit: "%TARGET IS TORN APART",
            hit: "%TARGET IS TORN APART",
            miss: "%TARGET RECOILS"
        },

        details: {
            flavor: `'boldly assault target';'target previously inflicted wounds for additional damage'`, 
            onHit: `'strike for [STAT::amt]'`, 
            conditional: `<em>ADD::</em>'[STAT::amt] PER [STATUS::puncture] ON TARGET'`, 
        },
        
        stats: {
            accuracy: 0.8, 
            amt: 1,
            status: { 
                puncture: {
                    name: 'puncture',
                    showReference: true // just for ref
                },

            }
        },
        
        
        exec: function(user, target) {
            let specialAmt = 1 + Math.floor(hasStatus(target, 'puncture'))
            
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                specialAmt
            })
        }
    },

    stab: {
        slug: "stab",
        name: "Stab",
        type: 'target',
        anim: "basic-attack",

        usage: {
            act: "%USER STABS %TARGET",
            crit: "%TARGET IS EVISCERATED",
            hit: "%TARGET BLEEDS SLUDGY CORRU",
            miss: "%TARGET EVADES"
        },

        details: {
            flavor: "'reshape arm into sharpened tendril';'stab target'",
            onHit: `'[STAT::amt] [STATUS::puncture]'`,
            onCrit: ()=> `'puncture vital cystic component for [STATUS::puncture]'${env?.rpg?.is2D ? ";'KB::2'" : ''}`,
        },

        stats: {
            range: 2,
            accuracy: 1,
            crit: 0.1,
            amt: 1,
            status: {
                puncture: {
                    name: 'puncture',
                    length: 3
                }
            }
        },

        targeting: "angular",
        aoe: { 
            size: 2, 
            shape: "line-from",
            canHit: (user, target) => { return true } 
        },
        
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'stab',
                    rate: 1
                },
                critStatus: {
                    name: this.stats.status.puncture.name,
                    length: this.stats.status.puncture.length
                },
                hitStatus: {
                    name: this.stats.status.puncture.name,
                    length: this.stats.status.puncture.length
                }, 
                critExec: ({target})=>{ // has a knockback in combat-scene on crit
                    if(env?.rpg?.is2D) {
                        if(target.piece && user.piece) target.piece.knockback({
                            direction: user?.piece?.tile.getRelativeDirection(target?.piece?.tile), 
                            strength: 2, 
                            onImpact: ()=> play("hit", 0.5)
                        })
                    }
                }
            })
        },
    },

    frenzy: {
        slug: "frenzy",
        name: "Frenzy",
        type: 'target',
        anim: "basic-attack",
        
        usage: {
            act: "%USER STABS %TARGET",
            crit: "%USER JUST KEEPS GOING",
            hit: "%TARGET BLEEDS SLUDGY CORRU",
            miss: "%TARGET EVADES"
        },

        details: {
            flavor: "'puncture vital cystic component';'may inspire additional stabbing'",
            onHit: `'[STAT::amt] [STATUS::puncture]'`,
            onCrit:`'use this action again'`,
        },

        stats: {
            accuracy: .7,
            crit: 0.1,
            amt: 1,
            status: {
                puncture: {
                    name: 'puncture',
                    length: 2
                }
            },
        },

        exec: function(user, target, beingUsedAsync, {actionMessageIndex} = {}) {
            let action = this
            return env.GENERIC_ACTIONS.singleTarget({
                action, 
                user, 
                target,
                hitSfx: {
                    name: 'stab',
                    rate: 1
                },
                critSfx: {
                    name: 'stab',
                    rate: 1.75
                },

                hitExec: ({target}) => {
                    addStatus({target, status: "puncture", length: 2});
                },

                critExec: ({target})=> {
                    if(target.hp > 0 && target.state != "lastStand") {
                        env.setTimeout(()=>{
                            useAction(user, this, target, {beingUsedAsync: true, reason: "frenzy", actionMessageIndex})
                        }, 400)
                    }
                }
            })
        }
    },

    gakvu_attack: {
        slug: "gakvu_attack",
        name: "Scramble",
        type: 'target',
        anim: "basic-attack",
        
        usage: {
            act: "%USER REACHES TOWARDS %TARGET",
            crit: "%TARGET'S COMPONENTS ARE EXPOSED",
            hit: "%TARGET'S FLESH MELTS AWAY",
            miss: "%TARGET RESISTS CONTROL"
        },

        details: {
            flavor: `'melt corrucystic flesh';'may reveal weakness'`,
            onHit: `'[STAT::amt]'`,
            onCrit: `'inflict [STATUS::vulnerable]'`,
        },

        stats: {
            accuracy: 0.9, 
            crit: 0.2,
            amt: 2,
            status: {
                vulnerable: {
                    name: 'vulnerable',
                    length: 2
                }
            }
        },
        
        exec: function(user, target, beingUsedAsync) {
            if(env.rpg.classList.contains("tutorialgolem")) change("PAGE!!earlygak", true)
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: env.rpg.currentActor.slug != "gakvu" ? {
                    name: 'destabilize',
                    rate: 2,
                    volume: 0.25
                } : {
                    name: 'destabilize',
                    rate: 2
                },
                critStatus: this.stats.status.vulnerable
            })
        },

        //EP4 stats
        range: 3,
        ignoresBlocks: true,
        ignoresLOS: true,
        aoe: { 
            size: 1, 
            shape: "circle",
            canHit: (user, target) => { return target.team.name != user.team.name} 
        },
    },

    countercall: {
        slug: "countercall",
        name: "Countercall",
        type: 'target',
        anim: "basic-attack",
    
        usage: {
            act: "%USER REACHES TOWARDS %TARGET",
            crit: "%TARGET FALLS APART",
            hit: "%TARGET'S FLESH MELTS AWAY",
            miss: "%TARGET RESISTS CONTROL"
        },
    
        details: {
            flavor: `'direct destructive signal'`,
            onHit: "'[STAT::amt] [STATUS::vulnerable]'",
            conditional: "<em>VS DESTABILIZED::</em>'additional [STAT::amt]';'+[STAT::critBonus]CRIT';'[STATUS::stun] on CRIT'",
        },
    
        stats: {
            accuracy: 0.9,
            crit: 0.2,
            critBonus: 0.3,
            amt: 2,
            status: {
                vulnerable: {
                    name: 'vulnerable',
                    length: 2
                },
                stun: {
                    name: 'stun',
                    length: 1
                }
            }
        },
    
        exec: function(user, target) {
            let amt = this.stats.amt;
            let crit = this.stats.crit;
    
            if (hasStatus(target, "destabilized")) {
                amt += this.stats.amt;
                crit += this.stats.critBonus;
            }
    
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'destabilize',
                    rate: 1.5
                },
                critStatus: {
                    name: this.stats.status.vulnerable.name,
                    length: this.stats.status.vulnerable.length
                },
                critExec: () => {
                    if (hasStatus(target, "destabilized")) {
                        addStatus({
                            target, 
                            origin: user, 
                            status: this.stats.status.stun.name, 
                            length: this.stats.status.stun.length, 
                            noReact: true
                        }); 
                    }
                }
            });
        }
    },    
    
    destabilize: {
        slug: "destabilize",
        name: "destabilize",
        type: 'target+self+enemyrandom',
        anim: "heal",

        usage: {
            act: "%USER DESTABILIZES %TARGET",
            crit: "%TARGET RIPPLES UNNATURALLY",
            hit: "%TARGET'S FORM WAVERS",
            miss: "%TARGET REMAINS STABLE"
        },

        details: {
            flavor: `'utilize illegal groundsmindry';'alter structure of target'`,
            onHit: `'[STATUS::destabilized]'`,
            onCrit: `'additional [STATUS::destabilized]'`,
            conditional: ()=> checkItem("core_translation") && check("PAGE!!embassy_day", 3.99) ? 
            `<em>SIGNAL INVERTER::</em>'granted extra functionality'\n<em>VS FOES</em>::'[STATUS::vulnerable]'\n<em>VS ALLIES</em>::'[STATUS::evasion]'` : ``
        },

        stats: {
            range: 3,
            autohit: true,
            crit: 0.1,
            status: {
                destabilized: {
                    name: 'destabilized',
                    length: 3
                },
                vulnerable: {
                    name: 'vulnerable',
                    length: 2
                },
                evasion: {
                    name: 'evasion',
                    length: 1
                },
            }
        },
        
        ignoresBlocks: true,
        ignoresLOS: true,
        aoe: { 
            size: 1, 
            canHit: (actor) => { return true } 
        },
        
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: { name: 'destabilize' },
                critSfx: { name: 'destabilize' },
                critStatus: this.stats.status.destabilized,
                hitStatus: this.stats.status.destabilized,
                beneficial: user.team.name == target.team.name, // per @brightcousinkuvi, bypasses redirection only if used intra-team
                hitExec: ({target}) => {
                    if(checkItem("core_translation") && check("PAGE!!embassy_day", 3.99)) {
                        if(target.team.name != user.team.name) {
                            addStatus({target, status: this.stats.status.vulnerable.name, length: this.stats.status.vulnerable.length})
                        } else {
                            addStatus({target, status: this.stats.status.evasion.name, length: this.stats.status.evasion.length})
                        }
                    }
                }
            })
        },
    },

    tozik_attack: {
        slug: "tozik_attack",
        name: "Corruskivi",
        type: 'target',
        anim: "basic-attack",
        
        usage: {
            act: "%USER CLAWS AT %TARGET",
            crit: "%TARGET'S LIFE IS DRAINED AWAY",
            hit: "%TARGET IS SLASHED",
            miss: "%TARGET DODGES"
        },

        details: {
            flavor: `'attack with repair tool';'siphon vital corru'`,
            onHit: `'[STAT::amt]'`,
            onCrit: `'heal nearby allies for [STAT::healHP] [STATUS::regen]'`,
        },

        stats: { // 'base' stats used to modify effective stats. can coexist with legacy stats
            accuracy: 1, 
            crit: 0.3,
            amt: 1,
            healHP: -1,
            range: 2,
            status: {
                regen: {
                    name: 'regen',
                    length: 1
                }
            },

            extraAOE: {
                regenAura: {
                    origin: "self", // primarily used to display range effects rather than in actual attacking/calculation
                    size: 2,
                    shape: 'square',
                    addClass: "beneficial" // added to tiles when displaying range
                }
            }
        },

        exec: function(user, target) {
            if(env.rpg.classList.contains("tutorialgolem")) change("PAGE!!earlytoz", true)

            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'stab',
                    rate: 1.5
                },

                critExec: ()=> {
                    if(env?.rpg?.is2D) {
                        // in 2d, this is a 2-size AOE heal around tozik
                        //this is from before I decided to write scene actions separately from their regular counterparts
                        env.rpg.grid.getAoETargets({
                            tile: user?.piece?.tile, 
                            actor: user,
                            actingOn: "allies",
                            aoeData: {
                                size: this.stats.extraAOE.regenAura.size,
                                shape: this.stats.extraAOE.regenAura.shape
                            },
                            onEachValidTileActor: ({tile, actor}) => {
                                combatHit(actor, {amt: this.stats.heal, origin: user, autohit: true, beneficial: true});
                                addStatus({target: actor, origin: user, status: "regen", length: this.stats.status.regen.length});
                                play('mend')
                            }
                        })
                    } else {
                        env.GENERIC_ACTIONS.teamWave({
                            team: user.team,
                            exec: (actor, i)=>{
                                combatHit(actor, {amt: -1, origin: user, autohit: true, beneficial: true});
                                addStatus({target: actor, origin: user, status: "regen", length: this.stats.status.regen.length});
                                play('mend')
                            }
                        })
                    }
                    
                }
           })
        }
    },

    parasite: {
        slug: "parasite",
        name: "Parasite",
        verb: "parasitize",
        type: 'target',
        anim: "basic-attack",
    
        usage: {
            act: "%USER GRASPS AT %TARGET",
            crit: "%TARGET'S TEAM IS INFESTED",
            hit: "%TARGET IS INFESTED",
            miss: "%TARGET DODGES"
        },

        details: {
            flavor: "'utilize modified repair tool';'tap vital corru of foes to sustain allies'",
            onHit: () => "'[STAT::amt] [STATUS::siphon]'",
            onCrit: () => "'infest oppposing team with [STATUS::siphon]'",
        },
    
        stats: {
            accuracy: 1,
            crit: 0.4,
            amt: 2,
            status: {
                siphon: {
                    name: 'siphon',
                    length: 2,
                }
            }
        },
    
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'stab',
                    rate: 0.75
                },
    
                hitExec: ({target}) => {
                    addStatus({
                        target, 
                        origin: user, 
                        status: this.stats.status.siphon.name, 
                        length: this.stats.status.siphon.length
                    }); 
                },
    
                critExec: () => env.GENERIC_ACTIONS.teamWave({
                    team: user.enemyTeam,
                    exec: (actor, i) => {
                        addStatus({
                            target: actor, 
                            origin: user, 
                            status: this.stats.status.siphon.name, 
                            length: this.stats.status.siphon.length
                        });
                        play('status', 0.75);
                    }
                })
            });
        }
    },
    
    mend: {
        slug: "mend",
        name: "Quick Mend",
        type: 'support+target+self',
        anim: "heal",
        beneficial: true,

        usage: {
            act: "%USER FIXES UP %TARGET",
            crit: "%TARGET FEELS WAY BETTER",
            hit: "%TARGET FEELS BETTER",
            miss: "%TARGET IS TOO SLIPPERY"
        },

        details: {
            onHit: `'[STAT::amt] [STATUS::regen]'`,
        },

        stats: {
            range: 2,
            crit: 0.1,
            autohit: true,
            amt: -2,
            status: {
                regen: {
                    name: 'regen',
                    length: 3
                }
            }
        },
        
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                beneficial: true,
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'mend',
                    rate: 1
                },
                hitStatus: {
                    name: 'regen',
                    length: 3
                },
            })
        },

        // enemy zone
        avoidChaining: true,
        enemyUsageIf: (actor) => { // only use if someone alive on team has taken damage
            return actor.team.members.some(member => member.state != "dead" && (member.hp < member.maxhp))
        },

        disableIf: (actor) => {
            return (
                actor.team.name == "enemy" &&
                !actor.team.members.some(member => ((member != actor) && (member.state != "dead") ))
            )
        },
    },

    optimize: {
        slug: "optimize",
        name: "Optimize",
        type: 'support+target+self+autohit',
        anim: "heal",
        beneficial: true,
    
        usage: {
            act: "%USER FIXES UP %TARGET",
            crit: "%TARGET HAS A BURST OF ENERGY",
            hit: "%TARGET IS READY TO FIGHT",
            miss: "%TARGET IS TOO SLIPPERY"
        },
    
        details: {
            onHit: () => "'[STAT::amt] [STATUS::regen] [STATUS::surge]'",
            flavor: "'utilize ukuzu restorative';'reduced mending effect';'enhance energy'"
        },
    
        stats: {
            crit: 0.2,
            amt: -1,
            autohit: true,
            status: {
                regen: {
                    name: 'regen',
                    length: 2
                },
                surge: {
                    name: 'surge',
                    length: 1
                }
            }
        },
    
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                beneficial: true,
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'mend',
                    rate: 1
                },
    
                hitExec: ({target}) => {
                    addStatus({
                        target, 
                        origin: user, 
                        status: this.stats.status.regen.name, 
                        length: this.stats.status.regen.length, 
                        noReact: true
                    });
                    addStatus({
                        target, 
                        origin: user, 
                        status: this.stats.status.surge.name, 
                        length: this.stats.status.surge.length, 
                        noReact: true
                    });
                },
            });
        }
    },    

    miltza_attack: {
        slug: "miltza_attack",
        name: "Distraction",
        verb: "distract",
        type: 'target',
        anim: "basic-attack",

        usage: {
            act: "%USER FEINTS AND STRIKES %TARGET",
            crit: "%USER'S ALLIES ARE INSPIRED",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET DODGES"
        },

        details: {
            flavor: `'strike with clever feint';'may create distraction'`,
            onHit: `'[STAT::amt]'`,
            onCrit: `'[STATUS::evasion] to nearby allies'`,
            conditional: `<em>VS VULNERABLE::</em>'additional [STAT::amt]'`
        },

        stats: {
            accuracy: 1, 
            crit: 0.3,
            amt: 1,
            range: 2,

            status: {
                evasion: {
                    name: 'evasion',
                    length: 1
                },
                vulnerable: { // just for detail reference
                    name: 'vulnerable',
                }
            },

            extraAOE: {
                evasionAura: {
                    origin: "self",
                    size: 2,
                    shape: 'square',
                    addClass: "beneficial" // added to tiles when displaying range
                }
            }
        },
        
        exec: function(user, target) {
            let specialAmt = this.stats.amt + (hasStatus(target, 'vulnerable') ? 1 : 0)
            
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                specialAmt,

                critExec: ()=> {           
                    let targets = user.team.members  
                    if(env?.rpg?.is2D) {
                        // in 2d, this is AOE evasion
                        targets = env.rpg.grid.getAoETargets({
                            tile: user?.piece?.tile, 
                            actor: user,
                            actingOn: "allies",
                            aoeData: {
                                size: this.stats.extraAOE.evasionAura.size,
                                shape: this.stats.extraAOE.evasionAura.shape
                            }
                        })
                    }

                    env.GENERIC_ACTIONS.teamWave({
                        arbitraryActorList: targets,
                        exec: (actor, i)=>{
                            addStatus({target: actor, origin: user, status: "evasion", origin: user, length: 1, noReact: true}); 
                            play('mend', 0.5);
                        }
                    })
                }
            })
        }
    },

    spy: {
        slug: "spy",
        name: "spy",
        verb: "spy on",
        type: 'target',
        anim: "spying",
        animDuration: 2000,
        frameClass: "temp-perspective", // special class added to RPG div while active

        usage: {
            act: "%USER SPIES UPON %TARGET",
            crit: "%TARGET IS MARKED FOR DEATH",
            hit: "%TARGET FEELS TARGETED",
            miss: "%TARGET HIDES BEHIND SOMETHING"
        },

        details: {
            onUse: `'[STATUS::vulnerable]'`,
        },

        stats: {
            range: 5,
            autohit: true,
            status: {
                vulnerable: {
                    name: 'vulnerable',
                    length: 3
                }
            }
        },

        exec: function(user, target) {
            reactDialogue(user, `give_vulnerable`)
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'status',
                    rate: 0.75
                },
                hitStatus: this.stats.status.vulnerable,
            })
        },
    },

    ultra_spy: {
        slug: "ultra_spy",
        name: "Find Flaw",
        verb: "find flaw in",
        type: 'target',
        anim: "spying",
        frameClass: "temp-perspective",
        animDuration: 2000,
        autohit: true,
    
        usage: {
            act: "%USER SPIES UPON %TARGET",
            crit: "%TARGET IS MARKED FOR DEATH",
            hit: "%TARGET IS MARKED FOR DEATH",
            miss: "%TARGET HIDES BEHIND SOMETHING"
        },
    
        details: {
            flavor: `'locate core components in target'`,
            onHit: "'[STATUS::vulnerable] [STATUS::critical_flaw]'",
        },
    
        stats: {
            status: {
                vulnerable: {
                    name: 'vulnerable',
                    length: 3
                },
                critical_flaw: {
                    name: 'critical_flaw',
                    length: 1
                }
            }
        },
    
        exec: function(user, target) {
            reactDialogue(user, `give_vulnerable`);
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'status',
                    rate: 0.75
                },
                genExec: () => {
                    addStatus({
                        origin: user, 
                        target, 
                        status: this.stats.status.vulnerable.name, 
                        length: this.stats.status.vulnerable.length
                    });
                    addStatus({
                        origin: user, 
                        target, 
                        status: this.stats.status.critical_flaw.name, 
                        length: this.stats.status.critical_flaw.length
                    });
                }
            });
        }
    },    

    subvert: {
        slug: "subvert",
        name: "Subvert",
        type: 'target',
        desc: "'expose extreme weakness';'increase hit and crit chances';'additional chance for severe damage'",
        anim: "spying",
        frameClass: "temp-perspective",
        animDuration: 2000,
        usage: {
            act: "%USER SPIES UPON %TARGET",
            crit: "%TARGET IS MARKED FOR DEATH",
            hit: "%TARGET IS MARKED FOR DEATH",
            miss: "%TARGET HIDES BEHIND SOMETHING"
        },
    
        details: {
            flavor: `'deceive target';'manipulated by outside interference'`,
            onHit: "'[STATUS::vulnerable] [STATUS::critical_flaw]'",
        },

        stats: {
            autohit: true,
            status: {
                vulnerable: {
                    name: 'vulnerable',
                    length: 1
                },
                critical_flaw: {
                    name: 'critical_flaw',
                    length: 1
                }
            }
        },

        exec: function(user, target) {
            reactDialogue(user, `give_vulnerable`)
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'status',
                    rate: 0.75
                },
                genExec: () => {
                    addStatus({origin: user, target, status: "vulnerable", length: 1}); 
                    addStatus({origin: user, target, status: "critical_flaw", length: 1}); 
                }
            })
        }
    },

    //vanity rename/redescription
    spy_analyze: {
        slug: "spy_analyze",
        name: "Analyze",
        type: 'target',
        desc: "'expose enemy weakness';'increase hit and crit chances'",
        help: "80% +3T:VULNERABLE -EVASION",
        anim: "spying",
        frameClass: "temp-perspective",
        animDuration: 2000,
        usage: {
            act: "%USER SCANS %TARGET",
            hit: "%TARGET FEELS TARGETED",
            miss: "%TARGET HIDES BEHIND SOMETHING"
        },
        accuracy: 0.8,
        crit: 0,
        exec: (user, target)=>{env.ACTIONS.spy.exec(user, target)}
    },

    //ditto
    spy_target: {
        slug: "spy_target",
        name: "Target",
        type: 'target',
        desc: "'expose enemy weakness';'increase hit and crit chances'",
        help: "80% +3T:VULNERABLE -EVASION",
        anim: "spying",
        frameClass: "temp-perspective",
        animDuration: 2000,
        usage: {
            act: "%USER POINTS AT %TARGET",
            hit: "%TARGET FEELS TARGETED",
            miss: "%TARGET HIDES BEHIND SOMETHING"
        },
        accuracy: 0.8,
        crit: 0,
        exec: (user, target)=>{env.ACTIONS.spy.exec(user, target)}
    },

    drone_strike: {
        slug: "drone_strike",
        name: "Drone Strike",
        type: 'target',
        desc: "'strike against analyzed weakness'",
        anim: "basic-attack",
        help: "AUTOHIT -1HP, 10%C x2",
        usage: {
            act: "%USER's DRONE ATTACKS %TARGET",
        },
        autohit: true,
        crit: 0.1,
        amt: 1,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                specialAmt: env.rpg.is2D ? 2 : 1,
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'shot4',
                    rate: 1.5
                }
            })
        }
    },

    cavik_attack: {
        slug: "cavik_attack",
        name: "IED",
        verb: "throw at",
        type: 'target',
        anim: "basic-attack",

        usage: {
            act: "%USER THROWS A WEIRD CYST AT %TARGET",
            crit: "%TARGET EXPLODES",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET DODGES"
        },

        details: {
            flavor: `'throw hastily made minor explosive';'chance for greater explosion'`,
            onHit: `'[STAT::amt]'`,
            onCrit: ()=> `'HIT all foes for [STAT::amt]'${page.name == "frame" ? `;'additional hits do not trigger on-hit effects'` : ``}`,
        },

        stats: {
            accuracy: 0.9,
            crit: 0.5,
            amt: 1,
        },

        exec: function(user, target) {
            let action = this;
            return env.GENERIC_ACTIONS.singleTarget({
                action, 
                user, 
                target,
                critSfx: {
                    name: 'stab',
                    rate: 1.75
                },
                critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                    team: user.enemyTeam,
                    exec: (actor, i) => {
                        env.GENERIC_ACTIONS.singleTarget({
                            action,
                            user, 
                            target: actor,
                            hitSfx: { name: 'shot6' },
                            canCrit: false,
                            runHitEvents: false
                        })
                    }
                })
            })
        }
    },

    bazruka: {
        slug: "bazruka",
        name: "Bazruka",
        verb: "throw at",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER TOSSES AN EXPLOSIVE AT %TARGET",
            crit: "SHRAPNEL SPRINGS AROUND THE ROOM",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET DODGES"
        },
        
        details: {
            flavor: `'utilize rapid-formed micro-explosive';'chance for greater shrapnel explosion'`,
            onHit: `'[STAT::amt]'`,
            onCrit: () => `'HIT all foes for [STAT::amt] [STATUS::puncture]'${page.name == "frame" ? `;'additional hits trigger on-hit effects'` : ``}`,
        },

        stats: {
            accuracy: .9,
            crit: 0.5,
            amt: 1,
            status: {
                puncture: {
                    name: 'puncture',
                    length: 2
                }
            },
        },
        
        exec: function(user, target) {
            let action = this;
            return env.GENERIC_ACTIONS.singleTarget({
                action, 
                user, 
                target,

                critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                    team: user.enemyTeam,
                    exec: (actor, i) => {
                        env.GENERIC_ACTIONS.singleTarget({
                            action, 
                            user, 
                            target: actor,
                            hitSfx: { name: 'shot4' },
                            hitStatus: this.stats.status.puncture,
                            canCrit: false
                        })
                    }
                })
            })
        }
    },


    bozko_attack: {
        slug: "bozko_attack",
        name: "Disable",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER JABS AT %TARGET'S WEAPONRY",
            crit: "%TARGET IS CRIPPLED",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        details: {
            flavor: "'strike at offensive appendages of target';'attempt to weaken'",
            onHit: `'[STAT::amt]'`,
            onCrit:`'[STATUS::weakened]'`,
        },
        stats: {
            accuracy: .8,
            crit: 0.4,
            amt: 2,
            status: {
                weakened: {
                    name: 'weakened',
                    length: 2
                }
            },
        },
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                critStatus: this.stats.status.weakened
            })
        }
    },

    cripple: {
        slug: "cripple",
        name: "Cripple",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER JABS AT %TARGET'S WEAPONRY",
            crit: "%TARGET IS CRIPPLED",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        details: {
            flavor: "'strike neural center of target';'guaranteed disorientation'",
            onHit: `'[STAT::amt] [STATUS::stun]'`,
            onCrit:`'[STATUS::weakened]'`,
        },
        stats: {
            accuracy: .9,
            crit: 0.4,
            amt: 2,
            status: {
                weakened: {
                    name: 'weakened',
                    length: 2
                },
                stun: {
                    name: 'stun',
                    length: 1
                }
            },
        },
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                critStatus: {
                    name: 'weakened',
                    length: 2
                },
                hitStatus: {
                    name: 'stun',
                    length: 1
                },
            })
        }
    },

    guard: {
        slug: "guard",
        name: "Guard",
        type: 'support+target+autohit',
        anim: "heal",
        usage: {
            act: "%USER STANDS BEFORE %TARGET",
            hit: "%TARGET IS SHIELDED BY %USER"
        },
        details: {
            flavor: "'utilize unique limbs to protect target';'intercept incoming attacks'",
            onUse: `'[STATUS::redirection]'`,
        },
        stats: {
            status: {
                redirection: {
                    name: 'redirection',
                    length: 2
                },
            },
        },
        autohit: true,
        beneficial: true,
        exec: function(user, target) {
            reactDialogue(user, `give_redirection`)
            return env.GENERIC_ACTIONS.singleTarget({
                beneficial: true,
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'guard',
                    rate: 1
                },
                hitStatus: this.stats.status.redirection,
            })
        }
    },
    
    special_guard_all: {
        slug: "special_guard_all",
        name: "Frontline",
        type: 'special',
        anim: "basic-attack",
        usage: {
            act: "%USER STANDS BEFORE THEIR FOES"
        },
        details: {
            flavor: "'attain hyper-awareness of proceedings';'intercept all attacks on allies'",
            onUse: `'[STATUS::redirection] to all allies'`,
        },
        stats: {
            status: {
                redirection: {
                    name: 'redirection',
                    length: 2
                },
            },
        },
        exec: function(user, target, beingUsedAsync) {
            reactDialogue(user, `give_redirection`)
            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i) => {
                    if(actor.slug == user.slug) return
                    addStatus({target: actor, origin: user, status: "redirection", length: 2}); 
                    play('guard', 2, 0.75);
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
    
    special_guard_all_bonus: {
        slug: "special_guard_all_bonus",
        name: "Martyr",
        type: 'special',
        desc: "'intercept all attacks on allies';'prepare to take great damage'",
        help: "ALLIES::+2T:REDIRECTION (TO USER), +2T:CARAPACE +2T:SPIKES -VULNERABLE",
        anim: "basic-attack",
        usage: {
            act: "%USER STANDS BEFORE THEIR FOES"
        },
        details: {
            flavor: "'intercept all attacks on allies';'prepare to take great damage'",
            onUse: `'[STATUS::carapace] [STATUS::spikes]';'[STATUS::redirection] to all allies'`,
        },
        stats: {
            status: {
                redirection: {
                    name: 'redirection',
                    length: 2
                },
                carapace: {
                    name: 'carapace',
                    length: 2
                },
                spikes: {
                    name: 'spikes',
                    length: 2
                },
            },
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {
            reactDialogue(user, `give_redirection`)

            addStatus({target: user, status: "carapace", length: 2, noReact: true}); 
            addStatus({target: user, status: "spikes", length: 2}); 
            removeStatus(user, "vulnerable") 

            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i) => {
                    if(actor.slug == user.slug) return
                    addStatus({target: actor, origin: user, status: "redirection", length: 2}); 
                    play('guard', 2, 0.75);
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },

    shell: {
        slug: "shell",
        name: "Shell",
        type: 'autohit',
        anim: "heal",
        beneficial: true,
        avoidChaining: true,

        usage: {
            act: "%USER PREPARES TO TAKE A HIT"
        },

        details: {
            flavor: `'take on defensive stance'`,
            onUse: `'[STATUS::carapace] [STATUS::spikes]'`,
        },

        stats: {
            autohit: true,
            status: {
                carapace: {
                    name: 'carapace',
                    length: 3
                },

                spikes: {
                    name: 'spikes',
                    length: 3
                },

                vulnerable: {
                    name: 'vulnerable'
                }
            }
        },
        
        exec: function(user, target) {
            play('mend', 0.5);
            addStatus({target: user, status: "carapace", length: 3, noReact: true}); 
            addStatus({target: user, status: "spikes", length: 3}); 
            removeStatus(user, "vulnerable") 
            return 'nothing';
        },
    },

    brawl_weak: {
        slug: "brawl_weak",
        name: "Clumsy Brawl",
        verb: "brawl with",
        type: 'target',
        desc: "'unwieldy strike with weak limbs'",
        anim: "basic-attack",
        help: "40% -1HP, 10%C X2",
        usage: {
            act: "%USER CLUMSILY ATTACKS %TARGET",
            crit: "%TARGET IS KNOCKED BACK",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        accuracy: 0.4,
        crit: 0.10,
        amt: 1,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
            })
        }
    },

    brawl: {
        slug: "brawl",
        name: "Brawl",
        verb: "brawl with",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER ATTACKS %TARGET",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        details: {
            flavor: "'unwieldy punch';'last resort'",
            onHit: `'[STAT::amt]'`,
        },
        stats: {
            accuracy: .8,
            amt: 2,
        },
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
            })
        }
    },

    ik_attack: {
        slug: "ik_attack",
        name: "Veilksplitter",
        verb: "veilksplit",
        type: 'target',
        anim: "basic-attack",

        usage: {
            act: "%USER BLASTS %TARGET",
            crit: "%TARGET IS ANNIHILATED",
            hit: "%TARGET IS SEARED",
            miss: "%TARGET EVADES"
        },

        details: {
            flavor: `'utilize dull-enabled cutting beam'`,
            onHit: ()=> `'[STAT::amt] [STATUS::stun]'${env?.rpg?.is2D ? ";'KB::4'" : ''}`,
        },

        stats: { 
            autohit: true, 
            crit: 0.05,
            amt: 4,
            status: {
                stun: {
                    name: 'stun',
                    length: 2
                }
            }
        },

        range: 4,
        targeting: "angular",
        aoe: { 
            size: 4, 
            shape: "line-from",
            canHit: (user, target) => { return true } 
        },
        
        exec: function(user, target) {
            removeStatus(user, "windup")
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'dull',
                    rate: 0.5
                },
                critSfx: {
                    name: 'stab',
                    rate: 0.4
                },
                genExec: ({target}) => {
                    if(env?.rpg?.is2D) {
                        if(target.piece && user.piece) target.piece.knockback({
                            direction: user?.piece?.tile.getRelativeDirection(target?.piece?.tile), 
                            strength: 4
                        })
                    }

                    addStatus({target, status: "stun", length: 1});
                }
            })
        }
    },

    dullflare: {
        slug: "dullflare",
        name: "Dull Flare",
        type: 'special',
        anim: "basic-attack",
        usage: {
            act: "%USER TEARS OPEN THE DULL"
        },
        details: {
            flavor: "'wide directional release of rapidly decaying dull light';'deconstructs foes'",
            onUse: `'HIT all foes'`,
            onHit: `'[STAT::amt]'`,
        },
        stats: {
            autohit: true,
            accuracy: .8,
            crit: .1,
            amt: 3,
        },
        exec: function(user, target, beingUsedAsync) {
            removeStatus(user, "windup")
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i) => {
                    let anim = env.COMBAT_ANIMS.flare
                    let baseDelay = ((env.ADVANCE_RATE * 0.2) * i)
                    let animDelay = baseDelay + anim.duration;
                        
                    setTimeout(()=>anim.exec(action, user, actor), baseDelay)
                    setTimeout(function(){
                        env.GENERIC_ACTIONS.singleTarget({
                            beneficial: true,
                            action: action, 
                            user, 
                            target: actor,
                            hitSfx: { name: 'dull', rate: 1.5 },
                            critSfx: { name: 'shot6', rate: 0.75 },
                        })
                    }, animDelay);
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
    
    swipe: {
        slug: "swipe",
        name: "Swipe",
        type: 'target',
        desc: "'swipe blindly at target';'chance for persistent wound'",
        anim: "basic-attack",
        help: "70% -1HP, 20%C x2 +1T:PUNCTURE -REGEN",
        usage: {
            act: "%USER SWIPES AT %TARGET",
            crit: "%TARGET IS STABBED",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET DUCKS OUT OF THE WAY"
        },
        accuracy: 0.7,
        crit: 0.2,
        amt: 1,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                critStatus: {
                    name: 'puncture',
                    length: 1
                }
            })
        }
    },

    disabler_pulse: {
        slug: "disabler_pulse",
        name: "Disabler Pulse",
        verb: "disable",
        type: 'target+autohit',
        anim: "basic-attack",
        usage: {
            act: "%USER LETS LOOSE THE DISABLER",
            hit: "%TARGET IS ANNIHILATED",
        },
        details: {
            flavor: "'emergency security device';'injects self-destructive thoughtform';'for industrial use only'",
            onHit: `'[STAT::amt] [STATUS::stun]'`,
        },
        stats: {
            autohit: true,
            crit: 10,
            amt: 5,
            status: {
                stun: {
                    name: "stun",
                    length: 3
                }
            }
        },
        itemAction: true,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'shot1',
                    rate: 1.1
                },
                critStatus: {
                    name: 'stun',
                    length: 3
                }
            })
        }
    },

    foe_stab: {
        slug: "foe_stab",
        name: "stab",
        type: 'target',
        desc: "'puncture vital cystic component';'damage over time';'stop regen'",
        help: "75% -1HP +2T:PUNCTURE -REGEN, 10%C -1HP",
        anim: "basic-attack", 
        usage: {
            act: "%USER STABS %TARGET",
            crit: "%TARGET IS EVISCERATED",
            hit: "%TARGET BLEEDS SLUDGY CORRU",
            miss: "%TARGET EVADES"
        },

        details: {
            flavor: "'reshape arm into sharpened tendril';'stab target'",
            onHit: `'[STAT::amt] [STATUS::puncture]'`,
            onCrit: ()=> `'puncture vital cystic component for [STATUS::puncture]'${env?.rpg?.is2D ? ";'KB::2'" : ''}`,
        },

        stats: {
            accuracy: 0.75,
            crit: 0.1,
            amt: 1,
            status: {
                puncture: {
                    name: 'puncture',
                    length: 3
                }
            }
        },

        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'stab',
                    rate: 1
                },
                critStatus: this.stats.status.puncture,
                hitStatus: this.stats.status.puncture,
            })
        }
    },
 
    barrier: {
        slug: "barrier",
        name: "Barrier",
        verb: "shield",
        type: 'support+target+self+autohit',
        anim: "heal",
        usage: {
            act: "%USER SHIELDS %TARGET",
            crit: "%TARGET FEELS INVINCIBLE",
            hit: "%TARGET GAINS A THIN BARRIER",
            miss: "IT DOES NOT STICK"
        },
        details: {
            flavor: "apply ablative corru layer to target';'occasionally provide better shielding'",
            onHit: `'[STAT::amtBP]'`,
            onCrit: `'additional [STAT::amtBP]'`,
        },
        stats: {
            crit: 0.1,
            amt: 2,
            amtBP: 2
        },
        autohit: true,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                beneficial: true,
                type: 'barrier',
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'mend',
                    rate: 1.5
                },
            })
        }
    },

    special_limited_carapace: {
        slug: "special_limited_carapace",
        name: "Expend carapace",
        type: 'support+target+autohit',
        desc: "'deploy shielding around target ally';'single-use'",
        help: "AUTOHIT +3T:CARAPACE, ONE USE PER COMBAT",
        anim: "heal",
        usage: {
            act: "%USER ATTACHES THEIR SHIELDS TO %TARGET",
            crit: "%TARGET FEELS INVINCIBLE",
            hit: "%TARGET LOOKS MORE HARDY",
            miss: "SOMETHING BROKE LOL"
        },
        autohit: true,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                beneficial: true,
                user, 
                target,
                hitSfx: {
                    name: 'status',
                    rate: 0.75
                },
                hitStatus: {
                    name: 'carapace',
                    length: 4
                },
                genExec: ({user})=>{
                    user.actions = user.actions.filter(action => action !== "special_limited_carapace")
                    if(user.sprite) {
                        let bodySprite = user.sprite.querySelector('.golemsprite-body')
                        if(bodySprite) bodySprite.src = bodySprite.src.replace('-body','-body-used')
                    }
                }
            })
        }
    },

    enemy_shell: {
        slug: "enemy_shell",
        name: "Shell",
        type: 'autohit',
        desc: "'form arms into defensive shell';'reduce incoming attacks'",
        anim: "heal",
        help: "+2T:CARAPACE -VULNERABLE",
        usage: {
            act: "%USER PREPARES TO TAKE A HIT"
        },
        
        exec: function(user, target) {
            play('mend', 0.5);
            addStatus({target: user, status: "carapace", length: 2, noReact: true});
            removeStatus(user, "vulnerable") 
            return 'nothing';
        },
    },

    restore: { 
        slug: "restore",
        name: "Restore",
        type: 'support+target+self+rez+autohit+boxtarg',
        anim: "heal",
        usage: {
            act: "%USER FIXES UP %TARGET",
            crit: "%TARGET FEELS WAY BETTER",
            hit: "%TARGET FEELS BETTER",
            miss: "%TARGET IS TOO SLIPPERY"
        },

        details: {
            flavor: "'utilize quick-acting repair cyst'",
            onHit: `'[STAT::amt] [STATUS::regen]'`,
            onCrit: `'additional [STAT::amt] [STATUS::regen]'`,
            conditional: `<em>VS DOWN::</em>'revive target';'[STATUS::evasion] [STATUS::regen]'`
        },

        stats: {
            autohit: true,
            crit: 0.1,
            amt: -5,
            status: {
                evasion: { name: "evasion", length: 2 },
                regen: { name: "regen", length: 3 },
            }
        },

        itemAction: true,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                beneficial: true,
                action: this, 
                user, 
                target,
                critStatus: this.stats.status.regen, 
                hitStatus: this.stats.status.regen,
                hitSfx: {
                    name: 'mend',
                    rate: 1
                },
                genExec: ({target})=>{
                    if(target.state == "dead") {
                        target.hp = 5
                        combatRevive(target)
                        reactDialogue(target, 'receive_rez')
                        addStatus({target: target, origin: user, status: "evasion", length: 2, noReact: true}); 
                        addStatus({target: target, origin: user, status: "regen", length: 3, noReact: true}); 
                    }
                }                
            })
        },
    },

    special_spy_all: {
        slug: "special_spy_all",
        name: "Analyze Foes",
        type: 'special',
        anim: "basic-attack",
        usage: {
            act: "%USER SPIES UPON THEIR FOES"
        },

        details: {
            flavor: "'utilize receptor-tied targeting cyst';'expose all weakness'",
            onUse: `'[STATUS::vulnerable] to all foes'`,
        },

        stats: {
            autohit: true,
            status: {
                vulnerable: { name: "vulnerable", length: 3 },
            }
        },

        itemAction: true,
        exec: function(user, target, beingUsedAsync) {
            let targetTeam
            switch(user.team.name) {
                case "ally": targetTeam = env.rpg.enemyTeam; break;
                case "enemy": targetTeam = env.rpg.allyTeam; break;
            }

            env.GENERIC_ACTIONS.teamWave({
                team: targetTeam,
                exec: (actor, i) => {
                    removeStatus(actor, "evasion");
                    addStatus({target: actor, origin: user, status: "vulnerable", length: 3}); 
                    play('status', 0.75, 0.75);
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },

    special_attack_all: {
        slug: "special_attack_all",
        name: "Explosive",
        type: 'special',
        anim: "basic-attack",
        usage: {
            act: "%USER DEPLOYS A KAVRUKA"
        },

        details: {
            flavor: "'utilize volatile deconstruction tool'",
            onUse: `'HIT all foes'`,
            onHit: `'[STAT::amt]'`,
            onCrit: `'[STATUS::stun]'`
        },

        stats: {
            accuracy: 0.8,
            crit: 0.3,
            amt: 1,
            status: {
                stun: { name: "stun", length: 1 },
            }
        },

        itemAction: true,
        exec: function(user, target, beingUsedAsync) {
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i) => {
                    let anim = env.COMBAT_ANIMS.shoot
                    let baseDelay = ((env.ADVANCE_RATE * 0.2) * i)
                    let animDelay = baseDelay + anim.duration * 0.5;
                        
                    setTimeout(()=>anim.exec(action, user, actor), baseDelay)
                    setTimeout(function(){
                        env.GENERIC_ACTIONS.singleTarget({
                            beneficial: true,
                            action: action, 
                            user, 
                            target: actor,
                            hitSfx: { name: 'shot2' },
                            critSfx: { name: 'shot6' },
                            critStatus: {
                                name: 'stun',
                                length: 1
                            },
                        })
                    }, animDelay);
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },

    special_barrier_allies: {
        slug: "special_barrier_allies",
        name: "Cover",
        type: 'special',
        anim: "cloak-barrier",
        animDuration: 4000,
        beneficial: true,

        usage: {
            act: "%USER SHIELDS THEIR ALLIES"
        },

        details: {
            flavor: `'utilize mobile applicators and inbuilt reserve';'apply ablative corru shielding'`,
            onUse: () => `'[STAT::amtBP] ${env?.rpg?.is2D ? "[STATUS::repairs]" : ''} to nearby allies'`,
        },

        stats: {
            autohit: true,
            crit: 0,
            amt: 2,
            amtBP: 2,
            range: -1,

            status: {
                repairs: {
                    name: "repairs",
                    length: 1
                }
            },

            extraAOE: {
                barrier: {
                    origin: "self", // primarily used to display range effects rather than in actual attacking/calculation
                    size: 2,
                    shape: 'square',
                    addClass: "beneficial" // added to tiles when displaying range
                }
            }
        },
        
        exec: function(user, target, beingUsedAsync) {
            let action = this
            let targets = user.team.members
            let hitStatus = false

            if(env?.rpg?.is2D) {
                targets = env.rpg.grid.getAoETargets({
                    tile: user?.piece?.tile, 
                    actor: user,
                    actingOn: "allies",
                    aoeData: {
                        size: this.stats.extraAOE.barrier.size,
                        shape: this.stats.extraAOE.barrier.shape
                    }
                })

                hitStatus = {
                    name: 'repairs',
                    length: 1
                }
            }

            if(user.slug.includes("maintcloak")) {
                user.sprite.classList.add(action.anim)
                play('talkgal', 2)
                setTimeout(()=>play('talkgal', 2), 2000)
                setTimeout(()=>user.sprite.classList.remove(action.anim), 4000)
            }

            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: targets,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        beneficial: true,
                        type: 'barrier',
                        action, 
                        user, 
                        target: actor,
                        hitSfx: {
                            name: 'mend',
                            rate: 2
                        },
                        hitStatus
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        },
        
        //disable if you're an enemy and anyone on your team has more than 5 bp
        //also if you're an enemy and you're the last standing
        //mainly to avoid repeat/infinite stacking while dealing with a crowd
        disableIf: (actor)=>{
            if(actor.team.name == "ally") return false;
            else if(!actor.team.members.some(member => ((member != actor) && (member.state != "dead") ))) return true;
            else return actor.team.members.some(member => ((member != actor) && member.bp >= 5))
        }
    },

    special_strong_barrier_allies: {
        slug: "special_strong_barrier_allies",
        name: "Responsive Armor",
        type: 'special',
        
        usage: {
            act: "%USER SHIELDS THEIR ALLIES"
        },

        details: {
            flavor: `'break open satik cyst';'utilize rapid temporary ablative barrier applicators'`,
            onUse: () => `'[STAT::amtBP] to nearby allies'`,
        },

        stats: {
            autohit: true,
            amt: 5,
            amtBP: 5
        },

        itemAction: true,
        exec: function(user, target, beingUsedAsync) {
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        beneficial: true,
                        autohit: true,
                        type: 'barrier',
                        action, 
                        user, 
                        target: actor,
                        hitSfx: {
                            name: 'mend',
                            rate: 2
                        },
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
    
    special_restorative_barrier: {
        slug: "special_restorative_barrier",
        name: "Mending Cover",
        type: 'special',
        anim: "cloak-barrier",
        animDuration: 4000,
        autohit: true,
        usage: {
            act: "%USER SHIELDS THEIR ALLIES"
        },
        details: {
            flavor: "'broadly apply ablative protection';'upgraded barrier mends wounds while active'",
            onUse: `'[STAT::amtBP] [STATUS::repairs] to nearby allies'`,
        },
        stats: {
            crit: 0,
            amtBP: 2,
            amt: 2,
            status: { 
                repairs: {
                    name: 'repairs', 
                    length: 1
                },
            } 
        },
        exec: function(user, target, beingUsedAsync) {
            let action = this

            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        beneficial: true,
                        type: 'barrier',
                        action, 
                        user, 
                        target: actor,
                        hitSfx: {
                            name: 'mend',
                            rate: 2
                        },
                        hitStatus: {
                            name: 'repairs',
                            length: 1
                        },
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
    
    incoherent_gundown: {
        slug: "incoherent_gundown",
        name: "BSTRD BULLETS",
        type: 'special',
        desc: "BATTLEFIELD 100% -1HP per hit",
        accuracy: 1,
        crit: 0,
        exec: function(user, target) {
            addStatus({target: user, status: "incoherent", length: 1, noReact: true});
            actionMessage(user, "%USER AIMS AT %TARGET", target);
            user.sprite.classList.add('aiming')
            play('click1')

            //vortex on screen, circle expands into fullscreen blackness (animation in CSS)
            env.rpg.insertAdjacentHTML('beforeend', `
                <div class="golem-vortex bh-action-${user.slug} bh-action"></div>
                <div id="${user.slug}-bh" class="bh-action-${user.slug} bh-action">
                    <div class="bh_damage-wrapper"></div>
                </div>
            `);
            env.rpg.vortex = document.querySelector(`.golem-vortex.bh-action-${user.slug}`)
            env.rpg.actionZone = document.querySelector(`#${user.slug}-bh`)

            //animate the vortex
            setTimeout(()=>{
                env.rpg.vortex.classList.add('active'); 

                bh_start({
                    playerEl: `<div id="bh_player" class="notice" style="background-image:url(${target.portraitUrl})"></div>`, 
                    onHit: () => {
                        var hit

                        if(user.state == "lastStand") {
                            let possibleTargets = env.rpg.allyTeam.members.filter(member => member.hp > 0)
    
                            if(possibleTargets.length == 0) env.bulletHell.complete()
                            hit = combatHit(possibleTargets[rand(0, possibleTargets.length)], {amt: 1, acc: 1, crit: 0, origin: user});
                            if(hit) play('hit', 1.5, 0.5); else play("miss", 1.25, 0.5)
                            
                        } else if(target.state != "dead") {
                            hit = combatHit(target, {amt: 1, acc: 1, crit: 0, origin: user});
                            if(target.hp == 0) env.bulletHell.complete()
                            if(hit) play('hit', 1.5, 0.5); else play("miss", 1.25, 0.5)

                        } else {
                            env.bulletHell.complete()
                        }
    
                        if(hit == false) return "dodged"; else return "damaged"
                    },
                    onEnd: () => {
                        user.sprite.classList.remove('aiming')
                    },
                    centered: true
                })
                bh_invuln(true)

                //animation done, activate ze game
                if(env.rpg.kavrukaDamage) {
                    env.rpg.kavrukaDamage.forEach(damage=>bh_kavrukadamage(damage))
                    env.rpg.actionZone.insertAdjacentHTML('beforeend', `
                    <div id="bh_kavrukafirering" 
                        class="bh_damager bh_kavrukafirering"
                        style="--kavrukaDamageCount: ${env.rpg.kavrukaDamage.length}">
                    </div>`)
                    env.rpg.kavrukaFireRing = document.querySelector('#bh_kavrukafirering')
                }
                
                setTimeout(()=>{
                    body.classList.add('in-golem-vortex')
                    env.rpg.actionZone.classList.add('active')
                    document.querySelector(`#bh_player`).classList.add('active')

                    if(user.state == "lastStand") {
                        bh_gundown("last_stand");
                    } else if(!user.tutorial) {
                        startDialogue("d3_archivebosstut")
                        user.tutorial = true
                    //changes moves based on health - string refers to the urgency with which he shoots, missing more the lower his HP is but creating more hazards that way
                    } else if(user.hp < (0.5 * user.maxhp)) {
                        bh_gundown("high");
                    } else {
                        bh_gundown("low");
                    }
                }, 500);

                setTimeout(()=>{
                    env.rpg.classList.add('cull');
                }, 1400);
            }, env.ADVANCE_RATE * 0.5);
        }
    },

    special_fullauto: {
        slug: "special_fullauto",
        name: "Full Auto",
        type: 'special',
        anim: "wobble",
        usage: {
            act: "%USER OPENS FIRE",
        },
        details: {
            flavor: "'utilize automatic rifle';'rapid inaccurate attacks'",
            onUse: `'HIT random foes 6 times'`,
            onHit: `'[STAT::amt]'`,
            onCrit:`'[STATUS::vulnerable]'`
        },
        stats: {
            accuracy: .33,
            crit: 0.33,
            amt: 1,
            status: {
                vulnerable: {
                    name: 'vulnerable',
                    length: 1
                },
            },
        },
        exec: function(user, target, beingUsedAsync) {
            let animElement = user.sprite || user.box
            let initialRate = env.bgm.rate()

            animElement.classList.add('aiming')
            if(!env.rpg.classList.contains("standoff")) ratween(env.bgm, initialRate + 0.5)
            play('click1')

            let targetTeam
            switch(user.team.name) {
                case "ally": targetTeam = env.rpg.enemyTeam; break;
                case "enemy": targetTeam = env.rpg.allyTeam; break;
            }

            //damage self on use if you aren't bstrd
            if(!["BSTRD Golem", "BSTRD", "Gun Golem", "EFGY"].includes(user.name)) combatHit(user, {amt: 1, crit: 0, autohit: true, origin: user, redirectable: false})

            let anim = env.COMBAT_ANIMS.shoot
            let validTargets = targetTeam.members.filter(member => member.state != "dead" && member.state != "lastStand")

            if(validTargets.length) for (let i = 0; i < 6; i++) {
                let baseDelay = ((env.ADVANCE_RATE * 0.2) * i)
                let animDelay = baseDelay + anim.duration;
                if(validTargets) {
                    let target = validTargets.sample()
                    
                    setTimeout(()=>anim.exec(this, user, target), baseDelay)
                    setTimeout(()=>{
                        env.GENERIC_ACTIONS.singleTarget({
                            action: this, 
                            user, 
                            target,
                            hitSfx: { name: "shot2", volume: 0.5 },
                            critSfx: { name: "shot6" },
                            missSfx: { name: "shot2", rate: 1.5, volume: 0.5 },
                            critStatus: {
                                name: 'vulnerable',
                                length: 1
                            }
                        })

                        animElement.classList.add('scramble')
                        setTimeout(()=>animElement.classList.remove('scramble'), 100)
                    }, animDelay)
                }
            }

            setTimeout(()=>{
                animElement.classList.remove('aiming')                
                if(!beingUsedAsync) advanceTurn(user)
                if(!env.rpg.classList.contains("standoff")) ratween(env.bgm, env.bgm.intendedRate)
            }, (env.ADVANCE_RATE * 0.2) * 7)
        }
    },

    special_fullauto_player: {
        slug: "special_fullauto_player",
        name: "Full Auto",
        type: 'special',
        anim: "wobble",
        usage: {
            act: "%USER OPENS FIRE",
        },
        details: {
            flavor: "'utilize symbiotic rifle';'rapid inaccurate attacks';'consumes HP for munitions'",
            onUse: `'HIT random foes 6 times';'[STAT::amt] to self'`,
            onHit: `'[STAT::amt]'`,
            onCrit:`'[STATUS::vulnerable]'`
        },
        stats: {
            accuracy: .33,
            crit: 0.33,
            amt: 1,
            status: {
                vulnerable: {
                    name: 'vulnerable',
                    length: 1
                },
            },
        },
        exec: (user, target)=>{env.ACTIONS.special_fullauto.exec(user, target)}
    },

    movefriend_attack: {
        slug: "movefriend_attack",
        name: "Broadcast",
        type: 'target',
        desc: "'directly seize control of corrucystic organs';'chance to utilize target as signal amplifier'",
        anim: "wobble",
        help: "75% -2HP +1T:PUNCTURE, 30%C (FOES::-1HP +2T:VULNERABLE)",
        usage: {
            act: "%USER'S SIGIL WARPS STRANGELY",
            crit: "THE WHOLE TEAM FEELS ILL",
            hit: "%TARGET'S FLESH REVOLTS",
            miss: "%TARGET RECOILS SAFELY"
        },
        accuracy: 0.75,
        crit: 0.3,
        amt: 2,
        exec: function(user, target) {
            content.classList.add('painprep', 'painhalf')
            setTimeout(()=>{content.classList.add('painmode')}, 100)
            setTimeout(()=>{content.classList.remove('painmode')}, 2000)
            setTimeout(()=>{content.classList.remove('painprep', 'painhalf')}, 3000)

            ratween(env.bgm, 0.75, 2000)
            env.rpg.classList.remove('incoherentbg')

            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitStatus: {name: 'puncture', length: 1}, critStatus: {name: 'puncture', length: 1},
                
                critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                    team: user.enemyTeam,
                    exec: (actor, i)=>{
                        combatHit(actor, {amt: 1, crit: 0, autohit: true, origin: user});
                        addStatus({target: actor, status: "vulnerable", length: 2}); 
                        play("talksignal", 0.75)
                    }
                })
            })
        }
    },

    special_mass_destabilize: {
        slug: "special_mass_destabilize",
        name: "destabilize thoughtspace",
        type: 'special',
        anim: "wobble",
        autohit: true,
        usage: {
            act: "THE THOUGHTSPACE GROWS VIOLENT"
        },
        details: {
            flavor: "'afflict all nearby entities with incoherence'",
            onUse: `'[STATUS::destabilized] to all actors'`,
        },
        stats: {
            status: {
                destabilized: {
                    name: 'destabilized',
                    length: 2
                }
            },
        },
        exec: function(user, target, beingUsedAsync) {
            if(env.rpg.classList.contains("bastard")) {                
                if(user.team.name == "ally") {
                    env.rpg.classList.add('incoherentbg')
                    content.classList.add('painprep', 'painfade', 'painhalf')
                    setTimeout(()=>{content.classList.add('painmode')}, 100)
                    setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                    setTimeout(()=>{content.classList.remove('painprep', 'painfade', 'painhalf')}, 5000)

                    setTimeout(()=>{env.rpg.classList.remove('incoherentbg')}, 4000)
                }
            } else {
                ratween(env.bgm, 1, 2000)
                env.rpg.classList.add('incoherentbg')
                content.classList.add('painprep', 'painhalf')
                setTimeout(()=>{content.classList.add('painmode')}, 100)
                setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                setTimeout(()=>{content.classList.remove('painprep', 'painhalf')}, 5000)
            }
            
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action, 
                        user, 
                        target: actor,
                        autohit: true,
                        hitSfx: {
                            name: 'destabilize',
                            rate: 0.75
                        },
                        genExec: ({target}) => {
                            addStatus({target: actor, origin: user, status: "destabilized", length: 2});
                        }
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
    
    special_movefriend_annihilate: {
        slug: "special_movefriend_annihilate",
        name: "Annihilation",
        type: 'special+nomimic',
        desc: "'utilize the walls to crush a target'",
        anim: "wobble",
        choiceAnim: "special_choice-movefriend",
        choiceAnimDuration: 200,
        help: "CHOOSE::100% -2HP ::OR:: 50% -2HP 50%C -2HP +1T:STUN",
        usage: {
            act: "THE WALLS GREW HOSTILE AROUND %TARGET",
            crit: "%TARGET BARELY STANDS",
            hit: "%TARGET DID THEIR BEST",
            miss: "%TARGET ESCAPED BY A HAIR"
        },
        accuracy: 1,
        crit: 0,
        noRepeat: true,
        exec: function(user, target) {
            actionMessage(user, "THE WALLS SHIFT AROUND %TARGET", target)
            user.sprite.classList.add('special_choice-movefriend')
            let action = this

            content.classList.add('painprep', 'painhalf')
            setTimeout(()=>{content.classList.add('painmode')}, 100)
            setTimeout(()=>{content.classList.remove('painmode')}, 1000)
            setTimeout(()=>{content.classList.remove('painprep', 'painhalf')}, 3000)

            //summon a div that lets the player click guaranteed or chance
            actionChoice({
                user: user,
                action: action,
                choiceText: `The walls close in around ${target.name}...`,
                options: [
                    {text: "Withstand the attack", definition: "NOTE::'100% -2HP'"},
                    {text: "Try a risky dodge", definition: "NOTE::'50% -2HP 50%C -2HP +1T:STUN'"},
                ],
                choiceCallback: (c) => {
                    //reap the consequences
                    user.sprite.classList.add(action.anim)
                        
                    var hit
                    switch(c) {
                        case "c0":
                            hit = combatHit(target, {amt: 2, acc: 1, crit: 0, origin: user});
                            break;
                        case "c1":
                            hit = combatHit(target, {amt: 2, acc: 0.5, crit: 0.5, origin: user})
                            break
                    }

                    actionMessage(user, action, target, hit)
                    switch(hit) {
                        case "crit":                                
                            playCombatCrit()
                            addStatus({target: target, origin: user, status: "stun", length: 1})
                            removeStatus(target, "windup")
                            break
                        case true:
                            reactDialogue(target, 'receive_hit')
                            play("hit", 0.75)
                            break;
                        case false:
                            reactDialogue(target, 'evade')
                            play("miss", 0.75)
                            break;
                    }

                    setTimeout(()=> user.sprite.classList.remove(action.anim), 600);
                    setTimeout(()=>advanceTurn(user), env.ADVANCE_RATE);
                }
            })
        }
    },
    
    special_archiveshelf_annihilate: {
        slug: "special_archiveshelf_annihilate",
        name: "Annihilation",
        type: 'special+nomimic',
        desc: "'utilize long limbs to eviscerate a target'",
        anim: "wobble",
        choiceAnim: "special_choice-movefriend",
        choiceAnimDuration: 200,
        help: "CHOOSE::100% -3HP ::OR:: 50% -2HP 50%C -2HP +1T:STUN +2T:PUNCTURE",
        usage: {
            act: "%USER LUNGES AT %TARGET",
            crit: "%TARGET IS BRUTALLY STABBED",
            hit: "%TARGET TAKES A SOLID HIT",
            miss: "%TARGET ESCAPED BY A HAIR"
        },

        details: {
            onUse: `'present target foe a choice of outcome'`,
            conditional: `<em>HIT 1</em>::'HIT::[STAT::hit1ACC]% CRIT::0% [STAT::hit1HP]'\n<em>HIT 2</em>::'HIT::[STAT::hit2ACC]% CRIT::[STAT::hit2CRIT]% [STAT::hit2HP]';'[STATUS::stun] [STATUS::puncture] on CRIT'`
        },

        stats: {
            hit1HP: 3,
            hit1ACC: 100,
            hit2HP: 2,
            hit2ACC: 50,
            hit2CRIT: 50,

            status: {
                stun: { name: 'stun', length: 1 },
                puncture: { name: 'puncture', length: 2 }
            },
        },

        noRepeat: true,
        exec: function(user, target) {
            user.sprite.classList.add('special_choice-movefriend')
            let action = this

            //summon a div that lets the player click guaranteed or chance
            actionChoice({
                user: user,
                action: action,
                choiceText: `The shelf lunges at ${target.name}...`,
                options: [
                    {text: "Withstand the attack", definition: "NOTE::'100% -3HP'"},
                    {text: "Try a risky dodge", definition: "NOTE::'50% -2HP 50%C -2HP +1T:STUN +2T:PUNCTURE'"},
                ],
                choiceCallback: (c) => {
                    //reap the consequences
                    user.sprite.classList.add(action.anim)
                        
                    var hit
                    switch(c) {
                        case "c0":
                            hit = combatHit(target, {amt: 3, acc: 1, crit: 0, origin: user});
                            break;
                        case "c1":
                            hit = combatHit(target, {amt: 2, acc: 0.5, crit: 0.5, origin: user})
                            break
                    }

                    actionMessage(user, action, target, hit)
                    switch(hit) {
                        case "crit":                                
                            playCombatCrit()
                            addStatus({target: target, origin: user, status: "stun", length: 1})
                            addStatus({target: target, origin: user, status: "puncture", length: 2, noReact: true})
                            removeStatus(target, "windup")
                            break
                        case true:
                            reactDialogue(target, 'receive_hit')
                            play("stab", 0.75)
                            break;
                        case false:
                            reactDialogue(target, 'evade')
                            play("miss", 0.75)
                            break;
                    }

                    setTimeout(()=> user.sprite.classList.remove(action.anim), 600);
                    setTimeout(()=>advanceTurn(user), env.ADVANCE_RATE);
                }
            })
        }
    },

    incoherent_movefriend: {
        slug: "incoherent_movefriend",
        name: "Wallspikes",
        type: 'special',
        help: "BATTLEFIELD 300% -1HP",
        desc: "'k̶̡̇̄i̵͈͑̐̑̌̈́̇̾̕͝l̷̡͓̬̩̖̽̂̿̏͒̎̽̏̀̿̏̅̈l̵̯̦̪͠'",
        accuracy: 1,
        crit: 0,
        exec: function(user, target) {
            addStatus({target: user, status: "incoherent", length: 1, noReact: true});
            if(user.state == "lastStand") actionMessage(user, "THE WALLS TWIST AROUND THE WHOLE TEAM", target);
            else actionMessage(user, "THE WALLS SHIFT AROUND %TARGET", target);

            //vortex on screen, circle expands into fullscreen bg (animation in CSS)
            env.rpg.insertAdjacentHTML('beforeend', `
                <div class="golem-vortex bh-action-${user.slug} bh-action"></div>
                <div id="${user.slug}-bh" class="bh-action-${user.slug} bh-action">
                    <div class="bh_damage-wrapper"></div>
                </div>
            `);
            env.rpg.vortex = document.querySelector(`.golem-vortex.bh-action-${user.slug}`)
            env.rpg.actionZone = document.querySelector(`#${user.slug}-bh`)

            //animate the vortex
            setTimeout(()=>{
                env.rpg.vortex.classList.add('active');

                //we should set this up so that on last stand, it randomly targets the whole (living) team
                //additionally, it should end early on full death
                bh_start({
                    playerEl: `<div id="bh_player" class="notice" style="background-image:url(${target.portraitUrl})"></div>`, 
                    onHit: () => {
                        var hit
                        if(user.state == "lastStand") {
                            let possibleTargets = env.rpg.allyTeam.members.filter(member => member.hp > 0)
    
                            if(possibleTargets.length == 0) env.bulletHell.complete()
                            hit = combatHit(possibleTargets[rand(0, possibleTargets.length)], {amt: 1, acc: 2, crit: 0, origin: user});
                            if(hit) play('hit', 1.5, 0.5); else play("miss", 1.25, 0.5)
                            
                        } else if(target.state != "dead") {
                            hit = combatHit(target, {amt: 1, acc: 2, crit: 0, origin: user});
                            if(hit) play('hit', 1.5, 0.5); else play("miss", 1.25, 0.5)
                            if(target.hp == 0) env.bulletHell.complete()
                        } else {
                            env.bulletHell.complete()
                        }
    
                        if(hit == false) return "dodged"; else return "damaged"
                    }
                })

                //animation done, activate ze game
                setTimeout(()=>{
                    body.classList.add('in-golem-vortex')
                    env.rpg.actionZone.classList.add('active')
                    document.querySelector(`#bh_player`).classList.add('active')

                    //changes moves based on health - string refers to the urgency with which he shoots, missing more the lower his HP is but creating more hazards that way
                    if(!user.tutorial) {
                        startDialogue("d3_movespecial")
                        user.tutorial = true
                    } else if(user.state == "lastStand") { //0 hp
                        bh_movefriend({level: "last stand", duration: 70000})
                    } else if (user.hp < (0.50 * user.maxhp)) { //low HP
                        bh_movefriend({level: "threatened"})
                    } else { //high HP 
                        bh_movefriend({level: "healthy"})
                    }
                }, 500);

                setTimeout(()=>{
                    env.rpg.classList.add('cull');
                }, 1500);
            }, env.ADVANCE_RATE * 0.5);
        }
    },
    
    windup: {
        slug: "windup",
        name: "Preparation",
        type: 'autohit',
        anim: "",

        usage: {
            act: "%USER PREPARES AN ATTACK..."
        },

        details: {
            flavor: `'prepare a devastating attack'`,
            onUse: `'[STATUS::windup]'`
        },

        stats: {
            status: {
                windup: {
                    name: 'windup',
                    length: 1
                },            
            }
        },
        
        exec: function(user, target) {
            play('talklaugh', 0.5);
            addStatus({target: user, status: "windup", length: 1}); 
            return 'nothing';
        }
    },
    
    windup_cover: {
        slug: "windup_cover",
        name: "Take Aim",
        type: 'autohit',
        anim: "",
        usage: {
            act: "%USER PREPARES AN ATTACK..."
        },
        details: {
            flavor: "'prepare devastating attack';'stay low';'lose windup if attention diverted'",
            onUse: `'[STATUS::windup] [STATUS::evasion]'`,
        },
        stats: {
            status: {
                evasion: {
                    name: 'evasion',
                    length: 1
                },
                windup: {
                    name: 'windup',
                    length: 1
                },
            },
        },
        noRepeat: true,
        exec: function(user, target) {
            play("talkgel")
            addStatus({target: user, status: "evasion", length: 1, noReact: true}); 
            addStatus({target: user, status: "windup", length: 1}); 
            return 'nothing';
        }
    },
    
    focused_windup: {
        slug: "focused_windup",
        name: "Extra Preparation",
        type: 'autohit',
        anim: "",
        usage: {
            act: "%USER WAITS FOR THE RIGHT MOMENT..."
        },
        details: {
            onUse: `'[STATUS::windup] [STATUS::evasion] [STATUS::focused]'`,
            flavor: "'hold prepared attack';'look for opportunity'"
        },
        stats: {
            status: {
                evasion: {
                    name: 'evasion',
                    length: 1
                },
                windup: {
                    name: 'windup',
                    length: 1
                },
                focused: {
                    name: 'focused',
                    length: 1
                },
            },
        }, 
        
        avoidChaining: true,
        exec: function(user, target) {
            play('talklaugh', 0.5);
            addStatus({target: user, status: "windup", length: 1}); 
            addStatus({target: user, status: "evasion", length: 1, noReact: true}); 
            addStatus({target: user, status: "focused", length: 1, noReact: true});
            return 'nothing';
        }
    },
    
    hold_aim: {
        slug: "hold_aim",
        name: "Hold Aim",
        type: 'autohit',
        anim: "",
        usage: {
            act: "%USER WAITS FOR THE RIGHT MOMENT..."
        },
        details: {
            onUse: `'[STATUS::windup] [STATUS::evasion] [STATUS::focused]'`,
            flavor: "'hold prepared attack';'look for opportunity'"
        },
        stats: {
            status: {
                evasion: {
                    name: 'evasion',
                    length: 1
                },
                windup: {
                    name: 'windup',
                    length: 1
                },
                focused: {
                    name: 'focused',
                    length: 1
                },
            },
        }, 
        noRepeat: true,
        exec: function(user, target) {
            play("talkgel", 0.8)
            addStatus({target: user, status: "windup", length: 1}); 
            addStatus({target: user, status: "evasion", length: 1, noReact: true}); 
            addStatus({target: user, status: "focused", length: 1, noReact: true});
            return 'nothing';
        }
    },

    archival_smash: {
        slug: "archival_smash",
        name: "Calculated Strike",
        type: 'target',
        desc: "'focused, deadly attack upon one target';'immense physical trauma'",
        anim: "basic-attack",
        help: "100% -4HP, 40% X2 +1T:STUN",
        usage: {
            act: "%USER CHARGES %TARGET",
            crit: "%TARGET IS LEFT REELING",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        details: {
            flavor: "'focused, deadly attack upon one target';'immense physical trauma'",
            onHit: `'[STAT::amt]'`,
            onCrit: `'[STATUS::stun]'`,
        },
        stats: {
            crit: 0.4,
            amt: 4,
            status: {
                stun: {
                    name: 'stun',
                    length: 1
                }
            },
        },
        exec: function(user, target) {
            removeStatus(user, "windup")
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'hit',
                    rate: 0.8
                },
                critStatus: {
                    name: 'stun',
                    length: 1
                }
            })
        }
    },

    kivii_grasp: {
        slug: "kivii_grasp",
        name: "Grasp",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER GRASPS AT %TARGET",
            crit: "%TARGET IS CRUSHED",
            hit: "%TARGET IS CAUGHT",
            miss: "%TARGET EVADES"
        },

        details: {
            flavor: "'utilize gauntlet';'immobilize and crush target';'leave critically open to attack'",
            onUse: `'[STAT::amt] [STAT::vulnerable]'`,
            onCrit: `'[STATUS::stun]'`,
        },

        stats: {
            accuracy: 0.8,
            crit: 0.3,
            amt: 1,
            status: {
                stun: { name: 'stun', length: 2 },
                vulnerable: { name: 'vulnerable', length: 1 },
            },
        },

        exec: function(user, target) {
            removeStatus(user, "windup")
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'hit',
                    rate: 2
                },

                hitExec: ({target})=> {
                    addStatus({target, status: "vulnerable", length: 1, noReact: true});
                },

                critExec: ({target})=>{
                    addStatus({target, status: "stun", length: 2}); 
                }
            })
        }
    },

    rez: {
        slug: "rez",
        name: "Unfair Advantage",
        type: 'rez+autohit',
        anim: "heal",
        usage: {
            act: "%USER BRINGS %TARGET BACK TO THEIR FEET",
            hit: "%TARGET IS READY TO FIGHT",
            crit: "%TARGET GETS A SECOND WIND"
        },

        details: {
            flavor: "'repair ally to fighting condition';'used only as last resort'",
            onUse: `'revive target at [STAT::percentage]%HP'`,
        },

        stats: {
            autohit: true,
            percentage: 25,
        },

        autohit: true,
        exec: function(user, target) {
            play('mend', 0.5);
            
            target.hp = Math.floor(target.maxhp * 0.25)
            combatRevive(target)
            reactDialogue(target, 'receive_rez')

            return "critbuff";
        },

        //required to be last one standing
        disableIf: (actor) => {
            if(actor.team.name == "ally") return false;
            return (
                actor.team.members.some(member => ((member != actor) && (member.state != "dead") ))
                ||
                hasStatus(actor,"fear")
            )
        }
    },

    //golem maintenance enemy expansion
    husk_attack: {
        slug: "husk_attack",
        name: "Familiar Strike",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER SPRINTS AT %TARGET",
            crit: "%TARGET FACES THEIR MORTALITY",
            hit: "%TARGET IS STRUCK WITH BROKEN LIMBS",
            miss: "%TARGET EVADES"
        },
        details: {
            flavor: `'utilized warped limbs to strike target';'occasionally terrifying'`,
            onHit: `'[STAT::amt]'`,
            onCrit:`'[STATUS::fear] to all foes'`,
        },
        stats: {
            accuracy: .8,
            crit: 0.1,
            amt: 2,
            status: {
                fear: {
                    name: 'fear',
                    length: 2
                }
            },
        },
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,

                critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                    team: user.enemyTeam,
                    exec: (actor, i)=>{
                        addStatus({target: actor, origin: user, status: "fear", origin: user, length: 2}); 
                        play('fear', 0.75);
                    }
                })
            })
        }
    },
    
    //ditto but weaker and used by hallucinations
    husk_attack_weak: {
        slug: "husk_attack_weak",
        name: "Psychosis",
        type: 'target',
        desc: "'manifest imagined attack directly in flesh';'occasionally terrifying'",
        anim: "basic-attack",
        help: "50% -1HP, 10%C x2 + (FOES::+2T:FEAR)",
        usage: {
            act: "%USER SPRINTS AT %TARGET",
            crit: "%TARGET FACES THEIR MORTALITY",
            hit: "%TARGET IS STRUCK, BUT BY WHAT?",
            miss: "%TARGET EVADES"
        },
        accuracy: 0.5,
        crit: 0.1,
        amt: 1,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,

                critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                    team: user.enemyTeam,
                    exec: (actor, i)=>{
                        addStatus({target: actor, origin: user, status: "fear", origin: user, length: 2}); 
                        play('fear', 0.75);
                    }
                })
            })
        }
    },

    speak: {
        slug: "speak",
        name: "Speak",
        type: 'target',
        anim: "skitter",
        usage: {
            act: "%USER APPROACHES %TARGET",
            crit: "%TARGET IS PARALYZED BY FEAR",
            hit: "%USER WHISPERS SOMETHING TO %TARGET",
            miss: "%TARGET RECOILS"
        },
        details: {
            flavor: "'utilize remains to speak';'express aggressor signal directly'",
            onHit: `'[STATUS::fear]'`,
            onCrit:`'[STATUS::stun]'`,
        },
        stats: {
            accuracy: .8,
            crit: 0.1,
            amt: 0,
            status: {
                fear: {
                    name: 'fear',
                    length: 2
                },
                stun: {
                    name: 'stun',
                    length: 1
                }
            },
        },
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'talksignal',
                    rate: 1
                },
                hitExec: ()=>{
                    reactDialogue(user, `give_fear`)
                },
                critSfx: {
                    name: 'fear',
                    rate: 0.75
                },
                critStatus: {
                    name: 'stun',
                    length: 1
                },
                hitStatus: {
                    name: 'fear',
                    length: 2
                },
            })
        }
    },

    berserk: {
        slug: "berserk",
        name: "Berserk",
        type: 'autohit',
        help: "+1T:DESTABILIZE +2T:SPIKES +2T:VULNERABLE",
        anim: "heal",
        usage: {
            act: "%USER MELTS INTO A MORE AGGRESSIVE SHAPE"
        },

        details: {
            flavor: `'self-modify for maximum offense';'destabilize form and react to attacks'`,
            onUse: `[STATUS::destabilized] [STATUS::spikes] [STATUS::vulnerable]`
        },

        stats: {
            status: {
                destabilized: { name: 'destabilized', length: 1 },
                spikes: { name: 'spikes', length: 2 },
                vulnerable: { name: 'vulnerable', length: 2 },
            }
        },
        
        exec: function(user, target) {
            play('destabilize', 0.5);
            addStatus({target: user, status: "vulnerable", length: 2, noReact: true}); 
            addStatus({target: user, status: "destabilized", length: 1, noReact: true}); 
            addStatus({target: user, status: "spikes", length: 2, noReact: true}); 
            return 'nothing';
        },
    },
    
    special_self_destruct: {
        slug: "special_self_destruct",
        name: "Self Destruct",
        type: 'special',
        desc: "'form shrapnel in body';'propel through unsustainable means'",
        help: "FOES::50% -1HP, 100% SELF -1HP",
        anim: "explode",
        usage: {
            act: "%USER JUST EXPLODES"
        },

        details: {
            flavor: `'form shrapnel in body';'propel through unsustainable means'`,
            onUse: `'HIT all foes';'[STAT::amt] to self'`,
            onHit: `'[STAT::amt]'`
        },

        stats: {
            accuracy: 0.5,
            amt: 1,
        },

        exec: function(user, target, beingUsedAsync) {
            let action = this
            play('shot5', 0.6)
            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action: action, 
                        user, 
                        target: actor,
                        hitSfx: { name: 'shot2' },
                        critSfx: { name: 'shot6' },
                        critStatus: {
                            name: 'stun',
                            length: 1
                        },
                    })

                    combatHit(user, {amt: 1, autohit: true, crit: 0, origin: user, redirectable: false, runEvents: false})
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },

    special_dullsummon: {
        slug: "special_dullsummon",
        name: "Dull Portal",
        type: 'special+summon',
        anim: "heal",

        details: {
            flavor: `'collect additional allies from elsewhere'`,
            conditional: `<em>SUMMON::</em>'summon 2 dull containers (max:7)'`
        },

        noRepeat: true,
        exec: function(user, target) {
            actionMessage(user, "%USER CONJURES CONTAINERS VIA THE DULL", target, 'none', 2000);
            play('dull', 0.8, 1);
            
            //try to center the dude
            if(user.team.members.length == 6) {
                let uI = user.team.members.findIndex(a => a.slug == user.slug)
                if(uI < 3) midCombatActorAdd(env.rpg.enemyTeam, 'dull_container', 'left')
                else if(uI >= 3) midCombatActorAdd(env.rpg.enemyTeam, 'dull_container', 'right')
            } else {
                midCombatActorAdd(env.rpg.enemyTeam, 'dull_container', 'left')
                midCombatActorAdd(env.rpg.enemyTeam, 'dull_container', 'right')
            }

            setTimeout(()=>advanceTurn(user), 1000)
        },
        disableIf: (actor) => {return actor.team.members.length >= 7}
    },
    
    special_dullbuff: {
        slug: "special_dullbuff",
        name: "Dull Overload",
        type: 'special',
        desc: "'",
        help: "ALLIES::+1T:DESTABILIZED, +1T:FOCUSED",
        anim: "basic-attack",
        usage: {
            act: "%USER FLOODS THEIR ALLIES WITH DULL LIGHT"
        },

        details: {
            flavor: `'destabilize allies via dull exposure';'attain direct control and focus attack'`,
            onUse: `'[STATUS::destabilized] [STATUS::focused] to all allies'`,
        },

        stats: {
            autohit: true,
            status: {
                destabilized: {name: "destabilized", length: 1},
                focused: {name: "focused", length: 1},
            }
        },

        exec: function(user, target, beingUsedAsync) {
            play('dull', 0.75, 1);
            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i) => {
                    addStatus({target: actor, origin: user, status: "destabilized", length: 1, noReact: true}); 
                    addStatus({target: actor, origin: user, status: "focused", length: 1, noReact: true}); 
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        },
        disableIf: (actor) => {
            if(actor.team.name == "ally") return false;
            return actor.team.members.length < 7
        }
    },

    special_chant: {
        slug: "special_chant",
        name: "█████",
        type: 'special+summon',
        desc: "'██████ ███ █████';'convey malignant thoughtforms via speech'",
        help: "FOES::80% -1HP, 30% x2 +1T:WEAKENED SUMMON::+1 HALLUCINATION (MAX:4)",
        anim: "orbshake",
        accuracy: 0.8,
        crit: 0.3,
        amt: 1,
        usage: {
            act: "%USER ██████ ███ █████"
        },
        noRepeat: true,
        exec: function(user, target, beingUsedAsync) {
            let action = this
            
            user.sprite.classList.add('orbshake')
            setTimeout(function(){user.sprite.classList.remove('orbshake')}, 1200);

            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action: action, 
                        user, 
                        target: actor,
                        hitSfx: { name: 'talksignal' },
                        critSfx: { name: 'fear', rate: 0.75 },
                        critStatus: {
                            name: 'weakened',
                            length: 1
                        },
                        critExec: ({target}) => {
                            user.lastSide = !user.lastSide
                            env.hallucinator = target.slug
                            if(env.hallucinator == "ikgolem" && env.ep4) env.hallucinator = "ikgolem_ep4"
                            if(user.team.members.filter(m=>m.slug.includes('hallucination')).length < 4) {
                                midCombatActorAdd(env.rpg.enemyTeam, 'hallucination', user.lastSide ? "left" : "right")
                            }
                        }
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },

    incoherent_golemboss: {
        slug: "incoherent_golemboss",
        name: "GOLEM BRAWL",
        type: 'special',
        desc: "MELEE FOE_KO::'-20HP' ALLY_KO::'-3HP'",
        accuracy: 1,
        crit: 0,
        exec: function(user, target) {
            addStatus({target: user, status: "incoherent", length: 1, noReact: true});
            actionMessage(user, "%USER RAISES ITS GAUNTLETS", target);

            if(!page.melee) page.melee = new FPFight()
            
            if(user.state != "lastStand") { //regular melee mode
                let halfHP = (user.hp < user.maxhp / 2)

                page.melee.start({
                    movesPerStep: halfHP ? 3 : 2,
                    koCallback: ({playerDamaged, enemyDamaged}) => {
                        console.log(playerDamaged, enemyDamaged)

                        let trueTarget = env.rpg.allyTeam.members.filter(member => member.hp > 0).sample()
                        let message

                        if(enemyDamaged) {
                            message = "%USER IS STRUCK DOWN"

                            user.box.classList.add('struck')
                            user.sprite.classList.add('struck')
                            reactDialogue(user, 'receive_crit')

                            setTimeout(()=>{user.sprite.classList.remove('struck');user.box.classList.remove('struck');}, 4000)


                            combatHit(user, {amt: 20, autohit: true, crit: 0})
                        }

                        if(playerDamaged) {
                            if(trueTarget.slug == "ikgolem") message = "%TARGET IS STRUCK DOWN"
                            else message = "%TARGET IS HURT IN THE CHAOS"

                            trueTarget.box.classList.add('struck')
                            reactDialogue(trueTarget, 'receive_crit')

                            setTimeout(()=>{trueTarget.box.classList.remove('struck');}, 4000)

                            combatHit(trueTarget, {amt: 3, autohit: true, crit: 0})
                        }

                        if(playerDamaged && enemyDamaged) message = "%TARGET AND %USER ARE BOTH HURT IN THE CHAOS"

                        page.melee.stop()
                        setTimeout(()=>{
                            actionMessage(user, message, trueTarget, "crit", 3000)

                            advanceTurn()
                        }, 1000)
                    }
                })    

                if(!user.usedMelee) {
                    user.usedMelee = true
                    startDialogue('boss_tut')
                    page.melee.tutorialStep()
                } else if(halfHP && !user.halfAlert) {
                    user.halfAlert = true
                    startDialogue('boss_half')
                }
            } else { //last stand mode
                startDialogue('boss_laststand')

                page.melee.start({
                    height: 11,
                    movesPerStep: 3,
                    koCallback: ({playerDamaged, enemyDamaged}) => {
                        console.log(playerDamaged, enemyDamaged)

                        let trueTarget = env.rpg.allyTeam.members.filter(member => member.hp > 0).sample()
                        let message

                        if(enemyDamaged) {
                            user.box.classList.add('struck')
                            setTimeout(()=>{user.sprite.classList.remove('struck');user.box.classList.remove('struck');}, 4000)
                            page.melee.el.classList.add('fp-stopped')
                            page.melee.el.classList.add('fp-closeout')

                            page.melee.fakeAttack = () => {
                                if(env.fakeAttacking == true) return
                                env.fakeAttacking = true
                                page.melee.player.golem.setAttribute('a', 'advance')
                            
                                setTimeout(()=>page.melee.el.setAttribute('a_stage', 'windup'), 100)
                                setTimeout(()=>page.melee.el.setAttribute('a_stage', 'collide'), 1000)
                                setTimeout(()=>{play('stab');env.fakeAttacking = false}, 1150)
                            }

                            startDialogue('boss_closeout')
                        }

                        if(playerDamaged) {
                            if(trueTarget.slug == "ikgolem") message = "%TARGET IS STRUCK DOWN"
                            else message = "%TARGET IS HURT IN THE CHAOS"

                            trueTarget.box.classList.add('struck')
                            reactDialogue(trueTarget, 'receive_crit')

                            setTimeout(()=>{chatter({text: [`keep fighting!!`, `you can do this`, `it is falling apart! just one more time!`].sample(), actor:"akizet", readout: true})}, 2000)
                            setTimeout(()=>{trueTarget.box.classList.remove('struck');}, 4000)

                            combatHit(trueTarget, {amt: 3, autohit: true, crit: 0})

                            if(env.rpg.allyTeam.members.filter(member => member.hp > 0).length == 0) { //ya died
                                page.melee.stop()
                                setTimeout(()=>advanceTurn(), 1500)
                            }
                        }
                    }
                })

                page.melee.el.classList.add('long')
            }
        }
    },

    special_steerleft: {
        slug: "special_steerleft",
        name: "Steer Left",
        type: 'special',
        autohit: true,
        usage: {
            act: "%USER STEERS THE VESSEL LEFT"
        },
        details: {
            flavor: "'direct vessel to the left of current direction';'beware of momentum';'cannot exceed frame bounds'",
            conditional: "<em>VESSEL</em>::STEER LEFT",
        },
        exec: function(user, target, beingUsedAsync) {
            if(env.boatEscape) env.boatEscape.steer("left")
            advanceTurn()
        },
    },
    
    special_steerright: {
        slug: "special_steerright",
        name: "Steer Right",
        type: 'special',
        autohit: true,
        usage: {
            act: "%USER STEERS THE VESSEL RIGHT"
        },
        details: {
            flavor: "'direct vessel to the right of current direction';'beware of momentum';'cannot exceed frame bounds'",
            conditional: "<em>VESSEL</em>::STEER RIGHT",
        },
        exec: function(user, target, beingUsedAsync) {
            if(env.boatEscape) env.boatEscape.steer("right")
            advanceTurn()
        },
    },

    special_floorit: {
        slug: "special_floorit",
        name: "Floor It",
        type: 'special',
        autohit: true,
        usage: {
            act: "%USER FLOORS IT"
        },
        details: {
            flavor: "'direct vessel to move further instead of attacking'",
            conditional: "<em>VESSEL</em>::GO FASTER",
        },
        exec: function(user, target, beingUsedAsync) {
            if(env.boatEscape) env.boatEscape.advance()
            setTimeout(()=>advanceTurn(), 200)
        },
    },

    sidearm: {
        slug: "sidearm",
        name: "Sidearm",
        type: 'target',
        anim: "basic-attack",
        verb: "shoot",
        usage: {
            act: "%USER FIRES AT %TARGET",
            crit: "%TARGET IS LEFT REELING",
            hit: "%TARGET IS STRUCK",
            miss: "%USER MISSES"
        },
        details: {
            flavor: "'utilize high-caliber sidearm';'chance for immense physical trauma'",
            onHit: `'[STAT::amt]'`,
            onCrit:`'[STATUS::stun]'`,
        },
        stats: {
            accuracy: .8,
            crit: 0.5,
            amt: 2,
            status: {
                stun: {
                    name: 'stun',
                    length: 2
                }
            },
        },
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'shot',
                    rate: 1
                },
                critSfx: {
                    name: 'shot',
                    rate: 1.25
                },
                critStatus: {
                    name: 'stun',
                    length: 1
                },
                missSfx: { name: "shot2", rate: 0.9 },
            })
        }
    },
    
    unfocused_shot: {
        slug: "unfocused_shot",
        name: "Hip Shot",
        verb: "shoot",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER FIRES AT %TARGET",
            crit: "%TARGET TAKES A BIG HIT",
            hit: "%TARGET IS STRUCK",
            miss: "%USER MISSES"
        },
        details: {
            flavor: "'fire without intense aim';'could hit';'a gamble'",
            onHit: `'[STAT::amt]'`,
        },
        stats: {
            accuracy: .5,
            crit: 0.5,
            amt: 2,
        },
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'shot',
                    rate: 1
                },
                critSfx: {
                    name: 'shot',
                    rate: 1.25
                },
                missSfx: { name: "shot2", rate: 0.9 },
            })
        }
    },

    focused_shot: {
        slug: "focused_shot",
        name: "Focused Shot",
        verb: "shoot",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER FIRES AT %TARGET",
            crit: "%TARGET IS TORN APART",
            hit: "%TARGET TAKES A BIG HIT",
            miss: "%USER MISSES"
        },
        details: {
            flavor: "'well-placed high-caliber shot';'immense physical trauma'",
            onHit: `'[STAT::amt]'`,
            onCrit:`'[STATUS::vulnerable] [STATUS::stun] [STATUS::critical_flaw]'`,
        },
        stats: {
            accuracy: 1,
            crit: 0.4,
            amt: 10,
            status: {
                vulnerable: {
                    name: 'vulnerable',
                    length: 3
                },
                stun: {
                    name: 'stun',
                    length: 1
                },
                critical_flaw: {
                    name: 'critical_flaw',
                    length: 1
                }
            },
        },
        exec: function(user, target) {
            removeStatus(user, "windup")
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'shot',
                    rate: 1.25
                },
                critSfx: {
                    name: 'shot',
                    rate: 1.5
                },
                missSfx: { name: "shot2", rate: 0.9 },

                critExec: ({target})=>{
                    addStatus({target, status: "vulnerable", length: 3}) 
                    addStatus({target, status: "stun", length: 1}) 
                    addStatus({target, status: "critical_flaw", length: 1})
                }
            })
        }
    },


    /**** EP3ADD2 additions ****/
    primary: { // intended to be replaced
        slug: "primary",
        name: "Attack",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER ATTACKS %TARGET",
            crit: "A FRIGHTENING BLOW",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        details: {
            flavor: "'improvised attack using scenery';'may accidentally cause effective trauma'",
            onHit: `'[STAT::amt]'`,
            onCrit:`'inflict one of following';'[STATUS::puncture]';'[STATUS::weakened]';'[STATUS::vulnerable]'`,
        },
        stats: {
            accuracy: .8,
            crit: 0.3,
            amt: 1,
            status: {
                weakened: {
                    name: 'weakened',
                    length: 2
                },
                puncture: {
                    name: 'puncture',
                    length: 2
                },
                vulnerable: {
                    name: 'vulnerable',
                    length: 2
                }
            },
        },
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,

                critExec: ({target})=> {
                    let rand = Math.random()
                    if(rand < 0.3) {
                        addStatus({target, origin: user, status: "puncture", origin: user, length: 2}); 
                        
                    } else if(rand < 0.6) {
                        addStatus({target, origin: user, status: "weakened", origin: user, length: 2}); 

                    } else {
                        addStatus({target, origin: user, status: "vulnerable", origin: user, length: 2}); 
                    }
                }
            })
        }
    },

    secondary: { // intended to be replaced
        slug: "secondary",
        name: "Daze",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER LEAPS AT %TARGET",
            crit: "%TARGET IS LEFT REELING",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        details: {
            flavor: "'a crude and unpracticed strike';'attempt to disorient target'",
            onHit: `'[STAT::amt]'`,
            onCrit:`'[STATUS::stun]'`,
        },
        stats: {
            accuracy: .5,
            crit: 0.5,
            amt: 1,
            status: {
                stun: {
                    name: 'stun',
                    length: 1
                },
            },
        },
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                critStatus: {
                    name: 'stun',
                    length: 1
                }
            })
        }
    },

    //vanity rename for veilklight usage
    daze_lastresort: {
        slug: "daze_lastresort",
        name: "Bash",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER SWINGS AT %TARGET",
            crit: "%TARGET IS LEFT REELING",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        details: {
            flavor: "'last resort attack';'swing self'",
            onHit: `'[STAT::amt]'`,
            onCrit:`'[STATUS::stun]'`,
        },
        stats: {
            accuracy: .5,
            crit: 0.5,
            amt: 1,
            status: {
                stun: {
                    name: 'stun',
                    length: 1
                },
            },
        },
        exec: (user, target)=>{env.ACTIONS.secondary.exec(user, target)},
        
        disableIf: (actor) => {
            if(actor.team.name == "ally") return false;
            //disable if you aren't the last standing, but allow if everyone still standing is a veilklight
            return actor.team.members.some(member => ((member != actor) && ((member.state != "dead") && (member.originalSlug != "veilklight")) ))
        },
        
    },

    //daze if it real
    daze_good: { 
        slug: "daze_good",
        name: "Throw It",
        verb: "throw at",
        type: 'target',
        anim: "basic-attack",
        help: "80% -1HP, 60%C x2 +1T:STUN",
        itemAction: true,
        usage: {
            act: "%USER THROWS SOMETHING AT %TARGET",
            crit: "%TARGET IS KNOCKED DOWN",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },

        details: {
            flavor: `'a spirited overhead throw';'likely to stun target with item weight'`,
            onHit: `'[STAT::amt]'`,
            onCrit: `'[STATUS::stun]'`,
        },

        stats: {
            accuracy: 0.8,
            crit: 0.6,
            amt: 1,
            status: {
                stun: {name: "stun", length: 1},
            }
        },

        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                critStatus: {
                    name: 'stun',
                    length: 1
                }
            })
        }
    },

    sacrifice: {
        slug: "sacrifice",
        name: "Offering",
        type: 'self+autohit+support',
        anim: "",
        usage: {
            act: "%USER PREPARES FOR DESPERATE MEASURES"
        },
        details: {
            flavor: "'empowers next move greatly';'optionally use HP for revival'",
            onUse:`'[STATUS::sacrifice] [STATUS::evasion]'`,
        },

        stats: {
            status: {
                evasion: {
                    name: 'evasion',
                    length: 2
                },
                sacrifice: {
                    name: 'sacrifice',
                    length: 1
                }
            },
        },
        
        exec: function(user, target) {
            play("talkchoir7", 2)
            addStatus({target: user, status: "evasion", length: 2, noReact: true})
            setTimeout(()=>{
                addStatus({target: user, status: "sacrifice", length: 1, noReact: true})
            }, 400)
            
            return 'nothing'
        },

        avoidChaining: true
    },
    
    special_final_sacrifice: {
        slug: "special_final_sacrifice",
        name: "Final Offering",
        type: 'special',
        anim: "basic-attack",
        
        usage: {
            act: "%USER GOES IN A BLAZE OF GLORY"
        },
        details: {
            flavor: "'extend self beyond limits';'spend own health for total destruction'",
            onUse:`'[STATUS::evasion] [STATUS::sacrifice]';'[STATUS::empowered] to all allies';'HIT all foes via SPECIAL'`,
            conditional: `<em>SPECIAL::</em>'reduce user HP to 1, dealing 200% lost HP as damage split over living foes (min:1)'`
        },
        stats: { 
              accuracy: 1,
              crit: 0,
              amt: 0,
            status: {
                evasion: {
                    name: 'evasion',
                    length: 2
                },
                sacrifice: {
                    name: 'sacrifice',
                    length: 1
                },
                empowered: {
                    name: 'empowered',
                    length: 2
                }
            },
        },

        exec: function(user, target, beingUsedAsync) {
            let action = this
            let living = user.enemyTeam.members.reduce((acc, mem) => acc + (mem.state != "dead" ? 1 : 0), 0)
            let hpAmt = user.hp - 1
            let splitAmt = Math.max(Math.floor((hpAmt * 2) / living), 1)
            reactDialogue(target, 'sacrifice')

            user.hp = 1
            addStatus({target: user, status: "evasion", length: 2, noReact: true})

            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i) => {
                    let anim = env.COMBAT_ANIMS.shoot
                    let baseDelay = ((env.ADVANCE_RATE * 0.2) * i)
                    let animDelay = baseDelay + anim.duration * 0.5;
                        
                    setTimeout(()=>anim.exec(action, user, actor), baseDelay)
                    setTimeout(function(){
                        env.GENERIC_ACTIONS.singleTarget({
                            action, 
                            user, 
                            target: actor,
                            hitSfx: { name: 'shot2' },
                            specialAmt: splitAmt
                        })
                    }, animDelay);
                },
                advanceAfterExec: true, beingUsedAsync, user,
                endCallback: ()=> {
                    addStatus({target: user, status: "sacrifice", length: 1, noReact: true})
                    env.GENERIC_ACTIONS.teamWave({
                        team: user.team,
                        exec: (actor, i) => {
                            addStatus({target: actor, status: "empowered", length: 2})
                        },
                        advanceAfterExec: false, beingUsedAsync
                    })
                }
            })
        },

        disableIf: (actor)=>{ if(actor.hp <= 5) return "REQUIRES HP OVER 5" },
    }, 
    
    //vanity rename/redescription
    sacrifice_restore: {
        slug: "sacrifice_restore",
        name: "Sacrifice",
        type: 'support+target+self+rez+autohit',
        anim: "heal",
        verb: "sacrifice for",
        usage: {
            act: "%USER FIXES UP %TARGET",
            crit: "%TARGET FEELS WAY BETTER",
            hit: "%TARGET FEELS BETTER",
            miss: "%TARGET IS TOO SLIPPERY"
        },

        details: {
            flavor: "'consume health to restore target';'requires offering'",
            onUse: `'[STAT::selfHP] to self'`,
            onHit: `'[STAT::amt] [STATUS::regen]'`,
            onCrit: `'additional [STAT::amt] [STATUS::regen]'`,
            conditional: `<em>VS DOWN::</em>'revive target';'[STATUS::evasion] [STATUS::regen]'`
        },

        stats: {
            autohit: true,
            crit: 0.1,
            selfHP: 2,
            amt: -5,
            status: {
                evasion: { name: "evasion", length: 2 },
                regen: { name: "regen", length: 3 },
            }
        },
        
        beneficial: true,
        exec: (user, target, beingUsedAsync)=>{
            env.ACTIONS.restore.exec(user, target, beingUsedAsync)
            combatHit(user, {amt: 2, autohit: true, redirectable: false, runEvents: false, origin: user})
        },

        disableIf: (actor)=>{ 
            if(actor.actions.includes("sacrifice") || actor.actions.includes("special_final_sacrifice")) {
                if(hasStatus(actor, "sacrifice")) return false
                else return "MUST FIRST USE OFFERING"
            } else return false
        },
    },

    ichor_passive_restore: {
        slug: "ichor_passive_restore",
        name: "Our Last Stand",
        type: 'support+target+self+rez+autohit',
        anim: "heal",
        usage: {
            act: "%USER PULLS %TARGET BACK UP",
            hit: "%TARGET HAS ONE MORE CHANCE"
        },

        details: {
            flavor: "'not over yet'",
            onUse: `'revive target';'[STAT::amt] [STAT::amtBP] [STATUS::evasion] to target'`,
        },

        stats: {
            autohit: true,
            amt: -1,
            amtBP: 5,
            status: {
                evasion: {
                    name: 'evasion',
                    length: 1
                },               
            }
        },
        
        beneficial: true,
        exec: (user, target)=>{
            return env.GENERIC_ACTIONS.singleTarget({
                beneficial: true,
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'mend',
                    rate: 1
                },
                genExec: ({target})=>{
                    target.hp = 1
                    combatRevive(target)
                    reactDialogue(target, 'receive_rez')
                    addStatus({target: target, origin: user, status: "evasion", length: 1, noReact: true})
                    target.bp = 5
                }                
            })
        }
    },

    surge: {
        slug: "surge",
        name: "Surge",
        type: 'self+autohit+support',
        anim: "",
        usage: {
            act: "%USER IS ENERGIZED"
        },
        details: {
            onUse: () => `'[STATUS::focused] [STATUS::surge]'`,
            flavor: "'charge forward without worry'"
        },

        stats: {
            status: {
                surge: {
                    name: 'surge',
                    length: 1
                },
                focused: {
                    name: 'focused',
                    length: 1
                },                
            }
        },
        beneficial: true,
        
        disableIf: (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" },
        exec: function(user, target) {
            play("talkchoir7", 2)
            addStatus({target: user, status: "surge", length: 1, noReact: true})
            addStatus({target: user, status: "focused", length: 1, noReact: true}); 
            return 'nothing'
        }, 

        avoidChaining: true
    },  

    wild_surge: {
        slug: "wild_surge",
        name: "Wild Surge",
        type: 'self+autohit+support',
        anim: "",
        details: {
            onUse: `'gain [STATUS::focused] [STATUS::wild_surge]'`,
            flavor: "'overexert self for extreme effectiveness';'next targeted action is used across entire team';'exertion causes short stun'"
        },

        stats: {
            status: {
                wild_surge: {
                    name: 'wild_surge',
                    length: 1 
                },
                focused: {
                    name: 'focused',
                    length: 1
                },                
            }
        },

        usage: {
            act: "%USER IS ENERGIZED"
        },

        beneficial: true,
        
        disableIf: (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" },
        exec: function(user, target) {
            play("talkchoir7", 1.5)
            addStatus({target: user, status: "wild_surge", length: 1, noReact: true})
            addStatus({target: user, status: "focused", length: 1, noReact: true}); 
            return 'nothing'
        },

        avoidChaining: true
    },    

    exploit: {
        slug: "exploit",
        name: "Exploit",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER REACHES TOWARDS %TARGET",
            crit: "%TARGET FALLS APART",
            hit: "%TARGET'S FLESH MELTS AWAY",
            miss: "%TARGET RESISTS CONTROL"
        },
        details: {
            flavor: `'locate or take advantage of vulnerability in foe'`,
            onHit: `'[STAT::amt]'`,
            onCrit: `'[STATUS::vulnerable]'`,
            conditional: `<em>VS VULNERABLE::</em>'additional [STAT::amt]'`
        },
        stats: {
            accuracy: .9,
            crit: 0.2,
            amt: 1,
            status: {
                vulnerable: {
                    name: 'vulnerable',
                    length: 2
                },
            },
        },
        exec: function(user, target) {
            let amt = this.stats.amt

            if(hasStatus(target, "vulnerable")) {
                amt = this.stats.amt + 1
            }

            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                specialAmt: amt,
                user, 
                target,
                hitSfx: {
                    name: 'destabilize',
                    rate: 1.5
                },
                critStatus: {
                    name: 'vulnerable',
                    length: 2
                },
                critExec: ()=>{reactDialogue(user, `give_vulnerable`)}
            })
        }
    },

    coordination: {
        slug: "coordination",
        name: "Coordination",
        type: 'self+autohit+support',
        anim: "",
        usage: {
            act: "%USER CALLS OUT DIRECTIONS"
        },
        details: {
            flavor: "'back off';'guide entire team'",
            onUse:`'[STATUS::evasion] to self';'[STATUS::focused] to all allies'`,
        },
        stats: {
            status: {
                evasion: {
                    name: 'evasion',
                    length: 1
                },
                focused: {
                    name: 'focused',
                    length: 1
                },
            },
        },
        autohit: true,
        disableIf: (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" },
        exec: function(user, target) {
            play("talkchoir7", 2)

            addStatus({target: user, origin: user, status: "evasion", origin: user, length: 1}); 

            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i)=>{
                    addStatus({target: actor, origin: user, status: "focused", origin: user, length: 1, noReact: true}); 
                    play('mend', 0.5);
                }
            })

            return 'nothing'
        }
    },

    plot: {
        slug: "plot",
        name: "Plan",
        type: 'autohit',
        anim: "",
        usage: {
            act: "%USER WATCHES CAREFULLY"
        },
        details: {
            flavor: "'hide vulnerability';'prepare great opportunity'",
            onUse:`'[STATUS::evasion] [STATUS::focused]'`,
        },
        stats: {
            accuracy: .8,
            crit: 0.4,
            amt: 2,
            status: {
                evasion: {
                    name: 'evasion',
                    length: 2
                },
                focused: {
                    name: 'focused',
                    length: 1
                },
            },
        },
        
        exec: function(user, target) {
            play('mend', 0.5);
            addStatus({target: user, status: "evasion", length: 2, noReact: true}); 
            addStatus({target: user, status: "focused", length: 1, noReact: true}); 
            return 'nothing';
        },

        disableIf: (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" },
        avoidChaining: true
    },    
    
    special_enact: {
        slug: "special_enact",
        name: "Enact",
        type: 'special',
        anim: "basic-attack",
        verb: "enact upon",
        details: {
            flavor: "'enact plan';'unleash flurry of strikes upon foes'",
            onUse: `'use primary action on random foes per T:[STATUS::evasion]';'lose all [STATUS::evasion]'`
        },
        stats: {
            status: {
                evasion: { name: "evasion", showReference: true }
            }
        },
        autohit: true,
        noRepeat: true,
        exec: function(user, target) {
            let amt = Math.floor(hasStatus(target, 'evasion'))
            removeStatus(user, "evasion")
            let primary = env.ACTIONS[user.actions[0]]
            actionMessage(user, "%USER LAUNCHES THEIR ATTACK", target, 'none', 1000 + (amt * 200))

            for (let i = 0; i < amt; i++) {
                env.setTimeout(()=>{
                    let target = env.rpg.enemyTeam.members.filter(t=>t.state != "dead").sample()
                    if(target) useAction(user, primary, target, {triggerActionUseEvent: i == 0, beingUsedAsync: true, reason: "enact", noUseMessage: true})
                }, i * 200)
            }

            env.setTimeout(()=>{
                advanceTurn(user)
            }, (amt * 200) + 500)
        },
        disableIf: (actor)=>{ if(!hasStatus(actor,"evasion")) return "REQUIRES EVASION" },
    },

    mad_claw: {
        slug: "mad_claw",
        name: "Mad Claw",
        verb: "claw at",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER ATTACKS %TARGET",
            crit: "A FRIGHTENING BLOW",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        details: {
            flavor: "'utilize unpredictable weaponry';'guarantee of trauma'",
            onHit: `'[STAT::amt]';'inflict one of following';'[STATUS::destabilized]';'[STATUS::fear]';'[STATUS::stun]'`,
        },
        stats: {
            accuracy: .7,
            crit: 0.3,
            amt: 2,
            status: {
                destabilized: {
                    name: 'destabilized',
                    length: 2
                },
                fear: {
                    name: 'fear',
                    length: 2
                },
                stun: {
                    name: 'stun',
                    length: 1
                },
            },
        },
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'dull',
                    rate: 1.25
                },

                hitExec: ({target})=> {
                    let rand = Math.random()
                    if(rand < 0.3) {
                        addStatus({target, origin: user, status: "destabilized", origin: user, length: 2}); 
                        
                    } else if(rand < 0.6) {
                        addStatus({target, origin: user, status: "fear", origin: user, length: 2}); 

                    } else {
                        addStatus({target, origin: user, status: "stun", origin: user, length: 1}); 
                    }
                }
            })
        }
    },    

    revise: {
        slug: "revise",
        name: "Revise",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER GRASPS BEYOND %TARGET",
            crit: "A FRIGHTENING BLOW", // noting down that this feels like it could be cooler, unrelated to what i am doing but blehhh :larval7:
            hit: "%TARGET FEELS SOMETHING TORN AWAY",
            miss: "%TARGET EVADES"
        },
        details: {
            flavor: "'strike at foes and grasp beyond flesh'",
            onHit: `'[STAT::amt]'`,
            onCrit:`'<em>invert target's beneficial statuses</em>'`,
        },
        stats: {
            accuracy: .7,
            crit: 0.3,
            amt: 2,
        },
        exec: function(user, target, beingUsedAsync) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'dull',
                    rate: 1.25
                },

                critExec: ({target})=> {
                    invertStatuses(target, (statusObj)=>statusObj.beneficial)
                }
            })
        }
    },    
    
    bone_break: { 
        slug: "bone_break",
        name: "Bone Break",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER JABS AT %TARGET'S WEAPONRY",
            crit: "%TARGET IS CRIPPLED",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        details: {
            flavor: "'strike offensive appendages of target';'chance to briefly weaken attacks and disorient'",
            onHit: `'[STAT::amt]'`,
            onCrit:`'[STATUS::weakened] [STATUS::stun]'`,
        },
        stats: {
            accuracy: .7,
            crit: 0.4,
            amt: 1,
            status: {
                weakened: {
                    name: 'weakened',
                    length: 2
                },
                stun: {
                    name: 'stun',
                    length: 1
                }
            },
        },
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,

                critExec: ({target})=>{
                    addStatus({target, status: "weakened", length: 2}) 
                    addStatus({target, status: "stun", length: 1})
                }
            })
        }
    },

    special_invite_storm: {
        slug: "special_invite_storm",
        name: "Invite Storm",
        type: 'special',
        anim: "",
        usage: {
            act: "%USER SPEAKS MADNESS"
        },
        details: {
            flavor: "'reveal a terrible truth';'mark self for death'",
            onUse: `'[STATUS::destabilized] [STATUS::vulnerable]';'HIT all foes'`,
            onHit: `'inflict one of following';'[STATUS::destabilized]';'[STATUS::fear]';'[STATUS::stun]'`,
            conditional:`<em>SPECIAL::</em>'5% chance to reduce foe HP by 75%'`
        },
        stats: {
            status: {
                destabilized: {
                    name: 'destabilized',
                    length: 2
                },
                vulnerable: {
                    name: 'vulnerable',
                    length: 1
                },
                fear: {
                    name: 'fear',
                    length: 2
                },
                stun: {
                    name: 'stun',
                    length: 1
                },
            },
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {
            play("talkfairy", 0.5)
            addStatus({target: user, status: "destabilized", length: 2});
            addStatus({target: user, status: "vulnerable", length: 1});

            let power = 0
            if(hasStatus(user, "fated_light")) {
                if(user?.member?.components) for (const [slotName, slotContents] of Object.entries(user.member.components)) { if(slotContents == "light") power++ }
                if(user?.member?.augments) for (const augmentSlug of user.member.augments) { let augment = env.ACTOR_AUGMENTS.generic[augmentSlug]; if(augment?.component) if(augment.component[1] == "light") power += 2 }
            }

            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i)=>{
                    let rand = Math.random()
                    if(rand < 0.3) {
                        play("talkfairy", 2)
                        addStatus({target: actor, origin: user, status: "destabilized", length: 2}); 
                        
                    } else if(rand < 0.6) {
                        play("fear", 1)
                        addStatus({target: actor, origin: user, status: "fear", length: 2}); 

                    } else {
                        play("fear", 2)
                        addStatus({target: actor, origin: user, status: "stun", length: 1}); 
                    }

                    if(Math.random() < 0.05 + (0.05 * power)) {
                        
                        sendFloater({
                            target: actor,
                            type: "arbitrary",
                            specialClass: "fate",
                            arbitraryString: "PERISH",
                            size: 2
                        })
                        
                        actor.hp = Math.floor(actor.hp * 0.25)

                        //special handling for weird hp usage
                        let conjoin = actor.statusEffects.find(status=>status.slug == "conjoined")
                        if(conjoin) conjoin.events.onCombatHit();
                        updateStats({actor})
                    }
                },
                
                advanceAfterExec: true, beingUsedAsync, user,
                endCallback: ()=>{console.log('just called advance')}
            })
        }
    },

    special_invoke_madness: {
        slug: "special_invoke_madness",
        name: "Invoke Madness",
        type: 'special',
        anim: "",
        usage: {
            act: "%USER SPEAKS MADNESS"
        },
        details: {
            flavor: "'impart horrific knowledge';'afflict foes with fear and madness'",
            onUse: `'[STATUS::destabilized]';'HIT all foes'`,
            onHit: `'[STATUS::fear] [STATUS::madness]'`,
            conditional:`<em>SPECIAL::</em>'5% chance to reduce foe HP by 75%'`
        },
        stats: {
            status: {
                destabilized: {
                    name: 'destabilized',
                    length: 2
                },
                fear: {
                    name: 'fear',
                    length: 2
                },
                madness: {
                    name: 'madness',
                    length: 1
                },
            },
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {
            play("talkfairy", 0.25)
            addStatus({target: user, status: "destabilized", length: 2});

            let power = 0
            if(hasStatus(user, "fated_light")) {
                if(user?.member?.components) for (const [slotName, slotContents] of Object.entries(user.member.components)) { if(slotContents == "light") power++ }
                if(user?.member?.augments) for (const augmentSlug of user.member.augments) { let augment = env.ACTOR_AUGMENTS.generic[augmentSlug]; if(augment?.component) if(augment.component[1] == "light") power += 2 }
            }

            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i)=>{
                    addStatus({target: actor, origin: user, status: "fear", length: 2}); 
                    addStatus({target: actor, origin: user, status: "madness", length: 2});

                    if(Math.random() < 0.1 + (0.05 * power)) {
                        
                        sendFloater({
                            target: actor,
                            type: "arbitrary",
                            specialClass: "fate",
                            arbitraryString: "PERISH",
                            size: 2
                        })
                        
                        actor.hp = Math.floor(actor.hp * 0.25)

                        //special handling for weird hp usage
                        let conjoin = actor.statusEffects.find(status=>status.slug == "conjoined")
                        if(conjoin) conjoin.events.onCombatHit();
                        updateStats({actor})
                    }
                },
                
                advanceAfterExec: true, beingUsedAsync, user,
                endCallback: ()=>{console.log('just called advance')}
            })
        }
    },

    special_inversion: {
        slug: "special_inversion",
        name: "Inversion",
        type: 'special',
        anim: "wobble",
        usage: {
            act: "%USER PUSHES AGAINST THEIR REALITY"
        },
        details: {
            flavor: "'grasp the nature of this place';'recognize and exploit framing device'",
            onUse:`'[STATUS::incoherent]';'invert all statuses currently in play'`
        },
        stats: {
            status: {
                incoherent: {
                    name: 'incoherent',
                    length: 1
                },
            },
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {
            play("talkfairy", 1.5)
            addStatus({target: user, status: "incoherent", length: 1, noReact: true})
            let action = this
            
            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action, 
                        user, 
                        target: actor,
                        hitSfx: {
                            name: 'talkfairy',
                            rate: 0.75
                        },
                        genExec: ({target}) => {
                            invertStatuses(actor)
                        }
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },

    /* EP3ADD2 enemy area */
    attack_weak: {
        slug: "attack_weak",
        name: "Weak Attack",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER ATTACKS %TARGET",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        details: {
            flavor: `'unskilled strike'`,
            onHit: `'[STAT::amt]'`,
        },
        stats: {
            accuracy: .8,
            amt: 1,
        },
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
            })
        }
    },

    enforce: {
        slug: "enforce",
        name: "Enforcement",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER STABS %TARGET",
            crit: "%USER JUST KEEPS GOING",
            hit: "%TARGET BLEEDS SLUDGY CORRU",
            miss: "%TARGET EVADES"
        },

        details: {
            flavor: "'relentless assault with positioning appendages';'may inspire additional smashing'",
            onHit: `'[STAT::amt] [STATUS::puncture] [STATUS::open_wound]'`,
            onCrit:`'use this action again'`,
        },

        stats: {
            accuracy: .9,
            crit: 0.15,
            amt: 1,
            status: {
                puncture: {
                    name: 'puncture',
                    length: 1
                },
                open_wound: {
                    name: 'open_wound',
                    length: 1
                }
            },
        },
        accuracy: 0.9,
        crit: 0.15,
        amt: 1,
        exec: function(user, target) {
            let action = this
            return env.GENERIC_ACTIONS.singleTarget({
                action, 
                user, 
                target,
                hitSfx: {
                    name: 'hit',
                    rate: 0.7
                },
                critSfx: {
                    name: 'hit',
                    rate: 1.5
                },

                hitExec: ({target}) => {
                    addStatus({target, status: "puncture", length: 1});
                    addStatus({target, status: "open_wound", length: 1});
                },

                critExec: ({target})=> {
                    if(target.hp > 0 && target.state != "lastStand") {
                        env.setTimeout(()=>{
                            useAction(user, this, target, {beingUsedAsync: true, reason: "enforcement"})
                        }, 400)
                    }
                }
            })
        }
    },

    focused_guard: {
        slug: "focused_guard",
        name: "Intervene",
        type: 'support+target+autohit',
        anim: "heal",
        usage: {
            act: "%USER STANDS BEFORE %TARGET",
            hit: "%TARGET IS SHIELDED BY %USER"
        },
        details: {
            flavor: "'stand in the way of target';'intercept incoming attack';'prepare to deliver destructive assault'",
            onUse: `'[STATUS::focused]';'[STATUS::redirection] to target'`,
        },
        stats: {
            status: {
                focused: {
                    name: 'focused',
                    length: 1
                },
                redirection: {
                    name: 'redirection',
                    length: 2
                },
            },
        },
        autohit: true,
        beneficial: true,
        exec: function(user, target) {
            reactDialogue(user, `give_redirection`)
            return env.GENERIC_ACTIONS.singleTarget({
                beneficial: true,
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'guard',
                    rate: 1
                },
                hitStatus: {
                    name: 'redirection',
                    length: 2
                },

                genExec: ({}) => {
                    addStatus({target: user, status: "focused", length: 1});
                },
            })
        },
        disableIf: (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" },
    },

    spikes: {
        slug: "spikes",
        name: "Spikes",
        type: 'autohit',
        anim: "heal",
        usage: {
            act: "%USER PREPARES TO TAKE A HIT"
        },
        details: {
            onUse: `'modify form defensively';'[STATUS::spikes]'`,
        },
        stats: {
            crit: 0,
            amt: 0,
            status: {
                spikes: {
                    name: 'spikes',
                    length: 1
                },
            },
        },
        disableIf: (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" },
        exec: function(user, target) {
            play('mend', 0.5);
            addStatus({target: user, status: "spikes", length: 1}); 
            return 'nothing';
        },
    },

    siphon: {
        slug: "siphon",
        name: "Siphon",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER GRASPS AT %TARGET",
            crit: "%TARGET'S TEAM IS INFESTED",
            hit: "%TARGET IS INFESTED",
            miss: "%TARGET DODGES"
        },
        details: {
            flavor: "'tap vital corru of target to sustain allies'",
            onHit: `'[STATUS::siphon]'`,
        },
        stats: {
            status: {
                siphon: {
                    name: 'siphon',
                    length: 2
                },
            },
        },
        disableIf: (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" },
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'stab',
                    rate: 0.75
                },

                hitExec: ({target})=> {
                    addStatus({target, origin: user, status: "siphon", length: 2}); 
                }
            })
        }
    },

    bite: {
        slug: "bite",
        name: "Bite",
        type: 'target',
        anim: "basic-attack",
        autohit: true,
        usage: {
            act: "%USER BITES %TARGET",
            hit: "%TARGET FEELS HORRIBLE",
        },
        details: {
            flavor: "'become unreasonable';'transfer illness'",
            onHit: `'[STAT::amt] [STATUS::rot]';'tranafer accumulated rot to target'`,
        },
        stats: {
            crit: 0,
            amt: 2,
            status: {
                rot: {
                    name: 'rot',
                    length: 3
                },
            },
        },
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'chomp',
                    rate: 1
                },

                genExec: ()=> {
                    let pow = hasStatus(user, "rot")
                    if(pow) removeStatus(user, "rot")

                    addStatus({target, origin: user, status: "rot", length: 3 + pow});
                }
            })
        }
    },

    empower: {
        slug: "empower",
        name: "Empower",
        type: 'support+target+self+autohit',
        anim: "heal",
        usage: {
            act: "%USER AFFIXES SOMETHING TO %TARGET",
            hit: "%TARGET FEELS STRONGER",
            miss: "%TARGET IS TOO SLIPPERY"
        },
        details: {
            flavor: "'grant short-lived performance applicator';'fragile adaptive device'",
            onHit: `'[STATUS::empowered]'`,
        },
        stats: {
            amt: 0,
            status: {
                empowered: {
                    name: 'empowered',
                    length: 1
                },
            },
        },
        autohit: true,
        disableIf: (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" },
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                beneficial: true,
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'mend',
                    rate: 1
                },
                hitStatus: {
                    name: 'empowered',
                    length: 1
                },
            })
        }
    },

    distraction_weak: {
        slug: "distraction_weak",
        name: "Distraction",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER FEINTS AND STRIKES %TARGET",
            crit: "%USER'S ALLIES ARE INSPIRED",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET DODGES"
        },
        details: {
            flavor: `'strike with clever feint';'may create distraction'`,
            onHit: `'[STAT::amt]'`,
            onCrit: `'[STATUS::evasion] to all allies'`,
        },

        stats: {
            accuracy: .7,
            crit: 0.2,
            amt: 1,
            range: 2,

            status: {
                evasion: {
                    name: 'evasion',
                    length: 1
                },
            },
        },
        exec: function(user, target) {
            let specialAmt = this.stats.amt + (hasStatus(target, 'vulnerable') ? 1 : 0)

            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                specialAmt,

                critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                    team: user.team,
                    exec: (actor, i)=>{
                        let length = 1
                        let userIndex = env.rpg.turnOrder.findIndex(actor=>actor.slug == user.slug)
                        if(userIndex >= 0 && userIndex < i) length = 2

                        addStatus({target: actor, origin: user, status: "evasion", origin: user, length, noReact: true}); 
                        play('mend', 0.5);
                    }
                })
            })
        }
    },

    lesser_wound: {
        slug: "lesser_wound",
        name: "Wound",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER CHARGES %TARGET",
            crit: "%TARGET IS LEFT REELING",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        details: {
            flavor: "'focused attack on vitals';'increase pain of target'",
            onHit: `'[STAT::amt] [STATUS::open_wound]'`,
            onCrit:`'[STATUS::stun]'`,
        },
        stats: {
            crit: 0.2,
            amt: 2,
            status: {
                open_wound: {
                    name: 'open_wound',
                    length: 3
                },
                stun: {
                    name: 'stun',
                    length: 1
                },
            },
        },
        exec: function(user, target) {
            removeStatus(user, "windup")
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'stab',
                    rate: 0.8
                },
                hitStatus: {
                    name: 'open_wound',
                    length: 3
                },
                critStatus: {
                    name: 'stun',
                    length: 1
                }
            })
        }
    },

    wound: {
        slug: "wound",
        name: "Greater Wound",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER CHARGES %TARGET",
            crit: "%TARGET IS LEFT REELING",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        details: {
            flavor: "'focused attack on vitals';'increase pain of target'",
            onHit: `'[STAT::amt] [STATUS::open_wound]'`,
            onCrit:`'[STATUS::stun]'`,
        },
        stats: {
            accuracy: 1,
            crit: 0.2,
            amt: 3,
            status: {
                open_wound: {
                    name: 'open_wound',
                    length: 3
                },
                stun: {
                    name: 'stun',
                    length: 1
                },
            },
        },
        exec: function(user, target) {
            removeStatus(user, "windup")
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'stab',
                    rate: 0.8
                },
                hitStatus: {
                    name: 'open_wound',
                    length: 3
                },
                critStatus: {
                    name: 'stun',
                    length: 1
                }
            })
        }
    },    
    
    //vanity rename/prohibition
    wound_lastresort: {
        slug: "wound_lastresort",
        name: "Greater Wound",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER CHARGES %TARGET",
            crit: "%TARGET IS LEFT REELING",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        details: {
            flavor: "'focused attack on vitals';'increase pain of target';'last resort attack'",
            onHit: `'[STAT::amt] [STATUS::open_wound]'`,
            onCrit:`'[STATUS::stun]'`,
        },
        stats: {
            accuracy: 1,
            crit: 0.2,
            amt: 3,
            status: {
                open_wound: {
                    name: 'open_wound',
                    length: 3
                },
                stun: {
                    name: 'stun',
                    length: 1
                },
            },
        },
        disableIf: (actor) => {
            if(actor.team.name == "ally") return false;
            //disable if you aren't the last one standing
            return actor.team.members.some(member => ((member != actor) && (member.state != "dead") ))
        },
        exec: (user, target)=>{env.ACTIONS.wound.exec(user, target)},
    },

    special_barrier_allies_weak: {
        slug: "special_barrier_allies_weak",
        name: "Quick Cover",
        type: 'special',
        anim: "cloak-barrier",
        animDuration: 4000,
        autohit: true,
        usage: {
            act: "%USER SHIELDS THEIR ALLIES"
        },

        details: {
            flavor: `'apply ablative protection'`,
            onUse: () => `'[STAT::amtBP] to nearby allies'`,
        },

        stats: {
            amtBP: 1,
            amt: 1,
        },

        disableIf: (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" },
        exec: function(user, target, beingUsedAsync) {
            let action = this

            if(user.sprite) {
                user.sprite.classList.add(action.anim)
                setTimeout(()=>play('talkgal', 2), 2000)
                setTimeout(()=>user.sprite.classList.remove(action.anim), 4000)
            }

            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        beneficial: true,
                        type: 'barrier',
                        action, 
                        user, 
                        target: actor,
                        hitSfx: {
                            name: 'mend',
                            rate: 2
                        },
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
    
    special_carapace_allies: {
        slug: "special_carapace_allies",
        name: "Reinforce",
        type: 'special',
        anim: "heal",

        usage: {
            act: "%USER ARMORS THEIR ALLIES"
        },

        details: {
            flavor: `'adapt allies to incoming attacks'`,
            onUse: `'[STATUS::carapace] to all allies'`,
        },

        stats: {
            accuracy: 1,
            crit: 0,
            autohit: true,
            status: {
                carapace: {
                    name: 'carapace',
                    length: 2
                },
            }
        },

        exec: function(user, target, beingUsedAsync) {
            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i) => {
                    if(actor.slug == user.slug) return
                    addStatus({target: actor, origin: user, status: "carapace", length: 2}); 
                    play('guard', 2, 1.5);
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
    
    special_judgement: {
        slug: "special_judgement",
        name: "Continuous Rewrite",
        type: 'special',
        anim: "",
        details: {
            flavor: "'utilize thoughtspace influence to empower massive strike'",
            onUse: `'[STATUS::windup]';'HIT all foes'`,
            onHit: `'[STAT::amt]'`,
            onCrit: `'[STATUS::destabilized] [STATUS::fear]`
        },
        usage: {
            act: "%USER TURNS THE MEMORY AGAINST YOU"
        },
        stats: {
            accuracy: 1,
            crit: 0.3,
            amt: 3,
             status: {
                windup: {
                    name: 'windup',
                    length: 2
                },
                destabilized: {
                    name: 'destabilized',
                    length: 2
                },
                fear: {
                    name: 'fear',
                    length: 2
                }, 
            }
        },
        exec: function(user, target, beingUsedAsync) {
            let action = this
            if(user.sprite) user.sprite.classList.add("basic-attack")

            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                extraDelay: 400,
                endCallback: () => {
                    if(user.sprite) user.sprite.classList.remove("basic-attack")
                    readoutAdd({
                            message: `${user.name} stays wound up!`, 
                            name: "sourceless", 
                            type: "sourceless combat minordetail", 
                            show: true,
                            forceMini: true,
                            sfx: false
                        })
                    },
                exec: (actor, i) => {
                    if(actor.slug == user.slug) return
                    env.GENERIC_ACTIONS.singleTarget({
                        action, 
                        user, 
                        target: actor,
                        hitSfx: {
                            name: 'dull',
                            rate: 1
                        },
                        hitExec: ({target})=>{
                            addStatus({target, origin: user, status: "destabilized", length: 2})
                            addStatus({target, origin: user, status: "fear", length: 2})
                        }                
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
    
    special_rule: {
        slug: "special_rule",
        name: "Continuous Adjustment",
        type: 'special',
        anim: "",
        usage: {
            act: "%USER SHIFTS THE BALANCE"
        },
        details: { 
            flavor: "'utilize status control to empower and repair team';'afflict opponents with critical vulnerability'",
            conditional: "<em>SELF::'</em>[STATUS::windup]'\n<em>ALLIES::</em>'[STAT::amtBP] [STATUS::repairs] [STATUS::empowered]'\n<em>FOES::</em>'[STAT::amt] [STATUS::vulnerable] [STATUS::critical_flaw]'",
        },
        stats: {
            accuracy: 1,
            crit: 0,
            amt: 1,
            amtBP: 1,
            status: {
                windup: {
                    name: 'windup',
                    length: 1
                },
                repairs: {
                    name: 'repairs',
                    length: 1
                },
                empowered: {
                    name: 'empowered',
                    length: 1
                },
                vulnerable : {
                    name: 'vulnerable',
                    length: 2
                },
                critical_flaw: {
                    name: 'critical_flaw',
                    length: 1
                },
            },
        },
        exec: function(user, target, beingUsedAsync) {
            let action = this
            let allyTeam = user.team.name
            let enemyTeam = user.enemyTeam.name
            if(user.sprite) user.sprite.classList.add("basic-attack") 

            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                extraDelay: 200,
                endCallback: () => {
                    if(user.sprite) user.sprite.classList.remove("basic-attack")
                    readoutAdd({
                        message: `${user.name} stays wound up!`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: true,
                        forceMini: true,
                        sfx: false
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
                exec: (actor, i) => {
                    if(actor.slug == user.slug) return;

                    switch(actor.team.name) {
                        case allyTeam:
                            env.GENERIC_ACTIONS.singleTarget({
                                beneficial: true,
                                type: 'barrier',
                                action, 
                                user, 
                                target: actor,
                                canCrit: false,
                                hitSfx: {
                                    name: 'mend',
                                    rate: 2
                                },
                                hitStatus: {
                                    name: 'repairs',
                                    length: 1
                                },
                            })
                        break

                        case enemyTeam:
                            env.GENERIC_ACTIONS.singleTarget({
                                action: this, 
                                user, 
                                target: actor,
                                hitSfx: {
                                    name: 'talkcroak',
                                    rate: 2
                                },
                                canCrit: false,
                                hitExec: (target) => {
                                    addStatus({origin: user, target: actor, status: "vulnerable", length: 2}); 
                                    addStatus({origin: user, target: actor, status: "critical_flaw", length: 1}); 
                                }
                            })                            
                        break
                    }
                }
            })
        }
    },

    special_chant_mega: {
        slug: "special_chant_mega",
        name: "New Process",
        type: 'special+summon',
        anim: "spinny",
        usage: {
            act: "%USER DRAWS IN RESOURCES"
        },
        details: {
            flavor: "'remove resources from foes to create new daemon processes'",
            onHit: `'[STAT::amt]'`,
            onCrit:`'[STATUS::weakened]'`,
            conditional: `<em>SUMMON::</em>'+1 hallucination (max:4)'`
        },
        stats: {
            accuracy: .8,
            crit: 0.3,
            amt: 1,
            status: {
                weakened: {
                    name: 'weakened',
                    length: 1
                },
            },
        },
        noRepeat: true,
        exec: function(user, target, beingUsedAsync) {
            let action = this

            user.sprite.classList.add('spinny')
            setTimeout(function(){user.sprite.classList.remove('spinny')}, 1200);

            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action: action, 
                        user, 
                        target: actor,
                        hitSfx: { name: 'talksignal' },
                        critSfx: { name: 'fear', rate: 0.75 },
                        critStatus: {
                            name: 'weakened',
                            length: 1
                        },
                        critExec: ({target}) => {
                            user.lastSide = !user.lastSide
                            env.hallucinator = target.slug
                            if(user.team.members.filter(m=>m.slug.includes('critta_spawner_bee')).length < 4) {
                                midCombatActorAdd(env.rpg.enemyTeam, 'critta_spawner_bee', user.lastSide ? "left" : "right")
                            }
                        }
                    })
                    
                    //make sure everyone is ethereal, despawn any early deaths
                    for (const teammate of user.team.members) {
                        if(teammate == user) continue;
                        if(!hasStatus(teammate, "ethereal") && teammate.state == "dead") { midCombatActorRemove(teammate) }
                        else if(!hasStatus(teammate, "ethereal")) addStatus({target: teammate, status: "ethereal", length: 1, noReact: true}) 
                    }
                }, 
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },

    husk_attack_rot: {
        slug: "husk_attack_rot",
        name: "Psychosis",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER STINGS %TARGET",
            crit: "%TARGET BLEEDS A STRANGE COLOR",
            hit: "%TARGET FEELS STRANGE",
            miss: "%TARGET EVADES"
        },
        details: {
            flavor: "'inject memory with destructive thoughts';'eat away at foes from inside'",
            onHit: `'[STAT::amt] [STATUS::rot]'`,
            onCrit:`'additional [STATUS::rot]';'[STATUS::fear] to all foes'`,
        },
        stats: {
            accuracy: .8,
            crit: 0.1,
            amt: 1,
            status: {
                fear: {
                    name: 'fear',
                    length: 2
                },
                    rot: {
                    name: 'rot',
                    length: 1
                },
            },
        },
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,

                hitSfx: {
                    name: 'stab',
                    rate: 1.5
                }, 
                critSfx: {
                    name: 'stab',
                    rate: 0.75
                },
                critStatus: {
                    name: 'rot',
                    length: 1
                },
                hitStatus: {
                    name: 'rot',
                    length: 1
                },

                critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                    team: user.enemyTeam,
                    exec: (actor, i)=>{
                        addStatus({target: actor, origin: user, status: "fear", origin: user, length: 2}); 
                        play('fear', 0.75);
                    }
                })
            })
        }
    },

    special_sillyspawn: {
        slug: "special_sillyspawn",
        name: "Entertainment",
        type: 'special+summon',
        anim: "",

        details: {
            flavor: "'fetch actors from elsewhere to fight';'strength affected by tension'",
            conditional: `<em>SUMMON::</em>'+1 random foe (max:6), +1 if user HP <50% max'`
        },

        noRepeat: true,
        tensionWeights: [
            /* 0 */
            [["pawn", 1], ["knight", 0.25], ["bishop", 0.25]],

            /* 1 */ 
            [["pawn", 0.5], ["knight", 0.5], ["bishop", 0.5], ["queen", 0.2]],

            /* 2 */ 
            [["pawn", 0.25], ["knight", 2], ["bishop", 1], ["rook", 0.25], ["queen", 0.2]],

            /* 3 */ 
            [["pawn", 0.1], ["knight", 1], ["bishop", 0.75], ["rook", 0.5], ["queen", 0.25], ["king", 0.25]],

            /* this version doesn't go any higher */
        ],
        exec: function(user, target, beingUsedAsync) {
            if(user.team.members.length >= 7) return false;
            play('dull', 0.8, 1)

            let effectiveTension = Math.clamp(env.crittaMap.tension, 0, 3)
            let falseCrittaSpawn = env.crittaMap.getModQty("global_anti")
            actionMessage(user, "%USER CALLS ACTORS TO THE STAGE", target, 'none', 2000)

            let spawnRate = 1
            if(user.hp < user.maxhp) spawnRate = 2

            let spawns = []
            for(let i = 0; i < spawnRate; i++) {
                let group = env.COMBAT_GROUPS[weightRand(CrittaMap.TENSIONWEIGHT[effectiveTension])]
                let rank = weightRand(this.tensionWeights[effectiveTension])
                let antiCritta = falseCrittaSpawn ? env.MODIFIERS.global_anti.adjustSpawn(rank) : rank
                let spawn = group[antiCritta]

                switch(typeof spawn) {
                    case "object": // (array)
                        spawns = spawns.concat(spawn || antiCritta)
                    break

                    default: spawns.push(spawn || antiCritta)
                }
            }

            for (const enemySlug of spawns) midCombatActorAdd(env.rpg.enemyTeam, enemySlug, 'right')

            //make sure everyone is ethereal, despawn any early deaths
            for (const teammate of user.team.members) {
                if(teammate == user) continue;
                if(!hasStatus(teammate, "ethereal") && teammate.state == "dead") { midCombatActorRemove(teammate) }
                else if(!hasStatus(teammate, "ethereal")) addStatus({target: teammate, status: "ethereal", length: 1, noReact: true}) 
            }

            if(!beingUsedAsync) setTimeout(()=>advanceTurn(user), 1000)
        },
        disableIf: (actor) => {return actor.team.members.length >= 7}
    },
    
    special_sillybuff: {
        slug: "special_sillybuff",
        name: "Entertainment",
        type: 'special',
        desc: "'destabilize allies';'attain direct control and focus attack'",
        help: "ALLIES::+1T:DESTABILIZED, +1T:FOCUSED",
        anim: "basic-attack",

        details: {
            flavor: `'destabilize allies';'attain direct control and focus attack'`,
            onUse: `'[STATUS::destabilized] [STATUS::focused] to all allies'`,
        },

        stats: {
            autohit: true,
            status: {
                destabilized: {name: "destabilized", length: 1},
                focused: {name: "focused", length: 1},
            }
        },

        usage: {
            act: "%USER RAISES THE STAKES"
        },

        exec: function(user, target, beingUsedAsync) {
            play('dull', 0.75, 1);
            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i) => {
                    addStatus({target: actor, origin: user, status: "destabilized", length: 1, noReact: true}); 
                    addStatus({target: actor, origin: user, status: "focused", length: 1, noReact: true}); 
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        },
        disableIf: (actor) => {return actor.team.members.length < 7}
    },

    //much like the "sillyspawn" move, but can go higher and is immediately more powerful
    special_wallspawn: {
        slug: "special_wallspawn",
        name: "Antithesis",
        type: 'special+summon',
        anim: "",

        details: {
            flavor: "'fetch actors from elsewhere to fight';'strength affected by tension'",
            conditional: `<em>SUMMON::</em>'+2 random foes (max:6)'`
        },

        noRepeat: true,
        tensionWeights: [
            /* 0 - reasonably able to focus on wall */
            [["pawn", 1], ["knight", 0.25], ["bishop", 0.25]],

            /* 1 - even split between low rank foes */ 
            [["pawn", 0.5], ["knight", 0.5], ["bishop", 0.5],],

            /* 2 - pawns become rare breaths of air, advanced foes favored, rare higher rank  */ 
            [["pawn", 0.25], ["knight", 2], ["bishop", 1], ["rook", 0.25]],

            /* 3 - advanced foes start becoming more common, high threats can appear  */ 
            [["pawn", 0.1], ["knight", 1], ["bishop", 0.75], ["rook", 0.5], ["queen", 0.25], ["king", 0.25]],

            /* 4 - larger threats become most common, lower ranks fade  */ 
            [["knight", 0.5], ["bishop", 1], ["rook", 2], ["queen", 0.5], ["king", 0.5]],

            /* 5 - huge threats. holy shit. help */ 
            [["bishop", 0.5], ["rook", 3], ["queen", 1], ["king", 1]],
        ],
        exec: function(user, target, beingUsedAsync) {
            if(user.team.members.length >= 7) return false;
            play('dull', 0.8, 1)

            let effectiveTension = env.crittaMap.tension
            let falseCrittaSpawn = env.crittaMap.getModQty("global_anti")
            if(hasStatus(user, "fear")) {
                effectiveTension = Math.clamp(env.crittaMap.tension - 2, 0, 5)
                actionMessage(user, "%USER WEAKLY CALLS FOR HELP", target, 'none', 2000);
                falseCrittaSpawn = false
            } else {
                actionMessage(user, "%USER CALLS ACTORS TO THE STAGE", target, 'none', 2000);
            }

            let spawns = []
            for(let i = 0; i < 2; i++) {
                let group = env.COMBAT_GROUPS[weightRand(CrittaMap.TENSIONWEIGHT[effectiveTension])]
                let rank = weightRand(this.tensionWeights[effectiveTension])
                let antiCritta = falseCrittaSpawn ? env.MODIFIERS.global_anti.adjustSpawn(rank) : rank
                let spawn = group[antiCritta]

                switch(typeof spawn) {
                    case "object": // (array)
                        spawns = spawns.concat(spawn || antiCritta)
                    break

                    default: spawns.push(spawn || antiCritta)
                }
            }

            for (const enemySlug of spawns) midCombatActorAdd(env.rpg.enemyTeam, enemySlug, 'right')

            //make sure everyone is ethereal, despawn any early deaths
            for (const teammate of user.team.members) {
                if(teammate == user) continue;
                if(!hasStatus(teammate, "ethereal") && teammate.state == "dead") { midCombatActorRemove(teammate) }
                else if(!hasStatus(teammate, "ethereal")) addStatus({target: teammate, status: "ethereal", length: 1, noReact: true}) 
            }

            if(!beingUsedAsync) setTimeout(()=>advanceTurn(user), 1000)
        },
        disableIf: (actor) => {return actor.team.members.length >= 7}
    },

    /* boat sequence */
    special_wallspawn_boat: { 
        slug: "special_wallspawn_boat",
        name: "Antithesis",
        type: 'special+summon',
        anim: "",

        details: {
            flavor: "'call daemons to assist'",
            conditional: `<em>SUMMON::</em>'+2 daemons (max:6)'`
        },
        
        possibleSpawns: ["critta_pawn_boat", "critta_knight_boat"],
        noRepeat: true,
        exec: function(user, target, beingUsedAsync) {
            if(!env.pauseWallSpawn) {
                play('dull', 0.8, 1)

                midCombatActorAdd(env.rpg.enemyTeam, this.possibleSpawns.sample(), "right")

                //make sure everyone is ethereal, despawn any early deaths
                for (const teammate of user.team.members) {
                    if(teammate == user) continue;
                    if(!hasStatus(teammate, "ethereal") && teammate.state == "dead") { midCombatActorRemove(teammate) }
                    else if(!hasStatus(teammate, "ethereal")) addStatus({target: teammate, status: "ethereal", length: 1, noReact: true}) 
                }

                if(!beingUsedAsync) setTimeout(()=>advanceTurn(user), 1000)
            } else {
                advanceTurn(user)
            }
        },
        disableIf: (actor) => {return actor.team.members.length >= 7}
    },
    
    boat_clw_windup: {
        slug: "boat_clw_windup",
        name: "Dive",
        type: 'autohit',
        desc: "'prepare to go for the wheel'",
        anim: "",
        help: "+WINDUP",
        usage: {
            act: "%USER CLAWS AT THE CONTROLS!!"
        },
        exec: function(user, target) {
            play('talklaugh', 0.5);
            if(!env.rpg.hasCommentedOnWheelThingy) {
                setTimeout(()=>rpgDialogue(env.rpg.allyTeam.members[1], "DONT LET THAT FC*K GET THE WHEEL", true, 5000), 2000)
                setTimeout(()=>rpgDialogue(env.rpg.allyTeam.members[2], "interloper! USE PISTOL!", true, 5000), 4000)
                
                env.rpg.hasCommentedOnWheelThingy = true
            }
            addStatus({target: user, status: "windup", length: 1})
            
            return 'nothing';
        }
    },

    special_boat_clw_grab: {
        slug: "special_boat_clw_grab",
        name: "Grab Wheel",
        type: 'special',
        desc: "'direct vessel in random direction'",
        help: "VESSEL::RANDOM MOVEMENT",
        anim: "basic-attack",
        autohit: true,
        exec: function(user, target, beingUsedAsync) {
            removeStatus(user, "windup")
            let cantSteer = env.rpg.getAttribute("stopsteer")
            let direction = ["left", "right"].filter(d => d != cantSteer)
            if(env.boatEscape.boatAir == 0) direction.push("floor")
            direction = direction.sample()

            switch(direction) {
                case "left":
                case "right":
                    env.rpg.setAttribute("stopsteer", "right")
                    actionMessage(user, `%USER GRABS THE WHEEL AND STEERS ${direction.toUpperCase()}`, target);
                    env.boatEscape.steer(direction)
                break

                case "floor":
                    actionMessage(user, `%USER FORCES THE BOAT FORWARDS`, target);
                    env.boatEscape.advance()                    
            }

            setTimeout(()=>advanceTurn(), env.ADVANCE_RATE * 0.5)
        },
    },

    special_boat_waveattack: {
        slug: "special_boat_waveattack",
        name: "Grab Wheel",
        type: 'special',
        desc: "'direct vessel in random direction'",
        help: "VESSEL::RANDOM MOVEMENT",
        anim: "basic-attack",
        autohit: true,
        exec: function(user, target, beingUsedAsync) {
            let existing = env.boatEscape.querySelectorAll(`boat-obstacle[type="W"]:not(.attacking)`)
            env.boatEscape.insertAdjacentHTML("beforeend", `<boat-obstacle type="🌊" distance="5" col="${rand(0, 3)}"></boat-obstacle>`)

            if(existing.length) {
                existing.forEach(el=>el.classList.add('attacking'))
                actionMessage(user, `%USER CREATES TURBULENCE!!`, target);
                env.boatEscape.checkContact()

            } else {
                actionMessage(user, `%USER REWRITES THE OCEAN...`, target);
                for (let i = 1; i < 7; i++) {
                    env.boatEscape.insertAdjacentHTML("beforeend", `<boat-obstacle type="W" distance="${i}" col="${env.boatEscape.boatCol}"></boat-obstacle>`)                    
                }

            }

            setTimeout(()=>advanceTurn(), env.ADVANCE_RATE * 0.5)
        },
    },

    /* E3A2 items */
    special_malware_drill: {
        slug: "special_malware_drill",
        name: "CMD::DRILL",
        itemAction: true,
        type: 'special',
        anim: "cloak-barrier",
        animDuration: 4000,
        autohit: true,

        details: {
            flavor: "'alters framing structure'",
            onUse: "'[STATUS::malware_drill] to all actors'",
        },

        stats: {
            status: {
                malware_drill: {name: "malware_drill", length: 1}
            }
        },

        usage: {
            act: "THE THOUGHTSPACE FEELS FLIMSY"
        },
        exec: function(user, target, beingUsedAsync) {
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action, 
                        user, 
                        target: actor,
                        hitSfx: {
                            name: 'talkgal',
                            rate: 0.4
                        },
                        genExec: ({target}) => {
                            addStatus({target, status: "malware_drill", length: 1});
                        }
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },

    special_malware_rot: {
        slug: "special_malware_rot",
        name: "CMD::ROT",
        type: 'special',
        itemAction: true,
        anim: "cloak-barrier",
        animDuration: 4000,
        autohit: true,

        details: {
            flavor: "'alters framing structure'",
            onUse: "'[STATUS::malware_rot] to all actors'",
        },

        stats: {
            status: {
                malware_rot: {name: "malware_rot", length: 1}
            }
        },

        usage: {
            act: "THE THOUGHTSPACE WRITHES"
        },
        exec: function(user, target, beingUsedAsync) {
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action, 
                        user, 
                        target: actor,
                        hitSfx: {
                            name: 'talkgal',
                            rate: 0.4
                        },
                        genExec: ({target}) => {
                            addStatus({target, status: "malware_rot", length: 1});
                        }
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
    
    special_malware_rewrite: {
        slug: "special_malware_rewrite",
        name: "CMD::REWRITE",
        type: 'special',
        itemAction: true,
        desc: "'invert negative statuses of allies';'invert positive statuses of foes'",
        help: "ALL::CONDITIONAL STATUS INVERSION",
        anim: "cloak-barrier",
        animDuration: 4000,
        autohit: true,

        details: {
            flavor: "'alters framing structure'",
            onUse: "'invert all beneficial statuses of foes';'invert all negative statuses of allies'",
        },

        stats: {
            status: {
                rotting: {name: "rotting", length: 1}
            }
        },
        
        usage: {
            act: "THE THOUGHTSPACE SEEMS BRIGHTER"
        },
        exec: function(user, target, beingUsedAsync) {
            play("talkfairy", 1.5)
            let action = this
            
            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action, 
                        user, 
                        target: actor,
                        hitSfx: {
                            name: 'talkfairy',
                            rate: 0.75
                        },
                        genExec: ({target}) => {
                            if(user.team.name == actor.team.name) invertStatuses(target, (statusObj)=>!statusObj.beneficial)
                            else invertStatuses(target, (statusObj)=>statusObj.beneficial)
                        }
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },

    special_malware_empower: {
        slug: "special_malware_empower",
        name: "CMD::EMPOWER",
        type: 'special',
        itemAction: true,
        desc: "'imbue allies with empowering thoughts'",
        help: "ALLIES::+3T:EMPOWERED +1T:FOCUSED +1T:EVASION",
        anim: "cloak-barrier",
        animDuration: 4000,
        autohit: true,

        details: {
            flavor: "'alters framing structure'",
            onUse: "'[STATUS::empowered] [STATUS::focused] [STATUS::evasion] to all allies'",
        },

        stats: {
            status: {
                empowered: {name: "empowered", length: 1},
                focused: {name: "focused", length: 1},
                evasion: {name: "evasion", length: 1}
            }
        },
        
        usage: {
            act: "THE THOUGHTSPACE COWERS BEFORE YOU"
        },
        beneficial: true,
        exec: function(user, target, beingUsedAsync) {
            let action = this

            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        beneficial: true,
                        action, 
                        user, 
                        target: actor,
                        hitSfx: {
                            name: 'mend',
                            rate: 1.5
                        },
                        genExec: ({target}) => {
                            addStatus({target, status: "empowered", length: 3})
                            addStatus({target, status: "focused", length: 1, noReact: true})
                            addStatus({target, status: "evasion", length: 1, noReact: true})
                        }
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },

    /* intrusive */
    intrusive_smash: {
        slug: "intrusive_smash",
        name: "Unnatural Strike",
        type: 'target',
        anim: "basic-attack",
        help: "100% -4HP, 40% X2 +1T:STUN +2T:OPEN WOUND +3T:VULNERABLE +CRITICAL FLAW",
        usage: {
            act: "%USER CHARGES %TARGET",
            crit: "%TARGET IS LEFT REELING",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },

        details: {
            flavor: `'focused, deadly attack upon one target';'immense physical trauma'"`, 
            onHit: `'[STAT::amt] [STATUS::stun] [STATUS::open_wound] [STATUS::vulnerable] [STATUS::critical_flaw]'`,
        },
        
        stats: {
            accuracy: 1,
            crit: 0.4, 
            amt: 4,
            status: { 
                stun: {
                    name: 'stun',
                    length: 1
                },
                open_wound: {
                    name: 'open_wound',
                    length: 2
                },
                vulnerable: {
                    name: 'vulnerable',
                    length: 3
                },
                critical_flaw: {
                    name: 'critical_flaw',
                    length: 1
                },

            }
        },
        
        exec: function(user, target) {
            removeStatus(user, "windup")
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'hit',
                    rate: 0.8
                },
                critExec: ({target})=> {
                    addStatus({target, origin: user, status: "stun", length: 1})
                    addStatus({target, origin: user, status: "open_wound", length: 2, noReact: true})
                    addStatus({target, origin: user, status: "vulnerable", length: 3, noReact: true})
                    addStatus({target, origin: user, status: "critical_flaw", length: 1, noReact: true})
                }
            })
        }
    },
    
    special_intrusive: {
        slug: "special_intrusive",
        name: "Intrude",
        type: 'special+nomimic',
        anim: "",
        autohit: true,
        details: {
            flavor: "'â«§âª¶ã¥¥ã³'",
            onUse: `'SSP IN  THE WHEE L LL LL'`,
        },
        usage: {
            act: "A GRIM GAMBLE IS MADE"
        },
        noRepeat: true,
        possibleSpawns: ["intrusive_blocker", "intrusive_archival", "intrusive_bishopfreak", "intrusive_statusoid" ],
        possiblePassives: ["light_veilkdrop", "light_humorist", "eyes_dancer", "bone_adaptive", "claws_chitin", "light_glee", "eyes_hypercritical", "malware_drill", "malware_rot", "weak_point"],
        exec: function(user, target, beingUsedAsync) {
            if(!user.chancePanel) throw 'ok intrusive spawned wrong';
            if(user.hp <= user.maxhp * 0.33) addStatus({target: user, origin: user, status: "fear", origin: user, length: 2}); 
            let action = this

            user.chancePanel.classList.add("active")
            user.chancePanel.classList.remove("hidden")
            user.chancePanel.spin(true)
            play("talkfairy", 0.5)
            let result

            setTimeout(()=>{
                result = user.chancePanel.stopAndResult()
                playCombatCrit()
            }, 2000)

            setTimeout(()=>{
                switch(result) {
                    case 1: // life up - gives 10HP and 5 turns of regen to everyone
                        user.chancePanel.result.innerHTML = "LUCKY! CHA CHA"
                        env.GENERIC_ACTIONS.teamWave({
                            arbitraryActorList: env.rpg.turnOrder,
                            exec: (actor, i) => {
                                env.GENERIC_ACTIONS.singleTarget({
                                    beneficial: true,
                                    autohit: true,
                                    action,
                                    amt: -10,
                                    canCrit: false,
                                    user, 
                                    target: actor,
                                    hitSfx: {
                                        name: 'talklaugh',
                                        rate: 0.5
                                    },
                                    hitStatus: {
                                        name: 'regen',
                                        length: 5
                                    },
                                })
                            },
                            advanceAfterExec: true, beingUsedAsync, user,
                        })
                    break

                    case 2: // main up - everyone gets focus
                        user.chancePanel.result.innerHTML = "LUCKY! CHA CHA"
                        env.GENERIC_ACTIONS.teamWave({
                            arbitraryActorList: env.rpg.turnOrder,
                            exec: (actor, i) => {
                                env.GENERIC_ACTIONS.singleTarget({
                                    beneficial: true,
                                    autohit: true,
                                    action,
                                    amt: 0,
                                    canCrit: false,
                                    user, 
                                    target: actor,
                                    hitSfx: {
                                        name: 'talklaugh',
                                        rate: 0.5
                                    },
                                    hitStatus: {
                                        name: 'focused',
                                        length: 2
                                    },
                                    genExec: ({target}) => {
                                        if(target.team.name == "ally") addStatus({target, status: "empowered", length: 1, noReact: true})
                                    }
                                })
                            },
                            advanceAfterExec: true, beingUsedAsync, user,
                        })
                    break

                    case 3: // spawns enemies
                    case 5: // unlucky
                        user.chancePanel.result.innerHTML = "BAD TIM!::E NO,W!"
                        play('dull', 0.8, 1)
                             
                        if(user.team.members.length < 6) {
                            if(user.lastSide) {
                                midCombatActorAdd(env.rpg.enemyTeam, this.possibleSpawns.sample(), 'left')
                                user.lastSide = 0
                            } else {
                                midCombatActorAdd(env.rpg.enemyTeam, this.possibleSpawns.sample(), 'right')
                                user.lastSide = 1
                            }
                        } else {
                            useAction(user, env.ACTIONS.special_mass_destabilize, user, {triggerActionUseEvent: false, beingUsedAsync: true})
                        }
            
                        //make sure everyone is ethereal, despawn any early deaths
                        for (const teammate of user.team.members) {
                            if(teammate == user) continue;
                            if(!hasStatus(teammate, "ethereal") && teammate.state == "dead") { midCombatActorRemove(teammate) }
                            else if(!hasStatus(teammate, "ethereal")) addStatus({target: teammate, status: "ethereal", length: 1, noReact: true}) 
                        }
            
                        setTimeout(()=>advanceTurn(user), 1000)
                    break

                    case 4: // bombs - spawns a bastard bomb
                        user.chancePanel.result.innerHTML = "BOOM :=)"
                        play('dull', 0.8, 1)

                        if(user.team.members.length < 6) {
                            midCombatActorAdd(env.rpg.enemyTeam, "intrusive_bomblet", 'right')
                        } else {
                            useAction(user, env.ACTIONS.special_mass_destabilize, user, {triggerActionUseEvent: false, beingUsedAsync: true})
                        }
                        
                        for (const teammate of user.team.members) {
                            if(teammate == user) continue;
                            if(!hasStatus(teammate, "ethereal") && teammate.state == "dead") { midCombatActorRemove(teammate) }
                            else if(!hasStatus(teammate, "ethereal")) addStatus({target: teammate, status: "ethereal", length: 1, noReact: true}) 
                        }
            
                        setTimeout(()=>advanceTurn(user), 1000)
                    break

                    case 6: // change - gives everyone a special passive that's overridden by each change roll
                        user.chancePanel.result.innerHTML = "THINK AGAIN"
                        env.GENERIC_ACTIONS.teamWave({
                            arbitraryActorList: env.rpg.turnOrder,
                            exec: (actor, i) => {
                                env.GENERIC_ACTIONS.singleTarget({
                                    beneficial: true,
                                    autohit: true,
                                    action,
                                    amt: 0,
                                    canCrit: false,
                                    user, 
                                    target: actor,
                                    hitSfx: {
                                        name: 'talkfairy',
                                        rate: 0.5
                                    },
                                    genExec: ({target}) => {
                                        let currentStatuses = target.statusEffects.map(status => status.slug)
                                        let possiblePassives = this.possiblePassives.filter(statusName => !currentStatuses.includes(statusName))

                                        console.log("in with", target, possiblePassives)

                                        //special ones can happen on certain creatures
                                        if(
                                            !target.slug.includes("intrusive") ||
                                            target.slug == "intrusive_bishopfreak"
                                        ) possiblePassives.push("visionary")

                                        if(
                                            !target.slug.includes("intrusive") ||
                                            target.slug == "intrusive_bishopfreak" ||
                                            target.slug == "intrusive_statusoid"
                                        ) possiblePassives.push("active_support")

                                        if(
                                            !target.slug.includes("intrusive") ||
                                            target.slug == "intrusive_bishopfreak" ||
                                            target.slug == "intrusive_statusoid"
                                        ) possiblePassives.push("impatient")
                                        
                                        // remove passive beforehand if one exists
                                        if(target.intrusivePassive) { removeStatus(target, target.intrusivePassive, {forceRemoveStatus: true}) }
                                        target.intrusivePassive = possiblePassives.sample()
                                        addStatus({target, status: target.intrusivePassive, length: 1, noReact: true})                                        
                                    }
                                })
                            },
                            advanceAfterExec: true, beingUsedAsync, user,
                        })
                    break
                }
            }, 3000)

            setTimeout(()=>user.chancePanel.classList.remove("active"), 6000)
        }
    },
    
    special_intrusive_ally: {
        slug: "special_intrusive_ally",
        name: "Gamble",
        type: 'special',
        anim: "",
        autohit: true,
        usage: {
            act: "A GRIM GAMBLE IS MADE"
        },
        details: {
            flavor: "'â«§âª¶ã¥¥ã³'",
            onUse: `'SSP IN  THE WHEE L LL LL'`,
        },
        noRepeat: true,
        possiblePassives: ["light_veilkdrop", "light_humorist", "eyes_dancer", "bone_adaptive", "claws_chitin", "light_glee", "eyes_hypercritical", "malware_drill", "malware_rot", "weak_point"],
        exec: function(user, target, beingUsedAsync) {
            if(!user.chancePanel) throw 'ok intrusive spawned wrong';
            let action = this

            user.box.classList.add("disable")
            user.chancePanel.classList.add("active")
            user.chancePanel.classList.remove("hidden")
            user.chancePanel.spin(true)

            play("talkfairy", 0.5)
            let result

            setTimeout(()=>{
                result = user.chancePanel.stopAndResult()
                user.box.classList.remove("disable")
                playCombatCrit()
            }, 1000)

            setTimeout(()=>{
                switch(result) {
                    case 1: // life up - gives 5HP and 5 turns of regen to allies
                        user.chancePanel.result.innerHTML = "LUCKY! CHA CHA"
                        env.GENERIC_ACTIONS.teamWave({
                            team: user.team,
                            exec: (actor, i) => {
                                env.GENERIC_ACTIONS.singleTarget({
                                    beneficial: true,
                                    autohit: true,
                                    action,
                                    amt: -5,
                                    canCrit: false,
                                    user, 
                                    target: actor,
                                    hitSfx: {
                                        name: 'talklaugh',
                                        rate: 0.5
                                    },
                                    hitStatus: {
                                        name: 'regen',
                                        length: 5
                                    },
                                })
                            },
                            advanceAfterExec: true, beingUsedAsync
                        })
                    break

                    case 2: // main up - allies get focus and empowered
                        user.chancePanel.result.innerHTML = "LUCKY! CHA CHA"
                        env.GENERIC_ACTIONS.teamWave({
                            team: user.team,
                            exec: (actor, i) => {
                                env.GENERIC_ACTIONS.singleTarget({
                                    beneficial: true,
                                    autohit: true,
                                    action,
                                    amt: 0,
                                    canCrit: false,
                                    user, 
                                    target: actor,
                                    hitSfx: {
                                        name: 'talklaugh',
                                        rate: 0.5
                                    },
                                    hitStatus: {
                                        name: 'focused',
                                        length: 2
                                    },
                                    genExec: ({target}) => {
                                        addStatus({target, status: "empowered", length: 1, noReact: true})
                                    }
                                })
                            },
                            advanceAfterExec: true, beingUsedAsync
                        })
                    break

                    case 3: // unlucky
                    case 5: // gives enemies focus and empowered
                        user.chancePanel.result.innerHTML = "BAD TIM!::E NO,W!"

                        env.GENERIC_ACTIONS.teamWave({
                            team: user.enemyTeam,
                            exec: (actor, i) => {
                                env.GENERIC_ACTIONS.singleTarget({
                                    beneficial: true,
                                    autohit: true,
                                    action,
                                    amt: 0,
                                    canCrit: false,
                                    user, 
                                    target: actor,
                                    hitSfx: {
                                        name: 'talklaugh',
                                        rate: 0.5
                                    },
                                    hitStatus: {
                                        name: 'focused',
                                        length: 2
                                    },
                                    genExec: ({target}) => {
                                        addStatus({target, status: "empowered", length: 1, noReact: true})
                                    }
                                })
                            },
                            advanceAfterExec: true, beingUsedAsync
                        })
                    break

                    case 4: // bombs - spawns a bastard bomb
                        user.chancePanel.result.innerHTML = "BOOM :=)"
                        play('dull', 0.8, 1)

                        if(user.team.members.length < 6) {
                            let bomb = midCombatActorAdd(env.rpg.enemyTeam, "intrusive_bomblet", 'right')
                            if(bomb){
                                addStatus({target: bomb, status: "weak_point", length: 1})
                                addStatus({target: bomb, status: "ethereal", length: 1})
                                delete bomb.statusImmunities
                            }
                        } else {
                            useAction(user, env.ACTIONS.special_mass_destabilize, user, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "intrusivefish"})
                        }
                    break

                    case 6: // change - gives everyone a special passive that's overridden by each change roll
                        user.chancePanel.result.innerHTML = "THINK AGAIN"
                        env.GENERIC_ACTIONS.teamWave({
                            arbitraryActorList: env.rpg.turnOrder,
                            exec: (actor, i) => {
                                env.GENERIC_ACTIONS.singleTarget({
                                    beneficial: true,
                                    autohit: true,
                                    action,
                                    amt: 0,
                                    canCrit: false,
                                    user, 
                                    target: actor,
                                    hitSfx: {
                                        name: 'talkfairy',
                                        rate: 0.5
                                    },
                                    genExec: ({target}) => {
                                        let currentStatuses = target.statusEffects.map(status => status.slug)
                                        let possiblePassives = this.possiblePassives.filter(statusName => !currentStatuses.includes(statusName))

                                        console.log("in with", target, possiblePassives)

                                        //special ones can happen on certain creatures
                                        if(
                                            !target.slug.includes("intrusive") ||
                                            target.slug == "intrusive_bishopfreak"
                                        ) possiblePassives.push("visionary")

                                        if(
                                            !target.slug.includes("intrusive") ||
                                            target.slug == "intrusive_bishopfreak" ||
                                            target.slug == "intrusive_statusoid"
                                        ) possiblePassives.push("active_support")

                                        if(
                                            !target.slug.includes("intrusive") ||
                                            target.slug == "intrusive_bishopfreak" ||
                                            target.slug == "intrusive_statusoid"
                                        ) possiblePassives.push("impatient")
                                        
                                        // remove passive beforehand if one exists
                                        if(target.intrusivePassive) { removeStatus(target, target.intrusivePassive, {forceRemoveStatus: true}) }
                                        target.intrusivePassive = possiblePassives.sample()
                                        addStatus({target, status: target.intrusivePassive, length: 1, noReact: true})                                        
                                    }
                                })
                            },
                            advanceAfterExec: true, beingUsedAsync
                        })
                    break
                }
            }, 1500)

            setTimeout(()=>user.chancePanel.classList.remove("active"), 3500)
        }
    },

    detonate: {
        slug: "detonate",
        name: "Detonate",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER EXPLODES NEAR %TARGET",
            hit: "%TARGET IS DESTROYED",
        },
        details: {
            flavor: "'detonate to instantly destroy target'",
            onHit: `'[STAT::amt]';'DOWN SELF'`,
            conditional: `<em>ONCE PER COMBAT</em>`
        },
        stats: {
            amt: 100000000000000,
        },
        autohit: true,
        exec: function(user, target) {
            user.hp = 0
            user.detonated = true
            updateStats({actor: user})
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'dull',
                    rate: 0.5
                },
            })
        },
        disableIf: (actor)=>{ if(actor.detonated) return "ONCE PER COMBAT" },
    },

    incoherent_mimic: {
        slug: "incoherent_mimic",
        name: "Mimic",
        type: 'target+self+autohit',
        anim: "heal",
        usage: {
            act: "%USER MIMICS %TARGET",
            hit: "%TARGET IS FLATTERED",
        },
        details: {
            onUse: "'copy actions of target';'persists after combat';'some actions cannot be mimicked'",
        },
        stats: {
            amt: 0,
        },
        autohit: true,
        beneficial: true,
        noRepeat: true,
        exec: function(user, target) {
            addStatus({target: user, status: "incoherent", length: 1, noReact: true});
            let actions = [...new Set(target.actions)]
            let windupActions = [...new Set(target.windupActions)]

            removeStatus(user, "windup")

            actions = actions.filter(actionSlug=>{
                let action = env.ACTIONS[actionSlug]
                if(
                    action.type.includes("summon") ||
                    action.type.includes("nomimic") ||
                    action.slug.includes("incoherent")
                ) return false;
                
                return true
            })

            actions.push("incoherent_mimic")
            console.log(actions, actions.length, actions[0])

            if(actions.length == 1 && actions[0] == "incoherent_mimic") {
                play("talkfairy", 0.5)
                return sendFloater({
                    target: user,
                    type: "arbitrary",
                    arbitraryString: "MIMIC FAILED!",
                    size: 2,
                    beneficial: false
                })
            } else {
                sendFloater({
                    target: user,
                    type: "arbitrary",
                    arbitraryString: "MIMIC SUCCESS!",
                    size: 2,
                    beneficial: true
                })                
                play("talkchoir", 0.5)
            }

            user.actions = actions
            user.windupActions = windupActions

            if(user.member) {
                user.member.mimic = {
                    actions: user.actions,
                    windupActions: user.windupActions
                }
            }
        },

        avoidChaining: true
    },

    /*******************/
    /* EP4 special player actions */
    /*******************/
    bomb_plant: {
        slug: "bomb_plant",
        name: "Plant",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER ATTACHES SOMETHING TO %TARGET",
            crit: "%TARGET IS LEFT REELING",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },

        details: {
            flavor: "'utilize explosives at close range';'but safely'",
            onUse: `'[STATUS::bomb_planted] to target';'utilize TRIGGER to detonate and HIT actors within radius'`,
            onHit: `'[STAT::amt] [STATUS::stun] [STATUS::puncture] [STAT::kb] from explosive host'`,
            conditional: `<em>VS DESTRUCTIBLE</em>::'additional [STAT::megaHP]';'hits large targets multiple times'\n<em>VS PLANTED</em>::'increase radius'`
        },

        stats: {
            autohit: true,
            amt: 6,
            megaHP: 30,
            kb: 8,
            status: {
                puncture: {
                    name: 'puncture',
                    length: 2
                },
                
                stun: {
                    name: 'stun',
                    length: 1
                },
                
                bomb_planted: {
                    name: 'bomb_planted',
                    length: 1
                }
            }
        },

        ignoresLOS: true,
        ignoresBlocks: true,
        exec: function(user, target) {
            let existing = getStatus(target, "bomb_planted")
            if(hasStatus(target, "bomb_planted")) {
                existing.addStrength(1)
            } else {
                existing = addStatus({target, status: "bomb_planted", origin: user, forceAdd: true})
            }

            return "nothing"
        },
    },

    special_bomb_detonate: {
        slug: "special_bomb_detonate",
        name: "Trigger",
        type: 'special',
        anim: "basic-attack",
        usage: {
            act: "%USER DETONATES THE CHARGE!",
            crit: "%TARGET IS LEFT REELING",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },

        details: {
            flavor: "'utilize explosives at close range';'but safely'",
            onUse: `'[STATUS::bomb_planted] to target';'utilize TRIGGER to detonate and HIT actors within radius'`,
            onHit: `'[STAT::amt] [STATUS::stun] [STATUS::puncture] [STAT::kb] from explosive host'`,
            conditional: `<em>VS DESTRUCTIBLE</em>::'additional [STAT::megaHP]';'hits large targets multiple times'\n<em>VS PLANTED</em>::'increase radius'`
        },

        stats: {
            autohit: true,
            amt: 6,
            megaHP: 30,
            kb: 8,
            status: {
                puncture: {
                    name: 'puncture',
                    length: 2
                },
                
                stun: {
                    name: 'stun',
                    length: 1
                },
                
                bomb_planted: {
                    name: 'bomb_planted',
                    length: 1
                }
            }
        },

        exec: function(user, target, beingUsedAsync) {
            env.rpg.grid.classList.add("zoomout")

            user.trackedBombs.forEach((bomb, i) => {
                bomb.infinite = false
                bomb.length = 0
                if(bomb.anchorActor.state != "dead") removeStatus(bomb.anchorActor, "bomb_planted")
                env.rpg.grid.advanceTileEffect(bomb)
            })
            
            setTimeout(() => {
                env.rpg.grid.classList.remove("zoomout")
                delete user.trackedBombs
            }, 1200 * (env.rpg.grid.runTelegraphsInQueue({forActor: user})))
        },

        disableIf: (actor)=>{ if(!actor?.trackedBombs?.size) return "NO ACTIVE CHARGES" },
    },

    special_bomb_detonate_victim: {
        slug: "special_bomb_detonate_victim",
        name: "Exploding",
        type: 'self',
        anim: "",

        usage: {
            act: "%USER EXPLODES",
            crit: "%TARGET EXPLODES",
            hit: "%TARGET IS CAUGHT IN THE EXPLOSION",
            miss: "%TARGET DODGES"
        },

        details: { //this doesn't need any strings cause you don't see it directly
            onUse: `'explode'`,
        },

        autohit: true,
        stats: {
            crit: 1,
            amt: 3,
            status: {
                puncture: {
                    name: 'puncture',
                    length: 2
                },
                
                stun: {
                    name: 'stun',
                    length: 1
                }
            },
        },

        exec: function(user, target, beingUsedAsync, {actionMessageIndex, tileEffect} = {}) {
            let specialAmt = this.stats.amt
            if(target.originalSlug.startsWith("destructible")) {
                specialAmt = 30
            }

            let twisted = getStatus(target, "unnatural_carapace")
            if(twisted) {
                twisted.duration = twisted.duration - 1
                updateStats(target)

                env.rpg.effectMessage.action({
                    user: target,
                    target: target,
                    hit: "crit",
                    action: `%TARGET seems weaker...`
                })
            }

            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                specialAmt,
                ignoreMods: true,
                hitSfx: {
                    name: 'shot3',
                    rate: 1.75
                },
                critSfx: {
                    name: 'shot2',
                    rate: 1.25
                },
                hitStatus: this.stats.status.puncture,
                critStatus: this.stats.status.stun,
                hitExec: ({target})=>{
                    if(target.piece) target.piece.knockback({ 
                        direction: target?.piece?.tile.getRelativeDirection(tileEffect.originTile, true), 
                        strength: 8
                    })
                }
            })
        } 
    },

    /***********************************/
    /* EP4 scene-specific ally actions */
    /***********************************/
    
    /* general zone */
    scene_evade: {
        slug: "scene_evade",
        name: "Dash",
        type: 'movement+ground+self',
        subject: "where",
        anim: "",
        beneficial: true,

        usage: {
            act: "%USER LOOKS FOR AN OPENING"
        },

        details: {
            onUse: () => `'[STATUS::focused] [STATUS::evasion]';'move to target location';'select current tile to avoid movement'`,
            flavor: "'move quickly';'deliberate on the moment and its opportunities'"
        },

        stats: {
            range: 2,
            status: {
                evasion: {
                    name: 'evasion',
                    length: 1
                },
                focused: {
                    name: 'focused',
                    length: 1
                },                
            }
        },
        
        targeting: "square",
        includesOrigin: true,
        requiresPath: true,
        ignoresActors: false,
        aoe: { 
            size: 0, 
            shape: "square",
            effect: ({user, tiles, selectedTile}) => {
                if(selectedTile.piece) { 
                    return //targeted own tile
                } else {
                    user.piece.teleportToTile(selectedTile, {follow: true})
                }
            }
        },
        
        exec: function(user, target) {
            play('mend', 0.5);
            addStatus({target: user, status: this.stats.status.evasion.name, length: this.stats.status.evasion.length, noReact: true}); 
            addStatus({target: user, status: this.stats.status.focused.name, length: this.stats.status.focused.length, noReact: true}); 
            return 'nothing';
        },

        disableIf: (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" },
        avoidChaining: true
    },

    /* akizet zone (akizone) (akizetone) (acetone) */
    scene_akizet_attack: {
        slug: "scene_akizet_attack",
        name: "Overwhelm",
        type: 'target+movement+ground',
        anim: "basic-attack",

        usage: {
            act: "%USER CHARGES",
            crit: "%TARGET IS LEFT REELING",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },

        details: {
            flavor: `'a bold assault';'chance for immense physical trauma'`,
            onUse: `'move to location';'assault targets ahead'`,
            onHit: `'[STAT::rangeHP] [STAT::kb]';'increased by 1 per tile traversed'`,
            onCrit: `'[STATUS::stun]'`,
            conditional: `<em>NOTICE::</em>'hits allies';'exercise caution'`,
        },

        stats: {
            range: 2,
            accuracy: 0.9,
            crit: 0.2,
            amt: 2,
            kb: 1,
            rangeHP: 1,
            status: {
                stun: {
                    name: 'stun',
                    length: 1
                }
            },

            extraAOE: {
                trueRange: {
                    origin: "self",
                    size: 3,
                    shape: 'squareRing',
                    includesOrigin: false,
                    addClass: "truerange" // added to tiles when displaying range
                }
            }
        },
        
        targeting: "square",
        requiresPath: true,
        ignoresActors: false,
        aoe: { 
            size: 1, 
            shape: "cone",
            distant: true,
            effect: ({user, tiles, selectedTile}) => {
                if(selectedTile.piece) { // for enemies who target via tile
                    user.piece.teleportToTile(selectedTile.getClosestOpenTile(), {follow: true})
                } else {
                    user.piece.teleportToTile(selectedTile, {follow: true})
                }
            }
        },
        
        exec: function(user, target) {
            let specialAmt = this.stats.amt
            let distance 

            if(env?.rpg?.is2D) {
                console.log('data', env.rpg, env.rpg.targetingFor)
                specialAmt = this.stats.rangeHP
                distance = user?.piece?.tile.distFrom(env.rpg.targetingFor.selectedTile) * this.stats.rangeHP
                specialAmt += distance
            }

            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                specialAmt,
                critStatus: this.stats.status.stun,
                hitExec: ({target})=>{ // has a knockback in combat-scene
                    if(env?.rpg?.is2D) {
                        if(target.piece && user.piece) target.piece.knockback({
                            direction: user?.piece?.tile.getRelativeDirection(target?.piece?.tile), 
                            strength: distance
                        })
                    }
                }
            })
        },
    },
    
    scene_frenzy: {
        slug: "scene_frenzy",
        name: "Frenzy",
        type: 'target',
        anim: "basic-attack",

        usage: {
            act: "%USER STABS %TARGET",
            crit: "%USER JUST KEEPS GOING",
            hit: "%TARGET BLEEDS SLUDGY CORRU",
            miss: "%TARGET EVADES"
        },

        details: {
            flavor: "'puncture vital cystic component';'may inspire additional stabbing'",
            onHit: `'[STAT::amt] [STATUS::puncture]';'100% base crit on first hit'`,
            onCrit: `'use this action again on random foe in range'`,
        },

        stats: {
            range: 2,
            accuracy: 1,
            crit: 0.125,
            amt: 1,
            status: {
                puncture: {
                    name: 'puncture',
                    length: 2
                }
            },

            extraAOE: {
                followUpRadius: {
                    origin: "self", 
                    size: 2,
                    shape: 'square'
                }
            }
        },
        
        exec: function(user, target, beingUsedAsync, {actionMessageIndex} = {}) {
            //if(!env.rpg.turnData[`${user.slug}-frenzy`]) env.rpg.turnData[`${user.slug}-frenzy`] = 0

            if(!beingUsedAsync) {
                specialCrit = 1    
            } else specialCrit = this.stats.crit

            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                specialCrit,
                hitSfx: {
                    name: 'stab',
                    rate: 1
                },
                hitStatus: {
                    name: this.stats.status.puncture.name,
                    length: this.stats.status.puncture.length
                }, 
                critExec: ({target})=>{ //on crit, use again and knock any enemies nearby back
                    if(env?.rpg?.is2D) {
                        let frenzyTargets = env.rpg.grid.getAoETargets({
                            tile: user?.piece?.tile, 
                            actor: user,
                            actingOn: "foes",
                            aoeData: {
                                includesOrigin: false,
                                size: this.stats.extraAOE.followUpRadius.size,
                                shape: this.stats.extraAOE.followUpRadius.shape
                            },
                        }).filter(t => t.hp > 0 && t.state != "lastStand");

                        let target = frenzyTargets.sample()
                        if(target && target?.piece) {
                            env.setTimeout(()=>{
                                useAction(user, this, target, {beingUsedAsync: true, reason: "frenzy", actionMessageIndex})
                            }, 500)
                        }
                    }
                }
            })
        },
    },

    /* gakzone */
    scene_gakvu_attack: {
        //creates an area that executes async useAction scramble with gakvu considered the origin
        slug: "scene_gakvu_attack",
        name: "Scramble",
        type: 'target+ground',
        anim: "basic-attack",
        
        usage: {
            act: "%USER TWISTS THE OVERLAP",
        },

        details: {
            flavor: `'disrupt multiple targets with enhanced groundsmindry';'more illegal than before'`,
            onUse: `'create persistent area effect';'HIT foes who end turn within';'HIT foes who are knocked within'`,
            onHit: `'[STAT::amt]'`,
            onCrit: `'[STATUS::vulnerable]'`,
        },

        stats: {
            accuracy: 0.9, 
            crit: 0.2,
            amt: 2,
            status: {
                vulnerable: {
                    name: 'vulnerable',
                    length: 2
                }
            }
        },
        
        exec: function(user, target) {
            return "nothing"
        },

        //EP4 stats
        range: 3,
        ignoresBlocks: true,
        ignoresLOS: true,
        aoe: { 
            size: 1, 
            shape: "circle",
            effect: ({user, tiles, selectedTile}) => {
                if(user.scramblerEffect) {
                    env.rpg.grid.deleteTileEffect(user.scramblerEffect);
                }

                user.scramblerEffect = env.rpg.grid.createTileEffect({
                    tiles, 
                    effect: "scrambler", 
                    length: 3, 
                    origin: user,
                    originTile: selectedTile
                })
            },
            canHighlight: (user, target) => { return target.team.name != user.team.name},
        },
    },

    /* tozik zone */
    scene_parasite: {
        slug: "scene_parasite",
        name: "Parasite",
        verb: "parasitize",
        type: 'target+opponent',
        anim: "basic-attack",
    
        usage: {
            act: "%USER GRASPS AT %TARGET",
            crit: "%TARGET IS INFESTED",
            hit: "%TARGET IS INFESTED",
            miss: "%TARGET DODGES"
        },

        details: {
            flavor: "'utilize modified repair tool';'tap vital corru of foes to sustain allies'",
            onHit: () => "'[STAT::amt] [STATUS::siphon]'",
            onCrit: () => "'infest nearby foes with [STATUS::siphon]'",
        },
    
        stats: {
            accuracy: 1,
            crit: 0.4,
            amt: 2,
            status: {
                siphon: {
                    name: 'siphon',
                    length: 3,
                }
            },

            extraAOE: {
                infest: {
                    origin: "target",
                    includesOrigin: false,
                    size: 1,
                    shape: 'square',
                    addClass: "beneficial" // added to tiles when displaying range
                }
            }
        },
    
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'stab',
                    rate: 0.75
                },
    
                hitExec: ({target}) => {
                    addStatus({
                        target, 
                        origin: user, 
                        status: this.stats.status.siphon.name, 
                        length: this.stats.status.siphon.length
                    }); 
                },
    
                critExec: () => {
                    env.rpg.grid.getAoETargets({
                        tile: target?.piece?.tile || user?.piece?.tile, 
                        actor: user,
                        actingOn: "foes",
                        aoeData: this.stats.extraAOE.infest,
                        onEachValidTileActor: ({tile, actor}) => {
                            addStatus({target: actor, origin: user, status: "siphon", length: this.stats.status.siphon.length});
                            play('mend')
                        }
                    })
                }
            });
        }
    },

    scene_mend: {
        slug: "scene_mend",
        name: "Urgent Mend",
        type: 'support+target+ground+movement+self',
        anim: "heal",
        beneficial: true,

        usage: {
            act: "%USER RUSHES TO HELP",
            crit: "%TARGET FEELS WAY BETTER",
            hit: "%TARGET FEELS BETTER"
        },

        details: {
            flavor: `'mend allies through use of enhanced tools';'often inspiring'`,
            onUse: `'move to location';'HIT allies around target tile'`,
            onHit: `'[STAT::amt] [STATUS::regen]'`,
            onCrit: `'[STATUS::focused]'`
        },

        stats: {
            range: 2,
            crit: 0.1,
            autohit: true,
            amt: -2,
            status: {
                regen: {
                    name: 'regen',
                    length: 2
                },
                focused: {
                    name: 'focused',
                    length: 1
                }
            }
        },
        
        range: 3,
        requiresPath: true,
        ignoresActors: false,
        includesOrigin: true,
        aoe: { 
            effectBeforeExec: true,
            size: 1, 
            shape: "circle",
            distant: true,
            includesOrigin: true,
            canHit: (user, target) => { return target.team.name == user.team.name} ,
            effect: ({user, tiles, selectedTile}) => user.piece.moveToTile(selectedTile, {follow: true})
        },
        
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                beneficial: true,
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'mend',
                    rate: 1
                },
                hitStatus: this.stats.status.regen,
                critStatus: this.stats.status.focused,
            })
        },

        // enemy zone
        avoidChaining: true,
        enemyUsageIf: (actor) => { // only use if someone alive on team has taken damage
            return actor.team.members.some(member => member.state != "dead" && (member.hp < member.maxhp))
        },

        disableIf: (actor) => {
            return (
                actor.team.name == "enemy" &&
                !actor.team.members.some(member => ((member != actor) && (member.state != "dead") ))
            )
        },
    },
    
    /* miltza zone */
    scene_spy: {
        slug: "scene_spy",
        name: "Observe",
        type: 'target+ground',
        noRepeat: true,
        
        usage: {
            act: "%USER PROVIDES OPPORTUNITY",
        },

        details: {
            flavor: `'utilize enhanced spatial awareness';'rapidly analyze local opportunities'`,
            onUse: `'create persisting area of observation';'inflict statuses on creation and turn end'`,
            conditional: `<em>VS FOE::</em>'inflict [STATUS::vulnerable]'\n<em>VS ALLY::</em>'inflict [STATUS::focused]'`
        },

        stats: {
            range: 4,
            autohit: true,
            status: {
                vulnerable: {
                    name: 'vulnerable',
                    length: 1
                },
                focused: {
                    name: 'focused',
                    length: 1
                }
            }
        },

        exec: function(user, target) {
            return "nothing"
        },
        
        targeting: "circle",
        includesOrigin: true,
        aoe: { 
            shape: "circle",
            size: 2,
            effect: ({user, tiles, selectedTile}) => { 
                if(user.observeEffect) {
                    env.rpg.grid.deleteTileEffect(user.observeEffect);
                }

                user.observeEffect = env.rpg.grid.createTileEffect({
                    tiles, 
                    effect: "spying", 
                    length: 3, 
                    origin: user,
                    originTile: selectedTile
                })
            }
        },
    },

    /* bozko zone */
    scene_bozko_attack: {
        slug: "scene_bozko_attack",
        name: "Throw Punch",
        verb: "jab at",
        type: 'target+movement+ground',
        anim: "basic-attack",

        usage: {
            act: "%USER SWINGS",
            crit: "%TARGET IS LEFT REELING",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },

        details: {
            flavor: `'strike with full momentum';'shatter offensive appendages'`,
            onUse: `'move to location';'HIT up to 2 foes ahead'`,
            onHit: `'[STAT::amt] [STATUS::weakened] [STAT::kb]'`,
            onCrit: `'[STATUS::stun]'`,
        },

        stats: {
            range: 2,
            accuracy: 0.75,
            crit: 0.5,
            amt: 3,
            kb: 3,
            status: {
                stun: {
                    name: 'stun',
                    length: 1
                },
                weakened: {
                    name: 'weakened',
                    length: 2
                }
            },

            extraAOE: {
                trueRange: {
                    origin: "self",
                    size: 3,
                    shape: 'squareRing',
                    includesOrigin: false,
                    addClass: "truerange" // added to tiles when displaying range
                }
            }
        },
        
        targeting: "angular",
        requiresPath: true,
        ignoresActors: false,
        aoe: { 
            size: 2, 
            shape: "line-from",
            distant: true,
            effect: ({user, tiles, selectedTile}) => {
                if(selectedTile.piece) { // for enemies who target via tile
                    user.piece.teleportToTile(selectedTile.getClosestOpenTile(), {follow: true})
                } else {
                    user.piece.teleportToTile(selectedTile, {follow: true})
                }
            },
            canHit: (user, target) => user.team.name != target.team.name //bozko is very careful
        },
        
        exec: function(user, target) {
            let distance = user?.piece?.tile.distFrom(env.rpg.targetingFor.selectedTile)

            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitStatus: this.stats.status.weakened,
                critStatus: this.stats.status.stun,
                hitExec: ({target})=>{ // has a knockback in combat-scene
                    if(env?.rpg?.is2D) {
                        if(target.piece && user.piece) target.piece.knockback({
                            direction: user?.piece?.tile.getRelativeDirection(target?.piece?.tile), 
                            strength: distance
                        })
                    }
                }
            })
        },
    },
    
    scene_guard: {
        slug: "scene_guard",
        name: "Protect",
        type: 'support+target+ground',
        anim: "heal",
        beneficial: true,
        
        usage: {
            act: "%USER STANDS GUARD",
        },

        details: {
            onUse: `'gain [STATUS::carapace] [STATUS::spikes]';'create area of safety'`,
            onHit: `'grant allies within effect [STATUS::redirection]';'remove [STATUS::vulnerable]'`,
        },

        stats: {
            autohit: true,
            status: {
                redirection: {
                    name: 'redirection',
                    length: 1
                },
                
                carapace: {
                    name: 'carapace',
                    length: 3
                },

                spikes: {
                    name: 'spikes',
                    length: 3
                },

                vulnerable: {
                    name: 'vulnerable'
                }
            },
        },

        exec: function(user, target) {
            return "nothing"
        },

        range: 1,
        targeting: "plus",
        aoe: { 
            shape: "custom",
            customShape: `
                .xxx.
                .xxx.
                .xox.
            `,
            effect: ({user, tiles}) => {
                let status = addStatus({target: user, status: "redirector", length: 1, noReact: true, forceAdd: true})
                
                addStatus({target: user, status: "carapace", length: 3, noReact: true}); 
                addStatus({target: user, status: "spikes", length: 3}); 
                removeStatus(user, "vulnerable") 

                status.tileEffect = env.rpg.grid.createTileEffect({
                    tiles, 
                    effect: "guarding", 
                    length: 1, 
                    anchorType: "origin",
                    origin: user
                })
            },
            canHighlight: (user, target) => { return target.team.name == user.team.name},
        },
    },

    scene_pull: {
        slug: "scene_pull",
        name: "Pull",
        type: 'target',
        anim: "basic-attack",

        usage: {
            act: "%USER GRABS AT %TARGET",
            hit: "%TARGET IS PULLED",
            miss: "%TARGET EVADES"
        },

        details: {
            onHit: ()=> `'[STAT::kb] towards current location';'increased by 1 per tile distance'`,
            conditional: () => "<em>VS ALLY</em>::'guaranteed hit'</em>\n<em>NOTICE</em>::'align in cardinal direction with target for accurate result'",
        },

        stats: {
            range: 4,
            accuracy: 1,
            kb: 1,
        },

        targeting: "square",        
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'miss',
                    rate: 0.5
                },
                specialAutohit: target.team.name == user.team.name,
                hitExec: ({target}) => {
                    if(env?.rpg?.is2D && target.piece && user.piece) {
                        let distance = user?.piece?.tile.distFrom(target?.piece?.tile)

                        target.piece.knockback({
                            direction: target?.piece?.tile.getRelativeDirection(user?.piece?.tile), 
                            strength: distance + 1
                        })
                    }
                },
            })
        },
    },

    /* cavik zone */
    scene_cavik_attack: {
        slug: "scene_cavik_attack",
        name: "IED",
        verb: "throw at",
        type: 'target+ground',
        anim: "basic-attack",
        sceneAnim: "bombtoss",

        usage: {
            act: "%USER THROWS A WEIRD CYST AT %TARGET",
            crit: "%TARGET EXPLODES",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET DODGES"
        },

        details: {
            flavor: "'utilize micro-explosive rapidly formed from scavenged dull organs'",
            onHit: `'[STAT::amt] [STAT::kb] from selected tile'`,
            onCrit: `'[STATUS::puncture]'`,
            conditional: `<em>NOTICE::</em>'hits allies';'exercise caution'\n<em>SPECIAL</em>::'if no targets in range, remains on ground';'detonates before next turn'`,
        },

        stats: {
            accuracy: 0.9,
            crit: 0.5,
            amt: 1,
            range: 4,
            kb: 2,
            status: {
                puncture: {
                    name: 'puncture',
                    length: 1
                }
            }
        },

        aoe: { 
            size: 2, 
            shape: "circle",
            effect: ({user, tiles, selectedTile}) => {
                //if the range was empty, leave a bomb
                let actorTiles = tiles.filter(tile=>tile?.piece?.actor)
                if(!actorTiles.length) {
                    let effect = env.rpg.grid.createTileEffect({
                        tiles, 
                        effect: "telegraph", 
                        length: 1,
                        origin: user,
                        telegraphAnim: "telegraph",
                        telegraphFor: "scene_cavik_attack",
                        specialClass: "iedtime",
                        specialName: "Patient Bomb",
                        specialHelp: "Detonates for -1HP & KB::2 on next origin turn",
                        originTile: selectedTile
                    })
                } else {
                    actorTiles.forEach(tile=>{
                        if(tile.piece) tile.piece.knockback({
                            direction: selectedTile.getRelativeDirection(tile), 
                            strength: 2
                        })
                    })
                }
            }
        },

        exec: function(user, target, beingUsedAsync, {actionMessageIndex, tileEffect} = {}) {
            if(user?.team?.name == "enemy" && target?.team?.name == "enemy") return false;

            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'shot3',
                    rate: 1.75
                },
                critSfx: {
                    name: 'shot2',
                    rate: 1.25
                },
                critStatus: this.stats.status.puncture,
                hitExec: ({target})=>{
                    if(target.piece && tileEffect) target.piece.knockback({ 
                        direction: target?.piece?.tile.getRelativeDirection(tileEffect.originTile, true), 
                        strength: 2
                    })
                }
            })
        } 
    },
    
    /* mitlzer */
    scene_miltza_attack: {
        slug: "scene_miltza_attack",
        name: "Guide Drone",
        verb: "strike",
        type: 'target',
        anim: "heal",

        usage: {
            act: "%USER guides a small drone to %TARGET!",
        },

        details: {
            flavor: `'utilize short range drone to support or suppress target'`,
            onUse: `'[STATUS::drone_haunt] to target ally or foe'`,
            conditional: `<em>VS FOE</em>::'[STAT::amt] to host and nearby [STATUS::vulnerable] foes'\n<em>VS ALLY</em>::'50% chance for [STATUS::evasion] to host and nearby allies'`
        },

        stats: {
            autohit: true,
            range: 4,
            amt: 2,

            status: {
                drone_haunt: {
                    name: 'drone_haunt',
                    length: 1
                },
                evasion: {
                    name: 'evasion',
                    length: 1
                },
                vulnerable: {
                    name: 'vulnerable'
                },
            },

            extraAOE: {
                evasionAura: {
                    origin: "target",
                    includesOrigin: false,
                    size: 1,
                    shape: 'square',
                    addClass: "beneficial" // added to tiles when displaying range
                }
            }
        },
        
        exec: function(user, target) {
            let effect = env.rpg.grid.tileEffects.find(e=>e.slug == "drone_haunt_target")
            if(effect) env.rpg.grid.deleteTileEffect(effect)

            if(user.channelTarget) {
                removeStatus(user.channelTarget, "drone_haunt", {noUpdate: true, noFloater: true})
            } 
            
            user.channelTarget = target
            addStatus({target, status: "drone_haunt", noUpdate: true, origin: user})
            
            return 'hit'
        }
    },

    scene_dullflare: {
        slug: "scene_dullflare",
        name: "Dull Flare",
        verb: "blast",
        type: 'target',
        anim: "basic-attack",

        usage: {
            act: "%USER TEARS OPEN THE DULL",
            crit: "%TARGET IS ANNIHILATED",
            hit: "%TARGET IS SEARED",
            miss: "%TARGET EVADES"
        },

        details: {
            flavor: "'wide directional release of rapidly decaying dull light';'deconstructs foes'",
            onHit: `'[STAT::amt] KB::2'`
        },

        stats: { 
            autohit: true, 
            crit: 0.1,
            amt: 3
        },

        range: 4,
        targeting: "plus",
        aoe: { 
            shape: "custom",
            customShape: `
                xxxxx
                xxxxx
                .xxx.
                ..x..
                ..o..
            `,
        },
        
        exec: function(user, target, beingUsedAsync) {
            removeStatus(user, "windup")
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'dull',
                    rate: 1.5
                },
                critSfx: {
                    name: 'shot6',
                    rate: 0.75
                },
                genExec: ({target}) => {
                    if(env?.rpg?.is2D) {
                        if(target.piece && user.piece) target.piece.knockback({
                            direction: user?.piece?.tile.getRelativeDirection(target?.piece?.tile), 
                            strength: 2,
                        })
                    }
                },
                advanceAfterExec: true, beingUsedAsync, 
            })
        }
    },
    
    scene_kavruka: {
        slug: "scene_kavruka",
        name: "Explosive",
        verb: "throw at",
        type: 'target',
        anim: "basic-attack",
        sceneAnim: "bombtoss",

        usage: {
            act: "%USER THROWS A WEIRD CYST AT %TARGET",
            crit: "%TARGET EXPLODES",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET DODGES"
        },

        details: {
            flavor: "'utilize deconstruction tool offensively';'may disorient those nearby'",
            onHit: `'[STAT::amt] [STAT::kb] from selected tile'`,
            onCrit: `'[STATUS::stun]'`,
        },

        stats: {
            accuracy: 0.9,
            crit: 0.5,
            amt: 1,
            range: 4,
            kb: 2,
            status: {
                stun: {
                    name: 'stun',
                    length: 1
                }
            }
        },

        beneficial: true,
        itemAction: true,
        aoe: { 
            size: 2, 
            shape: "circle",
            effect: ({user, tiles, selectedTile}) => {
                let actorTiles = tiles.filter(tile=>tile?.piece?.actor)
                if(actorTiles.length) {
                    actorTiles.forEach(tile=>{
                        if(tile.piece) tile.piece.knockback({
                            direction: selectedTile.getRelativeDirection(tile), 
                            strength: 2
                        })
                    })
                }
            }
        },

        exec: function(user, target, beingUsedAsync, {actionMessageIndex, tileEffect}) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'shot3',
                    rate: 1.75
                },
                critSfx: {
                    name: 'shot2',
                    rate: 1.25
                },
                critStatus: this.stats.status.stun,
                hitExec: ({target})=>{
                    if(target.piece && tileEffect) target.piece.knockback({ 
                        direction: target?.piece?.tile.getRelativeDirection(tileEffect.originTile, true), 
                        strength: 2
                    })
                }
            })
        } 
    },
    
    scene_satik: {
        slug: "scene_satik",
        name: "Emergency Break",
        verb: "throw at",
        type: 'target',
        anim: "basic-attack",
        sceneAnim: "bombtoss",

        usage: {
            act: "%USER THROWS A WEIRD CYST AT %TARGET",
            crit: "%TARGET EXPLODES",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET DODGES"
        },

        details: {
            flavor: "'break satik shell due to emergency';'release many small ablative barrier applicators'",
            onHit: `'[STAT::amtBP] to allies'`,
        },

        stats: {
            autohit: true,
            amt: 5,
            amtBP: 5
        },

        beneficial: true,
        itemAction: true,
        aoe: { 
            size: 2, 
            shape: "circle",
            canHit: (user, target) => { return target.team.name == user.team.name}
        },

        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                beneficial: true,
                autohit: true,
                type: 'barrier',
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'mend',
                    rate: 2
                },
            })
        } 
    },

    scene_arm_rifle: {
        slug: "scene_arm_rifle",
        name: "LOCK N LOAD",
        type: 'autohit',
        anim: "heal",
        usage: {
            act: "%USER wields the symbiotic rifle!",
        },

        details: {
            flavor: `'prepare to use symbiotic rifle'`,
            onUse: `'[STATUS::rifle_bearer]'`,
            conditional: `<em>SLUDGE VOLLEY</em>::\n<em>USE</em>::'[STAT::selfHP] to self';'prepare wide projectile attack in specified direction';'fires on start of next turn'\n<em>HIT</em>::'[STAT::amt] [STAT::kb] [STATUS::vulnerable] [STATUS::puncture]'`,
        },

        stats: {
            selfHP: 3,
            amt: 2,
            kb: 1,
            status: {
                rifle_bearer: { name: "rifle_bearer", length: 1 },
                vulnerable: { name: "vulnerable", length: 1 },
                puncture: { name: "puncture", length: 1 }
            }
        },

        autohit: true,        
        exec: function(user, target) {
            play('click2')
            addStatus({target: user, status: "rifle_bearer"})
            return "nothing"
        },
    },

    scene_rifle: {
        slug: "scene_rifle",
        name: "Sludge Volley",
        type: 'target+ground',
        anim: "",
        usage: {
            act: "%USER prepares to fire...",
        },

        details: {
            flavor: `'utilize symbiotic rifle';'draw from self for munitions'`,
            onUse: `'[STAT::selfHP] to self';'prepare wide projectile attack in specified direction';'fires on start of next turn'`,
            onHit: `'[STAT::amt] [STAT::kb] [STATUS::vulnerable] [STATUS::puncture]'`,
        },

        stats: {
            selfHP: 3,
            amt: 2,
            kb: 1,
            status: {
                vulnerable: { name: "vulnerable", length: 1 },
                puncture: { name: "puncture", length: 1 }
            }
        }, 

        autohit: true,
        targeting: "plus",
        range: 1,
        aoe: { 
            shape: "custom",
            customShape: `
                xxxxx
                xxxxx
                ..o..
            `,
            effect: ({user, tiles, selectedTile}) => {
                let direction = user?.piece?.tile.getRelativeDirection(selectedTile)
                play("megastatus")
                combatHit(user, {amt: 3, origin: user, autohit: true, ignoreMods: true, noKill: true})

                env.rpg.grid.createTileEffect({
                    tiles: tiles, 
                    effect: "telegraph",
                    telegraphExec: (telEffect) => {  
                        play("shot6", 0.75)
                        env.rpg.grid.createTileEffect({
                            tiles: telEffect.tiles, 
                            effect: "projectile_generic",
                            specialName: "Sludge Volley",
                            specialClass: "projectile bstrdbullet",
                            specialHelp: "-2HP KB::1 +1T:VULNERABLE +1T:puncture",
                            anchorType: "tile",
                            length: 1,
                            origin: user,
                            data: {
                                direction,
                                turnTickType: "any",
                                consumeOnHit: true,
                                kb: 1,
                                affectsTeam: "not-ally",
                                blockedByLOS: true,
                                actorAffect: ({tile, actor, reason, effect}) => {
                                    combatHit(actor, {amt: 2, autohit: true, runEvents: false});
                                    addStatus({target: actor, origin: user, status: "vulnerable"})
                                    addStatus({target: actor, origin: user, status: "puncture"})

                                    play("shot", 1, 0.3)
                                }
                            }
                        })
                    },
                    telegraphAnim: "telegraph",
                    anchorType: "origin",
                    length: 1,
                    origin: user
                })
            }
        },
        
        exec: function(user, target) {
            return "nothing"
        },

        disableIf: (actor)=>{ if(actor.hp < 3 && actor.bp < 2) return "HP TOO LOW" },
    },
    
    /* EP4 general enemy attacks */
    arch_whelm: { //basic attack
        slug: "arch_whelm",
        name: "Formless Swipe",
        type: 'target',
        anim: "basic-attack",
        usage: {
            act: "%USER CHARGES AT %TARGET",
            crit: "%TARGET IS KNOCKED BACK",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },

        stats: {
            range: 1,
            accuracy: 0.7,
            crit: 0.3,
            amt: 1
        },

        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitExec: ({target})=>{ // has a knockback in combat-scene
                    if(env?.rpg?.is2D) {
                        if(target.piece && user.piece) target.piece.knockback({
                            direction: user?.piece?.tile.getRelativeDirection(target?.piece?.tile), 
                            strength: 2, 
                            onImpact: ()=> play("hit", 0.5)
                        })
                    }
                }
            })
        }
    },

    special_arch_support: { 
        slug: "special_arch_support",
        name: "Coil",
        type: 'special+autohit',
        anim: "heal",

        stats: {
            crit: 0.1,
            amt: -1
        },
        
        exec: function(user, target) {
            let realTarget
            if(!user.piece) return null;

            if(!user.supportTarget) {
                //only supports other archetypes
                realTarget = env.rpg.enemyTeam.members.filter(member => member.originalSlug != "arch_support" &&
                    (member.supportable || member.slug.startsWith("arch_")) &&
                    !hasStatus(member, "coiled") &&
                    member.state != "lastStand" 
                ).sample()

                if(realTarget && realTarget.piece) {
                    console.log("coil target is", realTarget, "because", 
                        realTarget.originalSlug != "arch_support",
                        realTarget.slug.startsWith("arch_"),
                        hasStatus(realTarget, "coiled"),
                        realTarget.state != "lastStand")
                    let coiled = addStatus({ target: realTarget, status: "coiled", origin: user })
                    let coiling = addStatus({ target: user, status: "coiling" })

                    coiling.tileEffect = env.rpg.grid.createTileEffect({
                        tiles: [user?.piece?.tile],
                        effect: "support_host",
                        length: 1,
                        origin: user,
                        anchorType: "origin"
                    })
                    
                    coiled.tileEffect = env.rpg.grid.createTileEffect({
                        tiles: [realTarget?.piece?.tile],
                        effect: "support_target",
                        length: 1,
                        origin: user,
                        anchorType: "actor",
                        anchorActor: realTarget
                    })

                    user.supportTarget = realTarget
                }
            } else if(user.supportTarget.state != "dead") realTarget = user.supportTarget

            if(realTarget && realTarget.state == "living" && realTarget.piece) {
                env.rpg.effectMessage.action({
                    user: user,
                    target: realTarget,
                    action: `%USER coils around %TARGET!`
                })

                user.piece.animateToTile(realTarget?.piece?.tile.getClosestOpenTile(), {animation: "lift", duration: 500, follow: true})
                
                env.GENERIC_ACTIONS.singleTarget({
                    beneficial: true,
                    type: 'barrier',
                    action: this,
                    specialAmt: 1, 
                    user, 
                    target: realTarget,
                    hitSfx: {
                        name: 'mend',
                        rate: 1
                    }
                })

                addStatus({target: realTarget, status: "focused", length: 1, noUpdate: true, noReact: true})
                addStatus({target: realTarget, status: "carapace", length: 1, noUpdate: true, noReact: true})

                env.GENERIC_ACTIONS.singleTarget({
                    beneficial: true,
                    action: this, 
                    user, 
                    target: realTarget,
                    hitSfx: {
                        name: 'mend',
                        rate: 1
                    },
                })
            }

            if(!realTarget || !realTarget.piece) {
                let fallbackTarget = env.rpg.allyTeam.members.find(m=>m.hp > 0)
                if(fallbackTarget) {
                    env.rpg.effectMessage.action({
                        user: user,
                        target: fallbackTarget,
                        action: `%USER lashes out at %TARGET!`
                    })

                    user.piece.animateToTile(fallbackTarget?.piece?.tile.getClosestOpenTile(), {animation: "lift", duration: 500, follow: true})
                    env.GENERIC_ACTIONS.singleTarget({
                        beneficial: false,
                        action: this,
                        specialAmt: 2,
                        specialHit: 0.7,
                        user, 
                        target: fallbackTarget,
                        hitStatus: {
                            name: "vulnerable",
                            length: 2
                        },
                        hitSfx: {
                            name: 'fear',
                            rate: 1.25
                        },
                    })
                }
            }

            setTimeout(() => {
               advanceTurn(user) 
            }, 2 * env.ADVANCE_RATE);

            return null
        },
    },
    
    //the opposite of the support
    //this fucker chooses an ally target and annoys them
    //they're extra accurate, but if they miss, they get stunned and lose their target
    special_arch_harasser_stab: { 
        slug: "special_arch_harasser_stab",
        name: "Flicker Stab",
        type: 'special+autohit',
        anim: "heal",
        
        exec: function(user, target, beingUsedAsync, {actionMessageIndex, tileEffect}) {
            let realTarget
            if(!user.piece) return null;

            if(!user.focusTarget || user?.focusTarget?.state == "dead") {
                realTarget = env.rpg.allyTeam.members.filter(member => member.hp).sample()
                user.focusTarget = realTarget
            } else realTarget = user.focusTarget

            if(realTarget) {
                if(user.piece) user.piece.teleportToTile(env.rpg.grid.tilesByType.basic.filter(tile=>!tile.piece && !tile.classList.contains("damagetile")).sample(), {follow: true})
                    
                env.rpg.effectMessage.action({
                    user: user,
                    target: realTarget,
                    action: "%USER flickers away!"
                })

                play("talkfairy", 0.75)
                
                if(!hasStatus(user, "stun")) {
                    setTimeout(()=>{
                        user.hauntedTileEffect = env.rpg.grid.createTileEffect({
                            tiles: [realTarget?.piece?.tile],
                            effect: "telegraph",
                            telegraphAnim: "harasserBlink",
                            telegraphFor: "arch_harasser_stab",
                            specialClass: "haunted",
                            specialHelp: "subject to attack on next origin turn",
                            length: 1,
                            origin: user,
                            anchorType: "actor",
                            anchorActor: realTarget,
                        })

                        env.rpg.effectMessage.action({
                            user: user,
                            target: realTarget,
                            action: `%USER prepares to strike %TARGET`,
                            reason: "INTERRUPTIBLE",
                            isMinor: true
                        })

                        let status = addStatus({target: user, status: "telegraph", length: 1, noReact: true}); 
                        if(status) status.addTelegraph(user.hauntedTileEffect)
                    }, env.ADVANCE_RATE)

                    setTimeout(() => {
                        realTarget.piece.focusOnTile()
                    }, env.ADVANCE_RATE * 2);
                }
            }

            setTimeout(() => {
               advanceTurn(user) 
            }, 3 * env.ADVANCE_RATE);

            return null
        },
    },

    arch_harasser_stab: {
        slug: "arch_harasser_stab",
        name: "stab",
        type: 'target', 
        anim: "basic-attack",
        usage: {
            act: "%USER flickers towards %TARGET",
            crit: "%TARGET IS EVISCERATED",
            hit: "%TARGET BLEEDS SLUDGY CORRU",
            miss: "%TARGET EVADES"
        },

        stats: {
            range: 1,
            accuracy: 2.75,
            crit: 0.2,
            amt: 1,
            status: {
                puncture: {
                    name: 'puncture',
                    length: 2
                },
                fear: {
                    name: 'fear',
                    length: 1
                }
            }
        },

        exec: function(user, target, beingUsedAsync, {actionMessageIndex, tileEffect}) {
            user.sprite.classList.add(this.anim)
            setTimeout(function(){
                user.sprite.classList.remove(this.anim)
            }, this.animDuration ? (this.animDuration + 100) : 600)

            let hit = env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target: target,
                hitSfx: {
                    name: 'stab',
                    rate: 1
                },
                critSfx: {
                    name: 'fear',
                    rate: 1
                },
                critStatus: this.stats.status.fear,
                hitStatus: this.stats.status.puncture
            })
            
            if(hit && user.piece) {        
                if(target.piece) target.piece.knockback({
                    direction: user?.piece?.tile.getRelativeDirection(target?.piece?.tile), 
                    strength: 2
                })

                if(target.hp == 0) {
                    user.focusTarget = false
                }
            } else {
                setTimeout(() => {
                    env.rpg.effectMessage.action({
                        user: user,
                        target: target,
                        action: `%USER flickers towards %TARGET`,
                        specialHitText: "%USER is thrown off balance by their miss!",
                        actionMessageIndex,
                    })                       
                }, env.ADVANCE_RATE * 0.75);

                addStatus({target: user, status: "stun", length: 1})
                user.focusTarget = false                     
            }

            return hit
        }
    },

    arch_punch: {
        slug: "arch_punch",
        name: "Big Punch",
        type: 'target',
        anim: "basic-attack",

        usage: {
            act: "%USER SWINGS AT %TARGET",
            crit: "%TARGET IS KNOCKED BACK",
            hit: "%TARGET STAGGERS BACK",
            miss: "%TARGET EVADES"
        },
        
        targeting: "square",
        aoe: { 
            size: 1, 
            shape: "cone",
            canHit: (user, target) => { return target.team.name != user.team.name}
        },

        stats: {
            accuracy: 0.8,
            crit: 0.2,
            amt: 2,
            status: {
                stun: 1
            }
        },
        
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitExec: ({target}) => {
                    if(env?.rpg?.is2D) {
                        if(target.piece && user.piece) target.piece.knockback({
                            direction: user?.piece?.tile.getRelativeDirection(target?.piece?.tile), 
                            strength: 3, 
                            /*
                            onImpact: ()=> {
                                if(env.rpg.turnData[`${target.slug}_archstun`]) return;
                                env.rpg.turnData[`${target.slug}_archstun`] = true
                                addStatus({target, status: "stun", length: this.stats.status.stun.length})
                                forcePlay("crit", 0.5)
                                env.setTimeout(()=> { env.rpg.effectMessage.action({
                                    user: user,
                                    target: target,
                                    action: `%TARGET is stunned by the impact!`
                                })})
                            }
                            */
                        })
                    }
                }
            })
        },

        /*
        enemyUsageIf: (actor) => { //formerly only usable if an enemy is already in range
            if(env.rpg.tagName != "COMBAT-SCENE" || !actor.piece) return false;
            if(actor.piece.tile.getNeighbors().find(tile=>tile.piece ? tile.piece.actor.team.name == "ally": false)) return true;
         },
        */
    },

    //a bomb like cavik's IEDs, but smaller and always delayed
    arch_bomb: {
        slug: "arch_bomb",
        name: "Dullbomb",
        verb: "throw at",
        type: 'target+ground',
        anim: "basic-attack",
        sceneAnim: "bombtoss",
        
        usage: {
            act: "%USER WARPS THE GROUND OMINOUSLY"
        },

        stats: {
            accuracy: 0.9,
            crit: 0.5,
            amt: 1,
            range: 6,
        },

        aoe: { 
            size: 1, 
            shape: "square",
            variance: 2, // this is saying "can pick from tiles within 2 square range of actual selection" if you want some innacuracy
            effect: ({user, tiles, selectedTile}) => {
                let effect = env.rpg.grid.createTileEffect({
                    tiles, 
                    effect: "telegraph", 
                    length: 1,
                    origin: user,
                    telegraphAnim: "telegraph",
                    telegraphFor: "arch_bomb_hit",
                    specialClass: "iedtime",
                    specialName: "Patient Bomb",
                    specialHelp: "Detonates for -1HP & KB::2 on next origin turn",
                    originTile: selectedTile
                })
            }
        },

        exec: function(user, target) {
            return null
        } 
    },

    arch_bomb_hit: {
        slug: "arch_bomb_hit",
        name: "IED",
        verb: "throw at",
        type: 'target+ground',
        anim: "basic-attack",
        sceneAnim: "bombtoss",

        usage: {
            act: "AN EXPLOSIVE DETONATES!",
            crit: "%TARGET EXPLODES",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET DODGES"
        },

        details: {
            onHit: `'[STAT::amt] [STAT::kb] from selected tile'`,
            onCrit: `'[STATUS::puncture]'`,
            conditional: `<em>NOTICE::</em>'hits allies';'exercise caution\n<em>SPECIAL</em>::'if no targets in range, remains on ground';'detonates before next turn'`,
        },

        stats: {
            accuracy: 0.9,
            crit: 0.5,
            amt: 1,
            range: 4,
            kb: 2,
            status: {
                puncture: {
                    name: 'puncture',
                    length: 1
                }
            }
        },

        exec: function(user, target, beingUsedAsync, {actionMessageIndex, tileEffect} = {}) {
            if(user?.team?.name == "enemy" && target?.team?.name == "enemy") return false;

            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'shot3',
                    rate: 1.75
                },
                critSfx: {
                    name: 'shot2',
                    rate: 1.25
                },
                critStatus: this.stats.status.puncture,
                hitExec: ({target})=>{
                    if(target.piece && tileEffect) target.piece.knockback({ 
                        direction: target?.piece?.tile.getRelativeDirection(tileEffect.originTile, true), 
                        strength: 2
                    })
                }
            })
        } 
    },

    //anchors an AOE fear aura to a target
    //repeat cast will pulse a telegraph around them
    special_arch_tele_channel: {
        slug: "special_arch_tele_channel",
        name: "Channel",
        type: 'special+autohit',
        anim: "heal",
        
        usage: {
            act: "%USER BENDS THE OVERLAP",
        },

        stats: {
            amt: 0,
        },

        exec: function(user) {
            let target
            if(!user.piece) return advanceTurn(user);

            if(!user.channelTarget) {
                target = env.rpg.allyTeam.members.filter(member => member.hp && !hasStatus(member, "channeledUpon")).sample()

                if(target) {
                    let channeling = addStatus({ target: user, status: "channeling", origin: user })
                    let channeledUpon = addStatus({ target, status: "channeledUpon", origin: user })

                    channeling.tileEffect = env.rpg.grid.createTileEffect({
                        tiles: [user?.piece?.tile],
                        effect: "channel_host",
                        length: 1,
                        origin: user,
                        anchorType: "origin",
                    })
                    
                    channeledUpon.tileEffect = env.rpg.grid.createTileEffect({
                        tiles: env.rpg.grid.markTiles({
                            originTile: target?.piece?.tile,
                            size: 1,
                            ignoresLOS: true,
                            ignoresObstacles: true,
                            includesOrigin: true,
                        }), 
                        effect: "channel_target",
                        length: 1,
                        origin: user,
                        anchorType: "actor",
                        anchorActor: target,
                    })

                    env.rpg.effectMessage.action({
                        user: user,
                        target: target,
                        action: `%TARGET feels watched...`
                    })

                    play('scarydoia', 1.1)

                    user.channelTarget = target
                    user.channelEffect = channeledUpon.tileEffect
                    target.piece.focusOnTile()

                    setTimeout(() => {
                        advanceTurn(user)
                    }, env.ADVANCE_RATE * 2)
                } else {
                    advanceTurn(user) 
                }
            } else {
                target = user.channelTarget
                target.piece.focusOnTile()

                let j = env.rpg.effectMessage.action({
                    user: user,
                    target: target,
                    action: `%TARGET's skin writhes`
                })

                let targets = user.channelEffect.tiles.map(t=>t?.piece?.actor).filter(a => (a && a?.team?.name != user.team.name))
                if(targets.length) {
                    console.log("targets are", targets)
                    
                    env.GENERIC_ACTIONS.teamWave({
                        arbitraryActorList: targets,
                        exec: (actor, i) => {
                            if(actor.slug == user.slug) return
                            play("fear")
                            combatHit(actor, {amt: actor == target ? 1 : 2, origin: user, autohit: true})
                            addStatus({target: actor, origin: user, status: "fear", length: 1}); 

                            if(actor != target) env.rpg.effectMessage.action({
                                user: user,
                                target: actor,
                                action: `%TARGET's skin writhes`,
                                specialHitText: "%TARGET's skin writhes",
                                actionMessageIndex: j
                            })
                        },
                        advanceAfterExec: true, user
                    })
                } else {
                    setTimeout(() => {
                        advanceTurn(user)
                    }, env.ADVANCE_RATE * 2)
                }
            }
        },
    },

    arch_tele_sweep: {
        slug: "arch_tele_sweep",
        name: "Formless Swipe",
        type: 'target',
        anim: "basic-attack",
        avoidChaining: true,

        usage: {
            act: "%USER RUSHES TOWARDS %TARGET",
        },

        range: 1,
        targeting: "square",
        aoe: { 
            shape: "custom",
            customShape: `
                .xxx.
                .xxx
                xxoxx
            `,
            effect: ({user, tiles}) => {
                let effect = env.rpg.grid.createTileEffect({
                    tiles, 
                    effect: "telegraph",
                    telegraphFor: "arch_whelm",
                    telegraphAnim: "telegraph",
                    anchorType: "origin",
                    length: 1,
                    origin: user
                })

                let status = addStatus({target: user, status: "telegraph", length: 1, noReact: true}); 
                if(status) status.addTelegraph(effect)
            }
        },
        
        exec: function(user, target) {
            return "nothing"
        },
    },

    tele_arch_hulk_rampage: {
        slug: "tele_arch_hulk_rampage",
        name: "Formless Swipe",
        type: 'target',
        anim: "basic-attack",

        usage: {
            act: "%USER PREPARES TO CHARGE AT %TARGET",
        },
        range: 6,

        exec: function(user, target) {
            if(!user.piece || !target.piece) return;
            //adds a "charge_warn" tileeffect to self in a 3-size marktile square
            //adds a "charge_target" tileeffect to target in a 0-size marktile square

            user.selfMark = env.rpg.grid.createTileEffect({
                tiles: env.rpg.grid.markTiles({
                    originTile: user?.piece?.tile,
                    size: 1,
                    ignoresLOS: true,
                    ignoresObstacles: true,
                }), 
                effect: "charge_warn",
                telegraphAnim: "charge", //THIS IS WHAT MAKES THE GUY MOVE
                telegraphExec: (telEffect) => {
                    env.rpg.effectMessage.action({
                        user: user,
                        target: target,
                        action: `%USER charges towards %TARGET!`,
                    })

                    user.charge = env.rpg.grid.createTileEffect({
                        tiles: telEffect.tiles, 
                        effect: "charge_active",
                        anchorType: "origin",
                        origin: user
                    })
                },
                anchorType: "origin",
                origin: user,
                length: 1
            })

            user.targetMark = env.rpg.grid.createTileEffect({
                tiles: env.rpg.grid.markTiles({
                    originTile: target?.piece?.tile,
                    size: 0,
                    includesOrigin: true
                }), 
                effect: "charge_target",
                origin: user,
                length: 2
            })

            return "nothing"
        },
    },

    arch_hulk_rampage: {
        slug: "arch_hulk_rampage",
        name: "Wild Strike",
        type: 'target',
        anim: "basic-attack",

        usage: {
            act: "%USER CHARGES!",
            crit: "%TARGET IS KNOCKED BACK",
            hit: "%TARGET STAGGERS BACK",
            miss: "%TARGET EVADES"
        },

        stats: {
            accuracy: 0.8,
            crit: 0.2,
            amt: 2,
            status: {
                stun: {
                    name: 'stun',
                    length: 1
                }
            }
        },
        
        exec: function(user, target) {
            //mercy if someone gets caught in the path
            let specialAmt = 1
            let specialCrit = 0
            if(!env.rpg.turnData[`rampage_${target.slug}`]) {
                specialAmt = this.stats.amt
                specialCrit = this.stats.crit
            }

            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                specialAmt,
                specialCrit,
                critStatus: this.stats.status.stun,
                genExec: ({target}) => { // we still wanna knock people away even if they dodge
                    if(env?.rpg?.is2D) {
                        if(target.piece && user.piece) target.piece.knockback({
                            direction: user?.piece?.tile.getRelativeDirection(target?.piece?.tile), 
                            strength: 2, 
                        })
                    }
                }
            })
        },
    },

    arch_pull: {
        slug: "arch_pull",
        name: "Pull",
        type: 'target',
        anim: "basic-attack",

        usage: {
            act: "%USER GRABS AT %TARGET",
            hit: "%TARGET IS PULLED",
            miss: "%TARGET EVADES"
        },

        stats: {
            range: 4,
            accuracy: 1,
            kb: 1,
            amt: 1,
            status: {
                vulnerable: {
                    name: 'vulnerable',
                    length: 2
                }
            },
        },

        targeting: "square",        
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'miss',
                    rate: 0.5
                },
                critStatus: this.stats.status.vulnerable,                
                specialAutohit: target.team.name == user.team.name,
                hitExec: ({target}) => {
                    if(env?.rpg?.is2D && target.piece && user.piece) {
                        let distance = user?.piece?.tile.distFrom(target?.piece?.tile)

                        target.piece.knockback({
                            direction: target?.piece?.tile.getRelativeDirection(user?.piece?.tile), 
                            strength: Math.max(distance - 1, 1)
                        })
                    }
                },
            })
        },
    },


    /***********************************/
    /* EP4 scene-specific enemy attacks */
    /***********************************/

    /* spine actions */
    special_archivist: { 
        slug: "special_archivist",
        name: "Manipulate",
        type: 'special+autohit',
        anim: "heal",
        
        exec: function(user) {
            //first, check how long it's been since the last cast of the knock
            if(!env.rpg.archCount) { env.rpg.archCount = 0 }
            
            // every 3 turns we set up do the evil knock, including first cast, so this works out to like 2 turn intervals of peace
            // save the fucked up knockback for the heart
            if(env.rpg.archCount % 2 == 0) {
                let directions = [["left", "right"], ["up", "down"]].sample()
                
                directions.forEach(direction=>{
                    let originTile
                    switch(direction) {
                        case "up": originTile = user.piece.tile.getTileByRelativity(0, -2); break;
                        case "down": originTile = user.piece.tile.getTileByRelativity(0, 2); break;
                        case "left": originTile = user.piece.tile.getTileByRelativity(-2, 0); break;
                        case "right": originTile = user.piece.tile.getTileByRelativity(2, 0); break;
                    }

                    console.log("got direction", direction)

                    let tiles = env.rpg.grid.markTiles({
                        originTile, 
                        shape: "custom",
                        includesOrigin: true,
    
                        customShape: `
                            xxx
                            xxx
                            xxx
                            xxx
                            xxx
                            xxx
                            xox
                        `,
                        direction
                    })

                    console.log("got tiles", tiles)

                    play("weirdbuild", 0.75)
                    let effect = env.rpg.grid.createTileEffect({
                        tiles, 
                        originTile,
                        effect: "telegraph",
                        telegraphExec: (effect) => {
                            play("laser")
                            env.GENERIC_ACTIONS.teamWave({
                                arbitraryActorList: effect.affectedActors.filter(a=>a.team.name != "enemy"),
                                exec: (actor, i)=>{
                                    if(actor == user) return;
                                    play("dull", 0.75, 0.5)
                                    combatHit(actor, {amt: 2, origin: user, autohit: true})
                                    if(actor.piece) {
                                        let direction = user.piece.tile.getRelativeDirection(actor.piece.tile)
                                        actor.piece.knockback({direction: direction, strength: 3}) 
                                    }
                                }
                            })
                        },
                        data: { direction },
                        telegraphAnim: "archtelegraph",
                        specialClass: `archivist`,
                        origin: user,
                        length: 1,
                        specialName: "Physicality Denial",
                        specialHelp: "-2HP KB::3 from center"
                    })

                    console.log('got effect', effect)
                })             

                env.rpg.effectMessage.action({
                    user: user,
                    target: user,
                    action: `the air shimmers ominously...`,
                    force: true
                })
            } else {
                play("weirdbuild", 1.5)
            }

            // select a random ally golem to buff - give them evasion and regen
            let target = env.rpg.enemyTeam.members.filter(member => member.originalSlug != "spine_archivist").sample()
            if(target) {
                addStatus({ target, status: "evasion"})
                addStatus({ target, status: "regen"})
                addStatus({ target, status: "windup"})
                
                env.rpg.effectMessage.action({
                    user: user,
                    target: target,
                    action: `%TARGET is briefly empowered by %USER!`,
                    force: true
                })
        
                let effect = env.rpg.grid.createTileEffect({
                    tiles: [target?.piece?.tile],
                    effect: "support_target",
                    length: 1,
                    origin: user,
                    anchorType: "actor",
                    anchorActor: target
                })
                effect.infinite = false
            }

            env.rpg.archCount++

            if(!env.rpg.spawn2 && env.rpg.archCount >= 2) {
                midCombatActorAdd(env.rpg.enemyTeam, "spine_keeper", "right")
                midCombatActorAdd(env.rpg.enemyTeam, "spine_keeper", "right")
                midCombatActorAdd(env.rpg.enemyTeam, "spine_keeper", "right")
                midCombatActorAdd(env.rpg.enemyTeam, "arch_channeler", "right")
                env.rpg.spawn2 = true
            
                env.rpg.effectMessage.action({
                    user: user,
                    target: target,
                    action: `more golem-like shapes appear...`,
                    isMinor: true,
                    force: true
                })
            }

            setTimeout(() => {
               advanceTurn(user) 
            }, 2 * env.ADVANCE_RATE);

            return null
        },
    },

    //p2
    tele_archivist_rampage: {
        slug: "tele_archivist_rampage", 
        name: "Last Invitation",
        type: 'target',
        anim: "basic-attack",
        autohit: true,
        range: 6,
        usage: {
            act: "%USER PREPARES TO CHARGE AT %TARGET",
        },

        exec: function(user, target) {
            if(!user.piece || !target.piece) return; 
            if(env.rpg.grid.tilesByType.safetile) user.piece.teleportToTile(env.rpg.grid.tilesByType.safetile.filter(tile=>!tile.piece).sample(), {follow: true})
            if(user.originalSlug == "spine_archivist") user.actions = ["archivist_charge"] // alternates in specific order

            user.selfMark = env.rpg.grid.createTileEffect({
                tiles: env.rpg.grid.markTiles({
                    originTile: user?.piece?.tile,
                    size: 2,
                    shape: "plus",
                    ignoresLOS: true,
                    ignoresObstacles: true,
                }), 
                effect: "charge_warn",
                telegraphAnim: "charge", //THIS IS WHAT MAKES THE GUY MOVE
                telegraphExec: (telEffect) => {
                    env.rpg.effectMessage.action({
                        user: user,
                        target: target,
                        action: `%USER charges towards %TARGET!`,
                    })

                    user.charge = env.rpg.grid.createTileEffect({
                        tiles: telEffect.tiles, 
                        effect: "charge_active",
                        anchorType: "origin",
                        origin: user
                    })
                },
                anchorType: "origin",
                origin: user,
                length: 1
            })

            user.targetMark = env.rpg.grid.createTileEffect({
                tiles: env.rpg.grid.markTiles({
                    originTile: target?.piece?.tile,
                    size: 0,
                    includesOrigin: true
                }), 
                effect: "charge_target",
                origin: user,
                length: 2
            })

            return null
        },
    },

    archivist_charge: {
        slug: "archivist_charge",
        name: "Desperate Charge",
        type: 'target',
        anim: "basic-attack",

        usage: {
            act: "%USER STRIKES %TARGET",
            crit: "%TARGET IS LEFT REELING",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },

        stats: {
            range: 1,
            accuracy: 0.8,
            crit: 0.5,
            amt: 3,
            status: {
                stun: {
                    name: 'stun',
                    length: 1
                }
            },
        },
        
        exec: function(user, target) {
            if(user.originalSlug == "spine_archivist") user.actions = ["tele_archivist_rampage"]; // alternates in specific order

            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                critStatus: this.stats.status.stun,
                hitExec: ({target})=>{ // has a knockback in combat-scene
                    if(env?.rpg?.is2D) {
                        if(target.piece && user.piece) {
                            target.piece.knockback({
                                direction: user?.piece?.tile.getRelativeDirection(target?.piece?.tile), 
                                strength: 3
                            })

                            user.piece.knockback({
                                direction: target?.piece?.tile.getRelativeDirection(user?.piece?.tile), 
                                strength: 2,
                                ignoreMods: true
                            })
                        }
                    }
                }
            })
        },
    }, 

    miltza_charge: {
        slug: "miltza_charge",
        name: "Desperate Charge",
        type: 'target',
        anim: "basic-attack",

        usage: {
            act: "%USER STRIKES %TARGET",
            crit: "%TARGET IS LEFT REELING",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },

        stats: {
            range: 1,
            accuracy: 0.7,
            crit: 0.2,
            amt: 3,
            status: {
                stun: {
                    name: 'stun',
                    length: 1
                }
            },
        },
        
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                critStatus: this.stats.status.stun,
                hitExec: ({target})=>{ // has a knockback in combat-scene
                    if(env?.rpg?.is2D) {
                        if(target.piece && user.piece) {
                            target.piece.knockback({
                                direction: user?.piece?.tile.getRelativeDirection(target?.piece?.tile), 
                                strength: 2
                            })

                            user.piece.knockback({
                                direction: target?.piece?.tile.getRelativeDirection(user?.piece?.tile), 
                                strength: 2,
                                ignoreMods: true
                            })
                        }
                    }
                }
            })
        },
    }, 
    
    spine_golem_lunge: { 
        slug: "spine_golem_lunge",
        name: "Ethereal Lunge",
        type: 'target',
        anim: "basic-attack",

        usage: {
            act: "%USER LUNGES AT %TARGET",
            crit: "%TARGET IS THROWN AWAY",
            hit: "%TARGET IS KNOCKED BACK",
            miss: "%TARGET EVADES"
        },

        stats: {
            range: 3,
            accuracy: 1,
            crit: 0.2,
            amt: 2,
            status: {
                puncture: {
                    name: 'puncture',
                    length: 1
                }
            }
        },
        
        exec: function(user, target) {
            user.piece.teleportToTile(target?.piece?.tile.getClosestOpenTile(), {follow: true})
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'stab',
                    rate: 1
                },
                critStatus: this.stats.status.puncture,                
                hitExec: () => {
                    if(target.piece && user.piece) target.piece.knockback({
                        direction: user?.piece?.tile.getRelativeDirection(target?.piece?.tile), 
                        strength: 2,
                        onImpact: ()=> play("hit", 0.5)
                    })
                }
            })
        },
    },

    /* split hall powas */
    special_tele_splitbeam: {
        slug: "special_tele_splitbeam",
        name: "Eyebeam",
        type: 'special',
        anim: "",
        usage: {
            act: "the ground shimmers ominously...",
        },
        autohit: true,
        exec: function(user, target) {
            play("laser", 0.75)
            let columns = [5, 4, 3, 2, 1];

            let totalTiles = []
            for (let i = 0; i < 2; i++) {
                let col = columns.sample({remove: true})
                console.log("chose column", col, columns)
                totalTiles = totalTiles.concat(
                    env.rpg.grid.tilesByType.basic.filter(tile=> (tile.getAttribute('x') == col) && !tile.classList.contains("blocks") && tile?.piece?.actor?.team?.name != "neutral")
                )
            }
                        
            let effect = env.rpg.grid.createTileEffect({
                tiles: totalTiles, 
                effect: "telegraph",
                telegraphFor: "splitbeam_hit",
                telegraphAnim: "telegraph",
                anchorType: "origin",
                length: 1,
                origin: user
            })

            let status = addStatus({target: user, status: "telegraph", length: 1, noReact: true})
            if(status) status.addTelegraph(effect)

            setTimeout(() => {
                advanceTurn(user)                
            }, env.ADVANCE_RATE * 3)
        },
    },
            
    splitbeam_hit: {
        slug: "splitbeam_hit",
        name: "splitbeam",
        type: 'special',
        anim: "basic-attack",
        usage: {
            act: "the space writhes with hostility!",
        },

        stats: {
            autohit: true,
            crit: 0,
            amt: 1
        },

        exec: function(user, target) {
            if(user.state != "living") return null;
            if(user == target || target.team.name == "enemy") return null;

            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitExec: ({target})=>{ // has a knockback in combat-scene
                    if(env?.rpg?.is2D) {
                        if(target.piece && user.piece) target.piece.knockback({
                            direction: env.rpg.lastHeartPushDirection || "down", 
                            strength: 4
                        })
                    }
                }
            })
        },
    },

    /* ep4 heart fight */    
    special_heartwall: {
        slug: "special_heartwall",
        name: "Flood",
        type: 'special+autohit+self',
        anim: "heal",
        usage: {
            act: "formless shapes emerge from the tendril!",
        },
        autohit: true,
        exec: function(user, target) {     
            midCombatActorAdd(env.rpg.enemyTeam, "arch_formless", "right", {location: "respawn"})
            midCombatActorAdd(env.rpg.enemyTeam, "arch_formless", "right", {location: "respawn"})
            
            setTimeout(() => {
                advanceTurn(user)                
            }, env.ADVANCE_RATE * 3)
        },
    },

    /* ep4 lesser revisit actions */
    tele_dullflare_evil: {
        //like player dull flare in threat, but is actually a single target stun punch into high damage telegraph
        slug: "tele_dullflare_evil",
        name: "Dull Combo",
        verb: "blast",
        type: 'target',
        anim: "basic-attack",

        usage: {
            act: "%USER SWINGS AT %TARGET",
            crit: "%TARGET IS STAGGERED",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },

        stats: { // low damage setup but goot chance to crit, it's the telegraph that hurts
            accuracy: 1,
            crit: 0.5,
            amt: 1,
            status: {
                fear: {
                    name: 'stun',
                    length: 1
                },
            }
        },

        range: 1,        
        exec: function(user, target, beingUsedAsync, {actionMessageIndex}) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                critStatus: this.stats.status.fear,
                genExec: ({target}) => {
                    if(env?.rpg?.is2D) {
                        if(!target?.piece?.tile) return; // we just don't telegraph if this kills someone

                        if(target.piece && user.piece) target.piece.knockback({
                            direction: user?.piece?.tile.getRelativeDirection(target?.piece?.tile),
                            strength: 2,
                        })

                        let dir = user?.piece?.tile.getRelativeDirection(target?.piece?.tile)

                        setTimeout(() => {
                            //then, put a telegraph around the struck ally
                            let tiles = env.rpg.grid.markTiles({
                                originTile: target?.piece?.tile,
                                shape: env.rpg.scenarioName == "ep4_lesserboss" ? "plus" : "square",
                                size: env.rpg.scenarioName == "ep4_lesserboss" ? 2 : 1,
                                includesOrigin: true,
                            })

                            let effect = env.rpg.grid.createTileEffect({
                                tiles: tiles, 
                                effect: "telegraph",
                                telegraphExec: (telEffect) => {
                                    if(!telEffect.tiles) return;

                                    let effect = env.rpg.grid.createTileEffect({
                                        tiles: telEffect.tiles, 
                                        effect: "projectile_itzka",
                                        anchorType: "tile",
                                        length: 1,
                                        origin: user,
                                        data: {
                                            direction: dir || "up",
                                            turnTickType: "ally"
                                        },
                                        specialName: "Dull Pulse"
                                    })

                                    env.rpg.effectMessage.action({
                                        user: user,
                                        target: target,
                                        action: `%USER fires a destabilizing sphere!`,
                                        reason: "DULL PULSE",
                                        isMinor: true
                                    })
                                },
                                data: {
                                    direction: dir || "up"
                                },
                                telegraphAnim: "telegraph",
                                anchorType: "origin",
                                length: 1,
                                origin: user,
                                specialClass: "windup_telegraph projectile",
                                specialName: "Blast Range",
                                specialHelp: "creates directional destabilizing projectiles on next origin turn, may be interrupted"
                            })

                            env.rpg.effectMessage.action({
                                user: user,
                                target: target,
                                action: `%USER prepares a follow-up dull pulse..`,
                                reason: "WINDUP"
                            })

                            let status = addStatus({target: user, status: "windup_telegraph", length: 1, noReact: true}); 
                            if(status) status.addTelegraph(effect)
                            user.telegraph = effect //this isn't a usual property, it's just used in kivii's grasp below
                        }, 200)
                    }
                },
                advanceAfterExec: true, beingUsedAsync, 
            })
        }
    },

    scene_dullflare_evil: {
        //like player dull flare, but with altered range and special effects
        slug: "scene_dullflare_evil",
        name: "Dull Flare",
        verb: "blast",
        type: 'target',
        anim: "basic-attack",

        usage: {
            act: "%USER TEARS OPEN THE DULL",
            crit: "%TARGET IS ANNIHILATED",
            hit: "%TARGET IS SEARED",
            miss: "%TARGET EVADES"
        },

        details: {
            onHit: ()=> `'wide directional release of rapidly decaying dull light';'inflicts [STAT::amt]';'KB::2'`
        },

        stats: { 
            accuracy: 1,
            crit: 0.1,
            amt: 4
        },

        range: 2,
        targeting: "plus",
        aoe: { 
            shape: "custom",
            customShape: `
                xxx
                xxx
                xxx
                xox
            `,
        },
        
        exec: function(user, target, beingUsedAsync, {actionMessageIndex, tileEffect}) {
            let specialAmt = this.stats.amt
            if(target.originalSlug == "destructible_lesserpod") {
                specialAmt = 1 //reduced damage to destructibles
            } else {
                //gets total number of actors in the blast radius
                let telegraphTiles = tileEffect.tiles
                let totalSplit = telegraphTiles.map(t=>t?.piece?.actor).filter(a=>a && a?.team?.name != "enemy").length
                specialAmt = Math.floor(this.stats.amt / (totalSplit || 1))

                console.log("!!!", telegraphTiles, telegraphTiles.map(t=>t?.piece?.actor).filter(a=>a && a?.team?.name != "enemy"))
                
                if(env.rpg.turnData.diminished) {
                    env.rpg.turnData.diminished = true;
                    setTimeout(() => {
                        env.rpg.effectMessage.action({
                            user: user,
                            target: target,
                            action: `The golem's blast is diminished across multiple targets...`,
                            actionMessageIndex
                        })
                    }, 200)
                }
            }

            

            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                specialAmt,
                hitSfx: {
                    name: 'dull',
                    rate: 1.5
                },
                critSfx: {
                    name: 'shot6',
                    rate: 0.75
                },
                genExec: ({target}) => {
                    if(env?.rpg?.is2D) {
                        if(target.piece && user.piece) target.piece.knockback({
                            direction: user?.piece?.tile.getRelativeDirection(target?.piece?.tile), 
                            strength: 2,
                        })
                    }
                },
                advanceAfterExec: true, beingUsedAsync, 
            })
        }
    },
    
    scene_kivii_grasp: {
        slug: "scene_kivii_grasp",
        name: "Grasp",
        type: 'target',
        anim: "basic-attack",

        usage: {
            act: "%USER GRABS AT %TARGET",
            crit: "%TARGET IS THROWN",
            hit: "%TARGET IS CRUSHED",
            miss: "%TARGET EVADES"
        },

        stats: {
            range: 1,
            accuracy: 1,
            crit: 0.75,
            amt: 2,
            rangeHP: 1,
            status: {
                stun: {
                    name: 'stun',
                    length: 1
                },
                fear: {
                    name: 'fear',
                    length: 1
                }
            }
        },
        
        targeting: "square",
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitStatus: this.stats.status.fear,
                critExec: ({target})=>{ 
                    if(env?.rpg?.is2D && target.piece) {
                        // intentionally throw into an itzil telegraph, otherwise sent to a random tile on crit
                        let itzil = env.rpg.actors.lesser_itzil
                        let dest
                        if(itzil) {
                            if(itzil?.telegraph?.tiles?.length) dest = itzil.telegraph.tiles.sample()
                        }

                        if(!dest) {
                            dest = env.rpg.grid.tilesByType.basic.filter(tile=>!tile.piece && !tile.classList.contains("damagetile")).sample()
                        }

                        if(dest) {
                            dest.focusOnTile()
                            target.piece.animateToTile(dest, {animation: "tossed", duration: 1000, endCallback: ()=>{
                                addStatus({target, status: "fear", length: 1, origin: user})
                            }})
                        }
                    }
                }
            })
        },
    },
    
    tele_kivii_grasp: {
        slug: "tele_kivii_grasp",
        name: "Target",
        type: 'target',
        anim: "basic-attack",

        usage: {
            act: "%TARGET FEELS A LOOMING THREAT",
        },

        stats: {
            range: 3,
            autohit: true,
            amt: 0,
            status: {
                stun: {
                    name: 'stun',
                    length: 1
                },
                fear: {
                    name: 'fear',
                    length: 1
                },
            }
        },

        exec: function(user, target) {
            play("weirdbuild")
            let effect = env.rpg.grid.createTileEffect({
                tiles: [target?.piece?.tile], 
                effect: "telegraph", 
                length: 2,
                origin: user,
                anchorType: "actor",
                anchorActor: target,
                telegraphAnim: "telegraph",
                telegraphFor: "scene_kivii_grasp",
                specialClass: "kiviigrasp windup_telegraph",
                specialName: "Grab",
                specialHelp: "strikes target on expiration, may be interrupted"
            })

            effect.looming = true

            env.rpg.effectMessage.action({
                user: user,
                target: target,
                action: `%USER focuses, but is left open...`,
                reason: "WINDUP",
                isMinor: true,
            })

            let status = getStatus(user, "telegraph")
            if(!status) status = addStatus({target: user, status: "windup_telegraph", length: 2, noReact: true}); 
            if(status) status.addTelegraph(effect)

            return "nothing"
        },
    },

    special_tele_itzil: {
        slug: "special_tele_itzil",
        name: "Huge Pulse",
        type: 'special+autohit',
        anim: "basic-attack",
        usage: {
            act: "%USER's gauntlets glow brightly...",
        },
        autohit: true,
        exec: function(user, target) {       
            let direction = ["upface", "leftface", "downface", "rightface"].sample()

            //first: warp to a random point in the selected direction
            if(env.rpg.grid.tilesByType[direction]) user.piece.teleportToTile(env.rpg.grid.tilesByType[direction].filter(tile=>!tile.piece).sample(), {follow: true})
            else user.piece.teleportToTile(env.rpg.grid.tilesByType.basic.filter(tile=>!tile.piece).sample(), {follow: true})

            setTimeout(()=>{
                play("weirdbuild")
                //then: direct a 5-width, 9-length AOE in the direction specified
                //this leaves single safe spaces at the end of affected lanes
                let tiles = env.rpg.grid.markTiles({
                    originTile: user?.piece?.tile, 
                    shape: "custom",

                    customShape: `
                        xxxxx
                        xxxxx
                        ..o..
                    `,
                    direction: direction.replace("face", "")
                })
                
                console.log("total tiles are", tiles)
                
                let effect = env.rpg.grid.createTileEffect({
                    tiles: tiles, 
                    effect: "telegraph",
                    telegraphExec: (telEffect) => {                 
                        console.log('executing on', telEffect, "with tiles", telEffect.tiles)       
                        let effect = env.rpg.grid.createTileEffect({
                            tiles: telEffect.tiles, 
                            effect: "projectile_itzka",
                            anchorType: "tile",
                            length: 1,
                            origin: user,
                            data: {
                                direction: direction.replace("face", ""),
                                turnTickType: "ally"
                            }
                        })

                        effect.name = "Dull Pulse"
                    },
                    data: {
                        direction: direction.replace("face", ""),
                    },
                    specialName: "Dull Pulse",
                    specialHelp: "firing projectiles in specified direction on next origin turn",
                    specialClass: "projectile",
                    telegraphAnim: "telegraph",
                    anchorType: "origin",
                    length: 1,
                    origin: user
                })

                setTimeout(() => {
                    advanceTurn(user)                
                }, env.ADVANCE_RATE * 3)
            }, 1000)
        },
    },

    special_tele_kivii: {
        slug: "special_tele_kivii",
        name: "Multislam",
        type: 'special+autohit',
        anim: "basic-attack",
        usage: {
            act: "%USER readies two claws...",
        },
        autohit: true,
        exec: function(user, target) {   
            //get rid of any prior "looming" grasps
            env.rpg.grid.tileEffects.filter(e=>e.looming).forEach(e=>env.rpg.grid.deleteTileEffect(e));
            
            //target two random allies and give them the "megaloom" class telegraph, both 2-length
            //one will be marked as the first, the other as the second
            let possibleTargets = [...env.rpg.allyTeam.members.filter(m=>m.hp > 0)]
            let targets = [possibleTargets.sample({remove: true}), possibleTargets.sample({remove: true})]
            targets.forEach((target, i) => {
                if(!target) return;
                
                let tiles = env.rpg.grid.markTiles({
                    originTile: target?.piece?.tile,
                    size: 0,
                    includesOrigin: true
                })
            
                env.rpg.grid.createTileEffect({
                    tiles: tiles, 
                    effect: "telegraph",
                    telegraphFor: "scene_kivii_smash",
                    telegraphAnim: "telegraph",
                    anchorActor: target,
                    anchorType: "actor",
                    specialClass: `kiviismash smash-${i}`,
                    length: 1,
                    origin: user,
                    specialName: "smash",
                    specialHelp: "smashing target upon next origin turn, will knock back all allies proportional to proximity"
                })
            })  

            setTimeout(() => {
                if(targets[0]) { targets[0].piece.focusOnTile(); play("weirdbuild") }
            }, env.ADVANCE_RATE)

            setTimeout(() => {
                if(targets[1]) { targets[1].piece.focusOnTile(); play("weirdbuild", 0.75) }                
            }, env.ADVANCE_RATE * 2)

            setTimeout(() => {
                advanceTurn(user)                
            }, env.ADVANCE_RATE * 3)
        },
    },

    scene_kivii_smash: {
        slug: "scene_kivii_smash",
        name: "Assault",
        type: 'target',
        anim: "basic-attack",

        usage: {
            act: "%USER SMASHES %TARGET",
            crit: "%TARGET IS LEFT REELING",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        
        stats: {
            range: 2,
            autohit: true,
            crit: 0.4,
            amt: 1
        },
        
        targeting: "square",
        exec: function(user, target, beingUsedAsync, {actionMessageIndex} = {}) {            
            
            let hit = env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
            })
            
            //we knock back everyone on the target's team proportional to distance
            target.team.members.forEach(m=>{
                if(m == target || !m.piece) return;
                let distance = m.piece.getDistance(target)
                let strength = 5 - distance
                let direction = target?.piece?.tile.getRelativeDirection(m.piece.tile)

                if(strength <= 0) strength = 0
                if(strength) m.piece.knockback({direction: direction, strength}) 
            })

            return hit
        },
    },

    special_itzka: {
        slug: "special_itzka",
        name: "Overlap Collapse",
        type: 'special+autohit',
        anim: "",
        usage: {
            act: "The overlap bends inwards!!",
        },
        autohit: true,
        exec: function(user, target) {      
            play("scarydoia")
            //first, shrink the arena slightly based on progress
            if(!user.shrinkProgress) user.shrinkProgress = 6 
            if(user.shrinkProgress > 2) {
                user.shrinkProgress--
                let ring = env.rpg.grid.markTiles({originTile: user?.piece?.tile, shape: "ring", size: user.shrinkProgress})
                ring.forEach(tile=> {
                    tile.classList.add('notile')
                    tile.addToEffect(env.rpg.grid.tileEffects[0], { length: 99, addingBy: "growing"})
                }) 
            }            
            

            //second, select a direction and pull projectiles inwards from the sides
            let direction = ["upshoot", "leftshoot", "rightshoot", "downshoot"].sample()

            //finally, get all tiles of that type, and fire inwards in the direction (string - shoot)
            let tiles = env.rpg.grid.createTileEffect({
                tiles: env.rpg.grid.tilesByType[direction], 
                anchorType: "tile",
                effect: `projectile_itzka`, 
                length: 3, 
                origin: user,
                data: {
                    turnTickType: "ally",
                    direction: direction.replace("shoot", "")
                }
            })


            setTimeout(() => {
                env.rpg.effectMessage.action({
                    user: user,
                    target: user,
                    action: `velzie's stage grows smaller...`,
                    reason: "OVERLAP COLLAPSE",
                })
            }, env.ADVANCE_RATE * 1.5)

            setTimeout(() => {
                advanceTurn(user)
            }, env.ADVANCE_RATE * 3)
        },
    },

    /* final sequence special abilities */
    scene_bozko_attack_desperation: {
        slug: "scene_bozko_attack_desperation",
        name: "Sweep",
        type: 'target+movement+ground',
        verb: "swing at",
        anim: "basic-attack",

        usage: {
            act: "%USER SWINGS",
            crit: "%TARGET IS THROWN AWAY",
            hit: "%TARGET IS STAGGERED",
            miss: "%TARGET EVADES"
        },

        details: {
            flavor: `'strike with full momentum';'shatter offensive appendages'`,
            onUse: `'move to location';'HIT foes in wide area ahead'`,
            onHit: `'[STAT::amt] [STATUS::weakened] [STAT::kb]`,
            onCrit: `'[STATUS::stun]'`,
        },
        
        targeting: "angular",
        requiresPath: true,
        ignoresActors: false,
        aoe: { 
            size: 2, 
            shape: "cone",
            distant: true,
            canHit: (user, target) => { return target.team.name != user.team.name}, // bozko is very careful
            effect: ({user, tiles, selectedTile}) => {
                user.piece.teleportToTile(selectedTile, {follow: true})
            },
        },

        stats: {
            accuracy: 0.8,
            crit: 0.3,
            amt: 3,
            kb: 3,
            range: 2,
            status: {
                weakened: {
                    name: 'weakened',
                    length: 1
                },
                stun: {
                    name: 'stun',
                    length: 1
                },
            }
        },
        
        exec: function(user, target) {
            let hit = env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitStatus: this.stats.status.weakened,
                critStatus: this.stats.status.stun
            })

            if(env?.rpg?.is2D) {
                let kbStrength = 3

                if(hit == "crit" && target.piece) {
                    kbStrength += 3
                    target.piece.knockback({
                        direction: user?.piece?.tile.getRelativeDirection(target?.piece?.tile), 
                        strength: kbStrength, 
                        onImpact: ()=> {
                            if(env.rpg.turnData[`${target.slug}_bozstun`]) return;
                            env.rpg.turnData[`${target.slug}_bozstun`] = true
                            addStatus({target, status: "stun", length: this.stats.status.stun.length})
                            play("crit", 0.5)
                            env.setTimeout(()=> { env.rpg.effectMessage.action({
                                user: user,
                                target: target,
                                action: `%TARGET is stunned by the impact!`
                            })})
                        }
                    })
                } else if(hit && target.piece) {
                    target.piece.knockback({
                        direction: user?.piece?.tile.getRelativeDirection(target?.piece?.tile), 
                        strength: kbStrength
                    })
                }
            }

            return hit
        }
    },


    scene_cavik_attack_desperation: {
        slug: "scene_cavik_attack_desperation",
        name: "Dull Beam",
        type: 'target+ground',
        anim: "basic-attack",
        usage: {
            act: "%USER prepares to fire...",
        },

        details: {
            flavor: `'utilize modified and twisted dull golem claw';'fire wave of destabilizing dull light after delay'`,
            onUse: `'prepare attack in specified direction';'fires on start of next turn'`,
            onHit: `'[STAT::amt] [STAT::kb] [STATUS::destabilized]'`,
        },

        stats: {
            amt: 3,
            kb: 1,
            status: {
                destabilized: { name: "destabilized", length: 1 }
            }
        },

        autohit: true,
        targeting: "plus",
        range: 2,
        aoe: { 
            shape: "custom",
            customShape: `
                xxx
                xxx
                xxx
                .o.
            `,
            effect: ({user, tiles, selectedTile}) => {
                let direction = user?.piece?.tile.getRelativeDirection(selectedTile)

                let effect = env.rpg.grid.createTileEffect({
                    tiles: tiles, 
                    effect: "telegraph",
                    telegraphExec: (telEffect) => {                 
                        console.log('executing on', telEffect, "with tiles", telEffect.tiles)       
                        let effect = env.rpg.grid.createTileEffect({
                            tiles: telEffect.tiles, 
                            effect: "projectile_cavik",
                            anchorType: "tile",
                            length: 1,
                            origin: user,
                            data: {
                                direction,
                                turnTickType: "any"
                            }
                        })

                        effect.name = "Dull Pulse"
                    },
                    telegraphAnim: "telegraph",
                    anchorType: "origin",
                    length: 1,
                    origin: user
                })
            }
        },
        
        exec: function(user, target) {
            return "nothing"
        },
    },

    scene_gakvu_attack_desperation: { // stronger
        slug: "scene_gakvu_attack_desperation",
        name: "Scramble",
        type: 'target+ground',
        anim: "basic-attack",
        
        usage: {
            act: "%USER TWISTS THE OVERLAP",
        },

        details: {
            flavor: `disrupt overlap with groundsmindry`,
            onUse: `'create persistent area effect';'HIT foes who enter or are knocked within'`,
            onHit: `'distort corrucystic flesh for [STAT::amt]'`,
            onCrit: `'reveal weakness';'inflict [STATUS::vulnerable]'`,
        },

        stats: {
            accuracy: 0.9, 
            crit: 0.2,
            amt: 2,
            status: {
                vulnerable: {
                    name: 'vulnerable',
                    length: 2
                }
            }
        },
        
        exec: function(user, target) {
            return "nothing"
        },

        //EP4 stats
        range: 3,
        ignoresBlocks: true,
        ignoresLOS: true,
        aoe: { 
            size: 2, 
            shape: "circle",
            effect: ({user, tiles, selectedTile}) => {
                if(user.scramblerEffect) {
                    env.rpg.grid.deleteTileEffect(user.scramblerEffect);
                }

                user.scramblerEffect = env.rpg.grid.createTileEffect({
                    tiles, 
                    effect: "scrambler", 
                    length: 3, 
                    origin: user,
                    specialClass: "megamode",
                    originTile: selectedTile
                })
            }
        },
    },

    /* final sequence enemy actions */
    tele_tendril_swipe: {
        slug: "tele_tendril_swipe",
        name: "swipe",
        type: 'special+autohit',
        anim: "heal",
        avoidChaining: true,
        usage: {
            act: "%USER rears back...",
        },
        autohit: true,
        targeting: "special",
        range: 5,
        exec: function(user, target) {
            let tiles = env.rpg.grid.markTiles({
                originTile: user?.piece?.tile, 
                shape: "square",
                size: 3,
                ignoresObstacles: false,
                ignoresLOS: true,
                onTileCheck: ({tile, validity}) => {
                    if(tile.classList.contains("damagetile") || tile.classList.contains("nevertile")) return false;
                    return validity
                }
            })

            let effect = env.rpg.grid.createTileEffect({
                tiles, 
                effect: "telegraph",
                telegraphFor: "arch_range",
                telegraphAnim: "telegraph",
                anchorType: "origin",
                length: 1,
                origin: user
            })

            setTimeout(() => {
                advanceTurn(user)                
            }, env.ADVANCE_RATE * 2)
        },
    },

    special_tendril_slam: {
        slug: "special_tendril_slam",
        name: "Tendril Slam",
        type: 'special+target',
        anim: "basic-attack",
        avoidChaining: true,
        usage: {
            act: "%USER stretches up into the overlap...",
        },
        autohit: true,
        range: 5,
        targeting: "special",
        exec: function(user, target) {     
            env.rpg.grid.createTileEffect({
                tiles: [target?.piece?.tile], 
                effect: "telegraph",
                telegraphFor: "scene_kivii_smash",
                telegraphAnim: "telegraph",
                anchorActor: target,
                anchorType: "actor",
                specialClass: `kiviismash tendrilversion`,
                length: 1,
                origin: user,
            })

            setTimeout(() => {
                target.piece.focusOnTile()
            }, env.ADVANCE_RATE)

            setTimeout(() => {
                advanceTurn(user)                
            }, env.ADVANCE_RATE * 2)
        },
    },

    special_wall_undulate: {
        slug: "special_wall_undulate",
        name: "undulate",
        type: 'special+target',
        anim: "basic-attack",
        usage: {
            act: "%USER splits off offensive limbs...",
        },
        autohit: true,
        range: 5,
        targeting: "special",
        exec: function(user, target) {
            let direction = ["rightlowerface", "leftlowerface", "uplowerface"].sample()
            play("dull", 0.5, 0.5)

            //then: direct a 5-width, 9-length AOE in the direction specified
            //this leaves single safe spaces at the end of affected lanes
            let initialTiles = [...env.rpg.grid.tilesByType[direction]]

            let tiles = []
            for (let i = 0; i < 4; i++) {
                tiles.push(initialTiles.sample({remove: true}))                
            }
                   
            let effect = env.rpg.grid.createTileEffect({
                tiles: tiles, 
                effect: "projectile_itzka",
                anchorType: "tile",
                length: 1,
                origin: user,
                data: {
                    direction: direction.replace("lowerface", ""),
                    turnTickType: "ally"
                }
            })

            midCombatActorAdd(env.rpg.enemyTeam, "arch_formless", "right", {location: "respawn"})
            midCombatActorAdd(env.rpg.enemyTeam, "arch_formless_enraged", "right", {location: "respawn"})

            env.rpg.allyTeam.members.forEach(m=>{
                if(!m.piece) return;
                let distance = m.piece.getDistance(user)
                let strength = 4 - distance

                if(strength <= 0) strength = 0
                if(strength) m.piece.knockback({direction: "up", strength})
            })

            setTimeout(() => {
                advanceTurn(user)                
            }, env.ADVANCE_RATE * 3)
        },
    },

    special_tele_golemblast: {
        slug: "special_tele_golemblast",
        name: "Aimed Blast",
        type: 'special+autohit',
        anim: "basic-attack",
        usage: {
            act: "%USER takes aim...",
        },
        avoidChaining: true,
        autohit: true,
        exec: function(user, target) {   
            //target a random ally and give them the "megaloom" class telegraph
            let actualTarget = [...env.rpg.allyTeam.members.filter(m=>m.hp > 0 && !m.npc)].sample()

            if(!actualTarget) actualTarget = [...env.rpg.allyTeam.members.filter(m=>m.hp > 0)].sample();
 
            let originTiles = env.rpg.grid.markTiles({
                originTile: user?.piece?.tile,
                size: 1,
                includesOrigin: true,
                shape: "square"
            })
        
            //looming aim marker over target
            let aimingMarker = env.rpg.grid.createTileEffect({
                tiles: [actualTarget?.piece?.tile], 
                effect: "telegraph",
                telegraphExec: (telEffect) => {},
                telegraphAnim: "telegraph",
                anchorActor: actualTarget,
                anchorType: "actor",
                specialClass: `aimed-at`,
                specialName: "Aimed At",
                specialHelp: "subject to be fired towards on next origin turn",
                length: 10,
                origin: user,
                originTile: user?.piece?.tile,
                specialRequiresOrigin: true
            })
        
            //telegraph warning of the shooting radius
            addStatus({target: user, status: "aiming_indicator", origin: user})
            let firingSquare = env.rpg.grid.createTileEffect({
                tiles: originTiles, 
                effect: "telegraph",
                specialClass: `aiming-at projectile`,
                specialName: "Aiming",
                specialHelp: "firing projectiles towards target on next origin turn",
                specialRequiresOrigin: true,
                telegraphExec: (telEffect) => {
                    if(user.state != "living") return;
                    removeStatus(user, "aiming_indicator")
                    
                    env.rpg.grid.deleteTileEffect(aimingMarker);
                    //if anyone's missing somehow, we default to up
                    let direction = user?.piece?.tile && actualTarget?.piece?.tile ? user.piece.tile.getRelativeDirection(actualTarget.piece.tile) : "up"

                    let effect = env.rpg.grid.createTileEffect({
                        tiles: telEffect.tiles, 
                        effect: "projectile_itzka",
                        anchorType: "tile",
                        length: 1,
                        origin: user,
                        specialName: "Dull Pulse",
                        specialClass: "dullsphere",
                        data: {
                            direction,
                            turnTickType: "ally"
                        }
                    })

                    env.rpg.effectMessage.action({
                        user: user,
                        target: actualTarget,
                        action: `%USER fires a destabilizing sphere!`,
                        reason: "DULL PULSE",
                        isMinor: true
                    })
                },
                telegraphAnim: "telegraph",
                anchorType: "origin",
                length: 1,
                origin: user
            })

            setTimeout(() => {
                actualTarget.piece.focusOnTile()
            }, env.ADVANCE_RATE)

            setTimeout(() => {
                advanceTurn(user)
            }, env.ADVANCE_RATE * 3)
        },
    },

    tele_enraged_rampage: {
        slug: "tele_enraged_rampage", 
        name: "Enraged Charge",
        type: 'target',
        anim: "basic-attack",

        usage: {
            act: "%USER PREPARES TO CHARGE AT %TARGET",
        },

        requiresPath: true,
        range: 6,
        
        exec: function(user, target) {
            if(!user.piece || !target.piece) return;
            
            let tiles = env.rpg.grid.markTiles({
                originTile: user?.piece?.tile, 
                shape: "cone",
                ignoresLOS: true,
                ignoresObstacles: true,
                direction: user?.piece?.tile.getRelativeDirection(target?.piece?.tile)
            })
            
            user.selfMark = env.rpg.grid.createTileEffect({
                tiles,
                effect: "charge_warn",
                telegraphAnim: "charge", //THIS IS WHAT MAKES THE GUY MOVE
                telegraphExec: (telEffect) => {
                    env.rpg.effectMessage.action({
                        user: user,
                        target: target,
                        action: `%USER charges towards %TARGET!`,
                    })

                    user.charge = env.rpg.grid.createTileEffect({
                        tiles: telEffect.tiles, 
                        effect: "charge_active",
                        anchorType: "origin",
                        origin: user
                    })

                    user.charge.specificAction = env.ACTIONS["arch_whelm"]
                },
                anchorType: "origin",
                origin: user,
                length: 1
            })

            user.targetMark = env.rpg.grid.createTileEffect({
                tiles: env.rpg.grid.markTiles({
                    originTile: target?.piece?.tile,
                    size: 0,
                    includesOrigin: true
                }), 
                effect: "charge_target",
                origin: user,
                length: 2
            })

            return "nothing"
        },
    },

    /* vekoa/akizet special actions for boss sequence */
    vekfight_assault: {
        slug: "vekfight_assault",
        name: "Assault",
        type: 'target',
        anim: "basic-attack",

        usage: {
            act: "%USER CHARGES %TARGET",
            crit: "%TARGET IS LEFT REELING",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },

        details: {
            flavor: `'strike with mutual ferocity'`,
            onUse: `'move to closest open tile near target if not adjacent'`,
            onHit: `'[STAT::amt] [STAT::kb]'`,
            onCrit: `'[STATUS::stun]'`,
        },

        stats: {
            range: 2,
            accuracy: 0.6,
            crit: 0.2,
            amt: 2,
            kb: 3,
            status: {
                stun: {
                    name: 'stun',
                    length: 1
                }
            }
        },
        
        targeting: "square",
        exec: function(user, target) {
            let distance = 0
            if(env?.rpg?.is2D) {
                distance = user?.piece?.tile.distFrom(env.rpg.targetingFor.selectedTile)
            }

            let direction // we only assign a directional for akizet so that vekoa has some randomness
            if(user.team.name == "ally") {
                direction = target?.piece?.tile.getRelativeDirection(user?.piece?.tile)
            }
                    
            if((distance > 1) || user.team.name == "enemy") {
                user?.piece?.tile.getRelativeDirection(target?.piece?.tile)
                user.piece.teleportToTile(target?.piece?.tile.getClosestOpenTile({avoidDamageTiles: true, direction}), {follow: true})
            }

            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                critStatus: this.stats.status.stun,
                hitExec: ({target})=>{ // has a knockback in combat-scene
                    if(env?.rpg?.is2D) {
                        if(target.piece && user.piece) target.piece.knockback({
                            direction: user?.piece?.tile.getRelativeDirection(target?.piece?.tile), 
                            strength: 3
                        })
                    }
                }
            })
        },
    },

    vekfight_rush: {
        slug: "vekfight_rush",
        name: "Rush",
        type: 'movement+ground+self',
        anim: "",
        beneficial: true,

        usage: {
            act: "%USER LOOKS FOR AN OPENING"
        },

        details: {
            flavor: "'move quickly';'overexert cognitive facilities';'consider all immediate possibilities'",
            onUse: `'[STATUS::hyperfocus]';'move to target location';'select current tile to avoid movement'`
        },

        stats: {
            range: 1,
            status: {
                hyperfocus: {
                    name: 'hyperfocus',
                    length: 1
                },        
            }
        },
        
        targeting: "square",
        includesOrigin: true,
        requiresPath: true,
        ignoresActors: false,
        aoe: { 
            size: 0, 
            shape: "square",
            effect: ({user, tiles, selectedTile}) => {
                if(selectedTile.piece) { 
                    return //targeted own tile
                } else {
                    user.piece.teleportToTile(selectedTile, {follow: true})
                }
            }
        },
        
        exec: function(user, target) {
            play('mend', 0.5);
            addStatus({target: user, status: this.stats.status.hyperfocus.name, length: this.stats.status.hyperfocus.length, noReact: true}); 
            return 'nothing';
        },

        disableIf: (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" },
        avoidChaining: true,
    },

    special_eye_boss: {
        slug: "special_eye_boss",
        name: "Epicenter",
        type: 'special',
        anim: "basic-attack",
        usage: {
            act: "The epicenter pulses chaotically...",
        },
        autohit: true,
        possiblePatterns: [
            `
                ..xxx..
                xxxxxxx
                xx...xx
                .x.o.x.
            `,
            `
                .xxxxx.
                x.....x
                x.....x
                x..o..x
                x.....x
                x.....x
                .xxxxx.
            `, 
            `
                xxxxx
                x...x
                x.o.x
                x...x
                xxxxx
            `, 
            `
                .x.x.x.
                x.x.x.x
                .x...x.
                x..o..x
                .x...x.
                x.x.x.x
                .x.x.x.
            `, 
            `
                ..x.x..
                .x.x.x.
                x.....x
                .x.o.x.
                x....x.
                .x.x.x.
                ..x.x..
            `, 
            /*
            `
                .xxxxx.
                xxxxxxx
                xx...xx
                xx.o.xx
                xx...xx
                xxxxxxx
                .xxxxx.
            `, 
            */
        ],
        exec: function(user, target, beingUsedAsync) {
            env.rpg.grid.classList.add("zoomout")
            env.rpg.grid.style.setProperty("--playercontrol-rotation-raw", "0")
            env.rpg.classList.add('hideteams')

            for (let i = 0; i < 2; i++) {
                setTimeout(() => {
                    let tiles = env.rpg.grid.markTiles({
                        originTile: user?.piece?.tile, 
                        shape: "custom",
                        customShape: this.possiblePatterns.sample({noRepeat: true}),
                        direction: ["up", "left", "right", "down"].sample(),
                        ignoresObstacles: false,
                        ignoresLOS: true
                    })
        
                    let effect = env.rpg.grid.createTileEffect({
                        tiles, 
                        effect: "eyebeam", 
                        length: i + 2,
                        origin: user,
                        telegraphAnim: "telegraph",
                        telegraphFor: "eyeboss_hit",
                        originTile: user?.piece?.tile
                    })                   
                }, 1000 * i);             
            }
                
            setTimeout(() => {
                if(beingUsedAsync) env.rpg.effectMessage.close();
                else advanceTurn(user)
                env.rpg.grid.classList.remove("zoomout")
                env.rpg.classList.remove('hideteams')
            }, 4000)
        },
    },

    eyeboss_hit: {
        slug: "eyeboss_hit",
        name: "Dull Pillar",
        type: 'special',
        anim: "basic-attack",
        usage: {
            act: "%TARGET is struck by stray dull light!",
        },

        stats: {
            autohit: true,
            crit: 0,
            amt: 2
        },

        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitExec: ({target})=>{ // has a knockback in combat-scene
                    if(env?.rpg?.is2D) {
                        if(target.piece && user.piece) target.piece.knockback({
                            direction: env.rpg.lastHeartPushDirection || user?.piece?.tile.getRelativeDirection(target?.piece?.tile), 
                            strength: 2
                        })
                    }
                }
            })
        },
    },

    special_epicenter: {
        name: "projtest",
        slug: "special_epicenter",
        type: 'special',
        desc: "'projectile test'",
        anim: "basic-attack",
        usage: {
            act: "bewewaaawaaaaweawa!!!!",
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {
            env.rpg.grid.classList.add("zoomout")
            env.rpg.grid.style.setProperty("--playercontrol-rotation-raw", "0")

            let initialDirections = [
                "up", "down", "left", "right",
                "up-left", "up-right", "down-left", "down-right"
            ]

            let chosenDirections = [
                initialDirections.sample({remove: true}),
                initialDirections.sample({remove: true}),
                initialDirections.sample({remove: true}),
                initialDirections.sample({remove: true}),
            ]

            chosenDirections.forEach((direction, i) => {
                setTimeout(() => {
                    let tiles = env.rpg.grid.markTiles({
                        originTile: user?.piece?.tile, 
                        shape: "cone",
                        direction,
                        length: 2,
                        size: 1,
                        ignoresObstacles: true,
                        ignoresLOS: true
                    })
        
                    let effect = env.rpg.grid.createTileEffect({
                        tiles, 
                        effect: "projectiletest",
                        anchorType: "tile",
                        anchorCoordinates: user?.piece?.tile.coordinates,
                        origin: user,
                        data: {
                            direction: direction
                        }
                    })
                }, 100 * i);             
            })
                
            setTimeout(() => {
                if(beingUsedAsync) env.rpg.effectMessage.close();
                else advanceTurn(user)
                env.rpg.grid.classList.remove("zoomout")
            }, 600)
        }
    },

    vekoa_swipe: {
        slug: "vekoa_swipe",
        name: "Assault",
        type: 'target',
        anim: "basic-attack",

        usage: {
            act: "%USER CHARGES %TARGET",
            crit: "%TARGET IS LEFT REELING",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },

        targeting: "square",
        stats: {
            range: 3,
            accuracy: 1.5,
            crit: 0.8,
            amt: 3,
            status: {
                stun: {
                    name: 'stun',
                    length: 1
                }
            }
        },
        
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                critStatus: this.stats.status.stun,
                hitExec: ({target})=>{ // has a knockback in combat-scene
                    if(env?.rpg?.is2D) {
                        if(target.piece && user.piece) target.piece.knockback({
                            direction: user?.piece?.tile.getRelativeDirection(target?.piece?.tile), 
                            strength: 6
                        })
                    }
                }
            })
        },
    },

    special_vekoa_rush: {
        slug: "special_vekoa_rush",
        name: "Rush",
        type: 'special+autohit',
        anim: "heal",
        beneficial: true,

        usage: {
            act: "%USER LOOKS FOR AN OPENING"
        },

        details: {
            flavor: "'move quickly';'overexert cognitive facilities';'consider all immediate possibilities'",
            onUse: `'[STATUS::hyperfocus]';'move to target location';'select current tile to avoid movement'`
        },

        stats: {
            status: {
                hyperfocus: {
                    name: 'hyperfocus',
                    length: 1
                },        
            }
        },

        //since enemies don't really have logic for movement actions yet, we fake it
        //vekoa picks a safe tile within 3 squares, or one near akizet if she's in range
        //vekoa has bonus range since she doesn't move before casting this
        exec: function(user, target) {
            if(!user?.piece?.tile) return;

            var tiles = env.rpg.grid.markTiles({
                originTile: user.piece.tile,
                size: 3,
                includesOrigin: true,
                onTileCheck: ({ tile, validity }) => {
                    if(tile.hasEffect("eyebeam") || tile.hasEffect("scene_edge")) return false
                    return validity
                }
            })

            var favoredTile
            var akiTile = tiles.find(t => t?.piece?.actor?.slug == "akizet")
            var akiTiles

            if(akiTile) {
                akiTiles = env.rpg.grid.markTiles({
                    originTile: akiTile,
                    size: 1,
                    includesOrigin: false,
                    onTileCheck: ({ tile, validity }) => {
                        if (tile.hasEffect("eyebeam") || tile.hasEffect("scene_edge")) return false
                        return validity
                    }
                })

                if(akiTiles.length) favoredTile = akiTiles.sample()
            }
        
            if(!favoredTile && tiles.length) favoredTile = tiles.sample()
            
            if(favoredTile) {
                user.piece.teleportToTile(favoredTile, {follow: true})
            }            

            play('scarydoia', 1)
            addStatus({target: user, status: this.stats.status.hyperfocus.name, length: this.stats.status.hyperfocus.length, noReact: true}); 

            setTimeout(()=>advanceTurn(), env.ADVANCE_RATE * 1.5)
        },

        disableIf: (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" },
        avoidChaining: true,
    },

    tele_vekoa_rampage: {
        slug: "tele_vekoa_rampage", 
        name: "Last Invitation",
        type: 'target',
        anim: "basic-attack",
        autohit: true,
        range: 6,
        usage: {
            act: "%USER PREPARES TO CHARGE AT %TARGET",
        },

        exec: function(user, target) {
            if(!user.piece || !target.piece) return;
            user.charging = true

            let startTiles = env.rpg.grid.markTiles({
                originTile: user.piece.tile,
                shape: "square",
                size: 3,
                onTileCheck: ({tile, validity}) => {
                if(tile.classList.contains("damagetile") || tile.classList.contains("nevertile") || tile.piece) return false;
                    return validity
                }
            })
            
            user.piece.teleportToTile(startTiles.sample(), {follow: true})

            user.selfMark = env.rpg.grid.createTileEffect({
                tiles: env.rpg.grid.markTiles({
                    originTile: user?.piece?.tile,
                    size: 1,
                    shape: "plus",
                    ignoresLOS: true,
                    ignoresObstacles: true,
                }), 
                effect: "charge_warn",
                telegraphAnim: "charge",
                telegraphExec: (telEffect) => {
                    env.rpg.effectMessage.action({
                        user: user,
                        target: target,
                        action: `%USER charges towards %TARGET!`,
                    })

                    user.charging = false

                    user.charge = env.rpg.grid.createTileEffect({
                        tiles: telEffect.tiles, 
                        effect: "charge_active",
                        anchorType: "origin",
                        origin: user
                    })
                },
                anchorType: "origin",
                origin: user,
                length: 1
            })

            user.targetMark = env.rpg.grid.createTileEffect({
                tiles: env.rpg.grid.markTiles({
                    originTile: target?.piece?.tile,
                    size: 0,
                    includesOrigin: true
                }), 
                effect: "charge_target",
                origin: user,
                length: 2
            })

            return null
        },

        enemyUsageIf: (actor) => { return actor.originalSlug != "vekoa_1v1" || env.rpg.lastActor == actor },
    },
}

// TODO: update all readoutAdds with minordetail classes to use this when we do our action pass

if(typeof env.STATUS_EFFECTS == "undefined") env.STATUS_EFFECTS = {
    puncture: { 
        slug: "puncture",
        name: "Puncture",
        help: "-10% hp/turn (min:1)",
        removes: ["regen"],
        opposite: "regen",
        events: {
            /* greetings modder (??!)
                this object gets a "status" property when added to an actor
                it can be used to reference the instance of the status affecting the actor
                (i.e. this.status.affecting to refer to the actor it's on)

                btw it HAS to be an explicit function(), can't be lambda
            */
            onTurn: function() {
                //deals either 10% of their remaining HP, or 1 damage (whichever's higher)
                //console.log('target is', this.status.affecting, 'so executing', this.status)
                reactDialogue(this.status.affecting, 'puncture');

                let amt = 
                    (
                        (hasStatus(this.status.affecting, "malware_drill") ? 2 : 1) *
                        (Math.floor(this.status.affecting.hp * 0.1) || 1)
                    ) + (hasStatus(this.status.affecting, "global_escalation") ? env.crittaMap.getModQty("global_escalation") || 0 : 0)

                combatHit(this.status.affecting, {amt: amt, autohit: true, redirectable: false, runEvents: false});
                play('status', 1, 0.5);
            },
        }
    },

    rot: {
        slug: "rot",
        name: "Rot",
        help: "-(T:ROT)% HP/turn (min:1), max: 90%HP\nI.E. 4T:ROT = -4% HP",
        events: {
            onTurn: function() {
                let percentage = Math.min(this.status.duration, 90) * 0.01
                let amt = Math.max(Math.floor(percentage * this.status.affecting.hp), 1 + (hasStatus(this.status.affecting, "global_escalation") ? env.crittaMap.getModQty("global_escalation") || 0 : 0))
                console.log(percentage, "rotting for", amt)
                reactDialogue(this.status.affecting, 'puncture');
                combatHit(this.status.affecting, {amt, autohit: true, redirectable: false, runEvents: false});
                play('status', 0.75, 0.5);
            },
        }
    },

    regen: { 
        slug: "regen",
        name: "Regen",
        help: "+1 HP/turn",
        removes: ["puncture"],
        opposite: "puncture",
        beneficial: true,
        events: {
            onTurn: function() {
                combatHit(this.status.affecting, {amt: -1, beneficial: true, type: "hp", autohit: true});
                reactDialogue(this.status.affecting, 'regen');
                play('mend');
            },
        }
    },

    repairs: { 
        slug: "repairs",
        name: "Repairs",
        help: "+1 HP/turn while BP > 0, prevents puncture, removed upon barrier loss",
        infinite: true,
        beneficial: true,
        opposite: "million_teeth",
        removes: ["million_teeth", "puncture"],
        events: {
            onCreated: function({statusObj}) {
                if(statusObj.slug == this.status.slug) {
                    removeStatus(this.status.affecting, "puncture")
                    combatHit(this.status.affecting, {amt: -1, beneficial: true})
                }
            },

            onBeforeAddStatus: function(context) {
                if(context.status == "puncture") context.noAdd = true
            },
            
            onTurn: function() {
                if(this.status.affecting.bp > 0) {
                    combatHit(this.status.affecting, {amt: -1, beneficial: true});
                    reactDialogue(this.status.affecting, 'regen');
                    play('mend');
                } else {
                    console.log('removing repairs', this.status.affecting.bp)
                    removeStatus(this.status.affecting, "repairs")
                }
            },

            onCombatHit: function() {
                //console.log('in repair damage', this.status.affecting.bp)
                if(this.status.affecting.bp <= 0) {
                    console.log('removing repairs')
                    removeStatus(this.status.affecting, "repairs")
                }
            },
        }
    },

    million_teeth: { 
        slug: "million_teeth",
        name: "Million Teeth",
        help: "+2T:PUNCTURE/turn while BP > 0, removed upon barrier loss",
        infinite: true,
        opposite: "repairs",
        removes: ["repairs"], 
        advancedStatus: true, // used only in side content
        events: {
            onTurn: function() {
                if(this.status.affecting.bp > 0) {
                    addStatus({target: this.status.affecting, origin: false, status: "puncture", length: 2}); 
                    play('talkfairy', 1);
                } else {
                    removeStatus(this.status.affecting, "million_teeth")
                }
            },

            onCombatHit: function() {
                if(this.status.affecting.bp <= 0) {
                    removeStatus(this.status.affecting, "million_teeth")
                }
            },
        }
    },

    destabilized: { 
        slug: "destabilized",
        name: "Destabilized",
        incomingMult: 1,
        outgoingMult: 1,
        beneficial: true,
        tickType: "onTurnEnd",
        events: {
            onTurn: function() { reactDialogue(this.status.affecting, 'destabilized') },
        },

        help: "+100% incoming/outgoing damage/heal",
    },

    vulnerable: { 
        slug: "vulnerable",
        name: "Vulnerable",
        incomingToHit: 1,
        incomingCrit: 2,
        events: {
            onTurn: function() { reactDialogue(this.status.affecting, 'vulnerable') },
        },
        help: "+100% IN:HIT%, +200% IN:CRIT%",
        removes: ["evasion"],
        opposite: "evasion"
    },

    critical_flaw: { 
        slug: "critical_flaw",
        name: "Critical Flaw",
        help: "when struck with a crit, also lose 10% of current HP (min:1), removed upon vulnerable loss",
        infinite: true,
        events: {
            onBeforeCombatHit: function() {
                if(!hasStatus(this.status.affecting, "vulnerable")) {
                    removeStatus(this.status.affecting, "critical_flaw")
                }
            },

            onCritStruck: function({subject, attack, beneficial}) {
                if(beneficial) return;

                let dmg = (Math.floor(this.status.affecting.hp * 0.1) || 1)
                reactDialogue(this.status.affecting, 'puncture');
                combatHit(this.status.affecting, {amt: dmg, autohit: true, redirectable: false, runEvents: false})
            
                sendFloater({
                    target: this.status.affecting,
                    type: "arbitrary",
                    arbitraryString: "CRITICAL FLAW!",
                    beneficial: false,
                    size: 1.5,
                })

                readoutAdd({
                    message: `${this.status.affecting.name} takes ${dmg} extra critical damage! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                    name: "sourceless", 
                    type: "sourceless combat minordetail",
                    show: false,
                    sfx: false
                })    
            },

            onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "vulnerable") removeStatus(this.status.affecting, "critical_flaw")
            },
        }
    },

    focused: { 
        slug: "focused",
        name: "Focused",
        outgoingToHit: 1,
        outgoingCrit: 4,
        beneficial: true,
        tickType: "onTurnEnd",
        events: {
            onTurn: function() { reactDialogue(this.status.affecting, 'focused') },
        },
        help: `+100% HIT%, +400% CRIT%`,
        removes: ["weakened", "fear"],
        opposite: "fear"
    },

    weakened: {
        slug: "weakened",
        name: "Weakened",
        outgoingMult: -0.5,
        outgoingCrit: -1,
        help: "-50% outgoing damage, -100% CRIT%",
        removes: ["empowered"],
        opposite: "empowered",
        tickType: "onTurnEnd",
    },

    empowered: {
        slug: "empowered",
        name: "Empowered",
        outgoingFlat: 1,
        help: "+1 base outgoing damage/heal",
        removes: ["weakened"],
        opposite: "weakened",
        tickType: "onTurnEnd",
        beneficial: true
    },

    carapace: {
        slug: "carapace",
        name: "Carapace",
        incomingFlat: -1,
        beneficial: true,
        help: "-1 base incoming damage",
        opposite: "open_wound",
        removes: ["open_wound"],
        tickType: "onTurnEnd",
    },

    open_wound: {
        slug: "open_wound",
        name: "Open Wound",
        incomingFlat: 1,
        help: "+1 base incoming damage",
        opposite: "carapace",
        removes: ["carapace"],
        advancedStatus: true, // used only in side content
        tickType: "onTurnEnd",
    },

    evasion: { 
        slug: "evasion",
        name: "Evasion",
        incomingToHit: -0.75,
        incomingCrit: -0.75,
        beneficial: true,
        help: "-75% IN:HIT% & IN:CRIT%",
        removes: ["vulnerable"],
        opposite: "vulnerable",
        tickType: "onTurnEnd",
    },

    stun: { 
        slug: "stun",
        name: "Stun",
        substitute: 'vulnerable',
        skipTurn: true,
        
        events: {
            onTurn: function() { reactDialogue(this.status.affecting, 'stun') },
        },

        help: "skip turn",
        removes: ["windup"]
    },

    immobile: {
        slug: "immobile",
        name: "Immobile",
        skipTurn: true,
        infinite: true,
        persist: true,
        help: "skip turn"
    },

    immobile_hardskip: {
        slug: "immobile_hardskip",
        name: "Immobile",
        icon: "/img/sprites/combat/statuses/immobile.gif",
        skipTurn: true,
        hardSkip: true, // doesn't advance statuses, tile effects, etc. skips over in turn order completely
        infinite: true,
        persist: true,
        help: "skip turn"
    },

    invisible: {
        slug: "invisible",
        name: "Invisible",
        infinite: true,
        persist: true,
        help: "no actor panel, used for background entities mainly"
    },

    incoherent: { /* this is just for the CSS effect */
        slug: "incoherent",
        name: "Incoherent",
        help: "ignoring thoughtspace specifications",
        infinite: true
    },

    windup: { /* flag for enemies that use charge up moves, increases crit chance against them */
        slug: "windup",
        name: "Windup",
        help: "+100% incoming crit, preparing powerful action, interrupted by stun",
        beneficial: true,
        incomingCrit: 1,
        infinite: true,
        enableWindup: true,
    },

    fear: { /* prohibits the use of focus and some focus-like abilities. enemies also can't use heal abilities */
        slug: "fear",
        name: "Fear",
        tickType: "onTurnEnd",
        help: ()=> `paralyzed by terror,${env?.rpg?.is2D ? " -1 MOVE," : ''} some actions prohibited\nremoved by ally CRIT${env?.rpg?.is2D ? " or ENDURE action" : ''}`,
        removes: ["focused"],
        opposite: "focused",
        moveMod: -1,
        events: {
            GLOBAL_onCrit: function({subject, attack, originalEventTarget}) {
                if(originalEventTarget.team.name != this.status.affecting.team.name) return;
                removeStatus(this.status.affecting, 'fear')

                sendFloater({
                    target: this.status.affecting,
                    type: "arbitrary",
                    arbitraryString: "INSPIRED!",
                    size: 1,
                })

                env.rpg.effectMessage.action({
                    user: this.status.affecting,
                    target: originalEventTarget,
                    action: `%USER is emboldened by %TARGET's powerful strike`
                })
            }
        }
    },

    madness: { 
        slug: "madness",
        name: "Madness",
        help: "outgoing targeted actions have a 50% chance to be redirected to a random actor\nremoved upon fear loss",
        infinite: true,
        
        events: {
            onBeforeAction: function(context) {
                if(!hasStatus(this.status.affecting, "fear")) {
                    removeStatus(this.status.affecting, "madness")
                    return
                }

                if(!context.settings.action.type.includes("target")) return;
                
                // alter target maybe
                if(Math.random() < 0.5) {
                    //select from whole turnorder
                    let subject = context.user
                    let oldTarget = context.settings.target
                    let newTarget = env.rpg.turnOrder.filter(actor=>actor.state != "dead" && actor.state != "lastStand" && actor.slug != oldTarget.slug)
                    if(newTarget.length) {
                        newTarget = newTarget.sample()
                    } else return;

                    console.log("old target was", context.settings.target, "new target is", newTarget)

                    context.settings.target = newTarget

                    sendFloater({
                        target: subject,
                        type: "arbitrary",
                        arbitraryString: "MADNESS!",
                        beneficial: false,
                        size: 2,
                    })

                    readoutAdd({
                        message: `${subject.name}'s action upon ${oldTarget.name} is turned to ${newTarget.name}! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail",
                        show: false,
                        sfx: false
                    })
                }
            },

            onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "fear") removeStatus(this.status.affecting, "madness")
            },
        }
    },

    spikes: {
        slug: "spikes",
        name: "Spikes",
        help: "return 50% incoming damage to attacker (min:1)",
        beneficial: true,
        opposite: "siphon",
        removes: ["siphon"],
        events: {
            onStruck: function({subject, attack, beneficial}) { 
                if(beneficial) return;
                let fated = this.status.affecting.statusEffects.find(status => status.slug == "fated_bone")
                let returnDmg = Math.max(Math.floor(attack * 0.5), fated ? fated.power + 1 : 1)

                setTimeout(()=>{
                    sendFloater({
                        target: subject,
                        type: "arbitrary",
                        arbitraryString: "SPIKED!",
                        beneficial: false,
                        size: 1,
                    })

                    readoutAdd({
                        message: `${subject.name} receives ${Math.abs(returnDmg)} damage via <span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail",
                        show: false,
                        sfx: false
                    })

                    forcePlay("stab", 0.7, 0.8)
                    combatHit(subject, {amt: returnDmg, autohit: true, crit: 0, origin: false, redirectable: false})
                }, env.ADVANCE_RATE * 0.2)
            },
        }
    },

    siphon: {
        slug: "siphon",
        name: "siphon",
        help: "attacker receives +1HP +1T:REGEN",
        opposite: "spikes",
        removes: ["spikes"],
        events: {
            onStruck: function({subject, attack}) {
                if(subject.state == "dead") return;

                let amt = -1 - (hasStatus(this.status.affecting, "global_escalation") ? env.crittaMap.getModQty("global_escalation") || 0 : 0)
            
                sendFloater({
                    target: subject,
                    type: "arbitrary",
                    arbitraryString: "SIPHON!",
                })
                
                readoutAdd({
                    message: `${subject.name} receives +${amt} HP +1T:REGEN via <span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>`, 
                    name: "sourceless", 
                    type: "sourceless combat minordetail",
                    show: false,
                    sfx: false
                })

                addStatus({target: subject, origin: false, status: "regen", length: 1, noReact: true}); 
                combatHit(subject, {amt, autohit: true, crit: 0, origin: false, beneficial: true})
            },
        }
    },

    redirection: {
        slug: "redirection",
        name: "Redirection",
        help: ()=> `[[ORIGIN]] intercepting incoming attacks${env?.rpg?.is2D ? ", +KB resistance" : ''}`,
        beneficial: true,
        redirectToOrigin: true,
        delayFirstTickForActorsOnTheRight: true,
        knockmod: -999
    },

    redirector: { /* for EP4 only */
        slug: "redirector",
        name: "Redirector",
        help: ()=> `intercepting nearby attacks${env?.rpg?.is2D ? ", +KB resistance" : ''}`,
        beneficial: true,
        knockmod: -999,
        events: {
            onDeath: function() {
                env.rpg.grid.deleteTileEffect(this.status.tileEffect)
            }
        }
    },

    conjoined: {
        slug: "conjoined",
        name: "Conjoined",
        help: "share HP with all other conjoined entities",
        infinite: true,
        beneficial: true,
        events: {
            onCombatHit: function() {
                if(!this.status.affecting.hp || this.status.affecting.hp == NaN) this.status.affecting.hp = 0;

                let conjoined = env.rpg.turnOrder.filter(actor=>hasStatus(actor, "conjoined"))
                conjoined.forEach(actor => {
                    actor.hp = this.status.affecting.hp
                })

                updateStats({actors: conjoined})
            },
        }
    },

    conjoined_baseslug: { //like above, but targets based on enemy slug. to easily support multiple sets of similar conjoined crittas
        slug: "conjoined_baseslug",
        name: "Conjoined",
        help: "share HP with all similar entities",
        infinite: true,
        beneficial: true,
        icon: "/img/sprites/combat/statuses/conjoined.gif",
        events: {
            onCombatHit: function() {
                if(!this.status.affecting.hp || this.status.affecting.hp == NaN) this.status.affecting.hp = 0;

                let conjoined = this.status.affecting.team.members.filter(actor=>actor.originalSlug == this.status.affecting.originalSlug)
                conjoined.forEach(actor => {
                    actor.hp = this.status.affecting.hp
                })

                updateStats({actors: conjoined})
            },
        }
    },

    ethereal: {
        slug: "ethereal",
        name: "Ethereal",
        help: "disappear on death",
        icon: "/img/sprites/combat/statuses/ethereal.gif",
        passive: true,
        infinite: true,
        events: {
            onCreated: function({statusObj}) {
                if(env.rpg.is2D) if(statusObj.slug == "ethereal" && !this.status.initialized) {
                    this.status.initialized = true
                    setTimeout(()=>this.status.affecting.piece.classList.add("etherealpiece"), 100)
                }
            },

            onDeath: function() {
                midCombatActorRemove(this.status.affecting)
            },
        }
    },

    ethereal_passive: { // quiet/hidden version
        slug: "ethereal",
        name: "Ethereal",
        help: "disappear on death",
        infinite: true,
        passive: true,
        silent: true,
        events: {
            onCreated: function({statusObj}) {
                if(env.rpg.is2D) if(statusObj.slug == "ethereal" && !this.status.initialized) {
                    this.status.initialized = true
                    setTimeout(()=>this.status.affecting.piece.classList.add("etherealpiece"), 100)
                }
            },

            onDeath: function() {
                midCombatActorRemove(this.status.affecting)
            },
        }
    },

    untargetable: {
        slug: "untargetable",
        name: "Untargetable",
        help: "cannot directly attack, seek other means",
        infinite: true,
        untargetable: true
    },

    /* additions for EP3ADD2 */
    sacrifice: { 
        slug: "sacrifice",
        name: "Sacrifice",
        outgoingToHit: 2,
        outgoingCrit: 2,
        outgoingFlat: 2,
        beneficial: true,
        infinite: true,
        events: {
            onTurn: function() { reactDialogue(this.status.affecting, 'sacrifice') },

            onAction: function({user, action, target}) {
                removeStatus(this.status.affecting, "sacrifice")
            },
        },
        help: "+2 base outgoing damage/heal, +200% HIT% & CRIT%, consumed by next action"
    },

    surge: { 
        slug: "surge",
        name: "Surge",
        beneficial: true,
        infinite: true,
        events: {
            onTurn: function() { 
                reactDialogue(this.status.affecting, 'surge') 
                delete this.status.justGotSurge
            },
            
            onAction: function({user, action, target, beingUsedAsync}) {
                if(action.noRepeat || this.status.justGotSurge || beingUsedAsync || ["incoherent_", "steer", "floor", "windup", "intrusive"].some(slugpart => action.slug.includes(slugpart))) return;
                
                setTimeout(()=>{
            
                    sendFloater({
                        target: user,
                        type: "arbitrary",
                        arbitraryString: "SURGE!",
                    })

                    readoutAdd({
                        message: `${user.name} acts again! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })

                    useAction(user, action, target, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "surge"})
                }, 500)

                //only do it this way in 1d combat
                if(!env.rpg.is2D) {
                    removeStatus(this.status.affecting, "surge")
                } else {
                    this.status.usedAction = true
                }
            },

            onTurnEnd: function() {
                //this way AOE actions can be surged
                if(env.rpg.is2D && this.status.usedAction) removeStatus(this.status.affecting, "surge")
            },

            onCreated: function({statusObj}) {
                if(statusObj.slug == this.status.slug) this.status.justGotSurge = true
            },
        },
        help: "use next active action twice"
    },

    wild_surge: { 
        slug: "wild_surge",
        name: "Wild Surge",
        beneficial: true,
        infinite: true,
        events: {
            onTurn: function() { 
                reactDialogue(this.status.affecting, 'surge') 
                delete this.status.justGotSurge
            },
            
            onAction: function({user, action, target, beingUsedAsync}) {
                if(
                    this.status.justGotSurge || 
                    beingUsedAsync || 
                    ["incoherent_", "steer", "floor", "windup", "intrusive"].some(slugpart => action.slug.includes(slugpart)) ||
                    !action.type.includes("target") ||
                    (!action.beneficial && target.team.name == "ally") ||
                    (action.beneficial && target.team.name == "enemy")
                ) return;

                setTimeout(()=>{
            
                    sendFloater({
                        target: user,
                        type: "arbitrary",
                        arbitraryString: "WILD SURGE!",
                        size: 1.5,
                    })

                    readoutAdd({
                        message: `${user.name} overexerts themselves to act again and again! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })

                    env.GENERIC_ACTIONS.teamWave({
                        team: target.team,
                        exec: (actor, i) => {
                            if(actor == target) return; // we skip the original target
                            useAction(user, action, actor, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "wild surge"})
                        }
                    })
                    
                }, 500)

                removeStatus(this.status.affecting, "wild_surge")
                if(!hasStatus(this.status.affecting, "fish_solo")) addStatus({target: this.status.affecting, origin: this.status.affecting, status: "stun", length: 1})
            },

            onCreated: function({statusObj}) {
                if(statusObj.slug == this.status.slug) this.status.justGotSurge = true
            },
        },
        help: "on next active targeted action, gain 1T:STUN, and use across the entire target team\nif beneficial, action used on all allies\nif offensive, action used on all foes"
    },

    /* passives - special statuses that don't run out and are shown separately */
    attack_drone: { 
        slug: "attack_drone",
        name: "Attack Drone",
        passive: true,
        beneficial: true,
        impulse: {type: "common", component: "eyes"},
        icon: "/img/sprites/combat/augs/drone.gif",
        
        events: {
            onTurn: function() {
                let user = this.status.affecting
                let shownNotice = false
                env.recentSfx = false

                env.GENERIC_ACTIONS.teamWave({
                    team: user.enemyTeam,
                    exec: (actor, i) => {
                        if(hasStatus(actor, "vulnerable")) {
                            env.GENERIC_ACTIONS.singleTarget({
                                action: env.ACTIONS['drone_strike'], 
                                user, 
                                target: actor,
                                hitSfx: { name: 'dull', rate: 1.5, volume: 0.5 },
                                critSfx: { name: 'dull', rate: 1.5, volume: 0.5 },
                                genExec: ()=>{
                                    if(!shownNotice) {
                                        sendFloater({
                                            target: user,
                                            type: "arbitrary",
                                            arbitraryString: "DRONE STRIKE!",
                                        })

                                        readoutAdd({
                                            message: `${user.name}'s <span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span> pierces all vulnerable foes`, 
                                            name: "sourceless", 
                                            type: "sourceless combat minordetail", 
                                            show: false,
                                            sfx: false
                                        })

                                        shownNotice = true
                                    }
                                }
                            })
                        }
                    }
                })
            },
        },

        help: `if alive, attack all vulnerable foes on turn for -1HP 10%CRT`
    },

    retaliation: { 
        slug: "retaliation",
        name: "ACTION::Retaliate",
        passive: true,
        beneficial: true,
        impulse: {type: "action", component: "bone",},
        icon: "/img/sprites/combat/passives/retaliation.gif",
        
        events: {
            //in evades, the 'subject' is the origin of the attack
            GLOBAL_onEvade: function({subject, target, attack, originalEventTarget}) {
                let user = this.status.affecting
                if(
                    !user.enemyTeam.members.includes(subject) || 
                    subject.state == "dead" ||
                    user.state == "dead" ||
                    target == user ||
                    hasStatus(user, "fear")
                ) return;

                let primary = env.ACTIONS[user.actions[0]]

                setTimeout(()=>{
                    useAction(this.status.affecting, primary, subject, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "retaliation"})
            
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        specialClass: "action",
                        arbitraryString: `RETALIATE::${primary.name.toUpperCase()}`,
                        size: 1.5,
                    })

                    readoutAdd({
                        message: `${user.name} retaliates against ${subject.name} as they miss! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
        },

        help: `if alive, on ally evade, retaliate against attacker with primary (1st) action`
    },

    ichor_last_stand: { 
        slug: "ichor_last_stand",
        name: "ACTION::Last Stand",
        passive: true,
        beneficial: true,
        impulse: {type: "action", component: "ichor", },
        icon: "/img/sprites/combat/passives/ichor_last_stand.gif",
        
        events: {
            //in evades, the 'subject' is the origin of the attack
            GLOBAL_onDeath: function({originalEventTarget}) {
                let subject = originalEventTarget
                let user = this.status.affecting

                if(
                    user.state == "dead" ||
                    user == subject || 
                    user.team.name != subject.team.name || 
                    subject.state != "dead"
                ) return;

                if(!subject.revivedByIchor) subject.revivedByIchor = {}
                if(subject.revivedByIchor[user.slug]) return;
                subject.revivedByIchor[user.slug] = true

                //temp set ahead of the actual action in order to stop combat from ending, also other instances from triggering
                subject.state = "living"

                setTimeout(()=>{
                    subject.hp = 0.1 // hack to avoid extra updatestats
                    useAction(user, env.ACTIONS.ichor_passive_restore, subject, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "ichor"})

                    setTimeout(()=>{
                        if(subject.hp != 0) combatRevive(subject)
                    }, 310)
            
                    sendFloater({
                        target: subject,
                        type: "arbitrary",
                        specialClass: "action",
                        arbitraryString: "LAST STAND!",
                        size: 1.5,
                    })
                
                    readoutAdd({
                        message: `${user.name} inspires ${subject.name} to keep going! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
        },

        help: `on ally down, automatically revive them once per combat with 1HP and 5BP.`
    },

    impatient: { 
        slug: "impatient",
        name: "ACTION::Impatient",
        passive: true,
        beneficial: true,
        impulse: {type: "action", component: "claws", },
        icon: "/img/sprites/combat/passives/impatient.gif",
        
        events: {
            GLOBAL_onBeforeAction: function({user, reason, beingUsedAsync, action}) { 
                if(user != this.status.affecting && (user.team.name == this.status.affecting.team.name) && !reason && !beingUsedAsync) {
                    this.status.turnUsage = false 
                }
            },
            GLOBAL_onAction: function({target, user, hit, action, beingUsedAsync, reason, originalEventTarget}) {
                if(
                    hit != "crit" ||
                    this.status.affecting.state == "dead" || 
                    user == this.status.affecting || 
                    originalEventTarget == this.status.affecting ||
                    this.status.affecting.enemyTeam.members.includes(user) || 
                    this.status.affecting.team.members.includes(target) || 
                    target.state == "dead" ||
                    reason != false ||
                    this.status.turnUsage ||
                    hasStatus(user, "fear")
                ) return;

                this.status.turnUsage = true
                let primary = env.ACTIONS[this.status.affecting.actions[0]]

                setTimeout(()=>{
                    useAction(this.status.affecting, primary, target, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "impatient"})
            
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        specialClass: "action",
                        arbitraryString: `IMPATIENT::${primary.name.toUpperCase()}`,
                        size: 1.5,
                    })
                
                    readoutAdd({
                        message: `${this.status.affecting.name} joins in ${user.name}'s attack on ${target.name}! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.5)
            }
        },

        help: `when another ally critically strikes a foe, use primary on that foe`
    },

    active_support: { 
        slug: "active_support",
        name: "ACTION::Active Support",
        passive: true,
        beneficial: true,
        impulse: {type: "action", component: "eyes", },
        icon: "/img/sprites/combat/passives/active_support.gif",
        
        events: {
            GLOBAL_onBeforeAction: function({user, reason, beingUsedAsync, action}) { 
                if(user != this.status.affecting && (user.team.name == this.status.affecting.team.name) && !reason && !beingUsedAsync) {
                    this.status.turnUsage = false 
                }
            },
            GLOBAL_onAction: function({target, user, hit, reason, action, beingUsedAsync, originalEventTarget}) {
                if(
                    hit != "crit" ||
                    this.status.affecting.state == "dead" || 
                    user == this.status.affecting || 
                    originalEventTarget == this.status.affecting ||
                    this.status.affecting.enemyTeam.members.includes(user) || 
                    this.status.affecting.team.members.includes(target) || 
                    target.state == "dead" ||
                    this.status.turnUsage ||
                    !this.status.affecting.actions[1] ||
                    hasStatus(user, "fear")
                ) return;

                this.status.turnUsage = true
                let secondary = env.ACTIONS[this.status.affecting.actions[1]]

                setTimeout(()=>{
                    useAction(this.status.affecting, secondary, secondary.beneficial ? user : target, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "support"})

                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        specialClass: "action",
                        arbitraryString: `SUPPORT::${secondary.name.toUpperCase()}`,
                        size: 1.5,
                    })
                
                    readoutAdd({
                        message: `${this.status.affecting.name} provides support alongside ${user.name}'s attack on ${target.name}! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail",
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.5)
            }
        },

        help: `if alive, when an ally crits a foe, use secondary\nif secondary is beneficial, used on ally\nif secondary is offensive, used on foe`
    },

    visionary: { 
        slug: "visionary",
        name: "ACTION::Visionary",
        passive: true,
        beneficial: true,
        impulse: {type: "action", component: "light", },
        icon: "/img/sprites/combat/passives/visionary.gif",
        
        events: {
            onCrit: function({subject, origin, attack, beneficial}) {
                let user = this.status.affecting
                if(beneficial || user.team.members.includes(subject) || user.state == "dead" || !user.actions[2] || hasStatus(user, "fear")) return;

                let utility = env.ACTIONS[user.actions[2]]
                
                setTimeout(()=>{
                    sendFloater({
                        target: user,
                        type: "arbitrary",
                        specialClass: "action",
                        arbitraryString: `VISIONARY::${utility.name}`,
                        size: 1.5,
                    })

                    readoutAdd({
                        message: `${user.name} grasps the opportunity! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                    
                    useAction(user, utility, user, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "visionary", force: true})
                }, 500)
            }
        },

        help: `when critting a foe, use utility`
    },

    visionary_geli: { 
        slug: "visionary_geli",
        name: "Visionary (Sniper)",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/visionary_geli.gif",
        
        events: {
            onCrit: function({subject, origin, attack, beneficial}) {
                let user = this.status.affecting
                console.log('visionary', subject, origin, attack, beneficial, '\n', beneficial, user.team.members.includes(subject), user.state == "dead")
                if(beneficial || user.team.members.includes(subject) || user.state == "dead") return;
                
                setTimeout(()=>{
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        specialClass: "action",
                        arbitraryString: "VISIONARY::AIM",
                        size: 1.5,
                    })

                    readoutAdd({
                        message: `${user.name} stays focused! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                    
                    useAction(user, env.ACTIONS[user.actions[1]], user, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "visionary", force: true})
                }, 500)
            }
        },

        help: `when critting a foe, use utility action`
    },

    spotter: { 
        slug: "spotter",
        name: "Spotter",
        passive: true,
        beneficial: true,
        impulse: {type: "common", component: "eyes"},
        icon: "/img/sprites/combat/passives/eyes_spotter.gif",
        
        events: {
            GLOBAL_onEvade: function({subject, target, attack, runEvents, originalEventTarget}) {
                let user = this.status.affecting
                if(
                    user.team.members.includes(target) || 
                    target.state == "dead" ||
                    user.state == "dead" ||
                    subject == user
                ) return;

                setTimeout(()=>{
                    addStatus({target, origin: user, status: "vulnerable", length: 2}); 
            
                    sendFloater({
                        target: user,
                        type: "arbitrary",
                        arbitraryString: "SPOTTER!",
                    })
                
                    readoutAdd({
                        message: `${user.name} spots a vulnerability in ${target.name}! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
        },

        help: `if alive, when an ally misses a foe, +2T:VULNERABLE on that foe`
    },

    claws_chitin: { 
        slug: "claws_chitin",
        name: "Chitin Deformation",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/chitin.gif",
        impulse: {type: "common", component: "claws"},
        
        events: {
            onHit: function({subject, origin, attack, beneficial}) {
                if(beneficial || origin.team.members.includes(subject) || origin.state == "dead" || subject.state == "dead") return;
                addStatus({target: subject, origin, status: "puncture", length: 1}); 

                setTimeout(()=>{
                    play("stab", 0.5, 0.5)
                    
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        arbitraryString: "DEFORMATION!",
                    })
                                    
                    readoutAdd({
                        message: `${this.status.affecting.name}'s strike leaves an extra wound! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail",
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
        },

        help: `when hitting a foe, inflict 1T:PUNCTURE`
    },

    eyes_dancer: { 
        slug: "eyes_dancer",
        name: "Dancer",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/dancer.gif",
        impulse: {type: "common", component: "eyes"},
        
        events: {
            onEvade: function({subject, attack, target, beneficial}) {
                if(beneficial || this.status.affecting.state == "dead") return;
                addStatus({target: this.status.affecting, origin: this.status.affecting, status: "evasion", length: 1}); 

                setTimeout(()=>{
                    play("talklaugh", 1.25, 0.5)
                    
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        arbitraryString: "DANCE!",
                    })
                                    
                    readoutAdd({
                        message: `${this.status.affecting.name} finds a rhythm in the attack! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail",
                        show: false, 
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
        },

        help: `when evading an offensive strike, gain 1T:EVASION`
    },

    ichor_finisher: {
        slug: "ichor_finisher",
        name: "Finisher",
        passive: true,
        beneficial: true,
        impulse: {type: "common", component: "ichor"},
        icon: "/img/sprites/combat/passives/ichor_finisher.gif",
        
        events: {
            GLOBAL_onDeath: function({originalEventTarget}) {
                if(
                    this.status.affecting.state == "dead" ||
                    this.status.affecting.team.name == originalEventTarget.team.name
                ) return;
                    
                sendFloater({
                    target: this.status.affecting,
                    type: "arbitrary",
                    arbitraryString: "FINISHER!",
                })
                                
                readoutAdd({
                    message: `${this.status.affecting.name} is empowered! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                    name: "sourceless", 
                    type: "sourceless combat minordetail", 
                    show: false,
                    sfx: false
                })

                addStatus({target: this.status.affecting, origin: false, status: "empowered", length: 3})                
            }
        },

        help: `on foe down, receive +3T:EMPOWERED`
    },

    bone_adaptive: { 
        slug: "bone_adaptive",
        name: "Adaptive",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/adaptive.gif",
        impulse: {type: "common", component: "bone"},
        
        events: {
            onStruck: function({subject, attack, beneficial}) {
                if(beneficial || this.status.affecting.state == "dead") return;
                addStatus({target: this.status.affecting, origin: subject, status: "spikes", length: 2}); 

                setTimeout(()=>{
                    play("guard", 1.25, 0.5)
                    
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        arbitraryString: "ADAPT!",
                    })
                                    
                    readoutAdd({
                        message: `${this.status.affecting.name}'s form shifts defensively in response to the attack! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail",
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
        },

        help: `when struck offensively, gain 2T:SPIKES`
    },

    bone_shield: { 
        slug: "bone_shield",
        name: "Parii Shield",
        passive: true,
        beneficial: true,
        impulse: {type: "common", component: "bone"},
        icon: "/img/sprites/combat/passives/bone_barrier.gif",
        
        events: {
            GLOBAL_onDeath: function({originalEventTarget}) {
                if(
                    this.status.affecting.state == "dead" ||
                    this.status.affecting.team.name == originalEventTarget.team.name
                ) return;
                    
                sendFloater({
                    target: this.status.affecting,
                    type: "arbitrary",
                    arbitraryString: "PARII!",
                })
                                
                readoutAdd({
                    message: `${this.status.affecting.name} makes a shield of ${originalEventTarget.name}! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                    name: "sourceless", 
                    type: "sourceless combat minordetail",
                    show: false,
                    sfx: false
                })

                combatHit(this.status.affecting, {amt: 4, beneficial: true, type: "barrier", origin: this.status.affecting, runEvents: false, autohit: true});
            }
        },

        help: `on foe down, receive +4BP`
    },

    light_humorist: { 
        slug: "light_humorist",
        name: "Humorist",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/humorist.gif",
        impulse: {type: "common", component: "light"},
        
        events: {
            onHit: function({subject, origin, attack, beneficial}) {
                if(beneficial || origin.team.members.includes(subject)) return;
                reactDialogue(origin, "laugh")
            }
        },

        help: `when hitting a foe, laugh\nunknown additional effect`
    },

    light_veilkdrop: { 
        slug: "light_veilkdrop",
        name: "Veilkdrop",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/veilkdrop.gif",
        impulse: {type: "common", component: "light"},
        
        events: {
            onCrit: function({subject, origin, attack, beneficial}) {
                if(Math.random() < 0.25 || subject == this.status.affecting || beneficial || origin.team.members.includes(subject) || origin.state == "dead" || subject.state == "dead") return;
                addStatus({target: subject, origin, status: "stun", length: 1}); 
                
                setTimeout(()=>{
                    playCombatCrit()
                    
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        arbitraryString: "VEILKDROP!",
                    })
                                    
                    readoutAdd({
                        message: `${origin.name} leaves ${subject.name} reeling! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
        },

        help: `when critting a foe, 25% chance to inflict 1T:STUN`
    },

    fated_claws: {
        slug: "fated_claws",
        name: "FATED::Claws",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/fated_claws.gif",
        impulse: {
            type: "fated", 
            component: "claws",
            /*eligibility: (member)=> {
                if(!member.alterations) return true;
                if(member.alterations.some(alteration => (typeof alteration[1] == "string" ? alteration[1].includes("fated_") : false) && alteration[2] == "IMPULSE")) return false;
                else return true
            },*/
        },
        
        events: {
            onCreated: function({statusObj}) {
                if(statusObj.slug != this.status.slug) return;
                
                this.status.power = 0
                if(this.status.affecting?.member?.components) for (const [slotName, slotContents] of Object.entries(this.status.affecting.member.components)) {
                    if(slotContents == "claws") this.status.power++
                }

                if(this.status.affecting?.member?.augments) for (const augmentSlug of this.status.affecting.member.augments) {
                    let augment = env.ACTOR_AUGMENTS.generic[augmentSlug]
                    if(augment?.component) if(augment.component[1] == "claws") this.status.power += 2
                }

                this.status.outgoingFlatCrit = 0.0015;
            },

            onHit: function({subject, origin, attack, beneficial}) {
                if(!this.status.power || beneficial || origin.team.members.includes(subject) || origin.state == "dead" || subject.state == "dead") return;
                
                addStatus({target: subject, origin, status: "puncture", length: this.status.power})
                
                sendFloater({
                    target: this.status.affecting,
                    type: "arbitrary",
                    specialClass: "fate",
                    arbitraryString: "FATE::CLAWS",
                })
                
                setTimeout(()=>{
                    readoutAdd({
                        message: `${origin.name} inflicts ${subject.name} with additional puncture! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
        },

        help: `per humor of claws in this shell::\n+1T:PUNCTURE on all attacks\n+1.5% base crit% (before bonuses)`
    },

    fated_eyes: {
        slug: "fated_eyes",
        name: "FATED::Eyes",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/fated_eyes.gif",
        impulse: {
            type: "fated", 
            component: "eyes",
            /*eligibility: (member)=> {
                if(!member.alterations) return true;
                if(member.alterations.some(alteration => (typeof alteration[1] == "string" ? alteration[1].includes("fated_") : false) && alteration[2] == "IMPULSE")) return false;
                else return true
            },*/
        },
        
        events: {
            onCreated: function({statusObj}) {
                if(statusObj.slug != this.status.slug) return;
                
                this.status.power = 0
                if(this.status.affecting?.member?.components) for (const [slotName, slotContents] of Object.entries(this.status.affecting.member.components)) {
                    if(slotContents == "eyes") this.status.power++
                }

                if(this.status.affecting?.member?.augments) for (const augmentSlug of this.status.affecting.member.augments) {
                    let augment = env.ACTOR_AUGMENTS.generic[augmentSlug]
                    if(augment?.component) if(augment.component[1] == "eyes") this.status.power += 2
                }
            },

            onHit: function({subject, origin, attack, beneficial}) {
                if(!this.status.power || beneficial || origin.team.members.includes(subject) || origin.state == "dead" || subject.state == "dead") return;
                if(Math.random() > (0.1 * this.status.power)) return;
                
                addStatus({target: subject, origin, status: "vulnerable", length: 2})
                addStatus({target: subject, origin, status: "critical_flaw", length: 1})
                
                setTimeout(()=>{                
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        specialClass: "fate",
                        arbitraryString: "FATE::EYES",
                    })

                    readoutAdd({
                        message: `${origin.name} inflicts ${subject.name} with additional vulnerability! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail",
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            },

            GLOBAL_onAddStatus: function({target, statusObj, originalEventTarget}) {
                if(
                    statusObj.origin != this.status.affecting ||
                    statusObj.slug != "focused" ||
                    Math.random() > (0.1 * this.status.power)
                ) return;

                addStatus({target: originalEventTarget, origin: statusObj.origin, status: "empowered", length: 2})
                                
                sendFloater({
                    target: this.status.affecting,
                    type: "arbitrary",
                    specialClass: "fate",
                    arbitraryString: "FATE::EYES",
                })
                
                setTimeout(()=>{
                    readoutAdd({
                        message: `${statusObj.origin.name} empowers ${originalEventTarget.name}! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)                
            }
        },

        help: `per humor of eyes in this shell::\n+10% chance to give 2T:EMPOWERED when giving allies FOCUSED\n+10% chance on hit to inflict +2T:VULNERABLE and +CRITICAL FLAW`
    },

    fated_ichor: {
        slug: "fated_ichor",
        name: "FATED::Ichor",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/fated_ichor.gif",
        impulse: {
            type: "fated", 
            component: "ichor",
            /*eligibility: (member)=> {
                if(!member.alterations) return true;
                if(member.alterations.some(alteration => (typeof alteration[1] == "string" ? alteration[1].includes("fated_") : false) && alteration[2] == "IMPULSE")) return false;
                else return true
            },*/
        },
        
        events: {
            onCreated: function({statusObj}) {
                if(statusObj.slug != this.status.slug) return;
                
                this.status.power = 0
                if(this.status.affecting?.member?.components) for (const [slotName, slotContents] of Object.entries(this.status.affecting.member.components)) {
                    if(slotContents == "ichor") this.status.power++
                }

                if(this.status.affecting?.member?.augments) for (const augmentSlug of this.status.affecting.member.augments) {
                    let augment = env.ACTOR_AUGMENTS.generic[augmentSlug]
                    if(augment?.component) if(augment.component[1] == "ichor") this.status.power += 2
                }
            },

            GLOBAL_onCombatHit: function({subject, origin, attack, beneficial, originalEventTarget}) {
                if(
                    !this.status.power || 
                    !beneficial || 
                    !this.status.affecting.team.members.includes(originalEventTarget) || 
                    originalEventTarget.state == "dead" ||
                    attack >= 0
                ) return;

                combatHit(originalEventTarget, {amt: this.status.power, beneficial: true, type: "barrier", origin: this.status.affecting, runEvents: false});
                                
                setTimeout(()=>{                
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        specialClass: "fate",
                        arbitraryString: "FATE::ICHOR",
                    })

                    readoutAdd({
                        message: `${originalEventTarget.name} gains a barrier! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.affecting.name}'s ${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
        },

        help: `per humor of ichor in this shell::\nallies receive +1BP when healing from any source`
    },

    fated_bone: {
        slug: "fated_bone",
        name: "FATED::Bone",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/fated_bone.gif",
        impulse: {
            type: "fated", 
            component: "bone",
            /*eligibility: (member)=> {
                if(!member.alterations) return true;
                if(member.alterations.some(alteration => (typeof alteration[1] == "string" ? alteration[1].includes("fated_") : false) && alteration[2] == "IMPULSE")) return false;
                else return true
            },*/
        },
        
        events: {
            onCreated: function({statusObj}) {
                if(statusObj.slug != this.status.slug) return; 
                
                this.status.power = 0
                if(this.status.affecting?.member?.components) for (const [slotName, slotContents] of Object.entries(this.status.affecting.member.components)) {
                    if(slotContents == "bone") this.status.power++
                }

                if(this.status.affecting?.member?.augments) for (const augmentSlug of this.status.affecting.member.augments) {
                    let augment = env.ACTOR_AUGMENTS.generic[augmentSlug]
                    if(augment?.component) if(augment.component[1] == "bone") this.status.power += 2
                }
            },

            //on struck, the 'subject' is the origin of the attack
            onStruck: function({subject, target, attack, beneficial, originalEventTarget}) {
                let user = this.status.affecting

                if(
                    env.rpg.lastRedirector != user ||
                    beneficial ||
                    !user.enemyTeam.members.includes(subject) || 
                    user.state == "dead"
                ) return;

                let primary = env.ACTIONS[user.actions[0]]

                setTimeout(()=>{
                    useAction(this.status.affecting, primary, subject, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "bone-fated"})
                
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        specialClass: "fate",
                        arbitraryString: "FATE::BONE",
                    })
                
                    readoutAdd({
                        message: `${user.name} counterattacks ${subject.name} as they guard! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            },

            onAddStatus: function({target, statusObj}) {
                if(statusObj.slug != "spikes" || !this.status.power || statusObj.powerAdjusted) return; 
                statusObj.oldName = statusObj.name
                statusObj.name = statusObj.name + '+'.repeat(this.status.power)
                statusObj.help = processHelp(statusObj).replace("min:1", `min:${this.status.power + 1}`)
                statusObj.powerAdjusted = true

                updateStats({actor: this.status.affecting})
            },
        },

        help: `per humor of bone in this shell::\n+1 base SPIKES damage\n+10% chance to use primary action on attacker when receiving a redirected attack`
    },

    fated_light: {
        slug: "fated_light",
        name: "FATED::Light",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/fated_light.gif",
        impulse: {
            type: "fated", 
            component: "light",
            /*eligibility: (member)=> {
                if(!member.alterations) return true;
                if(member.alterations.some(alteration => (typeof alteration[1] == "string" ? alteration[1].includes("fated_") : false) && alteration[2] == "IMPULSE")) return false;
                else return true
            },*/
        },
        
        events: {
            onCreated: function({statusObj}) {
                if(statusObj.slug != this.status.slug) return;
                
                this.status.power = 0
                if(this.status.affecting?.member?.components) for (const [slotName, slotContents] of Object.entries(this.status.affecting.member.components)) {
                    if(slotContents == "light") this.status.power++
                }

                if(this.status.affecting?.member?.augments) for (const augmentSlug of this.status.affecting.member.augments) {
                    let augment = env.ACTOR_AUGMENTS.generic[augmentSlug]
                    if(augment?.component) if(augment.component[1] == "light") this.status.power += 2
                }
            },

            onHit: function({subject, origin, attack, beneficial}) {
                if(!this.status.power || beneficial || origin.team.members.includes(subject) || origin.state == "dead" || subject.state == "dead") return;
                if(Math.random() > (0.1 * this.status.power)) return;
                
                let rand = Math.random()
                let status
                if(rand < 0.3) {
                    addStatus({target: subject, origin, status: "destabilized", length: 2})
                    status = "destabilized"
                    
                } else if(rand < 0.6) {
                    addStatus({target: subject, origin, status: "fear", length: 2})
                    status = "fear"

                } else {
                    addStatus({target: subject, origin, status: "stun", length: 1})
                    status = "stun" 
                }
                
                setTimeout(()=>{
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        specialClass: "fate",
                        arbitraryString: "FATE::LIGHT",
                    })
                    
                    readoutAdd({
                        message: `${origin.name} inflicts ${subject.name} with ${status}! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
        },

        help: `per humor of light in this shell::\n+10% chance for (2T:FEAR/2T:DESTABILIZED/1T:STUN) on hit\n+5% INVITE STORM/INVOKE MADNESS special effect chance`
    },

    /* critta combat modifiers */
    bone_spikes: { 
        slug: "bone_spikes",
        name: "Heavy Chitin",
        passive: "modifier",
        beneficial: true,
        icon: "/img/sprites/combat/passives/bone_spiked.gif",
        impulse: {type: "common", component: "bone"},
        
        events: {
            onBeforeAddStatus: function(context) {
                if(context.status == "evasion") context.status = "spikes"
            },
        },

        help: `evasion becomes spikes`
    },

    bone_ablative: { 
        slug: "bone_ablative",
        name: "Ablative Mending",
        passive: "modifier",
        beneficial: false,
        impulse: {type: "common", component: "bone"},
        icon: "/img/sprites/combat/passives/bone_ablative.gif",
        
        events: {
            onBeforeCombatHit: function(context) {
                if(context.amt < 0 && context.type == 'hp') {
                    context.type = 'barrier'
                    context.amt = context.amt * -2
                }
            },
        },

        help: `direct heals are doubled and become barriers`
    },

    bone_collective: { 
        slug: "bone_collective",
        name: "Collectivism",
        passive: "modifier",
        beneficial: true,
        icon: "/img/sprites/combat/passives/bone_collectivism.gif",
        
        events: {
            onAddStatus: function({target, statusObj}) {
                if(statusObj.slug == "redirection") {
                    this.status.outgoingMult = 1
                }
            },

            onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "redirection") {
                    this.status.outgoingMult = 0
                }
            },
        },

        help: `gain +100% outgoing damage/heal while covered by REDIRECTION\nall actors gain GUARD (AUTOHIT +2T:REDIRECTION (TO USER))`
    },

    ichor_sacrifice: { 
        slug: "ichor_sacrifice",
        name: "Adull's Sacrifice",
        passive: "modifier",
        beneficial: false,
        icon: "/img/sprites/combat/passives/ichor_sacrifice.gif",
        
        events: {
            onStruck: function({attack}) {
                let healAmt = Math.floor(attack / 2)
                if(healAmt > 0) {
                    let validTargets = env.rpg.turnOrder.filter(actor => (actor != this.status.affecting) && (actor.state != "dead"))

                    setTimeout(()=>{
                        play("mend")
                        let target = validTargets.sample()

                        combatHit(target, {amt: healAmt * -1, beneficial: true, autohit: true, type: "hp"});

                        sendFloater({
                            target,
                            type: "arbitrary",
                            arbitraryString: "ADULL!",
                        })
                    
                        readoutAdd({
                            message: `${target.name} receives a sacrifice of ${healAmt} HP! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                            name: "sourceless", 
                            type: "sourceless combat minordetail", 
                            show: false,
                            sfx: false
                        })
                    }, env.ADVANCE_RATE * 0.2)
                }
            },
        },

        help: `half of damage taken is given to a random actor as HP (rounded down)`
    },

    ichor_strength: { 
        slug: "ichor_strength",
        name: "Full Strength",
        passive: "modifier",
        beneficial: true,
        impulse: {type: "common", component: "ichor"},
        icon: "/img/sprites/combat/passives/ichor_strength.gif",
        
        events: {
            onTurn: function() {
                if(this.status.affecting.hp >= this.status.affecting.maxhp * 0.75) this.status.outgoingMult = 1
                else this.status.outgoingMult = 0
            },
        },

        help: `+100% outgoing damage/heal at >75% HP`
    },
    
    ichor_rotten: { 
        slug: "ichor_rotten",
        name: "Rotten Supplies",
        passive: "modifier",
        beneficial: false,
        icon: "/img/sprites/combat/passives/ichor_rotten.gif",
        
        events: {
            onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "regen") {
                    addStatus({target: target, origin: false, status: "rot", length: 3})
                }
            },
        },

        help: `gain 3T:ROT when REGEN is removed`
    },

    claws_infection: { 
        slug: "claws_infection",
        name: "Infection",
        passive: "modifier",
        beneficial: false,
        icon: "/img/sprites/combat/passives/claws_infection.gif",
        impulse: {type: "common", component: "claws"},
        
        events: {
            GLOBAL_onBeforeCombatHit: function(context) {
                if(context.origin == this.status.affecting) {
                    let punctureCount = hasStatus(context.originalEventTarget, "puncture")

                    if(context.amt > 0 && punctureCount && !context.beneficial) {
                        this.status.outgoingMult = 0.2 * punctureCount
                    } else {
                        this.status.outgoingMult = 0
                    }
                }

                updateStats({actor: this.status.affecting})
            },
        },

        help: `+20% damage per T:PUNCTURE of attacked target`
    },

    claws_desperation: { 
        slug: "claws_desperation",
        name: "Desperation",
        passive: "modifier",
        beneficial: false,
        icon: "/img/sprites/combat/passives/claws_desperation.gif",
        impulse: {type: "common", component: "claws"},
        
        events: {
            onTurn: function() {
                if(this.status.affecting.hp <= (this.status.affecting.maxhp / 2)) {
                    this.status.outgoingCrit = 0.5
                    this.status.outgoingToHit = 0.5
                } else {
                    this.status.outgoingCrit = 0
                    this.status.outgoingToHit = 0
                }

                updateStats({actor: this.status.affecting})
            },
        },

        help: `+50% outgoing crit and hit chance if HP < 50%`
    }, 
    
    claws_rabid: { 
        slug: "claws_rabid",
        name: "Rabid",
        passive: "modifier",
        help: "all targeted actions have a 25% + (1%*T:ROT) chance to become BITE\nBITE::(-2HP, +3T:ROT, transfer ROT to target)",
        infinite: true,
        icon: "/img/sprites/combat/passives/claws_rabid.gif",
        
        events: {
            onBeforeAction: function(context) {
                if(!context.settings.action.type.includes("target")) return;
                let pow = hasStatus(this.status.affecting, "rot");
                
                // alter action maybe
                if(Math.random() < (0.25 + (pow * 0.01))) {

                    context.settings.action = env.ACTIONS["bite"]
                    let subject = context.settings.user

                    sendFloater({
                        target: subject,
                        type: "arbitrary",
                        arbitraryString: "RABID!",
                        beneficial: false,
                        size: 2,
                    })

                    readoutAdd({
                        message: `${subject.name}'s uncontrollably bites ${context.settings.target.name}! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail",
                        show: false,
                        sfx: false
                    })
                }
            },
        }
    },

    eyes_hypercritical: { 
        slug: "eyes_hypercritical",
        name: "Hypercritical",
        passive: "modifier",
        beneficial: false,
        icon: "/img/sprites/combat/passives/eyes_hypercritical.gif",
        
        events: {
            onAddStatus: function({target, statusObj}) {
                if(statusObj.slug == "vulnerable") {
                    statusObj.infinite = true
                    statusObj.duration = 1
                }
            },
        },

        help: `vulnerability has infinite duration`
    },

    eyes_woundedego: { 
        slug: "eyes_woundedego",
        name: "Wounded Ego",
        passive: "modifier",
        beneficial: true,
        icon: "/img/sprites/combat/passives/eyes_wounded.gif",
        impulse: {type: "common", component: "eyes"},
        
        events: {
            onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "vulnerable") {
                    addStatus({target: target, origin: target, status: "focused", length: 1})
                    addStatus({target: target, origin: target, status: "empowered", length: 1})
                }
            },
        },

        help: `grant 1T:FOCUSED and 1T:EMPOWERED when vulnerability is removed`
    },
    
    eyes_betrayal: { 
        slug: "eyes_betrayal",
        name: "Betrayal",
        passive: "modifier",
        help: "Beneficial actions have a 20% chance to become SUBVERT\nSUBVERT::(+2T:VULNERABLE, +CRITICAL FLAW, -EVASION)",
        infinite: true,
        icon: "/img/sprites/combat/passives/eye_betrayal.gif",
        
        events: {
            onBeforeAction: function(context) {
                if(!context.settings.action.type.includes("target") || !context.settings.action.beneficial) return;
                
                // alter action maybe
                if(Math.random() < 0.2) {

                    context.settings.action = env.ACTIONS["subvert"]
                    let subject = context.settings.user

                    reactDialogue(subject, 'laugh')

                    sendFloater({
                        target: subject,
                        type: "arbitrary",
                        arbitraryString: "BETRAYAL!",
                        beneficial: false,
                        size: 2,
                    })

                    readoutAdd({
                        message: `${subject.name} betrays ${context.settings.target.name}! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail",
                        show: false,
                        sfx: false
                    })
                }
            },
        }
    },

    light_laughterhouse: { 
        slug: "light_laughterhouse",
        name: "Laughterhouse",
        passive: "modifier",
        beneficial: true,
        icon: "/img/sprites/combat/passives/light_laughterhouse.gif",
        impulse: {type: "common", component: "eyes"},
        
        events: {
            onAction: function({user, action, target}) {
                if(action.slug.includes("incoherent_") || action.slug.includes("intrusive") || action.slug == "special_archiveshelf_annihilate" || target.state == "dead" || user.state == "dead" || hasStatus(user, "fear")) return;
                
                if(Math.random() < (0.2 + hasStatus(user, "light_humorist") ? 0.2 : 0)) {
                    reactDialogue(this.status.affecting, 'laugh')

                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        arbitraryString: "LAUGHTERHOUSE!",
                        size: 1.5
                    })

                    readoutAdd({
                        message: `${user.name} acts again! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                    setTimeout(()=>useAction(user, action, target, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "laughterhouse"}), 500)
                }
            },
        },

        help: `most actions have a 20% chance to repeat effects`
    },

    light_glee: { 
        slug: "light_glee",
        name: "Velzie's Glee",
        passive: "modifier",
        beneficial: false,
        icon: "/img/sprites/combat/passives/light_glee.gif",
        impulse: {type: "common", component: "light"},
        extraStatuses: ["puncture", "destabilized", "regen", "rot", "vulnerable", "focused", "empowered", "open_wound", "stun"],
        
        events: {
            onBeforeAddStatus: function(context) {
                let chance = 0.5
                let extra = 0
                if(env.crittaMap) if(env.crittaMap.getModQty("global_megaglee")) {
                    chance = 1;
                    extra = (env.crittaMap.getModQty("global_megaglee") - 1)
                }

                if(Math.random() < chance) {

                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        arbitraryString: "GLEE!",
                        beneficial: false
                    })

                    let newStatus = env.STATUS_EFFECTS[context.status]
                    if(newStatus.opposite) context.status = newStatus.opposite
                    if(extra) context.length += extra
                }
            },
        },

        help: `incoming status effect application has a 50% chance to become opposite status\nmay be altered by other effects`
    },

    light_dark: { 
        slug: "light_dark",
        name: "Dark Eye",
        passive: "modifier",
        beneficial: false,
        icon: "/img/sprites/combat/passives/light_dark.gif",
        
        events: {
            onAddStatus: function({target, statusObj}) {
                if(statusObj.slug == "fear") {
                    this.status.outgoingMult = 1
                    updateStats({actor: this.status.affecting})
                }
            },

            onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "fear") {
                    this.status.outgoingMult = 0
                    updateStats({actor: this.status.affecting})
                }
            },

            onCrit: function({subject, origin, attack, beneficial}) {
                if(beneficial || origin.team.members.includes(subject) || origin.state == "dead" || subject.state == "dead") return;
                addStatus({target: subject, origin, status: "fear", length: 1}); 

                setTimeout(()=>{
                    play("fear", 0.5, 0.5)
                    
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        arbitraryString: "DARKNESS!",
                    })
                                    
                    readoutAdd({
                        message: `${this.status.affecting.name}'s strike terrifies ${subject.name}! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail",
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
        },

        help: `gain +100% outgoing damage/heal when afflicted by FEAR\nwhen critting a foe, inflict 1T:FEAR `
    },

    fish_solo: { 
        slug: "fish_solo",
        name: "Lone Daemon",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/fish_solo.gif",
                
        events: {
            onCreated: function({statusObj}) {
                if(statusObj.slug == "fish_solo" && !this.status.initialized) {
                    this.status.affecting.statusImmunities = ["stun", "fear"]
                    this.status.initialized = true
                    addStatus({target: this.status.affecting, status: "wild_surge", noReact: true, length: 1})
                    setTimeout(()=>this.status.affecting.box.classList.add("daemonactor"), 100)
                } else if(statusObj.slug == "wild_surge") {
                    setTimeout(()=>delete statusObj.justGotSurge, 50)
                }
            },

            onTurn: function() {
                let thisStatus = this
                addStatus({target: this.status.affecting, status: "wild_surge", noReact: true, length: 1})
                setTimeout(()=>delete thisStatus.status.justGotSurge, 50)
            }
        },

        help: `+30HP base HP, grants immunity to stun/fear, +WILD SURGE on turn, negates WILD SURGE stun effect`
    },

    fish_angler: {
        slug: "fish_angler",
        name: "Deceiving Bulb",
        help: "prioritized as target over other allies",
        icon: "/img/sprites/combat/passives/fish_angler.gif",
        passive: true,
        beneficial: true,
                
        events: {
            onCreated: function({statusObj}) {
                if(statusObj.slug == "fish_angler" && !this.status.initialized) {
                    this.status.initialized = true
                    this.status.affecting.priorityTarget = true
                }
            }
        },
    },

    fish_mimic: { 
        slug: "fish_mimic",
        name: "Mimic",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/fish_mimic.gif",
                
        events: { //
            onCreated: function({statusObj}) {
                if(statusObj.slug == "fish_mimic" && !this.status.initialized) {
                    this.status.initialized = true
                    let member = this.status.affecting.member
                    if(member) {
                        if(member.mimic) {
                            if(member.mimic.actions) this.status.affecting.actions = member.mimic.actions
                            if(member.mimic.windupActions) this.status.affecting.windupActions = member.mimic.windupActions
                        }
                    }
                }
            }
        },

        help: `keep mimicked actions between fights`
    },

    fish_trusive: { 
        slug: "fish_trusive",
        name: "Gambling Adddiction",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/gambling_addiction.gif",
                
        events: {
            onCreated: function({statusObj}) {
                if(statusObj.slug == "fish_trusive" && !this.status.initialized) {
                    let actor = this.status.affecting

                    env.rpg.insertAdjacentHTML('beforeend', `
                    <figure id="chancepanel" class="hidden" for="${actor.slug}">
                        <img src="/img/sprites/flantrusive/panelbase.gif">
                        <div class="wheel">
                            <ul>
                                <li class="d1">1</li>
                                <li class="d2">2</li>
                                <li class="d3">3</li>
                                <li class="d4">4</li>
                                <li class="d5">5</li>
                                <li class="d6">6</li>
                            </ul>
                        </div>
                        <div class="display">
                            <ol>
                                <li class="d1">1. life up</li>
                                <li class="d2">2. main up</li>
                                <li class="d3">3. unlucky</li>
                                <li class="d4">4. bomb</li>
                                <li class="d5">5. unlucky</li>
                                <li class="d6">6. change</li>
                            </ol>
                        </div>
                        <div class="result">
                            <div>
                                <span></span>
                            </div>
                        </div>
                    </figure>`)
                
                    actor.chancePanel = env.rpg.querySelector(`#chancepanel[for="${actor.slug}"]`)
                    actor.chancePanel.result = actor.chancePanel.querySelector(".result span")
                    actor.chancePanel.spin = (state) => { 
                        actor.chancePanel.removeAttribute("chosen")
                        actor.chancePanel.classList.toggle("spinning", state) 
                        actor.chancePanel.result.innerHTML = "???"
                    }
                
                    actor.chancePanel.stopAndResult = () => { 
                        let result = rand(1, 7)
                        actor.chancePanel.spin(false)
                        actor.chancePanel.setAttribute("chosen", result)
                
                        return result
                    }
                } 
            },

            onTurn: function() {
                useAction(this.status.affecting, env.ACTIONS.special_intrusive_ally, this.status.affecting, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "fish", force: true})
            }
        },

        help: `spin the wheel on turn`
    },

    /* special map/tension modifiers that scale in different ways*/

    //TODO: bc of how we changed status definitions, this whole thing needs to be examined
    // if we can just make sure objects get passed when hovering a status string, we can reference those
    // for now this is just using the old hover (which isn't ideal but it's ok)
    global_escalation: {
        slug: "global_escalation",
        name: "Escalation",
        passive: true,
        icon: "/img/sprites/daemons/spawner/bee.gif",
        
        events: {

            onCreated: function({statusObj}) {
                if(statusObj.slug != this.status.slug) return;

                if(this.status.affecting.originalSlug != "critta_boss") { //our main quarry doesn't get the HP bonus
                    let power = env.crittaMap.getModQty("global_escalation")
                    let scale = 1 + (power * .5)
                    this.status.affecting.maxhp = Math.floor(scale * this.status.affecting.maxhp)
                    this.status.affecting.hp = Math.floor(scale * this.status.affecting.hp)

                    this.status.help = `+${Math.floor(power * 50)}% max HP, ` + this.status.help
                    this.status.affecting.box.querySelector('.passive-global_escalation').setAttribute('definition', `PASSIVE::'${this.status.name}'\nEFFECT::'${this.status.help.toUpperCase()}'`)

                    updateStats({actor: this.status.affecting})
                }
            },

            //turns some statuses into pseudo-new-statuses
            onAddStatus: function({target, statusObj}) {
                let statusChange = false
                let power = env.crittaMap.getModQty("global_escalation")
                let baseStatus = env.STATUS_EFFECTS[statusObj.slug]

                switch(statusObj.slug) {
                    case "puncture": // escalation stack increases minimum damage by 1
                    case "rot":
                        statusObj.oldName = baseStatus.name
                        statusObj.name = statusObj.oldName + '+'.repeat(power)
                        statusObj.help = processHelp(baseStatus).replace("min:1", `min:${power + 1}`)
                        statusChange = true 
                    break

                    case "vulnerable": // escalation stack gives this a +50% incoming damage mult
                        statusObj.incomingMult = 0.5 * power
                        statusObj.oldName = baseStatus.name
                        statusObj.name = statusObj.oldName + '+'.repeat(power)
                        statusObj.help = processHelp(baseStatus) + `, +${Math.floor(50 * power)}% incoming damage/heal`
                        statusChange = true
                    break

                    case "siphon": // escalation stack increases direct heal by 1
                        statusObj.oldName = baseStatus.name
                        statusObj.name = statusObj.oldName + '+'.repeat(power)
                        statusObj.help = processHelp(baseStatus).replace("1HP", `${power + 1}HP`)
                        statusChange = true
                    break

                    case "destabilized": // escalation stack increases incoming damage by another 50%
                        statusObj.incomingMult = 1 + (power * 0.5)
                        statusObj.oldName = baseStatus.name
                        statusObj.name = statusObj.oldName + '+'.repeat(power)
                        statusObj.help = `+${Math.floor(statusObj.incomingMult * 100)}% incoming damage/heal, +100% outgoing`
                        statusChange = true
                    break

                    case "open_wound": // escalation stack increases by +1 flat
                        statusObj.incomingFlat = 1 + power
                        statusObj.oldName = baseStatus.name
                        statusObj.name = statusObj.oldName + '+'.repeat(power)
                        statusObj.help = processHelp(baseStatus).replace("+1", `+${statusObj.incomingFlat}`)
                        statusChange = true
                    break

                    case "weakened": // escalation stack also reduces hit chance by 20%
                        statusObj.oldName = baseStatus.name
                        statusObj.outgoingToHit = power * -.2
                        statusObj.name = statusObj.oldName + '+'.repeat(power)
                        statusObj.help = processHelp(baseStatus) + `, ${Math.floor(statusObj.outgoingToHit * 100)}% hit%`
                        statusChange = true
                    break

                    case "fear": // when afraid, take damage from defeating nearby foes
                        statusObj.oldName = baseStatus.name
                        statusObj.name = statusObj.oldName + '+'.repeat(power)
                        statusObj.help = processHelp(baseStatus).replace("actions prohibited", `actions prohibited\nwhen an ally dies, take ${Math.floor(power * 10)}% of their max HP in damage`)
                        statusChange = true
                    break
                }
            },

            GLOBAL_onDeath: function({originalEventTarget}) {
                let subject = originalEventTarget
                let user = this.status.affecting

                if(
                    user.team.name != subject.team.name ||
                    subject.state != "dead" ||
                    !hasStatus(user, "fear")
                ) return;

                let power = env.crittaMap.getModQty("global_escalation")
                let fear = user.statusEffects.find(status => status.slug == "fear")
                let incomingDamage = Math.floor(subject.maxhp * (power * 0.1))

                setTimeout(()=>{
                    playCombatCrit("dull")
                    combatHit(this.status.affecting, {amt: incomingDamage, autohit: true, redirectable: false, runEvents: false})
                    
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        arbitraryString: "TERROR!",
                        beneficial: false
                    })
                
                    readoutAdd({
                        message: `${user.name} is damaged for ${incomingDamage}HP as ${subject.name} falls! (<span definition="${processHelp(fear, {caps: true})}">${fear.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                    updateStats({actor: user})
                }, env.ADVANCE_RATE * 0.2)
            },
        },

        help: `most negative statuses have enhanced effect`
    },

    global_impulse_bonus: {
        slug: "global_impulse_bonus",
        name: "Into Madness",
        icon: "/img/sprites/bstrd/icon.gif",        
        events: {
            onCreated: function({statusObj}) {
                if(statusObj.slug != this.status.slug) return;

                let possible = Object.entries(env.STATUS_EFFECTS).filter(entry => entry[1].impulse).map(entry => entry[1].slug)
                possible = possible.filter(slug => !["ichor_last_stand"].includes(slug))
                let power = env.crittaMap.getModQty("global_impulse_bonus")

                if(power) {
                    for (let i = 0; i < power; i++) {
                        addStatus({target: this.status.affecting, status: possible.sample(), noReact: true, length: 1})
                    }
                }

                setTimeout(() => {removeStatus(this.status.affecting, "global_impulse_bonus", {runEvents: false}); updateStats(this.status.affecting)}, 100)
            }
        },

        help: `this actor receives a random impulse per stack of Into Madness`
    },

    /* special boss mechanics */
    appeasement: { 
        slug: "appeasement",
        name: "Appeasement",
        help: `when an ally dies, take their max HP * 2 in damage\nwhen defeated, also defeat all other allies`,
        beneficial: false,
        infinite: true,
        
        events: {
            GLOBAL_onDeath: function({originalEventTarget}) {
                let subject = originalEventTarget
                let user = this.status.affecting

                if(
                    user.team.name != subject.team.name || 
                    subject.state != "dead"
                ) return;

                let incomingDamage = Math.floor(subject.maxhp * 2)

                setTimeout(()=>{
                    playCombatCrit("dull")
                    combatHit(this.status.affecting, {amt: incomingDamage, autohit: true, redirectable: false, runEvents: false})

                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        arbitraryString: "APPEASED!",
                        beneficial: false
                    })
                
                    readoutAdd({
                        message: `${user.name} is damaged for ${incomingDamage}HP as ${subject.name} falls! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail",
                        show: false,
                        sfx: false
                    })
                    updateStats({actor: user})
                }, env.ADVANCE_RATE * 0.2)
            },

            onDeath: function() {
                let user = this.status.affecting
                play("talkfairy")
                user.team.members.forEach(member=>member.hp = 0)
                updateStats()
            }
        }
    },

    spawner: { 
        slug: "spawner",
        name: "Spawner",
        help: `when struck with direct damage, summon minor ally\nnot triggered by statuses or non-harmful actions`,
        beneficial: false,
        infinite: true,
        
        events: {
            onStruck: function({}) {
                play('talkcroak', 0.8, 1)
                
                readoutAdd({
                    message: `${this.status.affecting.name} is disturbed by damage and releases a guardian! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                    name: "sourceless", 
                    type: "sourceless combat minordetail", 
                    show: false,
                    sfx: false
                })
                
                if(this.status.lastSide) {
                    midCombatActorAdd(env.rpg.enemyTeam, 'critta_spawner_bee', 'left', false)
                    this.status.lastSide = 0
                } else {
                    midCombatActorAdd(env.rpg.enemyTeam, 'critta_spawner_bee', 'right', false)
                    this.status.lastSide = 1
                }
            },

            onDeath: function() {
                let user = this.status.affecting
                play("talkfairy", 0.5)
                user.team.members.forEach(member=>member.hp = 0)
                updateStats()
            }
        }
    },

    mimic: { 
        slug: "mimic",
        name: "Mimic",
        help: `will use last action used by foe in same party slot\ncannot copy items or actions requiring certain statuses`,
        beneficial: false,
        infinite: true,
        
        events: {
            GLOBAL_onAction: function ({user, action, target, originalEventTarget}) {
                let thisUserIndex = this.status.affecting.team.members.findIndex((guy)=>guy.slug == this.status.affecting.slug)
                let oppositeFoe = this.status.affecting.enemyTeam.members[thisUserIndex]
                if(!oppositeFoe) return;

                if(originalEventTarget.slug == oppositeFoe.slug) {
                    let message = `${this.status.affecting.name} takes note! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`
                    if(action.itemAction) {
                        this.status.affecting.actions = ["nothing"]
                        message = `${this.status.affecting.name} does not know what to do...! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name} failed</span>)`

                    } else {
                        this.status.affecting.actions = [action.slug]

                        sendFloater({
                            target: this.status.affecting,
                            type: "arbitrary",
                            arbitraryString: "MIMICKED!",
                        })
                    }
                
                    setTimeout(()=>{
                        readoutAdd({
                            message,
                            name: "sourceless", 
                            type: "sourceless combat minordetail", 
                            show: true,
                            forceMini: true,
                            sfx: false
                        })
                    }, 300)
                }
            },
        }
    },

    permanent_hp: {
        slug: "permanent_hp",
        name: "Partial Participant",
        help: `unable to be reset, damage dealt is kept through iterations\nfear is enhanced and has alternate function`,
        icon: "/img/sprites/combat/statuses/partial_participant.gif",
        beneficial: false,
        infinite: true,

        events: {
            onCombatStart: function(){
                let hp = check('e3a2bosshp')
                hp = hp ? hp : 0 // to get rid of undefined

                if(!hp || hp < 0) this.status.affecting.hp = 1000000
                else this.status.affecting.hp = hp;
                
                updateStats({actor: this.status.affecting})
            },

            onCombatHit: function() {
                change("e3a2bosshp", this.status.affecting.hp)
            },

            onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "imperfect_reset") {
                    env.rpg.halt = true
                    ratween(env.bgm, 0.3)

                    let dawall = this.status.affecting
                    setTimeout(()=>{
                        if(dawall.state != "dead") {
                            startDialogue(check("PAGE!!dream") ? "dreamloop" : "loop")
                        }
                    }, 2000)
                }
            },

            //turns some statuses into pseudo-new-statuses
            onAddStatus: function({target, statusObj}) {
                let statusChange = false
                switch(statusObj.slug) {
                    case "fear": // when afraid, take damage from defeating nearby foes
                        statusObj.oldName = statusObj.name
                        statusObj.name = "Fear++"
                        statusObj.help = "summoned allies are less threatening\nwhen an ally dies, take their max HP * 2 in damage\nenhanced by partial participant"
                        statusChange = true
                    break
                }
            },

            GLOBAL_onDeath: function({originalEventTarget}) {
                let subject = originalEventTarget
                let user = this.status.affecting

                if(
                    user.team.name != subject.team.name || 
                    subject.state != "dead" ||
                    !hasStatus(user, "fear")
                ) return;

                let incomingDamage = Math.floor(subject.maxhp * 2)

                setTimeout(()=>{
                    playCombatCrit("dull")
                    combatHit(this.status.affecting, {amt: incomingDamage, autohit: true, redirectable: false, runEvents: false})
                    
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        arbitraryString: "TERROR!",
                        beneficial: false
                    })
                
                    readoutAdd({
                        message: `${user.name} is damaged for ${incomingDamage}HP as ${subject.name} falls! (<span definition="${`summoned allies are less threatening\nwhen an ally dies, take their max HP * 2 in damage\nenhanced by partial participant`.toUpperCase()}">Fear++</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                    updateStats({actor: user})
                }, env.ADVANCE_RATE * 0.2)
            },

            onDeath: function() {
                let user = this.status.affecting
                env.rpg.halt = true
                user.team.members.forEach(member=>member.hp = 0)
                updateStats()
                ratween(env.bgm, 0.3)
                setTimeout(()=>{ratween(env.bgm, 0.3);startDialogue(check("PAGE!!dream") ? "dreamwin" : "win")}, 4000)
            }
        }
    },

    imperfect_reset: { 
        slug: "imperfect_reset",
        name: "Ruleset Paradox",
        help: `upon status expiry, end combat and reset iteration with more hostile parameters\ncurrent party will persist`,
        icon: "/img/sprites/combat/statuses/framereset.gif",
        events: {
            onCreated: function({statusObj}) {
                if(statusObj.slug != this.status.slug) return;
                if(check("e3a2loops")) {
                    statusObj.help =  `upon status expiry, end combat and reset iteration with more hostile parameters\ncurrent party will persist`
                } else {
                    statusObj.help = `UNKNOWN EFFECT`
                }
            },
        }
    },

    /* e3a2 item effects */
    malware_drill: { 
        slug: "malware_drill",
        name: "DRILL",
        passive: true,
        beneficial: false,
        icon: "/img/sprites/combat/passives/malware_drill.gif",
        help: `doubles effect of puncture on this actor`,
    },

    malware_rot: { 
        slug: "malware_rot",
        name: "ROTTING",
        passive: true,
        beneficial: false,
        icon: "/img/sprites/combat/passives/malware_rot.gif",
        help: `upon receiving REGEN, instead turn it into ROT`,
        
        events: {
            onBeforeAddStatus: function(context) {
                if(context.status == "regen") context.status = "rot"
            },

            onCreated: function() {
                let currentRegen = hasStatus(this.status.affecting, "regen")
                if(currentRegen) {
                    removeStatus(this.status.affecting, "regen")
                    addStatus({target: this.status.affecting, origin: false, status: "rot", length: currentRegen}); 
                }
            },
        },
    },

    /* special event controller */
    driver: {
        slug: "driver",
        name: "Driver",
        help: `can pilot the vessel. on turn, advance vessel position forward`,
        infinite: true,
        passive: true,
        icon: "/img/sprites/combat/passives/driver.gif",
        events: {
            onTurn: function() {
                if(env.boatEscape) env.boatEscape.advance()
            }
        }
    },

    invincible: {
        slug: "invincible",
        name: "Invincible",
        help: `cannot be defeated by any means\nsystem interruption to maintain disabled gameplay`,
        infinite: true,
        passive: true,
        beneficial: true,
        outgoingMult: 100,
        icon: "/img/sprites/combat/passives/invincible.gif",
        events: {
            onTurn: function() {
                this.status.affecting.hp = 10000
                this.status.affecting.maxhp = 10000
            },

            onDeath: function () {
                this.status.affecting.state = "living"
                useAction(this.status.affecting, env.ACTIONS.ichor_passive_restore, this.status.affecting, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "invincible"})
            }
        }
    },
    
    /* intrusive */
    weak_point: { 
        slug: "weak_point",
        name: "Weak Point",
        infinite: true,
        beneficial: false,
        
        events: {
            onBeforeAddStatus: function(context) {
                if(context.status == "stun") {
                    context.status = "hyperstun"
                }
            },
        },

        help: `receive +1000% incoming damage/heal while stunned`
    },

    hyperstun: { 
        slug: "hyperstun",
        name: "Weak Point Exposed",
        incomingMult: 10,
        substitute: 'vulnerable',
        skipTurn: true,
        icon: "/img/sprites/combat/statuses/hyperstun.gif",        
        events: {
            onTurn: function() { reactDialogue(this.status.affecting, 'stun') },
        },

        help: "skip turn, +1000% incoming damage/heal",
        removes: ["windup"]
    },

    ominous_timer: { 
        slug: "ominous_timer",
        name: "Ominous Timer",
        skipTurn: true,
        infinite: true,

        events: {
            onDeath: function() {
                clearInterval(this.status.countdown)
            },

            onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "ominous_timer") clearInterval(this.status.countdown)
            },

            onCreated: function({statusObj}) {
                console.log('created bomb with', statusObj)
                if(statusObj.slug != "ominous_timer" || this.status.timeRemaining) return;

                this.status.timeRemaining = 90
                let thisSprite = this.status.affecting.sprite
                let thisGuy = this.status.affecting
                let thisStatus = this.status

                function updateTimer() {  
                    if(thisSprite) thisSprite.querySelector(".timer").innerHTML = `<span>${thisStatus.timeRemaining}</span>`

                    if (thisStatus.timeRemaining === 0 && !thisStatus.exploded && env.rpg.active) {
                        clearInterval(thisStatus.countdown) 
                        thisStatus.exploded = true

                        thisGuy.actions = ["detonate"]
                        thisGuy.sprite.classList.add("detonate-ready")

                        sendFloater({
                            target: thisGuy,
                            type: "arbitrary",
                            arbitraryString: "DETONATION IMMINENT",
                            size: 1.5,
                            beneficial: false
                        })

                        readoutAdd({
                            message: `${thisGuy.name} is about to detonate!`, 
                            name: "sourceless", 
                            type: "sourceless combat minordetail",
                            show: false,
                            sfx: false
                        })

                        removeStatus(thisGuy, "ominous_timer")

                    } else {
                        if(!hasStatus(thisGuy, "stun") && !hasStatus(thisGuy, "hyperstun")) {
                            thisStatus.timeRemaining--
                        }

                    }
                }
            
                updateTimer() // Initial call to display the timer immediately
            
                this.status.countdown = setInterval(updateTimer, 1000)
            },
        },

        help: "unknown, asynchronous effect",
    },

    /* EP4 COMBAT GRID ZONE */
    lootbox: {
        slug: "lootbox",
        name: "Item Carrier",
        help: "dropping item on death",
        icon: "/img/sprites/combat/statuses/lootbox_corru.gif",
        infinite: true,
        events: {
            onCreated: function({statusObj}) {
                if(env.rpg.is2D) if(statusObj.slug == this.status.slug && !this.status.initialized) {
                    this.status.initialized = true
                    let item = this.status.affecting?.holdingItem?.name || "restorative"
                    let itemObj = env.ITEM_LIST[item]
                    this.status.help = this.status.help.replace(" item ", ` ${itemObj.batches} ${itemObj.name}s `) // postep4todo: this "s" will cause issues later
                    setTimeout(()=>{
                        this.status.affecting.sprite.insertAdjacentHTML('beforeend', `
                        <div class="item-ghost">
                            <img src="${env.ITEM_LIST[item].image}">
                        </div>
                        `)
                    }, 400)
                }
            },

            onDeath: function() {
                let item = this.status.affecting?.holdingItem?.name || "restorative"
                let qty = this.status.affecting?.holdingItem?.qty || 3
                setTimeout(()=>{
                    addItem(item, qty)
                    if(env.rpg.turnData.showingActions && env.rpg.currentActor.team.name == 'ally') showActions(env.rpg.currentActor);
                    env.rpg.effectMessage.action({
                        user: this.status.affecting,
                        target: this.status.affecting,
                        reason: "item",
                        action: `%TARGET dropped ${qty} ${env.ITEM_LIST[item].name}`,
                        isMinor: true
                    })
                }, 100)
            },
        }
    },

    rifle_bearer: {
        slug: "rifle_bearer",
        name: "Armed",
        help: "wielding symbiotic rifle, grants action SLUDGE VOLLEY\nremoved if other ally is armed",
        icon: "/img/sprites/combat/passives/armed.gif",
        beneficial: true,
        passive: true,
        grantsActions: ["scene_rifle"], // postep4todo: this only works for player controlled characters presently
        events: {
            onCreated: function({statusObj}) {
                if(env.rpg.is2D) if(statusObj.slug == this.status.slug) {
                    this.status.affecting.team.members.forEach(m=> m != this.status.affecting ? removeStatus(m, "rifle_bearer", {forceRemoveStatus: true}) : "")
                }
            },

            onDeath: function() {
                removeStatus(this.status.affecting, "rifle_bearer")
            },
        }
    },

    kb_immune: {
        slug: "kb_immune",
        name: "Immovable",
        help: "ignores knockback",
        beneficial: true,
        knockmod: -999,
        infinite: true
    },

    //unused
    unnatural_speed: {
        slug: "unnatural_speed",
        name: "Unnatural Speed",
        help: `'instant relocation on turn start if not near foe'`,
        icon: "/img/sprites/combat/statuses/unnatural_speed.gif",
        passive: true,
        beneficial: true,
        events: {
            onTurn: function() {
                if(env.rpg.tagName != "COMBAT-SCENE" || !this.status.affecting.piece) return;
                if(this.status.affecting.piece.tile.getNeighbors().find(tile=>tile.piece ? tile.piece.actor.team.name == "ally": false)) return;

                let target = env.rpg.allyTeam.members.find(member => hasStatus(member, "vulnerable")) || env.rpg.allyTeam.members.filter(m=>m.state != "dead").sample()
                if(target) {
                    this.status.affecting.piece.teleportToTile(target.piece.tile.getClosestOpenTile(), {follow: true, instant: true})
                    play("talkfairy", 0.75)
                }
            },
        }
    },

    //continuous support
    coiling: {
        slug: "coiling",
        name: "coiling",
        help: 'providing continuous beneficial statuses\nsevered by stun or death',
        beneficial: true,
        infinite: true,
        events: {
            onBeforeAddStatus: function(context) {
                if(context.status == "stun") removeStatus(this.status.affecting, "coiling")
            },

            onDeath: function() {
                env.rpg.grid.deleteTileEffect(this.status.tileEffect)
            },

            onRemoveStatus: function({target, removingStatusName}) {
                console.log("REMOVING", removingStatusName)
                if(removingStatusName == "coiling") {
                    env.rpg.grid.deleteTileEffect(this.status.tileEffect)
                    if(this.status.affecting.supportTarget) {
                        removeStatus(this.status.affecting.supportTarget, "coiled")
                    }
                }
            }
        }
    },

    coiled: { 
        slug: "coiled",
        name: "Coiled",
        help: '[[ORIGIN]] providing continuous beneficial statuses',
        beneficial: true,
        infinite: true,
        events: {
            onTurnEnd: function() {
                console.log("origin is", this.status.origin, this.status)
                if(!hasStatus(this.status.origin, "coiling")) {
                    removeStatus(this.status.affecting, "coiled")
                } else if(this.status.origin != env.rpg.currentActor && this.status.affecting?.piece?.tile && this.status?.origin?.piece?.tile) {
                    if(this.status.affecting.piece.tile.distFrom(this.status.origin.piece.tile) > 1)
                        this.status.origin.piece.animateToTile(this.status.affecting.piece.tile.getClosestOpenTile(), {follow: false, animation: "lift", duration: 500})
                }
            },

            onDeath: function() {
                this.status.origin.supportTarget = false
                env.rpg.grid.deleteTileEffect(this.status.tileEffect)
            },

            onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "coiled") {
                    env.rpg.grid.deleteTileEffect(this.status.tileEffect)
                    this.status.affecting.bp = 0
                    removeStatus(this.status.affecting, "carapace", { noUpdate: true })
                    removeStatus(this.status.affecting, "focused")
                }
            }
        }
    },

    //continuous freak mode
    channeling: { 
        slug: "channeling",
        name: "Watching",
        help: 'channeling continuous negative effect upon distant target, severed by any hit or stun',
        beneficial: true,
        infinite: true,
        events: {
            onBeforeAddStatus: function(context) {
                if(context.status == "stun") removeStatus(this.status.affecting, "channeling")
            },

            onDeath: function() {
                env.rpg.grid.deleteTileEffect(this.status.tileEffect)
            },

            onStruck: function({subject, attack, beneficial}) { 
                if(attack <= 0 || beneficial) return;
                env.rpg.effectMessage.action({
                    user: this.status.affecting,
                    target: this.status.affecting,
                    action: `%USER loses focus!`,
                    reason: "INTERRUPTED",
                    isMinor: true
                })
                removeStatus(this.status.affecting, 'channeling')
            }, 

            onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "channeling") {
                    env.rpg.grid.deleteTileEffect(this.status.tileEffect)
                    if(this.status.affecting.channelTarget) {
                        removeStatus(this.status.affecting.channelTarget, "channeledUpon")
                    }
                }
            }
        }
    },

    channeledUpon: { 
        slug: "channeledUpon",
        name: "Seen",
        help: '[[ORIGIN]] continuously attacking and inflicting negative status',
        beneficial: true,
        infinite: true,
        events: {
            onTurnEnd: function() {
                if(!hasStatus(this.status.origin, "channeling")) {
                    removeStatus(this.status.affecting, "channeling")
                }
            },

            onDeath: function() {
                this.status.origin.channelTarget = false
                env.rpg.grid.deleteTileEffect(this.status.tileEffect)
            },

            onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "channeledUpon") {
                    this.status.origin.channelTarget = false
                    env.rpg.grid.deleteTileEffect(this.status.tileEffect)
                    removeStatus(this.status.affecting, "fear")
                }
            }
        }
    },

    drone_haunt: { 
        slug: "drone_haunt",
        name: "Drone Strike",
        help: `persistent area from [[ORIGIN]]. -2HP/turn to foe host and vulnerable foes, 25% chance for +1T:EVASION to allies. removed if [[ORIGIN]] is downed`,
        infinite: true,
        events: {
            onCreated: function({statusObj}) {
                if(statusObj.slug != this.status.slug) return;
                this.status.origin.channelTarget = this.status.affecting

                env.setTimeout(()=>{
                    this.status.tileEffect = env.rpg.grid.createTileEffect({
                        tiles: env.rpg.grid.markTiles({
                            originTile: this.status.affecting.piece.tile, 
                            shape: "square",
                            size: 1,
                            ignoresObstacles: true,
                            ignoresLOS: true,
                            includesOrigin: true
                        }), 
                        effect: "drone_haunt_target",
                        anchorType: "actor",
                        anchorActor: this.status.affecting,
                        length: 1,
                        origin: this.status.origin,
                    })
                }, 200)
            },

            onTurnEnd: function() {
                console.log("origin is", this.status.origin)
                if(this.status.origin.state != "living") {
                    removeStatus(this.status.affecting, "drone_haunt")
                }
            },

            onDeath: function() {
                this.status.origin.channelTarget = false
                env.rpg.grid.deleteTileEffect(this.status.tileEffect)
            },

            onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "drone_haunt") {
                    this.status.origin.channelTarget = false
                    env.rpg.grid.deleteTileEffect(this.status.tileEffect)
                }
            },
            
            GLOBAL_onDeath: function({originalEventTarget}) {
                if(originalEventTarget == this.status.origin) {
                    removeStatus(this.status.affecting, "drone_haunt")
                }
            },
        }
    },
    
    shroud_vekoa: {
        slug: "shroud_vekoa",
        name: "Shroud",
        help: `'unable to affect by any means'`,
        icon: "/img/sprites/combat/statuses/shroud.gif",
        hardSkip: true,
        infinite: true,
        beneficial: true,
        passive: true,
        untargetable: true,
        incomingToHit: -75,
        incomingCrit: -75,
        incomingMult: -10000,
        events: {
            GLOBAL_onTurnEnd: function() {
                if (!this.status.affecting.slug.includes("vekoa_boss")) return;
                if ((env.rpg.scenario.name == "ep4_intro_3") && env.rpg.enemyTeam.members.filter(member=>member.state != "dead").length == 1) {
                    env.rpg.halt = true
                    startDialogue("lesser_vekoa")
                }   
            },

            onTurn: function() {
                this.status.affecting.hp = 100
                this.status.affecting.maxhp = 100
            },

            onBeforeAddStatus: function(context) {
                context.noAdd = true
            },
            
            onEvade: function() {
                if(env.rpg.tagName != "COMBAT-SCENE" || !this.status.affecting.piece) return;
                this.status.affecting.piece.teleportToTile(env.rpg.grid.tilesByType.basic.filter(tile=>!tile.piece).sample(), {follow: false})
            }
        }
    },
    
    //like above, but still hittable and doesn't teleport
    shroud: {
        slug: "shroud",
        name: "Shroud",
        help: `'unable to affect by any means'`,
        icon: "/img/sprites/combat/statuses/shroud.gif",
        infinite: true,
        beneficial: true,
        passive: "removable",
        untargetable: true,
        incomingFlat: -100,
        incomingToHit: -75,
        incomingCrit: -75,
        incomingMult: -10000,
        events: {
            onBeforeAddStatus: function(context) { // only stun or add statuses if we're adding a status manually
                if(context.status != "stun" || !this.status.affecting.forceStatus) context.noAdd = true
            },
        }
    },

    archivist_split_focus: {
        slug: "archivist_split_focus",
        name: "Split Focus",
        help: `'suffer max HP of allies as damage upon their defeat'`,
        icon: "/img/sprites/combat/statuses/split_focus.gif",
        infinite: true,
        passive: true,
        events: {            
            //when a golem dies, our guy takes direct damage
            GLOBAL_onDeath: function({originalEventTarget}) {
                let subject = originalEventTarget
                let user = this.status.affecting

                if(
                    user.team.name != subject.team.name || 
                    subject.state != "dead"
                ) return;

                let incomingDamage = subject.maxhp

                setTimeout(()=>{
                    playCombatCrit("scarydoia")
                    combatHit(this.status.affecting, {amt: incomingDamage, autohit: true, redirectable: false, runEvents: false, ignoreMods: true})
                    
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        arbitraryString: "FRACTURED!",
                        beneficial: false
                    })

                    env.rpg.effectMessage.action({
                        user: this.status.affecting,
                        target: originalEventTarget,
                        action: `%USER recoils in pain!`
                    })

                    updateStats({actor: user})
                }, env.ADVANCE_RATE * 0.2)
            },
        }
    },

    unstable_position: {
        slug: "unstable_position",
        name: "Flickering",
        help: `'relocate to random tile on turn start'`,
        icon: "/img/textures/warp_small.png",
        infinite: true,
        passive: true,
        beneficial: true,
        events: {
            onTurn: function() {
                if(!this.status.affecting.piece) return;
                if(env?.rpg?.grid?.tilesByType?.warppoint) this.status.affecting.piece.teleportToTile(env.rpg.grid.tilesByType.warppoint.filter(tile=>!tile.piece).sample(), {follow: true})
                else this.status.affecting.piece.teleportToTile(env.rpg.grid.tilesByType.basic.filter(tile=>!tile.piece).sample(), {follow: true})
            },
        }
    },

    blur_evasive: { 
        slug: "blur_evasive",
        name: "Evasive",
        incomingToHit: -0.75,
        beneficial: true,
        passive: true,
        icon: "/img/sprites/combat/statuses/evasion.gif",
        help: "-25% IN:HIT%",
        removes: ["vulnerable"],
        opposite: "vulnerable",
        tickType: "onTurnEnd",
    },

    windup_telegraph: { 
        slug: "windup_telegraph",
        name: "Windup",
        help: "+100% incoming crit, preparing powerful telegraphed action, interrupted only by stun",
        icon: "/img/sprites/combat/statuses/windup.gif",
        beneficial: true,
        incomingCrit: 1,
        infinite: true,
        events: {
            onCreated: function({statusObj}) {
                if(statusObj != this.status) return;
                this.status.telegraphing = []
                this.status.addTelegraph = (telegraph) => this.status.telegraphing.push(telegraph)
                this.status.removeTelegraph = (telegraph) => this.status.telegraphing = this.status.telegraphing.filter(t => t !== telegraph)
            },

            onTurn: function() {
                if(this.status.telegraphing.every(t=>t.deleted)) removeStatus(this.status.affecting, 'windup_telegraph')
            },
            
            //done before add so that this can work even on stun immune entities
            onBeforeAddStatus: function({status}) {
                let statusObj = env.STATUS_EFFECTS[status]
                if(!statusObj.skipTurn) return;
                removeStatus(this.status.affecting, 'windup_telegraph')
                env.rpg.effectMessage.action({
                    user: this.status.affecting,
                    target: this.status.affecting,
                    action: `%USER loses focus!`,
                    reason: "INTERRUPTED",
                    isMinor: true
                })
            },
            
            onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == this.status.slug) this.status.telegraphing.forEach(t=>env.rpg.grid.deleteTileEffect(t))
            },
        },
    },

    telegraph: { 
        slug: "telegraph",
        name: "Interruptible",
        help: "using telegraphed action on next turn, interrupted by any hit or stun",
        beneficial: true,
        infinite: true,
        events: {
            onCreated: function({statusObj}) {
                if(statusObj != this.status) return;
                this.status.telegraphing = []
                this.status.addTelegraph = (telegraph) => this.status.telegraphing.push(telegraph)
                this.status.removeTelegraph = (telegraph) => this.status.telegraphing = this.status.telegraphing.filter(t => t !== telegraph)
            },

            onTurn: function() {
                if(this.status.telegraphing.every(t=>t.deleted)) removeStatus(this.status.affecting, 'telegraph')
            },

            onStruck: function({subject, attack, beneficial}) { 
                console.log("struck!", subject, attack)
                if(attack <= 0 || beneficial) return;
                env.rpg.effectMessage.action({
                    user: this.status.affecting,
                    target: this.status.affecting,
                    action: `%USER loses focus!`,
                    reason: "INTERRUPTED",
                    isMinor: true
                })
                removeStatus(this.status.affecting, 'telegraph')
            }, 
              
            onAddStatus: function({target, statusObj}) {
                if(!statusObj.skipTurn) return;
                removeStatus(this.status.affecting, 'telegraph')
            },
            
            onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == this.status.slug) this.status.telegraphing.forEach(t=>env.rpg.grid.deleteTileEffect(t))
            },
        },
    },

    destructible_cross: {
        slug: "destructible_cross",
        name: "Obstacle",
        help: "stands in da way :P",
        beneficial: true,
        infinite: true,
        events: {
            onCreated: function({statusObj}) {
                if(statusObj.slug != this.status.slug || !this.status.affecting.piece) return;
                console.log("right here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                this.status.tileEffect = env.rpg.grid.createTileEffect({
                    tiles: env.rpg.grid.getAoETargets({
                        tile: this.status.affecting.piece.tile, 
                        actor: this.status.affecting,
                        actingOn: "valid",
                        aoeData: {
                            size: 1,
                            shape: "circle",
                            includesOrigin: false,
                        }
                    }), 
                    effect: "blocker",
                    anchorType: "origin",
                    length: 1,
                    origin: this.status.affecting,
                })
            },
              
            onDeath: function() {
                env.rpg.grid.deleteTileEffect(this.status.tileEffect)
                if(env.rpg.currentActor.team.name == "ally" && !env.rpg.turnData.acted && env.rpg.currentActor.piece) env.rpg.currentActor.piece.startMovement() // refreshes in case they're nearby
            },     
        },
    },

    destructible_wall: { // this is genericized so it's pretty easy to make a wall of any type with it
        slug: "destructible_wall",
        name: "Wall",
        help: "",
        infinite: true,
        silent: true,
        passive: true,
        knockmod: -999,
        incomingToHit: 10,
        events: {
            onCreated: function({statusObj}) {
                if(statusObj != this.status) return;

                let wallWidth = this.status.affecting.wallWidth || 2
                let shapeString = 'o'
                for (let i = 0; i < wallWidth; i++) {
                    shapeString = `x${shapeString}x`
                }

                setTimeout(()=>{
                    let tiles = env.rpg.grid.markTiles({
                        originTile: this.status.affecting.piece.tile, 
                        shape: "custom",
                        customShape: shapeString,
                        direction: this.status.affecting.direction || "down",
                        ignoresObstacles: true,
                        ignoresLOS: true,
                    })

                    tiles.forEach(tile => tile.classList.add('nopass'))

                    this.status.tileEffect = env.rpg.grid.createTileEffect({
                        tiles,
                        effect: "pseudopiece",
                        anchorType: "origin",
                        length: 1,
                        origin: this.status.affecting,
                    })
                }, 100)
            },

            onDeath: function() {
                if(this.status.tileEffect) {
                    this.status.tileEffect.tiles.forEach(tile => {
                        tile.classList.remove('nopass')
                    })

                    env.rpg.grid.deleteTileEffect(this.status.tileEffect)
                    if(env.rpg.currentActor.team.name == "ally" && !env.rpg.turnData.acted && env.rpg.currentActor.piece) env.rpg.currentActor.piece.startMovement() // refreshes in case they're nearby
                }
            }
        },
    },

    /* EP4 cavik v miltza special stuff */
    bomb_planted: { 
        slug: "bomb_planted",
        name: "Planted",
        help: "delayed explosive attached, detonates on activation, drops on death",
        infinite: true,
        persists: true,
        events: {
            onCreated: function({statusObj}) {
                if(statusObj.slug != this.status.slug || !this.status.affecting.piece) return;

                this.status.tileEffect = env.rpg.grid.createTileEffect({
                    tiles: env.rpg.grid.getAoETargets({
                        tile: this.status.affecting.piece.tile, 
                        actor: this.status.origin,
                        actingOn: "valid",
                        aoeData: {
                            size: 1,
                            shape: "square"
                        }
                    }), 
                    originTile: this.status.affecting.piece.tile,
                    effect: "manual_bomb",
                    anchorType: "actor",
                    anchorActor: this.status.affecting,
                    length: 1,
                    origin: env.rpg.actors.cavik,
                    telegraphAnim: "telegraph",
                    telegraphFor: "special_bomb_detonate_victim",
                })
                
                this.status.tileEffect.data = { strength: 1 }
                this.status.baseName = this.status.name

                if(this.status?.origin?.trackedBombs) {
                    this.status.origin.trackedBombs.add(this.status.tileEffect)
                } else if(this.status?.origin) {
                    this.status.origin.trackedBombs = new Set()
                    this.status.origin.trackedBombs.add(this.status.tileEffect)
                }
                
                //make a fancy new function to increase bomb strength
                //only correctly handles positive numbers (there is no 'defuse')
                this.status.addStrength = (modamt) => { 
                    this.status.tileEffect.data.strength++
                    env.rpg.grid.getAoETargets({
                        tile: this.status.affecting.piece.tile, 
                        actor: this.status.origin,
                        actingOn: "valid",
                        aoeData: {
                            size: this.status.tileEffect.data.strength,
                            shape: "circle",
                        }
                    }).forEach(tile=>tile.addToEffect(this.status.tileEffect, {length: 1, addingBy: "growing"}))
                    
                    this.status.name = this.status.baseName + '+'.repeat(this.status.tileEffect.data)
                }
            },
        },
    },

    destructible_spinalroot: {
        slug: "destructible_spinalroot",
        name: "Spinal Root",
        help: "",
        infinite: true,
        silent: true,
        passive: true,
        knockmod: -999,
        incomingMult: -100,
        incomingToHit: 100,
        events: {
            onCreated: function({statusObj}) {
                if(statusObj.slug != this.status.slug || !this.status.affecting.piece) return;
                this.status.trigger = (isMiltza) => {
                    if(this.status.triggered) return;
                    this.status.triggered = true
                    let tiles = env.rpg.grid.markTiles({
                        originTile: this.status.affecting.piece.tile, 
                        shape: "square",
                        size: 1,
                        ignoresObstacles: false,
                        ignoresLOS: true,
                        includesOrigin: true
                    })
                    
                    if(isMiltza) {
                        env.rpg.grid.createTileEffect({
                            tiles, 
                            effect: "scene_edge",
                            length: 100,
                            origin: this.status.affecting
                        })

                        this.status.affecting.sprite.classList.add("miltzidden")

                    } else {
                        env.rpg.grid.createTileEffect({
                            tiles, 
                            effect: "burning",
                            length: 100,
                            origin: this.status.affecting
                        })

                        this.status.affecting.sprite.classList.add("collapsed")
                    }

                    this.status.affecting.hp = 0
                    this.status.incomingMult = false
                    updateStats({actor: this.status.affecting})
                }
            },

            //not on death because we 'last stand' this guy
            //only triggers once on a hit that bypasses mults
            onStruck: function({subject, attack, beneficial}) { 
                console.log(this.status.triggered, attack)
                if(this.status.triggered || attack == 0) return;
                this.status.trigger()
            }, 
        },
    },

    //miltza event controller
    boss_miltza: {
        slug: "boss_miltza",
        name: "miltzone",
        infinite: true,
        silent: true,
        outgoingCrit: -100,
        events: {
            onTurn: function() {
                if(this.status.affecting.state == "lastStand") return;
                if(!env.rpg.lastMiltzaSend) env.rpg.lastMiltzaSend = -1000;
                if((env.rpg.turnData.turn - env.rpg.lastMiltzaSend > 4) && this.status.affecting.piece) {
                    let face = ['downface', 'upface', 'rightface', 'leftface'].sample()
                    if(env.rpg.lastMiltzaSend == 1000) face = "downface"

                    env.rpg.grid.createTileEffect({
                        tiles: env.rpg.grid.tilesByType[face], 
                        effect: "projectile_evilobserve",
                        anchorType: "tile",
                        anchorCoordinates: this.status.affecting.piece.tile.coordinates,
                        origin: this.status.affecting,
                        data: {
                            direction: face.replace("face", "")
                        }
                    })

                    env.rpg.effectMessage.action({
                        user: this.status.affecting,
                        target: this.status.affecting,
                        action: `%USER observes the area...`
                    })

                    env.rpg.lastMiltzaSend = env.rpg.turnData.turn
                }
            },

            onLastStand: function() { 
                env.rpg.halt = true
                flash(true)
                setTimeout(()=>{
                    env.rpg.neutralTeam.members.forEach(m=>m.originalSlug == "destructible_minishelf" ? midCombatActorRemove(m, {fast: true}) : 0)

                    //edge protection
                    if(env.rpg.actors.cavik.state != "living") {
                        env.rpg.actors.cavik.hp = 15
                        combatRevive(env.rpg.actors.cavik, {location: "spawn"})
                    }

                    setTimeout(() => {
                        env.rpg.actors.split_miltza.piece.moveToCoords(7, 7);
                        env.rpg.actors.cavik.piece.moveToCoords(7,5);
                        env.rpg.grid.tileEffects.forEach(e => env.rpg.grid.deleteTileEffect(e))
                        startDialogue("spine_miltzabyebye")
                    }, 100);
                }, 600)
            }
        },
    },

    unnatural_carapace: {
        slug: "unnatural_carapace",
        name: "Unnatural Carapace",
        incomingFlat: -2,
        knockmod: -2,
        beneficial: true,
        help: "-2 base incoming damage, +2KB resistance, puncture immunity\ncreate dangerous area around self\nreduced by notable explosion",
        tickType: "special",
        events: { // ticked down via special_bomb_detonate_victim

            //gets a danger field
            onCreated: function({statusObj}) {
                if(statusObj != this.status) return;

                setTimeout(()=> this.status.tileEffect = env.rpg.grid.createTileEffect({
                    tiles: env.rpg.grid.markTiles({
                        originTile: this.status.affecting.piece.tile, 
                        shape: "square",
                        size: 1,
                        ignoresObstacles: true,
                        ignoresLOS: true,
                        includesOrigin: false
                    }), 
                    effect: "antimelee",
                    anchorType: "origin",
                    specialClass: "charge",
                    length: 1,
                    origin: this.status.affecting,
                }), 100)
            },

            onStruck: function() { if(this.status.duration == 0) {removeStatus(this.status.affecting, this.status.slug)} },
            onTurn: function() { if(this.status.duration == 0) {removeStatus(this.status.affecting, this.status.slug)} },
            
            onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == this.status.slug) {
                    let c = addStatus({target: this.status.affecting, status: "carapace"})
                    if(c) c.infinite = true;
                    updateStats()

                    env.rpg.grid.deleteTileEffect(this.status.tileEffect)
                }
            },
            
            onBeforeAddStatus: function(context) {
                if(context.status == "puncture") {
                    context.noAdd = true

                    env.setTimeout(()=>
                        env.rpg.effectMessage.action({
                            user: this.status.affecting,
                            target: this.status.affecting,
                            reason: "attention",
                            action: `'%TARGET';'${context.status.toUpperCase()} immunity';'from ${this.status.name.toUpperCase()}'`
                        }), 
                    100)
                }
            },
        },
    },

    /* ep4 lesser mind revisit stuff */
    destructible_lesserpod: {
        slug: "destructible_lesserpod",
        name: "Pod Distortion",
        help: "",
        infinite: true,
        silent: true,
        passive: true,
        knockmod: -999,
        incomingToHit: 10,
        events: {
            onCreated: function({statusObj}) {
                if(statusObj != this.status) return;
                console.log("right here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                this.status.tileEffect = env.rpg.grid.createTileEffect({
                    tiles: env.rpg.grid.markTiles({
                        originTile: this.status.affecting.piece.tile, 
                        shape: "square",
                        size: 1,
                        ignoresObstacles: true,
                        ignoresLOS: true,
                        includesOrigin: true
                    }), 
                    effect: "pseudopiece",
                    anchorType: "origin",
                    length: 1,
                    origin: this.status.affecting,
                })
            },

            //not on death because we very briefly do a 'last stand' to animate destruction and handle some stuff
            onStruck: function({subject, attack, beneficial}) { 
                if(this.status.triggered || this.status.affecting.hp != 0) return;
                this.status.triggered = true
                
                this.status.tileEffect.tiles.forEach(tile=>{
                    if(!tile.classList.contains("damagetile")) tile.classList.remove("hardblocks", "blocks", "notile", "fakelos", "noborder")
                })

                this.status.affecting.lastStand = false
                this.status.affecting.state = "living"
                this.status.affecting.hp = 0
                updateStats({actor: this.status.affecting})
            }, 

            onDeath: function() {
                env.rpg.grid.deleteTileEffect(this.status.tileEffect)
                if(env.rpg.currentActor.team.name == "ally" && !env.rpg.turnData.acted && env.rpg.currentActor.piece) env.rpg.currentActor.piece.startMovement() // refreshes in case they're nearby
            }
        },
    },

    lesserboss_alternating: {
        slug: "lesserboss_alternating",
        name: "Reunited",
        passive: true,
        infinite: true,
        help: "shares HP with other foes\nchanges actions after 100HP lost\nimmune to edge distortion",
        icon: "/img/sprites/combat/statuses/reunited.gif",
        events: {
            onCreated: function({statusObj}) {
                if(env.rpg.scenario.name != "ep4_lesserboss") return;
                if(statusObj == this.status) {
                    this.status.affecting.baseActions = this.status.affecting.actions
                    this.status.alternated = false
                    this.status.lastAlternate = 150 // hp-based
                }
            },

            onTurn: function() { 
                if(env.rpg.scenario.name != "ep4_lesserboss") return;
                //this used to alternate more
                if(!this.status.alternated && (this.status.lastAlternate - this.status.affecting.hp) >= 75) {
                    if(this.status.alternated) {
                        this.status.affecting.actions = this.status.affecting.baseActions;
                        this.status.alternated = false
                    } else {
                        this.status.affecting.actions = this.status.affecting.altActions;
                        this.status.alternated = true
                    }

                    env.rpg.effectMessage.action({
                        user: this.status.affecting,
                        target: this.status.affecting,
                        reason: "alternating",
                        isMinor: true,
                        action: `%USER is changing their approach...`
                    })
                    
                    this.status.lastAlternate = this.status.affecting.hp
                }
            },

            onCombatHit: function() {
                if(!this.status.affecting.hp || this.status.affecting.hp == NaN) this.status.affecting.hp = 0;

                let conjoined = env.rpg.turnOrder.filter(actor=>hasStatus(actor, "lesserboss_alternating"))
                conjoined.forEach(actor => {
                    actor.hp = this.status.affecting.hp
                })

                updateStats({actors: conjoined})
            },

            onLastStand: function() {
                env.rpg.halt = true
                env.rpg.phaseChange = ()=>{
                    let centerActor = env.rpg.grid.tilesByType.center[0]?.piece?.actor
                    if(centerActor) {
                        if(centerActor.originalSlug == "destructible_lesserpod") {
                            env.rpg.halt = false
                            centerActor.hp = 0
                            combatHit(centerActor, {amt: 100})
                            centerActor.statusEffects[0].events.onStruck({})
                        } else {
                            centerActor.piece.knockback({strength: 6, ignoreMods: true, direction: "down"})
                        }
                    }

                    env.rpg.grid.tileEffects.forEach(e=>{
                        if(e.slug == "telegraph" || e.slug.includes("projectile")) env.rpg.grid.deleteTileEffect(e)
                    })

                    setTimeout(()=>{
                        setTimeout(()=>{
                            midCombatActorAdd(env.rpg.enemyTeam, "lesser_itzka")
                        }, 400)

                        setTimeout(()=>{
                            env.rpg.actors.lesser_itzka.piece.moveToTile(env.rpg.grid.tilesByType.center[0])
                        }, 1000)

                        midCombatActorRemove(env.rpg.actors.lesser_kivii)
                        midCombatActorRemove(env.rpg.actors.lesser_itzil)
                    }, 100)
                }

                startDialogue("lesserboss_phase")
            }
        },
    },

    lesserboss_overlap_collapse: {
        slug: "lesserboss_overlap_collapse",
        name: "Overlap Collapse",
        passive: true,
        infinite: true,
        help: "slowly collapsing combat stage",
        icon: "/img/sprites/combat/statuses/overlap_collapse.gif",
        events: {
            onLastStand: function() {
                env.rpg.halt = true
                env.rpg.classList.add('hideteams')
                startDialogue("lesserfinal")
            }
        },
    },

    desperation: { 
        slug: "desperation",
        name: "Last Stand",
        icon: "/img/sprites/combat/passives/fated_last_stand.gif",
        infinite: true,
        beneficial: true,
        passive: true,
        outgoingFlat: 1,
        outgoingToHit: 0.5,
        outgoingCrit: 0.5,
        incomingToHit: -0.33,
        help: `this is it.\nfocused status is infinite\nbroadly increases strength\nautomatically revive self, once`,
        
        events: {
            onCreated: function({statusObj}) {
                if(statusObj == this.status) {
                    this.status.affecting.lastStand = true
                } else if(statusObj.slug == "focused") {
                    statusObj.infinite = true
                }
            },

            //quietly boost evasion at low HP for drama if this is in the 1v1
            onBeforeCombatHit: function(context) {
                if(this.status.affecting.slug != "akizet") return;

                if(this.status.affecting.hp <= 6) {
                    this.status.incomingToHit = -0.66
                } else {
                    this.status.incomingToHit = -0.33
                }
            },           

            //we give ally characters a second chance, once
            //unless they're NPCs, then we let them quietly cheat. Because
            onTurn: function() {
                if(this.status.affecting.state == "lastStand") {
                    this.status.affecting.hp = 8
                    if(!this.status.affecting.npc) this.status.affecting.lastStand = false
                    this.status.affecting.state = "living"
                    this.status.affecting.sprite.classList.remove('last-stand')
                    this.status.affecting.box.classList.remove('last-stand')

                    if(!env.rpg.effectMessage.current) env.rpg.effectMessage.initialize()
                    env.rpg.effectMessage.action({
                        user: this.status.affecting,
                        target: this.status.affecting,
                        hit: "crit",
                        reason: "LAST STAND",
                        action: `%USER presses on through their wounds...`,
                        isMinor: true
                    })
                    
                    addStatus({target: this.status.affecting, origin: this.status.affecting, status: "evasion", length: 1, noReact: true, noUpdate: true})
                    addStatus({target: this.status.affecting, origin: this.status.affecting, status: "focused", length: 2, noReact: true, noUpdate: true})
                    addStatus({target: this.status.affecting, origin: this.status.affecting, status: "empowered", length: 3, noReact: true, noUpdate: true})
                    this.status.passiveIconElement.style.setProperty('--img', "url(/img/sprites/combat/passives/fated_last_stand_spent.gif)")
                    updateStats({actor: this.status.affecting})
                }
            }, 
        },
    },
    
    destructible_epicenter_vein: {
        slug: "destructible_epicenter_vein",
        name: "Ceremony Vein",
        help: "",
        infinite: true,
        silent: true,
        passive: true,
        persist: true,
        skipTurn: true,
        hardSkip: true,
        knockmod: -999,
        incomingToHit: 10,
        events: {
            onCreated: function({statusObj}) {
                if(statusObj != this.status) return;
                setTimeout(()=>{
                    let direction = "up"
                    if(["W, E"].includes(this.status.affecting.piece.tile.getAttribute("slug"))) {
                        direction = "right"
                    }
                    
                    this.status.tileEffect = env.rpg.grid.createTileEffect({
                        tiles: env.rpg.grid.markTiles({
                            originTile: this.status.affecting.piece.tile, 
                            shape: "custom",
                            customShape: `xox`,
                            direction,
                            ignoresObstacles: true,
                            ignoresLOS: true,
                        }), 
                        effect: "pseudopiece",
                        anchorType: "origin",
                        length: 1,
                        origin: this.status.affecting,
                    })

                    this.status.tileEffect.tiles.forEach(t=>t.classList.remove("blocks"))
                }, 100)

                env.rpg.currentVein = this.status.affecting
            },

            //trigger the next event based on progress
            onLastStand: function() {
                // halt, start a dialogue based on prog
                this.status.affecting.sprite.classList.add('busted')
                let img1 = this.status.affecting.sprite.querySelector('img:first-child')
                let img2 = this.status.affecting.sprite.querySelector('img:last-child')

                img1.src = "/img/local/embassy/mind/ceremonyveintop_busted.gif"
                img2.src = "/img/local/embassy/mind/ceremonyveinbottomtwist_busted.gif?"

                switch(env.rpg.bossProgress) {
                    case 0:
                        env.rpg.halt = true
                        //first step forward - we spawn a wall
                        flash(true)
                        startDialogue("vekoa_p1")

                        env.rpg.enemyTeam.members.forEach(m=>{if(m.originalSlug.startsWith("arch_")) midCombatActorRemove(m)})

                        //clear da area
                        env.rpg.grid.markTiles({
                            originTile: env.rpg.grid.getTileFromCoordinates(8, 16),
                            shape: "square",
                            size: 3,
                            ignoreMods: true
                        }).forEach(tile=>{
                            if(tile?.piece) tile.piece.knockback({direction: "up", strength: 6})
                        })

                        midCombatActorAdd(env.rpg.enemyTeam, "vekoa_wall_tendril", "left")
                        midCombatActorAdd(env.rpg.enemyTeam, "vekoa_wall", "left")
                        midCombatActorAdd(env.rpg.enemyTeam, "vekoa_wall_tendril", "left")

                        updateStats()
                        vfx({type: "flash", state: false, delay: 1000})
                        env.rpg.bossProgress = 1
                        let vein = midCombatActorAdd(env.rpg.enemyTeam, "destructible_epicenter_vein", "left", {location: "southdril"})
                        addStatus({target: vein, status: "shroud"})
                        vein.sprite.style.transform = "rotateZ(180deg)"

                        midCombatActorRemove(this.status.affecting, {noSpriteRemoval: true})

                    break

                    //we used to do more with this
                }

                env.rpg.grid.deleteTileEffect(this.status.tileEffect)
                midCombatActorRemove(this.status.affecting, {noSpriteRemoval: true})
            }
        },
    },

    vekoa_golem: {
        slug: "vekoa_golem",
        name: "Protector",
        help: "keeping veins incorporeal",
        infinite: true,
        passive: true,
        persist: true,
        knockmod: -999,
        icon: "/img/sprites/combat/statuses/protector.gif",
        incomingToHit: 10,
    },

    /* ep4 special focus combo for vekoa fight */
    boss_vekoa: {
        slug: "boss_vekoa",
        name: "vekoaaaa",
        infinite: true,
        silent: true,
        persist: true,
        events: {
            onCreated: function({statusObj}) {
                if(statusObj != this.status) return;

                //todo: not sure if i'll do anything with this yet just having it here for da moment
                switch(env.rpg.scenario.name) {
                    case "ep4_vek_pt2":

                    break
                    case "ep4_vek_pt4":

                    break
                    case "ep4_vek_pt6":

                    break
                }
            },

            onTurn: function() {
                let akizet = env.rpg.actors.akizet
                let vekoa = env.rpg.actors.vekoa_1v1

                let subsequentTurn = env.rpg.currentActor == env.rpg.lastActor
                if(!subsequentTurn) return;

                let laserCount = 2

                switch(env.rpg.scenario.name) {
                    case "ep4_vek_pt6":
                        laserCount = 4

                    //starting in pt4, she starts marking telegraphs
                    case "ep4_vek_pt4":
                        
                        /*
                        //on her second turn, we'll make a telegraph on her that's either push or pull
                        let type, effectExec
                        if(Math.random() > 0.5) {
                            type = "push"
                            effectExec = () => {
                                akizet.piece.knockback({
                                    direction: vekoa.piece.tile.getRelativeDirection(akizet.piece.tile),
                                    strength: 1
                                })

                                env.rpg.effectMessage.action({
                                    user: vekoa,
                                    target: akizet,
                                    isMinor: true,
                                    action: `%USER knocks %TARGET back!`
                                })
                            }
                            
                        } else {
                            type = "pull"
                            effectExec = () => {
                                akizet.piece.knockback({
                                    direction: akizet.piece.tile.getRelativeDirection(vekoa.piece.tile),
                                    strength: 1
                                })

                                env.rpg.effectMessage.action({
                                    user: vekoa,
                                    target: akizet,
                                    isMinor: true,
                                    action: `%USER pulls %TARGET in!`
                                })
                            }
                        }

                        env.rpg.effectMessage.action({
                            user: vekoa,
                            target: akizet,
                            action: `%USER is preparing to ${type}`
                        })
                        
                        let effect = env.rpg.grid.createTileEffect({
                            tiles: [this.status.affecting.piece.tile], 
                            effect: "telegraph",
                            telegraphExec: effectExec,
                            telegraphAnim: "telegraph",
                            anchorActor: vekoa,
                            anchorType: "actor",
                            specialClass: `kiviismash`,
                            length: 1,
                            origin: vekoa
                        })
                        */

                        //then, create projectiles - if it's push, they're ally tick. if it's pull, they're enemy tick
                        //second, select a direction and pull projectiles inwards from the sides
                        let direction = ["upshoot", "leftshoot", "rightshoot", "downshoot"].sample()
                        let selections = [...env.rpg.grid.tilesByType[direction]]
                        let tiles = []

                        //2 on regular, 4 in the last stand
                        for (let i = 0; i < laserCount; i++) {
                            tiles.push(selections.sample({remove: true}))
                        }

                        //finally, get all tiles of that type, and fire inwards in the direction (string - shoot)
                        let projEffect = env.rpg.grid.createTileEffect({
                            tiles, 
                            anchorType: "tile",
                            effect: `projectile_itzka`, 
                            length: 3, 
                            origin: vekoa,
                            data: {
                                turnTickType: Math.random() > 0.5 ? "ally" : "enemy",
                                direction: direction.replace("shoot", "")
                            }
                        })
                    break
                }
            }
        },
    },
    
    hyperfocus: { 
        slug: "hyperfocus",
        name: "Hyperfocus",
        incomingToHit: -0.8,
        incomingCrit: -0.8,
        outgoingToHit: 1,
        outgoingCrit: 4,
        moveMod: 1,
        beneficial: true,
        help: "-80% IN:HIT% & IN:CRIT%, +100% HIT%, +400% CRIT%, +1 MOVE, STUN IMMUNITY",
        tickType: "onTurnEnd",

        events: {
            onBeforeAddStatus: function(context) {
                if(context.status == "stun") {
                    context.noAdd = true

                    env.setTimeout(()=>
                        env.rpg.effectMessage.action({
                            user: this.status.affecting,
                            target: this.status.affecting,
                            reason: "attention",
                            action: `'%TARGET';'${context.status.toUpperCase()} immunity';'from ${this.status.name.toUpperCase()}'`
                        }), 
                    100)
                }
            },
        }
    },

    //faking non-controlled allies cause i cba to rewrite enemy turn to be team agnostic right now
    autoplay_telyu: { 
        slug: "autoplay_telyu",
        name: "Disconnected",
        beneficial: true,
        help: "acting of her own volition",
        icon: "/img/sprites/combat/statuses/disconnected.gif",
        infinite: true,
        persist: true,

        events: {
            onCreated: function({statusObj}) {
                if(statusObj.slug == this.status.slug) {
                    setTimeout(()=>this.status.affecting.piece.classList.add('npc'), 300)
                }
            },

            onTurn: function({cutsceneCall = false} = {}) { // cutsceneCall is an arbitrary var used in cutscene, don't treat this as a new thing
                let telyu = this.status.affecting
                telyu.npc = true

                setTimeout(()=>{
                    if(env.rpg.currentActor == telyu) {
                        //select a random enemy nearby. if none, we cheat and throw her
                        let targets = env.rpg.grid.markTiles({originTile: env.rpg.actors.telyu.piece.tile, size: 4, pleaseReturn: "actors"}).filter(t => {
                            //avoid targeting invincible goobers
                            return t.team.name != "ally" && !hasStatus(t, "shroud")
                        })
                        
                        let target
                        if(targets.length) {
                            target = targets.sample()
                            if(target?.piece?.tile) {
                                let direction = target.piece.tile.getRelativeDirection(telyu.piece.tile)
                                let tile = target.piece.tile.getClosestOpenTile({direction})
                                telyu.piece.teleportToTile(tile)
                                setTimeout(()=>chooseTarget(telyu, env.ACTIONS.disabler_pulse, target), 700)
                            } else {
                                advanceTurn(telyu)
                            }
                        } else {
                            target = env.rpg.allyTeam.members.sample()
                            if(target?.piece?.tile) {
                                let direction = target.piece.tile.getRelativeDirection(telyu.piece.tile)
                                let tile = target.piece.tile.getClosestOpenTile({direction})
                            
                                telyu.piece.animateToTile(tile, {animation: "tossed", follow: true, duration: 1000, endCallback: ()=>{
                                    setTimeout(()=>chooseTarget(telyu, env.ACTIONS.evade, target), 700)
                                }})
                            } else {
                                setTimeout(()=>chooseTarget(telyu, env.ACTIONS.evade, target), 400)
                            }
                        }

                    }
                }, env.ADVANCE_RATE)
            },
        }
    },

    autoplay_tozik: { 
        slug: "autoplay_tozik",
        name: "Disconnected",
        beneficial: true,
        help: "acting of his own volition",
        icon: "/img/sprites/combat/statuses/disconnected.gif",
        infinite: true,
        persist: true,
        outgoingCrit: 0.3,

        events: {
            onCreated: function({statusObj}) {
                if(statusObj.slug == this.status.slug) {
                    setTimeout(()=>this.status.affecting.piece.classList.add('npc'), 300)                    
                }
            },

            onTurn: function() {
                let tozik = this.status.affecting
                tozik.npc = true

                setTimeout(()=>{
                    if(env.rpg.currentActor == tozik) {
                        //select a random enemy nearby. if none, we cheat and throw him
                        let targets = env.rpg.grid.markTiles({originTile: tozik.piece.tile, size: 4, pleaseReturn: "actors"}).filter(t => {
                            //avoid targeting invincible goobers
                            return t.team.name != "ally" && !hasStatus(t, "shroud")
                        })
                        
                        let target, tile
                        let timeToRevive = env.rpg.allyTeam.members.filter(t=>t.state == "dead" && !t.npc).length >= 2

                        if(targets.length && !timeToRevive) { // attempt to do a chain of triple chain of corruskivi strikes on a target
                            target = targets.sample()
                            if(target?.piece?.tile) {
                                let direction = target.piece.tile.getRelativeDirection(tozik.piece.tile)
                                tile = target.piece.tile.getClosestOpenTile({direction})
                                tozik.piece.teleportToTile(tile)
                                setTimeout(()=>{
                                    for (let i = 0; i < 4; i++) {
                                        setTimeout(() => {
                                            if(i==3) {
                                                advanceTurn(tozik)
                                            } else if(target.state != "dead") {
                                                useAction(tozik, env.ACTIONS.tozik_attack, target)
                                            }
                                        }, i * 600)                                    
                                    }
                                }, 700)

                            } else {
                                advanceTurn(tozik)
                            }
                        } else { //otherwise, go to an ally with the lowest health and mend-focus them
                            target = env.rpg.allyTeam.members.filter(t=>t.state != "dead" && !t.npc).sample()

                            if(!timeToRevive && target?.piece?.tile) {
                                let direction = target.piece.tile.getRelativeDirection(tozik.piece.tile)
                                tile = target.piece.tile.getClosestOpenTile({direction})
                                
                                tozik.piece.animateToTile(tile, {animation: "tossed", follow: true, duration: 1000, endCallback: ()=>{
                                    setTimeout(()=>{
                                        env.rpg.grid.handleActionAOE({originActor: tozik, targetTile: target.piece.tile, action: env.ACTIONS.scene_mend})
                                        setTimeout(() => {
                                            advanceTurn(tozik)
                                        }, 400);
                                    }, 700)
                                }})
                            } else { // will rez downed teammates as a last resort
                                target = env.rpg.allyTeam.members.filter(t=>t.state == "dead").sample()
                                if(target) useAction(tozik, env.ACTIONS.restore, target)
                                setTimeout(()=>advanceTurn(tozik), 600)
                            }
                        }

                    }
                }, env.ADVANCE_RATE)
            },
        }
    },    

    /* informational only */
    kb: {
        slug: "kb",
        name: "Knockback",
        help: "immediate forced movement, transfers on impact",
        infinite: true,
        justForDisplay: true /* not exactly real statuses - just used for display in action descriptions */
    },

    bp: {
        slug: "bp",
        name: "Barrier",
        help: "temporary HP, limited to 1/2 max HP",
        infinite: true,
        justForDisplay: true /* not exactly real statuses - just used for display in action descriptions */
    },

    aiming_indicator: { // just used to add a sprite icon
        slug: "aiming_indicator",
        name: "aiming",
        help: "you should never see this",
        infinite: true,
        silent: true,
        justForDisplay: true,
        events: {
            GLOBAL_onDeath: function({originalEventTarget}) {
                if(originalEventTarget == this.status.origin) {
                    removeStatus(this.status.affecting, "aiming_indicator")
                }
            },
        }
    }
}



//library of common attack types
if(typeof env.GENERIC_ACTIONS == "undefined") env.GENERIC_ACTIONS = {
    //a regular single target attack/heal that may also apply a status on either hit or crit
    //also runs any on-x events specific to the action calling it for hits, misses, and crits
    singleTarget: ({
        action, 
        user, 
        target,
        type = 'hp',
        specialAmt = false, //you can specify an override damage amount with this
        specialCrit = false, //you can specify an override crit chance with this
        specialHit = false, // guess
        specialAutohit = false, // ?
        beneficial = false,
        canCrit = true,
        ignoreMods = false,

        hitSfx = {
            name: 'hit',
            rate: 1,
            volume: 1
        }, //same format for below - rate optional
        critSfx = false,
        missSfx = {name: "miss"},
        runHitEvents = true,

        hitStatus = false, /* {
            name,
            length
        }, ditto for below */
        critStatus = false,

        //optionally specific 'on x' functions
        //if critExec, won't do hitExec. use 'genExec' for any outcome
        hitExec, critExec, missExec, genExec
    }) => {
        if(!target) {
            console.log('SINGLE TARGET ACTION', action.name, 'from', user.name, 'got no/undefined target - not throwing error cause this might be fine'); 
            console.trace()
            return "none";
        }
        let effectiveTarget = target
        let initiallyDead = effectiveTarget.state == "dead"
        let hit = combatHit(effectiveTarget, {
            type, 
            amt: specialAmt || action?.stats?.amt || action.amt, 
            acc: specialHit || action.accuracy || action?.stats?.accuracy, 
            crit: !canCrit ? 0 : (specialCrit || action?.stats?.crit || action.crit), 
            origin: user, 
            autohit: specialAutohit || (action?.stats?.autohit || action.autohit), 
            beneficial, 
            runEvents: runHitEvents,
            ignoreMods
        })
        let reactType = 'evade'

        if(env.rpg.lastRedirector) effectiveTarget = env.rpg.lastRedirector

        if(!canCrit && hit == "crit") hit = true

        switch(hit) {
            case "crit":
                if(beneficial) crit = 'critbuff' //adjusts response on return
                
                if(critSfx) play(critSfx.name, critSfx.rate);
                else if(beneficial) play(hitSfx.name, hitSfx.rate, hitSfx.volume)
                else playCombatCrit()

                if(critStatus) {
                    reactType = `receive_${critStatus.name}`
                    addStatus({target: effectiveTarget, origin: user, status: critStatus.name, length: critStatus.length, noReact: true})
                } else reactType = beneficial ? 'receive_buff': 'receive_crit'
                
                if(hitStatus) {
                    reactType = `receive_${hitStatus.name}`
                    addStatus({target: effectiveTarget, origin: user, status: hitStatus.name, length: hitStatus.length, noReact: true})
                } else reactType = beneficial ? 'receive_buff': 'hit'

                if(typeof critExec == 'function') critExec({user, target: effectiveTarget})
                if(typeof hitExec == 'function') hitExec({user, target: effectiveTarget})
            break

            case true:
                play(hitSfx.name, hitSfx.rate, hitSfx.volume)
                if(hitStatus) {
                    reactType = `receive_${hitStatus.name}`
                    addStatus({target: effectiveTarget, origin: user, status: hitStatus.name, length: hitStatus.length, noReact: true})
                } else reactType = beneficial ? 'receive_buff': 'hit'

                if(typeof hitExec == 'function') hitExec({user, target: effectiveTarget})
            break

            case false:
                play(missSfx.name, missSfx.rate)
                if(typeof missExec == 'function') missExec({user, target: effectiveTarget})
            break
        }

        //only have the target react if they weren't dead to begin with - this is relevant for revives
        if(!initiallyDead) reactDialogue(effectiveTarget, reactType)
        if(typeof genExec == 'function') genExec({user, target: effectiveTarget})

        return hit
    },

    //runs through the members of a specified team at a ADVANCE_RATE based speed and acts upon them in some way
    teamWave: ({
        user,
        team,
        arbitraryActorList, // can take an arbitrary list of combat actors to use instead, i.e. both teams joined or something
        exec,
        advanceAfterExec,
        extraDelay = 100,
        endCallback,
        beingUsedAsync
    }) => {
        let effectiveList = arbitraryActorList ? arbitraryActorList : team.members

        effectiveList.forEach(function(actor, i) {
            if(actor.state != "dead" && actor.state != "lastStand") {
                let delay = ((env.ADVANCE_RATE * 0.1) + extraDelay) * i;
                setTimeout(()=>exec(actor, i), delay);
            }
        });

        if(advanceAfterExec && !beingUsedAsync) setTimeout(()=>{
            console.log("ADVANCE - teamWave")
            advanceTurn(user)
            if(typeof endCallback == "function") endCallback()
        }, (((env.ADVANCE_RATE * 0.1) + extraDelay) * effectiveList.length) + env.ADVANCE_RATE * 0.5); //adds 0.2AR for each actor, then a little delay on that! just so it's clear who gets hit
    }
}

//offers a 'choice' to the player during an enemy's attack
//'choiceText' is a string, it's the text at the top of the choice
//'options' is an array of {text, definition} objects
//'choiceCallback' is what to do after a choice is made, the choice is passed in order ('c0', 'c1', etc)
//'user' is the user actor object
//'action' is the action object for references to animations
function actionChoice({choiceText = "choice", options = [], choiceCallback, user, action}) {
    if(action.choiceAnim) {user.sprite.classList.add(action.choiceAnim)}
    let id = `${user.slug}-${action.slug}`

    let choices = ""
    options.forEach((option, i) => {
        console.log(option)
        if(option.text) choices += `<span choice="c${i}" class="button" definition="${option.definition}">${option.text}</span>`
    })

    console.log(choices)
    env.rpg.insertAdjacentHTML('beforeend', `
        <div id="${id}" class="choice-attack">
            <div class="choice-title">${choiceText}</div>
            ${choices}
        </div>
    `)

    env.rpg.querySelectorAll(`#${id}.choice-attack .button`).forEach(el=>{
        el.addEventListener('click', ()=>{
            let choice = el.getAttribute('choice')
            document.querySelector(`#${id}`).remove()
            if(action.choiceAnim) {user.sprite.classList.remove(action.choiceAnim)}

            //so this happens after the fade back from the offer animation    
            //the choice should be acted upon somehow, likely through a switch        
            setTimeout(()=>choiceCallback(choice), action.choiceAnimDuration || 1)
        })
    })
}

if(typeof env.ITEM_EXEC == "undefined") env.ITEM_EXEC = {
    restorative: (target) => {
        delete target.hp
        play('mend')
        removeItem(env.ITEM_LIST.restorative)
        if(env.crittaMenu) if(env.crittaMenu.style.opacity == 1) toggleCrittaMenu()
    },

    orderedFish: () => {
        if(!env.crittaMap) return printError("no map yet stupid", true);
        let component = env.crittaMap.possibleZoneComponents.sample()
        let modifier = component.combatModifiers.sample()
        env.crittaMap.querySelectorAll("critta-node:not([difficulty='4'])").forEach(node=>{
            node.setAttribute("component", component.slug)
            node.component = component
            node.modifier = env.MODIFIERS[modifier]
            node.setAttribute("modifier", modifier)
        })
        play('chomp')
        removeItem(env.ITEM_LIST.fish_order)
    },

    gleeFish: () => {
        if(!env.crittaMap) return printError("no map yet stupid", true);
        env.crittaMap.adjustModQty("global_megaglee", "+", 1)
        play('talkfairy', 0.5)
        removeItem(env.ITEM_LIST.fish_glee)
    },

    loneFish: (target) => {
        if(!target.alterations) target.alterations = []
        if(target.alterations.find(alteration => alteration[2] == "SOLO")) {
            chatter({actor: 'sourceless', text: `the shell refuses, having lost their taste for this fish.`, readout: true, sfx: false})
            return play('muiClick', 2);
        }

        let inventory = page.party.inventory
        page.party = [target]
        page.party.inventory = inventory

        target.alterations.push(["STATUS", "fish_solo", "SOLO"])

        let hpAlter = target.alterations.find(alter => alter[0] == "maxhp")
        if(hpAlter) hpAlter[1] += 30;
        else target.alterations.push(["maxhp", 30])

        delete target.hp

        env.e3a2.updateTubes()
        play('chomp')
        removeItem(env.ITEM_LIST.fish_lone)
        if(env.crittaMenu) if(env.crittaMenu.style.opacity == 1) toggleCrittaMenu()
    },

    intrusiveFish: (target) => {
        if(!target.alterations) target.alterations = []
        if(target.alterations.find(alteration => alteration[2] == "WHEELFISH")) {
            chatter({actor: 'sourceless', text: `the shell refuses, having lost their taste for this fish.`, readout: true, sfx: false})
            return play('muiClick', 2);
        }
        
        target.alterations.push(["STATUS", "fish_trusive", "WHEELFISH"])
        play('talkfairy', 2)
        removeItem(env.ITEM_LIST.fish_wheel)
        if(env.crittaMenu) if(env.crittaMenu.style.opacity == 1) toggleCrittaMenu()
    },

    anglerFish: (target) => {
        if(!target.alterations) target.alterations = []
        if(target.alterations.find(alteration => alteration[2] == "ANGLER")) {
            chatter({actor: 'sourceless', text: `the shell refuses, having lost their taste for this fish.`, readout: true, sfx: false})
            return play('muiClick', 2);
        }
        
        target.alterations.push(["STATUS", "fish_angler", "ANGLER"])
        play('chomp', 2)
        removeItem(env.ITEM_LIST.fish_angler)
        if(env.crittaMenu) if(env.crittaMenu.style.opacity == 1) toggleCrittaMenu()
    },

    bombFish: (target) => {
        if(!target.alterations) target.alterations = []
        if(target.alterations.find(alteration => alteration[2] == "BOMBFISH")) {
            chatter({actor: 'sourceless', text: `the shell refuses, having lost their taste for this fish.`, readout: true, sfx: false})
            return play('muiClick', 2);
        }

        if(!target.alterations) target.alterations = []
        target.alterations.push(["ADD", "detonate", "BOMBFISH"])
        play('talkfairy', 2)
        removeItem(env.ITEM_LIST.fish_ruka)
        if(env.crittaMenu) if(env.crittaMenu.style.opacity == 1) toggleCrittaMenu()
    },

    sniperFish: (target) => {
        if(!target.alterations) target.alterations = []
        if(target.class == "Sniper") {
            chatter({actor: 'sourceless', text: `the shell refuses, having no taste for this fish.`, readout: true, sfx: false})
            return play('muiClick', 2);
        }

        play('chomp')

        //remove existing class 
        if(target.class) {
            target.alterations = target.alterations.filter(alt=>alt[2] != target.class)
        }

        delete target.components
        target.class = "Sniper"
        target.critta = true

        target.alterations.push(["primary", "unfocused_shot", "Sniper"])
        target.alterations.push(["secondary", "windup_cover", "Sniper"])
        target.alterations.push(["REMOVE", "evade", "Sniper"])
        target.alterations.push(["ADD_WINDUP", "focused_shot", "Sniper"])
        target.alterations.push(["ADD_WINDUP", "hold_aim", "Sniper"])
        target.alterations.push(["STATUS", "visionary_geli", "Sniper"])
        env.e3a2.updateExchangeScreen()
        play('chomp')
        removeItem(env.ITEM_LIST.fish_sniper)
        if(env.crittaMenu) if(env.crittaMenu.style.opacity == 1) toggleCrittaMenu()
    },

    mimicFish: (target) => {
        if(!target.alterations) target.alterations = []
        if(target.class == "Mimic") {
            chatter({actor: 'sourceless', text: `the shell refuses, having no taste for this fish.`, readout: true, sfx: false})
            return play('muiClick', 2);
        }

        play('chomp')


        //remove existing class 
        if(target.class) {
            target.alterations = target.alterations.filter(alt=>alt[2] != target.class)
        }

        delete target.components
        target.class = "Mimic"
        target.critta = true

        target.alterations.unshift(["primary", "incoherent_mimic", "Mimic"])
        target.alterations.unshift(["REMOVE", "secondary", "Mimic"])
        target.alterations.unshift(["REMOVE", "evade", "Mimic"])
        target.alterations.push(["STATUS", "fish_mimic", "Mimic"])

        env.e3a2.updateExchangeScreen()
        play('chomp')
        removeItem(env.ITEM_LIST.fish_mimic)
        if(env.crittaMenu) if(env.crittaMenu.style.opacity == 1) toggleCrittaMenu()
    },

    normalFish: (target) => {
        if(!target.alterations) target.alterations = []
        if(!target.class) {
            chatter({actor: 'sourceless', text: `the shell refuses, having no taste for this fish.`, readout: true, sfx: false})
            return play('muiClick', 2);
        }

        play('chomp')
        setTimeout(() => play('chomp', 0.4), 800)
        setTimeout(() => play('chomp', 0.5), 500)
        setTimeout(() => play('chomp', 0.6), 250)
        setTimeout(() => play('chomp', 0.7), 100)
        setTimeout(() => play('chomp', 0.8), 50)
        setTimeout(() => play('chomp', 0.9), 25)

        //remove existing class 
        if(target.class) {
            target.alterations = target.alterations.filter(alt=>alt[2] != target.class)
            delete target.class
        }

        target.components = {}
        env.e3a2.updateExchangeScreen()
        removeItem(env.ITEM_LIST.fish_normal)
        if(env.crittaMenu) if(env.crittaMenu.style.opacity == 1) toggleCrittaMenu()
    }
}

//can limit use of item based on actor with usableBy: [actorslug, actorslug]
    // note from corru a year after writing support for "usableBy": why did I do that it's not even used
if(typeof env.ITEM_LIST == "undefined") env.ITEM_LIST = {
    restorative: {
        slug: "restorative",
        name: "Restorative Cyst",
        image: "/img/sprites/combat/items/restorative_dither.gif",
        description: `'quick-acting repair cyst';'best used away from danger'`,
        combatAction: env.ACTIONS.restore,
        group: "support",
        oocnote: "'restores target to full health'",
        type: 'target',
        exec: "restorative",
        max: 12,
        batches: 3
    },

    satik_cyst: {
        slug: "satik_cyst",
        name: "Satik Cyst",
        image: "/img/sprites/combat/items/satik_dither.gif",
        group: "support",
        description: `'contains rapid temporary ablative barrier applicators';'named after hardy veilk parasite';'break in case of emergency'`,
        combatAction: env.ACTIONS.special_strong_barrier_allies,
        sceneAction: env.ACTIONS.scene_satik,
        max: 12,
        batches: 3
    },

    aima_cyst: {
        slug: "aima_cyst",
        name: "Aima Cyst",
        image: "/img/sprites/combat/items/aimacyst_dither.gif",
        group: "offense",
        description: `'receptor-tied targeting cyst';'traditional hunting implement';'useful for multitasking'`,
        combatAction: env.ACTIONS.special_spy_all,
        max: 10,
        batches: 2
    },

    kavruka: {
        slug: "kavruka",
        name: "Kavruka",
        image: "/img/sprites/combat/items/kavruka_dither.gif",
        group: "offense",
        description: `'deconstruction tool';'named after non-corrucystic surface fauna';'notoriously explosive'`,
        combatAction: env.ACTIONS.special_attack_all,
        sceneAction: env.ACTIONS.scene_kavruka,
        max: 12,
        batches: 2
    },

    disabler: {
        slug: "disabler",
        name: "Disabler",
        image: "/img/sprites/combat/items/disabler_dither.gif",
        group: "offense",
        rarity: "rare",
        description: `'emergency security device';'injects self-destructive thoughtform';'for industrial use only';'quite rare'`,
        combatAction: env.ACTIONS.disabler_pulse,
        max: 8,
        batches: 2
    },
    
    drill: {
        slug: "drill",
        name: "CMD::DRILL",
        image: "/img/sprites/combat/items/malwarem_dither.gif",
        group: "offense",
        rarity: "rare",
        description: `'single-use thoughtspace modification';'enforces harsher ruleset'`,
        combatAction: env.ACTIONS.special_malware_drill,
        max: 3,
        batches: 1
    },
    
    rot: {
        slug: "rot",
        name: "CMD::ROT",
        image: "/img/sprites/combat/items/malware_dither.gif",
        group: "offense",
        rarity: "rare",
        description: `'single-use thoughtspace modification';'enforces harsher ruleset'`,
        combatAction: env.ACTIONS.special_malware_rot,
        max: 3,
        batches: 1
    },
    
    rewrite: {
        slug: "rewrite",
        name: "CMD::REWRITE",
        image: "/img/sprites/combat/items/malwarew_dither.gif",
        group: "support",
        rarity: "rare",
        description: `'single-use thoughtspace processor';'alter combat for more favorable outcome'`,
        combatAction: env.ACTIONS.special_malware_rewrite,
        max: 6,
        batches: 2
    },
    
    empower: {
        slug: "empower",
        name: "CMD::EMPOWER",
        image: "/img/sprites/combat/items/malwarec_dither.gif",
        group: "support",
        rarity: "rare",
        description: `'single-use thoughtspace processor';'alter combat for more favorable outcome'`,
        combatAction: env.ACTIONS.special_malware_empower,
        max: 6,
        batches: 2
    },

    sfer_cube: {
        slug: "sfer_cube",
        name: "Sfer Cube",
        image: "/img/sprites/combat/items/cube_dither.gif",
        description: `'condensed corrucystic fuel';'valid currency';'the foundation of all things'`,
        max: 999,
        batches: 1
    },

    cool_orb_thingy: {
        slug: "cool_orb_thingy",
        name: "Cool Orb Thingy",
        image: "/img/sprites/combat/items/guncyst_dither.gif",
        description: `'labelled "ON THE USE OF BRIGHT WEAPONRY"';'receptor-locked'`,
        max: 1,
        batches: 1
    },

    scary_black_box: {
        slug: "scary_black_box",
        name: "Scary Black Box",
        image: "/img/sprites/combat/items/redbox_dither.gif",
        description: `'cousinly container made from tough dead material'`,
        max: 1,
        batches: 1
    },

    sorry_cyst: {
        slug: "sorry_cyst",
        name: "Sorry Cyst",
        image: "/img/sprites/combat/items/sorry_dither.gif",
        description: `'a damaged golem weapon schematic';'the inscription reads, "<span class='code' definition="INHERITED CONTEXT::'meet me in the uncosm'">sorry</span>"'`,
        max: 1,
        batches: 1
    },

    //golem maintenance expansion
    golem_sfer: {
        slug: "golem_sfer",
        name: "Golem Sfer",
        image: "/img/sprites/combat/items/specialsferknowledge.gif",
        description: `'dense segmented sfer used in golem body creation';'knowledge of location';'feasibly used to create a new body for itzil and karik'`,
        max: 1,
        batches: 1
    },
    
    golem_parts: {
        slug: "golem_parts",
        name: "Golem Parts",
        image: "/img/sprites/combat/items/golempartknowledge.gif",
        description: `'large number of golem components';'knowledge of location';'feasibly used to create a new body for itzil and karik'`,
        max: 1,
        batches: 1
    },
    
    core_translation: {
        slug: "core_translation",
        name: "Signal Export",
        image: "/img/sprites/combat/foes/translator_orb.gif",
        description: `'a dangerously incoherent knowledge corrucyst';'contains some sort of interpretation of the signal';'gakvu can weaponize this'`,
        oocnote: ()=> check("PAGE!!embassy_day", 3.99) ? `'empowers DESTABILIZE action for party member';'gakvu'` : `'enables creation of SIGNAL INVERTER augment for party member';'gakvu'`,
        max: 1,
        batches: 1
    },
    
    error: {
        slug: "error",
        name: "Weird Black Box",
        group: "offense",
        image: "/img/sprites/combat/items/blackbox_dither.gif",
        description: `'cannot open';'why are we still carrying it';'quite heavy...'`,
        combatAction: env.ACTIONS.daze_good,
        group: "offense",
        max: 10,
        batches: 2
    },

    //FISHING
    fish_order: {
        slug: "fish_order",
        name: "Stray IDEA",
        imgClass: "fish",
        image: "/img/sprites/combat/items/idea.gif",
        description: `'stray daemon instructor';'may be activated and thrown to alter structure'`,
        oocnote: "'unifies all map nodes into using a single random modifier'",
        type: 'auto',
        exec: "orderedFish",
        group: "fish",
        max: 10,
        batches: 1
    },

    fish_lone: {
        slug: "fish_lone",
        name: "Lone Daemon",
        imgClass: "fish",
        image: "/img/sprites/combat/items/lonefish.gif",
        description: `'minor daemon rendered incoherent by unusual structure'`,
        oocnote: "'<strong>PERMANENT</strong>';'select shell';'all other shells are removed';'chosen shell receives stun and fear immunity';'permanent wild surge';'+30HP'",
        type: 'target',
        exec: "loneFish",
        group: "fish",
        max: 10,
        batches: 1
    },

    fish_wheel: {
        slug: "fish_wheel",
        name: "???",
        imgClass: "fish",
        image: "/img/sprites/flantrusive/flanfisch.gif",
        description: `'intrusive species'`,
        oocnote: "'<strong>PERMANENT</strong>';'select shell';'imbue with gambling addiction'",
        type: 'target',
        exec: "intrusiveFish",
        group: "fish",
        max: 10,
        batches: 1
    },

    fish_ruka: {
        slug: "fish_ruka",
        name: "Decorated Burstlet",
        imgClass: "fish",
        image: "/img/sprites/flantrusive/bombletfish.gif",
        description: `'volatile parasitic fish';'intrusive species'`,
        oocnote: "'<strong>PERMANENT</strong>';'select shell';'grants detonate action'",
        type: 'target',
        exec: "bombFish",
        group: "fish",
        max: 10,
        batches: 1
    },

    fish_mimic: {
        slug: "fish_mimic",
        name: "FiiF",
        imgClass: "fish",
        image: "/img/sprites/combat/items/mimicfish.gif",
        description: `'fish native to these waters';'sretaw eseht ot evitan hsif'`,
        oocnote: "'<strong>PERMANENT</strong>';'select shell';'removes ability to be modified';'replaces actions with mimic'",
        type: 'target',
        exec: "mimicFish",
        group: "fish",
        max: 10,
        batches: 1
    },

    fish_sniper: {
        slug: "fish_sniper",
        name: "Sniper Fish",
        imgClass: "fish",
        image: "/img/sprites/combat/items/fishrifle.gif",
        description: `'fish native to these waters';'doubles as powerful sniper rifle'`,
        oocnote: "'<strong>PERMANENT</strong>';'select shell';'removes ability to be modified';'replaces actions with powerful firearm'",
        type: 'target',
        exec: "sniperFish",
        group: "fish",
        max: 10,
        batches: 1,
    },

    fish_normal: {
        slug: "fish_normal",
        name: "Normal Fish",
        imgClass: "fish",
        image: "/img/sprites/combat/items/normalfish.gif",
        description: `'fishey'`,
        oocnote: "'select shell';'removes any special classes';'re-enables modification'",
        type: 'target',
        exec: "normalFish",
        group: "fish",
        max: 10,
        batches: 1
    },

    fish_angler: {
        slug: "fish_angler",
        name: "Deceiving Bulb",
        imgClass: "fish",
        image: "/img/sprites/combat/items/fish_bulb.gif",
        description: `'violent surface river fauna';'imitates mature celki glow'`,
        oocnote: "'select shell';'enemies will prioritize over other targets'",
        type: 'target',
        exec: "anglerFish",
        group: "fish",
        max: 10,
        batches: 1
    },

    fish_glee: {
        slug: "fish_glee",
        name: "Fairy Eye",
        imgClass: "fish",
        image: "/img/sprites/combat/items/fish_eye.gif",
        description: `'veilktop parasite';'shells rarely found in riverbeds';'purported sign of imminent chaos'`,
        oocnote: "'permanently improves modifier'::VELZIE'S GLEE",
        type: 'auto',
        exec: "gleeFish",
        group: "fish",
        max: 10,
        batches: 1
    },

    fish_boot: {
        slug: "fish_boot",
        name: "BSTRDBOOT",
        imgClass: "fish",
        image: "/img/sprites/combat/items/fishboot.gif",
        description: `'SORRY NOTHING'`,
        group: "fish",
        max: 2000,
        batches: 1
    },
    
    /* EP4 */
    symbiotic_rifle: {
        slug: "symbiotic_rifle",
        name: "Symbiotic Rifle",
        image: "/img/sprites/combat/items/sorry_dither.gif",
        description: `'adapted bright weaponry created via lesser vats and strange cyst';'connects to internal ammunition generator';'use at cost of HP'`,
        infinite: true,
        max: 1,
        batches: 1,
        combatAction: env.ACTIONS.scene_arm_rifle,
    },
}

/* generated character components */
/* function very similar to augments, but occupy slots, and are applied before them */
if(typeof env.COMBAT_COMPONENTS == "undefined") env.COMBAT_COMPONENTS = {
    ichor: { // HP/heal themed.
        slug: "ichor",
        name: "Ichor",
        description: "'care and sacrifice'",
        help: "'healing';'regen';'revival'",
        primary: {
            alterations: [["primary", "tozik_attack"]], // corruskivi team heal crit
        },
        secondary: {
            alterations: [["secondary", "mend"]], // targeted heal
        },

        utility: {
            alterations: [
                ["evade", "sacrifice"], // focus, deal 5 damage to self, +2 strength to next move (attack or heal)
                ["ADD", "sacrifice_restore"] // resurrection or mega heal
            ],
        },

        combatModifiers: ["ichor_sacrifice", "ichor_strength", "ichor_rotten"]
    },

    eyes: { // vulnerable/focused themed
        name: "Eyes",
        slug: "eyes",
        description: "'curiosity and critique'",
        help: "'vulnerability';'evasion';'focus'",

        primary: {
            alterations: [["primary", "exploit"]], // like gakvu's scramble, but does 1 DMG and +1 DMG to vulnerable targets
            stats: {
                maxhp: 2
            },
        },

        secondary: {
            alterations: [["secondary", "spy"]], // mark target vulnerable
            stats: {
                maxhp: 2
            },
        },

        utility: {
            alterations: [["evade", "coordination"]], // give entire team focus, no evasion though
            stats: {
                maxhp: 2
            },
        },

        combatModifiers: ["eyes_hypercritical", "eyes_woundedego", "eyes_betrayal"]
    },

    claws: { // damage themed 
        name: "Claws",
        slug: "claws",
        description: "'ambition, often blind'",
        help: "'team damage';'puncture';'double-action'",

        primary: {
            alterations: [["primary", "cavik_attack"]], // IED - 1DMG attack, but chance for 1DMG on entire enemy team
            stats: {
                maxhp: 2
            },
        },

        secondary: {
            alterations: [["secondary", "stab"]], // 1dmg bleed attack
            stats: {
                maxhp: 2
            },
        },
        
        utility: {
            alterations: [["evade", "surge"]], // mark self vulnerable, but on next action use, repeat that action
            stats: {
                maxhp: 2
            },
        },

        combatModifiers: ["claws_desperation", "claws_infection", "claws_rabid"]
    },

    bone: { // defense and enemy attack debuff themed
        name: "Bone",
        slug: "bone",
        description: "'resilience and paranoia'",
        help: "'weakness';'stun';'guard';'spiked'",
        primary: {
            alterations: [["primary", "bone_break"]], // 1HP attack that gives 3T weakened on crit and stuns
            stats: {
                maxhp: 5,
            },
        },

        //augment - team barrier like cavik? carapace based?
        secondary: {
            alterations: [["secondary", "guard"]], // bozko's redirection
            stats: {
                maxhp: 5,
            },
        },

        utility: {
            alterations: [["evade", "shell"]], // give self carapace and spikes for a few turns
            stats: {
                maxhp: 5,
            },
        },

        //a pool of alterations randomly chosen by zones of this element type
        combatModifiers: ["bone_ablative", "bone_spikes", "bone_collective"]
    },

    light: { // CC and risky effect themed
        name: "Light",
        slug: "light",
        description: "'fate and consequence'",
        help: "'destabilized';'fear';'stun'",
        primary: {
            alterations: [["primary", "mad_claw"]], // like akizet's overwhelm if she went crazy
            stats: {
                maxhp: 3,
            },
        },

        secondary: {
            alterations: [["secondary", "destabilize"]], // gakvu's destabilize
            stats: {
                maxhp: 3,
            },
        },
        
        utility: {
            // destabilize self and mark self vulnerable, but enemy team is randomly 
            // afflicted with STUN, DESTABILIZE, or FEAR 
            // (fear being updated to restrict use of any enemy utility type abilities)
            alterations: [["evade", "special_invite_storm"]],
            stats: {
                maxhp: 5,
            },
        },
        
        combatModifiers: ["light_laughterhouse", "light_glee", "light_dark"]
    },

    empty: { // just for display
        name: "Empty",
        slug: "empty",
        showIf: () => false,
        dontSpawnNormally: true,
        description: "'improvisation';'lacking direction'",
        help: "'basic actions'",

        primary: {
            alterations: [["primary", "primary"]], 
        },

        secondary: {
            alterations: [["secondary", "secondary"]],
        },
        
        utility: {
            alterations: [["evade", "evade"]],
        },

        combatModifiers: ["intrusive_unknown"]
    },

    intrusive: { 
        showIf: () => false,
        dontSpawnNormally: true,
        slug: "intrusive",
        name: "???",
        description: "'???'",
        combatModifiers: ["intrusive_unknown"]
    },
}

/* 
    modifiers are used in critta gameplay in two ways:
    1) challenges chosen for critta-nodes individually
    2) globally held by the critta-map and applied to all critta nodes you encounter

    similarly, they can function in a few ways:
    * alterations {} - they can hold team alterations that are applied at combat start, to "all", "ally", or "enemy"
    * events: {
        onChosen() - when chosen via reward system
        beforeCombat(settings) - can process the formation and combat settings in some way prior to starting
        afterCombat(loser) - can alter critta-node completion procedure, return "false" to not trigger the usual procession
    }
    
    they use "getHelp" functions vs hardcoded descriptions since they often rely on other stuff
*/
if(typeof env.MODIFIERS == "undefined") env.MODIFIERS = {
    /* regular combat modifiers - no execs because they're not global eligible */
    bone_spikes: {
        name: "Heavy Chitin",
        getHelp: ()=> { return env.STATUS_EFFECTS.bone_spikes.help },
        alterations: { 
            all: [ ["STATUS", "bone_spikes"] ]
        }
    },

    bone_ablative: {
        name: "Ablative Mending",
        getHelp: ()=> { return env.STATUS_EFFECTS.bone_ablative.help },
        alterations: { 
            all: [ ["STATUS", "bone_ablative"] ]
        }
    },

    bone_collective: {
        name: "Collectivism",
        getHelp: ()=> { return env.STATUS_EFFECTS.bone_collective.help },
        alterations: { 
            all: [ ["STATUS", "bone_collective"], ["ADD", "guard"] ]
        }
    },

    ichor_sacrifice: {
        name: "Adull's Sacrifice",
        getHelp: ()=> { return env.STATUS_EFFECTS.ichor_sacrifice.help },
        alterations: { 
            all: [ ["STATUS", "ichor_sacrifice"] ]
        }
    },

    ichor_strength: {
        name: "Full Strength",
        getHelp: ()=> { return env.STATUS_EFFECTS.ichor_strength.help },
        alterations: { 
            all: [ ["STATUS", "ichor_strength"] ]
        }
    },

    ichor_rotten: {
        name: "Rotten Supplies",
        getHelp: ()=> { return env.STATUS_EFFECTS.ichor_rotten.help },
        alterations: { 
            all: [ ["STATUS", "ichor_rotten"] ]
        }
    },

    claws_infection: {
        name: "Infection",
        getHelp: ()=> { return env.STATUS_EFFECTS.claws_infection.help },
        alterations: { 
            all: [ ["STATUS", "claws_infection"] ]
        }
    },

    claws_desperation: {
        name: "Desperation",
        getHelp: ()=> { return env.STATUS_EFFECTS.claws_desperation.help },
        alterations: { 
            all: [ ["STATUS", "claws_desperation"] ]
        }
    },

    claws_rabid: {
        name: "Rabid",
        getHelp: ()=> { return env.STATUS_EFFECTS.claws_rabid.help },
        alterations: { 
            all: [ ["STATUS", "claws_rabid"] ]
        }
    },

    eyes_hypercritical: {
        name: "Hypercritical",
        getHelp: ()=> { return env.STATUS_EFFECTS.eyes_hypercritical.help },
        alterations: { 
            all: [ ["STATUS", "eyes_hypercritical"] ]
        }
    },

    eyes_woundedego: {
        name: "Wounded Ego",
        getHelp: ()=> { return env.STATUS_EFFECTS.eyes_woundedego.help },
        alterations: { 
            all: [ ["STATUS", "eyes_woundedego"] ]
        }
    },

    eyes_betrayal: {
        name: "Betrayal",
        getHelp: ()=> { return env.STATUS_EFFECTS.eyes_betrayal.help },
        alterations: { 
            all: [ ["STATUS", "eyes_betrayal"] ]
        }
    },

    light_laughterhouse: {
        name: "Laughterhouse",
        getHelp: ()=> { return env.STATUS_EFFECTS.light_laughterhouse.help },
        alterations: { 
            all: [ ["STATUS", "light_laughterhouse"] ]
        }
    },

    light_glee: {
        name: "Velzie's Glee",
        getHelp: ()=> { return env.STATUS_EFFECTS.light_glee.help },
        alterations: { 
            all: [ ["STATUS", "light_glee"] ]
        }
    },

    light_dark: {
        name: "Dark Eye",
        getHelp: ()=> { return env.STATUS_EFFECTS.light_dark.help },
        alterations: { 
            all: [ ["STATUS", "light_dark"] ]
        }
    },

    intrusive_unknown: {
        name: "???",
        getHelp: ()=> "???"
    },

    /* global modifiers */
    /* 
        these have events
            beforeCombat(settings) - lets you adjust the settings and formation being passed to startCombat
            onChosen() - lets you run code whenever this is chosen as a reward

        and some special additional info
            icon - identical to icon for statuses, same resolution and display style
            priority - in the execution order of events, we 
    */

    global_anti: {
        name: "Abundance",
        global: true,
        stacks: 6,
        tension: 1,
        icon: "/img/sprites/daemons/queenring.gif",
        priority: 1, // should happen after any base formation adjustments

        getHelp: (withCurrent)=> {
            let help = `<span class='obesk-color'>FOES::+20% chance for daemon-inhabited shells to appear in place of lesser foes</span>\n<span class='bastard-color'>TEAM::+5 max HP</span>`

            if(withCurrent) {
                let currentEffects = ""
                let qty = env.crittaMap.getModQty("global_anti")
                let effects = [
                    `${qty * 20}% ANTISHELL CHANCE`,
                    qty > 5 ? `+${qty - 5} ANTISHELL IMPULSE` : false,
                    `+${qty * 5} ALLY HP`,
                    `+${qty} TENSION`
                ]

                for (const effectString of effects) {
                    if(!effectString) continue;
                    if(currentEffects) currentEffects += ", ";
                    else currentEffects = "CURRENT EFFECT::";

                    currentEffects += effectString
                }
                
                help = help + `\n${currentEffects}`
            }

            return help
        },

        adjustSpawn: (enemySlug) => {
            switch(enemySlug) {
                case "pawn":
                case "knight":
                case "bishop":
                    if(Math.random() < (env.crittaMap.getModQty("global_anti") * .2)) {
                        return "falsecritta"
                    } else {
                        return enemySlug
                    }
                break

                default:
                    return enemySlug
            }
        },

        beforeCombat: function(settings) {
            let newEnemies = []
            for (const enemySlug of settings.effectiveEnemies) {
                newEnemies.push(this.adjustSpawn(enemySlug))
            }

            settings.effectiveEnemies = newEnemies
        },

        onChosen: function () {
            env.crittaMap.adjustTension("+", 1)
            for (const member of page.party) {
                if(!member.alterations) member.alterations = [];
                let hpAlter = member.alterations.find(alter => alter[0] == "maxhp")

                if(hpAlter) hpAlter[1] += 5;
                else member.alterations.push(["maxhp", 5])                    
            }
        }
    },
    
    global_megaglee: {
        name: "Welcome Storm",
        global: true,
        stacks: true,
        tension: 1,
        showIf: () => false,
        icon: "/img/sprites/combat/passives/fated_light.gif",
        priority: 1,

        getHelp: (withCurrent)=> {
            let help = `<span class='bastard-color'>VELZIE'S GLEE::+50% chance to trigger</span>`

            if(withCurrent) {
                let currentEffects = ""
                let qty = env.crittaMap.getModQty("global_megaglee")
                let effects = [
                    `+50% VELZIE'S GLEE EFFECT CHANCE`,
                    qty > 1 ? `+${qty - 1} STATUS DURATION` : false,
                ]

                for (const effectString of effects) {
                    if(!effectString) continue;
                    if(currentEffects) currentEffects += ", ";
                    else currentEffects = "CURRENT EFFECT::";

                    currentEffects += effectString
                }
                
                help = help + `\n${currentEffects}`
            }

            return help
        }
    },

    global_escalation: { 
        name: "Escalation",
        global: true,
        stacks: 5,
        tension: 1,
        icon: "/img/sprites/daemons/spawner/bee.gif",
        priority: 2, // should happen after any anticrittas

        getHelp: (withCurrent)=> {
            let help = `<span class='obesk-color'>FOES::+50% max HP</span>, but <span class='bastard-color'>most negative statuses inflicted on them have their effects drastically increased</span>`

            if(withCurrent) {
                let currentEffects = ""
                let qty = env.crittaMap.getModQty("global_escalation")
                let effects = [
                    `+${qty * 50}% FOE HP`,
                    `${'+'.repeat(qty)}NEGATIVE STATUS ENHANCEMENT`
                ]

                for (const effectString of effects) {
                    if(!effectString) continue;
                    if(currentEffects) currentEffects += ", ";
                    else currentEffects = "CURRENT EFFECT::";

                    currentEffects += effectString
                }
                
                help = help + `\n${currentEffects}`
            }

            return help
        },

        onChosen: function () {
            env.crittaMap.adjustTension("+", 1)
        },

        alterations: { 
            enemy: [ ["STATUS", "global_escalation"] ]
        }
    },

    global_impulse_bonus: {
        name: "Into Madness",
        global: true,
        stacks: true,
        tension: 1,
        icon: "/img/sprites/bstrd/icon.gif",
        priority: 0,
        showIf: () => env.crittaMap.tension >= 1,

        getHelp: (withCurrent)=> {
            let help = `<span class="bastard-color">impulse caches are +50% more likely,</span> but <span class="obesk-color">foes receive +1 random impulse</span>`

            if(withCurrent) {
                let currentEffects = ""
                let qty = env.crittaMap.getModQty("global_impulse_bonus")
                let effects = [
                    `+${qty * 50}% IMPULSE CACHE CHANCE`,
                    `+${qty} ENEMY IMPULSE`,
                ]

                for (const effectString of effects) {
                    if(!effectString) continue;
                    if(currentEffects) currentEffects += ", ";
                    else currentEffects = "CURRENT EFFECT::";

                    currentEffects += effectString
                }
                
                help = help + `\n${currentEffects}`
            }

            return help
        },

        alterations: { 
            enemy: [ ["STATUS", "global_impulse_bonus"] ]
        },

        onChosen: function () {
            env.crittaMap.adjustTension("+", 1)
            env.crittaMap.weights["impulse"] = env.crittaMap.weights["impulse"] ? env.crittaMap.weights["impulse"] + 0.5 : 0.5
            
            //for modders: DO NOT DO THIS EVER on anything that's supposed to change rowsettings
            env.crittaMap.generate() //called again for testing purposes
        },
    },

    global_intrusive: {
        name: "MANIFEST",
        global: true,
        stacks: false,
        showIf: () => {
            return (
            page.party.every(member=>member?.alterations?.find(alter => alter[1] == "light_humorist"))
            &&
            env.crittaMap.tension >= 1
            )
        },
        tension: 0,
        icon: "/img/sprites/flantrusive/icon.gif",
        priority: 0,
        getHelp: ()=> `<span class="neutral-color">øÿ°ÞÜÿ›ËÅÿ¥ÔËÿ«×Ïÿ®ØÏÿ«ÛÑÿ¦ÔÉÿ—Á¶ÿ–À´ÿ«ÖÊÿ Ì¿ÿ’½´ÿ¤ÔÏÿ¤ÙÑÿ”ËÃÿÉÄÿ¨°ÿl</span>`,

        onChosen: function () {
            env.crittaMap.currentRowSetting = CrittaMap.ROWSETTINGS.intrusive
            env.crittaMap.setAttribute("special", "intrusive")

            setTimeout(()=>{
                env.crittaMap.querySelector('critta-node[difficulty="3"]').formation = env.COMBAT_FORMATIONS.intrusive
            }, 800)
        }
    }
}

/* stat info - used mainly for comparisons and short displays
    "good" determines when something should be displayed as a benefit
        "-" if lowered from normal is good
        "+" if above normal is good
        "?" if it's complicated
*/
if(typeof env.STATDATA == "undefined") env.STATDATA = {
    maxhp: {
        display: "HP",
        description: "'damage taken before defeat'",
        good: "+"
    },

    outgoingMult: {
        display: "OUT::x(HP)",
        description: "'multiplies all HP changes inflicted upon others'",
        good: "+",
        percentage: true
    },

    outgoingFlat: {
        display: "OUT::HP",
        description: "'flat modifier to HP changes on others';'before modifiers'",
        good: "+"
    },

    outgoingToHit: {
        display: "OUT::x(HIT)",
        description: "'multiplies chance to hit others'",
        good: "+",
        percentage: true
    },

    outgoingCrit: {
        display: "OUT::x(CRIT)",
        description: "'multiplies chance to crit others'",
        good: "+",
        percentage: true
    },

    outgoingFlatCrit: {
        display: "OUT::CRIT",
        description: "'added to base crit chance on others';'before modifiers'",
        good: "+",
        percentage: true
    },

    incomingMult: {
        display: "IN::x(HP)",
        description: "'multiplies all HP changes inflicted upon this entity'",
        good: "?",
        percentage: true
    },

    incomingFlat: {
        display: "IN::HP",
        description: "'flat modifier to HP changes on this entity';'before modifiers'",
        good: "?"
    },

    incomingToHit: {
        display: "IN::x(HIT)",
        description: "'multiplies chance to hit this entity'",
        good: "-",
        percentage: true
    },

    incomingCrit: {
        display: "IN::x(CRIT)",
        description: "'multiplies chance to crit this entity'",
        good: "-",
        percentage: true
    },

    incomingFlatCrit: {
        display: "IN::CRIT",
        description: "'added to base crit chance against this entity';'before modifiers'",
        good: "-",
        percentage: true
    },
}