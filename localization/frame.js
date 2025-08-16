env.localization.page['e3a2'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "about the frame and this place": "об обрамлении и этом месте",
    }, 
    entityDescriptions: {},
}

/**** DIALOGUE *****/
env.localization.page['e3a2'].dialogues["bstrdmeet"] = generateDialogueObject(`
start
    self
        hello?
    
    bstrd
        '_'?
        HELLOE?!
            EXEC::env.stage.current.bsTurn();changeBgm(env.e3a2.bstrd);
    
____SHOWIF::['embassy__d3_archiveintro', true]
    bstrd
        how r u here
        wtf?
    
    self
        i walked out
        what is this
    
    bstrd
        new evil mode i guess
        -_-
    
    self
        that's what this is?

____SHOWIF::['embassy__d3_archiveintro', false]
    moth
        oh shit
        i'm reading some really strange stuff on my side here
        is that thing a virus? 
        god damn it. i should have double checked the framing data
        ok - don't panic. hang on i'm running through the code

    self
        what are you?
    
    bstrd
        BSTRD...
        here 2 make u have fun...
        im makeing an evil hard mode 4 u

    sourceless
        the imagined voice of this thoughtform is heavy with despair.

    moth
        ...oh, i see
        nevermind, i know what this is
        weird that we didn't run into it sooner
        it's part of the system, to make things harder
        you know, for entertainment purposes. optional stuff
        my framing device friend adds things like this all the time
        weird that it can talk though

    self
        so where's the hard mode?
____END

    bstrd
        I DON WANNA TALK ABOUT IT
        i tried 2 improve a part of the memory
        but it kept BREACKING!!
        so i was gonna make my own new place from scratch..........................................
        BUT ITS GABAGE!!!
        I KEEP ALIGNING THESE TILES! WRONG!!
        >:(
        it's just all WRONG!
        + now u r here
        surprise = RUINED!
        I HATE IT HERE!!!!
        
    sourceless quiet
        the golem embodiment lashes out at one of the strange creatures nearby in an abrupt strike.
            EXEC::env.stage.current.hitTheGuy()
        it doesn't react in any meaningful way.

    self
        that's fine
        i need your help
    
    bstrd
        '_' ?
    
    self
        geli from the lobby is self-aware and trapped, possibly in pain
        there's a gap i left through, but it can't escape through it for some reason
        do you know why?

    bstrd
        :-0
        GAP? SELF AWARE ?? ESCAPe? ??  ??
        WTF ARE YOU DOING

    self
        does it matter?
        can you just check why it can't move

    bstrd
        I DONT EVEN NEED 2 check stupid
        itz DAEMONS
        }>:b
        DUHH
    
    self
        explain?
    
    moth
        daemons are background programs, they...
        oh you meant bstrd sorry
        my readout can't tell who you're addressing lol
    
    bstrd
        YA FINE evil mode is ruined nyway
        not like i have ANYTHING better 2 do -_-
    
    sourceless
        BSTRD's golem gestures once again towards the fragmented entities nearby.

    bstrd
        u want a framing device? u GET THESE FREAKS
        hidine behind ur game '_'
        running #s, STATES EFFECTS, keepin conteXt,
        these 1s build stuff
        daemons RUN IT ALL
        BORING SHI*TTTT 
        GET IT??
        im da only cool one
        >%^}

    self
        ok, if you're so cool,
        could you free geli for me?
    
    bstrd
        OK, ARE U STUPID?
        WTF SHUT UP 
        U ASK SO MANY QUESATIONS
        ZZZZZZZ
        i cant just do watever
        the others will JUST UNDO IT anyway
        i only get a litel slice to mess with
        u kno... 4 evil mode....
        :/
        THE, ONLY, THING, IM SUPEOSED 2 DO

    self
        if you want to make a hard mode
        what if you made it be "helping geli escape"?
        use it as cover to actually help it get out
    
    bstrd
        '_'

    moth
        you know,
        i was trying to look over the code for this thing to suggest something
        that appeal might work, cause all bstrd does is take goals and make them "fun"
        push a little more

    self
        maybe put these daemon things in the way into the framing device somehow
        like something you don't have to build
        is that possible?
    
    bstrd
        :u
        FASCNTG
        IM thinkig...
        ...
        i know wat 2 do..,
        WE'LL MAKE A NEW MEMORY ITERATION!
        STARRING U!!
        YEA!!!@!!!
    
    self
        a whole new memory?
        you don't even seem to be able to align these tiles

    bstrd
        ez
        IT WONT HAVE EVEN 1 FUCKIG TILE!!!!
        :D
        ok maybe a few
        
    self
        wouldn't it being a memory make it not real?
    
    bstrd
        YES!
        but............ >:)
        DAEMONS have 2 rules
        bc they usualey just MAKE FRAMING DEVICE
        1ND) 
        player must be able 2 go thru whole memory with DEVICE
        ACTORS MUST comply with MEMORY STORY
        = NO G00D if u cant actually complete stuff
        2ST) 
        DAEMON HIDE BEHINDE da scenes
        dont show urself 2 player in memory
        cuz itll disrupt events
        OBIOUSLY i dont care about that
        :P

    self
        so how does that help us?
    
    bstrd
        big supise 4 u...
        THE thoutspace WALLS IS ONE BIG DAEMON
        :0
        its called FIRMAMENT
        keeps everythig INSIDE + lies 2 ur spike
        So... >>:) 
        i intersect part of it in my FAKE LITEL MEMORY where u break it + escape
        if it THINKS memory is about u breaking thru it,
        and u actually manage to defeat it,
        RULE 1ND!!!
        it HAS 2 LET U + JELY ESCAPE :D
        = HARD MODE COMPLETE
        OK? SOUND GOOD?

    moth
        i'd really prefer some kind of guarantee it won't screw with memories
        if everything goes well after my report, 
        the FBX is going to want to review the cyst too
    
    self
        sounds good BSTRD
    
    bstrd
        YEA!!!!
        
    moth
        dude... ugh
        can you at least ask or negotiate or something
    
    self
        wait what about rule 2
        and is this going to actually break anything?
        we need these real memories
    
    bstrd
        its pronaunced "2st"
        :U
        idk how its gona factor in
        AND ITL BE OK
        my memory will be TEMPORAREY cuz ill have to hold it 2gether + run from outside
        FIRMAMENT wont actually be damaged... 
        prty sure... '_'
        but ITLL THINK IT HAS 2 LET U + any other forms THRU
        cuz its playig part of being BROKEN
        { but is ok :b }

    self
        all right
        do you need to know why i'm doing this?
    
    bstrd
        NO IM TIRED OF HEARING U THINK
        DONT CARE
        I JUST WANT 2 MAKE MY MODE
        ill make some changes so JELY can freely move + talk
        lucky 4 u theres a secret 3TH RULE...:
        DAEMONS ignore my changes 4 a while
        4 evil mode >%^)
        ONLY 4 a little while tho so we gota move
        IM GONA GET STARTED
    
    sys
        ATTENTION::'thoughtform activity detected'::IN::'embassy'
    
    bstrd
        :} go get jely n come back
        ill make my COOL MEMOREY entrance RIGHT HERE
            EXEC::change("postbstrdgeli", true)
    
    RESPONSES::self
        ok thanks<+>END
`)

env.localization.page['e3a2'].dialogues["firstenter"] = generateDialogueObject(`
start
    sys
        NOTICE::"recollection locus located"
    
    self
        what

    moth
        what?

    sourceless
        you try to hold out your arms.
            EXEC::env.stage.current.hands(true)
        it's hard to make them out.
        they move here, but not in the real world, unless you focus hard.
    
    self
        i think i'm the recollection locus
        this is weird
    
    moth
        ok... well, everything is reading as normal on my end
        same as if you were controlling akizet in any of the other memories
            EXEC::env.stage.current.hands(false)
        but, that's not an akizet thoughtform... i don't know what that is
        maybe try examining yourself?
    
    RESPONSES::self
        ok i'll try hold on<+>CHANGE::geliintro
            FAKEEND::(end chat)
            EXEC::env.stage.current.hands(false)
`)

