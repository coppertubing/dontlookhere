CombatGrid.TILE_EFFECTS["burning"] = { 
    slug: "burning",
    name: "Chemical Fire",
    help: "unresistable -10% hp/turn, min:1",
    effectHTML: `<div class="burning"></div>`,
    stacks: true, // tile effects can either stack, or exist as separate effects on the same tile
    events: {
        /* greetings modder (??!)
            similar to status effects getting a "this.status", this object gets a "this.effect" property when executing events
            (i.e. this.effect.tiles to refer to the tiles it effects)

            btw it HAS to be an explicit function(), can't be lambda
        */
        onCreated: function() { console.log("hi, created", this.effect)},
        onDeleted: function() {console.log("hi, now deleting", this.effect, "which should have no tiles anymore")},

        //actors are affected by tiles when they are either 
        // reason: "created", are on an affected tile when the effect is created, or
        // reason: "endturn", end their turn in an affected tile (via using action or stunned, etc)
        // reason: "knockback", ended knockback
            // knockback will only happen on first entry of the first tile of the effect
            // UNLESS the tile_effect obj has "knockbackRetrigger: true"
        onActorAffected: function({actor, reason}) {
            if(actor.state == "lastStand") return; 

            //deals either 10% of their remaining HP, or 1 damage (whichever's higher)
            reactDialogue(actor, 'puncture');    
            let amt = Math.floor(actor.hp * 0.1) || 1

            combatHit(actor, {amt: amt, autohit: true, runEvents: false, ignoreMods: true});
            play('dull', 1, 0.5);
        },

        onTileAdded: function({tile}) { console.log("now affecting", tile, this.effect)},
        //can specify it was removed via expiration, or by other means
        onTileRemoved: function({tile, expiration = false}) { console.log(tile, "removed from", this.effect, expiration)},
    }
}

CombatGrid.TILE_EFFECTS["blocker"] = {
    slug: "blocker",
    name: "Blocked",
    help: "blocked by nearby object",
    class: "pseudopiece",
    infinite: true,
    stacks: true, // tile effects can either stack, or exist as separate effects on the same tile
    pseudopiece: true, // any tile affected by this is treated as being a proxy for the origin's piece
    events: {
        onActorAffected: function({actor, reason}) {
            if(actor == this.effect.origin) return;
            if(actor.piece) actor.piece.knockback({ // just to get people out of range if they're inside effect
                direction: this.effect.origin.piece.tile.getRelativeDirection(actor.piece.tile), 
                strength: 2
            })
            play('crit', 2, 0.5);
        },

        onTileAdded: function({tile}) { 
            if(tile.piece && tile.piece?.actor != this.effect.origin) {
                tile.piece.knockback({ // just to get people out of range if they're inside effect
                    direction: this.effect.origin.piece.tile.getRelativeDirection(tile), 
                    strength: 2
                })
            }
        },
    }
}

CombatGrid.TILE_EFFECTS["pseudopiece"] = {
    slug: "pseudopiece",
    name: "Proxy",
    help: "attacks on this tile will hit [[ORIGIN]]",
    class: "pseudopiece",
    infinite: true,
    stacks: true,
    pseudopiece: true
}

CombatGrid.TILE_EFFECTS["pseudopiece_quiet"] = { // no visible effect
    slug: "pseudopiece_quiet",
    name: "Proxy",
    help: "attacks on this tile will hit [[ORIGIN]]",
    infinite: true,
    stacks: true,
    pseudopiece: true
}

CombatGrid.TILE_EFFECTS["guarding"] = { 
    slug: "guarding",
    name: "Guarding",
    help: "+REDIRECTION and knockback immunity on allies",
    effectHTML: `<div class="guarding"></div>`,
    stacks: true, 
    beneficial: true,
    events: {                
        //because actors should generally only be affected by things on turn end or creation, this is a special event
        //but it does also trigger on status creation
        onEnter: function({actor}) {
            if(actor == this.effect.origin || actor.team.name != this.effect.origin.team.name) return;
            addStatus({target: actor, origin: this.effect.origin, status: "redirection", makeInfinite: true, runEvents: false, noReact: true, noFloater: true})
            play('guard', 1, 0.5)
        },

        onLeave: function({actor}) {
            if(actor == this.effect.origin || actor.team.name != this.effect.origin.team.name) return;
            removeStatus(actor, "redirection", {runEvents: false, noFloater: true})
        }
    }
}

