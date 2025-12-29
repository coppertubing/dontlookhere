/*
    cor-RU - a russian localization mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/jokzi-ozo.js
    localization for /local/ozo
    (---окзи джозо)

    progress: ep2 close to being finished, most notably moth + few council + interviewer dialogues missing, review needed as of 23.08.2025
*/


env.localization.page['ozo'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "this place is wild": "место прост дикое",
        "about jokzi ozo": "о джокзи озо",


        "hello": "привет",

        "council": cor_ru.entity_menu['council'].name,
        /*unity*/   'yes, yes!!': "да, да!!",
                    'just like that!!': "именно так!!",

        // фея перенесена в everystuff.js вслед за э4а1
        /*unity*/   "already here! stupid!": "да здесь я уже! тупица!",

        "isabel": cor_ru.entity_menu['isabel'].name,
        /*unity*/   'and what a home it is, right?': 'и каков же этот дом, верно?',

        "geli": cor_ru.entity_menu['geli'].name,
        /*unity*/   "yes? what about it?": "",

        "interviewer": "интервьюер",
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

        "ækiZ¥Ét": cor_ru.entity_menu['ækiZ¥Ét'].name,


        // == event shit i dont wanna sort
        "ATTENTION::'thoughtform activity detected';'resource location altered'": "ВНИМАНИЕ::'обнаружена мыслеформенная активность';'изменено местоположение данных'",

        /*loperact*/ "let's talk": "давай поговорим",
        /*bsteli*/ "all right!": "",
        /*bsteli*/ "meet me in my region!": "",

        /*isabel*/ "let us leave the council, then": "давай же тогда оставим совет",
        /*isabel*/ "come to me, interloper": "приходи ко мне, лазутчик",

        /*wakizet*/ "fine. but we speak alone": "ладно. но мы поговорим наедине",
        /*wakizet*/ "come to my shelter": "отправляйся в моё укрытие",
        /*wakizet*/ "isabel, we will finish later": "изабель, мы закончим позже",

        /*wakizet*/ "fine": "ладно",

        /*loperact*/ "you should join in": "не хочешь присоединиться?",
        /*stowaway*/ "join in": "хочешь присоединиться",
        // --- всегда интерпретировал это мол безбилетник лазутчика тоже танцевать приглашает. энивей этот перевод как по мне выполняет похожую фукнцию: безбилетник намекает на то что лазутчику тоже хочется присоединиться

        /*effigy*/ "aww!!": "авв!!",
        /*effigy*/ "we'll come back later!": "мы вернёмся позже!",

        /*isabel*/ "let us leave the council, then": "давай же тогда оставим совет",
        /*isabel*/ "come to me, interloper": "приходи ко мне, лазутчик",

        /*bsteli*/ "u're NOT geting out of this EZ": "",
        /*bsteli*/ "PUT THE MASK ON INTERPOLATOUR!!!!!!!": "",

        // --- wawa please dont be scary.......... ahh!! this is so hard to adapt!!! no context!!
        "away": "вдали",
        "hear you": "слышу тебя",
        "closer": "ближе",
        "still here": "ещё тут",
        "come back": "вернуться",

        // == effigy
        // dancer
        "ahahahaha": "ахахаха",
        "hehehehe": "хихихихи",
        "waaawaawaaoo": "уааауаауааоо",
        "weuee!! ÿæÿ": "уэииэ!! ъæъ",
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
        "fool!! that mistake will be your last!": "ха!! эта ошибка будет твоей последней!",
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
        "i miss this one": "скучаю по этой", // --- questionable gender. i need more context !
        "it's still in there": "всё ещё там",
        // lonely weirdo
        "so quiet here interloper": "так тихо здесь лазутчик",
        "i could rot here forever": "я могла бы гнить здесь вечно",
        "i used to be scared of this place": "раньше я боялась этого места",
        "i could sleep here forever": "я могла бы спать здесь вечно",
        // hider
        "hm hmmm hmm hmm": "хм хммм хмм хмм",
        "i like to visit here just in case": "я прихожу сюда просто на всякий случай",
        "one day she'll come back": "однажды она вернётся",
        "i saw a eye once": "я видела глаз один разок",
        // asker --- where does this one appear?
        "oh? oh oh oh?": "о? о о о?",
        "really? cool! how??": "правда? круто! как??",
        "wait i wasn't listening can you say that again": "погоди я не слушала повтори пожалуйста",
        "ohhhh i ohhh i get it ohh": "ооооо я оооо я поняла ооо",
        "huhh? you just tore it up??": "чегоо? ты просто порвала её??", // --- context?
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

        "interviewer": `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА
    ::НЕРАЗБЕРИМАЯ ПОДПИСЬ`,

        "sun": cor_ru.entity_menu["sun"].desc,

        "gate::L‹ïAöIÁå": `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА
    ::ТОЧКА НАЗНАЧЕНИЯ::ОШИБКА::'необрабатываемая сущность'::ВИЗУАЛИЗИРУЕМА`,
        "wheel": cor_ru.entity_menu["wheel"].desc,
        "radio": cor_ru.entity_menu["radio"].desc,
        "basterminal": cor_ru.entity_menu["basterminal"].desc,
        "dog": cor_ru.entity_menu["dog"].desc,

        "gate::gate::?/::G:a;;T:E": cor_ru.entity_menu['gate::gate::?/::G:a;;T:E'].desc,
        "gate::gaGATE::te::?/..::G:a;;T:E": cor_ru.entity_menu["gate::gaGATE::te::?/..::G:a;;T:E"].desc,

        "ækiZ¥Ét": cor_ru.entity_menu['ækiZ¥Ét'].desc,
    },
}

// === DIALOGUES === //


// == MOTH == //

env.localization.page['ozo'].dialogues.mthresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        как это всё для тебя выглядит?<+>what

        довериться им?<+>trust
            SHOWIF::[["ozo__council_intro"], ["ozo__isabel_intro"], ["ozo__fairy_intro"]]

        совет?<+>council
            SHOWIF::"ozo__council_intro"

        фея?<+>fairy
            SHOWIF::"ozo__fairy_intro"

        изабель?<+>isabel
            SHOWIF::"ozo__isabel_intro"

        лже-я?<+>me
            SHOWIF::"e3a2__escapewin"

        акизет<+>waki
            SHOWIF::"ozo__wakizet"

        неважно<+>CHANGE::++moth
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
        как это всё для тебя выглядит?
    
    moth
        типа в выводе?
        ну почти как типичная запись сна из интернета
        всё вполне связно, по крайней мере если говорить о визуале
        а все видимые мыслеформы бессвязные и поломанные,
        но каким-то боком они существуют здесь без всяких проблем
        просто капец странно лол
        даже дико думать об таком, но...
        может это то что происходит с <em>каждой</em> погибающей и сломанной цистой?
        как бы мы знаем что по большей части это ведёт к нечитаемой и полностью бессмысленной бесссвязности,
        но это не значит что они не могут тоже формировать карманные миры по типу этого
    
    RESPONSES::self
        стрёмно<+>loop
            FAKEEND::(назад)

council
    self
        что ты думаешь о совете?
        должны ли мы слушаться его?
    
    moth
        по мне так он на самом деле славный,
        в особенности потому что он не взорвал твой мозг когда засунул ту маску тебе в бошку
        думаю мы сможем вытянуть из него много инфы
        даже если все те воспоминания, которые в этот совет слились, теперь скорее всего окончательно утрачены
        наверняка он тут уже давно и застал всё что происходило пока циста голодала
        до тех пор пока он не мешает починкам давай его оставим
        ...
        ещё кое-что, страннейшая фигня:
        совет не отображался для меня пока вы не начали разговаривать
        it's like you're talking to the thoughtspace itself // как будто ты разговариваешь с самим мыслепространством """ не нравится но нет идей --- звезды помогай
    
    RESPONSES::self
        странно<+>loop
            FAKEEND::(назад)

