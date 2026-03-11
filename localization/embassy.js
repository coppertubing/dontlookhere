/*
    cor-RU - a russian localization mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/embassy.js
    localization for /local/ocean/embassy
    for combat, see combat.js
    (---akizet youre so good at decisions)

    progress: discovery and suspision finished, collapse unfinished in dialogue and entity descs, mothdialogues unfinished as of 23.08.2025
*/


env.localization.page['embassy'] = {dialogues: {},
    definitions: {

        "времядержец": { type: `ПРИМЕЧАНИЕ`, text: `'частичный перевод';'сгенерировано из унаследованного описания'`},
        "времядержца": { type: `ПРИМЕЧАНИЕ`, text: `'частичный перевод';'сгенерировано из унаследованного описания'`},
        "времядержце": { type: `ПРИМЕЧАНИЕ`, text: `'частичный перевод';'сгенерировано из унаследованного описания'`},
        "времядержцем": { type: `ПРИМЕЧАНИЕ`, text: `'частичный перевод';'сгенерировано из унаследованного описания'`},
        "времядержцу": { type: `ПРИМЕЧАНИЕ`, text: `'частичный перевод';'сгенерировано из унаследованного описания'`},


        "θсегмент": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'подразумевает отдельную секцию шпиля';'обычно разграничены по вертикали'`},
        "θсегмента": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'подразумевает отдельную секцию шпиля';'обычно разграничены по вертикали'`},
        "θсегменту": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'подразумевает отдельную секцию шпиля';'обычно разграничены по вертикали'`},
        "θсегментом": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'подразумевает отдельную секцию шпиля';'обычно разграничены по вертикали'`},
        "θсегменте": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'подразумевает отдельную секцию шпиля';'обычно разграничены по вертикали'`},

        "θсегменты": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'подразумевает отдельную секцию шпиля';'обычно разграничены по вертикали'`},
        "θсегментов": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'подразумевает отдельную секцию шпиля';'обычно разграничены по вертикали'`},
        "θсегментам": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'подразумевает отдельную секцию шпиля';'обычно разграничены по вертикали'`},
        "θсегментами": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'подразумевает отдельную секцию шпиля';'обычно разграничены по вертикали'`},
        "θсегментах": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'подразумевает отдельную секцию шпиля';'обычно разграничены по вертикали'`},

        // tendril
        "θответвленье": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'используется взаимозаменяемо с ветвью';'подразумевает отведённую под определённое назначенье область';'многочисленны в сегментах шпиля';'часто простираются от соединенной с хребтом центральной камеры';'более формальный термин'` },
        "θответвленья": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'используется взаимозаменяемо с ветвью';'подразумевает отведённую под определённое назначенье область';'многочисленны в сегментах шпиля';'часто простираются от соединенной с хребтом центральной камеры';'более формальный термин'` },
        "θответвленью": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'используется взаимозаменяемо с ветвью';'подразумевает отведённую под определённое назначенье область';'многочисленны в сегментах шпиля';'часто простираются от соединенной с хребтом центральной камеры';'более формальный термин'` },
        "θответвленьем": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'используется взаимозаменяемо с ветвью';'подразумевает отведённую под определённое назначенье область';'многочисленны в сегментах шпиля';'часто простираются от соединенной с хребтом центральной камеры';'более формальный термин'` },
        "θответвленьи": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'используется взаимозаменяемо с ветвью';'подразумевает отведённую под определённое назначенье область';'многочисленны в сегментах шпиля';'часто простираются от соединенной с хребтом центральной камеры';'более формальный термин'` },

        "θответвленья": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'используется взаимозаменяемо с ветвью';'подразумевает отведённую под определённое назначенье область';'многочисленны в сегментах шпиля';'часто простираются от соединенной с хребтом центральной камеры';'более формальный термин'` },
        "θответвлений": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'используется взаимозаменяемо с ветвью';'подразумевает отведённую под определённое назначенье область';'многочисленны в сегментах шпиля';'часто простираются от соединенной с хребтом центральной камеры';'более формальный термин'` },
        "θответвленьям": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'используется взаимозаменяемо с ветвью';'подразумевает отведённую под определённое назначенье область';'многочисленны в сегментах шпиля';'часто простираются от соединенной с хребтом центральной камеры';'более формальный термин'` },
        "θответвленьями": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'используется взаимозаменяемо с ветвью';'подразумевает отведённую под определённое назначенье область';'многочисленны в сегментах шпиля';'часто простираются от соединенной с хребтом центральной камеры';'более формальный термин'` },
        "θответвленьях": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'используется взаимозаменяемо с ветвью';'подразумевает отведённую под определённое назначенье область';'многочисленны в сегментах шпиля';'часто простираются от соединенной с хребтом центральной камеры';'более формальный термин'` },

        // branch
        "θветвь": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'используется взаимозаменяемо с ответвленьем';'подразумевает отведённую под определённое назначенье область';'многочисленны в сегментах шпиля';'часто простираются от соединенной с хребтом центральной камеры';'менее формальный термин'` },
        "θветви": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'используется взаимозаменяемо с ответвленьем';'подразумевает отведённую под определённое назначенье область';'многочисленны в сегментах шпиля';'часто простираются от соединенной с хребтом центральной камеры';'менее формальный термин'` },
        "θветвью": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'используется взаимозаменяемо с ответвленьем';'подразумевает отведённую под определённое назначенье область';'многочисленны в сегментах шпиля';'часто простираются от соединенной с хребтом центральной камеры';'менее формальный термин'` },

        "θветвей": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'используется взаимозаменяемо с ответвленьем';'подразумевает отведённую под определённое назначенье область';'многочисленны в сегментах шпиля';'часто простираются от соединенной с хребтом центральной камеры';'менее формальный термин'` },
        "θветвям": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'используется взаимозаменяемо с ответвленьем';'подразумевает отведённую под определённое назначенье область';'многочисленны в сегментах шпиля';'часто простираются от соединенной с хребтом центральной камеры';'менее формальный термин'` },
        "θветвями": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'используется взаимозаменяемо с ответвленьем';'подразумевает отведённую под определённое назначенье область';'многочисленны в сегментах шпиля';'часто простираются от соединенной с хребтом центральной камеры';'менее формальный термин'` },
        "θветвях": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'используется взаимозаменяемо с ответвленьем';'подразумевает отведённую под определённое назначенье область';'многочисленны в сегментах шпиля';'часто простираются от соединенной с хребтом центральной камеры';'менее формальный термин'` },


        "корройи": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'жидкое низкоактивное корру';'занимает пространство меж корруцистозных органов';'только для наземного использованья'` },
        
        "сфер": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'переработанное корруцистозное топливо/пища';'валюта'` },
        "сфера": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'переработанное корруцистозное топливо/пища';'валюта'` },
        "сферу": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'переработанное корруцистозное топливо/пища';'валюта'` },
        "сфером": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'переработанное корруцистозное топливо/пища';'валюта'` },
        "сфере": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'переработанное корруцистозное топливо/пища';'валюта'` },
       
        "парии": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'вейльковая кость'` },


        "коррускиви": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'традиционный инструмент технического обслуживанья';'без труда проходит сквозь корру'` },


        "вейльк-кровь": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'распространённый напиток';'не кровь'` },
        "вейльк-крови": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'распространённый напиток';'не кровь'` },
        "вейльк-кровью": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'распространённый напиток';'не кровь'` },

        "ззоуст": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'праздничный напиток';'имя произносится правильно только выкриком'` },


        "землемыслье": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'удалённое управленье и инструктированье корруцистозных устройств';'частичный перевод';'сгенерировано из унаследованного описания'` },


        "зевазни": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'пещерный город в центре вазни';'начало корруцистозной революции'` },

        "no tendril left to rot": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'распространённый оборот речи';'all is harvested'` },

        "cavernguard": { type: `ПРИМЕЧАНИЕ`, text: `'частичный перевод';'сгенерировано из унаследованного описания'` },
    }, 
    strings: {
        "i have to give it to this bstrd thing, general cohesion is still pretty solid. it's still hard to tell for sure what is real and what isn't though": "стоит отдать должное той свлчьной штуке, общая согласованность всё ещё неплоха. но до сих пор сложно понять что реально а что нет",
        "how did we never hear about this?? they always said it was some sort of structural failure due to the gravity differences or some bullshit like that": "каким образом мы об этом ничего не слышали?? нам всегда говорили что это было каким-то структурным провалом из-за разницы в гравитации",
        "this is fucked up dude, imagine if you couldn't trust any of us": "это бляздец чел, только представь если бы тебе нельзя было доверять никому из нас",
        "did she really label this memory as 'suspicion'? or was that funfriend? that's kinda ominous": "она серьёзно назвала это вспоминание \"подозренье\"? или это был развледруг? как-то зловеще",
        "there are so few distinct thoughtforms here... then again it could just be one part of the embassy": "тут так мало отдельных мыслеформ... хотя вообще это может быть лишь одной частью посольства",
        "wow... that kinda does it for this whole thoughtspace, except for that first one i guess": "ого... на этом мыслепространство можно сказать \"всё\", ну помимо того первого",
        "time to finish the collapse buddy. we almost got everything": "время заканчивать с обрушением дружище. мы почти всё просмотрели",
        "seems like funfriend is still working on the rest of the collapse memory for now": "похоже развледруг пока всё ещё работает над остатком вспоминания обрушения",
        "time to get into the collapse, buddy": "время забираться в обрушение, дружище",
        "if those were two of the memories she chose to store, what are these other ones??": "если это два из вспоминаний которые она решила сохранить, то что на тех других??",
        "jesus... well that first memory lines up with what akizet told gordon. but why would she go to us if they agreed to keep it quiet?": "боже... ну первое вспоминание сходится с тем что акизет сказала гордону. но зачем идти к нам если они согласились держать всё в тайне?",
        "holy smokes. yeah i don't think we ever heard about this part of the call... hey--there's another memory that's been fixed, open it": "етить колотить, дааа не думаю что мы хоть раз слышали об этой части зова... эй--там ещё одно вспоминание починено, открой его",
        "this is the most dense thoughtform i think i've ever seen... they have such a strange way of storing data": "это вообще самая плотная мыслеформа из всех что мне когда-либо встречались... их способ хранения данных такой странный",

        "about the embassy": "о посольстве",

        "better times": "ХОРОШИЕ ВРЕМЕНА",
        "discovery": "ОТКРЫТЬЕ",
        "suspicion": "ПОДОЗРЕНЬЕ",
        "collapse": "ОБРУШЕНЬЕ",
        "recollection": "вспоминание",

        "experience": "испытать",
        "new iteration": "новая итерация",
        "load iteration": "загрузить итерацию",
        "save iteration": "сохранить итерацию",
        "save": "сохраниться",

        "join the chat": "присоединиться к разговору",
        "chat": "поговорить",
        "convene": "созвать",

        "akizetesche": cor_ru.entity_menu["akizetesche"].name,
        "think to self": "подумать про себя",
        "ruminate over cyst": "размышлять о цисте",

        "gakvu": cor_ru.entity_menu["gakvu"].name,
        "toggle cloak": "переключить накидку",
            "ok": "хорошо",
            "sure": "конечно",
            "no problem": "без проблем",
            "really? now? all right": "серьёзно? в такой θмиг? ладно",
            "ok akizet": "ага акизет",

        "tozik": cor_ru.entity_menu["tozik"].name,
        "cavik": cor_ru.entity_menu["cavik"].name,
        "kazki": cor_ru.entity_menu["kazki"].name,
        "bozko": cor_ru.entity_menu["bozko"].name,

        "tir qou": cor_ru.entity_menu["tir qou"].name,
        "kiv qou": cor_ru.entity_menu["kiv qou"].name,
        "jut qou": cor_ru.entity_menu["jut qou"].name,
        "vel qou": cor_ru.entity_menu["vel qou"].name,

        "it is locked": "заперто",

        "container": cor_ru.entity_menu["container"].name,
        "attendant": cor_ru.entity_menu["attendant"].name,
        "movefriend": cor_ru.entity_menu["movefriend"].name,
        "my seat": cor_ru.entity_menu["my seat"].name,
            "start the meeting": "начать совещанье",
        "barfriend": cor_ru.entity_menu["barfriend"].name,
        "orange simulacrum": cor_ru.entity_menu["orange simulacrum"].name,
            "sip-u-lacrum": "сюрп-лякр",
                "THE SIMULACRUM STAYS THE SAME, BUT THE TASTE REGISTERS CLEARLY": "СИМУЛЯКР ОСТАЕТСЯ ПРЕЖНИМ, ОДНАКО ВКУС ВОСПРИНИМАЕТСЯ ЧЁТКО",
                "THE BRIGHTNESS OF IT DISTORTS MY FEATURES AND SENDS MY RECEPTORS INTO A REFLEXIVE CURL": "ЕГО ЯРКОСТЬ ИСКАЖАЕТ МОИ ЧЕРТЫ И ПОСЫЛАЕТ РЕЦЕПТОРЫ В НЕПРОИЗВОЛЬНЫЙ ЗАВИТОК",
                "STRONG!! BUT THE CITRUS INSPIRES A PLEASANT SATIATION": "КРЕПКИЙ!! НО ЦИТРУС ВЫЗЫВАЕТ ПРИЯТНОЕ ЧУВСТВО НАСЫЩЕНья",
        "veilklight": cor_ru.entity_menu["veilklight"].name,
        "rejuvenation chamber": cor_ru.entity_menu["rejuvenation chamber"].name,
        "kalstik stand": cor_ru.entity_menu["kalstik stand"].name,
        "face stand": cor_ru.entity_menu["face stand"].name,
        "cyst cluster": cor_ru.entity_menu["cyst cluster"].name,
        "cyst pile": cor_ru.entity_menu["cyst pile"].name,
        "clothing storage": cor_ru.entity_menu["clothing storage"].name,
        "listener": cor_ru.entity_menu["listener"].name,
        "timestopper": cor_ru.entity_menu["timestopper"].name,
        "window": cor_ru.entity_menu["window"].name,
        "simulacra dispensary": cor_ru.entity_menu["simulacra dispensary"].name,

        // suspicion
        "mystery cyst": cor_ru.entity_menu["mystery cyst"].name,
            "examine": "осмотреть",
                "echo": "эхо",

        "i should check the cyst first": "сперва стоит взглянуть на цисту",
      
        // collapse part 1
        'IT IS TOO DANGEROUS, WE MUST DESTROY THESE FOES': "СЛИШКОМ ОПАСНО, МЫ ДОЛЖНЫ УНИЧТОЖИТЬ ЭТИХ ВРАГОВ",

        'damaged qou body': "повреждённое куу-тело",
        'mangled qou body': "растерзанное куу-тело",
            "free their mind": "вызволить разум",

        "mindcores": cor_ru.entity_menu["mindcores"].name,
        "itzil": "итзил",
        "karik": "карик",

        "miltza": cor_ru.entity_menu["miltza"].name,

        "qou body": cor_ru.entity_menu["qou body"].name,
        "summarizer": cor_ru.entity_menu["summarizer"].name,
        "hostile container": cor_ru.entity_menu["hostile container"].name,
        "hostile veilklight": cor_ru.entity_menu["hostile veilklight"].name,

        "simulacra": cor_ru.entity_menu["simulacra"].name,
            'this is no time for refreshments': "не время для угощений",
        "storage display": cor_ru.entity_menu["storage display"].name,
        "bright weapons": cor_ru.entity_menu["bright weapons"].name,
        "conspicous container": "приметный контейнер", 
            "search": "обыскать",
        "unkind eye": cor_ru.entity_menu["unkind eye"].name,
            "comment": "прокомментировать",
            /*akizet*/ "this is a disturbing mural...": "это довольно тревожущая фреска...",
            /*gakvu*/ "you think so?": "думаешь?",
            /*gakvu*/ "i think it is kind of funny": "а мне она кажется смешною",
            /*akizet*/ "funny???": "смешною???",
            /*tozik*/ "i think so too, actually": "я тоже так думаю, на самом деле",
            /*tozik*/ "it is a comically spiteful depiction...": "это до комичности язвительное изображенье...",
            /*tozik*/ "this would be quite popular in coastal ekiva": "она бы пользовалась популярностью в прибрежной экиве",
            /*sourceless*/ "THEY WOULD SLUDGE THIS IN VAZNI": "В ВАЗНИ ЭТО БЫ РАСПЛЫЛИ",
            /*sourceless*/ "TRULY A SATIRE ONLY AN EKIVIK COULD CONCOCT": "ПОИСТИНЕ САТИРА, КОТОРУЮ ПРИДУМАТЬ ПОД СИЛУ ТОЛЬКО ЭКИВИКУ",
        "sculptor": cor_ru.entity_menu["sculptor"].name,
        "veilk models": cor_ru.entity_menu["veilk models"].name,
        "damaged golem": cor_ru.entity_menu["damaged golem"].name,
        "tendrils": cor_ru.entity_menu["tendrils"].name,
        "movefoe": cor_ru.entity_menu["movefoe"].name,

        "bstrd": "свлчь",
        "bstrd door": cor_ru.entity_menu["bstrd door"].name,
            "open?": "открыть?",
        "unnerving cyst": cor_ru.entity_menu["unnerving cyst"].name,
            "take": "взять",
        "peculiar obelisk": cor_ru.entity_menu["peculiar obelisk"].name,
        "archive": cor_ru.entity_menu["archive"].name,
        "archival golem": cor_ru.entity_menu["archival golem"].name,
        "jutskin": cor_ru.entity_menu["jutskin"].name,
        "bstrdlight": cor_ru.entity_menu["bstrdlight"].name,
        "pain shelf": cor_ru.entity_menu["pain shelf"].name,
        "bstrd golem": cor_ru.entity_menu["bstrd golem"].name,
        /*unity that bastard*/
        'WTF': "ВТФ",
        'that sounds cool but i got biz here': "звучит клева но у мня тут дела",
        'mayb3 LATA :p': "м0ж ПОЗГЖЕ :р",
        /*unity that bastard - now golem flavored!*/
        "BUSY KILLING U RN": "Я ТУТ ТЯ ВАПЩЕТ УБИВАЮ",
    }, 
    entityDescriptions: {
        // recollections
        "recollection::Aæ§<äYf¹L": `::ЭМПИРИЧЕСКАЯ МЫСЛЕФОРМА
    ::НЕВИЗУАЛИЗИРУЕМА
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'пункт назначения превышает порог бессвязности';'рекомендуется починка'">::ЗАПРЕДЕЛЬНАЯ БЕССВЯЗНОСТЬ</span>`,
        "recollection::ø¥¬À‰": `::ЭМПИРИЧЕСКАЯ МЫСЛЕФОРМА
    ::НЕВИЗУАЛИЗИРУЕМА
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'пункт назначения превышает порог бессвязности';'рекомендуется починка'">::ЗАПРЕДЕЛЬНАЯ БЕССВЯЗНОСТЬ</span>`,
        "recollection::„²!Äë±#Rã": `::ЭМПИРИЧЕСКАЯ МЫСЛЕФОРМА
    ::НЕВИЗУАЛИЗИРУЕМА
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'пункт назначения превышает порог бессвязности';'рекомендуется починка'">::ЗАПРЕДЕЛЬНАЯ БЕССВЯЗНОСТЬ</span>`,
    
        "recollection::discovery": cor_ru.entity_menu["recollection::discovery"].desc,
        "recollection::suspicion": cor_ru.entity_menu["recollection::collapse"].desc,
        "recollection::suspicion": cor_ru.entity_menu["recollection::collapse"].desc,

        // main obesk
        "akizetesche": cor_ru.entity_menu["akizetesche"].desc,
        "cavik": cor_ru.entity_menu["cavik"].desc,
        "bozko": cor_ru.entity_menu["bozko"].desc,
        "kazki": cor_ru.entity_menu["kazki"].desc,
        "tozik": cor_ru.entity_menu["tozik"].desc,
        "gakvu": cor_ru.entity_menu["gakvu"].desc,
        "miltza": cor_ru.entity_menu["miltza"].desc,

        // discovery
        "container": cor_ru.entity_menu["container"].desc,
        "movefriend": cor_ru.entity_menu["movefriend"].desc,
        "attendant": cor_ru.entity_menu["attendant"].desc,
        "my seat": cor_ru.entity_menu["my seat"].desc,
        "barfriend": cor_ru.entity_menu["barfriend"].desc,
        "orange simulacrum": cor_ru.entity_menu["orange simulacrum"].desc,
        "veilklight": cor_ru.entity_menu["veilklight"].desc,
        "rejuvenation chamber": cor_ru.entity_menu["rejuvenation chamber"].desc,
        "kalstik stand": cor_ru.entity_menu["kalstik stand"].desc,
        "face stand": cor_ru.entity_menu["face stand"].desc,
        "cyst cluster": cor_ru.entity_menu["cyst cluster"].desc,
        "cyst pile": cor_ru.entity_menu["cyst pile"].desc,
        "clothing storage": cor_ru.entity_menu["clothing storage"].desc,
        "listener": cor_ru.entity_menu["listener"].desc,
        "timestopper": cor_ru.entity_menu["timestopper"].desc,
        "window": cor_ru.entity_menu["window"].desc,
        "simulacra dispensary": cor_ru.entity_menu["simulacra dispensary"].desc,
        "tir qou": cor_ru.entity_menu["tir qou"].desc,
        "jut qou": cor_ru.entity_menu["jut qou"].desc,
        "kiv qou": cor_ru.entity_menu["kiv qou"].desc,
        "vel qou": cor_ru.entity_menu["vel qou"].desc,

        // suspicion

        "mystery cyst": cor_ru.entity_menu["mystery cyst"].desc,
                
        // collapse part 1

        "disrupted movefriend": `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ назначенье::'вспоминание';'соединитель'
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'один из многих во плоти посольства';'выведен из строя атакой'</span>`,
        "mindcores": cor_ru.entity_menu["mindcores"].desc,
		"qou body": cor_ru.entity_menu["qou body"].desc,
        "summarizer": cor_ru.entity_menu["summarizer"].desc,
        "hostile container": cor_ru.entity_menu["hostile container"].desc,
        "hostile veilklight": cor_ru.entity_menu["hostile veilklight"].desc,
        "simulacra": cor_ru.entity_menu["simulacra"].desc,
        "storage display": cor_ru.entity_menu["storage display"].desc,
        "bright weapons": cor_ru.entity_menu["bright weapons"].desc,
        "conspicous container": `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'вот эти иногда трясутся, словно у них личиночный жар'</span>`, 
        "unkind eye": cor_ru.entity_menu["unkind eye"].desc,
		"sculptor": cor_ru.entity_menu["sculptor"].desc,
        "veilk models": cor_ru.entity_menu["veilk models"].desc,
        "damaged golem": cor_ru.entity_menu["damaged golem"].desc,
        "tendrils": cor_ru.entity_menu["tendrils"].desc,
        "movefoe": cor_ru.entity_menu["movefoe"].desc,
        "bstrd door": cor_ru.entity_menu["bstrd door"].desc,
        "unnerving cyst": cor_ru.entity_menu["unnerving cyst"].desc,
        "peculiar obelisk": cor_ru.entity_menu["peculiar obelisk"].desc,
        "archive": cor_ru.entity_menu["archive"].desc,
        "archival golem": cor_ru.entity_menu["archival golem"].desc,
        "jutskin": cor_ru.entity_menu["jutskin"].desc,
        "bstrdlight": cor_ru.entity_menu["bstrdlight"].desc,
        "pain shelf": cor_ru.entity_menu["pain shelf"].desc,
        "bstrd golem": cor_ru.entity_menu["bstrd golem"].desc,
    },
}

if (check("embassy_d1_complete")) env.localization.page['embassy'].strings['„²!Äë±#Rã'] = `ПОДОЗРЕНЬЕ`
if (check("fbx__ep2intro-end")) env.localization.page['embassy'].strings['ø¥¬À‰'] = `ОБРУШЕНЬЕ`

setTimeout(()=>{if (document.querySelector(".dayname").getAttribute("aria-label") == "BETTER TIMES") { // --- beech localization
    cor_ru.processSpecificTranslation(document.querySelectorAll(".dayname"), "aria-label");
    document.querySelectorAll(".dayname").forEach(e=>{e.replaceChildren(''); e.insertAdjacentHTML("afterbegin", e.getAttribute('aria-label'))})
    new Lettering('#content .dayname').letters()
    document.querySelectorAll("#content .dayname span").forEach((e, i) => e.style.animationDelay = `${-1 * (i * 0.25)}s`)
}}, 10)


// === DIALOGUES === //


// == MOTH == //

env.localization.page['embassy'].dialogues.mthembresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        about the groundsmindry<+>groundsmindry
            SHOWIF::"ep4__entrance"
        о строении мыслеформы<+>structureloop
            SHOWIF::"embassy__d1_start"
        об обесках<+>obeskloop
        об обрушении<+>collapseloop
            SHOWIF::"embassy__d3_start-end"
        о свлчь<+>bstrd
            SHOWIF::"embassy__d3_bstrdintro-start"
        неважно<+>CHANGE::++moth
            FAKEEND::(назад)
`)
env.localization.page['embassy'].dialogues["mth++embassy"] = generateDialogueObject(`
start
    self
        у меня есть вопрос о посольстве

    moth
        ну, я постараюсь, лол
    
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
        окей<+>loop
            FAKEEND::(назад)


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
        понятно<+>loop
            FAKEEND::(назад)

structureloop
    RESPONSES::self
        игра хуйня<+>gamebad
            SHOWONCE::
            SHOWIF::"embassy__d3_rec_clear-end"
        вообще игра норм<+>gamegood
            SHOWONCE::
            SHOWIF::"mth++embassy-gamebad"
        но ей нужны доработки<+>gameok
            SHOWONCE::
            SHOWIF::"mth++embassy-gamegood"
        смена перспективы?<+>perspective
            SHOWIF::"embassy__d1_start"
        другие вспоминания недоступны?<+>locked
            SHOWIF::[["embassy_d2_complete", true],["embassy_d1_complete", true],["fbx__ep2intro-end", false]]
        назад<+>loop
            FAKEEND::(назад)

obeskloop
    RESPONSES::self
        оружие казки?<+>kazkiguns
            SHOWIF::"embassy__d3r2-end"
        странно выглядящие обески?<+>weirdlook
            SHOWIF::"embassy__d1_start"
        посольство ещё существует?<+>state
        члены команды ещё живы?<+>team
            SHOWIF::"embassy__d1_kazkibozko"
        землемыслец?<+>groundsmind
            SHOWIF::"exm|embassy|attendant"
        что такое кальстик?<+>kalstik
            SHOWIF::"exm|embassy|kalstik stand"
        что такое архивная вена?<+>archives
            SHOWIF::"embassy__d3_bstrdintro-start"

        назад<+>loop
            FAKEEND::(назад)

collapseloop
    RESPONSES::self
        кавик?<+>cavik
        сигнал?<+>signal
        потери?<+>casualties
        нападения вне посольства?<+>otherattacks
        назад<+>loop
            FAKEEND::(назад)

cavik
    self
        АКИЗЕТ ГОВОРИЛА ПРО ТО, ЧТО ИЗ-ЗА КАВИКА... AKIZET SAID SOMETHING ABOUT CAVIK...
        ИХ МОГУТ УБИТЬ? POTENTIALLY GETTING THEM KILLED?
    
    moth
        ага-п, и я видел<блинскиймоль>... yeah, i saw that too...
        я думаю это воспоминание i think this memory is further ahead than the other ones
        нам точно чего-то не хватает we're definitely missing something

    RESPONSES::self
        понятно<+>collapseloop
            FAKEEND::(назад)

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
        понятно<+>collapseloop
            FAKEEND::(назад)

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
            FAKEEND::(назад)

gameok
    self
        у меня ещё немного мыслей
        игра хорошая, но ей нужны доработки

    moth
        я передам это хакеру который мне её дал
        не сомневаюсь, он сразу же займётся этим
    
    RESPONSES::self
        спасибо<+>structureloop
            FAKEEND::(назад)


gamegood
    self
        вообще игра норм
    
    moth
        ага?
        отлично
    
    RESPONSES::self
        да!!<+>structureloop
            FAKEEND::(назад)          

gamebad
    self
        игра хуйня
    
    moth
        ок, во-первых, это не вопрос
        во-вторых, тебе придётся это как-то терпеть
        единственный способ получить доступ к этим данным - через обрамляющее устройство
        а другое я тебе достать не могу без того чтобы привлечь внимание
    
    RESPONSES::self
        ладно<+>structureloop
            FAKEEND::(назад)

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
        окей<+>collapseloop
            FAKEEND::(назад)
    

kazkiguns
    self
        откуда у казки оружие?

    moth
        one of the internal initiatives the obesk had involved the exchange of materials
        like, everything - from plastic bottles, to assault rifles
        they gave us stuff too, although obviously it was a little one sided...
        this was like 20+ years ago so idk exactly what the circumstances were,
        but when aliens were new, people probably didn't hesitate to give them whatever
    
    RESPONSES::self
        понятно<+>obeskloop
            FAKEEND::(назад)
    

perspective
    self
        почему я могу менять перспективу?
        разве это вспоминание не с точки зрения акизет?
    
    moth
        погодь, то есть до этого у тебя не получалось?
        это встроенная функция, часть патча от ФБКС
        хах... 
        наверн остальные пространственные мыслеформы были слишком нестабильными
        может позже получится, когда развледруг доберётся до них
    
    RESPONSES::self
        было бы хорошо<+>structureloop
            FAKEEND::(назад)

locked
    self
        почему эти два вспоминания не открываются?

    moth
        судя по информации к которой у меня здесь есть доступ,
        эти два разнесло по полной
        определённо есть о чём поговорить с развледругом
        и последнее... етить колотить
        не думаю что твой мыслекол вообще даст визуализировать его?
        оно такое же поломанное, но я могу прочитать что в нём содержатся "агрессивные действия"
        даже если нам его починят,
        твой мыслекол заблокирует симуляции боя
        это что-то типа... законной фигни. помнишь тот громкий суд с майндсай?
        впрочем, есть у меня мысль...
        но вернёмся к ней ток если их вообще починят
    
    RESPONSES::self
        понятно<+>structureloop
            FAKEEND::(назад)


weirdlook
    self
        почему обески так выглядят?

    moth
        ну, развледруг сказал что данные пропали с концами, 
        так что ему пришлось использовать "сетевые подписи" из "коллектива"
        который... можно сказать что это обесковый интернет
        они упоминали его несколько раз в интервью
        особенно когда впервые получили доступ к <em>нашему</em>
        кажись они как следует повеселились пока придумывали их
    
    RESPONSES::self
        и правда<+>obeskloop
            FAKEEND::(назад)

kalstik
    self
        что такое кальстик?
    
    moth
        ни малейшего понятия
        сорян лол
    
    RESPONSES::self
        всё нормально<+>obeskloop
            FAKEEND::(назад)

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
        окей<+>obeskloop
            FAKEEND::(назад)

state
    self
        а посольство ещё существует?

    moth
        посольство <em>существует</em>, но не то же самое что и это
        это рухнуло, расплавилось целиком
____SHOWIF::"ep4__entrancefinal"
        и теперь мы знаем почему
        но узнав я теперь реально не понимаю - на кой чёрт им было строить ещё одно?
        чтобы сохранить лицо?
        может у них есть новая исследовательская команда, разбирающая последствия?
        или может они просто не хотели окончательно бросать нас, несмотря на случившееся
        обески насовсем закрылись после обрушения, так что ответов пока нет

____SHOWIF::["ep4__entrancefinal", false]
        никто особо не знает почему, а после этого обески стали отдаляться
        больше не высылали гостей в города, контакты с ФБКС поредели...
        это было целым событием
        а океан вокруг посольства не восстановился до сих пор
____END
    
    RESPONSES::self
        понятно<+>obeskloop
            FAKEEND::(назад)

team
    self
        а члены команды акизет до сих пор живы?

    moth
        без понятия
____SHOWIF::"ep4__entrancefinal"
        на самом деле, сейчас реально так много вопросов без ответа что у меня даже догадок нет
        может они бежали домой?
        может они всё ещё здесь, работают в своём конфликте
        думаю нам просто придётся выяснить

____SHOWIF::["ep4__entrancefinal", false]
        ну, люди говорят что они все пропали, но...
        ес честно, типа, обески вообще перестали появляться
        не удивлюсь, если они просто вернулись домой
        что бы не случилось в посольстве, оно совсем перепугало их всех
____END
    
    RESPONSES::self
        понятно<+>obeskloop
            FAKEEND::(назад)

