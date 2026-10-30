//opens the dialogue menu with a given initiation message
env.currentDialogue = {
    active: false,
    canStart: true, //used for cooldown after closing
    originEntityID : null,
    actors: {},
    prevSpeaker: "dialogue choice"
}

//starts the dialogue with a given dialogue chain name (must be defined in env.dialogues)
function startDialogue(dialogueChain, settings = {
    originEntityID: null, 
    specificChain: false, 
    chatterlogue: false, // special mode that lets you move and talk. doesn't count as a menu, but occupies the right side of the screen
    force: false,
}) {
    if((env.currentDialogue.active || !env.currentDialogue.canStart || check("TEMP!!nodialogue")) && !settings.force){
        env.error = `tried to start dialogue ${dialogueChain} but either currently in dialogue or too soon after previous dialogue. consider using CHANGE::`
        return 
    }

    if(settings.force) {
        if(env.currentDialogue.queuedCallback) {
            env.currentDialogue.queuedCallback()
            env.currentDialogue.queuedCallback = false
        }
        document.querySelector('#dialogue-box').innerHTML = ""
    }

    //if origin entity is set, we keep track of that entity and also highlight it somehow (usually for dynamic purposes related)
    if(settings.originEntityID) {
        env.currentDialogue.originEntityID = `#${settings.originEntityID}`
             
        if(env.stage.current) [env.stage.real, env.stage.ref].forEach(layer => {
            layer.querySelectorAll(settings.originEntityID).forEach(e => {
                e.classList.add('dialogue-origin')
            })
        })
        
    } else env.currentDialogue.originEntityID = null

    env.currentDialogue.settings = settings
    env.currentDialogue.canStart = false
    env.dialogueBox = document.getElementById("dialogue-box")

    if(settings.chatterlogue) {
        body.classList.add('in-chatterlogue')
        env.dialogueBox.classList.add("chatterlogue")
    } else {
        body.classList.add('in-dialogue')
        env.dialogueBox.classList.remove("chatterlogue")
    }

    //if the player is in a freemouse stage state, we pause that
    if(env?.stage?.freemove && !settings.chatterlogue) {
        setTimeout(() => {
            if(!env.forcingSwap) pauseFreemove(true)
        }, 50)
    }

    if(body.classList.contains('mui-active') || body.getAttribute("menu") != "none") exitMenu()

    if(!env.currentDialogue.active) { //if dialogue isn't active already, start the dialogue
        if(!settings.chatterlogue) body.classList.add('in-menu')

        setTimeout(()=>{
            body.setAttribute('currentDialogue', dialogueChain)
            document.getElementById('dialogue-box').classList.toggle("can-skip", env.currentDialogue.chain?.skip ? true : false)
        }, stageAngleReset()) //stageAngleReset is a timing and camera movement function from cystStage that helps make sure things are timed right

        const localization = getLocalizationForPage()
        if(localization.dialogues) env.currentDialogue.chain = localization.dialogues[`${page.dialoguePrefix}__${dialogueChain}`] || localization.dialogues[dialogueChain] || env.dialogues[dialogueChain]
        else env.currentDialogue.chain = env.dialogues[dialogueChain]
        
        env.currentDialogue.chainName = dialogueChain
        try {
            sendDialogue(typeof settings?.specificChain == "undefined" || settings?.specificChain === false ? env.currentDialogue.chain.start : env.currentDialogue.chain[settings?.specificChain])
        } catch(e) { printError(`dialogue error for ${dialogueChain}: ` + e, true); setTimeout(()=>endDialogue(), 2000)}
        env.currentDialogue.active = true

        //identify actors and add them as objects within the currentDialogue object for ease of use
        env.currentDialogue.actors = {}
        for (const topicName in env.currentDialogue.chain) {
            //ignore some special strings
            if(!["end", "skip", "skipTime", "skipNotice"].includes(topicName)) {
                env.currentDialogue.chain[topicName].body.forEach(dialogue => {
                    env.currentDialogue.actors[dialogue.actor] = getDialogueActor(dialogue.actor, true)
                })
            }
        }
    }

    // based on the groundsmindry approach
    // page-based tracking for having seen the dialogue...
    // this probably won't cause any issues :^)
    change(`PAGE!!${dialogueChain}`, true)
}

function changeDialogue(dialogueChain) {
    body.setAttribute('currentDialogue', dialogueChain)
    const localization = getLocalizationForPage()
    
    if(localization.dialogues) env.currentDialogue.chain = localization.dialogues[dialogueChain] || env.dialogues[dialogueChain]
    else env.currentDialogue.chain = env.dialogues[dialogueChain]

    env.currentDialogue.chainName = dialogueChain
    env.currentDialogue.justChanged = true
    sendDialogue(env.currentDialogue.chain.start)

    document.getElementById('dialogue-box').classList.toggle("can-skip", env.currentDialogue.chain?.skip ? true : false)
}

function changeBranch(branchName) {
    sendDialogue(env.currentDialogue.chain[branchName], 0)
}