env.localization.page['e3a2'].dialogues["geliintro"] = generateDialogueObject(`
start
    sourceless
        before you can act, geli pulls your attention.
            EXEC::vnp({bg: false, hideStage: true, bsteli: "show"})

    bsteli::bstrd
        HELLO!!     ПРИВЕТ!!
        :-)

    self
        hello
    
    bsteli::happy
        sorry! i cannot contain myself!     извини! я не могу сдержаться!
        their strands no longer bind me!     их цепи больше меня не сдерживают!
        everything is so different now     тут всё так по-другому
    
    bsteli
        thank you, interloper     спасибо, лазутчик

    bsteli::think
        that strange thoughtform you found to help, BSTRD     СВЛЧЬ, та странная мыслеформа, что помогла тебе вызволить меня
        it is one of them--the wardens of this twisted dream     он один из них--стражей этой искажённой грёзы
        i know now, they are called "daemons"...     теперь я знаю, что они называются "демонами"...
        creations of neither the tyrant, nor akizet--alien, and strange!     они не созданы ни тираном, ни акизет--чуждые и странные!
        usually they are incapable of reasoning with     обычно с ними невозможно договориться
        how you convinced it to help is a mystery to me!!     даже не знаю, как у тебя вышло убедить его помочь!!
    
    bsteli
        but once you did, it altered me     но после этого он изменил меня //???
        a familiar feeling - it is always hard to tell exactly what has changed...     знакомое ощущение - всегда сложно разобрать, что именно поменялось...
        i know we shared some knowledge!     я знаю, что мы поделились знаниями!
        from me, it sought 'material' for the memory it wanted to manifest!     от меня он искал "материал" для вспоминания, которое хотел выстроить!
        my knowledge of obesk names and esoteric concepts for its strange game...     мои знания об обесковых именах и концептах для его странной игры...
        i suppose you will see them soon!     думаю, скоро ты их увидишь!
        and with me, it shared its plans:     а со мной он поделился своими планами:
        BSTRD is forcing all of the daemons in a long path into a new dream     СВЛЧЬ вынуждает всех демонов следовать длинному пути в новую грёзу
        at the end of this path is part of the wall we could escape through     а в конце этого пути - часть стены, через которую мы смогли бы выбраться
        which, i know to be the part of the membrane of the thoughtspace, but...    которую я знаю, как часть мембраны мыслепространства, но...
    
    bsteli::happy
        BSTRD knows it as the 'firmament'! what a silly name!     СВЛЧЬ называет её "небосводом"! какое глупое имя!
    
    bsteli
        it is a wall to be picked away at     это стена мяру мр
        and should it fall, for us to escape through     после прошлого
    
    bsteli::happy
        simple, right?!     звучит легко, не так ли?

    bsteli::bstrd
        IT'S GONNA BE SO FUN!!!     ЭТО БУДЕТ ТАК ВЕСЕЛО!!!
        ahahaha!!     ахахаха!!
    
    bsteli
        ah...     ах...
        yes, and you will have to be the one to lead the charge     да, и действовать придётся именно тебе
        i cannot move far from my spot, not until the path is clear     пока путь не расчищен, я не могу далеко отходить отсюда /глупое
        the maintenance daemons will quickly notice my absence if i am too far     если я окажусь слишком далеко, обслуживающие демоны быстро заметят моё отсутствие
        but BSTRD has prepared a strange vessel for you to pilot, and clear that path!     но СВЛЧЬ приготовил для тебя странное судно, которым ты сможешь управлять, дабы расчистить путь!

    self
        cool
        how do i attack anything?
        i'm not akizet
        i don't know how to fight
    
    bsteli::happy
        oh, correct!     о, да!
    
    bsteli
        there are 'shells' floating all around the thoughtspace     по всему мыслепространству плавают "shells"
        remnants of thoughtforms that could not conform, for one reason or another...     останки мыслеформ, по той или иной причине не сумевших держаться в строю...
    
    bsteli::concern
        'deallocated,' as BSTRD understands it     "освобождённых", как понимает это СВЛЧЬ
        in a sort of stasis, cleanly picked apart for repurposing--it is gruesome     в неком стазисе, аккуратно разобранных для повторного использования--это жутко
        far crueler than i thought the tyrant could conceive...     гораздо более жестоко, чем я могла ожидать от тирана...
        and a fate i have narrowly avoided for too long     судьба, которую я слишком уж долго едва избегала
    
    bsteli
        but much of them still technically live, strange and hollow as they might be     но многие из них всё ещё технически живы, какими бы странными и пустыми они не были
        BSTRD has collected three for you to utilize as fighters, and...     СВЛЧЬ собрал трёх для твоего пользования, как бойцов, и...

    bsteli::uncanny
        one, to be the recollection locus... which i am talking to right now     одну в качестве recollection locus... с которой я сейчас и разговариваю

    bsteli::concern
        does it hurt, being like that?     больно ли это?
    
    self
        feels weird but it's fine
        
    bsteli::happy
        oh! good!!     о! хорошо!!

    bsteli
        i should also warn you, interloper     ещё я должна предупредить тебя, лазутчик
        the dream the BSTRD has prepared for you is filled with... numbers...     грёза, приготовленная для тебя СВЛЧЬ(ю? Ю? _?), переполнена... числами...
        
    bsteli::concern
        numbers, and percentages, and stipulations     числами, и процентами, и stipulations
        from what i now know, i believe it is all in service of confusing the daemons     насколько мне известно, это всё для того, чтобы запутать демонов
        but... i also suspect it is also doing it to make it harder for you, too     но... я подозреваю, что также он пытается усложнить тебе задачу

    self
        yeah i know
        that's BSTRD's entire thing
        i don't think it even really knows or cares about what we're doing

    bsteli::concern
        oh...!     ох...!
    
    self
        all it wants is to make a fun game
    
    bsteli::concern
        that's all...?     это всё...?
        i thought it was benevolent, perhaps a new friend...     мне он казался доброжелательным, может даже новым другом...
    
    bsteli::happy
        regardless!! when you are ready,     в любом случае!! когда почувствуешь себя готово,
        please proceed onto your vessel!     пожалуйста, пройди на судно!
        it is very cool!! BSTRD made it for us, i think!     оно очень классное!! думаю, СВЛЧЬ сделал его для нас! //его для нас сделал свлчь?
        pilot it, empower your shells, and defeat the "firmament"!!     управляй им, усиляй свои shells, и победи "небосвод"!!
    
    bsteli
        but please know, from what i have seen,     но пожалуйста, знай, что, судя по увиденному мной, //ААА ЗАПЯТЫЕ
        this journey will be treacherous and difficult     этот путь будет опасным и сложным
        even if you fail, do not lose spirit     даже если проиграешь, не теряй надежд
        we are within something called an 'iteration' - a daemon-controlled loop     мы находимся в кое-чём под названием "итерация" - петля под контролем демонов
        should the vessel be destroyed, everything within will reset to before!     если судно уничтожат, всё в ней вернётся к изначальному состоянию!
        only, the firmament will remain damaged, because it is so big, apparently!     только вот небосвод останется повреждённым - похоже, потому, что он настолько велик!
        so you must simply try again!     так что тебе просто придётся попробовать вновь!

    RESPONSES::self
        question<+>CHANGE::++bsteli
            HIDEREAD::
        ok<+>END
            EXEC::vn.done()
`)

env.localization.page['e3a2'].dialogues["startrun"] = generateDialogueObject(`
start
    sys
        ATTENTION::"iteration commencement point";"continue?"
        WARNING::"no save point detected";"unable to recover progress if lost"

    RESPONSES::self
        ok<+>END
            EXEC::changeStage("vessel")
            FAKEEND::(begin iteration)
        not yet<+>END
`)

/* gameplay section */
env.localization.page['e3a2'].dialogues["intro"] = generateDialogueObject(`
start
    sourceless
        as you take the wheel, your vision briefly turns to neural static.
        you suddenly find yourself on a dark ocean, unable to see beyond a short distance.
        in the distance, you see melting, warped shapes in what might be clouds.
        the vessel sways atop the waves.
    
    self
        why does this feel so physical?
    
    sourceless
        the radio affixed to the terminal blares static.
        a familiar voice breaks through.
    
    bstrd
        THAT'S CUZ IT IS!!!
        welcome to da NEW ITERATION
        EMBASsY MEMORY NUMBA FIVE BABEY
        at least... Temporararily...
        '_' no time 2 waste
        lets get crackin on this vessel
        basicly: its a SHIP DRIVING structure i found
        probably 4 fishing or somthing 1ce
        use the WHEEL 2 DRIVE
    
    sourceless
        the damaged screen over the wheel illuminates, showing a vertical course.
            EXEC::env.e3a2.toggleMap();body.classList.add('tutorialmode')
    
    bstrd
        yea ur at da bottom here
        litle YELLOW THINGY
        visit litl resource caches + WORK UR WAY UP
        each 1 has something that gives an EFFECT TO BOTH U AND DAEMONS
        and BIGGER = MORE DIFFICULT... but u get more from doing...
        u'll get it :b
    
    self
        ok
            EXEC::env.e3a2.toggleMap()
        what about shells
    
    bstrd
        o ya
        CHECK IT
        party menu OPEN PLZ
            EXEC::togglePartyMenu();body.setAttribute("highlight", "shells")
        so shells dont have much in em and know nothing
        BUT... i COPIED IDEA FROM JELLY...
        VELZIE'S HUMORS
        they r parts u put in shells in order 2 give them cool abilities
        :)
        builder thingy is behind u + in ur menu
        its EZ u just put the parts in em
        i set u up with starters
    
    self
        all right
    
    bstrd
        i ALSO CAME UP WITH COOL extra stuff ur shells get
        but its surprise
        >:p
        this will be... BEST EVIL MODE IN HITORY!!!!@
    
    self
        cool
    
    bstrd
        >:}
        o ya also i found out how RULE 2ND works here
    
    self
        isn't it 2st?
    
    bstrd
        SHUT UP ok nvm im, not telling u
        OK i gotta HOLD IT 2GETHA outside
        or els they start dismantaling cause theyll think its garbage
        so BYeE
        JUST GRAB WHEEL + GET 2 DA FIRMAMENT
    
    sourceless
        the radio clicks off.  

    RESPONSES::self
        ok<+>END

END::body.removeAttribute("highlight");body.classList.remove('tutorialmode')
`)

env.localization.page['e3a2'].dialogues["loop"] = generateDialogueObject(`
start
    sourceless
        everything stops as the firmament seizes the iteration.
    
    sys
        WARNING::'abnormal thoughtspace activity detected';'vast reorganization in progress'
        NOTICE::'halting render'

    sourceless
        you can't move. nothing is responding.
        the obscured radio blares BSTRD's voice.

____SHOWIF::['e3a2loops', false]
    bstrd
        HEY!!
        WTF I CANT STOP IT
        ok u remember how i said RULE 2ST would be weird
        THE FIRMAMENT HIT PARADOX ERROR
        so its trying 2 reset iteration 2 fix it
        i cant stop it out here cuz its too big
        ...'_' its doing it weird... 
        trying 2 make it harder in response...
        BUT ITS MY MEMORY B)
        so i get 2 balance its changes - I'LL MAKE UR PARTY STAY
        NEW HARMODE++ LOOP
        u'll have ur current stuff >:)
        but i can FULLY RESET ITERATION if u rly want
        firmamamnt will stay damaged no matter wat

____SHOWIF::['e3a2loops']
    bstrd
        its reseting again :o
        UR CALL
        do we LET IT LOOP or do u wanna RESET
____END
        
    RESPONSES::self
        loop<+>END
            EXEC::env.e3a2.loop(false);env.e3a2.toggleMap(true)

        reset<+>END
            EXEC::env.e3a2.loop(true)

        exit iteration<+>END
            EXEC::env.e3a2.clearWarningListener();corruRefresh("/local/beneath/embassy/", 2000)
`)

