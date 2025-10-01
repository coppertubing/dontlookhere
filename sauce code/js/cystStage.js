/*  handy spot locator
    var loc = document.querySelector('#creature');
    [... loc.parentElement.parentElement.children].indexOf(loc.parentElement)
*/

/* 
    "the" "stage" is a fragmented series of functions
    we've got a little bit of technical debt we're working through so please excuse the mess
    this could easily be class/object situation one day
*/

//shortcut so we can easily access some style properties without doing a DOM read
if(!env.stage.values) env.stage.values = {}
env.stage.getPlaneProp = (name) => { return env.stage.values[name] || 0 }
env.stage.setPlaneProp = (name, value, force) => {
    env.stage.values[name] = value
    if(!env.stage._rafUpdates) env.stage._rafUpdates = {}
    
    //store this specific property
    env.stage._rafUpdates[name] = value

    //we do all sets on the next frame
    if(!force && !env.stage._rafPending) {
        env.stage._rafPending = true
        
        requestAnimationFrame(() => {
            env.stage.execPlaneProps()
        })

    } else if(force) { // we do direct sets on force
        env.stage.plane.style.setProperty(name, value)
    }
}

env.stage.execPlaneProps = () => {
    if(page.freedomUpdateCallback) page.freedomUpdateCallback()

    for (const prop in env.stage._rafUpdates) {

        if(prop == "--camera-rotation" || prop == "--camera-tilt" || prop == "--jump-height") {
            if(env.stage.freelook || (prop == "--camera-rotation" && env.stage.freemove)) {
                freemoveUpdateAnimator()
            } else {
                env.stage.plane.style.setProperty(prop, env.stage._rafUpdates[prop])
            }
        }

        if(prop == "--stage-steps-x" || prop == "--stage-steps-y") {
            if(env.stage.freemove) {
                freemoveUpdateReal()
                
            } else {
                env.stage.plane.style.setProperty(prop, env.stage._rafUpdates[prop])
            }

        }
    }

    if(page.contentTracksAngles === true) {
        content.style.setProperty("--camera-tilt", env.stage.values["--camera-tilt"] || 0)
        content.style.setProperty("--camera-rotation", env.stage.values["--camera-rotation"] || 0)
    }
    
    env.stage._rafUpdates = {}
    env.stage._rafPending = false
}

// like querySelectorAll for both the ref and real grid
env.stage.querySelectorAll = (query) => {
    const ref = Array.from(env.stage.ref.querySelectorAll(query))
    const real = Array.from(env.stage.real.querySelectorAll(query))
    return [...ref, ...real]
}

env.stage.angles = {
    'up': 180,
    'right': 270,
    'down': 0,
    'left': 90,
}

env.stageEntityNum = 0
function changeStage(targetStage, spot = false, direction = false, options = { duration: 400, noFlash: false, specificPlan: false }){
    if(!env.stages[targetStage]) { printError(`tried to go to a nonexistent stage "${targetStage}"`); throw `tried to go to a nonexistent stage "${targetStage}"`}
    body.classList.add('stage-transition')
    static.style.transitionDuration = `${options.duration}ms`
    env.stage.changing = true

    if(!options.noFlash) {
        flash(true)
        MUI("off")
    }

    env.stage.enemyPause = true
    //console.log(`changing stage to ${targetStage}, target spot is ${spot}`);

    if(env.stages[targetStage].prerenderExec) env.stages[targetStage].prerenderExec()

    //transitions out before proceeding
    setTimeout(()=>{
        body.classList.remove('stage-active')
        env.stage.active = false
        let initialize = false

        //removes the old stage and updates the body styling
        if(env.stage.current) if(env.stage.current.leaveExec) env.stage.current.leaveExec()
        if(document.querySelector('#realgrid')) { 
            document.querySelector('#realgrid').remove()
        } else initialize = true

        body.id = targetStage
        let stage = env.stages[targetStage];

        //collect plan info
        if(options.specificPlan) stage.plan = stage.plans[options.specificPlan] //requires that the stage has 'plans' in order to work
        //if a stage has a getPlan, it can have a dynamic configuration
        else if(typeof stage.getPlan == "function") stage.plan = stage.getPlan()
        let plan = stage.plan

        //very useful for conditionally removing/changing stage tiles prior to construction
        if(typeof stage.planAdjustment == "function") plan = stage.planAdjustment(plan)

        plan = convertStagePlanStringToArray(plan) 
        env.stage.stageW = stage.width
        env.stage.stageH = plan.length / env.stage.stageW

        //we do this shit virtual style now to reduce DOM usage
        const virtualGridContainer = document.createDocumentFragment()
        const virtualGridRef = document.createElement('div')
        virtualGridRef.className = "reference"
        virtualGridRef.id = "grid-ref"
        virtualGridRef.setAttribute('stage', targetStage)
        virtualGridRef.style.setProperty('--stageWidth', stage.width)
        virtualGridContainer.appendChild(virtualGridRef)

        plan.forEach(function(piece, i) {
            //look at the letter
            //if the letter exists in the stage entities, use that
            //if not, use default entities
            var pieceEntity = false

            if(stage.entities) {
                if(stage.entities[piece]) {
                    pieceEntity = stage.entities[piece];
                }
            }

            if(!pieceEntity) { pieceEntity = env.stageEntities[piece] }
            if(!pieceEntity) alert(`failed to find piece for ${piece}`)
            let pieceClass = `${pieceEntity.class || ""}`

            if(pieceEntity.contains) { if(pieceEntity.contains.dyp) {
                pieceClass += " dyp"
            }}

            pieceEntity.slug = piece
            let pos = stageCoordinatesFromIndex(i)

            if(pieceEntity.teleportTarget) {
                let teleportProp = `
                    ${pieceEntity.examineEntity ? `<div class="target" ${pieceEntity.examinePriority ? `priority="${pieceEntity.examinePriority}"` : ''} entity="${pieceEntity.examineEntity}"></div>` : ""}
                    ${pieceEntity.contains ? generateStageEntityContents(pieceEntity, i) : ""}
                `.trim()

                const gridPiece = document.createElement('div')
                gridPiece.className = `gridpiece blocks teleport locked ${pieceClass} ${teleportProp.length ? "hassomething" : "hasnothing"}`
                gridPiece.setAttribute('slug', pieceEntity.slug ? pieceEntity.slug : piece)
                gridPiece.setAttribute('shouldFace', (typeof pieceEntity.shouldFace != 'undefined') ? pieceEntity.shouldFace : false)
                gridPiece.setAttribute('teleport-target', pieceEntity.teleportTarget)
                gridPiece.setAttribute('lockflag', pieceEntity.lockFlag || "")
                gridPiece.setAttribute('lockexec', pieceEntity.lockExec || "")
                gridPiece.setAttribute('i', i)
                gridPiece.style.setProperty('--realX', pos.x)
                gridPiece.style.setProperty('--realY', pos.y)
                gridPiece.id = `tile${i}`

                if(pieceEntity.teleportSpot) gridPiece.setAttribute('spot', pieceEntity.teleportSpot)
            
                //custom attributes
                if (pieceEntity.attributes) {
                    pieceEntity.attributes.forEach(attr => {
                        gridPiece.setAttribute(attr[0], attr[1])
                    })
                }
                
                gridPiece.innerHTML = teleportProp
                virtualGridRef.appendChild(gridPiece)
            } else if(pieceEntity.contains) {
                const gridPiece = document.createElement('div')
                gridPiece.className = `gridpiece ${pieceClass} hassomething`
                gridPiece.setAttribute('slug', pieceEntity.slug ? pieceEntity.slug : piece)
                gridPiece.setAttribute('i', i)
                gridPiece.style.setProperty('--realX', pos.x)
                gridPiece.style.setProperty('--realY', pos.y)
                gridPiece.id = `tile${i}`
                if(pieceEntity.blockIf) gridPiece.setAttribute("blockif", true)
                
                if (pieceEntity.attributes) {
                    pieceEntity.attributes.forEach(attr => {
                        gridPiece.setAttribute(attr[0], attr[1]);
                    });
                }
                
                gridPiece.innerHTML = generateStageEntityContents(pieceEntity, i);
                virtualGridRef.appendChild(gridPiece);
            } else {
                const gridPiece = document.createElement('div')
                gridPiece.className = `gridpiece ${pieceClass} hasnothing`
                gridPiece.setAttribute('slug', pieceEntity.slug ? pieceEntity.slug : piece)
                gridPiece.setAttribute('i', i)
                gridPiece.style.setProperty('--realX', pos.x)
                gridPiece.style.setProperty('--realY', pos.y)
                gridPiece.id = `tile${i}`

                if(pieceEntity.shouldFace) gridPiece.setAttribute('shouldFace', pieceEntity.shouldFace) // can be landing point
                if(pieceEntity.blockIf) gridPiece.setAttribute("blockif", true)
                
                if (pieceEntity.attributes) {
                    pieceEntity.attributes.forEach(attr => {
                        gridPiece.setAttribute(attr[0], attr[1])
                    })
                }
                
                virtualGridRef.appendChild(gridPiece)
            }
        })

        const truecreature = document.createElement('div')
        truecreature.className = 'truecreature'
        truecreature.innerHTML = stage.creature ? stage.creature() : ""
        virtualGridRef.appendChild(truecreature)
        env.stage.ref = virtualGridRef

        //make the animated stage
        let newStage = document.createElement('div')
        newStage.id = "realgrid"
        newStage.className = "grid"
        newStage.setAttribute('stage', targetStage)
        newStage.style.setProperty('--stageWidth', stage.width)
        
        // Clone the virtual grid's contents to the real grid
        // We'll use a different approach than direct cloning since we're not using innerHTML anymore
        virtualGridRef.childNodes.forEach(child => {
            if (child.nodeType === Node.ELEMENT_NODE) {
                newStage.appendChild(child.cloneNode(true))
            }
        })

        //handy references
        env.stage.plane = content.querySelector(".grid-plane")
        env.stage.animator = content.querySelector(".grid-animator")
        env.stage.container = content.querySelector(".grid-container")

        env.stage.animator.insertAdjacentElement('beforeend', newStage)
        //seems redundant but this is so i don't have to rewrite a bunch of old stuff
        env.stage.plane.setAttribute('activeStage', targetStage)
        env.stage.animator.setAttribute('activeStage', targetStage)
        env.stage.container.setAttribute('activeStage', targetStage)
        change('stageroom', targetStage)

        if(env.stage?.real?.observer) env.stage.real.observer.disconnect()

        env.stage.real = content.querySelector("#realgrid")
        env.stage.real.classList.add("realgrid")
        env.stage.name = targetStage
        env.stage.current = env.stages[targetStage]
        env.stage.current.flags = {}
        env.stage.enemyPause = false
        env.stage.trackCam = false
        
        //e4a1 - set up observer for class management
        //added for css selection optimization
        //turns out that's kind of a big deal for render speed
        env.stage.real.observer = new MutationObserver(mutations => {
            for(const mutation of mutations) {
                const target = mutation.target

                if((mutation.type === 'attributes' && mutation.attributeName === 'class') || mutation.type === 'childlist') {
                    //gridpiece class change
                    if (
                        target.classList &&
                        target.classList.contains('gridpiece') &&
                        !target.adjusting
                    ) {
                        target.adjusting = true
                        const hasContent = target.innerHTML.trim() !== ''
                        const hasSomethingClass = target.classList.contains('hassomething')
                        const hasNothingClass = target.classList.contains('hasnothing')

                        if (hasContent) {
                            if (!hasSomethingClass || hasNothingClass) {
                                target.classList.remove('hasnothing')
                                target.classList.add('hassomething')
                            }
                        } else {
                            if (!hasNothingClass || hasSomethingClass) {
                                target.classList.remove('hassomething')
                                target.classList.add('hasnothing')
                            }
                        }

                        target.adjusting = false
                    }
                }
            }
        })

        env.stage.real.observer.observe(env.stage.real, {
            attributes: true,
            attributeFilter: ['class'],
            subtree: true,
            childList: true,
        })
        
        if(initialize) {
            //initializes if there was no grid before
            env.stage.setPlaneProp('--camera-rotation', 180)
            env.stage.justStepped = false;
            env.stage.lastMoved = "up";
            env.stage.moveDir = ['up', 'right', 'down', 'left']
        }

        if(
            document.querySelector('#stage-navigator .swap')
            || env.stage.real.innerHTML.includes("face-creature")
            || page.trackCam
        ) {
            env.stage.trackCam = true
        }
        
        //virtualgrid used in darkstep only
        env.stage.virtualGrid = env.stage.ref.querySelectorAll('.gridpiece')

        if(env.stage.current.fogRadius) {
            content.classList.add('darkstage')
            newStage.querySelectorAll('.gridpiece').forEach(el=>el.remove())
        } else {
            content.classList.remove('darkstage')
        }
        
        env.stage.visibleGridPieces = new Set()
        step()
        
        setTimeout(()=>{
            if(env.stages[targetStage].locale) { // TODO: i gotta refactor this later, we only need body really but css needs to be rewritten
                body.setAttribute('locale', `${env.stages[targetStage].locale}`)
                content.setAttribute('locale', `${env.stages[targetStage].locale}`)
                newStage.setAttribute('locale', `${env.stages[targetStage].locale}`)
            } else {
                content.removeAttribute('locale');
            }

            removeDeadStageEnemies()

            if(env.stages[targetStage].exec) env.stages[targetStage].exec()

            //stages can have arbitrary HTML added to the end for walls, ceilings, etc
            if(stage.html) { newStage.insertAdjacentHTML('beforeend', processStageVariables(stage.html)) }
            initializeAssetCanvases()

            if(
                (stage.tileSprites || env.stage.locales[stage.locale]) && 
                !env.stage.current.fogRadius &&
                !env.stage.current.noCanvasFloor
            ) {
                newStage.classList.add("canvas-floor")
                initializeFloorCanvas(stage, newStage)
            }
                    
            //move the player to the spot, otherwise just spawn in the stage with no player (if no 'p' tile)
            let landSpot 
            if(spot !== false) {
                if(isNaN(Number(spot))) { // the spot can be a string now, specifically a class for a landing position
                    landSpot = env.stage.ref.querySelector(`.gridpiece.${spot}`)
                    gridMoveTo(env.stage.ref.querySelector('#creature').parentElement, landSpot)
                } else {
                    landSpot = env.stage.ref.querySelectorAll(`.gridpiece`)[spot]
                    gridMoveTo(env.stage.ref.querySelector('#creature').parentElement, landSpot)
                }                
            }

            //either has the player face the specified direction, OR the default spawning direction
            let shouldFace = direction
            if(landSpot) if(landSpot.getAttribute("shouldFace")) shouldFace = landSpot.getAttribute("shouldFace")
            if(shouldFace == "false" || !shouldFace) shouldFace = stage.enterDirection
            if(shouldFace) {
                env.stage.lastMoved = shouldFace
                env.stage.plane.setAttribute('lastmoved', shouldFace); 
                env.stage.setPlaneProp("--camera-rotation", env.stage.angles[shouldFace])
            }
            
            step()
            body.classList.add('stage-active')
            env.stage.active = true

            document.dispatchEvent(new CustomEvent('stage_change', { detail: { stage: targetStage} }))

            //mask camera defaults freemove to on
            if(check("mask-freedom") && !env.stage.freemove && !env.stage.current.noFreedom) {
                toggleFreemove(true, {transition: false})
                toggleMouseLook(true)

                if(env?.currentDialogue?.active) pauseFreemove(true) // dialogues auto-unpause when they end
            } else if(env.stage.freemove) { // we do a little centering
                if(env.stage.current.noFreedom) {
                    toggleFreemove(false, {transition: false})
                    toggleMouseLook(false)

                } else if(Number.isInteger(env.stage.getPlaneProp("--stage-steps-x")) && Number.isInteger(env.stage.getPlaneProp("--stage-steps-y"))) {
                    env.stage.setPlaneProp('--stage-steps-x', env.stage.getPlaneProp("--stage-steps-x") + 0.5)
                    env.stage.setPlaneProp('--stage-steps-y', env.stage.getPlaneProp("--stage-steps-y") + 0.5)
                }
            }

            env.stage.changing = false
        }, 10);

        setTimeout(()=>{
            if(!options.noFlash) flash(false)
            static.style.transitionDuration = ``
            body.classList.remove('stage-transition')
        }, options.duration * 0.5)
    }, options.duration); 
}

