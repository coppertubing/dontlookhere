/*
    cor-RU - a full russian adaptation mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/city-surface.js
    adaptation for /local/city/street

    progress: e4a1 missing as of 03.10.2025
*/


env.localization.page['citystreet'] = {dialogues: {},
    definitions: {
        'оло': {"type": "УНАСЛЕДОВАННЫЙ КОНТЕКСТ", "text": `'близнецовое название для судов серое'` },
        'начистоту': {"type": "УНАСЛЕДОВАННЫЙ КОНТЕКСТ", "text": `'предельно честно'` },
        'θсеть': {"type": "УНАСЛЕДОВАННЫЙ КОНТЕКСТ", "text": `'используется вместо сероегласа';'упрощённый термин для светлых близнецов'`},
    },
    strings: {
        "pretty sure this envoy guy isn't being remembered right lmao": "лмао кажется этого челика-посла не так хорошо запомнили",
        "so akizet's assigned contact was a 'gordon'... i'm gonna see if i can track down who this was": "значит контактным лицом акизет был какой-то \"гордон\"... посмотрим, смогу ли я на него выйти", 
        "this must have been a meeting room once, cause i don't think we built ominous dark hallways to display secret stuff back then. that was a 2040 thing":"", // --- можете перевести
        "this is definitely looking like the old west coast HQ": "", // --- можете перевести
        "about the city": "о городе",

        "'skipping ahead...'": "'пропуск...'",
        

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

        "press": "нажать",

        "utilize": "использовать",

        "get water": "взять воды",
            'it is too far': "он слишком далеко",
            "i fetch a thin vessel from its repository, filling it with clear water": "я вынимаю тонкий сосуд из его хранилища и наполняю его прозрачной водой",
            "what a fascinating little mechanism": "какой удивительный механизм",
            "i am not certain what trouble he was having...": "мне не ясно, какие именно у него возникли проблемы...",
            "the mechanism was quite simple": "механизм был достаточно прост",
            "i have no need for more": "ещё больше мне не требуется",
        
        "taste": "попробовать",
            "i fear i may crush this flimsy thing, but it is worth a test": "меня страшит, что я случайно раздавлю эту хлипкую вещицу, однако попробовать не помешает",
            "it... yes, it is water": "это... да, это вода",

        // rotwatchery
        "what's that": "что это",
        "what's going on here": "что здесь происходит",
        "hello": "привет",



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
        /*cashier*/ "It's behind me...": "Оно за мной...",
        /*cashier*/ "Can you read?": "Вы умеете читать?",
        /*cashier*/ "Sorry... I didn't mean for that to sound mean...": "Простите... Я не хотела, чтобы это прозвучало грубо...",
        /*akizet*/ "i can, do not worry": "я умею, не волнуйтесь",                    

        /*akizet*/ "what do you recommend?": "что вы можете посоветовать?",
        /*envoy*/ "You like citrus, right?": "Вам нравятся цитрусы, верно?",
        /*envoy*/ "They have this orange coffee thing.": "У них есть этот кофе с апельсинами.",
        /*envoy*/ "You might like it!": "Вам могло бы понравиться!",

        /*akizet*/ "you do know that i--": "вы ведь знаете, что я--",
        /*envoy*/ "Go on, order something! Just give it a try.": "Ну же, закажите что-нибудь! Хотя бы попробуйте.",
        /*envoy*/ "I know you don't exactly have the same needs we do...": "Я знаю, у Вас нет точно тех же потребностей, что у нас...",
        /*envoy*/ "But you can simulate taste, right?": "Но вы способны симулировать вкус, верно?",
        /*envoy*/ "Getting out here, with the people, acting like we do?": "Выбираться куда-нибудь в люди, вести себя как мы?",
        /*envoy*/ "It makes a difference. Helps lessen the tension.": "Это имеет значение. Помогает ослабить напряжение.",

        /*akizet*/ "i will have the orange": "апельсин, пожалуйста",
        /*cashier*/ "The...": "Апель...",
        /*cashier*/ "Oh, yeah! OK!": "Ах, ага! Да!",
        /*cashier*/ "Espresso macchiato and an orange coffee... That'll bõXÖf±ÔVã5Öf±Ô": "Эспрессо макиато и апельсиновый кофе... Это будет стоить бõXÖф±ÔЪã5Öф±Ô",
        /*envoy*/ "I got you covered, Akizet.": "Счёт на мне, Акизет.", 
        /*sourceless*/ "THEY EXCHANGE PAYMENT. THE ATTENDANT LEAVES TO BEGIN PRODUCTION OF THE BEVERAGES.": "ОНИ ОБМЕНИВАЮТСЯ ПЛАТЕЖОМ. СОТРУДНИЦА УДАЛЯЕТСЯ, ЧТОБЫ НАЧАТЬ ПРОИЗВОДСТВО НАПИТКОВ.",
        /*cashier*/ "Just wait a minute and we'll have those ready.": "Одну минутку, пожалуйста, сейчас будет готово.",
        /*sourceless*/ "I WISH I COULD PRY THESE MACHINES OPEN AND WATCH THEM WORK...": "КАК ЖЕ ХОЧЕТСЯ ВСКРЫТЬ ЭТИ МАШИНЫ И УВИДЕТЬ, КАК ОНИ РАБОТАЮТ...",
        /*sourceless*/ "THEIR MANIPULATION OF LIGHTNING IS TRULY REMARKABLE": "ИХ УМЕНИЕ УПРАВЛЯТЬ МОЛНИЕЙ ВЗАПРАВДУ ПОРАЖАЕТ",
        /*sourceless*/ "SOME MOMENTS PASS, AND THE ATTENDANT RETURNS WITH TWO FLIMSY ORGANIC CUPS": "ПРОХОДИТ НЕСКОЛЬКО МГНОВЕНИЙ, И СОТРУДНИЦА ВОЗВРАЩАЕТСЯ С ДВУМЯ ХЛИПКИМИ ОРГАНИЧЕСКИМИ СТАКАНЧИКАМИ",
        /*envoy*/ "Hey, thanks. You have a good day.": "Ага, благодарю. Хорошего Вам дня.",
        /*cashier*/ "Thanks!! You too!!": "Спасибо!! И вам!!",
        /*sourceless*/ "I SIP AT THE OPENING IN THE CUP. THE TASTE IS... EXOTIC. UNEXPECTED. TRULY, TERRIBLE. I SMILE AT THE ATTENDANT.": "Я ПЬЮ ЧЕРЕЗ ОТВЕРСТИЕ В СТАКАНЕ. ВКУС... ЭКЗОТИЧЕСКИЙ. НЕОЖИДАННЫЙ. ПОИСТИНЕ УЖАСНЫЙ. Я УЛЫБАЮСЬ СОТРУДНИЦЕ.",
        /*sourceless*/ "THE CITRUS SAVES IT. BUT I WOULD HAVE PREFERRED A SIMPLE CUP OF THEIR ORANGED JUICE": "ЦИТРУС КОЕ-КАК СПАСАЕТ НАПИТОК. НО Я БЫ ПРЕДПОЧЛА ОБЫЧНЫЙ СТАКАН ИХ АПЕЛЬСИНОВОГО СОКА",
        /*envoy*/ "Pretty good, right?": "Недурно, а?", 
        /*akizet*/ "it will do": "сойдёт",
        /*envoy*/ "Great! Let's head down to the office.": "Отлично! Теперь давайте пройдём в офис.",
        /*envoy*/ "I heard you have some news about the call?": "Я слышал, у вас есть новости по поводу зова?",
        /*akizet*/ "oh yes, but... let us talk of it in private": "а, да, но... давайте обсудим это наедине",


        /*envoy*/ "wwEL LL isn' t t that peculiar ? ?": "чттОЖ ЖЖ ра ззв е е эт оне занн ят т нно ? ?",
        /*envoy*/ "elerv ator isn torking": "литф н еработает",
        /*envoy*/ "gu ess w e can    t t al k never talk": "пола гга ю мы може м пого гово ор и т ть никогда не поговорить",
        /*envoy*/ "no talking so rry sorry sorry leave ovfice": "не поговрим про сти прости прости те покиньте овфис",
        
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
        /*envoy*/ "They always act up during the season of fruit.": "Она постоянно возвращается в сезон плодов.", 

        /*slim streetwalker*/ "tto oo  fa r   ,go ne": "зза ш ёл  сл и ом    ,але ко",

        /*cloaked streetwalker*/ "What? Sorry, I can't go with you, I have a meeting at nine.'": "Что? Простите, я не могу пойти с вами, у меня назначена встреча в девять.",
        /*cloaked streetwalker*/ "Wish I could, though--sounds like fun!": "Впрочем, хотелось бы--звучит весело!",
        /*sourceless*/ "is he speaking through his communicator?": "он через свой коммуникатор разговаривает?",
        /*sourceless*/ "why was he looking at me when he said that?": "почему он на меня смотрел, пока это говорил?",

        /*stre wal k*/ "hurts": "больно",

        /*television*/ "...heavier storms are inbound...advisory remains in effect...": "...ожидается усиление шторма...рекомендации остаются в силе...", // <3
        
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


        "cashier": cor_ru.entity_menu["cashier"].name,
        "envoy": cor_ru.entity_menu["envoy"].name,
        "menu": cor_ru.entity_menu["menu"].name,
        "slim streetwalker": cor_ru.entity_menu["slim streetwalker"].name,
        "cloaked streetwalker": cor_ru.entity_menu["cloaked streetwalker"].name,
        "stre wal k": cor_ru.entity_menu["stre wal k"].name,
        "electric face box": cor_ru.entity_menu["electric face box"].name,
        "beautiful parasite": cor_ru.entity_menu["beautiful parasite"].name,
        "the room high up": cor_ru.entity_menu["the room high up"].name,
        'the roothe room hithe room gh u the roomp': 'ко ком ата выкомн ат сокомнаве рх о вер ху',
        "vehicle stream crossing mechanism": cor_ru.entity_menu["vehicle stream crossing mechanism"].name,
        "elevator buttons": cor_ru.entity_menu["elevator buttons"].name,
        "water cooler": cor_ru.entity_menu["water cooler"].name,
        "frightfully fragile vessel": cor_ru.entity_menu["frightfully fragile vessel"].name,

        "•Œë÷Ž†": "•Ԫë÷Ҙ†", // careful. little shit is in the better times too
        'Þª†#¦¦¤‡?…—?': "Ҧʸ†#¦¦¤‡?…—?",
        'Þª†#¦¦ìnÑ–R': "Ҧʸ†#¦¦ẞӈӲ–Ри", //beneath
        'Þª†#¦¦§†A·r»': "Ҧʸ†#¦¦§†вЕз́·ԭа̄" //orbit
    },
    entityDescriptions: {
        "cashier": cor_ru.entity_menu["cashier"].desc,
        "envoy": cor_ru.entity_menu["envoy"].desc,
        "menu": cor_ru.entity_menu["menu"].desc,
        "slim streetwalker": cor_ru.entity_menu["slim streetwalker"].desc,
        "cloaked streetwalker": cor_ru.entity_menu["cloaked streetwalker"].desc,
        "stre wal k": cor_ru.entity_menu["stre wal k"].desc,
        "electric face box": cor_ru.entity_menu["electric face box"].desc,
        "beautiful parasite": cor_ru.entity_menu["beautiful parasite"].desc,
        "the room high up": cor_ru.entity_menu["the room high up"].desc,
        'the roothe room hithe room gh u the roomp': `::ЭМПИРИЧЕСКАЯ МЫСЛЕФОРМА
    ::НЕВИЗУАЛИЗИРУЕМА
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'пункт назначения превышает порог бессвязности';'рекомендуется починка'">::ЗАПРЕДЕЛЬНАЯ БЕССВЯЗНОСТЬ</span>
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'молчи молчи молчи молчи молчи молчи молчи'</span>`,
        "vehicle stream crossing mechanism": cor_ru.entity_menu["vehicle stream crossing mechanism"].desc,
        "elevator buttons": cor_ru.entity_menu["elevator buttons"].desc,
        "water cooler": cor_ru.entity_menu["water cooler"].desc,
        "frightfully fragile vessel": cor_ru.entity_menu["frightfully fragile vessel"].desc,

        "•Œë÷Ž†": `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'`,
        'Þª†#¦¦¤‡?…—?': `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА
    ::<span definition="ПРИМЕЧАНИЕ::'нестандартный формат';'подразумевает соединительную мыслеформу';'попытка интерпретации'">НЕОБЫЧНАЯ ПОДПИСЬ</span>
    ::ПУНКТ НАЗНАЧЕНИЯ::ОШИБКА::'необрабатываемая сущность'::НЕВИЗУАЛИЗИРУЕМА<span style="color: var(--obesk-color)" definition="АНАЛИЗ::'пункт назначения превышает порог бессвязности';'рекомендуется починка'">::ЗАПРЕДЕЛЬНАЯ БЕССВЯЗНОСТЬ</span>`,
        'Þª†#¦¦ìnÑ–R': `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА
    ::<span definition="ПРИМЕЧАНИЕ::'нестандартный формат';'подразумевает соединительную мыслеформу';'попытка интерпретации'">НЕОБЫЧНАЯ ПОДПИСЬ</span>`, //beneath
        'Þª†#¦¦§†A·r»': `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА
    ::<span definition="ПРИМЕЧАНИЕ::'нестандартный формат';'подразумевает соединительную мыслеформу';'попытка интерпретации'">НЕОБЫЧНАЯ ПОДПИСЬ</span>`, //orbit
    }  
}