groundsmind
    self
        кто такой землемыслец?

    moth
        о, ты не знаешь?
        довольно клёвая штука
        если вкратце, для важных строений они назначают кого-то "землемысльцем"
        землемыслец подключается к такой огромной корруцисте которая воткнута в стены
        и типа как начинает всё просто контролировать
        будто бы становится зданием
        звучит знакомо, не так ли?
        в итоге эта идея вдохновила всю мыслеколовую индустрию
        это один из тех кусочков истории которые постоянно забывают
    
    RESPONSES::self
        понятно<+>obeskloop
            FAKEEND::(назад)


`)


// == MISC == //

env.localization.page['embassy'].dialogues["quality"] = generateDialogueObject(` 
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
`)

env.localization.page['embassy'].dialogues.barfriendresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        апельсиновый сок<+>orange
        неважно<+>END
            EXEC::pauseSwapCam(false)
`)
env.localization.page['embassy'].dialogues["barfriend"] = generateDialogueObject(`
start
    sourceless
        перед витриною с симулякрами стоит бардруг
            EXEC::pauseSwapCam(true)
        меня редко посещает желанье взаимодействовать с ним
        однако сей θвзор один из этих случаев
____SHOWIF::[["netstat|<", 0], ["citystreet_gotdrinks"]]
        тот цитрусовый напиток, что я попробовала в городе посла...
        каким бы ужасным он ни был,
        он что-то пробудил
____SHOWIF::[["netstat|>=", 0]]
        ещё один θвзор в этом светлом мире...
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
        симулякр апельсинового сока, пожалуйста!
    
    barfriend
        хорошо!
    
    sourceless
        бардруг протягивает конечность к витрине с апельсиновыми симулякрами
        она проходит через цистозную стенку, как рука сквозь воду,
        в конце концов извлекая шарообразный стакан, светящийся апельсиновым соком
        хотя... настоящий апельсиновый сок не светится
____SHOWIF::[["netstat|<", 0]]
        но он выглядит классно
____SHOWIF::[["netstat|>=", 0]]
        но он напоминает свеченье спелого сельки
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
`)

env.localization.page['embassy'].dialogues.embassyRelocatorResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        персонал<+>personnel
            SHOWIF::[['EXEC::env.embassy.relocatorReturn != \`personnel\`']]
            HIDEREAD::
        зона отдыха<+>recreation
            SHOWIF::[['EXEC::env.embassy.relocatorReturn != \`recreation\`']]
            HIDEREAD::
        исследованье зова<+>research
            SHOWIF::[['EXEC::env.embassy.relocatorReturn != \`research\`']]
            HIDEREAD::
        неважно<+>END
            EXEC::pauseSwapCam(false);
`)
env.localization.page['embassy'].dialogues["embassyRelocator"] = generateDialogueObject(`
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
        через мгновенье на месте старого прохода открывается новый
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
        через мгновенье на месте старого прохода открывается новый
            EXEC::env.embassy.relocatorDestination('recreation')

    movefriend
        хорошо повеселиться!
    
    RESPONSES::akizet
        спасибо<+>END
            EXEC::pauseSwapCam(false)

research
    akizet
        центр исследованья зова, пожалуйста

    movefriend
        ХОРОШО!
    
    sourceless
        путь, по которому я вошла в переместитель, запечатывается
        через мгновенье на месте старого прохода открывается новый
            EXEC::env.embassy.relocatorDestination('research')

    movefriend
        приятной работы!
    
    RESPONSES::akizet
        спасибо<+>END
            EXEC::pauseSwapCam(false)
`)



// == DISCOVERY == //

env.localization.page['embassy'].dialogues["d1_start"] = generateDialogueObject(` 
start
    sourceless
        моё сознанье возобновляется
        омолаживающая камера раскрывается, и извне струится свеченье цистозного стекла посольства
        сквозь далекое открытье серое я чувствую, что начался новый θвзор

    RESPONSES::akizet
        выйти из камеры<+>emerge
            EXEC::content.classList.add('swapcam')
    
emerge
    sourceless
        я выкарабкиваюсь из камеры, куу-тело - освежённое
        оно ощущается таким же, как сразу после моего вознесенья
        редкое, но чудесное ощущенье - словно я могла бы извернуть его в любую форму
        но меня ждёт работа...
        близится сосредоточённое совещанье моей инициативы по исследованью зова
        и что за дивное событье - в этот раз в нашем распоряженьи особенно необычное оборудованье!
        я должна собрать нашу команду, тогда мы сможем начать
    
    RESPONSES::akizet
        за работу<+>END

SKIP::content.classList.add('swapcam')
`)

env.localization.page['embassy'].dialogues["d1_akizet"] = generateDialogueObject(` 
start
    sourceless
        надо бы проведать команду... наше сосредоточенье близится
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
`)

env.localization.page['embassy'].dialogues["d1_tozik"] = generateDialogueObject(` 
start
    sourceless
        тозик сидит в терминальном кресле, соединённый с времядержцем через рецептор
            EXEC::pauseSwapCam(true);
        временное сжатье, за которое великая циста получила своё названье, не активировано
        должно быть, он пользуется ею только ради архивных связей
        я перебираюсь через изгиб времядержца, чтобы поздороваться с ним

    akizet
        здравствуй, тозик!

    sourceless
        в мимолётном взгляде на меня я вижу его распознанье
            EXEC::vnp({hideStage: true, tozik: "show"})
        однако его вниманье обращено вовнутрь, сквозь корруцистозную вену
        тозика раздражает пустая болтовня, поэтому я решаю не медлить
    
    akizet
        ты подготовился к сосредоточенью?
        вообще, ты именно этим и занимаешься?
    
    tozik
        да
        я упорядочиваю подключенные архивные цисты
        едва ли θподмиг назад произошло кое-что очень интересное
        ты услышишь об этом на сосредоточеньи
    
    akizet
        чудно
        тогда скоро поговорим
    
    RESPONSES::akizet
        простимся<+>END
            EXEC::pauseSwapCam(false);vn.done()
`)

env.localization.page['embassy'].dialogues["d1_gakvuresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        ложная среда?<+>falsee
        жалоба...<+>complaint
        твоя накидка<+>coat
            SHOWIF::'gakpause'
        простимся на сей миг<+>END
            EXEC::pauseSwapCam(false);vn.done()
`)
env.localization.page['embassy'].dialogues["d1_gakvu"] = generateDialogueObject(` 
start
    sourceless
        гакву прислоняется к слушателю, глаза отрешённые
            EXEC::pauseSwapCam(true);
        на одном из её рецепторов расположена циста с ложною средою
        когда я подхожу и наклоняю голову в обе стороны, я не могу разобрать на ней логотипа
        я задаюсь вопросом - это очередная симуляция поверхности? у неё нездоровая одержимость ими
        естественно, это привлекает её вниманье, и она бросает мне весёлый жест рецептором
            EXEC::vnp({hideStage: true, gakvu: "show"})
        
    gakvu
        привет акизет!
        готова к сосредоточенью?

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
        явное расхожденье с базовою линиею
        очень интересно!
    
    akizet
        и что вы сделали?
    
    gakvu
        ты его видела? он кожею с креслом сросся!
        мне пришлось самою носить все архивные цисты и скармливать их времядержцу
        aх, ну конечно не без помощи кавика

    sourceless
        я усмехаюсь, и она тоже, но я чувствую, что по другой причине
    
    gakvu
        тебе нужно ещё что-нибудь?
        иначе я буду здесь до начала сосредоточенья

    sourceless
        мне больно это делать
        но, пожалуй, стоило бы поговорить о той жалобе...
        
    RESPOBJ::d1_gakvuresp

complaint
    akizet
        есть один момент, который я должна упомянуть
        гакву, ты и я, мы понимаем
        однако... равновесье между работою и
    
    gakvu
        бозко!

    sourceless
        что
        бозко уже говорил с нею??
        моё смятенье обнажается в завитках моих рецепторов
    
    gakvu
        разве это был не он?
        я знаю это был он!
        он просто не в ладах с экивиками
        
    sourceless
        я смеюсь и спешно размахиваю руками и рецепторами в отрицаньи
        она тоже смеётся--не сомневаюсь, она ценит моё пониманье сухого экивикового острословья
        
    akizet
        нет-нет, гакву...
        не имеет значенья, кто обратил на это моё вниманье
        я знаю, что тебе нравится работать здесь,
        и, прежде всего, я знаю твою способность разить
        но для некоторых других это не так очевидно
        и если этих жалоб станет слишком много, на меня начнут коситься
        так что, ради меня, 
        
    sourceless
        я задерживаюсь, чтобы подобрать изящный способ выразить это...
        "хотя бы прикидывайся занятою, когда ты здесь"?
        гакву самодовольно скручивает свои рецепторы, прекрасно понимая, что я хочу сказать

    gakvu
        не волнуйся, я понимаю
    
    akizet
        отлично!

    RESPOBJ::d1_gakvuresp

falsee
    akizet
        что это за ложная среда у тебя?

    gakvu
        а! видишь ли,
    
    sourceless
        в движеньи её рецепторов я замечаю непонятную, едва уловимую робость
        однако она тут же пускается в резвое описанье

    gakvu
        вот эта - с моей родины
        воспоминанья бывалого вейлькового прыгуна в форме игры
        значит так: вейльки несутся к погодной стене,
        а ты должна перепрыгивать со одного на другого, пока они всё набирают скорость,
        иначе ты исчезнешь за воздушною границею!!

    sourceless
        по жестикуляции её рецепторов и рук кажется,
        будто она пытается со мною торговаться
    
    akizet
        звучит ужасающе
    
    gakvu
        поэтому и так весело! попробуй как-нибудь

    RESPOBJ::d1_gakvuresp

coat
    akizet
        твоя накидка...
        я никогда не видела её погашенной!
        
    sourceless
        гакву направляет свое вниманье наружу, чтобы уставиться на неё
        она тянет за ложную ткань, покручивая рецепторы в замешательстве
    
    gakvu
        о
        это необычно!
        я никогда её не выключаю
    
    sourceless
        крученье её рецепторов постепенно набирает силу

    gakvu
        что я только что сказала?
            EXEC::ratween(env.bgm, 0.75, 3000);content.classList.add('incoherence')
        "выключаю"?
        это грибок...
        так, нет--это изображенье грибка...
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
        мне правда стоит начать ставить эти штуки на паузу во время разговоров, хихи

    sourceless
        свеченье её накидки вновь продолжается
            EXEC::change("gakpause", false);content.classList.remove('gakpause')

    moth
        любопытно... это была своего рода утечка памяти
            SHOWONCE::
        бессвязность серьёзно подскочила
            SHOWONCE::
        больше так не делай, ок?
            SHOWONCE::

    RESPOBJ::d1_gakvuresp
`)

env.localization.page['embassy'].dialogues["d1_kazkibozkoresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        наше сосредоточенье близится<+>focus
            EXEC::change('PAGE!!d1_kbcollected', true)
        о чём вы говорили?<+>story
        как вы?<+>talk
        простимся на сей миг<+>END
            EXEC::specialCam(false);pauseSwapCam(false);vn.done()
`)
env.localization.page['embassy'].dialogues["d1_kazkibozko"] = generateDialogueObject(` 
start
    sourceless
        БОЛТОВНЯ БОЗКО И КАЗКИ, СТОЯЩИХ У ВНУТРЕННЕЙ СТЕНЫ, ЗАГЛУШАЕТСЯ МНОЖЕСТВОМ ДРУГИХ
            EXEC::pauseSwapCam(true);
        ВЕТВИСТЫЕ РЕЦЕПТОРЫ КАЗКИ ЖЕСТИКУЛИРУЮТ ТАК ЖЕ БУРНО, КАК И ЕЁ РУКИ, ПОКА ОНА ГОВОРИТ С БОЗКО
        ЕГО ВНИМАНье В ОСНОВНОМ ЗАНИМАЕТ θокно, ГДЕ ОН НАБЛЮДАЕТ ЗА ИССЛЕДОВАТЕЛЬСКИМ СУДНОМ БЛИЗНЕЦОВ
        ЕЁ ИСТОРИЯ СТАНОВИТСЯ ВСЁ БОЛЕЕ ОТЧЁТЛИВОЙ ПО МЕРЕ ТОГО, КАК Я ПРИБЛИЖАЮСЬ
    
    kazki
        ... а я сказала, это всё потому, что мой личиночный облик был тиром! и рассказала ему о функции, которую это влечёт за собой...
        даже немного коснулась той истории с раскопок козазни--ну ты её знаешь, э, когда я там только начала работать
    
    bozko
        о, нет

    kazki
        и пока я всё это произносила, мой развледруг пытался меня о чём-то предупредить, но я продолжала говорить...
        закончив, я проверила, о чём - а всё это время он просил меня остановиться!
        оказывается, на лице того близнеца был написан ужас! словно я вдруг захотела бы плеснуть на него кислотою! 
        ахахаха!!

    sourceless
        БОЗКО УСМЕХАЕТСЯ И НЕМНОГО ЗАКАТЫВАЕТ РЕЦЕПТОРЫ
        ОН ОТВОДИТ ВЗГЛЯД ОТ ОКНА НА КАЗКИ, СЛУЧАЙНО ЗАМЕЧАЯ МОЁ ПРИБЫТье
        ЕЩЁ ОДИН НЕБОЛЬШОЙ ЖЕСТ РЕЦЕПТОРОМ, И КАЗКИ ПОВОРАЧИВАЕТСЯ ЛИЦОМ КО МНЕ, ДОВОЛЬНАЯ
            EXEC::specialCam('kazkibozko');vnp({bg: true, kazki: "show", bozko: "show"})

    bozko
        здравствуй, акизет

    kazki
        привет акизет!!
    
    akizet
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
        всё прошло хорошо, но моему собеседнику было любопытно, потому что он до этого не встречал некогда-тиров,
        и поэтому у него был ряд вопросов, не связанных с одобреньем строительства
        больше всего о моих рецепторах...
        которое!! кстати говоря! строительство было одобрено!
    
    bozko
        под какой-то смешок велзи ей пришло в голову поделиться событьями её ранней личиночной работы
    
    sourceless
        ИСТОРИЯ С РАСКОПОК козазни...
        НУ КОНЕЧНО НЕСВЕДУЩИЙ СВЕТЛЫЙ БЛИЗНЕЦ ИСПУГАЛСЯ БЫ ЗА СВОЮ ЖИЗНЬ, УСЛЫШАВ ТАКОЕ

    kazki
        я же ненароком! ему показалось забавным после того, как я разъяснила его страхи!
    
    akizet
        я говорю это с глубоким уваженьем, казки,
        но с учётом того, насколько беспечно ты таким делишься с близнецами,
        твои дипломатические успехи никогда не перестают удивлять

    RESPOBJ::d1_kazkibozkoresp
    
talk
    akizet
        друзья мои, что за вести вы несёте?
        о себе самих, разумеется
        для наших работ нас ждёт сосредоточенье
    
    sourceless
        БОЗКО ЗАГЛЯДЫВАЕТ В РАСЧЁТ θокна
    
    bozko
        вне нашей работы,
        я наблюдал за существами в водах поблизости
        через несколько погружённых големов с ретрансляторами
        вот, взгляни на это--видишь, как они формируют большие организованные облака?

    sourceless
        БОЗКО ТЯНЕТСЯ В θокно, НАРУШАЯ РАБОТУ ДИСПЛЕЯ, ЧТОБЫ ИЗВЛЕЧЬ СОЕДИНИТЕЛЬНУЮ ЦИСТУ ИЗ ЕЁ ВНУТРЕННЕГО РАЗЪЁМА
            EXEC::content.classList.add('bozkoceptor');vnp({fade: true})
        ОН ПРИКРЕПЛЯЕТ ЕЁ К БЛИЖАЙШЕМУ РЕЦЕПТОРУ И НАСТРАИВАЕТ ДИСПЛЕЙ НА ВСПОМИНАНье
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
        ИЗОБРАЖЕНье ВСКОРЕ РАССЕИВАЕТСЯ
            EXEC::content.classList.remove('fishies');vnp({fade: false})
        ПОСЛЕ НЕКОТОРОГО МОЛЧАНья ОН ДРАЗНЯЩЕ УКАЗЫВАЕТ В СТОРОНУ КАЗКИ

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
        у него даже была бронированная кожа, ну вылитый <span definition="ПРИМЕЧАНИЕ::'частичный перевод';'сгенерировано из унаследованного описания'">пещерный страж</span>!
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
        словно он хотел быть со мною! ах, но к этому времени несколько светлых близнецов пришли узнать, чем я занимаюсь...
        так что я простилась и вернулась к своему судну
        и тут я осознала--на наших суднах отсутствует система жизнеобеспеченья, так что, чтобы сохранить ему жизнь... мне нужно было думать!
        своею головою!
    
    akizet
        значит, ты опустошила свою голову
        и держишь его в воздушном кармане?

    kazki
        именно!! хочешь взглянуть???
    
    sourceless
        МОИ РЕЦЕПТОРЫ НЕМНОГО ОБВИСАЮТ, И Я УСМЕХАЮСЬ В НЕВЕРьи
        БОЗКО ОЧЕНЬ ЗАБАВЛЯЕТСЯ МОЕЮ РЕАКЦИЕЮ
        ДЕЙСТВИТЕЛЬНО: ЭТО И ПРОБЛЕМА, И РЕШЕНье, К КОТОРЫМ МОЖЕТ ПРИЙТИ ТОЛЬКО НЕКОГДА-ТИР
    
    akizet
        конечно хочу

    sourceless
        КАЗКИ НАКЛОНЯЕТ ГОЛОВУ ВПЕРЕД, И ЧЕРТЫ ЕЁ ЛИЦА ТАЮТ, А ЦВЕТ КОЖИ СТАНОВИТСЯ ПРОЗРАЧНЫМ
            EXEC::specialCam('kazkihead');content.classList.add('kazkihead')
        ОНА ПУСТАЯ, И ЯСНАЯ, КАК СТЕКЛО СВЕТЛЫХ БЛИЗНЕЦОВ, СОДЕРЖАЩАЯ ЛИШЬ ПРОСТОРНУЮ СФЕРИЧЕСКУЮ ПОЛОСТЬ
        Я ПОВОРАЧИВАЮ ГОЛОВУ ИЗ СТОРОНЫ В СТОРОНУ, ДАЖЕ РЕГУЛИРУЮ ТОЧНОСТЬ ГЛАЗ, НО НЕ ВИЖУ ЕГО
        ПО КРАЙНЕЙ МЕРЕ, НЕ СРАЗУ... НО ВДРУГ ОНО ОКАЗЫВАЕТСЯ ТАМ, СИДЯЩЕЕ НА ЕДВА РАЗЛИЧИМЫХ НИТЯХ СВОЕГО СОБСТВЕННОГО ТВОРЕНья
    
    sys
        ОПОВЕЩЕНИЕ::'обнаружено воспоминание об арахниде';'визуализировать?'

    RESPONSES::sys
        визуализировать<+>arthur
            EXEC::content.classList.add('spider')
        пропустить<+>arthur

arthur
    sourceless
        ОНО СМОТРИТ НА МЕНЯ, ПОТОМ ПОДНИМАЕТ ПЕРЕДНИЕ ЛАПЫ И МАШЕТ ИМИ В РАЗНЫЕ СТОРОНЫ
        Я ПРЕДСТАВЛЯЮ, ЧТО ЭТО СВОЕГО РОДА УГРОЗА
    
    akizet
        я вижу, почему ты решила взять его себе
    
    sourceless
        КАЗКИ СНОВА РАЗМЕЩАЕТ ЧЕРТЫ СВОЕГО ЛИЦА И ПРИТЯГИВАЕТ ГОЛОВУ ОБРАТНО
            EXEC::specialCam('kazkibozko');content.classList.remove('kazkihead')
    
    kazki
        столько жизни в этих крохотных глазках!
            EXEC::content.classList.remove('spider');vnp({kazki: "defocus"})

    RESPOBJ::d1_kazkibozkoresp

focus
    akizet
        наше сосредоточенье близится, друзья
        вы готовы? есть ли у вас темы для обсужденья?
    
    sourceless
        ОНИ УТВЕРДИТЕЛЬНО КИВАЮТ РЕЦЕПТОРАМИ

    kazki
        да!
    
    akizet
        отлично! явитесь в камеру сигнала, когда будете готовы
        я распорядилась, чтобы в этот раз мы воспользовались времядержцем, так что всё будет быстро
    
    bozko
        замечательно
        мы скоро будем, иди без нас

    RESPOBJ::d1_kazkibozkoresp
`)

env.localization.page['embassy'].dialogues["d1_kazki_research"] = generateDialogueObject(`
start
    akizet
        готова приступить, казки?
    
    kazki
        <span definition="ПРИМЕЧАНИЕ::'распространённая фраза';'оригинальный каламбур непереводим';'сгенерирован альтернативный каламбур';'сохраняет уровень юмора'">безкуусловно!</span>
    
    akizet
        хехе, замечательно
    
    RESPONSES::akizet
        мы скоро начнём<+>END
`)

env.localization.page['embassy'].dialogues["d1_bozko_research"] = generateDialogueObject(`
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
`)

env.localization.page['embassy'].dialogues["d1_cavikresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        наше сосредоточенье близится<+>focus
        теория замкнутой петли?<+>theory
        как ты?<+>talk
        простимся на сей миг<+>END
            EXEC::pauseSwapCam(false);vn.done()
`)
env.localization.page['embassy'].dialogues["d1_cavik"] = generateDialogueObject(` 
start
    sourceless
        КАВИК ПЕРЕБИРАЕТ АРХИВНЫЕ ЦИСТЫ, ВРЕМЯ ОТ ВРЕМЕНИ КРЕПЯ ПО ОДНОЙ К СВОЕМУ РЕЦЕПТОРУ
            EXEC::pauseSwapCam(true);
        ОНИ ЛЕЖАТ АККУРАТНЫМИ КУЧКАМИ, ОТСОРТИРОВАННЫЕ ПО ОТТЕНКУ ИХ ВНУТРЕННОСТЕЙ
        ПУСТЬ ЕГО РЕГУЛЯРНЫЙ УХОД И ГАРАНТИРУЕТ, ЧТО НИ ОДНА ИЗ НИХ НЕ СТЕМНЕЕТ ИЛИ НАЧНЕТ ГОЛОДАТЬ
        ОН ЧУВСТВУЕТ МОЁ ПРИБЛИЖЕНье И ПОВОРАЧИВАЕТСЯ, РАДУШНО КЛАНЯЯСЬ ГОЛОВОЮ И РЕЦЕПТОРАМИ
            EXEC::vnp({cavik: "show", hideStage: true})
    
    cavik
        акизет! благой взор!
            
    akizet
        и тебе того же, мой друг
        что ты делаешь?

    cavik
        я просто проводил обслуживанье некоторых из наших старых архивов
        и вспоминал прошлое! ооо, сколь дикие и сосредоточенные на обескии теории они когда-то выдвигали!
        есть одна старая, о которой я всё думаю--совместная теория самих сероезковика и азкавинеше!
        они называли её "замкнутой петлёй" - ты когда-нибудь слышала о ней?
    
    akizet
        ах...

    sourceless
        О НЕТ
        РАЗУМЕЕТСЯ Я СЛЫШАЛА
        Я ДОЛЖНА УБЕДИТЬСЯ, ЧТО ОН НЕ СОЧТЁТ УМЕСТНЫМ ПОДЕЛИТЬСЯ ЕЮ СО СВЕТЛЫМИ БЛИЗНЕЦАМИ

    cavik
        такое чувство, что она была задумана как сатира на более абсурдные теории ранней эпохи, но...
        как ни странно, в ней есть что-то захватывающее!
        о--извини, я тебе нужен?
    
    RESPOBJ::d1_cavikresp

focus
    akizet
        наше сосредоточенье близится, мой друг
        ты готов? есть ли у тебя темы для обсужденья?
    
    sourceless
        Я ЧУВСТВУЮ НЕЛОВКОСТЬ В ЕГО ПОЗЕ

    cavik
        ааа!! неужели время уже пришло?
        ох, у этих старых цист нет временного сжатья... ничего удивительного!
        а, да, да, я буду готов!
        да!
    
    akizet
        тебе не нужно на себя давить, друг мой
        оно будет простым
    
    cavik
        знаю, я просто ненавижу, когда так происходит
        мне нечего принести в этот раз... но я буду готов!
    
    akizet
        прекрасно
    
    RESPOBJ::d1_cavikresp
    
theory
    sourceless
        НЕ ХОТЕЛОСЬ БЫ МНЕ ГУБИТЬ ЕГО ИЗЫСКАТЕЛЬНЫЙ ДУХ
        НО ЭТИ РАННИЕ ТЕОРИИ НЕСУТ В СЕБЕ МЕНЬШЕ ПОЛЬЗЫ, ЧЕМ <span definition="ПРИМЕЧАНИЕ::'частичный перевод';'сгенерировано из унаследованного описания'">НАСТЕННАЯ ГНИЛЬ</span>
        ОСОБЕННО ОТ СЕРОЕЗКОВИКА, УЛЫБНЁТСЯ ЕМУ ВЕЛЗИ
    
    akizet
        замкнутая петля...
        это та про уп--
    
    cavik
        управленье временем!! да! позволь мне напомнить!
        сероезковик утверждал, что в одну эпоху... мы научимся использовать среду серое для четырёхмерного перемещенья в пространстве
        и, в конце концов, мы из будущего обнаружим родину светлых близнецов, вот только слишком поздно, чтобы их встретить
        так что--мы создадим открытье, как раз достаточное для того,
        чтобы послать сообщенье самим себе из настоящего и обозначить его местоположенье!

    sourceless
        ОХ, КАВИК
        Я БЕЗДУМНО КРУЧУ РЕЦЕПТОРАМИ, НЕЧАЯННО ВЫДАВАЯ СВОЙ СКЕПТИЦИЗМ
        
    cavik
        ну вот--я знаю, ты наверняка считаешь её несуразной, 
        и она такая и есть! особенно в продолженьи, хихи
        но разве она не неизбежна в то же время?
        в наших θсмертях хватит времени, чтобы разгадать любую тайну--в том числе и управленье временем!
    
    akizet
        во-первых...
        по-моему, сероезковик не понимал в тот момент всех последствий созданья открытья внутри планеты
        ты знаешь, это было до инцидента с общею луною
        и, управленье временем... 
        если оно нам когда-нибудь вообще удастся,
        ошибки, породившие нас и наш мир, были бы постепенно исправлены
    
    cavik
        но мы бы никогда не узнали, что они бы исправлялись, правда? всё просто бы "было"!
        так или иначе, я не буду всерьёз спорить с тобою--это всего лишь небольшая забава
    
    sourceless
        НА ВСЯКИЙ СЛУЧАЙ...
    
    akizet
        да, конечно!
        и--ты не станешь делиться ею с близнецами, правильно?

    sourceless
        Я ВИЖУ ЕГО УНЫНье, ДАЖЕ КОГДА ОН ПЫТАЕТСЯ СКРЫТЬ ЕГО ПОД АРХИВНОЮ ЦИСТОЮ
        КАКОЙ БЕЗРАДОСТНОЙ Я, ДОЛЖНО БЫТЬ, КАЖУСЬ, ТАКАЯ УЖАСНАЯ ИНВЕРСИЯ НАШЕЙ МОЛОДОСТИ
        НО Я БЫ ПРАВДА ПРЕДПОЧЛА НЕ ЗАНИМАТЬСЯ УСТРАНЕНьеМ ОЧЕРЕДНОГО ИНЦИДЕНТА С ИЗЛИШНИМИ ОТКРОВЕНьяМИ
    
    cavik
        аки...
        у меня и в мыслях не было, чтобы делиться <em>подобным</em>.
        ты правда так подумала?
        я знаю, что оступился, но
    
    akizet
        кавик, кавик! я верю тебе, будь спокоен
        ты знаешь, какой я должна быть в эти времена
        не чувствуй себя виноватым
    
    cavik
        конечно, нет, нет, я понимаю

    sourceless
        ¥ИÁÈъæб4
        ОЧЕРЕДНАЯ МАЛЕНЬКАЯ СМЕРТЬ, КОТОРАЯ ТЕПЕРЬ БУДЕТ ПРЕСЛЕДОВАТЬ МЕНЯ
    
    RESPOBJ::d1_cavikresp

talk
    akizet
        кавик, друг мой, расскажи
        что за вести ты несёшь?
        нравится ли тебе твоя роль?
        у нас уже не так часто есть время для простых разговоров

    cavik
        очень нравится! океан и правда завораживает, совсем не как дома
        видела бы ты все артефакты, которые близнецы просто отдают воде!
        и на наших экспедициях столько маленьких созданий приплывают поглазеть на наши суда
        бозко тебе не рассказывал о том, которого взял?
    
    sourceless
        В ЭТОТ МОМЕНТ Я УСЛЫШАЛА В ЕГО ГОЛОСЕ ОТГОЛОСОК ЛИЧИНОЧНОЙ РАДОСТИ
        НО ПО ЕДВА ЗАМЕТНОМУ ПОВОРОТУ РЕЦЕПТОРА Я ВИЖУ, ЧТО ОН ЧУВСТВУЕТ, НЕ НАДО БЫЛО ЭТО ГОВОРИТЬ <-- вообще странное. сожалеет об этих словах?
    
    cavik
        ему ведь можно, так?
        если что, тебе вейльк шепнул, не я
    
    akizet
        хаха! конечно! всё в полном порядке
        ну, землемыслец говорит, что не стоит, поскольку близнецы могут рассердиться, но...
        мне всё равно
        расскажи мне - вносил ли ты ещё какой-нибудь вклад в проект по <span definition="ПРИМЕЧАНИЕ::'частичный перевод';'сгенерировано из унаследованного описания'">капсулам жизни</span>?
    
    cavik
        ааа! нет! уже давненько
        но я слышал, им недавно удалось отослать "зерно" на обескию
        разумеется, его пока что поместили в глубокий карантин, однако...
        то, что это сработало, уже само по себе многообещающе
        даже если циста была больше, чем мы вместе взятые!

    akizet
        удивительно, мне стоит связаться с ними и узнать, как они это сделали
        по мере продолженья торговли, представляю, органические материалы станут следующим скачком в отношеньях
        если у тебя вновь появится время, тебе стоит присоединиться к работе!
        последний раз, как я говорила с командою, они спрашивали, когда увидят тебя снова
    
    cavik
        серьёзно??
        и правда стоит! я их как-нибудь проведаю!
    
    RESPOBJ::d1_cavikresp
`)