//takes an actor slug, with or without expression (denoted with ::), and returns an object with relevant info
function getDialogueActor(inputSlug, noExec) {
    if(!inputSlug) return null
    let actorSlug = inputSlug
    let expression = 'default'

    if(actorSlug.includes('::')) {
        let split = actorSlug.split("::")
        actorSlug = split[0]
        expression = split[1]
    }

    let actorObj = env.dialogueActors[actorSlug]
    if(!actorObj) throw `no actor object found for ${actorSlug}`
    if(!actorObj.name) actorObj.name = actorSlug //throw a proper name in for later use if there ain't one already
    actorObj.name = processStringTranslation(actorObj.name) // translate if needed

    //anything without expressions is just a regular actor object so we return it immediately
    if(!actorObj.expressions) return actorObj

    //however, anything with expressions will be modified based on the input expression first
    if((!actorObj.expression || actorObj.expression != expression) && !noExec) {
        actorObj.expression = expression

        if(actorObj.expressions[expression].image) actorObj.image = typeof actorObj.expressions[expression].image == "function" ? actorObj.expressions[expression].image() : actorObj.expressions[expression].image
        if(actorObj.expressions[expression].voice) { 
            actorObj.activeVoice = actorObj.expressions[expression].voice
        } else {
            if(actorObj.expressions.default.voice) actorObj.activeVoice = actorObj.expressions.default.voice
            else actorObj.activeVoice = actorObj.voice
        }
        if(actorObj.expressions[expression].type) actorObj.type = actorObj.expressions[expression].type
        if(actorObj.expressions[expression].class) actorObj.class = actorObj.expressions[expression].class; else actorObj.class = false
        if(actorObj.expressions[expression].element) actorObj.element = actorObj.expressions[expression].element

        //the exec on an expression happens whenever the expression changes, so we execute it
        if(actorObj.expressions[expression].exec) actorObj.expressions[expression].exec()
    }
    return actorObj
}

