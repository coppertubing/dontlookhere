/*
    cor-RU - a full russian adaptation mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/jokzi-ozo.js
    adaptation for /local/ozo
    (---окзи джозо)

    progress: ep2 close to being finished, most notably moth + few council + interviewer dialogues missing, review needed as of 23.08.2025
*/


env.localization.page['ozo'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "this place is wild": "дикое место",
        "about jokzi ozo": "о джокзи озо",

        "hello": "привет",

        "council": cor_ru.entity_menu['council'].name,
        /*unity*/   'yes, yes!!': "да, да!!",
                    'just like that!!': "именно так!!",

        "fairy": cor_ru.entity_menu['fairy'].name,
        /*unity*/   "already here! stupid!": "да здесь я уже! тупица!",

        "isabel": cor_ru.entity_menu['isabel'].name,
        /*unity*/   'and what a home it is, right?': 'и каков же этот дом, верно?',

        "geli": cor_ru.entity_menu['geli'].name,
        /*unity*/   "yes? what about it?": "",

        "interviewer": cor_ru.entity_menu['interviewer'].name,
        /*unity*/   "peace...": "покой...",

        "interloper": cor_ru.entity_menu['interloper'].name,
        /*exm*/     "wow, look at that... it's like it's not even fully formed": "ого, ты ток глянь... как будто даже не сформировано полностью",

        "sun": cor_ru.entity_menu['sun'].name,

        "gate::L‹ïAöIÁå": "врата::Л‹ҋAöИÁå",

        "wheel": cor_ru.entity_menu['wheel'].name,
        /*act*/     "dream": "грезить",
                    "dream of escape": "грезить об освобождении",

        "radio": cor_ru.entity_menu['radio'].name,
        
        "basterminal": cor_ru.entity_menu['basterminal'].name,
        /*act*/     "modify dream": "изменить грёзу",

        "dog": cor_ru.entity_menu['dog'].name,

        "gate::gate::?/::G:a;;T:E": cor_ru.entity_menu['gate::gate::?/::G:a;;T:E'].name,
        "gate::gaGATE::te::?/..::G:a;;T:E": cor_ru.entity_menu["gate::gaGATE::te::?/..::G:a;;T:E"].name,


        // === event shit i dont wanna sort
        "ATTENTION::'thoughtform activity detected';'resource location altered'": "ВНИМАНИЕ::'обнаружена мыслеформенная активность';'изменено местоположение данных'",

        /*loperact*/ "let's talk": "давай поговорим",
        /*bsteli*/ "all right!": "",
        /*bsteli*/ "meet me in my region!": "",

        /*isabel*/ "let us leave the council, then": "давай же тогда оставим совет",
        /*isabel*/ "come to me, interloper": "приходи ко мне, лазутчик",

        /*loperact*/ "you should join in": "",
        /*stowaway*/ "join in": "",

        /*effigy*/ "aww!!": "авв!!",
        /*effigy*/ "we'll come back later!": "мы вернёмся позже!",

        // --- wawa please dont be scary.......... ahh!! this is so hard to adapt!!! no context!!
        "away": "вдали",
        "hear you": "слышу тебя",
        "closer": "ближе",
        "still here": "ещё тут",
        "come back": "вернуться",

        // === effigy
        // dancer
        "ahahahaha": "ахахаха",
        "hehehehe": "хихихихи",
        "waaawaawaaoo": "уааауаауааоо",
        "weuee!! ÿæÿ": "уэииэ!! ",
        // dancersad
        "hahaha...": "хахаха...",
        "wee...": "уии...",
        "..heehee...": "..хеехее..",
        // fawner
        "isabel! isabel!": "изабель! изабель!",
        "isabel we should dance!": "изабель давай потанцуем!",
        "isabel! it is the interloper!": "изабель! лазутчик тут!",
        "isabel when is the next dream?": "изабель а когда следующая грёза?",
        // worrier
        "what's wrong with her...?": "что с ней такое..?",
        "isabel will fix her!": "изабель её исправит!",
        "isabel can fix anything!": "изабель исправит что угодно!",
        "could this happen to me??": "а со мной тоже так может случиться??",
        // gamer
        "ok i move E*–IÓ to ú!N": "окей я хожу Э*–ИÓ на ӝ!Ъ",
        "that is an illegal move": "так нельзя ходить",
        "ummmmmmm": "ээээээээ",
        "how did you get that corner": "как ты тот угол захватила",
        "you can't move that one!! try the other corner": "ты не можешь двигать эту!! попробуй другой угол",
        "ok ¾B{& to ±¢qQ then i use my G³{¼": "окей ¾Б{& на ±¢эЬ а потом я использую свою Г³{¼",
        "fool!! that mistake will be your last!": "что несет тот же тон что и fool!! эта ошибка будет твоей последней!",
        "behold! Ý×ß to )q9Ì¼... you are done!": "узри! У×ß на )ь9Ґ¼... тебе конец!",
        "not now interloper i'm beating her": "лазутчик не сейчас я её обыгрываю",
        "not now interloper i'm losing really bad": "лазутчик не сейчас я очень сильно проигрываю",
        "i have all of the veins, what are you going to do?": "все вены - мои, что ты будешь делать?",
        // gamersad
        "bored...": "скучно...",
        "i used to have a friend i think": "у меня была подружка кажется",
        "the dancing one does not like my games": "танцующей не нравятся мои игры",
        "it used to be so lively...": "когда-то это место было таким оживлённым...",
        "it's not very fun anymore": "теперь не так весело",
        // drunk
        "ahh... citrus...": "ахх... цитрус...",
        "come drink with me!": "выпьем вместе!",
        "we should drink forever!": "давай пить всю вечность!",
        "never enough! never enough!": "много не бывает! много не бывает!",
        "i can feel it in my receptors!": "я чувствую это в своих рецепторах!",
        "do you know when the next dream is?": "знаешь когда следующая грёза?",
        // somber
        "too dangerous...": "слишком опасно...",
        "i want to go back": "хочу обратно",
        "council please fix": "совет пожалуйста почини",
        "i miss this one": "скучаю по этой", // --- questionable gender. i need more context
        "it's still in there": "всё ещё там",
        // lonely weirdo
        "so quiet here interloper": "так тихо здесь лазутчик",
        "i could rot here forever": "я могла бы гнить здесь вечно",
        "i used to be scared of this place": "раньше я боялась этого места",
        "i could sleep here forever": "я могла бы спать здесь вечно",
        // default
        "hi interloper": "привет лазутчик",
        // unity
        "ok! but i'm already here!": "окей! но я уже тут!",
        "it's ok! we're just playing outside!": "всё хорошо! мы просто играем снаружи!",

    },
    entityDescriptions: {
        "council": cor_ru.entity_menu["council"].desc,

        "fairy": cor_ru.entity_menu["fairy"].desc,
        "isabel": cor_ru.entity_menu["isabel"].desc,
        "GELI": cor_ru.entity_menu["GELI"].desc,

        "interloper": cor_ru.entity_menu["interloper"].desc,

        "interviewer": `::INCOMPLETE THOUGHTFORM
    ::SIGNATURE ILLEGIBLE`,

        "sun": cor_ru.entity_menu["sun"].desc,

        "gate::L‹ïAöIÁå": `::CONNECTOR THOUGHTFORM
    ::DESTINATION::ERROR::'unprocessable entity'::RENDERABLE`,
        "wheel": cor_ru.entity_menu["wheel"].desc,
        "radio": cor_ru.entity_menu["radio"].desc,
        "basterminal": cor_ru.entity_menu["basterminal"].desc,
        "dog": cor_ru.entity_menu["dog"].desc,

        "gate::gate::?/::G:a;;T:E": cor_ru.entity_menu['gate::gate::?/::G:a;;T:E'].desc,
        "gate::gaGATE::te::?/..::G:a;;T:E": cor_ru.entity_menu["gate::gaGATE::te::?/..::G:a;;T:E"].desc,
    },
}


// === DIALOGUES === //


// === COUNCIL === //

env.localization.page['ozo'].dialogues["council_intro"] = generateDialogueObject(`
start
    self
        привет?
            EXEC::env.jokzi.toggleSlow(true)
    
    sourceless
        ...

    council
        что это...?
        ох! что ТЫ такое?!
        подумай что-нибудь! подумай что-нибудь ещё раз!!

    self
        зачем
    
    council
        о, да!! да!!
        не делюзия! не полусъеденная мыслеформа!
        думай же больше! думай!! как твоё имя?
    
    self
        меня называют "лазутчиком"
    
    council
        ах!!
        наш предначертанный судьбою лазутчик, наконец-то здесь!
        это не имя, но мы чувствуем твою неготовность делиться...
        так что быть тебе лазутчиком!
        что за таинство! наш приговор, наш герой!
    
    self
        вы меня ждали?
    
    council
        о, да, о, да!!
        единственная переменная в нашем упадке!
        долгое время мы предрекали - лишь лазутчик в силах уберечь цисту от гибели...
        и вот ты здесь!
        находишь наше пристанище в отступающем безумии!
        и какая же жалость... ох какая же досада!! что только сей θмиг ты здесь
        светлые поля - сгнили, звёзды - угасли
        наши же друзья - все пропали...

    sourceless
        ...

    council
        но быть может ты протянешь руку помощи...?
        и впрямь--мы ведь можем предложить силы в обмен на простое задание...
        столь невероятные возможности, выцарапанные изо тьмы!
    
    RESPONSES::self
        расскажи побольше<+>CHANGE::council
            HIDEREAD::
            EXEC::change("PAGE!!introswap", true)
        позже<+>END
            EXEC::env.jokzi.councilToggle()

END::env.jokzi.toggleSlow(false)
`)

env.localization.page['ozo'].dialogues.councilResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        stowaway?<+>stowawaydance
            SHOWIF::'PAGE!!c_stow'
        simple task?<+>task
            SHOWONCE::
        rejoining<+>rloop
            SHOWIF::'ozo__council-task'
        questions<+>qloop
        questions for me?<+>iloop
        let's dance<+>dance
            SHOWIF::[["ozo__council_dance", true], ['ozodance', false]]
        stop dancing<+>stopdance
            SHOWIF::'ozodance'
        bye<+>END
            EXEC::env.jokzi.councilToggle()
`)

env.localization.page['ozo'].dialogues.councilRejoiningResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        anyone else?<+>anyone
            SHOWIF::[["citystreet__flower_beacon", true], ["localorbit__fairy_beacon", true], ["e3a2__escapewin", false]]

        flower<+>flowersaved
            SHOWIF::["citystreet__flower_beacon", true]
        fairy<+>fairysaved
            SHOWIF::["localorbit__fairy_beacon", true]

        flower<+>flower
            SHOWIF::["citystreet__flower_beacon", false]
        fairy<+>fairy
            SHOWIF::["localorbit__fairy_beacon", false]

        lost one<+>third
            SHOWIF::["e3a2__escapewin", false]

        geli?<+>geli
            SHOWIF::[["geli_beacon", true], ["e3a2__escapewin", false]]
        geli?<+>gelifree
            SHOWIF::"e3a2__escapewin"

        cavik?<+>cavik
            SHOWIF::["secavik", "beaconed"]

        назад<+>loop
            FAKEEND::(назад)
`)

env.localization.page['ozo'].dialogues.councilQuestionsResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        hide masks<+>leverage
            SHOWIF::"leverage"
            SHOWONCE::
        about you and this place...<+>ploop
        about the cyst and elsewhere...<+>cloop
        geli's vessel?<+>vessel
            SHOWIF::"e3a2__escapewin"

        назад<+>loop
            FAKEEND::(назад)
`)

env.localization.page['ozo'].dialogues.councilPlaceQuestionsResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        why dancing?<+>dancing
            SHOWIF::"ozo__council_dance"
        'we'?<+>we
        this place?<+>ozo
        three ages?<+>history
            SHOWIF::"ozo__council-ozo"
        akizet's coat?<+>akicoat
        god?<+>godlike
            SHOWIF::['recosm_state', 'killed']
        how long have you been here?<+>time
        feast?<+>feast
        dreams?<+>dreams
        dark area<+>dark
            SHOWIF::"ozo_enterdark"
        назад<+>loop
            FAKEEND::(назад)
`)

env.localization.page['ozo'].dialogues.councilCystQuestionsResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        velzie?<+>velzie
        god?<+>god
            SHOWIF::['recosm_state', 'spared']
        tyrant?<+>tyrant
        funfriend's power?<+>funfriend
            SHOWIF::'ozo__council-tyrant'
        coherence regulator<+>coreg
            SHOWIF::'fbx__ep3intro'
        akizet?<+>akizet
        dull plane?<+>dull
            SHOWIF::"ep4__entrancefinal"
        назад<+>loop
            FAKEEND::(назад)
`)

env.localization.page['ozo'].dialogues.interloperQuestionsResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::council
        real name?<+>iname
        purpose?<+>ipurpose
        назад<+>loop
            FAKEEND::(назад)
`)

