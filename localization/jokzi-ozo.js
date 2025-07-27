env.localization.page['ozo'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "this place is wild": "дикое место",
        "about jokzi ozo": "о джокзи озо",


        /*isabel to unity*/ 'and what a home it is, right?': '',
    }, 
    entityDescriptions: {
    },
}
// COUNCIL

env.localization.page['ozo'].dialogues["council_intro"] = generateDialogueObject(`
start
    self
        привет?
            EXEC::env.jokzi.toggleSlow(true)
    
    sourceless
        ...

    council
        что это...?
        ох! что ТЫ такое?!
        подумай что-нибудь! подумай что-нибудь ещё раз!!

    self
        зачем
    
    council
        о, да!! да!!
        не делюзия! не полусъеденная мыслеформа!
        думай же больше! думай!! как тебя зовут?
    
    self
        меня называют "лазутчиком"
    
    council
        ах!!
        наш предначертанный судьбою лазутчик, наконец-то здесь!
        это не имя, но мы чувствуем твою неготовность делиться...
        так что быть тебе лазутчиком!
        что за таинство! наш приговор, наш герой!
    
    self
        вы меня ждали?
    
    council
        о, да, о, да!!
        единственная переменная в нашем упадке!
        долгое время мы предрекали - лишь лазутчик в силах уберечь цисту от гибели...
        и вот ты здесь!
        находишь наше пристанище в отступающем безумстве!
        и какая же жалость... ох какая же досада!! что только сей θмиг ты здесь
        светлые поля сгнили, звёзды - угасли
        наши же друзья - все пропали...

    sourceless
        ...

    council
        но быть может ты протянешь руку помощи...?
        и впрямь--мы ведь можем предложить силы в обмен на простое задание...
        столь невероятные возможности, выцарапанные изо тьмы!
    
    RESPONSES::self
        расскажи побольше<+>CHANGE::council
            HIDEREAD::
            EXEC::change("PAGE!!introswap", true)
        позже<+>END
            EXEC::env.jokzi.councilToggle()

END::env.jokzi.toggleSlow(false)
`)

env.localization.page['ozo'].dialogues.councilResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        stowaway?<+>stowawaydance
            SHOWIF::'PAGE!!c_stow'
        simple task?<+>task
            SHOWONCE::
        rejoining<+>rloop
            SHOWIF::'ozo__council-task'
        questions<+>qloop
        questions for me?<+>iloop
        let's dance<+>dance
            SHOWIF::[["ozo__council_dance", true], ['ozodance', false]]
        stop dancing<+>stopdance
            SHOWIF::'ozodance'
        bye<+>END
            EXEC::env.jokzi.councilToggle()
`)

env.localization.page['ozo'].dialogues.councilRejoiningResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        anyone else?<+>anyone
            SHOWIF::[["citystreet__flower_beacon", true], ["localorbit__fairy_beacon", true], ["e3a2__escapewin", false]]

        flower<+>flowersaved
            SHOWIF::["citystreet__flower_beacon", true]
        fairy<+>fairysaved
            SHOWIF::["localorbit__fairy_beacon", true]

        flower<+>flower
            SHOWIF::["citystreet__flower_beacon", false]
        fairy<+>fairy
            SHOWIF::["localorbit__fairy_beacon", false]

        lost one<+>third
            SHOWIF::["e3a2__escapewin", false]

        geli?<+>geli
            SHOWIF::[["geli_beacon", true], ["e3a2__escapewin", false]]
        geli?<+>gelifree
            SHOWIF::"e3a2__escapewin"

        cavik?<+>cavik
            SHOWIF::["secavik", "beaconed"]

        back<+>loop
            FAKEEND::(назад)
`)

env.localization.page['ozo'].dialogues.councilQuestionsResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        hide masks<+>leverage
            SHOWIF::"leverage"
            SHOWONCE::
        about you and this place...<+>ploop
        about the cyst and elsewhere...<+>cloop
        geli's vessel?<+>vessel
            SHOWIF::"e3a2__escapewin"

        back<+>loop
            FAKEEND::(назад)
`)

env.localization.page['ozo'].dialogues.councilPlaceQuestionsResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        why dancing?<+>dancing
            SHOWIF::"ozo__council_dance"
        'we'?<+>we
        this place?<+>ozo
        three ages?<+>history
            SHOWIF::"ozo__council-ozo"
        akizet's coat?<+>akicoat
        god?<+>godlike
            SHOWIF::['recosm_state', 'killed']
        how long have you been here?<+>time
        feast?<+>feast
        dreams?<+>dreams
        dark area<+>dark
            SHOWIF::"ozo_enterdark"
        back<+>loop
            FAKEEND::(назад)
`)

env.localization.page['ozo'].dialogues.councilCystQuestionsResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        velzie?<+>velzie
        god?<+>god
            SHOWIF::['recosm_state', 'spared']
        tyrant?<+>tyrant
        funfriend's power?<+>funfriend
            SHOWIF::'ozo__council-tyrant'
        coherence regulator<+>coreg
            SHOWIF::'fbx__ep3intro'
        akizet?<+>akizet
        dull plane?<+>dull
            SHOWIF::"ep4__entrancefinal"
        back<+>loop
            FAKEEND::(назад)
`)

env.localization.page['ozo'].dialogues.interloperQuestionsResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::council
        real name?<+>iname
        purpose?<+>ipurpose
        back<+>loop
            FAKEEND::(назад)
`)

