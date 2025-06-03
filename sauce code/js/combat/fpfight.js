/* 

	this outlines the "first person fight" golem minigame

*/

class FPFight {
    constructor() {
        this.running = false
        this.paused = false

        this.validMoves = {
            strike: {
                name: "strike",
                desc: "TYPE::'stationary heavy attack';'knock enemy back on unguarded hit';'overpower advancing foe'\nPOWER::2\nPREPARATION::'improves range and power by 1'",
                priority: 2,
                range: 1,
                kb: 1,
                type: 'offense',
                enemyLogic: (currentEnemyMoves) => {
                    //make some assumptions that advances will work - enemy is 'cocky' (mindlessly aggressive)
                    let playerInRange = (this.distance - + currentEnemyMoves.filter(x => x == "advance").length) <= 1
                    let playerInWindupRange = (this.distance - currentEnemyMoves.filter(x => x == "advance").length) <= 2

                    if(
                        playerInRange || 
                        ((currentEnemyMoves[currentEnemyMoves.length - 1] == "windup") && playerInWindupRange)
                    ) return true
                }
            },

            advance: {
                name: "advance",
                desc: "TYPE::'move forward';'initiate light attack on foe if met'\nPOWER::1\nPREPARATION::'improves power and tile knockback by 1'",
                priority: 1,
                range: 0,
                kb: 1,
                posMod: 1,
                breakGuard: true,
                type: 'offense',
                enemyLogic: (currentEnemyMoves) => {
                    return true // this is always a valid move
                }
            },

            guard: {
                name: "guard",
                desc: "TYPE::'hold position and block next attack';'siphon enemy power';'removed at end of turn or when hit by ADVANCE'",
                type: 'guard',
                enemyLogic: (currentEnemyMoves) => { //only guards once, if at all, and only within decent range. also won't guard if close to knocking player in
                    return (!currentEnemyMoves.includes('guard') && (this.distance < 3) && (this.enemy.position < this.height - 3))
                }
            },

            windup: {
                name: "Wind Up",
                desc: "TYPE::'move back and enhance next attack';'beware of damage tile'\nCONTEXT::'preparation increases:';'attack strength';'range of STRIKE';'knockback of ADVANCE';\n'lost when attacking or hit'",
                type: 'prepare',
                posMod: -1,
                enemyLogic: (currentEnemyMoves) => { //only winds up once, and only if not prepared already. also not if in range of damage
                    let mightWindup = (!currentEnemyMoves.includes('windup') && (this.enemy.prepared == false))
                    let safeToUse = (this.enemy.position + currentEnemyMoves.filter(x => x == "advance").length) > 1
                    return mightWindup && safeToUse
                }
            }
        }

        this.moveList = [
            'strike',
            'advance',
            'guard',
            'windup'
        ]
    }