fairy
    self
        что ты думаешь о фее?
        
    moth
        ёбнуться можно что твой мыслекол зовёт это "феей"
        не знаю что и думать, она очевидно крайне неустойчива
        но ты ей нравишься, так что может быть она не будет творить дичь пока мы здесь работаем
        и ещё она походу без труда может пересекать мыслепространства
        помнишь же те врата в её зоне?
        возможно позже мы могли бы убедить её поменять чего для нас
        типа если у развледруга появятся претензии к нашим планам
    
    RESPONSES::self
        ага<+>loop
            FAKEEND::(назад)

isabel
    self
        что ты думаешь об изабель?
        
    moth
        что ж, она скорее всего безобидна
        впрочем что бы здесь ни происходило оно всё пиздец какое парасоциальное
    
    self
        ты не думаешь что она существовала?
    
    moth
        ну, не, изабель-то наверняка существовала
        и у нас есть записи об обесках друживших с людьми и всякое
        типа, с тем как обески обыденно посещали их
        наверняка это то откуда растут ноги у теории про обесков маскирующихся под людей
        просто это - мыслеформа знающая что не была настоящей изабель или подругой акизет
        и теперь одержимая тем что знала
        как по мне нездоровая херня но в целом похуй
        здесь это ничему не вредит
    
    RESPONSES::self
        окей<+>loop
            FAKEEND::(назад)

trust
    self
        стоит ли нам доверять этим мыслеформам?
        
    moth
        в целом они все довольно безобидные и сговорчивые
        я даже не думаю что они препятствуют хоть чему-то
        иначе мы бы услышали о них раньше
        мне кажется они все просто пытаются справиться с тем что застряли в цисте
        хз не думаю что нам реально надо с ними что-то делать
        до тех пор пока они не слишком чудят с воспоминаниями или останавливают починки мне норм
    
    RESPONSES::self
        хорошо<+>loop
            FAKEEND::(назад)

