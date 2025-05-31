/* --- HOW TO USE INFLECTION IN env.ACTIONS.usage --- 


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
    

then write the action usage messages!!

inflection of names is simple: %CASE-ROLE, like %GEN-USER for user's genitive name or %DAT-TARGET for target's dative name

inflection of everything else is not simple! anyways
you take your word and then list all endings separately in the format of %US(masc/fem/neu/plu)ER or %TAR(masc/fem/neu/plu)GET
if there is no ending in one of the inflections, put "-"
PRESENT TENSE VERBS ALSO NEED TO BE INFLECTED!! this is due to the genders having a plural option!! for these cases you can use a %US(singular/plural)ER or %TAR(singular/plural)GET format instead of listing four whole things

examples:
we will take the adjective "крутой" and assume that it is referring to the target
you will get "крут%TAR(ой/ая/ое/ие)GET"

we will take the verb "ударить" in past tense and assume that it is referring to the user
you will get "ударил%US(-/а/о/и)ER"

we will take the verb "любить" in present tense and assume that it is referring to the user
you will get "люб%US(ит/ят)ER"

*/

cor_ru['inflection'] = function (string, user, target) { // --- function for doing inflection in actionmessagestuffs. if this is ugly idc i made this at 1 am lol. also it works so i aint changing it
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

                    try {stringProcessed = stringTargetSplit[user.cor_ru.gender]} catch {console.error("some shit going on with" + user.name + "'s gender tbh - @cor-RU")};

                } else if (stringTargetSplit.length == 2) {

                    if (user.cor_ru.gender == 3) stringProcessed = stringTargetSplit[1];
                    else stringProcessed = stringTargetSplit[0];

                } else console.error("some shit going on with the stringTargetSplit tbh - @cor-RU " + stringTargetSplit);

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

                let stringTarget = string.substring(string.indexOf('%TAR(') + 4, string.indexOf(')GET'));
                let stringProcessed = "";

                let stringTargetSplit = stringTarget.split('/');

                if (stringTargetSplit.length == 4) {

                    try {stringProcessed = stringTargetSplit[target.cor_ru.gender]} catch {console.error("some shit going on with" + target.name + "'s gender tbh - @cor-RU")};

                } else if (stringTargetSplit.length == 2) {

                    if (target.cor_ru.gender == 3) stringProcessed = stringTargetSplit[1];
                    else stringProcessed = stringTargetSplit[0];

                } else console.error("some shit going on with the stringTargetSplit tbh - @cor-RU " + stringTargetSplit);

                if (stringProcessed == "-") stringProcessed = "";

                string = string.replace('%TAR(' + stringTarget + ')GET', stringProcessed)
            }
        }
    } else console.log("%coh! target either does not exist or does not have a cor_ru property... - @cor-RU", 'color:rgb(229, 142, 22)')

    return string;
}
cor_ru['translate'] = function (input) {return processStringTranslation(input)}
cor_ru.createRPGeffectMessage = createRPGeffectMessage; // --- may this entertain velzie lol
createRPGeffectMessage = function() {
    cor_ru.createRPGeffectMessage();
    // grabbing the action thing
    env.rpg.effectMessage.action = function({user, action, target, hit, specialHitText, actionMessageIndex, reason, isMinor = false, force = false, initialize = true}) { 
        if(env.rpg.stopMessages || !this.current && !initialize || env.currentDialogue.active) return -1 // we require this to be .initialize()d first, done in useAction
        else if(initialize && !env.rpg.effectMessage.current) this.initialize();

        let current = this.current

        //control conditional text/formatting
        let hitType = "none"
        let hitText = false

        switch(hit){
            case "none": break

            case "critbuff":
            case "crit":
                hitType = "crit"
            break

            case true:
                hitType = "hit"
            break

            case false: 
                hitType="miss"
        }

        let genUsageText = typeof action == "string" ? cor_ru.translate(action) : action?.usage?.act // --- place where i actually insert stuff 
        if(!genUsageText) return false;
        if(action.usage) {
            hitText = action.usage[hitType] || false //refer to action usage text for result 
        } 
        
        if(force && !hitText && typeof action == "string") hitText = action

        let actionText = (genUsageText)
            .replaceAll("%USER", `<span class="${user?.team?.name}">${user?.name}</span>`)
            .replaceAll("%TARGET", `<span class="${target?.team?.name}">${target?.name}</span>`)
        
        actionText = cor_ru.inflection(actionText, user, target) // --- place where i actually insert stuff
        
        if(hitText || specialHitText) {
            hitText = (hitText || specialHitText)
                .replaceAll("%USER", `<span class="${user?.team?.name}">${user?.name}</span>`)
                .replaceAll("%TARGET", `<span class="${target?.team?.name}">${target?.name}</span>`)
            hitText = cor_ru.inflection(hitText, user, target) // --- place where i actually insert stuff 2
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
        if(typeof actionMessageIndex == "object") effectiveIndex = actionMessageIndex?.i // cause we might just pass the action hit return which has the i

        if(typeof effectiveIndex == "undefined") { 
            // figure out if there's an identical action in the list
            // it's way more efficient to just pass the index though so this is a fallback
            effectiveIndex = env.rpg.effectMessage.current.actions.findIndex(action => (action.user == user) && ((!reason && !action.reason) || (action.reason == reason)))
            if(effectiveIndex == -1) effectiveIndex = false
        } 
        
        if(current.actions[effectiveIndex]) { //exists, so adding to this
            let currentAction = current.actions[effectiveIndex]
            if(!hitText && !force) {console.log("no hit text so returning"); return -1}; // no text = no action for subtext
            finalIndex = effectiveIndex

            //find if there's an identical message for this hit, and if so, increase the 'count'
            let similarHit = current.actions[finalIndex].hits.find(h=>
                h.action == action &&
                h.target == target &&
                h.result == hitObj.result &&
                h.text == hitObj.text
            )
            if(similarHit) {
                similarHit.count++
            } else {
                current.actions[finalIndex].hits.push(hitObj)

                //crit, hit, miss, in order of 'best hit' priority
                if(currentAction.bestHit != hitType) {
                    if(
                        (hitType == "hit" && currentAction.bestHit == "miss") ||
                        (hitType == "crit" && currentAction.bestHit != "crit")
                    ) currentAction.bestHit = hitType
                }               
            }

        } else { //doesn't, so creating
            current.incitingActor = user

            let actionUse = {user, action, actionText, isMinor, reason, bestHit: hitType, hits: hitObj.text ? [hitObj] : []}

            if(current.actions.length == 0) {
                current.display.setAttribute("type", hitType)
                current.display.setAttribute("team", user?.team?.name)
            }
            
            if(current.actions.length && current?.actions[0]?.isMinor) { //avoid highlighting "minor actions", i.e. async that happen before others
                //shouldn't happen super often, so probably won't end up scrambling expected indexes
                current.actions.unshift(actionUse)
                finalIndex = 0
            } else {
                current.actions.push(actionUse) 
                finalIndex = current.actions.length - 1
            }

        }

        //rerender
        this.updateDisplay({actionIndex: finalIndex})

        //return the action index
        return finalIndex
    }
    
    // also redefine other shit cause why not
    actionMessage = function (origin, action, desiredTarget, hit = "none", duration = false, id = false) {
        console.warn("you should probably not be using actionMessage anymore, use the new effectMessage system instead\nthis will be removed in a future update")
        //control for optional or flexible parameters
        var actionIsString = (typeof action == "string")
        var target = desiredTarget;
        if(typeof desiredTarget == "undefined") target = origin;

        //figure out who's on what team
        var originTeam, targetTeam;
        env.rpg.teams.forEach((team, i) => {
            team.members.forEach((actor, i) => {
                if(actor.slug == origin.slug) {
                    originTeam = team.name
                } //not 'else if' because it could be self-targeted

                if(actor.slug == (target.slug || 0)) {
                    targetTeam = team.name
                }
            });
        });

        //control conditional text/formatting
        var hitType = "none"
        var hitText = false
        var modClass = ""; //used to border if there's a crit
        switch(hit){
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
                hitType="miss"
        }
        if(action.usage) hitText = action.usage[hitType] || false //refer to action usage text for result

        var actionText;
        if(actionIsString) {
            actionText = cor_ru.translate(action) // --- place where i actually insert stuff 
                .replaceAll("%USER", `<span class="${originTeam}">${origin.name}</span>`)
                .replaceAll("%TARGET", `<span class="${targetTeam}">${target.name}</span>`);
            actionText = cor_ru.inflection(actionText, origin, target) // --- place where i actually insert stuff
            
        } else if(action.usage) {
            actionText = action.usage.act
                .replaceAll("%USER", `<span class="${originTeam}">${origin.name}</span>`)
                .replaceAll("%TARGET", `<span class="${targetTeam}">${target.name}</span>`);
            actionText = cor_ru.inflection(actionText, origin, target) // --- place where i actually insert stuff
        }
            
        if(hitText) {
            hitText = cor_ru.inflection(hitText, origin, target) // --- place where i actually insert stuff
            hitText = 
                `<br><div class="hit-text">` +
                (hitText
                .replaceAll("%USER", `<span class="${originTeam}">${origin.name}</span>`)
                .replaceAll("%TARGET", `<span class="${targetTeam}">${target.name}</span>`)) +
                `</div>`
            ;
        } else {
            hitText = "";
        }

        let currentNum = messageNum++;
        env.rpg.querySelector(`#${originTeam}-team .actor`).insertAdjacentHTML('beforebegin', `<div class="use-message ${modClass}" style="z-index: ${10 + (currentNum % 9)}" id="m-${currentNum}">${actionText}${hitText}</div>`);
        let useMessage = env.rpg.querySelector(`#m-${currentNum}`)
        setTimeout(()=>{
            useMessage.classList.add('active')
            var readoutMessage
            if(actionIsString) {
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
                    
        setTimeout(function(){
            useMessage.classList.add('shrink');
            setTimeout(function(){useMessage.remove()}, 400);
        }, duration ? duration : env.ADVANCE_RATE * 1.5);
    }
    actionChoice = function ({choiceText = "choice", options = [], choiceCallback, user, action}) {
        if(action.choiceAnim) {user.sprite.classList.add(action.choiceAnim)}
        let id = `${user.slug}-${action.slug}`

        let choices = ""
        options.forEach((option, i) => {
            console.log(option)
            if(option.text) choices += `<span choice="c${i}" class="button" definition="${cor_ru.translate(option.definition)}">${cor_ru.translate(option.text)}</span>` // --- place where i actually insert stuff 
        })

        console.log(choices)
        env.rpg.insertAdjacentHTML('beforeend', `
            <div id="${id}" class="choice-attack">
                <div class="choice-title">${cor_ru.translate(choiceText)}</div>
                ${choices}
            </div>
        `)// --- place where i actually insert stuff 

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
}

/* --- ACTIONS --- */
cor_ru['redefineActions'] = function () {
    /* - win - */

    env.ACTIONS.win.name = "" // Win
    env.ACTIONS.win.desc = "" // 'just win'
    env.ACTIONS.win.help = "" // win
    env.ACTIONS.win.usage = {
        "act": "%USER WINS LOL"
    }

    /* - nothing - */

    env.ACTIONS.nothing.name = "" // Nothing
    env.ACTIONS.nothing.desc = "" // 'just nothing'
    env.ACTIONS.nothing.help = "" // NOTHING
    env.ACTIONS.nothing.usage = {
        "act": "%USER IS IDLE"
    }

    /* - cower - */

    env.ACTIONS.cower.name = "" // Endure
    env.ACTIONS.cower.usage = {
        "act": "%USER PUSHES THROUGH THE HORROR"
    }
    env.ACTIONS.cower.details = {
        "onUse": "'remove [STATUS::fear]'",
        "flavor": "'focus on what matters'"
    }

    /* - truly_nothing - */

    env.ACTIONS.truly_nothing.name = "" // Nothing
    env.ACTIONS.truly_nothing.desc = "" // 'just nothing'
    env.ACTIONS.truly_nothing.help = "" // NOTHING

    /* - evade - */

    env.ACTIONS.evade.name = "" // Focus
    env.ACTIONS.evade.usage = {
        "act": "%USER LOOKS FOR AN OPENING"
    }
    env.ACTIONS.evade.details = {
        onUse: () => `'gain [STATUS::focused] [STATUS::evasion]'`,
        "flavor": "'deliberate on the moment and its opportunities'"
    }
    env.ACTIONS.evade.disableIf = (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" }

    /* - skitter - */

    env.ACTIONS.skitter.name = "" // Skitter
    env.ACTIONS.skitter.usage = {
        "act": "%USER SKITTERS WILDLY AROUND THE ROOM"
    }
    env.ACTIONS.skitter.details = {
        onUse: () => `'gain [STATUS::evasion]'`,
        "flavor": "'focus on evading incoming attacks';'hide vulnerabilities'"
    }

    /* - malfunction - */

    env.ACTIONS.malfunction.name = "" // Malfunction
    env.ACTIONS.malfunction.desc = "" // 'suffer from internal deterioration'
    env.ACTIONS.malfunction.help = "" // -1HP, +1T:VULNERABLE
    env.ACTIONS.malfunction.usage = {
        "act": "%USER'S SKIN WRITHES"
    }

    /* - attack - */

    env.ACTIONS.attack.name = "" // Attack
    env.ACTIONS.attack.usage = {
        "act": "%USER ATTACKS %TARGET",
        "crit": "A FRIGHTENING BLOW",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.attack.details = {
        "flavor": "'improvise'",
        "onHit": "'[STAT::amt]'"
    }

    /* - akizet_attack - */

    env.ACTIONS.akizet_attack.name = "" // Overwhelm
    env.ACTIONS.akizet_attack.usage = {
        "act": "%USER CHARGES %TARGET",
        "crit": "%TARGET IS LEFT REELING",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.akizet_attack.details = {
        "onHit": "'boldly assault for [STAT::amt]'",
        "onCrit": "'inflict immense physical trauma';'[STATUS::stun]'"
    }

    /* - eviscerate - */

    env.ACTIONS.eviscerate.name = "" // Eviscerate
    env.ACTIONS.eviscerate.usage = {
        "act": "%USER CLAWS AT %TARGET",
        "crit": "%TARGET IS TORN APART",
        "hit": "%TARGET IS TORN APART",
        "miss": "%TARGET RECOILS"
    }
    env.ACTIONS.eviscerate.details = {
        "flavor": "'boldly assault target';'target previously inflicted wounds for additional damage'",
        "onHit": "'strike for [STAT::amt]'",
        "conditional": "<em>ADD::</em>'[STAT::amt] PER [STATUS::puncture] ON TARGET'"
    }

    /* - stab - */

    env.ACTIONS.stab.name = "" // Stab
    env.ACTIONS.stab.usage = {
        "act": "%USER STABS %TARGET",
        "crit": "%TARGET IS EVISCERATED",
        "hit": "%TARGET BLEEDS SLUDGY CORRU",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.stab.details = {
        "flavor": "'reshape arm into sharpened tendril';'stab target'",
        "onHit": "'[STAT::amt] [STATUS::puncture]'",
    onCrit: ()=> `'puncture vital cystic component for [STATUS::puncture]'${env?.rpg?.is2D ? ";'KB::2'" : ''}`,
    }

    /* - frenzy - */

    env.ACTIONS.frenzy.name = "" // Frenzy
    env.ACTIONS.frenzy.usage = {
        "act": "%USER STABS %TARGET",
        "crit": "%USER JUST KEEPS GOING",
        "hit": "%TARGET BLEEDS SLUDGY CORRU",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.frenzy.details = {
        "flavor": "'puncture vital cystic component';'may inspire additional stabbing'",
        "onHit": "'[STAT::amt] [STATUS::puncture]'",
        "onCrit": "'use this action again'"
    }

    /* - gakvu_attack - */

    env.ACTIONS.gakvu_attack.name = "" // Scramble
    env.ACTIONS.gakvu_attack.usage = {
        "act": "%USER REACHES TOWARDS %TARGET",
        "crit": "%TARGET'S COMPONENTS ARE EXPOSED",
        "hit": "%TARGET'S FLESH MELTS AWAY",
        "miss": "%TARGET RESISTS CONTROL"
    }
    env.ACTIONS.gakvu_attack.details = {
        "flavor": "'melt corrucystic flesh';'may reveal weakness'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'inflict [STATUS::vulnerable]'"
    }

    /* - countercall - */

    env.ACTIONS.countercall.name = "" // Countercall
    env.ACTIONS.countercall.usage = {
        "act": "%USER REACHES TOWARDS %TARGET",
        "crit": "%TARGET FALLS APART",
        "hit": "%TARGET'S FLESH MELTS AWAY",
        "miss": "%TARGET RESISTS CONTROL"
    }
    env.ACTIONS.countercall.details = {
        "flavor": "'direct destructive signal'",
        "onHit": "'[STAT::amt] [STATUS::vulnerable]'",
        "conditional": "<em>VS DESTABILIZED::</em>'additional [STAT::amt]';'+[STAT::critBonus]CRIT';'[STATUS::stun] on CRIT'"
    }

    /* - destabilize - */

    env.ACTIONS.destabilize.name = "" // destabilize
    env.ACTIONS.destabilize.usage = {
        "act": "%USER DESTABILIZES %TARGET",
        "crit": "%TARGET RIPPLES UNNATURALLY",
        "hit": "%TARGET'S FORM WAVERS",
        "miss": "%TARGET REMAINS STABLE"
    }
    env.ACTIONS.destabilize.details = {
        "flavor": "'utilize illegal groundsmindry';'alter structure of target'",
        "onHit": "'[STATUS::destabilized]'",
        "onCrit": "'additional [STATUS::destabilized]'",
    conditional: ()=> checkItem("core_translation") && check("PAGE!!embassy_day", 3.99) ? 
                `<em>SIGNAL INVERTER::</em>'granted extra functionality'\n<em>VS FOES</em>::'[STATUS::vulnerable]'\n<em>VS ALLIES</em>::'[STATUS::evasion]'` : ``
    }

    /* - tozik_attack - */

    env.ACTIONS.tozik_attack.name = "" // Corruskivi
    env.ACTIONS.tozik_attack.usage = {
        "act": "%USER CLAWS AT %TARGET",
        "crit": "%TARGET'S LIFE IS DRAINED AWAY",
        "hit": "%TARGET IS SLASHED",
        "miss": "%TARGET DODGES"
    }
    env.ACTIONS.tozik_attack.details = {
        "flavor": "'attack with repair tool';'siphon vital corru'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'heal nearby allies for [STAT::healHP] [STATUS::regen]'"
    }

    /* - parasite - */

    env.ACTIONS.parasite.name = "" // Parasite
    env.ACTIONS.parasite.verb = "" // parasitize
    env.ACTIONS.parasite.usage = {
        "act": "%USER GRASPS AT %TARGET",
        "crit": "%TARGET'S TEAM IS INFESTED",
        "hit": "%TARGET IS INFESTED",
        "miss": "%TARGET DODGES"
    }
    env.ACTIONS.parasite.details = {
        "flavor": "'utilize modified repair tool';'tap vital corru of foes to sustain allies'",
        onHit: () => "'[STAT::amt] [STATUS::siphon]'",
        onCrit: () => "'infest oppposing team with [STATUS::siphon]'",
    }

    /* - mend - */

    env.ACTIONS.mend.name = "" // Quick Mend
    env.ACTIONS.mend.usage = {
        "act": "%USER FIXES UP %TARGET",
        "crit": "%TARGET FEELS WAY BETTER",
        "hit": "%TARGET FEELS BETTER",
        "miss": "%TARGET IS TOO SLIPPERY"
    }
    env.ACTIONS.mend.details = {
        "onHit": "'[STAT::amt] [STATUS::regen]'"
    }

    /* - optimize - */

    env.ACTIONS.optimize.name = "" // Optimize
    env.ACTIONS.optimize.usage = {
        "act": "%USER FIXES UP %TARGET",
        "crit": "%TARGET HAS A BURST OF ENERGY",
        "hit": "%TARGET IS READY TO FIGHT",
        "miss": "%TARGET IS TOO SLIPPERY"
    }
    env.ACTIONS.optimize.details = {
        onHit: () => "'[STAT::amt] [STATUS::regen] [STATUS::surge]'",
        "flavor": "'utilize ukuzu restorative';'reduced mending effect';'enhance energy'"
    }

    /* - miltza_attack - */

    env.ACTIONS.miltza_attack.name = "" // Distraction
    env.ACTIONS.miltza_attack.verb = "" // distract
    env.ACTIONS.miltza_attack.usage = {
        "act": "%USER FEINTS AND STRIKES %TARGET",
        "crit": "%USER'S ALLIES ARE INSPIRED",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET DODGES"
    }
    env.ACTIONS.miltza_attack.details = {
        "flavor": "'strike with clever feint';'may create distraction'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::evasion] to nearby allies'",
        "conditional": "<em>VS VULNERABLE::</em>'additional [STAT::amt]'"
    }

    /* - spy - */

    env.ACTIONS.spy.name = "" // spy
    env.ACTIONS.spy.verb = "" // spy on
    env.ACTIONS.spy.usage = {
        "act": "%USER SPIES UPON %TARGET",
        "crit": "%TARGET IS MARKED FOR DEATH",
        "hit": "%TARGET FEELS TARGETED",
        "miss": "%TARGET HIDES BEHIND SOMETHING"
    }
    env.ACTIONS.spy.details = {
        "onUse": "'[STATUS::vulnerable]'"
    }

    /* - ultra_spy - */

    env.ACTIONS.ultra_spy.name = "" // Find Flaw
    env.ACTIONS.ultra_spy.verb = "" // find flaw in
    env.ACTIONS.ultra_spy.usage = {
        "act": "%USER SPIES UPON %TARGET",
        "crit": "%TARGET IS MARKED FOR DEATH",
        "hit": "%TARGET IS MARKED FOR DEATH",
        "miss": "%TARGET HIDES BEHIND SOMETHING"
    }
    env.ACTIONS.ultra_spy.details = {
        "flavor": "'locate core components in target'",
        "onHit": "'[STATUS::vulnerable] [STATUS::critical_flaw]'"
    }

    /* - subvert - */

    env.ACTIONS.subvert.name = "" // Subvert
    env.ACTIONS.subvert.desc = "" // 'expose extreme weakness';'increase hit and crit chances';'additional chance for severe damage'
    env.ACTIONS.subvert.usage = {
        "act": "%USER SPIES UPON %TARGET",
        "crit": "%TARGET IS MARKED FOR DEATH",
        "hit": "%TARGET IS MARKED FOR DEATH",
        "miss": "%TARGET HIDES BEHIND SOMETHING"
    }
    env.ACTIONS.subvert.details = {
        "flavor": "'deceive target';'manipulated by outside interference'",
        "onHit": "'[STATUS::vulnerable] [STATUS::critical_flaw]'"
    }

    /* - spy_analyze - */

    env.ACTIONS.spy_analyze.name = "" // Analyze
    env.ACTIONS.spy_analyze.desc = "" // 'expose enemy weakness';'increase hit and crit chances'
    env.ACTIONS.spy_analyze.help = "" // 80% +3T:VULNERABLE -EVASION
    env.ACTIONS.spy_analyze.usage = {
        "act": "%USER SCANS %TARGET",
        "hit": "%TARGET FEELS TARGETED",
        "miss": "%TARGET HIDES BEHIND SOMETHING"
    }

    /* - spy_target - */

    env.ACTIONS.spy_target.name = "" // Target
    env.ACTIONS.spy_target.desc = "" // 'expose enemy weakness';'increase hit and crit chances'
    env.ACTIONS.spy_target.help = "" // 80% +3T:VULNERABLE -EVASION
    env.ACTIONS.spy_target.usage = {
        "act": "%USER POINTS AT %TARGET",
        "hit": "%TARGET FEELS TARGETED",
        "miss": "%TARGET HIDES BEHIND SOMETHING"
    }

    /* - drone_strike - */

    env.ACTIONS.drone_strike.name = "" // Drone Strike
    env.ACTIONS.drone_strike.desc = "" // 'strike against analyzed weakness'
    env.ACTIONS.drone_strike.help = "" // AUTOHIT -1HP, 10%C x2
    env.ACTIONS.drone_strike.usage = {
        "act": "%USER's DRONE ATTACKS %TARGET"
    }

    /* - cavik_attack - */

    env.ACTIONS.cavik_attack.name = "" // IED
    env.ACTIONS.cavik_attack.verb = "" // throw at
    env.ACTIONS.cavik_attack.usage = {
        "act": "%USER THROWS A WEIRD CYST AT %TARGET",
        "crit": "%TARGET EXPLODES",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET DODGES"
    }
    env.ACTIONS.cavik_attack.details = {
        "flavor": "'throw hastily made minor explosive';'chance for greater explosion'",
        "onHit": "'[STAT::amt]'",
        onCrit: ()=> `'HIT all foes for [STAT::amt]'${page.name == "frame" ? `;'additional hits do not trigger on-hit effects'` : ``}`,
    }

    /* - bazruka - */

    env.ACTIONS.bazruka.name = "" // Bazruka
    env.ACTIONS.bazruka.verb = "" // throw at
    env.ACTIONS.bazruka.usage = {
        "act": "%USER TOSSES AN EXPLOSIVE AT %TARGET",
        "crit": "SHRAPNEL SPRINGS AROUND THE ROOM",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET DODGES"
    }
    env.ACTIONS.bazruka.details = {
        "flavor": "'utilize rapid-formed micro-explosive';'chance for greater shrapnel explosion'",
        "onHit": "'[STAT::amt]'",
        onCrit: () => `'HIT all foes for [STAT::amt] [STATUS::puncture]'${page.name == "frame" ? `;'additional hits trigger on-hit effects'` : ``}`,
    }

    /* - bozko_attack - */

    env.ACTIONS.bozko_attack.name = "" // Disable
    env.ACTIONS.bozko_attack.usage = {
        "act": "%USER JABS AT %TARGET'S WEAPONRY",
        "crit": "%TARGET IS CRIPPLED",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.bozko_attack.details = {
        "flavor": "'strike at offensive appendages of target';'attempt to weaken'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::weakened]'"
    }

    /* - cripple - */

    env.ACTIONS.cripple.name = "" // Cripple
    env.ACTIONS.cripple.usage = {
        "act": "%USER JABS AT %TARGET'S WEAPONRY",
        "crit": "%TARGET IS CRIPPLED",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.cripple.details = {
        "flavor": "'strike neural center of target';'guaranteed disorientation'",
        "onHit": "'[STAT::amt] [STATUS::stun]'",
        "onCrit": "'[STATUS::weakened]'"
    }

    /* - guard - */

    env.ACTIONS.guard.name = "" // Guard
    env.ACTIONS.guard.usage = {
        "act": "%USER STANDS BEFORE %TARGET",
        "hit": "%TARGET IS SHIELDED BY %USER"
    }
    env.ACTIONS.guard.details = {
        "flavor": "'utilize unique limbs to protect target';'intercept incoming attacks'",
        "onUse": "'[STATUS::redirection]'"
    }

    /* - special_guard_all - */

    env.ACTIONS.special_guard_all.name = "" // Frontline
    env.ACTIONS.special_guard_all.usage = {
        "act": "%USER STANDS BEFORE THEIR FOES"
    }
    env.ACTIONS.special_guard_all.details = {
        "flavor": "'attain hyper-awareness of proceedings';'intercept all attacks on allies'",
        "onUse": "'[STATUS::redirection] to all allies'"
    }

    /* - special_guard_all_bonus - */

    env.ACTIONS.special_guard_all_bonus.name = "" // Martyr
    env.ACTIONS.special_guard_all_bonus.desc = "" // 'intercept all attacks on allies';'prepare to take great damage'
    env.ACTIONS.special_guard_all_bonus.help = "" // ALLIES::+2T:REDIRECTION (TO USER), +2T:CARAPACE +2T:SPIKES -VULNERABLE
    env.ACTIONS.special_guard_all_bonus.usage = {
        "act": "%USER STANDS BEFORE THEIR FOES"
    }
    env.ACTIONS.special_guard_all_bonus.details = {
        "flavor": "'intercept all attacks on allies';'prepare to take great damage'",
        "onUse": "'[STATUS::carapace] [STATUS::spikes]';'[STATUS::redirection] to all allies'"
    }

    /* - shell - */

    env.ACTIONS.shell.name = "" // Shell
    env.ACTIONS.shell.usage = {
        "act": "%USER PREPARES TO TAKE A HIT"
    }
    env.ACTIONS.shell.details = {
        "flavor": "'take on defensive stance'",
        "onUse": "'[STATUS::carapace] [STATUS::spikes]'"
    }

    /* - brawl_weak - */

    env.ACTIONS.brawl_weak.name = "" // Clumsy Brawl
    env.ACTIONS.brawl_weak.desc = "" // 'unwieldy strike with weak limbs'
    env.ACTIONS.brawl_weak.verb = "" // brawl with
    env.ACTIONS.brawl_weak.help = "" // 40% -1HP, 10%C X2
    env.ACTIONS.brawl_weak.usage = {
        "act": "%USER CLUMSILY ATTACKS %TARGET",
        "crit": "%TARGET IS KNOCKED BACK",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }

    /* - brawl - */

    env.ACTIONS.brawl.name = "" // Brawl
    env.ACTIONS.brawl.verb = "" // brawl with
    env.ACTIONS.brawl.usage = {
        "act": "%USER ATTACKS %TARGET",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.brawl.details = {
        "flavor": "'unwieldy punch';'last resort'",
        "onHit": "'[STAT::amt]'"
    }

    /* - ik_attack - */

    env.ACTIONS.ik_attack.name = "" // Veilksplitter
    env.ACTIONS.ik_attack.verb = "" // veilksplit
    env.ACTIONS.ik_attack.usage = {
        "act": "%USER BLASTS %TARGET",
        "crit": "%TARGET IS ANNIHILATED",
        "hit": "%TARGET IS SEARED",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.ik_attack.details = {
        "flavor": "'utilize dull-enabled cutting beam'",
        onHit: ()=> `'[STAT::amt] [STATUS::stun]'${env?.rpg?.is2D ? ";'KB::4'" : ''}`,
    }

    /* - dullflare - */

    env.ACTIONS.dullflare.name = "" // Dull Flare
    env.ACTIONS.dullflare.usage = {
        "act": "%USER TEARS OPEN THE DULL"
    }
    env.ACTIONS.dullflare.details = {
        "flavor": "'wide directional release of rapidly decaying dull light';'deconstructs foes'",
        "onUse": "'HIT all foes'",
        "onHit": "'[STAT::amt]'"
    }

    /* - swipe - */

    env.ACTIONS.swipe.name = "" // Swipe
    env.ACTIONS.swipe.desc = "" // 'swipe blindly at target';'chance for persistent wound'
    env.ACTIONS.swipe.help = "" // 70% -1HP, 20%C x2 +1T:PUNCTURE -REGEN
    env.ACTIONS.swipe.usage = {
        "act": "%USER SWIPES AT %TARGET",
        "crit": "%TARGET IS STABBED",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET DUCKS OUT OF THE WAY"
    }

    /* - disabler_pulse - */

    env.ACTIONS.disabler_pulse.name = "" // Disabler Pulse
    env.ACTIONS.disabler_pulse.verb = "" // disable
    env.ACTIONS.disabler_pulse.usage = {
        "act": "%USER LETS LOOSE THE DISABLER",
        "hit": "%TARGET IS ANNIHILATED"
    }
    env.ACTIONS.disabler_pulse.details = {
        "flavor": "'emergency security device';'injects self-destructive thoughtform';'for industrial use only'",
        "onHit": "'[STAT::amt] [STATUS::stun]'"
    }

    /* - foe_stab - */

    env.ACTIONS.foe_stab.name = "" // stab
    env.ACTIONS.foe_stab.desc = "" // 'puncture vital cystic component';'damage over time';'stop regen'
    env.ACTIONS.foe_stab.help = "" // 75% -1HP +2T:PUNCTURE -REGEN, 10%C -1HP
    env.ACTIONS.foe_stab.usage = {
        "act": "%USER STABS %TARGET",
        "crit": "%TARGET IS EVISCERATED",
        "hit": "%TARGET BLEEDS SLUDGY CORRU",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.foe_stab.details = {
        "flavor": "'reshape arm into sharpened tendril';'stab target'",
        "onHit": "'[STAT::amt] [STATUS::puncture]'",
        onCrit: ()=> `'puncture vital cystic component for [STATUS::puncture]'${env?.rpg?.is2D ? ";'KB::2'" : ''}`,
    }

    /* - barrier - */

    env.ACTIONS.barrier.name = "" // Barrier
    env.ACTIONS.barrier.verb = "" // shield
    env.ACTIONS.barrier.usage = {
        "act": "%USER SHIELDS %TARGET",
        "crit": "%TARGET FEELS INVINCIBLE",
        "hit": "%TARGET GAINS A THIN BARRIER",
        "miss": "IT DOES NOT STICK"
    }
    env.ACTIONS.barrier.details = {
        "flavor": "apply ablative corru layer to target';'occasionally provide better shielding'",
        "onHit": "'[STAT::amtBP]'",
        "onCrit": "'additional [STAT::amtBP]'"
    }

    /* - special_limited_carapace - */

    env.ACTIONS.special_limited_carapace.name = "" // Expend carapace
    env.ACTIONS.special_limited_carapace.desc = "" // 'deploy shielding around target ally';'single-use'
    env.ACTIONS.special_limited_carapace.help = "" // AUTOHIT +3T:CARAPACE, ONE USE PER COMBAT
    env.ACTIONS.special_limited_carapace.usage = {
        "act": "%USER ATTACHES THEIR SHIELDS TO %TARGET",
        "crit": "%TARGET FEELS INVINCIBLE",
        "hit": "%TARGET LOOKS MORE HARDY",
        "miss": "SOMETHING BROKE LOL"
    }

    /* - enemy_shell - */

    env.ACTIONS.enemy_shell.name = "" // Shell
    env.ACTIONS.enemy_shell.desc = "" // 'form arms into defensive shell';'reduce incoming attacks'
    env.ACTIONS.enemy_shell.help = "" // +2T:CARAPACE -VULNERABLE
    env.ACTIONS.enemy_shell.usage = {
        "act": "%USER PREPARES TO TAKE A HIT"
    }

    /* - restore - */

    env.ACTIONS.restore.name = "" // Restore
    env.ACTIONS.restore.usage = {
        "act": "%USER FIXES UP %TARGET",
        "crit": "%TARGET FEELS WAY BETTER",
        "hit": "%TARGET FEELS BETTER",
        "miss": "%TARGET IS TOO SLIPPERY"
    }
    env.ACTIONS.restore.details = {
        "flavor": "'utilize quick-acting repair cyst'",
        "onHit": "'[STAT::amt] [STATUS::regen]'",
        "onCrit": "'additional [STAT::amt] [STATUS::regen]'",
        "conditional": "<em>VS DOWN::</em>'revive target';'[STATUS::evasion] [STATUS::regen]'"
    }

    /* - special_spy_all - */

    env.ACTIONS.special_spy_all.name = "" // Analyze Foes
    env.ACTIONS.special_spy_all.usage = {
        "act": "%USER SPIES UPON THEIR FOES"
    }
    env.ACTIONS.special_spy_all.details = {
        "flavor": "'utilize receptor-tied targeting cyst';'expose all weakness'",
        "onUse": "'[STATUS::vulnerable] to all foes'"
    }

    /* - special_attack_all - */

    env.ACTIONS.special_attack_all.name = "" // Explosive
    env.ACTIONS.special_attack_all.usage = {
        "act": "%USER DEPLOYS A KAVRUKA"
    }
    env.ACTIONS.special_attack_all.details = {
        "flavor": "'utilize volatile deconstruction tool'",
        "onUse": "'HIT all foes'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - special_barrier_allies - */

    env.ACTIONS.special_barrier_allies.name = "" // Cover
    env.ACTIONS.special_barrier_allies.usage = {
        "act": "%USER SHIELDS THEIR ALLIES"
    }
    env.ACTIONS.special_barrier_allies.details = {
        "flavor": "'utilize mobile applicators and inbuilt reserve';'apply ablative corru shielding'",
        onUse: () => `'[STAT::amtBP] ${env?.rpg?.is2D ? "[STATUS::repairs]" : ''} to nearby allies'`,
    }

    /* - special_strong_barrier_allies - */

    env.ACTIONS.special_strong_barrier_allies.name = "" // Responsive Armor
    env.ACTIONS.special_strong_barrier_allies.usage = {
        "act": "%USER SHIELDS THEIR ALLIES"
    }
    env.ACTIONS.special_strong_barrier_allies.details = {
        "flavor": "'break open satik cyst';'utilize rapid temporary ablative barrier applicators'",
        onUse: () => `'[STAT::amtBP] to nearby allies'`,
    }

    /* - special_restorative_barrier - */

    env.ACTIONS.special_restorative_barrier.name = "" // Mending Cover
    env.ACTIONS.special_restorative_barrier.usage = {
        "act": "%USER SHIELDS THEIR ALLIES"
    }
    env.ACTIONS.special_restorative_barrier.details = {
        "flavor": "'broadly apply ablative protection';'upgraded barrier mends wounds while active'",
        "onUse": "'[STAT::amtBP] [STATUS::repairs] to nearby allies'"
    }

    /* - incoherent_gundown - */

    env.ACTIONS.incoherent_gundown.name = "" // BSTRD BULLETS
    env.ACTIONS.incoherent_gundown.desc = "" // BATTLEFIELD 100% -1HP per hit
    env.localization.strings["%USER AIMS AT %TARGET"] = ""

    /* - special_fullauto - */

    env.ACTIONS.special_fullauto.name = "" // Full Auto
    env.ACTIONS.special_fullauto.usage = {
        "act": "%USER OPENS FIRE"
    }
    env.ACTIONS.special_fullauto.details = {
        "flavor": "'utilize automatic rifle';'rapid inaccurate attacks'",
        "onUse": "'HIT random foes 6 times'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::vulnerable]'"
    }

    /* - special_fullauto_player - */

    env.ACTIONS.special_fullauto_player.name = "" // Full Auto
    env.ACTIONS.special_fullauto_player.usage = {
        "act": "%USER OPENS FIRE"
    }
    env.ACTIONS.special_fullauto_player.details = {
        "flavor": "'utilize symbotic rifle';'rapid inaccurate attacks';'consumes HP for munitions'",
        "onUse": "'HIT random foes 6 times';'[STAT::amt] to self'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::vulnerable]'"
    }

    /* - movefriend_attack - */

    env.ACTIONS.movefriend_attack.name = "" // Broadcast
    env.ACTIONS.movefriend_attack.desc = "" // 'directly seize control of corrucystic organs';'chance to utilize target as signal amplifier'
    env.ACTIONS.movefriend_attack.help = "" // 75% -2HP +1T:PUNCTURE, 30%C (FOES::-1HP +2T:VULNERABLE)
    env.ACTIONS.movefriend_attack.usage = {
        "act": "%USER'S SIGIL WARPS STRANGELY",
        "crit": "THE WHOLE TEAM FEELS ILL",
        "hit": "%TARGET'S FLESH REVOLTS",
        "miss": "%TARGET RECOILS SAFELY"
    }

    /* - special_mass_destabilize - */

    env.ACTIONS.special_mass_destabilize.name = "" // destabilize thoughtspace
    env.ACTIONS.special_mass_destabilize.usage = {
        "act": "THE THOUGHTSPACE GROWS VIOLENT"
    }
    env.ACTIONS.special_mass_destabilize.details = {
        "flavor": "'afflict all nearby entities with incoherence'",
        "onUse": "'[STATUS::destabilized] to all actors'"
    }

    /* - special_movefriend_annihilate - */

    env.ACTIONS.special_movefriend_annihilate.name = "" // Annihilation
    env.ACTIONS.special_movefriend_annihilate.desc = "" // 'utilize the walls to crush a target'
    env.ACTIONS.special_movefriend_annihilate.help = "" // CHOOSE::100% -2HP ::OR:: 50% -2HP 50%C -2HP +1T:STUN
    env.ACTIONS.special_movefriend_annihilate.usage = {
        "act": "THE WALLS GREW HOSTILE AROUND %TARGET",
        "crit": "%TARGET BARELY STANDS",
        "hit": "%TARGET DID THEIR BEST",
        "miss": "%TARGET ESCAPED BY A HAIR"
    }
    env.localization.strings["THE WALLS SHIFT AROUND %TARGET"] = ""
    env.localization.strings[`The walls close in around милтза`] = ""
    env.localization.strings[`The walls close in around тозик`] = ""
    env.localization.strings[`The walls close in around`] = ""
    env.localization.strings["Withstand the attack"] = ""
    env.localization.strings["NOTE::'100% -2HP'"] = ""
    env.localization.strings["Try a risky dodge"] = ""
    env.localization.strings["NOTE::'50% -2HP 50%C -2HP +1T:STUN'"] = ""

    /* - special_archiveshelf_annihilate - */

    env.ACTIONS.special_archiveshelf_annihilate.name = "" // Annihilation
    env.ACTIONS.special_archiveshelf_annihilate.desc = "" // 'utilize long limbs to eviscerate a target'
    env.ACTIONS.special_archiveshelf_annihilate.help = "" // CHOOSE::100% -3HP ::OR:: 50% -2HP 50%C -2HP +1T:STUN +2T:PUNCTURE
    env.ACTIONS.special_archiveshelf_annihilate.usage = {
        "act": "%USER LUNGES AT %TARGET",
        "crit": "%TARGET IS BRUTALLY STABBED",
        "hit": "%TARGET TAKES A SOLID HIT",
        "miss": "%TARGET ESCAPED BY A HAIR"
    }
    env.ACTIONS.special_archiveshelf_annihilate.details = {
        "onUse": "'present target foe a choice of outcome'",
        "conditional": "<em>HIT 1</em>::'HIT::[STAT::hit1ACC]% CRIT::0% [STAT::hit1HP]'\\n<em>HIT 2</em>::'HIT::[STAT::hit2ACC]% CRIT::[STAT::hit2CRIT]% [STAT::hit2HP]';'[STATUS::stun] [STATUS::puncture] on CRIT'"
    }
    env.localization.strings[`The shelf lunges at тозик`] = ""
    env.localization.strings[`The shelf lunges at`] = ""
    env.localization.strings["NOTE::'100% -3HP'"] = ""
    env.localization.strings["NOTE::'50% -2HP 50%C -2HP +1T:STUN +2T:PUNCTURE'"] = ""

    /* - incoherent_movefriend - */

    env.ACTIONS.incoherent_movefriend.name = "" // Wallspikes
    env.ACTIONS.incoherent_movefriend.desc = "" // 'k̶̡̇̄i̵͈͑̐̑̌̈́̇̾̕͝l̷̡͓̬̩̖̽̂̿̏͒̎̽̏̀̿̏̅̈l̵̯̦̪͠'
    env.ACTIONS.incoherent_movefriend.help = "" // BATTLEFIELD 300% -1HP
    env.localization.strings["THE WALLS TWIST AROUND THE WHOLE TEAM"] = ""

    /* - windup - */

    env.ACTIONS.windup.name = "" // Preparation
    env.ACTIONS.windup.usage = {
        "act": "%USER PREPARES AN ATTACK..."
    }
    env.ACTIONS.windup.details = {
        "flavor": "'prepare a devastating attack'",
        "onUse": "'[STATUS::windup]'"
    }

    /* - windup_cover - */

    env.ACTIONS.windup_cover.name = "" // Take Aim
    env.ACTIONS.windup_cover.usage = {
        "act": "%USER PREPARES AN ATTACK..."
    }
    env.ACTIONS.windup_cover.details = {
        "flavor": "'prepare devastating attack';'stay low';'lose windup if attention diverted'",
        "onUse": "'[STATUS::windup] [STATUS::evasion]'"
    }

    /* - focused_windup - */

    env.ACTIONS.focused_windup.name = "" // Extra Preparation
    env.ACTIONS.focused_windup.usage = {
        "act": "%USER WAITS FOR THE RIGHT MOMENT..."
    }
    env.ACTIONS.focused_windup.details = {
        "onUse": "'[STATUS::windup] [STATUS::evasion] [STATUS::focused]'",
        "flavor": "'hold prepared attack';'look for opportunity'"
    }

    /* - hold_aim - */

    env.ACTIONS.hold_aim.name = "" // Hold Aim
    env.ACTIONS.hold_aim.usage = {
        "act": "%USER WAITS FOR THE RIGHT MOMENT..."
    }
    env.ACTIONS.hold_aim.details = {
        "onUse": "'[STATUS::windup] [STATUS::evasion] [STATUS::focused]'",
        "flavor": "'hold prepared attack';'look for opportunity'"
    }

    /* - archival_smash - */

    env.ACTIONS.archival_smash.name = "" // Calculated Strike
    env.ACTIONS.archival_smash.desc = "" // 'focused, deadly attack upon one target';'immense physical trauma'
    env.ACTIONS.archival_smash.help = "" // 100% -4HP, 40% X2 +1T:STUN
    env.ACTIONS.archival_smash.usage = {
        "act": "%USER CHARGES %TARGET",
        "crit": "%TARGET IS LEFT REELING",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.archival_smash.details = {
        "flavor": "'focused, deadly attack upon one target';'immense physical trauma'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - kivii_grasp - */

    env.ACTIONS.kivii_grasp.name = "" // Grasp
    env.ACTIONS.kivii_grasp.usage = {
        "act": "%USER GRASPS AT %TARGET",
        "crit": "%TARGET IS CRUSHED",
        "hit": "%TARGET IS CAUGHT",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.kivii_grasp.details = {
        "flavor": "'utilize gauntlet';'immobilize and crush target';'leave critically open to attack'",
        "onUse": "'[STAT::amt] [STAT::vulnerable]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - rez - */

    env.ACTIONS.rez.name = "" // Unfair Advantage
    env.ACTIONS.rez.usage = {
        "act": "%USER BRINGS %TARGET BACK TO THEIR FEET",
        "hit": "%TARGET IS READY TO FIGHT",
        "crit": "%TARGET GETS A SECOND WIND"
    }
    env.ACTIONS.rez.details = {
        "flavor": "'repair ally to fighting condition';'used only as last resort'",
        "onUse": "'revive target at [STAT::percentage]%HP'"
    }

    /* - husk_attack - */

    env.ACTIONS.husk_attack.name = "" // Familiar Strike
    env.ACTIONS.husk_attack.usage = {
        "act": "%USER SPRINTS AT %TARGET",
        "crit": "%TARGET FACES THEIR MORTALITY",
        "hit": "%TARGET IS STRUCK WITH BROKEN LIMBS",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.husk_attack.details = {
        "flavor": "'utilized warped limbs to strike target';'occasionally terrifying'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::fear] to all foes'"
    }

    /* - husk_attack_weak - */

    env.ACTIONS.husk_attack_weak.name = "" // Psychosis
    env.ACTIONS.husk_attack_weak.desc = "" // 'manifest imagined attack directly in flesh';'occasionally terrifying'
    env.ACTIONS.husk_attack_weak.help = "" // 50% -1HP, 10%C x2 + (FOES::+2T:FEAR)
    env.ACTIONS.husk_attack_weak.usage = {
        "act": "%USER SPRINTS AT %TARGET",
        "crit": "%TARGET FACES THEIR MORTALITY",
        "hit": "%TARGET IS STRUCK, BUT BY WHAT?",
        "miss": "%TARGET EVADES"
    }

    /* - speak - */

    env.ACTIONS.speak.name = "" // Speak
    env.ACTIONS.speak.usage = {
        "act": "%USER APPROACHES %TARGET",
        "crit": "%TARGET IS PARALYZED BY FEAR",
        "hit": "%USER WHISPERS SOMETHING TO %TARGET",
        "miss": "%TARGET RECOILS"
    }
    env.ACTIONS.speak.details = {
        "flavor": "'utilize remains to speak';'express aggressor signal directly'",
        "onHit": "'[STATUS::fear]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - berserk - */

    env.ACTIONS.berserk.name = "" // Berserk
    env.ACTIONS.berserk.help = "" // +1T:DESTABILIZE +2T:SPIKES +2T:VULNERABLE
    env.ACTIONS.berserk.usage = {
        "act": "%USER MELTS INTO A MORE AGGRESSIVE SHAPE"
    }
    env.ACTIONS.berserk.details = {
        "flavor": "'self-modify for maximum offense';'destabilize form and react to attacks'",
        "onUse": "[STATUS::destabilized] [STATUS::spikes] [STATUS::vulnerable]"
    }

    /* - special_self_destruct - */

    env.ACTIONS.special_self_destruct.name = "" // Self Destruct
    env.ACTIONS.special_self_destruct.desc = "" // 'form shrapnel in body';'propel through unsustainable means'
    env.ACTIONS.special_self_destruct.help = "" // FOES::50% -1HP, 100% SELF -1HP
    env.ACTIONS.special_self_destruct.usage = {
        "act": "%USER JUST EXPLODES"
    }
    env.ACTIONS.special_self_destruct.details = {
        "flavor": "'form shrapnel in body';'propel through unsustainable means'",
        "onUse": "'HIT all foes';'[STAT::amt] to self'",
        "onHit": "'[STAT::amt]'"
    }

    /* - special_dullsummon - */

    env.ACTIONS.special_dullsummon.name = "" // Dull Portal
    env.ACTIONS.special_dullsummon.details = {
        "flavor": "'collect additional allies from elsewhere'",
        "conditional": "<em>SUMMON::</em>'summon 2 dull containers (max:7)'"
    }
    env.localization.strings["%USER CONJURES CONTAINERS VIA THE DULL"] = ""

    /* - special_dullbuff - */

    env.ACTIONS.special_dullbuff.name = "" // Dull Overload
    env.ACTIONS.special_dullbuff.desc = "" // '
    env.ACTIONS.special_dullbuff.help = "" // ALLIES::+1T:DESTABILIZED, +1T:FOCUSED
    env.ACTIONS.special_dullbuff.usage = {
        "act": "%USER FLOODS THEIR ALLIES WITH DULL LIGHT"
    }
    env.ACTIONS.special_dullbuff.details = {
        "flavor": "'destabilize allies via dull exposure';'attain direct control and focus attack'",
        "onUse": "'[STATUS::destabilized] [STATUS::focused] to all allies'"
    }

    /* - special_chant - */

    env.ACTIONS.special_chant.name = "" // █████
    env.ACTIONS.special_chant.desc = "" // '██████ ███ █████';'convey malignant thoughtforms via speech'
    env.ACTIONS.special_chant.help = "" // FOES::80% -1HP, 30% x2 +1T:WEAKENED SUMMON::+1 HALLUCINATION (MAX:4)
    env.ACTIONS.special_chant.usage = {
        "act": "%USER ██████ ███ █████"
    }

    /* - incoherent_golemboss - */

    env.ACTIONS.incoherent_golemboss.name = "" // GOLEM BRAWL
    env.ACTIONS.incoherent_golemboss.desc = "" // MELEE FOE_KO::'-20HP' ALLY_KO::'-3HP'
    env.localization.strings["%USER RAISES ITS GAUNTLETS"] = ""
    env.localization.strings["IS STRUCK DOWN"] = ""
    env.localization.strings["%TARGET IS HURT IN THE CHAOS"] = ""
    env.localization.strings["%TARGET AND %USER ARE BOTH HURT IN THE CHAOS"] = ""
    env.localization.strings[`keep fighting!!`] = ""
    env.localization.strings[`you can do this`] = ""
    env.localization.strings[`it is falling apart! just one more time!`] = ""

    /* - special_steerleft - */

    env.ACTIONS.special_steerleft.name = "" // Steer Left
    env.ACTIONS.special_steerleft.usage = {
        "act": "%USER STEERS THE VESSEL LEFT"
    }
    env.ACTIONS.special_steerleft.details = {
        "flavor": "'direct vessel to the left of current direction';'beware of momentum';'cannot exceed frame bounds'",
        "conditional": "<em>VESSEL</em>::STEER LEFT"
    }

    /* - special_steerright - */

    env.ACTIONS.special_steerright.name = "" // Steer Right
    env.ACTIONS.special_steerright.usage = {
        "act": "%USER STEERS THE VESSEL RIGHT"
    }
    env.ACTIONS.special_steerright.details = {
        "flavor": "'direct vessel to the right of current direction';'beware of momentum';'cannot exceed frame bounds'",
        "conditional": "<em>VESSEL</em>::STEER RIGHT"
    }

    /* - special_floorit - */

    env.ACTIONS.special_floorit.name = "" // Floor It
    env.ACTIONS.special_floorit.usage = {
        "act": "%USER FLOORS IT"
    }
    env.ACTIONS.special_floorit.details = {
        "flavor": "'direct vessel to move further instead of attacking'",
        "conditional": "<em>VESSEL</em>::GO FASTER"
    }

    /* - sidearm - */

    env.ACTIONS.sidearm.name = "" // Sidearm
    env.ACTIONS.sidearm.verb = "" // shoot
    env.ACTIONS.sidearm.usage = {
        "act": "%USER FIRES AT %TARGET",
        "crit": "%TARGET IS LEFT REELING",
        "hit": "%TARGET IS STRUCK",
        "miss": "%USER MISSES"
    }
    env.ACTIONS.sidearm.details = {
        "flavor": "'utilize high-caliber sidearm';'chance for immense physical trauma'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - unfocused_shot - */

    env.ACTIONS.unfocused_shot.name = "" // Hip Shot
    env.ACTIONS.unfocused_shot.verb = "" // shoot
    env.ACTIONS.unfocused_shot.usage = {
        "act": "%USER FIRES AT %TARGET",
        "crit": "%TARGET TAKES A BIG HIT",
        "hit": "%TARGET IS STRUCK",
        "miss": "%USER MISSES"
    }
    env.ACTIONS.unfocused_shot.details = {
        "flavor": "'fire without intense aim';'could hit';'a gamble'",
        "onHit": "'[STAT::amt]'"
    }

    /* - focused_shot - */

    env.ACTIONS.focused_shot.name = "" // Focused Shot
    env.ACTIONS.focused_shot.verb = "" // shoot
    env.ACTIONS.focused_shot.usage = {
        "act": "%USER FIRES AT %TARGET",
        "crit": "%TARGET IS TORN APART",
        "hit": "%TARGET TAKES A BIG HIT",
        "miss": "%USER MISSES"
    }
    env.ACTIONS.focused_shot.details = {
        "flavor": "'well-placed high-caliber shot';'immense physical trauma'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::vulnerable] [STATUS::stun] [STATUS::critical_flaw]'"
    }

    /* - primary - */

    env.ACTIONS.primary.name = "" // Attack
    env.ACTIONS.primary.usage = {
        "act": "%USER ATTACKS %TARGET",
        "crit": "A FRIGHTENING BLOW",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.primary.details = {
        "flavor": "'improvised attack using scenery';'may accidentally cause effective trauma'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'inflict one of following';'[STATUS::puncture]';'[STATUS::weakened]';'[STATUS::vulnerable]'"
    }

    /* - secondary - */

    env.ACTIONS.secondary.name = "" // Daze
    env.ACTIONS.secondary.usage = {
        "act": "%USER LEAPS AT %TARGET",
        "crit": "%TARGET IS LEFT REELING",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.secondary.details = {
        "flavor": "'a crude and unpracticed strike';'attempt to disorient target'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - daze_lastresort - */

    env.ACTIONS.daze_lastresort.name = "" // Bash
    env.ACTIONS.daze_lastresort.usage = {
        "act": "%USER SWINGS AT %TARGET",
        "crit": "%TARGET IS LEFT REELING",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.daze_lastresort.details = {
        "flavor": "'last resort attack';'swing self'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - daze_good - */

    env.ACTIONS.daze_good.name = "" // Throw It
    env.ACTIONS.daze_good.verb = "" // throw at
    env.ACTIONS.daze_good.help = "" // 80% -1HP, 60%C x2 +1T:STUN
    env.ACTIONS.daze_good.usage = {
        "act": "%USER THROWS SOMETHING AT %TARGET",
        "crit": "%TARGET IS KNOCKED DOWN",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.daze_good.details = {
        "flavor": "'a spirited overhead throw';'likely to stun target with item weight'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - sacrifice - */

    env.ACTIONS.sacrifice.name = "" // Offering
    env.ACTIONS.sacrifice.usage = {
        "act": "%USER PREPARES FOR DESPERATE MEASURES"
    }
    env.ACTIONS.sacrifice.details = {
        "flavor": "'empowers next move greatly';'optionally use HP for revival'",
        "onUse": "'[STATUS::sacrifice] [STATUS::evasion]'"
    }

    /* - special_final_sacrifice - */

    env.ACTIONS.special_final_sacrifice.name = "" // Final Offering
    env.ACTIONS.special_final_sacrifice.usage = {
        "act": "%USER GOES IN A BLAZE OF GLORY"
    }
    env.ACTIONS.special_final_sacrifice.details = {
        "flavor": "'extend self beyond limits';'spend own health for total destruction'",
        "onUse": "'[STATUS::evasion] [STATUS::sacrifice]';'[STATUS::empowered] to all allies';'HIT all foes via SPECIAL'",
        "conditional": "<em>SPECIAL::</em>'reduce user HP to 1, dealing 200% lost HP as damage split over living foes (min:1)'"
    }

    /* - sacrifice_restore - */

    env.ACTIONS.sacrifice_restore.name = "" // Sacrifice
    env.ACTIONS.sacrifice_restore.verb = "" // sacrifice for
    env.ACTIONS.sacrifice_restore.usage = {
        "act": "%USER FIXES UP %TARGET",
        "crit": "%TARGET FEELS WAY BETTER",
        "hit": "%TARGET FEELS BETTER",
        "miss": "%TARGET IS TOO SLIPPERY"
    }
    env.ACTIONS.sacrifice_restore.details = {
        "flavor": "'consume health to restore target';'requires offering'",
        "onUse": "'[STAT::selfHP] to self'",
        "onHit": "'[STAT::amt] [STATUS::regen]'",
        "onCrit": "'additional [STAT::amt] [STATUS::regen]'",
        "conditional": "<em>VS DOWN::</em>'revive target';'[STATUS::evasion] [STATUS::regen]'"
    }

    /* - ichor_passive_restore - */

    env.ACTIONS.ichor_passive_restore.name = "" // Our Last Stand
    env.ACTIONS.ichor_passive_restore.usage = {
        "act": "%USER PULLS %TARGET BACK UP",
        "hit": "%TARGET HAS ONE MORE CHANCE"
    }
    env.ACTIONS.ichor_passive_restore.details = {
        "flavor": "'not over yet'",
        "onUse": "'revive target';'[STAT::amt] [STAT::amtBP] [STATUS::evasion] to target'"
    }

    /* - surge - */

    env.ACTIONS.surge.name = "" // Surge
    env.ACTIONS.surge.usage = {
        "act": "%USER IS ENERGIZED"
    }
    env.ACTIONS.surge.details = {
        onUse: () => `'[STATUS::focused] [STATUS::surge]'`,
        "flavor": "'charge forward without worry'"
    }
    env.ACTIONS.surge.disableIf = (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" }

    /* - wild_surge - */

    env.ACTIONS.wild_surge.name = "" // Wild Surge
    env.ACTIONS.wild_surge.usage = {
        "act": "%USER IS ENERGIZED"
    }
    env.ACTIONS.wild_surge.details = {
        "onUse": "'gain [STATUS::focused] [STATUS::wild_surge]'",
        "flavor": "'overexert self for extreme effectiveness';'next targeted action is used across entire team';'exertion causes short stun'"
    }
    env.ACTIONS.wild_surge.disableIf = (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" }

    /* - exploit - */

    env.ACTIONS.exploit.name = "" // Exploit
    env.ACTIONS.exploit.usage = {
        "act": "%USER REACHES TOWARDS %TARGET",
        "crit": "%TARGET FALLS APART",
        "hit": "%TARGET'S FLESH MELTS AWAY",
        "miss": "%TARGET RESISTS CONTROL"
    }
    env.ACTIONS.exploit.details = {
        "flavor": "'locate or take advantage of vulnerability in foe'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::vulnerable]'",
        "conditional": "<em>VS VULNERABLE::</em>'additional [STAT::amt]'"
    }

    /* - coordination - */

    env.ACTIONS.coordination.name = "" // Coordination
    env.ACTIONS.coordination.usage = {
        "act": "%USER CALLS OUT DIRECTIONS"
    }
    env.ACTIONS.coordination.details = {
        "flavor": "'back off';'guide entire team'",
        "onUse": "'[STATUS::evasion] to self';'[STATUS::focused] to all allies'"
    }
    env.ACTIONS.coordination.disableIf = (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" }

    /* - plot - */

    env.ACTIONS.plot.name = "" // Plan
    env.ACTIONS.plot.usage = {
        "act": "%USER WATCHES CAREFULLY"
    }
    env.ACTIONS.plot.details = {
        "flavor": "'hide vulnerability';'prepare great opportunity'",
        "onUse": "'[STATUS::evasion] [STATUS::focused]'"
    }
    env.ACTIONS.plot.disableIf = (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" }

    /* - special_enact - */

    env.ACTIONS.special_enact.name = "" // Enact
    env.ACTIONS.special_enact.verb = "" // enact upon
    env.ACTIONS.special_enact.details = {
        "flavor": "'enact plan';'unleash flurry of strikes upon foes'",
        "onUse": "'use primary action on random foes per T:[STATUS::evasion]';'lose all [STATUS::evasion]'"
    }
    env.localization.strings["%USER LAUNCHES THEIR ATTACK"] = ""
    env.ACTIONS.special_enact.disableIf = (actor)=>{ if(!hasStatus(actor,"evasion")) return "REQUIRES EVASION" }

    /* - mad_claw - */

    env.ACTIONS.mad_claw.name = "" // Mad Claw
    env.ACTIONS.mad_claw.verb = "" // claw at
    env.ACTIONS.mad_claw.usage = {
        "act": "%USER ATTACKS %TARGET",
        "crit": "A FRIGHTENING BLOW",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.mad_claw.details = {
        "flavor": "'utilize unpredictable weaponry';'guarantee of trauma'",
        "onHit": "'[STAT::amt]';'inflict one of following';'[STATUS::destabilized]';'[STATUS::fear]';'[STATUS::stun]'"
    }

    /* - revise - */

    env.ACTIONS.revise.name = "" // Revise
    env.ACTIONS.revise.usage = {
        "act": "%USER GRASPS BEYOND %TARGET",
        "crit": "A FRIGHTENING BLOW",
        "hit": "%TARGET FEELS SOMETHING TORN AWAY",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.revise.details = {
        "flavor": "'strike at foes and grasp beyond flesh'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'<em>invert target's beneficial statuses</em>'"
    }

    /* - bone_break - */

    env.ACTIONS.bone_break.name = "" // Bone Break
    env.ACTIONS.bone_break.usage = {
        "act": "%USER JABS AT %TARGET'S WEAPONRY",
        "crit": "%TARGET IS CRIPPLED",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.bone_break.details = {
        "flavor": "'strike offensive appendages of target';'chance to briefly weaken attacks and disorient'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::weakened] [STATUS::stun]'"
    }

    /* - special_invite_storm - */

    env.ACTIONS.special_invite_storm.name = "" // Invite Storm
    env.ACTIONS.special_invite_storm.usage = {
        "act": "%USER SPEAKS MADNESS"
    }
    env.ACTIONS.special_invite_storm.details = {
        "flavor": "'reveal a terrible truth';'mark self for death'",
        "onUse": "'[STATUS::destabilized] [STATUS::vulnerable]';'HIT all foes'",
        "onHit": "'inflict one of following';'[STATUS::destabilized]';'[STATUS::fear]';'[STATUS::stun]'",
        "conditional": "<em>SPECIAL::</em>'5% chance to reduce foe HP by 75%'"
    }
    env.localization.strings["PERISH"] = ""

    /* - special_invoke_madness - */

    env.ACTIONS.special_invoke_madness.name = "" // Invoke Madness
    env.ACTIONS.special_invoke_madness.usage = {
        "act": "%USER SPEAKS MADNESS"
    }
    env.ACTIONS.special_invoke_madness.details = {
        "flavor": "'impart horrific knowledge';'afflict foes with fear and madness'",
        "onUse": "'[STATUS::destabilized]';'HIT all foes'",
        "onHit": "'[STATUS::fear] [STATUS::madness]'",
        "conditional": "<em>SPECIAL::</em>'5% chance to reduce foe HP by 75%'"
    }

    /* - special_inversion - */

    env.ACTIONS.special_inversion.name = "" // Inversion
    env.ACTIONS.special_inversion.usage = {
        "act": "%USER PUSHES AGAINST THEIR REALITY"
    }
    env.ACTIONS.special_inversion.details = {
        "flavor": "'grasp the nature of this place';'recognize and exploit framing device'",
        "onUse": "'[STATUS::incoherent]';'invert all statuses currently in play'"
    }

    /* - attack_weak - */

    env.ACTIONS.attack_weak.name = "" // Weak Attack
    env.ACTIONS.attack_weak.usage = {
        "act": "%USER ATTACKS %TARGET",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.attack_weak.details = {
        "flavor": "'unskilled strike'",
        "onHit": "'[STAT::amt]'"
    }

    /* - enforce - */

    env.ACTIONS.enforce.name = "" // Enforcement
    env.ACTIONS.enforce.usage = {
        "act": "%USER STABS %TARGET",
        "crit": "%USER JUST KEEPS GOING",
        "hit": "%TARGET BLEEDS SLUDGY CORRU",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.enforce.details = {
        "flavor": "'relentless assault with positioning appendages';'may inspire additional smashing'",
        "onHit": "'[STAT::amt] [STATUS::puncture] [STATUS::open_wound]'",
        "onCrit": "'use this action again'"
    }

    /* - focused_guard - */

    env.ACTIONS.focused_guard.name = "" // Intervene
    env.ACTIONS.focused_guard.usage = {
        "act": "%USER STANDS BEFORE %TARGET",
        "hit": "%TARGET IS SHIELDED BY %USER"
    }
    env.ACTIONS.focused_guard.details = {
        "flavor": "'stand in the way of target';'intercept incoming attack';'prepare to deliver destructive assault'",
        "onUse": "'[STATUS::focused]';'[STATUS::redirection] to target'"
    }
    env.ACTIONS.focused_guard.disableIf = (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" }

    /* - spikes - */

    env.ACTIONS.spikes.name = "" // Spikes
    env.ACTIONS.spikes.usage = {
        "act": "%USER PREPARES TO TAKE A HIT"
    }
    env.ACTIONS.spikes.details = {
        "onUse": "'modify form defensively';'[STATUS::spikes]'"
    }
    env.ACTIONS.spikes.disableIf = (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" }

    /* - siphon - */

    env.ACTIONS.siphon.name = "" // Siphon
    env.ACTIONS.siphon.usage = {
        "act": "%USER GRASPS AT %TARGET",
        "crit": "%TARGET'S TEAM IS INFESTED",
        "hit": "%TARGET IS INFESTED",
        "miss": "%TARGET DODGES"
    }
    env.ACTIONS.siphon.details = {
        "flavor": "'tap vital corru of target to sustain allies'",
        "onHit": "'[STATUS::siphon]'"
    }
    env.ACTIONS.siphon.disableIf = (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" }

    /* - bite - */

    env.ACTIONS.bite.name = "" // Bite
    env.ACTIONS.bite.usage = {
        "act": "%USER BITES %TARGET",
        "hit": "%TARGET FEELS HORRIBLE"
    }
    env.ACTIONS.bite.details = {
        "flavor": "'become unreasonable';'transfer illness'",
        "onHit": "'[STAT::amt] [STATUS::rot]';'tranafer accumulated rot to target'"
    }

    /* - empower - */

    env.ACTIONS.empower.name = "" // Empower
    env.ACTIONS.empower.usage = {
        "act": "%USER AFFIXES SOMETHING TO %TARGET",
        "hit": "%TARGET FEELS STRONGER",
        "miss": "%TARGET IS TOO SLIPPERY"
    }
    env.ACTIONS.empower.details = {
        "flavor": "'grant short-lived performance applicator';'fragile adaptive device'",
        "onHit": "'[STATUS::empowered]'"
    }
    env.ACTIONS.empower.disableIf = (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" }

    /* - distraction_weak - */

    env.ACTIONS.distraction_weak.name = "" // Distraction
    env.ACTIONS.distraction_weak.usage = {
        "act": "%USER FEINTS AND STRIKES %TARGET",
        "crit": "%USER'S ALLIES ARE INSPIRED",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET DODGES"
    }
    env.ACTIONS.distraction_weak.details = {
        "flavor": "'strike with clever feint';'may create distraction'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::evasion] to all allies'"
    }

    /* - lesser_wound - */

    env.ACTIONS.lesser_wound.name = "" // Wound
    env.ACTIONS.lesser_wound.usage = {
        "act": "%USER CHARGES %TARGET",
        "crit": "%TARGET IS LEFT REELING",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.lesser_wound.details = {
        "flavor": "'focused attack on vitals';'increase pain of target'",
        "onHit": "'[STAT::amt] [STATUS::open_wound]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - wound - */

    env.ACTIONS.wound.name = "" // Greater Wound
    env.ACTIONS.wound.usage = {
        "act": "%USER CHARGES %TARGET",
        "crit": "%TARGET IS LEFT REELING",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.wound.details = {
        "flavor": "'focused attack on vitals';'increase pain of target'",
        "onHit": "'[STAT::amt] [STATUS::open_wound]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - wound_lastresort - */

    env.ACTIONS.wound_lastresort.name = "" // Greater Wound
    env.ACTIONS.wound_lastresort.usage = {
        "act": "%USER CHARGES %TARGET",
        "crit": "%TARGET IS LEFT REELING",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.wound_lastresort.details = {
        "flavor": "'focused attack on vitals';'increase pain of target';'last resort attack'",
        "onHit": "'[STAT::amt] [STATUS::open_wound]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - special_barrier_allies_weak - */

    env.ACTIONS.special_barrier_allies_weak.name = "" // Quick Cover
    env.ACTIONS.special_barrier_allies_weak.usage = {
        "act": "%USER SHIELDS THEIR ALLIES"
    }
    env.ACTIONS.special_barrier_allies_weak.details = {
        "flavor": "'apply ablative protection'",
        onUse: () => `'[STAT::amtBP] to nearby allies'`,
    }
    env.ACTIONS.special_barrier_allies_weak.disableIf = (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" }

    /* - special_carapace_allies - */

    env.ACTIONS.special_carapace_allies.name = "" // Reinforce
    env.ACTIONS.special_carapace_allies.usage = {
        "act": "%USER ARMORS THEIR ALLIES"
    }
    env.ACTIONS.special_carapace_allies.details = {
        "flavor": "'adapt allies to incoming attacks'",
        "onUse": "'[STATUS::carapace] to all allies'"
    }

    /* - special_judgement - */

    env.ACTIONS.special_judgement.name = "" // Continuous Rewrite
    env.ACTIONS.special_judgement.usage = {
        "act": "%USER TURNS THE MEMORY AGAINST YOU"
    }
    env.ACTIONS.special_judgement.details = {
        "flavor": "'utilize thoughtspace influence to empower massive strike'",
        "onUse": "'[STATUS::windup]';'HIT all foes'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::destabilized] [STATUS::fear]"
    }
    env.localization.strings[`stays wound up!`] = ""

    /* - special_rule - */

    env.ACTIONS.special_rule.name = "" // Continuous Adjustment
    env.ACTIONS.special_rule.usage = {
        "act": "%USER SHIFTS THE BALANCE"
    }
    env.ACTIONS.special_rule.details = {
        "flavor": "'utilize status control to empower and repair team';'afflict opponents with critical vulnerability'",
        "conditional": "<em>SELF::'</em>[STATUS::windup]'\n<em>ALLIES::</em>'[STAT::amtBP] [STATUS::repairs] [STATUS::empowered]'\n<em>FOES::</em>'[STAT::amt] [STATUS::vulnerable] [STATUS::critical_flaw]'"
    }

    /* - special_chant_mega - */

    env.ACTIONS.special_chant_mega.name = "" // New Process
    env.ACTIONS.special_chant_mega.usage = {
        "act": "%USER DRAWS IN RESOURCES"
    }
    env.ACTIONS.special_chant_mega.details = {
        "flavor": "'remove resources from foes to create new daemon processes'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::weakened]'",
        "conditional": "<em>SUMMON::</em>'+1 hallucination (max:4)'"
    }

    /* - husk_attack_rot - */

    env.ACTIONS.husk_attack_rot.name = "" // Psychosis
    env.ACTIONS.husk_attack_rot.usage = {
        "act": "%USER STINGS %TARGET",
        "crit": "%TARGET BLEEDS A STRANGE COLOR",
        "hit": "%TARGET FEELS STRANGE",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.husk_attack_rot.details = {
        "flavor": "'inject memory with destructive thoughts';'eat away at foes from inside'",
        "onHit": "'[STAT::amt] [STATUS::rot]'",
        "onCrit": "'additional [STATUS::rot]';'[STATUS::fear] to all foes'"
    }

    /* - special_sillyspawn - */

    env.ACTIONS.special_sillyspawn.name = "" // Entertainment
    env.ACTIONS.special_sillyspawn.details = {
        "flavor": "'fetch actors from elsewhere to fight';'strength affected by tension'",
        "conditional": "<em>SUMMON::</em>'+1 random foe (max:6), +1 if user HP <50% max'"
    }
    env.localization.strings["%USER CALLS ACTORS TO THE STAGE"] = ""

    /* - special_sillybuff - */

    env.ACTIONS.special_sillybuff.name = "" // Entertainment
    env.ACTIONS.special_sillybuff.desc = "" // 'destabilize allies';'attain direct control and focus attack'
    env.ACTIONS.special_sillybuff.help = "" // ALLIES::+1T:DESTABILIZED, +1T:FOCUSED
    env.ACTIONS.special_sillybuff.usage = {
        "act": "%USER RAISES THE STAKES"
    }
    env.ACTIONS.special_sillybuff.details = {
        "flavor": "'destabilize allies';'attain direct control and focus attack'",
        "onUse": "'[STATUS::destabilized] [STATUS::focused] to all allies'"
    }

    /* - special_wallspawn - */

    env.ACTIONS.special_wallspawn.name = "" // Antithesis
    env.ACTIONS.special_wallspawn.details = {
        "flavor": "'fetch actors from elsewhere to fight';'strength affected by tension'",
        "conditional": "<em>SUMMON::</em>'+2 random foes (max:6)'"
    }
        env.localization.strings["%USER WEAKLY CALLS FOR HELP"] = ""

    /* - special_wallspawn_boat - */

    env.ACTIONS.special_wallspawn_boat.name = "" // Antithesis
    env.ACTIONS.special_wallspawn_boat.details = {
        "flavor": "'call daemons to assist'",
        "conditional": "<em>SUMMON::</em>'+2 daemons (max:6)'"
    }

    /* - boat_clw_windup - */

    env.ACTIONS.boat_clw_windup.name = "" // Dive
    env.ACTIONS.boat_clw_windup.desc = "" // 'prepare to go for the wheel'
    env.ACTIONS.boat_clw_windup.help = "" // +WINDUP
    env.ACTIONS.boat_clw_windup.usage = {
        "act": "%USER CLAWS AT THE CONTROLS!!"
    }
    env.localization.strings["DONT LET THAT FC*K GET THE WHEEL"] = ""
    env.localization.strings["interloper! USE PISTOL!"] = ""

    /* - special_boat_clw_grab - */

    env.ACTIONS.special_boat_clw_grab.name = "" // Grab Wheel
    env.ACTIONS.special_boat_clw_grab.desc = "" // 'direct vessel in random direction'
    env.ACTIONS.special_boat_clw_grab.help = "" // VESSEL::RANDOM MOVEMENT
    env.localization.strings["%USER GRABS THE WHEEL AND STEERS LEFT"] = ""
    env.localization.strings["%USER GRABS THE WHEEL AND STEERS RIGHT"] = ""
    env.localization.strings[`%USER FORCES THE BOAT FORWARDS`] = ""

    /* - special_boat_waveattack - */

    env.ACTIONS.special_boat_waveattack.name = "" // Grab Wheel
    env.ACTIONS.special_boat_waveattack.desc = "" // 'direct vessel in random direction'
    env.ACTIONS.special_boat_waveattack.help = "" // VESSEL::RANDOM MOVEMENT
    env.localization.strings[`%USER CREATES TURBULENCE!!`] = ""
    env.localization.strings[`%USER REWRITES THE OCEAN...`] = ""

    /* - special_malware_drill - */

    env.ACTIONS.special_malware_drill.name = "" // CMD::DRILL
    env.ACTIONS.special_malware_drill.usage = {
        "act": "THE THOUGHTSPACE FEELS FLIMSY"
    }
    env.ACTIONS.special_malware_drill.details = {
        "flavor": "'alters framing structure'",
        "onUse": "'[STATUS::malware_drill] to all actors'"
    }

    /* - special_malware_rot - */

    env.ACTIONS.special_malware_rot.name = "" // CMD::ROT
    env.ACTIONS.special_malware_rot.usage = {
        "act": "THE THOUGHTSPACE WRITHES"
    }
    env.ACTIONS.special_malware_rot.details = {
        "flavor": "'alters framing structure'",
        "onUse": "'[STATUS::malware_rot] to all actors'"
    }

    /* - special_malware_rewrite - */

    env.ACTIONS.special_malware_rewrite.name = "" // CMD::REWRITE
    env.ACTIONS.special_malware_rewrite.desc = "" // 'invert negative statuses of allies';'invert positive statuses of foes'
    env.ACTIONS.special_malware_rewrite.help = "" // ALL::CONDITIONAL STATUS INVERSION
    env.ACTIONS.special_malware_rewrite.usage = {
        "act": "THE THOUGHTSPACE SEEMS BRIGHTER"
    }
    env.ACTIONS.special_malware_rewrite.details = {
        "flavor": "'alters framing structure'",
        "onUse": "'invert all beneficial statuses of foes';'invert all negative statuses of allies'"
    }

    /* - special_malware_empower - */

    env.ACTIONS.special_malware_empower.name = "" // CMD::EMPOWER
    env.ACTIONS.special_malware_empower.desc = "" // 'imbue allies with empowering thoughts'
    env.ACTIONS.special_malware_empower.help = "" // ALLIES::+3T:EMPOWERED +1T:FOCUSED +1T:EVASION
    env.ACTIONS.special_malware_empower.usage = {
        "act": "THE THOUGHTSPACE COWERS BEFORE YOU"
    }
    env.ACTIONS.special_malware_empower.details = {
        "flavor": "'alters framing structure'",
        "onUse": "'[STATUS::empowered] [STATUS::focused] [STATUS::evasion] to all allies'"
    }

    /* - intrusive_smash - */

    env.ACTIONS.intrusive_smash.name = "" // Unnatural Strike
    env.ACTIONS.intrusive_smash.help = "" // 100% -4HP, 40% X2 +1T:STUN +2T:OPEN WOUND +3T:VULNERABLE +CRITICAL FLAW
    env.ACTIONS.intrusive_smash.usage = {
        "act": "%USER CHARGES %TARGET",
        "crit": "%TARGET IS LEFT REELING",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.intrusive_smash.details = {
        "flavor": "'focused, deadly attack upon one target';'immense physical trauma'",
        "onHit": "'[STAT::amt] [STATUS::stun] [STATUS::open_wound] [STATUS::vulnerable] [STATUS::critical_flaw]'"
    }

    /* - special_intrusive - */

    env.ACTIONS.special_intrusive.name = "" // Intrude
    env.ACTIONS.special_intrusive.usage = {
        "act": "A GRIM GAMBLE IS MADE"
    }
    env.ACTIONS.special_intrusive.details = {
        "flavor": "'â«§âª¶ã¥¥ã³'",
        "onUse": "'SSP IN  THE WHEE L LL LL'"
    }
    env.localization.strings["LUCKY! CHA CHA"] = ""
    env.localization.strings["BAD TIM!::E NO,W!"] = ""
    env.localization.strings["BOOM :=)"] = ""
    env.localization.strings["THINK AGAIN"] = ""

    /* - special_intrusive_ally - */

    env.ACTIONS.special_intrusive_ally.name = "" // Gamble
    env.ACTIONS.special_intrusive_ally.usage = {
        "act": "A GRIM GAMBLE IS MADE"
    }
    env.ACTIONS.special_intrusive_ally.details = {
        "flavor": "'â«§âª¶ã¥¥ã³'",
        "onUse": "'SSP IN  THE WHEE L LL LL'"
    }

    /* - detonate - */

    env.ACTIONS.detonate.name = "" // Detonate
    env.ACTIONS.detonate.usage = {
        "act": "%USER EXPLODES NEAR %TARGET",
        "hit": "%TARGET IS DESTROYED"
    }
    env.ACTIONS.detonate.details = {
        "flavor": "'detonate to instantly destroy target'",
        "onHit": "'[STAT::amt]';'DOWN SELF'",
        "conditional": "<em>ONCE PER COMBAT</em>"
    }
    env.ACTIONS.detonate.disableIf = (actor)=>{ if(actor.detonated) return "ONCE PER COMBAT" }

    /* - incoherent_mimic - */

    env.ACTIONS.incoherent_mimic.name = "" // Mimic
    env.ACTIONS.incoherent_mimic.usage = {
        "act": "%USER MIMICS %TARGET",
        "hit": "%TARGET IS FLATTERED"
    }
    env.ACTIONS.incoherent_mimic.details = {
        "onUse": "'copy actions of target';'persists after combat';'some actions cannot be mimicked'"
    }
    env.localization.strings["MIMIC FAILED!"] = ""
    env.localization.strings["MIMIC SUCCESS!"] = ""

    /* - bomb_plant - */

    env.ACTIONS.bomb_plant.name = "" // Plant
    env.ACTIONS.bomb_plant.usage = {
        "act": "%USER ATTACHES SOMETHING TO %TARGET",
        "crit": "%TARGET IS LEFT REELING",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.bomb_plant.details = {
        "flavor": "'utilize explosives at close range';'but safely'",
        "onUse": "'[STATUS::bomb_planted] to target';'utilize TRIGGER to detonate and HIT actors within radius'",
        "onHit": "'[STAT::amt] [STATUS::stun] [STATUS::puncture] [STAT::kb] from explosive host'",
        "conditional": "<em>VS DESTRUCTIBLE</em>::'additional [STAT::megaHP]';'hits large targets multiple times'\\n<em>VS PLANTED</em>::'increase radius'"
    }

    /* - special_bomb_detonate - */

    env.ACTIONS.special_bomb_detonate.name = "" // Trigger
    env.ACTIONS.special_bomb_detonate.usage = {
        "act": "%USER DETONATES THE CHARGE!",
        "crit": "%TARGET IS LEFT REELING",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.special_bomb_detonate.details = {
        "flavor": "'utilize explosives at close range';'but safely'",
        "onUse": "'[STATUS::bomb_planted] to target';'utilize TRIGGER to detonate and HIT actors within radius'",
        "onHit": "'[STAT::amt] [STATUS::stun] [STATUS::puncture] [STAT::kb] from explosive host'",
        "conditional": "<em>VS DESTRUCTIBLE</em>::'additional [STAT::megaHP]';'hits large targets multiple times'\\n<em>VS PLANTED</em>::'increase radius'"
    }
    env.ACTIONS.special_bomb_detonate.disableIf = (actor)=>{ if(!actor?.trackedBombs?.size) return "NO ACTIVE CHARGES" }

    /* - special_bomb_detonate_victim - */

    env.ACTIONS.special_bomb_detonate_victim.name = "" // Exploding
    env.ACTIONS.special_bomb_detonate_victim.usage = {
        "act": "%USER EXPLODES",
        "crit": "%TARGET EXPLODES",
        "hit": "%TARGET IS CAUGHT IN THE EXPLOSION",
        "miss": "%TARGET DODGES"
    }
    env.ACTIONS.special_bomb_detonate_victim.details = {
        "onUse": "'explode'"
    }
    env.localization.strings["`%TARGET seems weaker..."] = ""

    /* - scene_evade - */

    env.ACTIONS.scene_evade.name = "" // Dash
    env.ACTIONS.scene_evade.usage = {
        "act": "%USER LOOKS FOR AN OPENING"
    }
    env.ACTIONS.scene_evade.details = {
        onUse: () => `'[STATUS::focused] [STATUS::evasion]';'move to target location';'select current tile to avoid movement'`,
        "flavor": "'move quickly';'deliberate on the moment and its opportunities'"
    }

    /* - scene_akizet_attack - */

    env.ACTIONS.scene_akizet_attack.name = "" // Overwhelm
    env.ACTIONS.scene_akizet_attack.usage = {
        "act": "%USER CHARGES",
        "crit": "%TARGET IS LEFT REELING",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.scene_akizet_attack.details = {
        "flavor": "'a bold assault';'chance for immense physical trauma'",
        "onUse": "'move to location';'assault targets ahead'",
        "onHit": "'[STAT::rangeHP] [STAT::kb]';'increased by 1 per tile traversed'",
        "onCrit": "'[STATUS::stun]'",
        "conditional": "<em>NOTICE::</em>'hits allies';'exercise caution"
    }

    /* - scene_frenzy - */

    env.ACTIONS.scene_frenzy.name = "" // Frenzy
    env.ACTIONS.scene_frenzy.usage = {
        "act": "%USER STABS %TARGET",
        "crit": "%USER JUST KEEPS GOING",
        "hit": "%TARGET BLEEDS SLUDGY CORRU",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.scene_frenzy.details = {
        "flavor": "'puncture vital cystic component';'may inspire additional stabbing'",
        "onHit": "'[STAT::amt] [STATUS::puncture]';'100% base crit on first hit'",
        "onCrit": "'use this action again on random foe in range'"
    }

    /* - scene_gakvu_attack - */

    env.ACTIONS.scene_gakvu_attack.name = "" // Scramble
    env.ACTIONS.scene_gakvu_attack.usage = {
        "act": "%USER TWISTS THE OVERLAP"
    }
    env.ACTIONS.scene_gakvu_attack.details = {
        "flavor": "'disrupt multiple targets with enhanced groundsmindry';'more illegal than before'",
        "onUse": "'create persistent area effect';'HIT foes who end turn within';'HIT foes who are knocked within'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::vulnerable]'"
    }

    /* - scene_parasite - */

    env.ACTIONS.scene_parasite.name = "" // Parasite
    env.ACTIONS.scene_parasite.verb = "" // parasitize
    env.ACTIONS.scene_parasite.usage = {
        "act": "%USER GRASPS AT %TARGET",
        "crit": "%TARGET IS INFESTED",
        "hit": "%TARGET IS INFESTED",
        "miss": "%TARGET DODGES"
    }
    env.ACTIONS.scene_parasite.details = {
        onHit: () => "'[STAT::amt] [STATUS::siphon]'",
        onCrit: () => "'infest nearby foes with [STATUS::siphon]'",
        "flavor": "'utilize modified repair tool';'tap vital corru of foes to sustain allies'"
    }

    /* - scene_mend - */

    env.ACTIONS.scene_mend.name = "" // Urgent Mend
    env.ACTIONS.scene_mend.usage = {
        "act": "%USER RUSHES TO HELP",
        "crit": "%TARGET FEELS WAY BETTER",
        "hit": "%TARGET FEELS BETTER"
    }
    env.ACTIONS.scene_mend.details = {
        "flavor": "'mend allies through use of enhanced tools';'often inspiring'",
        "onUse": "'move to location';'HIT allies around target tile'",
        "onHit": "'[STAT::amt] [STATUS::regen]'",
        "onCrit": "'[STATUS::focused]'"
    }

    /* - scene_spy - */

    env.ACTIONS.scene_spy.name = "" // Observe
    env.ACTIONS.scene_spy.usage = {
        "act": "%USER PROVIDES OPPORTUNITY"
    }
    env.ACTIONS.scene_spy.details = {
        "flavor": "'utilize enhanced spatial awareness';'rapidly analyze local opportunities'",
        "onUse": "'create persisting area of observation';'inflict statuses on creation and turn end'",
        "conditional": "<em>VS FOE::</em>'inflict [STATUS::vulnerable]'\\n<em>VS ALLY::</em>'inflict [STATUS::focused]'"
    }

    /* - scene_bozko_attack - */

    env.ACTIONS.scene_bozko_attack.name = "" // Throw Punch
    env.ACTIONS.scene_bozko_attack.verb = "" // jab at
    env.ACTIONS.scene_bozko_attack.usage = {
        "act": "%USER SWINGS",
        "crit": "%TARGET IS LEFT REELING",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.scene_bozko_attack.details = {
        "flavor": "'strike with full momentum';'shatter offensive appendages'",
        "onUse": "'move to location';'HIT up to 2 foes ahead'",
        "onHit": "'[STAT::amt] [STATUS::weakened] [STAT::kb]",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - scene_guard - */

    env.ACTIONS.scene_guard.name = "" // Protect
    env.ACTIONS.scene_guard.usage = {
        "act": "%USER STANDS GUARD"
    }
    env.ACTIONS.scene_guard.details = {
        "onUse": "'gain [STATUS::carapace] [STATUS::spikes]';'create area of safety'",
        "onHit": "'grant allies within effect [STATUS::redirection]';'remove [STATUS::vulnerable]'"
    }

    /* - scene_pull - */

    env.ACTIONS.scene_pull.name = "" // Pull
    env.ACTIONS.scene_pull.usage = {
        "act": "%USER GRABS AT %TARGET",
        "hit": "%TARGET IS PULLED",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.scene_pull.details = {
        onHit: ()=> `'[STAT::kb] towards current location';'increased by 1 per tile distance'`,
        conditional: () => "<em>VS ALLY</em>::'guaranteed hit'</em>\n<em>NOTICE</em>::'align in cardinal direction with target for accurate result'",
    }

    /* - scene_cavik_attack - */

    env.ACTIONS.scene_cavik_attack.name = "" // IED
    env.ACTIONS.scene_cavik_attack.verb = "" // throw at
    env.ACTIONS.scene_cavik_attack.usage = {
        "act": "%USER THROWS A WEIRD CYST AT %TARGET",
        "crit": "%TARGET EXPLODES",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET DODGES"
    }
    env.ACTIONS.scene_cavik_attack.details = {
        "flavor": "'utilize micro-explosive rapidly formed from scavenged dull organs'",
        "onHit": "'[STAT::amt] [STAT::kb] from selected tile'",
        "onCrit": "'[STATUS::puncture]'",
        "conditional": "<em>NOTICE::</em>'hits allies';'exercise caution\\n<em>SPECIAL</em>::'if no targets in range, remains on ground';'detonates before next turn'"
    }

    /* - scene_miltza_attack - */

    env.ACTIONS.scene_miltza_attack.name = "" // Guide Drone
    env.ACTIONS.scene_miltza_attack.verb = "" // strike
    env.ACTIONS.scene_miltza_attack.usage = {
        "act": "%USER guides a small drone to %TARGET!"
    }
    env.ACTIONS.scene_miltza_attack.details = {
        "flavor": "'utilize short range drone to support or suppress target'",
        "onUse": "'[STATUS::drone_haunt] to target ally or foe'",
        "conditional": "<em>VS FOE</em>::'[STAT::amt] to host and nearby [STATUS::vulnerable] foes'\\n<em>VS ALLY</em>::'50% chance for [STATUS::evasion] to host and nearby allies'"
    }

    /* - scene_dullflare - */

    env.ACTIONS.scene_dullflare.name = "" // Dull Flare
    env.ACTIONS.scene_dullflare.verb = "" // blast
    env.ACTIONS.scene_dullflare.usage = {
        "act": "%USER TEARS OPEN THE DULL",
        "crit": "%TARGET IS ANNIHILATED",
        "hit": "%TARGET IS SEARED",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.scene_dullflare.details = {
        "flavor": "'wide directional release of rapidly decaying dull light';'deconstructs foes'",
        "onHit": "[STAT::amt] KB::2'"
    }

    /* - scene_kavruka - */

    env.ACTIONS.scene_kavruka.name = "" // Explosive
    env.ACTIONS.scene_kavruka.verb = "" // throw at
    env.ACTIONS.scene_kavruka.usage = {
        "act": "%USER THROWS A WEIRD CYST AT %TARGET",
        "crit": "%TARGET EXPLODES",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET DODGES"
    }
    env.ACTIONS.scene_kavruka.details = {
        "flavor": "'utilize deconstruction tool offensively';'may disorient those nearby'",
        "onHit": "'[STAT::amt] [STAT::kb] from selected tile'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - scene_satik - */

    env.ACTIONS.scene_satik.name = "" // Emergency Break
    env.ACTIONS.scene_satik.verb = "" // throw at
    env.ACTIONS.scene_satik.usage = {
        "act": "%USER THROWS A WEIRD CYST AT %TARGET",
        "crit": "%TARGET EXPLODES",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET DODGES"
    }
    env.ACTIONS.scene_satik.details = {
        "flavor": "'break satik shell due to emergency';'release many small ablative barrier applicators'",
        "onHit": "'[STAT::amtBP] to allies'"
    }

    /* - scene_arm_rifle - */

    env.ACTIONS.scene_arm_rifle.name = "" // LOCK N LOAD
    env.ACTIONS.scene_arm_rifle.usage = {
        "act": "%USER wields the symbiotic rifle!"
    }
    env.ACTIONS.scene_arm_rifle.details = {
        "flavor": "'prepare to use symbiotic rifle'",
        "onUse": "'[STATUS::rifle_bearer]'",
        "conditional": "<em>SLUDGE VOLLEY</em>::\\n<em>USE</em>::'[STAT::selfHP] to self';'prepare wide projectile attack in specified direction';'fires on start of next turn'\\n<em>HIT</em>::'[STAT::amt] [STAT::kb] [STATUS::vulnerable] [STATUS::puncture]'"
    }

    /* - scene_rifle - */

    env.ACTIONS.scene_rifle.name = "" // Sludge Volley
    env.ACTIONS.scene_rifle.usage = {
        "act": "%USER prepares to fire..."
    }
    env.ACTIONS.scene_rifle.details = {
        "flavor": "'utilize symbiotic rifle';'draw from self for munitions'",
        "onUse": "'[STAT::selfHP] to self';'prepare wide projectile attack in specified direction';'fires on start of next turn'",
        "onHit": "'[STAT::amt] [STAT::kb] [STATUS::vulnerable] [STATUS::puncture]'"
    }
    env.ACTIONS.scene_rifle.disableIf = (actor)=>{ if(actor.hp < 3 && actor.bp < 2) return "HP TOO LOW" },

    /* - arch_whelm - */

    env.ACTIONS.arch_whelm.name = "" // Formless Swipe
    env.ACTIONS.arch_whelm.usage = {
        "act": "%USER CHARGES AT %TARGET",
        "crit": "%TARGET IS KNOCKED BACK",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }

    /* - special_arch_support - */

    env.ACTIONS.special_arch_support.name = "" // Coil
    env.localization.strings["%USER coils around %TARGET!"] = ""
    env.localization.strings["%USER lashes out at %TARGET!"] = ""

    /* - special_arch_harasser_stab - */

    env.ACTIONS.special_arch_harasser_stab.name = "" // Flicker Stab
    env.localization.strings["%USER prepares to strike %TARGET"] = ""

    /* - arch_harasser_stab - */

    env.ACTIONS.arch_harasser_stab.name = "" // stab
    env.ACTIONS.arch_harasser_stab.usage = {
        "act": "%USER flickers towards %TARGET",
        "crit": "%TARGET IS EVISCERATED",
        "hit": "%TARGET BLEEDS SLUDGY CORRU",
        "miss": "%TARGET EVADES"
    }
    env.localization.strings["%USER flickers towards %TARGET"] = ""
    env.localization.strings["%USER is thrown off balance by their miss!"] = ""

    /* - arch_punch - */

    env.ACTIONS.arch_punch.name = "" // Big Punch
    env.ACTIONS.arch_punch.usage = {
        "act": "%USER SWINGS AT %TARGET",
        "crit": "%TARGET IS KNOCKED BACK",
        "hit": "%TARGET STAGGERS BACK",
        "miss": "%TARGET EVADES"
    }
    env.localization.strings["%TARGET is stunned by the impact!"] = ""

    /* - arch_bomb - */

    env.ACTIONS.arch_bomb.name = "" // Dullbomb
    env.ACTIONS.arch_bomb.verb = "" // throw at
    env.ACTIONS.arch_bomb.usage = {
        "act": "%USER WARPS THE GROUND OMINOUSLY"
    }
    env.ACTIONS.arch_bomb.aoe.effect =  ({user, tiles, selectedTile}) => {
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

    /* - arch_bomb_hit - */

    env.ACTIONS.arch_bomb_hit.name = "" // IED
    env.ACTIONS.arch_bomb_hit.verb = "" // throw at
    env.ACTIONS.arch_bomb_hit.usage = {
        "act": "AN EXPLOSIVE DETONATES!",
        "crit": "%TARGET EXPLODES",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET DODGES"
    }
    env.ACTIONS.arch_bomb_hit.details = {
        "onHit": "'[STAT::amt] [STAT::kb] from selected tile'",
        "onCrit": "'[STATUS::puncture]'",
        "conditional": "<em>NOTICE::</em>'hits allies';'exercise caution\\n<em>SPECIAL</em>::'if no targets in range, remains on ground';'detonates before next turn'"
    }

    /* - special_arch_tele_channel - */

    env.ACTIONS.special_arch_tele_channel.name = "" // Channel
    env.ACTIONS.special_arch_tele_channel.usage = {
        "act": "%USER BENDS THE OVERLAP"
    }
    env.localization.strings["%TARGET feels watched..."] = ""
    env.localization.strings["%TARGET's skin writhes"] = ""

    /* - arch_tele_sweep - */

    env.ACTIONS.arch_tele_sweep.name = "" // Formless Swipe
    env.ACTIONS.arch_tele_sweep.usage = {
        "act": "%USER RUSHES TOWARDS %TARGET"
    }

    /* - tele_arch_hulk_rampage - */

    env.ACTIONS.tele_arch_hulk_rampage.name = "" // Formless Swipe
    env.ACTIONS.tele_arch_hulk_rampage.usage = {
        "act": "%USER PREPARES TO CHARGE AT %TARGET"
    }
    env.localization.strings["%USER charges towards %TARGET!"] = ""

    /* - arch_hulk_rampage - */

    env.ACTIONS.arch_hulk_rampage.name = "" // Wild Strike
    env.ACTIONS.arch_hulk_rampage.usage = {
        "act": "%USER CHARGES!",
        "crit": "%TARGET IS KNOCKED BACK",
        "hit": "%TARGET STAGGERS BACK",
        "miss": "%TARGET EVADES"
    }

    /* - arch_pull - */

    env.ACTIONS.arch_pull.name = "" // Pull
    env.ACTIONS.arch_pull.usage = {
        "act": "%USER GRABS AT %TARGET",
        "hit": "%TARGET IS PULLED",
        "miss": "%TARGET EVADES"
    }

    /* - special_archivist - */

    env.ACTIONS.special_archivist.name = "" // Manipulate
    // ---- ujcgjlb господи. вернуться к жттому тут ссаные эффекты
    env.localization.strings["the air shimmers ominously"] = ""
    env.localization.strings["%TARGET is briefly empowered by %USER!"] = ""
    env.localization.strings["more golem-like shapes appear..."] = ""

    /* - tele_archivist_rampage - */

    env.ACTIONS.tele_archivist_rampage.name = "" // Last Invitation
    env.ACTIONS.tele_archivist_rampage.usage = {
        "act": "%USER PREPARES TO CHARGE AT %TARGET"
    }

    /* - archivist_charge - */

    env.ACTIONS.archivist_charge.name = "" // Desperate Charge
    env.ACTIONS.archivist_charge.usage = {
        "act": "%USER STRIKES %TARGET",
        "crit": "%TARGET IS LEFT REELING",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }

    /* - miltza_charge - */

    env.ACTIONS.miltza_charge.name = "" // Desperate Charge
    env.ACTIONS.miltza_charge.usage = {
        "act": "%USER STRIKES %TARGET",
        "crit": "%TARGET IS LEFT REELING",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }

    /* - spine_golem_lunge - */

    env.ACTIONS.spine_golem_lunge.name = "" // Ethereal Lunge
    env.ACTIONS.spine_golem_lunge.usage = {
        "act": "%USER LUNGES AT %TARGET",
        "crit": "%TARGET IS THROWN AWAY",
        "hit": "%TARGET IS KNOCKED BACK",
        "miss": "%TARGET EVADES"
    }

    /* - special_tele_splitbeam - */

    env.ACTIONS.special_tele_splitbeam.name = "" // Eyebeam
    env.ACTIONS.special_tele_splitbeam.usage = {
        "act": "the ground shimmers ominously..."
    }

    /* - splitbeam_hit - */

    env.ACTIONS.splitbeam_hit.name = "" // splitbeam
    env.ACTIONS.splitbeam_hit.usage = {
        "act": "the space writhes with hostility!"
    }

    /* - special_heartwall - */

    env.ACTIONS.special_heartwall.name = "" // Flood
    env.ACTIONS.special_heartwall.usage = {
        "act": "formless shapes emerge from the tendril!"
    }

    /* - tele_dullflare_evil - */

    env.ACTIONS.tele_dullflare_evil.name = "" // Dull Combo
    env.ACTIONS.tele_dullflare_evil.verb = "" // blast
    env.ACTIONS.tele_dullflare_evil.usage = {
        "act": "%USER SWINGS AT %TARGET",
        "crit": "%TARGET IS STAGGERED",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }
    // --- u[[ 'эффекты]]
    env.localization.strings["%USER fires a destabilizing sphere!"] = ""

    /* - scene_dullflare_evil - */

    env.ACTIONS.scene_dullflare_evil.name = "" // Dull Flare
    env.ACTIONS.scene_dullflare_evil.verb = "" // blast
    env.ACTIONS.scene_dullflare_evil.usage = {
        "act": "%USER TEARS OPEN THE DULL",
        "crit": "%TARGET IS ANNIHILATED",
        "hit": "%TARGET IS SEARED",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.scene_dullflare_evil.details = {
        onHit: ()=> `'wide directional release of rapidly decaying dull light';'inflicts [STAT::amt]';'KB::2'`
    }
    env.localization.strings["The golem's blast is diminished across multiple targets..."] = ""

    /* - scene_kivii_grasp - */

    env.ACTIONS.scene_kivii_grasp.name = "" // Grasp
    env.ACTIONS.scene_kivii_grasp.usage = {
        "act": "%USER GRABS AT %TARGET",
        "crit": "%TARGET IS THROWN",
        "hit": "%TARGET IS CRUSHED",
        "miss": "%TARGET EVADES"
    }

    /* - tele_kivii_grasp - */

    env.ACTIONS.tele_kivii_grasp.name = "" // Target
    env.ACTIONS.tele_kivii_grasp.usage = {
        "act": "%TARGET FEELS A LOOMING THREAT"
    }
    // --- эффекьы
    env.localization.strings["%USER focuses, but is left open..."] = ""

    /* - special_tele_itzil - */

    env.ACTIONS.special_tele_itzil.name = "" // Huge Pulse
    env.ACTIONS.special_tele_itzil.usage = {
        "act": "%USER's gauntlets glow brightly..."
    }
    // --- эффекьы

    /* - special_tele_kivii - */

    env.ACTIONS.special_tele_kivii.name = "" // Multislam
    env.ACTIONS.special_tele_kivii.usage = {
        "act": "%USER readies two claws..."
    }
    // --- эффекьы

    /* - scene_kivii_smash - */

    env.ACTIONS.scene_kivii_smash.name = "" // Assault
    env.ACTIONS.scene_kivii_smash.usage = {
        "act": "%USER SMASHES %TARGET",
        "crit": "%TARGET IS LEFT REELING",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }

    /* - special_itzka - */

    env.ACTIONS.special_itzka.name = "" // Overlap Collapse
    env.ACTIONS.special_itzka.usage = {
        "act": "The overlap bends inwards!!"
    }
    env.localization.strings["velzie's stage grows smaller..."] = ""

    /* - scene_bozko_attack_desperation - */

    env.ACTIONS.scene_bozko_attack_desperation.name = "" // Sweep
    env.ACTIONS.scene_bozko_attack_desperation.verb = "" // swing at
    env.ACTIONS.scene_bozko_attack_desperation.usage = {
        "act": "%USER SWINGS",
        "crit": "%TARGET IS THROWN AWAY",
        "hit": "%TARGET IS STAGGERED",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.scene_bozko_attack_desperation.details = {
        "flavor": "'strike with full momentum';'shatter offensive appendages'",
        "onUse": "'move to location';'HIT foes in wide area ahead'",
        "onHit": "'[STAT::amt] [STATUS::weakened] [STAT::kb]",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - scene_cavik_attack_desperation - */

    env.ACTIONS.scene_cavik_attack_desperation.name = "" // Dull Beam
    env.ACTIONS.scene_cavik_attack_desperation.usage = {
        "act": "%USER prepares to fire..."
    }
    env.ACTIONS.scene_cavik_attack_desperation.details = {
        "flavor": "'utilize modified and twisted dull golem claw';'fire wave of destabilizing dull light after delay'",
        "onUse": "'prepare attack in specified direction';'fires on start of next turn'",
        "onHit": "'[STAT::amt] [STAT::kb] [STATUS::destabilized]'"
    }

    // --- эффекты

    /* - scene_gakvu_attack_desperation - */

    env.ACTIONS.scene_gakvu_attack_desperation.name = "" // Scramble
    env.ACTIONS.scene_gakvu_attack_desperation.usage = {
        "act": "%USER TWISTS THE OVERLAP"
    }
    env.ACTIONS.scene_gakvu_attack_desperation.details = {
        "flavor": "disrupt overlap with groundsmindry",
        "onUse": "'create persistent area effect';'HIT foes who enter or are knocked within'",
        "onHit": "'distort corrucystic flesh for [STAT::amt]'",
        "onCrit": "'reveal weakness';'inflict [STATUS::vulnerable]'"
    }

    /* - tele_tendril_swipe - */

    env.ACTIONS.tele_tendril_swipe.name = "" // swipe
    env.ACTIONS.tele_tendril_swipe.usage = {
        "act": "%USER rears back..."
    }

    /* - special_tendril_slam - */

    env.ACTIONS.special_tendril_slam.name = "" // Tendril Slam
    env.ACTIONS.special_tendril_slam.usage = {
        "act": "%USER stretches up into the overlap..."
    }

    /* - special_wall_undulate - */

    env.ACTIONS.special_wall_undulate.name = "" // undulate
    env.ACTIONS.special_wall_undulate.usage = {
        "act": "%USER splits off offensive limbs..."
    }

    /* - special_tele_golemblast - */

    env.ACTIONS.special_tele_golemblast.name = "" // Aimed Blast
    env.ACTIONS.special_tele_golemblast.usage = {
        "act": "%USER takes aim..."
    }
    // --- эффекьы юоже

    /* - tele_enraged_rampage - */

    env.ACTIONS.tele_enraged_rampage.name = "" // Enraged Charge
    env.ACTIONS.tele_enraged_rampage.usage = {
        "act": "%USER PREPARES TO CHARGE AT %TARGET"
    }

    /* - vekfight_assault - */

    env.ACTIONS.vekfight_assault.name = "" // Assault
    env.ACTIONS.vekfight_assault.usage = {
        "act": "%USER CHARGES %TARGET",
        "crit": "%TARGET IS LEFT REELING",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }
    env.ACTIONS.vekfight_assault.details = {
        "flavor": "'strike with mutual ferocity'",
        "onUse": "'move to closest open tile near target if not adjacent'",
        "onHit": "'[STAT::amt] [STAT::kb]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - vekfight_rush - */

    env.ACTIONS.vekfight_rush.name = "" // Rush
    env.ACTIONS.vekfight_rush.usage = {
        "act": "%USER LOOKS FOR AN OPENING"
    }
    env.ACTIONS.vekfight_rush.details = {
        "flavor": "'move quickly';'overexert cognitive facilities';'consider all immediate possibilities'",
        "onUse": "'[STATUS::hyperfocus]';'move to target location';'select current tile to avoid movement'"
    }

    /* - special_eye_boss - */

    env.ACTIONS.special_eye_boss.name = "" // Epicenter
    env.ACTIONS.special_eye_boss.usage = {
        "act": "The epicenter pulses chaotically..."
    }

    /* - eyeboss_hit - */

    env.ACTIONS.eyeboss_hit.name = "" // Dull Pillar
    env.ACTIONS.eyeboss_hit.usage = {
        "act": "%TARGET is struck by stray dull light!"
    }

    /* - special_epicenter - */

    env.ACTIONS.special_epicenter.name = "" // projtest
    env.ACTIONS.special_epicenter.desc = "" // 'projectile test'
    env.ACTIONS.special_epicenter.usage = {
        "act": "bewewaaawaaaaweawa!!!!"
    }

    /* - vekoa_swipe - */

    env.ACTIONS.vekoa_swipe.name = "" // Assault
    env.ACTIONS.vekoa_swipe.usage = {
        "act": "%USER CHARGES %TARGET",
        "crit": "%TARGET IS LEFT REELING",
        "hit": "%TARGET IS STRUCK",
        "miss": "%TARGET EVADES"
    }

    /* - special_vekoa_rush - */

    env.ACTIONS.special_vekoa_rush.name = "" // Rush
    env.ACTIONS.special_vekoa_rush.usage = {
        "act": "%USER LOOKS FOR AN OPENING"
    }
    env.ACTIONS.special_vekoa_rush.details = {
        "flavor": "'move quickly';'overexert cognitive facilities';'consider all immediate possibilities'",
        "onUse": "'[STATUS::hyperfocus]';'move to target location';'select current tile to avoid movement'"
    }
    env.ACTIONS.special_vekoa_rush.disableIf = (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" },

    /* - tele_vekoa_rampage - */

    env.ACTIONS.tele_vekoa_rampage.name = "" // Last Invitation
    env.ACTIONS.tele_vekoa_rampage.usage = {
        "act": "%USER PREPARES TO CHARGE AT %TARGET"
    }
}
/* --- STATUS_EFFECTS --- */
cor_ru['redefineEffects'] = function () {
    /* - Puncture - */

    env.STATUS_EFFECTS.puncture.name = "" // Puncture
    env.STATUS_EFFECTS.puncture.help = "" // -10% hp/turn (min:1)

    /* - Rot - */

    env.STATUS_EFFECTS.rot.name = "" // Rot
    env.STATUS_EFFECTS.rot.help = "" // -(T:ROT)% HP/turn (min:1), max: 90%HP\nI.E. 4T:ROT = -4% HP

    /* - Regen - */

    env.STATUS_EFFECTS.regen.name = "" // Regen
    env.STATUS_EFFECTS.regen.help = "" // +1 HP/turn

    /* - Repairs - */

    env.STATUS_EFFECTS.repairs.name = "" // Repairs
    env.STATUS_EFFECTS.repairs.help = "" // +1 HP/turn while BP > 0, prevents puncture, removed upon barrier loss

    /* - Million Teeth - */

    env.STATUS_EFFECTS.million_teeth.name = "" // Million Teeth
    env.STATUS_EFFECTS.million_teeth.help = "" // +2T:PUNCTURE/turn while BP > 0, removed upon barrier loss

    /* - Destabilized - */

    env.STATUS_EFFECTS.destabilized.name = "" // Destabilized
    env.STATUS_EFFECTS.destabilized.help = "" // +100% incoming/outgoing damage/heal

    /* - Vulnerable - */

    env.STATUS_EFFECTS.vulnerable.name = "" // Vulnerable
    env.STATUS_EFFECTS.vulnerable.help = "" // +100% IN:HIT%, +200% IN:CRIT%

    /* - Critical Flaw - */

    env.STATUS_EFFECTS.critical_flaw.name = "" // Critical Flaw
    env.STATUS_EFFECTS.critical_flaw.help = "" // when struck with a crit, also lose 10% of current HP (min:1), removed upon vulnerable loss

    /* - Focused - */

    env.STATUS_EFFECTS.focused.name = "" // Focused
    env.STATUS_EFFECTS.focused.help = "" // +100% HIT%, +400% CRIT%

    /* - Weakened - */

    env.STATUS_EFFECTS.weakened.name = "" // Weakened
    env.STATUS_EFFECTS.weakened.help = "" // -50% outgoing damage, -100% CRIT%

    /* - Empowered - */

    env.STATUS_EFFECTS.empowered.name = "" // Empowered
    env.STATUS_EFFECTS.empowered.help = "" // +1 base outgoing damage/heal

    /* - Carapace - */

    env.STATUS_EFFECTS.carapace.name = "" // Carapace
    env.STATUS_EFFECTS.carapace.help = "" // -1 base incoming damage

    /* - Open Wound - */

    env.STATUS_EFFECTS.open_wound.name = "" // Open Wound
    env.STATUS_EFFECTS.open_wound.help = "" // +1 base incoming damage

    /* - Evasion - */

    env.STATUS_EFFECTS.evasion.name = "" // Evasion
    env.STATUS_EFFECTS.evasion.help = "" // -75% IN:HIT% & IN:CRIT%

    /* - Stun - */

    env.STATUS_EFFECTS.stun.name = "" // Stun
    env.STATUS_EFFECTS.stun.help = "" // skip turn

    /* - Immobile - */

    env.STATUS_EFFECTS.immobile.name = "" // Immobile
    env.STATUS_EFFECTS.immobile.help = "" // skip turn

    /* - Immobile - */

    env.STATUS_EFFECTS.immobile_hardskip.name = "" // Immobile
    env.STATUS_EFFECTS.immobile_hardskip.help = "" // skip turn

    /* - Invisible - */

    env.STATUS_EFFECTS.invisible.name = "" // Invisible
    env.STATUS_EFFECTS.invisible.help = "" // no actor panel, used for background entities mainly

    /* - Incoherent - */

    env.STATUS_EFFECTS.incoherent.name = "" // Incoherent
    env.STATUS_EFFECTS.incoherent.help = "" // ignoring thoughtspace specifications

    /* - Windup - */

    env.STATUS_EFFECTS.windup.name = "" // Windup
    env.STATUS_EFFECTS.windup.help = "" // +100% incoming crit, preparing powerful action, interrupted by stun

    /* - Fear - */

    env.STATUS_EFFECTS.fear.name = "" // Fear
    env.STATUS_EFFECTS.fear.help = "" // ()=> `paralyzed by terror,${env?.rpg?.is2D ? " -1 MOVE," : ''} some actions prohibited\nremoved by ally CRIT${env?.rpg?.is2D ? " or ENDURE action" : ''}`

    /* - Madness - */

    env.STATUS_EFFECTS.madness.name = "" // Madness
    env.STATUS_EFFECTS.madness.help = "" // outgoing targeted actions have a 50% chance to be redirected to a random actor\nremoved upon fear loss

    /* - Spikes - */

    env.STATUS_EFFECTS.spikes.name = "" // Spikes
    env.STATUS_EFFECTS.spikes.help = "" // return 50% incoming damage to attacker (min:1)

    /* - siphon - */

    env.STATUS_EFFECTS.siphon.name = "" // siphon
    env.STATUS_EFFECTS.siphon.help = "" // attacker receives +1HP +1T:REGEN

    /* - Redirection - */

    env.STATUS_EFFECTS.redirection.name = "" // Redirection
    env.STATUS_EFFECTS.redirection.help = "" // ()=> `[[ORIGIN]] intercepting incoming attacks${env?.rpg?.is2D ? ", +KB resistance" : ''}`

    /* - Redirector - */

    env.STATUS_EFFECTS.redirector.name = "" // Redirector
    env.STATUS_EFFECTS.redirector.help = "" // ()=> `intercepting nearby attacks${env?.rpg?.is2D ? ", +KB resistance" : ''}`

    /* - Conjoined - */

    env.STATUS_EFFECTS.conjoined.name = "" // Conjoined
    env.STATUS_EFFECTS.conjoined.help = "" // share HP with all other conjoined entities

    /* - Conjoined - */

    env.STATUS_EFFECTS.conjoined_baseslug.name = "" // Conjoined
    env.STATUS_EFFECTS.conjoined_baseslug.help = "" // share HP with all similar entities

    /* - Ethereal - */

    env.STATUS_EFFECTS.ethereal.name = "" // Ethereal
    env.STATUS_EFFECTS.ethereal.help = "" // disappear on death

    /* - Ethereal - */

    env.STATUS_EFFECTS.ethereal_passive.name = "" // Ethereal
    env.STATUS_EFFECTS.ethereal_passive.help = "" // disappear on death

    /* - Untargetable - */

    env.STATUS_EFFECTS.untargetable.name = "" // Untargetable
    env.STATUS_EFFECTS.untargetable.help = "" // cannot directly attack, seek other means

    /* - Sacrifice - */

    env.STATUS_EFFECTS.sacrifice.name = "" // Sacrifice
    env.STATUS_EFFECTS.sacrifice.help = "" // +2 base outgoing damage/heal, +200% HIT% & CRIT%, consumed by next action

    /* - Surge - */

    env.STATUS_EFFECTS.surge.name = "" // Surge
    env.STATUS_EFFECTS.surge.help = "" // use next active action twice

    /* - Wild Surge - */

    env.STATUS_EFFECTS.wild_surge.name = "" // Wild Surge
    env.STATUS_EFFECTS.wild_surge.help = "" // on next active targeted action, gain 1T:STUN, and use across the entire target team\nif beneficial, action used on all allies\nif offensive, action used on all foes

    /* - Attack Drone - */

    env.STATUS_EFFECTS.attack_drone.name = "" // Attack Drone
    env.STATUS_EFFECTS.attack_drone.help = "" // if alive, attack all vulnerable foes on turn for -1HP 10%CRT

    /* - ACTION::Retaliate - */

    env.STATUS_EFFECTS.retaliation.name = "" // ACTION::Retaliate
    env.STATUS_EFFECTS.retaliation.help = "" // if alive, on ally evade, retaliate against attacker with primary (1st) action

    /* - ACTION::Last Stand - */

    env.STATUS_EFFECTS.ichor_last_stand.name = "" // ACTION::Last Stand
    env.STATUS_EFFECTS.ichor_last_stand.help = "" // on ally down, automatically revive them once per combat with 1HP and 5BP.

    /* - ACTION::Impatient - */

    env.STATUS_EFFECTS.impatient.name = "" // ACTION::Impatient
    env.STATUS_EFFECTS.impatient.help = "" // when another ally critically strikes a foe, use primary on that foe

    /* - ACTION::Active Support - */

    env.STATUS_EFFECTS.active_support.name = "" // ACTION::Active Support
    env.STATUS_EFFECTS.active_support.help = "" // if alive, when an ally crits a foe, use secondary\nif secondary is beneficial, used on ally\nif secondary is offensive, used on foe

    /* - ACTION::Visionary - */

    env.STATUS_EFFECTS.visionary.name = "" // ACTION::Visionary
    env.STATUS_EFFECTS.visionary.help = "" // when critting a foe, use utility

    /* - Visionary (Sniper) - */

    env.STATUS_EFFECTS.visionary_geli.name = "" // Visionary (Sniper)
    env.STATUS_EFFECTS.visionary_geli.help = "" // when critting a foe, use utility action

    /* - Spotter - */

    env.STATUS_EFFECTS.spotter.name = "" // Spotter
    env.STATUS_EFFECTS.spotter.help = "" // if alive, when an ally misses a foe, +2T:VULNERABLE on that foe

    /* - Chitin Deformation - */

    env.STATUS_EFFECTS.claws_chitin.name = "" // Chitin Deformation
    env.STATUS_EFFECTS.claws_chitin.help = "" // when hitting a foe, inflict 1T:PUNCTURE

    /* - Dancer - */

    env.STATUS_EFFECTS.eyes_dancer.name = "" // Dancer
    env.STATUS_EFFECTS.eyes_dancer.help = "" // when evading an offensive strike, gain 1T:EVASION

    /* - Finisher - */

    env.STATUS_EFFECTS.ichor_finisher.name = "" // Finisher
    env.STATUS_EFFECTS.ichor_finisher.help = "" // on foe down, receive +3T:EMPOWERED

    /* - Adaptive - */

    env.STATUS_EFFECTS.bone_adaptive.name = "" // Adaptive
    env.STATUS_EFFECTS.bone_adaptive.help = "" // when struck offensively, gain 2T:SPIKES

    /* - Parii Shield - */

    env.STATUS_EFFECTS.bone_shield.name = "" // Parii Shield
    env.STATUS_EFFECTS.bone_shield.help = "" // on foe down, receive +4BP

    /* - Humorist - */

    env.STATUS_EFFECTS.light_humorist.name = "" // Humorist
    env.STATUS_EFFECTS.light_humorist.help = "" // when hitting a foe, laugh\nunknown additional effect

    /* - Veilkdrop - */

    env.STATUS_EFFECTS.light_veilkdrop.name = "" // Veilkdrop
    env.STATUS_EFFECTS.light_veilkdrop.help = "" // when critting a foe, 25% chance to inflict 1T:STUN

    /* - FATED::Claws - */

    env.STATUS_EFFECTS.fated_claws.name = "" // FATED::Claws
    env.STATUS_EFFECTS.fated_claws.help = "" // per humor of claws in this shell::\n+1T:PUNCTURE on all attacks\n+1.5% base crit% (before bonuses)

    /* - FATED::Eyes - */

    env.STATUS_EFFECTS.fated_eyes.name = "" // FATED::Eyes
    env.STATUS_EFFECTS.fated_eyes.help = "" // per humor of eyes in this shell::\n+10% chance to give 2T:EMPOWERED when giving allies FOCUSED\n+10% chance on hit to inflict +2T:VULNERABLE and +CRITICAL FLAW

    /* - FATED::Ichor - */

    env.STATUS_EFFECTS.fated_ichor.name = "" // FATED::Ichor
    env.STATUS_EFFECTS.fated_ichor.help = "" // per humor of ichor in this shell::\nallies receive +1BP when healing from any source

    /* - FATED::Bone - */

    env.STATUS_EFFECTS.fated_bone.name = "" // FATED::Bone
    env.STATUS_EFFECTS.fated_bone.help = "" // per humor of bone in this shell::\n+1 base SPIKES damage\n+10% chance to use primary action on attacker when receiving a redirected attack

    /* - FATED::Light - */

    env.STATUS_EFFECTS.fated_light.name = "" // FATED::Light
    env.STATUS_EFFECTS.fated_light.help = "" // per humor of light in this shell::\n+10% chance for (2T:FEAR/2T:DESTABILIZED/1T:STUN) on hit\n+5% INVITE STORM/INVOKE MADNESS special effect chance

    /* - Heavy Chitin - */

    env.STATUS_EFFECTS.bone_spikes.name = "" // Heavy Chitin
    env.STATUS_EFFECTS.bone_spikes.help = "" // evasion becomes spikes

    /* - Ablative Mending - */

    env.STATUS_EFFECTS.bone_ablative.name = "" // Ablative Mending
    env.STATUS_EFFECTS.bone_ablative.help = "" // direct heals are doubled and become barriers

    /* - Collectivism - */

    env.STATUS_EFFECTS.bone_collective.name = "" // Collectivism
    env.STATUS_EFFECTS.bone_collective.help = "" // gain +100% outgoing damage/heal while covered by REDIRECTION\nall actors gain GUARD (AUTOHIT +2T:REDIRECTION (TO USER))

    /* - Adull's Sacrifice - */

    env.STATUS_EFFECTS.ichor_sacrifice.name = "" // Adull's Sacrifice
    env.STATUS_EFFECTS.ichor_sacrifice.help = "" // half of damage taken is given to a random actor as HP (rounded down)

    /* - Full Strength - */

    env.STATUS_EFFECTS.ichor_strength.name = "" // Full Strength
    env.STATUS_EFFECTS.ichor_strength.help = "" // +100% outgoing damage/heal at >75% HP

    /* - Rotten Supplies - */

    env.STATUS_EFFECTS.ichor_rotten.name = "" // Rotten Supplies
    env.STATUS_EFFECTS.ichor_rotten.help = "" // gain 3T:ROT when REGEN is removed

    /* - Infection - */

    env.STATUS_EFFECTS.claws_infection.name = "" // Infection
    env.STATUS_EFFECTS.claws_infection.help = "" // +20% damage per T:PUNCTURE of attacked target

    /* - Desperation - */

    env.STATUS_EFFECTS.claws_desperation.name = "" // Desperation
    env.STATUS_EFFECTS.claws_desperation.help = "" // +50% outgoing crit and hit chance if HP < 50%

    /* - Rabid - */

    env.STATUS_EFFECTS.claws_rabid.name = "" // Rabid
    env.STATUS_EFFECTS.claws_rabid.help = "" // all targeted actions have a 25% + (1%*T:ROT) chance to become BITE\nBITE::(-2HP, +3T:ROT, transfer ROT to target)

    /* - Hypercritical - */

    env.STATUS_EFFECTS.eyes_hypercritical.name = "" // Hypercritical
    env.STATUS_EFFECTS.eyes_hypercritical.help = "" // vulnerability has infinite duration

    /* - Wounded Ego - */

    env.STATUS_EFFECTS.eyes_woundedego.name = "" // Wounded Ego
    env.STATUS_EFFECTS.eyes_woundedego.help = "" // grant 1T:FOCUSED and 1T:EMPOWERED when vulnerability is removed

    /* - Betrayal - */

    env.STATUS_EFFECTS.eyes_betrayal.name = "" // Betrayal
    env.STATUS_EFFECTS.eyes_betrayal.help = "" // Beneficial actions have a 20% chance to become SUBVERT\nSUBVERT::(+2T:VULNERABLE, +CRITICAL FLAW, -EVASION)

    /* - Laughterhouse - */

    env.STATUS_EFFECTS.light_laughterhouse.name = "" // Laughterhouse
    env.STATUS_EFFECTS.light_laughterhouse.help = "" // most actions have a 20% chance to repeat effects

    /* - Velzie's Glee - */

    env.STATUS_EFFECTS.light_glee.name = "" // Velzie's Glee
    env.STATUS_EFFECTS.light_glee.help = "" // incoming status effect application has a 50% chance to become opposite status\nmay be altered by other effects

    /* - Dark Eye - */

    env.STATUS_EFFECTS.light_dark.name = "" // Dark Eye
    env.STATUS_EFFECTS.light_dark.help = "" // gain +100% outgoing damage/heal when afflicted by FEAR\nwhen critting a foe, inflict 1T:FEAR 

    /* - Lone Daemon - */

    env.STATUS_EFFECTS.fish_solo.name = "" // Lone Daemon
    env.STATUS_EFFECTS.fish_solo.help = "" // +30HP base HP, grants immunity to stun/fear, +WILD SURGE on turn, negates WILD SURGE stun effect

    /* - Deceiving Bulb - */

    env.STATUS_EFFECTS.fish_angler.name = "" // Deceiving Bulb
    env.STATUS_EFFECTS.fish_angler.help = "" // prioritized as target over other allies

    /* - Mimic - */

    env.STATUS_EFFECTS.fish_mimic.name = "" // Mimic
    env.STATUS_EFFECTS.fish_mimic.help = "" // keep mimicked actions between fights

    /* - Gambling Adddiction - */

    env.STATUS_EFFECTS.fish_trusive.name = "" // Gambling Adddiction
    env.STATUS_EFFECTS.fish_trusive.help = "" // spin the wheel on turn

    /* - Escalation - */

    env.STATUS_EFFECTS.global_escalation.name = "" // Escalation
    env.STATUS_EFFECTS.global_escalation.help = "" // most negative statuses have enhanced effect

    /* - Into Madness - */

    env.STATUS_EFFECTS.global_impulse_bonus.name = "" // Into Madness
    env.STATUS_EFFECTS.global_impulse_bonus.help = "" // this actor receives a random impulse per stack of Into Madness

    /* - Appeasement - */

    env.STATUS_EFFECTS.appeasement.name = "" // Appeasement
    env.STATUS_EFFECTS.appeasement.help = "" // when an ally dies, take their max HP * 2 in damage\nwhen defeated, also defeat all other allies

    /* - Spawner - */

    env.STATUS_EFFECTS.spawner.name = "" // Spawner
    env.STATUS_EFFECTS.spawner.help = "" // when struck with direct damage, summon minor ally\nnot triggered by statuses or non-harmful actions

    /* - Mimic - */

    env.STATUS_EFFECTS.mimic.name = "" // Mimic
    env.STATUS_EFFECTS.mimic.help = "" // will use last action used by foe in same party slot\ncannot copy items or actions requiring certain statuses

    /* - Partial Participant - */

    env.STATUS_EFFECTS.permanent_hp.name = "" // Partial Participant
    env.STATUS_EFFECTS.permanent_hp.help = "" // unable to be reset, damage dealt is kept through iterations\nfear is enhanced and has alternate function

    /* - Ruleset Paradox - */

    env.STATUS_EFFECTS.imperfect_reset.name = "" // Ruleset Paradox
    env.STATUS_EFFECTS.imperfect_reset.help = "" // upon status expiry, end combat and reset iteration with more hostile parameters\ncurrent party will persist

    /* - DRILL - */

    env.STATUS_EFFECTS.malware_drill.name = "" // DRILL
    env.STATUS_EFFECTS.malware_drill.help = "" // doubles effect of puncture on this actor

    /* - ROTTING - */

    env.STATUS_EFFECTS.malware_rot.name = "" // ROTTING
    env.STATUS_EFFECTS.malware_rot.help = "" // upon receiving REGEN, instead turn it into ROT

    /* - Driver - */

    env.STATUS_EFFECTS.driver.name = "" // Driver
    env.STATUS_EFFECTS.driver.help = "" // can pilot the vessel. on turn, advance vessel position forward

    /* - Invincible - */

    env.STATUS_EFFECTS.invincible.name = "" // Invincible
    env.STATUS_EFFECTS.invincible.help = "" // cannot be defeated by any means\nsystem interruption to maintain disabled gameplay

    /* - Weak Point - */

    env.STATUS_EFFECTS.weak_point.name = "" // Weak Point
    env.STATUS_EFFECTS.weak_point.help = "" // receive +1000% incoming damage/heal while stunned

    /* - Weak Point Exposed - */

    env.STATUS_EFFECTS.hyperstun.name = "" // Weak Point Exposed
    env.STATUS_EFFECTS.hyperstun.help = "" // skip turn, +1000% incoming damage/heal

    /* - Ominous Timer - */

    env.STATUS_EFFECTS.ominous_timer.name = "" // Ominous Timer
    env.STATUS_EFFECTS.ominous_timer.help = "" // unknown, asynchronous effect

    /* - Item Carrier - */

    env.STATUS_EFFECTS.lootbox.name = "" // Item Carrier
    env.STATUS_EFFECTS.lootbox.help = "" // dropping item on death

    /* - Armed - */

    env.STATUS_EFFECTS.rifle_bearer.name = "" // Armed
    env.STATUS_EFFECTS.rifle_bearer.help = "" // wielding symbiotic rifle, grants action SLUDGE VOLLEY\nremoved if other ally is armed

    /* - Immovable - */

    env.STATUS_EFFECTS.kb_immune.name = "" // Immovable
    env.STATUS_EFFECTS.kb_immune.help = "" // ignores knockback

    /* - Unnatural Speed - */

    env.STATUS_EFFECTS.unnatural_speed.name = "" // Unnatural Speed
    env.STATUS_EFFECTS.unnatural_speed.help = "" // 'instant relocation on turn start if not near foe'

    /* - coiling - */

    env.STATUS_EFFECTS.coiling.name = "" // coiling
    env.STATUS_EFFECTS.coiling.help = "" // providing continuous beneficial statuses\nsevered by stun or death

    /* - Coiled - */

    env.STATUS_EFFECTS.coiled.name = "" // Coiled
    env.STATUS_EFFECTS.coiled.help = "" // [[ORIGIN]] providing continuous beneficial statuses

    /* - Watching - */

    env.STATUS_EFFECTS.channeling.name = "" // Watching
    env.STATUS_EFFECTS.channeling.help = "" // channeling continuous negative effect upon distant target, severed by any hit or stun

    /* - Seen - */

    env.STATUS_EFFECTS.channeledUpon.name = "" // Seen
    env.STATUS_EFFECTS.channeledUpon.help = "" // [[ORIGIN]] continuously attacking and inflicting negative status

    /* - Drone Strike - */

    env.STATUS_EFFECTS.drone_haunt.name = "" // Drone Strike
    env.STATUS_EFFECTS.drone_haunt.help = "" // persistent area from [[ORIGIN]]. -2HP/turn to foe host and vulnerable foes, 25% chance for +1T:EVASION to allies. removed if [[ORIGIN]] is downed

    /* - Shroud - */

    env.STATUS_EFFECTS.shroud_vekoa.name = "" // Shroud
    env.STATUS_EFFECTS.shroud_vekoa.help = "" // 'unable to affect by any means'

    /* - Shroud - */

    env.STATUS_EFFECTS.shroud.name = "" // Shroud
    env.STATUS_EFFECTS.shroud.help = "" // 'unable to affect by any means'

    /* - Split Focus - */

    env.STATUS_EFFECTS.archivist_split_focus.name = "" // Split Focus
    env.STATUS_EFFECTS.archivist_split_focus.help = "" // 'suffer max HP of allies as damage upon their defeat'

    /* - Flickering - */

    env.STATUS_EFFECTS.unstable_position.name = "" // Flickering
    env.STATUS_EFFECTS.unstable_position.help = "" // 'relocate to random tile on turn start'

    /* - Evasive - */

    env.STATUS_EFFECTS.blur_evasive.name = "" // Evasive
    env.STATUS_EFFECTS.blur_evasive.help = "" // -25% IN:HIT%

    /* - Windup - */

    env.STATUS_EFFECTS.windup_telegraph.name = "" // Windup
    env.STATUS_EFFECTS.windup_telegraph.help = "" // +100% incoming crit, preparing powerful telegraphed action, interrupted only by stun

    /* - Interruptible - */

    env.STATUS_EFFECTS.telegraph.name = "" // Interruptible
    env.STATUS_EFFECTS.telegraph.help = "" // using telegraphed action on next turn, interrupted by any hit or stun

    /* - Obstacle - */

    env.STATUS_EFFECTS.destructible_cross.name = "" // Obstacle
    env.STATUS_EFFECTS.destructible_cross.help = "" // stands in da way :P

    /* - Wall - */

    env.STATUS_EFFECTS.destructible_wall.name = "" // Wall

    /* - Planted - */

    env.STATUS_EFFECTS.bomb_planted.name = "" // Planted
    env.STATUS_EFFECTS.bomb_planted.help = "" // delayed explosive attached, detonates on activation, drops on death

    /* - Spinal Root - */

    env.STATUS_EFFECTS.destructible_spinalroot.name = "" // Spinal Root

    /* - miltzone - */

    env.STATUS_EFFECTS.boss_miltza.name = "" // miltzone

    /* - Unnatural Carapace - */

    env.STATUS_EFFECTS.unnatural_carapace.name = "" // Unnatural Carapace
    env.STATUS_EFFECTS.unnatural_carapace.help = "" // -2 base incoming damage, +2KB resistance, puncture immunity\ncreate dangerous area around self\nreduced by notable explosion

    /* - Pod Distortion - */

    env.STATUS_EFFECTS.destructible_lesserpod.name = "" // Pod Distortion

    /* - Reunited - */

    env.STATUS_EFFECTS.lesserboss_alternating.name = "" // Reunited
    env.STATUS_EFFECTS.lesserboss_alternating.help = "" // shares HP with other foes\nchanges actions after 100HP lost\nimmune to edge distortion

    /* - Overlap Collapse - */

    env.STATUS_EFFECTS.lesserboss_overlap_collapse.name = "" // Overlap Collapse
    env.STATUS_EFFECTS.lesserboss_overlap_collapse.help = "" // slowly collapsing combat stage

    /* - Last Stand - */

    env.STATUS_EFFECTS.desperation.name = "" // Last Stand
    env.STATUS_EFFECTS.desperation.help = "" // this is it.\nfocused status is infinite\nbroadly increases strength\nautomatically revive self, once

    /* - Ceremony Vein - */

    env.STATUS_EFFECTS.destructible_epicenter_vein.name = "" // Ceremony Vein

    /* - Protector - */

    env.STATUS_EFFECTS.vekoa_golem.name = "" // Protector
    env.STATUS_EFFECTS.vekoa_golem.help = "" // keeping veins incorporeal

    /* - vekoaaaa - */

    env.STATUS_EFFECTS.boss_vekoa.name = "" // vekoaaaa

    /* - Hyperfocus - */

    env.STATUS_EFFECTS.hyperfocus.name = "" // Hyperfocus
    env.STATUS_EFFECTS.hyperfocus.help = "" // -80% IN:HIT% & IN:CRIT%, +100% HIT%, +400% CRIT%, +1 MOVE, STUN IMMUNITY

    /* - Disconnected - */

    env.STATUS_EFFECTS.autoplay_telyu.name = "" // Disconnected
    env.STATUS_EFFECTS.autoplay_telyu.help = "" // acting of her own volition

    /* - Disconnected - */

    env.STATUS_EFFECTS.autoplay_tozik.name = "" // Disconnected
    env.STATUS_EFFECTS.autoplay_tozik.help = "" // acting of his own volition

    /* - Knockback - */

    env.STATUS_EFFECTS.kb.name = "" // Knockback
    env.STATUS_EFFECTS.kb.help = "" // immediate forced movement, transfers on impact

    /* - Barrier - */

    env.STATUS_EFFECTS.bp.name = "" // Barrier
    env.STATUS_EFFECTS.bp.help = "" // temporary HP, limited to 1/2 max HP

    /* - aiming - */

    env.STATUS_EFFECTS.aiming_indicator.name = "" // aiming
    env.STATUS_EFFECTS.aiming_indicator.help = "" // you should never see this
}