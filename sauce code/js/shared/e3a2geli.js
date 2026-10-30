env.dialogueActors["stowaway"] = {
    image: '/img/sprites/loper.gif',
    type: "thoughtform portrait-top portrait-cover portrait-blocker",
    voice: ()=>play('talkcroak')
}

env.dialogueActors["bstigy"] = {
    name: "EFGY",
    image: '/img/local/uncosm/ozo/akieffigy_portrait_bstrd.gif',
    type: "bstrd portrait-cover",
    voice: ()=>play('talkflower', 1.4)
}

env.dialogueActors["bsteli"] = {
    name: "geli",
    type: "portrait-round portrait-cover portrait-blocker bastard-color",
    voice: ()=>play('talkgel', 0.9),
    element: ".ozofriend.geli",
    expressions: {
        default: {
            image: "/img/sprites/obesk/geli/bsteli/portrait.gif",
            exec: ()=>document.querySelectorAll('#bsteli').forEach(el=>el.setAttribute('expression', ''))
        },
        bstrd: {
            class: "bastard-font",
            image: "/img/sprites/obesk/geli/bsteli/portrait_bstrd.gif",
            voice: ()=>play('talkgel', 0.75),
            exec: ()=>document.querySelectorAll('#bsteli').forEach(el=>el.setAttribute('expression', 'bstrd'))
        },
        concern: {
            image: "/img/sprites/obesk/geli/bsteli/portrait_concern.gif",
            exec: ()=>document.querySelectorAll('#bsteli').forEach(el=>el.setAttribute('expression', 'concern'))
        },
        happy: {
            image: "/img/sprites/obesk/geli/bsteli/portrait_happy.gif",
            exec: ()=>document.querySelectorAll('#bsteli').forEach(el=>el.setAttribute('expression', 'happy'))
        },
        think: {
            image: "/img/sprites/obesk/geli/bsteli/portrait_think.gif",
            exec: ()=>document.querySelectorAll('#bsteli').forEach(el=>el.setAttribute('expression', 'think'))
        },
        uncanny: {
            image: "/img/sprites/obesk/geli/bsteli/portrait_uncanny.gif",
            exec: ()=>document.querySelectorAll('#bsteli').forEach(el=>el.setAttribute('expression', 'uncanny'))
        },
        blueeyes: {
            image: "/img/sprites/obesk/geli/bsteli/portrait_blueeyes.gif",
            exec: ()=>document.querySelectorAll('#bsteli').forEach(el=>el.setAttribute('expression', 'blueeyes'))
        },
    },

}

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
        dog<+>dog
            SHOWIF::"unity_dog"
        akizet<+>wakizet
            SHOWIF::"pit__f3_unity"
        fake me?<+>stowaway
        fairy teaching stowaway?<+>stowfeast
            SHOWIF::"ozo__e_f_stow"
        mask?<+>mask
            SHOWIF::["ozo__geli_freedom", false]
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

wakizet
    self
        what do you think of the akizet thoughtform?

    bsteli::think
        oh!! well...
        it is a little strange to have an akizet out here
        especially a 'real' one...

    bsteli::concern
        but, of course, make no mistake--i am very glad to have her!
        i have just spent so much time watching her
        another her, stumbling blindly through the same tragedies,
        carrying so much stress from a life that she never even really lived...
        even now, this one is like a wounded creature,
        cowering from us beneath the same shelter,
        tense, and ready to strike back at the slightest motion!!
    
    bsteli::think
        ...

    bsteli
        but all are certain we can help her, and she is not unreasonable!
        i simply hope we can help her find a more comfortable existence, here
        and, you know, when she is more acclimated...

    bsteli::happy
        perhaps she might even enjoy our favorite dream!!
    
    bsteli
        we must simply be patient

    RESPONSES::self
        yeah<+>oloop
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

freedom
    self
        todo 
    
    RESPONSES::self
        cool<+>oloop
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

