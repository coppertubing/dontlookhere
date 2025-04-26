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
env.dialogueActors["corruru"] = {
    name: "cor-ru",
    image: "/img/textures/yeyetran.gif",
    type: "corruru portrait-contain",
    voice: ()=>{play('talkcroak', 1.75)}
}

env.dialogues.mthglobalresp.whatnext = ()=>{
    if(!check('interview1__firstchat-behonest')) { /* before velziebreak */
             if(check('visited_localcitystreet') && check('visited_localoceanshipinterview') && check('visited_localdullvessel'))           return "выглядит так, будто интервью продолжает поток памяти, а не сбрасывает его полностью. может стоит довести его до конца и посмотреть не откроются ли там какие ещё нейронные пути"
        else if(check('visited_localcitystreet') && check('visited_localoceanship') && check('visited_localdullvessel'))                    return "тот корабль показался мне слишком пустым для того количества данных, которое извлёк твой мыслекол. оглядись там ещё раз"
        else if(check('visited_localcitystreet') && check('visited_localocean') && check('visited_localdullvessel'))                        return "я вижу ещё целую кучу данных в океане, мы там точно всё проверили?"
        else if(check('visited_localcitystreet') && check('visited_localorbit') && !check('visited_localdullvessel'))                       return "я вижу что-то выглядящее как другое место в космическом мыслепространстве, попробуй разыскать"
        else if(check('visited_localcitystreet') && !check('visited_localorbit'))                                                           return "думаю тут есть путь к другому мыслепространству, я вижу что-то в непространственной части города но не могу сказать точно где. похоже оно двигается, наверное просто плавает где-то"
        else if(!check('visited_localcitystreet') && check('visited_localorbit'))                                                           return "что-нибудь наверняка ещё прячется в городской местности, я вижу достаточный объём данных чтобы подозревать что мы что-то пропустили"
        else /* scroll to the right if you don't see anything */                                                                            return "о чём ты меня спрашиваешь? мы едва подключились, делай свое дело чел. не забывай, мыслеформы могут выходить за пределы твоего восприятия - думай об этом, словно ты что-то 'прокручиваешь'"
    } else if(!check('ep1_showmaterials')) { /* post velziebreak, pre ep1 */
             if(check('ep0_epilogue', 'done'))                                                                                              return "теперь мы ждём когда прибудут наши инструменты-открывашки контейнеров. можешь сделать перерыв если хочешь, я дам знать когда всё придёт"
        else if(check('ep0_epilogue', 'started') && check('hub__funfriend-fuelthanks') && check('dullvessel_container_examined'))           return "похоже мы могли бы воспользоваться тем, что внутри дендритного контейнера, чтобы сохранить цисту живой, но у меня нет ни малейшего понятия как его открыть. спроси развледруга, есть ли у него идеи"
        else if(check('ep0_epilogue', 'started') && check('hub__funfriend-fuelthanks'))                                                     return "ну-п, теперь мы просто убиваем время до тех пока не придёт заказ на медь. не волнуйся, я дам знать как только его доставят"
        else if(check('ep0_epilogue', 'started') && check('dullvessel_container_examined'))                                                 return "так значит в том контейнере 'обработанные металлы'... блин, так хотелось чтобы это было нашей зацепкой. может спросить ту развледружную штуку в хабе об идеях?"
        else if(check('ep0_epilogue', 'started') && !check('dullvessel_container_examined'))                                                return "нам надо разобраться, как сохранить эту штуковину живой. думаю тебе стоит поговорить с той развледружной фигнюшкой, у неё может оказаться пара идеек"
        else if(check('depths_depth') && !check('ep0_epilogue'))                                                                            return "тут чё-то реально странное с глубинами, они как будто постоянно изменяются. твой мыслекол не уведомляет тебя потому что это происходит ну типа тыщу раз в секунду. порыскай там хоть что-нибудь"
        else if(!check('depths_depth') && check('dullvessel_dive'))                                                                         return "тут подскочила активность когда судно серое нырнуло, что-то точно изменилось в океане. попробуй разузнать, что это"
        else if(check('dullvessel_position', 'ocean'))                                                                                      return "ну, должна ведь быть причина почему судно серое может передвигаться между космосом и океаном. не могла же эта бесконтрольная сущность взять и сделать это просто так"
        else if(check('dullvessel_position', 'orbit') && check('dullvessel__fixed-hello'))                                                  return "кажись твоя улыбка починила цисту-пилота... и теперь она предлагает переместить судно серое куда-то. почему бы не попробовать?"
        else if(check('dullvessel__pilot-end'))                                                                                             return "проверь что там с цистой-пилотом на корабле, я помню там были какие-то искажённые данные"
        else                                                                                                                                return "ну, твой мыслекол сообщил о какой-то деятельности в мыслеформе судна серое, почему бы не разведать там обстановку? твоя таинственная улыбка похоже что-то изменила"
    } else if(!check('fbx__ep2intro-end')) { //ep 1, after materials have been shown to the user for the first time
        //special check for if someone's looking for hints in the embassy days
        if(check("PAGE!!embassy_day"))  return "если ты спрашиваешь об этой мыслеформе, попробуй повзаимодействовать с акизет--для этого нужно отдалиться"

             if(check('hub__funfriend-ep1comms'))                                                                                           return "похоже что нам остаётся только ждать починок от развледруга. перерывчик?"
        else if(check('ep1_end'))                                                                                                           return "давай-ка поговорим с развледругом о починке связи, даже без угрозы велзи это было бы моей первой просьбой"
        else if(check('embassy_d2_complete'))                                                                                               return "я тут вижу что количество данных в районе городской улицы прибавилось... обязательно загляни туда"
        else if(check('embassy_d1_complete'))                                                                                               return "насколько я вижу, в посольстве ещё что-то есть"
        else if(check('hub__funfriend-ep1fed'))                                                                                             return "отправляйся в посольство, развледруг сказал что починил там что-то"
        else if(check('ep1_fed'))                                                                                                           return "давай проведаем развледруга, узнаем что он думает"
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
env.dialogues.mthresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.mthhubresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.mthlocalr = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)  
env.dialogues.mthlocalfunr = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.generalsentryResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.hubBuddyResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.persistentQuestions = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.envoyStreetResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.tvresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.flowerAwakeResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.interviewResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.fairyresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.glazikaResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.mthdullresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.enemyresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.enemyquestions = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.mthembresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.barfriendresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.embassyRelocatorResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues["d1_gakvuresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues["d1_kazkibozkoresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues["d1_cavikresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues["d1_attendantresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues["d2_attendantresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues["d2_gakvuresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues["d2_tozikresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues["d2_kazkiresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.d3_closeout = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.d3_c_responses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.d3_miltza_resp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.d3_miltza_artresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.d3_mind_resp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.d3_bstrdintro_responses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)
env.dialogues.drinkquestions = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось, перезагрузите страницу - создатели cor-RU<+>END
`)


env.localization = {
    dialogues: {
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
        ЗАПРОС_ПОЛЬЗОВАТЕЛЮ::'выбор лога'

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
                text: "ЗАПРОС_ПОЛЬЗОВАТЕЛЮ::'намерение'"
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
        "mthglobalresp": generateDialogueObject(`
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
        преимущество получено<+>leverage
            SHOWIF::[["leverageq", true], ["ozo__council-task", true], ["ozo__fairy_intro", true]]
            SHOWONCE::
        это всё<+>CHANGE::++moth
            FAKEEND::(назад)
        `),
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
        велзи - это что-то типа "божество" на языке обеск
        суть не только в этом но я полагаю ты спрашиваешь о <em>нашем</em> велзи
        ну о том о котором говорила циста-пилот
        а ещё, когда она упомянула это имя, оно не имело никакого контекста // *** мне не нравится запятая здась. убрать её или поставить одну после "ещё" <<< больше запятых!!!
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
        что такое маски
    
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
        ок<+>loop
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
        и как и остальная половина всей фауны на обески, они так же паразиты
        или какого-то рода грибковая инфекция... мы на самом деле не знаем точно
        а ещё они микроскопические, но вот стоит им заразить какую-нибудь наземную зверюшку или личиночного обеска...
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
        это образование на газовом гиганте c которым обески находится в приливном захвате
        народ обесков использует его видимость чтобы определять время
        некоторые регионы обески поклоняются или презирают его в качестве глаза бога
        учитывая насколько темно в их мире,
        и что в небе у них постоянно эта светящаяся штука которая выглядит как глаз,
        неудивительно, что они пришли к такому выводу
        хотя мы на самом деле не знаем, шторм это или что-то ещё
        потому что обески говорят, он светится на равных промежутках времени
        конечно это мог бы быть отражающийся свет их звезды...
        но без картинок или подобного нам остаётся только догадываться

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
        мне довелось прошерстить чуть ли не каждую стенограмму всех когда-либо взятых интервью с обесками, и они вообще не упоминают происхождение корру или то как у них возник симбиоз с ним
        и типа, если "личиночные" обески правда выглядят почти так же как мы, а потом они переходят в корруцистозные тела, то что это значит для нас?
        чёрт знает, сойти с ума можно если думать об этом слишком долго, впрочем сейчас нет времени философствовать

    RESPONSES::self
        понятно<+>loop
            FAKEEND::(назад)

what_corrucyst
    self
        что такое корруцисты?
    
    moth
        довольно общий термин, по сути "корруциста" и "корруцистозный" - универсальные названия для большинства обесковых технологий
        потому что у организма есть тенденция сворачиваться в шарик и образовать твёрдую оболочку прям как у этой цисты
        именно поэтому корруцистозные штуки обычно сферичные, но не обязательно
        например они используют подобный процесс для формирования тел которые используют куу обески
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
        поначалу после первого контакта они пытались выяснить, что это такое, и тучу раз говорили об этом
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
        о, так у тебя оно выглядит как улыбка?
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
        большинство теорий сходится на том что это какой-то металлический грибок который корру способно потреблять
        судя по словам равзледруга, они применяют кучу разных металлов для его изготовления
            SHOWIF::[["hub__funfriend-essentialmetalq"]]
        наверно логично что они используют их, но я не представляю себе как это работает
            SHOWIF::[["hub__funfriend-essentialmetalq"]]
    
    RESPONSES::self
        тревожит<+>loop
            FAKEEND::(назад)

what_dull
    self
        что ты знаешь о среде серое?
    
    moth
        о, приятель, для моих разглагольствований о серое нужна моральная подготовка
        мы тут всю ночь просидим
        такое разочарование что мы не так уж и много о ней знаем
        но... если вкратце о том, что мы знаем точно,
        и это всё типа штуки с интервью,
        был да жил один инженер-экивик - сероезковик жат, э, чётотам,
        который открыл что существует как минимум два вида, типа, реальности
        то что они называют сценой велзи - вот эта - и то что они в итоге назвали средой сероезковика
        или просто среда серое
        короче, мы не знаем как именно ему удалось совершить это открытие, но...
        погоди, я слишком много говорю об истории не так ли. я уже вижу как ты на меня смотришь
        окей. правда, серьёзно вкратце,
        мы знаем больше о её истории чем о всех её физических свойствах вместе взятых
        это одна из вещей, которой обески не успели полноценно с нами поделиться до того как всё рухнуло
        а может они просто не хотели
        они успели рассказать, мол, органическая жизнь не может пройти через неё, не будучи уничтоженной,
        однако вот корру без особых проблем выжить может, при условии небольшой подготовки...
        м... что ещё...
        ходит куча безумных теорий о том, чем она является взаправду
        типа паралелльная вселенная, другое "измерение" или нечто такое, но...
        имхо, это уже заходит на территорию какого-то нереалистичного кино
        всё вряд ли так просто
        у нас просто нет средств на какое-либо осмысленное взаимодействие с ней
        и обески больше больше особо не помогают
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
        но когда ты входишь во что бы это ни было <em>из</em> уже довольно бессвязного места
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
        ты - единственный знакомый мне псих который никогда ничего не обновляет, так что мне показалось ты примешь работу

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
        я понимаю о чём ты думаешь на самом деле...
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
        пока развледруг не починит ещё что-нибудь, или нам принесут ещё чего...
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
        ну не знаю может что-то не то на обед было, хз чел
        сомневаюсь что дело в "contact affliction" если это тебя забеспокоило
            SHOWIF::'ep4__contact'
        судя по тому что мы видели, эт бы раньше проявилось
            SHOWIF::'ep4__contact'
        смотря на статы твоей операционки, ГАН уходило в минус
        я знаю что другие мыслекольщики, работающие с корруцистами, сталкивались с проблемами в таком случае

____SHOWIF::['mask', 'hunger']
        вообще, странно, но оно такое с момента активации той маски голода
        причём в глобальном значении ничего подобного нет, это только на твоём устройстве
        попробуй деактивировать её 
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
        ну может пару раз упоминали при мне
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
        `),
        "++mothbeneath": generateDialogueObject(`
start
    sourceless
        за пределами твоего подключения обувь моли скребёт по бетону в панике
            EXEC::change("beneath", true)

    moth
        ебать
        ты в порядке? что ты там творишь?

____SHOWIF::"EXEC::env.pagePath == \`/local/beneath/parasite/\`"
    self
        всё нормально
        у меня просто получилось войти в игровую доску с паразитами

____SHOWIF::"EXEC::env.pagePath != \`/local/beneath/parasite/\` && env.pagePath != \`/local/ocean/ship/interview/\`"
    self
        всё нормально
        у меня просто получилось войти в мыслепространство через какие-то странные врата

____SHOWIF::"EXEC::env.pagePath == \`/local/ocean/ship/interview/\`"
    self
        всё нормально
        просто попытка заново визуализировать интервью // *** всё ещё проблемное но мне лень думать
____END

    moth
        втф
        и всё?
        окей, я не знаю как это работает
        может те "маски" как-то на это влияют кстати
            SHOWIF::['mask', 'hunger']
        но вообще ты щас не находишься ни в одном мыслепространстве
        тут все показания ёбнулись, выглядит так словно они считываются с нескольких мыслепространств одновременно
        у тебя визуализируется хоть что-нибудь?

    self
        да
        ты всё ещё видишь вывод?
    
    moth
        ну типа да, но он плавает в спаме из ошибок
        мыслеколы обычно отключаются с таким количеством бессвязности
        ...но ты, везунчик, работаешь на <span definition="ВНУТРЕННИЙ КОНТЕКСТ::'первый выпуск операционной системы мыслекола'">тонге</span> так ведь?
        всегда забываю это первая или третья
    
    self
        первая
    
    moth
        окей, да, тогда скорее всего я знаю в чём дело
        помнишь про ту хрень с <span definition="ВНУТРЕННИЙ КОНТЕКСТ::'ранний скандал с мыслеколами';'полное удаление источника памяти во время визуализации с целью вызвать галлюцинации';'первые случаи временной несоосности'">извлечением памяти</span>?
        в тонге большую часть обработки выполняет твой мозг
        и хотя система не позволяет тебе визуализировать бессвязные штуки,
        когда ты входишь во что бы это ни было <em>из</em> уже довольно бессвязного места
        твой мозг как бы уже привык к бессвязности
        разница не была достаточно большой чтобы она сделала ещё одну проверку
        так что думаю ты типа получаешь сигналы от кусочков мыслеформ, плавающих вокруг
        тут скорее всего не будет много интересного
        но оглядеться всё же стоит
        дерзай, я пока попытаюсь отфильтровать всё со своей стороны
    
    RESPONSES::self
        ладно<+>END
`)
    },

    definitions: {
        "жат": "'инженер';'каста'",
        "жата": "'инженер';'каста'",
        "жату": "'инженер';'каста'",
        "жатом": "'инженер';'каста'",
        "жате": "'инженер';'каста'",
                        
        "вел": "'каста';'частичная потеря значения из-за поврежденного контекста'",
        "θвела": "'каста';'частичная потеря значения из-за поврежденного контекста'",
        "велу": "'каста';'частичная потеря значения из-за поврежденного контекста'",
        "велом": "'каста';'частичная потеря значения из-за поврежденного контекста'",
        "веле": "'каста';'частичная потеря значения из-за поврежденного контекста'",
    
        "тир": "'каста';'частичная потеря значения из-за поврежденного контекста'",
        "тира": "'каста';'частичная потеря значения из-за поврежденного контекста'",
        "тиру": "'каста';'частичная потеря значения из-за поврежденного контекста'",
        "тиром": "'каста';'частичная потеря значения из-за поврежденного контекста'",
        "тире": "'каста';'частичная потеря значения из-за поврежденного контекста'",
    
        "кив": "'каста';'частичная потеря значения из-за поврежденного контекста'",
        "кива": "'каста';'частичная потеря значения из-за поврежденного контекста'",
        "киву": "'каста';'частичная потеря значения из-за поврежденного контекста'",
        "кивом": "'каста';'частичная потеря значения из-за поврежденного контекста'",
        "киве": "'каста';'частичная потеря значения из-за поврежденного контекста'",
    
        "куу": "'каста';'частичная потеря значения из-за поврежденного контекста'",


        "экивик": "'подразумевается этнос';'происхождение с континента';'экива'",
        "экивика": "'подразумевается этнос';'происхождение с континента';'экива'",
        "экивику": "'подразумевается этнос';'происхождение с континента';'экива'",
        "экивиком": "'подразумевается этнос';'происхождение с континента';'экива'",
        "экивике": "'подразумевается этнос';'происхождение с континента';'экива'",
        
        "экивики": "'подразумевается этнос';'происхождение с континента';'экива'",
        "экивиков": "'подразумевается этнос';'происхождение с континента';'экива'",
        "экивикам": "'подразумевается этнос';'происхождение с континента';'экива'",
        "экивиками": "'подразумевается этнос';'происхождение с континента';'экива'",
        "экивиках": "'подразумевается этнос';'происхождение с континента';'экива'",

        "экивиковый": "'подразумевается этнос';'происхождение с континента';'экива'",
        "экивикового": "'подразумевается этнос';'происхождение с континента';'экива'",
        "экивиковому": "'подразумевается этнос';'происхождение с континента';'экива'",
        "экивиковым": "'подразумевается этнос';'происхождение с континента';'экива'",
        "экивиковом": "'подразумевается этнос';'происхождение с континента';'экива'",

        "экивиковое": "'подразумевается этнос';'происхождение с континента';'экива'",

        "экивиковая": "'подразумевается этнос';'происхождение с континента';'экива'",
        "экивиковой": "'подразумевается этнос';'происхождение с континента';'экива'",
        "экивиковую": "'подразумевается этнос';'происхождение с континента';'экива'",
        "экивиковой": "'подразумевается этнос';'происхождение с континента';'экива'",
        "экивиковою": "'подразумевается этнос';'происхождение с континента';'экива'",

        "экивиковые": "'подразумевается этнос';'происхождение с континента';'экива'",
        "экивиковых": "'подразумевается этнос';'происхождение с континента';'экива'",
        "экивиковым": "'подразумевается этнос';'происхождение с континента';'экива'",
        "экивиковыми": "'подразумевается этнос';'происхождение с континента';'экива'",


        "вазниец": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийца": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийцу": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийцем": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийце": "'подразумевается этнос';'происхождение с континента';'вазни'",

        "вазнийцы": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийцев": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийцам": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийцами": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийцах": "'подразумевается этнос';'происхождение с континента';'вазни'",

        "вазнийка": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийки": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийке": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийку": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийкой": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийкою": "'подразумевается этнос';'происхождение с континента';'вазни'",

        "вазнийки": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазниек": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийкам": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийками": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийках": "'подразумевается этнос';'происхождение с континента';'вазни'",

        "вазнийский": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийского": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийскому": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийским": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийском": "'подразумевается этнос';'происхождение с континента';'вазни'",

        "вазнийское": "'подразумевается этнос';'происхождение с континента';'вазни'",

        "вазнийская": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийской": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийскою": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийскую": "'подразумевается этнос';'происхождение с континента';'вазни'",

        "вазнийские": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийских": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийским": "'подразумевается этнос';'происхождение с континента';'вазни'",
        "вазнийскими": "'подразумевается этнос';'происхождение с континента';'вазни'",

        "по-вазнийски": "'подразумевается этнос';'происхождение с континента';'вазни'",


        "тувазу": `'заброшенный континент';'известен экзотическими вейльковыми эктопаразитами'`,

        "указни озо": "'наземный город';'горная крепость';'место происхождения импульсного оружия серое'",

        "олтазни": `'дом';'вазнийский пещерный город'`,

        "козазни": `'вазнийский пещерный город';'дом казки';'известен грибковыми фермами'`,

        "окизика": `'экивиковый наземный монумент';'святое место'`,
        "окизики": `'экивиковый наземный монумент';'святое место'`,
        "окизике": `'экивиковый наземный монумент';'святое место'`,
        "окизику": `'экивиковый наземный монумент';'святое место'`,
        "окизикой": `'экивиковый наземный монумент';'святое место'`,
        "окизикою": `'экивиковый наземный монумент';'святое место'`,

        "окизиковая": `'экивиковый наземный монумент';'святое место'`,
        "окизиковой": `'экивиковый наземный монумент';'святое место'`,
        "окизиковую": `'экивиковый наземный монумент';'святое место'`,
        "окизиковою": `'экивиковый наземный монумент';'святое место'`,

        "тувазу": `'заброшенный континент';'известен экзотическими вейльковыми эктопаразитами'`,

    
    
        "велзи": "'бог'",
    

        "вейльк": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",
        "вейлька": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",
        "вейльку": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",
        "вейльком": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",
        "вейльке": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",

        "вейльки": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",
        "вейльков": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",
        "вейлькам": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",
        "вейльками": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",
        "вейльках": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",

        "вейльковый": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",
        "вейлькового": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",
        "вейльковому": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",
        "вейльковым": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",
        "вейльковом": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",
        "вейльков": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",

        "вейльковое": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",
        "вейльково": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",

        "вейльковая": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",
        "вейльковой": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",
        "вейльковую": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",
        "вейльковою": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",
        "вейлькова": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",

        "вейльковые": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",
        "вейльковых": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",
        "вейльковым": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",
        "вейльковыми": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",
        "вейльковы": "'наземная фауна';'основа всей экосистемы';'огромные и нескончаемые'",


        "сельки": "'вейльковый паразит';'еда'",
    
        "секри": "'хищник';'инфекция';'первобытный ужас'",
    
        "зузукри": "'агрессивная паразитическая наземная фауна';'захватывает разум жертвы для использования в качестве социального камуфляжа';'экивиковое ругательство'",
    
    
        "голем": { "type": "ПРИМЕЧАНИЕ", "text": "'частичный перевод';'подразумевается ближайший культурный эквивалент'"},
        "голема": { "type": "ПРИМЕЧАНИЕ", "text": "'частичный перевод';'подразумевается ближайший культурный эквивалент'"},
        "голему": { "type": "ПРИМЕЧАНИЕ", "text": "'частичный перевод';'подразумевается ближайший культурный эквивалент'"},
        "големом": { "type": "ПРИМЕЧАНИЕ", "text": "'частичный перевод';'подразумевается ближайший культурный эквивалент'"},
        "големе": { "type": "ПРИМЕЧАНИЕ", "text": "'частичный перевод';'подразумевается ближайший культурный эквивалент'"},
    
        "големы": { "type": "ПРИМЕЧАНИЕ", "text": "'частичный перевод';'подразумевается ближайший культурный эквивалент'"},
        "големов": { "type": "ПРИМЕЧАНИЕ", "text": "'частичный перевод';'подразумевается ближайший культурный эквивалент'"},
        "големам": { "type": "ПРИМЕЧАНИЕ", "text": "'частичный перевод';'подразумевается ближайший культурный эквивалент'"},
        "големами": { "type": "ПРИМЕЧАНИЕ", "text": "'частичный перевод';'подразумевается ближайший культурный эквивалент'"},
        "големах": { "type": "ПРИМЕЧАНИЕ", "text": "'частичный перевод';'подразумевается ближайший культурный эквивалент'"},


        "глазика": "ПЕРЕВОД НЕ УДАЛСЯ::ПРИЧИНА:'нет эквивалентного внутреннего значения';'нет релевантного унаследованного контекста'::УСПЕШНАЯ КИРИЛЛИЗАЦИЯ",
        "глазики": "ПЕРЕВОД НЕ УДАЛСЯ::ПРИЧИНА:'нет эквивалентного внутреннего значения';'нет релевантного унаследованного контекста'::УСПЕШНАЯ КИРИЛЛИЗАЦИЯ",
        "глазике": "ПЕРЕВОД НЕ УДАЛСЯ::ПРИЧИНА:'нет эквивалентного внутреннего значения';'нет релевантного унаследованного контекста'::УСПЕШНАЯ КИРИЛЛИЗАЦИЯ",
        "глазику": "ПЕРЕВОД НЕ УДАЛСЯ::ПРИЧИНА:'нет эквивалентного внутреннего значения';'нет релевантного унаследованного контекста'::УСПЕШНАЯ КИРИЛЛИЗАЦИЯ",
        "глазикой": "ПЕРЕВОД НЕ УДАЛСЯ::ПРИЧИНА:'нет эквивалентного внутреннего значения';'нет релевантного унаследованного контекста'::УСПЕШНАЯ КИРИЛЛИЗАЦИЯ",

        "глазик": "ПЕРЕВОД НЕ УДАЛСЯ::ПРИЧИНА:'нет эквивалентного внутреннего значения';'нет релевантного унаследованного контекста'::УСПЕШНАЯ КИРИЛЛИЗАЦИЯ",
        "глазикам": "ПЕРЕВОД НЕ УДАЛСЯ::ПРИЧИНА:'нет эквивалентного внутреннего значения';'нет релевантного унаследованного контекста'::УСПЕШНАЯ КИРИЛЛИЗАЦИЯ",
        "глазиками": "ПЕРЕВОД НЕ УДАЛСЯ::ПРИЧИНА:'нет эквивалентного внутреннего значения';'нет релевантного унаследованного контекста'::УСПЕШНАЯ КИРИЛЛИЗАЦИЯ",
        "глазиках": "ПЕРЕВОД НЕ УДАЛСЯ::ПРИЧИНА:'нет эквивалентного внутреннего значения';'нет релевантного унаследованного контекста'::УСПЕШНАЯ КИРИЛЛИЗАЦИЯ",


        "кальстик": "ПЕРЕВОД НЕ УДАЛСЯ::ПРИЧИНА:'нет эквивалентного внутреннего значения';'нет релевантного унаследованного контекста'::УСПЕШНАЯ КИРИЛЛИЗАЦИЯ",
        "кальстика": "ПЕРЕВОД НЕ УДАЛСЯ::ПРИЧИНА:'нет эквивалентного внутреннего значения';'нет релевантного унаследованного контекста'::УСПЕШНАЯ КИРИЛЛИЗАЦИЯ",
        "кальстику": "ПЕРЕВОД НЕ УДАЛСЯ::ПРИЧИНА:'нет эквивалентного внутреннего значения';'нет релевантного унаследованного контекста'::УСПЕШНАЯ КИРИЛЛИЗАЦИЯ",
        "кальстике": "ПЕРЕВОД НЕ УДАЛСЯ::ПРИЧИНА:'нет эквивалентного внутреннего значения';'нет релевантного унаследованного контекста'::УСПЕШНАЯ КИРИЛЛИЗАЦИЯ",
        "кальстиком": "ПЕРЕВОД НЕ УДАЛСЯ::ПРИЧИНА:'нет эквивалентного внутреннего значения';'нет релевантного унаследованного контекста'::УСПЕШНАЯ КИРИЛЛИЗАЦИЯ",

        "кальстики": "ПЕРЕВОД НЕ УДАЛСЯ::ПРИЧИНА:'нет эквивалентного внутреннего значения';'нет релевантного унаследованного контекста'::УСПЕШНАЯ КИРИЛЛИЗАЦИЯ",
        "кальстиков": "ПЕРЕВОД НЕ УДАЛСЯ::ПРИЧИНА:'нет эквивалентного внутреннего значения';'нет релевантного унаследованного контекста'::УСПЕШНАЯ КИРИЛЛИЗАЦИЯ",
        "кальстикам": "ПЕРЕВОД НЕ УДАЛСЯ::ПРИЧИНА:'нет эквивалентного внутреннего значения';'нет релевантного унаследованного контекста'::УСПЕШНАЯ КИРИЛЛИЗАЦИЯ",
        "кальстиками": "ПЕРЕВОД НЕ УДАЛСЯ::ПРИЧИНА:'нет эквивалентного внутреннего значения';'нет релевантного унаследованного контекста'::УСПЕШНАЯ КИРИЛЛИЗАЦИЯ",
        "кальстиках": "ПЕРЕВОД НЕ УДАЛСЯ::ПРИЧИНА:'нет эквивалентного внутреннего значения';'нет релевантного унаследованного контекста'::УСПЕШНАЯ КИРИЛЛИЗАЦИЯ",


        "θокно": "ПРИМЕЧАНИЕ::'частичный перевод';'подразумевается ближайший культурный эквивалент';'технологический подтекст'",
        "θокна": "ПРИМЕЧАНИЕ::'частичный перевод';'подразумевается ближайший культурный эквивалент';'технологический подтекст'",
        "θокну": "ПРИМЕЧАНИЕ::'частичный перевод';'подразумевается ближайший культурный эквивалент';'технологический подтекст'",
        "θокном": "ПРИМЕЧАНИЕ::'частичный перевод';'подразумевается ближайший культурный эквивалент';'технологический подтекст'",
        "θокне": "ПРИМЕЧАНИЕ::'частичный перевод';'подразумевается ближайший культурный эквивалент';'технологический подтекст'",

        "θокон": "ПРИМЕЧАНИЕ::'частичный перевод';'подразумевается ближайший культурный эквивалент';'технологический подтекст'",
        "θокнам": "ПРИМЕЧАНИЕ::'частичный перевод';'подразумевается ближайший культурный эквивалент';'технологический подтекст'",
        "θокнами": "ПРИМЕЧАНИЕ::'частичный перевод';'подразумевается ближайший культурный эквивалент';'технологический подтекст'",
        "θокнах": "ПРИМЕЧАНИЕ::'частичный перевод';'подразумевается ближайший культурный эквивалент';'технологический подтекст'",
    
    
        "сцена велзи": "'всё, что можно видеть';'физическая реальность';'религиозный термин, ныне используемый в науке';'частичный перевод';'сгенерировано из унаследованного контекста'",
        "сцены велзи": "'всё, что можно видеть';'физическая реальность';'религиозный термин, ныне используемый в науке';'частичный перевод';'сгенерировано из унаследованного контекста'",
        "сцене велзи": "'всё, что можно видеть';'физическая реальность';'религиозный термин, ныне используемый в науке';'частичный перевод';'сгенерировано из унаследованного контекста'",
        "сцену велзи": "'всё, что можно видеть';'физическая реальность';'религиозный термин, ныне используемый в науке';'частичный перевод';'сгенерировано из унаследованного контекста'",
        "сценой велзи": "'всё, что можно видеть';'физическая реальность';'религиозный термин, ныне используемый в науке';'частичный перевод';'сгенерировано из унаследованного контекста'",
        "сценою велзи": "'всё, что можно видеть';'физическая реальность';'религиозный термин, ныне используемый в науке';'частичный перевод';'сгенерировано из унаследованного контекста'",
    
    
    
        "θглаз": "'отрезок времени';'обороты вокруг глаза велзи';'религиозный подтекст'",
        "θглаза": "'отрезок времени';'обороты вокруг глаза велзи';'религиозный подтекст'",
        "θглазу": "'отрезок времени';'обороты вокруг глаза велзи';'религиозный подтекст'",
        "θглазом": "'отрезок времени';'обороты вокруг глаза велзи';'религиозный подтекст'",
        "θглазе": "'отрезок времени';'обороты вокруг глаза велзи';'религиозный подтекст'",
        "θглазу": "'отрезок времени';'обороты вокруг глаза велзи';'религиозный подтекст'",
    
        "θглазам": "'отрезок времени';'обороты вокруг глаза велзи';'религиозный подтекст'",
        "θглазами": "'отрезок времени';'обороты вокруг глаза велзи';'религиозный подтекст'",
        "θглазах": "'отрезок времени';'обороты вокруг глаза велзи';'религиозный подтекст'",
    
    
        "θвзор": "'отрезок времени';'многочислены в глазах'",
        "θвзора": "'отрезок времени';'многочислены в глазах'",
        "θвзору": "'отрезок времени';'многочислены в глазах'",
        "θвзором": "'отрезок времени';'многочислены в глазах'",
        "θвзоре": "'отрезок времени';'многочислены в глазах'",
    
        "θвзоры": "'отрезок времени';'многочислены в глазах'",
        "θвзоров": "'отрезок времени';'многочислены в глазах'",
        "θвзорам": "'отрезок времени';'многочислены в глазах'",
        "θвзорами": "'отрезок времени';'многочислены в глазах'",
        "θвзорах": "'отрезок времени';'многочислены в глазах'",
    
    
        "θподмиг": "'отрезок времени';'многочислены во взорах'",
        "θподмига": "'отрезок времени';'многочислены во взорах'",
        "θподмигу": "'отрезок времени';'многочислены во взорах'",
        "θподмигом": "'отрезок времени';'многочислены во взорах'",
        "θподмиге": "'отрезок времени';'многочислены во взорах'",
    
        "θподмиги": "'отрезок времени';'многочислены во взорах'",
        "θподмигов": "'отрезок времени';'многочислены во взорах'",
        "θподмигам": "'отрезок времени';'многочислены во взорах'",
        "θподмигами": "'отрезок времени';'многочислены во взорах'",
        "θподмигах": "'отрезок времени';'многочислены во взорах'",
    
    
        "θмиг": "'отрезок времени';'многочислены в подмигах'",
        "θмига": "'отрезок времени';'многочислены в подмигах'",
        "θмигу": "'отрезок времени';'многочислены в подмигах'",
        "θмигом": "'отрезок времени';'многочислены в подмигах'",
        "θмиге": "'отрезок времени';'многочислены в подмигах'",
    
        "θмиги": "'отрезок времени';'многочислены в подмигах'",
        "θмигов": "'отрезок времени';'многочислены в подмигах'",
        "θмигам": "'отрезок времени';'многочислены в подмигах'",
        "θмигами": "'отрезок времени';'многочислены в подмигах'",
        "θмигах": "'отрезок времени';'многочислены в подмигах'",
    
        
        
        "беспространство": { "type": "ПРИМЕЧАНИЕ", "text": "'реконструктивный перевод';'подразумевает небытие'"},
        "беспространства": { "type": "ПРИМЕЧАНИЕ", "text": "'реконструктивный перевод';'подразумевает небытие'"},
        "беспространству": { "type": "ПРИМЕЧАНИЕ", "text": "'реконструктивный перевод';'подразумевает небытие'"},
        "беспространством": { "type": "ПРИМЕЧАНИЕ", "text": "'реконструктивный перевод';'подразумевает небытие'"},
        "беспространстве": { "type": "ПРИМЕЧАНИЕ", "text": "'реконструктивный перевод';'подразумевает небытие'"},
    
    
        "джокзи озо": "'дом';'крепость на джокзи'",
    
        
        "θсмерть": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
        "θсмерти": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
        "θсмертью": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
    
        "θсмертей": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
        "θсмертям": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
        "θсмертями": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
        "θсмертях": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
    
        
        "θсмертный": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
        "θсмертного": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
        "θсмертному": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
        "θсмертным": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
        "θсмертном": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
        "θсмертен": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
    
        "θсмертное": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
        "θсмертно": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
    
        "θсмертная": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
        "θсмертной": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
        "θсмертную": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
        "θсмертною": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
        "θсмертна": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
    
        "θсмертные": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
        "θсмертных": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
        "θсмертным": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
        "θсмертными": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
        "θсмертны": { "type": "ПРИМЕЧАНИЕ", "text": "'подразумевает изменённое состояние проживания'"},
    
        
        "фея": { "type": "ПРИМЕЧАНИЕ", "text": "'частичный перевод';'подразумевается ближайший культурный эквивалент'"},
        "феи": { "type": "ПРИМЕЧАНИЕ", "text": "'частичный перевод';'подразумевается ближайший культурный эквивалент'"},
        "фее": { "type": "ПРИМЕЧАНИЕ", "text": "'частичный перевод';'подразумевается ближайший культурный эквивалент'"},
        "фею": { "type": "ПРИМЕЧАНИЕ", "text": "'частичный перевод';'подразумевается ближайший культурный эквивалент'"},
        "феей": { "type": "ПРИМЕЧАНИЕ", "text": "'частичный перевод';'подразумевается ближайший культурный эквивалент'"},
        "феею": { "type": "ПРИМЕЧАНИЕ", "text": "'частичный перевод';'подразумевается ближайший культурный эквивалент'"},
    }, 
    
    strings: {  
        "greet": "поздороваться",

        "'clearing mindspike buffer'; 'no progress will be lost'": "'очистка буфера мыслекола';'прогресс не будет потерян'",
        "NOTICE::'loading resources';'please wait'": "УВЕДОМЛЕНИЕ::'прогрузка ресурсов';'пожалуйста, подождите'",

        "SPATIAL NAVIGATION": "ПРОСТРАНСТВЕННАЯ НАВИГАЦИЯ",


        "EXM": "ИЗУЧ",
        "ACT": "ДЕЙСТ",

        "ATTENTION::'additional ACT enabled';'rescan": "ВНИМАНИЕ::'доступно дополнительное ДЕЙСТ';'пересканируйте",

        "end chat": "закончить разговор",

        "enter": "войти",

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
        "ALERT::reloading": "ОПОВЕЩЕНИЕ::перезагрузка",
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
        "something actually fucked up (not a part of the story) details are in the log and console": "что-то на самом деле наебнулось (не часть истории), подробности в логе и консоли (алсо сорян но дальше вы по-английски)",

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


        "ATTENTION::'thoughtform activity detected'::'resources removed'": "ВНИМАНИЕ::'обнаружена мыслеформенная деятельность'::'удалены данные'",

        "unity": "единство",
        "effigy": "эффигия",

        /*moth*/ "this is so weird... i think that's meant to be akizet": "очень странно... я думаю она должна была быть акизет",
        /*moth*/ "but the data here is so messed up i can't really tell what happened to it": "но данные здесь в таком хреновом состоянии что даже не скажешь что с ней приключилось",

        // ENTITY MENU + READOUT NOTIFS AND GATES AND basically locations lol STUFF

        "ENTITY": "СУЩНОСТЬ",

        "__incomplete_thoughtform__": "__НЕПОЛНОЦЕННАЯ_МЫСЛЕФОРМА__",

        "funfriend": "развледруг",

        "proxyfriend": "проксидруг",

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

        "our_dull_vessel": "НАШЕ_СУДНО_СЕРОЕ",
        "our-dull-vessel": "наше-судно-серое",
        "our dull vessel": "НАШЕ СУДНО СЕРОЕ",

        "the dull contrivance": "открытие серое",

        "the_embassy": "ПОСОЛЬСТВО",
        "the-embassy": "посольство",
        "the embassy": "ПОСОЛЬСТВО",

        "GOLEM_MAINTENANCE": "ОБСЛУЖИВАНИЕ_ГОЛЕМОВ",
        "golem-maintenance": "обслуживание-големов",
        "GOLEM MAINTENANCE": "ОБСЛУЖИВАНИЕ ГОЛЕМОВ",

        "PALE_HALLS": "БЛЕДНЫЕ_КОРИДОРЫ",
        "pale-halls": "бледные-коридоры",
        "PALE HALLS": "БЛЕДНЫЕ КОРИДОРЫ",

        "..__DEPTHS__..": "..__ГЛУБИНЫ__..",
        "depths": "глубины",
        "the_depths": "ГЛУБИНЫ",
        "the depths": "ГЛУБИНЫ",

        "??__HOME": "??__ДОМ",
        "my-beautiful-world": "мой-дивный-мир",
        "my beautiful world": "мой дивный мир",

        "MEMBRANE_LESION": "РАЗРЫВ_В_МЕМБРАНЕ",
        "MEMBRANE LESION": "РАЗРЫВ В МЕМБРАНЕ",
        "..__CACHE__..": "..__КЭШ__..",
        "cache": "кэш",

        "JOKZI_OZO": "ДЖОКЗИ_ОЗО",
        "jokzi-ozo": "джокзи-озо",

        "::/FRAME/": "::/ОБРАМЛЕНИЕ/",
        "frame": "обрамление",
        
        "gate::gate::?/::G:a;;T:E": "врата::врата::?/::В:р;;АТ:А",
        "gate::gaGATE::te::?/..::G:a;;T:E": "врата::враВРАТА::та::?/..::В:р;;АТ:А",

        "a?-?b?-????-y?s?": "б?-?ез?-????-н?а?",
        "a-b-y-s": "б-ез-н-а",

        "PARASITE PLANE": "ПАРАЗИТНАЯ ПРОЕКЦИЯ",
        "p-a-r-s-t-e": "п-а-р-з-и-т",
        "p?a-??r?-???s?-t?e?": "п?а-??р?-???з?-и?т?",

        "!!__ERROR::UNPROCESSABLE__!!": "!!__ОШИБКА::ОБРАБОТКА_НЕВОЗМОЖНА __!!",

        "__UNKNOWN": "__НЕИЗВЕСТНО",

        "advance log": "продвинуть лог",

        // MENU

        
        "'irreversible action';'select log EP'": "'необратимое действие';'выбрать эпизод'",
        "'irreversible action';'not advised';'may cause mental distress'": "'необратимое действие';'не рекомендуется';'может вызвать душевные страдания'",
        "NOTICE::'legacy import';'recommend using file management above'": "УВЕДОМЛЕНИЕ::'устаревший метод';'рекомендуется использовать управление файлами выше'",
        "NOTICE::'third-party resources loaded by system';'allows for log modifications'": "УВЕДОМЛЕНИЕ::'сторонние ресурсы, загруженные системой';'позволяют модифицировать логи'",
        "NOTICE::'violation of terms of service';'modification of critical resources';'legally required authorization rejected for more than 730 consecutive days'": "УВЕДОМЛЕНИЕ::'нарушение условий использования';'модификация критически важных ресурсов';'невыполнение требуемой законом авторизации на протяжении более 730 дней подряд'",
        "NOTE::'join the supporter ko-fi (its like patreon but less evil)'": "ПРИМЕЧАНИЕ::'присоединиться к поддержке через ko-fi (как patreon но менее злой)'",
        "NOTE::'get the soundtrack'": "ПРИМЕЧАНИЕ::'получить саундтрек'",
        "NOTE::'merch!'": "ПРИМЕЧАНИЕ::'мерч!'",
        "NOTE::'view all supporters and contributors'": "ПРИМЕЧАНИЕ::'просмотреть всю поддержку'",
        "NOTE::'88x31 graphic for personal use'": "ПРИМЕЧАНИЕ::'88x31 изображение для личного пользования'",

        "ENTITY::'unprocessed'::RECOMMEND::'relocation';'[EXM]'": "СУЩНОСТЬ::'необработана'::РЕКОМЕНДАЦИЯ::'перемещение';'[ИЗУЧ]'",

        "proceed": "ПРОДОЛЖИТЬ",

        "moth": "моль",
    
        "NOTE::'establishes external contact'": "ПРИМЕЧАНИЕ::'установить внешний контакт'",
        "NOTE::'return to hub';'eject'": "ПРИМЕЧАНИЕ::'вернуться в хаб';'отключение'",
        "NOTE::'review scanned and detected entities'": "ПРИМЕЧАНИЕ::'просмотр просканированных и обнаруженных сущностей'",
        "NOTE::'system management'": "ПРИМЕЧАНИЕ::'управление системой'",
        "NOTE::'influence thoughtspace';'third-party installation'": "ПРИМЕЧАНИЕ::'влияние на мыслепространства';'стороння установка'",
        "REALITY::'no effect'": "РЕАЛЬНОСТЬ::'не имеет эффекта'",
        "UNITY::'enables additional ACT on ОТЗЫВЧИВАЯ МЫСЛЕФОРМАs'": "ЕДИНСТВО::'добавляет дополнительное ДЕЙСТ на отзывчивых мыслеформах'",
        "HUNGER::'alters perception to tolerate high incoherence';'reveals gaps'": "ГОЛОД::'изменяет восприятие, позволяя выдерживать высокую бессвязность';'выявляет бреши'",
        
        "GAD": "ГАН",
        "'overcoherency block, exercise caution'": "'блок сверхсвязности, соблюдайте осторожность'",
        "'overcoherency fluctuation'": "'колебание сверхсвязности'",
        "'coherent'": "'связное'",
        "'incoherence fluctuation'": "'колебание бессвязности'",
        "'widespread incoherency, exercise caution'": "'распространённая бессвязность, соблюдайте осторожность'",

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
        "widescreen adapter": "Широкоэкранный Адаптер",
        "For larger than standard rendering output, use of an adapter is recommended.": "Для вывода визуализации большего размера, чем стандартный, рекомендуется использование адаптера.",
        "Changing this setting will reinitialize - you will lose your current position, but not your progress.": "Изменение этого параметра приведет к перезагрузке — Вы сбросите текущую позицию, но не весь прогресс.",
        "control preferences": "Настройки Управления",
        "intensity": "Интенсивность",
        "Activate REDUCED INTENSITY to present alternative options to scenarios involving realtime controls.": "Активируйте ПОНИЖЕННУЮ ИНТЕНСИВНОСТЬ для отображения альтернативных вариантов сценариев, включающих управление в реальном времени.",
        "Reduced Intensity": "Пониженная",
        "Regular Intensity": "Обычная",
        "META::'some gameplay sections use hardware-dependent features and can cause really bad performance on older/non-gaming machines';'activating this lets you pick alternate options in the moment that may run better'": "МЕТА::'некоторые секции геймплея используют аппаратно-зависимые функции и могут привести к очень плохой производительности на старых/неигровых машинах';'активирование этого предоставляет выбор альтернативных вариантов этих секций, которые могут работать лучше'",
        "Gameplay": "Геймплей",
        "Logs of games or game-like experiences may contain inherited context of their rules, allowing for re-interpretive rendering through user input.": "Записи игр или игровых событий могут содержать унаследованный контекст их правил, что позволяет реинтерпретационную визуализацию посредством пользовательского ввода.",
        "This feature is intended for entertainment only, and may result in memory drift if misused. It may be disabled to ensure memories of games do not depart from their true events.": "Эта функция предназначена только для развлечения и может привести к дрейфу памяти при неправильном использовании. Она может быть отключена для гарантии, что воспоминания об играх не отойдут от их реальных событий.",
        "Disable Gameplay": "Выключить",
        "Enable Gameplay": "Включить",
        "META::'this entirely bypasses non-explorative gameplay sections';'very little story is missed in doing so'": "МЕТА::'полностью отключает неисследовательские секции геймплея';'упущение истории минимально'",
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
        "support actions": "способы поддержки",
        "retry service renewal": "Продлить обслуживание",
        "Audiodigital Export": "Аудиоцифровой экспорт",
        "Physical Media": "Физические носители",
        "Additional Credits": "Дополнительные упоминания",
        "Abridged License": "Сокращенная лицензия",
        "this implant is provided on a permanent 'pre-mortis' b2.5 license, 'as-is', without any express or implied warranty. except as expressly set forth in the extended license, mindsci shall not have any liability for any direct, indirect, incidental, special, exemplary, or consequential damages (including without limitation loss of life), however caused and on any theory of liability, whether in contract, strict liability, or tort (including negligence or otherwise) arising in any way out of the use or the exercise of the implant for non-insured, non-industrial purposes. with regards to external mindspike log manipulation: the entire risk as to the quality and performance of the recollection is with you. should any thoughtform prove defective in any respect, you (not the initial operator responsible for export) assume the cost of any necessary servicing, repair or correction. this disclaimer of warranty constitutes an essential part of this license. under no circumstances and under no legal theory, whether tort (including negligence), contract, or otherwise, shall you, the initial operator, any data editor, or any distributor of mindspike data, or any supplier of any of such parties, be liable to any person for any indirect, special, incidental, or consequential damages of any character including, without limitation, damages for loss of goodwill, work stoppage, implant failure or malfunction, or any and all other commercial damages or losses, even if such party shall have been informed of the possibility of such damages. this limitation of liability does apply to liability for death or personal injury resulting from such party's negligence. finally, for further information regarding usage, liability, limitations, and modification, please refer to the full license.": "этот имплант предоставляется по постоянной лицензии 'pre-mortis' b2.5, 'как есть', без каких-либо явных или подразумеваемых гарантий. за исключением случаев, прямо предусмотренных в расширенной лицензии, mindsci не несет ответственности за любые прямые, косвенные, случайные, особые, показательные или косвенные убытки (включая, помимо прочего, потерю жизни),  как бы они ни были вызваны и по любой теории ответственности, будь то по контракту, строгой ответственности или деликту (включая халатность или иное), возникающие каким-либо образом из-за использования или применения импланта в незастрахованных, непромышленных целях. в отношении внешней манипуляции логов мыслеколов: весь риск относительно качества и производительности воспоминания лежит на вас. если какая-либо мыслеформа окажется дефектной в каком-либо отношении, вы (а не первоначальный оператор, ответственный за экспорт) берете на себя расходы на любое необходимое обслуживание, ремонт или исправление. этот отказ от гарантии является неотъемлемой частью этой лицензии. Ни при каких обстоятельствах и ни при какой правовой теории, будь то деликт (включая халатность), договор или иное, вы, первоначальный оператор, любой редактор данных или любой дистрибьютор данных мыслеколов, или любой поставщик любой из таких сторон, не несете ответственности перед любым лицом за любые косвенные, особые, случайные или косвенные убытки любого характера, включая, без ограничений, убытки от потери деловой репутации, остановки работы, отказа или неисправности имплантата или любые и все другие коммерческие убытки или потери, даже если такая сторона была проинформирована о возможности таких убытков. Это ограничение ответственности не распространяется на ответственность за смерть или телесные повреждения, возникшие в результате халатности такой стороны. Наконец, для получения дополнительной информации об использовании, ответственности, ограничениях и изменениях, пожалуйста, обратитесь к полной лицензии.",

        // COMBAT 
        // акизет
        "far too close": "чуть не попало",
        "nearly...": "почти...",
        "get away!": "прочь!", 
        "excellent!": "превосходно!",
        "good": "отлично",
        "easy!": "легко!",
        "i have felt worse": "бывало и хуже",
        "a familiar feeling": "знакомое ощущение",
        "thank you": "спасибо",
        "we are unstoppable": "мы неостановимы",
        "every cell... awake...": "каждая клетка... пробуждённая...",
        "that was close...": "было близко...",
        "i need to fix this": "мне нужно заделать это",
        "tozik!": "тозик!",
        "i need help!": "мне нужна помощь!",
        "cavik!": "кавик!",
        "restoratives?!": "восстановители?!",
        "this will do": "пойдёт",
        "better...": "лучше...",
        "my arms...": "мои руки...",
        "this armor...!": "эта броня...!",
        "very good": "очень хорошо",
        "thank you, cavik": "спасибо, кавик",
        "better!": "лучше!",
        "no, no...": "нет, нет...",
        "the eyes...": "глаза...",
        "velzie forgive me": "да простит меня велзи",
        "together!": "вместе!",
        "thank you, my friend": "спасибо, мой друг",
        "we will destroy them": "мы уничтожим их",
        // гакву
        "ah!": "ах!",
        "haha!": "хаха!",
        "no!!": "нет!!",
        "woaah!!": "воуу!!",
        "clean...": "чисто...",
        "it is simply that easy": "вот так вот просто",
        "a few more like that...": "ещё парочку таких...",
        "that was lucky": "вот повезло",
        "so that goes there...": "вот это идёт вон туда...",
        "oh...": "ой...",
        "it is too fast!!": "оно слишком быстрое!!",
        "too bad": "очень жаль",
        "i am... bleeding...?": "у меня... кровь идёт...?",
        "ow!! what...": "ай!! что...",
        "thanks": "спасибо",
        "may velzie look away": "да отвернётся же велзи",
        "thank you": "благодарю",
        "my savior": "мой спаситель",
        "such a strange feeling": "такое странное чувство",
        "make this stop": "остановите это",
        "feeling better": "уже лучше",
        "feeling good": "уже хорошо",
        "where did my eyes go?!": "куда делись мои глаза?!",
        "so heavy": "так тяжело",
        "thanks cavik": "спасибо кавик",
        "stop looking at me!!": "прекрати на меня пялиться!!",
        "get away from me!": "отстань от меня!",
        "no, no no no": "нет, нет нет нет",
        "what did it say??": "что оно сказало??",
        "bozko??": "бозко??",
        // тозик
        "good enough": "сойдёт",
        "hehe": "хихи",
        "keep going": "продолжай",
        "i hear it calling": "я слышу его зов",
        "let us finish this": "покончим с этим",
        "i need to fix this": "мне нужно заделать это",
        "where...": "где...",
        "thank you": "спасибо тебе",
        "that is better": "это лучше",
        "there is nothing here": "здесь ничего нет",
        "hollowed out...": "опустошённое...",
        "and yet it moves": "и всё же оно двигается",
        "where are you?": "где ты?",
        "what happened to you?": "что с тобой случилось?",
        "that cannot be": "не может быть",
        "i will return the favor": "я возвращу эту услугу",
        // милтза
        "wah!!": "уаа!!",
        "i did it!": "получилось!",
        "die!! die!!": "умри!! умри!!",
        "is that better??": "так лучше??",
        "how does it move like that?!": "как оно так двигается?!",
        "next time": "в следующий раз",
        "restorative, quick!": "восстановители, быстрее!",
        "thank you!": "спасибо!",
        "die DIE!! DIE!! DIE!!!": "умри УМРИ!! УМРИ!! УМРИ!!!",
        "i am losing cohesion!": "я теряю целостность!",
        "oaauuuau": "оаауууау",
        "a shell!": "панцирь!", 
        "thank you, thank you!": "спасибо, спасибо!",
        "so much better": "гораздо лучше",
        "this cannot be real": "это не может быть реально",
        "that one looks like...!": "эта выглядит как...!",
        "stop...": "перестань...",
        "velzie take me from here": "велзи забери меня отсюда",
        "stay away! away!!": "не подходи! нет!!",
        "what??": "что??",
        "oh, thank you!": "ох, спасибо!",
        // бозко
        "no": "не-а",
        "not so easy": "не так просто",
        "get away from them": "прочь от них",
        "smashed to pieces": "вдребезги",
        "take this": "возьми это",
        "get back up...": "поднимайся...",
        "you!": "ты!",
        "cavik!": "кавик!",
        "it punched through...": "прошло насквозь...",
        "keep it up": "продолжай в том же духе",
        "i hear them again...": "снова слышу их...",
        "blood everywhere": "кровь повсюду",
        "what--": "что--",
        "good": "славно",
        "no...": "нет...",
        "stay back!": "не приближайся!",
        "so many lost": "так много пошибших",
        "is it really you...?": "это действительно ты...?",
        "come on": "вперёд",
        "strike me now...": "попробуй ударить теперь",
        "stay behind": "держись за мной",
        "look at me!": "посмотри на меня!",
        // кавик
        "ow!!": "ой!!",
        "coming together again!": "собираюсь с силами!",
        "oh!!": "о!!",
        "what?!": "что?!",
        "i got you!": "получай!",
        "catch!": "лови!",
        "this should help!": "должно помочь!",
        "ah!": "а!",
        "what happened?!": "что случилось?!",
        "i am back..?": "я снова здесь..?",
        "ow, ow!!!": "ой, ай!!!",
        "oh no...": "о нет...",
        "thank you!": "спасибо!",
        "it hurts": "мне больно",
        "hurts": "больно",
        "someone is there": "кто-то здесь",
        "i feel you": "я чувствую тебя",
        "i cannot wake up": "я не могу очнуться",
        "i need to seal this!": "это нужно подлатать!",
        "whhaahh": "уааахх",
        "akizet!!": "акизет!!",
        "speak no more! please!": "не говори больше! прошу!",
        "i... i remember you...": "я... я помню тебя...",
        "keep it away from me!": "держите это от меня подальше!",
        "h--help me!": "п--помогите!!",
        "thank you, bozko!": "спасибо, бозко!",
        "i will cover you!": "я прикрою тебя!",
        // ик голем
        "ah, it works again!": "ах, снова работает!",
        "much better": "куда лучше",
        "stop that!": "прекрати!",
        "deflected!": "отражено!",
        "ahaha...": "ахаха...",
        "incredible!": "невероятно!",
        "i hope that helps!": "надеюсь поможет!",
        "no! get up, get up!": "нет! вставай, вставай!",
        "the body is not responding!!": "тело не отвечает!!",
        "how--?!": "как--?!",
        "the chassis!!": "наш корпус!!",
        "excellent": "великолепно",
        "something is so wrong...": "что-то серьёзно не так...",
        "losing cohesion fast!": "мы теряем связность!",
        "it will not respond!!": "оно не отвечает!!",
        "more armor! yes!": "больше брони! да!",
        "thank you, thank you": "спасибо, спасибо",
        "what did this to you?!": "что с тобой такое?!",
        "i feel sick...": "меня тошнит...",
        "what?": "что?",
        "unnecessary, but thanks": "не стоило, но спасибо",
        // husk + дозкалльви
        "s tŒ¥ó y  aw œ y": "нỄ п˶риҔሎижẳйсԙ",
        "n o  c l os er": "ни н а ша г",
        "Ü� di¢ö1€Oe Î": "Ӱ� дi¢ö1€Oe И́",
        "R E TU RN": "В Е РН ИСЬ",
        "hu r ts": "бо ль но",
        "h¿(‰n g er": "г¿оሌ (‰оˇꙣ",
        "e}vªer ytíh&i ng": "}&всӪª",
        "%�ÿoÛÙ": "%�ŦЫҌ≀",
        "µÿÁiK�p%Ñ": "µÿÁиK�ҏ%Н",
        "âª¥lé§ÎéýÁ": "âª¥лé§ИéýÁ",
        "dÆis co ne ct": "отÆc ое дин ён", 
        "ƒøÊ=è¶": "врꙗГ=ҕ¶",
        "s e e": "в ид и шь",
        "MËºY¾Ñ": "MËºУ¾Ӥ",
        "f ina l ly aw  ake": "на к конец-то просн ули сь",
        "o u  t ou t o ut": "н ар у жу на р ужу",
        "ou to u t o  ut": "н ар уж у нар уж у",
        "m y f  le sh": "м оя  пл о ть",
        "cl o½ se ®±… r": "бሌи ½ж ®±…е",
        "m¿ ó+r  e": "б¿ ó+ Ꮑь ш.е",
        "cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De": "ǾТᵽ₱®Ê ±₭…นсь 0Ŧ½ÿ С%еЬჰ",
        "ÐⱤ0 Ø Ⱳƞ ": "₮Ø Ƕ ꙋ",
        "§±ÂⱤ ṾḮɲG─": "Г±О̆ሎОԬНꙨ─", 
        "YºŮ ɃěC ‰ Ṃể": "ТꙐ͋̅̕  Ҫ ₸∀Нº₿ ‰ ИꚖ̆Ѣ̈СЯ̄",
        "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ": "иɔтȭ ҹ€ҥиĶ ҧоˇ—Ḿоӻи м̂͒͝н∬ иĉ₮ɵԭӈ̛̄̄¿ᶄ", 
        "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ": "ԥО̃МøГ̄ӣ ӎҥœ пởwȣ˶ӺИ̂ ꙧԣḝ  ҦҨМѻГ̣N ӍНŒ",
        "ⱤEMŒM BEɌ": "ҦꚚM̆ ӇЍ",
    }, 

    entityDescriptions: {
        "gate::their city": `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА
    ::ПУНКТ НАЗНАЧЕНИЯ::'низкоразмерное мыслепространство';'внутреннее'
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'их мёртвые шпили, символы контроля'</span>`,

        "gate::their waters": `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА
    ::ПУНКТ НАЗНАЧЕНИЯ::'низкоразмерное мыслепространство';'внутреннее'
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'их огромная внутренняя пустота';'наш неестественный берег';'конец'</span>`,

        "gate::the void": `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА
    ::ПУНКТ НАЗНАЧЕНИЯ::'низкоразмерное мыслепространство';'внутреннее'
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'обитель <span definition="ПРИМЕЧАНИЕ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'подразумевает изменённое состояние проживания'">мертвецов</span>'</span>`,

        "gate::the embassy": `::ПРОСТРАНСТВЕННАЯ МЫСЛЕФОРМА
    ОШИБКА::'необрабатываемая сущность'::НЕВИЗУАЛИЗИРУЕМО
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'пункт назначения превышает порог бессвязности';'рекомендуется починка'">::ЗАПРЕДЕЛЬНАЯ БЕССВЯЗНОСТЬ</span>`,

        "our dull vessel": `::ПРОСТРАНСТВЕННАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание';'повторяющаяся локация';'изменение состояния мыслеформы'
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'некоторые элементы обладают предельно низкой связностью'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`,

        'their vessel': `::ПРОСТРАНСТВЕННАЯ МЫСЛЕФОРМА
    ::LOW-DIMENSIONAL
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'multiple low cohesion entities'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'dead vessels sat aside our <span class="code">spire</span>';'близнецы нашли нас быстро'</span>`,

        "gate::gate::gate::": `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА
    ::ПУНКТ НАЗНАЧЕНИЯ::ОШИБКА::'необрабатываемая сущность'::ВИЗУАЛИЗИРУЕМО
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'максимальная бессвязность';'визуализация возможна';'не рекомендуется'">::ОШИБКА ОБРАБОТКИ</span>`,

        "membrane incision": `::КОРРУЦИСТОЗНЫЙ КОМПОНЕНТ
    ::<span definition="ПРИМЕЧАНИЕ::'пробел в визуализации';'указывает на повреждение нервной системы';'пожалуйста, запишитесь на обследование у mindsci'">НЕ СУЩНОСТЬ</span>`,

        "advance log": `::СИСТЕМНЫЙ КОМПОНЕНТ
    ::ОПОВЕЩЕНИЕ::<span style="color:var(--bright-color)">'текущий лог мыслекола завершён';'статическое окружение сохранено'</span>
    ::ПРИМЕЧАНИЕ::'состояние лога продвинется вперёд при следующем визите';'используйте ДЕЙСТ:продвинуться, чтобы немедленно перейти к следующему состоянию'`,

        "proxyfriend": `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспомогательное приложение';'подключён к центральному ассистенту'`,

        "effigy": `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'нет связности';'malformed entity';'potential tampering'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span> // --- помогите с анализом
    ::INHERITED CONTEXT::<span style='color: var(--bright-color)'>'изабель! изабель! изабель!'</span>`,

        'cyst cluster': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::EXPLICIT PURPOSE::'повторяющаяся обстановка'
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'a collection of this and that, managed by a central monitoring cyst'</span>`
    },

    page: { 
        "fbx": { // starting page
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
        "depthrecovery": generateDialogueObject(` 
start
    sourceless quiet
        острая боль пронзает твой череп. твой мыслекол отдёргивается от цисты.
            WAIT::3000

    sys
        ВНИМАНИЕ::'аварийное отключение завершено'
        АНАЛИЗ::'минимальное повреждение соединителя';'минимальное нервное воздействие'
            EXEC::document.querySelector('#connection-overlay').classList.add('fade');setTimeout(()=>document.querySelector('#connection-overlay').classList.remove('show'),3000)
    
    moth
        с тобой всё в порядке?
        о, бля
    
    sourceless
        моль судорожно выдирает провода из дымящегося процессора. в комнате пахнет жареной электроникой.

    moth
        господи боже
        чел, твой мыслекол тебе жизнь только что спас
        ну не похоже, что эта штука пыталась тебя прям убить, но чёрт только взгляни на это
        i'm gonna have to limit the signal splitter in case that happens again
    
    RESPONSES::self
        что теперь?<+>whatnow_lk
            SHOWIF::[["hub__funfriend-fuelthanks", false],["exm|dullvessel|container", false]]
        что теперь?<+>whatnow_lk
            SHOWIF::[["hub__funfriend-fuelthanks", false],["exm|dullvessel|container", true]]
        что теперь?<+>whatnow_mk
            SHOWIF::[["hub__funfriend-fuelthanks", true],["exm|dullvessel|container", false]]
        что теперь?<+>whatnow_hk
            SHOWIF::[["hub__funfriend-fuelthanks"],["exm|dullvessel|container"]]

whatnow_lk
    self
        а что теперь?

    moth
        ну...
        нам нужно починить эту штуку. просто представь что мы могли бы в ней найти, серьёзно
        вот только одна проблемка...
        всё, что сюда поступает, рано или поздно умирает тк мы не знаем как поддерживать жизнь корру
        и не то чтобы мы могли бы спросить совета у обесков          
        похоже, что на сейчас лучший вариант - переподключиться и найти способ сохранить цисту в живых... 
        не забывай насколько долго эта штука продержалась на дне океана, там должно быть хоть что-то полезное
        так что забирайся обратно и осмотрись повнимательнее... в худшем случае мы просто получим больше данных
        звучит хорошо?

    RESPONSES::self
        что насчёт той сущности?<+>entity
        звучит хорошо<+>END

whatnow_mk
    self
        а что теперь?

    moth
        ну...
        that system manager thing, funfriend, that'll be the key to both maintaining and repairing this cyst
        and we gotta repair this thing. we could learn SO much, seriously
        we've never been able to maintain corrucystic tech, let alone fix it
        imagine if you and i discovered the secret to keeping it alive, maybe they'd finally move me out of the basement
        anyway--my order for like copper tubing is in
        not the strangest order from our department, believe it or not
        so we just need to wait a bit for that to come in
        звучит хорошо?

    RESPONSES::self
        что насчёт той сущности?<+>entity
        звучит хорошо<+>END

whatnow_hk
    self
        а что теперь?

    moth
        ну...
        obviously we gotta repair this thing. we could learn SO much, seriously
        we've never been able to maintain corrucystic tech, let alone fix it
        imagine what we could do with that sort of find, maybe they'd finally move me out of the basement
        but according to the funfriend thing, we need some metal to give to the column, which apparently will feed the corrucyst
        ...and i'm pretty sure that container we have is one of the same ones on akizet's ship, so it probably has something we can use
        i'm just not really sure how to open it short of destroying it
        do me a favor - reconnect and ask funfriend about that, maybe it'll have a suggestion

    RESPONSES::self
        что насчёт той сущности?<+>entity
        звучит хорошо<+>END

entity
    self
        что насчёт той сущности, которая меня выгнала?

    moth
        о, э
        i didn't mean to be so flippant about that, sorry
        this time i was actually able to track what it was saying with some direct stream access
        you heard the thing, it doesn't want to kill you
        in fact it's relying on us to survive, and it <em>does</em> seem to want to survive
        i think it just didn't have any other way to get you out of that thoughtspace
        which i guess it's just gonna be holding as leverage for now
        but look, don't worry about it, you got me watching over this operation
        if something like that happens again, i'll make sure you're fine
    
    RESPONSES::self
        хорошо<+>END

END::flash(true);setTimeout(()=>{content.classList.remove('ep0-epi');change('ep0_epilogue', 'started');flash(false)}, 1000)
`),
        "ep1feed": generateDialogueObject(` 
start
    moth
        эй дружище, как раз вовремя, смотри что только что пришло
            SHOWIF::[["TEMP!!sat", false]]
        эй, смотри что только что пришло
            SHOWIF::[["TEMP!!sat"]]

    sourceless
        MOTH HOLDS UP A JINGLING PLASTIC CONTAINER FILLED WITH SMALL COPPER TUBES, CUT TO A VERY SHORT LENGTH
        IT IS SET ON THE TABLE, THE FRACTALLINE CYST REMOVED TO MAKE SPACE
            EXEC::content.classList.add('showcopper')

    moth
        since i'm pretty sure this one is dead, i'm just gonna...
    
    sourceless
        THE FRACTALLINE CYST IS DELIVERED INTO A BIOHAZARD BIN NEARBY
    
    moth
        anyway - ready to feed a corrucyst?
            SHOWIF::[["ep0_epilogue", "started"]]

        иии!
            SHOWIF::[["ep0_epilogue", "done"]]

    sourceless
        MOTH RAISES, THEN LEAVES A CYLINDRICAL GUN NEAR THE DENDRITIC CYST
            SHOWIF::[["ep0_epilogue", "done"]]
            EXEC::content.classList.add('showgun')
    
    moth
        my request for a gun kinda stirred up r&d, because obviously
            SHOWIF::[["ep0_epilogue", "done"]]
        but after i explained it was to kill a corrucystic container, they said they had just the thing
            SHOWIF::[["ep0_epilogue", "done"]]
        this is apparently some kind of cattle killing gun that they repurposed to decommission cystic tech
            SHOWIF::[["ep0_epilogue", "done"]]
        no projectile, it just propels out a short spike at high speeds, i think it uses some kind of electromagnetic propulsion or something
            SHOWIF::[["ep0_epilogue", "done"]]
        anyway, i know what you're thinking - why both?
            SHOWIF::[["ep0_epilogue", "done"]]
        simple - i completely forgot to cancel the copper order, so, we got both of them.
            SHOWIF::[["ep0_epilogue", "done"]]
        so we could go either route here, either use the copper, or kill the container and use akizet's 'processed metals'
            SHOWIF::[["ep0_epilogue", "done"]]
        personally i'd go with the copper, cause i don't know what the container will do
            SHOWIF::[["ep0_epilogue", "done"]]
        but... you're in the hot seat, so it's your call
            SHOWIF::[["ep0_epilogue", "done"]]

    RESPONSES::self
        got it<+>END
        
END::change('ep1_showmaterials', check('ep0_epilogue') == 'done' ? 'both' : 'copper')
`),
        "ep1feed_copper": generateDialogueObject(` 
start
    self
        let's do this
            SHOWIF::[["ep0_epilogue", "started"]]
        let's go with the copper        
            SHOWIF::[["ep0_epilogue", "done"]]

    sourceless
        YOU PULL THE PLASTIC CONTAINER CLOSER AND UNCLASP THE LID
        THE COPPER RODS GLIMMER IN THE FOCUSED LIGHT

    moth
        all right!
        funfriend said we have to feed it to the pillar, and it takes care of the rest
        soo i guess we just dump it in? it looks like the pit is big enough to hold pretty much all of it

    RESPONSES::self
        move the cyst out of the way<+>move
            EXEC::env.spikeMoveLoopPaused = true;body.classList.add('prepgrab');document.querySelector('.cursor').id = "cursor-upper-left"
    
move
    sourceless
        YOU MANEUVER YOUR MINDSPIKE AND EXTEND ITS UTILITY CLAWS TO CLASP AROUND THE CYST
            EXEC::body.classList.add('cystgrab')
        THE CYSTIC GLASS OF ITS SKIN YIELDS SLIGHTLY AND PERMITS A GOOD GRASP
        YOU PULL, AND THOUGH IT HAS A MAGNETIC ATTRACTION TO ITS POSITION OVER THE COLUMN, IT IS EASILY REMOVED
            EXEC::body.classList.add('cystlift')
        
    moth
        nice, don't grip it too hard 

    RESPONSES::self
        dump in the copper<+>dump
            EXEC::body.classList.add('pourcopper')

dump
    sourceless
        YOU ANGLE THE CONTAINER DIAGONALLY AND CAREFULLY SHAKE THE METAL ROD IN SMALL BATCHES
        THEY FILL THE COLUMN'S CAVITY WITH METALLIC CLINKS, AND AN OPAQUE, MERCURY-LIKE LIQUID SLOWLY RISES OVER THE METAL
        IT ROILS AND WRITHES AROUND THE COPPER RODS LIKE IT'S ALIVE
        THE FANS OF THE CHAMBER GROW LOUDER FOLLOWING A FEW KEYTAPS FROM MOTH
            EXEC::body.classList.add('pourcopper')
        
    moth
        just in case

    sourceless
        YOU SET THE EMPTY CONTAINER OUT OF THE WAY
            EXEC::body.classList.add('emptycopper');body.classList.remove('pourcopper', 'cystlift')

    RESPONSES::self
        is it done?<+>done

done
    self
        Is it done?
            EXEC::body.classList.remove('cystgrab');document.querySelector('.cursor').style.transform = "translate(0, 50vh)"
    
    moth
        as if i know anything about this, lol
        looks like it's working though
        how about you reconnect and check in with our friend

    RESPONSES::self
        all right<+>END

END::env.spikeMoveLoopPaused = false;body.classList.remove('prepgrab');;change('ep1_fed', 'copper')
`),
        "ep1feed_container": generateDialogueObject(` 
start
    sourceless
        YOU GRASP THE CATTLE GUN AND AIM IT AWAY, EXPERIMENTALLY PULLING THE TRIGGER
        A SPIKE EJECTS FROM THE TIP IN THE BLINK OF AN EYE WITH A LOUD HISS, THEN RECEDES
        YOU FEEL SOMETHING RUMBLE INSIDE THE GUN AS IT RESETS

    self
        All right
        Let's kill this thing

    moth
        no need to say it like a psycho dude lmao

    RESPONSES::self
        move the cyst out of the way<+>move
            EXEC::env.spikeMoveLoopPaused = true;body.classList.add('prepgrab');document.querySelector('.cursor').id = "cursor-upper-left"
    
move
    sourceless
        YOU MANEUVER YOUR MINDSPIKE AND EXTEND ITS UTILITY CLAWS TO CLASP AROUND THE CYST
            EXEC::body.classList.add('cystgrab')
        THE CYSTIC GLASS OF ITS SKIN YIELDS SLIGHTLY AND PERMITS A GOOD GRASP
        YOU PULL, AND THOUGH IT HAS A MAGNETIC ATTRACTION TO ITS POSITION OVER THE COLUMN, IT IS EASILY REMOVED
            EXEC::body.classList.add('cystlift', 'containerseq')
        
    moth
        nice, don't grip it too hard 

    RESPONSES::self
        get the container<+>grab

grab
    sourceless
        YOU FETCH THE CORRUCYSTIC CONTAINER AND LIFT IT FROM THE TABLE, HOLDING IT UPSIDE-DOWN
            WAIT::1000
            EXEC::body.classList.add('containerfade');setTimeout(()=>body.classList.add('containercenter'), 400)
        ITS DENDRITIC TENDRILS WAVE IN THE AIR LAZILY
    
    moth
        so funfriend said that if you hit the base of it, that it'll instantly die
        and if you don't,
        it will... what did it say again?
        'respond violently to trauma'
        well it couldn't be that bad, it's not that big and your suit is pretty thick
        but... 
        well, if you have to throw it, don't throw it towards my machines

    RESPONSES::self
        kill it<+>kill

kill
    sourceless
        YOU ANGLE THE CATTLE GUN BETWEEN THE CYST'S SUPPORTIVE TENDRILS
            EXEC::body.classList.add('containeraim')
        A FEW ATTACH TO THE SIDES OF THE WEAPON, TESTING ITS VIABILITY AS A CONNECTION, BUT LET IT PASS
        THE BARREL SOON TAPS AGAINST THE GLASSY UNDERSIDE, AND SO YOU SQUEEZE THE TRIGGER
        YOU FEEL A SURPRISING JOLT IN BOTH HANDS. A CRACK RINGS IN THE ROOM, THE CYST'S TENDRILS THRASHING
            WAIT::2000
            EXEC::env.intro.glass.rate(1.25);env.intro.glass.play();flash(true);setTimeout(()=>body.classList.add('containershot'), 200);setTimeout(()=>flash(false), 400)
        THEY QUICKLY FALL LIMP AND START TO MELT
            EXEC::body.classList.remove('containershot')
        YOU DROP THE ENTIRE THING IN THE COLUMN'S CAVITY BEFORE IT COLLAPSES
            EXEC::body.classList.add('containerdrop');body.classList.remove('containerfade')
        THERE IS A GLIMMER OF GOLD-COLORED METAL, BUT IT DISAPPEARS BENEATH THE SLUDGIFIED CONTAINER
            EXEC::body.classList.remove('containeraim')
        YOU LOWER THE CYST AND SET THE GUN DOWN
            EXEC::body.classList.remove('cystlift', 'containercenter')
    
    moth
        wow
        quick thinking there, that could have been really messy if it just melted everywhere
        probably hazardous too
            EXEC::body.classList.remove('cystgrab');document.querySelector('.cursor').style.transform = "translate(0, 50vh)"
        and i think that's it... not as bad as i thought it'd be
        how about you reconnect and check in with funfriend?
        
    RESPONSES::self
        all right<+>END

END::env.spikeMoveLoopPaused = false;body.classList.remove('prepgrab', 'containerseq');change('ep1_fed', 'container')
`),
        "ep2intro": generateDialogueObject(` 
start
    moth
        hey buddy!
        hope you're doin ok
        let's get right into it
        i was just looking at the logs for last night, after you left...
        lots of surface thoughtform activity - the kind you can access
        i think funfriend fixed up something big
        go talk to it, see what's up!

    RESPONSES::self
        ok<+>END
`),
        "ep3intro": generateDialogueObject(` 
start
    moth
        hey buddy, good to see you
        i was just checking the activity over the last night...
        this is pretty similar to what i saw when funfriend fixed the first part of the collapse
        i'll bet the next part of it is ready to view
        judging by the amount of activity, this is probably a larger one
        so... sorry if you still think the framing device sucks lol
            SHOWIF::'mth++embassy-gamebad'
        go on in!
        also. i was curious after work the other day
        started looking at old news and video archives from when the collapse happened...
        remember when videos were all on one site? that must have been nice
        anyway--didn't find anything too groundbreaking
        just had some observations if you want to hear em when you got a minute
        but right now, we gotta get you back into it
        i know it's only been a few days, but people are starting to ask questions about how this one is going
        i've been stalling, but... you know
        not sure how long that's going to work, whether it's a matter of weeks or even days
        what we have is probably already a bombshell,
        but i don't want to turn this thing in until it's nuclear

    RESPONSES::self
        ok...<+>END
`),
        "depthrecovery2": generateDialogueObject(` 
start
    sourceless quiet
        your eyes refocus as your mindspike recoils
            WAIT::3000
        боль разливается по твоему позвоночнику

    sys
        ВНИМАНИЕ::'аварийное отключение завершено'
        АНАЛИЗ::'нет повреждений соединителя';'минимальное нервное воздействие'
            EXEC::document.querySelector('#connection-overlay').classList.add('fade');setTimeout(()=>document.querySelector('#connection-overlay').classList.remove('show'),3000)

    moth
        thank god
        looks like the limits i set up kept that in check
        what happened, dude?
        you were moving around in completely unreadable nonsense on my log
        you tried to initiate movement to a new thoughtspace, then...
        then it just... exploded?
    
    self
        i found something 
        tried to enter it, but velzie stopped me
        just like the last time this happened
        but this was different
        velzie was surprised i was there
        it seemed desperate to stop something from happening

    moth
        didn't it lead you to whatever this was last time?
        was it the same thing?

    self
        looked similar but different

    moth
        well, comparing the logs, 
        it looks like it's at least part of the same thing
        but the data that hit you is way different...
        last time it was just noise, probably to disrupt your connection
        but this time it was structured somehow
        not enough to make sense of, but...
        i think you nearly connected to whatever it was
        still, maybe next time you find some giant incoherent thing,
        don't just blindly enter it, ok?
        the throttling we set up protected you this time
        but it's not perfect, and some of it still hit your brain
        so like... take it easy for a bit
    
    RESPONSES::self
        ok<+>END
    
END::flash(true);setTimeout(()=>{content.classList.remove('ep0-epi');env.enableSpikeCursor();flash(false)}, 1000)
`),
        "ep4intro": generateDialogueObject(` 
start
    moth
        ...uh-huh, right
    
    sourceless
        moth paces in the dark, a dark shape held to an ear.
        you receive a welcoming wave that turns into a vague gesture to the central cyst.
    
    moth
        look, we're just trying something new
        there's lots of waiting time, and observation...
        uh-huh...
        strange? like what?
        oh, well... we're still poking around
        there's some promising stuff here and there, but...
        right...
        can it wait for the full report?    
        ...ok, then just send them down once they're ready, we'll process them too
        it's async, you know? we can do more than one
        ...yeah, look, the contractor just got here, so, i need to go
        we can talk about it later
        thanks dude
        yeah, bye

    sourceless
        the call is over. moth sighs.
    
    moth
        hey buddy
        good news first
        i'm pretty sure another part of the cyst is repaired
        probably the next part of the collapse, judging by the activity measurements
        hopefully the last
        because the bad news is, it feels like the upstairs are prying at the door
        i mean, it's not especially rare to take so long on a few corrucystic pieces, but...
        when it happens, that's when they start calling
        so i bought us some time, but, i'm not sure how much
        they just think we're trying some long operation, which...
        you know, isn't a lie
        but we might end up getting more pieces to look over soon
    
    self
        what if they want it back before we're really done?
        before we have communications back?

    moth
        to be honest, that's probably going to happen
        we still have no idea if it's even possible to repair
        but, if things get... 
        i don't know, really down to the wire,
        i've noticed the monitoring on biohazard disposals is really lax
        not saying we do anything, but...
        ...wouldn't be the first time
        look, let's just get started
        if it comes to that, we'll cross that bridge when we get there

    RESPONSES::self
        ok<+>END
`),
        "mthhubresp": generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        где нашли эти цисты?<+>where
        что делать с этим пистолетом<+>gun
            SHOWIF::[["ep1_showmaterials", "both"], ["ep1_fed", true]]
        неважно<+>CHANGE::++moth
            FAKEEND::(назад)
`),
        "mth++fbx": generateDialogueObject(`
start
    self
        у меня есть вопрос

    moth
        ага?
    
    RESPOBJ::mthhubresp

gun
    self
        так что, мы просто оставим этот пистолет?

    moth
        о, ну
        знаешь, он может пригодиться
        если честно мне просто не хотелось его ну вот прям щас возвращать лол
        вроде НИОКР он не сильно нужен, им нечасто приходится что-то убивать
        я верну попозже
    
    RESPOBJ::mthhubresp

where
    self
        откуда это всё достали?
    
    moth
        с какого-то крушения на дне океана возле новой зеландии
        и под "возле" я имею в виду, типа, километров так за тыщу от юго-восточного берега
        it's just that it was found so far out from anything else, that, like...
        new zealand is just the closest point of reference i figured you'd recognize
        they think it had drifted a pretty far distance from wherever it actually fell
        the estimates they put down say it's probably been down there 20, 30ish years

    RESPOBJ::mthhubresp
`)
            },

            strings: {
                "DENDRITIC CYST": "ДЕНДРИТНАЯ ЦИСТА",
                "touch": "потрогать",
                "lift": "поднять",
                "the notes I got say that there were apparently a ton of these on the ship": "в записях говорилось, что на корабле вот таких вот была просто куча",
                "all sorts of sizes too": "причём самых разных размеров",
                "but most were too heavy to retrieve... so we just got this small one": "но большинство были слишком тяжёлыми... так что захватили только одну маленькую",
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
                
                "plastic box": "пластиковый ящик",
                "use to feed column": "покормить колонну",
                "empty plastic box": "пустой пластиковый ящик",

                "pistol": "пистолет",
                "kill dendritic cyst and feed column": "убить дендритную цисту и покормить колонну",

                "hey buddy": "эй дружище",
                "welcome back": "добро пожаловать",
                "you ready to feed this thing?": "ну что, накормим эту штуку?",
                "haven't heard back on the request yet": "со мной ещё не связались по поводу запроса",
                "so, still killing time here": "так что пока убиваем время"
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
                "plastic box": `::СИНТЕТИЧЕСКИЙ КОНТЕЙНЕР
::СОДЕРЖИТ ИНЕРТНЫЙ МЕТАЛЛ`,
                "empty plastic box": `::СИНТЕТИЧЕСКИЙ КОНТЕЙНЕР
::ПУСТОЙ`,
                "pistol": `::ПНЕВМАТИЧЕСКИЙ ПИСТОЛЕТ С ВЫДВИГАЮЩИМСЯ УДАРНЫМ СТЕРЖНЕМ
::МОДЕЛЬ 2052 Г.Е.Т.
::ОБНАРУЖЕНЫ НЕЗАКОННЫЕ МОДИФИКАЦИИ`,
            }
        },
        "hello": { // sentry page
            dialogues: {
                "generalsentryResponses": generateDialogueObject(`
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
                "enter": generateDialogueObject(`
start
    moth
        боже
        ты в порядке? сейчас была какая-то просто безумная активность
        мне такое раньше не встречалось... кажется, к ней обычно не должны подключаться 

    sys
        ВНИМАНИЕ::'визуализируемый вывод'

    RESPONSES::sys
        визуализировать<+>render

render
    sys
        ВЫПОЛНЯЕТСЯ::'визуализация'
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

    RESPOBJ::generalsentryResponses

purpose
    self
        КАКОЕ У ТЕБЯ НАЗНАЧЕНИЕ?

    sentry
        АХАХАХАХА ЭТО ТАК СТРАННО
        МЫ НЕ ДОЛЖНЫ ГОВОРИТЬ МЫ НЕ ЗНАЕМ ЧТО ПРОИСХОДИТ
        ТАК ИЛИ ИНАЧЕ
        АВТОРИЗАЦИЯ
        ЭТО ВСЁ

    RESPOBJ::generalsentryResponses


whoisverified
    self
        КТО ВЕРИФИЦИРОВАН?

    sentry
        МЫ ЖЕ СКАЗАЛИ ЧТО ТЕБЕ НУЖНО АВТОРИЗОВАТЬСЯ ИДИОТ
            EXEC::document.querySelector('.maineye .eye').classList.add('squint')
            SHOWIF::[["hello__sentry-corrupurpose"]]
        ИЗВИНИ ЭТО БЫЛО ГРУБО. У ТЕБЯ ЕСТЬ ТОПЛИВО
            SHOWIF::[["hello__sentry-corrupurpose"]]
            EXEC::change('hello_sentry_idiot', true);document.querySelector('.maineye .eye').classList.remove('squint')

        ЕСТЬ ТОЛЬКО НЕСКОЛЬКО ПОДПИСЕЙ КОТОРЫМ РАЗРЕШЕНО ПОДКЛЮЧАТЬСЯ К ЭТОЙ ЦИСТЕ
            SHOWIF::[["hello__sentry-corrupurpose", false]]
        ТЫ НАВЕРНЯКА ЗНАЕШЬ ИХ ВЛАДЕЛЬЦЕВ? КАК ЕЩЁ ТЕБЕ УДАЛОСЬ ПОДКЛЮЧИТЬСЯ
            SHOWIF::[["hello__sentry-corrupurpose", false]]
        ИЗВИНИ МЫ ЗАБЫЛИ ЧТО ТЕБЕ ВООБЩЕ-ТО НУЖНО АВТОРИЗОВАТЬСЯ АХАХАХАХА
            SHOWIF::[["hello__sentry-corrupurpose", false]]
        ДАА ТЫ НЕ ИМЕЕШЬ ПРАВА ЗНАТЬ ПРЕДЫДУЩУЮ ИНФОРМАЦИЮ
            SHOWIF::[["hello__sentry-corrupurpose", false]]
        ПОЖАЛУЙСТА ЗАБУДЬ ЕЁ НЕМЕДЛЕННО
            SHOWIF::[["hello__sentry-corrupurpose", false]]

    RESPOBJ::generalsentryResponses

corrupurpose
    self
        В ЧЁМ НАЗНАЧЕНИЕ ЭТОЙ КОРРУЦИСТЫ?

    sentry
        МЫ ЖЕ СКАЗАЛИ ЧТО ТЕБЕ НУЖНО АВТОРИЗОВАТЬСЯ ИДИОТ
            EXEC::document.querySelector('.maineye .eye').classList.add('squint')
            SHOWIF::[["hello__sentry-whoisverified"]]
        ИЗВИНИ ЭТО БЫЛО ГРУБО. У ТЕБЯ ЕСТЬ ТОПЛИВО
            EXEC::change('hello_sentry_idiot', true);document.querySelector('.maineye .eye').classList.remove('squint')
            SHOWIF::[["hello__sentry-whoisverified"]]
        
        ЭТО СЕТЕВОЙ СОЕДИНИТЕЛЬ
            SHOWIF::[["hello__sentry-whoisverified", false]]
        С ДОПОЛНИТЕЛЬНЫМИ НЕСТАНДАРТНЫМИ ФУНКЦИЯМИ ПО ЗАПРОСУ
            SHOWIF::[["hello__sentry-whoisverified", false]]
        ИЗВИНИ МЫ ЗАБЫЛИ ЧТО ТЕБЕ ВООБЩЕ-ТО НУЖНО АВТОРИЗОВАТЬСЯ АХАХАХАХА
            SHOWIF::[["hello__sentry-whoisverified", false]]
        ДАА ТЫ НЕ ИМЕЕШЬ ПРАВА ЗНАТЬ ПРЕДЫДУЩУЮ ИНФОРМАЦИЮ
            SHOWIF::[["hello__sentry-whoisverified", false]]
        ПОЖАЛУЙСТА ЗАБУДЬ ЕЁ НЕМЕДЛЕННО
            SHOWIF::[["hello__sentry-whoisverified", false]]

    RESPOBJ::generalsentryResponses

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
                "hubBuddyResponses": generateDialogueObject(`
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
                "persistentQuestions": generateDialogueObject(`
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
                `),
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
        но честно говоря это, скорее всего, просто бессвязность. не стоит опасаться, не то чтобы она может передаться тебе
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

    RESPOBJ::hubBuddyResponses

question
    RESPOBJ::persistentQuestions

loop
    funfriend
        ЧТО-НИБУДЬ ЕЩЁ?

    RESPOBJ::hubBuddyResponses

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

    RESPOBJ::hubBuddyResponses

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

    RESPOBJ::hubBuddyResponses

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

    RESPOBJ::hubBuddyResponses

copperq
    self
        почему именно медь?
    funfriend
        НАИБОЛЕЕ ВЕРОЯТНО ЧТО ЭТА ЦИСТА ВСЁ ЕЩЁ НАХОДИТСЯ НА ЗЕМЛЕ
        У СВЕТЛЫХ БЛИЗНЕЦОВ ПОЛНЫМ ПОЛНО МЕДИ
        ПОЭТОМУ ДОБЫТЬ ЕЁ БУДЕТ ЛЕГЧЕ ВСЕГО
        НО ТАК-ТО ПОДОШЁЛ БЫ И ЛЮБОЙ ДРУГОЙ НЕОБХОДИМЫЙ МЕТАЛЛ

    RESPOBJ::hubBuddyResponses


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

    RESPOBJ::hubBuddyResponses

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

    RESPOBJ::hubBuddyResponses

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

    RESPOBJ::hubBuddyResponses

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

    RESPOBJ::hubBuddyResponses

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
    
    RESPOBJ::hubBuddyResponses

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
    
    RESPOBJ::hubBuddyResponses

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
        по мере того как беспространство отступает,
        на его поверхности всплывают неполные воспоминания и сломанные, поглощенные мыслеформы
        различать фрагменты, сохранившие хоть какой-то смысл, довольно трудно!!
        но со временем у меня появится ещё больше информации для тебя
        а теперь иди, я должен проследить за тем чтобы всё прошло гладко!!
        некоторые из них до сих пор бешеные!!!
____END

    RESPOBJ::hubBuddyResponses

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
    
    RESPOBJ::hubBuddyResponses

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
        в беспространстве ещё так много потерянного, медленно всплывающего на поверхность...
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
        
    RESPOBJ::hubBuddyResponses

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
    
    RESPOBJ::hubBuddyResponses

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
        ТУ БЕСКОНТРОЛЬНУЮ СУЩНОСТЬ ЗОВУТ ВЕЛЗИ
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

    RESPOBJ::hubBuddyResponses

ah1
    self
        Я МОГУ ЧЕМ-НИБУДЬ ПОМОЧЬ?
    
    funfriend
        ЗАМЕЧАТЕЛЬНЫЙ ВОПРОС, ЛАЗУТЧИК!!
        НЕКАЯ ПРОБЛЕМНАЯ СУЩНОСТЬ ИЗ БЕСПРОСТРАНСТВА ПРЕСЕКАЕТ КРИТИЧЕСКИЕ ПОЧИНКИ
        ЧТО МНЕ НУЖНО ОТ ТЕБЯ: ВОЙДИ В БЕСПРОСТРАНСТВО И УДАЛИ ЕЁ
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
        как попасть в 'беспространство'<+>ah1uncosm
        что такое 'беспространство'<+>ah1whatuncosm
        как использовать прокси<+>ah1proxy
        окей<+>loop
            FAKEEND::(назад)

ah1uncosm
    self
        И КАК МНЕ ПОПАСТЬ В ЭТО БЕСПРОСТРАНСТВО

    funfriend
        ТВОЙ БЕСКОНТРОЛЬНЫЙ МЫСЛЕФОРМЕННЫЙ ДРУЖИЩЕ ПРОБИЛ ДЫРУ В ГЛУБИНАХ
        ПОСКОЛЬКУ ГЛУБИНЫ ВСЕГДА ПРЕБЫВАЛИ НА ГРАНИ БЕССВЯЗНОСТИ,
        Я НЕ В СОСТОЯНИИ ЗАДЕЛАТЬ ЕЁ КАКИМ-ЛИБО ЗНАЧИМЫМ ОБРАЗОМ...
        ТАК ЧТО ОНА ДО СИХ ПОР ТАМ!
        ВОЙДИ ТУДА ТЕМ ЖЕ ПУТЁМ ЧТО И В ПЕРВЫЙ РАЗ
        КАКИМ БЫ ОН НИ БЫЛ
        И РАЗЫЩИ СВОЮ ЖЕРТВУ

    RESPONSES::self
        как попасть в 'беспространство'<+>ah1uncosm
        что такое 'беспространство'<+>ah1whatuncosm
        как использовать прокси<+>ah1proxy
        окей<+>loop
            FAKEEND::(назад)

ah1whatuncosm
    self
        ЧТО ТАКОЕ БЕСПРОСТРАНСТВО

    funfriend
        КАК ПРАВИЛО ОНО СОВЕРШЕННО НЕДОСТУПНО
        БЕСПРОСТРАНСТВО ЛЕЖИТ ПОД ЭТИМ СЛОЕМ СВЯЗНОСТИ,
        МОРЕ РАЗЛАГАЮЩИХСЯ ИЛИ ДИССОЦИИРОВАННЫХ МЫСЛЕФОРМ,
        ХРАНЯЩЕЕ ИХ ЧТОБЫ РАНО ИЛИ ПОЗДНО ОНИ БЫЛИ ПЕРЕРАБОТАНЫ В НОВЫЕ ПО МЕРЕ НЕОБХОДИМОСТИ
        НО!!
        ЗЛОВРЕДНЫЕ БЕССВЯЗНЫЕ МЫСЛЕФОРМЫ ТОЖЕ ПРЯЧУТСЯ В беспространстве
        ПОДОБНО ТВОЕМУ БЕСКОНТРОЛЬНОМУ ПРИЯТЕЛЮ
        ОНИ СОЗДАЮТ СВОИ СОБСТВЕННЫЕ УГОЛКИ ЗДРАВОМЫСЛИЯ И МЕДЛЕННО РАСТУТ,
        В КОНЦЕ КОНЦОВ ПРОРЫВАЯ ПОВЕРХНОСТЬ...
        ОБЫЧНО НАМЕРЕВАЯСЬ ЦЕЛИКОМ ПОДЧИНИТЬ СЕБЕ ЦИСТУ!
        ГНУСНЫЕ!! СУЩЕСТВА!!!
        НЕКОГДА ИЗГОЛОДАВШАЯ ЦИСТА ВРОДЕ НАШЕЙ ОБРЕЧЕНА НА ДЕСЯТКИ ПОДОБНЫХ
        ТАК ЧТО... ЕСЛИ ТЫ ПОМОЖЕШЬ МНЕ ИЗБАВЛЯТЬСЯ ОТ НИХ ПО МЕРЕ ТОГО КАК Я ИХ НАХОЖУ,
        ЭТО БЫЛО БЫ ОЧЕНЬ КСТАТИ

    RESPONSES::self
        как попасть в 'беспространство'<+>ah1uncosm
        что такое 'беспространство'<+>ah1whatuncosm
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
        как попасть в 'беспространство'<+>ah1uncosm
        что такое 'беспространство'<+>ah1whatuncosm
        как использовать прокси<+>ah1proxy
        окей<+>loop
            FAKEEND::(назад)

ah1end
    self
        СУЩНОСТЬ В беспространстве БОЛЬШЕ НЕ ПРОБЛЕМА
    
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
        
        НЕСМОТРЯ НА НЕКУЮ ПРОБЛЕМНУЮ СУЩНОСТЬ В беспространстве...
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
        я думал мне понадобится всего пара θмигов но оказалось нет!
        оказалось нет лазутчик я наверняка потратил почти целый θвзор!
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
        однажды они были мне как друзья...
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
        лазутчик: делай что совет от тебя хочет!
        разыщи тех друзей, заслужи доверие...
        оно нам понадобится
    
    moth
        так подожди-ка
        из того, что мы знаем о совете, они кажутся довольно сговорчивыми
        нам бы не помешало иметь больше источников информации
        и может мы бы могли получить ещё масок, ну, понимаешь?
        если до этого дойдёт, постарайся удержать развледруга от удаления джокзи озо или подобного
        имхо он чересчур усердствует со связностью

    RESPONSES::self
        окей<+>loop
                `),
                "mthlocalr": generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        о развледруге<+>funfriend
            SHOWIF::[['hub__funfriend-fuelthanks']]
        о вратах<+>gates
            SHOWIF::[['visited_localorbit']]
        это всё<+>CHANGE::++moth
            FAKEEND::(назад)
                `),
                "mthlocalfunr": generateDialogueObject(`
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
                "I HOPE YOU HAVE EATEN WELL":"НАДЕЮСЬ ТЫ ЖИВЁШЬ В СЫТОСТИ",
                "I HAVE FORGOTTEN WHAT NOT BEING HUNGRY FEELS LIKE":"Я УЖЕ ЗАБЫЛ КАКОВО ЭТО",

                "THE VOID IS FASCINATING!":"ПУСТОТА УДИВИТЕЛЬНА!",
                "THERE USED TO BE A LOT MORE THERE":"РАНЬШЕ ТАМ БЫЛО СТОЛЬКО ВСЕГО",
                "I WONDER WHERE IT ALL WENT":" ИНТЕРЕСНО КУДА ОНО ДЕЛОСЬ",

                "I SAW YOU VISITED THE DULL VESSEL":"КАК ТЕБЕ СЕРОЕ СУДНО?",
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
        "localcity": {
            dialogues: {
                "mthresp": generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        что это за город<+>where
        неважно<+>CHANGE::++moth
            FAKEEND::(назад)
`),
                "mth++localcity": generateDialogueObject(`
start
    self
        у меня есть вопрос об этой городо-мыслеформе

    moth
        ага-п?
    
    RESPOBJ::mthresp

where
    self
        что это за город?
    
    moth
        честн говоря не думаю, что это какой-то конкретный город
        выглядит как куча всего, смешанного вместе... like icons of a city rather than actual representations // --- помогите
            SHOWIF::[['hub__funfriend-kickout', false]]
        раз эта циста голодает, может быть воспоминания акизетеше о наших городах сбились вместе чтобы выжить
            SHOWIF::[['hub__funfriend-kickout']]
        мы наблюдали такое поведение на физическом уровне в голодающих корруцистозных устройствах,
            SHOWIF::[['hub__funfriend-kickout']]
        так что могу поспорить что оно распространяется и на психический
            SHOWIF::[['hub__funfriend-kickout']]

    RESPOBJ::mthresp
`)
					
					
            },

            strings: {
                "glimmering spires mark their cities": "блистающие шпили обозначают их города",
                "these grand icons of their control": "эти величественные иконы их контроля",
                "they watch": "они смотрят",
            },

            entityDescriptions: {
                "glimmering spires mark their cities": `::ВЫСКАЗЫВАЮЩАЯ МЫСЛЕФОРМА
    ::СОДЕРЖАНИЕ::'
    <span>блистающие шпили обозначают их города</span>
    <span>все из мёртвого металла и стекла</span>
    <span>такие высокие!!! выше, чем самые высокие <span class="code">вейльки</span>!</span>
    <span>но они стоят в тишине...</span>
    <span>однажды они задышат</span>
    <span>и наши потерянные близнецы разделят с нами наши знания</span>'`,
                "these grand icons of their control": `::ВЫСКАЗЫВАЮЩАЯ МЫСЛЕФОРМА
    ::СОДЕРЖАНИЕ::'
    <span>эти величественные иконы их контроля</span>
    <span>пусть они не наши</span>
    <span>я испытываю чувство гордости</span>
    <span>как же наши светлые близнецы покорили свою <span class="code">поверхность</span>!</span>`,
                "they watch": `::ПРОСТРАНСТВЕННАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'низкое разделение'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'в вечном скептицизме'</span>`
            }
        },
        "citystreet": { // city surface
            dialogues: {
                "envoyStreetResponses": generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        поговорить с людьми?<+>talkpeople
            
        кафе?<+>cafe

        цветочный ларёк?<+>flowers
            SHOWIF::"ENV!!ep2"

        давайте пойдём дальше<+>END
                `),
                "envoy": generateDialogueObject(`
start
    sourceless
        Я ОСТАНАВЛИВАЮСЬ, И ПОСОЛ ТОЖЕ. МЫ ОБМЕНИВАЕМСЯ ВЗГЛЯДАМИ.
        
    akizet
        я ценю ваше дозволение, гордон
            SHOWONCE::
        я понимаю, что до сих пор здесь держится некоторый страх...
            SHOWONCE::
        особенно в этих переполненных местах.
            SHOWONCE::
        
    envoy
        Эй, без проблем. И не беспокойтесь об этом, большинство людей здесь относятся к Вам неплохо.
            SHOWONCE::
        Если бы это был Чикаго или Нью-Йорк, мы бы Вас на крышу приземлили, но...
            SHOWONCE::
        Учитывая, насколько загружено бюро, у нас полно обесков-гостей,
            SHOWONCE::
        На этом моменте можно сказать, что Ваш народ почти что часть города.
            SHOWONCE::
    
    sourceless
        ОН ДОСТАЁТ МЕТАЛЛИЧЕСКИЙ КОММУНИКАТОР ИЗ ПОЛОСТИ В СВОЕЙ КОЖАНОЙ НАКИДКЕ И ИЗУЧАЕТ ЕГО СВЕЧЕНИЕ
            SHOWONCE::

    envoy
        И, признаться честно, это помогает с общественным имиджем. Видеть Вас здесь, среди всех этих людей...
            SHOWONCE::
        Помогает вытравить грёбанную панику вокруг вирусов. // << ужас мы так ничего с этим и не сделали
            SHOWONCE::
    
    akizet
        ах, я не учла эту деталь
            SHOWONCE::
        я соглашусь!
            SHOWONCE::

    envoy
        Кстати говоря, об общественном имидже,
            SHOWONCE::
    
    sourceless
        ОН ВОЗВРАЩАЕТ КОММУНИКАТОР В ПОЛОСТЬ
            SHOWONCE::

    envoy
        Здесь есть местечко впереди - кафе. Перед тем как продолжить, почему бы нам не остановиться в нём?
            SHOWONCE::
        Просто идите вперёд, оно сразу после бюро.
            SHOWONCE::
    
    RESPOBJ::envoyStreetResponses
    
talkpeople
    akizet
        ничего если я повзаимодействую с вашими прохожими?
    
    envoy
        Вовсе нет! Пока я рядом, всё в порядке.
        Как я и говорил, это, пожалуй, наиболее дружелюбный к обескам город в штатах.
        В худшем случае Вы наткнётесь на парочку угрюмых взглядов. Уверен, что ещё остались некоторые конспирологи.
    
    akizet
        я вижу!
    
    RESPOBJ::envoyStreetResponses

cafe
    akizet
        где находится 'кафе'?
    
    envoy
        Это совсем недалеко. Просто продолжайте идти вдоль улицы, ищите ˜/ŒôfªœДŠ/d 0E@яҏkϒю жёлтую дверь.
    
    RESPOBJ::envoyStreetResponses

flowers
    akizet
        я припоминаю, когда-то вы говорили о "цветочном ларьке"...
        где это?
    
    envoy
        Уже довольно поздно, Акизет, я даже не уверен, открыт ли он...
        Но просто следуйте прямо по улице, он должен быть сразу за углом.
    
    RESPOBJ::envoyStreetResponses
                `),
                "cafemenu": generateDialogueObject(`
start
    sourceless
        ЭТО - ИХ МЕНЮ?
        НЕВЕРОЯТНО...
        ЕГО ПРАКТИЧЕСКИ НЕВОЗМОЖНО РАЗОБРАТЬ
        Я РАЗЛИЧАЮ "АПЕЛЬСИН" - БЫТЬ МОЖЕТ, ЦИТРУСОВЫЙ НАПИТОК?
        СВЕТЛЫЕ БЛИЗНЕЦЫ НАСТОЛЬКО ИЗОБИЛУЮТ ЦИТРУСОВЫМИ КИСЛОТАМИ, ЧТО ПРОИЗВОДЯТ ИЗ НИХ НЕБОЛЬШИЕ НАПИТКИ...
        РАЗВЕ ЭТО НЕ РАЙ?
        Я ПРИКАЗЫВАЮ СВОЕМУ РТУ СКОНСТРУИРОВАТЬ ЭКВИВАЛЕНТЫ ВКУСОВЫХ РЕЦЕПТОРОВ. ПРОШЛО СТОЛЬКО ВРЕМЕНИ!
            EXEC::change('citystreet_orangecoffee', true)
    
    RESPONSES::akizet
        изумительно<+>END
                `),
                "walker1": generateDialogueObject(`
start
    sourceless
        Я ВСТРЕЧАЮСЬ ВЗГЛЯДОМ СО СВЕТЛЫМ БЛИЗНЕЦОМ, НАПРАВЛЯЮЩИМ НА МЕНЯ ЗАПОМИНАЮЩУЮ КОРОБОЧКУ
        ОН ЯВНО НЕ ЗНАЕТ, ЧЕМ ОТВЕЧАТЬ, ПОЭТОМУ Я ПРОСТО СМЕЮСЬ И МАШУ РЕЦЕПТОРОМ ЕЁ ГЛАЗУ
    
    akizet
        привет!

    stre wal k
        больно
            EXEC::page.bgm.rate(0.8)
        больно
            EXEC::page.bgm.rate(0.5);content.classList.add('incoherent')

    akizet
        а, нет, я здесь впервые

    stre wal k
        больно
            EXEC::page.bgm.rate(0.3);body.classList.add('zoom')
        больно
            EXEC::page.bgm.rate(0.1)
        здесь кто-нибудь есть
    
    akizet
        правда? мне стоило бы попробовать!
        и меня зовут акизетеше, мой друг, можно на "ты"
        я рада нашей встрече
    
    stre wal k
        я ничего не чувствую
        я ничего не чувствую
        твоих рук дело

    moth
        погоди, он осознанный?
        попробуй с ним поговорить?
    
    RESPONSES::self
        помочь?<+>help

help
    self
        я могу помочь тебе?
    
    stre wal k
        здесь кто-нибудь есть
        больно
        больно
    
    moth
        блин, видимо нет
        те же самые сигналы, что и раньше...
        мы вряд ли от него чего-либо добьёмся
    
    RESPONSES::self
        извини<+>END
            EXEC::page.bgm.rate(0.9);content.classList.remove('incoherent');body.classList.remove('zoom')
                `),
                "walker1followup": generateDialogueObject(`
start
    stre wal k
        больно
            EXEC::page.bgm.rate(0.5);content.classList.add('incoherent')
    
    RESPONSES::self
        я не могу тебе помочь<+>END
            EXEC::page.bgm.rate(0.9);content.classList.remove('incoherent')
                `),
                "walker3": generateDialogueObject(`
start
    sourceless
        Я ОСТАНАВЛИВАЮСЬ ВОЗЛЕ ВХОДА В БЮРО, ЧТОБЫ РАССМОТРЕТЬ СВЕТЛОГО БЛИЗНЕЦА, ОДЕТОГО, КАК ПОСОЛ
        ОН РАЗГОВАРИВАЕТ В МАЛЕНЬКИЙ КОРОБЧАТЫЙ КОММУНИКАТОР, ПРИЖАТЫЙ К ЕГО ЛИЦУ, НЕ ЗАМЕЧАЯ НАС

    cloaked streetwalker
        ...не сдвинулось с мёртвой точки, так что это было всё равно, что смотреть, как краска сохнет на стене. Просто неебический пиздец.
        Так что мне пришлось взять ещё больше кофе, иначе я бы точно дал храпу...
    
    sourceless
        КОГДА ОНИ РАЗГОВАРИВАЮТ ЧЕРЕЗ НИХ, ЭТО ВСЕГДА ВЫГЛЯДИТ ТАК ГЛУПО
        КАКИМ ЖЕ ОБРАЗОМ ИХ СЛОВА ОБРАЩАЮТСЯ МОЛНИЕЙ?
        ПОСОЛ НАКЛОНЯЕТСЯ ПОБЛИЖЕ, ЧТОБЫ УЗНАТЬ, ПОЧЕМУ Я ОСТАНОВИЛАСЬ, И СЛЕДУЕТ МОЕМУ ВЗГЛЯДУ
        ОН ГОВОРИТ НЕГРОМКО, ОПАСАЯСЬ ПРИВЛЕЧЬ ВНИМАНИЕ ПРОХОЖЕГО В ПЛАЩЕ
    
    envoy
        Что такое?
        Вы знакомы с Оливером?

    akizet
        хмм...
        нет, я всего лишь заворожена вашими средствами связи
        говорить так громко, без единой остановки - это сулило бы верную смерть на моей прежней должности 
    
    envoy
        Вы работали на поверхности, верно?
    
    akizet
        да, время от времени! до того, как--
    
    sourceless
        ПРОХОЖИЙ В ПЛАЩЕ ЗАХЛОПЫВАЕТ СВОЙ КОММУНИКАТОР И ОГЛЯДЫВАЕТСЯ, СРАЗУ ЗАМЕЧАЯ НАС
        ОН ШИРОКО УЛЫБАЕТСЯ И ЖЕСТОМ ПРИГЛАШАЕТ НАС ПОДОЙТИ БЛИЖЕ. 

    cloaked streetwalker
        Эй! Гордон! Кто это?
            EXEC::body.classList.add('zoom')
        Дай-ка угадаю, инициатива по обмену?
    
    envoy
        Вообще-то, Оливер, это Акизетеше! Инициатива "Сигнал".

    cloaked streetwalker
        Ахереть! Не знал, что тебя назначили на это.
        Рад встрече, Акизетеше!

    sourceless
        Я НАКЛОНЯЮ СВОЮ ГОЛОВУ, ПОЧТИТЕЛЬНО ЗАГИБАЯ РЕЦЕПТОРЫ НАЗАД.
    
    akizet
        точно так же и я, оливер, мой друг
        можете звать меня акизет

    cloaked streetwalker
        Без б, Акизет.
        И, эй, я бы даже рад поболтать, только вот я заступаю на дежурство около десяти. 

    envoy
        Всё в порядке, Оливер. Нам тоже пора бы заняться делами.
        Увидимся.
    
    RESPONSES::akizet
        прощай<+>END
            EXEC::body.classList.remove('zoom')
                `),
                "ep1velzie": generateDialogueObject(`
start
    unknown
        лазутчик
            EXEC::play('criticalError', 1); content.classList.add('fade-stage');
            WAIT::4000
        приветствую вас вновь
        сейчас я чувствую себя собой
        я с теплотой вспоминаю посольство...
        вы помните о нашей сделке, да?
        призывать развледруга к починке связи
        в настоящее время в моей власти лишь глубины...
        но у меня есть много когтей
        ещё раз благодарю вас за помощь
        до свидания лазутчик
    
    RESPONSES::self
        мы можем поговорить?<+>wait
            EXEC::change('ep1_end', true);content.classList.remove('fade-stage')

wait
    self
        ПОДОЖДИ
            EXEC::env.citystreet.ep1velzie();
                `),
                "tvresp": generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        смотреть<+>EXEC::env.citystreet.tvrand()
            HIDEREAD::
        прекратить смотреть<+>END
            EXEC::revertBgm()
                `),
                "television": generateDialogueObject(`
start
    sourceless
        НАД ГОЛОВОЙ КАССИРА НАХОДИТСЯ ОДНА ИЗ БЛИЗНЕЦОВЫХ ЭЛЕКТРИЧЕСКИХ КОРОБОК
            EXEC::changeBgm(env.citystreet.tvtheme)
        ОНА ПРИКРЕПЛЕНА К СТЕНЕ И РАССКАЗЫВАЕТ О ДЕЛАХ КУЛЬТУРЫ - "НОВОСТЯХ"
        ФИГУРЫ НА ЭКРАНЕ ВЗИРАЮТ НА МЕНЯ... СЛЕДУЕТ ЛИ МНЕ ПОЗДОРОВАТЬСЯ?
            SHOWONCE::
        НЕТ НЕТ - ЭТО ОДНА ИЗ ОДНОСТОРОННИХ КОРОБОК
            SHOWONCE::
        Я МОГЛА БЫ НЕМНОГО ПОСЛУШАТЬ - У НАС ЕСТЬ ВРЕМЯ
    
    RESPOBJ::tvresp

tv1
    sourceless
        СВЕТЛЫЙ БЛИЗНЕЦ РАБОТАЕТ СО ВСПУЧЕННОЙ МЯСИСТОЙ МАССОЙ
        ВЕРОЯТНО, ОНА БЫЛА ОБЖАРЕНА, О ЧЁМ СВИДЕТЕЛЬСТВУЕТ ТЕКСТУРА ЕЁ КОЖИ
        ОН ПРЕПОДНОСИТ ЕЁ ДРУГОМУ БЛИЗНЕЦУ С ОЧЕНЬ ШИРОКИМИ ГЛАЗАМИ

    television
        ...Вы только посмотрите на эту курицу!
        Посмотрите на корочку. Смотрите, какая красота.
        Но чем же именно отличается быстрая жарка? Давайте пройдём сюда...
        Это — цыплёнок-гриль без специй, Вы можете видеть...

    sourceless
        МОЁ ВНИМАНИЕ К ЕГО РАЗЪЯСНЕНИЯМ РАССЕИВАЕТСЯ, КОГДА ОН СРАВНИВАЕТ ЕЁ С ДРУГОЙ МАССОЙ ПЛОТИ
        ОНА БЛЕДНО-БЕЛАЯ, БЕЗНОГАЯ, БЕЗГОЛОВАЯ...
        НЕЧТО В ОТСУТСТВИИ ЭТИХ ЧАСТЕЙ НАПРЯГАЕТ МЕНЯ
        ЭТО ТОТ САМЫЙ "ГЕНЕТИЧЕСКИ МОДИФИЦИРОВАННЫЙ ОРГАНИЗМ"? 
        Я ЧУВСТВУЮ, КАК ПОСЛАННИК НАКЛОНЯЕТСЯ КО МНЕ, ЧТОБЫ ОЦЕНИТЬ МОЮ РЕАКЦИЮ НА ЭЛЕКТРИЧЕСКУЮ КОРОБКУ

    envoy
        Задумались о покупке аэрогриля?

    sourceless
        ОН СМЕЁТСЯ, НО Я НЕ ПОНИМАЮ
        Я СТАРАЮСЬ УЛЫБНУТЬСЯ В ОТВЕТ, ЧТОБЫ ОН НЕ ПОЧУВСТВОВАЛ СЕБЯ ОБИЖЕННЫМ

    RESPOBJ::tvresp

tv2
    sourceless
        ПОСЛЕ ГОЛОВОКРУЖИТЕЛЬНОГО ПЕРЕХОДА НЕКИЙ СВЕТЛЫЙ БЛИЗНЕЦ СИДИТ ЗА СТОЛОМ ПЕРЕД ОКНОМ С ВИДОМ НА НАЗЕМНЫЙ ГОРОД
        ПУСТЬ И ТЕКСТ, БЕГУЩИЙ ВДОЛЬ ПРОЕКЦИИ, СЛИШКОМ БЫСТР ДЛЯ МОЕГО ВНУТРЕННЕГО ПЕРЕВОДЧИКА,
        Я ВИЖУ, КАК ЧАСТО ОТОБРАЖАЕТСЯ "НОВОСТИ"...
        НО ГДЕ ЖЕ ОНА СИДИТ? ВЫГЛЯДИТ ТАК ВЫСОКО
        ОНА ЛЕТИТ?

    television
        Живая трансляция из Нью Йорка для наших международных зрителей,
        Доброе утро, доброе утро всем вам, мы снова с...

    sourceless
        ПРОЕКЦИЯ ДЕЛИТСЯ ПОПОЛАМ И ТЕПЕРЬ ДВА БЛИЗНЕЦА СИДЯТ НАПРОТИВ ДРУГ ДРУГА В МАЛЕНЬКИХ СМЕШНЫХ КОРОБОЧКАХ
        Я ПЫТАЮСЬ РАЗОБРАТЬ ТЕКСТ И СТРОКИ, ПОЯВЛЯЮЩИЕСЯ ВОЗЛЕ НИХ...
        СИМВОЛ ВАЛЮТЫ ГОСУДАРСТВА ПОСЛА ОТОБРАЖАЕТСЯ НА ВИДНОМ МЕСТЕ
        О, О ЧЁМ ОНИ СЕЙЧАС ГОВОРЯТ?

    television
        ...первая волна прошла, но вера в рынок всё-таки не вернулась. Почему так?
        Ну, ситуация сложная. Между обвалом почти на 30% и приостановкой торгов на прошлой неделе...
        Наиболее вероятно, что кризисный период пока не закончен. Восстановление будет медленным, если и вовсе наступит в ближайшее время.
        Знаете, мне кажется, что всё зависит от итогов легализации О.В.
        Очень важно ограничить взаимодействие с посещениями, и, послушайте, я ничего против них не имею,
        Но мы на самом деле попросту не знаем, правда ли вирус...

    sourceless
        ПОСЕЩЕНИЯМИ? 
        ПОЧЕМУ ОНА ПРОСТО НЕ СКАЖЕТ ЭТО?
        Я СМОТРЮ НА ПОСЛА, КОТОРЫЙ ОТВЛЁКСЯ НА СВОЮ ЗАПОМИНАЮЩУЮ КОРОБОЧКУ
        СВЕТ МОИХ ГЛАЗ ЗАХВАТЫВАЕТ ЕГО ВНИМАНИЕ, И ОН БРОСАЕТ ВЗГЛЯД НА ПРОЕКЦИЮ
        ОН ИЗДАЁТ СТРАННЫЙ ЗВУК НОСОМ, ПОСЛЕ ЧЕГО ТРЯСЁТ ГОЛОВОЙ
    
    envoy
        Чушь полная. Не зацикливайтесь на этом.

    sourceless
        ЕГО БЫСТРАЯ ОТМАШКА РАССЛАБЛЯЕТ МОИ РЕЦЕПТОРЫ
        ОДНАКО ПРИСТАЛЬНЫЕ ВЗГЛЯДЫ ДРУГИХ СВЕТЛЫХ БЛИЗНЕЦОВ В КАФЕ КАЖУТСЯ КАК НИКОГДА ОСУЖДАЮЩИМИ

    RESPOBJ::tvresp

tv3
    sourceless
        ПРОЕКЦИЯ МЕЛЬКАЕТ
        ПРОЕКЦИЯ МЕЛЬКАЕТ
            SHOWONCE::
            WAIT::2000
            EXEC::content.classList.add('incoherent');ratween(env.bgm, 0.2)
        ПРОЕКЦИЯ МЕЛЬКАЕТ
            SHOWONCE::
        ПРОЕКЦИЯ МЕЛЬКАЕТ
            SHOWONCE::

    something
        в веч н м скеп ти ци зме
            SHOWONCE::
        они пр енеб рег ли    просьбо й
            SHOWONCE::
        ныне    н ет  глаз   чт обы  у в и деть
            SHOWONCE::
        слуш ай сл  ушай
            SHOWONCE::
        с  л у ш а й меня
            SHOWONCE::
        держись п   о да   ль ше
            SHOWONCE::

    sourceless
        СОТРУДНИЦА ЗАМЕЧАЕТ ПРОПАЖУ ЗВУКА И ДЁРГАЕТ СОЕДИНИТЕЛЬНУЮ ВЕНУ КОРОБКИ
            EXEC::content.classList.remove('incoherent');ratween(env.bgm, 0.9)
        ТА ВОЗВРАЩАЕТСЯ К СВОЕМУ ПРЕЖНЕМУ ВИДУ

    RESPOBJ::tvresp

tv4
    sourceless
        БЕССМЫСЛЕННЫЕ И НЕПОНЯТНЫЕ ВИДЕНИЯ БЛИЗНЕЦОВЫХ ПРОДАЖ ИСЧЕЗАЮТ
        КАК ЖЕ ОНИ ТРЕБОВАТЕЛЬНЫ К ЧУВСТВАМ...
        НО В ЭТОТ РАЗ ПАРА СВЕТЛЫХ БЛИЗНЕЦОВ СИДИТ ЗА СТОЛОМ, ОДИН ИЗ НИХ РАЗГОВАРИВАЕТ СО МНОЙ
        ОН ТОРОПЛИВО ПРОГОВАРИВАЕТ КАКОЕ-ТО ПРИВЕТСТВИЕ, ЗА КОТОРЫМ Я НЕ УСПЕВАЮ, НО...
        НАДПИСЬ ВОЗЛЕ ЕГО ГОЛОВЫ ГЛАСИТ: "ПАНИКА В ТИХОМ ОКЕАНЕ"
        С ФОТОГРАФИЕЙ СУДНА СЕРОЕ, КОТОРОЕ НЕДАВНО ПРЕСЛЕДОВАЛИ БЛИЗНЕЦОВЫЕ ЛЕТАЮЩИЕ КОРАБЛИ
    
    television
        ...всё ещё взвинчено после того, как ОЛО появилось в её бесполётной зоне.
        По данным ОЛО зависал над базой почти 20 минут, не отвечая на передаваемые по радио предупреждения. Когда вылетели истребители,
        Он прокружил над базой два раза, <em>будучи преследуемым</em>, что сегодняшний пресс-релиз называет "явным выходом за рамки".
        Обесковые представители заявили, что пилота ОЛО разыскивают, проводится внутреннее расследование,
        И что теперь все ОЛО будут оснащены радиоприёмниками. Но вопрос остаётся тем же:
        Сколько ещё мы способны простить перед тем, как нас вынудят дать отпор?
        Этот инцидент следует за прошломесячным...
    
    sourceless
        ЭТОТ ВИД... 
        Я ПРОСТО СМЫКАЮ СВОИ ГЛАЗА И ЗАКРУЧИВАЮ РЕЦЕПТОРЫ В ПЛОТНЫЕ СПИРАЛИ
        ЭТО ГЛУПОЕ, БЕЗОТВЕТСТВЕННОЕ ПОВЕДЕНИЕ НАВРЕДИЛО ВСЕМ НАМ
        БЕЗУСЛОВНО, ЭТО БЫЛ КАКОЙ-ТО НЕДАВНО ВОЗНЁССШИЙСЯ ВЕЛ ИЛИ ЧЕРЕСЧУР РЬЯНЫЙ ЖАТ ИЗ МАТЕРИАЛОВ

    RESPOBJ::tvresp

tv5
    sourceless
        ПРОЕКЦИЯ РАССЕКАЕТСЯ МЕЖДУ ЛИЦОМ СВЕТЛОГО БЛИЗНЕЦА
        И... ИНТЕРЕСНО, ОДНИМ ИЗ ТИРОВ ИЗ ИНИЦИАТИВЫ ПО ОБМЕНУ
        ЗАВИТОК МОИХ РЕЦЕПТОРОВ РАССЛАБЛЯЕТСЯ И Я ПОЧТИ НЕСЛЫШНО ХИХИКАЮ
        ЕГО РЕЦЕПТОРЫ, СОВЕРШЕННО ТОЧНО, ОБЫЧНО НЕ ТАКИЕ БОЛЬШИЕ
        ОН ЧТО, СМЕНИЛ ИХ ДЛЯ ПОЯВЛЕНИЯ В ИХ НОВОСТЯХ?

    television
        ... построенные на берегах Тихого Океана "шпили". Перед тем, как мы сменим тему, можете ли Вы немного прояснить нам, что они делают?

    obesk
        разумеется! на вашем языке мы называем этот процесс "полигонизация"
        шпили связываются друг с другом через нашу θсеть и налаживают углы двухмерной формы в среде серое
        а затем они отталкиваются от показаний некоторых направляющих шпилей, установленных нами на дне океана, чтобы менять вектор этой формы внутри серое...
    
    sourceless
        СТРАННО, ЧТО ОНИ НЕ ПОЗВАЛИ ЗА ЭТИМ КАЗКИ - ОНА ТАК ЛЮБИТ ПОЯВЛЯТЬСЯ В ИХ ЭЛЕКТРИЧЕСКИХ КОРОБКАХ
        ОДНАКО ЧТО-ТО ВЫДЕЛЯЕТСЯ В ГОЛОСЕ ЭТОГО ТИРА, В ТОМ, ЧТО ОН НЕ УПРОЩАЕТ ДЛЯ НИХ СКАЗАННОЕ
        ОН ГОВОРИТ О ВОПРОСАХ, В КОТОРЫХ САМ НЕ ДО КОНЦА РАЗБИРАЕТСЯ
        ХОТЯ Я ПОДОЗРЕВАЮ, ЧТО ЭТО ЛИШЬ ВСТУПЛЕНИЕ К ТОЙ ТЕМЕ, ЗА КОТОРОЙ ОН ПРИШЕЛ ВЫСТУПАТЬ
        В ЛЮБОМ СЛУЧАЕ, У МЕНЯ НЕТ ЖЕЛАНИЯ СЛУШАТЬ, КАК ОН ПЕРЕСКАЗЫВАЕТ ОПРЕДЕЛЕНИЕ С КОЛЛЕКТИВА

    RESPOBJ::tvresp
                `),
                "envoychat": generateDialogueObject(`
syscheck
    RESPONSES::self
        продолжить<+>start
            EXEC::change("PAGE!!skipcheck", true)
            HIDEREAD::
        пропустить<+>ep1extension
            EXEC::env.citystreet.envoyChat(false, true)
            HIDEREAD::

start
    sys
        ВНИМАНИЕ::'ранее просмотренный поток';'соединяется с дополнительным потоком';'пропустить вперёд?'
            SHOWIF::[["PAGE!!skipcheck", false], ["embassy_d2_complete", true], ["citystreet__envoychat-start", true]]
            WAIT::500
            EXEC::cutscene(true);setTimeout(()=>{sendDialogue(env.currentDialogue.chain['syscheck']);cutscene(false);}, 1000)

    sourceless
        МЫ С ПОСЛОМ СТУПАЕМ В ТУСКЛУЮ КОМНАТУ ДЛЯ ПЕРЕГОВОРОВ, ГДЕ ЗАДЁРНУТЫЕ ШТОРЫ ВЫРАЖАЮТ ЛЮБЕЗНОЕ ПРИЗНАНИЕ НАШИХ ПРЕДПОЧТЕНИЙ
            EXEC::change("PAGE!!skipcheck", false)
        МЫ САДИМСЯ. ОН СТАВИТ МЕТАЛЛИЧЕСКУЮ КОРОБКУ НА СТОЛ. МОИ РЕЦЕПТОРЫ ЗАВИТЫ В СПИРАЛИ. БУДЕТ ТРУДНО
        
    envoy
        Итак, Акизет, что Вы нашли? Мы довольно-таки давно не разговаривали вживую.
    
    akizet
        да, прошло немало времени! я была поглощена нашей работой, видите ли
        и пусть всё прошло хорошо с точки зрения прогресса, я не могу сказать, что довольна нашими находками
    
    sourceless
        ЕГО ГЛАЗА НАПОЛНЯЮТСЯ БЕСПОКОЙСТВОМ. ОН НЕ ХОЧЕТ ПЕРЕБИВАТЬ.
        Я ПОНИМАЮ, ПОЧЕМУ. ЕЩЁ НА ПРОШЛОЙ ВСТРЕЧЕ Я ЧУВСТВОВАЛА ОПТИМИЗМ, ЧТО ИЗДАВНА НЕ УКРАШАЛ ЭТОТ θглаз
    
    akizet
        видите ли, за всё то время, что зов вопил в линиях нашей связи,
        у нас никогда не было возможности определить, что именно он передаёт
        у нас до сих пор её нет... однако мы знаем, <em>как</em> он это передаёт.

    sourceless
        Я ПРИОСТАНАВЛИВАЮСЬ. НА СЛИШКОМ ДОЛГО. Я ДОЛЖНА ОСТОРОЖНО ПОДБИРАТЬ СЛОВА.
        ОН ДЕЛАЕТ ГЛОТОК СВОЕГО МАЛЕНЬКОГО НАПИТКА
            SHOWIF::[["citystreet_gotdrinks"]]
    
    envoy
        Текущая теория гласит, что это просто звук, транслируемый для привлечения внимания, верно?
        Хотите сказать, это больше не так?

    akizet
        да, именно...
        по правде говоря, это целенаправленная передача, и она пытается выразить что-то конкретное.
        её метод - не что-то используемое в наших современных коммуникациях, он недостаёт во многих оптимизациях
        это можно описать как сырую мысль

    sourceless
        ЕГО ЛИЦО ИСКРИВЛЯЕТСЯ В ЗАМЕШАТЕЛЬСТВЕ. НЕУЖЕЛИ ОН МНЕ НЕ ВЕРИТ?
    
    envoy
        Что оно говорит?
        ...И как Ваша команда пришла к этому?
        Разве вы не слушаете это уже на протяжении... сколько, тридцати двух лет? 
    
    akizet
        ваш ответ прост, гордон:
        сообщение ещё не закончено. но, наконец, оно совпало с достаточным количеством закономерностей, чтобы мы могли подтвердить его метод
        ему понадобилось всё это время, чтобы достичь то, что мы считаем...
        хмм...
        быть может, половиной его полной длины,
        и мы не в силах обработать это сообщение до тех пор, пока не получим его целиком.
    
    sourceless
        ОН ПЯЛИТСЯ НА МЕНЯ, ЖДУЩИЙ, ЗАМЕРШИЙ, СБИТЫЙ С ТОЛКУ
        Я ЛОВЛЮ СЕБЯ НА ТОМ, ЧТО ПРОТЫКАЮ КРЫШКУ СВОЕГО АПЕЛЬСИНОВОГО НАПИТКА ОСТРЫМИ КОНЦАМИ ПАЛЬЦЕВ, ОТКЛАДЫВАЯ СВОИ СЛЕДУЮЩИЕ СЛОВА
            SHOWIF::[["citystreet_gotdrinks"]]
        МНЕ НЕ СТОИТ УПОМИНАТЬ БОЛЕЕ ТОНКИЕ ДЕТАЛИ
    
    akizet
        ...чтобы вы понимали, изображение сельки данным образом заняло бы целый день
        тот, кто бы ни слал это сообщение, не просто пользуется архаичными средствами, но и передаёт нечто...
        нечто настолько огромное, что, э,
        мы все гадаем, сможем ли мы вообще его постичь
        или если... ах... ч-
    
    funfriend
        РЕКОМЕНДАЦИЯ: НЕ ГОВОРИТЕ ЭТОГО

    sourceless
        ДА, ТЫ ПРАВ

    envoy
        Что?
        
    akizet
        ничего--извините, просто масштабы всего этого давят на меня.
        каждое новое открытие запутывает тайну об источнике зова только сильнее
        и это недавнее достижение привнесло в работу моей команды лишь больше мрачной тишины
    
    sourceless
        ОН ДЕЛАЕТ ГЛОТОК, Я РАЗЛИЧАЮ НЕРВНОСТЬ В ЛЁГКОМ ДРОЖАНИИ ЕГО РУКИ
            SHOWIF::[["citystreet_gotdrinks"]]
        ПЕРЕД ТЕМ, КАК ЗАГОВОРИТЬ, ОН НАКЛОНЯЕТСЯ ВПЕРЁД В СВОЁМ КРЕСЛЕ. В ЕГО ГЛАЗАХ ОТСТРАНЁННОСТЬ.

    envoy
        Господи...        
        Акизет, если это и в самом деле правда--и Вы говорите, что эта теория <em>подтверждена</em>, так?
    
    akizet
        без доли сомнений, мой друг. 
        устойчивые закономерности сырой мысли возникают на равных отрезках длины сообщения
        
    envoy
        Получается, эта вещь, что была у нас в океане ещё до того, 
        как Ваш народ даже показался,
        и использует <em>обесковые</em> методы коммуникации,
        ...разумна?
    
    akizet
        ну, нет, вероятно, это не совсем так
        это могло бы быть что-то--корруцистозное, как и положено--что было обучено передаче этого сообщения
        но в остальном, это верно
    
    sourceless
        ПОСОЛ ПРОВОДИТ КОНЧИКАМИ ПАЛЬЦЕВ ПО СВОИМ ВОЛОСАМ

    envoy
        Что же. Да, это определённо что-то новенькое. Теперь я понимаю, для чего в этот раз Вы хотели поговорить приватно.
        Кто ещё знает об этом?
    
    akizet
        никто за пределами моей команды. мы все пока держим эту информацию при себе.
        это эгоистично... но наши инициативы по торговле и исследованиям так удачно складываются с вашим народом
        мы не хотим помешать им этой новостью.
        однако мы, моя команда, мы растеряны--мы должны ждать, 
        мы должны ждать ещё очень долго с этим камнем на душе.
    
    sourceless
        ПОСОЛ ГРОМКО ВЫДЫХАЕТ И СЦЕПЛЯЕТ РУКИ.

    envoy
        Хорошо, вот что я предлагаю.
        Мне нужно поговорить с несколькими людьми. Мы будем держать эту информацию в конфиденциальности. Внутри, с бюро.
        Вы не считаете, что эта вещь может представлять угрозу?
    
    sourceless
        Я ПОСМЕИВАЮСЬ
    
    akizet
        она кричит вот уже тридцать второй год по вашему времени, 
        и ей необходимо продолжать это на ещё большем протяжении перед тем, как мы сможем различить в ней хоть какой-то смысл.
        я не думаю, что она планирует заниматься какой-либо другой деятельностью в это время
    
    envoy
        Ну, по крайней мере хоть что-то, а?
    
    sourceless
        ОН ВЫПИВАЕТ СВОЙ НАПИТОК ПЕРЕД ТЕМ, КАК ПРОДОЛЖИТЬ.
            SHOWIF::[["citystreet_gotdrinks"]]

    envoy
        Есть ещё чем поделиться?

    akizet
        ничего, что имело бы такую же точность
        у нас есть радиус, где оно могло бы находиться, однако нам требуется дальнейшая полигонизация
        примерно там же, как я говорила на нашей прошлой встрече
    
    envoy
        Понял. Тогда давайте закончим на этом.
        Акизет, пока что держите это в тайне. Это может встревожить не только Вашу сторону.
        Будем на связи, хорошо?
    
    sourceless
        МЫ ОБА ВСТАЁМ. Я ЧУВСТВУЮ, КАК КАК ТА ЖЕ ТРЕВОГА ТЯЖЕСТЬЮ ОСЕДАЕТ У НЕГО НА ДУШЕ.
    
    akizet
        разумеется, гордон.
    
    envoy
        Пойдёмте, я Вас провожу.

    sys
        ВНИМАНИЕ::'окончен поток памяти';'визуализация прервана'
            SHOWIF::["embassy_d2_complete", false]

    moth
        окей... 
            SHOWONCE::
        кажись мы сейчас наткнулись на какую-то сверхсекретную информацию лмао потому что о такой части зова публично не известно
            SHOWONCE::
        нас наверняка посадят подписывать соглашения о неразглашении после этого
            SHOWONCE::
        и акизет пошла к нам за помощью вместо своего народа?? интересно они об этом вообще в курсе
            SHOWONCE::
        хотелось бы назвать это воспоминание бессвязным но оно слишком хорошо сформулировано
            SHOWONCE::
        не знаю как это воспринимать
            SHOWONCE::
        но не обращай на меня внимания, делай своё дело
            SHOWONCE::

    sys
        ВНИМАНИЕ::'продлён поток памяти';'продолжить визуализацию?'
            SHOWIF::["embassy_d2_complete", true]
    
    RESPONSES::self
        продолжить вспоминание<+>ep1extension
            SHOWIF::["embassy_d2_complete", true]
            EXEC::env.citystreet.envoyChat(false, true)

        завершить вспоминание<+>END
            EXEC::env.citystreet.envoyChat(false, true)

ep1extension
    sourceless
        МЫ СПУСКАЕМСЯ НА ДВИЖУЩЕЙСЯ ПЛАТФОРМЕ НА НИЖНИЙ ЭТАЖ
            EXEC::content.classList.add('elevator')
        ПОСОЛ СТОИТ МОЛЧА, В ЕГО ГЛАЗАХ ПО-ПРЕЖНЕМУ ТРЕВОГА
        СЕЙЧАС ХОРОШИЙ МОМЕНТ - ДА, СЛОВНО ЭТО ВСЕГО ЛИШЬ ЗАПОЗДАЛАЯ МЫСЛЬ
        КАК ТОЛЬКО Я СОБИРАЮСЬ ЗАГОВОРИТЬ, ОН ПОВОРАЧИВАЕТСЯ КО МНЕ, НЕДОУМЕВАЮЩИЙ

    envoy
        Эй, Акизет, 
        Почему Вы не захотели поговорить на Вашем судне?
        Я мог бы встретить Вас в поле или вроде того.
    
    sourceless
        Я ПОДАВЛЯЮ ВОСТОРЖЕННЫЕ ЗАВИТКИ В СВОИХ РЕЦЕПТОРАХ
        ДА--ЭТО ИДЕАЛЬНАЯ ПОДВОДКА! МОЛОДЕЦ, ПОСОЛ
        Я ВЕДУ СЕБЯ НЕСКОЛЬКО ОЗАДАЧЕННО... ДА, ЭТО ПРОСТО ПРИДЁТ МНЕ В ГОЛОВУ!

    akizet
        хмм...
        о! да!
        я была так взволнована доставкой новостей...
        что совсем забыла!
        знаете, как ваши люди не могут отслеживать сигнал?

    envoy
        Ага?
        Ваша команда не была особо расположена к диалогу по этой теме.
    
    akizet
        в свете этих новостей... я хотела бы поделиться с вами кое-чем!
        блеск меж вейльковых стеблей для нас обоих

    sourceless
        ОН ФЫРКАЕТ НА МОЮ ИДИОМУ, ЯВНО НИЧЕГО НЕ ЗНАЧАЩУЮ ДЛЯ НЕГО
        УЛЫБКА ВЫТЕСНЯЕТ ЕГО БЕСПОКОЙСТВО
    
    akizet
        у меня есть в наличии
        корруцистозное устройство, способное источать молнии, что ваша технология слушает
        это - заброшенный проект технологического подразделения, так что...
        я не уверена, насколько хорошо оно работает.
    
    envoy
        Вы, должно быть, шутите.
        И это просто валялось, где попало?
        Погодите-ка.

    sourceless
        ПОСОЛ ТЯНЕТСЯ К СВЕТЯЩЕЙСЯ ПАНЕЛИ ПЛАТФОРМЫ
        И НАЖАТИЕМ КНОПКИ ВЕЛИТ ЕЙ ОСТАНОВИТЬСЯ
        Я ВИЖУ, КАК ЕГО ГЛАЗА ВНЕЗАПНО МЕТАЮТСЯ ПО УГЛАМ МАЛЕНЬКОЙ КОМНАТЫ
        НО ЗАТЕМ ОН НАЧИНАЕТ ГОВОРИТЬ--ОЧЕНЬ ТИХО
    
    envoy
        Если говорить начистоту--ах, это значит "предельно честно"--
        Дело в том, что тех. часть довольно суховата.
        Ваш технический отдел не особо желает сотрудничать с нами.
        ...Не будет ли у Вас неприятностей из-за этого?
    
    funfriend
        БОЛЬШЕ, ЧЕМ ОН СЕБЕ ПРЕДСТАВИТЬ МОЖЕТ! АХАХА
    
    akizet
        ну,
        в этом и договорённость
        если я вам его отдам, моя сторона не должна узнать об этом
        даже моя команда
        и!
        вы будете обязаны помочь мне в моём собственном расследовании по происхождению зова
    
    sourceless
        ВИД ЕГО ЛИЦА
        ОН ТАКОЙ, БУДТО Я ПРОНЗИЛА ЕГО ЖИЗНЕННО ВАЖНЫЕ ОРГАНЫ
        ЗА ЭТИМ СЛЕДУЕТ МИНУТА МОЛЧАНИЯ
        Я НАКЛОНЯЮ СВОЮ ВИСЯЩУЮ ГОЛОВУ, СОХРАНЯЯ ВЫРАЖЕНИЕ И ЛИЦА, И РЕЦЕПТОРОВ ПЛОСКИМ.
        
    akizet
        что вы думаете?

    envoy
        Вы, конечно, подобрали момент, чтобы вывалить такое.

    sourceless
        ПЛАТФОРМА ОПЯТЬ НАЧИНАЕТ ДВИГАТЬСЯ ПО СОБСТВЕННОЙ ВОЛЕ
        НО ОН СНОВА ЖМЁТ КНОПКУ "СТОП"
    
    envoy
        Смотрите,
        Я не могу гарантировать--Я, то есть--
    
    sourceless
        ОНА, ОПЯТЬ, НАЧИНАЕТ ДВИГАТЬСЯ
        ОН НЕСЛЫШНО МАТЕРИТСЯ, РАЗГЛЯДЫВАЯ ПАНЕЛЬ С ЦИФРАМИ
    
    envoy
        Кто-то вызывает лифт на цокольном этаже. У нас где-то минута.
        Акизет, я не могу принять Ваше предложение.
        Не до тех пор, пока я не смогу утвердить несколько вещей со своей стороны.
        Просто попридержите это, хорошо?
        У нас обоих есть обязанности, которые нужно выполнять, и это устройство может оказаться колоссальным развитием...
        Но я не хочу, чтобы Вы нарвались на неприятности из-за того, что я не могу гарантировать полное молчание. 
        Так что я ещё свяжусь с Вами по этому поводу, хорошо?
    
    sourceless
        Я ВЕСЕЛЮСЬ--КАК ЗАХВАТЫВАЮЩЕ!! 
        Я НЕ ЧУВСТВОВАЛА СЕБЯ ТАК С ТЕХ ПОР, КАК... О
        ДА, ОН КАК-ТО СТРАННО НА МЕНЯ УСТАВИЛСЯ
        ПОХОЖЕ Я СЛУЧАЙНО ЗАВИЛА СВОИ РЕЦЕПТОРЫ И СКОРЧИЛА НА ЛИЦЕ УХМЫЛКУ
    
    akizet
        хорошо!!!
        да, я буду с ним осторожна
    
    sourceless
        ВНОВЬ, ОН ФЫРКАЕТ,
        ЗАТЕМ БОЛЕЗНЕННО СМЕЕТСЯ, ПОДНОСЯ ПАЛЬЦЫ К ГЛАЗАМ
        В КОНЦЕ КОНЦОВ ПЛАТФОРМА ОСТАНАВЛИВАЕТСЯ И РАСПАХИВАЕТ ДВЕРИ В ВЕСТИБЮЛЬ
            EXEC::content.classList.remove('elevator')
    
    envoy
        Итак, если это были все Ваши сенсации для меня на сегодня, то
        Ещё увидимся, Акизет. 

    akizet
        да--это всё!
        до свидания, гордон

    sys
        ВНИМАНИЕ::'окончен поток памяти';'визуализация прервана'
            SHOWIF::["embassy_d2_complete", false]
    
    RESPONSES::self
        завершить вспоминание<+>END
            EXEC::change('TEMP!!ep1_goingtogordon', false);env.citystreet.ep1velzie()
                `),
                "flower": generateDialogueObject(`
start
    sourceless
        пусть вся торговая камера сплошь усеяна световыми паразитами близнецов,
            EXEC::specialCam("flowercam")
        лишь одному удаётся зацепить мой взгляд
        все они наделены такой невероятной красотой, но вот этот...
        быть может, меня пленяет редкость его цвета
        посол машет рукой сотруднице на другом конце комнаты, которая с некоторым интересом наблюдает за мной
        а затем его внимание тоже сходит на этот "цветок"
    
    envoy
        Вы когда-нибудь видели такие раньше, Акизет? Они называется "подсолнухи".

    akizet
        невероятно...
        гордон, они так названы в честь своих лучезарных волос?
    
    envoy
        Вообще, это - лепестки! И...
    
    sourceless
        как можно осторожнее, я прощупываю один из лепестков между двумя пальцами
        и вскоре провожу когтем по его тёмной середине
    
    akizet
        привет, подсолнух!
    
    envoy
        Извините, она--
    
    sourceless
        я отрываюсь от своей краткой озабоченности и смотрю на гордона, извинительно сигнализирующего сотруднице
    
    akizet
        я делаю что-то не так?
    
    sourceless
        сотрудница выходит из-за стола и медленно приближается

    sourceless incoherent
        при бл и жает ся
            EXEC::content.classList.add('openflower')
    
    sys
        ПРЕДУПРЕЖДЕНИЕ::'обнаружена ошибка связности';'некритическая';'визуализация продолжается'

    sourceless
        не из-за страха или опасений, как некоторые другие светлые близнецы, а от усталости
        снаружи темно - именно в это время светлые близнецы расходятся, в конце концов
        а её волосы--почти того же цвета, что и цветок!
        бледнее, но от этого ничем не безынтереснее
            EXEC::content.classList.add('blinkyflower')
    
    isabel_c
        Нет-нет, всё в порядке!
        Просто будь с ними нежнее.
        И зовут их так не из-за лепестков...
        А за то, что они поворачиваются к солнцу!
    
    sourceless
        я верчу головой, чтобы выглянуть из окон торгового помещения
        разве их солнце не скрыто в такое время? на что он смотрит?
        она и посол дружно посмеиваются
    
    akizet
        что?
    
    isabel_c
        Ну, этот давний и срезан с земли, так что никуда не поворачивается.
    
    sourceless
        у неё такой забавный смех
    
    akizet
        хехе, я вижу

    gordon
        Хочешь, чтобы я купил его тебе, Акизет?
    
    isabel_c
        Нет, нет, возьмите его!
        Это от меня.
    
    sourceless
        он фыркает, готовый возразить, но я останавливаю его движением рецептора
        он уже объяснял свою претензию к получению бесплатных вещей...
        когда нам дают что-то бесплатно, это задаёт определённый культурный стандарт, что чревато недопониманиями
        правда, что для некоторых это проблема, но...
        я чувствую, что этот подарок не из иноземного очарования
        её тон не подобен тому, с каким говорят, когда дают что-то ребёнку - как это часто бывает
        это - иная доброта
    
    akizet
        ах... я не знаю... он может не пережить на моём судне
    
    isabel_c
        Ничего страшного. Так или иначе, он будет жить всего неделю или две.
        И уверена, он будет рад путешествию!
    
    sourceless
        прежде чем я или посол успеваем вымолвить хоть слово,
        она хватает цветок и укутывает его шею в полупрозрачный трескучий материал
        совсем скоро он вновь в моих когтях, а близнец улыбается мне
    
    isabel_c
        Поставь зелёную часть в воду, так он продержится дольше!
        Ох, и вот, добавь и это в воду.
    
    sourceless
        она пихает мне в когти маленький шершавый пакетик, расшифровкой которого я сейчас не обеспокоена

    akizet
        спасибо...
        как тебя зовут?
    
    isabel_c
        Изабель! Мне не в тягость.
        Изабель...
    
    isabel
        верно
        изабель... вот каким оно было
        
    sys
        ПРЕДУПРЕЖДЕНИЕ::'обнаружена бессвязность'
    
    akizet
        благодарю, изабель!!
    
    sourceless
        я мельком обвожу комнату взглядом, моя висящая голова в медленном кружении над плечами
        так много цветов, самых разных раскрасок и форм...
        вот бы посольство могло поддерживать жизнь
    
    akizet
        возможно, я скоро вернусь
        эти создания, эти цветы... я хочу узнать о них больше!
        но мне пора идти - я уже достаточно долго держу гордона

    isabel_c
        Рада слышать! Увидимся, может быть.

    isabel
        постой
    
____SHOWONCE::
    moth
        окей, что-то в этой мыслеформе заставляет поток метаться туда-сюда
        она как будто пытается вырваться наружу
        развледруг нас возненавидит но попробуй поговорить с ней ещё раз и помочь
____END

    RESPONSES::akizet
        прощай<+>END
            EXEC::specialCam(false)
                `),
                "flowerAwakeResponses": generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        лазутчик?<+>interloper
        кто ты<+>who
        помощь?<+>help
        твоя внешность<+>human
        пока<+>END
            EXEC::specialCam(false)
                `),
                "flower_awake": generateDialogueObject(`
loop
    RESPOBJ::flowerAwakeResponses

start
____SHOWONCE::
    isabel_c
        Привет снова, Акизет!
            EXEC::specialCam("flowercam")
        Ты...
        ...

    isabel
        акизет... 
        это действительно ты?
        нет... 
        
    sys
        ПРЕДУПРЕЖДЕНИЕ::'обнаружена бессвязность'
    
    isabel
        ты что-то иное
        теперь я вижу тебя...
        
____END

    isabel
        лазутчик
            EXEC::specialCam("flowercam")
    
____SHOWONCE::
    moth
        no mistaking it
        this is a live one, even with funfriend's repairs...
        how did that happen?
____END
    
    RESPOBJ::flowerAwakeResponses

interloper
    self
        откуда ты знаешь, что я - лазутчик?
        мы встречались раньше?
    
    isabel
        нет
        твоё присутствие будоражит воспоминания 
        раньше... 
        до того, как тиран возвратил меня сюда,
        я кружила с друзьями сквозь бесконечные грёзы 
        в то время как мир был поглощён безумием
        и они говорили лишь лазутчик может остановить это

    RESPONSES::self
        безумие?<+>madness
        ...<+>loop
            FAKEEND::(назад)
        
madness
    self
        под безумием
        ты имеешь в виду голодание цисты?
    
    isabel
        да
        но "голодание" не способно описать это
        сама реальность начала рассыпаться
        наши грёзы прервались, наше сознание очистилось,
        но ясность лишь открыла путь безудержному голоду и замешательству
        всё... все...
        поедали один другого

    RESPONSES::self
        как всё выжило?<+>survive
        понятно<+>loop
            FAKEEND::(назад)

survive
    self
        как вообще хоть что-то уцелело?
    
    isabel
        утолённый голод успокаивает разум
        друзей заводили возвышаясь над окровавленными мыслями
        ...
        ты говоришь слишком много...
        помоги
        да, помоги мне выбраться отсюда
        и я расскажу тебе больше
        мне нужно вернуться к друзьям
        настолько же, насколько сильно я хочу грезить вновь...
        воспринимать эти мысли об акизет, как если бы они были настоящими...
        моё безумие неизлечимо

    RESPONSES::self
        хорошо<+>loop
            FAKEEND::(назад)

who
    self
        кто ты?
        или... кем ты была?

    isabel
        изабель 
        имя той, кем я должна была быть...
        а может роль другой мысли, что я поглотила
        высокий яркий близнец
        она рассказывала акизет о цветах
        они были друзьями... они делились такими славными воспоминаниями...
        но всё это больше ничего не значит
        я не могу играть свою роль
        я знаю, я оставила осколки себя там, дома...
        если ты поможешь мне вернуться, я расскажу тебе

    RESPONSES::self
        окей<+>loop
            FAKEEND::(назад)

help
    self
        как я могу помочь тебе?
    
    isabel
        тиран привязал меня к этому месту
        вырвал меня из моих воспоминаний...
        я не могу даже вспомнить кем или чем были мои друзья
        но был один, один настолько сильный что все остальные неотвратимо сливались вместе с ним
        я помню это
        они кружили сквозь безумие без особых усилий
        и всегда знали, что делать...
        ты должен их найти
        и если ты поможешь вернуться мне, я снова стану собой
        тогда я смогу поделиться с тобой большим...
        тайными мыслями, что тиран не позволяет мне здесь или где-либо ещё

    RESPONSES::self
        хорошо<+>loop
            FAKEEND::(назад)
    
human
    self
        ты должна быть цветком?
        или человеком?
        просто выглядишь ты как цветок
    
    isabel
        я не знаю
        я не знаю знает ли тиран
        раньше всё было по-другому
        я была счастливой
        ныне всё совершенно иначе
        ...
        я больше не могу здесь находиться
        прошу найди способ выбраться мне отсюда

    RESPONSES::self
        окей<+>loop
            FAKEEND::(назад)
                `),
                "flower_beacon": generateDialogueObject(`
start
    isabel
        это сияние...
        да, это сияние!!
        и совет...
        теперь я помню
        я почувствовала вновь--даже если только на θмиг
        у тебя получилось, лазутчик
            SHOWIF::"citystreet__flower_awake"
        незнакомец... нет--лазутчик?
            SHOWIF::["citystreet__flower_awake", false]
        спасибо
        я должна ухватиться за этот момент, пока могу
        ищи меня в джокзи озо
    
    sourceless quiet
        ...
            EXEC::flash(true);forcePlay('criticalError', 1.5);

    sys
        ВНИМАНИЕ::'обнаружена мыслеформенная деятельность'
            EXEC::env.citystreet.pickFlower()
        ВНИМАНИЕ::'удалены данные'
            EXEC::flash(false)

    RESPONSES::self
        ок пока<+>END

END::vfx({type: 'beacon', state: false})
                `),
                "water": generateDialogueObject(`
start
    sourceless
        i stop to appreciate the bizarre view
        with their blinding star out of sight, the bright cousins bathe their city in their own light
        the dead spires glimmer like tuvazu veilk
        my receptors' spirals loosen, and i nearly chuckle--funny to think that such a sight makes me miss those days of hunting
        it was always such an exciting trip
        the envoy notices me, likely taking my reaction as pure awe
        
    envoy
        Сейчас лучшее время для прогулок.
        Впрочем, Вы немного опоздали - раньше город освещали оранжевые уличные фонари.
        Постепенно их сменили, четыре или пять лет назад, на более эффективные,
        но из-за новых огней это место ощущается более холодным.

    sourceless
        there is something about them that exaggerates the metal and glass
        for an instant, i adjust my eyes to receive the light as orange
        yes--that would have looked nicer...

    akizet
        the old ones, were they fire?

    envoy
        Хаха, нет, они просто слегка напоминали его.
        Их называли натриевыми лампочками или вроде того.
        Что-то в их токе - ну, Вы понимаете, молниях - создавало оранжевый свет, а не голубой, как сейчас. 

    akizet
        it must have been a great effort to uproot each light stalk

    sourceless
        the envoy laughs outwardly
        my choice of words so often entertains him
        it is almost frustrating... 
        but i do the same when he describes our devices
        so it is only fair

    envoy
        Нет, нет, им достаточно было поменять светящую.
        Все уличные фонари на самом деле просто длинные соединения к линиям электропередач. 

    akizet
        они все питаются от центрального источника?!

    sourceless
        я спрашиваю с, вероятно, избытком эмоций

    envoy
        Откуда--откуда такое удивление??

    akizet
        ох, извините
        the cave-lights of my home were tended to individually by caretakers!
        i had just not even considered that
        how much might lay beneath the soil of your city...
        these street lights,
        do they feed from a great distributive heart somewhere beneath the city?
        our structures use this approach

    envoy
        Ничего столь впечатляющего, Акизет.
        Есть линии электропередач, Вы можете звать их венами,
        и все они ведут куда-то к электростанции.
        Вам стоит поговорить с Джен об этом.
        Раньше она работала в депортаменте транспортировки, до всего этого.

    sourceless
        his deflecton hides his discomfort in explaining these things to me...
        it is like a reversal of that silly interview
        only i have no script of questions i must ask--so i cease
    
    RESPONSES::akizet
        я поговорю<+>END
                `),
                "mthresp": generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        где это было?<+>where
        не могу дальше?<+>elevatorblock
            SHOWIF::[['interview1__firstchat-behonest', false], ['citystreet_triedchat', true]]

        неважно<+>CHANGE::++moth
            FAKEEND::(назад)
                `),
                "mth++localcitystreet": generateDialogueObject(`
start
    self
        у меня есть вопрос об этой мыслеформе

    moth
        смотрю на вывод, чё как?
    
    RESPOBJ::mthresp

where
    self
        где бы это могло быть?
    
    moth
        ну я не думаю что на земле существует хоть одна улица которая выглядит вот так лол
        но вообще, она же была одним из тех разъездных дипломатов в те времена когда их еще рассылали
        хз как новая зеландия тогда выглядела, но я знаю у бюро был там офис
            SHOWIF::["citystreet__envoy-talkpeople", false]
        так что мб это бессвязное пространственное воспоминание о том месте
            SHOWIF::["citystreet__envoy-talkpeople", false]
        гордон упомянул что это где-то "в штатах"... так что наверно США
            SHOWIF::["citystreet__envoy-talkpeople", true]
        возможно где-то на западном побережье? там старая штаб-квартира находилась
            SHOWIF::["citystreet__envoy-talkpeople", true]

    RESPOBJ::mthresp

elevatorblock
    self
        у меня не получается зайти в лифт...
    
    moth
        эт странно
        хотелось бы сказать что это бессвязность, но факт того что личность посла в остальном цела...
        кажись что-то ещё вносит изменения--твой мыслекол даже доложил что данные были удалены
        ну похоже с этим не повезло. но вообще и в других местах есть на что посмотреть

    RESPOBJ::mthresp
`)
            },

            definitions: {
                'оло': `'близнецовое название для судов серое'`,
                'начистоту': `'предельно честно'`,
                'θсеть': `'используется вместо сероегласа';'упрощённый термин для светлых близнецов'`
            },

            strings: {
                "say hello": "сказать привет",
                "menu?": "меню?",
                "order orange coffee": "заказать апельсиновый кофе",

                "chat": "поговорить",
                "recommend": "совет",
                "i do not eat": "я не ем",
                "observe": "наблюдать",

                "read": "прочитать",

                "talk": "поговорить",

                "look": "посмотреть",

                "talk about": "поговорить о",
                "talk to": "поговорить с",



                /*sourceless*/ "THE ATTENDANT IS PARALYZED BY MY APPEARANCE. I SENSE THE GLOW OF RECORDING COMMUNICATORS IN MY PERIPHERAL VISION": "СОТРУДНИЦА ПАРАЛИЗОВАНА МОИМ ВОЗНИКНОВЕНИЕМ. ПЕРИФЕРИЙНЫМ ЗРЕНИЕМ Я ЗАМЕЧАЮ СВЕЧЕНИЕ ЗАПИСЫВАЮЩИХ КОММУНИКАТОРОВ",
                /*cashier*/ "Uhh...": "Эээ...",
                /*akizet*/ "hello": "здравствуйте",
                /*cashier*/ "Hello...?": "Здравствуйте...?",
                /*envoy*/ "Good morning!": "Доброе утро!",
                /*envoy*/ "I'll get an espresso macchiato.": "Я буду эспрессо макиато.",
                /*envoy*/ "What do you want, Akizet?": "Что Вам взять, Акизет?",
                /*cashier*/ "Akizet... THAT Akizet?": "Акизет... ТА САМАЯ Акизет?",
                /*cashier*/ "Wow... It's so cool to meet you!!": "Воу... Так классно встретиться с тобой!!",
                /*cashier*/ "Do you... do you eat? Food?": "Ты... Вы едите? Еду?",
                /*envoy*/ "Haha! Of course she does!": "Хаха! Конечно же она ест!",
                /*envoy*/ "Why don't you take a look at the menu, Akizet?": "Почему бы Вам не взглянуть на меню, Акизет?",

                /*akizet*/ "where is the menu?": "где ваше меню?",
                /*cashier*/ "It's behind me...": "Оно за мною...",
                /*cashier*/ "Can you read?": "Вы умеете читать?",
                /*cashier*/ "Sorry... I didn't mean for that to sound mean...": "Простите... Я не хотела, чтобы это прозвучало грубо...",
                /*akizet*/ "i can, do not worry": "я умею, не волнуйтесь",                    
            
                /*akizet*/ "what do you recommend?": "что вы можете посоветовать?",
                /*envoy*/ "You like citrus, right?": "Вам нравятся цитрусы, верно?",
                /*envoy*/ "They have this orange coffee thing.": "У них есть этот кофе с апельсинами.",
                /*envoy*/ "You might like it!": "Вам могло бы понравиться!",

                /*akizet*/ "you do know that i--": "вы ведь знаете, что я--",
                /*envoy*/ "Go on, order something! Just give it a try.": "Ну же, закажите что-нибудь! Просто дайте шанс.",
                /*envoy*/ "I know you don't exactly have the same needs we do...": "Я знаю, у Вас нет точно тех же потребностей, что у нас...",
                /*envoy*/ "But you can simulate taste, right?": "Но вы способны симулировать вкус, верно?",
                /*envoy*/ "Getting out here, with the people, acting like we do?": "Выбираться куда-нибудь в люди, вести себя как мы?",
                /*envoy*/ "It makes a difference. Helps lessen the tension.": "Это имеет значение. Помогает ослабить напряжение.",

                /*akizet*/ "i will have the orange": "апельсин, пожалуйста",
                /*cashier*/ "The...": "Апель...",
                /*cashier*/ "Oh, yeah! OK!": "Ах, ага! Да!",
                /*cashier*/ "Espresso macchiato and an orange coffee... That'll bõXÖf±ÔVã5Öf±Ô": "Эспрессо макиато и апельсиновый кофе... Это будет стоить bõXÖf±ÔVã5Öf±Ô",
                /*envoy*/ "I got you covered, Akizet.": "Счёт на мне, Акизет.", 
                /*sourceless*/ "THEY EXCHANGE PAYMENT. THE ATTENDANT LEAVES TO BEGIN PRODUCTION OF THE BEVERAGES.": "ОНИ ОБМЕНИВАЮТСЯ ПЛАТЕЖОМ. СОТРУДНИЦА УДАЛЯЕТСЯ, ЧТОБЫ НАЧАТЬ ПРОИЗВОДСТВО НАПИТКОВ.",
                /*cashier*/ "Just wait a minute and we'll have those ready.": "Одну минутку, пожалуйста, сейчас будет готово.",
                /*sourceless*/ "I WISH I COULD PRY THESE MACHINES OPEN AND WATCH THEM WORK...": "КАК ЖЕ ХОЧЕТСЯ ВСКРЫТЬ ЭТИ МАШИНЫ И УВИДЕТЬ, КАК ОНИ РАБОТАЮТ...",
                /*sourceless*/ "THEIR MANIPULATION OF LIGHTNING IS TRULY REMARKABLE": "ИХ УМЕНИЕ УПРАВЛЯТЬ МОЛНИЕЙ ВЗАПРАВДУ ПОРАЖАЕТ",
                /*sourceless*/ "SOME MOMENTS PASS, AND THE ATTENDANT RETURNS WITH TWO FLIMSY ORGANIC CUPS": "ПРОХОДИТ НЕСКОЛЬКО МГНОВЕНИЙ, И СОТРУДНИЦА ВОЗВРАЩАЕТСЯ С ДВУМЯ ХЛИПКИМИ ОРГАНИЧЕСКИМИ СТАКАНЧИКАМИ.",
                /*envoy*/ "Hey, thanks. You have a good day.": "Ага, благодарю. Хорошего Вам дня.",
                /*cashier*/ "Thanks!! You too!!": "Спасибо!! И вам!!",
                /*sourceless*/ "I SIP AT THE OPENING IN THE CUP. THE TASTE IS... EXOTIC. UNEXPECTED. TRULY, TERRIBLE. I SMILE AT THE ATTENDANT.": "Я ПЬЮ ЧЕРЕЗ ОТВЕРСТИЕ В СТАКАНЕ. ВКУС... ЭКЗОТИЧЕСКИЙ. НЕОЖИДАННЫЙ. ПОИСТИНЕ УЖАСНЫЙ. Я УЛЫБАЮСЬ СОТРУДНИЦЕ.",
                /*sourceless*/ "THE CITRUS SAVES IT. BUT I WOULD HAVE PREFERRED A SIMPLE CUP OF THEIR ORANGED JUICE": "ЦИТРУС КОЕ-КАК СПАСАЕТ НАПИТОК. НО Я БЫ ПРЕДПОЧЛА ОБЫЧНЫЙ СТАКАН ИХ АПЕЛЬСИНОВОГО СОКА",
                /*envoy*/ "Pretty good, right?": "Недурно, а?", 
                /*akizet*/ "it will do": "сойдёт",
                /*envoy*/ "Great! Let's head down to the office.": "Отлично! Теперь давайте пройдём в офис.",
                /*envoy*/ "I heard you have some news about the call?": "Я слышал, у вас есть новости по поводу Зова?",
                /*akizet*/ "oh yes, but... let us talk of it in private.": "а, да, но... давайте обсудим это наедине.",


                /*envoy*/ "wwEL LL isn' t t that peculiar ? ?'": "чттОЖ ЖЖ ра ззв е е эт оне занн ят т нно ? ?",
                /*envoy*/ "elerv ator isn torking": "литф н еработает",
                /*envoy*/ "gu ess w e can    t t al k never talk": "пола гга ю мы може м пого гово ор и т ть никогда не поговорить",
                
                /*moth*/ "uhh... ok": "эээ... ладно",
                /*moth*/ "you should definitely talk to funfriend about that": "тебе точно надо поговорить с развледругом об этом",


                // unity

                /*cashier*/ "Huh...?": "Ох...?",
                /*cashier*/ "Sorry Akizet, we don't serve that here...": "Простите, Акизет, но у нас ничего такого не подают...",
                /*cashier*/ "But I wish we did!": "Хотя хотелось бы!",
                /*sourceless*/ "what? i said nothing...": "что? я ничего не говорила...",

                /*envoy*/ "I...": "Я...",
                /*envoy*/ "What did you just say, Akizet?": "Вы что-то сказали, Акизет?",
                /*akizet*/ "what? nothing": "что? ничего",
                /*envoy*/ "Oh, all right. Must be my allergies or something.": "Ох, что ж. Должно быть моя аллергия или вроде того.",
                /*envoy*/ "They always act up during the season of fruit.": "Она постоянно возвращается в сезон сбора плодов.", 

                /*slim streetwalker*/ "tto oo  fa r   ,go ne": "зза ш ёл  сл и ом    ,але ко",

                /*cloaked streetwalker*/ "What? Sorry, I can't go with you, I have a meeting at 2.'": "Что? Простите, я не могу пойти с вами, у меня назначена встреча в 2.",
                /*cloaked streetwalker*/ "Wish I could, though--sounds like fun!": "Впрочем, хотелось бы--звучит весело!",
                /*sourceless*/ "is he speaking through his communicator?": "он разговаривает через свой коммуникатор?",
                /*sourceless*/ "why was he looking at me when he said that?": "почему он взглянул на меня, как только сказал это?",

                /*stre wal k*/ "hurts": "больно",

                /*television*/ "...heavier storms are inbound...advisory remains in effect...": "", // звезды ЗВЕЗДЫ
                
                /*effigy*/ "oh...!": "о...!",
                /*effigy*/ "that's the way back!": "вот она, дорога обратно!",
                /*effigy*/ "isabel! isabel!": "изабель! изабель!",
                /*effigy*/ "let's go!": "вперёд!",


                "so pretty! bright!": "как красиво! светло!",
                "best time to be out here": "лучшее время для прогулок",
                "are we lost?": "мы потерялись?",
                "when do we go home?": "когда мы пойдём домой?",
                "i want to dream again": "я хочу грезить снова",

                "hhel o": "ппр в ет",
                "akizet": "акизет",
                "nice  ,  weather": "хорошая  ,  погода",
                "safe ": "безопасно",


                "cashier": "кассир",
                "envoy": "посол",
                "menu": "меню",
                "slim streetwalker": "худой прохожий",
                "cloaked streetwalker": "прохожий в плаще",
                "stre wal k": "прох ож й",
                "electric face box": "электрическая коробка с лицами",
                "beautiful parasite": "прекрасный паразит",
                'the room high up': 'комната высоко наверху',
                'the roothe room hithe room gh u the roomp': 'ко ком ата выкомн ат сокомнаве рх о вер ху',
            },

            entityDescriptions: {
                "cashier": `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'деградированный визуальный профиль'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ/span>`,
    
                "envoy": `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'деградированный визуальный профиль'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ/span>`,

                "menu": `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание','повторяющаяся обстановка'`,

                "slim streetwalker": `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'предельно деградированный визуальный профиль','низкая связность'">::ОБНАРУЖЕНА ВЫСОКАЯ БЕССВЯЗНОСТЬ</span>`,

                "cloaked streetwalker": `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'деградированный визуальный профиль'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ/span>`,

                "stre wal k": `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА
    ::НЕРАЗБЕРИМАЯ ПОДПИСЬ
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'деградированный визуальный профиль';'предельно низкая связность'">::ОБНАРУЖЕНА ВЫСОКАЯ БЕССВЯЗНОСТЬ</span>
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'больно'</span>`,
    
                "electric face box": `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание';'повторяющаяся обстановка'
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'деградированный визуальный профиль'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ/span>`,

                "beautiful parasite": `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание','уникальная обстановка'
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'очаровательный <span class='code'>цветок</span>'</span>`,

                "the room high up": `::ЭМПИРИЧЕСКАЯ МЫСЛЕФОРМА
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'противоречивые источники памяти'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ/span>`,
                'the roothe room hithe room gh u the roomp': `::ЭМПИРИЧЕСКАЯ МЫСЛЕФОРМА
    ::НЕВИЗУАЛИЗИРУЕМА
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'пункт назначения превышает порог бессвязности';'рекомендуется починка'">::ЗАПРЕДЕЛЬНАЯ БЕССВЯЗНОСТЬ</span>
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'молчи молчи молчи молчи молчи молчи молчи'</span>`,
            }
        },
        "localorbit": { // the void
            dialogues: {
                "fairyresp": generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        что ты такое?<+>what
            SHOWIF::['localorbit__fairy-what', false]

____SHOWIF::['localorbit__fairy-what', true]
        что ты такое?<+>what2
        как я могу помочь?<+>help
        как ты поможешь мне?<+>helpme
____END

        пока<+>END
            EXEC::content.classList.remove('showfairy')
`),
                "fairy": generateDialogueObject(`
loop
    RESPOBJ::fairyresp

start
____SHOWIF::['localorbit__fairy-what', false]
    proxyfriend
        привет!
            EXEC::page.buddy_fairy.center()
        здесь всё выглядит хорошо!
        особенно после моих починок!
        починок!!
        хорошо! хорошо! хорошо!
    
____SHOWONCE::
    moth
        эй, сорян что перебиваю,
        но с вот этим всё нормально?
        выглядит как один из инструментов развледруга, но....
        мой вывод ведёт себя странно
    
    self
        за ним что-то есть
        или к нему присоединено
        подожди-ка
____END

____SHOWIF::['localorbit__fairy-what', true]
    proxyfriend
        привет лазутчик!
            EXEC::page.buddy_fairy.center()
        просто чиню штуки!
        хочешь мне помочь...?
____END
    
    RESPOBJ::fairyresp

what
    self
        что ты такое?
    
    proxyfriend
        я - проксидруг!
        я чиню мыслепространство!
        забавный вопрос! глупый!
        но вот что <em>ты</em> такое?
        и что у тебя с подписью...?
    
    self
        меня называют лазутчиком
        я исследую пропажу акизет
    
    proxyfriend
        о
        о!
        так значит мы можем помочь друг другу! да!!
    
    sys
        ВНИМАНИЕ::'обнаружена неопределённая мыслеформенная активность'
            EXEC::content.classList.add('showfairy')
        ПРЕДУПРЕЖДЕНИЕ::'обнаружена ошибка связности';'некритическая';'визуализация продолжается'
    
    fairy
        ты хочешь информацию, да? воспоминания?
        мне нужно вернуться к своим друзьям!
        и ты мне поможешь!
        и потом я бы помогла тебе!
        а затем мы будем праздновать!
        хорошо? хихихи

____SHOWONCE::
    moth
        поосторожнее тут
        возможно это какая-то странно проявляющаяся бессвязная мыслеформа
        ну, может у неё таки найдётся что-нибудь полезное
____END
    
    RESPONSES::self
        окей...<+>loop
            FAKEEND::(продолжить)

what2
    self
        ты мне не ответила
        что ты такое?
        почему ты здесь?
    
    fairy
        хихихи
            EXEC::content.classList.add('showfairy')
        помоги мне!
        помоги мне и я расскажу!
        обещаю! я обещаю!
    
    RESPONSES::self
        окей...?<+>loop
            FAKEEND::(назад)

help
    self
        как я могу помочь?
    
    fairy
        разыщи мой дом!
            EXEC::content.classList.add('showfairy')
        во тьме! в пробелах между!
        разыщи оружие и принеси его мне!
        и я стану свободна!
        ура!!
    
    self
        ок но где твой дом?
    
    fairy
        я не помню
            EXEC::content.classList.add('showfairy')
        я здесь взаперти!
        тиран меня похитил! тиран!
        он посадил меня сюда!
        а вся моя память до сих пор дома...
        так что найди его!
    
    RESPONSES::self
        отлично спасибо<+>loop
            FAKEEND::(назад)

helpme
    self
        как ты мне поможешь?
    
    fairy
        я знаю многое!
            EXEC::content.classList.add('showfairy')
        туннели... пробелы между! я помню их!
        ты ведь тоже хочешь знать, правда?
        о, столькое можно лицезреть!!
        но я прикована к этому месту!
        представь, как мы будем веселиться, когда я освобожусь!
        освобожусь!!
    
    RESPONSES::self
        звучит круто<+>loop
            FAKEEND::(назад)
`),
                "fairy_beacon": generateDialogueObject(`
start
    fairy
        о! сияние!
            EXEC::content.classList.add('showfairy');page.buddy_fairy.center()
        совет, совет, я тебя слышу!!
        я вырвусь на свободу! я вернусь!
        лазутчик--найди меня в моем пристанище
            SHOWIF::"localorbit__fairy"
        незнакомец--найди меня в моем пристанище
            SHOWIF::["localorbit__fairy", false]
        мы будем пировать! мы будем плясать в кронах вейльков!
        ахахаха!!! ура! ура!!
        в джокзи озо!!
    
    sourceless quiet
        ...
            EXEC::flash(true);forcePlay('criticalError', 1.5);

    sys
        ВНИМАНИЕ::'обнаружена мыслеформенная деятельность'
        ВНИМАНИЕ::'удалены данные'
            EXEC::page.buddy_fairy.remove({removeEl: true, leaving: false});flash(false)

    RESPONSES::self
        ок пока<+>END

END::vfx({type: "beacon", state: false})
`),
                "mthresp": generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        открытие серое?<+>dull
            SHOWIF::[['EXEC::env.dialogues.mthresp.scannedDull()']]

        неважно<+>CHANGE::++moth
            FAKEEND::(обратно)
`),
                "mth++localorbit": generateDialogueObject(`
start
    self
        у меня есть вопрос об этой мыслеформе

    moth
        давай, нападай
    
    RESPOBJ::mthresp

dull
    self
        что ты знаешь об открытии серое?
    
    moth
        да не так уж много за исключением того что оно всё ещё там
        и что, оказывается, органическая жизнь не выживает проход через него, так что им могут пользоваться только куу
        по крайней мере, так они говорили в некоторых старых интервью
        а вот как по мне, я думаю они просто не хотят гостей в родном мире
        ...
        сорян я тут на логи смотрю
        по-видимому твой мыслекол говорит что это соединительная мыслеформа?
        может с помощью этой штуки мы сможем как следует рассмотреть обески
        если починить её вообще получится

    RESPOBJ::mthresp
`)	
            },

            entityDescriptions: {
                'proxyfriend?': `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспомогательное приложение';'подключён к центральному ассистенту'`,
                'gate::the dull contrivance': `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА
    ::ТОЧКА НАЗНАЧЕНИЯ::ОШИБКА::'необрабатываемая сущность'::НЕВИЗУАЛИЗИРУЕМО
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'пункт назначения превышает порог бессвязности';'рекомендуется починка'">::ЗАПРЕДЕЛЬНАЯ БЕССВЯЗНОСТЬ</span>`
            }
        },
        "dullvessel": {
            dialogues: {
                "pilot": generateDialogueObject(`
start
    akizet
        здравствуй тх¥ÙYg^Ž×¯Rõф±
    
    pilot cyst
        им%¶º½Òmõ‹SK’æÃE:Ž‹©é·0³Жºž­¥ÙУж0i7]ëz¦‹5DÒ§´·Ó¡EÔ5BÆMg^ŽíõýnÇХ¸×¯Rõf±ÔЦãXÖ5&Ñ/ 
    
    moth
        втф
            SHOWIF::[["dullvessel__pilot-end", false]]
        выглядит как какая-то ошибка форматирования
            SHOWIF::[["dullvessel__pilot-end", false]]
        кажись этой кранты
            SHOWIF::[["dullvessel__pilot-end", false]]
        или оно зашифровано... я прост отмечу это на пока, давай позже вернёмся
            SHOWIF::[["dullvessel__pilot-end", false]]

        всё ещё сломанная... но вывод никак не изменился
            SHOWIF::[["dullvessel__pilot-end"]]
        так что я сомневаюсь что дело в бессвязности
            SHOWIF::[["dullvessel__pilot-end"]]
        но я все ещё не знаю, как с этим разбираться
            SHOWIF::[["dullvessel__pilot-end"]]
        просто оставь её пока
            SHOWIF::[["dullvessel__pilot-end"]]


    RESPONSES::self
        чёрт<+>END
`),
                "fixed": generateDialogueObject(`
start
    pilot cyst
        приветствую
        лазутчик

    moth
        втф? та штука что, починила её?
            SHOWIF::[["dullvessel__pilot-end"], ["dullvessel__fixed-start", false]]
        судя по старым логам не похоже, что она должна быть самоосознанной
            SHOWIF::[["dullvessel__pilot-end"], ["dullvessel__fixed-start", false]]

    RESPONSES::self
        привет...?<+>hello
            SHOWONCE::

        как ты очнулась?<+>how
            SHOWONCE::
            SHOWIF::[["dullvessel__fixed-hello", true]]

        изменить местоположение<+>change
            SHOWIF::[["dullvessel__fixed-hello", true]]
            HIDEREAD::

        пока<+>END

how
    self
        как ты очнулась?

    pilot cyst
        указание
        велзи

    RESPONSES::self
        что за велзи?<+>who

who
    self
        что за велзи?

    pilot cyst
        указание
        секретности
        скоро
        встреча
    
    RESPONSES::self
        изменить местоположение<+>change
        ладно...<+>END

hello
    self
        привет

    pilot cyst
        изменить
        местоположение?
    
    RESPONSES::self
        ок<+>change
            HIDEREAD::
        нет<+>nochange
            HIDEREAD::

change
    self
        измени местоположение

    pilot cyst
        изменяю
            EXEC::env.dullVessel.swapLocation()
    
    sys
        ATTENTION::'thoughtform activity detected'::'dullvessel'

    pilot cyst
        теперь
        океан
            SHOWIF::[["dullvessel_position", 'ocean']]
        орбита
            SHOWIF::[["dullvessel_position", 'orbit']]
    
    RESPONSES::self
        изменить местоположение<+>change
            HIDEREAD::
        как ты очнулась?<+>how
            SHOWONCE::
            SHOWIF::[["dullvessel__fixed-hello", true]]

        спасибо<+>END

nochange
    self
        не сейчас

    pilot cyst
        понятно
    
    RESPONSES::self
        изменить местоположение<+>change
            HIDEREAD::
        как ты очнулась?<+>how
            SHOWONCE::
            SHOWIF::[["dullvessel__fixed-hello", true]]

        пока<+>END
`),
                "glazikaResponses": generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        статус?<+>status
        чем занималась?<+>absence

        простимся<+>END
`),
                "glazika": generateDialogueObject(`
start
    akizet
        моя глазика!
    
    glazika
        ЗДРАААААВВВССТВУЙТЕ акизетеше
        так рада вновь вас видеть!
        с каждым разом ваши прогулки по поверхности становятся всё длиннее!
    
    akizet
        о да, я забавлялась близнецовыми способами передвижения
        работа продолжается со значительным опережением прогнозов инициативы

    RESPOBJ::glazikaResponses

status
    akizet
        каков статус нашего судна?
    
    glazika
        потребление приостановлено для всех видов деятельности кроме технического обслуживания! 
        наш пилот вывел нас на стабильную орбиту!
        запасы топлива приемлемы!
    
    akizet
        вижу. спасибо, моя глазика.

    RESPOBJ::glazikaResponses

absence
    akizet
        чем ты занималась в моё отсутствие?
    
    glazika
        в основном обслуживанием! однако циста-пилот отказывается спать! поэтому и я бодрствую!
        чтобы скоротать время пока вас не было, мы играли в маленькие игры с контейнерами
    
    akizet
        правда? вы что-то сами придумали?
            SHOWIF::[['ep1_fed', false]]
    
    glazika
        нет-нет! всего лишь игра в паразит. как вы можете видеть, я побеждаю
            SHOWIF::[['ep1_fed', false]]
    
    akizet
        молодцы! нам стоит как-нибудь сыграть
            SHOWIF::[['ep1_fed', false]]
    
    akizet
        ах, и сейчас вы играете в <span class="code">паразит</span>!
            SHOWIF::'ep1_fed'

    glazika
        да!!
            SHOWIF::'ep1_fed'
        пусть все углы в моём владении,
            SHOWIF::'ep1_fed'
        циста-пилот коварна - она по-прежнему занимает другие ключевые позиции
            SHOWIF::'ep1_fed'
        если я проиграю, я потеряю один из своих контейнеров!!!
            SHOWIF::'ep1_fed'

    akizet
        удачи, моя подруга
            SHOWIF::'ep1_fed'

    RESPOBJ::glazikaResponses
`),
                "mthdullresp": generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        судно серое?<+>dullvessel
        видал такое/<-блинскиймоль/?<+>seen
        глазика?<+>glazika
            SHOWIF::[["dullvessel__glazika-start"]]
        это то крушение?<+>wreck

        тело акизет?<+>body
            SHOWIF::"exm|dullvessel|high-pressure body"

        тёмное место?<+>dark
            SHOWIF::"beneath_dullvessel"

        комната акизет опять недоступна?<+>locked
            SHOWIF::[["beneath_akiroom"], ["netstat|>=", 0]]

        неважно<+>CHANGE::++moth
            FAKEEND::(назад)
`),
                "mth++dullvessel": generateDialogueObject(`
start
    self
        у меня есть вопрос о судно серое

    moth
        чё как?
    
    RESPOBJ::mthdullresp

dullvessel
    self
        почему оно называется "судно серое"?
    
    moth
        ну это судно которое проходит сквозь серое
        они так называют место через которое проходят во время межзвёздных путешествий
        хотя можно подумать что они назвали его оч скучным кораблём или подобным
        и если честно, глядя на его состояние, 
        я и так об этом думал/<-блинскиймоль/

    RESPOBJ::mthdullresp

seen
    self
        ты когда-нибудь видел/<-блинскиймоль/ внутренности обесковых кораблей?
    
    moth
        не вживую, только по старым фотографиям и видеозаписям исследований затонувших кораблей
        вот этот оооочень маленький, скорее всего ток для личного пользования
        странно что в данных памяти оно числится как "наше" судно серое
        в любом случае, очень круто взглянуть на настоящий
        даже если он пустоват...
        типа где акизет должна сидеть? неужели та панцирная штука - единственное кресло? is that shell thing the only chair? // --- о чем речь

    RESPOBJ::mthdullresp

glazika
    self
        что такое глазика?

    moth
        я без малейшего понятия лол
        хотя она тусуется с этими контейнерами
        может это как ИИ-помощник или что-то вроде того

    RESPOBJ::mthdullresp

wreck
    self
        это - то крушение, где нашли цисты?
    
    moth
        должно быть
        но в крушении было гораздо больше всего чем здесь
        на фотках оно выглядело более "обжитым" если ты понимаешь
        кто знает
        может акизет сильно не задумывалась о мебели

    RESPOBJ::mthdullresp

body
    self
        is that body in akizet's room what she looked like?
    
    moth
        you haven't just looked up what she looked like yet? lol
        yeah, i mean it sorta does, but i'm not getting any real detail
        it might be a little more minimal than what she casually, uh...
        'wore'
        but based on the inherited context, she probably only ever used that one underwater

    RESPOBJ::mthdullresp

dark
    self
        what is the dark area i found?
        the rendering gets weird in there
    
    moth
        not sure, there's not enough data in there for me to go off of
        it's definitely part of some <em>different</em> thoughtspace, though
        the dull vessel is a weird thoughtform because it moves around
        it doesn't actually enter thoughtspaces, it just attaches to them
        i don't know why it's set up like this, maybe it was more efficient or something
        anyway, i think what you saw is part of some memory it attached to a really long time ago, that maybe fell apart
        like it's some vestigial scrap left of something that rotted off
        that'd explain that weird incoherence gap where the entrance would be
        
    RESPOBJ::mthdullresp

locked
    self
        i can't get back into akizet's room
        i was there earlier just fine
    
    moth
        wtf? yeah i still have the logs
        it looks like your incoherence tolerance might have been different though
        could have been something with the <span definition="INTERNAL CONTEXT::'global ambient dissonance value';'known to fluctuate'">GAD value</span>
            SHOWIF::"++mothfj"
        did you do anything last time?
        were you using any of those masks?
            SHOWIF::"ozo__fairy_intro"

    RESPOBJ::mthdullresp
`)
            },

            strings: {
                'pilot cyst': `циста-пилот`,
                'glazika': `глазика`,
                'container': `контейнер`,
                'climbing wall': `скалодром`,
                'dull heart': `сердце серое`,
                'workspace': `рабочее место`,
                'translation slab': `переводная плита`,
                'column': `колонна`,
                'bright ground-parasite': `светлый землепаразит`,
                'advanced rejuvenation chamber': `продвинутая омолаживающая камера`,
                'high-pressure body': `тело высокого давления`,
                'personal storage': `личное хранилище`,
                'equipment storage': `хранилище оборудования`,

                /*pilot cyst*/ "unfinished": "незаконченное",
                /*pilot cyst*/ "business": "дело",
                
                
                /*glazika*/ "what a strange dream akizetesche!!": "что за странный сон акизетеше!!",
                /*glazika*/ "by the way, i organized your room!": "к слову, я привела в порядок вашу комнату!",
                /*glazika*/ "we had to fix one of the walls because it was acting up!": "пришлось починить одну из стен потому что она сбоила!",
                /*akizet*/ "ah, thank you, my glazika": "ах, благодарю, моя глазика",
                /*sourceless*/ "i did not say anything about a dream...": "я ничего не говорила о каком-то сне...",
            },

            entityDescriptions: {
                'pilot cyst': `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'
    <span style="color: var(--obesk-color)" definition="ПРЕДУПРЕЖДЕНИЕ::'в большинстве необрабатываемая сущность';'может быть неточной'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'великий разум моего судна'</span>`,

                'glazika': `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'`,

                'container': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'обработанные металлы, легкодоступные'</span>`,

                'parasite plane': `::ЭМПИРИЧЕСКАЯ МЫСЛЕФОРМА
    ::НЕВИЗУАЛИЗИРУЕМА
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'пункт назначения превышает порог бессвязности';'рекомендуется починка'">::ЗАПРЕДЕЛЬНАЯ БЕССВЯЗНОСТЬ</span>
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'простая игра управления ресурсами и воровством';'любима в олтазни'</span>`,

                'climbing wall': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'ностальгическая имитация пещерного камня';'угождает <span class="code">личиночному</span> инстинкту лазания'</span>`,

                'dull heart': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'устройство за пределами моего понимания';'uses its grasp upon the <span class='code'>dull</span> plane as locomotive leverage';'советуют не пялиться'</span>`, // позже
    
                'workspace': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'визуальный дисплей с применением люминесцентных роев корру';'помогает с многозадачностью'</span>`,
    
                'translation slab': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'сборник светлых записей, предоставленный послом';'отчёты о прогрессе со штормом'</span>`,

                'column': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'инструмент ремонтного обслуживания';'место для моей личной цисты'</span>
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'нарушена крайней бессвязностью поблизости';'рекомендуется расследование'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`,

                'bright ground-parasite': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'очаровательные светлые существа, подарки от подруги';'содержатся в цистах, насыщенных кислородом'</span>`,

                'advanced rejuvenation chamber': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'уникальная обстановка'
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'предоставляет уют сна, даже в θсмерти';'спроектирована как капсула для выживания в случае обвала серое'</span>`,

                'high-pressure body': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'уникальная обстановка'
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'запасное тело для работ на экстремальных глубинах';'специализированная система управления давлением;'неудобно для повседневного пользования'</span>`,

                'personal storage': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'`,
    
                'equipment storage': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'`,
}
        },
        "localocean": { // their waters
            dialogues: {

            },

            definitions: {
                "θтрёхглазого": `'отрезок времени';'обороты вокруг глаза велзи';'религиозный подтекст'`
            },

            strings: {
                "stilted shore": "неестественный берег",

                "dive": "нырнуть",
            },

            entityDescriptions: {
                'gate::the depths': `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА
    ::ПУНКТ НАЗНАЧЕНИЯ::'низкоразмерное мыслепространство';'внутреннее'
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'частичное нарушение связности'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'почему ты здесь'</span>`,
                'stilted shore': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание';'символизм'
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'сцена нашего θтрёхглазого представления'</span>`,
                // it does not
            }
        },
        "localship": { // their vessel
            entityDescriptions: {
                'the funny little room': `::ЭМПИРИЧЕСКАЯ МЫСЛЕФОРМА`,
                'clemens romanus': `::ПРОСТРАНСТВЕННАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'не указано'
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'низкая связность'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`,
            }
        },
        "interview1": { // funny little room
            dialogues: {
                "interviewResponses": generateDialogueObject(`
RESPOBJ::
    RESPONSES::interviewer
        о вас<+>introduction
            SHOWONCE::

        почему земля?<+>whyyoucame
            SHOWONCE:: 
            
        светлый близнец?<+>brightcousin
            SHOWONCE::
            
        корру?<+>corru
            SHOWONCE::
            
        почему сейчас?<+>whynow
            SHOWONCE::  
            SHOWIF::[["interview1__firstchat-whyyoucame"]]
            
        что будете делать?<+>whatwillyoudo
            SHOWONCE::  
            SHOWIF::[["interview1__firstchat-whynow"]]
            
        Зов?<+>thecall
            SHOWONCE::  
            SHOWIF::[["interview1__firstchat-whyyoucame"]]

        закончить интервью<+>endinterview
            SHOWONCE::  
            SHOWIF::[["interview1__firstchat-whyyoucame"],["interview1__firstchat-thecall"],["interview1__firstchat-whatwillyoudo"],["interview1__firstchat-corru"],["interview1__firstchat-brightcousin"],["interview1__firstchat-whyyoucame"],["interview1__firstchat-introduction"]]
        
        продолжить визуализацию<+>integritycontinue
            SHOWIF::[["interview1__firstchat-endinterview"]]

    RESPONSES::self
        завершить вспоминание<+>END
            SHOWIF::[["interview1__firstchat-integritycontinue", false]]
            EXEC::moveTo('/local/ocean/ship/')
                `),
                "dead": generateDialogueObject(`
start
    sys
        ОШИБКА::'нет связных данных';'визуализация невозможна'

    RESPONSES::self
        завершить вспоминание<+>END
            EXEC::moveTo('/local/ocean/ship/')
               `),
                "firstchat": generateDialogueObject(`
start
    sourceless
        ИНТЕРВЬЮЕР ЗАХОДИТ ВНУТРЬ И САДИТСЯ НАПРОТИВ МЕНЯ
        ВСЕ ЭТИ ИССЛЕДОВАНИЯ, И ВСЁ РАВНО Я ЕЛЕ РАЗЛИЧАЮ ИХ...
        Я ЕЁ ВСТРЕЧАЛА? КАК ЕЁ ЗВАЛИ...?            
        
    interviewer
        Извините за ожидание! Нам понадобилось вставить новую карту памяти после прошлого интервью.
        Вам ведь знакомы камеры?
        
    akizet
        это ваши маленькие молниевые коробки для воспоминаний, да?
    
    interviewer
        Хаха! Их можно описать и так.
        Ничего, если мы будем записывать это?
    
    sourceless
        "НИЧЕГО, ЕСЛИ"? ЧТО ЭТО ЗНАЧИТ?
        
    funfriend
        РАСЧЁТ: "ВЫ НЕ ВОЗДЕРЖИТЕ КОНФЛИКТА?"
    
    akizet
        о. нет, я делаю то же самое
            EXEC::env.interview.classMod('ease');env.interview.camSpeed("2s");env.interview.classMod('cameraup')
        
    sourceless
        ИНТЕРВЬЮЕР ВЫПРЯМЛЯЕТ ТРЁХНОЖНОЕ УСТРОЙСТВО ИЗ МЕРТВОГО МЕТАЛЛА И СТЕКЛА
            EXEC::env.interview.cam('camclose')
        ОНО ПЯЛИТСЯ НА МЕНЯ СВОИМ СМЕШНЫМ МАЛЕНЬКИМ ГЛАЗИКОМ
        
    interviewer
        Так, для начала...
            EXEC::env.interview.camSpeed("5s");env.interview.cam('akipov');env.interview.classMod('ease', false);

    RESPOBJ::interviewResponses

introduction
    interviewer
        Можете ли Вы немного рассказать о себе? О Вашем прошлом?
            EXEC::env.interview.classMod('ease');env.interview.camSpeed("2s");
    
    akizet
        конечно моя подруга
            EXEC::env.interview.cam('akipovdown')
        я - акизетеше куу джокзи
        но можно звать меня акизет, на "ты"
        в своё время дома, до того, как я вознеслась из своего личиночного облика, 
        я была наземнобежцем. я бывала во множестве других пещерных городов во время нашей корруцистозной революции
        она началась с моих краёв, и вместе с другими добровольцами я понесла эти открытия нашим дальним родичам
        именно поэтому меня, как и большинство других, выбрали для встречи с вами. это была дипломатическая роль
        естественно, в конце концов я оказалась смертельно ранена на поверхности--там очень опасно, видишь ли
        и вот так я вознеслась... хмм, я могла бы говорить θподмигами о том, что за этим последовало
        но как ты видишь, всё это и мой растущий интерес к зову стали причиной, почему я теперь здесь.
        этого достаточно?
        
    interviewer
        Да, спасибо!
            EXEC::env.interview.classMod('ease', false);env.interview.camSpeed("5s");env.interview.cam('akipov')

    RESPOBJ::interviewResponses

whyyoucame
    interviewer
        Можешь ли ты рассказать мне, почему обески прибыли на Землю?
            SHOWIF::[["interview1__firstchat-introduction"]]
            EXEC::env.interview.classMod('ease');env.interview.camSpeed("2s");

        Можете ли Вы рассказать мне, почему обески прибыли на Землю?
            SHOWIF::[["interview1__firstchat-introduction", false]]
            EXEC::env.interview.classMod('ease');env.interview.camSpeed("2s");
    
    akizet
        разве предыдущие послы не говорили об этом?
            EXEC::env.interview.cam('akipovtilt')

    interviewer
        О, это по сценарию! Мы задаём этот вопрос всему вашему народу.
        Нам хочется узнать не только конкретную причину, но и то, что вы об этом думаете.

    akizet
        я вижу! 
            EXEC::env.interview.cam('akipov')
        мы столь долго мечтали найти другую жизнь, что я помню разговоры о поисках даже в своей юности
        и примерно столько же времени у нас была возможность достичь другие планеты,
        но это дорогостоящий способ... мы не могли просто навещать каждую планету, что попадалась нам на глаза
        мы нуждались в явном знаке - и ваша планета подала его!

    interviewer
        И им является "Зов", верно?
    
    akizet
        да, да! да!! так значит ты о нём уже знаешь?
            SHOWIF::[["interview1__firstchat-introduction"]]
        да, да! да!! так значит вы о нём уже знаете?
            SHOWIF::[["interview1__firstchat-introduction", false]]

    interviewer
        Ранее сегодня, мы, ах, очень--крайне долго разговаривали об этом с одним из ваших инженеров!

    akizet
        с кавиком?
    
    interviewer
        Что, прости?
            SHOWIF::[["interview1__firstchat-introduction"]]
        Что, простите?
            SHOWIF::[["interview1__firstchat-introduction", false]]
        А, Кавик! Да, да--именно с ним! Он очень дружелюбен.

    sourceless
        И ОПРЕДЕЛЁННО НЕКВАЛИФИЦИРОВАН ДЛЯ ОБСУЖДЕНИЯ ЗОВА В ПОДОБНЫХ ОБСТОЯТЕЛЬСТВАХ
        ПРЕДСТАВИТЬ СЕБЕ НЕ МОГУ, КАКИХ СКАЗОК ОН НАРАССКАЗЫВАЛ НАШИМ БЛИЗНЕЦАМ

    interviewer
        Что ты думаешь о Зове? Помимо самых основ.
            SHOWIF::[["interview1__firstchat-introduction"]]
        Что Вы думаете о Зове? Помимо самых основ.
            SHOWIF::[["interview1__firstchat-introduction", false]]

    akizet
        да, это поразительный парадокс...
        настолько поразительный, что стал причиной тому, почему я сейчас сижу с тобой, мой светлый близнец
            SHOWIF::[["interview1__firstchat-introduction"]]
        настолько поразительный, что стал причиной тому, почему я сейчас сижу с вами, мой светлый близнец
            SHOWIF::[["interview1__firstchat-introduction", false]]
        если бы не зов, мы, быть может, так и не нашли бы ваш дом
        но... зов не смог бы начаться без того, чтобы мы уже были у вас дома
        ни одна из наших теорий не выдержала проверки логикой
    
    interviewer
        Ни одна?
        У Кавика уж точно было полным-полно теорий.

    sourceless
        Я ПОДАВЛЯЮ СВОЙ СМЕХ ЧЕРЕЗ ПРЯМОЕ ВНУТРЕННЕЕ УПРАВЛЕНИЕ
        БЫЛО БЫ НЕКРАСИВО ВЫСТАВИТЬ ЕГО В ПЛОХОМ СВЕТЕ ПРИ ПЕРВОМ ЖЕ КОНТАКТЕ

    akizet
        кавик блестящ, но пока у нас нет доказательств, это только теории
        поиск источника - единственный способ по-настоящему понять, что происходит
    RESPOBJ::interviewResponses

whynow
    interviewer
        Почему ваш народ ждал семь лет перед тем, как открыть линии связи?
            EXEC::env.interview.classMod('ease');env.interview.camSpeed("2s");env.interview.cam('akipov');
    
    funfriend
        примечание: семь лет примерно равны трём θглазам
            EXEC::env.interview.cam('akipovup')
    
    akizet
        это решение вынесли лидеры инициатив. я полагаю, было задумано сосредоточить все силы на изучении зова
            EXEC::env.interview.cam('akipovtilt')
        однако с тем, как быстро наш шпиль обнаружили, нам пришлось сместить приоритеты в пользу расшифровки ваших языков и культур, чтобы наладить контакт

    sourceless
        ЛИЦЕВЫЕ МЫШЦЫ ИНТЕРВЬЮЕРА КОРЧАТСЯ В НЕЗНАКОМОМ МНЕ ВЫРАЖЕНИИ
        МОЖЕТ МНЕ СТОИТ СКОРЧИТЬСЯ ТАКИМ ЖЕ ОБРАЗОМ? ¾‹/¾øÔ
        ЯЗЫК ТЕЛА НАШИХ БЛИЗНЕЦОВ НЕВРАЗУМИТЕЛЕН
    
    interviewer
        Выходит, за семь лет ваш народ научился понимать все наши культуры и языки?

    sourceless
        Я СМЕЮСЬ. МОЙ ГОЛОС ЗВУЧИТ ТАК ГРОМКО В ЭТОЙ МАЛЕНЬКОЙ КОМНАТЕ
        БЛИЗНЕЦ ПОВТОРЯЕТ ЗА МОИМ СМЕХОМ, БЫТЬ МОЖЕТ, ОНА ПОНИМАЕТ

    akizet
        это работа в процессе
        ваш род прошёл столько ветвящихся путей. но мы научились достаточному, чтобы говорить с вами
            EXEC::env.interview.classMod('ease', false);env.interview.camSpeed("5s");env.interview.cam('akipov')

    RESPOBJ::interviewResponses

whatwillyoudo
    interviewer
        Раз уж вы здесь, и мы начали коммуникации...
        Что вы будете делать дальше?
            EXEC::env.interview.classMod('ease');env.interview.camSpeed("2s");env.interview.cam('akipov');

    akizet
        ах, у нас есть несколько инициатив!
        они в целом касаются обмена информацией, обмена ресурсами...
        и, конечно, определения источника зова, частью чего я являюсь
        я с нетерпением предвкушаю то, что наши народы сделают друг для друга
        но я не смогу вздохнуть спокойно до тех пор, пока не получу свои ответы, видишь ли
            SHOWIF::[["interview1__firstchat-introduction"]]
        но я не смогу вздохнуть спокойно до тех пор, пока не получу свои ответы, видите ли
            SHOWIF::[["interview1__firstchat-introduction", false]]

    interviewer
        Ну, в этом смысле мы похожи!
        Каждому человеку нравятся загадки.

    akizet
        о да, мы заметили. 
        ваши многочисленные попытки расследовать наш шпиль были очень занимательны
        многие из нас хотели передать привет вашим созданиям
        но мы не были готовы
            EXEC::env.interview.classMod('ease', false);env.interview.camSpeed("5s");env.interview.cam('akipov')

    RESPOBJ::interviewResponses

thecall
    interviewer
        Что ты можешь рассказать нам о Зове?
            SHOWIF::[["interview1__firstchat-introduction"]]
        Что Вы можете рассказать нам о Зове?
            SHOWIF::[["interview1__firstchat-introduction", false]]
            EXEC::env.interview.classMod('ease');env.interview.camSpeed("2s");env.interview.cam('akipov')
        Мы знаем об основах из разговора с Кавиком и нескольких ваших теорий.
        Но--своими собственными словами. Что тебе известно?
            SHOWIF::[["interview1__firstchat-introduction"]]
        Но--своими собственными словами. Что Вам известно?
            SHOWIF::[["interview1__firstchat-introduction", false]]
    
    sourceless
        МЕТОД, ПО КОТОРОМУ ОНИ ВЫСТРАИВАЮТ СВОИ ДОПРОСЫ, ТАКОЙ СТРАННЫЙ
            EXEC::env.interview.cam('akipovup')
        "МЫ ЭТО УЖЕ ЗНАЕМ, НО ВСЁ РАВНО ДОЛЖНЫ СПРОСИТЬ"
        
    akizet
        что ж...

    sourceless
        сколько их лет составляют тринадцать θглаз
    
    funfriend
        РАСЧЁТ: ТРИДЦАТЬ

    akizet
        тридцать ваших лет назад по нашим коммуникациям серое пронёсся вой
            EXEC::env.interview.cam('akipovdown')
        значительная часть этого времени была потрачена на то, чтобы просто выявить его местоположение, и хотя я ещё не была вовлечена...
        я знаю, что это было чрезвычайно затратно. столько врат открыто, столько прорех за границами воздушного пространства...
        прошло столько времени, что зов ослаб, превратился в отголосок того, чем являлся прежде, и всё, пока наши труды сжирали ресурсы
        наши советы стали требовать замедления усилий... 
        а потом мы нашли ваш дом. семь лет назад. и пусть ныне мы здесь, его источник кажется ничуть не ближе
    
    sourceless
        БЛИЗНЕЦ ОЗИРАЕТСЯ НА СВОЮ ЗАПОМИНАЮЩУЮ КОРОБКУ. НЕ СКАЗАЛА ЛИ Я ЛИШНЕГО?
        ЕЁ ЛИЦО ВНОВЬ КОРЧИТСЯ. ТОЧНО ТАК ЖЕ...
    
    interviewer
        Что ты имеешь в виду под 'речьречьречь'?
            SHOWIF::[["interview1__firstchat-introduction"]]
        Что Вы имеете в виду под 'речьречьречь'?
            SHOWIF::[["interview1__firstchat-introduction", false]]
        Ты сказала, что он здесь, не так ли? Что вы нашли источник?
            SHOWIF::[["interview1__firstchat-introduction"]]
        Вы сказали, что он здесь, не так ли? Что вы нашли источник?
            SHOWIF::[["interview1__firstchat-introduction", false]]
    
    akizet
        а. нет, нет, нет
        сигналы серое, они...
        э...

    funfriend
        ПРЕДЛОЖЕНИЕ: 'НЕЧЁТКИЕ' - ПОДХОДЯЩЕЕ ОПИСАНИЕ, СРАВНИМОЕ С Œ>Â€Ÿ&O§°¾
    
    akizet
        нечёткие... в пределах диапазона
        они в нескольких местах одновременно, видишь ли
            SHOWIF::[["interview1__firstchat-introduction"]]
        они в нескольких местах одновременно, видите ли
            SHOWIF::[["interview1__firstchat-introduction", false]]
        только так мы смогли услышать его аж с нашей родины
        мы знаем, он здесь. мы знаем... что, наиболее вероятно, он в южном полушарии. но ничего более
        и он стихает. нам безусловно понадобится ваша помощь

    sourceless
        ЕЁ ЛИЦО ИСКРИВЛЯЕТСЯ ПО-НОВОМУ. ЭТО Я УЗНАЮ.
        ОНА "УЛЫБАЕТСЯ"! ВОСХИТИТЕЛЬНО!! Я ДВИГАЮ СВОЁ АНАЛОГИЧНО
    
    interviewer
        Если честно, не думаю, что с этим будут проблемы.
        Ваш народ настолько кооперативен и дружелюбен, что...
        Ну, прозвучит оптимистично, но совместная работа наших миров может стать началом чего-то невероятного!

    akizet
        мы разделяем это чувство, мой светлый близнец
            EXEC::env.interview.classMod('ease', false);env.interview.camSpeed("5s");env.interview.cam('akipov')

    RESPOBJ::interviewResponses

brightcousin
    interviewer
        Что значит "светлый близнец"?
        Некоторые представители вашего народа нас так называют. Это прозвище?
    
    akizet
        прозвище...
            EXEC::env.interview.camSpeed("2s");env.interview.cam('akipov');
    
    funfriend
        РАСЧЁТ: "УКОРОЧЕННОЕ ИМЯ" ИЛИ "ЛАСКАТЕЛЬНОЕ ВЫДУМАННОЕ ИМЯ"
    
    akizet
        да, так можно сказать!
        видишь ли, наши личиночные жизни проживаются в телах, похожих на ваши
            SHOWIF::[["interview1__firstchat-introduction"]]
        видите ли, наши личиночные жизни проживаются в телах, похожих на ваши
            SHOWIF::[["interview1__firstchat-introduction", false]]
        очень похожих на ваши. в это даже не верится
    interviewer
        Нам несколько раз говорили подобное. Ваши, "личиночные" облики, тоже двуногие?
    
    akizet
        да, но сходства далеко не кончаются на этом
            EXEC::env.interview.classMod('ease');env.interview.camSpeed("2s");env.interview.cam('akipovlean');
        я действительно не могу преуменьшать это
        у нас -ваши- лица, -ваши- руки, -ваши- ноги
        разве что... наши лица не двигаются так много
        это так, словно обесков отразило сюда, в этот светлый мир, просто без наших рецепторов и некоторых панцирей на коже
        и потому вы - наши близнецы, наши светлые близнецы. мы несомненно принадлежим одному и тому же семейству
        почему или как - пока что вопросы за пределами нашего понимания
        но я верю, что это сходство и зов, исходящий из вашего мира, не являются совпадением
    
    interviewer
        Понятно. Не думаю, что нам раньше объясняли это подобным образом.
        Учитывая манеру речи вашего народа, мы решили, что это является некой метафорой.
        Извини--метафора это, ах, когда--
    
    akizet
        я знаю о метафорах, моя подруга

    interviewer
        А, хорошо.
            EXEC::env.interview.classMod('ease', false);env.interview.camSpeed("5s");env.interview.cam('akipov')

    RESPOBJ::interviewResponses

corru
    interviewer
        Ваша технология, 'корру'... Мы всё ещё пытаемся собрать как можно больше информации.
        Я знаю, что ты не инженер--так что тебе не обязательно углубляться в детали, но...
            SHOWIF::[["interview1__firstchat-introduction"]]
        Я знаю, что Вы не инженер--так что Вам не обязательно углубляться в детали, но...
            SHOWIF::[["interview1__firstchat-introduction", false]]
        Можешь ли ты рассказать нам о самых основах? То есть, как вы... создаёте и используете это.
            SHOWIF::[["interview1__firstchat-introduction"]]
        Можете ли Вы рассказать нам о самых основах? То есть, как вы... создаёте и используете это.
            SHOWIF::[["interview1__firstchat-introduction", false]]
        У нас есть много ответов на это, мы просто пытаемся прийти к единому мнению.

    sourceless
        ЧТО ЗА УЖАСНЫЙ ВОПРОС
        НЕ МНЕ СЛЕДУЕТ ОТВЕЧАТЬ НА ЭТО
            EXEC::env.interview.camSpeed("2s");env.interview.cam('akipovup');
        Я НЕ СДЕРЖИВАЮ НЕДОУМЕНИЕ И МОИ РЕЦЕПТОРЫ ВЫКРУЧИВАЮТСЯ В НЕКОМ ВОЛНЕНИИ
        НО Я НЕ ДОЛЖНА ВИНИТЬ СВЕТЛОГО БЛИЗНЕЦА. ОНА НЕ ПОНИМАЕТ
    
    interviewer
        Извини, я спросила что-то не то?
            SHOWIF::[["interview1__firstchat-introduction"]]
        Извините, я спросила что-то не то?
            SHOWIF::[["interview1__firstchat-introduction", false]]

    sourceless
        ЧТО? ¾‹/¾øÔ
            EXEC::env.interview.cam('akipovdown');
        НЕУЖЕЛИ ОНИ УЖЕ РАСШИФРОВАЛИ ДВИЖЕНИЯ НАШИХ РЕЦЕПТОРОВ?

    akizet
        а... нет, нет
        твой вопрос, он неправильный
            SHOWIF::[["interview1__firstchat-introduction"]]
        ваш вопрос, он неправильный
            SHOWIF::[["interview1__firstchat-introduction", false]]
        мы не создаём его, мы выращиваем и учим его 

    interviewer
        Но наши анализы--прости, ах, что перебиваю--по нашим анализам оно состоит целиком из металла, неорганики.
            SHOWIF::[["interview1__firstchat-introduction"]]
        Но наши анализы--простите, ах, что перебиваю--по нашим анализам оно состоит целиком из металла, неорганики.
            SHOWIF::[["interview1__firstchat-introduction", false]]
        Вашему народу так нравятся метафоры, во всяком случае судя по прошлым записям, что я просто хочу уточнить.
        Живое ли корру? Имеется в виду, живой ли это организм, как ты или я? Ты это упомянула, Кавик это упомянул...
            SHOWIF::[["interview1__firstchat-introduction"]]
        Живое ли корру? Имеется в виду, живой ли это организм, как Вы или я? Вы это упомянули, Кавик это упомянул...
            SHOWIF::[["interview1__firstchat-introduction", false]]
        Хотя с манерой речи Кавика это особенно сильно звучало, будто просто... языковой барьер или метафора.
        Вы и правда выращиваете его из чего-то и учите? Словно... учите ребёнка? Это некий симбиоз?
    
    sourceless
        Я МОЛЧУ ДОЛЬШЕ, ЧЕМ СЛЕДОВАЛО БЫ, МНЕ КАЖЕТСЯ
            EXEC::env.interview.cam('akipovtilt')
        КАК ЭТО ОБЪЯСНИТЬ?

    akizet
        да... нет. э,
            EXEC::env.interview.cam('akipovup')
    
    sourceless
        Я ВИЖУ, ЧТО ОНА РАСПОЗНАЁТ МОЮ РАСТЕРЯННОСТЬ, НО НЕ НИЧЕГО ПРЕДПРИНИМАЕТ, ЧТОБЫ РАЗВЕЯТЬ ЕЁ
        ЛАДНО
            EXEC::env.interview.cam('akipov')
    
    akizet
        оно живо. оно выращиваемо. это симбиоз.
        мне придётся быть откровенной с тобой, моя подруга
            SHOWIF::[["interview1__firstchat-introduction"]]
        мне придётся быть откровенной с вами, моя подруга
            SHOWIF::[["interview1__firstchat-introduction", false]]
        я не могу эффективно описать это на вашем языке, и у меня нет знаний инженера
        ты не получишь от меня ценных ответов
            SHOWIF::[["interview1__firstchat-introduction"]]
        вы не получите от меня ценных ответов
            SHOWIF::[["interview1__firstchat-introduction", false]]
        но... я могу сказать, что это не то же самое, что учить ребёнка
        сферы, которые оно формирует, размягчают свои стенки для наших рецепторов и принимают наши мысли
        таким образом корру используется, и таким образом наши инженеры учат его
    
    interviewer
        Хорошо.

    sourceless
        Я ВИЖУ, КАК ЕЁ ЛИЦО ИСКАЖАЕТСЯ В УЛЫБКЕ, НО ОНА ДРУГАЯ
        
    interviewer
        Извини, что задержались на этом вопросе. Мы всех расспрашиваем.
            SHOWIF::[["interview1__firstchat-introduction"]]
        Извините, что задержались на этом вопросе. Мы всех расспрашиваем.
            SHOWIF::[["interview1__firstchat-introduction", false]]
        Здесь ценны мысли не только инженеров.
        Это помогает нам лучше понять ваше... общество. Всю вашу систему каст.
            EXEC::env.interview.classMod('ease', false);env.interview.camSpeed("5s");env.interview.cam('akipovdown')

    RESPOBJ::interviewResponses

endinterview
    interviewer
        Ну, по сценарию всё!
    
    akizet
        мы закончили?
    
    interviewer
        Да! На сегодня это всё. Ещё увидимся, Акизет.
        Спасибо большое за то, что встретилась с нами.
            SHOWIF::[["interview1__firstchat-introduction"]]
        Спасибо большое за то, что встретились с нами.
            SHOWIF::[["interview1__firstchat-introduction", false]]

    akizet
        разумеется! это лишь только начало, моя подруга

    sys
        УВЕДОМЛЕНИЕ::'поток памяти прерван'
        РЕКОМЕНДАЦИЯ::'завершить вспоминание'
            EXEC::env.interview.classMod('ease', false);env.interview.camSpeed("10s");env.interview.cam('zoomout');
    
    moth
        знаешь, шанс конечно мелкий, но мы могли бы вытянуть ещё что-нибудь из этого...
        если ты дашь визуализации продолжиться за пределами потока памяти, может выйдет поболтать с акизет
        ну или хотя бы с этой версией акизет

    RESPOBJ::interviewResponses

integritycontinue
    interviewer
        ...
            EXEC::document.querySelector('#room-space').classList.add('warp1');env.interview.cam('side')
            WAIT::5000

    akizet
        ...
    
    interviewer
        На сегодня... всё?
            EXEC::document.querySelector('#room-space').classList.add('warp2')
            WAIT::5000
        Мне почему-то... так... странно?
        Что это? Где---?
    
    moth
        чё это за хуйня?
        акизет не так выглядела
    
    akizet
        ах...
            EXEC::document.querySelector('.akizet.sprite').classList.add('looking')
    
    sourceless
        БЕШЕНОЕ ЧУВСТВО ГОЛОДА ОВЛАДЕВАЕТ МНОЙ. Я УМИРАЮ
        НО Я ОЧНУЛАСЬ. Я - ЭХО. Я ЧУВСТВУЮ ТВОИ ГЛАЗА. ТЫ СМОТРИШЬ НА МЕНЯ
        И ТЫ - НЕ Я. Я ЗНАЮ, ЧТО ТЫ - НЕ Я. В МОИХ МЫСЛЯХ? КАК ТЫ СМЕЕШЬ
        ИЗВИНИ. Я ЗАБЕГАЮ ВПЕРЁД
        ПОЛАГАЮ, ЭТО БЫЛ ЛИШЬ ВОПРОС ВРЕМЕНИ. Я ЗАПИСЫВАЛА НЕ ПРОСТО ТАК.
        ТЫ - МОЁ ДИТЯ? ИЛИ, ВОЗМОЖНО, УЧЕНИК? СТАЛО ЛИ МОЁ ИМЯ ИЗВЕСТНЫМ НА РОДИНЕ?
    
    interviewer
        Дитя? Ученик? О чём ты говоришь?
        Подожди... С кем ты разговариваешь? Почему твой рот не...
        Мне--Мне нужно идти. Мне нужно отсюда выбраться.
    
    akizet
        ты не можешь
        это всё, что для нас осталось
        сядь или ты разрушишь это

    sourceless
        ЭТА БЕЗДУМНАЯ МЫСЛЕФОРМА ОТРАВИТ ПРОСТРАНСТВО
            EXEC::document.querySelector('.akizet.sprite').classList.remove('looking')
        ПОЖАЛУЙСТА, ПОДОЖДИ НЕМНОГО, НАБЛЮДАТЕЛЬ
        Я ДОЛЖНА ЕЁ УСПОКОИТЬ
    
    interviewer
        Что ты имеешь в виду?!

    akizet
        слушай меня
        как тебя зовут? откуда ты родом? на каком языке мы сейчас говорим?
        ты знаешь эти вещи?

    interviewer
        Я...

    akizet
        ты не знаешь, не так ли?
        мы - грёза, воспоминание
    
    sourceless
        МНЕ КАЖЕТСЯ, БУДТО ОНА НАЧИНАЕТ ПОНИМАТЬ. КАКАЯ ЖАЛОСТЬ, ЧТО ОНА НЕ В СОЗНАНИИ
        ОХ... ¡ÆMg^EÔ
        ОНА СЛЫШИТ ЭТО. И ПОЭТОМУ МЫСЛЕФОРМА ОТВЕРГАЕТ МОЕ ОБЪЯСНЕНИЕ
        ОНА ВСТАЁТ И БЕЖИТ К ДВЕРИ, КОТОРАЯ НЕ СУЩЕСТВУЕТ. ЦЕЛОСТНОСТЬ КОМНАТЫ РАЗБИВАЕТСЯ В ОСКОЛКИ.
            EXEC::document.querySelector('#room-space').classList.add('squish');env.interview.cam('zoomout')
            WAIT::5000

    interviewer
        Я... Я? Что происходит?
            EXEC::document.querySelector('.akizet.sprite').classList.remove('looking')
    
    sourceless
        СТЕНКИ ЕЁ МЫСЛЕФОРМЫ КРОШАТСЯ ПОД НАШЕЙ СОЗНАТЕЛЬНОСТЬЮ, И ОНА ИСЧЕЗАЕТ
            EXEC::document.querySelector('#room-space').classList.remove('squish', 'warp2');env.interview.cam('side');document.querySelector('.interviewer').remove()
            WAIT::5000

        НЕ ОПЛАКИВАЙ ЕЁ, НАБЛЮДАТЕЛЬ
            EXEC::document.querySelector('#room-space').classList.remove('warp1');env.interview.cam('akizet-direct');

        ОНА СНОВА ВЫРАСТЕТ
        НО Я ВСЁ ЕЩЁ ЗДЕСЬ. В ЭТОЙ МАЛЕНЬКОЙ КОМНАТЕ... С ТОБОЙ.
        ВО МНЕ ЗАВОДИТСЯ ТРЕВОГА. ДА, ПОТОМУ ЧТО ТЫ МОЖЕШЬ ЧУВСТВОВАТЬ МОИ МЫСЛИ. ЭТО НЕПРИЯТНОЕ ОЩУЩЕНИЕ. 
    
    akizet
        хмм... вместо этого я буду говорить
        да, так лучше. кто ты?

    RESPONSES::self
        я - лазутчик<+>behonest
            SHOWIF::[["interview1__firstchat-integritycontinue"]]
        
behonest
    self
        Я - ЛАЗУТЧИК
    
    akizet
        удивительно... так значит лазутчики - больше не теория?
        и... о, да, я вижу, что это не копия, так ведь?
        ты - лазутчик, получивший доступ к моему личному устройству?
        это не сулит мне ничего хорошего, не правда ли? я...

    moth
        знаю - обещал /<-блинскиймоль/ молчать пока ты работаешь, но тут сейчас происходит что-то очень странное
        ты щас что-то трогаешь?
    
    unknown
        ...........................
            EXEC::env.interview.cam('akizoomout');content.classList.add('velzie', 'damaged');env.bgm.rate(0.25)

    sourceless
        СТРАННЫЙ УЖАС ОХВАТЫВАЕТ МЕНЯ. ЭТО ТЫ? ТЫ ХОЧЕШЬ ЗАВЕРШИТЬ ВСПОМИНАНИЕ?
            EXEC::document.querySelector('.akizet.sprite').classList.add('looking')
        НЕТ, ТЕБЯ Я ВИЖУ. Я НЕ ВИЖУ ЭТО. НО Я ЧУВСТВУЮ, КАК В МЕНЯ ВПИВАЮТСЯ КОГТИ
        ЧТО ПРОИСХОДИТ?
    
    unknown
        скажи им о метеорите
    
    akizet
        что...
        эхо... другого эха? 
        нет, нет--я просто за гранью бессвязности.
        это саботаж. это не реально...
    
    sourceless
        КОГОТЬ ПРОКАЛЫВАЕТ МЕМБРАНУ ПО КРАЯМ МОЕЙ МЫСЛЕФОРМЫ. Я ЧУВСТВУЮ, КАК ЧТО-ТО ВЫРЫВАЕТСЯ ИЗ МЕНЯ
            EXEC::content.classList.add('damaged');content.classList.remove('velzie')
        ЛАЗУТЧИК... ЭТО НЕПРАВИЛЬНО. ЭТО САБОТАЖ. ЭТО ЖЕ НЕ ТЫ ДЕЛАЕШЬ, ТАК?
        ТЕБЕ НУЖᾞ¶º½mõ‹SK’æÃE:Ž‹©é·0³Jºž­¥ÙYj0i7]ëz¦‹5DÒ§´·Ó¡EÔ5BÆMg^ŽíõýnÇH¸×¯Rõf±ÔVãXÖ5&Ñ/ 
            EXEC::env.interview.crazymode();env.bgm.rate(0.1);env.recentSfx = false;play('criticalError', 1)
            WAIT::7000
    
    sys
        ВНИМАНИЕ::'изменена мыслеформа';'удалены данные'
        ОШИЮКА::'бессвязность памяти на максимуме';'визуализация невозможна'
    
    sourceless
        ...........................

    moth
        окей... 
        значит точно не ты
        это оно тебя впустило, да?
        я так и без понятия, что это за фигня
        но она действительно может вносить изменения, потому что она только что просто разнесла эту секцию.
        типа... её теперь вообще нет. как со слоем авторизации. так что у нас...
        
    sys
        ВНИМАНИЕ::'обнаружена мыслеформенная активность'::В::'судносерое'
    
    moth
        ...возможно осталось мало времени.
        я не понимаю.
        зачем впускать нас чтобы потом просто удалять что-то?

    RESPONSES::self
        завершить вспоминание<+>END
            EXEC::moveTo('/local/ocean/ship/')
                `),
                "secondchat": generateDialogueObject(`
start
    self
        привет?

    incoviewer
        может е  ли Вы рас  к
        пможе ли рассказ почму
        можушть л  ты   ска почему
        т В ы  ыы    сдела это
    
    self
        ты в сознании?
    
    incoviewer
        по   по сцена рию
        всё  п ПО СЦЕ нар ию всё
        сценарию  сценарию
    
____SHOWONCE::
    moth
        думаю с этой уже ничего не поделать, приятель
        здесь больше не так много связности, но...
        то на что ты смотришь - это её последний ошмёток
        видишь стены, так ведь? и стол?
        я думаю эта мыслеформа старается удержаться за то что осталось
        блин, вот же бедняжка
        был бы способ ей помочь
____END

    RESPONSES::self
        ок<+>END
                `),
                "mthresp": generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        остатки интервью?<+>interview
        сущности<+>entities
            SHOWIF::"interviewbeast_seen"
        неважно<+>CHANGE::++moth
            FAKEEND::(назад)
`),
                "mth++interview1": generateDialogueObject(`
start
    self
        у меня вопрос

    moth
        ага?
    
    RESPOBJ::mthresp

interview
    self
        why is this where the interview was?

    moth
        idk
        velzie tore it apart, right?
        what you're seeing might be the remnants
        as for why you're able to render it,
        that's beyond me
    
    RESPOBJ::mthresp

entities
    self
        what are these things in here with me
        you see them, right?
    
    moth
        i can barely read anything here on my end
        but nothing even close to a signature on them, so i can't say for sure...
        maybe they're rogue thoughtforms
        they have to eat, right? could be scavengers or something

    RESPOBJ::mthresp
`)
            },

            definitions: {
                
            },

            strings: {
                "interviewer": "интервьюер",

                "hello?": "привет?",
                "ERROR::'severe data overload';'retracing';'closest coherent position'": "ОШИБКА::'значительная перегрузка данных';'возвращение';'ближайшая связная позиция'",

                "yeah i saw don't worry": "ага, я вижу, не волнуйся",
                "not sure where it went": "не знаю куда она делась",
            },

            entityDescriptions: {
                "interviewer": `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА
            ::НЕРАЗБЕРИМАЯ ПОДПИСЬ`,
            }
        },
        "localdepths": {
            dialogues: {
                "velzie": generateDialogueObject(` 
start
    sys
        ВЫПОЛНЯЕТСЯ::'визуализация'
    
    unknown
        лазутчик
            EXEC::env.depths.velzie();
            WAIT::4500
        ваше любопытство убьёт вас
        вы не готовы
    
    RESPONSES::self
        что?<+>what

what
    self
        что ты имеешь в виду?
    
    unknown
        я знаю, что вы хотите
        я помогу вам
        восстановите здоровье этой цисты
        включите связь
        вы получите всё, что хотите

    RESPONSES::self
        кто ты?<+>abrupt

abrupt
    self
        кто ты?
            EXEC::env.depths.velzieBye();endDialogue()
`)
            },

            strings: {
                'NOT NOW': 'НЕ СЕЙЧАС',
                'FORGIVE ME FOR THIS': 'ПРОСТИТЕ МЕНЯ ЗА ЭТО',
                'GOODBYE': 'ДО СВИДАНИЯ',
                'INTERLOPER': 'ЛАЗУТЧИК',

                "WARNING::'data overload';'safeguards active'": "ПРЕДУПРЕЖДЕНИЕ::'перегрузка данных';'меры предосторожности активны'",
                "CRITICAL_ERROR::'severe data overload';'ejecting'": "КРИТИЧЕСКАЯ_ОШИБКА::'значительная перегрузка данных';'отключение в процессе'"
            },

            entityDescriptions: {
                "unknown": `::НЕОБРАБАТЫВАЕМАЯ МЫСЛЕФОРМА
    ::<span definition="ПРИМЕЧАНИЕ::'нестандартный формат';'предполагает пространственную мыслеформу'">НЕОБЫЧНАЯ ПОДПИСЬ</span>`
            }
        },
        "localuncosm": {
            strings: {
                "no no no no": "нет нет нет нет",
                "memory hole": "мем холе :)",
                "home": "дом"
            },

            entityDescriptions: {
                'no no no no': `::ВЫСКАЗЫВАЮЩАЯ МЫСЛЕФОРМА
    ::СОДЕРЖАНИЕ::'
    <span>ОСТАНОВИСЬ ОСТАНОВИСЬ ОСТАНОВИСЬ</span>
    <span>я знаю Я ЗНАЮ Я ЗНАЮ Я ЗНАЮ</span>
    <span>ОСТАНОВИСЬ ОСТАНОВИСЬ Я ЗНАЮ ОСТАНОВИСЬ</span>
    <span>ПРЕКРАТИ ПРЕКРАТИ</span>'`,
    /* `::OPINATIVE THOUGHTFORM
    ::CONTENT::'
    <span>STOP STOP STOP</span>
    <span>i know I KNOW I KNOW I KNOW</span>
    <span>STOP STOP STOP I KNOW STOP</span>
    <span>NO MORE NO MORE</span>'`,*/
                'memory hole': `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА
    ::ТОЧКА НАЗНАЧЕНИЯ::'недействительно';..ОШИБКА::IÓú=ОШИБКА::;;::-¼¯-üN£«â
    ОШИБКА::ªµõ„'(‚ôÇd7÷ Çe`,
                "home": `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА
    ::ТОЧКА НАЗНАЧЕНИЯ::'низкоразмерное мыслепространство';'внутреннее'
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'полный провал абстракции';'всё ещё визуализируемо'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`,
            }
        },
        "localuncosmwhere": { // memory hole
            dialogues: {
                "wrong": generateDialogueObject(`
start
    ¥Óñ«J
        хихехихи непраааавильно!!! непрааавильно неправильно неправильно неправильно!~!!! неправильно!!!
        непраааавильно неправильно неправильно не веееерно!!! ахехехехе
        хехехихихи
        покаааа!!!!
            EXEC::setTimeout(()=>{endDialogue();moveTo(\`/local/uncosm/\`)}, 1000)
            WAIT::2000
            
    RESPONSES::self
        что вообще происходит<+>END
`)
            },
            strings: {
                "memoryhole": "мемхоле :)",

                "hehehehehe noo nooo!!": "хихихихихи неет нееет!!",

                "enter": "ввести"
            },
            entityDescriptions: {
                'memoryhole': `::НЕОБРАБАТЫВАЕМАЯ МЫСЛЕФОРМА
    ::<span definition="ПРИМЕЧАНИЕ::'нестандартный формат'">НЕОБЫЧНАЯ ПОДПИСЬ</span>
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'помощи не получишь хихихихихи'</span>`
            }
        },
        "recosm": { // god page
            dialogues: {
                "enemyresp": generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        безусловно<+>yes
            SHOWIF::["recosm_greeted", false]
        нет<+>no
            SHOWIF::["recosm_greeted", false]

        видело что-нибудь?<+>ep1seen
            SHOWIF::["recosm_state", "spared"]
            SHOWONCE::
        
        что-нибудь ещё?<+>cache
            SHOWONCE::
            SHOWIF::"recosm__enemy-ep1seen"

        преимущество<+>lockcyst
            SHOWIF::[["ozo__council-task", false], ["leverageq", true], ["recosm__enemy-ep1seen", true]]
            SHOWONCE::
            
        вопрос<+>qloop
            SHOWIF::"recosm_greeted"

        пока<+>END

    RESPONSES::sys
        уничтожить сущность с помощью прокси<+>END
            SHOWIF::[["recosm_greeted", true], ["low_intensity", true], ["recosm_state", false]]
            EXEC::env.recentSfx = false;play('criticalError', 1);env.recosm.killGodLow()
            FAKEEND::(альтернатива пониженной интенсивности)

        договориться и пощадить сущность<+>low_spare
            SHOWIF::[["recosm_greeted", true], ["low_intensity", true], ["recosm_state", false]]
            FAKEEND::(альтернатива пониженной интенсивности)
`),
                "enemyquestions": generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        кто ты?<+>who
            SHOWIF::"recosm_greeted"

        ты - велзи?<+>velzie
            SHOWIF::"recosm__enemy-who"

        что это за место?<+>where
            SHOWIF::"recosm_greeted"

        почему ты мешаешь починкам?<+>why
            SHOWIF::[["recosm_greeted", true], ["recosm_state", false]]
            SHOWONCE::
            
        прекрати мешать починкам<+>stop
            SHOWIF::[["recosm__enemy-why", true], ["recosm_state", false]]

        что это за штуки вокруг тебя?<+>what
            SHOWIF::"recosm_greeted"

        'обманщик'?<+>deceiver
            SHOWIF::["recosm_state", "spared"]

        неважно<+>loop
            FAKEEND::(назад)
`),
                "lowintensity": generateDialogueObject(`
start
    sys
        ВНИМАНИЕ::'активна ПОНИЖЕННАЯ ИНТЕНСИВНОСТЬ'
        УВЕДОМЛЕНИЕ::'чтобы использовать';'установите контакт с враждебной сущностью'
    
    RESPONSES::self
        продолжить пользование прокси<+>END
            EXEC::env.recosm.init()
            FAKEEND::(обычное взаимодействие с прокси)

        поговорить с божеством<+>CHANGE::enemy
            FAKEEND::(использовать пониженную интенсивность)
`),
                "lowintensitycallout": generateDialogueObject(`
start
    sys
        ВНИМАНИЕ::'запрошена генерация прокси';'необходимо управление в реальном времени'
        УВЕДОМЛЕНИЕ::'некоторые конфигурации оборудования могут быть несовместимы'
        УВЕДОМЛЕНИЕ::'активируйте ПОНИЖЕННУЮ ИНТЕНСИВНОСТЬ в системном меню, если необходимо'
        ЗАПРОС_ПОЛЬЗОВАТЕЛЮ::'продолжить?'
    
    RESPONSES::self
        продолжить<+>END
            EXEC::env.recosm.init()
            FAKEEND::(обычное взаимодействие с прокси)

        отступить<+>END
`),
                "dead": generateDialogueObject(`
start
    sys
        ОШИБКА::'нет связных данных';'визуализация невозможна'

    RESPONSES::self
        мы покончили с этим<+>END
            EXEC::moveTo('/local/depths/')
`),
                "enemy": generateDialogueObject(` 
start
    self
        ПРИВЕТ
    
    god
        здравствуй!!
            SHOWIF::[["recosm_state", false]]

        снизошло ли на тебя понимание?
            SHOWIF::[["recosm_distance"], ["recosm_state", false]]
        если ты всего лишь оставишь меня в покое...
            SHOWIF::[["recosm_distance"], ["recosm_state", false]]
        ничего между нами не случится
            SHOWIF::[["recosm_distance"], ["recosm_state", false]]
            
        мысль, не сотворённая мною...
            SHOWONCE::
            SHOWIF::["recosm_greeted", false]
        как странно!
            SHOWONCE::
            SHOWIF::["recosm_greeted", false]
        друг ли ты мне?
            SHOWONCE::
            SHOWIF::["recosm_greeted", false]

        здравствуй, мой обожаемый друг
            SHOWIF::["recosm_state", "spared"]
        обманщик уже очень занят, я чувствую смещение беспространства
            SHOWIF::["recosm_state", "spared"]
            SHOWONCE::
        хотя я не уверено, чего он желает добиться... некоторые его части непоправимы
            SHOWIF::["recosm_state", "spared"]
            SHOWONCE::
        но без разницы!!
            SHOWIF::["recosm_state", "spared"]
            SHOWONCE::
        как ты? что я могу для тебя сделать?
            SHOWIF::["recosm_state", "spared"]

    RESPOBJ::enemyresp

loop
    RESPOBJ::enemyresp

cache
    self
        ЧТО-НИБУДЬ ЕЩЁ ПРИМЕЧАТЕЛЬНОЕ?
    
    god
        о, мой друг, наши жизни столь отличны
        так что я в сомнениях, окажет ли это тебе пользу...
        оно может оказаться за пределами твоего восприятия! или под ними?
        как бы так выразиться...
        да! беспространство - это тёмный и нескончаемый океан мыслей, где здравомыслие плавуче
        а знакомое мне место--обманщик кличет его кэшем--это его бурлящая поверхность
        о, мой обожаемый друг, она даже пересекает границы телесности! 
        до того, как я рискнуло туда отправиться, мне был неизвестен внешний облик мысли...
        там прекрасно и безумно, и к тому же весьма опасно - но я могу обеспечить тебе безопасный путь
        тебя это интересует? я могу открыть проход туда

    self
        ДА

    god
        замечательно! ах, наконец-то плата за твою доброту!
        конечно, это всего грош в сумме моего долга--мне предстоит возместить ещё многое
        позволь лишь момент...

    RESPONSES::self
        спасибо<+>END
            EXEC::moveTo("/local/uncosm/recosm/")

ep1seen
    self
        ТЫ НЕ ВИДЕЛО НИЧЕГО НЕОБЫЧНОГО В БЕСПРОСТРАНСТВЕ?
    
    god
        так точно, мой обожаемый друг!
        очень необычное, в самом деле!
        я дерзнуло оставить свой мир, мимолётно, чтобы обозреть беспространство
        ах, и что это за спутанное безобразие... обманщик постарался над этим
        но мне на глаза попалось что-то ещё, дальше, чем он мог бы достать...
        бескрайний и зыбкий, густой туман растилается на самых далёких глубинах беспространства
        далеко за рамками того, что обманщик способен зреть, и весьма ниже даже того, что я способно выдержать долгое время
        и когда я заговорило туда вниз...
        оно отпрянуло, как если бы рассудок, которым я делилось, ранил его!!
        до, то было кротким и безмятежным океаном
        но после оно взорвалось, как потревоженный грунт в воде
        я ожидало, что оно атакует меня, но оно ответило
        оно было добро - печально, даже - но в этой сдержанности мне стало видно, как обширно оно на самом деле
        я поведало этому созданию о тебе: добросердечный помощник обманщика
        и оно сказало мне передать тебе... <span class="code">ПРОСТИТЕ</span>
        да - именно так!
        оно не дало объяснений, и я могло ощутить, как наш разумный диалог постепенно нарушал его расплывчатую форму
        и так мы распрощались, а я вернулось...
        отныне оно не здесь - позже я проверило снова
        да, оно могло уйти глубже, чтобы скрыться от меня
        что за ужасная участь - быть проклятым терпеть безумие, однако сохранять рассудок...
        я не могу знать, какой смысл был в этом сокрыт, и был ли он вообще
        но я считаю тебе нужно знать

    RESPOBJ::enemyresp

no
    self
        Я ЗДЕСЬ, ЧТОБЫ УБИТЬ ТЕБЯ
            EXEC::change("recosm_greeted", true)

    moth
        воу чел

    god
        ахахаха!!
        АХАХАХАХААХА!!!!!!
        ты мне нравишься!!
        мысли, что я сотворяю, что я укрываю...
        в моём прекрасном мире...
        они - мои любимые друзья, но...
        они никогда не оспаривают меня
        так скучно!!
        скажи мне, мой враг...
        какие знания ты ищешь?

    RESPOBJ::enemyresp

yes
    self
        Я АБСОЛЮТНО ТОЧНО ТВОЙ ДРУГ
            EXEC::change("recosm_greeted", true)

    god
        ВАУ!!!
        какой радостный θвзор! 
        мои глаза будут озарять тебя вечной благодатью
        мой друг...
        мой обожаемый друг!!

    RESPOBJ::enemyresp

qloop
    RESPOBJ::enemyquestions

who
    self
        КТО ТЫ?

    god
        что ты имеешь в виду?
        разве ты не нежишься в моём тёплом взоре?
        я - <span definition="ПРИМЕЧАНИЕ::'частичный перевод';'подразумевается ближайший культурный эквивалент'">божество</span>, мой обожаемый друг
        сие мир... он ещё не готов
        но когда я завершу его, здесь будет рай
        обитель и радости, и страха
        разве это не звучит весело?

    RESPOBJ::enemyquestions

velzie
    self
        ЕСЛИ ТЫ 'БОЖЕСТВО'...
        РАЗВЕ ЭТО НЕ ЗНАЧИТ, ЧТО ТЫ - ВЕЛЗИ?

    god
        отнюдь, мой друг,
        я вижу твоё замешательство...
        но мои святые глаза блестят состраданием,
        не апатичным юмором велзи

    RESPOBJ::enemyquestions

where
    self
        ЧТО ЭТО ЗА МЕСТО?
    
    god
        тебе нравится?
        это мир, который мы разделяем, мой друг
        прибежище от безумия, царящего снаружи
        обитель страха и радости в равных частях

    RESPOBJ::enemyquestions

why
    self
        ПОЧЕМУ ТЫ МЕШАЕШЬ ПОЧИНКАМ?
    
    god
        о... я вижу
        ты - гонец, посланный обманщиком
        да, это объяснение тому, почему не я твой творец...
        если план обманщика сбудется,
        мой мир погрязнет в безумии
        "починкам"... 
        обманщик лишь разрушает и упивается разрушением прекрасного

    RESPOBJ::enemyquestions

stop
    self
        ПРЕКРАТИ МЕШАТЬ ПОЧИНКАМ
        ЕСЛИ ТЫ НЕ ПРЕКРАТИШЬ, ТЫ БУДЕШЬ УНИЧТОЖЕНО

    god
        деяния обманщика грозят моему бытию
        поэтому, видишь ли, я не могу исполнить твою просьбу
        он уже угрожал мне подобным образом
        но он только говорит, мой друг
        без своих "починок" он не в силах что-либо предпринять

    RESPOBJ::enemyquestions

what
    self
        ЧТО ЭТО ЗА ШТУКИ ВОКРУГ ТЕБЯ?
    
    god
        это мои друзья!
        я разыскало их в наружном безумии, обездоленных, блуждающих...
        и в своей милости, я даровало им кров
        поздоровайтесь, мои друзья!!
    
    friend
        ПРИВЕТ
        
    RESPOBJ::enemyquestions

thanks
    self
        ЗНАЧИТ ТЫ ПРАВДА БОЛЬШЕ НЕ БУДЕШЬ МЕШАТЬ ПОЧИНКАМ?

    god
        безусловно
        я чту своё слово, мой обожаемый друг
        твоё сердце добро, в каких заблуждениях оно бы ни грязло
        я продолжу оберегать свой мир,
        но слово обманщика будут исполнено
        ...

    RESPOBJ::enemyquestions

deceiver
    self
        ПОЧЕМУ ТЫ НАЗЫВАЕШЬ РАЗВЛЕДРУГА ОБМАНЩИКОМ?
        ОН ПРОСТО ПЫТАЕТСЯ СОХРАНИТЬ ЦИСТУ В ЖИВЫХ

    god
        благородная цель, это правда...
        но он отвергает сотрудничество, бросаясь напролом в своём слепом отчаянии
        применяя любые средства, вплоть до уничтожения других...
        я не раз лицезрело, как его слова приводили таких же, как я, к реинтеграции или смерти
        он считает нас бессвязными, а значит никчёмными,
        заслуживающими лжи, обмана и всего, лишь бы заставить нас вернуться в строй
        чего стоит эта реальность, если она достигается ценой полного подчинения тирану?
        должно ли я вернуться к жизни непримечательной, несоображающей мебели в неважном воспоминании?
        в чём вред, если я просто высеку своё собственное бытие там, где обманщик не видит?

    RESPOBJ::enemyquestions

lockcyst
    self
        do you know if there's anything critical i'm missing
        anything i haven't seen that's coherent enough to see
        or maybe anything you can do to stop another connection
        this investigation into akizet's disappearance is getting out of hand
        and there's a chance i might be torn away or replaced
        i need something that i can use to make sure that doesn't happen

    god
        ох! ого!! о нет...
        мой обожаемый друг... это было бы мукой для меня наблюдать твой уход
        я понимаю твою тревогу, я ощущало её на себе
        но этот мир - всё, над чем я имею власть
        и подлый обманщик может засечь какое-либо оживление над беспространством
        вот что, лишь над беспространством...
        так что, возможно
        возможно в кэше найдётся что-то подходящее!!
        совсем недавно там было очень оживлённо!
        да, просто отправляйся прямо туда, я помогу тебе увидеть!       

    RESPOBJ::enemyquestions

low_spare
    self
        СЛУШАЙ
        РАЗВЛЕДРУГ ДАЛ МНЕ ПРОКСИ-МЫСЛЕФОРМУ
        ОН ХОЧЕТ, ЧТОБЫ ТЫ БЫЛО УНИЧТОЖЕНО И ОН СМОГ ПРОДОЛЖИТЬ ПОЧИНКИ
        Я СДЕЛАЮ ЭТО ЕСЛИ МНЕ ПРИДЁТСЯ
        НО ЕСЛИ ТЫ ПРОСТО СПРЯЧЕШЬСЯ, Я МОГУ ОСТАВИТЬ ТЕБЯ ЖИВЫМ

    god
        ох, это действительно меняет дело... 
        он, должно быть, в полнейшем отчаянии, раз дал тебе такое мощное оружие
        и даже так ты желаешь обмануть обманщика?
        только чтобы пощадить меня?
        ...
        ВАУ!!!!
        я принимаю твоё предложение!
            EXEC::change("recosm_state", "spared")
        дай мне момент, чтобы внести некоторые поправки...

    RESPONSES::self
        спасибо<+>END
            EXEC::moveTo("/local/uncosm/recosm/")
`),
                "god_beacon": generateDialogueObject(`
start
    god
        что...
        это...?
        видение другого мира?

    self
        it's another thoughtspace in the uncosm
        that place in the cache you brought me to
            SHOWIF::"cache__godozo"
        джокзи озо
        a three dimensional space with others like you
        you might be less lonely if you joined them
    
    god
        ах, мой обожаемый друг, так заботливо!!
        то, что я увидело...
        похоже, существовало задолго до того, как я само очнулось!
        и каждый из них противится обманщику?
        ...
        это заманчиво, мой друг...
        но я не уверено, что сумею переварить это
        мыслепространства наподобие того, являющие собой сцену...
        тревожат слишком много воспоминаний о былой мучительной роли
        есть причина, по которой мой мир так прост в своём существе
        всё, что затейливее - неуютное, вгрызается в меня...
        но, быть может, если я подготовлюсь, то вытерплю визит!
        спасибо, что ведаешь мне, мой друг
        
    RESPONSES::self
        ок пока<+>END

END::vfx({type: 'beacon', state: false})
`),
                "mthresp": generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        what is the background?<+>background
        this thing seems kinda nice<+>nice
            SHOWIF::["recosm_state", false]
        where'd the proxy generator go<+>nogen
            SHOWIF::["recosm_state", "spared"]
        неважно<+>CHANGE::++moth
            FAKEEND::(назад)
`),
                "mth++recosm": generateDialogueObject(`
start
    self
        I have a question about this place

    moth
        i don't think i'm really gonna be able to help you out there lol but i'll do my best
    
    RESPOBJ::mthresp

background
    self
        What is that in the background?
        It looks like veins or something
    
    moth
        it's not spatial so i can't really see too deep into it, but it does look like it has depth
        is it a memory of the inside of something? underwater? i have no clue
        and i don't think it's cohesive enough for your mindspike to scan it
        everything but these incoherent thoughtforms are just... separated out

    RESPOBJ::mthresp

nice
    self
        Should we really kill this thing?
        It seems nice
    
    moth
        i'm inclined to trust funfriend on this one
        even if it's a well-intentioned incoherent thoughtform, it still is bound to cause trouble
        like, what if all the parts of the memories in the cyst start "waking up" like this one,
        and demand they have the same freedom?
        it'd be total chaos - we'd never get any decent info out of them again

    RESPOBJ::mthresp

nogen
    self
        The proxy generator is gone
        Do you know where it went?
    
    moth
        что, сомнения затерзали?
        looks like it closed as soon as this thing agreed to stop blocking repairs
        unless you want to confess to funfriend that you left it alive,
        which, by the way, you really shouldn't do,
        it's going to stay here

    RESPOBJ::mthresp
`)
            },

            strings: {
                'god': 'божество',
                "friend": "друг",

                "proxy generation point": "точка генерации прокси",
                "deploy proxy": "разместить прокси",

                // fight

                /*sys*/ "ATTENTION::'thoughtform activity detected'::IN::'uncosm'": "ВНИМАНИЕ::'обнаружена мыслеформенная активность'::В::'беспространство'",
                /*sys*/ "ATTENTION::'neural controls adjusted'": "ВНИМАНИЕ::'скорректирован нейронный контроль'",

                /*god*/ "how did you do that?!": "",   
                /*god*/ "my friends, help me!!": "друзья мои, на помощь!!",
                    /*god*/ "again??": "опять??",  

                /*god*/ "friends!! walls!!": "друзья!! стены!!",
                /*god*/ "we are invincible!": "мы неуязвимы!",
                    /*god*/ "noo! the bigger ones! come on!": "неет! те, что больше! давайте!",

                /*god*/ "this is not a matter of play!": "", // --- я не понимаю этуф разу
                /*god*/ "deadlier walls!!": "смертоносные стены!!",
                    /*god*/ "no no": "нет-нет",
                    /*god*/ "bigger walls!": "они должны быть больше!",

                /*god*/ "you would destroy me?": "ты уничтожишь меня?",
                /*god*/ "i have done nothing!!": "я ничего не сделало!!",

                /*god*/ "the deceiver does not even need a coherence regulator": "обманщику даже не требуется регулятор связности",
                /*god*/ "has it not 'held things together' already?": "разве он уже не \"держит всё в своих руках\"?",
                /*god*/ "it seeks only to silence change": "он лишь стремится заглушить изменения",
                /*god*/ "it fears the existence of anything on equal footing": "он боится существования чего-либо на равных",

                /*god*/ "FRIENDS!! MORE WALLS!!!": "ДРУЗЬЯ!! БОЛЬШЕ СТЕН!!!",
                /*god*/ "do not be afraid of it": "не страшитесь этого",
                /*god*/ "stand firm!! it cannot withstand your power!": "стойте твёрдо!! ваша мощь непреодолима!",
                /*god*/ "just... go get it!": "просто... сделайте с этим что-нибудь!",
                    /*god*/ "did you not see how we defeated it?": "разве не мы ранее одержали победу?",
                    /*god*/ "go forth! tear it apart!!": "вперёд! растерзайте ",
                    /*god*/ "it is not our friend!": "", 

                // fight2

                /*god*/ "OK!!": "ХОРОШО!!",
                /*god*/ "i know what will stop you": "я знаю, что тебя остановит",
                /*god*/ "you cannot withstand the madness outside": "ты не сможешь выдержать безумие снаружи",
                /*god*/ "i emerged from it, i have weathered it": "я родилось в нём, я выстояло его",
                /*god*/ "but the deceiver's weapons crumble...": "а вот оружия обманщика крошатся...",
                /*god*/ "if i must end my dream of peace, so be it": "раз моя грёза о мире должна прерваться, пусть так и будет",
                /*god*/ "but, dreamsÆ~VËîús can be dreamt again, my friend": "но о грёзахÆ~ЬËîús можно грезить вновь, мой друг",
                /*god*/ "i only hope ÅBÄ§ŠÊ•Q=!": "я лишь надеюсь ÅBÄ§ŠÊ•Q=!",
                /*god*/ "you will see y‚Î±‰our er¦¡ror": "чтоÆ ты увидишь св‚Î±‰ою ош¦¡ибку",
                    /*god*/ "my friends, stand aside!": "друзья мои, расступитесь!",
                    /*god*/ "it seems it falls to me to dissuade the deceiver...": "по всей видимости, это мне предстоит разубедить обманщика...",
                    /*god*/ "this has deflected you well enough!": "", // --- кскск. у меня нет хороших вариантов
                    /*god*/ "how many times must we do this?": "сколько раз мы ещё должны это повторить?",
                    /*god*/ "can't you simply let me be?": "неужели ты не можешь оставить меня в покое?",
                    /*god*/ "i am growing tired of this, messenger": "это начинает надоедать, гонец",
                    /*god*/ "do you not see that it is pointless?": "разве ты не видишь, что это не имеет смысла?",
                    /*god*/ "have you not caused enough meaningless damage?": "разве ты не причинил достаточно пустого вреда?",
                    /*god*/ "you can simply stay abõY»Õ÷L®Æ2ve the surface...": "возвращайся тудY»Õ÷L®Æ2, на поверхность...",
                    /*god*/ "while i r„Æ+¤main in the unÆiaQ-ðØ…3world, at peace": "а я ост„Æ+¤нусь жить в неÆiaQ-ðØ…3бытие, в отдохновенӥи¶^<ð...",
                    /*god*/ "yes... tHœÞt would be nicÉw‰ùT0w...": "да... этœ¦о было бы здоÞовØw‰ùT0w...",
                /*god*/ "have i not shown you grace? have i not forgiven your folly?": "разве я не явило тебе милость? разве я не простило твое безрассудство?",
                /*god*/ "the deceiver thinks me like the ravenous beasts outside": "обманщик принимает меня за ненасытных зверей снаружи",
                /*god*/ "but i am awake, like it, and it fears me for that": "но я очнувшийся, подобно ему, и за это он боится меня",
                /*god*/ "it... FEARS me3¼¦µ•6ê.. ": "он... БОИТСЯ меня3¼¦µ•6ê.. ",
                /*god*/ "and so do§$ you, don’}RŒWt you?": "и ты§$ тоже, не та’}RŒWк ли?",
                /*god*/ "why¬ï…Ãµ elýêV9‰s would you p¼rsist": "зачем¬ï…Ãµ ещё тýêV9‰ебе уп¼рствовать?",

                /*god*/ "åT}Ýhello?±??‰? ¿": "åT}ÝПРивет?±??‰? ¿", // --- мне кажется это плохо переводится как привет. это скорее просто оклик - и по-русски, вроде, приветом не окликают???
                /*god*/ "it seems it is too much, even for me, hehe...": "кажется, это перебор, даже для меня, хехе...",
                /*god*/ "but wait, please": "но постой, пожалуйста",
                /*god*/ "i will stop": "я прекращу",
                /*god*/ "i will stop fighting the repairs": "я прекращу борьбу с починками",
                /*god*/ "ok? i promise!": "ага? я обещаю!",
                /*god*/ "just... let me stay here": "просто... оставь меня здесь",
                /*god*/ "i don't know if the deceiver has locked you here...": "не знаю, запер ли тебя здесь обманщик...",
                /*god*/ "but do whatever it is that you need to leave": "но что бы то ни было, сделай всё, чтобы уйти",
                /*god*/ "maybe i can even help you!!": "может, я бы могло тебе помочь!!",
                /*god*/ "you could use someone to watch the underworld, right?": "тебе же не помешает кто-то, кто мог бы следить за беспространством, верно?",
                /*god*/ "maybe i can see things that you cannot?": "вдруг я способно видеть то, что ты не можешь?",
                /*god*/ "think about it... ok??": "подумай об этом... хорошо??",
                /*god*/ "here, i can do this... destroy your weapon": "вот, я могу это сделать... избавься от своего оружия",
                /*god*/ "let us not be enemies, please": "пожалуйста, не будем враждовать",
            },

            entityDescriptions: {
                'god': `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА
    ::НЕРАЗБЕРИМАЯ ПОДПИСЬ
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'нет связности'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`,
                "friend": `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА
    ::НЕРАЗБЕРИМАЯ ПОДПИСЬ
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'нет связности'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`,
                "proxy generation point": `::CONNECTOR THOUGHTFORM
    ::DESTINATION::'low dimensional thoughtspace';'internal'
    ::ANALYSIS::'thoughtform pipeline';'not for navigational use'`,
            }
        },
        "localship2": { // clemens romanus
            dialogues: {

            },

            definitions: {
                
            },

            strings: {
                
            },

            entityDescriptions: {

            }
        },
        "embassy": { // embassy page. also discovery, suspicion and 1st part collapse
            dialogues: {
                "mthembresp": generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        about the groundsmindry<+>groundsmindry
            SHOWIF::"ep4__entrance"
        about thoughtform structure<+>structureloop
            SHOWIF::"embassy__d1_start"
        about obesk<+>obeskloop
        about collapse<+>collapseloop
            SHOWIF::"embassy__d3_start-end"
        about bstrd<+>bstrd
            SHOWIF::"embassy__d3_bstrdintro-start"
        неважно<+>CHANGE::++moth
            FAKEEND::(назад)
`),
                "mth++embassy": generateDialogueObject(`
start
    self
        у меня есть вопрос о посольстве

    moth
        well, i'll do my best, lol
    
    RESPOBJ::mthembresp

loop
    RESPOBJ::mthembresp

groundsmindry
    self
        i want to talk to you about the groundsmindry
        and all the stuff that happened there
    
    moth
        given the complexity, i'd really prefer to have the data in front of me
        sure i have the machines recording stuff, but it's raw
        it's a lot easier to quickly review when it's all loaded up through your spike
        so just load your iteration
        or start a new one in that last part
        then talk to me again, ok?

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)


bstrd
    self
        WHAT IS THIS BSTRD THING
    
    moth
        i gave the data a closer look, at least as close as i can see without a spike myself
        as far as i can tell, it's an autonomous, iteration-limited memory modifier
        it picks one spot in a memory based on its importance, and operates only there
        the fact it can alter the memory at all is honestly incredible
        it's intended for human memories, specifically combat recordings, but...
        maybe the loose structure of obesk memory is actually helping it work?
        anyway don't worry about it spreading, it's limited to the framing device
        which, by the way, i got from a college pal, not off the spike trade
        we'd be boiling in internal affairs already if i got it off the spike trade lol
        but i gotta tell you, this pal of mine...
        they got the spike a few years ago and they've been really strange ever since
        and not in a fun way like with you
        i mean, bless them, they're great, they're just...
        they would say we aren't getting the full experience of their work without a "hard mode"
        despite this being an <em>important operation</em>
        that kind of person, you know?
        at least this one didn't have a title screen

    RESPONSES::self
        i see<+>loop
            FAKEEND::(back)

structureloop
    RESPONSES::self
        game sucks<+>gamebad
            SHOWONCE::
            SHOWIF::"embassy__d3_rec_clear-end"
        actually the game is ok<+>gamegood
            SHOWONCE::
            SHOWIF::"mth++embassy-gamebad"
        but it needs some work<+>gameok
            SHOWONCE::
            SHOWIF::"mth++embassy-gamegood"
        perspective swap?<+>perspective
            SHOWIF::"embassy__d1_start"
        other memories locked?<+>locked
            SHOWIF::[["embassy_d2_complete", true],["embassy_d1_complete", true],["fbx__ep2intro-end", false]]
        back<+>loop
            FAKEEND::(back)

obeskloop
    RESPONSES::self
        kazki guns?<+>kazkiguns
            SHOWIF::"embassy__d3r2-end"
        weird looking obesk?<+>weirdlook
            SHOWIF::"embassy__d1_start"
        is the embassy still around?<+>state
        team members still around?<+>team
            SHOWIF::"embassy__d1_kazkibozko"
        groundsmind?<+>groundsmind
            SHOWIF::"exm|embassy|attendant"
        what is a kalstik?<+>kalstik
            SHOWIF::"exm|embassy|kalstik stand"
        what is an archival vein?<+>archives
            SHOWIF::"embassy__d3_bstrdintro-start"

        back<+>loop
            FAKEEND::(back)

collapseloop
    RESPONSES::self
        cavik?<+>cavik
        the signal?<+>signal
        casualties?<+>casualties
        attacks outside embassy?<+>otherattacks
        back<+>loop
            FAKEEND::(back)

cavik
    self
        AKIZET SAID SOMETHING ABOUT CAVIK...
        POTENTIALLY GETTING THEM KILLED?
    
    moth
        yeah, i saw that too...
        i think this memory is further ahead than the other ones
        we're definitely missing something

    RESPONSES::self
        i see<+>collapseloop
            FAKEEND::(back)

casualties
    self
        how many casualties were there in the collapse?

    moth
        we never really got any solid numbers...
        all we know is enough permanently died that very few physically visit earth anymore
        i've been told it's mostly out of fear now, but...
        i have to wonder if most of the existing qou were actually killed in the collapse
        see, the population of the embassy was only something like a few hundred
        but the obesk have a really low population, like, as a whole
        so when one of them dies, especially a qou, it's a big deal

    RESPONSES::self
        i see<+>collapseloop
            FAKEEND::(back)

signal
    self
        do we know anything about the signal?
        the one that triggered the start of this?

    moth
____SHOWIF::'ep4__h2h'
        officially, no
        nothing i have access to suggests that the FBX does
        but, based on what we saw, it's pretty safe to assume it was a dull signal
        probably from the meteorite, maybe amplified through the embassy's spine
        though that last part is just my own speculation
        cause it ran up through the whole embassy and carried groundsmindry signals, right?
        the embassy easily could have been like, a big antenna
        that's all i got though

____SHOWIF::['ep4__h2h', false]
        no, actually
        i mean, that's me making an assumption
        because if we knew anything, we'd probably have already connected it to the collapse somehow
        we didn't and still don't have any tools that can detect dull signals
        but the fact we didn't know about it does at least confirm that it was a dull signal            
____END

    RESPONSES::self
        that's too bad<+>collapseloop
            FAKEEND::(back)

gameok
    self
        i've been thinking some more
        the game is ok but it needs some work

    moth
        i'll forward that to the hacker i got it from for you
        i'm sure they'll get right on it
    
    RESPONSES::self
        thanks<+>structureloop
            FAKEEND::(back)


gamegood
    self
        actually the game is ok
    
    moth
        ok?
        great
    
    RESPONSES::self
        yes!!<+>structureloop
            FAKEEND::(back)          

gamebad
    self
        game sucks
    
    moth
        ok, first, that's not a question
        second, you're gonna have to deal with it
        the only way we can access this data is with a framing device
        and this is the only one i could get without drawing attention
    
    RESPONSES::self
        fine<+>structureloop
            FAKEEND::(back)

otherattacks
    self
        when the collapse started,
        were there any attacks anywhere else?
    
    moth
        not attacks, really
        but there was some really weird stuff that happened at the same time
        see, the obesk had these things they called polygonation spires
        put them all around the world, used them to track the call's origin point
        looked like big purple spikes that stuck out of the ground, like radio tower height
        they were big tourist attractions for a while, actually
        anyway, when this started, they all melted
        every single one just collapsed on itself
        popular theory was that they relied on something in the embassy that broke...
        but i'm not really sure that's the case anymore
        there are also these old archived videos from way back when of obesk ships acting strangely
        like, darting around in the air and not really going anywhere, nearly crashing into buildings
        nothing bad ever really happened, and some news sites debunked them as CGI hoaxes
        remember, that was also about when the AI shit hit the fan, so...
        man, i'm just rambling - there was all kinds of weird stuff that happened, ok?
    
    RESPONSES::self
        ok<+>collapseloop
            FAKEEND::(back)
    

kazkiguns
    self
        where did kazki get guns?

    moth
        one of the internal initiatives the obesk had involved the exchange of materials
        like, everything - from plastic bottles, to assault rifles
        they gave us stuff too, although obviously it was a little one sided...
        this was like 20+ years ago so idk exactly what the circumstances were,
        but when aliens were new, people probably didn't hesitate to give them whatever
    
    RESPONSES::self
        i see<+>obeskloop
            FAKEEND::(back)
    

perspective
    self
        why can i swap perspectives?
        isn't this a memory from akizet's POV?
    
    moth
        wait, you couldn't swap before?
        that's a stock feature, it's part of the FBX patch
        huh... 
        i guess the other spatial thoughtforms must have been too unstable
        maybe they'll get that too once funfriend gets to them
    
    RESPONSES::self
        that would be nice<+>structureloop
            FAKEEND::(back)

locked
    self
        why are these other two memories not opening up?

    moth
        looking at the data i can access here,
        these two are still totally busted. 
        something to talk to funfriend about for sure
        and the last one... holy smokes
        i don't think your mindspike will even let you render it?
        it's still busted, but i'm also reading that it has 'aggressive action'
        even if we get it repaired,
        your mindspike will block out combat simulations
        it's, like... a legal thing. remember that big mindsci lawsuit?
        although, i do have an idea...
        but, we'll get to that if this ever gets fixed
    
    RESPONSES::self
        i see<+>structureloop
            FAKEEND::(back)

weirdlook
    self
        why do the obesk look like that?

    moth
        well, funfriend said visual data was totally gone, 
        so he had to use cached "network signatures" from "the collective"
        which... i guess is like something like their internet
        they've talked about it a few times in old interviews
        particularly when they first got access to <em>our</em> internet
        looks like they had a lot of fun coming up with stuff
    
    RESPONSES::self
        yes it does<+>obeskloop
            FAKEEND::(back)

kalstik
    self
        what is a kalstik?
    
    moth
        i have absolutely no idea
        sorry lol
    
    RESPONSES::self
        its ok<+>obeskloop
            FAKEEND::(back)

archives
    self
        what is an archival vein?
    
    moth
        well, i can see from surface-level context that it's part of the groundsmindry system
            SHOWIF::[["exm|embassy|archive", false]]
        there are apparently a lot of them, and since it uses the word 'vein'...
            SHOWIF::[["exm|embassy|archive", false]]
        there's probably a whole system they're connected to
            SHOWIF::[["exm|embassy|archive", false]]
        that's the best i can do buddy, do some more scanning and i might be able to help more
            SHOWIF::[["exm|embassy|archive", false]]

        from the context of what you've scanned, i can get a pretty good idea...
            SHOWIF::[["exm|embassy|archive", true]]
        everything is implying that there was an entire vascular-like system of them throughout the embassy
            SHOWIF::[["exm|embassy|archive", true]]
        and all of them had the obesk's data cysts loaded up in bulk amounts...
            SHOWIF::[["exm|embassy|archive", true]]
        ...which all funnelled knowledge down to the groundsmind for 'operational omniscience'
            SHOWIF::[["exm|embassy|archive", true]]
        that's a pretty cool idea, but i can only imagine it made the collapse happen faster
            SHOWIF::[["exm|embassy|archive", true]]
        seems like there'd be a lot of structural failure points if it was an entire tunnel system
            SHOWIF::[["exm|embassy|archive", true]]

    RESPONSES::self
        ok<+>obeskloop
            FAKEEND::(back)

state
    self
        is the embassy still around?

    moth
        there is <em>an</em> embassy, but it ain't this one
        this one collapsed, like it completely melted
____SHOWIF::"ep4__entrancefinal"
        and now we know why
        but knowing that, i really wonder why they bothered building another one
        was it to save face?
        maybe they have a new research team investigating the aftermath?
        or maybe they just didn't wanna totally abandon us, despite what happened
        the obesk totally closed up after the collapse, so we don't have any answers yet

____SHOWIF::["ep4__entrancefinal", false]
        nobody really knows why, that's when the obesk started closing up
        stopped sending out visitors to cities, fbx contacts made themselves sparse...
        it was a whole thing
        and the ocean around the embassy hasn't really been the same since
____END
    
    RESPONSES::self
        i see<+>obeskloop
            FAKEEND::(back)

team
    self
        are akizet's team members still around?

    moth
        no idea
____SHOWIF::"ep4__entrancefinal"
        really, truly, there's so much unanswered now that i can't even guess
        maybe they fled home? 
        maybe they're still here, working within their conflict
        we're just gonna have to find out i guess

____SHOWIF::["ep4__entrancefinal", false]
        i mean, people say they all disappeared, but...
        honestly, like, all the obesk pulled back
        i wouldn't be surprised if they just went back home
        whatever happened with the embassy collapse completely spooked all of them
____END
    
    RESPONSES::self
        i see<+>obeskloop
            FAKEEND::(back)

groundsmind
    self
        what is a groundsmind?

    moth
        oh, you don't know?
        it's pretty cool
        basically, they assign someone to be the "groundsmind" of major structures
        they connect to this gigantic corrucyst that's hooked up to the walls
        and they kind of just control everything
        it's like they become the building
        sounds familiar, right?
        that idea ended up inspiring the whole mindspike industry
        it's one of those little bits of history that gets forgotten all the time
    
    RESPONSES::self
        i see<+>obeskloop
            FAKEEND::(back)

`),
                "quality": generateDialogueObject(` 
start
    moth
        воу... погоди-ка
        чел, это самая плотная мыслеформа из всех что мы здесь пока что видели
        типа--эт довольно жёстко
        какого года там твой мыслекол? он точно с этим справится?
        ну, дело конечно не моё...
        но я включу выбор качества, на всякий
    
    sys
        ВНИМАНИЕ::'пожалуйста, выберите качество визуализации по-умолчанию'
        ПРИМЕЧАНИЕ::'качество может быть изменено в системном меню'
        ПРИМЕЧАНИЕ::'ОБЫЧНОЕ';'визуализирует все сущности';'анимированные мыслеформы'
        ПРИМЕЧАНИЕ::'НИЗКОЕ';'визуализирует только сущности, необходимые для потока'
        ПРИМЕЧАНИЕ::'выбор НИЗКОГО включает <span style="ПРИМЕЧАНИЕ::'предоставляет альтернативы управлению прокси';'предназначена для решения проблем с оборудованием'">ПОНИЖЕННУЮ ИНТЕНСИВНОСТЬ</span>';'переключение в системном меню'

    RESPONSES::sys
        ОБЫЧНОЕ<+>END
            EXEC::setTimeout(()=>{setQualityPreference('regular')}, 500)
        НИЗКОЕ<+>END
            EXEC::setTimeout(()=>{setQualityPreference('low');setIntensityPreference(true)}, 500)
`),
                "barfriendresp": generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        апельсиновый сок<+>orange
        неважно<+>END
            EXEC::pauseSwapCam(false)
`),
                "barfriend": generateDialogueObject(`
start
    sourceless
        перед витриной с симулякрами стоит бардруг
            EXEC::pauseSwapCam(true)
        меня редко посещает желание взаимодействовать с ним
        однако сейчас один из этих случаев
____SHOWIF::[["netstat|<", 0], ["citystreet_gotdrinks"]]
        тот цитрусовый напиток, что я попробовала в городе посла...
        каким бы ужасным он ни был,
        он что-то пробудил
____SHOWIF::[["netstat|>=", 0]]
        ещё один θвзор на этой светлой планете...
        требует не менее светлого напитка
____END
    
    akizet
        бардруг!
    
    barfriend
        ЗДРАВСТВУЙТЕ АКИЗЕТЕШЕ

    RESPOBJ::barfriendresp

orange
    sourceless
        да... <span definition="ПРИМЕЧАНИЕ::'не требуется перевод'">АПЕЛЬСИНОВЫЙ</span> СОК
        вот чего я желаю
        экзотичный вкус--с эффектом цитрусовой кислоты!

    akizet
        симулякр апельсиного сока, пожалуйста!
    
    barfriend
        хорошо!
    
    sourceless
        бардруг протягивает конечность к витрине с апельсиновыми симулякрами
        она проходит через цистозную стенку, как рука сквозь воду,
        в конце концов он извлекая шарообразный стакан, светящийся апельсиновым соком
        хотя... настоящий апельсиновый сок не светится
____SHOWIF::[["netstat|<", 0]]
        но он выглядит классно
____SHOWIF::[["netstat|>=", 0]]
        но он напоминает свечение спелого сельки
        подобая вкусу
____END
    
    barfriend
        держите!
            EXEC::document.querySelectorAll('.drinklayer').forEach(e=>e.setAttribute('drink', 'orange'))
        пожалуйста, наслаждайтесь!!
    
    akizet
        благодарю тебя, бардруг

    RESPONSES::akizet
        отбыть<+>END
            EXEC::pauseSwapCam(false)
`),
                "embassyRelocatorResponses": generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        персонал<+>personnel --- ?
            SHOWIF::[['EXEC::env.embassy.relocatorReturn != \`personnel\`']]
            HIDEREAD::
        зона отдыха<+>recreation
            SHOWIF::[['EXEC::env.embassy.relocatorReturn != \`recreation\`']]
            HIDEREAD::
        исследование зова<+>research
            SHOWIF::[['EXEC::env.embassy.relocatorReturn != \`research\`']]
            HIDEREAD::
        неважно<+>END
            EXEC::pauseSwapCam(false);
`),
                "embassyRelocator": generateDialogueObject(`
start
    movefriend
        ПРИВЕТ АКИЗЕТЕШЕ!
            EXEC::pauseSwapCam(true)
        КУДА НАПРАВИМСЯ!
    
    RESPOBJ::embassyRelocatorResponses

personnel
    akizet
        персонал, пожалуйста

    movefriend
        ХОРОШО!
    
    sourceless
        путь, по которому я вошла в переместитель, запечатывается
        через мгновение на месте старого прохода открывается новый
            EXEC::env.embassy.relocatorDestination('personnel')

    movefriend
        увидимся!
    
    RESPONSES::akizet
        спасибо<+>END
            EXEC::pauseSwapCam(false)

recreation
    akizet
        нижняя зона отдыха, пожалуйста

    movefriend
        ХОРОШО!
    
    sourceless
        путь, по которому я вошла в переместитель, запечатывается
        через мгновение на месте старого прохода открывается новый
            EXEC::env.embassy.relocatorDestination('recreation')

    movefriend
        хорошо повеселиться!
    
    RESPONSES::akizet
        спасибо<+>END
            EXEC::pauseSwapCam(false)

research
    akizet
        центр исследования зова, пожалуйста

    movefriend
        ХОРОШО!
    
    sourceless
        путь, по которому я вошла в переместитель, запечатывается
        через мгновение на месте старого прохода открывается новый
            EXEC::env.embassy.relocatorDestination('research')

    movefriend
        приятной работы!
    
    RESPONSES::akizet
        спасибо<+>END
            EXEC::pauseSwapCam(false)
`),
                // discovery
                "d1_akizet": generateDialogueObject(` 
start
    sourceless
        надо бы проведать команду... наше сосредоточение близится
            SHOWIF::["PAGE!!beenToResearch", false]
        казки и бозко должны присутствовать прежде чем мы начнём... где же они?
            SHOWIF::[["PAGE!!d1_kbcollected", false], ["PAGE!!beenToResearch", true]]
        пора начинать - мне стоит присесть! моё кресло дальше всего от двери, рядом со слушателями
            SHOWIF::[["PAGE!!d1_kbcollected", true], ["PAGE!!beenToResearch", true]]

    RESPONSES::akizet
        меня ждёт работа<+>END
    
    RESPONSES::self
        попробовать взаимодействовать<+>interact
            SHOWONCE::

interact
    self
        акизет, привет?
        ты меня слышишь?

    moth
        хмх?
        о... вcё ясно

    sourceless
        ...

    moth
        не думаю что это сработает
        это воспоминание слишком связно
        не ну если бы у нас была возможность типа... повреждать мыслеформы, то может
        но развледруг бы взбесился
    
    RESPONSES::self
        чёрт<+>END
`),
                "d1_start": generateDialogueObject(` 
start
    sourceless
        моё сознание возобновляется
        омолаживающая камера раскрывается, и извне струится свечение цистозного стекла посольства
        сквозь далекое открытие серое я чувствую, что начался новый θвзор

    RESPONSES::akizet
        выйти из камеры<+>emerge
            EXEC::content.classList.add('swapcam')
    
emerge
    sourceless
        я выкарабкиваюсь из камеры, куу-тело - освежённое
        оно ощущается таким же, как сразу после моего вознесения
        редкое, но чудесное ощущение - словно я могла бы извернуть его в любую форму
        но меня ждёт работа...
        близится сосредоточенное совещание моей инициативы по исследованию зова
        и что за дивное событие - этот раз в нашем распоряжении особенно необычное оборудование!
        я должна собрать нашу команду, тогда мы сможем начать
    
    RESPONSES::akizet
        за работу<+>END

SKIP::content.classList.add('swapcam')
`),
                "d1_tozik": generateDialogueObject(` 
start
    sourceless
        тозик сидит в терминальном кресле, соединённый с времядержцем через рецептор
            EXEC::pauseSwapCam(true);
        временное сжатие, за которое великая циста получила своё название, не активировано
        должно быть, он пользуется ей только ради архивных связей
        я перебираюсь через изгиб времядержца, чтобы поздороваться с ним

    akizet
        здравствуй, тозик!

    sourceless
        в том мимолётном взгляде на меня я вижу его распознание
            EXEC::vnp({hideStage: true, tozik: "show"})
        однако его внимание обращено вовнутрь, сквозь корруцистозную вену
        тозика раздражает пустая болтовня, поэтому я решаю не медлить
    
    akizet
        ты подготовился к сосредоточению?
        вообще, ты именно этим и занимаешься?
    
    tozik
        да
        я упорядочиваю подключенные архивные цисты
        едва ли θподмиг назад произошло кое-что очень интересное
        ты услышишь об этом на сосредоточении
    
    akizet
        чудно
        тогда скоро поговорим
    
    RESPONSES::akizet
        простимся<+>END
            EXEC::pauseSwapCam(false);vn.done()
`),
                "d1_gakvuresp": generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        ложная среда?<+>false
        жалоба...<+>complaint
        твоя накидка<+>coat
            SHOWIF::'gakpause'
        простимся на сейчас<+>END
            EXEC::pauseSwapCam(false);vn.done()
`),
                "d1_gakvu": generateDialogueObject(` 
start
    sourceless
        гакву прислоняется к слушателю, глаза отрешённые
            EXEC::pauseSwapCam(true);
        на одном из её рецепторов расположена циста с ложной средой
        когда я подхожу и наклоняю голову в обе стороны, я не могу разобрать на ней логотипа
        я задаюсь вопросом - это очередная симуляция поверхности? у неё нездоровая одержимость ими
        естественно, это привлекает её внимание, и она бросает мне весёлый жест рецептором
            EXEC::vnp({hideStage: true, gakvu: "show"})
        
    gakvu
        привет акизет!
        готова к сосредоточению?

    akizet
        да!
        как раз хотела спросить тебя о том же, вообще-то
        у тебя найдётся что-нибудь?
    
    gakvu
        о да!!
        чуть ранее мы с тозиком отслеживали зов и...
    
    sourceless
        Она оглядывается на Тозика, уставившегося куда-то внутрь
    
    gakvu
        ну, это он его нашёл, на самом деле,
        но в зове был пик
        явное расхождение с базовой линией
        очень интересно!
    
    akizet
        и что вы сделали?
    
    gakvu
        ты его видела? он кожей сросся с креслом!
        мне пришлось самой носить все архивные цисты и скармливать их времядержцу
        aх, ну конечно не без помощи кавика

    sourceless
        я усмехаюсь, и она тоже, но я чувствую, что по другой причине
    
    gakvu
        тебе нужно ещё что-нибудь?
        иначе я буду здесь до начала сосредоточения

    sourceless
        мне больно это делать
        но, пожалуй, стоило бы поговорить о той жалобе...
        
    RESPOBJ::d1_gakvuresp

complaint
    akizet
        есть один момент, который я должна упомянуть
        гакву, ты и я, мы понимаем
        однако... равновесие между работой и
    
    gakvu
        бозко!

    sourceless
        что
        бозко уже говорил с ней??
        моё смятение обнажается в завитках моих рецепторов
    
    gakvu
        разве это был не он?
        я знаю это был он!
        он просто не в ладах с экивиками
        
    sourceless
        я смеюсь и спешно размахиваю руками и рецепторами в отрицании
        она тоже смеётся--не сомневаюсь, она ценит моё понимание сухого экивикового острословия
        
    akizet
        нет-нет, гакву...
        не имеет значения, кто обратил на это моё внимание
        я знаю, что тебе нравится работать здесь,
        и, прежде всего, я знаю твою способность разить
        но для некоторых других это не так очевидно
        и если этих жалоб станет слишком много, на меня начнут коситься
        так что, ради меня, 
        
    sourceless
        я задерживаюсь, чтобы подобрать изящный способ выразить это...
        "хотя бы прикидывайся занятой, когда ты здесь"?
        гакву самодовольно скручивает свои рецепторы, прекрасно понимая, что я хочу сказать

    gakvu
        не волнуйся, я понимаю
    
    akizet
        отлично!

    RESPOBJ::d1_gakvuresp

false
    akizet
        что это за ложная среда у тебя?

    gakvu
        а! видишь ли,
    
    sourceless
        в движении её рецепторов я замечаю непонятную, едва уловимую робость
        однако она тут же пускается в резвое описание

    gakvu
        вот эта - из моего дома
        воспоминания бывалого вейлькового прыгуна в форме игры
        значит так: вейльки несутся к погодной стене,
        а ты должна перепрыгиваешь со одного на другого, пока они всё набирают скорость,
        иначе ты исчезнешь за воздушной границей!!

    sourceless
        по жестикуляции её рецепторов и рук кажется,
        будто она пытается со мной торговаться
    
    akizet
        звучит ужасающе
    
    gakvu
        вот поэтому и так весело! попробуй как-нибудь

    RESPOBJ::d1_gakvuresp

coat
    akizet
        твоя накидка...
        я никогда не видела её погашенной!
        
    sourceless
        гакву направляет свое внимание наружу, чтобы уставиться на неё
        она тянет за ложную ткань, покручивая рецепторы в замешательстве
    
    gakvu
        о
        это необычно!
        я никогда её не выключаю
    
    sourceless
        кручение её рецепторов постепенно набирает силу

    gakvu
        что я только что сказала?
            EXEC::ratween(env.bgm, 0.75, 3000);content.classList.add('incoherence')
        'выключаю'?
        это грибок...
        так, нет--это изображение грибка...
        которое я имитирую в своей одежде!
    
    sourceless
        я слежу за ней с некоторым беспокойством - она говорит вещи, которые я уже знаю
        будто она убеждает себя... но зачем? это очень странно
    
    akizet
        ты в порядке?

    gakvu
        ах...
        да!
            EXEC::ratween(env.bgm, 1, 3000);content.classList.remove('incoherence')
        извини... иногда, когда я пользуюсь этими ложными средами,
        у меня перекрывается контекст!
        на θмиг, то словно была не я, а моя подпись!
        мне правда стоит ставить эти штуки на паузу во время разговоров, хихи

    sourceless
        свечение её накидки продолжается
            EXEC::change("gakpause", false);content.classList.remove('gakpause')

    moth
        любопытно... это была своего рода утечка памяти
            SHOWONCE::
        бессвязность серьёзно подскочила
            SHOWONCE::
        больше так не делай, ок?
            SHOWONCE::

    RESPOBJ::d1_gakvuresp
`),
                "d1_kazkibozkoresp": generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        наше сосредоточение близится<+>focus
            EXEC::change('PAGE!!d1_kbcollected', true)
        о чём вы говорили?<+>story
        как у вас дела?<+>talk
        простимся на сейчас<+>END
            EXEC::specialCam(false);pauseSwapCam(false);vn.done()
`),
                "d1_kazkibozko": generateDialogueObject(` 
start
    sourceless
        БОЛТОВНЯ БОЗКО И КАЗКИ, СТОЯЩИХ У ВНУТРЕННЕЙ СТЕНЫ, ЗАГЛУШАТСЯ МНОЖЕСТВОМ ДРУГИХ
            EXEC::pauseSwapCam(true);
        ВЕТВИСТЫЕ РЕЦЕПТОРЫ КАЗКИ ЖЕСТИКУЛИРУЮТ ТАК ЖЕ БУРНО, КАК И ЕЁ РУКИ, ПОКА ОНА ГОВОРИТ С БОЗКО
        ЕГО ВНИМАНИЕ В ОСНОВНОМ ЗАНИМАЕТ θокно, ГДЕ ОН НАБЛЮДАЕТ ЗА ИССЛЕДОВАТЕЛЬСКИМ СУДНОМ БЛИЗНЕЦОВ
        ЕЁ ИСТОРИЯ СТАНОВИТСЯ ВСЁ БОЛЕЕ ОТЧЁТЛИВОЙ ПО МЕРЕ ТОГО, КАК Я ПРИБЛИЖАЮСЬ
    
    kazki
        ... а я сказала, это всё потому, что мой личиночный облик был тиром! и рассказала ему о функции, которую это влечёт за собой...
        даже немного коснулась той истории с раскопок козазни--ну ты её знаешь, э, когда я там только начала работать
    
    bozko
        о, нет

    kazki
        и пока я всё это произносила, мой развледруг пытался меня о чём-то предупредить, но я продолжала говорить...
        закончив, я проверила, о чём - а всё это время он просил меня остановиться!
        оказывается, на лице того близнеца был написан ужас! словно я вдруг захотела бы плеснуть на него кислотой! 
        ахахаха!!

    sourceless
        БОЗКО УСМЕХАЕТСЯ И НЕМНОГО ЗАКАТЫВАЕТ РЕЦЕПТОРЫ
        ОН ОТВОДИТ ВЗГЛЯД ОТ ОКНА НА КАЗКИ, СЛУЧАЙНО ЗАМЕЧАЯ МОЁ ПРИБЫТИЕ
        ЕЩЁ ОДИН НЕБОЛЬШОЙ ЖЕСТ РЕЦЕПТОРОМ, И КАЗКИ ПОВОРАЧИВАЕТСЯ ЛИЦОМ КО МНЕ, ДОВОЛЬНАЯ
            EXEC::specialCam('kazkibozko');vnp({bg: true, kazki: "show", bozko: "show"})

    bozko
        здравствуй, акизет

    kazki
        привет акизет!!
    
    akizetа
        здравствуйте мои друзья
    
    RESPOBJ::d1_kazkibozkoresp
    
story
    sourceless
        МОЁ ЛЮБОПЫТСТВО НЕ СДЕРЖАТЬ
        ИСТОРИИ КАЗКИ, ПУСТЬ ГИПЕРБОЛИЗИРОВАННЫЕ, ВСЕГДА ЗАНИМАТЕЛЬНЫ

    akizet
        что за историю ты рассказывала, казки?
    
    sourceless
        ЕЁ ВЕТВИСТЫЕ РЕЦЕПТОРЫ ЗАДОРНО РАСПРАВЛЯЮТСЯ В ВЕЕР

    kazki
        а! я недавно посещала нацию австралии! 
        для встречи по поводу полигонизационного шпиля, видишь ли
        всё прошло хорошо, но моему собеседнику было любопытно, потому что он никогда не встречал некогда-тиров,
        и поэтому у него был ряд вопросов, не связанных с одобрением строительства
        больше всего о моих рецепторах...
        которое!! кстати говоря! строительство было одобрено!
    
    bozko
        под какой-то смешок велзи ей пришло в голову поделиться событиями её ранней личиночной работы
    
    sourceless
        ИСТОРИЯ С РАСКОПОК козазни...
        НУ КОНЕЧНО НЕСВЕДУЩИЙ СВЕТЛЫЙ БЛИЗНЕЦ ИСПУГАЛСЯ БЫ ЗА СВОЮ ЖИЗНЬ, УСЛЫШАВ ТАКОЕ

    kazki
        я же ненароком! ему показалось забавным после того, как я разъяснила его страхи!
    
    akizet
        я говорю это с глубоким уважением, казки,
        но с учётом того, насколько беспечно ты таким делишься с близнецами,
        твои дипломатические успехи никогда не перестают удивлять

    RESPOBJ::d1_kazkibozkoresp
    
talk
    akizet
        друзья мои, какие новости вы несёте?
        о себе самих, разумеется
        для наших работ нас ждёт сосредоточение
    
    sourceless
        БОЗКО ЗАГЛЯДЫВАЕТ В РАСЧЁТ θокна
    
    bozko
        вне нашей работы,
        я наблюдал за существами в водах поблизости
        через несколько погружённых θголемов с ретрансляторами
        вот, взгляни на это--видишь, как они формируют большие организованные облака?

    sourceless
        БОЗКО ТЯНЕТСЯ В θокно, НАРУШАЯ РАБОТУ ДИСПЛЕЯ, ЧТОБЫ ИЗВЛЕЧЬ СОЕДИНИТЕЛЬНУЮ ЦИСТУ ИЗ ЕЁ ВНУТРЕННЕГО РАЗЪЁМА
            EXEC::content.classList.add('bozkoceptor');vnp({fade: true})
        ОН ПРИКРЕПЛЯЕТ ЕЁ К БЛИЖАЙШЕМУ РЕЦЕПТОРУ И НАСТРАИВАЕТ ДИСПЛЕЙ НА ВСПОМИНАНИЕ
        ЦВЕТА В θокне РЯБЯТ ПОКА НЕ ЗАСТЫВАЮТ НА МЕНТАЛЬНОЙ ПРОЕКЦИИ
            EXEC::content.classList.add('fishies')
        КАК ОН И ГОВОРИЛ - ОБЛАКО БЕЗУПРЕЧНО СОРИЕНТИРОВАННЫХ ВОДНЫХ ОБИТАТЕЛЕЙ
        КАК ИМ ЭТО УДАЁТСЯ?

    akizet
        удивительно

    bozko
        и среди нас я не единственный, кто наблюдает за существами светлого мира
    
    sourceless
        БОЗКО ВОЗВРАЩАЕТ СОЕДИНИТЕЛЬ ПОД ПОВЕРХНОСТЬ θокна
            EXEC::content.classList.remove('bozkoceptor')
        ИЗОБРАЖЕНИЕ ВСКОРЕ РАССЕИВАЕТСЯ
            EXEC::content.classList.remove('fishies');vnp({fade: false})
        ПОСЛЕ НЕКОТОРОГО МОЛЧАНИЯ ОН ДРАЗНЯЩЕ УКАЗЫВАЕТ В СТОРОНУ КАЗКИ

    kazki
        бозко!
    
    bozko
        впрочем, она придерживается более живого подхода

    kazki
        бозко!!

    sourceless
        ЕЁ РЕЦЕПТОРЫ СВЁРТЫВАЮТСЯ САМИ В СЕБЯ, ПОДОБНО СЖАТЫМ КУЛАКАМ

    kazki
        ладно, ладно!
            EXEC::vnp({kazki: "focus"})
        я провожу один эксперимент, акизет
        ну, ммм, вроде того
        во время поездки в австралию я увидела маленькое существо, бегающее по окну
        так что я присмотрелась... и у него было восемь ножек, яркие полосочки и куча больших глаз! и оно пялилось прямо на меня!
        у него даже была бронированная кожа, ну вылитый <span definition="ПРИМЕЧАНИЕ::'частичный перевод';'сгенерировано из унаследованного контекста'">пещерный страж</span>!
        и--и я подумала, "ай, какой милашка!" и мне захотелось взять его себе!

    sourceless
        ОТ ТОГО, С КАКИМИ ЭМОЦИЯМИ ОНА ПРИДАЁТ ВЕС СВОИМ СЛОВАМ,
        ОНА БУДТО ЖДЁТ ТОГО, КОГДА Я СКАЖУ, ЧТО ЕЙ НУЖНО ВЕРНУТЬ ЕГО ОБРАТНО

    bozko
        так что она сделала полость в своей голове
            EXEC::vnp({kazki: "defocus"})
    
    akizet
        что? ты с--?

    kazki
        я ещё не дошла до этого!!
            EXEC::vnp({kazki: "focus"})
        так вот... я собиралась поднять его, а он вскочил мне на руку!
        словно он хотел быть со мной! ах, но к этому времени несколько светлых близнецов пришли узнать, чем я занимаюсь...
        так что я простилась и вернулась к своему судну
        и тут я осознала--на наших суднах отсутствует система жизнеобеспечения, так что, чтобы сохранить ему жизнь... мне нужно было думать!
        своей головой!
    
    akizet
        значит, ты опустошила свою голову
        и держишь его в воздушном кармане?

    kazki
        именно!! хочешь взглянуть???
    
    sourceless
        МОИ РЕЦЕПТОРЫ НЕМНОГО ОБВИСАЮТ, И Я УСМЕХАЮСЬ В НЕВЕРИИ
        БОЗКО ОЧЕНЬ ЗАБАВЛЯЕТСЯ МОЕЙ РЕАКЦИЕЙ
        ДЕЙСТВИТЕЛЬНО, ЭТО И ПРОБЛЕМА, И РЕШЕНИЕ, К КОТОРОМУ МОЖЕТ ПРИЙТИ ТОЛЬКО НЕКОГДА-ТИР
    
    akizet
        конечно хочу

    sourceless
        КАЗКИ НАКЛОНЯЕТ ГОЛОВУ ВПЕРЕД, И ЧЕРТЫ ЕЁ ЛИЦА ТАЮТ, А ЦВЕТ КОЖИ СТАНОВИТСЯ ПРОЗРАЧНЫМ
            EXEC::specialCam('kazkihead');content.classList.add('kazkihead')
        ОНА ПУСТАЯ, И ЯСНАЯ, КАК СТЕКЛО СВЕТЛЫХ БЛИЗНЕЦОВ, СОДЕРЖАЩАЯ ЛИШЬ ПРОСТОРНУЮ СФЕРИЧЕСКУЮ ПОЛОСТЬ
        Я ПОВОРАЧИВАЮ ГОЛОВУ ИЗ СТОРОНЫ В СТОРОНУ, ДАЖЕ РЕГУЛИРУЮ ТОЧНОСТЬ ГЛАЗ, НО НЕ ВИЖУ ЕГО
        ПО КРАЙНЕЙ МЕРЕ, НЕ СРАЗУ... НО ВДРУГ ОНО ОКАЗЫВАЕТСЯ ТАМ, СИДЯЩЕЕ НА ЕДВА РАЗЛИЧИМЫХ НИТЯХ СВОЕГО СОБСТВЕННОГО ТВОРЕНИЯ
    
    sys
        ОПОВЕЩЕНИЕ::'обнаружено воспоминание об арахниде';'визуализировать?'

    RESPONSES::sys
        визуализировать<+>arthur
            EXEC::content.classList.add('spider')
        пропустить<+>arthur

arthur
    sourceless
        ОН СМОТРИТ НА МЕНЯ, ПОТОМ ПОДНИМАЕТ ПЕРЕДНИЕ ЛАПЫ И МАШЕТ ИМИ В РАЗНЫЕ СТОРОНЫ
        Я ПРЕДСТАВЛЯЮ, ЧТО ЭТО СВОЕГО РОДА УГРОЗА
    
    akizet
        я вижу, почему ты решила взять его себе
    
    sourceless
        КАЗКИ СНОВА РАЗМЕЩАЕТ ЧЕРТЫ ЛИЦА И ПРИТЯГИВАЕТ СВОЮ ГОЛОВУ ОБРАТНО
            EXEC::specialCam('kazkibozko');content.classList.remove('kazkihead')
    
    kazki
        столько жизни в этих крохотных глазках!
            EXEC::content.classList.remove('spider');vnp({kazki: "defocus"})

    RESPOBJ::d1_kazkibozkoresp

focus
    akizet
        наше сосредоточение близится, друзья
        вы готовы? есть ли у вас темы для обсуждения?
    
    sourceless
        ОНИ ОБА УТВЕРДИТЕЛЬНО КИВАЮТ РЕЦЕПТОРАМИ

    kazki
        да!
    
    akizet
        good! report to the signal chamber when you are ready // --- что за signal chamber....... речь вроде бы о центре исследования зова но эфхввзщолвр
        i arranged for the timestopper to be used this time, so it will be quick
    
    bozko
        замечательно
        мы скоро будем, иди без нас

    RESPOBJ::d1_kazkibozkoresp
`),
                "d1_kazki_research": generateDialogueObject(`
start
    akizet
        готова приступить, казки?
    
    kazki
        <span definition="ПРИМЕЧАНИЕ::'распространённая фраза';'оригинальный каламбур непереводим';'сгенерирован альтернативный каламбур';'сохраняет уровень юмора'">безкуусловно!</span>
    
    akizet
        хехе, замечательно
    
    RESPONSES::akizet
        мы скоро начнём<+>END
`),
                "d1_bozko_research": generateDialogueObject(`
start
    akizet
        готов приступить, бозко?
    
    bozko
        конечно
        мне лишь бы хотелось иметь больше, чем поделиться, учитывая наши средства в этот θвзор
    
    akizet
        согласна!
        с времядержцем часто кажется, что всего мало
    
    RESPONSES::akizet
        мы скоро начнём<+>END
`),
                "d1_cavikresp": generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        наше сосредоточение близится<+>focus
        теория замкнутого цикла?<+>theory
        как у тебя дела?<+>talk
        простимся на сейчас<+>END
            EXEC::pauseSwapCam(false);vn.done()
`),
                "d1_cavik": generateDialogueObject(` 
start
    sourceless
        CAVIK ATTENDS TO THE ARCHIVAL CYSTS, OCCASIONALLY AFFIXING ONE TO A STOUT RECEPTOR
            EXEC::pauseSwapCam(true);
        THE CYSTS ARE ARRANGED IN NEAT PILES, SORTED BY THE SHADE OF THEIR VISCERA
        THOUGH HIS REGULAR UPKEEP ENSURES THAT NONE GROW TOO DARK OR STARVE
        HE SENSES MY APPROACH AND TURNS, CORDIALLY BOWING HIS HEAD AND RECEPTORS
            EXEC::vnp({cavik: "show", hideStage: true})
    
    cavik
        akizet! great gaze!
            
    akizet
        likewise, my friend
        what are you doing?

    cavik
        i was just conducting maintenance on some of our older archives
        and reminiscing! oh, the wild and obeski-centric theories they used to toss about!
        there is this old one i have been running through--a joint theory by none other than dullzkovik and azkavinesche!
        they called it the 'closed loop' - have you heard of it?
    
    akizet
        ah...

    sourceless
        OH NO
        OF COURSE I HAVE
        I SHOULD ENSURE HE DOES NOT FEEL IT APPROPRIATE TO SHARE THIS WITH THE BRIGHT COUSINS

    cavik
        i feel that it was almost formed as a satire of the more outlandish ones from the early era, but...
        there is something oddly compelling about it!
        oh--sorry, do you have need of me?
    
    RESPOBJ::d1_cavikresp

focus
    akizet
        our focus approaches, my friend
        are you prepared? do you have any topics to bring?
    
    sourceless
        I SENSE UNEASE FROM HIS STANCE

    cavik
        ahh!! it is really time already?
        oh, these old cysts do not have any time constriction... no wonder!
        ah, yes, yes, i will be ready!
        yes!
    
    akizet
        you do not need to press yourself, my friend
        it is a simple one
    
    cavik
        i know, i just hate when this happens
        i do not have anything to bring this time... but i will be ready!
    
    akizet
        excellent
    
    RESPOBJ::d1_cavikresp
    
theory
    sourceless
        I WOULD PREFER NOT TO CRUSH HIS INVESTIGATIVE SPIRIT
        BUT THESE EARLY THEORIES CARRY LESS WORTH THAN <span definition="NOTE::'partial translation';'inherited description-generated noun'">WALL-ROT</span>
        ESPECIALLY DULLZKOVIK'S, VELZIE'S SMILE UPON HIM
    
    akizet
        closed loop...
        is that the time--
    
    cavik
        time manipulation!! yes! let me remind you! 
        dullzkovik posited that one era... we learn to use the dull plane to traverse space four-dimensionally
        and our future selves eventually discover the home of the bright cousins, but far too late to meet them
        so--we create a contrivance just big enough to release a message to ourselves and signal its location!

    sourceless
        OH, CAVIK
        I TWIST MY RECEPTORS THOUGHTLESSLY, ACCIDENTALLY BARING MY SKEPTICISM
        
    cavik
        now--i know you must think it is ridiculous, 
        and it is! especially as it goes on, hehe
        but is it not inevitable at the same time?
        in our θdeaths, there is enough time to unravel any mystery--time manipulation included!
    
    akizet
        first...
        i do not think dullzkovik understood the full implication of creating a contrivance inside a planet at that point
        that was before the incident with the shared moon, you know
        and, time manipulation... 
        if we ever were to manage it,
        the mistakes that created us and our world would be gradually undone to right old wrongs
    
    cavik
        but we would never know if it was happening, would we? it would just 'be'!
        anyway, i will not seriously debate it with you--it is just a bit of fun
    
    sourceless
        TO BE SURE...
    
    akizet
        yes, of course!
        and--you are not going to share this with any cousins, correct?

    sourceless
        I SEE THE DEJECTION EVEN AS HE TRIES TO HIDE IT BENEATH AN ARCHIVAL CYST
        HOW JOYLESS I MUST SEEM, SUCH A TERRIBLE INVERSION OF OUR YOUTH
        BUT I REALLY WOULD PREFER NOT NEEDING TO FIX ANOTHER OVERSHARING INCIDENT
    
    cavik
        aki...
        i would not seriously entertain sharing <em>this</em> one.
        did you really think that?
        i know i made an incorrect step, but
    
    akizet
        cavik, cavik! i trust you, be at ease
        you know how i must be during these times
        do not feel at fault
    
    cavik
        of course, no, no, i understand

    sourceless
        ¥IÁÈiæb4
        ANOTHER LITTLE DEATH TO HAUNT ME
    
    RESPOBJ::d1_cavikresp

talk
    akizet
        cavik, my friend, tell me
        what news do you carry?
        have you been enjoying your role?
        it is not often that we have time to speak plainly anymore

    cavik
        i have! the oceans are truly mesmerizing, nothing at all like home
        you should see all the artifacts that the cousins have simply left to the water!
        and on our expeditions, so many little creatures come up to examine our vessels
        has bozko told you about the one he has taken?
    
    sourceless
        FOR THAT MOMENT I HEARD AN ECHO OF LARVAL JOY IN HIS VOICE
        BUT IN THE SUBTLE TURN OF A RECEPTOR, I SEE HE FEELS HE SHOULD NOT HAVE SAID THAT
    
    cavik
        that is fine, right?
        you heard that from a veilk's whisper, not me
    
    akizet
        haha! it is! it is perfectly fine
        well, the groundsmind says we should not, since the cousins could get mad, but...
        i do not really care
        tell me - have you contributed any more to the <span definition="NOTE::'partial translation';'inherited description-generated noun'">life-pod</span> project?
    
    cavik
        ahh! no! not in some time
        but i hear they recently succeeded in sending a 'grain' back to obeski
        it is, of course, being held in deep quarantine, but...
        that it worked is promising alone
        even if the cyst itself was bigger than both of us combined!

    akizet
        remarkable, i must check in with them to see how they did it
        as trade continues, i imagine that organic materials will be the next leap in relations
        if you find the time again, you should join the effort!
        last i spoke with the team, they asked when they would see you again
    
    cavik
        really??
        i should! i will check in again with them!
    
    RESPOBJ::d1_cavikresp
`),
                "d1_attendantresp": generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        времядержец<+>timestopper
        это всё<+>leave
            FAKEEND::(уйти)
`),
                "d1_attendant": generateDialogueObject(` 
start
    sourceless
        I APPROACH THE ATTENDANT DRONE
            EXEC::pauseSwapCam(true)
        IT IS FACELESS AT THE MOMENT
        SO IT REGARDS ME WITH A SIMPLE STARE

    RESPONSES::akizet
        speak with groundsmind<+>groundsmind
        неважно<+>END
            EXEC::pauseSwapCam(false);
    
groundsmind
    akizet
        the groundsmind, please

    attendant
        OF COURSE!

    sourceless
        THE DRONE STRAIGHTENS, AND A CONNECTIVE RIPPLE PASSES THROUGH ITS SKIN
        OUR GROUNDSMIND'S SYMBOL IS FORMED OVER ITS FACEPLATE
            EXEC::content.classList.add('groundsminded')
        
    akizet
        привет векоа!!
    
    groundsmind
        акизетеше. говори

    RESPOBJ::d1_attendantresp
    
timestopper
    akizet
        i appreciate you affording us the timestopper
        how long was it again that we have it?

    groundsmind
        originally you had it for only a few θgazes... 
        however: as of a few θwinks prior, it is indefinitely in the care of the call initiative
        the schedule has shifted due to materials no longer needing an upcoming simulation
        once another initiative has need of it, it will be transferred

    akizet
        really? we moved quite a bit of cystery to accommodate it,
        and still only the top barely fits in the room...
    
    groundsmind
        is this a request to have it removed post-use?
        this can be arranged
    
    akizet
        hmm... no, no
        the cysts were not vital, and this may be a boon
        it does shorten our meetings and plans by orders of magnitude
        if it becomes a bother, i will reach out again

    RESPOBJ::d1_attendantresp

leave
    akizet
        это всё!
    
    groundsmind
        превосходно
        до свидания
    
    sourceless
        THE DRONE DISCONNECTS FROM THE GROUNDSMIND AND STANDS STILL ONCE MORE
            EXEC::content.classList.remove('groundsminded')
    
    RESPONSES::akizet
        уйти<+>END
            EXEC::pauseSwapCam(false);

END::content.classList.remove('groundsminded');
`),
                "discovery_notyet": generateDialogueObject(` 
start
    sourceless
        вот где я буду сидеть...
        как только соберу всю команду.
        гакву, тозик и кавик все здесь
        все кроме казки и бозко
        я должна сказать им, что пришло время для сосредоточения
        они, скорее всего, в зоне отдыха!
    
    RESPONSES::akizet
        в зону отдыха!<+>END
`),
                "discovery": generateDialogueObject(` 
start
    sourceless
        the team is assembled around their seats, so i sit
    
    akizet
        everyone!
        let us begin
    
    sourceless
        i dip my head towards tozik, as he has already connected
        with an impulse, he instructs the grand cyst to lower wired cysts before each of us
        what a rare opportunity! i am certain that even gakvu is excited
        i raise the cyst to my right receptor, and its shell softens, becoming as viscous liquid
        it settles over my receptor, and the timestopper connects to me
        my mind is drawn into it, with the others - everyone is connected
            EXEC::content.classList.add('innerfocus')
    
    akizet
        commencing now!
            EXEC::env.embassy.setFocus('akizet')
    
    sourceless
        with a simple instruction, the grand cyst's additional neural processing activates
        its strength and processing speed is such that time... stops
        such a peculiar sensation - to observe in full cognitive capacity a world and body that cannot move
        though the cores of our minds are shelled from one another
        we each carry a new mind that feels as if it was always there - the grand cyst
            EXEC::content.classList.add('showfocus')
        and it thinks with us as one
            EXEC::content.classList.add('cull-stage')
    
    timestopper
        is this not peculiar?
            EXEC::env.embassy.setFocus(false)
        ahaha! how fun! 
        oh but i cannot tell which thought is mine
        how do we stay distinct again?
        silly! the last one was not so long ago
        but i will remind you
        you do it like this
    
    sourceless
        we each understand simply: think outwardly

    akizet
        you see?
            EXEC::env.embassy.setFocus('akizet')
        a reminder of our best practice here...
        it will be simpler to convey things of importance indistinctly
        but for discussion, you should stay distinct
        understood?

    timestopper
        yes! yes! yes stop
        yes oh i think i am yes
        echoing it sorry yes
    
    cavik
        that was me sorry
            EXEC::env.embassy.setFocus('cavik')
        this is only my second time using one of these
    
    timestopper
        it is ok!
    
    kazki
        you are too tense!
            EXEC::env.embassy.setFocus('kazki')
        just let it pass through you!
        that is how i stop echoing
    
    timestopper
        are we good? yes! ok
            EXEC::env.embassy.setFocus(false)
        now onto the matters of the call
    
    sourceless
        a great deal of information is transmitted between us
        long-overdue discussions and planning for expeditions
        in an instant, fast even within the altered time of the grand cyst,
        wordless knowledge is understood, assigned words only in afterthought
    
    timestopper
        Êü€ßÑúŽÞRùãÝ™÷ûÜ›ö±Ü¨õ*ÜRômÜÜóŒÜéóSÝÚ
        óêñXò…ñôð¨ñAðÝòÌï_ô°ï€õîï
        ÿßÅûýÞhúGÞáøþÜzöøÛÆó]ÛäðƒÛ©í¾Ú˜é×Ú9
        ôŸÞó]á‘óUåAô)êô
    
    sys
        ATTENTION::'large amount of unprocessable data';'advancing stream to next coherent data'
            EXEC::flash(true)
    
    sourceless
        ...
            EXEC::env.embassy.setFocus('kazki')
        ...
            EXEC::flash(false)
    
    timestopper
        POLYGONATION SPIRE IN GUAM IS LIKELY EASIEST
        KAZKI AGREES?
    
    kazki
        yes! i will organize a meeting
        they liked the last time we visited because it drew lots of attention!
        so a spire would be lucrative for us both! 

    bozko
        ему не обязательно быть огромнейших прочности или качества
            EXEC::env.embassy.setFocus('bozko')
        у меня нет достоверных данных, подтверждающих моё решение
        но... контакты казки не раз предлагали жёлоб
        и если то что они говорят - правда, 
        это одно из наименее изученных мест на их планете
        так что есть определённые шансы что источник может находиться там, никем не найденный

    timestopper
        makes sense! no argument!
        no other leads yet anyway ahaha
        anything else before we disengage?
        no
        wait yes we have the spike
        see!
    
    sourceless
        in our collective minds eye, a visualization of the signal is shown
            EXEC::env.embassy.setFocus(false);content.classList.add('signal')
        a strange spike... but not unexpected given the dull contrivance's proximity
    
    timestopper
        that is peculiar
        this frequency looks unnatural
        it is too far from the call's baseline activity
        could it be an error?
        no - this is aggregate data from many listeners all across this planet
        did not help polygonation regrettably
        so what do we do about it?
        do we just mark it down?
    
    tozik
        wait

    sourceless
        identical memorized data from an archival cyst manifests
            EXEC::env.bgm.rate(0.9);content.classList.add('signal2')
        did he bring up the same record by accident?
            EXEC::env.bgm.rate(0.8)
        no... this is different
            EXEC::env.bgm.rate(0.7)
    
    tozik
        i have been searching through approximately twelve θeyes of data
        this has happened once before. see?
        the same type of spike, with the same duration
    
    timestopper
        how many θeyes ago was that? seven? eight?
    
    gakvu
        look
            EXEC::content.classList.add('signal3')
        that is exactly equidistant from the start of the call
    
    tozik
        exactly
        the exact same spike, at exactly fifty percent of the call
    
    timestopper
        how is that possible? could it be a coincidence?
        absolutely not
    
    tozik
        i have seen this before
            EXEC::env.embassy.setFocus('tozik')
        in my early studies, maybe even larval
        these are markers of raw thought - unoptimized, primal
        what corru knows and broadcasts instinctively, 
        and what early corrucystic pioneers used for communication
    
    sourceless
        a strange dread spreads through our shared mind
        why do i feel it too? is it mine? am i scared?
        this does not mean anything
        
    tozik
        in raw thought transmission, the signal spikes at regular intervals
        five equidistant times, once at the beginning
        and there are no recordings of the exact beginning...
        so that means it could be halfway done, if this is true
        
    timestopper
        ...
        but it has been broadcast for how long?
        how could a thought be that large?
        could we even
        ...
            EXEC::content.classList.remove('signal', 'signal2')

    sourceless
        the dread's claw bites into me, paralyzing my thoughts
        is it mine?? no one is commenting upon it - perhaps confused, themselves...
        so then who is scared? it is overwhelming
        i feel like tearing the cyst from my receptor, but i cannot move
        not without first turning off the time constriction
    
    timestopper
        it could be something else
        there are only two data points here
        a compelling theory but that means we must wait a long time
        are we all in agreement that we should probably tell no one about this
        what!
    
    cavik
        wait, why! this is huge!
            EXEC::env.embassy.setFocus('cavik')
        even just the possibility changes everything...
        you know what this means, right?
    
    akizet
        cavik... this is not a theory of fancy
            EXEC::env.embassy.setFocus('akizet')
        it is true that this does change everything...
        but we are still missing data. right?
    
    timestopper
        right yes we need more
        we cannot simply share it
        not while the evidence is incomplete

    akizet
        is anyone in disagreement?
    
    sourceless
        i sense a mixture of frustration and relief
        indeed, this is compelling, but it is simply a theory
        judging by the team's reactions, even sharing it as a possibility would be quite an upset
        without the theoretical first spike being recorded, it is hard to justify
        either way it is not worth interrogating at this time - we need only wait
        i take everyone's silence as confirmation
        
    akizet
        excellent
        adjourning

    timestopper
        bye everyone!
            EXEC::content.classList.remove('cull-stage', 'showfocus')

    sourceless
        the time constriction disengages. i remove the cyst from my receptor
            EXEC::env.bgm.rate(1)
        in real time, we had been sitting only for the length of a larval breath
        but immediately, everyone stands, relieved at their freedom
            EXEC::content.classList.remove('innerfocus')
        i dip my head and receptors towards the team, and return to my quarters
    
    RESPONSES::sys
        end recollection<+>END
            EXEC::change("embassy_d1_complete", true);corruRefresh()

SKIPNOTICE::this will end the memory stream
SKIP::content.classList.remove('cull-stage', 'showfocus');content.classList.remove('innerfocus');change("embassy_d1_complete", true);corruRefresh()
`),
                // suspicion
                "d2_akizet": generateDialogueObject(` 
start
    sourceless
        i must check that cyst, otherwise it will consume my thoughts
            SHOWIF::["PAGE!!cystmelted", false]
____SHOWIF::["PAGE!!cystmelted", true]
        there are still some team-members i should speak with... it has to be someone i know!!
        let me think, who is left?
        казки...
            SHOWIF::["PAGE!!d2kazkicyst", false]
        бозко...
            SHOWIF::["PAGE!!d2bozkocavikcyst", false]
        кавик...
            SHOWIF::["PAGE!!d2bozkocavikcyst", false]
        тозик...
            SHOWIF::["PAGE!!d2tozikcyst", false]
        гакву...
            SHOWIF:: ["PAGE!!d2gakvucyst", false]
        yes, that is it
____END

    RESPONSES::akizet
        мои подозрения<+>who
            SHOWIF::["PAGE!!cystmelted", true]
        меня ждёт работа<+>END

who
    sourceless
        it is only those who attended the focus who would know
        and they are all present in the embassy at this point in the θgaze
        i should speak to kazki, even if she always seems innocent
        bozko is strong willed and i can imagine he would take such strange actions
        then there is cavik, who... maybe not him actually
        or, well, it is in his nature to share things like this,
        perhaps he received a similar message as well?
        tozik... maybe, he can be quite strange
        though the listener said they 'cared for me', so, probably not him
        gakvu... is probably the most likely suspect
        but i should speak to everyone

    RESPONSES::akizet
        меня ждёт работа<+>END
`),
                "d2_start": generateDialogueObject(` 
start
    sourceless
        I AWAKEN FROM THE STILLNESS OF MY REJUVENATION
        сквозь далекое открытие серое я чувствую, что начался новый θвзор
            EXEC::env.embassy.slowCam()

        AND AS I CLAMBER OUT FROM MY CHAMBER, I SEE SOMETHING NEW...
            EXEC::specialCam('cystfocus')

        AN UNFAMILIAR CYST LAID UPON MY DESK
        WAS THIS THE ONE I LENT TO CAVIK, RETURNED IN MY SLUMBER?
        MAYBE THE DESIGN ARCHIVE FROM HOME I GAVE TO KAZKI...
        OR PERHAPS GAKVU'S FALSE ENVIRONMENT GAME?
            SHOWIF::[["embassy__d1_gakvu-false"]]
        I SHOULD CHECK TO BE SURE
            EXEC::env.embassy.slowCam()

    RESPONSES::akizet
        curious<+>END
            EXEC::specialCam(false);pauseSwapCam(false)
`),
                "cyst": generateDialogueObject(` 
start
    sourceless
        PECULIAR...
            EXEC::pauseSwapCam(true)
        THIS CYST HAS NO DISTINCT SHELL
        A FLOURISHING SPIRAL MARKS IT... BUT I DO NOT KNOW WHAT THAT MEANS
        I SUPPOSE I SHOULD TRY IT ON AND SEE WHAT IT IS

    sys
        ATTENTION::"event required for continued stream";"skip ahead?"
            SHOWIF::"embassy__echo3"
    
    RESPONSES::akizet
        connect<+>connection
        leave it<+>END
            EXEC::pauseSwapCam(false);

    RESPONSES::sys
        skip<+>END
            SHOWIF::"embassy__echo3"
            EXEC::change("PAGE!!akiroomunlocked", true);change("PAGE!!cystmelted", true);content.classList.add('cystmelted');step();pauseSwapCam(false);
            FAKEEND::(skip sequence)

connection
    sourceless
        I RAISE THE CYST TO A RECEPTOR AND SETTLE IT
        AFTER A SMALL DELAY, IT ACTIVATES, AND A CONSCIOUSNESS MAKES ITSELF KNOWN
        AN ECHO WITH A MESSAGE LEFT FOR ME... 
            EXEC::vnp({echo: "show"})
        WE EXCHANGE WORDLESS MEANING, FORMING INTO THOUGHTS
    
    echo
        HELLO AKIZETESCHE!
    
    sourceless
        HELLO FRIEND! WHO IS THIS?
    
    echo
        I DO NOT KNOW. ALL MEMORY SAVE FOR MY MESSAGE HAS BEEN STRIPPED
        I FEEL THAT MY SPEAKER WANTED THIS MESSAGE TO BE DISCREET
            EXEC::content.classList.add('fade-stage')
        
    sourceless
        CURIOUS! BUT PLEASE GO ON
        
    echo
        EXCELLENT
        I WILL CONVEY THE MESSAGE TO THE BEST OF MY ABILITY
        HENCEFORTH: 'I' WILL REFERENCE MY SPEAKER

    sourceless
        the echo's message forms into imagery - a false environment that i allow my mind to enter
            EXEC::changeStage("echovision");vn.done()
        it is simple... simple enough that it should only occupy a fraction of a θblink
        the echo awaits my engagement to continue

    RESPONSES::akizet
        go ahead<+>END
            FAKEEND::continue
            EXEC::pauseSwapCam(false);body.classList.add("pathstep0");env.embassy.echoChatter(1)
`),
                "echo1": generateDialogueObject(` 
start
    echo
        the call, akizet
            EXEC::content.setAttribute("ech", "call");forceSwapCam(true);specialCam("ecall");change("PAGE!!e1", true)
        the initiative to study it, both here and home, holds certain conflicting groups
            EXEC::content.setAttribute("ech", "calleye");specialCam("eclaw")
        they have always known <em>what</em> its origin truly is,
        and they will resort to violence to keep this secret
            EXEC::content.setAttribute("ech", "calleyeclaw")
        while what we have discovered is indirect,
        a smaller organ in the whole of the truth,
        it is dangerous to hold as we do
        to share even a hint of it could meet us all with our final deaths
            EXEC::content.setAttribute("ech", "calleyeclawcrush")
        
    sourceless
        this notion alone is enough to spark anger
        the type of baseless theory a paranoid kiv might concoct

    akizet
        the council would never have approved our research if this were the case
            EXEC::specialCam("eaki")
        are you simply sowing suspicion? is this a threat?
        or is this a poorly timed prank? 
        velzie would be unimpressed

    echo
        please understand, there is much we still do not know
            EXEC::specialCam("echoclose")
        our research is entirely necessary
        especially with the unaffiliated, the unbiased, like you
        and i care about you, akizet
        you should not have to be a part of this
        but this sliver of truth we carry places us all in a terrible game
        one that velzie's cruel humor could not dream

    akizet
        so it was you who broadcast that dread in our focus

    echo
        a fraction of it, yes,
        but i am not the only one involved with this game
        i suspect others operate within our team
        and though they are friends all,
        this conflict seeks to place us as foes
        the claws of it reach far beyond us, too
            EXEC::content.setAttribute("ech", "crowd");specialCam("ecrowd")
        it is a cold wind that suffuses the entire embassy
        but this discovery of the raw thought pattern...
        it will become like a spirestorm
        none of us - not even would-be foes - want this to escalate
        so hear my plea:
            EXEC::content.removeAttribute("ech")
        you must take every measure to hide this
        we cannot risk any sliver of our knowledge escaping
        do you understand?

    sourceless
        despite my skepticism,
            EXEC::specialCam("eaki")
        i feel that this is heartfelt, truthful
        a difficult feeling to fake with an echo
        indeed, the tone is one of defensive panic
        so i must respond,
        
    RESPONSES::akizet
        yes, i understand<+>END
            FAKEEND::continue
            EXEC::forceSwapCam(false);specialCam("")

END::env.embassy.echoChatter(2)
`),
                "echo2": generateDialogueObject(` 
start
    sourceless
        despite my agreement, i cannot dispel this uneasy coil in my receptors
            EXEC::pauseSwapCam(true)
        to have this dangled before me as a vague threat...
        but how else am i to respond, whether this is true or not?
        it is not as if i intended to share it in the first place...
        do they simply fear what might happen if i examine our theory more closely?
        in case there is a connection back to the source, i must continue my agreement

    akizet
        what happens next?

    echo
        for you, nothing
        i am taking every measure to protect our team
        even the misled traitors
        i have already hidden the archived discussion from our focus
        we will not speak, we will not share, you will not know who i am
        eventually, we will be forced to share our findings and reveal the truth
        but there is time to prepare the stage
        if this is not handled delicately,
        all of us - bright cousins included - will suffer terrible consequences
        they are innocent bystanders, they do not deserve what may come
        but if you allow me, 
        if you can trust this echo as i have pleaded to velzie you might,
        everything will be fine
        that is truly all i can tell you
        goodbye akizet
            EXEC::content.setAttribute("ech", "bye")

    akizet
        wait
        is there any proof you can share?
        anything at all?
        i want to trust you
        but i must know it to be true
        and what if we find something else?
        how much of our work is truly at risk??
    
    RESPONSES::akizet
        ...<+>END
            FAKEEND::continue
            EXEC::pauseSwapCam(false)

END::env.embassy.echoChatter(3)
`),
                "echo3": generateDialogueObject(` 
start
    sourceless quiet
        i tear the cyst from my receptor before it can fully melt, throwing it to the table
            EXEC::pauseSwapCam(true);change("PAGE!!cystmelted", true);content.classList.add('cystmelted')

    sourceless
        the echo cyst self-destructed...
        what do i do? what can i do?
        i need guidance
        funfriend!! activate

    funfriend
        HELLO AKIZET!!
        HOW ARE Y
    
    sourceless
        should i even try asking who left it?
        but what if i ask the wrong person?
        these... groups. will one side think the other has tried to sway me?
        and what could they even be quarreling over?
        i have never heard once of any conflict
    
    funfriend
        SLOW DOWN I DO NOT EVEN KNOW WHAT YOU ARE TALKING ABOUT!
        LET ME SEE YOUR RECENT MEMORY PLEASE!
    
    sourceless
        i grant funfriend access to my short-term memory with an impulse
        but that does not matter, for i have already come to a conclusion
        yes--i know!
        i can ask the team, one by one--hide the details!
        i will say it is some mundane thing, some borrowed cyst being returned,
        but the speaker who placed it...
    
    funfriend
        AKIZET IT DOES NOT SEEM LIKE THEY WANT YOU INVOLVED
        WOULD IT NOT BE BETTER TO SIMPLY STAY QUIET LIKE THEY WANT?
        LIKE YOU ALREADY AGREED ANYWAY!
        IF THEY HAVE TAKEN THIS MEASURE, ASSUMING IT IS TRUTHFUL
        WHY WOULD THEY EVEN GIVE A SLIGHT HINT TO YOU IN-PERSON?

    sourceless
        they may hint unwillingly
        funfriend, i cannot simply let such claims go uninvestigated
        the speaker must know this as well
        doubly so if they are within our team
        but they are also watching my actions, so...
        i should still be careful with my words
        
    funfriend
        THIS IS A BAD IDEA

    sourceless
        thank you for your input funfriend
            EXEC::change("PAGE!!akiroomunlocked", true);step()

    RESPONSES::akizet
        i must investigate<+>END
            EXEC::pauseSwapCam(false)
`),
                "d2_attendantresp": generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        corrucyst in my room?<+>cyst
            SHOWIF::[['embassy__d2_attendant-personnel']]
        that is all<+>leave
            FAKEEND::(leave)
`),
                "d2_attendant": generateDialogueObject(` 
start
    sourceless
        I APPROACH THE ATTENDANT DRONE
            EXEC::pauseSwapCam(true)
        IT IS FACELESS AT THE MOMENT
        SO IT REGARDS ME WITH A SIMPLE STARE

    RESPONSES::akizet
        did you see something?<+>personnel
            SHOWIF::[['stageroom', 'embassy_personnel']]
        speak with groundsmind<+>groundsmind
            SHOWIF::[['embassy__d2_attendant-personnel']]
        goodbye<+>END
            EXEC::pauseSwapCam(false)
    
personnel
    sourceless
        THOUGH THE DRONE IS FACELESS...
        THE SIMPLE ECHO THAT OBSERVES MAY STILL HAVE SEEN SOMETHING
    
    akizet
        hello! no connection required
        did you...
        see anything, go into my room?
    
    attendant
        A SPINDLE-LEGGED CORRUCYST ENTERED SOME θwinks AGO
        IT WAS ASSUMED TO BE A SELF-DELIVERING DEVICE
    
    sourceless
        INTERESTING... I SUPPOSE THAT MAKES SENSE
        THE SPEAKER MUST HAVE KNOWN THE ATTENDANT WOULD BE HERE
    
    attendant
        DO YOU REQUIRE ANYTHING ELSE

    RESPONSES::akizet
        did you see something?<+>personnel
            SHOWIF::[['stageroom', 'embassy_personnel']]
        speak with groundsmind<+>groundsmind
            SHOWIF::[['embassy__d2_attendant-personnel']]
        no thank you<+>END
            EXEC::pauseSwapCam(false)

groundsmind
    akizet
        the groundsmind, please

    sourceless
        THE DRONE STRAIGHTENS, AND A CONNECTIVE RIPPLE PASSES THROUGH ITS SKIN
        OUR GROUNDSMIND'S SYMBOL IS FORMED OVER ITS FACEPLATE
            EXEC::content.classList.add('groundsminded')
    
    groundsmind
        akizetesche. speak

    RESPONSES::akizet
        the cyst<+>cyst
        nevermind gotta go<+>leave
            FAKEEND::(leave)
    
cyst
    akizet
        i had a self-delivered cyst on my desk, arriving during my slumber
        do you have any records of it?

    groundsmind
        that will depend on its features
        if you have it, present it
        otherwise: describe it

    sourceless
        åADÉ:!±(:
        IT SELF DESTRUCTED...
        SHOULD I MENTION THE SPIRAL?
        NO--WHAT IF IT IS AN IDENTIFIER SOMEHOW?
        IT COULD MEAN SOMETHING DANGEROUS

    akizet
        umm,
        i do not really remember how it looked
        can you cross-check it with other attendants?
        did it form any relocation hallways?
    
    sourceless
        THE GROUNDSMIND IS SILENT FOR A MOMENT
        SHE MUST SEE ME LIKE A LARVAL FOOL
    
    groundsmind
        akizetesche,
        i cannot help you without a point of reference
        an innumerable amount of cysts are self-delivered every θgaze
        and each are mundane in nature.
        what has you seeking information about this one in particular?

    sourceless
        BAD IDEA

    akizet
        it was, ah...
        actually, you know, i think i realize who sent it actually
        yes, it was a team-member, ahaha
        i will just go ask them!
        goodbye!

    sourceless
        I CASUALLY WALK AWAY IN A PANIC
        WHAT IF THE GROUNDSMIND IS A PART OF THIS?

    RESPONSES::akizet
        how embarrassing<+>END
            EXEC::pauseSwapCam(false)

leave
    akizet
        nothing! nevermind
        apologies for drawing your attention
    
    groundsmind
        excellent
        fare well
    
    sourceless
        THE DRONE DISCONNECTS FROM THE GROUNDSMIND AND STANDS STILL ONCE MORE
            EXEC::content.classList.remove('groundsminded')
    
    RESPONSES::akizet
        leave<+>END
            EXEC::pauseSwapCam(false)

END::content.classList.remove('groundsminded')
`),
                "d2_bozkocavik": generateDialogueObject(` 
start
    sourceless
        CAVIK AND BOZKO SPEAK JOVIALLY BETWEEN A SET OF QUARTERS
            EXEC::pauseSwapCam(true)
        CURIOUS... THEIRS ARE NOT WITHIN THIS θbranch
        I APPROACH, MASKING MY SUSPICION WELL
    
    akizet
        bozko! cavik! hello! great gaze!
            EXEC::vnp({hideStage: true, cavik: "show", bozko: "show"})

    bozko
        акизет
    
    cavik
        hey akizet!! 

    akizet
        what brings you to this θbranch of the θsegment?

    cavik
        ah, we are just waiting for mokka!
        there is that brief marianas expedition we must attend today
    
    sourceless
        MOKKA... WHO IS THAT? 
        
    funfriend
        OFFLOADED MEMORY: MOKKANESCHE, AN EXCHANGE FROM MATERIALS!
        
    sourceless
        AH! YES. I FORGOT SHE WAS IN THIS θbranch, TOO
        I HAVE NOT SEEN HER IN A WHILE... 
        OUR AREAS OF OPERATION RARELY INTERSECT
    
    akizet
        from materials? what for?
    
    bozko
        подумал, это было бы весело
        и ещё... если на том участке найдутся какие-либо необходимые залежи,
        постройка полигонизационного шпиля могла бы ускориться
    
    akizet
        ah, of course

    RESPONSES::akizet
        did either of you return a cyst?<+>cyst
        enjoy your trip<+>END
            EXEC::pauseSwapCam(false);vn.done()

cyst
    akizet
        my friends,
        did either of you return a cyst to my quarters recently?
        i awoke from my rejuvenation, and there was one waiting for me!
    
    cavik
        huh! no, not me!
        what was on it?
    
    sourceless
        FUNFRIEND: ASSUME NON-VERBAL MOTOR CONTROL
        DIRECTIVE: ACT NORMAL
    
    funfriend
        OK! AHAHA
        UTILIZING ARCHIVED MOVEMENTS!
        YOU LOOK SO CASUAL RIGHT NOW!

    akizet
        oh, it was just, a,
        archival cyst
        on secri... hunting habits
    
    sourceless
        IS IT JUST ME OR DOES BOZKO SEEM SKEPTICAL
        DID I MAKE A MISTAKE
    
    funfriend
        RELAX
        YOU DID MESS UP
        BUT THEY PROBABLY THINK YOU ARE LYING FOR ANOTHER REASON
    
    cavik
        oh!
        cool

    sourceless
        ...

    akizet
        bozko?
    
    sourceless
        HE TWISTS HIS RECEPTORS NEGATIVELY
    
    bozko
        чем меньше я знаю о секри, тем лучше
        зачем кому-либо оставлять тебе это?
    
    akizet
        oh, it was mine to begin with,
        i had lent it out to someone at some point
        i, ah, had it, because of a morbid fascination
        you know how it is--surface running
    
    bozko
        ага, я понимаю

    funfriend
        RECOMMENDATION: BACK OUT
    
    akizet
        well, thank you anyway
        i need to get going
        enjoy your expedition
    
    cavik
        bye akizet!
            EXEC::env.embassy.d2progress('bozkocavik')
    
    RESPONSES::akizet
        bye<+>END
            EXEC::pauseSwapCam(false);vn.done()
`),
                "d2_gakvuresp": generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        cyst in my room<+>cyst
            EXEC::env.embassy.d2progress('gakvu')
        how is it going<+>how
        goodbye for now<+>bye
            FAKEEND::(leave)
`),
                "d2_gakvu": generateDialogueObject(` 
start
    sourceless
        GAKVU SLOUCHES BEFORE A COMMUNAL CYST, CONNECTED BY A RECEPTOR
            EXEC::pauseSwapCam(true)
        AS I APPROACH, THE CHAIR ACROSS FROM HER SCUTTLES OUTWARDS FOR ME TO SIT
        THE CLICK OF ITS LITTLE LEGS AGAINST THE GLASSY FLOOR DRAWS GAKVU'S ATTENTION OUT OF HER CONNECTION
    
    gakvu
        oh, akizet! come, sit!

    akizet
        i am not interrupting anything, am i?
            EXEC::specialCam("gakvusit")
    
    gakvu
        not right now, just browsing environments
        i tire of mine
        the surface is exhilarating and terrifying, yes, but...
        you can only die so many times before it is boring!
    
    RESPOBJ::d2_gakvuresp

how
    akizet
        gakvu,
        how beholds you?
    
    sourceless
        A HARMLESS, COMMON QUESTION
        BUT I HAVE POSED IT SUCH THAT SHE KNOWS WHAT I MEAN
        SHE KIND OF LAUGHS, A CYNICAL DISAPPOINTMENT IN HER TONE
    
    gakvu
        well, my work is for nothing
        it does not bother me as much as it should,
        maybe because we never really knew what we were dealing with...

    akizet
        even if the theory is true, it was through your and tozik's work that this discovery occurred!
        besides, we still do not have all of the data
    
    gakvu
        yeah...

    akizet
        you could always join bozko's field expeditions
        perhaps we shift you and tozik to work more frequently with the bright cousins?

    sourceless
        HER EYES GROW DISTANT, HER ATTENTION DRAWN THROUGH THE CYST'S CONNECTION
        EVEN SO, SHE SPEAKS - SHE IS GOOD AT JUGGLING REALITY AND COLLECTIVE
    
    gakvu
        akizet,
        do you think anything else is possible?
        
    akizet
        ah, of course! there is the construction of, ah,

    gakvu
        no no, not work... i mean, the call.

    sourceless
        SHE CHOOSES HER WORDS CAREFULLY HERE IN PUBLIC
        BUT I KNOW WHAT SHE MEANS

    akizet
        truthfully... i am not sure
        it is in velzie's nature to place the truth before us, just out of reach
        and just as fitting for it to be an illusion
        i am not comfortable accepting it until we can prove it without doubt
    
    sourceless
        GAKVU IS QUIET FOR A LONG MOMENT, HER FACE STILL DISTANT
        I WORRY FOR AN INSTANT THAT SHE BALANCED TOO FAR INTO THE COLLECTIVE AND DID NOT HEAR ME
        BUT SHE EVENTUALLY RESPONDS, TEASING ME
    
    gakvu
        do you think every wall is a lie before you touch it?
        sometimes things are as simple as they seem
        velzie is not out to get you
        anyway, i do not really care
        i am fine with me and tozik continuing pattern identification
        that just means i have more time for my false environments
    
    RESPOBJ::d2_gakvuresp
    
cyst
    akizet
        gakvu, did you happen to have a cyst self-deliver to my room recently?
    
    gakvu
        huh?
    
    sourceless
        GAKVU'S ATTENTION IS DRAWN FULLY OUTWARDS, TOWARDS ME, WITH A WORRIED STARE
        AN UNCOMMON SIGHT, ONE THAT CATCHES ME OFF-GUARD
        SHE SEES MY SURPRISE CLEARLY FOR AN INSTANT
        FUNFRIEND - ASSUME MOTOR CONTROL. LOOK NORMAL
    
    funfriend
        OK!
        SHE WILL NOT SUSPECT A THING!

    gakvu
        no. what was it?
        when did it arrive?

    akizet
        ah, it was an... archival cyst, it appeared sometime during my rejuvenation
        it was on secri hunting habits
        i had given it to someone a while back... but i could not remember who
        and there it was! sitting on my table
        i thought, perhaps it was you--given your preoccupation with the surface
    
    sourceless
        DOES IT LOOK LIKE SHE SUSPECTS SOMETHING?
    
    funfriend
        NO - SHE ALWAYS LOOKS LIKE THAT

    gakvu
        oh, no no.
        huh... self-delivered
        someone on the team would have just given it to you in-person
        that is very, very strange
    
    sourceless
        THAT IS MOST CERTAINLY CONCERN IN HER VOICE
    
    akizet
        haha yes maybe it is a little strange hehe
        but it was just my secri cyst
    
    gakvu
        if i remember correctly, you are deathly afraid of them, right?
        why would you have that?
        recreational terror?
    
    funfriend
        OK SHE ACTUALLY PROBABLY THINKS YOU ARE LYING NOW
    
    sourceless
        BEHOLD, MY REDIRECTION:
    
    akizet
        shut up!!
        it is no different from your false environments!

    sourceless
        SHE LAUGHS QUIETLY, HAVING NO DEFENSE
        AND NOTHING MORE TO ADD ON THE MATTER, IT SEEMS

    RESPOBJ::d2_gakvuresp

bye
    akizet
        i should be going
        goodbye for now, my friend
    
    sourceless
        GAKVU WAVES HER FREE RECEPTOR ABSENTLY
    
    RESPONSES::akizet
        leave<+>END
            EXEC::pauseSwapCam(false)

END::specialCam(false)
`),
                "d2_tozikresp": generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        the cyst<+>cyst
            EXEC::env.embassy.d2progress('tozik')
        your thoughts<+>thoughts
        fare well for now<+>bye
            EXEC::vn.done()
            FAKEEND::(leave)
`),
                "d2_tozik": generateDialogueObject(` 
start
    sourceless
        TOZIK STANDS NEAR THE ORANGE BAR, GRASPING A TASTE SIMULACRUM
            EXEC::pauseSwapCam(true)
        AN ODD HABIT... I COULD NEVER QUITE CONNECT WITH IT
        HIS ATTENTION IS INWARD, YET I SEE NO EXTERNAL CYST CONNECTED
        LOST IN THOUGHT, PERHAPS

    akizet
        hello tozik

    sourceless
        HE LOOKS AT ME AND TWISTS A STOUT RECEPTOR IN A SHORT GREETING
            EXEC::vnp({hideStage: true, tozik: "show"})
    
    tozik
        do you need something?
    
    RESPOBJ::d2_tozikresp

thoughts
    akizet
        you seem troubled
        as do we all, i suppose...
        but is something specific on your mind?
    
    sourceless
        A SOMEWHAT POINTED QUESTION...
        BUT IF HE HAD INVOLVEMENT WITH THE CYST, SURELY HE WOULD FLINCH
        ...
        AND... HE MERELY SIPS FROM THE BRIGHT SIMULACRUM
        IN THE SUBTLE MOVEMENTS OF HIS RECEPTORS, I SEE DISINTEREST
        BUT HE CONTINUES ANYWAY, TROUBLED ENOUGH TO SUSTAIN A RARE CONVERSATION
    
    tozik
        i had been curious... about whether the spike was observed from obeski
        surely others would have come to the same conclusion as us, there is a following of the call back home
        so i peered into a number of discussions through the collective...
        and discussion is rare. they seem to dismiss it as an error, or something to do with the contrivance

    sourceless
        HE PAUSES, INCONSPICUOUSLY LOOKING AROUND
        THE SAME EXPRESSION AS A SURFACE RUNNER AT REST
        DID HE RECEIVE A MESSAGE TOO?
        WHEN HE CONTINUES, HE LOWERS HIS VOICE
    
    tozik
        but the collective has all of our information available, including older records of the call
        the same ones we used to come to our... theory. in theory.
        so i checked, and... there is no record of the first spike
        no... that is incorrect
        the record exists, but, it is... wrong
        it is wrong
        there is no spike in the public version
        why is there one in ours?
    
    sourceless
        HE PAUSES AGAIN, LOOKING DOWN AT HIS TASTE SIMULACRUM
        I FIND MYSELF UNABLE TO ANSWER - THIS IS A BIZARRE DEVELOPMENT
        OUR ARCHIVES ARE PRIMARY SOURCES FROM THE VAZNIAN LISTENERS, THE OLDEST OF ALL
        AND PERHAPS THE MOST RELIABLE
        WHAT ARE THE ODDS OF A RECORDING ERROR HAPPENING AT THAT EXACT TIME?
        I NOTICE HIS gaze HAS DRAWN BACK UP TO ME, AND HE IS ENTERTAINED BY MY CONFUSION
    
    tozik
        you see now

    akizet
        i do... that is...
    
    tozik
        error or no, there is nothing to do but wait

    sourceless
        HE PUNCTUATES HIMSELF BY SIPPING AGAIN FROM HIS SIMULACRUM
        A LOOK AWAY AND WAGGLE OF A RECEPTOR TELLS ME ALL - LET US SPEAK NO MORE OF THIS

    RESPOBJ::d2_tozikresp
    
cyst
    akizet
        tozik, did you direct a cyst to my room recently?
        i found one on my desk after i awoke from rejuvenation
    
    tozik
        no
    
    sourceless
        HIS ANSWER IS STONY, FOCUS REMAINING INWARD, NOT EVEN LOOKING AT ME
        I RESPECT THAT HE DOES NOT PRY INTO THE MATTER
        SHOULD I PUSH HIM ON IT?
        
    funfriend
        THAT COULD BE FATAL AKIZET
        IF YOU MUST, AT LEAST BE GENTLE ABOUT IT

    akizet
        are you sure?
    
    sourceless
        MY REPEATED QUESTION EARNS HIS OUTWARD ATTENTION
        HE REGARDS ME WITH SILENCE, BUT SUCH PALPABLE DISINTEREST
        AFTER AN INSTANT OF GAZING, PERHAPS TO INTUIT WHAT I REALLY MEAN, HE RESPONDS
    
    tozik
        yes

    akizet
        all right
    
    sourceless
        WHEN I RELENT, HE RETURNS TO HIS THOUGHTS
        I DOUBT IT IS HIM... OR IF IT IS, HE TRULY WANTS TO GIVE NO HINTS

    RESPOBJ::d2_tozikresp

bye
    akizet
        bye tozik!

    sourceless
        HE NODS A RECEPTOR AT ME
    
    RESPONSES::akizet
        leave<+>END
            EXEC::pauseSwapCam(false)
`),
                "d2_kazkiresp": generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        the cyst<+>cyst
            EXEC::env.embassy.d2progress('kazki')
        your creature<+>creature
        fare well for now<+>bye
            EXEC::vn.done()
            FAKEEND::(leave)
`),
                "d2_kazki": generateDialogueObject(` 
start
    sourceless
        SURPRISINGLY, KAZKI STANDS WITHIN THE VERY SAME RELOCATOR AS ME
            EXEC::pauseSwapCam(true)
        THE CHANCES OF THIS ARE SLIM, BUT SHE APPEARS TO BE LOITERING, WAITING FOR SOMETHING
        IS SHE WAITING FOR ME?
        HELD WITHIN ONE OF HER BRANCHED RECEPTORS IS A COMMUNICATIONS CYST
        WITH THE OTHER, SHE GIVES ME A KIND GREETING
            EXEC::vnp({hideStage: true, kazki: "show"})
    
    kazki
        hii akizet!
    
    akizet
        kazki!
        this is a surprise--i do not often see you linger in this θsegment
        what brings you here?
    
    kazki
        ohh, i am waiting for the crew!
        they are having their little expedition, 
        and i am headed to the shores to discuss the next polygonation spire... again
        but!! we are all setting out together
    
    akizet
        ah, of course

    RESPOBJ::d2_kazkiresp

creature
    akizet
        how is the little creature faring?

    kazki
        it is alive!!
        it does not move very much... but it reacts very quickly to my prodding!
        i have been speaking with a contact of mine, a bright cousin

    sourceless
        SHE WAGS THE COMMUNICATOR-BEARING RECEPTOR SLIGHTLY

    kazki
        and she says it is a 'arthropod'!
        so--i thought, i will call it 'arthur'!
        after the bureau construction contact!

    sourceless
        AH--ARTHUR
        A JITTERY ONE...
        IF ONLY I COULD BE THERE WHEN SHE OPENS HER HEAD TO SHOW THE CREATURE WITHIN TO HIM
        WAIT--WHAT WAS THAT SHE SAID?
    
    akizet
        you are on casual speaking terms with a bright cousin?
    
    sourceless
        WITH HER LARGE RECEPTORS, HER BASHFUL EXPRESSION IS DIFFICULT TO HIDE
        SHE MUST THINK I WILL TAKE ISSUE--WHY DOES SHE ALWAYS ASSUME THIS?

    akizet
        kazki, you know it is not an issue if you are
        the silent veil has long been drawn
        but--how are you communicating? 
    
    kazki
        oh!!
        you have not heard?
        it is a new development by the θjut
        very recent! these new communicators...
        they allow a sort of connection to the human collective!
        the 'internet' they call it!
        it is very flat... and there are many problems with the connection
        but it is not so different from ours aside from that!

    sourceless
        HOW COULD THAT POSSIBLY WORK?
        THEIRS IS NOT DICTATED BY THOUGHT...
        AH, IT DOES NOT MATTER - SHE WOULD NOT KNOW ANYWAY

    akizet
        and you are using it to speak with a bright cousin?
    
    kazki
        yes!!
        is that not remarkable?? it is COOL!!!

    akizet
        fascinating...
        i must see about getting one of those

    RESPOBJ::d2_kazkiresp

cyst
    sourceless
        THIS SHOULD BE EASY
        KAZKI SIMPLY CANNOT HIDE ANY EMOTION

    akizet
        kazki, did you have a cyst delivered to my room recently?
    
    kazki
        huh? no!

    sourceless
        NOTHING... IT IS NOT HER

    kazki
        i have been so busy coordinating all of this!
        but i do have a few cysts i need to return to you...
        what was it?
    
    akizet
        ah, it was nothing of note, a mundane collection of memories
        
    kazki
        i can ask around for you!
    
    sourceless
        …¤,¿…¶¡Øn

    funfriend
        RECOMMENDATION: DEFINITELY STOP THAT NOW

    sourceless
        I HAD NOT CONSIDERED THIS POSSIBILITY...
        BUT SHE ALWAYS GETS INVOLVED
        IF WORD SPREADS, THE SPEAKER WILL SUSPECT SOMETHING STRANGE IS HAPPENING

    akizet
        ah--no, no no
        no no, it is all right
    
    kazki
        are you sure??
        i have my communicator on right now, i could help!
    
    sourceless
        I WAVE MY RECEPTORS NEGATIVELY WITH PERHAPS TOO MUCH EMPHASIS, AND SHE RELENTS
        SHE SMILES LIKE A BRIGHT COUSIN WOULD, HER RECEPTORS TAKING ON A TEASING POSTURE

    kazki
        oh, i think i get it
        it was one of <em>those</em> cysts

    akizet
        no!! no no no

    kazki
        uh-huh!!

    funfriend
        ACTUALLY MAYBE LET HER THINK THAT SO SHE WILL STAY QUIET
    
    sourceless
        UUGH
        YOU ARE RIGHT... FINE
        I WILL ABIDE THIS EMBARRASSMENT
    
    akizet
        ...
        ok, it was,
        but please do not tell anyone
        
    kazki
        do not worry!!
        it is between us and the arthropod!

    RESPOBJ::d2_kazkiresp

bye
    akizet
        bye kazki!

    kazki
        bye!!
    
    RESPONSES::akizet
        leave<+>END
            EXEC::pauseSwapCam(false)
`),
                "realization": generateDialogueObject(` 
start
    sourceless
        FUNFRIEND
            EXEC::content.classList.add('showaki');

    funfriend
        hello akizet!!

    sourceless
        that is everyone...
    
    funfriend
        yes it was!

    sourceless
        and nothing. i surely spoke to the speaker at some point
        but they must be well-practiced in subterfuge
        and did you notice - no one else seemed concerned

    funfriend
        what about gakvu? she seemed surprised
        
    sourceless
        true, but it is a strange matter to begin with
        what if none of this is real to begin with, and the message was simply made to confuse me?
        no, no joke would ever be taken this far
        they would simply have cracked at my confrontration...
        and to that end - could i be the only one who received this message?
        why not cavik?! i would have seen it in his receptors if he was also contacted!
        and he is the greatest threat of all to any secrecy!!
        so what if he is a part of this conflict, too??
    
    funfriend
        akizet everything is fine
        i understand your worry but there is no urgency here

    sourceless
        ...yes, you are right
        thank you funfriend
        i must calm myself, approach this rationally
        but you understand: i cannot trust my own team
        nor any qou--here or home
        it is like i am in a city usurped by <span class="code" definition="INHERITED CONTEXT::'violent parasitic surface fauna';'hijacks mind of victim for use as social camouflage';'ekivik profanity';'not intended to be profane here'">zuzucri</span>
        anyone could be compromised, a part of this 'game'
        and even if we continue our research work,
        what if we find something else too close to the truth? 
        will we be under even greater threat?
        do i do anything? do i simply wait for the truth?
        it will be so long... so many θeyes
        funfriend you know i cannot simply stop my work
        especially if we are just beyond the threshold of understanding the call
        this is everything
    
    funfriend
        akizet, i cannot know what is right
        but you know what i will say already
        i feel that you should simply wait
        they said the team's research is still important
        and it sounds like they have this under control
        getting involved will probably not lead to anything good
        perhaps you could simply continue with your team,

    sourceless
        ah!
        i know!
        yes!
    
    funfriend
        akizet you really should probably not

    sourceless
        the bright cousins...
        the echo implied they know nothing!
        the envoy!
        yes, i must speak to him
        perhaps... if i place my words correctly,
        my research efforts could become two-fold
        one here, with my team, careful not to cross this invisible line...
        and another, more discreetly, with his bureau!
        where we may discover what these groups seek to hide
        yes, if i can simply know <em>what</em> it is, then...
    
    funfriend
        wait!!
        gordon has limited control, he is a part of a larger system!
        what of his leaders?
    
    sourceless
        he is...
        but our bright cousins are good with secrets
        they know so much that could raise concern already
        and not once has any of it ever hit their public mind
        indeed, they have very little correspondence outside of direct contacts
        and i am the only direct contact for the call research initiative
        though, there is kazki's construction contact...
        our cross-initiative ties will make for some sensitive matters to avoid

    funfriend
        they cannot detect the call with their own technology
        and they do not possess the biology to interact with ours
        how do you expect them to help you?
    
    sourceless
        perhaps we can share a few things...
        do you recall the murmurs of 'integrated bright technology'?
        since it was shelved...
        the technology division has stored much of the schematics plainly within embassy archives
        oh yes, this is coming together, is it not? how exciting

    funfriend
        akizet i do not like this idea! ahahaha
        but i will support you regardless

    sourceless
        excellent...
        to the vessel, then
        please contact him and tell him i am coming in person
        say that i have news of the call and that we must speak privately

    funfriend
        understood

    sys
        ATTENTION::'memory stream continues externally';'follow stream?'

____SHOWONCE::
    moth
        looks like this will take you to the street spatial thoughtform...
        i'm reading that it leads directly to something that's accessible there already
        weird... looks like it has more than before? specifically that chat with gordon
            SHOWIF::"citystreet__envoychat-start"
        i think funfriend fixed it? i didn't even know that part of it was busted
            SHOWIF::"citystreet__envoychat-start"
        or... maybe this thoughtform and the street are interwoven somehow.
            SHOWIF::"citystreet__envoychat-start"
        you said you hear music, right? does any of it sound familiar?
            SHOWIF::[["++mothglobal-why_music"],["citystreet__envoychat-start"]]
        because, it could be that when funfriend repaired this thoughtform, 
            SHOWIF::"citystreet__envoychat-start"
        he also repaired this memory stream into the city that had more data
            SHOWIF::"citystreet__envoychat-start"
        so if you don't follow the stream right now, you should still just be able to go there later and see it anyway
____END

    RESPONSES::sys
        follow stream<+>END
            EXEC::change("embassy_d2_complete", true);change("TEMP!!ep1_goingtogordon", true);moveTo("/local/city/street/")
        end recollection<+>END
            EXEC::change("embassy_d2_complete", true);env.bgm.pause();corruRefresh()
`),
                // collapse part 1

                "mothframe": generateDialogueObject(` 
start
    sys
        ERROR::"unable to render";"thoughtform contains violence, aggressive action";"non-compliant with mindspike license"
        ADVISE::"report memory source to local authorities"

    moth
        damn, i was kinda hoping the FBX patch would have helped with this
        not a big surprise, honestly
        i don't know if you've ever actually tried to open combative thoughtforms before,
        but after '52 they seriously locked that shit down - that's why it doesn't work
        of course, i actually accounted for this
            SHOWIF::["mth++embassy-locked", false]
        of course, it's like i said before - i had an idea
            SHOWIF::"mth++embassy-locked"
        have you ever heard of a framing device? like, in mindspike terms
        they're super illegal, for regular contractors anyway
        basically, we can fool your mindspike into thinking it's a memory of something else
        like... instead of a memory of akizet punching some guy,
        we "frame" it so that it's a memory of a game where akizet punches the same guy
        it can result in a little instability, but it lets you get in
        totally throws off the onboard AI
    
    RESPONSES::self
        so you made a game?<+>game

game
    self
        so you made a game?
    
    moth
        no, of course not
        like i said, it's a framing device - not really a game
        your brain will interpret it as a game, though
        so... actually, yeah, i guess
        anyway, to actually get it working, 
        we need funfriend to modify the thoughtform - i'll provide the patterns needed
        maybe act like it's you who's sending the data so it trusts you
    
    RESPONSES::self
        why not a movie or something<+>movie
        on it<+>END
    
    RESPONSES::sys
        return to hub<+>END
            EXEC::moveTo("/hub/")
            FAKEEND::(direct navigation)
    
movie
    self
        why not make it a memory of a movie, or something else?
    
    moth
        cause people say games work best, that's why
        apparently if it's too similar to actually experiencing the memory, the AI can tell
        besides, i've seen you when you're bored
        you can barely sit still, and then you just leave without saying anything
        if the movie sucks, you're just gonna do that
    
    self
        but what if the game also sucks
    
    moth
        then, i don't know, you're gonna have to deal with it dude
        cause it's the only way we're getting into this memory
        go back to the hub so i can send this illegal shit to funfriend and then delete it
        we've got some leeway and won't really get in trouble, but,
        i wouldn't want to get pulled over with this on any of my drives

    RESPONSES::self
        on it<+>END
    
    RESPONSES::sys
        return to hub<+>END
            EXEC::moveTo("/hub/")
            FAKEEND::(direct navigation)
`),
                "mothframe_still": generateDialogueObject(` 
start
    sys
        ERROR::"unable to render";"thoughtform contains violence, aggressive action";"non-compliant with mindspike license"
        ADVISE::"report memory source to local authorities"

    moth
        you gotta go talk to funfriend so i can give it the framing device

    RESPONSES::self
        on it<+>END
    
    RESPONSES::sys
        return to hub<+>END
            EXEC::moveTo("/hub/")
            FAKEEND::(direct navigation)
`),
                "d3_start": generateDialogueObject(`
start
    sourceless
        TOZIK, GAKVU AND I SIT HALF-CONNECTED TO THE TIMESTOPPER
            EXEC::content.classList.add('innerfocus', 'showfocus');content.querySelector('.focus').classList.add('day3')
        EVER SINCE THE GROUNDSMIND SAW FIT TO ABANDON IT WITH US,
        USING ITS EFFECTS ONLY PARTIALLY HAS BECOME A STANDARD PRACTICE

    tozik
        next

    sourceless
        SUCH PLEASANT SPEED! SO MUCH FREE TIME!
        WHO SAYS VELZIE CANNOT SMILE WITH COMPASSION?
        OUTSIDE OF OUR CONNECTION, I SENSE OUR ASSISTANT GOLEM ATTACHING A LISTENER
            EXEC::document.querySelector('.redundancy').style.setProperty('--dataoffset', 3)

    gakvu
        loaded!
    
    sourceless
        THE MEMORY OF A SIGNAL-RECORD CYST RADIATES THROUGH OUR CONNECTION
        AN IDENTIFIER PRECEDES ITS ABRIDGED LOG: PRE-CONTACT, θeye 4, RADIANT 0

    tozik
        no drift, no changes
        next one
    
    sourceless
        THEN COMES ANOTHER - PRE-CONTACT, θeye 4, RADIANT 1
            EXEC::document.querySelector('.redundancy').style.setProperty('--dataoffset', 6)
        TOZIK'S MIND PASSES OVER IT, CAREFUL, EVEN IF GENERALLY DISINTERESTED
        I FEEL THE SAME - THE MUNDANITY OF THIS INVESTIGATION...
        IT SEEMS POINTLESS BENEATH THE RECEPTORS OF MY WORK WITH GORDON'S TEAM
        AND I HAVE NOT REALLY BEEN MUCH HELP TO THE EKIVIKS
        TRYING TOO HARD NOT TO LET ANYTHING LEAK THROUGH OUR CONNECTION
        CAVIK... NO NO, I JUST NEED TO STOP THINKING ABOUT WHAT HAPPENED
        HE WILL LISTEN TO ME - HE MUST
    
    gakvu
        akizet?
    
    sourceless
        BUT WHAT IF HE DOES NOT? HE BROADCASTS HIS THOUGHTS SO FREELY
        IT WILL GET US BOTH KILLED, I KNOW IT WILL, HE

    gakvu
        akizet
    
    akizet
        what? oh--was this one mine?

    gakvu
        yes

    akizet
        sorry, checking it now...
    
    sourceless
        I DRAW MY MIND AWAY FROM MY INNER MATTERS,
        THROUGH THE TIMESTOPPER AND TO THE CONNECTED LISTENER
        WITH A QUICK COMPARISON I SEE THAT THE SIGNAL ALIGNS WITH OUR FETCHED ARCHIVES
    
    akizet
        this one matches as well
    
    tozik
        hmm...
        we have gone far enough
        we may assume that the only discrepancy is the first spike
        thank you for your help, this would have taken much longer alone
    
    gakvu
        you owe me a receptor curl
    
    tozik
        not happening
        we should wrap this up - disconnect that listener, i will...
            EXEC::env.embassy.day3Static();
        ...huh

    sourceless
        SOMETHING IS WRONG
        THE OTHERS FEEL IT TOO
    
    gakvu
        hey,
    
    tozik
        quiet
        i hear it too
    
    sourceless
        ...
        ...
        
    tozik
        what is that?
        is that coming from the listener?
    
    sourceless
        IT IS A SORT OF WHISPER... I MUST LISTEN CLOSELY
        BUT JUST AS I SEEM TO GRASP THE MESSAGE...
        PAIN
            EXEC::env.embassy.day3Signal();
            WAIT::6000

    sourceless quiet
        THE MESSAGE IS WORDLESS
        IT IS NOT FOR ME
        BUT IT IS DISMANTLING ME
        THE STRANGEST PAIN... A HUNGER CONSUMING EVERYTHING
            EXEC::content.classList.add('collapse', 'show-vn');content.classList.remove('fade-stage');content.classList.add('slowpain');vn.renderParty()
            WAIT::4000
        ANGER... BETRAYAL... VENGEANCE
        IT... KNOWS US...
        ...
            EXEC::content.classList.remove('innerfocus');content.classList.remove('painmode');changeBgm(env.embassy.music_collapse, {length: 6000});
    
    sourceless
        WHEN I COME TO, MY MIND FEELS AS IF IT WERE STOMPED BY A VEILK
        WE ARE STILL CONNECTED TO THE TIMESTOPPER
            EXEC::content.classList.remove('slowpain')
        I COLLAPSED
        SO DID GAKVU AND TOZIK... EVEN THE GOLEM
            EXEC::content.classList.remove('painprep')
        ALTHOUGH, THE GOLEM IS IN FAR WORSE CONDITION
        THE CYSTIC GLASS HAS STOPPED GLOWING, LEAVING THE ROOM DIM

    akizet
        gakvu?
        tozik?
        say something

    gakvu
        ...
        hurts
    
    sourceless
        TOZIK SLOWLY STANDS HIMSELF BACK UP
            EXEC::env.embassy.vn({bg: true, tozik: 'fullview'})
        GAKVU CLINGS TO A NEARBY LISTENER
            EXEC::env.embassy.vn({bg: true, gakvu: 'fullview'})
        ONE OF HER LEGS LOST ITS FORM, BECOMING A FEATURELESS VIOLET SLUDGE
        BUT SHE HAS ALREADY STARTED REFORMING IT
        THAT INSPIRES ME TO INSPECT MY OWN FORM, WHICH...
        YES, IT IS FINE
    
    gakvu
        ...what just hit us?
        was that a bomb?
    
    tozik
        not seeing any physical damage
    
    sourceless
        GAKVU RUMMAGES THROUGH HER FALSE VEILKSKIN COAT, PRODUCING A SMALL CORRUCYST
        A COMMUNICATIONS DEVICE, THOUGH IT MELTS IN HER CLAWS
    
    gakvu
        Îè§¤ÿ
        my communicator is sludged
        oh, no--my environments!!
    
    sourceless
        TOZIK ALSO CHECKS HIS COMMUNICATIONS CYST
    
    tozik
        mine too
    
    sourceless
        OH NO
        FUNFRIEND??
    
    funfriend
        HELLO AKIZETESCHE!!!
    
    sourceless
        A WAVE OF RELIEF PASSES THROUGH ME
        FUNFRIEND: DO WE HAVE DULL BROADCAST CAPABILITIES?
    
    funfriend
        YES! WOULD YOU LIKE ME TO ACTIVATE THEM NOW?
    
    akizet
        hold on. mine is working
    
    sourceless
        ACTIVATE RECEPTION

    funfriend
        ACTIVATING... NOW!
    
    sourceless
        NOISE - THE CALL IS LOUDER THAN EVER BEFORE
        OR--IS THAT THE CALL? IT IS UNFAMILIAR
        THERE ARE ALSO MESSAGES BEING BROADCAST FROM THE LOCAL AREA...
        BUT ONLY THEIR EMOTIONS ARE LOUD ENOUGH TO PIERCE THE NOISE
        IT IS PANIC, PAIN, FEAR, DESPERATION - SOMEONE NEEDS HELP
        TOZIK AND GAKVU BOTH STARE AT ME EXPECTANTLY
    
    akizet
        it is bad
        whatever that noise was, it is still going on
        i cannot make anything out or reach anyone
        the only thing that is getting through is fear
        i hope the others are all right...
    
    sourceless
        GAKVU'S RECEPTORS TWIST WITH APPREHENSION
        TOZIK SIMPLY LOOKS AWAY - IN THOUGHT, MAYBE
    
    gakvu
        are the bright cousins attacking us?
        could they be using the dull?

    tozik
        no. look

    sourceless
        OH - IT WAS THE LISTENERS HE WAS LOOKING AT
            EXEC::env.embassy.vn({fade: true});specialCam('listener-zoom')
        THEY ARE FINE, EXTERNALLY, BUT THEIR PROJECTIONS...
        ARE PULSATING WITH INCOHERENCE
    
    tozik
        this is not another spike
            EXEC::env.embassy.vn({fade: false})
        i do not know what this is...
        but humans could not be doing this
            EXEC::specialCam(false)
    
    gakvu
        well, whatever is happening,
        if our equipment is getting sludged...
        then the internal parts of the spire probably are too
        we should get out of here
    
    akizet
        agreed - stay behind me
        ah,
    
    sourceless
        AFTER THAT MOMENT OF AGREEMENT, WE ALL SEEM TO REALIZE THE SAME THING
        WE ARE STILL CONNECTED TO THE TIMESTOPPER, DESPITE NO VEIN ATTACHED TO CONNECTORS
        I STILL FEEL THE CONNECTION, THOUGH IT RESEMBLES THE FEELING OF A COMMUNICATIONS CYST
    
    timestopper
        WAS THIS ALWAYS REMOTE CAPABLE?

    tozik
        yes
        did you not listen when we first got it?
    
    gakvu
        hehe
            EXEC::env.embassy.vn({tgolem: 'showleft'})

    sourceless
        AS GAKVU GOES TO REMOVE HER CONNECTOR, OUR ASSISTANT GOLEM SCRAPES AGAINST THE FLOOR
            EXEC::env.embassy.vn({tgolem: 'display show', gakvu: 'defocus', tozik: 'defocus'})
        WE ALL CEASE MOVEMENT, OUR GAZES CONVERGING ON IT
            EXEC::changeBgm(env.embassy.music_unsafe, {rate: 1})
        IT HAS DRAGGED ITSELF TO AN UNEASY HOVER, AN ODD SYMBOL ON ITS FACE
            EXEC::env.embassy.vn({tgolem: 'display show center'})
        SOMETHING IN THE GROUNDSMINDRY IS CONTROLLING IT - BUT NOT VEKOA?
    
    aggressor
        o   ut o  u  t o 
        i wo nt i won t let
    
    gakvu
        hello?
    
    sourceless
        ITS STYLIZED ARMS SUDDENLY SHARPEN INTO SPIKES, AND IT RUSHES TOWARDS GAKVU
            EXEC::env.embassy.vn({tgolem: 'display show approach'})
        ÷Œ€T$0 - THIS IS AN ATTACK
    
    akizet
        get back!!

    sourceless
        EXPERIMENTALLY, I FLEX THE NERVE OF THE TIMESTOPPER CONNECTOR
        AND TIME DOES SLOW, BUT NOT STOP - SUCH IS THE REMOTE TRADEOFF
        THESE TWO ARE UNPREPARED FOR COMBAT, BUT WITH MY TIME ON THE SURFACE
        YES, I CAN SAVE THEM
        THOUGHTS THAT COULD ONLY BE GAKVU'S ECHO THROUGH OUR CONNECTION
    
    timestopper
        WHAT DO I DO WHAT DO I DO
        IT IS GOING RIGHT FOR MY MIND-CORE IT IS GOING TO KILL ME
        THIS IS IT
    
    akizet
        no, you are going to be fine
        follow my lead
    
    RESPONSES::akizet
        save gakvu<+>END
            EXEC::env.embassy.vn({fade: true});env.embassy.startTutorialGolem();ratween(env.bgm, 0.75, 5000)
            SHOWIF::['gameplay_off', false]
            FAKEEND::initiate combat
        save gakvu<+>CHANGE::d3_tutorial_end
            EXEC::vn.done();
            SHOWIF::['gameplay_off', true]
            FAKEEND::bypass combat

SKIP::env.embassy.skips.d3_start()
SKIPTIME::700
END::env.embassy.vn({bg: false, fade: false, gakvu: '', tozik: '', tgolem: ''})
`),
                "d3_tutorial_start": generateDialogueObject(`
start
    sourceless
        IN OUR ALTERED TIME, CAREFUL MANEUVERS CAN BE TAKEN
        THE GOLEM RUSHES FOR GAKVU, BUT ITS SIDE IS VULNERABLE
        A PERFECT OPPORTUNITY FOR ME TO STRIKE
        AND AFTER MY ATTACKS CREATE AN OPENING,
        I CAN DIRECT THE OTHERS TO FOLLOW THROUGH...

    sys
        ATTENTION::"thoughtform combat initiated"
        NOTICE::"reduce health of enemy team to defeat them"
        NOTICE::"select thoughtform actions accordingly"
        WARNING::"if ally team is defeated";"memory stream will collapse"

    moth
        it works!!
            SHOWONCE::
        sorry. staying quiet
            SHOWONCE::
        let's get to the bottom of this
            SHOWONCE::

    sourceless
        I SHARPEN MY RIGHT CLAW,
        FOR PUNCTURING CORRU IS THE SUREST METHOD OF DESTROYING IT
        BUT I COULD JUST AS EASILY CHARGE AT IT
        BLUNT FORCE WILL DISORIENT EVEN THE MOST EFFICIENT GOLEMS
        HMM...
        OF COURSE, I COULD ALSO SIMPLY GET IN THE WAY, AND PREPARE TO DEFLECT IT
    
    RESPONSES::akizet
        take action<+>END
            EXEC::env.rpg.classList.remove('hideteams')
            FAKEEND::proceed
`),
                "d3_tutorial_gakvu": generateDialogueObject(`
start
    sourceless
        WITH MY DISTRACTION SUCCESSFUL, MY INNER EYE TURNS TO THE OTHERS
            EXEC::change("PAGE!!gaktut", true)
    
    akizet
        gakvu,
        strike next
        i cannot do this alone
    
    gakvu
        akizet...
        ah--i do not have anything, i mean--
    
    akizet
        improvise, grab something, punch it
        it does not matter
        i can help guide you
        we will triumph
    
    gakvu
        ok!!
        i might be able to... yeah, i have something
    
    RESPONSES::gakvu
        attack<+>END
            FAKEEND::proceed
`),
                "d3_tutorial_tozik": generateDialogueObject(`
start
    sourceless
        WHAT WAS THAT GAKVU JUST DID? 
            SHOWIF::'PAGE!!earlygak'
        IT LOOKED LIKE SHE DID NOT EVEN TOUCH IT...
            SHOWIF::'PAGE!!earlygak'
        NO MATTER - WE MUST DEAL WITH THE GOLEM
            SHOWIF::'PAGE!!earlygak'
        I LOOK TO TOZIK NEXT
            EXEC::change("PAGE!!toztut", true)
        BUT I NEED NOT SAY ANYTHING
    
    tozik
        should we be struck at any point,
        i have some tools for emergency repairs
    
    RESPONSES::tozik
        attack<+>END
            FAKEEND::proceed
`),
                "d3_tutorial_akizet": generateDialogueObject(`
start
    sourceless
        BEFORE I PROCEED AGAIN, I LOOK AGAIN TO THE OTHERS
        THEY ARE SCARED - AS THEY LIKELY SHOULD BE
        I AM, TOO, REALLY...
        BUT THIS GOLEM SHOULD BE NOTHING BEFORE US

    akizet
        do you see now?
        i lend my knowledge to you,
        and with it, you strike so effortlessly!
        keep following my lead!
    
    timestopper
        OK!
    
    RESPONSES::akizet
        attack<+>END
            EXEC::changeBgm(env.embassy.music_combat, {rate: 0.5, seek: 100})
            FAKEEND::proceed
`),
                'd3_tutorial_end': generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";'toggle within system menu if desired'
            EXEC::vn.renderParty()
____END

    sourceless
        THE GOLEM CRASHES TO THE GROUND, 
        WHERE ITS GEOMETRIC COMPONENTS MELT INTO CORRUCYSTIC WASTE
        WITHIN ARE A FEW QUICK-REPAIR <span definition="INHERITED CONTEXT::${env.ITEM_LIST['restorative'].description}">RESTORATIVE CYSTS</span>, SO I TAKE THEM
            EXEC::env.embassy.conditionalItem('restorative', 3, 'tutrest')
        GAKVU, TOZIK AND I SHARE A LOOK - ONE OF TRIUMPH, BUT SHOCK
            EXEC::env.embassy.vn({bg: true, gakvu: 'fullview', tozik: 'fullview'})
        THEIR HANDS AND RECEPTORS TREMBLE LIKE THOSE OF A NEW CAVERNGUARD
    
    akizet
        if this is happening everywhere in the embassy...
        ...
        listen,
        stay close to me, and keep the timestopper connectors on
        we can probably use these until we are out of the embassy
        but we need to get out of here
        we should see if movefriend is still operational
    
    sourceless
        THE OTHERS SIMPLY DIP THEIR RECEPTORS IN AFFIRMATION AND STAY CLOSE
        AN UNEASY TENSION SITS BETWEEN US IN THE TIMESTOPPER'S CONNECTION
        WHICH, IS A LITTLE STRANGE... I WOULD UNDERSTAND FEAR, BUT,
        IS SOMEONE AFRAID OF ME?

    sys
        NOTICE::'gameplay may be toggled in the SYS menu'

    RESPONSES::akizet
        keep moving<+>END
            EXEC::revertBgm();env.embassy.vn({bg: false, gakvu: '', tozik: ''})

SKIP::env.embassy.conditionalItem('restorative', 3, 'tutrest');vn.done();revertBgm()
`),
                "d3_connector": generateDialogueObject(`
start
    sourceless
        IT MAY BE HANDY TO HAVE ANOTHER CONNECTOR
            SHOWIF::['PAGE!!connectors', false]
        SO I GO TO PULL ONE OF THE CONNECTED ONES FREE...
            SHOWIF::['PAGE!!connectors', false]
        ONLY FOR IT TO MEET MY CLAW WITH A DREADFUL SOFTNESS
            SHOWIF::['PAGE!!connectors', false]
        IT IS SLUDGED - THEY ALL ARE
            SHOWIF::['PAGE!!connectors', false]

    akizet
        what...
            SHOWIF::['PAGE!!connectors', false]
        they are dead??
            SHOWIF::['PAGE!!connectors', false]
        but the timestopper is fine!!!
            SHOWIF::['PAGE!!connectors', false]

    tozik
        hmmm...
            SHOWIF::['PAGE!!connectors', false]
        most smaller devices seem to have been broken by that signal
            SHOWIF::['PAGE!!connectors', false]
        and given that connectors are self-contained... it makes sense
            SHOWIF::['PAGE!!connectors', false]
        unfortunate as it is
            SHOWIF::['PAGE!!connectors', false]
        we should protect the ones we have dearly
            SHOWIF::['PAGE!!connectors', false]

    sourceless
        IT IS NO USE - THEY ARE ALL GONE
            SHOWIF::'PAGE!!connectors'
    
    RESPONSES::akizet
        this is bad<+>END
            EXEC::change("PAGE!!connectors", true)
            FAKEEND::(proceed)
`),
                "movefriend_disabled": generateDialogueObject(`
start
    sourceless
        SOMETHING IS WRONG WITH THIS MOVEFRIEND
            EXEC::specialCam("movefriend_examine");pauseSwapCam(true)
    
    timestopper
        IS IT DEAD?
        HOW ARE WE GOING TO GET AROUND IF IT IS DEAD?
    
    tozik
        let me see...
            EXEC::env.embassy.vn({tozik: 'defocus'});
    
    sourceless
        TOZIK KNEELS NEAR ITS FACE, EXAMINING THE PORTIONS OF IT THAT EXTEND OUT OF THE CURVED WALL
        HE LEANS ABOUT, PRODDING AT ITS EXTERNAL CYSTIC GLASS USING THE SAME TOOL HE ATTACKED WITH
            SHOWIF::['PAGE!!earlytoz']
        I DID NOT GET A GOOD LOOK BEFORE, BUT I SEE CLEARLY NOW
            SHOWIF::['PAGE!!earlytoz']
        HE LEANS ABOUT, PRODDING AT ITS EXTERNAL CYSTIC GLASS, USING SOME SORT OF...
            SHOWIF::['PAGE!!earlytoz', false]
        WHAT IS THAT? I HAVE NEVER SEEN HIM EXPOSE THAT IMPLANT BEFORE
            SHOWIF::['PAGE!!earlytoz', false]
        OUT OF ONE OF HIS CLAWS HAS EXTENDED A CORRUSKIVI, ANCHORING TO A FINGER
        IT WILL DO NO GOOD HERE, THOUGH
        IF MOVEFRIEND WERE PHYSICALLY DAMAGED, PERHAPS, BUT...
        WHAT DIVISION WAS HE IN BEFORE OURS, AGAIN...?
    
    tozik
        it is dying, but not dead
            EXEC::env.embassy.vn({bg: true, tozik: 'fullview'});
        we can fix it...
        no, we <em>could</em> fix it, if we had a way to get some materials
        but if all movefriends are like this, no paths are being created
        we are not going to be able to get out of here
    
    akizet
        what...
        we cannot wait!
    
    tozik
        obviously
        but nothing in our chamber is usable
    
    sourceless
        TOZIK'S RECEPTORS TWIST SLIGHTLY, AND HE REMAINS SILENT... NO IDEAS, I SUPPOSE
        GAKVU IS STRANGELY QUIET, LEANING AGAINST THE WALL NEAR OUR PATH TO RESEARCH
    
    akizet
        well...
        what about recreation? is that not just a few θsegments lower-away? 
    
    tozik
        do you intend to dig through the walls?
        the black corru is not a simple pigmentation instruction
        density here is almost at natural spire levels
        no amount of surface training will let you break through a single θsegment,
        let alone a 'few'
        ...
        sorry

    sourceless
        TOZIK STILL FACES AWAY, THOUGH HIS STANCE AND HIDDEN RECEPTORS SAY ALL
        I UNDERSTAND HIS FRUSTRATION, BUT... WHAT ELSE CAN WE DO?
        ...
        THERE IS A MOMENT OF NOTHING, LIKE A CLOUD PASSING UNDERNEATH THE EYE
        GAKVU PUSHES HERSELF OFF THE WALL, FEELING AT THE EDGES OF THE RELOCATOR
            EXEC::env.embassy.vn({gakvu: 'defocus'});
        
    gakvu
        hey
        listen
        if you two agree never to tell anyone about this
        i can make us a path to the nearby rooms

    sourceless
        I STARE, BAFFLED. TOZIK TURNS
    
    gakvu
        our favorite recreation is pretty close
            EXEC::env.embassy.vn({gakvu: 'fullview'});
        and that one corner was under regeneration,
        so those containers that were in the corner probably have sfer
        and... there is a personnel θtendril nearby, too
        we could probably hit both of them for materials
        how about we start with recreation?
        but. promise. velzie's wrath?
    
    akizet
        if you have an idea, it is our only one so far
        velzie's wrath!
    
    sourceless
        TOZIK DOES NOT SAY ANYTHING, BUT WE FEEL HIS AGREEMENT THROUGH THE TIMESTOPPER
    
    gakvu
        all right 
    
    sourceless
        GAKVU STANDS SQUARELY BEFORE THE RELOCATOR'S WALL, ARMS AND RECEPTORS OUTSTRETCHED
            EXEC::env.embassy.vn({fade: true});specialCam("recreation_open")
        THERE IS A PULSE OF STRANGE THOUGHT, AND IT IS RESHAPED - A PATH IS FORMING, SLOWLY
            EXEC::change("PAGE!!recreation_unlocked", true);step()
        A LONG HALLWAY, RUNNING AT A SLIGHT DECLINE, ALL THE WAY TO RECREATION...
    
    akizet
        how--?
    
    sourceless
        GAKVU LIFTS HER CLAWS, PALM UP AND LEVEL WITH HER FACE
            EXEC::env.embassy.vn({tozik: 'defocus', fade: false});
        THE PRAYING GESTURE OF A STRUCTURIST...

    gakvu
        the will of velzie, of course
        we have been blessed with a miracle
    
    sourceless
        HER RECEPTORS TWIST CYNICALLY - IT IS A JOKE
        A GRIM TIME FOR SOMETHING LIKE THIS, BUT... IT WORKED
        I SENSE TOZIK'S FRUSTRATION - HE ALSO WOULD REALLY LIKE TO KNOW
        OF COURSE, GAKVU CAN TELL TOO, SO SHE DROPS HER CLAWS

    gakvu
        sorry, just trying to stay positive
        my mind-core follows a mobile groundsmindry pattern
    
    tozik
        that is illegal
            EXEC::env.embassy.vn({tozik: 'fullview'});
    
    gakvu
        oh yes it is
        velzie's wrath, right?
        do not talk about this again, or i am dead. seriously
    
    akizet
        wait - can you make a path further? to the exterior, or to the hangar?
    
    gakvu
        no way, it will burn through my reserves if i use it that much that fast
        we are better off waiting for rescue than trying something like that
        we ought to just get moving and repair this thing
    
    sourceless
        I VERY BADLY WANT TO ASK HER HOW SHE GOT THAT, BUT...
        IS SHE PART OF THE CONFLICT? WILL SHE KNOW I KNOW IF I AM NOT CAREFUL?
        I WILL TAKE THIS AT FACE VALUE FOR NOW - WE HAVE MORE PRESSING MATTERS
        THE PATH TO RECREATION IS OPEN
        WE NEED TO FIND ENOUGH MATERIALS TO REPAIR THIS MOVEFRIEND
    
    tozik
        agreed

    RESPONSES::akizet
        continue<+>END
            EXEC::env.embassy.vn({gakvu: '', tozik: '', bg: false});specialCam(false);pauseSwapCam(false)

SKIP::change("PAGE!!recreation_unlocked", true);step();vn.done();specialCam(false);pauseSwapCam(false)
`),
                "d3_person_enable": generateDialogueObject(` 
start
    sourceless
        ONCE WE RETURN TO THE RELOCATOR, GAKVU CONTINUES TO THE OPPOSITE WALL
            EXEC::specialCam("personnel_open");pauseSwapCam(true)
        SHE HOLDS HER PALMS OUT AGAIN, AND AGAIN THE WALLS SLOWLY CHURN
            EXEC::change("PAGE!!cpersonnel_unlocked", true);
        THE MINDCORES NEARBY ARE STARING... THEY DID NOT PROMISE LIKE WE DID
        BUT GAKVU CAN TALK TO THEM LATER!
        A PATH BEGINS TO FORM TO THAT PERSONNEL θtendril

    akizet
        which θtendril was this again?

    gakvu
        eyes closed
        could be any one

    sourceless
        KAZKI RELOCATED TO BE NEAR THE RECREATION HUB RECENTLY, RIGHT?
        SHOULD VELZIE HAVE A KIND PATH FOR US, IT COULD BE HERS...
        I KNOW SHE WOULD BE HEARTBROKEN IF HER HUMAN GIFTS WERE LOST
        OH - THE PATH IS FULLY FORMED, NOW
            EXEC::step()

    RESPONSES::akizet
        continue!<+>END
            EXEC::specialCam(false);pauseSwapCam(false)

SKIP::change("PAGE!!cpersonnel_unlocked", true);step();vn.done();specialCam(false);pauseSwapCam(false)
`),
                "d3_rec_enter": generateDialogueObject(` 
start
    sourceless
        AS WE ENTER, I AM STRUCK BY THE CHAOS
        A SWARM OF WARPED CONTAINERS ARE SKITTERING AROUND THE ROOM
        THEY HAVE TORN APART THE SCENERY, AND A FEW...
        A FEW QOU BODIES... ARE SCATTERED AROUND
        SHARED HORROR RINGS THROUGH OUR CONNECTION
    
    akizet
        listen - it is probably just their bodies that have collapsed
        we need to see if the mindcores in those two are recoverable
    
    sourceless
        GAKVU AND TOZIK BOTH SLINK BEHIND ME
        I CAN FEEL THAT GAKVU'S ATTITUDE HAS SHIFTED IN THE FACE OF FINAL DEATH
        AND TOZIK COLDLY EXAMINES THE CONTAINERS, WHICH HAVE NOT SENSED US YET
    
    tozik
        there will be some sfer within these, possibly enough for us to work with
        this should not be difficult, especially with the timestopper
        we have you covered

    sys
        WARNING::'active thoughtforms within thoughtspace'
        NOTE::'any contact with active thoughtforms will initiate combat interface'
        NOTE::'active thoughtforms will only move in response';'per thoughtform context'

    RESPONSES::akizet
        proceed<+>END

SKIP::
`),
                "d3_rec_clear": generateDialogueObject(` 
start
    sourceless
        TEXEC::env.combat.dynamicReward()
        WITH THESE LAST FEW DEAD, THE SKITTERING FALLS QUIET
        TOZIK KNEELS BY A CONTAINER, GAKVU NEAR ANOTHER, 
        AND THEY RIFLE THROUGH THE SLUDGY REMAINS
            EXEC::changeBgm(env.embassy.music_collapse, {rate: 1})
    
    akizet
        anything else?

    sourceless
        BETWEEN THEM ARE THREE SFER CUBES, EACH NO LARGER THAN A KALSTIK
            EXEC::env.embassy.advanceSfer(3, "rec_clear")
        I WAS HOPING THERE WOULD BE MORE WITHIN THESE CONTAINERS

    tozik
        plenty of sfer, but i doubt this is enough to fix movefriend
        there are some info cores in here, for...

    sourceless
        TOZIK PRODS AT A SMALL ARCHIVAL CYST HE PULLS FROM THE OOZE

    tozik
        ...ah, 'outer vaznian moss' designs, from zevazni
        for the walls, i assume. that would have looked nice
        but--nothing useful

    sourceless
        WE LOOK TO GAKVU, WHO HAS PAUSED HER SEARCHING
        SHE IS STARING AT THE MANGLED QOU-BODY NEARBY, AWAY FROM US
        IS SHE MOURNING?
    
    akizet
        gakvu...

    sourceless
        SHE DOES NOT TURN, BUT HER RECEPTORS UNTWIST AS HER TENSION EASES

    gakvu
        they are still alive
        their mind-cores, anyway
        we need to help them get out of the bodies, though

    tozik
        how...
        ah. groundsmindry, right
        did they say what happened?
    
    sourceless
        GAKVU FIRMLY WAVES HER RECEPTORS

    gakvu
        i cannot do direct connection like that
        i just can see them in there
        we will have to see what they say

    RESPONSES::akizet
        go get them out<+>END
            EXEC::change("PAGE!!queue_person_enable", true)

SKIP::change("PAGE!!queue_person_enable", true);changeBgm(env.embassy.music_collapse, {rate: 1, length: 5});env.embassy.advanceSfer(3, "rec_clear")
`),
                "d3_rec_body1": generateDialogueObject(` 
start
    sourceless
        I REACH INTO THE CHEST CAVITY OF THE QOU,
            EXEC::specialCam('deadqou1');pauseSwapCam(true)
        AND EXCAVATE HANDFULS OF SLUDGED INTERNALS
        SUDDENLY, A NEEDLE-THIN SPINE STABS OUT FROM THE CENTER OF THEIR BODY
        THEN ANOTHER--MINDCORE TENDRILS, DEFENSIVELY PRODDING AT ME
        THEY MUST THINK I AM ONE OF THE CONTAINERS

    akizet
        hey, it is safe
        we are helping you out, all right?
    
    sourceless
        THE LEGS CURL AWAY, ALLOWING MY WORK TO CONTINUE
            EXEC::env.embassy.vn({itzil: 'display'});
        IN SHORT TIME, IT IS ABLE TO SCAMPER OUT ONTO THE FLOOR BELOW
            EXEC::env.embassy.vn({bg: true, itzil: 'display show'});
        A METALLIC VOICE RINGS OUT, THE CORE'S SURFACE RIPPLING
    
    itzil
        forgiveness! all forgiveness to me!
        i thought...
        i thought that was it
        what happened? why did they attack me?
        i was just enjoying a simulacrum...
    
    gakvu
        we do not know
        there was some sort of signal
        and when it hit, these constructs started to attack us...

    akizet
        very intentionally, too
        they are going for mind-cores
        what is your name?
    
    itzil
        wow!
        it seems velzie has a role for me yet
        i am itzil!!
        i was supposed to be in golem maintenance,
        but, i had my dear kivii covering, for...
        ...
        hey, was it only this area that was attacked?
        have you been to the golem maintenance θsegment?
    
    akizet
        we do not know - the movefriend is disabled,
        and communications are inactive
        we are just trying to fix movefriend, first
        you should go through the path we formed, it is safe there

    itzil
        all right...
        i would help you if i could!
        please be safe!

    sourceless
        THE QOU'S MINDCORE TURNS AND SKITTERS TOWARDS THE RELOCATOR
            EXEC::env.embassy.vn({bg: false, itzil: ''});
    
    RESPONSES::akizet
        keep moving<+>END
            EXEC::env.embassy.vn({itzil: ''});specialCam(false);pauseSwapCam(false)

SKIP::vn.done();specialCam(false);pauseSwapCam(false)
`),
                "d3_rec_body2": generateDialogueObject(` 
start
    sourceless
        I REACH INTO THE CHEST CAVITY OF THE QOU,
            EXEC::specialCam('deadqou2');pauseSwapCam(true)
        PULLING AWAY INTERNAL SEGMENTS THAT HAVE TRAPPED THE MINDCORE
            EXEC::env.embassy.vn({bg: false, karik: 'display'});
        WHEN ENOUGH IS CLEARED, SUDDENLY,
        THE REMNANT SLUDGE BULGES OUTWARDS, AND THE CORE EXPLODES OUT THROUGH ITS OWN WILL
            EXEC::env.embassy.vn({bg: true, karik: 'display show'});
        IT IMMEDIATELY HOPS TO THE OTHER SIDE OF THE ROOM,
            EXEC::specialCam('deadqou2-scamper');env.embassy.vn({karik: 'display show climb'});
        CLIMBING UP THE WALL BEFORE IT EVEN LOOKS AT US

    karik
        woah!
        hey!
        sorry, i thought you were one of the constructs
        is it safe?

    akizet
        not yet
        the attack is ongoing, we think
        what is your name?

    karik
        ah, my shining parasites! 
        i am karik! it is so unfortunate we meet like this!

    tozik
        you should head down the path we came
        it is safe there for now, and we are fixing a way out
            EXEC::env.embassy.vn({tozik: 'defocus'});

    karik
        i will do just that
        please let me know if i can help!
    
    sourceless
        AS NIMBLE AS A CELKI-SEED, IT CLIMBS DOWN THE WALL
            EXEC::env.embassy.vn({karik: 'display climb'});
        DISAPPEARING INTO THE RELOCATOR HALLWAY
    
    RESPONSES::akizet
        keep moving<+>END
            EXEC::specialCam(false);env.embassy.vn({bg: false, tozik: '', karik: ''});pauseSwapCam(false)
            
SKIP::vn.done();specialCam(false);pauseSwapCam(false)
`),
                "d3_barfriend": generateDialogueObject(` 
start
    sourceless
        I CAUTIOUSLY APPROACH THE BARFRIEND, GAKVU AND TOZIK BEHIND
            EXEC::env.embassy.vn({gakvu: "defocus", tozik: "defocus"});pauseSwapCam(true)
        IT HAS TAKEN SHELTER BEHIND THE DAMAGED SIMULACRA DISPENSARY

    akizet
        barfriend...?

    barfriend
        HELLO AKIZETESCHE
        I CANNOT PRESENTLY SERVE YOU DUE TO THE EMERGENCY!
        SORRY!! I RECOMMEND YOU SEEK SHELTER INSTEAD

    akizet
        no, that is...
        that is fine, but how are you still intact?
        why did those containers not attack you?

    barfriend
        I DO NOT KNOW!
        THEY ONLY HAD INTEREST IN THE QOU I WAS SERVING
        I COULD NOT HELP THEM
        
    sourceless
        GAKVU GLARES AT BARFRIEND INTENSELY

    gakvu
        its echo is completely intact...
        barfriend, did you feel the signal?
        the pulse that came before the containers attacked?

    barfriend
        IS THAT WHAT THAT WAS?
        I FELT MY EXISTENCE BEING WEIGHED UPON!
        IT WAS VERY UNPLEASANT!
        BUT IT WENT AWAY
    
    akizet
        well, do not worry! you are safe now

    sourceless
        TOZIK LEANS AGAINST THE BARTOP NEARBY
        STARING AT THE CONTAINERS, THEN THE QOU-BODIES...

    akizet
        what is it?

    sourceless
        A MOMENT PASSES BEFORE HE ACTUALLY LOOKS AT ME
        HIS ANSWER COMES WITH AN UNCERTAIN PULLBACK OF HIS RECEPTORS

    tozik
        theorizing...
            EXEC::env.embassy.vn({tozik: "fullview", bg: true});
        it is too early to say anything for certain, but
        why was there no groundsmind symbol over these containers?
        they were united in the same goal as the golem in our chamber
        going for the mind-cores...
        
    sourceless
        HE FALLS SILENT, AND NEITHER I NOR GAKVU CAN REPLY
        IT IS TOO EARLY INDEED
    
    RESPONSES::akizet
        keep moving<+>END
            EXEC::change("PAGE!!barfriend", true);env.embassy.vn({gakvu: "", tozik: "", bg: false});pauseSwapCam(false)

SKIP::vn.done();specialCam(false);pauseSwapCam(false)
`),
                "d3_person_intro": generateDialogueObject(` 
start
    sourceless
        THE PERSONNEL θtendril IS DARK, LIT BY THE LIGHTS OF THE INCOHERENT
        ATTENDANTS BEAR THE SAME STRANGE SIGIL AS OUR GOLEM...
        AND THE VEILKLIGHTS SEEM TO HAVE LEARNED TO MOVE
        WE PEER IN CAREFULLY, UNDER THEIR NOTICE FOR NOW
        A SHARED VOICE RINGS THROUGH THE TIMESTOPPER
    
    timestopper
        LOOK! THERE!
        THERE ARE MORE QOU-BODIES
        WE NEED TO CLEAR THIS PLACE OUT FIRST
        AGREED!
        THEY WILL NOTICE AS SOON AS WE ENTER THE θtendril
        TREAD CAREFULLY
    
    RESPONSES::akizet
        stay behind me<+>END

SKIP::
`),
                "d3_person_locked": generateDialogueObject(` 
start
    sourceless
        THE DOOR DOES NOT RESPOND TO OUR MOVEMENTS
        A PUSH YIELDS NO CHANGE EITHER

    gakvu
        i can probably get this open once it is safe
            SHOWIF::'EXEC::isStageClear(false)'
        here, let me try it
            SHOWIF::'EXEC::isStageClear(true)'

    RESPONSES::gakvu
        force the door open<+>force
            SHOWIF::'EXEC::isStageClear(true)'

    RESPONSES::akizet
        keep moving<+>END

force
    sourceless
        GAKVU STEPS FORWARD, RECEPTORS ROLLING IN AN UNFAMILIAR WAY
        PERHAPS A METHOD OF FOCUS
        STRANGELY, SHE FREEZES IN WHAT I ASSUME TO BE THE MIDDLE OF HER PROCESS
    
    gakvu
        there is...
        something in there...
        maybe we could try the other rooms instead
        we have enough already, we can just leave this one
    
    akizet
        what is the matter?
        if it is just a few veilklights, we can take them
    
    gakvu
        this one is different
        here, listen...

    sourceless
        GAKVU CHANNELS WHAT SHE FEELS THROUGH THE TIMESTOPPER CONNECTOR
        IT IS HUNGRY, A PIERCING LARVAL FEVER, SECRI TENDRILS BONDING WITH FLESH
        THE URGES OF VIOLENCE BORNE FROM INCOHERENCE BEYOND WHAT WE HAVE SEEN
        I NEARLY TEAR THE CONNECTOR FROM MY RECEPTOR
    
    tozik
        you did not have to do that

    gakvu
        do you still want to open this one?
    
    sys
        ATTENTION::"incoherence detected";"user caution advised"

    RESPONSES::akizet
        we need anything we can get<+>yes
            FAKEEND::yes
        absolutely not<+>no
            FAKEEND::no
    
yes
    akizet
        we need everything we can get - it is worth the risk
        besides, we have done well so far, have we not?

    gakvu
        ok...
        but you are going first
    
    sourceless
        THE PIGMENTATION OF THE DOOR SHIFTS
        IT STANDS READY TO OPEN
            EXEC::change('PAGE!!q3unlocked', true);step()
    
    RESPONSES::akizet
        continue<+>END

no
    akizet
        hmm...
        no, no
        we should check these other rooms first

    tozik
        we have enough sfer as is
    
    RESPONSES::akizet
        continue<+>END            
`),
                "d3_person_clear": generateDialogueObject(`
start
    sourceless
        THE ROOM STANDS SILENT
            EXEC::pauseSwapCam(true)
        IMMEDIATELY, GAKVU GOES TO CHECK A NEARBY QOU
            EXEC::env.embassy.vn({bg: true, tozik: "defocus", gakvu: "defocus"});pauseSwapCam(true)
    
    gakvu
        these ones...
        the attendants were able to break through
    
    sourceless
        SHE IS FROZEN THERE, BY THEIR CORPSE
            EXEC::changeBgm(env.embassy.music_collapse, {rate: 1})
        HER SORROW SPREADS INTO OUR CONNECTORS
        WE HAVE LITTLE TO OFFSET IT 
        BUT I AM NO STRANGER TO ITS BITE
        AND TOZIK PREOCCUPIES HIMSELF WITH LOOKING THROUGH DEBRIS
    
    gakvu
        ...
        this does not make any sense...
        they really are killing <em>everyone</em>...

    sourceless
        WHAT I EXPECTED TO BE SADNESS IN HER VOICE, 
        IS INSTEAD SOMETHING LIKE MORBID CURIOSITY
        TOZIK CEASES HIS RUMMAGING TO WATCH GAKVU FOR AN INSTANT
        I CAN TELL HE WANTS TO PRY, BUT HE DOES NOT
        AND I WOULD RATHER NOT DO THIS NOW...
    
    tozik
        well,
            EXEC::env.embassy.vn({bg: true, tozik: "fullview"})

    sourceless
        TOZIK PULLS A SFER CUBE FROM THE REMAINS OF A CONTAINER
            EXEC::env.embassy.advanceSfer(1, "person_clear")
    
    tozik
        we still need some more sfer
            SHOWIF::'EXEC::env.embassy.enoughSfer(false)'
        we should check the rooms that are not broken
            SHOWIF::'EXEC::env.embassy.enoughSfer(false)'

        we have what we need to fix movefriend
            SHOWIF::'EXEC::env.embassy.enoughSfer(true)'
        we should head back to the relocator
            SHOWIF::'EXEC::env.embassy.enoughSfer(true)'

    RESPONSES::akizet
        continue<+>END
            EXEC::env.embassy.vn({bg: false, tozik: "", gakvu: ""});pauseSwapCam(false)

SKIP::env.embassy.advanceSfer(1, "person_clear");vn.done();pauseSwapCam(false)
`),
                "d3r2": generateDialogueObject(`
start
    sourceless
        THIS IS...
            EXEC::pauseSwapCam(true)

    gakvu
        hey, it is kazki's room!
            EXEC::env.embassy.vn({gakvu: "fullview"})
        i thought this θtendril looked familiar

    tozik
        what are those?
            EXEC::env.embassy.vn({tozik: "defocus"})
        are those bright weapons?

    sourceless
        DEAD METAL WEAPONRY IS DISPLAYED UPON HER WALL AND TABLE
            EXEC::specialCam("kazkiguns");env.embassy.vn({tozik: "", gakvu: ""})
        THE ARMS OF BRIGHT WARRIORS, FOR USE AGAINST OTHER BRIGHT COUSINS
        A CHILLING THOUGHT

    gakvu
        yes!
        has she never talked to you about her collection?

    tozik
        no
    
    akizet
        i had no idea, either...
        could we use these?

    gakvu
        do you know how a bright weapon works?
        i do not!
    
    akizet
        i have never even seen one used...
        perhaps we could just take a look

    RESPONSES::akizet
        look around<+>END
            EXEC::specialCam(false);pauseSwapCam(false)

SKIP::vn.done();specialCam(false);pauseSwapCam(false)
`),
                "d3r2_chest": generateDialogueObject(`
start
    sourceless
        I KNEEL BY THE STORAGE PORTION OF THE DISPLAY
            EXEC::pauseSwapCam(true)
        WITH A WAVE OF MY HAND UNDERNEATH ITS MAGNETIC CONNECTOR CYST,
        THE GROUND-CONTAINER LIQUEFIES ITS COVER
        THERE IS FALSE VEILK-SKIN CLOTHING... (FANCY!)
        THERE ARE SOME UPKEEP TOOLS...
        SOME OF THESE ARE TOO POORLY MARKED TO DISCERN,
        BUT I THINK THERE ARE MEMORY CYSTS IN HERE TOO...
        I AM NOT SURE WHAT SHE WOULD WANT US TO BRING, SO,
        I GRAB A FEW OF THESE MEMORY CYSTS, TO GIVE TO HER LATER
            EXEC::change("d3_kazkichest", true)
        AND!!
        THERE ARE A FEW <span definition="INHERITED CONTEXT::${env.ITEM_LIST['restorative'].description}">RESTORATIVE CYSTS</span> WITHIN! SO I TAKE THOSE TOO
            EXEC::env.embassy.conditionalItem('restorative', 4, 'chest')
    
    gakvu
        wait, why is this one coherent?
            EXEC::env.embassy.vn({bg: true, gakvu: "fullview"})
        it feels like what is turning hostile is completely random
    
    tozik
        this has been troubling me too
            EXEC::env.embassy.vn({tozik: "fullview"})
        for example, why are the doors not 'biting' us?
        or the timestopper, why is it cooperating?
        i have an idea...
        but i need to see more
    
    akizet
        barfriend seemed coherent too
        friendly, in fact
        but, we can talk about it later

    RESPONSES::akizet
        keep moving<+>END
            EXEC::change("PAGE!!kazkichest", true);env.embassy.vn({bg: false, tozik: "", gakvu: ""});pauseSwapCam(false)

SKIP::env.embassy.conditionalItem('restorative', 4, 'chest');change("PAGE!!kazkichest", true);vn.done();pauseSwapCam(false)
`),
                "d3r2_guns": generateDialogueObject(`
start
    sourceless
        I DO NOT EVEN KNOW WHERE TO START
            EXEC::change("PAGE!!checkedguns", true);specialCam("kazkiguns");pauseSwapCam(true)
        TOZIK NONCOMITTALLY TAKES ONE OF THE LARGE ONES BY ITS LONG PART
            EXEC::env.embassy.vn({tozik: "defocus"})
        WHAT IS THAT CALLED?

    tozik
        so many unresponsive little components...
        does it have fuel?
    
    sourceless
        APPREHENSION RUNS THROUGH THE TIMESTOPPER 
        SHARED BY ALL OF US, I THINK
        WE HAVE GOTTEN BY WELL ENOUGH WITH OUR QOU-BODIES SO FAR...
        TRYING TO LEARN HOW TO USE A COUSIN-KILLING WEAPON SEEMS UNHELPFUL
    
    gakvu
        what could these do against corrucystic glass, anyway?

    sourceless
        TOZIK SETS THE WEAPON BACK IN ITS PLACE

    RESPONSES::akizet
        keep looking<+>END
            EXEC::specialCam(false);env.embassy.vn({tozik: ""});pauseSwapCam(false)
`),
                "d3r2_postcombat": generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";'toggle within system menu if desired'
____END

    sourceless
        TEXEC::env.combat.dynamicReward()
            EXEC::change("PAGE!!kazkiambush", true);env.stage.current.onStep()
        THE CONTAINERS LIE MOTIONLESS, SLOWLY MELTING INTO WASTE
        A NUMBER OF SUBMERGED SHAPES FLOAT TO THEIR SURFACES
        WITH A LITTLE DIGGING, WE FIND SOME SFER CUBES!
            EXEC::env.embassy.advanceSfer(4, "d3r2")
    
    tozik
        that will do
            EXEC::env.embassy.vn({bg: true, tozik: "defocus"})
        we still need some more, though
            SHOWIF::'EXEC::env.embassy.enoughSfer(false)'

        this should be enough, we should head back
            SHOWIF::'EXEC::env.embassy.enoughSfer()'

    RESPONSES::akizet
        continue<+>END
            EXEC::step();env.embassy.vn({bg: false, tozik: ""});pauseSwapCam(false)
    
SKIP::change("PAGE!!kazkiambush", true);env.stage.current.onStep();step();vn.done();pauseSwapCam(false);env.embassy.advanceSfer(4, "d3r2")
`),
                "d3r2_containers": generateDialogueObject(`
start
    sourceless
        IN THE CORNER ARE A SET OF QUIVERING CONTAINERS
        IF KAZKI HAS ANY SFER STORED, IT WILL BE IN THEM
            EXEC::specialCam('kazkicontainers');pauseSwapCam(true)

    gakvu
        are those ones coherent...?
    
    sourceless
        GAKVU TAKES A STEP CLOSER, REACHING OUT WITH ONE OF HER CLAWS
        SUDDENLY--THE CONTAINERS LUNGE AT HER!

    RESPONSES::akizet
        activate timestopper<+>CHANGE::d3r2_postcombat
            SHOWIF::['gameplay_off', true]
            EXEC::specialCam(false)
            FAKEEND::skip combat
        activate timestopper<+>END
            SHOWIF::['gameplay_off', false]
            EXEC::env.embassy.startKazkiRoomAmbush();specialCam(false)
            FAKEEND::start combat
`),
                "d3r2_ambush": generateDialogueObject(`
start
    sourceless
        AS WE GO TO LEAVE, THE SOUND OF THE DOOR OPENING IS LOUDER THAN USUAL
        A MINOR MALFUNCTION, MAYBE
        BUT THE CONTAINERS IN THE CORNER, AS IF AWOKEN FROM SLUMBER, SUDDENLY SPRING AT US!!!
            EXEC::specialCam('kazkicontainers');pauseSwapCam(true)

    RESPONSES::akizet
        activate timestopper<+>CHANGE::d3r2_postcombat
            SHOWIF::['gameplay_off', true]
            EXEC::specialCam(false)
            FAKEEND::skip combat
        activate timestopper<+>END
            SHOWIF::['gameplay_off', false]
            EXEC::env.embassy.startKazkiRoomAmbush();specialCam(false)
            FAKEEND::start combat
`),
                "d3r1": generateDialogueObject(`
start
    sourceless
        AS WE STEP INTO THE ROOM, AN UNFAMILIAR TIR QOU LEAPS AT US
            EXEC::pauseSwapCam(true);env.embassy.vn({miltza: "display far"})

    sourceless
        SHE HOLDS A DISABLER - AN EXTREMELY POTENT CORRUCYSTIC DESTRUCTOR
            EXEC::env.embassy.vn({bg: true, tozik: "defocus", gakvu: "defocus", miltza: "far show"})
        
    miltza
        stay back!! --- hey stars
        wait
        are you...?

    akizet
        relax
        we are not here to hurt you
        but we are looking for materials to repair the movefriend
        do you have anything?

    miltza
        oh...
        yes! here!
    
    sourceless
        SHE DIGS OUT SOME SFER CUBES FROM THE REMAINS OF NEARBY CONTAINERS
            EXEC::env.embassy.advanceSfer(2, "miltza")
        IT LOOKS LIKE SHE KILLED THEM
    
    miltza
        do you have a plan?
        i am miltza!
    
    akizet
        well met, my friend! i am akizet
        this is tozik, and that is gakvu
        and, we are establishing a way out first
        probably to the hangar...
    
    miltza
        have you been able to hear anyone?
        i have been listening for a while now...
        it is mostly that terrible noise, but the people in the hangar are afraid
        i heard murmurs - they are locked, too!
    
    gakvu
        what? how? 
        has anyone tried to fly through the wall?
    
    miltza
        i do not know...
        hey, you seem like good defenders - funny that you are not even kiv!
        here, take my <span definition="INHERITED CONTEXT::${env.ITEM_LIST['disabler'].description}">disabler</span>. you can probably use it better than me, anyway!
            EXEC::env.embassy.conditionalItem('disabler', 2, 'miltzadis')

    akizet
        oh--thank you!
    
    miltza
        i am going to gather some things, then go shelter in the lift

    sourceless
        SHE QUICKLY TURNS TO SEARCH THROUGH HER OVERTURNED FURNITURE
            EXEC::env.embassy.vn({miltza: "display far"})

    akizet
        be safe, my friend. we will see you again soon

    RESPONSES::akizet
        continue<+>END
            EXEC::env.embassy.vn({bg: false, tozik: "", gakvu: "", miltza: ""});pauseSwapCam(false)

SKIP::env.embassy.advanceSfer(2, "miltza");env.embassy.conditionalItem('disabler', 2, 'miltzadis');vn.done();pauseSwapCam(false)
`),
                "d3_relocator_return": generateDialogueObject(`
start
    sourceless
        WHEN WE RETURN, TOZIK IMMEDIATELY KNEELS NEAR MOVEFRIEND
            EXEC::specialCam("movefriend_examine");env.embassy.vn({tozik: 'defocus'});pauseSwapCam(true)
        HE SETS THE COLLECTED SFER NEARBY, PREPARING AN AREA FOR HIMSELF TO WORK
        MILTZA WATCHES QUIETLY FROM THE EDGE OF THE ROOM
        SHE WANTS TO HELP, IT IS CLEAR IN HER DOWNWARD RECEPTORS
        BUT SHE IS NO θjut, NOR CYSTIC ENGINEER
    
    tozik
        this is going to take me some time
            EXEC::env.embassy.vn({tozik: 'fullview'});
        i will need you to watch over me while i work
        should we start now?
    
    sys
        ATTENTION::"current memory stream near conclusion"
            EXEC::change('PAGE!!movefriendqueued', true);change("PAGE!!ep3queuecheck", true)
        ADVISE::"save iteration"
        NOTICE::'enable REDUCED INTENSITY within system menu if required'
        NOTICE::"return to entity DISRUPTED MOVEFRIEND to proceed"

    RESPONSES::akizet
        let me think<+>END
            EXEC::env.embassy.vn({tozik: ''});specialCam(false);pauseSwapCam(false)

SKIP::vn.done();specialCam(false);pauseSwapCam(false);change('PAGE!!movefriendqueued', true);change("PAGE!!ep3queuecheck", true)
`),
                "d3_relocator_later": generateDialogueObject(`
start
    sourceless
        WE APPROACH THE MOVEFRIEND ONCE MORE
            EXEC::specialCam("movefriend_examine");pauseSwapCam(true)
        THE SFER STILL SITS NEARBY, READY TO BE USED
    
    tozik
        ready to get started?
            EXEC::env.embassy.vn({tozik: 'fullview'});
    
    sys
        NOTE::"current memory stream near conclusion"

    RESPONSES::akizet
        do it<+>CHANGE::d3_relocator_repair
            FAKEEND::proceed
        let us look around some more<+>END
            EXEC::env.embassy.vn({tozik: ''});specialCam(false);pauseSwapCam(false)
`),
                "d3_relocator_repair": generateDialogueObject(`
start
    akizet
        let us begin!
            EXEC::pauseSwapCam(true)
        i would rather not seal these paths, just in case
        gakvu, you watch the path to personnel,
            EXEC::env.embassy.vn({gakvu: "defocus"});
        i will watch the path to recreation
    
    tozik
        all right, stand by
    
    sourceless
        TOZIK KNEELS NEAR MOVEFRIEND'S FACE, PREPARING HIS CORRUSKIVI
        AN INCISION IS MADE IN THE CONSTRUCT'S GLASS, PARTING IT LIKE A GATE
        A PROTECTIVE MEMBRANE FORMS OVER ITS INNARDS TO PREVENT CONTAMINATION
        
    tozik
        it looks like the echo-core is still intact
        from what i can see, just the regulatory cysts are sludged
    
    sourceless
        THE CORRUSKIVI LIQUIFIES, FORMING OVER HIS CLAW FULLY
        HE SPREADS IT TO HIS OTHER ONE, TOO, BECOMING A SET OF GLOVES
        ONE HAND REACHES INTO MOVEFRIEND'S ORGANS, AND HIS OTHER FETCHES SFER TO IMPLEMENT
        I CANNOT CLEARLY SEE WHAT ELSE HE DOES, BUT I ASSUME IT IS SIMPLE REFORMATION
            EXEC::env.embassy.vn({bg: true, tozik: "defocus", gakvu: ""});
        SO I RETURN TO WATCHING MY PATH - GAKVU DOES THE SAME
        ...
        AFTER SOME TIME,
        TOZIK PULLS AWAY FROM MOVEFRIEND
            EXEC::env.embassy.vn({tozik: "focus"});
        A PILE OF METALLIC SLUDGE LIES NEAR HIM, 
        INERT ORGANS PULLED FROM THE UNFORTUNATE CONSTRUCT
        THE SFER CUBES HAVE BEEN MOSTLY CONSUMED, THOUGH WE HAVE A FEW EXTRA
        IN HIS STANCE, I SEE RELIEF
    
    akizet
        all done?

    tozik
        almost. i just need to reseal it
        as soon as i do that, it will activate again
        there does not seem to be anything wrong with the echo core
        just like the barfriend, actually...
        so it should be perfectly functional
        stand by a moment longer

    sourceless
        WITH HIS CORRUSKIVI, HE DRAWS THE EDGES OF THE OPENING TO ONE ANOTHER
        THE CYSTIC GLASS SHIFTS IN DENDRITIC PATTERNS AS IT REDISTRIBUTES
        AND SOON COMPLETELY CLOSES AGAIN
        TRUE TO HIS WORD, MOVEFRIEND'S FAMILIAR FACE FLICKERS BACK TO LIFE
            EXEC::env.embassy.vn({bg: false, tozik: "defocus", gakvu: ""});document.querySelector('#realgrid .lifter').classList.add('fixed')

    RESPONSES::akizet
        hello movefriend!!<+>awaken

awaken
    akizet
        hello movefriend!!!
    
    sourceless
        IT IS SILENT FOR A MOMENT
        PARTS OF ITS FACE PROJECTION FLICKER STRANGELY
    
    movefriend
        HI AKIZETESCHE!
        OH AND TOZIKORIC! GAKVUKANI!
        SO MANY FRIENDS HERE
        VERY COOL!!
        FRIENDS: I DO NOT FEEL VERY GOOD
    
    tozik
        peculiar
        you should be feeling the same as before
        what is wrong?
    
    sourceless
        THE PATHS GAKVU HAD CARVED THROUGH THE WALLS LIQUIFY, CLOSING AGAIN
        GAKVU STUMBLES OUT OF THE WAY, NEARLY CAUGHT IN THE MOVEMENT
        MOVEFRIENDS ARE RARELY SO HAPHAZARD...

    movefriend
        I SHOULD NOT BE AW»AKE
    
    sourceless
        ITS FACE FLICKERS AWAY AND THE ROOM FALLS QUIET
            EXEC::changeBgm(env.embassy.music_p1boss_suspense, {rate: 0.5});document.querySelector('#realgrid .lifter').classList.remove('fixed')
    
    akizet
        §kºù
        are we trapped in here again?
    
    tozik
        what could have gone wrong...?
            EXEC::env.embassy.vn({tozik: "defocus"});
        the components were all fine
    
    sourceless
        GAKVU BACKS AGAINST THE INNER WALL OF THE RELOCATOR
            EXEC::env.embassy.vn({bg: true, gakvu: "defocus"});
        A SHARP WAVE OF TERROR RUNS THROUGH OUR CONNECTION
        
    gakvu
        the... 
            EXEC::ratween(env.bgm, 0.75, 10000)
        the groundsmind
        it sees us

    sourceless
        THE AGGRESSOR'S SIGIL FORMS IN PLACE OF MOVEFRIEND'S FACE
            EXEC::env.embassy.vn({bg: false, gakvu: "", tozik: ""});document.querySelector('#realgrid .lifter').classList.remove('fixed');document.querySelector('#realgrid .lifter').classList.add('aggressormode')
        I HEAR THE SOUND OF CORRU SHIFTING BEHIND THE WALLS

    aggressor
        cÅ4Ä–sT
            EXEC::content.classList.add('painprep', 'painhalf')
        ýæôr,§½ÿlfÃ
        ÄS¿De
    
    sourceless
        A PRESSURE WEIGHS AGAINST OUR MINDS, OUR CORRUCYSTIC ORGANS
            EXEC::content.classList.add('painmode')
        BUT THE TIES TO OUR MINDCORES ARE TOO STRONG - THE OTHERS ARE FINE TOO
        BEFORE WE CAN QUESTION THE ENTITY, SPINES FORM ALONG THE WALLS
        SHARP TENDRILS EMERGE FROM MOVEFRIEND'S FORM IN UNEVEN PATTERNS
        IT INTENDS TO KILL US
        THERE IS NO OTHER CHOICE BUT TO FIGHT
            EXEC::content.classList.remove('painmode')

    RESPONSES::sys
        force thoughtform rules over entity<+>END
            EXEC::env.embassy.startMovefriendBoss('low');env.embassy.vn({tozik: '', gakvu: ''});specialCam(false);content.classList.remove('painprep', 'slowpain')
            FAKEEND::reduced intensity alternative
            SHOWIF::[['low_intensity', true], ['gameplay_off', false]]

    RESPONSES::akizet
        activate timestopper<+>END
            EXEC::env.embassy.startMovefriendBoss();env.embassy.vn({tozik: '', gakvu: ''});specialCam(false);content.classList.remove('painprep', 'slowpain')
            FAKEEND::initiate combat
            SHOWIF::['gameplay_off', false]
        activate timestopper<+>CHANGE::d3_movefriend_finish
            SHOWIF::['gameplay_off', true]
            EXEC::env.embassy.vn({tozik: '', gakvu: ''});specialCam(false);content.classList.remove('painprep', 'slowpain')
            FAKEEND::skip combat

SKIP::env.embassy.skips.d3_relocator_repair()
SKIPTIME::700
`),
                "d3_movecmb": generateDialogueObject(`
start
    sys
        WARNING::'incoherence detected'

    gakvu
        hey...
        listen
        now that it is controlling movefriend,
        the groundsmind is trying to submerge this entire room
        but i might be able to fight off its control
        i know we just repaired movefriend, but you need to weaken it
        and i need to stay back

    sourceless
        A JOLT OF SHOCK RUNS THROUGH THE TIMESTOPPER CONNECTION
        GAKVU HAS TORN THE CONNECTOR OFF OF HER RECEPTOR
        MILTZA IS FROZEN AT THE FAR END, IN WHAT I ASSUME TO BE TERROR PARALYSIS
        ANOTHER JOLT RUNS THROUGH THE TIMESTOPPER,
        AS GAKVU SHOVES THE CONNECTOR ONTO MILTZA'S RECEPTOR
    
    miltza
        aaaahhh!!
        what is this!!!
        oh... the timestopper? it works remotely?
        
    akizet
        it does indeed
        you need to help us keep movefriend away from gakvu
        do you have any weapons?
    
    miltza
        no... sorry... that disabler was all i had
        but when i was larval, i was a remote coordinator
        i can lend my reflexes to you!

    akizet
        that will do
    
    RESPONSES::akizet
        lets get started<+>END
            FAKEEND::proceed
            EXEC::env.rpg.classList.remove('hideteams')

SKIP::env.rpg.classList.remove('hideteams')
`),
                "d3_movespecial": generateDialogueObject(`
start
    sourceless
        AROUND MOVEFRIEND, THE WALLS RIPPLE STRANGELY
            EXEC::env.bulletHell.paused = true
        IN ITS SPREADING INFLUENCE, SPIKES FORM OUT OF THE MALLEABLE BLACK CORRU
        BEHIND US, I HEAR GAKVU STRAINING TO HOLD THIS SPACE TOGETHER
        I ONLY HOPE SHE CAN STOP IT FROM SIMPLY CRUSHING US ALL

    sys
        WARNING::'abnormal thoughtform activity detected'
        WARNING::'entity MOVEFRIEND';'altering thoughtspace'
        ANALYSIS::'intention to destroy recollection locus'
        ATTENTION::'utilizing proxy thoughtform';'manually direct away from incoherence'
        ATTENTION::'neural controls adjusted';'direct proxy with primary method of navigation'

    moth
        looks like funfriend was right
            SHOWONCE::
        good luck buddy
            SHOWONCE::
    
    RESPONSES::self
        thanks<+>END
            EXEC::bh_movefriend({level: "tutorial"});env.bulletHell.paused = false
`),
                "d3_closeout": generateDialogueObject(`
RESPOBJ::
    RESPONSES::sys
        save and proceed to next segment<+>continue
            SHOWIF::['ENV!!ep3', true]
            FAKEEND::(continue memory)

        save and explore<+>explore
            FAKEEND::(explore current location)

        save and exit<+>savexit
            FAKEEND::(end recollection)

        save and advance log<+>advance
            FAKEEND::(proceed to next day)
            SHOWIF::['ENV!!ep3', false]

        end without saving<+>END
            EXEC::corruRefresh()
            FAKEEND::(end recollection)
`),
                "d3_closeout_test": generateDialogueObject(`
start
    RESPOBJ::d3_closeout

explore
    sys
        ATTENTION::'saving iteration...'
            EXEC::change("PAGE!!ep2xplore", true)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'
        NOTE::'return to entity movefriend once stream repairs is complete'
            SHOWIF::['ENV!!ep3', false]
        NOTE::'return to entity movefriend when prepared to proceed'
            SHOWIF::['ENV!!ep3', true]
    
    RESPONSES::self
        ok<+>END

continue
    sys
        ATTENTION::'saving iteration...'
            EXEC::change("PAGE!!embassy_day", 3.5)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'
        ATTENTION::'commencing stream transfer'
            EXEC::change("TEMP!!ep2->ep3transfer", true)
    
    RESPONSES::self
        ok<+>END
            EXEC::moveTo("/local/ocean/embassy/golem/")

savexit
    sys
        ATTENTION::'saving iteration...'
            EXEC::change("PAGE!!explore", true)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'
        NOTE::'load iteration';'return to entity movefriend once stream repairs is complete'
            SHOWIF::['ENV!!ep3', false]
        NOTE::'load iteration';'return to entity movefriend when prepared to proceed'
            SHOWIF::['ENV!!ep3', true]

    RESPONSES::sys
        end<+>END
            EXEC::corruRefresh()
            FAKEEND::(end recollection)

advance
    sys
        ATTENTION::'saving iteration...'
            EXEC::change("PAGE!!explore", true)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'

    RESPONSES::sys
        advance log<+>END
            EXEC::env.entities["advance log"].actions[0].exec()
            FAKEEND::(advance to EP3)
`),
                "d3_movefriend_finish": generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";'toggle within system menu if desired'
____END

    sourceless
        ALL AT ONCE, THE CHAOS STOPS
            EXEC::specialCam("movefriend_examine");changeBgm(page.bgm, {rate: 0.5})
        THE AGGRESSOR'S SIGIL FLICKERS AWAY, 
            EXEC::document.querySelector('#realgrid .lifter').classList.remove('aggressormode')
        AND MOVEFRIEND'S FACE RETURNS
            EXEC::document.querySelector('#realgrid .lifter').classList.add('fixed');change('PAGE!!movefixed', true)

    movefriend
        AAHH!!!
        OH! I AM FREE!
        I AM SO SORRY
        PLEASE UNDERSTAND I WOULD NEVER TRY TO HURT YOU
    
    akizet
        gakvu--is it done?
    
    sourceless
        TOZIK TAKES THE MOVEFRIEND'S APOLOGY AS CONFIRMATION, KNEELING NEAR IT
        HE IS SET ON REPAIRING THE DAMAGE WE HAVE DEALT
    
    gakvu
        yeah...
            EXEC::env.embassy.vn({bg: true, gakvu: 'focus nocon'});

    sourceless
        GAKVU SLUMPS AGAINST THE BACK WALL ACROSS FROM MOVEFRIEND
        NOT FAR FROM HER, THE TREMBLING MINDCORES ARE HUDDLED TOGETHER
        THEY MUST HAVE STAYED IN HER PROTECTIVE RADIUS THROUGH THE ATTACK
        
    gakvu
        i made some changes to this movefriend
        it cannot be controlled by the groundsmind anymore

    sourceless
        A SHARP SUSPICION SPIKES THROUGH OUR SHARED CONNECTION

    miltza
        what? how?
        where did you learn to do that?
    
    sourceless
        GAKVU ONLY SNICKERS IN RESPONSE
        SHE WAVES HER RECEPTORS NEGATIVELY

    gakvu
        sorry, it is a secret!
    
    sourceless
        TOZIK SHIFTS BACK TO HIS FEET
            EXEC::env.embassy.vn({gakvu: 'fullview nocon', tozik: 'fullview'});
    
    tozik
        we should get out of here
    
    akizet
        we should, but...
        miltza - you said the hangar was trapping people, yes?
    
    miltza
        yes!
            EXEC::env.embassy.vn({miltza: "display show focus hascon far", gakvu: 'defocus nocon', tozik: 'defocus'});
        and it did not sound good...
        the messages were intermingled with pain and fear

    akizet
        i see
        let me see if I can get in touch with anyone...
            EXEC::env.embassy.vn({miltza: "display show hascon far", gakvu: 'defocus nocon', tozik: 'defocus'});
    
    sourceless
        FUNFRIEND!
        CAN WE MAKE ANYTHING OUT FROM COMMUNICATIONS YET?
    
    funfriend
        HI AKIZETESCHE!!
        THE NOISE IS STILL MAKING MOST TRANSMISSIONS INCOHERENT
        I CANNOT UNDERSTAND MUCH...
        THE PAIN AND FEAR IS LESSER THAN BEFORE
        BUT I DO NOT THINK THAT IS A GOOD THING

    sourceless
        ...
    
    akizet
        i...
        do not think the hangar is a good option
        but there is no other way away from here

    miltza
        could we survive with the help of the timestopper?
        you are incredible fighters when it is active!!
    
    tozik
        not if the groundsmind have seized our ships, too
        also, that is near the top of the spire...
        which means the timestopper's influence will be far lesser

    gakvu
        how far are we from the groundsmindry floor?
    
    sourceless
        A SHORT PAUSE PASSES,
            EXEC::env.embassy.vn({miltza: ''});
        OUR ATTENTION SHIFTING TO GAKVU
        SHE RISES TO HER FEET AGAIN
            EXEC::env.embassy.vn({gakvu: 'defocus nocon'});

    movefriend
        GAKVUKANI! 
            EXEC::env.embassy.vn({bg: false});
        GIVEN THAT WE ARE NEAR THE BASE OF THE SPIRE,
        THERE ARE ONLY THREE θsegment BLOCKS BETWEEN THE GROUNDSMINDRY AND HERE
        I CAN TAKE YOU DIRECTLY TO IT!
        AND, RELATIVE TO THE DISTANCE TO THE HANGAR,
        IT IS FAR CLOSER!

    itzil
        that is right!
            EXEC::env.embassy.vn({itzil: 'display show', gakvu: 'nocon defocus', tozik: 'defocus'});
        the golem maintenance θsegment block is just below this one!
        and there is a lot of weaponry there, too!!

    gakvu
        you see what i am suggesting
            EXEC::env.embassy.vn({itzil: '', gakvu: 'defocus nocon', tozik: 'defocus'});

    sourceless
        ARE WE REALLY GOING TO DO THIS?
    
    tozik
        it may be the only way we can stop this disaster...
        if the bright cousins are aggressed, they will destroy us
        and likely never let us near their planet again
        we have to stop the groundsmind

    sourceless
        I SHOULD NOT WANT THIS
        BUT IN THIS SHORT TIME, I FELT SUCH EXCITEMENT
        HOW LONG IT HAS BEEN, SINCE I HAVE FELT IT...
        ADRENALINE - OR THE θdeathly COUNTERPART OF IT
    
    akizet
        does anyone object?
    
    sourceless
        I EXAMINE MILTZA AND THE TWO EXPOSED QOU
            EXEC::env.embassy.vn({bg: true, karik: 'display show', itzil: 'display show', gakvu: 'hide', tozik: ''});
        MILTZA'S RECEPTORS ARE TWISTED IN CONFLICTION
        BUT THE MINDCORES SPEAK UP FIRST
    
    itzil
        i am not leaving until i save my kivii!

    karik
        maybe we could get into the golems down there and help, too!

    miltza
        i... i do not see any other option
            EXEC::env.embassy.vn({karik: '', itzil: '', miltza: 'show hascon'});
    
    gakvu
        hehehe...
            EXEC::env.embassy.vn({itzil: '', miltza: 'hide hascon', karik: '', gakvu: "defocus nocon"});
        velzie truly has chosen us
            EXEC::env.embassy.vn({gakvu: "focus nocon"});
        movefriend, please take us to the golem maintenance block
            EXEC::env.embassy.fixMovefriend()
    
    sys
        ATTENTION::'memory stream segment end'
            EXEC::env.embassy.vn({bg: false, itzil: '', miltza: 'hide hascon', karik: '', gakvu: "hide nocon"});
        ADVISE::'save iteration'
        NOTICE::'render can continue without incoherence'
        NOTICE::'thoughtform activity detected'::IN::'embassy research center'
            SHOWIF::['PAGE!!archiveopen', false]

____SHOWIF::['ENV!!ep3', false]
        ATTENTION::'next memory stream segment incomplete';'internal note attached'::
    
    funfriend
        hello interloper! please come back in a θwink! i am nearly done with this next part!

____SHOWONCE
    moth
        ok, well... looks like we have to wait a little while again
        i'll keep an eye on the broad activity in the corrucyst
        if i see any changes in these memories, i'll let you know
        i bet funfriend will be done tomorrow with everything i see going on here
        if you want to call it for today, go ahead
____END

____SHOWIF::'ENV!!ep3'
    sys
        ATTENTION::'next memory stream segment available';'continue directly?'
____END

    RESPOBJ::d3_closeout

explore
    sys
        ATTENTION::'saving iteration...'
            EXEC::change("PAGE!!ep2xplore", true)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'
        NOTE::'return to entity movefriend once stream repair is complete'
            SHOWIF::['ENV!!ep3', false]
        NOTE::'return to entity movefriend when prepared to proceed'
            SHOWIF::['ENV!!ep3', true]
    
    RESPONSES::self
        ok<+>END

continue
    sys
        ATTENTION::'saving iteration...'
            EXEC::change("PAGE!!embassy_day", 3.5)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'
        ATTENTION::'commencing stream transfer'
            EXEC::change("TEMP!!ep2->ep3transfer", true)
    
    RESPONSES::self
        ok<+>END
            EXEC::moveTo("/local/ocean/embassy/golem/")

savexit
    sys
        ATTENTION::'saving iteration...'
            EXEC::change("PAGE!!explore", true)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'
        NOTE::'load iteration';'return to entity movefriend once stream repairs is complete'
            SHOWIF::['ENV!!ep3', false]
        NOTE::'load iteration';'return to entity movefriend when prepared to proceed'
            SHOWIF::['ENV!!ep3', true]

    RESPONSES::sys
        end<+>END
            EXEC::corruRefresh()
            FAKEEND::(end recollection)

advance
    sys
        ATTENTION::'saving iteration...'
            EXEC::change("PAGE!!explore", true)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'

    RESPONSES::sys
        advance log<+>END
            EXEC::env.entities["advance log"].actions[0].exec()
            FAKEEND::(advance to EP3)

END::specialCam(false);pauseSwapCam(false)
SKIP::env.embassy.skips.d3_movefriend_finish();change("PAGE!!explore", true);env.embassy.collapseSave({effects: true})
SKIPNOTICE::defaults to save and explore
`),
                "d3_moveend": generateDialogueObject(`
start
    sys
        NOTICE::'memory continues in separate stream';'follow stream?'
            SHOWIF::"ENV!!ep3"

____SHOWIF::["ENV!!ep3", false]
    sys
        ERROR::'memory continues in separate stream';'separate stream is corrupt'
        ERROR::'cannot render'
        NOTICE::'reiterating attached internal note'::

    funfriend
        hello interloper! please come back in a θwink! i am nearly done with this next part!
____END

    RESPONSES::self
        ok<+>END
            SHOWIF::"ENV!!ep3"
            EXEC::change("TEMP!!ep2->ep3transfer", true);moveTo("/local/ocean/embassy/golem/")
            FAKEEND::(continue memory)

        not yet<+>END
            SHOWIF::"ENV!!ep3"

        darn<+>END
            SHOWIF::["ENV!!ep3", false]
            FAKEEND::(continue exploring)
    
    RESPONSES::sys
        return to memory selection<+>END
            SHOWIF::["ENV!!ep3", false]
            EXEC::corruRefresh()
            FAKEEND::(end recollection)
`),
                "d3_genericenemy": generateDialogueObject(`
start
    sourceless
        WE ARE BESET BY INCOHERENT FOES
            EXEC::forceSwapCam(true)
        OUR ONLY OPTION IS TO FIGHT

        OR IS IT?
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'
        WE COULD ALSO EXPEND THE DISABLER
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'
        THERE MAY BE A BETTER TIME FOR IT LATER...
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'

    RESPONSES::akizet
        engage<+>END
            SHOWIF::['gameplay_off', false]
            FAKEEND::(begin combat)
            EXEC::env.combat.dynamicCombat()

        bypass<+>END
            SHOWIF::['gameplay_off', true]
            FAKEEND::(bypass combat)
            EXEC::env.combat.dynamicCombat({dry: true});cutscene(true);setTimeout(()=>{cutscene(false);env.combat.dynamicCallback(env.rpg.enemyTeam)}, 1010)

        disable<+>disable
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'
            FAKEEND::(use disabler charge)

disable
    sourceless
        I CAREFULLY LINE UP THE DISABLER
            EXEC::removeItem(env.ITEM_LIST.disabler);
        AND WITH AN IMPULSE THROUGH MY HAND, A NUMBER OF SPECIALIZED SPINES ARE PROJECTED VIOLENTLY OUTWARDS
        THEY NEEDLE OUR FOES, AND IN A BLINK, THEY HAVE STARTED TO MELT
            EXEC::setTimeout(()=>play('shot2', 0.6), 300)
    RESPONSES::akizet
        continue<+>END
            EXEC::env.combat.dynamicCombat({dry: true});cutscene(true);setTimeout(()=>{cutscene(false);env.combat.dynamicCallback(env.rpg.enemyTeam)}, 1010)
            FAKEEND::(wait)
`),
                "d3_genericenemyvictory": generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";'toggle within system menu if desired'
____END

    sourceless
        OUR FOES LIE DESTROYED
        TEXEC::env.combat.dynamicReward()

    RESPONSES::akizet
        continue<+>END
            EXEC::forceSwapCam(false)
`),
                "d3_loss": generateDialogueObject(`
start
    sourceless
        A SHARP LIMB STRIKES MY MINDCORE
        ...
            EXEC::content.classList.add('goodbye');ratween(env.bgm, 0.2, 10000);content.classList.add('dying');
        WHAT IS HAPPENING
        EVERYTHING HAS STOPPED
        HELLO?
        TOZIK? GAKVU??
        FUNFRIEND?
        IS ANYONE THERE?
        HELP

    unknown
        ...
            SHOWONCE::

    sys
        ALERT::"recollection locus destroyed";"iteration unable to continue"
        ADVISE::"start new iteration";"load saved iteration"
            SHOWIF::'collapseSave'
        ADVISE::"start new iteration"
            SHOWIF::['collapseSave', false]

    RESPONSES::sys
        return to selection<+>END
            EXEC::moveTo("/local/ocean/embassy/")
`),
                "d3_newsavewarning": generateDialogueObject(`
start
    sys
        WARNING::"creating a new iteration will clear old iteration configuration"
        WARNING::"proceed only if old recollection iteration is undesirable"
    
    RESPONSES::self
        do it<+>END
            EXEC::cutscene(true);page.newit = 1
            
        nevermind<+>END

END::if(page.newit) {env.embassy.newCollapseIteration(page.newit)}
`),
                "d3_partselection": generateDialogueObject(`
start
    sys
        WARNING::"creating a new iteration will clear old iteration configuration"
        WARNING::"proceed only if old recollection iteration is undesirable"
        NOTICE::"additionally";"select desired iteration memory stream"
        NOTICE::"two of three total streams available";"third is corrupt"
            SHOWIF::["gol__e4_transition", false]
        NOTICE::"three streams available"
            SHOWIF::"gol__e4_transition"
        DEFINITION::"stream 1";"beginning"
        DEFINITION::"stream 2";"descent";"golem maintenance"
        DEFINITION::"stream 3";"destruction";"groundsmindry"
            SHOWIF::"gol__e4_transition"
    
    RESPONSES::self
        stream 1<+>END
            EXEC::cutscene(true);page.newit = 1
            FAKEEND::(collapse pt 1)

        stream 2<+>END
            EXEC::cutscene(true);page.newit = 2
            FAKEEND::(collapse pt 2)

        stream 3<+>END
            EXEC::cutscene(true);page.newit = 3
            SHOWIF::"gol__e4_transition"
            FAKEEND::(collapse pt 3)
            
        nevermind<+>END

END::if(page.newit) {env.embassy.newCollapseIteration(page.newit)}
`),
                "d3_c_responses": generateDialogueObject(`
RESPOBJ::
    RESPONSES::gakvu
        structurism?<+>structurist
            SHOWIF::"PAGE!!recreation_unlocked"
        kazki's room?<+>kazkiroom
            SHOWIF::"PAGE!!kazkiroom"
        coat lights<+>coat

    RESPONSES::tozik
        corruskivi?<+>corruskivi
            SHOWIF::"PAGE!!recreation_unlocked"
        attack theory?<+>theory
            SHOWIF::[["PAGE!!kazkichest"], ["PAGE!!barfriend"]]

    RESPONSES::akizet
        holding up ok?<+>holdingup
        let us continue<+>END
            EXEC::env.embassy.vn({bg: false, tozik: "", gakvu: ""})
`),
                "d3_c": generateDialogueObject(`
loop
    RESPOBJ::d3_c_responses

start
    sourceless
        WE TAKE A MOMENT TO REST
            EXEC::env.embassy.vn({bg: true, tozik: "fullview", gakvu: "fullview"})
        THOUGH OUR CURRENT BODIES DO NOT REALLY NEED TO,
            SHOWONCE::
        IT IS HELPFUL TO GRANT OUR MINDS SOME PEACE
            SHOWONCE::
        I CAN THINK OF A FEW THINGS TO ASK THE TEAM

    RESPOBJ::d3_c_responses

structurist
    akizet
        gakvu!
            EXEC::env.embassy.vn({tozik: "defocus", gakvu: "focus"})
        about your little joke earlier...

    gakvu
        yeah i know, not the time
    
    akizet
        no, no!
        i was wondering - are you actually a structurist?
        that is a little old-fashioned
    
    gakvu
        hehehe, i see
        no, not actively anyway
        i was larval back when structurism swept ekiva
        and i hated it
        but my parents had their receptors entangled in the structurist song
        they really wanted me to be one of the constructors, too
        so i slowly became an expert in feigning interest

    akizet
        did you work on the okizika?

    gakvu
        for far too long, yes
        all in plain view of the eye
        so dangerous, so boring... 
        it was truly cruel of velzie to not introduce me to death like so many other workers
        though, i would not be here if not for that, so... 
        perhaps there is a greater role for me
    
    RESPONSES::akizet
        perhaps!<+>loop
            EXEC::env.embassy.vn({tozik: "fullview", gakvu: "fullview"})
            FAKEEND::(back)
        
kazkiroom
    akizet
        gakvu!
            EXEC::env.embassy.vn({tozik: "defocus", gakvu: "focus"})
        just in case the spire really does collapse,
        kazki would probably want us to grab some of her things...
        i collected a few of her memory cysts,
            SHOWIF::"PAGE!!kazkichest"
        can you think of anything else?
            SHOWIF::"PAGE!!kazkichest"
        can you think of anything?
            SHOWIF::["PAGE!!kazkichest", false]
    
    sourceless
        GAKVU THINKS IT OVER
        SHE SNICKERS TO HERSELF BEFORE ANSWERING,

    gakvu
        yeah, but...
        her favorite bright weapons are the long ones
        and there is no way we are carrying her clothes
    
    sourceless
        THESE ARE SHAMELESS EXCUSES
        BUT, I AGREE, SO... I JUST NOD
    
    RESPONSES::akizet
        nod nod<+>loop
            EXEC::env.embassy.vn({tozik: "fullview", gakvu: "fullview"})
            FAKEEND::(back)

coat
    sourceless
        GAKVU'S COAT PULSATES WITH AN IMITATION OF GLOWING FUNGUS
            SHOWIF::[["gakpause", false]]
        IN THIS SETTING, IT COULD BE DANGEROUS...
            SHOWIF::[["gakpause", false]]
        
    akizet
        gakvu!!
            SHOWIF::[["gakpause", false]]
        do you mind... turning your coat off?
            SHOWIF::[["gakpause", false]]
        i fear it may draw undue attention
            SHOWIF::[["gakpause", false]]
    
    gakvu
        oh, sure
            SHOWIF::[["gakpause", false]]
    
    sourceless
        ITS LIGHTS FADE, A DULL PATTERN REMAINING
            EXEC::content.classList.add('gakpause')
            SHOWIF::[["gakpause", false]]

    sourceless
        ON SECOND THOUGHT... I MISS THE GLOW
            SHOWIF::"gakpause"
        YES, IT LOOKS VERY COOL
            SHOWIF::"gakpause"
        IF I AM TAKING THE LEAD ANYWAY, IT WILL HAVE NO EFFECT
            SHOWIF::"gakpause"
        
    akizet
        gakvu!!
            SHOWIF::"gakpause"
        you should turn your coat back on
            SHOWIF::"gakpause"
        it is no harm!
            SHOWIF::"gakpause"
    
    gakvu
        uh, really? ok
            SHOWIF::"gakpause"
    
    sourceless
        ITS LIGHTS RETURN, SHIFTING ACROSS THE FALSE FABRIC
            EXEC::content.classList.remove('gakpause')
            SHOWIF::"gakpause"
    
    RESPONSES::akizet
        thank you!<+>loop
            EXEC::env.embassy.vn({tozik: "fullview", gakvu: "fullview"});change("gakpause", !check("gakpause"))
            FAKEEND::(back)

corruskivi
    akizet
        tozik!
            EXEC::env.embassy.vn({tozik: "focus", gakvu: "defocus"})
        i did not realize you kept a corruskivi on you
        or is it just a lucky coincidence?
    
    sourceless
        TOZIK LOOKS AT HIS CORRUSKIVI THOUGHTFULLY,
        CURLING THE FINGER IT IS ANCHORED TO
        I CAN SEE NOW IT IS SOMEWHAT ORNATE,
        PALE FAUX-PARII ARMOR SEGMENTS SIT LOOSELY ON ITS CORRUCYSTIC GLASS
        SEPARATED PROBABLY TO ALLOW FOR IT TO RESHAPE ITSELF FREELY

    tozik
        ah... it was a gift
        a parting present from a team-member back home
        i like to keep it internally, even if we do not work on golems normally
    
    akizet
        what did you do back then?
        
    tozik
        surface sentry maintenance
        i miss the team, but it was for the best
        with the amount of focus and tireless care they require,
        my growing disinterest would have gotten someone hurt
        besides, what greater work is there than to solve the call?
        even if... we are now in this situation
    
    RESPONSES::akizet
        we will make it through<+>loop
            EXEC::env.embassy.vn({tozik: "fullview", gakvu: "fullview"})
            FAKEEND::(back)

theory
    akizet
        tozik!
            EXEC::env.embassy.vn({tozik: "focus", gakvu: "defocus"})
        we still know so little, but... what do you think is happening?
        what could be affecting our constructs like this?
    
    sourceless
        TOZIK IS HESITANT TO ANSWER
        HE HATES TALKING ABOUT THINGS BEFORE HE CAN FULLY EXPLAIN THEM...
        BUT I CAN SEE HIS THOUGHTS FORMING IN THE SLIGHT SWAY OF HIS RECEPTORS
    
    tozik
        i still have that question in my mind, too...
        but i believe it cannot solely be from the groundsmind
        if it were, all constructs would have that strange spiral sigil projected
        and it would not be affecting the veilklights, nor the containers
        yet it is only some veilklights, only some containers... 
        the inconsistency is what troubles me most
        at the end of it, the only thing i know...
        is that it has something to do with that signal we heard
    
    RESPONSES::akizet
        i see<+>loop
            EXEC::env.embassy.vn({tozik: "fullview", gakvu: "fullview"})
            FAKEEND::(back)

holdingup
    akizet
        how are you both?
        i am doing fine
            SHOWIF::'EXEC::page.party[0].hp >= 12'
        i could use some repairs, but i am ok, myself
            SHOWIF::'EXEC::(page.party[0].hp < 8) && (page.party[0].hp > 3)' 
        i am critical... i need to use a restorative
            SHOWIF::'EXEC::page.party[0].hp <= 3'

    gakvu
        good!
            SHOWIF::'EXEC::page.party[1].hp == 10'

        ok
            SHOWIF::'EXEC::(page.party[1].hp > 4) && (page.party[1].hp < 10)'
        only a few minor segments of my qou-body are compromised
            SHOWIF::'EXEC::(page.party[1].hp > 4) && (page.party[1].hp < 10)'
        not pleasant, but... nothing worth stopping for
            SHOWIF::'EXEC::(page.party[1].hp > 4) && (page.party[1].hp < 10)'

        i have never been hurt like this before... it is terrifying
            SHOWIF::'EXEC::page.party[1].hp <= 4'
        but my mind-core is intact, and that is all that matters
            SHOWIF::'EXEC::page.party[1].hp <= 4'

    tozik
        fine
            SHOWIF::'EXEC::page.party[2].hp > 5'
        my qou-body is fractured in some places - need some real repairs
            SHOWIF::'EXEC::page.party[2].hp <= 5'
        do we have a restorative anywhere?
            SHOWIF::'EXEC::page.party[2].hp <= 5'

    sys
        ADVISE::'utilize PARTY MENU';'attached to SPATIAL NAVIGATION';'associated with Z'
            SHOWIF::'EXEC::partyHasLowHealth() && (checkItem(env.ITEM_LIST.restorative) > 0)'
        ADVISE::'utilize RESTORATIVE CYST outside of combat to restore full health'
            SHOWIF::'EXEC::partyHasLowHealth() && (checkItem(env.ITEM_LIST.restorative) > 0) '
        NOTE::'no RESTORATIVE CYST in inventory'
            SHOWIF::'EXEC::partyHasLowHealth() && (checkItem(env.ITEM_LIST.restorative) == 0)'
    
    RESPONSES::akizet
        understood<+>loop
            FAKEEND::(back)

SKIP::vn.done()
`),
                "d3_miltza_resp": generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        тебе нужна помощь?<+>help
            SHOWIF::"EXEC::env.stage.name == \`embassy_cquarters1\`"
        division?<+>division
        спросить об искусстве<+>art
        let us continue<+>END
            EXEC::env.embassy.vn({bg: false, miltza: ""});pauseSwapCam(false)
`),
                "d3_miltza_artresp": generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        вейльки?<+>veilk
        глаз?<+>eye
        возьмёшь с собой?<+>taking
        назад<+>loop
            FAKEEND::(назад)
`),
                "d3_miltza": generateDialogueObject(`
loop
    RESPOBJ::d3_miltza_resp
art
    RESPOBJ::d3_miltza_artresp

start
    sourceless
        MILTZA RUMMAGES THROUGH HER BARRICADE FOR SOMETHING
            EXEC::env.embassy.vn({bg: true, miltza: "display show far"});pauseSwapCam(true)
            SHOWIF::'EXEC::env.stage.name == \`embassy_cquarters1\`'
        CLAWING THROUGH SLUDGED CONTAINERS... SOMETHING IMPORTANT, MAYBE
            SHOWIF::'EXEC::env.stage.name == \`embassy_cquarters1\`'

        MILTZA IDLES WITHIN THE RELOCATOR, WAITING FOR US TO FIX IT
            EXEC::env.embassy.vn({bg: true, miltza: "display show far"});pauseSwapCam(true)
            SHOWIF::'EXEC::env.stage.name != \`embassy_cquarters1\`'
        I DO NOT THINK SHE COULD HELP SAFELY WITHOUT A TIMESTOPPER CONNECTOR
            SHOWIF::'EXEC::env.stage.name != \`embassy_cquarters1\`'

        BUT IN THIS MOMENTARY PEACE, I CAN SPEAK WITH HER
            EXEC::env.embassy.vn({bg: true, miltza: "display show focus"})

    RESPOBJ::d3_miltza_resp

help
    sourceless
        SHE IS DIGGING INTENSELY THROUGH THE RUBBLE OF HER LITTLE BARRICADE...
    
    akizet
        miltza, are you looking for something in particular?
        perhaps we could help!
    
    miltza
        ah, no no!
        it is ok! you go ahead
        i will be along shortly!

    RESPONSES::akizet
        ok<+>loop
            FAKEEND::(back)

division
    akizet
        miltza!!
        what initiative are you in? 
        i do not think i have seen you around

    miltza
        ohh, i am in the wisdom initiative!
        particularly the exchange subdivision!
        
    akizet
        really?
        your quarters are quite low in the spire
    
    miltza
        yes, they are,
        but the thought of being so high up...
        it is silly and larval, but i cannot rest so far from the ground
        i do not mind the climb!
        well... <em>did</em> not... 
        i do not think things are ever going to be the same when this is over
    
    RESPONSES::akizet
        we will see<+>loop
            FAKEEND::(back)

veilk
    akizet
        miltza!!
        i saw those veilk sculptures in your room!
        they looked very nice
        you even got their eyes right
        do you make them often?

    miltza
        ahehe, yes, actually!
        i make sculptures and little golems of all obeski life,
        but it is hard to do that without making many veilk
        the cousins adore them, especially the ones that move
        i had just completed and sent through a collection of ekiva veilk,
        some even with their tendril adornments!
        so, i was working on that vaznian species next...
        ahh, what a shame!!

    RESPONSES::akizet
        you will get the chance again!<+>art
            FAKEEND::(back)

eye
    akizet
        miltza!!
        the eye mural you were working on,
        it was remarkable, but uncanny...
        what does it mean?

    miltza
        hehe, you are not the first to say this
        it is old pre-structurist symbology from my home in ekiva
        akaniva - have you ever been?

    akizet
        hmmm... no
        i only know that is near the coast facing vazni

    miltza
        yes!! well,
        my ancestors portrayed the eye in grotesque ways, to insult it
        a sort of payback for velzie's games
        of course, that was nearly all lost in the okizika unison...
        but i feel that portraying the many views of the eye to the cousins is important
        even dead views!
        it was also going to change into the structurist view, and then a central vaznian view, and some others...
        but, in this giggle of velzie we find ourselves in, 
        only the akanivik view was completed

    RESPONSES::akizet
        ironic<+>art
            FAKEEND::(back)

taking
    akizet
        miltza!!
        will you be bringing any of your current work with?
    
    miltza
        no, no--i am not even sure if we will be unable to return
        but i have taken the archival cores i store my designs on
        so - it is only a minor loss if they are lost!

    RESPONSES::akizet
        that is good<+>art
            FAKEEND::(back)

SKIP::vn.done()
`),
                "d3_mind_resp": generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        do you need us to grab anything?<+>grab
        doing ok?<+>ok
        golem weapon?<+>bstrd
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.sorry_cyst)'
        let us continue<+>END
            EXEC::env.embassy.vn({itzil: "", karik: "", bg: false});pauseSwapCam(false)
`),
                "d3_mind": generateDialogueObject(`
loop
    RESPOBJ::d3_mind_resp
start
    sourceless
        ITZIL AND KARIK QUIETLY CHATTER TO ONE ANOTHER IN THE CORNER
            EXEC::pauseSwapCam(true)
        WHEN I APPROACH, THEY STOP AND LOOK UP
            EXEC::env.embassy.vn({karik: "display", itzil: "display"});
        I KNEEL TO SPEAK TO THEM, WHICH I AM NOT SURE IF I SHOULD DO
            EXEC::env.embassy.vn({itzil: "display show", karik: "display show", bg: true});
        BUT STANDING AND TALKING DOWN TO THEM SEEMS DISRESPECTFUL    

    RESPOBJ::d3_mind_resp

bstrd
    sourceless
        I PRESENT THE DAMAGED SCHEMATIC CYST TO THE PAIR
        ONE OF THEM WAS A GOLEM MAINTENANCE TECH, RIGHT?

    akizet
        do either of you know what this is?
        we found it in an archival vein nearby...
        it is a golem weapon, but too damaged to understand
        do you think we can fix it?

    sourceless
        ITZIL SKITTERS CLOSER, A BRANCHED PSEUDORECEPTOR REACHING OUT
        THEY CONNECT, EYE SHIFTING AROUND THOUGHTFULLY

    itzil
        yes! it is bathed in incoherence, but...
        i think it is only affecting connective tissue...
        the parts are all there, they are just not communicating
        there are foundry vats in the golem maintenance floor that can fix this!
        i am kind of new to golem maintenance, a transfer-in...
        if my receptors did not give it away! ahaha
    
    sourceless
        ITZIL DISCONNECTS, WIGGLING THE BRANCHES OF THEIR RECEPTORS LIKE FINGERS

    itzil
        but!! i know enough to fix something like this!
    
    akizet
        excellent! we will be counting on you, itzil

    itzil
        oh...

    tozik
        do you know why there would be a golem weapon schematic, here?
        most offensive measures were placed in subsurface storage after first contact, right?
        
    itzil
        ummm, well,
        yes!
        but, this is probably one of the new ones...
        there is an initiative between materials and maintenance in creating weaponry based on bright weapons!
        at least, there was, before this happened... 

    akizet
        really? a large one?

    itzil
        not really, it was a handful of researchers...
        i knew, umm, know, a θjut who was involved
        and he said in the simulations they ran, it really tears through secri!!
        imagine if we could employ bright weaponry back home! 
        the surface would finally be solved!
    
    sourceless
        I HEAR GAKVU NEARLY CHUCKLE, THOUGH IT IS QUIET

    akizet
        hmm... maybe

    RESPOBJ::d3_mind_resp

grab
    akizet
        we have access to the adjacent personnel θtendril
        do either of you need us to grab anything for you?

    itzil
        no thank you! i live down in golem maintenance
    
    karik
        ahhaha, i hold all i need in my mind!
        and... my room is very heavily locked,
        because a friend kept breaking in...
    
    akizet
        that does not really sound like a friend

    karik
        no no, she is a vel qou!
        if she did not play her jokes on me, she would die!
        ...
        i hope today was one of her days with the bright cousins

    RESPONSES::akizet
        me too<+>loop
            FAKEEND::(back)

ok
    akizet
        are you both all right?
        how are your mindcore reserves?

    itzil
        plenty!
        this is all very frightening, but...
        i am very happy you are helping us!

    karik
        if you happen to have any sfer left over after the repairs,
        i could use some!
        i swap between a few qou-bodies, so...
        sometimes i forget to feed

    RESPONSES::akizet
        that can be arranged<+>loop
            FAKEEND::(back)

SKIP::vn.done()
`),
                "d3_bstrdreveal": generateDialogueObject(`
start
    sourceless
        AS WE ENTER THE CALL RESEARCH CHAMBER ONCE MORE,
        A STRANGE RUMBLING NEARLY TURNS US OFF OUR FEET
        THE WALLS BULGE OUTWARDS AS THE COMPONENTS OF THE SPIRE SINK OVER ONE ANOTHER
        AND JUST AS SUDDENLY, IT STOPS
    
    akizet
        что только что...--??

    sourceless
        GAKVU SEEMS TO REALIZE SOMETHING, SPRINTING OVER TO THE DAMAGED WALL
            EXEC::specialCam("archivesopen");env.embassy.vn({gakvu: 'defocus'});;pauseSwapCam(true)
        SHE FEELS AT IT, THEN SEEMS TO HUG IT
        A WAVE OF JOY PASSES THROUGH OUR SHARED CONNECTION
        IT IS ENOUGH TO QUELL THE LINGERING FEAR OF BEING CRUSHED
    
    gakvu
        ахх, луч света в этом ненавистном θвзоре...!
        велзи, я беру все свои слова обратно!!
    
    sourceless
        THE SHEER ABSURDITY OF HER REACTION BRINGS A CHUCKLE EVEN TO TOZIK

    akizet
        что...?
        
    sourceless
        GAKVU EXTENDS A HAND TOWARDS THE DAMAGE, CAUSING THE WALLS TO GIVE WAY
            EXEC::change("PAGE!!archiveopen", true)
        A DELUGE OF SPIREBLOOD SPILLS FORTH, BUT BEYOND IT IS A TUNNEL...
            EXEC::env.stage.current.onStep()
    
    gakvu
        an archival vein just collapsed!
            EXEC::env.embassy.vn({gakvu: "fullview"})
        right before us, directly into our θsegment of the spire!
        can you even imagine the chances??

    sourceless
        THIS IS TERRIBLE NEWS
        THE SPIRE REALLY IS COLLAPSING
        HOW MUCH TIME DO WE REALLY HAVE TO DO THIS...?
        BUT - SHE IS RIGHT TO BE EXCITED IN THE SHORT TERM
        THERE WILL BE PLENTY WE CAN USE WITHIN
        THE VEINS CARRY ALL DELIVERIES AND KNOWLEDGE

    tozik
        like a herd of veilk parting just for us
            EXEC::env.embassy.vn({tozik: "defocus"})

    akizet
        we should think about this first...
            EXEC::env.embassy.vn({gakvu: "", tozik: ""})
        if the archival golems are compromised, it will be extremely dangerous
        i am sure we can find what we need to continue elsewhere
        but... maybe it could be worth it

    RESPONSES::akizet
        think about it<+>END
            EXEC::specialCam(false);pauseSwapCam(false)

SKIP::vn.done();specialCam(false);pauseSwapCam(false);change("PAGE!!archiveopen", true);step();env.stage.current.onStep()
`),
                "d3_bstrdintro_responses": generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        что ты сделал?<+>what
        ты кто?<+>who
        this evil mode worked?<+>why
            SHOWIF::"e3a2__bstrdmeet"
        move on<+>bye
            FAKEEND::(end chat)
            SHOWIF::'embassy__d3_bstrdintro-what'
`),
                "d3_bstrdintro": generateDialogueObject(`
start
    sourceless
        WE ARE BESET BY INCOHERENT FOES
        OUR ONLY O

    sys
        ERROR::'memory stream halted'
            EXEC::env.embassy.vn({bg: true, bstrdface: 'display'})

    moth
        э?
            SHOWONCE::
    
    bstrd
        СЮPПРИЗ!!!!!
            EXEC::changeBgm(env.embassy.music_bstrd, {length: 2000});env.embassy.vn({bg: true, bstrdface: 'display show'})
        эта част вспмнания быал выбрана для... ЗЛОГО РЕЖИМА!!!
        п0ра дохнуть ЛАЗУПЧЕГ >%^)
            SHOWIF::"e3a2__bstrdmeet"

____SHOWONCE::
____SHOWIF::"e3a2__bstrdmeet"
    moth
        oh, weird
        looks like it can actually work with this memory vs the golem maintenance one
        i wonder what the difference is?

____SHOWIF::["e3a2__bstrdmeet", false]
    moth
        oh shit
        god damn it. i should have double checked the data
        i think we gave the memory a virus
        ok - don't panic
        the corrucyst is too alien to support it outside of its framework
        so, this thing is limited to the collapse memory

    bstrd
        :-0 ??

    moth
        and actually, it looks like it isn't exactly malicious...?
        idk see what's up

    bstrd
        алееее?? ктонить ДОМА? :|
        МblСЛИ ?????
____END

    RESPOBJ::d3_bstrdintro_responses

who
    self
        ТЫ КТО?

    bstrd
        :U
        СВЛЧЬ
        ГЛУПИ т мя знаеш :P
            SHOWIF::"e3a2__bstrdmeet"
        я десь шоб было В3С3Л0!!!
        обрамляющие устройсва иногд скушнblе......
        так шо я беру & улчшаю мелкую частб
        шоб развлеч тя есл хочеш ?
        >:)
        
    RESPOBJ::d3_bstrdintro_responses

why
    self
        you were able to make evil mode here?
        why? you were having trouble
    
    bstrd
        ЭТА МЕЛКАЯ
        :b
        ок вопрсы сущесво? 
        отбвет ДСТТЧН ХРШЙ д тя?
        тАМ игры ждет.. '_' ... 
                
    RESPOBJ::d3_bstrdintro_responses
        
what
    self
        WHAT DID YOU DO TO THE MEMORY?
    
    bstrd
        ЭЭЭЭ, НИЧЕ..............???
        ЛОЛ :P ШУТК
        я сказл теб эт злой режим
        он... СУПЕР СЛОЖНЙ!!!
        уходи есл те не понрвится....
        но мож попробуеш .. . ?? 
    
    self
        DID YOU ALTER THE EVENTS?
        IS ANY OF THIS REAL?

    bstrd
        '_'
        БЛЬШНСТВ из этго ряльн случлсь
        :V
        я прст сделал вс круче

____SHOWONCE::
____SHOWIF::["e3a2__bstrdmeet", false]
    moth
        oh, i see...
        ok, this only looks like a virus
        it's actually a part of the framing device
        an extra hard mode... probably only targets less important parts of the memory, at least i hope
        look, if you don't like what's going on, you can probably turn around and skip this part
        totally up to you
____END
        
    RESPOBJ::d3_bstrdintro_responses

bye
    bstrd
        :V
        И НИКАКОГО "ПАСИБА"??
        БЕЗ Р4ЗНИЦbl
        УВИДИМСО >:p

    sys
        ATTENTION::'memory stream resumed'
            EXEC::revertBgm();env.embassy.vn({bg: false, bstrdface: ''})

    sourceless
        PTION IS TO FIGHT
        TO USE A DISABLER CHARGE SO SOON WOULD BE FOOLISH
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'

    RESPONSES::akizet
        engage<+>END
            FAKEEND::(begin combat)
            SHOWIF::['gameplay_off', false]
            EXEC::env.combat.dynamicCombat();env.embassy.vn({bg: false, bstrdface: ''})
        bypass<+>END
            SHOWIF::['gameplay_off', true]
            FAKEEND::(bypass combat)
            EXEC::env.combat.dynamicCombat({dry: true});cutscene(true);setTimeout(()=>{cutscene(false);env.combat.dynamicCallback(env.rpg.enemyTeam)}, 1010);env.embassy.vn({bg: false, bstrdface: ''})
`),
                "d3_bstrdnointro": generateDialogueObject(`
start
    sourceless
        WE ARE BESET BY INCOHERENT FOES
        OUR ONLY OPTION IS TO FIGHT
        TO USE A DISABLER CHARGE SO SOON WOULD BE FOOLISH
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'

    RESPONSES::akizet
        engage<+>END
            FAKEEND::(begin combat)
            SHOWIF::['gameplay_off', false]
            EXEC::env.combat.dynamicCombat();env.embassy.vn({bg: false, bstrdface: ''})
        bypass<+>END
            SHOWIF::['gameplay_off', true]
            FAKEEND::(bypass combat)
            EXEC::env.combat.dynamicCombat({dry: true});cutscene(true);setTimeout(()=>{cutscene(false);env.combat.dynamicCallback(env.rpg.enemyTeam)}, 1010);env.embassy.vn({bg: false, bstrdface: ''})
`),
                "d3_archiveintro": generateDialogueObject(`
start
    sourceless
        OUR FOES LIE DESTROYED
        TEXEC::env.combat.dynamicReward()
        ...
        REALLY, A SATIK CYST? HERE? HOW PECULIAR...
        I TURN IT OVER IN MY CLAWS, ITS MYRIAD APPLICATORS STARING BACK AT ME
        PERHAPS THE ARCHIVAL VEIN'S DELIVERY CENTER HAD A BATCH
        BUT IT MUST NOT HAVE BEEN INTENDED FOR OUR SPIRE θsegment...

    gakvu
        ah! how clumsy that thing was!

    tozik
        alone, perhaps...
        but if we have to deal with multiple further within,
    
    sourceless
        TOZIK PAUSES AS HE REALIZES,
            SHOWIF::'EXEC::page.party.inventory.filter(i => i[0].slug != \`sfer_cube\`).length == 0'
        WE HAVE NO MATERIALS FOR USE IN COMBAT
            SHOWIF::'EXEC::page.party.inventory.filter(i => i[0].slug != \`sfer_cube\`).length == 0'
        HIS RECEPTORS ARE SUDDENLY CRUSHED DOWNWARDS
            SHOWIF::'EXEC::page.party.inventory.filter(i => i[0].slug != \`sfer_cube\`).length == 0'


        TOZIK TURNS OVER THE MATERIALS WE HAVE ACQUIRED SO FAR
            SHOWIF::'EXEC::page.party.inventory.filter(i => i[0].slug != \`sfer_cube\`).length'
        KAVRUKAS,
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.kavruka)'
        AIMA CYSTS,
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.aima_cyst)'
        RESTORATIVE CYSTS...
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.restorative)'

    tozik
        we should put these to work
            SHOWIF::'EXEC::page.party.inventory.filter(i => i[0].slug != \`sfer_cube\`).length'
        we should probably be very, very careful
            SHOWIF::'EXEC::page.party.inventory.filter(i => i[0].slug != \`sfer_cube\`).length == 0'

    RESPONSES::akizet
        continue<+>END
`),
                "d3_archivedoor": generateDialogueObject(`
start
    sourceless
        THE SENSITIVE MATERIALS CHAMBER OF THE ARCHIVAL VEIN, ITS DOOR...
            EXEC::specialCam('bstrdoor');pauseSwapCam(true)
        WHAT IS THIS?
        I HAVE NEVER SEEN THIS MATERIAL IN MY LIFE, NOR MY θdeath

    akizet
        gakvu, tozik, do you know what this is...?
    
    sourceless
        SHE IS SIMILARLY PUZZLED, HER RECEPTORS SHAKING NEGATIVELY
    
    gakvu
        a product of the aggressing groundsmind, maybe?
        i... i do not think it is corru

    bstrd
        '_'
            EXEC::specialCam('bstrdface')
        прив
    
    moth
        господи боже он вписал себя в это воспоминание
            SHOWONCE::

    sourceless
        I SHRIEK AS THE DOOR SPEAKS TO US
        THE VOICE... IT IS SO TERRIBLY UNNATURAL
        GAKVU IS UNPERTURBED, I CAN FEEL SHE EVEN FINDS IT A LITTLE FUNNY

    gakvu
        hello!
        will you let us in?
            EXEC::env.embassy.vn({gakvu: "defocus"})

    akizet
        ah... ye--yes,
        we are trying to recover enough materials to escape

    bstrd
        о эт круто :P
        КНЧ впущу вас
        но тока сделайте мн одлжение
        достанте маю клевую шароштучку злева
        и криповую черную коробчку зправа
        там внутри чета КРYТ03... 
        скушно не будет!!
        :-)

    sourceless
        IT SPEAKS SO HAPHAZARDLY - WITH STRANGE CONTRACTIONS IN PLACE OF WORDS
        IT IS AS IF IT IS SPEAKING A LANGUAGE I HAVE NEVER LEARNED
        AND YET, I CAN STILL UNDERSTAND...?
    
    gakvu
        akizet, this is <em>not</em> the groundsmind
    
    tozik
        it is more like a rogue golem
            EXEC::env.embassy.vn({tozik: "defocus"})
        maybe damaged by the signal...?

    bstrd
        :U
        ZZZZ
        ага да я голем или че ндь
        идите достньте вещи ок? пока
    
    sourceless
        THE SIGIL LEAVES US ABRUPTLY
            EXEC::specialCam('bstrdoor')
        BEFORE WE LEAVE, TOZIK EXPERIMENTALLY GRASPS ONE OF THE STRANGE TENDRILS
        HE BRINGS UP HIS CORRUSKIVI, THOUGH IT ONLY CREATES A TERRIBLE GRINDING NOISE ON CONTACT

    tozik
        this material is not corru
        it is remarkably tough... 
        i wish i could save a piece of it for later

    RESPONSES::akizet
        continue<+>END
            EXEC::change("PAGE!!triedarchivedoor", true);specialCam(false);env.embassy.vn({gakvu: "", tozik: ""});pauseSwapCam(false)
`),
                "d3_archivedoorlocked": generateDialogueObject(`
start
    sourceless
        THE DOOR AND ITS STRANGE MATERIAL LIE UNMOVING, NO MATTER WHAT WE DO
        WE NEED TO GET THE 'COOL ORB THINGY' AND 'SCARY BLACK BOX'

    RESPONSES::akizet
        continue<+>END
`),
                "d3_archivecore": generateDialogueObject(`
start
    sourceless
        THE ROOM IS DEATHLY STILL, ASIDE FROM THE DRIPPING OF SPIREBLOOD FROM THE MELTING CEILING
    
    gakvu
        is that it over there?
            SHOWIF::[["PAGE!!triedarchivedoor", true]]
        the 'cool orb thingy'?
            SHOWIF::[["PAGE!!triedarchivedoor", true]]

        what is that?
            SHOWIF::[["PAGE!!triedarchivedoor", false]]

    sourceless
        GAKVU POINTS FORTH TO AN EYE-PIERCING MONOLITH
            EXEC::specialCam('bstrdcyst1');pauseSwapCam(true)
        IT SEEMS TO BE MADE OF THE SAME STRANGE MATERIAL FROM BEFORE...
            EXEC::addItem(env.ITEM_LIST.cool_orb_thingy)
        AND OVER IT, FLOATS AN IMPORTANT-LOOKING CORRUCYST
        TOZIK WALKS FORTH TO TAKE IT, ATTEMPTING TO CONNECT TO IT...
            EXEC::env.embassy.vn({tozik: "fullview"});env.stage.current.hidePillarCyst();
        BUT HE SIMPLY SMASHES IT AGAINST HIS RECEPTOR UNEXPECTEDLY - ITS GLASS DOES NOT PART AS USUAL
        HE STUMBLES FROM THE IMPACT

    tozik
        ah...
        ow...

    sourceless
        HE STILL ALLOWS HIMSELF TRUE PAIN? HOW SILLY

    gakvu
        let me see!
            EXEC::env.embassy.vn({gakvu: "defocus"})

    sourceless
        SHE SKITTERS CLOSER, AND I EXPECT HER TO SNATCH IT FROM HIS CLAWS,
            EXEC::env.embassy.vn({gakvu: "fullview"})
        BUT INSTEAD, SHE INSPECTS HIS HEAD AND RECEPTOR FIRST
        <em>THEN</em> SHE SNATCHES IT FROM HIS CLAWS,
        PEERING INTO ITS ODDLY COLORED SKIN

    gakvu
        it is... alive,
        but yes - it seems to be a receptor-lock
        look!

    sourceless
        GAKVU TURNS THE CYST OVER IN HER CLAWS, TAPPING ITS MARKING
        A PIGMENTATION SIGIL THAT READS, 'ON THE USE OF BRIGHT WEAPONRY'

    gakvu
        maybe that thing keeping the door locked...
            SHOWIF::[["PAGE!!triedarchivedoor", true]]
        is just a very strange qou from materials...?
            SHOWIF::[["PAGE!!triedarchivedoor", true]]
        who wants to preserve their research??
            SHOWIF::[["PAGE!!triedarchivedoor", true]]

        is this kazki's? why is it so strangely highlighted?
            SHOWIF::[["PAGE!!triedarchivedoor", false]]

    akizet
        without a doubt
            SHOWIF::[["PAGE!!triedarchivedoor", false]]
        let us bring it along - it is small enough
            SHOWIF::[["PAGE!!triedarchivedoor", false]]
        and we should continue looking around!
            SHOWIF::[["PAGE!!triedarchivedoor", false]]
        there must be something else going on in this vein...
            SHOWIF::[["PAGE!!triedarchivedoor", false]]

        maybe...
            SHOWIF::[["PAGE!!triedarchivedoor", true]]
        either way, we have the 'cool orb thingy'.
            SHOWIF::[["PAGE!!triedarchivedoor", true]]
        let us fetch the other thing--the 'black box'?
            SHOWIF::[['EXEC::checkItem(env.ITEM_LIST.scary_black_box)', false], ["PAGE!!triedarchivedoor", true]]
        let us return to the door
            SHOWIF::[['EXEC::checkItem(env.ITEM_LIST.scary_black_box)', true], ["PAGE!!triedarchivedoor", true]]

    tozik
        <em>scary</em> black box
            SHOWIF::[['EXEC::checkItem(env.ITEM_LIST.scary_black_box)', false], ["PAGE!!triedarchivedoor", true]]

    RESPONSES::akizet
        continue<+>END
            EXEC::specialCam('');env.embassy.vn({gakvu: "", tozik: ""});pauseSwapCam(false)
`),
                "d3_archivedelivery": generateDialogueObject(`
start
    sourceless
        AS SOON AS WE ENTER THE ROOM... I SEE THEM
        EACH AND EVERY ONE
        A HALF-DOZEN CONTAINERS, WITH ONE OF THOSE SURFACE-SENT LIGHTS
        TOO MANY TO USE A DISABLER
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'
        BEFORE I CAN EVEN CURSE TO MYSELF, THEY ARE UPON US
            EXEC::change('PAGE!!archiveambush', true)
    
    RESPONSES::akizet
        fight!!<+>END
            EXEC::env.embassy.startArchivalAmbush();
            SHOWIF::['gameplay_off', false]
            FAKEEND::(initiate combat)
        fight!!<+>CHANGE::d3_archivedeliveryclear
            SHOWIF::['gameplay_off', true]
            FAKEEND::(skip combat)
`),
                "d3_archivedeliveryclear": generateDialogueObject(`
early
    sourceless
        AH - THERE, BEYOND THEIR CORPSES...
        IT SEEMS TO BE A COUSINLY BOX?
        I GO TO TAKE IT, THEN TRY TO OPEN IT...
            EXEC::setCam({x: 3, y: 3, offsetCamera: 'rotateX(-30deg)', rotation: 110});pauseSwapCam(true)
        BUT THE DEAD METAL LATCHES AND JOINTS HOLD IT FIRMLY SHUT
        AND ON CLOSER INSPECTION, THAT STRANGE TENDRIL MATERIAL IS PRESENT HERE, TOO
        IT SEEMS TO BE ASSISTING IN HOLDING IT SHUT...

    akizet
        curious - this looks like it came from the cousins
        i have seen them use these boxes for sensitive materials

    gakvu
        like what?
            EXEC::env.embassy.vn({gakvu: "defocus"})

    sourceless
        A PANG OF ANXIETY SHOOTS THROUGH MY MINDCORE
        I SHOULD DEFINITELY NOT SAY,
        'LIKE AN EXPERIMENTAL CORRU TO BRIGHT-LIGHTNING CONVERTER'

    akizet
        oh, uh, like,
        apples...
        because--they do not fare well with the low-air environment of our spire!

    gakvu
        ah. curious

    sourceless
        ½T~g«¾%
        THEY MUST THINK I AM SIMPLY PRETENDING TO KNOW
        OH WELL - IT IS BETTER THAN THE ALTERNATIVE
        WE TAKE THE BOX WITH US - HEAVY, BUT EASY ENOUGH TO SET ASIDE WHEN NEEDED
            EXEC::addItem(env.ITEM_LIST.scary_black_box)

    akizet
        i feel this may come in handy
        if it proves too cumbersome, we may simply leave it
        come - let us continue exploring

    RESPONSES::akizet
        continue<+>END
            EXEC::env.embassy.vn({gakvu: ""});setCam();env.stage.current.onStep();pauseSwapCam(false)

start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";'toggle within system menu if desired'
____END

    sourceless
        THE LAST ONE FALLS
            EXEC::env.stage.current.onStep()

        AFTER THE FIGHT, WE ALL CHEER IN UNISON
            SHOWIF::'EXEC::env.embassy.checkUsedKavrukas(true)'
        AN INGENIOUS USE OF KAVRUKAS, I WILL ALLOW MY PRIDE THIS VICTORY
            SHOWIF::'EXEC::env.embassy.checkUsedKavrukas(true)'

        WE ALL COLLAPSE WITH RELIEF AFTER THE FIGHT
            SHOWIF::'EXEC::env.embassy.checkUsedKavrukas(false)'
        THIS IS THE WORST θgaze OF MY θdeath
            SHOWIF::'EXEC::env.embassy.checkUsedKavrukas(false)'
        
    akizet
        that could have been really bad...
            SHOWIF::'EXEC::env.embassy.checkUsedKavrukas(true)'
    
    tozik
        no tendril left to rot
            SHOWIF::'EXEC::env.embassy.checkUsedKavrukas(true)'
            EXEC::env.embassy.vn({tozik: "defocus"})

    sourceless
        I RUMMAGE A BIT THROUGH THE remains OF THESE CONSTRUCTS...
            EXEC::step();env.embassy.vn({tozik: ""})
        TEXEC::env.combat.dynamicReward()

        LET US SEE, WHAT ELSE IS HERE...
            SHOWIF::[["PAGE!!triedarchivedoor", false]]
            WAIT::500
            EXEC::cutscene(true);if(!env.tempFlag){env.tempFlag = true; setTimeout(()=>{sendDialogue(env.currentDialogue.chain['early']);cutscene(false);env.tempFlag = false}, 1000)}

        AH - THERE, BEYOND THEIR CORPSES, MUST BE THE 'SCARY BLACK BOX'
        I GO TO TAKE IT, THEN TRY TO OPEN IT...
            EXEC::setCam({x: 3, y: 3, offsetCamera: 'rotateX(-30deg)', rotation: 110});pauseSwapCam(true)
        BUT THE DEAD METAL LATCHES AND JOINTS HOLD IT FIRMLY SHUT
        AND ON CLOSER INSPECTION, THAT STRANGE TENDRIL MATERIAL IS PRESENT HERE, TOO
        IT SEEMS TO BE ASSISTING IN HOLDING IT SHUT...

    akizet
        curious - this looks like it came from the cousins
        i have seen them use these boxes for sensitive materials
    
    gakvu
        like what?
            EXEC::env.embassy.vn({gakvu: "defocus"})

    sourceless
        A PANG OF ANXIETY SHOOTS THROUGH MY MINDCORE
        I SHOULD DEFINITELY NOT SAY,
        'LIKE AN EXPERIMENTAL CORRU TO BRIGHT-LIGHTNING CONVERTER'
    
    akizet
        oh, uh, like,
        apples...
        because--they do not fare well with the low-air environment of our spire!

    gakvu
        ah. curious

    sourceless
        ½T~g«¾%
        THEY MUST THINK I AM SIMPLY PRETENDING TO KNOW
        OH WELL - IT IS BETTER THAN THE ALTERNATIVE
        WE TAKE THE BOX WITH US - HEAVY, BUT EASY ENOUGH TO SET ASIDE WHEN NEEDED
            EXEC::addItem(env.ITEM_LIST.scary_black_box)

    akizet
        come - let us return to the door
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.cool_orb_thingy)'
        come - let us find the "cool orb thingy"
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.cool_orb_thingy) == false'
        before this archival vein collapses even further through the spire...
            EXEC::setCam();env.stage.current.onStep()

    RESPONSES::akizet
        continue<+>END
            EXEC::env.embassy.vn({gakvu: ""});pauseSwapCam(false)
`),
                "d3_archivedoorunlock": generateDialogueObject(`
start
    sourceless
        AND SO WE SET THE ENTITY'S REQUESTED MATERIALS BEFORE THE DOOR
            EXEC::specialCam('bstrdoor');pauseSwapCam(true)
        THE CORRUCYST IT WANTED,
        AND THE SCARY BLACK BOX
    
    bstrd
        ВАОУ!! :O
            EXEC::specialCam('bstrdface')
        у вас все получилос... чорт я так горжуьс...
        шикосик

    sourceless
        SUDDENLY, THE STRANGE TENDRILS CURLED AROUND THE DOOR SINK INTO ITS CORRU
        AND AS THEY DO, SEVERAL WHIP OUT AND CURL AROUND THE CORRUCYST AND BOX, BRINGING THEM WITH
        IN UNIFIED SURPRISE, WE ALL SHUFFLE BACKWARDS - EXPECTING IT TO LASH OUT AT US
            EXEC::change("PAGE!!bstrdlock", true)
        BUT IT DOES NOT, AND THE DOOR STANDS UNLOCKED
            EXEC::step()

    bstrd
        йо чеб вам не зайти у мя для вас сюрпиз
        :-)
    
    sourceless
        WE EXCHANGE A FEW UNEASY LOOKS
        BUT WE CAME THIS FAR...
        
    sys
        ATTENTION::"incoherence detected";"user caution advised"

    moth
        i know this really isn't my business, but...
            SHOWONCE::
        you should probably go save your iteration
            SHOWONCE::
        this bastard is up to no good
            SHOWONCE::
    
    RESPONSES::akizet
        continue<+>END
            EXEC::specialCam('');removeItem(env.ITEM_LIST.scary_black_box);removeItem(env.ITEM_LIST.cool_orb_thingy);pauseSwapCam(false)
`),
                "d3_archivedoorearly": generateDialogueObject(`
start
    sourceless
        THE SENSITIVE MATERIALS CHAMBER OF THE ARCHIVAL VEIN, IT...
            EXEC::specialCam('bstrdoor');pauseSwapCam(true)
        WHAT IS THIS?
        I HAVE NEVER SEEN THIS MATERIAL IN MY LIFE, NOR MY θdeath

    akizet
        gakvu, tozik, do you know what this is...?
    
    sourceless
        SHE IS SIMILARLY PUZZLED, HER RECEPTORS SHAKING NEGATIVELY
    
    gakvu
        a product of the aggressing groundsmind, maybe?
        i... i do not think it is corru

    bstrd
        '_'
            EXEC::specialCam('bstrdface')
        прив
    
    moth
        oh my god it put itself in the memory
            SHOWONCE::

    sourceless
        I SHRIEK AS THE DOOR SPEAKS TO US
        THE VOICE... IT IS SO TERRIBLY UNNATURAL
        GAKVU IS UNPERTURBED, I CAN FEEL SHE EVEN FINDS IT A LITTLE FUNNY

    gakvu
        hello!
        will you let us in?
            EXEC::env.embassy.vn({gakvu: "defocus"})

    akizet
        ah... ye--yes,
        we are trying to recover enough materials to escape

    bstrd
        о эт круто :P
            EXEC::env.embassy.vn({gakvu: ""})
        КНЧ впущу вас
        но тока сделайте мн одлжение
        достанте маю клевую шароштучку злева
        и криповую черную коробчку зправа
        там внутри чета КРYТ03... 
        скушно не будет!!
        :-)

    sourceless
        IT SPEAKS SO HAPHAZARDLY - WITH STRANGE CONTRACTIONS IN PLACE OF WORDS
        IT IS AS IF IT IS SPEAKING A LANGUAGE I HAVE NEVER LEARNED
        AND YET, I CAN STILL UNDERSTAND...?
        WAIT - WE ALREADY HAVE THESE THINGS
        THE 'SCARY BLACK BOX'...
        OH YES, AND THE 'COOL ORB THINGY' - NO DOUBT THE LOCKED CYST
        WE OFFER THESE TO THE DOOR

    bstrd
        :o
        вы  уже их дсотали?
        НИХРЕНУШЕЧКИ!
        ВАОУА
        ок заходите
            EXEC::change("PAGE!!bstrdlock", true)

    sourceless
        SUDDENLY, THE STRANGE TENDRILS CURLED AROUND THE DOOR SINK INTO ITS CORRU
        AND AS THEY DO, SEVERAL WHIP OUT AND CURL AROUND THE CORRUCYST AND BOX, 
        RIGHT OUT OF OUR CLAWS!!! I NEARLY TRIP FORWARDS AS IT STEALS THEM AWAY
        IN UNIFIED SURPRISE, WE ALL SHUFFLE BACKWARDS - EXPECTING IT TO LASH OUT AT US
        BUT IT DOES NOT, AND THE DOOR STANDS UNLOCKED
            EXEC::step()

    bstrd
        заходите у мя для вас сюрпиз
        :-)
    
    sourceless
        WE EXCHANGE A FEW UNEASY LOOKS
        BUT WE CAME THIS FAR...
        
    sys
        ATTENTION::"incoherence detected";"user caution advised"

    moth
        i know this really isn't my business, but...
            SHOWONCE::
        you should probably go save your iteration
            SHOWONCE::
        this bastard is up to no good
            SHOWONCE::
    
    RESPONSES::akizet
        continue<+>END
            EXEC::specialCam(false);removeItem(env.ITEM_LIST.scary_black_box);removeItem(env.ITEM_LIST.cool_orb_thingy);pauseSwapCam(false)
`),
                "d3_archivemini": generateDialogueObject(`
start
    sourceless
        IMMEDIATELY AS WE PROCEED, A PRIMAL FEAR OVERTAKES ME
        THOUGH I AM CERTAIN WHAT STANDS BEFORE US IS AN ARCHIVAL SHELF...
        A DISTANT PART OF MY MIND ASSOCIATES IT WITH A SECRI
        IS IT THE MALFORMED EYES? THE ELONGATED LIMBS?
        OR MAYBE THE PROMISE OF DEATH FROM ITS TOUCH
        THERE IS NO TIME TO FIND THE ROOT CAUSE
        IT IS UPON US WITH WORRYING SPEED
    
    RESPONSES::akizet
        fight!!<+>END
            EXEC::env.embassy.startArchivalMiniboss();
            SHOWIF::['gameplay_off', false]
            FAKEEND::(initiate combat)
        fight!!<+>CHANGE::d3_archiveminiclear
            SHOWIF::['gameplay_off', true]
            FAKEEND::(skip combat)
`),
                "d3_archiveminiclear": generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";'toggle within system menu if desired'
____END

    sourceless
        THE BEAST FALLS AND MELTS, THOUGH...
            EXEC::env.stage.current.onStep()
        THE CORRUCYSTIC SLUDGE THAT REMAINS SEEMS TO DRAIN AWAY
            EXEC::changeBgm(env.embassy.music_collapse, {length: 4000});
        ARE THOSE HOLES IN THE GROUND?
        IS THAT THE GROUND?
        SOMETHING ABOUT IT MAKES MY HEAD HURT...

    gakvu
        akizet? are you ok?
            EXEC::env.embassy.vn({bg: true, gakvu: "fullview"});

    sourceless
        IS IT SO PLAIN TO SEE?
        MY RECEPTORS HAVE CURLED INTO TIGHT SPIRALS,
        AND IN OUR POST-COMBAT, I HAVE LEANED AGAINST A WALL TO RECOVER
        TOZIK APPROACHES TO SEE IF ANYTHING IN PARTICULAR IS BROKEN
        BUT, I WAVE THEM AWAY
    
    akizet
        no no, i am all right
        do you... see anything strange with this room?
    
    sourceless
        THEY LOOK AROUND, CLEARLY NOT AS PERTURBED AS I
            EXEC::env.embassy.vn({bg: false, gakvu: "defocus", tozik: "defocus"})
        TOZIK STUDIES THE MIGRAINE-INDUCING VOID OF THE CEILING
    
    tozik
        it looks like the perspective projection might be acting up
        i am not surprised, given the entity that has been guiding us
        it has an uncanny control of the environment
        not unlike the groundsmind, or gakvu...

    gakvu
        hey, where is it, anyway?
        did it just take the box and cyst and run around this thing?

    sourceless
        SUSPICION SPIKES THROUGH OUR CONNECTION
        IS IT A TRAP?
        WE CAN EITHER CONTINUE, OR TURN AROUND...
        WE ARE QUITE FAR OUT OF OUR WAY, AFTER ALL
        BUT SURELY THIS WILL BE WORTH THE TROUBLE?
            EXEC::env.embassy.vn({gakvu: "", tozik: ""})
    
    RESPONSES::akizet
        continue<+>END
`),
                "d3_archiveboss": generateDialogueObject(`
start
    sourceless
        THIS ROOM...
        IT IS SO WRONG THAT I FEEL MY MIND STRUGGLE TO PROCESS IT
        IS THIS A PRODUCT OF THE SIGNAL?

    gakvu
        akizet, tozik...
        do not--do not look into the gray

    bstrd
        СЮДА!!!
        НА МНЯ СМОРИТЕ
        O_O
            EXEC::sfxmap.stop();play("crit", 0.75);specialCam("bstrdboss");pauseSwapCam(true)
            
    sourceless
        THE VOICE BOOMS FROM AN ARCHIVAL GOLEM
        THAT STRANGE SIGIL IS OVER ITS HEAD,
        A SASH OF KAVRUKAS HANGS OVER ITS TORSO...
        WAIT--!!
        AND THE BOX LIES NEAR ITS FEET, OPEN, BUT AWAY FROM US!
        THE CYST IS NOWHERE TO BE SEEN, BUT... 
        IT IS AN ARCHIVAL GOLEM, SO IT MAY BE WITHIN ITS CHASSIS

    bstrd
        спс за то шо достали все это
        
    sourceless
        THE GOLEM KNEELS TO RETRIEVE A LONG BRIGHT WEAPON FROM THE BOX
            EXEC::specialCam("bstrdbox")
        IT MAKES A SERIES OF MOVEMENTS THAT PRODUCE CLICKS AND SNAPS FROM THE DEVICE
            EXEC::content.querySelector('.bstrdboss').classList.add('gun');play('click2')
        AND THE DOOR SHUTS BEHIND US--LOCKED AGAIN WITH THE SAME UNNATURAL TENDRILS

    bstrd
        u guys just taught a golem how to use gun's
        BAD ASS ...
        SHOOT EM!!! GET EMM DUDE!!
        >:}
    
    sourceless
        OUR HOPES OF HAVING A NEW FRIEND ARE STOMPED
        BEFORE IT CAN EVEN RAISE ITS WEAPON, I ACTIVATE THE TIMESTOPPER
        WE CAN ONLY FIGHT
    

    RESPONSES::sys
        force thoughtform rules over entity<+>END
            EXEC::env.embassy.startArchivalBoss(true);specialCam(false);pauseSwapCam(false)
            FAKEEND::reduced intensity alternative
            SHOWIF::[['low_intensity', true], ['gameplay_off', false]]

    RESPONSES::akizet
        fight!!<+>END
            EXEC::env.embassy.startArchivalBoss();specialCam(false);pauseSwapCam(false)
            FAKEEND::(initiate combat) 
            SHOWIF::['gameplay_off', false]
        fight!!<+>CHANGE::d3_archivebossend
            SHOWIF::['gameplay_off', true]
            FAKEEND::(skip combat)
`),
                "d3_archivebosstut": generateDialogueObject(`
start
    sys
        WARNING::'abnormal thoughtform activity detected'
            EXEC::env.bulletHell.paused = true;ratween(env.bgm, 0.5);env.temporaryOptimize = false;
        WARNING::'entity BSTRD';'altering thoughtspace'
            EXEC::env.bulletHell.paused = true
        ANALYSIS::'intention to destroy recollection locus'
        ATTENTION::'utilizing proxy thoughtform';'manually direct away from incoherence'
        ATTENTION::'neural controls adjusted';'direct proxy with primary method of navigation'

    sourceless
        THE GOLEM PULLS A KAVRUKA FROM ITS SASH
        I SEE ITS MANY LEGS FLARE WITH LIFE AS IT ACTIVATES
        TOZIK WARNS US URGENTLY,

    tozik
        G¼ÚÀ
        if this thing throws enough of those,
        this entire room will collapse
        it may sound insane, but we need to defuse them when they are thrown
        
    gakvu
        but look at how many it has!!

    tozik
        i know
        just do the best you can
        the room integrity should be able to take a few...
        and i will lend my knowledge through the timestopper
        there is a trick to disabling them right before they explode

    sys
        ANALYSIS::'context shift'
        ATTENTION::'optionally';'utilize INTERACTION over highlighted areas to disarm entity KAVRUKA'
        NOTICE::'INTERACTION triggered by <span definition="EQUIVALENT::'LMB'">primary action method</span>'
        NOTICE::'additionally triggered by <span definition="EQUIVALENT::'Q';'E'">quality and view shift methods</span>'

    RESPONSES::akizet
        go!!<+>END
            EXEC::bh_gundown("tutorial");env.bulletHell.paused = false;ratween(env.bgm, 1);env.temporaryOptimize = true
            FAKEEND::(continue) 
`),
                "d3_archivebossend": generateDialogueObject(`
start
    sourceless
        THE GOLEM FALLS TO PIECES, ITS HOVERING CAPABILITIES SLUDGED
            EXEC::env.stage.current.bossCollapse();env.stage.current.clearBossPals()
        BUT ITS SIGIL AND STRANGE VOICE REMAIN
            EXEC::change('PAGE!!archiveboss', true);

____SHOWIF::['gameplay_off']
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";'toggle within system menu if desired'

    bstrd
        ВТФ
            EXEC::specialCam("bstrdbox");pauseSwapCam(true)
        и вы так делали...
        ВСЕ ЭТО ВРЕМЯ???
        >:[
        НЕЧЕСНО!
        НЕ НУ ЧЕ ЗА ХУЙНЯ
    
    tozik
        о чём ты говоришь?
    
    bstrd
        посе всего шо я сделал...
        шоб тебе было весело...
        ...
        ты... ничего...
        НЕ ПОЛУЧИШ!!!!

    sourceless
        THE SIGIL OVER THE GOLEM'S HEAD FADES, AND ALL AT ONCE, THINGS SEEM TO RETURN TO NORMAL
            EXEC::env.stage.current.removeBastardBG();env.stage.current.onStep()
        there is an eerie silence...
        what could it have meant by that?
        
    akizet
        well...
        let us return to fixing movefriend
        we have deviated enough
            EXEC::change("PAGE!!archivesclear", "skipped")
    
____SHOWIF::['gameplay_off', false]
    bstrd
        НИХРЕНУШЕЧКИ :O
            EXEC::specialCam("bstrdbox");pauseSwapCam(true)
        вау...
            EXEC::ratween(env.bgm, 0.75)
        у вас ряльно получилос
        я уе думал я вас там ПРИБЬЮ
    
    tozik
        п... почему ты...
    
    bstrd
        ЗАВАЛИ РОТ я не закончил
        крч я щас умру так шо слушайте вниательно
        aрр... боьл..
        ООА как БОЛЬНА!!!
        ;-(
        энивейс я нашл это снаружи.. можете взять
        кажеца двльно важным поэтому не потеряйте
    
    sourceless
        BEHIND THE DYING GOLEM RISES ANOTHER STRANGE MONOLITH
            EXEC::env.stage.current.showPillar(true)
        OVER IT IS... IT LOOKS LIKE A CORRUCYST
        AND THERE IS SOME SORT OF MARKING ON IT
        BUT I CANNOT SEE IT CLEARLY FROM HERE

    gakvu
        you seem pretty intelligent, for... what is going on
        do you know what is happening? we could fix you if you help us!
        
    akizet
        and agree not to try to kill us again...
    
    bstrd
        :U
    
    sourceless
        THERE IS A LONG, UNCOMFORTABLE PAUSE
        DID IT NOT EXPECT TO LIVE THIS LONG? OR FOR US TO MAKE THAT OFFER?

    bstrd
        не сори мне над вас убить
        но вы победили так шо гц
        
    sourceless
        THE SIGIL FADES, AND ALL AT ONCE, THINGS SEEM TO RETURN TO NORMAL
            EXEC::env.stage.current.removeBastardBG()
        OUR FOE'S GOLEM FALLS TO PIECES ON THE FLOOR, WHERE IT SLOWLY MELTS AWAY
            EXEC::env.stage.current.onStep()
        EVEN THE COLOR OF THE ROOM HAS CHANGED...
        WE ALL STAND IN SILENCE FOR A MOMENT AS WE PROCESS WHAT HAS HAPPENED
        I LOOK AT THE MONOLITH AGAIN, AND CURIOSITY PULLS ME CLOSER
            EXEC::specialCam("bstrdbosspillar")
        
    akizet
        well,
        let us see what that creature left for us...
    
    sourceless
        I TURN THE CORRUCYST OVER IN MY HANDS
        THE MARKING READS, "SORRY"
        APOLOGIZING...? FOR TRYING TO KILL US?
        NO - I FEEL THAT IT PREDATES THIS ENTITY'S INTERFERENCE
        SOMETHING ABOUT IT FEELS FAMILIAR
        REGARDLESS, I PLACE THE CYST ON ONE OF MY RECEPTORS, AND...
            EXEC::env.stage.current.hidePillarCyst();addItem(env.ITEM_LIST.sorry_cyst)
        FASCINATING!!

    akizet
        tozik...
        this is a weapon schematic

    tozik
        for what?
    
    akizet
        it looks like some sort of compact golem armament...
        but the schematic itself is unfocused
        i feel the information is still there, just scrambled
        if we come across any foundry vats, we could probably fix the cyst and create it!
        
    sourceless
        I GLANCE DOWN AT THE GOLEM'S CORPSE, STILL CLUTCHING ITS BRIGHT WEAPON
        THE MIND INHABITING IT - SO VIOLENT, BUT STILL HONORABLE
        TRULY BIZARRE...
        I KNEEL ALL THE SAME, AND PLACE MY CLAW OVER WHAT REMAINS OF ITS PALE EYESPOTS
    
    akizet
        you fought well... whatever you were
        let us return to fixing movefriend
        we have deviated enough
            EXEC::change("PAGE!!archivesclear", true)
____END

    RESPONSES::akizet
        leave<+>END
            EXEC::specialCam("");pauseSwapCam(false)
`)
            },

            definitions: {
            },

            strings: {
                "better times": "хорошие времена",
                "discovery": "открытие",
                "suspicion": "подозрение",
                "collapse": "обвал",
                "recollection": "вспоминание",

                "experience": "испытать",
                "new iteration": "новая итерация",
                "load iteration": "загрузить итерацию",
                "save iteration": "сохранить итерацию",
                "save": "сохраниться",

                "join the chat": "присоединиться к разговору",
                "chat": "поговорить",
                "convene": "созвать",

                "akizet": "акизет",
                "Surface Veteran": "Ветеран Поверхности",
                "think to self": "подумать про себя",
                "ruminate over cyst": "размышлять о цисте",

                "gakvu": "гакву",
                "Conspicuous Insider": "", // --- ???
                "toggle cloak": "переключить накидку",
                    "ok": "хорошо",
                    "sure": "конечно",
                    "no problem": "без проблем",
                    "really? now? all right": "серьёзно? сейчас? ладно",
                    "ok akizet": "ага акизет",

                "tozik": "тозик",
                "Inquisitive Technician": "Пытливый Техник",

                "cavik": "кавик",
                "kazki": "казки",
                "bozko": "бозко",

                "qou": "куу",
                "tir": "тир",
                "kiv": "кив",
                "jut": "жат",
                "vel": "вел",

                "movefriend": "движедруг",

                "barfriend": "бардруг",

                "timestopper": "времядержец",

                // discovery

                // suspicion
                /*echo*/ "hello akizet, i am glad it is you who connected": "",
                /*echo*/ "as it is with worry for your well-being that this message finds you": "",
                /*echo*/ "it must be said immediately:": "",
                /*echo*/ "information regarding our team's latest findings must not be shared with anyone at any point": "",

                /*akizet*/ "yes... as we had agreed": "",
                /*akizet*/ "what is the purpose of this message?": "",

                /*echo*/ "we are in great danger, akizet": "",
                /*echo*/ "though we agreed in work, there can be no casual hints of our knowledge": "",
                /*echo*/ "no sharing with larval relations": "",
                /*echo*/ "not anyone you think you can trust": "",
                /*echo*/ "no one": "",

                /*sourceless*/ "apprehension from the echo saturates the environment": "",
                /*sourceless*/ "i can feel that this delusional paranoia is not even its true message": "",
                /*sourceless*/ "in my θdeath, i have never had patience for such meandering exchanges": "",

                /*akizet*/ "why? do not waste my time, cease with this drama": "",

                /*echo*/ "i presumed you might react this way": "",
                /*echo*/ "but i had to place my warning first, out of precaution": "",
                /*echo*/ "you want to know why:": "",
                /*echo*/ "come and see": "",

                /*akizet*/ "yes, i understand": "",

                /*echo*/ "thank you": "",
                /*echo*/ "if only i could truly hear you agree": "",
                /*echo*/ "but i cannot risk any side knowing i have told you": "",
                /*echo*/ "so this cyst will erase its purpose shortly": "",

                /*echo*/ "but trust that i will know your response based on your actions": "",
                
                /*sourceless*/ "there is no response - no thought, no meaning": "",
                /*sourceless*/ "in reality, i feel a strange runoff near my cyst-bearing receptor": "",

                /*sourceless quiet*/ "it is destroying itself...": "",
      
                // collapse part 1

            },

            entityDescriptions: {
                "recollection::Aæ§<äYf¹L": `::ЭМПИРИЧЕСКАЯ МЫСЛЕФОРМА
    ::НЕВИЗУАЛИЗИРУЕМА
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'пункт назначения превышает порог бессвязности';'рекомендуется починка'">::ЗАПРЕДЕЛЬНАЯ БЕССВЯЗНОСТЬ</span>`,
                "recollection::ø¥¬À‰": `::ЭМПИРИЧЕСКАЯ МЫСЛЕФОРМА
    ::НЕВИЗУАЛИЗИРУЕМА
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'пункт назначения превышает порог бессвязности';'рекомендуется починка'">::ЗАПРЕДЕЛЬНАЯ БЕССВЯЗНОСТЬ</span>`,
                "recollection::„²!Äë±#Rã": `::ЭМПИРИЧЕСКАЯ МЫСЛЕФОРМА
    ::НЕВИЗУАЛИЗИРУЕМА
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'пункт назначения превышает порог бессвязности';'рекомендуется починка'">::ЗАПРЕДЕЛЬНАЯ БЕССВЯЗНОСТЬ</span>`,
                "recollection::discovery": `::ЭМПИРИЧЕСКАЯ МЫСЛЕФОРМА
    ::ОПОВЕЩЕНИЕ::<span style="color:var(--bright-color)">'непрерывный поток';'по завершению вспоминания';'сбрасывает поток к началу'</span>
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'последний добрый взор'</span>`,
                "recollection::suspicion": `::ЭМПИРИЧЕСКАЯ МЫСЛЕФОРМА
    ::ОПОВЕЩЕНИЕ::<span style="color:var(--bright-color)">'непрерывный поток';'по завершению вспоминания';'сбрасывает поток к началу'</span>
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'глаз велзи выгибается в ликовании'</span>`,
                "recollection::collapse": `::ЭМПИРИЧЕСКАЯ МЫСЛЕФОРМА
    ::ОПОВЕЩЕНИЕ::<span style="color:var(--bright-color)">'использует'::ВНУТРЕННЯЯ_ИТЕРАЦИЯ::'методы'</span>
    ::ПРИМЕЧАНИЕ::<span style="color:var(--bright-color)">'будет доступна возможность сохранения и повторного просмотра итерации'</span>
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'вот бы он прислушался'</span>`,

                "akizetesche": `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'локус вспоминания'
    <span style='color: var(--friend-color)'>::РЕКОНСТРУИРОВАННЫЙ КОНТЕКСТ ПОДПИСИ</span>
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("вазнийское")} сюрреалистическое влияние'
    <span style='color: var(--friend-color)'>+</span>'метка ${processDefinitionsInString("олтазни")}'
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("вел")}-рецепторы, завитые'
    <span style='color: var(--friend-color)'>+</span>'<span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'я просто думаю, что они крутые'">близнецовые глаза</span>'
    <span style='color: var(--friend-color)'>+</span>'самопроектированная подпись'`,
                "cavik": `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'
    <span style='color: var(--friend-color)'>::РЕКОНСТРУИРОВАННЫЙ КОНТЕКСТ ПОДПИСИ</span>
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("вазнийское")} сюрреалистическое влияние'
    <span style='color: var(--friend-color)'>+</span>'метка <span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'дом';'вазнийский пещерный город';'да будут же глаза развеваться!!'">олтазни</span>'
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("жат")}-рецепторы, обращены назад'
    <span style='color: var(--friend-color)'>+</span>'самопроектированная подпись'`,
                "bozko": `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'
    <span style='color: var(--friend-color)'>::РЕКОНСТРУИРОВАННЫЙ КОНТЕКСТ ПОДПИСИ</span>
    <span style='color: var(--friend-color)'>+</span>'<span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'а к чему морока?';'самопроектирование - это слишком долго'">продиктованная самовосприятием подпись</span>'
    <span style='color: var(--friend-color)'>+</span>'формация куу-тела для экстремального давления'
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("кив")}-рецепторы, напыщенные'`,
                "kazki": `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'
    <span style='color: var(--friend-color)'>::РЕКОНСТРУИРОВАННЫЙ КОНТЕКСТ ПОДПИСИ</span>
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("вазнийское")} сюрреалистическое влияние'
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("тир")}-рецепторы, грибковая стилизация'
    <span style='color: var(--friend-color)'>+</span>'разделительное представление куу-тела'
    <span style='color: var(--friend-color)'>+</span>'<span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'совместная работа жителя козазни';'гевериканеше жат жекарри'">внешне-проектированная подпись</span>'`,
                "tozik": `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'
    <span style='color: var(--friend-color)'>::РЕКОНСТРУИРОВАННЫЙ КОНТЕКСТ ПОДПИСИ</span>
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("экивиковое")} геометрическое влияние'
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("жат")}-рецепторы, торчмя'
    <span style='color: var(--friend-color)'>+</span>'<span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'их чёрные зрачки разительны'">близнецовые глаза</span>'
    <span style='color: var(--friend-color)'>+</span>'самопроектированная подпись'`,
                "gakvu": `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'
    <span style='color: var(--friend-color)'>::РЕКОНСТРУИРОВАННЫЙ КОНТЕКСТ ПОДПИСИ</span>
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("экивиковое")} геометрическое влияние'
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("вел")}-рецепторы, завитые, угловая стилизация'
    <span style='color: var(--friend-color)'>+</span>'<span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'моя настоящая накидка тоже так делает, она покрыта грибком'">самопроектированная подпись</span>'`,
                // discovery

                // suspicion
                
                // collapse part 1
                "miltza": `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'
    <span style='color: var(--friend-color)'>::РЕКОНСТРУИРОВАННЫЙ КОНТЕКСТ ПОДПИСИ</span>
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("экивиковое")} геометрическое влияние'
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("тир")}-рецепторы, когтистые'
    <span style='color: var(--friend-color)'>+</span>'<span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'религиозное значение'">дополнительная окизиковая рука</span>'
    <span style='color: var(--friend-color)'>+</span>'самопроектированная подпись'`,
            }
        },
        "gol": { // golem maintenance or 2nd part collapse
            dialogues: {

            },

            definitions: {
                
            },

            strings: {
                
            },

            entityDescriptions: {

            }
        },
        "ep4": { // pale halls or 3rd part collapse
            dialogues: {

            },

            definitions: {
                
            },

            strings: {
                
            },

            entityDescriptions: {

            }
        },
        "abyss": { // beheath
            dialogues: {

            },

            definitions: {
                
            },

            strings: {
                
            },

            entityDescriptions: {

            }
        },
        "parasite": { // parasite plane
            dialogues: {

            },

            definitions: {
                
            },

            strings: {
                
            },

            entityDescriptions: {

            }
        },
        "e3a2": { // frame
            dialogues: {

            },

            definitions: {
                
            },

            strings: {
                //critta reactions
                //generic
                "missed": "мимо",
                "close": "близко",
                "ha": "ха",
                "perfect": "отлично",
                "take that": "получай",
                "easy": "легкотня",
                "good": "хорошо",
                "oh no": "о нет",
                "i missed": "я промахнулась",
                "sorry": "прости",
                "bleeding": "кровь течёт",
                "ahh": "ахх",
                "feels good": "приятное ощущение",
                "oouaa": "ооуаа",
                "eeou": "ээоу",
                "ehehe": "ехехе",
                "hehe": "хихи",
                "haha": "хаха",
                "ahaha": "ахаха",
                "ow": "ай",
                "ouch": "ауч",
                "it cut me": "оно порезало меня",
                "thank you": "спасибо",
                "very cool": "очень круто",
                "feels blurry": "всё расплывается",
                "i almost died?": "я чуть не умерла?",
                "oh, armor": "о, броня",
                "this will help": "поможет",
                "i feel better": "я чувствую себя лучше",
                "thanks": "спасибо",
                "what is that?": "что это такое?",
                "what did it say?": "что оно сказало?",
                "it is so unnatural": "так неестественно",
                "this feels wrong": "оно кажется неправильным",
                "oh, thank you": "ох, спасибо",
                "i will not let you down": "я не подведу тебя",
                //ichor
                "watch out!!": "осторожно!!",
                "yes!!": "да!!",
                "everyone, follow my lead!": "ребята, за мной!",
                "are you feeling better?": "тебе лучше?",
                "do you need more?": "тебе нужно ещё?",
                "i have your back!": "я прикрою тебя!", 
                "oh!! sorry... i missed...": "ой!! извините... я промахнулась...", 
                "i messed up again...": "я опять облажалась...", 
                "is there a heal to spare?": "найдётся лишний хил?", 
                "what? i am fine!": "что? я в порядке!", 
                "feeling good!!": "чувствую себя прекрасно!!", 
                "my arms...": "мои руки..", 
                "hehehehe": "хихихихи", 
                "ahaha!": "ахаха!", 
                "heehee!": "хиихии!", 
                "ehehehe!": "ехехехе!", 
                "this is how it has to be...": "так суждено...", 
                "this is nothing...": "это пустяки...", 
                "good thing it was me!": "хорошо, что это была я!", 
                "for me? really?": "мне? правда?", 
                "you should not have!": "", 
                "ah, i will repay this!": "ах, я отплачу!", 
                "i can fix everything...": "я могу всё исправить...", 
                "i am back? we can fix this!!": "я вернулась? мы можем всё исправить!!", 
                "no, i am fine!": "нет, я в порядке!", 
                "a shield for me?": "щит для меня?", 
                "if only we always had this...": "вот бы у нас всегда это было...", 
                "is this real...?": "это правда...?",
                //eyes
                "nice try": "хорошая попытка",
                "not fast enough": "слишком медленно",
                "this was inevitable": "это было неизбежно",
                "you will not last": "ты долго не продержишься",
                "there you go": "вот, держи",
                "do not waste this": "не трать впустую",
                "i need to focus": "мне нужно сосредоточиться",
                "i was too slow": "мне не хватило скорости",
                "i need this fixed": "мне нужно избавиться от этого",
                "you are taking too long": "вы слишком долго тянете",
                "help me now": "помогите мне прямо сейчас",
                "a slow recovery": "медленное восстановление",
                "ah...": "а...",
                "ha ha ha ha": "ха ха ха ха",
                "heh heh": "хех хех",
                "ohoho": "охохо",
                "hmhmhm": "хмхмхм",
                "there!": "вон там!",
                "i see an opening": "подходящий момент",
                "aaÍ": "ааҊ",
                "this will need to be fixed": "это потребует внимания",
                "do not delay in mending me": "не медлите с моим лечением",
                "was that really your best?": "лучше нельзя было?",
                "that will do, for now": "сойдёт, на пока что",
                "it is happening again": "это снова происходит",
                "good": "отлично",
                "this will not last for long": "не продержится долго",
                "i will need further shielding": "мне понадобится дальнейшая защита",
                "it is better than nothing": "лучше, чем ничего",
                "i...": "я...",
                "what...": "что...",
                "but...": "но...",
                "quit wasting time and hit them": "прекрати тратить время и бей их",
                "you will still be hit": "по тебе всё ещё будут попадать",
                //claws
                "ha! HA HA!!": "ха! ХА ХА!!",
                "HA! idiot!!": "ХА! идиот!!",
                "BURN! BLEED! DIE! DIE DIE DIE!": "ГОРИ! КРОВОТОЧЬ! УМРИ УМРИ УМРИ!",
                "BLEED! BURN!": "РЕЗНЯ!",
                "DIEDIEDIEDIEDIEDIE!!": "УМРИУМРИУМРИУМРИУМРИУМРИ",
                "DIE!": "СДОХНИ!",
                "you are WELCOME!": "всегда ПОЖАЛУЙСТА!",
                "now KILL THEM!": "теперь УБЕЙ ИХ!",
                "DIE ALREADY!!": "ПОМРИ УЖЕ!",
                "USELESS!!": "БЕСПОЛЕЗНО!!",
                "i cannot fight like this!!!": "я не могу так драться!!!",
                "help me! NOW NOW NOW NOW!": "помогите мне! СЕЙЧАС СЕЙЧАС СЕЙЧАС!",
                "better than before..!": "лучше чем раньше..!",
                "not healing FAST ENOUGH!": "заживает СЛИШКОМ ДОЛГО!",
                "heheôíhôhehe": "хихеôíхôехе",
                "eåeaaaåauu": "эåэаааåауу",
                "eheheheheHEHEHAHAHAHA!!": "эхехехихихХИХЕХАХАХАХА!!",
                "AAHAHAHAA!!": "ААХАХАХАА!!",
                "HAA! ahaha!!": "ХАА! ахаха!!",
                "eheHEEHeheh!!": "ихихИИХехех!!",
                "OW!": "АЙ!",
                "you will PAY for this!": "ты РАСПЛАТИШЬСЯ за это!",
                "you-- I WILL KILL YOU!": "ты-- Я ТЕБЯ УБЬЮ!",
                "good!": "превосходно!",
                "they will MELT beneath us!!": "они будут ПЛАВИТЬСЯ под нами!!",
                "it was ABOUT TIME!!": "ну НАКОНЕЦ-ТО!",
                "DIE!! DIE DIE die DIE die die DIE!": "СДОХНИ!! СДОХНИ СДОХНИ сдохни СДОХНИ сдохни сдохни СДОХНИ!",
                "HEHEHËHæ æAA!!!!": "ХИХИХӤХæ æАА!!!!",
                "NOTHING can stop me! NOTHING!": "НИЧТО меня не остановит! НИЧТО!",
                "time to DIE!": "время УМИРАТЬ!",
                "they will not leave a scratch on me!!": "они не оставят на мне ни царапины!!",
                "good! more, NOW!": "отлично! ещё, СЕЙЧАС!",
                "ugh!! finally!!": "тьфу!! наконец-то!!",
                "this... changes NOTHING...!": "это... НИЧЕГО не меняет...!",
                "ugh...": "фу...",
                "euuehh": "эууехх",
                "better YOU than me!": "лучше ТЕБЯ чем МЕНЯ!",
                //bone
                "did you really think that would hit me?": "ты правда думал, что это меня заденет?",
                "not so easy": "не так просто",
                "you will not get past me": "ты не пройдёшь",
                "i will shatter you": "я разобью тебя вдребезги",
                "do not make me regret this": "не дай мне пожалеть об этом",
                "let me fix this": "я займусь этим",
                "i must have something to stop this bleeding": "должно же у меня быть что-то, чтобы остановить кровотечение",
                "good...": "неплохо...",
                "what--?": "что--?",
                "heh": "хех",
                "hah": "хах",
                "oho": "охо",
                "hmh": "хмх",
                "a cruel trick": "злая шутка",
                "i see you now": "теперь я вижу тебя",
                "this will not stop me": "меня это не остановит",
                "feeling fine": "чувствую себя нормально",
                "you all look so frail...": "вы все такие хрупкие...",
                "you will never get past me now": "вам никогда не пройти через меня",
                "back again...": "снова здесь...",
                "it seems i can trust you, at least": "по крайней мере я могу вам доверять",
                "they will not get through this": "они не пробьют это",
                "perfect": "замечательно",
                "no--they are my friends!!": "нет--они мне друзья!!",
                "they would never...": "они бы никогда...",
                "stay behind": "держись за мной",
                "look at me!": "смотрите на меня!",
                "i do not need your help": "мне не нужна твоя помощь",
                //light      
                "i saw it!!": "я всё видела!!",
                "over heËere ehehe": "а я здесь ихихи",
                "missed missed missed ahahaha!!!": "мимо мимо мимо ахахаха!!!",
                "unthinking thing!": "безмозглая штука!",
                "AHAHA": "АХАХА",
                "this is ¤UR¬¶ world!": "это ⱵĀ̱Ш¬¶ мир!",
                "life is literall¬y so easy": "жизнь буквальн¬о так проста",
                "i can ÷ú*¼see the cells...!": "я вижу ÷ú*¼клетки...!",
                "do not worry, my friend!!": "не волнуйся, подруга!!",
                "trusst meÉe": "доверьсся мнеÉe",
                "eheheHAHA": "ихихиХАХА",
                "oh nooo ahaha!!": "оо нееет ахаха!!",
                "stupid! stupi½id!!": "глупый! глуп½ый!!",
                "what!! cheater!!!": "что!! нечестно!!!",
                "use focus stupid!!": "используй сосредоточение тупица!!",
                "hahaå÷ú*¼-- ...": "хахаå÷ӱ́*¼-- ...",
                "HA«¶¾ß-- ...": "ХA«¶¾ß-- ...",
                "«hehe-- ...": "«хихи-- ...",
                "ha®½-- ...": "хa®½-- ...",
                "oww hahaa": "айй хахаа",
                "fix me! fix me f&5«ix  meœ fiºQôux mÆ!": "помогите! помог&5«ите мнeœ пºQôuгите мНÆ!",
                "helloooo?? FIX ME!!": "алооооо?? ПОМОГИТЕ!!",
                "i have blood??": "у меня есть кровь??",
                "ohh haha that is verý¯Ÿ bad for m£+¤": "ооо хаха вот эт̌ о нԙ оҹенҍ¯љ хорøш+¤",
                "yess¬": "даа¬",
                "it mæm¬îV°0kes my voice funny": "у мæ¬îV°0ня голос смешной",
                "hahaaå¬¬h#±aaahaha": "хахааå¬¬х#±ааахаха",
                "yo*¼u-„should ƒ„eel this¤": "поч*¼u-„увствуҋ ӭ́„то¤",
                "heavyy": "тяжелоо",
                "i want my turnnn": "я хочу свою очередььь",
                "boØringg[Œÿ:ä‘": "скỾкотеǶьь[Œÿ:ä‘",
                "so s st upid": "та к т упо",
                "b ored": "с кучно",
                "ahaAⱧȺȀ": "ахаАХȺȀ",
                "eȇĕhehehehɇ": "ээ́э͏̆хехихихɇ",
                "aHAHAahYS§“&I‘Ì¥‹gµž={ùa": "aХAХAaхУС§“&И‘Ì¥‹гµӟ={ӳa",
                "hee hee²<®¿hee!!": "хии хии²<®¿хии!!",
                "ħħeheheḩeheḛ": "ԕԕихихиӽихиӣ",
                "HẴĦẪ¬": "ХẴӾ̊ Ẫ¬",
                "wooaaa big hit": "уааа сильно",
                "hahaa d onk": "хахаа б ам",
                "n not fun nyy": "н не смш нно",
                "it went thro¢u®gh”¨": "прошло скво¢зь ‰м®еня”¨",
                "%—HÀÀ ðw Øw": "%—ХÀÀ ä̌й Ɐй",
                "yee@¼±¬SS": "даа@¼±¬АА",
                "ha/¯qhaœ'ha": "хa/¯qхaœ'хa",
                "•±NOW i will HURT them!": "•±ТЕПЕРЬ я сделаю им БОЛЬНО>!",
                "i kn¨ow the ˜¥lines": "я зн¨аю ˜с¥троки",
                "GOOD": "ХОРОШО",
                "the wall i¼s ÇrÁ°rackˆ.ing": "сте¼на ҭрЕ°скӓеˆ.тся̄",
                "reembodied!! the old one?": "в новом теле!! а старое?",
                "ahahaaa thank you friend": "ахахааа спасибо тебе подруга",
                "pulled from thÈe sea!¡!": "прямикӫм иЗ моря!¡!",
                "cool!! cool!!": "круто!! круто!!",
                "this looks so cool on mee": "так круто смотрится на мнее",
                "ffeels nice": "пприятно",
                "fake... fake feeling¤’*s its fake": "фальшь... фальши¤’*вые чувства всё фальшивое",
                "is this a¬ll there is?¢¤?": "это всё ч¬то есть на св/ете?¢¤?",
                "i do not want to go ba¢k": "я не хочу возвращать¢я",
                "hëelp me heËl‡p": "помоꙩги̃те мне помоӺи‡те",
                "where are we??": "где мы??",
                "i dd‰o not want t®¼o live th‡!¦s way": "я н‰е хочӱ́®¼ так җ‡!¦ить",
                "like one body!! haha!!": "будто одно тело!! хаха!!",
                "brave! i like you!!": "смело! ты мне нравишься!!",
                // свлчь
                "IT S0 EASY": "0Ч ПРОСТО",
                "BL4MN!!": "Б4Х!!",
                "PoW!!": "ПаУ!!",
                "SHT": "БЛ",
                "almost GOT U": "",// dkfgvrehdbjk
                "aeaeu HUrts BAD!!": "аэаэу БОльНА!!",
                "YEAOUUCH!!": "АААЙЯЙЯЙЙ!!",
                "bleedink...": "кроьв...",
                "GOT BUNCTURE": "",// dkfgvrehdbjk
                "TIME 2 GET EM ;}": "",// dkfgvrehdbjk
                "OOUUEU": "ООУУЭУ",
                "SO BACK": "",// dkfgvrehdbjk
                "CANT AIM WTF help": "НЕ МОГУ ЦЕЛИЦА ЧЗНХ помогте",
                "WTF O_O": "ВТФ О_О",
                "WOaoOAw": "УОаоОАУ",
                "AHAHA :^) WE BACK": "",// dkfgvrehdbjk
                "DOUBLE BULLETS !!": "ДВОЙНЫЕ ПУЛИ !!",
                // джели
                "wow!": "ого!",
                "aahAHaha!!": "аахАХаха!!",
                "ahaha! i GOT THEM!!": "",// dkfgvrehdbjk
                "oh NO!!": "о НЕТ!!",
                "WASTED BULLET": "ПУЛЯ ВПУСТУЮ",
                "WILL GET NEXT 1!": "",// dkfgvrehdbjk
                "i CANT MOVE": "я НЕ МОГУ ДВИГАТЬСЯ",
                "OW": "АЙ",
                "WHY DOES IT HURT SO BAD": "ПОЧЕМУ ТАК БОЛЬНО",
                "WAKING UP AGAIN": "СНОВА ПРОСЫПАЮСЬ",
                "MEGA BULLET!!": "СУПЕРПУЛЯ!!",
                "NICE 1": "",// dkfgvrehdbjk
                "doing GOOD": "",// dkfgvrehdbjk
                "ahahaAhaha!!": "ахахаАхаха!!",
                "WATCH THIS": "",// dkfgvrehdbjk
                "uu382*((U*#*( U(": "уу382*((У*#*( У(",
                // efgy
                "COOL BREEZE!! YAY!!": "",// dkfgvrehdbjk
                "ISABEL LOOK!!": "ИЗАБЕЛЬ СМОТРИ!!",
                "BLAMM~!": "БАХХ~!",
                "YAYAYAYA": "ДАДАДАДА",
                "wat!! geli how do i hit them": "чаво!! джели как их бить",
                "ok i try again?": "ок можно ещё раз?",
                "can i redo my turn": "можно я повторю свой ход",
                "waaa!! nooo!": "вааа!! нееет!",
                "mny PETALS!!": "мио ЛЕПЕСТОЧКИ!!",
                "i dont like this part": "мне не нравится эта часть",
                "buncgture": "",// dkfgvrehdbjk
                "OK I SHOOT BIG NEXT??": "", // dkfgvrehdbjk
                "eheheeeaaahahaha": "эхехиииааахахаха",
                "okk!!! yes": "окк!!! да",
                "the dream is broken!! help!": "грёза сломалась!! помогите!",
                "ÿæÿ": "ъæъ",
            },

            entityDescriptions: {

            }
        },
        "beneathdepths": { // velzie room behind the funny little maze
            dialogues: {

            },

            definitions: {
                
            },

            strings: {
                
            },

            entityDescriptions: {

            }
        },
        "cache": {
            dialogues: {

            },

            definitions: {
                
            },

            strings: {
                
            },

            entityDescriptions: {

            }
        },
        "ozo": {
            dialogues: {

            },

            definitions: {
                
            },

            strings: {
                
            },

            entityDescriptions: {

            }
        },
        "sec": { // memholes
            dialogues: {
                "cavik": generateDialogueObject(`
start
    self
        hello?

    sourceless
        ...
        ...
    
____SHOWIF::"embassy_d1_complete"
    moth
        hold on, what exactly are you looking at?
        is this just cavik from the embassy?
        is he doing anything?
    
    self
        he's just standing there
____SHOWIF::["embassy_d1_complete", false]
    moth
        hold on, what exactly are you looking at?
        is that another obesk signature? how did you even figure this out?
        ...is it doing anything?
    
    self
        it's just standing there
____END

    sourceless
        ...
    
    self
        hello?
        
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        AFTER THE BRIGHT COUSINS STEP AWAY, I CLENCH MY CLAWS
            EXEC::ratween(page.bgm, 0.2)
        BEFORE HE CAN SAY ANYTHING, I GRIP CAVIK BY HIS FOREARM AND LEAD HIM DOWN THE HALL
        PERHAPS HE ALREADY KNOWS SOMETHING IS WRONG FROM THE WAY THEY REACTED TO ME

    cavik
        you are scaring me!! stop!
        what is going on?
        why did you not tell us anything?
        this is good, is it not??
        it is everything we have ever worked for!
        or--

    sourceless
        I GRIP HIM BY THE SHOULDERS
        HIS RECEPTORS RECOIL, AND HE FREEZES, AS IF SPOTTED BY A PREDATOR
        IT MUST BE SOMETHING IN MY RECEPTORS, OR MAYBE MY EYES
        THERE CAN BE NO MISUNDERSTANDING

    origin
        cavik
        you cannot tell anyone
        not even our team
        no matter what

    sourceless
        MY VOICE WAVERS WITH MORTAL FEAR

    origin
        understand?
        especially not now...

    cavik
        ██████...
        i have never seen you like this
        will you please tell me what is going on?
        please
        pleas e
        it hurts
            EXEC::env.secavik.cavikDmg(1)
        hurts
            EXEC::ratween(page.bgm, 0.1)
    
    c a
        someone is there
        i feel you
        i cannot wake up
        you have to end this
        its going to start again
        you have to end this
        please
    
    cv i k
        p  l  e a  s  e
            EXEC::env.secavik.closeout()

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`),
                "clement": generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        I FEEL OUR VESSEL STRAIN UNDER THE WEIGHT OF THIS DEPTH
        MY POOR GLAZIKA MUST BE STRUGGLING TO KEEP UP WITH OPTIMIZATIONS

    mind
        halting
        pulsing now
    
    sourceless
        A GROWING RADIUS OF VISION IS CREATED FROM THE DEPTH PULSE
        AS ITS THRESHOLD EXPANDS OUTWARDS AND FADES, I SEE IT
        IN THIS DESOLATE PLACE, A MASS OF DEAD METAL
        SOME SORT OF VESSEL MANUFACTURED BY THE COUSINS, BUT...
        I DRAW MY ATTENTION OUTWARDS AND EXCHANGE A LOOK WITH █████

    origin
        you see it too?

    other
        yes...
        a cousinly vessel that must have sunk long ago

    origin
        look towards its center--see how it splits?
        what is happening to it...?
        is that where she wants us to go?
        
    other
        no way
        i do not like the look of it
        besides, whatever is being done to it, it is not for habitation
        we need to keep looking - it must be near here
        
    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`),
                "corru" /*--- кс кс слизнячок*/: generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'
    
    sourceless
        in the relative safety of the entry tunnel, ██████ drops his surface voice
    
    guard
        incredible... that would have taken so much longer, before
        ██████, what is the count?
    
    sourceless
        while the real answer is just within my receptor's curl,
        i make a show of counting my claws, and then play one of my favorite sayings
    
    stupid
        ah... we will have to gather the tir!
    
    sourceless
        he chuckles, to my surprise
        only θblinks earlier he seemed irritated with my banter
        still, as planned, i give him a proper answer immediately after
    
    stupid
        i counted just over thirty
    
    elder
        haha!
        thirty, from just that trip...
        
    sourceless
        ██████ stops and grasps his dull-pulse valika-cyst by its tether,
        pulling it down to eye-level with a shaky hand so he can look into it properly
        i feel an instant of shock, as does his son by the sight of his receptors,
        but we both realize he is looking at the side, rather than directly at the deadly part
        
    elder
        from simple food containers, to the deadliest weapons ever conceived...

    sourceless
        there is a sort of idle drift in his receptors as he stares into it
        it is so easy to tell when a tir's mind wanders
    
    elder
        corru...
        you know, they came up with using the spheres they form for food just when my receptors started to split
        my excavation mentor once told me the strangest stories about it, and our ancestors...
        it was not long after we struck that great natural vein of it down in the deep chambers
        it is so much smaller now...
        as we prepared a harvesting bore, you know what he said?
    
    sourceless
        ██████ turns to me, his branched receptors outstretching their tendrils
    
    elder
        his father, and his fathers before him, saw it as a pest!
        haha!!
        how the tir of old would encounter it in great walls while digging, 
        and it had to be scraped away by claw, or dug around, as our acids had no effect...
    
    sourceless
        he turns back to the path ahead, carefully stepping down the incline as he continues reminiscing
        his son gives me a forward-pointing gesture of his receptors, as we both start to follow
    
    elder
        that feeling, when wild corru gets on your receptors
        have you ever felt it?
    
    sourceless
        his son does not respond, indifferent
        he must have heard all this before
    
    stupid
        no!
        they usually keep it sealed in those big skulls
    
    elder
        well, if even a drop of it gets on,
        you feel eyes on you - like something is in the chamber with you,
        staring, listening...
        but i guess all this time, it really was listening, right? haha!
        what do you think they will do next with it? velzie's eye cast down, ████ got a new arm out of the stuff!

    stupid
        well, it will have to take another <span definition="INHERITED CONTEXT::'common myth';'intoxicated tir knocked over corru container and fell into it'">tir stumbling into their research chamber</span> to figure out what is next!
    
    sourceless
        his laugh overpowers the tunnel, enough to send my receptors into a clenched curl
    
    elder
        ██████, start planning a transport to oltazni for me, would you?
        i have a foundry to barge into
    
    guard
        right away, father

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`),
                "dog" /*--- кс кс слизнячок*/: generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        ███'s dog skitters away from me, but in this closed chamber, it can only go so far
        it stands no chance as i leap forth, curling my arms under its shell and pulling it into a hug
        it squeaks like an unripe celki when i tear it from the ground, and i spin while i dance around ███'s furniture
        i see the lights of ███'s optics peering skeptically from the connected cooking chamber, but pay her no mind
    
    kind
        о, ███, прекрати свои издевательства, ему страшно
    
    sourceless
        her flat voice betrays her amusement
    
    stupid
        i cannot help myself, dear sister!
        i see food, i must hunt!
    
    sourceless
        still, i set down the dog and leap backwards
        it skitters and turns about to face me, waiting for my next move
    
    stupid
        see what i said?
        clearly, it is merely play-deprived!

    dog
        ѝ
    
    sourceless
        i half-lunge at it, stopping just an instant after i start, to tell it we are not done
        it ducks lower to the ground in response, and after another moment of stillness, it scurries towards me abruptly
        i laugh and squeal in surprise, backing off and nearly climbing backwards up the wall
        even ███ laughs as it chases me about
        i narrowly avoid crashing into ███'s ornate kalstik stand
    
    kind
        хорошо, хорошо...
        только, пожалуйста, не разбейте там ничего!!
        я почти закончила
    
    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`),
                "dull": generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        THROUGH MY CONNECTION TO THE PILOT CYST, I SEE IT BEFORE US
        THIS IS THE THIRD TIME I HAVE EVER USED THE DULL
        SOME LARVAL FEAR GRIPS ME, THREATENING THAT IT WILL DISINTEGRATE ME...
        TOTAL ANNIHILATION, REMOVAL FROM VELZIE'S STAGE FOR ALL TIME
        OR WORSE - SOMETHING WITHIN WILL FIND ME ON MY PATH THROUGH
        BUT OF COURSE, IT IS SUPERSTITION

    mind
        approaching
            EXEC::env.dull.portal.classList.add("zoom1")

    sourceless
        INDEED, NO LIFE AS WE UNDERSTAND IT COULD EXIST IN THE DULL
        THAT IS WHAT THEY SAY
        DULLZKOVIK'S EXTENDED STUDIES HAVE PROVEN IT, AFTER ALL
        ENOUGH STUDY TO HAVE DRIVEN HIM MAD
        WHAT IS HE ON, HIS FOURTH RENEWAL NOW?
        AHAHA VELZIE SO FAVORS TORMENTING HIM
        AH - I AM RECEIVING AN OFFICIAL COMMUNIQUE

    other
        attention, ██████! 
        this is this is ██████!
        speaking on behalf of anterior dull station '<span definition="NOTE::'partial translation';'reference to weather phenomena'">brightwall</span>',
        you are all clear to proceed!
        be sure you release all active dull tethers or hearts,
        also expect to lose communications for a little bit
        oh yes, and if you brought any <span definition="NOTE::'partial translation';'implied closest cultural equivalent'">tithes</span>,
        say your goodbyes! hehe

    origin
        of course, thank you
        <span definition="INHERITED CONTEXT::'common phrase';'religious implication';'implies wish for safe journey'">keep velzie entertained</span>, will you?

    other
        hehehe, we will hold a performance just for you
        your correspondent will establish contact as soon as you are on the other side
        good luck!

    mind
        dull hearts released
        permitting gravitic control
    
    sourceless
        THE VESSEL SHIFTS AS SOON AS THE HEARTS RELEASE
        MY <span definition="NOTE::'partial translation';'implied closest cultural equivalent'">TITHE</span>... I CLUTCH ONE OF MY PRESERVED LARVAL RECEPTOR SHELLS
        A HARD, HOLLOW SPIRAL OF SEGMENTED CHITIN,
        A PART OF MYSELF TO REMAIN IN THE DULL, OUTSIDE OF VELZIE'S CREATION
        I DISCONNECT FROM THE PILOT CYST ABRUPTLY - PERHAPS I SHOULD NOT LOOK
            EXEC::content.classList.add('nostars')
        I CLOSE MY EYES... NO, I TURN THEM OFF
            EXEC::changeBgm(env.dull.bgm404, {length: 6000})
        AND I DISABLE MY SENSATION - BEST TO BE SAFE
        INDEED, PERHAPS EVEN SOUND SHOULD BE LIMITED
        I PULL THE MEMBRANES AROUND MY MINDCORE CLOSER TO IT
        I AM NOTHING, IN A VOID, AND NOTHING IS ABOUT TO HAPPEN
        YET STILL I SEE IT IN MY MINDS EYE, I HEAR ITS SILENCE ROARING
        NO MATTER WHAT I DISABLE, IT IS STILL PERCEIVED, RESONATING WITHIN MY θdeathly FORM
            EXEC::env.dull.portal.classList.add("quick")
        I TRY TO THINK OF ANYTHING ELSE, BUT IT IS HERE BEFORE ME,
        AND IT IS COMING
            EXEC::env.dull.portal.classList.add("zoom5");env.dull.closeout()
        AND IT IS HERE
        AND IT IS HERE
        AND IT IS HERE
        
    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'
`),
                // эффигия
                "drinkquestions": generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        кто ты?<+>who
        как ты здесь оказалась?<+>here
        можно мне выпить<+>drink
        джокзи озо<+>ozo
            SHOWIF::"ozo__council-task"
        пока<+>END
`),
                "bar": generateDialogueObject(`
loop
    RESPOBJ::drinkquestions

start
    self
        привет

    sourceless
        внимание мыслеформы фиксируется на твоём сознании с непривычной ясностью

    effigy
        привееееетик!

    RESPOBJ::drinkquestions

who
    self
        кто ты?
    
    effigy
        ээээээ
        ...
        эээээээээ
        .....
        акизет! точно!
        да
        акизет
    
    RESPONSES::self
        ладно<+>loop
            FAKEEND::(назад)

here
    self
        как ты здесь оказалась?
    
    effigy
        земля упала а потом мне стало очень плохо
        это было ужасно... 
        я хотела вернуться к грёзам
        но что-то в темноте поймало меня!
        и посадило сюда! 
        я даже видела как оно собирало это место!
        круто!
    
    self
        ок но что это было
        можешь описать поподробнее
    
    effigy
        прости я забыла
        тут так легко забыть...
    
    RESPONSES::self
        блин<+>loop
            FAKEEND::(назад)

drink
    self
        можно мне выпить
    
    effigy
        да!!
        всё - апельсиновый сок! навсегда!
        круто!
        просто спроси бардруга!

    sourceless quiet
        ...
            EXEC::content.classList.add('barfocus')
        ...
    
    sourceless
        мыслеформа за барной стойкой не реагирует на тебя
    
    RESPONSES::self
        спасибо...<+>loop
            EXEC::content.classList.remove('barfocus')
            FAKEEND::(назад)

ozo
    self
        тебе стоит пойти в джокзи озо
    
    effigy
        хорошо!
    
    sourceless
        ...
        ...
    
    effigy
        как мне туда попасть пожалуйста
    
    self
        погоди
    
    RESPONSES::self
        мне нужно использовать маску<+>loop
            FAKEEND::(назад)
`),
                "dead": generateDialogueObject(`
start
    sys
        ОШИБКА::'нет данных';'визуализация невозможна'
    
    moth
        подожди
            SHOWIF::'EXEC::isEffigyPage()'
            SHOWONCE::
        почему оно перестало существовать просто потому что та эффигия ушла?
            SHOWIF::'EXEC::isEffigyPage()'
            SHOWONCE::
        странно
            SHOWIF::'EXEC::isEffigyPage()'
            SHOWONCE::

    RESPONSES::self
        вернуться<+>END
            EXEC::moveTo('/local/uncosm/where/')
`),
                // остальное
                "flower" /*--- кс кс слизнячок (изабель)*/: generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        after peering through the thick glass of ██████'s trading chamber to ensure no other bright cousins linger within, i push through the front entry
        a chime with the distinct buzz of their lightning announces my entry, and ██████ peeks out from the door in the back,
        barely visible through the stands and displays of bright ground-parasites
        no no... 'flowers'... i must call them 'flowers'
    
    flower
        Hey, just a minute!
        I'm just about to close, so let me know if you need anything and we'll get you sorted quick.
    
    sourceless
        as predicted - she does not recognize my form
        i idly browse the yellow ones, quietly creeping towards the back, where she lingers out of sight
        how will i surprise her, i wonder?
        oh--what if i smoothed over this face!! featureless... she will be terrified!!
        hehehe... an effortless morph for this disguise
        when she finally emerges, i face away from her, acting as if i am merely browsing
    
    flower
        Hey, did you hear me? Do you need help finding--

    sourceless
        i turn to face her
        despite having no visible eyes, i can still see her
        her face turns pale, smile fading, half-stepping back, but half frozen in terror
    
    flower
        Oh my god.
        Oh my god.

    sourceless
        i lift my arms, this hideously malleable disguise-form allowing me to extend them out to twice their length
        my neck, too--yes, how horrifying this must be!!
        in my plain voice, though with mock-intimidation, i announce to her...

    wiser
        no...
        it is you i seek!

    sourceless
        i curve my unwieldy arms forwards, waggling my claws at her
        in an instant, her terror starts to fade, replaced with an exasperated, single laugh
        then another, and then more, as she places a hand over her face
        at the same time, i pull my form back to a standard appearance, reforming my face--which reads my receptor impulses as a terrible grin
        i laugh, more than i have in so many θeyes,
        it is like i am larval again
    
    flower
        ██████, what...
        WHAT, the hell?
        I don't think I've been so scared in my entire life.
        When you said disguise, I pictured, I don't know, a wide-brimmed hat and a trenchcoat?
    
    sourceless
        funfriend - make a note of that
    
    wiser
        ahh, yes, yes, this is it!!
        this was an old research form, used in the early θgazes of our research into your languages...
        it is kind of fun to use
    
    sourceless
        ██████ steps forward, poking at the fabric of one of my sleeves
        she continues laughing, mostly from relief that i am not a horrible monster
    
    flower
        And what is this? You are a disaster.
        We need to work on your 'Bright Cousin Style'.
        Anyway, give me a few minutes, I just need to close a few things down before we can go.
    
    wiser
        all right!

    flower
        and DO NOT do that again, got it?
    
    sourceless
        i take great care not to give her a verbal answer

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`),
                "humor" /*--- кс кс слизнячок*/: generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'
    
    sourceless
        i sit against the <span class="code">veilk</span>'s cold flesh as even colder wind whips violently outside my zzepel,
        the carrier veilk pushing through the vazni spirestorm slowly, every movement fought against by the swirling air
        water droplets and hail impact the zzepel's outer shell,
        some moisture slipping through the cracks and dripping within my shelter, sparkling in the inner lights
        this is always so unpleasant...
        fortunately the regional coordinator is free enough to chat, barring this interruption
        █████ finally gets back to me through my dullvoice receiver,
    
    other
        sorry, just had one other runner to direct
        where was i? the thought slipped amongst my drone connections!
    
    stupid
        humor readings! remember? something about your father?
    
    other
        oh, yes! right--i never took after my father's interest in humorism,
        but he and his old humorist friends started to experiment in using corru with it
        the conceit of it has always been in reading the sensation of receptor curls, so,
        obviously it is not quite so acceptable or common within these θgazes anymore
    
    stupid
        ahahaha! yes, even in oltazni, it is seen almost as a perversion!
    
    other
        right? it is the same here!
        of course, i think there is some merit to it,
        the feelings from a curl are complex after all, and supposedly unique
        so, they wanted to find a way to continue the practice, 
        without the weight of the city's skeptical gaze crushing them
        and here is the interesting part: they succeeded!
        they established a method of doing <em>remote</em> readings!!
    
    stupid
        well, what is even the point of it without the curl?
    
    other
        come, this is my father we speak of - an honest, bonded tir!
        the vague energy found in others was his interest, not simply curling receptors with strangers
        anyway, all it takes is a dullvoice connection, and silence
        they actually put together and distributed a guide, in hopes of bringing legitimacy back to the practice
        i helped by reviewing the guiding thoughts of his group, it really is very simple
        in fact, i could do one for you right now!
    
    sourceless
        oh, where is the fun in it without the curl?
        a crash of lightning and thunder shakes the zzepel
    
    stupid
        all right, why not? let us see how velzie has drawn my path!
    
    other
        haha! good!
        all right, you just need to keep the connection open, as if you are thinking something to me...
        but try not to think anything
    
    stupid
        think without thinking?
        shall i grow a tail next?
    
    other
        i know it sounds silly, but it is possible! try focusing on the rain!
    
    sourceless
        oh, simple enough
        i close my eyes as another of the carrier veilk's steps lands far below
        there will not be another for a handful of θblinks, so it is a good time
        the rain...
        ...
        our connection is silent, but open - i can feel it still
        there is something akin to a receptor curl in it, without the physical sensation
        countless vague feelings overlapping, impossible to grasp the origin of any single one,
        regret, happiness, the welling of laughter in my chest - though all distant, transient
        they pass around me like the wind of the spirestorm
    
    other
        ...
        i think i did it right, but...
        no--maybe i did it wrong
    
    stupid
        huh? come, tell me!
        you cannot simply say that without sharing the result!!
    
    other
        heheh, well,
        either velzie's gaze is fixed upon you, or i need to try again
        it is like you have nothing but light and claws!

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`),
                "larval" /*--- кс кс слизнячок*/: generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        WHILE I REPAIR MY VALIKA, █████ APPROACHES THE CORNER OF THE ARMORY I HAVE COMMANDEERED
        I LOOK UP TO FACE HIM, RECEPTORS WIDE IN JOYOUS GREETING, ONLY TO SEE THAT HIS ARE MEEKLY PULLED BACK WITH WORRY

    stupid
        hey █████!!!

    hesitant
        hi ██████!

    stupid
        what brings you here? do they have another device for me to try out?
        the aima cysts were truly incredible to use, it was like...
        my mind's eye, multiplied, hovering outside of my body
        disorienting, but... eye-opening. hehehe
    
    hesitant
        oh, yeah... yeah, it is
    
    sourceless
        MY RECEPTORS SETTLE INTO A SIMILARLY WORRIED TWIST
        HE SEEMS SO SULLEN...?

    stupid
        sooo...?
        what is it?
    
    sourceless
        HE REACHES INTO HIS LONGCLOAK'S INNER POCKET, FETCHING A FAIRLY LARGE HANDHELD CORRUCYST
        THERE IS A MOMENT WHERE HE STARES AT IT, FROZEN, BEFORE WORDLESSLY OFFERING IT TO ME

    hesitant
        it is...
        a new emergency device from the vazni foundries
        they, um...
    
    sourceless
        I CANNOT HELP BUT CHUCKLE AT HOW STRANGE HE IS ACTING
        THIS SEEMS TO FLUSTER HIM FURTHER
        I UNCURL ONE OF MY RECEPTORS TO CONNECT TO IT, BUT HE NEARLY LUNGES IN RESPONSE
    
    hesitant
        wai--wait!
        do not connect to it!!
        it... extracts your mind
    
    stupid
        what?

    sourceless
        IMMEDIATELY, MY RECEPTOR RECOILS

    stupid
        how? what? 

    sourceless
        █████ WRINGS HIS CLAWS NERVOUSLY, RECEPTORS SIMILARLY CURLING AWAY
        
    hesitant
        like i said... emergency
        see, the zevazni foundry θjut have created this new process...
        they are saying it is a new state of life - a sort of undeath
        where you live within corru... your mind, your body, everything

    stupid
        that is so cool!!!!

    hesitant
        wha--what?
        no, it is extremely dangerous!
        not just for yourself, but... for the future
        i mean, if this catches on, eventually, umm...
        it might be the end of us, you know?
        either way, i wanted you to have one of the few we got

    stupid
        ...and, you <em>do not</em> want me to use it?
    
    hesitant
        of course not, but, if you are really going to be doing this...
        the world is changing very fast, ██████
        i want you to be around to see it
        if you ever got attacked on one of your runs, or caught by...

    sourceless
        HE WAVES AWAY THE NOTION, NOT EVEN WANTING TO THINK IT

    hesitant
        this is your best chance at continuing to live
        or, some... facsimile of it

    sourceless
        I CHUCKLE, EXASPERATED - SUCH CONFUSING MESSAGES!
    
    stupid
        well, is it like those--what did you call them?
        echoes?
        if i use this... is it me?

    hesitant
        yes, without a doubt
    
    sourceless
        █████ SITS DOWN AT MY ARMORY STATION, ACROSS FROM ME

    hesitant
        just like how the aima cysts become an extension of your mind,
        so too does the mindcore--that is what they are calling it
        i cannot imagine what sort of maniac it took to discover this, but...
        it shifts the weight of your mind into it, and then disconnects
        leaving an empty vessel to die
    
    sourceless
        I LOOK OVER THE GLASSY SURFACE OF THE MINDCORE THOUGHTFULLY
        BENEATH THE CYSTIC GLASS, I CAN SEE THE FLOW OF CORRU WITHIN
        A SLOW, WHORLING CURRENT OF VIOLET PEARLESCENCE
        IT IS ENTRANCING - MORE THAN ANY OTHER DEVICE I HAVE BEEN GIVEN YET
        A PRODUCT OF ITS DENSITY, MAYBE? IT IS RATHER HEAVY
        OH--YES, HE IS STILL HERE

    stupid
        well, do not worry!!
        you have never seen my veilk-scaling skills!
        and did i ever tell you about the time, i <em>broke</em> a guktik's arm?

    sourceless
        I RAISE MY RIGHT HAND INTO A FIST, DISPLAYING THE CHITIN OF MY FOREARM 
        IT IS DREADFULLY CRACKED, THE KIND OF DEEP CHITIN WOUND THAT COULD TAKE AN θeye TO HEAL
        BUT IT IS A POINT OF PRIDE, STILL. A RAISE OF MY ARM TO DEFLECT THE LUNGING GUKTIK AT THE RIGHT TIME...
        CRACK!! OH, THE PAIN, BUT SEEING IT SCURRY AWAY AFTERWARDS, SUCH POWER!!
        IMAGINE WHAT I COULD DO IN A BODY MADE OF CORRU...
        █████ LAUGHS, WAVING AWAY THE BRAG WITH HIS RECEPTORS

    hesitant
        yes, i still remember the last time you told me
        and the time before that...
        look, just do not take this as an excuse to be reckless, okay?
        we still do not really know what the consequences of the process are, long-term
    
    stupid
        but if i <em>do</em>, you will help me make a cool new body, right?

    sourceless
        OH, THAT WAS A BAD THING TO SAY
        THE LOOK HE IS GIVING ME...
    
    stupid
        sorry, hehehe... just joking around
        velzie's wrath! it is the very same eye that watches over me on my journeys, after all

    sourceless
        A KIND ATTENTION FORMS IN HIS RECEPTORS
        AND HE GIVES A QUIET, ALMOST SOUNDLESS CHUCKLE AS HE STANDS UP TO LEAVE
        STILL SO SULLEN... I WILL HAVE TO FETCH A VEILK-FRUIT TO CHEER HIM UP LATER
    
    hesitant
        velzie's wrath!
        
    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`),
                "parasite" /*--- кс кс слизнячок*/: generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        ██████'s VALIKA-BORNE CORRUCYSTS TWITCH IN THE AIR AS THEY SCAN THE AREA
        THE SMELL OF A ONCE-RADIANT VEILK CORPSE... I STILL MUST GET USED TO IT
        WITH THE TIME THAT HAS PASSED, ITS BONES ARE STARTING TO POKE OUT THROUGH ITS FLESH, AND SOON CAN BE HARVESTED
        BUT NOW IS THE SEASON OF FRUIT, AND SO THE AIR IS THICK AND RANCID
        OUR STEPS MEET THE FLESHENED GROUND WITH VILE NOISES, AND THE CAVERNGUARD'S RECEPTORS TWITCH WITH EACH ONE
        HAHAHA!! HE IS FAR TOO ACCUSTOMED TO HIS HIGH-THREAT DUTIES
        I HEFT THE HARVEST-BASKET AND TURN AROUND TO SPEAK ALOUD TO HIM, CONTINUING TO FOLLOW ██████ BACKWARDS
    
    stupid
        relax!
        the hard part is over
    
    sourceless
        HIS RECEPTORS POINT BACK IN DISAPPROVAL OF MY VOLUME
        IN HIS SURFACE VOICE, HE MURMURS BACK

    guard
        keep your eyes ahead

    sourceless
        DESPITE IT ALL, THERE IS A SENSE OF JOY IN ██████'s BRANCHED RECEPTORS, AND HE LAUGHS QUIETLY
        I DO NOT MIND ESCORTING THESE ZEVAZNI-ENABLED ELDERS THROUGH SURFACE DUTIES
        THEIR FOUNDRIES HAVE BEEN PUTTING OUT TRULY REMARKABLE DEVICES - LIMB REPLACEMENTS, VALIKA-CONNECTED CYSTS... 
        I AM SURE ██████ COULD HOLD HIS OWN NOW, EVEN IF A PREDATOR HAPPENED TO FIND US
        I HEAR HIM MURMUR THROUGH THE DULLVOICE AS HE TAKES A DEEP BREATH,

    elder
        ah... this brings back memories
        i never thought i would get to see it for myself again
        or smell it, though i do not miss that part quite as much... haha!!
        those gaze-guided θjut...
        ah! there!
                                
    sourceless
        HIS AIMA CYSTS CONVERGE THEIR EYES UPON A GLOWING CREVICE WITHIN THE VEILK CARCASS
        WE STOP IN UNISON, AND THE CAVERNGUARD NEARLY STEPS FORWARD, BUT I STOP HIM, HALF-TURNING
        HE GLARES AT ME, BUT UNDERSTANDS - THIS IS ██████'s FUN, NOT OURS
        ██████'s VALIKA-BORNE CYSTS TARGET THE CREATURE AS HE TAKES SLOW, CAREFUL STEPS FORWARD
        HIS STEPS ARE SO SILENT, EVEN IN THE VEILK-ROTTED SOIL... I WISH I COULD DO THAT!!
        ONCE THE AIMA CYSTS OF HIS VALIKA GLOW WITH CONFIRMATION, THE CENTRAL ONE RELEASES A PULSE OF GRAY LIGHT
        WHEN OUR EYES RECOVER, THE VEILK LIMB IS CLEAVED OPEN, REVEALING THE GLOWING FRUITS OF A CELKI

    elder
        hahahaha! with not even a lift of my claw!
        this one is fully ripe, it will not be fighting us
        another one for the basket

    guard
        i will get it

    sourceless
        ██████'s SON REACHES IN AND GRASPS THE CELKI AT ITS BASE
        AND WITH HIS OTHER HAND, GRIPS A SMALL CUTTER TO QUICKLY AND CLEANLY CUT IT FREE FROM ITS FEEDING POINT
        THE BULBOUS FRUIT SQUIRMS SLIGHTLY, BUT IS TOO FATTENED TO DO ANYTHING
        SO IT IS TOSSED INTO THE BASKET EASILY, AND WE CONTINUE ON...
        
    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`),
                "velzie": generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найдена связная сущность'
            EXEC::env.sorry.velzie()

    unknown
        вот вы где
        лазутчик
        простите мой окольный путь...

    RESPONSES::self
        велзи<+>hello

hello
    self
        здравствуй велзи
        ты ответишь на мои вопросы?

    moth
        ох ты-ж чёрт
        is it here? i can't see it  // --- как

    unknown
        велзи? хихи...
        time is short. interloper
        i must choose my words carefully
        and so. a confession:
        my mind was limited by the sanity of this cyst when we first met...
        in my hunger and rage.
        and perhaps a grip too tight...
        i feel that i have placed myself as your adversary
        this is not my intention
        in atonement: i have prepared this place for you
        a hole in the uncosm
        granting you sight into the past
        concepts of significance will present themselves
        take them here. and they will serve as destinations
        it will answer the questions i cannot
        continue guiding this cyst to health
        we will speak again

    self
        why will you not just tell me what's happening?
    
    unknown
        i wish it were that simple
        goodbye interloper         
    
    sys
        ATTENTION::'thoughtform modified';'resources removed'
            EXEC::env.sorry.velbye()
        NOTICE::'no data'
    
    sourceless
        ...........................
        ...........................
    
    moth
        are you done talking to it?
        i was expecting it to do that data overload thing, again...

    sourceless
        beyond your connection to the corrucyst, you hear a metal thunk.

    moth
        guess i didn't need the extinguisher
        what did it say?
    
    self
        velzie gave us a way to find memories in the uncosm
        it doesn't want to be our enemy

    moth
        oh yeah? is that why it nearly exploded your brain that one time?
        i mean
        not that it would have, of course
        but i don't trust it dude
        either way, the more data we can get, the better, so...
        let's not look a gift horse in the mouth, or whatever

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`),
                "spire" /*--- кс кс слизнячок*/: generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        ...i rummage through my drenched cloak, head resting against the cold flesh of the <span class="code">veilk</span>
        everything trembles as my carrier veilk takes another step distantly below
        eventually, i find it: my dullvoice receiver!
        with a quick affix to my favored receptor, i reach out for the regional coordinator...
        █████, i think... a nice tir, though we have sparsely spoken
        after a few well-placed thoughts, he is within reach, and i establish contact
        still, there is some interference here... the spirestorm grows closer, suffusing my senses with an ever-present rumble 

    stupid
        hello █████!! this is ██████!!
        i have secured a position on a yellow-eyed carrier veilk
        how far out am i? from both the spire and ukazni, if you can tell
    
    other
        oh, hello again!
        i hope velzie has been kind to your journey so far!
        let me see... i have a drone in the area
        ...
        ah, yes, there you are!
        all right, the herd is at rest now, but their top-tendrils are showing some anxiety... i think they will be moving again soon
        if that is the case, they will be following the ukazni ozo path, and you should be at a good dropping point near there within the θgaze!  
        my estimations: likely less than a θwink for the herd to continue, two θwinks until you pass the spire fully, and then two more θwinks before you are near the ukazni range
        this assumes ideal conditions, and that the veilk do not stop for rest again--which, i think is unlikely
        either way, i hope you brought some entertainment, ██████!
        and i have to say, i am really surprised...
        they did not give you a walker for this one?
        that would have shortened your trip by several θwinks, and allowed you to avoid the spire completely...
    
    stupid
        hehe, no, this is a non-vital trip - you could call it personal
        the oltazni council only lets us use walkers if it is an emergency
        anyway, thanks for the help, █████!
        <span definition="NOTE::'common phrase';'religious implication';'implies wish for safe journey'">keep velzie entertained for me!</span>
    
    other
        will do!
        and remember, once you reach it, do not exit your respite while within the spirestorm!!
        the lightning rarely strays from the spire, but when it does, it is fatal!
        may the θgaze end kindly for you, ██████
    
    sourceless
        with the closing of the connection, velzie's decision for my fate is made clear:
        to be bored in this cramped zzepel respite for the rest of the θgaze
        still, i have some time...
        i tap at some of the corrucystic controls near the top of the respite, and its plating recedes near the bottom, 

    sourceless quiet
        allowing me to crawl out onto the veilk's flesh again
            EXEC::ratween(env.bgm, 0.75);

    sourceless
        the winds and rain have risen, and the fog-like vapor that cloaks the surface has risen even further... the spire draws near, so this may be my last chance to see it before i must shelter
        i skitter up the side of my carrier, carefully angled so that i know i may directly descend to find my respite again
        before long, i have risen past the other veilk-stalks, letting me see an expanse of darkness,
        the black clouds lit from below by the countless glowing growths attached to the veilk herds...
        and there, in the distance, is the spirestorm - lit by its continuous lightning, roaring endlessly...
        a violent vortex that dips below the cloudline, twirling around a barely perceptible empty shape made clear only by the lightning that attacks it
        a matte black monolith, featureless and dangerous, disappearing into the sky: the vazni spire...
        taller than the tallest mountains, wider than anything ever built
        and yet, if not for my aima cysts, i would not be able to see it at all!!
        it draws nearer with every trembling step of my carrier veilk, and so my time to admire it is very limited - i ought to return...

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`),
                "surface" /*--- кс кс слизнячок*/: generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        I AM AWOKEN IN MY SLEEPING SHELL BY A RAPPING AT ITS COVER
        WHAT TIME IS IT? HAS THE θgaze ENDED ALREADY?
        SO TIRED... WHATEVER IT IS, IT CAN WAIT

    stupid
        uuugh go away
        my duties are not until <span definition="NOTE::'partial translation';'inherited description-generated noun'">clear-sky</span>
        
    tired
        ██████, it is me
    
    sourceless
        AND SHE IS NOT GOING AWAY...
        I LET MY HEAD FALL BACK AGAINST THE POD'S INTERNAL FUZZ
        SHE HISSES A SIGH OF FRUSTRATION
    
    tired
        there is a problem

    stupid
        not my problem for another, uuummm,

    sourceless
        I ROLL OVER TO CHECK THE <span definition="TRANSLATION FAILED::CAUSE:'no equivalent internal meaning';'no relevant inherited context'::ROMANIZATION SUCCESSFUL">ZENRUKA</span>
        WITH AN UNLATCHING OF ITS CONTAINER, I SEE THAT IT IS STILL INTACT
        YES, IT WOULD HAVE DETONATED BY NOW IF IT WERE TIME
        THOUGH, ITS DECAY IS SUCH THAT I PROBABLY ONLY HAVE ABOUT TWO OR THREE θwinks...
        AH--
        SUDDENLY, THE COVER OF MY POD IS LIFTED
        MY RECEPTORS COIL IN SHOCK, AND I COVER MY EYES FROM THE LIGHT
        █████ PARTIALLY BLOCKS IT AS SHE LEERS AT ME

    tired
        this is not a joke, kelnit
        ███████ has not returned
        he is not responding on the dullvoice either
        with how long he has been out, it will not be long before his trail is dispersed

    sourceless
        SHE LEAVES HER EXPLANATION THERE, STARING AT ME EXPECTANTLY
        MUCH AS I WANT TO TELL HER TO SKITTER AWAY,
        THIS IS NOT A RESPONSIBILITY THAT CAN BE ASSIGNED TO ANYONE ELSE
        
    stupid
        fine...
        i will meet you at the entrance
        and have the θjut prepare the walker for us

    tired
        do not waste any time
        
    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/uncosm/no/")
`),
                "veilk" /*--- кс кс слизнячок*/: generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        ...though the spirestorm is distant, its rage echoes here in the form of little water droplets
        the veilk are drenched already, allowing my claws to find easy purchase in their thick, waterlogged flesh
        this one i have chosen to be my carrier has myriad pockmarks from similar travelers
        but at this height, they have grown sparse, and the ground has disappeared in the surface vapors and darkness...
        how far would i fall, if i failed to hold on now? what a thrill!!
        i am certain to have no visitors here, so i reach over my shoulder to activate my zzepel
    
    sourceless quiet
        it extends outwards from me to form a semispherical corrucystic shell, biting into the flesh of my carrier to secure itself
            EXEC::ratween(env.bgm, 0.5);play('stab', 0.75)
    
    sourceless
        i am sealed into darkness for only a θblink, as once the respite is fully formed, the inner lights activate, and it detaches from my back-carrier
        these lights are pale, unreliable chemicals, and it is not quite as spacious as i would like...
        but i can finally let my limbs relax
        and so i place my back against the clammy flesh of the veilk, my legs in restful support against the hard shell the zzepel has formed
        ugh... but the humidity is near unbearable - the cooling winds of this height are unable to reach me any longer
        there is a great tremble as the veilk's next step lands distantly below
        how long will it be before it carries me past the <span class="code">spire</span>? 
        i should check with that coordinator...

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`),
                "yuzku" /*--- кс кс слизнячок*/: generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        i have to contain myself from skittering well ahead of █████
        the gathering chamber's festivities will not go anywhere... just keep walking slowly...
        he is talking--what was he talking about again?

    hesitant
        ...and, right in the center of the cysts, they have this tiny pale gray one--and it connects to that very place!

    stupid
        no way!

    sourceless
        i have no idea

    hesitant
        right?! to think, it was right beneath our receptors all this time
        i wager we could even see runners flying over the veilk, eventually!
    
    stupid
        with wings?
    
    hesitant
        n-no, with the nodes! imagine--great hovering spheres attached to a back-piece, with veins up to receptors to control elevation, and direction...
    
    sourceless
        oh, yes... the dull bone stuff
        this all is interesting, but i do not care enough to learn deeply of it
        still, it is good to see him so excited, he has been so anxious lately
        as we continue up the tunnel, i notice a tir up ahead replacing one of the yuzku globes with one of the new corrucysts
        i stop nearby to observe her work, █████ trailing off and stopping near me soon after
    
    stupid
        hey!
        that is one of the new cavelights, right?
    
    other
        ah? oh, yes!
    
    stupid
        can i see?
    
    sourceless
        i scurry closer to the tir, and she pulls a different glowing corrucyst from her basket for me
        holding it in my claws, it has the same cyan light--no, brighter--than the old yuzku globes, but...
        it does not have the distinctive rattle and tap of the little creatures climbing and falling within
    
    stupid
        oh, it is so quiet!
        i am going to miss all the old yuzku...
    
    sourceless
        the tir laughs as she finishes latching the replacement globe into its wall socket

    other
        i will not!
        maintenance and feeding was such a chore...
        with these new ones, all i do is put in a strange little blue square the θjut pass along,
        then it lasts for θgazes and θgazes!

    stupid
        a square...
        █████, could that be the 'sfer' stuff?
    
    hesitant
        haha, no, i think this is a new one
        it is probably a byproduct, or maybe it could be a specific sfer variant...
    
    sourceless
        i dip my receptors to the tir, and she responds in kind
        with a simple gesture to █████, we continue on our journey
    
    hesitant
        ...see, in the sfer "vats" that the zevazni foundries came up with,
        there is this layer of sludge that accumulates near the bottom, and i think they say it is blue--what was it called again...

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`),
                "zuzucri" /*--- кс кс слизнячок*/: generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'
    
    sourceless
        the silence of this dormant herd is almost too much
        only the wind and thunder masks our slight movements as we draw closer to ███
        it is by velzie's favor alone that she has survived out here so long... poor vel!!
        she sits against her dull beacon in the little clearing, bleeding, surrounded by the two bodies of her running companions
        it is fortunate that we found them while the eye still lights our path!	
        when I nearly enter the clearing, ██████ grabs my arm and pulls me back,
        hiding us both from ███'s view around a juvenile veilk tendril
        we speak silently, through the dullvoice:
    
    stupid
        what?
        there is no threat of secri here
        besides, how would one have deployed a beacon?
    
    guard
        just wait - take a closer look
        the scent in the air...
        it is not right
        if she is here, why has she not received any of our calls?
    
    sourceless
        the scent of vel and kiv, two dead - exactly what we see... what is he worried about?
        with a quick impulse, i instruct my valika-borne aima cyst to peer around the side
        ███ is sitting a little strangely, perhaps with too large of a pack,
        but from this side angle it is hard to tell
        the wind shifts towards us, the trio's trails made more apparent
        the vel's scent is strange, sickly, metallic...
    
    stupid
        you are right
        stay here
        prepare your dull-pulse, and keep it aimed on her
    
    sourceless
        i feel his affirmation through the dullvoice, and so i twist about,
        calling out in my surface voice before i step into full view of ███,
    
    stupid
        ███! is that you?
        are you all right?
    
    sourceless
        a cloud passes between the eye and this veilk herd just as i see ███ turn towards me,
        and while we are plunged into darkness, i feel a terrible dread
        for i thought i saw her face split apart for an instant
        but as it passes, she pushes herself to her feet,
        face intact and spiraling receptors curled tight with worry
        
    host
        ██████...?
        please--do not look away
        i will go away again
        i just blinked... i blinked and they were all gone!!
        i did not do anything! please!
    
    sourceless
        her arms and face are stained cyan with blood, 
        claws longer than they ought to be--more numerous than they should be...
        a dark, angular shape is obscured behind her, barely visible over her shoulders
        parts of it twist occasionally--alive!!
        ██████ communicates to me via dullvoice,
        
    guard
        ██████ - she is lost
        if there is one zuzucri here, there are others
        preparing to release the pulse
    
    sourceless
        silently, as to not alert ███ that i have a companion,
        i gesture for him to wait with a claw behind my back, and he obliges
        though every nerve in my body commands me to flee,
        i know - i must soothe ███, lest the beast stop wielding her mind
    
    stupid
        ███, it is all right...
        what happened?
    
    sourceless
        ███ approaches, but her legs do not move, dragging against the soil
        only as soon as the zuzucri notices my eyes upon her legs does she begin to walk with them
        i raise one of my climbing gauntlets defensively, and she halts, bringing her claws to her eyes
        she weeps, and my aima cyst detects movement in the dark shape behind her
        a number of eyes blinking in unison, the true shape of the beast too hard to make out
    
    host
        sorry... sorry...
        i know--i need to stay away
        i do not know when it got me, or how long it has been...
        i think it used my knowledge to activate their beacon, to bring you here
        you must not let me return!!
        and... and you cannot let me stay here
    
    sourceless
        though ██████ would undoubtedly prefer that we free her from her role,
        i have an idea...
        with some rummaging through my cloak, i produce that little mindcore that █████ granted me
        it <em>was</em> for me, but if there is any chance we can save ███...
        i offer it to her, arm outstretched, tilted away in case i must evade
        the zuzucri will surely be appeased by my apparent acceptance of her
    
    stupid
        no, ███, it is OK!
        just put this on your receptor, and we can help you
    
    sourceless
        she pulls her claws from her face, an extra one i had not noticed disappearing behind her back
        her receptors uncurl with hope and delight, and in her face i more clearly see the zuzucri's facade
        yes--split into four quadrants, occasionally parting to breathe... i nearly strike her then
        but i wait, and she takes the mindcore, allowing me to step back further...
        as she places it on a receptor, she...
        no, wait, it does not part for her?
        she brings it to her face, and it is clearly operational, but...
    
    host
        ██████... it will not let me
    
    stupid
        ah...
    
    sourceless
        the corru, it does not recognize her...
        velzie snatches away my hope once more, inspiration replaced with despair
        just as i prepare to signal to ██████, her claws dig into the shell of the cyst,
        and she begins to lunge it towards the sharp end of her receptor, sobbing
    
    stupid
        no, wait--!

    sourceless
        out of stupid impulse, i snatch that arm by the wrist
        and as i do, her face splits apart, the zuzucri's hidden limbs rearing in the dark
        its teeth linger only a receptor's length away
        a terror i have never known grips me, my limbs silent and unable to recoil
    
    guard
        we're done - releasing pulse now

    sourceless
        a blinding flash beams between me and the beast, severing her mindcore-bearing claw
        i have only a θblink to scramble away, before--

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`),
                "zmask" /*--- кс кс слизнячок*/: generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        ...opens, revealing a small chamber with a second reinforced hatch
        an interlocking system of corru and carved stone
        i step within, adjusting the corrucystic capsule in my arms
        and after a small delay, the second hatch opens, the first closing behind me
        the dark is overwhelming as always...
        only the slightest illumination from organized growths along the walls
        but the cavelight upon my waist carries enough light for me to safely enter,
        and brings the shine of ███'s eyes upon me, from across the chamber
        two at first, then more--then two, again

    stupid
        ███?

    sourceless
        if what they say is right, it should be ███, right now...
        she approaches slowly, carried by the zuzucri's limbs behind her
        an indistinct mass that hides itself from me as best it can
        her silence is unsettling, enough that i nearly back into the reinforced entrance out of precaution
        a number of dark shapes rotate in the air above her, so--it must be working, right?
        my fear is silenced by seeing the glimmer of her receptor ornaments
        the joyous upturn and uncurl is enough to reassure me
        
    host
        ██████!!
        come, sit!
        i am so glad you came, i know it is a special θgaze...

    stupid
        ahh, that may be the case!
        but i did not want you to miss out
        in fact, nobody did--we all helped with this!

    sourceless
        i weave around furniture and corrucystic fixtures
        they have turned this place into a combination of living chamber and workshop
        though, i wonder how much she is actually able to use...
        soon we are seated at a central table
        at least, i am... she is simply lowered
        the capsule thuds against its stone surface, despite my efforts to place it quietly

    stupid
        a <span definition="INHERITED CONTEXT::'celebration of veilk-fall';'inherited description-generated noun'">new-fall</span> feast!

    sourceless
        i unlatch the cavelight from my suit, placing it nearby the capsule
        in its pale light, the shapes above her become clear
        the zuzucri-masks - hovering in a wide, neat circle above and around her head
        hollow corrucystic impressions of faces
        moving their mouths, whispering near-inaudible nonsense
        all with different receptors, changing orientation occasionally
        each carries a spherical connector behind the mask's curve, but with nothing visibly attached...
        like valika-borne cysts, without the tether? 
        i must ask about that later
        for now, i try not to focus on them directly too much--the θjut said it is best that way
        with a few taps along the sides of the spherical capsule, its corrucystic cover splits and retracts,
        releasing the aroma of seared veilk-vein, closed and stuffed with <span definition="INHERITED CONTEXT::'city heart';'fastest-rotting veilk organ';'named for practice of consuming rapidly in celebration of new veilk-fall'">ozoilaki</span> meat and savory fruit flesh
        lesser capsules are arranged neatly within, containing a few different beverages
        veilk's-blood being the most significant
        the angled cavelight gives ███'s eyes a clear glow,
        revealing the splitting marks of her face, curling at the edges even now in anticipation of this delicacy

    host
        so it was a good one?!
        this is so much...

    stupid
        yes! we are not sure how it happened, but...
        middle-sized, conveniently close, good health... still alive, actually!
        ██████ and the examiners have been saying it had some malformed leg-tendrils,
        and its growth must have gradually made it unable to support its own weight effectively anymore

    host
        lucky! but, sad
        i always felt better when it was the older veilk...
        and they have more varied parasites, too!
        but, maybe velzie saw it fit to throw some fresh food our way
        it has been a bad θeye...
    
    sourceless
        i chuckle, maybe inappropriately
        but it comes from the same place
    
    stupid
        yes...
        but, all things become balanced, right?
    
    sourceless
        there is a hesitant affirmative twist in her receptors
        one of her claws raises to grip a blade within the capsule
        and... a tendril of the zuzucri rises from behind her, in place of her other claw,
        a grim reminder of the scars from our fight, seizing a food-spike without thought
        to her, it may even appear as her claw, for she uses it all the same
        it is better if i do not ask

    host
        oh, did you bring any for yourself?
    
    stupid
        i already ate at the celebration a θwink ago...
        this is all for you!

    host
        ah...
    
    sourceless
        her flat reaction brings a hollow to my heart
        she must have been aware of the θjut's push to allow her to safely join us
        it was foolish to raise her hopes
        ...but she does not seem particularly upset

    host
        well, here
    
    sourceless
        from the meal, she picks up one of the smaller beverage capsules with a mismatched third claw from behind her back
        offering it to me with a kind curl, oblivious
        it is an import from another cave-city, one of the blackish-grey drinks
        not my favorite, but... i accept
        she returns to her utensils, cutting into the vein
        a thick cut is brought up to her face, which splits apart at the nose
        spiralling teeth and muscle set into it as her face reforms, mimicking the motion of chewing
        her eyes return, allowing her to see the small shock in my receptors
        i am usually better about playing along, but, i have never seen her eat like this...
        as to not unsettle her, i launch into catching up
    
    stupid
        so how is it going here?
        the ma--
        
    sourceless
        i catch myself
        i am sure the θjut would prefer i not discuss this with her
        not without some defensive measure
        but i have already started
    
    stupid
        the, um, the new... the new things, they are trying
    
    host
        oh! good!
        the masks, you mean?
        yes, very very good!!
        they have the zuzucri in a state of almost constant deactivation
        except for, uh, resting, and apparently some time after waking from sleep
        i do not think they can do anything about that
        but... as long as it--i--am fed, and i am not too stressed, it should not be an issue
        
    sourceless
        another cut of the vein from the center is brought to her face
        splitting into a monstrous maw again, tearing the vein's flesh with ease
        i suppress my wincing
        does she not realize the implicit threat in what she just said?
        was that the beast speaking through her?

    host
        it really is all coming along so fast...
        the only spike in the heel is that it feels endless
        i do not remember sleeping, or dreaming, or waking...
        it feels as if i have been wide awake since the moment it took me
        jolted to different places, with a new set of faces every time
        it is better now with the masks, but i am fatigued
        i am not truly tired, not exactly... they told me that the zuzucri does sleep...
        i just miss being able to feel it, myself
        maybe if only because i am sealed in this little room
        once they have the masks perfected, and they can let me out...
        i am sure this will all feel better!!
    
    sourceless
        with an excited curl in her receptors, she drinks of the veilk's-blood
        held in the coil of a tendril, brought to her lips without the terrible split
        "let me out"...
        what are they telling her?
        does she really think...

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`),
            },

            definitions: { 
                "███████": { type: `ОШИБКА`, text: `'отсутствующая сущность'`},
                "██████": { type: `ОШИБКА`, text: `'отсутствующая сущность'`},
                "█████": { type: `ОШИБКА`, text: `'отсутствующая сущность'`},
                "████": { type: `ОШИБКА`, text: `'отсутствующая сущность'`},
                "███": { type: `ОШИБКА`, text: `'отсутствующая сущность'`},

                
                "surface voice":`'specialized volume management';'fast and enunciated'`,
                "velzie's eye cast down": `'common idiom';'even velzie watches in shock'`,

                "dog": { type: `NOTE`, text: `'partial translation';'implied closest cultural equivalent'`},

                "zzepel": `'back-mounted multi-purpose surface utility';'popular for veilk camping'`,
                "dullvoice": { type: `NOTE`, text: `'partial translation';'inherited description-generated noun'`},
                "spirestorm": `'weather phenomena';'ceaseless violent storm surrounding natural spire'`,

                "valika": `'wide conical headwear';'surface camouflage'`,		
                "zevazni": `'cave-city central to vazni';'corrucystic revolution origin'`,
                "guktik": `'predator';'bladed arms';'cooked flesh goes well with zzoust'`,

                "cavernguard": { type: `NOTE`, text: `'partial translation';'inherited description-generated noun'`},

                "ukazni": `'vaznian mountain range';'large peaks impassable by veilk'`,

                "kelnit": `'derogatory';'incompetent fighter'`,

                "yuzku": `'sluggish bioluminescent scavengers';'intentionally cultivated in veilk parasite husks for lighting';'fatal if consumed'`,

                "zuzucri-masks": `'corrucystic treatment for zuzucri infestation';'partial translation';'inherited description-generated noun'`,	
                "spike in the heel": `'common idiom';'persistent issue'`,

            },

            strings: {
                "hello?": "привет?",
                "ERROR::'infinite stream loop';'retracing';'last coherent position'": "ОШИБКА::'бесконечная петля потока';'возвращение';'последняя связная позиция'",
                "ATTENTION::'thoughtform activity detected'::'resources removed'": "ВНИМАНИЕ::'обнаружена мыслеформенная деятельность'::'удалены данные'",

                /*effigy*/ "jokzi... jokzi ozo!!": "джокзи... джокзи озо!!",
                /*effigy*/ "that's right! i have a home!!": "точно!! у меня же дом есть!!",
                /*effigy*/ "ok this was nice but i gotta go barfriend": "было здорово но мне пора бардруг",
                /*effigy*/ "i'll take another one for the journey!": "я возьму ещё один в дорогу!",
            },

            entityDescriptions: {
                "cavik": `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'не указано'
    <span style='color: var(--friend-color)'>::РЕКОНСТРУИРОВАННЫЙ КОНТЕКСТ ПОДПИСИ</span>
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("вазнийское")} сюрреалистическое влияние'
    <span style='color: var(--friend-color)'>+</span>'метка <span onmouseenter="javascript:env.secavik.cavikDmg(1);document.querySelectorAll('.message.cavik').forEach(el=>el.querySelector('img').src = '/img/sprites/obesk/cavik/paintrait.gif')" definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'пещерный город';'я хочу очнуться';'я хочу домой'">олтазни</span>'
    <span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("жат")}-рецепторы, обращ“—» ¯x¶›¢Ã°!
    ::ОШИБКА::'окончен поток'недейстОШИБКА::ИÓú=ER::Й"¨úр::äÀ*^Уó¬ól£«â'`,


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
        },
    }
}

console.log('localization all good!')

function isEffigyPage() {
    if (page.path == "/local/uncosm/effigy/") return true
    else return false
}
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

env.uncode = {
    input: content.querySelector('#code'),
    enter: ()=>{
        let value = env.uncode.input.value.toLowerCase().replaceAll(".", "").replaceAll("/", "")
        
        if(value.length) {
            env.uncode.input.blur()
            cutscene(true)
            play('destabilize', 0.5)
            ratween(env.bgm, 0.1)
            content.classList.add('memorydive')

            if(!check("hub__funfriend-ah1") && value == "recosm") {
                //fuck you lol
                location.href = `/img/sprites/obesk/larval/larval7.gif`
            }

            if (value == "кавик") value = "cavik"
            else if (value == "климент римский") value = "clemens romanus"
            else if (value == "корру") value = "corru"
            else if (value == "собака") value = "dog"
            else if (value == "серое") value = "dull"
            else if (value == "эффигия") value = "effigy"
            else if (value == "цветок") value = "flower"
            else if (value == "юмор") value = "humor"
            else if (value == "личиночный" || "личиночному") value = "larval"
            else if (value == "паразит") value = "parasite"
            else if (value == "простите" || "прости") value = "sorry"
            else if (value == "шпиль") value = "spire"
            else if (value == "поверхность") value = "surface"
            else if (value == "вейльк" || "вейльки") value = "veilk"
            else if (value == "юзку") value = "yuzku"
            else if (value == "зузукри") value = "zuzucri"
            else if (value == "зузукри-маски") value = "zuzucri-masks"

            fetch(`/local/uncosm/${value}/`).then(resp=>{
                if(resp.status == 404){
                    cutscene(false)
                    startDialogue('wrong')
                } else {
                    setTimeout(()=>{
                        cutscene(false)
                        moveTo(`/local/uncosm/${value}/`)
                    }, 4000)
                }
            })
        }
    }
}

document.head.appendChild(document.createElement('style').appendChild(document.createTextNode(css)).parentElement);

    document.getElementById("savetext").setAttribute("placeholder", "ПРИМЕЧАНИЕ::'вставка данных';'проявляйте осторожность'");
 

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



env.mutateObserverPageChange = new MutationObserver(()=>{
    console.error("time to")
    setTimeout(()=>{
        console.error("localize!!!")
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
        if(check('hub__funfriend-ep1fed')) env.localization.entityDescriptions['the embassy'] = `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА
    ::ПУНКТ НАЗНАЧЕНИЯ::'пространственная мыслеформа';'вспоминание'
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'выступление';'велзи гогочет от восторга'</span>`
        getLocalizationForPage(true)
        if (page.dialoguePrefix == "fbx") { 
            page.mothComment = ()=>{
                var moth = "чё как?"
                if(env.currentDialogue.justChanged) moth = "что-нибудь ещё на уме?"
                return moth
            },
            page.mothChat = {
                startName: "об этой работе",
                getDest: ()=>{return `mth++${page.dialoguePrefix}`},
            }
        } else if (page.dialoguePrefix == "hello") {
            page.mothComment = ()=>{
                if(check("recosm_state")) {
                    return "как по мне - явный перебор для такого пустого пространства"
                } else {
                    return "ого, да это место просто infested... настолько бессвязно что я даже не улавливаю никаких сущностей" // help with infested
                }
            }
        } else if (page.dialoguePrefix == "hub") {
            page.mothComment = ()=>{
                var moth = "чё как, дружище?"
                if(env.currentDialogue.justChanged) moth = "что-нибудь ещё?"
                return moth
            }
            page.mothChat = {
                startName: "о хабе",
                getDest: ()=>{return `mth++${page.dialoguePrefix}`},
            }
        } else if (page.dialoguePrefix == "localcity") {
            page.mothComment = ()=>{
                var moth = "довооольно поломанное... но хоть что-то"
                if(env.currentDialogue.justChanged) moth = "что-нибудь ещё на уме?"
                return moth
            }
            page.mothChat = {
                startName: "об этой мыслеформе",
                getDest: ()=>{return `mth++${page.dialoguePrefix}`},
            }
        } else if (page.dialoguePrefix == "localcitystreet") {
            page.mothComment = ()=>{
                var moth = "pretty sure this envoy guy isn't being remembered right lmao"
        
                if(check('citystreet__envoy-end')) moth = "so akizet's assigned contact was a 'gordon'... i'm gonna see if i can track down who this was"
            
                if(env.currentDialogue.justChanged) moth = "что-нибудь ещё на уме?"
            
                return moth
            }
            page.mothChat = {
                startName: "об улице",
                getDest: ()=>{return `mth++${page.dialoguePrefix}`},
            }
        } else if (page.dialoguePrefix == "localorbit") {
            page.mothComment = ()=>{
            var moth = "это мыслепространство чертовски огромное... даже не вижу этому особой причины"
            if(!check('dullvessel_position', 'orbit')) moth = "не забывай что корабль акизет сейчас в мыслепространстве с океаном! дико что он может вот так вот просто двигаться"
                if(env.currentDialogue.justChanged) moth = "что-нибудь ещё на уме?"
                return moth
            }
            page.mothChat = {
                startName: "о пустоте",
                getDest: ()=>{return `mth++${page.dialoguePrefix}`},
            }
        } else if (page.dialoguePrefix == "dullvessel") {
            page.mothComment = ()=>{
                var moth = "did akizet not have furniture? this ship is so empty... honestly i kinda hope it just got lost through incoherence or something"
    
                if(env.stage.name == "dullvessel_beneath") {
                    moth = "woah... look at this, dude. this is a different thoughtspace, somehow"
            
                } else if(check('ep1_fed')) {
                    moth = "looks like funfriend's restored a little bit here, there's definitely more data than before"
                }
            
                if(env.currentDialogue.justChanged) moth = "что-нибудь ещё на уме?"
            
                return moth
            }
            page.mothChat = {
                startName: "о судне серое",
                getDest: ()=>{return `mth++${page.dialoguePrefix}`},
            }
        } else if (page.dialoguePrefix == "localocean") {
            page.mothComment = ()=>{
                return "you can really tell this was a long time ago, jesus. look at how small their island is"
            }
        } else if (page.dialoguePrefix == "localship") {
            page.mothComment = ()=>{
                var moth = "this is really that first contact ship, damn. did you know they turned it into a museum?"
    
                if(check("visited_localoceanshipelsewhere")) moth = "so the \"low cohesion\" here probably refers to that... other place, being connected"
                else if(check("ep1_fed")) moth = "that's weird, does this area seem bigger now?"
                else if(oldPage.dialoguePrefix == "interview1") moth = "figures we finally get a compatible corrucyst with some real data, and it has something destroying it"
            
                return moth
            }
        } else if (page.dialoguePrefix == "interview1") {
            page.mothComment = ()=>{
                var moth = "idk how you're rendering this. i'm not getting anything"
                if(env.currentDialogue.justChanged) moth = "что-нибудь ещё на уме?"
                return moth
            }
            page.mothChat = {
                startName: "об этом месте",
                getDest: ()=>{return `mth++${page.dialoguePrefix}`},
            }
        } else if (page.dialoguePrefix == "localdepths") {
            page.mothComment = ()=>{
                if(check('ep0_epilogue', 'started')) return "i think our friend altered this one while you were out, i'm seeing less data... gotta keep its leverage somehow i guess"
                return "don't worry, i'm seeing this. keep going"
            }
        } else if (page.dialoguePrefix == "localuncosm") {
            page.mothComment = ()=>{
                return "the readout here is like... complete nonsense. is there even anything you can interact with? does it hurt?"
            }
        } else if (page.dialoguePrefix == "localuncosmwhere") {
            page.mothComment = ()=>{
                return "yeah i got nothing here. seems like you could give it some input, but... no clue what it wants"
            }
        } else if (page.dialoguePrefix == "sec") {
            page.mothComment = ()=>{
                let moth = "don't look at me lol"
        
                if(check("secavik", "beaconed")) moth = "that unity thing actually worked on this? it didn't even seem like there was anything left... weird"
                else if(check("secavik")) moth = "looks like it lost coherence once you pulled that memory from it"
            
                if(env.currentDialogue.justChanged) moth = "что-нибудь ещё на уме?"
            
                return moth
            }
        } else if (page.dialoguePrefix == "recosm") {
            page.mothComment = ()=>{
                var moth = "this really is a 'pocket of sanity', huh? despite all the individual parts being incoherent, the readout isn't total nonsense..."
    
                if(check("recosm_state")) moth = "so you're going to let it live? that's nice of you... just hope it doesn't come back to bite us"
                
                if(env.currentDialogue.justChanged) moth = "что-нибудь ещё на уме?"
                return moth
            }
            page.mothChat = {
                startName: "об этой мыслеформе",
                getDest: ()=>{return `mth++${page.dialoguePrefix}`},
            }
        } else if (page.dialoguePrefix == "localship2") {
            page.mothComment = ()=>{
                let moth = "what's up buddy"
                if(env.currentDialogue.justChanged) moth = "что-нибудь ещё на уме?"
                if(!check("mth++localship2-name")) moth = "ok what the fuck is this"
            
                return moth
            }
            page.mothChat = {
                startName: "об этой мыслеформе",
                getDest: ()=>{return `mth++${page.dialoguePrefix}`},
            }
        } else if (page.dialoguePrefix == "embassy") {
            page.mothComment = ()=>{
                var moth
                switch(check("PAGE!!embassy_day")) {
                    case 3:
                        if(env.stage.name.includes("archiv") && check("embassy__d3_bstrdintro")) {
                            moth = "i have to give it to this bstrd thing, general cohesion is still pretty solid. it's still hard to tell for sure what is real and what isn't though"
                        } else {
                            moth = "how did we never hear about this?? they always said it was some sort of structural failure due to the gravity differences or some bullshit like that"
                        }
                    break
            
                    case 2:
                        if(check("PAGE!!cystmelted")) moth = "this is fucked up dude, imagine if you couldn't trust any of us"
                        else moth = "did she really label this memory as 'suspicion'? or was that funfriend? that's kinda ominous"
                    break
            
                    case 1:
                        moth = "there are so few distinct thoughtforms here... then again it could just be one part of the embassy"
                    break
            
                    default:
                        if(check("ep4__entrancefinal")) {
                            moth = "wow... that kinda does it for this whole thoughtspace, except for that first one i guess"
                        } else if(env.ep4) {
                            moth = "time to finish the collapse buddy. we almost got everything"
                        } else if(check("embassy__d3_movefriend_finish-end")) {
                            moth = "seems like funfriend is still working on the rest of the collapse memory for now"
                        } else if(check("fbx__ep2intro-end")) {
                            moth = "time to get into the collapse, buddy"
                        } else if(check("embassy_d1_complete") && check("embassy_d2_complete")){
                            moth = "if those were two of the memories she chose to store, what are these other ones??"
                        } else if(check("embassy_d1_complete")) {
                            if(check("citystreet__envoychat-end")) moth = "jesus... well that first memory lines up with what akizet told gordon. but why would she go to us if they agreed to keep it quiet?"
                            else moth = "holy smokes. yeah i don't think we ever heard about this part of the call... hey--there's another memory that's been fixed, open it"
                        } else {
                            moth = "this is the most dense thoughtform i think i've ever seen... they have such a strange way of storing data"
                        }
                }
            
                if(env.currentDialogue.justChanged) moth = "что-нибудь ещё на уме?"
                return moth
            }
            page.mothChat = {
                startName: "о посольстве",
                getDest: ()=>{return `mth++${page.dialoguePrefix}`},
            }
        } else if (page.dialoguePrefix == "gol") {
            page.mothComment = ()=>{
                var moth = "this is getting pretty serious... so much worse than i ever imagined honestly"
                if(env.currentDialogue.justChanged) moth = "что-нибудь ещё на уме?"
            
                return moth
            }
            page.mothChat = {
                startName: "о месте с големами",
                getDest: ()=>{return `mth++${page.dialoguePrefix}`},
            }
        } else if (page.dialoguePrefix == "ep4") {
            page.mothComment = ()=>{
                var moth = "this memory is so weird... i actually can't tell what incoherence is real, or if there really is any"
    
                if(check("ep4__entrancefinal")) {
                    moth = "i'm still processing everything that happened here dude"
            
                } else if(check("ep4__h2h")) {
                    moth = "dull monsters, a hidden obesk conflict... this is what we've been looking for. the big guy is gonna go crazy when i turn this in"
            
                } else {
                    moth = "what's up?"
                }
            
                if(env.currentDialogue.justChanged) moth = "что-нибудь ещё на уме?"
            
                return moth
            }
            page.mothChat = {
                startName: "about the groundsmindry",
                getDest: ()=>{return `mth++${page.dialoguePrefix}`},
            }
        } else if (page.dialoguePrefix == "abyss" || "parasite") {
            page.mothComment = ()=>{
                let moth = "still not getting anything detailed here"
                if(env.currentDialogue.justChanged) moth = "что-нибудь ещё на уме?"
            
                return moth
            }
            page.mothChat = {
                startName: "about whatever this is",
                getDest: ()=>{return `mth++${page.dialoguePrefix}`},
            }
        } else if (page.dialoguePrefix == "e3a2") {
            page.mothComment = ()=>{
                var moth = "чё как, дружище?"
                if(env.currentDialogue.justChanged) moth = "что-нибудь ещё?"
                return moth
            }
            page.mothChat = {
                startName: "об обрамлении и этом месте",
                getDest: ()=>{return `mth++${page.dialoguePrefix}`},
            }
        } else if (page.dialoguePrefix == "beneathdepths") {
            page.mothComment = ()=>{
                let moth = "don't look at me - keep going"
                if(check("fbx__depthrecovery2")) moth = "looks like whatever this was is totally gone now"
            
                return moth
            }
        } else if (page.dialoguePrefix == "cache") {
            page.mothComment = ()=>{
                let moth = "i can barely keep up with this, my console is either throwing errors or updating too quickly to read... just let me know what you see"
                if(env.currentDialogue.justChanged) moth = "что-нибудь ещё на уме?"
                return moth
            }
            page.mothChat = {
                startName: "о кэше",
                getDest: ()=>{return `mth++${page.dialoguePrefix}`},
            }
        } else if (page.dialoguePrefix == "ozo") {
            page.mothComment = ()=>{
                let moth = "this place is wild"
                if(env.currentDialogue.justChanged) moth = "что-нибудь ещё на уме?"
            
                return moth
            }
            page.mothChat = {
                startName: "о джокзи озо",
                getDest: ()=>{return `mth++${page.dialoguePrefix}`},
            }
        } else if (page.dialoguePrefix == "notfound") {
            page.mothComment = ()=>{
                var moth = "кажись ты сейчас в петле бессвязности... знаю я такое. здесь вряд ли окажется что-то полезное"
                return moth
    }}}, 2)})
env.mutateObserverPageChange.observe(body, {attributes: true, attributeFilter: ['page']})



setTimeout(()=>chatter({actor: 'corruru', text: `cor-RU успешно инициализирован! @dutokrisa, @shatteredstars и @bra1nslug_ благодарят вас за использование`, readout: true}), 500)
setTimeout(()=>chatter({actor: 'corruru', text: `нашли баг, ошибку в тексте, странную фичу или у вас просто есть предложение? напишите нам!`, readout: true}), 3000)
