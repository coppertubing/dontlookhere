/*
    cor-RU - a russian localization mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/aquarium.js
    localization for /local/city/aquarium

    progress: a couple dialogues, also whats up with defs as of 19.01.2026
*/

env.localization.page['aquarium'].localization.page['aquarium'] = {dialogues: {},
    definitions: {
        "vel's mask": { type: `УНАСЛЕДОВАННЫЙ КОНТЕКСТ`, text: `'irony';'cultural reference to use of masks in performance';'occasionally said to be stuck on'`}
    },
    strings: {
        "about this memory": "об этом воспоминании",

        "talk": "поговорить",

        "return": "назад",
        "continue": "продолжить",

        "bench": cor_ru.entity_menu["bench"].name,
        "tree": cor_ru.entity_menu["tree"].name,
        "depth dwellers": cor_ru.entity_menu["depth dwellers"].name,
        "isabel": cor_ru.entity_menu["isabel"].name,
        "countless fauna in their various shapes": cor_ru.entity_menu["countless fauna in their various shapes"].name,

        // unitybel
        /*isabel*/ 'Huh?': "А?",
        /*isabel*/ "You really want to leave so soon?": "Правда? Ты уже хочешь уйти?",
        /*akizet*/ "what? no, no, of course not": "что? нет, нет, вовсе нет",
        /*sourceless*/ 'did i say something to imply that?': "я разве что-то такое говорила?",
    }, 
    entityDescriptions: {
        "return": `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание';'эмпирический мост'`,
        "continue": `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание';'эмпирический мост'`,

        "bench": cor_ru.entity_menu["bench"].desc,
        "tree": cor_ru.entity_menu["tree"].desc,
        "depth dwellers": cor_ru.entity_menu["depth dwellers"].desc,
        "isabel": cor_ru.entity_menu["isabel"].desc,
        "countless fauna in their various shapes": cor_ru.entity_menu["countless fauna in their various shapes"].desc,
    }
}

// === DIALOGUES === //


// == MOTH == //

env.localization.page['aquarium'].dialogues.mthresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        маскировочное тело?<+>stealthbody
            SHOWIF::"aqua__meetup"

        неважно<+>CHANGE::++moth
            FAKEEND::(назад)
`)
env.localization.page['aquarium'].dialogues[`mth++aquarium`] = generateDialogueObject(`
loop
    RESPOBJ::mthresp

start
    self
        вопрос

    moth
        чё как?
    
    RESPOBJ::mthresp
    
stealthbody
    self
        выходит обески действительно использовали маскировочные тела
        и звучит так, будто использовали часто
        разве это не была всего лишь теория заговора?

    moth
        ага... да, её так и преподносили
        но она всегда была оч правдоподобной. вот лично у меня никогда не было сомнений
        им же надо было как-то выучить наши языки
        и я реально думаю что они до сих пор живут среди нас
        они наверняка теперь ещё лучше сливаются с толпой

    self
        ладно
        ты куу?

    moth
        ох, если бы

    RESPONSES::self
        ок<+>loop
            FAKEEND::(назад)
