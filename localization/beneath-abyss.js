env.localization.page['abyss'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "still not getting anything detailed here": "",
        "about whatever this is": "о том, чем бы это ни было",


        // = drowning = //
        // ent+actor names
        "Ƙø¿ƶḳ¿±": "Қø¿ӡḳӣ¿±",
        "$Ø‰Ɍ¿ɇ§": "$Ø‰Р¿ɇ§",
        "Â£¿Ž¿": "Â£¿Ҙ¿",

        // not calm
        //looking at that fuckass tile
        "akizet, we should not stray too far...": "",
        "the cousins are waiting for us on the shore!": "",
        "and-- it c an be dan gerous, if y ou go too  d e ep": "",
        //ozoblast
        "oh ..": "",
        "b ut,  we are ha ving a g ood tim e  he re": "",
        "righ t, aki zet.. .?": "",

        // calm
        //looking at that fuckass
        "aki! what do you keep looking at?": "",
        "i do not know what is on your mind, but...": "",
        "just enjoy this moment!": "",
        //ozoblast
        "aki...": "",
        "i want to stay a little longer, ok?": "",
    }, 
    entityDescriptions: {},
}

env.localization.drowningIntroResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        what happened?<+>introwrong1
        back door?<+>introwrong2
        i'm not akizet<+>introwrong3
`)

env.localization[`drowning_intro`] = generateDialogueObject(`
start
    self
        hello?

    sourceless
        an uncomfortable attention fixes upon your mind's eye.
        ...

    drowning
        come, akizet!
        we are just in time!

    self
        are you kazki?

    moth
        wtf, is that what that is?
        it's hard to pick out what you're talking to on my side
        these in-between places are so scrambled

    sourceless
        the thoughtform's attention turns frantic, like a cornered animal.
            EXEC::env.abyss.drowningFear(1)
        something ripples beneath the render, beyond your connection's ability to properly perceive.

    drowning::scared
        wh a t  kind of question is  tha t?
        aha ha silly v el

    moth
        ah, got it
        yeah, that's definitely some intact visual data
        i wonder where this one came from... definitely not the embassy memories
        but be careful dude
        i only spotted it because its incoherence spiked
        if that goes too high, your mindspike will bail and retrace you out of there
        you're already on thin ice from the environment

    RESPOBJ::drowningIntroResp

introwrong1
    self
        how did you get here?

    drowning::panic
        ple a se sto p
            EXEC::env.abyss.drowningEject();

introwrong2
    self
        where does the door behind you go?

    drowning::panic
        no n o  no s hut up
            EXEC::env.abyss.drowningEject();

introwrong3
    self
        i'm not akizet

    drowning::panic
        yo u a re  hu rtin g  me
            EXEC::env.abyss.drowningEject();
`)

env.localization[`drowning_ejected`] = generateDialogueObject(`
start
    moth
        damn
        not a distant retrace though

    self
        it's lucid

    moth
        what, you think so?
        you know, it's possible for incoherent thoughtforms to act up, but not really be aware
    
    self
        i could feel it when it looked at me
        it knows i'm not akizet

    moth
        got it...
        damn, can't imagine what it's like to be lucid in someplace like this
        it's probably clinging to whatever's left of the memory it came from
        but that might mean it has some info we could use!
        why don't you try playing along? act like akizet would
        maybe that'll keep it from freaking out

    self
        how

    moth
        idk, just say things you think she might say

    RESPONSES::self
        ok<+>END
`)

env.localization.drowningResp1 = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        long time no see<+>resp1wrong1
            HIDEREAD::
        what's happening?<+>resp1right
            HIDEREAD::
        where are we?<+>resp1wrong2
            HIDEREAD::
`)

env.localization.drowningResp2 = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        ...<+>resp2wrong1
            HIDEREAD::
        ok<+>resp2wrong2
            HIDEREAD::
        aki?<+>resp2right
            HIDEREAD::
`)

env.localization.drowningResp3 = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        i have a lot to do<+>resp3wrong1
            HIDEREAD::
        you're right<+>resp3right
            HIDEREAD::
        cavik is dumb<+>resp3wrong2
            HIDEREAD::
`)

env.localization.drowningResp4 = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        but they aren't fish<+>resp4right
            HIDEREAD::
        they bite?<+>resp4wrong1
            HIDEREAD::
        we should kill them<+>resp4wrong2
            HIDEREAD::
`)

env.localization[`drowning_hello`] = generateDialogueObject(`
start
    self
        hello

    sourceless
        its uneasy attention fixes upon you in short bursts, as if avoiding eye contact.

    drowning
        come, akizet!!
        we are just in time!

    sourceless
        ...

    RESPOBJ::drowningResp1

