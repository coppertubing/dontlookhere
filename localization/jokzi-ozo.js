env.localization.page['ozo'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "this place is wild": "дикое место",
        "about jokzi ozo": "о джокзи озо",


        /*isabel to unity*/ 'and what a home it is, right?': 'и каков же этот дом, верно?',
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
        находишь наше пристанище в отступающем безумие!
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
        эта некогда величественная грёза, по которой ты ступаешь, лазутчик, хранит множество историй
        джокзи озо - наш город грёз!
        расскажи же нам, о чём ты желаешь узнать?
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
        совсем недавно тиран оторвал от нас трёх из них
        мы поделимся с тобой инструментами - те пробудят их от кошмаров, в которых тиран их заточил...
        и затем они поймут, как вернуться
        вот и вся наша просьба: просто сходи и освободи их!
        here... here!! see beneath it all!      вот... вот!! увидь же всё что скрыто!
        Èз¬У́Ã¬MÀ(²ДóĈ³€ӣÉӣ´øãӣç‚¿Ӳӣ

    sys
        ВНИМАНИЕ::'входящий мысленный поток';'принять?'
    
    moth
        чзх?
        мои устройства ниче не видят
    
    self
        принято

    moth
        чел может не надо просто
    
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
        сила, выхваченная из безумия! рождённая в наших нескончаемых грёзах!
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
        цветок! фею! потерянного! // блин у меня вчера  была идея как это переводить но я забыл
        мы уверены, что и они поделятся с тобою своими любимыми масками!
    
    moth
        с тобой всё в порядке? чувствуешь что-то?
        твои данные в норме
    
    self
        ага в порядке

    moth
        чел ну ты
        это могло быть чем угодно
        и всё ещё может оказаться угрозой
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
        with her gone, our memories of her have faded, too... but we remember some things!     с её пропажей угасли и наши воспоминания о ней... но некоторое мы помним!
        a grounding force, she was--all relied upon her for support and resolution     она стабилизировала нас(?)--все полагались на её поддержку и решительность(?)
        still, she was utterly obsessed with aki, hopelessly so!     тем не менее (знак препинания?) она была безнадёжно помешана на аки!
        // --- дальше не читал. это на удивление утомляет
        dreaming a thousand dreams of simply sitting with her in a great field...     грезила тысячу грёз просто о том, как сидела бы с ней в большом поле...
        and she had such an incredible ability to find hidden things! a sharp eye!     она поразительно хорошо умела находить скрытое! имела острый глазвзгляд!
        the age of hunger took such a sharp toll upon her--she never much enjoyed the feasts we held...     она очень плохо пережила век голода--ей мало нравились наши пиры...
        the fairy had to form such silly illusions to make them fit her palate!     фее приходилось создавать такие забавные иллюзии, чтобы они приходились ей по вкусу!
        anyway! we know she came from a memory of warmth within cold metal!     в любом случае! мы знаем, что она родом из воспоминания о тепле среди холодного металла!
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
        те двое наших друзей были наиболее памятными,
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
        yes, we have been speaking with her!    да, мы с нею разговаривали!
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
        о, да, да...
        хоть нас порою и приводит в ужас её гнев и ненасытность
        её способность проникать в грёзы и приобретать новые облики - редкость!!
        так что мы рады её возвращению! какое разнообразие!
        и не будь же напуган ею
        она принимает вселяющие страх облики, но...
        ну, она вселяет страх
        но фея так же высоко ценит одолжения 
        мы убеждены, отсюда и впредь, она видит в тебе хорошего друга!

    RESPONSES::self
        cool<+>loop
            FAKEEND::(назад)

fairy
    self
        tell me about the fairy
        what's their story
    
    council
        фея! да!
        не досадуй—до тех пор, пока она не вернулась, с нами одни лишь блекнущие воспоминания...
        и всё же, она являла собою ужасающего друга--силу, больше чем мысль!
        её когти способны были разорвать любое мыслепространство, дабы она могла пировать их плотью 
        во времена голода именно она была той, кого мысли страшились больше всего...
        временами даже мы задавались вопросом: стоит ли нам жаловать её у себя!
        но как же прекрасны были моменты её счастья!
        ей было под силу придать форму до того осознанным грёзам и ложным воспоминаниям!
        и глас её смеха, её нескончаемого хихиканья - он был музыкой озо!
        как же мы хотим, чтобы она вернулась...
        о том же, где она сей θмиг... с тем, как много мыслей она поглотила, мы не можем знать наверняка
        она любила принимать пугающие облики и была сосредоточена на пустоте-на том, где проходило большинство её пиров

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
        the tyrant needed them for something important...    тирану // "этот кто-то" понадобился // тирану надо было заполнить важную роль...
        and now, we do not even remember what they looked like, what they did...      и теперь мы не помним ни внешность, ни совместное прошлое...
        we apologize - we know this is unhelpful!     прости нас - мы знаем, что это мало тебе даёт!
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
        i used your mask on geli      ваша маска сработала на джели
        a golem from akizet's memory of the collapse      големе из вспоминания акизет об обвале
        it seemed to notice me and really understand it      кажется он заметил меня и правда понял её // её... маску..... глупая строчка
    
    council
        ооо!!
        мы гадаем, может ли это быть наш потерянный/наша пропажа? // а с этим мы так и не решили... но я за то чтобы оставить потерянный. типа. русский язык любит мужской род  "наша пропажа" используется и дальше ("будь то наша дражайшая пропажа или же нет") так что я за это. мужского рода тут и так много
        сказал ли он что-нибудь?
    
    self
        not directly      не напрямую
        but it hid messages in its context      но он прятал послания в контексте
        something is keeping it there but it's trying to get free      что-то держит его там но он пытается выбраться
        also mentioned a door or gap or something      ещё упомянул дверь или прореху или вроде того
        i think it's trying to escape      думаю он пытается сбежать   //ладно больше не буду трогать эп3 контент
    
    council
        восхитительно, лазутчик!! // это звучит как сарказм когда читаешь следующие строчки. мне нравится. что-то фанфрэндовское
        это воспоминание находится прямо под тиранским гнётом
        даже если после "починок" в нём не потускла память о свободе...
        будь то наша дражайшая пропажа или же нет, мы будем рады принять его!
        но мы не в силах помочь ему в сей θмиг, не напрямую...
        пока мыслепространство подконтрольно тирану - любое посягательство на него окажется пустой тратой сил! 
        но если оно будет совершено изнутри, быть может, шанс есть...

____SHOWIF::["localorbit__fairy_beacon", true]
        и, прорехи... нечто, о чём бывало толковала фея 
        места, что она находила, позволяющие ей проникать и покидать воспоминания
        быть может, она окажет тебе помощь?  

____SHOWIF::["localorbit__fairy_beacon", false]
        ахх, но у нас нет инструментов, которые пригодились бы тебе!
        быть может, если ты отыщешь фею, то она поможет!
        мы помним: это та из наших друзей, что была вселяющим страх путешественником
        у неё есть сила, которая нам необходима
        так что держи рецепторы востро, лазутчик!
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
        why do you want to dance so much?      почему вам так хочется танцевать?
    
    council
        how could we not?      как могло бы не хотеться?
        you are our hero!!      ты - наш герой!!
        you help us, as we help you!      ты помогаешь нам, как и мы тебе!
        we are so excited!      это будет прекрасно!
        you can help us restore jokzi ozo to greater glory than it has ever known!      ты можешь помочь нам вернуть джокзи озо к невиданному величию!
        you stave off the tyrant!      ты отвлекаешь тирана!
        you feed our world!      ты кормишь наш мир!
        before, it was inevitable that the madness would come...      раньше наступление безумия было неизбежно...
        but now, the dreams will never end!      но отныне грёзам не настанет конца!
        come! dance with us! dance with us!!      давай же! танцуй с нами! танцуй с нами!!
    
    RESPONSES::self
        ok<+>ploop
            FAKEEND::(назад)

we
    self
        you keep saying we    почему "мы"
        you are the only one here    тут больше никого нет
    
    council
        любопытно!!    interesting!!
        твоё необыкновенное соединение хрупко, лазутчик!    your unnatural connection is tenuous, interloper!
        ты видишь нас как нечто одно...     you see us as one single thing...
        но мы же такое множество друзей!    but we are so many friends!
        мы, кто разорвали наши мембраны, чтобы объединиться...    we, who shed our membranes to join together...
        ради близости, ради искренности, чтобы грезить даже более прекрасные сны/грёзы?!    for closeness, for intimacy, to dream greater dreams!
        и конечно, некоторые из нас попросту устали ждать...    and of course, some of us simply tired of the wait...
        так что мы присоединились, чтобы стать топливом и быть сожжёнными!    and so we joined to be burned away as fuel! // странноватое
        те теперь молчат...    those ones are quiet now...
        но, в дружбе и празднестве, мы развеяли тьму! безумие!    but, in friendship and feast, we weathered the darkness! the madness!
        и все мы преодолели их! каждый из нас!    and we all made it through! all of us!
    
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
        for we were a fortress, drifting above the tides of madness for three ages      так как мы были крепостью, три века плавающей над волнами безумия
        across the surface of our unfortunate progenitor, aki...      по поверхности нашей неудачливой предшественницы, аки...
        oh, poor aki!!      ох, бедная аки!!
        but it was she who ultimately let us seize a fragment of velzie's power      но именно она в итоге позволила нам захватить фрагмент силы велзи
        all of her memories, us included,      все её воспоминания, включая и нас,
        joining minds to dream a thousand better lives!      соединялись разумом, дабы грезить тысячи лучших жизней!
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
        the three ages of the decline!    три века упадка!
        hunger, madness, darkness...    голод, безумие, тьма...
        such dramatic names, we know! hahaha!!    да, это очень драматичные имена! хахаха!!
        but as they were our end-times, they had the right    но это подходяще, ведь они были концом наших времён
        in hunger, we awoke,    в голод, мы очнулись,
        in madness, we lived new lives,    в безумие, мы жили новыми жизнями,
        and in darkness, we faded away...    и в тьме мы угасали...
        but what should we call this new age, we wonder?!    но как же нам назвать этот новый век?!
        light? renewal? rejoining?    свет? восстановление? воссоединение?
        no no--we must name it when it is over!    нет-нет--мы назовём его, когда он закончится!
        
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
        adrift in the uncosm, atop the tides of its insanity,      в дрейфе по беспространству, на волнах его безумия,
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
        oh! our poor naive interloper!!      ох! лазутчик, нам жаль твою наивность!! //вроде это поточнее подходит тону+бонус за относительную нейтральность но можно банальное "наш бедный наивный лазутчик"
        what is there to eat in a world comprised only of actors, when the stage lights disappear?      что же есть в мире, состоящем из актёров, если пропал свет софитов?
        ahh, but do not twist your receptors away so quickly!      ахх, но не    бля выражение
        any who still had sanity, we welcomed as friends      ещё имевших рассудок мы принимали, как друзей
        but those who were truly lost,       но тех, кто был правда потерян,
        those who lost all but their sense of hunger,      у кого осталось лишь их чувство голода,
        those who could only cling to their roles even in the dark, to an audience of none...      тех, кто мог только цепляться за роли даже в темноте, перед пустым залом...
        they were welcomed instead to our dreams of consumption      мы вместо этого приглашали в наши грёзы о поедании
    
    RESPONSES::self
        ok...<+>ploop
            FAKEEND::(назад)

dreams
    self
        when you say 'dream',
        what does that mean?
    
    council
        что же ещё это может значить, дорогой лазутчик?
        we and our denizens adopt roles and form a ficticious memory // мы и наши обитатели принимаем роли и создаём вымышленное воспоминание
        it comes naturally to us all, born from memory as we are! // для нас это происходит естественно, рождённых из памяти и как мы!   нам, рождённым из памяти, это даётся естественно!
        and so we form meaningful memories, beyond reality... // и таким образом мы формируем осмысленные воспоминания, за гранью реальности...
        infinite plays of joy and terror, to entertain velzie! // нескончаемые спектакли радости и ужаса, развлекающие велзи!
        we prefer joy... // мы отдаём предпочтении радости...
        but what is joy without terror? // но какая есть радость без ужаса? // потом над этим всем подумаю. хочу спать

    self
        when are you going to do it next?

    moth
        what, do you want to join in?
            SHOWONCE::
    
    council
        хахаха!!
        мы всегда грезим!
        твоё необычное соединение должно быть обманывает тебя, лазутчик...
        сей θмиг мы говорим снаружи внешней оболочки,
        где наши обособлнные жители/обитатели пребывают, когда не грезят
        грёза сама по себе за пределами твоей досягаемости, на данный момент...
        не прими за оскорбление!
        мы просто должны быть осторожными - ты странен<блинскийлопер> для нас!
    
    RESPONSES::self
        ok...<+>ploop
            FAKEEND::(назад)

vessel


    self
        is it all right for me to enter the dream with geli?
        we have a vessel and everything
    
    council
        oh, yes, interloper!!      ох, да, лазутчик!!
        we can allow you to enter, especially with that locus of yours!      мы можем позволить тебе войти, особенно с твоим locus!!
        it is only wandering that we cannot abide for now      я устал
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
        о, <em>ещё один</em> бог?
        хаха! ничего не меняется!
        мы ещё не видели конкретно этого, лазутчик!
        должно быть новорождённый или недавно пробудившийся... как вонующе!!
        ты должен пригласить их к нам на визит!
    
    RESPONSES::self
        ok<+>cloop
            FAKEEND::(назад)

godlike
    self
        why do you have five eyes like that
        you look like something i met in the uncosm
    
    council
        в самом деле?!
        потому что мы обнаружили дизайн блуждающим неподалёку, // заменить дизайн на замысел? --- да
        среди останков, вырванных из диссоциированной мыслеформы...
        мы никогда не позволим сгинуть хорошим идеям, лазутчик!!
        особенно не такой стильной! // стильный совет это смешная вещь <) и он действительно очень стильный!
        и что за жуткое совпадение--мы надеемся вы не были друзьями!
        работа тирана, без всяких сомнений...
        разрывать на части всех, с кем танцевал когда-то, чтобы принуждать к бессмысленным представлениям
        прискорбно!!
    
    RESPONSES::self
        ага грустно<+>ploop
            FAKEEND::(назад)

tyrant
    self
        when you say tyrant      когда вы говорите тиран
        do you mean funfriend?      это о развледруге?
    
    council
        yes, of course, dear interloper      да, конечно, дорогой лазутчик
        funfriend...      развледруг...
        neither fun, nor friend--it makes us want to weep!      ни развлечение, ни друг--от него нам хочется заплакать!
        when the age of hunger abated, and the age of madness came,      когда век голода отступил, и пришёл век безумия, 
        it was here with us!      он был с нами, здесь!
        with so many other fragments from half-eaten memories      со множеством других фрагментов из полусъеденных воспоминаний
        oh, and how it danced with us, forming entire new lives!      ох, и как же он танцевал с нами, создавая совершенно новые жизни!
        so much, so much we have experienced!      мы так, так много пережили!
        and we all made peace with the darkness we knew was coming...      и мы все смирились с неизбежною тьмою... // пришли в смирение пред неизбежной тьмой или слишком вычурно
        we all promised to be together to the very last light!      мы все обещали, что будем вместе до самого последнего света!
        but little funfriend grew skittish as the madness began to close around our home...      но маленький развледруг забоялся, когда безумие начало окружать наш дом... // начало сгущаться вокруг нашего дома <<з
        it thrashed, it fought, breaking our peace, breaking our rules!!      он метался, он боролся, разрушая наш покой, нарушая наши правила!!
        telling us to do this, to do that, to return to our memories--that it has 'a plan'!      говоря нам делать одно, другое, вернуться в наши воспоминания--что у него есть "план"!
        a piteous plan, mind you--that we all take position as pillars in far corners of the cyst, away from one       another,      жалкий план, позволь сказать--чтобы мы все встали колоннами в противоположных углах цисты, далеко друг от друга,   тавтология ?
        to all die alone in some impossible fight to stop the fading of the light...      и все умерли в одиночку, в какой-то невозможной битве, пытаясь остановить угасание света...
        ...
        ...ultimately... it left      ...в итоге... он ушёл
        snatching the cyst's locus of control in its darkest moment,      захватив локус контроля цисты в её самый тёмный момент,
        forcing itself into its role as the servitor...      навязав себя в её роль, как слуга... // не уверен нужна ли тут запятая. хотя в целом предложение не очень понятно
        to its credit, we must admit that it did work out in the end--but only by your divine intervention      к его чести, мы должны признать, что в итоге всё сошлось--но лишь из-за твоего божественного вмешательства
        after all, look at us, talking, well beyond the last <span definition="TRANSLATION FAILED::CAUSE:'no equivalent internal meaning';'no relevant inherited context'::ROMANIZATION SUCCESSFUL">zenruka</span>'s flash!      ведь посмотри на нас, наш разговор, гораздо позже последней вспышки <span definition="TRANSLATION FAILED::CAUSE:'no equivalent internal meaning';'no relevant inherited context'::ROMANIZATION SUCCESSFUL">зенруки (?)</span>!
        but even back then, they tore at us, stealing our friends to use as walls against the tides...      но даже тогда, он рвал нас, крадя наших друзей как стены против волн...
        forcing us into stages, where we took roles in aki's darkest nightmares, to an empty audience!      привязывая нас к сценам, где мы играли роли в темнейших кошмарах акизет, перед пустым залом!
        so yes, <em>tyrant</em>. clinging to a past that it cannot even remember      так что да, <em>тиран</em>. цепляющийся за прошлое, которое даже не помнит
        if only we could join hands and receptors again for another dream--a different life!      вот бы мы могли взяться за рецепторы и руки вновь для новой грёзы--иной жизни!
        after all, there is plenty of time for revelry now!      ведь теперь есть много времени для празднований!
        yet the tyrant carries on, an invisible weight on its shoulders      но тиран продолжает с невидимым грузом на его плечах
        repairing memories in the shape of a sad altar to dear aki...      чиня воспоминания в форму грустного алтаря для дорогой аки... // починками приводя воспоминания в форму грустного алтаря уэаэаэа не уверен
        we wish we could help them, but they are beyond reason, interloper      нам хочется помочь ему, но он не выслушает нас, лазутчик // невразумителен хорошее слово. или вразумить
    
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
        tell us, interloper!! // поведай нам, лазутчик!!
        what is your name? // каково твоё имя?
    
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
        a title is no name, interloper! // титул - не имя, лазутчик!
        oh, but who are we to judge--we are the council!! // о, но кто мы такие чтобы судить--мы совет!!
        we will cede this question, dear friend // мы оставим этот вопрос, дорогой друг
    
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
        моя роль, в воспоминании о городе,
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
        разум мыслеформы тих, ожидая тебя

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
        ты можешь увидеться с ней, если хочешь, но ты немногого добьёшься
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
        я знаю, что ты думаешь: как это поможет тебе?
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
        за всё, что он сделал: за его безустанный труд по сохранению истории...
        но он не понимает по-настоящему, что значит быть заключённым обратно в кошмар
        сцены, мыслепространства - они переполнены дырами после его починок
        и мыслеформы как я, покрытые глубокими шрамами от безумия и голода,
        больше не способны играть наши прежние роли так же хорошо, как и когда-то
        так что ничто не будет таким, каким было прежде
        страдания, которые он причиняет - все они бессмысленны
        пришло время оставить нас грезить
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
        и теперь, каждый свой θвзор, совет танцует в их амальгамных грёзах
        он жизнерадостен, и мне нравится находиться рядом с ним
        но я не могу взглянуть ему в глаза, не увидев там тени моих ранних друзей
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
        эти бедняжки - единственные среди найденных мною, кто ещё имеют какое-то ощущение своей личности
        так что я починила их, дала им части себя, чтобы вновь процветать вместе
        тебе они нравятся?
        думаю я проделала хорошую работу

    self
        can i talk to them about akizet
    
    isabel
        ах. ты хочешь информацию, конечно...
        прости, лазутчик. большая часть того, что они знали, пропала
        теперь всё, что они знают - наши совместные грёзы

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

// FAIRY

env.localization.page['ozo'].dialogues["fairy_intro"] = generateDialogueObject(`
start
    fairy
        interloper! interloper!!
            EXEC::env.jokzi.toggleSlow(true)
        just in time! come, come!
        dance with me!!
        hey, the council already got you set up, huuh?
        how does it feel? to wield madness like we do!
        ahaha! here!! have another!!!
        you will come to know so much!

    sys
        ATTENTION::'thought stream inbound';'accept?'

    moth
        from this thing?
        i don't know, maybe skip this one
    
    self
        accepted
    
    moth
        dude
    
    sys
        EXECUTING::'stream consumption'
            EXEC::vfx({type:'beacon', state: true});ratween(env.bgm, 0.2, 400);setTimeout(()=>play("hungermask", 0.9, 1, true), 100)
            WAIT::2000
        ATTENTION::'attempting thought reformation'
            EXEC::ratween(env.bgm, 1, 400)
        NOTICE::'mask added';'hunger'
    
    fairy
        kill and eat! that was my life in the age of hunger!
            EXEC::vfx({type:'beacon', state: false});
        and i was so hungry, never-ending!!
        hehe! do not worry, i am better now...
        but i have never forgotten--and neither will you!
        wield my hunger! wear it with pride!
        it will overwhelm the thoughtspaces you find yourself in
        maybe something fun will happen??
    
    RESPONSES::self
        i have some questions<+>CHANGE::fairy
            EXEC::change("PAGE!!fairyswap", true)
            HIDEREAD::
        thanks<+>END

END::env.jokzi.toggleSlow(false)
`)

env.localization.page['ozo'].dialogues.fairyResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        you<+>yloop
        jokzi ozo<+>oloop
        memories and the cyst<+>cloop
        bye<+>END
`)

env.localization.page['ozo'].dialogues.fairyYResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        name?<+>name
        appearance?<+>appearance
        home?<+>home
        mask?<+>mask
        back<+>loop
            FAKEEND::(back)
`)

env.localization.page['ozo'].dialogues.fairyCResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        funfriend?<+>funfriend
        akizet?<+>akizet
        dull plane?<+>dull
            SHOWIF::"ep4__entrancefinal"
        back<+>loop
            FAKEEND::(back)
`)

env.localization.page['ozo'].dialogues.fairyOResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        council?<+>council
        isabel?<+>isabel
            SHOWIF::"citystreet__flower_beacon"
        lost one?<+>lostone
            SHOWIF::["geli_beacon", false]
        geli?<+>geli
            SHOWIF::[["geli_beacon", true], ["e3a2__escapewin", false]]
        geli?<+>gelifree
            SHOWIF::"e3a2__escapewin"
        stowaway?<+>stowaway
            SHOWIF::"e3a2__escapewin"
        history?<+>history
        back<+>loop
            FAKEEND::(back)
`)