//progress through the dialogue on click, until it runs out and there's only responses
var dialogueProgressEvent, dBox
function sendDialogue(dialogue, i = 0) {
    if(env.skipDialog) return; // don't proceed if there's a skip dialog

    try {
        env.currentDialogue.branch = dialogue
        let queue = dialogue.body
        if(!dBox) dBox = document.getElementById('dialogue-box') // defined here bc this script is loaded ahead of page content
        var dMenu = document.getElementById('dialogue-menu') //this is redefined later

        //removes ID and adds dialogue-menu class to set it inactive, effectively preparing the next one
        //may not exist if starting dialogue
        clearDialogueMenu()

        //removes the listener after it's started so it can't be called multiple times, useful for ones with 'wait'
        dBox.removeEventListener('mousedown', dialogueProgressEvent)
        document.removeEventListener('keydown', dialogueProgressEvent)

        if(i < queue.length) {
            if(shouldItShow(queue[i])) {
                dBox.classList.add('dialogue-click-proceed')
                let current = queue[i]
                let currentActor = getDialogueActor(current.actor)

                //the current dialogue bubble doesn't have text - therefore it has a texec (text exec) to generate the response
                if(typeof current.texec == 'function') {
                    current.text = current.texec()
                }

                //log the dialogue in the readout too
                if(current.actor != "unknown") readoutAdd({message: current.text, image: currentActor.image, name: current.actor, displayName: currentActor.name, type: currentActor.type, sfx: false, actor: current.actor, show: false})

                //execute any code attached to the message
                if(current.exec) {
                    try { current.exec() } catch(e) {printError(e); console.log(e)}
                }

                //play any actor voice sfx, stop any previous voices
                if(!current.silent) {
                    if(currentActor.voice !== false && env.currentDialogue.prevSpeaker != current.actor && env.currentDialogue.prevSpeaker != "nobody stupid" && env.currentDialogue.prevSpeaker != "dialogue choice" && !env.noVoiceStop) sfxmap.stop()
                    if(typeof currentActor.voice == "function" || typeof currentActor.activeVoice == "function") {
                        if(currentActor.activeVoice) currentActor.activeVoice(); else currentActor.voice()
                    } else if(currentActor.voice !== false) {
                        play('muiReadout')
                    }
                }

                //hide the portrait if it's the last person who talked, otherwise add one
                var portrait = ""
                if(current.actor != env.currentDialogue.prevSpeaker && currentActor.image) portrait += `<div class="dialogue-portrait" style="--background-image: url(${currentActor.image});"></div>`
                env.currentDialogue.prevSpeaker = current.actor

                //create the dialogue message block
                let newLine = `
                    <div class="dialogue-message actor-${current.actor.replace("::", " expression__")} ${currentActor.player ? "from-player" : ""} ${currentActor.type} ${current.class || ""}">
                        ${portrait}
                        <div class="dialogue-text">
                            ${currentActor.noProcess ? current.text : processDefinitionsInString(current.text)}
                        </div>
                    </div>
                    `
                dBox.insertAdjacentHTML('beforeend', newLine)
                setTimeout(()=>{document.querySelector('.dialogue-message:last-of-type').classList.add('sent')}, current.autoAdvance ? 0 : 50)

                //update the event listener to proceed to the next line
                if(current.wait) dBox.classList.remove('dialogue-click-proceed')
                env.dialogueWaitTimeout = setTimeout(()=>{
                    if(current.autoAdvance) {
                        sendDialogue(dialogue, i + 1)

                    } else {
                        dialogueProgressEvent = (event)=>{
                            let key = event.key || false
                            if(env.cutscene) return;
                            if(key) {
                                switch(key) {
                                    case " ":
                                    case "Enter": break

                                    case "Escape": return skipDialogue();
                                    default: return;
                                }
                            }

                            sendDialogue(dialogue, i + 1)
                        }
        
                        setTimeout(function(){
                            dBox.addEventListener('mousedown', dialogueProgressEvent);
                            document.addEventListener('keydown', dialogueProgressEvent);
                            dBox.classList.add('dialogue-click-proceed')
                        }, 100)
                    }
                    if(current.then) current.then();

                    delete env.dialogueWaitTimeout
                }, (current.wait || 1))
            } else {
                sendDialogue(dialogue, i + 1)
            }

        } else { //the dialogue chain is over, show responses
            env.currentDialogue.prevSpeaker = "nobody stupid"
            env.currentDialogue.justChanged = false
            dBox.classList.remove('dialogue-click-proceed')
            dBox.removeEventListener('mousedown', dialogueProgressEvent)
            document.removeEventListener('keydown', dialogueProgressEvent)
            dBox.insertAdjacentHTML('beforeend', `<div id="dialogue-menu"></div>`)

            dMenu = document.getElementById('dialogue-menu') //there's a new dialogue menu--the old one is now inactive

            //sets flag for seeing the sent dialogue
            markThisDialogueSeen()

            dialogue.responses.forEach(actor => {
                let actorObj = getDialogueActor(actor.name, true)
                dMenu.insertAdjacentHTML('beforeend', `
                    <div class="dialogue-actor ${actorObj.type} dialogue-options-${actor.name} actor-${actor.name}">
                        <div class="dialogue-portrait" style="--background-image: url(${actorObj.image})"></div>
                        <div class="dialogue-options"></div>                    
                    </div>
                `)

                actor.replies.forEach(reply => {
                    console.log(`SHOULD REPLY ${reply.name} SHOW? ::: ${shouldItShow(reply)}`)
                    let show = shouldItShow(reply)

                    if(show) {
                        console.log(`determined ${show}, so showing reply`)

                        //programmatically decide the reply name that shows if the reply name is a function
                        let nameToUse
                        if(typeof reply.name == "function") nameToUse = reply.name() // this case is an ancient holdover from before the dialogue string syntax
                        else if(reply.texec) nameToUse = reply.texec()
                        else nameToUse = reply.name.trim()
                        
                        //determine what kind of unread it is, if any
                        let readState
                        if(typeof reply.unreadCheck == "function") readState = reply.unreadCheck();
                        else readState = checkUnread(reply);

                        if(readState == false) readState = "read"
                        var readAttribute = reply.hideRead ? 'read="hidden"' : `read=${readState}`

                        //detect if it's an end reply, and if it should have custom 'tiny' text
                        var isEnd
                        if(reply.fakeEnd || reply.destination == "END") isEnd = reply.fakeEnd || processStringTranslation("(end chat)")

                        //detect what definition to show
                        var tooltip 
                        if(!isEnd){
                            tooltip = "NOTE::"
                            if(!reply.hideRead) {
                                if(reply.class) {
                                    switch(readState) {
                                        case "read":
                                            tooltip += `'has no unutilized responses'`;
                                        break

                                        case "unread":
                                        case "within":
                                            tooltip += `'has unutilized responses'`;
                                    }
                                } else {
                                    switch(readState) {
                                        case "read":
                                            tooltip += `'previously utilized response'`
                                        break

                                        case "unread":
                                            tooltip += `'response not yet utilized'`
                                        break

                                        case "within":
                                            tooltip += `'response leads to unused responses'`
                                    }
                                }
                            } else {
                                tooltip += `'dynamic response'`
                            }
                        }

                        if(reply.definition) tooltip = reply.definition;

                        //add the reply and set up its click handler
                        document.querySelector(`#dialogue-menu .dialogue-options-${actor.name} .dialogue-options`).insertAdjacentHTML('beforeend', `
                            <button
                                class="
                                    reply
                                    ${isEnd ? "end-reply" : ""}
                                    ${reply.class || ""}
                                "
                                reply="${reply.destination}" 
                                name="${nameToUse}"
                                ${tooltip ? `definition="${tooltip}"` : ""}
                                ${!isEnd ? readAttribute : ""} 
                                ${isEnd ? `endtext="${isEnd}"` : ''}
                            >${nameToUse}</button>`
                        )

                        //on option click, remove event listeners and add classes to indicate choice
                        document.querySelector(`#dialogue-menu .dialogue-options button[name="${nameToUse}"]`).addEventListener('click', function(e) {
                            console.log(nameToUse)

                            if(reply.exec) {
                                try { reply.exec() } catch(e) {printError(e); console.log(e)}
                            }

                            var dest = reply.destination
                            //redefine dest as something more readable if it's a function
                            if(dest.includes('EXEC::')) {
                                dest = `EX-${slugify(nameToUse.slice(0, 10))}`
                            }
                            
                            document.querySelectorAll('#dialogue-menu .dialogue-options button').forEach(el => {el.inert = true; el.innerHTML += ''}) //destroys event listeners & stops focus in one easy step
                            this.classList.add('chosen')
                            this.closest('.dialogue-actor').classList.add('chosen')

                            //determine how to handle the reply based on any special prefixes or names
                            let replyValue = this.attributes.reply.value
                            if(replyValue == "END") { //end of dialogue
                                endDialogue(env.currentDialogue.chain.end)
                            } else if(replyValue.includes('CHANGE::')) { //changing to different dialogue
                                let changeValue = replyValue.replace('CHANGE::', '')
                                changeDialogue(changeValue)
                            } else if(replyValue.includes('EXEC::')) { //executing a function - the function given should end dialogue or change it, otherwise may softlock
                                Function(`${replyValue.replace('EXEC::', '')}`)()
                                clearDialogueMenu()
                            } else {
                                sendDialogue(env.currentDialogue.chain[replyValue])
                            }
                        })
                    }
                })
            })

            document.querySelectorAll(`#dialogue-menu .dialogue-options button`).forEach(e=>{
                e.addEventListener('mouseenter', ()=>play('muiHover'))
                e.addEventListener('click', ()=> play('muiClick'))
            })

            //show only if the actor has any valid/choosable options
            setTimeout(()=>{document.querySelectorAll('#dialogue-menu .dialogue-actor').forEach(e=> {
                if(e.querySelector('.dialogue-options').childElementCount) e.classList.add('sent')
                else e.remove()
            })}, 50)
        }
        
        dBox.scrollTop = dBox.scrollHeight
    } catch(e) {
        printError(e)
        if(!check("TEMP!!debug")) endDialogue()
    }
}