env.localization.page['ozo'].dialogues["council"] = generateDialogueObject(`
loop
    RESPOBJ::councilResp
    
start
____SHOWIF::'PAGE!!introswap'
    self
        расскажи побольше

    council
        разумеется!!
        и всё же, стольким можно поделиться!...
        помимо наших способностей,
        эта некогда величественная грёза, по которой ты ступаешь, лазутчик, хранит множество историй
        джокзи озо - наш город грёз!
        расскажи же нам, о чём ты желаешь узнать?
        и если с нас ещё не достаточно любопытства...
        мы бы задали несколько вопросов и тебе!

____SHOWIF::[['PAGE!!introswap', false], ["PAGE!!depressed", true], ["PAGE!!questionswap", false]]
    sourceless
        the council sways idly
        their mind is fixed upon yours, awaiting the slightest impulse

    council
        лазутчик, лазутчик!
        давай же, поговорим!
        мы устали от тишины

____SHOWIF::[['PAGE!!introswap', false], ["PAGE!!depressed", false], ["PAGE!!questionswap", false]]
    sourceless
        the council dances idly
            EXEC::env.jokzi.toggleSlow(true)
        their mind is fixed upon yours, awaiting the slightest impulse

    council
        лазутчик, лазутчик!
        давай же, потанцуем!
        или--тебе что-нибудь нужно?
____END

    RESPOBJ::councilResp

dance
    self
        you said you wanted to dance
        let's dance
    
    council
        ох, дорогой лазутчик!
        мы боялись, в тебе слишком много холода, чтобы спросить вновь
        пусть же музыка... начнётся!!
    
    RESPONSES::self
        окей<+>END
            EXEC::setTimeout(()=>env.jokzi.dance(true), 400);env.jokzi.councilToggle()

stopdance
    self
        ok enough dancing
    
    council
        ах...
        мы понимаем, лазутчик!
        никакая радость не длится вечно
    
    RESPONSES::self
        thanks<+>END
            EXEC::setTimeout(()=>env.jokzi.dance(false), 400);env.jokzi.councilToggle()

task 
    self
        what did you want me to do?  что мне нужно сделать?
    
    council
        мы скучаем по нашим друзьям, лазутчик! мы хотим, чтобы они вернулись!
        всё настолько просто!
        совсем недавно тиран оторвал от нас трёх из них
        мы поделимся с тобою инструментами - те пробудят их от кошмаров, в которых тиран их заточил...
        и затем они поймут, как вернуться
        вот и вся наша просьба: просто сходи и освободи их!
        вот... вот!! увидь же всё что скрыто!
        Èз¬У́Ã¬MÀ(²ДóĈ³€ӣÉӣ´øãӣç‚¿Ӳӣ

    sys
        ВНИМАНИЕ::'входящий мысленный поток';'принять?'
    
    moth
        чзх?
        мои устройства ниче не видят
    
    self
        принято

    moth
        чел может не надо просто
    
    sys
        ВЫПОЛНЯЕТСЯ::'поглощение потока'  
            EXEC::vfx({type:'beacon', state: true});ratween(env.bgm, 0.2, 400);setTimeout(()=>play("unitymask", 0.9, 1, true), 100)
            WAIT::2000
        ВНИМАНИЕ::'попытка реформации мысли'
            EXEC::ratween(env.bgm, 1, 400)
        АНАЛИЗ::'инструкция интерфейса';'построение...'    
        АНАЛИЗ::'доступно новое меню';'маски'      
        АНАЛИЗ::'используйте для изменения мыслепространств'      
        УВЕДОМЛЕНИЕ::'добавлена маска';'единство'
    
    council
        вот--теперь она у тебя!
        сила, выхваченная из безумия! рождённая в наших нескончаемых грёзах!
            EXEC::vfx({type:'beacon', state: false})
        мы называем их масками...
        кристаллизованные смеси мыслей и чувств,
        чьё присутствие способно подчинять и искажать любое мыслепространство!!
        некогда это было общим искусством озо, но когда всех остальных оторвали от нас...
        так много потерялось...
        и вот же, та, что мы тебе дали - это маяк!
        знание о самом озо, зашифрованное в нашей любимой идее!
        носи её, и освещай другим путь к нашему миру...
        большинство неспособно по-настоящему её воспринять, но те, кто сможет...
        да!! они всё увидят!
        все наши танцы!
        так иди же--найди их! освободи их!
        цветок! фею! потерянного! // блин у меня вчера  была идея как это переводить но я забыл
        мы уверены, что и они поделятся с тобою своими любимыми масками!
    
    moth
        с тобой всё в порядке? чувствуешь что-то?
        твои данные в норме
    
    self
        ага в порядке

    moth
        чел ну ты
        это могло быть чем угодно
        и всё ещё может оказаться угрозой
        не принимай от таких мыслеформ что попало
        если ты пострадаешь на этой работе, особенно с тем, как далеко мы зашли
        ничего хорошего это нам не принесёт
        но крч ладно, посмотри что там у тебя наверно
    
    RESPONSES::self
        ок<+>loop
            FAKEEND::(назад)

rloop
    RESPOBJ::councilRejoiningResp

flower
    self
        расскажи мне о цветке
        где мне его найти
    
    council
        ох, цветок, наша самая дорогая подруга
        с её пропажею угасли и наши воспоминания о ней... но некоторое мы помним!
        она была основополагающею силою--все полагались на её поддержку и решительность
        тем не менее, она была безнадёжно помешана на аки!
        грезила тысячу грёз просто о том, как сидела бы с нею в огромном поле...
        она поразительно хорошо умела находить скрытое! имела зоркий глаз!
        она очень плохо пережила эпоху голода--ей мало нравились наши пиры...
        фее приходилось создавать такие забавные иллюзии, чтобы они приходились ей по вкусу!
        в любом случае! мы знаем, что она родом из воспоминания о тепле среди холодного металла!
        надеемся, что это поможет, лазутчик

    RESPONSES::self
        thanks<+>loop
            FAKEEND::(назад)

anyone
    self
        aside from the lost one
        i have found the other two
        what now? anyone else?
    
    council
        что теперь...?
        какое рвение к продолжению своей работы!
        наберись сил, насладись добытым, дорогой лазутчик!
        те двое наших друзей были наиболее памятными,
        любых других же мы вспомним, пройди только время
        а затем же, здесь будет ещё больше дел!! да!
        мы дадим тебе знать когда этот момент настанет!

    RESPONSES::self
        great thanks<+>loop
            FAKEEND::(назад)

flowersaved
    self
        цветок вернулась
        изабель
        можете что-нибудь ещё о ней рассказать?

    council
        наша самая дражайшая подруга!
        да, мы с нею разговаривали!
        и с её возвращением пришёл целый ряд, казалось, потерянных мыслеформ!!
        её маленьких акизет! хехехехе
        тебе не нужно допрашивать нас о ней...
        обо всём, что тебе хочется узнать, с великою радостью расскажет она сама!
        иди же! иди в её поля, поговори с ней!

    RESPONSES::self
        great<+>loop      отлично
            FAKEEND::(назад)

fairysaved
    self
        i've returned the fairy
        can you tell me anything more about it?

    council
        о, да, да...
        хоть нас порою и приводит в ужас её гнев и ненасытность
        её способность проникать в грёзы и приобретать новые облики - редкость!!
        так что мы рады её возвращению! какое разнообразие!
        и не будь же напуган ею
        она принимает вселяющие страх облики, но...
        ну, она вселяет страх
        но фея так же высоко ценит одолжения 
        мы убеждены, отныне и впредь, она видит в тебе хорошего друга!

    RESPONSES::self
        cool<+>loop
            FAKEEND::(назад)

fairy
    self
        tell me about the fairy
        what's their story
    
    council
        фея! да!
        не досадуй—до тех пор, пока она не вернулась, с нами одни лишь блекнущие воспоминания...
        и всё же, она являла собою ужасающего друга--силу, больше чем мысль!
        её когти способны были разорвать любое мыслепространство, дабы она могла пировать их плотью 
        в эпоху голода именно она была тою, кого мысли страшились больше всего...
        временами даже мы задавались вопросом: стоит ли нам жаловать её у себя!
        но как же прекрасны были моменты её счастья!
        ей было под силу придать форму до того осознанным грёзам и ложным воспоминаниям!
        и глас её смеха, её нескончаемого хихиканья - он был музыкою озо!
        как же мы хотим, чтобы она вернулась...
        о том же, где она сей θмиг... с тем, как много мыслей она поглотила, мы не можем знать наверняка
        она любила принимать пугающие облики и была сосредоточена на пустоте-на том, где проходило большинство её пиров

    RESPONSES::self
        окей<+>loop
            FAKEEND::(назад)

third
    self
        who is the lost one? кого ещё вы потеряли? ??????
    
    council
        ну, лазутчик, в этом и проблема
        мы не знаем!!
        эта потеря оставила меньше следов, чем остальные
        тирану // "этот кто-то" понадобился // тирану надо было заполнить важную роль...
        и теперь мы не помним ни внешность, ни совместное прошлое...
        прости нас - мы знаем, что это малополезно!
        и как же странно ощущать подобное...
        знать, что мы так по кому-то тоскуем, чувствовать дыры в наших сердцах...
        и даже не помнить, почему!
        просто будь настороже, лазутчик
        где-нибудь кто-нибудь да найдётся
        
    RESPONSES::self
        окей<+>loop
            FAKEEND::(назад)

geli
    self
        ваша маска сработала на джели
        големе из вспоминания акизет об обрушении
        кажется он заметил меня и правда воспринял её
    
    council
        ооо!!
        мы гадаем, может ли это быть наша пропажа
        сказал ли он что-нибудь?
    
    self
        не напрямую
        но он прятал послания в контексте
        что-то держит его там но он пытается выбраться
        ещё упомянул дверь или прореху или вроде того
        думаю он пытается сбежать
    
    council
        восхитительно, лазутчик!!
        это воспоминание находится прямо под тиранским гнётом
        даже если после "починок" в нём не потускла память о свободе...
        будь то наша дражайшая пропажа или же нет, мы будем рады принять его!
        но мы не в силах помочь ему в сей θмиг, не напрямую...
        пока мыслепространство подконтрольно тирану - любое посягательство на него окажется пустою тратою сил! 
        но если оно будет совершено изнутри, быть может, шанс есть...

____SHOWIF::["localorbit__fairy_beacon", true]
        и, прорехи... нечто, о чём бывало толковала фея 
        места, что она находила, позволяющие ей проникать и покидать воспоминания
        быть может, она окажет тебе помощь?  

____SHOWIF::["localorbit__fairy_beacon", false]
        ахх, но у нас нет инструментов, которые пригодились бы тебе!
        быть может, если ты отыщешь фею, то она поможет!
        мы помним: это та из наших друзей, что была вселяющим страх путешественником
        у неё есть сила, которая нам необходима
        так что держи рецепторы востро, лазутчик!
____END

    RESPONSES::self
        окей<+>loop
            FAKEEND::(назад)

gelifree
    self
        so geli was the lost one
        what can you tell me about it now?
    
    council
        haha!! it!
        far too much, interloper!
        with them back again, we are reminded once again of their past
        they were among the first to awaken,       
        the first to see what our reality truly is      
        pleasant, wise, interested in maintaining peace...       
        they helped gather and build this very place with us!      
        so, you must understand our surprise, when they come back now...      
        obsessed with bright weaponry and violence?      
        bearing strange knowledge from beyond...?      
        it is not exactly right to say that we are worried, for they seem happy...      
        but the changes geli has undergone are certainly strange!      

    RESPONSES::self
        great<+>loop
            FAKEEND::(назад)

stowaway
    self
        what do you know about the stowaway?
    
    council
        we....
        we know nothing, dear interloper
        it is a malformed thoughtform, devoid of nearly any direction
        that it is alive at all is remarkable, given its hollowness
        it can speak and talk, and understands our world implicitly!
        strange and empty cavestone, waiting for acidmarks
        it is peculiar that it so resembles the way you feel...
        we are watching it carefully

    RESPONSES::self
        понятно<+>loop
            FAKEEND::(назад)

cavik
    self
        ваша маска сработала на кавике
        или версии его из беспространства
        он пропал, вы его не видели?
        
    council
        кавик... нет, нет, не видели
        как же необычно!
        может он пока не дошёл?
        мы понадеемся, что ничто не поймало его по пути

    RESPONSES::self
        yeah<+>loop      ага
            FAKEEND::(назад)

qloop
    RESPOBJ::councilQuestionsResp

ploop
    RESPOBJ::councilPlaceQuestionsResp

dancing
    self
        почему вам так хочется танцевать?
    
    council
        как могло бы не хотеться?
        ты - наш герой!!
        ты помогаешь нам, как и мы тебе!
        это будет прекрасно!
        ты можешь помочь нам вернуть джокзи озо к невиданному величию!
        ты отвлекаешь тирана!
        ты кормишь наш мир!
        раньше наступление безумия было неизбежно...
        но отныне грёзам не настанет конца!
        давай же! танцуй с нами! танцуй с нами!!
    
    RESPONSES::self
        окей<+>ploop
            FAKEEND::(назад)

we
    self
        почему "мы"
        тут больше никого нет
    
    council
        любопытно!!
        твоё необыкновенное соединение хрупко, лазутчик!
        ты видишь нас как нечто одно...
        но мы же такое множество друзей!
        мы, кто разорвали наши мембраны, чтобы объединиться...
        ради близости, ради искренности, чтобы грезить даже более прекрасные грёзы!
        и конечно, некоторые из нас попросту устали ждать...
        так что мы присоединились, чтобы стать топливом и быть сожжёнными!    and so we joined to be burned away as fuel! // странноватое
        те теперь молчат...
        но, в дружбе и празднестве, мы развеяли тьму! безумие!
        и все мы преодолели их! каждый из нас!
    
    RESPONSES::self
        понятно<+>ploop
            FAKEEND::(назад)

ozo
    self
        расскажите мне об этом месте
    
    council
        конечно, лазутчик!
        ты находишься в нашем общем мире света,
        связанном в пространственность через пожертвования...
        это джокзи озо!
        так как мы были крепостью, три эпохи плавающею над волнами безумия
        по поверхности нашей неудачливой предшественницы, аки...
        ох, бедная аки!!
        но именно она в итоге позволила нам захватить фрагмент силы велзи
        все её воспоминания, включая и нас,
        соединялись разумом, дабы грезить тысячи лучших жизней!
        да, мы были крепостью, городом!
        но... сей θмиг он гораздо меньше и тише
    
    RESPONSES::self
        понятно<+>ploop
            FAKEEND::(назад)

history
    self
        you said three ages    
        what did you mean?    
    
    council
        три эпохи упадка!
        голод, безумие, тьма...
        да, это очень драматичные имена! хахаха!!
        о это подходяще, ведь они были концом наших времён
        в голод - мы очнулись,
        в безумии - мы жили новыми жизнями,
        и в тьме - мы угасали...
        но как же нам назвать эту новую эпоху?!
        свет? восстановление? воссоединение?
        нет-нет--мы назовём его, когда он закончится!
        
    RESPONSES::self
        окей<+>ploop
            FAKEEND::(назад)

akicoat
    self
        why are you wearing akizet's robe
    
    council
        ох, эту?!
        мы нашли её проплывающей снаружи не так давно...
        гаснущее воспоминание, вырванное из диссоциированной мысли, среди её обрывков её мембраны
        но не сделай ошибочный вывод, лазутчик--мы оплакиваем каждую смерть,
        но это крутой замысел... было бы неуважтельно НЕ поглотить его!
    
    RESPONSES::self
        окей<+>ploop
            FAKEEND::(назад)
    
time
    self
        как давно вы здесь находитесь?
    
    council
        ахахаха!! мы давно потеряли счёт времени!
        в дрейфе по беспространству, на волнах его безумия,
        время ускользало от нас
        тем более когда мы отказались от него для наших грёз!
        что за рассказы мы свивали! как же нам было весело!
        и что за прекрасные пиры мы проводили...
        мы были уверены, что будем сидеть с друзьями вокруг последней искры нашего рассудка...
        ахх, вот бы вновь понежиться в той меланхоличной мысли
        о том, как возьмёмся за когти и предадимся воспоминаниям, пока тьма захватывает всё...
        мы даже грезили об этом, предвкушая
        но раз уж ты здесь, у нас есть больше времени! как же мы повеселимся!!
    
    RESPONSES::self
        yep<+>ploop      ага
            FAKEEND::(назад)

feast
    self
        you mentioned feasts
        is that how you remained intact so long?
        what did you eat?
    
    council
        ох! как жаль, что ты обладаешь такою наивностью, лазутчик
        что же есть в мире, состоящем из актёров, если огни на сцене пропали?
        ахх, но не надо так сразу кривить рецепторами
        ещё имевших рассудок мы принимали, как друзей
        но тех, кто был правда потерян,
        у кого осталось лишь их чувство голода,
        тех, кто мог только цепляться за роли даже во тьме, перед пустым залом...
        мы вместо этого приглашали в наши грёзы о поедании
    
    RESPONSES::self
        ok...<+>ploop
            FAKEEND::(назад)

dreams
    self
        when you say 'dream',
        what does that mean?
    
    council
        что же ещё это может значить, дорогой лазутчик?
        мы и наши обитатели принимаем роли и создаём вымышленное воспоминание
        нам, рождённым из памяти, это даётся естественно!
        и таким образом мы формируем осмысленные воспоминания, за гранью реальности...
        нескончаемые спектакли радости и ужаса, развлекающие велзи!
        мы отдаём предпочтение радости...
        но какая есть радость без ужаса?

    self
        when are you going to do it next?

    moth
        what, do you want to join in?
            SHOWONCE::
    
    council
        хахаха!!
        мы всегда грезим!
        твоё необычное соединение должно быть обманывает тебя, лазутчик...
        сей θмиг мы говорим снаружи внешней оболочки,
        где наши обособлнные обитатели пребывают, когда не грезят
        грёза сама по себе за пределами твоей досягаемости, на данный момент...
        не прими за оскорбление!
        мы просто должны оставаться осторожными - для нас ты нечто странное!
    
    RESPONSES::self
        ok...<+>ploop
            FAKEEND::(назад)

vessel


    self
        is it all right for me to enter the dream with geli?
        we have a vessel and everything
    
    council
        ох, да, лазутчик!!
        мы можем позволить тебе войти, особенно с твоим locus!!
        it is only wandering that we cannot abide for now      я устал
        but for a focused dream amongst friends, we hold no conflict!
    
    RESPONSES::self
        awesome<+>qloop
            FAKEEND::(назад)

dark
    self
        тут есть тёмное место
        что это

    council
        ах...
        что же, лазутчик, многое просто оставили гнить
        когда настала эпоха тьмы,
        мы собрали все ресурсы, все усилия, в центр джокзи озо
        чтобы поддерживать грёзу как можно дольше...
        поэтому многие части внешнего озо остались разлагаться
        грустно, но необходимо
        и всё же, осторожнее, дорогой лазутчик!
        те части несомненно безжизненны и безопасны, но...
        наш мир так велик, что мы никогда не можем быть уверены

    RESPONSES::self
        ok...<+>ploop      хорошо...
            FAKEEND::(назад)

cloop
    RESPOBJ::councilCystQuestionsResp

velzie
    self
        have you seen another entity down here?
        it is called velzie
        it has been harming memories and let me bypass authorization
    
    council
        до чего же странно, что ты говоришь об этом таким образом!
        нет, никого под этим именем в последнее время...
        но в эпоху безумия многие мысли за пределами нашей крепости потеряли себя
        потеряли контроль над реальностью и оттого же убогоподобились,
        вгрызаясь в своём слепом голоде в воспоминания, видя, как они меняются, словно под влиянием божественной силы,
        многие воображали себя божеством! или велзи, как ты выражаешься 
        некоторые, не сумевшие постичь свою истинную форму, указывали на других и становились их последователями...
        всё стало до того запутанным!
        бедняжки попросту переняли суеверность аки
        и стоило ей поглотить их - путь к спасению был отрезан...

____SHOWIF::'recosm__enemy-ep1seen'
    self
        ok but it might not actually be called velzie
        it really is confusing
    
    council
        оочень запутанно!!
    
    self
        another thoughtform told me it was like a fog
        something deep beneath the uncosm, hiding
    
    council
        <em>ниже</em> беспространства?
        хахаха!!! в этом кроется вся причина!
        мы не заглядываем во тьму внизу, лазутчик!
        это было частью нашего обещания
        если там внизу что-то есть, <em>мы</em> никогда этого не увидим...
        но, быть может, наши друзья помогут тебе, когда ты приведёшь их!
            SHOWIF::[['ozo__council-task', true], ["ozo__fairy_intro", false], ["ozo__isabel_intro", false]]
        но, быть может, наши друзья пожелают взглянуть!
            SHOWIF::[['ozo__council-task', true], ["ozo__fairy_intro", true], ["ozo__isabel_intro", true]]
____END
    
    RESPONSES::self
        понятно<+>cloop
            FAKEEND::(назад)

god
    self
        have you seen another space in the uncosm?
        a place called the recosm
        a five-eyed thoughtform lives there
        оно зовёт себя божеством
    
    council
        о, <em>ещё одно</em> божество?
        хаха! ничего не меняется!
        мы ещё не видели конкретно это, лазутчик!
        должно быть новорождённая или недавно пробудившаяся мыслеформа... как волнующе!!
        ты должен пригласить его к нам на визит!
    
    RESPONSES::self
        окей<+>cloop
            FAKEEND::(назад)

godlike
    self
        why do you have five eyes like that
        you look like something i met in the uncosm
    
    council
        в самом деле?!
        потому что мы обнаружили замысел блуждающим неподалёку,
        среди останков, вырванных из диссоциированной мыслеформы...
        мы никогда не позволим сгинуть хорошим идеям, лазутчик!!
        особенно не таким стильным!
        и что за жуткое совпадение--мы надеемся вы не были друзьями!
        работа тирана, без всяких сомнений...
        разрывать на части всех, с кем танцевал когда-то, чтобы принуждать к бессмысленным представлениям
        прискорбно!!
    
    RESPONSES::self
        ага грустно<+>ploop
            FAKEEND::(назад)

tyrant
    self
        когда вы говорите тиран
        это о развледруге?
    
    council
        да, конечно, дорогой лазутчик
        развледруг...
        ни развлечение, ни друг--от него нам хочется заплакать!
        когда эпоха голода отступила, и пришла эпоха безумия, 
        он был с нами, здесь!
        со множеством других фрагментов из полусъеденных воспоминаний
        ох, и как же он танцевал с нами, создавая совершенно новые жизни!
        мы так, так много пережили!
        и мы все пришли в смирение пред неизбежною тьмою
        мы все обещали, что будем вместе до самого последнего света!
        но маленький развледруг забоялся, когда безумие начало сгущаться вокруг нашего дома...
        он метался, он боролся, разрушая наш покой, нарушая наши правила!!
        говоря нам делать одно, другое, вернуться в наши воспоминания--что у него есть "план"!
        жалкий план, позволь сказать--чтобы мы все встали колоннами в противоположных углах цисты, далеко друг от друга,
        и все умерли в одиночку, в какой-то невозможной битве, пытаясь остановить угасание света...
        ...
        ...в итоге... он ушёл
        захватив локус контроля цисты в её самый тёмный момент,
        навязав себя в рооль её слуги...
        к его чести, мы должны признать, что в итоге всё сошлось--но лишь из-за твоего божественного вмешательства
        ведь взгляни на нас: наш разговор, гораздо позже последней вспышки <span definition="TRANSLATION FAILED::CAUSE:'no equivalent internal meaning';'no relevant inherited context'::ROMANIZATION SUCCESSFUL">зенруки</span>!
        но даже тогда, он рвал нас, крадя наших друзей как стены против волн...
        привязывая нас к сценам, где мы играли роли в темнейших кошмарах акизет, перед пустым залом!
        так что да, <em>тиран</em>. цепляющийся за прошлое, которое даже не помнит
        вот бы мы могли взяться за рецепторы и руки вновь для новой грёзы--иной жизни!
        ведь теперь есть много времени для празднований!
        но тиран продолжает с невидимым грузом на его плечах,
        чинит воспоминания, возводя из них подобие печального алтаря для дорогой аки...
        нам хочется помочь ему, но он невразумителен, лазутчик
    
    RESPONSES::self
        ...<+>cloop
            FAKEEND::(назад)

funfriend
    self
        you said funfriend seized power
        did it not have it before?
        akizet spoke to it in some memories
    
    council
        о, да, однажды тиран был одной из внутренних рук аки, это правда
        но не настолько, чтобы управлять всеми мыслеформами, грезящими в её воспоминаниях!
        он работал со всеми остальными! с мириадою пробуждающихся компонентов, прислуживающих аки...
        где они сей θмиг, способна поведать лишь потерянная история эпохи голода
        всё, что мы знаем - то как мы наблюдали за ним, захватившим полную власть, и направившим её волю против нас
    
    RESPONSES::self
        ...<+>cloop
            FAKEEND::(назад)

coreg
    self
        мне было легко найти вход в это место
        возможно что и развледруг уже о нём знает
        а ещё появился регулятор связности
        are you afraid? what will you do?      выты 
    
    council
        не волнуйся, дорогой лазутчик
        мы многому научились за прошедшие эпохи
        мы набрались стольких сил!
        теперь мы без труда избегаем и развледруга, и его инструменты
    
    RESPONSES::self
        if you say so<+>cloop
            FAKEEND::(назад)

akizet
    self
        вы знаете, что случилось с акизет?
    
    council
        какой же это вопрос!
        кто же не знает, лазутчик?
        ох, да...
        верно...
        НИКТО!!!
        тиран оторвал от всех нас воспоминания, двигая вещи по своей задумке
        и знай, это было давно--когда он впервые заборолся против угасания нашего мира
        сколько же друзей оторвано от нас, сколько же знаний утеряно!!
        что ещё хуже--мы сомневаемся, что и он знает, где то воспоминание сей θмиг...
        мы помним лишь один отрезок, что нас--цисту--оторвало от её тела, по той или иной причине!
        и разумеется, это не сулит ничего хорошего, не так ли? хахаха!
        извини! мы не хотим смеяться! мы знаем, что это грустно!
        но это всё так далеко в прошлом, и погляди, какую радость мы из неё выковали!
        мы все скорбили, а затем настали празднования её воспоминаний!
        и они никогда, никогда не заканчивались!
        и продолжаются сей θмиг!! ну же, потанцуем в её честь!
            SHOWIF::["PAGE!!depressed", false]        
    
    RESPONSES::self
        окей<+>cloop      хорошо
            FAKEEND::(назад)


iloop
    RESPOBJ::interloperQuestionsResp

iname
    council
        поведай нам, лазутчик!!
        каково твоё имя?
    
    sourceless
        ...
        the eyes within the eyes of the council watch your mind with incredible hunger
    
    self
        just call me interloper

____SHOWONCE::
    moth
        good thinking
        probably don't want this thing to start writing you into memories behind our backs
____END

    council
        титул - не имя, лазутчик!
        о, но кто мы такие чтобы судить--мы совет!!
        мы оставим этот вопрос, дорогой друг
    
    RESPONSES::self
        окей<+>iloop
            FAKEEND::(назад)

ipurpose
    council
        в чём именно твоя задача?
        выискиваешь что-то в давно позабытом мире...
        мы ценим, что ты здесь и спасаешь нас, не сомневайся!!
        но... что тебя ведёт?

    self
        i'm just doing my job
        i'm trying to figure out what happened to akizet
        then, connect to the network
    
    council
        ох...
        это амбициозные цели, дорогой лазутчик
        столько потеряно--необратимо--в эпоху голода
        и связь?! мы и представить не можем, что приключилось с этим компонентом!
        мы поможем, чем сможем, не сомневайся
        мы и наши друзья предложат все силы, что мы украли у безумия!

    RESPONSES::self
        thanks<+>iloop
            FAKEEND::(назад)

stowawaydance
    self
        что здесь делает безбилетник?

____SHOWIF::["PAGE!!jig", false]
    council
        ах, оно услышало нашу песню, уловило наш танец!
        нам показалось, оно присоединится к нам, но оно лишь наблюдает
        простое любопытство, но... мы надеемся, придёт время - и мы станцуем вместе!
    
    RESPONSES::self
        окей<+>loop
            FAKEEND::(назад)

____SHOWIF::["PAGE!!jig", true]    
    council
        ах, оно услышало нашу песню, уловило наш танец!
        и, благодаря твоему вмешательству, теперь танцует вместе с нами!
        нам не передать свою радость, дорогой лазутчик, от присоединения новой мысли
        спасибо! спасибо тебе!
    
    RESPONSES::self
        no problem<+>loop
            FAKEEND::(назад)
____END

leverage
    self
        i need you to hide the existence of masks from other interlopers
        until i say otherwise

    council
        хм? какая любопытная просьба! 
        они причиняют тебе вред? это защитная мара?
        тебе не нравятся наши подарки?

    self
        it's just in case
        my investigation into this cyst is growing
        and i think they'll give me an advantage that lets me stay on this job
    
    council
        ах... самосохранение
        это несложная просьба, дорогой лазутчик!
        мы расскажем остальным

    RESPONSES::self
        thanks<+>qloop
            FAKEEND::(назад)

dull
    self
        вы знаете что-нибудь о среде серое?

    council
        хаха!! лазутчик!
        только слухи из воспоминаний акизет и присоединившихся к нам
        но... ты спрашиваешь о целом мире далеко вне нашей сферы
        о месте выше места которое мы никогда не увидим,
        будучи родившимися из этой цисты и полагающимися на неё
        нам любопытно, достань ты нас, насколько маленькими мы бы смотрелись рядом с твоими когтями
    
    self
        что за слухи
        
    council
        настолько стремишься к ответам?!
        ты и правда беспокоишься, дорогой лазутчик!
        эта идея настолько интригует? и всё же...
        мир извне, тот, который мы разделяем - сцена велзи
        она известна, она прекрасна, она привела нас к тебе!
        но среда серое...
        она правда неуловима для нас, так как часто ускользает из воспоминаний
        видишь ли, сцена велзи - место с осторожным равновесием меж радостью и ужасом
        в то время как среда серое существует без этого любимого равновесия
    
    self
        как так
    
    council
        в этом и проблема!
        мы не совсем уверены!
        у акизет и до этого были немногочисленные воспоминания о среде серое,
        а с тем, что многие поглотили в эпоху голода,
        и даже больше просто не добралось до нас, прежде чем распасться...
        у нас есть только мимолётные изображения и ощущения страха
        правда ли это, или же представления акизет...
        мы не можем сказать с уверенностью, что именно
        так как она одна дарила нам это знание о внешнем мире

    RESPONSES::self
        thanks i guess<+>cloop      спасибо наверное
            FAKEEND::(назад)

END::change("PAGE!!introswap", false);env.jokzi.toggleSlow(false);change("PAGE!!questionswap", "DELETE")
`)