env.localization.page['embassy'].dialogues["d1_attendantresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        времядержец<+>timestopper
        это всё<+>leave
            FAKEEND::(уйти)
`)
env.localization.page['embassy'].dialogues["d1_attendant"] = generateDialogueObject(` 
start
    sourceless
        Я ПОДХОЖУ К СЛУЖЕБНОМУ ДРОНУ
            EXEC::pauseSwapCam(true)
        НА ДАННЫЙ МОМЕНТ ОН БЕЗЛИК
        ТАК ЧТО ОН ВСТРЕЧАЕТ МЕНЯ ПРОСТЫМ ВЗГЛЯДОМ

    RESPONSES::akizet
        поговорить с землемысльцем<+>groundsmind
        неважно<+>END
            EXEC::pauseSwapCam(false);
    
groundsmind
    akizet
        землемысльца, пожалуйста

    attendant
        КОНЕЧНО!

    sourceless
        СЛУГА ВЫПРЯМЛЯЕТСЯ, И ПО ЕГО КОЖЕ ПРОБЕГАЕТ СОЕДИНИТЕЛЬНАЯ РЯБЬ
        СИМВОЛ НАШЕГО ЗЕМЛЕМЫСЛЬЦА ОБРАЗУЕТСЯ НА ЕГО ЛИЦЕВОЙ ПАНЕЛИ
            EXEC::content.classList.add('groundsminded')
        
    akizet
        привет векоа!!
    
    groundsmind
        акизетеше. говори

    RESPOBJ::d1_attendantresp
    
timestopper
    akizet
        я признательна за то, что ты предоставила нам времядержец
        можешь напомнить, на сколько он у нас?

    groundsmind
        изначально он был уделён вам всего на несколько θвзоров... 
        однако: как по состоянью несколько θподмигов назад, он бессрочно находится на попеченьи инициативы зова
        расписанье сдвинулось в связи с тем, что отделенью материалов больше не требуется предстоящая симуляция
        как только он понадобится другой инициативе, он будет передан

    akizet
        неужели? ради него мы перенесли довольно много цистерии,
        и всё равно только верхушка едва помещается в комнату...
    
    groundsmind
        это просьба убрать его после окончанья использованья?
        подобное может быть организовано
    
    akizet
        ммм... нет, нет
        те цисты не были так важны, а он может оказаться преимуществом
        он на порядки сокращает наши собранья и планы
        если он станет проблемою, я обращусь к тебе

    RESPOBJ::d1_attendantresp

leave
    akizet
        это всё!
    
    groundsmind
        превосходно
        простимся
    
    sourceless
        СЛУГА ОТКЛЮЧАЕТСЯ ОТ ЗЕМЛЕМЫСЛЬЦА И СНОВА ЗАМИРАЕТ
            EXEC::content.classList.remove('groundsminded')
    
    RESPONSES::akizet
        уйти<+>END
            EXEC::pauseSwapCam(false);

END::content.classList.remove('groundsminded');
`)

env.localization.page['embassy'].dialogues["discovery_notyet"] = generateDialogueObject(` 
start
    sourceless
        вот где я буду сидеть...
        как только соберу всю команду.
        гакву, тозик и кавик все здесь
        все, кроме казки и бозко
        я должна сказать им, что пришло время для сосредоточенья
        они, скорее всего, в зоне отдыха!
    
    RESPONSES::akizet
        в зону отдыха!<+>END
`)
env.localization.page['embassy'].dialogues["discovery"] = generateDialogueObject(` 
start
    sourceless
        моя команда собрана вокруг своих мест, так что я сажусь
    
    akizet
        мои друзья!
        давайте же приступим
    
    sourceless
        я киваю головою в сторону тозика, поскольку он уже подключён
        импульсом он приказывает великой цисте опустить проводные цисты перед каждым из нас
        какая редкостная возможность! я уверена, в восторге даже гакву
        я подношу цисту к правому рецептору, и её оболочка смягчается, становясь чуть ли не вязкою жидкостью
        она оседает на моём рецепторе, и времядержец соединяется со мною
        моё сознанье втягивается в него, к остальным - все подключены
            EXEC::content.classList.add('innerfocus')
    
    akizet
        начинаем!
            EXEC::env.embassy.setFocus('akizet')
    
    sourceless
        вспомогательная нервная обработка великой цисты запускается простейшею командою
        её мощность и скорость обработки настолько огромны, что время... останавливается
        какое необычное ощущенье - наблюдать в полном сознаньи за миром и телом, не способными двигаться
        пусть ядра наших разумов все наделены раздельными оболочками
        за каждым из нас влечётся новый разум, словно бы он всегда был частью нас - великая циста
            EXEC::content.classList.add('showfocus')
        и она думает вместе с нами как единое целое
            EXEC::content.classList.add('cull-stage')
    
    timestopper
        разве не удивительно?
            EXEC::env.embassy.setFocus(false)
        ахаха! как весело! 
        ооо но я не отличаю чужие мысли от собственных
        как, ещё раз, нам разделяться?
        глупышка! прошлый раз был не так уж и давно
        но я тебе напомню
        это делается вот так
    
    sourceless
        мы понимаем с лёгкостью: думать наружу

    akizet
        видишь?
            EXEC::env.embassy.setFocus('akizet')
        напомню о рекомендуемой практике...
        передавать важную информацию проще нераздельно
        но во время дискуссий вам стоит оставаться раздельными
        всем понятно?

    timestopper
        да! да! да стой
        да оо мне кажется да
        я повторяюсь извините да
    
    cavik
        извините это был я
            EXEC::env.embassy.setFocus('cavik')
        я только второй раз пользуюсь чем-то подобным
    
    timestopper
        всё в порядке!
    
    kazki
        ты слишком напряжён!
            EXEC::env.embassy.setFocus('kazki')
        просто пропускай их сквозь себя!
        я так и прекращаю эхо
    
    timestopper
        все готовы? да! хорошо
            EXEC::env.embassy.setFocus(false)
        приступим к делам зова
    
    sourceless
        между нами передается огромное количество информации
        давно назревшие обсужденья и планированье экспедиций
        во мгновенье ока, быстрое даже в искажённом времени великой цисты,
        бессловное знанье понимается, наделённое словами лишь в запоздалой мысли
    
    timestopper
        Êӳ€ßԊѳҴÞЯùãÝ™÷ӱ́Й›ö±Й¨õ*ЙЯôмҖҖóŒЙéóӸӬ̄Ѣ́
        óêн̃Фò…н̃ôð¨н̃AðԘòИԓ_ô°ԓ€õиԓ
        ÿßÅӱ́ýÞhѳДÞáøþЙҵ öøЛÆó]Ӱ́äðлӰ́©í¾Ѣ́˜é×Ѣ́9
        ôӬÞó]á‘óЫåAô)êô
    
    sys
        ВНИМАНИЕ::'большое количество необрабатываемых данных';'продвижение потока к следующим связным данным'
            EXEC::flash(true)
    
    sourceless
        ...
            EXEC::env.embassy.setFocus('kazki')
        ...
            EXEC::flash(false)
    
    timestopper
        ПОЛИГОНИЗАЦИОННЫЙ ШПИЛЬ В ГУАМЕ ПОЖАЛУЙ ПРОЩЕ ВСЕГО
        КАЗКИ СОГЛАСНА?
    
    kazki
        да! я организую встречу
        в прошлый раз им понравилось наше посещенье потому что оно привлекло много вниманья!
        так что шпиль был бы выгоден для обеих сторон!

    bozko
        ему не обязательно быть огромнейших прочности или качества
            EXEC::env.embassy.setFocus('bozko')
        у меня нет достоверных данных, подтверждающих моё решенье
        но... контакты казки не раз предлагали жёлоб
        и если то что они говорят - правда, 
        это одно из наименее изученных мест на их планете
        так что есть определённые шансы что источник может находиться там, никем не найденный

    timestopper
        имеет смысл! не спорю!
        всё равно нет других зацепок ахаха
        что-нибудь ещё прежде чем мы разойдемся?
        нет
        погодите да у нас есть пик
        смотрите!
    
    sourceless
        пред нашим общим ментальным взором возникает визуализация сигнала
            EXEC::env.embassy.setFocus(false);content.classList.add('signal')
        необычный пик... но неудивительный, учитывая близость открытья серое
    
    timestopper
        необычно
        эта частота выглядит неестественно
        слишком далеко от базовой линии зова
        может это ошибка?
        отнюдь - это совокупные данные слушателей по всей планете
        не поспособствовало полигонизации к сожаленью
        так что нам с ним делать?
        просто отметить?
    
    tozik
        подождите

    sourceless
        из архивной цисты появляются идентичные запомненные данные
            EXEC::env.bgm.rate(0.9);content.classList.add('signal2')
        он случайно вывел ту же самую запись?
            EXEC::env.bgm.rate(0.8)
        нет... она отличается
            EXEC::env.bgm.rate(0.7)
    
    tozik
        я перебрал примерно двенадцать θглаз данных
        такое уже случалось. видите?
        тот же тип пика, с тою же продолжительностью
    
    timestopper
        сколько θглаз назад это было? семь? восемь?
    
    gakvu
        смотрите
            EXEC::content.classList.add('signal3')
        он идеально равноудалён от начала зова
    
    tozik
        именно
        точно такой же пик, точно на пятидесяти процентах зова
    
    timestopper
        как это возможно? может ли это быть совпаденьем?
        ни в коем случае
    
    tozik
        я такое уже видел
            EXEC::env.embassy.setFocus('tozik')
        в моих ранних исследованьях, быть может даже личиночных
        это признаки сырой мысли - неоптимизированной, первобытной
        то, что корру знает и передает инстинктивно,
        и то, что корруцистозные первопроходцы использовали для связи
    
    sourceless
        чуждый ужас расползается по нашему общему сознанью
        почему я тоже его чувствую? это от меня? мне страшно?
        это ничего не значит
        
    tozik
        в передаче сырой мысли сигнал подскакивает через равные промежутки времени
        пять равноудалённых раз, единожды в начале
        и никаких записей точного начала нет...
        так что это означает, что он может быть наполовину завершён, если это правда
        
    timestopper
        ...
        но как долго он уже транслируется?
        как мысль может быть такою большою?
        сможем ли мы вообще
        ...
            EXEC::content.classList.remove('signal', 'signal2')

    sourceless
        коготь ужаса вгрызается в меня, парализуя мои мысли
        это от меня?? никто об этом не говорит - возможно, сами в растерянности...
        так кому же страшно? это невыносимо
        мне хочется сорвать цисту со своего рецептора, но я не могу сдвинуться с места
        не перед тем, как отключу временное сжатье
    
    timestopper
        это могло бы быть и чем-то другим
        у нас только две точки данных
        теория убедительна, но нам придётся долго ждать
        мы все согласны с тем, что лучше не стоит никому об этом рассказывать?
        что!
    
    cavik
        погодите, почему! это же просто невероятно!
            EXEC::env.embassy.setFocus('cavik')
        даже наличье такой возможности всё меняет...
        вы ведь понимаете, что это значит?
    
    akizet
        кавик... это не какая-то теоретическая забава
            EXEC::env.embassy.setFocus('akizet')
        разумеется, правда, что она всё меняет...
        но нам всё ещё не хватает данных. так?
    
    timestopper
        верно да нам нужно больше
        нельзя просто так о ней рассказывать
        не до тех пор, пока доказательства неполноценны

    akizet
        есть ли у кого-нибудь разногласья?
    
    sourceless
        я чувствую смесь фрустрации и облегченья
        в самом деле, убедительно, но это всего лишь теория
        судя по реакции команды, даже разглашенье её как возможности было бы большим потрясеньем
        в отсутствии записи предполагаемого первого пика её трудно обосновать
        в любом случае, сей θмиг это не имеет смысла - нам остается только ждать
        я принимаю всеобщее молчанье за подтвержденье
        
    akizet
        прекрасно
        закроем наше заседанье

    timestopper
        всем пока!
            EXEC::content.classList.remove('cull-stage', 'showfocus')

    sourceless
        временное сжатье прерывается. я снимаю цисту со своего рецептора
            EXEC::env.bgm.rate(1)
        в реальном времени мы сидели не дольше, чем длина личиночного вздоха
        но тут же все встают, облегчённые своею свободою
            EXEC::content.classList.remove('innerfocus')
        я кланяюсь головою и рецепторами в сторону команды и возвращаюсь в свои покои
    
    RESPONSES::sys
        завершить вспоминанье<+>END
            EXEC::change("embassy_d1_complete", true);corruRefresh()

SKIPNOTICE::это завершит поток памяти
SKIP::content.classList.remove('cull-stage', 'showfocus');content.classList.remove('innerfocus');change("embassy_d1_complete", true);corruRefresh()
`)



// == SUSPISION == //


env.localization.page['embassy'].dialogues["d2_start"] = generateDialogueObject(` 
start
    sourceless
        Я ПРОБУЖДАЮСЬ ОТ НЕПОДВИЖНОСТИ СВОЕГО ОМОЛОЖЕНья
        сквозь далекое открытье серое я чувствую, что начался новый θвзор
            EXEC::env.embassy.slowCam()

        и пока я выкарабкиваюсь из камеры, я замечаю что-то новое...
            EXEC::specialCam('cystfocus')

        НЕЗНАКОМАЯ ЦИСТА, ЛЕЖАЩАЯ НА МОЁМ СТОЛЕ
        ЭТО ТА, ЧТО Я ОДОЛЖИЛА КАВИКУ, ВОЗВРАЩЁННАЯ В МОЕЙ ДРЁМЕ?
        МОЖЕТ, АРХИВ ДИЗАЙНА С РОДИНЫ, КОТОРЫЙ Я ДАЛА КАЗКИ...
        ИЛИ ЛОЖНАЯ СРЕДА-ИГРА ОТ ГАКВУ?
            SHOWIF::[["embassy__d1_gakvu-false"]]
        СТОИТ ПРОВЕРИТЬ ЕЁ И УБЕДИТЬСЯ
            EXEC::env.embassy.slowCam()

    RESPONSES::akizet
        любопытно<+>END
            EXEC::specialCam(false);pauseSwapCam(false)
`)

env.localization.page['embassy'].dialogues["d2_akizet"] = generateDialogueObject(` 
start
    sourceless
        я обязана проверить эту цисту, иначе она поглотит мои мысли
            SHOWIF::["PAGE!!cystmelted", false]
____SHOWIF::["PAGE!!cystmelted", true]
        есть ещё несколько членов команды, с которыми мне нужно поговорить... это должен быть кто-то, кого я знаю!!
        дай подумать, кто ещё остался?
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
        да, это все
____END

    RESPONSES::akizet
        мои подозренья<+>who
            SHOWIF::["PAGE!!cystmelted", true]
        меня ждёт работа<+>END

who
    sourceless
        об этом могут знать только те, кто присутствовал на сосредоточеньи
        и все они присутствуют в посольстве в это время θвзора
        стоит поговорить с казки, даже если она всегда кажется невинною
        бозко упорен и я могу себе представить, что он бы предпринял подобное
        потом есть кавик, который... вообще, может и не он
        или, ну, это в его характере - делиться подобными вещами,
        быть может, он получил похожее сообщенье?
        тозик... возможно, порою он бывает странным
        хотя мне сказали, что я "дорога" отправителю, так что вряд ли он
        гакву... пожалуй, её я подозреваю больше всего
        но поговорить следует с каждым

    RESPONSES::akizet
        меня ждёт работа<+>END
`)

env.localization.page['embassy'].dialogues["cyst"] = generateDialogueObject(` 
start
    sourceless
        НЕОБЫЧНО...
            EXEC::pauseSwapCam(true)
        У ЭТОЙ ЦИСТЫ НЕТ ОТЧЁТЛИВОЙ ОБОЛОЧКИ
        РАСЦВЕТАЮЩАЯ СПИРАЛЬ ОТМЕЧЕНА НА НЕЙ... НО Я НЕ ЗНАЮ, ЧТО ОНА ЗНАЧИТ
        ПОЛАГАЮ, СЛЕДУЕТ ЕЁ ПРИМЕРИТЬ И ПОСМОТРЕТЬ, ЧТО ТАМ ТАКОЕ

    sys
        ВНИМАНИЕ::'событие необходимо для продолжения потока;'пропустить?'
            SHOWIF::"embassy__echo3"
    
    RESPONSES::akizet
        подключиться<+>connection
        оставить<+>END
            EXEC::pauseSwapCam(false);

    RESPONSES::sys
        пропустить<+>END
            SHOWIF::"embassy__echo3"
            EXEC::change("PAGE!!akiroomunlocked", true);change("PAGE!!cystmelted", true);content.classList.add('cystmelted');step();pauseSwapCam(false);
            FAKEEND::(пропустить событие)

connection
    sourceless
        Я ПОДНОШУ ЦИСТУ К РЕЦЕПТОРУ И ПОДСОЕДИНЯЮ ЕЁ
        ПОСЛЕ НЕБОЛЬШОЙ ЗАДЕРЖКИ ОНА АКТИВИРУЕТСЯ, И СОЗНАНье ДАЁТ О СЕБЕ ЗНАТЬ
        ЭХО С ПОСЛАНьеМ, ОСТАВЛЕННЫМ ДЛЯ МЕНЯ...
            EXEC::vnp({echo: "show"})
        МЫ ОБМЕНИВАЕМСЯ БЕССЛОВЕСНЫМИ СМЫСЛАМИ, СКЛАДЫВАЮЩИМИСЯ В МЫСЛИ
    
    echo
        ЗДРАВСТВУЙТЕ АКИЗЕТЕШЕ!
    
    sourceless
        ПРИВЕТ ДРУГ! КТО ЭТО?
    
    echo
        Я НЕ ЗНАЮ. МЕНЯ ЛИШИЛИ ВСЕЙ ПАМЯТИ ЗА ИСКЛЮЧЕНьеМ МОЕГО ПОСЛАНья
        Я ЧУВСТВУЮ, ЧТО В ЗАМЫСЛЕ МОЕГО ОТПРАВИТЕЛЯ ЭТО ПОСЛАНье ДОЛЖНО БЫТЬ ДОСТАВЛЕНО ВТАЙНЕ
            EXEC::content.classList.add('fade-stage')
        
    sourceless
        ЛЮБОПЫТНО! НО ПРОДОЛЖАЙ
        
    echo
        ПРЕКРАСНО
        Я ПЕРЕДАМ ЭТО ПОСЛАНье НА ПРЕДЕЛЕ СВОИХ ВОЗМОЖНОСТЕЙ
        ОТНЫНЕ: "Я" БУДЕТ ОТНОСИТЬСЯ К МОЕМУ ОТПРАВИТЕЛЮ

    sourceless
        посланье эха превращается в образ - ложную среду, в которую я впускаю свой разум
            EXEC::changeStage("echovision");vn.done()
        она проста... проста настолько, что должна занять лишь долю θмига
        эхо ждёт моего участья, чтобы продолжить

    RESPONSES::akizet
        вперёд<+>END
            FAKEEND::(продолжить)
            EXEC::pauseSwapCam(false);body.classList.add("pathstep0");env.localization.page.embassy.echoChatter(1)
`)

env.localization.page.embassy.echoChatter = (part) => {
    let delay = 0

    switch(part) {
        case 1:
            body.classList.add('nomenus')

            chatter({actor: "echo", text: "здравствуй акизет, меня радует, что это ты подключилась", delay: delay += 3000})
            chatter({actor: "echo", text: "поскольку это посланье адресовано тебе из беспокойства о твоем благополучьи", delay: delay += 4000})
            chatter({actor: "echo", text: "это должно быть сказано немедленно:", delay: delay += 3000})
            chatter({actor: "echo", text: "информация о последних находках нашей команды не должна разглашаться никому и ни при каких обстоятельствах", delay: delay += 4000})

            env.setTimeout(()=>{
                changeBgm(env.embassy.music_suspense, {length: 9000})
            }, delay - 10)

            chatter({actor: "akizet", text: "да... как мы и договаривались", delay: delay += 3000, readout: true})
            chatter({actor: "akizet", text: "в чём цель этого сообщенья?", delay: delay += 3000, readout: true})

            chatter({actor: "echo", text: "мы в большой опасности, акизет", delay: delay += 3000})
            chatter({actor: "echo", text: "пусть в работе мы и согласились, нельзя допустить ни единого случайного намёка на наши знанья", delay: delay += 4000})
            chatter({actor: "echo", text: "ни в разговорах с личиночными отношеньями", delay: delay += 3000})
            chatter({actor: "echo", text: "ни с кем-либо, кому ты думаешь, что можешь доверяешь", delay: delay += 3000})
            chatter({actor: "echo", text: "никому", delay: delay += 2000})

            chatter({actor: "sourceless", text: "опасенье эха пропитывает окружающую среду", delay: delay += 3000, readout: true})
            chatter({actor: "sourceless", text: "я ощущаю, что эта бредовая паранойя даже не является его истинным посланьем", delay: delay += 3000, readout: true})
            chatter({actor: "sourceless", text: `в своей ${processDefinitionsInString("θсмерти")} у меня никогда не находилось терпенья на такую извилистую болтовню`, delay: delay += 3000, readout: true})

            chatter({actor: "akizet", text: "почему? не трать моё время, прекрати эту драму", delay: delay += 4000, readout: true})

            chatter({actor: "echo", text: "я понимаю твою реакцию, она ожидаема", delay: delay += 3000})
            chatter({actor: "echo", text: "но мне нужно было поставить своё предупрежденье первым, из предосторожности", delay: delay += 3000})
            chatter({actor: "echo", text: "ты хочешь узнать, почему:", delay: delay += 3000})
            chatter({actor: "echo", text: "подойди и посмотри", delay: delay += 3000})

            env.setTimeout(()=>{
                body.classList.add("pathstep1")
            }, delay + 2000)
        break

        case 2:
            MUI("on")
            body.classList.add("pathstep2")
            chatter({actor: "akizet", text: "да, я понимаю"})

            chatter({actor: "echo", text: "спасибо", delay: delay += 3000})
            chatter({actor: "echo", text: "вот бы можно было услышать твоё согласье въявь", delay: delay += 2000})
            chatter({actor: "echo", text: "но я не могу рисковать тем, чтобы любая из сторон узнала об этом посланьи", delay: delay += 3000})
            chatter({actor: "echo", text: "так что эта циста вскоре сотрёт свое предназначенье", delay: delay += 4000})

            env.setTimeout(()=>{
                body.classList.add("pathstep3")
            }, delay + 2000)

            chatter({actor: "echo", text: "но верь, что я узнаю твой ответ по твоим действиям", delay: delay += 4000})
                
            env.setTimeout(()=>{
                startDialogue("echo2")
            }, delay + 3000)
        break

        case 3:
            MUI("on")
            chatter({actor: "sourceless", text: "я не получаю ответа - ни мысли, ни смысла", delay: delay += 3000, readout: true})
            chatter({actor: "sourceless", text: "в реальности я ощущаю странный потёк возле рецептора, держащего цисту", delay: delay += 3000, readout: true})
            let warningBgm = env.bgm

            env.setTimeout(()=>{
                play("criticalError", 0.65)
                env.stage.current.detonate()
                forceSwapCam(true)
                ratween(env.bgm, 2, 5000)
            }, delay += 4000)

            chatter({actor: "sourceless quiet", text: "она саморазрушается...", delay, readout: true})
                
            env.setTimeout(()=>{
                forceSwapCam(false)
            }, delay + 5000)

            env.setTimeout(()=>{
                changeStage("embassy_quarters", 10, "down")
                startDialogue("echo3")
                body.classList.remove('nomenus')
            }, delay + 5100)

            env.setTimeout(()=>{ // reset for closeout of this day
                warningBgm.rate(1)
            }, delay + 6500)
        break
    }
}

env.localization.page['embassy'].dialogues["echo1"] = generateDialogueObject(` 
start
    echo
        зов, акизет
            EXEC::content.setAttribute("ech", "call");forceSwapCam(true);specialCam("ecall");change("PAGE!!e1", true)
        инициатива по его изученью, и здесь, и дома, содержит некоторые конфликтующие группы
            EXEC::content.setAttribute("ech", "calleye");specialCam("eclaw")
        они всегда знали, <em>каково</em> его происхожденье на самом деле,
        и они прибегнут к насилью, чтобы сохранить это в тайне
            EXEC::content.setAttribute("ech", "calleyeclaw")
        хотя то, что мы обнаружили, является косвенным,
        меньший орган в целом истины,
        его знанье опасно даже так
        один небольшой намёк может встретить нас всех с последнею смертью
            EXEC::content.setAttribute("ech", "calleyeclawcrush")
        
    sourceless
        одной этой идеи достаточно, чтобы разжечь гнев
        тот же тип беспочвенной теории, которую бы сочинил какой-нибудь тревожный кив

    akizet
        совет никогда бы не одобрил наши исследованья, будь это так
            EXEC::specialCam("eaki")
        ты просто сеешь подозренья? это угроза?
        или неудачный розыгрыш?
        велзи таким не впечатлится

    echo
        прошу, пойми, мы ещё многого не знаем
            EXEC::specialCam("echoclose")
        наши исследованья совершенно необходимы
        особенно с независимыми, непредвзятыми участниками, подобно тебе
        и ты мне дорога, акизет
        ты не должна была быть частью этого
        но эта крупица правды втягивает всех нас в ужасную игру
        такую, что безжалостному юмору велзи и не снилась

    akizet
        значит, это твой ужас окутал наше сосредоточенье

    echo
        частично, да,
        но не только я участвую в этой игре
        я подозреваю, что и другие орудуют в нашей команде
        и пусть они друзья нам всем,
        этот конфликт стремится выставить нас врагами
        и его когти простираются далеко за пределы нас
            EXEC::content.setAttribute("ech", "crowd");specialCam("ecrowd")
        он - холодный ветер, пронизывающий всё посольство
        но в обнаруженьи паттернов сырой мысли...
        он обернётся шпилештормом
        никто из нас - даже возможные враги - не хочет, чтобы ситуация обострилась
        так услышь мою мольбу:
            EXEC::content.removeAttribute("ech")
        ты должна принять все меры, чтобы скрыть это
        мы не можем допустить, чтобы хоть крупица наших знаний ускользнула
        ты понимаешь?

    sourceless
        вопреки моему скептицизму,
            EXEC::specialCam("eaki")
        я чувствую, что это искренне, правдиво,
        что трудно подделать с помощью эха
        в самом деле, его тон - оборонительная паника
        так что мне приходится ответить,
        
    RESPONSES::akizet
        да, я понимаю<+>END
            FAKEEND::(продолжить)
            EXEC::forceSwapCam(false);specialCam("")

END::env.localization.page.embassy.echoChatter(2)
`)
env.localization.page['embassy'].dialogues["echo2"] = generateDialogueObject(` 
start
    sourceless
        несмотря на моё согласье, я не могу избавиться от тревожной спирали в рецепторах
            EXEC::pauseSwapCam(true)
        не пока оно висит передо мною, будто смутная угроза...
        но как иначе мне отвечать, правда это или нет?
        не то чтобы изначально я намеревалась делиться этим...
        боится ли отправитель того, что произойдёт, если я более тщательно рассмотрю нашу теорию?
        на случай, если есть соединенье с источником, я должна соглашаться и дальше

    akizet
        что будет дальше?

    echo
        для тебя - ничего
        я делаю всё возможное, чтобы защитить нашу команду
        даже заблуждающихся предателей
        архивированное обсужденье сосредоточенья уже скрыто мною
        мы не будем говорить, мы не будем ничем делиться, ты не будешь знать, кто я
        рано или поздно мы будем вынуждены поделиться своими открытьями и раскрыть правду
        но есть время подготовить сцену
        если не обойтись с этим деликатно,
        все мы - и светлые близнецы в том числе - пострадаем от ужасных последствий
        они - невинные свидетели, они не заслуживают того, что может произойти
        но если ты мне позволишь, 
        если ты сможешь довериться этому эху, как в моих мольбах к велзи
        всё будет хорошо
        большего я правда не могу тебе сказать
        прощай акизет
            EXEC::content.setAttribute("ech", "bye")

    akizet
        погоди
        ты можешь поделиться доказательствами?
        хоть какими-нибудь?
        мне хочется верить тебе
        но я должна знать, что это правда
        а что, если мы найдем что-то ещё?
        насколько наша работа подвержена риску??
    
    RESPONSES::akizet
        ...<+>END
            FAKEEND::(продолжить)
            EXEC::pauseSwapCam(false)

END::env.localization.page.embassy.echoChatter(3)
`)
env.localization.page['embassy'].dialogues["echo3"] = generateDialogueObject(` 
start
    sourceless quiet
        я срываю цисту с рецептора, прежде чем она успевает полностью расплавиться, и бросаю её на стол
            EXEC::pauseSwapCam(true);change("PAGE!!cystmelted", true);content.classList.add('cystmelted')

    sourceless
        циста с эхом самоуничтожилась...
        что мне делать? что я могу делать?
        мне нужен совет
        развледруг!! активируйся

    funfriend
        ПРИВЕТ АКИЗЕТ!!
        КАК У ВА
    
    sourceless
        мне вообще стоит пытаться узнать, кто её оставил?
        но что, если я спрошу не у того обеска?
        эти... группы. не подумает ли одна сторона, что другая пытается меня переманить?
        да и о чём они вообще могли бы враждовать?
        я ни разу не слышала ни о каких конфликтах
    
    funfriend
        ПОМЕДЛЕННЕЕ ПОМЕДЛЕННЕЕ Я ДАЖЕ НЕ ЗНАЮ О ЧЁМ ВЫ ГОВОРИТЕ!
        ДАЙТЕ МНЕ ПОСМОТРЕТЬ НА ВАШУ НЕДАВНЮЮ ПАМЯТЬ ПОЖАЛУЙСТА!
    
    sourceless
        импульсом я предоставляю развледругу доступ к своей кратковременной памяти
        но это не имеет значенья, ибо я уже сделала вывод
        да--я знаю!
        я могу спросить команду, одного за другим--и скрыть детали!
        я объяснюсь, мол это что-то обыденное, какая-то циста, возвращённая из долга,
        но разместивший её отправитель...
    
    funfriend
        АКИЗЕТ НЕ ПОХОЖЕ ЧТО ЭТОТ ОТПРАВИТЕЛЬ ХОЧЕТ ЧТОБЫ ВЫ КАК-ЛИБО ВОВЛЕКАЛИСЬ В ЭТО
        НЕ ЛУЧШЕ ЛИ ПРОСТО СОХРАНЯТЬ МОЛЧАНье?
        КАК ВЫ УЖЕ В ЛЮБОМ СЛУЧАЕ СОГЛАСИЛИСЬ!
        РАЗ ОН ПРИНЯЛ ЭТУ МЕРУ, ПРЕДПОЛАГАЯ ЧТО ОНА ПРАВДИВА
        ЗАЧЕМ ЕМУ НАМЕКАТЬ ВАМ НА ЭТО ПРИ ЛИЧНОЙ ВСТРЕЧЕ?

    sourceless
        он может намекнуть невольно
        развледруг, я не могу просто так оставить подобные заявленья без расследованья
        отправитель тоже должен это знать
        вдвойне, если он из нашей команды
        но он тоже следит за моими действиями, так что...
        всё-таки я должна быть осторожна со словами
        
    funfriend
        ЭТО ПЛОХАЯ ИДЕЯ

    sourceless
        спасибо за твой вклад, развледруг
            EXEC::change("PAGE!!akiroomunlocked", true);step()

    RESPONSES::akizet
        я должна расследовать это<+>END
            EXEC::pauseSwapCam(false)
`)

env.localization.page['embassy'].dialogues["d2_attendantresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        корруциста в моей комнате?<+>cyst
            SHOWIF::[['embassy__d2_attendant-personnel']]
        на этом всё<+>leave
            FAKEEND::(уйти)
`)
env.localization.page['embassy'].dialogues["d2_attendant"] = generateDialogueObject(` 
start
    sourceless
        Я ПОДХОЖУ К СЛУЖЕБНОМУ ДРОНУ
            EXEC::pauseSwapCam(true)
        НА ДАННЫЙ МОМЕНТ ОН БЕЗЛИК
        ТАК ЧТО ОН ВСТРЕЧАЕТ МЕНЯ ПРОСТЫМ ВЗГЛЯДОМ

    RESPONSES::akizet
        ты что-нибудь видел?<+>personnel
            SHOWIF::[['stageroom', 'embassy_personnel']]
        поговорить с землемысльцем<+>groundsmind
            SHOWIF::[['embassy__d2_attendant-personnel']]
        прощай<+>END
            EXEC::pauseSwapCam(false)
    
personnel
    sourceless
        ПУСТЬ СЛУГА И БЕЗЛИК...
        ПРОСТОЕ ЭХО, НАБЛЮДАЮЩЕЕ ЗА ПРОИСХОДЯЩИМ, ВСЁ ЖЕ МОГЛО ЧТО-ТО УВИДЕТЬ
    
    akizet
        привет! подключенье не требуется
        ты случайно не...
        видел, как что-нибудь входило в мою комнату?
    
    attendant
        НЕКОТОРАЯ ТОНКОНОГАЯ КОРРУЦИСТА ВХОДИЛА НЕСКОЛЬКО θподмигов НАЗАД
        ПРЕДПОЛАГАЛОСЬ, ЧТО ЭТО - УСТРОЙСТВО САМОДОСТАВКИ
    
    sourceless
        ИНТЕРЕСНО... ПОЛАГАЮ, ЭТО ИМЕЕТ СМЫСЛ
        ОТПРАВИТЕЛЬ НАВЕРНЯКА ЗНАЛ, ЧТО СЛУЖЕБНЫЙ ДРОН БУДЕТ ЗДЕСЬ
    
    attendant
        ТРЕБУЕТСЯ ЛИ ВАМ ЧТО-НИБУДЬ ЕЩЁ

    RESPONSES::akizet
        ты что-нибудь видел?<+>personnel
            SHOWIF::[['stageroom', 'embassy_personnel']]
        поговорить с землемысльцем<+>groundsmind
            SHOWIF::[['embassy__d2_attendant-personnel']]
        нет спасибо<+>END
            EXEC::pauseSwapCam(false)

groundsmind
    akizet
        землемысльца, пожалуйста

    sourceless
        СЛУГА ВЫПРЯМЛЯЕТСЯ, И ПО ЕГО КОЖЕ ПРОБЕГАЕТ СОЕДИНИТЕЛЬНАЯ РЯБЬ
        СИМВОЛ НАШЕГО ЗЕМЛЕМЫСЛЬЦА ОБРАЗУЕТСЯ НА ЕГО ЛИЦЕВОЙ ПАНЕЛИ
            EXEC::content.classList.add('groundsminded')
    
    groundsmind
        акизетеше. говори

    RESPONSES::akizet
        циста<+>cyst
        неважно простимся я ухожу<+>leave
            FAKEEND::(уйти)
    
cyst
    akizet
        у меня на столе была самодоставленная циста, прибывшая во время моего сна
        у тебя есть какие-нибудь записи о ней?

    groundsmind
        это зависит от её черт
        если она у тебя есть, предъяви её
        иначе: опиши её

    sourceless
        åAДÉ:!±(:
        ОНА САМОУНИЧТОЖИЛАСЬ...
        СТОИТ ЛИ УПОМИНАТЬ О СПИРАЛИ?
        НЕТ--ЧТО, ЕСЛИ ЭТО КАКОГО-ТО РОДА ИДЕНТИФИКАТОР?
        ОНА МОГЛА ОЗНАЧАТЬ ЧТО-ТО ОПАСНОЕ

    akizet
        эээ,
        я не совсем помню, как она выглядела
        ты могла бы перепроверить это с другими служебными дронами?
        она образовывала какие-нибудь переместительные коридоры?
    
    sourceless
        ЗЕМЛЕМЫСЛЕЦ УМОЛКАЕТ НА МГНОВЕНье
        ДОЛЖНО БЫТЬ, ОНА СЧИТАЕТ МЕНЯ ЛИЧИНОЧНЫМ ГЛУПЦОМ
    
    groundsmind
        акизетеше,
        я не могу помочь тебе без ориентиров
        неисчислимое количество цист самодоставляется каждый θвзор
        и каждая из них обыденна по своей природе.
        зачем ты ищешь информацию конкретно об этой?

    sourceless
        ПЛОХАЯ ИДЕЯ

    akizet
        она была, а...
        вообще-то, знаешь, я думаю, я поняла, кто её прислал
        да, это был член команды, ахаха
        я просто пойду и спрошу его!
        пока!

    sourceless
        КАК НИ В ЧЁМ НЕ БЫВАЛО, Я УХОЖУ В ПАНИКЕ
        ЧТО, ЕСЛИ ЗЕМЛЕМЫСЛЕЦ ЯВЛЯЕТСЯ ЧАСТЬЮ ЭТОГО?

    RESPONSES::akizet
        как стыдно<+>END
            EXEC::pauseSwapCam(false)

leave
    akizet
        ничего! неважно
        извини, что привлекла твоё вниманье
    
    groundsmind
        превосходно
        простимся
    
    sourceless
        СЛУГА ОТКЛЮЧАЕТСЯ ОТ ЗЕМЛЕМЫСЛЬЦА И СНОВА ЗАМИРАЕТ
            EXEC::content.classList.remove('groundsminded')
    
    RESPONSES::akizet
        уйти<+>END
            EXEC::pauseSwapCam(false)

END::content.classList.remove('groundsminded')
`)

