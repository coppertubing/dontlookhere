/*/     если вы очутились здесь и не понимаете, что это такое, скорее всего     /*/
/*/     вы нажали на ссылку вместо того, чтобы правильно установить мод.        /*/
/*/     не смотрите в в код дальше, если боитесь спойлеров!!! хихи              /*/
/*/     видео по установке: https://cor-RU.github.io/cor-RU/tutorial.MP4        /*/
/*/     страница мода: https://github.com/cor-RU/cor-RU                         /*/



/*
    cor-RU - a russian localization mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > cor-RU.js
    important code!!! and loads the whole mod!!! yay!!!
*/

if (window.location.pathname == '/credits') { // credits load mods in a very limited manner so firstly we check if we're in credits, then either load the whole mod or only execute this little bit of code
    devcol = `
<style>
@font-face {
    font-family: 'spacemono';
    src: url('https://raw.githubusercontent.com/coppertubing/dontlookhere/recode/fonts/modfont.woff2') format('woff2'),
        url('https://raw.githubusercontent.com/coppertubing/dontlookhere/recode/fonts/modfont.woff') format('woff');
    font-weight: normal; 
    font-style: normal;
    font-display: swap;
}
</style>
<div class="creditblock developers">
    <h2 definition="оригинальная команда и старые друзья">Corru Crew</h2>
    <ul>
        <li><a href="https://corru.works" target="_blank"><img src="/img/da_fiend.png" /> corru.works:</a> <span definition="программист/главный писатель/создатель музыки/визуальных ресурсов... я типа всё делаю лол" style="border-bottom: 1px dotted;display: inline-block;padding-bottom 2px;">Архитектор</span></li>
        <li><a href="https://pocl.vip" target="_blank"><img src="/img/da_pocl.png" /> pocl.v:</a> Дизайн персонажей и главный художник подписей</li>
        <li><a href="https://www.jacktenbusch.com" target="_blank"><img src="/img/da_tonk.png" /> JakkRabbitArt:</a> Творчество и поддержка иконок</li>
        <li><a href="https://uh.fyi" target="_blank"><img src="/img/da_sha.png" /> Shaman:</a> Писательская поддержка и тестирование</li>
        <li><a href="https://uh.fyi/redrealm" target="_blank"><img src="/img/da_fool.png" /> red:</a> Писательская поддержка и тестирование</li>
        <li><span definition="у загадочного шейдер-мена нет сайта сорян"><img src="/img/da_kaz.png" /> Kazne:</span> Анимированные текстуры и шейдеры</li>
    </ul>
    <h2 definition="значимые коллабораторы по прямой разработке/ресурсам">Corruborators</h2>
    <ul>
        <li><a href="https://soundcloud.com/saiiko2" target="_blank"><img src="/img/da_saiiko.png" /> saiiko2</a>: Музыкальная поддержка <label>E3A2, E4</label></li>
        <li><a href="https://sunset.works" target="_blank"><img src="/img/da_sola.png" /> Sola Sunset</a>: Музыкальная поддержка <label>E3A2, E4</label>, поддержка кода и тестирование <label>E3A2, E4</label></li>
        <li><a href="https://rainbowcutieo3o.neocities.org/" target="_blank"><img src="/img/da_bo.png" /> RainbowCutieo3o</a>: Творчество и поддержка в дизайне персонажей <label>E4</label>, тестирование <label>E3A2, E4</label></li>
        <li><span href="https://rainyatrium.net/" target="_blank"><img src="/img/da_charter.png" /> rainyatrium</span>: Поддержка с кодом и тестирование <label>ING</label></li>
        <li><span definition="hi"><img src="/img/da_flan.png" /> Flanburgr</span>: Творчество и поддержка в дизайне персонажей <label>ING</label></li>
    </ul>
</div>
<div class="creditblock contributors">
    <h2 definition="единичные работы и упоминания других крутых людей">Дополнительные Вклады</h2>
    <ul>
        <li><label class="art">(ТВОРЧЕСТВО)</label><label>E3A1</label> <a href="https://www.oliverbuck.land/" target="_blank">Oliver Buckland</a>: Создание темы "Jokzi Ozo"</li>
        <li><label class="art">(ТВОРЧЕСТВО)</label><label>E3A2</label> <a href="https://redscientist.com/artist/deltanoyz" target="_blank">DELTANOYZ</a> + <a href="https://redscientist.com/artist/noisyrejects" target="_blank">NoisyRejects</a>: Создание темы финала для ::/FRAME/</li>
        <li><label class="art">(ТВОРЧЕСТВО)</label><label>E4A1</label> <a href="https://metaphorical.monster/" target="_blank">Octofoss</a>: Создание дизайна Rotwatcher</li>
        <li><label class="art">(ТВОРЧЕСТВО)</label><label>ING</label> <span>Cappin</span>: Создание дополнительных 3D-спрайтов предметов</li>
        <li><label class="eyes">(ГЛАЗА)</label><label>E3A2</label> <span class="denselist">ChickenMcNuggets, KrookedReality, RainbowCutieo3o, apia, Novae, Sola, cyberwaves, spacedotexe, Jadrek, Grimm, Chemelia, Joael, Rayka, NOVA〄AURASTY, TheElement, cyclar2, Victoria, Octofoss</span></li>
        <li><label class="testing">(ТЕСТИРОВАНИЕ)</label><label>E3A2, E4, ING</label> <span class="denselist">Ryanatorx, kae.fyi, Octofoss</span> + <label>E4A1, ING</label> <span class="denselist">rosy, spdx</span> + <label>ING</label> <span class="denselist">spacedotexe, FulvousFox, chimera</span></li>
        <li><label class="codehelp">(КОД)</label><label>ВСЕ</label> <a href="https://marbelynrye.000.pe/" target="_blank">marbelynrye</a>: Огромное количество тестирования багов и предложений по коду</li>
    </ul>
</div>`
    fund = `
<h2 definition="дражайшие финансовые спонсоры, без которых нас бы здесь не было">Fundfriends</h2>
<em>все, кто когда-либо поддерживал проект на <a href="https://ko-fi.com/corruworks" target="_blank">ko-fi</a> на уровне fundfriend!!</em>
    `
    document.querySelector(".developers").remove()
    document.querySelector(".contributors").remove()
    document.querySelector("main").insertAdjacentHTML("afterbegin", devcol)
    document.querySelector(".fundfriends :first-child").remove()
    document.querySelector(".fundfriends :first-child").remove()
    document.querySelector(".fundfriends").insertAdjacentHTML("afterbegin", fund)
    throw new Error("hi dont mind me! cor-RU is not supposed to load properly in credits. this little error intentionally prevents it from executing any further")
}