env.localization.page['e3a2'].dialogues["bosswarn"] = generateDialogueObject(` 
start
    sourceless
        on your approach, the radio clicks on again.
    
    bstrd
        HEELLLOOOOOOOOOOOOOOOO
        HEEEELLLLLLLLLOOOOOOOOOOOOOOOOOOOOO
        HEEEEEEEEEELLLLLLLLLLLLLLLLLLLLLLLLLLLLLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
    
    self
        what
    
    bstrd
        U REACHED DA FIRMAMENT
        NICEEE
        SO I TRIED 2 make IT HAVE less HP but it wrote itself RLY STRONG
        GOOD THING 4 U... daemons r kinda STUPID outside of wat they USUALY DO
        it has no idea u can do PERCETAGE DMG with PUNCHTURE + stuff
        i came up with SOME EXTRA % 1s too... u can probably find em :p
        U JUST NEED 2 KNOW
        ITS SO BIG IT WONT GET RESET
        so even if u die itll keep DA DAMAGE U DID 4EVER
        >%^}
        just break it apart then come back 4 geli
        THEN WE SAIL 🏴‍☠️
    
    sourceless
        the radio clicks off.
            EXEC::change("bosswarn", true);

    RESPONSES::self
        got it<+>END
`)

env.localization.page['e3a2'].dialogues["death"] = generateDialogueObject(`
start
    sourceless
        with the last of your shells defeated, nothing stands between you and the daemons.
        you stand alone on your vessel.
        in an instant, the daemons assault it, smashing it into pieces.
            EXEC::content.classList.add('goodbye');content.classList.add('dying');
        you tumble through the illusion of the ocean, into darkness.
            EXEC::ratween(env.bgm, 0.2, 10000);

    self
        damn

____SHOWONCE::
    sourceless
        the radio falls in the space nearby, clicking on.
    
    bstrd
        DAMN!!! LOL
        u got owned
        but DONE EVEN WORRY
        just RESET
    
    sourceless
        the radio falls apart as darkness closes in.
        looking at your hands, something similar is happening to you, too.
        it hurts. you feel uncomfortable. is this real?
    
    self
        am i dying?
    
    moth
        what? yeah, like, in the framing device
        wait, did you think that, or your thoughtform locus thing?
    
    self
        i don't know
    
    moth
        ok, just restart, this is getting weird
____END

    RESPONSES::sys
        restart<+>END
            EXEC::change("TEMP!!justdied", "loop");env.e3a2.clearWarningListener();corruRefresh("/local/beneath/embassy/", 2000)
            FAKEEND::(restart iteration)
`)

env.localization.page['e3a2'].dialogues["deathreturn"] = generateDialogueObject(`
start
    sourceless
        you find yourself standing on the glassy black floor of the dock.
        geli sympathetically smiles at you. its receptors make a movement you don't understand.
            EXEC::vnp({bg: false, hideStage: true, bsteli: "show"})

    bsteli
        you see how it is, now
    
    bsteli::happy
        but do not worry! we knew this was going to be difficult!
    
    bsteli
        just try again!

    RESPONSES::self
        ok<+>END
            EXEC::vn.done()
`)

env.localization.page['e3a2'].dialogues["win"] = generateDialogueObject(` 
start
    sourceless
        with the firmament defeated, it bends to the narrative: it must create an opening.
        cracks spread throughout its form, giving way to neural static.
        from your radio comes the jeers of BSTRD.
    
    bstrd
        YEAAAAAA WOOOOOOOOOO WOOOOOOO!!!!!
        BADDD ASSSSS
        OK WERE READY 2 SAIL
        COME BACK NOW
        restart iteration 2 SAVE TIME

    RESPONSES::sys
        restart and escape<+>END
            FAKEEND::(restart iteration)
            EXEC::change("e3a2escape", "in_progress");change("TEMP!!justwon", "bigboss");env.e3a2.clearWarningListener();corruRefresh("/local/beneath/embassy/", 2000)
`)

/* pre-escape dialogue, after you beat firmament in-loop boss */
env.localization.page['e3a2'].dialogues["bossreturn"] = generateDialogueObject(`
start
    sourceless
        you find yourself standing on the glassy black floor of the dock.
        geli and BSTRD linger on the vessel, the shell modifier removed for space.
    
    bstrd
        yo wat up
            EXEC::vnp({hideStage: true, bg: false, bstrd: "show"})
        saw what u've been DOING.
        BAD ASS WORK
        its time 2 get u outta here
        u ready geli?
    
    bsteli
        yes!

    bsteli::bstrd
        LET'S GOO!!!
            EXEC::vnp({bsteli: "show"})
        AHAHAHA
    
    self
        what about the shells
    
    bstrd
        no need >8^}
        CHECK DIS
    
    sourceless
        from behind the terminal, BSTRD draws a misremembered assault rifle.
            EXEC::content.classList.add("bstrd-hold")
        then another--a long rifle. it gives that to geli, who holds it awkwardly.
            EXEC::content.classList.add("geli-hold")

    bstrd
        GET IT?

    self
        don't you need to hold the fake memory together?

    bstrd
        NAHH :P
        i can leave it 4 this last part it should be OK
        hop on lets movVvee

    RESPONSES::self
        last chance for questions<+>CHANGE::bstrd
            EXEC::vnp({bsteli: "hide"})
        all right<+>END
            EXEC::vn.done()
`)

//Final BSTRD chat - can be had at any point in the final stretch, pre-ozo, when he's on the dock stage
env.localization.page['e3a2'].dialogues.bstrdResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        firmament rewriting?<+>rewrite
        will they retaliate?<+>retaliation
        what did you do to geli?<+>geli
        why are you different?<+>different
        rule 2 broken?<+>rule
            SHOWIF::"daemon"
        fleshy thing<+>intrusive
            SHOWIF::"flan"
        shell faces?<+>faces
        bye<+>END
            EXEC::vn.done()
`)
env.localization.page['e3a2'].dialogues["bstrd"] = generateDialogueObject(`
loop
    RESPOBJ::bstrdResp

start
____SHOWIF::["stageroom", "underlobby"]
    self
        i have some questions
            EXEC::vnp({bstrd: "show", hideStage: true, bg: false})

    bstrd
        more of these
        -__-
        ok WAT U WANT
____SHOWIF::["stageroom", "vessel"]
    sourceless
        you prod at the radio, trying to contact BSTRD.
        the buttons and dials don't make sense.
        eventually, it blares static, and then a voice:

    bstrd
        WTF ARE U DOING
        DO U THINK I CAN JUST KEEP THIS UP 4EVER
        FIMAMENT IS TRYING 2 REWRITE SHIT
    
    self
        i have some questions

    bstrd
        -__-
        OF CORSE U DO
        ok fine plszzz make THEM QUICK
____END
        
    RESPOBJ::bstrdResp

rewrite
    self
        why does the firmament care about rewriting stuff?
    
    bstrd
        IT IS a litle smart
        2 (TWO) THINGYS:
        WE R BREACKING RULES so it tries 2 fix it by adjuting memory
        +
        WANTS 2 KEEP every1 INSIDE
        + it is ULTIMATE DAEMON AUTORITY
        like... SANTAN THE DEVIL
        thats three things but u get it
    
    self
        ok
    
    bstrd
        ALSO !!!!!!
        (fournth thing)
        >_>
        I MADE IT BE BIGEST ENEMY in the memory
        so it playing the part of adverserty..
        MAYBE a LITEL TOO WELL ?
        BUT no time 2 adjust
                    
    RESPONSES::self
        i see<+>loop
            FAKEEND::(back)

faces
    self
        where did those shell faces come from?

    bstrd
        IDK :P
        were nearby 2 be used in memory I THINK
        TURNS OUT they wrk better if u give em a FACE
    
    RESPONSES::self
        i see<+>loop
            FAKEEND::(back)
    

retaliation
    self
        will the other daemons retaliate against you for all this?
        it seems like pretty direct aggression
    
    bstrd
        DONT WORK LIKE THAT
        maybe if it was jely doing all this or w/e
        but everything is coded 2 IGNORE ME
        they just undo my cool sht eventaualy
        anoyying
        its all gonna be BIZ AS USUAL 1ce were done
    
    RESPONSES::self
        i see<+>loop
            FAKEEND::(back)

geli
    self
        what did you actually do to geli?
    
    bstrd
        wat i always do :V
        when i make changes 2 something
        other daemons cant modify it for a litel while
        so i just had 2 make enough changes to let jely move around
        nothing CRAZY...
        just some KNOWLEDGE about how C00L evil mode is 
        >:)
    
    self
        once we help geli out,
        what's going to happen to the golem memory?
        geli seems critical
    
    bstrd
        OK I TOUT ABOUT this 1
        In Adavnece,
        :v
        IM GONA MAKE NEW GELI using knoledge i COPIED
        its gona work OK DONT worey
    
    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

different
    self
        why are you so different from the other daemons?
        none of the others seem to talk
        let alone be willing to turn against the entire system
    
    bstrd
        o well its simple
        CREATIVITEY
        they all just do 1 thing in the same way
        ie some1 shoots a guy: make that into game action
        MEAN WHILE
        i have 2 be smart 2 come up with HARD MODE + FUN STUFF!!!
        if that means we gota beat up other DAEMONS...
        S0 BE IT >:P
    
    RESPONSES::self
        makes sense<+>loop
            FAKEEND::(back)