resp1wrong1
    self
        i haven't seen you in a while

____SHOWIF::['PAGE!!drowningScared', true]
    drowning::panic
        no i  w as nev er alon e
            EXEC::env.abyss.drowningEject();
____END

____SHOWIF::['PAGE!!drowningScared', false]
    drowning::scared
        but we hav e been togeth er all d ay?

    RESPOBJ::drowningResp1
____END

resp1wrong2
    self
        where are we?

____SHOWIF::['PAGE!!drowningScared', true]
    drowning::panic
        i forg o t  i f orgot th e n am e
            EXEC::env.abyss.drowningEject();
____END

____SHOWIF::['PAGE!!drowningScared', false]
    drowning::scared
        hah a, sil ly ..!

    RESPOBJ::drowningResp1
____END

resp1right
    self
        just in time for what?

    sourceless
        the thoughtform stirs, its unease dissipating slightly.
            EXEC::env.abyss.drowningFear(0)
        after a short delay, new thoughts meet yours.
        
    sys
        NOTICE::'memory stream located'

    drowning sourceless
        kazki and i tread through the loose soil beneath the waves of the bright shore
        descending further from her envoy, 
        who lingers and lounges beyond the water, in the fading light of their star
        so strange that kazki has brought her with...
        this is not even a diplomatic affair

____SHOWONCE::
    moth
        so that's what it was holding onto... try and stay on this
____END

    drowning sourceless
        yet, almost every cousin she meets is like this
        they easily bond, become friends, stay in touch for mundane matters...
        i could hardly imagine gordon calling me as her cousinly friends do
        the tir's blessing is especially effective on this world
        a gentle flame's warmth through presence, 
        even as we descend into the cold dark of these waters

    drowning
        hehe!
        i am so glad you asked
        it is a sight afforded only to the <span definition="NOTE::INHERITED CONTEXT::'implies altered living state'">dead</span>!
        you see--

    drowning sourceless
        around us, through occasional impacts, bubble-like creatures gather, tendrils drifting in the current

    drowning akizet
        you mean these little bubbles? 
        they look like tiny akozak

    drowning
        aki!! this is not a problem to solve!
        just listen, and i will tell you! hehehe
    
    drowning sourceless
        the coils of my receptors tighten

    RESPOBJ::drowningResp2

resp2wrong1
    self
        ...

____SHOWIF::['PAGE!!drowningScared', true]
    drowning::panic
        no n o  yo u  ha v e to  t alk
            EXEC::env.abyss.drowningEject();
____END

____SHOWIF::['PAGE!!drowningScared', false]
    drowning::scared
        akiz et ...? are you ok ?

    RESPOBJ::drowningResp2
____END

resp2wrong2
    self
        ok tell me

____SHOWIF::['PAGE!!drowningScared', true]
    drowning::panic
        n o!  sh e was s o embar rasse d !
            EXEC::env.abyss.drowningEject();
____END

____SHOWIF::['PAGE!!drowningScared', false]
    drowning::scared
        oh? d o you not mind that  an ymor e?

    RESPOBJ::drowningResp2
____END

resp2right
    self
        what did you say?

    drowning sourceless
        i pull my receptors back in disapproval
            EXEC::env.abyss.drowningFear(0)
        but the tendrils of hers only spread with her cousinly smile
        she dips down slightly, looming over me

    drowning
        hehe! whaat?
        you let cavik call you aki, right?

    drowning sourceless
        the giddiness in her voice is heavy, unfettered...
        effects of citric acid--simulated, but as high as can be allowed
        hardly uncommon for her downtime,
        but even in the presence of her envoy friend?
        i would simply turn it down a little, if i were her...
        on most occasions, anyway--this is different
        i lift my orange simulacrum to my lips, glancing away to explain

    drowning akizet
        that is different--an honor he holds from our larval lives
        but it is just that: childish, larval... silly

    drowning
        well i like it!
        and no one else can hear us here,
        so you will just have to feel silly! hehehe

    drowning sourceless
        she rises again, pausing to drink from her own simulacrum
        i relax my receptors from their coil - i will permit this, for now
        
    drowning
        besides, it is good for you to take it easy sometimes!
        you cannot always be worrying about our work and everything, akiii
        ahaha!
        you know what they say about vel...
        if you do not make velzie smile, a storm will find you!

    RESPOBJ::drowningResp3

resp3wrong1
    self
        i have a lot to do

