/*
    cor-RU - a russian localization mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/aquarium.js
    localization for /local/city/aquarium

    progress: nothin as of 12.10.2025
*/

env.localization.page['aquarium'].localization.page['aquarium'] = {dialogues: {},
    definitions: {}, 
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
        /*sourceless*/ 'did i say something to imply that?': "?",
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
        disguise body?<+>stealthbody
            SHOWIF::"aqua__meetup"

        nevermind<+>CHANGE::++moth
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
        so the obesk actually did use disguise bodies
        and it sounds like they were common
        wasn't that just a conspiracy theory?

    moth
        yeah... yeah that's how it was spun
        it's always been super plausible though. i've been a believer personally
        they had to learn our languages somehow
        and i really do think they're still walking among us
        they've probably only gotten better at blending in since then

    self
        ладно
        ты куу?

    moth
        если бы

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
        так что я сижу, моя замаскированная фигура в облегании нежного холодного дождя
            EXEC::setCam({x: 4, y: 8.5, rotation: 0});playerMoveTo(4, 8, "left")
        я могла бы заняться организационной работой пока здесь, она всегда найдётся, но...
        дождь, туман, они так знакомы
        словно грёза о простом прошлом, верхом на вейльке, на охоте
        без груза обязательств или сумасшествия тайного конфликта на моём уме...
        царит мир
        и я дозволяю себе чувства, какие бы испытывал личиночный обеск
        this shifting body is not designed for sensory accuracy, but still, echoes are felt
        i shiver, huddle into myself, pull this false cloth coat tighter
        not that it makes a difference--it is a part of the body, carefully-shaped corrucystic flesh,
        and so the rain slides off as if it were made of metal
        i raise a claw--or, a cousinly hand, i suppose
        watching the droplets run off it unnaturally, shining in the fiery light from the stalk behind me
        this moment, meaningless in itself, instills such a longing to flee
        not from this night, this one moment of peace, but from the conspiracy suffocating my mindcore
        the path i tread to this moment has disappeared behind me, and i am lost in the complexity of it all
        entertaining the team, disappearing to work with the cousins, treading upon a thin branch
        even now, the storm is continuing our efforts tirelessly, its periodic updates consistently bearing progress
        so perhaps it is not a path i walk, but instead a constant, hastening tumble that velzie has pushed me into
        it all feels so far beyond my claws. there is nothing for me to grasp
        but maybe there is still time to change the course... 
        что-нибудь...
        ...
    
    sleepybel
        Аки?
            EXEC::content.classList.add("quickabel")

    sourceless
        a voice from behind startles me, accompanied with a pattering of droplets upon stretched fabric
            EXEC::setCam({x: 4, y: 8.5, rotation: 70});
            WAIT::1000
            THEN::content.classList.remove("hideabel");content.classList.add("standobel")
        isabel, carrying a thin half-dome to shield herself from the rain
        сколько времени минуло?
        she laughs a little, taking some steps closer

    sleepybel
        Ты что, просто--сидишь под дождём?
        Тебе разве не неприятно?
        Пожалуй стоило предупредить тебя захватить зонт, хаха.
            EXEC::content.classList.remove("quickabel")
    
    sourceless
        when i turn up to face her, i forget that this body adapts receptor movements into facial expressions
            EXEC::setCam({x: 4, y: 8.5, rotation: 70, offsetCamera: "rotateX(20deg)", height: 1.75});content.classList.remove("standobel");content.classList.add("centerbel")
        and so the joy in her face fades into concern, seeing mine...
        which i only now realize must be some distant despair
        she sits quickly beside me, the rain-shield now over both of us
    
    sleepybel
        Ох... Ты в порядке?
        Что-то случилось?
    
    sourceless
        with a quick shake of my head, i center myself, ridding myself of this haunting for now
        seeing her is enough to bring a smile
        
    akizet
        yes! yes, apologies,
        it is so good to see you, my friend
        ...ah, i suppose, like you say, i was 'thinking about work...'
    
    sleepybel
        Всё так же тяжко, да?
        Понимаю.
        То есть... Хаха, не совсем. Навряд ли всё точно так же, но..
        Что ж, хватит беспокоиться об этом, хорошо?
        Этой ночью мы обе собираемся позабыть обо всём остальном.
    
    sourceless
        i laugh and nod in agreement--already, there is a sense of freedom in that shared void
        simultaneously, she pinches at the cloth of my coat, confused
    
    sleepybel
        И как ты только не промокла?
        А, точно, это... Да, ага.
        Ладно, хорошо. Я бы не хотела зайти с зонтом,
        Пока ты волочишься позади меня так, словно я только что оставила тебя под дождём.
    
    akizet
        <span definition="INHERITED CONTEXT::'being intentionally obtuse'">i do not see the problem</span>
    
    sourceless
        she chuckles and stands, pulling me to my feet alongside her
            EXEC::setCam({x: 4, y: 8, rotation: 90});playerMoveTo(4, 8, "left")

    sleepybel
        Ага.
        Окей, так, Ди ждёт нас около служебного входа, через него мы и пройдём.
        Разумеется, там будет немного странно - аквариум обычно уже закрыт к этому времени,
        но до главного ночного мероприятия всё равно ещё около часа, и...
        И все другие выставки всё ещё открыты!
        Ещё она сказала, что ресторан тоже будет открыт.
        Вообще, он для работников на сверхурочных, но она предупредила их, что мы придём, итак...
        Мы сможем взглянуть на всё <em>и-и</em> немного перекусить.
        Я была не уверена, как всё пройдёт, но в итоге нам очень повезло.
    
    akizet
        is that different from how the habitat usually operates?
    
    sleepybel
        Ну, они обычно не открыты по ночам. И обычно они не впускают людей во время приготовлений.
        Поэтому вся разница в том, что там будем считай что только мы вдвоём.
        Вообще, обычно там довольно много людей, так что этот раз должен быть особенным...
        Ну же, пошли!

    RESPONSES::akizet
        set out<+>END
            EXEC::change("PAGE!!metabel", true);refreshStage({noFlash: true});content.classList.remove("slowcam", "centerbel", "quickabel");setCam()

SKIP::change("PAGE!!metabel", true);refreshStage({noFlash: true});content.classList.remove("centerbel", "quickabel", "slowcam", "standobel");setCam()
`)

env.localization.page['aquarium'].dialogues["entry"] = generateDialogueObject(`
start
    sourceless
        the entry chamber of this false habitat halts my movement
            EXEC::ratween(env.localization.page['aquarium'].bgm, 0.8)
        for i am gripped by similar visions of the past
        oltazni's central social chamber, adorned with banners of painted veilk skin,
        connective tunnels along each wall, even bored into the upper chamber, for climbing
        each lit by their own uniquely-dyed <span class="code">yuzku</span> globes, some even hovering in the air...
        it is that very same grandeur, but spoken in a cousinly tongue, here
        but by that same measure, it is mundane and static
        so much of their construction is like this
        another testament to th
            WAIT::1000
            AUTOADVANCE::

    sleepybel
        Акизет?
            EXEC::content.classList.add("sideabel")

    sourceless
        isabel interrupts my marveling with a hand wiggled before my eyes
        she restrains her laughter with a tight smile
        my disguise-skin must be conveying my awe in an unsubtle way
        
    sleepybel
        Всё хорошо?

    akizet
        ye--yes, absolutely!
        forgive me, i was distracted by the... construction

    sleepybel
        Хаха! Извинить тебя?? Прекращай это повторять.
        Я просто... Не знаю, удивилась!
        Ты уже столько всего повидала, но так оцепенела, увидев вестибюль?
        Разве ты не успела повидать весь мир?
    
    akizet
        only from a distant view in the sky, isabel
        this place struck me with reminiscence
        the lights, the banners, its very shape evoking festivals from my home

    sourceless
        as i gesture forth for emphasis, another matter comes to mind
    
    akizet
        ah... where do we go, first?

    sleepybel
        Я думаю,
        
    sourceless
        isabel checks her glowing communicator, pulled from an insulated pocket
    
    sleepybel
        Осталось чуть менее часа, прежде чем они будут готовы впустить нас на выставку.
        Хоть мы и получили особый доступ, наверняка там ещё будет суматоха перед самым открытием. """ мой мозг не обрабатывает эти строчки ууу """ << как же я тебя понимаю
        Пожалуй, не хотят, чтобы мы путались у них под ногами.
        Ну, а пока можем идти куда угодно!
        Они закроют остальные экспонаты только на время публичного открытия.
        И если кто спросит, у меня припасены волшебные слова, и сотрудники оставят нас в покое.
        "Ди впустила нас. Агась, друзья Ди".
        В любом случае, неправильного ответа нет. Я всё здесь видела, и всё крутое.
            
    sourceless
        her smile brightens, and with a short laugh,
        she shoves me ahead with a little push to my shoulder
            EXEC::content.classList.remove("sideabel")
        
    sleepybel
        Итак, веди!

    sys
        NOTICE::'non-contiguous memory stream'
        NOTICE::'utilize entity';'ISABEL';'to access location-based recollection'

    RESPONSES::akizet
        explore<+>END
            EXEC::change("PAGE!!lobbybel", true)

SKIP::content.classList.remove("sideabel");change("PAGE!!lobbybel", true)
END::ratween(env.localization.page['aquarium'].bgm, 1)
`)

env.localization.page['aquarium'].dialogues["bigtank"] = generateDialogueObject(`
start
    sourceless
        as we walk along, isabel suddenly prods at my coat 
            EXEC::ratween(env.localization.page['aquarium'].bgm, 0.8)
        which, as she well knows, is my skin
        so she very quickly earns my attention
        grinning down at me, silent

    akizet
        what?
    
    sourceless
        so bright is my mood in this moment that a small chuckle chases my query
        only then do i remember - yet again - that this body smiles for me
        and i am nearly mirroring her own expression
    
    sleepybel
        Странно видеть твоё лицо таким... Не знаю, "активным".
        Я думала, что научилась неплохо различать твои чувства по рецепторам.
        Но теперь почти уверена, что упустила многие из них.
    
    sourceless
        i feel my smile fade, torn down by a distant internal conflict
        is it 'weird'? she did say it with a smile - though i know her to choose words carefully
        my shift in expression, perhaps visible confusion, prompts her to laugh and continue
        
    sleepybel
        Акизет, это мило!
        Я это хотела сказать.
        Думаю, я видела, как ты улыбаешься пару раз, но не так, как ты это делаешь сейчас.
        Ты растеряла весь свой облик "непоколебимого древнего пришельца".
    
    akizet
        is that how i appeared to you?

    sleepybel
        Да... Да, как и любые другие обески.
        Пожалуй за исключением тех с телевизора, кто правда очень старался.
    
    sourceless
        i stop and examine isabel's face, a thought coming to mind
        the many movements of the cousinly face elude me
        smiling is obvious, ubiquitous
        even a larval obesk may smile slightly in moments of great delight
        but in this instant alone, there are countless subtleties i struggle to place
        an uneven movement of her eyebrows, a slow inward curling of her lips
        from the small sound she makes, a quick breath through her nose,
        this is all in line with a teasing suppression of laughter
        delightfully common in our conversations, enough for me to recognize
        but i must wonder how much else i have missed, my eye untrained

    sleepybel
        Да, Аки?

    sourceless
        ah, i have been staring
        while my receptors would normally have signalled my pondering through a slow roll,
        this body has adapted it into an intense expression i am unfamiliar with
        as soon as i am broken from thought, it is gone without a trace, too soon for me to investigate
        but it is surely what she was nearly laughing at
        in my flustering realization, her laughter finally manifests

    akizet
        apologies! i was merely thinking--
        there is much i have yet to decipher from your face, as well
        i do wonder how you might look with receptors
        hmm... a branching pair--like this!
    
    sourceless
        i bring my claws--my hands, up to the sides of my head, miming tir receptors

    akizet
        last i heard, the false receptors initiative is now only somewhat invasive
        all it requires is a few small incisions in the cranial--
            WAIT::2000
            AUTOADVANCE::

    sleepybel
        Окей, нееет.
        Давай подождём, пока они не придумают способ, не предполагающий вслерливание в мой череп.

    sourceless
        her laugh is infectious

    akizet
        the cousinly reservation over body modification is truly puzzling, isabel
        but i have observed your preference
        i will pass word along to hurry their work

    RESPONSES::akizet
        continue<+>END

SKIP::
END::ratween(env.localization.page['aquarium'].bgm, 1)
`)

env.localization.page['aquarium'].dialogues["arch"] = generateDialogueObject(`
start
    sourceless
        the clear arch above us bring the embassy's perspective projections to mind
            EXEC::content.classList.add("slowcam");setCam({offsetCamera: "rotateX(20deg)", height: 2, rotation: 90, x: 3, y: 8});playerMoveTo(3, 8, "left");ratween(env.bgm, 0.8)
        activity amongst the water fauna is surely reduced due to the time,
        but some shapes still wander through the habitat, their strange skin glimmering in the overhead light
        i look up to my side, expecting to see isabel observing the larger one passing overhead
            EXEC::setCam({offsetCamera: "rotateX(10deg)", height: 1.75, rotation: 145, x: 3, y: 8.5})
        but her eyes are distant, closing for long periods, then quickly blinking
        is she lost in thought? the motion is distantly familiar
        no... no, she is tired, her body fighting for rest
        larval exhaustion - a feeling left so far in the past that it nearly inspires envy
        of course, her eyes refocus as they shift down to me, staring straight at her
    
    sleepybel
        Хехе, чего?
    
    akizet
        has the day treated you so poorly?

    sourceless
        day? that is not what i intended to, ah...
        the disguise-skin must attempt to adjust language for me

    sleepybel
        А? О чём...
        Ох, ага. Да, прости. Длинным выдался.
        Это... Мы не должны это обсуждать. Дела на работе.
        Мы здесь чтобы позабыть обо всём этом, помнишь?

    akizet
        clearly it weighs upon you, my friend
        would it help to speak of it?

    sourceless
        for a moment, the darkened hall is silent
        only distant and gentle habitat-maintaining machinery echoes, burbling as a river would
        isabel hesitates to break her own rule, but my expression convinces her to pass the threshold
        she seats us both upon one of the archway's benches
            EXEC::setCam({offsetCamera: "rotateX(10deg)", height: 1.5, rotation: 145, x: 3, y: 8})
    
    sleepybel
        Ладно, совсем немножко. А затем продолжим это игнорировать.
    
    akizet
        of course, hehe
    
    sleepybel
        Итак, я работала с одной парой.
        И они хотели устроить такую большую, шикарную свадьбу в этом месяце.
        Как бы, всю устиланную цветами. Ещё и экзотичными, которые мне пришлось искать и импортировать...
        Мы планировали её месяцами, и они заплатили авансом...
        Половину от итоговой суммы. Мы всё обсудили.
        Наверное, если посмотреть назад, это глупо выглядит, но деньги были приличными. Тогда это, казалось, имело смысл. 
        А сегодня, я не понимаю, они всё отменили--не свадьбу, а часть с цветами.
        Даже не сказали мне, почему. Пришлось впопыхах пытаться отменить заказы, получить возвраты...
        Но я очень рассчитывала на эту вторую половину, надеялась, что с ней я смогу выйти в ноль этим месяцем. // "" возможно другой знак перед надеялась, но подумаю потом

    sourceless
        through her explanation, her eyes drift to follow shapes moving in the dark water
        but even as i try my best to follow her story,
        her description of their commerce is quick to shake my understanding
        the concepts are familiar, but their application here...
    
    akizet
        frustrating... it is unjust for them to leave you without explanation
        but what do you mean by "break even"?
    
    sourceless
        isabel shakes her head, sighing, landing her gaze upon me without emotion
    
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
        yes! yes, we did, hehe, forgive me--
        ah, there, i have said it again...

    sleepybel
        Ха.
    
    akizet
        it was not on an individual level, exactly, isabel
        it was only after sfer had been, ah, 'invented', that we had a true currency to use
        and even then, it was primarily for inter-city trade
        before that, especially during my larval <span definition="INHERITED CONTEXT::'phrase auto-translation and correction';'provided by body';'function of disguise'">years</span>, 
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
        <span definition="INHERITED CONTEXT::'phrase auto-translation and correction';'provided by body';'function of disguise'">today</span>, our interstellar operations operate like one large collective, so,
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
        these words pierce me--a compliment, though not spoken as one // Это смешно. Они смешные
        have i only worsened her mood?!

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
        already, long-dead instincts spark within me: the urge to hunt // Аки-добытчица в её с Изиной целиком и полностью традиционной ксеносемье <з
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
        continue<+>END
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
        Нет худа без добра. Всё уравновешено. Как же звучит то ваше религиозное выражение?

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
        you might, were you to visit in the modern <span definition="INHERITED CONTEXT::'phrase auto-translation and correction';'provided by body';'function of disguise'">day</span>
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
        continue<+>END
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
        It might still happen, because of the continental critters. // Может, это и сейчас происходит из-за континентальной живности. """ Не очень понял...
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
        Аки, это реально поехавше.

    akizet
        well, there is nothing to be done, isabel
        it has rested there for what must be <span definition="INHERITED CONTEXT::'phrase auto-translation and correction';'provided by body';'function of disguise'">millenia</span>
        and it shows no sign of ever changing that
        there is a sort of comfort in knowing it is silent, really
        that no great shapes may rise from the dark unexpectedly
        it is more 'freaky' to me that your ocean holds such an unfathomable mass of life
        even further that so much is allegedly unidentified and never seen

    sourceless
        her laugh echoes through the darkened hall

    sleepybel
        Вау, странно слышать это от тебя. Поехавше.
        Судя по всему, теперь я буду бояться ещё одного океана.
    
    akizet
        hehe, it was your request!

    RESPONSES::akizet
        continue<+>END
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
        there have been <span definition="INHERITED CONTEXT::'phrase auto-translation and correction';'provided by body';'function of disguise'">decades</span> where i have gone entirely without words to larval friends

    sleepybel
        Ага, точно так же.
        Ну, может не прямо <em>точно</em> так же...
        Просто, забыться так легко, мне нужно будет основательно перечитать аквариум божечки........
        Я заправляю этим магазинчиком уже как четыре года, кажется.
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
        Я просто хотела сказать, с тех пор, как ты начала приходить,
        Ты словно вырываешь меня из этого всего.
        Да, именно, я как бы "прихожу в чувство". Мне всё ещё приходится вернуться, но...
        Я могу проснуться ненадолго. Всё встаёт на свои места.
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
        Мне точно можно хранить что-то такое?
        
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
        Thanks for coming out, Aki. I know it's hard with how busy you've been, lately. // Спасибо, что пришла, Аки. Ты так загружена в последнее время, я понимаю, что это было непросто.
            EXEC::content.classList.add("centerbel");

    akizet
        what? nonsense!!
        i am busy, yes, but i linger in this city more than ever in recent <span definition="INHERITED CONTEXT::'phrase auto-translation and correction';'provided by body';'function of disguise'">weeks</span>, 
        sure to continue for some time, given my, ah... project
        and of course, the act of sleep not being within my needs
        perhaps we may visit a few more places, in the 'evenings', when your work is done?
    
    sleepybel
        Yeah! Yeah, yeah, sure. I'll see what I can find. // Да! Да, да, конечно. Я постараюсь найти время.
    
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
        По телевизору они выглядят такими жестокими в движении.
        
    akizet
        what? no! 
        with careful altitude and speed, it is fine, isabel
        something to show you, in time!
        perhaps i could even show you now, if--
        
    sleepybel
        Аки.
        Тебе сон может и не нужен, но я не спала уже слииишком долго.
    
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