____SHOWIF::["framemodes_unlocked", false]
    bsteli
        oh! and interloper!

    bsteli::think
        the dream is already quite fun, i think...

    bsteli::happy
        but i have prepared another 'MODE', as the BSTRD would call it!
    
    bsteli
        the BSTRD was very interested in intensity, and, well...

    bsteli::bstrd
        so am I!!! }:P

    bsteli
        but i wondered, what if we took it slower?
        whether that interests you or not...
        this will at least make it simpler for the others to make new 'MODES', if they like!
        
    bsteli::happy
        i imagine the fairy might enjoy the opportunity! ahaha!

    bsteli
        once you have entered the dream, take a close look at the wheel's terminal!
            EXEC::change("framemodes_unlocked", true)
____END

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
        15% is default
    
    RESPONSES::self
        normal (15%)<+>loop
            EXEC::change("e3a2_fishchance", "0.15")
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

createEntity({
    name: 'GELI',
    type: "thoughtform obesk collapse portrait-contain portrait-blocker",
    image: "/img/sprites/obesk/geli/bsteli/portrait.gif",
    pathLimit: "/local/ozo/",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'personable golem with a strong tir echo';'either unable or unwilling to perceive reality as it was'</span>
    ::ADDITIONAL NOTE::<span style='color: var(--bastard-color)'>'now free'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'no cohesion'">::INCOHERENCE DETECTED</span>`,
    actions: [
        {
            name: "greet",
            exec: ()=>{
                startDialogue("geliintro")
            },
            showIf: () => check("stageroom", "underlobby") && check("e3a2__geliintro", false) && !check("e3a2escape", "in_progress")
        },
        {
            name: "question",
            exec: ()=>{
                startDialogue("++bsteli")
                vnp({bg: false, hideStage: true, bsteli: "show"})
            },
            showIf: () => !check("freedomtut") && (check("e3a2__geliintro") && (check("stageroom", "underlobby") || check("stageroom", "ozo_lostone") || check("e3a2escape", "in_progress")))
        },
        {
            name: "unity",
            class: "act-ozo",
            exec: ()=>{
                cutscene(true)

                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)

                setTimeout(()=>{
                    cutscene(false)
                    vfx({type: 'beacon', state: false})
                }, 3000)

                switch(check("stageroom")) {
                    case "underlobby":
                        chatter({ actor: "bsteli::happy", text:"almost there, interloper!!", readout: true, delay: 3000})
                    break

                    case "ozo_council":
                    case "ozo_fairy":
                    case "ozo_flower":
                    case "ozo_lostone":
                        chatter({ actor: "bsteli::concern", text:"yes? what about it?", readout: true, delay: 3000})
                    break
                }
            },
            showIf: [["mask", "unity"]]
        }
    ]
})