CombatGrid.TILE_EFFECTS["scrambler"] = { 
    slug: "scrambler",
    name: "Scramble",
    help: "executes scramble action on foes, can be triggered multiple times by KB",
    effectHTML: ``,
    beneficial: true,
    stacks: true,
    knockbackRetrigger: true,
    events: {
        onActorAffected: function({actor, reason}) {
            if(actor.team.name != this.effect.origin.team.name) {                
                useAction(this.effect.origin, env.ACTIONS["gakvu_attack"], actor, {beingUsedAsync: true, reason: "scramble", sceneAnim: true});

                sendFloater({
                    target: actor,
                    type: "arbitrary",
                    arbitraryString: "SCRAMBLED!",
                    beneficial: false,
                    size: 0.75
                })
            }
        },
    }
}

CombatGrid.TILE_EFFECTS["destabilizing"] = { 
    slug: "destabilizing",
    name: "Destabilized Zone",
    help: "+1T:DESTABILIZE/turn on all entities within\nDESTABILIZE becomes infinite while within",
    effectHTML: ``,
    stacks: true, 
    beneficial: true,
    events: {                
        onEnter: function({actor}) {
            if(hasStatus(actor, "destabilized")) {
                let destabilized = actor.statusEffects.find(status=>status.slug == "destabilized")
                destabilized.infinite = true
            }
        },

        onActorAffected: function({actor, reason}) {
            if(hasStatus(actor, "destabilized")) {
                let destabilized = actor.statusEffects.find(status=>status.slug == "destabilized")
                destabilized.infinite = true
                destabilized.duration += 1
            } else {
                let destabilized = addStatus({target: actor, length: 1, status: "destabilized"})
                destabilized.infinite = true
            }
        },

        onLeave: function({actor}) {
            if(hasStatus(actor, "destabilized")) {
                let destabilized = actor.statusEffects.find(status=>status.slug == "destabilized")
                destabilized.infinite = false
            }
        }
    }
}

CombatGrid.TILE_EFFECTS["spying"] = { 
    slug: "spying",
    name: "Observing",
    help: "+2T:VULNERABLE on foes, +1T:FOCUSED on allies",
    effectHTML: "",
    stacks: true, 
    beneficial: true,
    events: {              
        //because actors should generally only be affected by things on turn end or creation, this is a special event
        //but it does also trigger on status creation
        onActorAffected: function({actor, reason}) {
            if(actor.team.name == this.effect.origin.team.name) {
                addStatus({target: actor, origin: this.effect.origin, status: "focused", runEvents: false, noReact: true})
                play('mend', 0.5, 0.5)
            } else {
                addStatus({target: actor, origin: this.effect.origin, status: "vulnerable", length: 2, runEvents: false, noReact: true})
                play('status', 0.75, 0.5)
            }
        },
    }
}

//if you use this, make sure you modify it in your actions to customize it like i do
CombatGrid.TILE_EFFECTS["telegraph"] = { 
    slug: "telegraph",
    name: "telegraph",
    help: "executing action upon expiration",
    effectHTML: `<div class="telegraph"></div>`,
    tickEvenIfOriginDead: true,
    stacks: false, // false on stacks is basically to say, "treat this as separate from other telegraph effects on the same tile"
    events: {
        //useful stuff for styling if needed
        onCreated: function() {
            if(this.effect?.data?.direction) this.effect.tiles.forEach(tile=>tile.effectMap[this.effect.id].fx.setAttribute("direction", this.effect.data.direction))
        },
    }
}

CombatGrid.TILE_EFFECTS["manual_bomb"] = { 
    slug: "manual_bomb",
    name: "Planted Bomb",
    help: "-6HP +1T:STUN +2T:PUNCTURE when activated",
    effectHTML: `<div class="telegraph"></div>`,
    stacks: false,
    infinite: true,
    requiresOrigin: true
}