//generates the contains HTML/classes based on provided stage entity info
//i should be the index of the tile in the stage
//if not provided, this probably isn't for a conventional cystStage (i.e. for combat-grid)
function generateStageEntityContents(pieceEntity, i) {
    if(!pieceEntity.contains) return ""

    //dynamic prop stylings
    let dypStyle = ""
    let dypClass = ""
    if(pieceEntity.contains.examineEntity) dypClass += "preserve-3d has-target "
    let uniq = `${(pieceEntity.contains.id=="creature" || pieceEntity.unique) ? "" : env.stageEntityNum++}`
    let dypRef = pieceEntity.contains.dyp
    let htmlToShow = (pieceEntity.contains.examineEntity ? `<div class="target" ${pieceEntity.contains.examinePriority ? `priority="${pieceEntity.contains.examinePriority}"` : ''} entity="${pieceEntity.contains.examineEntity}"></div>` : "") + (pieceEntity.contains.html || "")

    if(dypRef) {
        dypClass += "dypcontent "
        for (const propName in dypRef) {
            const prop = dypRef[propName];

            switch(propName) {
                case "noback":
                case "cross":
                    dypClass += `dyp-${propName} `
                break

                case "class":
                    dypClass += `${prop} `
                break

                case "style":
                    dypStyle += `${prop}`
                break

                case "canvas":
                    dypClass += "dyp-canvas "
                    htmlToShow += `<canvas position="${dypRef.canvas.position}" repeat="${dypRef.canvas.repeat}" fit="${dypRef.canvas.fit}" basewidth="${dypRef.width}" baseheight="${dypRef.height}" sprite="${dypRef.canvas.sprite}" id="${uniq}_canvas"></canvas>`
                break

                default:
                    dypStyle += `--dyp-${propName}: ${prop};`
            }
        }
    }

    let contains = `
        <div 
            id="${pieceEntity.contains.id || "genprop" }${pieceEntity.contains.unique ? "" : uniq}" 
            base="${pieceEntity.contains.id || "genprop" }"
            class="${pieceEntity.contains.class || ""} ${dypClass}" 
            type="${pieceEntity.contains.type}" 
            style="--piece-delay: ${Math.random() * -20}s; animation-delay: var(--piece-delay);${dypStyle};${pieceEntity.contains.style || ""}" 
            ${pieceEntity.contains.dialogue ? `dialogue="${pieceEntity.contains.dialogue /* this is on-contact dialogue triggered by stage enemies */}"` : ""}
            ${pieceEntity.contains.aiRate ? `airate="${pieceEntity.contains.aiRate}"` : ""}
            ${pieceEntity.contains.aiType ? `aitype="${pieceEntity.contains.aiType}"` : ""}
            ${typeof i != "undefined" ? `origin-spot="${i+1}"` : ""}
        >
            ${htmlToShow}
        </div>
    `

    return contains
}

// a simple stage refresh shortcut that ensures the creature remains in the same spot
function refreshStage({duration = 100, noFlash = false, specificPlan = false} = {}) { 
    if(env.stage.name == null) return console.warn("tried to refreshstage when stage not active"); // stage not active

    env.stage.plane.classList.add("instantstagetran")
    changeStage(env.stage.name, env.stage.creatureI, env.stage.lastMoved, {duration, noFlash, specificPlan})
    setTimeout(() => {
        env.stage.plane.classList.remove("instantstagetran")
    }, duration)
}

function convertStagePlanStringToArray(input) {
    if(typeof input != "object") return input.replace(/\s/g, '').split('');
    return input
}

function processStageVariables(input) {
    if(!input) return ""
    let effectiveInput = input
    if(typeof input == "function") effectiveInput = input()

    //i.e. .replaceAll("[stageW]", env.stage.stageW)
    return effectiveInput.replace(/\[(.*?)\]/g, (match, p1) => {
        return env.stage[p1] !== undefined ? env.stage[p1] : match;
    })
}

//turns left or right
function playerTurn({clockwise = true, specificDirection = false } = {}) {
    var newRotation
    var currentIndex = env.stage.moveDir.indexOf(env.stage.lastMoved)

    if(specificDirection) {
        env.stage.lastMoved = specificDirection
        switch(specificDirection) {
            case "up":
                newRotation = 180
            break
            case "right":
                newRotation = -90
            break
            case "down":
                newRotation = 0
            break
            case "left":
                newRotation = 90
            break
        }

    } else {
        let turn
        switch(clockwise) {
            case true:
                turn = -1
            break
    
            case false:
                turn = 1
            break
        }
    
        //handles any wrapping
        let newIndex = currentIndex + turn
        if(newIndex < 0) {
            newIndex = 3
        } else if(newIndex >= 4) {
            newIndex = 0
        }   
        
        let currentRotation = env.stage.getPlaneProp("--camera-rotation") || 0

        newRotation = currentRotation + (90 * turn)
        env.stage.lastMoved = env.stage.moveDir[newIndex]
    }

    //update relevant variables
    //rotate camera appropriately (offset handled in css by the lastmoved attr on html)
    env.stage.plane.setAttribute('lastmoved', env.stage.lastMoved)
    env.stage.setPlaneProp("--camera-rotation", newRotation)
}

//shortcut for moving player to specific x, y
function playerMoveTo(x, y, dir) {
    gridMoveTo(env.stage.ref.querySelector('#creature').parentElement, elementAtStageCoordinates(x, y))
    if(dir) playerTurn({specificDirection: dir})
    setTimeout(()=> {
        step()
        
        //freemove only
        if(!env.stage.freemove) return;
        env.stage.setPlaneProp("--camera-tilt", 0)        
        env.stage.setPlaneProp('--stage-steps-x', env.stage.creatureLoc.x + 0.5)
        env.stage.setPlaneProp('--stage-steps-y', env.stage.creatureLoc.y + 0.5)
    }, 10)
}

//resets the player camera spin
function stageAngleReset(transitions = false) {
    let noTransitions = document.querySelectorAll('.grid-animator, #realgrid .truecreature')
    if(!transitions) noTransitions.forEach(el=>el.classList.add('no-transition'))

    env.stage.justStepped = true

    setTimeout(()=>{
        switch(env.stage.lastMoved) {
            case "down": env.stage.setPlaneProp("--camera-rotation", 0); break
            case "left": env.stage.setPlaneProp("--camera-rotation", 90); break
            case "right": env.stage.setPlaneProp("--camera-rotation", -90); break
            case "up": env.stage.setPlaneProp("--camera-rotation", 180); break
        }

        if(!transitions) setTimeout(()=>{
            noTransitions.forEach(el=>el.classList.remove('no-transition'))
            env.stage.justStepped = false
        }, 25)
    }, 25)

    return 60
}

//updates both grid-container and any face-creature elements with angles/distance
//grid-container can have a specified --distX and Y in particular swapcam setups
//based on math and functions by marbelynrye - https://marbelynrye.000.pe/experiments/atan2relativity.html
function updateCameraTracking() {
    if(!env.stage.trackCam) return;
    if(env.stage.trackCamThrottle) return;

    env.stage.trackCamThrottle = setTimeout(() => {
        env.stage.plane.querySelectorAll(".grid-container, .face-creature, .evil").forEach(el => {
            if(!el.angleLast) el.angleLast = 0
            if(!el.angleAdd) el.angleAdd = 0

            const style = window.getComputedStyle(el)
            const distX = getCSSStepCalcValue(style.getPropertyValue("--distX"))
            const distY = getCSSStepCalcValue(style.getPropertyValue("--distY"))
            const atanResult = Math.atan2(distX, distY)
            const angle = (atanResult * (180 / Math.PI))

            //adjust to avoid the wretched spin
            if (el.angleLast >= 90 && el.angleLast <= 180 && angle < 0) {
                el.angleAdd += 360
            } else if (el.angleLast >= -180 && el.angleLast <= -90 && angle > 0) {
                el.angleAdd -= 360
            }

            el.style.setProperty("--faceAngle", `${angle + el.angleAdd}deg`)
            try {
                if(!el.classList.contains("grid-container")) env.stage.ref.querySelector(`#${el.id}`).style.setProperty("--faceAngle", `${angle + el.angleAdd}deg`)
            } catch(e) {console.log("ERROR", e, el)}
            el.angleLast = angle
        })

        env.stage.trackCamThrottle = null
    }, 200)
}