`)



// --- yuri
env.localization.page['aquarium'].dialogues["meetup"] = generateDialogueObject(`
start
    sourceless
        центр близнецового парка, не так далеко от нашего места назначенья
        я явилась рано
            EXEC::content.classList.add("slowcam");content.classList.remove("instabel")
        так что я сажусь, моя замаскированная фигура в облегании нежного холодного дождя
            EXEC::setCam({x: 4, y: 8.5, rotation: 0});playerMoveTo(4, 8, "left")
        я могла бы заняться организационною работою пока здесь, она всегда найдётся, но...
        дождь, туман, они так знакомы
        словно грёза о простом прошлом, катаньи на вейльке, на охоте
        без груза обязательств или сумасшествия тайного конфликта на моём уме...
        царит мир
        и я дозволяю себе чувства, какие бы испытывал личиночный обеск
        это изменчивое тело не разработано для точности восприятья, и всё же отголоски ощущаются
        я дрожу, сжимаюсь в комок, плотнее стягиваю этот ложный тканевый плащ
        не то чтобы это имеет значенье--он есть часть этого тела, тщательно сформированная корруцистозная плоть,
        и оттого дождь скатывается по нему, как по металлу
        я приподнимаю коготь--или, полагаю, близнецовую руку
        наблюдая, как капли неестественно стекают с неё, поблёскивая в огненном свете со стебля позади меня
        это мгновенье, само по себе бессмысленное, внушает мне столькую жажду бегства
        не от этой ночи, не от этого мирного мгновенья, а от заговора, удушающего моё мыслеядро
        тропа, по которой я пришла к данному моменту, канула в небытье за мною, а я погрязла в запутанности всего происходящего
        развлекая команду, исчезая на работу с близнецами, ступая по тонкой ветви
        даже сей θмиг шторм неустанно продолжает наши усилья, регулярно оповещая о стабильном прогрессе
        так что, быть может, я не иду по этой тропе, а постоянно набирая скорость падаю и скатываюсь по ней, куда меня столкнуло велзи
        кажется, будто всё настолько вне досягаемости моих когтей. мне не за что зацепиться
        но, возможно, ещё есть время изменить направленье... 
        что-нибудь...
        ...
    
    sleepybel
        Аки?
            EXEC::content.classList.add("quickabel")

    sourceless
        голос позади, сопровождаемый стуком капель по натянутой ткани, застаёт меня врасплох
            EXEC::setCam({x: 4, y: 8.5, rotation: 70});
            WAIT::1000
            THEN::content.classList.remove("hideabel");content.classList.add("standobel")
        изабель, экипированная тонким полукуполом, защищающим её от дождя
        сколько времени минуло?
        она немного смеётся, делая несколько шагов ближе

    sleepybel
        Ты что, просто--сидишь под дождём?
        Тебе разве не неприятно?
        Наверное стоило предупредить, чтобы ты захватила зонт, хаха.
            EXEC::content.classList.remove("quickabel")
    
    sourceless
        поворачиваясь к ней, я забываю, что это тело адаптирует движенья рецепторов под выраженья лиц
            EXEC::setCam({x: 4, y: 8.5, rotation: 70, offsetCamera: "rotateX(20deg)", height: 1.75});content.classList.remove("standobel");content.classList.add("centerbel")
        и тогда радость на её лице сменяется беспокойством, когда она видит моё собственное...
        которое, как я только сей θмиг осознаю, наверняка отражает какого-то рода далёкое отчаянье
        она поспешно садится около меня, дождевой щит - укрывающий нас обеих
    
    sleepybel
        Ох... Ты в порядке?
        Что-то случилось?
    
    sourceless
        быстро тряхнув головою, я восстанавливаю равновесье и пока что избавляюсь от этого наважденья
        увидеть её достаточно, чтобы улыбнуться
        
    akizet
        да! да, извини меня,
        как же приятно тебя видеть, моя подруга!
        ...ах, полагаю, как ты говоришь, я "думала о работе..."
    
    sleepybel
        Всё так же тяжко, да?
        Понимаю.
        То есть... Хаха, не совсем. Навряд ли всё точно так же, но..
        Что ж, хватит так волноваться из-за неё, хорошо?
        Этой ночью мы обе забудем обо всём остальном.
    
    sourceless
        я смеюсь и киваю в согласьи--чувство свободы уже возникает в нашей общей пустоте
        в то же время она щипает ткань моего плаща, озадаченная
    
    sleepybel
        И как ты только не промокла?
        А, точно, это... Да, ага.
        Окей, отлично. Не хотелось бы мне зайти с зонтом,
        Пока ты волочишься следом за мной с видом, словно я оставила тебя под дождём.
    
    akizet
        <span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'намеренная глупость'">я не вижу проблемы</span>
    
    sourceless
        она хихикает и встаёт, поднимая меня на ноги следом за собою
            EXEC::setCam({x: 4, y: 8, rotation: 90});playerMoveTo(4, 8, "left")

    sleepybel
        Ага.
        Окей, короче, Ди ждёт нас около служебного входа, через него мы и войдём.
        Судя по её словам, аквариум будет в странном виде, ибо обычно он к этому времени уже закрыт,
        но до главного ночного мероприятия ещё около часа...
        Так что, все другие выставки всё ещё открыты!
        Ещё она сказала, что ресторан тоже будет открыт.
        Вообще, он для работников на сверхурочных, но она предупредила их, что мы придём, так что...
        Можем взглянуть на всё <em>и</em> чем-нибудь перекусить.
        Я не была уверена, как всё выйдет, но в итоге нам очень повезло.
    
    akizet
        это отличается от того, как обычно работает эта среда обитанья?
    
    sleepybel
        Ну, обычно он не открыт по ночам. И обычно они не впускают людей внутрь во время приготовлений
        Поэтому вся разница в том, что там будем, считай, что только мы вдвоём.
        Обычно там такие толпы, так что этот вечер особенный...
        Ну же, пошли!

    RESPONSES::akizet
        отправиться<+>END
            EXEC::change("PAGE!!metabel", true);refreshStage({noFlash: true});content.classList.remove("slowcam", "centerbel", "quickabel");setCam()

SKIP::change("PAGE!!metabel", true);refreshStage({noFlash: true});content.classList.remove("centerbel", "quickabel", "slowcam", "standobel");setCam()
`)

env.localization.page['aquarium'].dialogues["entry"] = generateDialogueObject(`
start
    sourceless
        входная камера этой ложной среды обитанья останавливает моё движенье
            EXEC::ratween(env.localization.page['aquarium'].bgm, 0.8)
        ибо я охвачена подобными виденьями прошлого
        центральная общественная камера олтазни, увешанная знаменами из раскрашенной вейльковой кожи
        соединительные туннели вдоль стен, даже проделанные в верхней камере, для лазанья
        и каждый освещён собственными индивидуально окрашенными <span class="code">юзку</span> шарами, некоторые аж парят в воздухе...
        это то же самое величье, но выраженное на близнецовом языке, здесь
        однако по тем же меркам оно обыденно и статично
        великое количество их строений именно такое
        очередное доказательст
            WAIT::1000
            AUTOADVANCE::

    sleepybel
        Акизет?
            EXEC::content.classList.add("sideabel")

    sourceless
        изабель прерывает моё изумленье взмахом руки перед моими глазами
        она сдерживает смех плотною улыбкою
        должно быть, тело откровенно выражает мой восторг
        
    sleepybel
        Всё хорошо?

    akizet
        д--да, так точно!
        извини меня, меня отвлекло это... сооруженье

    sleepybel
        Хаха! Извинить тебя?? Прекращай это повторять.
        Я просто... Не знаю, удивилась!
        Ты уже столько всего повидала, но так оцепенела от какого-то вестибюля?
        Разве ты уже не успела повидать весь мир?
    
    akizet
        разве что из неба, изабель
        это место навеяло на меня воспоминанья
        освещенье, знамена, сама форма помещенья напомнили мне о фестивалях на родине

    sourceless
        и пока я указываю жестами для выразительности, ко мне приходит вопрос

    akizet
        а... куда мы пойдём сперва?

    sleepybel
        Осталось,
        
    sourceless
        изабель проверяет свой светящийся коммуникатор, извлечённый из теплоизолированного кармана
    
    sleepybel
        Чуть меньше часа, прежде чем они будут готовы впустить нас на выставку, думаю.
        Мы хоть и получили особый доступ, но наверное там до сих пор небольшая суматоха. // "" КТО написал тут "наверно". Я Так не пишу???? Это же не я, да?...
        Скорее всего, не хотят, чтобы мы путались у них под ногами.
        Ну, а пока можем идти куда угодно!
        Они закроют остальные экспонаты только на время публичного открытия.
        И если кто спросит, у меня припасены волшебные слова против любых сотрудников.
        "Ди впустила нас. Агась, друзья Ди".
        В любом случае, неправильного ответа нет. Я всё здесь видела, и всё крутое.
            
    sourceless
        она улыбается сильнее, и с коротким смешком,
        она толкает меня вперёд небольшим нажатьем в плечо
            EXEC::content.classList.remove("sideabel")
        
    sleepybel
        Так что иди первой!

    sys
        УВЕДОМЛЕНИЕ::'непоследовательный поток памяти'
        УВЕДОМЛЕНИЕ::'используйте сущность';'ИЗАБЕЛЬ';'для доступа к вспоминанию на основе локации'

    RESPONSES::akizet
        исследовать<+>END
            EXEC::change("PAGE!!lobbybel", true)