createEntity({
    name: 'wheel',
    type: "thoughtform portrait-cover portrait-dark",
    image: "/img/local/critta/wheel.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'unique scenery'
    ::INHERITED CONTEXT::<span class="bastard-color bastard-font" definition="INHERITED CONTEXT::'BOAT ON OCEAN = NO TILES';'SO NOW U A PIRATE';'>%^)'">'use 2 drive';'watch out'</span>`,
    pathLimit: "/local/beneath/embassy/",
    actions: [
        {
            name: "approach",
            exec: ()=>{
                env.e3a2.toggleMap()
            },
            showIf: ()=> env.stage.name == "vessel"
        },
        {
            name: "engage",
            exec: ()=>{
                if(check("e3a2escape", "in_progress")) {
                    startDialogue("escapeinitiate")
                } else {
                    startDialogue("startrun")
                }
            },
            showIf: ()=> env.stage.name == "underlobby" && !check("gameplay_off")
        },
        {
            name: "bypass",
            exec: ()=>{
                if(check("e3a2escape", "in_progress")) {
                    startDialogue("escapeinitiate")
                } else {
                    startDialogue("startrun_bypass")
                }
            },
            showIf: ()=> env.stage.name == "underlobby" && check("gameplay_off")
        },
        {
            name: "dream",
            exec: ()=>{
                startDialogue("dreamrun")
            },
            showIf: ()=> env.stage.name == "ozo_lostone" && check("++bsteli-replay") && !check("gameplay_off") && !(content.getAttribute("event") || "").includes("geli")
        },
        {
            name: "dream of escape",
            exec: ()=>{
                startDialogue("dreamescape")
            },
            showIf: ()=> env.stage.name == "ozo_lostone" && check("++bsteli-replay") && !check("gameplay_off") && !(content.getAttribute("event") || "").includes("geli")
        },
    ]
})

createEntity({
    name: 'radio',
    type: "thoughtform portrait-cover portrait-dark",
    image: "/img/local/critta/radio.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'unique scenery';'evil mode';'hehe'
    ::INHERITED CONTEXT::<span class="bastard-color bastard-font" definition="INHERITED CONTEXT::'IM ACTUALY RLY CLOSE OUTSIDE';'CANT JUST DO ANYTHING';'HAVE 2 COMPLY W/ MEMORY JUSTIFICATIN REQS'">'da lifeline'</span>`,
    pathLimit: "/local/beneath/embassy/",
    actions: [
        {
            name: "call bstrd",
            exec: ()=>{
                startDialogue("bstrd")
            },
            showIf: [["PAGE!!dream", false], ["stageroom", "vessel"]]
        },
        {
            name: "call geli",
            exec: ()=>{
                startDialogue("++bsteli")
                vnp({bg: false, hideStage: true, bsteli: "show"})
            },
            showIf: [["PAGE!!dream", true], ["stageroom", "vessel"]]
        },
        {
            name: "change music",
            exec: ()=>{
                startDialogue("bgm")
            },
            showIf: [["PAGE!!dream", true], ["stageroom", "vessel"]]
        },
    ]
})

createEntity({
    name: 'basterminal',
    type: "thoughtform portrait-dark",
    image: "/img/local/critta/terminal.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'unique scenery';'evil mode';'hehe'
    ::INHERITED CONTEXT::<span class="bastard-color bastard-font" definition="ANALYSIS::'HUMORS = ACTIONS';'AWESOEME';'TY GLI'">'cool editor'</span>`,
    pathLimit: "/local/beneath/embassy/",
    actions: [
        {
            name: "shells",
            exec: ()=>{
                togglePartyMenu()
            },
            showIf: ()=> env.stage.name == "vessel"
        },
        {
            name: "modify dream",
            exec: ()=>{
                startDialogue('dreammod')
            },
            showIf: ()=> env.stage.name == "ozo_lostone"
        },
    ]
})

createEntity({
    name: 'exchange terminal',
    type: "thoughtform portrait-dark portrait-cover",
    image: "/img/sprites/combat/items/cube_dither.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'unique scenery';'evil mode';'hehe'
    ::INHERITED CONTEXT::<span class="bastard-color bastard-font" definition="INHERITED CONTEXT::'I HAVE 2 MAKE SURE IT MAKES SENSE W/ MEMORY SHT';'SFER SEEM LIKE SOLID IDEA :P';'TY JELY'">'reimprinting thingy';'trade justification'</span>`,
    pathLimit: "/local/beneath/embassy/",
    actions: [
        {
            name: "exchange",
            exec: ()=>{
                startDialogue("merchant")
            },
            showIf: ()=> env.stage.name == "vessel"
        },
    ]
})

createEntity({
    name: 'interloper',
    image: '/img/sprites/loper.gif',
    type: "thoughtform portrait-top portrait-cover portrait-blocker",
    text: `::INCOMPLETE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection locus'${check("e3a2__escapewin")?`
    ::INHERITED CONTEXT::<span style='color: var(--bright-color)' definition="NOTE::'malformed context';'potential tampering'">'what do you think, stowaway?'</span>
    ` : ""}`,
    pathLimit: "/local/beneath/embassy/",
    exmExec: ()=>{
        if(!check('e3a2_loperxamine')){
            change('e3a2_loperxamine', true)
            setTimeout(()=>{readoutAdd({message: "wow, look at that... it's like it's not even fully formed", name:"moth"})}, 3000)
        }
    },
    actions: [
        {
            name: "question",
            exec: ()=>{
                startDialogue("stowaway")
            },
            showIf: ()=> env.stage.name == "ozo_lostone"
        }
    ]
})