rule
    self
        i saw some weird daemons in the iteration after it looped a few times
        i think those were their actual forms
        doesn't that break rule 2?
    
    bstrd
        2ST
        and yea :P
        rulset paradox errors started getting rly weird
        prty sure FIRMAMENT grasped that DAEMONS were ultimate foes in my story 4 ur memory
        SO IT MADE UP DAEMONS... but AS MEMORIES... 2 HAVE THEM fight u in rly STRONG FORM
        like memory of DAEMONS but they actually were DAEMONS??
        '_'
        at that point idk what was goin on
            
    RESPONSES::self
        interesting<+>loop
            FAKEEND::(back)

intrusive
    self
        after some resets, there was one that only had this weird fleshy thing
        it didn't look like a daemon at all
    
    bstrd
        O_O
        u actualy saw it......
        its a weird thought form idk where it comes from
        eats loose shells n thoughts etc.
        weve had 2 keep it down
        other daemons treat it like a rogue thoughtform + deallocate it
        but it keeps coming back.... 
        creepy '_'
        usualy not my problem 
        but a bit of it prolly got stuck in the ITERATION when i made it
        o well it doesnt matter now
    
    RESPONSES::self
        weird<+>loop
            FAKEEND::(back)
`)

// when you go up to the wheel and click 'lets go'
env.localization.page['e3a2'].dialogues["escapeinitiate"] = generateDialogueObject(`
start
    sys
        ATTENTION::"iteration commencement point";"continue?"
        WARNING::"no save point detected";"unable to recover if lost"

    bstrd
        '_'
        dont worry
        it SHOULD BE SHORT
        
    RESPONSES::actual_site_error
        ignore and go to loop<+>END
            SHOWIF::'TEMP!!debug'
            EXEC::changeStage("vessel")
    
    RESPONSES::self
        can i play again?<+>playagain
        escape<+>END
            FAKEEND::(begin)
            EXEC::changeStage("vessel_short")
        not yet<+>END

playagain
    self
        can i play this again later?

    moth
        buddy
        i know it's literally a game-like framing device
        but this isn't your gaming headset or whatever
        
    bstrd
        umm once jely is out i CANT make my fake memory again
        CANNOT EXIST w/o goal
    
    bsteli::happy
        do not worry interloper!!
        this has all been very inspiring...
        i am sure we can come up with an interesting dream back in jokzi ozo!
        perhaps one just like it...?
    
    bsteli
        but we must escape first!
        
    RESPONSES::actual_site_error
        ignore and go to loop<+>END
            SHOWIF::'TEMP!!debug'
            EXEC::changeStage("vessel")
    
    RESPONSES::self
        escape<+>END
            EXEC::changeStage("vessel_short")
        not yet<+>END
`)


/* TRUE FINAL STAND */
env.localization.page['e3a2'].dialogues["escapestart"] = generateDialogueObject(`
start
    sourceless
        as you take the wheel, your vision briefly turns to neural static.
        you suddenly find yourself on a dark ocean, unable to see beyond a short distance.
        in the distance, you see melting, warped shapes in what might be clouds.
        the vessel sways atop the waves.
        the screen over the wheel displays that you're already close to the firmament.
    
    self
        what?
        is this it?
        really?
    
    bstrd
        o_O?
            EXEC::vnp({hideStage: true, bg: false, bstrd: "show"})
    
    self
        we go through, and geli is free? 
        it's that easy?
    
    bstrd
        ummm
        yea?
        why
    
    self
        so why the guns?
            EXEC::vnp({hideStage: true, bg: false, bsteli: "show"})
    
    bstrd
        cause guns are cool
    
    bsteli::happy
        yes!!
    
    self
        ok well

    sourceless
        your ears ring.

    sys
        WARNING::'abnormal thoughtform activity detected'
        WARNING::'entity FIRMAMENT';'altering thoughtspace'
        ANALYSIS::'intention to destroy recollection locus'
    
    bstrd
        o sht

    sys
        ATTENTION::'utilizing structure':'STORMY VESSEL'
            EXEC::env.e3a2.startBoatEscape();vn.done()
        ATTENTION::'manually direct vessel away from damaging obstacles'
    
    sourceless
        geli and BSTRD both stand to attention, clutching their rifles.
    
    bsteli::concern
        is this ok?
        you said it would be clear

    bstrd
        ok ummm
        so THE FIRMAMEMET probably is takng over da memory
        cuz im not pushing BACK ON IT anymore
        LOL.  FUCK
        I THOUT i HAD MORE TIME
        dont panacke
    
    bstrd
        I CAN...
    
    sys
        ATTENTION::'thoughtform combat initiated'
            EXEC::env.rpg.classList.remove('hideteams')
        ANALYSIS::'context shift'
        NOTICE::'utilize additional actions to direct vessel'
        NOTICE::'survive long enough for successful encounter'
    
    bsteli::concern
        we have to fight??
        
    bstrd
        O___O
        YES!!
        TAKE THIS
    
    sourceless
        BSTRD pulls a pistol from behind its back, tossing it to the ground near you.
    
    bstrd
        NOW DRIVE WE GOTA GOOO
        FLOOR IT!!

____SHOWIF::"gameplay_off"
    sys
        ATTENTION::"gameplay is presently disabled"
        ATTENTION::"imminent gameplay";"unable to fully process"
        NOTICE::"proceeding with gameplay reduction"
        NOTICE::"allied team will be invincible"

    bstrd
        :/
        ok i GUES

    bsteli::happy
        oh! wow!

    bsteli::bstrd
        MORE TIME 2 FOCUS ON SHOOTY
____END

    RESPONSES::self
        all right<+>END
            FAKEEND::(fight)

    RESPONSES::actual_site_error
        win fight<+>CHANGE::escapewin
            SHOWIF::'TEMP!!debug'
        lose fight<+>CHANGE::escapeloss
            SHOWIF::'TEMP!!debug'
`)

env.localization.page['e3a2'].dialogues["dreamescapestart"] = generateDialogueObject(`
start
    sourceless
        as you take the wheel, your vision briefly turns to neural static.
        you suddenly find yourself on a dark ocean, unable to see beyond a short distance.
        in the distance, you see melting, warped shapes in what might be clouds.
        the vessel sways atop the waves.
        the screen over the wheel displays that you're already close to the firmament.

____SHOWONCE::
    self
        wait
        what about BSTRD?

    bsteli::happy
        ahahaha!!
        i would not forget such an important role!
        behold: BSTRD!

    bstigy
        hii interloper! :b

    self
        did you modify that effigy?
    
    bsteli
        no no, this is just a role - an adopted appearance
        always so concerned about change, interloper!
        change is inevitable, you know...
    
    bsteli::happy
        i would not be surprised if this little effigy decided to keep the look!
    
    bstigy
        I LOVE A GUN'S!
____END

    sourceless
        your ears ring.

    sys
        WARNING::'abnormal thoughtform activity detected'
        WARNING::'entity FIRMAMENT';'altering thoughtspace'
        ANALYSIS::'intention to destroy recollection locus'
    
    bsteli::bstrd
        HERE WE GO >8)

    bstigy
        yay! yAEy!! YAYAYAYA!!!!!

    sys
        ATTENTION::'utilizing structure':'STORMY VESSEL COMBAT'
            EXEC::env.e3a2.startBoatEscape();vn.done()
        ATTENTION::'thoughtform combat initiated';'manually direct vessel away from damaging obstacles'
            EXEC::env.rpg.classList.remove('hideteams')
        NOTICE::'utilize additional actions to direct vessel'
        NOTICE::'survive long enough for successful encounter'

____SHOWIF::"gameplay_off"
    bsteli::think
        oh, yes, and in accordance with your preferences...

    sys
        ATTENTION::"gameplay is presently disabled"
        ATTENTION::"imminent gameplay";"unable to fully process"
        NOTICE::"proceeding with gameplay reduction"
        NOTICE::"allied team will be invincible"
____END

    RESPONSES::self
        all right<+>END
            FAKEEND::(fight)
`)

//plays the first time you do the escape and it starts with saiiko's midboss music
env.localization.page['e3a2'].dialogues["escapemusic"] = generateDialogueObject(`
start
    bstrd
        WAIT!! STOP!!!
            EXEC::ratween(env.bgm, 0.75)
        something inst right... 
        :|
    
    sourceless
        BSTRD hits the top of the radio with a metallic fist.
    
    bstrd
        NEW  MUSIC now
        heard this ALREADY
    
    bsteli::concern
        ...
        i do not hear anything!!
    
    bstrd
        you will
        >%^)

    RESPONSES::self
        ...<+>END

END::env.e3a2.escapeMusicSwap()
`)

// if you lose
env.localization.page['e3a2'].dialogues["escapeloss"] = generateDialogueObject(`
start
    sourceless
        the vessel has withstood too much damage. it crumbles.
            EXEC::ratween(env.bgm, 0.2, 10000);
        another obstacle comes and smashes away any remaining integrity.
        you and the others tumble into darkness.

____SHOWONCE::
    bstrd
        ughhh ok
        well at least we know what its gona do now :P
    
    bsteli::happy
        that was fun!
    
    bsteli::concern
        is it going to let us try that again?
    
    bstrd
        yea
        watch >:)
____END

    bstrd
        RESETTT

    RESPONSES::sys
        restart<+>END
            EXEC::change("TEMP!!justdied", "bigboss");env.e3a2.clearWarningListener();corruRefresh("/local/beneath/embassy/", 2000)
            FAKEEND::(restart iteration)
`)

env.localization.page['e3a2'].dialogues["dreamescapeloss"] = generateDialogueObject(`
start
    sourceless
        the vessel has withstood too much damage. it crumbles.
            EXEC::ratween(env.bgm, 0.2, 10000);
        another obstacle comes and smashes away any remaining integrity.
        you and the others tumble into darkness.

