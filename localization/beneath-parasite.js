/*
    cor-RU - a full russian adaptation mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/beneath-parasite.js
    adaptation for /local/beneath/parasite

    progress: piece strings, some dialogues and moth unfinished as of 23.08.2025
*/


env.localization.page['parasite'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "still not getting anything detailed here": "",
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
        "haha he a89 y934 ahiuiu ": "",
        "êád•7877 7 77 ": "",
        "hehea v0-9xjkl;'ehehe hehe": "",
        "IMˆkPL ay  Game? ??": "",
        // unity
        "hehehehehehehehehe": "",
        "the ea ters": "",

        // board
        "get out of the way!": "",
        "where are the rules": "",
        "win wiin! !winN!!!": "",
        "everything is counting on this!": "",
        "how many lives will be lost if they succeed??": "",
        "move once attack once ok left left": "",
        "we will meet them beneath": "",
        "do not let them escape alive!": "",
        "have you heard their plans? sickening!!": "",
        "celki celki celki": "",
        // unity
        "stop bothering me!": "",
        "there is no time for peace!!": "",

        // gamer unity
        "hold on we must finish this game": "",
        "and leave this unfinished?! no!": "",

        // curled
        "if i am quick...": "",
        "what was that? hello?": "",
        "quiet...": "",
        "it has to be here": "",
        // unity
        "that would be nice... but i must finish my investigation": "",

        // pleased
        "just being here is so fun!": "",
        "much better than maintenance work": "",
        "board rules? game? why bother?": "",
        "do you know where my friend went?": "",
        // unity
        "what? no thanks! my friend is here": "",

        // weeping
        "someone is missing": "",
        "where is she": "",
        "can we really make it?": "",
        "are you counting on me?": "",
        "kuulla would know what to do": "",
        // unity
        "just another strange place... i want to go home": "",

        // four-eyed
        "ha ha ha!!": "",
        "ha haa!! ha ha ha!!": "",
        "hahaha!! haha!!": "",
        "hello": "",
        // unity
        "i cannot leave when there are still foes to be crushed!": "",

        // stacked-eye unity...
        "‡Hƒøwh A_A^t was it fºr, then...": "",

        // calm
        "quiet...": "",
        "do you hear it too?": "",
        "nice here.. .": "",
        // unity
        "too loud...": "",

        // friendly
        "helo helllooo!": "",
        "we are friends now ok": "",
        "you are so soso cool!!!": "",
        "do not worry we will find the rules ahaha": "",
        "hehehe we are having a good time!!": "",
        "celki celki celki!": "",
        // unity
        "aaw cool!! convince my friends and i will come!!": "",

        // gk
        "wrong side? no i am ok": "",
        "turns out it is not so simple": "",
        "i want to play a different game": "",
        "seen any rules? me either": "",

        // mi
        "how do i get out of here??": "",
        "what are we doing?": "",
        "i need to make some calls": "",
        "is there not a way out?": "",
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
        yeah, i picked up you trying to talk to one // ага, я удалось выудить твою попытку поговорить с одной
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
        other parts were bound to start picking up pieces of it one way or another i guess // полагаю другие части должны были начать подбирать куски то тут то там      pieces как части именно устройства
        at least they're having fun with it // главное что им по фану
    
    RESPOBJ::mthresp
`)