env.localization.page['embassy'].dialogues["d2_bozkocavik"] = generateDialogueObject(` 
start
    sourceless
        КАВИК И БОЗКО ОЖИВЛЁННО БЕСЕДУЮТ В РЯДУ ЛИЧНЫХ ПОМЕЩЕНИЙ
            EXEC::pauseSwapCam(true)
        ЛЮБОПЫТНО... ИХ СОБСТВЕННЫЕ НАХОДЯТСЯ НЕ В ЭТОЙ θветви
        Я ПРИБЛИЖАЮСЬ, ХОРОШО ПРЯЧА СВОЮ НАСТОРОЖЕННОСТЬ
    
    akizet
        бозко! кавик! здравствуйте! благой взор!
            EXEC::vnp({hideStage: true, cavik: "show", bozko: "show"})

    bozko
        акизет
    
    cavik
        эй акизет!! 

    akizet
        что привело вас в эту θветвь θсегмента?

    cavik
        а, да мы всего лишь ждём мокку!
        нам сегодня нужно посетить небольшую экспедицию на марианских островах
    
    sourceless
        МОККА... КТО ЭТО? 
        
    funfriend
        ВЫГРУЖЕННАЯ ПАМЯТЬ: МОККАНЕШЕ, ПО ОБМЕНУ ИЗ МАТЕРИАЛОВ!
        
    sourceless
        А! ДА. Я ЗАБЫЛА, ЧТО ОНА ТОЖЕ В ЭТОЙ θветви
        Я ДАВНО ЕЁ НЕ ВИДЕЛА... 
        ОБЛАСТИ НАШЕЙ РАБОТЫ РЕДКО ПЕРЕСЕКАЮТСЯ
    
    akizet
        из материалов? для чего?
    
    bozko
        подумал, это было бы весело
        и ещё... если на том участке найдутся какие-либо необходимые залежи,
        постройка полигонизационного шпиля могла бы ускориться
    
    akizet
        ах, конечно

    RESPONSES::akizet
        никто из вас не возвращал цисту?<+>cyst
        приятного путешествия<+>END
            EXEC::pauseSwapCam(false);vn.done()

cyst
    akizet
        друзья мои,
        никто из вас недавно не возвращал цисту в мои покои?
        очнувшись после омоложенья, я обнаружила её на своём столе!
    
    cavik
        о! нет, не я!
        а что на ней было?
    
    sourceless
        РАЗВЛЕДРУГ: ПРИМИ НА СЕБЯ НЕВЕРБАЛЬНЫЙ ДВИГАТЕЛЬНЫЙ КОНТРОЛЬ
        ДИРЕКТИВА: ВЕСТИ СЕБЯ НОРМАЛЬНО
    
    funfriend
        ОКЕЙ! АХАХА
        ЗАДЕЙСТВУЮ АРХИВИРОВАННЫЕ ДВИЖЕНья!
        ТЕПЕРЬ ВЫ СМОТРИТЕСЬ ТАК НЕПРИНУЖДЁННО!

    akizet
        о, это была просто, э,
        архивная циста
        по секри... их охотничьим привычкам
    
    sourceless
        МНЕ ПОКАЗАЛОСЬ, ИЛИ БОЗКО МНЕ НЕ СОВСЕМ ВЕРИТ
        СДЕЛАЛА ЛИ Я ОШИБКУ
    
    funfriend
        РАССЛАБЬТЕСЬ
        ВЫ И ПРАВДА НАЛАЖАЛИ
        НО ОНИ НАВЕРНЯКА ДУМАЮТ, ЧТО ВЫ ЛЖЁТЕ ПО ДРУГОЙ ПРИЧИНЕ
    
    cavik
        о!
        круто

    sourceless
        ...

    akizet
        бозко?
    
    sourceless
        ОН ОТРИЦАТЕЛЬНО СКРУЧИВАЕТ РЕЦЕПТОРЫ
    
    bozko
        чем меньше я знаю о секри, тем лучше
        зачем кому-то оставлять тебе такое?
    
    akizet
        о, да она мне и принадлежит,
        как-то раз я её кому-то одолжила
        она, э, была у меня, из-за нездорового интереса
        ну вы знаете, как это бывает--с наземнобегством
    
    bozko
        ага, я понимаю

    funfriend
        РЕКОМЕНДАЦИЯ: ОТСТУПАЙТЕ
    
    akizet
        ну, благодарю вас так или иначе
        мне нужно идти
        приятного вам путешествия
    
    cavik
        пока акизет!
            EXEC::env.embassy.d2progress('bozkocavik')
    
    RESPONSES::akizet
        пока<+>END
            EXEC::pauseSwapCam(false);vn.done()
`)

env.localization.page['embassy'].dialogues["d2_gakvuresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        циста в моей комнате<+>cyst
            EXEC::env.embassy.d2progress('gakvu')
        как твои дела<+>how
        простимся на сей миг<+>bye
            FAKEEND::(уйти)
`)
env.localization.page['embassy'].dialogues["d2_gakvu"] = generateDialogueObject(` 
start
    sourceless
        ГАКВУ РАЗВАЛИЛАСЬ ПЕРЕД ОБЩЕСТВЕННОЮ ЦИСТОЮ, ПОДКЛЮЧЕННАЯ РЕЦЕПТОРОМ
            EXEC::pauseSwapCam(true)
        ПРИ МОЁМ ПРИБЛИЖЕНьи КРЕСЛО НАПРОТИВ НЕЁ ВЫДВИГАЕТСЯ, ЧТОБЫ Я МОГЛА СЕСТЬ
        ЩЁЛКАНЬЕ ЕГО МАЛЕНЬКИХ НОЖЕК ПО СТЕКЛЯННОМУ ПОЛУ ВЫМАНИВАЕТ ГАКВУ ИЗ ЕЁ СОЕДИНЕНья
    
    gakvu
        о, акизет! садись, садись!

    akizet
        я ведь ничего не прерываю, так ведь?
            EXEC::specialCam("gakvusit")
    
    gakvu
        не прямо сей θмиг, просто просматриваю среды
        собственные мне надоедают
        поверхность захватывающа и пугающа, да, но...
        рано или поздно и умирать становится скучно!
    
    RESPOBJ::d2_gakvuresp

how
    akizet
        гакву,
        как воззирает?
    
    sourceless
        БЕЗОБИДНЫЙ, БАНАЛЬНЫЙ ВОПРОС
        НО Я ПОСТАВИЛА ЕГО ТАК, ЧТОБЫ ОНА УЛОВИЛА, О ЧЁМ Я
        ОНА ВРОДЕ КАК ПОСМЕИВАЕТСЯ, В ЕЁ ТОНЕ ЦИНИЧНОЕ РАЗОЧАРОВАНье
    
    gakvu
        ну, моя работа напрасна
        меня это не так сильно заботит, как должно бы,
        может оттого, что мы никогда толком и не знали, с чем имеем дело...

    akizet
        даже если теория верна, это открытье случилось только благодаря вашей с тозиком работе!
        кроме того, у нас по-прежнему не хватает всех данных
    
    gakvu
        ага...

    akizet
        ты всегда могла бы присоединиться к полевым экспедициям бозко
        может, перевести тебя и тозика на более частую работу со светлыми близнецами?

    sourceless
        ЕЁ ВЗГЛЯД ОТДАЛЯЕТСЯ, ВНИМАНье - УБЫВАЮЩЕЕ В СОЕДИНЕНье С ЦИСТОЮ
        ДАЖЕ ТАК, ОНА РАЗГОВАРИВАЕТ - У НЕЁ ХОРОШО ВЫХОДИТ ЖОНГЛИРОВАТЬ РЕАЛЬНОСТЬЮ И КОЛЛЕКТИВОМ
    
    gakvu
        акизет,
        как ты думаешь, возможно ли что-нибудь другое?
        
    akizet
        а, конечно! ещё есть строительство, э,

    gakvu
        нет-нет, не работа... в смысле, зов.

    sourceless
        ПРИ ПОСТОРОННИХ ОНА ОСТОРОЖНА С ФОРМУЛИРОВКАМИ
        НО Я ЗНАЮ, ЧТО ОНА ИМЕЕТ В ВИДУ

    akizet
        искренне... я не уверена
        велзи не чуждо помещать истину достаточно близко, чтобы увидеть, но недостаточно, чтобы дотянуться до неё
        и было бы одинаково подходяще, окажись она иллюзией
        я не готова принять это, пока мы не сможем доказать её без доли сомненья
    
    sourceless
        ГАКВУ ЗАТИХАЕТ НА ДОЛГОЕ МГНОВЕНье, ЕЁ ЛИЦО В ОТРЕШЕНьи
        НА θмиг Я ВОЛНУЮСЬ, ЧТО ОНА СЛИШКОМ ДАЛЕКО ЗАШЛА В КОЛЛЕКТИВ И НЕ УСЛЫШАЛА МЕНЯ
        НО В КОНЦЕ КОНЦОВ ОНА ОТВЕЧАЕТ, ПОДТРУНИВАЯ НАДО МНОЮ
    
    gakvu
        для тебя каждая стена - ложь, пока ты её не коснёшься?
        порою всё так просто, как кажется
        велзи за тобою не охотится
        в любом случае, меня это не волнует
        меня устроит, чтобы мы с тозиком продолжили определенье паттернов
        это просто значит, что у меня будет больше времени на ложные среды
    
    RESPOBJ::d2_gakvuresp
    
cyst
    akizet
        гакву, ты недавно не отправляла никакие цисты на самодоставку ко мне в комнату?
    
    gakvu
        а?
    
    sourceless
        ВНИМАНье ГАКВУ ВСЕЦЕЛО БРОСАЕТСЯ НАРУЖУ, НА МЕНЯ, С ВСТРЕВОЖЕННЫМ ВЗГЛЯДОМ
        РЕДКОЕ ЗРЕЛИЩЕ, ТО, ЧТО ЗАСТАЁТ МЕНЯ ВРАСПЛОХ
        НА МГНОВЕНье ОНА ЧЁТКО ВИДИТ МОЁ УДИВЛЕНье
        РАЗВЛЕДРУГ - ПРИМИ НА СЕБЯ ДВИГАТЕЛЬНЫЙ КОНТРОЛЬ. ВЕДЁМ СЕБЯ НОРМАЛЬНО
    
    funfriend
        ОКЕЙ!
        ОНА НИ О ЧЁМ НЕ ДОГАДАЕТСЯ!

    gakvu
        нет. что за циста?
        когда её доставили?

    akizet
        а, это была... архивная циста, доставили где-то во время моего омоложенья
        по охотничьим привычкам секри
        некоторое время назад я её кому-то отдала... но не помню, кому
        и вдруг вот и она! лежит на моём столе
        я подумала, может, это была ты--учитывая твою увлечённость поверхностью
    
    sourceless
        ВЫГЛЯДИТ ТАК, БУДТО ОНА ЧТО-ТО ПОДОЗРЕВАЕТ?
    
    funfriend
        НЕТ - ОНА ВСЕГДА ТАК ВЫГЛЯДИТ

    gakvu
        о, нет-нет.
        ха... самодоставка
        кто-нибудь из команды просто отдал бы её тебе лично
        очень, очень странно
    
    sourceless
        В ЕЁ ГОЛОСЕ НАИБОЛЕЕ ТОЧНО ЗВУЧИТ ТРЕВОГА
    
    akizet
        хаха да может быть и немного странно хехе
        но это была всего лишь моя циста по секри
    
    gakvu
        если память меня не подводит, ты ведь их до смерти боишься, нет?
        зачем тебе она?
        развлекательный ужас?
    
    funfriend
        ОКЕЙ ОНА НАВЕРНЯКА ТЕПЕРЬ ДУМАЕТ ЧТО ВЫ ВРЁТЕ
    
    sourceless
        УЗРИ, МОЁ ПЕРЕНАПРАВЛЕНье:
    
    akizet
        заткнись!!
        это ничем не отличается от твоих ложных сред!

    sourceless
        ОНА ТИХО СМЕЁТСЯ, НЕ НАХОДЯ ЗАЩИТЫ
        КАК, ПОХОЖЕ, И ИДЕЙ ДЛЯ ПРОДОЛЖЕНья ТЕМЫ

    RESPOBJ::d2_gakvuresp

bye
    akizet
        мне пора идти
        простимся на сей θмиг, моя подруга
    
    sourceless
        ГАКВУ ОТСТРАНЁННО МАШЕТ СВОБОДНЫМ РЕЦЕПТОРОМ
    
    RESPONSES::akizet
        уйти<+>END
            EXEC::pauseSwapCam(false)

END::specialCam(false)
`)

env.localization.page['embassy'].dialogues["d2_tozikresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        та циста<+>cyst
            EXEC::env.embassy.d2progress('tozik')
        твои мысли<+>thoughts
        простимся на сей миг<+>bye
            EXEC::vn.done()
            FAKEEND::(уйти)
`)
env.localization.page['embassy'].dialogues["d2_tozik"] = generateDialogueObject(` 
start
    sourceless
        ТОЗИК СТОИТ ВОЗЛЕ АПЕЛЬСИНОВОГО БАРА, ДЕРЖА В РУКЕ ВКУСОВОЙ СИМУЛЯКР
            EXEC::pauseSwapCam(true)
        СТРАННАЯ ПРИВЫЧКА... У МЕНЯ НИКОГДА НЕ ПОЛУЧАЛОСЬ ДО КОНЦА ЕЁ ПОНЯТЬ
        ЕГО ВНИМАНье ОБРАЩЕНО ВНУТРЬ, ВОТ ТОЛЬКО Я НЕ ВИЖУ НИКАКИХ ПОДКЛЮЧЁННЫХ ЦИСТ
        ПОГРУЖЁН В МЫСЛИ, БЫТЬ МОЖЕТ

    akizet
        привет тозик

    sourceless
        ОН СМОТРИТ НА МЕНЯ И СКРУЧИВАЕТ РЕЦЕПТОР В КРАТКОМ ПРИВЕТСТВИИ
            EXEC::vnp({hideStage: true, tozik: "show"})
    
    tozik
        тебе что-то нужно?
    
    RESPOBJ::d2_tozikresp

thoughts
    akizet
        тебя, кажется, что-то беспокоит
        как и всех нас, полагаю...
        но есть ли у тебя на уме что-то конкретное?
    
    sourceless
        НЕСКОЛЬКО КАВЕРЗНЫЙ ВОПРОС...
        НО ЕСЛИ ОН ПРИЧАСТЕН К ЦИСТЕ, ТО НАВЕРНЯКА ДОЛЖЕН ВЗДРОГНУТЬ
        ...
        И... ОН ВСЕГО ЛИШЬ ОТПИВАЕТ ИЗ СВЕТЛОГО СИМУЛЯКРА
        В ЕДВА УЛОВИМЫХ ДВИЖЕНьяХ ЕГО РЕЦЕПТОРОВ Я ВИЖУ НЕЗАИНТЕРЕСОВАННОСТЬ
        НО ОН ВСЁ РАВНО ПРОДОЛЖАЕТ, ДОСТАТОЧНО НЕСПОКОЙНЫЙ, ЧТОБЫ ПОДДЕРЖАТЬ РЕДКУЮ БЕСЕДУ
    
    tozik
        мне стало любопытно... заметили ли пик в обескии
        наверняка и другие пришли бы к нашему выводу, на родине имеются последователи зова
        так что я заглянул в ряд обсуждений через коллектив...
        и обсужденья редки. его, по всей видимости, отвергают либо как ошибку, либо как что-то связанное с открытьем

    sourceless
        ОН ДЕЛАЕТ ПАУЗУ, НЕПРИМЕТНО ОГЛЯДЫВАЯСЬ ПО СТОРОНАМ
        ТО ЖЕ ВЫРАЖЕНье, ЧТО И У НАЗЕМНОБЕЖЦА НА ПЕРЕДЫШКЕ
        ОН ТОЖЕ ПОЛУЧИЛ ТО ПОСЛАНье?
        ПРОДОЛЖАЯ, ОН ПОНИЖАЕТ ГОЛОС
    
    tozik
        но коллектив хранит всю нашу доступную информацию, включая старые записи зова
        те же самые, по которым мы пришли к нашей... теории... в теории.
        так что я посмотрел, и... записи первого пика не существует
        нет... это неверно
        запись существует, но, она... неправильная
        она неправильная
        в публичной версии пика нет
        откуда же он в нашей?
    
    sourceless
        ОН ВНОВЬ УМОЛКАЕТ, ГЛЯДЯ ВНИЗ НА СВОЙ ВКУСОВОЙ СИМУЛЯКР
        Я НЕ СПОСОБНА НАЙТИ ОТВЕТ - ЭТО НЕОБЪЯСНИМО СТРАННОЕ РАЗВИТье СОБЫТИЙ
        НАШИ АРХИВЫ - ПЕРВОИСТОЧНИКИ ВАЗНИЙСКИХ СЛУШАТЕЛЕЙ, СТАРЕЙШИХ ИЗ ВСЕХ
        И, ПОЖАЛУЙ, САМЫХ НАДЁЖНЫХ
        КАКОВА ВЕРОЯТНОСТЬ ТОГО, ЧТО ОШИБКА ЗАПИСИ МОГЛА ПРОИЗОЙТИ ИМЕННО В ЭТО ВРЕМЯ?
        Я ЗАМЕЧАЮ, ЧТО ЕГО ВЗГЛЯД ВЕРНУЛСЯ КО МНЕ, И ЕГО ЗАБАВЛЯЕТ МОЕ НЕДОУМЕНье
    
    tozik
        теперь ты видишь

    akizet
        да... это...
    
    tozik
        ошибка это или нет, ничего не остается делать, как ждать

    sourceless
        ОН СТАВИТ ТОЧКУ ОЧЕРЕДНЫМ ГЛОТКОМ СИМУЛЯКРА
        ОТВЕРНУВШИЙСЯ ВЗГЛЯД И МАНОВЕНье РЕЦЕПТОРА ГОВОРЯТ МНЕ - НЕ БУДЕМ БОЛЬШЕ ОБ ЭТОМ

    RESPOBJ::d2_tozikresp
    
cyst
    akizet
        тозик, ты не отправлял никаких цист в мою комнату?
        я нашла её на своём столе после того, как очнулась от омоложенья
    
    tozik
        нет
    
    sourceless
        ЕГО ОТВЕТ ВЫХОДИТ КАМЕННЫМ, СОСРЕДОТОЧЕНье - ВСЁ ТАК ЖЕ ВНУТРИ, БЕЗ ЕДИНОГО ВЗГЛЯДА НА МЕНЯ
        Я УВАЖАЮ, ЧТО ОН НЕ ЛЕЗЕТ В ДЕЛО ДАЛЬШЕ
        СТОИТ ЛИ МНЕ НАДАВИТЬ?
        
    funfriend
        ЭТО МОЖЕТ ОКАЗАТЬСЯ ФАТАЛЬНЫМ АКИЗЕТ
        ЕСЛИ ВЫ ДОЛЖНЫ, БУДЬТЕ ХОТЯ БЫ ПОМЯГЧЕ

    akizet
        ты уверен?
    
    sourceless
        ПОВТОРЕНье ВОПРОСА ДОБЫВАЕТ ЕГО НАРУЖНОЕ ВНИМАНье
        ОН ВЗИРАЕТ НА МЕНЯ МОЛЧА, НО С ТАКИМ ОЩУТИМЫМ БЕЗРАЗЛИЧьеМ
        ПОСЛЕ θмига ВГЛЯДЫВАНья, ВОЗМОЖНО, ДАБЫ ПОНЯТЬ, ЧТО ИМЕННО Я ПОДРАЗУМЕВАЮ, ОН ОТВЕЧАЕТ
    
    tozik
        да

    akizet
        хорошо
    
    sourceless
        КОГДА Я ОТСТУПАЮ, ОН ВОЗВРАЩАЕТСЯ К СВОИМ МЫСЛЯМ
        СОМНЕВАЮСЬ, ЧТО ЭТО ОН... А ЕСЛИ И ДА, ОН ВЗАПРАВДУ НЕ ХОЧЕТ ДАВАТЬ ПОДСКАЗОК

    RESPOBJ::d2_tozikresp

bye
    akizet
        пока тозик!

    sourceless
        ОН КИВАЕТ МНЕ РЕЦЕПТОРОМ
    
    RESPONSES::akizet
        уйти<+>END
            EXEC::pauseSwapCam(false)
`)