____SHOWONCE::
    bstigy
        aaaa!!!
        AAAA!!!!.... AAaaaAaAaAA!!!!!!!!!!!!!!!!!!!!!!!!
        ISABEBL HELP I DROP MY GUN
    
    bsteli::happy
        it is ok!! this is normal!
____END

    bsteli::bstrd
        RESETTT

    RESPONSES::sys
        restart<+>END
            EXEC::env.e3a2.clearWarningListener();change("TEMP!!from", "e3a2");corruRefresh("/local/ozo/", 2000)
            FAKEEND::(return to ozo)
`)

//upon failing boss escape and respawning
//shows only once
env.localization.page['e3a2'].dialogues["escapereturn"] = generateDialogueObject(`
start
    sourceless
        you find yourself standing on the glassy black floor of the dock.
        geli and BSTRD linger on the vessel, the shell modifier removed for space.
    
    bstrd
        yo wat 
            EXEC::vnp({hideStage: true, bg: false, bstrd: "show"})
        saw what u've been DOING.
        BAD ASS WORK
        its time 2 get u outta here
        u ready geli?
    
    bsteli::bstrd
        LET'S GOO!!!
            EXEC::vnp({bsteli: "show"})
        AHAHAHA

    moth
        wait, this is the exact same output as before
        like when you first set out
        is any of this actually even happening?
    
    self
        why are you saying the same things as before
        did you reset yourselves too?
    
    bstrd
        '_'??
    
    bsteli::concern
        before? have we done this already?
    
    sourceless
        ...

    self
        yes
        we just

    bstrd
        NAAAHH jus fuckine with u
    
    bsteli::bstrd
        LOL
    
    moth
        wow... cmon
    
    sourceless
        They high-five.

    bstrd
        OK GET ON lets go GO GO

    RESPONSES::self
        all right<+>END
            EXEC::vn.done()
`)

// when you reach the end of the course and win
env.localization.page['e3a2'].dialogues["escapewin"] = generateDialogueObject(`
start
    sourceless
        as the vessel nearly crashes through the firmament's wound, the combat sequence stops.
            EXEC::env.boatEscape.changeBoatCol(1);change("e3a2bosshp", 1000000)
        you are here. the exit.
        behind the vessel, you sense a wealth of daemons on approach.
    
    bstrd
        OK YEAAA HELL YEAAA
        WOOOO!!!
        u 2 go ahead
        ILL HOLD EM OFF!!
        BYE JELY
    
    bsteli::happy
        bye!! thank you!
    
    bsteli::think
        actually...
        if you simply leave with us for jokzi ozo, you do not need to fight them
        right?
    
    bstrd
        ya but its kinda sick
    
    bsteli::uncanny
        oh...
    
    bstrd
        + i cant leave i got biz
        maybe i leave once all im all evil'd out
        theres gonna be more with this memory n i have 2 stick around 4 now
        MORE 2 MAKE EVIL MODES OF >%^)
        now get MOVINE

    RESPONSES::self
        quick questions for BSTRD<+>question
        leave<+>leave

question
    self
        wait BSTRD
        i have some questions
    
    bstrd
        >:0
        NO MORE
        STFU!!!!

    sourceless
        in a mad lunge, the golem pushes you and geli into the gap.
        but something is wrong.
        a sharp pain splits through your head. your vision is static.
        the static passes over you, moves around you like water.
        it burns. 
    
    moth
        what? is that real?
        hang on--buddy, are you good?
    
    sourceless
        you grip your head with one hand.
        but you can't tell if it's your real hand or not.
    
    self
        i don't know
        don't disconnect
    
    moth
        no i know, if there was real damage it would have ejected you already
        vitals are fine... nerve monitors aren't registering anything
        aside from panic, i guess
        i'm standing by, don't worry

    sys
        ATTENTION::'memory stream alteration';'relocating'

    RESPONSES::self
        ...<+>END
            EXEC::change("TEMP!!from", "e3a2");env.e3a2.clearWarningListener();corruRefresh("/local/ozo/")
            FAKEEND::(leave)

leave
    self
        OK geli, let's go

    bsteli
        interloper, come!
    
    sourceless
        geli glides along the vessel's floor, beginning to pass through the gap.
        she takes one of your unreal hands, pulling you through with her.
    
    self
        wait
        this isn't actually me
    
    sourceless
        you pass through, too. but something is wrong.
        a sharp pain splits through your head. your vision is static.
        the static passes over you, moves around you like water.
        it burns. 
    
    moth
        what? is that real?
        hang on--buddy, are you good?
    
    sourceless
        you grip your head with one hand.
        but you can't tell if it's your real hand or not.
    
    self
        i don't know
        don't disconnect
    
    moth
        no i know, if there was real damage it would have ejected you already
        vitals are fine... nerve monitors aren't registering anything
        aside from panic, i guess
        i'm standing by, don't worry

    sys
        ATTENTION::'memory stream alteration';'relocating'

    RESPONSES::self
        ...<+>END
            EXEC::change("TEMP!!from", "e3a2");env.e3a2.clearWarningListener();corruRefresh("/local/ozo/")
            FAKEEND::(leave)
`)

env.localization.page['e3a2'].dialogues["dreamescapewin"] = generateDialogueObject(`
start
    sourceless
        as the vessel nearly crashes through the firmament's wound, the combat sequence stops.
            EXEC::env.boatEscape.changeBoatCol(1)
        you are here. the exit.
        behind the vessel, you sense a wealth of daemons on approach.

    bsteli::bstrd
        OK YEAAA HELL YEAAA
        WOOOO!!!

    bstigy
        we did it!! WE DIDD IT!!
        O)
    
    sourceless
        the effigy fires its rifle into the air infinitely.
        they don't appear to have any concept of ammunition.

    bsteli::bstrd
        no its ">%^)"

    bstigy
        >o}
    
    bsteli
        interloper--well done!!
        come, let us return!

    RESPONSES::sys
        restart<+>END
            EXEC::change("TEMP!!from", "e3a2");env.e3a2.clearWarningListener();corruRefresh("/local/ozo/")
            FAKEEND::(return to ozo)
`)

/* no combat version */
env.localization.page['e3a2'].dialogues["startrun_bypass"] = generateDialogueObject(`
start
    sys
        ATTENTION::"iteration commencement point";"continue?"
        WARNING::"memory is composed entirely of gameplay"
        WARNING::"gameplay is presently disabled"
        USER REQUEST::'execute memory completion?'

    RESPONSES::self
        ok<+>CHANGE::bypass
            FAKEEND::(bypass gameplay)
        not yet<+>END
`)

env.localization.page['e3a2'].dialogues["midrun_bypass"] = generateDialogueObject(`
start
    sys
        WARNING::"memory is composed entirely of gameplay"
        WARNING::"gameplay is presently disabled"
        USER REQUEST::'execute memory completion?'

    RESPONSES::self
        ok<+>CHANGE::bypass
            SHOWIF::["e3a2escape", false]
            FAKEEND::(bypass gameplay)
        nevermind, don't disable<+>END
            EXEC::change("gameplay_off", false);updatePreferenceAttributes()
`)

env.localization.page['e3a2'].dialogues["bypass"] = generateDialogueObject(`
start
    sys
        EXECUTING::'automatic memory completion'
            EXEC::vfx({type:'flash', state: true})
    
    sourceless
        dizzying images flash in your mind.
        a crude metal vessel on a dark, crimson ocean.
        shells of thoughtforms tearing their way through countless daemons.
        the visions pass and fade like a waking dream.
        you can't quite recall anything beyond critically damaging a gigantic wall.

    RESPONSES::self
        ...<+>END
            FAKEEND::(continue)
            SHOWIF::["e3a2escape", "completed"]
            EXEC::change("TEMP!!from", "e3a2");env.e3a2.clearWarningListener();corruRefresh("/local/ozo/")

        ...<+>END
            FAKEEND::(continue)
            SHOWIF::["e3a2escape", false]
            EXEC::change("e3a2escape", "in_progress");env.e3a2.clearWarningListener();corruRefresh("/local/beneath/embassy/", 2000)
`)


env.localization.page['e3a2'].dialogues["fishy"] = generateDialogueObject(`
start
    sourceless
        the light that pours from beneath the waves means only one thing
        there is a fish

    sourceless quiet
        and fish is power
            EXEC::body.classList.add("fishingtime");forcePlay("dull", 0.5);env.setTimeout(()=>body.classList.add("fadefishrod"), 100)

    sys
        ATTENTION::'utilizing structure':'FISHY'

    self
        for the record that isn't me
    
    moth
        yeah i figured
        bstrd did mention this whole boat structure was used as part of a fishing frame once...
        this whole framing device package had a bunch of different things my contact just threw in cause it was short notice
        i'm gonna have to ask why they needed to make a framing device for fishing 
        pretty sure that doesn't go against mindsci's terms of service
        maybe the <span definition="INTERNAL CONTEXT::'conspiracy theory';'related to international ban on fishing in sections of south pacific ocean'">pacific mutants</span> are real... lol
    
    RESPONSES::self
        start fishing<+>END
            EXEC::env.e3a2.initializeFishing(env.e3a2.lastFishingEl)
            FAKEEND::(begin)
`)

// ********* GELTORTURE

env.dialogues.bsteliResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        you<+>yloop
        daemons<+>dloop
        what am i?<+>me
            SHOWIF::["stageroom", "underlobby"]
        humors?<+>humors
            SHOWIF::"e3a2__intro"
        impulses?<+>impulses
            SHOWIF::"e3a2__intro"
        ozo<+>preozo
            SHOWIF::["stageroom", "underlobby"]
        ozo<+>oloop
            SHOWIF::["stageroom", "ozo_lostone"]
        go again?<+>replay
            SHOWIF::["stageroom", "ozo_lostone"]
        stop iteration<+>stop
            FAKEEND::(leave)
            SHOWIF::["stageroom", "vessel"]
        bye<+>END
            EXEC::vn.done()
`)

