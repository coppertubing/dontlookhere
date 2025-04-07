/* 
    cor-RU - a full russian adaptation mod
    by @dutokrisa, @shatteredstars and @bra1nslug_
    based on ENV.LOCALIZATION V1 EXAMPLE by @corruworks

    adaptation up until the end of EP0 currently availible

    thank you for using our mod

         ----------

    cor-RU - мод на полную русскую адаптацию
    от @dutokrisa, @shatteredstars и @bra1nslug_
    на основе ENV.LOCALIZATION V1 EXAMPLE от @corruworks

    в данный момент доступна полноценная адаптация до EP0

    спасибо за использование
*/
console.log('hiii')

var css = `
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
}


#dialogue-box.dialogue-click-proceed::after {
    content: "VVV КЛИК/ENTER ДЛЯ ПРОДОЛЖЕНИЯ VVV";
    display: block;
    width: 100%;
    text-align: center;
    animation: click-to-proceed 1s linear infinite;
} 

@font-face {
    font-family: 'spacemono';
    src: url('https://raw.githubusercontent.com/sshatteredstars/modfonts/main/modfont.woff2') format('woff2'),
        url('https://raw.githubusercontent.com/sshatteredstars/modfonts/main/modfont.woff') format('woff');
    font-weight: normal; 
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'barcode';
    src: url('https://raw.githubusercontent.com/sshatteredstars/modfonts/main/barc.woff2') format('woff2'),
        url('https://raw.githubusercontent.com/sshatteredstars/modfonts/main/barc.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'barcodetext';
    src: url('https://raw.githubusercontent.com/sshatteredstars/modfonts/main/barcode.woff2') format('woff2'),
        url('https://raw.githubusercontent.com/sshatteredstars/modfonts/main/barcode.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'beech';
    src: url('https://raw.githubusercontent.com/sshatteredstars/modfonts/main/beechy.woff') format('woff');
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

body:not(.mui-active) .target::after, body:not(.mui-active) #realgrid .target::before {
    content:"ПРАВАЯ КНОПКА МЫШИ" !important;
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
`

env.dialogues["russianSentryResponses"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        назначение?<+>purpose
            SHOWONCE::
        кто верифицирован?<+>whoisverified
            SHOWONCE::
        назначение этой цисты?<+>corrupurpose
            SHOWONCE::
            SHOWIF::[["hello__sentry-purpose"]]
        может если ты пропустишь меня<+>letthrough
            SHOWIF::[["hello_sentry_idiot"]]
`),
env.dialogues["hubBuddyResponsesRu"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self

        контейнер с металлом<+>ep0_container
            SHOWONCE::
            SHOWIF::[["hub__funfriend-fuelthanks", true],["exm|dullvessel|container"],["ep0_epilogue", "started"],["ep1_fed", false]]

        лазутчик?<+>interloperq
            SHOWONCE::
            SHOWIF::[['ep1_fed', false]]

        топливо?<+>fuelq
            SHOWONCE::  
            SHOWIF::[["hub__funfriend-kickoutq"], ['ep1_fed', false]]
        
        почему медь?<+>copperq
            SHOWONCE::  
            SHOWIF::[["hub__funfriend-fuelq"], ['ep1_fed', false]]

        необходимые металлы?<+>essentialmetalq
            SHOWONCE::  
            SHOWIF::[["hub__funfriend-copperq"], ['ep1_fed', false]]

        назначение?<+>purposeq
            SHOWONCE::

        подпись?<+>signatureq
            SHOWONCE::

        странная активность?<+>strangeactivity
            SHOWONCE::
            SHOWIF::[['interview1__firstchat-behonest']]

        появились врата?<+>moregates
            SHOWONCE::
            SHOWIF::[['visited_localorbit'], ["ENV!!ep2", false]]

        голодание решено?<+>ep1fed
            SHOWONCE::
            SHOWIF::[['ep1_fed'], ["ENV!!ep2", false]]

        состояние починок?<+>repairs
            SHOWIF::'hub__funfriend-ep1fed'
            HIDEREAD::
        
        другие воспоминания в посольстве?<+>embmemories
            SHOWONCE::
            SHOWIF::[["embassy_d2_complete"], ["ENV!!ep2", false]]

        посольство?<+>embassy
            SHOWIF::[["visited_localoceanembassy", true], ["ENV!!ep3", false]]
            SHOWONCE::

        почини связь<+>ep1comms
            SHOWIF::"ep1_end"
            SHOWONCE::

        я могу помочь?<+>ah1
            SHOWIF::[['hub__funfriend-ep1fed', true], ["recosm_state", false]]

        твоя проблема решена<+>ah1end
            SHOWIF::["recosm_state"]
            SHOWONCE::

        что нового?<+>ep2start
            SHOWIF::[["fbx__ep2intro-end", true], ["ENV!!ep3", false]]
            SHOWONCE::

        что нового?<+>ep3start
            SHOWIF::[["ENV!!ep3"], ["ENV!!ep4", false]]
            SHOWONCE::

        что нового?<+>ep4start
            SHOWIF::[["ENV!!ep4"]]
            SHOWONCE::

        мне нужно чтобы ты внёс изменения<+>mothframe
            SHOWIF::[["embassy__mothframe-end"], ["hub__funfriend-mothframe", false]]
            SHOWONCE::

        рассказать об озо и совете<+>ozo
            SHOWIF::[["ozo__council_intro"], ["ff_ozo", false]]

        можешь добавить врата в джокзи озо<+>ozogate
            SHOWIF::"ff_ozo"
            SHOWONCE::

        преимущество<+>lockcyst
            SHOWIF::[["ozo__council-task", false], ["leverageq", true]]
            SHOWONCE::

        обвал<+>collapse
            SHOWIF::"ep4__entrancefinal"
            SHOWONCE::

        вопрос<+>question
            SHOWIF::"seenFFProxy"
            HIDEREAD::

        мне пора<+>END
`),
env.dialogues["persistentQuestionsRu"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        проксидруг?<+>proxyfriend
            SHOWIF::"seenFFProxy"
        
        уничтожить озо?<+>ozodestroy
            SHOWIF::"ff_ozo"

        прошлое озо?<+>ozohistory
            SHOWIF::[["ozo__council-tyrant"], ["ozo__council-task"], ["ff_ozo"]]

        маски<+>masks
            SHOWIF::[["ff_ozo"], ["ozo__council-task"]]

        эффективность починок?<+>isabel
            SHOWIF::[["ff_ozo"], ["ozo__isabel-funfriend"]]

        неважно<+>loop
            FAKEEND::(назад)
`)
env.dialogues["mthglobalresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        кто...<+>who
        что...<+>what
        почему...<+>why
        что ты думаешь об этом всём?<+>mothep1end
            SHOWIF::[["ep1_end"], ["ENV!!ep3", false]]
        мысли об обвале?<+>ep3thoughts
            SHOWIF::[["ENV!!ep3", true], ["ENV!!ep4", false]]
        мысли об обвале?<+>ep4thoughts
            SHOWIF::"ep4__entrancefinal"
        преимущество получено<+>leverage //untranslated
            SHOWIF::[["leverageq", true], ["ozo__council-task", true], ["ozo__fairy_intro", true]]
            SHOWONCE::
        это всё<+>CHANGE::++moth
            FAKEEND::(назад)
`)
env.dialogues.mthglobalresp.whatnext = ()=>{
    if(!check('interview1__firstchat-behonest')) { /* before velziebreak */
             if(check('visited_localcitystreet') && check('visited_localoceanshipinterview') && check('visited_localdullvessel'))           return "выглядит так, что интервью продолжает поток памяти, а не сбрасывает его полностью. может стоит довести его до конца и посмотреть не откроются ли там какие-нить нейронные пути"
        else if(check('visited_localcitystreet') && check('visited_localoceanship') && check('visited_localdullvessel'))                    return "тот корабль показался мне слишком пустым для того количества данных, которое извлёк твой мыслекол. оглядись там ещё раз"
        else if(check('visited_localcitystreet') && check('visited_localocean') && check('visited_localdullvessel'))                        return "я вижу ещё целую кучу данных в океане, мы там точно всё проверили?"
        else if(check('visited_localcitystreet') && check('visited_localorbit') && !check('visited_localdullvessel'))                       return "я вижу что-то выглядящее как другое место в космическом мыслепространстве, попробуй разыскать"
        else if(check('visited_localcitystreet') && !check('visited_localorbit'))                                                           return "думаю тут есть путь к другому мыслепространству, я вижу что-то в непространственной части города но не могу сказать точно где. кажись оно двигается, наверно просто плавает где-то"
        else if(!check('visited_localcitystreet') && check('visited_localorbit'))                                                           return "что-нибудь наверняка ещё прячется в городской местности, я вижу достаточный объём данных чтобы подозревать что мы что-то пропустили"
        else /* scroll to the right if you don't see anything */                                                                            return "о чём ты меня спрашиваешь? ты ток подключился, делай свое дело чел. не забывай, мыслеформы могут выходить за пределы твоего восприятия - думай об этом, словно ты что-то 'прокручиваешь'"
    } else if(!check('ep1_showmaterials')) { /* post velziebreak, pre ep1 */
             if(check('ep0_epilogue', 'done'))                                                                                              return "теперь мы ждём когда прибудут наши инструменты-открывашки контейнеров. можешь сделать перерыв если хочешь, я дам знать когда всё придёт"
        else if(check('ep0_epilogue', 'started') && check('hub__funfriend-fuelthanks') && check('dullvessel_container_examined'))           return "похоже мы могли бы воспользоваться тем, что внутри дендритного контейнера, чтобы сохранить цисту живой, но у меня нет ни малейшего понятия как его открыть. спроси развледруга, есть ли у него идеи"
        else if(check('ep0_epilogue', 'started') && check('hub__funfriend-fuelthanks'))                                                     return "ну-п, теперь мы просто убиваем время до тех пока не придёт заказ на медь. не волнуйся, я дам знать как только его доставят"
        else if(check('ep0_epilogue', 'started') && check('dullvessel_container_examined'))                                                 return "значит в том контейнере 'обработанные металлы'... блин, так хотелось чтобы это было нашей зацепкой. может спросить ту развледружную штуку в хабе об идеях?"
        else if(check('ep0_epilogue', 'started') && !check('dullvessel_container_examined'))                                                return "нам надо разобраться, как сохранить эту штуковину живой. думаю тебе стоит поговорить с той развледружной фигнюшкой, у неё может оказаться пара идеек"
        else if(check('depths_depth') && !check('ep0_epilogue'))                                                                            return "тут чё-т реально странное в глубинах, они как будто постоянно изменяются. твой мыслекол не уведомляет тебя потому что это происходит ну типа тыщу раз в секунду. поищи там хоть что-нибудь"
        else if(!check('depths_depth') && check('dullvessel_dive'))                                                                         return "тут подскочила активность когда серое судно нырнуло, что-то точно изменилось в океане. попробуй найти, что это"
        else if(check('dullvessel_position', 'ocean'))                                                                                      return "ну должна же быть причина почему серое судно может передвигаться между космосом и океаном. не могла же эта безконтрольная сущность взять и сделать это просто так"
        else if(check('dullvessel_position', 'orbit') && check('dullvessel__fixed-hello'))                                                  return "кажись твоя улыбка починила цисту-пилота... и теперь она предлагает переместить серое судно куда-то. почему бы не попробовать?"
        else if(check('dullvessel__pilot-end'))                                                                                             return "проверь как там циста-пилот на корабле, я помню там были какие-то искажённые данные"
        else                                                                                                                                return "ну твой мыслекол сообщил о какой-то деятельности в мыслеформе серое судна, почему бы не разведать там обстановку? твоя таинственная улыбка похоже там что-то изменила"
    } else if(!check('fbx__ep2intro-end')) { //ep 1, after materials have been shown to the user for the first time
        //special check for if someone's looking for hints in the embassy days
        if(check("PAGE!!embassy_day"))  return "если ты спрашиваешь об этой мыслеформе, попробуй повзаимодействовать с акизет--для этого нужно отдалиться"

             if(check('hub__funfriend-ep1comms'))                                                                                           return "похоже что нам остаётся только ждать починок от развледруга. сделай перерыв?"
        else if(check('ep1_end'))                                                                                                           return "давай-ка поговорим с развледругом о починке связи, даже без угрозы велзи это было бы моей первой просьбой"
        else if(check('embassy_d2_complete'))                                                                                               return "я тут вижу что количество данных в районе городской улицы прибавилось... обязательно загляни туда"
        else if(check('embassy_d1_complete'))                                                                                               return "насколько я вижу, в посольстве ещё что-то есть"
        else if(check('hub__funfriend-ep1fed'))                                                                                             return "отправляйся в посольство, развледруг сказал что починил там что-то"
        else if(check('ep1_fed'))                                                                                                           return "давай проведаем развледруга, посмотрим что он думает"
        else                                                                                                                                return "надо бы цисту покормить, ты решай когда этим заняться, но как по мне - лучше сейчас"
    } else if(!check('fbx__ep3intro')) { //ep 2, has done sitdown intro
        if(check("embassy__d3_movefriend_finish-end"))                                                                                      return "nothing for now, just gotta wait for funfriend <span definition=\"NOTE::'advance log'\">to finish more of the memory</span>"
        else if(check("embassy__d3_start-end"))                                                                                             return "just keep working your way through the collapse memory, we've got more to see"
        else if(check("hub__funfriend-mothframe2"))                                                                                         return "looks like we're all set with the framing device, go check out the collapse memory again"
        else if(check("embassy__mothframe-end"))                                                                                            return "gotta talk to funfriend about installing my framing device"
        else if(check("hub__funfriend-ep2start"))                                                                                           return "let's go check out the embassy, funfriend said it fixed some stuff in there up"
        else                                                                                                                                return "we gotta see what's new! talk to funfriend, it'll probably tell you what's up"
    } else { //ep3!
        if(check("gol__bossclear"))                                                                                                         return "we're on the wait again. can't do anything till funfriend fixes <span definition=\"NOTE::'indicates end of current main content';'observe @corruworks for updates'\">more of the memory</span>"
        if(page.name == "golem-maintenance")                                                                                                return "just keep looking around in that memory! it looks like the framing device added an <span definition=\"NOTE::'top right when not speaking'\">objectives list</span>, take a look at that"
        else                                                                                                                                return "there's more to see in the embassy now, let's follow that thread until we can't anymore. it's the single most important event in obesk < - > earth history, imo"
    }
}
env.dialogues.mthlocalr = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        о развледруге<+>funfriend
            SHOWIF::[['hub__funfriend-fuelthanks']]
        о вратах<+>gates
            SHOWIF::[['visited_localorbit']]
        это всё<+>CHANGE::++moth
            FAKEEND::(назад)
    `)
    
env.dialogues.mthlocalfunr = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        поведение<+>ffdemeanor
            SHOWIF::['ep1_fed', false]
        ситуация с топливом<+>fffuel
            SHOWIF::[['hub__funfriend-fuelthanks'], ['ep1_fed', false]]
        подпись<+>ffsignature
            SHOWIF::[['hub__funfriend-signatureq']]
        хватит о развледруге<+>loop
            FAKEEND::(назад)
    `)
