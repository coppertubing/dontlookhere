/*
    cor-RU - a full russian adaptation mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/beneath-parasite.js
    adaptation for /local/beneath/parasite

    progress: piece strings, some dialogues and moth and rotwatcher unfinished as of 04.10.2025
*/


env.localization.page['parasite'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "still not getting anything detailed here": "всё ещё не нахожу здесь никаких подробностей", // """ ???? ладно я просто хочу пойти наконец глянуть обнову в прешшуре
        "about whatever this is": "о том, чем бы это ни было",

        //effigy
        "i can take them!": "я с ними справлюсь!",
        "use focus stupid!": "используй сосредоточение глупая!",
        "can i have the bozko augment": "можно мне бозко",
        "the groundsmind stands no chance!": "у землемысльца нет ни шанса!",
        "don't use any items ok?": "не используй предметы окей?",

        /*effigy*/ "isabel...": "изабель...",
        /*effigy*/ "that's right!": "точно!",
        /*effigy*/ "i gotta go home!": "мне пора домой!",
        /*effigy*/ "this was fun byee!": "было весело покааа!",
                
        /*smiling piece*/ "what!! no fair!": "что!! нечестно!",
        /*smiling piece*/ "come back!!!": "вернись!!!",
        /*smiling piece*/ "leaving mid game.... rude": "уходить посреди игры... грубо",

        /*many-eyed piece*/ "that counts as a death": "это считается как смерть",
        /*smiling piece*/ "it does not!!": "не считается!!",

        "tactical board": "тактическая доска",
        /*moth*/ "is that framing device code?": "эт чё, код обрамляющего устройства?",
        /*moth*/ "shit... it's probably got a memory leak": "бляха... скорее всего утечка памяти",
        /*moth*/ "well, not really that surprised i guess. anything goes now that the firmament has a hole": "ну, не особо удивляет наверн. что угодно может случиться раз в небосводе теперь дырка",
        /*moth*/ "i hope that bstrd thing hasn't gotten out": "надеюсь та свлчь-фигня не выбралась оттуда",


        "piece": cor_ru.entity_menu['piece'].name,
        "shelf": "шкаф",
        "smiling": "улыбающаяся",
        "many-eyed": "многоглазая",
        "curled": "завитая",
        "calm": "спокойная",
        "pleased": "довольная",
        "weeping": "плакучая",
        "friendly": "дружелюбная",
        "four-eyed": "четырёхглазая",
        "stacked-eye": "столбоглазая",

        // default
        "do you remember the rules?": "ты помнишь правила?",
        // unity
        "shut up! there is a war to be won!!": "замолчи! тут войну надо выиграть!!",

        // lost
        "haha he a89 y934 ahiuiu ": "хаха хи а89 у934 ахиииу",
        "êád•7877 7 77 ": "êáд•7877 7 77 ",
        "hehea v0-9xjkl;'ehehe hehe": "хихиа в0-9хжкл;'ихихи хихи",
        "IMˆkPL ay  Game? ??": "ЯМˆкГра ть Игра? ??",
        // unity
        "hehehehehehehehehe": "хехехехехехехехехе",
        "the ea ters": "те е атры?? п о жиратели", // """ АААААААА

        // board
        "get out of the way!": "прочь с пути!",
        "where are the rules": "где правила",
        "win wiin! !winN!!!": "победа побееда! !победДА!!!",
        "everything is counting on this!": "вся надежда на это!",
        "how many lives will be lost if they succeed??": "как много погибнет если они достигнут успеха??",
        "move once attack once ok left left": "двигай раз атакуй раз ок влево влево",
        "we will meet them beneath": "мы встретим их внизу",
        "do not let them escape alive!": "не дай им уйти живыми!",
        "have you heard their plans? sickening!!": "тебе приходилось слышать их планы? отвратительно!!",
        "celki celki celki": "сельки сельки сельки",
        // unity
        "stop bothering me!": "хватит досаждать мне!",
        "there is no time for peace!!": "нет времени для мира!!",

        // gamer unity
        "hold on we must finish this game": "погоди мы обязаны закончить эту игру",
        "and leave this unfinished?! no!": "и оставить её незавершённой?! неа!",

        // curled
        "if i am quick...": "если я быстро...",
        "what was that? hello?": "что это было? ау?",
        "quiet...": "тихо...",
        "it has to be here": "это должно быть здесь",
        // unity
        "that would be nice... but i must finish my investigation": "было бы неплохо... но я должна завершить своё исследование",

        // pleased
        "just being here is so fun!": "просто нвходиться здесь уже так весело!",
        "much better than maintenance work": "гораздо лучше чем техническая работа", // """ не помню как мы эту работу переводили евоцап
        "board rules? game? why bother?": "правила доски? игра? зачем заморачиваться?",
        "do you know where my friend went?": "ты знаешь куда ушли мои друзья?",
        // unity
        "what? no thanks! my friend is here": "что? спасибо не нужно! мои друзья здесь",

        // weeping
        "someone is missing": "кого-то не хватает",
        "where is she": "где же она",
        "can we really make it?": "действительно ли нам это по силам?",
        "are you counting on me?": "ты рассчитываешь на меня?",
        "kuulla would know what to do": "куулла бы знала что делать",
        // unity
        "just another strange place... i want to go home": "просто ещё одно странное место... я хочу домой",

        // four-eyed
        "ha ha ha!!": "ха ха ха!!",
        "ha haa!! ha ha ha!!": "ха хаа!! ха ха ха!!",
        "hahaha!! haha!!": "хахаха!! хаха!!",
        "hello": "привет",
        // unity
        "i cannot leave when there are still foes to be crushed!": "я не могу уйти пока здесь ещё остались неразгромленные враги!",

        // stacked-eye unity...
        "‡Hƒøwх A_A^t was it fºr, then...": "тогда для чего это было...",

        // calm
        "quiet...": "тихо...",
        "do you hear it too?": "ты тоже слышишь это?",
        "nice here.. .": "славно тут...",
        // unity
        "too loud...": "слишком шумно...",

        // friendly
        "helo helllooo!": "приве привввееет!",
        "we are friends now ok": "мы теперь друзья оке",
        "you are so soso cool!!!": "ты ваще ващеваще круть!!!",
        "do not worry we will find the rules ahaha": "не суетись мы отыщем правила ахаха",
        "hehehe we are having a good time!!": "хихихи мы хорошо проводим время!!",
        "celki celki celki!": "сельки сельки сельки!",
        // unity
        "aaw cool!! convince my friends and i will come!!": "ааа классно!! убеди моих друзей и я приду!!",

        // gk
        "wrong side? no i am ok": "не та сторона? неа всё в порядке",
        "turns out it is not so simple": "выяснилось это не так уж просто",
        "i want to play a different game": "я хочу сыграть в другую игру",
        "seen any rules? me either": "знаешь какие-нибудь правила? я тоже",

        // mi
        "how do i get out of here??": "как мне выбраться отсюда??",
        "what are we doing?": "что мы делаем?",
        "i need to make some calls": "мне нужно кое-кому позвонить",
        "is there not a way out?": "неужели пути наружу нет?",
    }, 
    entityDescriptions: {
        "piece": cor_ru.entity_menu['piece'].desc,
        "tactical board": `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'элемент игры';'ненастоящий';'не воспроизведение насилия';'майндсай я клянусь';'пж сработай'
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'несовпадающий код';'отсутствующие данные'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`
    },
}


