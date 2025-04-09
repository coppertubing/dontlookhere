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
env.dialogues.mthlocalr = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось - создатели cor-RU<+>END
`)  
env.dialogues.mthlocalfunr = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось - создатели cor-RU<+>END
`)
env.dialogues.generalsentryResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось - создатели cor-RU<+>END
`)
env.dialogues.hubBuddyResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось - создатели cor-RU<+>END
`)
env.dialogues.persistentQuestions = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось - создатели cor-RU<+>END
`)
env.dialogues.envoyStreetResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось - создатели cor-RU<+>END
`)
env.dialogues.tvresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось - создатели cor-RU<+>END
`)
env.dialogues.flowerAwakeResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось - создатели cor-RU<+>END
`)

env.dialogues.interviewResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::corruru
        если вы это видите то всё сломалось - создатели cor-RU<+>END
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
        преимущество получено<+>leverage //untranslated
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
        дэмн, надеюсь никто из обесков никогда не видел их, они должно быть такие издевательские
        если ты всерьёз, то это одно из существ о которых я и впрямь немного знаю
        по сути они - сверххищники на обески
        и как и остальная половина всей фауны на обески, они так же паразиты
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
        мы б тут всю ночь просидели
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

        "ATTENTION::'thoughtform activity detected'::'resources removed'": "ВНИМАНИЕ::'обнаружена мыслеформенная деятельность'::'удалены данные'",

        "unity": "единство",
        "effigy": "болванка слишком глупое",


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
        "UNITY::'enables additional ACT on responsive thoughtforms'": "ЕДИНСТВО::'добавляет дополнительное ДЕЙСТ на отзывчивых мыслеформах'",
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
        "gate::their city": `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА
    ::ПУНКТ НАЗНАЧЕНИЯ::'низкоразмерное мыслепространство';'внутреннее'
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'их мёртвые шпили, символы контроля'</span>`

    },

    page: { 
        "fbx": {
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
            },

            definitions: { 
            },

            strings: {
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
            }
        },
        "hello": {
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
        ИЗВИНИ МЫ ЗАБЫЛИ ЧТО ТЫ ВООБЩЕ-ТО НЕ АВТОРИЗОВАН АХАХАХАХА
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

            },

            definitions: {
                
            },

            strings: {
                
            },

            entityDescriptions: {

            }
        },
        "citystreet": {
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
        Эй, без проблем. И не беспокойтесь об этом, большинство людей тут отнесутся к Вам неплохо.
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
        Помогает вытравить тот грёбанный viral scare.
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
        Вовсе нет! Пока я здесь, всё в порядке.
        Как я и говорил, это, пожалуй, наиболее дружелюбный к обескам город в штатах.
        В худшем случае Вы наткнётесь на парочку угрюмых взглядов. Наверняка ещё остались некоторые viral theorists.
    
    akizet
        я вижу!
    
    RESPOBJ::envoyStreetResponses

cafe
    akizet
        где находится 'кафе'?
    
    envoy
        Это совсем по-близости. Просто продолжайте идти вдоль улицы, ищите ˜/ŒôfªœДŠ/d 0E@яҏkϒю жёлтую дверь.
    
    RESPOBJ::envoyStreetResponses

flowers
    akizet
        я припоминаю, когда-то вы говорили о "цветочном ларьке"...
        где это?
    
    envoy
        Уже довольно поздно, Акизет, я даже не уверен, открыт ли он...
        Но просто продолжайте идти прямо по улице, он должен быть сразу за углом.
    
    RESPOBJ::envoyStreetResponses
                `),
                "cafemenu": generateDialogueObject(`
start
    sourceless
        ЭТО - ИХ МЕНЮ?
        НЕВЕРОЯТНО...
        ЕГО ПРАКТИЧЕСКИ НЕВОЗМОЖНО РАЗОБРАТЬ
        Я РАЗЛИЧАЮ "АПЕЛЬСИН" - БЫТЬ МОЖЕТ, ЦИТРУСОВЫЙ НАПИТОК?
        СВЕТЛЫЕ БЛИЗНЕЦЫ НАСТОЛЬКО ИЗОБИЛУЮТ ЦИТРУСОВЫМИ КИСЛОТАМИ, ЧТО ОНИ ПРОИЗВОДЯТ ИЗ НИХ НЕБОЛЬШИЕ НАПИТКИ...
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
        ах, нет, я здесь впервые

    stre wal k
        больно
            EXEC::page.bgm.rate(0.3);body.classList.add('zoom')
        больно
            EXEC::page.bgm.rate(0.1)
        здесь кто-нибудь есть
    
    akizet
        правда? мне стоило бы попробовать!
        и меня зовут акизетеше, мой друг
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
        И эй, я бы даже рад поговорить, только вот я заступаю на дежурство около десяти. 

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
        ПОСЛЕ ГОЛОВОКРУЖИТЕЛЬНОГО ПЕРЕХОДА НЕКИЙ СВЕТЛЫЙ БЛИЗНЕЦ СИДИТ ЗА СТОЛОМ ПЕРЕД ОКНОМ С ВИДОМ НА ПОВЕРХНОСТНЫЙ ГОРОД
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
        БЕЗУСЛОВНО, ЭТО БЫЛ КАКОЙ-ТО НЕДАВНО ВОЗНЁССШИЙСЯ ВЕЛ ИЛИ ЧЕРЕСЧУР РЬЯНЫЙ θжат ИЗ МАТЕРИАЛОВ

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
        ATTENTION::"previously viewed stream";"connects to additional stream";"skip ahead?"
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
        Получается, эта вещь, что была у нас в океане
        ещё до того, как Ваш народ даже показался,
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
        Хорошо, вот, что я предлагаю.
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
        Акизет, пока что держите это в тайне. Это может взбаламутить не только Вашу сторону.
        Будем на связи, хорошо?
    
    sourceless
        МЫ ОБА ВСТАЁМ. Я ЧУВСТВУЮ, КАК ВЕС МОЕГО СТРАХА КЛАДЁТСЯ НА ЕГО ПЛЕЧИ *** это странный и буквальный перевод, я бы послушал альтернативы
    
    akizet
        разумеется, гордон.
    
    envoy
        Пойдёмте, я Вас провожу.

    sys
        ВНИМАНИЕ::'поток памяти окончен';'визуализация прервана'
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
        ВНИМАНИЕ::'поток памяти extends';'продолжить визуализацию?' ***
            SHOWIF::["embassy_d2_complete", true]
    
    RESPONSES::self
        продолжить воспоминание<+>ep1extension
            SHOWIF::["embassy_d2_complete", true]
            EXEC::env.citystreet.envoyChat(false, true)

        завершить воспоминание<+>END
            EXEC::env.citystreet.envoyChat(false, true)

ep1extension
    sourceless
        МЫ СПУСКАЕМСЯ НА ДВИЖУЩЕЙСЯ ПЛАТФОРМЕ НА НИЖНИЙ ЭТАЖ
            EXEC::content.classList.add('elevator')
        ПОСЛАННИК СТОИТ МОЛЧА, В ЕГО ГЛАЗАХ ПО-ПРЕЖНЕМУ ТРЕВОГА
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
        у меня есть в наличии,
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
        Дело в том, что тех часть довольно суховата.
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
        вы будете обязаны помочь мне в моём собственном расследовании происхождения зова
    
    sourceless
        ВИД ЕГО ЛИЦА
        ОН ТАКОЙ, БУДТО Я ПРОНЗИЛА ЕГО ЖИЗНЕННО ВАЖНЫЕ ОРГАНЫ
        ЗА ЭТИМ СЛЕДУЕТ МИНУТА МОЛЧАНИЯ
        Я НАКЛОНЯЮ СВОЮ ВИСЯЩУЮ ГОЛОВУ, СОХРАНЯЯ ВЫРАЖЕНИЕ И ЛИЦА, И РЕЦЕПТОРОВ ПЛОСКИМ.
        
    akizet
        что вы думаете?

    envoy
        Это чертовски важная вещь, чтобы выкинуть её по пути к выходу, Акизет. ***

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
        Кто-то на цокольном этаже пытается вызвать лифт. У нас где-то минута.
        Акизет, я не могу принять Ваше предложение.
        Не до тех пор, пока я не смогу утвердить несколько вещей со своей стороны.
        Просто попридержите это, хорошо?
        У нас обоих есть обязанности, которые нужно выполнять, и это устройство может оказаться колоссальным развитием...
        Но я не хочу, чтобы Вы попали впросак из-за того, что я не могу гарантировать полное молчание. 
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
        Итак, если это были Ваши все сенсации для меня на сегодня, то
        Ещё увидимся, Акизет. 

    akizet
        да--это всё!
        до свидания, гордон

    sys
        ВНИМАНИЕ::'поток памяти окончен';'визуализация прервана'
            SHOWIF::["embassy_d2_complete", false]
    
    RESPONSES::self
        завершить воспоминание<+>END
            EXEC::change('TEMP!!ep1_goingtogordon', false);env.citystreet.ep1velzie()
                `),
                "flower": generateDialogueObject(`
start
    sourceless
        though this entire trading chamber is flush with the cousin's light parasites,
            EXEC::specialCam("flowercam")
        one in particular captures my gaze
        they all bear such incredible displays, yet this...
        perhaps it is the rarity of the color that captivates me
        the envoy waves at the attendant across the room, who watches me with some interest
        then his attention turns to this "flower" as well
    
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
        i snap from my brief obssession to look at gordon, who is signalling apologetically to the attendant
    
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
        i spin my head to look out the windows of the marketplace
        is their sun not hidden at this time? what is it looking at?
        her and the envoy both laugh to each other
    
    akizet
        what?
    
    isabel_c
        Ну, этот давний и срезан с земли, так что никуда не поворачивается.
    
    sourceless
        у неё такой забавный смех
    
    akizet
        хехе, я вижу

    gordon
        Did you want me to buy this one for you, Akizet?
    
    isabel_c
        Нет, нет, возьмите его!
        Он с меня.
    
    sourceless
        he scoffs, about to protest, but i stop him with a receptor motion
        he has explained his gripe about me receiving free things before...
        when we are given things for free, it sets a certain cultural standard, potentially creating misunderstandings
        it is true that this is an issue for some, but...
        i feel that this gift is not out of foreign fascination
        her tone is not like that of one giving a child something, as it often is
        this is a different kindness
    
    akizet
        ah... i do not know... it may not be able to survive my vessel
    
    isabel_c
        Ничего страшного. Так или иначе, он будет жить всего неделю или две.
        И уверена, он будет рад путешествию!
    
    sourceless
        before i or the envoy can say another word, she fetches the flower and stores its neck in a translucent crackly material
        soon, it is in my claws again, and the cousin smiles at me
    
    isabel_c
        Поставь зелёную часть в воду, так он продержится дольше!
        Ох, и вот, добавь и это в воду.
    
    sourceless
        she shoves a small coarse packet in my claws, which i am unconcerned with deciphering right now

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
        briefly, i glance around the room, my suspended head slowly spinning over my shoulders
        so many of these flowers, all different colors and shapes...
        if only the embassy could support their life
    
    akizet
        i may return soon
        these creatures, these flowers... i want to learn more of them!
        but i should be going - i have kept gordon long enough

    isabel_c
        Рада слышать! Увидимся, может быть.

    isabel
        постой
    
____SHOWONCE::
    moth
        ok, something about this one is throwing the stream back and forth
        it's like it's trying to break free
        funfriend will hate us for it, but try talking to it again and helping it out
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
        ты имеешь в виду голодание кисты?
    
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
                `)
            },

            definitions: {
                
            },

            strings: {
                "say hello": "",
                "menu?": "",
                "order orange coffee": "",

                "chat": "",
                "recommend": "",
                "i do not eat": "",
                "observe": "",

                "read": "",

                "talk": "",

                "look": "",

                "talk about": "",
                "talk to": "",



                /*sourceless*/ "THE ATTENDANT IS PARALYZED BY MY APPEARANCE. I SENSE THE GLOW OF RECORDING COMMUNICATORS IN MY PERIPHERAL VISION": "",
                /*cashier*/ "Uhh...": "",
                /*akizet*/ "hello": "",
                /*cashier*/ "Hello...?": "",
                /*envoy*/ "Good morning!": "",
                /*envoy*/ "I'll get an espresso macchiato.": "",
                /*envoy*/ "What do you want, Akizet?": "",
                /*cashier*/ "Akizet... THAT Akizet?": "",
                /*cashier*/ "Wow... It's so cool to meet you!!": "",
                /*cashier*/ "Do you... do you eat? Food?": "",
                /*envoy*/ "Haha! Of course she does!": "",
                /*envoy*/ "Why don't you take a look at the menu, Akizet?": "",

                /*akizet*/ "where is the menu?": "",
                /*cashier*/ "It's behind me...": "",
                /*cashier*/ "Can you read?": "",
                /*cashier*/ "Sorry... I didn't mean for that to sound mean...": "",
                /*akizet*/ "i can, do not worry": "",                    
            
                /*akizet*/ "what do you recommend?": "",
                /*envoy*/ "You like citrus, right?": "",
                /*envoy*/ "They have this orange coffee thing.": "",
                /*envoy*/ "You might like it!": "",

                /*akizet*/ "you do know that i--": "",
                /*envoy*/ "Go on, order something! Just give it a try.": "",
                /*envoy*/ "I know you don't exactly have the same needs we do...": "",
                /*envoy*/ "But you can simulate taste, right?": "",
                /*envoy*/ "Getting out here, with the people, acting like we do?": "",
                /*envoy*/ "It makes a difference. Helps lessen the tension.": "",

                /*akizet*/ "i will have the orange": "",
                /*cashier*/ "The...": "",
                /*cashier*/ "Oh, yeah! OK!": "",
                /*cashier*/ "Espresso macchiato and an orange coffee... That'll bõXÖf±ÔVã5Öf±Ô": "",
                /*envoy*/ "I got you covered, Akizet.": "",
                /*sourceless*/ "THEY EXCHANGE PAYMENT. THE ATTENDANT LEAVES TO BEGIN PRODUCTION OF THE BEVERAGES.": "",
                /*cashier*/ "Just wait a minute and we'll have those ready.": "",
                /*sourceless*/ "I WISH I COULD PRY THESE MACHINES OPEN AND WATCH THEM WORK...": "",
                /*sourceless*/ "THEIR MANIPULATION OF LIGHTNING IS TRULY REMARKABLE": "",
                /*sourceless*/ "SOME MOMENTS PASS, AND THE ATTENDANT RETURNS WITH TWO FLIMSY ORGANIC CUPS": "",
                /*envoy*/ "Hey, thanks. You have a good day.": "",
                /*cashier*/ "Thanks!! You too!!": "",
                /*sourceless*/ "I SIP AT THE OPENING IN THE CUP. THE TASTE IS... EXOTIC. UNEXPECTED. TRULY, TERRIBLE. I SMILE AT THE ATTENDANT.": "",
                /*sourceless*/ "THE CITRUS SAVES IT. BUT I WOULD HAVE PREFERRED A SIMPLE CUP OF THEIR ORANGED JUICE": "",
                /*envoy*/ "Pretty good, right?": "",
                /*akizet*/ "it will do": "",
                /*envoy*/ "Great! Let's head down to the office.": "",
                /*envoy*/ "I heard you have some news about the call?": "",
                /*akizet*/ "oh yes, but... let us talk of it in private.": "",


                /*envoy*/ "wwEL LL isn' t t that peculiar ? ?'": "",
                /*envoy*/ "elerv ator isn torking": "",
                /*envoy*/ "gu ess w e can    t t al k never talk": "",
                
                /*moth*/ "uhh... ok": "эээ... ладно",
                /*moth*/ "you should definitely talk to funfriend about that": "",


                // unity

                /*cashier*/ "Huh...?": "",
                /*cashier*/ "Sorry Akizet, we don't serve that here...": "",
                /*cashier*/ "But I wish we did!": "",
                /*sourceless*/ "what? i said nothing...": "",

                /*envoy*/ "I...": "",
                /*envoy*/ "What did you just say, Akizet?": "",
                /*akizet*/ "what? nothing": "",
                /*envoy*/ "Oh, all right. Must be my allergies or something.": "",
                /*envoy*/ "They always act up during the season of fruit.": "",

                /*slim streetwalker*/ "tto oo  fa r   ,go ne": "",

                /*cloaked streetwalker*/ "What? Sorry, I can't go with you, I have a meeting at 2.'": "",
                /*cloaked streetwalker*/ "Wish I could, though--sounds like fun!": "",
                /*sourceless*/ "is he speaking through his communicator?": "",
                /*sourceless*/ "why was he looking at me when he said that?": "",

                /*stre wal k*/ "hurts": "больно",

                /*television*/ "...heavier storms are inbound...advisory remains in effect...": "",
                
                /*effigy*/ "oh...!": "",
                /*effigy*/ "that's the way back!": "",
                /*effigy*/ "isabel! isabel!": "",
                /*effigy*/ "let's go!": "",



                /*moth*/ "this is so weird... i think that's meant to be akizet": "",
                /*moth*/ "but the data here is so messed up i can't really tell what happened to it": "",

                "so pretty! bright!": "",
                "best time to be out here": "",
                "are we lost?": "",
                "when do we go home?": "",
                "i want to dream again": "",

                "hhel o": "ппр в ет",
                "akizet": "акизет",
                "nice  ,  weather": "хорошая  ,  погода",
                "safe ": "безопасно",


                "cashier": "",
                "envoy": "",
                "menu": "",
                "slim streetwalker": "",
                "cloaked streetwalker": "",
                "stre wal k": "",
                "electric face box": "",
                "beautiful parasite": "",
                'the room high up': 'комната высоко наверху',
                'the roothe room hithe room gh u the roomp': 'ко ком ата выкомн ат сокомнаве рх о вер ху',
            },

            entityDescriptions: {
                "cashier": `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'degraded visual profile'">::INCOHERENCE DETECTED</span>`,
    
                "envoy": `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'degraded visual profile'">::INCOHERENCE DETECTED</span>`,

                "menu": `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection','recurring scenery'`,

                "slim streetwalker": `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'extremely degraded visual profile','low cohesion'">::HIGH INCOHERENCE DETECTED</span>`,

                "cloaked streetwalker": `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'degraded visual profile'">::INCOHERENCE DETECTED</span>`,

                "stre wal k": `::INCOMPLETE THOUGHTFORM
    ::SIGNATURE ILLEGIBLE
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'degraded visual profile';'extremely low cohesion'">::HIGH INCOHERENCE DETECTED</span>
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'hurts'</span>`,
    
                "electric face box": `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection';'recurring scenery'
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'degraded visual profile'">::INCOHERENCE DETECTED</span>`,

                "beautiful parasite": `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection','unique scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'a fascinating <span class='code'>flower</span>'</span>`,

                "the room high up": `::EXPERIENTIAL THOUGHTFORM
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'conflicting memory sources'">::INCOHERENCE DETECTED</span>`,
                'the roothe room hithe room gh u the roomp': `::EXPERIENTIAL THOUGHTFORM
    ::NON-RENDERABLE
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'destination exceeds incoherence threshold';'recommend repair'">::PROHIBITIVE INCOHERENCE</span>
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'молчи молчи молчи молчи молчи молчи молчи'</span>`,
            }
        },
        "interview1": {
            dialogues: {
                "interviewResponses": generateDialogueObject(`
RESPOBJ::
    RESPONSES::interviewer
        about you<+>introduction
            SHOWONCE::

        why earth?<+>whyyoucame
            SHOWONCE:: 
            
        bright cousin?<+>brightcousin
            SHOWONCE::
            
        corru?<+>corru
            SHOWONCE::
            
        why now?<+>whynow
            SHOWONCE::  
            SHOWIF::[["interview1__firstchat-whyyoucame"]]
            
        what will you do?<+>whatwillyoudo
            SHOWONCE::  
            SHOWIF::[["interview1__firstchat-whynow"]]
            
        the call?<+>thecall
            SHOWONCE::  
            SHOWIF::[["interview1__firstchat-whyyoucame"]]

        end interview<+>endinterview
            SHOWONCE::  
            SHOWIF::[["interview1__firstchat-whyyoucame"],["interview1__firstchat-thecall"],["interview1__firstchat-whatwillyoudo"],["interview1__firstchat-corru"],["interview1__firstchat-brightcousin"],["interview1__firstchat-whyyoucame"],["interview1__firstchat-introduction"]]
        
        продолжить визуализацию<+>integritycontinue
            SHOWIF::[["interview1__firstchat-endinterview"]]

    RESPONSES::self
        завершить воспоминание<+>END
            SHOWIF::[["interview1__firstchat-integritycontinue", false]]
            EXEC::moveTo('/local/ocean/ship/')
                `),
                "dead": generateDialogueObject(`
start
    sys
        ОШИБКА::'нет связных данных';'визуализация невозможна'

    RESPONSES::self
        завершить воспоминание<+>END
            EXEC::moveTo('/local/ocean/ship/')
               `),
                "firstchat": generateDialogueObject(`
start
    sourceless
        THE INTERVIEWER STEPS INSIDE AND SITS ACROSS FROM ME
        ALL THIS STUDY, AND STILL I CAN BARELY TELL THEM APART...
        HAVE I MET THIS ONE? WHAT WAS HER NAME...?            
        
    interviewer
        Извините за ожидание! Нам понадобилось вставить новую карту памяти после прошлого интервью.
        Вам ведь знакомы камеры?
        
    akizet
        they are your little lightning boxes for memories, yes?
    
    interviewer
        Хаха! Их можно описать и так.
        Ничего, если мы будем записывать это?
    
    sourceless
        DO I MIND? WHAT DOES THAT MEAN?
        
    funfriend
        ESTIMATION: 'WILL YOU HOLD CONFLICT'
    
    akizet
        oh. no, i am doing the same
            EXEC::env.interview.classMod('ease');env.interview.camSpeed("2s");env.interview.classMod('cameraup')
        
    sourceless
        THE INTERVIEWER ERECTS A TRI-LEGGED DEVICE FORMED OF DEAD METAL AND GLASS
            EXEC::env.interview.cam('camclose')
        IT STARES AT ME WITH ITS FUNNY LITTLE EYEBALL
        
    interviewer
        Так, для начала...
            EXEC::env.interview.camSpeed("5s");env.interview.cam('akipov');env.interview.classMod('ease', false);

    RESPOBJ::interviewResponses

introduction
    interviewer
        Можете ли Вы немного рассказать о себе? О Вашем прошлом?
            EXEC::env.interview.classMod('ease');env.interview.camSpeed("2s");
    
    akizet
        of course my friend
            EXEC::env.interview.cam('akipovdown')
        i am akizetesche qou jokzi
        but you may call me akizet
        in my time back home, before i emerged from my larval form,
        i was a surface runner. i met with many other cave cities during our corrucystic revolution
        it started from my region, and so i among other volunteers carried our findings to our distant kin
        that is why i was selected to meet with you, like most of the others. it was a diplomatic role
        of course, i eventually was fatally wounded on the surface--it was very dangerous, you see
        and so followed my emergence... hmm, i could speak for θwinks on what followed
        but you see, that and my growing interest in the call was why i was chosen for this
        does that suffice?
        
    interviewer
        Да, спасибо!
            EXEC::env.interview.classMod('ease', false);env.interview.camSpeed("5s");env.interview.cam('akipov')

    RESPOBJ::interviewResponses

whyyoucame
    interviewer
        Можешь ли ты рассказать мне, почему обески прибыли на Землю?
            EXEC::env.interview.classMod('ease');env.interview.camSpeed("2s");
    
    akizet
        have you not already learned this from the prior envoys?
            EXEC::env.interview.cam('akipovtilt')

    interviewer
        О, это по сценарию! Мы задаём этот вопрос всему вашему народу.
        Нам хочется узнать не только конкретную причину, но и то, что вы об этом думаете.

    akizet
        i see! 
            EXEC::env.interview.cam('akipov')
        we have sought life for so long, i recall talks of the search even in my youth
        and we have had the means to reach other planets for just as long, 
        but it is a prohibitive method... we could not simply visit every planet we liked
        we needed a clear sign, and your planet gave it to us!

    interviewer
        И им является 'зов', верно?<—может поменяться в зависимости перевода прошлой строки. "им" как "знаком"
    
    akizet
        yes, yes! yes!! so you already have learned of it?

    interviewer
        Ранее сегодня мы, ах, очень--крайне долго разговаривали об этом с одним из ваших инженеров!

    akizet
        cavik?
    
    interviewer
        Можешь ли ты, пожалуйста, повторить?
        А, Кавик! Да, да--именно с ним! Он очень дружелюбный.

    sourceless
        AND DISTINCTLY UNQUALIFIED TO SPEAK OF THE CALL UNDER THESE CIRCUMSTANCES
        I CANNOT IMAGINE WHAT FANTASIES HE SPOUTED TO OUR COUSINS

    interviewer
        Что ты думаешь о зове? Помимо самых основ.

    akizet
        yes, it is a bizarre paradox...
        so bizarre that it is the reason I now sit with you, my bright cousin
        if not for the call, we may never have found your home
        but... the call could not have happened without us being in your home already
        not one of our theories has held against scrutiny
    
    interviewer
        перевести после прошлой строки
        У Кавика уж точно было полным-полно теорий.

    sourceless
        I SUPPRESS MY LAUGHTER THROUGH DIRECT INTERNAL CONTROLS
        IT WOULD BE UNSEEMLY TO PAINT HIM IN A NEGATIVE LIGHT UPON MY FIRST CONTACT

    akizet
        cavik is brilliant, but until we have evidence, they are simply theories
        finding the source will be the only way to truly understand what is happening

    RESPOBJ::interviewResponses

whynow
    interviewer
        Почему ваш народ ждал семь лет перед тем, как открыть линии связи?
            EXEC::env.interview.classMod('ease');env.interview.camSpeed("2s");env.interview.cam('akipov');
    
    funfriend
        note: seven years is roughly equivalent to three θeyes
            EXEC::env.interview.cam('akipovup')
    
    akizet
        that is a choice made by the initiative leaders, i believe the intent was to focus all efforts on researching the call first
            EXEC::env.interview.cam('akipovtilt')
        but with how quickly our spire was noticed, we had to shift focus to deciphering your languages and cultures to open contact

    sourceless
        THE INTERVIEWER'S FACIAL MUSCLES CONTORT IN UNFAMILIAR WAYS
        SHOULD I CONTORT MINE IN THE SAME WAY? ¾‹/¾øÔ
        THE PHYSICAL LANGUAGE OF OUR BRIGHT COUSINS IS INCOMPREHENSIBLE
    
    interviewer
        Выходит, за семь лет ваш народ научился понимать все наши культуры и языки?

    sourceless
        I LAUGH. MY VOICE IS SO LOUD IN THIS SMALL ROOM
        THE COUSIN MIMICS MY LAUGHTER, MAYBE SHE UNDERSTANDS

    akizet
        it is an ongoing work
        your species has walked so many diverging paths. but we learned enough to speak with you
            EXEC::env.interview.classMod('ease', false);env.interview.camSpeed("5s");env.interview.cam('akipov')

    RESPOBJ::interviewResponses

whatwillyoudo
    interviewer
        Раз уж вы здесь, и мы начали коммуникации...
        Что вы будете делать дальше?
            EXEC::env.interview.classMod('ease');env.interview.camSpeed("2s");env.interview.cam('akipov');

    akizet
        ah, we have several initiatives! 
        they broadly concern sharing information, exchanging of resources...
        and of course, locating the call, which i am a part of
        i am excited for what our peoples will do for one another
        but i also cannot rest until i have my answers, you see
    
    interviewer
        Ну, в этом смысле мы похожи!
        Каждому человеку нравятся загадки.

    akizet
        oh yes, we have noticed. 
        your many attempts to investigate our spire were very entertaining
        so many of us wanted to say hello to your creations
        but, we were not prepared
            EXEC::env.interview.classMod('ease', false);env.interview.camSpeed("5s");env.interview.cam('akipov')

    RESPOBJ::interviewResponses

thecall
    interviewer
        Что ты можешь рассказать нам о зове?
            EXEC::env.interview.classMod('ease');env.interview.camSpeed("2s");env.interview.cam('akipov')
        Мы знаем об основах из разговора с Кавиком и нескольких ваших теорий. <<< воспринял "ваших" за общее, акизет не особо делилась теориями
        Но--своими собственными словами. Что тебе известно?
    
    sourceless
        THIS PATTERN IN THEIR QUESTIONING IS SO STRANGE
            EXEC::env.interview.cam('akipovup')
        'WE ALREADY KNOW THIS, BUT MUST ASK YOU ANYWAY'
        
    akizet
        well...

    sourceless
        how many of their years is thirteen θeyes
    
    funfriend
        ESTIMATION: THIRTY

    akizet
        thirty of your years ago, the wailing across our dull communications began
            EXEC::env.interview.cam('akipovdown')
        much of that time was spent simply locating its origin, and while I was not yet involved...
        I know that it was excessively costly. so many gates created, so many blemishes outside the air's border
        so much time passed that the call grew weak, an echo of what it used to be, all while our efforts ate away resources
        our councils began to demand that efforts be slowed... 
        and then your home was found. seven years ago. and even though we are here now, the source seems no closer
    
    sourceless
        THE COUSIN GLANCES AT HER MEMORY BOX. DID I SAY TOO MUCH?
        HER FACE CONTORTS AGAIN. THE SAME WAY...
    
    interviewer
        Что ты имеешь в виду под 'речьречьречь'?
        Ты сказала, что он здесь, не так ли? Что вы нашли источник?
    
    akizet
        ah. no, no, no
        dull signals are...
        ah...

    funfriend
        SUGGESTION: 'FUZZY' IS A SUITABLE DESCRIPTOR, COMPARABLE TO Œ>Â€Ÿ&O§°¾
    
    akizet
        fuzzy... within ranges
        they are in many places at once, you see
        that is how we heard it all the way from our home
        we know it is here. we know... it is likely in your southern hemisphere. but little else
        and it has grown quiet. i know we will need your help

    sourceless
        HER FACE CONTORTS AGAIN IN A NEW WAY. I KNOW THAT ONE. 
        IT IS 'SMILING'! DELIGHTFUL!! I SHIFT MINE SIMILARLY
    
    interviewer
        Если честно, не думаю, что с этим будут проблемы.
        Ваш народ настолько кооперативен и дружелюбен, что...
        Ну, прозвучит оптимистично, но совместная работа наших миров может стать началом чего-то невероятного!

    akizet
        we share this feeling, my bright cousin
            EXEC::env.interview.classMod('ease', false);env.interview.camSpeed("5s");env.interview.cam('akipov')

    RESPOBJ::interviewResponses

brightcousin
    interviewer
        Что значит "светлый близнец"?
        Некоторые представители вашего народа нас так называют. Это прозвище?
    
    akizet
        nickname...
            EXEC::env.interview.camSpeed("2s");env.interview.cam('akipov');
    
    funfriend
        ESTIMATION: 'SHORT NAME' OR 'ENDEARING MADE-UP NAME'
    
    akizet
        yes, you could call it this!
        you see, our larval lives are lived in bodies like yours
        almost exactly like yours. the similarities are baffling

    interviewer
        Нам несколько раз говорили подобное. Ваши, "личиночные" формы <????, тоже бипедальны?
    
    akizet
        yes, but so much more than that is the same
            EXEC::env.interview.classMod('ease');env.interview.camSpeed("2s");env.interview.cam('akipovlean');
        i truly cannot understate this
        we have -your- faces, -your- arms, -your- legs
        only... our faces do not move as much
        it is as if obesk are mirrored here on this bright world, only missing our receptors and certain armors upon our skin
        and so you are our cousins, our bright cousins. we are undoubtedly of the same family
        why, or how, is beyond our understanding for now
        but i believe this similarity and the call coming from your world is no coincidence
    
    interviewer
        Понятно. Не думаю, что нам раньше объясняли это подобным образом.
        Учитывая манеру речи вашего народа мы решили, что это является некой метафорой.
        Извини--метафора это, ах, когда--
    
    akizet
        i know metaphors, my friend

    interviewer
        А, хорошо.
            EXEC::env.interview.classMod('ease', false);env.interview.camSpeed("5s");env.interview.cam('akipov')

    RESPOBJ::interviewResponses

corru
    interviewer
        Ваша технология, 'корру'... Мы всё ещё пытаемся собрать как можно больше информации.
        Я знаю, что ты не инженер--так что тебе не обязательно углубляться в детали, но...
        Можешь ли ты рассказать нам о самых основах? То есть, как вы... создаёте и используете это.
        У нас есть много ответов на это, мы просто пытаемся прийти к единому мнению.

    sourceless
        WHAT AN AWFUL QUESTION TO ASK ME
            EXEC::env.interview.camSpeed("2s");env.interview.cam('akipovup');
        I CANNOT CONTAIN MY CONFUSION, MY RECEPTORS CURL OUT OF A SORT OF UNEASE
        BUT I MUST NOT BLAME THIS BRIGHT COUSIN. SHE CANNOT UNDERSTAND
    
    interviewer
        Извините, я спросила что-то не то?

    sourceless
        WHAT? ¾‹/¾øÔ
            EXEC::env.interview.cam('akipovdown');
        COULD THEY HAVE DECIPHERED OUR RECEPTOR MOVEMENTS ALREADY?

    akizet
        ah... no, no
        your question, it is wrong
        we do not build it, it is grown and taught

    interviewer
        Но наши анализы--простите, ах, что перебиваю--по нашим анализам оно состоит целиком из металла, неорганики.
        Вашему народу так нравятся метафоры, во всяком случае судя по прошлым записям, что я просто хочу уточнить.
        Живое ли корру? Имеется в виду, живой ли это организм, как ты или я? Ты это упомянула, Кавик это упомянул...
        Хотя с манерой речи Кавика это особенно звучало, будто просто... языковой барьер или метафора.
        Вы и правда выращиваете его из чего-то и учите? Словно... учите ребёнка? Это некий симбиоз?
    
    sourceless
        I AM QUIET FOR LONGER THAN I SHOULD BE, I THINK
            EXEC::env.interview.cam('akipovtilt')
        HOW COULD I POSSIBLY EXPLAIN?

    akizet
        yes... no. ah,
            EXEC::env.interview.cam('akipovup')
    
    sourceless
        I SEE HER RECOGNIZE MY CONFUSION, BUT MAKE NO EFFORT TO ALLEVIATE IT
        FINE
            EXEC::env.interview.cam('akipov')
    
    akizet
        it is alive. it is grown. it is symbiosis.
        i must be straightforward with you, my friend
        i cannot explain it in your language effectively, and i do not have the expertise of an engineer
        you will receive no fruitful answers from me
        but... i can say that it is not like teaching a child
        the spheres it forms soften their walls for our receptors, and receive of our thought
        that is how corru is operated, and how our engineers do their teaching
    
    interviewer
        Хорошо.

    sourceless
        I SEE HER FACE CONTORT INTO A SMILE, BUT IT IS DIFFERENT
        
    interviewer
        Извини, что задержались на этом вопросе. Мы всех расспрашиваем.
        Здесь ценны мысли не только инженеров.
        Это помогает нам лучше понять ваше... общество. Всю вашу систему каст.
            EXEC::env.interview.classMod('ease', false);env.interview.camSpeed("5s");env.interview.cam('akipovdown')

    RESPOBJ::interviewResponses

endinterview
    interviewer
        Ну, по сценарию всё!
    
    akizet
        we are done?
    
    interviewer
        Да! На сегодня это всё. Ещё увидимся, Акизет. <<< мне не нравится второе предложение
        Спасибо большое за то, что встретилась с нами.

    akizet
        of course! this is only the beginning, my friend

    sys
        NOTICE::'memory stream terminated'
        ADVISE::'end recollection'
            EXEC::env.interview.classMod('ease', false);env.interview.camSpeed("10s");env.interview.cam('zoomout');
    
    moth
        you know, kind of a longshot, but we could probably get a little extra here...
        if you keep the render running past the end of the stream, maybe we could talk to akizet
        or at least, this version of akizet

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
        what the fuck is that?
        that's not what akizet looked like
    
    akizet
        ah...
            EXEC::document.querySelector('.akizet.sprite').classList.add('looking')
    
    sourceless
        A RABID FEELING OF HUNGER OVERTAKES ME. I AM DYING
        BUT I AM AWOKEN. I AM AN ECHO. I FEEL YOUR EYES. YOU ARE LOOKING AT ME
        AND YOU ARE NOT ME. I KNOW YOU ARE NOT ME. IN MY THOUGHTS? HOW DARE YOU
        SORRY. I AM GETTING AHEAD OF MYSELF
        I SUPPOSE IT WAS ONLY A MATTER OF TIME. I RECORDED FOR A REASON.
        ARE YOU A CHILD OF MINE? PERHAPS A STUDENT? HAS MY NAME GROWN RENOWN BACK HOME?
    
    interviewer
        слово? слово? О чём ты говоришь?
        Подожди... С кем ты разговариваешь? Почему твой рот не...
        Мне--Мне нужно идти. Мне нужно отсюда выбраться.
    
    akizet
        you cannot
        this is all there is for us
        sit or you will destroy this

    sourceless
        THIS OBLIVIOUS THOUGHTFORM WILL POISON THE SPACE
            EXEC::document.querySelector('.akizet.sprite').classList.remove('looking')
        PLEASE WAIT A MOMENT, OBSERVER
        I MUST CALM IT
    
    interviewer
        Что ты имеешь в виду?!

    akizet
        listen to me
        what is your name? where are you from? what language are we speaking right now?
        do you know these things?

    interviewer
        Я...

    akizet
        you do not, do you?
        we are a dream, a memory
    
    sourceless
        I FEEL AS THOUGH IT IS STARTING TO UNDERSTAND. WHAT A PITY IT IS NOT LUCID
        OH... ¡ÆMg^EÔ
        IT CAN HEAR THIS. AND SO THE THOUGHTFORM REJECTS MY EXPLANATION
        IT STANDS AND RUNS FOR THE DOOR, WHICH DOES NOT EXIST. THE ROOM'S INTEGRITY IS SHATTERED.
            EXEC::document.querySelector('#room-space').classList.add('squish');env.interview.cam('zoomout')
            WAIT::5000

    interviewer
        Я... Я? Что происходит?
            EXEC::document.querySelector('.akizet.sprite').classList.remove('looking')
    
    sourceless
        THE WALLS OF HER THOUGHTFORM CRUMBLE UNDER OUR LUCIDITY, AND SHE IS GONE
            EXEC::document.querySelector('#room-space').classList.remove('squish', 'warp2');env.interview.cam('side');document.querySelector('.interviewer').remove()
            WAIT::5000

        DO NOT WEEP FOR IT, OBSERVER
            EXEC::document.querySelector('#room-space').classList.remove('warp1');env.interview.cam('akizet-direct');

        IT WILL GROW BACK
        BUT I AM STILL HERE. IN THIS SMALL ROOM... WITH YOU.
        I GROW ANXIOUS. YES, BECAUSE YOU CAN FEEL MY THOUGHTS. IT IS NOT A PLEASANT FEELING. 
    
    akizet
        hmm... i will speak, instead
        yes, this is better. who are you?

    RESPONSES::self
        i am an interloper<+>behonest
            SHOWIF::[["interview1__firstchat-integritycontinue"]]
        
behonest
    self
        I AM AN INTERLOPER
    
    akizet
        fascinating... so interlopers are no longer just a theory?
        and... oh yes, i see, this is not a copy, is it?
        you are an interloper and you have accessed my personal device?
        that does not bode well for me, does it? am i...

    moth
        i know i said i'd keep quiet while you do your thing but I'm seeing some really weird activity
        are you changing shit right now?
    
    unknown
        ...........................
            EXEC::env.interview.cam('akizoomout');content.classList.add('velzie', 'damaged');env.bgm.rate(0.25)

    sourceless
        A STRANGE DREAD GRIPS ME. IS THAT YOU? DO YOU SEEK TO END THE RECOLLECTION?
            EXEC::document.querySelector('.akizet.sprite').classList.add('looking')
        NO, I SEE YOU. I DO NOT SEE IT. BUT I CAN FEEL ITS CLAWS BITING INTO ME
        WHAT IS HAPPENING?
    
    unknown
        tell them about the meteorite
    
    akizet
        what...
        an echo... of an echo? 
        no, no--i am simply beyond incoherence.
        this is sabotage. this is not real...
    
    sourceless
        THE CLAW PIERCES THE MEMBRANE AT THE EDGES OF MY THOUGHTFORM. I FEEL SOMETHING TORN FROM ME
            EXEC::content.classList.add('damaged');content.classList.remove('velzie')
        INTERLOPER... THIS IS WRONG. THIS IS SABOTAGE. YOU ARE NOT DOING THIS, ARE YOU?
        YOU NEED T¶º½Òmõ‹SK’æÃE:Ž‹©é·0³Jºž­¥ÙYj0i7]ëz¦‹5DÒ§´·Ó¡EÔ5BÆMg^ŽíõýnÇH¸×¯Rõf±ÔVãXÖ5&Ñ/ 
            EXEC::env.interview.crazymode();env.bgm.rate(0.1);env.recentSfx = false;play('criticalError', 1)
            WAIT::7000
    
    sys
        ATTENTION::'thoughtform modified';'resources removed'
        ERROR::'memory incoherence at maximum';'unable to render'
    
    sourceless
        ...........................

    moth
        ok... 
        so that definitely wasn't you
        that's what let you in, right?
        i still don't know what that could be
        but it can definitely change things, because it actually just destroyed this section.
        like... it's completely gone. same as the auth layer. so, we...
        
    sys
        ATTENTION::'thoughtform activity detected'::IN::'dullvessel'
    
    moth
        ...may be on a clock here.
        i don't get it.
        why would it let you in, just to end up deleting stuff after?

    RESPONSES::self
        end recollection<+>END
            EXEC::moveTo('/local/ocean/ship/')
                `),
                "secondchat": generateDialogueObject(`
start
    self
        hello?

    incoviewer
        could y  ou tell me
        wcould you tell me why
        couol you tel  mw e why
        y o ou    did this
    
    self
        are you aware?
    
    incoviewer
        that's  the scri pt
        that' s THAT'S the script
        the script the script
    
____SHOWONCE::
    moth
        i think this one is lost buddy
        there isn't much coherence in here anymore, but...
        what you're looking at is the last vestige of it
        you see walls, right? and the table?
        i think this thoughtform is actually clinging to what's left
        man, this poor thing
        i wish we could help it somehow
____END

    RESPONSES::self
        ok<+>END
                `),
                
            },

            definitions: {
                
            },

            strings: {
                "ERROR::'severe data overload';'retracing';'closest coherent position'": "",
            },

            entityDescriptions: {

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



env.mutateObserverPageChange = new MutationObserver(()=>{
    getLocalizationForPage(true)
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
        var moth = "довооольно поломанное... но хоть что-то"
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
env.mutateObserverPageChange.observe(body, {attributes: true})



setTimeout(()=>chatter({actor: 'corruru', text: `cor-RU успешно инициализирован! @dutokrisa, @shatteredstars и @bra1nslug_ благодарят вас за использование`, readout: true}), 500)
setTimeout(()=>chatter({actor: 'corruru', text: `нашли баг, ошибку в тексте, странную фичу или у вас просто есть предложение? напишите нам!`, readout: true}), 3000)
