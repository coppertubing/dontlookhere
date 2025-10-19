/*
    cor-RU - a full russian adaptation mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/aquarium.js
    adaptation for /local/city/aquarium

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
        /*isabel*/ "You really want to leave so soon?": "",
        /*akizet*/ "what? no, no, of course not": "",
        /*sourceless*/ 'did i say something to imply that?': "",
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
            FAKEEND::(back)
`)
env.localization.page['aquarium'].dialogues[`mth++aquarium`] = generateDialogueObject(`
loop
    RESPOBJ::mthresp

start
    self
        question

    moth
        what's up?
    
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
        ok
        are you a qou

    moth
        boy, i wish

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)
`)



// --- yuri
env.localization.page['aquarium'].dialogues["meetup"] = generateDialogueObject(`
start
    sourceless
        the center of the cousins' park, not far from our destination
        i am early
            EXEC::content.classList.add("slowcam");content.classList.remove("instabel")
        so, i sit, the cold, gentle rain suffusing my disguised form
            EXEC::setCam({x: 4, y: 8.5, rotation: 0});playerMoveTo(4, 8, "left")
        there is some organizational work that i could do while here, as there always is, but...
        the rain, the fog, it is so familiar
        like a dream of that simpler past, riding veilk, hunting
        without the weight of my duties, or the madness of the hidden conflict on my shoulders...
        there is peace here
        so i allow myself to feel as a larval obesk might
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
        something...
        ...
    
    sleepybel
        Aki?
            EXEC::content.classList.add("quickabel")

    sourceless
        a voice from behind startles me, accompanied with a pattering of droplets upon stretched fabric
            EXEC::setCam({x: 4, y: 8.5, rotation: 70});
            WAIT::1000
            THEN::content.classList.remove("hideabel");content.classList.add("standobel")
        isabel, carrying a thin half-dome to shield herself from the rain
        how long has it been?
        she laughs a little, taking some steps closer

    sleepybel
        Are you just--sitting in the rain?
        Isn't that uncomfortable?
        I should have mentioned something about bringing an umbrella, haha.
            EXEC::content.classList.remove("quickabel")
    
    sourceless
        when i turn up to face her, i forget that this body adapts receptor movements into facial expressions
            EXEC::setCam({x: 4, y: 8.5, rotation: 70, offsetCamera: "rotateX(20deg)", height: 1.75});content.classList.remove("standobel");content.classList.add("centerbel")
        and so the joy in her face fades into concern, seeing mine...
        which i only now realize must be some distant despair
        she sits quickly beside me, the rain-shield now over both of us
    
    sleepybel
        Oh... Are you okay?
        What's going on?
    
    sourceless
        with a quick shake of my head, i center myself, ridding myself of this haunting for now
        seeing her is enough to bring a smile
        
    akizet
        yes! yes, apologies,
        it is so good to see you, my friend
        ...ah, i suppose, like you say, i was 'thinking about work...'
    
    sleepybel
        It's still been that tough, huh?
        I get it.
        I mean... Haha, not exactly, I can't imagine it's that similar, but...
        Well, quit thinking about it, okay?
        We're both just going to forget about everything else tonight.
    
    sourceless
        i laugh and nod in agreement--already, there is a sense of freedom in that shared void
        simultaneously, she pinches at the cloth of my coat, confused
    
    sleepybel
        How are you not soaked?
        Oh, right, this is... Yeah, right. 
        Okay, good, I wouldn't want to walk in with an umbrella, 
        And then have you following behind me like I just left you in the rain.
    
    akizet
        <span definition="INHERITED CONTEXT::'being intentionally obtuse'">i do not see the problem</span>
    
    sourceless
        she chuckles and stands, pulling me to my feet alongside her
            EXEC::setCam({x: 4, y: 8, rotation: 90});playerMoveTo(4, 8, "left")

    sleepybel
        Uh-huh.
        Okay, so, Dee's waiting for us at the side door, that'll be our way in.
        Apparently it's going to be in a weird state, because the aquarium is usually closed by now,
        but the big night event doesn't start for another hour or so...
        So, all the other exhibits are still unlocked!
        She said the restaurant would still be open, too.
        It's for the overtime workers, but she told them we'd be coming, so...
        We'll be able to see everything <em>and</em> get some food.
        I wasn't sure how that would turn out, but we got really lucky.
    
    akizet
        is that different from how the habitat usually operates?
    
    sleepybel
        Well, it's not usually open at night. And usually they don't let people in during prep.
        So, the main difference is how it's pretty much just going to be the two of us in there.
        It's usually pretty crowded, so this is special...
        Come on, let's go!

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
        Akizet?
            EXEC::content.classList.add("sideabel")

    sourceless
        isabel interrupts my marveling with a hand wiggled before my eyes
        she restrains her laughter with a tight smile
        my disguise-skin must be conveying my awe in an unsubtle way
        
    sleepybel
        You okay?

    akizet
        ye--yes, absolutely!
        forgive me, i was distracted by the... construction

    sleepybel
        Haha! Forgive you?? You have got to stop saying that.
        I'm just... I don't know, surprised!
        You've seen so much, and you get this excited at seeing a lobby?
        Haven't you seen the whole world at this point?
    
    akizet
        only from a distant view in the sky, isabel
        this place struck me with reminiscence
        the lights, the banners, its very shape evoking festivals from my home

    sourceless
        as i gesture forth for emphasis, another matter comes to mind
    
    akizet
        ah... where do we go, first?

    sleepybel
        There's still,
        
    sourceless
        isabel checks her glowing communicator, pulled from an insulated pocket
    
    sleepybel
        The better part of an hour to go before they'll be ready to let us into the exhibit, I think.
        Even if we are getting special access right now, I guess there's still some last-minute panic.
        Probably don't want us getting in the way.
        So, in the meantime, we can go wherever!
        They're only going to close off the other exhibits for the public opening.
        And if anyone asks, I've got the magic words that'll make the staff leave us alone.
        "Dee let us in. Yup, Dee's friend."
        Anyway, there's no wrong answer. I've seen everything in here and it's all cool.
            
    sourceless
        her smile brightens, and with a short laugh,
        she shoves me ahead with a little push to my shoulder
            EXEC::content.classList.remove("sideabel")
        
    sleepybel
        So, lead the way!

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
        It's weird seeing your face so... I don't know, "active".
        I thought I was pretty good at figuring out how you were feeling by your receptors.
        But now I'm pretty sure I've been missing a lot of it.
    
    sourceless
        i feel my smile fade, torn down by a distant internal conflict
        is it 'weird'? she did say it with a smile - though i know her to choose words carefully
        my shift in expression, perhaps visible confusion, prompts her to laugh and continue
        
    sleepybel
        Akizet, it's cute!
        That's what I'm saying.
        I think I've seen you smile a few times before, but not like this.
        You totally lose the "stoic ancient alien" facade.
    
    akizet
        is that how i appeared to you?

    sleepybel
        Yeah... Yeah, along with every other obesk.
        Except for the ones trying really hard on TV.
    
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
        Yes, Aki?

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
        Okay, nooo.
        Let's wait until it doesn't involve drilling into my skull.

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
        Haha, what?
    
    akizet
        has the day treated you so poorly?

    sourceless
        day? that is not what i intended to, ah...
        the disguise-skin must attempt to adjust language for me

    sleepybel
        Huh? What are you...
        Oh, right. Yeah, sorry. It's been a long one.
        It's... We don't have to talk about it. Work stuff.
        We're here to forget about all of that, remember?

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
        Okay, just a little. Then we're back to ignoring it.
    
    akizet
        of course, hehe
    
    sleepybel
        So, I was working with a couple.
        And they wanted to do this big, fancy wedding this month.
        Like, covered in flowers. Wanted some exotic ones that I had to source and import...
        We'd been planning it for months, and they paid an upfront fee...
        Half of the total. We talked about it all.
        Maybe that was stupid in hindsight, but the money was good. It made sense at the time.
        And today, I don't know, they cancelled it--not the wedding, but the flower part.
        Wouldn't even tell me why. Had to run through and try to cancel orders, get refunds...
        But I was really relying on that second half to break even this month.

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
        It's expensive here. You know, rent--for the store, for my own place, for...

    sourceless
        with a sharp exhale and chuckle, an incredulous smile twists out of her disappointment

    sleepybel
        Wait, Aki, you did have money back home, right?
        Do you get paid for your job here?
        I'm only just realizing, this has... never really come up.
        I mean, I guess with Gordon back when we met, but that was different.
    
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
        Ha.
    
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
        Huh. That's cute.
    
    sourceless
        these words pierce me--a compliment, though not spoken as one
        have i only worsened her mood?!

    sleepybel
        I almost wish it worked that way here, but...
        It never would.
        We're all on our own, Aki.

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
        already, long-dead instincts spark within me: the urge to hunt
        surely the cousins must store mass quantities somewhere
        one cloaking skin, and the right moves, and maybe i could...
        or! perhaps it could be manufactured directly?

    sleepybel
        No, it's not--ugh, I'm sorry too, Aki.
        It's just been a hard few months for me on the business side of things.
        Thanks for sharing that, though. It's always interesting hearing about your home.
    
    sourceless
        she coils an arm around my shoulder, pulling me into a half embrace,
        shelving my thoughts of the hunt
        i return the gesture gently - she could use the comfort
    
    sleepybel
        It's weird how easy it is to forget you're from another world, sometimes.
        Maybe things will work out, eventually.
        It's been going pretty well so far, so, 
        I just need to hold out until you aliens fix everything, right?

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
        Haha!
        That's not how you say it, Aki.
        But yeah, let's go.
        
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
        I thought it might have just been rose-tinted memories from when I was a kid, but...
        It's still crazy how good this is for an aquarium restaurant. Honestly.

    sourceless
        rose-tinted? 
        what does a bright parasite have to do with this?
        she preempts my question, surely divining my thoughts from this emotion-adapting face
        exactly why i much prefer to be without a disguise-skin
        though i hold no conflict with it, in isabel's company
    
    sleepybel
        That means it really is just as good as I remember, haha.

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
        Oh my god, Aki!
        You are adorable.
        It's an expensive shithole, always has been.
        So, for someone like me, it's as close as things get to paradise.
        Which is to say, it's pretty far off.
    
    sourceless
        she laughs again, though i fail to join her this time
            EXEC::setCam({x: 2, y: 6, rotation: -90, distance: 0.2, offsetCamera: "rotateY(3deg)"})
        perhaps this touches again upon the pains we agreed not to speak of
        the struggles her people's systems place her within
        but it is hard to place the boundary, so i do not press further
        
    sleepybel
        I'm sorry, it's not--it's not that bad.
        There's good with the bad. It balances out. What is that religious thing you say?

    sourceless
        my receptors--no, my face, it smiles slightly, again reading my impulses

    akizet
        'a place of joy and terror both'?
            EXEC::setCam({x: 2, y: 6, rotation: -90, distance: 0.2})

    sleepybel
        Yeah, it's like that. I don't know, maybe not "terror" exactly...
        Maybe that's accurate for this month.
        But, my point is, with everything you've told me, 
        I'd probably think your home was a paradise, too.

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
        Okay, well, that's not fair.
        I was <em>expecting</em> you to say that it's not a paradise either.

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
        Right, so, <em>not</em> a paradise.
        You're just trying to make it sound better.
        You dork.
    
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
        Hey Aki, is it true that there's no life in your oceans?
            EXEC::content.classList.add("sideabel")
    
    sourceless
        her question breaks me from my ravenous observation - how did she know that?
        really, it is a surprise... she rarely asks about any part of home so abruptly
        i delay a moment, considering my words carefully as if speaking with one of the envoys

    sleepybel
        Sorry if--if that's not something you're supposed to talk about.
            EXEC::content.classList.add("centerbel");content.classList.remove("sideabel")

    sourceless
        the troubled thought must be plain in this body's face, again
        but my caution evaporates as her explanation unfolds

    sleepybel
        I just remember Dee telling me about how the place wanted to get an Obeski exhibit going.
        There's apparently some obesk who's really into making little, uh...
        Like, fake Obeski animals, that they got in touch with.
        Then the word came down that your oceans are dead?
        Maybe it's just something that got mistranslated.
        It might still happen, because of the continental critters.
        But I just thought that part was really interesting.

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
        That doesn't bother you?

    akizet
        hardly
        i regret that i was not brave enough, i suppose
        so much open space is unnatural, far too unnerving for me at that age
        but our deaths are long, there is plenty of time to...
    
    sleepybel
        No, no, the--the blanket thing <em>being there</em>.
        I mean, the whole ocean floor. Like, around the entire world?

    akizet
        oh?
        yes, we believe it extends even beyond the inhabitable zone, beneath the ice
        it being unsolved is frustrating, i suppose
        but it has always been there
        that is simply the nature of things

    sourceless
        she is silent for a θblink, breaking it with an exasperated chuckle

    sleepybel
        Aki, that's really freaky.

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
        Wow, it's weird hearing you say that. Freaky.
        Looks like there's a second ocean for me to be scared of, now.
    
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
        It's pretty, right?
        It's been a few years since they've used lights like this for an exhibit.
        God, no, it's... It's almost been a decade.
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
        Is it the same way for you, Akizet?
            EXEC::setCam({x: 13, y: 34.5, rotation: 110, height: 1.5, offsetCamera: "rotateX(20deg)"});content.classList.add("sitabel");
        The way things just keep going, and you don't even notice how fast it gets.

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
        Yeah, just like that.
        Well, maybe not <em>just</em> like that...
        It's just so easy to get distracted, for so long.
        I've had that shop for four years now, I think.
        Chasing the dream of making it work in a place that keeps getting worse.
        And it's great, I mean, it <em>is</em> like I've always wanted it, sometimes.
        But... 
        I've barely seen my brother, I almost missed flying out to my dad's funeral because of a bad month...
        It's been years since I've talked to some of my friends. 
        I can't remember the last time I took a break.
        There's so much to deal with, everywhere, all the time. 
        Sometimes, when I'm working, 
        I'll just blink and realize how long it's been since everything in my life's happened.
        Like I've been in a trance or something, missing everything around me.
    
    sourceless
        she shifts to face me more directly, smiling a little, but her eyes...
        unconsciously, my disguise-skin interprets some receptor movements into a frown
        still, i nod--of course i understand
        even if i can only imagine the pain it brings in a limited lifespan
        for a moment, there is silence, broken by a quiet scoff

    sleepybel
        Sorry, I know that's a hell of a thing to bring up.
        I just wanted to say, ever since you started coming by,
        It feels like you break me out of it.
        Yeah, that's it, I kind of 'snap out of it'. I still have to go back, but...
        I get to wake up for a little while. Things get put into perspective.
        You know what I mean?

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
        Oh yeah?
        I thought you would have grown out of your "let's run away" phase a hundred years ago.
    
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
        Yeah, I think I got it.
        It's really okay that I have this?
        
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
        This is really nice, Aki.
        Thanks.
    
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
        Thanks for coming out, Aki. I know it's hard with how busy you've been, lately.
            EXEC::content.classList.add("centerbel");

    akizet
        what? nonsense!!
        i am busy, yes, but i linger in this city more than ever in recent <span definition="INHERITED CONTEXT::'phrase auto-translation and correction';'provided by body';'function of disguise'">weeks</span>, 
        sure to continue for some time, given my, ah... project
        and of course, the act of sleep not being within my needs
        perhaps we may visit a few more places, in the 'evenings', when your work is done?
    
    sleepybel
        Yeah! Yeah, yeah, sure. I'll see what I can find.
    
    sourceless
        she smiles, there is kindness in her voice, but the weight lingers
        yes, she says, yet her eyes speak only of the difficulty my request suggests
        it is an imposition
    
    akizet
        it need not be so grand as this, isabel
        nor by your decision alone--i do have a vessel for flight, after all
        i think it would be delightful to visit those fields you spoke to me of
    
    sleepybel
        Oh, yeah! You think you could actually fly us both out?
        I guess I thought your ship would just, like, kill me.
        They look so violent with how they move on TV.
        
    akizet
        what? no! 
        with careful altitude and speed, it is fine, isabel
        something to show you, in time!
        perhaps i could even show you now, if--
        
    sleepybel
        Aki.
        You might not need sleep, but I've been awake waaay too long.
    
    sourceless
        ah--my excitement seized my voice before reason could, as it often does
        fatigue is painted so clearly in her face and stance
    
    akizet
        right, yes, of course
        then i suppose, for now this is goodbye
        take care, isabel
        may velzie smile upon you

    sleepybel
        Haha!
        Yeah, you too, Aki.
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