// === DIALOGUE === //

env.localization.page['parasite'].dialogues.pieceresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        что вы делаете?<+>what
        выглядите как члены команды?<+>look
            SHOWIF::"embassy__d3_movefriend_finish"
        информация?<+>info
        ок пока<+>END
`)

env.localization.page['parasite'].dialogues[`players`] = generateDialogueObject(`
loop
    RESPOBJ::pieceresp

start
    self
        привет
    
    sourceless
        your interruption earns the minds of the thoughtforms // твоё вмешательство достигает разумы мыслеформ
        the feeling of their attention is mixed with palpable annoyance // ощущение их внимания перемешано с несдерживаемым раздражением
    
    many-eyed piece
        мы заняты!
        чего тебе!
    
    smiling piece
        перестань её отвлекать
        следующий ход очень важен
        
    RESPOBJ::pieceresp
    
what
    self
        что вы делаете
    
    smiling piece
        никто больше не знает правила!
        так что мы пошли их искать и нашли это
        эти правила по всей видимости не подходят нашей доске...
        но мы все равно решили попробовать!

    many-eyed piece
        и я выигрываю
        такие как она всегда проигрывают
    
    smiling piece
        ахаха!!
        ты так только думаешь, тупая луковица!
        акизет и кавик всё ещё на ногах!
        ты даже не знаешь моего инвентаря!

____SHOWIF::"beneath_board"
    self
        эта штука - часть другого воспоминания
        как вы её достали?
    
    smiling piece
        она просто плавала над нами
        i had to stack upon my team to reach it! // :: почему что-то переведено, кусочки не перведены, какие-то правки невнесены. я ничего не понимаю
    
    many-eyed piece
        молчи!
        я думаю...
____END

    RESPONSES::self
        извини<+>loop
            FAKEEND::(назад)

info
    self
        я ищу информацию
        мне нужно знать, что случилось с акизет
    
    sourceless
        an immeasurably powerful sense of dread washes through your connection // неизмеримо сильное чувство ужаса захлёстывает твоё подключение
        the smiling piece's attention shifts to the board, // внимание улыбающейся фигурки сдвигается на доску,
        then to something you cannot see // а потом на что-то, что ты не в силах увидеть
    
    smiling piece
        о чём ты? я пропустила правило?
        она прямо здесь!
    
    many-eyed piece
        no they must know something you do not
        нам лучше убрать акизет из игры на всякий случай
    
    smiling piece
        заткнись!! зузукри!
        ещё слово и я порву твою дурацкую мембрану на части!

    RESPONSES::self
        ...<+>loop
            FAKEEND::(назад)