env.localization = {
   dialogues: {},
   definitions: {}, 
   strings: {}, 
   entityDescriptions: {},
   page: {}
}

cor_ru = {
    css: `
@font-face {
    font-family: 'spacemono';
    src: url('https://raw.githubusercontent.com/coppertubing/dontlookhere/recode/fonts/modfont.woff2') format('woff2'),
        url('https://raw.githubusercontent.com/coppertubing/dontlookhere/recode/fonts/modfont.woff') format('woff');
    font-weight: normal; 
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'barcode';
    src: url('https://raw.githubusercontent.com/coppertubing/dontlookhere/recode/fonts/barc.woff2') format('woff2'),
        url('https://raw.githubusercontent.com/coppertubing/dontlookhere/recode/fonts/barc.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'barcodetext';
    src: url('https://raw.githubusercontent.com/coppertubing/dontlookhere/recode/fonts/barcode.woff2') format('woff2'),
        url('https://raw.githubusercontent.com/coppertubing/dontlookhere/recode/fonts/barcode.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'beech';
    src: url('https://raw.githubusercontent.com/coppertubing/dontlookhere/recode/fonts/beechy.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}


body[state="corru-loaded"][menu="none"]:not(.in-dialogue)::before, body.loading::after, body.corru-refreshing::after {
    content: "ПРЕДУПРЕЖДЕНИЕ::'Использование мыслекола может вызвать приступы у людей с ФОТОСЕНСИТИВНОЙ ЭПИЛЕПСИЕЙ, в том числе из-за вспышек света.';\\A'Удостоверьтесь, что АППАРАТНОЕ УСКОРЕНИЕ включено во избежание временной несоосности.';\\A'Сторонние РАСШИРЕНИЯ могут мешать производительности.';\\A'Продолжение по усмотрению пользователя.'";
}

body.loading::after, body.corru-refreshing::after {
    content: "ВНИМАНИЕ::'очистка буфера мыслекола';'прогресс не будет потерян'";
}

body.loading::after {
    content: "УВЕДОМЛЕНИЕ::'загрузка ресурсов';'пожалуйста, подождите'";
}

#meta-menu .moth-trigger:after,
#meta-menu .mask-trigger:after { 
    content: "МОЛЬ"  !important; 
}
#meta-menu .mask-trigger:after { content: "МАСК"  !important; }
#mui-links #meta-obs:after { content: "СУЩ"  !important; }
#mui-links #meta-sys:after { content: "СИС" !important; }
#mui-links #meta-hub:after { content: "НАВ" !important; }

#dialogue-box.dialogue-click-proceed::after {
    content: "VVV КЛИК/ENTER ДЛЯ ПРОДОЛЖЕНИЯ VVV";
} 

#dialogue-box.can-skip::before {
    content: "ЛИНЕЙНЫЙ СЕГМЕНТ ПОТОКА - ПРОПУСК С ESC";
}

#dialogue-skip::before {
    content: "ПОДТВЕРЖДЕНИЕ::'пропуск сегмента потока'";
}

#skip-vfx::before {
    content: "ВЫПОЛНЯЕТСЯ::'продвижение сегмента'";
}

body:not(.mui-active) .target::after, body:not(.mui-active) #realgrid .target::before {
    content: "ПРАВАЯ КНОПКА МЫШИ";
}

.target.always-targeted[entaltname]::after,
.target.targeted[entaltname]::after,
#realgrid .target.targeted[entaltname]::before,
.always-targeted .target[entaltname]::after,
.always-targeted .target[entaltname]::before {
    content: attr(entaltname) !important;
}

@media screen and (max-width: 799px), (max-height: 599px) {
	html:not(.mobile):after {
		content: "ОШИБКА::\\A'текущее устройство визуализации непригодно';\\a'требуется нейронный вывод не менее 800x600'";
	}
}

#mindspike-scanner span.loose-thought::after {
    content: "..__НЕПОЛНОЦЕННАЯ_МЫСЛЕФОРМА__..";
}

body[quality="regular"] .quality::after { content: "Качество: ОБЫЧНОЕ" }
body[quality="low"] .quality::after { content: "Качество: НИЗКОЕ" }

.dialogue-message.incoherenthello .dialogue-text, .readout-log .message.incoherenthello {
    background-image: url(https://coppertubing.github.io/dontlookhere/images/hello.gif) !important;
}




#realgrid .cor-rusign {
    width: 40%;
    height: 40%;
    cursor: alias;;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%, contain;
    animation: TINYHOVER 5s ease-in-out infinite alternate;
    --baseTransform: translateZ(10px);
}
.mui-active #realgrid .cor-rusign::after, #realgrid .cor-rusign:hover::after {
    filter: opacity(1) !important;
}
#realgrid .cor-rusign::after {
    transition: filter 0.2s ease;
    filter: opacity(0);
    content: "";
    background-color: #ffffff38;
    border: 2px dotted var(--neutral-color);
    position: absolute;
    width: 150%;
    height: 75%;
    top: -25%;
    left: -25%;
    border-radius: 100%;
    animation: SPIN 10s linear infinite;
    backface-visibility: hidden;
    --webkit-backface-visibility: hidden;
}

.rulink {
    color: #b2ffff;
}
.rulink:hover {
    text-decoration-line: underline;
    color: #ffffff;
}
`,

    // i like colors

    fancy: {
        general: 'color:rgb(229, 142, 22)',
        observed: 'color:rgb(229, 194, 22)',
        setobserver: 'color:rgb(227, 227, 0)'
    },

    // funky functions that help with translation

    processSpecificTranslation: function (selector, attribute = false) { // --- this function is a mess yeah but im not fixing it cause it works
        if (selector == "mindpike") {
            document.querySelectorAll("#mindspike-examine").forEach(el=>{for (const childNode of el.childNodes) {childNode.textContent = "ИЗУЧ"}})
            document.querySelectorAll("#mindspike-act").forEach(el=>{for (const childNode of el.childNodes) {childNode.textContent = "ДЕЙСТ"}})
        } // i hate ACT and EXM strings bleeding into shit
        else if (attribute == false) {
            selector.forEach(el=>{
                for (const childNode of el.childNodes) {
                    if (childNode.nodeType === Node.TEXT_NODE) {
                        if (childNode.textContent != processStringTranslation(childNode.textContent)) childNode.textContent = processStringTranslation(childNode.textContent)
                    }
                }
            })
        }
        else {
            selector.forEach(el=>{
                if (el.getAttribute(attribute) != null) {
                    if (el.getAttribute(attribute) != processStringTranslation(el.getAttribute(attribute))) el.setAttribute(attribute, processStringTranslation(el.getAttribute(attribute)))
                }
            })
        }
        return
    },
    processEntityNamesSafeguard: function () { // --- bc i noticed sometimes they just wont get translated correctly. wack
        document.querySelectorAll("#content .target").forEach(el=>{
            let ent = el.getAttribute("entity")
            if(ent) { el.setAttribute("entaltname", processStringTranslation(ent))}
        })
    },
    processStatic: function (force) {
        cor_ru.processSpecificTranslation(document.querySelectorAll('title'));
        cor_ru.processSpecificTranslation(document.querySelectorAll(".enter"), 'page');
        if (force) processTranslation(document.querySelector(`#static`), true);
        else processTranslation(document.querySelector(`#static`));
    },
    processWarning: function (force) {
        if (force) {
            processTranslation(document.querySelector(`.cryptowarn`), true);
            processTranslation(document.querySelector(`#mod-warning`), true);
            processTranslation(document.querySelector(`#gpu-warning`), true);
            processTranslation(document.querySelector(`#wide-warning`), true);
            processTranslation(document.querySelector(`#dialogue-skip`), true);
        } else {
            processTranslation(document.querySelector(`.cryptowarn`));
            processTranslation(document.querySelector(`#mod-warning`));
            processTranslation(document.querySelector(`#gpu-warning`));
            processTranslation(document.querySelector(`#wide-warning`));
            processTranslation(document.querySelector(`#dialogue-skip`));
        }
    },
    processMenu: function () { // cannot force this one because that would defeat the purpose of it
        env.menu['system-menu'].querySelectorAll(".fundfriend").forEach(el=>{el.classList.add('tskip')})  // --- we dont want to translate fundfriends (even tho it would be funny)
        cor_ru.processSpecificTranslation(env.menu['system-menu'].querySelectorAll('#savetext'), 'placeholder');
        processTranslation(env.menu['system-menu'])

        processTranslation(env.menu['entity-menu'])

        processTranslation(document.querySelector("#meta-menu"));
        processTranslation(document.querySelector(`#advance-notice`));
        
        cor_ru.processSpecificTranslation(document.querySelectorAll('.ci-masks'), 'definition');
        cor_ru.processSpecificTranslation(document.querySelectorAll('.ozo-mask'), 'definition');
    },
    processReply: function () {
        cor_ru.processSpecificTranslation(document.querySelectorAll('.reply'), 'name');
        cor_ru.processSpecificTranslation(document.querySelectorAll('.reply'), 'definition');
        cor_ru.processSpecificTranslation(document.querySelectorAll('.reply'), 'endtext');
    },
    processReadout: function () {
        processTranslation(document.querySelector("#minireadout"))

        dothething = function (selector) {
            if (selector == null) return;
            messages = selector.querySelectorAll(".message")
            length = messages.length - 1

            messages.forEach(el=>{
                if (length > 0) {
                    el.classList.add('tskip')
                    el.querySelectorAll(" *").forEach(el=>{el.classList.add('tskip')})
                } // dont want it touching old readouts
                if (length == 1) {
                if (el.lastElementChild.textContent == "NOTE::'restored partial recent log'") processTranslation(el, true)
                } // touching the restored partial log note is fine tho
                length--})
            processTranslation(document.querySelector("#readout"))
        }

        dothething(document.querySelector("#readout"))
        dothething(env.menu['readout'])
        dothething(env.menuStorage?.elements['readout'])
    },

    // obserbor. the itself of them gets defined later

    observer: {
        /*template: {
            func: (consolething)=>{

                if (consolething != undefined) console.log(consolething[0], consolething[1]);
            },
            observe: ()=>{
                cor_ru.observer.template.itself.observe();

                console.log("%ctemplate observer is set up! - @cor-RU", cor_ru.fancy.setobserver)
            }
        },*/
        common: {
            func: (consolething)=>{
                processTranslation();
                processTranslation(document.querySelector(`#mindspike-scanner`));
                processTranslation(document.querySelector(`#advance-notice`));
                cor_ru.processEntityNamesSafeguard();

                if (document.querySelector("#combat")) {
                    processTranslation(document.querySelector(`#combat`), true) // force because things change in combat quite a lot so it does need to ignore the tdone
                    cor_ru.processSpecificTranslation(document.querySelectorAll(".floater"), "amt")
                }

                if (consolething != undefined) console.log(consolething[0], consolething[1]);
            },
            observe: ()=>{
                cor_ru.observer.common.itself.observe(document.querySelector("#mindspike-scanner"), { childList: true, subtree: true });
                cor_ru.observer.common.itself.observe(document.querySelector("#content"), { childList: true, subtree: true });

                console.log("%ccommon observer is set up! - @cor-RU", cor_ru.fancy.setobserver)
            }
        },
        bodychildren: {
            func: (consolething)=>{
                cor_ru.processWarning();
                
                if (document.querySelectorAll('#entity-menu .ent') != null) {
                    document.querySelectorAll('#entity-menu .ent').forEach(e=>{
                        if(e.getAttribute('entname')) {
                            e.addEventListener('click', ()=>{
                                let entity = flags.detectedEntities[e.getAttribute('pagename')]['entities'][e.getAttribute('entname')]
                                let container = document.querySelector('#entcontent')
                                container.innerHTML = ""


                                let replay = getReadoutMsg({message: entity.text.replace(/\n/g, "<br>"), type: `examine ${entity.type}`, name: entity.displayName || entity.name, image: entity.image})

                                try {replay = getReadoutMsg({message: cor_ru.entity_menu[entity.name]['desc'], type: `examine ${entity.type}`, name: cor_ru.entity_menu[entity.name]['name'], image: entity.image})}
                                catch (error) {
                                    console.warn("could not localize " + entity.name + " - @cor-RU")
                                    console.error(error)
                                }

                                container.insertAdjacentHTML('beforeend', replay)
                                setTimeout(()=>container.querySelector('.message').classList.add('active'), 5)
                            })
                        }
                    })
                    processTranslation(document.querySelector("#entity-menu"))
                }

                if (consolething != undefined) console.log(consolething[0], consolething[1]);
            },
            observe: ()=>{
                cor_ru.observer.bodychildren.itself.observe(body, {subtree: false, childList: true});

                console.log("%cbodychildren observer is set up! - @cor-RU", cor_ru.fancy.setobserver)
            }
        },
        gad: {
            func: (consolething)=>{
                cor_ru.processSpecificTranslation(env.menu["system-menu"].querySelectorAll(".mindsci-status"), "definition");

                if (consolething != undefined) console.log(consolething[0], consolething[1]);
            },
            observe: ()=>{
                cor_ru.observer.gad.itself.observe(env.menu["system-menu"].querySelector(".mindsci-status"), { childList: true, subtree: true, attributes: true });

                console.log("%cgad observer is set up! - @cor-RU", cor_ru.fancy.setobserver)
            }
        },
        dialogue: {
            func: (consolething)=>{
                cor_ru.processReply();

                if (consolething != undefined) console.log(consolething[0], consolething[1]);
            },
            observe: ()=>{
                cor_ru.observer.dialogue.itself.observe(document.querySelector("#dialogue-box"), { childList: true });

                console.log("%cdialogue observer is set up! - @cor-RU", cor_ru.fancy.setobserver)
            }
        },
        masks: {
            func: (consolething)=>{
                processTranslation(document.querySelector(`.ozo-mask-grid`))
                cor_ru.processSpecificTranslation(document.querySelectorAll('.ci-masks'), 'definition');
                cor_ru.processSpecificTranslation(document.querySelectorAll('.ozo-mask'), 'definition');

                if (consolething != undefined) console.log(consolething[0], consolething[1]);
            },
            observe: ()=>{
                cor_ru.observer.masks.itself.observe(document.querySelector(".ozo-mask-grid"), { childList: true });

                console.log("%cmasks observer is set up! - @cor-RU", cor_ru.fancy.setobserver)
            }
        },
        page: {
            func: (consolething)=>{
                new Promise((resolve) => {
                    if (consolething) cor_ru.updateResources()
                    resolve(getLocalizationForPage(true))
                })
                .then(()=>{
                    cor_ru.devved()
                            
                    processTranslation();

                    cor_ru.processStatic(true);
                    cor_ru.processMenu();
                    cor_ru.processWarning();

                    processTranslation(document.querySelector(`#definition-box`));
                    processTranslation(document.querySelector(`#mindspike-scanner`));
                    processTranslation(document.querySelector(`.ozo-mask-grid`))

                    cor_ru.processSpecificTranslation("mindpike");
                    cor_ru.processSpecificTranslation(document.querySelectorAll(".mindsci-status"), "definition");
                    cor_ru.processEntityNamesSafeguard();

                    cor_ru.observer.common.observe();
                    cor_ru.observer.bodychildren.observe();
                    cor_ru.observer.gad.observe();
                    cor_ru.observer.dialogue.observe();
                    cor_ru.observer.masks.observe();

                    if (consolething) console.log(consolething[0], consolething[1])
                })
            },
            observe: ()=>{
                cor_ru.observer.page.itself.observe(body, {attributes: true, attributeFilter: ['page']});

                console.log("%cpage observer is set up! - @cor-RU", cor_ru.fancy.setobserver)
            }
        },
    },

    // this is mildly annoying

    embassyCoherent: function () {
        if (env.localization.page['localocean']) env.localization.page['localocean'].entityDescriptions['the embassy'] = `::ПРОСТРАНСТВЕННАЯ МЫСЛЕФОРМА
::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'выступление';'велзи гогочет от восторга'</span>`
        cor_ru.entity_menu['the embassy']['desc'] = `::ПРОСТРАНСТВЕННАЯ МЫСЛЕФОРМА<br>
::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>"'выступление';'${processDefinitionsInString("велзи")} гогочет от восторга"')}</span>`},

    // tehehe we are devs now

    devElement: `<div class="devs ulbox tdone cor-ru">
    <ul class="tdone">
        <h4 class="tdone">НЕОФИЦИАЛЬНАЯ КОМАНДА ПЕРЕВОДА</h4>
        <li class="tdone"><span class="tdone" definition="@dutokrisa в discord!">ООО "РОСРАЗУМ"</span></li>
        <li class="tdone"><span class="tdone" definition="таинственный, но очень крутой человек!">НАО "Млечный Путь"</span></li>
        <li class="tdone"><span class="tdone" definition="@bra1nslug_ в discord!">Фонд "Моллюск"</span></li>
    </ul>
</div>`,

    devved: function () {
        if (env.menu["system-menu"].querySelector(".devs.cor-ru") == null) env.menu["system-menu"].querySelector(".devs").insertAdjacentHTML('afterend', cor_ru.devElement)
    },

    // loading and updating stuff as we go

    list: {
        everything: "https://coppertubing.github.io/dontlookhere/localization/everystuff.js",
        page: {
            fbx:                "https://coppertubing.github.io/dontlookhere/localization/basement.js",

            hello:              "https://coppertubing.github.io/dontlookhere/localization/auth-layer.js",
            hub:                "https://coppertubing.github.io/dontlookhere/localization/hub.js",

            localcity:          "https://coppertubing.github.io/dontlookhere/localization/their-city.js",
            citystreet:         "https://coppertubing.github.io/dontlookhere/localization/city-surface.js",
            aquarium:           "https://coppertubing.github.io/dontlookhere/localization/aquarium.js",

            localorbit:         "https://coppertubing.github.io/dontlookhere/localization/the-void.js",
            moon:               "https://coppertubing.github.io/dontlookhere/localization/bright-moon.js",
            dullvessel:         "https://coppertubing.github.io/dontlookhere/localization/our-dull-vessel.js",

            localocean:         "https://coppertubing.github.io/dontlookhere/localization/their-waters.js",
            localship:          "https://coppertubing.github.io/dontlookhere/localization/their-vessel.js",
            deck:               "https://coppertubing.github.io/dontlookhere/localization/vessel-surface.js",
            interview1:         "https://coppertubing.github.io/dontlookhere/localization/the-funny-little-room.js",

            localdepths:        "https://coppertubing.github.io/dontlookhere/localization/the-depths.js",

            localuncosm:        "https://coppertubing.github.io/dontlookhere/localization/uncosm.js",
            recosm:             "https://coppertubing.github.io/dontlookhere/localization/recosm.js",
            localuncosmwhere:   "https://coppertubing.github.io/dontlookhere/localization/memory-hole.js",
            sec:                "https://coppertubing.github.io/dontlookhere/localization/memory-hole.js",
            pit:                "https://coppertubing.github.io/dontlookhere/localization/labs.js",

            localship2:         "https://coppertubing.github.io/dontlookhere/localization/clemens-romanus.js",

            embassy:            "https://coppertubing.github.io/dontlookhere/localization/embassy.js",
            gol:                "https://coppertubing.github.io/dontlookhere/localization/golem-maintenance.js",
            ep4:                "https://coppertubing.github.io/dontlookhere/localization/pale-halls.js",
            "better-times":     "https://coppertubing.github.io/dontlookhere/localization/better-times.js",

            abyss:              "https://coppertubing.github.io/dontlookhere/localization/beneath-abyss.js",
            parasite:           "https://coppertubing.github.io/dontlookhere/localization/beneath-parasite.js",
            beneathdepths:      "https://coppertubing.github.io/dontlookhere/localization/beneath-maze.js",
            car:                "https://coppertubing.github.io/dontlookhere/localization/beneath-car.js",

            e3a2:               "https://coppertubing.github.io/dontlookhere/localization/frame.js",

            cache:              "https://coppertubing.github.io/dontlookhere/localization/cache.js",
            ozo:                "https://coppertubing.github.io/dontlookhere/localization/jokzi-ozo.js"
        },
        combat:     "https://coppertubing.github.io/dontlookhere/localization/combat.js",
        entityMenu: "https://coppertubing.github.io/dontlookhere/localization/entity-menu.js",
        load:       "https://coppertubing.github.io/dontlookhere/load.js",
    },

    updateResources: function (fresh = false) {
        let listArray = [];

        if (fresh == true) {
            listArray.push(cor_ru.list.everything);
            listArray.push(cor_ru.list.entityMenu);
            if (Object.hasOwn(cor_ru.list.page, page.dialoguePrefix)) listArray.push(cor_ru.list.page[page.dialoguePrefix])
                else if (page.dialoguePrefix != "notfound") console.warn("the page with dialoguePrefix " + page.dialoguePrefix + " does not have a localization! this might be a bug, but might also be intentional or plain expected if you are using other mods - @cor-RU");
            if (document.querySelectorAll(`script[src="/js/combat/combat.js?v=${page.cacheval}"]`).length != 0) listArray.push(cor_ru.list.combat);
            listArray.push(cor_ru.list.load);
        }
        else {
            if (Object.hasOwn(cor_ru.list.page, page.dialoguePrefix)) {if (document.querySelectorAll(`script[src="${cor_ru.list.page[page.dialoguePrefix]}?v=${page.cacheval}"]`).length == 0) {listArray.push(cor_ru.list.page[page.dialoguePrefix])}}
                else console.warn("the page with dialoguePrefix " + page.dialoguePrefix + " does not have a localization! this might be a bug, but might also be intentional or plain expected if you are using other mods - @cor-RU")
            if (document.querySelectorAll(`script[src="/js/combat/combat.js?v=${page.cacheval}"]`).length != 0) {
                if (document.querySelectorAll(`script[src="${cor_ru.list.combat}?v=${page.cacheval}"]`).length == 0) listArray.push(cor_ru.list.combat);
            };
        }
        if (listArray.length != 0) {console.log("%cupdating following resources! - @cor-RU", cor_ru.fancy.general); console.log(listArray); return addResources(listArray)}
        else console.log("%cno updates for resources needed! - @cor-RU", cor_ru.fancy.general)
    },
}

