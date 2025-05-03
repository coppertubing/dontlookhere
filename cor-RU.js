/* 
    cor-RU - a full russian adaptation mod for corru.observer
    by @dutokrisa, @shatteredstars and @bra1nslug_
    based on ENV.LOCALIZATION V1 EXAMPLE by @corruworks
    EP0 playtested by @akizetism

     - adaptation up until the end of EP0 currently availible

    thank you for using our mod

        ======

    cor-RU - мод на полную русскую адаптацию для corru.observer
    от @dutokrisa, @shatteredstars и @bra1nslug_
    на основе ENV.LOCALIZATION V1 EXAMPLE от @corruworks
    EP0 протестировано @akizetism

     - в данный момент доступна полноценная адаптация до EP0

    спасибо за использование нашего мода
*/


console.log("%chello world! defining some basic things now... - @cor-RU", 'color:rgb(229, 142, 22)')


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
    type: "corruru portrait-contain",
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
        url('https://raw.githubusercontent.com/coppertubing/cor-RU/recode/fonts/barc.woff') format('woff') !;
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
		content: "ОШИБКА::\A'текущее устройство визуализации непригодно';\a'требуется нейронный вывод не менее 800x600'";
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


.dialogue-message.corruru.dialogue-text, 
.readout-log .message.corruru {
    background: url(/img/textures/fadein.gif), url(/img/textures/corruripplebastard.gif), url(/img/textures/badstatic.gif);
    background-size: 150%, auto;
}

.dialogue-message.corruru .dialogue-portrait::after {
    background-size: 125%;
    background-position: center;
}

.dialogue-message.corruru, .message.corruru {
    --bright-color: var(--bastard-color);
}

.dialogue-message.corruru .dialogue-text {
    font-size: 3em;
    margin: 0.5rem;
    padding: 0.3em;
    background-image: linear-gradient(0deg, rgba(0,0,0,0.79) 0%, rgb(0, 0, 0) 25%, rgb(0, 0, 0) 50%, rgb(0, 0, 0) 75%, rgba(0,0,0,0.9) 100%), url(/img/textures/stun.gif);
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

    // funky functions that help with translation

    processWeirdTranslation: function (selector, attribute = false) {
        if (attribute == false) {document.querySelectorAll(selector).forEach(el=>{for (const childNode of el.childNodes) {if (childNode.nodeType === Node.TEXT_NODE) {childNode.textContent = processStringTranslation(childNode.textContent.trim())}}})}
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
        } else {
            processTranslation(document.querySelector("#meta-menu"));
            processTranslation(document.querySelector("#system-menu"));
        }
    },
    processReply: function () {
        cor_ru.processWeirdTranslation('.reply', 'name');
        cor_ru.processWeirdTranslation('.reply', 'definition');
        cor_ru.processWeirdTranslation('.reply', 'endtext');
    },

    // obserbor

    observerCommon: new MutationObserver(()=>{
        processTranslation();
        processTranslation(document.querySelector(`#mindspike-scanner`));
        cor_ru.processWeirdTranslation(".mindsci-status");
        console.log("common observed! @cor-RU");
    }),
    observerCommonObserve: function () {
        cor_ru.observerCommon.observe("#mindspike-scanner", { childList: true, subtree: true });
        cor_ru.observerCommon.observe("#content", { childList: true, subtree: true });
    },

    observerDialogue: new MutationObserver(()=>{
        cor_ru.processReplies();
        console.log("dialogue observed! @cor-RU");
    }),
    observerDialogueObserve: function () {cor_ru.observerDialogue.observe("#dialogue-box", { childList: true })},

    observerMasks: new MutationObserver(()=>{
        processTranslation(document.querySelector(`#ozo-mask-grid`))
        console.log("masks observed! @cor-RU");
    }),
    observerMasksObserve: function () {cor_ru.observerMasks.observe("#masks", { childList: true })},

    observerPage: new MutationObserver(()=>{
        cor_ru.processStatic();
        cor_ru.processMenu();
        cor_ru.observerCommonObserve();
        cor_ru.observerDialogueObserve();
        cor_ru.observerMasksObserve();
        console.log("page observed! @cor-RU");
    }),
    observerPageObserve: function () {cor_ru.observerPage.observe(body, {attributes: true, attributeFilter: ['page']})},

    /*observerWarn: new MutationObserver(()=>{
        cor_ru.processWarning();
        console.log("warnings observed! @cor-RU");
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
    ]
}

    console.log("%cdefined! making them work now... - @cor-RU", 'color:rgb(229, 142, 22)')

document.head.appendChild(document.createElement('style').appendChild(document.createTextNode(cor_ru.css)).parentElement);document.head.appendChild(document.createElement('style').appendChild(document.createTextNode(cor_ru.css)).parentElement);

addResources(cor_ru.dalist)