look
    self
        почему вы выглядите как гакву и милтза
    
    smiling piece
        как кто? игровые фишки?
        мы ничем на них не похожи
        смотри. мы заняты
        пожалуйста пожалуйста пожалуйста просто уйди
        ты выглядишь и ощушаешься так странно и мне это не нравится
    
    sourceless
        око твоего сознания сдвигается на милтзеподобную фишку
        она лишь пялится в молчаливом согласии

    RESPONSES::self
        эээ<+>loop
            FAKEEND::(назад)
`)

env.localization.page['parasite'].dialogues.mthresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        игровая доска?<+>what
        some look like the call team<+>team
            SHOWIF::[["beneath_team", true], ["embassy_d1_complete", true]]
        structuring device code?<+>board
            SHOWIF::[["beneath_team", true], ["embassy__d3_tutorial", true]]
        неважно<+>CHANGE::++moth
            FAKEEND::(назад)
`)

env.localization.page['parasite'].dialogues[`mth++${page.dialoguePrefix}`] = generateDialogueObject(`
start
    self
        у меня есть вопрос об этом месте

    moth
        ага?
    
    RESPOBJ::mthresp

what
    self
        ты что-то видишь?
        это выглядит как большая игровая доска
        а все фигурки живые
        не думаю что они знают как играть
    
    moth
        лол?
        ну я как я погляжу по идее это должно быть эмпирическим мостом
        и ещё оно вроде как нетронуто, хотя мыслепространство не закрыто
        maybe this is something funfriend is working on fixing, // быть может это с этим сейчас возится развледруг
        and it just got started by putting all the pieces back // и он ток начал сгребать все фишки назад
    
    RESPOBJ::mthresp

team
    self
        some of the pieces on this board thing look like the call team // некоторые фишки на этой штуковине типа доски выглядят как члены ???????команды зова 
    
    moth
        yeah, i picked up you trying to talk to one // ага, мне удалось выудить твою попытку поговорить с одной
        definitely different from the others somehow... // явно как-то отличается от остальных...
        maybe some kind of memory bleed? // может какая утечка памяти?
        the readout is still messed up, so idk for sure // показания до сих пор херовые, так что я в общем-то хз
    
    RESPOBJ::mthresp

board
    self
        you mentioned that board was framing device code // ты говоришь что доска была кодом обрамляющего устройства
        is that going to be a problem? // это не доставит нам проблем?
        
    moth
        prooobably not? // навееерное нет?
        i don't know how funfriend mapped the device to the embassy // чёрт знает как развледруг наложил устройство на посольство
        because it's literally never been done before with obesk stuff lol // ибо оно до этого вообще никогда не применялось на обесковых штуках лол
        everything is connected in these cysts, so... // в цистах всё связано между собой, так что...
        other parts were bound to start picking up pieces of it one way or another i guess // полагаю другие части должны были начать подбирать куски то тут то там
        at least they're having fun with it // главное что им по фану
    
    RESPOBJ::mthresp

`)

env.localization.page['parasite'].dialogues["++rotparasite"] = generateDialogueObject(`
start
    self
        what do you think about this place?
            EXEC::changeBgm(env.rotWatcherMusic)

    sourceless noprocess
        the rotwatcher's attention stays upon you, silent, for a long moment.
        it shifts away, to the various thoughtforms nearby.

    rotwatcher
        the thoughtspace at large is observed to be within a regional conglomeration of delaminated thoughtspaces, though its placement between a number of similarly deteriorated spaces allows its organelles to remain intact and largely untargeted by resource-seeking externally originated thoughtforms.
        local thoughtforms display heretofore unseen symptoms of an unknown phenomena in which internal meaning and purpose assignment is disrupted or otherwise confused through the introduction of conflicting information and memory.
        the present rotwatcher may estimate that a form of small-scale emergent conglomeration may have occurred in which the thoughtforms of a separate origin were broken down and utilized as resources for continued survival.
        alternate possible cause #1: collective neural processor of present thoughtspace merged with a similar organelle of external origin during spatial delamination, combining resources for continued survival, alongside introducing aforementioned conflicting memory.
        alternate possible cause #2: large amount of majorly deallocated or dissociated "embassy" related thoughtforms and thoughtspaces exist within the dissociative pool; adjacency to its horizon may have presented easily accessed resources for local thoughtforms during organelle starvation, allowing for subsumation of relevant information.
        
    sourceless
        its matter-of-fact explanations carry a noticeable feeling of uncertainty and fascination.

    rotwatcher
        no conclusions may be made in confidence about the phenomena on display within the present thoughtspace.
        
    RESPONSES::self
        tell me about something else?<+>CHANGE::++rotmove
            HIDEREAD::
        ok<+>END
            
END::revertBgm()
`)



getLocalizationForPage(true) // --- ensuring that Nothing Gets Fucked Up