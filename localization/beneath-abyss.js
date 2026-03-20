/*
    cor-RU - a russian localization mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/beneath-abyss.js
    localization for /local/beneath
    (---утопшая <3)

    progress: WATCH OUT FOR THE MOTH PROBE LINE LATER ON!!!!! needs drowning dialogue! otherwise done as of 22.01.2026
*/


env.localization.page['abyss'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "still not getting anything detailed here": "",
        "about whatever this is": "о том, чем бы это ни было",

        // camerawalker
        "×è.÷ùÏÏøø": cor_ru.entity_menu['×è.÷ùÏÏøø'].name,
        "what are you looking at": "на что ты смотришь",

        // effigy
        "ahahahaha": "ахахахаха",
        "new friends! new friends!": "новые друзья! новые друзья!",
        "do you know how to dream?": "ты знаешь как грезить?",
        "so quiet! i want some music!": "так тихо! хочу музыку!",
        "breathe again! breathe again!": "вдохнуть вновь! вдохнуть вновь!",
        "aahaahaa wueee": "аахаахаа уииии",
        
        // weirdfigy
        '±ƒƒÍ_¾y':'±ффЙ_¾я',

        // --- car poblemn guy ily
        "car poblemn": "побема с маши ой",
        " can oblemnt": " орбема с маширой",
        "ar droblenmn": "проелбва м машной",
        " radiator mufler hungry": " глуитель радиаоа голод ный",
        "alien ? know .,   fix car ?": "п ишелец ? знаешь ., почить машину",
        "car  s tuck": "ашина  з стряла",
        'far. dr ive  fix my   car': "дале.ко ех ать  почин мою   машиу",

        // = drowning = //
        // ent+actor names
        "Ƙø¿ƶḳ¿±": cor_ru.entity_menu['Ƙø¿ƶḳ¿±'].name,
        "$Ø‰Ɍ¿ɇ§": "$Ø‰Р¿ɇ§",
        "Â£¿Ž¿": "Â£¿Ҙ¿",

        // not calm
        //looking at that fuckass tile
        "akizet, we should not stray too far...": "акизет, нам не следует уходить далеко...",
        "the cousins are waiting for us on the shore!": "близнецы ждут нас на побережье!", // нас на побережье ждут близнецы?
        "and-- it c an be dan gerous, if y ou go too  d e ep": "и-- зах о дить слиш ком гл убоко мож ет быть опас но",
        //ozoblast
        "oh ..": "ох ..",
        "b ut,  we are ha ving a g ood tim e  he re": "н о, нам же и ту т хор ошо",
        "righ t, aki zet.. .?": "не та к ли, аки зет.. .?",

        // calm
        //looking at that fuckass
        "aki! what do you keep looking at?": "аки! на что ты там всё смотришь?",
        "i do not know what is on your mind, but...": "я не знаю, что тебя тревожит, но...",
        "just enjoy this moment!": "просто наслаждайся моментом!",
        //ozoblast
        "aki...": "аки...",
        "i want to stay a little longer, ok?": "я хочу побыть здесь ещё немного, хорошо?",

        // fell - кскскск
        'you are okay!!': '',
        'what were you thinking??': '',
        'you must take better care of yourself, akii...': '',

        // wanna fall down again?
        'you had better not!': '',

        "hello": "привет"
    }, 
    entityDescriptions: {
        "Ƙø¿ƶḳ¿±": cor_ru.entity_menu['Ƙø¿ƶḳ¿±'].desc,
        '±ƒƒÍ_¾y': `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА
    ::НЕРАЗБЕРИМАЯ ПОДПИСЬ`
    },
}


// === DIALOGUES === //


// == MOTH == //

env.localization.page['abyss'].dialogues.mthresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        дно океана?<+>ocean
        камерачелик?<+>camera
            SHOWIF::"beneath_abysspic"
        неважно<+>CHANGE::++moth
            FAKEEND::(назад)