//only handles untyped numbers i.e. in steps, any deg pass will crash
function getCSSStepCalcValue(input) {
    if (input.includes("calc(")) {
        const evaluate = new Function(`return ${input.replaceAll("calc", "")};`)
        return evaluate()
    } else {
        return input.trim()
    }
}

//set up the default movement controls
var stageKeypress = (e) => { stepKey(e.key) }
//main movement stepper
function stepKey(key) {
    //we don't let any steps happen under certain circumstances
    if(
        env.stage.freemove ||
        env.stage.justStepped || 
        body.classList.contains('stage-transition') || 
        body.classList.contains('cull-stage') || 
        body.classList.contains('in-dialogue') || 
        body.classList.contains('in-combat') ||
        body.classList.contains('in-melee') ||
        document.documentElement.classList.contains('cutscene') || 
        document.activeElement.tagName == 'INPUT' ||
        document.activeElement.tagName == 'TEXTAREA'
    ) {
        return
    } else {
        env.stage.justStepped = true
        setTimeout(() => {env.stage.justStepped = false}, 100)
    }

    let homeBox = stageCoordinatesFromId('creature')
    let homePlate = elementAtStageCoordinates(homeBox.x, homeBox.y)
    var targetSquare
    var moving = false
    let closeMenu = true // suggestion per @ripplesplash from corrucord - previously closed menu immediately unless it was Z

    switch(key.toLowerCase()) {
        //movement
        case "arrowup":
        case "w": //move in direction you're looking
            moving = "forward"
        break;

        case "arrowleft":
        case "a": // turn left
            if(env.pressedKeys.shift) moving = "strafeleft"
            else playerTurn({clockwise: false})
        break;

        case "arrowdown":
        case "s": //away from where you're looking
            moving = "back"
        break;

        case "arrowright":
        case "d": //turn right
            if(env.pressedKeys.shift) moving = "straferight"
            else playerTurn()
        break;	

        case "e":
            //we only want this happening on stages where it's expected
            if(document.querySelector('#stage-navigator .swap') || check("TEMP!!allowswap")) toggleSwapCam()
        break

        case "q":
            switch(body.getAttribute('quality')) {
                case "regular":
                    setQualityPreference('low')
                break

                case "low":
                    setQualityPreference('regular')
                break
            }
        break;

        case "z":
            if(page.partyMenuEnabled) togglePartyMenu()
            closeMenu = false;
        break;

        default:
            closeMenu = false;
        break;
    }

    //close any open menus
    if(body.classList.contains('in-menu') && closeMenu) exitMenu(false)

    if(moving) {
        var modifier = 1;
        if(moving == "back") modifier = -1;

        switch(env.stage.lastMoved) {
            case "up":
                if (moving === "strafeleft") targetSquare = elementAtStageCoordinates(homeBox.x + 1, homeBox.y)
                else if (moving === "straferight") targetSquare = elementAtStageCoordinates(homeBox.x - 1, homeBox.y)
                else targetSquare = elementAtStageCoordinates(homeBox.x, homeBox.y + modifier);
            break

            case "right":
                if (moving === "strafeleft") targetSquare = elementAtStageCoordinates(homeBox.x, homeBox.y - 1);
                else if (moving === "straferight") targetSquare = elementAtStageCoordinates(homeBox.x, homeBox.y + 1);
                else targetSquare = elementAtStageCoordinates(homeBox.x + modifier, homeBox.y);
            break

            case "down":
                if (moving === "strafeleft") targetSquare = elementAtStageCoordinates(homeBox.x - 1, homeBox.y);
                else if (moving === "straferight") targetSquare = elementAtStageCoordinates(homeBox.x + 1, homeBox.y);
                else targetSquare = elementAtStageCoordinates(homeBox.x, homeBox.y - modifier);
            break

            case "left":
                if (moving === "strafeleft") targetSquare = elementAtStageCoordinates(homeBox.x, homeBox.y + 1);
                else if (moving === "straferight") targetSquare = elementAtStageCoordinates(homeBox.x, homeBox.y - 1);
                else targetSquare = elementAtStageCoordinates(homeBox.x - modifier, homeBox.y);
            break
        }
    }
    
    if(targetSquare != undefined) {
        gridMoveTo(homePlate, targetSquare);
        step()
        if(!env.stage.enemyPause) enemyStep()
    }
}


// freemove mode
function toggleFreemove(state, {slow = false, transition = true} = {}) {
    if(!env.stage.current) return;

    if(state) {
        if(env.stage?.current?.noFreedom) return;
        
        content.classList.remove('swapcam')
        if(transition) {
            env.stage.plane.classList.add('freemoveinit')
            setTimeout(() => { if(env.stage.freemove) env.stage.plane.classList.add('freemovetran') }, 25)
            setTimeout(() => { if(env.stage.freemove) env.stage.plane.classList.add('freemove') }, 50)
            setTimeout(() => { env.stage.plane.classList.remove('freemoveinit') }, slow ? 600 : 100)
        } else {
            env.stage.plane.classList.add('freemove')
            env.stage.plane.classList.add('freemovetran')
        }
        
        //this way the player can adjust these in console if they want
        if(!env.stage.freemoveTurnSpeed) env.stage.freemoveTurnSpeed = 12.5
        if(!env.stage.freemoveMoveSpeed) env.stage.freemoveMoveSpeed = 0.4
        if(!env.stage.freemoveJumpBonus) env.stage.freemoveJumpBonus = 0.05
        env.stage.lastMoveTime = performance.now()

        //center camera
        if(Number.isInteger(env.stage.getPlaneProp("--stage-steps-x")) && Number.isInteger(env.stage.getPlaneProp("--stage-steps-y"))) {
            env.stage.setPlaneProp('--stage-steps-x', env.stage.getPlaneProp("--stage-steps-x") + 0.5)
            env.stage.setPlaneProp('--stage-steps-y', env.stage.getPlaneProp("--stage-steps-y") + 0.5)
        }

        window.addEventListener("keydown", freemoveKeyDown)
        window.addEventListener("keyup", freemoveKeyUp)
        window.addEventListener("blur", freemoveKeyUp)
        env.stage.freemove = true
        env.freemoveDefaultIsWalk = check("freemoveDefaultIsWalk")
    } else {
        
        if(transition) {
            env.stage.plane.classList.add('freemoveinit')
            env.stage.plane.classList.remove('freemovetran')
            setTimeout(() => { env.stage.plane.classList.remove('freemove') }, 50)
            setTimeout(() => { env.stage.plane.classList.remove('freemoveinit') }, slow ? 600 : 100)
        } else {
            env.stage.plane.classList.remove("freemove")
            env.stage.plane.classList.remove("freemovetran")
        }

        clearInterval(env.stage.freemoveInterval)
        delete env.stage.freemoveInterval
        window.removeEventListener("keydown", freemoveKeyDown)
        window.removeEventListener("keyup", freemoveKeyUp)
        window.removeEventListener("blur", freemoveKeyUp)
        env.stage.freemove = false
        env.stage.real.style.transform = ""
 
        setTimeout(() => { // enough time for the current RAF to go through if any. better experience with cutscenes
            env.stage.setPlaneProp('--stage-steps-x', Math.floor(env.stage.getPlaneProp("--stage-steps-x")))
            env.stage.setPlaneProp('--stage-steps-y', Math.floor(env.stage.getPlaneProp("--stage-steps-y")))            
        }, 50)
    }
}

function toggleMouseLook(enable = undefined, {resetAngle = false, delayCoords = true} = {}) {
    if(!env.stage.current) return;
    if(enable === undefined) enable = !env.stage.freelook

    if(enable) {
        if(env.stage.freelook || env.stage?.current?.noFreedom) return;
        if(delayCoords) { // for dialogue ending and stuff so your camera doesn't snap around weirdly
            env.stage.delayCoords = true
            setTimeout(() => {
                env.stage.delayCoords = false
            }, 50)
        }

        env.freelookSensitivity = check("freelookSensitivity") || false

        document.addEventListener("mousemove", freemoveMouseMove)
        const noLockConditions = ()=> {
            return (env?.currentDialogue?.active && !env?.currentDialogue?.settings?.chatterlogue) ||
                body.classList.contains('in-menu') ||
                env?.rpg?.active ||
                env.cutscene ||
                document.activeElement.tagName == 'INPUT' ||
                document.activeElement.tagName == 'TEXTAREA' ||
                env.mui;
        }

        if(!env.stage.requestLock) env.stage.requestLock = (ev) => {
            let closestUiElement = ev ? ev.target.closest(".noclosemenu") : false

            if(noLockConditions() || closestUiElement || env.noPointerLock) return console.log("not locking bc either noLock or ui element");
            try {
                document.body.requestPointerLock({ unadjustedMovement: true })
            } catch(e) {
                console.warn("doesn't support unadjustedMovement")
                document.body.requestPointerLock()
            }

            setTimeout(() => {
                if(document.pointerLockElement && env.stage.freemove) {
                    env.stage.plane.classList.add('freelook')
                    env.stage.plane.classList.remove("freelookblur")
                    env.stage.freelook = true
                    
                    if(!env.cursor.preFreelookX) {
                        env.cursor.preFreelookX = env.cursor.x
                        env.cursor.preFreelookY = env.cursor.y
                    }

                } else if(!env.stage.freelook) {
                    env.stage.plane.classList.remove("freelookblur")
                }
            }, 50)
        }

        env.stage.requestLock()
        document.addEventListener("mousedown", env.stage.requestLock)

        if(!env.stage.freelookBlurBreak) env.stage.freelookBlurBreak = ()=> {
            if(env.stage.freelook || !document.pointerLockElement) {
                toggleMouseLook(false)
                env.stage.plane.classList.add("freelookblur")
            }
        }

        if(!env.stage.freelookFocusRegain) env.stage.freelookFocusRegain = () => {
            if(env.stage.freemove && !env.stage.freelook) {
                toggleMouseLook(true)
                env.stage.plane.classList.remove("freelookblur")
            }
        }
    
        window.addEventListener("blur", env.stage.freelookBlurBreak)
        window.addEventListener("focus", env.stage.freelookFocusRegain)
        if(!env.stage.freelookLockDetection) env.stage.freelookLockDetection = setInterval(() => {
            if(!document.pointerLockElement && !noLockConditions()) env.stage.plane.classList.add("freelookblur")
        }, 1000)
        
        env.stage.plane.classList.remove("freelookblur")
    } else {
        env.stage.plane.classList.remove('freelook')
        env.stage.plane.classList.remove('freelookblur')
        env.stage.freelook = false

        env.cursor.x = env.cursor.preFreelookX || 0
        env.cursor.y = env.cursor.preFreelookY || 0
        delete env.cursor.preFreelookX
        delete env.cursor.preFreelooky

        document.exitPointerLock()
        document.removeEventListener("mousemove", freemoveMouseMove)
        document.removeEventListener("mousedown", env.stage.requestLock)
        window.removeEventListener("blur", env.stage.freelookBlurBreak)
        clearInterval(env.stage.freelookLockDetection)
        env.stage.freelookLockDetection = false

        if(resetAngle) {
            env.stage.animator.style.transform = ""
            env.stage.setPlaneProp("--camera-tilt", 0)
            stageAngleReset(true)
        }

        env.stage.justStepped = false
    }
}

function freemoveKeyDown(e) {
    const focusedElement = document.activeElement
    if(focusedElement && (focusedElement.tagName === 'INPUT' || focusedElement.tagName === 'TEXTAREA')) return; // don't interfere with typing

    const k = e.key.toLowerCase()
    if (["q","e","w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"," "].includes(k)) {
        if(!env.stage.freemoveInterval) {
            env.stage.lastMoveTime = performance.now() - 100
            freemoveKey()
            env.stage.freemoveInterval = setInterval(() => freemoveKey(), 100)
        } 
        e.preventDefault()
    } else if(k == "z") {
        if(page.partyMenuEnabled) togglePartyMenu()
        closeMenu = false
    }
}

