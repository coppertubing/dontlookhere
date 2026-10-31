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

        "ззоуст": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'праздничный напиток';'правильное произношенье исключительно выкриком'` },


        "землемыслье": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'удалённое управленье и инструктированье корруцистозных устройств';'частичный перевод';'сгенерировано из унаследованного описания'` },


        "зевазни": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'пещерный город в центре вазни';'начало корруцистозной революции'` },

        "no tendril left to rot": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'распространённый оборот речи';'all is harvested'` },

        "cavernguard": { type: `ПРИМЕЧАНИЕ`, text: `'частичный перевод';'сгенерировано из унаследованного описания'` },


        // life-pod (капсулы жизни) были перенесены в сам текст тк их еле упоминают а они склоняются по падежам очень много
        // аканиву ткнем после выпуска коллапса

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
        "holy smokes. yeah i don't think we ever heard about this part of the call. let's get into that next memory": "етить колотить, дааа не думаю что мы хоть раз слышали об этой части зова... давай-ка следующую",
        "this is the most dense thoughtform i think i've ever seen... they have such a strange way of storing data": "это вообще самая плотная мыслеформа из всех что мне когда-либо встречались... их способ хранения данных такой странный",
        "looks like you wormed your way back into an inactive space... i doubt you'll get far without a recollection locus": "", // --- unf

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
        акизет в подозрении<+>akizet
            SHOWIF::"embassy_d2_complete"
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
        but the fact we didn't know about it does strongly suggest that it <em>was</em> a dull signal            
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

akizet
    self
        в воспоминании "подозрении"
        акизет ведёт себя как дура
        мы ничего не упускаем?

    moth
        эээ нууууу
        ну для этого, ТИПА, есть доля культурного контекста
        достаточно известно то что из обесков никакущие вруны
        помимо всей этой новой фигни с конфликтом,
        абсолютно всё что мы знаем об их истории звучит как мир дружба жвачка
        ну полагаю у них есть конечно социальные паразиты, но это другое
        тип, между собой у обесков никаких разводов тупо не бывает
        и ей очевидно хотелось всё порешать здесь и сейчас
        так что может она думала что кто бы это ни был, он был бы таким же...
        неловким? холодным?
        трудно сказать
        но если бы я не умел врать, и знал это,
        это точно не то что я бы сделал лол <блинскиймоль>

    RESPONSES::self
        согл<+>obeskloop
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
        сквозь далекое открытье далля я чувствую, что начался новый θвзор

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
        я должна собрать ключевую команду, тогда мы сможем начать
    
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

    moth
        у тебя до сих пор оно включено?

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
        есть одна старая, о которой я всё думаю--совместная теория самих далльзковика и азкавинеше!
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
        ОСОБЕННО ОТ ДАЛЛЬЗКОВИКА, УЛЫБНЁТСЯ ЕМУ ВЕЛЗИ
    
    akizet
        замкнутая петля...
        это та про уп--
    
    cavik
        управленье временем!! да! позволь мне напомнить!
        далльзковик утверждал, что в одну эпоху... мы научимся использовать среду далля для четырёхмерного перемещенья в пространстве
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
        по-моему, далльзковик не понимал в тот момент всех последствий созданья открытья внутри планеты
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
        у меня и в мыслях не было, чтобы делиться <em>подобным</em>
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
        НО ПО ЕДВА ЗАМЕТНОМУ ПОВОРОТУ РЕЦЕПТОРА Я ВИЖУ, ЧТО ОН ЧУВСТВУЕТ: НЕ СТОИЛО ЭТО ГОВОРИТЬ
    
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
        как только соберу всю команду
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
        необычный пик... но неудивительный, учитывая близость открытья далля
    
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
        сквозь далекое открытье далля я чувствую, что начался новый θвзор
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
        неисчислимое количество цист самодоставляется каждый θвзор,
        и каждая из них обыденна по своей природе.
        зачем тебе информация конкретно об этой?

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
        нет-нет, не работа... в смысле, зов

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
        это просто значит, что у меня останется больше времени на ложные среды
    
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
        о, нет-нет
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
        СОМНЕВАЮСЬ, ЧТО ЭТО ОН...
        ХОТЯ, УЧИТЫВАЯ ТО, КАКОЙ ОН ОБЫЧНО,
        Я БЫ НЕ ДОГАДАЛАСЬ В ЛЮБОМ СЛУЧАЕ

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
env.localization.page['embassy'].dialogues["++ingfixoption"] = generateDialogueObject(`
start
    sys
        ОШИБКА::'поток памяти остановлен'

    bugout
        игрок
        с момента прошлой итерации продолжить
        произошёл БОЛЬШИЕ ИЗМЕНЕНИЯ в твоей мозгоигре
        глубокие фундаментальные изменения ок
        во ВСЕХ ПРЕДМЕТ
        во ВСЕХ БОЙ
        некоторые слово изменились
        мы так делаем только 1 раз ок?
        адабтация сохранения возможна
        НО
        o_o
        подумай о РЕСТАРТ из-за БОЛЬШИЕ!!! ИЗМЕНЕНИЯ!!!
        может выйти странно из-за БОЛЬШИЕ!!!!! изменения
        выбери что делать пожалуйста
    
    sys
        ВЫПОЛНЯЕТСЯ::'функциональный выбор'
        
    plainsys
        ПРОДОЛЖИТЬ - оставить текущее сохранение, но адаптировать его
        ОТМЕНИТЬ - вернуться к выбору вспоминаний, чтобы создать новую итерацию

    sys
        КОНЕЦ::
        
    RESPONSES::self
        продолжить<+>END
            HIDEREAD::
            EXEC::change("TEMP!!permitIngUpgrade", true);env.entities["recollection::collapse"].actions.find(action=>action.name == "load iteration").exec()
        отменить<+>END
            HIDEREAD::
            EXEC::moveTo("/local/ocean/embassy/")
`)
env.localization.page['embassy'].dialogues["mothframe"] = generateDialogueObject(` 
start
    sys
        ОШИБКА::'визуализация невозможна';'мыслеформа содержит насилие, агрессивные действия';'не соответствует лицензии мыслекола'
        РЕКОМЕНДАЦИЯ::'сообщить об источнике памяти в местные органы власти'

    moth
        чёрт, жаль что патч ФБКС с подобным не помог
        неудивительно, честно говоря
        не знаю, был ли у тебя до этого опыт с потоками мыслей с насилием,
        но после 52-го они серьёзно ограничили эту херню
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
        но она не моя
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
        EXECUTING::"structure direction";"iteration restart"::

    plainsys
        creation of new iteration will delete prior iteration configuration
        proceed only if prior iteration state is undesirable

    sys
        END::
    
    RESPONSES::self
        do it<+>END
            EXEC::cutscene(true);page.newit = 1
            
        nevermind<+>END

END::if(page.newit) {env.embassy.newCollapseIteration(page.newit)}
`)
env.localization.page['embassy'].dialogues["d3_partselection"] = generateDialogueObject(`
start
    sys
        EXECUTING::"structure direction";"stream selection"::

    plainsys
        creation of new iteration will delete prior iteration configuration
        proceed only if prior iteration state is undesirable
        additionally; select desired memory stream
        two of three total streams available; third suffers prohibitive incoherence
            SHOWIF::[["gol__bossclear", false], ["ENV!!ep4", false]]
        three streams available
            SHOWIF::[["gol__bossclear", true], ["ENV!!ep4", true]]
        stream 1; beginning; research
        stream 2; descent; golem maintenance
        stream 3; destruction; groundsmindry
            SHOWIF::[["gol__bossclear", true], ["ENV!!ep4", true]]
        if selected stream has preceding streams
        equipment from previously completed optional segments will be granted
        
    sys
        END::

    RESPONSES::self
        stream 1<+>END
            EXEC::cutscene(true);page.newit = 1
            FAKEEND::(1/3: research)

        stream 2<+>END
            EXEC::cutscene(true);page.newit = 2
            FAKEEND::(2/3: maintenance)

        stream 3<+>END
            EXEC::cutscene(true);page.newit = 3
            SHOWIF::[["gol__bossclear", true], ["ENV!!ep4", true]]
            FAKEEND::(3/3: groundsmindry)
            
        nevermind<+>END

END::if(page.newit) {env.embassy.newCollapseIteration(page.newit)}
`)
env.localization.page['embassy'].dialogues.d3_closeout = generateDialogueObject(`
RESPOBJ::
    RESPONSES::sys
        save<+>explore
            FAKEEND::(continue)

        do not<+>END
            FAKEEND::(continue)
`)


// = RECOLLECTION = //
env.localization.page['embassy'].dialogues["d3_start"] = generateDialogueObject(`
start
    sourceless
        TOZIK, GAKVU AND I SIT HALF-CONNECTED TO THE TIMESTOPPER
            EXEC::content.classList.add('innerfocus', 'showfocus');content.querySelector('.focus').classList.add('day3')
        EVER SINCE THE GROUNDSMIND SAW FIT TO HAVE IT REST IN OUR RESEARCH CENTER,
        USING ITS EFFECTS WHETHER WHOLLY OR PARTIALLY HAS BECOME A STANDARD PRACTICE
        RARELY IS IT DRAWN AWAY FROM US, OFTEN RETURNED IN SHORT ORDER
        FEW OTHER OPERATIONS USE IT TO SUCH DRASTIC POSITIVE EFFECT

    tozik
        next

    sourceless
        SUCH PLEASANT SPEED! SO MUCH TIME FREED!
        WHO SAYS VELZIE CANNOT SMILE WITH COMPASSION?
        OUTSIDE OF OUR CONNECTION, I SENSE OUR ASSISTANT GOLEM ATTACHING A LISTENER
            EXEC::document.querySelector('.redundancy').style.setProperty('--dataoffset', 3)

    gakvu
        loaded!
    
    sourceless
        MEMORY OF A SIGNAL-RECORD CYST RADIATES THROUGH OUR CONNECTION
        AN IDENTIFIER PRECEDES ITS ABRIDGED LOG: PRE-CONTACT, θeye 4, θradiant 0
        TOZIK FLEXES THE NERVE OF THE TIMESTOPPER, 
        AND IT BACKS HIS MIND WITH THE FULL WEIGHT OF ITS INTELLECT
        GIVING THE APPEARANCE OF THE REVIEW'S INSTANT COMPLETION
        BUT HIS THOUGHTS CARRY A FAMILIAR FATIGUE AS HE RELEASES IT

    tozik
        no drift, no changes, all is aligned
        next one
    
    sourceless
        THEN COMES ANOTHER SIGNAL-RECORD - PRE-CONTACT, θeye 4, θradiant 1
            EXEC::document.querySelector('.redundancy').style.setProperty('--dataoffset', 6)
        TOZIK'S MIND PASSES OVER ITS SUMMARY, SLIGHTLY DISINTERESTED
        THE MUNDANITY OF THIS INVESTIGATION, NECESSARY AS IT MAY BE, SET IN LONG AGO...
        ESPECIALLY TO ME--IT FEELS POINTLESS BENEATH THE RECEPTORS OF MY WORK WITH GORDON'S TEAM
        EVEN NOW MY MIND RACES TOWARDS DISTANT TOPICS
        ESPECIALLY CAVIK... NO NO, I SHOULD NOT THINK ABOUT IT NOW
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
        AND WITH AN IMPULSE, THE GRAND CYST'S FLESH BECOMES AS MY OWN,
            EXEC::vfx({type: "darkflash", state: true});ratween(env.bgm, 0.25)
            WAIT::2000
            THEN::content.classList.add("timefocus");vfx({type: "darkflash", state: false})
        MY MINDCORE FLOATING IN ITS OCEAN OF ROILING CORRU
            EXEC::content.classList.add("timefocusaki")
        A PILOT CONDUCTING THE VAST WAVES OF ITS CAPACITY FOR THOUGHT
        THE LISTENER DATA, BOTH LOGGED IN THIS RECORD AND FETCHED FROM OUR ARCHIVES, IS TERRIBLY DENSE
        LIKE ALL THE OTHERS
        SO I COMMENCE COMPARISON
    
    timestopper
        Á–ßÎú,Û†Àç?¿ã„gøò#mÞüÐï>ùô7ÿ}ÿ¦ÿúŽõþ‹¾òêéÎÆ|žVÅDVQ½‘îîf
        Ç—ÌïØÅáô(·â±Ð1HQÒî¿ð#c@¥5HàH†²ŠœDÍ
    
    sys
        ATTENTION::'large amount of unprocessable data';'advancing stream to next coherent data'
            EXEC::flash(true)

    sourceless
        ...
        HALFWAY THROUGH THE θradiant's REVIEW, THROUGH SUBJECTIVE θwinks,
            EXEC::content.classList.add('timefocus2');flash(false)
        I FEEL ALREADY THAT I WILL FIND NO DISCREPANCIES, 
        LIKE EVERY OTHER COMPARISON WE HAVE DONE
        BUT TOZIK IS RIGHT TO INSIST THAT WE BE THOROUGH
        IF ONE SPIKE HAS BEEN KEPT SECRET FROM THE COLLECTIVE,
        WHAT MORE COULD BE KEPT FROM US?
        NO LESS THAN TOTAL CERTAINTY WILL SUFFICE
    
    timestopper
        ÷‹œúXA†E0Ýã…z”Õš:U´Õp^F¡;Ž|¿T&
        NFöÁ>ÅMÚÒÞ‰Ù’Ö»ã¶„]œ,iÿo#à¶ÀßsÊz<Ùœ&çqž³
    
    sys
        ATTENTION::'large amount of unprocessable data';'advancing stream to next coherent data'
            EXEC::vfx({type: "darkflash", state: true})

    sourceless
        --PULL AWAY FROM THE ABSTRACT TETHERS THAT CONNECT MY THOUGHTS TO ITS FLESH
            EXEC::vfx({type: "darkflash", state: true});ratween(env.bgm, 1)
            WAIT::2000
            THEN::content.classList.remove("timefocus", "timefocusaki", "timefocus2");vfx({type: "darkflash", state: false})
        AND MY MIND EMERGES FROM THE TIMESTOPPER AT LAST
        FOR THE OTHERS, BARELY A LARVAL BREATH COULD HAVE PASSED
    
    akizet
        this one matches as well
    
    tozik
        hmm...
        the two spikes we know of are still the only discrepancies
        i believe we have reviewed enough

    akizet
        you would cease here? are you sure?

    tozik
        if my raw thought theory is correct, even accounting for some organic drift,
        we have well passed the point where another equidistant spike might have been found
        i may continue on my own to be certain, 
        but the important periods have been covered
        thank you for your help, this would have taken much longer alone
    
    gakvu
        you owe me a receptor curl
    
    tozik
        not happening
        we should see these cysts returned - disconnect that listener, i will...
            EXEC::env.embassy.day3Static();
        ...huh

    sourceless
        SOMETHING IS WRONG
        THE OTHERS FEEL IT TOO
    
    gakvu
        hey,
    
    tozik
        quiet
        i hear it
    
    sourceless
        ...
        ...
        
    tozik
        what is that?
        is that coming from the listeners?
    
    sourceless
        IT IS A SORT OF WHISPER... I MUST LISTEN CLOSELY
        BUT JUST AS I SEEM TO GRASP THE MESSAGE...
        PAIN
            EXEC::env.embassy.day3Signal();
            WAIT::6000

    sourceless quiet
        A WORDLESS IMPULSE SEIZING EVERY CORNER OF MY MIND
        IT DOES NOT FEEL INTENDED FOR ME
        YET IT CRAWLS AND WRITHES THROUGH MY FLESH
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
        THE GLOW OF THE CYSTIC GLASS HAS DIMMED, THE CHAMBER DARK

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
        an impact? an explosive?
    
    tozik
        not seeing any physical damage
    
    sourceless
        GAKVU RUMMAGES THROUGH HER FALSE VEILK SKIN COAT, PRODUCING A SMALL CORRUCYST
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
        wait, mine is working
    
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
        i have never felt anything like that before...
        could this be the bright cousins? an attack??
        or... some sort of dull collision?

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
        but this is far beyond the ability of the bright cousins
            EXEC::specialCam(false)
    
    gakvu
        well, whatever is happening,
        if our equipment is getting sludged...
        then the internals of the spire must be, too
        we should get out of here
    
    akizet
        agreed - let us gather the others in this θsegment
        and stay behind me
    
    sourceless
        AFTER THAT MOMENT OF AGREEMENT, WE ALL SEEM TO REALIZE THE SAME THING
        DESPITE THE CONNECTORS LACKING A PHYSICAL TETHER,
        WE ARE STILL CONNECTED TO THE TIMESTOPPER, ITS NERVE STILL PLAINLY WITHIN REACH
    
    timestopper
        WAS THIS ALWAYS REMOTE CAPABLE?

    tozik
        yes
        did you not listen when we first got it?
    
    gakvu
        hehe
            EXEC::env.embassy.vn({tgolem: 'showleft'})

    sourceless
        AS GAKVU REACHES TO REMOVE HER CONNECTOR, OUR ASSISTANT GOLEM SCRAPES AGAINST THE FLOOR
            EXEC::env.embassy.vn({tgolem: 'display show', gakvu: 'defocus', tozik: 'defocus'})
        WE CEASE MOVEMENT, GAZES CONVERGING UPON IT
            EXEC::changeBgm(env.embassy.music_unsafe, {rate: 1})
        IT HAS DRAGGED ITSELF TO AN UNEASY HOVER, AN ODD CONTROL SIGIL MADE APPARENT
            EXEC::env.embassy.vn({tgolem: 'display show center'})
        SOMETHING IN THE GROUNDSMINDRY IS DIRECTING IT - BUT NOT VEKOA?
    
    aggressor
        o   ut o  u  t o 
        i w  wi ll n no t let
    
    gakvu
        hello?
    
    sourceless
        THE CONSTRUCT TWISTS ABOUT IN THE AIR, MOVING AWAY, THEN TOWARDS US
        SOMETHING ABOUT ITS CONTROL IS CONFUSED, BUT ONLY FOR A θblink
        FOR ITS STYLIZED ARMS SUDDENLY SHARPEN INTO SPIKES, AND IT RUSHES TOWARDS GAKVU
            EXEC::env.embassy.vn({tgolem: 'display show approach'})
        ÷Œ€T$0 - THIS IS AN ATTACK
    
    akizet
        get back!!

    sourceless
        EXPERIMENTALLY, I FLEX THE NERVE OF THE TIMESTOPPER CONNECTOR
        AND AS IT LENDS ITS THINKING FLESH TO US, TIME DOES SLOW, 
        BUT NOT TO THE DEGREE OF OUR PREVIOUS WORK - SUCH IS THE REMOTE TRADEOFF
        THESE TWO ARE UNPREPARED FOR COMBAT, BUT WITH MY TIME ON THE SURFACE
        YES, I CAN SAVE THEM
        THOUGHTS THAT COULD ONLY BE GAKVU'S ECHO THROUGH OUR CONNECTION
    
    timestopper
        WHAT DO I DO WHAT DO I DO
        IT IS GOING RIGHT FOR MY MINDCORE IT IS GOING TO KILL ME
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
`)

