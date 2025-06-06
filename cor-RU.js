/* 
    cor-RU - a full russian adaptation mod for corru.observer
    by @dutokrisa and @bra1nslug_
    based on ENV.LOCALIZATION V1 EXAMPLE by @corruworks
    certain parts are based on vielk memory hole example by @adr_furret

    EP0 playtested by @akizetism

     - adaptation up until the end of EP0 currently availible

    thank you for using our mod

        ======

    cor-RU - мод на полную русскую адаптацию для corru.observer
    от @dutokrisa и @bra1nslug_
    на основе ENV.LOCALIZATION V1 EXAMPLE от @corruworks
    некоторые части основаны на vielk memory hole example от @adr_furret

    EP0 протестировано @akizetism

     - в данный момент доступна полноценная адаптация до EP0

    спасибо за использование нашего мода
*/


console.log("hello world! - @cor-RU")

// temporary until corru.works fixes it
function generateDialogueObject(genString) {
	let split = genString.split('\n')
	let obj = {}
    let lastParent = { // used to track depth
        blockShowControl: false, // controls SHOWIF blocks that affect multiple dialogues
        blockShowOnceControl: false // ditto for SHOWONCE
    }

    function parseShowif(showif) {
        let finalShowIf = showif
            .replace('SHOWIF::', '')
            .replace(/'/g, '"')// removes the showif indicator and swaps single quotes for double (required for json parse for whatever reason)
            .replace(/</g, '\\u003c') //apparently < and > throw errors if they're used unescaped in JSON... weird
            .replace(/>/g, '\\u003e')

        try {
            return upgradeShowIf(JSON.parse(`{ "reasons":${finalShowIf}}`).reasons) 
        } catch(e) {console.log(showif, e)}
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
                if(line == "") return;

                //block handling
                else if(line.startsWith('____')) {
                    let block = line.replace('____', '')

                    if(block.startsWith('SHOWIF')) {
                        lastParent.blockShowControl = parseShowif(block)

                    } else if(block.startsWith('SHOWONCE')) {
                        lastParent.blockShowOnceControl = true

                    } else if(block == 'END') {
                        lastParent.blockShowControl = false
                        lastParent.blockShowOnceControl = false
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
                    lastParent = {"0": obj[line]}
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

                    if (env.localization) {

                        let localization = {};

                        if(env.localization.dialogues) localization = env.localization.dialogues
                        if(env.localization.page) {
                            let values = Object.values(env.localization.page)
                            for (let i = 0; i < values.length; i++) {
                                if(values[i]['dialogues']) Object.assign(localization, values[i]['dialogues'])
                            }
                        }
                        lastParent[0].responses = localization[respobj] || env.dialogues[respobj]
                    }
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

function processDefinitionsInString(input, {force = false} = {}) {
    if(!input) return input;
    if(!input.includes) return input;
    if ((input.includes('definition=') && input.includes("::")) && !force) return input; //if there's a manual definition, we want to skip this

    //we alter this string as it's processed to avoid definition overlaps
    let scanningInput = input
    let finalInput = input

    //initialize the page definitions with any translation overrides if it isn't already set up
    if(!page.formedDefinitionStrings) {
        const localization = getLocalizationForPage()
        page.formedDefinitionStrings = {...env.definitions, ...localization.definitions }
    }
    
    //we want to prioritize phrases over words
    const sortedDefinitions = Object.entries(page.formedDefinitionStrings).sort((a, b) => b[0].length - a[0].length)
    sortedDefinitions.forEach(([phrase, definition]) => {
        if(phrase.length > scanningInput.length) return;

        const type = (typeof definition === "object") ? definition.type || "INHERITED CONTEXT" : "INHERITED CONTEXT";
        const text = (typeof definition === "object") ? definition.text || definition : definition;

        if(phrase[0] == "θ") { //theta definitions are prefixed so that they can be immediately replaced without scanning
            //used mostly for special/context sensitive ones
            finalInput = finalInput.replaceAll(phrase, `<span class="definition" definition="${type}::${text.replace("θ", "").replace('"', "'")}">${phrase.replace("θ", "")}</span>`)

        } else {
            //this regex looks literally insane but it's a faster way of looking up phrases in the string
            //it also prepares them to be replaced if they're found by surrounding them with () and handling the escaping of any special characters
            const phraseRegex = new RegExp(`(?<=\\s|^)(${phrase.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})(?=\\s|$)`, 'gi');

            // we check the scanningInput for matches
            while ((match = phraseRegex.exec(scanningInput)) !== null) {
                const replacement = `<span class="definition" definition="${type}::${text.replace("θ", "").replace('"', "'")}">${match[0]}</span>`;
                // replace the inputs - scanning to remove the match, finalInput to add the definition to the output
                scanningInput = scanningInput.replaceAll(match[0], "")

                //we do this to target replacements only outside of HTML
                finalInput = finalInput.replace(/(?<=\s|^)(<[^>]*>|[^<]+)(?=\s|$)/g, (innerMatch)=>{
                    if(innerMatch.includes("definition") || innerMatch.startsWith("<")) {
                        return innerMatch
                    } 
                    else {
                        return innerMatch.replace(new RegExp(match[0], 'g'), replacement)
                    }
                })
            }
        }
    })
    return finalInput
}

function processTranslation(container, force = false) {
    if(!env.localization.strings) return;
    let outerEl = container || content

    outerEl.querySelectorAll(force ?" *" : "*:not(.tskip, .tdone, script, style)").forEach(el=>{
        //translates definition hover regardless of children since that's safe
        let def = el.getAttribute("definition")
        if(def) { el.setAttribute("definition", processStringTranslation(def)) }

        //same with entity
        let ent = el.getAttribute("entity")
        if(ent) { el.setAttribute("entaltname", processStringTranslation(ent))}

        // if something has child elements, we want to process its text nodes separately from its children
        // this is because the querySelectorAll already grabs everything - no need to traverse
        for (const childNode of el.childNodes) {
            if (childNode.nodeType === Node.TEXT_NODE) {
                if(childNode.textContent.trim().length == 0) continue; // skip if functionally whitespace
              childNode.textContent = processStringTranslation(childNode.textContent)
            }
        }
        if(el.childNodes.length == 0) {console.log("skipped for", el); return el.classList.add('tskip')}
        el.classList.add("tdone")
    })
}

env.localization = {
   dialogues: {},
   definitions: {}, 
   strings: {}, 
   entityDescriptions: {},
   page: {}
}

env.dialogueActors["corruru"] = {
    name: "cor-ru",
    image: "/img/textures/yeyetran.gif",
    type: "tdone corruru portrait-contain",
    voice: ()=>{play('talkcroak', 1.75)}
}

cor_ru = {
    css: `
@font-face {
    font-family: 'spacemono';
    src: url('https://raw.githubusercontent.com/coppertubing/cor-RU/recode/fonts/modfont.woff2') format('woff2'),
        url('https://raw.githubusercontent.com/coppertubing/cor-RU/recode/fonts/modfont.woff') format('woff');
    font-weight: normal; 
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'barcode';
    src: url('https://raw.githubusercontent.com/coppertubing/cor-RU/recode/fonts/barc.woff2') format('woff2'),
        url('https://raw.githubusercontent.com/coppertubing/cor-RU/recode/fonts/barc.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'barcodetext';
    src: url('https://raw.githubusercontent.com/coppertubing/cor-RU/recode/fonts/barcode.woff2') format('woff2'),
        url('https://raw.githubusercontent.com/coppertubing/cor-RU/recode/fonts/barcode.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'beech';
    src: url('https://raw.githubusercontent.com/coppertubing/cor-RU/recode/fonts/beechy.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}




body[state="corru-loaded"][menu="none"]:not(.in-dialogue)::before, body.loading::after, body.corru-refreshing::after {
    content: "ПРЕДУПРЕЖДЕНИЕ:'Использование мыслекола может вызвать приступы у людей с ФОТОСЕНСИТИВНОЙ ЭПИЛЕПСИЕЙ, в том числе из-за вспышек света.';\\A'Удостоверьтесь, что АППАРАТНОЕ УСКОРЕНИЕ включено во избежание временной несоосности.';\\A'Сторонние РАЗРЕШЕНИЯ могут мешать производительности.';\\A'Продолжение по усмотрению пользователя.'";
    font-family: spacemono;
    font-size: 0.75em;
    max-width: 600px;
    position: fixed;
    z-index: 1000;
    display: block;
    top: 10vh;
    background: var(--dark-color);
    padding: 0.25em;
    text-align: center;
    line-height: 1.25em;
    white-space: pre-wrap;
    pointer-events: none;
}

body.loading::after, body.corru-refreshing::after {
    content: "ВНИМАНИЕ::'очистка буфера мыслекола';'прогресс не будет потерян'";
    padding: 1em;
    top: 50%;
    transform: translateY(-100%);
    opacity: 1;
    display: block;
}

body.loading::after {
    content: "УВЕДОМЛЕНИЕ::'загрузка ресурсов';'пожалуйста, подождите'";
}

#meta-menu .moth-trigger:after,
#meta-menu .mask-trigger:after { 
    content: "МОЛЬ"  !important; 
    left: 0;
    right: 0;
    text-align: center;
    transition-delay: 0s;
}
#meta-menu .mask-trigger:after { content: "МАСК"  !important; }
#mui-links #meta-obs:after { content: "СУЩ"  !important; }
#mui-links #meta-sys:after { content: "СИС" !important; }
#mui-links #meta-hub:after { content: "НАВ" !important; }

#dialogue-box.dialogue-click-proceed::after {
    content: "VVV КЛИК/ENTER ДЛЯ ПРОДОЛЖЕНИЯ VVV";
    display: block;
    width: 100%;
    text-align: center;
    animation: click-to-proceed 1s linear infinite;
} 

#dialogue-box.can-skip::before {
    content: "ЛИНЕЙНЫЙ СЕГМЕНТ ПОТОКА - ПРОПУСК С ESC";
    display: block;
    text-align: center;
    padding: 0.5em;
    color: var(--neutral-color);
    font-size: 0.75rem;
    opacity: 0.5;
    position: sticky;
    top: 0;
    z-index: 2;
    background: var(--dark-color);
}

#dialogue-skip::before {
    content: "ПОДТВЕРЖДЕНИЕ::'пропуск сегмента потока'";
}

body:not(.mui-active) .target::after, body:not(.mui-active) #realgrid .target::before {
    content:"ПРАВАЯ КНОПКА МЫШИ" !important;
}

@media screen and (max-width: 799px), (max-height: 599px) {
	html:not(.mobile):after, html:not(.mobile):before {
		position: fixed;
		z-index: 1001231231231231230;
		top: 0;
		left: 0;
		height: 100%;
	}
	
	html:not(.mobile):after {
		content: "ОШИБКА::\\A'текущее устройство визуализации непригодно';\\a'требуется нейронный вывод не менее 800x600'";
		box-sizing: border-box;
		white-space: pre-wrap;
		width: 100vw;
		height: 100vh;
		max-width: 100%;
		display: flex;
		margin: auto;
		justify-content: center;
		align-items: center;
		font-family: 'barcodetext', sans-serif;
		font-size: 2rem;	
        line-height: 1.5em;
		letter-spacing: 2.5px;
		padding: 10px;
		color: var(--bright-color);
		text-align: center;
	}
	
	html:not(.mobile):before {
		content: "";
		position: fixed;
		background-color: var(--dark-color);
		width: 100%;
	}
}

#mindspike-scanner span.loose-thought::after {
    content: "..__НЕПОЛНОЦЕННАЯ_МЫСЛЕФОРМА__..";
    display: block;
    font-family: spacemono;
    letter-spacing: 0;
    font-size: 0.63rem;
    margin-top: -0.5em;
}




.actor-corrurubonus .dialogue-text {
    text-transform: uppercase;
}

.dialogue-message.corruru.dialogue-text, 
.readout-log .message.corruru {
    background: url(/img/textures/fadein.gif), url(/img/textures/corruripplebastard.gif), url(/img/textures/badstatic.gif);
    background-size: 150%, auto;
    text-shadow: 1px 1px var(--neutral-color);
    font-size: 1.25em;
    letter-spacing: 0.25em;
}

.dialogue-message.corruru .dialogue-portrait::after {
    background-size: 125%;
    background-position: center;
}

.dialogue-message.corruru, .message.corruru {
    --bright-color: var(--bastard-color);
}

.dialogue-message.corruru .dialogue-text {
    padding: 0.3em;
}

.dialogue-message.corruru {
    --background: url(/img/textures/corruripplebastard.gif), url(/img/textures/badstatic.gif);
    --color: var(--bastard-color);
    text-shadow: 1px 1px var(--neutral-color);
    font-size: 1.25em;
    letter-spacing: 0.25em;
}
    
.dialogue-message.corruru .dialogue-portrait::before {
    width: 100%;
    right: 0;
    border-radius: 0;
    transform: translateX(100%);
}

.dialogue-message.corruru, .message.corruru {
    color: var(--bright-color);
}  
    
.message.corruru img {
    border-radius: 100%;
}`,

    // i like colors

    fancy: {
        general: 'color:rgb(229, 142, 22)',
        observed: 'color:rgb(229, 194, 22)',
        setobserver: 'color:rgb(227, 227, 0)'
    },

    // funky functions that help with translation

    processWeirdTranslation: function (selector, attribute = false) {
        if (attribute == "mindpike") {document.querySelectorAll(selector).forEach(el=>{for (const childNode of el.childNodes) {if (childNode.nodeType === Node.TEXT_NODE) {if (childNode.textContent == "EXM") {childNode.textContent = "ИЗУЧ"} else if (childNode.textContent == "ACT") {childNode.textContent = "ДЕЙСТ"}}}})} // i hate ACT and EXm strings bleeding into shit
        else if (attribute == false) {document.querySelectorAll(selector).forEach(el=>{for (const childNode of el.childNodes) {if (childNode.nodeType === Node.TEXT_NODE) {childNode.textContent = processStringTranslation(childNode.textContent.trim())}}})}
        else document.querySelectorAll(selector).forEach(el=>{if (el.getAttribute(attribute) != null) el.setAttribute(attribute, processStringTranslation(el.getAttribute(attribute)))})
        return
    },
    processStatic: function (force) {
        cor_ru.processWeirdTranslation('title', true);
        cor_ru.processWeirdTranslation(".enter", 'page');
        if (force) processTranslation(document.querySelector(`#static`), true);
        else processTranslation(document.querySelector(`#static`));
    },
    processWarning: function (force) {
        if (force) {
            processTranslation(document.querySelector(`.cryptowarn`), true);
            processTranslation(document.querySelector(`#mod-warning`), true);
            processTranslation(document.querySelector(`#gpu-warning`), true);
            processTranslation(document.querySelector(`#wide-warning`), true);
        } else {
            processTranslation(document.querySelector(`.cryptowarn`));
            processTranslation(document.querySelector(`#mod-warning`));
            processTranslation(document.querySelector(`#gpu-warning`));
            processTranslation(document.querySelector(`#wide-warning`));
        }
    },
    processMenu: function (force) {
        cor_ru.processWeirdTranslation('.ci-masks', 'definition');
        cor_ru.processWeirdTranslation('#savetext', 'placeholder');
        if (force) {
            processTranslation(document.querySelector("#meta-menu")), true;
            processTranslation(document.querySelector("#system-menu"), true);
            processTranslation(document.querySelector("#entity-menu"), true);
        } else {
            processTranslation(document.querySelector("#meta-menu"));
            processTranslation(document.querySelector("#system-menu"));
            processTranslation(document.querySelector("#entity-menu"));
        }
    },
    processReply: function () {
        cor_ru.processWeirdTranslation('.reply', 'name');
        cor_ru.processWeirdTranslation('.reply', 'definition');
        cor_ru.processWeirdTranslation('.reply', 'endtext');
    },

    // funky functions that do not forbid you from moving cyrillic-style

    stepKey: function (key) {
    /*    console.log(key)
        key = key.toLowerCase();

        if (key == 'ц') stepKey('w')
        if (key == 'ф') stepKey('a')
        if (key == 'ы') stepKey('s')
        if (key == 'в') stepKey('d')
        if (key == 'й') stepKey('q')
        if (key == 'у') stepKey('e')
        if (key == 'я') stepKey('z')
    */
    },

    stageKeypressed: (e) => { cor_ru.stepKey(e.key) },

    stepKeyImplement: function () {
    //    if (body.querySelector('.stage-arrows') != null) addEventListener("keydown", cor_ru.stageKeypressed)
    },

    stepKeyClean: function () {
    /*    function stageCleanup() {
            if(env.stage.ref) env.stage.ref.remove()
            env.stage.ref = null
            try{ document.removeEventListener('keydown', stageKeypress) } catch(e) {  }
            try{ document.removeEventListener('keydown', cor_ru.stageKeypressed) } catch(e) {  }
        }*/
    },

    // obserbor

    observerCommon: new MutationObserver(()=>{
        processTranslation();
        processTranslation(document.querySelector(`#mindspike-scanner`));
        cor_ru.processWeirdTranslation("#mindspike-scanner", "mindpike");
        console.log("%ccommon observed! - @cor-RU", cor_ru.fancy.observed);
    }),
    observerCommonObserve: function () {
        cor_ru.observerCommon.observe(document.querySelector("#mindspike-scanner"), { childList: true, subtree: true });
        cor_ru.observerCommon.observe(document.querySelector("#content"), { childList: true, subtree: true });
        console.log("%ccommon observer is set up! - @cor-RU", cor_ru.fancy.setobserver)
    },

    observerGad: new MutationObserver(()=>{
        cor_ru.processWeirdTranslation(".mindsci-status");
        console.log("%cGAD observed! - @cor-RU", cor_ru.fancy.observed);
    }),
    observerGadObserve: function () {
        cor_ru.observerGad.observe(document.querySelector(".mindsci-status"), { childList: true, subtree: true });
        console.log("%cgad observer is set up! - @cor-RU", cor_ru.fancy.setobserver)
    },

    observerDialogue: new MutationObserver(()=>{
        cor_ru.processReply();
        console.log("%cdialogue observed! - @cor-RU", cor_ru.fancy.observed);
    }),
    observerDialogueObserve: function () {
        cor_ru.observerDialogue.observe(document.querySelector("#dialogue-box"), { childList: true });
        console.log("%cdialogue observer is set up! - @cor-RU", cor_ru.fancy.setobserver)
    },

    observerMasks: new MutationObserver(()=>{
        processTranslation(document.querySelector(`#ozo-mask-grid`))
        console.log("%cmasks observed! - @cor-RU", cor_ru.fancy.observed);
    }),
    observerMasksObserve: function () {
        cor_ru.observerMasks.observe(document.querySelector("#masks"), { childList: true });
        console.log("%cmasks observer is set up! - @cor-RU", cor_ru.fancy.setobserver)
    },

    observerPage: new MutationObserver(()=>{
        processTranslation();
        cor_ru.processStatic();
        cor_ru.processMenu();

        cor_ru.observerCommonObserve();
        cor_ru.observerGadObserve();
        cor_ru.observerDialogueObserve();
        cor_ru.observerMasksObserve();

        cor_ru.updateResources();

        cor_ru.stepKeyImplement();

        console.log("%cpage observed! - @cor-RU", cor_ru.fancy.observed);
    }),
    observerPageObserve: function () {
        cor_ru.observerPage.observe(body, {attributes: true, attributeFilter: ['page']});
        console.log("%cpage observer is set up! - @cor-RU", cor_ru.fancy.setobserver)},

    /*observerWarn: new MutationObserver(()=>{
        cor_ru.processWarning();
        console.log("warnings observed! - @cor-RU", cor_ru.fancy.observed);
    }),
    observerWarnObserve: function () {cor_ru.observerWarn.observe("???", { childList: true })}, UNFINISHED*/

    // tehehe we are devs now

    devElement: `<div class="devs ulbox tdone cor-ru">
    <ul class="tdone">
        <h4 class="tdone">НЕОФИЦИАЛЬНАЯ КОМАНДА ПЕРЕВОДА</h4>
        <li class="tdone"><span definition="@dutokrisa в discord!" class="tdone">ООО "РОСРАЗУМ"</span></li>
        <li class="tdone"><span class="tdone" definition="таинственный человек о котором вы не узнаете">НАО "Млечный Путь"</span></li>
        <li class="tdone"><span definition="@bra1nslug_ в discord!" class="tdone">Фонд "ПЯТЁРОЧНЁК"</span></li>
    </ul>
</div>`,

    // da list

    dalist: [
        "https://coppertubing.github.io/cor-RU/localization/everystuff.js",

        "https://coppertubing.github.io/cor-RU/localization/basement.js",

        "https://coppertubing.github.io/cor-RU/localization/auth-layer.js",
        "https://coppertubing.github.io/cor-RU/localization/hub.js",

        "https://coppertubing.github.io/cor-RU/localization/their-city.js",
        "https://coppertubing.github.io/cor-RU/localization/city-surface.js",

        "https://coppertubing.github.io/cor-RU/localization/the-void.js",
        "https://coppertubing.github.io/cor-RU/localization/our-dull-vessel.js",

        "https://coppertubing.github.io/cor-RU/localization/their-waters.js",
        "https://coppertubing.github.io/cor-RU/localization/their-vessel.js",
        "https://coppertubing.github.io/cor-RU/localization/the-funny-little-room.js",

        "https://coppertubing.github.io/cor-RU/localization/the-depths.js",

        "https://coppertubing.github.io/cor-RU/localization/uncosm.js",
        "https://coppertubing.github.io/cor-RU/localization/recosm.js",
        "https://coppertubing.github.io/cor-RU/localization/memory-hole.js",

        "https://coppertubing.github.io/cor-RU/localization/clemens-romanus.js",

        "https://coppertubing.github.io/cor-RU/localization/embassy.js",
        "https://coppertubing.github.io/cor-RU/localization/golem-maintenance.js",
        "https://coppertubing.github.io/cor-RU/localization/pale-halls.js",

        "https://coppertubing.github.io/cor-RU/localization/beneath-abyss.js",
        "https://coppertubing.github.io/cor-RU/localization/beneath-parasite.js",
        "https://coppertubing.github.io/cor-RU/localization/beneath-maze.js",

        "https://coppertubing.github.io/cor-RU/localization/frame.js",

        "https://coppertubing.github.io/cor-RU/localization/cache.js",
        "https://coppertubing.github.io/cor-RU/localization/jokzi-ozo.js",

        "https://coppertubing.github.io/cor-RU/localization/entity-menu.js",

        "https://coppertubing.github.io/cor-RU/load.js",
    ],

    list: {
        everything: "https://coppertubing.github.io/cor-RU/localization/everystuff.js",
        page: {
            fbx: "https://coppertubing.github.io/cor-RU/localization/basement.js",

            hello: "https://coppertubing.github.io/cor-RU/localization/auth-layer.js",
            hub: "https://coppertubing.github.io/cor-RU/localization/hub.js",

            localcity: "https://coppertubing.github.io/cor-RU/localization/their-city.js",
            citystreet: "https://coppertubing.github.io/cor-RU/localization/city-surface.js",

            localorbit: "https://coppertubing.github.io/cor-RU/localization/the-void.js",
            dullvessel: "https://coppertubing.github.io/cor-RU/localization/our-dull-vessel.js",

            localocean: "https://coppertubing.github.io/cor-RU/localization/their-waters.js",
            localship: "https://coppertubing.github.io/cor-RU/localization/their-vessel.js",
            interview1: "https://coppertubing.github.io/cor-RU/localization/the-funny-little-room.js",

            localdepths: "https://coppertubing.github.io/cor-RU/localization/the-depths.js",

            localuncosm: "https://coppertubing.github.io/cor-RU/localization/uncosm.js",
            recosm: "https://coppertubing.github.io/cor-RU/localization/recosm.js",
            localuncosmwhere: "https://coppertubing.github.io/cor-RU/localization/memory-hole.js",
            sec: "https://coppertubing.github.io/cor-RU/localization/memory-hole.js",

            localship2: "https://coppertubing.github.io/cor-RU/localization/clemens-romanus.js",

            embassy: "https://coppertubing.github.io/cor-RU/localization/embassy.js",
            gol: "https://coppertubing.github.io/cor-RU/localization/golem-maintenance.js",
            ep4: "https://coppertubing.github.io/cor-RU/localization/pale-halls.js",

            abyss: "https://coppertubing.github.io/cor-RU/localization/beneath-abyss.js",
            parasite: "https://coppertubing.github.io/cor-RU/localization/beneath-parasite.js",
            beneathdepths: "https://coppertubing.github.io/cor-RU/localization/beneath-maze.js",

            ep3a2: "https://coppertubing.github.io/cor-RU/localization/frame.js",

            cache: "https://coppertubing.github.io/cor-RU/localization/cache.js",
            ozo: "https://coppertubing.github.io/cor-RU/localization/jokzi-ozo.js"
        },
        combat: "https://coppertubing.github.io/cor-RU/localization/combat.js",
        entityMenu: "https://coppertubing.github.io/cor-RU/localization/entity-menu.js",
        load: "https://coppertubing.github.io/cor-RU/load.js",
    },

    updateResources: function (fresh = false) {
        let listArray = [];

        if (fresh == true) {
            listArray.push(cor_ru.list.everything);
            listArray.push(cor_ru.list.page[page.dialoguePrefix]);
            listArray.push(cor_ru.list.load);
            if (document.querySelectorAll(`script[src="/js/combat/combatActorsJson.js?v=${page.cacheval}"]`).length != 0);
        }
        else {
            if (document.querySelectorAll(`script[src="${cor_ru.list.page[page.dialoguePrefix]}?v=${page.cacheval}"]`).length == 0) listArray.push(cor_ru.list.page[page.dialoguePrefix])
            for (let i = 0; i < Object.keys(cor_ru.list.page); i++) {if (Object.keys(cor_ru.list.page)[i] != page.dialoguePrefix) document.querySelectorAll(`script[src="${cor_ru.list.page[Object.keys(cor_ru.list.page)[i]]}?v=${page.cacheval}"]`).forEach((el)=> el.remove())};
            if ((document.querySelectorAll(`script[src="/js/combat/combatActorsJson.js?v=${page.cacheval}"]`).length != 0) && (document.querySelectorAll(`script[src="${cor_ru.list.combat}?v=${page.cacheval}"]`).length != 0)) listArray.push(cor_ru.list.combat)
            else if (document.querySelectorAll(`script[src="${cor_ru.list.combat}?v=${page.cacheval}"]`).length != 0) document.querySelectorAll(`script[src="${cor_ru.list.combat}?v=${page.cacheval}"]`).forEach((el)=> el.remove())
        }
        if (listArray.length != 0) {console.log("%cupdating resources! - @cor-RU", cor_ru.fancy.general); return addResources(listArray)}
        else console.log("%cno updates for resources needed! - @cor-RU", cor_ru.fancy.general)
    },
}

console.log("%ccontact @dutokrisa or @bra1nslug_ on discord if you have any questions, suggestions or bugs to report - @cor-RU", cor_ru.fancy.general)
console.log("%c(ru) свяжитесь с @dutokrisa или @bra1nslug_ в discord, если есть вопросы, предложения или надо зарепортить баг - @cor-RU", cor_ru.fancy.general)

document.head.appendChild(document.createElement('style').appendChild(document.createTextNode(cor_ru.css)).parentElement);

page.formedDefinitionStrings = undefined

cor_ru.updateResources(true)