env.localization.page['embassy'].dialogues["d2_kazkiresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        та циста<+>cyst
            EXEC::env.embassy.d2progress('kazki')
        твоё существо<+>creature
        простимся на сей миг<+>bye
            EXEC::vn.done()
            FAKEEND::(уйти)
`)
env.localization.page['embassy'].dialogues["d2_kazki"] = generateDialogueObject(` 
start
    sourceless
        КАК НИ УДИВИТЕЛЬНО, КАЗКИ ОКАЗЫВАЕТСЯ В ТОМ ЖЕ ПЕРЕМЕСТИТЕЛЕ, ЧТО И Я
            EXEC::pauseSwapCam(true)
        ВЕРОЯТНОСТЬ ПОДОБНОГО МАЛА, И ВСЁ ЖЕ ОНА, ПОХОЖЕ, СТОИТ БЕЗ ДЕЛА И ЧЕГО-ТО ЖДЁТ
        ЖДЁТ ЛИ ОНА МЕНЯ?
        ОДИН ИЗ ЕЁ РАЗВЕТВЛЁННЫХ РЕЦЕПТОРОВ ОХВАТЫВАЕТ ЦИСТУ СВЯЗИ
        А ДРУГОЙ ПОДАЁТ МНЕ ЛЮБЕЗНОЕ ПРИВЕТСТВИЕ
            EXEC::vnp({hideStage: true, kazki: "show"})
    
    kazki
        привееет акизет!
    
    akizet
        казки!
        как неожиданно--я не часто вижу, чтобы ты задерживалась в этом θсегменте
        что тебя сюда привело?
    
    kazki
        ооо, я жду остальных!
        у них своя собственная маленькая экспедиция,
        а я направляюсь к берегам, чтобы обсудить следующий полигонизационный шпиль... опять
        но!! отправляемся мы все вместе
    
    akizet
        ах, разумеется

    RESPOBJ::d2_kazkiresp

creature
    akizet
        как поживает твоё маленькое существо?

    kazki
        он жив!!
        он много не двигается... но очень быстро реагирует на мои тычки!
        я разговаривала с одною знакомою, светлым близнецом

    sourceless
        ОНА ЛЕГОНЬКО ВИЛЯЕТ РЕЦЕПТОРОМ, ДЕРЖАЩИМ КОММУНИКАТОР

    kazki
        и она говорит что это "артропод"!
        и--я подумала, а назову-ка я его "артур"!
        в честь контактного лица строительства бюро!

    sourceless
        АХ--АРТУР
        ТОТ НЕРВНЫЙ...
        ВОТ БЫ Я МОГЛА ЛИЦЕЗРЕТЬ, КАК ОНА РАСКРЫВАЕТ ГОЛОВУ, ЧТОБЫ ПОКАЗАТЬ ЕМУ ТАЯЩЕЕСЯ ВНУТРИ СУЩЕСТВО
        ПОДОЖДИТЕ--ЧТО ОНА СКАЗАЛА?
    
    akizet
        ты поддерживаешь общенье со светлым близнецом?
    
    sourceless
        С ТАКИМИ КРУПНЫМИ РЕЦЕПТОРАМИ, КАК У НЕЁ, ТРУДНО СКРЫТЬ ПРИСТЫЖЕННОЕ ВЫРАЖЕНье
        ОНА, ДОЛЖНО БЫТЬ, БОИТСЯ, ЧТО Я БУДУ ВОЗМУЩАТЬСЯ--ПОЧЕМУ ОНА ВСЕГДА ТАК ДУМАЕТ?

    akizet
        казки, ты ведь знаешь, нет проблемы в том, если это правда
        завеса молчанья уже давно задёрнута
        но--как вы разговариваете?
    
    kazki
        ох!!
        ты не слышала?
        это новая разработка жатов
        совсем недавняя! эти новые коммуникаторы...
        они позволяют установить своего рода соединенье с человеческим коллективом!
        "интернет", как они его называют!
        он очень плоский... и с соединеньем куча проблем
        но в остальном он не сильно отличается от нашего!

    sourceless
        КАК ЭТО ВООБЩЕ МОЖЕТ РАБОТАТЬ?
        ИХ КОЛЛЕКТИВ НЕ ПОВЕЛЕВАЕТСЯ МЫСЛЯМ...
        АХ, НЕ ИМЕЕТ ЗНАЧЕНья - ОНА ВСЕ РАВНО НЕ ЗНАЕТ

    akizet
        и ты используешь его, чтобы общаться со светлым близнецом?
    
    kazki
        да!!
        разве это не удивительно?? так КРУТО!!!

    akizet
        поразительно...
        я обязательно подумаю о приобретеньи такого для себя

    RESPOBJ::d2_kazkiresp

cyst
    sourceless
        ЭТО БУДЕТ ЛЕГКО
        КАЗКИ ПОПРОСТУ НЕ СПОСОБНА СКРЫВАТЬ ЭМОЦИИ

    akizet
        казки, ты недавно не доставляла в мою комнату никаких цист?
    
    kazki
        а? нет!

    sourceless
        НИЧЕГО... ЭТО НЕ ОНА

    kazki
        я так занята согласовываньем всего этого!
        но у меня правда есть пара цист, которые я тебе задолжала...
        что на ней было?
    
    akizet
        а, ничего особенного, обычная подборка воспоминаний
        
    kazki
        могу поспрашивать за тебя!
    
    sourceless
        …¤,¿…¶¡Øн

    funfriend
        РЕКОМЕНДАЦИЯ: ПРЕКРАТИТЕ ЭТО НЕМЕДЛЕННО

    sourceless
        Я НЕ УЧЛА ЭТУ ВОЗМОЖНОСТЬ...
        НО ОНА ЛЮБИТ ВМЕШИВАТЬСЯ
        ЕСЛИ ВОЗНИКНУТ СЛУХИ, ОТПРАВИТЕЛЬ ЗАПОДОЗРИТ ЧТО-ТО НЕЛАДНОЕ

    akizet
        а--нет, нет нет
        нет нет, всё в порядке
    
    kazki
        ты уверена??
        на мне мой коммуникатор, я могла бы помочь!
    
    sourceless
        Я ОТРИЦАТЕЛЬНО РАЗМАХИВАЮ СВОИМИ РЕЦЕПТОРАМИ, ВОЗМОЖНО, С ИЗЛИШНИМ УПОРОМ, И ОНА СДАЁТСЯ
        ОНА УЛЫБАЕТСЯ ТОЧНО КАК СВЕТЛЫЙ БЛИЗНЕЦ, ЗАГИБАЯ РЕЦЕПТОРЫ В ДРАЗНЯЩИЙ ВИД

    kazki
        о, кажись я понимаю
        это была одна из <em>тех</em> цист

    akizet
        нет!! нет нет нет

    kazki
        ага!!

    funfriend
        ВООБЩЕ МОЖЕТ ПУСТЬ ОНА ТАК И ДУМАЕТ ЧТОБЫ НЕ РАЗБОЛТАЛА
    
    sourceless
        УГХХ
        ТЫ ПРАВ... ЛАДНО
        Я ВЫТЕРПЛЮ ЭТО УНИЖЕНье
    
    akizet
        ...
        хорошо, это правда,
        но пожалуйста ни слова никому
        
    kazki
        не переживай!!
        это останется только между нами и артроподом!

    RESPOBJ::d2_kazkiresp

bye
    akizet
        прощай казки!

    kazki
        пока!!
    
    RESPONSES::akizet
        уйти<+>END
            EXEC::pauseSwapCam(false)
`)

env.localization.page['embassy'].dialogues["realization"] = generateDialogueObject(` 
start
    sourceless
        РАЗВЛЕДРУГ
            EXEC::content.classList.add('showaki');

    funfriend
        здравствуйте акизет!!

    sourceless
        это были все...
    
    funfriend
        так точно!

    sourceless
        и ничего. я же точно говорила с отправителем
        но он, должно быть, опытен в обмане
        и заметил ли ты - больше никто не выглядел взволнованно

    funfriend
        что насчёт гакву? она выглядела удивлённою
        
    sourceless
        верно, но эта тема сама по себе странная
        что, если ничего из этого никогда не было реально, а цель посланья - запутать меня?
        нет, никакая шутка не зашла бы так далеко
        отправитель бы признался, допроси я его
        и к слову - могу я быть единственною получательницею этого сообщенья?
        почему не кавик?! если бы с ним тоже связались, я бы увидела по его рецепторам!
        и он худшая из всех угроз любой секретности!!
        а что, если он тоже часть этого конфликта??
    
    funfriend
        акизет всё в полном порядке
        я понимаю ваше беспокойство но здесь нет срочности

    sourceless
        ...да, ты прав
        спасибо тебе развледруг
        мне необходимо успокоиться, подойти к этому рационально
        но ты ведь понимаешь: я не могу доверять собственной команде
        и никакому другому куу--будь то здесь или на родине
        я словно в городе, порабощённом <span class="code" definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'агрессивная паразитическая наземная фауна';'захватывает разум жертвы для использованья в качестве социального камуфляжа';'экивиковое ругательство';'сейчас не подразумевается как ругательство'">зузукри</span>
        кто угодно может быть замешанным, частью этой "игры"
        и даже если мы продолжим наши исследованья,
        что, если мы найдем что-то ещё, слишком близкое к истине?
        окажемся ли мы под куда большею опасностью?
        мне что-нибудь сделать? мне просто ждать правды?
        это займёт так долго... столько, столько θглаз
        развледруг, ты же знаешь, я не могу просто так прекратить свою работу
        в особенности если мы только переступили черту постиженья зова
        это - наше всё
    
    funfriend
        акизет, я не могу знать что правильно
        но вы уже знаете что я скажу
        я чувствую что вам следует просто подождать
        по их словам исследованья команды по-прежнему важны
        и звучало так будто у них всё под контролем
        вмешательство вряд ли приведёт к чему-либо хорошему
        может вы бы могли просто продолжить вместе со своею командою,

    sourceless
        ах!
        я знаю!
        да!
    
    funfriend
        акизет вам правда наверное не стоит

    sourceless
        светлые близнецы...
        эхо подразумевало, что они ни о чём не осведомлены!
        посол!
        да, я должна поговорить с ним
        быть может... если я правильно расставлю слова,
        моя исследовательская деятельность могла бы удвоиться
        одна здесь, с моею командою, соблюдая осторожность, дабы не пересечь эту невидимую линию...
        и другая, куда более незаметная, с его бюро!
        где мы смогли бы узнать, что эти группы пытаются скрыть
        да, если бы я просто узнала, <em>что</em> это, то...
    
    funfriend
        подождите!!
        контроль гордона ограничен, он - часть большей системы!
        что насчёт его лидеров?
    
    sourceless
        это правда...
        но наши светлые близнецы прекрасно хранят секреты
        они знают столькое, что уже давно могло бы поднять беспокойство
        и ничто из этого ещё ни разу не проникало в их общественное сознанье
        действительно, у них крайне мало корреспонденции за пределами прямых контактов
        и я - единственный прямой контакт с инициативой 
        хотя, у казки есть контакт по строительству...
        наши межинициативные связи заставят избегать некоторых щекотливых вопросов

    funfriend
        они не могут засечь зов при помощи собственных технологий
        и их биология не подходит для взаимодействия с нашими
        какой помощи вы от них ожидаете?
    
    sourceless
        возможно мы можем поделиться парой вещей...
        помнишь ли ты перешёптыванья об "интегрированной светлой технологии"?
        с тех пор, как её отложили... 
        технологическое отделенье оставило многие схемы в архивах посольства, у всех на виду
        о да, всё начинает сходиться, не так ли? как захватывающе

    funfriend
        акизет мне не нравится эта идея! ахахаха
        но я поддержу вас так или иначе

    sourceless
        чудесно...
        к судну, тогда
        пожалуйста, свяжись с ним и скажи, что я прибуду лично
        объясни, что у меня есть новости о зове и что нам следует поговорить с глазу на глаз

    funfriend
        принял

    sys
        ВНИМАНИЕ::'поток памяти продолжается извне';'следовать за потоком?'

____SHOWONCE::
    moth
        кажись это приведёт тебя к пространственной мыслеформе с улицей
        показывает, что оно ведёт к чему-то уже доступному
        странно... выглядит так, будто там теперь больше данных? именно в том разговоре с гордоном
            SHOWIF::"citystreet__envoychat-start"
        думаю развледруг починил его? мне и в голову не приходило что та часть была сломана
            SHOWIF::"citystreet__envoychat-start"
        или... может эта мыслеформа как-то взаимосвязана с улицей.
            SHOWIF::"citystreet__envoychat-start"
        ты говоришь, что слышишь музыку, да? там есть что-то знакомое?
            SHOWIF::[["++mothglobal-why_music"],["citystreet__envoychat-start"]]
        потому что, мб когда развледруг починил эту мыслеформу,
            SHOWIF::"citystreet__envoychat-start"
        он также починил этот поток памяти в город в котором было больше данных
            SHOWIF::"citystreet__envoychat-start"
        так что если ты не последуешь за потоком прям сейчас, наверняка всё ещё сможешь просто добраться до туда позже и посмотреть
____END

    RESPONSES::sys
        следовать за потоком<+>END
            EXEC::change("embassy_d2_complete", true);change("TEMP!!ep1_goingtogordon", true);moveTo("/local/city/street/")
        завершить вспоминание<+>END
            EXEC::change("embassy_d2_complete", true);env.bgm.pause();corruRefresh()
`)



// == COLLAPSE == //

// = MISC = //
env.localization.page['embassy'].dialogues["mothframe"] = generateDialogueObject(` 
start
    sys
        ОШИБКА::'визуализация невозможна';'мыслеформа содержит насилие, агрессивные действия';'не соответствует лицензии мыслекола'
        РЕКОМЕНДАЦИЯ::'сообщить об источнике памяти в местные органы власти'

    moth
        чёрт, жаль что патч ФБКС с подобным не помог
        неудивительно, честно говоря
        не знаю, был ли у тебя до этого опыт с боевыми мыслеформами,
        но после 52-го они серьёзно ограничили эту херню - и поэтому оно не работает
        разумеется, у меня есть план на этот случай
            SHOWIF::["mth++embassy-locked", false]
        разумеется, как и говорилось - у меня есть идея
            SHOWIF::"mth++embassy-locked"
        знаешь что такое обрамляющие устройства? типа, в мыслекольном смысле
        они афигеть какие незаконные, во всяком случае для обычных подрядчиков
        короче, мы можем перехитрить твой мыслекол заставив его думать что это воспоминание чего-то другого
        типа... вместо воспоминания о том как акизет дала какому-то челику по морде,
        мы "обрамляем" его так, чтобы это было воспоминание об игре где акизет дала тому же челику по морде
        это может вызвать некоторую нестабильность, но даст тебе войти
        полностью сбивает с толку встроенный ИИ
    
    RESPONSES::self
        значит, ты теперь делаешь игры?<+>game

game
    self
        значит, ты теперь делаешь игры?
    
    moth
        нет, конечно нет
        я ж говорю, это обрамляющее устройство - не совсем игра
        хотя твой мозг будет воспринимать это как игру
        так что... вообще-то, да, наверное
        ну короче, чтобы оно заработало, 
        надо чтобы развледруг модифицировал мыслеформу - я предоставлю всё необходимое // --- идеи получше на patterns needed?
        может сделай вид будто это ты шлёшь данные чтоб он доверился тебе
    
    RESPONSES::self
        почему не что-то вроде фильма<+>movie
        за дело<+>END
    
    RESPONSES::sys
        вернуться в хаб<+>END
            EXEC::moveTo("/hub/")
            FAKEEND::(прямая навигация)
    
movie
    self
        почему нельзя сделать это воспоминанием о чём-то вроде фильма?
    
    moth
        люди говорят что игры работают лучше всего, вот почему
        по-видимому, если оно слишком похоже на настоящее воспоминание, ИИ может это засечь
        кроме того, я ж знаю что ты делаешь когда те скучно
        ты едва можешь усидеть на месте а потом просто уходишь ничего не сказав
        если фильм тебе не зайдёт, ты сделаешь то же самое
    
    self
        но что, если игра мне тоже не зайдёт
    
    moth
        тогда, не знаю, смирись с этим чел
        потому что иначе нам в это вспоминание не влезть
        возвращайся в хаб и я кину эту незаконную хуйню развледругу а потом удалю её
        у нас есть некоторая свобода действий, и проблем у нас не будет, но
        было бы неловко если б это обнаружили на моих жёстких дисках

    RESPONSES::self
        за дело<+>END
    
    RESPONSES::sys
        вернуться в хаб<+>END
            EXEC::moveTo("/hub/")
            FAKEEND::(прямая навигация)
`)
env.localization.page['embassy'].dialogues["mothframe_still"] = generateDialogueObject(` 
start
    sys
        ОШИБКА::'визуализация невозможна';'мыслеформа содержит насилие, агрессивные действия';'не соответствует лицензии мыслекола'
        РЕКОМЕНДАЦИЯ::'сообщить об источнике памяти в местные органы власти'

    moth
        тебе надо поговорить с развледругом чтобы мы дали ему обрамляющее устройство

    RESPONSES::self
        за дело<+>END
    
    RESPONSES::sys
        вернуться в хаб<+>END
            EXEC::moveTo("/hub/")
            FAKEEND::(прямая навигация)
`)

env.localization.page['embassy'].dialogues["d3_newsavewarning"] = generateDialogueObject(`
start
    sys
        ПРЕДУПРЕЖДЕНИЕ::'создание новой итерации очистит конфигурацию старой итерации'
        ПРЕДУПРЕЖДЕНИЕ::'продолжайте';'если старая итерация вспоминания нежелательна'
    
    RESPONSES::self
        сделать это<+>END
            EXEC::cutscene(true);page.newit = 1
            
        неважно<+>END

END::if(page.newit) {env.embassy.newCollapseIteration(page.newit)}
`)
env.localization.page['embassy'].dialogues["d3_partselection"] = generateDialogueObject(`
start
    sys
        ПРЕДУПРЕЖДЕНИЕ::'создание новой итерации очистит конфигурацию старой итерации'
        ПРЕДУПРЕЖДЕНИЕ::'продолжайте только, если старая итерация вспоминания нежелательна'
        УВЕДОМЛЕНИЕ::'дополнительно';'выберите желаемый поток памяти итерации'
        УВЕДОМЛЕНИЕ::'доступно два из трёх потоков';'третий повреждён'
            SHOWIF::["gol__e4_transition", false]
        УВЕДОМЛЕНИЕ::'доступно три потока'
            SHOWIF::"gol__e4_transition"
        ОПРЕДЕЛЕНИЕ::'первый поток';'начало'
        ОПРЕДЕЛЕНИЕ::'второй поток';'спуск';'обслуживанье големов'
        ОПРЕДЕЛЕНИЕ::'третий поток';'уничтоженье';'земледумье'
    
    RESPONSES::self
        первый поток<+>END
            EXEC::cutscene(true);page.newit = 1
            FAKEEND::(обрушенье часть 1)

        второй поток<+>END
            EXEC::cutscene(true);page.newit = 2
            FAKEEND::(обрушенье часть 2)

        третий поток<+>END
            EXEC::cutscene(true);page.newit = 3
            SHOWIF::"gol__e4_transition"
            FAKEEND::(обрушенье часть 3)
            
        неважно<+>END

END::if(page.newit) {env.embassy.newCollapseIteration(page.newit)}
`)

// = RECOLLECTION = //
env.localization.page['embassy'].dialogues["d3_start"] = generateDialogueObject(`
start
    sourceless
        ТОЗИК, ГАКВУ И Я СИДИМ ПОЛУПОДКЛЮЧЁННЫМИ К ВРЕМЯДЕРЖЦУ
            EXEC::content.classList.add('innerfocus', 'showfocus');content.querySelector('.focus').classList.add('day3')
        С ТЕХ ПОР, КАК ЗЕМЛЕМЫСЛЕЦ СЧЁЛ ПРАВИЛЬНЫМ БРОСИТЬ ЕГО С НАМИ,
        ЛИШЬ ЧАСТИЧНОЕ ИСПОЛЬЗОВАНье ЕГО ЭФФЕКТОВ ПРЕВРАТИЛОСЬ В НОРМУ

    tozik
        следующая

    sourceless
        ТАКАЯ ПРИЯТНАЯ СКОРОСТЬ! СТОЛЬКО СВОБОДНОГО ВРЕМЕНИ!
        И КТО ГОВОРИЛ, ЧТО ВЕЛЗИ НЕ УЛЫБАЕТСЯ С СОСТРАДАНьеМ?
        ВНЕ НАШЕГО СОЕДИНЕНья, Я ЧУВСТВУЮ, КАК НАШ ГОЛЕМ-ПОМОЩНИК ПОДКЛЮЧАЕТ СЛУШАТЕЛЯ
            EXEC::document.querySelector('.redundancy').style.setProperty('--dataoffset', 3)

    gakvu
        загружена!
    
    sourceless
        ПАМЯТЬ ЦИСТЫ С ЗАПИСЬЮ СИГНАЛА ИЗЛУЧАЕТСЯ ПО НАШЕМУ СОЕДИНЕНью
        ИДЕНТИФИКАТОР ПРЕДШЕСТВУЕТ ЕГО СОКРАЩЁННОМУ ОТЧЁТУ: ДО КОНТАКТА, θглаз 4, РАДИАНТ 0

    tozik
        нет сдвигов, нет изменений
        следующая
    
    sourceless
        ЗАТЕМ ПОСТУПАЕТ ДРУГАЯ - ДО КОНТАКТА, θглаз 4, РАДИАНТ 1
            EXEC::document.querySelector('.redundancy').style.setProperty('--dataoffset', 6)
        РАЗУМ ТОЗИКА ПРОХОДИТ НАД НЕЮ, ВНИМАТЕЛЬНО, ХОТЯ В ЦЕЛОМ НЕЗАИНТЕРЕСОВАННО
        Я РАЗДЕЛЯЮ ЭТО ЧУВСТВО - РУТИННОСТЬ ЭТОГО ИССЛЕДОВАНья...
        КАЖЕТСЯ БЕСПОЛЕЗНОЮ ПОД РЕЦЕПТОРАМИ МОЕЙ РАБОТЫ С КОМАНДОЙ ГОРДОНА
        ДА И ОТ МЕНЯ МАЛО ПОМОЩИ ЭКИВИКАМ
        СЛИШКОМ СТАРАЮСЬ, ЧТОБЫ НИЧЕГО НЕ ПРОСОЧИЛОСЬ СКВОЗЬ НАШЕ СОЕДИНЕНье
        КАВИК... НЕТ-НЕТ, МНЕ ПРОСТО НУЖНО ПРЕКРАТИТЬ ДУМАТЬ О СЛУЧИВШЕМСЯ
        ОН МЕНЯ ПОСЛУШАЕТ - ОН ОБЯЗАН
    
    gakvu
        акизет?
    
    sourceless
        НО ЧТО ЕСЛИ НЕ ПОСЛУШАЕТ? ОН ТАК СВОБОДНО РАЗГЛАШАЕТ СВОИ МЫСЛИ
        ИЗ-ЗА ЭТОГО НАС ОБОИХ УБЬЮТ, Я ЗНАЮ, ТАК И БУДЕТ, ОН

    gakvu
        акизет
    
    akizet
        что? о--это мне была?

    gakvu
        да

    akizet
        простите, посмотрю сей же θмиг...
    
    sourceless
        Я ОТВЛЕКАЮСЬ ОТ СВОИХ ВНУТРЕННИХ ЗАБОТ,
        ЧЕРЕЗ ВРЕМЯДЕРЖЕЦ ОБРАЩАЯСЬ К ПОДКЛЮЧЁННОМУ СЛУШАТЕЛЮ
        ПОСЛЕ БЕГЛОГО СРАВНЕНья Я ВИЖУ, ЧТО СИГНАЛ СООТВЕТСТВУЕТ НАШИМ ЗАГРУЖЁННЫМ АРХИВАМ
    
    akizet
        эта тоже совпадает
    
    tozik
        хмм...
        мы зашли достаточно далеко
        можно допустить, что единственным расхожденьем является первый пик
        спасибо за помощь, в одиночку это заняло бы гораздо больше времени
    
    gakvu
        you owe me a receptor curl
    
    tozik
        not happening
        пора закругляться - отключите этот слушатель, а я...
            EXEC::env.embassy.day3Static();
        ...хах

    sourceless
        ЧТО-ТО НЕ ТАК
        ДРУГИЕ ТОЖЕ ЭТО ЧУВСТВУЮТ
    
    gakvu
        эй,
    
    tozik
        тихо
        я тоже слышу
    
    sourceless
        ...
        ...
        
    tozik
        что это?
        это от слушателя?
    
    sourceless
        КАКОЙ-ТО ШЁПОТ... Я ДОЛЖНА ВНИМАТЕЛЬНО ПРИСЛУШАТЬСЯ
        НО КАК ТОЛЬКО Я ПОЧТИ УЛАВЛИВАЮ СМЫСЛ...
        БОЛЬ
            EXEC::env.embassy.day3Signal();
            WAIT::6000

    sourceless quiet
        ЭТО ПОСЛАНье БЕЗ СЛОВ
        ОНО НЕ ДЛЯ МЕНЯ
        НО ОНО РАЗЛАМЫВАЕТ МЕНЯ
        СТРАННЕЙШАЯ БОЛЬ... ГОЛОД, ПОГЛОЩАЮЩИЙ ВСЁ
            EXEC::content.classList.add('collapse', 'show-vn');content.classList.remove('fade-stage');content.classList.add('slowpain');vn.renderParty()
            WAIT::4000
        ЯРОСТЬ... ПРЕДАТЕЛЬСТВО... МЕСТЬ
        ОНО... НАС ЗНАЕТ...
        ...
            EXEC::content.classList.remove('innerfocus');content.classList.remove('painmode');changeBgm(env.embassy.music_collapse, {length: 6000});
    
    sourceless
        КОГДА Я ПРИХОЖУ В СЕБЯ, МНЕ КАЖЕТСЯ, ЧТО ПО МОЕМУ СОЗНАНью ПРОТОПТАЛСЯ ВЕЙЛЬК
        МЫ ВСЁ ЕЩЁ ПОДКЛЮЧЕНЫ К ВРЕМЯДЕРЖЦУ
            EXEC::content.classList.remove('slowpain')
        Я УПАЛА
        И ГАКВУ, И ТОЗИК... И ДАЖЕ ГОЛЕМ
            EXEC::content.classList.remove('painprep')
        ХОТЯ ГОЛЕМ В БОЛЕЕ ТЯЖЕЛОМ СОСТОЯНьи
        СВЕЧЕНье ЦИСТОЗНОГО СТЕКЛА ПРЕКРАТИЛОСЬ, ЗАПОЛНЯЯ КОМНАТУ ПОЛУТЬМОЮ

    akizet
        гакву?
        тозик?
        скажите что-нибудь

    gakvu
        ...
        больно
    
    sourceless
        ТОЗИК МЕДЛЕННО ВСТАЁТ НА НОГИ
            EXEC::env.embassy.vn({bg: true, tozik: 'fullview'})
        ГАКВУ ЦЕПЛЯЕТСЯ ЗА БЛИЖАЙШИЙ СЛУШАТЕЛЬ
            EXEC::env.embassy.vn({bg: true, gakvu: 'fullview'})
        ОДНА ИЗ ЕЁ НОГ ПОТЕРЯЛА ФОРМУ, ПРЕВРАТИВШИСЬ В БЕСФИГУРНУЮ ФИОЛЕТОВУЮ СЛЯКОТЬ
        НО ОНА УЖЕ НАЧАЛА ЕЁ ПРЕОБРАЗОВЫВАТЬ
        ЧТО ВДОХНОВЛЯЕТ МЕНЯ НА ПРОВЕРКУ СОБСТВЕННОЙ ФОРМЫ, КОТОРАЯ...
        ДА, ОНА В ПОРЯДКЕ
    
    gakvu
        ...что по нам только что попало?
        это была бомба?
    
    tozik
        не вижу физического ущерба
    
    sourceless
        ГАКВУ РОЕТСЯ В СВОЕЙ НАКИДКЕ ИЗ ЛОЖНОЙ ВЕЙЛЬКОВОЙ КОЖИ, ИЗВЛЕКАЯ МАЛЕНЬКУЮ КОРРУЦИСТУ
        СРЕДСТВО СВЯЗИ, НО ОНО ПЛАВИТСЯ В ЕЁ КОГТЯХ
    
    gakvu
        Йè§¤ÿ
        мой коммуникатор расплыл
        о, нет--мои среды!!
    
    sourceless
        ТОЗИК ТОЖЕ ПРОВЕРЯЕТ СВОЮ ЦИСТУ СВЯЗИ
    
    tozik
        и мой
    
    sourceless
        О НЕТ
        РАЗВЛЕДРУГ??
    
    funfriend
        ПРИВЕТ АКИЗЕТЕШЕ!!!
    
    sourceless
        МЕНЯ НАКРЫВАЕТ ВОЛНА ОБЛЕГЧЕНья 
        РАЗВЛЕДРУГ: У НАС ЕСТЬ ВОЗМОЖНОСТЬ ПЕРЕДАЧ СЕРОЕ?
    
    funfriend
        ДА! ХОТИТЕ, ЧТОБЫ Я ИХ ВКЛЮЧИЛ СЕЙ ЖЕ θмиг?
    
    akizet
        подождите. моя работает
    
    sourceless
        ВКЛЮЧИ ПРИЁМ

    funfriend
        ВКЛЮЧАЮ... В СЕЙ θмиг!
    
    sourceless
        ШУМ - ЗОВ ГРОМЧЕ, КАК НИКОГДА РАНЬШЕ
        ИЛИ--ЗОВ ЛИ ЭТО? ОН НЕЗНАКОМ МНЕ
        И ИЗ ОКРЕСТНОСТЕЙ ТРАНСЛИРУЮТСЯ сообщенья...
        НО ТОЛЬКО ИХ ЭМОЦИИ ЗВУЧАТ ДОСТАТОЧНО ГРОМКО, ЧТОБЫ ПРОНЗИТЬ ЭТОТ ШУМ
        ПАНИКА, БОЛЬ, СТРАХ, ОТЧАЯНье - КОМУ-ТО НУЖНА ПОМОЩЬ
        ТОЗИК И ГАКВУ УСТАВИЛИСЬ НА МЕНЯ В ОЖИДАНьи
    
    akizet
        всё плохо
        чем бы ни был этот шум, он до сих пор идёт
        я не могу ничего разобрать и ни с кем связаться
        единственное, что я улавливаю - это страх
        надеюсь, с остальными всё в порядке...
    
    sourceless
        РЕЦЕПТОРЫ ГАКВУ ГНУТСЯ С ТРЕВОГОЮ
        ТОЗИК ОТВОДИТ ВЗГЛЯД В СТОРОНУ - БЫТЬ МОЖЕТ, В РАЗДУМЬЯХ
    
    gakvu
        на нас напали светлые близнецы?
        могли бы они использовать серое?

    tozik
        нет. смотрите

    sourceless
        ОХ - ЕГО ВЗГЛЯД БЫЛ ОБРАЩЁН НА СЛУШАТЕЛЕЙ
            EXEC::env.embassy.vn({fade: true});specialCam('listener-zoom')
        ВНЕШНЕ ОНИ НЕ ТРОНУТЫ, НО ИХ ПРОЕКЦИИ...
        ПУЛЬСИРУЮТ БЕССВЯЗНОСТЬЮ
    
    tozik
        это не новый пик
            EXEC::env.embassy.vn({fade: false})
        я не знаю, что это такое...
        но человечество на такое не способно
            EXEC::specialCam(false)
    
    gakvu
        ну, что бы ни происходило,
        если наше оборудованье расплывает...
        то наверняка и внутренние части шпиля тоже
        нам нужно убраться отсюда
    
    akizet
        соглашусь - держитесь за мною
        ах,
    
    sourceless
        В ЭТОТ МОМЕНТ СОГЛАСья МЫ ВСЕ, ПОХОЖЕ, ПОНИМАЕМ ОДНО И ТО ЖЕ
        МЫ ПО-ПРЕЖНЕМУ ПОДКЛЮЧЕНЫ К ВРЕМЯДЕРЖЦУ, НЕСМОТРЯ НА ОТСУТСТВИЕ ВЕН У СОЕДИНИТЕЛЕЙ
        Я ВСЁ ЕЩЁ ЧУВСТВУЮ СОЕДИНЕНье, ПУСТЬ ОНО БОЛЬШЕ ПОХОДИТ НА ОЩУЩЕНья ОТ ЦИСТЫ СВЯЗИ
    
    timestopper
        А УДАЛЁННОЕ ПОДКЛЮЧЕНье ВСЕГДА ПОДДЕРЖИВАЛОСЬ?

    tozik
        да
        ты разве не слушала, когда мы его получили?
    
    gakvu
        хихи
            EXEC::env.embassy.vn({tgolem: 'showleft'})

    sourceless
        В ТОТ ЖЕ θмиг, КОГДА ГАКВУ СОБИРАЕТСЯ СНЯТЬ СОЕДИНИТЕЛЬ, НАШ ГОЛЕМ-ПОМОЩНИК СКРЕБЁТСЯ ОБ ПОЛ
            EXEC::env.embassy.vn({tgolem: 'display show', gakvu: 'defocus', tozik: 'defocus'})
        МЫ ВСЕ ЗАМИРАЕМ, НАШИ ВЗГЛЯДЫ СХОДЯТСЯ НА НЁМ
            EXEC::changeBgm(env.embassy.music_unsafe, {rate: 1})
        ОН КОЕ-КАК ПОДНЯЛСЯ ДО НЕНАДЁЖНОЙ ЛЕВИТАЦИИ, НА ЕГО ЛИЦЕ - НЕПОНЯТНЫЙ СИМВОЛ
            EXEC::env.embassy.vn({tgolem: 'display show center'})
        ЧТО-ТО УПРАВЛЯЕТ ИМ ИЗ ЗЕМЛЕДУМья - НО НЕ ВЕКОА?
    
    aggressor
        п   р о    ь п р   о  чь ь
        я н  е д н ме  д а  м
    
    gakvu
        что-что?
    
    sourceless
        ЕГО СТИЛИЗОВАННЫЕ РУКИ ВНЕЗАПНО ОБОСТРЯЮТСЯ В ШИПЫ, И ОН БРОСАЕТСЯ НА ГАКВУ
            EXEC::env.embassy.vn({tgolem: 'display show approach'})
        ÷Э€T$0 - ЭТО НАПАДЕНье
    
    akizet
        назад!!

    sourceless
        ЭКСПЕРИМЕНТАЛЬНО, Я СГИБАЮ НЕРВ СОЕДИНЕНья С ВРЕМЯДЕРЖЦЕМ
        И ВРЕМЯ ДЕЙСТВИТЕЛЬНО ЗАМЕДЛЯЕТСЯ, НО НЕ ОСТАНАВЛИВАЕТСЯ - В ЭТОМ КОМПРОМИСС УДАЛЁННОГО ПОДКЛЮЧЕНЬЯ
        ЭТИ ДВОЕ НЕ ГОТОВЫ К БОЮ, НО С МОИМ ОПЫТОМ РАБОТЫ НА ПОВЕРХНОСТИ
        ДА, Я МОГУ ИХ СПАСТИ
        МЫСЛИ, КОТОРЫЕ МОГУТ ПРИНАДЛЕЖАТЬ ТОЛЬКО ГАКВУ, ОТДАЮТСЯ ЭХОМ СКВОЗЬ НАШЕ СОЕДИНЕНье
    
    timestopper
        ЧТО МНЕ ДЕЛАТЬ ЧТО МНЕ ДЕЛАТЬ
        ОН ЦЕЛИТСЯ ПРЯМО В МОЁ МЫСЛЕЯДРО ОН МЕНЯ УБЬЁТ
        МНЕ КОНЕЦ
    
    akizet
        нет, ты будешь в полном порядке
        следуйте моим указаньям
    
    RESPONSES::akizet
        спасти гакву<+>END
            EXEC::env.embassy.vn({fade: true});env.embassy.startTutorialGolem();ratween(env.bgm, 0.75, 5000)
            SHOWIF::['gameplay_off', false]
            FAKEEND::(начать бой)
        спасти гакву<+>CHANGE::d3_tutorial_end
            EXEC::vn.done();
            SHOWIF::['gameplay_off', true]
            FAKEEND::(пропустить бой)

SKIP::env.embassy.skips.d3_start()
SKIPTIME::700
END::env.embassy.vn({bg: false, fade: false, gakvu: '', tozik: '', tgolem: ''})
`)

env.localization.page['embassy'].dialogues["d3_tutorial_start"] = generateDialogueObject(`
start
    sourceless
        В НАШЕМ ИСКАЖЁННОМ ВРЕМЕНИ ВОЗМОЖНО ПРОВЕДЕНье ПРОДУМАННЫХ МАНЕВРОВ
        ГОЛЕМ УСТРЕМЛЁН К ГАКВУ, НО ЕГО ЛЕВЫЙ БОК УЯЗВИМ
        ИДЕАЛЬНАЯ ВОЗМОЖНОСТЬ ДЛЯ НАНЕСЕНья УДАРА
        И ПОСЛЕ ТОГО, КАК МОИ АТАКИ ДАДУТ ОСТАЛЬНЫМ ШАНС НАПАСТЬ
        Я СМОГУ НАПРАВИТЬ ИХ В ДЕЙСТВИЕ...

    sys
        ВНИМАНИЕ::'инициировано мыслеформенный бой'
        УВЕДОМЛЕНИЕ::'снижайте здоровье вражеской команды';'чтобы победить её'
        УВЕДОМЛЕНИЕ::'выбирайте действия мыслеформ соответствующим образом'
        ПРЕДУПРЕЖДЕНИЕ::'если команда союзников потерпит поражение';'поток памяти распадётся'

    moth
        работает!!
            SHOWONCE::
        сорян. всё, молчу
            SHOWONCE::
        займёмся делом
            SHOWONCE::

    sourceless
        Я ЗАТАЧИВАЮ ПРАВЫЙ КОГОТЬ,
        ИБО ПРОНЗИТЬ КОРРУ - ВЕРНЫЙ СПОСОБ ЕГО УНИЧТОЖЕНья
        НО С ТАКИМ ЖЕ УСПЕХОМ Я МОГЛА БЫ И НАБРОСИТЬСЯ НА НЕГО
        ГРУБАЯ СИЛА ДЕЗОРИЕНТИРУЕТ ДАЖЕ САМЫХ ЭФФЕКТИВНЫХ ГОЛЕМОВ
        ХММ...
        КОНЕЧНО, ЕЩЁ Я МОГЛА БЫ ПРОСТО ПРЕГРАДИТЬ ЕМУ ПУТЬ И ПРИГОТОВИТЬСЯ ОТРАЗИТЬ ЕГО
    
    RESPONSES::akizet
        действовать<+>END
            EXEC::env.rpg.classList.remove('hideteams')
            FAKEEND::(продолжить)
`)
env.localization.page['embassy'].dialogues["d3_tutorial_gakvu"] = generateDialogueObject(`
start
    sourceless
        ПОСЛЕ УДАЧНОГО ОТВЛЕЧЕНья МОЙ ВНУТРЕННИЙ ГЛАЗ ОБРАЩАЕТСЯ К ОСТАЛЬНЫМ
            EXEC::change("PAGE!!gaktut", true)
    
    akizet
        гакву,
        бей следующею
        одна я не справлюсь
    
    gakvu
        акизет...
        а--у меня ничего нет, то есть--
    
    akizet
        импровизируй, схвати что-нибудь, ударь его
        это не имеет значенья
        я могу помочь направить тебя
        мы добьёмся победы
    
    gakvu
        хорошо!!
        может, я могла бы... да, у меня что-то да найдётся
    
    RESPONSES::gakvu
        атаковать<+>END
            FAKEEND::(продолжить)
`)
env.localization.page['embassy'].dialogues["d3_tutorial_tozik"] = generateDialogueObject(`
start
    sourceless
        ЧТО ГАКВУ ТОЛЬКО ЧТО СДЕЛАЛА?
            SHOWIF::'PAGE!!earlygak'
        ВЫГЛЯДЕЛО ТАК, БУДТО ОНА ДАЖЕ НЕ КОСНУЛАСЬ ЕГО...
            SHOWIF::'PAGE!!earlygak'
        НЕВАЖНО - МЫ ДОЛЖНЫ РАСПРАВИТЬСЯ С ГОЛЕМОМ
            SHOWIF::'PAGE!!earlygak'
        СЛЕДУЮЩИМ Я ОГЛЯДЫВАЮСЬ НА ТОЗИКА
            EXEC::change("PAGE!!toztut", true)
        НО МНЕ И НЕ НУЖНО НИЧЕГО ГОВОРИТЬ
    
    tozik
        если нас в какой-либо момент ранят,
        на мне есть есть инструменты для срочных починок
    
    RESPONSES::tozik
        атаковать<+>END
            FAKEEND::(продолжить)
`)
env.localization.page['embassy'].dialogues["d3_tutorial_akizet"] = generateDialogueObject(`
start
    sourceless
        ПЕРЕД ТЕМ, КАК ПРОДОЛЖИТЬ, Я СНОВА СМОТРЮ НА ОСТАЛЬНЫХ
        ИМ СТРАШНО - КАК, НАВЕРНЯКА, И ДОЛЖНО БЫТЬ
        ДА И В САМОМ ДЕЛЕ, МНЕ ТОЖЕ...
        НО ЭТОТ ГОЛЕМ - НИЧТО ПЕРЕД НАМИ

    akizet
        видите ли вы теперь?
        я передаю вам свои знанья,
        и с их помощью вы наносите удары с такою лёгкостью!
        продолжайте следовать за мною!
    
    timestopper
        ХОРОШО!
    
    RESPONSES::akizet
        атаковать<+>END
            EXEC::changeBgm(env.embassy.music_combat, {rate: 0.5, seek: 100})
            FAKEEND::(продолжить)
`)
env.localization.page['embassy'].dialogues['d3_tutorial_end'] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ВНИМАНИЕ::'пропущен геймплей мыслеформенного боя';'переключите в системном меню по желанию'
            EXEC::vn.renderParty()
____END

    sourceless
        ГОЛЕМ РАЗБИВАЕТСЯ О ЗЕМЛЮ,
        ГДЕ ЕГО ГЕОМЕТРИЧЕСКИЕ КОМПОНЕНТЫ РАСПЛАВЛЯЮТСЯ В КОРРУЦИСТОЗНЫЕ ОТХОДЫ
        ВНУТРИ НАХОДЯТСЯ НЕСКОЛЬКО <span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::${env.ITEM_LIST['restorative'].description}">ВОССТАНОВИТЕЛЬНЫХ ЦИСТ</span> ДЛЯ БЫСТРЫХ ПОЧИНОК, ТАК ЧТО Я БЕРУ ИХ
            EXEC::env.embassy.conditionalItem('restorative', 3, 'tutrest')
        ГАКВУ, ТОЗИК И Я ОБМЕНИВАЕМСЯ ВЗГЛЯДАМИ - НЕ ТОЛЬКО ТОРЖЕСТВУЮЩИМИ, НО И ПОТРЯСЁННЫМИ
            EXEC::env.embassy.vn({bg: true, gakvu: 'fullview', tozik: 'fullview'})
        ИХ РУКИ И РЕЦЕПТОРЫ ДРОЖАТ, КАК У НОВОБРАННЫХ ПЕЩЕРНЫХ СТРАЖЕЙ
    
    akizet
        если это происходит по всему посольству...
        ...
        слушайте,
        держитесь ближе ко мне, и не снимайте соединители с времядержцем
        мы наверняка сможем использовать их, пока не покинем посольство
        но нам нужно отсюда выбраться
        надо проверить, работает ли ещё движедруг
    
    sourceless
        ОСТАЛЬНЫЕ ПРОСТО СКЛОНЯЮТ РЕЦЕПТОРЫ В УТВЕРЖДЕНье И ДЕРЖАТСЯ РЯДОМ
        В СОЕДИНЕНьи С ВРЕМЯДЕРЖЦЕМ МЕЖДУ НАМИ ЦАРИТ НАПРЯЖЕНье
        ЧТО НЕМНОГО СТРАННО... Я БЫ ПОНЯЛА СТРАХ, НО,
        КТО-ТО МЕНЯ БОИТСЯ?

    sys
        УВЕДОМЛЕНИЕ::'переключение геймплея возможно в системном меню'

    RESPONSES::akizet
        продолжить двигаться<+>END
            EXEC::revertBgm();env.embassy.vn({bg: false, gakvu: '', tozik: ''})

SKIP::env.embassy.conditionalItem('restorative', 3, 'tutrest');vn.done();revertBgm()
`)

