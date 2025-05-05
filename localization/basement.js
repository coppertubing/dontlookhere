env.localization.page['fbx'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "about this job": "об этой работе",

        "DENDRITIC CYST": "ДЕНДРИТНАЯ ЦИСТА",
        "touch": "потрогать",
        "lift": "поднять",
        "the notes I got say that there were apparently a ton of these on the ship": "в записях говорилось, что на корабле вот таких вот была просто куча",
        "all sorts of sizes too": "причём самых разных размеров",
        "but most were too heavy to retrieve... so we just got this small one": "но большинство были слишком тяжёлыми... так что захватили только одну маленькую",
        "the dendritic cyst has a rigid outer shell. it's unlikely that there's any way to connect to it": "у дендритной цисты жёсткая внешняя оболочка. не похоже, что к ней можно подключиться",
        "the dendritic cyst is surprisingly heavy. turning it in your hands produces a cascade of metallic clinking noises from within. when you set it back down, its tendrils find a new orientation to support itself on the table": "дендритная циста неожиданно тяжела. при повороте изнутри раздаётся каскад звенящих металлических звуков. когда ты ставишь её обратно, её отростки находят новый способ удержаться на столе",

        "FRACTALLINE CYST": "ФРАКТАЛЬНАЯ ЦИСТА", 
        "nobody knows what this one is.. pretty sure it's dead though": "никто не знает, что именно это такое.. но думаю она дохлая",
        "the fractalline cyst's outer shell is slimy and has some yield. if you squeezed it enough, it would probably turn to sludge... best to just leave this one alone": "оболочка фрактальной цисты склизкая и упругая. если ты сожмёшь её сильнее, она наверняка лопнет... лучше оставить её в покое",

        "CYST": "ЦИСТА", 
        "so this is the mystery piece": "а вот и гость программы",
        "it's in bizarrely good condition considering it was at the bottom of the ocean for however long it's been since, y'know": "в поразительно хорошем состоянии, учитывая сколько она буквально провалялась на дне океана",
        "no clue what it is aside from some similar internal structure to network cysts we've found before": "без малейшего понятия что она делает, но её внутренности напоминают сетевые цисты которые мы находили",
        "the cyst has a solid outer shell. a few circular points near the top are less firm than the rest. in your experience, these are usually connection points. you can definitely scan this point more thoroughly.": "у цисты твёрдая внешняя оболочка, однако несколько круглых точек наверху менее плотные чем всё остальное. в твоём опыте это обычно точки соединения. ты определённо можешь просканировать их более тщательно.",
        "depth scan": "подробное сканирование",
        "ANALYSIS::'valid nerve point';'connection enabled'": "АНАЛИЗ::'действительная нервная точка';'доступно подключение'",
        "::CORRUCYSTIC ENTITY": "`::КОРРУЦИСТИЧЕСКАЯ СУЩНОСТЬ",
        "::NO FUNCTION SIGNATURE": "::НЕТ ПОДПИСИ ФУКНЦИИ",
        "::CONNECTIVE MEMBRANE EXPOSED": "::ОБНАЖЁННАЯ СОЕДИНИТЕЛЬНАЯ МЕМБРАНА",

        "CYSTIC COLUMN": "ЦИСТОЗНАЯ КОЛОННА", 

        "CONNECTION POINT": "ТОЧКА ПОДКЛЮЧЕНИЯ",

        "attempt connection": "попытаться подключиться",
        "CONNECTION_POINT_LOCATED": "ОБНАРУЖЕНА_ТОЧКА_ПОДКЛЮЧЕНИЯ",
        "__COMMENCING__": "__ЗАПУСК_ПРОЦЕДУРЫ__",   
        
        "plastic box": "пластиковый ящик",
        "use to feed column": "покормить колонну",
        "empty plastic box": "пустой пластиковый ящик",

        "pistol": "пистолет",
        "kill dendritic cyst and feed column": "убить дендритную цисту и покормить колонну",

        "hey buddy": "эй дружище",
        "welcome back": "добро пожаловать",
        "you ready to feed this thing?": "ну что, накормим эту штуку?",
        "haven't heard back on the request yet": "со мной ещё не связались по поводу запроса",
        "so, still killing time here": "так что пока убиваем время"
    },
    entityDescriptions: {
        "dendritic cyst": `::КОРРУЦИСТИЧЕСКАЯ СУЩНОСТЬ
::ПОДПИСЬ ФУКНЦИИ: КОНТЕЙНЕР
::НЕТ СОЕДИНИТЕЛЬНОЙ ТКАНИ`,
        "fractalline cyst": `::КОРРУЦИСТИЧЕСКАЯ СУЩНОСТЬ
::ПОВРЕЖДЁННАЯ ПОДПИСЬ ФУКНЦИИ
::НЕТ СОЕДИНИТЕЛЬНОЙ ТКАНИ`,
        "cystic column": `::КОРРУЦИСТИЧЕСКАЯ СУЩНОСТЬ
::ПОДПИСЬ ФУКНЦИИ: ОБСЛУЖИВАНИЕ КОРРУЦИСТЫ
::НЕТ СОЕДИНИТЕЛЬНОЙ ТКАНИ`,
        "сyst": `::КОРРУЦИСТИЧЕСКАЯ СУЩНОСТЬ
::НЕТ ПОДПИСИ ФУКНЦИИ
::ОБНАЖЁННАЯ СОЕДИНИТЕЛЬНАЯ МЕМБРАНА`,
        "циста": `::КОРРУЦИСТИЧЕСКАЯ СУЩНОСТЬ
::НЕТ ПОДПИСИ ФУКНЦИИ
::ОБНАЖЁННАЯ СОЕДИНИТЕЛЬНАЯ МЕМБРАНА`,
        "connection point": `::КОМПОНЕНТ КОРРУЦИСТИЧЕСКОЙ СУЩНОСТИ
::ДЕЙСТВИТЕЛЬНАЯ ТОЧКА СОЕДИНЕНИЯ`,
        "plastic box": `::СИНТЕТИЧЕСКИЙ КОНТЕЙНЕР
::СОДЕРЖИТ ИНЕРТНЫЙ МЕТАЛЛ`,
        "empty plastic box": `::СИНТЕТИЧЕСКИЙ КОНТЕЙНЕР
::ПУСТОЙ`,
        "pistol": `::ПНЕВМАТИЧЕСКИЙ ПИСТОЛЕТ С ВЫДВИГАЮЩИМСЯ УДАРНЫМ СТЕРЖНЕМ
::МОДЕЛЬ 2052 Г.Е.Т.
::ОБНАРУЖЕНЫ НЕЗАКОННЫЕ МОДИФИКАЦИИ`,
    }
}