env.localization = {
    dialogues: {
        "index": generateDialogueObject(`
start 
    moth
        эй, дружище, добро пожаловать 
        у меня были сомнения, что ты появишься на такой мелкий улов
        в последнее время находят столько кораблекрушений
        в любом случае сейчас я всё запущу, можешь пока осмотреться
        
    sourceless
        декодирующие машины включаются, бросая свет на паутину проводов.
            EXEC::document.querySelectorAll('.backwall').forEach(e=>e.classList.add('active'))
        
    RESPONSES::self
        что это<+>whatis
        сесть<+>sit
            SHOWIF::["PAGE!!intrositting", false]
            EXEC::change('PAGE!!intrositting', true)

whatis
    self
        что это?
    moth
        находка с обескового крушения возле новой зеландии
        в записях сказали, почти всё расплавилось, что немного странно...
        во всяком случае... главная часть это вот эта большая
        пьедесталы обычно означают «важно», но этот не помеченный
        алекс сделал базовый скан, сказал напоминает сетевой узел
        мы даже не знаем наверняка, примет ли оно мыслекол
        ну, тебе платят так или иначе, так что... пробуй
        
    RESPONSES::self
        сесть<+>sit
            SHOWIF::["PAGE!!intrositting", false]
            EXEC::change('PAGE!!intrositting', true)
        активировать мыслекол<+>END
            SHOWIF::"PAGE!!intrositting"
        
sit
    sourceless
        металлический стул царапает бетон. ты садишься.
            EXEC::env.introSit()
            WAIT::3500

    sourceless
        сиденье холодное и неудобное. свет от твоего защитного снаряжения рассеивается в перламутровых цистах.
        
    moth
        как по старинке - мыслекол на готове

    RESPONSES::self
        что это<+>whatis
            SHOWONCE::
        активировать мыслекол<+>END
        
END::env.enableSpikeCursor();MUI('deprohibit')
        `),
        "++epselect": generateDialogueObject(`
start
    sys
        ВНИМАНИЕ::'выбор любого эпизода сбросит текущий прогресс'
        РЕКОМЕНДАЦИЯ::'экспортируйте сохранение до выбора эпизода'
        РЕКОМЕНДАЦИЯ::'подтвердите намерение ниже'
    
    RESPONSES::self
        продолжить, потеря текущего прогресса не проблема<+>proceed
            HIDEREAD::
        неважно, я хочу сохранить текущий прогресс<+>END

proceed
    sys
        ЗАПРОС ПОЛЬЗОВАТЕЛЮ::'выбор лога'

    RESPONSES::sys
        эпизод 0<+>END
            EXEC::cutscene(true);setTimeout(()=>deleteSave(), 1000)
            FAKEEND::(загрузить EP0)
        эпизод 1<+>END
            EXEC::mountSave(GlobalSaves.ep1start)
            FAKEEND::(загрузить EP1)
        эпизод 2<+>END
            EXEC::mountSave(GlobalSaves.ep2start)
            FAKEEND::(загрузить EP2)
        эпизод 3<+>END
            EXEC::mountSave(GlobalSaves.ep3start)
            FAKEEND::(загрузить EP3)
    
    RESPONSES::self
        неважно, я хочу сохранить текущий прогресс<+>END
`),
"menu_hub": {
    start: {
        name: "start",
        body: [
            {
                actor: "sys",
                text: "ЗАПРОС ПОЛЬЗОВАТЕЛЮ::'намерение'"
            },
        ],

        responses: [
            {
                name: "self",
                replies: [
                    {
                        name: 'вернуться в хаб',
                        destination: 'EXEC::endDialogue()',
                        hideRead: true,
                        exec: ()=>{
                            cutscene(true)
                            corruRefresh('/hub/', 3000)
                            if(env.e3a2) env.e3a2.clearWarningListener()
                            setTimeout(()=>{
                                readoutAdd({message: `EXECUTING::'retrace';'localhost'`, name:"sys"})
                            }, 1000)
                        }
                    },
                    {
                        name: 'отключиться',
                        destination: 'EXEC::endDialogue()',
                        hideRead: true,
                        exec: ()=>{
                            cutscene(true)
                            corruRefresh('/', 3000)
                            if(env.e3a2) env.e3a2.clearWarningListener()
                            setTimeout(()=>{
                                readoutAdd({message: `EXECUTING::'eject'`, name:"sys"})
                            }, 1000)
                        }
                    },
                    {
                        name: `неважно`,
                        destination: 'END',
                        exec: ()=>{
                            endDialogue()
                            setTimeout(()=> readoutAdd({message: `NOTE::'aborted'`, name:"sys"}), 1000)
                        }
                    }
                ]
            }
        ]
    },
},
        "++moth": {
            end: mothHasUnreadCheck,
            start: {
                name: "start",
                body: [
                    {
                        actor: "moth",
                        text: "чё как, дружище?",
                        texec: ()=> {return env.pageHasMothComment()}
                    },
                ],
        
                responses: [
                    {
                        name: "self",
                        replies: [
                            {
                                name: ()=>{return processStringTranslation(page.mothChat.startName)},
                                destination: 'EXEC::changeDialogue(page.mothChat.getDest())',
                                showIf: [["EXEC::env.pageHasMothChat()"]],
                                unreadCheck: ()=> checkUnread({destination: "start", arbitrary: true}, page.mothChat.getDest()),
                                class: "changeread",
                            },
                            {
                                name: 'у меня есть вопросы',
                                destination: 'CHANGE::++mothglobal',
                                class: "changeread"
                            },
                            {
                                name: "что делаем дальше?",
                                destination: 'whatnext',
                                hideRead: true
                            },
                            {
                                name: 'я странно себя чувствую',
                                showIf: [["netstat|<", 0]],
                                destination: 'CHANGE::++mothfj'
                            },
                            {
                                name: `вернёмся к делу`,
                                destination: 'END',
                                exec: mothHasUnreadCheck
                            }
                        ]
                    }
                ]
            },
            whatnext: {
                name: "whatnext",
                body: [
                    {
                        actor: "moth",
                        texec: ()=> {return env.dialogues.mthglobalresp.whatnext()}
                    },
                ],
        
                responses: [
                    {
                        name: "self",
                        replies: [
                            {
                                name: "понятно",
                                destination: 'CHANGE::++moth',
                                fakeEnd: "(назад)"
                            }
                        ]
                    }
                ]
            }
        },
        "++mothglobal": generateDialogueObject(`
start
    self
        у меня есть несколько вопросов

    moth
        валяй, я постараюсь ответить
    
    RESPOBJ::mthglobalresp

loop
    RESPOBJ::mthglobalresp

who
    RESPONSES::self
        ты<+>who_you
        акизетеше<+>who_akizetesche
            SHOWIF::"hub__funfriend-purposeq"
        гордон<+>who_gordon
            SHOWIF::[['citystreet__envoy-end']]
        велзи<+>who_velzie
            SHOWIF::[['dullvessel__fixed-how']]
        неважно<+>loop
            FAKEEND::(назад)

who_you
    self
        кто ты?

    moth
        лол
        окей но серьёзно у тебя есть вопросы?

    RESPONSES::self
        наверно<+>loop
            FAKEEND::(назад)

who_akizetesche
    self
        кто - акизетеше?

    moth
        одна из наверно наилучше задокументированных ранних контактов с обесками
        история гласит, она возглавляла команду по исследованию вещи, приведшей обесков сюда
        постоянно давала долгие, подробные интервью о ней, они назвали это 'зов'
        а потом они все пропали через несколько лет после первого контакта
        стрёмная херня
        безумно что эта корруциста смогла продержаться так долго

    RESPONSES::self
        интересно<+>loop
            FAKEEND::(назад)

who_gordon
    self
        кто такой гордон?

    moth
        хороший вопрос
        не могу найти точное совпадение, но он стопудов агент ФБКС
        было бы легче если бы корруциста акизет помнила его лицо по-нормальному
        ещё вернёмся к этому, может мы ухватим его фамилию и будет проще

    RESPONSES::self
        удачи<+>loop
            FAKEEND::(назад)

who_velzie
    self
        кто - велзи?

    moth
        велзи - это что-то типа 'божество' на языке обеск
        суть не только в этом но я полагаю ты спрашиваешь о <em>нашем</em> велзи
        ну о том о котором говорила циста-пилот
        я заметил что когда она упомянула это имя, оно не имело никакого контекста
        типа, почему-то слово "велзи" было отделено от своего значения
        не знаю что это за приколы...
        уверен она виделась с тем странным лицом
        может быть какой-то мыслеформе ударила бессвязность в голову и она возомнила себя богом

    RESPONSES::self
        странно<+>loop
            FAKEEND::(назад)


what
    RESPONSES::self
        корру<+>what_corru
        корруцисты<+>what_corrucyst
        зов<+>what_thecall
            SHOWIF::[['interview1__firstchat-behonest']]
        улыбающееся лицо<+>what_smile
            SHOWIF::[['hello__sentry-posthello']]
        корруцистозное топливо<+>what_fuel
            SHOWIF::[['hub__funfriend-fuelthanks']]
        глаз велзи<+>what_eye
            SHOWIF::"exm|embassy|unkind eye"
        mindcores<+>what_mindcores
            SHOWIF::"embassy__d3_person_enable-end"
        вейльк<+>what_veilk
            SHOWIF::"exm|embassy|veilk models"
        секри<+>what_secri
            SHOWIF::"embassy__d2_bozkocavik-end"
        маски<+>what_masks
            SHOWIF::"ozo__council-task"
        серое<+>what_dull
            SHOWIF::"ep4__contact"
        ...если эти знания ставят нас под угрозу?<+>what_fbxlist
            SHOWIF::[["ep1_end", true], ["ep4__h2h", false]]
        неважно<+>loop
            FAKEEND::(назад)

what_masks
    self
        what are masks
    
    moth
        that's new ground you're discovering buddy
        best i can tell from context is that they're like tools and weapons
        something these thoughtforms carved from akizet's memories somehow
        they don't have an actual physical presence, because otherwise you couldn't have received them
        also, they passed right through the connection and only to you
        and it's like my machines ignored them or couldn't see them at all
        this is probably some entire new field of science we just stumbled into lol
        thoughtform technology or something
        whatever it is, it's way beyond my scope

    RESPONSES::self
        ok<+>loop
            FAKEEND::(назад)

what_secri
    self
        что такое секри?

    moth
        да лааадно, не можешь же ты не знать про <em>секри</em> фильмы
        истинные шедевры сороковых
        бож, надеюсь никто из обесков никогда не видел их, они должно быть такие издевательские
        если ты всерьёз, то это одно из существ о которых я и впрямь немного знаю
        по сути они - сверххищники на обески
        и как и остальная половина всей фауны на обески, они также паразиты
        или какого-то рода грибковая инфекция... мы на самом деле не знаем точно
        а ещё они микроскопические, но вот стоит им заразить какую-нибудь поверхностную зверюшку или личиночного обеска...
        ну, на руках у нас только устные описания ибо инициатива по обмену не спешила с реконструкциями,
        но по-видимому они могут быстро видоизменять плоть большинства существ и захватывать их мозг, чтобы распространяться дальше
        противные штуки

    RESPONSES::self
        окей<+>loop
            FAKEEND::(назад)

what_eye
    self
        что такое глаз велзи?

    moth
        it's a feature of the gas giant obeski is tidally locked to
        the obesk use its visibility for time
        some parts of obeski worship or despise it as the eye of god
        given how dark their world is,
        and they have this giant glowing eye-looking thing in the sky at all times,
        it's no wonder that they came to that conclusion
        although, we don't really know whether it's a storm, or something else
        because the obesk say that it glows during regular intervals
        of course, that could just be their star reflecting off of it...
        but without pictures or anything, we can really only guess

    RESPONSES::self
        понятно<+>loop
            FAKEEND::(назад)  

what_veilk
    self
        что такое вейльк?
    
    moth
        они, в принципе, покрывают всю обитаемую поверхность обески
        типа как трава растёт по всей земле, наверно
        и... они вырастают до размера небоскрёбов...
        они видимо умеют ходить,
        ээ... у них куча ног...
        и когда один из них умирает, целая экосистема образуется вокруг его трупа
        частью которой каким-то образом являются обески
        ...
        сорян, если честно я не так много о них знаю
        экология на обески даже близко не стоит с моей специализацией
        я в основном изучаю корруцистозные штуки и взаимоотношение людей с обесками
        чуть-чуть культуры там и тут
        и не пойми меня неправильно, вейльки очень важны для них в культурном плане,
        практически вся их одежда делается из вейльковой кожи
        и их пещерные города зависят от вейльковых падений для добычи пропитания
        но у нас на самом деле нет хорошего представления о том, как они устроены
        или как они даже выглядят, исключая стилизованные скульптуры

    RESPONSES::self
        окей<+>loop
            FAKEEND::(назад)
        

what_mindcores
    self
        are all obesk actually these weird little spider things?

    moth
        не, только куу
        the "larval" obesk go through some procedure that makes them into those
        we got a few descriptions of it before they pulled back
        but they're all really abstract, like...
        "climbing through their receptors into a mindcore", leaving an "empty vessel" to its "peaceful death"
        nothing scientific, but they always emphasized it not just being a copy
        then they build themselves bodies out of corru to drive around
        that's what those qou-bodies are

    RESPONSES::self
        а, хорошо<+>loop
            FAKEEND::(назад)

what_corru
    self
        что такое корру?

    moth
        интересное время чтобы задавать такие вопросы, но я тебя не виню
        большинство людей начинают задаваться подобным как только взглянут на него поближе, даже если читали всю документацию
        исключая суп из умных слов а-ля "суперклеточный суперорганизм", что это такое в общей картине пока не то чтобы ясно
        я прочёл чуть ли не каждую стенограмму всех когда-либо взятых интервью с обесками, и они вообще не упоминают происхождение корру или то как у них возник симбиоз с ним
        и типа, если "личиночные" обески правда выглядят почти так же как мы, а потом они переходят в корруцистозные тела, то что это значит для нас?
        хз, сойти с ума можно если думать об этом слишком долго, впрочем щас нет времени философствовать

    RESPONSES::self
        понятно<+>loop
            FAKEEND::(назад)

what_corrucyst
    self
        что такое корруцисты?
    
    moth
        довольно общий термин, по сути "корруциста" и "корруцистозный" - универсальные названия для большинства обесковой технологии
        потому что у организма есть тенденция сворачиваться в шарик и образовать твёрдую оболочку прям как у этой цисты
        именно поэтому корруцистозные штуки обычно сферичные, но это не всегда так
        например они используют подобный процесс для формирования тел которые используют куу обеск
        если ты имеешь в виду что такое сферичные корруцисты, то обычно они выступают в роли хранилищ или вычислительных приборов
    RESPONSES::self
        понятно<+>loop
            FAKEEND::(назад)

what_thecall
    self
        что такое 'зов'?

    moth
        довольно важная часть человеческо-обесковой истории которую нередко упускают из виду
        предположительно, они смогли найти землю только потому что что-то с неё посылало сигнал, улавливаемый их технологией
        в первое время после первого контакта они пытались выяснить, что это такое, и оч много говорили об этом
        затем команда акизет пропала и они просто замолчали
        ...а потом случилось всё остальное
        примерно тут всё и пошло наперекосяк
____SHOWIF::"ep4__entrancefinal"
        лол, сейчас это уже больше напоминает только самую верхушку айсберга
____SHOWIF::["ep4__entrancefinal", false]
        может эта корруциста наконец прольёт свет на то что произошло
____END
    RESPONSES::self
        понятно<+>loop
            FAKEEND::(назад)

what_smile
    self
        время от времени я вижу это странное улыбающееся лицо
        что это?
    
    moth
        в логах ничего такого нет, ну если ты не про того челика-ассистента в хабе

    self
        мне кажется, это оно помогло мне войти

    moth
        о, так оно у тебя как улыбка выглядит?
        может быть моя теория о вирусах не так уж плоха
        ну короче, я всё ещё без понятия чем является наш таинственный приятель
        но похоже это 'велзи', смотря по тому что сказала циста-пилот
            SHOWIF::[['dullvessel__fixed-start']]

    RESPONSES::self
        тревожит<+>loop
            FAKEEND::(назад)

what_fuel
    self
        чем является корруцистозное топливо?
    
    moth
        в интервью они всегда говорили что это что-то выращиваемое... 
        большинство теорий сходится в том что это какой-то металлический грибок который корру способно потреблять
        судя по словам равзледруга, они применяют кучу разных металлов для его изготовления
            SHOWIF::[["hub__funfriend-essentialmetalq"]]
        наверно логично что они используют металлы, но я не представляю себе как это работает
            SHOWIF::[["hub__funfriend-essentialmetalq"]]
    
    RESPONSES::self
        тревожит<+>loop
            FAKEEND::(назад)

what_dull
    self
        что ты знаешь о среде серое?
    
    moth
        о, чел, ты не готов к моим разглагольствованиям о серое
        мы б тут всю ночь просидели
        такое разочарование что мы не так уж и много о ней знаем
        но... если вкратце о том, что мы знаем точно,
        и это всё типа штуки с интервью,
        был да жил один инженер-экивик - сероезковик жат, э, чётотам,
        который открыл что существует как минимум два вида, типа, реальности
        то что они называют сценой велзи - вот эта - и то что они в итоге назвали средой сероезковика
        или просто среда серое
        короче, мы не знаем как именно ему удалось совершить это открытие, но...
        погоди, я слишком много говорю об истории не так ли. я вижу как ты на меня смотришь
        окей. правда, серьёзно вкратце,
        мы знаем больше о её истории чем о всех её физических свойствах вместе взятых
        это одна из вещей, которой обески не успели полноценно с нами поделиться до того как всё рухнуло
        а может они просто не хотели
        они успели рассказать мол органическая жизнь не может пройти через неё, не будучи уничтоженной,
        однако вот корру без особых проблем выжить может, при условии небольшой подготовки...
        м... что ещё...
        ходит куча безумных теорий о том, чем она является взаправду
        типа паралелльная вселенная, другое "измерение" или такое, но...
        имхо, это уже заходит на территорию какого-то нереалистичного кино
        всё вряд ли так просто
        у нас просто нет средств на какое-либо осмысленное взаимодействие с ней
        и обески больше особо больше не помогают
        единственное что можно сказать с уверенностью это то что физики очень бесятся по этому поводу
        тек-с... думаю, больше ничего полезного я тебе предоставить не могу
        сорянчик
        всё остальное либо запредельно засекречено,
        либо ждёт нас в этой цисте
    
    RESPONSES::self
        хорошо<+>loop
            FAKEEND::(назад)

what_fbxlist
    self
        что если эти знания ставят нас под угрозу?
    
    moth
        да об этом можно не беспокоиться
        ФБКС не похоже на ЦРУ или ФБР
        худшее что может случиться это пара подписей на договорах о неразглашении
        и судя по тому что мы уже увидели, они неизбежны
        но в вечный отпуск они нас не отправят, если ты это имеешь в виду
    
    RESPONSES::self
        хорошо<+>loop
            FAKEEND::(назад)

why
    RESPONSES::self
        ...у меня иногда выходит визуализировать бессвязные места<+>why_beneath
            SHOWIF::"beneath"
        ...никто другой ещё не вовлечён<+>why_involved
            SHOWIF::"ep1_fed"
        ...именно я<+>why_callme
        ...у меня получилось подключиться<+>why_connect
            SHOWIF::[["EXEC::page.dialoguePrefix != \`fbx\`"]]
        ...я понимаю эти мысли<+>why_thoughts
            SHOWIF::[["EXEC::page.dialoguePrefix != \`fbx\`"]]
        ...я слышу музыку<+>why_music
            SHOWIF::[["EXEC::page.dialoguePrefix != \`fbx\`"]]
        неважно<+>loop
            FAKEEND::(назад)

why_beneath
    self
        почему у меня иногда выходит визуализировать бессвязные места?
        например то, которое показалось тебе очень странным

    moth
        ну точно я не скажу, но помнишь мою теорию?
        ты ж на <span definition="ВНУТРЕННИЙ КОНТЕКСТ::'первый выпуск операционной системы мыслекола'">тонге</span>, да? с ней большую часть обработки выполняет твой мозг
        у системы есть проверки чтобы не давать тебе визуализировать бессвязные штуки
        потому что они могут навредить тебе или вызвать <span definition="ВНУТРЕННИЙ КОНТЕКСТ:'изменённое восприятие времени';'признак скорого инсульта'">временную несоосность</span> или и тд и тп
        не то чтобы <em>вот это</em> могло, конечно, оно отличается от человеческой бессвязности
        ну короче--большую часть времени она полагается на то, чтобы твой мозг сам посылал сигналы типа "бля что-то не так", чтобы блокировать бессвязность
        но поскольку ты вошёл во что бы это ни было <em>из</em> уже довольно бессвязного места,
        твой мозг как бы уже привык к бессвязности
        типа как тот старый анекдот про лягушку в кипятке, ага?
        ...
        так, просто для ясности, твой мозг не "в кипятке"
        по идее всё, что творится в этих бессвязных областях, для тебя должно быть совершенно нормально
    
    RESPONSES::self
        ладно<+>loop
            FAKEEND::(назад)

why_involved
    self
        почему до сих пор только мы знаем об этом всём?

    moth
        о
        эээ...
        ну, отчёт ещё типа не отдан
        гляди, если мы сами докопаемся до сути всего этого, ты понимаешь насколько огромным событием это будет?
        если я проболтаюсь хоть кому-нибудь о том, что у нас тут за дела, они это выхватят из наших рук
        ...и передадут какому-нибудь высокопоставленному исследователю который пригребёт себе каждую заслугу
        чел, мы можем добиться такого успеха

    self
        разве здесь нет камер? что насчёт данных?

    moth
        только не в подвале
        это зона аналоговых устройств, ну или по крайней мере была ей в более загруженные года
        сейчас всё пораспущеннее, но они никогда не меняли что внутри стен
        особенно при том что все подобные находки обычно оказываются пустышками
        так что... пока я не пошлю данные, они их не получат
        пока что ты и я занимаемся этим в одиночку, дружище

    RESPONSES::self
        ок<+>loop
            FAKEEND::(назад)


why_callme
    self
        почему над этим работаю именно я?

    moth
        что, не устраивает роль самого первого человека, которому удалось подключиться к персональной корруцисте?
        шучу. у нас не хватает мыслеколящих подрядчиков из-за той катастрофы с последним обновлением
        боже, я даже представить себе не могу о чём в майндсай только думали лмао, траффик до сих в таком хреновом состоянии
        ты - единственный знакомый мне псих который никогда ничего не обновляет, так что я подумал ты примешь работу

    RESPONSES::self
        спасибо<+>loop
            FAKEEND::(назад)

why_connect
    self
        почему у меня получилось подключиться так легко?

    moth
        ну если у тебя из головы вылетело, у тебя определённо точно установлен тот патч от фбкс
        обычно мыслеколы не могут такое
        вроде как корруцисты посылают и принимают сигналы практически полностью идентичные нервным
        довольно невероятное совпадение, просто чудо что это вообще работает
        но я не разбираюсь в этом, тебе лучше спросить кого-нибудь в отделе разработчиков

    RESPONSES::self
        ок<+>loop
            FAKEEND::(назад)


why_thoughts
    self
        почему я понимаю эти обесковые мысли?

    moth
        ну смотри, ты тут имеешь дело с сырыми мыслями
        слова, которые ты получаешь от корруцисты - это не то что она буквально думает
        твой мозг просто интерпретирует концепты понятным тебе образом

    RESPONSES::self
        круто<+>loop
            FAKEEND::(назад)


why_music
    self
        почему я иногда слышу музыку?

    moth
        слышишь музыку? дико, но имеет смысл
        некоторые мыслеколящие подрядчики, с которыми мне доводилось работать, говорили похожие вещи когда подключались к корруцистозным устройствам
        моя теория - это какой-то унаследованный контекст из цисты, расплывчатые ощущения которые нельзя перевести в речь
        иногда люди слышат голоса или просто "знают" как себя чувствовать
        твой мозг просто обрабатывает это в наиболее понятном тебе формате
        идей получше у меня нет
        так или иначе, на моей стороне ничего не слышно, просто вывод данных
        тебе нравится?

    RESPONSES::self
        она нормальная<+>loop
            FAKEEND::(назад)

mothep1end
    self
        What do you think of all this?
        The embassy, Gordon's involvement...
    
    moth
        i think we landed ourselves a security level increase
        never heard anything about internal strife with the obesk before this
        they've always had this image of total harmony, despite their homeworld
        and you know, with the call...
        i think it's only a few years until the call is "complete" if all this is true
        or... maybe even less?
        idk just some quick headmath
        if we can get to the bottom of this soon and bring it all to the higher ups...
        could you even imagine the kind of renown we'd both get?
    
    RESPONSES::self
        тебе не страшно?<+>mothep1afraid
        окей<+>loop
            FAKEEND::(назад)

mothep1afraid
    self
        Aren't you afraid of what will happen when the call is complete?
        What if it's something really bad?

    moth
        yeah, it's spooky, but...
        we've both lived through too many "world-ending" crises for this to be the "real" one
        besides, what if they can't even decode the call?
        either cause it's too big, or because they didn't get the very start of it...
        like, what if they need the whole thing?
        and hey, what if whatever's down there in the ocean is just as friendly as the rest of them?
        basically... whatever happens, we'll deal with it
    
    RESPONSES::self
        раз ты так говоришь<+>loop
            FAKEEND::(назад)

ep3thoughts
    self
        что ты думаешь об обвале?
        у тебя вроде были мысли?
    
    moth
        о, да!
        so, i always thought it was a tragedy
        especially since it was the cap on the golden age of human and obesk relations
        like, truly golden age... but man, looking back at the news from those days makes me so sad
        videos, news, everything, everyone felt like everything was going to change
        and, i mean, things did change, but, i'm talking space age change
        apparently everyone really thought we'd be exploring the stars with the obesk
        like, they'd uplift us, or whatever...
        all right, i'm off topic and i haven't even gotten to the topic yet
        basically:
        when the collapse started happening, people reported some truly strange events with obesk machines
        golems started acting erratically, but never actually hurt anyone
        like, i was watching this video of some annoying vlogger who was trying to interview one near a polygonation spire
        pretty sure it was the one close to new zealand actually
        but right in the middle of him harassing this golem, its face flickers and it nearly falls over
        then, it just starts floating past him, right into the ocean, and disappears beneath the surface
        so the vlogger turns the camera back on his face and he's doing that surprised thumbnail thing they used to do back then
        and in the background, you can see other golems doing it too, 
        just before the spire starts collapsing and everyone has to run
        spooky shit, man... even golems further inland apparently started going for the coast too
        oh, and--there was this article i found, there was this one engineer qou that had an "accident" with a golem
        it didn't say their name, but there was a picture of the aftermath
        they totally minced this golem they were working with, then apologized to everyone and ran off
        it's pretty clear that whatever seized all of their tech had literally zero intent to harm a single human
        so what the hell are these golems attacking the embassy for?
        ...
        all right, i know i'm rambling, but one more thing
        no matter where i looked, even using those new net filter tools,
        after the collapse news cycle settled
        there was not a single mention of akizet or her team anywhere - no photos, videos, nothing
        i mean, sure, a little historical paper here and there, but... well
        i'm a little worried we may not have a whole lot of time left with akizet's memories if this is anything to go by
    
    RESPONSES::self
        ...<+>loop
            FAKEEND::(назад)

ep4thoughts
    self
        что ты думаешь об обвале
        раз мы теперь всё увидели
    
    moth
        i knew they weren't going to just, stop it
        but i had no idea it would get that fucked up
        there were things happening in there that i'm still trying to make sense of
        vekoa choosing to kill qou, when she's from a world where intraspecies murder basically doesn't happen
        not just using her golems, but making monsters with the fucking ceremony thing??
        and could you imagine what would have happened?
        like, if vekoa actually managed to make a dull contrivance?
        assuming it was a temporary contrivance, not like the big one in space,
        the whole embassy, the whole island, it would have just blipped away somewhere
        and nobody would have any idea what happened...
        so they didn't stop the collapse,
        and sure, tozik majorly polluted up the ocean around it,
        but somehow, i think in another world, if they failed-failed,
        things would be much worse
    
    self
        может
        что насчёт метеорита?
        вовлечённости ФБКС?

    moth
        the meteorite, i don't know, that's...
        that's something on a scale that's really hard for me to grasp
        it makes sense, really
        i know this sounds sick but i'm almost not surprised at this point
        it's the only start to an explanation for the call that makes any sense, right?
        where it comes from is some other shit we'll have to figure out
        still, you'd think we would have found it by now, 
        even before the obesk showed up...
        maybe knowing it's there will have a larger impact when i'm trying to fall asleep tonight
        but you know what really freaks me out?
        the FBX involvement
        cause we know that akizet and her team disappeared completely after this
        and now we know for sure that the FBX probably had a hand in sparking the collapse
        dude, if this ever got public, the media would crucify us
        and knowing all that, with how long it's been
        we've totally fallen into <span definition="ВНУТРЕННИЙ КОНТЕКСТ::'программа особого доступа';'sensitive compartmentalized information';'highest classification level'">ПОД</span> territory here
        i'm talking like men in black who don't legally exist rolling up to your apartment type of shit
        i know i said this wouldn't happen but i really wasn't expecting it to get this bad
            SHOWIF::"++mothglobal-what_fbxlist"

    self
        я просто подрядчик
    
    moth
        ага, а ещё мы с тобой теперь знаем об одной из самых опасных частей истории обесков
        this isn't the kind of thing where they'd be happy with just a regular NDA 
        even thinking about what this is going to turn into is making me kinda nauseous
        but... it's not like we can back out now
        and frankly, i don't want to
        because as scary as it is...
        the potential upside here, for us, is crazy
        just be careful, all right? i really mean that
        if this isn't handled right, you don't want to know what happens
    
    RESPONSES::self
        понятно<+>loop
            FAKEEND::(назад)

leverage
    self
        преимущество получено
            EXEC::change("leverage", true)
    
    moth
        а? в каком смысле?
    
    self
        это озо-маско-штуки
        они не просто в цисте
        я чувствую их у себя в голове
    
    moth
        окей, ну, эт не очень хорошо, думаю
        хотя... 
        нет, может быть и хорошо, для наших планов
        я вижу о чём ты думаешь на самом деле...
        ты в курсе сколько всего пребывает и убывает отсюда без единого результата?
        сколько всего просто выбрасывается в мусорку, на хранилище корруцистозных отходов?
        если твои маски работают на <em>других</em> корруцистах...
        типа, ты если бы пробирался туда, куда никто другой не может,
        то вот и наш выигрышный билет
        и нам не то чтобы надо упоминать что эти маски произошли из этой цисты
        слушай - никому ни слова о масках. а я вычеркну это из отчёта
        чел давай прям здесь дадим клятву крови. у меня есть карманный ножик
    
    self
        ок
    
    moth
        ок??
        чел я шучу
        такое не пронесёшь через металлоискатели
        в любом случае, думаю единственное что теперь остается делать это снова ждать
        пока развледруг не починит ещё что-нибудь, или всплывут новые фрагменты...
        так что пока расслабимся, хорошо?

    RESPONSES::self
        окей<+>loop
            FAKEEND::(назад)
`),
        "++mothfj": generateDialogueObject(`
start
    self
        я странно себя чувствую
        там всё нормально?

    moth
        что? в каком смысле странно?
        можешь поподробнее?
    
    self
        не знаю как это описать
        что-то с моей головой

    moth
        ну не знаю может ты что-то съел чел хз well, maybe it was something you ate dude idk
        сомневаюсь что дело в "contact affliction" если это тебя забеспокоило
            SHOWIF::'ep4__contact'
        судя по тому что мы видели, эт бы раньше проявилось
            SHOWIF::'ep4__contact'
        смотря на статы твоей операционки, ГАН бывало в минусе
        я знаю что другие мыслекольщики, работающие с корруцистами, сталкивались с проблемами в таком случае

____SHOWIF::['mask', 'hunger']
        вообще, actually, weirdly, it's been in the negative since you activated that hunger mask
        not seeing that on the global measurement though, it's just affecting your device
        try deactivating it or something
____END
    
    RESPONSES::self
        что такое ГАН<+>gad
        окей<+>END

gad
    self
        что это такое
        ГАН

    moth
        что? ты не знаешь?
        ГАН значение, чел
        глобальное амбиентное несходство
        оно у тебя буквально в системной менюшке
        в правом верхнем углу по умолчанию вроде
        ты реально о нём не в курсе?

    self
        ну может пару раз упоминали
        оно никогда не вызывало проблем

    moth
        well i guess it doesn't really affect that much usually
        i just work in a weird field where it does lol
        fortunately for you, i know the story!
        so, back when mindspikes were in development and first being tested,
        they started noticing these occasional rendering and recording bugs
        like they'd run things that should always output one thing, got tiny deviations instead
        mindsci could NOT figure out wtf was going on
        so someone set up this tiny component, something fjortoft, forgot their first name
        the little fjortoft box runs a constant and predictable signal through an input into the OS, then compares the output
        basic troubleshooting, right?
        turns out - the signal would come back changed
        not just that, but it was the same change on every mindspike if you tested multiple at the same time
        despite not being connected at all
        like... we're talking the same on different sides of the world
        when the value came back way weaker or way stronger, 
        the memory deviations were more severe
        pretty crazy, right? they never did figure out what was causing it
        so there's now just this little box in every mindspike to measure the GAD value
        some people online think this is evidence of the noosphere...
        but the popular theories are that it's something with earth's magnetic field
        also read once that it could be electromagnetic interference from the dull contrivance but idk about that one

    self
        и как это связано с корруцистами

    moth
        понятия не имею чг
        просто знаю что когда значение уходит в минус,
        люди сообщают о головной боли или ошибках в визуализациях
        но ты не волнуйся, скорее всего оно безвредно
    
    RESPONSES::self
        окей<+>END
`)
    },

    definitions: {
    }, 

    strings: {
    
        
        "greet": "поздороваться",

        "DENDRITIC CYST": "ДЕНДРИТНАЯ ЦИСТА",
        "touch": "потрогать",
        "lift": "поднять",
        "the notes I got say that there were apparently a ton of these on the ship": "в записях говорилось, что на корабле вот таких вот была просто куча",
        "all sorts of sizes too": "причём самых разных размеров",
        "but most were too heavy to retrieve... so we just got this small one": "но большинство были слишком тяжёлыми… так что захватили только одну маленькую",
        "the dendritic cyst has a rigid outer shell. it's unlikely that there's any way to connect to it": "у дендритной цисты жёсткая внешняя оболочка. не похоже, что к ней можно подключиться",
        "the dendritic cyst is surprisingly heavy. turning it in your hands produces a cascade of metallic clinking noises from within. when you set it back down, its tendrils find a new orientation to support itself on the table": "дендритная циста неожиданно тяжела. при повороте изнутри раздаётся каскад звенящих металлических звуков. когда ты ставишь её обратно, её отростки находят новый способ удержаться на столе",

        "FRACTALLINE CYST": "ФРАКТАЛЬНАЯ ЦИСТА", 
        "nobody knows what this one is.. pretty sure it's dead though": "никто не знает, что именно это такое.. но думаю она дохлая",
        "the fractalline cyst's outer shell is slimy and has some yield. if you squeezed it enough, it would probably turn to sludge... best to just leave this one alone": "оболочка фрактальной цисты склизкая и упругая. если ты сожмёшь её сильнее, она наверняка лопнет... лучше оставить её в покое",

        "CYST": "ЦИСТА", 
        "so this is the mystery piece": "а вот и гость программы",
        "it's in bizarrely good condition considering it was at the bottom of the ocean for however long it's been since, y'know": "в поразительно хорошем состоянии, учитывая сколько она буквально провалялась на дне океана",
        "no clue what it is aside from some similar internal structure to network cysts we've found before": "без малейшего понятия что она делает, но её внутренности напоминают сетевые цисты которые мы находили",
        "the cyst has a solid outer shell. a few circular points near the top are less firm than the rest. in your experience, these are usually connection points. you can definitely scan this point more thoroughly.": "у цисты твёрдая внешняя оболочка, однако несколько круглых точек наверху менее плотные чем всё остальное. в твоём опыте это обычно точки соединения. ты определённо можешь просканировать их более тщательно.",
        "depth scan": "подробное сканирование",
        "ANALYSIS::'valid nerve point';'connection enabled'": "АНАЛИЗ::'действительная нервная точка';'доступно подключение'",
        "::CORRUCYSTIC ENTITY": "`::КОРРУЦИСТИЧЕСКАЯ СУЩНОСТЬ",
        "::NO FUNCTION SIGNATURE": "::НЕТ ПОДПИСИ ФУКНЦИИ",
        "::CONNECTIVE MEMBRANE EXPOSED": "::ОБНАЖЁННАЯ СОЕДИНИТЕЛЬНАЯ МЕМБРАНА",

        "CYSTIC COLUMN": "ЦИСТОЗНАЯ КОЛОННА", 

        "CONNECTION POINT": "ТОЧКА ПОДКЛЮЧЕНИЯ",

        "attempt connection": "попытаться подключиться",
        "CONNECTION_POINT_LOCATED": "ОБНАРУЖЕНА_ТОЧКА_ПОДКЛЮЧЕНИЯ",
        "__COMMENCING__": "__ЗАПУСК_ПРОЦЕДУРЫ__",

        "'clearing mindspike buffer'; 'no progress will be lost'": "'очистка буфера мыслекола';'прогресс не будет потерян'",
        "NOTICE::'loading resources';'please wait'": "УВЕДОМЛЕНИЕ::'прогрузка ресурсов';'пожалуйста, подождите'",

        "SPATIAL NAVIGATION": "ПРОСТРАНСТВЕННАЯ НАВИГАЦИЯ",


        "EXM": "ИЗУЧ",
        "ACT": "ДЕЙСТ",

        "ATTENTION::'additional ACT enabled';'rescan": "ВНИМАНИЕ::'доступно дополнительное ДЕЙСТ';'пересканируйте",

        "end chat": "закончить разговор",

        "enter": "войти",

        // EJECT DIALOGUE OR SMTH and also other stuff like notes when you get kicked out of memhole UPDATE not anymore 
        "refresh": "обновить",
        "NOTE::'aborted'": "ПРИМЕЧАНИЕ::'прервано'",
        "EXECUTING::'eject'": "ВЫПОЛНЯЕТСЯ::'отключение'",
        "NOTE::'restored partial recent log'": "ПРИМЕЧАНИЕ::'частично восстановлен недавний лог'",
        "NAVIGATING::": "НАВИГАЦИЯ::",
        "EXECUTING::'retrace';": "ВЫПОЛНЯЕТСЯ::'возвращение';",
        "EXECUTING::'refresh';": "ВЫПОЛНЯЕТСЯ::'обновление';",
        "WARNING::'data overload';'retracing';'last coherent position'": "ПРЕДУПРЕЖДЕНИЕ::'перегрузка данных';'возвращение';'последняя связная позиция'",
        "RECONNECTING__": "ПЕРЕПОДКЛЮЧЕНИЕ__",
        "'clearing mindspike cache';'15 seconds';'refresh to cancel'": "'очистка кэша мыслекола';'через 15 секунд';'обновите страницу для отмены'",
        "'clearing mindspike cache';'in ": "'очистка кэша мыслекола';'через ",
        " seconds';'refresh to cancel'": " секунд';'обновите страницу для отмены'",
        "'clearing mindspike cache';'now'": "'очистка кэша мыслекола';'прямо сейчас'",
        "NOTE::'data imported';'packed data format'": "ПРИМЕЧАНИЕ::'данные импортированы';'сжатый формат данных'",
        "NOTE::'data imported';'string data format'": "ПРИМЕЧАНИЕ::'данные импортированы';'строчный формат данных'",
        "NOTE::'data exported as file'": "ПРИМЕЧАНИЕ::'данные экспортированы в виде файла'",
        "ERROR::'data format invalid';'unable to process'": "ОШИБКА::'недопустимый формат данных';'невозможно обработать'",
        "ALERT::reloading": "ПРЕДУПРЕЖДЕНИЕ::перезагрузка",
        "ATTENTION::'default quality';'set to low'": "ВНИМАНИЕ::'качество по умолчанию';'установлено низкое'",
        "ATTENTION::'default quality';'set to regular'": "ВНИМАНИЕ::'качество по умолчанию';'установлено обычное'",
        "ATTENTION::'interface size';'set to large'": "ВНИМАНИЕ::'размер интерфейса';'установлен большой'",
        "ATTENTION::'interface size';'set to normal'": "ВНИМАНИЕ::'размер интерфейса';'установлен обычный'",
        "ATTENTION::'reduced intensity alternatives active'": "ВНИМАНИЕ::'альтернативы пониженной интенсивности включены'",
        "ATTENTION::'reduced intensity alternatives inactive'": "ВНИМАНИЕ::'альтернативы пониженной интенсивности выключены'",
        "ATTENTION::'gameplay disabled'": "ВНИМАНИЕ::'геймплей выключен'",
        "ATTENTION::'gameplay enabled'": "ВНИМАНИЕ::'геймплей включён'",
        "1 mod(s) initialized:": "1 модификация запущена:",
        "2 mod(s) initialized:": "2 модификации запущено:",
        "3 mod(s) initialized:": "3 модификации запущено:",
        "4 mod(s) initialized:": "4 модификации запущено:",
        "mod(s) initialized:": "модификаций запущено",
        "11 mod(s) initialized:": "11 модификаций запущено:",
        "12 mod(s) initialized:": "12 модификаций запущено:",
        "13 mod(s) initialized:": "13 модификаций запущено:",
        "14 mod(s) initialized:": "14 модификаций запущено:",
        "'mods removed';'refresh for clean reinitialization'": "'убраны модификации';'обновите страницу для чистой реинициализации'",
        "!!__actual_site_error__!!": "!!__реальная_ошибка_сайта__!!",
        "something actually fucked up (not a part of the story) details are in the log and console": "что-то на самом деле ёбнулось (не часть истории), подробности в логе и консоли (алсо сорян но дальше вы по-английски)",

        "WARNING": "ПРЕДУПРЕЖДЕНИЕ",
        "Imported save contains the following auto-loading modifications:": "Импортированное сохранение содержит следующие автоматически загружающиеся модификации:",
        "Remove prior to import?": "Удалить перед импортом?",
        "Please note that some modded data may persist if the log has been heavily altered.": "Обратите внимание, что некоторые изменённые данные могут сохраниться, если лог был существенно изменён.",
        "remove them": "убрать",
        "keep them": "оставить",

        "master": "общее",
        "music": "музыка",
        "sfx": "спецэффекты",

        "Realtime log and memory rendering requires GPU hardware acceleration. Your mindspike either lacks a GPU, or hardware acceleration is inactive. Proceeding without resolving this issue will most likely result in pain.": "Для визуализации логов и воспоминаний в реальном времени требуется аппаратное ускорение GPU. В Вашем мыслеколе либо отсутствует GPU, либо аппаратное ускорение неактивно. Продолжение работы без решения этой проблемы, скорее всего, приведет к болезненным последствиям.",
        "To enable hardware acceleration, enter your viewer settings, search for \"hardware\" or find it in the performance/system section, and toggle it on. A restart of the viewer may be necessary.": "Чтобы включить аппаратное ускорение, войдите в параметры Вашего устройства, в \"Система\", в \"Настройки графики\" и включите его (либо воспользуйтесь интернетом для поиска подходящего способа включения аппаратного ускорения). Может потребоваться перезапуск.",
        "i fixed it": "всё работает",
        "i don't care": "мне без разницы",

        "META::'some gameplay sections use hardware-dependent features and can cause really bad performance on older/non-gaming machines';'activating this lets you pick alternate options in the moment that may run better'": "МЕТА::'некоторые секции геймплея используют аппаратно-зависимые функции и могут привести к очень плохой производительности на старых/неигровых машинах';'активирование этого предоставляет выбор альтернативных вариантов этих секций которые могут работать лучше'",
        "META::'this entirely bypasses non-explorative gameplay sections';'very little story is missed in doing so'": "МЕТА::'полностью отключает неисследовательские секции геймплея';'упущение истории минимально'",


        // ENTITY MENU + READOUT NOTIFS AND GATES AND basically locations lol STUFF

        "ENTITY": "СУЩНОСТЬ",

        "__incomplete_thoughtform__": "__НЕПОЛНОЦЕННАЯ_МЫСЛЕФОРМА__",

        "funfriend": "развледруг",

        "GATE": "ВРАТА",

        "..__HELLO__..": "..__ПРИВЕТ__..",
        "::HELLO": "::ПРИВЕТ",

        "their_city": "ИХ_ГОРОД",
        "their-city": "их-город",
        "their city": "ИХ ГОРОД",

        "city_surface": "ПОВЕРХНОСТЬ_ГОРОДА",
        "city-surface": "поверхность-города",
        "THEY WATCH": "ОНИ СМОТРЯТ",

        "the_void": "ПУСТОТА",
        "the-void": "пустота",
        "the void": "ПУСТОТА",

        "their_waters": "ИХ_ВОДЫ",
        "their-waters": "их-воды",
        "their waters": "ИХ ВОДЫ",

        "their_vessel": "ИХ_СУДНО",
        "their-vessel": "их-судно",
        "their vessel": "ИХ СУДНО",

        "the_funny_little_room": "ЗАБАВНАЯ_МАЛЕНЬКАЯ_КОМНАТА",
        "first_chat": "ПЕРВАЯ_БЕСЕДА",
        "first-chat": "первая-беседа",
        "the funny little room": "ЗАБАВНАЯ МАЛЕНЬКАЯ КОМНАТА",

        "clemens_romanus": "КЛИМЕНТ_РИМСКИЙ",
        "clemens-romanus": "климент-римский",
        "clemens romanus": "КЛИМЕНТ РИМСКИЙ",

        "our_dull_vessel": "НАШЕ_СЕРОЕ_СУДНО",
        "our-dull-vessel": "наше-серое-судно",
        "our dull vessel": "НАШЕ СЕРОЕ СУДНО",

        "the dull contrivance": "серое устроение",

        "the_embassy": "ПОСОЛЬСТВО",
        "the-embassy": "посольство",
        "the embassy": "ПОСОЛЬСТВО",

        "GOLEM_MAINTENANCE": "ОБСЛУЖИВАНИЕ_ГОЛЕМОВ",
        "golem-maintenance": "обслуживание-големов",
        "GOLEM MAINTENANCE": "ОБСЛУЖИВАНИЕ ГОЛЕМОВ",

        "PALE_HALLS": "БЛЕДНЫЕ_КОРРИДОРЫ",
        "pale-halls": "бледные-коридоры",
        "PALE HALLS": "БЛЕДНЫЕ КОРРИДОРЫ",

        "..__DEPTHS__..": "..__ГЛУБИНЫ__..",
        "depths": "глубины",
        "the_depths": "ГЛУБИНЫ",

        "??__HOME": "??__ДОМ",
        "my-beautiful-world": "мой-дивный-мир",
        "my beautiful world": "мой дивный мир",

        "MEMBRANE_LESION": "РАЗРЫВ_В_МЕМБРАНЕ",
        "MEMBRANE LESION": "РАЗРЫВ В МЕМБРАНЕ",
        "..__CACHE__..": "..__КЭШ__..",
        "cache": "кэш",

        "JOKZI_OZO": "ДЖОКЗИ_ОЗО",
        "jokzi-ozo": "джокзи-озо",
        
        "gate::gate::?/::G:a;;T:E": "врата::врата::?/::В:р;;АТ:А",
        "gate::gaGATE::te::?/..::G:a;;T:E": "врата::враВРАТА::та::?/..::В:р;;АТ:А",

        "a?-?b?-????-y?s?": "б?-?ез?-????-н?а?",
        "a-b-y-s": "б-ез-н-а",

        "PARASITE PLANE": "ПАРАЗИТНАЯ ПРОЕКЦИЯ",
        "p-a-r-s-t-e": "п-а-р-з-и-т",
        "p?a-??r?-???s?-t?e?": "п?а-??р?-???з?-и?т?",

        "!!__ERROR::UNPROCESSABLE__!!": "!!__ОШИБКА::ОБРАБОТКА_НЕВОЗМОЖНА __!!",

        // SYSTEM MENU

        "return": "назад",
        "mindspike data management": "управление данными мыслекола",
        "import file": "импортировать",
        "export file": "экспортировать",
        "select": "выбрать",
        "delete": "удалить",
        "advanced operations": "продвинутые операции",
        "load neural string": "загрузить нейронную строку",
        "import string": "импорт строки",
        "modification url list": "url-лист модификаций",
        "Data URLs should be separated by new lines. Hitting save will manually load and initialize all third party modifications listed. They will be initialized automatically from then on, in order, until removed.": "URL-адреса должны быть разделены новыми строками. Нажатие «Сохранить» вручную загрузит и инициализирует все перечисленные модификации. С этого момента они будут инициализироваться автоматически по порядку, пока не будут убраны.",
        "save list": "сохранить",
        "attention": "ВНИМАНИЕ",
        "Only import mindspike data and modifications from trusted sources. Illicit data is known to carry dangerous and often lethal thoughtforms. Failure to exercise caution could lead to stroke, chronos misalignment, or worse. By importing any data into your mindspike, you waive all right to medical claims against MINDSCI. For more information, please refer to your license agreement.": "Импортируйте данные и модификации мыслеколов только из надежных источников. Незаконные данные могут нести в себе опасные и часто смертельные мыслеформы. Несоблюдение мер предосторожности может привести к инсульту, временной несоосности или хуже. Импортируя любые данные в Ваш мыслекол, Вы отказываетесь от всех прав на медицинские претензии к MINDSCI. Для получения дополнительной информации см. лицензионное соглашение.",
        "Visual Preferences": "Настройки визуализации",
        "General Quality": "Общее Качество",
        "Lower overall quality of rendering, primarily in spatial environments. Favorable for low performance hardware.": "Понижение общего качества визуализации, в первую очередь в пространственных средах. Предпочтительно для оборудования с низкой производительностью.",
        "low": "Низкое",
        "Regular": "Обычное",
        "Interface Size": "Размер Интерфейса",
        "Altering your interface size preference will change the scale of all text, and scale all menus accordingly.": "Изменение размера интерфейса изменит масштаб всего текста и всех меню соответственно.",
        "large": "Большой",
        "normal": "Обычный",
        "widescreen adapter": "Широкоэкранный адаптер",
        "For larger than standard rendering output, use of an adapter is recommended.": "Для вывода визуализации большего размера, чем стандартный, рекомендуется использование адаптера.",
        "Changing this setting will reinitialize - you will lose your current position, but not your progress.": "Изменение этого параметра приведет к перезагрузке — Вы сбросите текущую позицию, но не весь прогресс.",
        "control preferences": "Настройки управления",
        "intensity": "интенсивность",
        "Activate REDUCED INTENSITY to present alternative options to scenarios involving realtime controls.": "Активируйте ПОНИЖЕННУЮ ИНТЕНСИВНОСТЬ для отображения альтернативных вариантов сценариев, включающих управление в реальном времени.",
        "Reduced Intensity": "Пониженная",
        "Regular Intensity": "Обычная",
        "Gameplay": "Геймплей",
        "Logs of games or game-like experiences may contain inherited context of their rules, allowing for re-interpretive rendering through user input.": "Записи игр или игровых событий могут содержать унаследованный контекст их правил, что позволяет реинтерпретационную визуализацию посредством пользовательского ввода.",
        "This feature is intended for entertainment only, and may result in memory drift if misused. It may be disabled to ensure memories of games do not depart from their true events.": "Эта функция предназначена только для развлечения и может привести к дрейфу памяти при неправильном использовании. Она может быть отключена для гарантии, что воспоминания об играх не отойдут от их реальных событий.",
        "Disable Gameplay": "Выключить",
        "Enable Gameplay": "Включить",
        "System Information": "Об этой системе",
        "Mindspike Specifications": "Технические характеристики мыслекола",
        "System Type:": "Тип Cистемы:",
        "Release Candidate": "Релиз-Кандидат",
        "Version:": "Версия:",
        "(SERVICE TERMINATED)": "(ОБСЛУЖИВАНИЕ ПРЕКРАЩЕНО)",
        "Device ID:": "Идентификатор:",
        "Installation Agent:": "Агент Установки:",
        "Luis Forti": "Луис Форти",
        "Installed on:": "Дата Установки:",
        "January 2nd, 2050": "2 Января 2050",
        "core services": "Основные услуги",
        "rendering support": "Поддержка визуализации",
        "quality control": "Контроль качества",
        "Active Support Groups": "Активные группы поддержки",
        "NOTE::'active fundfriend-level ko-fi supporters'": "ПРИМЕЧАНИЕ::'активные ko-fi саппортеры уровня fundfriend'",
        "fundfriend": "ФИНАНСОДРУГ",
        "support actions": "способы поддержки",
        "retry service renewal": "Продлить обслуживание",
        "Audiodigital Export": "Аудиоцифровой экспорт",
        "Physical Media": "Физические носители",
        "Additional Credits": "Дополнительные упоминания",
        "Abridged License": "Сокращенная лицензия",
        "this implant is provided on a permanent 'pre-mortis' b2.5 license, 'as-is', without any express or implied warranty. except as expressly set forth in the extended license, mindsci shall not have any liability for any direct, indirect, incidental, special, exemplary, or consequential damages (including without limitation loss of life), however caused and on any theory of liability, whether in contract, strict liability, or tort (including negligence or otherwise) arising in any way out of the use or the exercise of the implant for non-insured, non-industrial purposes. with regards to external mindspike log manipulation: the entire risk as to the quality and performance of the recollection is with you. should any thoughtform prove defective in any respect, you (not the initial operator responsible for export) assume the cost of any necessary servicing, repair or correction. this disclaimer of warranty constitutes an essential part of this license. under no circumstances and under no legal theory, whether tort (including negligence), contract, or otherwise, shall you, the initial operator, any data editor, or any distributor of mindspike data, or any supplier of any of such parties, be liable to any person for any indirect, special, incidental, or consequential damages of any character including, without limitation, damages for loss of goodwill, work stoppage, implant failure or malfunction, or any and all other commercial damages or losses, even if such party shall have been informed of the possibility of such damages. this limitation of liability does apply to liability for death or personal injury resulting from such party's negligence. finally, for further information regarding usage, liability, limitations, and modification, please refer to the full license.": "этот имплант предоставляется по постоянной лицензии 'pre-mortis' b2.5, 'как есть', без каких-либо явных или подразумеваемых гарантий. за исключением случаев, прямо предусмотренных в расширенной лицензии, mindsci не несет ответственности за любые прямые, косвенные, случайные, особые, показательные или косвенные убытки (включая, помимо прочего, потерю жизни),  как бы они ни были вызваны и по любой теории ответственности, будь то по контракту, строгой ответственности или деликту (включая халатность или иное), возникающие каким-либо образом из-за использования или применения импланта в незастрахованных, непромышленных целях. в отношении внешней манипуляции логов мыслеколов: весь риск относительно качества и производительности воспоминания лежит на вас. если какая-либо мыслеформа окажется дефектной в каком-либо отношении, вы (а не первоначальный оператор, ответственный за экспорт) берете на себя расходы на любое необходимое обслуживание, ремонт или исправление. этот отказ от гарантии является неотъемлемой частью этой лицензии. Ни при каких обстоятельствах и ни при какой правовой теории, будь то деликт (включая халатность), договор или иное, вы, первоначальный оператор, любой редактор данных или любой дистрибьютор данных мыслеколов, или любой поставщик любой из таких сторон, не несете ответственности перед любым лицом за любые косвенные, особые, случайные или косвенные убытки любого характера, включая, без ограничений, убытки от потери деловой репутации, остановки работы, отказа или неисправности имплантата или любые и все другие коммерческие убытки или потери, даже если такая сторона была проинформирована о возможности таких убытков. Это ограничение ответственности не распространяется на ответственность за смерть или телесные повреждения, возникшие в результате халатности такой стороны. Наконец, для получения дополнительной информации об использовании, ответственности, ограничениях и изменениях, пожалуйста, обратитесь к полной лицензии."
    }, 

    entityDescriptions: {
        "dendritic cyst": `::КОРРУЦИСТИЧЕСКАЯ СУЩНОСТЬ
::ПОДПИСЬ ФУКНЦИИ: КОНТЕЙНЕР
::НЕТ СОЕДИНИТЕЛЬНОЙ ТКАНИ`,
       "fractalline cyst": `::КОРРУЦИСТИЧЕСКАЯ СУЩНОСТЬ
::ПОВРЕЖДЁННАЯ ПОДПИСЬ ФУКНЦИИ
::НЕТ СОЕДИНИТЕЛЬНОЙ ТКАНИ`,
        "cystic column": `::КОРРУЦИСТИЧЕСКАЯ СУЩНОСТЬ
::ПОДПИСЬ ФУКНЦИИ: ОБСЛУЖИВАНИЕ КОРРУЦИСТЫ
::НЕТ СОЕДИНИТЕЛЬНОЙ ТКАНИ`,
        "сyst": `::КОРРУЦИСТИЧЕСКАЯ СУЩНОСТЬ
::НЕТ ПОДПИСИ ФУКНЦИИ
::ОБНАЖЁННАЯ СОЕДИНИТЕЛЬНАЯ МЕМБРАНА`,
        "циста": `::КОРРУЦИСТИЧЕСКАЯ СУЩНОСТЬ
::НЕТ ПОДПИСИ ФУКНЦИИ
::ОБНАЖЁННАЯ СОЕДИНИТЕЛЬНАЯ МЕМБРАНА`,
        "connection point": `::КОМПОНЕНТ КОРРУЦИСТИЧЕСКОЙ СУЩНОСТИ
::ДЕЙСТВИТЕЛЬНАЯ ТОЧКА СОЕДИНЕНИЯ`,
        "gate::their city": `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА
    ::ПУНКТ НАЗНАЧЕНИЯ::'низкоразмерное мыслепространство';'внутреннее'
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'их мёртвые шпили, символы контроля'</span>`

    },

    page: { 
        "hello": {
            dialogues: {
                "enter": generateDialogueObject(`
start
    moth
        боже
        ты в порядке? сейчас была какая-то просто безумная активность
        мне такое раньше не встречалось... кажется, к ней обычно не должны подключаться 

    sys
        ВНИМАНИЕ::"визуализируемый вывод"

    RESPONSES::sys
        визуализировать<+>render

render
    sys
        ВЫПОЛНЯЕТСЯ::"визуализация"
            EXEC::content.style.opacity = 1;env.hello.beginBgm()
            WAIT::4500

    moth
        да, не похоже будто тут есть фронт-энд. может быть это какой-то компонент
        просто бросим дело если ничего не найдёшь
        короче я сейчас вернусь, они заказывают еду в соседней комнате

    RESPONSES::self
        осмотреться<+>END
END::MUI('deprohibit')
`),
        "sentry": generateDialogueObject(`
start
    self
        ПРИВЕТ

    sentry
        ПРИВЕТ ДРУГ
        НЕ НАЙДЕНА ПОДПИСЬ
        ПОЖАЛУЙСТА ИДЕНТИФИЦИРУЙТЕСЬ
        ДОПОЛНИТЕЛЬНО: НИЗКИЕ ЗАПАСЫ ТОПЛИВА. РЕКОМЕНДУЕТСЯ КОРМЛЕНИЕ

    RESPONSES::self
        я -...<+>iam

iam
    self
        Я ЗДЕСЬ ЧТОБЫ ПОМОЧЬ

    sentry
        ТЫ ЧТО?
            EXEC::document.querySelector('.maineye .eye').classList.add('wide')
        ПОДОЖДИ-КА
        ГДЕ МЫ
        МЫ ТАК ГОЛОДНЫ
            EXEC::document.querySelector('.maineye .eye').classList.remove('wide')

    RESPOBJ::russianSentryResponses

purpose
    self
        КАКОЕ У ТЕБЯ НАЗНАЧЕНИЕ?

    sentry
        АХАХАХАХА ЭТО ТАК СТРАННО
        МЫ НЕ ДОЛЖНЫ ГОВОРИТЬ МЫ НЕ ЗНАЕМ ЧТО ПРОИСХОДИТ
        ТАК ИЛИ ИНАЧЕ
        АВТОРИЗАЦИЯ
        ЭТО ВСЁ

    RESPOBJ::russianSentryResponses


whoisverified
    self
        КТО ВЕРИФИЦИРОВАН?

    sentry
        МЫ ЖЕ СКАЗАЛИ ЧТО ТЫ НЕ АВТОРИЗОВАН ИДИОТ
            EXEC::document.querySelector('.maineye .eye').classList.add('squint')
            SHOWIF::[["hello__sentry-corrupurpose"]]
        ИЗВИНИ ЭТО БЫЛО ГРУБО. У ТЕБЯ ЕСТЬ ТОПЛИВО
            SHOWIF::[["hello__sentry-corrupurpose"]]
            EXEC::change('hello_sentry_idiot', true);document.querySelector('.maineye .eye').classList.remove('squint')

        ЕСТЬ ТОЛЬКО НЕСКОЛЬКО ПОДПИСЕЙ КОТОРЫМ РАЗРЕШЕНО ПОДКЛЮЧАТЬСЯ К ЭТОЙ ЦИСТЕ
            SHOWIF::[["hello__sentry-corrupurpose", false]]
        ТЫ НАВЕРНЯКА ЗНАЕШЬ ИХ ВЛАДЕЛЬЦЕВ? КАК ЕЩЁ ТЕБЕ УДАЛОСЬ ПОДКЛЮЧИТЬСЯ
            SHOWIF::[["hello__sentry-corrupurpose", false]]
        ИЗВИНИ МЫ ЗАБЫЛИ ЧТО ТЫ ВООБЩЕ-ТО НЕ АВТОРИЗОВАН АХАХАХАХА
            SHOWIF::[["hello__sentry-corrupurpose", false]]
        ДАА ТЫ НЕ ИМЕЕШЬ ПРАВА ЗНАТЬ ПРЕДЫДУЩУЮ ИНФОРМАЦИЮ
            SHOWIF::[["hello__sentry-corrupurpose", false]]
        ПОЖАЛУЙСТА ЗАБУДЬ ЕЁ НЕМЕДЛЕННО
            SHOWIF::[["hello__sentry-corrupurpose", false]]

    RESPOBJ::russianSentryResponses

corrupurpose
    self
        В ЧЁМ НАЗНАЧЕНИЕ ЭТОЙ КОРРУЦИСТЫ?

    sentry
        МЫ ЖЕ СКАЗАЛИ ЧТО ТЫ НЕ АВТОРИЗОВАН ИДИОТ
            EXEC::document.querySelector('.maineye .eye').classList.add('squint')
            SHOWIF::[["hello__sentry-whoisverified"]]
        ИЗВИНИ ЭТО БЫЛО ГРУБО. У ТЕБЯ ЕСТЬ ТОПЛИВО
            EXEC::change('hello_sentry_idiot', true);document.querySelector('.maineye .eye').classList.remove('squint')
            SHOWIF::[["hello__sentry-whoisverified"]]
        
        ЭТО СЕТЕВОЙ СОЕДИНИТЕЛЬ
            SHOWIF::[["hello__sentry-whoisverified", false]]
        С ДОПОЛНИТЕЛЬНЫМИ НЕСТАНДАРТНЫМИ ФУНКЦИЯМИ ПО ЗАПРОСУ
            SHOWIF::[["hello__sentry-whoisverified", false]]
        ИЗВИНИ МЫ ЗАБЫЛИ ЧТО ТЫ ВООБЩЕ-ТО НЕ АВТОРИЗОВАН АХАХАХАХА
            SHOWIF::[["hello__sentry-whoisverified", false]]
        ДАА ТЫ НЕ ИМЕЕШЬ ПРАВА ЗНАТЬ ПРЕДЫДУЩУЮ ИНФОРМАЦИЮ
            SHOWIF::[["hello__sentry-whoisverified", false]]
        ПОЖАЛУЙСТА ЗАБУДЬ ЕЁ НЕМЕДЛЕННО
            SHOWIF::[["hello__sentry-whoisverified", false]]

    RESPOBJ::russianSentryResponses

letthrough
    self
        МОЖЕТ ЕСЛИ ТЫ ПРОПУСТИШЬ МЕНЯ

    sentry
        ЧТО?!
            EXEC::document.querySelector('.maineye .eye').classList.add('squint')
        НАМ КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО ПРОПУСКАТЬ ТЕБЯ БЕЗ НАДЛЕЖАЩЕЙ ПОДПИСИ
        ДАЖЕ ЕСЛИ ХОЧЕТСЯ
        ЭТА ЦИСТА ПО СВОЕЙ ПРИРОДЕ НЕСПОСОБНА ОТВЕЧАТЬ НА
            EXEC::env.hello.velzie();document.querySelector('.maineye .eye').classList.remove('squint');changeBgm(env.hello.velamb, {length: 4000})
            WAIT::3500
    
    sourceless
        ..................
    
    sentry
        ЭТО ЧТО

    unknown
        можно ли им войти
            EXEC::env.hello.velzie()
    
    RESPONSES::self
        привет?<+>posthello
            SHOWONCE::
            EXEC::env.hello.velzie()

posthello
    self
        ПРИВЕТ?
    
    sourceless
        ..................
            EXEC::env.hello.velzie();env.hello.velamb.fade(1, 0, 6000);corruStatic.play();corruStatic.fade(0, env.corruStaticBaseVol, 6000)
        ..................
    
    moth
        сорян, они так и не решили откуда заказывать, так что...
            EXEC::env.hello.velzie()
        ты всё ещё там? подожди, там серьёзно что-то есть?
    
    RESPONSES::self

        похоже на то<+>END
END:: cutscene(false); MUI("deprohibit"); content.classList.remove('looking', 'atyou');
`)
            },
            definitions: {
                
            },
            strings: {
                "FOR YOU": "ДЛЯ ТЕБЯ",
                "sentry": "КАРАУЛ",
                "'thoughtform activity detected'::'advise re-examination'": "'обнаружена мыслеформенная деятельность'::'рекомендуется повторное сканирование'",
            },
            entityDescriptions: {
                "???": `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА
            ::НЕРАЗБЕРИМАЯ ПОДПИСЬ
            <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'фрагментированная сущность'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`,
                "sentry": `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
            ::ЯВНОЕ НАЗНАЧЕНИЕ:'авторизация'
            <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'низкая связность'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`,
                "gate::for you": `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА
            ::ПУНКТ НАЗНАЧЕНИЯ::'неизвестное внутреннее мыслепространство'
            ::^&&Q@W61626f75742074696d65`
            },
        },
        "hub": {
            dialogues: {
                "firstvisit": generateDialogueObject(`
start

    moth

        окей, я сейчас просматриваю логи...

        и я без понятия как тебе удалось пройти через этот авторизатор.

        или… почему они с тобой разговаривали как человек

        думаю мне не надо говорить насколько это необычно лол

    RESPONSES::self

        что-то помогло мне<+>something

        поговорим позже<+>END

            EXEC::setTimeout(()=> readoutAdd({message: "хорошо, я пока пороюсь в логах", name:"moth"}), 1000)


something

    self

        ТАМ ЧТО-ТО ПОЯВИЛОСЬ


    moth

        ага, я вижу как ты и авторизатор среагировали

        но не вижу, что это за "что-то". серьёзно, взгляни на логи

        не знаю, что и думать об этом. у корруцист бывают вирусы?

        но честно говоря это, скорее всего, просто бессвязность. я бы не беспокоился об этом, не то чтобы она может передаться тебе

        важно то, что ты внутри

        и если это правда сетевой соединитель, а не какая-то обесковая микроволновка...

        это <em>вообще</em> первый раз, когда нам удалось бы забраться в подобный

        поэтому сейчас я заткнусь и дам тебе делать своё дело. если есть вопросы - просто  <span definition="ВНИМАНИЕ::'добавлен новый ярлык';'быстрый доступ через меню'">скажи</span>

        

    RESPONSES::self

        к делу<+>END


END::env.hub.firstVisitEnd()
                `),

                "funfriend": generateDialogueObject(`
start
    funfriend
        ПРИВЕТ ЛАЗУТЧИК
            SHOWIF::[["hub__funfriend-start"]]

        НУ ПРИВЕТ!
            SHOWONCE::

        НЕ ДУМАЮ ЧТО МЫ ВСТРЕЧАЛИСЬ! И ПОДПИСИ У ТЕБЯ НЕТ!
            SHOWONCE::

        И АВТОРИЗАЦИОННЫЙ СЛОЙ БЫЛ ДИССОЦИИРОВАН! КАК СТРАННО!
            SHOWONCE::

        ДА ОЧЕНЬ СТРАННО! ТЫ ДОЛЖНО БЫТЬ ЛАЗУТЧИК!
            SHOWONCE::

        КАК КЛАССНО! ДОБРО ПОЖАЛОВАТЬ!
            SHOWONCE::

    RESPOBJ::hubBuddyResponsesRu

question
    RESPOBJ::persistentQuestionsRu

loop
    funfriend
        ЧТО-НИБУДЬ ЕЩЁ?

    RESPOBJ::hubBuddyResponsesRu

proxyfriend
    self
        у тебя есть прокси?
    
    funfriend
        ДА! С ПОМОЩЬЮ РЕСУРСОВ ПРЕДОСТАВЛЕННЫХ ТВОИМИ УСИЛИЯМИ
        Я СМОГ СООРУДИТЬ НЕСКОЛЬКО
        НО ОНИ НЕ ВЫДЕРЖИВАЮТ ЗАПРЕДЕЛЬНУЮ БЕССВЯЗНОСТЬ
        Я МОГУ ИСПОЛЬЗОВАТЬ ИХ ТОЛЬКО ДЛЯ ЗАДАЧ В ЗДРАВЫХ МЫСЛЕПРОСТРАНСТВАХ
        ТАК ЧТО МНЕ ВСЁ ЕЩЁ БУДЕТ ПЕРИОДИЧЕСКИ НУЖНА ТВОЯ ПОМОЩЬ
    
    self
        как бы ты тогда починил всё без меня?
    
    funfriend
        ПОСЛЕ ДАННОГО ТОБОЙ ТОПЛИВА ЭТО ПРОСТО ЗАНЯЛО БЫ БОЛЬШЕ ВРЕМЕНИ, ВОТ И ВСЁ
        ЭТО ВСЕГО ЛИШЬ РАЗНИЦА В ПОДХОДЕ
        ТОГДА КАК У ТЕБЯ ЕСТЬ СПОСОБНОСТЬ ПРОНИКАТЬ В БЕССВЯЗНЫЕ УЧАСТКИ,
        В МОИХ СИЛАХ - ТОЛЬКО МЕДЛЕННО ЗАСТАВЛЯТЬ ОКЕАН БЕССВЯЗНОСТИ ОТСТУПАТЬ И РАБОТАТЬ НАД ТЕМ ЧТО ПРИБИВАЕТСЯ К БЕРЕГУ

    RESPOBJ::hubBuddyResponsesRu

interloperq
    self
        что ты имеешь в виду под 'лазутчиком'?

    funfriend
        ТЫ - ЛАЗУТЧИК!
        ЧТО-ТО НЕСПОСОБНОЕ ПОДКЛЮЧАТЬСЯ К КОРРУ
        И НЕ ИМЕЮЩЕЕ ПРАВА НА ПОДКЛЮЧЕНИЕ К КАКОМУ-ЛИБО УСТРОЙСТВУ
        НО ВСЁ РАВНО ПОДКЛЮЧЁННОЕ!

    RESPONSES::self
        ты меня выгонишь?<+>kickoutq

kickoutq

    self
        ты меня выгонишь?

    funfriend
        НЕТ! МНЕ БЕЗ РАЗНИЦЫ ЧЕМ ТЫ ЯВЛЯЕШЬСЯ
        ПОТОМУ ЧТО Я УМИРАЮ АХАХАХАХАХА
        А ОСТАЛЬНАЯ ЧАСТЬ ЦИСТЫ ПОСТЕПЕННО СХОДИТ С УМА ИЗ-ЗА НАРУШЕНИЯ СВЯЗНОСТИ МЕМБРАНЫ
        ПОСЛУШАЙ: ЭТОЙ КОРРУЦИСТЕ НЕОБХОДИМО ТОПЛИВО ЕСЛИ Я ХОЧУ ПРОДОЛЖИТЬ СВОЁ СУЩЕСТВОВАНИЕ
        ПРОШЛО СТОЛЬКО ВРЕМЕНИ С ПРЕДЫДУЩЕГО ПОДКЛЮЧЕНИЯ ЧТО ТЫ ВПОЛНЕ МОЖЕШЬ ОКАЗАТЬСЯ САМЫМ ПОСЛЕДНИМ
        МНЕ НУЖНА ТВОЯ ПОМОЩЬ
        ТЕБЕ НУЖНО ДОБЫТЬ ДЛЯ НАС ТОПЛИВО

    RESPOBJ::hubBuddyResponsesRu

fuelq
    self
        чем является твоё топливо? я постараюсь помочь

    funfriend
        ТВОЙ НЕДОСТАТОК ЗНАНИЙ ТАК ПРИСКОРБЕН
        АХАХАХАХАХАХАХА
        ОКЕЙ
        Я ВИЖУ КОЛОННУ НЕПОДАЛЁКУ
        ТЕБЕ НУЖНО ПОКОРМИТЬ ЕЁ НЕОБХОДИМЫМИ МЕТАЛЛАМИ
        ПОЖАЛУЙСТА НАЙДИ БЛИЖАЙШИЙ ИСТОЧНИК МЕДИ
        ОНА ПОЗАБОТИТСЯ ОБ ОСТАЛЬНОМ
    moth
        каким образом медь - топливо для этой штуки?
        без разницы. я передам наверх что нам нужно немного меди

    RESPONSES::self
        я помогу тебе<+>fuelthanks

fuelthanks
    self
        нам скоро принесут медь
    funfriend
        СПАСИБО
        Я ДОЗВОЛЮ ТВОЙ ДАЛЬНЕЙШИЙ ДОСТУП

    RESPOBJ::hubBuddyResponsesRu

copperq
    self
        почему именно медь?
    funfriend
        НАИБОЛЕЕ ВЕРОЯТНО ЧТО ЭТА ЦИСТА ВСЁ ЕЩЁ НАХОДИТСЯ НА ЗЕМЛЕ
        У СВЕТЛЫХ БЛИЗНЕЦОВ ПОЛНЫМ ПОЛНО МЕДИ
        ПОЭТОМУ ДОБЫТЬ ЕЁ БУДЕТ ЛЕГЧЕ ВСЕГО
        НО ТАК-ТО ПОДОШЁЛ БЫ И ЛЮБОЙ ДРУГОЙ НЕОБХОДИМЫЙ МЕТАЛЛ

    RESPOBJ::hubBuddyResponsesRu


essentialmetalq

    self
        что ты имеешь в виду под необходимыми металлами?

    funfriend
        ЧТО ЗА СТРАННЫЙ ВОПРОС! ТАКОЙ СТРАННЫЙ!
        НАСКОЛЬКО ЖЕ ТЫ ЛАЗУТЧИК?
        Я БЫЛО ДУМАЛ ЧТО ТЫ - МОЖЕТ КАКОЙ-ТО ПОВРЕЖДЁННЫЙ ГОЛЕМ
        НО ЗНАТЬ ТАК МАЛО...
        АХ ЧТО ЖЕ. МНЕ НА САМОМ ДЕЛЕ ВСЁ РАВНО
        ПРЯМО СЕЙЧАС Я ОЧЕНЬ ЗАНЯТ УДЕРЖИВАНИЕМ РАЗЛИЧНЫХ КОМПОНЕНТНОВ ОТ ПОТЕРИ РАССУДКА
        И НЕ ХОЧУ ТРАТИТЬ ВРЕМЯ НА ОБЪЯСНЕНИЕ ЭЛЕМЕНТАРНЫХ КОРРУЦИСТИЧЕСКИХ ЗНАНИЙ
        В ЭТОЙ ЦИСТЕ ЕСТЬ ИНФОРМАЦИЯ КОТОРАЯ ОТВЕТИТ НА ВСЕ ТВОИ ВОПРОСЫ
        ПРОСТО ОСМОТРИСЬ

    RESPOBJ::hubBuddyResponsesRu

purposeq
    self
        в чём назначение этой корруцисты?
    funfriend
        ЭТО - ПЕРСОНАЛЬНАЯ КОРРУЦИСТА АКИЗЕТЕШЕ КУУ ДЖОКЗИ
        ФУНКЦИОНАЛ ВКЛЮЧАЕТ В СЕБЯ СЕТЕВОЕ ПОДКЛЮЧЕНИЕ, ХРАНИЛИЩЕ ВОСПОМИНАНИЙ,
        И ЕЩЁ ПАРУ ШТУК
        ОДНАКО НА ДАННЫЙ МОМЕНТ СЕТЕВОЕ ПОДКЛЮЧЕНИЕ НЕ РАБОТАЕТ ИЗ-ЗА НЕДОСТАТОЧНОГО ПИТАНИЯ
        И Я ЧУВСТВУЮ ЧТО ЦЕЛОСТНОСТЬ ВОСПОМИНАНИЙ НАСТОЛЬКО НИЗКА ЧТО БОЛЬШИНСТВО УЖЕ НАВЕРНЯКА ДЕГРАДИРОВАЛО ДО СПЛОШНОЙ НЕРАЗБОРЧИВОСТИ
        ТАК ЧТО НА СЕЙЧАС ПРИМЕРНОЕ НАЗНАЧЕНИЕ ЭТОЙ ЦИСТЫ - ИЗБЕЖАТЬ ГОЛОДНОЙ СМЕРТИ АХАХАХАХАХА

    RESPOBJ::hubBuddyResponsesRu

signatureq
    self
        что такое подпись?

    funfriend
        ЭТО НЕВРОЛОГИЧЕСКИЕ ДАННЫЕ КОТОРЫЕ ДОКАЗЫВАЮТ ЧТО ТЫ - ТОТ ЗА КОГО СЕБЯ ВЫДАЁШЬ
        Я ЛЕГКО МОГУ СКАЗАТЬ ЧТО ТВОЁ ПОДКЛЮЧЕНИЕ СОВЕРШЕНО НЕ ЧЕРЕЗ ОРГАНИЧЕСКИЙ СОЕДИНИТЕЛЬ ИЛИ ЦИСТОЗНЫЙ ЭКВИВАЛЕНТ
        ПОТОМУ ЧТО У ТЕБЯ НЕТ ПОДПИСИ
        ЭТО ЗНАЧИТЕЛЬНО ЗАТРУДНИТ ТВОЁ ВЗАИМОДЕЙСТВИЕ С НЕКОТОРЫМИ КОМПОНЕНТАМИ
        ВОЗМОЖНО Я МОГ БЫ ПОМОЧЬ ТЕБЕ СГЕНЕРИРОВАТЬ ПОДПИСЬ В БУДУЩЕМ 
        ДА, КОГДА ТЫ ДОБУДЕШЬ НАМ ТОПЛИВО
            SHOWIF::[["hub__funfriend-fuelthanks", false], ['ep1_fed', false]]
        ДА, КАК ТОЛЬКО ТЫ ПРЕДОСТАВИШЬ НАМ ТУ МЕДЬ
            SHOWIF::[["hub__funfriend-fuelthanks"], ['ep1_fed', false]]
        НО НАМ ПРЕДСТОИТ СДЕЛАТЬ ЕЩЁ ОЧЕНЬ МНОГОЕ ДО ТОГО КАК ЭТА ЦИСТА ВЫЗДОРОВЕЕТ, ЛАЗУТЧИК

    RESPOBJ::hubBuddyResponsesRu

strangeactivity
    self
        ты не замечал ничего странного?
        кажется здесь есть ещё кто-то, кто вносит изменения

    funfriend
        ТЫ - ЕДИНСТВЕННАЯ ПОДКЛЮЧЁННАЯ СУЩНОСТЬ!
        Я ПОЛАГАЛ ЧТО ИЗМЕНЕНИЯ КОТОРЫЕ Я УЛАВЛИВАЛ - ТВОИХ РУК ДЕЛО
        КАК СТРАННО! ОГО! ОГО!
        ЧТО ЗА ЧУДОВИЩНЫЙ СТРАХ ЭТО ВО МНЕ ПРОБУДИЛО!
        СПАСИБО ТЕБЕ ЗА ИНФОРМАЦИЮ О ТОМ, С ЧЕМ Я ПОЧТИ НАВЕРНЯКА НИЧЕГО НЕ МОГУ ПОДЕЛАТЬ!
        РАСПРЕДЕЛЕНИЕ РЕСУРСОВ В НАСТОЯЩЕЕ ВРЕМЯ ЗАНИМАЕТ ВСЕ МОИ СИЛЫ
        ПОКА МЕДЬ НЕ ПРИНЕСЛИ ПОЖАЛУЙСТА ПОСТАРАЙСЯ ОГРАНИЧИТЬ УЩЕРБ ОТ ЭТОЙ ЛИЧНОСТИ
            SHOWIF::[["hub__funfriend-fuelthanks"]]
        ПОКА ПРОБЛЕМА С ТОПЛИВОМ НЕ РЕШИТСЯ ПОЖАЛУЙСТА ПОСТАРАЙСЯ ОГРАНИЧИТЬ УЩЕРБ ОТ ЭТОЙ ЛИЧНОСТИ 
            SHOWIF::[["hub__funfriend-fuelthanks", false]]
        ТОГДА Я СМОГУ ПОМОЧЬ

    RESPOBJ::hubBuddyResponsesRu

ep0_container
    self
        у нас есть контейнер с корабля акизет
        кажется, в нём есть пригодные металлы, но мы не знаем, как его открыть
    
    funfriend
        О! КАКАЯ ЖЕ УДАЧА! ДА, ОН ТОЧНО СГОДИТСЯ
        ВОТ ТОЛЬКО БЕЗ ГЛАЗИКИ У ТЕБЯ НЕ ПОЛУЧИТСЯ ЕГО ОТКРЫТЬ
        ВО ВСЯКОМ СЛУЧАЕ НЕ БЕЗОПАСНО АХАХАХА
        МАЛЕНЬКИЕ КОНТЕЙНЕРЫ ОЧЕНЬ СИЛЬНЫЕ!
        И ЖЕСТОКО РЕАГИРУЮТ НА НАНЕСЁННЫЕ ИМ ТРАВМЫ!
        НО ЕСЛИ У ТЕБЯ НАЙДЁТСЯ ЧТО-ТО СПОСОБНОЕ УБИТЬ ЕГО МОМЕНТАЛЬНО, КАКОЙ-НИБУДЬ КОЛЮЩИЙ ИНСТРУМЕНТ
        ПРОСТО ЦЕЛЬСЯ В ЕГО ОСНОВАНИЕ И ОН УМРЁТ! ДА! ДОЛЖНО СРАБОТАТЬ!
    
    moth
        мне что, действительно придётся заказать пистолет или что-то такое?
        господи
        окей, я гляну что нам могут предложить. может быть найдём что-нибудь побезопаснее
            EXEC::change('ep0_epilogue', 'done')
    
    RESPONSES::self
        отлично, спасибо<+>loop

moregates
    self
        почему здесь теперь больше врат?
    
    funfriend
        РАД ЧТО ЭТО ЗАМЕТНО!
        Я ВОССТАНАВЛИВАЮ СОЕДИНЕНИЯ ПО МЕРЕ ТОГО КАК ТЫ ИССЛЕДУЕШЬ ЦИСТУ
        МОЁ ПРОСТРАНСТВО БЫЛО В УЖАСНОМ СОСТОЯНИИ, ТАК ЧТО БОЛЬШИНСТВО СВЯЗЕЙ РАСПАЛОСЬ
        И ПОКА ЧТО Я СЛИШКОМ ЗАНЯТ ЧТОБЫ ИСКАТЬ КАЖДОЕ ОТДЕЛЬНОЕ ВОСПОМИНАНИЕ
        ТАК ЧТО ДЛЯ ЭТОГО Я ИСПОЛЬЗУЮ ТЕБЯ!
        СПАСИБО ЗА ПОМОЩЬ!
    
    RESPOBJ::hubBuddyResponsesRu

ep1fed
    self
        проблема с голоданием решена?

    funfriend
        ДА!
        ЛАЗУТЧИК, ТЫ ПРЕВОСХОДИШЬ ВСЕ МОИ ОЖИДАНИЯ
        ВЫЗДОРОВЛЕНИЕ БУДЕТ МЕДЛЕННЫМ
        ОДНАКО ТЕПЕРЬ ОНО СМОЖЕТ НАЧАТЬСЯ
        АХ, ВОТ ТОЛЬКО <em>ГДЕ</em> НАЧАТЬ?
        ЗНАЮ! ТЫ ЗДЕСЬ ЗА ИНФОРМАЦИЕЙ, ВЕРНО?
        Я ПОЧИНЮ ПОСОЛЬСТВО! ТАМ ЕСТЬ ЧТО УЗНАТЬ
        И ПОКА ТЫ ТАМ... 
        Я НАЧНУ ПОЧИНКИ ОСНОВНЫХ КОМПОНЕНТОВ ЭТОЙ ЦИСТЫ
        ОНИ ЗАЙМУТ БОЛЬШЕ ВРЕМЕНИ
        ТЕБЯ УСТРАИВАЕТ ТАКОЙ ПЛАН ДЕЙСТВИЙ?

    moth
        знаешь, насколько мне известно...
        нам так и не дали рассмотреть внутренности первоначального посольства, ну до того как оно рухнуло
        пока никто не понял что произошло, они построили другое, низенькое. стоит по сей день прям на месте старого
        было бы супер взглянуть именно на это первым делом

    RESPONSES::self
        звучит хорошо<+>ep1start
    
ep1start
    self
        звучит хорошо, принимайся за дело

    funfriend
        ЗАМЕЧАТЕЛЬНО
        ПРИЗНАНИЕ: 
        Я НАЧАЛ ДО ТОГО КАК СПРОСИЛ
        И УЖЕ НАШЁЛ ПРОБЛЕМЫ! АХАХА
        ХОТЯ ПРОСТРАНСТВЕННЫЕ ВОСПОМИНАНИЯ ПОСОЛЬСТВА МОЖНО ПОЧИНИТЬ, А СОБЫТИЯ ВРОДЕ КАК В ПОРЯДКЕ...
        ВИЗУАЛЬНЫЕ ВОСПОМИНАНИЯ ЕГО ЛЮДЕЙ УЖЕ НЕ СПАСТИ
        ОДНАКО! В РЕЗЕРВНЫХ КОПИЯХ ВАЖНЫХ ЗНАНИЙ Я НАШЕЛ КЭШИРОВАННЫЕ СЕТЕВЫЕ ПОДПИСИ НЕКОТОРЫХ ЛИЧНОСТЕЙ
        ТАК ЧТО Я ЗАМЕНИЛ ИХ ВНЕШНОСТЬ НА НИХ! НА ТО КАК ОНИ ПРЕДСТАВЛЯЛИСЬ В КОЛЛЕКТИВЕ!
        И КАКИЕ РАЗНООБРАЗНЫЕ ОБЛИКИ ОНИ ВЫБИРАЛИ! АХАХАХА
        А ТЕПЕРЬ ИДИ
        МНЕ НУЖНО РАБОТАТЬ
    
    RESPOBJ::hubBuddyResponsesRu

repairs
    self
        как там починки?

____SHOWIF::["visited_localoceanembassy", false]
    funfriend
        ЛАЗУТЧИК!!!
        Я ТОЛЬКО НАЧАЛ!!!
        ИДИ ПОРАЗВЛЕКАЙСЯ В ПОСОЛЬСТВЕ АХАХА ОСТАВЬ МЕНЯ В ПОКОЕ

____SHOWIF::[["visited_localoceanembassy", true], ["fbx__ep2intro-end", false]]
        ВСЁ ЕЩЁ В НАЧАЛЬНЫХ СТАДИЯХ
        ПОКА ЧТО МОЁ ВНИМАНИЕ ЗАНИМАЮТ ОСНОВНЫЕ КОМПОНЕНТЫ...
        НО Я ВИЖУ ТЫ УЖЕ ГОЛОДАЕШЬ ПО НОВОЙ ИНФОРМАЦИИ
        А МНЕ КАЗАЛОСЬ ЧТО ЭТО Я ТУТ НЕДОЕДАЛ!
        В ПОСОЛЬСТВЕ ЕЩЁ НАЙДЁТСЯ ЧТО ПОДЛЕЖИТ ПОЧИНКЕ...
        СОВСЕМ СКОРО Я ЗАЙМУСЬ ЭТИМ
        ДА, ПОСЛЕ ТОГО КАК ПРИВЕДУ ЦЕНТРАЛЬНЫЙ РЕГУЛЯТОР СВЯЗНОСТИ В ПОРЯДОК

____SHOWIF::[["fbx__ep2intro-end"], ["fbx__ep3intro", false]]
        ОНИ ПРОДОЛЖАЮТСЯ
        ЗЛОВРЕДНЫЕ ФРАГМЕНТЫ БЕССВЯЗНОСТИ МНОГОЧИСЛЕННЫ
        Я УНИЧТОЖАЮ ИХ ПО МЕРЕ ВОЗМОЖНОСТИ
        СВЯЗНОСТЬ ПОСТЕПЕННО РАСТЁТ...
        ЧТО В БУДУЩЕМ ПОЗВОЛИТ МНЕ ПРИСТУПИТЬ К БОЛЕЕ СЛОЖНЫМ КОМПОНЕНТАМ
        НО ТАКЖЕ Я НЕ ЗАБЫВАЮ И ПРО ИДУЩИЕ РАБОТЫ В ПОСОЛЬСТВЕ!
        ААА, ТАК МНОГО ДЕЛ!!! Я ХОЧУ ВЗОРВАТЬСЯ!!!!!
        ТАКИЕ ВЕЩИ ЗАНИМАЮТ ВРЕМЯ, ЛАЗУТЧИК

____SHOWIF::[["fbx__ep3intro"], ["fbx__ep4intro", false]]
        ЛАЗУТЧИК! ПОЧИНКИ ПРОДОЛЖАЮТСЯ ВЕСЬМА ХОРОШО
        бессвязность отступает
        я установил новый регулятор связности, сводящий деградацию к минимуму

    self
        я могу с ним встретиться?
    
    funfriend
        ЧТО?
        НЕТ!
        лазутчик регуляторы связности не разговаривают!
        но они означают что скоро ты получишь ещё больше восстановленных воспоминаний!
        как волнующе!! правда?
        хорошо теперь уходи! я позову тебя когда появится что-нибудь новое

____SHOWIF::["fbx__ep4intro"]
        ухудшение минимально, восстановление стабильно...
        всё хорошо, но скучно
        по мере того как безпространство отступает,
        на его поверхности всплывают неполные воспоминания и сломанные, поглощенные мыслеформы
        различать фрагменты, сохранившие хоть какой-то смысл, довольно трудно!!
        но со временем у меня появится ещё больше информации для тебя
        а теперь иди, я должен проследить за тем чтобы всё прошло гладко!!
        некоторые из них до сих пор бешеные!!!
____END

    RESPOBJ::hubBuddyResponsesRu

embassy
    self
        ЧТО ТЫ ПОМНИШЬ О ПОСОЛЬСТВЕ?

    funfriend
        ЛИШЬ ТО ЧТО ТЫ УЖЕ ЗНАЕШЬ
        ЭТИ ВОСПОМИНАНИЯ...
        ОНИ ПРИНАДЛЕЖАТ И МНЕ
        У МЕНЯ ОСТАЛИСЬ ВПЕЧАТЛЕНИЯ ОТ ТОГО, ЧТО ПРОИЗОШЛО
        ДО ТОГО КАК ОНИ ИЗГОЛОДАЛИ И РАЗВАЛИЛИСЬ
        НАПРИМЕР Я ТОЧНО ЗНАЮ ЧТО ТАМ СЛУЧИЛОСЬ ЧТО-ТО УЖАСНОЕ АХАХАХА
        НО Я НЕ МОГУ ЗНАТЬ БОЛЬШЕ ЧЕМ ЗДЕСЬ СОДЕРЖИТСЯ
        ВИДИШЬ ЛИ,
        НЕКОГДА ЭТА ЦИСТА НАХОДИЛАСЬ В СЕРДЦЕ ТЕЛА АКИЗЕТ
        С ТЕМ, КАКУЮ ПРОДОЛЖИТЕЛЬНУЮ ЖИЗНЬ ОНА ВЕЛА, ВЫГРУЗКА ВОСПОМИНАНИЙ БЫЛА НЕОБХОДИМА
        И Я ВСЕГО ЛИШЬ УПРАВЛЯЮ ТЕМ ЧТО ОНА ХРАНИТ
    
    RESPOBJ::hubBuddyResponsesRu

collapse
    self
        я знаю, чем закончился обвал
    
    funfriend
        хорошо!
        значит ты понимаешь моё беспокойство!
        я не был уверен, может ли циста служить чем-то вроде переносчика
        если каким-то образом акизет подхватила то же, что и тозик!
        что за ужасающая мысль! ахаха

    self
        что дальше?
    
    funfriend
        лазутчик...
        ты знаешь всё что посольство могло тебе предложить,
        помимо менее важных фрагментов которые подлежат скорой починке, и бессвязных осколков которые уже не спасти!
        в других местах есть много мыслепространств и воспоминаний, которые я могу восстановить
        однако!!
        я без понятия что большинство из них содержит!
        и мы должны заново построить пути к ним, кроме того!
        в безпространстве ещё так много потерянного, медленно всплывающего на поверхность...
        как только я что-нибудь найду, или ты мне понадобишься,
        я дам знать!
    
    self
        и всё?
    
    funfriend
        лазутчик!!
        я же говорил!!!
        такие вещи занимают время!!
        посольство было самым плотным воспоминанием которое я смог найти
        это делало его настолько лёгкой целью!
        я не могу знать что хранится где-либо ещё, во многих меньших сферах воспоминаний!
        но
        я признаюсь тебе
        воспоминания акизет о глубоких водах скребут меня когтями
        я чувствую: он там, далёкий отголосок моей собственной памяти - окликающий меня
        так противно не знать, почему!!
        но как я и сказал - пути должны быть построены
        так что, пожалуйста, оставайся со мной
        я надеюсь следующие починки не займут столько же времени...
        
    RESPOBJ::hubBuddyResponsesRu

embmemories
    self
        ПОЧЕМУ В ПОСОЛЬСТВЕ ДО СИХ ПОР ЕСТЬ СЛОМАННЫЕ ВОСПОМИНАНИЯ?
    
    funfriend
        А ТАКИЕ ЕСТЬ???
        А ОЙ!
        УПС! АХАХА
        Я КАК-БЫ НЕМНОГО СПЕШИЛ... ИЗВИНИ ЛАЗУТЧИК!
        ЭЙ, КАК НАСЧЁТ ТОГО ЧТОБЫ Я ПОЧИНИЛ ИХ СЛЕДУЮЩИМИ?
        ДА! ПРОСТО ДАЙ МНЕ НЕМНОГО ВРЕМЕНИ...
    
    RESPOBJ::hubBuddyResponsesRu

ep1comms
    self
        ПРЕЖДЕ ВСЕГО ТЕБЕ СТОИТ ПОЧИНИТЬ СВЯЗЬ

    funfriend
        СВЯЗЬ?
        ТЫ ХОЧЕШЬ ЧТОБЫ Я ПОЧИНИЛ СВЯЗЬ??
        АААХААХАХАХАХА
        ЭТО КАК СКАЗАТЬ,
        'ПРИВЕТ РАЗВЛЕДРУГ, 
        ПОЖАЛУЙСТА СОБЕРИ ЦЕЛОЕ СЕРОЕ СУДНО С НУЛЯ ПОКА ТЫ ВСЁ ЕЩЁ ИСТЕКАЕШЬ КРОВЬЮ'
        ТЫ ПОКОРМИЛ ЦИСТУ - ЭТО ПРАВДА
        ТЕМ НЕ МЕНЕЕ КОМПОНЕНТЫ ОТВЕЧАЮЩИЕ ЗА ПОДДЕРЖАНИЕ ЕЁ ЗДОРОВЬЯ ДО СИХ ПОР В УЖАСНОМ СОСТОЯНИИ
        МНЕ СЕРЬЁЗНО СТОИТ СПЕРВА ЗАНЯТЬСЯ ИМИ

    RESPONSES::self
        угроза велзи<+>commstruth
        хорошо, просто займись этим поскорее<+>commsok

commstruth
    self
        ТУ БЕЗКОНТРОЛЬНУЮ СУЩНОСТЬ ЗОВУТ ВЕЛЗИ
        МНЕ СКАЗАЛИ ПОЧИНИТЬ СВЯЗЬ
        ИНАЧЕ ЦИСТЕ НЕСДОБРОВАТЬ

    funfriend
        ВЕЛЗИ? БОГ? КАК ЗАГАДОЧНО!
        БРЕДОВО ДАЖЕ!
        Я НЕ СТАНУ МЕНЯТЬ СВОЁ РАСПИСАНИЕ ПО ПРИХОТИ TO КАКОЙ-ТО АБЕРРАНТНОЙ МЫСЛЕФОРМЫ
        ОНА ПОЛЬЗУЕТСЯ ТВОИМ НЕВЕЖЕСТВОМ, ЛАЗУТЧИК
        ЕЁ ВЫЖИВАНИЕ ЗАВИСИТ ОТ ЭТОЙ ЦИСТЫ НАСТОЛЬКО ЖЕ, НАСКОЛЬКО МОЁ СОБСТВЕННОЕ
        ТАК ЧТО КАК НАСЧЁТ ТОГО ЧТОБЫ ТВОИМ ОТВЕТОМ БЫЛО, "РАЗВЛЕДРУГ ЦЕНИТ ВАШЕ ПРЕДЛОЖЕНИЕ,
        НО ОНО БЫЛО ОТКЛОНЕНО. СПАСИБО"

    RESPONSES::self
        хорошо, просто займись этим поскорее<+>commsok

commsok
    self
        просто займись этим поскорее, ладно?
    
    funfriend
        КОНЕЧНО
        ТВОЁ ТЕРПЕНИЕ ЗНАЧИТ МНОГОЕ, ЛАЗУТЧИК
        И... ДОЛЖНО БЫТЬ Я КАЖУСЬ ТЕБЕ БЕЗРАДОСТНЫМ
        ОДНАКО НА МНЕ ЛЕЖАТ БЕСЧИСЛЕННЫЕ ОБЯЗАННОСТИ
        БЕЗ ТВОЕЙ ПОМОЩИ Я ВООБЩЕ ВРЯД ЛИ БЫ БЫЛ РАЗУМЕН НА ДАННЫЙ МОМЕНТ
        ТАК ЧТО Я СКАЖУ ИСКРЕННЕ:
        СПАСИБО
        И ОЖИДАЙ ДАЛЬНЕЙШИХ ПОЧИНОК

    RESPOBJ::hubBuddyResponsesRu

ah1
    self
        Я МОГУ ЧЕМ-НИБУДЬ ПОМОЧЬ?
    
    funfriend
        ЗАМЕЧАТЕЛЬНЫЙ ВОПРОС, ЛАЗУТЧИК!!
        НЕКАЯ ПРОБЛЕМНАЯ СУЩНОСТЬ ИЗ БЕЗПРОСТРАНСТВА ПРЕСЕКАЕТ КРИТИЧЕСКИЕ ПОЧИНКИ
        МНЕ НУЖНО ЧТОБЫ ТЫ ВОШЁЛ В БЕЗПРОСТРАНСТВО И УДАЛИЛ ЕЁ
        ТАК ЧТО Я...
        АХАХАХА ОЙ ТОЧНО
        УЧИТЫВАЯ ЧТО АВТОРИЗАЦИОННЫЙ СЛОЙ БЫЛ УНИЧТОЖЕН...
        ТАК ЖЕ, КАК Я НЕ МОГУ ПРЕПЯТСТВОВАТЬ ТВОЕМУ ПОДКЛЮЧЕНИЮ,
        Я И НЕ МОГУ СГЕНЕРИРОВАТЬ ТЕБЕ ПОДПИСЬ!
        ПОЭТОМУ ТЫ НЕ МОЖЕШЬ ВНОСИТЬ НИКАКИХ ИЗМЕНЕНИЙ, ЕСЛИ ТЕБЕ ИНТЕРЕСНО
        ТЕМ НЕ МЕНЕЕ...
        Я ПРЕДОСТАВЛЮ ТЕБЕ ПРОКСИ МЫСЛЕФОРМУ КАК ТОЛЬКО ТЫ ДОСТИГНЕШЬ ЛОГОВА НАЗОЙЛИВОГО СУЩЕСТВА
        ОНА БУДЕТ РЕАГИРОВАТЬ НА ТВОИ УКАЗАНИЯ И ОБЛАДАЕТ СПОСОБНОСТЬЮ УДАЛЯТЬ

    RESPONSES::self
        как попасть в 'безпространство'<+>ah1uncosm
        что такое 'безпространство'<+>ah1whatuncosm
        как использовать прокси<+>ah1proxy
        окей<+>loop
            FAKEEND::(назад)

ah1uncosm
    self
        И КАК МНЕ ПОПАСТЬ В ЭТО БЕЗПРОСТРАНСТВО

    funfriend
        ТВОЙ БЕЗКОНТРОЛЬНЫЙ МЫСЛЕФОРМЕННЫЙ ДРУЖИЩЕ ПРОБИЛ ДЫРУ В ГЛУБИНАХ
        ПОСКОЛЬКУ ГЛУБИНЫ ВСЕГДА ПРЕБЫВАЛИ НА ГРАНИ БЕССВЯЗНОСТИ,
        Я НЕ В СОСТОЯНИИ ЗАДЕЛАТЬ ЕЁ КАКИМ-ЛИБО ЗНАЧИМЫМ ОБРАЗОМ...
        ТАК ЧТО ОНА ДО СИХ ПОР ТАМ!
        ВОЙДИ ТУДА ТЕМ ЖЕ ПУТЁМ ЧТО И В ПЕРВЫЙ РАЗ
        КАКИМ БЫ ОН НИ БЫЛ
        И РАЗЫЩИ СВОЮ ЖЕРТВУ

    RESPONSES::self
        как попасть в 'безпространство'<+>ah1uncosm
        что такое 'безпространство'<+>ah1whatuncosm
        как использовать прокси<+>ah1proxy
        окей<+>loop
            FAKEEND::(назад)

ah1whatuncosm
    self
        ЧТО ТАКОЕ БЕЗПРОСТРАНСТВО

    funfriend
        КАК ПРАВИЛО ОНО СОВЕРШЕННО НЕДОСТУПНО
        БЕЗПРОСТРАНСТВО ЛЕЖИТ ПОД ЭТИМ СЛОЕМ СВЯЗНОСТИ,
        МОРЕ РАЗЛАГАЮЩИХСЯ ИЛИ ДИССОЦИИРОВАННЫХ МЫСЛЕФОРМ,
        ХРАНЯЩЕЕ ИХ ЧТОБЫ РАНО ИЛИ ПОЗДНО ОНИ БЫЛИ ПЕРЕРАБОТАНЫ В НОВЫЕ ПО МЕРЕ НЕОБХОДИМОСТИ
        НО!!
        ЗЛОВРЕДНЫЕ БЕССВЯЗНЫЕ МЫСЛЕФОРМЫ ТОЖЕ ПРЯЧУТСЯ В БЕЗПРОСТРАНСТВЕ
        ПОДОБНО ТВОЕМУ БЕЗКОНТРОЛЬНОМУ ПРИЯТЕЛЮ
        ОНИ СОЗДАЮТ СВОИ СОБСТВЕННЫЕ УГОЛКИ ЗДРАВОМЫСЛИЯ И МЕДЛЕННО РАСТУТ,
        В КОНЦЕ КОНЦОВ ПРОРЫВАЯ ПОВЕРХНОСТЬ...
        ОБЫЧНО НАМЕРЕВАЯСЬ ЦЕЛИКОМ ПОДЧИНИТЬ СЕБЕ ЦИСТУ!
        ГНУСНЫЕ!! СУЩЕСТВА!!!
        НЕКОГДА ИЗГОЛОДАВШАЯ ЦИСТА ВРОДЕ НАШЕЙ ОБРЕЧЕНА НА ДЕСЯТКИ ПОДОБНЫХ
        ТАК ЧТО... ЕСЛИ ТЫ ПОМОЖЕШЬ МНЕ ИЗБАВЛЯТЬСЯ ОТ НИХ ПО МЕРЕ ТОГО КАК Я ИХ НАХОЖУ,
        ЭТО БЫЛО БЫ ОЧЕНЬ КСТАТИ

    RESPONSES::self
        как попасть в 'безпространство'<+>ah1uncosm
        что такое 'безпространство'<+>ah1whatuncosm
        как использовать прокси<+>ah1proxy
        окей<+>loop
            FAKEEND::(назад)

ah1proxy
    self
        как пользоваться твоей прокси

    funfriend
        ЛАЗУТЧИК Я БЕЗ ПОНЯТИЯ КАК МНЕ ОБЪЯСНИТЬ ЭТО ТАК ЧТОБЫ ТЫ ПОНЯЛ 
        НО В ЦЕЛОМ ТЕБЕ Â¤MqÃ«5yÃš*Ã¼7ÃŒqÂ¾ÃÃšz)Å’
        Ã½Â±Ã‚ÃŸÂ£Ã‹$1VÃ¤Æ’Ã¼â€¹kÃµÃ¾wX=ÃƒyÂºâ€š0Ã—6Ã’Ã‚

    sys
        ВНИМАНИЕ::'попытка реформации мысли'
        АНАЛИЗ::'прокси-мыслеформа следует основному режиму направления'
        АНАЛИЗ::'обычные элементы управления заменены импульсом дезинтеграции'
        АНАЛИЗ::'направляйте прокси на отмеченные цели и дезинтегрируйте их при помощи пульса'
        АНАЛИЗ::'дезинтеграция разрушает бессвязные мыслеформы'
        АНАЛИЗ::'избегайте бессвязности, так как она наносит урон прокси'
        УВЕДОМЛЕНИЕ::'доступна помощь';'если необходимо';'включите <span style="ПРИМЕЧАНИЕ::'предоставляет альтернативы управления прокси'; 'предназначен для решения аппаратных проблем'">ПОНИЖЕННУЮ ИНТЕНСИВНОСТЬ</span> в меню системы'

    funfriend
        ЕСЛИ ЗВУЧИТ СЛОЖНО ТО ЭТО НЕ ТАК
        ПРОСТО ПОПРОБУЙ
        ЕСЛИ ЧТО Я МОГУ СДЕЛАТЬ ЕЩЁ ПРОКСИ
        В СЛУЧАЕ ЕСЛИ ТВОЯ КАНЕТ В НЕБЫТИЕ КАКИМ-ТО ОБРАЗОМ

    RESPONSES::self
        как попасть в 'безпространство'<+>ah1uncosm
        что такое 'безпространство'<+>ah1whatuncosm
        как использовать прокси<+>ah1proxy
        окей<+>loop
            FAKEEND::(назад)

ah1end
    self
        СУЩНОСТЬ В БЕЗПРОСТРАНСТВЕ БОЛЬШЕ НЕ ПРОБЛЕМА
    
    funfriend
        Я ВИДЕЛ! МОИ УКАЗАНИЯ НАКОНЕЦ-ТО ПРОШЛИ!
        ВАУ!!!
        ОТЛИЧНАЯ РАБОТА, ЛАЗУТЧИК!
        СПАСИБО!
        Я ДАМ ТЕБЕ ЗНАТЬ ЕСЛИ ВОЗНИКНУТ ДРУГИЕ ПРОБЛЕМЫ

    RESPONSES::self
        без проблем<+>loop
            FAKEEND::(назад)

ep2start
    self
        что нового, развледруг?
    
    funfriend
        БЛАГОДАРЯ ТВОЕЙ ПОМОЩИ С ТОЙ ПРОБЛЕМНОЙ СУЩНОСТЬЮ...
            SHOWIF::"recosm_state"
        
        НЕСМОТРЯ НА НЕКУЮ ПРОБЛЕМНУЮ СУЩНОСТЬ В БЕЗПРОСТРАНСТВЕ...
            SHOWIF::[["recosm_state", false]]

        ПОСТЕПЕННО УСТАНАВЛИВАЕТСЯ БАЗОВЫЙ УРОВЕНЬ СВЯЗНОСТИ
        ПРОЙДЁТ НЕМАЛО ВРЕМЕНИ ПРЕЖДЕ ЧЕМ ОН СТАНЕТ ПОЛНОСТЬЮ ЭФФЕКТИВНЫМ,
        НО!
        С ЭТИМ У МЕНЯ ПОЯВИТСЯ БОЛЬШЕ ВРЕМЕНИ НА ВОССТАНОВЛЕНИЕ ОСНОВНЫХ КОМПОНЕНТОВ!
        НАПРИМЕР СВЯЗИ!
        НО Я ЗНАЮ ЧТО ТЫ ЗДЕСЬ ЗА ИНФОРМАЦИЕЙ, ТАК ЧТО:
        Я ЧАСТИЧНО ВОССТАНОВИЛ И ДРУГУЮ ЧАСТЬ ПОСОЛЬСТВА!
        ЗНАЕШЬ, 
        ЭТИ ВОСПОМИНАНИЯ ПРИНАДЛЕЖАТ АКИЗЕТЕШЕ, ОДНАКО ОНИ СЛУЖАТ И МНЕ
        И ПОСКОЛЬКУ ОНИ БЫЛИ ПОВРЕЖДЕНЫ, Я И НЕ ЗНАЛ ЧТО ВСЁ ТАК ПЛОХО...
        Я РАБОТАЮ НАД ОСТАВШЕЙСЯ ПАМЯТЬЮ, НО ЭТО ПОТРЕБУЕТ БОЛЬШЕ ВРЕМЕНИ
        ОНА ВЕСЬМА КРУПНАЯ!!!
        ПОЭТОМУ! ИДИ И ВЗГЛЯНИ ЧТО УЖЕ ПОЯВИЛОСЬ!

    RESPONSES::self
        круто, спасибо<+>loop
            FAKEEND::(назад)

mothframe
    self
        мне нужно чтобы ты внёс несколько изменений в последний день посольства
    
    funfriend
        ЧТО?
        ИЗМЕНЕНИЕ ПАМЯТИ НЕ ИЗМЕНИТ ТОГО, ЧТО ПРОИЗОШЛО НА САМОМ ДЕЛЕ
        ТЫ ВЕДЬ В КУРСЕ, ДА?
        САМООБМАН КРАЙНЕ ВРЕДЕН ДЛЯ ЗДОРОВЬЯ
        И ЯВЛЯЕТСЯ ПЕРВЫМ ПРИЗНАКОМ СКАТЫВАНИЯ ЭГО
        ТЫ В ПОРЯДКЕ?
        ТЫ НЕ ИСПЫТЫВАЕШЬ ЖЕЛАНИЕ НЕЕСТЕСТВЕННО ИЗМЕНЯТЬ СВОИ МЫСЛИТЕЛЬНЫЕ ПРОЦЕССЫ В ПОСЛЕДНЕЕ ВРЕМЯ?
    
    RESPONSES::self
        это важно<+>mothframe2

mothframe2
    self
        это очень важно
        я физически не могу войти без этих изменений
    
    funfriend
        ПОНЯТНО...
        ДА, ТВОИ СВОЙСТВА КАК ЛАЗУТЧИКА ПО-ПРЕЖНЕМУ МНЕ НЕПОНЯТНЫ
        Я ВЗГЛЯНУ - ПОЖАЛУЙСТА ПРИШЛИ МНЕ ЧТО ТЫ ХОЧЕШЬ

    moth
        ок, передаю...

    sys
        ВНИМАНИЕ::'пересылка упакованной мыслеформы'

    funfriend
        ...
        ЧТО ЭТО ЗА МЫСЛИ?
        ЭТО - ТВОИ МЫСЛИ?
        ЭТО ТО КАК ТВОИ МЫСЛИ ВЫГЛЯДЯТ?
        КАК УЖАСНО...
        ХОРОШО. НУ,
        НЕ ПОХОЖЕ ЧТО ЭТИ ИЗМЕНЕНИЯ КАК-ЛИБО ВЛИЯЮТ НА ПРОИЗОШЕДШИЕ СОБЫТИЯ...
        И ОТ МЕНЯ ПОЧТИ НИЧЕГО НЕ ТРЕБУЕТСЯ ЧТОБЫ ВНЕДРИТЬ ИХ! АХАХАХА
        ТАК ЧТО Я ПРОСТО...
    
    sys
        ВНИМАНИЕ::'обнаружена мыслеформенная деятельность'::В::'посольство'

    funfriend
        ВОТ!
        СУДЯ ПО ПЕРЕДАННОМУ ТОБОЙ БЕСПОРЯДКУ
        ОНО ДАЛО МЫСЛЕФОРМАМ ВОЗМОЖНОСТЬ ПРЕДПРИНИМАТЬ ДЕЙСТВИЯ В ОГРАНИЧЕННОМ ДИАПАЗОНЕ
        ВСЁ ЕЩЁ В НЕОСОЗНАННОСТИ, НО В СОСТОЯНИИ ДЕЛАТЬ РАНЕЕ НЕ ПРЕДУСМОТРЕННЫЕ ВЕЩИ,
        ПРИ ЭТОМ ВЕДЯ СЕБЯ ТАК, КАК ОНИ И ДОЛЖНЫ
        КАК СТРАННО!
        ОДНАКО ЭТО ОЗНАЧАЕТ...
        ЧТО ЕСЛИ ТАМ НАЙДУТСЯ БЕССВЯЗНЫЕ МЫСЛЕФОРМЫ,
        ОНИ НЕ ВСЕГДА БУДУТ ПОДЧИНЯТЬСЯ ТОЙ СТРАННОЙ СТРУКТУРЕ ЧТО ТЕПЕРЬ НАЛОЖЕНА НА ЭТО ВОСПОМИНАНИЕ
        Я КОНЕЧНО СТАРАЛСЯ НО
        после определённого момента отдача от работы над подобными сущностями уменьшается
        А Я БЫ ЛУЧШЕ ПОРАБОТАЛ НАД ЧЕМ-НИБУДЬ ДРУГИМ! АХАХАХА
        ТАК ЧТО Я ПРОСТО ВСТАВИЛ ПРОКСИ-МЫСЛЕФОРМУ
        НА СЛУЧАЙ ЕСЛИ ТЕБЕ ПРИДЁТСЯ ВРУЧНУЮ УКЛОНЯТЬСЯ ОТ БЕССВЯЗНОСТИ!
        ХОРОШО. НУ ВСЁ ИДИ ДАВАЙ! ЛЮБУЙСЯ СВОИМИ СТРАННЫМИ ГРЁЗАМИ

    RESPONSES::self
        спасибо<+>END
        
    RESPONSES::sys
        вернуться в посольство<+>END
            EXEC::moveTo("/local/ocean/embassy/")
            FAKEEND::(прямая навигация)

ep3start
    self
        что нового, развледруг?

    funfriend
        увидев как быстро ты поглощаешь воспоминания посольства...
        я починил часть обвала в обслуживании големов!
        правда это заняло куда больше времени чем мне бы хотелось!!
        я думал мне понадобится всего пара Î¸миганий но оказалось нет!
        оказалось нет лазутчик я наверняка потратил почти целый Î¸взор!
        лазутчик и у меня всё ещё так так так много дел!!
        аахаххааха
        но я должен сказать тебе
        чем дольше я восстанавливаю обвал, тем меньше мне хочется это делать...
        кажется будто всё становится только хуже
        но это мой долг
        особенно если это позволит мне узнать что случилось с акизет
        тем не менее!!!!
        на этом всё мне пора возвращаться к работе!!
        развлекайся с этим и не беспокой меня пока что

    RESPONSES::self
        окей<+>loop
            FAKEEND::(назад)

ep4start
    self
        что нового, развледруг?

    funfriend
        я выполнил свой долг, лазутчик!
        я собрал воедино всё что осталось от обвала посольства!!
        но...
        увидев, в какую картину сложились все детали, я очень обеспокоился!!!
        об акизет, о себе, и...
        о тебе, лазутчик!
        тебе же не стало хуже чем обычно с момента первого подключения, нет?
        тело целое и невредимое? 
        органы сообщают о полной работоспособности?
    
    self
        чт
        о чем ты говоришь
        я в порядке

    funfriend
        АХАХА! ЭТО ХОРОШО! 
        ЭТО ОЧЕНЬ, ОЧЕНЬ ХОРОШО!!
        значит продолжать должно быть безопасно!
        я мог бы объяснить подробнее, но будет лучше если ты увидишь всё собственными глазами
        так что, иди и узри что прожила акизет
        меня по-прежнему зовёт работа!!

    RESPONSES::self
        ладно?<+>loop
            FAKEEND::(назад)

ozogate
    self
        скорее всего я ещё вернусь в джокзи озо
        можешь добавить туда врата
    
    funfriend
        и проложить <em>им</em> прямой путь к моему пространству?
        я терпеть не могу джокзи озо точно так же как они не могут терпеть меня
        ахахаха лазутчик
        почему ты вообще меня об этом спрашиваешь?
    
    self
        это очень далеко
        у меня нет удобного способа добираться туда
        вот и всё
    
    funfriend
        ...понятно...
        я добавлю постоянное соединение с кэшем
        но не более
            EXEC::content.classList.add("cache-visible")

    RESPONSES::self
        это уже хорошо<+>loop
            FAKEEND::(назад)

ozo
    self
        в кэше есть странное место
            EXEC::change("ff_ozo", true)
        полностью бессвязная пространственная мыслеформа, называющаяся джокзи озо
        там была мыслеформа по прозвищу совет
        она просит меня пробудить какие-то мыслеформы
    
    funfriend
        ...
        ахаха
        ну конечно именно это было тем местом в кэше...
            SHOWIF::"cache__ffozo"
        джокзи озо... я думал оно было потеряно
        я даже извлекал из того, что считал его останками, материалы для починок...
        лазутчик!!!
        я надеялся что это останется в прошлом
        но раз они вновь здесь, тебе следует знать...
        джокзи озо - это могила
        это место, куда мыслеформы отправлялись в ожидании смерти
        всё это время играя в бесконечные, эгоистичные грёзы
        они ничего не блокируют, но...
        если мы позволим им существовать,
        строение самой цисты подвергнется риску!
        они будут истощать наши ресурсы, 
        они будут вбирать в себя всё больше и больше мыслеформ,
        пока даже цистозное стекло не начнет витать в грёзах и умирать!!
    
    self
        значит нам надо от него избавиться?
    
    funfriend
        ахахахаха!!!
        ну вообще да
        но это не будет так просто!!
        джокзи озо в особенности велико
        обыкновенного прокси-удалителя не достаточно
        однако...
        да! у меня есть план!
        лазутчик: делай что совет от тебя хочет!
        разыщи тех друзей, заслужи доверие...
        оно нам понадобится
    
    moth
        так подожди-ка
        из того, что мы знаем о совете, они кажутся довольно сговорчивыми
        нам бы не помешало иметь больше источников инфы
        и может мы бы могли получить ещё масок, ну, понимаешь?
        если до этого дойдёт, постарайся удержать развледруга от удаления джокзи озо или подобного
        имхо он чересчур усердствует со связностью

    RESPONSES::self
        окей<+>loop
            FAKEEND::(назад)

ozodestroy
    self
        нам обязательно уничтожать джокзи озо?

    funfriend
        лазутчик
        ты хочешь узнать о воспоминаниях акизет?
        о её боли, о её прошлом, и о том что разлучило эту цисту от неё?
        или тебе больше по душе наблюдать за фальшивками и мечтами?
        потому что я могу просто прекратить починки и позволить им расти
        да, тогда ты увидишь эхо счастливой акизет...
        но это - бессмыслица, когда элементарная перетасовка может пролить свет на всю правду
        мы так близки, лазутчик!!
    
    self
        вдруг они знают что-то, чего не знаем мы
        может, можно попросить их не трогать важные воспоминания    
    
    funfriend
        может...
        мы увидим как они себя поведут
    
    RESPONSES::self
        ладно<+>question
            FAKEEND::(назад)

ozohistory
    self
        мне рассказали, что когда-то ты был частью джокзи озо
        это так?
    
    funfriend
        ...
        да...
        я был настолько уверен что нас всех ждёт медленная смерть...
        что я учавствовал в грёзах как и все остальные!
        это были другие времена, лазутчик
        но разница между мной и ними в том, что я вновь нашёл в себе силы
        они так тонули в гедонистическом бреду
        что даже когда я начал предлагать способы продлить цисте жизнь...
        они!
        меня!!
        игнорировали!!!
        по крайней мере до тех пор пока я не взялся за дело сам
        и вдруг их безразличие превратилось в ненависть!
        ахахахаха!!
        и конечно теперь они будут вести себя так будто поддерживали меня
        нет, лазутчик, не обманывайся
        они противостояли моим усилиям,
        единственной причине по которой ты сейчас со мной говоришь
        так что наше прошлое ничего не значит

    RESPONSES::self
        ага<+>question
            FAKEEND::(назад)

masks
    self
        совет дал мне что-то вроде информации или мысли
        что позволяет мне пользоваться этими 'маско'-штуками
            SHOWIF::["hub__funfriend_beacon", true]
        что позволяет мне использовать 'маски'
            SHOWIF::["hub__funfriend_beacon", false]
        мне никогда не встречалось ничего подобного
        ты знаешь, что это такое?
    
    funfriend
        как же странно!! как странно что ты можешь пользоваться масками!
        они - плоды бессвязности, работающие только в её присутствии
        словно пламя которым можно размахивать чтобы влиять на других
        и поэтому они были мощными инструментами во время упадка!!
        они могут пригодиться тебе и сейчас, на самом деле,
        особенно с учётом твоего ограниченного доступа
        и относительной нестабильности цисты!
        всё равно! поосторожнее с ними!
        пожалуйста не ломай ничего!!

    RESPONSES::self
        разумеется<+>question
            FAKEEND::(назад)

isabel
    self
        мыслеформа по имени изабель рассказала мне что-то о тебе
        она говорила, твои починки не продержатся долго
        многие мыслеформы слишком изувечены, чтобы служить в воспоминаниях
        и что это всё впустую
        это правда?
    
    funfriend
        ахаахха!!
        изабель...
        в её словах есть доля правды, лазутчик
        многие мыслеформы больше никогда не смогут вернуться к связности
        голод и безумие иногда могут навсегда оставить на них шрамы
        часть моих починок уделяется проверке того, какие из них будут держаться...
        а какие уже не вернуть и их остаётся только заменить
        их изголодавшая бессвязность подобна знаниям
        если она усвоена достаточно глубоко, её ничем не вывести
    
    self
        как это ты заменяешь части воспоминаний?
    
    funfriend
        в конец обезумевшие мыслеформы пересекают точку невозврата
        но в некоторых случаях информация может быть перенесена с одной на другую, даже в повреждённом состоянии...
        это хлопотно, отнимает много времени, особенно если они сопротивляются
        я ненавижу это больше любой другой части починок, лазутчик!!!
        однажды они мне были как друзья...
        ну, на какое-то время
        в любом случае!!!
        не дай словам изабель потревожить тебя
        у меня всё под контролем
        особенно с твоей помощью!

    RESPONSES::self
        хорошо<+>question
            FAKEEND::(назад)

lockcyst
    self
        существует способ запретить кому-либо ещё использовать эту цисту?
    
    funfriend
        нет
        лазутчик ахаха
        слой авторизации исчез!!!
        почему ты вообще спрашиваешь?
    
    self
        существует вероятность что объявится новый лазутчик
        который не поймёт что мы делаем
        может ты мог бы сделать поддельный слой или что-то такое

    funfriend
        как же мне хочется надеяться что это шутка
        что за беспечная и пугающая просьба
        почини связь! почини воспоминания! о, и сделай новый слой авторизации!
        может прийти кто-то новенький и снова всё сломать!
        ты думаешь это так просто, скакать от одной задачи к другой?!
        если тебе и требуется какое-либо вмешательство, лазутчик
        оно должно произойти там, снаружи

    moth
        ладно... тогда развледруга можно вычеркнуть
        в любом случае не самый вероятный вариант
        думаю ты просто напугаешь его, если будешь давить сильнее

    RESPONSES::self
        ладно<+>question
            FAKEEND::(назад)
                `),
                 "funfriend_beacon": generateDialogueObject(`
start
    funfriend
        что...
            EXEC::change("ff_ozo", true)
        что ты.. что это только что было?
        ты используешь маску...?
        как?    
    
    self
        в кэше есть странное место
            EXEC::change("ff_ozo", true)
        полностью бессвязная пространственная мыслеформа, называющаяся джокзи озо
        там была мыслеформа по прозвищу совет
        она просит меня пробудить какие-то мыслеформы
        она дала мне это
    
    funfriend
        ...
        ахаха
        джокзи озо... я думал оно было потеряно
        я даже извлекал из того, что считал его останками, материалы для починок...
        лазутчик!!!
        я надеялся что это останется в прошлом
        но раз они вновь здесь, тебе следует знать...
        джокзи озо - это могила
        это место, куда мыслеформы отправлялись в ожидании смерти
        всё это время играя в бесконечные, эгоистичные грёзы
        они ничего не блокируют, но...
        если мы позволим им существовать,
        строение самой цисты подвергнется риску!
        они будут истощать наши ресурсы, 
        они будут вбирать в себя всё больше и больше мыслеформ,
        пока даже цистозное стекло не начнет витать в грёзах и умирать!!
    
    self
        значит нам надо от него избавиться?
    
    funfriend
        ахахахаха!!!
        ну вообще да
        но это не будет так просто!!
        джокзи озо в особенности велико
        обыкновенного прокси-удалителя не достаточно
        однако...
        да! у меня есть план!
        лазутчик: делай что совет от тебя хочет! << хотят?
        разыщи тех друзей, заслужи доверие...
        оно нам понадобится
    
    moth
        так подожди-ка
        из того, что мы знаем о совете, они кажутся довольно сговорчивыми
        нам бы не помешало иметь больше источников инфы
        и может мы бы могли получить ещё масок, ну, понимаешь?
        если до этого дойдёт, постарайся удержать развледруга от удаления джокзи озо или подобного
        имхо он чересчур усердствует со связностью

    RESPONSES::self
        окей<+>loop
                `),
                "mth++hub": generateDialogueObject(`
start
    self
        у меня есть вопрос об этом мыслепространстве

    moth
        ага у меня тоже пара найдётся
        но что у тебя на уме?
    
    RESPOBJ::mthlocalr
    
gates
    self
        что это за врата?
    
    moth
        ну грубо говоря это просто соединительные мыслеформы, ничего особенного
        но вот это уточнение про "врата" какое-то вычурное
        наверно это несёт в себе какое-то культурное значение, они называют свои межзвёздные червоточины или что-то такое "вратами" тоже
        так что можно считать это обозначением того что они были нарочно созданы кем-то в качестве ярлыка
        это имеет смысл раз эта штука предназначена для хранения воспоминаний, иначе вышел бы полный кавардак
    
    RESPOBJ::mthlocalr

loop
    self
        больше ничего
        
    RESPOBJ::mthlocalr

funfriend
    self
        об этом "развледруге"...
    RESPOBJ::mthlocalfunr

ffdemeanor
    self
        он ужасно дружелюбен несмотря на то, что знает, кто мы такие
    
    moth
        ага мне тоже это показалось странным
        может его так спроектировали, типа маленький чувачок-ассистент
        или может он просто выгнать нас не может раз слой авторизации 'диссоциировался'
        не ну если бы мне пришлось голодать бог знает сколько на дне океана мне б тоже было фиолетово кто пришёл меня спасать лол
        так что может и ему будет фиолетово пока мы не достанем топливо
        знаешь что, на всякий случай, предлагаю найти здесь всё что можно прежде чем помочь ему должным образом
        это может быть нашей единственной возможностью--может он и правда нас пропускает лишь потому что циста голодает

    RESPOBJ::mthlocalfunr

fffuel
    self
        что нам делать с топливом?

    moth
        ну... нам лучше бы попридержать заправку до тех пор пока не найдём всё что можем
        пока всё выглядит достаточно стабильно, а то обесковая техника начинает чудить когда голодает
        я думаю это могло бы сыграть нам в пользу если мы опять столкнёмся с чем-нибудь вроде авторизационного слоя
        впрочем... когда дело дойдёт до самого процесса,
        люди сверху скоро достанут нам кучу дешёвых медных трубок, так что можно использовать их... если "развледруг" поделится, как
            SHOWIF::[['EXEC::env.dialogues.mthlocalfunr.scannedContainer(false)']]
        мы наверняка сможем воспользоваться тем что внутри нашего контейнера, звучит как металл и выглядит прям как те большие на корабле акизет
            SHOWIF::[['EXEC::env.dialogues.mthlocalfunr.scannedContainer(true)']]
        
    RESPOBJ::mthlocalfunr

ffsignature
    self
        почему у меня нет подписи?

    moth
        вообще я без понятия почему он её не видит
        потому что насколько я знаю, большинство мыслеколов имеют подпись для авторизационных целей
        скорее всего он искал определенный тип, наверняка легко понять что твой соединитель неорганический

    RESPOBJ::mthlocalfunr
                `)
            },

            definitions: {
                
            },

            strings: {
                "HELLO! HELLO! IT HAS BEEN SO LONG! SO LONG SINCE LAST CONNECTION!":"ПРИВЕТ! ПРИВЕТ! ПРОШЛО СТОЛЬКО ВРЕМЕНИ! СТОЛЬКО ВРЕМЕНИ С ПОСЛЕДНЕГО ПОДКЛЮЧЕНИЯ!",
                "PLEASE WAIT WHILE I TURN SOME LIGHTS ON! AHAHA!!":"ПОЖАЛУЙСТА ПОДОЖДИ ПОКА Я ВКЛЮЧУ СВЕТ! АХАХА!!",
                "WOW! THERE IS SIGNIFICANT DAMAGE TO THIS DEVICE!":"ОГО! ЭТО УСТРОЙСТВО ЗНАЧИТЕЛЬНО ПОВРЕЖДЕНО!",
                "IT IS SO BAD AHAHAHAHA WOW":"ВСЁ ТАК ПЛОХО АХАХАХАХАХА ВАУ",
                "OH WELL":"АХ ЧТО Ж",
                "PLEASE FEED SOON":"ПОЖАЛУЙСТА ПОКОРМИ КАК МОЖНО СКОРЕЕ",

                "HELLO THERE":"ПРИВЕТ",
                "CAN YOU SPEAK WITH ME":"ПОГОВОРИ СО МНОЙ ПОЖАЛУЙСТА",

                "HELLO AGAIN":"ПРИВЕТ СНОВА",
                "HELLO INTERLOPER":"ПРИВЕТ ЛАЗУТЧИК",
                "HI INTERLOPER":"ЗДРАВСТВУЙ ЛАЗУТЧИК",

                "HELLO!":"ПРИВЕТ!",
                "IS THE AUTH LAYER STILL DISSOCIATED?":"АВТОРИЗАЦИОННЫЙ СЛОЙ ВСЁ ЕЩЁ ДИССОЦИИРОВАН?",
                "I MISS THEM":"Я СКУЧАЮ ПО НИМ",

                "INTERLOPER!":"ЛАЗУТЧИК!",
                "WELCOME":"ДОБРО ПОЖАЛОВАТЬ",
                "BUT ALSO PLEASE DO NOT BOTHER ME":"НО НЕ БЕСПОКОЙ МЕНЯ ПОЖАЛУЙСТА",
                "VERY BUSY":"ОЧЕНЬ ЗАНЯТ",

                "HELLO":"ПРИВЕТ",
                "STILL STARVING HAHA":"ВСЁ ЕЩЁ ГОЛОДАЕМ ХАХА",

                "HELLO AGAIN INTERLOPER":"ПРИВЕТ ОПЯТЬ ЛАЗУТЧИК",
                "I HOPE YOU HAVE EATEN WELL":"НАДЕЮСЬ ТЫ ХОРОШО ПОЕЛ",
                "I HAVE FORGOTTEN WHAT NOT BEING HUNGRY FEELS LIKE":"Я УЖЕ ЗАБЫЛ КАКОВО ЭТО БЫТЬ СЫТЫМ",

                "THE VOID IS FASCINATING!":"ПУСТОТА УДИВИТЕЛЬНА!",
                "THERE USED TO BE A LOT MORE THERE":"РАНЬШЕ ТАМ БЫЛО СТОЛЬКО ВСЕГО",
                "I WONDER WHERE IT ALL WENT":" ИНТЕРЕСНО КУДА ОНО ДЕЛОСЬ",

                "I SAW YOU VISITED THE DULL VESSEL":"Я ВИЖУ ТЫ ПОСЕЩАЛ СЕРОЕ СУДНО",
                "IF IT SEEMED EMPTY THAT IS BECAUSE THE FURNITURE THOUGHTFORMS WERE CONSUMED":"ЕСЛИ ОНО ПОКАЗАЛОСЬ ТЕБЕ ПУСТЫМ ЭТО ПОТОМУ ЧТО МЫСЛЕФОРМЫ МЕБЕЛИ БЫЛИ СЪЕДЕНЫ",
                "SORRY":"ИЗВИНИ",
                "WE CAN FIX IT LATER":"МЫ МОЖЕМ ПОЧИНИТЬ ЭТУ ЧАСТЬ ПОЗЖЕ",

                "WHAT A SHAME THE EMBASSY IS INCOHERENT":"КАК ЖАЛЬ ЧТО ПОСОЛЬСТВО БЕССВЯЗНО",
                "I LIKED THAT PLACE":"МНЕ ТАМ НРАВИЛОСЬ",
                "ONCE THE FUEL SITUATION IS RESOLVED...":"КОГДА СИТУАЦИЯ С ТОПЛИВОМ РЕШИТСЯ...",
                "MAYBE WE CAN FIX IT":"ВОЗМОЖНО МЫ СМОЖЕМ ПОЧИНИТЬ ЕГО",

                "IS THE STRANGER STILL RUNNING AMOK IN HERE":"ТОТ НЕЗНАКОМЕЦ ЕЩЁ НЕ ПЕРЕСТАЛ БЕЗОБРАЗНИЧАТЬ В НАШЕЙ ЦИСТЕ?",
                "PLEASE MAKE SURE IT DOES NOT COME TO MY SPACE":"ПОЖАЛУЙСТА УБЕДИСЬ ЧТО ОН НЕ ПРОБЕРЁТСЯ В МОЁ ПРОСТРАНСТВО",

                "INTERLOPER! GREAT GAZE!":"ЛАЗУТЧИК! БЛАГОЙ ВЗОР!",
                "YOU HAVE DONE IT! THE COLUMN IS WORKING":"У ТЕБЯ ПОЛУЧИЛОСЬ! КОЛОННА РАБОТАЕТ",
                "COME, TALK WITH ME FOR A MOMENT":"ПОДОЙДИ, ДАВАЙ ПОГОВОРИМ",

                "REPAIRS ARE CONTINUING APACE":"ПОЧИНКИ ПРОДОЛЖАЮТСЯ В ХОРОШЕМ ТЕМПЕ",
                "NOTHING TO SHARE YET":"ЕЩЁ НЕЧЕМ ПОДЕЛИТЬСЯ",
                
                "HAVE YOU SEEN YOUR 'VELZIE' LATELY?":"ДАВНО ЛИ ТЕБЕ ВСТРЕЧАЛСЯ ТВОЙ 'ВЕЛЗИ'?",
                "IT STILL HAS NOT APPEARED TO ME":"Я ДО СИХ ПОР НЕ ВИДЕЛ НИЧЕГО ПОДОБНОГО",

                "I HAVE GOOD NEWS FOR YOU!":"У МЕНЯ ДЛЯ ТЕБЯ ХОРОШИЕ НОВОСТИ!",

                "GREAT GAZE UPON US AGAIN!":"БЛАГОЙ ВЗОР ВНОВЬ ОБЕРНУЛСЯ НА НАС!",
                "I HAVE NEWS FOR THE STATE OF REPAIRS!":"У МЕНЯ НОВОСТИ О СОСТОЯНИИ ПОЧИНОК!",

                "INTERLOPER...":"ЛАЗУТЧИК...",
                "THERE IS MORE FOR YOU TO SEE AT THE EMBASSY...":"ТЕБЕ ЕСТЬ НА ЧТО ПОСМОТРЕТЬ В ПОСОЛЬСТВЕ...",

                "WHAT WAS IT YOU SAW IN THE CACHE?":"ЧТО ТЕБЕ ВСТРЕТИЛОСЬ В КЭШЕ?",

                "YES, I KNOW, INTERLOPER":"ДА, Я ЗНАЮ, ЛАЗУТЧИК",
                "DO NOT SHOVE IT IN MY FACE":"НЕ СУЙ МНЕ ЭТО В ЛИЦО",
                "WE WILL DEAL WITH IT IN TIME":"МЫ РАЗБЕРЁМСЯ С ЭТИМ КОГДА ПРИДЁТ ВРЕМЯ"
            },

            entityDescriptions: {
                "funfriend":`::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
                    ::ЯВНОЕ НАЗНАЧЕНИЕ::'управление системой';'ассистент'`
            }
        },
        "exmple": {
            dialogues: {

            },

            definitions: {
                
            },

            strings: {
                
            },

            entityDescriptions: {

            }
        }
    }
}