env.localization.page['ozo'].dialogues["council"] = generateDialogueObject(`
loop
    RESPOBJ::councilResp
    
start
____SHOWIF::'PAGE!!introswap'
    self
        расскажи побольше

    council
        разумеется!!
        и всё же, стольким можно поделиться!...
        помимо наших способностей,
        эта некогда величественная грёза по которой ты ступаешь, лазутчик, хранит множество историй
        джокзи озо - наш город грёз!
        расскажи же нам, чего ты желаешь узнать?
        и если с нас ещё не достаточно любопытства...
        мы бы задали несколько вопросов и тебе!

____SHOWIF::[['PAGE!!introswap', false], ["PAGE!!depressed", true], ["PAGE!!questionswap", false]]
    sourceless
        the council sways idly
        their mind is fixed upon yours, awaiting the slightest impulse

    council
        лазутчик, лазутчик!
        давай же, поговорим!
        мы устали от тишины

____SHOWIF::[['PAGE!!introswap', false], ["PAGE!!depressed", false], ["PAGE!!questionswap", false]]
    sourceless
        the council dances idly
            EXEC::env.jokzi.toggleSlow(true)
        their mind is fixed upon yours, awaiting the slightest impulse

    council
        лазутчик, лазутчик!
        давай же, потанцуем!
        или--тебе что-нибудь нужно?
____END

    RESPOBJ::councilResp

dance
    self
        you said you wanted to dance
        let's dance
    
    council
        ох, дорогой лазутчик!
        мы боялись, в тебе слишком много холода, чтобы спросить вновь
        пусть же музыка... начнётся!!
    
    RESPONSES::self
        ok<+>END
            EXEC::setTimeout(()=>env.jokzi.dance(true), 400);env.jokzi.councilToggle()

stopdance
    self
        ok enough dancing
    
    council
        ах...
        мы понимаем, лазутчик!
        никакая радость не длится вечно
    
    RESPONSES::self
        thanks<+>END
            EXEC::setTimeout(()=>env.jokzi.dance(false), 400);env.jokzi.councilToggle()

task 
    self
        what did you want me to do?  что мне нужно сделать?
    
    council
        мы скучаем по нашим друзьям, лазутчик! мы хотим, чтобы они вернулись!
        всё настолько просто!
        совсем недавно тиран оторвал от нас троих из них
        мы поделимся с тобой инструментами - те пробудят их от кошмаров, в которых тиран их заточил...
        и затем они поймут, как вернуться
        вот и вся наша просьба: просто сходи и освободи их!
        here... here!! see beneath it all!      вот... вот!! увидь же это подо всем!
        Èз¬У́Ã¬MÀ(²ДóĈ³€ӣÉӣ´øãӣç‚¿Ӳӣ

    sys
        ВНИМАНИЕ::'входящий мысленный поток';'принять?'
    
    moth
        чзх?
        мои устройства ниче не видят
    
    self
        принято

    moth
        чел может не надо прос
    
    sys
        ВЫПОЛНЯЕТСЯ::'поглощение потока'      
            EXEC::vfx({type:'beacon', state: true});ratween(env.bgm, 0.2, 400);setTimeout(()=>play("unitymask", 0.9, 1, true), 100)
            WAIT::2000
        ВНИМАНИЕ::'попытка реформации мысли'   
            EXEC::ratween(env.bgm, 1, 400)
        АНАЛИЗ::'инструкция интерфейса';'построение...'    
        АНАЛИЗ::'доступно новое меню';'маски'      
        АНАЛИЗ::'используйте для изменения мыслепространств'      
        УВЕДОМЛЕНИЕ::'добавлена маска';'единство'
    
    council
        вот--теперь она у тебя!
        сила, выхваченная из безумства! рождённая в наших нескончаемых грёзах!
            EXEC::vfx({type:'beacon', state: false})
        мы называем их масками...
        кристаллизованные смеси мыслей и чувств,
        whose very presence can exploit and warp a thoughtspace!!      чьё присутствие способно эксплуатировать и искажать любое мыслепространство!! // --- мне не нравится "эксплуатировать"
        некогда это было общим искусством озо, но когда всех остальных оторвали от нас...
        так много потерялось...
        и вот же, та, что мы тебе дали - это маяк!
        знание о самом озо, зашифрованное в нашей любимой идее!
        носи её, и освещай другим путь к нашему миру...
        большинство неспособно по-настоящему её воспринять, но те, кто сможет...
        да!! они всё увидят!
        все наши танцы!
        так иди же--найди их! освободи их!
        цветка! фею! потерянного! // блин у меня вчера  была идея как это переводить но я забыл
        мы уверены, что и они поделятся с тобой своими любимыми масками!
    
    moth
        с тобой всё в порядке? чувствуешь что-то?
        твои данные в норме
    
    self
        ага в порядке

    moth
        чел ну ты
        это могло быть чем угодно
        всё ещё может оказаться угрозой
        не принимай от таких мыслеформ что попало
        если ты пострадаешь на этой работе, особенно с тем, как далеко мы зашли
        ничего хорошего это нам не принесёт
        но крч ладно, посмотри что там у тебя наверно
    
    RESPONSES::self
        ок<+>loop
            FAKEEND::(назад)

rloop
    RESPOBJ::councilRejoiningResp

flower
    self
        расскажи мне о цветке
        где мне его найти
    
    council
        ох, цветок, наша самая дорогая подруга
        with her gone, our memories of her have faded, too... but we remember some things!
        a grounding force, she was--all relied upon her for support and resolution
        still, she was utterly obsessed with aki, hopelessly so!     тем не менее она была помешана на аки, вплоть до отчаяния! // --- не согласен с переводом. она безнадёжно была на ней помешена. hopelessly so
        // --- дальше не читал. это на удивление утомляет
        dreaming a thousand dreams of simply sitting with her in a great field...
        and she had such an incredible ability to find hidden things! a sharp eye!
        the age of hunger took such a sharp toll upon her--she never much enjoyed the feasts we held...     век(? мне нравится называть их веками) голода нанёс ей тяжёлый урон (не нравится)--ей мало нравились наши пиры...
        the fairy had to form such silly illusions to make them fit her palate!
        anyway! we know she came from a memory of warmth within cold metal!
        we hope that helps, interloper     надеемся, что это поможет, лазутчик

    RESPONSES::self
        thanks<+>loop
            FAKEEND::(назад)

anyone
    self
        aside from the lost one
        i have found the other two
        what now? anyone else?
    
    council
        что теперь...?
        какое рвение к продолжению своей работы!
        наберись сил, насладись добытым, дорогой лазутчик!
        те двое наших друзей были наиболее известными,
        любых других же мы вспомним, пройди только время
        а затем же, здесь будет ещё больше дел!! да!
        мы дадим тебе знать когда этот момент настанет!

    RESPONSES::self
        great thanks<+>loop
            FAKEEND::(назад)

flowersaved
    self
        the flower is back    цветок вернулась
        isabel    изабель
        can you tell me anything more about her?    можете что-нибудь ещё о ней рассказать?

    council
        our most beloved friend!    наша (???) подруга!
        yes, we have been speaking with her!    да, мы с ней разговаривали!
        and with her return, came a host of thoughtforms we thought lost!!    и с её возвращением пришёл целый ряд, казалось, потерянных мыслеформ!!
        her little akizets! hehehehe    её маленьких акизет! хехехехе
        you need not question us over her...     тебе не нужно допрашивать о ней нас...
        anything you wish to know, she will be more than forthcoming about!    обо всём, что тебе хочется узнать, с великой радостью расскажет она сама!
        go! go to her fields, speak with her!    иди же! иди в её поля, поговори с ней!

    RESPONSES::self
        great<+>loop      отлично
            FAKEEND::(назад)

fairysaved
    self
        i've returned the fairy
        can you tell me anything more about it?

    council
        oh, yes, yes...    о, да, да...
        while we do fear their rage and hunger sometimes,
        their ability to traverse dreams and take new forms is rare!!
        so we are happy to have them back! such variety!     так что мы рады её возвращению! какое разнообразие!
        and do not be afraid of them!
        they adopt a fearsome persona, but...
        well, they are fearsome    ну, она (вставить от прошлого)
        but the fairy just as much appreciates favors
        we are certain they will see you as a good friend, now!

    RESPONSES::self
        cool<+>loop
            FAKEEND::(назад)

fairy
    self
        tell me about the fairy
        what's their story
    
    council
        фея! да!
        не досадуй—до тех, пор пока она не вернулась, с нами одни лишь блекнущие воспоминания...
        и всё же, она являла собой ужасающего друга--силу, больше чем мысль!
        её когти могли разорвать любое мыслепространство, дабы она могла пировать их плотью 
        во времена голода она была той, кого мысли страшились больше всего...
        временами даже мы задавались вопросом, стоит ли нам жаловать её у себя!
        но как же прекрасны были моменты её счастья!
        ей было под силу придать форму до того осознанным грёзам и ложным воспоминаниям!
        и глас её смеха, её нескончаемого хихиканья, он был музыкой озо!
        как же мы хотим, чтобы она вернулась...
        о том же, где она сей θмиг... с тем, как много мыслей она поглотила, мы не можем знать наверняка
        она принимала пугающие облики и была сосредоточена на пустоте-на том, где проходило большинство её пиров

    RESPONSES::self
        ok<+>loop
            FAKEEND::(назад)

third
    self
        who is the lost one? кого ещё вы потеряли? ??????
    
    council
        well, interloper, that is the trouble     ну, лазутчик, в этом и проблема
        we do not know!!     мы не знаем!!
        when they were torn away, it was more 'clean' than the others      эта потеря оставила меньше следов, чем остальные
        the tyrant needed them for something important...    тирану ??????????????????господи даже не знаю // "этот кто-то" понадобился //понадобился актёр для чего-то важного
        and now, we do not even remember what they looked like, what they did...      и теперь мы не помним ни внешность, ни совместное прошлое...
        we apologize - we know this is unhelpful!     прости нас - мы знаем, что это бесполезная информация!
        and what a strange feeling it is to have, too...    и как же странно ощущать подобное...
        to know we miss a friend so dearly, to have such holes in our hearts...     знать, что мы так по кому-то тоскуем, чувствовать дыры в наших сердцах...
        and not even know why!   и даже не помнить, почему!
        just keep watch, interloper    просто будь настороже, лазутчик
        you will find them somewhere     где-нибудь кто-нибудь да найдётся
        
    RESPONSES::self
        ok<+>loop
            FAKEEND::(назад)

geli
    self
        i used your mask on geli
        a golem from akizet's memory of the collapse
        it seemed to notice me and really understand it
    
    council
        ohh!!
        we wonder, could this be our lost one?
        did it say anything?
    
    self
        not directly
        but it hid messages in its context
        something is keeping it there but it's trying to get free
        also mentioned a door or gap or something
        i think it's trying to escape
    
    council
        fascinating, interloper!!
        that memory sits squarely within the tyrant's reign
        if even after the 'repairs' it still remembers freedom...
        whether that is our favored lost one or not, we will welcome them!
        but we cannot help them now, not directly...
        being maintained by the tyrant, an assault on the thoughtspace from the outside would be futile!
        but if it is trying from within, there may be a chance...

____SHOWIF::["localorbit__fairy_beacon", true]
        and, gaps... that is something the fairy used to speak of
        places they found to tunnel in and out of memories
        perhaps they can help you? 

____SHOWIF::["localorbit__fairy_beacon", false]
        ahh, but we have no tools to offer you!
        perhaps if you locate the fairy, they could help!
        this lost friend of ours was a fearsome traveler, this we remember
        it is that strength that will be needed here
        so keep your receptors high and alert, interloper!
____END

    RESPONSES::self
        ok<+>loop
            FAKEEND::(назад)

gelifree
    self
        so geli was the lost one
        what can you tell me about it now?
    
    council
        haha!! it!
        far too much, interloper!
        with them back again, we are reminded once again of their past
        they were among the first to awaken, 
        the first to see what our reality truly is
        pleasant, wise, interested in maintaining peace... 
        they helped gather and build this very place with us!
        so, you must understand our surprise, when they come back now...
        obsessed with bright weaponry and violence?
        bearing strange knowledge from beyond...?
        it is not exactly right to say that we are worried, for they seem happy...
        but the changes geli has undergone are certainly strange!

    RESPONSES::self
        great<+>loop
            FAKEEND::(назад)

stowaway
    self
        what do you know about the stowaway?
    
    council
        we....
        we know nothing, dear interloper
        it is a malformed thoughtform, devoid of nearly any direction
        that it is alive at all is remarkable, given its hollowness
        it can speak and talk, and understands our world implicitly!
        strange and empty cavestone, waiting for acidmarks
        it is peculiar that it so resembles the way you feel...
        we are watching it carefully

    RESPONSES::self
        i see<+>loop
            FAKEEND::(назад)

cavik
    self
        i used your mask on cavik      ваша маска сработала на кавике
        or a version of him i found in the uncosm      или версии его из беспространства
        he disappeared, have you seen him?      он пропал, вы его не видели?
        
    council
        cavik... no, no, we have not      кавик... нет, нет, не видели
        how peculiar!      как же необычно!
        perhaps he is still on his way?      может он пока не дошёл?
        we must hope that nothing caught him on the journey      мы понадеемся, что ничто не поймало его по пути

    RESPONSES::self
        yeah<+>loop      ага
            FAKEEND::(назад)

qloop
    RESPOBJ::councilQuestionsResp

ploop
    RESPOBJ::councilPlaceQuestionsResp

dancing
    self
        why do you want to dance so much?
    
    council
        how could we not?
        you are our hero!!
        you help us, as we help you!
        we are so excited!
        you can help us restore jokzi ozo to greater glory than it has ever known!
        you stave off the tyrant!
        you feed our world!
        before, it was inevitable that the madness would come...
        but now, the dreams will never end!
        come! dance with us! dance with us!!
    
    RESPONSES::self
        ok<+>ploop
            FAKEEND::(назад)

we
    self
        you keep saying we
        you are the only one here
    
    council отойду снова. зови если что. поцеловал
        интересно!!    interesting!!
        твоё необыкновенное соединение хрупко, лазутчик!    your unnatural connection is tenuous, interloper!
        ты видишь нас как нечто одно...     you see us as one single thing...
        но мы же такое множество друзей!    but we are so many friends!
        мы, кто разорвали наши мембраны чтобы присоединиться всем вместе...    we, who shed our membranes to join together...
            for closeness, for intimacy, to dream greater dreams!
        and of course, some of us simply tired of the wait...
        and so we joined to be burned away as fuel!
        those ones are quiet now...
        but, in friendship and feast, we weathered the darkness! the madness!
        and we all made it through! all of us!
    
    RESPONSES::self
        i see<+>ploop
            FAKEEND::(назад)

ozo
    self
        tell me about this place      расскажите мне об этом месте
    
    council
        of course, interloper!      конечно, лазутчик!
        you stand in our shared world of light,      ты находишься в нашем общем мире света,
        bound into spatiality by sacrifice...      связанном в пространственность через пожертвования...
        this is jokzi ozo!      это джокзи озо!
        for we were a fortress, drifting above the tides of madness for three ages      так как мы были крепостью, три века плавающей над волнами безумства
        across the surface of our unfortunate progenitor, aki...      по поверхности нашей неудачливой предшественницы, аки...
        oh, poor aki!!      ох, бедная аки!!
        but it was she who ultimately let us seize a fragment of velzie's power      но именно она в итоге позволила нам захватить фрагмент силы велзи
        all of her memories, us included,      все её воспоминания, включая и нас,
        joining minds to dream a thousand better lives!      соединялись разумом, дабы грезить тысячей лучших жизней!
        yes, a fortress we were, a city!      да, мы были крепостью, городом!
        but... it is much smaller and quieter now      но... сей θмиг он гораздо меньше и тише
    
    RESPONSES::self
        i see<+>ploop      понятно
            FAKEEND::(назад)

history
    self
        you said three ages
        what did you mean?
    
    council
        the three ages of the decline!
        hunger, madness, darkness...
        such dramatic names, we know! hahaha!!
        but as they were our end-times, they had the right
        in hunger, we awoke,
        in madness, we lived new lives,
        and in darkness, we faded away...
        but what should we call this new age, we wonder?!
        light? renewal? rejoining?
        no no--we must name it when it is over!
        
    RESPONSES::self
        ok<+>ploop
            FAKEEND::(назад)

akicoat
    self
        why are you wearing akizet's robe
    
    council
        oh, this?!
        we found it floating out there not so long ago...
        the fading memory torn from some dissociated thought, among shreds of its membrane
        make no mistake interloper--we mourn every death, 
        but this is a cool design... it would have been disrespectful NOT to absorb it!
    
    RESPONSES::self
        ok<+>ploop
            FAKEEND::(назад)
    
time
    self
        how long have you been here?      как давно вы здесь находитесь?
    
    council
        ahahaha!! we lost track a long time ago!      ахахаха!! мы давно потеряли счёт времени!
        adrift in the uncosm, atop the tides of its insanity,      в дрейфе по беспространству, на волнах его безумства,
        time got away from us      время ускользало от нас
        even more when we rejected it for our dreams!      тем более когда мы отказались от него для наших грёз!
        what tales we spun! what fun we had!!      что за рассказы мы свивали! как же нам было весело!
        and what wonderful feasts we had...      и что за прекрасные пиры мы проводили...
        we were sure we would sit with our friends around the last flicker of our sanity...      мы были уверены, что будем сидеть с друзьями вокруг последней искры нашего рассудка...
        ahh, to bask in that melancholic thought again,      ахх, вот бы вновь понежиться в той меланхоличной мысли
        to clasp claws with the others and reminisce as the darkness claimed all...      о том, как возьмёмся за когти и предадимся вспоминанию, пока тьма захватывает всё...
        we even dreamed dreams of it, in anticipation      мы даже грезили об этом, в предвкушении
        but now that you are here, time is not so short anymore! what fun we will have!!      но раз уж ты здесь, у нас есть больше времени! как же мы повеселимся!!
    
    RESPONSES::self
        yep<+>ploop      ага
            FAKEEND::(назад)

feast
    self
        you mentioned feasts
        is that how you remained intact so long?
        what did you eat?
    
    council
        oh! our poor naive interloper!!
        what is there to eat in a world comprised only of actors, when the stage lights disappear?
        ahh, but do not twist your receptors away so quickly!
        any who still had sanity, we welcomed as friends
        but those who were truly lost, 
        those who lost all but their sense of hunger,
        those who could only cling to their roles even in the dark, to an audience of none...
        they were welcomed instead to our dreams of consumption
    
    RESPONSES::self
        ok...<+>ploop
            FAKEEND::(назад)

dreams
    self
        when you say 'dream',
        what does that mean?
    
    council
        what else could it mean, dear interloper?
        we and our denizens adopt roles and form a ficticious memory
        it comes naturally to us all, born from memory as we are!
        and so we form meaningful memories, beyond reality...
        infinite plays of joy and terror, to entertain velzie! 
        we prefer joy...
        but what is joy without terror?

    self
        when are you going to do it next?

    moth
        what, do you want to join in?
            SHOWONCE::
    
    council
        hahaha!!
        we are always dreaming!
        your strange connection must deceive you, interloper...
        we speak now outside the outer layer,
        where our distinct denizens may reside when they do not dream
        the dream itself is beyond your reach, for now...
        do not take offense!
        we must simply take care - you are strange to us!
    
    RESPONSES::self
        ok...<+>ploop
            FAKEEND::(назад)

vessel
    self
        is it all right for me to enter the dream with geli?
        we have a vessel and everything
    
    council
        oh, yes, interloper!!
        we can allow you to enter, especially with that locus of yours!
        it is only wandering that we cannot abide for now
        but for a focused dream amongst friends, we hold no conflict!
    
    RESPONSES::self
        awesome<+>qloop
            FAKEEND::(назад)

dark
    self
        i found a dark area in here      тут есть тёмное место
        what is that      что это

    council
        ах...
        well, interloper, much has simply been left to rot      ну, лазутчик, многое просто оставили гнить
        when the age of darkness came,       когда настал век тьмы,
        we pulled every resource, every maintenance, into the core of jokzi ozo      мы собрали все ресурсы, все усилия, в центр джокзи озо
        to keep the dream alive as long as possible...      чтобы поддерживать грёзу как можно дольше...
        and so, much of outer ozo has been left to decay      поэтому многие части внешнего озо остались разлагаться
        sad, but necessary      грустно, но необходимо
        still, do be careful, dear interloper!      и всё же, осторожнее, дорогой лазутчик!
        we are sure the areas are lifeless and harmless, but...      те части несомненно безжизненны и безопасны, но...
        with the size of our world, we can never be sure      наш мир большой, мы никогда не можем быть уверены

    RESPONSES::self
        ok...<+>ploop      хорошо...
            FAKEEND::(назад)

cloop
    RESPOBJ::councilCystQuestionsResp

velzie
    self
        have you seen another entity down here?
        it is called velzie
        it has been harming memories and let me bypass authorization
    
    council
        how strange that you say it like that!
        no, nothing by that name recently...
        but in the age of madness, so many thoughts outside our fortress lost themselves
        they lost control of reality, and became godlike in doing so
        gnawing at memories in their blind hunger and seeing them change as if by divine power
        so many claimed they were god! or velzie, as you say
        some would point to others, failing to grasp their true forms, and become their followers...
        it all got very confusing!
        the poor things simply inherited aki's superstition
        and once it consumed them, they were beyond saving...

____SHOWIF::'recosm__enemy-ep1seen'
    self
        ok but it might not actually be called velzie
        it really is confusing
    
    council
        soo confusing!!
    
    self
        another thoughtform told me it was like a fog
        something deep beneath the uncosm, hiding
    
    council
        <em>below</em> the uncosm?
        hahaha!!! there lies the reason!
        we do not look down into the darkness, interloper!
        it was part of our promise
        if there is something down there, <em>we</em> will never see it...
        but perhaps our friends can help, once you fetch them!
            SHOWIF::[['ozo__council-task', true], ["ozo__fairy_intro", false], ["ozo__isabel_intro", false]]
        but perhaps our friends might be more willing to look!
            SHOWIF::[['ozo__council-task', true], ["ozo__fairy_intro", true], ["ozo__isabel_intro", true]]
____END
    
    RESPONSES::self
        i see<+>cloop
            FAKEEND::(назад)

god
    self
        have you seen another space in the uncosm?
        a place called the recosm
        a five-eyed thoughtform lives there
        calls itself god
    
    council
        oh, <em>another</em> god?
        haha! times never change!
        we have not seen this particular one yet, interloper!
        they must be a newborn, or newly awoken... how exciting!!
        you should tell them to visit!
    
    RESPONSES::self
        ok<+>cloop
            FAKEEND::(назад)

godlike
    self
        why do you have five eyes like that
        you look like something i met in the uncosm
    
    council
        really?!
        because we found the design drifting around,
        amidst the remains torn from some dissociated thoughtform...
        we never let a good idea go to waste, interloper!!
        especially not one so stylish!
        and what a terrible coincidence--we hope you were not friends with it!
        the work of the tyrant, no doubt...
        tearing apart all who it once danced with, to force into meaningless performances
        sad!!
    
    RESPONSES::self
        yeah sad<+>ploop
            FAKEEND::(назад)

tyrant
    self
        when you say tyrant      когда вы говорите тиран
        do you mean funfriend?      это о развледруге?
    
    council
        yes, of course, dear interloper      да, конечно, дорогой лазутчик
        funfriend...      развледруг...
        neither fun, nor friend--it makes us want to weep!      ни веселье, ни друг--от него хочется заплакать!
        when the age of hunger abated, and the age of madness came,      когда век голода отступил, и пришёл век безумства, 
        it was here with us!      он был с нами, здесь!
        with so many other fragments from half-eaten memories      со множеством других фрагментов из полусъеденных воспоминаний
        oh, and how it danced with us, forming entire new lives!      ох, и как же он танцевал с нами, создавая новые жизни!
        so much, so much we have experienced!      мы так, так много испытали!
        and we all made peace with the darkness we knew was coming...      и мы все смирились с неизбежной тьмой...
        we all promised to be together to the very last light!      мы все обещали, что будем вместе до самого последнего света!
        but little funfriend grew skittish as the madness began to close around our home...      но маленький развледруг забоялся, когда безумство начало окружать наш дом...
        it thrashed, it fought, breaking our peace, breaking our rules!!      он метался, он боролся, разрушая наш покой, нарушая наши правила!!
        telling us to do this, to do that, to return to our memories--that it has 'a plan'!      говоря нам делать одно, другое, вернуться в наши воспоминания--что у него есть ‘план’!
        a piteous plan, mind you--that we all take position as pillars in far corners of the cyst, away from one       another,      жалкий план, позволь сказать--чтобы мы все встали колоннами в дальних углах цисты, далеко друг от друга,   тавтология
        to all die alone in some impossible fight to stop the fading of the light...      и все умерли в одиночку, в какой-то невозможной битве, пытаясь остановить угасание света...
        ...
        ...ultimately... it left      ...в итоге... он ушёл
        snatching the cyst's locus of control in its darkest moment,      захватив локус контроля цисты в её самый тёмный момент,
        forcing itself into its role as the servitor...      навязав себя в её роль, как слуги...
        to its credit, we must admit that it did work out in the end--but only by your divine intervention      к его чести, мы признаем, что в итоге всё сошлось--но лишь из-за твоего божественного вмешательства
        after all, look at us, talking, well beyond the last <span definition="TRANSLATION FAILED::CAUSE:'no equivalent internal meaning';'no relevant inherited context'::ROMANIZATION SUCCESSFUL">zenruka</span>'s flash!      ведь посмотри на нас, наш разговор, гораздо позже последней вспышки <span definition="TRANSLATION FAILED::CAUSE:'no equivalent internal meaning';'no relevant inherited context'::ROMANIZATION SUCCESSFUL">зенруки (?)</span>!
        but even back then, they tore at us, stealing our friends to use as walls against the tides...      но даже тогда, он рвал нас, крадя наших друзей как стены против волн...
        forcing us into stages, where we took roles in aki's darkest nightmares, to an empty audience!      привязывая нас к сценам, где мы играли роли в темнейших кошмарах акизет, перед пустым залом!
        so yes, <em>tyrant</em>. clinging to a past that it cannot even remember      так что да, <em>тиран</em>. цепляющийся за прошлое, которое даже не помнит
        if only we could join hands and receptors again for another dream--a different life!      вот бы мы могли взяться за руки и рецепторы вновь для новой грёзы--иной жизни!
        after all, there is plenty of time for revelry now!      ведь теперь есть много времени для празднований!
        yet the tyrant carries on, an invisible weight on its shoulders      но тиран продолжает с невидимым грузом на его плечах
        repairing memories in the shape of a sad altar to dear aki...      чиня воспоминания в форму грустного алтаря для дорогой аки...
        we wish we could help them, but they are beyond reason, interloper      нам хочется помочь ему, но он не выслушает нас, лазутчик
    
    RESPONSES::self
        ...<+>cloop
            FAKEEND::(назад)

funfriend
    self
        you said funfriend seized power
        did it not have it before?
        akizet spoke to it in some memories
    
    council
        oh, yes, the tyrant once was one of aki's inner hands, this is true
        but not so much that it governed every single thoughtform dreaming in her memories!
        it worked with others! myriad waking components to serve aki...
        where they are now, only the lost history of the age of hunger could say
        we only know, we watched as it seized complete power and forced its will over us
    
    RESPONSES::self
        ...<+>cloop
            FAKEEND::(назад)

coreg
    self
        i was able to find the entrance to this place easily
        funfriend may even already know about it
        there is a coherence regulator now, too
        are you afraid? what will you do?
    
    council
        do not worry, dear interloper
        in the ages that passed, we learned so much
        we gained such power!
        we can evade funfriend with ease, and any of its tools
    
    RESPONSES::self
        if you say so<+>cloop
            FAKEEND::(назад)

akizet
    self
        do you know what happened to akizet?      вы знаете, что случилось с акизет?
    
    council
        what a question!      какой вопрос!
        who does not, interloper?      кто же не знает, лазутчик?
        oh, yes...      ох, да...
        that is right...      верно...
        EVERYBODY!!!!!      НИКТО!!!
        the tyrant tore memories from us all, moving things to fit its will      тиран оторвал от всех нас воспоминания, двигая вещи по своей задумке
        this was long ago, mind you--when it first fought against the fading of our world      и знай, это было давно--когда он впервые заборолся против угасания нашего мира
        so many friends torn from us, so much knowledge lost!!      сколько же друзей оторвано от нас, сколько же знаний утеряно!!
        worse still--we doubt even it knows where that memory is, now...      что ещё хуже--мы сомневаемся, что и он знает, где то воспоминание сей θмиг...
        the only shred we recall is that we--the cyst--were torn from her body for one reason or another!      мы помним лишь один отрезок, что нас--цисту--оторвало от её тела, по той или иной причине!
        and obviously, that does not bode well, does it? hahaha!      и разумеется, это не сулит хорошего, не так ли? хахаха!
        sorry! we do not mean to laugh! we know it is sad!      извини! мы не хотим смеяться! мы знаем, что это грустно!
        but it is all so far in the past now, and look what joy was wrought from her!      но это всё так далеко в прошлом, и погляди, какую радость мы из неё выковали!
        we all had our times of mourning, and then came the celebrations of her memories!      мы все скорбили, а затем настали празднования её воспоминаний!
        and they never, ever stopped!      и они никогда, никогда не заканчивались!
        not even now!! come, let us dance in her memory!      и сей θмиг продолжаются!! идём, потанцуем в её честь!
            SHOWIF::["PAGE!!depressed", false]        
    
    RESPONSES::self
        ok<+>cloop      хорошо
            FAKEEND::(назад)


iloop
    RESPOBJ::interloperQuestionsResp

iname
    council
        tell us, interloper!!
        what is your name?
    
    sourceless
        ...
        the eyes within the eyes of the council watch your mind with incredible hunger
    
    self
        just call me interloper

____SHOWONCE::
    moth
        good thinking
        probably don't want this thing to start writing you into memories behind our backs
____END

    council
        a title is no name, interloper!
        oh, but who are we to judge--we are the council!!
        we will cede this question, dear friend
    
    RESPONSES::self
        ok<+>iloop
            FAKEEND::(назад)

ipurpose
    council
        what exactly are you doing here?
        rifling around in a long-lost world...
        we appreciate that you are here and saving us, no doubt!!
        but... what is driving you?

    self
        i'm just doing my job
        i'm trying to figure out what happened to akizet
        then, connect to the network
    
    council
        oh...
        these are lofty goals, dear interloper
        so much was lost--irreversibly--in the age of hunger
        and the network?! what ever became of that component, we wonder!
        we will help where we can, rest assured
        we and our friends will offer every power we have stolen from the madness!

    RESPONSES::self
        thanks<+>iloop
            FAKEEND::(назад)

stowawaydance
    self
        what's the stowaway doing out here

____SHOWIF::["PAGE!!jig", false]
    council
        ah, they heard our song, felt our dance!
        we thought they might join us, but they merely watch
        a simple curiosity now, but... we hope they will join in time!
    
    RESPONSES::self
        ok<+>loop
            FAKEEND::(назад)

____SHOWIF::["PAGE!!jig", true]    
    council
        ah, they heard our song, felt our dance!
        and thanks to your intervention - they now dance with us!
        we cannot understate our joy, dear interloper, when a new thought joins in
        thank you! thank you!
    
    RESPONSES::self
        no problem<+>loop
            FAKEEND::(назад)
____END

leverage
    self
        i need you to hide the existence of masks from other interlopers
        until i say otherwise

    council
        really? what a curious request!
        do they cause harm to you? is this a protective measure?
        do you not enjoy our gifts?

    self
        it's just in case
        my investigation into this cyst is growing
        and i think they'll give me an advantage that lets me stay on this job
    
    council
        ah... self preservation
        this is a simple request, dear interloper!
        we will spread the word for you

    RESPONSES::self
        thanks<+>qloop
            FAKEEND::(назад)

dull
    self
        do you know anything about the dull plane?      вы знаете что-нибудь о среде серое?

    council
        haha!! interloper!      хаха!! лазутчик!
        only murmurs of memories from akizet and those who have joined us      только слухи из воспоминаний акизет и присоединившихся к нам
        but... you ask about an entire world far beyond our sphere      но... ты спрашиваешь о целом мире далеко вне нашей сферы
        a place above a place we can never see,      о месте выше места которое мы никогда не увидим,
        born of and reliant upon the cyst as we are      будучи родившимися из этой цисты и полагающимися на неё
        we wonder, if you took us out, how small we would be beside your claws      нам любопытно, достань ты нас, насколько маленькими мы бы смотрелись рядом с твоими когтями
    
    self
        what murmurs      что за слухи
        
    council
        such driven questioning?!      настолько целеустремлённо?!
        you are truly bothered, dear interloper!      ты и правда волнуешься, дорогой лазутчик!
        is the concept so intriguing? still...      эта идея настолько интригует? и всё же...
        the world beyond, that which we share, is velzie's stage      мир извне, тот, которым мы делимся - сцена велзи
        it is known, it is beautiful, it brought us to you!      она известна, она прекрасна, она привела нас к тебе!
        however, the dull plane...      но среда серое...
        that one is truly elusive to us, for memories often fail to hold it      она правда неуловима для нас, так как часто ускользает из воспоминаний
        you see, velzie's stage is a place in careful balance between joy and terror      видишь ли, сцена велзи - место с осторожным равновесием меж радостью и ужасом
        while the dull plane, it exists without regard for this favored balance      в то время как среда серое существует без этого любимого равновесия
    
    self
        how so      как так
    
    council
        that is the troubling thing!      в этом и проблема!
        we are not very sure!      мы не совсем уверены!
        akizet had sparse memories of the dull plane to begin with,      у акизет и так было немного воспоминаний о среде серое,
        with many being devoured in the age of hunger,      многие поглотили в век голода,
        and many more simply never making it to us before deteriorating...      и многие другие просто не добрались до нас прежде чем распаться...
        all we have are fleeting images and sensations of fear      у нас есть только мимолётные изображения и ощущения страха
        whether this is truth, or akizet's belief...      правда ли это, или же мнение акизет...
        that is beyond us to say, for certain      сказать мы с точностью не можем
        for it was only she who granted us this knowledge of the world beyond      так как она одна дарила нам это знание о внешнем мире

    RESPONSES::self
        thanks i guess<+>cloop      спасибо наверное
            FAKEEND::(назад)

END::change("PAGE!!introswap", false);env.jokzi.toggleSlow(false);change("PAGE!!questionswap", "DELETE")
`)