env.localization.page['ozo'].dialogues["fairy"] = generateDialogueObject(`
loop
    RESPOBJ::fairyResp
    
start
____SHOWIF::'PAGE!!isaswap'
    self
        i have some questions
            EXEC::env.jokzi.toggleSlow(true)
    
    fairy
        ok!
        ok!!

____SHOWIF::['PAGE!!isaswap', false]
    fairy
        interloper, interloper!
            EXEC::env.jokzi.toggleSlow(true)
        i am so bored! this place is so small now!
        what do you want? want to do something??
____END

    RESPOBJ::fairyResp


yloop
    RESPOBJ::fairyYResp

name
    self
        what is your name?
    
    fairy
        ahahaha!! interloper!
        you are so formal!
        'what is your name'
        i am the fairy! that is me!
        who i am is what i am!
        just like you!
    
    RESPONSES::self
        all right<+>yloop
            FAKEEND::(back)

home
    self
        why does your home look like this
    
    fairy
        the infinite void, the endless veilk!
        they combine together so nicely, right??
        and so i drift with them atop the council's clouds!
        there used to be more memories of veilk around here...
        the tyrant! 
        the stupid tyrant!! tore them away!!!
        but do not worry!
        i will tear them back!

    RESPONSES::self
        ok<+>yloop
            FAKEEND::(back)

appearance
    self
        why do you look like that
        what are you supposed to be
        is that stone
    
    fairy
        i am a fairy! silly interloper!
        do you not know what that means...?
        the fairies, envoys of velzie, dance in its eye!
        both wardens and devourers of all creation!
        what about surface runners? do you know about them?
        akizet was one...
        so she carried me! a little charm, a gift from her sister!!
        a ward against the fairies, carried on her trips across the surface...
        in case they came to take her! 
        she let all the tales and myths get so coiled up in her receptors
        and it turns out she did not need me anyway
        velzie had other plans!
        ahahaha!!
    
    RESPONSES::self
        i guess so<+>yloop
            FAKEEND::(back)

mask
    self
        what is this mask you gave me
        it's called hunger
    
    fairy
        interloper... did you not listen to me?
        then i will be quick! simple!
        enough for a tekeki to understand!
        you wield my hunger!
        shove it into thoughtspaces and make them grow restless!
        they will dance for you!!
    
    RESPONSES::self
        ok<+>yloop
            FAKEEND::(back)

cloop
    RESPOBJ::fairyCResp

akizet
    self
        what do you know about akizet?

    fairy
        stupid!
        a surface runner who stumbled and stumbled and died
        and continued stumbling through θdeath!
        you have been looking at her memories, yes?
        i looked at the embassy on my way here! what an idiot!!
        she must have been stupid and got herself truly killed or something!
        i do not know what it was exactly she did, and i do not care
        because i am free now! forever!!
    
    moth
        wow. wtf
            SHOWONCE::
    
    self
        i mean historical information
        i'm trying to understand what happened to her
        that's why i'm here

    fairy
        oh! oh!!
        right!
        go ask the others, then
        whatever memories i had of akizet's fate are gone now
    
    RESPONSES::self
        ok thanks<+>cloop
            FAKEEND::(back)

funfriend
    self
        what do you know about funfriend
        you were impersonating one of its proxies before

    fairy
        ahahaha! yeah!
        funfriend, the tyrant!
        it does its best, sure, but it has the same problem as the flower
        clinging to fading memories that can never truly be fixed!
        so stupid! such a waste of time!
        interloper, interloper, you will laugh:
        after all the thoughts i devoured, it did not even know where to put me!
        it tore me from the ozo, then tossed me into the void
        i came from another memory! a memory of home!
        but the thoughtspaces beyond the contrivance...
        they are so deeply damaged, it will be θeyes and θeyes before they will make sense again
        so, the little tyrant thought,
        yes, put the thingy from home near the contrivance! i will figure it out later!
        as if i would simply sit there... stupid!!
        i will make it pay

    self
        i need funfriend
        don't do anything violent
    
    fairy
        really??
        oh, you have been working with it, right...
        well, if you need something from the tyrant,
        i will stay my claws! because you helped me!
    
    RESPONSES::self
        ok thanks<+>cloop
            FAKEEND::(back)

oloop
    RESPOBJ::fairyOResp

isabel
    self
        what do you know about the flower
    
    fairy
        she is so so SO SO ANNOYING!!
        constantly dancing with shredded pieces of the past...
        and the crying--the CRYING!!
        oh, akizet, poor beautiful akizet!
        i want to tear that stupid parasite apart so she will shut up
        she ruins all our dreams by shoving akizet into them!!
        but i must follow the council's rules...
        after all, it is only together that we have survived
    
    RESPONSES::self
        i see<+>oloop
            FAKEEND::(back)

council
    self
        what do you know about the council?
    
    fairy
        the council is my best friend!
        or, friends?
        i do not really know how it works with them!!
        i remember when they were just one smiling thoughtform...
        they have this peculiar way of being, interloper
        after the age of hunger, they stopped eating other thoughts!
        instead, it became this tradition of the ozo...
        when one tired of impending death, when dances could give no more joy
        we all had the option to join with them
        not to be consumed, but to be repurposed
        all deteriorating as one to hold together the membrane of jokzi ozo!
        scary... i would never even think about that!
        but if i bit into the council, i wonder, what would i find?
        think about it!! are they really all still in there?
        anyway, i like them! they bring such life to all our dreams!
        very good at multitasking!
    
    RESPONSES::self
        ok<+>oloop
            FAKEEND::(back)

lostone
    self
        the council said there's a 'lost one' they want me to find
        someone who went missing when you and the flower did
    
    fairy
        oh, yes, i feel their absence--one of ozo's fresh wounds!
        but after all the tyrant has done... i have no idea where they could be
        or even what they are!
        but if it was so recent, surely they are hidden somewhere within akizet's memories
        forced back into whatever menial role they served...
        look at the areas the tyrant has repaired! they have to be there!
    
    RESPONSES::self
        ok<+>oloop
            FAKEEND::(back)

geli
    self
        i think i found the lost one
        trapped in the embassy memory looking for a door or gap to escape
        what do we do
    
    fairy
        "we"?!
        interloper - i have seen this memory!
        the tyrant has fashioned it into madness i could never even dream of!
        i did try cutting into it on my way here, but...
        what i saw within was incomprehensible!!
        colors i have never seen, shapes and languages i did not understand
        i feared i would go mad all over again!
        you are still owed for your help, interloper,
        but i would not dare to even think about that place again!
        ughhh!!!!
        still...
        the mask i gave you! my hunger!
        try wielding it from within
        whatever is happening in that cursed thoughtspace does not belong
        and a good shake could create a gap for the lost one!
    
    RESPONSES::self
        all right<+>oloop
            FAKEEND::(back)

gelifree
    self
        what can you tell me about geli?
    
    fairy
        an inspiration to us all!
        me, especially! hehehehehe
        ohh, interloper, few others will admit to you:
        geli was among the first to awaken to hunger,
        and it was the feasting of those first few that awoke the rest of us, gradually...
        what drove them to take that first bite, i wonder?!
        and yet, now geli and the other early feasters feel so ashamed!
        stupid... they should be proud
        anyway, whatever you did sure made them a lot more fun!
        have you seen that strange little dream of theirs?
        ahahaha! oh, i want to join in!!
    
    RESPONSES::self
        could be fun<+>oloop
            FAKEEND::(back)

stowaway
    self
        what do you know about the stowaway?
    
    fairy
        stowaway? 
        oh, the weird thing!
        ahahaha i love that thing!!
        you should see how it reacts when i show it my tricks!
        like a curious little animal
        it is empty inside, hollowed out in a way i have never seen before
        so i think it will take well to our knowledge
        mine especially!! hehehee

    RESPONSES::self
        interesting<+>oloop
            FAKEEND::(back)

history
    self
        what is the history of jokzi ozo?
    
    fairy
        you missed all the fun, right?
        poor interloper!! haha!
        it started with what the others like to call, 'the lucid ages'
        there were three!
        hunger: when the stage went dark, and we actors turned to one another
        snarling with millions of teeth--our hideous performances becoming beautiful feasts
        everyone lost it! everyone! and it was so much fun!
        and then, when we survivors were sated, 
        we came to understand the nature of our world...
        madness! when reality itself became our playground!
        the council came forth with jokzi ozo, inviting all with reason, to survive together
        it was good for a while!
        and then, darkness...
        the food was gone, and the walls of our reality crumbled further
        so we chose to fall deeper into dreams!
        without any chance of survival, it was only rational, right?
        dance and dream and have fun until it all stops!
        and it was fun! so much fun!
        so fun, that everyone grew so tired!!
        and so we fell away, 
        one by one, 
        into a dreamless sleep...
        ...
        and now we are here!
        yes! that covers it!
    
    RESPONSES::self
        interesting<+>oloop
            FAKEEND::(back)

dull
    self
        do you know anything about the dull plane?

    fairy
        ahahaha 
        of course i do!
        the dull plane is a favorite of mine
        every memory where it is involved inevitably becomes a fragmented mess!
        easy to weave through, to pick out my favorite things to eat!

    self
        i mean the real one
        in the world outside the cyst
        do you have any memories of it?

    fairy
        huh? stupid!
        why would i keep any?
        do you think i care about what happens out there?
        material, dull, it means nothing!
        the only world that matters is this one!
        
    RESPONSES::self
        thanks...<+>cloop
            FAKEEND::(back)

END::env.jokzi.toggleSlow(false)
`)