function freemoveKeyUp() {
    if( 
        //we only actually clear if no relevant keys are being pressed, since they work on combination
        !env.pressedKeys.q &&
        !env.pressedKeys.e &&
        !env.pressedKeys.w &&
        !env.pressedKeys.a &&
        !env.pressedKeys.s &&
        !env.pressedKeys.d &&
        !env.pressedKeys.arrowup &&
        !env.pressedKeys.arrowdown &&
        !env.pressedKeys.arrowleft &&
        !env.pressedKeys.arrowright &&
        !env.pressedKeys[" "]
    ) {
        clearInterval(env.stage.freemoveInterval)
        clearInterval(env.stage.backupInterval)
        delete env.stage.freemoveInterval
        delete env.stage.backupInterval
    }
}

//you might think using two different methods for the movement and mouselooking is dumb but this ended up running insanely well compared to other implements
function freemoveKey() {
    //same nomove criterion as stepkey
    if(
        body.classList.contains('stage-transition') || 
        body.classList.contains('cull-stage') || 
        body.classList.contains('in-dialogue') || 
        body.classList.contains('in-combat') ||
        body.classList.contains('in-melee') ||
        env.cutscene || 
        document.activeElement.tagName == 'INPUT' ||
        document.activeElement.tagName == 'TEXTAREA'
    ) {
        return
    }

    if(env.pressedKeys[" "]) freemoveJump()

    let currentRotation = env.stage.getPlaneProp("--camera-rotation") || 0
    const currentTime = performance.now()
    const deltaTime = Math.min((currentTime - (env.stage.lastMoveTime || currentTime)) / 100, 2)
    env.stage.lastMoveTime = currentTime

    //rotate left/right
    if((env.pressedKeys.q || env.pressedKeys.e) && !env.stage.freelook) {
        let alteredRotation = currentRotation
        const rotationSpeed = env.stage.freemoveTurnSpeed * deltaTime

        if(env.pressedKeys.q) { alteredRotation += rotationSpeed }
        if(env.pressedKeys.e) { alteredRotation -= rotationSpeed }
        if(alteredRotation != currentRotation) {
            currentRotation = alteredRotation
            env.stage.setPlaneProp("--camera-rotation", currentRotation)
        }
    }

    const rad = (currentRotation * Math.PI) / -180
    const walkSpeed = (env.stage.freemoveMoveSpeed / 2) * deltaTime
    const runSpeed = env.stage.freemoveMoveSpeed * deltaTime

    const normalSpeed = env.freemoveDefaultIsWalk ? walkSpeed : runSpeed
    const shiftSpeed = env.freemoveDefaultIsWalk ? runSpeed : walkSpeed

    let moveIncrement = env.pressedKeys.shift ? shiftSpeed : normalSpeed

    if(env.stage.jumping) moveIncrement += env.stage.freemoveJumpBonus * deltaTime

    let deltaX = 0
    let deltaY = 0
    if(env.pressedKeys.arrowup || env.pressedKeys.w) { 
        deltaX += Math.sin(rad) * moveIncrement
        deltaY += -Math.cos(rad) * moveIncrement
    }

    if(env.pressedKeys.arrowdown || env.pressedKeys.s) {
        deltaX += -Math.sin(rad) * moveIncrement
        deltaY += Math.cos(rad) * moveIncrement
    }

    if(env.pressedKeys.arrowleft || env.pressedKeys.a) {
        deltaX += -Math.cos(rad) * moveIncrement
        deltaY += -Math.sin(rad) * moveIncrement
    }

    if(env.pressedKeys.arrowright || env.pressedKeys.d) {
        deltaX += Math.cos(rad) * moveIncrement
        deltaY += Math.sin(rad) * moveIncrement
    }

    if(deltaX == 0 && deltaY == 0) return; //no movement. if this happens then i think something went wrong

    const currentX = parseFloat(env.stage.getPlaneProp("--stage-steps-x")) || 0
    const currentY = parseFloat(env.stage.getPlaneProp("--stage-steps-y")) || 0

    //constrict movement so diagonal isn't weirdly fast
    const totalMovement = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    if (totalMovement > moveIncrement) {
        deltaX = (deltaX / totalMovement) * moveIncrement
        deltaY = (deltaY / totalMovement) * moveIncrement
    }

    let newX = currentX + deltaX
    let newY = currentY + deltaY

    //check for tile cross
    const targetTileX = Math.floor(newX)
    const targetTileY = Math.floor(newY)
    const currentTileX = Math.floor(currentX)
    const currentTileY = Math.floor(currentY)

    if(targetTileX !== currentTileX || targetTileY !== currentTileY) {
        const targetTile = elementAtStageCoordinates(targetTileX, targetTileY)
        let success = true
        
        if(!env.stage.current.flags.creatureRef) {
            env.stage.current.flags.creatureRef = env.stage.ref.querySelector('#creature')
        }

        if(!gridMoveTo(env.stage.current.flags.creatureRef.parentElement, targetTile)) {
            //the way you're moving is blocked. but let's also try without some of the vectors to see if you can slide along
            let xBackupTile = elementAtStageCoordinates(currentTileX, targetTileY)
            let yBackupTile = elementAtStageCoordinates(targetTileX, currentTileY)
            success = false
            
            if(gridMoveTo(env.stage.current.flags.creatureRef.parentElement, xBackupTile)) {
                success = true
                newX = currentX

            } else if(gridMoveTo(env.stage.current.flags.creatureRef.parentElement, yBackupTile)) {
                success = true
                newY = currentY

            } else { // movement totally blocked
                if(targetTileX !== currentTileX) newX = targetTileX > currentTileX ? (Math.floor(currentX) + 0.92) : Math.floor(currentX) + 0.08
                if(targetTileY !== currentTileY) newY = targetTileY > currentTileY ? (Math.floor(currentY) + 0.92) : Math.floor(currentY) + 0.08
            }
        } 
        
        if(success) {
            step() // trigger tile step 
            if(!env.stage.enemyPause) enemyStep()
        }
    }

    env.stage.setPlaneProp("--stage-steps-x", newX)
    env.stage.setPlaneProp("--stage-steps-y", newY)
}

function freemoveMouseMove(event) {
    if(env.stage.delayCoords || !document.pointerLockElement || (env?.currentDialogue?.active && !env?.currentDialogue?.settings?.chatterlogue)) return;

    //we want to avoid things where the rotation is too large in one frame cause it means some shit broke
    //i don't know what causes this cause i was never able to recreate the problem
    //but apparently the camera was jumping around occasionally
    if(!env.freelookSensitivity) env.freelookSensitivity = 0.1

    let potentialTiltChange = event.movementY * env.freelookSensitivity
    let potentialRotationChange = event.movementX * (-1 * env.freelookSensitivity)
    //if(!env.noRotationLimit) if(Math.abs(potentialRotationChange) > (env.freelookSensitivity * 150) || Math.abs(potentialTiltChange) > (env.freelookSensitivity * 150)) return;

    //clamp Y rotation to avoid flipping
    let tilt = env.stage.getPlaneProp("--camera-tilt") - potentialTiltChange
    tilt = Math.max(-90, Math.min(90, tilt))

    //apply rotation to the stage plane
    let newRotation = env.stage.getPlaneProp("--camera-rotation") + potentialRotationChange
    env.stage.setPlaneProp("--camera-rotation", newRotation)
    env.stage.setPlaneProp("--camera-tilt", tilt)

    //update lastMoved based on the new camera rotation
    let normalized = ((newRotation % 360) + 360) % 360
    let facing = false
    if (normalized >= 135 && normalized < 225) {
        facing = "up"
    } else if(normalized >= 225 && normalized < 315) {
        facing = "right"
    } else if(normalized >= 45 && normalized < 135) {
        facing = "left"
    } else {
        facing = "down"
    }

    if(facing != env.stage.lastMoved) {
        env.stage.lastMoved = facing
        env.stage.plane.setAttribute('lastmoved', env.stage.lastMoved)
    }
}

function pauseFreemove(pausing = true, transition = true) {
    if(pausing && env.stage.freemove) {
    console.log("calling pause freemove: true")
        env.storingFreemove = true
        toggleFreemove(false, {slow: true, transition})
        toggleMouseLook(false, {resetAngle: true})

    } else if(!pausing && env.storingFreemove) { 
    console.log("calling pause freemove: false")
        env.storingFreemove = false
        toggleFreemove(true, {slow: true, transition})
        toggleMouseLook(true)
    }
}

// we get special setting functions for the camera to improve performance
function freemoveUpdateReal() {
    env.stage.real.style.transform = `
        translateY(${ (env.stage.values["--stage-steps-y"] * 200 * -1) + (0.5 * 200) }px)
        translateX(${ (env.stage.values["--stage-steps-x"] * 200 * -1) + (0.5 * 200) }px)
        var(--personal-offset)
    `
}

// this is literally just for fun it doesn't do anything you can't jump over shit 
function easeOutQuad(t) { return t * (2 - t) }
function easeInQuad(t) { return t * t }
function freemoveJump() { // this is 
    if(!env.stage.freemove || env.stage.jumping) return;
    env.stage.jumping = true

    if(env.stage.jumpAnimationId) {
        cancelAnimationFrame(env.stage.jumpAnimationId)
        env.stage.jumpAnimationId = null
    }
    
    const startTime = performance.now()
    const duration = 500
    const peakTime = duration * 0.4
    const maxHeight = -150

    function animateJump(currentTime) {
        const elapsed = currentTime - startTime
        
        if(elapsed >= duration) {
            env.stage.setPlaneProp("--jump-height", 0)
            env.stage.jumpAnimationId = null
            env.stage.jumping = false
            return
        }
        
        let jumpHeight
        
        if(elapsed < peakTime) { // goin up
            const upProgress = elapsed / peakTime
            jumpHeight = maxHeight * easeOutQuad(upProgress)
        } else { // comin down
            const downProgress = (elapsed - peakTime) / (duration - peakTime)
            jumpHeight = maxHeight * (1 - easeInQuad(downProgress))
        }
        
        env.stage.setPlaneProp("--jump-height", jumpHeight)
        env.stage.jumpAnimationId = requestAnimationFrame(animateJump)
    }
    
    env.stage.jumpAnimationId = requestAnimationFrame(animateJump)
}

function freemoveUpdateAnimator() {
    env.stage.animator.style.transform = `
        rotateX(${env.stage.values["--camera-tilt"] || 0}deg) 
        rotateZ(${env.stage.values["--camera-rotation"] || env.stage.angles[env.stage.lastMoved]}deg) 
        translateZ(${1.5 * -1 * 200}px)
        translateZ(${env.stage.values["--jump-height"] || 0}px)
    `
}

/* VIRTUAL GRID FUNCS */
function stageCoordinatesFromIndex(index) {
    let x = index % env.stage.stageW
    let y = Math.floor(index / env.stage.stageW)
    return { x, y }
}

function stageCoordinatesFromId(id) {
    const index = stageIndexFromEntId(id);


    if (index === -1) {
        return null; 
    }
    
    return stageCoordinatesFromIndex(index)
}

function stageIndexFromEntId(id) {
    for (let i = 0; i < env.stage.virtualGrid.length; i++) {
        if(env.stage.virtualGrid[i].lastElementChild) if (env.stage.virtualGrid[i].lastElementChild.id === id) {
            return i;
        }
    }
    return -1;
}

function stageIndexFromStageCoordinates(x, y) {
    if(y < 0 || x < 0 || x >= env.stage.stageW || y >= env.stage.stageH) return -1
    return (y * env.stage.stageW) + x
}

function elementAtStageCoordinates(x, y) {
    let index = stageIndexFromStageCoordinates(x, y);
    if (
        index < 0 || 
        index >= env.stage.virtualGrid.length
    ) {
        return null; // Coordinates are outside the grid range
    }

    return env.stage.virtualGrid[index];
}