SKIP::content.classList.remove("sideabel");change("PAGE!!lobbybel", true)
END::ratween(env.localization.page['aquarium'].bgm, 1)
`)

env.localization.page['aquarium'].dialogues["bigtank"] = generateDialogueObject(`
start
    sourceless
        пока мы идём, изабель неожиданно тычет в мой плащ
            EXEC::ratween(env.localization.page['aquarium'].bgm, 0.8)
        который, как она прекрасно знает, является моею кожею
        так что она очень быстро привлекает моё вниманье
        ухмыляясь на меня сверху вниз, молча

    akizet
        что?
    
    sourceless
        так ярко моё настроенье, что вслед за моим вопросом увязывается маленький смешок
        только тогда я вспоминаю - в который уже раз - что это тело улыбается за меня
        и я почти повторяю её собственное выраженье
    
    sleepybel
        Странно видеть твоё лицо таким... Не знаю, "активным".
        Я думала, что научилась неплохо различать твои чувства по рецепторам.
        Но теперь почти уверена, что упускала многие из них.
    
    sourceless
        я чувствую, как моя улыбка меркнет, раздираемая далёким внутренним конфликтом
        это "странно"? она выразилась с улыбкою - хотя я знаю, что она умеет тщательно подбирать слова
        моё изменившееся выраженье, возможно, видимое замешательство, побуждает её рассмеяться и продолжить
        
    sleepybel
        Акизет, это мило!
        Вот что я хотела сказать.
        Кажется, я видела, чтобы ты улыбалась ну там пару-тройку раз, но не так, как сейчас.
        Ты полностью растеряла весь свой облик "непоколебимого древнего пришельца".
    
    akizet
        такою я тебе казалась?

    sleepybel
        Да... Да, как и все обески.
        За исключением очень сильно старающихся с телевизора. / За исключением тех с телевизора, кто уж очень старались
    
    sourceless
        я останавливаюсь и изучаю лицо изабель, задумываясь
        многочисленные движенья близнецового лица неуловимы для меня
        улыбки очевидны, повсеместны
        даже личиночный обеск может слегка приулыбнуться в мгновенье великого восторга
        но в одном только этом θмиге есть бессчётное количество тонкостей, которые я с трудом распознаю
        неровное шевеленье бровей, медленное сгибанье губ вовнутрь
        небольшой звук, производимый быстрым вдохом через нос,
        всё это соответствует дразнящему подавленью смеха
        приятно распространённое явленье в наших разговорах, достаточно для того, чтобы я его узнавала
        однако я всё же гадаю, сколько ещё пропускает мой нетренированный глаз

    sleepybel
        Да, Аки?

    sourceless
        ах, я уставилась на неё
        тогда как мои рецепторы обычно бы обозначили мои размышленья медленным вращеньем
        это тело преобразовало их в напряжённое выраженье, с коим я не знакома
        cтоит мне оторваться от мыслей, как оно исчезает без следа, слишком быстро, чтобы я успела его изучить
        но, несомненно, именно от него она сдерживала смех
        моё смущённое осознанье наносит последний удар, и она наконец-то хохочет

    akizet
        извини! я всего лишь задумалась--
        мне предстоит расшифровать ещё многое и в твоём лице
        я гадаю, как бы ты выглядела с рецепторами
        хмм... с парой ветвящихся--вот таких!
    
    sourceless
        я подношу когти--руки, к бокам своей головы, имитируя тир-рецепторы

    akizet
        насколько я слышала, инициатива ложных рецепторов теперь лишь частично инвазивна
        всё, что требуется - это несколько небольших разрезов в черепной-- // "" "ЧАСТИЧНО ИНВАЗИВНА". интересно что было до этого
            WAIT::2000
            AUTOADVANCE::

    sleepybel
        Окей, нееет.
        Давай подождём, пока они не придумают способ, не предполагающий вслерливание в мой череп.

    sourceless
        её смех заразителен

    akizet
        близнецовые предостереженья по поводу телесных изменений поистине озадачивают, изабель
        но я отметила твоё предпочтенье
        я передам слово, чтобы они поспешили

    RESPONSES::akizet
        продолжить<+>END