//makes sure an option should actually show
//you can optionally pass an execArg that is sent down through functions (non-EXEC only for now)
function shouldItShow(thing, { execArg } = {}) {
    var showValidity
    var showIf = thing.showIf

    if(showIf) {
        showValidity = getShowValidity(showIf, execArg)
    } else {
        showValidity = true
    }

    //if it should show, check to see if it's a message or dialogue that should only show once
    if(showValidity == true) {
        if(thing.showOnce && thing.text) { //it's a message, so check the current parent for having been seen
            return check(`${page.dialoguePrefix}__${env.currentDialogue.chainName}-${slugify(env.currentDialogue.branch.name)}`, false)

        } else if(thing.showOnce && thing.destination) { //it's a dialogue option
            //++ denotes special moth format (or otherwise 'global')
            console.log(thing)
            if(env.currentDialogue.active) if(env.currentDialogue.chainName.includes("++")) { //TODO: having a current dialogue check in here might be a consistency problem?
                if(env.currentDialogue.chainName.includes("mth++")) { return check(`mth++${page.dialoguePrefix}-${slugify(thing.destination)}`, false) }
                else return check(`${env.currentDialogue.chainName}-${slugify(thing.destination)}`, false)
            }
            //otherwise it's normal
            else return check(`${page.dialoguePrefix}__${env.currentDialogue.chainName}-${slugify(thing.destination)}`, false)
        }
    }

    return showValidity
}

//clears out the dialogue box
function endDialogue(endCallback = false) {
    body.removeAttribute('currentDialogue')
    body.classList.remove('in-dialogue', 'in-menu', 'in-chatterlogue')

    env.currentDialogue.active = false
    env.currentDialogue.prevSpeaker = false
    if(endCallback) env.currentDialogue.queuedCallback = endCallback
    
    if(env.stage.current) [env.stage.real, env.stage.ref].forEach(layer => {
        layer.querySelectorAll(env.currentDialogue.originEntityID).forEach(e => {
            e.classList.remove('dialogue-origin')
        })
    })
    
    markThisDialogueSeen('end')
    fixDialogueEnd()
    fixSkipDialogueBug()

    if(!env.forcingSwap) pauseFreemove(false, false)
    checkEpisodeProgress()
	setTimeout(()=>{
        env.currentDialogue.canStart = true
        if(!env.currentDialogue.active) document.querySelector('#dialogue-box').innerHTML = ""
        if(endCallback) {
            endCallback()
            env.currentDialogue.queuedCallback = false
        }
    }, 500)

    if(dialogueProgressEvent) {
        dBox.removeEventListener('mousedown', dialogueProgressEvent)
        document.removeEventListener('keydown', dialogueProgressEvent)
    }

    if(env.dialogueWaitTimeout) {
        clearTimeout(env.dialogueWaitTimeout)
        delete env.dialogueWaitTimeout
    }
}