//gets the index of the element in its parent
function getIndex(elm) { return [...elm.parentNode.children].indexOf(elm) }

//gets the X and Y of an entity
function getXYDist(pos1, pos2) {
    let dx = pos2.x - pos1.x;
    let dy = pos2.y - pos1.y;

    return Math.sqrt(dx * dx + dy * dy);
}

function getElDist(el1, el2) {
    const pos1 = stageCoordinatesFromIndex(el1.parentElement.getAttribute('i'))
    const pos2 = stageCoordinatesFromIndex(el2.parentElement.getAttribute('i'))

    if (!pos1 || !pos2) return null

    const dx = pos2.x - pos1.x
    const dy = pos2.y - pos1.y

    return Math.sqrt(dx * dx + dy * dy)
}

function getQueryDist(query1, query2) {
    if(!env?.stage?.ref) return null

    const el1 = env.stage.ref.querySelector(query1)
    const el2 = env.stage.ref.querySelector(query2)
    
    if(!el1 || !el2) return null
    
    return getElDist(el1, el2)
}

// function for determining the relative direction of an element
// returns just one direction if the element is more than 3 tiles away and 'generalize' is true
function getRelativeDirection(origin, target, generalize = false, generalizeRadius = 5) {
    const pos1 = stageCoordinatesFromIndex(origin.parentElement.getAttribute('i'))
    const pos2 = stageCoordinatesFromIndex(target.parentElement.getAttribute('i'))

    const dx = pos2.x - pos1.x
    const dy = pos2.y - pos1.y

    if (generalize && (Math.abs(dx) > generalizeRadius || Math.abs(dy) > generalizeRadius)) {
        if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? "right" : "left"
        else return dy > 0 ? "down" : "up"
    }

    const directions = []
    if(dy < 0) directions.push("up")
    if(dy > 0) directions.push("down")
    if(dx > 0) directions.push("left")
    if(dx < 0) directions.push("right")

    return directions.join("-")
}

/**********************************************/

//unlock any locked entities if they either have no lock condition, or should be unlocked
function checkLocks() {
    env.stage.lastTeleport = false;
    env.stage.querySelectorAll('.teleport').forEach(e => {
        if(e.getAttribute('lockflag') == "permalocked") return;
        if(e.getAttribute('lockflag') == "") return e.classList.remove('locked');

        let unlocked = getShowValidity(e.getAttribute('lockflag'))
        //console.log('unlocked', unlocked, e, e.getAttribute("lockflag"))
        if(!unlocked) e.classList.add("locked"); else e.classList.remove('locked')
    })
}

//moves the game world forward one step
function step() {
    checkLocks()

    //update fog as needed
    if(env.stage.current.fogRadius) {
        darkStep()
    }

    let realCreature = env.stage.real.querySelector('#creature')
    let refParent = env.stage.ref.querySelector('#creature').parentElement

    if(!realCreature) { // creature is missing due to darkStage shenanigans. dupe into current position
        let realParent = env.stage.real.querySelector(`[i="${refParent.getAttribute('i')}"]`)
        realParent.innerHTML = refParent.innerHTML
        realCreature = realParent.firstElementChild
    }

    let realParent = realCreature.parentElement
    if(realParent.getAttribute('i') != refParent.getAttribute('i')) { 
        gridMoveTo(realParent, env.stage.real.querySelector(`.gridpiece[i="${refParent.getAttribute('i')}"]`))

        //executes any onStep
        if(typeof env.stage.current.onStep == "function") env.stage.current.onStep()
        
        //executes any function the entity has within its room or default object
        let entSlug = refParent.getAttribute('slug')
        if(entSlug) { // cool fix suggested by ripplesplash 
            let customEnt, defaultEnt
            if(env.stage.current.entities && (customEnt = env.stage.current.entities[entSlug])) {
                if(customEnt.exec) {customEnt.exec()}
            } else if (defaultEnt = env.stageEntities[entSlug]) {
                if(defaultEnt.exec) {defaultEnt.exec()}
            }
        }
    }
    
    //this sets up CSS camera values
    let creatureXY = stageCoordinatesFromId('creature');

    let gridPlane = env.stage.plane
    env.stage.setPlaneProp('--stage-steps-x', creatureXY.x, true)
    env.stage.setPlaneProp('--stage-steps-y', creatureXY.y, true) 
        
    if(!env.stage.freemove || env.stage.changing) {
        gridPlane.setAttribute('lastmoved', env.stage.lastMoved)
    }
    
    gridPlane.style.setProperty('--stage-width', env.stage.stageW)
    gridPlane.style.setProperty('--stage-height', env.stage.stageH)

    env.stage.creature = realCreature
    env.stage.creatureLoc = creatureXY
    env.stage.creatureI = stageIndexFromStageCoordinates(creatureXY.x, creatureXY.y)

    //more cam stuff
    if(!env.currentDialogue.active && env.stage.customCam && !env.stage.noCamReset) {setCam()} // reset dialogue camera if wasn't unset automatically
    setTimeout(()=>updateCameraTracking(), 1) 
}

/* DARKNESS/FOG GRID NAVIGATION
    when a grid needs to be "dark", we only create the tiles necessary within the #realgrid element
    as you move in one direction, the tiles you should see are added onto the #realgrid and have their opacity animated in
    while the ones leaving your radius are animated out, then completely removed.
*/
env.stage.visibleGridPieces = new Set()
function darkStep() {
    // obtain elements within the fog radius of player
    // determine which elements need to be removed and which need to be added
    let maxRadius = env.stage.current.fogRadius;
    let spot = stageCoordinatesFromId('creature');
    let newVisibleGridPieces = new Set()

    // update stage with current fog state
    let realGrid = content.querySelector("#realgrid")
    realGrid.style.setProperty("--fogRadius", maxRadius)

    // get all intended tiles, update existing ones, add new ones
    let visRings = getSurroundingTiles(spot.x, spot.y, maxRadius);
    let newTiles = document.createDocumentFragment()
    
    visRings.forEach((ring, i) => ring.forEach(rEl => {
        //if the tile isn't in visible gridpieces, then we want to add it with a new index

        let alwaysVis = rEl.classList.contains("alwaysvis") || rEl.firstElementChild?.classList?.contains("alwaysvis")

        if(env.stage.visibleGridPieces.has(rEl)) { // UPDATE
            let opacity = fogOpacityCalculation(i, maxRadius, env.stage.current.fogAlgorithm)
            rEl.cousin.style.setProperty("--distX", rEl.position.xDist)
            rEl.cousin.style.setProperty("--distY", rEl.position.yDist)
            rEl.cousin.style.setProperty('--intendedOpacity', alwaysVis ? 1 : opacity)
            rEl.cousin.style.setProperty('--trueOpacity', opacity)
            
        } else { // ADD (via documentFragment - lets you add a bunch of stuff at once)
            let tile = document.createElement("div")            
            let opacity = fogOpacityCalculation(i, maxRadius, env.stage.current.fogAlgorithm)

            //this can be done with style.setProperty, etc, but this just made sense to do since it's bulk
            tile.setAttribute('class', `piecewrapper vis ${rEl.classList.contains("hardopacity") ? 'hardopacity' : ''} ${rEl.innerHTML != "" ? "stuff" : "empty"} `)
            tile.setAttribute('style', `
                --distX: ${rEl.position.xDist}; 
                --distY: ${rEl.position.yDist};
                --realX: ${rEl.position.x};
                --realY: ${rEl.position.y};
                --intendedOpacity: ${alwaysVis ? 1 : opacity};
                --trueOpacity: ${opacity};
            `)
            tile.innerHTML = rEl.outerHTML
            rEl.cousin = tile

            if(newVisibleGridPieces.has(rEl)) return;
            newTiles.appendChild(tile)
        }

        newVisibleGridPieces.add(rEl)
    }));

    // add all new tiles at once
    realGrid.appendChild(newTiles)

    // handle removal of tiles not in the new setup
    env.stage.visibleGridPieces.forEach(el => {
        if (!newVisibleGridPieces.has(el) && el.cousin) {
            el.cousin.remove()
            delete el.cousin
        }
    });
    
    // Update the global set of visible grid pieces
    env.stage.visibleGridPieces = newVisibleGridPieces;
    initializeAssetCanvases()
}

// gets arrays of squares of tiles around the specified point (using breadth-first search)
// think of them like concentric rings in order expanding outwards from the point
function getSurroundingTiles(centerX, centerY, maxRadius) {
    const result = []
    const visited = new Set()
    const queue = [{ x: centerX, y: centerY, radius: 0 }]
    const alwaysVisInRange = new Set()

    while (queue.length > 0) {
        const { x, y, radius } = queue.shift()

        if (radius > maxRadius) break

        if (!visited.has(`${x},${y}`)) {
            result[radius] = result[radius] || []
            
            let piece = elementAtStageCoordinates(x, y)
            let xDist = x - centerX
            let yDist = y - centerY

            if (
                piece && 
                // tiles can have the "nothing" class, which tells the darkgrid not to render them
                (
                    ( // we only render nothing tiles if they're immediately attached to the player
                        !piece.classList.contains('nothing') ||
                        (Math.abs(xDist) <= 1 && Math.abs(yDist) <= 1)
                    )

                    || piece.innerHTML != "" // we also render 'nothing' tiles if they actually contain something
                )
            ) {
                result[radius].push(piece)
                piece.position = {
                    x,
                    y,
                    xDist,
                    yDist
                }

                //collect alwaysVis tiles in range here so that we can skip rendering them in the alwaysVisTiles set
                if(
                    piece.classList.contains("alwaysvis") || 
                    (piece.firstElementChild ? piece.firstElementChild.classList.contains("alwaysvis") : false)
                ) {
                    alwaysVisInRange.add(piece)
                }
            }

            visited.add(`${x},${y}`)

            if (radius < maxRadius) {
                queue.push(
                    { x: x - 1, y, radius: radius + 1 },
                    { x: x + 1, y, radius: radius + 1 },
                    { x, y: y - 1, radius: radius + 1 },
                    { x, y: y + 1, radius: radius + 1 }
                )
            }
        }
    }

    //get alwaysVis tiles, or tiles with alwaysVis pieces, only if they aren't already in the alwaysVis set
    let alwaysVisTiles = []
    env.stage.ref.querySelectorAll(".gridpiece.alwaysvis, .gridpiece .alwaysvis").forEach(el => {
        let tile = el

        if(!el.classList.contains("gridpiece")) { 
            tile = el.parentElement
        }

        if(!alwaysVisInRange.has(tile)) {
            alwaysVisTiles.push(tile)
            tile.position = stageCoordinatesFromIndex(tile.getAttribute('i'))
            tile.position.xDist = tile.position.x - centerX
            tile.position.yDist = tile.position.y - centerY
        }
    })
    if (alwaysVisTiles.length) result.push(alwaysVisTiles)

    return result;
}

function fogOpacityCalculation(radius, maxRadius, type) {
    const halfRadius = maxRadius / 2;
    if(radius > maxRadius) return 0;

    switch(type) {
        case "quadratic":
            return 1 - (radius / maxRadius) ** 2

        case "half":
            return 1 - ((radius - halfRadius) / (maxRadius - halfRadius));
            
        case "outer-half":
            return radius === maxRadius ? 0.5 : 1;

        case "hard":
            return 1;

        default: //linear
            return 1 - radius / maxRadius
    }
}

