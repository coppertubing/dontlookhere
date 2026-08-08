/*
    cor-RU - a russian localization mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/our-dull-vessel.js
    localization for /local/dullvessel

    progress: mothdialogue and some ent descs unfinished, need to see what else could be missing cause i dont remmeber shit as of 23.08.2025
*/


env.localization.page['dullvessel'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "did akizet not have furniture? this ship is so empty... honestly i kinda hope it just got lost through incoherence or something": "у акизет что, мебели не было? такой пустой корабль... если честно надеюсь что она просто пропала из-за бессвязности или чё-т такого",
        "woah... look at this, dude. this is a different thoughtspace, somehow": "воу... ток погляди на это. каким-то образом это другое мыслепространство",
        "looks like funfriend's restored a little bit here, there's definitely more data than before": "похоже развледруг тут потрудился, здесь точно прибавилось данных",
        "about the dull vessel": "о судне далля",

        "pilot cyst": cor_ru.entity_menu["pilot cyst"].name,
        "glazika": cor_ru.entity_menu["glazika"].name,
        "container": cor_ru.entity_menu["container"].name,
        "climbing wall": cor_ru.entity_menu["climbing wall"].name,
        "dull heart": cor_ru.entity_menu["dull heart"].name,
        "workspace": cor_ru.entity_menu["workspace"].name,
        "translation slab": cor_ru.entity_menu["translation slab"].name,
        "column": cor_ru.entity_menu["column"].name,
        "bright ground-parasite": cor_ru.entity_menu["bright ground-parasite"].name,
        "advanced rejuvenation chamber": cor_ru.entity_menu["advanced rejuvenation chamber"].name,
        "high-pressure body": cor_ru.entity_menu["high-pressure body"].name,
        "personal storage": cor_ru.entity_menu["personal storage"].name,
        "equipment storage": cor_ru.entity_menu["equipment storage"].name,

        /*pilot cyst*/ "unfinished": "незаконченное",
        /*pilot cyst*/ "business": "дело",
        
        
        /*glazika*/ "what a strange dream akizetesche!!": "что за странная грёза акизетеше!!",
        /*glazika*/ "by the way, i organized your room!": "к слову, я привела в порядок вашу комнату!",
        /*glazika*/ "we had to fix one of the walls because it was acting up!": "нужно было починить одну из стен потому что она сбоила!",
        /*akizet*/ "ah, thank you, my glazika": "ах, благодарю, моя глазика",
        /*sourceless*/ "i did not say anything about a dream...": "я не говорила ни о каких грёзах...",

        /*moth*/ "that \"container\" looks familiar": "этот \"контейнер\" выглядит знакомо",
    },

    entityDescriptions: {
        "pilot cyst": cor_ru.entity_menu["pilot cyst"].desc,
        "glazika": cor_ru.entity_menu["glazika"].desc,
        "container": cor_ru.entity_menu["container"].desc,
        "climbing wall": cor_ru.entity_menu["climbing wall"].desc,
        "dull heart": cor_ru.entity_menu["dull heart"].desc,
        "workspace": cor_ru.entity_menu["workspace"].desc,
        "translation slab": cor_ru.entity_menu["translation slab"].desc,
        "column": cor_ru.entity_menu["column"].desc,
        "bright ground-parasite": cor_ru.entity_menu["bright ground-parasite"].desc,
        "advanced rejuvenation chamber": cor_ru.entity_menu["advanced rejuvenation chamber"].desc,
        "high-pressure body": cor_ru.entity_menu["high-pressure body"].desc,
        "personal storage": cor_ru.entity_menu["personal storage"].desc,
        "equipment storage": cor_ru.entity_menu["equipment storage"].desc,
    }
}


// === DIALOGUES === //


// == MOTH == //

env.localization.page["dullvessel"].dialogues.mthdullresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        судно далля?<+>dullvessel
        внутренности кораблей?<+>seen
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
`)
env.localization.page["dullvessel"].dialogues["mth++dullvessel"] = generateDialogueObject(`
start
    self
        у меня есть вопрос о судне далля

    moth
        чё как?
    
    RESPOBJ::mthdullresp

dullvessel
    self
        почему оно называется "судно далля"?
    
    moth
        ну это судно которое проходит сквозь далль
        они так называют место через которое проходят во время межзвёздных путешествий
        хотя не зная про него можно подумать, что корабль назвали за то какой он скучный
        и если честно, глядя на его состояние, 
        я тоже начинаю так думать

    RESPOBJ::mthdullresp