//similar to endDialogue, but theoretically could be called any time during a dialogue
//works only on dialogues that have a "skip" function
//will immediately call a '.skip' (SKIP::function) for the dialogue, if one exists
//the END::function will still be called, but after SKIP::, so beware
//we use this to make sure a dialogue's critical in-text functions are still executed
function skipDialogue() {
    if(!env.currentDialogue?.chain?.skip) return;
    if(env.skipDialog) return;
    markThisDialogueSeen()
    play("muiClick", 3)
    
    env.skipDialog = document.createElement('div')
    env.skipDialog.id = 'dialogue-skip'
    env.skipDialog.innerHTML = `
      ${env.currentDialogue.chain.skipNotice ? `<span class="skip-notice">NOTICE::'${env.currentDialogue.chain.skipNotice}'</span>` : ""}
      <div class="skip-dialog">
        <button id="skip-yes" class="button" onmouseenter="play('muiHover')" onclick="play('muiClick');env.skipDialogYes()">confirm</button>
        <button id="skip-no" class="button" onmouseenter="play('muiHover')" onclick="play('muiClick');env.skipDialogNo()">retract</button>
      </div>
    `
    document.body.appendChild(env.skipDialog)

    env.skipDialogYes = () => {
        env.skipDialog.remove()
        delete env.skipDialog

        if(!env?.currentDialogue?.active) return;

        vfx({type: "skip", state: true, useCutscene: true})
        let vol = Howler.volume()
        cutscene(true)

        setTimeout(() => {
            vfx({type: "skip", state: false, useCutscene: false})
            Howler.volume(vol)
            cutscene(false)
        }, env?.currentDialogue?.chain?.skipTime || 1000)

        env.currentDialogue.chain.skip()
        endDialogue(env.currentDialogue.chain.end)
        Howler.volume(0)
    }

    env.skipDialogNo = () => {
        env.skipDialog.remove()
        delete env.skipDialog
    }
}

//func for quickly fixing EP2ADD2 dialogue bug
function fixDialogueEnd(force = false) {
    if(!check("ran_e2a2_fix") || force) {
        console.log("running dialogue fix")
        for (const dialogueName in flags.dialogues) {
            if (Object.hasOwnProperty.call(flags.dialogues, dialogueName)) {
                if(dialogueName.includes("-start")) {
                    let fixy = dialogueName.replace("-start", "-end")
                    seenDialogue(fixy)
                }
            }
        }
        change("ran_e2a2_fix", true)
    }
}

//func for quickly fixing EP4 launch dialogue bug
function fixSkipDialogueBug(force = false) {
    if(!check("ran_e4_fix") || force) {
        console.log("running dialogue skip fix")
        for (const dialogueName in flags.dialogues) {
            if(dialogueName.startsWith("ep4__")) {
                let split = dialogueName.split("-")

                if(!check(split[0])) {
                    console.log("fixing", split[0])
                    seenDialogue(`${split[0]}-start`)
                }
            }
        }
        change("ran_e4_fix", true)
    }
}

//shortcut for marking current dialogue
function markThisDialogueSeen(branch = env?.currentDialogue?.branch?.name) {
    let seenName
    if(env.currentDialogue.chainName.includes('++')) seenName = `${env.currentDialogue.chainName}-${slugify(branch)}`
    else seenName = `${page.dialoguePrefix}__${env.currentDialogue.chainName}-${slugify(branch)}`
    seenDialogue(seenName)
}

//marks that the user has seen the specified dialogue 
function seenDialogue(name) {
    if(flags.dialogues == undefined) flags.dialogues = {}

    flags.dialogues[name] = true
    localStorage.setItem('flags', JSON.stringify(flags))
}

//removes events from the current response offering
function clearDialogueMenu() {
    var dMenu = document.getElementById('dialogue-menu')
    if(dMenu) {
        dMenu.classList.add('dialogue-menu')
        dMenu.id = ""
    }
}