// yay! opbsbernr time

cor_ru.observer.common.itself = new MutationObserver(()=>{cor_ru.observer.common.func(["%ccommon observed! - @cor-RU", cor_ru.fancy.observed])})
cor_ru.observer.bodychildren.itself = new MutationObserver(()=>{cor_ru.observer.bodychildren.func(["%cbodychildren observed! - @cor-RU", cor_ru.fancy.observed])})
cor_ru.observer.gad.itself = new MutationObserver(()=>{cor_ru.observer.gad.func(["%cgad observed! - @cor-RU", cor_ru.fancy.observed])})
cor_ru.observer.dialogue.itself = new MutationObserver(()=>{cor_ru.observer.dialogue.func(["%cdialogue observed! - @cor-RU", cor_ru.fancy.observed])})
cor_ru.observer.masks.itself = new MutationObserver(()=>{cor_ru.observer.masks.func(["%cmasks observed! - @cor-RU", cor_ru.fancy.observed])})
cor_ru.observer.page.itself = new MutationObserver(()=>{cor_ru.observer.page.func(["%cpage observed! - @cor-RU", cor_ru.fancy.observed])})

// advance log thingy to warn guys that shit aint done past ep2
cor_ru['advance'] = function () {
    MUI('off'); flash(true); cutscene(true); exitMenu();
    if(env.bgm) env.bgm.fade(env.bgm.volume(), 0, 1000)
    corruStatic.play()
    corruStatic.fade(0, getModifiedVolume('music', 1), 1000)
                
    setTimeout(()=>{
        sessionStorage.clear()
        location.replace('/')
    }, 1000)
}
cor_ru['advancewarnclick'] = function () {
    document.body.insertAdjacentHTML('beforeend', `
        <div id="ru-warning" class="popup-warning">
            <div class="sysblock">
                <div class="sysbox ru">
                    <h3>!!__ПРЕДУПРЕЖДЕНИЕ__!!</h3>
                    <p class="sysinfo">Поздравляем! cor-RU - это работа в прогрессе, и Вы только что <em>достигли конца локализации основного контента!</em>.</p>
                    <p class="sysinfo">Контент из последующих эпизодов/"логов" (EP3, EP4) будет на английском языке.<br>Учтите, что весь <em>опциональный</em> контент, который возможно достичь в рамках текущего эпизода (EP2), локализован. <span style="font-size:75%">(Если Вы нашли что-нибудь на английском, не продвигаясь дальше EP2... расскажите пожалуйста этоважно)</span></p>
                    <p class="sysinfo">При продвижении лога рекомендуется удалить cor-RU, ибо поведение мода в непротестированных эпизодах непредсказуемо и может повлечь за собой баги или прочие странности.<br>Сделать это можно, просто убрав ссылку на мод из url-листа модификаций в системном меню и перезагрузив страницу.</p>
                    <p class="sysinfo">Вы также можете приостановить игру на текущем эпизоде. В таком случае кнопка "продвинуть лог" исчезнет, а игра будет вести себя так, будто Вы не прошли воспоминания обвала до конца.<br>Чтобы снова вызвать "продвинуть лог", Вы можете либо заново пройти воспоминание обвала, либо зайти в системное меню и нажать "вызвать продвижение лога".</p>
                    <p class="sysinfo">Если есть вопросы, просьбы, предложения или надо зарепортить баг, обращайтесь к @dutokrisa, @bra1nslug_ в дискорде или @bruhslug в телеграме. Также доступны: <a target="_blank" class="rulink" href="https://forms.gle/HHGhd4zU3VmJQgPCA">анонимная гугл форма</a> и <a target="_blank" class="rulink" href="https://discord.gg/GRx4Vqh2ar">дискорд сервер</a>.</p>
                    <p class="sysinfo">Спасибо за то, что играли с cor-RU!</p>
                    <div class="buttons">
                        <span id="rulog" class="button" onclick="cor_ru.advance();document.querySelector('#ru-warning').remove()">продвинуть лог</span>
                        <span id="rustay" class="button" onclick="change('ep1_end', false);document.querySelector('#ru-warning').remove();checkEpisodeProgress()">приостановить на текущем эпизоде</span>
                        <span id="rumeow" class="button" onclick="document.querySelector('#ru-warning').remove()">кнопочка котоаряничего не делает</span>
                    </div>
                </div>
            </div>
        </div>
    `)
}
cor_ru['advancewarndialogue'] = function () {
    setTimeout(()=>{document.body.insertAdjacentHTML('beforeend', `
        <div id="ru-warning" class="popup-warning">
            <div class="sysblock">
                <div class="sysbox ru">
                    <h3>!!__ПРЕДУПРЕЖДЕНИЕ__!!</h3>
                    <p class="sysinfo">СТОП! Вы достигли конца <em>полноценно переведённого контента cor-RU!</em></p>
                    <p class="sysinfo">Следующий эпизод будет состоять практически полностью из английского текста. Имейте в виду, что лог продвигается автоматически при перезагрузке страницы.</p>
                    <p class="sysinfo">Мы рекомендуем удалить cor-RU при дальнейшем прохождении игры, ибо поведение мода в непротестированных эпизодах непредсказуемо и может повлечь за собой баги или другие странности. (Сделать это можно, просто убрав ссылку на мод из url-листа модификаций в системном меню и перезагрузив страницу)</p>
                    <p class="sysinfo">Вы также можете отказаться от продвижения лога и приостановить игру на текущем эпизоде. Чтобы снова вызвать "продвинуть лог", ещё раз???????????.</p>
                    <div class="buttons">
                        <span id="gpu-done" class="button" onclick="document.querySelector('#ru-warning').remove()">оставить всё как есть</span>
                        <span id="gpu-hide" class="button" onclick="change('ep1_end', false);document.querySelector('#ru-warning').remove();checkEpisodeProgress()">приостановить на текущем эпизоде</span>
                    </div>
                </div>
            </div>
        </div>
    `)}, 16000)
}
env.entities['advance log'] = {
    hide: true,
    name: 'advance log',
    type: "system-component",
    image: "/img/textures/target.png",
    text: `::SYSTEM COMPONENT
    ::ALERT::<span style="color:var(--bright-color)">'current mindspike log procession concluded';'static environment sustained'</span>
    ::NOTE::'log state will advance on next visit';'utilize ACT:advance to immediately proceed to next state'`,
    actions: [
        {
            name: "advance",
            exec: ()=>{cor_ru.advance()},
            showIf: ()=>{
                if (check('ep1_end') && !check('fbx__ep2intro-end')) return false
                else return true
            },
        },
        {
            name: "advance",
            exec: ()=>{cor_ru.advancewarnclick()},
            showIf: ()=>{
                if (check('ep1_end') && !check('fbx__ep2intro-end')) return true
                else return false
            },
        }
    ]  
}