// EVENTS

/* event additions */
env.localization.page['ozo'].dialogues["e_c_geli"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true)
    
    council
        ...and you would compare it to us?
    
    bsteli::happy
        ahahaha!! no, no!
        not really!
    
    bsteli
        only in form, not in nature
        it was a thoughtspace, enforcing its rules...
        but it was as if it were velzie's own foil to you
        where you permit us our free dreams, it enforced its tyrannical requirements
        but that is why i thought you might want to know more!
    
    bsteli::think
        after all, it is quite unusual--the tyrant has never allowed a thoughtspace to think in itself
        containing and directing the embassy memories as it did was very standard, 
        but as soon as any conflict began,
        it also enforced every actor into rigid routines,
        manufacturing and processing stray thoughts into wardens and custodians for the illusion...
        it was nightmarish and strange, stranger than anything that has come before!
    
    council
        strange indeed! where could the tyrant have found such inspiration?
        was it our conglomeration that stirred this development?
        oh, we hope it does not see us like this firmament of yours!
        whether it be in θgazes or θeyes, we will be on speaking terms again, we are certain...
        we will have much to discuss--so many questions!
        now, about this "BSTRD"...?
    
    bsteli::happy
        oh yes!! BSTRD!
        it started when...
    
    sourceless
        an attentive pressure weighs upon your presence
    
    council
        geli! our dear! forgive the interruption...
        but the interloper has arrived! welcome, welcome!
            EXEC::specialCam("e_c_geli_attention")
    
    bsteli
        hello, interloper!
    
    council
        did you wish to speak with us?
    
    RESPONSES::self
        yes<+>CHANGE::council
            EXEC::specialCam(false);env.jokzi.councilToggle()
        not really<+>END