//detects if a reply is either unread or contains any unread replies in subsequent replies (recursion bitch!!!)
//intended ONLY for use within dialogue presently
//returns "unread", "within", or false
function checkUnread(inputReply, inputChainName, {examinedReplies = [], originalReply = inputReply, baseChainName} = {}) {
    let reply = inputReply
    let arbChainName = inputChainName

    //detect if any special stuff needs to happen
    if(reply.destination.includes("EXEC::") || reply.destination == "END") return false // something like this is very special and should be hideread anyway if not END

    //with CHANGE, we only continue checking if it doesn't change back to the original chain
    let originalChainName = baseChainName || arbChainName
    if(reply.destination.includes("CHANGE::")) {
        let changeTo = reply.destination.replace("CHANGE::", "")
        if(changeTo == baseChainName) return false;

        reply = {destination: "start"}
        arbChainName = changeTo
    }

    //sets up the return variable
    //examinedReplies will tell us whether we're in recursion or not
    let successReturn = examinedReplies.length > 0 ? "within" : "unread"

    //check to make sure we haven't looped - if so, return false
    //otherwise - add it to the examined replies tracker
    if(examinedReplies.includes(reply.destination)) return false
    examinedReplies.push(reply.destination)

    //immediately return if the reply hides whether it's been read
    //also returns if it's a fake end - they're usually loops
    if(reply.hideRead || reply.fakeEnd) return false

    //get proper name of reply and check whether it's been read before
    let chainName = arbChainName || env.currentDialogue.chainName
    var flagName = `${page.dialoguePrefix}__${chainName}-${slugify(reply.destination)}`
    if(chainName.includes("++")) flagName = `${chainName}-${slugify(reply.destination)}` //++ dialogue is specially flagged, it's not page specific
    let isRead = check(flagName)

    //if it's unread, we return right away
    if (!isRead && !reply.arbitrary) return successReturn

    //otherwise, we check its destination's replies
    var foundUnread = false
    let dialogue

    const localization = getLocalizationForPage()
    if(localization.dialogues) dialogue = localization.dialogues[chainName] || env.dialogues[chainName] || env.currentDialogue.chain
    else dialogue = env.dialogues[chainName] || env.currentDialogue.chain

    let destResponses = dialogue[reply.destination].responses
    destResponses.forEach(responseList => {
        var checkList = [reply.destination, originalReply.destination]
        if(env.currentDialogue.active) checkList.push(env.currentDialogue.branch.name);

        //uses the checklist to see if anything loops!
        //if anything matches the checkList, skips the block below
        if(!responseList.replies.some(listReply => {
            //if there are any loops here, it throws a 'no thank you' to this responseList
            if(!listReply.fakeEnd) {
                return checkList.includes(listReply.destination)
            }
            else return false //the current reply is a fake end and thus is fine to ignore
        })){ 
            //since nothing in the current reply loops, continue!
            responseList.replies.forEach(listReply => {
                if(foundUnread == false) {
                    /* if the reply should show...
                        AND isn't a fake end, 
                        AND it doesn't lead to the origin point (loop)
                        AND it hasn't been checked already
                    */
                    if(shouldItShow(listReply) && 
                        !listReply.fakeEnd &&
                        !examinedReplies.includes(listReply.destination)
                    ){
                        foundUnread = checkUnread(listReply, chainName, {examinedReplies, originalReply, baseChainName: originalChainName})
                    }
                }            
            });
        }
    });

    //returns what was found
    return foundUnread
}