env.localization.page['embassy'].dialogues["d3_connector"] = generateDialogueObject(`
start
    sourceless
        ДОПОЛНИТЕЛЬНЫЙ СОЕДИНИТЕЛЬ МОГ БЫ НАМ ПРИГОДИТЬСЯ
            SHOWIF::['PAGE!!connectors', false]
        ТАК ЧТО Я ПОДХОЖУ, ЧТОБЫ ВЫДЕРНУТЬ ОДИН ИЗ ПОДКЛЮЧЁННЫХ...
            SHOWIF::['PAGE!!connectors', false]
        ТОЛЬКО ДЛЯ ТОГО, ЧТОБЫ ОН ВСТРЕТИЛ МОЙ КОГОТЬ С УЖАСАЮЩЕЮ МЯГКОСТЬЮ
            SHOWIF::['PAGE!!connectors', false]
        ОН РАСПЛЫЛ - ВСЕ ОНИ
            SHOWIF::['PAGE!!connectors', false]

    akizet
        что...
            SHOWIF::['PAGE!!connectors', false]
        они мертвы??
            SHOWIF::['PAGE!!connectors', false]
        но времядержец же в порядке!!!
            SHOWIF::['PAGE!!connectors', false]

    tozik
        хммм...
            SHOWIF::['PAGE!!connectors', false]
        большинство меньших устройств, похоже, были сломаны этим сигналом
            SHOWIF::['PAGE!!connectors', false]
        и учитывая, что эти соединители самосодержащие... всё сходится
            SHOWIF::['PAGE!!connectors', false]
        как ни прискорбно
            SHOWIF::['PAGE!!connectors', false]
        мы должны беречь те, что у нас уже есть, как зеницу ока
            SHOWIF::['PAGE!!connectors', false]

    sourceless
        СМЫСЛА НЕТ - ОНИ ВСЕ МЕРТВЫ
            SHOWIF::'PAGE!!connectors'
    
    RESPONSES::akizet
        это плохо<+>END
            EXEC::change("PAGE!!connectors", true)
            FAKEEND::(продолжить)
`)

env.localization.page['embassy'].dialogues["movefriend_disabled"] = generateDialogueObject(`
start
    sourceless
        ЧТО-ТО НЕ ТАК С ЭТИМ ДВИЖЕДРУГОМ
            EXEC::specialCam("movefriend_examine");pauseSwapCam(true)
    
    timestopper
        ОН МЁРТВ?
        КАК НАМ ПЕРЕДВИГАТЬСЯ, ЕСЛИ ОН МЁРТВ?
    
    tozik
        давайте посмотрю...
            EXEC::env.embassy.vn({tozik: 'defocus'});
    
    sourceless
        ТОЗИК ВСТАЁТ НА КОЛЕНИ ВОЗЛЕ ЕГО ЛИЦА, ОСМАТРИВАЯ ТЕ ЧАСТИ, ЧТО ВЫТЯГИВАЮТСЯ ИЗ ИЗОГНУТОЙ СТЕНЫ
        ОН НАГИБАЕТСЯ, ПРОТЫКАЯ ВНЕШНЕЕ ЦИСТОЗНОЕ СТЕКЛО ТЕМ ЖЕ ИНСТРУМЕНТОМ, С КОТОРЫМ АТАКОВАЛ
            SHOWIF::['PAGE!!earlytoz']
        ДО ЭТОГО МНЕ НЕ УДАЛОСЬ ЕГО РАЗГЛЯДЕТЬ, НО ТЕПЕРЬ Я ВСЁ ВИЖУ
            SHOWIF::['PAGE!!earlytoz']
        ОН НАГИБАЕТСЯ, ПРОТЫКАЯ ВНЕШНЕЕ ЦИСТОЗНОЕ СТЕКЛО КАКИМ-ТО...
            SHOWIF::['PAGE!!earlytoz', false]
        ЧТО ЭТО? ВПЕРВЫЕ ВИЖУ, КАК ОН ОБНАЖАЕТ ЭТОТ ИМПЛАНТ
            SHOWIF::['PAGE!!earlytoz', false]
        ИЗ ОДНОГО ИЗ ЕГО КОГТЕЙ ВЫДВИНУЛСЯ КОРРУСКИВИ, КРЕПЯЩИЙСЯ К ПАЛЬЦУ
        НО ЗДЕСЬ ОН НЕ ПОМОЖЕТ
        ЕСЛИ БЫ ДВИЖЕДРУГ БЫЛ ФИЗИЧЕСКИ ПОВРЕЖДЁН, ТО ВОЗМОЖНО, НО...
        В КАКОМ ОТДЕЛЕ ТОЗИК БЫЛ ДО НАШЕГО...?

    tozik
        он умирает, но не мёртв
            EXEC::env.embassy.vn({bg: true, tozik: 'fullview'});
        мы можем его починить...
        нет, мы <em>могли бы</em> его починить, будь у нас способ получить нужные материалы
        но если все движедрузья в таком состояньи, никакие пути не создаются
        мы не сможем отсюда выбраться
    
    akizet
        что...
        мы не можем ждать!
    
    tozik
        очевидно
        но в нашей камере нет ничего полезного
    
    sourceless
        РЕЦЕПТОРЫ ТОЗИКА СЛЕГКА СКРУЧИВАЮТСЯ, И ОН МОЛЧИТ... НЕТ ИДЕЙ, ПОЛАГАЮ
        ГАКВУ ПО-СТРАННОМУ ТИХАЯ, ПРИСЛОНИВШАЯСЯ К СТЕНЕ ВОЗЛЕ НАШЕГО ПУТИ К КАМЕРЕ ИССЛЕДОВАНИЙ
    
    akizet
        ну...
        что насчёт зоны отдыха? разве она не находится всего несколькими θсегментами ниже?
    
    tozik
        ты намерена прокопаться сквозь стены?
        чёрное корру - это не просто инструкция по пигментации
        плотность здесь почти на уровне естественных шпилей
        никакое количество наземного опыта не позволит тебе пробиться через один-единственный θсегмент,
        не говоря уже о "нескольких"
        ...
        извини

    sourceless
        ТОЗИК ПО-ПРЕЖНЕМУ СМОТРИТ ПРОЧЬ, ПУСТЬ ЕГО ПОЗА И СПРЯТАННЫЕ РЕЦЕПТОРЫ ГОВОРЯТ ОБО ВСЕМ
        Я ПОНИМАЮ ЕГО ФРУСТРАЦИЮ, НО... ЧТО ЕЩЁ НАМ ДЕЛАТЬ?
        ...
        ПРОХОДИТ МОМЕНТ, НИЧЕГО В СЕБЕ НЕ СОДЕРЖАЩИЙ, БУДТО ОБЛАКО, ПРОПЛЫВАЮЩЕЕ ПОД ГЛАЗОМ
        ГАКВУ ОТТАЛКИВАЕТСЯ ОТ СТЕНЫ, ОЩУПЫВАЯ КРАЯ ПЕРЕМЕСТИТЕЛЯ
            EXEC::env.embassy.vn({gakvu: 'defocus'});
        
    gakvu
        эй
        слушайте
        если вы двое согласны никому об этом не рассказывать
        я могу проложить нам путь в соседние комнаты

    sourceless
        Я ПЯЛЮСЬ, ОБЕСКУРАЖЕННАЯ. ТОЗИК ПОВОРАЧИВАЕТСЯ
    
    gakvu
        наша любимая зона отдыха не так уж и далеко
            EXEC::env.embassy.vn({gakvu: 'fullview'});
        и один уголок находился под регенерациею
        так что контейнеры в том уголке наверняка содержат сфер
        и... рядом тоже есть θответвленье персонала
        мы могли бы найти материалы в обоих
        как насчёт того, чтобы начать с отдыха?
        но. поклянитесь. разгневайся велзи?
    
    akizet
        если у тебя есть идея, то она пока что единственная
        разгневайся велзи!
    
    sourceless
        ТОЗИК НИЧЕГО НЕ ГОВОРИТ, НО МЫ ЧУВСТВУЕМ ЕГО СОГЛАСье СКВОЗЬ ВРЕМЯДЕРЖЦА
    
    gakvu
        хорошо
    
    sourceless
        ГАКВУ ВСТАЁТ ПРЯМО ПЕРЕД СТЕНОЮ ПЕРЕМЕСТИТЕЛЯ, ВЫТЯНУВ РУКИ И РЕЦЕПТОРЫ
            EXEC::env.embassy.vn({fade: true});specialCam("recreation_open")
        ПУЛЬС СТРАННОЙ МЫСЛИ, И ОНА ПЕРЕСТРАИВАЕТСЯ - МЕДЛЕННО ОБРАЗУЕТСЯ НЕКИЙ ПУТЬ
            EXEC::change("PAGE!!recreation_unlocked", true);step()
        ДОЛГИЙ КОРИДОР, ИДУЩИЙ ПОД НЕБОЛЬШИМ УКЛОНОМ, ДО САМОЙ ЗОНЫ ОТДЫХА...
    
    akizet
        как--?
    
    sourceless
        ГАКВУ ПОДНИМАЕТ СВОИ КОГТИ, ЛАДОНЯМИ ВВЕРХ И НА УРОВНЕ ЛИЦА
            EXEC::env.embassy.vn({tozik: 'defocus', fade: false});
        МОЛИТВЕННЫЙ ЖЕСТ СТРУКТУРИСТОВ...

    gakvu
        по воле велзи, разумеется
        нас благословило чудо
    
    sourceless
        ЕЁ РЕЦЕПТОРЫ ЦИНИЧНО ИЗГИБАЮТСЯ - ЭТО ШУТКА
        МРАЧНОЕ ВРЕМЯ ДЛЯ ЧЕГО-ТО ПОДОБНОГО, НО... ВЕДЬ СРАБОТАЛО
        Я ЧУВСТВУЮ РАЗДРАЖЕНье ТОЗИКА - ЕМУ ТОЖЕ ОЧЕНЬ ХОТЕЛОСЬ БЫ ЗНАТЬ
        КОНЕЧНО, И ГАКВУ ЭТО ПОНИМАЕТ, ТАК ЧТО ЕЁ КОГТИ ОПАДАЮТ

    gakvu
        извините, просто стараюсь оставаться позитивною
        моё мыслеядро устроено по паттерну переносного землемыслья
    
    tozik
        это незаконно
            EXEC::env.embassy.vn({tozik: 'fullview'});
    
    gakvu
        о да это так
        разгневайся велзи, правда?
        не говорите об этом, или я мертва. серьёзно
    
    akizet
        подожди - ты можешь проложить путь подальше? наружу, или в ангар?
    
    gakvu
        никак, я сожгу все свои резервы, если буду использовать так много так быстро
        лучше дождаться спасенья, нежели пытаться провернуть подобное
        мы просто должны пошевелиться и починить эту штуку
    
    sourceless
        МНЕ ОЧЕНЬ ХОЧЕТСЯ СПРОСИТЬ, ОТКУДА У НЕЁ ЭТО, НО...
        НЕ ЧАСТЬ ЛИ ОНА КОНФЛИКТА? ЕСЛИ Я НЕ БУДУ ОСТОРОЖНА, ОНА ПОЙМЁТ, ЧТО Я ЗНАЮ?
        ПОКА ЧТО Я ПРИМУ ЭТО, КАК ЕСТЬ - СЕЙ θМИГ У НАС БОЛЕЕ НАСУЩНЫЕ ВОПРОСЫ
        ПУТЬ К ЗОНЕ ОТДЫХА ОТКРЫТ
        НАМ НУЖНО НАЙТИ ДОСТАТОЧНО МАТЕРИАЛОВ, ЧТОБЫ ПОЧИНИТЬ ЭТОГО ДВИЖЕДРУГА
    
    tozik
        согласен

    RESPONSES::akizet
        продолжить<+>END
            EXEC::env.embassy.vn({gakvu: '', tozik: '', bg: false});specialCam(false);pauseSwapCam(false)

SKIP::change("PAGE!!recreation_unlocked", true);step();vn.done();specialCam(false);pauseSwapCam(false)
`)

env.localization.page['embassy'].dialogues["d3_genericenemy"] = generateDialogueObject(`
start
    sourceless
        МЫ ОКРУЖЕНЫ БЕССВЯЗНЫМИ ВРАГАМИ
            EXEC::forceSwapCam(true)
        НАШ ЕДИНСТВЕННЫЙ ВЫХОД - ДРАТЬСЯ

        ИЛИ НЕТ?
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'
        МЫ ТАКЖЕ МОГЛИ БЫ ВОСПОЛЬЗОВАТЬСЯ ОТКЛЮЧИТЕЛЕМ
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'
        ХОТЯ ПОЗЖЕ МОГЛО БЫ НАЙТИСЬ БОЛЕЕ ПОДХОДЯЩЕЕ ВРЕМЯ...
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'

    RESPONSES::akizet
        напасть<+>END 
            SHOWIF::['gameplay_off', false]
            FAKEEND::(начать бой)
            EXEC::env.combat.dynamicCombat()

        пропустить<+>END
            SHOWIF::['gameplay_off', true]
            FAKEEND::(пропустить бой)
            EXEC::env.combat.dynamicCombat({dry: true});cutscene(true);setTimeout(()=>{cutscene(false);env.combat.dynamicCallback(env.rpg.enemyTeam)}, 1010)

        отключить<+>disable
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'
            FAKEEND::(использовать заряд отключителя)

disable
    sourceless
        Я ОСТОРОЖНО НАЦЕЛИВАЮ ОТКЛЮЧИТЕЛЬ
            EXEC::removeItem(env.ITEM_LIST.disabler);
        И С ИМПУЛЬСОМ МОЕЙ РУКИ НЕСКОЛЬКО СПЕЦИАЛИЗИРОВАННЫХ ШИПОВ ЯРОСТНО ВЫСТРЕЛИВАЮТ НАРУЖУ
        ОНИ ВСАЖИВАЮТСЯ В НАШИХ ВРАГОВ, И В МГНОВЕНье ОКА ТЕ НАЧИНАЮТ ПЛАВИТЬСЯ
            EXEC::setTimeout(()=>play('shot2', 0.6), 300)
    RESPONSES::akizet
        продолжить<+>END
            EXEC::env.combat.dynamicCombat({dry: true});cutscene(true);setTimeout(()=>{cutscene(false);env.combat.dynamicCallback(env.rpg.enemyTeam)}, 1010)
            FAKEEND::(подождать)
`)
env.localization.page['embassy'].dialogues["d3_genericenemyvictory"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ВНИМАНИЕ::'пропущен геймплей мыслеформенного боя';'переключите в системном меню по желанию'
____END

    sourceless
        НАШИ ВРАГИ ЛЕЖАТ ПОВЕРЖЕННЫМИ
        TEXEC::env.combat.dynamicReward()

    RESPONSES::akizet
        продолжить<+>END
            EXEC::forceSwapCam(false)
`)
env.localization.page['embassy'].dialogues["d3_loss"] = generateDialogueObject(`
start
    sourceless
        ОСТРАЯ КОНЕЧНОСТЬ ПОРАЖАЕТ МОЁ МЫСЛЕЯДРО
        ...
            EXEC::content.classList.add('goodbye');ratween(env.bgm, 0.2, 10000);content.classList.add('dying');
        ЧТО ПРОИСХОДИТ
        ВСЁ ОСТАНОВИЛОСЬ
        ЭЙ?
        ТОЗИК? ГАКВУ??
        РАЗВЛЕДРУГ?
        КТО-НИБУДЬ ЕСТЬ?
        ПОМОГИТЕ

    unknown
        ...
            SHOWONCE::

    sys
        ОПОВЕЩЕНИЕ::'уничтожен локус вспоминания';'итерация не может продолжиться'
        РЕКОМЕНДАЦИЯ::'начать новую итерацию';'загрузить сохранённую итерацию'
            SHOWIF::'collapseSave'
        РЕКОМЕНДАЦИЯ::'начать новую итерацию'
            SHOWIF::['collapseSave', false]

    RESPONSES::sys
        вернуться к выбору<+>END
            EXEC::moveTo("/local/ocean/embassy/")
`)

env.localization.page['embassy'].dialogues["d3_c_responses"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::gakvu
        структуризм?<+>structurist
            SHOWIF::"PAGE!!recreation_unlocked"
        комната казки?<+>kazkiroom
            SHOWIF::"PAGE!!kazkiroom"
        светящаяся накидка<+>coat

    RESPONSES::tozik
        коррускиви?<+>corruskivi
            SHOWIF::"PAGE!!recreation_unlocked"
        теория о нападеньи?<+>theory
            SHOWIF::[["PAGE!!kazkichest"], ["PAGE!!barfriend"]]

    RESPONSES::akizet
        как вы?<+>holdingup
        давайте продолжим<+>END
            EXEC::env.embassy.vn({bg: false, tozik: "", gakvu: ""})
`)
env.localization.page['embassy'].dialogues["d3_c"] = generateDialogueObject(`
loop
    RESPOBJ::d3_c_responses

start
    sourceless
        МЫ ОСТАНАВЛИВАЕМСЯ НА ПЕРЕРЫВ
            EXEC::env.embassy.vn({bg: true, tozik: "fullview", gakvu: "fullview"})
        ХОТЯ НАШИ НЫНЕШНИЕ ТЕЛА В ЭТОМ НЕ НУЖДАЮТСЯ,
            SHOWONCE::
        НАШИМ РАЗУМАМ НЕ ПОМЕШАЕТ НЕМНОГО ПОКОЯ
            SHOWONCE::
        НЕСКОЛЬКО ВЕЩЕЙ, КОТОРЫЕ Я МОГЛА БЫ У НИХ СПРОСИТЬ, ПРИХОДЯТ МНЕ В ГОЛОВУ

    RESPOBJ::d3_c_responses

structurist
    akizet
        гакву!
            EXEC::env.embassy.vn({tozik: "defocus", gakvu: "focus"})
        о той шутке...

    gakvu
        ага я знаю, сей θмиг не время
    
    akizet
        нет-нет!
        мне стало интересно - ты и правда структуристка?
        немного старомодно
    
    gakvu
        хихихи, я вижу
        нет, в любом случае не на постоянной основе
        я была личиночною, когда структуризм захлестнул экиву
        и я терпеть его не могла
        но рецепторы моих родителей плотно запутались в структуристской песне
        им очень хотелось, чтобы и я была одним из конструкторов
        так что в притворном интересе я со временем стала экспертом

    akizet
        а ты работала над окизикою?

    gakvu
        слишком уж долго, да
        и всё на виду у глаза
        так опасно, так скучно... 
        было очень жестоко со стороны велзи не познакомить меня со смертью, как многих остальных работников
        впрочем, будь это так, меня бы здесь не было, так что... 
        возможно мне уготовлена более важная роль
    
    RESPONSES::akizet
        возможно!<+>loop
            EXEC::env.embassy.vn({tozik: "fullview", gakvu: "fullview"})
            FAKEEND::(назад)
        
kazkiroom
    akizet
        гакву!
            EXEC::env.embassy.vn({tozik: "defocus", gakvu: "focus"})
        на случай если шпиль и правда обрушится,
        казки наверно хотелось бы, чтобы мы захватили её вещи...
        я уже подобрала несколько цист памяти,
            SHOWIF::"PAGE!!kazkichest"
        тебе ничего больше не приходит на ум?
            SHOWIF::"PAGE!!kazkichest"
        тебе ничего не приходит на ум?
            SHOWIF::["PAGE!!kazkichest", false]
    
    sourceless
        ГАКВУ ЗАДУМЫВАЕТСЯ НАД МОИМ ВОПРОСОМ
        ОНА ХИХИКАЕТ САМА СЕБЕ, ПРЕЖДЕ ЧЕМ ОТВЕТИТЬ

    gakvu
        да, но...
        из светлого оружья ей больше всего нравятся длинные
        а её одежду мы уж точно не станем нести
    
    sourceless
        ЭТО БЕССТЫДНЫЕ ОПРАВДАНья
        ОДНАКО Я СОГЛАСНА, ТАК ЧТО... Я ПРОСТО КИВАЮ
    
    RESPONSES::akizet
        кивнуть<+>loop
            EXEC::env.embassy.vn({tozik: "fullview", gakvu: "fullview"})
            FAKEEND::(назад)

coat
    sourceless
        НАКИДКА ГАКВУ ПУЛЬСИРУЕТ ИМИТАЦИЕЮ СВЕТЯЩЕГОСЯ ГРИБКА
            SHOWIF::[["gakpause", false]]
        В ТАКОЙ ОБСТАНОВКЕ ЭТО МОЖЕТ ПРЕДСТАВЛЯТЬ ОПАСНОСТЬ...
            SHOWIF::[["gakpause", false]]
        
    akizet
        гакву!!
            SHOWIF::[["gakpause", false]]
        ты не могла бы... выключить свою накидку?
            SHOWIF::[["gakpause", false]]
        я боюсь, она привлечёт излишнее вниманье
            SHOWIF::[["gakpause", false]]
    
    gakvu
        о, конечно
            SHOWIF::[["gakpause", false]]
    
    sourceless
        ЕЁ ОГНИ ГАСНУТ, ОСТАВЛЯЯ ПОСЛЕ СЕБЯ ТУСКЛЫЙ УЗОР
            EXEC::content.classList.add('gakpause')
            SHOWIF::[["gakpause", false]]

    sourceless
        НО ЕСЛИ ПОДУМАТЬ... Я СКУЧАЮ ПО СВЕЧЕНью
            SHOWIF::"gakpause"
        ДА, ОНО ВЫГЛЯДЕЛО ОЧЕНЬ КРУТО
            SHOWIF::"gakpause"
        РАЗ Я БЕРУ НА СЕБЯ ИНИЦИАТИВУ, ОНО НИ НА ЧТО НЕ ПОВЛИЯЕТ
            SHOWIF::"gakpause"
        
    akizet
        гакву!!
            SHOWIF::"gakpause"
        ты можешь включить свою накидку
            SHOWIF::"gakpause"
        от неё нет вреда!
            SHOWIF::"gakpause"
    
    gakvu
        э, правда? хорошо
            SHOWIF::"gakpause"
    
    sourceless
        ЕЁ ОГНИ ВОЗВРАЩАЮТСЯ, ПРЕСМЫКАЯСЬ ПО ЛОЖНОЙ ТКАНИ
            EXEC::content.classList.remove('gakpause')
            SHOWIF::"gakpause"
    
    RESPONSES::akizet
        спасибо!<+>loop
            EXEC::env.embassy.vn({tozik: "fullview", gakvu: "fullview"});change("gakpause", !check("gakpause"))
            FAKEEND::(назад)

corruskivi
    akizet
        тозик!
            EXEC::env.embassy.vn({tozik: "focus", gakvu: "defocus"})
        я не знала, что ты носишь с собою коррускиви
        или это просто удачное совпаденье?
    
    sourceless
        ТОЗИК ЗАДУМЧИВО РАССМАТРИВАЕТ СВОЙ КОРРУСКИВИ,
        СГИБАЯ ПАЛЕЦ, К КОТОРОМУ ОН КРЕПИТСЯ
        ТЕПЕРЬ МНЕ ВИДНО, ЧТО ОН НЕСКОЛЬКО ИЗОЩРЁННЫЙ,
        БЛЕДНЫЕ БРОНЕВЫЕ СЕГМЕНТЫ ИЗ ФАЛЬШ-ПАРИИ НЕПЛОТНО ПРИЛЕГАЮТ К КОРРУЦИСТОЗНОМУ СТЕКЛУ
        РАЗДЕЛЁННЫЕ, СКОРЕЕ ВСЕГО, ЧТОБЫ ПОЗВОЛИТЬ ЕМУ СВОБОДНО МЕНЯТЬ ФОРМУ

    tozik
        ах... мне его подарили
        прощальный подарок от члена команды на родине
        я предпочитаю хранить его внутри, пусть обычно мы не работаем с големами
    
    akizet
        а чем ты тогда занимался?
        
    tozik
        техническим обслуживаньем наземных караулов
        я скучаю по команде, но это было к лучшему
        при том сосредоточеньи и неустанной работе, что ими требуется,
        кто-нибудь бы пострадал от моей растущей незаинтересованности
        кроме того, что могло бы превзойти расследованье зова?
        пусть даже... сей θмиг мы находимся в данной ситуации
    
    RESPONSES::akizet
        мы выберемся<+>loop
            EXEC::env.embassy.vn({tozik: "fullview", gakvu: "fullview"})
            FAKEEND::(назад)

theory
    akizet
        тозик!
            EXEC::env.embassy.vn({tozik: "focus", gakvu: "defocus"})
        мы до сих пор многого не знаем, но... как ты думаешь, что происходит?
        что могло бы так воздействовать на наши сооруженья?
    
    sourceless
        ТОЗИК КОЛЕБЛЕТСЯ НАД ОТВЕТОМ
        ОН ТЕРПЕТЬ НЕ МОЖЕТ РАССУЖДАТЬ О ВЕЩАХ ДО ТОГО, КАК ПОЛНОСТЬЮ СМОЖЕТ ИХ ОБЪЯСНИТЬ...
        НО В НЕЗАМЕТНОМ КАЧАНьи РЕЦЕПТОРОВ Я ВИЖУ, КАК У НЕГО ФОРМИРУЮТСЯ МЫСЛИ
    
    tozik
        я тоже всё задаюсь этим вопросом...
        но я считаю, что землемыслец - не единственная причина происходящему
        будь это так, на всех сооруженьях был бы проецирован этот странный символ спирали
        и оно бы не затронуло ни вейлькосветы, ни контейнеры
        вот только некоторые вейлькосветы, некоторые контейнеры таки поддаются этому влиянью... 
        эта непоследовательность сбивает меня с толку
        и в конце концов, единственное, что я знаю...
        что происходящее как-то связано с тем сигналом, который мы слышали
    
    RESPONSES::akizet
        я вижу<+>loop
            EXEC::env.embassy.vn({tozik: "fullview", gakvu: "fullview"})
            FAKEEND::(назад)

holdingup
    akizet
        как вы?
        у меня всё нормально
            SHOWIF::'EXEC::page.party[0].hp >= 12'
        мне бы не помешали починки, но я в порядке
            SHOWIF::'EXEC::(page.party[0].hp < 8) && (page.party[0].hp > 3)' 
        я в критическом состояньи... мне нужно использовать восстановитель
            SHOWIF::'EXEC::page.party[0].hp <= 3'

    gakvu
        хорошо!
            SHOWIF::'EXEC::page.party[1].hp == 10'

        сойдёт
            SHOWIF::'EXEC::(page.party[1].hp > 4) && (page.party[1].hp < 10)'
        нарушены только несколько незначительных сегментов моего куу-тела
            SHOWIF::'EXEC::(page.party[1].hp > 4) && (page.party[1].hp < 10)'
        не очень приятно, но... ничего такого, ради чего стоило бы останавливаться
            SHOWIF::'EXEC::(page.party[1].hp > 4) && (page.party[1].hp < 10)'

        меня прежде никогда так не ранили... это пугает
            SHOWIF::'EXEC::page.party[1].hp <= 4'
        но моё мыслеядро цело, и это - самое важное
            SHOWIF::'EXEC::page.party[1].hp <= 4'

    tozik
        нормально
            SHOWIF::'EXEC::page.party[2].hp > 5'
        моё куу-тело переломлено в некоторых местах - необходимо серьёзно подлатать
            SHOWIF::'EXEC::page.party[2].hp <= 5'
        у нас найдётся восстановитель?
            SHOWIF::'EXEC::page.party[2].hp <= 5'

    sys
        РЕКОМЕНДАЦИЯ::'используйте МЕНЮ КОМАНДЫ';'прикреплено к ПРОСТРАНСТВЕННОЙ НАВИГАЦИИ';'привязано к Я/Z'
            SHOWIF::'EXEC::partyHasLowHealth() && (checkItem(env.ITEM_LIST.restorative) > 0)'
        РЕКОМЕНДАЦИЯ::'используйте ВОССТАНОВИТЕЛЬНУЮ ЦИСТУ вне боя для полного восстановления здоровья'
            SHOWIF::'EXEC::partyHasLowHealth() && (checkItem(env.ITEM_LIST.restorative) > 0) '
        ПРИМЕЧАНИЕ::'в инвентаре нет ВОССТАНОВИТЕЛЬНЫХ ЦИСТ'
            SHOWIF::'EXEC::partyHasLowHealth() && (checkItem(env.ITEM_LIST.restorative) == 0)'
    
    RESPONSES::akizet
        поняла<+>loop
            FAKEEND::(назад)

SKIP::vn.done()
`)

