/*
    cor-RU - a russian localization mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/memory-hole.js
    localization for /local/uncosm/where and all of the memory hole pages
    (---hmmmmmmmmmmmmmm.........)

    progress: every page except for memholes finished, definitions unfinished, review needed, b o n u s as of 06.10.2025
*/


env.localization.page['localuncosmwhere'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "yeah i got nothing here. seems like you could give it some input, but... no clue what it wants": "дааа не знаю тут. похоже ты можешь что-то ввести, но... без понятия чего оно хочет",

        "memoryhole": "брешьпамяти", // --- веление корруворкс

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
            else if (value == "далль" || value == "далля") value = "dull"
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
            else if (value == "зов") value = "call"
            else if (value == "фея") value = "fairy"
            else if (value == "ходень") value = "walker"

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

        
        "поверхностный голос":`'специализированное управленье громкостью';'быстрый и чёткий'`,
        "глаз велзи уставлен вниз": `'распространённый оборот речи';'даже велзи смотрит в шоке'`,

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
        "ATTENTION::'thoughtform activity detected'::'resources removed'": "ВНИМАНИЕ::'обнаружена мыслеформенная активность'::'удалены данные'",

        /*effigy*/ "jokzi... jokzi ozo!!": "джокзи... джокзи озо!!",
        /*effigy*/ "that's right! i have a home!!": "точно!! у меня же дом есть!!",
        /*effigy*/ "ok this was nice but i gotta go barfriend": "было здорово но мне пора бардруг",
        /*effigy*/ "i'll take another one for the journey!": "я возьму ещё один в дорогу!",
    }, 
    entityDescriptions: {
        "cavik": `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА
::ЯВНОЕ НАЗНАЧЕНИЕ::'не указано'
<span style='color: var(--friend-color)'>::РЕКОНСТРУИРОВАННЫЙ КОНТЕКСТ ПОДПИСИ</span>
<span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("вазнийское")} сюрреалистическое влиянье'
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

// == MEMHOLES == //
env.localization.page["sec"].dialogues["call"] = generateDialogueObject(`
start
    sys
        NOTICE::'memory stream located'

    sourceless
        ...minds continue to brush against one another through the collective,
        mine, then hers, then mine again, shedding wordless impulses and knowledge back and forth
        though she is far more active, sparsely allowing interjection
        not that i mind, of course, mentally fatigued by today's instruction

    frenetic
        --you recall the great disruption some θgazes ago yes?
        the collective and the dullvoice and the everything?
    
    wiser
        disruptive especially for ukazni ozo, i imagine

    frenetic
        oh yes yes yes oh yes it was bad my whole study chamber almost detonated
        i was designing this sustained connective pulse weapon where ummm
        ok wait before i get into that yes the disruption
        lots of research devices paused or broke down badly very badly
        so much time wasted on recalibration and manual filtering uuugh hate hate hate
        because of this new presence in the dull that is so noisy and everywhere
        θeyes and θeyes of dull pattern training useless
    
    sourceless
        i am met with the clear impulse of her stout receptors pressed against her head,
        claws digging into her face, teeth grit, barely holding back a frustrated screech
        of course, she is exaggerating for comedic effect, for she still holds an excited tone

    frenetic
        have you heard about what it is actually? where it is? why it is?

    wiser
        not yet, my friend
        my work hardly concerns the dull
        only murmurs have reached me

    frenetic
        oh oh oh oh good then i can tell you!!!!!!
        at first we all thought someone broke the dull plane somehow hahahaa
        it is like a loud noise i mean noise does not exist in the dull plane but you know that is easy to compare it to considering--
        anyway most dull devices filtered it out automatically because it is a core fundamental that things that do not make sense are ignored for most devices
        but we like that here we collect what does not make sense and so we have been looking at it constantly since it started
        and it is still going! so loud and so strong and no sign of stopping!!!
        still cannot make sense of it but so many new initiatives are springing up in ukazni ozo and i think one in that shore city and--
        oh!!! θ██████ you should get one started in oltazni!!!!!

    sourceless
        my internal impulse to laugh is transmitted far faster than any external manifestation
    
    wiser
        θ█████, i have quite enough to handle with this current clutch of vel
        so much more distracted than any who have come before...
        maybe when they can hold their own on the surface, i could pivot?
        ah, perhaps with θ█████'s assistance!
        i imagine he must be fascinated by this matter, as well
        though it has been θeyes since i last spoke to him for longer than a moment...
    
    sourceless
        ...perhaps he will even have forgiven me by now...
    
    frenetic
        oh yes yes ok no hurry it is not going anywhere!!
        whenever you want to start i am here i can help get you up to date and transmit listener designs and--

    sys
        NOTICE::'memory stream terminated'

    RESPONSES::sys
        return<+>END
            EXEC::moveTo("/local/depths/")
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
        просто стоит тут
____SHOWIF::["embassy_d1_complete", false]
    moth
        погоди-ка, на что именно ты смотришь?
        это что, какая-то обесковая подпись? каким образом тебе удалось это отрыть?
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
        ЕГО РЕЦЕПТОРЫ ОТДЁРГИВАЮТСЯ, И ОН ЗАМИРАЕТ, СЛОВНО ЗАМЕЧЕННЫЙ ХИЩНИКОМ
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
        здесь кто-то есть
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
        Я ОЩУЩАЮ, КАК НАШЕ СУДНО НАПРЯГАЕТСЯ ПОД ВЕСОМ ГЛУБИНЫ
        МОЯ БЕДНАЯ ГЛАЗИКА, ДОЛЖНО БЫТЬ, НАДРЫВАЕТСЯ, ПЫТАЯСЬ СПРАВИТЬСЯ С ПОДДЕРЖКОЮ ОПТИМИЗАЦИЙ


    mind
        останавливаюсь
        выпускаю пульс
   
    sourceless
        ГЛУБИННЫЙ ПУЛЬС ФОРМИРУЕТ НАРАСТАЮЩИЙ РАДИУС ВИДИМОСТИ
        ЕГО ПОРОГ РАСШИРЯЕТСЯ НАРУЖУ И КАК ТОЛЬКО ОН ГАСНЕТ, Я ЗАМЕЧАЮ ЕЁ
        ГРУДУ МЁРТВОГО МЕТАЛЛА, В ТАКОЙ-ТО ПУСТОШИ
        НЕКОЕ СУДНО, ИЗГОТОВЛЕННОЕ БЛИЗНЕЦАМИ, НО...
        Я ПЕРЕВОЖУ СВОЁ ВНИМАНИЕ НАРУЖУ И ОБМЕНИВАЮСЬ ВЗГЛЯДОМ С θ█████


    origin
        ты это тоже видишь?


    other
        да...
        судно близнецов, должно быть, давно затонувшее


    origin
        взгляни на его середину--видишь, какой там раскол?
        что с ним такое...?
        это туда она нас послала?
       
    other
        точно нет
        не нравится мне его вид
        кроме того, что бы с ним не происходило, оно не для обитания
        не будем прекращать поиски - мы уже точно близко
       
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
        в относительной безопасности входного тоннеля, θ██████ отбрасывает поверхностный голос
   
    guard
        невероятно... раньше на это ушло бы гораздо больше времени
        θ██████, каково количество?
   
    sourceless
        пусть настоящий ответ прямо в завитке моего рецептора,
        я разыгрываю шоу с подсчитываньем когтей, а затем выдаю одну из моих любимых фраз
   
    stupid
        ах... придётся позвать тиров!
   
    sourceless
        он посмеивается, к моему удивленью
        ещё несколько θмигов назад мои подшучиванья, казалось, раздражали его
        и всё же, как и задумывалось, я сразу же даю ему подобающий ответ
   
    stupid
        я насчитала чуть больше тридцати
   
    elder
        хаха!
        целых тридцать, за один такой поход...
       
    sourceless
        θ██████ останавливается и берёт свою далль-импульсную валика-цисту за привязь,
        трясущеюся рукою cтягивая её на уровень глаз, чтобы посмотреть в неё должным образом
        на мгновенье я испытываю шок, как и его сын, судя по его рецепторам,
        но мы оба осознаём, что он смотрит на бок, нежели прямо на смертоносную часть

    elder
        от простых контейнеров для еды, до смертельнейшего из всех оружий...

    sourceless
        пока он стоит, уставившись внутрь неё, какое-то бесцельное движенье проходит по его рецепторам
        когда тир витает в облаках - это сразу видно
   
    elder
        корру...
        знаешь, они додумались использовать формируемые им сферы для еды, когда мои рецепторы только начали расщепляться
        когда-то наставник по раскопке рассказывал мне наистраннейшие истории о нём и наших предках...
        это было незадолго после того, как мы наткнулись на ту великую естественную жилу в глубоких залах
        она теперь гораздо меньше...
        пока мы готовили скважину для добычи, знаешь, что он мне сказал?
   
    sourceless
        θ██████ поворачивается ко мне, его ветвистые рецепторы раскидывают свои кончики
   
    elder
        в глазах его отца, и отца его отца, корру было вредителем!
        хаха!!
        тиры прошлого натыкались на громадные стены из него, пока копали,
        и им приходилось соскабливать его когтями, или копать в обход, ибо наша кислота была бессильна...
        ощущенье, когда дикое корру попадает на рецепторы
        ты знаешь, каково оно?
   
    sourceless
        его сын хранит молчанье, безразличный
        должно быть, он всё это уже много раз слышал
   
    stupid
        нет!
        обычно его держат запечатанным в тех больших черепах
   
    elder
        ну, если на них попадает хоть капля,
        ты почувствуешь на себе взгляды - словно ты в комнате не один,
        и на тебя пялятся, слушают...
        но, выходит, всё это время оно и правда слушало, да? хаха!
        как думаешь, что они дальше из него слепят? глаз велзи уставлен вниз, да у θ████ из него новая рука!

    stupid
        что ж, ещё один <span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'распространённый миф';'нетрезвый тир опрокинул контейнер с корру и упал в него'">тир ввалится в их исследовательскую камеру</span> - и узнаем!

    sourceless
       его смех переполняет тоннель. этого достаточно, чтобы мои рецепторы скрутило в тугую спираль
   
    elder
        θ██████, распланируй-ка для меня транспортировку в олтазни, а?
        у меня появилось дельце в их цехе
   
    guard
        сей же θмиг, отец

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
        θ███'s dog skitters away from me, but in this closed chamber, it can only go so far // собака θ███ бросилась в сторону от меня, но в этом закрытом помещении бежать ей было некуда
        it stands no chance as i leap forth, curling my arms under its shell and pulling it into a hug // у него не было и шанса, когда я сделала рывок вперёд, обвив руки под его панцирем и утянув в объятье
        it squeaks like an unripe celki when i tear it from the ground, and i spin while i dance around θ███'s furniture // он пищит как незрелый сельки, когда я отрываю его от земли и кручусь в танце вокруг мебели θ███
        i see the lights of θ███'s optics peering skeptically from the connected cooking chamber, but pay her no mind // я замечаю как мелькнули огни оптики θ███, уставившейся на меня из соединённой готовительной комната, но не придаю ей вниманья
    
    kind
        о, θ███, прекрати свои издевательства, ему страшно
    
    sourceless
        her flat voice betrays her amusement // в её ровном голосе слышно предательское веселье
    
    stupid
        i cannot help myself, dear sister! // ничего не могу с собою поделать, дорогая сестра!
        i see food, i must hunt! // я вижу еду - я выхожу на охоту!
    
    sourceless
        still, i set down the dog and leap backwards // и всё же, я опускаю собаку и отпрыгиваю назад
        it skitters and turns about to face me, waiting for my next move // она отбегает и разворачивается встречаясь со мною лицом к лицу, выжидая мой следующий ход // "" котывоителикотывоители
    
    stupid
        see what i said? // видишь о чём я?
        clearly, it is merely play-deprived! // очевидно же, ему просто не хватало игры!

    dog
        ь̀́
    
    sourceless
        i half-lunge at it, stopping just an instant after i start, to tell it we are not done // я бросаюсь на него, но останавливаюсь на середине давая понять - мы ещё не закончили
        it ducks lower to the ground in response, and after another moment of stillness, it scurries towards me abruptly // он пригибается ниже к полу в ответ, и через короткий момент тишины, резко выскакивает на меня
        i laugh and squeal in surprise, backing off and nearly climbing backwards up the wall // смеясь и вопя от удивленья, я пячусь назад почти взбираясь на стену 
        even θ███ laughs as it chases me about // даже θ███ смеётся, когда тот начинает гонять меня вокруг
        i narrowly avoid crashing into θ███'s ornate kalstik stand // я едва уклоняюсь от столкновения с роскошною стойкой для кальстика
    
    kind
        all right, all right... // хорошо, хорошо...
        just do not break anything, please!! // просто, прошу, не разбейте ничего!!
        i am almost done in here // я почти закончила
    
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
        speaking on behalf of anterior dull station '<span definition="NOTE::'partial translation';'reference to weather phenomena'">brightwall</span>',     говорю от имени предварительной станции далля '<span definition="NOTE::'partial translation';'reference to weather phenomena'">brightwall</span>', 
        you are all clear to proceed!     ты можешь продолжать движение!
        be sure you release all active dull tethers or hearts,      не забудь отпустить все активные шнуры или сердца далля,
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
env.localization.page["sec"].dialogues["fairy"] = generateDialogueObject(`
start
    sys
        NOTICE::'memory stream located'

    sourceless
        ...почти на высоте шпиля от земли, куда выше поверхностных паров,
        я продолжаю карабкаться всё выше и выше, раздирая мягкую плоть своего переносчика
        когти окрашены запёкшеюся кровью вейлька, делаясь тупее и немея под непримиримыми прибрежными ветрами 
        порученная мне θжатами тяжёлая груда цист тянет вниз
        и всё же мои глаза, ноги и руки стали куда тяжелее их
        как давно я спала?
        с немногочисленным стадом, чистонебьем (нет дефениции?) и под прямым взором глаза велзи,
        мне, по крайней мере, вряд ли стоит ожидать сюрпризов
        итак, наступило время отдыха
        как бы мне хотелось просто напросто отлежаться в ззепеле...
        но комфорту не было места, заместо него оно было выделено цистам с жизненно важными знаниями внутри
        недалеко от вершины своего носителя, я вытаскиваю шипы из костюма
        и вонзаю их аккуратным рядком, прикрепляя каждый к своему ремню безопасности
        чтобы, наконец, извлечь единственный позволенный себе комфорт: вейлькизт
        оттолкнувшись от плоти вейлька, качнувшись на своих привязях,
        их крюки впиваются глубже в плоть, изгибаются вовнутрь, сиденье поддерживается моим весом 
        отдых... после всего
        ....
        так расслабилась, что чуть не повисла на привезях, сидя на этой тонкой платформе "" я так много думаю об этой строчке. почему. ведь должна быть какая-то причина. в этих буквах скрыто больше смысла, чем какие-то слова. точно, здесь скрыты чувства, эмоции. подбор, расстанвока - всё имеет смысл. ничто не сделано просто так. каждое слово, каждая буква и её расположение важно. так вот. почему здесь так? сначала мне показалось, что это бессмыслица, не такая уж редкость в корру, но теперь.. окей возможно она просто реально задремала а потом "аой" резко проснулась подняла голову "ой поисла ээ я ой на привезяха блин почти что ахаха нельзя. нельзя спать" ну знаете спросонья там по буквам номрально не попадаешь ну вот короче. мнение? что мне с этой строчкой делать. ЭТО ВАЖНАЯ СТРОЧКА. Важно понимать что корруворкс несёт. иои кто бы то ни писал эту шедеврострочку
        нельзя засыпать, когда побережье так близко, до элузни едва ли не ногой подать
        так что сей θмиг--я просто наблюдаю
        завихряющийся прямо надо мною взор велзи, бесконечные звёзды вовне 
        один из немногочисленных вейльков этого стада, топчащийся через эту безжизненную пустошь
        до смехотворного близкие огни маяков, плавающие высоко над элузни,
        издающие мягкий лиловый свет, бросающий марево во влажный, холодный воздух
        это всё - безмятежная красота, которую я не способна оценить по достоинству в пору усталости
        ....
        ах--я... почти задремала
        мой носитель покачивается с медленным, оглушительным шагом внизу
        и я взираю на бесчисленные мерцающие звёзды,
        непонятные каждому, кроме самых эксцентричных указнийцев, загадки
        я замечаю страннейшее скопление тьмы
        внутри которой группа мерцающих пятен побольше
        точно--они двигаются иначе, отдельно от всего неба, не с шагами вейлька, но всё так же оставаясь его частью?
        я выпрямляюсь, в глазах блеснула бодрость, и вглядываюсь ближе
        вмиг, я вытаскиваю айма цисту, прикрепляю её к рецептору, выпускаю в воздух
        и новый взор мелькает в моём сознании, фокусируясь, фокусируясь всё дальше...
        и тьма шевельнулась
            EXEC::ratween(env.bgm, 0.2, 20000);body.classList.add("eyes")
            WAIT::4000
        тьма шевельнулась: пять мерцающих бледных огней, сложившиеся в арку
        находящиеся до этого вертикально, а теперь, будто помещённые во внешний круг крутящегося колеса
        я невольно выдыхаю, рецепторы закручиваются в тугую спираль, содрогнувшись, я едва не сместила вейлькизт
        моё движение встревожило фокус айма цисты, я больше не могу найти то скопление
        я отчаянно сканирую--это было только моё воображение, так?
        я устала, такое порою случается, это--
        я сжимаю оберег от фей, его шипы впиваются в кожистое покрытие на руке
        мне нельзя здесь оставаться
        быстро, я поднимаюсь, стягиваю вейлькизт, снимаю привязи, я должна уйти, я должна--

    sys
        NOTICE::'memory stream terminated'

    RESPONSES::sys
        return<+>END
            EXEC::moveTo("/local/depths/")
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
        Мы вот-вот закроемся, так что дайте знать, если Вам что-нибудь нужно, и я быстренько Вас обслужу.
    
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
        И НЕ ДЕЛАЙ так больше, поняла?
    
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
        вейльк-переносчик медленно пробивается сквозь вазнийский шпилешторм, каждое мгновенье борясь с вихрями воздуха
        капли воды и град бьются о внешнюю оболочку ззепеля,
        влага просачивается сквозь трещины и накрапывает внутрь моего убежища, поблёскивая во внутреннем освещении
        это всегда так неприятно...
        к счастью, региональный координатор достаточно свободен для общения, за исключением этого прерыванья
        θ█████ наконец-то вновь связывается со мною через приёмник даллегласа,
    
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
        anyway, all it takes is a dullvoice connection, and silence      в любом случае, всё, что нужно - соединение по даллегласу и тишина
        they actually put together and distributed a guide, in hopes of bringing legitimacy back to the practice      они даже составили и распространили инструкцию, надеясь вернуть практике легитимность ← глупое слово <-- всё ещё глупое
        i helped by reviewing the guiding thoughts of his group, it really is very simple      я помогал, обозревая инструктирующие мысли его группы, это и правда очень легко
        in fact, i could do one for you right now!      на самом деле я могу провести одно для тебя прямо сей θмиг!
    
    sourceless
        ох, какое в этом веселье без завивания? // "" демн, акизет любила завиваться рецепторами с незнакомцами в её личиночной жизни
        раскат грома и молнии сотрясают ззепель
    
    stupid
        хорошо, почему бы и нет? давай же узнаем, какой путь прочерчен мне велзи! 
    
    other
        haha! good! хаха! хорошо!
        all right, you just need to keep the connection open, as if you are thinking something to me...      ладно, тебе просто нужно держать соединение открытым, словно ты что-то для меня мыслишь... // "" возможно просто "думаешь" лучше
        but try not to think anything      но постарайся ни о чём не думать
    
    stupid
        думать не думая?
        а затем мне, что, отрастить хвост?
    
    other
        я знаю, что звучит глупо, но это возможно! попробуй сфокусироваться на дожде!
    
    sourceless
        о, довольно просто
        я закрываю глаза, когда ещё один шаг вейлька-переносчика приземляется далеко внизу
        следующий не наступит достаточно θмигов, так что это удачное время
        дождь...
        ...
        наше соединение затихло, но по-прежнему открыто - я всё ещё могу чувствовать его
        в нём есть что-то напоминающее завивание рецепторов, без физического ощущения
        бесчисленные туманные ощущения захлёстывают, невозможно ухватиться за начало ни одного из них,
        раскаянье, счастье, смех, переполняющий мою грудь - но все они далёкие, скоротечные
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
        пока я занимаюсь починкою своей валики, θ█████ подбирается к углу командуемого мною снаряжения
        я поднимаю взгляд, рецепторы широко расставлены в радостном приветствии, только чтобы увидеть как его кротко опущены назад в беспокойствии

    stupid
        эй θ█████!!!

    hesitant
        привет θ██████!

    stupid
        что принесло тебя сюда? у них появились ещё устройства мне на пробу?
        айма цисты были просто невероятными, это было словно...
        глаз моего разума, приумноженный, парил вне моего тела
        это дезориентирует, но... открывает глаза. хехехе
    
    hesitant
        о, да... да, открывает
    
    sourceless
        МОИ РЕЦЕПТОРЫ ПРИВОДЯТСЯ В СХОЖИЙ ОБЕСПОКОЕННЫЙ ИЗГИБ
        ОН КАКОЙ-ТО МРАЧНЫЙ...?

    stupid
        итааак...?
        что там?
    
    sourceless
        ОН ТЯНЕТСЯ КО ВНУТРЕННЕМУ КАРМАНУ СВОЕГО ДОЛГОПОЛОГО ПЛАЩА, ВЫТЯГИВАЯ ДОВОЛЬНО КРУПНУЮ РУЧНУЮ КОРРУЦИСТУ
        НА МОМЕНТ ОН СМОТРИТ НА НЕЁ, ЗАСТЫВШИЙ, ПРЕЖДЕ ЧЕМ МОЛЧА ПРЕДЛОЖИТЬ ЕЁ МНЕ

    hesitant
        это...
        новое устройство для чрезвычайных ситуаций из вазнийских цехов
        они, эм...
    
    sourceless
        Я НЕ МОГУ СДЕРЖАТЬ СМЕШОК, ГЛЯДЯ КАК СТРАННО ОН СЕБЯ ВЕДЁТ
        ПО-ВИДИМОМУ, ЭТО ВСТРЕВОЖИЛО ЕГО ЕЩЁ СИЛЬНЕЕ
        Я РАЗГИБАЮ ОДИН ИЗ СВОИХ РЕЦЕПТОРОВ, ГОТОВАЯ ПРИСОЕДИНИТЬСЯ К НЕМУ, НО ОН ТУТ ЖЕ ЧУТЬ НЕ БРОСАЕТСЯ НА МЕНЯ
    
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
        разумеется нет, но, если ты и правда будешь этим заниматься...
        мир очень быстро меняется, θ██████
        и я хочу, чтобы ты могла созерцать его
        если тебя атакуют на одном из твоих забегов, или поймают...

    sourceless
        ОН ОТБРАСЫВАЕТ ЭТУ ИДЕЮ, НЕ ЖЕЛАЯ ДАЖЕ ДУМАТЬ ОБ ЭТОМ

    hesitant
        это твой лучший шанс продолжить жить
        или делать... подобие этого

    sourceless
        Я ХИХИКАЮ, РАЗДРАЖЁННО - ДО ЧЕГО СБИВАЮЩИЕ С ТОЛКУ ПОСЛАНИЯ!
    
    stupid
        что же, это что-то вроде тех--как ты их называл?
        эхо?
        если я использую его... буду ли это я?

    hesitant
        да, несомненно
    
    sourceless
        θ█████ САДИТСЯ НА МОЮ ОРУЖЕЙНУЮ СТАНЦИЮ НАПРОТИВ МЕНЯ         θ█████ SITS DOWN AT MY _ARMORY STATION_, ACROSS FROM ME

    hesitant
        так же, как айма цисты становятся продолжением твоего разума
        это делает и мыслеядро--так они это называют
        не могу даже представить, какому безумцу это пришло в голову, но... 
        оно перекладывает твой разум в себя, а затем отсоединяется,
        оставляя умирать пустую оболочку
    
    sourceless
        Я ЗАДУМЧИВО СМОТРЮ НА СТЕКЛЯННУЮ ПОВЕРХНОСТЬ МЫСЛЕЯДРА
        ПОД ЦИСТОЗНЫМ СТЕКЛОМ ЗАМЕТНО БЛУЖДАЮЩЕЕ ВНУТРИ КОРРУ
        МЕДЛЕННЫЙ, ВЬЮЩИЙСЯ ПОТОК ФИОЛЕТОВОГО ПЕРЛАМУТРА
        ОНО ЗАВОРАЖИВАЕТ - БОЛЬШЕ, ЧЕМ ЛЮБОЕ ДРУГОЕ УСТРОЙСТВО, ПОБЫВАВШЕЕ У МЕНЯ В КОГТЯХ
        РЕЗУЛЬТАТ ЕГО ПЛОТНОСТИ, НАВЕРНОЕ? ОНО ДОВОЛЬНО ТЯЖЁЛОЕ
        ОХ--ТОЧНО, ОН ВСЁ ЕЩЁ ЗДЕСЬ

    stupid
        что ж, не беспокойся!
        ты ещё не видел моего мастерства взбирания на вейльков!!
        и рассказывала ли я тебе когда-нибудь, как я <em>сломала</em> руку гуктику?

    sourceless
        Я СЖИМАЮ КУЛАК И ПОДНИМАЮ ПРАВУЮ РУКУ, ДЕМОНСТРИРУЯ ХИТИН НА МОЁМ ПРЕДПЛЕЧЬЕ
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
        ВСЁ ТАКОЙ ЖЕ МРАЧНЫЙ... НАДО БУДЕТ ПОДБОДРИТЬ ЕГО ВЕЙЛЬКОВЫМ ФРУКТОМ

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
         θ██████ ВАЛИКА-РОЖДЁННЫЕ КОРРУЦИСТЫ ДЁРГАЮТСЯ В ВОЗДУХЕ ВО ВРЕМЯ СКАНИРОВАНИЯ МЕСТНОСТИ //θ██████'s VALIKA-BORNE CORRUCYSTS TWITCH IN THE AIR AS THEY SCAN THE AREA я всё ещё не уверен ЧТО ЭТОООО ПОЧЕМУ Я ПЕРЕВЁЛ ЭТО КАК РОЖДЁННЫЙЙ "" https://ibb.co/HLXWzhHY
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
        Я СЛЫШУ, КАК ОН БОРМОЧЕТ ЧЕРЕЗ даллеглас, ДЕЛАЯ ГЛУБОКИЙ ВДОХ,

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
        в конце концов я нахожу его: мой приёмник даллегласа!
        с быстрым прикреплением к моему излюбленному рецептору, я связываюсь с региональным координатором...
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
    start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        



    stupid
        ааагх сгинь
        моя служба не прежде чем наступит <span definition="ПРИМЕЧАНИЕ::'частичный перевод';'сгенерировано из унаследованного описания'">чистонебье</span> // кричу бежззвучно как слизнясок  и бтюсь головой об стену но моя голова слишком мягкая а тело слишком аедленное "" лол. ночнячок момент
    tired
        θ██████, it is me
    
    sourceless
        
        
        
    
    tired
        there is a problem

    stupid
        не моя проблема в ближайший, аааммм,

    sourceless
        
        
        
        
        АХ--
        ВНЕЗАПНО, ОБОЛОЧКА МОЕЙ КАПСУЛЫ СДВИГАЕТСЯ
        
        

    tired
        this is not a joke, kelnit // """ вот это слово в памятку добавишь хорошо
        θ███████ has not returned
        he is not responding on the dullvoice either
        with how long he has been out, it will not be long before his trail is dispersed

    sourceless
        
        
        
        
    stupid
        ладно...
        я встречу тебя на входе
        и скажи θжатам подготовить для нас ходеня

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
        ...пусть шпилешторм и далёк, его свирепость эхом доносится даже до сюда, принимая форму капель воды
        мои когти без труда проникают в толстую, вздутую от воды плоть уже насквозь промокшего вейлька
        на выбранном мною носителе видны несчётные рубцы, оставленные такими же, как и я, путешественниками
        но на этой высоте их численность сократилась, а земля растворилась в поверхностных парах и мраке подо мною...
        как далеко пришлось бы падать, не удайся мне удержаться? до чего трепещущий ужас!!
        вероятность повстречать здесь незванных гостей невелика, так что я тянусь до плеча и активирую свой ззепель
    
    sourceless quiet
        он расширяется в сторону от меня и формирует полусферическую корруцистозную оболочку, что для закрепления вгрызается в плоть носителя
            EXEC::ratween(env.bgm, 0.5);play('stab', 0.75)
    
    sourceless
        я погружаюсь во тьму лишь на θмиг, в уже сформировавшемся убежище, наконец полностью отсоединившемся от крепления на моей спине, зажглись огни..
        огни - тусклые, ненадёжные химикаты, и он построен не так, как мне бы хотелось...
        но я в кой-то миг могу позволить своим конечностям отдых
        я размещаюсь спиною к липкому телу вейлька и упираю ноги в оболочку ззепеля, располагаясь удобнее "" фуу в этом мемхоле так много запятых "" не волнуйся прошлочок, я разберусь с ними "" прошлочок №2, это не сильно-то помогло!!! старайся лучше!! мне пришлось всё переделать
        брр... но влажность почти невыносима - меня больше не обдувают прохладные ветра этих высот
        приземлившись далеко внизу, очередной шаг вейлька сотрясает ззепель
        как долго мне придётся ждать, прежде чем этот носитель донесёт меня через <span class="code">шпиль</span>?
        надо бы проверить через тот координатор...

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["walker"] = generateDialogueObject(`
start
    sys
        NOTICE::'memory stream located'

        sourceless
        ...claws find little grasp upon the θwalker's glassy shell 
        a near impenetrable corrucystic carapace 
        fortunately, once i am past its folded, spindly legs, 
        some small holds are built into the sides, 
        allowing my ascent to its entry hatch easily 
        i descend into the dark interior, a spherical chamber with space for two to sit 
        alongside a chamber for materials--empty, for θ███████ and any others we find 
        the luminescent flesh of its walls, displaying information plainly, act as our only light 
        θ█████ already sits within, awakening various components 
        she does not look at me, nor do i express any delight in this rare occasion 
        θ███████ has been gone far too long for velzie to let this end kindly 
        and even worse, the murmurs of his sister having gone out before us, means she may well be... 

    tired
        θ██████, you are freshly awoken, you will take up the primary connector
    
    stupid
        what!! you know i-- 
    
    sourceless
        with a harsh turn and stare, the reflection of light in her eyes silences me
        it is always so miserable to deal with θ█████ 
        but rarely does she allow an operation to go poorly
    
    stupid
        --fine. fine, i will 

    sourceless
        from an inset crevice above, i tug a large connector free, 
        bringing it to my receptors, already uncurled 
        and as its flesh softens, both weave into its cold sludge 
        in kind, muddy and alien senses weave through my skull, 
            EXEC::ratween(env.bgm, 0.35, 40000);play("weirdbuild", 0.5)
            SILENT::
        a sickly wave of feverish warmth and dull pain, leaving new awareness
            EXEC::content.classList.add("altgo")
            SILENT::
        the six hard-shelled legs that i feel i have always had,
        their joints familiar and easily stretched, raising my central shell from the cavestone

    stupid
        ..ughh...
    
    sourceless
        though it feels it has always been this way, my sight has changed
        it is made spherical, an assault of all directions from the skin of my shell
        the blue-tinged stone of the ceiling approaches, while the very same of the ground grows distant
        surrounding θjut stretch downwards, distorted by the warping of my singular sight
        and the scent--the scent of the cave, every obesk, every particulate upon the wind, overtakes me
        distant as my true body feels, i am certain my claws are balled into overwhelmed fists
        wakeful awareness is exactly what the θwalker requires,
        for any less and the mind crumbles to unconsciousness

    stupid
        ...all right, got--it...
    
    sourceless
        speech comes uneven and stilted, the normal reflexes of my mouth small and unfamiliar
        
    tired
        already? 
        this is why you are a good fit for this, θ██████
        take us out, i will connect with a coordinator for additional guidance

    sourceless
        i step forward with one leg, its harsh hooked tip striking and cracking the stone
        only then, with the lurch of my core, does my lesser body register too much movement
        i try to lift a claw, but instead raise my front-left leg...
    
    stupid
        ah--could you--secure my tethers?
    
    tired
        yes, yes, just start moving
        we do not have time to...
                                
    sys
        NOTICE::'memory stream terminated'

    RESPONSES::sys
        return<+>END
            EXEC::moveTo("/local/uncosm/no/")
`)
env.localization.page["sec"].dialogues["yuzku"] /*--- кс кс слизнячок*/ = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        приходится сдерживать себя, чтобы не забежать далеко вперёд θ██████
        празднества зала собраний никуда не денутся... хватит торопиться...
        он говорит--погоди, о чём он говорит? "" акизет ты такая жестокая. поговори с ним хоть немного пока он ещё жив

    hesitant
        ...and, right in the center of the cysts, they have this tiny pale gray one--and it connects to that very place!      ...и, прямо в центре цист, есть такая крошечная серая--и она прямо к этому и подключается! // "" повтор прямо прямо

    stupid
        да ну!

    sourceless
        я без понятия

    hesitant
        right?! to think, it was right beneath our receptors all this time      перевести после реплики?! и ведь оно всё это время находилось прямо под нашими рецепторами
        i wager we could even see runners flying over the veilk, eventually!      держу пари(?), мы рано или поздно увидим, как бежцы летают над вейльками!
    
    stupid
        на крыльях?
    
    hesitant
        n-no, with the nodes! imagine--great hovering spheres attached to a back-piece, with veins up to receptors to control elevation, and direction...      н-нет, (перевести после предыдущей)! представь--великие левитирующие сферы, присоединённые к наспинному сегменту, с венами к рецепторами чтобы управлять высотою, и направлением...
    
    sourceless
        а, ага... про кость далля
        это всё очень интересно, но волнует меня недостаточно, чтобы углубляться в тему
        и всё же приятно видеть его таким воодушевлённым, последнее время он был таким тревожным
        с подъёмом по тоннелю, я замечаю тира впереди, заменяющую один из юзку шаров на одну из новых корруцист "" переводить корру означает обречь себя. Все будут думать какой же это дурацкий перевод. Но это не перевод такой. Это корру
        я останавливаюсь неподалёку, чтобы понаблюдать за её работою, θ█████ замолкает и скоро останавливается рядом
    
    stupid
        привет! 
        это один из новых пещерных огней, верно?
    
    other
        ah? oh, yes!      ах? о, да!
    
    stupid
        могу я взглянуть?
    
    sourceless
        я спешу к тиру, и она вытягивает для меня светящуюся корруцисту из своей корзины,
        перекладывая её мне в когти, у неё такой же голубой свет--нет, ярче--чем у старых юзку шаров, но...
        она обделена характерными дребезжанием и постукиванием маленьких существ, карабкающихся и падающих внутри
    
    stupid
        о, такая тихая!
        я буду скучать по старым юзку....
    
    sourceless
        тир посмеиватся, заканчивая защёлкивать шар в его настенном гнезде

    other
        i will not!      а я нет!
        maintenance and feeding was such a chore...      содержание и кормление так надоедали...
        with these new ones, all i do is put in a strange little blue square the θjut pass along,      с этими новыми всё, что я делаю - кладу странный маленький синий куб, переданный θжатами, "" убил звёзд
        then it lasts for θgazes and θgazes!      и его хватает на θвзоры и θвзоры!

    stupid
        куб...
        θ█████, не тот ли это "сфер"?
    
    hesitant
        haha, no, i think this is a new one      хаха, нет, думаю это что-то новое
        it is probably a byproduct, or maybe it could be a specific sfer variant...      скорее всего побочный продукт, или, может, специальный тип сфера...
    
    sourceless
        я склоняю свои рецепторы тиру, и она отвечает мне тем же
        подав простой жест θ██████, мы продолжаем наш путь
    
    hesitant
        ...see, in the sfer "vats" that the zevazni foundries came up with,      видишь ли, в сферовых "чашах", которые придумали зевазнийские цехи, // "" вроде как чаны переводим это. ну я так точно
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
        безмолвная тишина этого покоящегося стада почти оглушает
        лишь ветер и гроза скрывают наши малейшие движения на пути к θ███
        по воле велзи и ею одною она сумела продержвться здесь так долго... бедная вел!!
        она сидит в небольшом просвете, напротив своего маяка далля, и истекает кровью в окружении двух трупов её бежцев-компаньонов
        большое везение, что мы нашли их, когда глаз ещё освещает наш путь!
        я почти ступаю в просвет, но θ██████ хватает меня за руку и оттягивает назад,
        пряча нас обоих от взора θ███ за отростком юного вейлька
        мы перешёптываемся через даллеглас:
    
    stupid
        что такое?
        здесь ведь нет угрозы секри
        к тому же, как бы оно использовало маяк?
    
    guard
        just wait - take a closer look      
        the scent in the air...      
        it is not right      
        if she is here, why has she not received any of our calls?      
    
    sourceless
        запах вела и кива, двое мертво - то же, что мы и видим... отчего он так встревожен?
        беглым импульсом я даю указание выглянуть своей валика-рождённой айма цисте
        θ███ сидит слегка необычно, с, наверное, чересчур громоздким снаряжением за спиной
        но с такого угла сложно сказать
        ветер переменяется в нашу сторону, шлейф троицы становится отчётливей
        запах вела странный, нездоровый, металлический...
    
    stupid
        ты прав
        оставайся здесь
        подготовь пульс далля и держи нацеленным на неё
    
    sourceless
        я выхожу, почувствовав его согласие через даллеглас,
        взывая поверхностным голосом, прежде чем полностью показаться в поле зрения θ███,
    
    stupid
        θ███! это ты?
        ты в порядке?
    
    sourceless
        тот же миг, как θ███ оборачивается ко мне, облако проплывает между глазом и вейльковым стадом
        и погрузившись во тьму, я ощущаю чудовищный страх
        когда, как мне кажется, её лицо на мгновение рассеклось
        но это мгновение проходит, она отталкивается от земли и поднимается на ноги
        лицо цело, а рецепторы туго завиты в спираль
        
    host
        θ██████...?
        please--do not look away      
        i will go away again      
        i just blinked... i blinked and they were all gone!!      
        i did not do anything! please!      
    
    sourceless
        её руки и лицо перепачканы циановой кровью,
        когти длиннее, чем они должны быть--многочисленнее, чем должны быть...
        тёмная, тощая фигура скрывается за нею, едва заметная за плечами
        части фигуры изредка изгибаются--живое!!
        θ██████ связывается со мною по даллегласу,
        
    guard
        θ██████ - she is lost      
        if there is one zuzucri here, there are others      
        preparing to release the pulse      
    
    sourceless
        молча, дабы не встревожить θ███, дав знать о своем компаньоне,
        я делаю жест за спиною, говоря ему ждать, и он слушается
        несмотря на то, что каждый нерв в моём теле кричит мне бежать
        я знаю - я должна успокоить θ███, иначе зверь перестанет владеть её разумом
    
    stupid
        θ███, всё в порядке...
        что произошло?
    
    sourceless
        θ███ приближается, но её ноги не шевелятся, волочимые по земле
        лишь заметив мой взгляд, обращённый на них, зузукри заставляет её идти
        я оборонительно поднимаю одну из своих перчаток для восхождения, и она останавливается, поднеся когти к глазам
        раздаются её всхлипы, и моя айма циста выявляет движение в тёмной фигуре позади неё
        множество глаз моргнуло в унисон, истинный облик зверя невозможно разобрать
    
    host
        sorry... sorry...      
        i know--i need to stay away      
        i do not know when it got me, or how long it has been...      
        i think it used my knowledge to activate their beacon, to bring you here      
        you must not let me return!!      
        and... and you cannot let me stay here      
    
    sourceless
        хоть θ██████ безо всяких сомнений предпочёл бы освободить её от этой роли,
        у меня есть идея...
        покопавшись в плаще, я извлекаю то маленькое мыслеядро, вручённое мне θ█████
        оно <em>предназначалось</em> для меня, но если есть хоть крошечный шанс спасти θ███...
        я предлагаю его ей, рука протянута, но слегка отклонена на случай, если придётся уклоняться
        зузукри наверняка умиротворён моим явным принятием её
    
    stupid
        no, θ███, it is OK! // нет, θ███, всё ОК! втх. бессвязность?
        просто помести это на свой рецептор, и мы тебе поможем
    
    sourceless
        она отводит когти от лица, и лишний, который я не заметила, исчезает за её спиною
        её рецепторы разгибаются в надежде и восторге, а на лице становится более очевидно обличие зузукри
        именно--рассечённое на четверти, переодически разделяющиеся для вдоха... я едва сдержалась чтобы не атаковать её
        но я жду, и она принимает мыслеядро, позволяя мне сделать шаг назад
        и когда она помещает его на рецептор, то...
        нет, подожди, оно ей не подходит?
        она подносит его к лицу, и, очевидно, оно исправно, но...
    
    host
        θ██████... it will not let me      
    
    stupid
        ах...
    
    sourceless
        корру, оно не узнаёт её...
        в очередной раз велзи крадёт мою надежду, воодушевление сменяется отчаянием
        только я собираюсь подать сигнал θ██████, как её когти погружаются внутрь оболочки цисты,
        и, хныча, она начинает насаживать её на острый конец рецептора
    
    stupid
        нет, стой--!

    sourceless
        повинуясь безмозглому импульсу, я цепляюсь в эту руку за запястье
        и тут же её лицо рассекается, зузукри разводит спрятанные во тьме конечности
        его зубы рассекают воздух в рецепторе от меня
        неведомый мне ранее ужас стискивает всё моё тело, конечности не реагируют, не в состоянии одёрнуться
    
    guard
        we're done - releasing pulse now      

    sourceless
        ослепляющая вспышка полыхнула между мною и чудовищем, разрубая когти, сжавшие мыслеядро
       у меня только θмиг на побег, прежде чем--

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
// = EFFIGY = //
env.localization.page["sec"].dialogues["bar"] = generateDialogueObject(`
loop
    RESPONSES::self
        кто ты?<+>who
        как ты здесь оказалась?<+>here
        можно мне выпить<+>drink
        джокзи озо<+>ozo
            SHOWIF::"ozo__council-task"
        пока<+>END

start
    self
        привет

    sourceless
        внимание мыслеформы фиксируется на твоём сознании с непривычной ясностью

    effigy
        привееееетик!

    RESPONSES::self
        кто ты?<+>who
        как ты здесь оказалась?<+>here
        можно мне выпить<+>drink
        джокзи озо<+>ozo
            SHOWIF::"ozo__council-task"
        пока<+>END

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
        но что-то в темноте поймало меня! // """ ТАК МИЛО. Познакомьте крошку развледруга с акизетами. пусть они его замучают. это будет мило. Если это был развледруг, а не нечто... Изабель была бы благодарна в любом случае. это мило. это мило
        и посадило сюда! //"""  "огрызочек акизет идёт сюда..."
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
// = SORRY = //
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



getLocalizationForPage(true) // --- ensuring that Nothing Gets Fucked Up




















/* WIP ZONE also i took some css and an actor from cor-RU.js cause they are useless
env.dialogueActors["corruru"] = {
    name: "cor-ru",
    image: "/img/textures/yeyetran.gif",
    type: "tdone corruru portrait-contain",
    voice: ()=>{play('talkcroak', 1.75)}
}
    
.actor-corrurubonus .dialogue-text {
    text-transform: uppercase;
}

.dialogue-message.corruru.dialogue-text, 
.readout-log .message.corruru {
    background: url(/img/textures/fadein.gif), url(/img/textures/corruripplebastard.gif), url(/img/textures/badstatic.gif);
    background-size: 150%, auto;
    text-shadow: 1px 1px var(--neutral-color);
    font-size: 1.25em;
    letter-spacing: 0.25em;
}

.dialogue-message.corruru .dialogue-portrait::after {
    background-size: 125%;
    background-position: center;
}

.dialogue-message.corruru, .message.corruru {
    --bright-color: var(--bastard-color);
}

.dialogue-message.corruru .dialogue-text {
    padding: 0.3em;
}

.dialogue-message.corruru {
    --background: url(/img/textures/corruripplebastard.gif), url(/img/textures/badstatic.gif);
    --color: var(--bastard-color);
    text-shadow: 1px 1px var(--neutral-color);
    font-size: 1.25em;
    letter-spacing: 0.25em;
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
} */
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
        (cor-ru это руссификатор который вы сейчас используете если вы почему-то не знаете)

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

.dialogue-message.rosrazum {
	--background: url(/img/textures/fadein.gif), url(/img/textures/corrurippletran.gif), url(/img/textures/spotgradientinverse.gif), url(/img/textures/ceyetran.gif), url(/img/textures/cneural.gif), url(/img/textures/damagetran.gif), black;
	--color: var(--obesk-color);
}
.dialogue-message.rosrazum .dialogue-text {
	--color: var(--dark-color);
	letter-spacing: 0.3em;
	background-position: center left;
	background-size: cover, cover;
	box-shadow: 0px 0px 5px var(--friend-color);
	border-color: var(--obesk-color);
	text-shadow: 1px 1px var(--friend-color), -1px -1px var(--obesk-color);
}
.dialogue-message.rosrazum .dialogue-portrait {
    
}

.dialogue-message.mleko {
    
}
.dialogue-message.mleko .dialogue-text  {
    
}
.dialogue-message.mleko .dialogue-portrait {
    
}

.dialogue-message.lilfive {
    
}
.dialogue-message.lilfive .dialogue-text  {
    
}
.dialogue-message.lilfive .dialogue-portrait {
    
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