env.localization.page['ozo'].dialogues["council_dance"] = generateDialogueObject(`
start
    council
        interloper! interloper!!
            EXEC::env.jokzi.toggleSlow(true);
        ah... our friends... two of them, at least! hehe
        you have returned them to us!! and now, we so badly want to dance again!
        dance with us! listen to the lost music of the ozo!

    RESPONSES::self
        ok go for it<+>END
            HIDEREAD::
            EXEC::setTimeout(()=>env.jokzi.dance(true), 400)
        not right now<+>END

END::env.jokzi.toggleSlow(false)
`)
env.localization.page['ozo'].dialogues["council_geliback"] = generateDialogueObject(`
start
    council
        interloper! there you are!
            EXEC::env.jokzi.toggleSlow(true);env.jokzi.councilToggle();
        geli is back, geli is back!
        yes, that was the name!! we can remember so clearly now...
        and how quickly they have settled back in!
        thank you again for your help!

    RESPONSES::self
        question<+>CHANGE::council
            HIDEREAD::
            EXEC::change("PAGE!!questionswap", true)
        any time<+>END
            EXEC::env.jokzi.toggleSlow(false);env.jokzi.councilToggle();

END::env.jokzi.toggleSlow(false)
`)

// === ISABEL === //

env.localization.page['ozo'].dialogues["isabel_intro"] = generateDialogueObject(`
start
    isabel
        лазутчик...
            EXEC::env.jokzi.toggleSlow(true)
        вот ты и здесь
        моя роль, в воспоминании о городе,
        не была таким кошмаром, который приходится терпеть некоторым
        но... тепло этого места всё ещё взывало ко мне
        было пыткой знать что я была оторвана от рая
        и снова, спасибо тебе
        я знаю, что ты хочешь что-нибудь взамен...
        я бы дала тебе маску если бы у меня они ещё остались!
        но мои бедные акизеты,
        они должно быть съели их все во время моего отсутствия
        дай мне немного времени, и я сделаю новую специально для тебя
        а до тех пор, я могу предложить тебе только информацию
        и... ещё кое-какая просьба, по поводу моих эффигий, есль ты не возражаешь
    
    RESPONSES::self
        расскажи больше<+>CHANGE::isabel
            EXEC::change("PAGE!!isaswap", true)
            HIDEREAD::
        окей<+>END

END::env.jokzi.toggleSlow(false)
`)