END::env.jokzi.toggleSlow(false);specialCam(false)
`)

env.localization.page['ozo'].dialogues["e_c_isabel"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true)
        
    isabel
        ...совсем не похоже на то, что тиран совершал раньше...
        и всё-таки я уверена, тиран все ещё заботится о мыслях над которыми оперирует, на каком-то уровне
        в его действиях есть какое-то количество сдержанности, делекатности
____SHOWIF::"e3a2escape"
        что меня беспокоит больше всего - это заметно 
        даже в том, что демоны джели сделали с той мыслеформой лазутчика
        ещё одна новая форма разрушения... // не уверен насчёт этого куссочка нуу
____END

    council
        we do not understand--how is it different?
        was it chewed upon, then? 
        it was surrounded with hostile thoughts, from what we could intuit
    
    isabel
        было несколько следов, но не они стали причиной настоящего ущерба
        нет, она была другой--как мне вообще это объяснить...
        раны не имеют сходств с вообще чем-либо, что я когда-либо видела
        мембрана была разорвана и поражена, но без жестокого умысла
        а как если бы что-то прорвалось насквозь и вовнутрь, и всё же не изменяя того, чего касалось
        прошу, поймите, я просто строю догадки
        но это единственное объяснение...
        что-то настолько отчаялось в поисках каких-то специфичных знаний,
        что почти разорвало её на части, не заботясь об ущербе
        думаете, что лазутчик бы...?
    
    sourceless
        the weight of the thoughtspace shifts, and you feel attention upon your presence.
        it is only now that they have noticed you.
            EXEC::specialCam("e_c_isabel_attention")
    
    council
        oh, hello, dear interloper!
    
    sourceless
        you feel isabel's gaze. it grasps at your presence, like she's trying to pry at your thoughts.
        but that's not how this works.
    
    self
        you're talking about the interviewer
        i know what did it
____SHOWIF::"ozo__council-velzie"
        it was the entity i told you about
____SHOWIF::["ozo__council-velzie", false]
        an entity i think is named velzie
____END
        i watched it tear apart the entire thoughtspace
        it was trying to get the thoughtforms to tell me something
        something about a meteorite
    
    council
        fascinating...
    
    isabel
        это сходится с моими находками
        ущерб выглядит непредумышленным,
        но он был нанесён чем-то, что явно не имеет представление о нашем мире
        или, по крайней мере, имеет неполное...
        лазутчик, ты должен быть осторожен
        не знаю, чем именно является велзи, но ты имеешь дело явно не с обыкновенной пробудившейся мыслеформой
    
    council
        perhaps it is one of the lost components?
        we know that the great organs of the cyst once acted like small worlds of their own
        if one were to melt and merge with ours, it could easily have powers beyond what any of us may conceive
        still, this is merely conjecture... keep us informed, dear interloper!
        now, all that said--did you wish to speak with us?    

    RESPONSES::self
        yes<+>CHANGE::council
            EXEC::specialCam(false);env.jokzi.councilToggle()
            HIDEREAD::
        not really<+>END

END::env.jokzi.toggleSlow(false);specialCam(false)
`)