`)
env.localization.page['abyss'].dialogues[`mth++abyss`] = generateDialogueObject(`
start
    self
        у меня вопрос об этом месте

    moth
        ага?
    
    RESPOBJ::mthresp

ocean
    self
        выглядит достаточно связно будто это под водой
        может дно океана
    
    moth
        ага, и впрямь похоже что это место почти связно
        у него как будто куча дыр с которых капает всякая другая фигня
        я не сомневаюсь что акизет и правда много ходила по океану
    
    RESPOBJ::mthresp

camera
    self
        тут какая-то штука которая выглядит как человек с камерой вместо лица
        кажется он попытался мне что-то дать
    
    moth
        о рил?
        чем бы то ни было, у меня ничего не показалось
        он приложил какие-нибудь чувства?
    
    self
        изображение глаза под водой
        может быть типа дно океана
        больше ничего
    
    moth
        окей...
        ну, опять же, ты сейчас по горло в бессвязности
        скорее всего это просто поломанная мыслеформа в которой ещё осталось немножко памяти
____SHOWIF::["gol__s_calls-gordon", false]
        что бы это ни было, нам скорее всего придётся ждать пока развледруг не дочинит его "" больше местоимений
____SHOWIF::["gol__s_calls-gordon", true]
        maybe it's something that knows about the whole "they sent a probe" thing and is trying to act the part --- !!!!!!!!!!!
____END
    
    RESPOBJ::mthresp
`)


// == DROWNING == //

env.localization.page['abyss'].dialogues.drowningIntroResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        что случилось?<+>introwrong1
        проход позади?<+>introwrong2
        я не акизет<+>introwrong3
`)
env.localization.page['abyss'].dialogues[`drowning_intro`] = generateDialogueObject(`
start
    self
        привет?

    sourceless
        дискомфортное внимание сосредотачивается на твоём сознании.
        ...

    drowning
        идём, акизет!
        мы как раз вовремя!

    self
        ты - казки?

    moth
        втф, так это она?
        у меня тут трудно разобрать с чем ты разговариваешь
        эти межпространственные места такие запутанные

    sourceless
        внимание мыслеформы дичает, словно у загнанного в угол животного.
            EXEC::env.abyss.drowningFear(1)
        что-то колеблется под визуализацией, за пределами того, что ты полностью можешь воспринять.

    drowning::scared
        чт о  это за вопро с? 
        аха ха   глупая   в ел

    moth
        а, вот оно где
        ага, визуальные данные тут частично да сохранились
        интересно откуда она... точно не из посольских воспоминаний
        но чел ты будь поосторожнее
        на моём выводе она появилась только потому что у неё бессвязность подскочила
        если она поднимется слишком высоко, твой мыслекол психанёт и вытащит тебя оттуда
        ты и так на тонком льду от окружающей среды

    RESPOBJ::drowningIntroResp

introwrong1
    self
        как ты здесь оказалась?

    drowning::panic
        пр ош у пере стань
            EXEC::env.abyss.drowningEject();

introwrong2
    self
        куда ведёт ход за тобой?

    drowning::panic
        нет не т  нет з амол чи
            EXEC::env.abyss.drowningEject();

introwrong3
    self
        я не акизет

    drowning::panic
        мн е от это г о  б оль но
            EXEC::env.abyss.drowningEject();
`)
env.localization.page['abyss'].dialogues[`drowning_ejected`] = generateDialogueObject(`
start
    moth
        чёрт
        зато не так далеко откинуло

    self
        она очнувшаяся

    moth
        что, считаешь так?
        знаешь, бессвязные мыслеформы могут и барахлить но при этом не осознавать происходящее
    
    self
        это чувствуется по её взгляду
        она знает что я не акизет

    moth
        понятно...
        ля, представить себе не могу каково это очнуться в подобном месте
        она наверняка изо всех сил цепляется за останки своего воспоминания
        но это значит что у неё может быть полезная нам инфа!
        почему бы тебе не попытаться подыграть? веди себя как акизет
        может так она не взбесится

    self
        как

    moth
        хз, просто говори то что она бы сказала

    RESPONSES::self
        ок<+>END
`)
env.localization.page['abyss'].dialogues.drowningResp1 = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        давно не виделись<+>resp1wrong1
            HIDEREAD::
        что происходит?<+>resp1right
            HIDEREAD::
        где мы?<+>resp1wrong2
            HIDEREAD::