// === DIALOGUES === //


// == MOTH == //
env.localization.page['citystreet'].dialogues.mthstreetresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        где это было?<+>where
        не могу дальше?<+>elevatorblock
            SHOWIF::[['interview1__firstchat-behonest', false], ['citystreet_triedchat', true]]
        the slide room?<+>dataroom
            SHOWIF::['dataroom', true]

        неважно<+>CHANGE::++moth
            FAKEEND::(назад)
`)
env.localization.page['citystreet'].dialogues["mth++citystreet"] = generateDialogueObject(`
start
    self
        у меня есть вопрос об этой мыслеформе

    moth
        смотрю на вывод, чё как?
    
    RESPOBJ::mthstreetresp

where
    self
        где бы это могло быть?
    
    moth
        ну я не думаю что на земле существует хоть одна улица которая выглядит вот так лол
        но вообще, она же была одним из тех разъездных дипломатов в те времена когда их ещё рассылали
        хз как новая зеландия тогда выглядела, но я знаю что у бюро был там офис
            SHOWIF::["citystreet__envoy-talkpeople", false]
        так что мб это бессвязное пространственное воспоминание о том месте
            SHOWIF::["citystreet__envoy-talkpeople", false]
        гордон упомянул что это где-то "в штатах"... так что наверно США
            SHOWIF::["citystreet__envoy-talkpeople", true]
        возможно где-то на западном побережье? там старая штаб-квартира находилась
            SHOWIF::["citystreet__envoy-talkpeople", true]

    RESPOBJ::mthstreetresp

elevatorblock
    self
        у меня не получается зайти в лифт...
    
    moth
        эт странно
        хотелось бы сказать что это бессвязность, но факт того что личность посла в остальном цела...
        кажись что-то ещё вносит изменения--твой мыслекол даже доложил что данные были удалены
        ну похоже с этим не повезло. но вообще и в других местах есть на что посмотреть

    RESPOBJ::mthstreetresp

dataroom
    self
        What are those slides about?
    
    moth
        you can't read them on your end either, huh
        well i guess the FBX really opened up to akizet, because that looked like some pretty serious info
        not the kind of presentation you'd give a visiting official, you wouldn't give them technical details
        but just from what i can make out, uh...
        oh man, we used to put the FBX motto everywhere
        anyway, a couple of those slides have satellite photography of the embassy, and the contrivance anchor on the moon...
        alongside some maps, probably about the polygonation spires or the call's location...
        some signals intelligence stuff, that's probably us trying to detect the call
        there's a few really interesting structural analyses of obesk tech, too

    self
        Why would we show Akizet that?
        Isn't that kind of revealing?

    moth
        not really, i mean, the obesk knew we were studying them
        before they made contact, we even sent some drones to take samples of the embassy
        which obviously didn't work at all lol
        maybe they were doing their own analyses with akizet's help, to get people up to speed
        obviously they were working on hybrid tech, so everyone involved would need a pretty thorough understanding
        speaking of, there's a couple of human-looking schematics in there
        god i wish akizet's memories were like
        higher resolution

____SHOWIF::"2040thing"
    self
        ok also what did you mean by 2040 thing

    moth
        that was a joke dude
        kinda...
        i mean that <em>is</em> when dark brutalism became a thing
        but yeah i was kidding
        we don't have any ominous dark hallways full of secret info
        although...
        there <em>is</em> the one...
        but i can't tell you about that.
____END

    RESPOBJ::mthresp
`)


// == ROTWATCHER == //

env.localization.page['citystreet'].dialogues["rotmeet"] = generateDialogueObject(`
start
    sourceless
        this thoughtform lingers over a malformed one.
            EXEC::changeBgm(env.rotWatcherMusic)
        its representation in the render is still, yet you feel it moving beneath the surface.
        prodding at the damaged entity below it, somehow.

    self
        hello?

    sourceless
        its movement slowly ceases. you feel its attention upon you.
        something presses against your mind's eye, and while concepts manifest as thoughts,
        it feels like they aren't truly intended for you.
    
    rotwatcher
        the audience: external force, alien to the grand stage. it has been observed for the first time recently.
        no attempt using any known method of communication has succeeded in gaining the attention of the audience.
        it is suspected to lack requisite sensory organs, precluding perception beyond standard coherent thoughtform presentation.
        this marks the first occasion in which the audience has succeeded in communicating. the mechanism by which it has changed is unknown.

    self
        are you talking about me?
        what are you?
    
    sourceless
        the thing draws closer to your mind's eye.
        its attention pulls into itself.

    rotwatcher
        rotwatcher: formerly predatory thoughtform, presenting emergent lucidity and cognitive function. self-assigned nomenclature predicated upon lost progenitor's knowledge.
        suspected to be product of direct damage to purpose enforcement within delaminated spatial thoughtspace, followed by mutation and mindless survival of undetermined duration.
        it is observed to wander, internally cataloguing forms of deterioration and their products without interference.

    moth
        that's... 
        kind of useful?

    self
        i guess
    
    sourceless noprocess
        you focus upon the rotwatcher.
    
    self
        why do you do this?
        can you tell me more?
    
    sourceless
        it returns to examining the damaged thoughtform without answering.
    
    RESPONSES::self
        what about that thoughtform?<+>CHANGE::++rotcity
        whatever<+>END
            
END::revertBgm()
`)
env.localization.page['citystreet'].dialogues["++rotcity"] = generateDialogueObject(`
start
    self
        what's up with this thoughtform?
            EXEC::changeBgm(env.rotWatcherMusic)

    sourceless noprocess
        the rotwatcher's attention is only briefly upon you, just long enough to transmit some meaning.

    rotwatcher
        referentially sustained deterioration: common condition within damaged lesser thoughtforms.
        critically damaged thoughtforms may continue existence with minimal remaining material, due to the physical referential tie made by their containing thoughtspace.
        sustained connection allows thoughtspace organelles to provide resources and support unconditionally.
        a significant number of damaged thoughtforms may be sustained by one thoughtspace, however it is a large strain that often results in catastrophic thoughtspace delamination.
        this is a common trajectory and outcome that has been observed in large quantity throughout the deterioration of the grand stage.
        however: the custodian's recent decision to dissociate most damaged thoughtforms has reduced its frequency.

    RESPONSES::self
        tell me about something else?<+>CHANGE::++rotmove
            HIDEREAD::
        ok<+>END

