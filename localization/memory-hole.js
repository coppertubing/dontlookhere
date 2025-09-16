/*
    cor-RU - a full russian adaptation mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/memory-hole.js
    adaptation for /local/uncosm/where and all of the memory hole pages
    (---hmmmmmmmmmmmmmm.........)

    progress: every page finished, definitions unfinished, review needed, b o n u s as of 23.08.2025
*/


env.localization.page['localuncosmwhere'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "yeah i got nothing here. seems like you could give it some input, but... no clue what it wants": "дааа не знаю тут. похоже ты можешь что-то ввести, но... без понятия чего оно хочет",

        "memoryhole": "брешь памяти",

        "hehehehehe noo nooo!!": "хихихихихи неет нееет!!",

        "enter": "ввести"
    }, 
    entityDescriptions: {
        'memoryhole': `::НЕОБРАБАТЫВАЕМАЯ МЫСЛЕФОРМА
::<span definition="ПРИМЕЧАНИЕ::'нестандартный формат'">НЕОБЫЧНАЯ ПОДПИСЬ</span>
::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'помощи не получишь хихихихихи'</span>`
    },
}

env.uncode = { // --- taking the function and adding stuff so it redirects you to the needed page when you type stuff in russian
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
            else if (value == "личиночный" || value == "личиночному") value = "larval"
            else if (value == "паразит") value = "parasite"
            else if (value == "простите" || value == "прости") value = "sorry"
            else if (value == "шпиль") value = "spire"
            else if (value == "поверхность") value = "surface"
            else if (value == "вейльк" ||  value == "вейльков") value = "veilk"
            else if (value == "юзку") value = "yuzku"
            else if (value == "зузукри") value = "zuzucri"
            else if (value == "зузукри-маски") value = "zuzucri-masks"
            else if (value == "ресурсы") value = "cor-ru"

            if (swup.cache.exists(`/local/uncosm/${value}/`)) { // compatibility with memory hole mods
                setTimeout(() => {
                    cutscene(false)
                    moveTo(`/local/uncosm/${value}/`)
                }, 4000)
            } else {
                fetch(`/local/uncosm/${value}/`).then(resp => {
                    if (resp.status == 404) {
                        cutscene(false)
                        startDialogue('wrong')
                    } else {
                        setTimeout(() => {
                            cutscene(false)
                            moveTo(`/local/uncosm/${value}/`)
                        }, 4000)
                    }
                })
            }
        }
    }
}

env.localization.page['sec'] = {dialogues: {},
    definitions:  { // --- part of these definitions should be dragged into everystuff.js but i will dp that later
        "θ███████": { type: `ОШИБКА`, text: `'отсутствующая сущность'`},
        "θ██████": { type: `ОШИБКА`, text: `'отсутствующая сущность'`},
        "θ█████": { type: `ОШИБКА`, text: `'отсутствующая сущность'`},
        "θ████": { type: `ОШИБКА`, text: `'отсутствующая сущность'`},
        "θ███": { type: `ОШИБКА`, text: `'отсутствующая сущность'`},

        
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
        "don't look at me lol": "на меня не смотри лол",
        "that unity thing actually worked on this? it didn't even seem like there was anything left... weird": "единство и правда на нём сработало? даже не было похоже, будто там что-то осталось... странно",
        "looks like it lost coherence once you pulled that memory from it": "похоже он потерял связность после вытягивания той памяти",

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
<span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("жат")}-рецепторы, обращ“—» ¯x¶›¢Ã°!
::ОШИБКА::'окончен поток'недейстОШИБКА::ИÓú=ER::Й"¨úр::äÀ*^Уó¬ól£«â'`,
    }
}

env.localization.page['sry'] = {dialogues: {}, strings: {"..__F($JKSV&*Z^)": "..__Ф($ЖКСВ&*З^)"}}

// === DIALOGUES === //
env.localization.page["localuncosmwhere"].dialogues["wrong"] = generateDialogueObject(`
start
    ¥Óñ«J
        хихехихи непраааавильно!!! непрааавильно неправильно неправильно неправильно!~!!! неправильно!!!
        непраааавильно неправильно неправильно невеееерно!!! ахехехехе
        хехехихихи
        покаааа!!!!
            EXEC::setTimeout(()=>{endDialogue();moveTo(\`/local/uncosm/\`)}, 1000)
            WAIT::2000
            
    RESPONSES::self
        что вообще происходит<+>END
`)