SKIP::
END::ratween(env.localization.page['aquarium'].bgm, 1)
`)

env.localization.page['aquarium'].dialogues["arch"] = generateDialogueObject(`
start
    sourceless
        прозрачная арка над нами наводит на мысль о зрительных проекциях в посольстве
            EXEC::content.classList.add("slowcam");setCam({offsetCamera: "rotateX(20deg)", height: 2, rotation: 90, x: 3, y: 8});playerMoveTo(3, 8, "left");ratween(env.bgm, 0.8)
        активность водной фауны, безусловно, снижена в связи со временем суток,
        но какие-то очертанья всё ещё блуждают по среде, переливаясь своею странною кожею в освещеньи
        я перевожу взгляд в сторону, ожидая, что изабель наблюдает за тем крупным, проплывающим над нами
            EXEC::setCam({offsetCamera: "rotateX(10deg)", height: 1.75, rotation: 145, x: 3, y: 8.5})
        но её глаза отстранены, надолго закрываются, а затем быстро промаргиваются
        её окутали раздумья? движенье смутно напоминает мне о чём-то
        нет... нет, она утомлена, борящаяся с телом за бодрствованье
        личиночное истощенье - чувство, оставшееся так далеко в прошлом, что оно почти внушает зависть
        конечно, её глаза вновь сосредотачиваются, стоит ей обратить вниманье на мой взор
    
    sleepybel
        Хехе, чего?
    
    akizet
        неужели день обошёлся с тобою так плохо?

    sourceless
        день? я не это собиралась, ах...
        должно быть, моя маскировка пытается подстроить мне язык

    sleepybel
        А? О чём...
        Ох, ага. Да, прости. Длинным выдался.
        Это... Да не стоит это обсуждать. Дела на работе.
        Мы здесь, чтобы позабыть обо всём лишнем, помнишь?

    akizet
        очевидно, что они тяготят тебя, подруга моя
        не помог бы тебе разговор о них?

    sourceless
        на мгновенье тёмный коридор утихает
        вдали нежно шумит лишь оборудованье для поддержки среды обитанья, журча подобно реке
        изабель колеблется перед нарушеньем собственного правила, но моё выраженье убеждает её переступить порог
        мы усаживаемся на одну из скамей у арки
            EXEC::setCam({offsetCamera: "rotateX(10deg)", height: 1.5, rotation: 145, x: 3, y: 8})
    
    sleepybel
        Ладно, совсем немножко. --- И больше не будем поднимать эту тему. --- не нравится 
    
    akizet
        разумеется, хихи
    
    sleepybel
        Итак, я работала с одной парой.
        И они хотели устроить такую большую, шикарную свадьбу в этом месяце.
        Как бы, всю устиланную цветами. Ещё и экзотичными, которые мне пришлось искать и импортировать...
        Мы планировали её месяцами, и они заплатили авансом...
        Половину от итоговой суммы. Мы всё обсудили.
        Оглыдывясь, наверно, глупо это было, но деньги были приличными. Тогда казалось, что это разумно. 
        А сегодня, не знаю, они всё отменили--не свадьбу, а часть с цветами.
        Даже не сказали мне, почему. Пришлось наспех пытаться отменить заказы, получить возвраты...
        Но я очень рассчитывала на эту вторую половину, чтобы выйти в ноль этим месяцем.

    sourceless
        through her explanation, her eyes drift to follow shapes moving in the dark water
        but even as i try my best to follow her story,
        her description of their commerce is quick to shake my understanding
        the concepts are familiar, but their application here...
    
    akizet
        огорчает... несправедливо с их стороны бросить тебя без объяснений
        но что ты имеешь в виду под "выйти в ноль"?
    
    sourceless
        изабель трясёт головою, вздыхая и опуская взгляд на меня безо всякой эмоции
    
    sleepybel
        Здесь дорого. Ну, знаешь, аренда--за магазин, за собственное жильё, за...

    sourceless
        with a sharp exhale and chuckle, an incredulous smile twists out of her disappointment

    sleepybel
        Погоди-ка, Аки, у вас дома же есть деньги?
        Тебе платят за работу здесь?
        Я только сейчас поняла, что эта тема... никогда и не поднималась.
        То есть, может с Гордоном, когда мы познакомились, но это не то.
    
    sourceless
        she surely does not mean it in the way that i understand
        for a moment, my attention drifts as i scour my mind for the right words
        i have seen cousins exchange their currency plenty of times, yes, but...
        the implications of this trade upon their lives had never set in
        oh, but isabel has erupted with laughter
        again, my disguise-skin has twisted its expression into one of intense, distant focus
        is it so funny that i struggle to explain?
    
    akizet
        да! да, есть, хихи, извини--
        а, ну вот, я опять повторяюсь...

    sleepybel
        Ха.

    akizet
        it was not on an individual level, exactly, isabel
        it was only after sfer had been, ah, 'invented', that we had a true currency to use
        and even then, it was primarily for inter-city trade
        before that, especially during my larval <span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'автоперевод и коррекция фраз';'предоставляется телом';'функция маскировки'">years</span>, 
        we simply exchanged raw resources, food, or favors for the same from other cave-cities
    
    sourceless
        i pause, but she expects me to continue, i see it in her fascination
        what is it she seeks to know?
        ah--yes, it is the inverse of my confusion that grips her

    akizet
        ...but, on an individual level, these matters were irrelevant
        the oltazni council allocated resources where they were needed
        essentials were provided, and artisans might demand small trades or favors, but...
        all worked towards our common goal of survival and community
        even in my travels, most other collectives were the same
        so prevalent is this, that some suspect it to be an instinct in our larval minds
        <span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'автоперевод и коррекция фраз';'предоставляется телом';'функция маскировки'">today</span>, our interstellar operations operate like one large collective, so,
        it is much the same - at least for laborers like myself
        but i imagine the council must drive themselves mad with modern allocation decisions, in all their complexity
        i believe they have significant cognitive enhancements, 
        or perhaps other automated tools, but i have never investigated in detail
    
    sourceless
        i deliver this knowledge with a matter-of-fact tone, as it is true mundanity
        these matters never occupy my mind, for i was never a trade-runner
        yet isabel absorbs every word as the bright parasites drink water
        far more awake, focused - but there is something about her eyes...
        is this not what she wanted to hear?
    
    sleepybel
        Хах. Мило.
    
    sourceless
        её слова пронзают меня--комплимент, но не произнесённый как таковой
        я что, только ухудшила её настроенье?!

    sleepybel
        Мне почти хочется, чтобы здесь всё работало так же, но...
        Это невозможно.
        Мы все сами по себе, Аки.

    sourceless
        pain bleeds through the nonchalance of her words
        Å+¾ð…!Œ
        i should not have pressed her
        one more little death to haunt me

    akizet
        i... i am sorry, isabel
    
    sourceless
        if she must hunt for her own currency, and she struggles so,
        perhaps i could help?
        already, long-dead instincts spark within me: the urge to hunt // "" Аки-добытчица в её с Изиной целиком и полностью традиционной ксеносемье <з
        surely the cousins must store mass quantities somewhere
        one cloaking skin, and the right moves, and maybe i could...
        or! perhaps it could be manufactured directly?

    sleepybel
        Нет, ничего--агх, прости и меня, Аки.
        Просто для меня это были непростые несколько месяцев в плане бизнеса.
        Но спасибо, что поделилась. Всегда интересно послушать о твоём доме.
    
    sourceless
        she coils an arm around my shoulder, pulling me into a half embrace,
        shelving my thoughts of the hunt
        i return the gesture gently - she could use the comfort
    
    sleepybel
        Даже странно насколько порой легко забыть то, что ты из другого мира.
        Быть может, всё наладится само собой.
        До этих пор всё шло довольно неплохо, так что,
        Мне просто нужно продержаться, пока вы, пришельцы, всё не исправите, да?

    sourceless
        the tension is shed with some brief laughter between us
        she is not wrong
        it has always been the intention that we could help, long-term
        but that crosses far past the boundary of what we ought to ignore for this time
        and so, a silent moment of observation passes, our attention on the waters
        we leave the topic behind happily
        but her exhaustion remains an issue - something to be solved
        i rise, and she joins me
            EXEC::setCam({offsetCamera: "rotateX(0deg)", height: 1.5, rotation: 145, x: 3, y: 8})
    
    akizet
        let us stop by that 'restaurant'
    
    sleepybel
        Хаха!
        Это не так говорится, Аки.
        Но да, пошли.
        
    RESPONSES::akizet
        продолжить<+>END
            EXEC::setCam()