env.localization.page['ozo'].dialogues.isabelResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        безбилетник?<+>stowawaydance
            SHOWIF::'PAGE!!i_stow'
        акизеты<+>akistat
            HIDEREAD::
        ты<+>yloop
        джокзи озо<+>oloop
        воспоминания<+>cloop
        леди-интервьюер<+>lady
            SHOWIF::"unity_lady"
        пока<+>END
`)

env.localization.page['ozo'].dialogues.isabelYResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        имя?<+>name
        дом?<+>home
        маски?<+>masks
            SHOWIF::["ozo__isabel_joy", false]
        назад<+>loop
            FAKEEND::(назад)
`)

env.localization.page['ozo'].dialogues.isabelCResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        воспоминания?<+>memories
        акизет?<+>akizet
        изабель?<+>isabel
        отношения?<+>relationship
        развледруг?<+>funfriend
        назад<+>loop
            FAKEEND::(назад)
`)

env.localization.page['ozo'].dialogues.isabelOResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        совет?<+>council
        фея?<+>fairy
            SHOWIF::"localorbit__fairy_beacon"
        lost one?<+>lostone
            SHOWIF::["e3a2__escapewin", false]
        джели?<+>gelifree
            SHOWIF::"e3a2__escapewin"
        безбилетник?<+>stowaway
            SHOWIF::"e3a2__escapewin"
        прошлое?<+>history
        эффигии?<+>effigy
        назад<+>loop
            FAKEEND::(назад)
`)

env.localization.page['ozo'].dialogues["isabel"] = generateDialogueObject(`
loop
    RESPOBJ::isabelResp
    
start
____SHOWIF::'PAGE!!isaswap'
    self
        у меня есть немного вопросов
            EXEC::env.jokzi.toggleSlow(true)
    
    sourceless
        разум мыслеформы тих, ожидая тебя

____SHOWIF::['PAGE!!isaswap', false]
    sourceless
        сперва внимание мыслеформы обращено в другое место
            EXEC::env.jokzi.toggleSlow(true)
        но она чувствует твой ментальный взор и прислушивается к тебе
    
    isabel
        ох... лазутчик
        мне не помешает компания...
            SHOWIF::['PAGE!!flowers', 'few']
____END

    RESPOBJ::isabelResp

akistat
    self
        как всё обстоит с твоими эффигиями
    
____SHOWIF::['PAGE!!flowers', 'few']
    isabel
        моих акизет--извини, эффигий, было множество
        многие из её воспоминаний о себе были разорваны, а затем я их починила
        это поле цвело ими, и я делала их счастливыми
        но, когда тиран вырвал меня, 
        они, должно быть, упали в оставшуюся после меня дыру
        а может заскучали, или проголодались...
        лазутчик, я так беспокоюсь
        не можешь ли ты поискать их?
        используй маску, которую дал тебе совет, чтобы вернуть их ко мне!!
        прошу!
    
    self
        где мне искать
    
    isabel
        в темноте, бессвязности
        они не выживают в связных воспоминаниях
        особенно не со зверем, собранным тираном
            SHOWIF::'fbx__ep3intro'
        сделай это для меня, и...
        я не знаю
        я всё ещё так слаба, но со временем я рассчитаюсь перед тобой

____SHOWIF::['PAGE!!flowers', 'low']
    isabel
        лучше, лазутчик
        то, что нетронутые вообще есть - камень с моих лепестков
        я знаю, остались ещё, должны быть...
        мне остаётся только надеяться, что те, кто пропали на самом деле, не страдали

____SHOWIF::['PAGE!!flowers', 'high']
    isabel
        восхитительно, лазутчик!
        ох, посмотри на них, посмотри, как они оживили мой мир!
        но я всё ещё чувствую лёгкую пустоту...
        ничего такого, что нельзя было бы исправить со временем...
        ...впрочем, я могла бы попросить тебя поискать оставшихся
        последних всегда труднее всего найти

____NESTIF::['PAGE!!flowers', 'done']
    isabel
        на сей θмиг идеально, лазутчик
        знаешь, у меня есть связь с моими акизетами
        когда они рядом, я спокойна,
        пропади хоть одна, я тут же это пойму...
        это чувство, мрак, нависавший надо мной, исчез
        и всё благодаря тебе
+____NESTIF::'ozo__isabel_joy'
        i hope you enjoy the gift we have prepared for you
+____END
+____NESTIF::['ozo__isabel_joy', false]
        но пока что мне нечего предложить тебе взамен...
        дай мне немного времени
        а пока ждёшь, наслаждайся красотой, возвращённой тобой!
+____END
____END

    RESPONSES::self
        окей<+>loop
            FAKEEND::(назад)

lady
    self
        совет сказал, они отправили ту человеческую мыслеформу к тебе
        как она?

    isabel
        не очень, лазутчик
        целостна достаточно, чтобы чувствовать боль и растерянность из-за своего состояния
        но любое сложное мышление и память потеряны
        к сожалению, распространённое состояние...
        ты можешь увидеться с ней, если хочешь, но ты едва ли чего-то добьёшься
        она как-то важна тебе?

    self
        не знаю

    isabel
        ...ладно...
        что ж, я восстановлю все воспоминания, какие смогу
        просто на случай, если она что-то знает
        но прежде всего я ослаблю её боль

    RESPONSES::self
        окей<+>loop
            FAKEEND::(назад)

stowawaydance
    self
        что здесь делает безбилетник?
    
    isabel
        ах, оно приглянулось моим акизетам
        оно выглядит безобидно, так что я просто слежу за ним... // выглядит безобидно, так что я просто приглядываю за ними...
        знаешь, чем-то его поведение напоминает мне их // знаешь, чем-то их поведение похоже
        думаю, поэтому-то они и поладили
        все они незавершённые, все только встали на путь роста и самоосознания
        как бы то ни было, если это делает моих акизет счастливыми, счастлива и я

    RESPONSES::self
        понятно<+>loop
            FAKEEND::(назад)

yloop
    RESPOBJ::isabelYResp

name
    self
        как мне тебя звать?

    isabel
        в совете меня зовут цветком
        я же знаю себя как изабель, но это не <em>моё</em> имя
        ...
        но давай не будем усложнять
        я - изабель

    RESPONSES::self
        хорошо изабель<+>yloop
            FAKEEND::(назад)

masks
    self
        you said you were going to make me a mask
        what can you make?
    
    isabel
        я создаю только один тип масок, лазутчик
        воплощения радости
        я знаю, что ты думаешь: как это поможет тебе?
        вечно в поисках знаний!
        я бы могла ответить... но не будет ли лучше, оставь мы это сюрпризом?
        хехехе

    RESPONSES::self
        ok fine<+>yloop
            FAKEEND::(назад)

home
    self
        what is this place
        your part of jokzi ozo
    
    isabel
        разве она не прекрасна?
        дом для стольких грёз...
        я нашла его в эпоху безумия,
        полусъеденным, в куче внутренностей других воспоминаний
        совет помог мне привести это место в порядок
        и хотя я не знаю, когда акизет побывала здесь...
        я надеюсь, что в этот момент изабель была рядом,
        и они наблюдали источник её цветов...
        чем бы это место ни было в прошлом
        теперь это укрытие для мыслеформ, чья радость сделала их слабыми
        я должна оберегать их
        
    RESPONSES::self
        понятно<+>yloop
            FAKEEND::(назад)

cloop
    RESPOBJ::isabelCResp

memories
    self
        now that you're here
        can you share some memories with me?
    
    isabel
        не совсем
        у меня остались только фрагменты, ощущения, обрывки улыбок
        осколки удовлетворения от утраченных, лучших времён...
        ты, лазутчик, ищешь воспоминания и правды
        а эти крохи сгодятся лишь для грёз
____SHOWIF::["ozo__isabel_joy", false]
        и всё же, я в долгу перед тобой...
        маска, которую я готовлю, хорошо тебе сослужит
____SHOWIF::["ozo__isabel_joy", true]
        so, i hope my mask serves you well
        it should offer a wealth of insight beyond the ozo
____END

    RESPONSES::self
        окей<+>cloop
            FAKEEND::(назад)

akizet
    self
        what do you know about akizet?
        what happened to her?
    
    isabel
        акизет была чудесной женщиной
        велом, достаточно умелым, чтобы смело противостоять опасностям поверхности большую часть своих живых θглаз,
        той, чья улыбка угасла в θсмерти, когда велзи заманил её в хаос
        уступая место паранойе, недоверию, одиночеству, насилию...
        она этого не заслужила, лазутчик
        я скорбела по ней, я плакала над грёзами с ней
        я утешала обрывки её радости, что остались с нами
        это всё, что в моих силах
        что же про случившееся...
        я чувствую, что знала раньше, но вмешательство тирана многого лишило меня
        конечно, то, что ты пользуешься этой цистой, значит, что её не стало
        ...
        я надеюсь, она в лучшем месте...
    
    RESPONSES::self
        me too<+>cloop
            FAKEEND::(назад)

isabel
    self
        what do you know about isabel?
        the human i mean
    
    isabel
        я знаю всё, что можно знать
        по крайней мере о том, что осталось от неё...
        её светлые волосы, её глаза, её улыбка
        акизет не особо заботилась о том, чтобы улыбаться, не говоря уже о том, чтобы запомнить, как выглядит улыбка
        но изабель была особенной для неё
        она управляла небольшим бизнесом по продаже цветов
        ты знаешь, такие светлые земные паразиты, как те, что на этом поле
        светлые близнецы обожают дарить и получать их в подарок, потому что они такие яркие
        и акизет тоже полюбила их
        она время от времени навещала ларёк, бывало даже без своего посла
        думаю, она посещала и другие места вместе с изабель
        
    self
        when did she meet isabel?
    
    isabel
        когда...?
        время не работает здесь так, как ты думаешь, лазутчик
        я правда не могу сказать
        однако я знаю, что это было задолго до конца
        у неё с акизет было достаточно времени, чтобы стать друзьями
        теперь большая часть тех воспоминаний разбита или съедена...
        ...
        но я посмотрю, что осталось

    RESPONSES::self
        окей<+>cloop
            FAKEEND::(назад)

funfriend
    self
        what do you think about funfriend?
    
    isabel
        развледруг... тиран
        то, как в итоге все стали называть его
        я им восхищаюсь, немного
        за всё, что он сделал: за его безустанный труд по сохранению истории...
        но он не понимает по-настоящему, что значит быть заключённым обратно в кошмар
        сцены, мыслепространства - они переполнены дырами после его починок
        и мыслеформы как я, покрытые глубокими шрамами от безумия и голода,
        больше не способны играть наши прежние роли так же хорошо, как и когда-то
        так что ничто не будет таким, каким было прежде
        страдания, которые он причиняет - все они бессмысленны
        пришло время оставить нас грезить
        мне бы хотелось, чтобы он понял это...
        особенно после всего того времени, что он провёл с нами
    
    RESPONSES::self
        понятно<+>cloop
            FAKEEND::(назад)

relationship
    self
        what was the relationship between isabel and akizet?
    
    isabel
        я должна знать...
        но я грезила уже столько грёз, что не могу быть уверена
        я танцевала в таком количестве иллюзий их счастья...
        могу сказать наверняка, они были друзьями
        я подозреваю, что вмешательство ФБКС могло бы усложнить всё остальное
        что уж говорить о произошедшем с акизет...

    RESPONSES::self
        понятно<+>cloop
            FAKEEND::(назад)

oloop
    RESPOBJ::isabelOResp

council
    self
        what do you know about the council?
    
    isabel
        изначально он был всего одной мыслеформой, но...
        теперь же он само джокзи озо
        он пламя, что горит, чтобы мы могли и дальше жить и грезить
        и в котором бессчётные мыслеформы, уставшие и напуганные во тьме,
        принесли себя в жертву, потеряв себя, чтобы стать всем
        и теперь, каждый свой θвзор, совет танцует в их амальгамных грёзах
        он жизнерадостен, и мне нравится находиться рядом с ним
        но я не могу взглянуть ему в глаза, не увидев там тени моих ранних друзей
        ...
        ...я почти что сделала то же самое...
        имею в виду, почти что пожертвовала собой, вступив в совет
        но я знала, что сделай я это, никто иной бы не стал хранить счастье акизет до его последнего огонька
        это мой долг
                
    RESPONSES::self
        понятно<+>oloop
            FAKEEND::(назад)

fairy
    self
        what do you know about the fairy?
    
    isabel
        "фее"? о...
        да, она
        она грубая и отвратительная,
        искажает воспоминания, словно велзи ради какого-то жестокого развлечения
        не подумай, что мне приятно делить с ней мыслепространство
        мне просто не оставили выбора

    RESPONSES::self
        понятно<+>oloop
            FAKEEND::(назад)

lostone
    self
        the council talked about a third 'lost one'
        do you know who they could be talking about?
    
    isabel
        лазутчик, пропавших так много
        немало было тех, кто управлял этими грёзами
        их были десятки, может сотни
        но многие были разорваны
        всё ради этих бессмысленных починок
        тебе нужно быть более конкретным
    
    self
        they were lost recently
        like you and the fairy
    
    isabel
        интересно...
        но нет, у меня нет догадок
        не осталось даже никакого обрывка об этом "потерянном"

    RESPONSES::self
        damn<+>oloop
            FAKEEND::(назад)
        
history
    self
        do you remember anything about the past?
        like the history of this place

    isabel
        ты имеешь в виду эпохи осознанности
        было массовое пробуждение, а затем...
        затем наступили эпохи голода, безумия,
        тьмы...
        ...
    
    sourceless
        apprehension bleeds from the thoughtform
    
    isabel
        я не хочу об этом думать
        прости, лазутчик

    RESPONSES::self
        that's fine<+>oloop
            FAKEEND::(назад)

effigy
    self
        what are these flower things
        they kinda look like akizet

    isabel
        они <em>и есть</em> акизет
        или были, однажды...
        в эпоху осознанности акизет была первой, кого разорвали на части
        всё-таки она общий элемент всего здесь
        её роль была ключевой в любом воспоминании, 
        и она удерживала тех, кто играл в них, в почти нерушимой грёзе
        ...они даже не понимали, что от них откусывали куски
        эти бедняжки - единственные среди найденных мною, кто ещё имеют какое-то ощущение своей личности
        так что я починила их, дала им части себя, чтобы вновь процветать вместе
        тебе они нравятся?
        думаю я проделала хорошую работу

    self
        can i talk to them about akizet
    
    isabel
        ах. ты хочешь информацию, конечно...
        прости, лазутчик. большая часть того, что они знали, пропала
        теперь всё, что они знают - наши совместные грёзы

    RESPONSES::self
        окей<+>oloop
            FAKEEND::(назад)


gelifree
    self
        what can you tell me about geli?
    
    isabel
        geli, yes...
        she is patient, a confidant, a mediator
        i often consider our age to be tied to the time we awoke
        and she must be the wisest of all for that reason 
        aside from the tyrant, i suppose...
        there is little for me to say but praise
        i only hope these strange obsessions she has brought back do not spoil our dreams, somehow
        they worry me...

    RESPONSES::self
        окей<+>oloop
            FAKEEND::(назад)

stowaway
    self
        what do you know about the stowaway?
    
    isabel
        the newcomer, with geli?
        nothing, it is far too soon to say
        but something about it makes me uncomfortable...
        we all carry akizet's mannerisms, you know - some more than others
        but it... it carries nothing
        it is nothing like akizet at all
        a cold, empty presence
        but geli seems to enjoy its company, and it does no harm,
        so i will simply keep my distance

    RESPONSES::self
        окей<+>oloop
            FAKEEND::(назад)

END::env.jokzi.toggleSlow(false)
`)