/* dialogue string generation */
//Generates a dialogue tree based on a string
//just a nice way to write stuff instead of hand-coding JSON objects
//template is below the function
function generateDialogueObject(genString) {
	let split = genString.split('\n')
	let obj = {}
    let lastParent = { 
        // used to track depth
        // note - this gets redefined at the bottom of case 0 so it's really just for top level stuff
        blockShowControl: false, // controls SHOWIF blocks that affect multiple dialogues
        blockShowOnceControl: false, // ditto for SHOWONCE
        blockSilentControl: false, // ditto for SILENT
        blockNestControl: [] // this is like SHOWIF 2. there'd be a bunch of weird rewriting if it was an update to the base function
    }

    function parseShowif(showif) {
        let finalShowIf = showif
            .replace('SHOWIF::', '')
            .replace(/'/g, '"')// removes the showif indicator and swaps single quotes for double (required for json parse for whatever reason)
            .replace(/</g, '\\u003c') //apparently < and > throw errors if they're used unescaped in JSON... weird
            .replace(/>/g, '\\u003e')

        try {
            return upgradeShowIf(JSON.parse(`{ "reasons":${finalShowIf}}`).reasons) 
        } catch(e) {console.log(showif, finalShowIf, e)}
    }
	
	split.forEach(initialLine => {
        let line = initialLine.replace(/\s+$/, '') // remove trailing space on RIGHT SIDE only
        let tabs = (line.match(/    /g) || []).length // since left side matters for this
        var text

        //console.log(line)
        //console.log(tabs)
        switch(tabs) {
            // lv0 - branch name. if it starts with end, it's an end function
            // if it's a dialogue branch, just define the object for later and redef lastParent
            case 0: 
                //using + as crude block indentation for nicely(?) readable(?) nesting
                //just remove all +'s at the start
                if(line.startsWith('+')) while(line.charAt(0) === '+') line = line.substring(1)

                if(line == "") return;

                //block handling
                else if(line.startsWith('____')) {
                    let block = line.replace('____', '')

                    if(block.startsWith('SHOWIF')) {
                        lastParent.blockShowControl = parseShowif(block)

                    } else if(block.startsWith('NESTIF')) {
                        lastParent.blockNestControl.push(parseShowif(block.replace("NESTIF", "SHOWIF")))

                    } else if(block.startsWith('SHOWONCE')) {
                        lastParent.blockShowOnceControl = true

                    } else if(block.startsWith('SILENT')) {
                        lastParent.blockSilentControl = true

                    } else if(block == 'END') {
                        //NESTIF should be nestable inside SHOWIF
                        if(lastParent?.blockNestControl?.length > 0) {
                            lastParent.blockNestControl.pop()
                        } else  lastParent.blockShowControl = false

                        lastParent.blockShowOnceControl = false
                        lastParent.blockSilentControl = false
                    }
                }


                //special handling
                else if(line.startsWith('END::')) { //this is a function to exec at the end of the dialogue
                    obj['end'] = Function(line.replace('END::', ''))
                    lastParent = {}
                } else if(line.startsWith('SKIPTIME::')) { //defaults to 1000
                    obj['skipTime'] = Number(line.replace('SKIPTIME::', ''))
                    lastParent = {}
                } else if(line.startsWith('SKIP::')) { //like END, but fired instantly when dialogue is skipped
                    obj['skip'] = Function(line.replace('SKIP::', ''))
                    lastParent = {}
                } else if(line.startsWith('SKIPNOTICE::')) { //adds a message to the skip warning
                    obj['skipNotice'] = line.replace('SKIPNOTICE::', '')
                    lastParent = {}
                } else if(line.startsWith('RESPOBJ::')) { //this is means it's just a reusable response list object definition, not a full dialogue tree
                    obj = {responses: []}
                    lastParent = {"0": obj}
                }

                //regular dialogue handling
                else {
                    obj[line] = { name: line, body: [], responses: [] }
                    lastParent = {
                        "0": obj[line],
                        blockNestControl: []
                    }
                }
            break

            // lv1 - dialogue from an actor, or responses from an actor
            // if RESPONSES, simply mark that we're in the responses section via lastParent[1]
            // otherwise, it's an actor, so create a dialogue line object and add to lastParent[2]
            case 1:
                lastParent[1] = false 
                lastParent[2] = false // clears depth

                text = line.replace('    ', '')
                if(text == "") return
                if(text.includes("RESPONSES::")) { //actor for responses
                    let newResponses = { name: text.replace('RESPONSES::', ''), replies: [] }
                    lastParent[1] = newResponses
                    lastParent[0].responses.push(newResponses)

                } else if(text.includes("RESPOBJ::")) { //it's the name of a reusable response object, i.e. env.hello.generalReceptionistResponses
                    let respobj = text.replace('RESPOBJ::', '')
                    const localization = getLocalizationForPage(true) // force a rebuild per use of RESPOBJ - not ideal but it's the only way if you're defining things as you go
                    if(localization.dialogues) lastParent[0].responses = localization.dialogues[respobj] || env.dialogues[respobj]
                    else lastParent[0].responses = env.dialogues[respobj]

                    if(typeof lastParent[0].responses == "undefined") throw "the respobj you're trying to use doesn't exist (or hasn't been defined yet - remember these have to exist before your dialogue definition): " + respobj

                } else { //actor for dialogue
                    let newDialogue = { actor: text }
                    lastParent[1] = newDialogue
                    lastParent[0].body.push(newDialogue)
                }
            break

            // lv2 - dialogue text, OR name/destination for a response
            // if contains <+>, then response - split by that and assign relevant info to the lastParent[1]
            // otherwise, add as text to lastParent[1] - it's just dialogue text
            case 2:
                text = line.replace('        ', '')
                if(text == "") return
                if(!text.includes("<+>")) { //regular actor dialogue
                    lastParent[2] = false // clears depth

                    if(lastParent[1].text) { // if it already has text, make a new object with the same actor
                        let newDialogue = { 
                            actor: lastParent[1].actor,
                            "text": text
                        }
                        lastParent[1] = newDialogue
                        lastParent[0].body.push(newDialogue)
                    } else {
                        lastParent[1].text = text
                    }

                    try{
                        if(lastParent[1].text.includes('TEXEC::')) { //if it contains TEXEC, then that means it has a text exec - a function that returns a string to use when it appears
                            /* since this returns the first thing you give it, it should be either a oneliner or a function that executes and returns something */
                            lastParent[1].texec = Function(`return ${text.replace('TEXEC::', '')}`)
                        }
                    } catch(e) {console.log(e); console.log(lastParent, line)}
                    
                    //if there's a surrounding block control, we add the showIf condition to the dialogue object
                    //same for showonce
                    if(lastParent.blockShowControl) { lastParent[1].showIf = lastParent.blockShowControl; /*console.log(lastParent[1])*/ }
                    if(lastParent.blockShowOnceControl) { lastParent[1].showOnce = lastParent.blockShowOnceControl }
                    if(lastParent.blockSilentControl) { lastParent[1].silent = lastParent.blockSilentControl }
                    if(lastParent?.blockNestControl?.length) {
                        lastParent[1].showIf = (lastParent[1].showIf || []).concat(...lastParent.blockNestControl)
                    }
                    
                } else { //reply text and location
                    let replyInfo = text.split('<+>')
                    
                    var replyName = replyInfo[0]
                    var replyDest = replyInfo[1]
                    
                    let replyObj = {
                        name: replyName,
                        destination: replyDest
                    }

                    try{
                        if(replyName.includes('TEXEC::')) { //ditto to regular dialogue functionality
                            replyObj.texec = Function(`return ${replyName.replace('TEXEC::', '')}`)
                        }
                    } catch(e) {console.log(e); console.log(lastParent, line)}

                    lastParent[1].replies.push(replyObj)
                    lastParent[2] = replyObj
                    
                    //can be affected by block controls
                    if(lastParent.blockShowControl) { lastParent[2].showIf = lastParent.blockShowControl; /*console.log(lastParent[2])*/ }
                    if(lastParent.blockShowOnceControl) { lastParent[2].showOnce = lastParent.blockShowOnceControl }
                    if(lastParent?.blockNestControl?.length) {
                        lastParent[2].showIf = (lastParent[2].showIf || []).concat(...lastParent.blockNestControl)
                    }
                }
            break

            // lv3 - optional details like WAIT and EXEC - exec applies to both replies and dialogue lines
            // wait is only used by dialogue lines, but no harm in checking for it on reply anyway
            // uses lastParent[1] or lastParent[2] based on whether lastParent[2] is false or not (true means parent is reply)
            case 3: 
                var recipient = lastParent[1]
                if(lastParent[2]) recipient = lastParent[2]

                try {
                    text = line.replace('            ', '')
                    newReasons = false

                    if(text == "") return
                    if(text.startsWith("EXEC::")) recipient.exec = Function(line.replace('EXEC::', ''))
                    if(text.startsWith("WAIT::")) recipient.wait = line.replace('WAIT::', '') //applies only to dialogue
                    if(text.startsWith("THEN::")) recipient.then = Function(line.replace('THEN::', '')) //applies only to dialogue (js executed after a wait)
                    if(text.startsWith("AUTOADVANCE::")) recipient.autoAdvance = true //applies only to dialogue
                    if(text.startsWith("SHOWIF::")) newReasons = parseShowif(line)
                    if(text.startsWith("SHOWONCE::")) recipient.showOnce = true
                    if(text.startsWith("CLASS::")) recipient.class = text.replace('CLASS::', '') //adds specified text as classes (split by space) to the element rendered
                    if(text.startsWith("HIDEREAD::")) recipient.hideRead = true //applies only to replies
                    if(text.startsWith("UNREADCHECK::")) recipient.unreadCheck = Function(line.replace('UNREADCHECK::', '')) //applies only to replies. should return false (no unread), "within" or "unread"
                    if(text.startsWith("FAKEEND::")) recipient.fakeEnd = text.replace('FAKEEND::', '') || true //applies only to replies. takes either text to use or nothing
                    if(text.startsWith("SILENT::")) recipient.silent = true //dialogue only. will not play talk noise

                    if(recipient.showIf && newReasons) {
                        recipient.showIf = recipient.showIf.concat(newReasons)
                    } else if(newReasons) {
                        recipient.showIf = newReasons
                    }
                } catch(e) {
                    console.log("dialogue parsing error, present line is: ", line)
                    throw (e)
                }
            break
        }
    })

    //return just the responses if the object has this - means it's a respobj definition
    //also marks it as such with a special ID for use with tracking 
    if(obj.responses) {
        obj.responses.respobj = Math.random() * 1000
        return obj.responses
    }

    //otherwise, return the full obj
    else return obj
}
/* Template: (spacing is EXTREMELY important so its not indented more than it explicitly needs to be)
dialoguebranch
    actor
        dialogue
            EXEC::JS function name (should be global)
            WAIT::milliseconds
            SHOWIF::reason array ([["cookie", (true/false - can be blank to assume true)], [any number of reasons]])
        [... any number of dialogues under this list - consider this an array]
    [... any number of actor/dialogue bits - can be same actor so consider this an array]
    RESPONSES::actor
        name<+>destination
            EXEC::JS function name (should be global)
            SHOWIF::reason array ([["cookie", (true/false - can be blank to assume true)], [any number of reasons]])
        [... any number of possible responses]
    [... any number of actor response lists]
    RESPOBJ::name of response JSON in env.dialogues, it's fetched like env.dialogues["whatyouput"]
[... any number of dialogue branches under this dialogue]
END::JS function name (should be global)


ex.
hello_enter = 
start
    moth
        christ
        are you ok?
        haven't seen that before... i don't think you're supposed to connect to this one
    RESPONSES::self
        render the output<+>render
            EXEC::env.hub.renderThingy()
            SHOWIF::[["hub_introduced"]]
        bye<+>END
render
    self
        RENDERING...
            EXEC::env.hub.renderOtherThingy()
*/