env.localization.page["sec"].dialogues["cavik"] = generateDialogueObject(`
start
    self
        привет?

    sourceless
        ...
        ...
    
____SHOWIF::"embassy_d1_complete"
    moth
        погоди-ка, на что именно ты смотришь?
        это что, просто кавик из посольства?
        он что-нибудь делает?
    
    self
        he's just standing there
____SHOWIF::["embassy_d1_complete", false]
    moth
        погоди-ка, на что именно ты смотришь?
        это что, какая-то обесковая подпись? как тебе вообще удалось это отрыть?
        ...она что-нибудь делает?
    
    self
        просто стоит тут
____END

    sourceless
        ...
    
    self
        привет?
        
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        КАК ТОЛЬКО СВЕТЛЫЕ БЛИЗНЕЦЫ ОТХОДЯТ, Я СЖИМАЮ КОГТИ
            EXEC::ratween(page.bgm, 0.2)
        ПРЕЖДЕ ЧЕМ ОН УСПЕВАЕТ ВЫМОЛВИТЬ ХОТЬ СЛОВО, Я ЛОВЛЮ КАВИКА ЗА ЗАПЯСТЬЕ И УВОЖУ ЕГО ВНИЗ ПО КОРИДОРУ
        ВОЗМОЖНО, ПО ИХ РЕАКЦИИ НА МЕНЯ ОН УЖЕ ДОГАДЫВАЕТСЯ, ЧТО ЧТО-ТО НЕ ТАК

    cavik
        ты меня пугаешь!! постой!
        что такое?
        почему ты нам ничего не сказала?
        это хорошо, разве нет??
        это всё, ради чего мы работали!
        или--

    sourceless
        Я ХВАТАЮ ЕГО ЗА ПЛЕЧИ
        ЕГО РЕЦЕПТОРЫ ОТВОРАЧИВАЮТСЯ, И ОН ЗАМИРАЕТ, СЛОВНО ЗАМЕЧЕННЫЙ ХИЩНИКОМ
        ДОЛЖНО БЫТЬ ДЕЛО В МОИХ РЕЦЕПТОРАХ, ИЛИ, МОЖЕТ, В МОИХ ГЛАЗАХ
        МЕЖДУ НАМИ НЕ ДОЛЖНО БЫТЬ НЕДОПОНИМАНИЯ

    origin
        кавик
        не смей никому говорить
        даже нашей команде
        несмотря ни на что

    sourceless
        МОЙ ГОЛОС ДРОЖИТ СМЕРТНЫМ СТРАХОМ

    origin
        понимаешь?
        особенно не сей θмиг...

    cavik
        θ██████...
        я никогда тебя такою не видел
        прошу, скажи мне, что происходит?
        прошу
        прош у
        мне больно
            EXEC::env.secavik.cavikDmg(1)
        больно
            EXEC::ratween(page.bgm, 0.1)
    
    c a
        там кто-то есть
        я чувствую тебя
        я не могу очнуться
        тебе нужно закончить это
        оно снова начнётся
        тебе нужно закончить это
        прошу
    
    cv i k
        п  р  о ш  у 
            EXEC::env.secavik.closeout()

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["clement"] = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        Я ОЩУЩАЮ, КАК НАШЕ СУДНО НАПРЯГАЕТСЯ ПОД ВЕСОМ ГЛУБИНЫ //I FEEL OUR VESSEL STRAIN UNDER THE WEIGHT OF THIS DEPTH   надрывается?  вщщщщ кряхтит..................... 
        МОЯ БЕДНАЯ ГЛАЗИКА, ДОЛЖНО БЫТЬ, НАДРЫВАЕТСЯ, ЧТОБЫ СПРАВИТЬСЯ С ОПТИМИЗАЦИЕЮ //MY POOR GLAZIKA MUST BE STRUGGLING TO KEEP UP WITH OPTIMIZATIONS

    mind
        halting
        pulsing now
    
    sourceless
        ГЛУБИННЫЙ ПУЛЬС СОЗДАЁТ РАСТУЩИЙ РАДИУС ЗРЕНИЯ //A GROWING RADIUS OF VISION IS CREATED FROM THE DEPTH PULSE
        ЕГО ПОРОГ РАСШИРЯЕТСЯ НАРУЖУ И ГАСНЕТ, И Я ЕЁ ВИЖУ //AS ITS THRESHOLD EXPANDS OUTWARDS AND FADES, I SEE IT
        ГРУДУ МЁРТВОГО МЕТАЛЛА, В ТАКОЙ(-то) ПУСТОШИ //IN THIS DESOLATE PLACE, A MASS OF DEAD METAL
        ЧТО-ТО ВРОДЕ СУДНА, ИЗГОТОВЛЕННОГО КУЗИНАМИ, НО... //SOME SORT OF VESSEL MANUFACTURED BY THE COUSINS, BUT...
        Я ПЕРЕВОЖУ СВОЁ ВНИМАНИЕ НАРУЖУ И ОБМЕНИВАЮСЬ ВЗГЛЯДОМ С θ█████ //I DRAW MY ATTENTION OUTWARDS AND EXCHANGE A LOOK WITH █████

    origin
        you see it too?

    other
        да...
        a cousinly vessel that must have sunk long ago    судно близнецов, должно быть давно затонувшее

    origin
        look towards its center--see how it splits?
        what is happening to it...?
        is that where she wants us to go?
        
    other
        no way    точно нет
        не нравится мне его вид
        besides, whatever is being done to it, it is not for habitation    кроме того, что бы с ним не происходило, это не для обитания
        we need to keep looking - it must be near here    не будем прекращать поиски - он точно где-то рядом
        
    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["corru"] /*--- кс кс слизнячок*/ = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'
    
    sourceless
        в относительной безопасности входного тоннеля, θ██████ понижает свой поверхностный голос
    
    guard
        incredible... that would have taken so much longer, before    невероятно... раньше такое заняло бы гораздо дольше // я не уверен говорят ли так. заняло бы дольше
        θ██████, what is the count?    θ██████, сколько их?
    
    sourceless
        несмотря на то, что настоящий ответ прямо около завитка моего рецептора, 
        я разыгрываю шоу с подсчитыванием своих когтей, а затем выдаю одну из своих любимых фразочек
    
    stupid
        ах... нам придётся позвать тира!
    
    sourceless
        он посмеивается, к моему удивлению
        ещё несколько θмигов назад он, казалось, был раздражён моими подшучиваниями
        однако после, как и задумано, я сразу же даю ему подобающий ответ
    
    stupid
        я насчитала чуть больше тридцати
    
    elder
        хаха!
        thirty, from just that trip...     целых тридцать, за один этот поход...
        
    sourceless
        θ██████ останавливается и берёт свою серое-пульсирующую валика-цисту за её шнур,
        трясущеюся рукою оттягивая её на уровень глаз, чтобы он мог взглянуть в неё как полагается
        я ощущаю моментальный шок, как и его сын, судя по его рецепторам, 
        но мы оба осознаём, что он смотрит скорее в сторону, нежели прямо на смертельную часть
        
    elder
        from simple food containers, to the deadliest weapons ever conceived...     от простых контейнеров для еды, до самого смертельного из всех оружий...

    sourceless
        пока он стоит, уставившись внутрь неё, какое-то пустое движение проходит в его рецепторах
        нетрудно понять, когда тир витает в облаках
    
    elder
        корру...
        you know, they came up with using the spheres they form for food just when my receptors started to split     знаешь, они додумались использовать формируемые им сферы для еды, когда мои рецепторы только начали расщепляться
        my excavation mentor once told me the strangest stories about it, and our ancestors...     когда-то наставник по раскопке рассказывал мне наистраннейшие истории о нём и наших предках...
        it was not long after we struck that great natural vein of it down in the deep chambers     это было незадолго после того, как мы наткнулись на ту великую естественную жилу в глубоких залах
        it is so much smaller now...      теперь она гораздо меньше...
        as we prepared a harvesting bore, you know what he said?    знаешь, что он рассказал мне, пока мы готовили скважину для сборки? 
    
    sourceless
        θ██████ поворачивается ко мне, его ветвистые рецепторы раскидывают свои кончики
    
    elder
        his father, and his fathers before him, saw it as a pest!    его отец, и отцы его отца, считали корру вредителем!
        хаха!!
        how the tir of old would encounter it in great walls while digging,   тиры прошлого натыкались на громадные стены из него, пока копали,
        and it had to be scraped away by claw, or dug around, as our acids had no effect...     и им приходилось соскабливать его когтями, или копать в обход, потому что наша кислота не имела эффекта...
    
    sourceless
        он снова оборачивается на тропу вереди, продолжая предаваться воспоминаниям, пока осторожно ступает вниз по склону
        его сын указывает рецепторами вперёд, и мы начинаем следовать
    
    elder
        that feeling, when wild corru gets on your receptors    ощущение, когда дикое корру попадает на твои рецепторы
        have you ever felt it?    ты знаешь, каково оно?
    
    sourceless
        его сын хранит молчание, безразличный
        должно быть он уже слышал всё это раньше
    
    stupid
        нет!
        обычно его держат запечатанным в тех больших черепах
    
    elder
        well, if even a drop of it gets on,    ну, если на них попадает хоть капля,
        you feel eyes on you - like something is in the chamber with you,    ты чувствуешь на себе взгляды - словно ты в комнате не один,
        staring, listening...    и на тебя пялятся, слушают...
        but i guess all this time, it really was listening, right? haha!    но, выходит, всё это время оно и правда слушало, да? хаха!
        what do you think they will do next with it? velzie's eye cast down, θ████ got a new arm out of the stuff!    как думаешь, что они дальше из него слепят? velzie's eye cast down, у θ████ из него новая рука!

    stupid
        что же, понадобится ещё один <span definition="INHERITED CONTEXT::'common myth';'intoxicated tir knocked over corru container and fell into it'">tir stumbling into their research chamber</span>, чтобы выяснить что будет следующим!
    
    sourceless
       его смех переполняет тоннель. этого достаточно, чтобы мои рецепторы скрутило в тугую спираль
    
    elder
        θ██████, start planning a transport to oltazni for me, would you?     θ██████, распланируй-ка для меня транспортировку в олтазни
        i have a foundry to barge into     мне нужно ворваться в их цех
    
    guard
        right away, father     сей же θмиг, отец

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["dog"] /*--- кс кс слизнячок?????? что кскскскс. я не собака*/ = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        собака θ███ дала дëру от меня, но, в этой закрытой комнате, далеко ей не убежать // dog skitters&&&&?????? away from me, but in this closed chamber, it can only go so far
        у неё не остаётся и шанса, когда я бросаюсь вперёд и сплетаю свои руки под её панцирем, утягивая её в объятия //it stands no chance as i leap forth, curling my arms under its shell and pulling it into a hug
        она пищит, точно неспелый селки, когда я отрываю её от земли и кручусь в танце вокруг мебели θ███ //it squeaks like an unripe celki when i tear it from the ground, and i spin while i dance around θ███'s furniture
        я замечаю, как блеск оптики θ███ поглядывает скептитически из подсоединённой готовочной комнаты, но я не повожу и рецептором :: у обесков нет слова кухня..... // i see the lights of θ███'s optics peering skeptically from the connected cooking chamber, but pay her no mind
    
    kind
        о, θ███, прекрати свои издевательства, ему страшно
    
    sourceless
        её ровный голос выдаёт её веселье //her flat voice betrays her amusement
    
    stupid
        ничем не могу помочь, дорогая сестрица! // i cannot help myself, dear sister!
        я вижу еду - я выхожу на охоту! //i see food, i must hunt!
    
    sourceless
        и всё же, я опускаю собаку и делаю шаг назад //still, i set down the dog and leap backwards
        она отпрянывает и разворачивается, ожидая мой следующий ход//it skitters and turns about to face me, waiting for my next move
    
    stupid
        видишь о чём я говорила?//see what i said?
        очевидно же, ей не будет//станется лишним немножко подурачиться! //clearly, it is merely play-deprived!

    dog
        ь̀́
    
    sourceless
        я совершаю полувыпад, тут же останавливаясь,(?) едва начав, чтобы показать, что мы ещё не закончили // i half-lunge at it, stopping just an instant after i start, to tell it we are not done
        она реагирует, пригибаясь ещё ниже к земле, и, замерев на мгновение, резко выскакивает на меня // it ducks lower to the ground in response, and after another moment of stillness, it scurries towards me abruptly
        я смеюсь и издаю вопль удивления, отступая и чуть ли не взбираясь на стену за моею спиною //i laugh and squeal in surprise, backing off and nearly climbing backwards up the wall
        даже θ███ смеётся, когда та начинает преследовать меня повсюду //even θ███ laughs as it chases me about
        я едва ли избегаю столкновение с роскошною кальстиковою стойкою θ███ //i narrowly avoid crashing into θ███'s ornate kalstik stand
    
    kind
        хорошо, хорошо...
        только, пожалуйста, не разбейте там ничего!!
        я почти закончила
    
    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["dull"] = generateDialogueObject(`
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
        внимание, θ██████! 
        это это θ██████!
        speaking on behalf of anterior dull station '<span definition="NOTE::'partial translation';'reference to weather phenomena'">brightwall</span>',     говорю от имени предварительной станции серое '<span definition="NOTE::'partial translation';'reference to weather phenomena'">brightwall</span>', 
        you are all clear to proceed!     ты можешь продолжать движение!
        be sure you release all active dull tethers or hearts,      не забудь отпустить все активные шнуры или сердца серое,
        also expect to lose communications for a little bit      и знай, что ненадолго потеряешь связь
        oh yes, and if you brought any <span definition="NOTE::'partial translation';'implied closest cultural equivalent'">tithes</span>,      ах да, и если ты взяла с собою какие-либо <span definition="NOTE::'partial translation';'implied closest cultural equivalent'">десятины</span>,
        say your goodbyes! hehe     попрощайся с ними! хехе

    origin
        of course, thank you
        <span definition="INHERITED CONTEXT::'common phrase';'religious implication';'implies wish for safe journey'">keep velzie entertained</span>, will you?

    other
        hehehe, we will hold a performance just for you     хехехе, мы чтототам я устал
        your correspondent will establish contact as soon as you are on the other side
        good luck!    удачи!

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
`)
env.localization.page["sec"].dialogues["flower"] /*--- кс кс слизнячок (изабель) СЛИЗНЯЧОООООООООООООООООООООООООООООКРПГСНАВЧРЫЯВ*/ = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        after peering through the thick glass of θ██████'s trading chamber to ensure no other bright cousins linger within, i push through the front entry
        a chime with the distinct buzz of their lightning announces my entry, and θ██████ peeks out from the door in the back,
        barely visible through the stands and displays of bright ground-parasites
        no no... 'flowers'... i must call them 'flowers'
    
    flower
        Эй, подождите минутку!
        Мы вот-вот закроемся, так что дайте знать, если Вам что-нибудь нужно, и я быстренько Вас обслужу. // :: :)
    
    sourceless
        as predicted - she does not recognize my form
        i idly browse the yellow ones, quietly creeping towards the back, where she lingers out of sight
        how will i surprise her, i wonder?
        oh--what if i smoothed over this face!! featureless... she will be terrified!!
        hehehe... an effortless morph for this disguise
        when she finally emerges, i face away from her, acting as if i am merely browsing
    
    flower
        Эй, Вы меня слышали? Может быть Вам помочь найти--

    sourceless
        i turn to face her
        despite having no visible eyes, i can still see her
        her face turns pale, smile fading, half-stepping back, but half frozen in terror
    
    flower
        Боже мой.
        Боже мой.

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
        θ██████, какого...
        КАКОГО чёрта?
        Не думаю, что я хоть раз в своей жизни была настолько напугана.
        Когда ты сказала "маскировка", я представила, не знаю, шляпу с широкими полями и плащ?
    
    sourceless
        funfriend - make a note of that
    
    wiser
        ahh, yes, yes, this is it!!
        this was an old research form, used in the early θgazes of our research into your languages...
        it is kind of fun to use
    
    sourceless
        θ██████ steps forward, poking at the fabric of one of my sleeves
        she continues laughing, mostly from relief that i am not a horrible monster
    
    flower
        И что это такое? Ты настоящая катастрофа.
        Нам нужно поработать над твоим "Стилем Светлых Близнецов".
        В любом случае, дай мне несколько минут, я закончу оставшиеся дела и мы можем идти.
    
    wiser
        all right!

    flower
        и НЕ ДЕЛАЙ так больше, поняла? // :: хмм вставить ли вместо "усекла" или это как-то грубовато
    
    sourceless
        i take great care not to give her a verbal answer

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["humor"] /*--- кс кс слизнячок*/ = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'
    
    sourceless
        я сажусь напротив холодной плоти <span class="code">вейлька</span>, пока даже более холодный ветер яростно хлещет за пределами ззепеля,
        вейльк-носитель медленно пробивается сквозь вазнийский шпилешторм, каждое мгновение борясь с вихрями воздуха
        капли воды и град бьются о внешнюю оболочку ззепеля,
        влага просачивается сквозь трещины и накрапывает внутрь моего убежища, поблёскивая во внутреннем освещении
        это всегда так неприятно...
        к счастью, региональный координатор достаточно свободен для общения, за исключением этого прерывания
        θ█████ наконец-то возвращается ко мне через приёмник сероегласа,
    
    other
        прости, надо было направить другого бежца
        на чём я остановился? мысль выскользнула меж моими соединениями с дронами!
    
    stupid
        чтение юмора! помнишь? что-то про твоего отца?
    
    other
        о, да! так--я не перенял интерес моего отца к юморизму,
        но он с его юмористскими друзьями начали пробовать использовать с ним корру
        замысел всегда заключался в чтении ощущения от receptor curls, так что
        разумеется в наши θвзоры это уже не так принято и встречается реже
    
    stupid
        ахахаха! да, даже в олтазни это считается чуть ли не извращением!
    
    other
        right? it is the same here!      да? тут тоже так!
        of course, i think there is some merit to it,      разумеется, я думаю, что в этом есть некий смысл
        the feelings from a curl are complex after all, and supposedly unique      ведь чувства от curl многогранны, и якобы уникальны
        so, they wanted to find a way to continue the practice,       в итоге они хотели найти способ продолжить практику
        without the weight of the city's skeptical gaze crushing them      без давления скептического взора города
        and here is the interesting part: they succeeded!      и вот что любопытно: у них получилось!
        they established a method of doing <em>remote</em> readings!!      они образовали метод проведения <em>удалённых</em> чтений!!
    
    stupid
        что ж, какой в них вообще смысл без завивания?
    
    other
        come, this is my father we speak of - an honest, bonded tir!      ну же, мы говорим о моём отце - честном, верном тире!
        the vague energy found in others was his interest, not simply curling receptors with strangers      его интересовала неточная энергия в других, а не просто завивание/свивание рецепторов с незнакомцами
        anyway, all it takes is a dullvoice connection, and silence      в любом случае, всё, что нужно - соединение по сероегласу и тишина
        they actually put together and distributed a guide, in hopes of bringing legitimacy back to the practice      они даже составили и распространили инструкцию, надеясь вернуть практике легитимность ← глупое слово <-- всё ещё глупое
        i helped by reviewing the guiding thoughts of his group, it really is very simple      я помогал, обозревая инструктирующие мысли его группы, это и правда очень легко
        in fact, i could do one for you right now!      на самом деле я могу провести одно для тебя прямо сей θмиг!
    
    sourceless
        ох, какое в этом веселье без завивания?
        раскат грома и молнии сотрясают ззепель
    
    stupid
        хорошо, почему бы и нет? давай же узнаем, какой путь прочерчен мне велзи! 
    
    other
        haha! good! хаха! хорошо!
        all right, you just need to keep the connection open, as if you are thinking something to me...      ладно, тебе просто нужно держать соединение открытым, словно ты что-то для меня мыслишь...
        but try not to think anything      но постарайся ни о чём не думать
    
    stupid
        думать не думая?
        а затем мне, что, отрастить хвост?
    
    other
        я знаю, что звучит глупо, но это возможно! попробуй сфокусироваться на дожде!
    
    sourceless
        о, довольно просто
        я закрываю глаза, когда ещё один шаг вейлька-носителя приземляется далеко внизу
        следующий не наступит достаточно θмигов, так что это удачное время
        дождь...
        ...
        наше соединение затихло, но по-прежнему открыто - я всё ещё могу чувствовать его
        в нём есть что-то напоминающее завивание рецепторов, без физического ощущения
        бесчисленные туманные ощущения захлёстывают, невозможно ухватиться за начало ни одного из них,
        раскаяние, счастье, смех, переполняющий мою грудь - но все они далёкие, скоротечные
        они проходят мимо меня, как ветра шпилешторма
    
    other
        ...
        я думаю, что сделал правильно, но...
        нет--может я сделал не так
    
    stupid
        ха? ну же, расскажи мне!
        ты не можешь сказать такое и не поделиться результатом!!
    
    other
        хехех, ну,
        или взор велзи устремлён прямо на тебя, или мне нужно попробовать снова
        выглядит так, словно у тебя лишь свет да когти!

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["larval"] /*--- кс кс слизнячок*/ = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        ПОКА Я ЧИНЮ СВОЮ ВАЛИКУ, θ█████ ПОДХОДИТ К УГЛУ АММУНИЦИИ ПОД МОИМ КОМАНДОВАНИЕМ // Я всё ещё ненавижу эту строчку
        Я ПОДНИМАЮ НА НЕГО ВЗГЛЯД, ШИРОКО РАССТАВЛЯЯ РЕЦЕПТОРЫ В РАДОСТНОМ ПРИВЕТСТВИИ, ТОЛЬКО ЧТОБЫ УВИДЕТЬ, ЧТО ЕГО СМИРЕННО ОПУЩЕНЫ В ВОЛНЕНИИ    аэ глупое

    stupid
        эй θ█████!!!

    hesitant
        привет θ██████!

    stupid
        что привело тебя сюда? у них есть ещё одно устройство мне на пробу?
        айма цисты были невероятными, использовать их было словно...
        глаз моего разума, приумноженный, парил вне моего тела
        это дезориентирует, но... открывает глаза. хехехе
    
    hesitant
        о, да... да, открывает
    
    sourceless
        МОИ РЕЦЕПТОРЫ ПРИВОДЯТСЯ В СХОЖИЙ ОБЕСПОКОЕННЫЙ ИЗГИБ
        ОН ВЫГЛЯДИТ ТАКИМ МРАЧНЫМ...?

    stupid
        итааак...?
        что там?
    
    sourceless
        ОН ТЯНЕТСЯ КО ВНУТРЕННЕМУ КАРМАНУ ДОЛГОПОЛОГО ПЛАЩА, ИЗВЛЕКАЯ ДОВОЛЬНО КРУПНУЮ РУЧНУЮ ЦИСТУ 
        НА МОМЕНТ ОН ВПИВАЕТСЯ ВЗГЛЯДОМ В НЕЁ, ЗАСТЫВШИЙ, ПРЕЖДЕ ЧЕМ МОЛЧА ПРЕДЛОЖИТЬ ЕЁ МНЕ

    hesitant
        это...
        новое устройство для чрезвычайных ситуаций из вазнийских цехов
        они, эм...
    
    sourceless
        Я НЕ МОГУ СДЕРЖАТЬ ХИХИКАНЬЕ, ГЛЯДЯ, КАК СТРАННО ОН СЕБЯ ВЕДЁТ
        ПО-ВИДИМОМУ, ЭТО ВСТРЕВОЖИЛО ЕГО ЕЩЁ СИЛЬНЕЕ
        Я РАЗГИБАЮ ОДИН ИЗ СВОИХ РЕЦЕПТОРОВ, ЧТОБЫ ПРИСОЕДИНИТЬСЯ К НЕМУ, НО В ОТВЕТ ОН ЧУТЬ ЛИ НЕ КИДАЕТСЯ НА МЕНЯ
    
    hesitant
        по--погоди!
        не подключайся к нему!!
        оно... вытягивает твой разум
    
    stupid
        чего?

    sourceless
        МОЙ РЕЦЕПТОР ТУТ ЖЕ ЗАВИВАЕТСЯ ОБРАТНО

    stupid
       что? как? 

    sourceless
        θ█████ НЕРВНО СЖИМАЕТ КОГТИ, РЕЦЕПТОРЫ ИЗГИБАЮТСЯ НАЗАД ПОХОЖИМ ОБРАЗОМ
        
    hesitant
        как я и сказал... для чрезвычайных
        видишь ли, θжаты из зевазнийского цеха изобрели новый процесс...
        они говорят, что это новое состояние жизни - вид несмерти
        при котором ты живёшь в корру... твой разум, твоё тело, ты весь

    stupid
        это так круто!!!!

    hesitant
        чт-что?
        нет, это крайне опасно!
        не только для тебя, но и... для будущего
        то есть, если это распространится, в конце концов, нуу...
        это может стать нашим концом, понимаешь?
        в любом случае, я хотел отдать тебе одно из полученных нами

    stupid
        ...и, ты хочешь, чтобы я <em>не</em> использовала его?
    
    hesitant
        разумеется нет, но, если ты и правда будешь таким заниматься...
        мир очень быстро меняется, θ██████
        и я хочу, чтобы ты могла созерцать его
        если тебя атакуют на одном из твоих (забегов? ::хорошо), или поймает...

    sourceless
        ОН ОТБРАСЫВАЕТ ЭТУ ИДЕЮ, ДАЖЕ НЕ ЖЕЛАЯ ЕЁ РАЗВИВАТЬ

    hesitant
        это твой лучший шанс продолжить жить
        или делать... подобие этого

    sourceless
        Я ХИХИКАЮ С РАЗДРАЖЕНИЕМ - ДО ЧЕГО СБИВАЮЩИЕ С ТОЛКУ ПОСЛАНИЯ!
    
    stupid
        что же, это что-то вроде тех--как ты их называл?
        эхо?
        если я использую его... буду ли это я?

    hesitant
        да, несомненно
    
    sourceless
        θ█████ САДИТСЯ НА МОЮ АММУНИЦИОННУЮ СТАНЦИЮ НАПРОТИВ МЕНЯ         θ█████ SITS DOWN AT MY _ARMORY STATION_, ACROSS FROM ME

    hesitant
        так же, как айма цисты становятся продолжением твоего разума
        это делает и мыслеядро--так они это называют
        не могу даже представить, какому безумцу это пришло в голову, но... 
        оно перекладывает твой разум в себя, а затем отсоединяется,
        оставляя умирать пустую оболочку
    
    sourceless
        Я ЗАДУМЧИВО ГЛЯЖУ НА СТЕКЛЯННУЮ ПОВЕРХНОСТЬ МЫСЛЕЯДРА
        ПОД ЦИСТОЗНЫМ СТЕКЛОМ Я ВИЖУ БЛУЖДАЮЩЕЕ ВНУТРИ КОРРУ
        МЕДЛЕННЫЙ, ВЬЮЩИЙСЯ ПОТОК ФИОЛЕТОВОГО ПЕРЛАМУТРА
        ОНО ЗАВОРАЖИВАЕТ - БОЛЬШЕ, ЧЕМ ЛЮБОЕ ДРУГОЕ УСТРОЙСТВО, ПОБЫВАВШЕЕ У МЕНЯ В КОГТЯХ
        РЕЗУЛЬТАТ ЕГО ПЛОТНОСТИ, НАВЕРНОЕ? ОНО ДОВОЛЬНО ТЯЖЁЛОЕ
        ОХ--ТОЧНО, ОН ВСЁ ЕЩЁ ЗДЕСЬ

    stupid
        что ж, не беспокойся!
        ты ещё не видел моего мастерства взбирания на вейльков!!
        и рассказывала ли я тебе когда-нибудь, как я <em>сломала</em> руку гуктику?

    sourceless
        Я СЖИМАЮ КУЛАК И ПОДНИМАЮ СВОЮ ПРАВУЮ РУКУ, ДЕМОНСТРИРУЯ ХИТИН НА МОЁМ ПРЕДПЛЕЧЬЕ     слизнячок откуда правом............ :: я там был и сам всё видел
        ОН УЖАСНО РАСКОЛОТ, С ТАКОЮ ГЛУБОКОЮ РАНОЮ В ХИТИНЕ, НА ЛЕЧЕНИЕ КОТОРОЙ МОЖЕТ УЙТИ ЦЕЛЫЙ θглаз
        НО В ЭТОМ И ПРИЧИНА ДЛЯ ГОРДОСТИ. ВЗМАХ МОЕЙ РУКИ, ЧТОБЫ ОТВЕСТИ ВЫПАД ГУКТИКА В ВЕРНЫЙ МОМЕНТ...
        ХРЯСЬ!! О, КАКАЯ БОЛЬ, НО ВИДЕТЬ, КАК ОН МЕЧЕТСЯ ПОСЛЕ ЭТОГО, ТАКАЯ МОЩЬ!!
        ТОЛЬКО ПРЕДСТАВИТЬ, НА ЧТО Я БУДУ СПОСОБНА В ТЕЛЕ ИЗ КОРРУ...
        θ█████ СМЕЁТСЯ, ОТМАХИВАЯСЬ СВОИМИ РЕЦЕПТОРАМИ ОТ МОЕГО БАХВАЛЬСТВА


    hesitant
        да, я всё ещё помню, как ты мне об этом рассказывала
        и не раз...
        слушай, просто не воспринимай это за повод творить безрассудства, хорошо?
        мы пока не до конца знаем, какие у этого долгосрочные последствия
    
    stupid
        но если я <em>буду</em> их творить, ты же поможешь мне создать новое крутое тело, так?

    sourceless
        ОХ, НЕ СТОИЛО МНЕ ЭТО ПРОИЗНОСИТЬ
        ВЗГЛЯД, КОТОРЫМ ОН МЕНЯ ОДАРЯЕТ...
    
    stupid
        прости, хихихи... просто дурачусь
        разгневайся велзи! это почти тот же глаз, что наблюдает за мною во время моих путешествий, в конце-то концов

    sourceless
        В ЕГО РЕЦЕПТОРАХ ФОРМИРУЕТСЯ МЯГКОЕ ВНИМАНИЕ
        И ОН ДАРИТ МНЕ ТИХИЙ, ПОЧТИ БЕЗЗВУЧНЫЙ СМЕШОК, КОГДА ВСТАЁТ, ЧТОБЫ УЙТИ
        ВСЁ ТАКОЙ ЖЕ МРАЧНЫЙ... ПОТОМ НУЖНО БУДЕТ ЗАХВАТИТЬ ВЕЙЛЬКОВЫЙ ФРУКТ, ЧТОБЫ ПОДБОДРИТЬ ЕГО     вейльк-фрукт? :: нет
    
    hesitant
        разгневайся велзи!
        
    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["parasite"] /*--- кс кс слизнячок*/ = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
         θ██████ ВАЛИКА-РОЖДЁННЫЕ КОРРУЦИСТЫ ДЁРГАЮТСЯ В ВОЗДУХЕ ВО ВРЕМЯ СКАНИРОВАНИЯ МЕСТНОСТИ //θ██████'s VALIKA-BORNE CORRUCYSTS TWITCH IN THE AIR AS THEY SCAN THE AREA я всё ещё не уверен
        ВОНЬ ТРУПА НЕКОГДА ОСЛЕПИТЕЛЬНОГО ВЕЙЛЬКА... МНЕ ВСЁ ЕЩЁ НУЖНО ПРИВЫКНУТЬ К НЕМУ
        ЗА ПРОШЕДШЕЕ ВРЕМЯ ЕГО КОСТИ НАЧАЛИ ВЫПИРАТЬ СКВОЗЬ ПЛОТЬ, И СКОРО ИХ МОЖНО БУДЕТ СОБИРАТЬ
        НО НА СЕЙ θмиг СЕЗОН ПЛОДОВ, ТАК ЧТО ВОЗДУХ ПЛОТНЫЙ И ПРОГОРКЛЫЙ
        МЫ СТУПАЕМ ПО ЗАСТИЛАННОЙ ПЛОТЬЮ ЗЕМЛЕ С ОМЕРЗИТЕЛЬНЫМИ ЗВУКАМИ, И НА КАЖДЫЙ ТАКОЙ ЗВУК ПЕЩЕРНЫЙ СТРАЖ ДЁРГАЕТ РЕЦЕПТОРАМИ
        ХАХАХА!! ОН ЧЕРЕСЧУР ПРИВЫК К СВОИМ ВЫСОКОУГРОЖАЮЩИМ ОБЯЗАННОСТЯМ
        Я ПОДНИМАЮ СВОЮ КОРЗИНУ ДЛЯ СБОРОВ И ЗАВОЖУ С НИМ РАЗГОВОР ВО ВЕСЬ ГОЛОС, ПОВЕРНУВШИСЬ СПИНОЮ К θ█████, ВСЁ ЕЩЁ ПРОДОЛЖАЯ СЛЕДОВАТЬ
    
    stupid
        расслабься!
        самое сложное позади
    
    sourceless
        РЕАГИРУЯ НА МОЮ ГРОМКОСТЬ, ЕГО РЕЦЕПТОРЫ НЕОДОБРИТЕЛЬНО НАКЛОНЯЮТСЯ НАЗАД
        В ОТВЕТ ОН БОРМОЧЕТ ПОВЕРХНОСТНЫМ ГОЛОСОМ

    guard
        не своди глаза с дороги

    sourceless
        И ВСЁ-ТАКИ В ПОЛОЖЕНИИ ВЕТВИСТЫХ РЕЦЕПТОРОВ θ██████ УГАДЫВАЕТСЯ ВЕСЕЛЬЕ, И ОН ТИХО ПОСМЕИВАЕТСЯ
        Я НЕ ВОЗРАЖАЮ СОПРОВОЖДАТЬ ЭТИХ ДОПУЩЕННЫХ ЗЕВАЗНИ СТАРЦЕВ ПО ОБЯЗАННОСТЯМ :: ?
        ИХ ЦЕХА ВЫПУСКАЮТ ПО-НАСТОЯЩЕМУ ВЫДАЮЩИЕСЯ УСТРОЙСТВА - ЗАМЕНЫ ДЛЯ КОНЕЧНОСТЕЙ, ВАЛИКА-СОЕДИНЁННЫЕ ЦИСТЫ...
        УВЕРЕНА, НЫНЕ θ██████ СМОЖЕТ ЗАЩИТИТЬ СЕБЯ, ДАЖЕ ЕСЛИ НАС ОБНАРУЖИТ ОХОТНИК
        Я СЛЫШУ, КАК ОН БОРМОЧЕТ ЧЕРЕЗ СЕРОЕГЛАС, ДЕЛАЯ ГЛУБОКИЙ ВДОХ,

    elder      
        ах... это навевает воспоминания
        никогда бы не подумал, что вновь увижу подобное
        или почую, но по этой части я не так уж и скучал... хаха!!
        ведомые взором жаты...
        ах! вот!
                                
    sourceless
        ЕГО АЙМА ЦИСТЫ СВОДЯТ СВОИ ВЗГЛЯДЫ НА СВЕТЯЩЕЙСЯ ЩЕЛИ В ТЕЛЕ ВЕЙЛЬКА
        МЫ ОСТАНАВЛИВАЕМСЯ В УНИСОН И ПЕЩЕРНЫЙ СТРАЖ ПОЧТИ ЧТО ДЕЛАЕТ ШАГ ВПЕРЁД, НО Я ОСТАНАВЛИВАЮ ЕГО, ПОВОРАЧИВАЯСЬ ВПОЛОБОРОТА
        ОН КИДАЕТ НА МЕНЯ НЕГОДУЮЩИЙ ВЗГЛЯД, НО ПОНИМАЕТ - ЭТО ВЕСЕЛЬЕ ПОЛАГАЕТСЯ θ██████, НЕ НАМ
        ВАЛИКА-РОЖДЁННЫЕ ЦИСТЫ θ██████ ЦЕЛЯТСЯ В СУЩЕСТВО, ПОКА ОН МЕДЛЕННО И ОСТОРОЖНО ШАГАЕТ ДАЛЬШЕ
        ЕГО ШАГИ НАСТОЛЬКО ТИХИЕ, ДАЖЕ НЕСМОТРЯ НА ПОЧВУ ИЗ СГНИВШЕГО ВЕЙЛЬКА... ВОТ БЫ Я ТОЖЕ ТАК МОГЛА!!
        КАК ТОЛЬКО АЙМА ЦИСТЫ ЕГО ВАЛИКИ СВЕТЯТСЯ В ПОДТВЕРЖДЕНИЕ, ЦЕНТРАЛЬНАЯ ИСПУСКАЕТ ИМПУЛЬС СЕРОГО СВЕТА
        КОГДА НАШЕ ЗРЕНИЕ ВОЗВРАЩАЕТСЯ, КОНЕЧНОСТЬ ВЕЙЛЬКА РАССЕЧЕНА, ВЫСВОБОЖДАЯ СВЕЧЕНИЕ ПЛОДОВ СЕЛЬКИ

    elder
        хахахаха! я и когтя не поднял! // или сделать это обескоприколом или перевести как подобает когтем не шевельнул
        эта полностью спелая, бороться не будет
        another one for the basket      ещё одна в корзину 

    guard
        я её возьму

    sourceless
        СЫН θ██████ ПРОТЯГИВАЕТ РУКУ И ХВАТАЕТСЯ ЕЮ ЗА ОСНОВАНИЕ СЕЛЬКИ
        ДРУГОЮ РУКОЮ СЖИМАЯ НЕБОЛЬШОЙ РЕЗЕЦ, ЧТОБЫ БЫСТРО И ЧИСТО ОТРЕЗАТЬ ЕГО ОТ ТОЧКИ ПИТАНИЯ
        КЛУБНЕОБРАЗНЫЙ ФРУКТ СЛЕГКА ШЕВЕЛИТСЯ, НО СЛИШКОМ ТОЛСТ, ЧТОБЫ ЧТО-НИБУДЬ СДЕЛАТЬ
        ТАК ЧТО ЕГО С ЛЁГКОСТЬЮ ШВЫРЯЮТ В КОРЗИНУ, И МЫ ПРОДОЛЖАЕМ...
        
    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["spire"] /*--- кс кс слизнячок*/ = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        ...я роюсь в моей промокшей насквозь накидке, моя голова покоится на холодной плоти <span class="code">вейлька</span>
        всё начинает трястись, как только мой несущий вейльк совершает ещё один шаг далеко внизу
        в конце концов я нахожу его: мой приёмник сероегласа!
        с быстрым прикреплением к моему излюбленному рецептору, я соединяюсь с региональным координатором...
        θ█████, я полагаю... славный тир, хоть мы и не общались много
        спустя несколько хорошо поставленных мыслей он оказывается доступен, и я устанавливаю контакт 
        и всё же есть в нём какое-то препятствие... надвигается шпилешторм, наполняющий мои чувства вездесущим грохотанием

    stupid
        привет θ█████!! это θ██████!!
        я закрепила позицию на жёлтоглазом вейльке-носителе
        как далеко я? и от шпиля, и от указни, если можно
    
    other
        о, и вновь привет!
        i hope velzie has been kind to your journey so far!      надеюсь велзи благосклонно к твоему путешествию!     глупое велзи    глупая фраза :: очень глупая
        проверю сей θмиг... у меня рядом есть дрон
        ...
        ах, да, вот и ты!
        хорошо, сей θмиг стадо отдыхает, но их верхо-отростки демонстрируют волнение... думаю, они скоро выдвинутся вновь // :: надо подумать над верхо-отростками когда я буду менее сонным. тире? верхнеотростки?
        если это так, они продолжат по пути к указни озо, и в течении θвзора ты будешь у хорошего места для спуска!
        мои расчёты: скорее всего движение продолжится менее чем через θмиг, два θмига прежде чем ты полностью пройдёшь мимо шпиля, а затем ещё два θмига чтобы оказаться рядом с указнийским массивом
        this assumes ideal conditions, and that the veilk do not stop for rest again--which, i think is unlikely      это если предположить, что условия будут идеальными, а ещё что вейльки больше не будут отдыхать--это мне кажется маловероятным
        так или иначе, надеюсь, что тебе есть, чем заняться, θ██████!
        и должен сказать, я очень удивлён...
        тебе для этого не выдали ходень?
        он сократил бы путь на несколько θмигов и позволил бы тебе полностью избежать шпиля
    
    stupid
        хехе, нет, это не жизненно важная вылазка - можно назвать её личною
        совет отлазни допускает использование ходенев только в экстренных случаях
        так или иначе, спасибо за помощь θ█████!
        <span definition="NOTE::'common phrase';'religious implication';'implies wish for safe journey'">развлекай велзи для меня!</span>
    
    other
        хорошо!
        и не забудь, когда окажешься там, не выходи из укрытия посреди шпилешторма!!
        молнии хоть и редко отдаляются от шпиля, но если ударяют, то сразу насмерть!
        пусть твой θвзор закончится добро, θ██████
    
    sourceless
        с закрытием соединения, судьба, уготованная мне велзи, ясна: 
        тухнуть со скуки в укрытии ззепеля до конца этого θвзора
        но раз уж у меня нашлось время...
        я нажимаю на какие-то корруцистические настройки рядом с верхушкою перевала, и обшивка в его нижней части отступает, 

    sourceless quiet
        позволяя мне вновь выкарабкаться на плоть вейлька

            EXEC::ratween(env.bgm, 0.75);

    sourceless
        дождь и ветер завывают с пущею силою, а напоминающий туман пар, покрывший поверхность, стал ещё выше... шпиль всё приближается, так что, возможно, это мой последний шанс взглянуть на него, прежде чем мне придётся укрыться
        я взбираюсь по боку моего носителя, осторожно наклонившись так, чтобы иметь возможность спуститься прямиком в моё укрытие
        очень скоро другие вейлькостебли оказываются позади внизу, открывая передо мною вид на просторы, поглощённые тьмою,
        чёрные облака, освещённые несчётным количеством мерцающих выростов под ними, прикреплённых к стадам вейльков...
        и там, вдалеке, находится шпилешторм - освещённый ударами его непрекращающихся молний, рокочущими бесконечно...
        неистовый вихрь, что опускается ниже облаков, кружит вокруг едва различимой пустой фигуры, принимающей форму лишь в момент, когда молния атакует её
        матовый чёрный монолит, безликий и опасный, исчезающий в небе: вазнийский шпиль...
        выше, чем самые высокие горы, шире, чем всё, что когда-либо возводилось
        и всё же, не будь у меня айма цисты, я бы никак не смогла его увидеть!
        он становится всё ближе с каждым сотрясающим шагом моего вейлька-носителя: отведённое мне на восхищение время крайне ограничено - мне нужно возвращаться...

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["surface"] /*--- кс кс слизнячок*/ = generateDialogueObject(`
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
        θ██████, it is me
    
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
        θ█████ PARTIALLY BLOCKS IT AS SHE LEERS AT ME

    tired
        this is not a joke, kelnit
        θ███████ has not returned
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
`)
env.localization.page["sec"].dialogues["veilk"] /*--- кс кс слизнячок*/ = generateDialogueObject(`
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
`)
env.localization.page["sec"].dialogues["yuzku"] /*--- кс кс слизнячок*/ = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        i have to contain myself from skittering well ahead of θ█████
        the gathering chamber's festivities will not go anywhere... just keep walking slowly...
        he is talking--what was he talking about again?

    hesitant
        ...and, right in the center of the cysts, they have this tiny pale gray one--and it connects to that very place!      ...и, прямо в центре цист, есть такая крошечная серая--и она прямо к этому и подключается!

    stupid
        no way!

    sourceless
        i have no idea

    hesitant
        right?! to think, it was right beneath our receptors all this time      перевести после реплики?! и ведь оно всё это время находилось прямо под нашими рецепторами
        i wager we could even see runners flying over the veilk, eventually!      держу пари(?), мы рано или поздно увидим, как бежцы летают над вейльками!
    
    stupid
        with wings?
    
    hesitant
        n-no, with the nodes! imagine--great hovering spheres attached to a back-piece, with veins up to receptors to control elevation, and direction...      н-нет, (перевести после предыдущей)! представь--великие левитирующие сферы, присоединённые к наспинному сегменту, с венами к рецепторами чтобы управлять высотою, и направлением...
    
    sourceless
        oh, yes... the dull bone stuff
        this all is interesting, but i do not care enough to learn deeply of it
        still, it is good to see him so excited, he has been so anxious lately
        as we continue up the tunnel, i notice a tir up ahead replacing one of the yuzku globes with one of the new corrucysts
        i stop nearby to observe her work, θ█████ trailing off and stopping near me soon after
    
    stupid
        hey!
        that is one of the new cavelights, right?
    
    other
        ah? oh, yes!      ах? о, да!
    
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
        i will not!      а я нет!
        maintenance and feeding was such a chore...      содержание и кормление так надоедали...
        with these new ones, all i do is put in a strange little blue square the θjut pass along,      с этими новыми всё, что я делаю - ложу странный маленький синий куб, переданный θжатами,
        then it lasts for θgazes and θgazes!      и его хватает на θвзоры и θвзоры!

    stupid
        a square...
        θ█████, could that be the 'sfer' stuff?
    
    hesitant
        haha, no, i think this is a new one      хаха, нет, думаю это что-то новое
        it is probably a byproduct, or maybe it could be a specific sfer variant...      скорее всего побочный продукт, или, может, специальный тип сфера...
    
    sourceless
        i dip my receptors to the tir, and she responds in kind
        with a simple gesture to θ█████, we continue on our journey
    
    hesitant
        ...see, in the sfer "vats" that the zevazni foundries came up with,      видишь ли, в сферовых "чашах", которые придумали зевазнийские цехи,
        there is this layer of sludge that accumulates near the bottom, and i think they say it is blue--what was it called again...      у дна оседает слой слякоти, вроде говорят - голубой--как там они его называли...

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["zuzucri"] /*--- кс кс слизнячок*/ = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'
    
    sourceless
        the silence of this dormant herd is almost too much
        only the wind and thunder masks our slight movements as we draw closer to θ███
        it is by velzie's favor alone that she has survived out here so long... poor vel!!
        she sits against her dull beacon in the little clearing, bleeding, surrounded by the two bodies of her running companions
        it is fortunate that we found them while the eye still lights our path!    
        when I nearly enter the clearing, θ██████ grabs my arm and pulls me back,
        hiding us both from θ███'s view around a juvenile veilk tendril
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
        θ███ is sitting a little strangely, perhaps with too large of a pack,
        but from this side angle it is hard to tell
        the wind shifts towards us, the trio's trails made more apparent
        the vel's scent is strange, sickly, metallic...
    
    stupid
        you are right
        stay here
        prepare your dull-pulse, and keep it aimed on her
    
    sourceless
        i feel his affirmation through the dullvoice, and so i twist about,
        calling out in my surface voice before i step into full view of θ███,
    
    stupid
        θ███! is that you?
        are you all right?
    
    sourceless
        a cloud passes between the eye and this veilk herd just as i see θ███ turn towards me,
        and while we are plunged into darkness, i feel a terrible dread
        for i thought i saw her face split apart for an instant
        but as it passes, she pushes herself to her feet,
        face intact and spiraling receptors curled tight with worry
        
    host
        θ██████...?
        please--do not look away      
        i will go away again      
        i just blinked... i blinked and they were all gone!!      
        i did not do anything! please!      
    
    sourceless
        her arms and face are stained cyan with blood, 
        claws longer than they ought to be--more numerous than they should be...
        a dark, angular shape is obscured behind her, barely visible over her shoulders
        parts of it twist occasionally--alive!!
        θ██████ communicates to me via dullvoice,
        
    guard
        θ██████ - she is lost      
        if there is one zuzucri here, there are others      
        preparing to release the pulse      
    
    sourceless
        silently, as to not alert θ███ that i have a companion,
        i gesture for him to wait with a claw behind my back, and he obliges
        though every nerve in my body commands me to flee,
        i know - i must soothe θ███, lest the beast stop wielding her mind
    
    stupid
        θ███, it is all right...
        what happened?
    
    sourceless
        θ███ approaches, but her legs do not move, dragging against the soil
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
        though θ██████ would undoubtedly prefer that we free her from her role,
        i have an idea...
        with some rummaging through my cloak, i produce that little mindcore that θ█████ granted me
        it <em>was</em> for me, but if there is any chance we can save θ███...
        i offer it to her, arm outstretched, tilted away in case i must evade
        the zuzucri will surely be appeased by my apparent acceptance of her
    
    stupid
        no, θ███, it is OK!
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
        θ██████... it will not let me      
    
    stupid
        ah...
    
    sourceless
        the corru, it does not recognize her...
        velzie snatches away my hope once more, inspiration replaced with despair
        just as i prepare to signal to θ██████, her claws dig into the shell of the cyst,
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
`)
env.localization.page["sec"].dialogues["zmask"] /*--- кс кс слизнячок*/ = generateDialogueObject(`
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
        and brings the shine of θ███'s eyes upon me, from across the chamber
        two at first, then more--then two, again

    stupid
        θ███?

    sourceless
        if what they say is right, it should be θ███, right now...
        she approaches slowly, carried by the zuzucri's limbs behind her
        an indistinct mass that hides itself from me as best it can
        her silence is unsettling, enough that i nearly back into the reinforced entrance out of precaution
        a number of dark shapes rotate in the air above her, so--it must be working, right?
        my fear is silenced by seeing the glimmer of her receptor ornaments
        the joyous upturn and uncurl is enough to reassure me
        
    host
        θ██████!!
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
        the angled cavelight gives θ███'s eyes a clear glow,
        revealing the splitting marks of her face, curling at the edges even now in anticipation of this delicacy

    host
        so it was a good one?!
        this is so much...

    stupid
        yes! we are not sure how it happened, but...
        middle-sized, conveniently close, good health... still alive, actually!
        θ██████ and the examiners have been saying it had some malformed leg-tendrils,
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
`)
// effigy
env.localization.page["sec"].dialogues.drinkquestions = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        кто ты?<+>who
        как ты здесь оказалась?<+>here
        можно мне выпить<+>drink
        джокзи озо<+>ozo
            SHOWIF::"ozo__council-task"
        пока<+>END