/* dog - used across beneath, golem, and ozo */
env.stageEntities['â”¼'] = {
    class: "blocks notile",
    contains: {
        class: "isopod_host",
        html: "<figure class='isopod instant'><div class='isopod_joint'><div class='target' entity='dog'></div></div></figure>"
    }
}

env.dogSetup = ()=>{
    let isopod = env.stage.real.querySelector('#realgrid .isopod')
    isopod.joint = isopod.querySelector('.isopod_joint')
    isopod.xy = {x: 0, y: 0}
    isopod.moves = 0

    function getRandomValidTile() {
        var output = false
        var tries = 0 //max of 10
        if(document.querySelector('#realgrid')) {
            var tile, xy
            while(tries < 10 && output == false) {
                tries++
                xy = {x: rand(0, env.stage.stageW), y: rand(0, env.stage.stageH)}
                tile = elementAtStageCoordinates(xy.x, xy.y)

                if(!tile) continue //not sure when this would happen but it'd be bad :P
                if(tile.classList.contains('gridpiece') && !tile.classList.contains('blocks') && !tile.classList.contains('notile')) {
                    output = tile
                    output.xy = xy
                }
            }
        }

        return output
    }

    function animateCritter() {
        if(body.classList.contains("in-combat")) return;
        let tile = getRandomValidTile()
        if(tile) {
            isopod.style.setProperty('--x', tile.xy.x)
            isopod.style.setProperty('--y', tile.xy.y)
            isopod.joint.style.setProperty('--angle', calculateAngle(isopod.xy.x, isopod.xy.y, tile.xy.x, tile.xy.y))

            isopod.xy = tile.xy
            if(!isopod.moves) setTimeout(()=>isopod.classList.remove("instant"), 100);
            isopod.moves++
        }
    }

    animateCritter()
    env.stages.isopod = setInterval(animateCritter, 10000)
}

createEntity({ 
    name: 'dog',
    type: "thoughtform portrait-cover portrait-dark",
    image: "/img/local/embassy/isoportrait.gif",
    pathLimit: "/local/ocean/embassy/golem/",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'a <span class="code" definition="NOTE::'partial translation';'implied closest cultural equivalent'">dog</span>'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'ignoring thoughtform specifications'">::INCOHERENCE DETECTED</span>`,
    exmExec: ()=>{
        setTimeout(()=>play("talkgel", 3), 400)
        if(!check('dog')) {
            change('PAGE!!dog', true)
            change('dog', true)
            setTimeout(()=>chatter({actor: 'moth', text: 'did that say dog? is there a dog in the embassy', readout: true}), 3000)
            setTimeout(()=>chatter({actor: 'moth', text: 'no, wait...', readout: true}), 6000)
            setTimeout(()=>chatter({actor: 'moth', text: 'ok that\'s stupid. nevermind it\'s a bug', readout: true}), 12000)
        }

        entityOffPageMarkScanned("dog", "..__GOLEM_MAINTENANCE__..")
    },
    actions: [
        {
            name: "unity",
            class: "act-ozo",
            exec: ()=>{
                cutscene(true);
                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)

                env.setTimeout(()=>{
                    vfx({type: 'flash', state: true})
                }, 1000)

                env.setTimeout(()=>{
                    readoutAdd({message: `<p>ATTENTION::'thoughtform activity detected'::'resources removed'</p>`, name:"sys"})
                    vfx({type: 'flash', state: false})
                    vfx({type: 'beacon', state: false})
                    cutscene(false)
                    change("unity_dog", true)
                    document.querySelectorAll('#realgrid .isopod').forEach(el=>el.remove())

                    clearInterval(env.stages.isopod)
                }, 2000)
            },
            showIf: [["mask", "unity"], ["e3a2__escapewin", true], ["unity_dog", false]]
        }
    ],
})