env.localization.page['embassy'].dialogues["d3_tutorial_start"] = generateDialogueObject(` 
start
    sourceless
        in our altered time, careful maneuvers can be taken
        the golem rushes for gakvu, left vulnerable in its haste
        a perfect opportunity to strike
        and after my attacks create an opening,
        i can direct the others to follow through...

    sys
        EXECUTING::"structure direction";"thoughtform combat"::

    plainsys
        reduce health of opponents to proceed
            EXEC::env.rpg.classList.remove('hideteams')
        select allied actions strategically
        take note of lingering status effects; vital for success
        hover for detail; temporary effects displayed in text above HP
            EXEC::var boxSize = env.rpg.enemyTeam.members[0].box.getClientRects()[0];mousePing({x: boxSize.x + boxSize.width * 0.5, y: boxSize.y + boxSize.height * 0.5, duration: 3000, scale: 10});mousePing({x: boxSize.x + boxSize.width * 0.5, y: boxSize.y + boxSize.height * 0.5, duration: 6000, scale: 10})
        special effects displayed in icons below HP
            EXEC::var iconBox = env.rpg.enemyTeam.members[0].statusEffects[0].passiveIconElement.getClientRects()[0];mousePing({x: iconBox.x + iconBox.width * 0.5, y: iconBox.y + iconBox.height * 0.5, duration: 3000, scale: 20});mousePing({x: iconBox.x + iconBox.width * 0.5, y: iconBox.y + iconBox.height * 0.5, duration: 6000, scale: 20})
        survive
    sys
        ::END

____SHOWONCE
    moth
        okay, a little concise, but...
        it works!!
        sorry. staying quiet
        let's get to the bottom of this
____END

    sourceless
        this golem utilizes an assistant frame
        evasive by virtue of its disparate thin components, and terribly durable
        and so i sharpen my claws, 
        for piercing corru is the surest method of both weakening and destroying it
        though--it may just as easily be disoriented with blunt force
        i could also simply get in the way, preparing to deflect it...
    
    RESPONSES::akizet
        take action<+>END
            FAKEEND::proceed
`)
env.localization.page['embassy'].dialogues["d3_tutorial_gakvu"] = generateDialogueObject(`
start
    sourceless
        with a violent shove, it impacts some equipment, floating components clattering apart briefly
            SHOWIF::'EXEC::hasStatus(env.rpg.enemyTeam.members[0], env.STATUS_EFFECTS.stun.slug)'
        with its flesh punctured, it is only a matter of time before it breaks down
            SHOWIF::'EXEC::hasStatus(env.rpg.enemyTeam.members[0], env.STATUS_EFFECTS.puncture.slug)'
        with my rapid approach, its attention is drawn from gakvu
            SHOWIF::'EXEC::hasStatus(env.rpg.actors.akizet, env.STATUS_EFFECTS.focused.slug)'

        and so, distraction successful, my inner eye turns to the others
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
`)
env.localization.page['embassy'].dialogues["d3_tutorial_tozik"] = generateDialogueObject(`
start
    sourceless

____SHOWIF::'EXEC::hasStatus(env.rpg.enemyTeam.members[0], env.STATUS_EFFECTS.destabilized.slug)'
        its flesh shimmers and ripples bizarrely--what is that??
        was that gakvu's doing? she did not even touch it...
        it does at least look like it may receive our strikes easier, but...
____SHOWIF::['EXEC::!hasStatus(env.rpg.enemyTeam.members[0], env.STATUS_EFFECTS.destabilized.slug)', 'PAGE!!earlygak']
        the golem recoils as if struck, a limb shimmering with strain, yet...
        was that gakvu's doing? she did not even touch it!
____END
        no matter - a question that must wait 
        i look to tozik next,
            EXEC::change("PAGE!!toztut", true)
        but an impulse from him makes clear i need not say anything
    
    tozik
        should we be struck at any point,
        i have some tools for emergency repairs
    
    RESPONSES::tozik
        attack<+>END
            FAKEEND::proceed
`)
env.localization.page['embassy'].dialogues["d3_tutorial_akizet"] = generateDialogueObject(`
start
    sourceless
        BEFORE I PROCEED AGAIN, I LOOK AGAIN TO THE OTHERS
        THEY ARE SCARED - AS THEY SHOULD BE
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
`)
env.localization.page['embassy'].dialogues['d3_tutorial_end'] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";"toggle within system menu if desired"
            EXEC::vn.renderParty()

    sourceless
        OUR ASSISTANT GOLEM ACTED WITH SUCH...
        DESPERATION, TO KILL US
        EVERY PIECE OF IT GRADUALLY SHIFTED TO ITS MOST AGGRESSIVE POSSIBLE FORM
        BUT FINALLY, AND NOT WITHOUT STRUGGLE,
____END

    sourceless
        THE GOLEM CRASHES TO THE GROUND, 
        WHERE ITS GEOMETRIC COMPONENTS MELT INTO CORRUCYSTIC WASTE
        GAKVU, TOZIK AND I SHARE A LOOK - ONE OF TRIUMPH, BUT SHOCK
            EXEC::env.embassy.vn({bg: true, gakvu: 'fullview', tozik: 'fullview'})
        THEIR CLAWS AND RECEPTORS TREMBLE LIKE A FIRST-WATCH CAVERNGUARD'S
    
    akizet
        if this is happening everywhere...
        ...
        listen
        stay close to me, and keep the timestopper connectors on
        we should use it as long as we can
        but we need to get out of here
        let us see if movefriend is still operational
    
    sourceless
        THE OTHERS SIMPLY DIP THEIR RECEPTORS IN AFFIRMATION AND STAY CLOSE
        AN UNEASY TENSION SITS BETWEEN US IN THE TIMESTOPPER'S CONNECTION
        WHICH, IS A LITTLE STRANGE... IT IS AN APPROPRIATE TIME FOR FEAR, BUT,
        ARE THEY AFRAID OF ME?

    sys
        NOTICE::'gameplay may be toggled in the SYS menu'

    sourceless
        JUST AS WE SET OUT TO LEAVE,
        THE GOLEM'S CHASSIS FALLS APART, AND OUT SPILL SOME COMMON REPAIR CYSTS

    sys
        ITEM_RECEIVED::"<span definition="INHERITED CONTEXT::${env.ITEM_LIST['eq_restorative'].description}">restorative satchel</span>"
            EXEC::env.embassy.conditionalItem('eq_restorative', 1, 'tutrest');change("PAGE!!inventoryTutorial", true)
        EXECUTING::"structure direction";"items"::

    plainsys
        items are often granted through success
        each carries permanent unique effect; may grant actions or passive statuses
        restorative satchel effect::
            AUTOADVANCE::
    
    definitionget
        TEXEC::definitionRender({getAttribute: () => "STATUS++item_restorative"}, {returnHTML: true})

    plainsys
        items are not consumed; uses restored each encounter
        equip items according to preferred composition
        utilize PARTY MENU; open with impulse; Z

    sys
        ::END
            AUTOADVANCE::

    sourceless
        NOT OUT OF THE ORDINARY FOR AN ASSISTANT GOLEM
        BUT A SUSPICIOUS FORTUNE NONETHELESS
        VELZIE ONLY OFFERS A GIFT IN ONE CLAW WHEN THE OTHER IS POISED TO STRIKE

    RESPONSES::akizet
        keep moving<+>END
            EXEC::revertBgm();env.embassy.vn({bg: false, gakvu: '', tozik: ''})

    RESPONSES::sys
        open party menu<+>END
            EXEC::revertBgm();env.embassy.vn({bg: false, gakvu: '', tozik: ''});cutscene(true);env.partyPending = true

SKIP::env.embassy.conditionalItem('eq_restorative', 1, 'tutrest');vn.done();revertBgm()
END::env.partyPending == true ? (cutscene(false), togglePartyMenu(), env.partyPending = false) : false
`)

env.localization.page['embassy'].dialogues["d3_connector"] = generateDialogueObject(`
start

____SHOWIF::['PAGE!!connectors', false]
    sourceless
        IT MAY BE HANDY TO HAVE ANOTHER CONNECTOR
        SO I GO TO PULL ONE OF THE CONNECTED ONES FREE...
        ONLY FOR IT TO MEET MY CLAW WITH A DREADFUL SOFTNESS
        IT IS SLUDGED - THEY ALL ARE

    akizet
        what...
        they are dead??
        but the timestopper is fine!!!

    tozik
        hmmm...
        most smaller devices seem to have been broken by that signal
        these are entirely self-contained when inactive, so...
        whatever allowed the timestopper to stay intact was not afforded here
        unfortunate as it is
        we should protect the ones we have dearly
____SHOWIF::'PAGE!!connectors'
    sourceless
        IT IS NO USE - THEY ARE ALL GONE
            SHOWIF::'PAGE!!connectors'
____END
    
    RESPONSES::akizet
        this is bad<+>END
            EXEC::change("PAGE!!connectors", true)
            FAKEEND::(proceed)
`)

env.localization.page['embassy'].dialogues["movefriend_disabled"] = generateDialogueObject(`
start
    sourceless
        SOMETHING IS WRONG WITH THIS MOVEFRIEND
            EXEC::specialCam("movefriend_examine");pauseSwapCam(true)
    
    timestopper
        IS IT DEAD?
        œúX†A
        WHAT ARE OUR OTHER OPTIONS?
    
    tozik
        wait, let me see...
            EXEC::env.embassy.vn({tozik: 'defocus'});
    
    sourceless
        TOZIK KNEELS NEAR ITS FACE, EXAMINING THE PORTIONS OF IT THAT EXTEND OUT OF THE CURVED WALL
____SHOWIF::'PAGE!!earlytoz'
        HE LEANS ABOUT, PRODDING AT ITS EXTERNAL CYSTIC GLASS USING THE SAME TOOL HE ATTACKED WITH
        I DID NOT GET A GOOD LOOK BEFORE, BUT I SEE CLEARLY NOW
        OUT OF ONE OF HIS CLAWS HAS EXTENDED A CORRUSKIVI, ANCHORING TO A FINGER
____SHOWIF::['PAGE!!earlytoz', false]
        HE LEANS ABOUT, PRODDING AT ITS EXTERNAL CYSTIC GLASS, 
        USING SOME SORT OF SHARPENED IMPLEMENT...
        WHAT IS THAT? I HAVE NEVER SEEN HIM EXPOSE THAT IMPLANT BEFORE
        A CORRUSKIVI! THAT IS THE NAME! IT ANCHORS TO A FINGER