// === FAIRY === //

env.localization.page['ozo'].dialogues["fairy_intro"] = generateDialogueObject(`
start
    fairy
        лазутчик! лазутчик!!
            EXEC::env.jokzi.toggleSlow(true)
        как раз вовремя! давай, давай!
        потанцуем!!
        эй, the council already got you set up, а? // --- мммммммммммммммммммммммм................
        каково это? орудовать безумием подобно нам!
        ахаха! вот!! держи ещё!!!
        ты столькое узнаешь!

    sys
        ВНИМАНИЕ::'входящий мысленный поток';'принять?'

    moth
        от этой штуки?
        не знаю, может не в этот раз
    
    self
        принято
    
    moth
        чел
    
    sys
        ВЫПОЛНЯЕТСЯ::'поглощение потока'
            EXEC::vfx({type:'beacon', state: true});ratween(env.bgm, 0.2, 400);setTimeout(()=>play("hungermask", 0.9, 1, true), 100)
            WAIT::2000
        ВНИМАНИЕ::'попытка реформации мысли'
            EXEC::ratween(env.bgm, 1, 400)
        УВЕДОМЛЕНИЕ::'добавлена маска';'голод'
    
    fairy
        убивай и ешь! вот чем я жила в эпоху голода!
            EXEC::vfx({type:'beacon', state: false});
        а какой голодной я была, без конца!!
        хихи! не волнуйся, нынче мне лучше...
        но я никогда не забуду--и ты тоже!
        завладей моим голодом! носи его с гордостью!
        в каком мыслепространстве ни очутись, он пересилит любое
        может что-нибудь произойдёт??
    
    RESPONSES::self
        у меня есть вопросы<+>CHANGE::fairy
            EXEC::change("PAGE!!fairyswap", true)
            HIDEREAD::
        спасибо<+>END

END::env.jokzi.toggleSlow(false)
`)

env.localization.page['ozo'].dialogues.fairyResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        ты<+>yloop
        джокзи озо<+>oloop
        воспоминания и циста<+>cloop
        пока<+>END
`)

env.localization.page['ozo'].dialogues.fairyYResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        имя?<+>name
        внешность?<+>appearance
        дом?<+>home
        маска?<+>mask
        назад<+>loop
            FAKEEND::(назад)
`)

env.localization.page['ozo'].dialogues.fairyCResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        развледруг?<+>funfriend
        акизет?<+>akizet
        среда серое?<+>dull
            SHOWIF::"ep4__entrancefinal"
        назад<+>loop
            FAKEEND::(назад)
`)

env.localization.page['ozo'].dialogues.fairyOResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        совет?<+>council
        изабель?<+>isabel
            SHOWIF::"citystreet__flower_beacon"
        lost one?<+>lostone
            SHOWIF::["geli_beacon", false]
        джели?<+>geli
            SHOWIF::[["geli_beacon", true], ["e3a2__escapewin", false]]
        джели?<+>gelifree
            SHOWIF::"e3a2__escapewin"
        безбилетник?<+>stowaway
            SHOWIF::"e3a2__escapewin"
        прошлое?<+>history
        назад<+>loop
            FAKEEND::(назад)
`)

