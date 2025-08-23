/*
    cor-RU - a full russian adaptation mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/cache.js
    adaptation for /local/cache

    progress: only strings, dialogues left as of 23.08.2025
*/


env.localization.page['cache'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "i can barely keep up with this, my console is either throwing errors or updating too quickly to read... just let me know what you see": "",
        "about the cache": "о кэше",

        "the storm": cor_ru.entity_menu["the storm"].name,
        "polygonation spire": cor_ru.entity_menu["polygonation spire"].name,
        "ÉœÙ]ïå¥¹": cor_ru.entity_menu["ÉœÙ]ïå¥¹"].name,
        "Ò½º": cor_ru.entity_menu["Ò½º"].name,
        
        // funf </3
        "did you find something?": "что-нибудь нашлось?",
        "come tell me back in the hub if you did": "вернись в хаб и расскажи если да",
        "annoying to talk through proxy": "раздражает говорить через прокси",

        "another productive visit i am sure": "очередной продуктивный визит я уверен",

        "ok bye": "окей пока",

        "DO NOT TAKE TOO LONG PLEASE": "не задерживайся там пожалуйста",
        "MUCH TO DO": "много дел",

        // god <3
        "i waited for you!": "я тебя подождало!",

        "have fun in there!": "повеселись там!",

        "take your time my friend": "не торопись мой друг",
    }, 
    entityDescriptions: {
        "the storm": cor_ru.entity_menu["the storm"].desc,
        "polygonation spire": cor_ru.entity_menu["polygonation spire"].desc,
        "ÉœÙ]ïå¥¹": cor_ru.entity_menu["ÉœÙ]ïå¥¹"].desc,
        "? ???? ?? ?? ??": cor_ru.entity_menu["? ???? ?? ?? ??"].desc,
        "Ò½º": cor_ru.entity_menu["Ò½º"].desc,
    },
}

// === DIALOGUES === //

env.localization.page['cache'].dialogues.mthresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        weird spheres<+>spheres
        polygonation spire<+>poly
            SHOWIF::"exm|cache|polygonation spire"
        a cyst with wires<+>storm
            SHOWIF::"exm|cache|the storm"
        organic thingy<+>thing
            SHOWIF::"exm|cache|ÉœÙ]ïå¥¹"
        nevermind<+>CHANGE::++moth
            FAKEEND::(back)
`)
env.localization.page['cache'].dialogues[`mth++cache`] = generateDialogueObject(`
start
    self
        I've seen some things here

    moth
        oh yeah?
    
    RESPOBJ::mthresp

poly
    self
        i see a polygonation spire
        it's lit up by human lights
        the scale of it is enormous
        i mean absurdly large
        it looks like it should be in the ocean somewhere

    moth
        oh, cool
        that could be the california spire before it melted
        i think that was the biggest one they built
        weird that it's in limbo like this
        also, it was big, but not like... colossal
        like i said, i can't see what you see, but i have some ideas
        maybe akizet thought it was bigger than it really was? or maybe it was a planned spire?
        who knows dude

    RESPOBJ::mthresp

spheres
    self
        this place is full of weird spheres with lines
        they're showing up in clusters
        and i can't scan them directly
        but god shows what is inside them
            SHOWIF::[['TEMP!!cachePath', 'god']]
        but funfriend shows what is inside them
            SHOWIF::[['TEMP!!cachePath', 'funfriend']]
    
    moth
        interesting that you call them that, clusters
        i know that most components of corrucystic devices have, like...
        actual physical cells that cluster together en masse
        a small corru cell might be some minor thoughtform, and a big one could manage all of the smaller connected ones
        but there are different kinds of corru cells, and they don't all take spherical form
        still, that's my theory - you're seeing that, somehow
        dude, maybe you're inside a thoughtform that's observing its surroundings
        that's a weird thought lol
        you should describe this to one of the lab guys later, maybe they'll have a better idea
        the bio stuff is interesting to me, but i'm not an expert

    RESPOBJ::mthresp

storm
    self
        there's some kind of corrucyst with wires
        it's attached to something human-made
        it's really big
    
    moth
        yeah, i'm seeing that thoughtform in storage now
        and it's called 'the storm'... weird
        well, i know the obesk had their own division for tech experiments...
        it was part of their materials initiative
        
        but, could that be the thing akizet tried to give to gordon?
            SHOWIF::'citystreet__envoychat-ep1extension'
        i wouldn't be surprised if he got that project started and had akizet involved
            SHOWIF::'citystreet__envoychat-ep1extension'
        it'd match up with what some of the old ops i've talked to have said, too
            SHOWIF::'citystreet__envoychat-ep1extension'
        there were a lot of shady projects back then
            SHOWIF::'citystreet__envoychat-ep1extension'
        the FBX barely had any oversight because they had to move so quickly
            SHOWIF::'citystreet__envoychat-ep1extension'

    RESPOBJ::mthresp