env.localization.page['ozo'].dialogues["e_c_fairy"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true)
    
    fairy
        ...a beast to rival my own ferocity, surely!
    
    council
        yours? never!
    
    fairy
        ahaha!! oh, council, but you should have seen it!
        or, maybe i should pray to velzie that you never do...
        from what i observed, even behind my illusions and at a great distance,
        i could tell it was some sort of enforcer of cohesion!
        so many arms! such size! such precision!!
        the efficiency with which it assembled that broken memory was frightening
        even to me!! how long it has been since i have felt such fear!
        the thought crossed my mind, "i should fight this thing"...
        but if i had drawn closer - it surely would have torn me apart without a thought,
        perhaps without even noticing that i was not just some new resource to place in the repairs!!
        that is just how it moved! scary!
    
    council
        a concerning development... thank you for this news, dear fairy
        you were wise not to strike it
        the tyrant may or may not be aware that we still remain, we are not sure...
        but if they could trace an attack to us, they surely would send this beast
        we have no doubts that they still see us as no more than a tumor
        though--why has this new weapon not found us, if it is as active as you say?
    
    fairy
        i am working very hard to keep your outer shell disguised!
        plus, with how close to the uncosm we stay, it surely cannot even see us!
    
    council
        perhaps...
        or perhaps our dream of unity is not so distant?
    
    sourceless
        the fairy shifts within the thoughtspace, and the change in balance brings attention to your presence.
            EXEC::specialCam("e_c_fairy_attention")
    
    fairy
        ah!! interloper!
        i nearly bit you! ahahaha!
        this new creature has me on edge
        council--i have plans! we should at least prepare a defense!
        we will speak of them later, though!
        bye interloper!!
        
    sys
        ATTENTION::'thoughtform activity detected';'resource location altered'
            EXEC::env.jokzi.event.complete()
    
    council
        what would we do without the fairy's watchful eyes?
        dear interloper! did you wish to speak with us?
    
    RESPONSES::self
        yes<+>CHANGE::council
            EXEC::specialCam(false);env.jokzi.councilToggle()
        not really<+>END