`)
env.localization.page["sec"].dialogues["bar"] = generateDialogueObject(`
loop
    RESPOBJ::drinkquestions

start
    self
        привет

    sourceless
        внимание мыслеформы фиксируется на твоём сознании с непривычною ясностью

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
`)
env.localization.page["sec"].dialogues["dead"] = generateDialogueObject(`
start
    sys
        ОШИБКА::'нет данных';'визуализация невозможна'
    
    moth
        подожди
            SHOWONCE::
        почему оно перестало существовать просто потому что та эффигия ушла?
            SHOWONCE::
        странно
            SHOWONCE::

    RESPONSES::self
        вернуться<+>END
            EXEC::moveTo('/local/uncosm/where/')
`)
// sorry
env.localization.page["sry"].dialogues["velzie"] = generateDialogueObject(`
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
        is it here? i can't see it  // --- как     там что-то есть? ничего не вижу

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
`)
env.localization.page["sry"].dialogues["dead"] = generateDialogueObject(`
start
    sys
        ОШИБКА::'нет данных';'визуализация невозможна'

    RESPONSES::self
        вернуться<+>END
            EXEC::moveTo('/local/uncosm/where/')
`)




// --- hey buddy
env.dialogueActors["corrurubonus"] = {
    name: "cor-ru",
    type: "corruru",
    voice: ()=>{play('talkcroak', 1.75)}
}

env.dialogueActors["ros"] = {
    name: "ООО \"РОСРАЗУМ\"",
    type: "rosrazum",
    voice: ()=>{play('talkcroak', 1.75)}
}
                    
env.dialogueActors["mle"] = {
    name: "НАО \"Млечный Путь\"",
    type: "mleko",
    voice: ()=>{play('talkcroak', 1.75)}
}

env.dialogueActors["fiv"] = {
    name: "Фонд \"ПЯТЁРОЧНЁК\"",
    type: "lilfive",
    voice: ()=>{play('talkcroak', 1.75)}
}
env.dialogues["bonus_corruru"] = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'
        ВНИМАНИЕ::'поток памяти был записан сторонними ресурсами'
        ВНИМАНИЕ::'оригинальный источник потока памяти';'cor-ru'

    ros
        уаааааааааааа!!!

    mle
        боже диалог

    fiv
        Что

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
            FAKEEND::(вотето да)
`)
/*env.dialogues["bonus_corruru"] = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'
        ВНИМАНИЕ::'поток памяти был записан сторонними ресурсами'
        ВНИМАНИЕ::'оригинальный источник потока памяти';'cor-ru'

    corrurubonus
        блаблабла да этот кусок игры !!!неканон!!!
        пощдравляю
        вы
        только что
        наткнулись
        на пасхалку от самих разработчиков cor-ru!!!!!!
        (cor-ru это руссификатор который вы сейчас используете если вы почему то не знаете)

    moth
        что
            SHOWONCE::
        что это вообще... чел ты где таких вирусов нахвататься успел
            SHOWONCE::
    
    corrurubonus
        молчать
            SHOWONCE::

    sourceless
        моль замолкает
            SHOWONCE::
    
    corrurubonus
        :3
        занимательно правда что вы даже не добрались до места с подсказкой!!!
            SHOWIF::[["gol__ops_boss",false]]
        подсказал ли вам кто-то извне? или вы однажды её нашли, а теперь переигрываете мод?
            SHOWIF::[["gol__ops_boss",false]]
        ихихихи
            SHOWIF::[["gol__ops_boss",false]]
        так ну короче
        для начала нам (разработчикам) стоит перестать говорить в куче!!
        или мне (дуто) перестать писать этот диалог одному в 2 ночи
        эхехе

    sourceless
        "дуто" бросает писать этот диалог
        проходит два дня

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
            FAKEEND::(вотето да)
`)*/