CombatGrid.TILE_EFFECTS["scene_edge"] = {
    slug: "scene_edge",
    name: "Distortion",
    help: "-2HP +1T:DESTABILIZED, KB::2 towards center",
    infinite: true,
    stacks: true,
    events: {
        onActorAffected: function({actor, reason}) {
            if(actor == this.effect.origin ||
                actor?.immunities?.scene_edge ||
                env.currentDialogue.active ||
                !env.rpg.turnData.turn // spawned in
            ) return;

            setTimeout(() => {
                if(!actor.piece) return; //might die before here

                let direction = this.effect?.data?.direction

                if(!direction) {
                    let centerTile = this.effect.origin ? this.effect.origin.piece.tile : env.rpg.grid.tilesByType.center[0]
                    if(centerTile) direction = centerTile.getRelativeDirection(actor.piece.tile, true)
                } 
                if(!direction) direction = ["up", "left", "right", "down", "up-left", "up-right", "down-left", "down-right"].sample()

                actor.piece.knockback({ 
                    direction, 
                    strength: this.effect.origin ? 2 : 4,
                    follow: env.rpg.currentActor == actor ? true : false
                })

                combatHit(actor, {amt: 2, autohit: true, runEvents: false});
                addStatus({target, origin: this.effect.origin, status: "destabilized", length: 1, noReact: true}); 

                if(actor.team.name != "neutral") env.rpg.effectMessage.action({
                    user: actor,
                    target: actor,
                    action: `%TARGET is distorted and thrown back!`,
                    isMinor: true,
                })

                if(actor.team.name != "neutral") play('crit', 0.5, 0.5)
            }, env.ADVANCE_RATE * 0.25)
        },
    }
}

CombatGrid.TILE_EFFECTS["antimelee"] = {
    slug: "antimelee",
    name: "Unnatural Reflex",
    help: "-6HP +2T:FEAR, KB::4",
    infinite: true,
    events: {
        onActorAffected: function({actor, reason}) {
            if(actor == this.effect.origin ||
                env.currentDialogue.active ||
                actor?.team?.name == this.effect?.origin?.team?.name ||
                actor?.team?.name == "neutral"
            ) return;

            if(!actor.piece || !this.effect?.origin?.piece) return; //might die before here

            direction = this.effect.origin.piece.tile.getRelativeDirection(actor.piece.tile)

            actor.piece.knockback({ 
                direction, 
                strength: 4,
                follow: env.rpg.currentActor == actor ? true : false
            })

            reactDialogue(actor, 'receive_crit');
            combatHit(actor, {amt: 6, autohit: true, runEvents: false});
            addStatus({target, origin: this.effect.origin, status: "fear", length: 2, noReact: true}); 

            if(actor.team.name != "neutral") env.rpg.effectMessage.action({
                user: this.effect.origin,
                target: actor,
                action: `%USER suddenly strikes %TARGET`,
                reason: "reflex",
            })

            if(actor.team.name != "neutral") play('crit', 0.5, 0.5)
        },
    }
}

CombatGrid.TILE_EFFECTS["projectiletest"] = {
    slug: "projectiletest",
    name: "Projectiletest",
    help: "-2HP KB::3",
    class: "projectile any-tick",
    infinite: true,
    stacks: false,
    advanceEveryTurn: true,
    hitOnShift: true,
    tickType: "onTurnEnd",
    events: {
        onActorAffected: function({actor, reason}) {
            if(actor.piece) {
                let thisTile = actor.piece.tile
                if(
                    actor.piece.tile == thisTile &&
                    // only execute if it's not a guarded tile, and the potential target is an player team member
                    (
                        !thisTile.effects.some(e=>e.host.slug == "redirection" || e.host.slug == "redirector") && 
                        actor.team.name == "ally"
                    )
                ) {
                    actor.piece.knockback({ 
                        direction: this.effect.data.direction, 
                        strength: 3
                    })

                    reactDialogue(actor, 'crit');
                    combatHit(actor, {amt: 2, autohit: true, runEvents: false});
                    playCombatCrit()
                }
            }
        },

        //projectile boilerplate
        onCreated: function() {
            this.effect.tiles.forEach(tile=>tile.effectMap[this.effect.id].fx.setAttribute("direction", this.effect.data.direction))
        },

        onTileAdded: function({tile, reason}) { 
            if(tile?.piece?.actor && reason == "shifting") this.onActorAffected({actor: tile.piece.actor});
            tile.effectMap[this.effect.id].fx.setAttribute("direction", this.effect.data.direction)
        },
    
        onEffectAdvance: function({incitingActor} = {}) {
            if(incitingActor.npc) return;
            env.rpg.grid.moveTileEffect(this.effect, {directional: {direction: this.effect.data.direction, strength: 1}})
        }
    }
}