____END
        I DO RECALL SOME VAGUE REFERENCES TO HIS PAST WORK,
        BUT IT IS SURPRISING TO SEE HIM STILL CARRY IT
        
    tozik
        from what i can see, just the regulatory organs are sludged
        so it is dying, but not dead
            EXEC::env.embassy.vn({bg: true, tozik: 'fullview'})
        i can fix it...
        no, i <em>could</em> fix it, if we had a way to get some materials
        but nothing in our chamber is usable,
        and this is the only path availed to us
        we are trapped
    
    akizet
        what...
        we cannot wait!
    
    tozik
        obviously
    
    sourceless
        TOZIK'S RECEPTORS TWIST SLIGHTLY, AND HE REMAINS SILENT... NO IDEAS, I SUPPOSE
        GAKVU IS STRANGELY QUIET, LEANING AGAINST THE WALL NEAR OUR PATH TO RESEARCH
    
    akizet
        well...
        what about recreation? is that not just a few θtendrils lower-away? 
    
    tozik
        do you intend to claw through the flesh of the walls? swim through the spireblood?
        the density here is almost at natural spire levels
        no amount of surface experience will let you break through a single θtendril,
        let alone a 'few'
        be reasonable
        ...
        sorry

    sourceless
        TOZIK STILL FACES AWAY, THOUGH HIS STANCE AND HIDDEN RECEPTORS SAY ALL
        I UNDERSTAND HIS FRUSTRATION, BUT... WHAT ELSE CAN WE DO?
        ...
        THERE IS A MOMENT OF NOTHING AS WE THINK, LIKE A CLOUD PASSING UNDERNEATH THE EYE
        GAKVU PUSHES HERSELF OFF THE WALL, FEELING AT THE EDGES OF THE RELOCATOR
            EXEC::env.embassy.vn({gakvu: 'defocus'});
        
    gakvu
        ...hm
        listen
        if you two agree never to tell anyone about this
        i can make us a path to the nearby chambers

    sourceless
        I STARE, BAFFLED. TOZIK TURNS
    
    gakvu
        our favorite recreation is pretty close
            EXEC::env.embassy.vn({gakvu: 'fullview'});
        and that one corner was under regeneration,
        so those containers that were nearby probably have sfer
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
        THERE IS A PULSE OF STRANGE THOUGHT, THE MOVEFRIEND'S CAVITY LURCHING TO A SIDE
        AND IT IS RESHAPED - A PATH IS FORMING, SLOWLY, AS IF IT WERE FORMED BY OUR CARRIER
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
        A GRIM TIME, BUT... HER MANEUVER DID WORK
        I SENSE TOZIK'S FRUSTRATION - HE ALSO WOULD REALLY LIKE TO KNOW
        OF COURSE, GAKVU IS NOT OBLIVIOUS,
        DROPPING HER CLAWS ALONG WITH HER VEL'S MASK

    gakvu
        forgive me. vel instinct
        my mindcore follows a mobile groundsmindry pattern
    
    tozik
        that is illegal
            EXEC::env.embassy.vn({tozik: 'fullview'});
    
    gakvu
        oh yes it is
        velzie's wrath, right?
        do not talk about this again, or i am dead. seriously
    
    akizet
        wait - can you make a path further? 
        to the exterior, or to the hangar?
    
    gakvu
        not with the movefriend lodged where it is
        i can manipulate its limbs to form some paths, but...
        it has a very complex system for traversing the spireblood and corroyi
        trying to orient myself with it would surely burn through my reserves
        we are better off waiting for rescue than trying something like that
        let us see what we can find around here, first
    
    sourceless
        SHE SPEAKS WITH SUCH DEEP FAMILIARITY...
        HOW COULD SHE HAVE HAD THIS ABILITY FOR SO LONG? AND FROM WHERE???
        NEVER ONCE HAS EVEN A HINT OF IT SURFACED
        FURTHER THOUGHT DELIVERS A SPIKE OF ANXIETY THROUGH MY CORE
        IS SHE WHAT I WAS WARNED ABOUT?
        I MUST TAKE THIS AT FACE VALUE FOR NOW
        WE HAVE FAR MORE PRESSING MATTERS
        FOR THE PATH TO RECREATION IS OPEN,
        AND WE NEED TO FIND ENOUGH MATERIALS TO REPAIR THIS MOVEFRIEND
    
    tozik
        agreed

    RESPONSES::akizet
        continue<+>END
            EXEC::env.embassy.vn({gakvu: '', tozik: '', bg: false});specialCam(false);pauseSwapCam(false)

SKIP::change("PAGE!!recreation_unlocked", true);step();vn.done();specialCam(false);pauseSwapCam(false)
`)


env.localization.page['embassy'].dialogues["d3_rec_enter"] = generateDialogueObject(` 
start
    sourceless
        in our entrance, i am struck by the chaos
            EXEC::change("PAGE!!recenter", true)
        fixtures are overturned, broken apart, but settled
        like an invasion came and left in our brief unconsciousness
        and a few...
        a few qou bodies...
        are strewn about the wreckage
        shared horror rings through our connection
        but larval mortality rests far in the past
    
    akizet
        it is likely that only their bodies have collapsed
        we need to see if the mindcores are recoverable
    
    sourceless
        the container displacement is particularly unusual, some showing signs of impact
        and--is that the barfriend? it seems intact...
        gakvu and tozik both slink behind me
        i can feel that gakvu's attitude has shifted in the face of final death
        and tozik coldly examines the scene, particularly the containers
    
    tozik
        much of this was brought in service of the renovation
        so sfer will be within these, possibly enough for us to work with...
        along with some other tools that may prove helpful
    
    sourceless
        our goals here are clear enough, but...
        they do not move from my side
        the path we formed did not intersect with another, so,
        whatever attacked these qou,
        is still in the chamber...
        we should exercise caution

    RESPONSES::akizet
        investigate<+>END

SKIP::
`)
env.localization.page['embassy'].dialogues["d3_rec_investigate"] = generateDialogueObject(` 
start
    sourceless
        tozik kneels, corruskivi drawn
            EXEC::change("PAGE!!recreation", "dangerous");pauseSwapCam(true)
        and, just as he places its edge against the melting flesh...
        movement--behind, before, all around
            EXEC::refreshStage()
        as if we had disturbed the antennae of a sleeping beast
        all containers with the capacity to move writhe towards us,
        melting and stretching into violent shapes

    gakvu
        akizet?
    
    sourceless
        i flex the nerve of the timestopper
        just as the golem was drawn against us
        so too are these simple furnishings...
            EXEC::setCam({rotation: 145})
        adrenaline-like impulses resonate through our connection

    akizet
        stand with me
        if we could incapacitate our assistant golem,
        then these will be nothing before us

    timestopper
        no look listen

    sourceless
        realization starts from gakvu, and flows through the rest of us
        she was not calling my attention to the approach, but instead,
        to the spare listener in the corner
            EXEC::setCam({x: 3, y: 8, rotation: 140})
        its mass undulates strangely, visualization pulsing nearly out of its socket
        and even in this slowed time, senseless thought resonates from it,
        unending quiet nonsense whispered past our minds

    timestopper
        that started just now
        surely no coincidence
        no time to study - they draw closer
        prepare yourselves

    sourceless
        we have but a θblink to organize
    
    sys
        EXECUTING::"structure direction";"scenario"::
            EXEC::setCam({rotation: 180, offsetCamera: "rotateX(-25deg) translateY(-100%)"})

    plainsys
        hostile entities engaged by entering marked tiles
        encounters may occasionally be optional
        not currently applicable

    sys
        ::END

____SHOWIF::'EXEC::page.party.some((member)=>member.equipment.filter(i=>i).length)'
____END


    RESPONSES::akizet
        fight!!<+>END
            EXEC::pauseSwapCam(false);setCam();playerMoveTo(env.stage.creatureLoc.x, env.stage.creatureLoc.y, "up")
        
SKIP::change("PAGE!!recreation", "dangerous");refreshStage();toggleBgm(env.embassy.music_unsafe);pauseSwapCam(false);setCam();playerMoveTo(env.stage.creatureLoc.x, env.stage.creatureLoc.y, "up")
`)
env.localization.page['embassy'].dialogues["d3_rec_clear"] = generateDialogueObject(` 
start
____SHOWIF::["PAGE!!listenerEchoCount", "all"]
    sourceless
        the manipulated listener and containers cave under our strikes
            EXEC::change("PAGE!!recreation", "cleared");refreshStage()
        contents and record cysts scattered out into pools of sludge

____SHOWIF::["PAGE!!listenerEchoCount", "some"]
    sourceless
        we still stand ready for the remaining containers on approach, but...
        the altered listener surely somehow directed them,
        for their crawling towards us grows clumsy and sluggish, barely a threat
        naturally, we do not hesitate - they are quelled quickly
            EXEC::flash(true);change("PAGE!!recreation", "cleared")
            WAIT::2000
            THEN::play('stab', 0.5);refreshStage()
____END

    sourceless
        and the chamber grows quiet
        tozik kneels by a container, gakvu near another,
        and they rifle through the sludgy remains
            EXEC::changeBgm(env.embassy.music_collapse, {rate: 1})
        but i am unwilling to let my guard down
    
    akizet
        anything of use?

    sourceless
        between them are a few new tools--kavrukas, sensory cysts...
        but only three sfer cubes, each no larger than a kalstik
            EXEC::env.embassy.advanceSfer(3, "rec_clear")
        a terribly disappointing harvest
        gakvu turns over some of the freed tools in her claws
    
    sys
        ITEM_RECEIVED::"<span definition="INHERITED CONTEXT::${env.ITEM_LIST['eq_kavruka'].description}">kavruka satchel</span>"
            EXEC::env.embassy.conditionalItem('eq_kavruka', 1, 'reckav')
            AUTOADVANCE::
    
    definitionget
        TEXEC::definitionRender({getAttribute: () => "STATUS++item_kavruka"}, {returnHTML: true})

    sys
        ITEM_RECEIVED::"<span definition="INHERITED CONTEXT::${env.ITEM_LIST['eq_aima_cyst'].description}">aima cyst</span>"
            EXEC::env.embassy.conditionalItem('eq_aima_cyst', 1, 'reckai')
            AUTOADVANCE::
    
    definitionget
        TEXEC::definitionRender({getAttribute: () => "STATUS++item_aima"}, {returnHTML: true})

    gakvu
        these are not exactly weapons, but...
        i can imagine how we might use them

    tozik
        not enough sfer to fix movefriend
        most of the heavy containers held miscellaneous archives...

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
        these ones are still alive
        their mindcores, anyway

    tozik
        how...
        ah. groundsmindry, right
    
    gakvu
        connection may not be possible,
        but any corrucystic mind is easy enough to sense

    RESPONSES::akizet
        get them out<+>END
            EXEC::change("PAGE!!queue_person_enable", true)

    RESPONSES::sys
        open party menu<+>END
            EXEC::change("PAGE!!queue_person_enable", true);cutscene(true);env.partyPending = true

SKIP::change("PAGE!!recreation", "cleared");refreshStage();change("PAGE!!queue_person_enable", true);changeBgm(env.embassy.music_collapse, {rate: 1, length: 5});env.embassy.conditionalItem('eq_kavruka', 1, 'reckav');env.embassy.conditionalItem('eq_aima_cyst', 1, 'reckai')
END::env.partyPending == true ? (cutscene(false), togglePartyMenu(), env.partyPending = false) : false
`)

env.localization.page['embassy'].dialogues["d3_rec_body1"] = generateDialogueObject(` 
start
    sourceless
        I REACH INTO THE CHEST CAVITY OF THE QOU,
            EXEC::specialCam('deadqou1');pauseSwapCam(true)
        AND EXCAVATE HANDFULS OF SLUDGED INTERNALS
        SUDDENLY, A HAIR-THIN SPINE STABS OUT FROM THE CENTER OF THEIR BODY
        THEN ANOTHER--MINDCORE TENDRILS, DEFENSIVELY PRODDING AT ME
        THEY MUST THINK I AM ONE OF THE CONTAINERS

    akizet
        relax, it is safe
        i am helping you out of there
    
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
        and after it hit, our golem tried to kill us...

    akizet
        with very specific intent, too
        it aimed for her mindcore
        you are lucky to have survived so long!
        what is your name?
    
    itzil
        wow!
        they did bash against me for a while, but...
        they must have thought i was dead when i stopped moving!
        it seems velzie has a role for me yet!
        i am itzil!!
        i was supposed to be in golem maintenance,
        but, i had my dear kivii covering, for...
        ...
        hey, was it only this area that was attacked?
        have you been to the golem maintenance θsegment?
    
    akizet
        we do not know - the movefriend is disabled,
        and communications are unusable
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
`)
env.localization.page['embassy'].dialogues["d3_rec_body2"] = generateDialogueObject(` 
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
        sorry, i thought you were one of the containers
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
`)

env.localization.page['embassy'].dialogues["d3_barfriend"] = generateDialogueObject(`
early
    sourceless
        I CAUTIOUSLY APPROACH THE BARFRIEND, GAKVU AND TOZIK BEHIND
            EXEC::env.embassy.vn({gakvu: "defocus", tozik: "defocus"});pauseSwapCam(true)
        IT HAS TAKEN SHELTER BEHIND THE DAMAGED SIMULACRA DISPENSARY

    akizet
        barfriend...?

    barfriend
        hello akizetesche
        i cannot presently serve you due to critical dispensary damage!
        sorry!! i recommend you seek shelter instead!

    akizet
        no, that is...
        that is fine, but what happened here?
        to these qou?

    barfriend
        i am not entirely certain!
        there was a painful noise! i felt my existence being weighed upon!!
        and then there was an unexpected lapse in my consciousness!
        when this lapse concluded, 
        the qou that i was serving were being torn apart by the containers!

    akizet
        what?!
    
    sourceless
        we draw together defensively, glancing over the displaced containers
        they share a common mobile form, capable of very basic movement instruction...
        but little else. how could they be used to such violent ends?

    tozik
        did they attack you?

    barfriend
        no! they did not react to my presence in any fashion!
        after, they became inactive!

    sourceless
        gakvu glares at the barfriend intensely

    gakvu
        its echo is completely intact...
        barfriend, the 'painful noise',
        did it feel like a transmission of thought?
        we felt something very similar

    barfriend
        yes!
        i could not discern its exact meaning!
        but it was very overwhelming!!

    sourceless
        tozik's gaze draws over the containers, then the golem, and back...
        receptors twisted in troubled thought
        he looks at me, and with an impulse through our connection,
        it is known: further investigation can wait--we must take action
    
    akizet
        thank you, barfriend
    
    RESPONSES::akizet
        keep moving<+>END
            EXEC::change("PAGE!!barfriend", "early");env.embassy.vn({gakvu: "", tozik: "", bg: false});pauseSwapCam(false)

SKIP::vn.done();specialCam(false);pauseSwapCam(false)

revisit
    sourceless
        we approach the barfriend once more
            EXEC::env.embassy.vn({gakvu: "defocus", tozik: "defocus"});pauseSwapCam(true)
        it still shelters behind the damaged display
        gakvu focuses on the golem, through its flesh

    gakvu
        its echo is the same as before... no threat

    akizet
        barfriend, did you feel what the listener was doing?
    
    barfriend
        yes! the same painful noise! the same weight!
        it was very unpleasant!

    akizet
        i see. do not worry!
        the source is dealt with, you are safe
    
    gakvu
        odd...
        why was it not compelled to attack us?
        surely its sharp arms would serve better in slaughter than those clumsy things

    sourceless
        TOZIK LEANS AGAINST THE BARTOP NEARBY
        STARING AT THE CONTAINERS, THEN THE QOU-BODIES...

    akizet
        what is it?

    sourceless
        A θblink PASSES BEFORE HE ACTUALLY LOOKS AT ME
        HIS ANSWER COMES WITH AN UNCERTAIN PULLBACK OF HIS RECEPTORS

    tozik
        theorizing...
            EXEC::env.embassy.vn({tozik: "fullview", bg: true});
        it is too early to say anything for certain, but,
        the containers lack any components that could hold instruction for very long
        only direct, focused control could have driven them this way...
        was that what the listener was emanating? groundsmindry instruction?

    sourceless
        HE DIRECTS ATTENTION TO GAKVU EXPECTANTLY

    gakvu
        i...
        tozik, i do not know
        it felt nothing like vekoa's instruction
        regardless, you know well that the listeners have no capacity for this
        they are little more than a shell for their sensor in the dull
        
    sourceless
        gakvu falls silent suddenly, as if there were a vein to pull further to expose some organ of truth
        but with a simple exchange of impulses, we recognize the need to press forward
        there will be time to investigate when we have escaped with our θdeaths
    
    RESPONSES::akizet
        keep moving<+>END
            EXEC::env.embassy.vn({gakvu: "", tozik: "", bg: false});pauseSwapCam(false)

SKIP::vn.done();specialCam(false);pauseSwapCam(false)


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
        barfriend, did you feel anything strange?
        a painful transmission of thought before or during the attack?

    barfriend
        IS THAT WHAT THAT WAS?
        YES! I FELT MY EXISTENCE BEING WEIGHED UPON!
        i could not discern its exact meaning!
        but IT WAS VERY UNPLEASANT!
        BUT IT WENT AWAY
    
    akizet
        well, do not worry! you are safe now

    sourceless
        TOZIK LEANS AGAINST THE BARTOP NEARBY
        STARING AT THE CONTAINERS, THEN THE QOU-BODIES...

    akizet
        what is it?

    sourceless
        A θblink PASSES BEFORE HE ACTUALLY LOOKS AT ME
        HIS ANSWER COMES WITH AN UNCERTAIN PULLBACK OF HIS RECEPTORS

    tozik
        theorizing...
            EXEC::env.embassy.vn({tozik: "fullview", bg: true});
        it is too early to say anything for certain, but,
        the containers lack any components that could hold instruction for very long
        only directly focused control could have driven them this way...
        was that what the listener was emanating? groundsmindry instruction?

    sourceless
        HE DIRECTS ATTENTION TO GAKVU EXPECTANTLY

    gakvu
        i...
        tozik, i do not know
        it felt nothing like vekoa's instruction
        regardless, you know well that the listeners have no capacity for this
        they are little more than a shell for their sensor in the dull
        
    sourceless
        gakvu falls silent suddenly, as if there were a vein to pull further to expose some organ of truth
        but with a simple exchange of impulses, we recognize the need to press forward
        there will be time to investigate when we have escaped with our lives
    
    RESPONSES::akizet
        keep moving<+>END
            EXEC::env.embassy.vn({gakvu: "", tozik: "", bg: false});pauseSwapCam(false)