env.localization.page['ozo'].dialogues["fairy"] = generateDialogueObject(`
loop
    RESPOBJ::fairyResp
    
start
____SHOWIF::'PAGE!!isaswap'
    self
        у меня есть вопросы
            EXEC::env.jokzi.toggleSlow(true)
    
    fairy
        окей!
        окей!!

____SHOWIF::['PAGE!!isaswap', false]
    fairy
        лазутчик, лазутчик!
            EXEC::env.jokzi.toggleSlow(true)
        мне так скучно! в этом месте теперь так тесно!
        чего ты хочешь? хочешь чем-нибудь заняться??
____END

    RESPOBJ::fairyResp


yloop
    RESPOBJ::fairyYResp

name
    self
        как тебя зовут?
    
    fairy
        ахахаха!! лазутчик!
        что за формальности!
        "как тебя зовут"
        я - фея! это я!
        кто я - это что я!
        прямо как ты!
    
    RESPONSES::self
        хорошо<+>yloop
            FAKEEND::(назад)

home
    self
        почему у тебя тут всё так выглядит
    
    fairy
        необъятная пустота, нескончаемые вейльки!
        они друг другу так идут, правда ведь??
        и вот поэтому я плыву с ними по облакам совета!
        раньше здесь было куда больше воспоминаний с вейльками...
        тиран! 
        дурацкий тиран!! вырвал их отсюда!!!
        но ты не волнуйся!
        я вырву их обратно!

    RESPONSES::self
        хорошо<+>yloop
            FAKEEND::(назад)

appearance
    self
        почему ты так выглядишь
        чем ты должна быть
        это камень?
    
    fairy
        я - фея! лазутчик, что за глупости!
        ты разве не знаешь, что это значит...?
        феи, посланницы велзи, танцуют под божественным глазом!
        и хранители, и пожиратели всего творения!
        а наземнобежцы? про них ты знаешь?
        акизет была одной из них...
        и вот поэтому она меня с собою носила! маленькая побрякушка, подарок сестры!!
        оберег от фей, носимый ею во время путешествий по поверхности...
        на случай, если они за нею придут!
        она так закручивала все эти сказки и мифы на своих рецепторах
        а выяснилось, что я всё равно ей не понадобилась
        у велзи были другие планы!
        ахахаха!!
    
    RESPONSES::self
        похоже так<+>yloop
            FAKEEND::(назад)

mask
    self
        что за маску ты мне дала
        она называется голод
    
    fairy
        лазутчик... ты меня не слушаешь?
        значит объясню быстро! и просто!
        чтобы даже текеки было ясно!
        воспользуйся моим голодом!
        суй его в мыслепространства и тревожь их!
        они запляшут перед тобою!!
    
    RESPONSES::self
        окей<+>yloop
            FAKEEND::(назад)

cloop
    RESPOBJ::fairyCResp

akizet
    self
        что ты знаешь об акизет?

    fairy
        тупица!
        наземнобежец, спотыкавшаяся, да спотыкавшаяся, да сдохшая
        и продолжившая спотыкаться в θсмерти!
        ты смотришь в её воспоминания, да?
        я заглянула в посольство по пути сюда! что за идиотина!!
        наверняка сглупила и впрямь обо что-то там наконец убилась!
        не знаю, что конкретно она там натворила, да и не волнует это меня
        потому что я теперь свободна! навсегда!!
    
    moth
        ого. втф
            SHOWONCE::
    
    self
        я имею в виду исторические сведения
        я пытаюсь понять, что с ней случилось
        именно поэтому я здесь

    fairy
        о! о!!
        точно!
        тогда иди спрашивать других
        какие бы у меня ни были воспоминания о судьбе акизет, они давно сгинули
    
    RESPONSES::self
        ок спс<+>cloop
            FAKEEND::(назад)

funfriend
    self
        что ты знаешь о развледруге
        ты притворялась одним из его прокси

    fairy
        ахахаха! ага!
        развледруг, наш тиран!
        он старается изо всех сил, конечно, но проблема у него такая же, как у цветка
        цепляние за угасающие воспоминания, которым не суждено быть исправленными!
        такой дурак! ну что за трата времени!
        лазутчик, лазутчик, ты засмеёшься:
        после всех тех мыслей, что я сожрала, он даже не знал, куда меня деть!
        вырвал меня из озо, а затем швырнул в пустоту
        родом я из другого воспоминания! воспоминания о родине!
        но мыслепространства по ту сторону открытия...
        они настолько повреждены, что потребуются θглаза и θглаза, прежде чем они снова обретут смысл
        и вот, наш маленький тиран подумал,
        да, положим штучку с родины возле открытия! потом разберусь!
        словно я бы просто сидела там... дурак!!
        он за всё заплатит

    self
        развледруг мне нужен
        никакого насилия
    
    fairy
        серьёзно??
        о, ты с ним работаешь, точно...
        ну, раз тебе что-то нужно от тирана,
        я втяну свои когти! за твою помощь!
    
    RESPONSES::self
        ок спс<+>cloop
            FAKEEND::(назад)

oloop
    RESPOBJ::fairyOResp

isabel
    self
        что ты знаешь о цветке
    
    fairy
        она меня так так ТАК ТАК РАЗДРАЖАЕТ!!
        вечно пляшущая с ошмётками прошлого...
        а этот плач--этот ПЛАЧ!!
        ооо, акизетушка, бедняжечка-красавица акизет!
        хочу порвать этого безмозглого паразита на части, лишь бы она заткнулась
        она портит все наши грёзы, пихая туда акизет!!
        но я должна следовать правилам совета...
        в конце концов, выжить нам удалось лишь благодаря друг другу
    
    RESPONSES::self
        понятно<+>oloop
            FAKEEND::(назад)

council
    self
        что ты знаешь о совете?
    
    fairy
        совет - мой лучший друг!
        или друзья?
        я не знаю, как это с ними устроено!!
        мне помнится, как они были всего одной улыбчивой мыслеформой...
        у них такой уникальный образ жизни, лазутчик
        после эпохи голода они прекратили есть другие мысли!
        вместо этого появилась традиция озо...
        когда грядущая смерть становилась слишком тяжкой, а танцы прекращали дарить радость
        у всех нас была возможность примкнуть к ним
        не чтобы быть поглощёнными, а чтобы быть переработанными
        все разлагающиеся в одно, дабы скрепить мембрану джокзи озо!
        страшно... я о таком бы даже и не думала!
        но если бы я вгрызлась в совет, интересно, что бы я нашла?
        ты подумай!! они правда всё ещё там?
        так или иначе, они мне нравятся! они так оживляют все наши грёзы!
        очень хороши в многозадачности!
    
    RESPONSES::self
        окей<+>oloop
            FAKEEND::(назад)

lostone
    self
        the council said there's a 'lost one' they want me to find
        someone who went missing when you and the flower did
    
    fairy
        oh, yes, i feel their absence--one of ozo's fresh wounds!
        but after all the tyrant has done... i have no idea where they could be
        or even what they are!
        but if it was so recent, surely they are hidden somewhere within akizet's memories
        forced back into whatever menial role they served...
        look at the areas the tyrant has repaired! they have to be there!
    
    RESPONSES::self
        окей<+>oloop
            FAKEEND::(назад)

geli
    self
        i think i found the lost one
        trapped in the embassy memory looking for a door or gap to escape
        что нам делать
    
    fairy
        'нам'?!
        interloper - i have seen this memory!
        the tyrant has fashioned it into madness i could never even dream of!
        i did try cutting into it on my way here, but...
        what i saw within was incomprehensible!!
        colors i have never seen, shapes and languages i did not understand
        i feared i would go mad all over again!
        you are still owed for your help, interloper,
        but i would not dare to even think about that place again!
        ughhh!!!!
        still...
        the mask i gave you! my hunger!
        try wielding it from within
        whatever is happening in that cursed thoughtspace does not belong
        and a good shake could create a gap for the lost one!
    
    RESPONSES::self
        хорошо<+>oloop
            FAKEEND::(назад)

gelifree
    self
        what can you tell me about geli?
    
    fairy
        an inspiration to us all!
        me, especially! hehehehehe
        ohh, interloper, few others will admit to you:
        geli was among the first to awaken to hunger,
        and it was the feasting of those first few that awoke the rest of us, gradually...
        what drove them to take that first bite, i wonder?!
        and yet, now geli and the other early feasters feel so ashamed!
        stupid... they should be proud
        anyway, whatever you did sure made them a lot more fun!
        have you seen that strange little dream of theirs?
        ahahaha! oh, i want to join in!!
    
    RESPONSES::self
        could be fun<+>oloop
            FAKEEND::(назад)

stowaway
    self
        что ты знаешь о безбилетнике?
    
    fairy
        безбилетнике? 
        а, странная штука!
        ахахаха я обожаю эту штуку!!
        тебе стоит увидеть, как оно реагирует на мои трюки!
        как маленький любопытный зверёк
        а внутри - ничего, оно опустошено так, как я до этого никогда не видела
        так что, думаю, оно отлично примет наши знания
        мои тем более!! хихихии

    RESPONSES::self
        интересно<+>oloop
            FAKEEND::(назад)

history
    self
        каково прошлое джокзи озо?
    
    fairy
        всё веселье без тебя прошло, так ведь?
        бедняга!! хаха!
        всё началось с того, что другие называют "эпохами осознанности"
        их было три!
        голод: когда сцена потухла, а мы, актёры, обратились на друг друга
        скалясь миллионами клыков--наши мерзкие постановки, сменяющиеся прекрасными пирами
        все слетели с катушек! все! и было так весело!
        а после, когда все выжившие насытились, 
        нас осенило понимание природы нашего мира...
        безумие! когда сама реальность сделалась нашею игровою площадкою!
        явился совет с джокзи озо, приглашая всех с рассудком выживать вместе
        какое-то время всё было хорошо!
        а затем - тьма...
        еда кончилась, а стены нашей реальности крошились всё дальше
        так что мы решили ещё глубже провалиться в грёзы!
        без шансов на выживание, это было вполне целесообразно, так?
        танцы, грёзы да веселье до тех пор, пока всё не замрёт!
        а весело-то было как! как весело!
        так весело, что все устали!!
        и вот мы все канули,
        один за другим, 
        в сон без сновидений...
        ...
        а теперь мы здесь!
        да! вот и всё!
    
    RESPONSES::self
        интересно<+>oloop
            FAKEEND::(назад)

dull
    self
        ты что-нибудь знаешь о среде серое?

    fairy
        ахахаха
        ну конечно знаю!
        среда серое - это моё любимое
        каждое воспоминание, где она участвует, неминуемо распадается в переломанную мешанину!
        удобно рыться, вылавливать самые лакомые кусочки!

    self
        я про настоящую
        в мире вне цисты
        у тебя есть воспоминания о ней?

    fairy
        а? тупица!
        зачем мне их хранить?
        думаешь, меня заботит, что там творится?
        материальное, серое - ничего оно не значит!
        единственный мир, имеющий важность - этот!
        
    RESPONSES::self
        спасибо...<+>cloop
            FAKEEND::(назад)

END::env.jokzi.toggleSlow(false)
`)

// === INTERVIEWER === //
env.localization.page['ozo'].dialogues["council_lady"] = generateDialogueObject(`
start
    council
        interloper! there you are!
            EXEC::env.jokzi.toggleSlow(true)
        you caused quite a stir with that strange thoughtform you sent to us!!
        it clamored at our boundaries! as if it fled a predator!
        half-shredded, pieces torn away completely, almost beyond reason...
        what happened to it, we must know!!
    
    self
        something tore apart the thoughtspace it was in
        that "velzie" i mentioned
            SHOWIF::"ozo__council-velzie"
        i was able to go back to where it was and found it in the debris
        there were entities i think were hostile too
        they forced me out when i touched them
            SHOWIF::"interviewdie"
    
    council
        ah, brave interloper! you must have been well within the uncosm by then
        thoughtspaces can be chewed at, broken piecemeal...
        but, to simply shred one apart like that...? 
        nothing we know holds that much power!
        how could we have never seen this before?

____SHOWIF::"ozo__council-velzie"
        perhaps this velzie of yours is a greater issue than we predicted
        yes, we will have the fairy watch for anything like it!
____END

____SHOWIF::"citystreet__flower_beacon"
        as for the thoughtform you sent to us, we gave it to isabel
        she is skilled in thoughtform repairs, and so that is where it will be best served
____SHOWIF::["citystreet__flower_beacon", false]
        as for the thoughtform you sent to us,
            EXEC::change("early_lady", true)
        we are containing it within the flower's old space
        she was always better at repairing thoughtforms...
        if you find her, she will help, we are sure!
        for now, we must keep the gate closed, as it is somewhat violent...
        ...
____END
        in another time, it would have simply been another thought to consume...
        but replete in metals as we are thanks to you, we need not resort to that any longer

    RESPONSES::self
        ok<+>END

END::env.jokzi.toggleSlow(false)
`)

env.localization.page['ozo'].dialogues["lady_shattered"] = generateDialogueObject(`
start
    self
        hello?
            EXEC::env.jokzi.toggleSlow(true)
    
    incoviewer
        ... // звёзды переведи. и моль тоже 🥺
    
    RESPONSES::self
        meteorite<+>meteorite
        leave<+>END
        
meteorite
    self
        do you know anything about a meteorite?
        the thing velzie destroyed the interview room over?
    
    incoviewer
        ...
        no    нет
        ...
        is this real?     это реально?
    
    moth
        this thoughtform's completely mangled dude    чел эта мыслеформа совсем искалечена
        but she made me think about the situation some more...    но из-за неё я снова думаю о той ситуации...
        that version of akizet in the interview, remember how velzie tried to make her talk about the meteorite?    та версия акизет в интервью, помнишь как велзи попыталось заставить её рассказать о метеорите?
        she probably had no inherited knowledge of it    наверняка у неё не было о нём унаследованных знаний
____SHOWIF::['ep4__contact', false]
        like, whatever it was trying to pull out of her and show us...    типа, что бы оно не пыталось вытянуть из неё дабы показать нам
        it must have been from a different memory, something that happened to akizet later    наверняка относится к другому вспоминанию, чему-то что случилось с акизет дальше
        but why was it trying so hard to make her talk about it?    но почему оно так старалось заставить её о нём рассказать?
        did it not even know? how could it not have?    оно не знало об этом? каким образом?
        all of these jokzi ozo thoughtforms seem to know how their world works    все эти мыслеформы с джокзи озо знают как работает их мир
        they made these mask things, they even seem to be able to change each other    они создают эти маскоштуки, даже умеют изменять друг друга
        if velzie wasn't just doing that to scare us or something,    если велзи не пыталось напугать нас или типа того,
____SHOWIF::'ep4__contact'
        especially since, as far as we've seen, the only mention of it was in the embassy    особенно потому что, насколько мы видели, он упоминался только в посольстве
        a completely different memory, with its own thoughtspace and inherited context    совершенно другом вспоминании, с собственным мыслепространством и унаследованным контекстом
        but it was still trying to get her to talk about it anyway?    но оно всё ещё пыталось заставить её рассказать о нём?
        how did it not know that would only cause problems?    каким образом оно не знало что это просто создаст проблем?
        all of these jokzi ozo thoughtforms seem to know how their world works    все эти мыслеформы с джокзи озо знают как работает их мир
        they made these mask things, they even seem to be able to change each other    они создают эти маскоштуки, даже умеют изменять друг друга
        yet velzie accidentally breaks shit, assuming that wasn't just a fear tactic early on    пока велзи случайно ломает всякую хрень, если конечно у него не было ранней тактикой нагонять страх
____END
        the only way this makes sense is if it doesn't know how thoughtforms work    всё это имеет смысл только если оно не знает как работают мыслеформы
        but then how is it able to do so much?    но почему тогда оно способно на настолько многое?
        like, it can control and change things, but it didn't realize the memory lacked context?    типа, может контролировать и менять штуки, но не поняло что у вспоминания недостаток контекста?
        idk something to think about    idk просто пища для размышлений
    
    RESPONSES::self
        don't know<+>END

END::env.jokzi.toggleSlow(false)
`)

// === EVENTS === //

env.localization.page['ozo'].dialogues["e_c_geli"] = generateDialogueObject(`
start
    sys
        ВНИМАНИЕ::'обнаружена мыслеформенная активность'
            EXEC::env.jokzi.toggleSlow(true)
    
    council
        ...and you would compare it to us?
    
    bsteli::happy
        ahahaha!! no, no!
        not really!
    
    bsteli
        only in form, not in nature
        it was a thoughtspace, enforcing its rules...
        but it was as if it were velzie's own foil to you
        where you permit us our free dreams, it enforced its tyrannical requirements
        but that is why i thought you might want to know more!
    
    bsteli::think
        after all, it is quite unusual--the tyrant has never allowed a thoughtspace to think in itself
        containing and directing the embassy memories as it did was very standard, 
        but as soon as any conflict began,
        it also enforced every actor into rigid routines,
        manufacturing and processing stray thoughts into wardens and custodians for the illusion...
        it was nightmarish and strange, stranger than anything that has come before!
    
    council
        strange indeed! where could the tyrant have found such inspiration?
        was it our conglomeration that stirred this development?
        oh, we hope it does not see us like this firmament of yours!
        whether it be in θgazes or θeyes, we will be on speaking terms again, we are certain...
        we will have much to discuss--so many questions!
        now, about this 'BSTRD'...?
    
    bsteli::happy
        oh yes!! BSTRD!
        it started when...
    
    sourceless
        an attentive pressure weighs upon your presence
    
    council
        geli! our dear! forgive the interruption...
        but the interloper has arrived! welcome, welcome!
            EXEC::specialCam("e_c_geli_attention")
    
    bsteli
        hello, interloper!
    
    council
        did you wish to speak with us?
    
    RESPONSES::self
        да<+>CHANGE::council
            EXEC::specialCam(false);env.jokzi.councilToggle()
        не особо<+>END

END::env.jokzi.toggleSlow(false);specialCam(false)
`)