CombatGrid.TILE_EFFECTS["projectile_evilobserve"] = {
    slug: "projectile_evilobserve",
    name: "Grasping Eye",
    help: "+1T:FEAR\nmoves on ANY turn",
    class: "projectile any-tick",
    infinite: true,
    stacks: false,
    advanceEveryTurn: true,
    hitOnShift: true,
    tickType: "onTurnEnd",
    events: {
        onActorAffected: function({actor, reason}) {
            if(actor.piece) {
                let thisTile = actor.piece.tile
                if(
                    actor.piece.tile == thisTile && actor.team.name == "ally"
                ) {
                    addStatus({target: actor, origin: this.effect.origin, status: "fear", noReact: true})
                }
            }
        },

        onCreated: function() {
            this.effect.tiles.forEach(tile=>{
                tile.effectMap[this.effect.id].fx.setAttribute("direction", this.effect.data.direction)
            })
        },

        onTileAdded: function({tile, reason}) { 
            if(tile?.piece?.actor && reason == "shifting") this.onActorAffected({actor: tile.piece.actor});
            tile.effectMap[this.effect.id].fx.setAttribute("direction", this.effect.data.direction)
        },
    
        onEffectAdvance: function({incitingActor} = {}) {
            if(incitingActor.npc) return;
            env.rpg.grid.moveTileEffect(this.effect, {directional: {direction: this.effect.data.direction, strength: 1}})
        }
    }
}

CombatGrid.TILE_EFFECTS["projectile_itzka"] = {
    slug: "projectile_itzka",
    name: "Overlap Collapse",
    help: "-2HP KB::2",
    class: "projectile",
    infinite: true,
    stacks: false,
    advanceEveryTurn: true,
    hitOnShift: true,
    tickType: "onTurnEnd",
    events: {
        onActorAffected: function({tile, actor, reason}) {
            if(actor.piece && (!env.rpg.turnData[`${actor.slug}_${this.effect.slug}`] || actor.team.name == "neutral")) {
                env.rpg.turnData[`${actor.slug}_${this.effect.slug}`] = true
                let thisTile = tile || actor.piece.tile

                if(actor.team.name != "enemy") {
                    setTimeout(()=>thisTile.removeFromEffect(this.effect, {removingBy: "consumed"}), 100)
                    combatHit(actor, {amt: 2, autohit: true, runEvents: false});
                    addStatus({target: actor, origin: this.effect.origin, status: "destabilized"})

                    if(actor.team.name == "ally" && actor.piece) {
                        actor.piece.knockback({ 
                            direction: this.effect.data.direction, 
                            strength: 2
                        })
                        playCombatCrit("destabilize")
                        forcePlay("hit")
                    }
                }
            }
        },

        onCreated: function() {
            this.effect.tiles.forEach(tile=>tile.effectMap[this.effect.id].fx.setAttribute("direction", this.effect.data.direction))
            this.effect.help += `\nMoves on ${this.effect.data.turnTickType.toUpperCase()} turn`
        },

        onTileAdded: function({tile, reason}) { 
            tile.effectMap[this.effect.id].fx.setAttribute("direction", this.effect.data.direction)
            tile.effectMap[this.effect.id].fx.classList.add(`${this.effect.data.turnTickType}-tick`)
        },
    
        onEffectAdvance: function({incitingActor} = {}) {
            let go = false;
            console.log("inciting actor is", incitingActor)
            if(incitingActor.npc) return;

            switch(this.effect.data.turnTickType) {
                case "any": go = true; break;
                case "ally": if(incitingActor?.team?.name == "ally") go = true; break;
                case "enemy": if(incitingActor?.team?.name == "enemy") go = true; break;
            }
            console.log("go is", go)

            if(go) env.rpg.grid.moveTileEffect(this.effect, {directional: {direction: this.effect.data.direction, strength: 1}})
        }
    }
}