bonusContent = `
<div id="content" data-swup="0">
<style>
#content::after, #content::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
}

#content::after {
    background: url(/img/textures/fadeinlonghalf.gif);
    background-size: auto 100%;
}

#content::before {
    background: url(/img/textures/bcontours.gif);
}

body.in-menu #content {
    transform: unset !important;
}
</style>

		<script id="PageData">
			content = document.querySelector('#content')
			body = document.body

			if(typeof page == "object") {
				oldPage = page
			}

			// This script is generated per-page based on jekyll front-matter and other inputs. If you're looking at how stuff was done, be prepared for truly terrible whitespace management. It's prettier when I'm working on it, trust me.
			page = {
				title: "..__UNKNOWN__..",
				name: "cor-RU",
				dialoguePrefix:  "sec",
				path: location.pathname,
				flags: {},
				howls: [],
				cacheval: 1737759501187488375,
		
				image: "/img/socials/where.gif",

				bgm: new Howl({
					onload: function () {page.howls.push(this)},
					src: ['/audio/testing_combat.ogg'],
					preload: true,
					loop: true,
					
					rate: 0.5, 
					sprite: {
						__default: [50, 153000, true]
					}
				}),
				onLoaded: ()=>{	
					document.querySelectorAll('#grid-ref').forEach(e=>e.remove())
					body.setAttribute('page', page.name)
					content.setAttribute('page', page.name)
					document.querySelector('#static .enter').setAttribute('page', page.title)
					document.scrollingElement.scrollTop = 0
					

					updatePreferenceAttributes()

					//dynamically inserted
							
						document.querySelector('body').classList.remove('nomoth')
					

					if(firstLoad || env.waitOnLoad) {
						if(!env.loading) body.classList.remove("loading") //this is otherwise handled in the loadResources function
						body.setAttribute('state', 'corru-loaded')
					} else {
						page.onEnter()
						if(oldPage.bgm) oldPage.bgm.unload() //unloads the old page music to save memory
					}

					console.log('rendering buddies!')
					Buddy.renderGlobalBuddies()
					document.dispatchEvent(env.hooks.corru_loaded)
				},

				onEnter: ()=>{
					if(!page.dialoguePrefix.includes("notfound")) {
						change(\`visited_\${location.pathname.replace(/\\//g, '')}\`, true) // !!!!!!!!!!!NOTE:: needs to be specifically formatted to make sure the backslash stays correct; same for other similar cases
					}
					
					//global VN object update
					page.vn = new VN()
					window.vnObj = page.vn

					
					readoutAdd({message: \`..__NAVIGATING::"\${page.name}"__..\`, name:"sys", actor: "sys", type: "navigation", show: false, sfx: false})
					
					
					body.setAttribute('state', 'corru-entered')
					firstLoad = false

					
					if(corruStatic.playing() && !body.classList.contains("hard-cut")) {
						corruStatic.fade(corruStatic.volume(), 0, 1000)
						setTimeout(()=> corruStatic.stop(), 1001)
					}
					if(page.bgm) {
						page.bgm.volume(0)
						page.bgm.play()
						page.bgm.fade(0, 1, 1000)
						env.bgm = page.bgm
					} else {
						env.bgm = null
					}
					

					//dyn
					
					body.classList.add('codezone')
startDialogue("bonus_corruru")

					Buddy.triggerPageBuddies()
					document.querySelector('#PageData').remove()
					document.dispatchEvent(env.hooks.corru_entered)
					mothHasUnreadCheck()

					setTimeout(()=>{
						if(oldPage) if(oldPage.howls) oldPage.howls.forEach(howl=>howl.unload())
					}, 400)
				},

				onLeaving: (dest = false)=>{
					body.setAttribute('state', 'corru-leaving')
					MUI("off")
					env.waitOnLoad = false

					if(env.bgm){
						let oldbgm = env.bgm
						env.bgm = null
						if(oldbgm.playing()) {
							oldbgm.fade(oldbgm.volume(), 0, 1000)
							setTimeout(()=> oldbgm.stop(), 1001)
						}
					}

					if(!body.classList.contains("hard-cut")) {
						corruStatic.volume(0)
						corruStatic.play()
						corruStatic.fade(0, env.corruStaticBaseVol, 1000)
					}

					//dyn
					
					body.classList.remove('codezone')

            		change('TEMP!!sat', true)
					Buddy.cleanPageBuddies({removeEl: false})
					document.dispatchEvent(env.hooks.corru_leaving)

					if(dest) swup.loadPage({url: dest})
					delete page.vn
				}
			}

			env.pageName = "cor-RU";
			env.pagePath = location.pathname;
		</script>
	</div>
`
if(typeof pages == "undefined") {
    pages = {}
}
pages['/local/uncosm/cor-ru/'] = {
  "title": "..__UNKNOWN__..",
  "name": "cor-RU",
  "dialoguePrefix": "sec",
  "path": location.pathname,
  "flags" :{},
  "pageClass": "",
  "originalContent": "",
  "blocks": [
    `${bonusContent}`
  ],
  "responseURL": "https://corru.observer/local/uncosm/cor-ru/",
  "url": "/local/uncosm/cor-ru/"
}
Object.defineProperty(swup.cache, 'pages', { get: () => pages, set: () => { } })

document.addEventListener('corru_resources_added', ()=>{
if((location.pathname == "/local/uncosm/cor-ru/") && (page.dialoguePrefix.includes("notfound"))) {
    body.classList.add('hard-cut') // needed 4 the static sound to not break
    moveTo("/local/uncosm/cor-ru/")
    body.classList.remove('hard-cut')
}
}, true)