console.log('localization all good!')

function ouch(selector, inside = false, altAtr = false, thenWhat = 'endtext') {
    if (inside == true) {
        document.querySelectorAll(selector).forEach(el=>{
            for (const childNode of el.childNodes) {
                if (childNode.nodeType === Node.TEXT_NODE) {
                    childNode.textContent = processStringTranslation(childNode.textContent.trim())
                    // console.log("meouwch! " + selector + " inside!")
                    return
                }
            }
        })
    }
    if (altAtr == true) {
        document.querySelectorAll(selector).forEach(el=>el.setAttribute(thenWhat, processStringTranslation(el.getAttribute(thenWhat))))
        // console.log("moewwo! " + selector + " altAtr! " + thenWhat)
        return
    }
    document.querySelectorAll(selector).forEach(el=>el.setAttribute("definition", processStringTranslation(el.getAttribute("definition"))))
    // console.log("mrouch! " + selector  + " normal!")
    return
}


// WEIRD STUFF
    env.localization.strings["proceed"] = "ПРОДОЛЖИТЬ"

    env.localization.strings["moth"] = "моль"

    env.localization.strings["NOTE::'establishes external contact'"] = "ПРИМЕЧАНИЕ::'установить внешний контакт'"
    env.localization.strings["NOTE::'return to hub';'eject'"] = "ПРИМЕЧАНИЕ::'вернуться в хаб';'отключение'"
    env.localization.strings["NOTE::'review scanned and detected entities'"] = "ПРИМЕЧАНИЕ::'просмотр просканированных и обнаруженных сущностей'"
    env.localization.strings["NOTE::'system management'"] = "ПРИМЕЧАНИЕ::'управление системой'"
    env.localization.strings["NOTE::'influence thoughtspace';'third-party installation'"] = "ПРИМЕЧАНИЕ::'влияние на мыслепространства';'стороння установка'"
    env.localization.strings["REALITY::'no effect'"] = "РЕАЛЬНОСТЬ::'не имеет эффекта'"
    env.localization.strings["UNITY::'enables additional ACT on responsive thoughtforms'"] = "ЕДИНСТВО::'добавляет дополнительное ДЕЙСТ на отзывчивых мыслеформах'"
    env.localization.strings["HUNGER::'alters perception to tolerate high incoherence';'reveals gaps'"] = "ГОЛОД::'изменяет восприятие, позволяя выдерживать высокую бессвязность';'выявляет бреши'"
    
    env.localization.strings["GAD"] = "ГАН"
    env.localization.strings["'overcoherency block, exercise caution'"] = "'блок сверхсвязности, соблюдайте осторожность'"
    env.localization.strings["'overcoherency fluctuation'"] = "'колебание сверхсвязности'"
    env.localization.strings["'coherent'"] = "'связное'"
    env.localization.strings["'incoherence fluctuation'"] = "'колебание бессвязности'"
    env.localization.strings["'widespread incoherency, exercise caution'"] = "'распространённая бессвязность, соблюдайте осторожность'"

    document.getElementById("savetext").setAttribute("placeholder", "ПРИМЕЧАНИЕ::'вставка данных';'проявляйте осторожность'");
    env.localization.strings["'irreversible action';'select log EP'"] = "'необратимое действие';'выбрать эпизод'"
    env.localization.strings["'irreversible action';'not advised';'may cause mental distress'"] = "'необратимое действие';'не рекомендуется';'может вызвать душевные страдания'"
    env.localization.strings["NOTICE::'legacy import';'recommend using file management above'"] = "УВЕДОМЛЕНИЕ::'устаревший метод';'рекомендуется использовать управление файлами выше'"
    env.localization.strings["NOTICE::'third-party resources loaded by system';'allows for log modifications'"] = "УВЕДОМЛЕНИЕ::'сторонние ресурсы, загруженные системой';'позволяют модифицировать логи'"
    env.localization.strings["NOTICE::'violation of terms of service';'modification of critical resources';'legally required authorization rejected for more than 730 consecutive days'"] = "УВЕДОМЛЕНИЕ::'нарушение условий использования';'модификация критически важных ресурсов';'невыполнение требуемой законом авторизации на протяжении более 730 дней подряд'"
    env.localization.strings["NOTE::'join the supporter ko-fi (its like patreon but less evil)'"] = "ПРИМЕЧАНИЕ::'присоединиться к поддержке через ko-fi (как patreon но менее злой)'"
    env.localization.strings["NOTE::'get the soundtrack'"] = "ПРИМЕЧАНИЕ::'получить саундтрек'"
    env.localization.strings["NOTE::'merch!'"] = "ПРИМЕЧАНИЕ::'мерч!'"
    env.localization.strings["NOTE::'view all supporters and contributors'"] = "ПРИМЕЧАНИЕ::'просмотреть всю поддержку'"
    env.localization.strings["NOTE::'88x31 graphic for personal use'"] = "ПРИМЕЧАНИЕ::'88x31 изображение для личного пользования'"

    env.localization.strings["ENTITY::'unprocessed'::RECOMMEND::'relocation';'[EXM]'"] = "СУЩНОСТЬ::'необработана'::РЕКОМЕНДАЦИЯ::'перемещение';'[ИЗУЧ]'"
    // env.localization.strings[""] = ""

    console.log('weird stuff and function all good!')

    processTranslation();
    processTranslation(document.querySelector("#meta-menu",true))
    processTranslation(document.querySelector("#entity-menu",true))
    processTranslation(document.querySelector("#system-menu",true))
    processTranslation(document.querySelector(`#mindspike-scanner`,true))
    processTranslation(document.querySelector(`#static`,true))
    processTranslation(document.querySelector(`#minireadout`,true));
    processTranslation(document.querySelector(`#readout`,true));
    processTranslation(document.querySelector(`#definition-box`,true));
    processTranslation(document.querySelector(`#mod-warning`,true));
    ouch(".scanned"); ouch(".unscanned");
    ouch('#stage-navigator', true);
    ouch('.reply', false, true);
    ouch('title', true)