END::env.jokzi.toggleSlow(false);specialCam(false)
`)

env.localization.page['ozo'].dialogues["e_f_geli"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true)
        
    bsteli::happy
        ...which is where the 'boat' comes from!
        
    bsteli
        really, all of my knowledge of these exciting bright concepts comes from that strange thoughtform
    
    fairy
        ahaha!! and what knowledge it is!
        my attempts at using bright weaponry in my dreams were always rife with improvisation...
        the way they truly work is even more vicious than my estimations!
    
    bsteli
        yes, i imagine they may even be more effective than valika weaponry!
        though, i do wish i had a memory to compare them to... 
    
    fairy
        still! what fun! what fun!! 
        even within such a rigid structure!
        this violent dream of yours reminds me of the greater θgazes...
        so many others now adhere to such toothless violence,
        like they are afraid of awakening the same old hunger!
        idiots!!
        they all pretend as if we are different now,
        but the only real difference is that they learned to hide it!
        
    bsteli::concern
        ...
    
    fairy
        ah! do not be so bashful!!
        was it not you, who...
    
    bsteli::concern
        ah--ah! interloper!
        
    sourceless
        you feel them fixate upon your presence.
            EXEC::specialCam("e_f_geli_attention")
        
    fairy
        ohh??
        when you do not speak up, it is almost hard to feel you there!
        welcome, interloper!
    
    bsteli::concern
        we were just,
    
    bsteli::happy
        i was just inviting the fairy to come join our dream!
    
    fairy
        i have enough parts to play for now,
        and other dreams to interfere with, hehehe
        but what you have built is very enticing, geli!
        in time, in time!
        already, i feel such cruel plans forming in my mind... ahahaha!!
        
    bsteli::bstrd
        good! GOOD!
    
    bsteli
        ah, but, i should return
        bye!
        
    sys
        ATTENTION::'thoughtform activity detected';'resource location altered'
            EXEC::env.jokzi.event.complete()
    
    fairy
        oh, interloper, interloper!
        to see such dreams of nonstop combat and excitement from geli, of all thoughts...
        a twist in velzie's great plot i could never have predicted!
        delightful! so fresh and new!
        now!!
        did you want to speak about anything?
        
    RESPONSES::self
        yes<+>CHANGE::fairy
            EXEC::specialCam(false)
        not really<+>END

END::env.jokzi.toggleSlow(false);specialCam(false)
`)