    //start
    start({
        koCallback,
        movesPerStep = 2,
        height = 7
    }) {
        if(body.classList.contains("in-melee")) throw 'already doing melee'
        this.movesPerStep = Number(movesPerStep)
        this.height = Number(height)
        this.koCallback = koCallback
        window.melee = this

        this.queue = []

        this.enemy = {
            name: "foe",
            slug: "enemy",
            position: 1,
            damage: 0,
            prepared: false,
            offBalance: false,
            posMult: 1,
            plan: []
        }

        this.player = {
            name: "IK",
            slug: "player",
            position: 5,
            damage: 0,
            prepared: false,
            offBalance: false,
            posMult: -1 //determines direction of movement - player moves up, so -1 * all movement
        }

        this.turn = {}

        this.enemy.foe = this.player
        this.player.foe = this.enemy

        this.running = true
        this.paused = true
        
        MUI("prohibit")
        
        body.classList.add('in-melee')
        content.insertAdjacentHTML("beforeend", `
            <div class="fp fp-unsetcam fp-stopped">

                <div class="fp-grid-container">
                    <div class="fp-crane">
                        <div class="fpgrid-look">
                            <div class="fpgrid"></div>
                        </div>
                    </div>
                </div>

                <div class="fp-controls">
                    <div class="fp-enemy-queue fp-queuelist"></div>

                    <div class="fp-buttons">
                        <div class="offensive">
                            <button definition="${this.validMoves.strike.desc}" onclick="javascript:window.melee.enqueue('strike')">strike</button>
                            <button definition="${this.validMoves.advance.desc}" onclick="javascript:window.melee.enqueue('advance')">advance</button>
                        </div>
                        <div class="prepare">
                            <button definition="${this.validMoves.guard.desc}" onclick="javascript:window.melee.enqueue('guard')">guard</button>
                            <button definition="${this.validMoves.windup.desc}" onclick="javascript:window.melee.enqueue('windup')">wind up</button>
                        </div>
                    </div>

                    <div class="fp-queue">
                        <div class="fp-current-queue fp-queuelist"></div>
                        <div class="fp-queue-buttons">
                            <button class="go" onclick="javascript:window.melee.step(window.melee.queue)">go</button>
                            <button class="clear" onclick="javascript:window.melee.clearQueue()">clear</button>
                        </div>
                    </div>
                </div>

                <div id="fp-declare">
                    <!-- example:
                    <div class="fp-declare player">IK::'advance'</div>
                    <div class="fp-declare enemy">FOE::'advance'</div>
                    <div class="fp-declare-winner enemy">FOE</div>
                    -->
                </div>
            </div>
        `)

        //init element selectors
        this.el = document.querySelector('.fp')
        this.grid = document.querySelector('.fpgrid')
        for (let i = 0; i < this.height; i++) {
            this.grid.insertAdjacentHTML('beforeend', '<div class="fp-gridpiece"></div>')
        }

        this.el.querySelectorAll('button').forEach(el=>{
            el.addEventListener('mouseenter', ()=>{ play("obeskHover", 1, 0.5) })
            el.addEventListener('click', ()=>{ play("obeskClick", 0.75, 0.5) })
        })

        this.player.position = this.height - 2;

        //set up initial tiles
        [this.grid.children[0], this.grid.children[this.grid.children.length - 1]].forEach(tile=>{
            tile.classList.add('fp-damagepanel')
            tile.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            `
        })
        this.grid.insertAdjacentHTML(`beforeend`, `
            <figure id="fp-enemy" class="fp-ent">
                <div class="fp-golem">
                    <div class="left fist"></div>
                    <div class="right fist"></div>
                </div>
            </figure>
            <figure id="fp-player" class="fp-ent">
                <div class="fp-golem">
                    <div class="left fist"></div>
                    <div class="right fist"></div>
                </div>
            </figure>
        `)

        this.queueListEl = document.querySelector('.fp-current-queue')
        this.enemyQueueEl = document.querySelector('.fp-enemy-queue')
        this.enemy.golem = document.querySelector('#fp-enemy .fp-golem')
        this.player.golem = document.querySelector('#fp-player .fp-golem')

        this.gridContainer = document.querySelector('.fp-grid-container')
        this.gridContainer.style.setProperty("--stage-width", 1)
        this.gridContainer.style.setProperty("--stage-height", this.height)

        this.declare = document.querySelector('#fp-declare')
        
        this.updateProperties()
        this.generateEnemyPlan()

        //animate in
        setTimeout(()=> { this.el.classList.add('fp-start'); this.el.classList.remove('fp-stopped') }, 50)
        
        //finalize creation of active fight
        setTimeout(()=> {
            this.paused = false
            this.el.classList.remove('fp-unsetcam')
        }, 2000)
    }

    stop() {
        this.running = false
        MUI("deprohibit")

        this.el.classList.add('fp-unsetcam', 'fp-stopped')
        body.classList.remove('in-melee')
        setTimeout(()=>this.el.classList.remove('fp-start'), 2000)
        setTimeout(()=>this.el.remove(), 4000)
    }

    tutorialStep() {
        if(!this.el.classList.contains('tutorialzoom') && !this.el.classList.contains('tutorial1')) { this.el.classList.add('tutorialzoom', 'tutorial', 'fp-unsetcam', 'fp-hide'); body.classList.remove('in-melee'); return}
        if(!this.el.classList.contains('tutorial1')) { this.el.classList.add('tutorial1'); this.el.classList.remove('fp-hide', 'fp-unsetcam');  body.classList.add('in-melee'); return}
        if(!this.el.classList.contains('tutorial2')) { this.el.classList.add('tutorial2'); this.el.classList.remove('tutorialzoom'); return}
        if(!this.el.classList.contains('tutorial3')) { this.el.classList.add('tutorial3'); return}
        if(!this.el.classList.contains('tutorial4')) { this.el.classList.add('tutorial4'); return}
        if(!this.el.classList.contains('tutorial5')) { this.el.classList.add('tutorial5'); return}
        if(!this.el.classList.contains('tutorial6')) { this.el.classList.add('tutorial6'); return}
        
        this.el.classList.remove('tutorial', 'tutorial1', 'tutorial2', 'tutorial3', 'tutorial4', 'tutorial5', 'tutorial6')
    }

    //generates the enemy plan for the next turn, and updates their queue to show one preview
    generateEnemyPlan() {
        this.enemy.moves = []
        for (let i = 0; i < this.movesPerStep; i++) {
            //filters for valid decisions each for each step - don't want to chain certain things
            let validMoves = this.moveList.filter(move => this.validMoves[move].enemyLogic(this.enemy.moves) ? true : false)
            this.enemy.moves.push(validMoves.sample())   
        }

        this.enemyQueueEl.innerHTML = ""
        let divinedMove = rand(0, this.movesPerStep)
        this.enemy.moves.forEach((move, i) => { //only show one enemy move
            if(i == divinedMove) this.enemyQueueEl.insertAdjacentHTML('beforeend', `<span definition="${this.validMoves[move].desc}">${this.validMoves[move].name}</span>`)
            else this.enemyQueueEl.insertAdjacentHTML('beforeend', `<span definition="TYPE::'unknown';'cannot tell for sure'">????</span>`)
        });
    }

    /* turn procession
        the enemy and player move at the exact same time, resulting in clashes
        this function takes an array of steps the player is taking, with enemy ones chosen procedurally (but not reactively)
    */
    async step(playerMoves) {
        if(playerMoves.length == 0 || this.el.classList.contains('steppin')) return
        this.el.classList.add('steppin')
        this.updateProperties()

        let damageEnd = false //determines if the step is over based on whether anyone took reset damage
        for (let i = 0; i < playerMoves.length; i++) {
            if(damageEnd) continue

            this.player.move = playerMoves[i]
            this.enemy.move = this.enemy.moves[i]
            this.player.moveObj =  this.validMoves[this.player.move];
            this.enemy.moveObj =  this.validMoves[this.enemy.move];

            //for each step, we need to determine whether each entity is on the offense, and where they intend to go
            [this.player, this.enemy].forEach(ent => {
                ent.intent = {
                    position: ent.position,
                    range: 0,
                    priority: 0,
                    offensive: false
                }

                //determine if it's an offensive move, whether it's prepared, and all interactions
                if(ent.moveObj.type == 'offense') {
                    ent.intent.priority = ent.moveObj.priority + (ent.prepared ? 1 : 0)
                    ent.intent.range = ent.moveObj.range + ((ent.prepared && (ent.move == "strike")) ? 1 : 0)
                    ent.intent.kb = ent.moveObj.kb + ((ent.prepared && (ent.move == "advance")) ? 1 : 0)
                    ent.intent.offensive = true
                } else if(ent.moveObj.type == "guard") {
                    ent.intent.guard = true
                } else if(ent.moveObj.type == "prepare") {
                    ent.prepared = true
                }

                //determine their intended position
                if(ent.moveObj.posMod) {
                    console.log(ent.name, "'s posMult is", ent.posMult, "and they are at", ent.intent.position)
                    ent.intent.position = ent.intent.position + (ent.moveObj.posMod * ent.posMult)
                    console.log('they want to move', ent.moveObj.posMod,'so it is now', ent.intent.position)
                }
            })

            this.turn = {
                dispute: false,
                winner: false,
                loser: false,
                intendedDistance: (this.player.intent.position - this.enemy.intent.position),
            }
            
            /* determine if there's a 'dispute' like so:
                (clash) if someone is on the offense and their opponent in range (via distance)
                (clash) if they're trying to move past one another (i.e. advancing while right next to eachother)
                (position) if they're trying to advance into the same position
            */
            if(this.player.intent.offensive || this.enemy.intent.offensive) {
                if(
                    (this.player.intent.position == this.enemy.intent.position) &&
                    (this.player.move == "advance" && this.enemy.move == "advance")
                ) this.turn.dispute = "position"

                else if(
                    (this.player.intent.range >= this.turn.intendedDistance) || 
                    (this.enemy.intent.range >= this.turn.intendedDistance) || 
                    (this.turn.intendedDistance < 0)
                ) this.turn.dispute = "clash"
            }
            this.resolveClash()

            damageEnd = await this.animateStep()
        }

        this.player.offBalance = false
        this.enemy.offBalance = false
        console.log('done with all steps')
        this.clearQueue()
        this.el.classList.remove('steppin')
        this.generateEnemyPlan()
    }

    //if there's a dispute in a turn, this function determines the winner (and end positions)
    resolveClash() {
        //determine winner based on either priority advantage, or randomness
        if(this.enemy.intent.priority == this.player.intent.priority) {
            console.log('equal priority')
            //power clashes have no winner
            console.log('dispute:', this.turn.dispute)
            if(this.enemy.intent.priority >= 3) {
                this.turn.dispute = "power clash"
                console.log('power clash')
            }

            if(Math.random() > 0.5) {
                this.turn.winner = this.player
                this.turn.loser = this.enemy
                if(this.turn.dispute) console.log('randomly chose', this.turn.winner, 'to win')
            } else {
                this.turn.winner = this.enemy
                this.turn.loser = this.player
                if(this.turn.dispute) console.log('randomly chose', this.turn.winner, 'to win')
            }

        } else {
            if(this.enemy.intent.priority > this.player.intent.priority) {
                this.turn.winner = this.enemy
                this.turn.loser = this.player
                console.log(this.turn.winner, 'to win')
            } else {
                this.turn.winner = this.player
                this.turn.loser = this.enemy
                console.log(this.turn.winner, 'to win')
            }
        }

        switch(this.turn.dispute) {
            case 'position': //loser is pushed back if intendedDistance is 0, or stays still if intendedDistance is 1
                this.turn.winner.endPosition = this.turn.winner.intent.position
                console.log('position dispute, both want to go to', this.turn.winner.intent.position)

                if(this.turn.intendedDistance <= 1) {
                    this.turn.loser.endPosition = this.turn.loser.position
                    console.log('keeping the loser at', this.turn.loser.endPosition)
                } else {
                    this.turn.loser.endPosition = this.turn.loser.position - (1 * this.turn.loser.posMult)
                    console.log('pushing the loser back', this.turn.loser.endPosition)
                }

                //they actually get moved back an extra spot when the winner is prepared
                if(this.turn.winner.prepared) { //the winner gets moved further as well
                    this.turn.winner.endPosition = this.turn.loser.endPosition
                    this.turn.loser.endPosition = this.turn.loser.endPosition - (1 * this.turn.loser.posMult)
                }

                this.player.prepared = false; this.enemy.prepared = false 
            break

            case 'clash': //loser is pushed back by the kb modifier, winner advances. if loser is preparing, block!
                if(!this.turn.loser.intent.guard || this.turn.loser.offBalance) { //if the person being attacked is not guarding, they just lose. extra KB if hitting someone winding up
                    this.turn.loser.endPosition = this.turn.loser.position - (((this.turn.loser.moveObj.type == "prepare" ? 1 : 0) + this.turn.winner.intent.kb) * this.turn.loser.posMult)
                    this.turn.loser.prepared = false
                } else { //otherwise the 'loser' actually blocked!
                    console.log('blocking', this.turn.loser)
                    this.turn.dispute = "block"
                    this.turn.loser.endPosition = this.turn.loser.position

                    //guarding siphons preparation
                    if(this.turn.winner.prepared) {
                        this.turn.loser.prepared = true
                        this.turn.winner.justSiphoned = true
                    }

                    //if the attacker is advancing, this breaks block for the rest of the turn
                    if(this.turn.winner.move == "advance") {
                        this.turn.loser.offBalance = true
                    }
                }

                //this should keep them in range always
                this.turn.winner.endPosition = this.turn.loser.endPosition - (1 * this.turn.winner.posMult)
                this.turn.winner.prepared = false
                console.log(`clash resolved, winner (${this.turn.winner.name}) and loser (${this.turn.loser.name}) respectively`, this.turn.winner.endPosition, this.turn.loser.endPosition)
            break

            case 'power clash': //both sides get knocked back a square, creating a gap between them
                this.turn.loser.endPosition = this.turn.loser.position - (1 * this.turn.loser.posMult)
                this.turn.winner.endPosition = this.turn.winner.position - (1 * this.turn.winner.posMult)
                
                this.player.prepared = false; this.enemy.prepared = false
                console.log(`power clash resolved, ${this.turn.winner.name} and ${this.turn.loser.name} respectively`, this.turn.winner.endPosition, this.turn.loser.endPosition)
            break

            default: //no clash - just movement probably
                this.turn.loser.endPosition = this.turn.loser.intent.position
                this.turn.winner.endPosition = this.turn.winner.intent.position
                console.log(`no clash just moving, ${this.turn.winner.name} and ${this.turn.loser.name}`, this.turn.winner.endPosition, this.turn.loser.endPosition)
            break
        }
    }

    async animateStep() {
        /* each step needs to go through a few animation segments: 
            1) WINDUP - player and enemy 'wind up', sorta telegraphing what they do (1s)

                all of these reach a sort of 'about to happen' pose
            2) DECLARE - the text saying what each side will do appears on screen, 'flying' in (1s)

            3A) CONTINUE - no clash, so just advance (no 4)

            3B) COLLIDE - if there was a dispute, the two clash just after text shows up, showing the winner (2s)
            4B) RESULT - send the winner/loser flying, leaving an 'ending' pose as time slows down again (1s)

            FINAL) RESET - if either entity is in their damage tile, we reset positions 
        */

        /* Step 1: WINDUP
            enemy rep and player hands are animated into an 'about to move/attack' pose
                advance - enemy tilts forward, arms come up. player does similar move
                strike - enemy rears an arm, player does same thing, starts to lower it
                wind up - arm raised back, ready to smash
                prepare - arms crossed, guarding
        */
        this.el.setAttribute('a_stage', 'windup'); await wait(50); //so anim_stage has a sec to apply transition rules
        this.enemy.golem.setAttribute('a', this.enemy.move)
        this.player.golem.setAttribute('a', this.player.move)
        
        this.debug ? await this.debugWait() : await wait(300)

        /* Step 2: DECLARE
            the moves that the enemy and player are planning on doing appear in the declaration tab
        */
        this.declare.insertAdjacentHTML(`afterbegin`, `
            <div class="fp-declare player">IK::${this.player.move}</div>
            <div class="fp-declare enemy">FOE::${this.enemy.move}</div>
        `)
        await wait(100)
        this.declare.classList.add('flyin')
        this.debug ? await this.debugWait() : await wait(600)

        if(this.player.move == "windup") { this.player.golem.classList.add('prepared'); play('dull', 1.5, 1) }
        if(this.enemy.move == "windup") { this.enemy.golem.classList.add('prepared'); play('dull', 1.5, 1) }

        /* Step 3 branch: COLLIDE or CONTINUE
            if there's no dispute, we just CONTINUE since nothing interesting is happening this turn.
            Otherwise, we continue onwards with the animation.
        */        
        if(this.turn.dispute) { //3B - COLLIDE - moves are animated up to the second they hit, then it pauses and the winner of the step is declared
            //this is the moment when fists meet
            this.el.setAttribute('a_stage', 'collide');

            ratween(env.bgm, 0.5, 300)
            if(this.distance > 1) { //if one person is lunging, they should visibly come closer
                let preparedCount = this.turn.loser.prepared + this.turn.winner.prepared
                let baseWeight = (this.distance - 1) / (2 + preparedCount * 0.5);
                
                this.gridContainer.style.setProperty(`--${this.turn.winner.slug}-position`, this.turn.winner.position + ((this.turn.winner.prepared ? baseWeight * 1.5 : baseWeight)) * this.turn.winner.posMult)
                this.gridContainer.style.setProperty(`--${this.turn.loser.slug}-position`, this.turn.loser.position + ((this.turn.loser.prepared ? baseWeight * 1.5 : baseWeight)) * this.turn.loser.posMult)

            } else { //otherwise, they should battle slightly for the same space
                this.gridContainer.style.setProperty(`--${this.turn.winner.slug}-position`, this.turn.winner.position + (0.5 * this.turn.winner.posMult))
                this.gridContainer.style.setProperty(`--${this.turn.loser.slug}-position`, this.turn.loser.position - (0.5 * this.turn.loser.posMult))
            }

            this.declare.insertAdjacentHTML('beforeend', `
                <div class="fp-declare-winner ${this.turn.winner.slug} ${this.turn.dispute == "power clash" ? "both" : ""}" type="${this.turn.dispute}">${this.turn.dispute == "power clash" ? "both" : this.turn.winner.name}</div>
            `)

            this.el.classList.add('shake')
            if(this.turn.winner.slug == "player") this.el.classList.add('forwardtilt'); else this.el.classList.add('backtilt')
            switch(this.turn.dispute) {
                case "block":
                    play('hit', 0.75)
                    if(this.turn.winner.justSiphoned) {
                        this.turn.winner.justSiphoned = false
                        setTimeout(()=>{this.turn.loser.golem.classList.add('prepared'); play('dull', 1.5, 1)}, 200)
                    } else {
                        setTimeout(()=>play('guard', 0.75), 200)
                    }
                break
                case "power clash":
                    play('crit', 0.5)
                break
                case "position":
                    play('hit', 0.75)
                break
                case "clash":
                    play('stab', 0.75)
                break
            }

            await wait(100)
            setTimeout(()=>this.el.classList.remove('shake'), 400)

            this.declare.classList.add('win')
            ratween(env.bgm, 1, 300)
            this.debug ? await this.debugWait() : await wait(500)
            this.el.classList.remove('backtilt', 'forwardtilt')

            /* Step 4B: RESULT
                finally, the collision reaction classes are assigned, and we continue
                //on a power clash, both winner and loser should have knockback
                //on a block, the loser should wince, and attacker should recoil a little
                //on a regular clash, loser should have knockback, winner should have ending class based on the move (prepared attack, prepared move, attack, move)
            */
            this.el.setAttribute('a_stage', 'result')
            await wait(50)

            switch(this.turn.dispute) {
                case "block":
                    this.turn.winner.golem.setAttribute('a', 'knock')
                    if(this.turn.winner.move == "advance") {
                        this.turn.loser.golem.setAttribute('a', 'knock')
                        this.turn.winner.golem.setAttribute('a', 'strike')
                    } else {
                        this.turn.loser.golem.setAttribute('a', 'block')
                        this.turn.winner.golem.setAttribute('a', 'knock')
                    }
                break
                case "power clash":
                    this.turn.winner.golem.setAttribute('a', 'knock')
                    this.turn.loser.golem.setAttribute('a', 'knock')
                break
                case "position":
                    this.turn.winner.golem.setAttribute('a', 'advance')
                    this.turn.loser.golem.setAttribute('a', 'knock')
                break
                case "clash":
                    this.turn.winner.golem.setAttribute('a', this.turn.winner.move) //advance and strike have result classes
                    this.turn.loser.golem.setAttribute('a', 'knock')
                break
            }
            
            this.turn.winner.golem.classList.remove('prepared'); 
            if(this.turn.dispute != "block") this.turn.loser.golem.classList.remove('prepared'); 

        } else { //3A - CONTINUE - no 'winner' needs to be shown or animated
            this.el.setAttribute('a_stage', 'continue')
        }

        [this.player, this.enemy].forEach(ent => {
            this.moveTo(ent, ent.endPosition)
        })

        this.debug ? await this.debugWait() : await wait(500)

        //start cleanup
        this.declare.classList.remove('active', 'win', 'flyin')
        await wait(400)
        this.declare.innerHTML = ""

        //if the enemy or player entered the damage zone, reset their positions and add to the counter
        let reset = false
        if(this.player.position == this.height - 1) { this.player.damage += 1; reset = true; this.player.justDamaged = true; console.log('player is', this.height - 1, 'resetting') }
        if(this.enemy.position == 0) { this.enemy.damage += 1; reset = true; this.enemy.justDamaged = true; console.log('enemy is 0, resetting') }

        if(reset) {
            this.moveTo(this.player, this.height - 2)
            this.moveTo(this.enemy, 1)

            try{
                playCombatCrit('shot5')
            } catch(e) { play('shot5', 0.75, 1) }            
            
            if(this.enemy.justDamaged) this.enemy.golem.setAttribute('a', 'downed')
            if(this.player.justDamaged) this.player.golem.setAttribute('a', 'downed')

            if(typeof this.koCallback == "function") {
                console.log('calling KO callback with,', this.player.justDamaged, this.enemy.justDamaged)
                this.koCallback({playerDamaged: this.player.justDamaged, enemyDamaged: this.enemy.justDamaged})
            }
            this.enemy.justDamaged = false
            this.player.justDamaged = false

            this.el.classList.add('shake')
            setTimeout(()=>this.el.classList.remove('shake'), 300)
        }
        
        return reset
    }

    updateProperties() {
        this.distance = (this.player.position - this.enemy.position)
        this.gridContainer.style.setProperty("--player-position", this.player.position)
        this.gridContainer.style.setProperty("--enemy-position", this.enemy.position)
        this.gridContainer.style.setProperty("--distance", this.distance)
    }

    /* UI controls */
    enqueue(move) {
        if(!move || this.el.classList.contains('steppin')) return
        if(this.movesPerStep == this.queue.length) return
        this.el.classList.add('enqueued')

        this.queueListEl.insertAdjacentHTML('beforeend', `<span definition="${this.validMoves[move].desc}">${this.validMoves[move].name}</span>`)
        this.queue.push(move)
        if(this.movesPerStep == this.queue.length) this.el.classList.add('maxqueue')
    }

    clearQueue() {
        this.queue = []
        this.queueListEl.innerHTML = ""
        this.el.classList.remove('enqueued', 'maxqueue')
    }

    /* helpers and technical stuff */
    //used to limit movement within the grid bounds
    //takes an {x, y} object and returns a fixed one
    constrain({ent, x, y}) {
        let newXY = {x, y}
        newXY.x = 0

        //don't let player/enemy go on opposite side's damage tiles
        if(ent.slug == "player") {
            newXY.y = Math.clamp(newXY.y, 1, this.height - 1)
        } else {
            newXY.y = Math.clamp(newXY.y, 0, this.height - 2)
        }

        return newXY
    }
    
    //ent should be the player or enemy object
    moveTo(ent, y) {
        console.log('entered move with', ent, y)

        let pos = this.constrain({ent, x: 0, y})
        ent.position = pos.y

        this.updateProperties()
    }
    
    debugWait() {
        return new Promise((resolve) => {
            const checkVariable = () => {
                if (this.debugProgress == true) {
                    this.debugProgress = false
                    resolve();
                } else {
                    setTimeout(checkVariable, 100); // Adjust the delay as needed
                }
            }
        
            checkVariable(); // Start checking to see if we should proceed et
        });
    }
}
