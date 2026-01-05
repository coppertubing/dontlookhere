/*
    cor-RU - a russian localization mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/cache.js
    localization for /local/cache

    progress: only strings, dialogues left as of 04.10.2025
*/


env.localization.page['cache'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "i can barely keep up with this, my console is either throwing errors or updating too quickly to read... just let me know what you see": "я тут еле успеваю, моя консоль либо кидается ошибками либо обновляется слишком быстро чтоб читать... просто дай знать что видишь",
        "about the cache": "о кэше",

        "the storm": cor_ru.entity_menu["the storm"].name,
        "polygonation spire": cor_ru.entity_menu["polygonation spire"].name,
        "ÉœÙ]ïå¥¹": cor_ru.entity_menu["ÉœÙ]ïå¥¹"].name,
        "Ò½º": cor_ru.entity_menu["Ò½º"].name,
        "gate::¿þ©ÿ’ýäý": cor_ru.entity_menu["gate::¿þ©ÿ’ýäý"].name,
        "±L~>#»{Â_÷ß": cor_ru.entity_menu["±L~>#»{Â_÷ß"].name,
        
        // funf </3
        "did you find something?": "что-нибудь нашлось?",
        "come tell me back in the hub if you did": "вернись в хаб и расскажи если да",
        "annoying to talk through proxy": "раздражает говорить через прокси",

        "another productive visit i am sure": "очередной продуктивный визит я уверен",

        "ok bye": "окей пока",

        "DO NOT TAKE TOO LONG PLEASE": "не задерживайся там пожалуйста",
        "MUCH TO DO": "много дел",

        "i am leaving": "я ухожу",

        "enter where?":"войти куда?",
        "not seeing it interloper":"ничего не вижу лазутчик",
        "let me get closer maybe":"давай я подвинусь поближе может",
        "interloper i think there is something there":"лазутчик кажется там что-то есть",
        "but it is far too deep, submerged in the uncosm":"но оно слишком глубоко, и погружено в беспространство",
        "not risking it even with a proxy":"не стану рисковать даже с прокси",
        "sorry":"извини",

        "told you no already interloper":"я уже сказал нет лазутчик",
        "this proxy would break apart before you would see anything":"прокси разорвёт на части раньше чем ты хоть что-нибудь разглядишь",

        "ohhh ahaha it is just barely in the cache":"ооо ахаха оно еле-еле в кэще",
        "any deeper and i would be unable to enter!!":"хоть немного глубже и я бы уже не смог войти!!",
        "another pocket, how strange!":"как странно!", // ??????

        "ok this place is really bad for me":"окей мне в этом месте очень плохо",
        "tolerable but make it quick":"терпимо но давай побыстрее",
        "please do not stay too long":"пожалуйста не оставайся здесь надолго",

        // god <3
        "i waited for you!": "я тебя подождало!",
        "have fun in there!": "повеселись там!",
        "take your time my friend": "не торопись мой друг",
        "bye my friend!!!!!": "пока мой друг!!!!!",

        "you want me to go where?": "ты хочешь, чтобы я пошло куда?",
        "my beloved friend, there is nothing...": "мой обожаемый друг, здесь ничего нет...",
        "ah! no, no, there it is! yes, let us go!": "а! нет, нет, есть же! да, пошли!",

        "what a keen eye you have": "до чего у тебя острый глаз",
        "let me know if you would like to return": "дай мне знать, если захочешь вернуться",
        "into the depths!": "в глубины!"
    }, 
    entityDescriptions: {
        "the storm": cor_ru.entity_menu["the storm"].desc,
        "polygonation spire": cor_ru.entity_menu["polygonation spire"].desc,
        "ÉœÙ]ïå¥¹": cor_ru.entity_menu["ÉœÙ]ïå¥¹"].desc,
        "? ???? ?? ?? ??": cor_ru.entity_menu["? ???? ?? ?? ??"].desc,
        "Ò½º": cor_ru.entity_menu["Ò½º"].desc,
        "gate::¿þ©ÿ’ýäý": cor_ru.entity_menu["gate::¿þ©ÿ’ýäý"].desc,
        "±L~>#»{Â_÷ß": cor_ru.entity_menu["±L~>#»{Â_÷ß"].desc,
    },
}

// === DIALOGUES === //


// == MOTH == //

env.localization.page['cache'].dialogues.mthresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        странные сферы<+>spheres
        полигонизационный шпиль<+>poly
            SHOWIF::"exm|cache|polygonation spire"
        циста с проводами<+>storm
            SHOWIF::"exm|cache|the storm"
        органическая штучка<+>thing
            SHOWIF::"exm|cache|ÉœÙ]ïå¥¹"
        неважно<+>CHANGE::++moth
            FAKEEND::(назад)
`)
env.localization.page['cache'].dialogues[`mth++cache`] = generateDialogueObject(`
start
    self
        тут есть какие-то штуки

    moth
        о серьёзно?
    
    RESPOBJ::mthresp