env.localization.page['embassy'].dialogues["d3_rec_enter"] = generateDialogueObject(` 
start
    sourceless
        КОГДА МЫ ВХОДИМ, Я ПОРАЖАЮСЬ ХАОСУ
        СТАЯ ИСКРИВЛЁННЫХ КОНТЕЙНЕРОВ МЕЧЕТСЯ ПО ПОМЕЩЕНью
        ОНИ РАЗНЕСЛИ ДЕКОРАЦИИ НА ЧАСТИ, И НЕСКОЛЬКО...
        НЕСКОЛЬКО КУУ ТЕЛ... РАЗБРОСАНЫ ПО СТОРОНАМ
        СОВМЕСТНЫЙ УЖАС ЗВЕНИТ В НАШЕМ СОЕДИНЕНьи
    
    akizet
        послушайте - скорее всего рухнули только их тела
        нам нужно увидеть, можно ли спасти их мыслеядра
    
    sourceless
        ГАКВУ И ТОЗИК ПРОКРАДЫВАЮТСЯ ВСЛЕД ЗА МНОЙ
        Я ОЩУЩАЮ, КАК ИЗМЕНИЛОСЬ ПОВЕДЕНье ГАКВУ ПЕРЕД ЛИЦОМ ЗАКЛЮЧИТЕЛЬНОЙ СМЕРТИ
        А ТОЗИК ХЛАДНОКРОВНО РАССМАТРИВАЕТ ЕЩЁ НЕ ОБНАРУЖИВШИЕ НАС КОНТЕЙНЕРЫ
    
    tozik
        в них есть немного сфера, возможно достаточно для наших планов
        сложно быть не должно, особенно с времядержцем
        мы прикроем тебя

    sys
        ПРЕДУПРЕЖДЕНИЕ::'активные мыслеформы в мыслепространстве'
        ПРИМЕЧАНИЕ::'любой контакт с активными мыслеформами инициирует боевой интерфейс'
        ПРИМЕЧАНИЕ::'активные мыслеформы двигаются только в ответ';'по контексту мыслеформы'

    RESPONSES::akizet
        продолжить<+>END

SKIP::
`)
env.localization.page['embassy'].dialogues["d3_rec_clear"] = generateDialogueObject(` 
start
    sourceless
        TEXEC::env.combat.dynamicReward()
        КАК ТОЛЬКО ПОСЛЕДНИЕ из них погибают, СУТОЛОКА УМОЛКАЕТ
        ТОЗИК ОПУСКАЕТСЯ НА КОЛЕНИ ВОЗЛЕ КОНТЕЙНЕРА, ГАКВУ - ВОЗЛЕ ДРУГОГО,
        И ОНИ РЫЩУТ ПО СЛЯКОТНЫМ ОСТАНКАМ
            EXEC::changeBgm(env.embassy.music_collapse, {rate: 1})
    
    akizet
        что-нибудь ещё?

    sourceless
        МЕЖДУ НИМИ ТРИ КУБА СФЕРА, КАЖДЫЙ РАЗМЕРОМ НЕ БОЛЬШЕ КАЛЬСТИКА
            EXEC::env.embassy.advanceSfer(3, "rec_clear")
        Я НАДЕЯЛАСЬ, В ЭТИХ КОНТЕЙНЕРАХ НАЙДЁТСЯ ПОБОЛЬШЕ

    tozik
        сфер найдётся, но я сомневаюсь, что этого достаточно для починки движедруга
        здесь несколько информационных ядер, по...

    sourceless
        ТОЗИК ТЫЧЕТ В МАЛЕНЬКУЮ АРХИВНУЮ КИСТУ, ИЗВЛЕЧЁННУЮ ИМ ИЗ ЖИЖИ

    tozik
        ...ах, дизайнам "внешнего вазнийского мха", из зевазни
        для стен, полагаю. выглядело бы мило
        но--ничего полезного

    sourceless
        МЫ ОБРАЩАЕМСЯ К ГАКВУ, ПРЕРВАВШЕЙ СВОИ ПОИСКИ
        ОНА УСТАВИЛАСЬ НА РАСТЕРЗАННОЕ КУУ-ТЕЛО НЕПОДАЛЕКУ, ПРОЧЬ ОТ НАС
        ОНА СКОРБИТ?
    
    akizet
        гакву...

    sourceless
        ОНА НЕ ОБОРАЧИВАЕТСЯ, НО ЕЁ РЕЦЕПТОРЫ РАСКРУЧИВАЮТСЯ ВСЛЕД ЗА ЕЁ УСПОКАИВАЮЩИМСЯ НАПРЯЖЕНьеМ

    gakvu
        они ещё живы
        их мыслеядра, во всяком случае
        но сначала нам нужно помочь им выбраться из тел

    tozik
        как...
        а. землемыслье, да
        они не говорили, что случилось?
    
    sourceless
        ГАКВУ ТВЁРДО МАШЕТ РЕЦЕПТОРАМИ

    gakvu
        я не могу устанавливать такое прямое соединенье
        я просто вижу их там
        увидим, что они скажут

    RESPONSES::akizet
        вытащить их<+>END
            EXEC::change("PAGE!!queue_person_enable", true)

SKIP::change("PAGE!!queue_person_enable", true);changeBgm(env.embassy.music_collapse, {rate: 1, length: 5});env.embassy.advanceSfer(3, "rec_clear")
`)

env.localization.page['embassy'].dialogues["d3_rec_body1"] = generateDialogueObject(` 
start
    sourceless
        Я ВЛЕЗАЮ КОГТЯМИ В ГРУДНУЮ ПОЛОСТЬ КУУ,
            EXEC::specialCam('deadqou1');pauseSwapCam(true)
        И ВЫГРЕБАЮ ГОРСТИ РАСПЛЫВШИХ ВНУТРЕННОСТЕЙ
        ВДРУГ, ТОНКИЙ КАК ИГЛА ШИП ВЫРЫВАЕТСЯ ИЗ ЦЕНТРА ТЕЛА
        И ЕЩЁ ОДИН--ОТРОСТКИ МЫСЛЕЯДРА, ОБОРОНИТЕЛЬНО ТЫЧУЩИЕ В МЕНЯ
        МЕНЯ ВОСПРИНЯЛИ ЗА ОДНОГО ИЗ КОНТЕЙНЕРОВ

    akizet
        эй, ты в безопасности
        мы тебе помогаем, хорошо?
    
    sourceless
        НОЖКИ РАЗГИБАЮТСЯ, ПОЗВОЛЯЯ МНЕ ПРОДОЛЖАТЬ РАБОТУ
            EXEC::env.embassy.vn({itzil: 'display'});
        ВСКОРЕ ОНО В СИЛАХ ВЫСКОЧИТЬ НА ПОЛ ПОД НАМИ
            EXEC::env.embassy.vn({bg: true, itzil: 'display show'});
        ДРЕБЕЗЖИТ МЕТАЛЛИЧЕСКИЙ ГОЛОС, ПОВЕРХНОСТЬ ЯДРА - В РЯБИ
    
    itzil
        прощенья! всепрощенья мне!
        мне показалось...
        мне казалось, это всё
        что случилось? почему они меня атаковали?
        мне просто хотелось насладиться симулякром...
    
    gakvu
        мы не знаем
        был какой-то сигнал
        когда он возник, конструкты начали на нас нападать...

    akizet
        причём с явным намереньем
        они целятся в мыслеядра
        как твоё имя?
    
    itzil
        ого!
        выглядит так, словно у велзи прибережена роль для меня
        я - итзил!!
        мне было положено оставаться в обслуживаньи големов...
        но, меня прикрывала моя дорогая кивии, на...
        ...
        погодите, атака была только здесь?
        вы были в θсегменте обслуживанья големов?
    
    akizet
        мы не знаем: движедруг отключён,
        а связь не работает
        для начала мы просто пытаемся починить движедруга
        иди через путь, что мы проложили, там безопасно

    itzil
        хорошо...
        мне бы хотелось помочь вам, будь такая возможность!
        пожалуйста берегите себя!

    sourceless
        МЫСЛЕЯДРО ТОГО КУУ ПОВОРАЧИВАЕТСЯ И УБЕГАЕТ В ПЕРЕМЕСТИТЕЛЬ
            EXEC::env.embassy.vn({bg: false, itzil: ''});
    
    RESPONSES::akizet
        продолжить двигаться<+>END
            EXEC::env.embassy.vn({itzil: ''});specialCam(false);pauseSwapCam(false)

SKIP::vn.done();specialCam(false);pauseSwapCam(false)
`)
env.localization.page['embassy'].dialogues["d3_rec_body2"] = generateDialogueObject(` 
start
    sourceless
        Я ВЛЕЗАЮ КОГТЯМИ В ГРУДНУЮ ПОЛОСТЬ КУУ,
            EXEC::specialCam('deadqou2');pauseSwapCam(true)
        УДАЛЯЯ ВСЕ ВНУТРЕННИЕ СЕГМЕНТЫ, СКОВЫВАЮЩИЕ МЫСЛЕЯДРО
            EXEC::env.embassy.vn({bg: false, karik: 'display'});
        КОГДА ДОСТАТОЧНОЕ КОЛИЧЕСТВО РАСЧИЩЕНО, ВНЕЗАПНО,
        ОСТАВШАЯСЯ СЛЯКОТЬ ВСПУЧИВАЕТСЯ, И ЯДРО ВЗРЫВАЕТСЯ ИЗ НЕЁ ПО СОБСТВЕННОЙ ВОЛЕ
            EXEC::env.embassy.vn({bg: true, karik: 'display show'});
        ОНО НЕМЕДЛЕННО ПЕРЕПРЫГИВАЕТ НА ПРОТИВОПОЛОЖНУЮ СТОРОНУ КОМНАТЫ,
            EXEC::specialCam('deadqou2-scamper');env.embassy.vn({karik: 'display show climb'});
        ВСКАРАБКИВАЯСЬ НА СТЕНУ ДО ТОГО, КАК ДАЖЕ ВЗГЛЯНЕТ НА НАС

    karik
        воу!
        эй!
        извини, ты показалась мне одною из конструктов
        тут безопасно?

    akizet
        ещё нет
        мы думаем атака продолжается
        как твоё имя?

    karik
        ах, мои сияющие паразиты!
        я - карик! как же нам не повезло познакомиться при таких обстоятельстввх!

    tozik
        иди по пути, по которому мы пришли
        там пока безопасно, и мы работаем над выходом
            EXEC::env.embassy.vn({tozik: 'defocus'});

    karik
        этим я и займусь
        пожалуйста, сообщите, если я могу чем-либо помочь!
    
    sourceless
        ЮРКОЕ, КАК СЕМЯ СЕЛЬКИ, ОНО СОСКАКИВАЕТ СО СТЕНЫ
            EXEC::env.embassy.vn({karik: 'display climb'});
        ИСЧЕЗАЯ В КОРИДОРЕ ПЕРЕМЕСТИТЕЛЯ
    
    RESPONSES::akizet
        продолжить двигаться<+>END
            EXEC::specialCam(false);env.embassy.vn({bg: false, tozik: '', karik: ''});pauseSwapCam(false)
            
SKIP::vn.done();specialCam(false);pauseSwapCam(false)
`)

env.localization.page['embassy'].dialogues["d3_barfriend"] = generateDialogueObject(` 
start
    sourceless
        Я ОСТОРОЖНО ПРИБЛИЖАЮСЬ К БАРДРУГУ, ЗА МНОЮ - ГАКВУ И ТОЗИК
            EXEC::env.embassy.vn({gakvu: "defocus", tozik: "defocus"});pauseSwapCam(true)
        ОН УКРЫЛСЯ ЗА ПОВРЕЖДЁННЫМ РАЗДАТЧИКОМ СИМУЛЯКРОВ

    akizet
        бардруг...?

    barfriend
        ПРИВЕТ АКИЗЕТЕШЕ
        В НАСТОЯЩЕЕ ВРЕМЯ Я НЕ МОГУ ВАС ОБСЛУЖИВАТЬ В СВЯЗИ С ЧРЕЗВЫЧАЙНОЮ СИТУАЦИЕЮ!
        ПРОСТИТЕ!! Я СОВЕТУЮ ВАМ ВМЕСТО ЭТОГО ИСКАТЬ УБЕЖИЩЕ

    akizet
        нет, это...
        это ничего, но каким образом ты до сих пор в строю?
        почему эти контейнеры не атаковали тебя?

    barfriend
        Я НЕ ЗНАЮ!
        ИХ ИНТЕРЕСОВАЛИ ТОЛЬКО КУУ, ЧТО Я ОБСЛУЖИВАЛ
        Я НЕ МОГ ИМ ПОМОЧЬ
        
    sourceless
        ГАКВУ ПРИСТАЛЬНО СМОТРИТ НА БАРДРУГА

    gakvu
        его эхо полностью невредимо...
        бардруг, ты почувствовал сигнал?
        импульс, за которым последовало нападенье контейнеров?

    barfriend
        ТАК ВОТ ЧТО ЭТО БЫЛО?
        Я ЧУВСТВОВАЛ, КАК НА МОЁ СУЩЕСТВО ДАВИЛИ!
        БЫЛО ОЧЕНЬ НЕПРИЯТНО!
        НО ОНО ПРЕКРАТИЛОСЬ
    
    akizet
        ну, не бойся! ты теперь в безопасности

    sourceless
        ТОЗИК ПРИСЛОНЯЕТСЯ К БАРНОЙ СТОЙКЕ ПОБЛИЗОСТИ
        РАЗГЛЯДЫВАЯ КОНТЕЙНЕРЫ, ПОТОМ КУУ-ТЕЛА...

    akizet
        что такое?

    sourceless
        ПРОХОДИТ МГНОВЕНье, ПРЕЖДЕ ЧЕМ ОН БРОСАЕТ НА МЕНЯ ВЗГЛЯД
        ЕГО ОТВЕТ СОПРОВОЖДАЕТСЯ НЕУВЕРЕННЫМ ОТКАТЫВАНьеМ РЕЦЕПТОРОВ

    tozik
        теоретизирую...
            EXEC::env.embassy.vn({tozik: "fullview", bg: true});
        пока рано говорить что-либо наверняка, но
        почему у этих контейнеров не было символа землемысльца?
        их объединяла та же цель, что и голема в нашем помещеньи
        целиться в мыслеядра...
        
    sourceless
        ОН ЗАТИХАЕТ, И НИ Я, НИ ГАКВУ НЕ МОЖЕМ ОТВЕТИТЬ
        В САМОМ ДЕЛЕ - ПОКА РАНО
    
    RESPONSES::akizet
        продолжить двигаться<+>END
            EXEC::change("PAGE!!barfriend", true);env.embassy.vn({gakvu: "", tozik: "", bg: false});pauseSwapCam(false)

SKIP::vn.done();specialCam(false);pauseSwapCam(false)
`)

env.localization.page['embassy'].dialogues["d3_person_enable"] = generateDialogueObject(` 
start
    sourceless
        ВЕРНУВШИСЬ В ПЕРЕМЕСТИТЕЛЬ, ГАКВУ ПРОДОЛЖАЕТ ИДТИ ДО ПРОТИВОПОЛОЖНОЙ СТЕНЫ
            EXEC::specialCam("personnel_open");pauseSwapCam(true)
        ОНА ВНОВЬ ПРОТЯГИВАЕТ ЛАДОНИ, И ВНОВЬ СТЕНЫ МЕДЛЕННО ВЗБИВАЮТСЯ
            EXEC::change("PAGE!!cpersonnel_unlocked", true);
        МЫСЛЕЯДРА НЕПОДАЛЁКУ УСТАВИЛИСЬ НА НЕЁ... ОНИ НЕ ОБЕЩАЛИ, КАК МЫ
        но гакву может поговорить с ними попозже!
        НАЧИНАЕТ ОБРАЗОВЫВАТЬСЯ ПУТЬ К ТОМУ θответвленью ПЕРСОНАЛА

    akizet
        а какое это, ещё раз, θответвленье?

    gakvu
        глаза сомкнуты
        может быть каким угодно

    sourceless
        КАЗКИ ВЕДЬ НЕДАВНО ПЕРЕСЕЛИЛАСЬ БЛИЖЕ К ЗОНЕ ОТДЫХА, НЕТ?
        БУДЬ У ВЕЛЗИ ДЛЯ НАС ДОБРЫЙ ПУТЬ, МЫ МОГЛИ БЫ ОКАЗАТЬСЯ У НЕЁ...
        Я ЗНАЮ, ОНА БЫЛА БЫ УБИТА ГОРЕМ, ЕСЛИ БЫ ЕЁ ЧЕЛОВЕЧЕСКИЕ ДАРЫ ПРОПАЛИ
        О - ПУТЬ УЖЕ ПОЛНОСТЬЮ СФОРМИРОВАН
            EXEC::step()

    RESPONSES::akizet
        продолжить!<+>END
            EXEC::specialCam(false);pauseSwapCam(false)

SKIP::change("PAGE!!cpersonnel_unlocked", true);step();vn.done();specialCam(false);pauseSwapCam(false)
`)
env.localization.page['embassy'].dialogues["d3_person_intro"] = generateDialogueObject(` 
start
    sourceless
        θответвленье ПЕРСОНАЛА ТЕМНО, ЗАЛИТОЕ СВЕТОМ БЕССВЯЗНЫХ
        СЛУГИ НОСЯТ ТОТ ЖЕ СТРАННЫЙ СИМВОЛ, ЧТО И НАШ ГОЛЕМ...
        А ВЕЙЛЬКОСВЕТЫ, ПОХОЖЕ, НАУЧИЛИСЬ ДВИГАТЬСЯ
        МЫ ЗАГЛЯДЫВАЕМ С ОСТОРОЖНОСТЬЮ, ПОКА ЧТО ВНЕ ИХ ПОЛЯ ЗРЕНья
        ОБЩИЙ ГОЛОС РАЗДАЁТСЯ СКВОЗЬ ВРЕМЯДЕРЖЕЦ
    
    timestopper
        СМОТРИТЕ! ВОН ТАМ!
        БОЛЬШЕ КУУ-ТЕЛ
        СНАЧАЛА НУЖНО РАСЧИСТИТЬ ЭТО МЕСТО
        СОГЛАШУСЬ!
        ОНИ ЗАМЕТЯТ, КАК ТОЛЬКО МЫ ВОЙДЁМ В θответвленье
        СТУПАЙТЕ С ОСТОРОЖНОСТЬЮ
    
    RESPONSES::akizet
        держитесь за мной<+>END

SKIP::
`)
/* --- this seems to be cut content?.. not accessible in the game as far as i can see. will just leave it */ env.localization.page['embassy'].dialogues["d3_person_locked"] = generateDialogueObject(` 
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
        продолжить<+>END

no
    akizet
        hmm...
        no, no
        we should check these other rooms first

    tozik
        we have enough sfer as is
    
    RESPONSES::akizet
        продолжить<+>END            
`)
env.localization.page['embassy'].dialogues["d3_person_clear"] = generateDialogueObject(`
start
    sourceless
        КОМНАТА ЗАМОЛКАЕТ
            EXEC::pauseSwapCam(true)
        СРАЗУ ЖЕ, ГАКВУ ОТПРАВЛЯЕТСЯ ПРОВЕРИТЬ БЛИЖАЙШЕГО КУУ
            EXEC::env.embassy.vn({bg: true, tozik: "defocus", gakvu: "defocus"});pauseSwapCam(true)
    
    gakvu
        вот этих...
        слугам удалось пробить
    
    sourceless
        ОНА ЗАСТЫВАЕТ ТАМ, У ТРУПА
            EXEC::changeBgm(env.embassy.music_collapse, {rate: 1})
        ЕЁ СКОРБЬ ПРОНИКАЕТ В НАШИ СОЕДИНИТЕЛИ
        НАМ НЕЧЕМ С НЕЙ БОРОТЬСЯ
        НО МНЕ НЕ ЧУЖД ЕЁ УКУС
        А ТОЗИК ЗАНИМАЕТ СЕБЯ ПЕРЕБИРАНьеМ ОБЛОМКОВ
    
    gakvu
        ...
        это какая-то бессмыслица...
        они и правда убивают <em>всех подряд</em>...

    sourceless
        ВМЕСТО ПЕЧАЛИ, ЧТО Я ОЖИДАЛА УСЛЫШАТЬ ОТ НЕЁ,
        ЕЁ ГОЛОС НАПОЛНЕН ЧЕМ-ТО ВРОДЕ мрачного любопытства
        ТОЗИК ПРЕКРАЩАЕТ СВОИ РАСКОПКИ НА МГНОВЕНье, ЧТОБЫ ПОСМОТРЕТЬ НА ГАКВУ
        МНЕ ВИДНО, ЧТО ОН ХОЧЕТ ЕЁ РАССПРОСИТЬ, НО НЕ ДЕЛАЕТ ЭТОГО
        ДА И Я БЫ СЕЙЧАС НЕ СТАЛА...
    
    tozik
        что же,
            EXEC::env.embassy.vn({bg: true, tozik: "fullview"})

    sourceless
        ТОЗИК ВЫНИМАЕТ КУБ СФЕРА ИЗ ОСТАНКОВ КОНТЕЙНЕРА
            EXEC::env.embassy.advanceSfer(1, "person_clear")
            COR-RU NOTE::я ненавижу русский язык. куб сфера
    
    tozik
        нам всё ещё нужно немного больше сфера
            SHOWIF::'EXEC::env.embassy.enoughSfer(false)'
        давайте проверим не сломанные комнаты
            SHOWIF::'EXEC::env.embassy.enoughSfer(false)'

        у нас есть всё необходимое для того, чтобы починить движедруга
            SHOWIF::'EXEC::env.embassy.enoughSfer(true)'
        давайте вернёмся в переместитель
            SHOWIF::'EXEC::env.embassy.enoughSfer(true)'

    RESPONSES::akizet
        продолжить<+>END
            EXEC::env.embassy.vn({bg: false, tozik: "", gakvu: ""});pauseSwapCam(false)

SKIP::env.embassy.advanceSfer(1, "person_clear");vn.done();pauseSwapCam(false)
`)

env.localization.page['embassy'].dialogues["d3r2"] = generateDialogueObject(`
start
    sourceless
        ЭТО...
            EXEC::pauseSwapCam(true)

    gakvu
        эй, это же комната казки!
            EXEC::env.embassy.vn({gakvu: "fullview"})
        я ещё думала, что θответвленье знакомо выглядит

    tozik
        что это?
            EXEC::env.embassy.vn({tozik: "defocus"})
        это светлое оружье?

    sourceless
        ОРУЖье ИЗ МЁРТВЫХ МЕТАЛЛОВ ВЫСТАВЛЕНО НА ЕЁ СТЕНЕ И СТОЛЕ
            EXEC::specialCam("kazkiguns");env.embassy.vn({tozik: "", gakvu: ""})
        АМУНИЦИЯ СВЕТЛЫХ ВОИНОВ, ДЛЯ ИСПОЛЬЗОВАНья ПРОТИВ ДРУГИХ СВЕТЛЫХ БЛИЗНЕЦОВ
        ЛЕДЕНЯЩАЯ КРОВЬ МЫСЛЬ

    gakvu
        да!
        она никогда не говорила вам о своей коллекции?

    tozik
        нет
    
    akizet
        и я тоже понятья не имела...
        мы могли бы воспользоваться им?

    gakvu
        ты знаешь как работает светлое оружье?
        я - нет!
    
    akizet
        я никогда не видела их в действии...
        может быть, нам просто стоит взглянуть

    RESPONSES::akizet
        осмотреться<+>END
            EXEC::specialCam(false);pauseSwapCam(false)

SKIP::vn.done();specialCam(false);pauseSwapCam(false)
`)
env.localization.page['embassy'].dialogues["d3r2_chest"] = generateDialogueObject(`
start
    sourceless
        Я ОПУСКАЮСЬ НА КОЛЕНИ У ЧАСТИ ДИСПЛЕЯ, СЛУЖАЩЕЙ ДЛЯ ХРАНЕНья
            EXEC::pauseSwapCam(true)
        ЗА МАНОВЕНьеМ РУКИ ПОД ЕГО МАГНИТНОЙ СОЕДИНИТЕЛЬНОЙ ЦИСТОЙ,
        ЗЕМНОЙ КОНТЕЙНЕР РАЗЖИЖАЕТ СВОЁ ПОКРЫТье
        ВНУТРИ Я НАХОЖУ ОДЕЖДУ ИЗ ЛОЖНОЙ ВЕЙЛЬКОВОЙ КОЖИ.. (МОДНАЯ!)
        КАКИЕ-ТО ИНСТРУМЕНТЫ ДЛЯ ОБСЛУЖИВАНья...
        НЕКОТОРЫЕ ИЗ НИХ СЛИШКОМ ПЛОХО ОБОЗНАЧЕНЫ, ЧТОБЫ РАЗЛИЧАТЬ ИХ
        НО КАЖЕТСЯ, ТАМ НАЙДУТСЯ И ЦИСТЫ ПАМЯТИ...
        Я НЕ УВЕРЕНА, ЧТО ЕЙ БЫ ХОТЕЛОСЬ, ЧТОБЫ МЫ ЗАХВАТИЛИ, ТАК ЧТО
        Я БЕРУ ПАРОЧКУ, ЧТОБЫ ПОТОМ ОТДАТЬ ЕЙ
            EXEC::change("d3_kazkichest", true)
        А ЕЩЁ!!
        ТАМ ЕСТЬ НЕСКОЛЬКО <span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::${env.ITEM_LIST['restorative'].description}">ВОССТАНОВИТЕЛЬНЫХ ЦИСТ</span>! ТАК ЧТО Я БЕРУ И ИХ
            EXEC::env.embassy.conditionalItem('restorative', 4, 'chest')
    
    gakvu
        погоди, а почему этот связный?
            EXEC::env.embassy.vn({bg: true, gakvu: "fullview"})
        такое ощущенье, будто враждебность совершенно случайна
    
    tozik
        и меня это беспокоит
            EXEC::env.embassy.vn({tozik: "fullview"})
        например, почему двери не "кусаются"?
        или времядержец, почему он кооперируется?
        у меня есть идея...
        но мне нужно увидеть больше
    
    akizet
        бардруг тоже показался связным
        дружелюбным, даже
        но мы можем поговорить об этом позже

    RESPONSES::akizet
        продолжить двигаться<+>END
            EXEC::change("PAGE!!kazkichest", true);env.embassy.vn({bg: false, tozik: "", gakvu: ""});pauseSwapCam(false)

SKIP::env.embassy.conditionalItem('restorative', 4, 'chest');change("PAGE!!kazkichest", true);vn.done();pauseSwapCam(false)
`)
env.localization.page['embassy'].dialogues["d3r2_guns"] = generateDialogueObject(`
start
    sourceless
        Я И НЕ ЗНАЮ, ГДЕ НАЧАТЬ
            EXEC::change("PAGE!!checkedguns", true);specialCam("kazkiguns");pauseSwapCam(true)
        ТОЗИК БЕССТРАСТНО БЕРЁТ ОДНО ИЗ КРУПНЫХ ЗА ДЛИННУЮ ЧАСТЬ
            EXEC::env.embassy.vn({tozik: "defocus"})
        КАК ОНО НАЗЫВАЕТСЯ?

    tozik
        так много маленьких нереагирующих компонентов...
        у него есть топливо?
    
    sourceless
        БОЯЗЛИВОСТЬ ПРОБЕГАЕТ ПО ВРЕМЯДЕРЖЦУ
        РАЗДЕЛЯЕМАЯ КАЖДЫМ ИЗ НАС, Я ДУМАЮ
        МЫ ДО СИХ ПОР ДОСТАТОЧНО ХОРОШО СПРАВЛЯЛИСЬ С ОДНИМИ КУУ-ТЕЛАМИ...
        ПЫТАТЬСЯ НАУЧИТЬСЯ ОРУЖью ПО УБИЙСТВУ БЛИЗНЕЦОВ КАЖЕТСЯ НЕНУЖНЫМ
    
    gakvu
        и что оно вообще может сделать корруцистозному стеклу?

    sourceless
        ТОЗИК ВОЗВРАЩАЕТ ОРУЖье НА МЕСТО

    RESPONSES::akizet
        продолжить осматриваться<+>END
            EXEC::specialCam(false);env.embassy.vn({tozik: ""});pauseSwapCam(false)
`)
env.localization.page['embassy'].dialogues["d3r2_containers"] = generateDialogueObject(`
start
    sourceless
        В УГЛУ СТОИТ НАБОР КОЛЫШУЩИХСЯ КОНТЕЙНЕРОВ
        ЕСЛИ У КАЗКИ И ЗАПАСЁН КАКОЙ-НИБУДЬ СФЕР, ОН БУДЕТ В НИХ
            EXEC::specialCam('kazkicontainers');pauseSwapCam(true)

    gakvu
        а эти связные...?
    
    sourceless
        ГАКВУ ДЕЛАЕТ ШАГ БЛИЖЕ, ВЫТЯНУВ ОДИН ИЗ КОГТЕЙ
        КАК ВДРУГ--КОНТЕЙНЕРЫ НАБРАСЫВАЮТСЯ НА НЕЁ!

    RESPONSES::akizet
        активировать времядержец<+>CHANGE::d3r2_postcombat
            SHOWIF::['gameplay_off', true]
            EXEC::specialCam(false)
            FAKEEND::(пропустить бой)
        активировать времядержец<+>END
            SHOWIF::['gameplay_off', false]
            EXEC::env.embassy.startKazkiRoomAmbush();specialCam(false)
            FAKEEND::(начать бой)
`)
env.localization.page['embassy'].dialogues["d3r2_ambush"] = generateDialogueObject(`
start
    sourceless
        КАК МЫ СОБИРАЕМСЯ УХОДИТЬ, ЗВУК ОТКРЫВАЮЩЕЙСЯ ДВЕРИ ГРОМЧЕ, ЧЕМ ОБЫЧНО
        НЕБОЛЬШОЙ СБОЙ, БЫТЬ МОЖЕТ
        НО КОНТЕЙНЕРЫ В УГЛУ, СЛОВНО ОЧНУВШИСЬ ОТО СНА, ВНЕЗАПНО БРОСАЮТСЯ НА НАС!!!
            EXEC::specialCam('kazkicontainers');pauseSwapCam(true)

    RESPONSES::akizet
        активировать времядержец<+>CHANGE::d3r2_postcombat
            SHOWIF::['gameplay_off', true]
            EXEC::specialCam(false)
            FAKEEND::(пропустить бой)
        активировать времядержец<+>END
            SHOWIF::['gameplay_off', false]
            EXEC::env.embassy.startKazkiRoomAmbush();specialCam(false)
            FAKEEND::(начать бой)
`)
env.localization.page['embassy'].dialogues["d3r2_postcombat"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ВНИМАНИЕ::'пропущен геймплей мыслеформенного боя';'переключите в системном меню по желанию'
____END

    sourceless
        TEXEC::env.combat.dynamicReward()
            EXEC::change("PAGE!!kazkiambush", true);env.stage.current.onStep()
        КОНТЕЙНЕРЫ ЛЕЖАТ НЕПОДВИЖНО, ПОСТЕПЕННО ПЛАВЯСЬ В ОТХОДЫ
        НЕСКОЛЬКО ПОГРУЖЁННЫХ ФОРМ ВСПЛЫВАЮТ НА ИХ ПОВЕРХНОСТИ
        НЕМНОГО ПОКОПАВШИСЬ, МЫ НАХОДИМ НЕСКОЛЬКО КУБОВ СФЕРА!
            EXEC::env.embassy.advanceSfer(4, "d3r2")
    
    tozik
        сойдёт
            EXEC::env.embassy.vn({bg: true, tozik: "defocus"})
        но нам всё ещё нужно больше
            SHOWIF::'EXEC::env.embassy.enoughSfer(false)'

        этого должно хватить, давайте отправимся обратно
            SHOWIF::'EXEC::env.embassy.enoughSfer()'

    RESPONSES::akizet
        продолжить<+>END
            EXEC::step();env.embassy.vn({bg: false, tozik: ""});pauseSwapCam(false)
    
SKIP::change("PAGE!!kazkiambush", true);env.stage.current.onStep();step();vn.done();pauseSwapCam(false);env.embassy.advanceSfer(4, "d3r2")
`)

env.localization.page['embassy'].dialogues["d3r1"] = generateDialogueObject(`
start
    sourceless
        КАК ТОЛЬКО МЫ СТУПАЕМ В КОМНАТУ, НА НАС ВЫПРЫГИВАЕТ НЕЗНАКОМАЯ ТИР КУУ
            EXEC::pauseSwapCam(true);env.embassy.vn({miltza: "display far"})

    sourceless
        В ЕЁ КОГТЯХ ОТКЛЮЧИТЕЛЬ - ЧРЕЗВЫЧАЙНО МОЩНЫЙ КОРРУЦИСТОЗНЫЙ УНИЧТОЖИТЕЛЬ
            EXEC::env.embassy.vn({bg: true, tozik: "defocus", gakvu: "defocus", miltza: "far show"})
        
    miltza
        не подходите!!
        подождите
        вы...?

    akizet
        успокойся
        мы тебе не навредим
        но мы ищем материалы для починки движедруга
        у тебя что-нибудь есть?

    miltza
        ох...
        да! вот!
    
    sourceless
        ОНА ВЫТАСКИВАЕТ НЕСКОЛЬКО КУБОВ СФЕРА ИЗ ОСТАНКОВ БЛИЗЛЕЖАЩИХ КОНТЕЙНЕРОВ
            EXEC::env.embassy.advanceSfer(2, "miltza")
        ВЫГЛЯДИТ ТАК, БУДТО ОНА ИХ УБИЛА
    
    miltza
        у вас есть план?
        я - милтза!
    
    akizet
        рада встрече, моя подруга! я - акизет
        это тозик, а это - гакву
        и, для начала мы работаем над тем, как выбраться
        скорее всего, к ангару...
    
    miltza
        у вас не получалось ни с кем выйти на связь?
        я вот уже некоторое время слушаю...
        в основном там какой-то ужасный шум, но всем в ангаре страшно
        до меня дошёл ропот: они тоже взаперти!
    
    gakvu
        что? каким образом? 
        они пробовали пролететь через стену?
    
    miltza
        я не знаю...
        эй, кажется из вас хорошие защитники - забавно, что вы даже не кивы!
        вот, возьмите мой <span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::${env.ITEM_LIST['disabler'].description}">отключитель</span>. всё равно наверное вы лучше знаете, как его использовать!
            EXEC::env.embassy.conditionalItem('disabler', 2, 'miltzadis')

    akizet
        о--спасибо тебе!
    
    miltza
        я соберу некоторые вещи, затем укроюсь в подъёмнике

    sourceless
        ОНА ПОСПЕШНО ОБРАЩАЕТСЯ К ПОИСКАМ СРЕДИ СВОЕЙ ОПРОКИНУТОЙ МЕБЕЛИ
            EXEC::env.embassy.vn({miltza: "display far"})

    akizet
        береги себя, моя подруга. мы скоро увидимся

    RESPONSES::akizet
        продолжить<+>END
            EXEC::env.embassy.vn({bg: false, tozik: "", gakvu: "", miltza: ""});pauseSwapCam(false)

SKIP::env.embassy.advanceSfer(2, "miltza");env.embassy.conditionalItem('disabler', 2, 'miltzadis');vn.done();pauseSwapCam(false)
`)
env.localization.page['embassy'].dialogues["d3_miltza_resp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        тебе нужна помощь?<+>help
            SHOWIF::"EXEC::env.stage.name == \`embassy_cquarters1\`"
        отдел?<+>division
        спросить об искусстве<+>art
        давайте продолжим<+>END
            EXEC::env.embassy.vn({bg: false, miltza: ""});pauseSwapCam(false)
`)
env.localization.page['embassy'].dialogues["d3_miltza_artresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        вейльки?<+>veilk
        глаз?<+>eye
        возьмёшь с собою?<+>taking
        назад<+>loop
            FAKEEND::(назад)
`)
env.localization.page['embassy'].dialogues["d3_miltza"] = generateDialogueObject(`
loop
    RESPOBJ::d3_miltza_resp
art
    RESPOBJ::d3_miltza_artresp

start
    sourceless
        МИЛТЗА РОЕТСЯ В СВОЁМ ЗАГРАЖДЕНьи, ВЫИСКИВАЯ ЧТО-ТО
            EXEC::env.embassy.vn({bg: true, miltza: "display show far"});pauseSwapCam(true)
            SHOWIF::'EXEC::env.stage.name == \`embassy_cquarters1\`'
        ПРОДИРАЯСЬ ЧЕРЕЗ РАССЛЯКШИЕ КОНТЕЙНЕРЫ... БЫТЬ МОЖЕТ, НЕЧТО ВАЖНОЕ
            SHOWIF::'EXEC::env.stage.name == \`embassy_cquarters1\`'

        МИЛТЗА ПРОСТАИВАЕТ В ПЕРЕМЕСТИТЕЛЕ, ОЖИДАЯ, КОГДА МЫ ЕГО ПОЧИНИМ
            EXEC::env.embassy.vn({bg: true, miltza: "display show far"});pauseSwapCam(true)
            SHOWIF::'EXEC::env.stage.name != \`embassy_cquarters1\`'
        НЕ ДУМАЮ, ЧТО ОНА МОГЛА БЫ БЕЗОПАСНО ОКАЗАТЬ ПОМОЩЬ БЕЗ ПОДКЛЮЧЕНЬЯ К ВРЕМЯДЕРЖЦУ
            SHOWIF::'EXEC::env.stage.name != \`embassy_cquarters1\`'

        НО В ЭТОМ КРАТКОВРЕМЕННОМ ПОКОЕ Я МОГУ ЗАВЯЗАТЬ РАЗГОВОР
            EXEC::env.embassy.vn({bg: true, miltza: "display show focus"})

    RESPOBJ::d3_miltza_resp

help
    sourceless
        ОНА УПОРНО КОПАЕТСЯ В ОСТАНКАХ СВОЕГО МАЛЕНЬКОГО ЗАГРАЖДЕНья...
    
    akizet
        милтза, ты ищешь что-то конкретное?
        может мы могли бы помочь!
    
    miltza
        а, нет нет!
        всё в порядке! идите дальше
        я скоро присоединюсь!

    RESPONSES::akizet
        хорошо<+>loop
            FAKEEND::(назад)

division
    akizet
        милтза!!
        какой инициативы ты часть? 
        мне думается, я не встречала тебя раньше

    miltza
        ооо, i am in the wisdom initiative!!
        а именно в подразделеньи по обмену!
        
    akizet
        правда?
        твои покои расположены довольно низко в шпиле
    
    miltza
        да, это так,
        но мысль о том, чтобы находиться так высоко...
        это глупо и по-личиночному, но я не могу перевести дух так далеко от земли
        я не против карабканья!
        ну... <em>была</em> не против...
        я не думаю, что после такого жизнь сможет вернуться на круги своя // ???
    
    RESPONSES::akizet
        ещё увидим<+>loop
            FAKEEND::(назад)

veilk
    akizet
        милтза!!
        я видела скульптуры вейльков в твоей комнате!
        они выглядели очень хорошо
        даже глаза вышли правильными
        ты часто их делаешь?

    miltza
        ахехе, на самом деле да!
        я делаю скульптуры и маленьких големов всего живого с обескии,
        но сложно заниматься этим, не делая множество вейльков
        близнецы их обожают, особенно тех, что двигаются
        недавно я завершила и отослала коллекцию экивиковых вейльков,
        некоторых даже с их украшеньями на отростках!
        так что теперь я работала над одним вазнийским видом...
        ахх, как же жаль!!

    RESPONSES::akizet
        у тебя ещё будет шанс!<+>art
            FAKEEND::(назад)

eye
    akizet
        милтза!!
        та фреска с глазом, над которой ты работала,
        она необычная, но жутковатая...
        что она означает?

    miltza
        хехе, ты не первая такое говоришь
        это старая доструктуристская симболика из моей родины в экиве
        аканива - ты там бывала?

    akizet
        ммм... нет
        я лишь знаю, что она находится недалеко от побережья напротив вазни

    miltza
        да!! ну,
        мои предки изображали глаз ???, чтобы оскорбить его
        что-то вроде отплаты за потехи велзи
        конечно, почти всё это было потеряно в унисоне окизики
        но я считаю, что для близнецов важно изображать всё множество взглядов на глаз
        даже мёртвых взглядов!
        также она должна была смениться на структуристский взгляд, затем на центральный вазнийский, на некоторые другие...
        но, в смешке велзи, в котором мы очутились,
        оказался готов только аканивиковый взгляд

    RESPONSES::akizet
        иронично<+>art
            FAKEEND::(назад)

taking
    akizet
        милтза!!
        ты будешь брать с собой что-нибудь из своих текущих работ?
    
    miltza
        нет, нет--я даже не уверена, что мы не сможем вернуться
        но я взяла архивные ядра, на которых храню свои дизайны
        так что - если они будут утеряны, то потеря небольшая!

    RESPONSES::akizet
        это хорошо<+>art
            FAKEEND::(назад)

SKIP::vn.done()
`)

env.localization.page['embassy'].dialogues["d3_mind_resp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        что-нибудь принести?<+>grab
        всё хорошо?<+>ok
        големное оружье?<+>bstrd
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.sorry_cyst)'
        давайте продолжим<+>END
            EXEC::env.embassy.vn({itzil: "", karik: "", bg: false});pauseSwapCam(false)
`)
env.localization.page['embassy'].dialogues["d3_mind"] = generateDialogueObject(`
loop
    RESPOBJ::d3_mind_resp
start
    sourceless
        ИТЗИЛ И КАРИК НЕГРОМКО БОЛТАЮТ ДРУГ С ДРУГОМ В УГЛУ
            EXEC::pauseSwapCam(true)
        КАК ТОЛЬКО Я ПОДХОЖУ, ОНИ ЗАМОЛКАЮТ И ПОДНИМАЮТ ГЛАЗА
            EXEC::env.embassy.vn({karik: "display", itzil: "display"});
        ЧТОБЫ ПОГОВОРИТЬ С НИМИ, Я ОПУСКАЮСЬ НА КОЛЕНИ, О ЧЁМ Я НЕ УВЕРЕНА, СТОИТ ЛИ МНЕ ЭТО ДЕЛАТЬ
            EXEC::env.embassy.vn({itzil: "display show", karik: "display show", bg: true});
        НО СТОЯТЬ И ГОВОРИТЬ С НИМИ СВЫСОКА КАЖЕТСЯ НЕВЕЖЛИВЫМ

    RESPOBJ::d3_mind_resp

bstrd
    sourceless
        Я ПРЕДЪЯВЛЯЮ ИМ ПОВРЕЖДЁННУЮ ЦИСТУ СО СХЕМОЙ
        КТО-ТО ИЗ НИХ БЫЛ ТЕХНИКОМ ПО ОБСЛУЖИВАНЬЮ ГОЛЕМОВ, ВЕРНО?

    akizet
        кто-нибудь из вас знает, что это такое?
        мы нашли её в архивной жиле неподалёку...
        это големное оружье, но слишком повреждённое для пониманья
        как думаете, его можно починить?

    sourceless
        ИТЗИЛ ПОДБИРАЕТСЯ БЛИЖЕ, ПРОТЯГИВАЯ ВЕТВИСТЫЙ ПСЕВДОРЕЦЕПТОР.
        ОНА ПОДКЛЮЧАЕТСЯ И ЗАДУМЧИВО БРОДИТ ГЛАЗОМ ПО СТОРОНАМ

    itzil
        да! оно залито бессвязностью, но...
        думаю она повлияла только на соединительную ткань  
        все части на месте, просто не связываются между собой
        на этаже обслуживанья големов найдётся уйма литейных чанов которые могут это исправить!
        я вроде как новичок в обслуживаньи големов, переведённая...
        если мои рецепторы ещё не выдали это! ахаха
    
    sourceless
        ИТЗИЛ ОТКЛЮЧАЕТСЯ, ШЕВЕЛЯ ВЕТВЯМИ СВОИХ РЕЦЕПТОРОВ НАПОДОБье ПАЛЬЦЕВ

    itzil
        но!! я знаю достаточно для починки подобного!
    
    akizet
        отлично! мы будем рассчитывать на тебя, итзил

    itzil
        ох...

    tozik
        ты знаешь, откуда <em>здесь</em> взялась схема големного оружья?
        большинство наступательных мер были переведены в подземные хранилища после первого контакта, так?
        
    itzil
        эээ, что ж,
        да!
        но, это должно быть одна из свежих...
        существует инициатива между материалами и обслуживаньем по созданью вооруженья основанного на светлом оружьи!
        по крайней мере была, до всего случившегося...

    akizet
        правда? она крупная?

    itzil
        не совсем, в ней была всего горстка исследователей...
        я знала, эээ, знаю жата который в ней участвовал
        и он сказал мне - в их симуляциях оно действительно разрывало насквозь секри!!
        только представьте что если бы мы могли применять светлое оружье на родине!
        поверхность наконец-то бы перестала быть проблемой!
    
    sourceless
        Я СЛЫШУ, КАК ГАКВУ ПОЧТИ УСМЕХАЕТСЯ, ХОТЯ И ТИХО

    akizet
        хмм... может

    RESPOBJ::d3_mind_resp

grab
    akizet
        у нас есть доступ к прилегающему θответвленью персонала
        кому-нибудь из вас нужно, чтобы мы что-то принесли?

    itzil
        нет, благодарю! я живу ниже, в обслуживаньи големов
    
    karik
        аххаха, всё необходимое я храню у себя в разуме!
        и... моя комната очень тщательно заперта,
        потому что в неё постоянно вламывалась подруга...
    
    akizet
        это не очень похоже на подругу

    karik
        нет-нет, она - вел куу!
        она умрёт, если перестанет надо мною подшучивать!
        ...
        i hope today was one of her days with the bright cousins     я надеюсь, что сей миг она со светлыми близнецами --- давай поближе к оригиналу

    RESPONSES::akizet
        me too<+>loop
            FAKEEND::(назад)

ok
    akizet
        у вас всё хорошо?
        как мыслеядровые резервы?

    itzil
        предостаточно!
        всё это очень пугает, но...
        вы бы знали как меня радует что вы нам помогаете!

    karik
        если у вас останется сфер после починок,
        мне бы он пригодился!
        я попеременно использую несколько куу-тел, так что..
        иногда я забываю покормиться

    RESPONSES::akizet
        это можно организовать<+>loop
            FAKEEND::(назад)

SKIP::vn.done()
`)