console.log("%c(en) contact @dutokrisa or @bra1nslug_ on discord if you have any questions, requests, suggestions or bugs to report. also availiable, albeit not recommended for non-russian speakers: anonymous google form (https://forms.gle/HHGhd4zU3VmJQgPCA), discord server (https://discord.gg/GRx4Vqh2ar), telegram channel (https://t.me/cor_RU) - @cor-RU", cor_ru.fancy.general)
console.log("%c(ru) свяжитесь с @dutokrisa или @bra1nslug_ в дискорде, если есть вопросы, просьбы, предложения или надо зарепортить баг. также доступны: анонимная гугл форма (https://forms.gle/HHGhd4zU3VmJQgPCA), дискорд сервер (https://discord.gg/GRx4Vqh2ar), телеграм канал (https://t.me/cor_RU) - @cor-RU", cor_ru.fancy.general)

if (!document.querySelector("#cor-rucss")) {
    document.head.appendChild(
        document.createElement(
            'style'
        ).appendChild(
            document.createTextNode(
                cor_ru.css
            )
        ).parentElement
    ).setAttribute(
            "id", "cor-rucss"
        )
}

page.formedDefinitionStrings = undefined // evil!!!!!!!!!!!!!!!!!!!!!!!


cor_ru.updateResources(true)