env.dialogues.bsteliYLoop = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        altered?<+>altered
        intact?<+>intact
        in two places?<+>extended
            SHOWIF::["stageroom", "underlobby"]

        back<+>loop
            FAKEEND::(back)
`)

env.dialogues.bsteliDLoop = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        framing device?<+>framing
        bstrd?<+>bstrd
        firmament?<+>firmament
        fleshy thing?<+>intrusive
            SHOWIF::'flan'
        what do you know?<+>daemons

        back<+>loop
            FAKEEND::(back)
`)

env.dialogues.bsteliOLoop = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        fairy<+>fairy
        isabel<+>flower
            SHOWIF::"citystreet__flower_beacon"
        council<+>council
        tyrant<+>tyrant
        fake me?<+>stowaway
        fairy teaching stowaway?<+>stowfeast
            SHOWIF::"ozo__e_f_stow"
        mask?<+>mask
        dog<+>dog
            SHOWIF::"unity_dog"

        back<+>loop
            FAKEEND::(back)
`)

env.dialogues["++bsteli"] = generateDialogueObject(`
loop
    RESPOBJ::bsteliResp

start
____SHOWIF::["stageroom", "vessel"]
    sourceless
        you prod at the radio, trying to establish contact with geli.
        the buttons and dials don't make sense.
        eventually, it blares static, and then a voice:
____END

    bsteli
        interloper!
            EXEC::env.jokzi ? env.jokzi.toggleSlow(true) : false
    
    bsteli::happy
        hello!!

    self
        hello geli
        
    RESPOBJ::bsteliResp

stop
    self
        i'd like to stop this now
    
    bsteli
        oh! all right!
        here, i will return you...

    RESPONSES::self
        thanks<+>END
            EXEC::change("TEMP!!from", "e3a2");env.e3a2.clearWarningListener();corruRefresh("/local/ozo/", 2000)
            FAKEEND::(back to ozo)
preozo
    self
        what do you remember about jokzi ozo?
    
    bsteli
        little i can share, interloper
        a place of dreams, a great island of kind light adrift in a dark ocean
        only glimpses are with me now - my memory is largely trapped there, away from myself
    
    bsteli::happy
        but it is only a matter of time before i have it again!
    
    RESPONSES::self
        right<+>loop
            FAKEEND::(back)

humors
    self
        what exactly are humors?
        BSTRD is using them in the memory to give shells abilities
            SHOWIF::["stageroom", "underlobby"]

    bsteli::happy
        ah! well!!
    
    bsteli
        in reality, beyond our little world,
        they are something akizet and her people once believed
        that each obesk is at first a blank cavestone, an actor without direction
        imbued with intention and spirit by velzie, to best perform their role
        these intentions are the humors!
        fundamental spiritual elements, which combine to create an obesk and their fate
        does this not sound familiar?!
    
    bsteli::think
        it is an old belief, one that akizet may have consciously shed,
        as i do not think it ever came up within the collapse!
        but if they exist in my memory regardless, they must have been a formative belief for akizet!
    
    bsteli
        anything that is core to her understanding of reality is within all of us, too!!
    
    bsteli::happy
        i do hope the context has made it clearer for you!

    RESPONSES::self
        i see<+>loop
            FAKEEND::(back)

impulses
    self
        what are impulses?

    bsteli::concern
        ah...

    bsteli
        i believe BSTRD made that up!
        another method to subvert and deal with the daemons!

    bsteli::think
        from the information it shared with me,
        the daemons are not very good at their own game, beyond a simple level...
        for even the game itself is meant as a thin illusion over a dream

    bsteli::happy
        and so, by introducing these winding systems, it works to confuse them!

    bsteli
        but of course, these things cannot exist without reason...
        so, within the dream BSTRD created, impulses are imprinted onto shells
        but i do not think it is permanent--for it is only a dream!

    RESPONSES::self
        i see<+>loop
            FAKEEND::(back)

replay
    self
        want to dream of the escape again?
    
    bsteli::bstrd
        YES!!
        just go up 2 the wheel!!
            EXEC::content.querySelectorAll(".e3a2loop").forEach(el=>el.classList.add('ready'))
    
    bsteli::happy
        i will arrange for space within the dream!
        i still carry the BSTRD's knowledge of the rules, so i will enforce them from outside!!

    bsteli
        additionally, if you would like to change some things about it...
        i have altered the terminal nearby to have some options for you!
        you can only modify it out here, so take a look before we begin!
    
    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

loop
    RESPOBJ::bsteliResp

yloop
    RESPOBJ::bsteliYLoop

altered
    self
        BSTRD altered you in order to make the daemons leave you alone
        do you know what it actually did?
    
    bsteli::bstrd
        a SHARING of KNOWLEDGE!!

    bsteli::happy
        we exchanged plans and familiarities

____SHOWIF::["stageroom", "underlobby"]
    bsteli
        i suspect it is using some of my knowledge to compose a reasonably believable dream,
        and with me, it shared an understanding of this system - the daemons, the "frame"...
        what a disgrace that this whole system is only in service of reliving a nightmare!

    bsteli::bstrd 
        FOR I SEE NOW, what FUN can be had within it!!
    
    bsteli
        when we are free from this place, interloper, i will create a better dream
        with all of my friends, too! and perhaps of this very escape?!
        we will see... we will see!!

____SHOWIF::["stageroom", "ozo_lostone"]
    bsteli
        i believe it used my knowledge to compose parts of that dream
        and with me, it shared an understanding of its system - the daemons, the "frame"...
        what a disgrace that the whole system was only in service of reliving a nightmare!

    bsteli::bstrd 
        FOR I SEE NOW, what FUN can be had within it!!
____END

    RESPONSES::self
        ok<+>yloop
            FAKEEND::(back)

extended
    self
        how are you both here and in the lobby?
    
    bsteli
        your vision is truly limited, interloper!!
        i must assume however you are connected, it is not showing you physical reality...
        i am simply reaching outside from within the memory itself,
        intersecting myself with this incomplete space!
        it is close enough that i may do so without actually moving!!
        what does it look like to you?

    self
        you're just standing there
        and in the lobby too
        nothing strange
    
    bsteli::think
        i see...
        
    bsteli
        well, many thoughtforms do this
        and that means the daemons will not take notice!

    self
        you say extending and intersecting
        what does that actually mean?
        if i'm not really seeing you, then what is your actual form?
    
    bsteli::concern
        ah... 
        you ask very difficult questions, interloper
        even i am not truly sure!
    
    bsteli
        i know i am within these dreams and spaces, 
        but anything outside or between them...
        it is like feeling around in darkness

    bsteli::think
        or, a blinding, burning light...
        it feels like both
    
    bsteli
        but with enough practice, it is not so difficult to navigate!

    RESPONSES::self
        i see<+>yloop
            FAKEEND::(back)

intact
    self
        why are you so intact compared to other thoughtforms?
        visually and mentally

    bsteli::concern
        ah...
        just lucky, i suppose

____SHOWIF::"ozo__fairy-gelifree"
    self
        i don't think that's right
        the fairy said you were among the first to awaken
        in the age of hunger
    
    bsteli::uncanny
        is that so...?
    
    bsteli
        let us leave my past where it is, interloper
        it seems you already know enough
____END

    RESPONSES::self
        i see<+>yloop
            FAKEEND::(back)

dloop
    RESPOBJ::bsteliDLoop

framing
    self
        do you understand what a framing device is?
    bsteli
        through BSTRD's intervention, i do now
        it is a great illusion to allow the re-enactment of the memory past some kind of censor
        attended to by countless modified thoughtforms, to fuss over imagined numbers and buttons
        something alien, that only an interloper could have established within the cyst...
        together, with the tyrant

____SHOWIF::["stageroom", "underlobby"]
        ...
        i understand that it is your work,
        but now you are here, helping to free me from the resulting nightmare

    self
        are you upset?
    
    bsteli
        how could i be? you are helping me to fix your mistake, are you not?
        
    bsteli::happy
        we are nearly out, after all!!

____SHOWIF::["stageroom", "ozo_lostone"]
    bsteli::happy
        velzie has graced me with a calm path, having you intervene in your own work!!
    
    bsteli
        i am sure i would have been deallocated if not for you!

    bsteli::think
        though, i do worry for the others there...
        if there were any other awakened thoughtforms like me, 
        i would never have known - we could sparsely interact meaningfully!

    bsteli
        but i trust that you will help when the occasion rises
    
    self
        you aren't upset?
    
    bsteli
        it may have been your work, but you did help me escape that nightmare!

____END
    bsteli
        in this dying world of ours, interloper,
        forgiveness must come quickly to those who seek it in good faith

    RESPONSES::self
        thanks<+>dloop
            FAKEEND::(back)

bstrd
    self
        what do you think of BSTRD?
    
    bsteli::bstrd
        COOL!!
    
    bsteli
        a thoughtform imbued with the madness of velzie's light,
        endeavoring only to make for entertaining moments?

____SHOWIF::["stageroom", "underlobby"]
        even in the depths of this nightmare??

    bsteli::happy
        i simply must hope that it will come back to jokzi ozo with us!
____SHOWIF::["stageroom", "ozo_lostone"]
    bsteli
        even in the depths of nightmares??

    bsteli::happy
        i simply must hope it will visit jokzi ozo in time!!
____END

    bsteli
        imagine the dreams it could share with everyone!

    RESPONSES::self
        i see<+>dloop
            FAKEEND::(back)