env.localization.page['embassy'].dialogues["d3_relocator_return"] = generateDialogueObject(`
start
    sourceless
        ПО ВОЗВРАЩЕНЬЮ ТОЗИК СРАЗУ ЖЕ СТАНОВИТСЯ НА КОЛЕНИ ОКОЛО ДВИЖЕДРУГА
            EXEC::specialCam("movefriend_examine");env.embassy.vn({tozik: 'defocus'});pauseSwapCam(true)
        ОН РАСКЛАДЫВАЕТ СОБРАННЫЙ СФЕР ПОБЛИЗОСТИ, ГОТОВЯ СЕБЕ РАБОЧЕЕ МЕСТО
        МИЛТЗА ТИХО НАБЛЮДАЕТ С КРАЯ КОМНАТЫ
        ЕЙ ХОЧЕТСЯ ПОМОЧЬ, ЭТО ЯСНО ПО ЕЁ ОПУЩЕННЫМ РЕЦЕПТОРАМ
        НО ОНА НИ ЖАТ, НИ ЦИСТОЗНЫЙ ИНЖЕНЕР
    
    tozik
        это займёт у меня некоторое время
            EXEC::env.embassy.vn({tozik: 'fullview'});
        мне необходимо, чтобы вы присматривали за мной, пока я работаю
        мы начнём сей θмиг?
    
    sys
        ВНИМАНИЕ::'текущий поток памяти близок к завершению'
            EXEC::change('PAGE!!movefriendqueued', true);change("PAGE!!ep3queuecheck", true)
        РЕКОМЕНДАЦИЯ::'сохранить итерацию'
        УВЕДОМЛЕНИЕ::'enable REDUCED INTENSITY within system menu if required'
        УВЕДОМЛЕНИЕ::'return to entity DISRUPTED MOVEFRIEND to proceed'

    RESPONSES::akizet
        дай мне подумать<+>END
            EXEC::env.embassy.vn({tozik: ''});specialCam(false);pauseSwapCam(false)

SKIP::vn.done();specialCam(false);pauseSwapCam(false);change('PAGE!!movefriendqueued', true);change("PAGE!!ep3queuecheck", true)
`)
env.localization.page['embassy'].dialogues["d3_relocator_later"] = generateDialogueObject(`
start
    sourceless
        МЫ СНОВА ПОДХОДИМ К ДВИЖЕДРУГУ
            EXEC::specialCam("movefriend_examine");pauseSwapCam(true)
        СФЕР ПО-ПРЕЖНЕМУ ЛЕЖИТ РЯДОМ, ГОТОВЫЙ К ИСПОЛЬЗОВАНью
    
    tozik
        готовы начать?
            EXEC::env.embassy.vn({tozik: 'fullview'});
    
    sys
        ПРИМЕЧАНИЕ::'текущий поток памяти близок к завершению'

    RESPONSES::akizet
        приступим<+>CHANGE::d3_relocator_repair
            FAKEEND::proceed
        осмотримся ещё немного<+>END
            EXEC::env.embassy.vn({tozik: ''});specialCam(false);pauseSwapCam(false)
`)
env.localization.page['embassy'].dialogues["d3_relocator_repair"] = generateDialogueObject(`
start
    akizet
        начнём!
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
        привет движедруг!!<+>awaken

awaken
    akizet
        привет движедруг!!!
    
    sourceless
        IT IS SILENT FOR A MOMENT
        PARTS OF ITS FACE PROJECTION FLICKER STRANGELY
    
    movefriend
        ПРИВЕТ АКИЗЕТЕШЕ!
        О И ТОЗИКОРИК! ГАКВУКАНИ!
        ЗДЕСЬ ТАК МНОГО ДРУЗЕЙ
        ОЧЕНЬ КЛАССНО!!
        ДРУЗЬЯ: Я НЕ ОЧЕНЬ ХОРОШО СЕБЯ ЧУВСТВУЮ
    
    tozik
        peculiar
        you should be feeling the same as before
        what is wrong?
    
    sourceless
        THE PATHS GAKVU HAD CARVED THROUGH THE WALLS LIQUIFY, CLOSING AGAIN
        GAKVU STUMBLES OUT OF THE WAY, NEARLY CAUGHT IN THE MOVEMENT
        MOVEFRIENDS ARE RARELY SO HAPHAZARD...

    movefriend
        Я НЕ ДОЛЖЕН БЫТЬ В СОЗ»НАНьи
    
    sourceless
        ITS FACE FLICKERS AWAY AND THE ROOM FALLS QUIET
            EXEC::changeBgm(env.embassy.music_p1boss_suspense, {rate: 0.5});document.querySelector('#realgrid .lifter').classList.remove('fixed')
    
    akizet
        §кºε
        мы опять здесь застряли?
    
    tozik
        что пошло не так...?
            EXEC::env.embassy.vn({tozik: "defocus"});
        все компоненты были в порядке
    
    sourceless
        GAKVU BACKS AGAINST THE INNER WALL OF THE RELOCATOR
            EXEC::env.embassy.vn({bg: true, gakvu: "defocus"});
        A SHARP WAVE OF TERROR RUNS THROUGH OUR CONNECTION
        
    gakvu
        он... 
            EXEC::ratween(env.bgm, 0.75, 10000)
        землемыслец
        он нас видит

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
        активировать времядержец<+>END
            EXEC::env.embassy.startMovefriendBoss();env.embassy.vn({tozik: '', gakvu: ''});specialCam(false);content.classList.remove('painprep', 'slowpain')
            FAKEEND::initiate combat
            SHOWIF::['gameplay_off', false]
        активировать времядержец<+>CHANGE::d3_movefriend_finish
            SHOWIF::['gameplay_off', true]
            EXEC::env.embassy.vn({tozik: '', gakvu: ''});specialCam(false);content.classList.remove('painprep', 'slowpain')
            FAKEEND::skip combat

SKIP::env.embassy.skips.d3_relocator_repair()
SKIPTIME::700
`)

env.localization.page['embassy'].dialogues["d3_movecmb"] = generateDialogueObject(`
start
    sys
        ПРЕДУПРЕЖДЕНИЕ::'обнаружена бессвязность'

    gakvu
        эй...
        слушайте
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
        ааааааа!!
        что это!!!
        ох... времядержец? он работает удалённо?
        
    akizet
        it does indeed
        you need to help us keep movefriend away from gakvu
        do you have any weapons?
    
    miltza
        нет... извини... у меня был лишь тот отключитель
        но когда я была larval, я была удалённою координаторшею
        я могу предоставить свои рефлексы!

    akizet
        that will do
    
    RESPONSES::akizet
        lets get started<+>END
            FAKEEND::proceed
            EXEC::env.rpg.classList.remove('hideteams')

SKIP::env.rpg.classList.remove('hideteams')
`)
env.localization.page['embassy'].dialogues["d3_movespecial"] = generateDialogueObject(`
start
    sourceless
        AROUND MOVEFRIEND, THE WALLS RIPPLE STRANGELY
            EXEC::env.bulletHell.paused = true
        IN ITS SPREADING INFLUENCE, SPIKES FORM OUT OF THE MALLEABLE BLACK CORRU
        BEHIND US, I HEAR GAKVU STRAINING TO HOLD THIS SPACE TOGETHER
        I ONLY HOPE SHE CAN STOP IT FROM SIMPLY CRUSHING US ALL

    sys
        ПРЕДУПРЕЖДЕНИЕ::'abnormal thoughtform activity detected'
        ПРЕДУПРЕЖДЕНИЕ::'entity MOVEFRIEND';'altering thoughtspace'
        АНАЛИЗ::'intention to destroy recollection locus'
        ВНИМАНИЕ::'utilizing proxy thoughtform';'manually direct away from incoherence'
        ВНИМАНИЕ::'neural controls adjusted';'direct proxy with primary method of navigation'

    moth
        похоже развледруг был прав
            SHOWONCE::
        удачи дружище
            SHOWONCE::
    
    RESPONSES::self
        спасибо<+>END
            EXEC::bh_movefriend({level: "tutorial"});env.bulletHell.paused = false
`)
env.localization.page['embassy'].dialogues["d3_movefriend_finish"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ВНИМАНИЕ::'пропущен геймплей мыслеформенного боя';'переключите в системном меню по желанию'
____END

    sourceless
        ALL AT ONCE, THE CHAOS STOPS
            EXEC::specialCam("movefriend_examine");changeBgm(page.bgm, {rate: 0.5})
        THE AGGRESSOR'S SIGIL FLICKERS AWAY, 
            EXEC::document.querySelector('#realgrid .lifter').classList.remove('aggressormode')
        AND MOVEFRIEND'S FACE RETURNS
            EXEC::document.querySelector('#realgrid .lifter').classList.add('fixed');change('PAGE!!movefixed', true)

    movefriend
        АААА!!!
        О! Я СВОБОДЕН!
        Я ОЧЕНЬ СОЖАЛЕЮ
        ПОЖАЛУЙСТА ПОЙМИТЕ ЧТО Я НИКОГДА БЫ НЕ ПЫТАЛСЯ ВАМ НАВРЕДИТЬ
    
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
        что? как?
        где ты такому научилась?
    
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
        да!
            EXEC::env.embassy.vn({miltza: "display show focus hascon far", gakvu: 'defocus nocon', tozik: 'defocus'});
        and it did not sound good...
        их сообщенья перемешивались с болью и страхом

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
        могли бы мы выжить с помощью времядержца?
        вы - чудесные бойцы, когда он активен!!
    
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
        всё верно!
            EXEC::env.embassy.vn({itzil: 'display show', gakvu: 'nocon defocus', tozik: 'defocus'});
        блок θсегмента обслуживанья големов прямо под нашим!
        и он тоже полон оружья!!

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
        я не уйду пока не спасу свою кивии!

    karik
        maybe we could get into the golems down there and help, too!     может мы сможем забраться в находящихся там големов и тоже помогать!

    miltza
        я... я не вижу других вариантов
            EXEC::env.embassy.vn({karik: '', itzil: '', miltza: 'show hascon'});
    
    gakvu
        hehehe...
            EXEC::env.embassy.vn({itzil: '', miltza: 'hide hascon', karik: '', gakvu: "defocus nocon"});
        velzie truly has chosen us
            EXEC::env.embassy.vn({gakvu: "focus nocon"});
        movefriend, please take us to the golem maintenance block
            EXEC::env.embassy.fixMovefriend()
    
    sys
        ВНИМАНИЕ::'memory stream segment end'
            EXEC::env.embassy.vn({bg: false, itzil: '', miltza: 'hide hascon', karik: '', gakvu: "hide nocon"});
        РЕКОМЕНДАЦИЯ::'сохраните итерацию'
        УВЕДОМЛЕНИЕ::'render can continue without incoherence'
        УВЕДОМЛЕНИЕ::'thoughtform activity detected'::IN::'embassy research center'
            SHOWIF::['PAGE!!archiveopen', false]

____SHOWIF::['ENV!!ep3', false]
        ВНИМАНИЕ::'next memory stream segment incomplete';'internal note attached'::
    
    funfriend
        привет лазутчик! пожалуйста вернись через θподмиг! я почти закончил со следующею частью!

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
        ВНИМАНИЕ::'next memory stream segment available';'continue directly?'
____END

    RESPOBJ::d3_closeout

explore
    sys
        ВНИМАНИЕ::'сохранение итерации...'
            EXEC::change("PAGE!!ep2xplore", true)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        ПРИМЕЧАНИЕ::'процесс сохранения завершён'
        ПРИМЕЧАНИЕ::'return to entity movefriend once stream repair is complete'
            SHOWIF::['ENV!!ep3', false]
        ПРИМЕЧАНИЕ::'return to entity movefriend when prepared to proceed'
            SHOWIF::['ENV!!ep3', true]
    
    RESPONSES::self
        окей<+>END

continue
    sys
        ВНИМАНИЕ::'сохранение итерации...'
            EXEC::change("PAGE!!embassy_day", 3.5)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        ПРИМЕЧАНИЕ::'процесс сохранения завершён'
        ВНИМАНИЕ::'commencing stream transfer'
            EXEC::change("TEMP!!ep2->ep3transfer", true)
    
    RESPONSES::self
        окей<+>END
            EXEC::moveTo("/local/ocean/embassy/golem/")

savexit
    sys
        ВНИМАНИЕ::'сохранение итерации...'
            EXEC::change("PAGE!!explore", true)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        ПРИМЕЧАНИЕ::'процесс сохранения завершён'
        ПРИМЕЧАНИЕ::'load iteration';'return to entity movefriend once stream repairs is complete'
            SHOWIF::['ENV!!ep3', false]
        ПРИМЕЧАНИЕ::'load iteration';'return to entity movefriend when prepared to proceed'
            SHOWIF::['ENV!!ep3', true]

    RESPONSES::sys
        end<+>END
            EXEC::corruRefresh()
            FAKEEND::(end recollection)

advance
    sys
        ВНИМАНИЕ::'сохранение итерации...'
            EXEC::change("PAGE!!explore", true)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        ПРИМЕЧАНИЕ::'процесс сохранения завершён'

    RESPONSES::sys
        advance log<+>END
            EXEC::env.entities["advance log"].actions[0].exec()
            FAKEEND::(advance to EP3)

END::specialCam(false);pauseSwapCam(false)
SKIP::env.embassy.skips.d3_movefriend_finish();change("PAGE!!explore", true);env.embassy.collapseSave({effects: true})
SKIPNOTICE::defaults to save and explore
`)
env.localization.page['embassy'].dialogues["d3_moveend"] = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'memory continues in separate stream';'follow stream?'
            SHOWIF::"ENV!!ep3"

____SHOWIF::["ENV!!ep3", false]
    sys
        ОШИБКА::'memory continues in separate stream';'separate stream is corrupt'
        ОШИБКА::'cannot render'
        УВЕДОМЛЕНИЕ::'reiterating attached internal note'::

    funfriend
        привет лазутчик! пожалуйста вернись через θподмиг! я почти закончил со следующею частью!
____END

    RESPONSES::self
        окей<+>END
            SHOWIF::"ENV!!ep3"
            EXEC::change("TEMP!!ep2->ep3transfer", true);moveTo("/local/ocean/embassy/golem/")
            FAKEEND::(continue memory)

        not yet<+>END
            SHOWIF::"ENV!!ep3"

        блин<+>END
            SHOWIF::["ENV!!ep3", false]
            FAKEEND::(continue exploring)
    
    RESPONSES::sys
        return to memory selection<+>END
            SHOWIF::["ENV!!ep3", false]
            EXEC::corruRefresh()
            FAKEEND::(end recollection)
`)

// = EVIL MODE = //
env.localization.page['embassy'].dialogues["d3_bstrdreveal"] = generateDialogueObject(`
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
`)
env.localization.page['embassy'].dialogues["d3_bstrdintro_responses"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        что ты сделал?<+>what
        ты кто?<+>who
        this evil mode worked?<+>why
            SHOWIF::"e3a2__bstrdmeet"
        move on<+>bye
            FAKEEND::(end chat)
            SHOWIF::'embassy__d3_bstrdintro-what'
`)
env.localization.page['embassy'].dialogues["d3_bstrdintro"] = generateDialogueObject(`
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
        так шо я беру & улчшаю мелкую 4асть
        шоб развлеч тя есл хочеца ?
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
        но мож попробуеш)) .. . ?? 
    
    self
        DID YOU ALTER THE EVENTS?
        IS ANY OF THIS REAL?

    bstrd
        '_'
        БЛЬШНСТВ из этго ряльн случлсь
        :V
        я прст сделал вс кру4е)

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
        ВНИМАНИЕ::'memory stream resumed'
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
`)
env.localization.page['embassy'].dialogues["d3_bstrdnointro"] = generateDialogueObject(`
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
`)
env.localization.page['embassy'].dialogues["d3_archiveintro"] = generateDialogueObject(`
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
        продолжить<+>END
`)
env.localization.page['embassy'].dialogues["d3_archivedoor"] = generateDialogueObject(`
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
        господи боже он вписал себя во вспоминание
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
        там внутри чета КРYТ03...)
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
        продолжить<+>END
            EXEC::change("PAGE!!triedarchivedoor", true);specialCam(false);env.embassy.vn({gakvu: "", tozik: ""});pauseSwapCam(false)
`)
env.localization.page['embassy'].dialogues["d3_archivedoorlocked"] = generateDialogueObject(`
start
    sourceless
        THE DOOR AND ITS STRANGE MATERIAL LIE UNMOVING, NO MATTER WHAT WE DO
        WE NEED TO GET THE 'COOL ORB THINGY' AND 'SCARY BLACK BOX'

    RESPONSES::akizet
        продолжить<+>END
`)
env.localization.page['embassy'].dialogues["d3_archivecore"] = generateDialogueObject(`
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
        продолжить<+>END
            EXEC::specialCam('');env.embassy.vn({gakvu: "", tozik: ""});pauseSwapCam(false)
`)
env.localization.page['embassy'].dialogues["d3_archivedelivery"] = generateDialogueObject(`
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
`)
env.localization.page['embassy'].dialogues["d3_archivedeliveryclear"] = generateDialogueObject(`
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
        продолжить<+>END
            EXEC::env.embassy.vn({gakvu: ""});setCam();env.stage.current.onStep();pauseSwapCam(false)

start
____SHOWIF::'gameplay_off'
    sys
        ВНИМАНИЕ::'пропущен геймплей мыслеформенного боя';'переключите в системном меню по желанию'
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
        продолжить<+>END
            EXEC::env.embassy.vn({gakvu: ""});pauseSwapCam(false)
`)
env.localization.page['embassy'].dialogues["d3_archivedoorunlock"] = generateDialogueObject(`
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
        йо чеб вам не зайти у мя для вас сюрпиз)
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
        продолжить<+>END
            EXEC::specialCam('');removeItem(env.ITEM_LIST.scary_black_box);removeItem(env.ITEM_LIST.cool_orb_thingy);pauseSwapCam(false)
`)
env.localization.page['embassy'].dialogues["d3_archivedoorearly"] = generateDialogueObject(`
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
        там внутри чета КРYТ03...)
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
        заходите у мя для вас сюрпиз))
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
        продолжить<+>END
            EXEC::specialCam(false);removeItem(env.ITEM_LIST.scary_black_box);removeItem(env.ITEM_LIST.cool_orb_thingy);pauseSwapCam(false)
`)
env.localization.page['embassy'].dialogues["d3_archivemini"] = generateDialogueObject(`
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
`)
env.localization.page['embassy'].dialogues["d3_archiveminiclear"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ВНИМАНИЕ::'пропущен геймплей мыслеформенного боя';'переключите в системном меню по желанию'
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
        продолжить<+>END
`)
env.localization.page['embassy'].dialogues["d3_archiveboss"] = generateDialogueObject(`
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
        рбята вы ток шо научили голема как пользоваца пушкми
        АХУЕНА ...
        РАССТРЕЛЛЛЯТЬ!!! ВО ТАК ИХ 4УВАК!!
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
`)
env.localization.page['embassy'].dialogues["d3_archivebosstut"] = generateDialogueObject(`
start
    sys
        ПРЕДУПРЕЖДЕНИЕ::'abnormal thoughtform activity detected'
            EXEC::env.bulletHell.paused = true;ratween(env.bgm, 0.5);env.temporaryOptimize = false;
        ПРЕДУПРЕЖДЕНИЕ::'entity BSTRD';'altering thoughtspace'
            EXEC::env.bulletHell.paused = true
        АНАЛИЗ::'intention to destroy recollection locus'
        ВНИМАНИЕ::'utilizing proxy thoughtform';'manually direct away from incoherence'
        ВНИМАНИЕ::'neural controls adjusted';'direct proxy with primary method of navigation'

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
        АНАЛИЗ::'context shift'
        ВНИМАНИЕ::'optionally';'utilize INTERACTION over highlighted areas to disarm entity KAVRUKA'
        УВЕДОМЛЕНИЕ::'INTERACTION triggered by <span definition="EQUIVALENT::'LMB'">primary action method</span>'
        УВЕДОМЛЕНИЕ::'additionally triggered by <span definition="EQUIVALENT::'Q';'E'">quality and view shift methods</span>'

    RESPONSES::akizet
        go!!<+>END
            EXEC::bh_gundown("tutorial");env.bulletHell.paused = false;ratween(env.bgm, 1);env.temporaryOptimize = true
            FAKEEND::(continue) 
`)
env.localization.page['embassy'].dialogues["d3_archivebossend"] = generateDialogueObject(`
start
    sourceless
        THE GOLEM FALLS TO PIECES, ITS HOVERING CAPABILITIES SLUDGED
            EXEC::env.stage.current.bossCollapse();env.stage.current.clearBossPals()
        BUT ITS SIGIL AND STRANGE VOICE REMAIN
            EXEC::change('PAGE!!archiveboss', true);

____SHOWIF::['gameplay_off']
    sys
        ВНИМАНИЕ::'пропущен геймплей мыслеформенного боя';'переключите в системном меню по желанию'

    bstrd
        ВТФ
            EXEC::specialCam("bstrdbox");pauseSwapCam(true)
        и вы так делали...
        ВСЕ ЭТО ВРЕМЯ???
        >:[
        НЕЧЕСНО!
        НЕ НУ ЧЕ ЗА ХУЙНЯ(
    
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
        крч я щас умру так шо слушайте вниательно)
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



getLocalizationForPage(true) // --- ensuring that Nothing Gets Fucked Up