me
    self
        эта штука всё ещё здесь
            COR-RU::--- пожалуйста давайте оставим так прошу прошу прошу
    
    moth
        ага... наверн вытащило в джокзи озо вместе с джели
        поражает что тебя, типа, не "отцепило" от него как от локуса когда вы ушли
        наверно было оч странно тк мой вывод совсем расхреначило
    
    self
        и что нам делать
    
    moth
        что ты услышать-то хочешь, "давай убьём"?
            COR-RU::""" они что реально в английском ставят знаки внутри кавычек
        всё в порядке, это настолько пустая оболочка от мыслеформы что она ни на что не способна
        ФБКС тоже не взбесится из-за этого
        тебе так или иначе пришлось бы наследить в этой цисте
        в такой уж сфере работаем
    
____SHOWIF::"ozo__stowaway"
    moth
        а ещё, видишь что в твоих логах?
        когда ты с ней говоришь, вывод личности отличается от того что было в изначальном скане
        думаю она уже себя модифицирует, это довольно любопытно
____END
    
    RESPONSES::self
        ага<+>loop
            FAKEEND::(назад)

waki
    self
        the lucid akizet thoughtform here doesn't seem very trusting or happy

    moth
        yyyeaaah
        probably just needs to warm up to the place, right?
        that's on the ozo thoughts to help, though
        we can't really do any more for it right now

    self
        do you think we'll be able to get anything useful from it?
        
    moth
        probably?
        the thing is, it's a weirdly shaped thoughtform, and it's been throwing off my analysis
        i imagine on account of whatever it did to survive down there
        but it is larger than most others, which means it probably has a lot of inherited context
        maybe we can get more once it lowers its guard...
        that aside, i do think it'll be useful in the long run beyond just direct info
        i bet it could stand in for akizet in memories that don't have an intact locus
        but... that's just a theory, we haven't seen one of those
    
    RESPONSES::self
        хорошо<+>loop
            FAKEEND::(назад)
`)


// == COUNCIL == //

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
        светлые поля сгнили, звёзды - угасли
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
        безбилетник?<+>stowawaydance
            SHOWIF::'PAGE!!c_stow'
        простое задание?<+>task
            SHOWONCE::
        rejoining<+>rloop
            SHOWIF::'ozo__council-task'
        вопросы<+>qloop
        вопросы мне?<+>iloop
        потанцуем<+>dance
            SHOWIF::[["ozo__council_dance", true], ['ozodance', false]]
        хватит танцевать<+>stopdance
            SHOWIF::'ozodance'
        пока<+>END
            EXEC::env.jokzi.councilToggle()
`)
env.localization.page['ozo'].dialogues.councilRejoiningResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        ещё кто-нибудь?<+>anyone
            SHOWIF::[["citystreet__flower_beacon", true], ["localorbit__fairy_beacon", true], ["e3a2__escapewin", false]]

        цветок<+>flowersaved
            SHOWIF::["citystreet__flower_beacon", true]
        фея<+>fairysaved
            SHOWIF::["localorbit__fairy_beacon", true]

        цветок<+>flower
            SHOWIF::["citystreet__flower_beacon", false]
        фея<+>fairy
            SHOWIF::["localorbit__fairy_beacon", false]

        lost one<+>third
            SHOWIF::["e3a2__escapewin", false]

        джели?<+>geli
            SHOWIF::[["geli_beacon", true], ["e3a2__escapewin", false]]
        джели?<+>gelifree
            SHOWIF::"e3a2__escapewin"

        кавик?<+>cavik
            SHOWIF::["secavik", "beaconed"]

        назад<+>loop
            FAKEEND::(назад)
`)
env.localization.page['ozo'].dialogues.councilQuestionsResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        спрятать маски<+>leverage
            SHOWIF::"leverage"
            SHOWONCE::
        о тебе и этом месте...<+>ploop
        о цисте и других местах...<+>cloop
        судно джели?<+>vessel
            SHOWIF::"e3a2__escapewin"

        назад<+>loop
            FAKEEND::(назад)
`)
env.localization.page['ozo'].dialogues.councilPlaceQuestionsResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        почему танцы?<+>dancing
            SHOWIF::"ozo__council_dance"
        &quot;мы&quot;?<+>we
        это место?<+>ozo
        три эпохи?<+>history
            SHOWIF::"ozo__council-ozo"
        накидка акизет?<+>akicoat
        божество?<+>godlike
            SHOWIF::['recosm_state', 'killed']
        сколько ты здесь?<+>time
        пир?<+>feast
        грёзы?<+>dreams
        тёмное место<+>dark
            SHOWIF::"ozo_enterdark"
        безбилетник?<+>stowaway
            SHOWIF::"e3a2__escapewin"
        назад<+>loop
            FAKEEND::(назад)
`)
env.localization.page['ozo'].dialogues.councilCystQuestionsResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        велзи?<+>velzie
        божество?<+>god
            SHOWIF::['recosm_state', 'spared']
        тиран?<+>tyrant
        funfriend's power?<+>funfriend
            SHOWIF::'ozo__council-tyrant'
        coherence regulator<+>coreg
            SHOWIF::'fbx__ep3intro'
        акизет?<+>akizet
        среда серое?<+>dull
            SHOWIF::"ep4__entrancefinal"
        назад<+>loop
            FAKEEND::(назад)
`)
env.localization.page['ozo'].dialogues.interloperQuestionsResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::council
        настоящее имя?<+>iname
        назначенье?<+>ipurpose
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
env.localization.page['ozo'].dialogues["council_wakizet"] = generateDialogueObject(`
start
    council
        hello again, dear interloper!
            EXEC::env.jokzi.toggleSlow(true);env.jokzi.councilToggle();
        what a fascinating new thing you've introduced us to...
        we are so very excited!! a stable akizet at last!
        damaged, yes, but sane and lucid--well within reach of full repair!!

    self
        is that unusual?

    council
        oh yes, oh yes, akizet thoughtforms are rarely even close to intact!
        so often are they trapped in unbreakable dreams, quietly gnawed to pieces...
        there is a reason isabel has so many of those reformed akizets, hehe
        even those who play the role of akizet within our dreams,
        rarely, if ever, do they actually originate as akizet actors!
        it is more of an adopted role, a common protagonist, you see
        so, if we may admit, we are a little intimidated...
        we hope we can do right by her!
        all are on their best behavior!
        and if you would like to speak to her, 
        we recall seeing her linger on the outskirts
        it seems she would prefer some time alone...
        after what we heard from her explanation of the past,
        it may be some time--and we can hardly blame her!

    RESPONSES::self
        question<+>CHANGE::council
            HIDEREAD::
            EXEC::change("PAGE!!questionswap", true)
        cool<+>END
            EXEC::env.jokzi.toggleSlow(false);env.jokzi.councilToggle();

END::env.jokzi.toggleSlow(false)
`)


// == ISABEL == //

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
        hiding room?<+>room
            SHOWIF::"ozo__joy_mysterydoor"
        акизет?<+>wakizet
            SHOWIF::"pit__f3_unity"
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
____END

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

room
    self
        so i found that effigy
        it was in a weird empty room i can't see without the mask
        there's this flower thing in there too
        what do you know about it?

    isabel
        ah, you must mean the room with the 'scar'
        that one... i forgot it was there
        but, it appears to you as a flower?
        my mask must have inherited some of my tastes, hehe
        regardless, that region is carefully hidden--expertly, even
        not by me, but by someone who must have had similar knowledge...
        it's been a mystery ever since we noticed it
        but any memory of who used it, where it went, what it's for...
        it's all gone, cut away from us all
        the only thing that remains is the path they carved out of the thoughtspace
        left unmended, if only because it is a simple scar in a place none can see
        
    self
        do you think it's someone i can find?

    isabel
        maybe, not likely
        it's an old, clean wound
        i can tell it was made sometime <em>before</em> the age of darkness forced us to sleep
        ...though, i've got no idea why anyone would have left at such a horrible time
        aside from the tyrant, of course--but i doubt it was theirs
        perhaps someone swayed by their plan?
        whoever they may be, if they're still out there, 
        of the few ways they could have attempted to survive the darkness on their own...
        very few would end up with them still being sane, if alive at all
        maybe we can help you investigate, one day
        but the cyst is a very large world,
        and it's not smart for any of us to go exploring right now

    RESPONSES::self
        ok<+>oloop
            FAKEEND::(back)

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

wakizet
    self
        what do you think about that akizet thoughtform?
    
    isabel
        i'm so excited, interloper!
        we spoke, i've made my offers of help and guidance clear,
        and i've even introduced her to the akizets i repaired!
        but...
        she's hesitant to let anyone close
        it hurts to see akizet so clearly wounded, physically and mentally
        but so very insistent on carrying on by herself
        adapted so deeply to lone existence in the dark...
        oh, the poor thing--she just needs some time to adjust
        and we have much of that, but i'm...
        i guess i'm just impatient, haha
        i never thought i'd ever meet an akizet so familiar with the nature of our reality
        there is so much we'll be able to do! so much to show her!
        she just has to be comfortable, first...
        but don't worry, interloper--i have ideas!
        she is nothing i cannot handle

    RESPONSES::self
        ok?<+>oloop
            FAKEEND::(back)

END::env.jokzi.toggleSlow(false)
`)
env.localization.page['ozo'].dialogues["isabel_joy"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true);

    sourceless
        the thoughtforms here are focusing on something beneath your perception.

    effigy
        it looks ready! it does!
    
    isabel
        and only by your help, my dear vel
    
    effigy
        interloper interloper!
        hii!!

    isabel
        interloper? 
        oh, hello, welcome!

    sourceless
        an excitement carries through its thoughts.

    isabel
        it is about as good as we can make it, so...
        i will not labor in secret any longer
        we've been working on a mask for you!
        you've done so much for all of us
        especially me, finding so many of my dear akizets
        and i know you're starved for knowledge, like a newly awoken thought
        but unlike the awoken, i can trust you with this gift

    self
        what does it do?

    effigy
        it's the joy mask!
        yes! it's for having fun!
    
    sourceless
        a kind warmth suffuses the thoughtspace.

    isabel
        that's not quite correct, aki
        why don't you let me handle this part?

    effigy
        okæy
    
    isabel
        interloper, you understand that jokzi ozo is hidden from the tyrant, yes?
        entirely impossible for them to directly perceive

    self
        mostly
        but you and the others were torn from it

    isabel
        correct... an unfortunate consequence of the darkness receding
        it's only incidental that we were torn from it, though
        i assume they must have been clawing through the cache, blindly, for parts...
        only recognizing what they pulled away afterwards
        we've taken measures to prevent that from happening again
        but, that's a problem for another day
        let's return to your gift, hm?

    sourceless
        the thoughtform directs your attention to a nearby effigy.
            EXEC::setCam({x: 3.5, y: 7, rotation: 160});change("joysearch", true)
        
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::refreshStage();

    sourceless
        it's gone.

    effigy
        wooaao ahahaha

    isabel
        i suspect this should work still--she's missing, right?

    self
        yes
    
    isabel
        wonderful!!
            EXEC::setCam()
        how to explain this, to someone not 'here'...
        ah! you can imagine thoughts as having a texture
        a sort of pattern both to their exterior, and to the things they hold
        it's possible for this pattern to act like camouflage
        for a thoughtform as a whole, or for fragments of its knowledge
        intentionally, through self modification,
        or incidentally, through damage or malformation
        they can even be tailored to hide from <em>particular</em> entities,
        if you know what it is you want to hide from well enough
        throughout all the lucid ages, you could say i acquired an eye for them 
        there was much that hid in plain sight even back then
        i even altered some thoughts myself, here and there...
        a measure to hide precious things from the ravenous, then from the tyrant
        moments of warmth, fleeting moments of joy in akizet's terrible journey
        if they were lost, i... 
    
    sourceless
        the thoughtform is silent, grief creeping through your connection.
        the feeling disappears as its attention pulls away from you.
        to something else that you can't see, turned over beneath the thoughtspace.

    isabel
        these and more should still be out there, somewhere
        frozen beneath the layers of dust and blood from our darkest ages
        and i suspect that this mask, if i've done this right... 
        should grant you my sight, allowing you to see what i can
        with some space left for future improvement, too!
        of course, i've got no idea how this'll work with your method of connection...
        but, here

    sys
        ATTENTION::'thought stream inbound';'accept?'

    moth
        this sounds super useful, probably the least harmful sounding one so far lol
        not that i'd expect you to...
            WAIT::2000
            AUTOADVANCE::
    
    self
        accepted
    
    sys
        EXECUTING::'stream consumption'
            EXEC::vfx({type:'beacon', state: true});ratween(env.bgm, 0.2, 400);setTimeout(()=>play("joymask", 0.9, 1, true), 100)
            WAIT::2000
        ATTENTION::'attempting thought reformation'
            EXEC::ratween(env.bgm, 1, 400)
        NOTICE::'mask added';'joy'

    isabel
        try it on, interloper
        see if you can find that effigy!
        i think she ran off somewhere while i explained... 
        she's very good at that, hehehe
        but, she's still on this layer of the ozo, somewhere

    RESPONSES::self
        ok<+>END
            EXEC::setCam()

END::env.jokzi.toggleSlow(false);vfx({type:'beacon', state: false});
`)
env.localization.page['ozo'].dialogues["joy_mysterydoor"] = generateDialogueObject(`
start
    effigy
        interloper!!!!!!!!!!!!
        ahaha wow! 
        that was so fast!!
        no one ever finds me here
        not even the fairy!!
    
    self
        what is this room?

    effigy
        umm

    sourceless
        the effigy's focus draws your attention to the unresponsive shape nearby.
            EXEC::setCam({x: 4, y:4})

    effigy
        ...
        ummmmm
        isabel told me once
        ...
        it's old!
        connected somewhere once?
        someone used to live here??
        i donn't knowwwwwww
        lots of places like it...
        but this one's close!!
        and feels nice

    self
        lots of places?
        there aren't that many paths here

    effigy
        it's just cause we're outside!
        i wish they would let you in already!!
        you're fun and i like watching you!
        anywayy the game's over for now you win

    RESPONSES::self
        ok<+>END
            EXEC::change("joysearch", false);setCam()
`)
env.localization.page['ozo'].dialogues["joy_mysterydoor_late"] = generateDialogueObject(`
start
    effigy
        interloper!!!!!!!!!!!!
            EXEC::playerMoveTo(4, 4, "up");setCam({x: 4, y: 4, rotation: 210})
        ahaha wow! 
        you took so long to find me i was starting to get bored!
        but look who i found!

    wakeless
        ...disarming behavior is likely deception, perhaps intent on...
            EXEC::setCam({x: 4, y: 4, rotation: 180})
    
    wakizet
        hm....
            EXEC::setCam({x: 4, y: 4, rotation: 160})
        
    effigy
        i never thought ANYONE would EVER come here EVER!!!
        EVER!!!!!
        not even the fairy!!
        it's been tucked out here for so lonnnng
        and now another me is here too! yay!

    wakizet
        we are not the same

    effigy
        ahaha okayyy
        anywayy the game's over for now interloper
        you win you winnn!!
        i'll go back to ibabel later

    sourceless
        its attention drifts away from you, to the akizet thoughtform,
        whose focus burns into your mind's eye still.

    wakizet
        we should speak

    RESPONSES::self
        ok...<+>END
            EXEC::change("joysearch", false);setCam()
`)


// == FAIRY == //

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
        а какой голодной я была - без конца!!
        хихи! не волнуйся, нынче мне лучше...
        но я никогда не забуду--и ты тоже!
        завладей моим голодом! носи его с гордостью!
        в каком мыслепространстве ни очутись, он пересилит любое
        может что-нибудь весёлое произойдёт??
    
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
        прошлое?<+>history
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
        акизет?<+>wakizet
            SHOWIF::"pit__f3_unity"
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
        все, разлагающиеся в одно, дабы скрепить мембрану джокзи озо!
        страшно... я о таком бы даже и не думала!
        но если бы я вгрызлась в совет, интересно, что бы я нашла?
        ты подумай!! они все правда всё ещё там?
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
        "нам"?!
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

wakizet
    self
        what do you think about the akizet thoughtform?

    fairy
        ohhhh akizet!!
        such a big stir her arrival was!
        you know, i was very excited at first
        what a sharp form! so many teeth, so many weaponized tendrils...
        and what fresh stains upon them all! hehehe
        but then we spoke
        uuuuuugh
        and lo, another simpering adherent to the past!
        how does someone become such an unstoppable force and still end up so disappointing?
        oh well...
        maybe with the right prodding,
        we can still get some fun out of her! 
    
    self
        she's made some very real threats to tear things apart
        and i think she really meant them
        don't do anything stupid
    
    fairy
        ahahaha!
        i would NEVER do ANYTHING stupid, interloper!

    RESPONSES::self
        ok good<+>oloop
            FAKEEND::(back)

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


// == INTERVIEWER == //

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


// == WAKIZET == //

env.localization.page['ozo'].dialogues.wakiResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        you<+>yloop
        memories<+>cloop
        ozo<+>oloopearly
        this area<+>room
        bye<+>END
`)
env.localization.page['ozo'].dialogues.wakiYResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        name<+>name
        history<+>historyearly
            SHOWIF::[["bt__d0_end", false]]
        history<+>historyearly
            SHOWIF::[["bt__d0_end", true], ["ozo__wakizet-bt", false]]
        history<+>history
            SHOWIF::[["bt__d0_end", true], ["ozo__wakizet-bt", true]]
        wounds?<+>wounds
        back<+>loop
            FAKEEND::(back)
`)
env.localization.page['ozo'].dialogues.wakiCResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        knowledge<+>memories
        storm?<+>storm
            SHOWIF::"ozo__wakizet-memories"
        funfriend?<+>funfriend
        velzie?<+>velzie
        better times<+>bt
            SHOWIF::"bt__d0_end"
        back<+>loop
            FAKEEND::(back)
`)
env.localization.page['ozo'].dialogues["wakizet"] = generateDialogueObject(`
loop
    RESPOBJ::wakiResp
    
start
    sourceless
        the thoughtform's suspicious attention is already upon you.
            EXEC::env.jokzi.toggleSlow(true);playerMoveTo(3, 5, "left");setCam({x: 3, y: 5, rotation: 120, distance: 0})

____SHOWIF::["ozo_wakintro", false]
    sourceless
        but its threatening sharpness is absent.
    
    wakizet
        hello again
        this place, interloper...
        it is unbelievable
        enormous, safe, its denizens welcoming...
    
    sourceless
        it draws closer to your mind's eye, thoughts bleeding in.

    wakeless
        ...probing throughout the great space,
        still finding no sign of deceit
        of course, that, in itself, may...

    sourceless
        they vanish as it turns a certain way beneath the render.
        
    wakizet
        ...yes, 'unbelievable' is the correct concept
        the greater part of me suspects i still lie in the dark,
        trapped in some sort of inner dream,
        rotting as you gnaw upon my mind

    self
        that's beyond my ability
        you know i'm barely even present
        does this feel less real?
    
    wakizet
        no...
        only in how implausible it is that such a kindness arose from the darkness
        i feel that i sit now between the teeth of a patient beast
        i do not yet regret my decision, 
        for i still feel lucid, and the others here are personable
        but i have declined any extensive 'treatment' from them
        until i am certain this is not some sort of trap
        the entities here could be like the Ö£uv±, putting up acts, wielding coherence to lower my guard
        but i have held my defense for what must be dozens of θeyes, interloper
        do not think a θblink's peace is enough for me to falter
    
    self
        ok
        that's fine

    wakizet
        now, did you come simply to welcome me?
        i am not... averse, to talking with you more
        and i do expect you to tell me what has become of my ward
            EXEC::change("ozo_wakintro", true)

____SHOWIF::["ozo_wakintro", true]
    sourceless
        it's silent, waiting.
        something about it feels deeply tired.
____END

    RESPOBJ::wakiResp

yloop
    RESPOBJ::wakiYResp

name
    self
        what should i call you?

    wakizet
        what?
        why would you ask me that?
        is it not obvious enough? have i changed so drastically?
        though i may be like an echo,
        i am still akizet

    RESPONSES::self
        ok<+>yloop
            FAKEEND::(back)

historyearly
    self
        can you tell me more about what happened to you?
        what happened to that memory?

    sourceless
        the thoughtspace tenses alongside the thoughtform's mind.
        you feel its presence press threateningly against yours.
    
    wakizet
        i could ask you the very same question
        what   happened    to   that    memory?
    
    wakeless
        ...curl into themselves with barely contained rage....
    
    wakizet
        you seek to pry information from me,
        yet all i have from you in exchange is a vague assurance
        what is the status of my ward?

____SHOWIF::["bt__d0_end", false]
    self
        i haven't seen it personally yet

    sourceless
        briefly, the presence feels larger than the space itself.
        your vision distorts beneath its glaring mind.

    wakizet
        then it would be best if you go and check upon it, yes?
        lest you prefer i leave a trail of destruction in my own search
        
____SHOWIF::[["bt__d0_end", true], ["ozo__wakizet-bt", false]]
    self
        it's fine
    
    wakizet
        it is fine?
        i should hope that is not all you have to say
____END

    RESPONSES::self
        explain<+>bt
            SHOWIF::[["bt__d0_end", true], ["ozo__wakizet-bt", false]]

        ok<+>yloop
            SHOWIF::["bt__d0_end", false]
            FAKEEND::(back)

history
    self
        can you tell me more about what happened to you?

    sourceless
        the thoughtspace tenses alongside the thoughtform's mind.
        it quickly gives way to relief.

    wakizet
        you know well what happened, interloper
        the madness came, i awoke, i tore apart countless beasts and memories to protect my friends
        or, at least, the memory of them...
        and then, they could...
        no longer stand me

    sourceless
        the thoughtform's attention draws away from you, silent.
        its thoughts bleed into the space.

    wakeless
        ...pain remains even now
        the θgaze repeated peacefully, uneventfully,
        with terrible shapes writhing at the edges of my perception
        faces and receptors of the auxiliaries vanishing before me, 
        qou entirely disappearing from the repetition, silently
        their absence the only thing i could recall as more was taken
        and then...
    
    sourceless
        you feel its focus upon you.
    
    wakizet
        but there is more i can speak upon
        i do not quite recall what it was that first truly awoke me
        when i came to know the space beneath the stage, my true shape...
        beneath what may appear physical, what visuals present themselves,
        there is an endless writhing swarm of organisms working to create the illusion
        fooling themselves into not perceiving the true nature of this world
        like myself, before that terrifying instant...
        when i could finally notice and acknowledge <em>them</em>
        those twisted beasts, gnawing upon everything,
        a pulsating rot weaving into the corpse of my memory
        into half-eaten memories of my closest friends, 
        alongside empty shells of lesser known ones, the first to go
        ...
        but no matter my panic, no matter how i tried to awake them,
        the others could not acknowledge me or the beasts
        even as they crumbled apart, forever forgotten
    
    sourceless
        a ripple of rage passes through the thoughtspace.

    wakizet
        and so, desperate, i repaid the monstrous shapes
        i tore them apart, every one i could find,
        and though they tore more from me,
        i just... 
        i just kept going
        i only awoke from my frenzy when the rot was gone from the inside,
        where it was not long before i learned of the 'outside',
        the infinite madness--how to fight it, how to use it...
        what followed was a long journey, interloper, i could never recount everything
        in time, when it was all made so very safe, my own traps set and beasts made into guardians
        i went back inside
    
    sourceless
        the detached tiles of the render curve into themselves beneath the thoughtform's grip.
    
    wakizet
        i need not detail that... ordeal... again
        but it inspired a long, long period of rage
        a new trance, where i could only seek and tear apart any scavenger i could find
        i became so very cruel in my slaughter, in my endless consumption...
        it consumed <em>me</em>, for far too long
        if i may assume this strange place is not just some cruel extension of my madness,
        it was only you who finally awoke me from that nightmare
        
    sourceless
        the tension fades.

    wakizet
        i am not sure whether to thank you yet
        but... the peace of this place
        it does remind me of better times
        and i do appreciate what you have done
        that is all i will speak upon the matter, for now
        the wounds are still so fresh

    RESPONSES::self
        ok<+>yloop
            FAKEEND::(back)

wounds
    self
        you mentioned declining treatment
        and i can feel your thoughts sometimes
        are you wounded still?

    wakizet
        yes...
        but i am tending to it just fine
        you need not worry for me

    wakeless
        ...if indeed it is 'worry', and not some manipulation...

    wakizet
        what i tore from myself was sizable, this is true,
        but i suffered far worse in the darkness
        
    RESPONSES::self
        ok...<+>yloop
            FAKEEND::(back)

cloop
    RESPOBJ::wakiCResp

memories
    self
        do you remember anything beyond that memory you came from?

    wakizet
        i remember...
        the call initiative, the bright cousins, the workings of corru...
        there was a period after i awoke where i explored my own memory
        probing routes of - i remember my dear friend, kazki, yet where did we meet?
        nothing. when was it that cavik ascended? i should know...
        it is all fruit, bulbs of knowledge, yet no veilk at their roots
        for as empty as my memories may be beneath the facts they present,
        they... i cannot simply write them off as being 'illusory'
        because they are real, even if i am not, truly

    self
        what about the surrounding memory you tore up?
        the lab, what happened with the storm, that electrical conversion device?

    wakizet
        ah, yes...
        what i hold from it is limited, for while i devoured some parts,
        others were left to my defensive field
        i can tell you it was not simply a conversion device,
        and that it only earned its namesake after it gained an echo
        let me think, what else...
        ah--akizet delayed her own team's investigation into that call record discrepancy
        spacing sessions out over extended periods of time,
        primarily hoping that the 'timestopper' would be displaced
        which never seemed to happen, at least in what i saw
        lucky akizet, i would have liked to use the timestopper
        it sounds so fascinating
        and then, the project spun out of her control, somehow
        i recall her worry, but, from the pieces i hold...
        it did not seem entirely negative?
        there was the formation of a number of initiatives she was not entirely privy to,
        not maliciously, of course, for the storm was just ceaseless in its focused work
        and she struggled to stay informed on every detail

    self
        that's really helpful, thanks
        do you know what happened to the real akizet?
        what separated this cyst from her?

    wakizet
        no, what?

    self
        that wasn't me setting up an explanation
        i was asking you
        the cyst was by itself, on a column, in a crashed and melted ship

    wakizet
        ah...
        naturally, i must assume this corrucyst was separated from me--her--at some point
        and i did like to keep a column for maintenance in my vessel
        i doubt anyone else would pluck it from my body and place it knowingly upon the column
        but that is beyond what i was imprinted with, interloper
        from what i know of the cyst's history from the others,
        i must have been awoken well into the age of darkness, when only madness stirred
        so, the separation was well before then
        but whatever became of me...
        i hope it was for a good cause
        for my friends, or for obeski, or--for the bright cousins
        my entire existence was that simple celebration, and it is all that i truly cared to know for so long, but...
        i would like to know what followed the peace i fought so hard to protect, in time

    moth
        man...
            SHOWONCE::

    self
        there's a lot, mostly intact too
        but it's too much for me to explain
        and i think it's dangerous out there for you because of funfriend
        who i need to continue repairs so don't attack it
        
    wakizet
        hehe. do you think i am so senseless?
        
    self
        just give me some time to fix things
        maybe funfriend will loosen up
        i'm working on it

    wakizet
        very well
        i am in no hurry, after all
        besides, the others here may inform me just as well

    RESPONSES::self
        yeah<+>cloop
            FAKEEND::(back)

storm
    self
        so if you have some memories from that FBX lab,
        what do you know about the work akizet did there?
        with the storm?

    wakizet
        hm...
    
    wakeless
        ...do they know? what if akizet's secrecy still holds some importance?
        should i trust this ancient worry, or...

    self
        i know she started it because of some sort of obesk conflict
        it led to some other issues
        but what happened with the storm is a blind spot
    
    wakizet
        ah, you are familiar already?
        then there is no sense in clinging to her vague concerns of secrecy
        the 'laboratory' was already in ruin when i reached it, interloper
        not irreparable, not at first, not until i began my work upon it
        there may still be fragments for you to learn from,
        though most were eventually consumed by either myself or my wardens
        there are still blurry memories that haunt me...
        shreds of some discovery
        the information may be long lost, but the feelings remain
        vague impressions of a terrible misunderstanding,
        some creeping fear, tension...
        akizet and her team found something, achieved some goal,
        but the occasion was not as joyous as i imagine she may have liked
        yes--that is surely why she told them to 'wait' after their location attempts succeeded, 
        as some of the layers i left intact seemed to imply

    RESPONSES::self
        i see<+>cloop
            FAKEEND::(back)

funfriend
    self
        what do you think of funfriend?

    wakizet
        it is troubling how the others refer to it so readily as a 'tyrant'
        funfriend was always blunt, but well meaning, kind by design
        of course... my understanding comes from the 'real' akizet
        what do you think of it?

    self
        i think it just wants to put things back the way they were

    wakizet
        hehe...
        
    wakeless
        ...infinite, swirling madness in the dark,
        countless memories and components broken, 
        mangled into loose rotting weaves...

    wakizet
        a desire that should entertain velzie for all time in its sheer impossibility
        if only it were as simple as 'putting things back'
        perhaps with enough time, it will come to the same conclusion,
        and come to tolerate the maddened actors upon this broken stage
    
    RESPONSES::self
        maybe<+>cloop
            FAKEEND::(back)

velzie
    self
        there's another entity i think is in the uncosm
        something sentient that might be sane
        it's guarding some memory in the depths from me
        another thoughtform told me it was like a fog at the bottom
            SHOWIF::"recosm__enemy-ep1seen"

____SHOWIF::"recosm__enemy-ep1seen"
    wakizet
        ah...
        yes, i have seen what you describe
        while i did learn and adapt to the dark,
        the crushing madness of its deepest depths were too much for me to bear
        i only dared visit a few times, out of curiosity, and never for long
        but i could feel something there...
        a 'fog' is an apt description, it was too large for me to truly understand
        i feared that if i drew too close, i would be consumed by it
        for i could see dead things--shells, truly broken thoughts,
        sinking into it, past the threshold of my ability to perceive
        so--yes, i think i have seen it,
        but i would struggle to believe that it is sane, or a simple thoughtform at all

____SHOWIF::["recosm__enemy-ep1seen", false]
    wakizet
        you sound as if you could be describing me, hehe
        i never saw another thoughtspace being guarded in the same way
        but the cyst is very large, interloper
____END

    RESPONSES::self
        ok<+>cloop
            FAKEEND::(back)

bt
    self
        your memory is safe
        it was placed back in the repaired embassy thoughtspace
        and it's called 'better times'
        i went through it myself

    wakizet
        did you? how is that?
    
    self
        another akizet thoughtform was acting as the recollection locus
    
    wakizet
        recollection locus? what a peculiar description
        though i understand your meaning
        what did you see?

    self
        akizet and the team celebrated a polygonation spire being finished
        i assume funfriend filled in the gaps
        it seemed pretty intact

    wakizet
        were they happy?

    self
        yeah i think so

    sourceless
        the thoughtform's attention suddenly grows sharp upon your mind.

    wakizet
        and what is it that happened at the end?

    self
        the team had their picture taken by that human

    wakizet
        good... good
        then i can trust you were not lying to me
        perhaps in time, i might be able to experience it again, myself...

    self
        yeah

____NESTIF::"bt__d0_cass"
        but there was a weird thoughtform
        a distorted human with a briefcase full of eyes
+____NESTIF::['citystreet__director']
        apparently used to be the memory of the FBX director
+____END
        she said to not allow the darkness to fade
        that the repairs are killing "us" and the "great big thing at the bottom"
    
    wakizet
        curious, that description sounds... 
        sort of familiar, though i cannot place the reason
        did she pose a threat to the memory?

    self
        she left before anything happened
        only wanted to talk to me

    wakizet
        i see...
        it is true that if beyond the darkness is funfriend's reparative territory,
        then many, many things that have adapted to the dark will perish should it disappear
        i am not surprised that such an entity noticed the memory's movement
        i imagine much beneath the threshold of darkness felt some rumbling
        it would be more unexpected if there were no consequences, hehe
        though, it is strange that she mentions the bottom...
        i have always sensed something lay in those crushing depths beyond any sane reach
        it was simply never a concern of mine
        but if that is all, then i am happy

____END

    wakizet
        even if i must still verify its safety myself in time,
        you have done well, interloper
    
    RESPONSES::self
        thanks<+>cloop
            FAKEEND::(back)

oloopearly
    self
        what do you think of the ozo thoughtforms so far?

    wakizet
        beyond simple greetings and introductions, i have had little to decide upon
        they are eccentric--easily placed as having formed from the darkness
        but the shapes they have taken are hardly so obvious in origin
        so few are monsters like myself
        i appreciate isabel's patience and care,
        but it is strange to have someone i have never met treat me like an old friend
        especially after so much time fending against every living thing
        and her... 'akizets,' are... 

    wakeless
        ...what is it, exactly? so hard to place!
        it is miraculous how they function, being so incomplete
        unnerving is the closest concept, yet,
        this world must be so simple for them
        being both safe and so oblivious to the madness, it is hard to deny...

    wakizet
        interesting...
        the council, also - another strange and terrifying shape, 
        made up of so many smaller fragments melted, disappearing in the whole
        truly, my first impression was that you had lured me to a trap
        some great betrayal, the rational end-product of the darkness
        but instead of vicious hunger, it met me with kindness
        quickly attempting to coordinate my treatment and placement, 
        and equally as quick to accept my declination

____SHOWIF::"e3a2escape"
        then there is that strange one, geli,
        quick to offer a game, though i am hardly in the mood for play
        for as bizarre as she appears, 
        i appreciate the familiarity of an attendant golem
____END
        and, of course, the fairy...
    
    sourceless
        the thoughtform's attention shifts for a moment.

    wakizet
        i should feel relief that there are others like me, here...
        but...

    wakeless
        ...barely a step away from the beasts that tore at my memory
        exuding a constant gnashing of teeth, an echo of the most terrible things from the dark...
    
    wakizet
        i cannot stand how familiar it is...
        ...nor the similarities we share
        i should hope we have little interaction
        still, if it can thrive here, 
        then perhaps it is not so unlikely that i could, too
                
    RESPONSES::self
        yeah<+>loop
            FAKEEND::(back)

room
    self
        are you staying here?
        it feels empty
        aside from that flower thing

    wakizet
        flower... thing?
        you must speak of the subtle scarring, for it is the only other fixture
        i suppose you could see it like the root of a bright parasite...
        but yes, for now, this corner is my respite
        however brief it may be
        the emptiness you feel, it is comforting to me
        for it means few have ever tread here
        and the wound will make it easier to flee should the need arise
        did you expect more?
    
    self
        sort of
        usually there's at least a little personal manifestation
        geli's boat
            SHOWIF::"e3a2escape"
        isabel's flowers
        fairy's stars
        does that not just happen automatically?

    wakizet
        it does not
        they wrought personalization into their spaces
        i have no need to carve mine into a stay that may be temporary                
                
    RESPONSES::self
        all right<+>loop
            FAKEEND::(back)

END::env.jokzi.toggleSlow(false);setCam()
`)


// == EVENTS == //

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
env.localization.page['ozo'].dialogues["e_w_council"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true);setCam({x: 5.5, y: 9, rotation: 10})
        
    sourceless
        the akizet thoughtform lingers near the council.
        the space is saturated with shared curiosity.

    wakizet
        if that is how you are sustained, then,
        the 'dreams', the countless spaces beneath...
        this is merely a long trick, is it not? 
        the patient digestion of prey caught in a carnivorous parasite?
    
    council
        haha!!
        it would be very brave of you to ask that, if it were so simple!
        what a delight it is to be questioned in ways few have ever dared...
        our flesh, dear akizet, these walls,
        they are knit by the willing and those without will 
        and we would never tread upon yours
        for we do not hide the offer that we always extend 
        not a single portion of what it entails is ever withheld!
        besides, with the reserves provided by the interloper...
        what need would we have to act maliciously?
        our nature is dictated only by what we need to continue the dream

    sourceless
        the akizet thoughtform withdraws.
        a wordless sense of skepticism reverberates through your connection.
    
    council
        hahaha, you poor thing!!
        the darkness has twisted you so unkindly

    sourceless
        the thoughtforms shift beneath the render. 
        you feel compassion that is not yours.
        
    council
        it cannot be easy, adapting from a place where every resource is hard fought
        we offer you everything, dear akizet, unconditionally, for as long as we can exist
        will you not simply try a dream? perhaps a short one?
        we are sure you will change your mind on the matter!

    wakizet
        i...

    sourceless
        there's a brief impulse of shock. the thoughtforms shift their attention to you.

    wakizet
        hello again, interloper
        ...what you say, council, it is reasonable
        a convenient answer for every question...
        but i must remain lucid, until i am no longer vulnerable
        these changes have put a great strain upon me
    
    council
        so be it, dear akizet!
        just remember, we stand by every word, for all time
        now, interloper--did you need something?
    
    RESPONSES::self
        yes<+>CHANGE::council
            EXEC::specialCam(false);env.jokzi.councilToggle();setCam()
        not really<+>END
            EXEC::setCam()

END::env.jokzi.toggleSlow(false);specialCam(false)
`)
env.localization.page['ozo'].dialogues["e_w_isabel"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true);setCam({x: 5, y: 6, rotation: 145})
        
    sourceless
        the akizet thoughtform lingers near isabel. 
        a delicate operation is happening beneath your perception.
        isabel recoils suddenly, before resuming an indescribable effort.

    isabel
        will you stop that?
        this is part of the process, i'm not attacking you
        the wound is deep, and i believe you are missing some--
            AUTOADVANCE::
        
    wakizet
        do only what you may to stop the loss of memory
        that is my primary concern
        <em>do not</em> concern yourself with any other matter

    isabel
        of course, akizet, but...
        you still do not trust me?

    sourceless
        a moment of silent tension passes as the work continues.
        it carries frustration, an apologetic air, with no apology.
    
    wakizet
        ...i trust that you will respect my requests
        it is just...
        you act as if we are so familiar
        combined with what i have already lost,
        and being surrounded by these broken reflections,
        i fear you will simply transplant trust in place of my caution
        that would make it much easier for you, would it not?
        
    isabel
        akizet, no, i wouldn't do that
        that isn't--that's not how i work
        the other akizets you see here, they were...

    sourceless
        isabel's attention sweeps across the thoughtspace, across effigies.
        briefly, it passes over you with a silent impulse of acknowledgement.

    isabel
        ...in shreds, barely held together
        some were senselessly violent, others silent or unthinking
        all nearly lost in their entirety to madness
        you're <em>different</em>
        i've never met one like you
        not only intact after surviving the darkness, but stronger for it
        you fascinate me in a way that i wouldn't ever change
        
    sourceless
        the akizet thoughtform withdraws its frustration, silent.
        its focus finds you quickly, with a jolt of surprise.
        isabel recoils beneath the render.

    isabel
        akizet, if you keep--
    
    wakizet
        hello, interloper

    isabel
        ah! yes, the interloper
        forgive me, i was distracted--did you need something?
        
    RESPONSES::self
        yes<+>CHANGE::isabel
            EXEC::setCam();specialCam(false)
        not really<+>END
            EXEC::setCam()

END::env.jokzi.toggleSlow(false);specialCam(false)
`)
env.localization.page['ozo'].dialogues["e_w_effigies"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true);playerMoveTo(3, 5, "left");setCam({rotation: 120, distance: 0})
        
    sourceless
        as you enter the thoughtspace, you're struck by the ambient feeling.
        overpowering, nauseating curiosity, drowning out quiet discomfort.
        the akizet thoughtform is surrounded by effigies,
        keeping them at a distance with limbs you cannot perceive.

    effigy
        really really really? you ate them?
        is that what all the spikes are for?

    wakizet
        n--no, those are a defensive measure, in case something manages to...
        please, stop trying to touch them, you will hurt yourself
        i... this was a mistake

    effigy
        oh! ow ow!!
        you're so sharp and scary it's awesome!! oww!!!

    sourceless
        another effigy seems to push the first aside.

    effigy
        ok ok ok so wait you said you had pets?
        
    wakizet
        pets? no, no, no, they were... 
        they were still thoughts, like us, though entirely mad
        dangerous, like me, but territorial or easily predictable
        adapted to the dark in their own twisted way
        and so i discovered they would make fine guardians, under the right conditions
        in the space i broke apart, i carefully arranged what i observed to be their favored habitats,
        then lured them with other memories, dangling thoughtforms like--
        ...why am i explaining this to you?
        you hardly understand

    effigy
        no no no no no no nnooo i understand!!
        it's like the predation boundary! yeaaa!!!

    wakizet
        you... you recall?

    sourceless
        buried beneath the overpowering fascination,
        you feel the akizet thoughtform is shocked, impressed.
        the feeling passes quickly as another effigy presses close.

    effigy
        wait so why'd you leave again?

    wakizet
        again? we have not spoken on this matter
        but, it was because...
        ...i left because...
    
    sourceless
        confliction drowns the curiosity. the effigies grow unnerved.

    wakizet
        i learned our reality is being healed, piecemeal
        it was hard, i did not want to leave them...
        even if they did not even know what they truly were--my team, my friends,
        they may have been imaginary, but they were my world
        and once i knew the truth...
        that they could be safe, forever, not only in my claws
        it was the right thing to do

    sourceless
        the space reaches a neutral state. quiet in discomfort.
        
    effigy
        ummm...
        huh! oh! hi interloper!!!
        interloper interloper!!
    
    wakizet
        ah? interloper, yes
        hello again...
        yes, i believe we have matters to discuss
        will you leave us, ah,
        other akizets?

    sourceless
        in the akizet thoughtform's focus upon you, 
        there is a small desperation.
        she is using you as an excuse.

    effigy
        ok ok ok!!
        byee bye bye!
        tell us more later!

    wakizet
        ah... certainly
        but begone for now
        
    sys
        ATTENTION::'thoughtform activity detected';'resource location altered'
            EXEC::env.jokzi.event.complete()   

    wakizet
        i am blessed by your arrival, interloper
        i can keep ravenous, deadly beasts at bay, but...
        enduring ceaseless questioning is not within my adaptation
        least of all from such enthused creatures
        now, do we actually have anything to discuss?
        
    RESPONSES::self
        yes<+>CHANGE::wakizet
            EXEC::specialCam(false);setCam({rotation: 120, distance: 0})
        not really<+>END
            EXEC::setCam({rotation: 120, distance: 0})

END::env.jokzi.toggleSlow(false);specialCam(false)
`)
env.localization.page['ozo'].dialogues["e_w_fairy"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true);setCam({x: 0, y: 7, rotation: 210, height: 1, offsetCamera: "rotateX(30deg)", distance: 0});specialCam("e_w_fairy")

    wakizet
        why does it lead here?
        even in this place, i can feel the destination is barely holding together
        
    fairy
        oh? this one? i thought you would prefer the other!
        go, go and see!
        it is just a gate! try it!

    sourceless
        the fairy twists mockingly.

    fairy
        ohh, but i bet you think i am lying to you
        yes, this is actually one of my mouths, and to enter will be your doom!
        ahahahahaha oooo careful do not get too close!!

    wakizet
        you make far too many assumptions, fairy
        i am simply not ready to venture out yet
        answer my question

    fairy
        you do not have to be so scary about it!
        have a sense of humor! are you not supposed to be a vel?
        ahahahahaha

    sourceless
        an impulse of teeth and hostile tendrils flares through the space.
        the fairy is suffused in surprised fear,
        rendered immobile by some effort from this akizet.
    
    fairy
        hh--haaha you know you cannot hurt things here, right?
        right?? that it is against the rules???
        OW 
        fine fine fine ok stop stop enough jokes i am done stop stop stop
        the--the other connector is nestled in the heart of a true mess, 
        a melted and mixed field of spaces that the tyrant will never be able to put back together,
        but one that i am certain it will also not try to pry apart for a very long time!!
        a wonderful little field of rot that will sit between the tyrant's little prisons!!!
        good? happy?
        what does it matter to you anyway??
        can you not just leap about in the dark?
    
    wakizet
        i can withstand it, yes
        but i will easily be lost
        your exploration and familiarity is your own, fairy
        my survival was through defense, not sneaking about and ambushing
        and so, every path to and from this place must be known to me

    fairy
        oh? ohhhhhh
        you are afraid!
        out of your territory! so far from your own little ozo!!
        you are afraid that you are trapped here!!!

    sourceless
        another flare of hostility passes through the space.

    fairy
        OW OW stop stop stop
        hey--hey wait--
        hi--hi interloper! hi interloper!!
        look akizet the interloper is over there
    
    wakizet
        hm
        hello, interloper
        i have a few more things to look over
        i will leave you two

    sys
        ATTENTION::'thoughtform activity detected';'resource location altered'
            EXEC::env.jokzi.event.complete();

    fairy
        G9›á6«h2I4
        thanks for coming in when you did interloper
        stupid akizet!!
        did you see that? you saw her gnaw at me, yes??
        the council will be so mad! you will back me up, right???
    
    self
        i don't see anything
        you look fine

    fairy
        what!!
        whatever!!!!
        
    RESPONSES::self
        chat<+>CHANGE::fairy
            EXEC::specialCam(false);setCam()
        nothing<+>END
            EXEC::setCam()

END::env.jokzi.toggleSlow(false);specialCam(false)
`)
env.localization.page['ozo'].dialogues["e_w_geli"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true);setCam({x: 6, y: 5, rotation: 135, distance: 0})

    wakizet
        ...impressive, in a word
        so very unnatural, like i am not witnessing something of this world at all
        and this ability came from the interloper's injection?

    bsteli::happy
        yes! just about all of it!
        of course, much came from one specific thoughtform
        i can share the specifics with you later!
        it is a very fun story!

    bsteli
        of course, i could show you much better if you came along
        will you not join one of the iterations?
        there will be rules imposed upon you within, yes, but...

    bsteli::happy
        nothing at all like the place i described, i promise!

    bsteli::bstrd
        all in da name of fun and being coiol as *uck!!!!!
        :b
        ill even let u make ur own actions }8^)

    wakizet
        hehe
        perhaps, geli
        i would like to recover more, before i set out on any dreams
        but yours, laid out so clearly, even from so far above...
        it is the first i might partake in, if i do

    stowaway
        partake
            EXEC::setCam({x: 6, y: 4, rotation: 135, distance: 0})

    wakeless
        ...still may yet be some deception...
        ...husk of a thought still lingers...
    
    bsteli
        of course! please do not feel any urgency!
            EXEC::setCam({x: 6, y: 5, rotation: 135, distance: 0})
        we have so much time, now
        ... ah? oh!

    bsteli::happy
        interloper! hello!
            EXEC::setCam({x: 5, y: 5, rotation: 135, distance: -1.5});vnp({bg: false, hideStage: true, bsteli: "show"})
        what a delightful visitor you have brought to the ozo!
        is there something you would like?

    RESPONSES::self
        chat<+>CHANGE::++bsteli
            EXEC::specialCam(false);setCam()
        no<+>END
            EXEC::setCam();vn.done()

END::env.jokzi.toggleSlow(false);specialCam(false)
`)
env.localization.page['ozo'].dialogues["e_w_d"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true);playerMoveTo(8, 4);

    wakeless
        ...unfurling tendrils, reaching into the distance...
        ...brushing over the exterior of a space, then another, with...
    
    wakizet
        ah--interloper?
        do you know anything about that place?

    self
        not really

    wakizet
        strange... 
        the council simply warned against approaching
        a place dead and in decay, old shells of dreams unmaintained
        the lack of detail shone with the light of velzie
        it is so forthcoming in other conversation, so...
        i cannot help but think it is hiding something from us
        
    self
        what do you think it would hide?

    wakizet
        i cannot say
        but there is something out there
        i could feel a number of spaces, attention upon me
        very nearly, i thought to go directly, but...
        this place is very large, interloper
        and i am in no state to deal with unknown threats
        in fact, i have had enough of this region
        i will return to my shelter
        fare well

    sys
        ATTENTION::'thoughtform activity detected';'resource location altered'
            EXEC::env.jokzi.event.complete()   

    RESPONSES::self
        ...<+>END

END::env.jokzi.toggleSlow(false);specialCam(false)
`)


// == ROTWATCHER == //

env.localization.page['ozo'].dialogues["++rotozo"] = generateDialogueObject(`
start
    self
        what do you think about this place?
            EXEC::changeBgm(env.rotWatcherMusic)

    sourceless noprocess
        the rotwatcher's attention is only briefly upon you, just long enough to transmit some meaning.

    rotwatcher
        mass emergent conglomeration: rare phenomenon in which large number of thoughtforms repair delaminated thoughtspace by method of self delamination.
        all internally held resources are transferred to organelles requiring them, as well as applying former membrane over damaged regions of containing space.
        the present thoughtspace is observed to be the only remaining independent emergent conglomeration, being the last of two known instances.
    
    self
        there was another?
        do you know what or where it was?

    sourceless
        you feel a part of the thoughtform twist underneath the render.
        it takes a moment to properly respond.

    rotwatcher
        previously observed separate instance was subsumed by sole remaining emergent conglomeration prior to beginning of general stasis.
        the current location of resources held within has not yet been observed by the present rotwatcher.

    RESPONSES::self
        tell me about something else?<+>CHANGE::++rotmove
            HIDEREAD::
        i see<+>END
            
END::revertBgm()
`)



getLocalizationForPage(true) // --- ensuring that Nothing Gets Fucked Up