function gridMoveTo(origin, target, mirror = undefined, mirrorGridPiece = '#realgrid .gridpiece') {
    if(!target) {
        console.warn('nonexistent target in gridmoveto', origin, target)
        return false
    }

    let blocks = target.classList.contains('blocks')
    if(target.hasAttribute("blockif")) {
        let entSlug = target.getAttribute('slug')        

        if(entSlug && env.stages[body.id].entities) {
            let ent = env.stageEntities[entSlug] || env.stages[body.id].entities[entSlug]
            if(ent.blockIf) blocks = getShowValidity(ent.blockIf)
        }
    }

    if(
        !(blocks) && 
        !(target.classList.contains('teleport') && target.classList.contains('locked')) &&
        (target.classList.contains('gridpiece') || target.classList.contains('fp-gridpiece')) && 
        target.children.length === 0 && origin.children.length > 0
    ) {
        //update as of E4A1 - this moves elements rather than delete/replacing them
        //tiles only ever have one thing in them right now, so it should be fine?
        //did this to preserve element references
        const movingElement = origin.firstElementChild
        target.appendChild(movingElement)
        origin.innerHTML = "" // to trigger :empty
        origin.classList.add('hasnothing')

        if(mirror) { //this is where we move the visual representation on the realgrid
            //dark stages use a different non-indexed system. this does not support different mirrorGridPieces (but that system also is from a scrapped thing so who cares)
            if(env.stage.current.fogRadius) { 
                let targetI = target.getAttribute('i')
                let originI = origin.getAttribute('i')
                let mirrorPosition = env.stage.real.querySelector(`.gridpiece[i="${originI}"]`)
                let targetPosition = env.stage.real.querySelector(`.gridpiece[i="${targetI}"]`)
                
                //first - check if the enemy is even rendered on the realgrid
                if(mirrorPosition) {
                    if(!targetPosition) {//if targetPosition is outside of the radius, then we just remove the mirror guy
                        mirrorPosition.innerHTML = ""
                    } else {//if they're already here and moving in the radius, just move em like normal
                        if(originI != targetI) {
                            gridMoveTo(mirrorPosition, targetPosition)
                        }
                    }

                } else if(targetPosition) { //if they're missing, we want to spawn them in on that point from the gridref
                    targetPosition.appendChild(movingElement.cloneNode(true))
                }

                //if neither the mirror nor target position exist on the stage, then we don't do anything with da mirror. bye bye!!

            //regular function when the whole stage is visible
            } else { 
                let originI = getIndex(origin);
                let targetI = getIndex(target);
                
                if(originI != targetI) {
                    gridMoveTo(mirror, document.querySelectorAll(`${mirrorGridPiece}`)[targetI])
                }
            }
        }

        //elements can trigger alwaysvis and necessitate a grid update on move
        if(movingElement.classList.contains("alwaysvis") && env.stage.current.fogRadius) {
            darkStep()
            updateCameraTracking()
        }

        var targetContents = target.children;
        target.classList.add('hassomething')
        for (var i = 0; i < targetContents.length; i++) {
            targetContents[i].style.transform = ""
        }

        return true;

    } else if(target.classList.contains('teleport') && origin.children[0].classList.contains('player')) {
        let entSlug = target.getAttribute('slug')        

        //if it's freemove and you're repeatedly trying to enter the same place, then we do nothing to not spam the fuck out every 50ms
        if(!env.stage.freemove || (env.stage.freemove && env.stage.lastTeleport != target)) {

            //if it's locked and it has a lockexec, do it
            if(target.classList.contains('locked') && target.getAttribute("lockexec").length) {
                if(entSlug && env.stages[body.id].entities) {
                    let defaultEnt = env.stageEntities[entSlug];
                    let customEnt = env.stages[body.id].entities[entSlug];
                    if(customEnt)
                        if(customEnt.lockExec) {customEnt.lockExec()}
                    else if (defaultEnt) {
                        if(defaultEnt.lockExec) {defaultEnt.lockExec()}
                    }
                }
            }
            
            //otherwise if it isn't locked, do any exec, then teleport to the stage specified
            else if(!target.classList.contains('locked')) {
                if(entSlug && env.stages[body.id].entities) {
                    let defaultEnt = env.stageEntities[entSlug];
                    let customEnt = env.stages[body.id].entities[entSlug];
                    if(customEnt) {
                        if(customEnt.exec) {customEnt.exec()}
                    } else if (defaultEnt) {
                        if(defaultEnt.exec) {defaultEnt.exec()}
                    }
                }

                env.stage.lastTeleport = false
                changeStage(target.getAttribute('teleport-target'), 
                    target.getAttribute('spot') == "false" ? false : target.getAttribute('spot'),
                    target.getAttribute('shouldFace') == "false" ? false : target.getAttribute('shouldFace'), 
                )
            }

            env.stage.lastTeleport = target
        }

        return false
        
    } else if(origin.children[0].classList.contains('player')) {
        //we trigger enemy step
        if(target.firstElementChild) if(target.firstElementChild.classList.contains("evil") && env.stage.lastEnemy != target.firstElementChild) {
            env.stage.lastEnemy = target.firstElementChild
            enemyStep()
        } else {
            console.log(`player gridMoveTo rejected - (blocks: ${target.hasAttribute("blockif")}, ${target.classList.contains('blocks')}), (HTML: ${target.innerHTML})`)
            return false
        }
    } else {
        console.log(`gridMoveTo rejected - (blocks: ${target.hasAttribute("blockif")}, ${target.classList.contains('blocks')}), (HTML: ${target.innerHTML})`)
        return false
    }
}

function updateStageCreature() {
    try{ 
        let creature = env.stage.real.querySelector('.truecreature')
        creature.innerHTML = env.stage.current.creature()
    } catch(e) {console.log('stage creature update failed', e)}
}

function generateAttributes (piece) {
    if(typeof piece.attributes != "object") return ""
    let finalAttributes = ""

    piece.attributes.forEach(attribute=>{
        finalAttributes += `${attribute[0]}="${attribute[1]}" `
    })

    console.log(finalAttributes)
    return finalAttributes
}

function stageCleanup() {
    env.stage.ref = null
    env.stage.current = null
    env.stage.name = null
    env.stage.active = false
    body.classList.remove('stage-active')
    change("stageroom", "DELETE")

    toggleFreemove(false)
    toggleMouseLook(false)

    try { // we do a lot of this in the 2 functions above but i'm paranoid
        if(env.stage.requestLock) document.removeEventListener("mousedown", env.stage.requestLock)

        env.stage.freelook = false
        env.stage.freemove = false
        env.stage.requestLock = false
        env.stage.real.style.transform = ""

        clearInterval(env.stage.freemoveInterval)
        delete env.stage.freemoveInterval

        document.exitPointerLock()
        window.removeEventListener("keydown", freemoveKeyDown)
        window.removeEventListener("keyup", freemoveKeyUp)
        window.removeEventListener("blur", freemoveKeyUp)
        document.removeEventListener('keydown', stageKeypress) 
    } catch(e) { /* never defined */ }
}

/* CAMERA CONTROLS 
/*  These are used mostly by dialogues to control how and when the player is allowed to swap their camera position
*   toggleSwapCam is what you expect
*   pauseSwapCam will remove swapCam and store it if they had it
*   forceSwapCam will do the opposite
*  both of these functions can be toggled
*  there's a way to do it with one function but this makes EXECs more readable
*/

function toggleSwapCam(toggling) { // no swapping during freemove though
    let toggle = env.stage.freemove ? false : toggling
    setTimeout(()=>{
        content.classList.toggle('swapcam', toggle)
        updateCameraTracking()
    }, stageAngleReset())
}

function pauseSwapCam(pausing = true) {
    if(pausing) {
        if(content.classList.contains('swapcam')) env.storingSwap = true
        content.classList.remove('swapcam')
    } else if(!pausing && env.forcingSwap) {
        //if we're unpausing but also forcing, that means i'm being stupid
        forceSwapCam(false)
    } else if(env.storingSwap) { 
        content.classList.add('swapcam')
        env.storingSwap = false
    }
}

function forceSwapCam(forcing = true) {
    if(forcing) {
        console.log("forcing", check("mask-freedom"))
        if(check("mask-freedom")) pauseFreemove(true)
        if(!content.classList.contains('swapcam')) env.forcingSwap = true
        content.classList.add('swapcam')
        updateCameraTracking()
    } else { 
        console.log("forcing off", check("mask-freedom"))
        if(env.forcingSwap) content.classList.remove('swapcam')
        if(check("mask-freedom")) pauseFreemove(false)
        env.forcingSwap = false
    }
}

/* 
    shortcut for setting an attribute on grid-plane watched by CSS 
    this is generally deprecated in favor of setCam which doesn't require you to write extra classes
    but a bunch of things in the early embassy haven't been reworked to not rely on it yet
*/
function specialCam(angle) {
    setTimeout(()=>{
        env.stage.plane.setAttribute('specialcam', angle ? angle : "")
    }, stageAngleReset())
}

/* specialCam's older sister, lets us not have to hardcode CSS classes for dialogue positions */
/* these get set on grid-container so that it's a step beneath the inline ones on grid-plane */
/* call with no settings to reset */
function setCam({
    x = false,
    y = false,
    height = false,
    distance = false,
    rotation = false,
    offsetCamera = false,
    offsetPersonal = false,
    instant = false
} = {}) {
    if(!env?.stage?.container) { console.warn('trying to use setCam with no active stage'); return }

    let delay = 0
    if(instant) {
        delay = 50
        env.stage.plane.classList.add("instantstagetran")
    }

    setTimeout(()=>{
        /* all of them are just direct sets or removes, nothing crazy happening here */
        let setSomething = false

        if(x !== false) {env.stage.container.style.setProperty("--camera-x", x); setSomething = true} else env.stage.container.style.removeProperty("--camera-x");
        if(y !== false) {env.stage.container.style.setProperty("--camera-y", y); setSomething = true} else env.stage.container.style.removeProperty("--camera-y");
        if(height !== false) {env.stage.container.style.setProperty("--camera-height", height); setSomething = true} else env.stage.container.style.removeProperty("--camera-height");
        if(distance !== false) {env.stage.container.style.setProperty("--camera-distance", distance); setSomething = true} else env.stage.container.style.removeProperty("--camera-distance");
        if(rotation !== false) {env.stage.container.style.setProperty("--camera-rotation", rotation); setSomething = true} else env.stage.container.style.removeProperty("--camera-rotation");
        if(offsetCamera !== false) {env.stage.container.style.setProperty("--camera-offset", offsetCamera); setSomething = true} else env.stage.container.style.removeProperty("--camera-offset");
        if(offsetPersonal !== false) {env.stage.container.style.setProperty("--personal-offset", offsetPersonal); setSomething = true} else env.stage.container.style.removeProperty("--personal-offset");

        if(setSomething) { // marker to reset on step
            env.stage.customCam = true
            env.stage.plane.classList.add("customcam")
        } else {
            env.stage.customCam = false
            env.stage.plane.classList.remove("customcam")
        }

        if(instant) setTimeout(()=>env.stage.plane.classList.remove("instantstagetran"), 50)
    }, delay)
}

// ENEMY ADDITIONS
function enemyStep() {
    if(check("TEMP!!noevil") || !env.stage.ref || env.cutscene || body.classList.contains('in-dialogue')) return;
    if(!env.currentDialogue.active && !document.querySelector('#combat')) {
        //only one 'hit' is processed per combined enemy step
        //since it usually involves starting a dialogue
        env.stage.hitPlayer = false
        
        env.stage.ref.querySelectorAll(".evil").forEach(el => {
            let aiType = el.getAttribute('aiType')
            let aiFunc = env.stage.ai[aiType] || env.stage.ai.classic
            aiFunc(el)
        })

        if(env.stage.hitPlayer) env.stage.lastEnemy = false
    }
}