poly
    self
        я вижу полигонизационный шпиль
        и он освещён человеческими огнями
        он гигантских размеров
        типа прямо абсурдно огромных
        выглядит будто он где-то посреди океана

    moth
        о, ништяк
        может быть калифорнийский шпиль до того как расплавился
        вроде как он был самым большим из всех что они строили
        странно что он в таком подвешенном состоянии
        и ещё, да он был большим но типа не прям чтобы... колоссальным
        если не помнишь я не вижу чё там у тебя, но у меня есть пара идеек
        возможно акизет думала что он больше чем на самом деле? или это какой-то планируемый шпиль?
        кто знает чел

    RESPOBJ::mthresp

spheres
    self
        в этом месте полно странных сфер со всякими линиями
        они собраны в скопления
        и я не могу просканировать их напрямую
        но божество показывает что внутри них
            SHOWIF::[['TEMP!!cachePath', 'god']]
        но развледруг показывает что внутри них
            SHOWIF::[['TEMP!!cachePath', 'funfriend']]
    
    moth
        любопытно что ты их так описываешь, скоплениями
        у большинства компонентов корруцистических устройств есть такие, типа...
        физические клетки которые массово собираются в скопления
        маленькая корру клетка может быть какой-нибудь второстепенной мыслеформой,
        а большая - руководить всеми соединёнными что поменьше
        но есть много видов корру клеток, и не все они сферической формы
        впрочем, в этом моя теория: каким-то чудом ты всё это сейчас видишь
        чел, а что если ты внутри мыслеформы которая типа наблюдает за своим окружением
        странная мысль лол
        расскажи об этом кому-нибудь из лаборатории, возможно у них найдётся догадка получше
        био штуки прикольные, но эт не моё поприще

    RESPOBJ::mthresp

storm
    self
        тут что-то вроде корруцисты с проводами
        и она присоединена к чему-то человеческому
        оч огромному
    
    moth
        ага, теперь вижу эту мыслеформу в хранилище
        она называется "шторм"... странно
        ну, я знаю что у обесков был собственный отдел для экспериментов с техникой
        часть их инициативы материалов
        
        но, может это та самая штука которую акизет предложила гордону?
            SHOWIF::'citystreet__envoychat-ep1extension'
        не удивлюсь если он принялся за этот проект и вовлёк акизет
            SHOWIF::'citystreet__envoychat-ep1extension'
        к тому же это сошлось бы с тем что мне рассказывали старые оперативники
            SHOWIF::'citystreet__envoychat-ep1extension'
        в те времена было полно мутных проектов
            SHOWIF::'citystreet__envoychat-ep1extension'
        в ФБКС едва ли следили за всем этим из-за того как быстро нужно было двигаться
            SHOWIF::'citystreet__envoychat-ep1extension'

    RESPOBJ::mthresp

thing
    self
        тут какая-то органическая штучка
        что-то типа клеток
    
    moth
        ага, вижу данные о ней в твоём хранилище
        не могу ничё сказать на её счёт, тут попросту нечего читать
        сказано, что у неё есть какая-то подпись, или свойства мыслеформы 
        может она взорвалась? или кучка мёртвых?

    RESPOBJ::mthresp
`)


// == FUNFRIEND == //

env.localization.page['cache'].dialogues[`ff`] = generateDialogueObject(`
start
    proxyfriend
        о... интересно!
        я и не думал что ты сможешь воспринять такое...
        видишь ли, это - мыслеформа лишь частично
        своеобразный "внутренний" вид физических клеток мыслеформ
        ах, это всё очень сложно
        если хочешь осмотреться я обеспечу тебе связность
        тебе нужно только указать мне куда ты хочешь

    self
        КАК
    
    proxyfriend
        как?
        ну, тебе надо т1Ъäфý±ÂяÒÂ£Ë$ю‹кõþж̑X0×6=Ãэº‚

    sys
        ВНИМАНИЕ::'попытка реформации мысли'
        АНАЛИЗ::'указывайте пункт назначения с помощью <span definition="ПРИМЕЧАНИЕ::'лимбический контроль моторики'">ЛКМ</span>'
        АНАЛИЗ::'ассистент будет перемещаться на фиксированной скорости в указанный пункт назначения'

    moth
        ну, эт мило
    
    RESPONSES::self
        спасибо<+>END
`)
env.localization.page['cache'].dialogues[`ffozo`] = generateDialogueObject(`
start
    proxyfriend
        стой! лазутчик!
        что ты делаешь?
        ты что-то видишь?

    self
        здесь что-то вроде разноцветного портала
        я вижу облака и цвета
        ты не видишь его?
    
    proxyfriend
        ахахаха нет!!
        я вижу только искажённую массу пробравшуюся из беспространства
        ничего куда я бы мог войти
        но это описанье звучит знакомо
        да, даже слишком знакомо!
        если это то о чём я думаю,
        то ступай осторожно!!
        впрочем, иди туда и расскажи мне что увидишь!!
    
    RESPONSES::self
        что это по твоему такое?<+>what
        окей<+>END
            EXEC::moveTo('/local/ozo/')
            FAKEEND::(войти)