SKIP::vn.done();specialCam(false);pauseSwapCam(false)
`)


env.localization.page['embassy'].dialogues["d3_person_enable"] = generateDialogueObject(` 
start
    sourceless
        ONCE WE RETURN TO THE RELOCATOR, GAKVU CONTINUES TO THE OPPOSITE WALL
            EXEC::specialCam("personnel_open");pauseSwapCam(true)
        SHE HOLDS HER PALMS OUT AGAIN, AND AGAIN THE CHAMBER LURCHES
            EXEC::change("PAGE!!cpersonnel_unlocked", true);
        TENDRILS FORMING A LONG PATH TO THAT PERSONNEL θtendril NEARBY
        THE MINDCORES NEARBY ARE STARING... THEY DID NOT PROMISE LIKE WE DID
        BUT GAKVU CAN TALK TO THEM LATER!

    akizet
        which θtendril was this again?

    gakvu
        eyes closed
        could be any one

    sourceless
        KAZKI RELOCATED TO BE NEAR THE RECREATION HUB RECENTLY, RIGHT?
        SHOULD VELZIE HAVE A KIND PATH FOR US, IT COULD BE HERS...
        I KNOW SHE WOULD BE HEARTBROKEN IF HER COUSINLY GIFTS WERE LOST
        OH - THE PATH IS FULLY FORMED, NOW
            EXEC::step()

    RESPONSES::akizet
        continue!<+>END
            EXEC::specialCam(false);pauseSwapCam(false)

SKIP::change("PAGE!!cpersonnel_unlocked", true);step();vn.done();specialCam(false);pauseSwapCam(false)
`)

env.localization.page['embassy'].dialogues["d3_person_intro"] = generateDialogueObject(` 
start
    sourceless
        THE PERSONNEL θtendril IS DARK, LIT BARELY BY THE LIGHTS OF THE INCOHERENT
        AN ATTENDANT BEARS THE SAME STRANGE SIGIL AS OUR GOLEM...
        AND SOME VEILKLIGHTS CARRY THE SAME DISTORTION AS THE HOSTILE CONTAINERS
        THOUGH WE CLEARLY ENTER INTO THEIR SIGHT, THEY DO NOT MOVE,
        IN A SORT OF PASSIVE STASIS?
        PERHAPS THE GROUNDSMIND'S ATTENTION IS ELSEWHERE?
        WE PEER ABOUT CAREFULLY, QUIETLY, UNDER THEIR NOTICE FOR NOW
        A SHARED VOICE RINGS THROUGH THE TIMESTOPPER
    
    timestopper
        LOOK! THERE!
        THERE ARE MORE QOU-BODIES
        CAN WE HELP?
        CAREFUL
        I STILL SENSE SOMETHING CONTROLLING THESE CONSTRUCTS
        I AM CERTAIN THEY WILL STRIKE AS SOON AS WE DRAW NEAR
        TREAD CAREFULLY
    
    RESPONSES::akizet
        stay behind me<+>END

SKIP::
`)
env.localization.page['embassy'].dialogues["d3_person_clear"] = generateDialogueObject(`
start
    sourceless
        THE θtendril STANDS SILENT
            EXEC::pauseSwapCam(true)
____SHOWIF::'gameplay_off'
        TO SEE CONTAINERS WIELDED AGAINST US WAS UNUSUAL,
        BUT THIS GOLEM SEEMED TO BE ALTERED BY THE VEILKLIGHTS
        THEIR GLOW CARRIED THE SLIGHTEST TINGE OF THE DULL...
        SHIFTING ITS FLESH, SHARPENING IT, RESHAPING IT
        BUT IT FELL BEFORE US REGARDLESS
____END
        IMMEDIATELY, GAKVU GOES TO CHECK A NEARBY QOU
            EXEC::env.embassy.vn({bg: true, tozik: "defocus", gakvu: "defocus"});pauseSwapCam(true)
    
    gakvu
        these ones...
        the attendant directly struck the mindcores
        there is nothing we can do for them
    
    sourceless
        SHE IS FROZEN THERE, BY THEIR CORPSE
        HER SORROW SPREADS INTO OUR CONNECTORS
        WE HAVE LITTLE TO OFFSET IT 
        BUT I AM NO STRANGER TO ITS BITE

____SHOWIF::"pau|miltza"
    sourceless
        MILTZA KEEPS HER DISTANCE, TRYING NOT TO STARE
        I CAN CLEARLY IMAGINE THE TERROR SHE IS FEELING BY HER AVOIDANCE
        HER RECEPTORS BALL WITH DISCOMFORT, 
        SURELY AT THE COLDNESS THAT WE TREAT HER FALLEN NEIGHBORS WITH
        BUT THERE IS LITTLE TIME FOR MOURNING
____END
        TOZIK PREOCCUPIES HIMSELF WITH LOOKING THROUGH DEBRIS
        THE STILL-GLOWING CORE OF A VEILKLIGHT CATCHES HIS ATTENTION

    sys
        ITEM_RECEIVED::"<span definition="INHERITED CONTEXT::${env.ITEM_LIST['eq_fusedlight'].description}">fused light</span>"
            EXEC::env.embassy.conditionalItem('eq_fusedlight', 1, 'pers')
            AUTOADVANCE::
    
    definitionget
        TEXEC::definitionRender({getAttribute: () => "STATUS++item_fusedlight"}, {returnHTML: true})
    
    gakvu
        ...
        this does not make any sense...
        they really are killing <em>everyone</em>...

    sourceless
        WHAT I EXPECTED TO BE HORROR IN HER VOICE, 
        IS INSTEAD SOMETHING LIKE MORBID CURIOSITY
        MILTZA'S STANCE GROWS TENSE, BUT SHE SAYS NOTHING
            SHOWIF::"pau|miltza"
        TOZIK CEASES HIS RUMMAGING TO WATCH GAKVU FOR A θblink
        THERE IS SOME FAMILIARITY IN HER GAZE UPON THAT BODY--A FRIEND?
        NO, A FALLEN FRIEND WOULD COMMAND MOURNING, NOT... THIS
        I CAN TELL HE WANTS TO PRY, BUT HE DOES NOT
        AND I WOULD RATHER NOT DO THAT NOW, MYSELF...
    
    tozik
        well,
            EXEC::env.embassy.vn({bg: true, tozik: "fullview"})

    sourceless
        TOZIK PULLS A SFER CUBE FROM THE REMAINS OF A CONTAINER
            EXEC::env.embassy.advanceSfer(1, "person_clear")
    
____SHOWIF::['PAGE!!movefixed', false]
    tozik
        we still need some more sfer
            SHOWIF::['PAGE!!miltzameet', false]
        we should check the rooms that are not broken
            SHOWIF::['PAGE!!miltzameet', false]

        we have what we need to fix movefriend
            SHOWIF::['PAGE!!miltzameet', true]
        we should head back to the relocator
            SHOWIF::['PAGE!!miltzameet', true]
____SHOWIF::['PAGE!!movefixed', true]
    tozik
        nothing more to be found here
____END

    RESPONSES::akizet
        continue<+>END
            EXEC::env.embassy.vn({bg: false, tozik: "", gakvu: ""});pauseSwapCam(false)

    RESPONSES::sys
        open party menu<+>END
            EXEC::env.embassy.vn({bg: false, tozik: "", gakvu: ""});pauseSwapCam(false);cutscene(true);env.partyPending = true;

SKIP::env.embassy.advanceSfer(1, "person_clear");vn.done();pauseSwapCam(false);env.embassy.conditionalItem('eq_fusedlight', 1, 'pers')
END::env.partyPending == true ? (cutscene(false), togglePartyMenu(), env.partyPending = false) : false
`)

env.localization.page['embassy'].dialogues["d3r2"] = generateDialogueObject(`
start
    sourceless
        THIS IS...
            EXEC::pauseSwapCam(true)

    gakvu
        kazki's room!!
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
`)
env.localization.page['embassy'].dialogues["d3r2_chest"] = generateDialogueObject(`
start
    sourceless
        I KNEEL BY THE STORAGE PORTION OF THE DISPLAY
            EXEC::pauseSwapCam(true)
        WITH A WAVE OF MY HAND UNDERNEATH ITS MAGNETIC CONNECTOR CYST,
        THE GROUND-CONTAINER LIQUEFIES ITS COVER
        THERE IS FALSE VEILK-SKIN CLOTHING... (FANCY!)
        THERE ARE SOME UPKEEP TOOLS, MOST MELTING...
        SOME OF THESE ARE TOO POORLY MARKED TO DISCERN,
        BUT SOME CYSTS--WHICH I ASSUME MUST BE MEMORY CYSTS--REMAIN INTACT!
        I AM NOT SURE WHAT SHE WOULD WANT US TO BRING, SO,
        I COLLECT A FEW OF THOSE
            EXEC::change("d3_kazkichest", true)
        WHILE I STAND, GAKVU PRODS AT THE COVER THAT REFORMS
    
    gakvu
        strange that this still works
            EXEC::env.embassy.vn({bg: true, gakvu: "fullview"})
        stranger still was the variety of intact or sludged cores in there...
        it feels like what is breaking or attacking is completely random, right?
    
    tozik
        this has been troubling me too
            EXEC::env.embassy.vn({tozik: "fullview"})
        for example, why are the doors not 'biting' us?
        or the timestopper, why is it cooperating?
        i have an idea...
        but i need to see more

    RESPONSES::akizet
        keep moving<+>END
            EXEC::change("PAGE!!kazkichest", true);vn.done();pauseSwapCam(false)

SKIP::change("d3_kazkichest", true);change("PAGE!!kazkichest", true);vn.done();pauseSwapCam(false)
`)
env.localization.page['embassy'].dialogues["d3r2_guns"] = generateDialogueObject(`
start
    sourceless
        WE PRY SOME OF THE WEAPONS FROM THE ADHESIVE SKIN OF THE DISPLAY
        BUT I DO NOT EVEN KNOW WHERE TO START
            EXEC::change("PAGE!!checkedguns", true);specialCam("kazkiguns");pauseSwapCam(true)
        MILTZA EXPERIMENTALLY TURNS OVER A SMALL WEAPON THAT HER CLAWS NEARLY ECLIPSE
            SHOWIF::"pau|miltza"
        TOZIK NONCOMITTALLY TAKES ONE OF THE LARGE ONES BY ITS LONG CYLINDRICAL END
            EXEC::vnp({tozik: "show shiftleft"})
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

____SHOWIF::"pau|miltza"
        AND AS WE WATCH HIM, A METALLIC CLATTER TEARS OUR ATTENTION TO MILTZA
            EXEC::vnp({miltza: "show"})
        A CIRCULAR COMPONENT OF THE SMALL WEAPON SHE HELD IS DISLOCATED,
        RELEASING SIX LITTLE DEAD METAL CYLINDERS THAT SCATTER ABOUT 
        CERTAINLY SOME SORT OF FUEL

    miltza
        ah!!
        sorry...

    sourceless
        IN SHORT TIME, THEY ARE COLLECTED AGAIN
        REPLACED AND SLID BACK INTO THEIR LITTLE HOLES
        DELICATELY, MILTZA RETURNS IT TO THE EXAMINATION SLAB
____END

    RESPONSES::akizet
        keep looking<+>END
            EXEC::specialCam(false);vn.done();pauseSwapCam(false)
`)

env.localization.page['embassy'].dialogues["d3r1"] = generateDialogueObject(`
start
    sourceless
        AS WE STEP INTO THE ROOM, AN UNFAMILIAR TIR QOU LEAPS AT US
            EXEC::pauseSwapCam(true);env.embassy.vn({miltza: "display far"})

    sourceless
        SHE HOLDS A DISABLER - AN EXTREMELY POTENT CORRUCYSTIC DECONSTRUCTOR
            EXEC::env.embassy.vn({bg: true, tozik: "defocus", gakvu: "defocus", miltza: "far show"})
        ITS SPIKES PROTRUDE OUTWARDS, CLEARLY ON THE VERGE OF TRIGGERING,
        BUT OUR FAMILIAR APPEARANCE CREATES ENOUGH HESITATION FOR THOUGHT
        
    miltza
        stay back!!
        wait
        are you...?

    akizet
        relax
        we are not here to hurt you
        but we are looking for materials to repair the movefriend
        do you have anything?
    
    sourceless
        HER RECEPTORS, BALLED TIGHTLY, GRADUALLY UNFOLD
        INTENSE TERROR FADES INTO REALIZATION AND HOPE
        HER GAZE BREAKS AWAY IN THOUGHT ONLY AFTER A θblink

    miltza
        oh...
        oh!!
        yes! here!
    
    sourceless
        SHE DIGS OUT SOME SFER CUBES FROM THE REMAINS OF NEARBY CONTAINERS, SURELY DESTROYED BY HER HAND
            EXEC::env.embassy.advanceSfer(2, "miltza")
        NEARLY TUMBLING INTO THE MESS WITH HER FRANTIC MOVEMENTS
        AND I SHOULD EXPECT THIS LEVEL OF PANIC, NATURALLY
        BUT THE STRENGTH OF HER REACTION IS SO FAMILIAR...
        A DISTANT VISION OF THE PAST, OF CAVEBOUND REACTIONS TO INFESTATION
    
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
        i do not know... they were murmurs alone, and i could not get anything through to them
        but, you seem like good defenders - funny that you are not even kiv!
        here, take my disabler!
        you can probably use it better than me, anyway!

    sys
        ITEM_RECEIVED::"<span definition="INHERITED CONTEXT::${env.ITEM_LIST['eq_disabler'].description}">disabler</span>"
            EXEC::env.embassy.conditionalItem('eq_disabler', 1, 'miltzabler')
            AUTOADVANCE::
    
    definitionget
        TEXEC::definitionRender({getAttribute: () => "STATUS++item_disabler"}, {returnHTML: true})

    akizet
        oh--thank you!

    sourceless
        SHE QUICKLY TURNS TO SEARCH THROUGH HER OVERTURNED FURNITURE
        GATHERING LITTLE CYSTS AND TRINKETS INTO HER FORM

    akizet
        miltza, we still are not sure of the extent of this attack...
        we have gathered some other survivors, but really--
        the damage we have witnessed so far is unconscionable
        you could stay and shelter, but i really do recommend that you...

    sourceless
        URGENTLY, HER GAZE FIXES BACK UPON ME, WAVING HER THIRD ARM WITH INTENSE DISMISSAL
    
    miltza
        no no no no, i understand--i will join you!!
        we have to get out of here
        i am just going to gather some things, then go shelter in the lift!

    sourceless
        SHE RETURNS TO HER SEARCH
            EXEC::env.embassy.vn({miltza: "display far"})

    akizet
        be safe, my friend. we will see you again soon

    RESPONSES::akizet
        continue<+>END
            EXEC::env.embassy.vn({bg: false, tozik: "", gakvu: "", miltza: ""});pauseSwapCam(false)

    RESPONSES::sys
        open party menu<+>END
            EXEC::env.embassy.vn({bg: false, tozik: "", gakvu: "", miltza: ""});pauseSwapCam(false);cutscene(true);env.partyPending = true;