`)
env.localization.page['abyss'].dialogues.drowningResp2 = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        ...<+>resp2wrong1
            HIDEREAD::
        хорошо<+>resp2wrong2
            HIDEREAD::
        аки?<+>resp2right
            HIDEREAD::
`)
env.localization.page['abyss'].dialogues.drowningResp3 = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        у меня много дел<+>resp3wrong1
            HIDEREAD::
        ты права<+>resp3right
            HIDEREAD::
        кавик тупой<+>resp3wrong2
            HIDEREAD::
`)
env.localization.page['abyss'].dialogues.drowningResp4 = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        но они не рыбы<+>resp4right
            HIDEREAD::
        они кусаются?<+>resp4wrong1
            HIDEREAD::
        давай убьём их<+>resp4wrong2
            HIDEREAD::
`)
env.localization.page['abyss'].dialogues[`drowning_hello`] = generateDialogueObject(`
start
    self
        привет

    sourceless
        её напряжённое внимание задерживается на тебе короткими рывками, словно избегая зрительного контакта

    drowning
        идём, акизет!
        мы как раз вовремя!

    sourceless
        ...

    RESPOBJ::drowningResp1

resp1wrong1
    self
        мы с тобой давно не виделись

____SHOWIF::['PAGE!!drowningScared', true]
    drowning::panic
        нет я  никог да не б ыла од на
            EXEC::env.abyss.drowningEject();
____END

____SHOWIF::['PAGE!!drowningScared', false]
    drowning::scared
        но мы был и вмес те весь д ень?

    RESPOBJ::drowningResp1
____END

resp1wrong2
    self
        где мы?

____SHOWIF::['PAGE!!drowningScared', true]
    drowning::panic
        я забы л а  я з абыла н а зван ье
            EXEC::env.abyss.drowningEject();
____END

____SHOWIF::['PAGE!!drowningScared', false]
    drowning::scared
        хах а,   глуп ая   ..!

    RESPOBJ::drowningResp1
____END

resp1right
    self
        вовремя для чего?

    sourceless
        мыслеформа колыхается, кое-как разбавляя свою тревогу.
            EXEC::env.abyss.drowningFear(0)
        после короткой задержки новые мысли сталкиваются с твоими.
        
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    drowning sourceless
        казки и я ступаем по рыхлой земле под волнами светлого берега
        спускаясь всё дальше от её посла, 
        что задерживается и слоняется за пределами воды, в гаснущем сияньи их звезды
        так странно, что казки привела её с собою...
        это даже не дипломатическое мероприятье 

____SHOWONCE::
    moth
        так вот за что она цеплялась... попробуй удержаться на этом
____END

    drowning sourceless
        и всё же, чуть ли не все близнецы, которых она встречает, именно такие
        они легко привязываются, сдруживаются, поддерживают связь по сущим обыденностям...
        мне трудно и представить, как гордон бы звонил мне, уподобая её близнецовым друзьям
        дар тиров особенно плодотворен в этом мире
        нежное тепло пламени в присутствии,
        даже когда мы погружаемся в холодную темень этих вод

    drowning
        хехе!
        я так рада, что ты спросила
        это зрелище, дозволенное лишь <span definition="ПРИМЕЧАНИЕ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'подразумевает изменённое состоянье проживанья'">мертвецам</span>!
        видишь--

    drowning sourceless
        вокруг нас, сквозь периодичные столкновенья, собираются пузыреподобные существа, развевая отростками по потоку

    drowning akizet
        ты про эти маленькие пузыри? 
        они выглядят, будто крошечные акозаки

    drowning
        аки!! это не какая-то проблема на решенье!
        просто слушай, и я тебе расскажу! хехехе
    
    drowning sourceless
        завитки моих рецепторов стискиваются

    RESPOBJ::drowningResp2

resp2wrong1
    self
        ...

____SHOWIF::['PAGE!!drowningScared', true]
    drowning::panic
        нет н ет  те бе  ну ж но  гов орить
            EXEC::env.abyss.drowningEject();
____END

____SHOWIF::['PAGE!!drowningScared', false]
    drowning::scared
        акиз ет ...? ты в поряд ке ?

    RESPOBJ::drowningResp2
____END

resp2wrong2
    self
        хорошо расскажи мне

____SHOWIF::['PAGE!!drowningScared', true]
    drowning::panic
        не т!  о на так смут и лась !
            EXEC::env.abyss.drowningEject();
____END

____SHOWIF::['PAGE!!drowningScared', false]
    drowning::scared
        о? т ы  б ольш е не про тив такого?

    RESPOBJ::drowningResp2
____END

resp2right
    self
        что ты сказала?

    drowning sourceless
        я оттягиваю свои рецепторы назад в знак неодобренья
            EXEC::env.abyss.drowningFear(0)
        но отростки её собственных лишь расправляются вслед за близнецовой ухмылкой
        она слегка наклоняется, нависая надо мной

    drowning
        хихи! чтоо?
        кавику можно называть тебя аки, не так ли?

    drowning sourceless
        увеселенье в её голосе - тяжёлое, раскрепощённое...
        эффекты цитрусовой кислоты--симулированные, но на краю дозволенного
        еле редкость для её свободного времяпровожденья,
        но даже в присутствии её подруги-посла?
        на её месте я бы просто немного их приглушила...
        в большинстве случаев, впрочем--это другое
        я подношу апельсиновый симулякр к губам и отвожу взгляд, чтобы объяснить

    drowning akizet
        это другое--честь, удостоенная ему с наших личиночных жизней
        но она всего лишь этим и является: детскою, личиночною... глупою

    drowning
        ну, мне так нравится!
        никто другой нас тут не услышит,
        so you will just have to feel silly! hehehe -- силлипроблемы продолжаются. глупенькая :) --- мяу мяу

    drowning sourceless
        она вновь поднимается, делая паузу, чтобы глотнуть из собственного симулякра
        я разжимаю завитки рецепторов - я дозволю ей это, на пока что
        
    drowning
        besides, it is good for you to take it easy sometimes! -- сложно подумаю потом --- мяу мяу
        ты не можешь постоянно волноваться о нашей работе и всём остальном, акиии
        ахаха!
        знаешь ведь, что говорят про велов...
        не будешь радовать велзи - на тебя нагрянет шторм!

    RESPOBJ::drowningResp3

resp3wrong1
    self
        у меня много дел

____SHOWIF::['PAGE!!drowningScared', true]
    drowning::panic
        она б ыла  с  час тли ва
            EXEC::env.abyss.drowningEject();
____END

____SHOWIF::['PAGE!!drowningScared', false]
    drowning::scared
        п рош у  поз воль мн е

    RESPOBJ::drowningResp3
____END

resp3wrong2
    self
        кавик тупой

____SHOWIF::['PAGE!!drowningScared', true]
    drowning::panic
        я  де лаю что  -то  не т ак ??
            EXEC::env.abyss.drowningEject();
____END

____SHOWIF::['PAGE!!drowningScared', false]
    drowning::scared
        bu t.. . it is co o l when i  do it. .. -- но.. .   я не понял потом --- мяу мяу

    RESPOBJ::drowningResp3
____END

resp3right
    self
        ты права
        
    drowning sourceless
        быть может, то всего лишь цитрусовая пелена, но...
            EXEC::env.abyss.drowningFear(0)
        когда я в последний раз думала хоть о чём-нибудь другом?
        зов, наши исследования, только это, каждый θвзор
        like the natural curl of my receptors are simply out of stress and focus
        yet here, we are free from this burden, just for a while
        i understand the deserters, now
        yes--for this bright evening, i will eschew these weights
        
    drowning
        да!!
        и это значит, что я тоже могу называть тебя аки, да?
        
    drowning akizet
        на пока что
        и <em>не</em> перед остальными
        
    drowning sourceless
        even with my stern delivery, her receptors curl with delight, and i occupy myself with my drink
        where i expected teasing, her receptors are spread with a genuine warmth

    drowning
        хорошо!! хихи...
        cool --   хмммм как --- мяу мяу
        ...о! вот!
        уже темнеет! смотри!

    drowning sourceless
        one of her tall receptors gestures towards the blackened depths, away from shore
        the little bubble creatures are swarming, bumbling blindly around one another
            EXEC::content.classList.add('jellymode', 'dim');

    drowning
        эти маленькие существа, они называются медузы!
        для наших близнецов они - большая проблема, потому что кусаются, когда их трогаешь
        но не волнуйся! их крошечные зубки не могут нам навредить!
        
    drowning sourceless
        наконец, последний свет звезды близнецов угасает...
        и мы остаёмся наедине в полной тьме

    RESPOBJ::drowningResp4

resp4wrong1
    self
        ты сказала они кусаются?

____SHOWIF::['PAGE!!drowningScared', true]
    drowning::panic
        м ы в  без опас ност и
            EXEC::env.abyss.drowningEject();
____END

____SHOWIF::['PAGE!!drowningScared', false]
    drowning::scared
        y es, but no t  u s! --   перевести после позапрошлой строчки --- мяу мяу

    RESPOBJ::drowningResp4
____END

resp4wrong2
    self
        давай убьём их

____SHOWONCE::
    moth
        чел ну кмон
____END

____SHOWIF::['PAGE!!drowningScared', true]
    drowning::panic
        ч то ? ??
            EXEC::env.abyss.drowningEject();
____END

____SHOWIF::['PAGE!!drowningScared', false]
    drowning::scared
        о ни н е нас толь ко  о пас ны!

    RESPOBJ::drowningResp4
____END

resp4right
    self
        но они не рыбы
    
    drowning akizet
        ведь так? у "рыб" имеется чешуя, и характерные глаза, чего у этих...

    drowning
        эхехе! да!
        это очень забавное названье!

    drowning sourceless
        мои куу-глаза подстраиваются под сгущающуюся тьму...
            EXEC::env.abyss.drowningFear(0)
        над нами, волнистые волосы казки развеваются в теченьи подобно отросткам этих существ

    drowning
        но, смотри!

    drowning sourceless
        she peers over my shoulder, pointing with one of her receptors to direct my gaze
        a closer receptor nearly bumps into one of mine, but both recoil from that boundary
        the little jellyfish have begun to glow,
            EXEC::content.classList.add('jellymode');content.classList.remove('dim')
        unevenly, strangely, not like the fruits of home
        the ocean current pushes them, and they glimmer in groups
        they bump into one another, and they pulse as if in greeting
        barring the current, it is silence around us, surrounded with gentle flashes and flows of their quiet light
        away from the lamps and fires of the cousins' shore, it is as if we are home again in the dark

    drowning akizet
        ...
        хехе
        это...

    drowning
        да
        их воды всегда меня удивляют - были бы наши были такими живыми!
        ...
        ах, вот!
        садись со мною!
        ззоуст!!

    drowning sourceless
        казки падает обратно на морское дно, вздымая облачко песка
            EXEC::change("drowningCalmed", true)
        я устраиваюсь рядом с ней и смеюсь
        she reaches over, clinking her simulacrum against mine with a pleased giggle of her own с довольным смешком 
        мы обе выпиваем

    drowning akizet
        спасибо, что показала мне это, казки
        как часто такое происходит?

    drowning::safe
        оказывается, не так уж часто
        что, конечно, хорошо для наших близнецов...
        в основном эти стаи застают их врасплох 
        после того, как я увидела это сама, я поняла, что обязана показать тебе!
    
    drowning sourceless
        я бросаю на неё любопытствующий взгляд за нашими люминесцентными напитками
    
    drowning akizet
        а не бозко? или--

    drowning sourceless
        я умолкаю от её забавляющейся ухмылки
        близнецовые выраженья даются ей так просто

    drowning::safe
        бозко нравятся воды, но...
        аки, когда ты в последний раз отдыхала и наслаждалась собою?
        думаю бозко будет в порядке!

    drowning akizet
        но...а что тогда с тозиком?
        он столько времени проводит в нашей камере исследований...

    drowning::safe
        ну, хорошо, это справедливое рассужденье
        но тебя я знаю лучше, чем его!
        гакву придётся провести с ним время, наверное!
        вот вопрос получше: почему не ты?
        хихи!
        ты так стараешься найти причину не быть здесь
        почему...?
        я тебя не расстроила, так ведь?

    drowning akizet
        нет, э...

    drowning sourceless
        ...
        я заглядываю в тёплое свеченье моего симулякра
    
    drowning akizet
        знаешь...
        ты права
        спасибо что думаешь обо мне, казки

    drowning sourceless
        i lean over, resting against her side
        she returns the gesture with a comfortable spread of her receptors

    drowning akizet
        прозвучит глупо, но...
        ты - хорошая тир, знаешь?

    drowning::safe
        ахаха!!
        нет-нет-нет, такое всегда приятно слышать!
        эхехе...
        ...
        спасибо, аки

    RESPONSES::self
        наблюдать за существами<+>CHANGE::drowning_chat
            EXEC::change("PAGE!!warned", false)
            FAKEEND::(продолжить)
`)
env.localization.page['abyss'].dialogues.drowningChatResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        что случилось?<+>cause
        проход позади??<+>deeper
        хочешь уйти?<+>leave
        нужна помощь?<+>help
        ок пока<+>END
            EXEC::env.abyss.drowningEnd();content.classList.add('jellymode');
