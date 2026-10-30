CombatGrid.TILE_EFFECTS["burning"] = { 
    slug: "burning",
    name: "Chemical Fire",
    help: "unresistable <o-col>-10%</o-col> max hp/turn, min:1",
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
        // reason: "knockbackEnd", ended knockback on an affected tile
        // reason: "knockback", in active knockback sequence
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

CombatGrid.TILE_EFFECTS["burning_distortion"] = { 
    slug: "burning_distortion",
    name: "Ceremonial Burn",
    help: "unresistable <o-col>-10%</o-col> hp/turn on physical entities, min:1",
    effectHTML: `<div class="burning"></div>`,
    stacks: true,
    events: {
        onActorAffected: function({actor, reason}) {
            if(actor.state == "lastStand" || actor?.team?.name != "ally") return; 

            //deals either 10% of their remaining HP, or 1 damage (whichever's higher)
            reactDialogue(actor, 'puncture');    
            let amt = Math.floor(actor.hp * 0.1) || 1

            combatHit(actor, {amt: amt, autohit: true, runEvents: false, ignoreMods: true});
            play('dull', 1, 0.5);
        }
    }
}

CombatGrid.TILE_EFFECTS["unstable_distortion"] = { 
    slug: "unstable_distortion",
    name: "Unstable Burn",
    help: "unresistable <o-col>-10%</o-col> hp/turn on all entities, min:1",
    effectHTML: `<div class="burning unstable"></div>`,
    stacks: true,
    events: {
        onActorAffected: function({actor, reason}) {
            if(actor.state == "lastStand") return; 

            reactDialogue(actor, 'puncture');    
            let amt = Math.floor(actor.hp * 0.1) || 1

            combatHit(actor, {amt: amt, autohit: true, runEvents: false, ignoreMods: true});
            play('dull', 1, 0.5);
        }
    }
}

CombatGrid.TILE_EFFECTS["chemical_fire"] = { 
    slug: "chemical_fire",
    name: "Chemical Fire",
    help: "unresistable <o-col>-20%</o-col> maxHP/turn",
    effectHTML: `<div class="burning"></div>`,
    infinite: true,
    hazardous: true, // should be hard avoided, enemies should have actions to avoid getting stuck too
    stacks: true, // tile effects can either stack, or exist as separate effects on the same tile
    events: {
        onActorAffected: function({actor, reason}) {
            if(actor.state == "lastStand") return; 
            combatHit(actor, {amt: Math.floor(actor.maxhp * 0.2), autohit: true, runEvents: false, ignoreMods: true});
            play('dull', 1, 0.5);
        },

        onTileAdded: function({tile, reason}) { 
            tile.classList.add("damagetile")
        },
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
        },

        onTileAdded: function({tile}) { 
            if(!this.effect.origin.pseudoPieces) this.effect.origin.pseudoPieces = new Set()
            this.effect.origin.pseudoPieces.add(tile)

            if(tile.piece && tile.piece?.actor != this.effect.origin) {
                tile.piece.knockback({ // just to get people out of range if they're inside effect
                    direction: this.effect.origin.piece.tile.getRelativeDirection(tile), 
                    strength: 2
                })
            }
        },
        
        onTileRemoved: function({tile}) { 
            if(this.effect.origin.pseudoPieces) this.effect.origin.pseudoPieces.delete(tile)
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
    pseudopiece: true,
    events: {
        onTileAdded: function({tile}) { 
            if(!this.effect.origin.pseudoPieces) this.effect.origin.pseudoPieces = new Set()
            this.effect.origin.pseudoPieces.add(tile)
        },
        onTileRemoved: function({tile}) { 
            if(this.effect.origin.pseudoPieces) this.effect.origin.pseudoPieces.delete(tile)
        },
    }
}

CombatGrid.TILE_EFFECTS["pseudopiece_quiet"] = { // no visible effect
    slug: "pseudopiece_quiet",
    name: "Proxy",
    help: "attacks on this tile will hit [[ORIGIN]]",
    infinite: true,
    stacks: true,
    pseudopiece: true,
    events: {
        onTileAdded: function({tile}) { 
            if(!this.effect.origin.pseudoPieces) this.effect.origin.pseudoPieces = new Set()
            this.effect.origin.pseudoPieces.add(tile)
        },
        onTileRemoved: function({tile}) { 
            if(this.effect.origin.pseudoPieces) this.effect.origin.pseudoPieces.delete(tile)
        },
    }
}

CombatGrid.TILE_EFFECTS["guarding"] = { 
    slug: "guarding",
    name: "Guarding",
    help: "<f-col definition='STATUS++redirection'>+REDIRECTION</f-col> to allies",
    effectHTML: `<div class="guarding dyne"></div>`,
    stacks: true, 
    beneficial: true,
    infinite: true,
    renderEffect: "originTile",
    events: {                
        //because actors should generally only be affected by things on turn end or creation, this is a special event
        //but it does also trigger on status creation
        onEnter: function({actor}) {
            if(actor == this.effect.origin || actor.team.name != this.effect.origin.team.name) return;
            addStatus({target: actor, origin: this.effect.origin, status: "redirection", makeInfinite: true, runEvents: false, noReact: true, noFloater: true})
            play('guard', 1, 0.5)
        },

        onLeave: function({actor}) {
            if(actor == this.effect?.origin || actor.team.name != this.effect?.origin?.team?.name) return;
            removeStatus(actor, "redirection", {runEvents: false, noFloater: true})
        },

        onTileAdded: function({tile}) { 
            if(tile?.piece?.actor) this.effect.events.onEnter({actor: tile.piece.actor})
        },

        onOriginChange: function({tile}) {
            let tileEffectData = tile.effectMap[this.effect.id]
            if(tileEffectData?.fx?.firstElementChild) tileEffectData.fx.firstElementChild.style.setProperty("--size", this.effect.data.styleSize)
        },
    
        onCreated: function() {
            let tileEffectData = this.effect.originTile.effectMap[this.effect.id]
            if(!this.effect?.data) this.effect.data = {styleSize: "300%"}
            if(tileEffectData?.fx?.firstElementChild) tileEffectData.fx.firstElementChild.style.setProperty("--size", this.effect.data.styleSize)
        },
    }
}

CombatGrid.TILE_EFFECTS["clawing_distortion"] = { 
    slug: "clawing_distortion",
    name: "Grasping Distortion",
    help: "draws physical entities deeper into distortion",
    effectHTML: ``,
    beneficial: true,
    stacks: true,
    hazardous: true,
    events: {
        onActorAffected: function({actor, reason}) {
            if((actor.team.name != this.effect.origin.team.name) && !env.rpg.turnData[`${actor.slug}_${this.effect.slug}`] && actor.base.slug != "destructible_split_wall" && !actor.base.slug.includes("ceremony")) {
                env.rpg.turnData[`${actor.slug}_${this.effect.slug}`] = true
                env.rpg.grid.handleActionAOE({
                    originActor: this.effect.origin,
                    targetTile: actor.piece.tile,
                    action: env.ACTIONS["formless_pull"],
                    actionSettings: {
                        beingUsedAsync: true,
                        reason: "grasping distortion",
                        sceneAnim: true,

                        //animation ref
                        noSwipe: true,
                        actionSettings: {
                            beingUsedAsync: true,
                        }
                    }
                })
            }
        },
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
    help: "<n-col definition='STATUS++destabilized'>+1T:DESTABILIZE</n-col>/turn on all entities within\n<n-col definition='STATUS++destabilized'>DESTABILIZE</n-col> becomes infinite while within",
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
    help: "<o-col definition='STATUS++vulnerable'>+2T:VULNERABLE</o-col> on foes, <f-col definition='STATUS++focused'>+1T:FOCUSED</f-col> on allies",
    effectHTML: "",
    stacks: true, 
    beneficial: true,
    renderEffect: "originTile",
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
    cameraListener: true,
    tickEvenIfOriginDead: true,
    stacks: false, // false on stacks is basically to say, "treat this as separate from other telegraph effects on the same tile"
    updateStyling: function(tile) {
        if(this.data?.direction) if(tile.effectMap[this.id]?.fx?.firstElementChild) tile.effectMap[this.id].fx.firstElementChild.setAttribute("direction", this.data.direction)
        if(this.data?.strength) if(tile.effectMap[this.id]?.fx?.firstElementChild) tile.effectMap[this.id].fx.firstElementChild.setAttribute("strength", this.data.strength)
        if(this.data?.size) if(tile.effectMap[this.id]?.fx) tile.effectMap[this.id].fx.style.setProperty("--size", this.data.size)
        if(this.data?.lengthStyle) if(tile.effectMap[this.id]?.fx) tile.effectMap[this.id].fx.style.setProperty("--length", this.originTile.effectMap[this.id].length)
    },
    events: {
        //useful stuff for styling if needed
        onCreated: function() {
            if(this.effect?.data?.onCreated) this.effect.data.onCreated(this.effect)
            this.effect.tiles.forEach(tile=>this.effect.updateStyling(tile))
        },

        onDeleted: function() {
            if(this.effect?.data?.onDeleted) this.effect.data.onDeleted(this.effect)
        },

        
        onShifted: function({oldOrigin, newOrigin}) { 
            if(this.effect.data && this.effect.originTile) {
                this.effect.updateStyling(newOrigin)
            }
        },
    
        onEffectAdvance: function({incitingActor} = {}) {
            if(this.effect?.data?.lengthStyle) {
                this.effect.tiles.forEach(tile=> { 
                    if(tile.effectMap[this.effect.id]?.fx) tile.effectMap[this.effect.id].fx.style.setProperty("--length", this.effect.originTile.effectMap[this.effect.id].length)
                    if(this.effect.originTile.effectMap[this.effect.id].length == 0 && tile.effectMap[this.effect.id]?.fx) tile.effectMap[this.effect.id].fx.classList.add('expiring')
                })
            }
        }
    }
}

CombatGrid.TILE_EFFECTS["manual_bomb"] = { 
    slug: "manual_bomb",
    name: "Planted Bomb",
    help: "<o-col>-6HP</o-col> <o-col definition='STATUS++stun'>+1T:STUN</o-col> <o-col definition='STATUS++puncture'>+2T:PUNCTURE</o-col> when activated",
    effectHTML: `<div class="telegraph"></div>`,
    stacks: false,
    infinite: true,
    requiresOrigin: true
}

CombatGrid.TILE_EFFECTS["deathbomb"] = { 
    slug: "deathbomb",
    name: "Bomb",
    help: "radius of BOMB status detonation",
    effectHTML: `<div class="telegraph dyne" style="--size: 300%"></div>`,
    stacks: false,
    infinite: true,
    requiresOrigin: true,
    renderEffect: "originTile",
}

CombatGrid.TILE_EFFECTS["firebomb"] = { 
    slug: "firebomb",
    name: "Volatile",
    help: "radius of VOLATILE status detonation",
    effectHTML: `<div class="telegraph dyne" style="--size: 300%"></div>`,
    stacks: false,
    infinite: true,
    requiresOrigin: true,
    renderEffect: "originTile",
    events: {
        onTileAdded: function({tile, reason}) { 
            if(tile?.piece?.actor && reason == "shifting" && this.effect.intendedSize) this.effect.originTile.effectMap[this.effect.id].fx.firstElementChild.style.setProperty("--size", this.effect.intendedSize)
        },
    }
}

CombatGrid.TILE_EFFECTS["scene_edge"] = {
    slug: "scene_edge",
    name: "Distortion",
    help: "<o-col>-3HP</o-col> <n-col definition='STATUS++destabilized'>+2T:DESTABILIZED</n-col>, thrown to random tile",
    tileClass: "scene_edge-tile",
    renderEffect: false,
    infinite: true,
    stacks: true,
    hazardous: true, // only use this flag when something should be hard avoided by AI
    events: {
        //distinct from onActorAffected with reason turnend - this is detected differently by having everyone checked for their presence in the effect
        //whereas onActorAffected reason: turnend is like, the current actor ended their turn in it
        onAnyTurnEnd: function({actor}) {
            if(
                actor?.immunities?.scene_edge ||
                env.currentDialogue.active ||
                !env.rpg.turnData.turn || // spawned in
                env.rpg.turnData[`scene_edge-${actor.id}`] || // in case they somehow land on another (i.e. fallback)
                actor.displacing
            ) return;
            let isCurrentActor = actor == env.rpg.currentActor
            env.rpg.turnData[`scene_edge-${actor.slug}`] = true

            if(!actor.piece) return console.warn("no piece for actor", actor.name, actor); //might die before here

            // delays once, then only slightly after that
            // most displacements should happen around the same time
            if(!env.rpg.turnData[`scene_edge-delay`]) {
                delayAdvance(env.ADVANCE_RATE)
                env.rpg.turnData[`scene_edge-delay`] = true
            } else {
                env.rpg.lastUpdate = new Date() + env.ADVANCE_RATE
            }

            setTimeout(()=>{
                play("dull")
                combatHit(actor, {amt: 3, autohit: true, runEvents: false})
                addStatus({target: actor, origin: this.effect.origin, status: "destabilized", length: 2, noReact: true})
                actor.piece.displace({possibleTiles: env.rpg.scenario.getSceneEdgeLandingTiles ? env.rpg.scenario.getSceneEdgeLandingTiles(actor.piece.tile) : undefined})

                if(actor.team.name != "neutral") env.rpg.effectMessage.action({
                    user: actor,
                    target: actor,
                    status: env.STATUS_EFFECTS.scene_edge,
                    reason: "distortion",
                    action: `the overlap's threshold writhes!`,
                    specialHitText: `%TARGET is distorted and displaced!`,
                    isMinor: true,
                    combineLikeAction: true,
                    showFullDetail: true
                })
            }, env.ADVANCE_RATE * 0.5)
        }
    }
}

CombatGrid.TILE_EFFECTS["antimelee"] = {
    slug: "antimelee",
    name: "Unnatural Reflex",
    help: "<o-col>-6HP</o-col> <o-col definition='STATUS++fear'>+2T:FEAR</o-col>, <n-col definition='STATUS++kb'>KB::4</n-col>",
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
    help: "<o-col>-2HP</o-col> <n-col definition='STATUS++kb'>KB::3</n-col>",
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
    help: "<o-col>+1T:FEAR</o-col>\nmoves on ANY turn",
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

CombatGrid.TILE_EFFECTS["opportunity"] = { 
    slug: "opportunity",
    name: "Opportunity",
    help: "attack any unaligned actors landing inside or moving through radius once per turn",
    effectHTML: "",
    infinite: true,
    requiresOrigin: true,
    alwaysTriggerOnEnter: true,
    tickType: "onTurnEnd",
    class: "opportunity",

    //when acting on an opportunity an ally actor is stepping through, halt their movement, hit them, then resume movement
    act: (user, action, target, effect) => {
        if(
            env.rpg.turnData[`${target.slug}_${user.slug}_opportunity`] || // only trigger once per turn on a specific actor
            effect.createdTurn == env.rpg.turnData.turn ||
            target.team.name == "neutral" ||
            env.rpg?.targetingFor?.target == target // if the enemy is in a movement phase, they won't attack the person they're moving towards
        ) return;

        if(env.rpg.state == "animating" && env.rpg.currentActor.team.name == "ally") {
            env.rpg.forceStopMovement = true
            effect.tiles.forEach(tile => tile.effectMap[effect.id].fx.classList.add("spent"))
        }

        let timeStep = env.rpg.currentActor.team.name == "ally" ? (env.ADVANCE_RATE * 0.25) : 0
        env.rpg.turnData[`${target.slug}_${user.slug}_opportunity`] = true
                    
        sendFloater({
            target: user,
            type: "arbitrary",
            arbitraryString: "OPPORTUNITY!",
            beneficial: false,
            size: 0.75
        })

        if(env.rpg.currentTeam.name != "ally") {
            delayAdvance(500)
        }

        setTimeout(()=>{
            env.rpg.turnData.chargeIndex = useAction(user, action, target, {beingUsedAsync: true, reason: "opportunity", incitingStatus: env.STATUS_EFFECTS.opportunity, actionMessageIndex: env.rpg.turnData.chargeIndex, importantActionMessage: true})
            setTimeout(()=>env.rpg.state = false, timeStep + 500)
        }, timeStep)
    },

    events: {
        onEnter: function({actor}) {
            if(actor.team.name !== this.effect.origin.team.name) {
                let action = this.effect.specificAction || env.ACTIONS["arch_hulk_rampage"]
                this.effect.act(this.effect.origin, action, actor, this.effect)
            }
        },

        onActorAffected: function({actor, reason}) {
            if(reason == "endturn" && actor.team.name !== this.effect.origin.team.name) {
                let action = this.effect.specificAction || env.ACTIONS["arch_hulk_rampage"]
                this.effect.act(this.effect.origin, action, actor, this.effect)
            }
        }
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
    help: "Imminently attacked by by [[ORIGIN]]",
    effectHTML: "",
    infinite: true,
    requiresOrigin: true,
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

CombatGrid.TILE_EFFECTS["direction_target"] = { 
    slug: "direction_target",
    name: "Direction",
    help: "<o-col definition='STATUS++vulnerable'>+1T:VULNERABLE</o-col> to [[ORIGIN]]'s foes, <f-col definition='STATUS++evasion'>+1T:EVASION</f-col> to [[ORIGIN]]'s allies",
    effectHTML: "",
    infinite: true,
    requiresOrigin: true,
    affectNearbyOnTurnEnd: true,
    events: {
        onActorAffected: function({actor, reason}) {
            if(env.rpg.turnData[`${actor.slug}_${this.effect.slug}`]) return;

            if(actor.team.name != this.effect.origin.team.name) {
                addStatus({target: actor, origin: this.effect.origin, status: "vulnerable", length: 1})
            } else {
                addStatus({target: actor, origin: this.effect.origin, status: "evasion", length: 1})
            }
            
            env.rpg.turnData[`${actor.slug}_${this.effect.slug}`] = true
        },
    }
}

CombatGrid.TILE_EFFECTS["direction_terror"] = { 
    slug: "direction_terror",
    name: "Terrorize",
    help: "<o-col definition='STATUS++vulnerable'>+2T:VULNERABLE</o-col>, <o-col definition='STATUS++terror'>+1T:TERROR</o-col> if not terrorized already",
    effectHTML: "",
    requiresOrigin: true,
    renderEffect: "originTile",
    events: {
        onActorAffected: function({actor, reason}) {
            if(actor.team == env.rpg.allyTeam) {
                addStatus({target: actor, origin: this.effect.origin, status: "vulnerable", length: 2})
                if(!hasStatus(actor, "terror")) addStatus({target: actor, origin: this.effect.origin, status: "terror", length: 1})
            }
        },
    }
}

/* unused/leftovers from EP4 that might be deleted lated */
CombatGrid.TILE_EFFECTS["eyebeam"] = { 
    slug: "eyebeam",
    name: "Eyebeam",
    help: "Detonates for <o-col>-1HP</o-col> and <n-col definition='STATUS++kb'>KB::2</n-col> upon expiration. Timer ticks every turn.",
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

CombatGrid.TILE_EFFECTS["heart_consumption"] = { 
    slug: "heart_consumption",
    name: "Infestation",
    help: "<o-col definition='STATUS++siphon'>+1T:SIPHON</o-col>, unresistable <o-col>-3HP</o-col> attack from parasite",
    stacks: true,
    hazardous: true,
    events: {
        onActorAffected: function({actor, reason}) {
            if(actor.state == "lastStand" || actor?.team?.name == "enemy" || !env.rpg.actors?.heart_parasite) return; 
            addStatus({target: actor, status: "siphon", length: 2})
            combatHit(actor, {amt: 3, ignoreMods: true, autohit: true, origin: env.rpg.actors?.heart_parasite});

            
            drawEffectLine(env.rpg.actors.heart_parasite, actor, {
                color: "obesk",
                effectClass: "baseline icon",
                duration: 3000,
                style: `--icon: url(${env.STATUS_EFFECTS["heart_parasite"].icon});`
            })

            if(actor.team.name != "neutral") env.rpg.effectMessage.action({
                user: env.rpg.actors.heart_parasite,
                target: actor,
                status: env.STATUS_EFFECTS.scene_heart_consumption,
                reason: env.STATUS_EFFECTS.scene_heart_consumption.name,
                action: `parasitic tendrils manifest...`,
                specialHitText: `the air itself gnaws at %TARGET's flesh!`,
                isMinor: true,
                combineLikeAction: true,
                showFullDetail: true
            })

            setTimeout(()=>play('chomp'), env.ADVANCE_RATE * 0.2)
        },
    }
}