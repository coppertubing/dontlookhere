class FishingMinigame extends HTMLElement {
    constructor() {
        super()

        if(this.getAttribute("generated")) return; // opera GX fix

        this.insertAdjacentHTML('beforeend', `
        <div id="quadrants">
            <div id="topleft" class="quadrant"></div>
            <div id="topright" class="quadrant"></div>
            <div id="bottomleft" class="quadrant"></div>
            <div id="bottomright" class="quadrant"></div>
        </div>

        <div id="timer">
            <span id="timersec"></span>
        </div>

        <div id="reel"></div>

        <!-- i cheat animation here cuz i am NOT writing velocities and frame shit lol-->
        <div id="fishbox" class="fishcontrol full"> <!-- quad positional -->
            <div id="fishtate" class="fishcontrol full"> <!-- animation rotation component -->
                <div id="fishmove-y" class="fishcontrol full"> <!-- animation Y component -->
                    <div id="fishmove-x" class="fishcontrol full"> <!-- animation X component -->
                        <div id="fishwrap" class="fishcontrol full"> <!-- fish wiggler -->
                            <div id="fish"></div> <!-- fish dot -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `)

        this.quadrant = {
            topleft: this.querySelector("#top-left"),
            topright: this.querySelector("#top-right"),
            bottomleft: this.querySelector("#bottom-left"),
            bottomright: this.querySelector("#bottom-right"),
        }

        this.fish = {
            box: this.querySelector("#fishbox"),
            moveR: this.querySelector("#fishtate"),
            moveY: this.querySelector("#fishmove-y"),
            moveX: this.querySelector("#fishmove-x"),
            wrap: this.querySelector("#fishwrap"),
            core: this.querySelector("#fish")
        }

        this.reel = this.querySelector("#reel")
        this.timer = this.querySelector("#timer")
        this.timerSec = this.querySelector("#timersec")

        env.fishing = this

        if(this.getAttribute("fishy")) {
            this.fishy = FishingMinigame.fishies[this.getAttribute("fishy")]
        } else {
            let possibleFishies = []
            for(let fishName in FishingMinigame.fishies) {
                let fish = FishingMinigame.fishies[fishName]
                if(shouldItShow(fish)) possibleFishies.push(fish)
            }
            this.fishy = possibleFishies.sample()
        }

        this.paused = true

        this.baseTime = check('low_intensity') ? 100000 : 25000
        this.fish.fishsetX = [-25, 25].sample()
        this.fish.fishsetY = [25, 25].sample()
        this.fish.fishsetDeg = rand(0, 360) 
        this.classList.add("notstarted")
        this.setAttribute("generated", true)
    }

    applyFishStats() {
        for (const statName in this.fishy.stats) {
            const statVal = this.fishy.stats[statName]
            if(statName.includes("--")) {
                this.fish.box.style.setProperty(statName, `${rand(statVal)}${statName.includes("rot") ? "deg" : "s"}` )
            }

            switch(statName) {
                case "jumpRate": 
                    this.jumpRate = statVal
                break
            }
        }

        if(!this.jumpRate) this.jumpRate = 2
    }

    //passive drift over time
    fishMove() {
        if(this.paused) return;
        let mod = this.fishy.stats.adjustMod || 1
        this.fish.fishsetX = Math.clamp(this.fish.fishsetX + rand(-2, 2), -40, 40) * mod
        this.fish.fishsetY = Math.clamp(this.fish.fishsetY + rand(-2, 2), -40, 40) * mod
        this.fish.fishsetDeg += rand(-3, 3) * mod
        this.adjustFish()
    }

    //hard-move away from center, like fishy thrashing
    fishJump() {
        if(this.paused) return;
        //determine quadrant the fish is in and move in that direction - kinda like pullFish but opposite
        let rect = document.querySelector("fishing-minigame").fish.core.getBoundingClientRect()
        let quad = document.elementsFromPoint(rect.x + rect.width * 0.5, rect.y + rect.height * 0.5).find(el=>el.classList.contains("quadrant"))
        if(!quad) return; // this means they're probably off screen
        let magnitude = this.fishy.stats.jumpMod || 1

        switch(quad.id) {
            case "topleft":
                this.fish.fishsetX -= 5 * magnitude
                this.fish.fishsetY -= 5 * magnitude
            break

            case "topright":
                this.fish.fishsetX += 5 * magnitude
                this.fish.fishsetY -= 5 * magnitude
            break

            case "bottomleft":
                this.fish.fishsetX -= 5 * magnitude
                this.fish.fishsetY += 5 * magnitude
            break

            case "bottomright":
                this.fish.fishsetX += 5 * magnitude
                this.fish.fishsetY += 5 * magnitude
            break
        }

        this.fish.fishsetDeg += rand(-10, 10) * magnitude
        this.adjustFish()
        console.log("fishjump!")

        this.jump = env.setTimeout(()=>this.fishJump(), this.jumpRate * 1000)
    }

    //updates fishbox with any custom positioning
    adjustFish() {
        if(this.paused) return;
        this.fish.box.style.setProperty("--fishset-x", `${this.fish.fishsetX}vw`)
        this.fish.box.style.setProperty("--fishset-y", `${this.fish.fishsetY}vh`)
        this.fish.box.style.setProperty("--fishset-rotate", `${this.fish.fishsetDeg}deg`)
        
        if(this.fishInReelRange()) {
            this.reel.classList.add("reelrange")
        } else {
            this.reel.classList.remove("reelrange")
        }
    }

    //pull strength is based on how far your mouse is from the center
    pullFish(quadrantName, clickEvent) {
        if(this.paused) return;
        play("status", 2, 0.3)

        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2
        const magnitude = ((FishingMinigame.dist(centerX, centerY, clickEvent.clientX, clickEvent.clientY) / Math.sqrt(centerX * centerX + centerY * centerY)) + 0.25) * (this.fishy.stats.pullMod || 1)
        switch(quadrantName) {
            case "topleft":
                this.fish.fishsetX -= 10 * magnitude
                this.fish.fishsetY -= 10 * magnitude
            break

            case "topright":
                this.fish.fishsetX += 10 * magnitude
                this.fish.fishsetY -= 10 * magnitude
            break

            case "bottomleft":
                this.fish.fishsetX -= 10 * magnitude
                this.fish.fishsetY += 10 * magnitude
            break

            case "bottomright":
                this.fish.fishsetX += 10 * magnitude
                this.fish.fishsetY += 10 * magnitude
            break
        }

        this.fish.fishsetDeg += rand(-2, 2)
        this.adjustFish()
    }

    static dist(x1, y1, x2, y2) {
        const dx = x2 - x1
        const dy = y2 - y1
        return Math.sqrt(dx * dx + dy * dy)
    }

    //simple "is it in the center reel button" function for catching
    reelFish() {
        if(this.paused) return;
        
        this.reel.classList.add("yank")
        env.setTimeout(()=>this.reel.classList.remove("yank"), 120)
        if(this.fishInReelRange()) {
            forcePlay("stab")
            this.done(true)
            this.fish.box.classList.add('caught')
        } else {
            play("miss", 1.5)
            this.reel.style.setProperty("--size", Number(this.reel.style.getPropertyValue("--size") || 10) * 0.8)
            
            clearTimeout(this.reelShrink)
            this.reelShrink = setTimeout(()=>this.reel.style.setProperty("--size", 10), 1000)
        }
    }

    fishInReelRange() {
        if(this.paused) return;

        const fishRect = this.fish.core.getBoundingClientRect()
        const reelRect = this.reel.getBoundingClientRect()
        if (//there's probably a smarter way of writing this lol
            (fishRect.left >= reelRect.left && fishRect.left <= reelRect.right && fishRect.top >= reelRect.top && fishRect.top <= reelRect.bottom) ||
            (fishRect.right >= reelRect.left && fishRect.right <= reelRect.right && fishRect.top >= reelRect.top && fishRect.top <= reelRect.bottom) ||
            (fishRect.left >= reelRect.left && fishRect.left <= reelRect.right && fishRect.bottom >= reelRect.top && fishRect.bottom <= reelRect.bottom) ||
            (fishRect.right >= reelRect.left && fishRect.right <= reelRect.right && fishRect.bottom >= reelRect.top && fishRect.bottom <= reelRect.bottom)
        ) {
            return true;
        }
    }
    
    clickEvent(event) {
        if(this.complete) return;

        let el = event.target
        if(body.classList.contains("in-dialogue")) return

        if(el == this.reel) {
            if(this.paused) this.start();

            this.reelFish()
        } else if(el.classList.contains("quadrant")) {
            this.pullFish(el.id, event)
            el.classList.add("pulled")
            setTimeout(()=>el.classList.remove("pulled"), 100)
        }
    }

    keyEvent(event) {
        if ((event.key === "Enter" || event.key === " ") && !event.repeat) {
            this.reelFish()
        }
    }

    connectedCallback() {
        this.addEventListener("click", this.clickEvent.bind(this))

        this.keydownEvent = this.keyEvent.bind(this)
        document.addEventListener("keydown", this.keydownEvent)
    }

    disconnectedCallback() {
        this.stop()
    }

    start() {
        if(this.startCallback) this.startcallback()
        this.paused = false
        env.toggleMouseThrottleLowSpeed(true)
        env.temporaryOptimize = true

        this.applyFishStats()
        this.fishMove()
        
        this.timerInterval = env.setInterval(()=>this.timerTick(), 1000)
        this.randomAdjustment = env.setInterval(()=>this.fishMove(), 200)
        this.check = env.setInterval(()=>this.fishInReelRange(), 100)
        this.jump = env.setTimeout(()=>this.fishJump(), this.jumpRate * 1000)
        ratween(env.bgm, 1.75)

        this.fish.box.style.animationDelay = `${Math.random() * -30}s`
        this.fish.moveR.style.animationDelay = `${Math.random() * -30}s`
        this.fish.moveY.style.animationDelay = `${Math.random() * -30}s`
        this.fish.moveX.style.animationDelay = `${Math.random() * -30}s`

        this.classList.remove("notstarted")
        body.classList.add("cull-stage")
    }

    done(success) {
        this.stop()
        this.complete = true
        if(this.endCallback) this.endCallback(success)
    }

    claim() {
        if(this.claimed) return;
        this.claimed = true
        page.lastCaughtFish = this.fishy
        let id = `reward${env.crittaCount++}`
        content.insertAdjacentHTML(`beforeend`, `<critta-reward id="${id}" class="pre-show" type="fish"></critta-reward`)
        
        let rewardEl = content.querySelector(`critta-reward#${id}`)
        setTimeout(() => rewardEl.activate(), 100);
    }

    stop() {
        env.toggleMouseThrottleLowSpeed(false)
        env.temporaryOptimize = false
        document.removeEventListener("keydown", this.keydownEvent)
        clearInterval(this.randomAdjustment)
        clearInterval(this.timerInterval)
        clearInterval(this.check)
        clearTimeout(this.timerLow)
        clearTimeout(this.jump)

        ratween(env.bgm, 1)
    }

    fadeOut() {
        MUI("deprohibit")
        this.style.opacity = 0
        this.style.pointerEvents = "none"
        body.classList.remove("cull-stage")
        setTimeout(()=>this.remove(), 2000)
    }
    
    timerTick() {
        if(this.paused) return;
        if(typeof this.timeLeft == "undefined") this.timeLeft = this.baseTime;

        if (this.timeLeft <= 0) {
            clearInterval(this.timerInterval)
            this.timerSec.innerHTML = "0"
            this.timer.style.animationPlayState = "paused"
            this.done(false)

            return
        }

        this.timeLeft -= 1000
        this.timerSec.innerHTML = this.timeLeft / 1000

        if(this.timeLeft < this.baseTime - (this.baseTime * 0.3)) {
            if(!this.timer.classList.contains("runninglow")) {
                this.timer.classList.add("runninglow")
                this.timerSec.style.animationDuration = `${(this.timeLeft * 0.333) / 1000}s`
            }
        }
    }

    static fishies = {
        fish_order: {
            item: "fish_order",
            stats: { 
                //style props can be either fixed or 2-length arrays for rand movement
                "--fishspeed-x": [7, 10], // speed in seconds of x movement. style prop
                "--fishspeed-y": 8, // speed in seconds of y movement. 
                "--fishspeed-rot": [5, 15], // speed in seconds of rotation.

                //these have to be fixed numbers. defaults to 1 if not defined
                jumpRate: 1, // interval in seconds that the fish will thrash away from center
                jumpMod: 1, // percentage as decimal number affecting how dramatic the thrash change is (i.e. 0.5 = 50% strength)
                pullMod: 1, // percentage as dec number to adjust effectiveness of player pulls
                adjustMod: 1, // percentage as dec number to adjust passive movement over time (fishMove every 200ms)
            },
        },

        fish_lone: {
            item: "fish_lone",
            stats: { 
                "--fishspeed-x": 8, 
                "--fishspeed-y": 5,
                "--fishspeed-rot": [15, 30],

                jumpRate: 1, 
                jumpMod: 1, 
                pullMod: 1,
                adjustMod: 1, 
            },
        },

        fish_angler: {
            item: "fish_angler",
            stats: { 
                "--fishspeed-x": 10, 
                "--fishspeed-y": 10,
                "--fishspeed-rot": [15, 30],

                jumpRate: 1.5, 
                jumpMod: 0.75, 
                pullMod: 0.5,
                adjustMod: 1, 
            },
        },

        fish_sniper: {
            item: "fish_sniper",
            stats: { 
                "--fishspeed-x": [10, 15], 
                "--fishspeed-y": 2,
                "--fishspeed-rot": [10, 15],

                jumpRate: 1, 
                jumpMod: 2, 
                pullMod: 2,
                adjustMod: 0.75, 
            }, // tension limit!! too strong!!
            showIf: () => env.crittaMap ? (env.crittaMap.tension > 1) : true
        },

        fish_glee: {
            item: "fish_glee",
            stats: { 
                "--fishspeed-x": [1, 30], 
                "--fishspeed-y": [1, 30],
                "--fishspeed-rot": [3, 20],

                jumpRate: 0.5, 
                jumpMod: 2, 
                pullMod: 3,
                adjustMod: 0.75, 
            },
        },

        fish_mimic: {
            item: "fish_mimic",
            stats: { 
                "--fishspeed-x": [2, 5], 
                "--fishspeed-y": 10,
                "--fishspeed-rot": [5, 15],

                jumpRate: 1.5, 
                jumpMod: 3, 
                pullMod: 1.5,
                adjustMod: 0.5, 
            },
        },

        fish_wheel: {
            item: "fish_wheel",
            stats: { 
                "--fishspeed-x": [8, 11], 
                "--fishspeed-y": [5, 10],
                "--fishspeed-rot": [3, 5],

                jumpRate: 1.5, 
                jumpMod: 3, 
                pullMod: 1,
                adjustMod: 1.1, 
            },
            showIf: ()=> check("flan")
        },

        fish_ruka: {
            item: "fish_ruka",
            stats: { 
                "--fishspeed-x": [4, 5], 
                "--fishspeed-y": 5,
                "--fishspeed-rot": [5, 10],

                jumpRate: 1, 
                jumpMod: 5, 
                pullMod: 0.5,
                adjustMod: 0.25, 
            },
            showIf: ()=> check("flan")
        },

        fish_normal: {
            item: "fish_normal",
            stats: { 
                "--fishspeed-x": [3, 10], 
                "--fishspeed-y": 7,
                "--fishspeed-rot": [5, 20],

                jumpRate: 1, 
                jumpMod: 1, 
                pullMod: 0.7,
                adjustMod: 1, 
            },
            showIf: ()=> page.party.some(mem=>mem.class)
        },

        fish_boot: {
            item: "fish_boot",
            stats: { 
                "--fishspeed-x": 10, 
                "--fishspeed-y": 10,
                "--fishspeed-rot": 10,

                jumpRate: 5, 
                jumpMod: 0.5, 
                pullMod: 3,
                adjustMod: 0.5, 
            },
            showIf: ()=> page.party.some(mem=>mem.class)
        },
    }
}

customElements.define('fishing-minigame', FishingMinigame);