// - DIALOGUES - //


env.localization.page['fbx'].dialogues["index"] = generateDialogueObject(`
start 
    moth
        эй, дружище, добро пожаловать 
        у меня были сомнения, что ты появишься на такой мелкий улов
        в последнее время находят столько кораблекрушений
        в любом случае сейчас я всё запущу, можешь пока осмотреться
        
    sourceless
        декодирующие машины включаются, бросая свет на паутину проводов.
            EXEC::document.querySelectorAll('.backwall').forEach(e=>e.classList.add('active'))
        
    RESPONSES::self
        что это<+>whatis
        сесть<+>sit
            SHOWIF::["PAGE!!intrositting", false]
            EXEC::change('PAGE!!intrositting', true)

whatis
    self
        что это?
    moth
        находка с обескового крушения возле новой зеландии
        в записях сказали, почти всё расплавилось, что немного странно...
        во всяком случае... главная часть это вот эта большая
        пьедесталы обычно означают «важно», но этот непомеченный
        алекс сделал базовый скан, сказал напоминает сетевой узел
        мы даже не знаем наверняка, примет ли оно мыслекол
        ну, тебе платят так или иначе, так что... пробуй
        
    RESPONSES::self
        сесть<+>sit
            SHOWIF::["PAGE!!intrositting", false]
            EXEC::change('PAGE!!intrositting', true)
        активировать мыслекол<+>END
            SHOWIF::"PAGE!!intrositting"
        
sit
    sourceless
        металлический стул царапает бетон. ты садишься.
            EXEC::env.introSit()
            WAIT::3500

    sourceless
        сиденье холодное и неудобное. свет от твоего защитного снаряжения рассеивается в перламутровых цистах.
        
    moth
        как по старинке - мыслекол на готове

    RESPONSES::self
        что это<+>whatis
            SHOWONCE::
        активировать мыслекол<+>END
        
END::env.enableSpikeCursor();MUI('deprohibit')
`)
env.localization.page['fbx'].dialogues["depthrecovery"] = generateDialogueObject(` 
start
    sourceless quiet
        острая боль пронзает твой череп. твой мыслекол отдёргивается от цисты.
            WAIT::3000

    sys
        ВНИМАНИЕ::'аварийное отключение завершено'
        АНАЛИЗ::'минимальное повреждение соединителя';'минимальное нервное воздействие'
            EXEC::document.querySelector('#connection-overlay').classList.add('fade');setTimeout(()=>document.querySelector('#connection-overlay').classList.remove('show'),3000)
    
    moth
        с тобой всё в порядке?
        о, бля
    
    sourceless
        моль судорожно выдирает провода из дымящегося процессора. в комнате пахнет жареной электроникой.

    moth
        господи боже
        чел, твой мыслекол тебе жизнь только что спас
        ну не похоже, что эта штука пыталась тебя прям убить, но чёрт только взгляни на это
        я ограничу разветвитель сигнала на случай если такое опять произойдёт
    
    RESPONSES::self
        что теперь?<+>whatnow_lk
            SHOWIF::[["hub__funfriend-fuelthanks", false],["exm|dullvessel|container", false]]
        что теперь?<+>whatnow_lk
            SHOWIF::[["hub__funfriend-fuelthanks", false],["exm|dullvessel|container", true]]
        что теперь?<+>whatnow_mk
            SHOWIF::[["hub__funfriend-fuelthanks", true],["exm|dullvessel|container", false]]
        что теперь?<+>whatnow_hk
            SHOWIF::[["hub__funfriend-fuelthanks"],["exm|dullvessel|container"]]

whatnow_lk
    self
        а что теперь?

    moth
        что ж...
        нам нужно починить эту штуку. просто представь что мы могли бы в ней найти, серьёзно
        вот только одна проблемка...
        всё, что сюда поступает, рано или поздно умирает тк мы не знаем как поддерживать жизнь корру
        и не то чтобы мы могли бы спросить совета у обесков          
        похоже, что на сейчас лучший вариант - переподключиться и найти способ сохранить цисту в живых... 
        не забывай насколько долго эта штука продержалась на дне океана, там должно быть хоть что-то полезное
        так что забирайся обратно и осмотрись повнимательнее... в худшем случае мы просто добудем больше данных
        звучит хорошо?

    RESPONSES::self
        что насчёт той сущности?<+>entity
        звучит хорошо<+>END

whatnow_mk
    self
        а что теперь?

    moth
        что ж...
        та управляющая системой штука, развледруг - это наш ключ к обслуживанию и восстановлению этой кисты
        а нам нужно починить вот это всё. мы могли бы СТОЛЬКО всего узнать, серьёзно
        у нас никогда не выходило поддерживать корруцистозную технику, не говоря уже о её починке
        ток представь если мы с тобой раскроем секрет сохранения жизни корру, может они наконец переселят меня из подвала
        но короче--мой заказ на, типа, какие-нибудь там медные трубки уже получили
        не самый странный заказ из нашего отдела, веришь или нет
        так что нам нужно немного подождать пока его не доставят
        звучит хорошо?

    RESPONSES::self
        что насчёт той сущности?<+>entity
        звучит хорошо<+>END

whatnow_hk
    self
        а что теперь?

    moth
        что ж...
        очевидно нам нужно починить эту штуку. мы могли бы СТОЛЬКО всего узнать, серьёзно
        у нас никогда не выходило поддерживать корруцистозную технику, не говоря уже о её починке
        ток представь что мы могли бы сделать с такого рода находкой, может они бы наконец переселили меня из подвала
        но согласно этому развледругу, нам нужно дать колонне немного металла, и это по всей видимости будет питать корруцисту
        ...и я подозреваю что наш контейнер - один из тех что на корабле акизет, так что в нём наверняка припасено что-нибудь что мы можем использовать
        я просто не совсем понимаю как его открыть если не ломать его
        сделай одолжение - переподключись и спроси об этом у развледруга, может у него будет предложение

    RESPONSES::self
        что насчёт той сущности?<+>entity
        звучит хорошо<+>END

entity
    self
        что насчёт той сущности, которая меня выгнала?

    moth
        о, э
        как-то бестактно вышло с моей стороны, извини
        на этот раз мне удалось отследить её речь с помощью прямого доступа к потоку
        ну мы всё слышали - убивать тебя не хочет
        на самом деле выживание этой штуки зависит от нас, и судя по всему оно <em>хочет</em> выжить
        может быть другого способа выкинуть тебя из того мыслепространства не было
        которое, как я полагаю, оно пока будет держать в качестве преимущества
        но слушай, не беспокойся об этом, я слежу за всей операцией
        если что-либо подобное повторится, я позабочусь о том чтобы с тобой всё было в порядке
    
    RESPONSES::self
        хорошо<+>END

END::flash(true);setTimeout(()=>{content.classList.remove('ep0-epi');change('ep0_epilogue', 'started');flash(false)}, 1000)
`)
env.localization.page['fbx'].dialogues["ep1feed"] = generateDialogueObject(` 
start
    moth
        эй дружище, как раз вовремя, смотри что только что пришло
            SHOWIF::[["TEMP!!sat", false]]
        эй, смотри что только что пришло
            SHOWIF::[["TEMP!!sat"]]

    sourceless
        MOTH HOLDS UP A JINGLING PLASTIC CONTAINER FILLED WITH SMALL COPPER TUBES, CUT TO A VERY SHORT LENGTH
        IT IS SET ON THE TABLE, THE FRACTALLINE CYST REMOVED TO MAKE SPACE
            EXEC::content.classList.add('showcopper')

    moth
        since i'm pretty sure this one is dead, i'm just gonna...
    
    sourceless
        THE FRACTALLINE CYST IS DELIVERED INTO A BIOHAZARD BIN NEARBY
    
    moth
        anyway - ready to feed a corrucyst?
            SHOWIF::[["ep0_epilogue", "started"]]

        иии!
            SHOWIF::[["ep0_epilogue", "done"]]

    sourceless
        MOTH RAISES, THEN LEAVES A CYLINDRICAL GUN NEAR THE DENDRITIC CYST
            SHOWIF::[["ep0_epilogue", "done"]]
            EXEC::content.classList.add('showgun')
    
    moth
        my request for a gun kinda stirred up r&d, because obviously
            SHOWIF::[["ep0_epilogue", "done"]]
        but after i explained it was to kill a corrucystic container, they said they had just the thing
            SHOWIF::[["ep0_epilogue", "done"]]
        this is apparently some kind of cattle killing gun that they repurposed to decommission cystic tech
            SHOWIF::[["ep0_epilogue", "done"]]
        no projectile, it just propels out a short spike at high speeds, i think it uses some kind of electromagnetic propulsion or something
            SHOWIF::[["ep0_epilogue", "done"]]
        anyway, i know what you're thinking - why both?
            SHOWIF::[["ep0_epilogue", "done"]]
        simple - i completely forgot to cancel the copper order, so, we got both of them.
            SHOWIF::[["ep0_epilogue", "done"]]
        so we could go either route here, either use the copper, or kill the container and use akizet's 'processed metals'
            SHOWIF::[["ep0_epilogue", "done"]]
        personally i'd go with the copper, cause i don't know what the container will do
            SHOWIF::[["ep0_epilogue", "done"]]
        but... you're in the hot seat, so it's your call
            SHOWIF::[["ep0_epilogue", "done"]]

    RESPONSES::self
        got it<+>END
        
END::change('ep1_showmaterials', check('ep0_epilogue') == 'done' ? 'both' : 'copper')
`)
env.localization.page['fbx'].dialogues["ep1feed_copper"] = generateDialogueObject(` 
start
    self
        let's do this
            SHOWIF::[["ep0_epilogue", "started"]]
        let's go with the copper        
            SHOWIF::[["ep0_epilogue", "done"]]

    sourceless
        YOU PULL THE PLASTIC CONTAINER CLOSER AND UNCLASP THE LID
        THE COPPER RODS GLIMMER IN THE FOCUSED LIGHT

    moth
        all right!
        funfriend said we have to feed it to the pillar, and it takes care of the rest
        soo i guess we just dump it in? it looks like the pit is big enough to hold pretty much all of it

    RESPONSES::self
        move the cyst out of the way<+>move
            EXEC::env.spikeMoveLoopPaused = true;body.classList.add('prepgrab');document.querySelector('.cursor').id = "cursor-upper-left"
    
move
    sourceless
        YOU MANEUVER YOUR MINDSPIKE AND EXTEND ITS UTILITY CLAWS TO CLASP AROUND THE CYST
            EXEC::body.classList.add('cystgrab')
        THE CYSTIC GLASS OF ITS SKIN YIELDS SLIGHTLY AND PERMITS A GOOD GRASP
        YOU PULL, AND THOUGH IT HAS A MAGNETIC ATTRACTION TO ITS POSITION OVER THE COLUMN, IT IS EASILY REMOVED
            EXEC::body.classList.add('cystlift')
        
    moth
        nice, don't grip it too hard 

    RESPONSES::self
        dump in the copper<+>dump
            EXEC::body.classList.add('pourcopper')

dump
    sourceless
        YOU ANGLE THE CONTAINER DIAGONALLY AND CAREFULLY SHAKE THE METAL ROD IN SMALL BATCHES
        THEY FILL THE COLUMN'S CAVITY WITH METALLIC CLINKS, AND AN OPAQUE, MERCURY-LIKE LIQUID SLOWLY RISES OVER THE METAL
        IT ROILS AND WRITHES AROUND THE COPPER RODS LIKE IT'S ALIVE
        THE FANS OF THE CHAMBER GROW LOUDER FOLLOWING A FEW KEYTAPS FROM MOTH
            EXEC::body.classList.add('pourcopper')
        
    moth
        just in case

    sourceless
        YOU SET THE EMPTY CONTAINER OUT OF THE WAY
            EXEC::body.classList.add('emptycopper');body.classList.remove('pourcopper', 'cystlift')

    RESPONSES::self
        is it done?<+>done

done
    self
        Is it done?
            EXEC::body.classList.remove('cystgrab');document.querySelector('.cursor').style.transform = "translate(0, 50vh)"
    
    moth
        as if i know anything about this, lol
        looks like it's working though
        how about you reconnect and check in with our friend

    RESPONSES::self
        all right<+>END

END::env.spikeMoveLoopPaused = false;body.classList.remove('prepgrab');;change('ep1_fed', 'copper')
`)
env.localization.page['fbx'].dialogues["ep1feed_container"] = generateDialogueObject(` 
start
    sourceless
        YOU GRASP THE CATTLE GUN AND AIM IT AWAY, EXPERIMENTALLY PULLING THE TRIGGER
        A SPIKE EJECTS FROM THE TIP IN THE BLINK OF AN EYE WITH A LOUD HISS, THEN RECEDES
        YOU FEEL SOMETHING RUMBLE INSIDE THE GUN AS IT RESETS

    self
        All right
        Let's kill this thing

    moth
        no need to say it like a psycho dude lmao

    RESPONSES::self
        move the cyst out of the way<+>move
            EXEC::env.spikeMoveLoopPaused = true;body.classList.add('prepgrab');document.querySelector('.cursor').id = "cursor-upper-left"
    
move
    sourceless
        YOU MANEUVER YOUR MINDSPIKE AND EXTEND ITS UTILITY CLAWS TO CLASP AROUND THE CYST
            EXEC::body.classList.add('cystgrab')
        THE CYSTIC GLASS OF ITS SKIN YIELDS SLIGHTLY AND PERMITS A GOOD GRASP
        YOU PULL, AND THOUGH IT HAS A MAGNETIC ATTRACTION TO ITS POSITION OVER THE COLUMN, IT IS EASILY REMOVED
            EXEC::body.classList.add('cystlift', 'containerseq')
        
    moth
        nice, don't grip it too hard 

    RESPONSES::self
        get the container<+>grab

grab
    sourceless
        YOU FETCH THE CORRUCYSTIC CONTAINER AND LIFT IT FROM THE TABLE, HOLDING IT UPSIDE-DOWN
            WAIT::1000
            EXEC::body.classList.add('containerfade');setTimeout(()=>body.classList.add('containercenter'), 400)
        ITS DENDRITIC TENDRILS WAVE IN THE AIR LAZILY
    
    moth
        so funfriend said that if you hit the base of it, that it'll instantly die
        and if you don't,
        it will... what did it say again?
        'respond violently to trauma'
        well it couldn't be that bad, it's not that big and your suit is pretty thick
        but... 
        well, if you have to throw it, don't throw it towards my machines

    RESPONSES::self
        kill it<+>kill

kill
    sourceless
        YOU ANGLE THE CATTLE GUN BETWEEN THE CYST'S SUPPORTIVE TENDRILS
            EXEC::body.classList.add('containeraim')
        A FEW ATTACH TO THE SIDES OF THE WEAPON, TESTING ITS VIABILITY AS A CONNECTION, BUT LET IT PASS
        THE BARREL SOON TAPS AGAINST THE GLASSY UNDERSIDE, AND SO YOU SQUEEZE THE TRIGGER
        YOU FEEL A SURPRISING JOLT IN BOTH HANDS. A CRACK RINGS IN THE ROOM, THE CYST'S TENDRILS THRASHING
            WAIT::2000
            EXEC::env.intro.glass.rate(1.25);env.intro.glass.play();flash(true);setTimeout(()=>body.classList.add('containershot'), 200);setTimeout(()=>flash(false), 400)
        THEY QUICKLY FALL LIMP AND START TO MELT
            EXEC::body.classList.remove('containershot')
        YOU DROP THE ENTIRE THING IN THE COLUMN'S CAVITY BEFORE IT COLLAPSES
            EXEC::body.classList.add('containerdrop');body.classList.remove('containerfade')
        THERE IS A GLIMMER OF GOLD-COLORED METAL, BUT IT DISAPPEARS BENEATH THE SLUDGIFIED CONTAINER
            EXEC::body.classList.remove('containeraim')
        YOU LOWER THE CYST AND SET THE GUN DOWN
            EXEC::body.classList.remove('cystlift', 'containercenter')
    
    moth
        wow
        quick thinking there, that could have been really messy if it just melted everywhere
        probably hazardous too
            EXEC::body.classList.remove('cystgrab');document.querySelector('.cursor').style.transform = "translate(0, 50vh)"
        and i think that's it... not as bad as i thought it'd be
        how about you reconnect and check in with funfriend?
        
    RESPONSES::self
        all right<+>END

END::env.spikeMoveLoopPaused = false;body.classList.remove('prepgrab', 'containerseq');change('ep1_fed', 'container')
`)
env.localization.page['fbx'].dialogues["ep2intro"] = generateDialogueObject(` 
start
    moth
        hey buddy!
        hope you're doin ok
        let's get right into it
        i was just looking at the logs for last night, after you left...
        lots of surface thoughtform activity - the kind you can access
        i think funfriend fixed up something big
        go talk to it, see what's up!

    RESPONSES::self
        ok<+>END
`)
env.localization.page['fbx'].dialogues["ep3intro"] = generateDialogueObject(` 
start
    moth
        hey buddy, good to see you
        i was just checking the activity over the last night...
        this is pretty similar to what i saw when funfriend fixed the first part of the collapse
        i'll bet the next part of it is ready to view
        judging by the amount of activity, this is probably a larger one
        so... sorry if you still think the framing device sucks lol
            SHOWIF::'mth++embassy-gamebad'
        go on in!
        also. i was curious after work the other day
        started looking at old news and video archives from when the collapse happened...
        remember when videos were all on one site? that must have been nice
        anyway--didn't find anything too groundbreaking
        just had some observations if you want to hear em when you got a minute
        but right now, we gotta get you back into it
        i know it's only been a few days, but people are starting to ask questions about how this one is going
        i've been stalling, but... you know
        not sure how long that's going to work, whether it's a matter of weeks or even days
        what we have is probably already a bombshell,
        but i don't want to turn this thing in until it's nuclear

    RESPONSES::self
        ok...<+>END
`)
env.localization.page['fbx'].dialogues["depthrecovery2"] = generateDialogueObject(` 
start
    sourceless quiet
        your eyes refocus as your mindspike recoils
            WAIT::3000
        боль разливается по твоему позвоночнику

    sys
        ВНИМАНИЕ::'аварийное отключение завершено'
        АНАЛИЗ::'нет повреждений соединителя';'минимальное нервное воздействие'
            EXEC::document.querySelector('#connection-overlay').classList.add('fade');setTimeout(()=>document.querySelector('#connection-overlay').classList.remove('show'),3000)

    moth
        thank god
        looks like the limits i set up kept that in check
        what happened, dude?
        you were moving around in completely unreadable nonsense on my log
        you tried to initiate movement to a new thoughtspace, then...
        then it just... exploded?
    
    self
        i found something 
        tried to enter it, but velzie stopped me
        just like the last time this happened
        but this was different
        velzie was surprised i was there
        it seemed desperate to stop something from happening

    moth
        didn't it lead you to whatever this was last time?
        was it the same thing?

    self
        looked similar but different

    moth
        well, comparing the logs, 
        it looks like it's at least part of the same thing
        but the data that hit you is way different...
        last time it was just noise, probably to disrupt your connection
        but this time it was structured somehow
        not enough to make sense of, but...
        i think you nearly connected to whatever it was
        still, maybe next time you find some giant incoherent thing,
        don't just blindly enter it, ok?
        the throttling we set up protected you this time
        but it's not perfect, and some of it still hit your brain
        so like... take it easy for a bit
    
    RESPONSES::self
        ok<+>END
    
END::flash(true);setTimeout(()=>{content.classList.remove('ep0-epi');env.enableSpikeCursor();flash(false)}, 1000)
`)
env.localization.page['fbx'].dialogues["ep4intro"] = generateDialogueObject(` 
start
    moth
        ...uh-huh, right
    
    sourceless
        moth paces in the dark, a dark shape held to an ear.
        you receive a welcoming wave that turns into a vague gesture to the central cyst.
    
    moth
        look, we're just trying something new
        there's lots of waiting time, and observation...
        uh-huh...
        strange? like what?
        oh, well... we're still poking around
        there's some promising stuff here and there, but...
        right...
        can it wait for the full report?    
        ...ok, then just send them down once they're ready, we'll process them too
        it's async, you know? we can do more than one
        ...yeah, look, the contractor just got here, so, i need to go
        we can talk about it later
        thanks dude
        yeah, bye

    sourceless
        the call is over. moth sighs.
    
    moth
        hey buddy
        good news first
        i'm pretty sure another part of the cyst is repaired
        probably the next part of the collapse, judging by the activity measurements
        hopefully the last
        because the bad news is, it feels like the upstairs are prying at the door
        i mean, it's not especially rare to take so long on a few corrucystic pieces, but...
        when it happens, that's when they start calling
        so i bought us some time, but, i'm not sure how much
        they just think we're trying some long operation, which...
        you know, isn't a lie
        but we might end up getting more pieces to look over soon
    
    self
        what if they want it back before we're really done?
        before we have communications back?

    moth
        to be honest, that's probably going to happen
        we still have no idea if it's even possible to repair
        but, if things get... 
        i don't know, really down to the wire,
        i've noticed the monitoring on biohazard disposals is really lax
        not saying we do anything, but...
        ...wouldn't be the first time
        look, let's just get started
        if it comes to that, we'll cross that bridge when we get there

    RESPONSES::self
        ok<+>END
`)

