/*
    cor-RU - a russian localization mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/combat_template.js


    progress: - as of 24/10/2026
*/

cor_ru['combat'] = {}

/* === HOW TO USE INFLECTION WITH COR-RU AND RUSSIAN LANGUAGE'S GENDERS AND CASES === 

------------------------->>>>>>>>> BTW IF YOU NEED TO HAVE THIS ALTERED FOR YOUR OWN LOCALIZATION BUT DUNNO HOW CONTACT ME I'D BE HAPPY TO HELP (@dutokrisa in discord)

first make sure all actors have all the needed properties

properties of an actor template:
env.COMBAT_ACTORS.youractor['cor_ru'] = {
    name: {
        gen: "genitive/родительный",
        dat: "dative/дательный", 
        acc: "accusative/винительный", 
        ins: "instrumental/творительный", 
        pre: "prepositional/предложный"
    },
    gender: either 0 (masculine), 1 (feminine), 2 (neuter), 3 (plural)
}


then write the action messages!!

inflection of names is simple: %CASE-ROLE, like %GEN-USER for user's genitive name or %DAT-TARGET for target's dative name

inflection of everything else is not simple!
you take your word and then list all endings separately in the format of %US(masc/fem/neu/plu)ER or %TAR(masc/fem/neu/plu)GET
if there is no ending in one of the inflections, put "-"

examples:
we will take the adjective "крутой" and assume that it is referring to the target
you will get "крут%TAR(ой/ая/ое/ые)GET"

we will take the verb "ударить" in past tense and assume that it is referring to the user
you will get "ударил%US(-/а/о/и)ER"

there is also inflection in effects, which use [[ORIGIN]] as their name placeholder
there you use [[CASE-ORIGIN]], like [[GEN-ORIGINS]] for origin's genitive name
inflection of other words in effects is not supported

*/

// === INFLECTION === //
cor_ru.combat['inflection'] = function (string, user, target) { // --- function for doing inflection in actionmessagestuffs. if this is ugly idc i made this at 1 am lol. also it works so i aint changing it
    if (user.cor_ru) {

        string = string.replaceAll("%GEN-USER", `<span class="${user.team.name}">${user.cor_ru.name.gen}</span>`)
        string = string.replaceAll("%DAT-USER", `<span class="${user.team.name}">${user.cor_ru.name.dat}</span>`)
        string = string.replaceAll("%ACC-USER", `<span class="${user.team.name}">${user.cor_ru.name.acc}</span>`)
        string = string.replaceAll("%INS-USER", `<span class="${user.team.name}">${user.cor_ru.name.ins}</span>`)
        string = string.replaceAll("%PRE-USER", `<span class="${user.team.name}">${user.cor_ru.name.pre}</span>`)

        const regex = new RegExp("%US", "g");
        let count = string.match(regex);

        if (count != null) {
            for (let i = 0; i < count.length; i++) {

                let stringTarget = string.substring(string.indexOf('%US(') + 4, string.indexOf(')ER'));
                let stringProcessed = "";

                let stringTargetSplit = stringTarget.split('/');

                if (stringTargetSplit.length == 4) {

                    try { stringProcessed = stringTargetSplit[user.cor_ru.gender] } catch { console.error("some shit going on with " + user.name + "'s gender - @cor-RU") };

                } else console.error("some shit going on with the stringTargetSplit - @cor-RU " + stringTargetSplit);

                if (stringProcessed == "-") stringProcessed = "";

                string = string.replace('%US(' + stringTarget + ')ER', stringProcessed)
            }
        }
    } else console.log("%coh! user either does not exist or does not have a cor_ru property... - @cor-RU", 'color:rgb(229, 142, 22)')

    if (target.cor_ru) {

        string = string.replaceAll("%GEN-TARGET", `<span class="${target.team.name}">${target.cor_ru.name.gen}</span>`)
        string = string.replaceAll("%DAT-TARGET", `<span class="${target.team.name}">${target.cor_ru.name.dat}</span>`)
        string = string.replaceAll("%ACC-TARGET", `<span class="${target.team.name}">${target.cor_ru.name.acc}</span>`)
        string = string.replaceAll("%INS-TARGET", `<span class="${target.team.name}">${target.cor_ru.name.ins}</span>`)
        string = string.replaceAll("%PRE-TARGET", `<span class="${target.team.name}">${target.cor_ru.name.pre}</span>`)

        const regex = new RegExp("%TAR", "g");
        let count = string.match(regex);

        if (count != null) {
            for (let i = 0; i < count.length; i++) {

                let stringTarget = string.substring(string.indexOf('%TAR(') + 5, string.indexOf(')GET'));
                let stringProcessed = "";

                let stringTargetSplit = stringTarget.split('/');

                if (stringTargetSplit.length == 4) {

                    try { stringProcessed = stringTargetSplit[target.cor_ru.gender] } catch { console.error("some shit going on with" + target.name + "'s gender - @cor-RU") };

                } else if (stringTargetSplit.length == 2) {

                    if (target.cor_ru.gender == 3) stringProcessed = stringTargetSplit[1];
                    else stringProcessed = stringTargetSplit[0];

                } else console.error("some shit going on with the stringTargetSplit - @cor-RU " + stringTargetSplit);

                if (stringProcessed == "-") stringProcessed = "";

                string = string.replace('%TAR(' + stringTarget + ')GET', stringProcessed)
            }
        }
    } else console.log("%coh! target either does not exist or does not have a cor_ru property... - @cor-RU", 'color:rgb(229, 142, 22)')

    return string;
}
cor_ru.combat[`enforceInflectionInMessages`] = function () { // --- invasive, yeah, but i do not think many mods actually touch these functions + we will be keeping a close eye on any alterations of the original ones... its ok. if you need specific places in which i put my code search for "// --- place where i actually insert stuff"
    processHelp = function (obj, { caps = false, specialObj = false } = {}) { // modified to allow for name inflection
        let newHelp = specialObj ? specialObj : obj.help
        if (typeof newHelp == "function") newHelp = newHelp()

        if (obj.origin) {
            newHelp = newHelp.replaceAll("[[ORIGIN]]", obj.origin.name);
            newHelp = newHelp.replaceAll("[[GEN-ORIGIN]]", `${obj.origin.cor_ru.name.gen}`)
            newHelp = newHelp.replaceAll("[[DAT-ORIGIN]]", `${obj.origin.cor_ru.name.dat}`)
            newHelp = newHelp.replaceAll("[[ACC-ORIGIN]]", `${obj.origin.cor_ru.name.acc}`)
            newHelp = newHelp.replaceAll("[[INS-ORIGIN]]", `${obj.origin.cor_ru.name.ins}`)
            newHelp = newHelp.replaceAll("[[PRE-ORIGIN]]", `${obj.origin.cor_ru.name.pre}`)
        }
        else {
            newHelp = newHelp.replaceAll("[[ORIGIN]]", "пользователь")
            newHelp = newHelp.replaceAll("[[GEN-ORIGIN]]", `пользователя`)
            newHelp = newHelp.replaceAll("[[DAT-ORIGIN]]", `пользователю`)
            newHelp = newHelp.replaceAll("[[ACC-ORIGIN]]", `пользователя`)
            newHelp = newHelp.replaceAll("[[INS-ORIGIN]]", `пользователем`)
            newHelp = newHelp.replaceAll("[[PRE-ORIGIN]]", `пользователе`)
        }

        if (caps) newHelp = newHelp.toUpperCase()
        return newHelp
    }
    actionMessage = function (origin, action, desiredTarget, hit = "none", duration = false, id = false) {
        console.warn("you should probably not be using actionMessage anymore, use the new effectMessage system instead\nthis will be removed in a future update")
        //control for optional or flexible parameters
        var actionIsString = (typeof action == "string")
        var target = desiredTarget;
        if (typeof desiredTarget == "undefined") target = origin;

        //figure out who's on what team
        var originTeam, targetTeam;
        env.rpg.teams.forEach((team, i) => {
            team.members.forEach((actor, i) => {
                if (actor.slug == origin.slug) {
                    originTeam = team.name
                } //not 'else if' because it could be self-targeted

                if (actor.slug == (target.slug || 0)) {
                    targetTeam = team.name
                }
            });
        });

        //control conditional text/formatting
        var hitType = "none"
        var hitText = false
        var modClass = ""; //used to border if there's a crit
        switch (hit) {
            case "none": break

            case true:
                hitType = "hit"
                break

            case "critbuff":
            case "crit":
                hitType = "crit"
                modClass = "use-crit"
                break

            case false:
                hitType = "miss"
        }
        if (action.usage) hitText = action.usage[hitType] || false //refer to action usage text for result

        var actionText;
        if (actionIsString) {
            actionText = processStringTranslation(action)
                .replaceAll("%USER", `<span class="${originTeam}">${origin.name}</span>`)
                .replaceAll("%TARGET", `<span class="${targetTeam}">${target.name}</span>`);
            actionText = cor_ru.combat.inflection(actionText, origin, target) // --- place where i actually insert stuff

        } else if (action.usage) {
            actionText = processStringTranslation(action.usage.act)
                .replaceAll("%USER", `<span class="${originTeam}">${origin.name}</span>`)
                .replaceAll("%TARGET", `<span class="${targetTeam}">${target.name}</span>`);
            actionText = cor_ru.combat.inflection(actionText, origin, target) // --- place where i actually insert stuff
        }

        if (hitText) {
            hitText =
                `<br><div class="hit-text">` +
                cor_ru.combat.inflection(processStringTranslation(hitText)
                    .replaceAll("%USER", `<span class="${originTeam}">${origin.name}</span>`)
                    .replaceAll("%TARGET", `<span class="${targetTeam}">${target.name}</span>`), origin, target) + // --- place where i actually insert stuff
                `</div>`
                ;
        } else {
            hitText = "";
        }

        let currentNum = messageNum++;
        env.rpg.querySelector(`#${originTeam}-team .actor`).insertAdjacentHTML('beforebegin', `<div class="use-message ${modClass}" style="z-index: ${10 + (currentNum % 9)}" id="m-${currentNum}">${actionText}${hitText}</div>`);
        let useMessage = env.rpg.querySelector(`#m-${currentNum}`)
        setTimeout(() => {
            useMessage.classList.add('active')
            var readoutMessage
            if (actionIsString) {
                readoutMessage = `<div class="action-text" definition="ANALYSIS::'UTILIZED INCOHERENT ACTION'::RESULT::'UNKNOWN'">${actionText}</div> ${hitText.replaceAll('<br>', '')}`
            } else {
                readoutMessage = `
                <div class="action-text" 
                    definition="ANALYSIS::'UTILIZED THOUGHTFORM ACTION'::'${action.name.toUpperCase()}'::RESULT::'${hit ? "SUCCESS" : "FAILED"}'"
                >
                    ${actionText}
                </div>
                
                ${hitText.replaceAll('<br>', '')} 
                
                <br>
                <div class="action-description" definition="ANALYSIS::${action.help}">COMMAND::${action.desc}</div>
            `
            }

            readoutAdd({
                message: readoutMessage,
                name: "sourceless",
                type: "sourceless combat",
                show: false,
                sfx: false
            })
        }, 100);

        setTimeout(function () {
            useMessage.classList.add('shrink');
            setTimeout(function () { useMessage.remove() }, 400);
        }, duration ? duration : env.ADVANCE_RATE * 1.5);
    }
    createRPGeffectMessage = function () {
        env.rpg.effectMessage = {
            last: false, // just for debug mainly. holds last object rather than simply deleting
            current: false, // effectMessages only exist for brief periods of time

            /* 
                to create a new object, set elements and base object
            */
            initialize: function () {
                if (this.current || env.currentDialogue.active || env.rpg.stopMessages) return;
                if (this.last && this.last.display) this.closeAnim(this.last.display)
                this.current = {

                    //list of all actions and sub-actions used
                    //you might think we'd tie combat hits etc directly to the action that caused them, but the system doesn't have support for that yet
                    //we gotta rewrite actions and stuff for that
                    actions: [/* 
                    {
                        origin: {actor},
                        actionText: "", // i.e. the very first "Akizet stabs X",
                        hits: [
                            {
                                target: {actor},
                                text: "", // i.e. the subtext, "X bleed sludgy corru"
                                result: "hit/crit/miss/etc"
                            }
                            //separate action uses can point to the same ID and stack hit text/targets/etc. so we have like "x was hit by bomb", "y was hit by shrapnel", "z evaded shrapnel" as subtext
                        ],
                    }
                */],

                    //list of all actors affected by these actions
                    affected: {/*
                    container0: {
                        initial: {
                            hp: 10
                            bp: 2,
                            dead: false,
                            statuses: {
                                regen: 2
                            }
                        },
                        
                        end: {
                            hp: 2,
                            bp: 0,
                            dead: false, // (could be different to say 'downed this round' or vice versa for 'rezzed this round')
                            statuses: {
                                puncture: 6
                            }
                        }
                    }
                */}
                }

                //initialize the HTML element
                const effectMessageElement = document.createElement('div')
                effectMessageElement.classList.add('effect-message')
                effectMessageElement.innerHTML = `
                <div class="message-actions"></div>
                <div class="message-affected"></div>
            `
                env.rpg.appendChild(effectMessageElement)
                this.current.display = effectMessageElement
                this.current.display.actions = effectMessageElement.querySelector(".message-actions")
                this.current.display.affected = effectMessageElement.querySelector(".message-affected")
            },

            /* 
                to handle adding/updating action results. 
                Calls initialize if there is no current effectMessages object.
                action can also be a solo-passed string, which makes it be an arbitrary addition to the action text basically
                    i.e. env.rpg.effectMessage.action({action: "hi"})
            */
            action: function ({ user, action, target, hit, specialHitText, actionMessageIndex, reason, showFullDetail = false, isMinor = false, force = false, initialize = true, icon = false, status = false, combineLikeAction = false }) {
                if (env.rpg.stopMessages || !this.current && !initialize || env.currentDialogue.active) return -1 // we require this to be .initialize()d first, done in useAction
                else if (initialize && !env.rpg.effectMessage.current) this.initialize()

                let current = this.current

                //control conditional text/formatting
                let hitType = "none"
                let hitText = false

                switch (hit) {
                    case "none": break

                    case "critbuff":
                    case "crit":
                        hitType = "crit"
                        break

                    case true:
                        hitType = "hit"
                        break

                    case false:
                        hitType = "miss"
                }

                let genUsageText = typeof action == "string" ? action : action?.usage?.act
                if (!genUsageText) return false;
                if (action.usage) {
                    hitText = action.usage[hitType] || false //refer to action usage text for result 
                }

                if (force && !hitText && typeof action == "string") hitText = action

                let actionText = (genUsageText)
                    .replaceAll("%USER", `<span class="${user?.team?.name}">${user?.name}</span>`)
                    .replaceAll("%TARGET", `<span class="${target?.team?.name}">${target?.name}</span>`)
                actionText = cor_ru.combat.inflection(actionText, origin, target) // --- place where i actually insert stuff

                if (hitText || specialHitText) {
                    hitText = (hitText || specialHitText)
                        .replaceAll("%USER", `<span class="${user?.team?.name}">${user?.name}</span>`)
                        .replaceAll("%TARGET", `<span class="${target?.team?.name}">${target?.name}</span>`)
                    hitText = cor_ru.combat.inflection(hitText, origin, target) // --- place where i actually insert stuff
                }

                //console.log("!!!!!!!!!!!! in add for action", hit, hitType, action, hitText, actionMessageIndex)
                //the hit object - actionText is used as the "primary" text, so not used for subtext
                let hitObj = {
                    target,
                    text: hitText,
                    result: hitType,
                    action,
                    count: 1
                }

                //determine if it's for an existing thing then push it
                let finalIndex = 0
                let effectiveIndex = actionMessageIndex
                if (typeof actionMessageIndex == "object") effectiveIndex = actionMessageIndex?.i // cause we might just pass the action hit return which has the i

                if (typeof effectiveIndex == "undefined") {
                    // figure out if there's an identical action in the list
                    // it's way more efficient to just pass the index though so this is a fallback

                    // combineLikeAction means "combine if the action string is the same"
                    if (combineLikeAction) effectiveIndex = env.rpg.effectMessage.current.actions.findIndex(actionEntry => (actionEntry.action == action))

                    // otherwise match by both user and reason
                    else effectiveIndex = env.rpg.effectMessage.current.actions.findIndex(action => (action.user == user) && ((!reason && !action.reason) || (action.reason == reason)))
                    if (effectiveIndex == -1) effectiveIndex = false
                }

                console.log("entering with effectiveindex", effectiveIndex)

                if (current.actions[effectiveIndex]) { //exists, so adding to this
                    let currentAction = current.actions[effectiveIndex]
                    if (!hitText && !force) { console.log(`no hit text so returning`, hitObj); return -1 }; // no text = no action for subtext
                    finalIndex = effectiveIndex

                    //find if there's an identical message for this hit, and if so, increase the 'count'
                    let similarHit = current.actions[finalIndex].hits.find(h =>
                        h.action == action &&
                        h.target == target &&
                        h.result == hitObj.result &&
                        h.text == hitObj.text
                    )

                    if (similarHit) {
                        similarHit.count++
                    } else {
                        current.actions[finalIndex].hits.push(hitObj)

                        //crit, hit, miss, in order of 'best hit' priority
                        if (currentAction.bestHit != hitType) {
                            if (
                                (hitType == "hit" && currentAction.bestHit == "miss") ||
                                (hitType == "crit" && currentAction.bestHit != "crit")
                            ) currentAction.bestHit = hitType
                        }
                    }

                    if (showFullDetail) current.actions[finalIndex].showFullDetail = true


                } else { //doesn't, so creating
                    current.incitingActor = user

                    let actionUse = { user, action, actionText, isMinor, reason, status, icon, bestHit: hitType, hits: hitObj.text ? [hitObj] : [], showFullDetail: showFullDetail }
                    console.log(actionUse)

                    if (current.actions.length == 0) {
                        current.display.setAttribute("type", hitType)
                        current.display.setAttribute("team", user?.team?.name)
                    }

                    if (current.actions.length && current?.actions[0]?.isMinor) { //avoid highlighting "minor actions", i.e. async that happen before others
                        //shouldn't happen super often, so probably won't end up scrambling expected indexes
                        current.actions.unshift(actionUse)
                        finalIndex = 0
                    } else {
                        current.actions.push(actionUse)
                        finalIndex = current.actions.length - 1
                    }
                }

                //rerender
                this.updateDisplay({ actionIndex: finalIndex })

                //return the action index
                return finalIndex
            },

            /* 
                to handle adding affected actors and tracking changes
            */
            affect: function ({ target, initializeOnly }) {
                if (env.rpg.stopMessages || !this.current || (initializeOnly && this.current.affected[target.slug]) || env.currentDialogue.active) return;

                let summary = {
                    hp: target.hp,
                    bp: target.bp,
                    dead: (target.hp <= 0) && target.state != "lastStand",
                    statuses: target.statusEffects.reduce((obj, status) => { obj[status.slug] = status.duration; return obj }, {})
                }

                if (!this.current.affected[target.slug]) { //create the actor
                    this.current.affected[target.slug] = {
                        actor: target,
                        initial: summary,
                        end: summary
                    }
                } else { //this is an update
                    this.current.affected[target.slug].end = summary
                }

                // re-render display
                this.updateDisplay({ affectedSlug: target.slug })
            },

            //either takes specific things to update, or regenerates/initializes as a whole
            //this function handles the animation too
            updateDisplay: function ({ affectedSlug, actionIndex }) {
                if (env.rpg.stopMessages || this?.current?.actions[0]?.isMinor) return;

                //console.log("!!!!!!!! updating", affectedSlug, actionIndex)
                //check to see if we're just updating a little bit
                //or inserting specifically
                const subject = affectedSlug || actionIndex
                if (subject) { // we can mix reliably because affected is always a slug (text#), and actionIndex is always number
                    let groupEl = affectedSlug ? this.current.display.affected : this.current.display.actions
                    let element = groupEl.querySelector(`#ms-${subject}`)
                    let result = affectedSlug ? this.getAffectedHTML(subject, element) : this.getActionHTML(subject, element)

                    if (actionIndex && element) { // update hit count if needed
                        let subjectAction = this.current.actions[actionIndex]
                        let totalHits = subjectAction.hits.reduce((sum, hit) => sum + hit.count, 0)
                        if (totalHits > 1) element.setAttribute("totalhits", totalHits)
                    }

                    //for whatever reason, the changes rendered are no longer needed. i.e. healing back damage taken within time of message
                    if (!result && element) return element.remove()

                    if (result && element) {
                        element.innerHTML = result
                        //if besthit, this is an action
                        if (element.getAttribute("besthit")) element.setAttribute("besthit", this.current.actions[subject].bestHit)
                    } else if (result) {
                        groupEl.insertAdjacentHTML('beforeend', result)
                        element = groupEl.querySelector(`#ms-${subject}`)
                    }

                    if (element && !affectedSlug) { // we only animate action effects, affected only show in readout log after close
                        element.classList.add('shake-crazy-anim-once')
                        setTimeout(() => element.classList.remove('shake-crazy-anim-once'), 300)
                    }

                    //full regenerate from scratch
                } else {
                    console.log("full regen")
                    let affectedHTML = ''
                    let actionHTML = ''

                    //gen HTML
                    for (const affected in this.current.affected) affectedHTML += this.getAffectedHTML(affected);
                    this.current.actions.forEach((effectAction, i) => actionHTML += this.getActionHTML(i));

                    //set, easy
                    this.current.display.affected.innerHTML = affectedHTML
                    this.current.display.actions.innerHTML = actionHTML
                }
            },


            /* 
                these both return HTML for use in above
            */
            getAffectedHTML: function (affectedSlug, onlyInner) {
                /* object reference: 
                    container0: {
                        initial: {
                            hp: 10
                            bp: 2,
                            dead: false,
                            statuses: {
                                regen: 2
                            }
                        },
                        
                        end: {
                            hp: 2,
                            bp: 0,
                            dead: false, // (could be different to say 'downed this round' or vice versa for 'rezzed this round')
                            statuses: {
                                puncture: 6
                            }
                        }
                   }
                */
                const subject = this.current.affected[affectedSlug]
                const initial = subject.initial
                const end = subject.end
                const knownStatuses = new Set()

                // Collect all the status names from initial and end
                for (const statusName in initial.statuses) knownStatuses.add(statusName);
                for (const statusName in end.statuses) knownStatuses.add(statusName);

                let statChanges = ''
                let statusChanges = ''

                // Check if the actor is dead
                if (end.dead) {
                    statChanges += "<span class='stat down bad'>+DOWN</span>"
                } else {
                    if (initial.dead && !end.dead) statChanges += "<span class='stat down good'>-DOWN</span>"
                    if (initial.hp !== end.hp) statChanges += `<span class='stat core hp'><span class="stat-amt">${end.hp - initial.hp}</span><span class="${end.hp < initial.hp ? 'bad' : 'good'}">HP</span></span>`
                    if (initial.bp !== end.bp) statChanges += `<span class='stat core bp'><span class="stat-amt">${end.bp - initial.bp}</span><span class="${end.bp < initial.bp ? 'bad' : 'good'}">BP</span></span>`

                    for (const statusName of knownStatuses) {
                        let status = env.STATUS_EFFECTS[statusName]
                        if (initial.statuses[statusName] !== end.statuses[statusName]) {
                            let changeValue = (end.statuses[statusName] || 0) - (initial.statuses[statusName] || 0)
                            let changeMod = changeValue > 0 ? `+` : `-`

                            let goodnessClass
                            if (status.beneficial) goodnessClass = changeValue > 0 ? 'good' : 'bad'
                            else goodnessClass = changeValue > 0 ? 'bad' : 'good'

                            statusChanges += `<span class='stat status status-${statusName}'>
                            ${changeValue > 0 ? changeMod : ""}${!(status.infinite || status.passive) ? `${changeValue}T:` : changeValue < 0 ? "-" : ""}<span class="${goodnessClass}" definition="STATUS++${statusName}">${status.name}</span>
                        </span>`
                        }
                    }
                }

                //console.log("!!!!!!!! checking rerender affect results", statChanges, statusChanges)
                if (!statChanges && !statusChanges) return '' // if empty like this, should be removed

                let summaryHTML = `
                ${onlyInner ? '' : `<div class="affected" id="ms-${affectedSlug}" team="${subject.actor.team.name}">`}
                    <div class="affected-name ${subject.actor.team.name}">${subject.actor.name}</div>
                    ${statChanges ? `<div class="affected-stats">${statChanges}</div>` : ''}
                    ${statusChanges ? `<div class="affected-statuses">${statusChanges}</div>` : ''}
                ${onlyInner ? '' : '</div>'}`
                return summaryHTML
            },

            getActionHTML: function (actionIndex, onlyInner) {
                /* object reference:
                    {
                        origin: {actor},
                        actionText: "", // i.e. the very first "Akizet stabs X",
                        hits: [
                            {
                                target: {actor},
                                text: "", // i.e. the subtext, "X bleed sludgy corru"
                                result: "hit/crit/miss/etc"
                            }
                            //separate action uses can point to the same ID and stack hit text/targets/etc. so we have like "x was hit by bomb", "y was hit by shrapnel", "z evaded shrapnel" as subtext
                        ],
                    }
                */
                let subjectAction = this.current.actions[actionIndex]
                let actionHTML

                //the first action is a little more split up than subsequent/reaction actions, to have big text but also preserve readability
                //"reason" doesn't matter for the first hit
                if (actionIndex == 0) {
                    actionHTML = `
                    ${onlyInner ? '' : `<div id="ms-${actionIndex}">`}
                        <!-- first action hit -->
                        <div class="action" besthit="${subjectAction.bestHit}">
                            <div class="action-main" ${subjectAction.action?.details || subjectAction.action?.help ? `definition="ACTION++${subjectAction.action.slug}"` : ``}>${subjectAction.actionText}</div>
                            ${subjectAction.hits.length ? (subjectAction.hits[0].text != subjectAction.actionText ?
                            `<div class="action-hits">
                                <div class="action-hit ${subjectAction.hits[0].result}">${subjectAction.hits[0].text}<span class="action-hit-count" count=${subjectAction.hits[0].count}>${subjectAction.hits[0].count}</span></div>
                            </div>` : '') : ''
                        }
                        </div>

                        ${subjectAction.hits.length > 1 ?
                            `<!-- subsequent first-action-hits if necessary -->
                        <div class="action action-extra subaction ${subjectAction.reason ? "action-async" : ""}" besthit="${subjectAction.bestHit}" ${subjectAction.reason ? `reason="${subjectAction.reason}"` : ""}>
                            <div class="action-hits">
                                ${subjectAction.hits.map((hit, i) => i != 0 ? `<div class="action-hit ${hit.result}">${hit.text}<span class="action-hit-count" count=${hit.count}>${hit.count}</span></div>` : '').join('')}
                            </div>
                        </div>` : ''
                        }
                    ${onlyInner ? '' : '</div>'}`
                } else {
                    //sub (or subsequent) actions are things like impulses or attack drone. primarily "reason" origin
                    // important ones are divs, less important ones are spans
                    // this only matters for the purposes of :last-of-type styling
                    important = subjectAction.showFullDetail
                    let isFirstMinimizable = !important && this.current.actions.slice(0, actionIndex).every(a => !a.showFullDetail)
                    let icon = subjectAction.status ? (subjectAction.status.icon || `/img/sprites/combat/statuses/${subjectAction.status.slug}.gif`) : subjectAction.icon
                    let definition = false
                    if (subjectAction.status) definition = `STATUS++${subjectAction.status.slug}`
                    else if (subjectAction.action?.details || subjectAction.action?.help) definition = `ACTION++${subjectAction.action.slug}`

                    //if it's an action, we have the definition around the whole main reason.
                    //if it's a status, we only have it around the reason text, so it can get the status def underline
                    actionHTML = `${onlyInner ? '' : `<${important ? 'div' : 'span'} class="action subaction ${subjectAction.reason ? "action-async" : ""} ${important ? `important` : "minimizable"} ${isFirstMinimizable ? "first-minimizable" : ""} ${subjectAction.reason ? `hasreason` : 'noreason'} " besthit="${subjectAction.bestHit}" id="ms-${actionIndex}" ${subjectAction.reason ? `reason="${subjectAction.reason}"` : ""}>`}
                        <div class="action-main" ${definition && !subjectAction.status ? `definition="${definition}"` : ''}>${subjectAction.reason ? `<span class="action-reason ${icon ? `reason-icon ${subjectAction?.status ? (subjectAction?.status?.beneficial ? (subjectAction.status.beneficial == "complex" ? "neutral-color" : "friend-color") : "obesk-color") : "neutral-color"}` : "neutral-color"}" ${icon ? `style="--icon: url(${icon})"` : ''} ${definition && subjectAction.status ? `definition="${definition}"` : ''}>${subjectAction.reason.toUpperCase()}</span>` : ''}<span class="action-text">${subjectAction.actionText}</span></div>
                        <div class="action-hits">
                            ${subjectAction.hits.map(hit => `<div class="action-hit ${hit.result}">${hit.text}<span class="action-hit-count" count=${hit.count}>${hit.count}</span></div>`).join('')}
                        </div>
                    ${onlyInner ? '' : `</${important ? 'div' : 'span'}>`}`

                    console.log("made action html", actionHTML)
                }

                return actionHTML
            },

            /* 
                Logs the final message effect, then deletes effectMessage object.
            */
            close: function () {
                if (!this.current) return;
                //console.log("!!!!!!!! closing out")
                let currentDisplay = this.current.display

                clearInterval(this.current.interval)
                readoutAdd({
                    message: currentDisplay.outerHTML,
                    actor: "combat",
                    show: false,
                    sfx: false
                })

                //delete current object
                currentDisplay.classList.add("fading")
                env.setTimeout(() => this.closeAnim(currentDisplay), 4000)
                this.last = this.current
                delete this.current
            },

            /* to be called earlier if needed*/
            closeAnim: function (display) {
                if (!display || !display.parentElement) return;
                display.classList.add('animate-out')
                env.setTimeout(() => display.remove(), 600)
            }
        }
    }
}

// === ACTIONS === //
cor_ru.combat['redefineActions'] = function () {
    /* - win - */

    env.ACTIONS.win.name = `Win`;
    env.ACTIONS.win.desc = `'just win'`;

    env.ACTIONS.win.usage.act = `%USER WINS LOL`;


    /* - nothing - */

    env.ACTIONS.nothing.name = `Nothing`;
    env.ACTIONS.nothing.desc = `'just nothing'`;

    env.ACTIONS.nothing.usage.act = `%USER IS IDLE`;


    /* - cower - */

    env.ACTIONS.cower.name = `Endure`;

    env.ACTIONS.cower.usage.act = `%USER PUSHES THROUGH THE HORROR`;

    env.ACTIONS.cower.details.onUse = `'remove [STATUS::fear]'`;
    env.ACTIONS.cower.details.flavor = `'focus on what matters'`;


    /* - truly_nothing - */

    env.ACTIONS.truly_nothing.name = `Nothing`;
    env.ACTIONS.truly_nothing.desc = `'just nothing'`;


    /* - evade - */

    env.ACTIONS.evade.name = `Focus`;

    env.ACTIONS.evade.usage.act = `%USER LOOKS FOR AN OPENING`;

    env.ACTIONS.evade.details.onUse = () => `'[STATUS::focused] [STATUS::evasion]'`;
    env.ACTIONS.evade.details.flavor = `'deliberate on the moment';'prepare a great dodge or strike'`;


    /* - skitter - */

    env.ACTIONS.skitter.name = `Skitter`;

    env.ACTIONS.skitter.usage.act = `%USER SKITTERS WILDLY AROUND THE ROOM`;

    env.ACTIONS.skitter.details.onUse = () => `'gain [STATUS::evasion]'`;
    env.ACTIONS.skitter.details.flavor = `'focus on evading incoming attacks';'hide vulnerabilities'`;


    /* - malfunction - */

    env.ACTIONS.malfunction.name = `Malfunction`;
    env.ACTIONS.malfunction.desc = `'suffer from internal deterioration'`;

    env.ACTIONS.malfunction.usage.act = `%USER'S SKIN WRITHES`;


    /* - attack - */

    env.ACTIONS.attack.name = `Attack`;

    env.ACTIONS.attack.usage.act = `%USER ATTACKS %TARGET`;
    env.ACTIONS.attack.usage.crit = `A FRIGHTENING BLOW`;
    env.ACTIONS.attack.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.attack.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.attack.details.flavor = `'improvise'`;
    env.ACTIONS.attack.details.onHit = `'[STAT::amt]'`;


    /* - akizet_attack - */

    env.ACTIONS.akizet_attack.name = `Overwhelm`;

    env.ACTIONS.akizet_attack.usage.act = `%USER CHARGES %TARGET`;
    env.ACTIONS.akizet_attack.usage.crit = `%TARGET IS LEFT REELING`;
    env.ACTIONS.akizet_attack.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.akizet_attack.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.akizet_attack.details.onHit = `'boldly assault for [STAT::amt]'`;
    env.ACTIONS.akizet_attack.details.onCrit = `'inflict immense physical trauma';'[STATUS::stun]'`;


    /* - eviscerate - */

    env.ACTIONS.eviscerate.name = `Overwhelm`;

    env.ACTIONS.eviscerate.usage.act = `%USER CLAWS AT %TARGET`;
    env.ACTIONS.eviscerate.usage.crit = `%TARGET IS TORN APART`;
    env.ACTIONS.eviscerate.usage.hit = `%TARGET IS RENDED`;
    env.ACTIONS.eviscerate.usage.miss = `%TARGET RECOILS`;

    env.ACTIONS.eviscerate.details.flavor = `'boldly assault target';'exploit wounds'`;
    env.ACTIONS.eviscerate.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.eviscerate.details.onCrit = `'[STATUS::stun]'`;
    env.ACTIONS.eviscerate.details.conditional = `<o-col>EVISCERATE::</o-col>'removes <n-col class="shiftdetail">up to 5T:</n-col>[STATUS::puncture] for additional damage<n-col class="shiftdetail"> ([STAT::amt] per T)</n-col>'`;


    /* - stab - */

    env.ACTIONS.stab.name = `Stab`;

    env.ACTIONS.stab.usage.act = `%USER STABS %TARGET`;
    env.ACTIONS.stab.usage.crit = `%TARGET IS EVISCERATED`;
    env.ACTIONS.stab.usage.hit = `%TARGET BLEEDS SLUDGY CORRU`;
    env.ACTIONS.stab.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.stab.details.flavor = `'reshape arm into sharpened tendril';'stab target'`;
    env.ACTIONS.stab.details.onHit = `'[STAT::amt] [STATUS::puncture]'`;
    env.ACTIONS.stab.details.onCrit = () => `'puncture vital cystic component for [STATUS::puncture]'${env?.rpg?.is2D ? ";'[STAT::kb]'" : ''}`;


    /* - frenzy - */

    env.ACTIONS.frenzy.name = `Frenzy`;

    env.ACTIONS.frenzy.usage.act = `%USER STABS %TARGET`;
    env.ACTIONS.frenzy.usage.crit = `%USER JUST KEEPS GOING`;
    env.ACTIONS.frenzy.usage.hit = `%TARGET BLEEDS SLUDGY CORRU`;
    env.ACTIONS.frenzy.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.frenzy.details.flavor = `'puncture vital component';'may inspire additional stabbing'`;
    env.ACTIONS.frenzy.details.onHit = `'[STAT::amt] [STATUS::puncture]'`;
    env.ACTIONS.frenzy.details.onCrit = `'reuse this action less accurately<n-col class="shiftdetail"> (-15% ACC & CRIT)</n-col>'`;


    /* - gakvu_attack - */

    env.ACTIONS.gakvu_attack.name = `Scramble`;

    env.ACTIONS.gakvu_attack.usage.act = `%USER REACHES TOWARDS %TARGET`;
    env.ACTIONS.gakvu_attack.usage.crit = `%TARGET'S COMPONENTS ARE EXPOSED`;
    env.ACTIONS.gakvu_attack.usage.hit = `%TARGET'S FLESH MELTS AWAY`;
    env.ACTIONS.gakvu_attack.usage.miss = `%TARGET RESISTS CONTROL`;

    env.ACTIONS.gakvu_attack.details.flavor = `'melt corrucystic flesh';'grasp and exploit weakness'`;
    env.ACTIONS.gakvu_attack.details.onUse = () => env?.rpg?.is2D ? `'HIT up to 4 distant targets'` : false;
    env.ACTIONS.gakvu_attack.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.gakvu_attack.details.onCrit = `'[STATUS::vulnerable]'`;
    env.ACTIONS.gakvu_attack.details.conditional = () => `<o-col>SCRAMBLE::</o-col>'[STATUS::stun] on <n-col>CRIT</n-col> against [STATUS::destabilized] target'${env?.rpg?.is2D ? `\n<o-col>RESONATE::</o-col>'[STAT::wideHP] to large area if main target is [STATUS::destabilized]'` : ''}`;


    /* - countercall - */

    env.ACTIONS.countercall.name = `Countercall`;

    env.ACTIONS.countercall.usage.act = `%USER REACHES TOWARDS %TARGET`;
    env.ACTIONS.countercall.usage.crit = `%TARGET FALLS APART`;
    env.ACTIONS.countercall.usage.hit = `%TARGET'S FLESH MELTS AWAY`;
    env.ACTIONS.countercall.usage.miss = `%TARGET RESISTS CONTROL`;

    env.ACTIONS.countercall.details.flavor = `'direct destructive signal'`;
    env.ACTIONS.countercall.details.onHit = `'[STAT::amt] [STATUS::vulnerable]'`;
    env.ACTIONS.countercall.details.conditional = `<em>VS DESTABILIZED::</em>'additional [STAT::amt]';'+[STAT::critBonus]CRIT';'[STATUS::stun] on CRIT'`;


    /* - destabilize - */

    env.ACTIONS.destabilize.name = `destabilize`;

    env.ACTIONS.destabilize.usage.act = `%USER DESTABILIZES %TARGET`;
    env.ACTIONS.destabilize.usage.crit = `%TARGET RIPPLES UNNATURALLY`;
    env.ACTIONS.destabilize.usage.hit = `%TARGET'S FORM WAVERS`;
    env.ACTIONS.destabilize.usage.miss = `%TARGET REMAINS STABLE`;

    env.ACTIONS.destabilize.details.flavor = `'utilize illegal groundsmindry';'alter structure of target'`;
    env.ACTIONS.destabilize.details.onHit = `'[STATUS::destabilized]'`;
    env.ACTIONS.destabilize.details.onCrit = `'grant powerful random effect<n-col class="shiftdetail"> for duration of [STATUS::destabilizedRef], dependent on team</n-col>'`;
    env.ACTIONS.destabilize.details.conditional = `<em>SEIZE::</em>'always <n-col>CRIT</n-col> if target is not [STATUS::destabilizedRef]'`;


    /* - tozik_attack - */

    env.ACTIONS.tozik_attack.name = `Corruskivi`;

    env.ACTIONS.tozik_attack.usage.act = `%USER CLAWS AT %TARGET`;
    env.ACTIONS.tozik_attack.usage.crit = `%TARGET'S LIFE IS DRAINED AWAY`;
    env.ACTIONS.tozik_attack.usage.hit = `%TARGET IS SLASHED`;
    env.ACTIONS.tozik_attack.usage.miss = `%TARGET DODGES`;

    env.ACTIONS.tozik_attack.details.flavor = `'attack with repair tool';'siphon vital corru'`;
    env.ACTIONS.tozik_attack.details.onUse = () => env?.rpg?.is2D ? `'HIT up to 3 targets nearby';'ignores allies'` : false;
    env.ACTIONS.tozik_attack.details.onHit = (actor) => `'[STAT::amt]'`;
    env.ACTIONS.tozik_attack.details.onCrit = (actor) => `'heal allies for [STAT::healHP] [STATUS::regen]'`;
    env.ACTIONS.tozik_attack.details.conditional = (actor) => `${page.party.crittamode ? `<f-col>TRANSFER::</f-col>'on hit, transfer up to 5T of random negative statuses'\n` : ``}<o-col>VS ${hasStatus(actor, 'ichor_bio') ? '[STATUS::rot]' : '[STATUS::siphon]'}::</o-col>'double <n-col class='shiftdetail'>base </n-col> damage';'[STATUS::inflictSiphon]';'spread<n-col class="shiftdetail"> [STATUS::inflictSiphon]</n-col> to random foe'`;


    /* - parasite - */

    env.ACTIONS.parasite.name = `Parasite`;
    env.ACTIONS.parasite.verb = `parasitize`;

    env.ACTIONS.parasite.usage.act = `%USER GRASPS AT %TARGET`;
    env.ACTIONS.parasite.usage.crit = `%TARGET'S TEAM IS INFESTED`;
    env.ACTIONS.parasite.usage.hit = `%TARGET IS INFESTED`;
    env.ACTIONS.parasite.usage.miss = `%TARGET DODGES`;

    env.ACTIONS.parasite.details.flavor = `'utilize modified repair tool';'tap vital corru of foes to sustain allies'`;
    env.ACTIONS.parasite.details.onHit = () => "'[STAT::amt] [STATUS::siphon]'";
    env.ACTIONS.parasite.details.onCrit = () => "'infest opposing team with [STATUS::siphon]'";


    /* - parasite_item - */

    env.ACTIONS.parasite_item.name = `Vecrivi`;
    env.ACTIONS.parasite_item.verb = `stab`;

    env.ACTIONS.parasite_item.usage.act = `%USER GRASPS AT %TARGET`;
    env.ACTIONS.parasite_item.usage.crit = `%TARGET'S TEAM IS INFESTED`;
    env.ACTIONS.parasite_item.usage.hit = `%TARGET IS INFESTED`;
    env.ACTIONS.parasite_item.usage.miss = `%TARGET DODGES`;

    env.ACTIONS.parasite_item.details.flavor = `'utilize modified repair tool';'tap vital corru of foes to sustain allies'`;
    env.ACTIONS.parasite_item.details.onHit = () => "'[STAT::amt] [STATUS::siphon]';'follow up with primary (1st) action'";
    env.ACTIONS.parasite_item.details.onCrit = () => env?.rpg?.is2D ? `'infest nearby foes with [STATUS::siphon]'` : `'infest opposing team with [STATUS::siphon]'`;
    env.ACTIONS.parasite_item.details.conditional = (actor) => actor?.vecriviCount ? `<em>USES REMAINING::</em>${actor.vecriviCount}` : false;


    /* - mend - */

    env.ACTIONS.mend.name = `Quick Mend`;

    env.ACTIONS.mend.usage.act = `%USER FIXES UP %TARGET`;
    env.ACTIONS.mend.usage.crit = `%TARGET FEELS WAY BETTER`;
    env.ACTIONS.mend.usage.hit = `%TARGET FEELS BETTER`;
    env.ACTIONS.mend.usage.miss = `%TARGET IS TOO SLIPPERY`;

    env.ACTIONS.mend.details.onHit = `'[STAT::amt] [STATUS::regen]'`;


    /* - newmend - */

    env.ACTIONS.newmend.name = `Vital Tap`;

    env.ACTIONS.newmend.usage.act = `%USER GRASPS %TARGET`;
    env.ACTIONS.newmend.usage.crit = `%TARGET FEELS WAY BETTER`;
    env.ACTIONS.newmend.usage.hit = `%TARGET IS ALTERED`;
    env.ACTIONS.newmend.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.newmend.details.flavor = `'utilize repair tool to extract or apply critical resources'`;
    env.ACTIONS.newmend.details.conditional = (actor) => `<em>VS FOE::</em>'[STATUS::${hasStatus(actor, "ichor_bio") ? "rot" : "siphon"}]'\n<em>VS ALLY::</em>'[STAT::amt] [STATUS::regen] [STATUS::focused]'`;


    /* - newmend_mega - */

    env.ACTIONS.newmend_mega.name = `Vital Tap+`;

    env.ACTIONS.newmend_mega.usage.act = `%USER GRASPS %TARGET`;
    env.ACTIONS.newmend_mega.usage.crit = `%TARGET FEELS WAY BETTER`;
    env.ACTIONS.newmend_mega.usage.hit = `%TARGET IS ALTERED`;
    env.ACTIONS.newmend_mega.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.newmend_mega.details.flavor = `'utilize repair tool to extract or apply critical resources'`;
    env.ACTIONS.newmend_mega.details.conditional = (actor) => env.ACTIONS.newmend.details.conditional(actor);


    /* - optimize - */

    env.ACTIONS.optimize.name = `Optimize`;

    env.ACTIONS.optimize.usage.act = `%USER FIXES UP %TARGET`;
    env.ACTIONS.optimize.usage.crit = `%TARGET HAS A BURST OF ENERGY`;
    env.ACTIONS.optimize.usage.hit = `%TARGET IS READY TO FIGHT`;
    env.ACTIONS.optimize.usage.miss = `%TARGET IS TOO SLIPPERY`;

    env.ACTIONS.optimize.details.onHit = () => "'[STAT::amt] [STATUS::regen] [STATUS::surge]'";
    env.ACTIONS.optimize.details.flavor = `'utilize ukuzu restorative';'reduced mending effect';'enhance energy'`;


    /* - miltza_attack - */

    env.ACTIONS.miltza_attack.name = `Advantage`;

    env.ACTIONS.miltza_attack.usage.act = `%USER claws at %TARGET`;
    env.ACTIONS.miltza_attack.usage.crit = `A FRIGHTENING BLOW`;
    env.ACTIONS.miltza_attack.usage.hit = `%TARGET is struck`;
    env.ACTIONS.miltza_attack.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.miltza_attack.details.flavor = `'a three-armed assault';'carefully planned'`;
    env.ACTIONS.miltza_attack.details.onUse = () => `'reuse this action twice on random vulnerable foes${env?.rpg?.is2D ? ' in range' : ''}'`;
    env.ACTIONS.miltza_attack.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.miltza_attack.details.onCrit = `'[STATUS::vulnerable]'`;
    env.ACTIONS.miltza_attack.details.conditional = () => env?.rpg?.is2D ? `<em>ADVANTAGE::</em>'[STATUS::evasion] to nearby allies if all 3 hits are successful'` : `<em>ADVANTAGE::</em>'[STATUS::evasion] to team if all <n-col class="shiftdetail">(targetable and alive)</n-col> foes are [STATUS::vulnerableRef]'`;


    /* - miltza_attack_evil - */

    env.ACTIONS.miltza_attack_evil.name = `Advantage`;

    env.ACTIONS.miltza_attack_evil.usage.act = `%USER claws at %TARGET`;
    env.ACTIONS.miltza_attack_evil.usage.crit = `A FRIGHTENING BLOW`;
    env.ACTIONS.miltza_attack_evil.usage.hit = `%TARGET is struck`;
    env.ACTIONS.miltza_attack_evil.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.miltza_attack_evil.details.flavor = `'a three-armed assault';'carefully planned'`;
    env.ACTIONS.miltza_attack_evil.details.onUse = () => `'reuse this action twice on random vulnerable foes${env?.rpg?.is2D ? ' in range' : ''}'`;
    env.ACTIONS.miltza_attack_evil.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.miltza_attack_evil.details.onCrit = `'[STATUS::vulnerable]'`;
    env.ACTIONS.miltza_attack_evil.details.conditional = () => env?.rpg?.is2D ? `<em>SPECIAL::</em>'grant [STATUS::evasion] to nearby allies if all 3 hits are successful'` : `<em>SPECIAL::</em>'grant [STATUS::evasion] to team if all <n-col class="shiftdetail">(targetable and alive)</n-col> foes are [STATUS::vulnerableRef] on use'`;


    /* - direction - */

    env.ACTIONS.direction.name = `Direction`;
    env.ACTIONS.direction.verb = `direct upon`;

    env.ACTIONS.direction.usage.act = `%USER FOCUSES ON %TARGET`;
    env.ACTIONS.direction.usage.crit = `%USER HAS THE PERFECT PLAN`;
    env.ACTIONS.direction.usage.hit = `%USER SHARES INSIGHT`;
    env.ACTIONS.direction.usage.miss = `%TARGET DODGES`;

    env.ACTIONS.direction.details.flavor = `'coordinate attack or defense'`;
    env.ACTIONS.direction.details.onUse = `'apply team-based effect to target'`;
    env.ACTIONS.direction.details.onCrit = `'apply to rest of targeted team'`;
    env.ACTIONS.direction.details.conditional = `<o-col>VS FOE::</o-col>'[STATUS::vulnerable]';'[STATUS::critical_flaw] to primary target'
<f-col>VS ALLY::</f-col>'[STATUS::evasion]';'[STATUS::counter] to primary target'`;


    /* - distraction - */

    env.ACTIONS.distraction.name = `Distraction`;
    env.ACTIONS.distraction.verb = `distract`;

    env.ACTIONS.distraction.usage.act = `%USER FEINTS AND STRIKES %TARGET`;
    env.ACTIONS.distraction.usage.crit = `%USER'S ALLIES ARE INSPIRED`;
    env.ACTIONS.distraction.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.distraction.usage.miss = `%TARGET DODGES`;

    env.ACTIONS.distraction.details.flavor = `'strike with clever feint';'may create distraction'`;
    env.ACTIONS.distraction.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.distraction.details.onCrit = `'[STATUS::evasion] to nearby allies'`;
    env.ACTIONS.distraction.details.conditional = `<em>VS VULNERABLE::</em>'additional [STAT::amt]'`;


    /* - spy - */

    env.ACTIONS.spy.name = `spy`;
    env.ACTIONS.spy.verb = `spy on`;

    env.ACTIONS.spy.usage.act = `%USER SPIES UPON %TARGET`;
    env.ACTIONS.spy.usage.crit = `%TARGET IS MARKED FOR DEATH`;
    env.ACTIONS.spy.usage.hit = `%TARGET FEELS TARGETED`;
    env.ACTIONS.spy.usage.miss = `%TARGET HIDES BEHIND SOMETHING`;

    env.ACTIONS.spy.details.onUse = `'[STATUS::vulnerable]'`;


    /* - ultra_spy - */

    env.ACTIONS.ultra_spy.name = `Find Flaw`;
    env.ACTIONS.ultra_spy.verb = `find flaw in`;

    env.ACTIONS.ultra_spy.usage.act = `%USER SPIES UPON %TARGET`;
    env.ACTIONS.ultra_spy.usage.crit = `%TARGET IS MARKED FOR DEATH`;
    env.ACTIONS.ultra_spy.usage.hit = `%TARGET IS MARKED FOR DEATH`;
    env.ACTIONS.ultra_spy.usage.miss = `%TARGET HIDES BEHIND SOMETHING`;

    env.ACTIONS.ultra_spy.details.flavor = `'locate core components in target'`;
    env.ACTIONS.ultra_spy.details.onHit = `'[STATUS::vulnerable] [STATUS::critical_flaw]'`;


    /* - subvert - */

    env.ACTIONS.subvert.name = `Subvert`;
    env.ACTIONS.subvert.desc = `'expose extreme weakness';'increase hit and crit chances';'additional chance for severe damage'`;

    env.ACTIONS.subvert.usage.act = `%USER SPIES UPON %TARGET`;
    env.ACTIONS.subvert.usage.crit = `%TARGET IS MARKED FOR DEATH`;
    env.ACTIONS.subvert.usage.hit = `%TARGET IS MARKED FOR DEATH`;
    env.ACTIONS.subvert.usage.miss = `%TARGET HIDES BEHIND SOMETHING`;

    env.ACTIONS.subvert.details.flavor = `'deceive target';'manipulated by outside interference'`;
    env.ACTIONS.subvert.details.onHit = `'[STATUS::vulnerable] [STATUS::critical_flaw]'`;


    /* - spy_analyze - */

    env.ACTIONS.spy_analyze.name = `Analyze`;
    env.ACTIONS.spy_analyze.desc = `'expose enemy weakness';'increase hit and crit chances'`;

    env.ACTIONS.spy_analyze.usage.act = `%USER SCANS %TARGET`;
    env.ACTIONS.spy_analyze.usage.hit = `%TARGET FEELS TARGETED`;
    env.ACTIONS.spy_analyze.usage.miss = `%TARGET HIDES BEHIND SOMETHING`;


    /* - spy_target - */

    env.ACTIONS.spy_target.name = `Target`;
    env.ACTIONS.spy_target.desc = `'expose enemy weakness';'increase hit and crit chances'`;

    env.ACTIONS.spy_target.usage.act = `%USER POINTS AT %TARGET`;
    env.ACTIONS.spy_target.usage.hit = `%TARGET FEELS TARGETED`;
    env.ACTIONS.spy_target.usage.miss = `%TARGET HIDES BEHIND SOMETHING`;


    /* - drone_strike - */

    env.ACTIONS.drone_strike.name = `Drone Strike`;
    env.ACTIONS.drone_strike.desc = `'strike against analyzed weakness'`;

    env.ACTIONS.drone_strike.usage.act = `%USER's DRONE ATTACKS %TARGET`;


    /* - cavik_attack - */

    env.ACTIONS.cavik_attack.name = `IED`;
    env.ACTIONS.cavik_attack.verb = `throw at`;

    env.ACTIONS.cavik_attack.usage.act = `%USER THROWS A WEIRD CYST AT %TARGET`;
    env.ACTIONS.cavik_attack.usage.crit = `%TARGET EXPLODES`;
    env.ACTIONS.cavik_attack.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.cavik_attack.usage.miss = `%TARGET DODGES`;

    env.ACTIONS.cavik_attack.details.flavor = `'throw hastily made minor explosive';'chance for greater explosion'`;
    env.ACTIONS.cavik_attack.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.cavik_attack.details.onCrit = () => `'HIT all foes for [STAT::amt]'${page.name == "frame" ? `;'additional hits do not trigger on-hit effects'` : ``}`;


    /* - cavik_attack_disruption - */

    env.ACTIONS.cavik_attack_disruption.name = `IED`;
    env.ACTIONS.cavik_attack_disruption.verb = `throw at`;

    env.ACTIONS.cavik_attack_disruption.usage.act = `%USER THROWS A WEIRD CYST AT %TARGET`;
    env.ACTIONS.cavik_attack_disruption.usage.crit = `%TARGET EXPLODES`;
    env.ACTIONS.cavik_attack_disruption.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.cavik_attack_disruption.usage.miss = `%TARGET DODGES`;

    env.ACTIONS.cavik_attack_disruption.details.flavor = `'throw hastily made minor explosive';'chance for greater explosion'`;
    env.ACTIONS.cavik_attack_disruption.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.cavik_attack_disruption.details.onCrit = () => `'explode and HIT all foes for additional [STAT::amt]'`;
    env.ACTIONS.cavik_attack_disruption.details.conditional = `<em>BURN::</em>'hits reduce length of <n-col class="shiftdetail">most </n-col>positive statuses by 1T'
<em>DECONSTRUCT::</em>'extra [STAT::bonusAmtHP] if target has a [STATUS::bp]'`;


    /* - cavik_charge - */

    env.ACTIONS.cavik_charge.name = `Charge`;

    env.ACTIONS.cavik_charge.usage.act = `%USER ATTACHES A CHARGE TO %TARGET`;

    env.ACTIONS.cavik_charge.details.flavor = `'misuse dull equipment';'repair and amplify kinetic force of ally';'overcharge and attach to foe to prepare dangerous blast'`;
    env.ACTIONS.cavik_charge.details.conditional = (actor) => `<em>VS FOE::</em>'[STATUS::bomb]'\n<em>VS ALLY::</em>'[STAT::amtBP] [STATUS::repairs] [STATUS::surge]'`;


    /* - bazruka - */

    env.ACTIONS.bazruka.name = `Bazruka`;
    env.ACTIONS.bazruka.verb = `throw at`;

    env.ACTIONS.bazruka.usage.act = `%USER TOSSES AN EXPLOSIVE AT %TARGET`;
    env.ACTIONS.bazruka.usage.crit = `SHRAPNEL SPRINGS AROUND THE ROOM`;
    env.ACTIONS.bazruka.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.bazruka.usage.miss = `%TARGET DODGES`;

    env.ACTIONS.bazruka.details.flavor = `'utilize rapid-formed micro-explosive';'chance for greater shrapnel explosion'`;
    env.ACTIONS.bazruka.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.bazruka.details.onCrit = () => `'HIT all foes for [STAT::amt] [STATUS::puncture]'${page.name == "frame" ? `;'additional hits trigger on-hit effects'` : ``}`;


    /* - bozko_attack - */

    env.ACTIONS.bozko_attack.name = `Heavy Swing`;
    env.ACTIONS.bozko_attack.verb = `swing at`;

    env.ACTIONS.bozko_attack.usage.act = `%USER SWINGS AT %TARGET`;
    env.ACTIONS.bozko_attack.usage.crit = `A DEVASTATING IMPACT`;
    env.ACTIONS.bozko_attack.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.bozko_attack.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.bozko_attack.details.flavor = `'utilize bulky gauntlets to deal massive damage';'slow and inaccurate'`;
    env.ACTIONS.bozko_attack.details.onHit = () => `'[STAT::amt]'${env?.rpg?.is2D ? `;'[STAT::kb]'` : ``}`;
    env.ACTIONS.bozko_attack.details.conditional = (actor) => {
        let base = `<em>STAGGER::</em>'[STATUS::stun] if user has > 3T:[STATUS::carapace]'\n<em>PULVERIZE::</em>'<n-col class="shiftdetail">base </n-col>damage doubled if user has > 5T:[STATUS::carapace]'`
        if (hasStatus(actor, "bone_thorns")) base = base.replaceAll("[STATUS::carapace]", "[STATUS::spikes]")
        return base
    };


    /* - cripple - */

    env.ACTIONS.cripple.name = `Cripple`;

    env.ACTIONS.cripple.usage.act = `%USER JABS AT %TARGET'S CORE`;
    env.ACTIONS.cripple.usage.crit = `%TARGET IS CRIPPLED`;
    env.ACTIONS.cripple.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.cripple.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.cripple.details.flavor = `'strike neural center of target';'guaranteed disorientation'`;
    env.ACTIONS.cripple.details.onHit = `'[STAT::amt] [STATUS::stun]'`;
    env.ACTIONS.cripple.details.onCrit = `'[STATUS::vulnerable]'`;


    /* - guard - */

    env.ACTIONS.guard.name = `Guard`;

    env.ACTIONS.guard.usage.act = `%USER STANDS BEFORE %TARGET`;
    env.ACTIONS.guard.usage.hit = `%TARGET IS GUARDED BY %USER`;

    env.ACTIONS.guard.details.flavor = `'utilize unique limbs to protect target';'intercept incoming attacks'`;
    env.ACTIONS.guard.details.onUse = `'[STATUS::carapace] [STATUS::counter] to self'`;
    env.ACTIONS.guard.details.onHit = `'[STATUS::redirection]'`;
    env.ACTIONS.guard.details.conditional = `<em>UNFLINCHING::</em>'cannot be disabled by [STATUS::terror]'`;


    /* - guard_weak - */

    env.ACTIONS.guard_weak.name = `Quick Guard`;

    env.ACTIONS.guard_weak.usage.act = `%USER STANDS BEFORE %TARGET`;
    env.ACTIONS.guard_weak.usage.hit = `%TARGET IS GUARDED BY %USER`;

    env.ACTIONS.guard_weak.details.flavor = `'utilize unique limbs to protect target';'intercept incoming attacks'`;
    env.ACTIONS.guard_weak.details.onUse = `'[STATUS::redirection] to target'`;


    /* - special_guard_all - */

    env.ACTIONS.special_guard_all.name = `Frontline`;

    env.ACTIONS.special_guard_all.usage.act = `%USER STANDS BEFORE THEIR FOES`;

    env.ACTIONS.special_guard_all.details.flavor = `'attain hyper-awareness of proceedings';'intercept all attacks on allies'`;
    env.ACTIONS.special_guard_all.details.onUse = `'[STATUS::redirection] to all allies';'[STATUS::carapace] [STATUS::counter] to self'`;


    /* - special_guard_all_bonus - */

    env.ACTIONS.special_guard_all_bonus.name = `Martyr`;
    env.ACTIONS.special_guard_all_bonus.desc = `'intercept all attacks on allies';'prepare to take great damage'`;

    env.ACTIONS.special_guard_all_bonus.usage.act = `%USER STANDS BEFORE THEIR FOES`;

    env.ACTIONS.special_guard_all_bonus.details.flavor = `'intercept all attacks on allies';'prepare to take great damage'`;
    env.ACTIONS.special_guard_all_bonus.details.onUse = `'[STATUS::carapace] [STATUS::spikes]';'[STATUS::redirection] to all allies'`;


    /* - shell - */

    env.ACTIONS.shell.name = `Shelter`;

    env.ACTIONS.shell.usage.act = `%USER PREPARES TO TAKE A HIT`;

    env.ACTIONS.shell.details.flavor = `'take on defensive stance'`;
    env.ACTIONS.shell.details.onUse = `'[STATUS::carapace] [STATUS::focused]';'remove [STATUS::vulnerable]'`;
    env.ACTIONS.shell.details.conditional = `<em>UNFLINCHING::</em>'cannot be disabled by [STATUS::terror]'`;


    /* - brawl_weak - */

    env.ACTIONS.brawl_weak.name = `Clumsy Brawl`;
    env.ACTIONS.brawl_weak.desc = `'unwieldy strike with weak limbs'`;
    env.ACTIONS.brawl_weak.verb = `brawl with`;

    env.ACTIONS.brawl_weak.usage.act = `%USER CLUMSILY ATTACKS %TARGET`;
    env.ACTIONS.brawl_weak.usage.crit = `%TARGET IS KNOCKED BACK`;
    env.ACTIONS.brawl_weak.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.brawl_weak.usage.miss = `%TARGET EVADES`;


    /* - brawl - */

    env.ACTIONS.brawl.name = `Brawl`;
    env.ACTIONS.brawl.verb = `brawl with`;

    env.ACTIONS.brawl.usage.act = `%USER ATTACKS %TARGET`;
    env.ACTIONS.brawl.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.brawl.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.brawl.details.flavor = `'unwieldy punch';'last resort'`;
    env.ACTIONS.brawl.details.onHit = `'[STAT::amt]'`;


    /* - ik_attack - */

    env.ACTIONS.ik_attack.name = `Veilksplitter`;
    env.ACTIONS.ik_attack.verb = `veilksplit`;

    env.ACTIONS.ik_attack.usage.act = `%USER BLASTS %TARGET`;
    env.ACTIONS.ik_attack.usage.crit = `%TARGET IS ANNIHILATED`;
    env.ACTIONS.ik_attack.usage.hit = `%TARGET IS SEARED`;
    env.ACTIONS.ik_attack.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.ik_attack.details.flavor = `'utilize dull-enabled cutting beam'`;
    env.ACTIONS.ik_attack.details.onUse = `'guaranteed HIT'`;
    env.ACTIONS.ik_attack.details.onHit = () => `'[STAT::amt] [STATUS::stun]'${env?.rpg?.is2D ? ";'[STAT::kb]'" : ''}`;


    /* - dullflare - */

    env.ACTIONS.dullflare.name = `Dull Flare`;

    env.ACTIONS.dullflare.usage.act = `%USER TEARS OPEN THE DULL`;

    env.ACTIONS.dullflare.details.flavor = `'wide directional release of rapidly decaying dull light';'deconstructs foes'`;
    env.ACTIONS.dullflare.details.onUse = `'guaranteed HIT on all foes'`;
    env.ACTIONS.dullflare.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.dullflare.details.conditional = () => env?.rpg?.actors?.boss_golem ? `<em>VS ???::</em>'inflicts [STATUS::distortion]'` : ``;


    /* - ik_attack_st - */

    env.ACTIONS.ik_attack_st.name = `Veilksplitter`;
    env.ACTIONS.ik_attack_st.verb = `veilksplit`;

    env.ACTIONS.ik_attack_st.usage.act = `%USER BLASTS %TARGET`;
    env.ACTIONS.ik_attack_st.usage.crit = `%TARGET IS ANNIHILATED`;
    env.ACTIONS.ik_attack_st.usage.hit = `%TARGET IS SEARED`;
    env.ACTIONS.ik_attack_st.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.ik_attack_st.details.flavor = `'utilize dull-enabled cutting beam'`;
    env.ACTIONS.ik_attack_st.details.onUse = `'guaranteed HIT'`;
    env.ACTIONS.ik_attack_st.details.onHit = () => `'[STAT::amt] [STATUS::stun]'${env?.rpg?.is2D ? ";'[STAT::kb]'" : ''}`;


    /* - dullflare_st - */

    env.ACTIONS.dullflare_st.name = `Dull Flare`;

    env.ACTIONS.dullflare_st.usage.act = `%USER TEARS OPEN THE DULL`;

    env.ACTIONS.dullflare_st.details.flavor = `'wide directional release of rapidly decaying dull light';'deconstructs foes'`;
    env.ACTIONS.dullflare_st.details.onUse = `'guaranteed HIT on all foes'`;
    env.ACTIONS.dullflare_st.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.dullflare_st.details.conditional = () => env?.rpg?.actors?.boss_golem ? `<em>VS ???::</em>'inflicts [STATUS::distortion]'` : ``;


    /* - swipe - */

    env.ACTIONS.swipe.name = `Swipe`;
    env.ACTIONS.swipe.desc = `'swipe blindly at target';'chance for persistent wound'`;

    env.ACTIONS.swipe.usage.act = `%USER SWIPES AT %TARGET`;
    env.ACTIONS.swipe.usage.crit = `%TARGET IS STABBED`;
    env.ACTIONS.swipe.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.swipe.usage.miss = `%TARGET DUCKS OUT OF THE WAY`;


    /* - disabler_pulse - */

    env.ACTIONS.disabler_pulse.name = `Disabler`;
    env.ACTIONS.disabler_pulse.verb = `disable`;

    env.ACTIONS.disabler_pulse.usage.act = `%USER LETS LOOSE THE DISABLER`;
    env.ACTIONS.disabler_pulse.usage.hit = `%TARGET IS ANNIHILATED`;

    env.ACTIONS.disabler_pulse.details.flavor = `'emergency security device';'injects self-destructive thoughtform';'for industrial use only'`;
    env.ACTIONS.disabler_pulse.details.onUse = `'guaranteed <n-col>CRIT</n-col>'`;
    env.ACTIONS.disabler_pulse.details.onHit = () => `'[STAT::amt] [STATUS::stun]'`;
    env.ACTIONS.disabler_pulse.details.conditional = (actor) => `<em>SPECIAL::</em>${page.path != "/local/ocean/embassy/" ? `'immediately removes all [STATUS::carapace] and [STATUS::bp]';` : (page.path == "/local/ocean/embassy" && check("PAGE!!archiveopen")) ? `'immediately removes all [STATUS::bp]'` : ``}'bypasses stun immunity'\n<em>1 USE PER COMBAT</em>`;


    /* - foe_stab - */

    env.ACTIONS.foe_stab.name = `stab`;
    env.ACTIONS.foe_stab.desc = `'puncture vital cystic component';'damage over time';'stop regen'`;

    env.ACTIONS.foe_stab.usage.act = `%USER STABS %TARGET`;
    env.ACTIONS.foe_stab.usage.crit = `%TARGET IS EVISCERATED`;
    env.ACTIONS.foe_stab.usage.hit = `%TARGET BLEEDS SLUDGY CORRU`;
    env.ACTIONS.foe_stab.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.foe_stab.details.flavor = `'reshape arm into sharpened tendril';'stab target'`;
    env.ACTIONS.foe_stab.details.onHit = `'[STAT::amt] [STATUS::puncture]'`;
    env.ACTIONS.foe_stab.details.onCrit = () => `'puncture vital cystic component for [STATUS::puncture]'${env?.rpg?.is2D ? ";'[STAT::kb]'" : ''}`;


    /* - barrier - */

    env.ACTIONS.barrier.name = `Barrier`;
    env.ACTIONS.barrier.verb = `shield`;

    env.ACTIONS.barrier.usage.act = `%USER SHIELDS %TARGET`;
    env.ACTIONS.barrier.usage.crit = `%TARGET FEELS INVINCIBLE`;
    env.ACTIONS.barrier.usage.hit = `%TARGET GAINS A THIN BARRIER`;
    env.ACTIONS.barrier.usage.miss = `IT DOES NOT STICK`;

    env.ACTIONS.barrier.details.flavor = `apply ablative corru layer to target';'occasionally provide better shielding'`;
    env.ACTIONS.barrier.details.onHit = `'[STAT::amtBP]'`;
    env.ACTIONS.barrier.details.onCrit = `'additional [STAT::amtBP]'`;


    /* - special_limited_carapace - */

    env.ACTIONS.special_limited_carapace.name = `Expend carapace`;
    env.ACTIONS.special_limited_carapace.desc = `'deploy shielding around target ally';'single-use'`;

    env.ACTIONS.special_limited_carapace.usage.act = `%USER ATTACHES THEIR SHIELDS TO %TARGET`;
    env.ACTIONS.special_limited_carapace.usage.crit = `%TARGET FEELS INVINCIBLE`;
    env.ACTIONS.special_limited_carapace.usage.hit = `%TARGET LOOKS MORE HARDY`;
    env.ACTIONS.special_limited_carapace.usage.miss = `SOMETHING BROKE LOL`;


    /* - enemy_shell - */

    env.ACTIONS.enemy_shell.name = `Shell`;
    env.ACTIONS.enemy_shell.desc = `'form arms into defensive shell';'reduce incoming attacks'`;

    env.ACTIONS.enemy_shell.usage.act = `%USER PREPARES TO TAKE A HIT`;


    /* - restore - */

    env.ACTIONS.restore.name = `Restore`;

    env.ACTIONS.restore.usage.act = `%USER FIXES UP %TARGET`;
    env.ACTIONS.restore.usage.crit = `%TARGET FEELS WAY BETTER`;
    env.ACTIONS.restore.usage.hit = `%TARGET FEELS BETTER`;
    env.ACTIONS.restore.usage.miss = `%TARGET IS TOO SLIPPERY`;

    env.ACTIONS.restore.details.flavor = `'utilize quick-acting repair cyst'`;
    env.ACTIONS.restore.details.onUse = () => env?.rpg?.is2D ? `'targets via actor info box'` : '';
    env.ACTIONS.restore.details.onHit = `'[STAT::amt] [STATUS::regen]'`;
    env.ACTIONS.restore.details.onCrit = `'doubles <n-col>HIT</n-col> effect'`;
    env.ACTIONS.restore.details.conditional = (actor) => `<em>REVIVE::</em>'if target is <n-col>DOWN</n-col>';'grant [STATUS::evasion] [STATUS::regen]'${actor?.restorativeCount ? `\n<em>USES REMAINING::</em>${actor.restorativeCount}` : ''
        }`;


    /* - special_spy_all - */

    env.ACTIONS.special_spy_all.name = `Analyze Foes`;

    env.ACTIONS.special_spy_all.usage.act = `%USER SPIES UPON THEIR FOES`;

    env.ACTIONS.special_spy_all.details.flavor = `'utilize receptor-tied targeting cyst';'expose all weakness'`;
    env.ACTIONS.special_spy_all.details.onUse = `'[STATUS::vulnerable] to all foes'`;


    /* - special_attack_all - */

    env.ACTIONS.special_attack_all.name = `Explosive`;

    env.ACTIONS.special_attack_all.usage.act = `%USER DEPLOYS A KAVRUKA`;

    env.ACTIONS.special_attack_all.details.flavor = `'utilize volatile deconstruction tool'`;
    env.ACTIONS.special_attack_all.details.onUse = `'HIT all foes'`;
    env.ACTIONS.special_attack_all.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.special_attack_all.details.onCrit = `'[STATUS::stun]'`;
    env.ACTIONS.special_attack_all.details.conditional = (actor) => (actor?.kavrukaLimited) ? `<em>DRAWS REMAINING::${actor.kavrukasLeft}</em>` : `<em>STOWED::</em>'must be prepared by <n-col>FOCUSING</n-col>'`;


    /* - special_barrier_allies - */

    env.ACTIONS.special_barrier_allies.name = `Repairs`;

    env.ACTIONS.special_barrier_allies.usage.act = `%USER SHIELDS THEIR ALLIES`;

    env.ACTIONS.special_barrier_allies.details.flavor = `'utilize mobile applicators and inbuilt reserve';'apply ablative corru shielding'`;
    env.ACTIONS.special_barrier_allies.details.onUse = () => `'[STAT::amtBP] [STATUS::repairs] to nearby allies'`;
    env.ACTIONS.special_barrier_allies.details.conditional = `<em>SPECIAL::</em>'grant additional [STAT::amtBP] to targets under effects of [STATUS::repairsRef]'`;


    /* - special_strong_barrier_allies - */

    env.ACTIONS.special_strong_barrier_allies.name = `Apply Armor`;

    env.ACTIONS.special_strong_barrier_allies.usage.act = `%USER SHIELDS THEIR ALLIES`;

    env.ACTIONS.special_strong_barrier_allies.details.flavor = `'break open satik cyst';'utilize rapid temporary ablative barrier applicators'`;
    env.ACTIONS.special_strong_barrier_allies.details.onUse = () => `'apply up to [STAT::amtBP] to nearby allies'`;
    env.ACTIONS.special_strong_barrier_allies.details.conditional = (actor) => actor?.satikCount ? `<em>USES REMAINING::</em>${actor.satikCount}` : false;


    /* - special_restorative_barrier - */

    env.ACTIONS.special_restorative_barrier.name = `Mending Cover`;

    env.ACTIONS.special_restorative_barrier.usage.act = `%USER SHIELDS THEIR ALLIES`;

    env.ACTIONS.special_restorative_barrier.details.flavor = `'broadly apply ablative protection';'upgraded barrier mends wounds while active'`;
    env.ACTIONS.special_restorative_barrier.details.onUse = `'[STAT::amtBP] [STATUS::repairs] to nearby allies'`;


    /* - incoherent_gundown - */

    env.ACTIONS.incoherent_gundown.name = `BSTRD BULLETS`;
    env.ACTIONS.incoherent_gundown.desc = `BATTLEFIELD 100% -1HP per hit`;


    /* - special_fullauto - */

    env.ACTIONS.special_fullauto.name = `Full Auto`;

    env.ACTIONS.special_fullauto.usage.act = `%USER OPENS FIRE`;

    env.ACTIONS.special_fullauto.details.flavor = `'utilize automatic rifle';'rapid inaccurate attacks'`;
    env.ACTIONS.special_fullauto.details.onUse = `'HIT random foes 6 times';'prioritizes foes with [STATUS::targetedRef]'`;
    env.ACTIONS.special_fullauto.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.special_fullauto.details.onCrit = `'[STATUS::vulnerable]';'[STATUS::targeted] if no other foes have [STATUS::targetedRef]'`;


    /* - special_fullauto_player - */

    env.ACTIONS.special_fullauto_player.name = `Full Auto`;

    env.ACTIONS.special_fullauto_player.usage.act = `%USER OPENS FIRE`;

    env.ACTIONS.special_fullauto_player.details.flavor = `'utilize symbiotic rifle';'rapid inaccurate attacks';'consumes HP for munitions'`;
    env.ACTIONS.special_fullauto_player.details.onUse = `'HIT random foes 6 times';'[STAT::amt] to self'`;
    env.ACTIONS.special_fullauto_player.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.special_fullauto_player.details.onCrit = `'[STATUS::vulnerable]'`;


    /* - movefriend_attack - */

    env.ACTIONS.movefriend_attack.name = `Broadcast`;
    env.ACTIONS.movefriend_attack.desc = `'directly seize control of corrucystic organs';'chance to utilize target as signal amplifier'`;

    env.ACTIONS.movefriend_attack.usage.act = `%USER'S SIGIL WARPS STRANGELY`;
    env.ACTIONS.movefriend_attack.usage.crit = `THE WHOLE TEAM FEELS ILL`;
    env.ACTIONS.movefriend_attack.usage.hit = `%TARGET'S FLESH REVOLTS`;
    env.ACTIONS.movefriend_attack.usage.miss = `%TARGET RECOILS SAFELY`;


    /* - special_mass_destabilize - */

    env.ACTIONS.special_mass_destabilize.name = `destabilize thoughtspace`;

    env.ACTIONS.special_mass_destabilize.usage.act = `THE THOUGHTSPACE GROWS VIOLENT`;

    env.ACTIONS.special_mass_destabilize.details.flavor = `'afflict all nearby entities with incoherence'`;
    env.ACTIONS.special_mass_destabilize.details.onUse = `'[STATUS::destabilized] to all actors'`;


    /* - special_movefriend_annihilate - */

    env.ACTIONS.special_movefriend_annihilate.name = `Annihilation`;
    env.ACTIONS.special_movefriend_annihilate.desc = `'utilize the walls to crush a target'`;

    env.ACTIONS.special_movefriend_annihilate.usage.act = `THE WALLS GREW HOSTILE AROUND %TARGET`;
    env.ACTIONS.special_movefriend_annihilate.usage.crit = `%TARGET BARELY STANDS`;
    env.ACTIONS.special_movefriend_annihilate.usage.hit = `%TARGET DID THEIR BEST`;
    env.ACTIONS.special_movefriend_annihilate.usage.miss = `%TARGET ESCAPED BY A HAIR`;


    /* - incoherent_movefriend - */

    env.ACTIONS.incoherent_movefriend.name = `Wallspikes`;
    env.ACTIONS.incoherent_movefriend.desc = `'k̶̡̇̄i̵͈͑̐̑̌̈́̇̾̕͝l̷̡͓̬̩̖̽̂̿̏͒̎̽̏̀̿̏̅̈l̵̯̦̪͠'`;


    /* - windup - */

    env.ACTIONS.windup.name = `Preparation`;

    env.ACTIONS.windup.usage.act = `%USER PREPARES AN ATTACK...`;

    env.ACTIONS.windup.details.flavor = `'prepare a devastating attack'`;
    env.ACTIONS.windup.details.onUse = `'[STATUS::windup]'`;


    /* - windup_cover - */

    env.ACTIONS.windup_cover.name = `Take Aim`;

    env.ACTIONS.windup_cover.usage.act = `%USER PREPARES AN ATTACK...`;

    env.ACTIONS.windup_cover.details.flavor = `'prepare devastating attack';'stay low';'lose windup if attention diverted'`;
    env.ACTIONS.windup_cover.details.onUse = `'[STATUS::windup] [STATUS::evasion]'`;


    /* - ik_windup - */

    env.ACTIONS.ik_windup.name = `Winding Focus`;

    env.ACTIONS.ik_windup.usage.act = `%USER CHARGES THEIR GAUNTLETS...`;

    env.ACTIONS.ik_windup.details.onUse = `'[STATUS::windup] [STATUS::focused]'`;
    env.ACTIONS.ik_windup.details.flavor = `'prepare attack';'look for opportunity'`;


    /* - focused_windup - */

    env.ACTIONS.focused_windup.name = `Maintain Focus`;

    env.ACTIONS.focused_windup.usage.act = `%USER WAITS FOR THE RIGHT MOMENT...`;

    env.ACTIONS.focused_windup.details.onUse = `'[STATUS::windup] [STATUS::focused]'`;
    env.ACTIONS.focused_windup.details.flavor = `'hold prepared attack';'look for opportunity'`;


    /* - hold_aim - */

    env.ACTIONS.hold_aim.name = `Hold Aim`;

    env.ACTIONS.hold_aim.usage.act = `%USER WAITS FOR THE RIGHT MOMENT...`;

    env.ACTIONS.hold_aim.details.onUse = `'[STATUS::windup] [STATUS::evasion] [STATUS::focused]'`;
    env.ACTIONS.hold_aim.details.flavor = `'hold prepared attack';'look for opportunity'`;


    /* - archival_smash - */

    env.ACTIONS.archival_smash.name = `Calculated Strike`;

    env.ACTIONS.archival_smash.usage.act = `%USER CHARGES %TARGET`;
    env.ACTIONS.archival_smash.usage.crit = `%TARGET IS LEFT REELING`;
    env.ACTIONS.archival_smash.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.archival_smash.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.archival_smash.details.flavor = `'focused, deadly attack upon one target';'immense physical trauma'`;
    env.ACTIONS.archival_smash.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.archival_smash.details.onCrit = `'[STATUS::stun]'`;


    /* - kivii_grasp - */

    env.ACTIONS.kivii_grasp.name = `Grasp`;

    env.ACTIONS.kivii_grasp.usage.act = `%USER GRASPS AT %TARGET`;
    env.ACTIONS.kivii_grasp.usage.crit = `%TARGET IS CRUSHED`;
    env.ACTIONS.kivii_grasp.usage.hit = `%TARGET IS CAUGHT`;
    env.ACTIONS.kivii_grasp.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.kivii_grasp.details.flavor = `'utilize gauntlet';'immobilize and crush target';'leave critically open to attack'`;
    env.ACTIONS.kivii_grasp.details.onUse = `'[STAT::amt] [STAT::vulnerable]'`;
    env.ACTIONS.kivii_grasp.details.onCrit = `'[STATUS::stun]'`;


    /* - rez - */

    env.ACTIONS.rez.name = `Unfair Advantage`;

    env.ACTIONS.rez.usage.act = `%USER BRINGS %TARGET BACK TO THEIR FEET`;
    env.ACTIONS.rez.usage.hit = `%TARGET IS READY TO FIGHT`;
    env.ACTIONS.rez.usage.crit = `%TARGET GETS A SECOND WIND`;

    env.ACTIONS.rez.details.flavor = `'repair ally to fighting condition';'used only as last resort'`;
    env.ACTIONS.rez.details.onUse = `'revive target at [STAT::percentage]%HP'`;


    /* - husk_attack - */

    env.ACTIONS.husk_attack.name = `Familiar Strike`;

    env.ACTIONS.husk_attack.usage.act = `%USER SPRINTS AT %TARGET`;
    env.ACTIONS.husk_attack.usage.crit = `%TARGET FACES THEIR MORTALITY`;
    env.ACTIONS.husk_attack.usage.hit = `%TARGET IS STRUCK WITH BROKEN LIMBS`;
    env.ACTIONS.husk_attack.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.husk_attack.details.flavor = `'utilized warped limbs to strike target';'occasionally terrifying'`;
    env.ACTIONS.husk_attack.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.husk_attack.details.onCrit = `'[STATUS::fear] to all foes'`;


    /* - husk_attack_weak - */

    env.ACTIONS.husk_attack_weak.name = `Psychosis`;
    env.ACTIONS.husk_attack_weak.desc = `'manifest imagined attack directly in flesh';'occasionally terrifying'`;

    env.ACTIONS.husk_attack_weak.usage.act = `%USER SPRINTS AT %TARGET`;
    env.ACTIONS.husk_attack_weak.usage.crit = `%TARGET FACES THEIR MORTALITY`;
    env.ACTIONS.husk_attack_weak.usage.hit = `%TARGET IS STRUCK, BUT BY WHAT?`;
    env.ACTIONS.husk_attack_weak.usage.miss = `%TARGET EVADES`;


    /* - speak - */

    env.ACTIONS.speak.name = `Speak`;

    env.ACTIONS.speak.usage.act = `%USER APPROACHES %TARGET`;
    env.ACTIONS.speak.usage.crit = `%TARGET IS PARALYZED BY FEAR`;
    env.ACTIONS.speak.usage.hit = `%USER WHISPERS SOMETHING TO %TARGET`;
    env.ACTIONS.speak.usage.miss = `%TARGET RECOILS`;

    env.ACTIONS.speak.details.flavor = `'utilize remains to speak';'express aggressor signal directly'`;
    env.ACTIONS.speak.details.onHit = `'[STATUS::terror]'`;
    env.ACTIONS.speak.details.onCrit = `'[STATUS::stun]'`;


    /* - berserk - */

    env.ACTIONS.berserk.name = `Berserk`;

    env.ACTIONS.berserk.usage.act = `%USER MELTS INTO A MORE AGGRESSIVE SHAPE`;

    env.ACTIONS.berserk.details.flavor = `'self-modify for maximum offense';'destabilize form and react to attacks'`;
    env.ACTIONS.berserk.details.onUse = `[STATUS::destabilized] [STATUS::spikes] [STATUS::vulnerable]`;


    /* - special_self_destruct - */

    env.ACTIONS.special_self_destruct.name = `Self Destruct`;
    env.ACTIONS.special_self_destruct.desc = `'form shrapnel in body';'propel through unsustainable means'`;

    env.ACTIONS.special_self_destruct.usage.act = `%USER JUST EXPLODES`;

    env.ACTIONS.special_self_destruct.details.flavor = `'form shrapnel in body';'propel through unsustainable means'`;
    env.ACTIONS.special_self_destruct.details.onUse = `'HIT all foes';'[STAT::amt] to self'`;
    env.ACTIONS.special_self_destruct.details.onHit = `'[STAT::amt]'`;


    /* - special_dullsummon - */

    env.ACTIONS.special_dullsummon.name = `Dull Portal`;

    env.ACTIONS.special_dullsummon.details.flavor = `'collect additional allies from elsewhere'`;
    env.ACTIONS.special_dullsummon.details.conditional = `<em>SUMMON::</em>'summon 2 dull containers (max:7)'`;


    /* - special_dullbuff - */

    env.ACTIONS.special_dullbuff.name = `Dull Overload`;
    env.ACTIONS.special_dullbuff.desc = `'`;

    env.ACTIONS.special_dullbuff.usage.act = `%USER FLOODS THEIR ALLIES WITH DULL LIGHT`;

    env.ACTIONS.special_dullbuff.details.flavor = `'destabilize allies via dull exposure';'attain direct control and focus attack'`;
    env.ACTIONS.special_dullbuff.details.onUse = `'[STATUS::destabilized] [STATUS::focused] to all allies'`;


    /* - special_chant - */

    env.ACTIONS.special_chant.name = `█████`;
    env.ACTIONS.special_chant.desc = `'██████ ███ █████';'convey malignant thoughtforms via speech'`;

    env.ACTIONS.special_chant.usage.act = `%USER ██████ ███ █████`;


    /* - incoherent_golemboss - */

    env.ACTIONS.incoherent_golemboss.name = `GOLEM BRAWL`;
    env.ACTIONS.incoherent_golemboss.desc = `MELEE FOE_KO::'-20HP' ALLY_KO::'-3HP'`;

    env.ACTIONS.incoherent_golemboss.usage.act = `%USER RAISES ITS FISTS`;

    env.ACTIONS.incoherent_golemboss.details.onUse = () => `''`;
    env.ACTIONS.incoherent_golemboss.details.flavor = `'attempt to incapacitate usurpers through blunt trauma'`;


    /* - golemboss_dullflare - */

    env.ACTIONS.golemboss_dullflare.name = `Dull Flare`;

    env.ACTIONS.golemboss_dullflare.usage.act = `%USER TEARS OPEN THE DULL`;

    env.ACTIONS.golemboss_dullflare.details.flavor = `'wide directional release of rapidly decaying dull light';'deconstructs foes'`;
    env.ACTIONS.golemboss_dullflare.details.onUse = `'HIT all foes'`;
    env.ACTIONS.golemboss_dullflare.details.onHit = `'[STAT::amt]'`;


    /* - special_steerleft - */

    env.ACTIONS.special_steerleft.name = `Steer Left`;

    env.ACTIONS.special_steerleft.usage.act = `%USER STEERS THE VESSEL LEFT`;

    env.ACTIONS.special_steerleft.details.flavor = `'direct vessel to the left of current direction';'beware of momentum';'cannot exceed frame bounds'`;
    env.ACTIONS.special_steerleft.details.conditional = `<em>VESSEL</em>::STEER LEFT`;


    /* - special_steerright - */

    env.ACTIONS.special_steerright.name = `Steer Right`;

    env.ACTIONS.special_steerright.usage.act = `%USER STEERS THE VESSEL RIGHT`;

    env.ACTIONS.special_steerright.details.flavor = `'direct vessel to the right of current direction';'beware of momentum';'cannot exceed frame bounds'`;
    env.ACTIONS.special_steerright.details.conditional = `<em>VESSEL</em>::STEER RIGHT`;


    /* - special_floorit - */

    env.ACTIONS.special_floorit.name = `Floor It`;

    env.ACTIONS.special_floorit.usage.act = `%USER FLOORS IT`;

    env.ACTIONS.special_floorit.details.flavor = `'direct vessel to move further instead of attacking'`;
    env.ACTIONS.special_floorit.details.conditional = `<em>VESSEL</em>::GO FASTER`;


    /* - sidearm - */

    env.ACTIONS.sidearm.name = `Sidearm`;
    env.ACTIONS.sidearm.verb = `shoot`;

    env.ACTIONS.sidearm.usage.act = `%USER FIRES AT %TARGET`;
    env.ACTIONS.sidearm.usage.crit = `%TARGET IS LEFT REELING`;
    env.ACTIONS.sidearm.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.sidearm.usage.miss = `%USER MISSES`;

    env.ACTIONS.sidearm.details.flavor = `'utilize high-caliber sidearm';'chance for immense physical trauma'`;
    env.ACTIONS.sidearm.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.sidearm.details.onCrit = `'[STATUS::stun]'`;


    /* - unfocused_shot - */

    env.ACTIONS.unfocused_shot.name = `Hip Shot`;
    env.ACTIONS.unfocused_shot.verb = `shoot`;

    env.ACTIONS.unfocused_shot.usage.act = `%USER FIRES AT %TARGET`;
    env.ACTIONS.unfocused_shot.usage.crit = `%TARGET TAKES A BIG HIT`;
    env.ACTIONS.unfocused_shot.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.unfocused_shot.usage.miss = `%USER MISSES`;

    env.ACTIONS.unfocused_shot.details.flavor = `'fire without intense aim';'could hit';'a gamble'`;
    env.ACTIONS.unfocused_shot.details.onHit = `'[STAT::amt]'`;


    /* - focused_shot - */

    env.ACTIONS.focused_shot.name = `Focused Shot`;
    env.ACTIONS.focused_shot.verb = `shoot`;

    env.ACTIONS.focused_shot.usage.act = `%USER FIRES AT %TARGET`;
    env.ACTIONS.focused_shot.usage.crit = `%TARGET IS TORN APART`;
    env.ACTIONS.focused_shot.usage.hit = `%TARGET TAKES A BIG HIT`;
    env.ACTIONS.focused_shot.usage.miss = `%USER MISSES`;

    env.ACTIONS.focused_shot.details.flavor = `'well-placed high-caliber shot';'immense physical trauma'`;
    env.ACTIONS.focused_shot.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.focused_shot.details.onCrit = `'[STATUS::vulnerable] [STATUS::stun] [STATUS::critical_flaw]'`;


    /* - primary - */

    env.ACTIONS.primary.name = `Attack`;

    env.ACTIONS.primary.usage.act = `%USER ATTACKS %TARGET`;
    env.ACTIONS.primary.usage.crit = `A FRIGHTENING BLOW`;
    env.ACTIONS.primary.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.primary.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.primary.details.flavor = `'improvised attack using scenery';'may stagger target'`;
    env.ACTIONS.primary.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.primary.details.onCrit = `'[STATUS::weakened]'`;


    /* - secondary - */

    env.ACTIONS.secondary.name = `Disarm`;

    env.ACTIONS.secondary.usage.act = `%USER LEAPS AT %TARGET`;
    env.ACTIONS.secondary.usage.crit = `%TARGET IS LEFT REELING`;
    env.ACTIONS.secondary.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.secondary.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.secondary.details.flavor = `'crude strike at weaponry';'attempt to disorient'`;
    env.ACTIONS.secondary.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.secondary.details.onCrit = `'[STATUS::stun]'`;


    /* - daze_lastresort - */

    env.ACTIONS.daze_lastresort.name = `Bash`;

    env.ACTIONS.daze_lastresort.usage.act = `%USER SWINGS AT %TARGET`;
    env.ACTIONS.daze_lastresort.usage.crit = `%TARGET IS LEFT REELING`;
    env.ACTIONS.daze_lastresort.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.daze_lastresort.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.daze_lastresort.details.flavor = `'last resort attack';'swing self'`;
    env.ACTIONS.daze_lastresort.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.daze_lastresort.details.onCrit = `'[STATUS::stun]'`;


    /* - daze_good - */

    env.ACTIONS.daze_good.name = `Throw It`;
    env.ACTIONS.daze_good.verb = `throw at`;

    env.ACTIONS.daze_good.usage.act = `%USER THROWS SOMETHING AT %TARGET`;
    env.ACTIONS.daze_good.usage.crit = `%TARGET IS KNOCKED DOWN`;
    env.ACTIONS.daze_good.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.daze_good.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.daze_good.details.flavor = `'a spirited overhead throw';'likely to stun target with item weight'`;
    env.ACTIONS.daze_good.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.daze_good.details.onCrit = `'[STATUS::stun]'`;


    /* - sacrifice - */

    env.ACTIONS.sacrifice.name = `Offering`;

    env.ACTIONS.sacrifice.usage.act = `%USER PREPARES FOR DESPERATE MEASURES`;

    env.ACTIONS.sacrifice.details.flavor = `'empowers next move greatly';'optionally use HP for revival'`;
    env.ACTIONS.sacrifice.details.onUse = `'[STATUS::sacrifice] [STATUS::evasion]'`;


    /* - special_final_sacrifice - */

    env.ACTIONS.special_final_sacrifice.name = `Final Offering`;

    env.ACTIONS.special_final_sacrifice.usage.act = `%USER GOES IN A BLAZE OF GLORY`;

    env.ACTIONS.special_final_sacrifice.details.flavor = `'extend self beyond limits';'spend own health for total destruction'`;
    env.ACTIONS.special_final_sacrifice.details.onUse = `'[STATUS::evasion] [STATUS::sacrifice]';'[STATUS::empowered] to all allies';'HIT all foes via SPECIAL'`;
    env.ACTIONS.special_final_sacrifice.details.conditional = `<em>SPECIAL::</em>'reduce user HP to 1, dealing 200% lost HP as damage split over living foes (min:1)'`;


    /* - sacrifice_restore - */

    env.ACTIONS.sacrifice_restore.name = `Sacrifice`;
    env.ACTIONS.sacrifice_restore.verb = `sacrifice for`;

    env.ACTIONS.sacrifice_restore.usage.act = `%USER FIXES UP %TARGET`;
    env.ACTIONS.sacrifice_restore.usage.crit = `%TARGET FEELS WAY BETTER`;
    env.ACTIONS.sacrifice_restore.usage.hit = `%TARGET FEELS BETTER`;
    env.ACTIONS.sacrifice_restore.usage.miss = `%TARGET IS TOO SLIPPERY`;

    env.ACTIONS.sacrifice_restore.details.flavor = `'consume health to restore target';'requires offering'`;
    env.ACTIONS.sacrifice_restore.details.onUse = `'[STAT::selfHP] to self'`;
    env.ACTIONS.sacrifice_restore.details.onHit = `'[STAT::amt] [STATUS::regen]'`;
    env.ACTIONS.sacrifice_restore.details.onCrit = `'additional [STAT::amt] [STATUS::regen]'`;
    env.ACTIONS.sacrifice_restore.details.conditional = `<em>VS DOWN::</em>'revive target';'[STATUS::evasion] [STATUS::regen]'`;


    /* - ichor_passive_restore - */

    env.ACTIONS.ichor_passive_restore.name = `Our Last Stand`;

    env.ACTIONS.ichor_passive_restore.usage.act = `%USER PULLS %TARGET BACK UP`;
    env.ACTIONS.ichor_passive_restore.usage.hit = `%TARGET HAS ONE MORE CHANCE`;

    env.ACTIONS.ichor_passive_restore.details.flavor = `'not over yet'`;
    env.ACTIONS.ichor_passive_restore.details.onUse = `'revive target';'[STAT::amt] [STAT::amtBP] [STATUS::evasion] to target'`;


    /* - surge - */

    env.ACTIONS.surge.name = `Surge`;

    env.ACTIONS.surge.usage.act = `%USER IS ENERGIZED`;

    env.ACTIONS.surge.details.onUse = () => `'[STATUS::focused] [STATUS::empowered] [STATUS::surge]'`;
    env.ACTIONS.surge.details.flavor = `'charge forward without worry'`;


    /* - wild_surge - */

    env.ACTIONS.wild_surge.name = `Wild Surge`;

    env.ACTIONS.wild_surge.usage.act = `%USER IS ENERGIZED`;

    env.ACTIONS.wild_surge.details.onUse = `'gain [STATUS::focused] [STATUS::wild_surge]'`;
    env.ACTIONS.wild_surge.details.flavor = `'overexert self for extreme effectiveness';'next targeted action is used across entire team';'exertion causes short stun'`;


    /* - exploit - */

    env.ACTIONS.exploit.name = `Exploit`;

    env.ACTIONS.exploit.usage.act = `%USER REACHES TOWARDS %TARGET`;
    env.ACTIONS.exploit.usage.crit = `%TARGET FALLS APART`;
    env.ACTIONS.exploit.usage.hit = `%TARGET'S FLESH MELTS AWAY`;
    env.ACTIONS.exploit.usage.miss = `%TARGET RESISTS CONTROL`;

    env.ACTIONS.exploit.details.flavor = `'locate or take advantage of vulnerability in foe'`;
    env.ACTIONS.exploit.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.exploit.details.onCrit = `'[STATUS::vulnerable]'`;
    env.ACTIONS.exploit.details.conditional = `<em>VS VULNERABLE::</em>'additional [STAT::amt]'`;


    /* - coordination - */

    env.ACTIONS.coordination.name = `Coordination`;

    env.ACTIONS.coordination.usage.act = `%USER CALLS OUT DIRECTIONS`;

    env.ACTIONS.coordination.details.flavor = `'back off';'guide entire team'`;
    env.ACTIONS.coordination.details.onUse = `'[STATUS::evasion] to self';'[STATUS::focused] to all allies'`;


    /* - plot - */

    env.ACTIONS.plot.name = `Plan`;

    env.ACTIONS.plot.usage.act = `%USER WATCHES CAREFULLY`;

    env.ACTIONS.plot.details.flavor = `'hide vulnerability';'prepare great opportunity'`;
    env.ACTIONS.plot.details.onUse = `'[STATUS::evasion] [STATUS::focused]'`;


    /* - special_enact - */

    env.ACTIONS.special_enact.name = `Enact`;
    env.ACTIONS.special_enact.verb = `enact upon`;

    env.ACTIONS.special_enact.usage.act = `%USER LAUNCHES THEIR ATTACK`;

    env.ACTIONS.special_enact.details.flavor = `'enact plan';'unleash flurry of strikes upon foes'`;
    env.ACTIONS.special_enact.details.onUse = `'use primary on random foe';'consumes 1T:[STATUS::evasion] to repeat use';'cost increases by 1 per repeat';'continues until miss or [STATUS::evasion] is insufficient'<span class="shiftdetail">;'counted as focusing action'</span>`;
    env.ACTIONS.special_enact.details.conditional = `<em>ENACTING::</em>'cannot gain further evasion during execution'`;


    /* - special_fullauto_item - */

    env.ACTIONS.special_fullauto_item.name = `Full Auto`;

    env.ACTIONS.special_fullauto_item.usage.act = `%USER LAUNCHES THEIR ATTACK`;

    env.ACTIONS.special_fullauto_item.details.flavor = `'utilize stored ammunition';'unleash flurry of shots upon foes'`;
    env.ACTIONS.special_fullauto_item.details.onUse = `'shoot at random foes';'consumes 1T:[STATUS::rifle_ammo] to repeat use';'continues until [STATUS::rifle_ammo] is expended'`;
    env.ACTIONS.special_fullauto_item.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.special_fullauto_item.details.onCrit = `'[STATUS::puncture]'`;
    env.ACTIONS.special_fullauto_item.details.conditional = `<em><bst-col>FIRING!!::</bst-col></em>'cannot gain further [STATUS::rifle_ammo] during execution'`;


    /* - scene_fullauto_item - */

    env.ACTIONS.scene_fullauto_item.name = `Full Auto`;

    env.ACTIONS.scene_fullauto_item.usage.act = `%USER LAUNCHES THEIR ATTACK`;

    env.ACTIONS.scene_fullauto_item.details.flavor = `'utilize stored ammunition';'unleash flurry of shots upon foes'`;
    env.ACTIONS.scene_fullauto_item.details.onUse = `'shoot at random foes in area';'consumes 1T:[STATUS::rifle_ammo] to repeat use';'continues until [STATUS::rifle_ammo] is expended'`;
    env.ACTIONS.scene_fullauto_item.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.scene_fullauto_item.details.onCrit = `'[STATUS::puncture]'`;
    env.ACTIONS.scene_fullauto_item.details.conditional = `<em><bst-col>FIRING!!::</bst-col></em>'cannot gain further [STATUS::rifle_ammo] during execution'`;


    /* - fullauto_item_shot - */

    env.ACTIONS.fullauto_item_shot.name = `Full Auto`;

    env.ACTIONS.fullauto_item_shot.usage.act = `%USER OPENS FIRE`;
    env.ACTIONS.fullauto_item_shot.usage.crit = `%TARGET IS EVISCERATED`;
    env.ACTIONS.fullauto_item_shot.usage.hit = `%TARGET BLEEDS SLUDGY CORRU`;
    env.ACTIONS.fullauto_item_shot.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.fullauto_item_shot.details.flavor = `'utilize automatic rifle'`;
    env.ACTIONS.fullauto_item_shot.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.fullauto_item_shot.details.onCrit = `'[STATUS::puncture]'`;


    /* - fullauto_item_shot_scene - */

    env.ACTIONS.fullauto_item_shot_scene.name = `Full Auto`;

    env.ACTIONS.fullauto_item_shot_scene.usage.act = `%USER OPENS FIRE`;
    env.ACTIONS.fullauto_item_shot_scene.usage.crit = `%TARGET IS EVISCERATED`;
    env.ACTIONS.fullauto_item_shot_scene.usage.hit = `%TARGET BLEEDS SLUDGY CORRU`;
    env.ACTIONS.fullauto_item_shot_scene.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.fullauto_item_shot_scene.details.flavor = `'utilize automatic rifle'`;
    env.ACTIONS.fullauto_item_shot_scene.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.fullauto_item_shot_scene.details.onCrit = `'[STATUS::puncture]'`;


    /* - mad_claw - */

    env.ACTIONS.mad_claw.name = `Mad Claw`;
    env.ACTIONS.mad_claw.verb = `claw at`;

    env.ACTIONS.mad_claw.usage.act = `%USER ATTACKS %TARGET`;
    env.ACTIONS.mad_claw.usage.crit = `A FRIGHTENING BLOW`;
    env.ACTIONS.mad_claw.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.mad_claw.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.mad_claw.details.flavor = `'twist what may be grasped';'leave the rest to velzie'`;
    env.ACTIONS.mad_claw.details.onHit = `'[STAT::amt] [STATUS::terror]'`;
    env.ACTIONS.mad_claw.details.conditional = (actor) => {
        let fated = { power: 0 }
        let destabilized = false

        if (actor) {
            fated = getStatus(actor, "fated_light") || fated
            console.log("got fated", fated)
            if (!fated.power && fated.getPower) fated.power = fated.getPower(actor.member)
            console.log("power level", fated.power)
            destabilized = hasStatus(actor, "destabilized")
        }

        let chances = [
            { baseChance: 0.4, chance: (destabilized ? 0.8 : 0.4) + (fated.power * 0.1), effect: "+2 base dmg" },
            { baseChance: 0.3, chance: (destabilized ? 0.6 : 0.3) + (fated.power * 0.1), effect: "invert a positive effect" },
            { baseChance: 0.15, chance: (destabilized ? 0.3 : 0.15) + (fated.power * 0.1), effect: "[STATUS::stun]" },
            { baseChance: 0.1, chance: (destabilized ? 0.2 : 0.1) + (fated.power * 0.1), effect: `use action again on random foe<n-col class='shiftdetail'> (max: 5 times)</n-col>` }
        ]
        if (actor?.base?.slug != "critta_pawn") chances.push({ baseChance: 0.05, chance: (destabilized ? 0.1 : 0.05) + (fated.power * 0.1), effect: "reduce target HP by 75%" })

        let string = `<em>SPECIAL::</em>'chance effects on hit';'doubled if destabilized'`
        chances.forEach(chanceObj => {
            string += `\n<n-col class="${(fated.power || destabilized) ? "modified" : ""}" base="${Math.floor(chanceObj.baseChance * 100)}%">${Math.floor(chanceObj.chance * 100)}%::</n-col>'${chanceObj.effect}'`
        })

        return string
    };


    /* - revise - */

    env.ACTIONS.revise.name = `Revise`;

    env.ACTIONS.revise.usage.act = `%USER GRASPS BEYOND %TARGET`;
    env.ACTIONS.revise.usage.crit = `A FRIGHTENING BLOW`;
    env.ACTIONS.revise.usage.hit = `%TARGET FEELS SOMETHING TORN AWAY`;
    env.ACTIONS.revise.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.revise.details.flavor = `'strike at foes and grasp beyond flesh'`;
    env.ACTIONS.revise.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.revise.details.onCrit = `'<em>invert target's beneficial statuses</em>'`;


    /* - bone_break - */

    env.ACTIONS.bone_break.name = `Bone Break`;

    env.ACTIONS.bone_break.usage.act = `%USER JABS AT %TARGET'S CORE`;
    env.ACTIONS.bone_break.usage.crit = `%TARGET IS CRIPPLED`;
    env.ACTIONS.bone_break.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.bone_break.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.bone_break.details.flavor = `'strike offensive appendages of target';'chance to briefly disorient'`;
    env.ACTIONS.bone_break.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.bone_break.details.onCrit = `'[STATUS::stun]'`;


    /* - special_invite_storm - */

    env.ACTIONS.special_invite_storm.name = `Invite Storm`;

    env.ACTIONS.special_invite_storm.usage.act = `%USER SPEAKS MADNESS`;

    env.ACTIONS.special_invite_storm.details.flavor = `'reveal a terrible truth';'mark self for death'`;
    env.ACTIONS.special_invite_storm.details.onUse = `'[STATUS::destabilized] [STATUS::vulnerable] [STATUS::targeted] [STATUS::terror]';'lose beneficial statuses'`;
    env.ACTIONS.special_invite_storm.details.conditional = (actor) => {
        let fated = { power: 0 }

        if (actor) {
            fated = getStatus(actor, "fated_light") || fated
            if (!fated.power && fated.getPower) fated.power = fated.getPower(actor.member)
        }
        console.log("checking for actor", actor, fated)

        let chances = [
            { baseChance: 0.4, chance: 0.05 + (fated.power * 0.1), effect: "reduce target HP by 75%" }
        ]

        let string = `<em>FOES::</em>'inflict [STATUS::destabilized] or [STATUS::terror] or [STATUS::stun]'\n<em>SPECIAL::</em>'chance effect on hit'`
        chances.forEach(chanceObj => {
            string += `\n<n-col class="${(fated.power) ? "modified" : ""}" base="${chanceObj.baseChance}">${Math.floor(chanceObj.chance * 100)}%::</n-col>'${chanceObj.effect}'`
        })

        return string
    };


    /* - special_invoke_madness - */

    env.ACTIONS.special_invoke_madness.name = `Invoke Madness`;

    env.ACTIONS.special_invoke_madness.usage.act = `%USER SPEAKS MADNESS`;

    env.ACTIONS.special_invoke_madness.details.flavor = `'impart horrific knowledge';'afflict foes with fear and madness'`;
    env.ACTIONS.special_invoke_madness.details.onUse = `'[STATUS::destabilized]';'HIT all foes'`;
    env.ACTIONS.special_invoke_madness.details.onHit = `'[STATUS::fear] [STATUS::madness]'`;
    env.ACTIONS.special_invoke_madness.details.conditional = `<em>SPECIAL::</em>'5% chance to reduce foe HP by 75%'`;


    /* - special_inversion - */

    env.ACTIONS.special_inversion.name = `Inversion`;

    env.ACTIONS.special_inversion.usage.act = `%USER PUSHES AGAINST THEIR REALITY`;

    env.ACTIONS.special_inversion.details.flavor = `'grasp the nature of this place';'recognize and exploit framing device'`;
    env.ACTIONS.special_inversion.details.onUse = `'[STATUS::incoherent]';'invert all statuses currently in play'`;


    /* - attack_weak - */

    env.ACTIONS.attack_weak.name = `Weak Attack`;

    env.ACTIONS.attack_weak.usage.act = `%USER ATTACKS %TARGET`;
    env.ACTIONS.attack_weak.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.attack_weak.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.attack_weak.details.flavor = `'unskilled strike'`;
    env.ACTIONS.attack_weak.details.onHit = `'[STAT::amt]'`;


    /* - enforce - */

    env.ACTIONS.enforce.name = `Enforcement`;

    env.ACTIONS.enforce.usage.act = `%USER STABS %TARGET`;
    env.ACTIONS.enforce.usage.crit = `%USER JUST KEEPS GOING`;
    env.ACTIONS.enforce.usage.hit = `%TARGET BLEEDS SLUDGY CORRU`;
    env.ACTIONS.enforce.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.enforce.details.flavor = `'relentless assault with positioning appendages';'may inspire additional smashing'`;
    env.ACTIONS.enforce.details.onHit = `'[STAT::amt] [STATUS::puncture] [STATUS::open_wound]'`;
    env.ACTIONS.enforce.details.onCrit = `'use this action again'`;


    /* - focused_guard - */

    env.ACTIONS.focused_guard.name = `Intervene`;

    env.ACTIONS.focused_guard.usage.act = `%USER STANDS BEFORE %TARGET`;
    env.ACTIONS.focused_guard.usage.hit = `%TARGET IS SHIELDED BY %USER`;

    env.ACTIONS.focused_guard.details.flavor = `'stand in the way of target';'intercept incoming attack';'prepare to deliver destructive assault'`;
    env.ACTIONS.focused_guard.details.onUse = `'[STATUS::focused] [STATUS::carapace] [STATUS::counter] to self';'[STATUS::redirection] to target'`;


    /* - spikes - */

    env.ACTIONS.spikes.name = `Spikes`;

    env.ACTIONS.spikes.usage.act = `%USER PREPARES TO TAKE A HIT`;

    env.ACTIONS.spikes.details.onUse = `'modify form defensively';'[STATUS::spikes]'`;


    /* - multiply_spikes - */

    env.ACTIONS.multiply_spikes.name = `Multiply Spikes`;

    env.ACTIONS.multiply_spikes.usage.act = `%USER TWISTS HORRIFICALLY`;

    env.ACTIONS.multiply_spikes.details.onUse = `'double amount of currently held [STATUS::spikes]'`;


    /* - siphon - */

    env.ACTIONS.siphon.name = `Siphon`;

    env.ACTIONS.siphon.usage.act = `%USER GRASPS AT %TARGET`;
    env.ACTIONS.siphon.usage.crit = `%TARGET IS INFESTED`;
    env.ACTIONS.siphon.usage.hit = `%TARGET IS INFESTED`;
    env.ACTIONS.siphon.usage.miss = `%TARGET DODGES`;

    env.ACTIONS.siphon.details.flavor = `'tap vital corru of target to sustain allies'`;
    env.ACTIONS.siphon.details.onHit = `'[STATUS::siphon]'`;


    /* - bite - */

    env.ACTIONS.bite.name = `Bite`;

    env.ACTIONS.bite.usage.act = `%USER BITES %TARGET`;
    env.ACTIONS.bite.usage.hit = `%TARGET FEELS HORRIBLE`;

    env.ACTIONS.bite.details.flavor = `'become unreasonable';'transfer illness'`;
    env.ACTIONS.bite.details.onHit = `'[STAT::amt] [STATUS::rot]';'transfer accumulated rot to target'`;


    /* - empower - */

    env.ACTIONS.empower.name = `Empower`;

    env.ACTIONS.empower.usage.act = `%USER AFFIXES SOMETHING TO %TARGET`;
    env.ACTIONS.empower.usage.hit = `%TARGET FEELS STRONGER`;
    env.ACTIONS.empower.usage.miss = `%TARGET IS TOO SLIPPERY`;

    env.ACTIONS.empower.details.flavor = `'grant short-lived performance applicator';'fragile adaptive device'`;
    env.ACTIONS.empower.details.onHit = `'[STATUS::empowered]'`;


    /* - distraction_weak - */

    env.ACTIONS.distraction_weak.name = `Distraction`;

    env.ACTIONS.distraction_weak.usage.act = `%USER FEINTS AND STRIKES %TARGET`;
    env.ACTIONS.distraction_weak.usage.crit = `%USER'S ALLIES ARE INSPIRED`;
    env.ACTIONS.distraction_weak.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.distraction_weak.usage.miss = `%TARGET DODGES`;

    env.ACTIONS.distraction_weak.details.flavor = `'strike with clever feint';'may create distraction'`;
    env.ACTIONS.distraction_weak.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.distraction_weak.details.onCrit = `'[STATUS::evasion] to all allies'`;


    /* - lesser_wound - */

    env.ACTIONS.lesser_wound.name = `Wound`;

    env.ACTIONS.lesser_wound.usage.act = `%USER CHARGES %TARGET`;
    env.ACTIONS.lesser_wound.usage.crit = `%TARGET IS LEFT REELING`;
    env.ACTIONS.lesser_wound.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.lesser_wound.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.lesser_wound.details.flavor = `'focused attack on vitals';'increase pain of target'`;
    env.ACTIONS.lesser_wound.details.onHit = `'[STAT::amt] [STATUS::open_wound]'`;
    env.ACTIONS.lesser_wound.details.onCrit = `'[STATUS::stun]'`;


    /* - wound - */

    env.ACTIONS.wound.name = `Greater Wound`;

    env.ACTIONS.wound.usage.act = `%USER CHARGES %TARGET`;
    env.ACTIONS.wound.usage.crit = `%TARGET IS LEFT REELING`;
    env.ACTIONS.wound.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.wound.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.wound.details.flavor = `'focused attack on vitals';'increase pain of target'`;
    env.ACTIONS.wound.details.onHit = `'[STAT::amt] [STATUS::open_wound]'`;
    env.ACTIONS.wound.details.onCrit = `'[STATUS::stun]'`;


    /* - wound_lastresort - */

    env.ACTIONS.wound_lastresort.name = `Greater Wound`;

    env.ACTIONS.wound_lastresort.usage.act = `%USER CHARGES %TARGET`;
    env.ACTIONS.wound_lastresort.usage.crit = `%TARGET IS LEFT REELING`;
    env.ACTIONS.wound_lastresort.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.wound_lastresort.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.wound_lastresort.details.flavor = `'focused attack on vitals';'increase pain of target';'last resort attack'`;
    env.ACTIONS.wound_lastresort.details.onHit = `'[STAT::amt] [STATUS::open_wound]'`;
    env.ACTIONS.wound_lastresort.details.onCrit = `'[STATUS::stun]'`;


    /* - special_barrier_allies_weak - */

    env.ACTIONS.special_barrier_allies_weak.name = `Quick Cover`;

    env.ACTIONS.special_barrier_allies_weak.usage.act = `%USER SHIELDS THEIR ALLIES`;

    env.ACTIONS.special_barrier_allies_weak.details.flavor = `'apply ablative protection'`;
    env.ACTIONS.special_barrier_allies_weak.details.onUse = () => `'[STAT::amtBP] to nearby allies'`;


    /* - special_carapace_allies - */

    env.ACTIONS.special_carapace_allies.name = `Reinforce`;

    env.ACTIONS.special_carapace_allies.usage.act = `%USER ARMORS THEIR ALLIES`;

    env.ACTIONS.special_carapace_allies.details.flavor = `'adapt allies to incoming attacks'`;
    env.ACTIONS.special_carapace_allies.details.onUse = `'[STATUS::carapace] to all allies'`;


    /* - special_judgement - */

    env.ACTIONS.special_judgement.name = `Continuous Rewrite`;

    env.ACTIONS.special_judgement.usage.act = `%USER TURNS THE MEMORY AGAINST YOU`;

    env.ACTIONS.special_judgement.details.flavor = `'utilize thoughtspace influence to empower massive strike'`;
    env.ACTIONS.special_judgement.details.onUse = `'[STATUS::windup]';'HIT all foes'`;
    env.ACTIONS.special_judgement.details.onHit = `'[STAT::amt] [STATUS::destabilized] [STATUS::terror] [STATUS::malware]'`;


    /* - special_rule - */

    env.ACTIONS.special_rule.name = `Continuous Adjustment`;

    env.ACTIONS.special_rule.usage.act = `%USER SHIFTS THE BALANCE`;

    env.ACTIONS.special_rule.details.flavor = `'utilize status control to empower and repair team';'afflict opponents with critical vulnerabilities'`;
    env.ACTIONS.special_rule.details.conditional = `<em>SELF::'</em>[STATUS::windup]'
<em>ALLIES::</em>'[STAT::amtBP] [STATUS::repairs] [STATUS::empowered]'
<em>FOES::</em>'[STAT::amt] [STATUS::vulnerable] [STATUS::critical_flaw] [STATUS::malware]'`;


    /* - special_chant_mega - */

    env.ACTIONS.special_chant_mega.name = `New Process`;

    env.ACTIONS.special_chant_mega.usage.act = `%USER DRAWS IN RESOURCES`;

    env.ACTIONS.special_chant_mega.details.flavor = `'remove resources from foes to create new daemon processes'`;
    env.ACTIONS.special_chant_mega.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.special_chant_mega.details.onCrit = `'[STATUS::weakened]';'summon +1 IDEA (max:6)'`;


    /* - husk_attack_rot - */

    env.ACTIONS.husk_attack_rot.name = `Psychosis`;

    env.ACTIONS.husk_attack_rot.usage.act = `%USER STINGS %TARGET`;
    env.ACTIONS.husk_attack_rot.usage.crit = `%TARGET BLEEDS A STRANGE COLOR`;
    env.ACTIONS.husk_attack_rot.usage.hit = `%TARGET FEELS STRANGE`;
    env.ACTIONS.husk_attack_rot.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.husk_attack_rot.details.flavor = `'inject memory with destructive thoughts';'eat away at foes from inside'`;
    env.ACTIONS.husk_attack_rot.details.onHit = `'[STAT::amt] [STATUS::rot]'`;
    env.ACTIONS.husk_attack_rot.details.onCrit = `'additional [STATUS::rot]';'[STATUS::terror] to all foes'`;


    /* - special_sillyspawn - */

    env.ACTIONS.special_sillyspawn.name = `Entertainment`;

    env.ACTIONS.special_sillyspawn.details.flavor = `'fetch actors from elsewhere to fight';'strength affected by tension'`;
    env.ACTIONS.special_sillyspawn.details.conditional = `<em>SUMMON::</em>'+1 random foe (max:6), additional +1 if user is damaged at all'`;


    /* - special_sillybuff - */

    env.ACTIONS.special_sillybuff.name = `Entertainment`;

    env.ACTIONS.special_sillybuff.usage.act = `%USER RAISES THE STAKES`;

    env.ACTIONS.special_sillybuff.details.flavor = `'destabilize allies';'attain direct control and focus attack'`;
    env.ACTIONS.special_sillybuff.details.onUse = `'[STATUS::destabilized] [STATUS::focused] [STATUS::focused] to all allies'`;


    /* - special_wallspawn - */

    env.ACTIONS.special_wallspawn.name = `Antithesis`;

    env.ACTIONS.special_wallspawn.details.flavor = `'fetch actors from elsewhere to fight';'strength affected by tension'`;
    env.ACTIONS.special_wallspawn.details.conditional = `<em>SUMMON::</em>'+2 random foes (max:6)'`;


    /* - special_wallspawn_boat - */

    env.ACTIONS.special_wallspawn_boat.name = `Antithesis`;

    env.ACTIONS.special_wallspawn_boat.details.flavor = `'call daemons to assist'`;
    env.ACTIONS.special_wallspawn_boat.details.conditional = `<em>SUMMON::</em>'+2 daemons (max:6)'`;


    /* - boat_clw_windup - */

    env.ACTIONS.boat_clw_windup.name = `Dive`;
    env.ACTIONS.boat_clw_windup.desc = `'prepare to go for the wheel'`;

    env.ACTIONS.boat_clw_windup.usage.act = `%USER CLAWS AT THE CONTROLS!!`;


    /* - special_boat_clw_grab - */

    env.ACTIONS.special_boat_clw_grab.name = `Grab Wheel`;
    env.ACTIONS.special_boat_clw_grab.desc = `'direct vessel in random direction'`;


    /* - special_boat_waveattack - */

    env.ACTIONS.special_boat_waveattack.name = `Grab Wheel`;
    env.ACTIONS.special_boat_waveattack.desc = `'direct vessel in random direction'`;


    /* - special_malware_drill - */

    env.ACTIONS.special_malware_drill.name = `CMD::DRILL`;

    env.ACTIONS.special_malware_drill.usage.act = `THE THOUGHTSPACE FEELS FLIMSY`;

    env.ACTIONS.special_malware_drill.details.flavor = `'alters framing structure'`;
    env.ACTIONS.special_malware_drill.details.onUse = `'[STATUS::malware_drill] to all actors'`;


    /* - special_malware_rot - */

    env.ACTIONS.special_malware_rot.name = `CMD::ROT`;

    env.ACTIONS.special_malware_rot.usage.act = `THE THOUGHTSPACE WRITHES`;

    env.ACTIONS.special_malware_rot.details.flavor = `'alters framing structure'`;
    env.ACTIONS.special_malware_rot.details.onUse = `'[STATUS::malware_rot] to all actors'`;


    /* - special_malware_rewrite - */

    env.ACTIONS.special_malware_rewrite.name = `CMD::REWRITE`;
    env.ACTIONS.special_malware_rewrite.desc = `'invert negative statuses of allies';'invert positive statuses of foes'`;

    env.ACTIONS.special_malware_rewrite.usage.act = `THE THOUGHTSPACE SEEMS BRIGHTER`;

    env.ACTIONS.special_malware_rewrite.details.flavor = `'alters framing structure'`;
    env.ACTIONS.special_malware_rewrite.details.onUse = `'invert all beneficial statuses of foes';'invert all negative statuses of allies'`;


    /* - special_malware_empower - */

    env.ACTIONS.special_malware_empower.name = `CMD::EMPOWER`;
    env.ACTIONS.special_malware_empower.desc = `'imbue allies with empowering thoughts'`;

    env.ACTIONS.special_malware_empower.usage.act = `THE THOUGHTSPACE COWERS BEFORE YOU`;

    env.ACTIONS.special_malware_empower.details.flavor = `'alters framing structure'`;
    env.ACTIONS.special_malware_empower.details.onUse = `'[STATUS::empowered] [STATUS::focused] [STATUS::evasion] to all allies'`;


    /* - intrusive_smash - */

    env.ACTIONS.intrusive_smash.name = `Unnatural Strike`;

    env.ACTIONS.intrusive_smash.usage.act = `%USER CHARGES %TARGET`;
    env.ACTIONS.intrusive_smash.usage.crit = `%TARGET IS LEFT REELING`;
    env.ACTIONS.intrusive_smash.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.intrusive_smash.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.intrusive_smash.details.flavor = `'focused, deadly attack upon one target';'immense physical trauma'"`;
    env.ACTIONS.intrusive_smash.details.onHit = `'[STAT::amt] [STATUS::stun] [STATUS::open_wound] [STATUS::vulnerable] [STATUS::critical_flaw]'`;


    /* - special_intrusive - */

    env.ACTIONS.special_intrusive.name = `Intrude`;

    env.ACTIONS.special_intrusive.usage.act = `A GRIM GAMBLE IS MADE`;

    env.ACTIONS.special_intrusive.details.flavor = `'â«§âª¶ã¥¥ã³'`;
    env.ACTIONS.special_intrusive.details.onUse = `'SSP IN  THE WHEE L LL LL'`;


    /* - special_intrusive_ally - */

    env.ACTIONS.special_intrusive_ally.name = `Gamble`;

    env.ACTIONS.special_intrusive_ally.usage.act = `A GRIM GAMBLE IS MADE`;

    env.ACTIONS.special_intrusive_ally.details.flavor = `'â«§âª¶ã¥¥ã³'`;
    env.ACTIONS.special_intrusive_ally.details.onUse = `'SSP IN  THE WHEE L LL LL'`;


    /* - detonate - */

    env.ACTIONS.detonate.name = `Detonate`;

    env.ACTIONS.detonate.usage.act = `%USER EXPLODES NEAR %TARGET`;
    env.ACTIONS.detonate.usage.hit = `%TARGET IS DESTROYED`;

    env.ACTIONS.detonate.details.flavor = `'detonate to instantly destroy target'`;
    env.ACTIONS.detonate.details.onHit = `'[STAT::amt]';'DOWN SELF'`;
    env.ACTIONS.detonate.details.conditional = `<em>ONCE PER COMBAT</em>`;


    /* - incoherent_mimic - */

    env.ACTIONS.incoherent_mimic.name = `Mimic`;

    env.ACTIONS.incoherent_mimic.usage.act = `%USER MIMICS %TARGET`;
    env.ACTIONS.incoherent_mimic.usage.hit = `%TARGET IS FLATTERED`;

    env.ACTIONS.incoherent_mimic.details.onUse = `'copy actions of target';'persists after combat';'some actions cannot be mimicked'`;


    /* - bomb_plant - */

    env.ACTIONS.bomb_plant.name = `Plant`;

    env.ACTIONS.bomb_plant.usage.act = `%USER ATTACHES SOMETHING TO %TARGET`;
    env.ACTIONS.bomb_plant.usage.crit = `%TARGET IS LEFT REELING`;
    env.ACTIONS.bomb_plant.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.bomb_plant.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.bomb_plant.details.flavor = `'utilize explosives at close range';'but safely'`;
    env.ACTIONS.bomb_plant.details.onUse = `'[STATUS::bomb_planted] to target';'utilize TRIGGER to detonate and HIT actors within radius'`;
    env.ACTIONS.bomb_plant.details.onHit = `'[STAT::amt] [STATUS::stun] [STATUS::puncture] [STAT::kb] from explosive host'`;
    env.ACTIONS.bomb_plant.details.conditional = `<em>VS DESTRUCTIBLE</em>::'additional [STAT::megaHP]';'hits large targets multiple times'
<em>VS PLANTED</em>::'increase radius'`;


    /* - special_bomb_detonate - */

    env.ACTIONS.special_bomb_detonate.name = `Trigger`;

    env.ACTIONS.special_bomb_detonate.usage.act = `%USER DETONATES THE CHARGE!`;
    env.ACTIONS.special_bomb_detonate.usage.crit = `%TARGET IS LEFT REELING`;
    env.ACTIONS.special_bomb_detonate.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.special_bomb_detonate.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.special_bomb_detonate.details.flavor = `'utilize explosives at close range';'but safely'`;
    env.ACTIONS.special_bomb_detonate.details.onUse = `'[STATUS::bomb_planted] to target';'utilize TRIGGER to detonate and HIT actors within radius'`;
    env.ACTIONS.special_bomb_detonate.details.onHit = `'[STAT::amt] [STATUS::stun] [STATUS::puncture] [STAT::kb] from explosive host'`;
    env.ACTIONS.special_bomb_detonate.details.conditional = `<em>VS DESTRUCTIBLE</em>::'additional [STAT::megaHP]';'hits large targets multiple times'
<em>VS PLANTED</em>::'increase radius'`;


    /* - special_bomb_detonate_victim - */

    env.ACTIONS.special_bomb_detonate_victim.name = `Exploding`;

    env.ACTIONS.special_bomb_detonate_victim.usage.act = `%USER EXPLODES`;
    env.ACTIONS.special_bomb_detonate_victim.usage.crit = `%TARGET EXPLODES`;
    env.ACTIONS.special_bomb_detonate_victim.usage.hit = `%TARGET IS CAUGHT IN THE EXPLOSION`;
    env.ACTIONS.special_bomb_detonate_victim.usage.miss = `%TARGET DODGES`;

    env.ACTIONS.special_bomb_detonate_victim.details.onUse = `'explode'`;


    /* - scene_evade - */

    env.ACTIONS.scene_evade.name = `Dash`;

    env.ACTIONS.scene_evade.usage.act = `%USER LOOKS FOR AN OPENING`;

    env.ACTIONS.scene_evade.details.onUse = () => `'[STATUS::focused] [STATUS::evasion]'`;
    env.ACTIONS.scene_evade.details.conditional = `<em>DASH::</em>'<n-col>MOVE</n-col> to targeted location'`;
    env.ACTIONS.scene_evade.details.flavor = `'move quickly';'deliberate on the moment and its opportunities';'vital for survival'`;


    /* - scene_akizet_attack - */

    env.ACTIONS.scene_akizet_attack.name = `Overwhelm`;

    env.ACTIONS.scene_akizet_attack.usage.act = `%USER CHARGES`;
    env.ACTIONS.scene_akizet_attack.usage.crit = `%TARGET IS TORN APART`;
    env.ACTIONS.scene_akizet_attack.usage.hit = `%TARGET IS RENDED`;
    env.ACTIONS.scene_akizet_attack.usage.miss = `%TARGET RECOILS`;

    env.ACTIONS.scene_akizet_attack.details.flavor = `'boldly assault target';'exploit wounds'`;
    env.ACTIONS.scene_akizet_attack.details.onUse = `'move to target';'assault three targets'`;
    env.ACTIONS.scene_akizet_attack.details.onHit = `'[STAT::amt] [STAT::kb]'`;
    env.ACTIONS.scene_akizet_attack.details.onCrit = `'[STATUS::stun]'`;
    env.ACTIONS.scene_akizet_attack.details.conditional = `<o-col>EVISCERATE::</o-col>'removes <n-col class="shiftdetail">up to 5T:</n-col>[STATUS::puncture] for additional damage<n-col class="shiftdetail"> ([STAT::amt] per T)</n-col>'`;


    /* - scene_frenzy - */

    env.ACTIONS.scene_frenzy.name = `Frenzy`;

    env.ACTIONS.scene_frenzy.usage.act = `%USER STABS %TARGET`;
    env.ACTIONS.scene_frenzy.usage.crit = `%USER JUST KEEPS GOING`;
    env.ACTIONS.scene_frenzy.usage.hit = `%TARGET BLEEDS SLUDGY CORRU`;
    env.ACTIONS.scene_frenzy.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.scene_frenzy.details.flavor = `'puncture vital cystic component';'may inspire additional stabbing'`;
    env.ACTIONS.scene_frenzy.details.onHit = `'[STAT::amt] [STATUS::puncture] [STAT::kb]'`;
    env.ACTIONS.scene_frenzy.details.onCrit = `'reuse this action less accurately<n-col class="shiftdetail"> (-15% ACC & CRIT)</n-col>'`;
    env.ACTIONS.scene_frenzy.details.conditional = `<em>PURSUE::</em>'move to target on reuse'`;


    /* - scene_gakvu_attack - */

    env.ACTIONS.scene_gakvu_attack.name = `Scramble`;

    env.ACTIONS.scene_gakvu_attack.usage.act = `%USER TWISTS THE OVERLAP`;

    env.ACTIONS.scene_gakvu_attack.details.flavor = `'disrupt multiple targets with enhanced groundsmindry';'more illegal than before'`;
    env.ACTIONS.scene_gakvu_attack.details.onUse = `'create persistent area effect';'HIT foes who end turn within';'HIT foes who are knocked within'`;
    env.ACTIONS.scene_gakvu_attack.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.scene_gakvu_attack.details.onCrit = `'[STATUS::vulnerable]'`;


    /* - scene_parasite - */

    env.ACTIONS.scene_parasite.name = `Parasite`;
    env.ACTIONS.scene_parasite.verb = `parasitize`;

    env.ACTIONS.scene_parasite.usage.act = `%USER GRASPS AT %TARGET`;
    env.ACTIONS.scene_parasite.usage.crit = `%TARGET IS INFESTED`;
    env.ACTIONS.scene_parasite.usage.hit = `%TARGET IS INFESTED`;
    env.ACTIONS.scene_parasite.usage.miss = `%TARGET DODGES`;

    env.ACTIONS.scene_parasite.details.flavor = `'utilize modified repair tool';'tap vital corru of foes to sustain allies'`;
    env.ACTIONS.scene_parasite.details.onHit = () => "'[STAT::amt] [STATUS::siphon]'";
    env.ACTIONS.scene_parasite.details.onCrit = () => "'infest nearby foes with [STATUS::siphon]'";


    /* - scene_mend - */

    env.ACTIONS.scene_mend.name = `Urgent Mend`;

    env.ACTIONS.scene_mend.usage.act = `%USER RUSHES TO HELP`;
    env.ACTIONS.scene_mend.usage.crit = `%TARGET FEELS WAY BETTER`;
    env.ACTIONS.scene_mend.usage.hit = `%TARGET FEELS BETTER`;

    env.ACTIONS.scene_mend.details.flavor = `'mend allies through use of enhanced tools';'often inspiring'`;
    env.ACTIONS.scene_mend.details.onUse = `'move to location';'HIT allies around target tile'`;
    env.ACTIONS.scene_mend.details.onHit = `'[STAT::amt] [STATUS::regen]'`;
    env.ACTIONS.scene_mend.details.onCrit = `'[STATUS::focused]'`;


    /* - scene_spy - */

    env.ACTIONS.scene_spy.name = `Observe`;

    env.ACTIONS.scene_spy.usage.act = `%USER PROVIDES OPPORTUNITY`;

    env.ACTIONS.scene_spy.details.flavor = `'utilize enhanced spatial awareness';'rapidly analyze local opportunities'`;
    env.ACTIONS.scene_spy.details.onUse = `'create persisting area of observation';'inflict statuses on creation and turn end'`;
    env.ACTIONS.scene_spy.details.conditional = `<em>VS FOE::</em>'inflict [STATUS::vulnerable]'
<em>VS ALLY::</em>'inflict [STATUS::focused]'`;


    /* - scene_miltza_direction - */

    env.ACTIONS.scene_miltza_direction.name = `Direction`;
    env.ACTIONS.scene_miltza_direction.verb = `plan for`;

    env.ACTIONS.scene_miltza_direction.usage.act = `%USER FOCUSES ON %TARGET`;
    env.ACTIONS.scene_miltza_direction.usage.crit = `%USER HAS THE PERFECT PLAN`;
    env.ACTIONS.scene_miltza_direction.usage.hit = `%USER SHARES INSIGHT`;
    env.ACTIONS.scene_miltza_direction.usage.miss = `%TARGET DODGES`;

    env.ACTIONS.scene_miltza_direction.details.flavor = `'coordinate attack or defense'`;
    env.ACTIONS.scene_miltza_direction.details.onUse = `'create persistent area effect around target';'only one may be maintained at a time'`;
    env.ACTIONS.scene_miltza_direction.details.conditional = `<em>VS FOE::</em>'[STATUS::vulnerable]';'[STATUS::critical_flaw] to primary target'
<em>VS ALLY::</em>'[STATUS::evasion]';'[STATUS::counter] to primary target'
<em neutral>AREA::</em>'reapply main effect to all in radius on turn end'`;


    /* - scene_bozko_attack - */

    env.ACTIONS.scene_bozko_attack.name = `Throw Punch`;
    env.ACTIONS.scene_bozko_attack.verb = `jab at`;

    env.ACTIONS.scene_bozko_attack.usage.act = `%USER SWINGS`;
    env.ACTIONS.scene_bozko_attack.usage.crit = `%TARGET IS LEFT REELING`;
    env.ACTIONS.scene_bozko_attack.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.scene_bozko_attack.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.scene_bozko_attack.details.flavor = `'strike with full momentum';'shatter offensive appendages'`;
    env.ACTIONS.scene_bozko_attack.details.onUse = `'move to location';'HIT up to 2 foes ahead'`;
    env.ACTIONS.scene_bozko_attack.details.onHit = `'[STAT::amt] [STATUS::weakened] [STAT::kb]'`;
    env.ACTIONS.scene_bozko_attack.details.onCrit = `'[STATUS::stun]'`;


    /* - scene_guard - */

    env.ACTIONS.scene_guard.name = `Protect`;

    env.ACTIONS.scene_guard.usage.act = `%USER STANDS GUARD`;

    env.ACTIONS.scene_guard.details.onUse = `'[STATUS::carapace] [STATUS::counter]';'remove [STATUS::vulnerable]'`;
    env.ACTIONS.scene_guard.details.conditional = `<em>GUARDING::</em>'[STATUS::redirection] to allies within created area effect'`;


    /* - scene_frontline - */

    env.ACTIONS.scene_frontline.name = `Frontline`;

    env.ACTIONS.scene_frontline.usage.act = `%USER STANDS GUARD`;

    env.ACTIONS.scene_frontline.details.onUse = `'[STATUS::carapace] [STATUS::counter]';'remove [STATUS::vulnerable]'`;
    env.ACTIONS.scene_frontline.details.conditional = `<em>GUARDING::</em>'[STATUS::redirection] to allies within created area effect'`;


    /* - scene_pull - */

    env.ACTIONS.scene_pull.name = `Pull`;

    env.ACTIONS.scene_pull.usage.act = `%USER GRABS AT %TARGET`;
    env.ACTIONS.scene_pull.usage.hit = `%TARGET IS PULLED`;
    env.ACTIONS.scene_pull.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.scene_pull.details.onHit = () => `'self [STATUS::carapace]';'relocate target nearby'`;
    env.ACTIONS.scene_pull.details.conditional = () => "<em>VS ALLY</em>::'guaranteed hit'";


    /* - scene_cavik_attack - */

    env.ACTIONS.scene_cavik_attack.name = `IED`;
    env.ACTIONS.scene_cavik_attack.verb = `throw at`;

    env.ACTIONS.scene_cavik_attack.usage.act = `%USER THROWS A WEIRD CYST AT %TARGET`;
    env.ACTIONS.scene_cavik_attack.usage.crit = `%TARGET EXPLODES`;
    env.ACTIONS.scene_cavik_attack.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.scene_cavik_attack.usage.miss = `%TARGET DODGES`;

    env.ACTIONS.scene_cavik_attack.details.flavor = `'utilize micro-explosive rapidly formed from scavenged dull organs'`;
    env.ACTIONS.scene_cavik_attack.details.onHit = `'[STAT::amt] [STAT::kb]'<span class="shiftdetail">;'knockback only when manually thrown'</span>`;
    env.ACTIONS.scene_cavik_attack.details.conditional = `<em>BURN::</em>'hits reduce length of <n-col class="shiftdetail">most </n-col>positive statuses by 1T'
<em>DECONSTRUCT::</em>'extra [STAT::bonusAmtHP] if target has a [STATUS::bp]'`;


    /* - scene_kavruka - */

    env.ACTIONS.scene_kavruka.name = `Explosive`;
    env.ACTIONS.scene_kavruka.verb = `throw at`;

    env.ACTIONS.scene_kavruka.usage.act = `%USER DEPLOYS A KAVRUKA`;
    env.ACTIONS.scene_kavruka.usage.crit = `%TARGET EXPLODES`;
    env.ACTIONS.scene_kavruka.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.scene_kavruka.usage.miss = `%TARGET DODGES`;

    env.ACTIONS.scene_kavruka.details.flavor = `'utilize volatile deconstruction tool'`;
    env.ACTIONS.scene_kavruka.details.onHit = `'[STAT::amt] [STAT::kb]'`;
    env.ACTIONS.scene_kavruka.details.onCrit = `'[STATUS::stun]'`;
    env.ACTIONS.scene_kavruka.details.conditional = (actor) => actor?.kavrukaLimited ? `<em>DRAWS REMAINING::${actor.kavrukasLeft}</em>` : false;


    /* - scene_miltza_attack - */

    env.ACTIONS.scene_miltza_attack.name = `Guide Drone`;
    env.ACTIONS.scene_miltza_attack.verb = `strike`;

    env.ACTIONS.scene_miltza_attack.usage.act = `%USER guides a small drone to %TARGET!`;

    env.ACTIONS.scene_miltza_attack.details.flavor = `'utilize short range drone to support or suppress target'`;
    env.ACTIONS.scene_miltza_attack.details.onUse = `'[STATUS::drone_haunt] to target ally or foe'`;
    env.ACTIONS.scene_miltza_attack.details.conditional = `<em>VS FOE</em>::'[STAT::amt] to host and nearby [STATUS::vulnerable] foes'
<em>VS ALLY</em>::'50% chance for [STATUS::evasion] to host and nearby allies'`;


    /* - scene_dullflare - */

    env.ACTIONS.scene_dullflare.name = `Dull Flare`;
    env.ACTIONS.scene_dullflare.verb = `blast`;

    env.ACTIONS.scene_dullflare.usage.act = `%USER TEARS OPEN THE DULL`;
    env.ACTIONS.scene_dullflare.usage.crit = `%TARGET IS ANNIHILATED`;
    env.ACTIONS.scene_dullflare.usage.hit = `%TARGET IS SEARED`;
    env.ACTIONS.scene_dullflare.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.scene_dullflare.details.flavor = `'wide directional release of rapidly decaying dull light';'deconstructs foes'`;
    env.ACTIONS.scene_dullflare.details.onHit = `'[STAT::amt] [STAT::kb]'`;


    /* - scene_satik - */

    env.ACTIONS.scene_satik.name = `Apply Armor`;
    env.ACTIONS.scene_satik.verb = `throw at`;

    env.ACTIONS.scene_satik.usage.act = `%USER SHIELDS THEIR ALLIES`;
    env.ACTIONS.scene_satik.usage.hit = `%TARGET GAINS A BARRIER!`;
    env.ACTIONS.scene_satik.usage.miss = `%TARGET DODGES`;

    env.ACTIONS.scene_satik.details.flavor = `'break open satik cyst';'utilize rapid temporary ablative barrier applicators'`;
    env.ACTIONS.scene_satik.details.onUse = () => `'apply up to [STAT::amtBP] to allies within targeted area'`;
    env.ACTIONS.scene_satik.details.conditional = (actor) => actor?.satikCount ? `<em>USES REMAINING::</em>${actor.satikCount}` : false;


    /* - scene_arm_rifle - */

    env.ACTIONS.scene_arm_rifle.name = `LOCK N LOAD`;

    env.ACTIONS.scene_arm_rifle.usage.act = `%USER wields the symbiotic rifle!`;

    env.ACTIONS.scene_arm_rifle.details.flavor = `'prepare to use symbiotic rifle'`;
    env.ACTIONS.scene_arm_rifle.details.onUse = `'[STATUS::rifle_bearer]'`;
    env.ACTIONS.scene_arm_rifle.details.conditional = `<em>SLUDGE VOLLEY</em>::
<em>USE</em>::'[STAT::selfHP] to self';'prepare wide projectile attack in specified direction';'fires on start of next turn'
<em>HIT</em>::'[STAT::amt] [STAT::kb] [STATUS::vulnerable] [STATUS::puncture]'`;


    /* - scene_rifle - */

    env.ACTIONS.scene_rifle.name = `Sludge Volley`;

    env.ACTIONS.scene_rifle.usage.act = `%USER prepares to fire...`;

    env.ACTIONS.scene_rifle.details.flavor = `'utilize symbiotic rifle';'draw from self for munitions'`;
    env.ACTIONS.scene_rifle.details.onUse = `'[STAT::selfHP] to self';'prepare wide projectile attack in specified direction';'fires on start of next turn'`;
    env.ACTIONS.scene_rifle.details.onHit = `'[STAT::amt] [STAT::kb] [STATUS::vulnerable] [STATUS::puncture]'`;


    /* - arch_whelm - */

    env.ACTIONS.arch_whelm.name = `Formless Swipe`;

    env.ACTIONS.arch_whelm.usage.act = `%USER CHARGES AT %TARGET`;
    env.ACTIONS.arch_whelm.usage.crit = `%TARGET IS KNOCKED BACK`;
    env.ACTIONS.arch_whelm.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.arch_whelm.usage.miss = `%TARGET EVADES`;


    /* - special_arch_support - */

    env.ACTIONS.special_arch_support.name = `Coil`;


    /* - special_arch_harasser_stab - */

    env.ACTIONS.special_arch_harasser_stab.name = `Flicker Stab`;


    /* - arch_harasser_stab - */

    env.ACTIONS.arch_harasser_stab.name = `stab`;

    env.ACTIONS.arch_harasser_stab.usage.act = `%USER flickers towards %TARGET`;
    env.ACTIONS.arch_harasser_stab.usage.crit = `%TARGET IS EVISCERATED`;
    env.ACTIONS.arch_harasser_stab.usage.hit = `%TARGET BLEEDS SLUDGY CORRU`;
    env.ACTIONS.arch_harasser_stab.usage.miss = `%TARGET EVADES`;


    /* - arch_punch - */

    env.ACTIONS.arch_punch.name = `Big Punch`;

    env.ACTIONS.arch_punch.usage.act = `%USER SWINGS AT %TARGET`;
    env.ACTIONS.arch_punch.usage.crit = `%TARGET IS KNOCKED BACK`;
    env.ACTIONS.arch_punch.usage.hit = `%TARGET STAGGERS BACK`;
    env.ACTIONS.arch_punch.usage.miss = `%TARGET EVADES`;
    env.ACTIONS.arch_punch.usage.followup = `%USER prepares a followup sweep...`;

    env.ACTIONS.arch_punch.details.flavor = `'focus physical manifestation into fist';'swing heavily'`;
    env.ACTIONS.arch_punch.details.onHit = `'[STAT::amt] [STAT::kb]'`;


    /* - arch_punch_weak - */

    env.ACTIONS.arch_punch_weak.name = `Punch`;

    env.ACTIONS.arch_punch_weak.usage.act = `%USER SWINGS AT %TARGET`;
    env.ACTIONS.arch_punch_weak.usage.crit = `%TARGET IS KNOCKED BACK`;
    env.ACTIONS.arch_punch_weak.usage.hit = `%TARGET STAGGERS BACK`;
    env.ACTIONS.arch_punch_weak.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.arch_punch_weak.details.flavor = `'focus physical manifestation into fist';'swing heavily'`;
    env.ACTIONS.arch_punch_weak.details.onHit = `'[STAT::amt] [STAT::kb]'`;


    /* - arch_bomb - */

    env.ACTIONS.arch_bomb.name = `Dullbomb`;
    env.ACTIONS.arch_bomb.verb = `throw at`;

    env.ACTIONS.arch_bomb.usage.act = `%USER WARPS THE GROUND OMINOUSLY`;


    /* - arch_bomb_spawn - */

    env.ACTIONS.arch_bomb_spawn.name = `Dullbomb`;
    env.ACTIONS.arch_bomb_spawn.verb = `throw at`;

    env.ACTIONS.arch_bomb_spawn.usage.act = `%USER WARPS THE GROUND OMINOUSLY`;

    env.ACTIONS.arch_bomb_spawn.details.flavor = `'generate an unstable whorl between physical and dull planes'`;
    env.ACTIONS.arch_bomb_spawn.details.onUse = `'creates an invincible host to a delayed explosion';'explodes after 1 turn'`;
    env.ACTIONS.arch_bomb_spawn.details.onHit = `'-10%HP'`;


    /* - arch_bomb_spawn_double - */

    env.ACTIONS.arch_bomb_spawn_double.name = `Dullbomb`;
    env.ACTIONS.arch_bomb_spawn_double.verb = `throw at`;

    env.ACTIONS.arch_bomb_spawn_double.usage.act = `%USER WARPS THE GROUND OMINOUSLY`;


    /* - arch_bomb_hit - */

    env.ACTIONS.arch_bomb_hit.name = `IED`;
    env.ACTIONS.arch_bomb_hit.verb = `throw at`;

    env.ACTIONS.arch_bomb_hit.usage.act = `AN EXPLOSIVE DETONATES!`;
    env.ACTIONS.arch_bomb_hit.usage.crit = `%TARGET EXPLODES`;
    env.ACTIONS.arch_bomb_hit.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.arch_bomb_hit.usage.miss = `%TARGET DODGES`;

    env.ACTIONS.arch_bomb_hit.details.onHit = `'[STAT::amt] [STAT::kb]'`;
    env.ACTIONS.arch_bomb_hit.details.onCrit = `'[STATUS::puncture]'`;
    env.ACTIONS.arch_bomb_hit.details.conditional = `<em>NOTICE::</em>'hits allies';'exercise caution
<em>SPECIAL</em>::'if no targets in range, remains on ground';'detonates before next turn'`;


    /* - special_arch_tele_channel - */

    env.ACTIONS.special_arch_tele_channel.name = `Channel`;

    env.ACTIONS.special_arch_tele_channel.usage.act = `%USER BENDS THE OVERLAP`;


    /* - special_arch_tele_sniper - */

    env.ACTIONS.special_arch_tele_sniper.name = `Immaterial Grasp`;

    env.ACTIONS.special_arch_tele_sniper.usage.act = `%USER BENDS THE OVERLAP`;


    /* - arch_tele_snipe_setup - */

    env.ACTIONS.arch_tele_snipe_setup.name = `Torment`;

    env.ACTIONS.arch_tele_snipe_setup.usage.act = `%USER FOCUSES ON %TARGET!`;

    env.ACTIONS.arch_tele_snipe_setup.details.flavor = `'prepare to direct a tendril of the ceremony'`;
    env.ACTIONS.arch_tele_snipe_setup.details.onUse = `'begin [STATUS::aiming] at target';'fires before next turn'`;
    env.ACTIONS.arch_tele_snipe_setup.details.onHit = `'[STAT::amt] [STATUS::terror]'`;


    /* - arch_tele_snipe - */

    env.ACTIONS.arch_tele_snipe.name = `Torment`;

    env.ACTIONS.arch_tele_snipe.usage.act = `%USER DISTORTS TO STRIKE!`;
    env.ACTIONS.arch_tele_snipe.usage.crit = `%TARGET IS ASSAILED!`;
    env.ACTIONS.arch_tele_snipe.usage.hit = `%TARGET STAGGERS BACK`;
    env.ACTIONS.arch_tele_snipe.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.arch_tele_snipe.details.flavor = `'lash out with a directed tendril of the ceremony'`;
    env.ACTIONS.arch_tele_snipe.details.onHit = `'[STAT::amt] [STATUS::terror]'`;


    /* - arch_tele_sweep - */

    env.ACTIONS.arch_tele_sweep.name = `Formless Swipe`;

    env.ACTIONS.arch_tele_sweep.usage.act = `%USER RUSHES TOWARDS %TARGET`;


    /* - tele_arch_hulk_rampage - */

    env.ACTIONS.tele_arch_hulk_rampage.name = `Formless Swipe`;

    env.ACTIONS.tele_arch_hulk_rampage.usage.act = `%USER PREPARES TO CHARGE AT %TARGET`;


    /* - arch_hulk_rampage - */

    env.ACTIONS.arch_hulk_rampage.name = `Wild Strike`;

    env.ACTIONS.arch_hulk_rampage.usage.act = `%USER CHARGES!`;
    env.ACTIONS.arch_hulk_rampage.usage.crit = `%TARGET IS KNOCKED BACK`;
    env.ACTIONS.arch_hulk_rampage.usage.hit = `%TARGET STAGGERS BACK`;
    env.ACTIONS.arch_hulk_rampage.usage.miss = `%TARGET EVADES`;


    /* - arch_pull - */

    env.ACTIONS.arch_pull.name = `Pull`;

    env.ACTIONS.arch_pull.usage.act = `%USER GRABS AT %TARGET`;
    env.ACTIONS.arch_pull.usage.hit = `%TARGET IS PULLED`;
    env.ACTIONS.arch_pull.usage.miss = `%TARGET EVADES`;


    /* - arch_supportdash - */

    env.ACTIONS.arch_supportdash.name = `Repair`;

    env.ACTIONS.arch_supportdash.usage.act = `%USER DASHES TO %TARGET`;
    env.ACTIONS.arch_supportdash.usage.hit = `%TARGET IS REINFORCED`;

    env.ACTIONS.arch_supportdash.details.flavor = `'draw self into the overlap';'return with infinite generosity'`;
    env.ACTIONS.arch_supportdash.details.onUse = `'relocate to target';'HIT all allies in area'`;
    env.ACTIONS.arch_supportdash.details.onHit = `'[STAT::amtBP] [STATUS::repairs]'`;


    /* - special_archivist - */

    env.ACTIONS.special_archivist.name = `Manipulate`;


    /* - special_archivist_spawn - */

    env.ACTIONS.special_archivist_spawn.name = `Formation`;


    /* - special_archivist_maintain - */

    env.ACTIONS.special_archivist_maintain.name = `Formation`;

    env.ACTIONS.special_archivist_maintain.details.flavor = `'direct the flow of resources';'occupy the misguided'`;
    env.ACTIONS.special_archivist_maintain.details.onUse = `'create delayed support field around ally golem';'create delayed attack around target foe'`;
    env.ACTIONS.special_archivist_maintain.details.conditional = `<em>SUPPORT::</em>'[STAT::healHP] [STATUS::regen] to allies';'[STATUS::destabilized] to foes'
<em>ATTACK::</em>'[STAT::amt] [STATUS::stun]';'[STAT::kb] from center'`;


    /* - special_archivist_defense - */

    env.ACTIONS.special_archivist_defense.name = `Last Defense`;


    /* - special_archivist_raise - */

    env.ACTIONS.special_archivist_raise.name = `Instruction`;

    env.ACTIONS.special_archivist_raise.details.flavor = `'form golems from the mass of the ceremony';'defend'`;
    env.ACTIONS.special_archivist_raise.details.onUse = `'leap to ceremony vein';'conjure up to 3 formless masses to replace fallen allies'`;


    /* - special_archivist_ing - */

    env.ACTIONS.special_archivist_ing.name = `Manipulation`;


    /* - special_spine_acquisition - */

    env.ACTIONS.special_spine_acquisition.name = `Acquisition`;
    env.ACTIONS.special_spine_acquisition.desc = `'stand ready';'plan next strikes'`;

    env.ACTIONS.special_spine_acquisition.usage.act = `%USER GUIDES THE ASSAULT`;
    env.ACTIONS.special_spine_acquisition.usage.hit = `ALL EYES TURN TO %TARGET`;
    env.ACTIONS.special_spine_acquisition.usage.defense = `%USER stands defensively...`;

    env.ACTIONS.special_spine_acquisition.details.flavor = `'coordinate a strike across all golems'`;
    env.ACTIONS.special_spine_acquisition.details.onUse = `'[STATUS::counter] to self';'[STATUS::targeted] to target'`;


    /* - archivist_manipulate - */

    env.ACTIONS.archivist_manipulate.name = `Manipulate`;

    env.ACTIONS.archivist_manipulate.usage.act = `%USER REPAIRS %TARGET WITH AN ODD LIGHT`;

    env.ACTIONS.archivist_manipulate.details.flavor = `'misuse dull equipment';'repair and amplify kinetic force of ally';'overcharge and attach to foe to prepare dangerous blast'`;
    env.ACTIONS.archivist_manipulate.details.conditional = (actor) => `<em>VS FOE::</em>'[STATUS::bomb]'\n<em>VS ALLY::</em>'[STAT::amtBP] [STATUS::repairs] [STATUS::focused]'`;


    /* - archivist_lunge - */

    env.ACTIONS.archivist_lunge.name = `Last Invitation`;

    env.ACTIONS.archivist_lunge.usage.act = `%USER LUNGES AT %TARGET`;
    env.ACTIONS.archivist_lunge.usage.crit = `%TARGET IS THROWN AWAY`;
    env.ACTIONS.archivist_lunge.usage.hit = `%TARGET IS KNOCKED BACK`;
    env.ACTIONS.archivist_lunge.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.archivist_lunge.details.flavor = `'guide them by your own claws if you must'`;
    env.ACTIONS.archivist_lunge.details.onUse = `'lunge at target';'prepare delayed follow-up attacks'`;
    env.ACTIONS.archivist_lunge.details.onHit = `'[STAT::amt] [STATUS::vulnerable] [STATUS::puncture]';'[STAT::kb]'`;
    env.ACTIONS.archivist_lunge.details.conditional = `<em>FOLLOW-UP::</em>'[STAT::amt] [STATUS::stun]'`;


    /* - archivist_sweep - */

    env.ACTIONS.archivist_sweep.name = `IED`;
    env.ACTIONS.archivist_sweep.verb = `throw at`;

    env.ACTIONS.archivist_sweep.usage.act = `%USER SWEEPS EVERYONE AWAY!`;
    env.ACTIONS.archivist_sweep.usage.crit = `%TARGET EXPLODES`;
    env.ACTIONS.archivist_sweep.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.archivist_sweep.usage.miss = `%TARGET DODGES`;

    env.ACTIONS.archivist_sweep.details.flavor = `'utilize micro-explosive rapidly formed from scavenged dull organs'`;
    env.ACTIONS.archivist_sweep.details.onHit = `'[STAT::amt] [STAT::kb] from selected tile'`;
    env.ACTIONS.archivist_sweep.details.conditional = `<em>VS BARRIER::</em>'increase damage by [STAT::hpDamBonus]'
<em>SPECIAL::</em>'removes or reduces length of most positive statuses by 1T on HIT'`;


    /* - tele_archivist_rampage - */

    env.ACTIONS.tele_archivist_rampage.name = `Last Invitation`;

    env.ACTIONS.tele_archivist_rampage.usage.act = `%USER PREPARES TO CHARGE AT %TARGET`;


    /* - archivist_charge - */

    env.ACTIONS.archivist_charge.name = `Desperate Charge`;

    env.ACTIONS.archivist_charge.usage.act = `%USER STRIKES %TARGET`;
    env.ACTIONS.archivist_charge.usage.crit = `%TARGET IS LEFT REELING`;
    env.ACTIONS.archivist_charge.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.archivist_charge.usage.miss = `%TARGET EVADES`;


    /* - miltza_charge - */

    env.ACTIONS.miltza_charge.name = `Desperate Charge`;

    env.ACTIONS.miltza_charge.usage.act = `%USER STRIKES %TARGET`;
    env.ACTIONS.miltza_charge.usage.crit = `%TARGET IS LEFT REELING`;
    env.ACTIONS.miltza_charge.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.miltza_charge.usage.miss = `%TARGET EVADES`;


    /* - special_miltza_spy - */

    env.ACTIONS.special_miltza_spy.name = `Infinite Eyes`;

    env.ACTIONS.special_miltza_spy.usage.act = `%USER OBSERVES THE AREA...`;

    env.ACTIONS.special_miltza_spy.details.flavor = ``;
    env.ACTIONS.special_miltza_spy.details.onUse = `'create delayed <o-col>TERRORIZE</o-col> areas';'manifest on next turn'`;
    env.ACTIONS.special_miltza_spy.details.conditional = `<em><o-col>TERRORIZE</o-col></em>::'[STATUS::terror] to foes within'`;


    /* - lastresort_split_jump - */

    env.ACTIONS.lastresort_split_jump.name = `Leap`;

    env.ACTIONS.lastresort_split_jump.usage.act = `%USER LOOKS FOR AN OPENING`;

    env.ACTIONS.lastresort_split_jump.details.onUse = () => `'relocate near target unnaturally'`;


    /* - spine_golem_lunge - */

    env.ACTIONS.spine_golem_lunge.name = `Ethereal Lunge`;

    env.ACTIONS.spine_golem_lunge.usage.act = `%USER LUNGES AT %TARGET`;
    env.ACTIONS.spine_golem_lunge.usage.crit = `%TARGET IS THROWN AWAY`;
    env.ACTIONS.spine_golem_lunge.usage.hit = `%TARGET IS KNOCKED BACK`;
    env.ACTIONS.spine_golem_lunge.usage.miss = `%TARGET EVADES`;


    /* - opportunity - */

    env.ACTIONS.opportunity.name = `Opportunity`;

    env.ACTIONS.opportunity.usage.act = `%USER COILS, READY TO STRIKE...`;

    env.ACTIONS.opportunity.details.onUse = () => `'[STATUS::opportunity] to self'`;
    env.ACTIONS.opportunity.details.flavor = `'stand ready to strike at the slightest movement'`;


    /* - opportunity_archivist - */

    env.ACTIONS.opportunity_archivist.name = `Opportunity`;

    env.ACTIONS.opportunity_archivist.usage.act = `%USER PREPARES TO STRIKE ANY WHO DRAW NEAR`;

    env.ACTIONS.opportunity_archivist.details.onUse = () => `'[STATUS::opportunity]'`;
    env.ACTIONS.opportunity_archivist.details.flavor = `'deliberate on the moment and its opportunities'`;


    /* - spine_golem_jab - */

    env.ACTIONS.spine_golem_jab.name = `Forceful Jab`;

    env.ACTIONS.spine_golem_jab.usage.act = `%USER LUNGES AT %TARGET`;
    env.ACTIONS.spine_golem_jab.usage.crit = `%TARGET IS THROWN AWAY`;
    env.ACTIONS.spine_golem_jab.usage.hit = `%TARGET IS KNOCKED BACK`;
    env.ACTIONS.spine_golem_jab.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.spine_golem_jab.details.flavor = `'focused and deadly jab';'opens for follow-up attacks'`;
    env.ACTIONS.spine_golem_jab.details.onHit = `'[STAT::amt] [STAT::kb]'`;


    /* - special_tele_splitbeam - */

    env.ACTIONS.special_tele_splitbeam.name = `Eyebeam`;

    env.ACTIONS.special_tele_splitbeam.usage.act = `the ground shimmers ominously...`;


    /* - splitbeam_hit - */

    env.ACTIONS.splitbeam_hit.name = `splitbeam`;

    env.ACTIONS.splitbeam_hit.usage.act = `the space writhes with hostility!`;


    /* - special_heart_parasite_old - */

    env.ACTIONS.special_heart_parasite_old.name = `Flood`;

    env.ACTIONS.special_heart_parasite_old.usage.act = `unfamiliar shapes writhe beyond the threshold`;


    /* - special_heart_parasite - */

    env.ACTIONS.special_heart_parasite.name = `Thrash`;

    env.ACTIONS.special_heart_parasite.details.flavor = `'draw from all available resources';'by any means necessary'`;
    env.ACTIONS.special_heart_parasite.details.onUse = `'prepares delayed effects';'[STAT::kb] against foes';'mark region to <f-col>INFEST</f-col>';'conjure tendril allies (MAX:4)'`;
    env.ACTIONS.special_heart_parasite.details.conditional = `<em>INFESTATION::</em>'[STAT::amt] [STATUS::siphon] to foes on affected tiles'`;


    /* - heart_tendril_pull - */

    env.ACTIONS.heart_tendril_pull.name = `Pull`;

    env.ACTIONS.heart_tendril_pull.usage.act = `%USER GRABS AT %TARGET`;
    env.ACTIONS.heart_tendril_pull.usage.hit = `%TARGET IS PULLED`;
    env.ACTIONS.heart_tendril_pull.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.heart_tendril_pull.details.onHit = () => `'[STAT::amt]';'pull target 1 step closer'`;


    /* - heart_tendril_swipe - */

    env.ACTIONS.heart_tendril_swipe.name = `Swipe`;

    env.ACTIONS.heart_tendril_swipe.usage.act = `%USER LUNGES AT %TARGET`;
    env.ACTIONS.heart_tendril_swipe.usage.crit = `%TARGET IS THROWN AWAY`;
    env.ACTIONS.heart_tendril_swipe.usage.hit = `%TARGET IS KNOCKED BACK`;
    env.ACTIONS.heart_tendril_swipe.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.heart_tendril_swipe.details.flavor = `'unwieldy punch';'opens for follow-up attacks'`;
    env.ACTIONS.heart_tendril_swipe.details.onHit = `'[STAT::amt]'`;


    /* - tele_heart_tendril_square - */

    env.ACTIONS.tele_heart_tendril_square.name = `Spin Swipe`;

    env.ACTIONS.tele_heart_tendril_square.usage.act = `%USER REARS BACK...`;


    /* - tele_heart_tendril_plus - */

    env.ACTIONS.tele_heart_tendril_plus.name = `Slam`;

    env.ACTIONS.tele_heart_tendril_plus.usage.act = `%USER REARS BACK...`;


    /* - tele_heart_siphon - */

    env.ACTIONS.tele_heart_siphon.name = `Siphon`;

    env.ACTIONS.tele_heart_siphon.usage.act = `%USER PREPARES TO DRAW FROM THE HEART...`;


    /* - special_heart_siphon - */

    env.ACTIONS.special_heart_siphon.name = `Siphon`;

    env.ACTIONS.special_heart_siphon.usage.act = `%USER channels spireblood into the parasite!`;

    env.ACTIONS.special_heart_siphon.details.flavor = `'siphon spireblood from the heart above';'or below?'`;
    env.ACTIONS.special_heart_siphon.details.onUse = `'[STAT::amt] [STATUS::regen] to main parasite';'[STAT::selfHP] to self'`;
    env.ACTIONS.special_heart_siphon.details.conditional = `<em>4 SIPHONS STAND::</em>'additional [STAT::amt] to main parasite'`;


    /* - special_heartwall - */

    env.ACTIONS.special_heartwall.name = `Flood`;

    env.ACTIONS.special_heartwall.usage.act = `formless shapes emerge from the tendril!`;


    /* - special_split_advancer - */

    env.ACTIONS.special_split_advancer.name = `Flood`;

    env.ACTIONS.special_split_advancer.usage.act = `the distortion grows closer...`;

    env.ACTIONS.special_split_advancer.details.flavor = `'divert attention from the ceremony';'seize this opportunity to halt the misguided'`;
    env.ACTIONS.special_split_advancer.details.onUse = `'press forward and <o-col>DISTORT</o-col> tiles based on distance';'conjure allies to strike'`;
    env.ACTIONS.special_split_advancer.details.conditional = `<em><o-col>GRASPING DISTORTION::</o-col></em>'[STAT::amt] [STAT::kb] towards distortion'`;


    /* - formless_pull - */

    env.ACTIONS.formless_pull.name = `Pull`;

    env.ACTIONS.formless_pull.usage.act = `%USER GRABS AT %TARGET`;
    env.ACTIONS.formless_pull.usage.hit = `%TARGET IS PULLED`;
    env.ACTIONS.formless_pull.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.formless_pull.details.onHit = () => `'[STAT::amt] [STATUS::terror]';'[STAT::kb] towards user'`;


    /* - special_dozka_knock - */

    env.ACTIONS.special_dozka_knock.name = `Flood`;

    env.ACTIONS.special_dozka_knock.usage.act = `unfamiliar shapes writhe beyond the threshold`;

    env.ACTIONS.special_dozka_knock.details.flavor = `'utilize dull leverage to throw the misguided off-balance'`;
    env.ACTIONS.special_dozka_knock.details.onUse = `'prepares delayed directional effect';'[STAT::kb] against foes'`;


    /* - itzil_split - */

    env.ACTIONS.itzil_split.name = `Veilksplitter`;
    env.ACTIONS.itzil_split.verb = `veilksplit`;

    env.ACTIONS.itzil_split.usage.act = `%USER PREPARES TO FIRE AT %TARGET`;

    env.ACTIONS.itzil_split.details.flavor = `'utilize dull-enabled cutting beam'`;
    env.ACTIONS.itzil_split.details.onUse = `'guaranteed HIT'`;
    env.ACTIONS.itzil_split.details.onHit = () => `'[STAT::amt] [STATUS::stun]'${env?.rpg?.is2D ? ";'[STAT::kb]'" : ''}`;


    /* - tele_veilksplitter - */

    env.ACTIONS.tele_veilksplitter.name = `Splitter Combo`;
    env.ACTIONS.tele_veilksplitter.verb = `blast`;

    env.ACTIONS.tele_veilksplitter.usage.act = `%USER SWINGS AT %TARGET`;
    env.ACTIONS.tele_veilksplitter.usage.crit = `%TARGET IS STAGGERED`;
    env.ACTIONS.tele_veilksplitter.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.tele_veilksplitter.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.tele_veilksplitter.details.flavor = `'utilize supercharged cutting-beam'`;
    env.ACTIONS.tele_veilksplitter.details.onUse = `'attempt to HIT target';'prepare follow-up attack'`;
    env.ACTIONS.tele_veilksplitter.details.onHit = `'[STAT::amt] [STATUS::terror]';'[STAT::kb]'`;
    env.ACTIONS.tele_veilksplitter.details.conditional = `<em>FOLLOW-UP::</em>'[STAT::followupHP] [STATUS::stun]';'[STAT::followupKB]'`;


    /* - tele_dullpulse - */

    env.ACTIONS.tele_dullpulse.name = `Dull Combo`;
    env.ACTIONS.tele_dullpulse.verb = `blast`;

    env.ACTIONS.tele_dullpulse.usage.act = `%USER SWINGS AT %TARGET`;
    env.ACTIONS.tele_dullpulse.usage.crit = `%TARGET IS STAGGERED`;
    env.ACTIONS.tele_dullpulse.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.tele_dullpulse.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.tele_dullpulse.details.flavor = `'utilize altered weaponry';'tear overlap apart briefly'`;
    env.ACTIONS.tele_dullpulse.details.onUse = `'attempt to HIT target';'prepare follow-up attack'`;
    env.ACTIONS.tele_dullpulse.details.onHit = `'[STAT::amt] [STATUS::terror]';'[STAT::kb]'`;
    env.ACTIONS.tele_dullpulse.details.conditional = `<em>FOLLOW-UP::</em>'[STAT::followupHP] [STAT::followupKB]'`;


    /* - special_tele_itzil - */

    env.ACTIONS.special_tele_itzil.name = `Huge Pulse`;

    env.ACTIONS.special_tele_itzil.usage.act = `%USER's gauntlets glow brightly...`;


    /* - special_tele_kivii - */

    env.ACTIONS.special_tele_kivii.name = `Multislam`;

    env.ACTIONS.special_tele_kivii.usage.act = `%USER readies two claws...`;


    /* - special_kivii_summon - */

    env.ACTIONS.special_kivii_summon.name = `Multislam`;

    env.ACTIONS.special_kivii_summon.usage.act = `%USER readies two claws...`;

    env.ACTIONS.special_kivii_summon.details.flavor = `'draw upon memory'`;
    env.ACTIONS.special_kivii_summon.details.onUse = `'summon two gauntlets';'grant [STATUS::aiming] to strike next turn'`;
    env.ACTIONS.special_kivii_summon.details.onHit = `'[STAT::amt] [STATUS::terror] [STAT::kb]'`;


    /* - scene_kivii_punch - */

    env.ACTIONS.scene_kivii_punch.name = `Spectral Swing`;
    env.ACTIONS.scene_kivii_punch.verb = `swing at`;

    env.ACTIONS.scene_kivii_punch.usage.act = `%USER SWINGS AT %TARGET`;
    env.ACTIONS.scene_kivii_punch.usage.crit = `A DEVASTATING IMPACT`;
    env.ACTIONS.scene_kivii_punch.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.scene_kivii_punch.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.scene_kivii_punch.details.flavor = `'launch into a self destructive slam'`;
    env.ACTIONS.scene_kivii_punch.details.onHit = `'[STAT::amt] [STATUS::terror] [STAT::kb]'`;


    /* - scene_kivii_smash - */

    env.ACTIONS.scene_kivii_smash.name = `Assault`;

    env.ACTIONS.scene_kivii_smash.usage.act = `%USER SMASHES %TARGET`;
    env.ACTIONS.scene_kivii_smash.usage.crit = `%TARGET IS LEFT REELING`;
    env.ACTIONS.scene_kivii_smash.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.scene_kivii_smash.usage.miss = `%TARGET EVADES`;


    /* - special_itzka - */

    env.ACTIONS.special_itzka.name = `Overlap Collapse`;

    env.ACTIONS.special_itzka.usage.act = `The overlap bends inwards!!`;


    /* - scene_bozko_attack_desperation - */

    env.ACTIONS.scene_bozko_attack_desperation.name = `Sweep`;
    env.ACTIONS.scene_bozko_attack_desperation.verb = `swing at`;

    env.ACTIONS.scene_bozko_attack_desperation.usage.act = `%USER SWINGS`;
    env.ACTIONS.scene_bozko_attack_desperation.usage.crit = `%TARGET IS THROWN AWAY`;
    env.ACTIONS.scene_bozko_attack_desperation.usage.hit = `%TARGET IS STAGGERED`;
    env.ACTIONS.scene_bozko_attack_desperation.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.scene_bozko_attack_desperation.details.flavor = `'strike with full momentum';'shatter offensive appendages'`;
    env.ACTIONS.scene_bozko_attack_desperation.details.onUse = `'move to location';'HIT foes in wide area ahead'`;
    env.ACTIONS.scene_bozko_attack_desperation.details.onHit = `'[STAT::amt] [STATUS::weakened] [STAT::kb]`;
    env.ACTIONS.scene_bozko_attack_desperation.details.onCrit = `'[STATUS::stun]'`;


    /* - scene_cavik_attack_desperation - */

    env.ACTIONS.scene_cavik_attack_desperation.name = `Dull Beam`;

    env.ACTIONS.scene_cavik_attack_desperation.usage.act = `%USER prepares to fire...`;

    env.ACTIONS.scene_cavik_attack_desperation.details.flavor = `'utilize modified and twisted dull golem claw';'fire wave of destabilizing dull light after delay'`;
    env.ACTIONS.scene_cavik_attack_desperation.details.onUse = `'prepare attack in specified direction';'fires on start of next turn'`;
    env.ACTIONS.scene_cavik_attack_desperation.details.onHit = `'[STAT::amt] [STAT::kb] [STATUS::destabilized]'`;


    /* - scene_gakvu_attack_desperation - */

    env.ACTIONS.scene_gakvu_attack_desperation.name = `Scramble`;

    env.ACTIONS.scene_gakvu_attack_desperation.usage.act = `%USER TWISTS THE OVERLAP`;

    env.ACTIONS.scene_gakvu_attack_desperation.details.flavor = `disrupt overlap with groundsmindry`;
    env.ACTIONS.scene_gakvu_attack_desperation.details.onUse = `'create persistent area effect';'HIT foes who enter or are knocked within'`;
    env.ACTIONS.scene_gakvu_attack_desperation.details.onHit = `'distort corrucystic flesh for [STAT::amt]'`;
    env.ACTIONS.scene_gakvu_attack_desperation.details.onCrit = `'reveal weakness';'inflict [STATUS::vulnerable]'`;


    /* - tele_directbeam - */

    env.ACTIONS.tele_directbeam.name = `Dull Blast`;
    env.ACTIONS.tele_directbeam.verb = `blast`;

    env.ACTIONS.tele_directbeam.usage.act = `%USER AIMS AT %TARGET`;

    env.ACTIONS.tele_directbeam.details.flavor = `'utilize dull-enabled cutting beam'`;
    env.ACTIONS.tele_directbeam.details.onUse = `'begin [STATUS::aiming] at target';'fire before next turn'`;
    env.ACTIONS.tele_directbeam.details.onHit = () => `'[STAT::amt] [STATUS::stun]'${env?.rpg?.is2D ? ";'[STAT::kb]'" : ''}`;


    /* - special_eye_pt1 - */

    env.ACTIONS.special_eye_pt1.name = `Ritual`;

    env.ACTIONS.special_eye_pt1.usage.act = `unfamiliar shapes writhe beyond the threshold`;

    env.ACTIONS.special_eye_pt1.details.flavor = ``;
    env.ACTIONS.special_eye_pt1.details.onUse = `'prepares delayed effects';'[STAT::kb] against foes';'conjure 5 entities with [STATUS::aiming] to strike'`;
    env.ACTIONS.special_eye_pt1.details.conditional = `<em>AIMED ATTACK::</em>'[STAT::amt] [STATUS::stun]';'[STAT::kb] in aiming direction'`;


    /* - special_vekoa_rush_ing - */

    env.ACTIONS.special_vekoa_rush_ing.name = `Rush`;

    env.ACTIONS.special_vekoa_rush_ing.usage.act = `%USER LOOKS FOR AN OPENING`;

    env.ACTIONS.special_vekoa_rush_ing.details.flavor = `'move quickly';'overexert cognitive facilities';'consider all immediate possibilities'`;
    env.ACTIONS.special_vekoa_rush_ing.details.onUse = `'[STATUS::evasion] [STATUS::focused]';'relocate to opponent'`;


    /* - special_eye - */

    env.ACTIONS.special_eye.name = `Ritual`;

    env.ACTIONS.special_eye.usage.act = `unfamiliar shapes writhe beyond the threshold`;

    env.ACTIONS.special_eye.details.onUse = `'disrupt the space unpredictably';'intensifies as veins are broken'`;


    /* - tele_tendril_swipe - */

    env.ACTIONS.tele_tendril_swipe.name = `swipe`;

    env.ACTIONS.tele_tendril_swipe.usage.act = `%USER rears back...`;


    /* - special_tendril_slam - */

    env.ACTIONS.special_tendril_slam.name = `Tendril Slam`;

    env.ACTIONS.special_tendril_slam.usage.act = `%USER stretches up into the overlap...`;


    /* - special_wall_undulate - */

    env.ACTIONS.special_wall_undulate.name = `undulate`;

    env.ACTIONS.special_wall_undulate.usage.act = `%USER splits off offensive limbs...`;


    /* - special_tele_golemblast - */

    env.ACTIONS.special_tele_golemblast.name = `Aimed Blast`;

    env.ACTIONS.special_tele_golemblast.usage.act = `%USER takes aim...`;


    /* - tele_enraged_rampage - */

    env.ACTIONS.tele_enraged_rampage.name = `Enraged Charge`;

    env.ACTIONS.tele_enraged_rampage.usage.act = `%USER PREPARES TO CHARGE AT %TARGET`;


    /* - vekfight_assault - */

    env.ACTIONS.vekfight_assault.name = `Assault`;

    env.ACTIONS.vekfight_assault.usage.act = `%USER CHARGES %TARGET`;
    env.ACTIONS.vekfight_assault.usage.crit = `%TARGET IS LEFT REELING`;
    env.ACTIONS.vekfight_assault.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.vekfight_assault.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.vekfight_assault.details.flavor = `'strike with mutual ferocity'`;
    env.ACTIONS.vekfight_assault.details.onUse = `'move to closest open tile near target if not adjacent';'prepare follow-up attack'`;
    env.ACTIONS.vekfight_assault.details.onHit = `'[STAT::amt] [STATUS::vulnerable] [STAT::kb]'`;
    env.ACTIONS.vekfight_assault.details.onCrit = `'[STATUS::terror]'`;
    env.ACTIONS.vekfight_assault.details.conditional = `<em>FOLLOW-UP::</em>'frenzied triple attack';'cease on miss';'[STAT::additionalHP] [STATUS::terror]';'[STAT::additionalKB]'`;


    /* - vekfight_frenzy - */

    env.ACTIONS.vekfight_frenzy.name = `Furious Flurry`;

    env.ACTIONS.vekfight_frenzy.usage.act = `%USER stabs at %TARGET`;
    env.ACTIONS.vekfight_frenzy.usage.crit = `A FRIGHTENING BLOW`;
    env.ACTIONS.vekfight_frenzy.usage.hit = `%TARGET's flesh distorts...`;
    env.ACTIONS.vekfight_frenzy.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.vekfight_frenzy.details.flavor = `'utilize sharpened limbs in agile flurry'`;
    env.ACTIONS.vekfight_frenzy.details.onUse = `'use this action up to three times on target';'cease on miss';'prepare follow-up attack'`;
    env.ACTIONS.vekfight_frenzy.details.onHit = `'[STAT::amt] [STATUS::terror]'`;
    env.ACTIONS.vekfight_frenzy.details.conditional = `<em>FOLLOW-UP::</em>'[STAT::additionalHP] [STATUS::terror]';'pull 1 step closer'`;


    /* - vekfight_rush - */

    env.ACTIONS.vekfight_rush.name = `Rush`;

    env.ACTIONS.vekfight_rush.usage.act = `%USER LOOKS FOR AN OPENING`;

    env.ACTIONS.vekfight_rush.details.flavor = `'move quickly';'overexert cognitive facilities';'consider all immediate possibilities'`;
    env.ACTIONS.vekfight_rush.details.onUse = `'[STATUS::hyperfocus]';'move to target location';'select current tile to avoid movement'`;


    /* - special_eye_boss - */

    env.ACTIONS.special_eye_boss.name = `Epicenter`;

    env.ACTIONS.special_eye_boss.usage.act = `The epicenter pulses chaotically...`;


    /* - eyeboss_hit - */

    env.ACTIONS.eyeboss_hit.name = `Dull Pillar`;

    env.ACTIONS.eyeboss_hit.usage.act = `%TARGET is struck by stray dull light!`;


    /* - special_epicenter - */

    env.ACTIONS.special_epicenter.name = `projtest`;
    env.ACTIONS.special_epicenter.desc = `'projectile test'`;

    env.ACTIONS.special_epicenter.usage.act = `bewewaaawaaaaweawa!!!!`;


    /* - vekoa_swipe - */

    env.ACTIONS.vekoa_swipe.name = `Assault`;

    env.ACTIONS.vekoa_swipe.usage.act = `%USER CHARGES %TARGET`;
    env.ACTIONS.vekoa_swipe.usage.crit = `%TARGET IS LEFT REELING`;
    env.ACTIONS.vekoa_swipe.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.vekoa_swipe.usage.miss = `%TARGET EVADES`;


    /* - special_vekoa_rush - */

    env.ACTIONS.special_vekoa_rush.name = `Rush`;

    env.ACTIONS.special_vekoa_rush.usage.act = `%USER LOOKS FOR AN OPENING`;

    env.ACTIONS.special_vekoa_rush.details.flavor = `'move quickly';'overexert cognitive facilities';'consider all immediate possibilities'`;
    env.ACTIONS.special_vekoa_rush.details.onUse = `'[STATUS::hyperfocus]';'move to target location';'select current tile to avoid movement'`;


    /* - tele_vekoa_rampage - */

    env.ACTIONS.tele_vekoa_rampage.name = `Last Invitation`;

    env.ACTIONS.tele_vekoa_rampage.usage.act = `%USER PREPARES TO CHARGE AT %TARGET`;


    /* - special_golem_frenzy - */

    env.ACTIONS.special_golem_frenzy.name = `Terrible Frenzy`;

    env.ACTIONS.special_golem_frenzy.usage.act = `%USER STRIKES ERRATICALLY`;

    env.ACTIONS.special_golem_frenzy.details.flavor = `'utilize automatic rifle';'rapid inaccurate attacks'`;
    env.ACTIONS.special_golem_frenzy.details.onUse = `'HIT random foes 6 times'`;
    env.ACTIONS.special_golem_frenzy.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.special_golem_frenzy.details.onCrit = `'[STATUS::puncture]'`;


    /* - listener_signal_echo - */

    env.ACTIONS.listener_signal_echo.name = `Echo`;
    env.ACTIONS.listener_signal_echo.desc = `'todo'`;


    /* - container_exploder - */

    env.ACTIONS.container_exploder.name = `Kavruka Toss`;
    env.ACTIONS.container_exploder.verb = `throw at`;

    env.ACTIONS.container_exploder.usage.act = `%USER THROWS A KAVRUKA AT %TARGET`;
    env.ACTIONS.container_exploder.usage.crit = `A BLAST SWEEPS THE TEAM`;
    env.ACTIONS.container_exploder.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.container_exploder.usage.miss = `%TARGET DODGES`;

    env.ACTIONS.container_exploder.details.flavor = `'clumsily throw explosive device';'chance for greater explosion'`;
    env.ACTIONS.container_exploder.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.container_exploder.details.onCrit = () => `'HIT all foes for [STAT::amtLesser]'${page.name == "frame" ? `;'additional hits do not trigger on-hit effects'` : ``}`;


    /* - special_container_exploder_malfunction - */

    env.ACTIONS.special_container_exploder_malfunction.name = `Kavruka Fumble`;

    env.ACTIONS.special_container_exploder_malfunction.usage.act = `%USER FUMBLES A KAVRUKA`;

    env.ACTIONS.special_container_exploder_malfunction.details.flavor = `'utilize volatile deconstruction tool'`;
    env.ACTIONS.special_container_exploder_malfunction.details.onUse = `'HIT all foes'`;
    env.ACTIONS.special_container_exploder_malfunction.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.special_container_exploder_malfunction.details.onCrit = `'[STATUS::stun]'`;


    /* - container_evader - */

    env.ACTIONS.container_evader.name = `Evasive Attack`;

    env.ACTIONS.container_evader.usage.act = `%USER ATTACKS %TARGET`;
    env.ACTIONS.container_evader.usage.crit = `A FRIGHTENING BLOW`;
    env.ACTIONS.container_evader.usage.hit = `%USER SKITTERS AWAY`;
    env.ACTIONS.container_evader.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.container_evader.details.flavor = `'improvise'`;
    env.ACTIONS.container_evader.details.onHit = `'[STAT::amt]'`;


    /* - container_evader_malfunction - */

    env.ACTIONS.container_evader_malfunction.name = `Malfunction`;
    env.ACTIONS.container_evader_malfunction.desc = `'suffer from internal deterioration'`;

    env.ACTIONS.container_evader_malfunction.usage.act = `%USER STUMBLES AROUND`;


    /* - special_container_spy_malfunction - */

    env.ACTIONS.special_container_spy_malfunction.name = `Malfunction`;
    env.ACTIONS.special_container_spy_malfunction.desc = `'suffer from internal deterioration'`;

    env.ACTIONS.special_container_spy_malfunction.usage.act = `%USER CASTS ITS GAZE RANDOMLY`;


    /* - container_sfer - */

    env.ACTIONS.container_sfer.name = `Charge`;

    env.ACTIONS.container_sfer.usage.act = `%USER CHARGES %TARGET`;
    env.ACTIONS.container_sfer.usage.crit = `%TARGET IS LEFT REELING`;
    env.ACTIONS.container_sfer.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.container_sfer.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.container_sfer.details.onHit = `'boldly assault for [STAT::amt]'`;
    env.ACTIONS.container_sfer.details.onCrit = `'inflict immense physical trauma';'[STATUS::stun]'`;


    /* - attendant_counter - */

    env.ACTIONS.attendant_counter.name = `Counter`;
    env.ACTIONS.attendant_counter.desc = `'stand ready';'plan next strikes'`;

    env.ACTIONS.attendant_counter.usage.act = `%USER PREPARES THEIR NEXT MOVE`;


    /* - attendant_counter_attack - */

    env.ACTIONS.attendant_counter_attack.name = `Reflexive Stab`;

    env.ACTIONS.attendant_counter_attack.usage.act = `%USER STABS %TARGET`;
    env.ACTIONS.attendant_counter_attack.usage.crit = `%TARGET IS EVISCERATED`;
    env.ACTIONS.attendant_counter_attack.usage.hit = `%TARGET BLEEDS SLUDGY CORRU`;
    env.ACTIONS.attendant_counter_attack.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.attendant_counter_attack.details.flavor = `'stab target'`;
    env.ACTIONS.attendant_counter_attack.details.onHit = `'[STAT::amt] [STATUS::puncture]'`;
    env.ACTIONS.attendant_counter_attack.details.onCrit = () => `'puncture vital cystic component for [STATUS::puncture]'${env?.rpg?.is2D ? ";'[STAT::kb]'" : ''}`;


    /* - special_attendant_strike - */

    env.ACTIONS.special_attendant_strike.name = `Calculated Strikes`;

    env.ACTIONS.special_attendant_strike.usage.act = `%USER advances relentlessly!`;

    env.ACTIONS.special_attendant_strike.details.flavor = `'rapid accurate strikes'`;
    env.ACTIONS.special_attendant_strike.details.onUse = `'HIT all marked targets';'if single target is marked, hit twice'`;
    env.ACTIONS.special_attendant_strike.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.special_attendant_strike.details.onCrit = `'[STATUS::puncture]'`;
    env.ACTIONS.special_attendant_strike.details.conditional = () => page.party.crittamode ? '' : `<em>HP < 33%::</em>'mark next targets'`;


    /* - special_veilklight_channel - */

    env.ACTIONS.special_veilklight_channel.name = `Imperceptible Enhancement`;

    env.ACTIONS.special_veilklight_channel.usage.act = `%USER radiates a strange light...`;

    env.ACTIONS.special_veilklight_channel.details.flavor = `'utilize anomalous organelle';'enhance allies'`;
    env.ACTIONS.special_veilklight_channel.details.onUse = `'selects ally to grant [STATUS::regen] or [STATUS::focused] on each subsequent turn'`;


    /* - special_veilklight_malfunction - */

    env.ACTIONS.special_veilklight_malfunction.name = `destabilized resonation`;

    env.ACTIONS.special_veilklight_malfunction.usage.act = `%USER's light grows sickly`;

    env.ACTIONS.special_veilklight_malfunction.details.flavor = `'afflict random nearby entities with incoherence'`;
    env.ACTIONS.special_veilklight_malfunction.details.onUse = `'[STATUS::destabilized] on 1-3 random actors'`;


    /* - special_movefoe_tumble - */

    env.ACTIONS.special_movefoe_tumble.name = `Tumble`;

    env.ACTIONS.special_movefoe_tumble.usage.act = `THE CHAMBER TUMBLES ABOUT`;

    env.ACTIONS.special_movefoe_tumble.details.flavor = `'utilize volatile deconstruction tool'`;
    env.ACTIONS.special_movefoe_tumble.details.onUse = `'HIT all foes'`;
    env.ACTIONS.special_movefoe_tumble.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.special_movefoe_tumble.details.onCrit = `'[STATUS::vulnerable]'`;


    /* - special_movefoe_collide - */

    env.ACTIONS.special_movefoe_collide.name = `Collide`;

    env.ACTIONS.special_movefoe_collide.usage.act = `THE CHAMBER SMASHES INTO SOMETHING`;

    env.ACTIONS.special_movefoe_collide.details.flavor = `'throw self into adjacent chambers to daze foes'`;
    env.ACTIONS.special_movefoe_collide.details.onUse = `'HIT all foes'`;
    env.ACTIONS.special_movefoe_collide.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.special_movefoe_collide.details.onCrit = `'[STATUS::stun]';'only stuns one target per turn'`;


    /* - special_movefoe_pry - */

    env.ACTIONS.special_movefoe_pry.name = `Pry`;

    env.ACTIONS.special_movefoe_pry.usage.act = `%USER DRAWS TENDRILS FROM THE WALLS`;

    env.ACTIONS.special_movefoe_pry.details.flavor = `'curl motor appendages into self to strike'`;
    env.ACTIONS.special_movefoe_pry.details.conditional = `<em>SUMMON::</em>'summon 2 tendrils (single use action)'`;


    /* - kavruka_followup - */

    env.ACTIONS.kavruka_followup.name = `Kavruka Followup`;

    env.ACTIONS.kavruka_followup.usage.act = `%USER follows up with a small detonation!`;
    env.ACTIONS.kavruka_followup.usage.hit = `%TARGET is struck`;
    env.ACTIONS.kavruka_followup.usage.crit = `%TARGET is blasted!`;
    env.ACTIONS.kavruka_followup.usage.miss = `%TARGET evades`;

    env.ACTIONS.kavruka_followup.details.onHit = `'-1HP'`;


    /* - special_maintcloak_barrier - */

    env.ACTIONS.special_maintcloak_barrier.name = `Sealant`;

    env.ACTIONS.special_maintcloak_barrier.usage.act = `%USER spreads a barrier!`;

    env.ACTIONS.special_maintcloak_barrier.details.flavor = `'apply ablative protection'`;
    env.ACTIONS.special_maintcloak_barrier.details.onUse = () => `'[STAT::amtBP] to nearby allies'`;


    /* - maintstab - */

    env.ACTIONS.maintstab.name = `Triple Stab`;

    env.ACTIONS.maintstab.usage.act = `%USER stabs at %TARGET`;
    env.ACTIONS.maintstab.usage.crit = `A FRIGHTENING BLOW`;
    env.ACTIONS.maintstab.usage.hit = `%TARGET bleeds sludgy corru`;
    env.ACTIONS.maintstab.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.maintstab.details.flavor = `'utilize sharpened limbs in agile flurry'`;
    env.ACTIONS.maintstab.details.onUse = `'use this action up to three times on target';'cease on miss'`;
    env.ACTIONS.maintstab.details.onHit = `'[STAT::amt] [STATUS::puncture]'`;


    /* - special_archiveshelf_annihilate - */

    env.ACTIONS.special_archiveshelf_annihilate.name = `Annihilation`;

    env.ACTIONS.special_archiveshelf_annihilate.usage.act = `%USER PREPARES TO ACT!`;

    env.ACTIONS.special_archiveshelf_annihilate.details.onUse = `'present target foe a choice of outcome'`;
    env.ACTIONS.special_archiveshelf_annihilate.details.base = `The shelf lunges at %TARGET...`;
    env.ACTIONS.special_archiveshelf_annihilate.details.explainer = `decides action used by PAIN SHELF`;
    env.ACTIONS.special_archiveshelf_annihilate.details.defensive = `The shelf pulls back, but %TARGET could act...`;
    env.ACTIONS.special_archiveshelf_annihilate.details.offensive = `The shelf prepares a sweep, but %TARGET could act...`;


    /* - archiveshelf_withstand - */

    env.ACTIONS.archiveshelf_withstand.name = `Withstand`;

    env.ACTIONS.archiveshelf_withstand.usage.act = `%USER STRIKES %TARGET`;
    env.ACTIONS.archiveshelf_withstand.usage.crit = `%TARGET IS BRUTALLY STRUCK`;
    env.ACTIONS.archiveshelf_withstand.usage.hit = `%TARGET TAKES A SOLID HIT`;
    env.ACTIONS.archiveshelf_withstand.usage.miss = `%TARGET ESCAPED BY A HAIR`;

    env.ACTIONS.archiveshelf_withstand.details.flavor = `'strike a braced target'`;
    env.ACTIONS.archiveshelf_withstand.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.archiveshelf_withstand.details.conditional = `<em><o-col>USER::</o-col></em>'next options will be defensive'`;


    /* - archiveshelf_risky - */

    env.ACTIONS.archiveshelf_risky.name = `Risky Strike`;

    env.ACTIONS.archiveshelf_risky.usage.act = `%USER STRIKES %TARGET`;
    env.ACTIONS.archiveshelf_risky.usage.crit = `%TARGET IS BRUTALLY STRUCK`;
    env.ACTIONS.archiveshelf_risky.usage.hit = `%TARGET TAKES A SOLID HIT`;
    env.ACTIONS.archiveshelf_risky.usage.miss = `%TARGET ESCAPED BY A HAIR`;

    env.ACTIONS.archiveshelf_risky.details.flavor = `'overreach in attempt to strike dodging target'`;
    env.ACTIONS.archiveshelf_risky.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.archiveshelf_risky.details.onCrit = `'[STATUS::stun] [STATUS::puncture]'`;
    env.ACTIONS.archiveshelf_risky.details.conditional = `<em><o-col>USER::</o-col></em>'[STATUS::vulnerable]';'next options will be sweeping attacks'`;


    /* - archiveshelf_focus - */

    env.ACTIONS.archiveshelf_focus.name = `Pull Back`;

    env.ACTIONS.archiveshelf_focus.usage.act = `%USER recoils and prepares to strike anew`;

    env.ACTIONS.archiveshelf_focus.details.flavor = `'regain composure'`;
    env.ACTIONS.archiveshelf_focus.details.conditional = `<em><o-col>USER::</o-col></em>'[STATUS::focused]';'next options will be direct strikes'`;


    /* - archiveshelf_interrupt - */

    env.ACTIONS.archiveshelf_interrupt.name = `Interrupted Focus`;

    env.ACTIONS.archiveshelf_interrupt.usage.act = `%USER STRIKES %TARGET`;
    env.ACTIONS.archiveshelf_interrupt.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.archiveshelf_interrupt.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.archiveshelf_interrupt.details.flavor = `'be forced to strike while trying to rebalance'`;
    env.ACTIONS.archiveshelf_interrupt.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.archiveshelf_interrupt.details.conditional = `<em><o-col>USER::</o-col></em>'[STATUS::vulnerable]';'next options will be direct strikes'`;


    /* - archiveshelf_sweep - */

    env.ACTIONS.archiveshelf_sweep.name = `Sweep`;

    env.ACTIONS.archiveshelf_sweep.usage.act = `%USER SWEEPS ITS LIMBS ABOUT`;

    env.ACTIONS.archiveshelf_sweep.details.flavor = `'strike entire opposing team with many limbs'`;
    env.ACTIONS.archiveshelf_sweep.details.onUse = `'HIT all targets twice'`;
    env.ACTIONS.archiveshelf_sweep.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.archiveshelf_sweep.details.onCrit = `'[STATUS::vulnerable]'`;
    env.ACTIONS.archiveshelf_sweep.details.conditional = `<em><o-col>USER::</o-col></em>'next options will be direct strikes'`;


    /* - archiveshelf_stab - */

    env.ACTIONS.archiveshelf_stab.name = `Triple Stab`;

    env.ACTIONS.archiveshelf_stab.usage.act = `%USER stabs at %TARGET`;
    env.ACTIONS.archiveshelf_stab.usage.crit = `A FRIGHTENING BLOW`;
    env.ACTIONS.archiveshelf_stab.usage.hit = `%TARGET bleeds sludgy corru`;
    env.ACTIONS.archiveshelf_stab.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.archiveshelf_stab.details.flavor = `'utilize many limbs to focus single target'`;
    env.ACTIONS.archiveshelf_stab.details.onUse = `'use this action up to three times on target';'cease on miss'`;
    env.ACTIONS.archiveshelf_stab.details.onHit = `'[STAT::amt] [STATUS::puncture]'`;
    env.ACTIONS.archiveshelf_stab.details.conditional = `<em><o-col>USER::</o-col></em>'next options will be direct strikes'`;


    /* - incoherent_gundown_draggable - */

    env.ACTIONS.incoherent_gundown_draggable.name = `BSTRD BULLETS`;

    env.ACTIONS.incoherent_gundown_draggable.usage.act = `%USER TAKES AIM`;

    env.ACTIONS.incoherent_gundown_draggable.details.flavor = `'utilize many limbs to focus single target'`;
    env.ACTIONS.incoherent_gundown_draggable.details.onUse = `'use this action up to three times on target';'cease on miss'`;


    /* - husk_target - */

    env.ACTIONS.husk_target.name = `Point`;

    env.ACTIONS.husk_target.usage.act = `%USER FOCUSES ON %TARGET`;
    env.ACTIONS.husk_target.usage.crit = `%TARGET IS MARKED FOR DEATH`;
    env.ACTIONS.husk_target.usage.hit = `A HOSTILE GAZE CONVERGES UPON %TARGET`;
    env.ACTIONS.husk_target.usage.miss = `%TARGET DODGES`;

    env.ACTIONS.husk_target.details.flavor = `'coordinate attack'`;
    env.ACTIONS.husk_target.details.onUse = `'[STATUS::vulnerable]';'[STATUS::targeted]'`;
    env.ACTIONS.husk_target.details.onCrit = `'[STATUS::critical_flaw]'`;


    /* - husk_coordinate - */

    env.ACTIONS.husk_coordinate.name = `Coordinate`;

    env.ACTIONS.husk_coordinate.usage.act = `%USER FOCUSES ON %TARGET`;
    env.ACTIONS.husk_coordinate.usage.crit = `%USER HAS THE PERFECT PLAN`;
    env.ACTIONS.husk_coordinate.usage.hit = `%USER GIVES DIRECTION`;
    env.ACTIONS.husk_coordinate.usage.miss = `%TARGET DODGES`;

    env.ACTIONS.husk_coordinate.details.flavor = `'coordinate defense'`;
    env.ACTIONS.husk_coordinate.details.onUse = `'[STATUS::evasion]';'[STATUS::focused]'`;
    env.ACTIONS.husk_coordinate.details.onCrit = `'[STATUS::focused] to allies'`;


    /* - husk_declaration - */

    env.ACTIONS.husk_declaration.name = `Declaration`;

    env.ACTIONS.husk_declaration.usage.act = `%USER CRIES A WORDLESS THOUGHT`;
    env.ACTIONS.husk_declaration.usage.crit = `TERROR RESONATES THROUGH THE CONNECTION`;
    env.ACTIONS.husk_declaration.usage.hit = `%TARGET'S FLESH REVOLTS`;
    env.ACTIONS.husk_declaration.usage.miss = `%TARGET IGNORES IT`;

    env.ACTIONS.husk_declaration.details.flavor = `'utilize remains to speak';'express aggressor signal directly'`;
    env.ACTIONS.husk_declaration.details.onHit = `'[STAT::amt]';'[STATUS::terror]';'[STATUS::focused] to self'`;
    env.ACTIONS.husk_declaration.details.onCrit = `'[STAT::amt]';'[STATUS::terror] to all other opponents'`;


    /* - husk_evade - */

    env.ACTIONS.husk_evade.name = `Focus`;

    env.ACTIONS.husk_evade.usage.act = `%USER LOOKS FOR AN OPENING`;

    env.ACTIONS.husk_evade.details.onUse = () => `'gain [STATUS::focused] [STATUS::evasion]'`;
    env.ACTIONS.husk_evade.details.flavor = `'deliberate on the moment and its opportunities'`;


    /* - husk_rez - */

    env.ACTIONS.husk_rez.name = `Unfair Advantage`;

    env.ACTIONS.husk_rez.usage.act = `%USER BRINGS %TARGET BACK TO THEIR FEET`;
    env.ACTIONS.husk_rez.usage.hit = `%TARGET IS READY TO FIGHT`;
    env.ACTIONS.husk_rez.usage.crit = `%TARGET GETS A SECOND WIND`;

    env.ACTIONS.husk_rez.details.flavor = `'repair ally to fighting condition';'limited use'`;
    env.ACTIONS.husk_rez.details.onUse = `'revive target at [STAT::percentage]%HP'`;


    /* - husk_tap - */

    env.ACTIONS.husk_tap.name = `Vital Tap`;

    env.ACTIONS.husk_tap.usage.act = `%USER MENDS %TARGET`;
    env.ACTIONS.husk_tap.usage.crit = `%TARGET STANDS STRONGER`;
    env.ACTIONS.husk_tap.usage.hit = `%TARGET IS ALTERED`;
    env.ACTIONS.husk_tap.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.husk_tap.details.flavor = `'utilize repair tool to apply critical resources'`;
    env.ACTIONS.husk_tap.details.onuse = `'[STAT::amt] [STATUS::regen] [STATUS::focused] [STATUS::evasion]'`;


    /* - husk_windup - */

    env.ACTIONS.husk_windup.name = `Preparation`;

    env.ACTIONS.husk_windup.usage.act = `%USER PREPARES A SHIELD...`;

    env.ACTIONS.husk_windup.details.flavor = `'prepare to use advanced defensive action'`;
    env.ACTIONS.husk_windup.details.onUse = `'[STATUS::windup]'`;


    /* - husk_windup_carapace - */

    env.ACTIONS.husk_windup_carapace.name = `Reinforce`;

    env.ACTIONS.husk_windup_carapace.usage.act = `%USER ARMORS THEIR ALLIES`;

    env.ACTIONS.husk_windup_carapace.details.flavor = `'adapt allies to incoming attacks'`;
    env.ACTIONS.husk_windup_carapace.details.onUse = `'[STATUS::carapace] to all allies'`;


    /* - husk_guard - */

    env.ACTIONS.husk_guard.name = `Guard`;

    env.ACTIONS.husk_guard.usage.act = `%USER STANDS BEFORE %TARGET`;
    env.ACTIONS.husk_guard.usage.hit = `%TARGET IS SHIELDED BY %USER`;

    env.ACTIONS.husk_guard.details.flavor = `'utilize unique limbs to protect target';'intercept incoming attacks'`;
    env.ACTIONS.husk_guard.details.onUse = `'[STATUS::redirection]';'[STATUS::counter] to self'`;


    /* - kivskin_guard_support_only - */

    env.ACTIONS.kivskin_guard_support_only.name = `Guard`;

    env.ACTIONS.kivskin_guard_support_only.usage.act = `%USER STANDS GUARD`;

    env.ACTIONS.kivskin_guard_support_only.details.flavor = `'utilize unique limbs to protect target';'intercept incoming attacks'`;
    env.ACTIONS.kivskin_guard_support_only.details.onUse = `'[STATUS::redirection] to target';'[STATUS::carapace] [STATUS::counter] to self'`;


    /* - kivskin_guard - */

    env.ACTIONS.kivskin_guard.name = `Guard`;

    env.ACTIONS.kivskin_guard.usage.act = `%USER STANDS GUARD`;

    env.ACTIONS.kivskin_guard.details.flavor = `'utilize unique limbs to protect target';'intercept incoming attacks'`;
    env.ACTIONS.kivskin_guard.details.onUse = `'[STATUS::redirection] to target';'[STATUS::carapace]'`;


    /* - kivskin_shell - */

    env.ACTIONS.kivskin_shell.name = `Shell`;

    env.ACTIONS.kivskin_shell.usage.act = `%USER PREPARES THEIR DEFENSE`;

    env.ACTIONS.kivskin_shell.details.flavor = `'take on defensive stance'`;
    env.ACTIONS.kivskin_shell.details.onUse = `'[STATUS::carapace] [STATUS::focused]';'remove [STATUS::vulnerable]'`;


    /* - windup_jab - */

    env.ACTIONS.windup_jab.name = `Opening Swing`;
    env.ACTIONS.windup_jab.verb = `swing at`;

    env.ACTIONS.windup_jab.usage.act = `%USER ATTACKS %TARGET`;
    env.ACTIONS.windup_jab.usage.hit = `%TARGET IS STRUCK`;
    env.ACTIONS.windup_jab.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.windup_jab.details.flavor = `'unwieldy punch';'opens for follow-up attacks'`;
    env.ACTIONS.windup_jab.details.onHit = `'[STAT::amt]';'[STATUS::windup]'`;


    /* - kivskin_malfunction - */

    env.ACTIONS.kivskin_malfunction.name = `Wild Swing`;

    env.ACTIONS.kivskin_malfunction.usage.act = `%USER swings about uncontrollably!`;

    env.ACTIONS.kivskin_malfunction.details.flavor = `'briefly lose control of movement'`;
    env.ACTIONS.kivskin_malfunction.details.onUse = `'HIT between 1-3 random actors'`;
    env.ACTIONS.kivskin_malfunction.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.kivskin_malfunction.details.onCrit = `'[STATUS::stun]'`;


    /* - gaunt_grasp - */

    env.ACTIONS.gaunt_grasp.name = `Grasp`;

    env.ACTIONS.gaunt_grasp.usage.act = `%USER GRASPS AT THE TEAM`;

    env.ACTIONS.gaunt_grasp.details.flavor = `'utilize gauntlet';'immobilize'`;
    env.ACTIONS.gaunt_grasp.details.onUse = `'[STAT::amt] [STAT::vulnerable]'`;
    env.ACTIONS.gaunt_grasp.details.onCrit = `'[STATUS::stun] to target';'[STATUS::focused] to self'`;


    /* - gaunt_crush - */

    env.ACTIONS.gaunt_crush.name = `Crush`;

    env.ACTIONS.gaunt_crush.usage.act = `%USER CLOSES ITS FIST`;

    env.ACTIONS.gaunt_crush.details.flavor = `'apply force to grasped subject inconducive to continued existence'`;
    env.ACTIONS.gaunt_crush.details.onUse = `'[STAT::amt]'`;
    env.ACTIONS.gaunt_crush.details.onCrit = `'[STATUS::puncture]'`;


    /* - hallucination_attack - */

    env.ACTIONS.hallucination_attack.name = `Psychosis`;

    env.ACTIONS.hallucination_attack.usage.act = `%USER SPRINTS AT %TARGET`;
    env.ACTIONS.hallucination_attack.usage.crit = `%TARGET FACES THEIR MORTALITY`;
    env.ACTIONS.hallucination_attack.usage.hit = `%TARGET IS STRUCK, BUT BY WHAT?`;
    env.ACTIONS.hallucination_attack.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.hallucination_attack.details.flavor = `'wound through intent alone';'no inherent additional effect'`;
    env.ACTIONS.hallucination_attack.details.onHit = `'[STAT::amt]'`;


    /* - special_translation - */

    env.ACTIONS.special_translation.name = `█████`;

    env.ACTIONS.special_translation.usage.act = `%USER ██████ ███ █████`;

    env.ACTIONS.special_translation.details.flavor = `'████ ████ ██';'fleetingly grasp the minds of usurpers';'attempt to ████████'`;
    env.ACTIONS.special_translation.details.onUse = `'HIT all foes'`;
    env.ACTIONS.special_translation.details.onHit = `'[STAT::amt]';'[STATUS::terror]'`;
    env.ACTIONS.special_translation.details.onCrit = `'manifest a »õGQàº3¾õ”cR% with copied item & status effects'`;


    /* - repairfriend_swarm - */

    env.ACTIONS.repairfriend_swarm.name = `Infest`;

    env.ACTIONS.repairfriend_swarm.usage.act = `%USER swarms %TARGET with tendrils!`;
    env.ACTIONS.repairfriend_swarm.usage.crit = `A FRIGHTENING BLOW`;
    env.ACTIONS.repairfriend_swarm.usage.hit = `%TARGET bleeds sludgy corru`;
    env.ACTIONS.repairfriend_swarm.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.repairfriend_swarm.details.flavor = `'utilize many limbs in continuous attack'`;
    env.ACTIONS.repairfriend_swarm.details.onUse = `'use this action up to three times on target';'cease on miss'`;
    env.ACTIONS.repairfriend_swarm.details.onHit = `'[STAT::amt] [STATUS::siphon]'`;


    /* - repairfriend_swarm_malfunction - */

    env.ACTIONS.repairfriend_swarm_malfunction.name = `Repair Malfunction`;

    env.ACTIONS.repairfriend_swarm_malfunction.usage.act = `%USER swarms %TARGET with tendrils!`;
    env.ACTIONS.repairfriend_swarm_malfunction.usage.crit = `A FRIGHTENING BLOW`;
    env.ACTIONS.repairfriend_swarm_malfunction.usage.hit = `%TARGET bleeds sludgy corru`;
    env.ACTIONS.repairfriend_swarm_malfunction.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.repairfriend_swarm_malfunction.details.flavor = `'utilize many limbs in continuous attack'`;
    env.ACTIONS.repairfriend_swarm_malfunction.details.onUse = `'use this action up to three times on target';'cease on miss'`;
    env.ACTIONS.repairfriend_swarm_malfunction.details.onHit = `'[STAT::amt] [STATUS::siphon]'`;


    /* - repairfriend_salvage - */

    env.ACTIONS.repairfriend_salvage.name = `Salvage`;

    env.ACTIONS.repairfriend_salvage.usage.act = `%USER TENDS TO THE GOLEM`;

    env.ACTIONS.repairfriend_salvage.details.flavor = `'apply repairs to powerful golem nearby'`;
    env.ACTIONS.repairfriend_salvage.details.onUse = `'[STAT::amt] [STAT::amtBP] [STATUS::repairs] [STATUS::carapace]'`;
    env.ACTIONS.repairfriend_salvage.details.conditional = `<em>DESTABILIZED</em>::'50% chance to fail heal';'apply [STATUS::million_teeth] instead of repairs'
<em>GOLEM DEAD</em>::'restore subject golem to 10%HP';'no other effect'</em>`;


    /* - special_constructor_carapace - */

    env.ACTIONS.special_constructor_carapace.name = `Reinforce`;

    env.ACTIONS.special_constructor_carapace.usage.act = `%USER TENDS TO THEIR CREATIONS`;

    env.ACTIONS.special_constructor_carapace.details.flavor = `'adapt allies to incoming attacks'`;
    env.ACTIONS.special_constructor_carapace.details.onUse = `'[STATUS::carapace] to team'`;


    /* - constructor_construct - */

    env.ACTIONS.constructor_construct.name = `Expend carapace`;

    env.ACTIONS.constructor_construct.usage.act = `%USER TENDS TO %TARGET`;
    env.ACTIONS.constructor_construct.usage.crit = `%TARGET FEELS INVINCIBLE`;
    env.ACTIONS.constructor_construct.usage.hit = `%TARGET LOOKS MORE HARDY`;
    env.ACTIONS.constructor_construct.usage.miss = `SOMETHING BROKE LOL`;

    env.ACTIONS.constructor_construct.details.flavor = `apply ablative corru layer to target';'occasionally provide better shielding'`;
    env.ACTIONS.constructor_construct.details.onHit = `'[STAT::amtBP]'`;
    env.ACTIONS.constructor_construct.details.onCrit = `'additional [STAT::amtBP]'`;


    /* - constructor_attack - */

    env.ACTIONS.constructor_attack.name = `Triple Stab`;

    env.ACTIONS.constructor_attack.usage.act = `%USER stabs at %TARGET`;
    env.ACTIONS.constructor_attack.usage.crit = `A FRIGHTENING BLOW`;
    env.ACTIONS.constructor_attack.usage.hit = `%TARGET bleeds sludgy corru`;
    env.ACTIONS.constructor_attack.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.constructor_attack.details.flavor = `'utilize floating form and sharp decorative receptors'`;
    env.ACTIONS.constructor_attack.details.onUse = `'use this action up to three times on target';'cease on miss'`;
    env.ACTIONS.constructor_attack.details.onHit = `'[STAT::amt] [STATUS::puncture]'`;


    /* - constructor_vat - */

    env.ACTIONS.constructor_vat.name = `Construct`;

    env.ACTIONS.constructor_vat.usage.act = `%USER CONTINUES CONSTRUCTION...`;

    env.ACTIONS.constructor_vat.details.onUse = () => `'gain [STATUS::story_construction]'`;
    env.ACTIONS.constructor_vat.details.flavor = `'rapidly form appendage'`;


    /* - sacrifice_utility - */

    env.ACTIONS.sacrifice_utility.name = `Sacrifice`;

    env.ACTIONS.sacrifice_utility.usage.act = `%USER PREPARES FOR DESPERATE MEASURES`;

    env.ACTIONS.sacrifice_utility.details.flavor = `'empowers next action greatly'`;
    env.ACTIONS.sacrifice_utility.details.onUse = `'[STATUS::empowered] [STATUS::evasion]'`;
    env.ACTIONS.sacrifice_utility.details.conditional = `<em>SACRIFICE::</em>'absorb one negative status from each ally'
<em>REVIVE::</em>'HIT self for [STAT::amt] per <n-col>DOWN</n-col> ally to restore them with [STAT::healHP]'`;


    /* - resource_claw - */

    env.ACTIONS.resource_claw.name = `Resource Tear`;

    env.ACTIONS.resource_claw.usage.act = `%USER CLAWS AT %TARGET`;
    env.ACTIONS.resource_claw.usage.crit = `SOMETHING CRITICAL IS TORN AWAY`;
    env.ACTIONS.resource_claw.usage.hit = `%TARGET IS BASHED AROUND`;
    env.ACTIONS.resource_claw.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.resource_claw.details.flavor = `'utilize thoughtform manipulator';'retrieve resources for structural repurposing'`;
    env.ACTIONS.resource_claw.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.resource_claw.details.onCrit = `'[STATUS::weakened] [STATUS::stun]';'steal a positive status'`;


    /* - inject - */

    env.ACTIONS.inject.name = `Inject`;

    env.ACTIONS.inject.usage.act = `%USER TANGLES WITH %TARGET`;
    env.ACTIONS.inject.usage.crit = `%TARGET IS UNRAVELED`;
    env.ACTIONS.inject.usage.hit = `%TARGET JITTERS UNSTEADILY`;
    env.ACTIONS.inject.usage.miss = `%TARGET EVADES`;

    env.ACTIONS.inject.details.flavor = `'alter thoughtform todo blabalbalba'`;
    env.ACTIONS.inject.details.onHit = `'[STAT::amt] [STATUS::malware]'`;


    /* - corrupt - */

    env.ACTIONS.corrupt.name = `Corrupt`;

    env.ACTIONS.corrupt.usage.act = `%USER CORRUPTS %TARGET`;
    env.ACTIONS.corrupt.usage.crit = `%TARGET RIPPLES UNNATURALLY`;
    env.ACTIONS.corrupt.usage.hit = `%TARGET'S FORM WAVERS`;
    env.ACTIONS.corrupt.usage.miss = `%TARGET REMAINS STABLE`;

    env.ACTIONS.corrupt.details.flavor = `'hastily reshape target for offensive gain'`;
    env.ACTIONS.corrupt.details.onHit = `'[STAT::amt] [STATUS::regen] [STATUS::focused] [STATUS::destabilized]'`;
    env.ACTIONS.corrupt.details.onCrit = `'grant powerful additional buff'`;
    env.ACTIONS.corrupt.details.conditional = `<em>SPECIAL::</em>'guaranteed <n-col>CRIT</n-col> vs non-[STATUS::destabilizedRef]'`;


    /* - frame_translation - */

    env.ACTIONS.frame_translation.name = `New Process`;

    env.ACTIONS.frame_translation.usage.act = `%USER DRAWS IN RESOURCES`;

    env.ACTIONS.frame_translation.details.flavor = `'remove resources from foes to create new daemon processes'`;
    env.ACTIONS.frame_translation.details.onUse = `'HIT all foes'`;
    env.ACTIONS.frame_translation.details.onHit = `'[STAT::amt]'`;
    env.ACTIONS.frame_translation.details.onCrit = `'[STATUS::weakened]';'manifest an IDEA with copied passive & status effects (max:6)'`;


    /* - special_archivist_conjure - */

    env.ACTIONS.special_archivist_conjure.name = `Recollection`;

    env.ACTIONS.special_archivist_conjure.usage.act = `%USER conjures spectral shapes...`;

    env.ACTIONS.special_archivist_conjure.details.flavor = `'direct the flow of resources';'desperately delay the misguided'`;
    env.ACTIONS.special_archivist_conjure.details.onUse = `'leap to a random location';'conjure clawful of masses with [STATUS::story_forming]';'HIT foes who block formation'`;
    env.ACTIONS.special_archivist_conjure.details.onHit = `'[STATUS::destabilized] [STATUS::regen] [STATUS::empowered]'`;


    /* - special_archivist_upgrade - */

    env.ACTIONS.special_archivist_upgrade.name = `Recollection`;

    env.ACTIONS.special_archivist_upgrade.usage.act = `%USER reforms %TARGET!`;


    /* - special_archivist_heal - */

    env.ACTIONS.special_archivist_heal.name = `Recollection`;

    env.ACTIONS.special_archivist_heal.usage.act = `%USER reforms %TARGET!`;
}

// === EFFECTS === //
cor_ru.combat[`redefineEffects`] = function () {
    /* - puncture - */

    env.STATUS_EFFECTS.puncture.name = `Puncture`;
    env.STATUS_EFFECTS.puncture.help = `lose <o-col>-10%HP</o-col> per turn<n-col class='shiftdetail'> (min:1)</n-col><br class='shiftdetail'><n-col class='shiftdetail minorstate'>affected by damage modifiers</n-col>`;


    /* - rot - */

    env.STATUS_EFFECTS.rot.name = `Rot`;
    env.STATUS_EFFECTS.rot.help = `lose <o-col>1%HP/T</o-col> per turn<n-col class='shiftdetail'> (min: 1HP, max: 90%HP)</n-col>
<span class='minorstate'>does not decay</span><br class='shiftdetail'><n-col class='shiftdetail minorstate'>unaffected by damage modifiers</n-col>`;


    /* - regen - */

    env.STATUS_EFFECTS.regen.name = `Regen`;
    env.STATUS_EFFECTS.regen.help = `gain <f-col>+1HP</f-col> per turn`;


    /* - repairs - */

    env.STATUS_EFFECTS.repairs.name = `Repairs`;
    env.STATUS_EFFECTS.repairs.help = `gain <f-col>+1HP</f-col> per turn, removed upon <f-col definition='STATUS++bp'>barrier</f-col> loss
<n-col>prevents <span definition='STATUS++puncture'>PUNCTURE</span></n-col>`;

    env.STATUS_EFFECTS.repairs.strings.punctureBlock = `%TARGET's reparative barrier blocks the puncture!`;


    /* - million_teeth - */

    env.STATUS_EFFECTS.million_teeth.name = `Million Teeth`;
    env.STATUS_EFFECTS.million_teeth.help = `<span definition='STATUS++puncture'>+5T:PUNCTURE</span> per turn
removed upon <span definition='STATUS++'bp'>barrier</span> loss`;


    /* - bomb - */

    env.STATUS_EFFECTS.bomb.name = `Bomb`;
    env.STATUS_EFFECTS.bomb.help = () => `<n-col>on death or direct IED hit</n-col>,\ndamage ${env.rpg?.is2D ? "nearby actors" : "entire team"} for <o-col>-1% maxHP/T</o-col><n-col class='shiftdetail'> (min:1)</n-col>, inflict <span definition='STATUS++stun'>stun</span>${env.rpg?.crittamode ? " if at least 10T" : ""}\n<n-col class='minorstate'>damage is split across all affected actors</n-col>\n<span class='minorstate'>does not decay</span>`;


    /* - destabilized - */

    env.STATUS_EFFECTS.destabilized.name = `Destabilized`;
    env.STATUS_EFFECTS.destabilized.help = `doubles all HP interactions<n-col class='shiftdetail'> (+1x in/out dmg/heal)</n-col>
<n-col>may cause foe malfunction</n-col>`;


    /* - vulnerable - */

    env.STATUS_EFFECTS.vulnerable.name = `Vulnerable`;
    env.STATUS_EFFECTS.vulnerable.help = `vastly increases chance of being HIT and CRIT<n-col class='shiftdetail'>
(+100% IN:ACC%, +200% IN:CRIT%)</n-col>`;


    /* - vulnerable_guaranteed - */

    env.STATUS_EFFECTS.vulnerable_guaranteed.name = `Guaranteed Hit`;
    env.STATUS_EFFECTS.vulnerable_guaranteed.help = `guaranteed hit and crit`;


    /* - critical_flaw - */

    env.STATUS_EFFECTS.critical_flaw.name = `Critical Flaw`;
    env.STATUS_EFFECTS.critical_flaw.help = `<o-col>-10%HP</o-col> when critically hit<n-col class='shiftdetail'> (min:1)</n-col>
<span class='minorstate'>removed upon <span definition='STATUS++vulnerable'>VULNERABLE</span> loss</span>`;

    env.STATUS_EFFECTS.critical_flaw.strings.exploitFlaw = `%USER exploits %TARGET's critical flaw!`;
    env.STATUS_EFFECTS.critical_flaw.strings.extraDmg = `%TARGET takes [amt] extra damage!`;


    /* - focused - */

    env.STATUS_EFFECTS.focused.name = `Focused`;
    env.STATUS_EFFECTS.focused.help = `increases HIT chance, vastly increases CRIT chance<n-col class='shiftdetail'>
(+50% ACC%, +400% CRIT%)</n-col>`;


    /* - weakened - */

    env.STATUS_EFFECTS.weakened.name = `Weakened`;
    env.STATUS_EFFECTS.weakened.help = () => "-0.5x outgoing damage/heal, vastly reduces crit chance <n-col class='shiftdetail'> -100% CRIT%</n-col>";


    /* - empowered - */

    env.STATUS_EFFECTS.empowered.name = `Empowered`;
    env.STATUS_EFFECTS.empowered.help = `+1 outgoing damage/heal`;


    /* - resilient - */

    env.STATUS_EFFECTS.resilient.name = `Resilient`;
    env.STATUS_EFFECTS.resilient.help = `-75% to HP modifications`;


    /* - carapace - */

    env.STATUS_EFFECTS.carapace.name = `Carapace`;
    env.STATUS_EFFECTS.carapace.help = `-1 incoming damage
consumes 2T to block <span definition='STATUS++stun'>STUN</span>`;

    env.STATUS_EFFECTS.carapace.strings.absorb = `%TARGET's carapace absorbs a hit!`;
    env.STATUS_EFFECTS.carapace.strings.stunBlock = `%TARGET absorbs the trauma! (<span definition='STATUS++stun'>STUN</span> blocked)`;
    env.STATUS_EFFECTS.carapace.strings.shatter = `%TARGET's carapace shatters! (<span definition='STATUS++stun'>STUN</span> blocked)`;
    env.STATUS_EFFECTS.carapace.strings.negation = `%USER's damage is completely negated!`;


    /* - open_wound - */

    env.STATUS_EFFECTS.open_wound.name = `Open Wound`;
    env.STATUS_EFFECTS.open_wound.help = `+2 incoming damage
receiving more than <o-col>-10HP</o-col> in a single hit inflicts <span definition='STATUS++stun'>STUN</span>`;

    env.STATUS_EFFECTS.open_wound.strings.overwhelm = `%TARGET's wounds overwhelm them!`;


    /* - evasion - */

    env.STATUS_EFFECTS.evasion.name = `Evasion`;
    env.STATUS_EFFECTS.evasion.help = () => `${env?.rpg?.is2D ? "<f-col>+1 MOVEMENT</f-col>\n" : ''}vastly reduces chance of being HIT and CRIT<n-col class='shiftdetail'>\n(-90% IN:ACC% & IN:CRIT%)</n-col>`;


    /* - stun - */

    env.STATUS_EFFECTS.stun.name = `Stun`;
    env.STATUS_EFFECTS.stun.help = `skip turn
gain <span definition='STATUS++stun_immune'>STUN IMMUNE</span> upon expiry<n-col class="shiftdetail">
stun does not stack</n-col>`;

    env.STATUS_EFFECTS.stun.strings.stunned = `%TARGET is stunned!`;
    env.STATUS_EFFECTS.stun.strings.stillStunned = `they still can't move...`;
    env.STATUS_EFFECTS.stun.strings.recovery = `they're starting to recover...`;
    env.STATUS_EFFECTS.stun.strings.immunity = `%TARGET gains brief stun immunity!`;


    /* - stun_immune - */

    env.STATUS_EFFECTS.stun_immune.name = `Stun Immune`;
    env.STATUS_EFFECTS.stun_immune.help = `immune to <span definition='STATUS++stun'>STUN</span><n-col class="shiftdetail">
granted at combat start if modified
always granted after stun expiry (1T + modifiers)</n-col>`;

    env.STATUS_EFFECTS.stun_immune.strings.absorb = `%TARGET absorbs the trauma!`;


    /* - immobile - */

    env.STATUS_EFFECTS.immobile.name = `Immobile`;
    env.STATUS_EFFECTS.immobile.help = `skip turn`;


    /* - immobile_hardskip - */

    env.STATUS_EFFECTS.immobile_hardskip.name = `Immobile`;
    env.STATUS_EFFECTS.immobile_hardskip.help = `skip turn`;


    /* - immobile_hardskip_silent - */

    env.STATUS_EFFECTS.immobile_hardskip_silent.name = `Immobile`;
    env.STATUS_EFFECTS.immobile_hardskip_silent.help = `skip turn`;


    /* - immobile_firmskip_silent - */

    env.STATUS_EFFECTS.immobile_firmskip_silent.name = `Immobile`;
    env.STATUS_EFFECTS.immobile_firmskip_silent.help = `skip turn`;


    /* - invisible - */

    env.STATUS_EFFECTS.invisible.name = `Invisible`;
    env.STATUS_EFFECTS.invisible.help = `no actor panel, used for background entities mainly`;


    /* - incoherent - */

    env.STATUS_EFFECTS.incoherent.name = `Incoherent`;
    env.STATUS_EFFECTS.incoherent.help = `ignoring thoughtspace specifications`;


    /* - windup - */

    env.STATUS_EFFECTS.windup.name = `Windup`;
    env.STATUS_EFFECTS.windup.help = `preparing powerful action
interrupted by <span definition='STATUS++stun'>STUN</span>, removes <span definition='STATUS++stun_immune'>STUN IMMUNE</span>`;


    /* - fear - */

    env.STATUS_EFFECTS.fear.name = `Fear`;
    env.STATUS_EFFECTS.fear.help = () => `paralyzed by terror,${env?.rpg?.is2D ? " -1 MOVE," : ''} some actions prohibited\nremoved by ally CRIT${env?.rpg?.is2D ? " or ENDURE action" : ''}`;


    /* - madness - */

    env.STATUS_EFFECTS.madness.name = `Madness`;
    env.STATUS_EFFECTS.madness.help = `targeted actions have a 50% chance to be redirected to a random actor
removed upon <span definition='STATUS++terror'>TERROR</span> loss`;

    env.STATUS_EFFECTS.madness.strings.madnessRedirect = `%USER's madness sends their action awry!`;
    env.STATUS_EFFECTS.madness.strings.newTarget = `%TARGET becomes their new target!`;


    /* - spikes - */

    env.STATUS_EFFECTS.spikes.name = `Spikes`;
    env.STATUS_EFFECTS.spikes.help = `consume all <n-col definition='STATUS++spikes'>T:SPIKES</n-col> <n-col>when struck</n-col> and return <o-col>-t:HP</o-col>
fails if inverted, removed or <n-col>DOWNed</n-col> by attack
<span class='minorstate'>does not decay</span>`;

    env.STATUS_EFFECTS.spikes.strings.skewer = `%USER's spikes skewer their attacker!`;
    env.STATUS_EFFECTS.spikes.strings.pierce = `%TARGET is pierced for [amt]HP!`;


    /* - momentum - */

    env.STATUS_EFFECTS.momentum.name = `Momentum`;
    env.STATUS_EFFECTS.momentum.help = `consume all <n-col definition='STATUS++momentum'>T:MOMENTUM</n-col> on <n-col>next offensive hit</n-col>
increase damage by amt consumed
<span class='minorstate'>does not decay</span>`;

    env.STATUS_EFFECTS.momentum.strings.channel = `%USER channels their <span definition='STATUS++momentum'>[t]T:MOMENTUM</span> into a powerful strike!`;


    /* - siphon - */

    env.STATUS_EFFECTS.siphon.name = `Siphon`;
    env.STATUS_EFFECTS.siphon.help = `grant attackers <f-col>+1HP</f-col> <f-col definition='STATUS++regen'>+1T:REGEN</f-col>
<n-col>when struck</n-col>, receive <o-col definition='STATUS++puncture'>+1T:PUNCTURE</o-col>`;

    env.STATUS_EFFECTS.siphon.strings.siphon = `%TARGET's siphon shares HP!`;
    env.STATUS_EFFECTS.siphon.strings.steal = `%USER steals [amt]HP from %TARGET!`;


    /* - redirection - */

    env.STATUS_EFFECTS.redirection.name = `Redirection`;
    env.STATUS_EFFECTS.redirection.help = () => `[[ORIGIN]] intercepting incoming attacks${env?.rpg?.is2D ? "\n+1 <n-col definition='STATUS++kb'>KNOCKBACK</n-col> resistance" : ''}\nremoved if [[ORIGIN]] receives <span definition='STATUS++stun'>STUN</span>`;

    env.STATUS_EFFECTS.redirection.strings.stunOpening = `%USER's stun leaves %TARGET open!`;
    env.STATUS_EFFECTS.redirection.strings.intercept = `%USER intercepts the attack on %TARGET!`;
    env.STATUS_EFFECTS.redirection.strings.floater = `REDIRECT`;
    env.STATUS_EFFECTS.redirection.strings.covered = `COVERED BY...`;


    /* - redirector - */

    env.STATUS_EFFECTS.redirector.name = `Redirector`;
    env.STATUS_EFFECTS.redirector.help = () => `providing area protection\n+1 <n-col definition='STATUS++kb'>KNOCKBACK</n-col> resistance`;


    /* - counter - */

    env.STATUS_EFFECTS.counter.name = `Counter`;
    env.STATUS_EFFECTS.counter.help = () => `when attacked, use primary action on attacker${env.rpg?.is2D ? `\nblocks <n-col definition='STATUS++kb'>knockback</n-col> from counterable attacks` : ""}\n<span class='minorstate'>removed by <o-col definition='STATUS++stun'>STUN</o-col></span>`;


    /* - conjoined - */

    env.STATUS_EFFECTS.conjoined.name = `Conjoined`;
    env.STATUS_EFFECTS.conjoined.help = `share HP with all other conjoined entities`;


    /* - conjoined_baseslug - */

    env.STATUS_EFFECTS.conjoined_baseslug.name = `Conjoined`;
    env.STATUS_EFFECTS.conjoined_baseslug.help = `share HP with all similar entities`;


    /* - ethereal - */

    env.STATUS_EFFECTS.ethereal.name = `Ethereal`;
    env.STATUS_EFFECTS.ethereal.help = `disappear on death`;


    /* - ethereal_passive - */

    env.STATUS_EFFECTS.ethereal_passive.name = `Ethereal`;
    env.STATUS_EFFECTS.ethereal_passive.help = `disappear on death`;


    /* - untargetable - */

    env.STATUS_EFFECTS.untargetable.name = `Untargetable`;
    env.STATUS_EFFECTS.untargetable.help = `cannot directly attack, seek other means`;


    /* - untargetable_silent - */

    env.STATUS_EFFECTS.untargetable_silent.name = `Untargetable`;
    env.STATUS_EFFECTS.untargetable_silent.help = `cannot directly attack, seek other means`;


    /* - sacrifice - */

    env.STATUS_EFFECTS.sacrifice.name = `Sacrifice`;
    env.STATUS_EFFECTS.sacrifice.help = `+2 outgoing damage/heal, +200% ACC% & CRIT%, consumed by next action`;


    /* - surge - */

    env.STATUS_EFFECTS.surge.name = `Surge`;
    env.STATUS_EFFECTS.surge.help = `use next active action twice<span class='minorstate shiftdetail'>
does not consume item charges when reusing item actions</span>`;


    /* - wild_surge - */

    env.STATUS_EFFECTS.wild_surge.name = `Wild Surge`;
    env.STATUS_EFFECTS.wild_surge.help = `reuse next targeted action across swath of actors
<n-col>if beneficial</n-col>, action used on <f-col>all allies</f-col>
<n-col>if offensive</n-col>, action used on <o-col>all foes</o-col>`;


    /* - attack_drone - */

    env.STATUS_EFFECTS.attack_drone.name = `Attack Drone`;
    env.STATUS_EFFECTS.attack_drone.help = `<n-col>on turn</n-col>, autohit all <o-col definition='STATUS++vulnerable'>vulnerable</o-col> foes for <o-col>-1HP</o-col>`;

    env.STATUS_EFFECTS.attack_drone.strings.strike = `%USER's attack drone strikes!`;
    env.STATUS_EFFECTS.attack_drone.strings.hit = `%TARGET is struck!`;
    env.STATUS_EFFECTS.attack_drone.strings.evade = `%TARGET evades!`;


    /* - retaliation - */

    env.STATUS_EFFECTS.retaliation.name = `Retaliate`;
    env.STATUS_EFFECTS.retaliation.help = `<n-col>on ally evade</n-col>, strike their attacker with primary (1st) action`;


    /* - ichor_last_stand - */

    env.STATUS_EFFECTS.ichor_last_stand.name = `Attentive`;
    env.STATUS_EFFECTS.ichor_last_stand.help = `<n-col>when an ally is crit-struck</n-col> beneath 50%HP, or <n-col>hit</n-col> beneath 25%HP, use secondary action on them<n-col class='minorstate'>
only if secondary is beneficial</n-col>`;


    /* - impatient - */

    env.STATUS_EFFECTS.impatient.name = `Impatient`;
    env.STATUS_EFFECTS.impatient.help = `<n-col>when an ally crit-strikes a foe</n-col>, use primary on that foe`;


    /* - active_support - */

    env.STATUS_EFFECTS.active_support.name = `Active Support`;
    env.STATUS_EFFECTS.active_support.help = `<n-col>when an ally crits a foe</n-col>,
use secondary based on type
<n-col>beneficial::</n-col>used on <f-col>ally</f-col>
<n-col>offensive::</n-col>used on <o-col>foe</o-col>
<n-col>variable::</n-col>randomly used on <f-col>ally</f-col> or <o-col>foe</o-col>`;


    /* - visionary - */

    env.STATUS_EFFECTS.visionary.name = `Visionary`;
    env.STATUS_EFFECTS.visionary.help = `<n-col>on crit-strike</n-col>, use utility action<n-col class="shiftdetail">
utility used on foe if targeted</n-col>`;


    /* - visionary_geli - */

    env.STATUS_EFFECTS.visionary_geli.name = `Visionary (Sniper)`;
    env.STATUS_EFFECTS.visionary_geli.help = `<n-col>on crit-strike</n-col>, use utility action<n-col class="shiftdetail">
utility used on foe if targeted</n-col>`;


    /* - spotter - */

    env.STATUS_EFFECTS.spotter.name = `Spotter`;
    env.STATUS_EFFECTS.spotter.help = `<n-col>when an ally misses a foe</n-col>,
inflict <span definition='STATUS++vulnerable'>+2T:VULNERABLE</span> on that foe`;

    env.STATUS_EFFECTS.spotter.strings.observe = `%USER observes their foe...`;
    env.STATUS_EFFECTS.spotter.strings.vulnerability = `a vulnerability is spotted in %TARGET!`;


    /* - claws_chitin - */

    env.STATUS_EFFECTS.claws_chitin.name = `Chitin Deformation`;
    env.STATUS_EFFECTS.claws_chitin.help = `<n-col>on hit</n-col>, inflict <span definition='STATUS++puncture'>+1T:PUNCTURE</span>`;

    env.STATUS_EFFECTS.claws_chitin.strings.leaveWound = `%USER's claws leave an extra wound!`;
    env.STATUS_EFFECTS.claws_chitin.strings.bleed = `%TARGET bleeds!`;
    env.STATUS_EFFECTS.claws_chitin.strings.fail = `something stops %TARGET from bleeding...`;


    /* - claws_wound - */

    env.STATUS_EFFECTS.claws_wound.name = `Ravenous`;
    env.STATUS_EFFECTS.claws_wound.help = `<n-col>on hit</n-col>, if target has <span definition='STATUS++puncture'>>5T:PUNCTURE,</span>
inflict <span definition='STATUS++open_wound'>+1T:OPEN WOUND</span>`;

    env.STATUS_EFFECTS.claws_wound.strings.growVisceral = `%USER's attacks grow more visceral!`;
    env.STATUS_EFFECTS.claws_wound.strings.woundsMount = `%TARGET's wounds mount!`;


    /* - claws_focus - */

    env.STATUS_EFFECTS.claws_focus.name = `Adrenaline`;
    env.STATUS_EFFECTS.claws_focus.help = `<n-col>hitting multiple times</n-col> grants <span definition='STATUS++focused'>+1T:FOCUSED</span>`;

    env.STATUS_EFFECTS.claws_focus.strings.ferocious = `%USER's attacks grow more ferocious!`;


    /* - eyes_recognition - */

    env.STATUS_EFFECTS.eyes_recognition.name = `Recognition`;
    env.STATUS_EFFECTS.eyes_recognition.help = `<n-col>when ally is hit multiple times</n-col>,
grant <span definition='STATUS++evasion'>+2T:EVASION</span>`;

    env.STATUS_EFFECTS.eyes_recognition.strings.seePattern = `%USER sees the pattern in [origin]'s attack...`;
    env.STATUS_EFFECTS.eyes_recognition.strings.evasion = `%TARGET is directed to evade!`;

    env.STATUS_EFFECTS.eyes_recognition.events.GLOBAL_onCombatHit = function ({ subject, origin, attack, beneficial, originalEventTarget }) {
        if (
            originalEventTarget.state == "dead" ||
            beneficial ||
            originalEventTarget.team.name != this.status.affecting.team.name ||
            this.status.affecting.state == "dead" ||
            hasStatus(this.status.affecting, "stun") ||
            !origin
        ) return;

        let turnDataSlug = `recognition_${this.status.affecting.slug}`

        if (!env.rpg.turnData[turnDataSlug]) env.rpg.turnData[turnDataSlug] = {}
        if (!env.rpg.turnData[turnDataSlug][originalEventTarget.slug]) env.rpg.turnData[turnDataSlug][originalEventTarget.slug] = 0
        env.rpg.turnData[turnDataSlug][originalEventTarget.slug]++

        if (env.rpg.turnData[turnDataSlug][originalEventTarget.slug] >= 2) {

            addStatus({ target: originalEventTarget, origin: this.status.affecting, status: "evasion", length: 1, noReact: true, dontDrawIconLine: true })
            drawEffectLine(this.status, target, {
                color: "neutral",
                effectClass: "baseline icon",
                duration: 3000,
                style: `--icon: url(${this.status.icon})`
            })

            env.setTimeout(() => {
                env.rpg.effectMessage.action({
                    user: this.status.affecting,
                    target: originalEventTarget,
                    action: origin.cor_ru ? this.status.strings.pattern.replace("[origin]", origin.cor_ru.name.gen) : this.status.strings.pattern.replace("[origin]", origin.name),
                    specialHitText: this.status.strings.evade,
                    reason: this.status.name,
                    isMinor: true,
                    showFullDetail: true,
                    status: this.status
                })
            }, env.ADVANCE_RATE * 0.2)
        }
    }


    /* - eyes_dancer - */

    env.STATUS_EFFECTS.eyes_dancer.name = `Dancer`;
    env.STATUS_EFFECTS.eyes_dancer.help = `<n-col>when evading an offensive strike</n-col>, gain <f-col definition='STATUS++evasion'>+1T:EVASION</f-col>`;

    env.STATUS_EFFECTS.eyes_dancer.strings.findRhythm = `%USER finds a rhythm in the attack!`;


    /* - eyes_aggression - */

    env.STATUS_EFFECTS.eyes_aggression.name = `No Plan`;
    env.STATUS_EFFECTS.eyes_aggression.help = `<n-col>no longer inflict</n-col> <span definition='STATUS++critical_flaw'>CRITICAL FLAW</span>
instead reduce length of <span definition='STATUS++stun_immune'>STUN IMMUNE</span> by 1 and inflict <span definition='STATUS++stun'>STUN</span>`;

    env.STATUS_EFFECTS.eyes_aggression.strings.act = `%USER immediately presses the advantage!`;
    env.STATUS_EFFECTS.eyes_aggression.strings.stunned = `%TARGET is stunned!`;
    env.STATUS_EFFECTS.eyes_aggression.strings.resisted = `%TARGET resists the stun!`;


    /* - ichor_finisher - */

    env.STATUS_EFFECTS.ichor_finisher.name = `Finisher`;
    env.STATUS_EFFECTS.ichor_finisher.help = `<n-col>on foe down</n-col>, receive <span definition='STATUS++empowered'>+3T:EMPOWERED</span>`;

    env.STATUS_EFFECTS.ichor_finisher.strings.confidence = `%USER's confidence swells!`;


    /* - ichor_ablative - */

    env.STATUS_EFFECTS.ichor_ablative.name = `Variir Patch`;
    env.STATUS_EFFECTS.ichor_ablative.help = `<n-col>healing others</n-col> also grants <f-col definition='STATUS++bp'>+2 barrier</f-col>`;

    env.STATUS_EFFECTS.ichor_ablative.strings.healBarrier = `%USER's heal hardens into a barrier!`;
    env.STATUS_EFFECTS.ichor_ablative.strings.shielded = `%TARGET is shielded!`;


    /* - ichor_bio - */

    env.STATUS_EFFECTS.ichor_bio.name = `Bioweapon`;
    env.STATUS_EFFECTS.ichor_bio.help = `inflict <o-col definition='STATUS++rot'>ROT</o-col> instead of <o-col definition='STATUS++siphon'>SIPHON</o-col> with 2x duration
<n-col>Actions that use</n-col> <span definition='STATUS++siphon'>SIPHON</span> now use <span definition='STATUS++rot'>ROT</span>`;

    env.STATUS_EFFECTS.ichor_bio.strings.spread = `%USER spreads insidious spores!`;
    env.STATUS_EFFECTS.ichor_bio.strings.festers = `%TARGET festers!`;


    /* - ichor_barrier - */

    env.STATUS_EFFECTS.ichor_barrier.name = `Satik Salve`;
    env.STATUS_EFFECTS.ichor_barrier.help = `outgoing heals are reduced by 2,
but grant <span definition='STATUS++bp'>+1 barrier</span> <span definition='STATUS++repairs'>+REPAIRS</span>`;

    env.STATUS_EFFECTS.ichor_barrier.strings.reparative = `%USER applies a reparative barrier!`;
    env.STATUS_EFFECTS.ichor_barrier.strings.shielded = `%TARGET is shielded!`;


    /* - ichor_resurgence - */

    env.STATUS_EFFECTS.ichor_resurgence.name = `Resurgence`;
    env.STATUS_EFFECTS.ichor_resurgence.help = `<n-col>when allies are crit</n-col>
gain <f-col definition="STATUS++focused">+1T:FOCUSED</f-col> & remove <o-col definition="STATUS++stun">STUN</o-col>`;

    env.STATUS_EFFECTS.ichor_resurgence.strings.refocus = `%TARGET's pain causes %USER to refocus!`;


    /* - bone_adaptive - */

    env.STATUS_EFFECTS.bone_adaptive.name = `Adaptive`;
    env.STATUS_EFFECTS.bone_adaptive.help = `<n-col>when struck</n-col>, gain <span definition='STATUS++spikes'>+2T:SPIKES</span>`;

    env.STATUS_EFFECTS.bone_adaptive.strings.adapt = `%USER's form adapts defensively!`;


    /* - bone_shield - */

    env.STATUS_EFFECTS.bone_shield.name = `Parii Shield`;
    env.STATUS_EFFECTS.bone_shield.help = `<n-col>on foe down</n-col>, receive <span definition='STATUS++carapace'>+2T:CARAPACE</span>`;

    env.STATUS_EFFECTS.bone_shield.strings.fashion = `%USER fashions greater defense...`;
    env.STATUS_EFFECTS.bone_shield.strings.shielded = `%TARGET's bones become a shield!`;


    /* - bone_thorns - */

    env.STATUS_EFFECTS.bone_thorns.name = `Parasitic Thorns`;
    env.STATUS_EFFECTS.bone_thorns.help = `gain <span definition='STATUS++spikes'>SPIKES</span> instead of <span definition='STATUS++carapace'>CARAPACE</span> with x2 duration. Actions that use <span definition='STATUS++carapace'>CARAPACE</span> instead use <span definition='STATUS++spikes'>SPIKES</span>`;

    env.STATUS_EFFECTS.bone_thorns.strings.twist = `%USER's carapace twists into brittle thorns...`;


    /* - bone_guard - */

    env.STATUS_EFFECTS.bone_guard.name = `Responsibility`;
    env.STATUS_EFFECTS.bone_guard.help = `<n-col>on turn</n-col>, gain <span definition='STATUS++carapace'>+1T:CARAPACE</span> per ally with <span definition='STATUS++redirection'>REDIRECTION</span>`;

    env.STATUS_EFFECTS.bone_guard.strings.protect = `%USER stands ready to protect their allies!`;


    /* - bone_barricade - */

    env.STATUS_EFFECTS.bone_barricade.name = `Barricade`;
    env.STATUS_EFFECTS.bone_barricade.help = `<n-col>+3 stun immunity</n-col>`;


    /* - light_humorist - */

    env.STATUS_EFFECTS.light_humorist.name = `Humorist`;
    env.STATUS_EFFECTS.light_humorist.help = `<n-col>on hit</n-col>, 1% chance for <o-col>-100HP</o-col>. additionally, <bst-col>laugh</bst-col><bst-col class="shiftdetail">
unknown additional effect</bst-col>`;

    env.STATUS_EFFECTS.light_humorist.strings.laugh = `%USER's strike becomes incomprehensible!`;
    env.STATUS_EFFECTS.light_humorist.strings.hit = `%TARGET is torn apart in a blur!!`;


    /* - light_veilkdrop - */

    env.STATUS_EFFECTS.light_veilkdrop.name = `Veilkdrop`;
    env.STATUS_EFFECTS.light_veilkdrop.help = `<n-col>on crit-strike</n-col>, 25% chance to inflict <span definition='STATUS++stun'>+1T:STUN</span>`;

    env.STATUS_EFFECTS.light_veilkdrop.strings.stun = `%USER's attack carries unexpected force!`;
    env.STATUS_EFFECTS.light_veilkdrop.strings.reeling = `%TARGET is left reeling!`;


    /* - light_affliction - */

    env.STATUS_EFFECTS.light_affliction.name = `Affliction`;
    env.STATUS_EFFECTS.light_affliction.help = `<n-col>receiving hits, heals, or statuses</n-col>
grants the origin <span definition='STATUS++destabilized'>+2T:DESTABILIZED</span> once per turn`;

    env.STATUS_EFFECTS.light_affliction.strings.spread = `a strange disortion spreads!`;
    env.STATUS_EFFECTS.light_affliction.strings.destabilize = `%TARGET is destabilized from their contact with %USER!`;


    /* - light_delirium - */

    env.STATUS_EFFECTS.light_delirium.name = `Delirium`;
    env.STATUS_EFFECTS.light_delirium.help = `inflict <span definition='STATUS++rot'>ROT</span> instead of <span definition='STATUS++terror'>TERROR</span> with x2 duration`;

    env.STATUS_EFFECTS.light_delirium.strings.feverish = `%USER's feverish strikes leave further wounds!`;
    env.STATUS_EFFECTS.light_delirium.strings.festers = `%TARGET festers!`;


    /* - light_spiral - */

    env.STATUS_EFFECTS.light_spiral.name = `Spiral`;
    env.STATUS_EFFECTS.light_spiral.help = `<n-col>when struck</n-col>, gain <n-col definition="STATUS++destabilized">+1T:DESTABILIZED</n-col>
<n-col>while <n-col definition="STATUS++destabilized">DESTABILIZED</n-col></n-col>, incoming <o-col definition="STATUS++stun">STUN</o-col> becomes <f-col definition="STATUS++surge">SURGE</f-col>`;

    env.STATUS_EFFECTS.light_spiral.strings.absorb = `%TARGET transforms under the trauma!`;
    env.STATUS_EFFECTS.light_spiral.strings.destabilize = `%TARGET's wounds glow a strange color...`;


    /* - daemon_rot - */

    env.STATUS_EFFECTS.daemon_rot.name = `DAEMONIC`;
    env.STATUS_EFFECTS.daemon_rot.help = `<n-col>on hit</n-col>, inflict <span definition='STATUS++rot'>+1T:ROT</span>`;

    env.STATUS_EFFECTS.daemon_rot.strings.wound = `%USER leaves an extra wound!`;
    env.STATUS_EFFECTS.daemon_rot.strings.festers = `%TARGET festers!`;


    /* - daemon_bomb - */

    env.STATUS_EFFECTS.daemon_bomb.name = `VOLATILE`;
    env.STATUS_EFFECTS.daemon_bomb.help = `<n-col>on hit</n-col>, inflict <span definition='STATUS++bomb'>+2T:BOMB</span>`;

    env.STATUS_EFFECTS.daemon_bomb.strings.leaveBomb = `%USER leaves an explosive!`;
    env.STATUS_EFFECTS.daemon_bomb.strings.bomb = `%TARGET glimmers ominously...`;


    /* - fated_claws - */

    env.STATUS_EFFECTS.fated_claws.name = `FATED::Claws`;
    env.STATUS_EFFECTS.fated_claws.help = `Action-retriggering impulses and effects may chain
<n-col>Per CLAWS humor in shell::</n-col>
- +7.5% chance to repeat HITS <span class='minorstate'>(self-triggering)</span>`;

    env.STATUS_EFFECTS.fated_claws.strings.ambition = `%USER's ambition is unstoppable!`;
    env.STATUS_EFFECTS.fated_claws.strings.rend = `%TARGET is rended again!`;


    /* - fated_eyes - */

    env.STATUS_EFFECTS.fated_eyes.name = `FATED::Eyes`;
    env.STATUS_EFFECTS.fated_eyes.help = `<n-col>on hit</n-col>, inflict <span definition='STATUS++vulnerable'>+1T:VULNERABLE</span> <span definition='STATUS++critical_flaw'>+CRITICAL FLAW</span>
<n-col>Per EYES humor in shell::</n-col>
- +50% flat accuracy
- +10% flat CRIT
<n-col class="minorstate">(flat bonuses before other modifiers)</n-col>`;

    env.STATUS_EFFECTS.fated_eyes.strings.weakness = `%USER effortlessly finds weakness!`;
    env.STATUS_EFFECTS.fated_eyes.strings.vulnerable = `%TARGET is critically vulnerable!`;


    /* - fated_ichor - */

    env.STATUS_EFFECTS.fated_ichor.name = `FATED::Ichor`;
    env.STATUS_EFFECTS.fated_ichor.help = `Heals accumulate as <f-col definition="STATUS++momentum">T:MOMENTUM</f-col>
<n-col>Per ICHOR humor in shell::</n-col>
- +1T to all status applications
- +1 flat attack/heal strength
<n-col class="minorstate">(flat bonuses before other modifiers)</n-col>`;

    env.STATUS_EFFECTS.fated_ichor.strings.embolden = `%USER's care emboldens them!`;


    /* - fated_bone - */

    env.STATUS_EFFECTS.fated_bone.name = `FATED::Bone`;
    env.STATUS_EFFECTS.fated_bone.help = `<n-col>when struck</n-col>, halve <span definition='STATUS++spikes'>SPIKES</span> instead of consuming
<n-col>Per BONE humor in shell::</n-col>
- +10 max HP on combat start
- <span definition='STATUS++carapace'>+1T:CARAPACE</span> <span definition='STATUS++spikes'>+2T:SPIKES</span> on turn
- <n-col>+1 STUN immunity</n-col>`;


    /* - fated_light - */

    env.STATUS_EFFECTS.fated_light.name = `FATED::Light`;
    env.STATUS_EFFECTS.fated_light.help = `<n-col>On turn</n-col>, use PRIMARY on foes with <span definition='STATUS++terror'>5T:TERROR</span>
<n-col>LIGHT Humor effects::</n-col>
- +10% per humor to all LIGHT chance effects
- +1 random DESTABILIZE passive on combat start per 3 humors`;


    /* - bone_spikes - */

    env.STATUS_EFFECTS.bone_spikes.name = `Heavy Chitin`;
    env.STATUS_EFFECTS.bone_spikes.help = `<span definition="STATUS++evasion">EVASION</span> becomes <span definition="STATUS++spikes">SPIKES</span>`;


    /* - bone_ablative - */

    env.STATUS_EFFECTS.bone_ablative.name = `Ablative Mending`;
    env.STATUS_EFFECTS.bone_ablative.help = `heals are converted to <span definition="STATUS++bp">barrier</span> and doubled`;


    /* - bone_collective - */

    env.STATUS_EFFECTS.bone_collective.name = `Collectivism`;
    env.STATUS_EFFECTS.bone_collective.help = `gain <span definition="ACTION++guard_weak">QUICK GUARD</span> action
grant <span definition="STATUS++empowered">+1T:EMPOWERED</span> when <span definition="STATUS++redirection">REDIRECTING</span>`;

    env.STATUS_EFFECTS.bone_collective.strings.inspire = `%USER's inspires their ward!`;
    env.STATUS_EFFECTS.bone_collective.strings.empowered = `%TARGET is empowered!`;


    /* - ichor_sacrifice - */

    env.STATUS_EFFECTS.ichor_sacrifice.name = `Adull's Sacrifice`;
    env.STATUS_EFFECTS.ichor_sacrifice.help = `<n-col>on death</n-col>, grant allies <span definition="STATUS++surge">SURGE</span>`;

    env.STATUS_EFFECTS.ichor_sacrifice.strings.inspire = `%USER's sacrifice inspires their team!`;


    /* - ichor_strength - */

    env.STATUS_EFFECTS.ichor_strength.name = `Full Strength`;
    env.STATUS_EFFECTS.ichor_strength.help = `<n-col>on turn & at full HP</n-col>,
gain <span definition="STATUS++empowered">2T:EMPOWERED</span> <span definition="STATUS++focused">2T:FOCUSED</span>`;

    env.STATUS_EFFECTS.ichor_strength.strings.proc = `%USER feels better than ever!`;


    /* - ichor_rotten - */

    env.STATUS_EFFECTS.ichor_rotten.name = `Rotten Supplies`;
    env.STATUS_EFFECTS.ichor_rotten.help = `<n-col>on turn</n-col>, gain <span definition="STATUS++rot">2T:ROT</span>
gain <span definition="STATUS++rot">5T:ROT</span> when losing <span definition="STATUS++regen">REGEN</span>`;


    /* - claws_infection - */

    env.STATUS_EFFECTS.claws_infection.name = `Infection`;
    env.STATUS_EFFECTS.claws_infection.help = `<n-col>on hit</n-col>, inflict <span definition="STATUS++puncture">1T:PUNCTURE</span>
convert into <span definition="STATUS++rot">ROT</span> if <span definition="STATUS++puncture">>=5T:PUNCTURE</span>`;

    env.STATUS_EFFECTS.claws_infection.strings.wound = `%USER leaves an extra wound!`;
    env.STATUS_EFFECTS.claws_infection.strings.bleeds = `%TARGET bleeds!`;
    env.STATUS_EFFECTS.claws_infection.strings.festers = `%TARGET's wounds fester!`;


    /* - claws_desperation - */

    env.STATUS_EFFECTS.claws_desperation.name = `Desperation`;
    env.STATUS_EFFECTS.claws_desperation.help = `<n-col>on turn, if last standing</n-col>,
gain <span definition="STATUS++focused">1T:FOCUSED</span> & <span definition="STATUS++wild_surge">+WILD SURGE</span>`;

    env.STATUS_EFFECTS.claws_desperation.strings.proc = `%USER has nothing left to lose...`;


    /* - claws_rabid - */

    env.STATUS_EFFECTS.claws_rabid.name = `Rabid`;
    env.STATUS_EFFECTS.claws_rabid.help = `targeted actions have a <span style="display: inline-block">25+<span definition="STATUS++rot">T:ROT</span>%</span> chance to become a <o-col definition="STATUS++rot">rot</o-col>-transferring <span definition="ACTION++bite">BITE</span>`;

    env.STATUS_EFFECTS.claws_rabid.strings.bite = `%USER loses control and bites %TARGET!`;


    /* - claws_ambush - */

    env.STATUS_EFFECTS.claws_ambush.name = `Ambush`;
    env.STATUS_EFFECTS.claws_ambush.help = `<n-col>on combat start</n-col>, gain <f-col definition="STATUS++stun_immune">+3T:STUN IMMUNE</f-col>
<n-col>on first turn</n-col>, remove <f-col definition="STATUS++stun_immune">STUN IMMUNE</f-col> from an opponent`;

    env.STATUS_EFFECTS.claws_ambush.strings.ambush = `AMBUSH!`;


    /* - eyes_hypercritical - */

    env.STATUS_EFFECTS.eyes_hypercritical.name = `Hypercritical`;
    env.STATUS_EFFECTS.eyes_hypercritical.help = `<span definition="STATUS++vulnerable">VULNERABILITY</span> has infinite duration and inflicts <span definition="STATUS++critical_flaw">CRITICAL FLAW</span>`;


    /* - eyes_woundedego - */

    env.STATUS_EFFECTS.eyes_woundedego.name = `Wounded Ego`;
    env.STATUS_EFFECTS.eyes_woundedego.help = `<n-col>being crit-struck</n-col> grants <span definition="STATUS++focused">1T:FOCUSED</span> & <span definition="STATUS++empowered">1T:EMPOWERED</span>`;

    env.STATUS_EFFECTS.eyes_woundedego.strings.rage = `%USER fumes with rage...`;


    /* - eyes_betrayal - */

    env.STATUS_EFFECTS.eyes_betrayal.name = `Betrayal`;
    env.STATUS_EFFECTS.eyes_betrayal.help = `20% chance for beneficial actions to be replaced with <span definition="ACTION++subvert">subversive action</span>`;

    env.STATUS_EFFECTS.eyes_betrayal.strings.betray = `%USER betrays %TARGET!!!`;


    /* - light_laughterhouse - */

    env.STATUS_EFFECTS.light_laughterhouse.name = `Laughterhouse`;
    env.STATUS_EFFECTS.light_laughterhouse.help = `most actions have a 20% chance to repeat. additionally, <bst-col>laugh</bst-col><bst-col class="shiftdetail">
unknown additional effect</bst-col>`;


    /* - light_glee - */

    env.STATUS_EFFECTS.light_glee.name = `Velzie's Glee`;
    env.STATUS_EFFECTS.light_glee.help = `incoming statuses have a 50% chance to become their opposite`;

    env.STATUS_EFFECTS.light_glee.strings.glee = `GLEE!`;


    /* - light_dark - */

    env.STATUS_EFFECTS.light_dark.name = `Dark Eye`;
    env.STATUS_EFFECTS.light_dark.help = `<n-col>on hit</n-col>, inflict <span definition="STATUS++terror">1T:TERROR</span>`;

    env.STATUS_EFFECTS.light_dark.strings.hit = `%USER strikes with hideous ferocity!`;
    env.STATUS_EFFECTS.light_dark.strings.terror = `%TARGET cowers in terror!`;


    /* - light_extreme - */

    env.STATUS_EFFECTS.light_extreme.name = `Absurdum`;
    env.STATUS_EFFECTS.light_extreme.help = `<n-col>on CRIT or when affected by a CRIT</n-col>,
double all status lengths`;

    env.STATUS_EFFECTS.light_extreme.strings.twist = `Velzie's attention twists the space!`;
    env.STATUS_EFFECTS.light_extreme.strings.strange = `%TARGET grows stranger...`;


    /* - fish_solo - */

    env.STATUS_EFFECTS.fish_solo.name = `Lone Daemon`;
    env.STATUS_EFFECTS.fish_solo.help = `<n-col>on turn</n-col>, gain <span definition="STATUS++wild_surge">+WILD SURGE</span>
grants complete immunity to <span definition="STATUS++stun">STUN</span> and <span definition="STATUS++terror">TERROR</span>`;


    /* - fish_angler - */

    env.STATUS_EFFECTS.fish_angler.name = `Deceiving Bulb`;
    env.STATUS_EFFECTS.fish_angler.help = `always prioritized as target over other allies`;


    /* - fish_mimic - */

    env.STATUS_EFFECTS.fish_mimic.name = `Mimic`;
    env.STATUS_EFFECTS.fish_mimic.help = `keep mimicked actions between fights`;


    /* - fish_trusive - */

    env.STATUS_EFFECTS.fish_trusive.name = `Gambling Adddiction`;
    env.STATUS_EFFECTS.fish_trusive.help = `<n-col>on turn</n-col>, spin the wheel`;


    /* - global_escalation - */

    env.STATUS_EFFECTS.global_escalation.name = `Escalation`;
    env.STATUS_EFFECTS.global_escalation.help = () => `${env.crittaMap ? `${env.crittaMap.getModQty("global_escalation") ? `+${Math.floor(env.crittaMap.getModQty("global_escalation") * 75)}% max HP\n` : ""}` : ""}most negative statuses have enhanced effect`;

    env.STATUS_EFFECTS.global_escalation.strings.label = `
<bst-col>ESCALATION::</bst-col>`;
    env.STATUS_EFFECTS.global_escalation.strings.effectStun = `<n-col>+[[POWER]] stun immunity</n-col>`;
    env.STATUS_EFFECTS.global_escalation.strings.effectMin = `+[[POWER]] min damage`;
    env.STATUS_EFFECTS.global_escalation.strings.effectIncomingMult = `+[[POWER]]% incoming damage/heal`;
    env.STATUS_EFFECTS.global_escalation.strings.effectDirectHeal = `+[[POWER]] direct heal`;
    env.STATUS_EFFECTS.global_escalation.strings.effectIncomingFlat = `+[[POWER]] flat incoming damage/heal`;
    env.STATUS_EFFECTS.global_escalation.strings.effectToHit = `-[[POWER]]% ACC`;
    env.STATUS_EFFECTS.global_escalation.strings.effectFearDamage = `take [[POWER]]% of ally max HP as damage when they die`;
    env.STATUS_EFFECTS.global_escalation.strings.effectDestabilized = `+[[POWER]]% incoming damage/heal, +100% outgoing`;
    env.STATUS_EFFECTS.global_escalation.strings.deathToll = `%TARGET's death takes a heavy toll...`;
    env.STATUS_EFFECTS.global_escalation.strings.crumble = `%USER's resolve crumbles!`;


    /* - global_impulse_bonus - */

    env.STATUS_EFFECTS.global_impulse_bonus.name = `Into Madness`;
    env.STATUS_EFFECTS.global_impulse_bonus.help = `receive random impulse per stack of Into Madness`;


    /* - appeasement - */

    env.STATUS_EFFECTS.appeasement.name = `Appeasement`;
    env.STATUS_EFFECTS.appeasement.help = `<n-col>when an ally dies</n-col>, take their <o-col>max HP * 2</o-col> as damage
<n-col>when DOWNed</n-col>, also <n-col>DOWN</n-col> all other allies`;

    env.STATUS_EFFECTS.appeasement.strings.appeased = `APPEASED!`;
    env.STATUS_EFFECTS.appeasement.strings.damaged = `%USER is damaged for [amt]HP as %TARGET falls!`;


    /* - appeasement_spawn - */

    env.STATUS_EFFECTS.appeasement_spawn.name = `Appeasement`;
    env.STATUS_EFFECTS.appeasement_spawn.help = () => `max HP increased by 5% of summoner's max HP`;


    /* - spawner - */

    env.STATUS_EFFECTS.spawner.name = `Spawner`;
    env.STATUS_EFFECTS.spawner.help = `when struck with direct damage, summon minor ally
not triggered by statuses or non-harmful actions`;


    /* - mimic - */

    env.STATUS_EFFECTS.mimic.name = `Mimic`;
    env.STATUS_EFFECTS.mimic.help = `will use last action used by foe in same party slot
<span class="minorstate">cannot copy items or actions requiring certain statuses</span>`;

    env.STATUS_EFFECTS.mimic.strings.note = `%USER takes note!`;
    env.STATUS_EFFECTS.mimic.strings.item = `%USER doesn't have the item for that action...!`;
    env.STATUS_EFFECTS.mimic.strings.mimicked = `MIMICKED!`;


    /* - permanent_hp - */

    env.STATUS_EFFECTS.permanent_hp.name = `Partial Participant`;
    env.STATUS_EFFECTS.permanent_hp.help = `unable to be reset, damage dealt is kept through iterations
<span definition='STATUS++terror'>TERROR</span> reduces summoned ally strength
<span definition='STATUS++stun'>STUN</span> instead becomes <span definition='STATUS++vulnerable'>+3T:VULNERABLE</span>`;


    /* - imperfect_reset - */

    env.STATUS_EFFECTS.imperfect_reset.name = `Ruleset Paradox`;
    env.STATUS_EFFECTS.imperfect_reset.help = `upon status expiry, end combat and reset iteration with more hostile parameters
current party will persist`;

    env.STATUS_EFFECTS.imperfect_reset.strings.earlyHelp = `UNKNOWN EFFECT`;
    env.STATUS_EFFECTS.imperfect_reset.strings.realHelp = `upon status expiry, end combat and reset iteration with more hostile parameters
current party will persist`;


    /* - malware_drill - */

    env.STATUS_EFFECTS.malware_drill.name = `DRILL`;
    env.STATUS_EFFECTS.malware_drill.help = `<span definition='STATUS++puncture'>PUNCTURE</span>'s effectiveness is doubled on this actor`;


    /* - malware_rot - */

    env.STATUS_EFFECTS.malware_rot.name = `ROTTING`;
    env.STATUS_EFFECTS.malware_rot.help = `upon receiving <span definition='STATUS++regen'>REGEN</span>, instead turn it into <span definition='STATUS++rot'>ROT</span>`;


    /* - driver - */

    env.STATUS_EFFECTS.driver.name = `Driver`;
    env.STATUS_EFFECTS.driver.help = `can pilot the vessel
<n-col>on turn</n-col>, advance vessel position forward`;


    /* - invincible - */

    env.STATUS_EFFECTS.invincible.name = `Invincible`;
    env.STATUS_EFFECTS.invincible.help = `cannot be defeated by any means
system interruption to maintain disabled gameplay`;


    /* - intrusive - */

    env.STATUS_EFFECTS.intrusive.name = `???`;
    env.STATUS_EFFECTS.intrusive.help = `???
<n-col>+4 STUN IMMUNITY</n-col>`;


    /* - intrusive_veins - */

    env.STATUS_EFFECTS.intrusive_veins.name = `???`;
    env.STATUS_EFFECTS.intrusive_veins.help = `Limited to receiving 1 HIT per turn
On turn, limit increases by 1`;

    env.STATUS_EFFECTS.intrusive_veins.strings.blocked = `Imperceptible veins halt further contact...`;


    /* - weak_point - */

    env.STATUS_EFFECTS.weak_point.name = `Weak Point`;
    env.STATUS_EFFECTS.weak_point.help = `receive +1000% incoming damage/heal while stunned`;


    /* - hyperstun - */

    env.STATUS_EFFECTS.hyperstun.name = `Weak Point Exposed`;
    env.STATUS_EFFECTS.hyperstun.help = `skip turn, +1000% incoming damage/heal`;


    /* - ominous_timer - */

    env.STATUS_EFFECTS.ominous_timer.name = `Ominous Timer`;
    env.STATUS_EFFECTS.ominous_timer.help = `unknown, asynchronous effect
paused while STUNNED`;

    env.STATUS_EFFECTS.ominous_timer.strings.imminent = `DETONATION IMMINENT`;
    env.STATUS_EFFECTS.ominous_timer.strings.ready = `[name] is about to detonate!`;


    /* - lootbox - */

    env.STATUS_EFFECTS.lootbox.name = `Item Carrier`;
    env.STATUS_EFFECTS.lootbox.help = `dropping item on death`;


    /* - rifle_bearer - */

    env.STATUS_EFFECTS.rifle_bearer.name = `Armed`;
    env.STATUS_EFFECTS.rifle_bearer.help = `wielding symbiotic rifle, grants action SLUDGE VOLLEY
removed if other ally is armed`;


    /* - kb_immune - */

    env.STATUS_EFFECTS.kb_immune.name = `Immovable`;
    env.STATUS_EFFECTS.kb_immune.help = `ignores <n-col definition='STATUS++kb'>knockback</n-col>`;


    /* - unnatural_speed - */

    env.STATUS_EFFECTS.unnatural_speed.name = `Unnatural Speed`;
    env.STATUS_EFFECTS.unnatural_speed.help = `'instant relocation on turn start if not near foe'`;


    /* - coiling - */

    env.STATUS_EFFECTS.coiling.name = `Enhancing`;
    env.STATUS_EFFECTS.coiling.help = `providing continuous beneficial statuses
severed by stun or death`;


    /* - coiled - */

    env.STATUS_EFFECTS.coiled.name = `Enhanced`;
    env.STATUS_EFFECTS.coiled.help = `[[ORIGIN]] providing continuous beneficial statuses`;


    /* - channeling - */

    env.STATUS_EFFECTS.channeling.name = `Watching`;
    env.STATUS_EFFECTS.channeling.help = `channeling continuous negative effect upon distant target, severed by stun`;


    /* - channeledUpon - */

    env.STATUS_EFFECTS.channeledUpon.name = `Seen`;
    env.STATUS_EFFECTS.channeledUpon.help = `[[ORIGIN]] continuously attacking and inflicting negative status`;


    /* - drone_haunt - */

    env.STATUS_EFFECTS.drone_haunt.name = `Drone Strike`;
    env.STATUS_EFFECTS.drone_haunt.help = `persistent area from [[ORIGIN]]. -2HP/turn to foe host and vulnerable foes, 25% chance for +1T:EVASION to allies. removed if [[ORIGIN]] is downed`;


    /* - direction - */

    env.STATUS_EFFECTS.direction.name = `Direction`;
    env.STATUS_EFFECTS.direction.help = `persistent area from [[ORIGIN]]
<f-col definition='STATUS++evasion'>+1T:EVASION</f-col> to [[ORIGIN]] allies
<o-col definition='STATUS++vulnerable'>+1T:VULNERABLE</o-col> to [[ORIGIN]] opponents
removed if [[ORIGIN]] is <n-col>DOWN</n-col>`;


    /* - shroud_vekoa - */

    env.STATUS_EFFECTS.shroud_vekoa.name = `Shroud`;
    env.STATUS_EFFECTS.shroud_vekoa.help = `unable to affect by any means`;


    /* - shroud - */

    env.STATUS_EFFECTS.shroud.name = `Shroud`;
    env.STATUS_EFFECTS.shroud.help = `unable to affect by any means`;


    /* - shroud_invincible - */

    env.STATUS_EFFECTS.shroud_invincible.name = `Shroud`;
    env.STATUS_EFFECTS.shroud_invincible.help = `unable to affect by any means`;


    /* - archivist_split_focus - */

    env.STATUS_EFFECTS.archivist_split_focus.name = `Split Focus`;
    env.STATUS_EFFECTS.archivist_split_focus.help = `creates and reinforces allies
actions intensify as veins are destroyed
<n-col>+2 stun immunity</n-col>`;


    /* - archivist_split_focus_finale - */

    env.STATUS_EFFECTS.archivist_split_focus_finale.name = `Final Focus`;
    env.STATUS_EFFECTS.archivist_split_focus_finale.help = `reforms masses into formidable foes
defends vein from all damage while standing`;


    /* - archivist_split_focus_finale_subject - */

    env.STATUS_EFFECTS.archivist_split_focus_finale_subject.name = `Final Focus`;
    env.STATUS_EFFECTS.archivist_split_focus_finale_subject.help = `shrouded while archivist stands`;


    /* - unstable_position - */

    env.STATUS_EFFECTS.unstable_position.name = `Flickering`;
    env.STATUS_EFFECTS.unstable_position.help = `'relocate to random tile on turn start'`;


    /* - blur_evasive - */

    env.STATUS_EFFECTS.blur_evasive.name = `Evasive`;
    env.STATUS_EFFECTS.blur_evasive.help = `-25% IN:ACC%`;


    /* - windup_telegraph - */

    env.STATUS_EFFECTS.windup_telegraph.name = `Windup`;
    env.STATUS_EFFECTS.windup_telegraph.help = `preparing powerful telegraphed action, interrupted by stun`;


    /* - telegraph - */

    env.STATUS_EFFECTS.telegraph.name = `Interruptible`;
    env.STATUS_EFFECTS.telegraph.help = `using telegraphed action on next turn, interrupted by stun`;


    /* - story_ceremony_tendril - */

    env.STATUS_EFFECTS.story_ceremony_tendril.name = `Ceremonial Vein`;
    env.STATUS_EFFECTS.story_ceremony_tendril.help = `a critical vein of something greater
destruction required for progression`;


    /* - story_ceremony_wall - */

    env.STATUS_EFFECTS.story_ceremony_wall.name = `Warping Coil`;
    env.STATUS_EFFECTS.story_ceremony_wall.help = `obscuring a path and its contents
destruction required for progression
<span class='minorstate'>stationary</span>`;


    /* - destructible - */

    env.STATUS_EFFECTS.destructible.name = `Obstacle`;
    env.STATUS_EFFECTS.destructible.help = `immobile, unlikely to evade`;


    /* - destructible_cross - */

    env.STATUS_EFFECTS.destructible_cross.name = `Obstacle`;
    env.STATUS_EFFECTS.destructible_cross.help = `immobile, unlikely to evade`;


    /* - destructible_wall - */

    env.STATUS_EFFECTS.destructible_wall.name = `Wall`;
    env.STATUS_EFFECTS.destructible_wall.help = `immobile, unlikely to evade`;


    /* - story_encroaching - */

    env.STATUS_EFFECTS.story_encroaching.name = `Encroaching Force`;
    env.STATUS_EFFECTS.story_encroaching.help = `advances inevitably forward
attacks any foe within distortion`;


    /* - bomb_planted - */

    env.STATUS_EFFECTS.bomb_planted.name = `Planted`;
    env.STATUS_EFFECTS.bomb_planted.help = `delayed explosive attached, detonates on activation, drops on death`;


    /* - destructible_spinalroot - */

    env.STATUS_EFFECTS.destructible_spinalroot.name = `Spinal Root`;
    env.STATUS_EFFECTS.destructible_spinalroot.help = ``;


    /* - boss_miltza - */

    env.STATUS_EFFECTS.boss_miltza.name = `Shimmering Flesh`;
    env.STATUS_EFFECTS.boss_miltza.help = `Inspired into relentless pursuit
<n-col>nigh invincible.</n-col> <n-col>+3 stun immunity</n-col><n-col class='minorstate shiftdetail'>
(-10 incoming damage, -2 knockback)</n-col>
Extremely vulnerable to <o-col>CHEMICAL FIRE</o-col> damage`;


    /* - bomb_volatile - */

    env.STATUS_EFFECTS.bomb_volatile.name = `Volatile`;
    env.STATUS_EFFECTS.bomb_volatile.help = `
<n-col>on direct IED hit or <o-col definition="STATUS++bomb">BOMB</o-col> detonation</n-col>,
create permanent <o-col>CHEMICAL FIRE</o-col> tile effect<o-col class="shiftdetail">
-20% MAX HP/turn</o-col>
<o-col definition="STATUS++bomb">BOMB</o-col> charges increase radius once`;


    /* - unnatural_carapace - */

    env.STATUS_EFFECTS.unnatural_carapace.name = `Unnatural Carapace`;
    env.STATUS_EFFECTS.unnatural_carapace.help = `-2 base incoming damage, +2KB resistance, puncture immunity
create dangerous area around self
reduced by <n-col>BOMB</n-col> detonation`;


    /* - destructible_lesserpod - */

    env.STATUS_EFFECTS.destructible_lesserpod.name = `Pod Distortion`;
    env.STATUS_EFFECTS.destructible_lesserpod.help = ``;


    /* - lesserboss_alternating - */

    env.STATUS_EFFECTS.lesserboss_alternating.name = `Reunited`;
    env.STATUS_EFFECTS.lesserboss_alternating.help = `shares HP with other foes
changes actions after 100HP lost
immune to edge distortion`;


    /* - story_reunited_itzil - */

    env.STATUS_EFFECTS.story_reunited_itzil.name = `Reunited Golem`;
    env.STATUS_EFFECTS.story_reunited_itzil.help = `powerful <n-col definition='STATUS++aiming'>aimed</n-col> attacks
starts with <f-col definition='STATUS++carapace'>20T:CARAPACE</f-col>
<n-col>immune to edge distortion</n-col>
<n-col>+2 STUN IMMUNITY</n-col>`;


    /* - story_reunited_kivii - */

    env.STATUS_EFFECTS.story_reunited_kivii.name = `Reunited Kiv`;
    env.STATUS_EFFECTS.story_reunited_kivii.help = `summons <n-col definition='STATUS++aiming'>aiming</n-col> gauntlets
utilizes stage <n-col definition='STATUS++kb'>knockback</n-col>
<n-col>+1 STUN IMMUNITY</n-col>
<span class='minorstate'>stationary</span>`;


    /* - lesserboss_overlap_collapse - */

    env.STATUS_EFFECTS.lesserboss_overlap_collapse.name = `Overlap Collapse`;
    env.STATUS_EFFECTS.lesserboss_overlap_collapse.help = `slowly collapsing combat stage into distortion`;


    /* - desperation - */

    env.STATUS_EFFECTS.desperation.name = `Last Stand`;
    env.STATUS_EFFECTS.desperation.help = `this is it.
<f-col definition='STATUS++focused'>focused</f-col> status is infinite
automatically revive self, once`;


    /* - destructible_epicenter_vein - */

    env.STATUS_EFFECTS.destructible_epicenter_vein.name = `Ceremony Vein`;
    env.STATUS_EFFECTS.destructible_epicenter_vein.help = ``;


    /* - vekoa_golem - */

    env.STATUS_EFFECTS.vekoa_golem.name = `Protector`;
    env.STATUS_EFFECTS.vekoa_golem.help = `keeping veins incorporeal`;


    /* - boss_vekoa - */

    env.STATUS_EFFECTS.boss_vekoa.name = `vekoaaaa`;
    env.STATUS_EFFECTS.boss_vekoa.help = `no elp`;


    /* - hyperfocus - */

    env.STATUS_EFFECTS.hyperfocus.name = `Hyperfocus`;
    env.STATUS_EFFECTS.hyperfocus.help = `-80% IN:ACC% & IN:CRIT%, +100% ACC%, +400% CRIT%, +1 MOVE, STUN IMMUNITY`;


    /* - autoplay_telyu - */

    env.STATUS_EFFECTS.autoplay_telyu.name = `Disconnected`;
    env.STATUS_EFFECTS.autoplay_telyu.help = `acting of her own volition`;


    /* - autoplay_tozik - */

    env.STATUS_EFFECTS.autoplay_tozik.name = `Disconnected`;
    env.STATUS_EFFECTS.autoplay_tozik.help = `acting of his own volition`;


    /* - kb - */

    env.STATUS_EFFECTS.kb.name = `Knockback`;
    env.STATUS_EFFECTS.kb.help = `immediate forced movement, transfers on impact`;


    /* - bp - */

    env.STATUS_EFFECTS.bp.name = `Barrier`;
    env.STATUS_EFFECTS.bp.help = `temporary HP, limited to 1/2 max HP`;


    /* - aiming_indicator - */

    env.STATUS_EFFECTS.aiming_indicator.name = `aiming`;
    env.STATUS_EFFECTS.aiming_indicator.help = `you should never see this`;


    /* - erratic - */

    env.STATUS_EFFECTS.erratic.name = `Erratic`;
    env.STATUS_EFFECTS.erratic.help = `altered behavior due to trauma`;


    /* - generic_can_malfunction - */

    env.STATUS_EFFECTS.generic_can_malfunction.name = `Behavior Flaw`;
    env.STATUS_EFFECTS.generic_can_malfunction.help = `behavior altered when <n-col definition='STATUS++destabilized'>destabilized</n-col>`;


    /* - targeted - */

    env.STATUS_EFFECTS.targeted.name = `Targeted`;
    env.STATUS_EFFECTS.targeted.help = `focused by opposing team`;


    /* - story_targeted - */

    env.STATUS_EFFECTS.story_targeted.name = `Targeted`;
    env.STATUS_EFFECTS.story_targeted.help = `targeted by [[ORIGIN]]`;


    /* - destabilized_p_surge - */

    env.STATUS_EFFECTS.destabilized_p_surge.name = `Visceral Surge`;
    env.STATUS_EFFECTS.destabilized_p_surge.help = `<n-col>when using primary action</n-col>, 50% chance to use it again`;


    /* - destabilized_p_support - */

    env.STATUS_EFFECTS.destabilized_p_support.name = `Visceral Support`;
    env.STATUS_EFFECTS.destabilized_p_support.help = `<n-col>when using secondary action</n-col>, 50% chance to use it again`;


    /* - destabilized_p_statuses - */

    env.STATUS_EFFECTS.destabilized_p_statuses.name = `Self Reflection`;
    env.STATUS_EFFECTS.destabilized_p_statuses.help = `double length of statuses applied by this actor`;


    /* - destabilized_p_obliteration - */

    env.STATUS_EFFECTS.destabilized_p_obliteration.name = `Obliteration`;
    env.STATUS_EFFECTS.destabilized_p_obliteration.help = `<n-col>on hit</n-col>, 2% chance for <o-col>-20HP</o-col>`;

    env.STATUS_EFFECTS.destabilized_p_obliteration.strings.megahit = `%USER's strike becomes incomprehensible!`;
    env.STATUS_EFFECTS.destabilized_p_obliteration.strings.megahitcrit = `%TARGET is torn apart in a blur!!`;


    /* - destabilized_n_flow - */

    env.STATUS_EFFECTS.destabilized_n_flow.name = `Melting Flesh`;
    env.STATUS_EFFECTS.destabilized_n_flow.help = () => `doubles effect of <o-col definition="STATUS++puncture">puncture</o-col>${page?.party?.crittamode ? ` and <o-col definition="STATUS++rot">rot</o-col>` : ""}`;


    /* - destabilized_n_squishy - */

    env.STATUS_EFFECTS.destabilized_n_squishy.name = `Feeble Flesh`;
    env.STATUS_EFFECTS.destabilized_n_squishy.help = `doubles effect of <o-col definition="STATUS++vulnerable">vulnerable</o-col>`;


    /* - destabilized_n_unsteady - */

    env.STATUS_EFFECTS.destabilized_n_unsteady.name = `Unsteady Flesh`;
    env.STATUS_EFFECTS.destabilized_n_unsteady.help = `<o-col definition="STATUS++stun">STUN</o-col> lasts 2T`;


    /* - destabilized_n_fading - */

    env.STATUS_EFFECTS.destabilized_n_fading.name = `Fading Flesh`;
    env.STATUS_EFFECTS.destabilized_n_fading.help = `<n-col>on turn end</n-col>, positive statuses lose additional 1T`;


    /* - item_restorative - */

    env.STATUS_EFFECTS.item_restorative.name = `Restoratives`;
    env.STATUS_EFFECTS.item_restorative.help = `gain 3 uses of <n-col definition='ACTION++restore'>RESTORE</n-col>
if <n-col>DOWN</n-col>, automatically use on self
<n-col>focusing</n-col> heals<n-col class='shiftdetail'> (+1HP <f-col definition='STATUS++regen'>+1T:REGEN</f-col>)</n-col> lowest HP ally
<span class='minorstate'>disabled after expending RESTORE</span>`;

    env.STATUS_EFFECTS.item_restorative.strings.selfRez = `%USER hastily applied a restorative to stay standing! ([amt] restores remain)`;
    env.STATUS_EFFECTS.item_restorative.strings.repairs = `%USER conducts repairs on %TARGET...`;
    env.STATUS_EFFECTS.item_restorative.strings.rezCall = `SELFREZ`;


    /* - item_satik - */

    env.STATUS_EFFECTS.item_satik.name = `Satik`;
    env.STATUS_EFFECTS.item_satik.help = `gain 2 uses of <n-col definition='ACTION++special_strong_barrier_allies'>APPLY ARMOR</n-col>
<n-col>when allies are crit</n-col>, grant them <f-col definition='STATUS++bp'>+1 barrier</f-col>
<span class='minorstate'>disabled after expending APPLY ARMOR</span>`;

    env.STATUS_EFFECTS.item_satik.strings.shielded = `%USER hastily shields %TARGET!`;


    /* - item_aima - */

    env.STATUS_EFFECTS.item_aima.name = `Observer`;
    env.STATUS_EFFECTS.item_aima.help = `doubles HIT chance
<n-col>focusing</n-col> inflicts <o-col definition='STATUS++vulnerable'>+2T:VULNERABLE</o-col> on foes without it`;

    env.STATUS_EFFECTS.item_aima.strings.scan = `%USER scans their foes for weakness...`;


    /* - item_kavruka - */

    env.STATUS_EFFECTS.item_kavruka.name = `Explosives`;
    env.STATUS_EFFECTS.item_kavruka.help = `gain 3 uses of <n-col definition='ACTION++special_attack_all'>Explosive</n-col>
<n-col>on CRIT</n-col>, 25% chance for blast<n-col class='shiftdetail minordetail'>
(75%ACC -1HP HIT on all foes, once per turn)</n-col>
<span class='minorstate'>disabled after expending uses</span>`;

    env.STATUS_EFFECTS.item_kavruka.strings.draw = `%USER pulls an explosive kavruka from their satchel...`;


    /* - item_disabler - */

    env.STATUS_EFFECTS.item_disabler.name = `Disable`;
    env.STATUS_EFFECTS.item_disabler.help = `gain 1 use of <n-col definition='ACTION++disabler_pulse'>Disabler</n-col>
<n-col>on CRIT</n-col>, inflict <o-col definition='STATUS++stun'>+STUN</o-col> once per turn
<span class='minorstate'>disabled after expending action</span>`;

    env.STATUS_EFFECTS.item_disabler.strings.jab = `%USER follows up with a disabler jab!`;
    env.STATUS_EFFECTS.item_disabler.strings.stunned = `%TARGET is stunned!`;


    /* - item_pariispike - */

    env.STATUS_EFFECTS.item_pariispike.name = `Piercing`;
    env.STATUS_EFFECTS.item_pariispike.help = `inflict <o-col definition="STATUS++puncture">1T:PUNCTURE</o-col> <n-col>on HIT</n-col>
<n-col>on HIT</n-col>, <o-col definition="STATUS++stun">+STUN</o-col> if target has <o-col definition="STATUS++puncture">>10T:PUNCTURE</o-col>`;

    env.STATUS_EFFECTS.item_pariispike.strings.wound = `%USER's attack leaves an extra wound!`;
    env.STATUS_EFFECTS.item_pariispike.strings.bleed = `%TARGET bleeds!`;
    env.STATUS_EFFECTS.item_pariispike.strings.overwhelm = `%TARGET is overwhelmed by their wounds!`;


    /* - item_fusedlight - */

    env.STATUS_EFFECTS.item_fusedlight.name = `Anomalous Light`;
    env.STATUS_EFFECTS.item_fusedlight.help = `<n-col>on turn</n-col>, random ally gains +2T of random positive status<n-col class="shiftdetail minordetail">
(<f-col definition="STATUS++focused">FOCUSED</f-col>, <f-col definition="STATUS++evasion">EVASION</f-col>, <f-col definition="STATUS++destabilized">DESTABILIZED,</f-col> or <f-col definition="STATUS++regen">REGEN</f-col>)</n-col>`;

    env.STATUS_EFFECTS.item_fusedlight.strings.boon = `%USER's strange light grants a boon to %TARGET!`;


    /* - item_antibarrier - */

    env.STATUS_EFFECTS.item_antibarrier.name = `Injector`;
    env.STATUS_EFFECTS.item_antibarrier.help = `<o-col>+3</o-col> damage to foes with <n-col definition="STATUS++bp">barrier</n-col>
<n-col>on CRIT</n-col> against foe with <n-col definition="STATUS++bp">barrier</n-col>, inflict <o-col definition="STATUS++million_teeth">MILLION TEETH</o-col>`;

    env.STATUS_EFFECTS.item_antibarrier.strings.pierce = `%USER's strike pierces %TARGET's barrier!`;
    env.STATUS_EFFECTS.item_antibarrier.strings.barrierTeeth = `%TARGET's barrier crawls insidiously...`;


    /* - item_shell - */

    env.STATUS_EFFECTS.item_shell.name = `Deflection`;
    env.STATUS_EFFECTS.item_shell.help = `gain 2 uses of <n-col definition='ACTION++special_guard_all'>FRONTLINE</n-col>
<n-col>focusing</n-col> grants <f-col definition='STATUS++carapace'>+1T:CARAPACE</f-col>
<n-col>+1 stun immunity</n-col>
<span class='minorstate'>disabled after expending action</span>`;

    env.STATUS_EFFECTS.item_shell.strings.shell = `%USER focuses on deflection...`;


    /* - item_antistatus - */

    env.STATUS_EFFECTS.item_antistatus.name = `Deapplicators`;
    env.STATUS_EFFECTS.item_antistatus.help = `<n-col>on hit</n-col>, reduce <f-col definition='STATUS++carapace'>CARAPACE</f-col> by 1T
<n-col>on CRIT</n-col>, reduce positive statuses by 1T
<o-col>+3</o-col> damage to foes with <n-col definition="STATUS++bp">barrier</n-col>`;

    env.STATUS_EFFECTS.item_antistatus.strings.hit = `%USER wears at %TARGET's alterations!`;
    env.STATUS_EFFECTS.item_antistatus.strings.carapace = `%TARGET's carapace fades...`;
    env.STATUS_EFFECTS.item_antistatus.strings.gnaw = `the deapplicators gnaw away!`;


    /* - item_surge - */

    env.STATUS_EFFECTS.item_surge.name = `Ukuzu`;
    env.STATUS_EFFECTS.item_surge.help = `twice per combat, gain <f-col definition='STATUS++surge'>+SURGE</f-col> when <n-col>focusing</n-col>
<n-col>on foe down</n-col>, receive <f-col definition='STATUS++surge'>+SURGE</f-col>
<span class='minorstate'>disabled after expending uses</span>`;

    env.STATUS_EFFECTS.item_surge.strings.surge = `%USER shakes with energy...`;
    env.STATUS_EFFECTS.item_surge.strings.deathSurge = `%USER's mind races towards victory!`;


    /* - item_hope - */

    env.STATUS_EFFECTS.item_hope.name = `Hope`;
    env.STATUS_EFFECTS.item_hope.help = `+25% CRIT & +1 outgoing damage per T:TERROR
gain +1T:FOCUSED instead of being stunned by TERROR
actions can no longer be disabled by TERROR`;


    /* - item_translator - */

    env.STATUS_EFFECTS.item_translator.name = `████`;
    env.STATUS_EFFECTS.item_translator.help = `<n-col definition='STATUS++destabilized'>DESTABILIZED</n-col> is infinite for all
<n-col>on CRIT</n-col>, 10% chance for massive damage<n-col class="shiftdetail minorstate">
(-20HP, ignores modifiers)</n-col>
<n-col>focusing</n-col> grants <n-col definition='STATUS++destabilized'>+DESTABILIZED</n-col>`;

    env.STATUS_EFFECTS.item_translator.strings.crit = `%USER's strike becomes incomprehensible!`;
    env.STATUS_EFFECTS.item_translator.strings.critDetail = `%TARGET is ███████████!`;


    /* - item_rot - */

    env.STATUS_EFFECTS.item_rot.name = `Red Veins`;
    env.STATUS_EFFECTS.item_rot.help = `Limit damage from <bst-col definition='STATUS++rot'>ROT</bst-col> to <o-col>-1HP</o-col>
Receive <bst-col>+5T:ROT</bst-col> <n-col>per turn</n-col>
Receive <bst-col>+10T:ROT</bst-col> when <n-col>focusing</n-col>
Transfer up to <bst-col>5T:ROT</bst-col> to target <n-col>on hit</n-col>`;

    env.STATUS_EFFECTS.item_rot.strings.transfer = `%USER transfers the infestation!`;
    env.STATUS_EFFECTS.item_rot.strings.fester = `%TARGET festers!`;
    env.STATUS_EFFECTS.item_rot.strings.userFester = `%USER festers...`;


    /* - item_wound - */

    env.STATUS_EFFECTS.item_wound.name = `Shell Cracker`;
    env.STATUS_EFFECTS.item_wound.help = `<n-col>use target's missing %HP as chance</n-col> to repeat damage & inflict <o-col definition='STATUS++open_wound'>+2T:OPEN WOUND</o-col> <n-col>on hit</n-col>
<n-col>hitting a foe</n-col> with <o-col definition='STATUS++open_wound'>OPEN WOUND</o-col> inflicts <o-col definition='STATUS++weakened'>+2T:WEAKENED</o-col>`;

    env.STATUS_EFFECTS.item_wound.strings.deepHit = `%USER drives their attack deeper!`;
    env.STATUS_EFFECTS.item_wound.strings.exploit = `%USER exploits %TARGET's wound!`;
    env.STATUS_EFFECTS.item_wound.strings.doubleHit = `%TARGET is hit twice!`;


    /* - item_spikes - */

    env.STATUS_EFFECTS.item_spikes.name = `Twisting Shell`;
    env.STATUS_EFFECTS.item_spikes.help = `gain 2 uses of <n-col definition='ACTION++multiply_spikes'>MULTIPLY SPIKES</n-col>
<n-col>hitting or being hit</n-col> grants <f-col definition='STATUS++spikes'>+2T:SPIKES</f-col>
<span class='minorstate'>expending uses inflicts <o-col definition='STATUS++targeted'>+1T:TARGETED</o-col> and disables passive</span>`;

    env.STATUS_EFFECTS.item_spikes.strings.adapt = `%USER's shell adapts with the trauma!`;
    env.STATUS_EFFECTS.item_spikes.strings.spikesGrow = `%USER's spikes grow deadlier!`;


    /* - item_siphon - */

    env.STATUS_EFFECTS.item_siphon.name = `Vecrivi Spike`;
    env.STATUS_EFFECTS.item_siphon.help = () => `gain 3 uses of <n-col definition='ACTION++parasite_item'>VECRIVI</n-col>\nvs foes with <o-col definition="STATUS++siphon">SIPHON</o-col>${env.crittaMap ? ` or <bst-col definition="STATUS++rot">ROT</bst-col>` : ""}:\n- <n-col>on HIT</n-col>, inflict <o-col definition='STATUS++vulnerable'>+1T:VULNERABLE</o-col>\n- <n-col>on CRIT</n-col>, steal <o-col>-5%HP</o-col>\n<span class='minorstate'>disabled after expending VECRIVI</span>`;

    env.STATUS_EFFECTS.item_siphon.strings.generalAction = `%USER jabs at their targets with the vecrivi!`;
    env.STATUS_EFFECTS.item_siphon.strings.vulnerable = `%TARGET grows sickly and unsteady!`;
    env.STATUS_EFFECTS.item_siphon.strings.extraDmg = `%USER steals [amt] HP from %TARGET!`;


    /* - item_rifle - */

    env.STATUS_EFFECTS.item_rifle.name = `Symbiotic Rifle`;
    env.STATUS_EFFECTS.item_rifle.help = `gain <n-col definition='ACTION++special_fullauto_item'>FULL AUTO</n-col>
<n-col>hitting or being hit</n-col> grants <bst-col definition='STATUS++rifle_ammo'>+1T:AMMO</bst-col>`;

    env.STATUS_EFFECTS.item_rifle.strings.ammoDrain = `%USER's rifle collects viscera!`;
    env.STATUS_EFFECTS.item_rifle.strings.ammoIncrease = `Another shot is chambered...`;


    /* - rifle_ammo - */

    env.STATUS_EFFECTS.rifle_ammo.name = `Ammo`;
    env.STATUS_EFFECTS.rifle_ammo.help = `number of shots next <n-col definition='ACTION++special_fullauto_item'>FULL AUTO</n-col> use will fire`;


    /* - rifle_firing - */

    env.STATUS_EFFECTS.rifle_firing.name = `FIRING!!!`;
    env.STATUS_EFFECTS.rifle_firing.help = `offensive mode active
cannot gain further ammo`;


    /* - story_tutorial_golem - */

    env.STATUS_EFFECTS.story_tutorial_golem.name = `Assistant Frame`;
    env.STATUS_EFFECTS.story_tutorial_golem.help = `grows erratic after sufficient damage
behavior altered when <n-col definition="STATUS++destabilized">DESTABILIZED</n-col>`;

    env.STATUS_EFFECTS.story_tutorial_golem.strings.unstable = `%USER grows erratic!`;


    /* - story_container - */

    env.STATUS_EFFECTS.story_container.name = `Item Container`;
    env.STATUS_EFFECTS.story_container.help = ``;

    env.STATUS_EFFECTS.story_container.strings.container_exploder_title = `explosive`;
    env.STATUS_EFFECTS.story_container.strings.container_evader_title = `evasive`;
    env.STATUS_EFFECTS.story_container.strings.container_spy_title = `observer`;
    env.STATUS_EFFECTS.story_container.strings.container_sfer_title = `heavy`;
    env.STATUS_EFFECTS.story_container.strings.container_exploder = `possesses explosive strike`;
    env.STATUS_EFFECTS.story_container.strings.container_evader = `gains <f-col definition="STATUS++evasion">+1T:EVASION</f-col> after <n-col>hitting</n-col> foe`;
    env.STATUS_EFFECTS.story_container.strings.container_spy = `inflicts <o-col definition="STATUS++vulnerability">vulnerability</o-col>`;
    env.STATUS_EFFECTS.story_container.strings.container_sfer = `attack may <o-col definition="STATUS++stun">stun</o-col>`;
    env.STATUS_EFFECTS.story_container.strings.generalHelp = `<span class="minorstate">
behavior altered when destabilized</span>`;
    env.STATUS_EFFECTS.story_container.strings.evaderName = `Container`;


    /* - story_listener - */

    env.STATUS_EFFECTS.story_listener.name = `Listener`;
    env.STATUS_EFFECTS.story_listener.help = `immobile device
utilizes no direct action
<n-col>complete stun immunity</n-col>`;


    /* - story_attendant - */

    env.STATUS_EFFECTS.story_attendant.name = `Attendant Frame`;
    env.STATUS_EFFECTS.story_attendant.help = `must first <o-col definition='STATUS++story_targeted'>target</o-col> foes to strike
grows erratic after sufficient damage
<span class="minorstate">behavior altered when destabilized</span>`;

    env.STATUS_EFFECTS.story_attendant.strings.unstable = `%USER grows erratic!`;


    /* - story_veilklight - */

    env.STATUS_EFFECTS.story_veilklight.name = `Odd Light`;
    env.STATUS_EFFECTS.story_veilklight.help = `misusing minor dull connectivity`;

    env.STATUS_EFFECTS.story_veilklight.strings.granting = `
granting <f-col definition="STATUS++%STATUSSLUG">+%STATUSAMTT:%STATUSNAME</f-col> to <o-col>%TARGET</o-col> on turn`;
    env.STATUS_EFFECTS.story_veilklight.strings.generalHelp = `<span class="minorstate">
behavior altered when destabilized</span>`;
    env.STATUS_EFFECTS.story_veilklight.strings.castLight = `%USER's light casts strange colors`;
    env.STATUS_EFFECTS.story_veilklight.strings.regen = `%TARGET's flesh continuously repairs itself...`;
    env.STATUS_EFFECTS.story_veilklight.strings.empowered = `%TARGET's limbs continuously sharpen...`;
    env.STATUS_EFFECTS.story_veilklight.strings.focused = `%TARGET's reactions seem quicker...`;


    /* - story_movefoe - */

    env.STATUS_EFFECTS.story_movefoe.name = `Vital Instrument`;
    env.STATUS_EFFECTS.story_movefoe.help = `must remain intact
descent impossible if destroyed
<n-col>allies will not target or affect by any means</n-col>`;


    /* - story_movefoe_turnsleft - */

    env.STATUS_EFFECTS.story_movefoe_turnsleft.name = `Remaining Control`;
    env.STATUS_EFFECTS.story_movefoe_turnsleft.help = `turns until ally success`;


    /* - story_mfrelay - */

    env.STATUS_EFFECTS.story_mfrelay.name = `Immobile`;
    env.STATUS_EFFECTS.story_mfrelay.help = `takes no action`;

    env.STATUS_EFFECTS.story_mfrelay.strings.exposure = `the relay is exposed!`;


    /* - story_tendrilfinal - */

    env.STATUS_EFFECTS.story_tendrilfinal.name = `Looming Tendril`;
    env.STATUS_EFFECTS.story_tendrilfinal.help = `takes no action
<n-col>DOWN</n-col> to regain further control
intensifies incoherent attack
<span class='minorstate'>disabled if <n-col definition='STATUS++stun'>stunned</n-col></span>`;


    /* - bstrd_archival - */

    env.STATUS_EFFECTS.bstrd_archival.name = `Black Corru`;
    env.STATUS_EFFECTS.bstrd_archival.help = `extremely hardy
-1 incoming damage & <n-col>cannot receive <n-col definition='STATUS++stun'>STUN</n-col></n-col>
negated if <o-col definition='STATUS++vulnerable'>VULNERABLE</o-col>
<span class='minorstate'>-50% accuracy while <n-col definition='STATUS++destabilized'>DESTABILIZED</n-col></span>`;

    env.STATUS_EFFECTS.bstrd_archival.strings.stagger = `%USER staggers!`;
    env.STATUS_EFFECTS.bstrd_archival.strings.stunResist = `%USER resists the stun...`;
    env.STATUS_EFFECTS.bstrd_archival.strings.flaw = `a flaw in %USER's chassis is revealed!`;
    env.STATUS_EFFECTS.bstrd_archival.strings.stunVuln = `%USER is vulnerable to stun!`;
    env.STATUS_EFFECTS.bstrd_archival.strings.resisted = `%USER is hardly scratched`;


    /* - bstrd_shelf - */

    env.STATUS_EFFECTS.bstrd_shelf.name = `Beastly Visage`;
    env.STATUS_EFFECTS.bstrd_shelf.help = `a twisted and familiar shape
<n-col>actions allow choice of result
+3 stun immunity</n-col>`;


    /* - bstrd_boss - */

    env.STATUS_EFFECTS.bstrd_boss.name = `BSTRD`;
    env.STATUS_EFFECTS.bstrd_boss.help = `inhabited by unknown force
<n-col>steals HP from allies when necessary
+3 stun immunity</n-col>`;

    env.STATUS_EFFECTS.bstrd_boss.strings.steal = `%USER steals [amt]HP from %TARGET!`;
    env.STATUS_EFFECTS.bstrd_boss.strings.hurryUp = `cmon HURRY IT UPPPPPP`;
    env.STATUS_EFFECTS.bstrd_boss.strings.watever = `WATEVER %|`;
    env.STATUS_EFFECTS.bstrd_boss.strings.killing = `im killing u`;
    env.STATUS_EFFECTS.bstrd_boss.strings.niceTry1 = `OW ! OW! !! OWW!!!`;
    env.STATUS_EFFECTS.bstrd_boss.strings.niceTry2 = `jk u cant hurt FIRE WITH FIRE lol im immune`;


    /* - terror - */

    env.STATUS_EFFECTS.terror.name = `Terror`;
    env.STATUS_EFFECTS.terror.help = `inhibits abilities as intensity increases, eventually stuns (MAX:5)
does not tick per turn, instead reduced via crits, focus, & camaraderie`;

    env.STATUS_EFFECTS.terror.strings.generalHeader = `inhibits abilities as intensity increases (MAX:5)`;
    env.STATUS_EFFECTS.terror.strings.stage1 = `-25% CRIT%`;
    env.STATUS_EFFECTS.terror.strings.stage2 = `-50% CRIT%`;
    env.STATUS_EFFECTS.terror.strings.stage3 = `-50% CRIT%, <n-col>focus actions prohibited</n-col>`;
    env.STATUS_EFFECTS.terror.strings.stage4 = `-50% CRIT%, <n-col>secondary & focus actions prohibited</n-col>`;
    env.STATUS_EFFECTS.terror.strings.stage5 = `-50% CRIT%, <n-col>secondary & focus actions prohibited</n-col>, further <o-col definition="STATUS++terror">TERROR</o-col> inflicts <o-col definition="STATUS++stun">STUN</o-col>`;
    env.STATUS_EFFECTS.terror.strings.general2D = `, -1 movement`;
    env.STATUS_EFFECTS.terror.strings.generalFooter = `<n-col class="minorstate">reduced via crits, focus, & camaraderie</n-col>`;
    env.STATUS_EFFECTS.terror.strings.generalReduction = `hope quells the terror!`;
    env.STATUS_EFFECTS.terror.strings.focused = `focus clears %USER's mind!`;
    env.STATUS_EFFECTS.terror.strings.crit = `%TARGET's powerful strike emboldens their allies!`;
    env.STATUS_EFFECTS.terror.strings.allyHelp = `%TARGET's help is a brief respite for %USER...`;
    env.STATUS_EFFECTS.terror.strings.enemyDown = `%TARGET's defeat emboldens %USER!`;
    env.STATUS_EFFECTS.terror.strings.peak = `%USER is overwhelmed by terror!`;
    env.STATUS_EFFECTS.terror.strings.paralyzed = `%USER can't move...`;
    env.STATUS_EFFECTS.terror.strings.antiParalyzed = `%USER is enraged by the horrors!`;


    /* - story_terriblelife - */

    env.STATUS_EFFECTS.story_terriblelife.name = `Terrible Life`;
    env.STATUS_EFFECTS.story_terriblelife.help = `what ought not to be
<n-col>on HIT</n-col>, inflict <o-col definition='STATUS++terror'>+1T:TERROR</o-col>
<n-col>on DOWN</n-col>, grant <f-col definition='STATUS++focused'>+1T:FOCUSED</f-col> & <f-col definition='STATUS++evasion'>+1T:EVASION</f-col> to allies`;

    env.STATUS_EFFECTS.story_terriblelife.strings.terror = `%USER inspires larval terror!`;
    env.STATUS_EFFECTS.story_terriblelife.strings.terrorInflict = `%TARGET's fear grows...`;
    env.STATUS_EFFECTS.story_terriblelife.strings.cry = `%USER emits a strange cry!`;


    /* - husk_recognition - */

    env.STATUS_EFFECTS.husk_recognition.name = `Recognition`;
    env.STATUS_EFFECTS.husk_recognition.help = `capable of <n-col>direction</n-col> and <o-col definition='STATUS++story_targeted'>targeting</o-col>
grant <f-col definition='STATUS++evasion'>+1T:EVASION</f-col> to allies <n-col>hit multiple times in one turn</n-col><span class='minorstate'>
ineffective while stunned</span>
<n-col>+1 stun immunity</n-col>`;

    env.STATUS_EFFECTS.husk_recognition.strings.pattern = `%USER sees the pattern in [origin]'s attack...`;
    env.STATUS_EFFECTS.husk_recognition.strings.evade = `%TARGET is directed to evade!`;

    env.STATUS_EFFECTS.husk_recognition.events.GLOBAL_onCombatHit = function ({ subject, origin, attack, beneficial, originalEventTarget }) {
        if (
            originalEventTarget.state == "dead" ||
            beneficial ||
            originalEventTarget.team.name != this.status.affecting.team.name ||
            this.status.affecting.state == "dead" ||
            hasStatus(this.status.affecting, "stun") ||
            !origin
        ) return;

        let turnDataSlug = `recognition_${this.status.affecting.slug}`

        if (!env.rpg.turnData[turnDataSlug]) env.rpg.turnData[turnDataSlug] = {}
        if (!env.rpg.turnData[turnDataSlug][originalEventTarget.slug]) env.rpg.turnData[turnDataSlug][originalEventTarget.slug] = 0
        env.rpg.turnData[turnDataSlug][originalEventTarget.slug]++

        if (env.rpg.turnData[turnDataSlug][originalEventTarget.slug] >= 2) {

            addStatus({ target: originalEventTarget, origin: this.status.affecting, status: "evasion", length: 1, noReact: true, dontDrawIconLine: true })
            drawEffectLine(this.status, target, {
                color: "neutral",
                effectClass: "baseline icon",
                duration: 3000,
                style: `--icon: url(${this.status.icon})`
            })

            env.setTimeout(() => {
                env.rpg.effectMessage.action({
                    user: this.status.affecting,
                    target: originalEventTarget,
                    action: origin.cor_ru ? this.status.strings.pattern.replace("[origin]", origin.cor_ru.name.gen) : this.status.strings.pattern.replace("[origin]", origin.name),
                    specialHitText: this.status.strings.evade,
                    reason: this.status.name,
                    isMinor: true,
                    showFullDetail: true,
                    status: this.status
                })
            }, env.ADVANCE_RATE * 0.2)
        }
    }


    /* - husk_hunger - */

    env.STATUS_EFFECTS.husk_hunger.name = `Hunger`;
    env.STATUS_EFFECTS.husk_hunger.help = `Capable of <n-col>frenzy</n-col>
inflicts <o-col definition='STATUS++vulnerable'>+1T:VULNERABLE</o-col> on foes with <o-col definition='STATUS++puncture'>>3T:PUNCTURE</o-col>
<n-col>+2 stun immunity</n-col>`;

    env.STATUS_EFFECTS.husk_hunger.strings.wound = `%USER leaves an extra wound!`;
    env.STATUS_EFFECTS.husk_hunger.strings.vulnerable = `%TARGET's mounting wounds leave them vulnerable!`;


    /* - husk_return - */

    env.STATUS_EFFECTS.husk_return.name = `Closer`;
    env.STATUS_EFFECTS.husk_return.help = `<n-col definition='STATUS++windup'>winds up</n-col> to apply <f-col definition='STATUS++bp'>barrier</f-col> & <f-col definition='STATUS++repairs'>REPAIRS</f-col>
gains 2 uses of <n-col>RESTORE</n-col>`;


    /* - husk_vengeance - */

    env.STATUS_EFFECTS.husk_vengeance.name = `Vengeance`;
    env.STATUS_EFFECTS.husk_vengeance.help = `<o-col definition='STATUS++stun'>stunning</o-col> hits
capable of <f-col definition='STATUS++redirection'>guarding</f-col>
<n-col>on <span definition='STATUS++stun'>STUN</span> recovery</n-col>, gain <f-col definition='STATUS++carapace'>+2T:CARAPACE</f-col> <f-col definition='STATUS++counter'>+1T:COUNTER</f-col>
<n-col>+2 stun immunity</n-col>`;

    env.STATUS_EFFECTS.husk_vengeance.strings.retaliate = `%USER prepares to retaliate!`;


    /* - husk_kivii - */

    env.STATUS_EFFECTS.husk_kivii.name = `Come With Me`;
    env.STATUS_EFFECTS.husk_kivii.help = `spreads <o-col definition='STATUS++terror'>terror</o-col>
<n-col>on <span definition='STATUS++stun'>STUN</span> recovery</n-col>, gain <f-col definition='STATUS++carapace'>+2T:CARAPACE</f-col> <f-col definition='STATUS++counter'>+1T:COUNTER</f-col>
<n-col>+2 stun immunity</n-col>`;

    env.STATUS_EFFECTS.husk_kivii.strings.retaliate = `%USER prepares to retaliate!`;


    /* - kivii_arm - */

    env.STATUS_EFFECTS.kivii_arm.name = `Rampage`;
    env.STATUS_EFFECTS.kivii_arm.help = `utilizes <n-col definition='STATUS++windup'>windup</n-col> for deadly strikes
<n-col>on HIT</n-col>, Gain <n-col definition="STATUS++windup">+WINDUP</n-col>
<n-col>+1 stun immunity</n-col>
<span class="minorstate">behavior altered when destabilized</span>`;

    env.STATUS_EFFECTS.kivii_arm.strings.swing = `%USER swings around, about to strike again!!`;


    /* - story_kivskin - */

    env.STATUS_EFFECTS.story_kivskin.name = `Dense Frame`;
    env.STATUS_EFFECTS.story_kivskin.help = `capable of <f-col definition='STATUS++redirection'>guarding</f-col>
attacks grant <n-col definition="STATUS++windup">+windup</n-col> for deadly followups
<n-col>+1 STUN immunity</n-col>
<span class='minorstate'>behavior altered when destabilized</span>`;


    /* - story_translation - */

    env.STATUS_EFFECTS.story_translation.name = `Comprehension`;
    env.STATUS_EFFECTS.story_translation.help = `dense device projecting grasping thoughts
<n-col>on CRIT</n-col>, conjure a <o-col>»õGQàº3¾õ”cR%</o-col> (max:4)
<n-col>on turn</n-col>, <span definition='STATUS++focused'>+1T:FOCUSED</span> if alone
<n-col>+2 stun immunity</n-col>
<span class='minorstate'>+50% ACC if <n-col definition='STATUS++destabilized'>DESTABILIZED</n-col></span>`;


    /* - story_hallucination - */

    env.STATUS_EFFECTS.story_hallucination.name = `████ ████ ██`;
    env.STATUS_EFFECTS.story_hallucination.help = `it knows us...
<n-col>utilizes reflected items and statuses</n-col>
<n-col>on HIT</n-col>, inflict <o-col definition='STATUS++terror'>+1T:TERROR</o-col>`;


    /* - story_repairfriend - */

    env.STATUS_EFFECTS.story_repairfriend.name = `Surgical Frame`;
    env.STATUS_EFFECTS.story_repairfriend.help = `capable of <f-col definition="STATUS++repairs">repairs</f-col> and <o-col definition="STATUS++siphon">siphoning</o-col>
<n-col>singularly focused on maintenance of archival golem</n-col>
<span class='minorstate'>behavior altered when <n-col definition='STATUS++destabilized'>DESTABILIZED</n-col></span>`;


    /* - story_archival_repairing - */

    env.STATUS_EFFECTS.story_archival_repairing.name = `Under Repair`;
    env.STATUS_EFFECTS.story_archival_repairing.help = `inhibited by structural damage
<n-col>if HP >50%,</n-col> gain powerful action & <n-col>+3 STUN immunity</n-col>
<span class='minorstate'>-50% accuracy while <n-col definition='STATUS++destabilized'>DESTABILIZED</n-col></span>`;


    /* - story_constructor - */

    env.STATUS_EFFECTS.story_constructor.name = `Constructor Frame`;
    env.STATUS_EFFECTS.story_constructor.help = `Capable of shielding and repair
All actions on vats grant <n-col status='STATUS++story_construction'>+1T:CONSTRUCTION</n-col>
<span class='minorstate'>Doubled if <n-col definition='STATUS++destabilized'>DESTABILIZED</n-col></span>
<n-col>+2 STUN immunity</n-col>`;


    /* - story_construction - */

    env.STATUS_EFFECTS.story_construction.name = `Construction`;
    env.STATUS_EFFECTS.story_construction.help = `At 10T, burst to produce an offensive arm`;


    /* - story_constructorarm - */

    env.STATUS_EFFECTS.story_constructorarm.name = `Tenuous Connection`;
    env.STATUS_EFFECTS.story_constructorarm.help = `hastily deployed
conjoins with constructor and increases HP`;

    env.STATUS_EFFECTS.story_constructorarm.strings.constructor_arm_stabber = `
capable of <n-col>frenzied attack</n-col>`;
    env.STATUS_EFFECTS.story_constructorarm.strings.constructor_arm_repair = `
capable of <n-col>mending and siphoning</n-col>`;
    env.STATUS_EFFECTS.story_constructorarm.strings.constructor_arm_stun = `
capable of <n-col>stunning attack</n-col>`;
    env.STATUS_EFFECTS.story_constructorarm.strings.constructor_arm_spy = `
capable of <n-col>coordination</n-col>`;
    env.STATUS_EFFECTS.story_constructorarm.strings.constructor_arm_malform = `
capable of <n-col>unpredictable attack</n-col>`;
    env.STATUS_EFFECTS.story_constructorarm.strings.generalHelp = `
<n-col>no stun immunity</n-col>
<span class='minorstate'>link may fail while <n-col definition='STATUS++destabilized'>DESTABILIZED</n-col></span>`;
    env.STATUS_EFFECTS.story_constructorarm.strings.emergence = `%TARGET emerges from the construction vat!`;
    env.STATUS_EFFECTS.story_constructorarm.strings.newArm = `%USER gains a new offensive arm...`;
    env.STATUS_EFFECTS.story_constructorarm.strings.malfunction = `%USER malfunctioned!`;
    env.STATUS_EFFECTS.story_constructorarm.strings.floater = `MALFUNCTION!`;


    /* - story_constructorvat - */

    env.STATUS_EFFECTS.story_constructorvat.name = `Construction Vat`;
    env.STATUS_EFFECTS.story_constructorvat.help = `Forming offensive limb
<n-col>on turn</n-col>, gain <n-col definition='STATUS++story_construction'>+2T:CONSTRUCTION</n-col> if not <o-col definition='STATUS++stun'>STUNNED</o-col>
<n-col>at <n-col definition='STATUS++story_construction'>10T:CONSTRUCTION</n-col></n-col>, replace self with new foe
<span class='minorstate'>product altered if destabilized</span>
<n-col>ceases if <o-col>constructor</o-col> is DOWN</n-col>`;


    /* - story_foundation - */

    env.STATUS_EFFECTS.story_foundation.name = `Dull Chassis`;
    env.STATUS_EFFECTS.story_foundation.help = `<n-col definition="STATUS++windup">Winds up</n-col> to use powerful dull weaponry
<n-col>per 25% of HP lost</n-col>, conjures ally 
<n-col>+2 STUN immunity</n-col>
<span class='minorstate'>behavior altered while <n-col definition='STATUS++destabilized'>DESTABILIZED</n-col></span>`;


    /* - story_foundation_frame - */

    env.STATUS_EFFECTS.story_foundation_frame.name = `Dull Frame`;
    env.STATUS_EFFECTS.story_foundation_frame.help = `<n-col definition="STATUS++windup">Winds up</n-col> to use powerful dull weaponry
<n-col>+2 STUN immunity</n-col>
<span class='minorstate'>behavior altered while <n-col definition='STATUS++destabilized'>DESTABILIZED</n-col></span>`;


    /* - story_foundation_possessed - */

    env.STATUS_EFFECTS.story_foundation_possessed.name = `Possession`;
    env.STATUS_EFFECTS.story_foundation_possessed.help = `immune to damage unless <n-col definition='STATUS++story_distortion'>DISTORTED</n-col>
<n-col>Gains</n-col> <n-col definition='STATUS++story_distortion'>DISTORTION</n-col> through exposure to dull light
<n-col>total stun immunity</n-col>
<span class="minorstate"><n-col>if <f-col>IK Golem</f-col> is DOWN</n-col>, utilizes deadly action</span>`;

    env.STATUS_EFFECTS.story_foundation_possessed.strings.stunImmune = `Stun Immune`;
    env.STATUS_EFFECTS.story_foundation_possessed.strings.unaffected = `%TARGET is unaffected by the impact!`;


    /* - story_distortion - */

    env.STATUS_EFFECTS.story_distortion.name = `Distortion`;
    env.STATUS_EFFECTS.story_distortion.help = `physically grounded through dull feedback
vulnerable to damage briefly`;


    /* - husk_lessersupport - */

    env.STATUS_EFFECTS.husk_lessersupport.name = `Hunger`;
    env.STATUS_EFFECTS.husk_lessersupport.help = `Capable of healing and restoration`;


    /* - husk_lesserobserver - */

    env.STATUS_EFFECTS.husk_lesserobserver.name = `Hunger`;
    env.STATUS_EFFECTS.husk_lesserobserver.help = `Capable of advanced coordination`;


    /* - husk_lessershielder - */

    env.STATUS_EFFECTS.husk_lessershielder.name = `Hunger`;
    env.STATUS_EFFECTS.husk_lessershielder.help = `Capable of shielding`;


    /* - story_dullzika - */

    env.STATUS_EFFECTS.story_dullzika.name = `Glimmering Flesh`;
    env.STATUS_EFFECTS.story_dullzika.help = `imperceptible tendrils knit flesh together
<n-col>on turn end, when HP is low<span class='shiftdetail'> (<= 10HP)</span>,</n-col> gain <f-col definition='STATUS++regen'>+1T:REGEN</f-col>
<n-col>+1 stun immunity</n-col>`;


    /* - frame_boss - */

    env.STATUS_EFFECTS.frame_boss.name = `Revised`;
    env.STATUS_EFFECTS.frame_boss.help = `time 2 kill
<n-col>+2 stun immunity</n-col>`;


    /* - frame_movefoe - */

    env.STATUS_EFFECTS.frame_movefoe.name = `Entanglement`;
    env.STATUS_EFFECTS.frame_movefoe.help = `inflicts <o-col definition='STATUS++targeted'>TARGETED</o-col> when inflicting <o-col definition="STATUS++stun">STUN</o-col>
<n-col>+2 stun immunity</n-col>`;

    env.STATUS_EFFECTS.frame_movefoe.strings.exploit = `%USER exploits the opening!`;


    /* - frame_tendril - */

    env.STATUS_EFFECTS.frame_tendril.name = `Transient Limb`;
    env.STATUS_EFFECTS.frame_tendril.help = `clumsy but sharp
perish if origin is DOWNed`;


    /* - frame_archival - */

    env.STATUS_EFFECTS.frame_archival.name = `Inky Corru`;
    env.STATUS_EFFECTS.frame_archival.help = `extremely hardy
starts with <f-col definition='STATUS++carapace'>6T:CARAPACE</f-col>
<n-col class="minorstate">-50% accuracy while <n-col definition='STATUS++destabilized'>DESTABILIZED</n-col></n-col>`;


    /* - daemon_hallucination - */

    env.STATUS_EFFECTS.daemon_hallucination.name = `Inspiration`;
    env.STATUS_EFFECTS.daemon_hallucination.help = `utilizes reflected passives and statuses
includes both impulses and items`;


    /* - daemon_construction - */

    env.STATUS_EFFECTS.daemon_construction.name = `Construction`;
    env.STATUS_EFFECTS.daemon_construction.help = `At 10T, summon IDEA`;


    /* - daemon_constructor - */

    env.STATUS_EFFECTS.daemon_constructor.name = `daemon::clw`;
    env.STATUS_EFFECTS.daemon_constructor.help = `accumulate damage dealt as <n-col definition="STATUS++construction">xT:CONSTRUCTION</n-col>
summon IDEA at <n-col definition="STATUS++construction">10T:CONSTRUCTION</n-col>`;

    env.STATUS_EFFECTS.daemon_constructor.strings.construction = `%USER continues construction!`;
    env.STATUS_EFFECTS.daemon_constructor.strings.completion = `%TARGET is completed!`;


    /* - malware - */

    env.STATUS_EFFECTS.malware.name = `Malware`;
    env.STATUS_EFFECTS.malware.help = `sabotages function as intensity increases
removed only by DOWNing origin`;

    env.STATUS_EFFECTS.malware.strings.generalHeader = `sabotages function as intensity increases`;
    env.STATUS_EFFECTS.malware.strings.stage1 = `<f-col definition="STATUS++regen">REGEN</f-col> becomes <o-col definition="STATUS++rot">ROT</o-col>`;
    env.STATUS_EFFECTS.malware.strings.stage2 = `double effects of damaging statuses`;
    env.STATUS_EFFECTS.malware.strings.stage3 = `<n-col>being HIT</n-col> inflicts <o-col definition="STATUS++vulnerability">1T:VULNERABILITY</o-col>`;
    env.STATUS_EFFECTS.malware.strings.stage4 = `<n-col>being HIT</n-col> reduces positive statuses by 1T`;
    env.STATUS_EFFECTS.malware.strings.stage5 = `<n-col>being HIT</n-col> grants <o-col definition="STATUS++empowered">2T:EMPOWERED</o-col> to attacker`;
    env.STATUS_EFFECTS.malware.strings.stage6 = `<n-col>on turn</n-col>, gain <o-col definition="STATUS++rot">[[X]]T:ROT</o-col>`;
    env.STATUS_EFFECTS.malware.strings.generalFooter = `removed by DOWNing [[ORIGIN]]`;
    env.STATUS_EFFECTS.malware.strings.removal = `the malware dissipates...`;
    env.STATUS_EFFECTS.malware.strings.removalSpecific = `%TARGET feels way better!`;


    /* - enacting - */

    env.STATUS_EFFECTS.enacting.name = `Enacting`;
    env.STATUS_EFFECTS.enacting.help = `no further changes may be made to the plan
cannot gain further <f-col definition='STATUS++evasion'>evasion</f-col>.`;


    /* - aug_claws_ied - */

    env.STATUS_EFFECTS.aug_claws_ied.name = `Bazruka`;
    env.STATUS_EFFECTS.aug_claws_ied.help = `IED blast may CRIT and chain-explode up to twice per use`;


    /* - aug_claws_frenzy - */

    env.STATUS_EFFECTS.aug_claws_frenzy.name = `Insatiable`;
    env.STATUS_EFFECTS.aug_claws_frenzy.help = `ACC/CRIT loss per FRENZY repeat is reduced to -7.5%
FRENZY continues on random new target if initial target is DOWN`;


    /* - aug_claws_surge - */

    env.STATUS_EFFECTS.aug_claws_surge.name = `Wild Surge`;
    env.STATUS_EFFECTS.aug_claws_surge.help = `gain <f-col definition='STATUS++wild_surge'>WILD SURGE</f-col> instead of <f-col definition='STATUS++surge'>SURGE</f-col> from all sources`;

    env.STATUS_EFFECTS.aug_claws_surge.strings.ambition = `%USER's ambition grows ever greater...`;


    /* - aug_ichor_skivi - */

    env.STATUS_EFFECTS.aug_ichor_skivi.name = `Parasite`;
    env.STATUS_EFFECTS.aug_ichor_skivi.help = `<n-col>HITTING foes</n-col> with <o-col definition='STATUS++siphon'>SIPHON</o-col> or <o-col definition='STATUS++rot'>ROT</o-col> copies their negative statuses to other random foe with half duration`;

    env.STATUS_EFFECTS.aug_ichor_skivi.strings.spread = `%USER spreads [subject]'s afflictions!`;
    env.STATUS_EFFECTS.aug_ichor_skivi.strings.infection = `%TARGET is infected!`;


    /* - aug_ichor_tap - */

    env.STATUS_EFFECTS.aug_ichor_tap.name = `Undying`;
    env.STATUS_EFFECTS.aug_ichor_tap.help = `VITAL TAP revives DOWNED allies
<n-col>HITTING foes</n-col> with <o-col definition='STATUS++siphon'>SIPHON</o-col> or <o-col definition='STATUS++rot'>ROT</o-col> steals 5% of their HP<n-col class="shiftdetail">(MIN:1)</n-col>`;

    env.STATUS_EFFECTS.aug_ichor_tap.strings.vitality = `%USER extracts further vitality!`;
    env.STATUS_EFFECTS.aug_ichor_tap.strings.steal = `%USER steals [amt]HP from %TARGET!`;


    /* - aug_ichor_sacrifice - */

    env.STATUS_EFFECTS.aug_ichor_sacrifice.name = `Overextend`;
    env.STATUS_EFFECTS.aug_ichor_sacrifice.help = `<n-col>on ally DOWN</n-col>, take 25% of their max HP as damage and revive them with that amount<n-col class="shiftdetail minorstate">
if DOWNed by this effect, will not trigger until next turn</n-col>`;

    env.STATUS_EFFECTS.aug_ichor_sacrifice.strings.overextend = `%USER overextends to revive %TARGET!`;


    /* - aug_eyes_advantage - */

    env.STATUS_EFFECTS.aug_eyes_advantage.name = `Follow-up`;
    env.STATUS_EFFECTS.aug_eyes_advantage.help = `<n-col>Critting a target</n-col> with <o-col definition="STATUS++vulnerable">VULNERABLE</o-col>
grants <f-col definition="STATUS++momentum">+2T:MOMENTUM</f-col>`;

    env.STATUS_EFFECTS.aug_eyes_advantage.strings.inspiration = `%USER's powerful strike inspires their next!`;
    env.STATUS_EFFECTS.aug_eyes_advantage.strings.momentum = `%USER gains momentum from %TARGET!`;


    /* - aug_eyes_direction - */

    env.STATUS_EFFECTS.aug_eyes_direction.name = `Deathmark`;
    env.STATUS_EFFECTS.aug_eyes_direction.help = `coordination becomes direction
<n-col>once per turn</n-col>, repeat any action used on foe with <o-col definition='STATUS++critical_flaw'>CRITICAL FLAW</o-col>`;


    /* - aug_eyes_enact - */

    env.STATUS_EFFECTS.aug_eyes_enact.name = `Siege`;
    env.STATUS_EFFECTS.aug_eyes_enact.help = `ENACT prioritizes targets with <o-col definition="STATUS++critical_flaw">CRITICAL FLAW</o-col>`;


    /* - aug_bone_swing - */

    env.STATUS_EFFECTS.aug_bone_swing.name = `Momentous`;
    env.STATUS_EFFECTS.aug_bone_swing.help = `HEAVY SWING repeats on target once per <f-col definition="STATUS++carapace">2T:CARAPACE</f-col> held when used manually`;


    /* - aug_bone_guard - */

    env.STATUS_EFFECTS.aug_bone_guard.name = `Cover`;
    env.STATUS_EFFECTS.aug_bone_guard.help = `GUARD is reused on all other allies and grants <f-col definition="STATUS++bp">+5 barrier</f-col>`;


    /* - aug_bone_shell - */

    env.STATUS_EFFECTS.aug_bone_shell.name = `Martyr`;
    env.STATUS_EFFECTS.aug_bone_shell.help = `SHELTER grants <n-col definition="STATUS++spikes">+1T:SPIKES</n-col> and <o-col definition="STATUS++targeted">+1T:TARGETED</o-col>
When hit with <n-col definition="STATUS++spikes">SPIKES</n-col>, use SHELTER`;


    /* - aug_light_claw - */

    env.STATUS_EFFECTS.aug_light_claw.name = `Revision`;
    env.STATUS_EFFECTS.aug_light_claw.help = `MAD CLAW gains a 10% chance to summon +1 IDEA (max: 3) with copied statuses from self`;


    /* - aug_light_destabilize - */

    env.STATUS_EFFECTS.aug_light_destabilize.name = `Natural Extreme`;
    env.STATUS_EFFECTS.aug_light_destabilize.help = `Granting <n-col definition="STATUS++destabilized">DESTABILIZED</n-col> doubles duration of all statuses on target`;

    env.STATUS_EFFECTS.aug_light_destabilize.strings.alteration = `%USER alters the thoughtspace!`;
    env.STATUS_EFFECTS.aug_light_destabilize.strings.stranger = `%TARGET grows stranger...`;


    /* - aug_light_storm - */

    env.STATUS_EFFECTS.aug_light_storm.name = `Invoke Madness`;
    env.STATUS_EFFECTS.aug_light_storm.help = `Inflicting <o-col definition='STATUS++terror'>TERROR</o-col> also inflicts <o-col definition='STATUS++madness'>MADNESS</o-col>`;

    env.STATUS_EFFECTS.aug_light_storm.strings.madness = `%USER spreads an unnatural madness!`;
    env.STATUS_EFFECTS.aug_light_storm.strings.composure = `%TARGET loses composure!`;


    /* - opportunity - */

    env.STATUS_EFFECTS.opportunity.name = `Opportunity`;
    env.STATUS_EFFECTS.opportunity.help = `strikes foes who move nearby
activates regardless of current actor, once per turn
<span class='minorstate'>removed by <o-col definition='STATUS++stun'>STUN</o-col></span>`;


    /* - specter_puncher - */

    env.STATUS_EFFECTS.specter_puncher.name = `Reminiscent`;
    env.STATUS_EFFECTS.specter_puncher.help = `a dense figure
utilizes heavy <n-col definition='STATUS++kb'>knockback</n-col>
<n-col>+1 stun immunity</n-col>`;


    /* - specter_bomber - */

    env.STATUS_EFFECTS.specter_bomber.name = `Riftmaker`;
    env.STATUS_EFFECTS.specter_bomber.help = `creates explosive rifts
explosions only damage opponents
<n-col definition='STATUS++destabilized'>DESTABILIZED</n-col> rifts damage all within`;


    /* - specter_sniper - */

    env.STATUS_EFFECTS.specter_sniper.name = `Infinite Reach`;
    env.STATUS_EFFECTS.specter_sniper.help = `utilizes <n-col definition='STATUS++aiming'>aim</n-col> for infinite range attack
<span class='minorstate'>stationary</span>`;


    /* - specter_support - */

    env.STATUS_EFFECTS.specter_support.name = `Once-Skin`;
    env.STATUS_EFFECTS.specter_support.help = `teleports
applies <f-col definition='STATUS++bp'>barrier</f-col> & <f-col definition='STATUS++repairs'>REPAIRS</f-col> to allies`;


    /* - specter_archival - */

    env.STATUS_EFFECTS.specter_archival.name = `Archival Apparition`;
    env.STATUS_EFFECTS.specter_archival.help = `only pursues <o-col definition='STATUS++story_targeted'>targets</o-col>
uses weaker strikes to gain <n-col definition='STATUS++windup'>windup</n-col>
highly resistant <n-col class='shiftdetail'>(-1 incoming damage, -2 KB, total stun immunity)</n-col> unless <o-col definition='STATUS++vulnerable'>VULNERABLE</o-col>
<span class="minorstate">recklessly aggressive <n-col class='shiftdetail'>(+2 MOVEMENT & -50% accuracy)</n-col> while <n-col definition='STATUS++destabilized'>DESTABILIZED</n-col></span>`;

    env.STATUS_EFFECTS.specter_archival.strings.stagger = `%USER staggers!`;
    env.STATUS_EFFECTS.specter_archival.strings.stunResist = `%USER resists the stun...`;
    env.STATUS_EFFECTS.specter_archival.strings.flaw = `a flaw is revealed!`;
    env.STATUS_EFFECTS.specter_archival.strings.stunVuln = `%USER is vulnerable to stun!`;
    env.STATUS_EFFECTS.specter_archival.strings.resisted = `%USER is hardly scratched`;


    /* - heart_parasite_old - */

    env.STATUS_EFFECTS.heart_parasite_old.name = `Writhing Mass`;
    env.STATUS_EFFECTS.heart_parasite_old.help = `Receives no hits until membranes are destroyed`;

    env.STATUS_EFFECTS.heart_parasite_old.strings.blocked = `The membranes protect %USER from attack!`;


    /* - puncture_weakness - */

    env.STATUS_EFFECTS.puncture_weakness.name = `Delicate Vessel`;
    env.STATUS_EFFECTS.puncture_weakness.help = `carries a flow of vital resource
critically vulnerable to certain statuses:
- <o-col definition='STATUS++puncture'>PUNCTURE</o-col> effectiveness doubled
- <o-col definition='STATUS++siphon'>SIPHON</o-col> causes additional <o-col>-5%HP</o-col> on hit
- <o-col definition='STATUS++bomb'>BOMB</o-col> minimum damage raised to <o-col>-10HP</o-col>`;

    env.STATUS_EFFECTS.puncture_weakness.strings.exploitSiphon = `The siphon spills forth a deluge of spireblood!`;
    env.STATUS_EFFECTS.puncture_weakness.strings.extraDmg = `%TARGET takes [amt] extra damage!`;


    /* - heart_parasite - */

    env.STATUS_EFFECTS.heart_parasite.name = `Ravenous Parasite`;
    env.STATUS_EFFECTS.heart_parasite.help = `utilizes stage <n-col definition='STATUS++kb'>knockback</n-col>
gains <f-col>5HP</f-col> when any opponent with <o-col definition='STATUS++siphon'>SIPHON</o-col> is struck
inflicts <o-col>-3HP</o-col> & <o-col definition='STATUS++siphon'>+2T:SIPHON</o-col> via <n-col>infested tiles</n-col>
<n-col>+3 stun immunity</n-col>
<span class='minorstate'>stationary</span>`;

    env.STATUS_EFFECTS.heart_parasite.strings.end = `the beast crumbles entirely!`;
    env.STATUS_EFFECTS.heart_parasite.strings.stolen = `%USER is restored by the siphoning!`;


    /* - heart_siphon - */

    env.STATUS_EFFECTS.heart_siphon.name = `Siphoning Tendril`;
    env.STATUS_EFFECTS.heart_siphon.help = `rooted in the great heart
<n-col>on turn</n-col>, grants <f-col>+15HP</f-col> to <o-col>parasite</o-col> 
if all siphons stand grant additional <f-col>15HP</f-col> & +1T:<f-col definition='STATUS++regen'>REGEN</f-col>
<span class='minorstate'>stationary</span>`;


    /* - heart_siphon_attacker - */

    env.STATUS_EFFECTS.heart_siphon_attacker.name = `Aggressive Siphon`;
    env.STATUS_EFFECTS.heart_siphon_attacker.help = `creates hazardous zone & pulls targets closer
inflicts <o-col definition="STATUS++siphon">+1T:SIPHON</o-col> on hit`;

    env.STATUS_EFFECTS.heart_siphon_attacker.strings.stolen = `%USER draws corru into the overlap...`;
    env.STATUS_EFFECTS.heart_siphon_attacker.strings.health = `[amt]HP is shared with the parasite!`;
    env.STATUS_EFFECTS.heart_siphon_attacker.strings.regen = `REGEN is shared with the parasite!`;
    env.STATUS_EFFECTS.heart_siphon_attacker.strings.siphon = `an insidious siphon attaches to %TARGET!`;


    /* - heart_wall - */

    env.STATUS_EFFECTS.heart_wall.name = `Obstacle`;
    env.STATUS_EFFECTS.heart_wall.help = `Guaranteed hit`;


    /* - aiming_itzil - */

    env.STATUS_EFFECTS.aiming_itzil.name = `Aiming`;
    env.STATUS_EFFECTS.aiming_itzil.help = `firing deadly beam at target on next turn
break line of sight to avoid`;


    /* - aiming - */

    env.STATUS_EFFECTS.aiming.name = `Aiming`;
    env.STATUS_EFFECTS.aiming.help = `acting towards target on next turn
break line of sight to avoid
interrupted by stun`;


    /* - aiming_directional - */

    env.STATUS_EFFECTS.aiming_directional.name = `Aiming`;
    env.STATUS_EFFECTS.aiming_directional.help = `acting in direction on next turn
avoid path to prevent damage
interrupted by stun`;


    /* - gauntlet_aimer - */

    env.STATUS_EFFECTS.gauntlet_aimer.name = `aimer`;
    env.STATUS_EFFECTS.gauntlet_aimer.help = `not visible`;


    /* - eyebeam_aimer - */

    env.STATUS_EFFECTS.eyebeam_aimer.name = `aimer`;
    env.STATUS_EFFECTS.eyebeam_aimer.help = `not visible`;


    /* - finale_vein - */

    env.STATUS_EFFECTS.finale_vein.name = `Immaterial Vein`;
    env.STATUS_EFFECTS.finale_vein.help = `extremely hardy
-1 incoming damage
<n-col>negated if <n-col definition='STATUS++destabilized'>DESTABILIZED</n-col></n-col>`;

    env.STATUS_EFFECTS.finale_vein.strings.stagger = `%USER staggers!`;
    env.STATUS_EFFECTS.finale_vein.strings.stunResist = `%USER resists the stun...`;
    env.STATUS_EFFECTS.finale_vein.strings.flaw = `a flaw in %USER's chassis is revealed!`;
    env.STATUS_EFFECTS.finale_vein.strings.stunVuln = `%USER is vulnerable to stun!`;
    env.STATUS_EFFECTS.finale_vein.strings.resisted = `%USER is hardly scratched`;


    /* - story_vekoa - */

    env.STATUS_EFFECTS.story_vekoa.name = `Remorse`;
    env.STATUS_EFFECTS.story_vekoa.help = `highly aggressive actions
immune to statuses and damage unless <o-col definition='STATUS++destabilized'>destabilized</o-col>
immune to <o-col definition='STATUS++stun'>stun</o-col> unless <o-col definition='STATUS++puncture'>punctured</o-col>
<o-col definition='STATUS++puncture'>puncture</o-col> is 3x more effective`;

    env.STATUS_EFFECTS.story_vekoa.strings.shimmer = `%USER shimmers and quickly reforms!`;
    env.STATUS_EFFECTS.story_vekoa.strings.noEffect = `%USER resists all effects...`;
    env.STATUS_EFFECTS.story_vekoa.strings.flaw = `%USER's flesh is made physical!`;
    env.STATUS_EFFECTS.story_vekoa.strings.vuln = `<f-col>%USER is vulnerable to damage!</f-col>`;


    /* - specter_kiv - */

    env.STATUS_EFFECTS.specter_kiv.name = `Guardian`;
    env.STATUS_EFFECTS.specter_kiv.help = `guarding ceremony to the end
utilizes <o-col definition='STATUS++stun'>stun</o-col> & <n-col definition='STATUS++kb'>knockback</n-col>
infinite <f-col definition='STATUS++redirection'>redirection</f-col> in small area
<n-col>+4 stun immunity</n-col>
<span class='minorstate'>stationary</span>`;


    /* - specter_vel - */

    env.STATUS_EFFECTS.specter_vel.name = `Hunter`;
    env.STATUS_EFFECTS.specter_vel.help = `relentlessly pursues <o-col definition='STATUS++story_targeted'>targets</o-col>
utilizes <o-col definition='STATUS++puncture'>puncturing</o-col> frenzy
<n-col>+2 stun immunity</n-col>`;


    /* - specter_jut - */

    env.STATUS_EFFECTS.specter_jut.name = `Technician`;
    env.STATUS_EFFECTS.specter_jut.help = `repairs, creates explosive rifts
<n-col>on turn</n-col>, <f-col>+2HP</f-col> <f-col definition='STATUS++bp'>+2BP</f-col> to allies
<span class='minorstate'>negated by <o-col definition='STATUS++stun'>STUN</o-col></span>`;

    env.STATUS_EFFECTS.specter_jut.strings.castLight = `%USER's light casts strange colors`;
    env.STATUS_EFFECTS.specter_jut.strings.regen = `%TARGET's flesh continuously repairs itself...`;


    /* - story_forming - */

    env.STATUS_EFFECTS.story_forming.name = `Formless`;
    env.STATUS_EFFECTS.story_forming.help = `takes no action
transforms on next archivist turn
interrupt line of sight to archivist or kill to nullify`;


    /* - scene_edge - */

    env.STATUS_EFFECTS.scene_edge.name = `Distortion`;
    env.STATUS_EFFECTS.scene_edge.help = `-3HP +2T:DESTABILIZED, thrown to random tile`;


    /* - scene_heart_consumption - */

    env.STATUS_EFFECTS.scene_heart_consumption.name = `Parasite`;
    env.STATUS_EFFECTS.scene_heart_consumption.help = `+1T:SIPHON, unresistable -3HP attack from parasite`;


    /* - ctrl - */

    env.STATUS_EFFECTS.ctrl.name = `CTRL`;
    env.STATUS_EFFECTS.ctrl.help = () => {
        let ctrl = env.STATUS_EFFECTS.ctrl
        let list = ctrl.strings.base
        if (check("lever-Δ")) list += ctrl.strings.delta
        if (check("lever-Λ")) list += ctrl.strings.lambda
        if (check("PAGE!!lever-Ξ")) list += ctrl.strings.xi
        return list
    };

    env.STATUS_EFFECTS.ctrl.strings.base = `A LEVER HAS BEEN PULLED`;
    env.STATUS_EFFECTS.ctrl.strings.delta = `
<bst-col>Δ</bst-col>: <n-col>on combat start</n-col>, grant random impulse`;
    env.STATUS_EFFECTS.ctrl.strings.lambda = `
<bst-col>Λ</bst-col>: enemy max HP is doubled`;
    env.STATUS_EFFECTS.ctrl.strings.xi = `
<bst-col>Ξ</bst-col>: inventory possesses many of every item <n-col>(permanent)</n-col>`;
    env.STATUS_EFFECTS.ctrl.strings.ctrlNotice = `<span class='minorstate'>
<bst-col>CTRL::</bst-col>granted by player alteration</span>`;


    /* - stagefighter - */

    env.STATUS_EFFECTS.stagefighter.name = `Stagefighter`;
    env.STATUS_EFFECTS.stagefighter.help = `status to handle movement/actions`;
}

// === ITEMS === //
cor_ru.combat[`redefineItems`] = function () {
    /* - eq_restorative - */

    env.ITEM_LIST.eq_restorative.name = `Restorative Satchel`;
    env.ITEM_LIST.eq_restorative.description = `'collection of quick-acting repair cysts';'common assistant golem issue'`;


    /* - eq_aima_cyst - */

    env.ITEM_LIST.eq_aima_cyst.name = `Aima Cyst`;
    env.ITEM_LIST.eq_aima_cyst.description = `'receptor-tied targeting cyst';'traditional hunting implement';'useful for multitasking'`;


    /* - eq_kavruka - */

    env.ITEM_LIST.eq_kavruka.name = `Kavruka Satchel`;
    env.ITEM_LIST.eq_kavruka.description = `'deconstruction tool';'named after non-corrucystic surface fauna';'notoriously explosive'`;


    /* - eq_pariispike - */

    env.ITEM_LIST.eq_pariispike.name = `False-Parii Spike`;
    env.ITEM_LIST.eq_pariispike.description = `'recreation of common surface tool';'short and frightfully sharp blade intended for killing blows'`;


    /* - eq_fusedlight - */

    env.ITEM_LIST.eq_fusedlight.name = `Fused Light`;
    env.ITEM_LIST.eq_fusedlight.description = `'the strange core of a warped veilklight';'occasionally pulses a distant echo of the signal'`;


    /* - eq_disabler - */

    env.ITEM_LIST.eq_disabler.name = `Disabler`;
    env.ITEM_LIST.eq_disabler.description = `'emergency security device';'injects self-destructive thoughtform';'for industrial use only';'quite rare'`;


    /* - eq_satik - */

    env.ITEM_LIST.eq_satik.name = `Satik Cysts`;
    env.ITEM_LIST.eq_satik.description = `'contains rapid temporary ablative barrier applicators';'named after hardy veilk parasite';'break in case of emergency'`;


    /* - eq_shell - */

    env.ITEM_LIST.eq_shell.name = `Kelniki Cyst`;
    env.ITEM_LIST.eq_shell.description = `'cognitive enhancement used in evading predators via immediate simulation';'also well suited for finding long-term issues in construction plans';'named after passive and extremely evasive surface fauna'`;


    /* - eq_antistatus - */

    env.ITEM_LIST.eq_antistatus.name = `Izpel Deapplicators`;
    env.ITEM_LIST.eq_antistatus.description = `'device used in construct testing to revert temporary alterations'`;


    /* - eq_surge - */

    env.ITEM_LIST.eq_surge.name = `Ukuzu Simulacrum`;
    env.ITEM_LIST.eq_surge.description = `'upon connection, detects and artificially agitates most cognitive organs';'named after seasonal spore-fog known to increase waking energy'`;


    /* - eq_hope - */

    env.ITEM_LIST.eq_hope.name = `Kind Memory`;
    env.ITEM_LIST.eq_hope.description = `'todo'`;


    /* - eq_translator - */

    env.ITEM_LIST.eq_translator.name = `Translation Core`;
    env.ITEM_LIST.eq_translator.description = `'a dangerously incoherent knowledge corrucyst';'contains some sort of interpretation of the signal';'just holding it makes me feel larvally ill'`;


    /* - eq_rot - */

    env.ITEM_LIST.eq_rot.name = `Red Veins`;
    env.ITEM_LIST.eq_rot.description = `'some things ought stay sealed away'`;


    /* - eq_spikes - */

    env.ITEM_LIST.eq_spikes.name = `Twisting Shell`;
    env.ITEM_LIST.eq_spikes.description = `'i must wonder how it fought'`;


    /* - eq_wound - */

    env.ITEM_LIST.eq_wound.name = `Shell Cracker`;
    env.ITEM_LIST.eq_wound.description = `'corrucystic tool based on veilk parasite';'projects spike with incredible force';'often also a culinary implement'`;


    /* - eq_siphon - */

    env.ITEM_LIST.eq_siphon.name = `Vecrivi`;
    env.ITEM_LIST.eq_siphon.description = `'corrucystic implement';'utilized to transfer visceral corru between reservoir and new construct'`;


    /* - eq_rifle - */

    env.ITEM_LIST.eq_rifle.name = `Symbiotic Rifle`;
    env.ITEM_LIST.eq_rifle.description = `'adapted bright weaponry';'forms projectiles from vital corru'`;


    /* - restorative - */

    env.ITEM_LIST.restorative.name = `Restorative Cyst`;
    env.ITEM_LIST.restorative.description = `'quick-acting repair cyst';'best used away from danger'`;
    env.ITEM_LIST.restorative.oocnote = `'restores target to full health'`;


    /* - satik_cyst - */

    env.ITEM_LIST.satik_cyst.name = `Satik Cyst`;
    env.ITEM_LIST.satik_cyst.description = `'contains rapid temporary ablative barrier applicators';'named after hardy veilk parasite';'break in case of emergency'`;


    /* - aima_cyst - */

    env.ITEM_LIST.aima_cyst.name = `Aima Cyst`;
    env.ITEM_LIST.aima_cyst.description = `'receptor-tied targeting cyst';'traditional hunting implement';'useful for multitasking'`;


    /* - kavruka - */

    env.ITEM_LIST.kavruka.name = `Kavruka`;
    env.ITEM_LIST.kavruka.description = `'deconstruction tool';'named after non-corrucystic surface fauna';'notoriously explosive'`;


    /* - disabler - */

    env.ITEM_LIST.disabler.name = `Disabler`;
    env.ITEM_LIST.disabler.description = `'emergency security device';'injects self-destructive thoughtform';'for industrial use only';'quite rare'`;


    /* - drill - */

    env.ITEM_LIST.drill.name = `CMD::DRILL`;
    env.ITEM_LIST.drill.description = `'single-use thoughtspace modification';'enforces harsher ruleset'`;


    /* - rot - */

    env.ITEM_LIST.rot.name = `CMD::ROT`;
    env.ITEM_LIST.rot.description = `'single-use thoughtspace modification';'enforces harsher ruleset'`;


    /* - rewrite - */

    env.ITEM_LIST.rewrite.name = `CMD::REWRITE`;
    env.ITEM_LIST.rewrite.description = `'single-use thoughtspace processor';'alter combat for more favorable outcome'`;


    /* - empower - */

    env.ITEM_LIST.empower.name = `CMD::EMPOWER`;
    env.ITEM_LIST.empower.description = `'single-use thoughtspace processor';'alter combat for more favorable outcome'`;


    /* - sfer_cube - */

    env.ITEM_LIST.sfer_cube.name = `Sfer Cube`;
    env.ITEM_LIST.sfer_cube.description = `'condensed corrucystic fuel';'valid currency';'the foundation of all things'`;


    /* - cool_orb_thingy - */

    env.ITEM_LIST.cool_orb_thingy.name = `Cool Orb Thingy`;
    env.ITEM_LIST.cool_orb_thingy.description = `'labelled "ON THE USE OF BRIGHT WEAPONRY"';'receptor-locked'`;


    /* - scary_black_box - */

    env.ITEM_LIST.scary_black_box.name = `Scary Black Box`;
    env.ITEM_LIST.scary_black_box.description = `'cousinly container made from tough dead material'`;


    /* - sorry_cyst - */

    env.ITEM_LIST.sorry_cyst.name = `Sorry Cyst`;
    env.ITEM_LIST.sorry_cyst.description = `'a damaged golem weapon schematic';'the inscription reads, "<span class='code' definition="INHERITED CONTEXT::'meet me in the uncosm'">sorry</span>"'`;


    /* - golem_sfer - */

    env.ITEM_LIST.golem_sfer.name = `Golem Sfer`;
    env.ITEM_LIST.golem_sfer.description = `'dense segmented sfer used in golem body creation';'knowledge of location';'feasibly used to create a new body for itzil and karik'`;


    /* - golem_parts - */

    env.ITEM_LIST.golem_parts.name = `Golem Parts`;
    env.ITEM_LIST.golem_parts.description = `'large number of golem components';'knowledge of location';'feasibly used to create a new body for itzil and karik'`;


    /* - core_translation - */

    env.ITEM_LIST.core_translation.name = `Signal Export`;
    env.ITEM_LIST.core_translation.description = `'a dangerously incoherent knowledge corrucyst';'contains some sort of interpretation of the signal';'gakvu can weaponize this'`;
    env.ITEM_LIST.core_translation.oocnote = () => check("PAGE!!embassy_day", 3.99) ? `'empowers DESTABILIZE action for party member';'gakvu'` : `'enables creation of SIGNAL INVERTER augment for party member';'gakvu'`;


    /* - error - */

    env.ITEM_LIST.error.name = `Weird Black Box`;
    env.ITEM_LIST.error.description = `'cannot open';'why are we still carrying it';'quite heavy...'`;


    /* - fish_order - */

    env.ITEM_LIST.fish_order.name = `Stray IDEA`;
    env.ITEM_LIST.fish_order.description = `'stray daemon instructor';'may be activated and thrown to alter structure'`;
    env.ITEM_LIST.fish_order.oocnote = `'unifies all map nodes into using a single random modifier'`;


    /* - fish_lone - */

    env.ITEM_LIST.fish_lone.name = `Lone Daemon`;
    env.ITEM_LIST.fish_lone.description = `'minor daemon rendered incoherent by unusual structure'`;
    env.ITEM_LIST.fish_lone.oocnote = `'<strong>PERMANENT</strong>';'select shell';'all other shells are removed';'immediately grant +30 max HP and <span definition='STATUS++fish_solo'>LONE DAEMON</span> passive'`;


    /* - fish_wheel - */

    env.ITEM_LIST.fish_wheel.name = `???`;
    env.ITEM_LIST.fish_wheel.description = `'intrusive species'`;
    env.ITEM_LIST.fish_wheel.oocnote = `'<strong>PERMANENT</strong>';'select shell';'imbue with gambling addiction'`;


    /* - fish_ruka - */

    env.ITEM_LIST.fish_ruka.name = `Decorated Burstlet`;
    env.ITEM_LIST.fish_ruka.description = `'volatile parasitic fish';'intrusive species'`;
    env.ITEM_LIST.fish_ruka.oocnote = `'<strong>PERMANENT</strong>';'select shell';'grants detonate action'`;


    /* - fish_mimic - */

    env.ITEM_LIST.fish_mimic.name = `FiiF`;
    env.ITEM_LIST.fish_mimic.description = `'fish native to these waters';'sretaw eseht ot evitan hsif'`;
    env.ITEM_LIST.fish_mimic.oocnote = `'<strong>PERMANENT</strong>';'select shell';'removes ability to be modified';'replaces actions with mimic'`;


    /* - fish_sniper - */

    env.ITEM_LIST.fish_sniper.name = `Sniper Fish`;
    env.ITEM_LIST.fish_sniper.description = `'fish native to these waters';'doubles as powerful sniper rifle'`;
    env.ITEM_LIST.fish_sniper.oocnote = `'<strong>PERMANENT</strong>';'select shell';'removes ability to be modified';'replaces actions with powerful firearm'`;


    /* - fish_normal - */

    env.ITEM_LIST.fish_normal.name = `Normal Fish`;
    env.ITEM_LIST.fish_normal.description = `'fishey'`;
    env.ITEM_LIST.fish_normal.oocnote = `'select shell';'removes any special classes';'re-enables modification'`;


    /* - fish_angler - */

    env.ITEM_LIST.fish_angler.name = `Deceiving Bulb`;
    env.ITEM_LIST.fish_angler.description = `'violent surface river fauna';'imitates mature celki glow'`;
    env.ITEM_LIST.fish_angler.oocnote = `'select shell';'enemies will prioritize over other targets'`;


    /* - fish_glee - */

    env.ITEM_LIST.fish_glee.name = `Fairy Eye`;
    env.ITEM_LIST.fish_glee.description = `'veilktop parasite';'shells rarely found in riverbeds';'purported sign of imminent chaos'`;
    env.ITEM_LIST.fish_glee.oocnote = `'immediately grants 20 sfer and revision';'WELCOME STORM';'all nodes gain additional modifier';'increase strength and reroll if already held'`;


    /* - fish_boot - */

    env.ITEM_LIST.fish_boot.name = `BSTRDBOOT`;
    env.ITEM_LIST.fish_boot.description = `'SORRY NOTHING'`;


    /* - fish_oar - */

    env.ITEM_LIST.fish_oar.name = `oarfish`;
    env.ITEM_LIST.fish_oar.description = `'fish native to these waters';'effective bludgeoning tool'`;


    /* - fish_sun - */

    env.ITEM_LIST.fish_sun.name = `sunfish`;
    env.ITEM_LIST.fish_sun.description = `'fish native to these waters';'☀️'`;


    /* - fish_fly - */

    env.ITEM_LIST.fish_fly.name = `flyfish`;
    env.ITEM_LIST.fish_fly.description = `'fish native to just above these waters'`;


    /* - fish_salm - */

    env.ITEM_LIST.fish_salm.name = `salm`;
    env.ITEM_LIST.fish_salm.description = `'flesh native to this water'`;


    /* - fish_sush - */

    env.ITEM_LIST.fish_sush.name = `fushi`;
    env.ITEM_LIST.fish_sush.description = `'fish native to teeth to eat to teeth fishing in the wa ters'`;


    /* - fish_naut - */

    env.ITEM_LIST.fish_naut.name = `nautifish`;
    env.ITEM_LIST.fish_naut.description = `'fish native to nothing';'nothing';'hard shelled shellicacy'`;


    /* - symbiotic_rifle - */

    env.ITEM_LIST.symbiotic_rifle.name = `Symbiotic Rifle`;
    env.ITEM_LIST.symbiotic_rifle.description = `'adapted bright weaponry created via lesser vats and strange cyst';'connects to internal ammunition generator';'use at cost of HP'`;
}

// === STATS === //
cor_ru.combat[`redefineStats`] = function () {
    /* - maxhp - */

    env.STATDATA.maxhp.display = `HP`;
    env.STATDATA.maxhp.description = `'damage taken before defeat'`;


    /* - outgoingMult - */

    env.STATDATA.outgoingMult.display = `OUT::x(HP)`;
    env.STATDATA.outgoingMult.description = `'multiplies all HP changes inflicted upon others'`;


    /* - outgoingFlat - */

    env.STATDATA.outgoingFlat.display = `OUT::HP`;
    env.STATDATA.outgoingFlat.description = `'flat modifier to HP changes on others';'before modifiers'`;


    /* - outgoingToHit - */

    env.STATDATA.outgoingToHit.display = `OUT::x(HIT)`;
    env.STATDATA.outgoingToHit.description = `'multiplies chance to hit others'`;


    /* - outgoingCrit - */

    env.STATDATA.outgoingCrit.display = `OUT::x(CRIT)`;
    env.STATDATA.outgoingCrit.description = `'multiplies chance to crit others'`;


    /* - outgoingFlatCrit - */

    env.STATDATA.outgoingFlatCrit.display = `OUT::CRIT`;
    env.STATDATA.outgoingFlatCrit.description = `'added to base crit chance on others';'before modifiers'`;


    /* - incomingMult - */

    env.STATDATA.incomingMult.display = `IN::x(HP)`;
    env.STATDATA.incomingMult.description = `'multiplies all HP changes inflicted upon this entity'`;


    /* - incomingFlat - */

    env.STATDATA.incomingFlat.display = `IN::HP`;
    env.STATDATA.incomingFlat.description = `'flat modifier to HP changes on this entity';'before modifiers'`;


    /* - incomingToHit - */

    env.STATDATA.incomingToHit.display = `IN::x(HIT)`;
    env.STATDATA.incomingToHit.description = `'multiplies chance to hit this entity'`;


    /* - incomingCrit - */

    env.STATDATA.incomingCrit.display = `IN::x(CRIT)`;
    env.STATDATA.incomingCrit.description = `'multiplies chance to crit this entity'`;


    /* - incomingFlatCrit - */

    env.STATDATA.incomingFlatCrit.display = `IN::CRIT`;
    env.STATDATA.incomingFlatCrit.description = `'added to base crit chance against this entity';'before modifiers'`;
}

// === ACTORS === //
cor_ru.combat['redefineActors'] = function () {
    /* - reactions - */

    env.COMBAT_REACTIONS.basic_incoherent = {
        catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
        dead: ["¿", "???"]
    }

    env.COMBAT_REACTIONS.husk = {
        evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er", "", "", "", "", "", ""],
        crit: ["Ü di¢ö1€Oe Î", "R E TU RN", "", "", "", "", "", ""],
        receive_crit: ["hu r ts", "", "", "", "", "", ""],
        receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ", "", "", "", "", "", ""],
        puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ", "", "", "", "", "", ""],
        receive_buff: ["µÿÁiKp%Ñ", "", "", "", "", "", ""],
        receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct", "", "", "", "", "", ""],
        receive_vulnerable: ["ƒøÊ=è¶", "s e e", "", "", "", "", "", ""],
        receive_carapace: ["MËºY¾Ñ", "", "", "", "", "", ""],
        receive_redirection: ["f ina l ly aw  ake", "", "", "", "", "", ""],
        stun: ["o u  t ou t o ut", "ou to u t o  ut", "", "", "", "", "", ""],
        regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e", "", "", "", "", "", ""],
        give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ", "ḧỂḺᵽ", "ḧỂḺᵽ YºŮ", "ⱤEMŒM BEɌ", "", "", "", "", "", ""],
    }


    /* - generic - */

    env.COMBAT_ACTORS.generic.name = `GENERATED`;

    env.COMBAT_ACTORS.generic.reactions = {
        evade: ["missed", "close", "aa"],
        crit: ["ha", "perfect", "take that"],
        crit_buff: ["easy", "good"],
        miss: ["oh no", "i missed", "sorry"],
        dead: ["..."],
        puncture: ["bleeding"],
        regen: ["ahh", "feels good"],
        destabilized: ["…"],
        stun: ["oouaa", "eeou"],
        laugh: ["ehehe", "hehe", "haha", "ahaha"],
        receive_hit: ["ow", "ouch"],
        receive_crit: ["ow!", "ouch!"],
        receive_puncture: ["it cut me"],
        receive_buff: ["thank you", "very cool"],
        receive_destabilized: ["feels blurry"],
        receive_rez: ["i almost died?"],
        receive_carapace: ["oh, armor", "this will help"],
        receive_repairs: ["i feel better", "thanks"],
        receive_fear: ["what is that?", "what did it say?", "it is so unnatural", "this feels wrong"],
        receive_redirection: ["oh, thank you", "i will not let you down"],
    }
    env.COMBAT_ACTORS.generic.reactionPersonalities.ichor = {
        evade: ["watch out!!"],
        crit: ["yes!!", "everyone, follow my lead!"],
        crit_buff: ["are you feeling better?", "do you need more?", "i have your back!"],
        miss: ["oh!! sorry... i missed...", "i messed up again...", "àœœm!!"],
        dead: ["..."],
        puncture: ["is there a heal to spare?", "what? i am fine!"],
        regen: ["feeling good!!"],
        destabilized: ["..."],
        stun: ["my arms..."],
        laugh: ["hehehehe", "ahaha!", "heehee!", "ehehehe!"],
        sacrifice: ["this is how it has to be..."],
        receive_hit: ["ÅÍ£"],
        receive_crit: ["aùÓŸ=ý!!"],
        receive_puncture: ["this is nothing...", "good thing it was me!"],
        receive_buff: ["for me? really?", "you should not have!", "ah, i will repay this!"],
        receive_destabilized: ["i can fix everything..."],
        receive_rez: ["i am back? we can fix this!!"],
        receive_carapace: ["no, i am fine!", "a shield for me?"],
        receive_repairs: ["if only we always had this..."],
        receive_fear: ["is this real...?"],
        receive_redirection: ["what are you doing?", "but they will hurt you!"],
    }
    env.COMBAT_ACTORS.generic.reactionPersonalities.eyes = {
        evade: ["nice try", "not fast enough"],
        crit: ["this was inevitable", "you will not last"],
        crit_buff: ["there you go", "do not waste this"],
        miss: ["i need to focus", "i was too slow"],
        dead: ["..."],
        puncture: ["i need this fixed", "you are taking too long", "help me now"],
        regen: ["a slow recovery"],
        destabilized: ["..."],
        stun: ["ah..."],
        laugh: ["ha ha ha ha", "heh heh", "ohoho", "hmhmhm"],
        give_vulnerable: ["there!", "i see an opening"],
        receive_hit: ["aaÍ", "€ŸÀaa"],
        receive_crit: [" ÜÃ¼ÎüeÈ"],
        receive_puncture: ["this will need to be fixed", "do not delay in mending me"],
        receive_buff: ["was that really your best?", "that will do, for now"],
        receive_destabilized: ["it is happening again"],
        receive_rez: ["good"],
        receive_carapace: ["this will not last for long", "i will need further shielding"],
        receive_repairs: ["it is better than nothing"],
        receive_fear: ["i...", "what...", "but..."],
        receive_redirection: ["quit wasting time and hit them", "you will still be hit"],
    }
    env.COMBAT_ACTORS.generic.reactionPersonalities.claws = {
        evade: ["ha! HA HA!!", "HA! idiot!!"],
        crit: ["BURN! BLEED! DIE! DIE DIE DIE!", "BLEED! BURN!", "DIEDIEDIEDIEDIEDIE!!", "DIE!"],
        crit_buff: ["you are WELCOME!", "now KILL THEM!"],
        miss: ["DIE ALREADY!!", "ñÔœþ}Ó !", "º¥Ä¥’¥×!!!", "USELESS!!"],
        dead: ["..."],
        puncture: ["i cannot fight like this!!!", "help me! NOW NOW NOW NOW!"],
        regen: ["better than before..!", "not healing FAST ENOUGH!"],
        destabilized: ["...", "...", "...", "heheôíhôhehe"],
        stun: ["eåeaaaåauu"],
        laugh: ["eheheheheHEHEHAHAHAHA!!", "AAHAHAHAA!!", "HAA! ahaha!!", "eheHEEHeheh!!"],
        receive_hit: ["eåe!"],
        receive_crit: ["€EÙÓï#ÜÃ¼Î", "ÃÍáÊ!!"],
        receive_puncture: ["OW!", "you will PAY for this!", "you-- I WILL KILL YOU!"],
        receive_buff: ["good!", "they will MELT beneath us!!", "it was ABOUT TIME!!"],
        receive_destabilized: ["DIE!! DIE DIE die DIE die die DIE!", "HEHEHËHæ æAA!!!!"],
        receive_rez: ["NOTHING can stop me! NOTHING!", "time to DIE!"],
        receive_carapace: ["they will not leave a scratch on me!!"],
        receive_repairs: ["good! more, NOW!", "ugh!! finally!!"],
        receive_fear: ["this... changes NOTHING...!", "ugh...", "euuehh"],
        receive_redirection: ["better YOU than me!"],
    }
    env.COMBAT_ACTORS.generic.reactionPersonalities.bone = {
        evade: ["did you really think that would hit me?", "not so easy"],
        crit: ["you will not get past me", "i will shatter you"],
        crit_buff: ["do not make me regret this"],
        miss: ["ßÐƒ"],
        dead: ["..."],
        puncture: ["let me fix this", "i must have something to stop this bleeding"],
        regen: ["good..."],
        destabilized: ["..."],
        stun: ["what--?"],
        laugh: ["heh", "hah", "oho", "hmh"],
        receive_crit: ["a cruel trick", "i see you now"],
        receive_puncture: ["this will not stop me"],
        receive_buff: ["feeling fine"],
        receive_destabilized: ["you all look so frail...", "you will never get past me now"],
        receive_rez: ["back again...", "it seems i can trust you, at least"],
        receive_carapace: ["they will not get through this", "perfect"],
        receive_fear: ["no--they are my friends!!", "they would never..."],
        give_redirection: ["stay behind", "look at me!"],
        receive_redirection: ["i do not need your help"],
    }
    env.COMBAT_ACTORS.generic.reactionPersonalities.light = {
        evade: ["i saw it!!", "over heËere ehehe", "missed missed missed ahahaha!!!", "unthinking thing!"],
        crit: ["AHAHA", "D«¶¾NK!!!", "this is ¤UR¬¶ world!"],
        crit_buff: ["life is literall¬y so easy", "i can ÷ú*¼see the cells...!", "do not worry, my friend!!", "trusst meÉe"],
        miss: ["eheheHAHA", "oh nooo ahaha!!", "stupid! stupi½id!!", "what!! cheater!!!", "use focus stupid!!"],
        dead: ["hahaå÷ú*¼-- ...", "HA«¶¾ß-- ...", "«hehe-- ...", "ha®½-- ..."],
        puncture: ["oww hahaa", "fix me! fix me f&5«ix  meœ fiºQôux mÆ!", "helloooo?? FIX ME!!", "i have blood??", "ohh haha that is verý¯Ÿ bad for m£+¤"],
        regen: ["yess¬"],
        destabilized: ["it mæm¬îV°0kes my voice funny", "hahaaå¬¬h#±aaahaha", "yo*¼u-„should ƒ„eel this¤"],
        stun: ["heavyy", "i want my turnnn", "boØringg[Œÿ:ä‘", "so s st upid", "b ored"],
        laugh: ["ahaAⱧȺȀ", "eȇĕhehehehɇ", "aHAHAahYS§“&I‘Ì¥‹gµž={ùa", "hee hee²<®¿hee!!", "ħħeheheḩeheḛ", "HẴĦẪ¬"],
        receive_crit: ["wooaaa big hit", "hahaa d onk", "n not fun nyy"],
        receive_puncture: ["it went thro¢u®gh”¨", "%—HÀÀ ðw Øw"],
        receive_buff: ["yee@¼±¬SS", "ha/¯qhaœ'ha"],
        receive_destabilized: ["•±NOW i will HURT them!", "i kn¨ow the ˜¥lines", "GOOD", "the wall i¼s ÇrÁ°rackˆ.ing"],
        receive_rez: ["reembodied!! the old one?", "ahahaaa thank you friend", "pulled from thÈe sea!¡!"],
        receive_carapace: ["cool!! cool!!", "this looks so cool on mee"],
        receive_repairs: ["ffeels nice"],
        receive_fear: ["fake... fake feeling¤’*s its fake", "is this a¬ll there is?¢¤?", "i do not want to go ba¢k", "hëelp me heËl‡p", "where are we??", "i dd‰o not want t®¼o live th‡!¦s way"],
        receive_redirection: ["like one body!! haha!!", "brave! i like you!!"],
    }

    env.COMBAT_ACTORS.generic.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - tutorial_golem - */

    env.COMBAT_ACTORS.tutorial_golem.name = `Golem`;

    env.COMBAT_ACTORS.tutorial_golem.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - listener - */

    env.COMBAT_ACTORS.listener.name = `Listener`;

    env.COMBAT_ACTORS.listener.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - container_exploder - */

    env.COMBAT_ACTORS.container_exploder.name = `Container`;

    env.COMBAT_ACTORS.container_exploder.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.container_exploder.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.container_exploder.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - container_evader - */

    env.COMBAT_ACTORS.container_evader.name = `Container`;

    env.COMBAT_ACTORS.container_evader.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.container_evader.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.container_evader.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - container_spy - */

    env.COMBAT_ACTORS.container_spy.name = `Container`;

    env.COMBAT_ACTORS.container_spy.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.container_spy.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.container_spy.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - container_sfer - */

    env.COMBAT_ACTORS.container_sfer.name = `Container`;

    env.COMBAT_ACTORS.container_sfer.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.container_sfer.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.container_sfer.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - personnel_attendant - */

    env.COMBAT_ACTORS.personnel_attendant.name = `Spire Attendant`;

    env.COMBAT_ACTORS.personnel_attendant.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.personnel_attendant.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.personnel_attendant.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - personnel_veilklight - */

    env.COMBAT_ACTORS.personnel_veilklight.name = `Veilklight`;

    env.COMBAT_ACTORS.personnel_veilklight.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.personnel_veilklight.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.personnel_veilklight.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - movefoe_driver - */

    env.COMBAT_ACTORS.movefoe_driver.name = `Movefoe`;

    env.COMBAT_ACTORS.movefoe_driver.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - movefoe_relay - */

    env.COMBAT_ACTORS.movefoe_relay.name = `Flesh Segment`;

    env.COMBAT_ACTORS.movefoe_relay.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - movefoe_tendrils - */

    env.COMBAT_ACTORS.movefoe_tendrils.name = `Tendril`;

    env.COMBAT_ACTORS.movefoe_tendrils.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - archival_golem - */

    env.COMBAT_ACTORS.archival_golem.name = `Archival Golem`;

    env.COMBAT_ACTORS.archival_golem.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - maintcloak - */

    env.COMBAT_ACTORS.maintcloak.name = `Jutskin`;

    env.COMBAT_ACTORS.maintcloak.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.maintcloak.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.maintcloak.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - husk_observer - */

    env.COMBAT_ACTORS.husk_observer.name = `Uzzi`;

    env.COMBAT_ACTORS.husk_observer.reactions.evade = ['s tŒ¥ó y  aw œ y', 'n o  c l os er', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_observer.reactions.crit = ['Ü di¢ö1€Oe Î', 'R E TU RN', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_observer.reactions.receive_crit = ['hu r ts', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_observer.reactions.receive_puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_observer.reactions.puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_observer.reactions.receive_buff = ['µÿÁiKp%Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_observer.reactions.receive_destabilized = ['âª¥lé§ÎéýÁ', 'dÆis co ne ct', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_observer.reactions.receive_vulnerable = ['ƒøÊ=è¶', 's e e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_observer.reactions.receive_carapace = ['MËºY¾Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_observer.reactions.receive_redirection = ['f ina l ly aw  ake', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_observer.reactions.stun = ['o u  t ou t o ut', 'ou to u t o  ut', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_observer.reactions.regen = ['m y f  le sh', 'cl o½ se ®±… r', 'm¿ ó+r  e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_observer.reactions.give_fear = ['cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De', 'ÐⱤ0 Ø Ⱳƞ ', '§±ÂⱤ ṾḮɲG─', 'YºŮ ɃěC ‰ Ṃể', 'šøừ Ɍ€cɇ hȩḸ─lƥ', 'ḧỂḺᵽ', 'ḧỂḺᵽ YºŮ', 'ⱤEMŒM BEɌ', '', '', '', '', '', ''];

    env.COMBAT_ACTORS.husk_observer.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - husk_striker - */

    env.COMBAT_ACTORS.husk_striker.name = `Kiku`;

    env.COMBAT_ACTORS.husk_striker.reactions.evade = ['s tŒ¥ó y  aw œ y', 'n o  c l os er', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_striker.reactions.crit = ['Ü di¢ö1€Oe Î', 'R E TU RN', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_striker.reactions.receive_crit = ['hu r ts', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_striker.reactions.receive_puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_striker.reactions.puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_striker.reactions.receive_buff = ['µÿÁiKp%Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_striker.reactions.receive_destabilized = ['âª¥lé§ÎéýÁ', 'dÆis co ne ct', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_striker.reactions.receive_vulnerable = ['ƒøÊ=è¶', 's e e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_striker.reactions.receive_carapace = ['MËºY¾Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_striker.reactions.receive_redirection = ['f ina l ly aw  ake', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_striker.reactions.stun = ['o u  t ou t o ut', 'ou to u t o  ut', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_striker.reactions.regen = ['m y f  le sh', 'cl o½ se ®±… r', 'm¿ ó+r  e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_striker.reactions.give_fear = ['cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De', 'ÐⱤ0 Ø Ⱳƞ ', '§±ÂⱤ ṾḮɲG─', 'YºŮ ɃěC ‰ Ṃể', 'šøừ Ɍ€cɇ hȩḸ─lƥ', 'ḧỂḺᵽ', 'ḧỂḺᵽ YºŮ', 'ⱤEMŒM BEɌ', '', '', '', '', '', ''];

    env.COMBAT_ACTORS.husk_striker.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - husk_support - */

    env.COMBAT_ACTORS.husk_support.name = `Oulo`;

    env.COMBAT_ACTORS.husk_support.reactions.evade = ['s tŒ¥ó y  aw œ y', 'n o  c l os er', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_support.reactions.crit = ['Ü di¢ö1€Oe Î', 'R E TU RN', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_support.reactions.receive_crit = ['hu r ts', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_support.reactions.receive_puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_support.reactions.puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_support.reactions.receive_buff = ['µÿÁiKp%Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_support.reactions.receive_destabilized = ['âª¥lé§ÎéýÁ', 'dÆis co ne ct', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_support.reactions.receive_vulnerable = ['ƒøÊ=è¶', 's e e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_support.reactions.receive_carapace = ['MËºY¾Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_support.reactions.receive_redirection = ['f ina l ly aw  ake', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_support.reactions.stun = ['o u  t ou t o ut', 'ou to u t o  ut', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_support.reactions.regen = ['m y f  le sh', 'cl o½ se ®±… r', 'm¿ ó+r  e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_support.reactions.give_fear = ['cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De', 'ÐⱤ0 Ø Ⱳƞ ', '§±ÂⱤ ṾḮɲG─', 'YºŮ ɃěC ‰ Ṃể', 'šøừ Ɍ€cɇ hȩḸ─lƥ', 'ḧỂḺᵽ', 'ḧỂḺᵽ YºŮ', 'ⱤEMŒM BEɌ', '', '', '', '', '', ''];

    env.COMBAT_ACTORS.husk_support.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - husk_guard - */

    env.COMBAT_ACTORS.husk_guard.name = `Tari`;

    env.COMBAT_ACTORS.husk_guard.reactions.evade = ['s tŒ¥ó y  aw œ y', 'n o  c l os er', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard.reactions.crit = ['Ü di¢ö1€Oe Î', 'R E TU RN', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard.reactions.receive_crit = ['hu r ts', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard.reactions.receive_puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard.reactions.puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard.reactions.receive_buff = ['µÿÁiKp%Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard.reactions.receive_destabilized = ['âª¥lé§ÎéýÁ', 'dÆis co ne ct', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard.reactions.receive_vulnerable = ['ƒøÊ=è¶', 's e e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard.reactions.receive_carapace = ['MËºY¾Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard.reactions.receive_redirection = ['f ina l ly aw  ake', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard.reactions.stun = ['o u  t ou t o ut', 'ou to u t o  ut', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard.reactions.regen = ['m y f  le sh', 'cl o½ se ®±… r', 'm¿ ó+r  e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard.reactions.give_fear = ['cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De', 'ÐⱤ0 Ø Ⱳƞ ', '§±ÂⱤ ṾḮɲG─', 'YºŮ ɃěC ‰ Ṃể', 'šøừ Ɍ€cɇ hȩḸ─lƥ', 'ḧỂḺᵽ', 'ḧỂḺᵽ YºŮ', 'ⱤEMŒM BEɌ', '', '', '', '', '', ''];

    env.COMBAT_ACTORS.husk_guard.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - kivskin - */

    env.COMBAT_ACTORS.kivskin.name = `Kivskin`;

    env.COMBAT_ACTORS.kivskin.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.kivskin.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.kivskin.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - constructor_boss - */

    env.COMBAT_ACTORS.constructor_boss.name = `Constructor`;

    env.COMBAT_ACTORS.constructor_boss.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.constructor_boss.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.constructor_boss.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - constructor_vat - */

    env.COMBAT_ACTORS.constructor_vat.name = `Vat`;

    env.COMBAT_ACTORS.constructor_vat.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - constructor_arm_stabber - */

    env.COMBAT_ACTORS.constructor_arm_stabber.name = `Slender Limb`;

    env.COMBAT_ACTORS.constructor_arm_stabber.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - constructor_arm_repair - */

    env.COMBAT_ACTORS.constructor_arm_repair.name = `Repair Limb`;

    env.COMBAT_ACTORS.constructor_arm_repair.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - constructor_arm_stun - */

    env.COMBAT_ACTORS.constructor_arm_stun.name = `Heavy Limb`;

    env.COMBAT_ACTORS.constructor_arm_stun.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - constructor_arm_spy - */

    env.COMBAT_ACTORS.constructor_arm_spy.name = `Analytical Limb`;

    env.COMBAT_ACTORS.constructor_arm_spy.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - constructor_arm_malform - */

    env.COMBAT_ACTORS.constructor_arm_malform.name = `Malformed Core`;

    env.COMBAT_ACTORS.constructor_arm_malform.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - kivii - */

    env.COMBAT_ACTORS.kivii.name = `Dozkallvi`;

    env.COMBAT_ACTORS.kivii.reactions.evade = ['s tŒ¥ó y  aw œ y', 'n o  c l os er', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.kivii.reactions.crit = ['Ü di¢ö1€Oe Î', 'R E TU RN', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.kivii.reactions.receive_crit = ['hu r ts', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.kivii.reactions.receive_puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.kivii.reactions.puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.kivii.reactions.receive_buff = ['µÿÁiKp%Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.kivii.reactions.receive_destabilized = ['âª¥lé§ÎéýÁ', 'dÆis co ne ct', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.kivii.reactions.receive_vulnerable = ['ƒøÊ=è¶', 's e e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.kivii.reactions.receive_carapace = ['MËºY¾Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.kivii.reactions.receive_redirection = ['f ina l ly aw  ake', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.kivii.reactions.stun = ['o u  t ou t o ut', 'ou to u t o  ut', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.kivii.reactions.regen = ['m y f  le sh', 'cl o½ se ®±… r', 'm¿ ó+r  e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.kivii.reactions.give_fear = ['cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De', 'ÐⱤ0 Ø Ⱳƞ ', '§±ÂⱤ ṾḮɲG─', 'YºŮ ɃěC ‰ Ṃể', 'šøừ Ɍ€cɇ hȩḸ─lƥ', 'ḧỂḺᵽ', 'ḧỂḺᵽ YºŮ', 'ⱤEMŒM BEɌ', '', '', '', '', '', ''];

    env.COMBAT_ACTORS.kivii.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - kivii_gauntlet - */

    env.COMBAT_ACTORS.kivii_gauntlet.name = `Gauntlet`;

    env.COMBAT_ACTORS.kivii_gauntlet.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - repairfriend - */

    env.COMBAT_ACTORS.repairfriend.name = `Repairfriend`;

    env.COMBAT_ACTORS.repairfriend.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.repairfriend.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.repairfriend.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - wounded_archival_golem - */

    env.COMBAT_ACTORS.wounded_archival_golem.name = `Archival Golem`;

    env.COMBAT_ACTORS.wounded_archival_golem.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - translation_golem - */

    env.COMBAT_ACTORS.translation_golem.name = `Translation Core`;

    env.COMBAT_ACTORS.translation_golem.reactions.catchall = ['████ ███', '██ ██████', '█████ ████', '███', '███ ███ ███', '███ █ ████', '██████ ██', '█ ████', '████ █ █ █'];
    env.COMBAT_ACTORS.translation_golem.reactions.dead = ['███ █ █ █ ███'];

    env.COMBAT_ACTORS.translation_golem.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - hallucination - */

    env.COMBAT_ACTORS.hallucination.name = `»õGQàº3¾õ”cR%`;

    env.COMBAT_ACTORS.hallucination.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - foundation_golem - */

    env.COMBAT_ACTORS.foundation_golem.name = `Foundation Golem`;

    env.COMBAT_ACTORS.foundation_golem.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.foundation_golem.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.foundation_golem.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - lesserhusk - */

    env.COMBAT_ACTORS.lesserhusk.name = `Husk`;

    env.COMBAT_ACTORS.lesserhusk.reactions.evade = ['s tŒ¥ó y  aw œ y', 'n o  c l os er', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk.reactions.crit = ['Ü di¢ö1€Oe Î', 'R E TU RN', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk.reactions.receive_crit = ['hu r ts', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk.reactions.receive_puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk.reactions.puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk.reactions.receive_buff = ['µÿÁiKp%Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk.reactions.receive_destabilized = ['âª¥lé§ÎéýÁ', 'dÆis co ne ct', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk.reactions.receive_vulnerable = ['ƒøÊ=è¶', 's e e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk.reactions.receive_carapace = ['MËºY¾Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk.reactions.receive_redirection = ['f ina l ly aw  ake', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk.reactions.stun = ['o u  t ou t o ut', 'ou to u t o  ut', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk.reactions.regen = ['m y f  le sh', 'cl o½ se ®±… r', 'm¿ ó+r  e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk.reactions.give_fear = ['cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De', 'ÐⱤ0 Ø Ⱳƞ ', '§±ÂⱤ ṾḮɲG─', 'YºŮ ɃěC ‰ Ṃể', 'šøừ Ɍ€cɇ hȩḸ─lƥ', 'ḧỂḺᵽ', 'ḧỂḺᵽ YºŮ', 'ⱤEMŒM BEɌ', '', '', '', '', '', ''];

    env.COMBAT_ACTORS.lesserhusk.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - lesserhusk_stabber - */

    env.COMBAT_ACTORS.lesserhusk_stabber.name = `Sharp Husk`;

    env.COMBAT_ACTORS.lesserhusk_stabber.reactions.evade = ['s tŒ¥ó y  aw œ y', 'n o  c l os er', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_stabber.reactions.crit = ['Ü di¢ö1€Oe Î', 'R E TU RN', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_stabber.reactions.receive_crit = ['hu r ts', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_stabber.reactions.receive_puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_stabber.reactions.puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_stabber.reactions.receive_buff = ['µÿÁiKp%Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_stabber.reactions.receive_destabilized = ['âª¥lé§ÎéýÁ', 'dÆis co ne ct', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_stabber.reactions.receive_vulnerable = ['ƒøÊ=è¶', 's e e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_stabber.reactions.receive_carapace = ['MËºY¾Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_stabber.reactions.receive_redirection = ['f ina l ly aw  ake', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_stabber.reactions.stun = ['o u  t ou t o ut', 'ou to u t o  ut', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_stabber.reactions.regen = ['m y f  le sh', 'cl o½ se ®±… r', 'm¿ ó+r  e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_stabber.reactions.give_fear = ['cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De', 'ÐⱤ0 Ø Ⱳƞ ', '§±ÂⱤ ṾḮɲG─', 'YºŮ ɃěC ‰ Ṃể', 'šøừ Ɍ€cɇ hȩḸ─lƥ', 'ḧỂḺᵽ', 'ḧỂḺᵽ YºŮ', 'ⱤEMŒM BEɌ', '', '', '', '', '', ''];

    env.COMBAT_ACTORS.lesserhusk_stabber.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - lesserhusk_support - */

    env.COMBAT_ACTORS.lesserhusk_support.name = `Husk`;

    env.COMBAT_ACTORS.lesserhusk_support.reactions.evade = ['s tŒ¥ó y  aw œ y', 'n o  c l os er', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_support.reactions.crit = ['Ü di¢ö1€Oe Î', 'R E TU RN', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_support.reactions.receive_crit = ['hu r ts', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_support.reactions.receive_puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_support.reactions.puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_support.reactions.receive_buff = ['µÿÁiKp%Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_support.reactions.receive_destabilized = ['âª¥lé§ÎéýÁ', 'dÆis co ne ct', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_support.reactions.receive_vulnerable = ['ƒøÊ=è¶', 's e e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_support.reactions.receive_carapace = ['MËºY¾Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_support.reactions.receive_redirection = ['f ina l ly aw  ake', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_support.reactions.stun = ['o u  t ou t o ut', 'ou to u t o  ut', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_support.reactions.regen = ['m y f  le sh', 'cl o½ se ®±… r', 'm¿ ó+r  e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_support.reactions.give_fear = ['cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De', 'ÐⱤ0 Ø Ⱳƞ ', '§±ÂⱤ ṾḮɲG─', 'YºŮ ɃěC ‰ Ṃể', 'šøừ Ɍ€cɇ hȩḸ─lƥ', 'ḧỂḺᵽ', 'ḧỂḺᵽ YºŮ', 'ⱤEMŒM BEɌ', '', '', '', '', '', ''];

    env.COMBAT_ACTORS.lesserhusk_support.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - lesserhusk_observer - */

    env.COMBAT_ACTORS.lesserhusk_observer.name = `Husk`;

    env.COMBAT_ACTORS.lesserhusk_observer.reactions.evade = ['s tŒ¥ó y  aw œ y', 'n o  c l os er', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_observer.reactions.crit = ['Ü di¢ö1€Oe Î', 'R E TU RN', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_observer.reactions.receive_crit = ['hu r ts', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_observer.reactions.receive_puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_observer.reactions.puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_observer.reactions.receive_buff = ['µÿÁiKp%Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_observer.reactions.receive_destabilized = ['âª¥lé§ÎéýÁ', 'dÆis co ne ct', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_observer.reactions.receive_vulnerable = ['ƒøÊ=è¶', 's e e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_observer.reactions.receive_carapace = ['MËºY¾Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_observer.reactions.receive_redirection = ['f ina l ly aw  ake', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_observer.reactions.stun = ['o u  t ou t o ut', 'ou to u t o  ut', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_observer.reactions.regen = ['m y f  le sh', 'cl o½ se ®±… r', 'm¿ ó+r  e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_observer.reactions.give_fear = ['cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De', 'ÐⱤ0 Ø Ⱳƞ ', '§±ÂⱤ ṾḮɲG─', 'YºŮ ɃěC ‰ Ṃể', 'šøừ Ɍ€cɇ hȩḸ─lƥ', 'ḧỂḺᵽ', 'ḧỂḺᵽ YºŮ', 'ⱤEMŒM BEɌ', '', '', '', '', '', ''];

    env.COMBAT_ACTORS.lesserhusk_observer.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - lesserhusk_shielder - */

    env.COMBAT_ACTORS.lesserhusk_shielder.name = `Husk`;

    env.COMBAT_ACTORS.lesserhusk_shielder.reactions.evade = ['s tŒ¥ó y  aw œ y', 'n o  c l os er', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_shielder.reactions.crit = ['Ü di¢ö1€Oe Î', 'R E TU RN', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_shielder.reactions.receive_crit = ['hu r ts', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_shielder.reactions.receive_puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_shielder.reactions.puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_shielder.reactions.receive_buff = ['µÿÁiKp%Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_shielder.reactions.receive_destabilized = ['âª¥lé§ÎéýÁ', 'dÆis co ne ct', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_shielder.reactions.receive_vulnerable = ['ƒøÊ=è¶', 's e e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_shielder.reactions.receive_carapace = ['MËºY¾Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_shielder.reactions.receive_redirection = ['f ina l ly aw  ake', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_shielder.reactions.stun = ['o u  t ou t o ut', 'ou to u t o  ut', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_shielder.reactions.regen = ['m y f  le sh', 'cl o½ se ®±… r', 'm¿ ó+r  e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.lesserhusk_shielder.reactions.give_fear = ['cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De', 'ÐⱤ0 Ø Ⱳƞ ', '§±ÂⱤ ṾḮɲG─', 'YºŮ ɃěC ‰ Ṃể', 'šøừ Ɍ€cɇ hȩḸ─lƥ', 'ḧỂḺᵽ', 'ḧỂḺᵽ YºŮ', 'ⱤEMŒM BEɌ', '', '', '', '', '', ''];

    env.COMBAT_ACTORS.lesserhusk_shielder.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - boss_golem - */

    env.COMBAT_ACTORS.boss_golem.name = `???`;

    env.COMBAT_ACTORS.boss_golem.reactions.evade = ['s tŒ¥ó y  aw œ y', 'n o  c l os er', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.boss_golem.reactions.crit = ['Ü di¢ö1€Oe Î', 'R E TU RN', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.boss_golem.reactions.receive_crit = ['hu r ts', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.boss_golem.reactions.receive_puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.boss_golem.reactions.puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.boss_golem.reactions.receive_buff = ['µÿÁiKp%Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.boss_golem.reactions.receive_destabilized = ['âª¥lé§ÎéýÁ', 'dÆis co ne ct', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.boss_golem.reactions.receive_vulnerable = ['ƒøÊ=è¶', 's e e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.boss_golem.reactions.receive_carapace = ['MËºY¾Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.boss_golem.reactions.receive_redirection = ['f ina l ly aw  ake', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.boss_golem.reactions.stun = ['o u  t ou t o ut', 'ou to u t o  ut', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.boss_golem.reactions.regen = ['m y f  le sh', 'cl o½ se ®±… r', 'm¿ ó+r  e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.boss_golem.reactions.give_fear = ['cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De', 'ÐⱤ0 Ø Ⱳƞ ', '§±ÂⱤ ṾḮɲG─', 'YºŮ ɃěC ‰ Ṃể', 'šøừ Ɍ€cɇ hȩḸ─lƥ', 'ḧỂḺᵽ', 'ḧỂḺᵽ YºŮ', 'ⱤEMŒM BEɌ', '', '', '', '', '', ''];

    env.COMBAT_ACTORS.boss_golem.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - container - */

    env.COMBAT_ACTORS.container.name = `Container`;

    env.COMBAT_ACTORS.container.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.container.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.container.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - attendant - */

    env.COMBAT_ACTORS.attendant.name = `Spire Attendant`;

    env.COMBAT_ACTORS.attendant.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.attendant.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.attendant.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - tendrils - */

    env.COMBAT_ACTORS.tendrils.name = `Tendril`;

    env.COMBAT_ACTORS.tendrils.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - veilklight - */

    env.COMBAT_ACTORS.veilklight.name = `Veilklight`;

    env.COMBAT_ACTORS.veilklight.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.veilklight.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.veilklight.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - enemy_movefriend - */

    env.COMBAT_ACTORS.enemy_movefriend.name = `Movefoe`;

    env.COMBAT_ACTORS.enemy_movefriend.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - bstrdlight - */

    env.COMBAT_ACTORS.bstrdlight.name = `BSTRDlight`;

    env.COMBAT_ACTORS.bstrdlight.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.bstrdlight.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.bstrdlight.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - bstrdboss - */

    env.COMBAT_ACTORS.bstrdboss.name = `BSTRD Golem`;

    env.COMBAT_ACTORS.bstrdboss.reactions.receive_destabilized = ['WOaoOAw'];
    env.COMBAT_ACTORS.bstrdboss.reactions.receive_rez = ['AHAHA :^) GOT U'];
    env.COMBAT_ACTORS.bstrdboss.reactions.puncture = ['OOUUEU'];
    env.COMBAT_ACTORS.bstrdboss.reactions.destabilized = ['DOUBLE BULLETS !!'];
    env.COMBAT_ACTORS.bstrdboss.reactions.steal = ['gime THAT', 'thanks BOUDY :}', 'LETS KEEP IT GOIG!!!!!'];
    env.COMBAT_ACTORS.bstrdboss.reactions.enrage = ['no moe FUCKIN around.... !!!!'];

    env.COMBAT_ACTORS.bstrdboss.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - bstrdboss_lowintensity - */

    env.COMBAT_ACTORS.bstrdboss_lowintensity.name = `BSTRD Golem`;

    env.COMBAT_ACTORS.bstrdboss_lowintensity.reactions.receive_destabilized = ['WOaoOAw'];
    env.COMBAT_ACTORS.bstrdboss_lowintensity.reactions.receive_rez = ['AHAHA :^) GOT U'];
    env.COMBAT_ACTORS.bstrdboss_lowintensity.reactions.puncture = ['OOUUEU'];
    env.COMBAT_ACTORS.bstrdboss_lowintensity.reactions.destabilized = ['DoUBLE BULLets !!'];

    env.COMBAT_ACTORS.bstrdboss_lowintensity.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - bstrdshelf - */

    env.COMBAT_ACTORS.bstrdshelf.name = `Pain Shelf`;

    env.COMBAT_ACTORS.bstrdshelf.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.bstrdshelf.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.bstrdshelf.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - akizet - */

    env.COMBAT_ACTORS.akizet.name = `Akizet`;
    env.COMBAT_ACTORS.akizet.description = `'utilizes rapid puncturing strikes';'reaps puncture for large hits'`;

    env.COMBAT_ACTORS.akizet.reactions.evade = ['far too close', 'oaa!', 'nearly...'];
    env.COMBAT_ACTORS.akizet.reactions.crit = [() => env.combat.has('husk') || env.rpg.is2D ? "get away!" : "excellent!"];
    env.COMBAT_ACTORS.akizet.reactions.crit_buff = [() => env.combat.has('husk') || env.rpg.is2D ? "good" : "easy!"];
    env.COMBAT_ACTORS.akizet.reactions.miss = ['œ¦êA'];
    env.COMBAT_ACTORS.akizet.reactions.dead = ['...'];
    env.COMBAT_ACTORS.akizet.reactions.receive_hit = ['@#Æ$J'];
    env.COMBAT_ACTORS.akizet.reactions.receive_crit = ['ßÃÆM!!'];
    env.COMBAT_ACTORS.akizet.reactions.receive_puncture = ['i have felt worse', 'a familiar feeling'];
    env.COMBAT_ACTORS.akizet.reactions.receive_buff = ['thank you', 'we are unstoppable'];
    env.COMBAT_ACTORS.akizet.reactions.receive_destabilized = ['every cell... awake...'];
    env.COMBAT_ACTORS.akizet.reactions.receive_rez = ['that was close...'];
    env.COMBAT_ACTORS.akizet.reactions.puncture = ['i need to fix this', () => env.combat.has('tozik') ? "tozik!" : "i need help!", () => env.combat.has('cavik') ? "cavik!" : "restoratives?!"];
    env.COMBAT_ACTORS.akizet.reactions.regen = ['this will do', 'better...'];
    env.COMBAT_ACTORS.akizet.reactions.destabilized = ['...'];
    env.COMBAT_ACTORS.akizet.reactions.stun = ['my arms...'];
    env.COMBAT_ACTORS.akizet.reactions.receive_carapace = ['this armor...!', 'very good'];
    env.COMBAT_ACTORS.akizet.reactions.receive_repairs = ['thank you, cavik', 'better!'];
    env.COMBAT_ACTORS.akizet.reactions.receive_fear = ['no, no...', 'the eyes...', 'velzie forgive me'];
    env.COMBAT_ACTORS.akizet.reactions.receive_redirection = ['together!', 'thank you, my friend', 'we will destroy them'];
    env.COMBAT_ACTORS.akizet.reactions.frenzy = ['die—', 'die!', 'ªœp—', 'ç2ªÔ!!', '¤¼C—', '{þÿU—'];

    env.COMBAT_ACTORS.akizet.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - gakvu - */

    env.COMBAT_ACTORS.gakvu.name = `Gakvu`;
    env.COMBAT_ACTORS.gakvu.description = `'escalates conflict through damage manipulation'`;

    env.COMBAT_ACTORS.gakvu.reactions.evade = [() => env.combat.has('husk') || env.rpg.is2D ? "ah!" : "haha!", () => env.combat.has('husk') || env.rpg.is2D ? "no!!" : "woaah!!"];
    env.COMBAT_ACTORS.gakvu.reactions.crit = [() => env.combat.has('husk') || env.rpg.is2D ? "clean..." : "it is simply that easy", () => env.combat.has('husk') || env.rpg.is2D ? "a few more like that..." : "that was lucky"];
    env.COMBAT_ACTORS.gakvu.reactions.crit_buff = ['so that goes there...'];
    env.COMBAT_ACTORS.gakvu.reactions.miss = [() => env.combat.has('husk') || env.rpg.is2D ? "€Öä!" : "oh...", () => env.combat.has('husk') || env.rpg.is2D ? "it is too fast!!" : "too bad"];
    env.COMBAT_ACTORS.gakvu.reactions.dead = ['...'];
    env.COMBAT_ACTORS.gakvu.reactions.receive_crit = ['Æ!!'];
    env.COMBAT_ACTORS.gakvu.reactions.receive_puncture = ['i am... bleeding...?', 'ow!! what...'];
    env.COMBAT_ACTORS.gakvu.reactions.receive_buff = ['thanks'];
    env.COMBAT_ACTORS.gakvu.reactions.receive_destabilized = ['may velzie look away'];
    env.COMBAT_ACTORS.gakvu.reactions.receive_rez = [() => env.combat.has('husk') || env.rpg.is2D ? "thank you" : "my savior"];
    env.COMBAT_ACTORS.gakvu.reactions.puncture = ['such a strange feeling', 'make this stop'];
    env.COMBAT_ACTORS.gakvu.reactions.regen = [() => env.combat.has('husk') || env.rpg.is2D ? "feeling better" : "feeling good"];
    env.COMBAT_ACTORS.gakvu.reactions.destabilized = ['...'];
    env.COMBAT_ACTORS.gakvu.reactions.stun = ['where did my eyes go?!'];
    env.COMBAT_ACTORS.gakvu.reactions.receive_carapace = ['so heavy'];
    env.COMBAT_ACTORS.gakvu.reactions.receive_repairs = ['thanks cavik'];
    env.COMBAT_ACTORS.gakvu.reactions.receive_fear = ['stop looking at me!!', 'get away from me!', 'no, no no no', 'what did it say??'];
    env.COMBAT_ACTORS.gakvu.reactions.receive_redirection = [() => env.rpg?.lastAction?.user?.slug ? `${env.rpg?.lastAction?.user?.name?.toLowerCase()}??` : "really??"];

    env.COMBAT_ACTORS.gakvu.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - tozik - */

    env.COMBAT_ACTORS.tozik.name = `Tozik`;
    env.COMBAT_ACTORS.tozik.description = `'maintains allies through stealing HP'`;

    env.COMBAT_ACTORS.tozik.reactions.crit = [() => env.combat.has('husk') || env.rpg.is2D ? "good enough" : "hehe"];
    env.COMBAT_ACTORS.tozik.reactions.crit_buff = ['keep going'];
    env.COMBAT_ACTORS.tozik.reactions.dead = ['...'];
    env.COMBAT_ACTORS.tozik.reactions.receive_destabilized = ['i hear it calling'];
    env.COMBAT_ACTORS.tozik.reactions.receive_rez = ['let us finish this'];
    env.COMBAT_ACTORS.tozik.reactions.puncture = ['i need to fix this'];
    env.COMBAT_ACTORS.tozik.reactions.destabilized = ['...'];
    env.COMBAT_ACTORS.tozik.reactions.stun = ['where...'];
    env.COMBAT_ACTORS.tozik.reactions.receive_carapace = ['thank you'];
    env.COMBAT_ACTORS.tozik.reactions.receive_repairs = ['that is better'];
    env.COMBAT_ACTORS.tozik.reactions.receive_fear = [() => env.rpg.is2D ? "there is nothing here" : "hollowed out...", 'and yet it moves', () => env.rpg.is2D ? "where are you?" : "what happened to you?", 'that cannot be', '...'];
    env.COMBAT_ACTORS.tozik.reactions.receive_redirection = ['i will return the favor'];

    env.COMBAT_ACTORS.tozik.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - tozik_npc - */

    env.COMBAT_ACTORS.tozik_npc.name = `Tozik`;
    env.COMBAT_ACTORS.tozik.description = `'maintains allies through stealing HP'`;

    env.COMBAT_ACTORS.tozik_npc.reactions.crit = [() => env.combat.has('husk') || env.rpg.is2D ? "good enough" : "hehe"];
    env.COMBAT_ACTORS.tozik_npc.reactions.crit_buff = ['keep going'];
    env.COMBAT_ACTORS.tozik_npc.reactions.dead = ['...'];
    env.COMBAT_ACTORS.tozik_npc.reactions.receive_destabilized = ['i hear it calling'];
    env.COMBAT_ACTORS.tozik_npc.reactions.receive_rez = ['let us finish this'];
    env.COMBAT_ACTORS.tozik_npc.reactions.puncture = ['i need to fix this'];
    env.COMBAT_ACTORS.tozik_npc.reactions.destabilized = ['...'];
    env.COMBAT_ACTORS.tozik_npc.reactions.stun = ['where...'];
    env.COMBAT_ACTORS.tozik_npc.reactions.receive_carapace = ['thank you'];
    env.COMBAT_ACTORS.tozik_npc.reactions.receive_repairs = ['that is better'];
    env.COMBAT_ACTORS.tozik_npc.reactions.receive_fear = [() => env.rpg.is2D ? "there is nothing here" : "hollowed out...", 'and yet it moves', () => env.rpg.is2D ? "where are you?" : "what happened to you?", 'that cannot be', '...'];
    env.COMBAT_ACTORS.tozik_npc.reactions.receive_redirection = ['i will return the favor'];

    env.COMBAT_ACTORS.tozik_npc.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - miltza - */

    env.COMBAT_ACTORS.miltza.name = `Miltza`;
    env.COMBAT_ACTORS.miltza.description = `'coordinates highly effective evasive and offensive maneuvers'`;

    env.COMBAT_ACTORS.miltza.reactions.evade = [() => env.combat.has('husk') || env.rpg.is2D ? "wah!!" : "i did it!"];
    env.COMBAT_ACTORS.miltza.reactions.crit = [() => env.rpg?.lastAction?.user?.team?.name == env.rpg?.lastAction?.initialTarget?.team?.name ? `forward!! get them!!!` : "die!! die!!"];
    env.COMBAT_ACTORS.miltza.reactions.crit_buff = ['is that better??'];
    env.COMBAT_ACTORS.miltza.reactions.miss = [() => env.combat.has('husk') || env.rpg.is2D ? "how does it move like that?!" : "next time"];
    env.COMBAT_ACTORS.miltza.reactions.dead = ['...'];
    env.COMBAT_ACTORS.miltza.reactions.receive_crit = ['Æöö!!'];
    env.COMBAT_ACTORS.miltza.reactions.receive_puncture = ['restorative, quick!'];
    env.COMBAT_ACTORS.miltza.reactions.receive_buff = ['thank you!'];
    env.COMBAT_ACTORS.miltza.reactions.receive_destabilized = ['die DIE!! DIE!! DIE!!!'];
    env.COMBAT_ACTORS.miltza.reactions.puncture = ['i am losing cohesion!'];
    env.COMBAT_ACTORS.miltza.reactions.stun = ['oaauuuau'];
    env.COMBAT_ACTORS.miltza.reactions.receive_carapace = ['a shell!'];
    env.COMBAT_ACTORS.miltza.reactions.receive_repairs = ['thank you, thank you!', 'so much better'];
    env.COMBAT_ACTORS.miltza.reactions.receive_fear = [() => env.rpg.is2D ? "this cannot be real" : "that one looks like...!", 'stop...', 'velzie take me from here', 'stay away! away!!'];
    env.COMBAT_ACTORS.miltza.reactions.receive_redirection = ['what??', 'oh, thank you!'];

    env.COMBAT_ACTORS.miltza.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - bozko - */

    env.COMBAT_ACTORS.bozko.name = `Bozko`;
    env.COMBAT_ACTORS.bozko.description = `'guards allies and counterattacks';'prioritizes armor over evasive maneuvering'`;

    env.COMBAT_ACTORS.bozko.reactions.regen = ['...'];
    env.COMBAT_ACTORS.bozko.reactions.evade = ['no', 'not so easy'];
    env.COMBAT_ACTORS.bozko.reactions.crit = ['get away from them', 'smashed to pieces'];
    env.COMBAT_ACTORS.bozko.reactions.crit_buff = ['take this'];
    env.COMBAT_ACTORS.bozko.reactions.miss = ['ßÐƒ'];
    env.COMBAT_ACTORS.bozko.reactions.destabilized = ['...'];
    env.COMBAT_ACTORS.bozko.reactions.dead = ['...'];
    env.COMBAT_ACTORS.bozko.reactions.receive_rez = ['get back up...'];
    env.COMBAT_ACTORS.bozko.reactions.receive_crit = ['you!'];
    env.COMBAT_ACTORS.bozko.reactions.receive_puncture = [() => env.combat.has('cavik') ? "cavik!" : "it punched through..."];
    env.COMBAT_ACTORS.bozko.reactions.receive_buff = ['keep it up'];
    env.COMBAT_ACTORS.bozko.reactions.receive_destabilized = ['i hear them again...'];
    env.COMBAT_ACTORS.bozko.reactions.puncture = ['blood everywhere'];
    env.COMBAT_ACTORS.bozko.reactions.stun = ['what--'];
    env.COMBAT_ACTORS.bozko.reactions.receive_carapace = ['good'];
    env.COMBAT_ACTORS.bozko.reactions.receive_repairs = ['...'];
    env.COMBAT_ACTORS.bozko.reactions.receive_fear = ['no...', 'stay back!', '...', () => env.rpg.is2D ? "so many lost" : "is it really you...?"];
    env.COMBAT_ACTORS.bozko.reactions.receive_spikes = ['come on', 'strike me now...'];
    env.COMBAT_ACTORS.bozko.reactions.give_redirection = ['stay behind', 'look at me!'];

    env.COMBAT_ACTORS.bozko.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - cavik - */

    env.COMBAT_ACTORS.cavik.name = `Cavik`;
    env.COMBAT_ACTORS.cavik.description = `'wears foes down through use of explosives';'maintains allies with mending barriers'`;

    env.COMBAT_ACTORS.cavik.reactions.receive_hit = ['ow!!'];
    env.COMBAT_ACTORS.cavik.reactions.regen = ['coming together again!'];
    env.COMBAT_ACTORS.cavik.reactions.evade = ['oh!!', 'what?!'];
    env.COMBAT_ACTORS.cavik.reactions.crit = ['i got you!', 'catch!'];
    env.COMBAT_ACTORS.cavik.reactions.crit_buff = ['this should help!'];
    env.COMBAT_ACTORS.cavik.reactions.miss = ['ah!'];
    env.COMBAT_ACTORS.cavik.reactions.destabilized = ['...'];
    env.COMBAT_ACTORS.cavik.reactions.dead = ['...'];
    env.COMBAT_ACTORS.cavik.reactions.receive_rez = ['what happened?!', 'i am back..?'];
    env.COMBAT_ACTORS.cavik.reactions.receive_crit = ['ow, ow!!!'];
    env.COMBAT_ACTORS.cavik.reactions.receive_puncture = ['oh no...'];
    env.COMBAT_ACTORS.cavik.reactions.receive_buff = ['thank you!'];
    env.COMBAT_ACTORS.cavik.reactions.receive_destabilized = ['it hurts', 'hurts', 'someone is there', 'i feel you', 'i cannot wake up'];
    env.COMBAT_ACTORS.cavik.reactions.puncture = ['i need to seal this!'];
    env.COMBAT_ACTORS.cavik.reactions.stun = ['whhaahh'];
    env.COMBAT_ACTORS.cavik.reactions.receive_fear = ['akizet!!', () => env.rpg.is2D ? "speak no more! please!" : "i... i remember you...", 'keep it away from me!', 'h--help me!', 'no, no no no'];
    env.COMBAT_ACTORS.cavik.reactions.receive_redirection = ['thank you!!', 'i will cover you!'];

    env.COMBAT_ACTORS.cavik.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - ikgolem - */

    env.COMBAT_ACTORS.ikgolem.name = `IK Golem`;
    env.COMBAT_ACTORS.ikgolem.description = `'utilizes windup to access powerful attacks';'no inherent defensive capability'`;

    env.COMBAT_ACTORS.ikgolem.reactions.receive_rez = ['ah, it works again!'];
    env.COMBAT_ACTORS.ikgolem.reactions.regen = ['much better'];
    env.COMBAT_ACTORS.ikgolem.reactions.evade = ['stop that!', 'deflected!'];
    env.COMBAT_ACTORS.ikgolem.reactions.crit = ['ahaha...', 'incredible!'];
    env.COMBAT_ACTORS.ikgolem.reactions.crit_buff = ['i hope that helps!'];
    env.COMBAT_ACTORS.ikgolem.reactions.miss = ['÷°ò!!'];
    env.COMBAT_ACTORS.ikgolem.reactions.destabilized = ['...'];
    env.COMBAT_ACTORS.ikgolem.reactions.dead = ['no! get up, get up!', 'the body is not responding!!'];
    env.COMBAT_ACTORS.ikgolem.reactions.receive_crit = ['how--?!'];
    env.COMBAT_ACTORS.ikgolem.reactions.receive_puncture = ['the chassis!!'];
    env.COMBAT_ACTORS.ikgolem.reactions.receive_buff = ['excellent'];
    env.COMBAT_ACTORS.ikgolem.reactions.receive_destabilized = ['something is so wrong...'];
    env.COMBAT_ACTORS.ikgolem.reactions.puncture = ['losing cohesion fast!'];
    env.COMBAT_ACTORS.ikgolem.reactions.stun = ['it will not respond!!'];
    env.COMBAT_ACTORS.ikgolem.reactions.receive_carapace = ['more armor! yes!'];
    env.COMBAT_ACTORS.ikgolem.reactions.receive_repairs = ['thank you, thank you'];
    env.COMBAT_ACTORS.ikgolem.reactions.receive_fear = ['what did this to you?!', 'i feel sick...'];
    env.COMBAT_ACTORS.ikgolem.reactions.receive_redirection = ['what?', 'unnecessary, but thanks'];

    env.COMBAT_ACTORS.ikgolem.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - telyu - */

    env.COMBAT_ACTORS.telyu.name = `Telyu`;

    env.COMBAT_ACTORS.telyu.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - husk - */

    env.COMBAT_ACTORS.husk.name = `Husk`;

    env.COMBAT_ACTORS.husk.reactions.evade = ['s tŒ¥ó y  aw œ y', 'n o  c l os er', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk.reactions.crit = ['Ü di¢ö1€Oe Î', 'R E TU RN', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk.reactions.receive_crit = ['hu r ts', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk.reactions.receive_puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk.reactions.puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk.reactions.receive_buff = ['µÿÁiKp%Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk.reactions.receive_destabilized = ['âª¥lé§ÎéýÁ', 'dÆis co ne ct', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk.reactions.receive_vulnerable = ['ƒøÊ=è¶', 's e e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk.reactions.receive_carapace = ['MËºY¾Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk.reactions.receive_redirection = ['f ina l ly aw  ake', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk.reactions.stun = ['o u  t ou t o ut', 'ou to u t o  ut', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk.reactions.regen = ['m y f  le sh', 'cl o½ se ®±… r', 'm¿ ó+r  e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk.reactions.give_fear = ['cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De', 'ÐⱤ0 Ø Ⱳƞ ', '§±ÂⱤ ṾḮɲG─', 'YºŮ ɃěC ‰ Ṃể', 'šøừ Ɍ€cɇ hȩḸ─lƥ', 'ḧỂḺᵽ', 'ḧỂḺᵽ YºŮ', 'ⱤEMŒM BEɌ', '', '', '', '', '', ''];

    env.COMBAT_ACTORS.husk.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - constructor_golem - */

    env.COMBAT_ACTORS.constructor_golem.name = `Constructor`;

    env.COMBAT_ACTORS.constructor_golem.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.constructor_golem.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.constructor_golem.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - pressure_golem - */

    env.COMBAT_ACTORS.pressure_golem.name = `Kivskin`;

    env.COMBAT_ACTORS.pressure_golem.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.pressure_golem.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.pressure_golem.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - dull_golem - */

    env.COMBAT_ACTORS.dull_golem.name = `Dullfriend`;

    env.COMBAT_ACTORS.dull_golem.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.dull_golem.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.dull_golem.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - surgeon_golem - */

    env.COMBAT_ACTORS.surgeon_golem.name = `Repairfriend`;

    env.COMBAT_ACTORS.surgeon_golem.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.surgeon_golem.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.surgeon_golem.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - basic_golem - */

    env.COMBAT_ACTORS.basic_golem.name = `Golem`;

    env.COMBAT_ACTORS.basic_golem.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.basic_golem.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.basic_golem.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - dull_keeper - */

    env.COMBAT_ACTORS.dull_keeper.name = `Dullzika`;

    env.COMBAT_ACTORS.dull_keeper.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.dull_keeper.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.dull_keeper.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - dull_container - */

    env.COMBAT_ACTORS.dull_container.name = `Warped Container`;

    env.COMBAT_ACTORS.dull_container.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.dull_container.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.dull_container.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - boss_golem_old - */

    env.COMBAT_ACTORS.boss_golem_old.name = `foundation golem`;

    env.COMBAT_ACTORS.boss_golem_old.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.boss_golem_old.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.boss_golem_old.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - geli - */

    env.COMBAT_ACTORS.geli.name = `Geli`;

    env.COMBAT_ACTORS.geli.reactions.evade = ['wow!', 'aahAHaha!!'];
    env.COMBAT_ACTORS.geli.reactions.crit = ['ahaha! i GOT THEM!!'];
    env.COMBAT_ACTORS.geli.reactions.miss = ['oh NO!!', 'WASTED BULLET', 'WILL GET NEXT 1!'];
    env.COMBAT_ACTORS.geli.reactions.dead = ['i CANT MOVE'];
    env.COMBAT_ACTORS.geli.reactions.receive_hit = ['OW'];
    env.COMBAT_ACTORS.geli.reactions.receive_crit = ['WHY DOES IT HURT SO BAD', '>:('];
    env.COMBAT_ACTORS.geli.reactions.receive_puncture = ['WHY DOES IT HURT SO BAD'];
    env.COMBAT_ACTORS.geli.reactions.receive_buff = ['}:^)'];
    env.COMBAT_ACTORS.geli.reactions.receive_destabilized = ['WAKING UP AGAIN', 'MEGA BULLET!!'];
    env.COMBAT_ACTORS.geli.reactions.receive_rez = ['NICE 1'];
    env.COMBAT_ACTORS.geli.reactions.puncture = [':('];
    env.COMBAT_ACTORS.geli.reactions.regen = ['doing GOOD', 'ahahaAhaha!!'];
    env.COMBAT_ACTORS.geli.reactions.destabilized = ['WATCH THIS'];
    env.COMBAT_ACTORS.geli.reactions.stun = ['uu382*((U*#*( U('];
    env.COMBAT_ACTORS.geli.reactions.receive_fear = [':O', 'O_O'];

    env.COMBAT_ACTORS.geli.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - bstrd - */

    env.COMBAT_ACTORS.bstrd.name = `BSTRD`;

    env.COMBAT_ACTORS.bstrd.reactions.evade = ['8)', 'IT S0 EASY'];
    env.COMBAT_ACTORS.bstrd.reactions.crit = ['BL4MN!!', 'PoW!!', '>%^)'];
    env.COMBAT_ACTORS.bstrd.reactions.miss = ['SHT', 'almost GOT U'];
    env.COMBAT_ACTORS.bstrd.reactions.dead = ['aeaeu HUrts BAD!!'];
    env.COMBAT_ACTORS.bstrd.reactions.receive_crit = ['YEAOUUCH!!'];
    env.COMBAT_ACTORS.bstrd.reactions.receive_puncture = ['bleedink...', 'GOT BUNCTURE'];
    env.COMBAT_ACTORS.bstrd.reactions.receive_buff = ['TIME 2 GET EM ;}'];
    env.COMBAT_ACTORS.bstrd.reactions.puncture = ['OOUUEU'];
    env.COMBAT_ACTORS.bstrd.reactions.regen = [':)', 'SO BACK'];
    env.COMBAT_ACTORS.bstrd.reactions.stun = ['CANT AIM WTF help'];
    env.COMBAT_ACTORS.bstrd.reactions.receive_fear = ['WTF O_O'];
    env.COMBAT_ACTORS.bstrd.reactions.receive_destabilized = ['WOaoOAw'];
    env.COMBAT_ACTORS.bstrd.reactions.receive_rez = ['AHAHA :^) WE BACK'];
    env.COMBAT_ACTORS.bstrd.reactions.destabilized = ['DOUBLE BULLETS !!'];

    env.COMBAT_ACTORS.bstrd.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - efgy - */

    env.COMBAT_ACTORS.efgy.name = `EFGY`;

    env.COMBAT_ACTORS.efgy.reactions.evade = ['O)', 'COOL BREEZE!! YAY!!'];
    env.COMBAT_ACTORS.efgy.reactions.crit = ['ISABEL LOOK!!', 'BLAMM~!', 'YAYAYAYA'];
    env.COMBAT_ACTORS.efgy.reactions.miss = ['wat!! geli how do i hit them', 'ok i try again?', 'can i redo my turn'];
    env.COMBAT_ACTORS.efgy.reactions.dead = ['waaa!! nooo!'];
    env.COMBAT_ACTORS.efgy.reactions.receive_crit = ['mny PETALS!!'];
    env.COMBAT_ACTORS.efgy.reactions.receive_puncture = ['i dont like this part', 'buncgture'];
    env.COMBAT_ACTORS.efgy.reactions.receive_buff = ['OK I SHOOT BIG NEXT??'];
    env.COMBAT_ACTORS.efgy.reactions.puncture = ['OOUUEU'];
    env.COMBAT_ACTORS.efgy.reactions.regen = ['eheheeeaaahahaha', 'okk!!! yes'];
    env.COMBAT_ACTORS.efgy.reactions.stun = ['the dream is broken!! help!'];
    env.COMBAT_ACTORS.efgy.reactions.receive_fear = ['O'];
    env.COMBAT_ACTORS.efgy.reactions.receive_destabilized = ['WOaoOAw'];
    env.COMBAT_ACTORS.efgy.reactions.receive_rez = ['ÿæÿ'];
    env.COMBAT_ACTORS.efgy.reactions.destabilized = ['DOUBLE BULLETS !!'];

    env.COMBAT_ACTORS.efgy.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - you - */

    env.COMBAT_ACTORS.you.name = `interloper`;

    env.COMBAT_ACTORS.you.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - critta_pawn - */

    env.COMBAT_ACTORS.critta_pawn.name = `WRK`;

    env.COMBAT_ACTORS.critta_pawn.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - critta_knight - */

    env.COMBAT_ACTORS.critta_knight.name = `CLW`;

    env.COMBAT_ACTORS.critta_knight.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - critta_bishop - */

    env.COMBAT_ACTORS.critta_bishop.name = `NET`;

    env.COMBAT_ACTORS.critta_bishop.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - critta_rook - */

    env.COMBAT_ACTORS.critta_rook.name = `ENFC`;

    env.COMBAT_ACTORS.critta_rook.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - critta_queen - */

    env.COMBAT_ACTORS.critta_queen.name = `SEER`;

    env.COMBAT_ACTORS.critta_queen.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - critta_king - */

    env.COMBAT_ACTORS.critta_king.name = `ARCHN`;

    env.COMBAT_ACTORS.critta_king.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - critta_jester - */

    env.COMBAT_ACTORS.critta_jester.name = `DCT`;

    env.COMBAT_ACTORS.critta_jester.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - critta_spawner - */

    env.COMBAT_ACTORS.critta_spawner.name = `SPWN`;

    env.COMBAT_ACTORS.critta_spawner.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - critta_spawner_bee - */

    env.COMBAT_ACTORS.critta_spawner_bee.name = `IDEA`;

    env.COMBAT_ACTORS.critta_spawner_bee.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - critta_impetus - */

    env.COMBAT_ACTORS.critta_impetus.name = `IMP`;

    env.COMBAT_ACTORS.critta_impetus.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - critta_boss - */

    env.COMBAT_ACTORS.critta_boss.name = `Firmament`;

    env.COMBAT_ACTORS.critta_boss.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - critta_boss_boat - */

    env.COMBAT_ACTORS.critta_boss_boat.name = `Firmament`;

    env.COMBAT_ACTORS.critta_boss_boat.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - critta_pawn_boat - */

    env.COMBAT_ACTORS.critta_pawn_boat.name = `WRK`;

    env.COMBAT_ACTORS.critta_pawn_boat.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - critta_knight_boat - */

    env.COMBAT_ACTORS.critta_knight_boat.name = `CLW`;

    env.COMBAT_ACTORS.critta_knight_boat.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - critta_bishop_boat - */

    env.COMBAT_ACTORS.critta_bishop_boat.name = `NET`;

    env.COMBAT_ACTORS.critta_bishop_boat.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - critta_king_boat - */

    env.COMBAT_ACTORS.critta_king_boat.name = `ARCHN`;

    env.COMBAT_ACTORS.critta_king_boat.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - critta_queen_boat - */

    env.COMBAT_ACTORS.critta_queen_boat.name = `SEER`;

    env.COMBAT_ACTORS.critta_queen_boat.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - critta_jester_boat - */

    env.COMBAT_ACTORS.critta_jester_boat.name = `DCT`;

    env.COMBAT_ACTORS.critta_jester_boat.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - falsecritta - */

    env.COMBAT_ACTORS.falsecritta.name = `Antishell`;

    env.COMBAT_ACTORS.falsecritta.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - intrusive - */

    env.COMBAT_ACTORS.intrusive.name = `???`;

    env.COMBAT_ACTORS.intrusive.reactions.evade = ['LD C'];
    env.COMBAT_ACTORS.intrusive.reactions.crit = ['D ML'];
    env.COMBAT_ACTORS.intrusive.reactions.crit_buff = ['BL'];
    env.COMBAT_ACTORS.intrusive.reactions.miss = ['CL'];
    env.COMBAT_ACTORS.intrusive.reactions.dead = ['P N'];
    env.COMBAT_ACTORS.intrusive.reactions.receive_hit = ['IL D'];
    env.COMBAT_ACTORS.intrusive.reactions.receive_crit = ['I LB P'];
    env.COMBAT_ACTORS.intrusive.reactions.receive_puncture = ['I A D'];
    env.COMBAT_ACTORS.intrusive.reactions.receive_buff = ['P BD'];
    env.COMBAT_ACTORS.intrusive.reactions.receive_destabilized = ['S', 'T', 'Q'];
    env.COMBAT_ACTORS.intrusive.reactions.receive_rez = ['U P'];
    env.COMBAT_ACTORS.intrusive.reactions.puncture = ['DL'];
    env.COMBAT_ACTORS.intrusive.reactions.regen = ['DC'];
    env.COMBAT_ACTORS.intrusive.reactions.destabilized = ['S', 'T', 'Q'];
    env.COMBAT_ACTORS.intrusive.reactions.stun = ['NDN'];
    env.COMBAT_ACTORS.intrusive.reactions.receive_carapace = ['E'];
    env.COMBAT_ACTORS.intrusive.reactions.receive_fear = ['I P'];
    env.COMBAT_ACTORS.intrusive.reactions.receive_redirection = ['PDP'];

    env.COMBAT_ACTORS.intrusive.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - intrusive_blocker - */

    env.COMBAT_ACTORS.intrusive_blocker.name = `???`;

    env.COMBAT_ACTORS.intrusive_blocker.reactions.evade = ['LD C'];
    env.COMBAT_ACTORS.intrusive_blocker.reactions.crit = ['D ML'];
    env.COMBAT_ACTORS.intrusive_blocker.reactions.crit_buff = ['BL'];
    env.COMBAT_ACTORS.intrusive_blocker.reactions.miss = ['CL'];
    env.COMBAT_ACTORS.intrusive_blocker.reactions.dead = ['P N'];
    env.COMBAT_ACTORS.intrusive_blocker.reactions.receive_hit = ['IL D'];
    env.COMBAT_ACTORS.intrusive_blocker.reactions.receive_crit = ['I LB P'];
    env.COMBAT_ACTORS.intrusive_blocker.reactions.receive_puncture = ['I A D'];
    env.COMBAT_ACTORS.intrusive_blocker.reactions.receive_buff = ['P BD'];
    env.COMBAT_ACTORS.intrusive_blocker.reactions.receive_destabilized = ['S', 'T', 'Q'];
    env.COMBAT_ACTORS.intrusive_blocker.reactions.receive_rez = ['U P'];
    env.COMBAT_ACTORS.intrusive_blocker.reactions.puncture = ['DL'];
    env.COMBAT_ACTORS.intrusive_blocker.reactions.regen = ['DC'];
    env.COMBAT_ACTORS.intrusive_blocker.reactions.destabilized = ['S', 'T', 'Q'];
    env.COMBAT_ACTORS.intrusive_blocker.reactions.stun = ['NDN'];
    env.COMBAT_ACTORS.intrusive_blocker.reactions.receive_carapace = ['E'];
    env.COMBAT_ACTORS.intrusive_blocker.reactions.receive_fear = ['I P'];
    env.COMBAT_ACTORS.intrusive_blocker.reactions.receive_redirection = ['PDP'];

    env.COMBAT_ACTORS.intrusive_blocker.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - intrusive_archival - */

    env.COMBAT_ACTORS.intrusive_archival.name = `???`;

    env.COMBAT_ACTORS.intrusive_archival.reactions.evade = ['LD C'];
    env.COMBAT_ACTORS.intrusive_archival.reactions.crit = ['D ML'];
    env.COMBAT_ACTORS.intrusive_archival.reactions.crit_buff = ['BL'];
    env.COMBAT_ACTORS.intrusive_archival.reactions.miss = ['CL'];
    env.COMBAT_ACTORS.intrusive_archival.reactions.dead = ['P N'];
    env.COMBAT_ACTORS.intrusive_archival.reactions.receive_hit = ['IL D'];
    env.COMBAT_ACTORS.intrusive_archival.reactions.receive_crit = ['I LB P'];
    env.COMBAT_ACTORS.intrusive_archival.reactions.receive_puncture = ['I A D'];
    env.COMBAT_ACTORS.intrusive_archival.reactions.receive_buff = ['P BD'];
    env.COMBAT_ACTORS.intrusive_archival.reactions.receive_destabilized = ['S', 'T', 'Q'];
    env.COMBAT_ACTORS.intrusive_archival.reactions.receive_rez = ['U P'];
    env.COMBAT_ACTORS.intrusive_archival.reactions.puncture = ['DL'];
    env.COMBAT_ACTORS.intrusive_archival.reactions.regen = ['DC'];
    env.COMBAT_ACTORS.intrusive_archival.reactions.destabilized = ['S', 'T', 'Q'];
    env.COMBAT_ACTORS.intrusive_archival.reactions.stun = ['NDN'];
    env.COMBAT_ACTORS.intrusive_archival.reactions.receive_carapace = ['E'];
    env.COMBAT_ACTORS.intrusive_archival.reactions.receive_fear = ['I P'];
    env.COMBAT_ACTORS.intrusive_archival.reactions.receive_redirection = ['PDP'];

    env.COMBAT_ACTORS.intrusive_archival.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - intrusive_bishopfreak - */

    env.COMBAT_ACTORS.intrusive_bishopfreak.name = `???`;

    env.COMBAT_ACTORS.intrusive_bishopfreak.reactions.evade = ['LD C'];
    env.COMBAT_ACTORS.intrusive_bishopfreak.reactions.crit = ['D ML'];
    env.COMBAT_ACTORS.intrusive_bishopfreak.reactions.crit_buff = ['BL'];
    env.COMBAT_ACTORS.intrusive_bishopfreak.reactions.miss = ['CL'];
    env.COMBAT_ACTORS.intrusive_bishopfreak.reactions.dead = ['P N'];
    env.COMBAT_ACTORS.intrusive_bishopfreak.reactions.receive_hit = ['IL D'];
    env.COMBAT_ACTORS.intrusive_bishopfreak.reactions.receive_crit = ['I LB P'];
    env.COMBAT_ACTORS.intrusive_bishopfreak.reactions.receive_puncture = ['I A D'];
    env.COMBAT_ACTORS.intrusive_bishopfreak.reactions.receive_buff = ['P BD'];
    env.COMBAT_ACTORS.intrusive_bishopfreak.reactions.receive_destabilized = ['S', 'T', 'Q'];
    env.COMBAT_ACTORS.intrusive_bishopfreak.reactions.receive_rez = ['U P'];
    env.COMBAT_ACTORS.intrusive_bishopfreak.reactions.puncture = ['DL'];
    env.COMBAT_ACTORS.intrusive_bishopfreak.reactions.regen = ['DC'];
    env.COMBAT_ACTORS.intrusive_bishopfreak.reactions.destabilized = ['S', 'T', 'Q'];
    env.COMBAT_ACTORS.intrusive_bishopfreak.reactions.stun = ['NDN'];
    env.COMBAT_ACTORS.intrusive_bishopfreak.reactions.receive_carapace = ['E'];
    env.COMBAT_ACTORS.intrusive_bishopfreak.reactions.receive_fear = ['I P'];
    env.COMBAT_ACTORS.intrusive_bishopfreak.reactions.receive_redirection = ['PDP'];

    env.COMBAT_ACTORS.intrusive_bishopfreak.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - intrusive_statusoid - */

    env.COMBAT_ACTORS.intrusive_statusoid.name = `???`;

    env.COMBAT_ACTORS.intrusive_statusoid.reactions.evade = ['LD C'];
    env.COMBAT_ACTORS.intrusive_statusoid.reactions.crit = ['D ML'];
    env.COMBAT_ACTORS.intrusive_statusoid.reactions.crit_buff = ['BL'];
    env.COMBAT_ACTORS.intrusive_statusoid.reactions.miss = ['CL'];
    env.COMBAT_ACTORS.intrusive_statusoid.reactions.dead = ['P N'];
    env.COMBAT_ACTORS.intrusive_statusoid.reactions.receive_hit = ['IL D'];
    env.COMBAT_ACTORS.intrusive_statusoid.reactions.receive_crit = ['I LB P'];
    env.COMBAT_ACTORS.intrusive_statusoid.reactions.receive_puncture = ['I A D'];
    env.COMBAT_ACTORS.intrusive_statusoid.reactions.receive_buff = ['P BD'];
    env.COMBAT_ACTORS.intrusive_statusoid.reactions.receive_destabilized = ['S', 'T', 'Q'];
    env.COMBAT_ACTORS.intrusive_statusoid.reactions.receive_rez = ['U P'];
    env.COMBAT_ACTORS.intrusive_statusoid.reactions.puncture = ['DL'];
    env.COMBAT_ACTORS.intrusive_statusoid.reactions.regen = ['DC'];
    env.COMBAT_ACTORS.intrusive_statusoid.reactions.destabilized = ['S', 'T', 'Q'];
    env.COMBAT_ACTORS.intrusive_statusoid.reactions.stun = ['NDN'];
    env.COMBAT_ACTORS.intrusive_statusoid.reactions.receive_carapace = ['E'];
    env.COMBAT_ACTORS.intrusive_statusoid.reactions.receive_fear = ['I P'];
    env.COMBAT_ACTORS.intrusive_statusoid.reactions.receive_redirection = ['PDP'];

    env.COMBAT_ACTORS.intrusive_statusoid.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - intrusive_bomblet - */

    env.COMBAT_ACTORS.intrusive_bomblet.name = `???`;

    env.COMBAT_ACTORS.intrusive_bomblet.reactions.evade = ['LD C'];
    env.COMBAT_ACTORS.intrusive_bomblet.reactions.crit = ['D ML'];
    env.COMBAT_ACTORS.intrusive_bomblet.reactions.crit_buff = ['BL'];
    env.COMBAT_ACTORS.intrusive_bomblet.reactions.miss = ['CL'];
    env.COMBAT_ACTORS.intrusive_bomblet.reactions.dead = ['P N'];
    env.COMBAT_ACTORS.intrusive_bomblet.reactions.receive_hit = ['IL D'];
    env.COMBAT_ACTORS.intrusive_bomblet.reactions.receive_crit = ['I LB P'];
    env.COMBAT_ACTORS.intrusive_bomblet.reactions.receive_puncture = ['I A D'];
    env.COMBAT_ACTORS.intrusive_bomblet.reactions.receive_buff = ['P BD'];
    env.COMBAT_ACTORS.intrusive_bomblet.reactions.receive_destabilized = ['S', 'T', 'Q'];
    env.COMBAT_ACTORS.intrusive_bomblet.reactions.receive_rez = ['U P'];
    env.COMBAT_ACTORS.intrusive_bomblet.reactions.puncture = ['DL'];
    env.COMBAT_ACTORS.intrusive_bomblet.reactions.regen = ['DC'];
    env.COMBAT_ACTORS.intrusive_bomblet.reactions.destabilized = ['S', 'T', 'Q'];
    env.COMBAT_ACTORS.intrusive_bomblet.reactions.stun = ['NDN'];
    env.COMBAT_ACTORS.intrusive_bomblet.reactions.receive_carapace = ['E'];
    env.COMBAT_ACTORS.intrusive_bomblet.reactions.receive_fear = ['I P'];
    env.COMBAT_ACTORS.intrusive_bomblet.reactions.receive_redirection = ['PDP'];

    env.COMBAT_ACTORS.intrusive_bomblet.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - sandboxer - */

    env.COMBAT_ACTORS.sandboxer.name = `sandbox`;

    env.COMBAT_ACTORS.sandboxer.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - cutscenedriver - */

    env.COMBAT_ACTORS.cutscenedriver.name = `idiot`;

    env.COMBAT_ACTORS.cutscenedriver.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - arch_dummy - */

    env.COMBAT_ACTORS.arch_dummy.name = `idiot`;

    env.COMBAT_ACTORS.arch_dummy.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - arch_formless - */

    env.COMBAT_ACTORS.arch_formless.name = `Mass`;

    env.COMBAT_ACTORS.arch_formless.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - arch_formless_enraged - */

    env.COMBAT_ACTORS.arch_formless_enraged.name = `Enraged`;

    env.COMBAT_ACTORS.arch_formless_enraged.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - arch_puncher_tutorial - */

    env.COMBAT_ACTORS.arch_puncher_tutorial.name = `Figure`;

    env.COMBAT_ACTORS.arch_puncher_tutorial.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - arch_puncher - */

    env.COMBAT_ACTORS.arch_puncher.name = `Figure`;

    env.COMBAT_ACTORS.arch_puncher.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - arch_harasser - */

    env.COMBAT_ACTORS.arch_harasser.name = `Attendant`;

    env.COMBAT_ACTORS.arch_harasser.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - arch_sniper - */

    env.COMBAT_ACTORS.arch_sniper.name = `Attendant`;

    env.COMBAT_ACTORS.arch_sniper.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - arch_bomber - */

    env.COMBAT_ACTORS.arch_bomber.name = `Shape`;

    env.COMBAT_ACTORS.arch_bomber.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - arch_channeler - */

    env.COMBAT_ACTORS.arch_channeler.name = `Glazika`;

    env.COMBAT_ACTORS.arch_channeler.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - arch_charger - */

    env.COMBAT_ACTORS.arch_charger.name = `Horror`;

    env.COMBAT_ACTORS.arch_charger.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - arch_puller - */

    env.COMBAT_ACTORS.arch_puller.name = `Golem`;

    env.COMBAT_ACTORS.arch_puller.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - arch_support - */

    env.COMBAT_ACTORS.arch_support.name = `Jutskin`;

    env.COMBAT_ACTORS.arch_support.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - destructible_table - */

    env.COMBAT_ACTORS.destructible_table.name = `Display`;

    env.COMBAT_ACTORS.destructible_table.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - destructible_adull - */

    env.COMBAT_ACTORS.destructible_adull.name = `Altar`;

    env.COMBAT_ACTORS.destructible_adull.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - destructible_minishelf - */

    env.COMBAT_ACTORS.destructible_minishelf.name = `Pillar`;

    env.COMBAT_ACTORS.destructible_minishelf.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - destructible_volatile - */

    env.COMBAT_ACTORS.destructible_volatile.name = `Chemicals`;

    env.COMBAT_ACTORS.destructible_volatile.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - destructible_box - */

    env.COMBAT_ACTORS.destructible_box.name = `Container`;

    env.COMBAT_ACTORS.destructible_box.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - destructible_blockage - */

    env.COMBAT_ACTORS.destructible_blockage.name = `Blockage`;

    env.COMBAT_ACTORS.destructible_blockage.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - destructible_bomb - */

    env.COMBAT_ACTORS.destructible_bomb.name = `Rift`;

    env.COMBAT_ACTORS.destructible_bomb.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - rift_item - */

    env.COMBAT_ACTORS.rift_item.name = `Material Rift`;

    env.COMBAT_ACTORS.rift_item.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - vekoa_boss - */

    env.COMBAT_ACTORS.vekoa_boss.name = `???`;

    env.COMBAT_ACTORS.vekoa_boss.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.vekoa_boss.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.vekoa_boss.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - spine_archivist - */

    env.COMBAT_ACTORS.spine_archivist.name = `Archivist`;

    env.COMBAT_ACTORS.spine_archivist.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - spine_archivist_ing - */

    env.COMBAT_ACTORS.spine_archivist_ing.name = `Archivist`;

    env.COMBAT_ACTORS.spine_archivist_ing.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - spine_keeper - */

    env.COMBAT_ACTORS.spine_keeper.name = `Keeper`;

    env.COMBAT_ACTORS.spine_keeper.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - spine_keeper_ing - */

    env.COMBAT_ACTORS.spine_keeper_ing.name = `Keeper`;

    env.COMBAT_ACTORS.spine_keeper_ing.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - heart_parasite_old - */

    env.COMBAT_ACTORS.heart_parasite_old.name = `Parasite`;

    env.COMBAT_ACTORS.heart_parasite_old.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - heart_parasite - */

    env.COMBAT_ACTORS.heart_parasite.name = `Parasite`;

    env.COMBAT_ACTORS.heart_parasite.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - heart_tendril - */

    env.COMBAT_ACTORS.heart_tendril.name = `Tendril`;

    env.COMBAT_ACTORS.heart_tendril.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - heart_tendril_lesser - */

    env.COMBAT_ACTORS.heart_tendril_lesser.name = `Tendril`;

    env.COMBAT_ACTORS.heart_tendril_lesser.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - heart_siphon - */

    env.COMBAT_ACTORS.heart_siphon.name = `Siphon`;

    env.COMBAT_ACTORS.heart_siphon.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - destructible_heart_wall_inner - */

    env.COMBAT_ACTORS.destructible_heart_wall_inner.name = `Membrane`;

    env.COMBAT_ACTORS.destructible_heart_wall_inner.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - destructible_heart_wall_outer - */

    env.COMBAT_ACTORS.destructible_heart_wall_outer.name = `Membrane`;

    env.COMBAT_ACTORS.destructible_heart_wall_outer.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - destructible_heart_wall - */

    env.COMBAT_ACTORS.destructible_heart_wall.name = `Tendril`;

    env.COMBAT_ACTORS.destructible_heart_wall.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - destructible_split_tendril_1 - */

    env.COMBAT_ACTORS.destructible_split_tendril_1.name = `Interfering Tendril`;

    env.COMBAT_ACTORS.destructible_split_tendril_1.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - destructible_split_tendril_2 - */

    env.COMBAT_ACTORS.destructible_split_tendril_2.name = `Interfering Tendril`;

    env.COMBAT_ACTORS.destructible_split_tendril_2.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - split_eye - */

    env.COMBAT_ACTORS.split_eye.name = `Eye`;

    env.COMBAT_ACTORS.split_eye.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - split_miltza - */

    env.COMBAT_ACTORS.split_miltza.name = `Miltza?`;

    env.COMBAT_ACTORS.split_miltza.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - destructible_spineroot - */

    env.COMBAT_ACTORS.destructible_spineroot.name = `Root`;

    env.COMBAT_ACTORS.destructible_spineroot.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - lesser_itzil - */

    env.COMBAT_ACTORS.lesser_itzil.name = `Golem`;

    env.COMBAT_ACTORS.lesser_itzil.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - lesser_kivii - */

    env.COMBAT_ACTORS.lesser_kivii.name = `Kiv`;

    env.COMBAT_ACTORS.lesser_kivii.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - lesser_itzka - */

    env.COMBAT_ACTORS.lesser_itzka.name = `???`;

    env.COMBAT_ACTORS.lesser_itzka.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - lesser_itzil_ing - */

    env.COMBAT_ACTORS.lesser_itzil_ing.name = `Golem`;

    env.COMBAT_ACTORS.lesser_itzil_ing.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - lesser_kivii_ing - */

    env.COMBAT_ACTORS.lesser_kivii_ing.name = `Kiv`;

    env.COMBAT_ACTORS.lesser_kivii_ing.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - lesser_kivii_gauntlet - */

    env.COMBAT_ACTORS.lesser_kivii_gauntlet.name = `Gauntlet`;

    env.COMBAT_ACTORS.lesser_kivii_gauntlet.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - lesser_itzka_ing - */

    env.COMBAT_ACTORS.lesser_itzka_ing.name = `???`;

    env.COMBAT_ACTORS.lesser_itzka_ing.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - destructible_lesserpod - */

    env.COMBAT_ACTORS.destructible_lesserpod.name = `Pod`;

    env.COMBAT_ACTORS.destructible_lesserpod.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - destructible_lesserpod_debris - */

    env.COMBAT_ACTORS.destructible_lesserpod_debris.name = `Shard`;

    env.COMBAT_ACTORS.destructible_lesserpod_debris.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - finale_eye - */

    env.COMBAT_ACTORS.finale_eye.name = `ceremony`;

    env.COMBAT_ACTORS.finale_eye.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - finale_eyebeam - */

    env.COMBAT_ACTORS.finale_eyebeam.name = `Gaze`;

    env.COMBAT_ACTORS.finale_eyebeam.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - vekqou_guard - */

    env.COMBAT_ACTORS.vekqou_guard.name = `Kiv`;

    env.COMBAT_ACTORS.vekqou_guard.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - vekqou_stabber - */

    env.COMBAT_ACTORS.vekqou_stabber.name = `Vel`;

    env.COMBAT_ACTORS.vekqou_stabber.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - vekqou_support - */

    env.COMBAT_ACTORS.vekqou_support.name = `Jut`;

    env.COMBAT_ACTORS.vekqou_support.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - vekoa_1v1 - */

    env.COMBAT_ACTORS.vekoa_1v1.name = `Vekoa`;

    env.COMBAT_ACTORS.vekoa_1v1.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - vekoa_eye - */

    env.COMBAT_ACTORS.vekoa_eye.name = `ceremony`;

    env.COMBAT_ACTORS.vekoa_eye.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - vekoa_1v1_ing - */

    env.COMBAT_ACTORS.vekoa_1v1_ing.name = `Vekoa`;

    env.COMBAT_ACTORS.vekoa_1v1_ing.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - vekoa_eye_ing - */

    env.COMBAT_ACTORS.vekoa_eye_ing.name = `ceremony`;

    env.COMBAT_ACTORS.vekoa_eye_ing.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - destructible_split_tendril_3 - */

    env.COMBAT_ACTORS.destructible_split_tendril_3.name = `Interfering Tendril`;

    env.COMBAT_ACTORS.destructible_split_tendril_3.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - destructible_split_tendril_4 - */

    env.COMBAT_ACTORS.destructible_split_tendril_4.name = `Interfering Tendril`;

    env.COMBAT_ACTORS.destructible_split_tendril_4.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - vekoa_epicenter_projectile - */

    env.COMBAT_ACTORS.vekoa_epicenter_projectile.name = `epicenter`;

    env.COMBAT_ACTORS.vekoa_epicenter_projectile.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - destructible_epicenter_vein - */

    env.COMBAT_ACTORS.destructible_epicenter_vein.name = `Veins`;

    env.COMBAT_ACTORS.destructible_epicenter_vein.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - vekoa_golem - */

    env.COMBAT_ACTORS.vekoa_golem.name = `Golem`;

    env.COMBAT_ACTORS.vekoa_golem.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - vekoa_wall - */

    env.COMBAT_ACTORS.vekoa_wall.name = `Wall`;

    env.COMBAT_ACTORS.vekoa_wall.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - vekoa_wall_tendril - */

    env.COMBAT_ACTORS.vekoa_wall_tendril.name = `Tendril`;

    env.COMBAT_ACTORS.vekoa_wall_tendril.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - ceremony_tendril_plus - */

    env.COMBAT_ACTORS.ceremony_tendril_plus.name = `Vein`;

    env.COMBAT_ACTORS.ceremony_tendril_plus.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - destructible_spine_wall - */

    env.COMBAT_ACTORS.destructible_spine_wall.name = `Blockage`;

    env.COMBAT_ACTORS.destructible_spine_wall.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - destructible_split_wall - */

    env.COMBAT_ACTORS.destructible_split_wall.name = `Blockage`;

    env.COMBAT_ACTORS.destructible_split_wall.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - split_advancer - */

    env.COMBAT_ACTORS.split_advancer.name = `???`;

    env.COMBAT_ACTORS.split_advancer.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - vekqou_archivist - */

    env.COMBAT_ACTORS.vekqou_archivist.name = `Archivist`;

    env.COMBAT_ACTORS.vekqou_archivist.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - lookertest - */

    env.COMBAT_ACTORS.lookertest.name = `Container`;

    env.COMBAT_ACTORS.lookertest.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - destructible_spine_wall_1 - */

    env.COMBAT_ACTORS.destructible_spine_wall_1.name = `Blockage`;

    env.COMBAT_ACTORS.destructible_spine_wall_1.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - destructible_spine_wall_2 - */

    env.COMBAT_ACTORS.destructible_spine_wall_2.name = `Blockage`;

    env.COMBAT_ACTORS.destructible_spine_wall_2.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - destructible_spine_wall_3 - */

    env.COMBAT_ACTORS.destructible_spine_wall_3.name = `Blockage`;

    env.COMBAT_ACTORS.destructible_spine_wall_3.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - ceremony_tendril_plus_split - */

    env.COMBAT_ACTORS.ceremony_tendril_plus_split.name = `Vein`;

    env.COMBAT_ACTORS.ceremony_tendril_plus_split.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - personnel_veilklight_frame - */

    env.COMBAT_ACTORS.personnel_veilklight_frame.name = `Veilklight`;

    env.COMBAT_ACTORS.personnel_veilklight_frame.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.personnel_veilklight_frame.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.personnel_veilklight_frame.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - personnel_attendant_frame - */

    env.COMBAT_ACTORS.personnel_attendant_frame.name = `Spire Attendant`;

    env.COMBAT_ACTORS.personnel_attendant_frame.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.personnel_attendant_frame.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.personnel_attendant_frame.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - kivskin_frame - */

    env.COMBAT_ACTORS.kivskin_frame.name = `Kivskin`;

    env.COMBAT_ACTORS.kivskin_frame.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.kivskin_frame.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.kivskin_frame.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - maintcloak_frame - */

    env.COMBAT_ACTORS.maintcloak_frame.name = `Jutskin`;

    env.COMBAT_ACTORS.maintcloak_frame.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.maintcloak_frame.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.maintcloak_frame.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - archival_golem_frame - */

    env.COMBAT_ACTORS.archival_golem_frame.name = `Archival Golem`;

    env.COMBAT_ACTORS.archival_golem_frame.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - movefoe_frame - */

    env.COMBAT_ACTORS.movefoe_frame.name = `Movefoe`;

    env.COMBAT_ACTORS.movefoe_frame.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - movefoe_tendrils_frame - */

    env.COMBAT_ACTORS.movefoe_tendrils_frame.name = `Tendril`;

    env.COMBAT_ACTORS.movefoe_tendrils_frame.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - husk_guard_frame - */

    env.COMBAT_ACTORS.husk_guard_frame.name = `Tari`;

    env.COMBAT_ACTORS.husk_guard_frame.reactions.evade = ['s tŒ¥ó y  aw œ y', 'n o  c l os er', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard_frame.reactions.crit = ['Ü di¢ö1€Oe Î', 'R E TU RN', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard_frame.reactions.receive_crit = ['hu r ts', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard_frame.reactions.receive_puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard_frame.reactions.puncture = ['h¿(‰n g er', 'e}vªer ytíh&i ng', '%ÿoÛÙ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard_frame.reactions.receive_buff = ['µÿÁiKp%Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard_frame.reactions.receive_destabilized = ['âª¥lé§ÎéýÁ', 'dÆis co ne ct', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard_frame.reactions.receive_vulnerable = ['ƒøÊ=è¶', 's e e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard_frame.reactions.receive_carapace = ['MËºY¾Ñ', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard_frame.reactions.receive_redirection = ['f ina l ly aw  ake', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard_frame.reactions.stun = ['o u  t ou t o ut', 'ou to u t o  ut', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard_frame.reactions.regen = ['m y f  le sh', 'cl o½ se ®±… r', 'm¿ ó+r  e', '', '', '', '', '', ''];
    env.COMBAT_ACTORS.husk_guard_frame.reactions.give_fear = ['cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De', 'ÐⱤ0 Ø Ⱳƞ ', '§±ÂⱤ ṾḮɲG─', 'YºŮ ɃěC ‰ Ṃể', 'šøừ Ɍ€cɇ hȩḸ─lƥ', 'ḧỂḺᵽ', 'ḧỂḺᵽ YºŮ', 'ⱤEMŒM BEɌ', '', '', '', '', '', ''];

    env.COMBAT_ACTORS.husk_guard_frame.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - foundation_golem_frame - */

    env.COMBAT_ACTORS.foundation_golem_frame.name = `Foundation Golem`;

    env.COMBAT_ACTORS.foundation_golem_frame.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.foundation_golem_frame.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.foundation_golem_frame.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - constructor_boss_frame - */

    env.COMBAT_ACTORS.constructor_boss_frame.name = `Constructor`;

    env.COMBAT_ACTORS.constructor_boss_frame.reactions.catchall = ['1Uië2W‡', '‡eÎKßJää', '/…¿?÷ ôLãØ', 'C©Ë', '0E™Nó¨ýQÒ', '€LWé{ðÍ', 'ÇæýÙ‡ß†C', '£~Uþfâ', '…Tú**'];
    env.COMBAT_ACTORS.constructor_boss_frame.reactions.dead = ['¿', '???'];

    env.COMBAT_ACTORS.constructor_boss_frame.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - constructor_vat_frame - */

    env.COMBAT_ACTORS.constructor_vat_frame.name = `Vat`;

    env.COMBAT_ACTORS.constructor_vat_frame.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }


    /* - translation_golem_frame - */

    env.COMBAT_ACTORS.translation_golem_frame.name = `Translation Core`;

    env.COMBAT_ACTORS.translation_golem_frame.reactions.catchall = ['████ ███', '██ ██████', '█████ ████', '███', '███ ███ ███', '███ █ ████', '██████ ██', '█ ████', '████ █ █ █'];
    env.COMBAT_ACTORS.translation_golem_frame.reactions.dead = ['███ █ █ █ ███'];

    env.COMBAT_ACTORS.translation_golem_frame.cor_ru = {
        name: {
            gen: "",
            dat: "",
            acc: "",
            ins: "",
            pre: ""
        },
        gender: 0
    }
}

// === CSS === //
cor_ru.combat['css'] = `
.actor:not(.dead):not(.last-stand) .hp:after, .actor:not(.dead):not(.last-stand) .hp::after {
    content: "HP" !important;
}
.statuses .status-count::after {
    content: "T)" !important;
}
.actor.last-stand .hp::after {
    content: "!!last stand!!" !important;
}  
.actor.last-stand.inactive-stand .hp::after {
    content: "!!inactive!!" !important;
}
.target-nevermind::after {
    content: "(RMB)" !important;
}
.targeting .targetable.status-counter:not(.status-stun) .clickbox::before {
    content: "!!COUNTERING!!" !important;
}
#combat.unshifted .message-actions .first-minimizable::after {
    content: "NOTE::'full detail in log'" !important;
}
.effectline.bstrdaim::before {
    content: "WATCH OUT!!" !important;
}
.partymember-akizet.draggable-mirror::after {
    content: "AKIZET MUST REMAIN IN ACTIVE PARTY" !important;
}
.partymember-hp::after {
    content: "HP" !important;
}
.partymember-action.windup-action::before {
    content: ":W" !important;
}
.party-title::after {
    content: "OBESK EQUIPPED WITH TIMESTOPPERS\A DRAG TO ALTER ORDER" !important;
}
.party-title.party-inactive::after {
    content: "OBESK ON THE SIDELINES\A CLICK & DRAG OVER ACTIVE MEMBER TO SWAP" !important;
}
.equipment-menu:empty::before {
    content: "NO EQUIPMENT AVAILABLE" !important;
}
.equipment-option-image.pending-image::after {
    content: "visual damaged" !important;
}
.item-portrait.pending-image::after {
    content: "VISUAL RECONSTRUCTION PENDING" !important;
}
.item-ic::before {
    content: '::IN COMBAT::' !important;
}
.item-ooc::before {
    content: "::IN PEACE::" !important;
}
.item-ic.item-eq::before {
    content: '::COMBAT EFFECT::' !important;
}
.item-eq-action::before {
    content: 'GRANTS ACTION::' !important;
}
.freeposition-box:hover::before {
    content: "DRAG" !important;
}
.draghighlight .freeposition-box::after {
    content: "v drag v" !important;
}
.actiondef-stats .actiondef-stat[info="target"]:before {
    content: "TARGET::" !important;
}
.actiondef-stats .actiondef-stat[info="acc"]:before {
    content: "ACC::" !important;
}
.actiondef-stats .actiondef-stat[info="crit"]:before {
    content: "CRIT::" !important;
}
#readout .action-main[definition]::after {
    content: "ACTION DETAIL" !important;
}
.action-hit.miss::before {
    content: "miss" !important;
}
.action-hit.hit::before {
    content: "hit " !important;
}
.action-hit.crit::before{
    content: "crit" !important;
}
.action-hit-count::before {
    content: "(x" !important;
}
.action-hit-count::after {
    content: " hits)" !important;
}
.action-hit.crit .action-hit-count::after {
    content: " crits)" !important;
}
.actiondef-onhit::before, 
.actiondef-oncrit::before,
.actiondef-onuse::before {
    content: "HIT::" !important;
}
.actiondef-oncrit::before {
    content: "CRIT::" !important;
}
.actiondef-onuse::before {
    content: "USE::" !important;
}
.actiondef-statuses.hasshiftdetail::before {
    content: "NOTE::'hold shift for detail'" !important;
}
.actiondef-status.passive::after {
    content: "PASSIVE" !important;
}
.actiondef-status.impulse::after {
    content: "IMPULSE" !important;
}
#objectives::before {
    content: "!!__OBJECTIVES__!!" !important;
}
#objectives .toggle::before {
    content: "TOGGLE OBJECTIVES" !important;
}
.actiondef-modification::after {
    content: "::'modified by status'" !important;
}
.readout-log .message.sourceless.combat:not(.minordetail)::before {
    content: "::EXECUTION PROCEEDING::" !important;
}
.predstat::before[stat="hit"] {
    content: "HIT::" !important;
}
.predstat::before[stat="crit"] {
    content: "CRIT::" !important;
}
.predstat::before[stat="mod"] {
    content: "MOD::" !important;
}
`

// === MISC === //
cor_ru.combat['redefineAll'] = function () {
    cor_ru.combat.redefineActions()
    cor_ru.combat.redefineEffects()
    cor_ru.combat.redefineItems()
    cor_ru.combat.redefineStats()
    cor_ru.combat.redefineActors()
}
// --- safeguards for combat, this is needed so that no technical components get accidentally localized and output an invalid definition
Object.assign(env.localization.strings, {
    "effect-message": "effect-message",
    "message-actions": "message-actions",

    "win": "win",
    "nothing": "nothing",
    "cower": "cower",
    "truly_nothing": "truly_nothing",
    "evade": "evade",
    "skitter": "skitter",
    "malfunction": "malfunction",
    "attack": "attack",
    "akizet_attack": "akizet_attack",
    "eviscerate": "eviscerate",
    "stab": "stab",
    "frenzy": "frenzy",
    "gakvu_attack": "gakvu_attack",
    "countercall": "countercall",
    "destabilize": "destabilize",
    "tozik_attack": "tozik_attack",
    "parasite": "parasite",
    "parasite_item": "parasite_item",
    "mend": "mend",
    "newmend": "newmend",
    "newmend_mega": "newmend_mega",
    "optimize": "optimize",
    "miltza_attack": "miltza_attack",
    "miltza_attack_evil": "miltza_attack_evil",
    "direction": "direction",
    "distraction": "distraction",
    "spy": "spy",
    "ultra_spy": "ultra_spy",
    "subvert": "subvert",
    "spy_analyze": "spy_analyze",
    "spy_target": "spy_target",
    "drone_strike": "drone_strike",
    "cavik_attack": "cavik_attack",
    "cavik_attack_disruption": "cavik_attack_disruption",
    "cavik_charge": "cavik_charge",
    "bazruka": "bazruka",
    "bozko_attack": "bozko_attack",
    "cripple": "cripple",
    "guard": "guard",
    "guard_weak": "guard_weak",
    "special_guard_all": "special_guard_all",
    "special_guard_all_bonus": "special_guard_all_bonus",
    "shell": "shell",
    "brawl_weak": "brawl_weak",
    "brawl": "brawl",
    "ik_attack": "ik_attack",
    "dullflare": "dullflare",
    "ik_attack_st": "ik_attack_st",
    "dullflare_st": "dullflare_st",
    "swipe": "swipe",
    "disabler_pulse": "disabler_pulse",
    "foe_stab": "foe_stab",
    "barrier": "barrier",
    "special_limited_carapace": "special_limited_carapace",
    "enemy_shell": "enemy_shell",
    "restore": "restore",
    "special_spy_all": "special_spy_all",
    "special_attack_all": "special_attack_all",
    "special_barrier_allies": "special_barrier_allies",
    "special_strong_barrier_allies": "special_strong_barrier_allies",
    "special_restorative_barrier": "special_restorative_barrier",
    "incoherent_gundown": "incoherent_gundown",
    "special_fullauto": "special_fullauto",
    "special_fullauto_player": "special_fullauto_player",
    "movefriend_attack": "movefriend_attack",
    "special_mass_destabilize": "special_mass_destabilize",
    "special_movefriend_annihilate": "special_movefriend_annihilate",
    "incoherent_movefriend": "incoherent_movefriend",
    "windup": "windup",
    "windup_cover": "windup_cover",
    "ik_windup": "ik_windup",
    "focused_windup": "focused_windup",
    "hold_aim": "hold_aim",
    "archival_smash": "archival_smash",
    "kivii_grasp": "kivii_grasp",
    "rez": "rez",
    "husk_attack": "husk_attack",
    "husk_attack_weak": "husk_attack_weak",
    "speak": "speak",
    "berserk": "berserk",
    "special_self_destruct": "special_self_destruct",
    "special_dullsummon": "special_dullsummon",
    "special_dullbuff": "special_dullbuff",
    "special_chant": "special_chant",
    "incoherent_golemboss": "incoherent_golemboss",
    "golemboss_dullflare": "golemboss_dullflare",
    "special_steerleft": "special_steerleft",
    "special_steerright": "special_steerright",
    "special_floorit": "special_floorit",
    "sidearm": "sidearm",
    "unfocused_shot": "unfocused_shot",
    "focused_shot": "focused_shot",
    "primary": "primary",
    "secondary": "secondary",
    "daze_lastresort": "daze_lastresort",
    "daze_good": "daze_good",
    "sacrifice": "sacrifice",
    "special_final_sacrifice": "special_final_sacrifice",
    "sacrifice_restore": "sacrifice_restore",
    "ichor_passive_restore": "ichor_passive_restore",
    "surge": "surge",
    "wild_surge": "wild_surge",
    "exploit": "exploit",
    "coordination": "coordination",
    "plot": "plot",
    "special_enact": "special_enact",
    "special_fullauto_item": "special_fullauto_item",
    "scene_fullauto_item": "scene_fullauto_item",
    "fullauto_item_shot": "fullauto_item_shot",
    "fullauto_item_shot_scene": "fullauto_item_shot_scene",
    "mad_claw": "mad_claw",
    "revise": "revise",
    "bone_break": "bone_break",
    "special_invite_storm": "special_invite_storm",
    "special_invoke_madness": "special_invoke_madness",
    "special_inversion": "special_inversion",
    "attack_weak": "attack_weak",
    "enforce": "enforce",
    "focused_guard": "focused_guard",
    "spikes": "spikes",
    "multiply_spikes": "multiply_spikes",
    "siphon": "siphon",
    "bite": "bite",
    "empower": "empower",
    "distraction_weak": "distraction_weak",
    "lesser_wound": "lesser_wound",
    "wound": "wound",
    "wound_lastresort": "wound_lastresort",
    "special_barrier_allies_weak": "special_barrier_allies_weak",
    "special_carapace_allies": "special_carapace_allies",
    "special_judgement": "special_judgement",
    "special_rule": "special_rule",
    "special_chant_mega": "special_chant_mega",
    "husk_attack_rot": "husk_attack_rot",
    "special_sillyspawn": "special_sillyspawn",
    "special_sillybuff": "special_sillybuff",
    "special_wallspawn": "special_wallspawn",
    "special_wallspawn_boat": "special_wallspawn_boat",
    "boat_clw_windup": "boat_clw_windup",
    "special_boat_clw_grab": "special_boat_clw_grab",
    "special_boat_waveattack": "special_boat_waveattack",
    "special_malware_drill": "special_malware_drill",
    "special_malware_rot": "special_malware_rot",
    "special_malware_rewrite": "special_malware_rewrite",
    "special_malware_empower": "special_malware_empower",
    "intrusive_smash": "intrusive_smash",
    "special_intrusive": "special_intrusive",
    "special_intrusive_ally": "special_intrusive_ally",
    "detonate": "detonate",
    "incoherent_mimic": "incoherent_mimic",
    "bomb_plant": "bomb_plant",
    "special_bomb_detonate": "special_bomb_detonate",
    "special_bomb_detonate_victim": "special_bomb_detonate_victim",
    "scene_evade": "scene_evade",
    "scene_akizet_attack": "scene_akizet_attack",
    "scene_frenzy": "scene_frenzy",
    "scene_gakvu_attack": "scene_gakvu_attack",
    "scene_parasite": "scene_parasite",
    "scene_mend": "scene_mend",
    "scene_spy": "scene_spy",
    "scene_miltza_direction": "scene_miltza_direction",
    "scene_bozko_attack": "scene_bozko_attack",
    "scene_guard": "scene_guard",
    "scene_frontline": "scene_frontline",
    "scene_pull": "scene_pull",
    "scene_cavik_attack": "scene_cavik_attack",
    "scene_kavruka": "scene_kavruka",
    "scene_miltza_attack": "scene_miltza_attack",
    "scene_dullflare": "scene_dullflare",
    "scene_satik": "scene_satik",
    "scene_arm_rifle": "scene_arm_rifle",
    "scene_rifle": "scene_rifle",
    "arch_whelm": "arch_whelm",
    "special_arch_support": "special_arch_support",
    "special_arch_harasser_stab": "special_arch_harasser_stab",
    "arch_harasser_stab": "arch_harasser_stab",
    "arch_punch": "arch_punch",
    "arch_punch_weak": "arch_punch_weak",
    "arch_bomb": "arch_bomb",
    "arch_bomb_spawn": "arch_bomb_spawn",
    "arch_bomb_spawn_double": "arch_bomb_spawn_double",
    "arch_bomb_hit": "arch_bomb_hit",
    "special_arch_tele_channel": "special_arch_tele_channel",
    "special_arch_tele_sniper": "special_arch_tele_sniper",
    "arch_tele_snipe_setup": "arch_tele_snipe_setup",
    "arch_tele_snipe": "arch_tele_snipe",
    "arch_tele_sweep": "arch_tele_sweep",
    "tele_arch_hulk_rampage": "tele_arch_hulk_rampage",
    "arch_hulk_rampage": "arch_hulk_rampage",
    "arch_pull": "arch_pull",
    "arch_supportdash": "arch_supportdash",
    "special_archivist": "special_archivist",
    "special_archivist_spawn": "special_archivist_spawn",
    "special_archivist_maintain": "special_archivist_maintain",
    "special_archivist_defense": "special_archivist_defense",
    "special_archivist_raise": "special_archivist_raise",
    "special_archivist_ing": "special_archivist_ing",
    "special_spine_acquisition": "special_spine_acquisition",
    "archivist_manipulate": "archivist_manipulate",
    "archivist_lunge": "archivist_lunge",
    "archivist_sweep": "archivist_sweep",
    "tele_archivist_rampage": "tele_archivist_rampage",
    "archivist_charge": "archivist_charge",
    "miltza_charge": "miltza_charge",
    "special_miltza_spy": "special_miltza_spy",
    "lastresort_split_jump": "lastresort_split_jump",
    "spine_golem_lunge": "spine_golem_lunge",
    "opportunity": "opportunity",
    "opportunity_archivist": "opportunity_archivist",
    "spine_golem_jab": "spine_golem_jab",
    "special_tele_splitbeam": "special_tele_splitbeam",
    "splitbeam_hit": "splitbeam_hit",
    "special_heart_parasite_old": "special_heart_parasite_old",
    "special_heart_parasite": "special_heart_parasite",
    "heart_tendril_pull": "heart_tendril_pull",
    "heart_tendril_swipe": "heart_tendril_swipe",
    "tele_heart_tendril_square": "tele_heart_tendril_square",
    "tele_heart_tendril_plus": "tele_heart_tendril_plus",
    "tele_heart_siphon": "tele_heart_siphon",
    "special_heart_siphon": "special_heart_siphon",
    "special_heartwall": "special_heartwall",
    "special_split_advancer": "special_split_advancer",
    "formless_pull": "formless_pull",
    "special_dozka_knock": "special_dozka_knock",
    "itzil_split": "itzil_split",
    "tele_veilksplitter": "tele_veilksplitter",
    "tele_dullpulse": "tele_dullpulse",
    "special_tele_itzil": "special_tele_itzil",
    "special_tele_kivii": "special_tele_kivii",
    "special_kivii_summon": "special_kivii_summon",
    "scene_kivii_punch": "scene_kivii_punch",
    "scene_kivii_smash": "scene_kivii_smash",
    "special_itzka": "special_itzka",
    "scene_bozko_attack_desperation": "scene_bozko_attack_desperation",
    "scene_cavik_attack_desperation": "scene_cavik_attack_desperation",
    "scene_gakvu_attack_desperation": "scene_gakvu_attack_desperation",
    "tele_directbeam": "tele_directbeam",
    "special_eye_pt1": "special_eye_pt1",
    "special_vekoa_rush_ing": "special_vekoa_rush_ing",
    "special_eye": "special_eye",
    "tele_tendril_swipe": "tele_tendril_swipe",
    "special_tendril_slam": "special_tendril_slam",
    "special_wall_undulate": "special_wall_undulate",
    "special_tele_golemblast": "special_tele_golemblast",
    "tele_enraged_rampage": "tele_enraged_rampage",
    "vekfight_assault": "vekfight_assault",
    "vekfight_frenzy": "vekfight_frenzy",
    "vekfight_rush": "vekfight_rush",
    "special_eye_boss": "special_eye_boss",
    "eyeboss_hit": "eyeboss_hit",
    "special_epicenter": "special_epicenter",
    "vekoa_swipe": "vekoa_swipe",
    "special_vekoa_rush": "special_vekoa_rush",
    "tele_vekoa_rampage": "tele_vekoa_rampage",
    "special_golem_frenzy": "special_golem_frenzy",
    "listener_signal_echo": "listener_signal_echo",
    "container_exploder": "container_exploder",
    "special_container_exploder_malfunction": "special_container_exploder_malfunction",
    "container_evader": "container_evader",
    "container_evader_malfunction": "container_evader_malfunction",
    "special_container_spy_malfunction": "special_container_spy_malfunction",
    "container_sfer": "container_sfer",
    "attendant_counter": "attendant_counter",
    "attendant_counter_attack": "attendant_counter_attack",
    "special_attendant_strike": "special_attendant_strike",
    "special_veilklight_channel": "special_veilklight_channel",
    "special_veilklight_malfunction": "special_veilklight_malfunction",
    "special_movefoe_tumble": "special_movefoe_tumble",
    "special_movefoe_collide": "special_movefoe_collide",
    "special_movefoe_pry": "special_movefoe_pry",
    "kavruka_followup": "kavruka_followup",
    "special_maintcloak_barrier": "special_maintcloak_barrier",
    "maintstab": "maintstab",
    "special_archiveshelf_annihilate": "special_archiveshelf_annihilate",
    "archiveshelf_withstand": "archiveshelf_withstand",
    "archiveshelf_risky": "archiveshelf_risky",
    "archiveshelf_focus": "archiveshelf_focus",
    "archiveshelf_interrupt": "archiveshelf_interrupt",
    "archiveshelf_sweep": "archiveshelf_sweep",
    "archiveshelf_stab": "archiveshelf_stab",
    "incoherent_gundown_draggable": "incoherent_gundown_draggable",
    "husk_target": "husk_target",
    "husk_coordinate": "husk_coordinate",
    "husk_declaration": "husk_declaration",
    "husk_evade": "husk_evade",
    "husk_rez": "husk_rez",
    "husk_tap": "husk_tap",
    "husk_windup": "husk_windup",
    "husk_windup_carapace": "husk_windup_carapace",
    "husk_guard": "husk_guard",
    "kivskin_guard_support_only": "kivskin_guard_support_only",
    "kivskin_guard": "kivskin_guard",
    "kivskin_shell": "kivskin_shell",
    "windup_jab": "windup_jab",
    "kivskin_malfunction": "kivskin_malfunction",
    "gaunt_grasp": "gaunt_grasp",
    "gaunt_crush": "gaunt_crush",
    "hallucination_attack": "hallucination_attack",
    "special_translation": "special_translation",
    "repairfriend_swarm": "repairfriend_swarm",
    "repairfriend_swarm_malfunction": "repairfriend_swarm_malfunction",
    "repairfriend_salvage": "repairfriend_salvage",
    "special_constructor_carapace": "special_constructor_carapace",
    "constructor_construct": "constructor_construct",
    "constructor_attack": "constructor_attack",
    "constructor_vat": "constructor_vat",
    "sacrifice_utility": "sacrifice_utility",
    "resource_claw": "resource_claw",
    "inject": "inject",
    "corrupt": "corrupt",
    "frame_translation": "frame_translation",
    "special_archivist_conjure": "special_archivist_conjure",
    "special_archivist_upgrade": "special_archivist_upgrade",
    "special_archivist_heal": "special_archivist_heal"
})
// --- regular localization techniques
env.localization.page[page.dialoguePrefix].strings['ACTIVE MEMBERS'] = '';
env.localization.page[page.dialoguePrefix].strings['INACTIVE MEMBERS'] = '';

env.localization.page[page.dialoguePrefix].strings['Surface Veteran'] = '';
env.localization.page[page.dialoguePrefix].strings['Conspicuous Insider'] = '';
env.localization.page[page.dialoguePrefix].strings['Inquisitive Technician'] = '';
env.localization.page[page.dialoguePrefix].strings['Cynical Artist'] = '';
env.localization.page[page.dialoguePrefix].strings['Hopeful Engineer'] = '';
env.localization.page[page.dialoguePrefix].strings['Burdened Guardian'] = '';
env.localization.page[page.dialoguePrefix].strings['Destructive Golem'] = '';

env.localization.page[page.dialoguePrefix].strings['REMOVES'] = '';

env.localization.page[page.dialoguePrefix].strings['EFFECT'] = '';

env.localization.page[page.dialoguePrefix].strings['ACTOR::'] = '';
env.localization.page[page.dialoguePrefix].strings['ACTIONS'] = '';
env.localization.page[page.dialoguePrefix].strings['::FUNCTION::'] = ''

env.localization.page[page.dialoguePrefix].strings[`'empty item slot';'utilize LMB to equip'`] = ``;
env.localization.page[page.dialoguePrefix].strings[`equip to actor using [+] icon`] = ``;
env.localization.page[page.dialoguePrefix].strings[`REMOVE`] = ``;

env.localization.page[page.dialoguePrefix].strings[`any`] = ``;
env.localization.page[page.dialoguePrefix].strings[`location`] = ``;
env.localization.page[page.dialoguePrefix].strings[`other`] = ``;
env.localization.page[page.dialoguePrefix].strings[`special`] = ``;
env.localization.page[page.dialoguePrefix].strings[`self`] = ``;
env.localization.page[page.dialoguePrefix].strings[`auto`] = ``;

env.localization.page[page.dialoguePrefix].strings[`KNOCKBACK::`] = ``;

env.localization.page[page.dialoguePrefix].strings[`MAX::`] = ``;
env.localization.page[page.dialoguePrefix].strings[`BARRIER_MAX::1/2 max HP`] = ``;

env.localization.page[page.dialoguePrefix].strings[`EFFECT::SKIP TURN UNTIL END OF COMBAT`] = ``;
env.localization.page[page.dialoguePrefix].strings[`EFFECT::UTILIZING UNUSUAL RULESET`] = ``;

env.localization.page[page.dialoguePrefix].strings["ORIGIN::"] = "";
env.localization.page[page.dialoguePrefix].strings["unknown"] = "";

env.localization.page[page.dialoguePrefix].strings["ERROR::'unknown effect'"] = "";
env.localization.page[page.dialoguePrefix].strings["ERROR::'missing context'"] = "";

env.localization.page[page.dialoguePrefix].strings["PROHIBITED BY FEAR"] = ``;
env.localization.page[page.dialoguePrefix].strings["PROHIBITED BY"] = ``;

env.localization.page[page.dialoguePrefix].strings[`AUTOHIT`] = ``;

env.localization.page[page.dialoguePrefix].strings[`ATTENTION::"thoughtform combat gameplay bypassed";"toggle within system menu if desired"`] = ``;

env.dialogues["collapse_loss"] = generateDialogueObject(`
start
    sourceless
        A SHARP LIMB STRIKES MY MINDCORE
        ...
            EXEC::content.classList.add('goodbye');ratween(env.bgm, 0.2, 6000);content.classList.add('dying');
        WHAT IS HAPPENING
            WAIT::1000
        EVERYTHING HAS STOPPED
            WAIT::1000
        HELLO?
        TOZIK? GAKVU??
        FUNFRIEND?
        IS ANYONE THERE?
        HELP

    unknown
        ...
            SHOWONCE::

____SHOWONCE::
    sys
        EXECUTING::"structure direction";"iteration termination"

    plainsys
        current iteration choices led to destruction of recollection locus
        render unable to proceed in present state; no coherent data for memory stream
        reversion to last stable state recommended

    sys
        END::
____END

    RESPONSES::sys
        rewind<+>END
            EXEC::env.embassy.lossReversion()
            FAKEEND::(retry fight)

        end recollection<+>END
            EXEC::moveTo("/local/ocean/embassy/")
            FAKEEND::(return to memory selection)
`)

// === LOAD === //
if (!document.querySelector("#cor-rucsscombat")) document.head.appendChild(document.createElement('style').appendChild(document.createTextNode(cor_ru.combat.css)).parentElement).setAttribute("id", "cor-rucsscombat");

cor_ru.combat.redefineAll();
cor_ru.combat.enforceInflectionInMessages();

getLocalizationForPage(true);