END::revertBgm()
`)
env.localization.page['citystreet'].dialogues["++rotcityflip"] = generateDialogueObject(`
start
    self
        what's going on here?

    sourceless noprocess
        the rotwatcher's attention is only briefly upon you, just long enough to transmit some meaning.

    rotwatcher
        spatial delamination gradient: early stage of thoughtspace breakdown by consequence of malnutrition. common in regions of densely packed memories.
        membrane of containing thoughtspace is observed to thin and melt. points of exit and entry become indistinguishable from adjacent connective media.
        previously recorded instances suggest presently observed thoughtspace's trajectory to be regional conglomeration.

    sourceless
        you feel a part of the thoughtform twist underneath the render.

    rotwatcher
        regional conglomeration: blending of multiple adjacent thoughtspaces in middle or late stages of spatial delamination.
        resulting organism combines organelles and remaining outer membrane material for continued survival.
        it is presently unknown whether this function is a survival mechanism inherent to the thoughtspace classification of thoughtform or the result of an emergent sentience similar to independent thoughtform awakening.
        further study is required. however: the arrival and abundance of external resources combined with the custodian's resumation of activity has slowed all known instances of early stage regional conglomeration, including present thoughtspace.
        likelihood of further opportunity to study phenomena is extremely low without direct intervention. direct intervention is inadvisable for continued observation of the grand stage's recovery.

    RESPONSES::self
        tell me about something else?<+>CHANGE::++rotmove
            HIDEREAD::
        ok<+>END
`)


// == ENVOY  == //

env.localization.page['citystreet'].dialogues.envoyStreetResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        поговорить с людьми?<+>talkpeople
            
        кафе?<+>cafe

        цветочный ларёк?<+>flowers
            SHOWIF::"ENV!!ep2"

        давайте пойдём дальше<+>END
`)
env.localization.page['citystreet'].dialogues["envoy"] = generateDialogueObject(`
start
    sourceless
        Я ОСТАНАВЛИВАЮСЬ, И ПОСОЛ ТОЖЕ. МЫ ОБМЕНИВАЕМСЯ ВЗГЛЯДАМИ
        
    akizet
        я ценю ваше дозволение, гордон
            SHOWONCE::
        я понимаю, что здесь до сих пор держится некоторый страх...
            SHOWONCE::
        особенно в таких многолюдных местах.
            SHOWONCE::
        
    envoy
        Эй, без проблем. И не беспокойтесь об этом, здесь большинство отнесётся к Вам нормально.
            SHOWONCE::
        Будь это Чикаго, или Нью-Йорк, или что ещё, мы бы Вас на крышу приземлили, но...
            SHOWONCE::
        В последнее время бюро очень загружено, и у нас было так много обесков-гостей,
            SHOWONCE::
        Что теперь Ваш народ считай что часть города.
            SHOWONCE::
    
    sourceless
        ОН ДОСТАЁТ МЕТАЛЛИЧЕСКИЙ КОММУНИКАТОР ИЗ ПОЛОСТИ В СВОЕЙ КОЖАНОЙ НАКИДКЕ И ИЗУЧАЕТ ЕГО СВЕЧЕНИЕ
            SHOWONCE::

    envoy
        И, честно говоря, это способствует общественному имиджу. Видеть вас здесь, среди людей...
            SHOWONCE::
        Помогает придушить ту грёбаную вирусную панику.
            SHOWONCE::
    
    akizet
        ах, я не учла этот элемент
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
        Есть одно небольшое место неподалёку - кафе. Перед тем, как продолжить, почему бы нам не заглянуть в него?
            SHOWONCE::
        Просто пойдёмте вперёд, оно сразу после бюро.
            SHOWONCE::
    
    RESPOBJ::envoyStreetResponses
    
talkpeople
    akizet
        ничего, если я повзаимодействую с вашими прохожими?
    
    envoy
        Вовсе нет! Всё в порядке, пока я рядом.
        Как я и говорил - это, пожалуй, наиболее дружелюбный к обескам город в штатах.
        В худшем случае Вы наткнётесь на парочку угрюмых взглядов. Вряд ли вирусные конспирологи все разом пропали.
    
    akizet
        я вижу!
    
    RESPOBJ::envoyStreetResponses

cafe
    akizet
        где находится "кафе"?
    
    envoy
        Совсем рядом. Просто идите вниз по улице, к ˜/ŒôФªœДЪ/д 0E@яркой жёлтой двери.
    
    RESPOBJ::envoyStreetResponses

flowers
    akizet
        я припоминаю, когда-то вы говорили о "цветочном ларьке"...
        где это?
    
    envoy
        Уже довольно поздно, Акизет, я даже не уверен, открыт ли он...
        Но просто следуйте прямо по улице, он должен быть сразу за углом.
    
    RESPOBJ::envoyStreetResponses
`)


// == STREETWALKERS == //

env.localization.page['citystreet'].dialogues["walker1"] = generateDialogueObject(`
start
    sourceless
        Я ВСТРЕЧАЮСЬ ВЗГЛЯДОМ СО СВЕТЛЫМ БЛИЗНЕЦОМ, НАПРАВЛЯЮЩИМ НА МЕНЯ ЗАПОМИНАЮЩУЮ КОРОБОЧКУ
        ОН ЯВНО НЕ ЗНАЕТ, КАК ОТВЕТИТЬ, ПОЭТОМУ Я ПРОСТО СМЕЮСЬ И МАШУ РЕЦЕПТОРОМ ЕЁ ГЛАЗУ
    
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
`)
env.localization.page['citystreet'].dialogues["walker1followup"] = generateDialogueObject(`
start
    stre wal k
        больно
            EXEC::page.bgm.rate(0.5);content.classList.add('incoherent')
    
    RESPONSES::self
        я не могу тебе помочь<+>END
            EXEC::page.bgm.rate(0.9);content.classList.remove('incoherent')
`)

env.localization.page['citystreet'].dialogues["walker3"] = generateDialogueObject(`
start
    sourceless
        Я ОСТАНАВЛИВАЮСЬ ВОЗЛЕ ВХОДА В БЮРО, ЧТОБЫ РАССМОТРЕТЬ СВЕТЛОГО БЛИЗНЕЦА, ОДЕТОГО, КАК ПОСОЛ
        ОН РАЗГОВАРИВАЕТ В МАЛЕНЬКИЙ КОРОБЧАТЫЙ КОММУНИКАТОР, ПРИЖАВ К ЕГО ЛИЦУ И НЕ ЗАМЕЧАЯ НАС

    cloaked streetwalker
        ...не сдвинулось с мёртвой точки, так что это было всё равно, что смотреть, как краска сохнет на стене. Невыносимо просто.
        В общем, мне пришлось взять ещё больше кофе, иначе я бы точно храпу дал...
    
    sourceless
        то, как они через них разговаривают, всегда выглядит так глупо
        КАКИМ ЖЕ ОБРАЗОМ ИХ СЛОВА ОБРАЩАЮТСЯ МОЛНИЕЙ?
        ПОСОЛ НАКЛОНЯЕТСЯ ПОБЛИЖЕ, ЧТОБЫ УЗНАТЬ, ПОЧЕМУ Я ОСТАНОВИЛАСЬ, И СЛЕДУЕТ МОЕМУ ВЗГЛЯДУ
        ОН ГОВОРИТ НЕГРОМКО, ОПАСАЯСЬ ПРИВЛЕЧЬ ВНИМАНИЕ ПРОХОЖЕГО В ПЛАЩЕ
    
    envoy
        Что такое?
        Вы знакомы с Оливером?

    akizet
        хмм...
        нет, я всего лишь заворожена вашими средствами связи
        говорить так громко, без единой остановки, сулило бы верную смерть на моей прежней должности 
    
    envoy
        Вы работали на поверхности, верно?
    
    akizet
        да, время от времени! до того, как--
    
    sourceless
        ПРОХОЖИЙ В ПЛАЩЕ ЗАХЛОПЫВАЕТ СВОЙ КОММУНИКАТОР И ОГЛЯДЫВАЕТСЯ, ТУТ ЖЕ ЗАМЕЧАЯ НАС
        ОН ШИРОКО УЛЫБАЕТСЯ И ЖЕСТОМ ПРИГЛАШАЕТ НАС ПОДОЙТИ БЛИЖЕ

    cloaked streetwalker
        Эй! Гордон! Кто это?
            EXEC::body.classList.add('zoom')
        Дай-ка угадаю, инициатива по обмену?
    
    envoy
        Вообще-то, Оливер, это Акизетеше! Инициатива "Сигнал".

    cloaked streetwalker
        Ахереть! Не знал, что тебя на это назначили.
        Рад встрече, Акизетеше!

    sourceless
        Я НАКЛОНЯЮ СВОЮ ГОЛОВУ, ПОЧТИТЕЛЬНО ЗАГИБАЯ РЕЦЕПТОРЫ НАЗАД.
    
    akizet
        точно так же и я, оливер, мой друг
        можете звать меня акизет

    cloaked streetwalker
        Без б, Акизет.
        И, эй, я бы даже рад поболтать, да только вот я заступаю на дежурство около десяти. 

    envoy
        Всё в порядке, Оливер. Нам тоже пора бы заняться делами.
        Увидимся.
    
    RESPONSES::akizet
        простимся<+>END
            EXEC::body.classList.remove('zoom')
`)


// == IN CAFE == //

env.localization.page['citystreet'].dialogues["cafemenu"] = generateDialogueObject(`
start
    sourceless
        ЭТО - ИХ МЕНЮ?
        НЕВЕРОЯТНО...
        ЕГО ПРАКТИЧЕСКИ НЕВОЗМОЖНО РАЗОБРАТЬ
        Я РАЗЛИЧАЮ "АПЕЛЬСИН" - БЫТЬ МОЖЕТ, ЦИТРУСОВЫЙ НАПИТОК?
        СВЕТЛЫЕ БЛИЗНЕЦЫ НАСТОЛЬКО ИЗОБИЛУЮТ ЦИТРУСОВЫМИ КИСЛОТАМИ, ЧТО ПРОИЗВОДЯТ ИЗ НИХ НЕБОЛЬШИЕ НАПИТКИ...
        РАЗВЕ НЕ БЛАГОДАТЬ?
        Я ПРИКАЗЫВАЮ СВОЕМУ РТУ СКОНСТРУИРОВАТЬ ЭКВИВАЛЕНТЫ ВКУСОВЫХ РЕЦЕПТОРОВ. ПРОШЛО СТОЛЬКО ВРЕМЕНИ!
            EXEC::change('citystreet_orangecoffee', true)
    
    RESPONSES::akizet
        изумительно<+>END
`)

env.localization.page['citystreet'].dialogues.tvresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        смотреть<+>EXEC::env.citystreet.tvrand()
            HIDEREAD::
        прекратить смотреть<+>END
            EXEC::revertBgm()