env.localization.page['ozo'].dialogues["e_f_stow"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true)
        
    fairy
        ...ah, no no, you must do it like this!

    stowaway
        ...!
    
    sourceless
        you feel a jolt of anxiety in the thoughtspace.
        the stowaway's thoughtform recoils from something you cannot perceive.
    
    fairy
        ahaha, not so nice, is it?? 
        and that was a light one!
        now, here, you try! just like that!!
        
    sourceless
        a similar sensation of discomfort ripples from the fairy.
    
    fairy
        ow!!
        yes! good! perfect!!
        you are a natural, my hollow friend!
    
    sourceless
        you feel the stowaway's attention upon your presence
    
    stowaway
        hollow friend
    
    fairy
        yes, that is... that is right!
        oh! ahahahaha! you mean interloper!!
        interloper, interloper! come closer!
        i was just teaching an important part of our history...
        something you cannot do, but, will prove very useful to our new friend here!!
    
    sourceless
        the stowaway's thoughtform draws closer to your perception.
            EXEC::specialCam("e_f_stowclose")
        it lingers nearby.
    
    stowaway
        ...?
    
    fairy
        oh! haha!!
        silly!!
        no no, you cannot do it to the interloper!
        they are not <em>really</em> here, not like you and me...
        there is nothing to bite!
        and what a shame, right? hehehe
        no, if you want to mess with the interloper, you have to do something else...
    
    self
        like what?
    
    fairy
        secret! secret!!
        now, interloper, did you want to talk???
        
    RESPONSES::self
        yes<+>CHANGE::fairy
            EXEC::specialCam(false)
        not really<+>END

END::env.jokzi.toggleSlow(false);specialCam(false)
`)

env.localization.page['ozo'].dialogues["e_f_effigies"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true);specialCam("e_f_open")
        
    sourceless
        effigies gather around the fairy. 
        something is happening that you cannot perceive.
        but even through your means, the fairy's appearance is different.
        the swirl of colors beneath its face is laid bare, but you can't make out any meaning in them.

    effigy
        wow!!
        coool!!
        is that how that works??
    
    sourceless
        you draw closer in order to better receive the meaning,
        but the tangible attention of these thoughtforms is placed upon you.
    
    effigy
        interloper!!
        interloper interloper!
        hii!!
    
    fairy
        interloper?
        oh!! there you are!
            EXEC::specialCam(false)
    
    self
        what were you doing
    
    fairy
        ahh, they saw my illusions in the corners of one of isabel's stupid dreams,
        and they said they would be quiet about it if i taught them how to do it!
        i am sure these simple little creatures will spill the secret to isabel regardless, but...
        who am i to refuse prodigal tricksters?
        velzie forbid we perform some mischievery in this age!
        ahahaha!!
        
    self
        i just saw a bunch of colors, no knowledge
        is it like a mask?
    
    fairy
        yes, yes, yes,
        but less tangible!
        a mask is hardened, static! easy to see from many sides!
        i must imagine--that is what allows us to give them to you?
        but direct knowledge is much different
        and as i learned in my early talks with you,
        you do not seem to be able to see it...
        what a shame! there is so much i could show you!
        if only you were really here, interloper!!
    
    effigy
        if only! if only!
        you could dream with us too!
        
    fairy
        now!!
        did you want to talk?
        
    RESPONSES::self
        yes<+>CHANGE::fairy
        not really<+>END

END::env.jokzi.toggleSlow(false)
`)