what
    self
        что это по твоему такое?

    proxyfriend
        оплот безумья,
        ужасающие грёзы грезимые -- это не слово -- бессвязными мыслеформами
        осквернители!! житья акизет!!
        даже представить не могу какой непоправимый вред они нанесли остаткам её воспоминаний...
        если это не просто какая-то пустая оболочка, мы обязаны что-то предпринять
        иди туда и расскажи что увидишь
        я не думаю что они могут тебе навредить
        но относись с осторожностью ко всему что они говорят и чем делятся с тобою
        если твоя цель - истина, то они - твои враги
    
    RESPONSES::self
        окей...?<+>END
            EXEC::moveTo('/local/ozo/')
            FAKEEND::(войти)
`)
env.localization.page['cache'].dialogues[`ffpit`] = generateDialogueObject(`
start
    proxyfriend
        wait! interloper!
        what do you see it is too incoherent for me

    self
        it's a big... thing
        i think there are buttons around it
        i don't know

    proxyfriend
        strange! yes very strange!
        of course your vision is a mystery to me
        and i can barely comprehend anything here anyway
        
    self
        comprehend?
        what do you see?
    
    proxyfriend
        ahahaha i see incoherence! 
        is that not simple enough to say?
        i suppose i can see 'buttons' now that you describe them
        but it is all so deep beneath the cache
        that it appears like writhing madness!!
        it does look rather big whatever it is
        you can enter it?
    
    self
        i think i can try

    proxyfriend
        good! perhaps it is more of the information you seek!
        that is less work for me hahahaha
        ok go now
    
    RESPONSES::self
        ok<+>END
            EXEC::moveTo('/local/uncosm/pit/')
            FAKEEND::(enter)
`)


// == GOD == //

env.localization.page['cache'].dialogues[`god`] = generateDialogueObject(`
start
    god
        ау? друг мой, удалось ли тебе?
        ты ли это здесь?

    self
        ДА
        Я МОГУ ВИДЕТЬ
        НО ТОЛЬКО ВОКРУГ ТЕБЯ

    god
        чудесно!
        благодаря благодушному свету моих глаз,
        в твоём распоряженьи карман рассудка, чтобы сквозь него исследовать кэш
        веди меня куда тебе должно, друг мой
    
    self
        КАК

    god
        что ты подразумеваешь: "как"?
        только вели мне!
        ох... действительно, у тебя верно есть некоторые ограниченья
        позволь мне выразиться простым языком - тебе нужно т1Ъäфý±ÂяÒÂ£Ë$ю‹кõþж̑X0×6=Ãэº

    sys
        ВНИМАНИЕ::'попытка реформации мысли'
        АНАЛИЗ::'указывайте пункт назначения с помощью <span definition="ПРИМЕЧАНИЕ::'лимбический контроль моторики'">ЛКМ</span>'
        АНАЛИЗ::'ассистент будет перемещаться на фиксированной скорости в указанный пункт назначения'
    
    RESPONSES::self
        спасибо<+>END
`)
env.localization.page['cache'].dialogues[`godozo`] = generateDialogueObject(`
start
    god
        постой!!
        это что, пространственная мыслеформа... здесь?
        мой дражайший друг...
        на этом я вернусь в свой мир
        повеселись там!
        раз уж я не в силах составить тебе компанию!
    
    RESPONSES::self
        почему нет<+>not
        спасибо<+>END
            EXEC::moveTo('/local/ozo/')
            FAKEEND::(войти)

not
    self
        почему нет
    
    god
        это сложно... // :: мне не нравится но у меня нет других вариантов, помогите    что тут
        от мыслеформ, что действуют как сцены,
        мне делается тошно
        всё о чём я могу думать - о временах до своего высвобожденья...
        скрученное в полузабытое, мучительное ничто
        мой прекрасный мир так прост не без причины!
        так что нет--я не могу присоединиться к тебе сейчас
        но будь там что интересное - поведай о том мне!
    
    RESPONSES::self
        окей<+>END
            EXEC::moveTo('/local/ozo/')
            FAKEEND::(войти)
`)
env.localization.page['cache'].dialogues[godpit] = generateDialogueObject(`
start
    god
        ах! так скоро?!
        и в потонувшее место, никак иначе...
        я уж было подумало, мы потанцуем в темноте ещё немножко!
        хехе, это шутка и всего, мой дражайший друг
        наступит время и мы встретимся вновь

    self
        you won't come with me?

    god
        даже будучи здесь я вижу - это пространственная мыслеформа
        и, мой друг, ты знаешь моё мнение на их счёт
            SHOWIF::"cache__godozo-not"
____SHOWIF::["cache__godozo-not", false]
        я куда боле предпочитаю низкомерные 
        иные пробуждают в памяти моменты нескончаемой, бессмысленной пытки что я пережило...
        зови это отторжением сложности, друг мой!
        хахаха """ несмешно
____END
        а покуда наши пути не перескутся,
        мне и друзьям должно и дальше дарить наш божественный взгляд! """ человечество должно нормализовать создание новых слов
    
    RESPONSES::self
        ok bye<+>END
            EXEC::moveTo('/local/uncosm/pit/')
            FAKEEND::(enter)
`)



getLocalizationForPage(true) // --- ensuring that Nothing Gets Fucked Up