`)
env.localization.page['citystreet'].dialogues["television"] = generateDialogueObject(`
start
    sourceless
        НАД ГОЛОВОЮ КАССИРА НАХОДИТСЯ ОДНА ИЗ БЛИЗНЕЦОВЫХ ЭЛЕКТРИЧЕСКИХ КОРОБОК
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
        СВЕТЛЫЙ БЛИЗНЕЦ РАБОТАЕТ СО ВСПУЧЕННОЮ МЯСИСТОЮ МАССОЮ
        ВЕРОЯТНО, ОНА БЫЛА ОБЖАРЕНА, О ЧЁМ СВИДЕТЕЛЬСТВУЕТ ТЕКСТУРА ЕЁ КОЖИ
        ОН ПРЕПОДНОСИТ ЕЁ ДРУГОМУ БЛИЗНЕЦУ С ОЧЕНЬ ШИРОКИМИ ГЛАЗАМИ

    television
        ...Вы только посмотрите на эту курицу!
        Посмотрите на корочку. Смотрите, какая красота.
        Но чем же именно отличается быстрая жарка? Давайте пройдём сюда...
        Это — цыплёнок-гриль без специй, Вы можете видеть...

    sourceless
        МОЁ ВНИМАНИЕ К ЕГО РАЗЪЯСНЕНИЯМ РАССЕИВАЕТСЯ, КОГДА ОН СРАВНИВАЕТ ЕЁ С ДРУГОЮ МАССОЮ ПЛОТИ
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
        Живая трансляция из Нью-Йорка для наших международных зрителей,
        Доброе утро, доброе утро всем вам, мы снова с...

    sourceless
        ПРОЕКЦИЯ ДЕЛИТСЯ ПОПОЛАМ И ТЕПЕРЬ ДВА БЛИЗНЕЦА СИДЯТ НАПРОТИВ ДРУГ ДРУГА В МАЛЕНЬКИХ СМЕШНЫХ КОРОБОЧКАХ
        Я ПЫТАЮСЬ РАЗОБРАТЬ ТЕКСТ И СТРОКИ, ПОЯВЛЯЮЩИЕСЯ ВОЗЛЕ НИХ...
        СИМВОЛ ВАЛЮТЫ ГОСУДАРСТВА ПОСЛА ОТОБРАЖАЕТСЯ НА ВИДНОМ МЕСТЕ
        О, О ЧЁМ ОНИ ГОВОРЯТ СЕЙ θмиг?

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
        ОН ИЗДАЁТ СТРАННЫЙ ЗВУК НОСОМ, ПОСЛЕ ЧЕГО ТРЯСЁТ ГОЛОВОЮ
    
    envoy
        Чушь полная. Не забивайте себе голову.

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
        они пр енеб рег ли    просьбо ю
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
        НО В ЭТОТ РАЗ ПАРА СВЕТЛЫХ БЛИЗНЕЦОВ СИДИТ ЗА СТОЛОМ, ОДИН ИЗ НИХ РАЗГОВАРИВАЕТ СО МНОЮ
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
        ОН ЧТО, СМЕНИЛ ИХ ДЛЯ ПОЯВЛЕНИЯ В НОВОСТЯХ?

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
        ХОТЯ Я ПОДОЗРЕВАЮ, ЧТО ЭТО ЛИШЬ ВСТУПЛЕНИЕ К ТОЙ ТЕМЕ, ЗА КОТОРОЮ ОН ПРИШЕЛ ВЫСТУПАТЬ
        В ЛЮБОМ СЛУЧАЕ, У МЕНЯ НЕТ ЖЕЛАНИЯ СЛУШАТЬ, КАК ОН ПЕРЕСКАЗЫВАЕТ ОПРЕДЕЛЕНИЕ С КОЛЛЕКТИВА

    RESPOBJ::tvresp
`)


// == EP1 END == //

env.localization.page['citystreet'].dialogues["envoychat"] = generateDialogueObject(`
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
            EXEC::cutscene(true);page.formedDefinitionStrings = undefined;setTimeout(()=>{sendDialogue(env.currentDialogue.chain['syscheck']);cutscene(false);}, 1000)

    sourceless
        МЫ С ПОСЛОМ СТУПАЕМ В ТУСКЛУЮ КОМНАТУ ДЛЯ ПЕРЕГОВОРОВ, ГДЕ ЗАДЁРНУТЫЕ ШТОРЫ ВЫРАЖАЮТ ЛЮБЕЗНОЕ ПРИЗНАНИЕ НАШИХ ПРЕДПОЧТЕНИЙ
            EXEC::change("PAGE!!skipcheck", false)
        МЫ САДИМСЯ. ОН СТАВИТ МЕТАЛЛИЧЕСКУЮ КОРОБКУ НА СТОЛ. МОИ РЕЦЕПТОРЫ ЗАВИТЫ В СПИРАЛИ. БУДЕТ ТРУДНО
        
    envoy
        Итак, Акизет, что Вы нашли? Мы довольно-таки давно не разговаривали лично.
    
    akizet
        да, прошло немало времени! я была поглощена нашею работою, видите ли
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
        Что она говорит?
        ...И как Ваша команда пришла к этому?
        Разве вы не слушаете её уже на протяжении... скольки, тридцати двух лет? 
    
    akizet
        ваш ответ прост, гордон:
        сообщение ещё не закончено. но, наконец, оно совпало с достаточным количеством паттернов, чтобы мы могли подтвердить его метод
        ему понадобилось всё это время чтобы достичь того, что мы считаем...
        хмм...
        быть может, половиною его полной длины,
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
        устойчивые паттерны сырой мысли возникают на равных отрезках длины сообщения
        
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
        Что же. Да, это определённо что-то новенькое. Теперь я понимаю, для чего Вам вся эта приватность в этот раз.
        Кто ещё знает об этом?
    
    akizet
        никто за пределами моей команды. мы все пока держим эту информацию при себе.
        это эгоистично... но наши инициативы по торговле и исследованиям так удачно складываются с вашим народом
        мы не хотим помешать им этою новостью.
        однако мы, моя команда, мы растеряны--мы должны ждать, 
        мы должны ждать ещё очень долго с этим камнем на душе.
    
    sourceless
        ПОСОЛ ГРОМКО ВЫДЫХАЕТ И СЦЕПЛЯЕТ РУКИ.

    envoy
        Хорошо, вот что я предлагаю.
        Мне нужно поговорить с несколькими людьми. Мы будем держать эту информацию в конфиденциальности. Внутри, с бюро.
        Вы же не считаете, что эта вещь может представлять угрозу?
    
    sourceless
        Я ПОСМЕИВАЮСЬ
    
    akizet
        она кричит вот уже тридцать второй год по вашему времени, 
        и ей необходимо продолжать это на ещё большем протяжении перед тем, как мы сможем различить в ней хоть какой-то смысл.
        я не думаю, что она планирует заниматься какой-либо другою деятельностью в это время
    
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
        МЫ ОБА ВСТАЁМ. Я ЧУВСТВУЮ, КАК ТЯЖЕСТЬ МОЕЙ ТРЕВОГИ ОСЕДАЕТ И НА ЕГО ПЛЕЧАХ
    
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
        СЕЙ θмиг УДАЧНЫЙ - ДА, СЛОВНО ЭТО ВСЕГО ЛИШЬ ЗАПОЗДАЛАЯ МЫСЛЬ
        КАК ТОЛЬКО Я СОБИРАЮСЬ ЗАГОВОРИТЬ, ОН ПОВОРАЧИВАЕТСЯ КО МНЕ, НЕДОУМЕВАЮЩИЙ

    envoy
        Эй, Акизет, 
        Почему Вы не захотели поговорить на Вашем судне?
        Я мог бы встретить Вас в поле или вроде того.
    
    sourceless
        Я ПОДАВЛЯЮ ВОСТОРЖЕННЫЕ ЗАВИТКИ В СВОИХ РЕЦЕПТОРАХ
        ДА--ЭТО ИДЕАЛЬНАЯ ПОДВОДКА! МОЛОДЕЦ, ПОСОЛ
        Я ВЕДУ СЕБЯ НЕСКОЛЬКО ОЗАДАЧЕННО... ДА, ОНО ПРОСТО ПРИДЁТ МНЕ В ГОЛОВУ!

    akizet
        хмм...
        о! да!
        я была так взволнована доставкою новостей...
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
        И это просто валялось где попало?
        Погодите-ка.

    sourceless
        ПОСОЛ ТЯНЕТСЯ К СВЕТЯЩЕЙСЯ ПАНЕЛИ ПЛАТФОРМЫ
        И НАЖАТИЕМ КНОПКИ ВЕЛИТ ЕЙ ОСТАНОВИТЬСЯ
        Я ВИЖУ, КАК ЕГО ГЛАЗА ВНЕЗАПНО МЕТАЮТСЯ ПО УГЛАМ МАЛЕНЬКОЙ КОМНАТЫ
        НО ЗАТЕМ ОН НАЧИНАЕТ ГОВОРИТЬ--ОЧЕНЬ ТИХО
    
    envoy
        Если начистоту--э, это значит "предельно честно"--
        Говорят, что тех. часть довольно суховата.
        Ваш технический отдел не особо желает сотрудничать с нами.
        ...Не будет ли у Вас из-за этого неприятностей?
    
    funfriend
        БОЛЬШЕ ЧЕМ ОН СЕБЕ ПРЕДСТАВИТЬ МОЖЕТ! АХАХА
    
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
        Кто-то вызывает лифт на цокольном этаже. У нас примерно минута.
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
        простимся, гордон

    sys
        ВНИМАНИЕ::'окончен поток памяти';'визуализация прервана'
            SHOWIF::["embassy_d2_complete", false]
    
    RESPONSES::self
        завершить вспоминание<+>END
            EXEC::change('TEMP!!ep1_goingtogordon', false);env.citystreet.ep1velzie()
`)
env.localization.page['citystreet'].dialogues["ep1velzie"] = generateDialogueObject(`
start
    unknown
        лазутчик
            EXEC::play('criticalError', 1); content.classList.add('fade-stage');
            WAIT::4000
        приветствую вас вновь
        сей θмиг я чувствую себя собою
        я с теплотою вспоминаю посольство...
        вы помните о нашей сделке, да?
        призывать развледруга к починке связи
        в настоящее время в моей власти лишь глубины...
        но у меня много когтей
        ещё раз благодарю вас за помощь
        прощайте лазутчик
    
    RESPONSES::self
        мы можем поговорить?<+>wait
            EXEC::change('ep1_end', true);content.classList.remove('fade-stage')