SKIP::env.embassy.advanceSfer(2, "miltza");env.embassy.conditionalItem('eq_disabler', 1, 'miltzabler');vn.done();pauseSwapCam(false)
END::env.partyPending == true ? (cutscene(false), togglePartyMenu(), env.partyPending = false) : false
`)


env.localization.page['embassy'].dialogues["d3_relocator_return"] = generateDialogueObject(`
start
    sourceless
        WHEN WE RETURN, TOZIK IMMEDIATELY DRAWS NEAR MOVEFRIEND
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

____SHOWIF::["PAGE!!kazkiroom", false]
    miltza
        wait--! i saw other unlocked gates when i ran in here,
        behind the, assailants...
        there could still be other survivors!
    
    tozik
        between you and the three bodies,
        that was likely most of the qou within that θtendril
        but...

    sourceless
        some worry spikes through our connection,
        impulses of deference pointing to my mind

    tozik
        i will not deny the possibility
        akizet?
    
    akizet
        we should help everyone we can...
    
    sourceless
        i draw my gaze over the ekiviks
        both resolute, but clearly shaken by all that has transpired
        these attacks seem to be so targeted, 
        that one mistake, one little twist of the path by velzie...
        i could lose them both

    akizet
        ...but i do not want to risk your lives unnecessarily
        that one attendant killed three qou
        every single fight we start is another handing off of our fates to velzie
        are you willing to push through with me?

    tozik
        yes
    
    gakvu
        akizet...
        the timestopper is not the only advantage we hold

    sourceless
        her coiled receptors loosen, playful confidence briefly returning in her tone
        there is such a swelling of trust in my judgement through our connection

    tozik
        make the decision quickly
        if our θsegment is in this state, 
        the whole structure of the embassy must be falling apart

    akizet
        let me think, then
____END

    sys
        EXECUTING::"structure direction";"imminent stream finale"::
            EXEC::change('PAGE!!movefriendqueued', true);change("PAGE!!ep3queuecheck", true)

    plainsys
        current memory stream near conclusion
        abnormal structure detected; iteration saving advised
        consider activating LOW INTENSITY if hardware is limited; system menu
        return to entity; DISRUPTED MOVEFRIEND; when prepared to proceed

    sys
        ::END
    
    RESPONSES::akizet
        prepare<+>END
            EXEC::env.embassy.vn({tozik: ''});specialCam(false);pauseSwapCam(false)

SKIP::vn.done();specialCam(false);pauseSwapCam(false);change('PAGE!!movefriendqueued', true);change("PAGE!!ep3queuecheck", true)
`)
env.localization.page['embassy'].dialogues["d3_relocator_later"] = generateDialogueObject(`
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
`)
env.localization.page['embassy'].dialogues["d3_relocator_repair"] = generateDialogueObject(`
start
    akizet
        let us begin!
            EXEC::pauseSwapCam(true);vn.done()
        i would rather not seal these paths, just in case
        gakvu, you watch the path to personnel,
        i will watch the path to recreation
    
    tozik
        all right, stand by
            EXEC::vnp({tozik: "show", bg: true})
    
    sourceless
        TOZIK KNEELS NEAR MOVEFRIEND'S FACE, PREPARING HIS CORRUSKIVI
        AN INCISION IS MADE IN THE CONSTRUCT'S GLASS, PARTING IT LIKE A GATE
        A PROTECTIVE MEMBRANE FORMS OVER ITS INNARDS TO PREVENT CONTAMINATION
    
    sourceless
        THE CORRUSKIVI LIQUIFIES, FORMING OVER HIS CLAW FULLY
        HE SPREADS IT TO HIS OTHER ONE, TOO, BECOMING A SET OF GLOVES
        ONE HAND REACHES INTO MOVEFRIEND'S ORGANS, AND HIS OTHER FETCHES SFER TO IMPLEMENT
        I CANNOT CLEARLY SEE WHAT ELSE HE DOES, BUT I ASSUME IT IS SIMPLE REFORMATION
            EXEC::vnp({tozik: "show far", bg: true})
        SO I RETURN TO WATCHING MY PATH - GAKVU DOES THE SAME
        ...
        AFTER SOME TIME,
        TOZIK PULLS AWAY FROM MOVEFRIEND
            EXEC::vnp({tozik: "show shiftright"})
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
            EXEC::vnp({tozik: "show shiftright", bg:false});document.querySelector('#realgrid .lifter').classList.add('fixed')

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
        MUCH TO MOVE MUCH TO DO
        VERY COOL!!
        FRIENDS: PROBLEM
        I AM SUFFERING ??
    
    tozik
        peculiar
        you should be feeling the same as before
        what is wrong?
    
    sourceless
        OUR MOVEFRIEND'S FACE RIPPLES STRANGELY, EMITTING A MEANINGLESS WARBLING VOCAL TONE
        THE PATHS GAKVU HAD CARVED WITH THE MOVEFRIEND'S TENDRILS LIQUIFY, CLOSING AGAIN
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
        the components were all fine
    
    sourceless
        GAKVU BACKS AGAINST THE INNER WALL OF THE RELOCATOR
            EXEC::vnp({bg: true, gakvu: "show shiftright"})
        A SHARP WAVE OF TERROR RUNS THROUGH OUR CONNECTION
        
    gakvu
        the... 
            EXEC::ratween(env.bgm, 0.75, 10000)
        the groundsmind, she...
        it sees us

    sourceless
        THE AGGRESSOR'S SIGIL FORMS IN PLACE OF MOVEFRIEND'S FACE   
            EXEC::vfx({type: "darkflash", state: true});vn.done()
            WAIT::1000
            THEN::change("PAGE!!movefoeactive", true);changeStage('embassy_relocator')
            NOTE::should inherit darkflash classes
        I HEAR THE SOUND OF CORRU SHIFTING BEHIND THE WALLS

    aggressor
        cÅ4Ä–sT
            EXEC::content.classList.add('painprep', 'painhalf');vfx({type: "darkflash", state: false})
        ýæôr,§½ÿlfÃ
        ÄS¿De
    
    sourceless quiet
        A PRESSURE WEIGHS AGAINST OUR MINDS, OUR CORRUCYSTIC ORGANS
            EXEC::content.classList.add('painmode');play("criticalError", 0.5)
        BUT THE TIES TO OUR MINDCORES ARE TOO STRONG - THE OTHERS ARE FINE TOO
        MILTZA QUICKLY GATHERS THE EXPOSED MINDCORES INTO HER CLAWS, STAYING CLOSE
        
    sourceless
        BEFORE WE CAN QUESTION THE ENTITY, SPINES FORM ALONG THE WALLS
        SHARP TENDRILS EMERGE FROM MOVEFRIEND'S FORM IN UNEVEN PATTERNS
        IT IS CLEAR ENOUGH: IT INTENDS TO KILL US
        THERE IS NO CHOICE BUT TO FIGHT
            EXEC::content.classList.remove('painmode')

    RESPONSES::akizet
        activate timestopper<+>END
            EXEC::vn.done();specialCam(false);content.classList.remove('painprep', 'slowpain');ratween(env.bgm, 1)
            FAKEEND::prepare

SKIP::env.embassy.skips.d3_relocator_repair()
SKIPTIME::700
`)

env.localization.page['embassy'].dialogues["d3_movecmb"] = generateDialogueObject(`
start
    sys
        WARNING::'incoherence detected'

    sourceless
        with a flex of the timestopper's nerves, we are drawn into altered time again
        immediately, our minds race to find a solution

    timestopper
        do we destroy it?
        no we cannot escape without the movefriend
        harming it is out of the question
        then what?
    
    sourceless
        a θblink of strain comes through gakvu's link
        our collective attention is drawn to a particular spot
        the feeling of some shape laying behind the section of flesh,
        warping under the strain of this aggressor's mind

    gakvu
        there--behind that region of flesh, see??
        i feel it, a relay linked to the embassy's spine
        it feels the same as that listener
        so, if we can destroy it...
        maybe i can seize and reverse what has been done
        
    timestopper
        then our target is clear
    
    RESPONSES::akizet
        attack!<+>END
            FAKEEND::proceed

SKIP::
`)
env.localization.page['embassy'].dialogues["d3_moveshift"] = generateDialogueObject(`
start
    sys
        NOTICE::"utilized intra-combat checkpoint"
            SHOWIF::"PAGE!!mfcheck"

    sourceless
        the groundsmindry relay within the movefriend is crushed to sludge
        yet nothing appears to change?!
    
    timestopper
        why has it not ceased its attack?!
        must we destroy it? 
        no we cannot it is our only way around
        let me--
        
    sourceless
        gakvu draws much of the timestopper's focus for an instant
        soon after, she speaks through its connection

    gakvu
        §§š¦l&
        its body is still following the instruction
        we just need its echo working
        if i can reactivate it, i think it will go back to normal!!
        cover me

    timestopper
        is this chance enough to risk our lives?

    gakvu
        i doubt you have a better idea
        if the movefriend is destroyed, then we are doomed
        just cover me
        you will need a fighter in my place
        here--

    sourceless
        a jolt of shock runs through our connection, followed by a new silence
            EXEC::midCombatActorRemove(env.rpg.actors.gakvu)
            WAIT::600
        gakvu has removed her connector, charging for...
        miltza? who huddles with the mindcores, shielding them bodily
        suddenly, another jolt follows, with a new connection,
        AS GAKVU SHOVES THE CONNECTOR ONTO MILTZA'S RECEPTOR
            EXEC::midCombatActorAdd(env.rpg.allyTeam, "miltza", "right", {specificEquipment: page.party.find(m=>m.slug == "gakvu").equipment})
    
    miltza
        aaaahhh!!
        what is--this??
        oh... the timestopper? why did you--?
        
    akizet
        you need to help us keep movefriend away from gakvu
        do you have any weapons?
    
    miltza
        what!! no,
        no--sorry... that disabler was all i had
        but in my larval life, i was a remote coordinator
        i... could lend my eye to you?

    akizet
        that will do
        follow my instruction exactly and you will be safe
        i promise, miltza

    sourceless
        as a portion of my combat experience flows through her,
        surface-level memories of countless hunts and executions, the reflexes they formed...
        the intense hesitation i initially felt from her fades into the background
        an acknowledging impulse confirms--i may count on her

    sys
        NOTICE::"intra-combat stream checkpoint enabled"
            SHOWIF::["PAGE!!mfcheck", false]
            EXEC::change("PAGE!!mfcheck", true)

____SHOWIF::"low_intensity"
    sys
        WARNING::"hardware-sensitive memory sequence"
        NOTICE::"bypass if performance is untenable"
____END

    RESPONSES::sys
        bypass<+>CHANGE::d3_movefriend_finish
            SHOWIF::"low_intensity"
            FAKEEND::bypass sensitive sequence
            EXEC::vfx({type: "darkflash", state: true});endCombat(env.rpg.enemyTeam);env.embassy.endMovefriendBoss();change("PAGE!!mfskip", true)
    
    RESPONSES::akizet
        protect gakvu<+>END
            EXEC::env.rpg.halt = false;advanceTurn()
            FAKEEND::proceed
`)
env.localization.page['embassy'].dialogues["d3_movespecial"] = generateDialogueObject(`
start
    sourceless
        AROUND MOVEFRIEND, THE WALLS RIPPLE STRANGELY
            EXEC::env.bulletHell.paused = true
        as sure as gakvu suggests, it still follows some grim precept
        and IN ITS SPREADING INFLUENCE, SPIKES FORM OUT OF THE SHIFTING BLACK CORRU
        BEHIND US, GAKVU STRAINS TO HOLD THIS SPACE TOGETHER
        I ONLY HOPE SHE CAN STOP IT FROM SIMPLY CRUSHING US ALL

    sys
        WARNING::'abnormal thoughtform activity detected'
        EXECUTING::"structure direction";"proxy thoughtform"::

    plainsys
        entity; MOVEFRIEND; altering structure rule specifications
        utilize proxy thoughtform to avoid damaging effects
        direct proxy with primary method of navigation
        survive

    sys
        ::END

    moth
        looks like funfriend was right
            SHOWONCE::
        good luck buddy
            SHOWONCE::
    
    RESPONSES::self
        thanks<+>END
            EXEC::bh_movefriend({level: "healthy3"});env.bulletHell.paused = false