SKIP::setCam()
END::content.classList.remove("slowcam");ratween(env.bgm, 1)
`)

env.localization.page['aquarium'].dialogues["restorounte"] = generateDialogueObject(`
start
    sourceless
        dissected, seared 'fish' sits upon pale and smooth stone disks before us
            EXEC::refreshStage({specificPlan: "sittang"});setTimeout(()=>setCam({x: 1.8, y: 6, rotation: -90, distance: 0.2, offsetCamera: "rotateX(-10deg)", instant: true}), 200);ratween(env.localization.page['aquarium'].bgm, 0.8);
        fortunately, this body was designed to tolerate social eating,
            EXEC::content.classList.add("slowcam")
        so the act itself was hardly difficult, the cousinly tools simple and familiar enough
        the cooked flesh parting easily, as savory as a <span definition="INHERITED CONTEXT::'violent surface river fauna';'imitates mature celki glow'">deceiving bulb</span>'s flesh

    sleepybel
        Я думала, что это были всего навсего воспоминания со времён, когда и трава была зеленее... // хочется оставить что-то про то что она была ребёнком, а не просто "хорошие времена", но думаююююююююююююююю думаю что вы ничего не предлагаете >:<
        Всё ещё поражает, насколько это хорошо для ресторана при аквариуме. Серьёзно.

    sourceless
        rose-tinted? 
        what does a bright parasite have to do with this?
        she preempts my question, surely divining my thoughts from this emotion-adapting face
        exactly why i much prefer to be without a disguise-skin
        though i hold no conflict with it, in isabel's company
    
    sleepybel
        Это значит, что она хороша настолько же, насколько я и помнила, хаха.

    akizet
        ah!

    sourceless
        this place, without significant change since her childhood...
        it is staggering to imagine
        in my lifetime, everything changed so constantly
        corrucystic technology was born, cave-cities expanded and reinforced
        all comfort was hard-won from the beasts that sought to take everything from us
        every memory i can recall, good or bad, is along the path of this battle
        but i have only a surface of her memory, what has been shared, to look upon
        could it have been the same for her, unknown to me?

    akizet
        isabel, has this place always been a paradise?
            EXEC::setCam({x: 2, y: 6, rotation: -90, distance: 0.2})

    sourceless
        she nearly spits out a mouthful of food, quickly covering her mouth
        with muffled laughter, she swallows, struggling to bring herself to speaking state
        i join her in laughter - i suppose that was a rather abrupt question...
    
    sleepybel
        Боже мой, Аки!
        Ты очаровательна.
        Это дорогущая дыра, всегда ей была.
        Так что, для кого-то вроде меня, это - самое близкое к раю место.
        Что, кстати говоря, всё ещё далековато.
    
    sourceless
        she laughs again, though i fail to join her this time
            EXEC::setCam({x: 2, y: 6, rotation: -90, distance: 0.2, offsetCamera: "rotateY(3deg)"})
        perhaps this touches again upon the pains we agreed not to speak of
        the struggles her people's systems place her within
        but it is hard to place the boundary, so i do not press further
        
    sleepybel
        Прости, всё не--всё не так уж плохо.
        Нет худа без добра. Всё уравновешено. Как же звучало то ваше религиозное выражение?

    sourceless
        my receptors--no, my face, it smiles slightly, again reading my impulses

    akizet
        'a place of joy and terror both'?
            EXEC::setCam({x: 2, y: 6, rotation: -90, distance: 0.2})

    sleepybel
        Ага, всё так же. Не знаю, может не совсем "ужас"...
        Может, это и подходит к текущему месяцу.
        Но, с моей точки зрения, судя по всему, что ты мне рассказывала,
        Я бы, наверное, тоже подумала, что твой дом - рай.

    akizet
        you might, were you to visit in the modern <span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'автоперевод и коррекция фраз';'предоставляется телом';'функция маскировки'">day</span>
        the corrucystic revolution truly changed everything
        before that, it was... ah...
        really, i nearly wonder how we all bore the burden
        the worst troubles now are the age of the oltazni council's most stubborn leaders,
        and perhaps the dwindling larval population
    
    sourceless
        isabel's face contorts in a way i rarely see
        i struggle to parse that it is a mock-pout until she speaks, obvious in her tone

    sleepybel
        Ладно, что ж, это нечестно.
        Я <em>ожидала</em>, ты скажешь, что твой тоже не рай.

    akizet
        yes, well, you <em>would</em> have to avoid the surface and its flesh-seizing parasites
        and evade the rare beast that seeks entry through unknown crevices in the walls
        still hungering for larval flesh, sparse as it may be now
        but...
    
    sourceless
        i examine isabel thoughtfully, considering her personality
        what i have observed of her confidence and care
        the effortless warmth that she exudes
    
    akizet
        if you were one of us, you would be a tir, undoubtedly
        and so, these worries would be far from you
        m... most of the time
        actually, you would have to help mitigate emotional damage from them, so--
    
    sleepybel
        Ага, так, <em>не</em> рай.
        Ты просто пытаешься приукрасить.
        Балда. // """ балда :)
    
    akizet
        hehe, i suppose
            EXEC::content.classList.remove("slowcam");flash(true)
            WAIT::500
            THEN::setCam()

    RESPONSES::akizet
        продолжить<+>END
            EXEC::refreshStage()