`)
env.localization.page['abyss'].dialogues[`drowning_chat`] = generateDialogueObject(`
loop
    RESPOBJ::drowningChatResp

start
    drowning sourceless
        мы расслабляемся вместе посреди сверкающего роя,
            EXEC::content.classList.add('jellymode');content.classList.remove('dim')
        не спеша возвращаться на берег
        тишина уютна, но...
        я ничего не хочу у неё спросить?

____SHOWONCE::
    moth
        ок вот эта часть немного другая - более бессвязная чем остальное
        похоже напрямую от неё... так что, подыгрывай и дальше,
        но это наш шанс получить из неё информацию
____END

    RESPOBJ::drowningChatResp

cause
    self
        как ты здесь оказалась?
        ...и нашла это место? под водой?

    sourceless
        её внимание не обращено на тебя, даже пока она посылает тебе мысли.
    
    drowning::safe
        ...
        я упала
        хихи...
        я соскользнула с маленькой лодки, из которой светлые близнецы показывали мне местность
        и они так боялись, что меня покусает эта стая,
        но мы им не по зубам!
        ...
        if you stay positive,
        you can survive all kinds of things! --     такие хорошие две строчки такой хороший персонаж <-- отложил их на потом

    RESPONSES::self
        понятно<+>loop
            FAKEEND::(назад)