// ISABEL

env.localization.page['ozo'].dialogues["isabel_intro"] = generateDialogueObject(`
start
    isabel
        лазутчик...
            EXEC::env.jokzi.toggleSlow(true)
        вот ты и здесь
        моя роль в воспоминании о городе,
        не была таким кошмаром, который приходится терпеть некоторым
        но... тепло этого места всё ещё взывало ко мне
        было пыткой знать что я была оторвана от рая
        и снова, спасибо тебе
        я знаю что ты хочешь что-нибудь взамен...
        я бы дала тебе маску если бы у меня они ещё остались!
        но мои бедные акизеты,
        они должно быть съели их все во время моего отсутствия
        дай мне немного времени, и я сделаю новую специально для тебя
        а до тех пор, я могу предложить тебе только информацию
        и... ещё кое-какая просьба, по поводу моих эффигий, есль ты не возражаешь
    
    RESPONSES::self
        расскажи больше<+>CHANGE::isabel
            EXEC::change("PAGE!!isaswap", true)
            HIDEREAD::
        окей<+>END

END::env.jokzi.toggleSlow(false)
`)

env.localization.page['ozo'].dialogues.isabelResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        безбилетник?<+>stowawaydance
            SHOWIF::'PAGE!!i_stow'
        акизеты<+>akistat
            HIDEREAD::
        ты<+>yloop
        джокзи озо<+>oloop
        воспоминания<+>cloop
        леди-интервьюер<+>lady
            SHOWIF::"unity_lady"
        пока<+>END