CombatGrid.TILE_EFFECTS["projectile_cavik"] = {
    slug: "projectile_cavik",
    name: "Slow Pulse",
    help: "-3HP +1T:DESTABILIZED KB::1",
    class: "projectile",
    infinite: true,
    stacks: false,
    advanceEveryTurn: true,
    hitOnShift: true,
    tickType: "onTurnEnd",
    events: {
        onActorAffected: function({tile, actor, reason}) {
            if(actor.piece) {
                let thisTile = tile || actor.piece.tile
                
                if(actor.team.name != "ally") {
                    actor.piece.knockback({ 
                        direction: this.effect.data.direction, 
                        strength: 1
                    })

                    setTimeout(()=>thisTile.removeFromEffect(this.effect, {removingBy: "consumed"}), 100)
                    combatHit(actor, {amt: 3, autohit: true, runEvents: false});
                    addStatus({target: actor, origin: this.effect.origin, status: "destabilized"})

                    play("dull", 1, 0.3)
                }
            }
        },

        onCreated: function() {
            this.effect.tiles.forEach(tile=>tile.effectMap[this.effect.id].fx.setAttribute("direction", this.effect.data.direction))
            this.effect.help += `\nMoves on ${this.effect.data.turnTickType.toUpperCase()} turn`
        },

        onTileAdded: function({tile, reason}) { 
            tile.effectMap[this.effect.id].fx.setAttribute("direction", this.effect.data.direction)
            tile.effectMap[this.effect.id].fx.classList.add(`${this.effect.data.turnTickType}-tick`)
        },
    
        onEffectAdvance: function({incitingActor} = {}) {
            if(hasStatus(incitingActor, "shroud")) return;
            
            let go = false;
            switch(this.effect.data.turnTickType) {
                case "any": go = true; break;
                case "ally": if(incitingActor?.team?.name == "ally") go = true; break;
                case "enemy": if(incitingActor?.team?.name == "enemy") go = true; break;
            }

            if(go) env.rpg.grid.moveTileEffect(this.effect, {directional: {direction: this.effect.data.direction, strength: 1}})
        }
    }
}