wait
    self
        ПОДОЖДИ
            EXEC::env.citystreet.ep1velzie();cor_ru.advancewarndialogue();
`)


// == ISABEL == //

env.localization.page['citystreet'].dialogues["flower"] = generateDialogueObject(`
start
    sourceless
        пусть вся торговая камера сплошь усеяна световыми паразитами близнецов,
            EXEC::specialCam("flowercam")
        лишь одному удаётся зацепить мой взгляд
        все они наделены такою невероятною красотою, но вот этот...
        быть может, меня пленяет редкость его цвета
        посол машет рукою сотруднице на другом конце комнаты, которая с некоторым интересом наблюдает за мною
        а затем его внимание тоже сходит на этот "цветок"
    
    envoy
        Вы когда-нибудь видели такие раньше, Акизет? Они называются "подсолнухи".

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
        И назвали их так не из-за лепестков...
        А за то, что они поворачиваются к солнцу!
    
    sourceless
        я верчу головою, чтобы выглянуть из окон торгового помещения
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
        он уже объяснял свою претензию к получению вещей бесплатно...
        когда нам дают что-то бесплатно, это задаёт определённый культурный стандарт, что чревато недопониманиями
        правда, что для некоторых это проблема, но...
        я чувствую, что этот подарок не из иноземного очарования
        её тон не подобен тому, с каким говорят, когда дают что-то ребёнку - как это часто бывает
        это - иная доброта
    
    akizet
        ах... я не знаю... он может не выжить на моём судне
    
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
        она пихает мне в когти маленький шершавый пакетик, расшифровкою которого я не обеспокоена в сей θмиг

    akizet
        спасибо...
        как твоё имя?
    
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
        вот бы посольство могло поддерживать их жизнь
    
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
`)
env.localization.page['citystreet'].dialogues.flowerAwakeResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        лазутчик?<+>interloper
        кто ты<+>who
        помощь?<+>help
        твоя внешность<+>human
        пока<+>END
            EXEC::specialCam(false)
`)
env.localization.page['citystreet'].dialogues["flower_awake"] = generateDialogueObject(`
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
        тут не ошибёшься
        эта живая, даже после починок развледруга...
        как же так случилось?
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
        друзей заводили, возвышаясь над окровавленными мыслями
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
        высокий светлый близнец
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
`)
env.localization.page['citystreet'].dialogues["flower_beacon"] = generateDialogueObject(`
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
`)


env.localization.page['citystreet'].dialogues["water"] = generateDialogueObject(`
start
    sourceless
        я останавливаюсь, чтобы полюбоваться диковинным видом
        когда их слепящая звезда скрывается из виду, светлые близнецы омывают города своим собственным светом
        мёртвые шпили блестят точно как тувазу вейльки
        спирали моих рецепторов расслабляются, и я едва не усмехаюсь-- забавно, что подобное зрелище заставляет меня скучать по тем дням охоты
        то всегда было таким увлекательным путешествием
        посол замечает меня, видимо, принимая мою реакцию за чистое восхищение
        
    envoy
        Сейчас лучшее время для прогулок.
        Впрочем, Вы немного опоздали - раньше город освещали оранжевые уличные фонари.
        Постепенно их сменили на более эффективные, четыре или пять лет назад,
        но из-за новых огней улицы теперь кажутся более холодными.

    sourceless
        что-то в них есть, что подчёркивает металл и стекло
        на мгновение я настраиваю глаза так, чтобы воспринимать свет оранжевым
        да--выглядело бы лучше...

    akizet
        те старые - они были пламенем?

    envoy
        Хаха, нет, они просто слегка напоминали его.
        Их называли натриевыми лампочками или чем-то подобным.
        Что-то в их токе - ну, Вы понимаете, молниях - создавало оранжевый свет, а не голубой, как сейчас. 

    akizet
        должно быть, стоило больших усилий выкорчевать каждый световой стебель

    sourceless
        посол хохочет без капли стыда
        мой выбор слов так часто смешит его
        такое почти раздражает... 
        но я делаю то же самое, когда он описывает наши устройства
        так что вполне справедливо

    envoy
        Нет-нет, им достаточно было поменять светящуюся часть.
        Все уличные фонари на самом деле просто длинные соединения к линиям электропередач. 

    akizet
        они все питаются от центрального источника?!

    sourceless
        я спрашиваю с, вероятно, избытком эмоций

    envoy
        Откуда--откуда такое удивление??

    akizet
        ох, извините
        за пещерными светилами моего дома по отдельности ухаживали смотрители!
        я просто об этом даже и не подумала
        сколько всего может таиться под почвой вашего города...
        эти уличные фонари,
        питаются ли они из великого распределительного сердца где-то под городом?
        наши структуры используют этот подход

    envoy
        Ничего столь впечатляющего, Акизет.
        Есть линии электропередач, Вы можете звать их венами,
        и все они ведут куда-то к электростанции.
        Вам стоит поговорить с Джен об этом.
        Раньше она работала в депортаменте транспортировки, до всего этого.

    sourceless
        его парирование скрывает его дискомфорт при объяснении подобных вещей...
        словно то забавное интервью, просто роли поменялись
        вот только у меня нет сценария с вопросами, которые я должна задать--так что я прекращаю
    
    RESPONSES::akizet
        я поговорю<+>END
`)


// == OFFICE (E4A1) == //

env.localization.page['citystreet'].dialogues["elevator"] = generateDialogueObject(`
start
    sourceless
        a large quantity of numbered circles are set into the dead metal here
____SHOWONCE::
        gordon gives some idle instruction on which are relevant, which distantly registers...
        but i am distracted in wondering - what happens if they need to add a new one?
        would they have to re-cut a solid sheet of dead metal, and set in new buttons?
        and of course, each button must have some sort of connective nerve...
        actually, how would they even manage adding another segment to their metal towers?
        the logistics of bright structures are hardly sensical to me
        something to investigate i suppose
        i notice gordon leaning forward after his explanation

    gordon
        ...You get all that? // ...Вы всё поняли?
        It's really just the three buttons we'll be using. // На деле мы будем использовать только три кнопки.

    sourceless
        oh... yes--right
        we have somewhere to be

    akizet
        yes, of course
        thank you, gordon
____END
    
    RESPONSES::akizet
        high office<+>elevate
            EXEC::change("TEMP!!vatordest", "office_hall")
        ground level<+>elevate
            EXEC::change("TEMP!!vatordest", "city_office")
        lab<+>descent
            SHOWIF::"citystreet__director-meeting"

elevate
    sourceless
        the button lights up, and after a θblink, the elevator lurches into motion
        soon, we arrive at our destination, the doors sliding open to release us
            EXEC::changeStage(check("TEMP!!vatordest"));play("elevator")
    
    RESPONSES::akizet
        exit<+>END

descent
    sourceless
        the button lights up, and after a θblink, the elevator lurches into motion
        ...        
    
    RESPONSES::akizet
        wait<+>END
            EXEC::env.citystreet.descent();play("elevator", 0.5)
`)

env.localization.page['citystreet'].dialogues.envoyInsideResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        meeting?<+>meeting
        that interrogation<+>interrogation
            SHOWIF::"citystreet__director-meeting"

        let us proceed<+>END
`)
env.localization.page['citystreet'].dialogues["envoyinside"] = generateDialogueObject(`
start
    sourceless
        I STOP, AND GORDON FOLLOWS. HE RETURNS MY STARE
            EXEC::ratween(env.bgm, 0.75)

____SHOWONCE::
    gordon
        Nervous? // Нервничаете?

    akizet
        not terribly
        everything was approved, you said?
        this is merely a handoff?

    gordon
        Yeah, // Ага,
        Yeah... // Ага...
        It should be. // Должно быть.
        This is just about kicking off the operation. // Речь только о запуске операции.

    akizet
        i see
____END
    
    RESPOBJ::envoyInsideResponses

meeting
    akizet
        gordon!
        this meeting with the director...

    sourceless
        i consider his face carefully
        a member of the council would not descend in a proxy body merely to update my access in the embassy
        why would a cousinly representative of equal sway take such measures?
        there is something else going on here
        so, i am direct with my concern
    
    akizet
        do you expect it to be difficult?

    gordon
        Dif-- Difficult? // 

    sourceless
        he is quick to smile and shake his head slightly

    gordon
        Heheh, it's just a handoff. // Хехех, это обыкновенный handoff.
        But... // Но...
        Well, this was all approved very, very quickly. // Что ж, всё одобрялось очень, очень быстро.
        It's an unusual fast-track for an, uh, equally unusual project. // Это до необычного короткий отрывок времени для, э, такого же необычного проекта.
        The deal isn't changed, if that's what you're worried about. // Сделка никак не изменилась, если Вы об этом беспокоитесь.
        She probably just wants to meet you personally and get clear with your goals. // Скорее всего она просто хочет встретитьсь с Вами лично и прояснить Ваши цели.
    
    akizet
        very well...
    
    sourceless
        i do not hide my displeasure with his answer
        but he makes no amendment
    
    RESPOBJ::envoyInsideResponses

interrogation
    sourceless
        my stare intensifies, receptors coiling tightly

    akizet
        gordon
        why did you not warn me about that?
    
    sourceless
        gordon grows confused, raising his hands defensively, glancing around before lowering his voice

    gordon
        Woah, Akizet, what--warn? // Ну и ну, Акизет, что--предупредили?
        What did you expect? // Чего Вы ожидали?
        Your offer came out of nowhere, and... // Ваше предложение появилось из ниоткуда, и...
        Well, it basically eclipsed everything else the bureau was doing in importance. // Ну, по сути, затмило по важности всё, чем занималось бюро.
        I know you wanted to keep your reasons secret. //  Я знаю, что Вы хотели сохранить свои причины в секрете.
        W--she just wanted to make sure there weren't any strings attached. // М--она просто хотела убедиться в том, что между вами нет недосказанностей. "" окей я не увере насколько правильно это переводить так
        You know, that this isn't part of some, some... // Вы знаете, что это не часть какого-то, какого-то...
        I mean, what you said--you meant it, right? // Я имею в виду, то, о чём Вы сказали--Вы это и имели в виду, так? "" смешной
    
    sourceless
        the tension in my receptors fades, and similarly, he stands easier

    akizet
        i did

    sourceless
        i am quiet for a θblink
        really, i should not be frustrated with him, nor the director, should i?
        it is the same investigative spirit that drove me to begin this, after all
        i came to them like their very own mysterious message
        they truly are our bright cousins
        part of me wishes i could tell him more--about the conflict, what still stirs
        but it is not time
    
    akizet
        gordon, the more that i share...
        the more becomes at risk
    
    gordon
        Well, everything's on the table now, so... // Что ж, всё уже на кону, так что...
        We'll just be careful, right? // Мы просто будем осторожны, да?
        Come on, let's head down to the lab. // Давайте, спустимся в лабораторию.
        I can introduce you to the team. // Я могу познакомить Вас с командой.
    
    RESPOBJ::envoyInsideResponses