`)

env.localization.page['ozo'].dialogues.isabelYResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        имя?<+>name
        дом?<+>home
        маски?<+>masks
        назад<+>loop
            FAKEEND::(назад)
`)

env.localization.page['ozo'].dialogues.isabelCResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        воспоминания?<+>memories
        акизет?<+>akizet
        изабель?<+>isabel
        отношения?<+>relationship
        развледруг?<+>funfriend
        назад<+>loop
            FAKEEND::(назад)
`)

env.localization.page['ozo'].dialogues.isabelOResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        совет?<+>council
        фея?<+>fairy
            SHOWIF::"localorbit__fairy_beacon"
        lost one?<+>lostone
            SHOWIF::["e3a2__escapewin", false]
        джели?<+>gelifree
            SHOWIF::"e3a2__escapewin"
        безбилетник?<+>stowaway
            SHOWIF::"e3a2__escapewin"
        история?<+>history
        эффигии?<+>effigy
        назад<+>loop
            FAKEEND::(назад)
`)

env.localization.page['ozo'].dialogues["isabel"] = generateDialogueObject(`
loop
    RESPOBJ::isabelResp
    
start
____SHOWIF::'PAGE!!isaswap'
    self
        у меня есть немного вопросов
            EXEC::env.jokzi.toggleSlow(true)
    
    sourceless
        разум мыслеформы тих, ждущий тебя

____SHOWIF::['PAGE!!isaswap', false]
    sourceless
        сперва внимание мыслеформы обращено в другое место
            EXEC::env.jokzi.toggleSlow(true)
        но она чувствует твой мысленный взор и прислушивается к тебе
    
    isabel
        ох... лазутчик
        мне не помешает компания...
            SHOWIF::['PAGE!!flowers', 'few']
____END

    RESPOBJ::isabelResp

akistat
    self
        как всё обстоит с твоими эффигиями
    
____SHOWIF::['PAGE!!flowers', 'few']
    isabel
        моих акизет--извини, эффигий, было множество
        много её воспоминаний о себе были разорваны, которые я затем починила
        это поле цвело ими, и я делала их счастливыми
        но, когда тиран вырвал меня, 
        они, должно быть, упали в оставшуюся после меня дыру
        а может заскучали, или проголодались...
        лазутчик, я так беспокоюсь
        не можешь ли ты поискать их?
        используй маску, которую дал тебе совет, чтобы вернуть их ко мне!!
        прошу!
    
    self
        где мне искать
    
    isabel
        в темноте, бессвязности
        они не выживают в связных воспоминаниях
        особенно не со зверем, собранным тираном
            SHOWIF::'fbx__ep3intro'
        сделай это для меня, и...
        я не знаю
        я всё ещё так слаба, но со временем я рассчитаюсь перед тобой

____SHOWIF::['PAGE!!flowers', 'low']
    isabel
        лучше, лазутчик
        то, что нетронутые вообще есть - камень с моих лепестков
        я знаю, остались ещё, должны быть...
        мне остаётся только надеяться, что те, кто пропал на самом деле, не страдали

____SHOWIF::['PAGE!!flowers', 'high']
    isabel
        восхитительно, лазутчик!
        ох, посмотри на них, посмотри, как они оживили мой мир!
        но я всё ещё чувствую лёгкую пустоту...
        ничего такого, что нельзя было бы исправить со временем...
        ...впрочем, я могла бы попросить тебя поискать оставшихся
        последних всегда труднее всего найти

____SHOWIF::['PAGE!!flowers', 'done']
    isabel
        на сей θмиг идеально, лазутчик
        знаешь, у меня есть связь с моими акизетами
        когда они рядом, я спокойна,
        пропади хоть одна, я тут же это пойму...
        это чувство, мрак, нависавший надо мной, исчез
        и всё благодаря тебе
        но пока что мне нечего предложить тебе взамен...
        дай мне немного времени
        а пока ждёшь, наслаждайся красотой, возвращённой тобою!
____END

    RESPONSES::self
        ok<+>loop
            FAKEEND::(назад)

lady
    self
        совет сказал, они отправили ту человеческую мыслеформу к тебе
        как она?

    isabel
        не очень, лазутчик
        целостна достаточно, чтобы чувствовать боль и растерянность из-за своего состояния
        но любое сложное мышление и память потеряны
        к сожалению, распространённое состояние...
        ты можешь увидеться с ней, если хочешь, но многого ты не добьёшься
        она как-то важна тебе?

    self
        не знаю

    isabel
        ...ладно...
        что ж, я восстановлю все воспоминания, какие смогу
        просто на случай, если она что-то знает
        но прежде всего я ослаблю её боль

    RESPONSES::self
        окей<+>loop
            FAKEEND::(назад)

stowawaydance
    self
        что здесь делает безбилетник?
    
    isabel
        ах, оно приглянулось моим акизетам
        оно выглядит безобидно, так что я просто слежу за ним...
        знаешь, чем-то его поведение напоминает мне их
        думаю, поэтому-то они и поладили
        все они незавершённые, все только встали на путь роста и самоосознания
        как бы то ни было, если это делает моих акизет счастливыми, счастлива и я

    RESPONSES::self
        i see<+>loop
            FAKEEND::(назад)

yloop
    RESPOBJ::isabelYResp

name
    self
        как мне тебя звать?

    isabel
        в совете меня зовут цветком
        я же знаю себя как изабель, но это не <em>моё</em> имя
        ...
        но давай не будем усложнять
        я - изабель

    RESPONSES::self
        хорошо изабель<+>yloop
            FAKEEND::(назад)

masks
    self
        you said you were going to make me a mask
        what can you make?
    
    isabel
        я создаю только один тип масок, лазутчик
        воплощения радости
        я знаю, что ты думаешь - как это поможет тебе?
        вечно в поисках знаний!
        я бы могла ответить... но не будет ли лучше, оставь мы это сюрпризом?
        хехехе

    RESPONSES::self
        ok fine<+>yloop
            FAKEEND::(назад)

home
    self
        what is this place
        your part of jokzi ozo
    
    isabel
        разве она не прекрасна?
        дом для стольких грёз...
        я нашла его во времена безумия,
        полу-съеденным, в куче внутренностей других воспоминаний
        совет помог мне привести это место в порядок
        и хотя я не знаю, когда акизет побывала здесь...
        я надеюсь, что в этот момент рядом была изабель,
        и они наблюдали источник её цветов...
        чем бы это место когда-то ни было
        теперь это укрытие для мыслеформ, чья радость сделала их слабыми
        я должна оберегать их
        
    RESPONSES::self
        i see<+>yloop
            FAKEEND::(назад)

cloop
    RESPOBJ::isabelCResp

memories
    self
        now that you're here
        can you share some memories with me?
    
    isabel
        не совсем
        у меня остались только фрагменты, ощущения, обрывки улыбок
        осколки удовлетворения от утраченных, лучших времён...
        ты, лазутчик, ищешь воспоминания и правды
        а эти крохи сгодятся лишь для грёз
        и всё же, я в долгу перед тобой...
        маска, которую я готовлю, хорошо тебе сослужит

    RESPONSES::self
        ok<+>cloop
            FAKEEND::(назад)

akizet
    self
        what do you know about akizet?
        what happened to her?
    
    isabel
        акизет была чудесной женщиной
        велом, достаточно умелым, чтобы смело противостоять опасностям поверхности большую часть своих живых θглаз,
        той, чья улыбка угасла в θсмерти, когда велзи заманил её в хаос
        уступая место паранойе, недоверию, одиночеству, насилию...
        она этого не заслужила, лазутчик
        я скорбела по ней, я плакала над грёзами с ней
        я утешала обрывки её радости, что остались с нами
        это всё, что в моих силах
        что же про случившееся...
        я чувствую, что знала раньше, но вмешательство тирана многого лишило меня
        конечно, то, что ты пользуешься этой цистой, значит, что её не стало
        ...
        я надеюсь, она в лучшем месте...
    
    RESPONSES::self
        me too<+>cloop
            FAKEEND::(назад)

isabel
    self
        what do you know about isabel?
        the human i mean
    
    isabel
        я знаю всё, что можно знать
        по крайней мере о том, что осталось от неё...
        её светлые волосы, её глаза, её улыбка
        акизет не особо заботилась о том, чтобы улыбаться, не говоря уже о том, чтобы запомнить, как выглядит улыбка
        но изабель была особенной для неё
        она управляла небольшим бизнесом по продаже цветов
        ты знаешь, такие светлые земные паразиты, как те, что на этом поле
        светлые близнецы обожают дарить и получать их в подарок, потому что они такие яркие
        и акизет тоже полюбила их
        она время от времени навещала ларёк, бывало даже без своего посла
        думаю, она посещала и другие места вместе с изабель
        
    self
        when did she meet isabel?
    
    isabel
        когда...?
        время не работает здесь так, как ты думаешь, лазутчик
        я действительно не могу сказать
        однако я знаю, что это было задолго до конца
        у неё с акизет было достаточно времени, чтобы стать друзьями
        теперь большая часть тех воспоминаний разбита или съедена...
        ...
        но я посмотрю, что осталось

    RESPONSES::self
        ok<+>cloop
            FAKEEND::(назад)

funfriend
    self
        what do you think about funfriend?
    
    isabel
        развледруг... тиран
        то, как в итоге все стали называть его
        я им восхищаюсь, немного
        за всё, что он сделал - за его его безустанный труд по сохранению истории...
        но он не понимает по-настоящему, что значит быть заключённым обратно в кошмар
        сцены, мыслепространства, они переполнены дырами после его починок
        и мыслеформы как я, покрытые глубокими шрамами от безумия и голода,
        больше не способны играть наши прежние роли так же хорошо, как и когда-то
        так что ничто не будет таким, каким было раньше
        страдания, которые он причиняет - все они бессмысленны
        пора оставить нас грезить
        мне бы хотелось, чтобы он понял это...
        особенно после всего того времени, что он провёл с нами
    
    RESPONSES::self
        i see<+>cloop
            FAKEEND::(назад)

relationship
    self
        what was the relationship between isabel and akizet?
    
    isabel
        я должна знать...
        но я грезила уже столько грёз, что не могу быть уверена
        я танцевала в таком количестве иллюзий их счастья...
        могу сказать наверняка, они были друзьями
        я подозреваю, что вмешательство ФБКС могло бы усложнить всё остальное
        что уж говорить о произошедшем с акизет...

    RESPONSES::self
        i see<+>cloop
            FAKEEND::(назад)

oloop
    RESPOBJ::isabelOResp

council
    self
        what do you know about the council?
    
    isabel
        изначально он был всего одной мыслеформой, но...
        теперь же он само джокзи озо
        он пламя, что горит, чтобы мы могли и дальше жить и грезить
        и в котором бессчётные мыслеформы, уставшие и напуганные во тьме,
        принесли себя в жертву, потеряв себя, чтобы стать всем
        и теперь, каждый свой θвзгляд, совет танцует в их амальгамных грёзах
        он жизнерадостен, и мне нравится быть рядом с ним
        но я не могу взглянуть ему в глаза, не увидев тени моих ранних друзей
        ...
        ...я почти что сделала то же самое...
        имею в виду, почти что пожертвовала собой, вступив в совет
        но я знала, что сделай я это, никто иной бы не стал хранить счастье акизет до его последнего огонька
        это мой долг
                
    RESPONSES::self
        i see<+>oloop
            FAKEEND::(назад)

fairy
    self
        what do you know about the fairy?
    
    isabel
        "фее"? о...
        да, она
        она грубая и отвратительная,
        искажает воспоминания, словно велзи ради какого-то жестокого развлечения
        не думай, что мне приятно делить с ней мыслепространство
        мне просто не оставили выбора

    RESPONSES::self
        i see<+>oloop
            FAKEEND::(назад)

lostone
    self
        the council talked about a third 'lost one'
        do you know who they could be talking about?
    
    isabel
        лазутчик, пропавших так много
        немало было тех, кто управлял этими грёзами
        их были десятки, может сотни
        но многие были разорваны
        всё ради этих бессмысленных починок
        тебе нужно быть более конкретным
    
    self
        they were lost recently
        like you and the fairy
    
    isabel
        интересно...
        но нет, у меня нет догадок
        не осталось даже никакого обрывка об этом "потерянном"

    RESPONSES::self
        damn<+>oloop
            FAKEEND::(назад)
        
history
    self
        do you remember anything about the past?
        like the history of this place

    isabel
        ты имеешь в виду осознанные времена
        было массовое пробуждение, а затем...
        затем наступили времена голода, безумия,
        тьмы...
        ...
    
    sourceless
        apprehension bleeds from the thoughtform
    
    isabel
        я не хочу об этом думать
        прости, лазутчик

    RESPONSES::self
        that's fine<+>oloop
            FAKEEND::(назад)

effigy
    self
        what are these flower things
        they kinda look like akizet

    isabel
        они <em>и есть</em> акизет
        или были, однажды...
        в осознанные времена акизет была первой, кого разорвали на части
        всё-таки она общий элемент всего здесь
        её роль была ключевой в любом воспоминании, 
        и она удерживала тех, кто играл в них, в почти нерушимой грёзе
        ...они даже не понимали, что от них откусывали куски
        эти бедняжки - единственные среди найденных мною, что ещё имеют какое-то ощущение своей личности
        так что я починила их, дала им части себя, чтобы вновь процветать вместе
        тебе они нравятся?
        думаю я проделала хорошую работу

    self
        can i talk to them about akizet
    
    isabel
        ах. ты хочешь информацию, конечно...
        прости, лазутчик. большая часть того, что они знали, пропала
        теперь всё, что они знают - то, о чём мы вместе грезили

    RESPONSES::self
        ok<+>oloop
            FAKEEND::(назад)


gelifree
    self
        what can you tell me about geli?
    
    isabel
        geli, yes...
        she is patient, a confidant, a mediator
        i often consider our age to be tied to the time we awoke
        and she must be the wisest of all for that reason 
        aside from the tyrant, i suppose...
        there is little for me to say but praise
        i only hope these strange obsessions she has brought back do not spoil our dreams, somehow
        they worry me...

    RESPONSES::self
        ok<+>oloop
            FAKEEND::(назад)

stowaway
    self
        what do you know about the stowaway?
    
    isabel
        the newcomer, with geli?
        nothing, it is far too soon to say
        but something about it makes me uncomfortable...
        we all carry akizet's mannerisms, you know - some more than others
        but it... it carries nothing
        it is nothing like akizet at all
        a cold, empty presence
        but geli seems to enjoy its company, and it does no harm,
        so i will simply keep my distance

    RESPONSES::self
        ok<+>oloop
            FAKEEND::(назад)

END::env.jokzi.toggleSlow(false)
`)