SKIP::refreshStage();setCam();content.classList.remove("slowcam");flash(false)
END::ratween(env.localization.page['aquarium'].bgm, 1)
`)

env.localization.page['aquarium'].dialogues["deepsee"] = generateDialogueObject(`
start
    sourceless
        of all the fauna we have observed thus far,
            EXEC::ratween(env.localization.page['aquarium'].bgm, 0.8)
        these creatures of the depths inspire the most curiosity
        i am no stranger to the abyssal depths of the bright ocean,
        but seeing its sparse, varied life condensed into these chambers is thrilling
        they bring forth visions of obeski's darkened surface
        bioluminescence, enormous hard-shelled scavengers, writhing masses of tendrils...
            
    sleepybel
        Эй, Аки, а правда, что в вашем океане нет жизни?
            EXEC::content.classList.add("sideabel")
    
    sourceless
        her question breaks me from my ravenous observation - how did she know that?
        really, it is a surprise... she rarely asks about any part of home so abruptly
        i delay a moment, considering my words carefully as if speaking with one of the envoys

    sleepybel
        Прости, если--если это что-то, о чём ты не должна говорить.
            EXEC::content.classList.add("centerbel");content.classList.remove("sideabel")

    sourceless
        the troubled thought must be plain in this body's face, again
        but my caution evaporates as her explanation unfolds

    sleepybel
        Я просто вспомнила из рассказов Ди, что в этом месте хотели сделать выставку Обескии.
        Видимо, есть какие-то обески, которые улекаются созданием маленьких, э...
        Типа, обескиевых животных, и они с ними связались.
        А потом речь зашла о том, что ваши океаны как бы мертвы?
        Возможно, эту часть просто неверно перевели.
        Впрочем возможно её всё ещё сделают, с континентальными животными // "" возможно слово получше чем "континентальные"...
        Но мне показалось, что это в самом деле интересная тема.

    akizet
        ah, well, i am no expert on the matter
        but it is true, yes
        the ocean itself is a vast cold waste, aside from near the natural spires
        from what i have heard and seen on the collective, all that has been observed is a...
    
    sourceless
        i nearly call upon funfriend to help with a word,
        but i really must sharpen my own speech
        so, with inward focus so driven that all other senses fade from mind, i continue,
        an unmistakable joy and fascination in my voice
    
    akizet
        a sort of... writhing blanket, that coats the ocean floor
        flattened, moving with its own waves, sparse tendrils rising from it and drifting in currents
        its nature is still unknown to us, as it reacts quite violently to attempts at approach or harvest
        but it is probably either a single entity, or a superorganism, much like corru!
        i would very much like to see it myself
        i never did, before i left for your world...
    
    sourceless
        content in my description, inspired by this ancient mystery,
        i return my focus to isabel
        her eyes are wide, shocked into the same state as when i scare her with my pranks
    
    sleepybel
        И тебя это никак не волнует?

    akizet
        hardly
        i regret that i was not brave enough, i suppose
        so much open space is unnatural, far too unnerving for me at that age
        but our deaths are long, there is plenty of time to...
    
    sleepybel
        Нет-нет, та--та штука типа ковра, то, что она <em>есть там</em>.
        То есть, ну, дно океана целиком. Типа, вообще по всему миру?

    akizet
        oh?
        yes, we believe it extends even beyond the inhabitable zone, beneath the ice
        it being unsolved is frustrating, i suppose
        but it has always been there
        that is simply the nature of things

    sourceless
        she is silent for a θblink, breaking it with an exasperated chuckle

    sleepybel
        Аки, это реально треш. // "" убил её. но это же я так перевёл. убил себя

    akizet
        well, there is nothing to be done, isabel
        it has rested there for what must be <span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'автоперевод и коррекция фраз';'предоставляется телом';'функция маскировки'">millenia</span>
        and it shows no sign of ever changing that
        there is a sort of comfort in knowing it is silent, really
        that no great shapes may rise from the dark unexpectedly
        it is more 'freaky' to me that your ocean holds such an unfathomable mass of life
        even further that so much is allegedly unidentified and never seen

    sourceless
        her laugh echoes through the darkened hall

    sleepybel
        Вау, странно слышать это от тебя. Треш.
        По-видимому, теперь я буду бояться ещё одного океана.
    
    akizet
        hehe, it was your request!

    RESPONSES::akizet
        продолжить<+>END
            EXEC::content.classList.remove("sideabel");content.classList.remove("centerbel")