seen
    self
        тебе не приходилось видеть внутренности обесковых кораблей?
    
    moth
        не вживую, только по старым фотографиям и видеозаписям исследований затонувших кораблей
        вот этот оооочень маленький, скорее всего ток для личного пользования
        странно что в данных памяти оно числится как "наше" судно далля
        в любом случае, очень круто взглянуть на настоящий
        даже если он пустоват...
        типа где акизет сидеть должна? неужели та ракушечная штука - единственное кресло?

    RESPOBJ::mthdullresp

glazika
    self
        что такое глазика?

    moth
        я без малейшего понятия лол
        хотя она тусуется с этими контейнерами
        может что-то типа ИИ-помощника

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



env.localization.page["dullvessel"].dialogues["pilot"] = generateDialogueObject(`
start
    akizet
        здравствуй тх¥Ӱ́Йг^Ӟ×¯Юõф±
    
    pilot cyst
        им%¶º½Òмõ‹СК’æÃE:Ӷ‹©é·0³Жºҹ­ЎщУж0i7]зz¦‹5ДÒ§´·Ó¡EÔ5BÆMъ^Ю̂и́õӯӈÇХ¸×¯Пõф±ÔЦãXÖ5&б/ 
    
    moth
        втф
            SHOWIF::[["dullvessel__pilot-end", false]]
        выглядит как какая-то ошибка форматирования
            SHOWIF::[["dullvessel__pilot-end", false]]
        кажись этой кранты
            SHOWIF::[["dullvessel__pilot-end", false]]
        или оно зашифровано... я просто отмечу это на пока, давай позже вернёмся
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
`)
env.localization.page["dullvessel"].dialogues["fixed"] = generateDialogueObject(`
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
        указанье
        велзи

    RESPONSES::self
        что за велзи?<+>who

who
    self
        что за велзи?

    pilot cyst
        указанье
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
        местоположенье?
    
    RESPONSES::self
        ок<+>change
            HIDEREAD::
        нет<+>nochange
            HIDEREAD::

change
    self
        измени местоположенье

    pilot cyst
        изменяю
            EXEC::env.dullVessel.swapLocation()
    
    sys
        ВНИМАНИЕ::'обнаружена мыслеформенная активность'::'суднодалля'

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
`)

env.localization.page["dullvessel"].dialogues.glazikaResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        статус?<+>status
        чем занималась?<+>absence

        простимся<+>END
`)
env.localization.page["dullvessel"].dialogues["glazika"] = generateDialogueObject(`
start
    akizet
        моя глазика!
    
    glazika
        ЗДРААААAВВСCТВУЙТЕ акизетеше
        так рада вновь вас видеть!
        с каждым разом ваши прогулки по поверхности становятся всё длиннее!
    
    akizet
        о да, я забавлялась близнецовыми способами передвиженья
        работа продолжается со значительным опереженьем прогнозов инициативы

    RESPOBJ::glazikaResponses

status
    akizet
        каков статус нашего судна?
    
    glazika
        потребленье приостановлено для всех видов деятельности кроме технического обслуживанья! 
        наш пилот вывел нас на стабильную орбиту!
        запасы топлива приемлемы!
    
    akizet
        вижу. спасибо, моя глазика.

    RESPOBJ::glazikaResponses

absence
    akizet
        чем ты занималась в моё отсутствие?
    
    glazika
        в основном обслуживаньем! однако пилотная циста отказывается спать! поэтому и я бодрствую!
        чтобы скоротать время пока вас не было, мы играли вместе с контейнерами
    
    akizet
        правда? что-то сами придумали?
            SHOWIF::[['ep1_fed', false]]
    
    glazika
        нет-нет! всего лишь игра в паразита. как вы можете видеть, я выигрываю
            SHOWIF::[['ep1_fed', false]]
    
    akizet
        молодцы! нам стоит как-нибудь сыграть
            SHOWIF::[['ep1_fed', false]]
    
    akizet
        ах, и сей θмиг вы играете в <span class="code">паразита</span>!
            SHOWIF::'ep1_fed'

    glazika
        да!!
            SHOWIF::'ep1_fed'
        пусть все углы в моём владеньи,
            SHOWIF::'ep1_fed'
        пилотная циста коварна - она по-прежнему занимает другие ключевые позиции
            SHOWIF::'ep1_fed'
        если я проиграю, я потеряю один из своих контейнеров!!!
            SHOWIF::'ep1_fed'

    akizet
        удачи, моя подруга
            SHOWIF::'ep1_fed'

    RESPOBJ::glazikaResponses
`)


getLocalizationForPage(true) // --- ensuring that Nothing Gets Fucked Up