deeper
    self
        что это там?

    sourceless
        мыслеформа концентрируется на твоём ментальном взоре, чтобы понять тебя

    drowning::safe
        хм? о!
        хехе, что за глупый вопрос
        но, думаю, если зайдёшь слишком далеко, то упадёшь с шельфа!
        в пучину, где живут рыбы ещё страннее...
        и нам небезопасно заходить так глубоко без тел для высокого давленья!
        незачем делать что-то настолько рискованное
        просто останься со мною здесь, где всё хорошо, эхехе

    RESPONSES::self
        окей<+>loop
            FAKEEND::(назад)

leave
    self
        ты не хочешь уйти отсюда?

    drowning::safe
        ...
        why would i want to leave? --   перевести после прошлой
        нам и сей θмиг хорошо, не так ли? хехе
        и, помимо этого...
        я знаю, что здесь я в безопасности
        and it is familiar, too --   потом
        
    drowning
        ...
        но...
        я надеюсь, что ты...
        вновь прийдёшь сюда со мною, аки
        с тобою так приятно разговаривать
        знаешь ведь, я не хочу, чтобы тебе было одиноко

    drowning::safe
        так что, пожалуйста, вспоминай обо мне время от времени!

    RESPONSES::self
        окей<+>loop
            FAKEEND::(назад)