/* when using generic, be sure to provide the following data
{
    // for visual info
    specialName,
    specialHelp,
    specialClass,

    //
    data: {
        direction: "", // which way it's moving
        turnTickType: "", // ally, enemy, or any, determines on what team turn the projectile moves
        consumeOnHit: bool, // remove a single projectile tile after doing an actorAffected trigger
        kb: #, // basic 'should it knock the affected in direction' setup
        hitOncePerTurn: bool, // whether or not projectiles can chain-hit a target. often feels unfair on ally targets
        blockedByLOS: bool, // obv

        //MOST IMPORTANTLY - what to do when an actor is affected
        affectsTeam: "", // not-ally, not-enemy, ally, enemy, any
        actorAffect: ({tile, actor, reason, effect}) => {} 
    }
}
*/
CombatGrid.TILE_EFFECTS["projectile_generic"] = {
    slug: "projectile_generic",
    name: "Projectile", // specify with specialName
    help: "UNKNOWN", // specify with specialHelp
    class: "projectile", // customize with specialClass
    infinite: true,
    stacks: false,
    advanceEveryTurn: true,
    hitOnShift: true,
    tickType: "onTurnEnd",
    events: {
        onActorAffected: function({tile, actor, reason}) {
            if(actor.piece) {
                let thisTile = tile || actor.piece.tile
                let data = this.effect.data
                
                if(data.hitOncePerTurn && env.rpg.turnData[`${actor.slug}_${this.effect.name}`]) return;
                env.rpg.turnData[`${actor.slug}_${this.effect.name}`] = true
                
                let shouldAffect = true
                if(data.affectsTeam && data.affectsTeam != "any") switch(data.affectsTeam) {
                    case "not-ally": shouldAffect = actor.team.name != "ally"; break
                    case "not-enemy": shouldAffect = actor.team.name != "enemy"; break
                    case "ally": shouldAffect = actor.team.name == "ally"; break
                    case "enemy": shouldAffect = actor.team.name == "enemy"; break
                }

                if(shouldAffect) {
                    if (data.kb) actor.piece.knockback({ direction: data.direction, strength: data.kb })
                    if (typeof data.actorAffect === "function") data.actorAffect({ tile, actor, reason, effect: this.effect })
                    if (data.consumeOnHit) setTimeout(() => tile.removeFromEffect(this.effect, { removingBy: "consumed" }), 100);  
                }
            }
        },

        onInitialize: function() {
            this.effect.blockedByLOS = this.effect?.data?.blockedByLOS;
            this.effect.help += `\nMoves on ${this.effect.data.turnTickType.toUpperCase()} turn`
        },

        onCreated: function() {
            this.effect.tiles.forEach(tile=>tile.effectMap[this.effect.id].fx.setAttribute("direction", this.effect.data.direction))
        },

        onTileAdded: function({tile, reason}) { 
            tile.effectMap[this.effect.id].fx.setAttribute("direction", this.effect.data.direction)
            tile.effectMap[this.effect.id].fx.classList.add(`${this.effect.data.turnTickType || "any"}-tick`)
        },
    
        onEffectAdvance: function({incitingActor} = {}) {
            if(hasStatus(incitingActor, "shroud")) return;
            
            let go = false;
            switch(this.effect.data.turnTickType) {
                case "any": go = true; break;
                case "ally": if(incitingActor?.team?.name == "ally") go = true; break;
                case "enemy": if(incitingActor?.team?.name == "enemy") go = true; break;
            }

            if(go) env.rpg.grid.moveTileEffect(this.effect, {directional: {direction: this.effect.data.direction, strength: 1}})
        }
    }
}

/* special charge attack stuff */
CombatGrid.TILE_EFFECTS["charge_warn"] = { 
    slug: "charge_warn",
    name: "Charge Radius",
    help: "indicates radius of danger while charging",
    class: "charge",
    effectHTML: "",
    requiresOrigin: true
}

CombatGrid.TILE_EFFECTS["charge_target"] = { 
    slug: "charge_target",
    name: "Charge Target",
    help: "soon to be charged towards",
    class: "charge",
    effectHTML: "",
    requiresOrigin: true
}

CombatGrid.TILE_EFFECTS["charge_active"] = { 
    slug: "charge_active",
    name: "Charge!!",
    help: "actively hits any non-aligned actors in radius",
    effectHTML: "",
    requiresOrigin: true,
    tickType: "onTurnEnd",
    class: "charge",
    events: {
        onEnter: function({actor}) {
            if(actor.team.name !== this.effect.origin.team.name) {
                let action = this.effect.specificAction || env.ACTIONS["arch_hulk_rampage"]
                env.rpg.turnData.chargeIndex = useAction(this.effect.origin, action, actor, {beingUsedAsync: true, reason: "charge", actionMessageIndex: env.rpg.turnData.chargeIndex})
            }
        },
    }
}

/* pairs/attachments */
CombatGrid.TILE_EFFECTS["support_host"] = { 
    slug: "support_host",
    name: "Supporting",
    help: "Supporting a nearby friend",
    effectHTML: "",
    infinite: true,
    requiresOrigin: true
}

CombatGrid.TILE_EFFECTS["support_target"] = { 
    slug: "support_target",
    name: "Supported",
    help: "Supported by a nearby friend",
    effectHTML: "",
    infinite: true,
    requiresOrigin: true
}