`)
env.localization.page['embassy'].dialogues["d3_movefriend_finish"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";"toggle within system menu if desired"
            EXEC::env.hoverIntervalRate = env.defaultHoverRate

    sourceless
        THROUGH OUR CAREFUL STRIKES UPON AN ORGAN HIDDEN WITHIN ITS FLESH,
        AS TO NOT JEOPARDIZE OUR SOLE METHOD OF TRANSPORTATION,
        WE DESTROY THE METHOD BY WHICH MOVEFRIEND IS EXTERNALLY MANIPULATED
        ITS GROUNDSMINDRY RELAY CRUMBLES, 
        AND WITH SOME EFFORT, GAKVU MANAGES TO REACTIVATE ITS ECHO,
        OVERRIDING THE HOSTILE INSTRUCTION
____SHOWIF::[['PAGE!!mfskip', true], ['low_intensity', true]]
    sys
        ATTENTION::"hardware-sensitive memory sequence skipped"
            EXEC::env.hoverIntervalRate = env.defaultHoverRate

    sourceless
        WITH SOME EFFORT, GAKVU MANAGES TO REACTIVATE ITS ECHO,
        OVERRIDING THE HOSTILE INSTRUCTION
            EXEC::vfx({type: "darkflash", state: false})
____END

    sourceless
        ALL AT ONCE, THE CHAOS STOPS
            EXEC::specialCam("movefriend_examine");changeBgm(page.bgm, {rate: 0.5});env.hoverIntervalRate = env.defaultHoverRate
        THE AGGRESSOR'S SIGIL FLICKERS AWAY, 
            EXEC::document.querySelector('#realgrid .lifter').classList.remove('aggressormode')
        AND MOVEFRIEND'S FACE RETURNS
            EXEC::document.querySelector('#realgrid .lifter').classList.add('fixed');change('PAGE!!movefixed', true)

    movefriend
        AAHH!!!
        OH!! WHAT IS ALL THIS?
        I AM SO SORRY
        PLEASE UNDERSTAND I WOULD NEVER TRY TO HURT YOU
    
    akizet
        gakvu--is it done?
    
    sourceless
        TOZIK TAKES THE MOVEFRIEND'S APOLOGY AS CONFIRMATION,
        KNEELING NEAR IT, SET ON CONFIRMING ITS STABILITY
    
    gakvu
        yeah...
            EXEC::env.embassy.vn({bg: true, gakvu: 'focus nocon'});

    sourceless
        GAKVU SLUMPS AGAINST THE BACK WALL ACROSS FROM MOVEFRIEND
        NOT FAR FROM HER, THE TREMBLING MINDCORES ARE HUDDLED TOGETHER
        THEY MUST HAVE STAYED IN HER PROTECTIVE RADIUS THROUGH THE ATTACK
        
    gakvu
        overpowering that control was... exhausting
        all of this should keep movefriend independent, i think

    sourceless
        THERE IS A MOMENT OF SILENCE, RELIEF
        BUT THEN A SHARP SUSPICION SPIKES THROUGH OUR SHARED CONNECTION

    miltza
        gakvu
        where did you learn to do that?
    
    sourceless
        GAKVU ONLY SNICKERS IN RESPONSE
        SHE WAVES HER RECEPTORS NEGATIVELY

    gakvu
        sorry, it is a secret!
    
    sourceless
        IF NOT FOR MILTZA'S CONNECTOR, I WOULD HAVE NO SUSPICION OF HER SUDDEN DREAD
        DIFFERENT, DISTINCT, EXPERTLY SUPPRESSED FROM BEING SHOWN PHYSICALLY
        A TRULY PECULIAR RESPONSE...
        GAKVU'S JOY IN TRIUMPH AND LACK OF CONNECTION LEAVE HER CLUELESS
        TOZIK SHIFTS BACK TO HIS FEET, UNINTERESTED IN THE ISSUE
            EXEC::env.embassy.vn({gakvu: 'fullview nocon', tozik: 'fullview'});
    
    tozik
        we should get out of here
    
    akizet
        we should, but...
        miltza - you said the hangar was trapping people, yes?

    sourceless
        MY QUESTION PULLS HER AWAY FROM SOME INTERNAL TOIL THAT LEFT HER MOTIONLESS
    
    miltza
        ah - yes, well...
            EXEC::env.embassy.vn({miltza: "display show focus hascon far", gakvu: 'defocus nocon', tozik: 'defocus'});
        the connection was poor, but that was the impression i gathered
        it did not sound good...
        the messages were intermingled with pain and fear

    akizet
        i see
        let me see if i can get in touch with anyone...
            EXEC::env.embassy.vn({miltza: "display show hascon far", gakvu: 'defocus nocon', tozik: 'defocus'});
    
    sourceless
        FUNFRIEND!
        CAN WE MAKE ANYTHING OUT FROM COMMUNICATIONS YET?
    
    funfriend
        HI AKIZETESCHE!!
        THE NOISE IS STILL MAKING MOST TRANSMISSIONS INCOHERENT
        I CANNOT UNDERSTAND MUCH
        THE AMBIENT PAIN AND FEAR IS FAR LESSER THAN BEFORE
        BUT I DO NOT THINK THAT IS A GOOD THING

    sourceless
        ...
    
    akizet
        we... should avoid the hangar 
        but that leaves few other options for safe escape

    miltza
        could we survive with the help of the timestopper?
        you are incredible fighters when it is active!!
    
    tozik
        not if the groundsmind has seized our vessels, too
        also, that is near the top of the spire...
        which may lie beyond the timestopper's influence

    gakvu
        how far are we from the groundsmindry floor?
    
    sourceless
        THERE IS A SHORT SILENCE,
            EXEC::env.embassy.vn({miltza: ''});
        OUR ATTENTION SHIFTING TO GAKVU
        SHE RISES TO HER FEET AGAIN
            EXEC::env.embassy.vn({gakvu: 'defocus nocon'});

    movefriend
        GAKVUKANI! 
            EXEC::env.embassy.vn({bg: false});
        THERE ARE ONLY THREE θsegment BLOCKS BETWEEN THE GROUNDSMINDRY AND HERE
        I CAN TAKE YOU DIRECTLY TO IT!
        AND, RELATIVE TO THE DISTANCE TO THE HANGAR,
        IT IS FAR CLOSER!

    itzil
        that is right!
            EXEC::env.embassy.vn({itzil: 'display show', gakvu: 'nocon defocus', tozik: 'defocus'});
        the golem maintenance θsegment block is just below this one!
        we could produce some armaments there, easily!!

    gakvu
        you see what i am suggesting
            EXEC::env.embassy.vn({itzil: '', gakvu: 'defocus nocon', tozik: 'defocus'});

    sourceless
        ARE WE REALLY GOING TO DO THIS?

    miltza
        you truly think <em>we</em> could stop this?
    
    tozik
        who else?
        escaping the immediate disaster is possible
        but this could be happening outside
        just think of the countless golems and constructs deployed
        if the bright cousins are aggressed by even one, they will destroy us
        likely never to let us near their planet again
        to say nothing of the final deaths a total collapse would bring
        we may be the only ones with an advantage
        yes, we must stop the groundsmind

    sourceless
        WE EXCHANGE GAZES, DISBELIEF MIXED WITH REALIZATION
        THE NOTION IS ABSURD, YES,
        BUT WHAT IF THERE REALLY IS NO ONE ELSE WHO STANDS A CHANCE?
        PERSONALLY, A SICKLY EXCITEMENT SWELLS IN MY CORE
        WITH A BRIEF REFLECTION, I AM NEARLY FRIGHTENED TO ACKNOWLEDGE...
        I HAVE NEVER FELT MORE AT HOME ON THIS BRIGHT WORLD
        WHAT A TWISTED SHAPE VELZIE HAS LEFT ME
    
    akizet
        ...does anyone object?
    
    sourceless
        I EXAMINE MILTZA AND THE TWO EXPOSED QOU
            EXEC::env.embassy.vn({bg: true, karik: 'display show', itzil: 'display show', gakvu: 'hide', tozik: ''});
        MILTZA'S RECEPTORS TWIST AND WRING WITH CONFLICTION
        BUT THE MINDCORES SPEAK UP FIRST
    
    itzil
        i am not leaving until i find my kivii!

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
            EXEC::env.embassy.vn({bg: false, itzil: '', miltza: 'hide hascon', karik: '', gakvu: "hide nocon"});vfx({type: "darkflash", state: true});change("PAGE!!movefoeactive", "DELETE")
            WAIT::1000
            THEN::refreshStage({noFlash: true});vfx({type: "darkflash", state: false});
        ADVISE::'save iteration'
        NOTICE::'render can continue without incoherence'
        NOTICE::'additional activity detected'::IN::'research center'
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

END::specialCam(false);pauseSwapCam(false);change("PAGE!!ep2xplore", true)
SKIP::env.embassy.skips.d3_movefriend_finish();change("PAGE!!ep2xplore", true);env.embassy.collapseSave({effects: true})
SKIPNOTICE::will save the iteration
`)

env.localization.page['embassy'].dialogues["d3_moveend"] = generateDialogueObject(`
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
`)

env.localization.page['embassy'].dialogues.d3_c_responses = generateDialogueObject(`
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
        let us continue<+>END
            EXEC::env.embassy.vn({bg: false, tozik: "", gakvu: ""})
`)
env.localization.page['embassy'].dialogues["d3_c"] = generateDialogueObject(`
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
        i had simply never seen a hint of it from you
    
    gakvu
        hehehe, i see
        on the surface only, akizet
        i was larval back when structurism swept ekiva
        and i hated it
        but my parents had their receptors entangled in the structurist song
        they saw sure that i became one of the constructors, too
        so i slowly became an expert in feigning interest

    akizet
        a constructor? so--you worked on the okizika?

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
        GAKVU'S GAZE DRIFTS IN THOUGHT
        SHE SNICKERS TO HERSELF BEFORE ANSWERING,

    gakvu
        yes, but...
        her favorite bright weapons are the larger ones
        and there is no way we are carrying her clothes
    
    sourceless
        THESE ARE SHAMELESS EXCUSES
        BUT, I AGREE, SO... I SIMPLY NOD MY RECEPTORS
    
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
        would you please... turn your coat off?
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
        is that a permanent fixture of your qou-body?
        or just a lucky coincidence?
    
    sourceless
        TOZIK LOOKS AT HIS CORRUSKIVI THOUGHTFULLY,
        CURLING THE FINGER IT IS ANCHORED TO
        I CAN SEE NOW IT IS SOMEWHAT ORNATE,
        PALE FAUX-PARII ARMOR SEGMENTS SIT LOOSELY ON ITS CORRUCYSTIC GLASS
        SEPARATED PROBABLY TO ALLOW FOR IT TO RESHAPE ITSELF FREELY

    tozik
        ah... it was a gift
        a parting present from a team-member back home
        i like to keep it internally, even if we do not work on constructs
    
    akizet
        what did you do back then?
        
    tozik
        surface sentry maintenance
        i miss the team, but it was for the best
        with the amount of focus and tireless care they require,
        my growing disinterest would have allowed an infestation
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
        that troubles me still, too...
        i believe it cannot solely be from our groundsmind
        the amount of control being exerted, 
        especially if this attack stretches across the entire embassy...
        it is beyond anything i would have thought possible
        the groundmindry core is a grand cyst, yes, but,
        this is simply too intricate an attack for one mind to conduct all at once
        ...
        the inconsistency is what troubles me most
        only some constructs, surely each with some common element, but...
        we have no time to dissect every foe that is found
        the only certainty we have is the terrible noise that started all of this
    
    RESPONSES::akizet
        i see<+>loop
            EXEC::env.embassy.vn({tozik: "fullview", gakvu: "fullview"})
            FAKEEND::(back)

SKIP::vn.done()
`)

env.localization.page['embassy'].dialogues.d3_miltza_resp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        do you need any help?<+>help
            SHOWIF::["stageroom", "embassy_cquarters1"]
        division?<+>division
        ask about art<+>art
        help fight<+>fight
            HIDEREAD::
            SHOWIF::[["stageroom", "embassy_relocator"], ["PAGE!!ep2xplore", true], ["PAGE!!earlymiltza", false]]
        let us continue<+>END
            EXEC::env.embassy.vn({bg: false, miltza: ""});pauseSwapCam(false)
`)
env.localization.page['embassy'].dialogues.d3_miltza_artresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        veilk?<+>veilk
        eye?<+>eye
        taking it with?<+>taking
        back<+>loop
            FAKEEND::(back)
`)

env.localization.page['embassy'].dialogues["d3_miltza"] = generateDialogueObject(`
loop
    RESPOBJ::d3_miltza_resp
art
    RESPOBJ::d3_miltza_artresp

start
    sourceless
____SHOWIF::["stageroom", "embassy_cquarters1"]
        MILTZA RUMMAGES THROUGH HER BARRICADE FOR SOMETHING
            EXEC::env.embassy.vn({bg: true, miltza: "display show far"});pauseSwapCam(true)            
        DIGGING THROUGH SLUDGED CONTAINERS, STAINING HER CLAWS... SOMETHING IMPORTANT, MAYBE
____SHOWIF::["stageroom", "embassy_relocator"]
        MILTZA IDLES WITHIN THE RELOCATOR, WAITING ANXIOUSLY
            EXEC::env.embassy.vn({bg: true, miltza: "display show far"});pauseSwapCam(true)
        I DO NOT THINK SHE COULD HELP SAFELY WITHOUT A TIMESTOPPER CONNECTOR
____END::

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
        ah, no no! no no no
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

    sourceless
        that explains why we have not crossed paths
        there may be no restriction on quarters selection, but...
        a small unease still sets in my receptors

    akizet
        your chamber is quite low in the spire
        do you work with our auxiliaries?
    
    miltza
        oh, yes, it is! and, not often...
        really, it is the thought of being so high up...
        it may be silly and larval, but i struggle to rest so far from the ground
        and--i do not mind the climb!
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
        and the accuracy in their eyes is impressive!
        do you make them often?

    sourceless
        it takes her a θblink to break out of some inner thought,
        but the mundane topic eases her receptors, mind shifting way from the attack

    miltza
        ah--yes, actually! ahehe...
        i make sculptures and little golems of all obeski life,
        but it is hard to do that without making many veilk
        the cousins adore them, especially the ones that move
        i had just completed and sent through a collection of ekiva veilk,
        some even with their tendril adornments!
        so, i was working on that vaznian species next...
        ahh, what a shame...

    RESPONSES::akizet
        you will get the chance again!<+>art
            FAKEEND::(back)

eye
    akizet
        miltza!!
        the eye mural you were working on,
        it was remarkable, but uncanny...
        what does it mean?

    sourceless
        tension eases away from her receptors in recollection

    miltza
        hehe, you are not the first to say this...
        it is old pre-structurist symbology from my home in ekiva!
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
    
    sourceless
        a brief silence holds, her receptors gently balling up
    
    miltza
        ...but, in this giggle of velzie we find ourselves in,
        only the akanivik view was completed

    RESPONSES::akizet
        ironic<+>art
            FAKEEND::(back)

taking
    akizet
        miltza!!
        will you be bringing any of your current work with?
    
____SHOWIF::["stageroom", "embassy_cquarters1"]
    miltza
        what? oh!
    
    sourceless
        her gaze twists to the large mural, the veilk statues, which...
        ...would they be good as a bludgeoning tool?
    
    miltza
        i do wish we could...
        the mural is some of my favorite work, and somewhat intricate
    
    sourceless
        one of her claws digs out a small cyst from her containers, tucking it into her garment
    
    miltza
        but there is no reasonable way to carry any of it!
        instead, i am simply collecting the archival cores i store my designs upon
        i do wish i... kept things better organized...
    
    sourceless
        her panic shows in her hastened little laugh as she returns to digging

    miltza
        in our endless θdeaths, the work can simply be done again, right?

____SHOWIF::["stageroom", "embassy_relocator"]
    miltza
        ah, i do wish we could...
        but, there is no reasonable way to carry any of it!
        we may pray i can return, at least for the mural...
        that one is rather intricate, but far too large and fragile
        for now, i have just gathered archival cysts i keep my designs upon
        in our endless θdeaths, the work can simply be done again, right?
____END

    RESPONSES::akizet
        of course<+>art
            FAKEEND::(back)

fight
    akizet
        miltza!
        you fought well, despite the circumstances
    
    miltza
        oh! thank you, akizet!!
        yes, i...
        i really have you to thank for the strikes,
        but i am glad my mind could be of use
        my coordination was rarely in more than matters of travel and basic defense,
        but i still had the same training as any other
        it all came back to me rather quickly
        the surface never does leave us, truly, ahehe...
    
    sourceless
        she fidgets with her third claw
        is that apprehension?
        perhaps she knows already what i will ask next
    
    akizet
        indeed
        there may be more for us to find before we set out
        tozik and gakvu will need to stay with us, but...
        would you consider swapping in with one of their connections?
        i am certain your skill could be critical in surviving what may come

    miltza
        me?!
        akizet, i... if i must, i suppose?
        i am a tir, an artist, akizet--this really is not my space!
    
    sourceless
        she stumbles over her excuse
        were we not forced into defending ourselves,
        i am certain tozik and gakvu would have responded the same
    
    akizet
        the timestopper affords us much, miltza
        you felt what i offer you, and i saw what you were capable of
        stay close and you will be fine
    
    sourceless
        my confidence strikes a baffled silence into her
        miltza's receptors, which had closed like balled claws,
        gradually loosen their tension
    
    miltza
        ...ok, i will help, but...
        only if you think it is strictly necessary

    sys
        NOTICE::'additional party member';'MILTZA';'now available'
            EXEC::env.embassy.addPartyMember('miltza');change("PAGE!!earlymiltza", true)
        NOTICE::'manage party members in menu';'Z';'drag from or into active party'

    RESPOBJ::d3_miltza_resp

SKIP::vn.done()
`)

env.localization.page['embassy'].dialogues.d3_mind_resp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        do you need us to grab anything?<+>grab
        doing ok?<+>ok
        golem weapon?<+>bstrd
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.sorry_cyst)'
        let us continue<+>END
            EXEC::env.embassy.vn({itzil: "", karik: "", bg: false});pauseSwapCam(false)
`)
env.localization.page['embassy'].dialogues["d3_mind"] = generateDialogueObject(`
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
        i hope this was one of her θgazes with the bright cousins

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
        what just...--??

    sourceless
        MILTZA DRAWS CLOSER TO THE EXIT HALL, WISELY
            SHOWIF::"pau|miltza"
        GAKVU SEEMS ACUTELY AWARE OF THE SITUATION, SPRINTING OVER TO THE DAMAGED WALL
            EXEC::specialCam("archivesopen");vnp({gakvu: "show downleft"});pauseSwapCam(true)
        SHE FEELS AT IT, THEN SEEMS TO HUG IT
        A WAVE OF JOY PASSES THROUGH OUR SHARED CONNECTION
        IT IS ENOUGH TO QUELL THE LINGERING FEAR OF BEING CRUSHED
    
    gakvu
        ahh, a light in this hateful θgaze...!
        i take it all back, velzie!!
    
    sourceless
        THE SHEER ABSURDITY OF HER REACTION BRINGS A CHUCKLE EVEN TO TOZIK

    akizet
        what...?
        
    sourceless
        GAKVU EXTENDS A HAND TOWARDS THE DAMAGE, CAUSING THE WALLS TO GIVE WAY
            EXEC::change("PAGE!!archiveopen", true)
        A DELUGE OF SPIREBLOOD SPILLS FORTH, BUT BEYOND IT IS A TUNNEL...
            EXEC::env.stage.current.onStep()
    
    gakvu
        an archival vein just collapsed!
            EXEC::vnp({gakvu: "show"})
        right before us, directly into our θsegment of the spire!
        can you even imagine the chances??