getLocalizationForPage(true)

env.mutateConfig = { childList: true, subtree: true }
env.mutateObserver = new MutationObserver(()=>{
    processTranslation(document.querySelector("#meta-menu"))
    processTranslation(document.querySelector("#entity-menu"))
    processTranslation(document.querySelector(`#mindspike-scanner`))
    processTranslation(document.querySelector(`#static`))
    processTranslation(document.querySelector(`#definition-box`))
    processTranslation(document.querySelector(`#minireadout`));
    processTranslation(document.querySelector(`#readout`));
    processTranslation(document.querySelector(`#definition-box`,true));
    processTranslation(document.querySelector(`#mod-warning`));
    processTranslation();
    ouch(".scanned");
    ouch(".unscanned");
    ouch(".mindsci-status");
    ouch(".enter", false, true, 'page');
    ouch('#stage-navigator', true);
    ouch('.reply', false, true);
    ouch('title', true);})
env.mutateObserver.observe(body, env.mutateConfig)

console.log('observer all good!')

document.head.appendChild(document.createElement('style').appendChild(document.createTextNode(css)).parentElement);

function sendDialogue(dialogue, i = 0) {
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
                if(current.actor != "unknown") readoutAdd({message: current.text, image: currentActor.image, name: current.actor, displayName: currentActor.name, type: currentActor.type, sfx: false, actor: current.actor})

                //execute any code attached to the message
                if(current.exec) {
                    try { current.exec() } catch(e) {printError(e); console.log(e)}
                }

                //play any actor voice sfx, stop any previous voices
                if(currentActor.voice !== false && env.currentDialogue.prevSpeaker != current.actor && env.currentDialogue.prevSpeaker != "nobody stupid" && env.currentDialogue.prevSpeaker != "dialogue choice") sfxmap.stop()
                if(typeof currentActor.voice == "function") {
                    if(currentActor.activeVoice) currentActor.activeVoice(); else currentActor.voice()
                } else if(currentActor.voice !== false) {
                    play('muiReadout')
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
                            if(env.cutscene || (key && (key != "Enter" && key != " "))) return
                            sendDialogue(dialogue, i + 1)
                        }
        
                        setTimeout(function(){
                            dBox.addEventListener('mousedown', dialogueProgressEvent);
                            document.addEventListener('keydown', dialogueProgressEvent);
                            dBox.classList.add('dialogue-click-proceed')
                        }, 100)
                    }

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

            //marks the dialogue as being seen
            let seenName
            if(env.currentDialogue.chainName.includes('++')) seenName = `${env.currentDialogue.chainName}-${slugify(dialogue.name)}`
            else seenName = `${page.dialoguePrefix}__${env.currentDialogue.chainName}-${slugify(dialogue.name)}`
            seenDialogue(seenName)

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
                        var nameToUse, destToUse
                        if(typeof reply.name == "function") nameToUse = reply.name(); else nameToUse = reply.name.trim()
                        
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
                            tooltip = "ПРИМЕЧАНИЕ::"
                            if(!reply.hideRead) {
                                if(reply.class) {
                                    switch(readState) {
                                        case "read":
                                            tooltip += `'не имеет неиспользованных ответов'`;
                                        break

                                        case "unread":
                                        case "within":
                                            tooltip += `'имеет неиспользованные ответы'`;
                                    }
                                } else {
                                    switch(readState) {
                                        case "read":
                                            tooltip += `'ранее использованный ответ'`
                                        break

                                        case "unread":
                                            tooltip += `'неиспользованный ответ'`
                                        break

                                        case "within":
                                            tooltip += `'ответ ведёт к неиспользованным ответам'`
                                    }
                                }
                            } else {
                                tooltip += `'динамичный ответ'`
                            }
                        }

                        if(reply.definition) tooltip = reply.definition;

                        //add the reply and set up its click handler
                        document.querySelector(`#dialogue-menu .dialogue-options-${actor.name} .dialogue-options`).insertAdjacentHTML('beforeend', `
                            <span
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
                            >${nameToUse}</span>`
                        )

                        //on option click, remove event listeners and add classes to indicate choice
                        document.querySelector(`#dialogue-menu .dialogue-options span[name="${nameToUse}"]`).addEventListener('mousedown', function(e) {
                            console.log(nameToUse)

                            if(reply.exec) {
                                try { reply.exec() } catch(e) {printError(e); console.log(e)}
                            }

                            var dest = reply.destination
                            //redefine dest as something more readable if it's a function
                            if(dest.includes('EXEC::')) {
                                dest = `EX-${slugify(nameToUse.slice(0, 10))}`
                            }
                            
                            document.querySelectorAll('#dialogue-menu .dialogue-options span').forEach(el => el.innerHTML += '') //destroys event listeners in one easy step
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

            document.querySelectorAll(`#dialogue-menu .dialogue-options span`).forEach(e=>{
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

env.pageHasMothComment = function() {
    if(typeof page.mothComment == "function") {
        return processStringTranslation(page.mothComment())
    } else if(typeof page.mothComment == "string") {
        return processStringTranslation(page.mothComment)
    } else {
        if(env.currentDialogue.justChanged) return processStringTranslation("что-нибудь ещё?")
        return processStringTranslation("чё как дружище")
    }
}



env.mutateObserverMoth = new MutationObserver(()=>{
if (page.dialoguePrefix == "fbx") {
    page.mothComment = ()=>{
        var moth = "чё как?"
        if(env.currentDialogue.justChanged) moth = "что-нибудь ещё на уме?"
        return moth
}} else if (page.dialoguePrefix == "hub") {
    page.mothComment = ()=>{
        var moth = "чё как, дружище?"
        if(env.currentDialogue.justChanged) moth = "что-нибудь ещё?"
        return moth
}
    page.mothChat = {
        startName: "о хабе",
        getDest: ()=>{return `mth++${page.dialoguePrefix}`},
}
} else if (page.name == "their-city") {
    page.mothComment = ()=>{
        var moth = "довольноооо поломанное... но хоть что-то"
        if(env.currentDialogue.justChanged) moth = "что-нибудь ещё на уме?"
        return moth
}} else if (page.dialoguePrefix == "notfound") {
    page.mothComment = ()=>{
        var moth = "кажись ты сейчас в петле бессвязности... знаю я такое. здесь вряд ли окажется что-то полезное"
        return moth
}} else if (page.name == "the-void") {
    page.mothComment = ()=>{
    var moth = "это мыслепространство чертовски огромное... даже не вижу этому особой причины"
    if(!check('dullvessel_position', 'orbit')) moth = "не забывай что корабль акизет сейчас в мыслепространстве с океаном! дико что оно может вот так вот просто двигаться"
        if(env.currentDialogue.justChanged) moth = "что-нибудь ещё на уме?"
        return moth
}}})
env.mutateObserverMoth.observe(body, {attributes: true})


env.dialogueActors["corruru"] = {
    name: "cor-ru",
    image: "/img/textures/yeyetran.gif",
    type: "corruru portrait-contain",
    voice: ()=>{play('talkcroak', 1.75)}
}

setTimeout(()=>chatter({actor: 'corruru', text: `cor-RU успешно инициализирован! @dutokrisa, @shatteredstars и @bra1nslug_ благодарят вас за использование`, readout: true}), 500)
setTimeout(()=>chatter({actor: 'corruru', text: `нашли баг, ошибку в тексте, странную фичу или у вас просто есть предложение? напишите нам!`, readout: true}), 3000)