SKIP::content.classList.remove("sideabel");content.classList.remove("centerbel")
END::ratween(env.localization.page['aquarium'].bgm, 1)
`)

env.localization.page['aquarium'].dialogues["goodbye"] = generateDialogueObject(`
start
    sourceless
        how familiar this sight is... i nearly expect to feel the water's current
            EXEC::content.classList.add("slowcam");ratween(env.localization.page['aquarium'].bgm, 0.8);
        the light is careful, directed, allowing the jellyfish to appear to glow in the light
        i briefly occupy myself by examining the individual enclosures,
            EXEC::playerMoveTo(13, 36, "up")
        the way the specimens almost imperceptibly separate and stack together
        isabel laughs at my pacing, sitting at a bench before the display, entirely unhurried
            EXEC::change("PAGE!!talkedfinal", true)
    
    sleepybel
        Красиво, правда?
        Они уже как несколько лет не использовали такое освещение для выставки.
        Боже, нет, прошло... Прошло почти десять лет с последнего раза.
            EXEC::playerMoveTo(13, 35, "up");env.localization.page['aquarium'].stage.querySelectorAll(".stageabel").forEach(el=>el.innerHTML = "")
    
    sourceless
        she scoffs, surprised at herself
            EXEC::content.classList.remove("hideabel")
        i sit by her, admiring the colored creatures surrounding us
            EXEC::setCam({x: 13, y: 35.5, rotation: 180, height: 1.5, offsetCamera: "rotateX(30deg)"})
        so much has been shared, here
        so much weight shifted across our shoulders
        i have needed this
        but our visit is ending, and i cannot know when we will be able to do this again
        a moment of silence passes, slowly growing heavier as i realize she probably thinks the same

    sleepybel
        У тебя так же, Акизет?
            EXEC::setCam({x: 13, y: 34.5, rotation: 110, height: 1.5, offsetCamera: "rotateX(20deg)"});content.classList.add("sitabel");
        То, как всё идёт своим чередом, а ты даже не замечаешь, насколько стремительно.

    sourceless
        confusion and surprise is surely painted upon my false face
        a strange, sad thing to bring forth here, is it not?
        but it is also not an alien notion to me
        
    akizet
        yes, it...
        it is especially so in θdeath
        time is nearly forgotten, but it passes still
        there have been <span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'автоперевод и коррекция фраз';'предоставляется телом';'функция маскировки'">decades</span> where i have gone entirely without words to larval friends

    sleepybel
        Ага, точно так же.
        Ну, может не прямо <em>точно</em> так же...
        Просто, забыться можно так легко, так надолго
        Я заправляю этим магазином уже как четыре года, кажется.
        Преследуя мечту заставить всё работать в месте, которое с каждым днём становится лишь хуже.
        И это здорово, то есть, иногда это <em>так</em>, как я и хотела.
        Но...
        Я едва ли вижусь с братом, я почти пропустила вылет на похороны отца из-за плохого месяца...
        Прошли годы с тех пор, как я общалась с некоторыми из своих друзей.
        Не могу и вспомнить последний раз, когда я брала передышку.
        Столько дел, везде, всегда.
        Иногда, когда я работаю,
        Я просто моргну и осознаю - как много времени прошло со всего, что произошло в моей жизни.
        Как если бы я была в чём-то вроде транса, упуская всё вокруг.
    
    sourceless
        she shifts to face me more directly, smiling a little, but her eyes...
        unconsciously, my disguise-skin interprets some receptor movements into a frown
        still, i nod--of course i understand
        even if i can only imagine the pain it brings in a limited lifespan
        for a moment, there is silence, broken by a quiet scoff

    sleepybel
        Извини, знаю, я ту ещё тему подняла.
        Я просто хотела сказать: с тех пор, как ты начала приходить,
        Ты словно вырываешь меня из этого всего.
        Да, именно, я как бы "прихожу в чувство". Мне всё ещё приходится вернуться, но...
        Я могу ненадолго проснуться. Всё встаёт на свои места.
        Ты понимаешь, о чём я?

    sourceless
        put into perspective...
        a small, would-be twist of a receptor creeps across my face as an empathetic smile
    
    akizet
        i do, isabel

    sourceless
        i am tempted to say more, to speak as if we are trapped in separate nightmares,
        to speak on the irreconcilable differences in our struggles, a world apart as they are
        she is trapped here, coiled in a system i do not fully understand
        just as i stand in the eye of a forming storm
        the remedy that occurs to me brings a sudden chuckle
        after all, we can hardly help each other in any direct way
        not without...
    
    akizet
        let us shrug this all aside
        we should simply flee into the dark
    
    sourceless
        there is a refreshing, physical relief that passes through me as i speak the words
        even if a playful vel's mask covers them
        she laughs at the absurdity of my escalation, and i join her
    
    sleepybel
        Да ну?
        Мне казалось, ты переросла свою "давай сбежим" фазу сотню лет назад.
    
    akizet
        vel are exceptionally proficient runners, isabel
        the feeling never truly goes away

    sourceless
        a moment passes - we exchange some more thoughts on the matter, mostly jokingly...
        but silently, behind the mask on her own words, the suggestion resonates
        yes--both of our dreams crush us beneath their continued needs,
        such that the thought of escaping, for all the pain and regret it would cause...
        it does gain its own appeal
        but nothing is to come of this, for either of us
        in the pause that arrives after some discussion, i seize the opportunity - it is a good time
    
    akizet
        isabel
        hold out your hands
        i have something for you
    
    sourceless
        she obliges my penchant for surprises once more, turning her palms up with a patient smile
        there always has been something like it in her face, wholly lacking the tension of the envoys
        her words are no facade for some secret question, never pursuing some hidden agenda
        if it would not pointlessly doom her to continued worry, 
        i would tell her all of the conflict, the storm and its growth
        she is perhaps the only cousin i truly trust, without condition
        and so, i reach through a false coat pocket, into my own chest cavity, producing a small cyst
        with my other claw - hand for now, i suppose - i draw her palms closer together
        then, i place the cyst into their concave platform
        the fascination and surprise in her face is an easily recognized shape
    
    akizet
        i tire of relying on the embassy's relays and my own sparse visits
        this is a communicator, the same sort we give to envoys and other government contacts
    
    sourceless
        i twist it around in her hand, such that an interface-pattern stares up at her
        a series of 'buttons,' the sort that cousins place in their own communicators
        and instruct her in their purpose, guiding her through its sequences
        it is simple, really - designed to be familiar to any cousin
        my thoroughness is unnecessary, yes, but...
        but this is important
        i share mundane details, notes on its simple care and maintenance, its motions
        and in short time, she knows all she needs
    
    akizet
        ...so do not be alarmed, if it crawls towards you
        that will just mean someone - probably me - is attempting to reach you
        does that all make sense?

    sourceless
        that same fascination still sits over her face
        there is... what is that one called? 
        a 'smirk'...

    sleepybel
        Да, думаю разобралась.
        Мне точно можно хранить это у себя?
        
    akizet
        these are usually reserved for special direct contacts
        and i believe you fit the criteria
    
    sourceless
        i release her hands, allowing her to place the cyst in her satchel

    akizet
        we will be able to speak at any time
        me especially, as my communicator is directly connected to my mind
        so, if fleeing is not an option...
        let us at least be each other's distractions
        you from your trance,
        me from velzie's winding path
    
    sleepybel
        Это очень мило, Аки.
        Спасибо.
    
    sourceless
        she pulls me into a firm hug, which i reciprocate easily
        it lasts a while
            EXEC::content.classList.remove("slowcam");

    RESPONSES::akizet
        depart<+>CHANGE::partways
            EXEC::setCam()

    RESPONSES::self
        linger<+>END
            EXEC::setCam();content.classList.remove("sitabel");content.classList.remove("hideabel");chatter({actor: 'sys', text: "NOTICE::'no other memory streams in region';'locate exit nearby'", readout: true, delay: 3000, duration: 12000})