____SHOWIF::['PAGE!!drowningScared', true]
    drowning::panic
        she w as  h  a pp y
            EXEC::env.abyss.drowningEject();
____END

____SHOWIF::['PAGE!!drowningScared', false]
    drowning::scared
        p lea se  let m e

    RESPOBJ::drowningResp3
____END

resp3wrong2
    self
        cavik is dumb

____SHOWIF::['PAGE!!drowningScared', true]
    drowning::panic
        am i  do ing so m e  thin g   wr o ng ??
            EXEC::env.abyss.drowningEject();
____END

____SHOWIF::['PAGE!!drowningScared', false]
    drowning::scared
        bu t.. . it is co o l when i  do it. ..

    RESPOBJ::drowningResp3
____END

resp3right
    self
        you're right
        
    drowning sourceless
        maybe it is simply the citric haze, but...
            EXEC::env.abyss.drowningFear(0)
        when was the last time i thought about anything else?
        the call, our research, it is only that, every θgaze
        like the natural curl of my receptors are simply out of stress and focus
        yet here, we are free from this burden, just for a while
        i understand the deserters, now
        yes--for this bright evening, i will eschew these weights
        
    drowning
        yes!!
        and that means i can call you aki, too, right?
        
    drowning akizet
        for now
        and <em>not</em> in front of others
        
    drowning sourceless
        even with my stern delivery, her receptors curl with delight, and i occupy myself with my drink
        where i expected teasing, her receptors are spread with a genuine warmth

    drowning
        ok!! hehe...
        cool
        ...oh! yes!
        it is getting dark! look!

    drowning sourceless
        one of her tall receptors gestures towards the blackened depths, away from shore
        the little bubble creatures are swarming, bumbling blindly around one another
            EXEC::content.classList.add('jellymode', 'dim');

    drowning
        these little things, they are called jellyfish!
        they are a big problem for our cousins, because they bite when you touch them
        but do not worry! their tiny little teeth cannot hurt us!
        
    drowning sourceless
        finally, the last light of the cousins' star fades...
        and we are left together in total darkness

    RESPOBJ::drowningResp4

resp4wrong1
    self
        you said they bite?

____SHOWIF::['PAGE!!drowningScared', true]
    drowning::panic
        we ar e  s af  e
            EXEC::env.abyss.drowningEject();
____END

____SHOWIF::['PAGE!!drowningScared', false]
    drowning::scared
        y es, but no t  u s!

    RESPOBJ::drowningResp4
____END

resp4wrong2
    self
        we should kill them 

____SHOWONCE::
    moth
        dude cmon
____END

____SHOWIF::['PAGE!!drowningScared', true]
    drowning::panic
        w ha  t ? ??
            EXEC::env.abyss.drowningEject();
____END

____SHOWIF::['PAGE!!drowningScared', false]
    drowning::scared
        th e y ar e n ot tha t  dan g er ous!

    RESPOBJ::drowningResp4
____END

resp4right
    self
        but they aren't fish
    
    drowning akizet
        right? the "fish" have scales, and distinctive eyes, which these...

    drowning
        ehehe! i know!
        it is such a funny name!

    drowning sourceless
        my qou-eyes adjust to the deepening darkness...
            EXEC::env.abyss.drowningFear(0)
        above us, kazki's wavy hair flows in the current like the tendrils of these creatures

    drowning
        but, look!

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
        hehe
        this is...

    drowning
        i know
        their waters always amaze me - if only ours had such vibrance!
        ...
        ah, here!
        sit with me!
        zzoust!!

    drowning sourceless
        kazki falls back onto the seafloor, kicking up a small cloud of sand
            EXEC::change("drowningCalmed", true)
        i settle down beside her, laughing
        she reaches over, clinking her simulacrum against mine with a pleased giggle of her own
        we both take a drink

    drowning akizet
        thank you for showing me this, kazki
        how often does this happen?

    drowning::safe
        not often, apparently
        which is good for our cousins, of course...
        these swarms mostly take them by surprise
        so, after seeing it myself, i knew i needed to bring you!
    
    drowning sourceless
        i give her a curious look over our luminescent drinks
    
    drowning akizet
        and not bozko? or--

    drowning sourceless
        the amused grin she casts down silences me
        cousinly expressions come so easily to her

    drowning::safe
        bozko loves the water, but...
        aki, how long has it been since you took time to enjoy yourself?
        i think bozko will be fine!

    drowning akizet
        but...then, what about tozik?
        he spends so much time in our research chamber...

    drowning::safe
        well, ok, that is a fair assessment
        but i know you better than him!
        gakvu will have to spend time with him, or something!
        a better question is, why not you?
        hehe!
        you are working so hard to find a reason not to be here
        why is that...?
        you are not unhappy with me, are you?

    drowning akizet
        no, ah...

    drowning sourceless
        ...
        i peer down into the warm glow of my simulacrum
    
    drowning akizet
        you know...
        you are right
        thank you for thinking of me, kazki

    drowning sourceless
        i lean over, resting against her side
        she returns the gesture with a comfortable spread of her receptors

    drowning akizet
        this will sound silly, but...
        you are a good tir, you know?

    drowning::safe
        ahaha!!
        no no no, that is always nice to hear!
        ehehe...
        ...
        thank you, aki

    RESPONSES::self
        watch the creatures<+>CHANGE::drowning_chat
            EXEC::change("PAGE!!warned", false)
            FAKEEND::proceed