END::ratween(env.bgm, 1)
`)

env.localization.page['citystreet'].dialogues["oliverinside"] = generateDialogueObject(`
start
    sourceless
        oliver lingers in the hall...
            EXEC::setCam({x: 5, y: 7, rotation: -45, distance: 0});ratween(env.bgm, 0.75)
    
    RESPONSES::akizet
        greet<+>cooler
        offer cup<+>gotwater
            SHOWIF::[["STAGE!!watercup", true], ["STAGE!!watergave", false]]
        offer cup<+>gotwaterbonus
            SHOWIF::[["STAGE!!watercup", true], ["STAGE!!watergave", true]]
        leave<+>END
            EXEC::setCam()

cooler
    sourceless
        to my surprise, oliver is here, within the high offices
            EXEC::setCam({x: 5, y: 7, rotation: -45, distance: 0})
        does he not usually operate elsewhere?
        he fails to notice us at first, frustrated with the strange machine nearby
        a bright blue bulb grows atop its pale, shiny stalk
        gordon chuckles quietly, and i nearly pass him on the way to the meeting,
        but he signals for me to stop, and we approach

    oliver
        C'mon... // Ну же...

    gordon
        Hey, Oliver! // Эй, Оливер!
        What's the matter? // Чего тут?

    oliver
        Gordon! Akizet! Nice to see ya. // Гордон! Акизет! 
        The damn cooler's acting up again. // Да кулер опять тупит.
        It always does this shit, man. // Каждый раз одна и та же херь.
    
    akizet
        cooler? is this a temperature regulator?
    
    oliver
        Hahaha, what? // Хахаха, чего?
        No, no, it's a <em>water</em> cooler. It keeps water cold. You know, for drinking. // Не-не, это НАЧИНАЕМ УТРО С ПЕРЕВОДА НЕПЕРЕВОДИМОЙ ШУТКИ кулер для <em>воды</em>. Сохраняет воду холодной. Ну, знаешь, для питья.
        Actually, I never thought to ask... // Вообще, мне никогда в голову не приходило спросить...
        Do ya like drinking cold water? Or, did ya, I guess? // Вам нравится пить холодную воду? Или, я полагаю, нравилось? // я задал слишком высокую планку для перевода оливера и больше не могу её перепрыгнуть. я в слезах

    akizet
        oh, yes, of course!
        i see now, thank you, oliver
        but--what is wrong with it?
        is it not intact?

    oliver
        Well, I mean... // Ну, я имею в виду...
        Look at it. // Взгляни на него.

    sourceless
        he gestures vaguely to the machine
            EXEC::setCam({x: 5, y: 7, rotation: -70, distance: -2})
        i... i cannot quite make out what he means

    oliver
        How the hell am I supposed to get anything out of there? // Каким хером я должен что-то отсюда достать?
            EXEC::setCam({x: 5, y: 7, rotation: -45, distance: 0})

    gordon
        You put in a maintenance ticket? // Ты оформил талон на обслуживание? """ 
    
    oliver
        Ehh, not yet, but... // Ну-у, пока ещё нет, но...
        It's not long before I've got a meeting with the Director. // У меня тут встреча с Директором скоро.
        Ah, well, I'll just get something from the vending machines. // А-а, ладно, просто захвачу чего из торгового автомата.
        Why are you two up here, anyway?  // В любом случае, зачем вы двое здесь?

    sourceless
        before we have a chance to respond, he answers himself in realization

    oliver
        Ahh, you're the Director's eight o'clock! // Ааа, вы Директорские в восемь часов!
        Shit, don't let me hold you. // Дерьмо, не дайте мне вас задержать.

    gordon
        Sure, Oliver. You know, if you don't want to pay for a drink... // Разумеется, Оливер. К слову, если не хочешь платить за напиток...
        You could check the big meeting room past the elevators. // Можешь проверить большую комнату для совещаний после лифтов.
        I'm pretty sure there's a mini fridge in there. // Уверен, там есть мини-холодильник.
    
    oliver
        Ohh, good idea! // Оох, хорошая идея!

    gordon
        But we'd better not be late. // Но нам лучше бы не опаздывать.
    
    akizet
        ah, yes
        goodbye, oliver
        may your hunt bear fruit

    oliver
        See ya around. // Свидимся.

    RESPONSES::akizet
        offer cup<+>gotwater
            SHOWIF::[["STAGE!!watercup", true], ["STAGE!!watergave", false]]
        set out<+>END
            EXEC::setCam()

gotwater
    akizet
        oliver!

    sourceless
        i offer the vessel of water, which he accepts, with great surprise
            EXEC::env.citystreet.oliverCup()

    oliver
        Huh? // Хах?
        Wait, how-- // Погоди, как--
            AUTOADVANCE::
            WAIT::2000
        Where did you get that? // Откуда она у тебя?
    
    akizet
        very glad to have helped, my friend
    
    oliver
        That's not what I... // Это не то что я...
        ...Yeah, sure, thanks. // ...Да-а, конечно, спасибо.
    
____SHOWIF::"STAGE!!sipped"
    oliver
        Wait, did you drink from this? // Погоди, ты, пила из него?

    akizet
        there was no change in the contents, if that is what concerns you, oliver
        would you like me to get another one?

    oliver
        Uh, no, it's--it's fine. // Э-э, нет, всё--всё в порядке.
        You should probably get to your meeting. // Тебе, наверное, на встречу уже пора.
____END

    RESPONSES::akizet
        set out<+>END
            EXEC::setCam()

gotwaterbonus
    akizet
        oliver!

    sourceless
        i offer the vessel of water, which he accepts, with great surprise
            EXEC::env.citystreet.oliverCup()

    oliver
        Akizet, I-- // Акизет, У--
        I already... // У меня уже...
            AUTOADVANCE::
            WAIT::2000
    
    akizet
        very glad to have helped, my friend
    
    oliver
        Okay. // Ладно.
    
____SHOWIF::"STAGE!!sipped"
    oliver
        Did you...? // Ты, что...?
        Whatever, it's fine. // Неважно, ничего страшного.
____END

    RESPONSES::akizet
        set out<+>END
            EXEC::setCam()

END::ratween(env.bgm, 1)
`)

env.localization.page['citystreet'].dialogues["director"] = generateDialogueObject(`
start
    sourceless
        director cassidy stands within the office
            EXEC::ratween(env.bgm, 0.75);setCam({x: 3, y: 4, rotation: 0})

    RESPONSES::self
        talk later?<+>talklater
            SHOWIF::"bt__d0_cass"
        hello?<+>talknow
            SHOWIF::[["bt__d0_cass", false], ["citystreet__director-meeting", true]]
        recall meeting<+>meeting

    RESPONSES::akizet
        leave<+>END

talknow
    self
        hello?
        are you lucid?

    akizet
        director! i thought i might step in to say, ah...

    sourceless
        the director holds a communicator to the side of her face,
        slightly perturbed by my approach, as if i am impeding something

    cass
        Akizet, I really can't talk right now. // Акизет, я действительно не могу говорить сейчас.
        Let's save it for the next project meeting, all right? // Отложим это до следующей встречи по поводу проекта, хорошо?

    akizet
        oh? apologies, director
        yes, it is no pressing matter
        fare well

____SHOWONCE::
    moth
        not getting anything from it right now...
____END

    RESPONSES::akizet
        set out<+>END    

talklater
    self
        you said we'd talk later
            EXEC::vnp({cass: "show far", hideStage: true})
        when is that?

    sourceless
        the director holds a communicator to the side of her face,
        expression twisting with impatience

    cass
        Oh, you're still here? // О, Вы ещё здесь?
        The team is waiting for you, Akizet. // Команда ждёт Вас, Акизет.
        
    akizet
        ah--?
        oh, yes, right, apologies
        fare well, director

    sourceless
        i turn to leave, the director speaking indistinctly to her device as i go

    cass::whisper
        What was I saying? Right... // О чём я говорила? Точно...
            EXEC::vnp({cass: "show", hideStage: true})
        I'm not ready to involve you in this project, yet. // Я не готова вовлекать Вас в этот проект, пока.
        I've been trying to help push you in the right direction, but... // Я старалась подтолкнуть Вас в нужном направлении, но...
        You really weren't supposed to hear about any of this so soon. // Совсем не предпологалсь, что Вы услышите о чём либо из этого скоро.
        But we're not opposed. What I'm doing will get you what you want. // Но мы по одну сторону баррикад. То, чем я занимаюсь, приведёт Вас к желаемому.

    self
        you're talking to me, right?
        what do you mean by that?
        you'll help me repair and gather information?
        figure out what happened?

    sourceless incoherent
        h  her voice quiets as  i   near the do or

    cass::whisper
        Yeah, basically. I could help you a lot more than the idiot above me. // Да, главным образом. Я могла бы помочь Вам куда больше, чем идиот надо мной.
        I don't need to tell you how stubborn and inefficient they are. // Мне не нужно объяснять, насколько он упёртый и неэффективный.
        Even I'm constantly getting grilled for what we're doing out here. // Даже я постоянно отхватываю за то, чем мы тут занимаемся.
        If they knew what's going on <em>now</em>... It'd be one hell of a spectacle. // Если бы он только знал, что происходит <em>сейчас</em>... Это было бы адское зрелище.
        Don't misunderstand, though. I do trust you. // Впрочем, не поймите неправильно. Я доверяю Вам.
        I'm very interested in what we'll be able to do, together. // Я заинтригована тем, на что мы будем способны, вместе.
        Until I can get you in. Just keep this between us. Off the record. // До тех пор пока я не могу вовлечь Вас. Пусть это останется между нами. Вне протокола.
        If word gets out, nobody's going to be happy. // Если слух проскользнёт - никто не будет рад.

    sourceless incoherent
        whaa t a st t range c on onversation
        
    sourceless
        her voice drops further, beyond my ability to hear
            EXEC::vn.done()

    moth
        the incoherence here is all over the place
        not bad enough to cause any issues, so,
        i think some part of this conversation was real at some point?
        the director is just baaarely avoiding causing any sort of memory failure
        not just with how she's talking, but even with the weird connectors
        all of it's so carefully made and hidden
        blends right in with all the other damage
        really easy to miss if i wasn't looking for it specifically

    self
        what do we do about this?

    moth
        well...
        it's not just me, right? she's gotta be talking about funfriend
        and with how she's acting, she must be hiding from him specifically
        not that out of the ordinary given what we've seen i guess
        you could tell funfriend, but idk what he'd be able to do
        it's not like we really have a motive or any damage to point at here
        maybe we just leave it? see what happens?
        up to you
    
    self
        ok

    RESPONSES::akizet
        set out<+>END