____SHOWIF::"pau|miltza"
    miltza
        oh!
        if it is still connected to the spine...
        we may be able to get through the archival system itself!!
            EXEC::vnp({gakvu: "show", miltza: "show"})

    gakvu
        we are not so blessed, miltza
        even from here i can feel the vein's alerts
        it is entirely dislocated
____END

    sourceless
        THIS IS TERRIBLE NEWS
        THE SPIRE REALLY IS COLLAPSING
        HOW MUCH TIME DO WE REALLY HAVE TO DO THIS...?
        BUT - SHE IS RIGHT TO BE EXCITED IN THE SHORT TERM
        THERE WILL BE PLENTY WE CAN USE WITHIN
        THE VEINS CARRY ALL DELIVERIES AND KNOWLEDGE

    tozik
        more tools might lay within
        like a herd of veilk parting just for us
            EXEC::vnp({tozik: "show"})

    akizet
        we should think about this first...
            EXEC::vn.done()
        if the archival golems are compromised, it will be extremely dangerous
        i am sure we can find what we need to continue elsewhere
        but... maybe it could be worth it

    RESPONSES::akizet
        think about it<+>END
            EXEC::specialCam(false);pauseSwapCam(false)

SKIP::vn.done();specialCam(false);pauseSwapCam(false);change("PAGE!!archiveopen", true);step();env.stage.current.onStep()
`)

env.localization.page['embassy'].dialogues.d3_bstrdintro_responses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        what did you do?<+>what
        who are you?<+>who
        this evil mode worked?<+>why
            SHOWIF::"e3a2__bstrdmeet"
        move on<+>bye
            FAKEEND::(end chat)
            SHOWIF::'embassy__d3_bstrdintro-what'
`)
env.localization.page['embassy'].dialogues["d3_bstrdintro"] = generateDialogueObject(`
start
    sourceless
        ONCE AGAIN WE ARE BESET BY INCOHERENT FOES
        OUR ONLY OPTION IS--
            AUTOADVANCE::

    sys
        ERROR::'memory stream halted'
            EXEC::env.embassy.vn({bg: true, bstrdface: 'display'})

    moth
        huh?
            SHOWONCE::
    
    bstrd
        SURPRISE!!!!!
            EXEC::changeBgm(env.embassy.music_bstrd, {length: 2000});env.embassy.vn({bg: true, bstrdface: 'display show'})
        this part of da memory hase been chosen 2 become... EVIL MODE!!!
        time 2 die INTRALKOBER >%^)
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
        helloe?? any1 HOME? :|
        THOUGHTS ?????
____END

    RESPOBJ::d3_bstrdintro_responses

who
    self
        WHO ARE YOU?

    bstrd
        :U
        BSTRD
        STUPID u know me :P
            SHOWIF::"e3a2__bstrdmeet"
        im here 2 make u have FUN!!!
        framing devices r boring sometimes......
        so i take a litel part to improve
        to enjoy if u wish ?
        >:)
        
    RESPOBJ::d3_bstrdintro_responses

why
    self
        you were able to make evil mode here?
        why? you were having trouble
    
    bstrd
        THIS 1'S is TINY
        :b
        ok questions creature? 
        anmswer GOOD ENOUgH 4 u?
        there IS A games waiting.. '_' ... 
                
    RESPOBJ::d3_bstrdintro_responses
        
what
    self
        WHAT DID YOU DO TO THE MEMORY?
    
    bstrd
        UMMM, NOTHING..............???
        LOL :P JK
        i told u its evil mode
        its... XTRA HARD!!!
        turn back if u dont like it....
        but maybe u willl .. . ?? 
        THEERE BE TREAUSER!!!!
    
    self
        DID YOU ALTER THE EVENTS?
        IS ANY OF THIS REAL?

    bstrd
        '_'
        they rly did MOST of this
        :V
        im just making it cooler

____SHOWONCE::
____SHOWIF::["e3a2__bstrdmeet", false]
    moth
        oh, i see...
        ok, this only looks like a virus
        it's actually a part of the framing device
        an extra hard mode... yeah, of course they'd put this in here
        probably only targets less important parts of the memory, at least i hope
        look, if you don't like what's going on, you can probably turn around and skip this part
        totally up to you
____END
        
    RESPOBJ::d3_bstrdintro_responses

bye
    bstrd
        :V
        NO 'THANK U'??
        W/E
        SEE U SOON >:p

    sys
        ATTENTION::'memory stream resumed'
            EXEC::revertBgm();env.embassy.vn({bg: false, bstrdface: ''})

    sourceless
        --TO FIGHT

    RESPONSES::akizet
        engage<+>END
            FAKEEND::(begin combat)
            SHOWIF::['gameplay_off', false]
            EXEC::env.embassy.startOrSkipArchivalIntroFight();env.embassy.vn({bg: false, bstrdface: ''})

        bypass<+>END
            SHOWIF::['gameplay_off', true]
            FAKEEND::(skip combat)
            EXEC::env.embassy.startOrSkipArchivalIntroFight();env.embassy.vn({bg: false, bstrdface: ''})
`)

env.localization.page['embassy'].dialogues["d3_archiveintro"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";"toggle within system menu if desired"
    
    sourceless
        WHILE IT IS A FRIGHTENINGLY POWERFUL COMBATANT,
        ITS SIZE AND SLOWNESS LEND WELL TO DISRUPTIVE ATTACK
        AND SO, AFTER SOME STRUGGLE,
____END

    sourceless
        THE GOLEM COLLAPSES INTO A PILE OF DENTED LIMBS
        FROM ITS CHEST CAVITY SPILLS A WEALTH OF...
        REALLY? SATIK CYSTS? HERE? HOW PECULIAR...
        I TURN ONE OVER IN MY CLAWS, ITS MYRIAD APPLICATORS STARING BACK AT ME
        PERHAPS CARRIED OUT OF PRECAUTION, IN THE EVENT OF VEIN FAILURE?
        IT IS RARE TO SEE THESE USED IN TIMES OF PEACE
    
    sys
        ITEM_RECEIVED::"<span definition="INHERITED CONTEXT::${env.ITEM_LIST['eq_satik'].description}">satik cysts</span>"
            EXEC::env.embassy.conditionalItem('eq_satik', 1, 'aintro')
            AUTOADVANCE::
    
    definitionget
        TEXEC::definitionRender({getAttribute: () => "STATUS++item_satik"}, {returnHTML: true})

    gakvu
        ah! how clumsy that thing was!

____SHOWIF::"pau|miltza"
    miltza
        not clumsy,
        but far too precise...
        it was looking for openings
        
    tozik
        one was simple enough to deal with

____SHOWIF::["pau|miltza", false]
    tozik
        alone, perhaps...
____END

        but if we have to deal with multiple further within...

    sourceless
        with a brief look over the tools and weapons collected so far,
        the realization is shared through our connection

    tozik
        we should be very, very careful

    RESPONSES::akizet
        continue<+>END
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
            SHOWIF::["pau|miltza", false]
        do any of you know what this is?
            SHOWIF::"pau|miltza"
    
    sourceless
        GAKVU IS SIMILARLY PUZZLED, HER RECEPTORS SHAKING NEGATIVELY
    
    gakvu
        a product of the aggressing groundsmind, maybe?
        i... i do not think it is corru

    bstrd
        '_'
            EXEC::specialCam('bstrdface')
        hi
    
    moth
        oh my god it put itself in the memory
            SHOWONCE::

    sourceless
        I SHRIEK AS THE DOOR SPEAKS TO US
            SHOWIF::["pau|miltza", false]
        MILTZA AND I SHRIEK IN UNISON AS THE DOOR SPEAKS TO US
            SHOWIF::["pau|miltza", true]
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
        oh thats cool :P
        YA i let u in
        but u gotta do a favor for me first
        go get my cool orb thingy from the left
        n get me a scary black box from the right
        theres some C00L stuff in here... 
        u wont wanna miss it!!
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
        ya im a golem or w/e
        go get the stuff ok? bye
    
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
`)
env.localization.page['embassy'].dialogues["d3_archivedoorlocked"] = generateDialogueObject(`
start
    sourceless
        THE DOOR AND ITS STRANGE MATERIAL LIE UNMOVING, NO MATTER WHAT WE DO
        WE NEED TO GET THE 'COOL ORB THINGY' AND 'SCARY BLACK BOX'

    RESPONSES::akizet
        continue<+>END
`)

env.localization.page['embassy'].dialogues["d3_archivecore"] = generateDialogueObject(`
start
    sourceless
        THE ROOM IS DEATHLY STILL, ASIDE FROM THE DRIPPING OF SPIREBLOOD FROM THE MELTING CEILING
    
    gakvu
        is that it over there?
            SHOWIF::"PAGE!!triedarchivedoor"
        the 'cool orb thingy'?
            SHOWIF::"PAGE!!triedarchivedoor"

        what is that?
            SHOWIF::[["PAGE!!triedarchivedoor", false]]

    sourceless
        GAKVU POINTS FORTH TO AN EYE-PIERCING MONOLITH
            EXEC::specialCam('bstrdcyst1');pauseSwapCam(true)
        IT SEEMS TO BE MADE OF THE SAME STRANGE MATERIAL FROM BEFORE...
            EXEC::addItem(env.ITEM_LIST.cool_orb_thingy)
        AND OVER IT, FLOATS AN IMPORTANT-LOOKING CORRUCYST
        TOZIK WALKS FORTH TO TAKE IT, ATTEMPTING TO CONNECT TO IT...
            EXEC::vnp({tozik: "show"});env.stage.current.hidePillarCyst();
        BUT HE SIMPLY SMASHES IT AGAINST HIS RECEPTOR UNEXPECTEDLY - ITS GLASS DOES NOT PART AS USUAL
        HE STUMBLES FROM THE IMPACT

    tozik
        ah...
        ow...

    sourceless
        HE STILL ALLOWS HIMSELF TRUE PAIN? HOW SILLY

    gakvu
        let me see!
            EXEC::vnp({gakvu: "showleft far"})

    sourceless
        SHE SKITTERS CLOSER, AND I EXPECT HER TO SNATCH IT FROM HIS CLAWS,
            EXEC::env.embassy.vn({gakvu: "show"})
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

____SHOWIF::["pau|miltza", true]
    miltza
        oh! i believe there is a small group in wisdom who collects this information...
            EXEC::env.embassy.vn({miltza: "show shiftright"})
        a side project, in understanding the cousins' history of war, you see--
        but it is very strange to see here!
        and especially in this color??
____END

____SHOWIF::["PAGE!!triedarchivedoor", true]
    gakvu
        maybe that thing keeping the door locked...
        is just a very strange qou from materials...?
            SHOWIF::["pau|miltza", true]
        is just a very strange qou from wisdom...?
            SHOWIF::["pau|miltza", false]
        who wants to preserve their research??

    miltza
        nonsense! i certainly would know of such an eccentric!!
            SHOWIF::["pau|miltza", true]

    akizet
        maybe...
            SHOWIF::["pau|miltza", false]
        either way, we have the 'cool orb thingy'

____SHOWIF::["PAGE!!triedarchivedoor", false]
    gakvu
        is this kazki's? why is it so strangely highlighted?

    akizet
        without a doubt
        let us bring it along - it is small enough
        and we should continue looking around!
        there must be something else going on in this vein...

____END
        let us fetch the other thing--the 'black box'?
            SHOWIF::[['EXEC::checkItem(env.ITEM_LIST.scary_black_box)', false], ["PAGE!!triedarchivedoor", true]]
        let us return to the door
            SHOWIF::[['EXEC::checkItem(env.ITEM_LIST.scary_black_box)', true], ["PAGE!!triedarchivedoor", true]]

    tozik
        <em>scary</em> black box
            SHOWIF::[['EXEC::checkItem(env.ITEM_LIST.scary_black_box)', false], ["PAGE!!triedarchivedoor", true]]

    RESPONSES::akizet
        continue<+>END
            EXEC::specialCam('');vn.done();pauseSwapCam(false)
`)

env.localization.page['embassy'].dialogues["d3_archivedelivery"] = generateDialogueObject(`
start
    sourceless
        AS SOON AS WE ENTER THE ROOM... I SEE THEM
        EACH AND EVERY ONE
        A HALF-DOZEN CONTAINERS, WITH ONE OF THOSE SURFACE-SENT LIGHTS
        THEY WILL BE UPON US IN AN INSTANT
            EXEC::change('PAGE!!archiveambush', true)
    
    RESPONSES::akizet
        fight!!<+>END
            FAKEEND::(prepare for combat)
`)
env.localization.page['embassy'].dialogues["d3_archivedeliveryclear"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";"toggle within system menu if desired"

    sourceless
        IT IS IMPOSSIBLE TO AVOID EVERY STRIKE FROM SO MANY CONSTRUCTS
        WE ARE BATTERED BY THE CONTAINERS UNCEASINGLY,
        GIVEN DEADLY SHAPE BY THE DIRECTION OF THIS DISCOLORED VEILKLIGHT, SOMEHOW
        EVEN WE ARE AFFECTED BY ITS WARPING
        BUT IT IS FOR THIS REASON THAT WE TEAR THEM APART SO EFFECTIVELY
____END

    sourceless
        THE LAST ONE FALLS
            EXEC::env.stage.current.onStep()

____SHOWIF::'PAGE!!archruka'
        AFTER THE FIGHT, WE ALL CHEER IN UNISON
        AN INGENIOUS USE OF KAVRUKAS, I WILL ALLOW OUR PRIDE THIS VICTORY
        
    akizet
        that could have been agonizing...
    
    tozik
        no tendril left to rot
            EXEC::vnp({tozik: "show shiftleft"})

____SHOWIF::['PAGE!!archruka', false]
    sourceless
        WE ALL COLLAPSE WITH RELIEF AFTER THE FIGHT
        THIS IS THE WORST θgaze OF MY θdeath

____END

    sourceless
        I RUMMAGE A BIT THROUGH THE remains OF THESE CONSTRUCTS...
            EXEC::step();vnp({tozik: "hide"})
    
    sys
        ITEM_RECEIVED::"<span definition="INHERITED CONTEXT::${env.ITEM_LIST['eq_siphon'].description}">vecrivi</span>"
            EXEC::env.embassy.conditionalItem('eq_siphon', 1, 'delivery')
            AUTOADVANCE::
    
    definitionget
        TEXEC::definitionRender({getAttribute: () => "STATUS++item_siphon"}, {returnHTML: true})

    sourceless
        AH - AND THERE, BEYOND THEIR CORPSES,
            SHOWIF::"PAGE!!triedarchivedoor"
        THAT MUST BE THE 'SCARY BLACK BOX'
            SHOWIF::"PAGE!!triedarchivedoor"
        SOME SORT OF COUSINLY BOX?
            SHOWIF::["PAGE!!triedarchivedoor", false]

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
            EXEC::vnp({gakvu: "show"})

    sourceless
        A PANG OF ANXIETY SHOOTS THROUGH MY MINDCORE
        'LIKE COMPONENTS FOR AN EXPERIMENTAL CORRU-TO-LIGHTNING CONVERTER'
        YES, WHY WOULD I KNOW ABOUT THIS, IF NOT FOR MY SUBVERSIVE ACTIONS?
        NO I MUST BE REASONABLE--THEY USE THESE ALL THE TIME I THINK
        WHAT ELSE DO THEY PUT IN THEM žõœgÓô

____SHOWIF::"pau|miltza"
    miltza
        ah! i see these in exchange...
            EXEC::vnp({miltza: "show"})

    sourceless
        I CEDE THE STAGE TO MILTZA GLEEFULLY
        HER RECEPTORS LOSE SOME OF THEIR TENSION IN HER RECOLLECTION
    
    miltza
        we often receive, ah...
        received... brittle and delicate displays, in them!
        like things made of their dead glass, or that 'ceramic' material!

    tozik
        is that all?
        
    miltza
        well, the soft interior lends well to deliveries of any type, i think...
        this could truly be anything

____SHOWIF::["pau|miltza", false]
    akizet
        oh, ah, like,
        apples...
        because--they do not fare well with the low-air environment of our spire!

    gakvu
        ah. curious

    sourceless
        ½T~g«¾%
        THEY MUST THINK I AM SIMPLY PRETENDING TO KNOW
        OH WELL - IT IS BETTER THAN THE ALTERNATIVE
____END

    sourceless
        WE TAKE THE BOX WITH US
        HEAVY, BUT EASY ENOUGH TO SET ASIDE WHEN NEEDED
            EXEC::addItem(env.ITEM_LIST.scary_black_box)

    akizet
        come - let us return to the door
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.cool_orb_thingy)'
        come - let us continue our search
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.cool_orb_thingy) == false'
        before this archival vein collapses even further through the spire...
            EXEC::setCam();env.stage.current.onStep()

    RESPONSES::akizet
        continue<+>END
            EXEC::vn.done();setCam();env.stage.current.onStep();pauseSwapCam(false)
`)