env.localization.page["fbx"].dialogues.mthhubresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        где нашли эти цисты?<+>where
        что делать с этим пистолетом<+>gun
            SHOWIF::[["ep1_showmaterials", "both"], ["ep1_fed", true]]
        неважно<+>CHANGE::++moth
            FAKEEND::(назад)
`)
env.localization.page['fbx'].dialogues["mth++fbx"] = generateDialogueObject(`
start
    self
        у меня есть вопрос

    moth
        ага?
    
    RESPOBJ::mthhubresp

gun
    self
        так что, мы просто оставим этот пистолет?

    moth
        о, ну
        знаешь, он может пригодиться
        если честно мне просто не хотелось его ну вот прям щас возвращать лол
        вроде НИОКР он не сильно нужен, им нечасто приходится что-то убивать
        я верну попозже
    
    RESPOBJ::mthhubresp

where
    self
        откуда это всё достали?
    
    moth
        с какого-то крушения на дне океана возле новой зеландии
        и под "возле" я имею в виду, типа, километров так за тыщу от юго-восточного берега
        просто это всё нашли в такой жопе мира что, ну…
        мне показалось, ничего ближе новой зеландии ты не узнаешь
        они считают что оно отплыло достаточно далеко от того места, где изначально упало
        по их оценкам, провалялось там внизу лет 20-30 если не больше

    RESPOBJ::mthhubresp
`)