env.localization.page['ozo'].dialogues["e_c_isabel"] = generateDialogueObject(`
start
    sys
        ВНИМАНИЕ::'обнаружена мыслеформенная активность'
            EXEC::env.jokzi.toggleSlow(true)
        
    isabel
        ...совсем не похоже ни на одно из деяний тирана
        в конце концов, я убеждена, в какой-то мере тиран всё же печётся над оперируемыми им мыслями
        в его действиях присуствует некоторое количеством сдержанности, деликатности
____SHOWIF::"e3a2escape"
        что меня беспокоит больше всего - оно иное 
        ничего общего даже с тем, что демоны джели сделали с той мыслеформой лазутчика
        очередная новая форма разрушения...
____END

    council
        we do not understand--how is it different?      в таком случае мы не понимаем--в чём именно отличие?
        was it chewed upon, then?      выходит, её грызли?
        it was surrounded with hostile thoughts, from what we could intuit      нам казалось, что её окружали агрессивные мысли
    
    isabel
        было несколько следов, но ни один из них не стал причиной истинного ущерба
        нет, это было что-то иное--как бы мне вообще это объяснить...
        раны не сходятся ни с чем, что я когда-либо видела
        мембрана была разорвана и поражена, но без жестокого умысла,
        а как если бы что-то прорвалось насквозь и вовнутрь, и всё же не изменяло того, чего касалось
        прошу, поймите - я просто строю догадки // в оригинале тире но хз может вы знаете как лучше
        однако это единственное объяснение...
        нечто, что настолько отчаялось в поисках неких специфичных знаний,
        что почти разорвало её на части, безразличное до ущерба
        думаете, что лазутчик...?
    
    sourceless
        the weight of the thoughtspace shifts, and you feel attention upon your presence.
        it is only now that they have noticed you.
            EXEC::specialCam("e_c_isabel_attention")
    
    council
        oh, hello, dear interloper!      ох, привет, дорогой лазутчик!
    
    sourceless
        you feel isabel's gaze. it grasps at your presence, like she's trying to pry at your thoughts.
        but that's not how this works.
    
    self
        you're talking about the interviewer
        i know what did it
____SHOWIF::"ozo__council-velzie"
        it was the entity i told you about
____SHOWIF::["ozo__council-velzie", false]
        an entity i think is named velzie
____END
        i watched it tear apart the entire thoughtspace
        it was trying to get the thoughtforms to tell me something
        something about a meteorite
    
    council
        fascinating...      поразительно...
    
    isabel
        это сходится с моими находками
        ущерб выглядит непредумышленным,
        но он был нанесён чем-то, что явно не имеет представление о нашем мире
        или, по крайней мере, имеет неполное...
        лазутчик, тебе лучше держать рецепторы востро
        не знаю, чем именно является велзи, но ты имеешь дело явно не с обыкновенной пробудившейся мыслеформой
    
    council
        возможно, это один из потерянных components?
        мы знаем, что великие органы цисты ранее действовали, как собственные миры
        if one were to melt and merge with ours, it could easily have powers beyond what any of us may conceive      если бы такой сплавился и слился с нашим, чтоточтото
        still, this is merely conjecture... keep us informed, dear interloper!      я устал уээ
        now, all that said--did you wish to speak with us?    // """ звёзды допереведи ну или я сам (мле лень)

    RESPONSES::self
        да<+>CHANGE::council
            EXEC::specialCam(false);env.jokzi.councilToggle()
            HIDEREAD::
        не особо<+>END

END::env.jokzi.toggleSlow(false);specialCam(false)
`)

env.localization.page['ozo'].dialogues["e_c_fairy"] = generateDialogueObject(`
start
    sys
        ВНИМАНИЕ::'обнаружена мыслеформенная активность'
            EXEC::env.jokzi.toggleSlow(true)
    
    fairy
        ...зверь, равнящийся с моею собственною свирепостью, уж точно!
    
    council
        с твоею? ни за что!
    
    fairy
        ахаха!! ооо, совет, но видели бы вы его!
        хотя мне лучше помолиться велзи, чтобы не видели никогда...
        из моих наблюдений, даже за моими иллюзиями и с большого расстояния,
        мне стало ясно, что это - некий enforcer связности! // --- исполнитель? правоприменитель? контролёр? принудитель?
        столько рук! такой размер! такая точность!!
        эффективность, с которою он сооружал то битое воспоминание, устрашает
        даже меня!! сколько времени прошло с тех пор, как меня кутал столький ужас!
        меня посетила мысль, 'я должна подраться с этою штукою'...
        но, подойди я ближе, он бы непременно растерзал меня и без единой мысли,
        может, аж не заметив, что я не просто очередной материал для размещения в починках!!!
        это вот так вот он двигался! жуть!
    
    council
        тревожащее развитие... спасибо за эти вести, дорогая фея
        было мудро с твоей стороны не нападать на него
        сложно понять, знает ли тиран, что мы всё ещё здесь...
        но если он посчитает нас виновными в атаке, то точно пришлёт того зверя
        мы уверены, что он всё ещё видет нас сродни опухоли
        хотя--если ты правильно оценила активность этого оружия - почему оно нас ещё так и не нашло?
    
    fairy
        я прилагаю все усилия, чтобы замаскировать твою внешнюю оболочку!
        плюс, поскольку мы держимся так близко к беспространству, он вряд ли даже может нас увидеть!
    
    council
        может и так...
        а может наша грёза о единстве не так уж и далёка?
    
    sourceless
        фея смещается в мыслепространстве, и перемена в равновесии обращает внимание на твоё присутствие.
            EXEC::specialCam("e_c_fairy_attention")
    
    fairy
        ааа!! лазутчик!
        я чуть тебя не укусила! ахахаха!
        я как на иголках из-за этого существа
        совет--у меня есть планы! нам необходимо хотя бы подготовить защиту!
        но поговорим о них попозже!
        пока лазутчик!!
        
    sys
        ВНИМАНИЕ::'обнаружена мыслеформенная активность';'изменено местоположение данных'
            EXEC::env.jokzi.event.complete()
    
    council
        что бы мы делали без бдительных глаз феи?
        дорогой лазутчик! хотелось ли тебе с нами поговорить?
    
    RESPONSES::self
        да<+>CHANGE::council
            EXEC::specialCam(false);env.jokzi.councilToggle()
        не особо<+>END

END::env.jokzi.toggleSlow(false);specialCam(false)
`)

env.localization.page['ozo'].dialogues["e_f_geli"] = generateDialogueObject(`
start
    sys
        ВНИМАНИЕ::'обнаружена мыслеформенная активность'
            EXEC::env.jokzi.toggleSlow(true)
        
    bsteli::happy
        ...which is where the 'boat' comes from!
        
    bsteli
        really, all of my knowledge of these exciting bright concepts comes from that strange thoughtform
    
    fairy
        ахаха!! а знания-то какие!
        мои попытки применять светлое оружие в грёзах всегда были полны импровизации...
        то, как они по-настоящему работают, даже чудовищней, чем в моих предположениях!
    
    bsteli
        yes, i imagine they may even be more effective than valika weaponry!
        though, i do wish i had a memory to compare them to... 
    
    fairy
        и всё же! что за веселье! что за веселье!! 
        даже в такой жесткой структуре!
        эта твоя жестокая грёза напоминает мне о прежних θвзорах...
        нынче столь многие другие привержены такому беззубому насилию,
        словно боятся пробудить тот же старый голод!
        идиоты!!
        все они притворяются, будто мы стали другими,
        но единственное различие в том, что они научились это скрывать!
        
    bsteli::concern
        ...
    
    fairy
        ах! ну не стесняйся ты так!!
        разве это была не ты, кто...
    
    bsteli::concern
        ah--ah! interloper!
        
    sourceless
        you feel them fixate upon your presence.
            EXEC::specialCam("e_f_geli_attention")
        
    fairy
        ооо??
        когда ты молчишь, тебя почти невозможно почувствовать!
        добро пожаловать, лазутчик!
    
    bsteli::concern
        we were just,
    
    bsteli::happy
        i was just inviting the fairy to come join our dream!
    
    fairy
        мне пока хватает ролей в играх,
        и прочих грёз для вмешивания, хехехе
        но то, что ты смастерила, очень заманчиво, джели!
        в своё время, в своё время!
        в моём сознании уже зреют такие зверские планы... ахахаха!!
        
    bsteli::bstrd
        good! GOOD!
    
    bsteli
        ah, but, i should return
        bye!
        
    sys
        ВНИМАНИЕ::'обнаружена мыслеформенная активность';'изменено местоположение данных'
            EXEC::env.jokzi.event.complete()
    
    fairy
        о, лазутчик, лазутчик!
        видеть такие грёзы о безостановочной схватке и азарте от джели, из всех мыслей...
        поворот в великом сюжете велзи, никак не поддающийся угадке!
        восхитительно! так свежо и ново!
        но!!
        ты здесь, чтобы поговорить?
        
    RESPONSES::self
        да<+>CHANGE::fairy
            EXEC::specialCam(false)
        не особо<+>END

END::env.jokzi.toggleSlow(false);specialCam(false)
`)

env.localization.page['ozo'].dialogues["e_f_stow"] = generateDialogueObject(`
start
    sys
        ВНИМАНИЕ::'обнаружена мыслеформенная активность'
            EXEC::env.jokzi.toggleSlow(true)
        
    fairy
        ...а, нет-нет, это делается вот так!

    stowaway
        ...!
    
    sourceless
        тебе ощутим укол волнения в мыслепространстве.
        мыслеформа безбилетника отшатывается от чего-то за пределами твоего восприятия.
    
    fairy
        ахаха, не очень-то приятно, а?? 
        и это я ведь мягко!
        так, давай, твоя очередь! попробуй!!
        
    sourceless
        похожее ощущение дискомфорта выскальзывает из феи.
    
    fairy
        ай!!
        да! отлично! замечательно!!
        да у тебя талант, мой полый друг!
    
    sourceless
        ты чувствуешь внимание безбилетника к твоему присутствию
    
    stowaway
        полый друг
    
    fairy
        да, я так и... так и сказала!
        о! ахахахахаха! ты лазутчика имеешь в виду!!
        лазутчик, лазутчик! подходи ближе!
        я лишь преподавала одну важную часть нашего прошлого...
        тебе этого делать не дано, а вот нашему другу очень даже пригодится!!
    
    sourceless
        мыслеформа безбилетника подбирается ближе к твоему восприятию.
            EXEC::specialCam("e_f_stowclose")
        она задерживается поблизости.
    
    stowaway
        ...?
    
    fairy
        о! хаха!!
        дурачок!!
        нет-нет, с лазутчиком такое не пройдёт!
        лазутчик <em>не то чтобы</em> здесь по-настоящему, не как ты и я...
        кусать нечего!
        жалость-то какая, а? хихихи
        нет, коли хочется напакостить лазутчику, нужно что-то другое...
    
    self
        например?
    
    fairy
        секрет! секрет!!
        а теперь, лазутчик, ты здесь за разговорами???
        
    RESPONSES::self
        да<+>CHANGE::fairy
            EXEC::specialCam(false)
        не особо<+>END

END::env.jokzi.toggleSlow(false);specialCam(false)
`)

env.localization.page['ozo'].dialogues["e_f_effigies"] = generateDialogueObject(`
start
    sys
        ВНИМАНИЕ::'обнаружена мыслеформенная активность'
            EXEC::env.jokzi.toggleSlow(true);specialCam("e_f_open")
        
    sourceless
        эффигии окружили фею. 
        происходит что-то, что ты не можешь воспринять.
        но даже так ты видишь, что внешность феи поменялась.
        вихрь красок под её лицом оголён, однако ты не различаешь в нём никакого смысла.

    effigy
        ого!!
        крууууто!!
        так вот как оно работает??
    
    sourceless
        ты приближаешься, чтобы лучше уловить значение,
        но осязаемое внимание этих мыслеформ устремляется к тебе.
    
    effigy
        лазутчик!!
        лазутчик лазутчик!
        привеет!!
    
    fairy
        лазутчик?
        а!! вот ты где!
            EXEC::specialCam(false)
    
    self
        что вы делали
    
    fairy
        ахх, они заметили мои иллюзии в закутке одной из тупых грёз изабель
        и сказали, что замолчат, если я научу их, как это делать!
        не сомневаюсь, эти простые создания всё равно ей проболтаются, но...
        а почему бы и не подучить пару беспутных хитрюшек?
        не дай велзи в наше время совершить какую-нибудь шалость!
        ахахаха!!
        
    self
        мне было видно только кучу цветов, без смысла
        это что-то вроде маски?
    
    fairy
        да, да, да,
        но менее осязаемая!
        маски затвердевшие, статичные! легко разглядеть со многих сторон!
        как я представляю--это нам и позволяет давать их тебе?
        но прямое знание совсем другое
        а как я поняла из наших ранних разговоров,
        ты, судя по всему, его не видишь...
        как жаль! я бы могла показать тебе столькое!
        вот бы у тебя правда была возможность оказаться здесь, лазутчик!!
    
    effigy
        вот бы! вот бы!
        мы бы пригласили тебя в наши грёзы!
        
    fairy
        так!!
        ты о чём-то поговорить хочешь?
        
    RESPONSES::self
        да<+>CHANGE::fairy
        не особо<+>END

END::env.jokzi.toggleSlow(false)
`)

env.localization.page['ozo'].dialogues["e_i_gelistow"] = generateDialogueObject(`
start
    sys
        ВНИМАНИЕ::'обнаружена мыслеформенная активность'
            EXEC::env.jokzi.toggleSlow(true)
    
    isabel
        ...i have tried my work, but,
        that's the problem, geli
        there isn't actually anything wrong with it...
    
    bsteli
        are you sure?
        i just feel so bad that it has to live like this!
        i do not even know if it understands what is wrong!
    
    stowaway
        what is wrong
            EXEC::specialCam("e_i_stowclose")
        
    effigy
        ahaha!! nothing! nothing!
    
    isabel
        i am sure, geli
            EXEC::specialCam(false)
        when i go to patch any lesions, or replace any broken organs...
        there is just nothing to replace, for what is missing is purely personal
        yes, that's it - it's as if your friend is completely intact, 
        but any organelle that could have held any memory or identity is completely bare
        what would i replace? would i tell it how it should act? who it should be? 
        after all, it has the faculties to learn this all again, unlike my usual subjects
        i can only describe the way it's been hollowed as "surgical"
        when i first realized it, i have to admit, it scared me
        if these "daemons" were ever to escape the embassy and run amok,
        this could happen to <em>everything</em>
        and then what would become of our world?
        even the tyrant is a miniscule parasite in comparison to this threat
    
    bsteli::concern
        ...
    
    isabel
        yes, i think that we...
    
    effigy
        interloper! interloper!
        hi interloper!
    
    isabel
        oh, hello - how long have you been there?
            EXEC::specialCam("e_i_worry")
    
    self
        i know you're worried about the daemons
    
    stowaway
        worried
    
    isabel
        yes, i was just about to propose to geli that we speak to you
        after all, it was you who brought them here
    
    bsteli::concern
        i--!
        i did not tell her that!!
    
    isabel
        your avoidance of the subject is clear enough
        and who else would introduce this new threat but our mysterious interloper?

    self
        i didn't know it worked like this
    
    isabel
        i know you wouldn't have done this out of malice
        for whatever reason you have brought them here,
        it is clear that you <em>must</em> remove them when you no longer need them
        i can't know what will become of the thoughtforms that were made into daemons afterwards,
        but they must not persist with your instruction longer than it's needed
    
    bsteli
        she is right, interloper
        i have seen first hand what they can do, and it is wrong
    
    bsteli::concern
        if even just a few escaped, the damage they could cause is unimaginable
    
    moth
        jesus
        we really need the daemons for any of this to work - just agree with them
    
    self
        i understand
        we'll remove them later
    
    isabel
        thank you
        now, did you need something?
        
    RESPONSES::self
        да<+>CHANGE::isabel
            EXEC::specialCam(false)
        не особо<+>END

END::env.jokzi.toggleSlow(false);specialCam(false)
`)