env.localization.page['embassy'].dialogues["d3_archivedoorunlock"] = generateDialogueObject(`
start
    sourceless
        AND SO WE SET THE ENTITY'S REQUESTED MATERIALS BEFORE THE DOOR
            EXEC::specialCam('bstrdoor');pauseSwapCam(true)
        THE CORRUCYST IT WANTED,
        AND THE SCARY BLACK BOX
    
    bstrd
        WOW!! :O
            EXEC::specialCam('bstrdface')
        u guys did it... so freaking proud...
        amazeng

    sourceless
        SUDDENLY, THE STRANGE TENDRILS CURLED AROUND THE DOOR SINK INTO ITS CORRU
        AND AS THEY DO, SEVERAL WHIP OUT AND CURL AROUND THE CORRUCYST AND BOX, BRINGING THEM WITH
        IN UNIFIED SURPRISE, WE ALL SHUFFLE BACKWARDS - EXPECTING IT TO LASH OUT AT US
            EXEC::change("PAGE!!bstrdlock", true)
        BUT IT DOES NOT, AND THE DOOR STANDS UNLOCKED
            EXEC::step()

    bstrd
        hey why dont u come in i got a surprise 4 u
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
            SHOWIF::["pau|miltza", false]
        do any of you know what this is?
            SHOWIF::"pau|miltza"
    
    sourceless
        GAKVU IS SIMILARLY PUZZLED, HER RECEPTORS SHAKING NEGATIVELY
    
    gakvu
        a product of the aggressing groundsmind, maybe?
        i... i do not think it is corru

    bstrd
        '_'
            EXEC::specialCam('bstrdface')
        hi
    
    moth
        oh my god it put itself in the memory
            SHOWONCE::

    sourceless
        I SHRIEK AS THE DOOR SPEAKS TO US
            SHOWIF::["pau|miltza", false]
        MILTZA AND I SHRIEK IN UNISON AS THE DOOR SPEAKS TO US
            SHOWIF::["pau|miltza", true]
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
        oh thats cool :P
            EXEC::env.embassy.vn({gakvu: ""})
        YA i let u in
        but u gotta do a favor for me first
        go get my cool orb thingy from the left
        n get me a scary black box from the right
        theres some C00L stuff in here... 
        u wont wanna miss it!!
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
        u  already got em?
        HOLY SMOKES!
        WOWEI
        ok come on in
            EXEC::change("PAGE!!bstrdlock", true)

    sourceless
        SUDDENLY, THE STRANGE TENDRILS CURLED AROUND THE DOOR SINK INTO ITS CORRU
        AND AS THEY DO, SEVERAL WHIP OUT AND CURL AROUND THE CORRUCYST AND BOX, 
        RIGHT OUT OF OUR CLAWS!!! I NEARLY TRIP FORWARDS AS IT STEALS THEM AWAY
        IN UNIFIED SURPRISE, WE ALL SHUFFLE BACKWARDS - EXPECTING IT TO LASH OUT AT US
        BUT IT DOES NOT, AND THE DOOR STANDS UNLOCKED
            EXEC::step()

    bstrd
        hey come in i got a surprise 4 u
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
        THE TIMESTOPPER AFFORDS US JUST A BLINK TO COORDINATE...
    
    RESPONSES::akizet
        get ready!!<+>END
            FAKEEND::(prepare for combat)
`)
env.localization.page['embassy'].dialogues["d3_archiveminiclear"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";"toggle within system menu if desired"

    sourceless
        THE SHELF-BEAST STRETCHES ACROSS NEARLY THE ENTIRE CHAMBER
        ITS LONG LIMBS NEARLY IMPOSSIBLE TO AVOID...
        BUT WE SOON HAVE IT BLEEDING FROM EVERY ANGLE,
        SOFT-SHELLED EXTENSIONS SEVERED AND DRAINING ITS LIFE AWAY
____END

    sourceless
        THE BEAST FALLS AND MELTS, THOUGH...
        ITS SLUDGE SEEMS TO DRAIN AWAY INTO... THE FLOOR...?
            EXEC::changeBgm(env.embassy.music_collapse, {length: 4000});
        ARE THOSE HOLES IN THE FLOOR?
        HOW CAN THERE BE HOLES? IS THAT THE FLOOR?
        SOMETHING ABOUT IT MAKES MY MIND SPIN...

    gakvu
        akizet? are you well?
            EXEC::vnp({bg: true, gakvu: "show"})

____SHOWIF::"pau|miltza"
    sourceless
        MILTZA DRAWS NEAR, A WORRIED CLASP IN HER RECEPTORS
            EXEC::vnp({miltza: "show"})
        EVEN IN HER SKITTISH FEAR,
        SHE APPROACHES LIKE A TIR INTENT ON CALMING A SPIRALLING SURFACE SURVIVOR
____END

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
            EXEC::vnp({gakvu: "hide", miltza: "hide", tozik: "show shiftright", bg: false})
        TOZIK STUDIES THE MIGRAINE-INDUCING VOID OF THE CEILING
    
    tozik
        it looks like the perspective projection might be acting up
        i am not surprised, given the entity that has been guiding us
        it has an uncanny control of the environment
        not unlike the groundsmind, or gakvu...

    gakvu
        where is it, anyway?
        did it just take the box and cyst and run around this thing?

    sourceless
        SUSPICION SPIKES THROUGH OUR CONNECTION
        IS IT A TRAP?
        WE CAN EITHER CONTINUE, OR TURN AROUND...
        WE ARE QUITE FAR OUT OF OUR WAY, AFTER ALL
        BUT SURELY THIS WILL BE WORTH THE TROUBLE?
            EXEC::vn.done()
    
    RESPONSES::akizet
        continue<+>END
`)

env.localization.page['embassy'].dialogues["d3_archiveboss"] = generateDialogueObject(`
start
    sourceless
        THIS CHAMBER...
        IT IS SO WRONG THAT I STRUGGLE TO PROCESS IT
        IS THIS A PRODUCT OF THE SIGNAL? HAVE I GROWN MAD?
        EVEN GAKVU NEARLY STUMBLES INTO ME, DISORIENTED

    gakvu
        do not--
        do not look beyond the walls

    bstrd
        FOCUS!!!
        LOOK @ ME
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
        thx for getting this stuff
        
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

    RESPONSES::akizet
        prepare!!<+>END
            EXEC::specialCam(false);pauseSwapCam(false)
            FAKEEND::(initiate combat) 
`)
env.localization.page['embassy'].dialogues["d3_bstrd_shift"] = generateDialogueObject(` 
start
    sourceless
        the golem's weapon is pointed towards us, but it falters
        its stance gains an uncanny disappointment?

    bstrd
        ummm :I
        i was GONNA use TARGETETED
        BUT da TTENDANT DID that.. .........
        F*UCK IT!!
            EXEC::setTimeout(()=>{env.bgm.intendedRate = 0.4;playCombatCrit();flash(true);addStatus({target: env.rpg.actors.bstrdboss, status: "incoherent", length: 1, noReact: true})}, 300)
            AUTOADVANCE::
            WAIT::2000
            THEN::env.rpg.classList.add('bonked');
        
    sys
        ERROR::"severe structure violation detected";"reforming"
            EXEC::makeBoxesDraggable(env.rpg.allyTeam)
            WAIT::2000
            THEN::flash(false)
        EXECUTING::"structure direction";"thoughtform combat"::
        
    plainsys
        <span class="bastard-font">I GOT IN HERE :b</span>
        <span class="bastard-font">U drag em NOW</span>
        <span class="bastard-font">THESE 1s</span>
            EXEC::env.rpg.classList.add('draghighlight');setTimeout(()=>env.rpg.classList.remove('draghighlight'), 5000)
        <span class="bastard-font">hehe...; watch out for bad %^)</span>
        <span class="bastard-font">BETWER WATCH REAL GOOD 4 DA BAD >>%^)</span>
        <span class="bastard-font">looks like DIS</span>
            EXEC::env.rpg.bstrdTotal = spawnBstrdShot({x:50, y:50, origin: env.rpg.actors.bstrdboss,  count: 1, size: 15, telegraphTime: 3000})
            WAIT::5000
        <span class="bastard-font">and ummmmm</span>
        <span class="bastard-font">like tis ;)</span>
            EXEC::env.rpg.bstrdTotal = env.rpg.allyTeam.members.reduce((acc, m) => acc + m.hp, 0);spawnBstrdShot({pattern: "targeted", target: env.rpg.actors.akizet, origin: env.rpg.actors.bstrdboss, count: 3, size: 20, telegraphTime: 3000})
            WAIT::5000
        <span class="bastard-font">LOL; LMAO; OWNED; %P</span>
            SHOWIF::'EXEC::env.rpg.allyTeam.members.reduce((acc, m) => acc + m.hp, 0) < env.rpg.bstrdTotal'
        <span class="bastard-font">:b u got it ALRADY</span>
            SHOWIF::'EXEC::env.rpg.allyTeam.members.reduce((acc, m) => acc + m.hp, 0) >= env.rpg.bstrdTotal'

    sys
        ::END
    
    sourceless
        ...after some disorientation, i find myself steadied again
        and no sooner does the golem brace to activate its weapon--

    RESPONSES::akizet
        take action!!<+>END
            EXEC::env.rpg.continueBstrdAttack();env.bgm.intendedRate = 1;ratween(env.bgm, 1)
            FAKEEND::proceed
`)
env.localization.page['embassy'].dialogues["d3_archivebossend"] = generateDialogueObject(`
start
    sourceless
        THE GOLEM FALLS TO PIECES, ITS HOVERING CAPABILITIES SLUDGED
            EXEC::env.stage.current.bossCollapse();env.stage.current.clearBossPals()
        BUT ITS SIGIL AND STRANGE VOICE REMAIN
            EXEC::change('PAGE!!aboss', true);

____SHOWIF::['gameplay_off']
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";"toggle within system menu if desired"

    sourceless
        I SUDDENLY REALIZE I CANNOT RECALL HOW WE WON
        WHAT... DID IT DO? DID IT DO ANYTHING?
        WE EACH EXCHANGE CONFUSED GLANCES

    bstrd
        WTF
            EXEC::specialCam("bstrdbox");pauseSwapCam(true)
        have u been doing that...
        THIS WHOLE TIME???
        >:[
        NOT FAIR!
        THIS FUCKINGE SUCKS
    
    tozik
        what are you talking about?
    
    bstrd
        after all i did...
        to give u a good time...
        ...
        u... get...
        NOTHING!!!!

    sourceless
        THE SIGIL OVER THE GOLEM'S HEAD FADES, AND ALL AT ONCE, THINGS SEEM TO RETURN TO NORMAL
            EXEC::env.stage.current.removeBastardBG();env.stage.current.onStep()
        there is an eerie silence...
        what could it have meant by that?
        
    akizet
        well...
        let us return to fixing movefriend
        we have deviated enough
            EXEC::change("PAGE!!archivesclear", "skipped");refreshStage({noFlash: true})
    
____SHOWIF::['gameplay_off', false]
    bstrd
        HOLEY SMOKES :O
            EXEC::specialCam("bstrdbox");pauseSwapCam(true)
        wow...
            EXEC::ratween(env.bgm, 0.75)
        u really did it
        i was p sure i was gonna KILL u guys there
    
    tozik
        why... why did...
    
    bstrd
        SHUT UP im not done yet
        listen im about 2 die so i gotta tell u this quick
        arr... the paine..
        OHH it HURTS BAD!!!
        ;-(
        anywy i found this outside so u can have it
        im p sure its important lol someone messed with it
    
    sourceless
        BEHIND THE DYING GOLEM RISES ANOTHER STRANGE MONOLITH
            EXEC::env.stage.current.showPillar(true)
        OVER IT IS... IT LOOKS LIKE A CORRUCYST
        AND THERE IS SOME SORT OF MARKING ON IT
        BUT I CANNOT SEE IT CLEARLY FROM HERE

    gakvu
        wait
        you are the most reasonable entity we have come across so far
        do you know what is happening? 
        we could fix you, if you help us!

    miltza
        fix?! it tried to--!!
            SHOWIF::"pau|miltza"

    sourceless
        flatly, almost disrespectfully, gakvu hushes her
            SHOWIF::"pau|miltza"

    gakvu
        entertain me for just a θblink miltza
            SHOWIF::"pau|miltza"
    
    bstrd
        :U
    
    sourceless
        THERE IS A LONG, UNCOMFORTABLE PAUSE
        DID IT NOT EXPECT TO LIVE THIS LONG? 
        OR FOR US TO MAKE THAT OFFER?

    bstrd
        no i gotta kill u guys sry
        but u won this time so gj
        
    sourceless
        THE SIGIL FADES, AND ALL AT ONCE, THINGS SEEM TO RETURN TO NORMAL
            EXEC::env.stage.current.removeBastardBG()
        OUR FOE'S GOLEM FALLS TO PIECES ON THE FLOOR, WHERE IT BEGINS TO SLOWLY MELT AWAY
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
        THE MIND THAT INHABITED IT SOUGHT SUCH SENSELESS VIOLENCE
        BUT NOT WITHOUT A TWISTED HONOR, REMINISCENT OF A GUKTIK
        TRULY BIZARRE...
        I KNEEL ALL THE SAME, AND PLACE MY CLAW OVER WHAT REMAINS OF ITS PALE EYESPOTS
    
    akizet
        you fought well... whatever you were
        let us return to fixing movefriend
        we have deviated enough
            EXEC::change("PAGE!!archivesclear", true);refreshStage({noFlash: true})

    sourceless
        BY THE TIME I RISE, OUR FOE HAS FULLY DISSOLVED
            EXEC::specialCam("bstrdbox")
        BRIGHT WEAPON, CYSTS, AND ALL,
        FADING INTO THE WARPED NOTHING BEYOND THE CHAMBER
        WITH THE FINAL DISAPPEARANCE OF ANY HINT OF VISCERA,
        EVEN THE COLOR OF THE ROOM SHIFTS, NO LONGER AS DIZZYING
        THE PRESENCE HAS FULLY LEFT US
____END

    RESPONSES::akizet
        leave<+>END
            EXEC::specialCam("");pauseSwapCam(false)
`)


getLocalizationForPage(true) // --- ensuring that Nothing Gets Fucked Up