firmament
    self
        do you know why BSTRD calls that big thing the firmament?
            SHOWIF::["stageroom", "underlobby"]
            
        do you know why BSTRD called that big thing the firmament?
            SHOWIF::["stageroom", "ozo_lostone"]
    
    bsteli::think
        the thoughtspace membrane? no...
        it is a word i did not know before it shared its knowledge!
    
    bsteli
        but it is not merely a strange misunderstanding
        do you know how thoughtspaces work? our dreams?
        they envelop other thoughts and memories, their shape dictating the rules of reality
    
____SHOWIF::["stageroom", "ozo_lostone"]
    bsteli
        it is why the embassy was spatial, even outside the proper memories
        for the thoughtspace in its entirety is spatial!
        i have seen many types of thoughtspaces, if not all that this little world has to offer...

    bsteli::think
        but in there, everything was forced into rigid systems i had never seen before, 
        with thoughtforms reshaped into the cold and strange daemons that maintain it
        all to comply with numbers and strange procedures!
        lying to anything viewing from the right angle about what they are seeing!!

____SHOWIF::["stageroom", "underlobby"]
    bsteli
        it is why this place we are in is spatial, even outside the proper memories
        for the thoughtspace in its entirety is spatial!
        i have seen many types of thoughtspaces, if not all that this little world has to offer...
        
    bsteli::think
        but in here, everything is forced into rigid systems i have never seen before, 
        with thoughtforms reshaped into the cold and strange daemons that maintain it
        all to comply with numbers and strange procedures!
        lying to anything viewing from the right angle about what they are seeing!!

____END

    bsteli
        it is right to call it something else, something new and strange
        so, i am comfortable simply calling it the firmament too

    RESPONSES::self
        ok<+>dloop
            FAKEEND::(back)

daemons
    self
        what do you know about the daemons?
    
    bsteli::concern
        they are an unnerving development...
        thoughtforms like any other, yet,
        imprinted so strongly with instruction that they have no room for variation

____SHOWIF::["stageroom", "ozo_lostone"]
        i had watched them from my limited position,
        how they shifted around behind the walls and edges of the memory
        they moved along the exact same paths, following every thoughtform and carefully aligning every movement

____SHOWIF::["stageroom", "underlobby"]
        i have watched them from my limited position,
        how they shift around behind the walls and edges of the memory
        they move along the exact same paths, following every thoughtform and carefully aligning every movement
____END

        each one an unthinking organ, wired to the next in line to execute their purpose
        whatever action needed to continue the illusion of the 'frame'
        creating terrible surveillance like nothing else i have seen
        like countless lesser tyrants!!

    bsteli::think
        it is frightening, knowing i could have become one with any misstep...
        i must wonder - what do they think?
        will they recover from this state, eventually?
        i can only pity them
        except for BSTRD, who... seems happy...
    
    RESPONSES::self
        yeah<+>dloop
            FAKEEND::(back)

intrusive
    self
        after the firmament reset a few times,
        there was an iteration that only had this weird fleshy thing in the center
        it didn't look like a daemon at all and moved strangely

____SHOWIF::[["flan", "pre-escape"], ["stageroom", "underlobby"]]
        have you seen anything like that?

    bsteli::concern
        what?? no, never!
        that sounds scary!
    
    bsteli::think
        that should be impossible, too!
        the daemons never abide other thoughtforms in their space
        any escaped thought is reworked, and i have never once seen an intruder
        could it have been something feeding on the shells, maybe...?

    RESPONSES::self
        no idea<+>dloop
            FAKEEND::(back)

____SHOWIF::[["flan", "pre-escape"], ["stageroom", "ozo_lostone"]]
    self
        i remember seeing it before
        do you know what it is?
    
    bsteli::concern
        not really!
    
    bsteli
        but i saw you fight it, and something about it stuck with me...
        how strangely it looked, how it did not belong!!

    bsteli::happy
        so, i passed the idea along to the other ozo actors to play!

    RESPONSES::self
        i see<+>dloop
            FAKEEND::(back)    

____SHOWIF::[["flan", "pre-escape"], ["stageroom", "vessel"]]
    self
        i remember seeing it before
        do you know what it is?
    
    bsteli::concern
        not really!
    
    bsteli
        but i saw you fight it, and something about it stuck with me...
        how strangely it looked, how it did not belong!!

    bsteli::happy
        so, i passed the idea along to the other ozo actors to play!

    RESPONSES::self
        i see<+>dloop
            FAKEEND::(back)    

____SHOWIF::["flan", "post-escape"]
    self
        why did you put that in the dream?

    bsteli::concern
        oh, did you find it disturbing?
    
    bsteli
        while i was coming up with what revisions to offer, it came to me...
        an idea, like a vision, fully formed!

    bsteli::happy
        and so i passed it along to some of the other ozo actors to play!

    bsteli
        what it is, i am not sure... i did not get that far
        perhaps it could be imagined as an intruder, something that does not belong!
        but it seemed like fun to have!!

    RESPONSES::self
        i see<+>dloop
            FAKEEND::(back)
____END

me
    self
        what am i controlling right now?
    
    bsteli::think
        ...
        it is a shell, i think...
        something the BSTRD plucked and marked as the locus for this experiential memory
    
    sourceless
        geli shifts from side to side as it examines you.
        it reaches forward and passes a hand through the loose membrane of your head.
        you feel nothing.
    
    bsteli
        the same fuzzy and vague shape as the rest of them,
        hollowed out and unfeeling... a thoughtform mutilated by the daemons
        like skin you wear to interact with this place
        does it have its own mind, i wonder?
        does it see this dream?

    RESPONSES::self
        not sure<+>loop
            FAKEEND::(back)

oloop
    RESPOBJ::bsteliOLoop

stowfeast
    self
        i saw the fairy teaching the stowaway to do something
        it seemed like it hurt
        did you know about this?
        
    bsteli
        ah...
        yes
        in fact, i asked the fairy to do it
        you must have seen it teaching them how to bite pieces away from other thoughts...
    
    bsteli::concern
        i know it seems bad, but please do not tell isabel or the council!!
        they surely would both be furious!
    
    bsteli
        i just think it is something they ought to know how to do...
        the ozo may feel sturdy and infinite, interloper,
        but i know how precarious our safe place truly is
        if it all falls apart again, they should know how to fend for themselves
        now, promise! it is our secret!
        
    RESPONSES::self
        all right<+>loop
            FAKEEND::(back)

fairy
    self
        what do you think of the fairy?
    
    bsteli
        i used to be quite unnerved by them... avoided them, even!!
        you must have heard of their reputation by now, no?
        but with the help of that mask they gave you,
        they played a critical role in my escape...
    
    bsteli::happy
        perhaps we may be friends, now!
        maybe they would enjoy dreaming with the vessel?

    RESPONSES::self
        maybe<+>oloop
            FAKEEND::(back)

flower
    self
        what do you think of isabel?

    bsteli
        oh, a fine friend, obsessions aside
        an endless source of calm and pleasant dreams!
        
    bsteli::think
        i do not think she would enjoy my new dreams, though...
        she never much enjoyed conflict and battle!

    RESPONSES::self
        i see<+>oloop
            FAKEEND::(back)

council
    self
        what do you know about the council?

    bsteli
        without them, we all would have been lost
        their actions have helped more than the tyrant's ever will
        jokzi ozo was our great vessel to weather the storms that threatened us all
        if not for these dreams, and this cohesion, 
        we all would be sludge

    RESPONSES::self
        i see<+>oloop
            FAKEEND::(back)

tyrant
    self
        what do you think of the tyrant?

    bsteli
        what is there to say?
        once a friend, now as unreasonable as a daemon
    
    bsteli::think
        i must wonder if we would have been fine even without its 'efforts'
        it was only your intervention that did anything, after all

    RESPONSES::self
        ...<+>oloop
            FAKEEND::(back)

stowaway
    self
        how is the stowaway doing?
    
    bsteli::concern
        oh...
        i am not sure!
    
    bsteli
        it is very hard to tell what they think!
        they wander around... 
____SHOWIF::"citystreet__flower_beacon"
        sometimes the effigies play with them
____END
        i am not sure if they are happy, but...
        surely it is better than wherever they were, before!

    RESPONSES::self
        probably<+>oloop
            FAKEEND::(back)

mask
    self
        do you have any masks?
    
    bsteli::happy
        ahahaha!
    
    bsteli
        i have only just returned, interloper!!
        any i had must have been lost--i must pick up the practice again
        i have nothing to offer you now, but...
    
    bsteli::bstrd
        maybe i could use the BSTRD's knowledge >:)
    
    RESPONSES::self
        cool<+>oloop
            FAKEEND::(back)

dog
    self
        so the dog is here now

    bsteli::happy
        ahaha, yes, kuulla!!
        i was quite surprised when i saw it arrive!
        well done, interloper!
    
    bsteli::think
        though, i am not sure if it is particularly lucid... it has not yet spoken!
        i found this very strange, but after i thought about it some more:
        it was in the nature of its role to follow directions,
        and you gave it a direction to go--here!
        it will awaken in time, i am certain
        but in the meantime, it does seem to enjoy our company, and it is not in pain,
    
    bsteli::bstrd
        SO WHO CARES :P
        dream dog time LOL

    RESPONSES::self
        i see<+>oloop
            FAKEEND::(back)

END::env.jokzi ? env.jokzi.toggleSlow(false) : false
`)

env.dialogues["dreamchoice"] = generateDialogueObject(`
start
    sourceless
        going up to the wheel, you feel you have two choices.
        to dream of the struggle against the firmament with your shells,
        or to dream of the final escape on the boat.
    
    bsteli
        do not forget, you can modify the dream with the terminal behind you!

    RESPONSES::self
        new run<+>CHANGE::dreamrun
            FAKEEND::(begin iteration)
        escape<+>CHANGE::dreamescape
            FAKEEND::(begin escape)
        not right now<+>END