//AI now is handled in an object on env.stages, so that it can be added to and referred to like env.stages.ai["direct"]()
//AI returns true if it tried to move, false if it didn't
env.stage.ai = {
    
    //crude random movement in the direction of the player
    //with an absolutely bizarre hit detection process i haven't changed yet 
    //i wrote this in like 2019 please understand (stage rework when)
    classic: (el, contactExec = env.stage.ai._defaultContact) => {
        if(el.classList.contains('dead') || el.classList.contains('nomove')) return;
        
        //prep a move towards player, executed after hit checks
        //check if this is above, to the left of, to the right of, or below player
        //randomly choose one of two (move x or move y) as flagged above
        let parentPos = stageCoordinatesFromIndex(el.parentElement.getAttribute('i'))
        let playerPos = stageCoordinatesFromId('creature')
    
        var relativeToPlayer = [];
        relativeToPlayer.push(parentPos.y < playerPos.y ? "below" : "above")
        relativeToPlayer.push(parentPos.x < playerPos.x ? "right" : "left")
        let move = relativeToPlayer[Math.floor(Math.random() * relativeToPlayer.length)]

        //execute contact if close enough
        //console.log(getXYDist(parentPos, playerPos))
        if(getXYDist(parentPos, playerPos) == 1) contactExec(el)
        
        //if the player was hit, don't move
        if(env.stage.hitPlayer) { return }
    
        //otherwise, move closer to the player
        if(getXYDist(parentPos, playerPos) <= 1 ) return;
        let enemyMirror = env.stage.real.querySelector(`#${el.id}`)
        let mirrorParent = enemyMirror ? enemyMirror.parentElement : false
        
        switch(move) { //since on dark stages (fogRadius usage) the mirror isn't directly used, we just pass TRUE
            case "above":
                gridMoveTo(el.parentElement, elementAtStageCoordinates(parentPos.x, parentPos.y - 1), env.stage.current.fogRadius ? true : mirrorParent)
            break;
    
            case "right":
                gridMoveTo(el.parentElement, elementAtStageCoordinates(parentPos.x + 1, parentPos.y), env.stage.current.fogRadius ? true : mirrorParent)
            break;
    
            case "left":
                gridMoveTo(el.parentElement, elementAtStageCoordinates(parentPos.x - 1, parentPos.y), env.stage.current.fogRadius ? true : mirrorParent)
            break;
    
            case "below":
                gridMoveTo(el.parentElement, elementAtStageCoordinates(parentPos.x, parentPos.y + 1), env.stage.current.fogRadius ? true : mirrorParent)
            break;
        }

        return true
    },

    wander: (el, contactExec = env.stage.ai._defaultContact) => {
        if (el.classList.contains('dead', 'nomove')) return;

        const directions = [
            { x: 0, y: -1 }, // up
            { x: 1, y: 0 },  // right
            { x: -1, y: 0 }, // left
            { x: 0, y: 1 }   // down
        ]

        const randomDirection = directions[Math.floor(Math.random() * directions.length)]
        const currentPos = stageCoordinatesFromIndex(el.parentElement.getAttribute('i'))
        const targetTile = elementAtStageCoordinates(currentPos.x + randomDirection.x, currentPos.y + randomDirection.y)

        if(targetTile && !targetTile.classList.contains('blocks') && !targetTile.classList.contains("noevil")) {
            const enemyMirror = env.stage.real.querySelector(`#${el.id}`)
            const mirrorParent = enemyMirror ? enemyMirror.parentElement : false

            gridMoveTo(el.parentElement, targetTile, env.stage.current.fogRadius ? true : mirrorParent)
            return true
        }
        
        return false
    },

    //breadth first search direct pathfinding
    //not using A* here because there's no scenario where it's ever weighted (not that combatgrid is now, but... it might be eventually)
    //pretty punishing to use outright so this is more of something for other AIs to thread into
    direct: (el, contactExec = env.stage.ai._defaultContact) => {
        if(el.classList.contains('dead', 'nomove')) return;

        const start = stageCoordinatesFromIndex(el.parentElement.getAttribute('i'))
        const goal = stageCoordinatesFromId('creature')
        if(!goal) return;

        const path = env.stage.ai._bfsPathfinding(start, goal, el);

        if(path.length > 2) {
            const nextStep = path[1]
            const targetTile = elementAtStageCoordinates(nextStep.x, nextStep.y)

            if(targetTile) {
                const enemyMirror = env.stage.real.querySelector(`#${el.id}`)
                const mirrorParent = enemyMirror ? enemyMirror.parentElement : false

                gridMoveTo(el.parentElement, targetTile, env.stage.current.fogRadius ? true : mirrorParent)
                return true
            }
        } else if(path.length == 2) { // contact (start/end tiles are counted in length so 2 = 0)
            contactExec(el)

        } else { 
            // no path
        }
        
        return false
    },

    directToTile: (el, targetTile, contactExec) => {
        if(el.classList.contains('dead', 'nomove') || !targetTile) return;

        const start = stageCoordinatesFromIndex(el.parentElement.getAttribute('i'))
        const goal = stageCoordinatesFromIndex(targetTile.getAttribute('i'))
        const path = env.stage.ai._bfsPathfinding(start, goal, el);

        if(!goal) return;

        if(path.length > 1) {
            const nextStep = path[1]
            const nextTile = elementAtStageCoordinates(nextStep.x, nextStep.y)

            if (nextTile) {
                const enemyMirror = env.stage.real.querySelector(`#${el.id}`)
                const mirrorParent = enemyMirror ? enemyMirror.parentElement : false

                gridMoveTo(el.parentElement, nextTile, env.stage.current.fogRadius ? true : mirrorParent)
                return true
            }
        } else if(path.length == 1 && contactExec) { // contact - not guaranteed to be needed here since it's not the player el
            contactExec(el)
        }
        
        return false
    },

    //uses a map of spida statuses, changed by tile execs
    //sits on origin point, checks if not on origin point to smart path back to it
    //walking on a web tile toggles a flag for it to go after you briefly
    //after the flag is toggled off, enters 'wait' mode for a few seconds before returning
    spida: (el, contactExec = env.stage.ai._defaultContact) => {
        if(!page.spidaSeek) page.spidaSeek = {}
        if(!env.stage.creature) return console.warn("env.stage.creature is null");

        const elDist = getElDist(el, env.stage.creature)
        let moved = false

        //console.log('spidabrain', page.spidaSeek[el.id])

        //won't chase very far off spider tiles
        if(page.spidaSeek[el.id] && !el.parentElement.classList.contains("spidatile") && !env.stage.creature.parentElement.classList.contains("spidatile")) {
            page.spidaSeek[el.id] = "wait"
        }
        
        switch(page.spidaSeek[el.id]) {
            case "seek": // bfs with a teensy bit of unpredictability
            case "leap": // leap is just seek but immediately after a player step
                //console.log('seeking')
                if(Math.random() < 0.1) {
                    env.stage.ai.wander(el, contactExec)
                } else {
                    env.stage.ai.direct(el, contactExec)
                }
                moved = true
            break

            case "wait": // nothing
                //console.log("nothing")
            break

            default: // bfs to origin point (.aiorigin_${id} tile) if not there
                if(!page.spidaSeek[`${el.id}-origin`]) page.spidaSeek[`${el.id}-origin`] = env.stage.ref.querySelector(`.aiorigin_${el.id}`) // this never changes
                const origin = stageCoordinatesFromIndex(page.spidaSeek[`${el.id}-origin`].getAttribute('i'))
                const pos = stageCoordinatesFromIndex(el.parentElement.getAttribute('i'))


                if(getXYDist(pos, origin)) {
                    if(Math.random() < 0.2) {
                        env.stage.ai.wander(el, contactExec)
                    } else {
                        env.stage.ai.directToTile(el, page.spidaSeek[`${el.id}-origin`], false)
                    }

                    moved = true
                }
        }

        //they slow down slightly as they get closer
        //if 'leaping' (i.e. following directly after a player step) they move fast still
        //so it's kinda like they're losing confidence in the player still being there
        if((elDist >= 10 && !check("low_intensity")) || (elDist >= 6 && page.spidaSeek[el.id] == "leap")) el.aiRate = 150
        else if(elDist <= 3 && page.spidaSeek[el.id] != "leap") el.aiRate = check("low_intensity") ? 4000 : 2000
        else if(elDist <= 4 && page.spidaSeek[el.id] != "leap") el.aiRate = check("low_intensity") ? 2000 : 1000
        else el.aiRate = (el.defaultAiRate || 400) * (check("low_intensity") ? 1.5 : 1)

        return moved
    },

    //bfs towards player whenever the player isn't looking in their direction relatively and only if they're closer than a certain range
    thelooker: (el, contactExec = env.stage.ai._defaultContact) => {
        const elDist = getElDist(el, env.stage.creature)
        let moved = false

        if(elDist <= 40 && !getRelativeDirection(el, env.stage.creature, true, env.stage.fogRadius).includes(env.stage.lastMoved)) {
            env.stage.ai.direct(el, contactExec)
            //console.log(el, elDist, "moving")
            moved = true
            
        } else if(env.stage.current.flags[el.id] !== "none" && (elDist > 40 || env.stage.ai._bfsPathfinding(stageCoordinatesFromIndex(el.parentElement.getAttribute('i')), stageCoordinatesFromId('creature'), el).length === 0)) {
            if(!env.stage.current.flags[el.id]) env.stage.current.flags[el.id] = env.stage.ref.querySelector(`.aiorigin_${el.id}`) || "none"
            if(env.stage.current.flags[el.id] !== "none") {
                env.stage.ai.directToTile(el, env.stage.current.flags[el.id], false)
                moved = true
            }

            //console.log(el, elDist, "returning")
        } else {
            //console.log(el, elDist, "not moving")
            moved = false
        }

        //they slow down as they get closer
        //for better reaction time and generally just for scary chase factor
        if(elDist >= 10 && !check("low_intensity")) el.aiRate = 100
        else if(elDist <= 2) el.aiRate = check("low_intensity") ? 5000 : 1000 
        else if(elDist <= 4) el.aiRate = check("low_intensity") ? 2000 : 800
        else el.aiRate = el.defaultAiRate || 300

        return moved
    },

    //floats around (wanders) under normal circumstances
    //if player distance is less than 3, enters direct BFS to the player for 10 seconds before reverting to normal
    //any subsequent steps in range refreshes the timeout
    landmine: (el, contactExec = env.stage.ai._defaultContact) => {
        if(el.classList.contains('dead', 'nomove')) return;
        const elDist = getElDist(el, env.stage.creature);

        if(el.landmineTimeout) {
            env.stage.ai.direct(el, contactExec)

            if(elDist <= 2) el.aiRate = check("low_intensity") ? 3000 : 1000 
            else if(elDist <= 3) el.aiRate = check("low_intensity") ? 1500 : 1000
            else el.aiRate = 300

        } else env.stage.ai.wander(el, contactExec)

        if(elDist <= 2) {
            if(!el.landmineTimeout) chatter({actor: 'sourceless', text: el.triggerText || "mine triggered", readout: true})
            el.aiRate = check("low_intensity") ? 2000 : 1000
            env.stage.querySelectorAll(`#${el.id}`).forEach(el=>el.classList.add('hunting'))
            clearTimeout(el.landmineTimeout)
            el.landmineTimeout = setTimeout(() => {
                env.stage.querySelectorAll(`#${el.id}`).forEach(el=>el.classList.remove('hunting'))
                el.landmineTimeout = null
                el.aiRate = el.defaultAiRate || 3000
                chatter({actor: 'sourceless', text: el.coolText || "mine cooled off", readout: true})
            }, 7000)
        }

        return true
    },

    //moves between two points smartly, calling contactExec when reaching either position to toggle going to the other
    //can probably be used within other AIs to do stuff like 'patrol but briefly chase if player is in range'
    //todo: this is on hold cause i didn't have a use for it in this update but i still like the idea
    patroller: (el, contactExec) => {

    },

    // helper stuff
    _bfsPathfinding: (start, goal, el) => {
        const queue = [[start]]
        const visited = new Set()
        visited.add(`${start.x},${start.y}`)
    
        while (queue.length > 0) {
            const path = queue.shift()
            const pos = path[path.length - 1]
    
            if (pos.x === goal.x && pos.y === goal.y) {
                return path;
            }
    
            const neighbors = [
                { x: pos.x, y: pos.y - 1 }, // above
                { x: pos.x + 1, y: pos.y }, // right
                { x: pos.x - 1, y: pos.y }, // left
                { x: pos.x, y: pos.y + 1 }  // below
            ]
    
            neighbors.forEach(neighbor => {
                const tile = elementAtStageCoordinates(neighbor.x, neighbor.y)
                if(tile) if(!tile.classList.contains('blocks') && !tile.classList.contains("noevil")) {
                    const key = `${neighbor.x},${neighbor.y}`
                    if (!visited.has(key)) {
                        visited.add(key)
                        queue.push([...path, neighbor])
                    }
                }
            })
        }
    
        return [] // no path
    },

    //contactExec used when there isn't a custom one
    _defaultContact: (el) => {
        let result = el.getAttribute('dialogue')

        if(result.includes("EXEC::")) {
            //console.log('executing')
            Function(`${result.replace('EXEC::', '')}`)()
        } else { 
            //start contact dialogue
            //console.log('result is dialogue', result)
            startDialogue(el.getAttribute('dialogue'), {
                originEntityID: el.id
            })
        }
    }
}