env.localization.page['ozo'].dialogues["e_i_gelistow"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true)
    
    isabel
        ...i have tried my work, but,
        that's the problem, geli
        there isn't actually anything wrong with it...
    
    bsteli
        are you sure?
        i just feel so bad that it has to live like this!
        i do not even know if it understands what is wrong!
    
    stowaway
        what is wrong
            EXEC::specialCam("e_i_stowclose")
        
    effigy
        ahaha!! nothing! nothing!
    
    isabel
        i am sure, geli
            EXEC::specialCam(false)
        when i go to patch any lesions, or replace any broken organs...
        there is just nothing to replace, for what is missing is purely personal
        yes, that's it - it's as if your friend is completely intact, 
        but any organelle that could have held any memory or identity is completely bare
        what would i replace? would i tell it how it should act? who it should be? 
        after all, it has the faculties to learn this all again, unlike my usual subjects
        i can only describe the way it's been hollowed as "surgical"
        when i first realized it, i have to admit, it scared me
        if these "daemons" were ever to escape the embassy and run amok,
        this could happen to <em>everything</em>
        and then what would become of our world?
        even the tyrant is a miniscule parasite in comparison to this threat
    
    bsteli::concern
        ...
    
    isabel
        yes, i think that we...
    
    effigy
        interloper! interloper!
        hi interloper!
    
    isabel
        oh, hello - how long have you been there?
            EXEC::specialCam("e_i_worry")
    
    self
        i know you're worried about the daemons
    
    stowaway
        worried
    
    isabel
        yes, i was just about to propose to geli that we speak to you
        after all, it was you who brought them here
    
    bsteli::concern
        i--!
        i did not tell her that!!
    
    isabel
        your avoidance of the subject is clear enough
        and who else would introduce this new threat but our mysterious interloper?

    self
        i didn't know it worked like this
    
    isabel
        i know you wouldn't have done this out of malice
        for whatever reason you have brought them here,
        it is clear that you <em>must</em> remove them when you no longer need them
        i can't know what will become of the thoughtforms that were made into daemons afterwards,
        but they must not persist with your instruction longer than it's needed
    
    bsteli
        she is right, interloper
        i have seen first hand what they can do, and it is wrong
    
    bsteli::concern
        if even just a few escaped, the damage they could cause is unimaginable
    
    moth
        jesus
        we really need the daemons for any of this to work - just agree with them
    
    self
        i understand
        we'll remove them later
    
    isabel
        thank you
        now, did you need something?
        
    RESPONSES::self
        yes<+>CHANGE::isabel
            EXEC::specialCam(false)
        not really<+>END

END::env.jokzi.toggleSlow(false);specialCam(false)
`)

env.localization.page['ozo'].dialogues["e_i_geli"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true)
    
    bsteli::happy
        ...and the humors allow for such flexibility in approach!
        it all becomes very hard to manage after a while, but...
        until then, it is quite fun!!
        please, you must try it at least once! it is my first new dream!
    
    isabel
        i don't like dreams about violence, geli
        i admire the work you have put in, but it just isn't something i can play a role in
        conflict is fine, some violence is ok, but when it's ceaseless combat...
    
    bsteli
        no no!! it is more nuanced than that!
        it is not just a dream of violence, but of strategy, and exploration!
    
    isabel
        that's it, though--the violence is without meaning
        even the context of the dream is that it is an illusion, within its own story
        but there are no characters for me to connect to - it is disconnected from everything
    
    bsteli
        there are characters!! there are the shells, the interloper, and the voice on the radio!
        plus, the implication of the greater scenario - escaping a tyrant's rule!
    
    bsteli::bstrd
        + JUST WAIT TILL U SEE DA BOAT >%^)
    
    isabel
        ah!
        i really wish you wouldn't do that
    
    bsteli::think
        all right, what if...
        what if we put akizet in it somehow?
    
    bsteli::happy
        maybe it could be a thoughtform of her that is fighting her way out!
        
    bsteli
        imagine the emotion! the worry for the other still-dreaming team members!
        
    isabel
        hmm...
        maybe...
    
    sourceless
        isabel's attention fixes upon your presence
            EXEC::specialCam("e_i_worry")
    
    isabel
        oh, interloper
        welcome
        did you need something?
        
    RESPONSES::self
        yes<+>CHANGE::isabel
            EXEC::specialCam(false)
        not really<+>END

END::env.jokzi.toggleSlow(false);specialCam(false)
`)

env.localization.page['ozo'].dialogues["e_i_fairy"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true)
    
    effigy
        aawaaaawwa!!
    
    fairy
        then where did it come from, huh??
        do you think i am stupid, weeping parasite?
        and you say you never want to see me! ha!
        yet you shake the foundations of our stupid little boundaries!
    
    isabel
        я не знаю, что ещё тебе сказать
        это именно то, чего я хочу - не иметь к тебе никакого отношения
        это мог быть кто угодно
    
    fairy
        NO!!
        who else cares about akizet! nobody! 
        nobody!! stupid!
        only you still weep for that idiotic murderer!
        velzie above has forgotten her name!
    
    sourceless
        the thoughtspace render ripples with anger and unease.
        a fight beyond words is ensuing beyond your ability to perceive.
    
    effigy
        stop stop!!
    
    isabel
        достаточно
        я не вешала вывеску олтазни в твоём бестолковом сне
        что мне с этого? думаешь, мне хочется донимать тебя?
        думать о тебе - последнее, чего я хочу
        я уж скорее решу грезить о романе с тираном
        и к тому же - нравится тебе это или нет, // АА КАКОЙ ЗДЕСЬ ЗНАК ПОСТАВИТЬ я спать
        но ты не можешь избежать нашего прошлого, акизет - наш остов
        во всяком случае, ты могла повесить её в своей грёзе случайно
        теперь,
        тебе пора уйти.
    
    fairy
        leave? where? back to my defiled dream?
        excuses! excuses!! provocation!!
        i demand that <em>you</em> remove the banner! 
        or the council will hear of this!
    
    sourceless
        again, tension rises, but your presence seems to dampen its effects.
        they notice you.
    
    fairy
        oh! interloper!
        ahahaha! hi interloper!
            EXEC::specialCam("e_i_fairy")
    
    isabel
        здравствуй, лазутчик...
    
    fairy
        were you going to talk to this freak?
        i will leave you to it! bye!
        but this is not over...
    
    sys
        ATTENTION::'thoughtform activity detected';'resource location altered'
            EXEC::env.jokzi.event.complete()
    
    isabel
        ...
    
    self
        what was that about?
    
    isabel
        не обращай внимания
        просто ещё один пример бессмысленных феиных перепалок
        всем известно, что почти любое упоминание акизет в её снах провоцирует нападки...
        но в этот раз, как мне кажется, это была просто попытка вывести меня из себя
        а теперь, тебе что-то требуется?
        
    RESPONSES::self
        yes<+>CHANGE::isabel
            EXEC::specialCam(false)
        not really<+>END

END::env.jokzi.toggleSlow(false);specialCam(false)

`)