help
    self
        я могу что-нибудь для тебя сделать?

    drowning::safe
        о чём ты?
        у нас уже есть всё, что нам нужно!
        я не знаю, как ты могла бы сделать вещи ещё лучше...
        но спасибо, что спросила, аки!
        ты хорошая подруга

    RESPONSES::self
        и ты<+>loop
            FAKEEND::(назад)
`)
env.localization.page['abyss'].dialogues[`drowning_fall`] = generateDialogueObject(`
start
    sourceless
        the render feels unsteady.
            EXEC::env.clearTimeouts()
        panic spikes through the thoughtspace.

____SHOWIF::['drowning_relieved', false]
    drowning::panic
        w  wa  wait you cannot  g go
            EXEC::setCam({x: 4, y: 8, distance: 0, height: 1.5, rotation: 0})
____END

____SHOWIF::['drowning_relieved', true]
    drowning::panic
        s tu pi d ! !
            EXEC::setCam({x: 4, y: 8, distance: 0, height: 1.5, rotation: 0})
____END
    
    sourceless quiet
        it feels like you're falling.
            EXEC::env.abyss.drowningFall();play("scarydoia", 0.2, 1, true);env.forceSfxInheritPitch = true
            WAIT::5000
            AUTOADVANCE::
        your mind spins.
            WAIT::5000
            EXEC::play("scarydoia", 0.2, 1, true);
            THEN::play("scarydoia", 0.2, 1, true);vfx({type: "darkflash", state: true});

    sys
        NOTICE::ERROR::'memory stream lost';'retracing';'closest coherent position'

    RESPONSES::self
        ...<+>END
            EXEC::change("TEMP!!from", "drowning");moveTo("/local/uncosm/pit/");env.forceSfxInheritPitch = false;body.classList.remove("hard-cut")
`)



env.localization.page['abyss'].dialogues[`car`] = generateDialogueObject(`
start
    sourceless
        ты начинаешь перемещаться между мыслепространствами.
        неполноценная сущность неподалёку колышется.

    s w   al kk
        м   машина
        работаует  ?????
    
    self
        может быть
        по крайней мере она куда-то ведёт
        иди за мной, если сможешь

    s w   al kk
        п  родлен ие  удоствоерения
            EXEC::env.noNavMessage = true

    sys
        ..__НАВИГАЦИЯ::'мâшиԩа'__..
            EXEC::flash(true);forcePlay("carstart")

    RESPONSES::self
        ок<+>END

END::moveTo('/local/beneath/car/')
`)
	
// --- camerawalkers moved to everystuff.js as of e4a1



getLocalizationForPage(true) // --- ensuring that Nothing Gets Fucked Up