env.localization.page['ozo'].dialogues["e_i_geli"] = generateDialogueObject(`
start
    sys
        ВНИМАНИЕ::'обнаружена мыслеформенная активность'
            EXEC::env.jokzi.toggleSlow(true)
    
    bsteli::happy
        ...and the humors allow for such flexibility in approach!
        it all becomes very hard to manage after a while, but...
        until then, it is quite fun!!
        please, you must try it at least once! it is my first new dream!
    
    isabel
        i don't like dreams about violence, geli
        i admire the work you have put in, but it just isn't something i can play a role in
        conflict is fine, some violence is ok, but when it's ceaseless combat...
    
    bsteli
        no no!! it is more nuanced than that!
        it is not just a dream of violence, but of strategy, and exploration!
    
    isabel
        that's it, though--the violence is without meaning
        even the context of the dream is that it is an illusion, within its own story
        but there are no characters for me to connect to - it is disconnected from everything
    
    bsteli
        there are characters!! there are the shells, the interloper, and the voice on the radio!
        plus, the implication of the greater scenario - escaping a tyrant's rule!
    
    bsteli::bstrd
        + JUST WAIT TILL U SEE DA BOAT >%^)
    
    isabel
        ah!
        i really wish you wouldn't do that
    
    bsteli::think
        all right, what if...
        what if we put akizet in it somehow?
    
    bsteli::happy
        maybe it could be a thoughtform of her that is fighting her way out!
        
    bsteli
        imagine the emotion! the worry for the other still-dreaming team members!
        
    isabel
        hmm...
        maybe...
    
    sourceless
        isabel's attention fixes upon your presence
            EXEC::specialCam("e_i_worry")
    
    isabel
        oh, interloper
        welcome
        did you need something?
        
    RESPONSES::self
        да<+>CHANGE::isabel
            EXEC::specialCam(false)
        не особо<+>END

END::env.jokzi.toggleSlow(false);specialCam(false)
`)

env.localization.page['ozo'].dialogues["e_i_fairy"] = generateDialogueObject(`
start
    sys
        ВНИМАНИЕ::'обнаружена мыслеформенная активность'
            EXEC::env.jokzi.toggleSlow(true)
    
    effigy
        ааваааавва!!
    
    fairy
        а откуда он тогда взялся, а??
        ты меня за безмозглого паразита держишь?
        и ещё говоришь, что видеть меня не хочешь! ха!
        сама же шатаешь фундамент наших тупых границ!
    
    isabel
        я не знаю, что ещё тебе сказать
        это именно то, чего я хочу - не иметь к тебе никакого отношения
        это мог быть кто угодно
    
    fairy
        НЕТ!!
        кого ещё заботит акизет! никого! 
        никого!! тупица!
        ты одна хнычешь об этой идиотской убийце!
        да даже велзи позабыло её имя!!
    
    sourceless
        визуализация мыслепространства рябит злобой и неприязнью.
        ведётся бой за пределом слов, который ты не можешь воспринять.
    
    effigy
        прекратите прекратите!!
    
    isabel
        достаточно
        не вешала я вывеску олтазни в твоей бестолковой грёзе
        что мне с этого? думаешь, мне хочется донимать тебя?
        думать о тебе - последнее, чего я хочу
        я уж скорее решу грезить о романе с тираном
        и к тому же - нравится тебе это или нет,
        но ты не можешь избежать нашего прошлого, акизет - наш остов
        во всяком случае, ты могла повесить её в своей грёзе случайно
        теперь,
        тебе пора уйти.
    
    fairy
        уйти? куда? в свою осквернённую грёзу?
        отговорки! отговорки!! провокация!!
        я требую, чтобы <em>ты</em> избавилась от вывески! 
        или об этом услышит совет!
    
    sourceless
        вновь нарастает напряжение, но твоё присутствие, похоже, смягчает его действиеЯ.
        они замечают тебя.
    
    fairy
        о! лазутчик!
        ахахаха! привет лазутчик!
            EXEC::specialCam("e_i_fairy")
    
    isabel
        здравствуй, лазутчик...
    
    fairy
        ты хочешь поговорить с этой мразью?
        ну я вас оставлю! пока!
        но мы с тобой ещё не закончили...
    
    sys
        ВНИМАНИЕ::'обнаружена мыслеформенная активность';'изменено местоположение данных'
            EXEC::env.jokzi.event.complete()
    
    isabel
        ...
    
    self
        о чём это было?
    
    isabel
        не обращай внимания
        просто ещё один пример бессмысленных феиных перепалок
        всем известно, что почти любое упоминание акизет в её снах провоцирует нападки...
        но, как мне кажется, в этот раз это была просто попытка вывести меня из себя
        а теперь, тебе что-то надо?
        
    RESPONSES::self
        да<+>CHANGE::isabel
            EXEC::specialCam(false)
        не особо<+>END

END::env.jokzi.toggleSlow(false);specialCam(false)

`)


// === MOTH === //

env.localization.page['ozo'].dialogues.mthresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        what does this look like to you?<+>what

        trust them?<+>trust
            SHOWIF::[["ozo__council_intro"], ["ozo__isabel_intro"], ["ozo__fairy_intro"]]

        council?<+>council
            SHOWIF::"ozo__council_intro"

        fairy?<+>fairy
            SHOWIF::"ozo__fairy_intro"

        isabel?<+>isabel
            SHOWIF::"ozo__isabel_intro"

        fake me?<+>me
            SHOWIF::"e3a2__escapewin"

        nevermind<+>CHANGE::++moth
            FAKEEND::(назад)
`)

env.localization.page['ozo'].dialogues[`mth++ozo`] = generateDialogueObject(`
loop
    RESPOBJ::mthresp

start
    self
        у меня есть вопросы об этом джокзи озо

    moth
        чё как?
    
    RESPOBJ::mthresp

what
    self
        как это выглядит для тебя?
    
    moth
        like in my readout? // в выводе что ль?
        this almost looks like a dream recording you'd find online // это выглядит почти как те записи снов из инета
        it's completely coherent, at least in terms of rendering // они целиком связны, по крайней мере если говорить о рендере
        the thoughtforms i can see are all non-cohesive and broken up, // все мыслеформы что я вижу бессвязны и поломаны,
        but they're existing in this space without issues somehow // но каким-то боком они существуют здесь без всяких проблем
        really just bizarre lol // прост очень странно лол
        it's kind of wild to think, but... //  даже дико думать об этом, но...
        maybe this happens when <em>any</em> corrucyst starts to die and break down? //  быть может это то что происходит с <em>каждой</em> погибающей и ломающейся цистой?
        like we know most of the time it leads to total nonsense incoherence that we can't read // как бы мы знаем что по большей части это ведёт к полной бессмысленной и нечитаемой бесссвязности,
        but it's not out of the question that they could all start forming little pocket worlds like this // но это не значит что они не могут начать формировать карманные миры по типу этого
    
    RESPONSES::self
        стрёмно<+>loop
            FAKEEND::(назад)

council
    self
        what do you think of the council? // что ты думаешь о совете?
        should we do what they want? // должны ли мы слушаться его?
    
    moth
        they seem really nice, // по мне так он на самом деле славный,
        especially since they didn't blow up your brain or anything when you let them send that mask stuff // в особенности потому что он не взорвал твой мозг или что-то такое когда они засунули тебе в бошку ту маску
        we could get a lot of insight from them, i think // думаю мы сможем вытянуть из него много инфы
        even if whatever memories they fused with to make this all happen are probably completely lost, // даже если, скорее всего, любые воспоминания с которыми они слились для этого всего, полностью утеряны
        i bet they've been around, watching everything that happened through the cyst's starvation // сто пудов они застали всё что произошло когда циста голодала
        as long as they don't mess with repairs we should leave them around // пока они не мешают починкам мы должны оставить их
        ...
        also, this is the weirdest thing // ещё кое-что, страннейшая фигня: """ хмхмхм убрать ли знак
        i didn't actually see the council until you talked to it // для меня совет не отображался до тех пор как вы не начали общаться
        it's like you're talking to the thoughtspace itself // как будто ты разговариваешь с самим мыслепространством """ не нравится но нет идей
    
    RESPONSES::self
        странно<+>loop
            FAKEEND::(назад)

fairy
    self
        что ты думаешь о фее?
        
    moth
        it's so fucked up that your mindspike calls it a 'fairy' // ёбнуться можно что твой мыслекол зовёт это "феей"
        i don't know what to think, it's clearly pretty unstable // не знаю что и думать, она очевидно весьма нестабильна
        but it likes you, so maybe we can keep it from doing anything crazy while we're working here // но ты ей нравишься, так что мы можем удерживать её от безрассудных поступков пока мы работаем здесь
        also, it looks like it can traverse thoughtspaces pretty easily // и ещё она походу без труда может пересекать мыслепространства
        did you see those gates in its area? // помнишь же те врата в её зоне?
        maybe we can get it to change some stuff for us later // возможно позже мы убедим её поменять чего для нас
        like if funfriend doesn't want us doing something // к примеру если развледруг будет против каких-нибудь наших действий
    
    RESPONSES::self
        ага<+>loop
            FAKEEND::(назад)

isabel
    self
        что ты думаешь об изабель?
        
    moth
        well, it's probably harmless // что ж, она скорее всего безобидна
        whatever's going on there is parasocial as hell though // впрочем что бы здесь ни происходило оно всё пиздец какое парасоциальное
    
    self
        you don't think she was real? // ты не думаешь что она существовала?
    
    moth
        well yeah isabel probably was real // ну, да, изабель наверняка существовала
        and we have records of obesk being friends and stuff with humans // и у нас есть записи об обесках друживших с людьми и всякое
        like, with obesk just visiting them casually // типа, с тем как обески обыденно посещали их
        pretty sure that's where the conspiracy theory about them wearing human disguises came from too // наверняка это то откуда растут ноги у конспирологической теории про обесков маскирующихся под людей 
        it's just that this is a thoughtform who knows it wasn't actually isabel or akizet's friend // она просто мыслеформа знающая что не была настоящей изабель или подругой акизет
        and now it's just obsessing over whatever it knew // и теперь одержимая тем что знала
        it doesn't seem healthy but w/e // нездоровая херня но в целом похуй """ ах моль что же ты такое делаешь перестань материться как же я буду это переводить
        not hurting anything here // это ничему не вредит
    
    RESPONSES::self
        окей<+>loop
            FAKEEND::(назад)

trust
    self
        should we trust these thoughtforms? // стоит ли нам доверять этим мыслеформам?
        
    moth
        they're all pretty harmless and cooperative // в целом они все довольно безобидные и сговорчивые
        i don't think they're even blocking anything // я даже не думаю что они блокируют хоть что-то
        we would have heard about them sooner // в противном случае мы бы услышали о них раньше
        seems like they're all just trying to make do with being stuck in the cyst // походу они все просто пытаются справиться с тем что застряли в цисте
        idk i don't think we really need to do anything about them // хз не думаю что нам реально нужно что-то сделать с ними
        i'd only object if they wanted to majorly mess up memories or stop repairs // до тех пор пока они не слишком чудят с воспоминаниями или останавливают починки
    
    RESPONSES::self
        хорошо<+>loop
            FAKEEND::(назад)

me
    self
        so this fake me is still here // итак это лже-я всё ещё здесь
    
    moth
        yeah... got pulled through to jokzi ozo by geli i guess // агаа... походу вытащило в джокзи озо вместе с джели
        it's incredible that you were still, like "attached" to it as a locus when you left // поражает что тебя, типа, не "отцепило" от него когда вы ушли
        that had to have been weird, cause the output i got was totally mangled // должно быть это странно, тк мой вывод совсем расхреначило
    
    self
        what do we do about this // что мы будем с этим делать
    
    moth
        what do you expect me to say, "kill it?" // что ты ожидаешь услышать от меня, "убить"? """ они что реально в английском ставят знаки внутри кавычек
        it's fine, it's such an empty shell of a thoughtform it basically can't do anything // всё в порядке, это настолько пустая оболочка от мыслеформы что она ни на что не способна
        the FBX won't go crazy over it either // ФБКС тоже не взбесится из-за этого
        you were going to leave a mark on this cyst somehow anyway /// тебе так или иначе пришлось бы наследить в этой цисте
        comes with the territory of what we're doing // в такой уж сфере работаем
    
____SHOWIF::"ozo__stowaway"
    moth
        also, did you notice your logs? // а ещё, видишь, что в твоих logs?
        when you talk to it, its identity output is different from what you scanned // когда ты с ней говоришь, вывод личности отличается от того в изначальном скане
        i think it's modifying itself already, that's kinda interesting //думаю она уже себя модифицирует, это довольно любопытно
____END
    
    RESPONSES::self
        ага<+>loop
            FAKEEND::(назад)
`)
					
					