CombatGrid.TILE_EFFECTS["channel_host"] = { 
    slug: "channel_host",
    name: "Watching",
    help: "Continuously assaulting distant target",
    effectHTML: "",
    infinite: true,
    requiresOrigin: true,
}

CombatGrid.TILE_EFFECTS["channel_target"] = { 
    slug: "channel_target",
    name: "Seen",
    help: "+1T:FEAR per turn, used as continuous attack radius by [[ORIGIN]]",
    effectHTML: "",
    infinite: true,
    requiresOrigin: true,
    events: {
        onActorAffected: function({actor, reason}) {
            if(actor.team.name != this.effect.origin.team.name) addStatus({target: actor, length: 1, status: "fear"})
        },
    }
}

CombatGrid.TILE_EFFECTS["drone_haunt_target"] = { 
    slug: "drone_haunt_target",
    name: "Drone Strike",
    help: "strikes host if hostile to [[ORIGIN]] per turn, strikes vulnerable foes, +1T:EVASION per turn to [[ORIGIN]]'s allies",
    effectHTML: "",
    infinite: true,
    requiresOrigin: true,
    events: {
        onActorAffected: function({actor, reason}) {
            if(actor.team.name != this.effect.origin.team.name) {
                if(actor == this.effect.anchorActor ||  hasStatus(actor, "vulnerable")) {
                    useAction(this.effect.origin, env.ACTIONS["drone_strike"], actor, {beingUsedAsync: true, reason: "DRONE", sceneAnim: true});
                    env.rpg.effectMessage.action({
                        user: this.effect.origin,
                        target: actor,
                        hit: true,
                        reason: "DRONE",
                        action: `%TARGET is struck!`,
                        isMinor: true
                    })
                }
            } else if(Math.random() < 0.5) {
                addStatus({target: actor, origin: this.effect.origin, status: "evasion"})
                env.rpg.effectMessage.action({
                    user: this.effect.origin,
                    target: actor,
                    hit: true,
                    reason: "DRONE",
                    action: `%USER grants %TARGET insight!`,
                    isMinor: true
                })
            }
        },
    }
}

/* unused/leftovers from EP4 that might be deleted lated */
CombatGrid.TILE_EFFECTS["eyebeam"] = { 
    slug: "eyebeam",
    name: "Eyebeam",
    help: "Detonates for -1HP and 2KB upon expiration. Timer ticks every turn.",
    effectHTML: `<div class="eyebeam telegraph" time="3"></div>`,
    stacks: false,
    advanceEveryTurn: true,
    events: {
        onCreated: function() {
            //we lie about the length at first
            this.effect.tiles.forEach(tile=>{
                tile.effectMap[this.effect.id].fx.firstElementChild.setAttribute("time", tile.effectMap[this.effect.id].length - 1)
            })
        },

        onEffectAdvance: function() {
            this.effect.tiles.forEach(tile=>{
                tile.effectMap[this.effect.id].fx.firstElementChild.setAttribute("time", tile.effectMap[this.effect.id].length)
            })      
        }
    }
}

CombatGrid.TILE_EFFECTS["heart_knock"] = {
    slug: "heart_knock",
    name: "Repulsion",
    help: "KB::2 away",
    infinite: true,
    stacks: true,
    events: {
        onActorAffected: function({actor, reason}) {
            if(actor == this.effect.origin) return;
            if(actor.piece) actor.piece.knockback({ // just to get people out of range if they're inside effect
                direction: this.effect.origin.piece.tile.getRelativeDirection(actor.piece.tile), 
                strength: 2
            })
            play('miss', 0.5, 0.5)
        },
    }
}
CombatGrid.TILE_EFFECTS["instantmovetest"] = {
    slug: "instantmovetest",
    name: "Launchpad",
    help: "instant KB::6 in specified direction\nmay be used during movement",
    infinite: true,
    stacks: true,
    events: {
        onEnter: function({actor}) {
            if(actor.piece) {// it works btw
                setTimeout(() => {
                    actor.piece.knockback({direction: "up", strength: 6})                    
                }, 100)
            }
        },
    }
}