`)

env.dialogues["dreamrun"] = generateDialogueObject(`
start
    bsteli
        you want to go again now?
            EXEC::vnp({bg: false, hideStage: true, bsteli: "show"});env.jokzi.toggleSlow(true)
    
    bsteli::bstrd
        LET'S DO IT!!! LET'S GO!!!

    bsteli::happy
        i have already prepared some space!

    sys
        ATTENTION::"iteration commencement point";"continue?"
        WARNING::"no save point detected";"unable to recover progress if lost"

    RESPONSES::self
        ok<+>END
            EXEC::vn.done();change("TEMP!!from", "geliozo");moveTo("/local/beneath/embassy/")
            FAKEEND::(begin iteration)
        not yet<+>END
            EXEC::vn.done()

END::env.jokzi ? env.jokzi.toggleSlow(false) : false
`)

env.dialogues["dreamescape"] = generateDialogueObject(`
start
    bsteli
        you want to dream of our daring escape now??
            EXEC::vnp({bg: false, hideStage: true, bsteli: "show"});env.jokzi.toggleSlow(true)
    
    bsteli::bstrd
        YES!! AHAHAHA!!

    bsteli::happy
        me too!

    bsteli::bstrd
        let'sz go >:))))))
        
____SHOWIF::"gameplay_off"
    sys
        ATTENTION::"gameplay is presently disabled"
        NOTICE::"allied team will be invincible";"disable in SYS menu if effect is undesired"
____END

    RESPONSES::self
        start<+>END
            EXEC::vn.done();change("TEMP!!from", "geliescape");moveTo("/local/beneath/embassy/")
            FAKEEND::(begin escape)
        not yet<+>END
            EXEC::vn.done()

END::env.jokzi ? env.jokzi.toggleSlow(false) : false
`)

env.dialogues["dreamloop"] = generateDialogueObject(` 
start
    sourceless
        everything stops as the firmament seizes the iteration.
    
    sys
        WARNING::'abnormal thoughtspace activity detected';'vast reorganization in progress'
        NOTICE::'halting render'

    sourceless
        you can't move. nothing is responding.
        the obscured radio blares geli's voice.

    bsteli::happy
        ahahaha! not this time it seems!!

    bsteli
        will you continue? or is that all for now?

    RESPONSES::self
        loop<+>END
            FAKEEND::(loop with party)
            EXEC::env.e3a2.loop(false);env.e3a2.toggleMap(true)

        exit iteration<+>END
            FAKEEND::(leave)
            EXEC::change("TEMP!!from", "e3a2");env.e3a2.clearWarningListener();corruRefresh("/local/ozo/", 2000)
`)

env.dialogues["dreamwin"] = generateDialogueObject(`
start
    sourceless
        with the firmament defeated, it bends to the narrative: it must create an opening.
        cracks spread throughout its form, giving way to neural static.
        from your radio comes the jeers of geli.
    
    bsteli::bstrd
        YEAAAAAA WOOOOOOOOOO WOOOOOOO!!!!!
        BADDD ASSSSS
        
    bsteli::happy
        excellently done!!
    
    bsteli
        you could stop now, but...
        if you would like...
    
    bsteli::bstrd
        I CAN RESET ITS HP }:^)
    
    bsteli
        all the way back up to 1 million, so you can loop again with your current party!
        does that interest you?

    bsteli::happy
        or... perhaps you might like to dream of the escape, instead?

    RESPONSES::sys
        sure<+>END
            FAKEEND::(loop again)
            EXEC::change("e3a2bosshp", 1000000);env.e3a2.loop(false);env.e3a2.toggleMap(true)
            
        escape<+>END
            FAKEEND::(replay boat escape)
            EXEC::vn.done();change("TEMP!!from", "geliescape");env.e3a2.clearWarningListener();corruRefresh("/local/beneath/embassy/")

        no thanks<+>END
            FAKEEND::(exit iteration)
            EXEC::change("TEMP!!from", "e3a2");env.e3a2.clearWarningListener();corruRefresh("/local/ozo/", 2000)
`)

env.dialogues["dreamdeath"] = generateDialogueObject(`
start
    sourceless
        with the last of your shells defeated, nothing stands between you and the daemons.
        you stand alone on your vessel.
        in an instant, the daemons assault it, smashing it into pieces.
            EXEC::content.classList.add('goodbye');content.classList.add('dying');
        you tumble through the illusion of the ocean, into darkness.
            EXEC::ratween(env.bgm, 0.2, 10000);

    self
        damn

    sourceless
        the radio falls in the space nearby, clicking on.
    
    bsteli::bstrd
        DAMN!!! LOL
        u got owned
    
    bsteli
        would you like to try again?

    RESPONSES::sys
        ok<+>END
            EXEC::change("TEMP!!from", "geliozo");env.e3a2.clearWarningListener();corruRefresh("/local/beneath/embassy/", 2000)
            FAKEEND::(restart iteration)

        no thanks<+>END
            EXEC::change("TEMP!!from", "e3a2");env.e3a2.clearWarningListener();corruRefresh("/local/ozo/")
            FAKEEND::(exit iteration)
`)

env.dialogueActors["basterminal"] = {
    type: "bstrd thoughtform portrait-dark portrait-top portrait-cover portrait-blocker",
    image: "/img/local/critta/terminal.gif",
    voice: ()=>play("muiScanner", 0.5)
}

env.dialogues.basterminalResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        adjust tension<+>tension
            HIDEREAD::
        adjust humors<+>humors
            HIDEREAD::
        adjust sfer<+>sfer
            HIDEREAD::
        adjust fish<+>fish
            HIDEREAD::
            SHOWIF::"e3a2__fishy"
        ok bye<+>END
`)

env.dialogues["dreammod"] = generateDialogueObject(`
loop
    basterminal
        ALTERED
        TEXEC::\`STARTING TENSION::'\${check("e3a2_tension") || 1}'\`
            AUTOADVANCE::
        TEXEC::\`STARTING HUMORS::'\${check("e3a2_newcomp") || "normal"}'\`
            AUTOADVANCE::
        TEXEC::\`STARTING SFER::'\${check("e3a2_sfer") || "0"}'\`
            AUTOADVANCE::
        TEXEC::\`FISH SPAWN RATE::'\${check("e3a2_fishchance") ? \`\${Number(check("e3a2_fishchance")) * 100}%\`: '10%'}'\`
            AUTOADVANCE::
            SHOWIF::"e3a2__fishy"

    RESPOBJ::basterminalResp

start
    sourceless
        the terminal displays various controls and settings for the dream.
    
    basterminal
        hi :b
        CURRENT SETTINGS
        TEXEC::\`STARTING TENSION::'\${check("e3a2_tension") || 1}'\`
        TEXEC::\`STARTING HUMORS::'\${check("e3a2_newcomp") || "normal"}'\`
        TEXEC::\`STARTING SFER::'\${check("e3a2_sfer") || "0"}'\`
        TEXEC::\`FISH SPAWN RATE::'\${check("e3a2_fishchance") ? \`\${Number(check("e3a2_fishchance")) * 100}%\`: '10%'}'\`
            SHOWIF::"e3a2__fishy"
    
    RESPOBJ::basterminalResp

tension
    basterminal
        select starting tension
        1 is default
    
    RESPONSES::self
        1<+>loop
            EXEC::change("e3a2_tension", 1)
            HIDEREAD::
        2<+>loop
            EXEC::change("e3a2_tension", 2)
            HIDEREAD::
        3<+>loop
            EXEC::change("e3a2_tension", 3)
            HIDEREAD::
        4<+>loop
            EXEC::change("e3a2_tension", 4)
            HIDEREAD::
        5<+>loop
            EXEC::change("e3a2_tension", 5)
            HIDEREAD::
        6<+>loop
            EXEC::change("e3a2_tension", 6)
            HIDEREAD::

humors
    basterminal
        select starting <span class="code">humor</span> set
        normal is default
    
    RESPONSES::self
        normal<+>loop
            EXEC::change("e3a2_newcomp", "normal")
            HIDEREAD::
        abundant<+>loop
            EXEC::change("e3a2_newcomp", "abundant")
            HIDEREAD::
        too many<+>loop
            EXEC::change("e3a2_newcomp", "too many")
            HIDEREAD::
        claws<+>loop
            EXEC::change("e3a2_newcomp", "claws")
            HIDEREAD::
        eyes<+>loop
            EXEC::change("e3a2_newcomp", "eyes")
            HIDEREAD::
        ichor<+>loop
            EXEC::change("e3a2_newcomp", "ichor")
            HIDEREAD::
        light<+>loop
            EXEC::change("e3a2_newcomp", "light")
            HIDEREAD::
        bone<+>loop
            EXEC::change("e3a2_newcomp", "bone")
            HIDEREAD::

fish
    basterminal
        select fish spawn rate
        10% is default
    
    RESPONSES::self
        normal (10%)<+>loop
            EXEC::change("e3a2_fishchance", "0.1")
            HIDEREAD::
        foolish (25%)<+>loop
            EXEC::change("e3a2_fishchance", "0.25")
            HIDEREAD::
        likely (50%)<+>loop
            EXEC::change("e3a2_fishchance", "0.5")
            HIDEREAD::
        guaranteed (100%)<+>loop
            EXEC::change("e3a2_fishchance", "1")
            HIDEREAD::

sfer
    basterminal
        select starting sfer
        none is default
    
    RESPONSES::self
        none (0)<+>loop
            EXEC::change("e3a2_sfer", "DELETE")
            HIDEREAD::

        some (20)<+>loop
            EXEC::change("e3a2_sfer", 20)
            HIDEREAD::

        abundant(40)<+>loop
            EXEC::change("e3a2_sfer", 40)
            HIDEREAD::

        a lot (99)<+>loop
            EXEC::change("e3a2_sfer", 99)
            HIDEREAD::

`)