SKIP::setCam();content.classList.remove("sitabel");content.classList.remove("hideabel");change("PAGE!!talkedfinal", true);refreshStage({noFlash: true});content.classList.remove("slowcam");
END::ratween(env.localization.page['aquarium'].bgm, 1)
`)

env.localization.page['aquarium'].dialogues["partways"] = generateDialogueObject(`
start
    sourceless
        in time, we depart through a side exit, intended for the workers
            EXEC::change("PAGE!!metabel", true);vfx({type: "darkflash", state: true});content.classList.remove("hideabel");content.classList.add("sideabel");
        careful to avoid the crowd forming at the main entrance
        and soon we arrive back at our meeting point,
            EXEC::changeStage("aqua_outside", 148, "down", {noFlash: true})
        rain still pattering upon isabel's domed shield overhead
            EXEC::vfx({type: "darkflash", state: false});
    
    sleepybel
        Спасибо, что пришла, Аки. Это наверняка было непросто с тем, как ты сейчас загружена.
            EXEC::content.classList.add("centerbel");

    akizet
        what? nonsense!!
        i am busy, yes, but i linger in this city more than ever in recent <span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'автоперевод и коррекция фраз';'предоставляется телом';'функция маскировки'">weeks</span>, 
        sure to continue for some time, given my, ah... project
        and of course, the act of sleep not being within my needs
        perhaps we may visit a few more places, in the 'evenings', when your work is done?
    
    sleepybel
        Да! Да, да, конечно. Я постараюсь найти время.
    
    sourceless
        she smiles, there is kindness in her voice, but the weight lingers
        yes, she says, yet her eyes speak only of the difficulty my request suggests
        it is an imposition
    
    akizet
        it need not be so grand as this, isabel
        nor by your decision alone--i do have a vessel for flight, after all
        i think it would be delightful to visit those fields you spoke to me of
    
    sleepybel
        О, ага! Думаешь, получится перевезти нас обоих?
        Кажется я думала, что твое судно просто, как бы, убьёт меня.
        По телевизору они выглядят такими опасными в движении.
        
    akizet
        what? no! 
        with careful altitude and speed, it is fine, isabel
        something to show you, in time!
        perhaps i could even show you now, if--
        
    sleepybel
        Аки.
        Тебе сон может и не нужен, но я не спала уж слииишком долго.
    
    sourceless
        ah--my excitement seized my voice before reason could, as it often does
        fatigue is painted so clearly in her face and stance
    
    akizet
        right, yes, of course
        then i suppose, for now this is goodbye
        take care, isabel
        may velzie smile upon you

    sleepybel
        Хаха!
        Ага, и тебе, Аки.
            EXEC::content.classList.remove("centerbel");content.classList.remove("sideabel");content.classList.remove("sitabel");
            
    sys
        NOTICE::'end of non-sequential memory stream'

____SHOWONCE::
    self
        isn't this kind of personal?
        is this going on the report?

    moth
        there's still some usable info here and there
        most of it will probably just end up being footnotes
        since when did you worry about that kinda stuff?
    
    self
        i'm not worried
        it just felt intrusive
    
    moth
        yeah, i guess it's a little weird, but...
        it comes with the territory dude
        for every big explosive political memory, 
        there's gonna be like fifty personal ones like this, you know?
        and like i said, important things could always be sprinkled around
        so there's still value in sifting through it all
____END

    RESPONSES::self
        ok<+>END
`)


getLocalizationForPage(true) // --- ensuring that Nothing Gets Fucked Up