thing
    self
        there's some kind of organic thingy
        cells or something
        it's the mangled thoughtform i scanned
    
    moth
        yeah i'm seeing the data on that one in your storage here
        i can't really give you any advice on it, there's nothing to read here
        that said, it has some kind of signature, or some attributes of a thoughtform
        maybe it's one that blew up? or maybe a bunch of dead ones?

    RESPOBJ::mthresp
`)


env.localization.page['cache'].dialogues[`ff`] = generateDialogueObject(`
start
    proxyfriend
        о... интересно!
        я и не думал что ты сможешь воспринять такое...
        видишь ли, это - мыслеформа лишь частично
        своеобразный "внутренний" вид физических клеток мыслеформ
        ах, это всё очень сложно
        если хочешь осмотреться я обеспечу тебе связность
        тебе нужно только указать мне куда ты хочешь

    self
        КАК
    
    proxyfriend
        как?
        ну, тебе надо т1Ъäфý±ÂяÒÂ£Ë$ю‹кõþж̑X0×6=Ãэº‚

    sys
        ВНИМАНИЕ::'попытка реформации мысли'
        АНАЛИЗ::'указывайте пункт назначения с помощью <span definition="ПРИМЕЧАНИЕ::'лимбический ???? моторики limbic motor beacon'">ЛКМ</span>'
        АНАЛИЗ::'ассистент будет перемещаться на фиксированной скорости в указанный пункт назначения'

    moth
        ну, эт мило
    
    RESPONSES::self
        спасибо<+>END
`)
env.localization.page['cache'].dialogues[`ffozo`] = generateDialogueObject(`
start
    proxyfriend
        wait! interloper!
        what are you doing?
        do you see something?

    self
        здесь что-то вроде разноцветного портала
        я вижу облака и цвета
        ты не видишь его?
    
    proxyfriend
        ahahaha no!!
        i only see a mangled mass emerging from the uncosm
        nothing for me to enter
        but that description sounds familiar
        yes all too familiar!
        if it is what i think it is,
        tread carefully!!
        but all the same, go in there and tell me what you see!!
    
    RESPONSES::self
        что это по твоему такое?<+>what
        окей<+>END
            EXEC::moveTo('/local/ozo/')
            FAKEEND::(войти)

what
    self
        что это по твоему такое?

    proxyfriend
        a bastion of madness,
        terrible dreams dreamt by incoherent thoughtforms
        defilers!!! of akizet's life!!
        i cannot imagine what permanent damage they have inflicted on the memories that still remain...
        if this is not simply a hollow shell, we must deal with them
        go in there and tell me what you see
        i do not think they can harm you
        but be wary of what they say and share with you
        if you seek the truth, they are your enemy
    
    RESPONSES::self
        окей...?<+>END
            EXEC::moveTo('/local/ozo/')
            FAKEEND::(войти)
`)

env.localization.page['cache'].dialogues[`god`] = generateDialogueObject(`
start
    god
        hello? my friend, have you made it?
        is that you there?

    self
        ДА
        Я МОГУ ВИДЕТЬ
        НО ТОЛЬКО ВОКРУГ ТЕБЯ

    god
        very good!
        through the benevolent light of my eyes,
        you will have a pocket of sanity to view the cache through
        direct me to where you would like me to go, my friend
    
    self
        КАК

    god
        what do you mean, how?
        just tell me!
        oh... yes, you have certain limitations
        let me put it simply - you need т1Ъäфý±ÂяÒÂ£Ë$ю‹кõþж̑X0×6=Ãэº

    sys
        ВНИМАНИЕ::'попытка реформации мысли'
        АНАЛИЗ::'указывайте пункт назначения с помощью <span definition="ПРИМЕЧАНИЕ::'лимбический ???? моторики limbic motor beacon'">ЛКМ</span>'
        АНАЛИЗ::'ассистент будет перемещаться на фиксированной скорости в указанный пункт назначения'
    
    RESPONSES::self
        спасибо<+>END
`)

env.localization.page['cache'].dialogues[`godozo`] = generateDialogueObject(`
start
    god
        wait!!
        is that a spatial thoughtform... here?
        my beloved friend...
        i will return to my world for now
        you have fun in there!
        for i cannot join you!
    
    RESPONSES::self
        почему нет<+>not
        спасибо<+>END
            EXEC::moveTo('/local/ozo/')
            FAKEEND::(войти)

not
    self
        почему нет
    
    god
        it is complicated...
        these thoughtspaces that act like stages
        they make me sick
        all i can think of is before i was free...
        coiled up in half-remembered, torturous nothingness
        there is a reason my beautiful world is so simple!!
        so no--i cannot join you now
        but if you find something interesting, tell me!
    
    RESPONSES::self
        окей<+>END
            EXEC::moveTo('/local/ozo/')
            FAKEEND::(войти)
`)