//'kills' the target enemy on the stage - behavior may change over time
function killStageEnemy(query) {
    if(query) [env.stage.real, env.stage.ref].forEach(layer => {
        layer.querySelectorAll(query).forEach(e => {
            e.parentElement.classList.remove("hassomething")
            e.parentElement.classList.add("hasnothing")
            e.parentElement.innerHTML = ""
        })
    })

    if(!env.stage.real.innerHTML.includes("evil") && !env.stage.real.innerHTML.includes("face-creature") && !document.querySelector('#stage-navigator .swap')) {
        env.stage.trackCam = false
    }
}

//runs through the page's deadGuys if it has any, removing permadead enemies
function removeDeadStageEnemies() {
    var deadGuys
    try { deadGuys = page.flags.deadGuys[env.stage.name] } catch (e) {/* dead guys not defined yet */}
    if(!deadGuys) return

    deadGuys.forEach(spot=>{
        [env.stage.real, env.stage.ref].forEach(layer => {
            let el = layer.querySelector(`.gridpiece:nth-child(${spot})`)
            el.innerHTML = ""
            el.classList.remove("hassomething")
            el.classList.add("hasnothing")
        })
    })

    if(!env.stage.real.innerHTML.includes("evil") && !env.stage.real.innerHTML.includes("face-creature") && !document.querySelector('#stage-navigator .swap')) {
        env.stage.trackCam = false
    }
}

function isStageClear(checkForSafe = true) {
    if(checkForSafe) return !env.stage.ref.querySelectorAll('.evil').length
    if(!checkForSafe) return env.stage.ref.querySelectorAll('.evil').length
}

/* engoodification canvas work */

//runs through all canvasses with sprites specified and renders the sprites spec'd onto them
function initializeAssetCanvases(force = false) {
    content.querySelectorAll("canvas[sprite]").forEach(canvas=> initializeAssetCanvas(canvas, force))
}

function initializeFloorCanvas(stageObj, realStage) {
    if(!realStage.classList.contains("canvas-floor")) return; // class added when detecting compatibility in changeStage

    let canvas = realStage.querySelector("#stagefloor")
    if(!canvas) {
        canvas = document.createElement('canvas')
        canvas.id = 'stagefloor'
        realStage.appendChild(canvas)
    }

    let ctx = canvas.getContext("2d")
    ctx.webkitImageSmoothingEnabled = false
    ctx.mozImageSmoothingEnabled = false
    ctx.imageSmoothingEnabled = false

    //size the canvas to the stage
    canvas.height = env.stage.stageH * 200
    canvas.width = env.stage.stageW * 200

    let tileArray = stageObj.tileSprites
    if(!tileArray && stageObj.locale) tileArray = env.stage.locales[stageObj.locale]

    /* 
        i.e.
        env.stage.locales["city"] = [
            [".empty.plain", "/img/local/city/tiles/empty.gif"],
            [".prop", "/img/local/city/tiles/occupied.gif"],
            [".road", "/img/textures/black.gif"],
        ]

        (or tileSprites: [] in the stage declaration)

        //same setup as on-stage canvasses i.e. walls, just in object form
        env.stage.locales["city"].(underFloor/overFloor) = {
            sprite: "/img/local/embassy/mind/marbling_pillars_short_m.gif",
            fit: "auto",
            position: "top",
            repeat: "no-repeat"
        }

        (ditto)
    */
    
    //initialize an image for each tile
    /*
        can append query strings to the tileSprite i.e. 
            [".empty.plain", "/img/blank.gif?+clear&+whateverelse"],
        
        currently support:
            +clear - clears the canvas space underneath the tile before rendering, allowing transparency cuts into base floor images
    */
    function render() {
        let loadedCount = 0
        for (let i = 0; i < tileArray.length; i++) {
            const [tileQuery, tileSprite] = tileArray[i]
            
            //when the image loads, loop thru stage tiles - if their slug matches the tile, render it to the canvas
            let loadImg = new Image()
            tileArray[i].push(loadImg)
            
            loadImg.onload = () => {
                //only once the last image loads do we go through and draw each one on the canvas
                //this is to ensure tiles are drawn in order (i.e. empty is drawn, then props over that, etc)
                loadedCount++
                if (loadedCount === tileArray.length) {
                    for(const [tileQuery, tileSprite, loadedImg] of tileArray) {
                        let tiles = env.stage.real.querySelectorAll(`#realgrid > .gridpiece${tileQuery}`)

                        for (let i = 0; i < tiles.length; i++) {
                            const thisTile = tiles[i]
                            coords = stageCoordinatesFromIndex(Number(thisTile.getAttribute("i")))
                            thisTile.classList.add("tile-in-canvas")
                
                            //render 
                            if(tileSprite.includes("+clear")) ctx.clearRect(coords.x * 200, coords.y * 200, 200, 200);
                            if(!thisTile.classList.contains("notile")) ctx.drawImage(loadedImg, coords.x * 200, coords.y * 200, 200, 200)
                        }

                        //similar to underFloor, we can render something over the floor too
                        let overFloor = stageObj.overFloor || tileArray.overFloor
                        if(overFloor) {
                            let img = new Image()
                            img.onload = () => canvasImageLoad({img, canvas, fit: overFloor.fit, repeat: overFloor.repeat, position: overFloor.position, existingCtx: ctx})
                            img.src = overFloor.sprite
                        }
                    }
                }
            }

            //we append flags in the form of a query string, but we don't need to actually use that when fetching
            loadImg.src = tileSprite.split("?")[0]
        }
    }

    //if the stage has a base image for the floor, we want to render that in the canvas first
    let underFloor = stageObj.underFloor || tileArray.underFloor
    if(underFloor && !stageObj.ignoreUnderFloor) {
        let img = new Image()
        img.onload = () => {
            canvasImageLoad({img, canvas, fit: underFloor.fit, repeat: underFloor.repeat, position: underFloor.position, existingCtx: ctx})
            render()
        }
        img.src = underFloor.sprite
    } else {
        render()
    }
}

//singular function 
function initializeAssetCanvas(canvas, force = false) {
    if(canvas.initialized && !force) return;
    if(force && canvas.initialied) { // means it was already drawn - need to clear
        canvas.getContext("2d").ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    //core drawing stuff
    const sprites = (canvas.getAttribute("sprite") || "").split(", ")
    const fits = (canvas.getAttribute("fit") || "contain").split(", ")
    const repeats = (canvas.getAttribute("repeat") || "no-repeat").split(", ")
    const positions = (canvas.getAttribute("position") || "").split(", ")

    //pixel scaling based on grid tile and dyp size
    canvas.width = processStageVariables(canvas.getAttribute("basewidth")) * 200
    canvas.height = processStageVariables(canvas.getAttribute("baseheight")) * 200

    //we want to make sure the images load and draw in the order they're specified
    let loadedCount = 0
    sprites.forEach((sprite) => {
        let loadImg = new Image()
        loadImg.onload = () => {
            //only once the last image loads do we go through and draw each one on the canvas
            loadedCount++
            if (loadedCount === sprites.length) {
                sprites.forEach((sprite, i) => {
                    setTimeout(()=>{
                        let img = new Image()
                        //default to just using the first specified thing if needed
                        img.onload = () => canvasImageLoad({img, canvas, fit: fits[i] || fits[0], repeat: repeats[i] || repeats[0], position: positions[i] || positions[0]})
                        img.src = sprite
                    }, 10 * i)
                })
            }
        }
        loadImg.src = sprite
    })

    canvas.initialized = true
}

//general loading function, allows us to pass existing contexts if desired
function canvasImageLoad({img, canvas, fit = "", repeat = "", position = "", existingCtx}) {
    let scaleMult, scaleX, scaleY, gfxWidth, gfxHeight, xPos, yPos
    console.log(img.src)

    let ctx = existingCtx
    if(!ctx) {
        ctx = canvas.getContext("2d")
        ctx.webkitImageSmoothingEnabled = false
        ctx.mozImageSmoothingEnabled = false
        ctx.imageSmoothingEnabled = false
    }

    //background-size style, without the % specs
    switch (fit) {
        case 'auto':
            gfxWidth = img.width
            gfxHeight = img.height
        break

        case 'stretch':
            gfxWidth = canvas.width
            gfxHeight = canvas.height
        break

        case 'stretch-y':
            gfxHeight = canvas.height
            gfxWidth = img.width
        break

        case 'stretch-x':
            gfxWidth = canvas.width
            gfxHeight = img.height
        break

        case 'cover':
            scaleX = canvas.width / img.width
            scaleY = canvas.height / img.height
            scaleMult = Math.max(scaleX, scaleY)

            gfxWidth = img.width * scaleMult
            gfxHeight = img.height * scaleMult
        break

        default:
        case 'contain':
            scaleX = canvas.width / img.width
            scaleY = canvas.height / img.height
            scaleMult = Math.min(scaleX, scaleY)

            gfxWidth = img.width * scaleMult
            gfxHeight = img.height * scaleMult
        break
    }

    //background-position style switch - twofold for both x and y. works like "top center"
    let splitPos = position.split(" ")
    switch (splitPos[0]) {
        case 'top': 
            yPos = 0
        break

        case 'center':
            yPos = (canvas.height - gfxHeight) / 2
            //console.log("!!! RENDERING AT", yPos)
        break

        default:
        case 'bottom': 
            yPos = (canvas.height - gfxHeight)
            //console.log("!!! RENDERING AT", yPos)
        break
    }

    switch (splitPos[1]) {
        case 'left': xPos = 0; break
        case 'right': xPos = canvas.width - gfxWidth; break

        default:
        case 'center': xPos = (canvas.width - gfxWidth) / 2; break
    }

    //repeat options
    if(repeat != "no-repeat" && repeat.includes("repeat")) {
        switch(repeat) {
            case "repeat-x":
                for (let x = xPos - gfxWidth; x < canvas.width; x += gfxWidth) {
                    ctx.drawImage(img, x, yPos, gfxWidth, gfxHeight);
                }
                
                for (let x = xPos - gfxWidth; x > -gfxWidth; x -= gfxWidth) {
                    ctx.drawImage(img, x, yPos, gfxWidth, gfxHeight);
                }
            break

            case "repeat-y":
                for (let y = yPos - gfxHeight; y < canvas.height; y += gfxHeight) {
                    ctx.drawImage(img, xPos, y, gfxWidth, gfxHeight);
                }
    
                for (let y = yPos - gfxHeight; y > -gfxHeight; y -= gfxHeight) {
                    ctx.drawImage(img, xPos, y, gfxWidth, gfxHeight);
                }
            break

            case "repeat":
                for (let x = xPos - gfxWidth; x < canvas.width; x += gfxWidth) {
                    ctx.drawImage(img, x, yPos, gfxWidth, gfxHeight);
                    
                    for (let y = yPos - gfxHeight; y < canvas.height; y += gfxHeight) {
                        ctx.drawImage(img, x, y, gfxWidth, gfxHeight);
                    }
        
                    for (let y = yPos - gfxHeight; y > -gfxHeight; y -= gfxHeight) {
                        ctx.drawImage(img, x, y, gfxWidth, gfxHeight);
                    }
                }
                
                for (let x = xPos - gfxWidth; x > -gfxWidth; x -= gfxWidth) {
                    ctx.drawImage(img, x, yPos, gfxWidth, gfxHeight);
                    
                    for (let y = yPos - gfxHeight; y < canvas.height; y += gfxHeight) {
                        ctx.drawImage(img, x, y, gfxWidth, gfxHeight);
                    }
        
                    for (let y = yPos - gfxHeight; y > -gfxHeight; y -= gfxHeight) {
                        ctx.drawImage(img, x, y, gfxWidth, gfxHeight);
                    }
                }
            break
        }

        return //don't wanna double draw
    }

    ctx.drawImage(img, xPos, yPos, gfxWidth, gfxHeight)
}