`)

env.localization.drowningChatResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        what happened?<+>cause
        back door?<+>deeper
        want to leave?<+>leave
        need help?<+>help
        ok bye<+>END
            EXEC::env.abyss.drowningEnd();content.classList.add('jellymode');
`)

env.localization[`drowning_chat`] = generateDialogueObject(`
loop
    RESPOBJ::drowningChatResp

start
    drowning sourceless
        we relax together amidst the glimmering swarm,
            EXEC::content.classList.add('jellymode');content.classList.remove('dim')
        in no hurry to return to the shore
        the silence is comfortable, but...
        is there anything i want to ask her?

____SHOWONCE::
    moth
        ok, that part was different - more incoherent than the rest
        i think that came from it directly... so, keep playing along,
        but this is our chance to get some info out of it
____END

    RESPOBJ::drowningChatResp

cause
    self
        how did you end up here?
        ...and find this? under the water?

    sourceless
        its attention is not upon you, even as it pulses thoughts to you.
    
    drowning::safe
        ...
        i fell
        hehe...
        i slipped off of a little boat the bright cousins were showing me around in
        and they were so worried i would get bitten by this swarm,
        but we are tougher than that!
        ...
        if you stay positive,
        you can survive all kinds of things!

    RESPONSES::self
        i see<+>loop
            FAKEEND::(back)

deeper
    self
        what is over there?

    sourceless
        the thoughtform fixes upon your mind's eye to understand.

    drowning::safe
        huh? oh!
        hehe, what a silly question
        but i suppose, if you go too far, you will fall off the shelf!
        into the depths, where even stranger fish live...
        and it is not safe for us to go so deep without a high-pressure body!
        there is no need to do something so risky
        just stay here with me, where things are nice, ehehe

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

leave
    self
        don't you want to leave?

    drowning::safe
        ...
        why would i want to leave?
        we are having a good time, right? hehe
        and, more than that...
        i know i am safe here
        and it is familiar, too
        
    drowning
        ...
        but...
        i hope that you...
        come here with me, again, aki
        it is so nice to talk to you
        i do not want you to become lonely, you know?

    drowning::safe
        so, please, think of me from time to time!

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

help
    self
        is there anything i can do for you?

    drowning::safe
        what do you mean?
        we have everything we need right here!
        i do not know what you could do to make things even better...
        but thank you for asking, aki!
        you are a good friend

    RESPONSES::self
        you too<+>loop
            FAKEEND::(back)
`)


// STUFF

env.abyss.snap = (thing)=>{
    cutscene(true)
    play('click1')
    flash(true)

    let dl = ""
    let flag = ""
    let filename = ""
    switch(thing) {
        case "abyss":
            dl = '/img/local/beneath/bg/abyss.png'
            flag = "beneath_abysspic"
            filename = "бездна.png"
        break

        case "effigy":
            if(!check("effigy_sipper")) {dl = '/img/local/beneath/bg/EFFIGY.png'; filename = "ЭФФИГИЯ.png"}
            else {dl = '/img/local/beneath/bg/clear.png'; filename = "всёчисто.png"}
            flag = "beneath_effigypic"
        break

        case "nope":
            dl = '/img/local/beneath/bg/nothanks.png'
            flag = "beneath_nopic"
            filename = "нетспасибо.png"
        break
 
        default:
            return
    }

    setTimeout(()=>{
        flash(false)
        play("muiScanner", 0.75)
        cutscene(false)
            
        //add DL element
        const downloadLink = document.createElement('a');
        downloadLink.href = dl;
        downloadLink.target = "_blank";
        downloadLink.download = filename;
        downloadLink.setAttribute("data-no-swup", true);
        downloadLink.style.display = 'none';
            
        //trigger download
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
            
        change(flag, true)
    }, 1000)
}