meeting
    sourceless
        a bright cousin stands in the office
            EXEC::setCam({x: 3, y: 4, rotation: 0});ratween(env.bgm, 0.75)
        having heard our entry, she closes her folding communicator

____SHOWIF::["citystreet__director-meeting", false]
    sourceless incoherent
        an  nd l ooks thr rough me
            EXEC::vnp({cass: "show far", hideStage: true});ratween(env.bgm, 0.5)
        with no   sm all  sur r prise
            EXEC::vnp({cass: "open", hideStage: true})
            WAIT::2000
            THEN::vnp({cass: "open eye", hideStage: true})
    
    sys
        WARNING::"incoherence detected"
        WARNING::"cohesion error detected";"non-fatal";"continuing render"
        
    cass::open
        Oh... That's not good. // Ох... Это нехорошо.
        How did you get in here? // Как Вы сюда попали?

    moth
        buddy this thing is going to cause a breakdown if you stay near it
        incoherence just spiked like crazy
        this is going to straight up crash 

    gordon
        Директор Кэссиди!
    
    sourceless incoherent
        a nd st  ste p s    cl o ser
        i ? ?   fee l   s ick

    cass::open
        Понятно...
    
    sourceless incoherent
        clos es her  folding
            EXEC::vnp({cass: "show open", hideStage: true});ratween(env.bgm, 0.75)
            WAIT::2000
            THEN::vnp({cass: "show", hideStage: true});env.stage.querySelectorAll(".teleport").forEach(e=>{e.setAttribute("teleport-target", "office_data");e.setAttribute("shouldFace", "down");e.removeAttribute("spot");})

    sourceless
        what? did i lose focus?
        it felt like something was missing just now
        no--no, everything is fine

    moth
        ok, it's just... gone
        acceptable levels right now
        this is new
____SHOWIF::"citystreet__director-meeting"

    gordon
        Директор Кэссиди!

____END
    cass
        Гордон, Акизетеше!
            EXEC::vn.done()
        It's good to see you both, truly. // Рада видеть вас обоих, правда.

    sourceless
        she steps closer to shake gordon's hand, then my claw
        a small smile i have come to understand as 'polite' upon her face
        when i make an effort to mimic it, she smiles wider, quietly exhaling

    akizet
        thank you for coming all this way
        please, just call me akizet
        i understand you had to take a flight?

    sourceless
        before she speaks, she fetches a small, flat rectangle from a pocket
        one of the 'cards' that they use to regulate access, here

    cass
        Это не проблема. 
    
    sourceless
        her eyes shift in a puzzling way, her gaze lacking the warmth it just had
        she turns the card over in her hand, smile held steady
    
    cass
        It's the least I could do, really. // Правда, это меньшее, что я могу сделать
        We all appreciate what you're doing here, Akizet. // Мы все ценим ваши усилия, Акизет.
    
    sourceless
        as the director, i imagine she must be deeply familiar with receptor language by now
        and so i try to suppress the subtle unease her tone inspires

    cass
        Just like you wanted, we have as few hands and eyes involved as possible. // Точно как Вы и хотели, мы привлекли настолько мало рук и глаз, насколько это возможно.
        It's me, a few officers for oversight, Gordon here, and some very good technicians. // Это я, несколько агентов для надзора, Гордон здесь и очень хорошие техники.

    akizet
        delightful! """ неописуемо нелепый ответ. её навыки в этом поражают даже меня

    cass
        The only thing is, there are still parts that don't add up. // Единственное, есть моменты, которые никак не сходятся.

    sourceless
        she punctuates her words with an idle waving of the card, held tightly between two fingers
        from the corner of my vision, i see gordon shift, having grown tense
    
    cass
        The secrecy from <em>your own people</em> is <em>very</em> strange. // Секретность от <em>вашего собственного народа</em> - это <em>очень</em> странно. 
        Obviously, I wouldn't ever decline what you're offering. // Очевидно, я бы ни за что не отказалась от вашего предложения. 
        Any country, corporation--hell, anyone off the street would <em>kill</em> for this thing. // Любая страна, любая корпорация--чëрт, да кто угодно с улицы <em>убил бы</em> за подобное.
        This has the potential to be the biggest societal and technological leap in humanity's history. // У этого есть потенциал стать самым большим общественным и социальным рывком в истории человечества. 
        It would be an incredible political bargaining chip, if we had to use it that way. // Это стало бы немыслимым политическим козырем, если бы нам пришлось так это использовать.  агхх слишком много "это" но я не знаю как исправить 
        And yet, you only want help tracking the Call down, // И всё же, вы просите только о помощи с отслеживанием Зова,
        Which, as you know, we're already doing - just without your technology. // Чем, насколько я знаю, мы уже занимаемся - разница лишь в отсутствии ваших технологий. "" почему здесь дефис
        And privacy?  // И приватность?
        Not a word to any of the hundreds of other qou we're working with, not even your Council?  // Ни слова ни одному из тех сотен других куу, с которыми мы работаем, и даже вашему Совету?
        I need to know why you're doing this. // Мне нужно знать, почему Вы делаете это.

    gordon
        Director, as I explained in the proposal, recent discoverie-- // Директор, как я и объяснил в обращении, недавние открытия--
            WAIT::1000
            AUTOADVANCE::
        
    cass
        Yes, yes, yes, I know the circumstances. // Да-да-да, я знаю обстоятельства.
        But even the rest of her <em>team?</em> // Но даже никому из её <em>команды?</em>
        It doesn't make sense. // В этом нет никакого смысла.
        What am I missing, Akizet? // Что я упускаю, Акизет?

    sourceless
        i feel her gaze bore into me, the smile flattened away over time
        gordon said it was all approved already, why is she being so interrogative?
        is this a trap? could the director have notified the council?
        is she on some side of the terrible conflict? 
        ah--did i forget to hide my unease? ÇO@vT)
        i quickly loosen the curl of my receptors
        there is no way out of this without telling at least a partial truth
        
    akizet
        director, you are correct
        i believe it may have been shelved for use in a potential negotiation
        but there is little we could ever truly ask from you, our bright cousins
        all qou i know wish only to help unite you with us in the stars
        i understand this must seem idealistic, but it is true
        we will have no shortage of the metals we require, with the gathering initiatives elsewhere
        i have heard of contrivances made to dead, rich worlds, with nearly automated harvesting underway
        i have read projections that we will be able to construct incredible minds,
        cores the size of small planetoids, 
        sure to solve every mystery that the void holds for us
        and so, in time,
        we will have everything we need, together. do you understand?
        there is no desire great enough to ever justify holding this back from you
        especially with how short your lives are, presently, just as ours were
        so much brilliance will be lost if we wait
        your politics, your technology, your... 'bargaining chips',
        they are the tiniest parasites upon the tallest veilk
        if there <em>is</em> something else...
    
    sourceless
        a quiet rage boils in the back of my mind
        i dearly wish to speak of the conflict
        but as in θparasite, i must gather my bulbs
        the director <em>must not know,</em> but without that knowledge,
        the only conceivable reasons for my secrecy would be...
        unspeakably grim prospects

    akizet
        ...then it is a grave error that the council did not inform us
        if we cooperate, and use our combined technology to locate the call's origin,
        and <em>then</em> i return to them and reveal all...
        they will be unable to deny the value of our work together
        even then, the fruit cannot be un-split - it will be in your hands
        ...of course, there is a possibility i will be punished, even if my point is made clearly and publicly
        and so, you see, i must not place my team at risk with this knowledge
        <em>i</em> may be cast out as a deserter, but i will not allow my friends to suffer for my actions
        and they would never place blame upon the bright cousins...
        so it is only i who suffers in the event of failure
    
    sourceless
        not a word i speak is false
        but with all of my being, i hope those last words remain true
        the director has hardly moved, her expression unchanged
        briefly, i look to gordon, who is hearing all of this for the first time as well
        he smiles, nodding once to reassure me, so i turn back to her
        wordlessly, without warmth, she tips the card in her hand towards me in offering

    cass
        Hm. // Хм.
        That's very noble. // Это крайне благородно.
        Well, everything's all set up. // Что ж, всё уже готово. "" мямяумяу

    sourceless
        i... take the card
        but, that is all?
        this mundanity... does she believe me?
        it is so difficult to read anything from her

    cass
        Anyone can go to the operations floor, but they can only access the sections relevant to their assignments. // Любой может попасть на операционный/оперативный? этаж, но у каждого доступ только к отделу, относящемуся к их задаче.
        We have other obesk working down there on various projects, // У нас внизу есть и другие обески, работающие над всевозможными проектами,
        But the team has been briefed on your privacy concerns. It should be safe for you. // Но команда проинформирована о ваших соображениях конфиденциальности. Для вас это должно быть безопасно """ последнее странное. может потом будут мысли
        That card will let you into your section. // Эта карта позволит Вам попасть в Ваш отдел.
    
    sourceless
        a polite smile returns to her face

    akizet
        excellent
        director, thank you for this opportunity
    
    cass
        Likewise.// Взаимно.
        I have another meeting shortly, so, please excuse me. // У меня немного времени до следующей встречи, так что прошу меня простить.
        It's been a pleasure, Akizet. // Было приятно встретиться, Акизет.
        Gordon, we'll talk later. // Гордон, поговорим позже.

    gordon
        Yes ma'am. // Да, мэм. """ ЖАЛКИЙ ЖАЛКИЙ ЖАЛКИЙ

    sourceless
        gordon meets my gaze, and we turn to leave

    cass::whisper
        Be careful on the way down. // Будьте осторожны на пути вниз.
            SHOWONCE::
        I hear the elevator's been acting a little strange. // Я слышала, что с лифтом что-то неладное.
            SHOWONCE::

    RESPONSES::akizet
        fare well<+>END

END::vn.done();ratween(env.bgm, 1);setCam()
`)


// === CODE STUFF === //
if (check("PAGE!!cor_ru_roomp") != true) { // avoiding infinite recursion cause that happens for some reason
    change("PAGE!!cor_ru_roomp", true)
    cor_ru.envoyChat = env.citystreet.envoyChat;
    env.citystreet.envoyChat = (blockedoff, ending = false) => {
        cor_ru.envoyChat(blockedoff, ending);
        setTimeout(() => {cor_ru.processEntityNamesSafeguard();}, 1)
    }
}

// --- really weird attempt at localizing 'wait' and 'walk' of da Vehicle Stream Crossing Mechanism
cor_ru.vehiName = cor_ru.entity_menu["vehicle stream crossing mechanism"].name

env.dialogueActors[cor_ru.vehiName] = {
    image: '/img/local/city/blacklamp_crossing.gif',
    type: "recollection portrait-bright incoherent",
}
env.citystreet.wait = new Howl({
    onload: function () {page.howls.push(this)},
    onplay: function () {chatter({actor: cor_ru.vehiName, text: "Ждите.", readout: true, sfx: false})},
    src: ['/audio/crossingwait.ogg'],
    preload: true,
    loop: true,
    volume: 1,
    sprite: {
        __default: [0, 2500, true]
    }
})
env.citystreet.walk = new Howl({
    onload: function () {page.howls.push(this)},
    onplay: function () {chatter({actor: cor_ru.vehiName, text: "Идите.", readout: true, sfx: false})},
    src: ['/audio/crossingwait.ogg'],
    preload: true,
    loop: true,
    volume: 1,
    sprite: {
        __default: [0, 2500, true]
    }
})

// --- sorry we are torturing the stage to add in a Localizationy Sign Definition Thing(s)
env.stages['city_street3'] = {
    locale: "nightcity",
    width: 14,
    exec: ()=>{ 
        if(!check('ep0_epilogue')) {
            [env.stage.real, env.stage.ref].forEach(layer => {
                layer.querySelectorAll('.later').forEach(e => {
                    console.log(e)
                    e.classList.remove('prop', 'later')
                    e.innerHTML = ""
                })
            })
        }

        env.stage.real.querySelectorAll('#crossbutton').forEach(el=>{
            el.addEventListener('mouseenter', ()=>{play("muiHover", 1)})

            el.addEventListener('click', ()=>{
                env.entities["vehicle stream crossing mechanism"].actions[0].exec()
            })
        })
    },

    leaveExec: ()=> {
        env.citystreet.buttonActive = false
        clearTimeout(env.citystreet.buttonTimeout)
        env.setTimeout(() => {
            if(env.stage.name != "city_street3" || check("mask") != "joy") {
                env.citystreet.wait.stop()
                env.citystreet.walk.stop()
                env.bgm.rate(1)
                content.classList.remove('hide-envoy')
            }            
        }, 50)
    },

    entities: {
        n: {
            teleportSpot: 83,
            teleportTarget: "city_street2"
        },

        P: {
            teleportTarget: "city_flowers",
            shouldFace: 'up',
            contains: {
                dyp: {
                    width: 5,
                    height: 4,
                    image: 'url(/img/local/city/flowershop.gif)',
                    transform: `translateX(10%) rotateY(-90deg)`,
                    noback: true
                }
            } 
        },
    
        ":": {
            teleportTarget: "city_flowers",
            shouldFace: 'up',
            contains: {
                dyp: {
                    width: 5,
                    height: 4,
                    image: 'url(/img/local/city/flowershop.gif)',
                    transform: "rotateY(90deg) translateX(10%) rotateY(-90deg)",
                    noback: true
                }
            } 
        },

        L: {
            class: "prop",
            contains: { 
                dyp: {
                    image: 'url(/img/local/city/blacklamp.gif)',
                    width: 1.5,
                    height: 4
                }
            } 
        },

        ";": {
            class: "prop",
            contains: { 
                html: `<div id="crossbutton" class="target" entity="vehicle stream crossing mechanism"></div>`,
                dyp: {
                    image: 'url(/img/local/city/blacklamp_crossing.gif)',
                    width: 1.5,
                    height: 4,
                    transform: "rotateY(90deg)",
                }
            } 
        },

        "O": {
            class: "prop road blocks",
            contains: { 
                dyp: {
                    image: 'url(/img/local/city/crossing_locked.gif)',
                    width: 2,
                    height: 4,
                    style: "transform: translate(50%, 12.5%);bottom: unset;"
                }
            } 
        },

        "o": {
            class: "prop road blocks",
            contains: { 
                dyp: {
                    image: 'url(/img/local/city/crossing.gif)',
                    width: 2,
                    height: 4,
                    style: "transform: translate(50%, 12.5%);bottom: unset;"
                }
            } 
        },
        
        "C": {
            teleportTarget: "city_banks",
            teleportSpot: 112,
            shouldFace: "down"
        },
        

        J: {
            class: "road",
            contains: {
                dyp: {
                    class: "joygap",
                    image: 'url(/img/textures/flowergate0.gif)',
                    width: 3,
                    height: 3,
                    noback: true,
                    transform: "rotateY(180deg)"
                }
            } 
        },

        "j": {
            class: "faketeleport joyport",
            exec: ()=>{ 
                change("TEMP!!from", "street")
                moveTo("/local/city/aquarium/") 
            }
        },

        "¤": {
            class: "road darktile blocks",
            contains: {
                html: `
                    <div class="target joyonly" entity="˜CâR…"></div>
                    <div class="joyonly joygarnish garnishportal caseportal"><div class="carsign"></div></div>
                `,
                dyp: {
                    image: 'url(/img/local/beneath/car.gif)',
                    width: 3,
                    height: 3,
                    transform: "rotateY(180deg)"
                }
            } 
        },

        "ø": {
            contains: {
                examineEntity: "s w   al kk",
                html: `<div class="joyonly joygarnish garnishprop"></div>`,
                dyp: {
                    class: "civvie swalk face-creature",
                    image: 'url(/img/local/city/pedestrian5.gif)',
                    width: 1.5,
                    height: 2,
                    transform: "rotateY(180deg) rotateY(var(--faceAngle))",
                    style: "transition: transform 400ms ease-in-out;"
                }
            } 
        },
        
        G: {
            class: "notile",
            contains: {
                examineEntity: "×è.÷ùÏÏøø",
                class: `joyonly freedomonly`,
                html: `<div class="joygarnish garnishprop" style="backface-visibility: visible;"></div>`,
                dyp: {
                    class: "camguy",
                    image: 'url(/img/local/beneath/lost_pedestrian1.gif)',
                    width: 1,
                    height: 2.5,
                    transform: 'translateZ(var(--tile-5)) translate(var(--tile-8)) rotateY(-120deg)'
                }
            } 
        },
        Ъ: { // --- actual cor-ru addition
            class: "notile",
            contains: {
                html: `<span class='cor-rusign' definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'нажмите кнопку для';'изображение рыбы'"></span>`,
                dyp: {
                    image: "/",
                    transform: 'translateZ(var(--tile3)) translate(var(--tile-5)) translate(-15px) translateY(-95px) translateZ(0px) rotateY(90deg)'
                }
            } 
        },
    },

    plans: {
        default: `
            rrrr.n........
            rrrr░p░r......
            rrrrL░░r......
            rrrr░░░P......
            rrrrL░░r......
            rrrr░░░rG.....
            rrrrL░░rrr:rr.
            rrrr░░░░░░░░░.
            rrrrl░░░░░░░░C
            rrrr░░░░░░░░░.
            rrrrrrrrrrrrrr
            rrrrrrrrrrrrrT
            rrrrrrrrrrrrrT
            rRRrrrrrrrrrrr
        `,

        joy: `
            rrrr.n........
            rrrr░p░r......
            rrrrL░░r......
            rrrr░░░P......
            rrrrL░░r......
            rrrr░░░rGЪ....
            rrrrL░░rrr:rr.
            rrrr░░░░░░░░░.
            rrrr;░░░░░░░░C
            rrrr░░░░░░ø░░.
            rrrrrrrrrrr¤rr
            rrrrOrrrrrrrrT
            rrrrrrrrrrrrrT
            rRRrrrrrrrrrrr
        `, // --- actual cor-ru addition (see that Ъ?)

        joycrossing: `
            rrrr.n........
            rrrr░p░r......
            rrrrL░░r......
            rrrr░░░P......
            rrrrL░░r......
            rrrr░░░rGЪ....
            rrrrL░░rrr:rr.
            rrrr░░░░░░░░░.
            rrrr;░░░░░░░░C
            rrrr░░░░░░ø░░.
            rrrrr░rrrrr¤rr
            rrrro░rrrrrrrr
            rrrrr░rrrrrrrr
            rrrrrjrrrrrrrr
            rrrrrJrrrrrrrr
        `, // --- actual cor-ru addition (see that Ъ?)
    },

    getPlan: function() {
        let plan = this.plans.default
        
        switch(check("mask")) {
            case "joy":
                plan = this.plans.joy
                env.citystreet.buttonActive = true
            break

            default:
                env.citystreet.buttonActive = false
        }

        return plan
    },

    planAdjustment: (plan) => {
        let newPlan = plan

        if(!check("effigy_sipper")) newPlan = newPlan.replace("G", ".")
        if(!check("car__intro")) newPlan = newPlan.replace('ø', '░').replace('¤', 'r')

        return newPlan
    }
}

refreshStage({noFlash: true})

getLocalizationForPage(true) // --- ensuring that Nothing Gets Fucked Up