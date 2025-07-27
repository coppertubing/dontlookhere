/* 

    get around sections quickly by CTRL+Fing "!P#"
    i.e. !P1 is entry dialogues, !P2 is lesser mind, so on, in order

*/

env.dialogueActors["okidoia"] = {
    voice: ()=>play('okidoia'),
    expressions: {
        default: {
            voice: ()=>play('okidoia'),
        },
        dark: { 
            type: "mutter",
            voice: ()=>play('scarydoia'),
        },
    }
}

env.dialogueActors["movefriend"] = {
    elementID: "movefriend0",
    image: "/img/local/embassy/liftfriend.gif",
    type: "obesk uppercase",
    voice: ()=>play('talk', 0.8)
}

env.dialogueActors["archivist"] = {
    type: "obesk qou portrait-contain portrait-blocker mutter",
    voice: ()=>play('scarydoia', 0.7),
    image: "/img/sprites/combat/foes/archivistportrait.gif"
}

env.dialogueActors["telyu"] = {
    image: "/img/sprites/obesk/telyu/portrait.gif",
    type: "obesk qou portrait-contain",
    voice: ()=>play("talkmind", 1.5), 
    expressions: {
        default: {
            image: "/img/sprites/obesk/telyu/portrait.gif"
        },
        dark: {
            image: "/img/sprites/obesk/telyu/portrait_dark.gif"
        },
    }
}

env.dialogueActors["isabel"] = {
    image: '/img/local/uncosm/ozo/flowerfriend_portrait.gif',
    type: "thoughtform flowerfriend recollection portrait-cover portrait-bright",
    voice: ()=> play('talkflower')
}

env.dialogueActors["idril"] = {
    image: "/img/sprites/obesk/idril/portrait.gif",
    type: "obesk qou portrait-contain",
    voice: ()=>play("talkmind", 0.8)
}

/* core dialogues in order */
/* transition from EP3 is at the end of embassy_golem.js */
env.dialogues["move"] = generateDialogueObject(` 
start
    sys
        ATTENTION::'continuing memory stream'
        NOTE::'inheriting iteration context'
    
    sourceless
        corroyi murmurs beyond the walls as we descend to threats unknown
        the movefriend barely fits us together, elbow to elbow
        miltza's third arm fidgets with her others - we are beyond escape, and i feel it eats at her
            EXEC::vnp({miltza: "showleft", bg: true})
        itzil is awake within the golem with karik, and both are frighteningly quiet...
            EXEC::vnp({ikgolem: "showleft", miltza: "hide"})
        but i feel a bubbling grief and rage through our connection, which karik must be trying to temper
        bozko rests against a wall and silently assists in prying apart the golem viscera we dragged in,
            EXEC::vnp({bozko: "showleft", ikgolem: "hide"})
        while cavik fashions his explosives from their organs...
            EXEC::vnp({cavik: "showleft"})
        there is an excitement in his motions - perhaps the only among us to carry unwavering confidence in our plan
        and tozik, tending to gakvu's timestopper connector, seems concerned over her new complaints
            EXEC::vnp({cavik: "hide", bozko: "hide", tozik: "showleft", gakvu: "showleft"})
        she clutches her head as if afflicted by a larval migraine
        it started only a θblink ago, not long after we started to descend, strangely
    
    gakvu
        another thing you cannot hear, huh?
            EXEC::vnp({tozik: "show", gakvu: "show focus"})
        it is like a buzzing, too many quiet words to understand
        i can make do, it is just terribly distracting
        
    tozik
        no, and not even after swapping our connectors
            EXEC::vnp({tozik: "focus"})
        but you are right about communications
        there must be other dull-equipped golems doing what the dullzika had done,
        as the wall of noise is almost identical
        ...and it hurts you, all the same, even without a communicator
    
    sourceless
        tozik hands the connector back to her, where it finds a home upon her receptor again
    
    tozik
        another hint at some greater truth of this attack signal, still yet to form a whole
        but i feel it is safe to assume that whatever is attacking us is using something... <em>approximating</em> groundsmindry
        that is surely why you can sense it, even when we cannot
        
    gakvu
        well obviously
    
    sourceless
        it is plain in tozik's receptors that he was not done speaking,
        and he is left staring at gakvu with a flat expression
        it strikes clear regret into her
    
    gakvu
        ah... sorry tozik
            EXEC::vnp({tozik: "show", gakvu: "show focus"})
        the signal, or noise, or whatever--it is causing such incessant irritation
        but aside from it, i do have an insight to share
    
    tozik
        i was simply thinking aloud
        speak, gakvu
    
    gakvu
        in our foes, whenever i have twisted or struck them...
        and occasionally in the remains of others we have left in our wake,
        i have glimpsed vague shapes of the instruction left by the hostile signal
        you are right--all this time, on a surface level, it has <em>felt</em> like groundsmindry
        it has the same authority, the same texture as re-instruction
        like when vekoa instructed that golem to help us before this started
        but the more i think about what i have seen, the more it vexes me
        they were not given new directives, for there were no clear thoughts to find
        it was deeper, more abstract... 
        they were impulses, like emotions, not clear thoughts
        longing, or anger, or desperation--or all of them, 
        but beyond them, different somehow
        it is violent, messy...
        not just inspiring them to kill us, but gradually changing their internals
        ah, given velzie's inordinate fondness for parasites, i want to call it an infection
        it is almost nostalgic

    cavik
        i think i noticed something similar...
            EXEC::vnp({cavik: "showright far focus", gakvu: "defocus"})
        of the dull nodes i harvested from golems we have been fighting,
        the most recent ones are so weirdly malformed
        i had to actually break some of them off from their bodies!

    gakvu
        right, dull nodes are some of the strange ones
            EXEC::vnp({cavik: "hide", gakvu: "focus"})
        in what i saw, it must have targeted specific organs
        communications, dull components, anything with connectivity,
        leaving marks, rewriting their purpose more deeply than i could understand...
        spreading outwards, fusing together, creating unfamiliar shapes
        at first i thought it was simply a result of our foes sludging and incohering,
        but after seeing more, it is deeper than that...
        it is intentional, but incomplete
        does this make any sense? i struggle to place it in words
        anything touched by the signal has been changing, slowly
        to what end, only velzie may know
    
    tozik
        'infection' is fitting
            EXEC::vnp({tozik: "focus"})
        but what does that make of us? wounds aside, none have shown any symptom
        yet i clearly recall the signal passing through me
    
    gakvu
        well, think about how inconsistent it has been
            EXEC::vnp({gakvu: "focus"})
        only some devices, only some golems... 
        some risen against us, some entirely sludged by the signal, or unresponsive
        you recall how movefriend simply began to die, instead of immediately trying to kill us?
    
    tozik
        yes, the echo was still intact... like geli's, or barfriend's
    
    gakvu
        it seems like consciousness is a barrier, to some extent...
        but it also must be that it can attempt to grasp something and fail
        either by luck, a bad connection, or failing to break through strong instruction
        like that of our mindcores
        i think of when the first signal hit, how in my brief unconsciousness, 
        it must have nearly taken hold of my leg, for it began to melt and change
        but at once, almost without thought, i rose and fixed it
        i was able to reform it as if it were a simple incorrect shape instruction after sitting for too long
        it only struck me as strange after we began to see more
    
    itzil
        what about my kivii?
            EXEC::vnp({ikgolem: "showright focus"})
    
    sourceless
        itzil's interjection inspires a brief silence
        i did not want to bring it up with their sensitive state, but...
        it had been on my mind as well
        how dozkallvi seemed to hold her memories, yet still declared us usurpers...
        inviting us to 'come with' her, just before shattering her mindcore
    
    akizet
        ...it was damaged
            EXEC::vnp({ikgolem: "defocus"})
        her mindcore, it had a deep wound upon it
        is that enough for it to seize us?
        
    tozik
        a frightening thought, given the precise targeting of our foes
            EXEC::vnp({tozik: "focus"})
        this whole time, i thought they were simply destroying them
        but now i worry--what if they were not just broken, but changed?
    
    sourceless
        bozko remains upon his duties, clearly listening, but indifferent
        is it unusual that miltza has not given her insight? does she have any?
        she fidgets so strangely, clearly uncomfortable with the topic
        no, i am overthinking this--it is just a worrying thing to discuss, that is natural
    
    tozik
        well... whatever the truth may be
        we will pry it from velzie in time
    
    sourceless
        his timing is well-placed, for the murmur of corroyi slows to a halt
        a gentle thud marks our landing upon the pale corru base of the spire
    
    movefriend
        hello everyone!!
            EXEC::vn.done()
        we have arrived!
        fortunately the structure here is still holding, so the entry vein is open!
        are you ready? i can open the path now!
        i will wait here for you this time! corroyi pressure is fine!
    
    akizet
        just a moment, movefriend
    
    sourceless
        everyone stands fully, organizing themselves and their weapons
            EXEC::vnp({miltza: "show far", ikgolem: "show far", bozko: "show far", cavik: "show far", tozik: "show far", gakvu: "show far", bg:true})
        i should only need to briefly reiterate the plan
        especially after the exhaustive deliberation done during our preparations
    
    akizet
        all right, it is as we planned
        our efforts have all proceeded as expected, and this final victory will be no exception
        these foes have shown themselves to be rabid, acting with singular purpose, but without tactics
        and as in a true infestation, this is our greatest advantage
        once we enter, split into your groups
        follow the ring-hall of the groundsmindry in opposite directions, until we meet again
        remove attackers, clear chambers, find survivors, reunite for great threats if needed...
        and when the core is defenseless, we enter the central chamber to seize it
        gakvu or tozik, you are up for interim groundsmind when the time comes
        are we all aligned?
    
    sourceless
        receptors wave with affirmation: we are of one mind
    
    gakvu
        just to repeat what i said before...
        i have a mindcore capable of groundsmindry, but that does not mean i know how to operate an entire structure
    
    tozik
        neither do i, but we will do what we must
        if i am incapacitated, you must be the one to take the core
    
    gakvu
        yeah... right
        
    sourceless
        we are ready, then
        i will guide us to victory, and correct my terrible mistake
    
    akizet
        open the path, movefriend

    sys
        ATTENTION::'party functionality';'augments';'now disabled'
        NOTICE::'all party member actions upgraded to accommodate'
        NOTICE::'exception';'symbiotic rifle';'activate via item'
            SHOWIF::'item|sorry_cyst'
        NOTICE::'exception';'signal inverter';'directly upgraded gakvu actions'
            SHOWIF::'item|core_translation'

____SHOWONCE::

    moth
        bullshit
        oh well
        i guess that's how it goes with something fluid like this

____END

____SHOWIF::"gameplay_off"
    sys
        ATTENTION::"altered gameplay system ahead"
        NOTICE::"gameplay is presently disabled"
        NOTICE::"re-enable in SYS menu if undesired"
____END

    RESPONSES::akizet
        let us go<+>END
            EXEC::vn.done()

SKIP::vn.done()
`)

/* ENTRY DIALOGUES - !P1 */
env.dialogues["entrance"] = generateDialogueObject(` 
start
    sourceless
        the entry vein - our first step
        one of the only paths into the groundsmindry θsegment's shell
        the entire θsegment is a fixed shape, like golem maintenance, but out of structural necessity
        formed from a mixture of black corru and dead sediment, creating a unique marbling and shimmer
        the rare 'pale corru'... a misleading name, for it is closer to dead metal
        but it is ornate, as it ought to be, given its importance here
        ...that i even have time to think about this is unexpected
        for there are no foes. it is quiet...
        not even a single golem or qou-body marks this place
        some relief passes through our connection, until we get a better look
        luminescent swarm displays nearby flare with warnings
        our groundsmindry sigil is in disrepair, almost rotting
        behind it, a wall-length θwindow pulses with bright nonsense, illuminating the area further
        still working, trying to show something, but failing
    
    timestopper
        strange...
        operate according to the plan
        cavik, tozik - check the terminals, the state of the θsegment
        akizet will watch over you
        itzil, karik, bozko, miltza - check the doors to adjacent chambers
        if you find any foes, immediately retreat
        if there are no foes in there either, return to notify us
        we should not split up too much before we are ready
        oh, and gakvu, sense what you can from here
        the core should just be beyond this wall, i think
    
    sourceless
        the team sets out to their duties
            EXEC::change("PAGE!!e4prog", 1);refreshStage({noFlash: true})
        there is a θblink to examine the area

    sys
        NOTICE::'marked entities contain dialogue unique to this stream segment'
        ADVISE::'interact before advancing';'utilize PROCEED entity to save or advance stream'
    
    RESPONSES::akizet
        set out<+>END

SKIP::change("PAGE!!e4prog", 1);refreshStage({noFlash: true})
`)

/**** ENTRANCE !P1O ****/
env.dialogues["entrance_cavik"] = generateDialogueObject(` 
start
    sourceless
        how strange that they placed these status views here
            EXEC::pauseSwapCam();setCam({x: 5.5, y: 11, rotation: -60});
        perhaps these swarm displays would normally be a prideful display for visitors
        but now, they only serve as a new stressor, for the spire is in dire condition
        perhaps even worse than i expected
        cavik steps among them, testing to see which still respond to his gestures
    
    akizet
        cavik!
        what do you see?
    
    cavik
        oh, akizet, it is really something!
        i have never seen a spire break down like this
        look, over here, this view of the archival spine status is clearest
            EXEC::setCam({x: 6, y: 14, rotation: -90})
        most of the critical damage is actually centered around the veins of the archival spine
            EXEC::vnp({arbitrary: "show URL::/img/local/embassy/mind/map_spine.gif", hideStage: true, bg: false})
        while the spinal column itself is mostly unharmed...
    
    akizet
        what could cause this sort of damage?
    
    cavik
        well, some of it is debris from the upper veins collapsing into lower ones, but...
        from what i can gather, it actually started with resource issues
        the spine has its own dedicated spireblood circulation, independent of the spire's hearts
        and <em>all</em> of it has been getting drawn away, pulled down here
        that alone would not have caused the damage, if not for the hearts themselves slowing
            EXEC::vnp({arbitrary: "hide", hideStage: false, bg: false})
        but you can see over on this one--the hearts have been stalled for a while!
            EXEC::setCam({x: 4, y: 14, rotation: 90})
        there is gakvu's work in the middle, there
            EXEC::vnp({arbitrary: "show URL::/img/local/embassy/mind/map_heart.gif", hideStage: true, bg: false})
        that dip in the center, as well as near the second heart!
        how minor it seems, when placed like this... 
        or perhaps it is already mostly undone
            EXEC::vnp({arbitrary: "hide", hideStage: false, bg: false})
        and with these other views, do you see it?
            EXEC::setCam({x: 4, y: 11, rotation: 80})
        this strange distortion... a loss of pigmentation and cohesion in the light-swarm
            EXEC::vnp({arbitrary: "show URL::/img/local/embassy/mind/map_mind.gif", hideStage: true, bg: false})
        these ones are not responding to me, so i am not sure what is really going on there
            EXEC::vnp({arbitrary: "hide", arbitrary2: "show URL::/img/local/embassy/mind/map_structure.gif"})
        but that dark pattern is so familiar, too, like...
        ah... do not mind my speculation!
        go, attend to the others
            EXEC::vn.done();setCam({x: 5.5, y: 11, rotation: -60})
        i will let you know when i have a conclusion!!
    
    akizet
        i will leave you to it, then
        
    RESPONSES::akizet
        be prepared to move<+>END
            EXEC::pauseSwapCam(false);playerMoveTo(5,11);setCam()

END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
SKIP::pauseSwapCam(false);playerMoveTo(5,11);setCam();vn.done()
`)

//tozik on da computah :b
env.dialogues["entrance_tozik"] = generateDialogueObject(` 
start
    sourceless
        tozik puzzles over this faulty terminal
            EXEC::pauseSwapCam();setCam({x: 4.5, y: 2.5, rotation: 0});
        he swats at the luminescent swarm forming the floating display,
        cutting into it with his corruskivi from the side, looking for something within
        this other side is still operational, though
            EXEC::setCam({x: 5.75, y: 2.25, rotation: 50})
        it appears like it would normally be a map of the area
            EXEC::vnp({arbitrary: "show URL::/img/local/embassy/mind/map_groundsmindry_bigger.gif", hideStage: true, bg: "original"})
        a central groundsmindry core, surrounded by five chambers
        this is one of them, minor as it seems
        lesser chambers attach to the halls, probably serving as personnel and storage
        but most of this is obscured by incoherence
            EXEC::vn.done()
    
    akizet
        tozik!
            EXEC::setCam({x: 4.5, y: 2.5, rotation: 0})
        what is happening?
    
    tozik
        it looks like this terminal was disconnected from all input at some point
        i am trying to check its core, so that i may directly access what it knows
        specifically when it lost input
        but if you mean around the θsegment, the display has drifted too much to tell
        one of the chambers looks damaged, but the rest seem fine
        if you ignore the flickering circle in the center
        give me a θblink and we will have our answer
        
    RESPONSES::akizet
        will do<+>END
            EXEC::pauseSwapCam(false);playerMoveTo(4,3);setCam()

END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
SKIP::pauseSwapCam(false);playerMoveTo(4,3);setCam();vn.done()
`)

/* ENTRANCE - !P1, prior to leaving for spine */
env.dialogues["entrance_proceed"] = generateDialogueObject(`
start
    sourceless
        i linger near gakvu, watching over the team as they find what they can
            EXEC::setCam({x: 7, y: 2, rotation: 0});
        but something about the twist of her receptors in particular worries me
        she stares into the θwindow... or perhaps beyond it
    
    akizet
        what is it?
    
    sourceless
        even with a closer look at the θwindow,
        trying to make sense of what it shows is fruitless
            EXEC::setCam({x: 7.5, y: 1.5, rotation: 0})
        it is nothing, just squirming black and white pigmentation
            EXEC::setCam({x: 7.5, y: 1.5, rotation: -15})
        simply incoherence, or... 
        a true attempt to display what is within the core chamber?
    
    gakvu
        this is where that buzzing was coming from
            EXEC::setCam({x: 7, y: 1.5, rotation: 0});
        but this close, it does not pain me as it did
        yet it is so much clearer now... and it is not without sense

    sourceless
        gakvu's chuckle carries a bitter hate
    
    gakvu
        in my larval youth, throughout my work upon the okizika,
        if the clouds parted at the start of a θgaze's work, and velzie's eye could see us plainly,
        there was a song they made us sing, where our voices had to be in unison
            EXEC::env.noBgmDuck = true;
        the okidoia
            EXEC::changeBgm(env.grm.music_oki, {length: 20000, seek: 0});
        part genuine prayer, part to raise our spirits before our labor
        and part true intention:
        to call forth predators in the area, that we may eliminate them before getting deep into work
        that is what i feel now from this place
        the same sort of unison, like a cave-city in constant song
        but this song is not a sound, it is like a feeling that passes through me
        i would think it were some cruel mockery, a joke from our aggressor...
        ...if it were not only being spread through groundsmindry
    
    sourceless
        and in the silence of her pause, i realize,
    
    akizet
        actually, i think i can feel it too
    
    sourceless
        it grows stronger as i draw closer to the θwindow, and the effect is plain
            EXEC::setCam({x: 8, y: 1, rotation: 0});vfx({type: "okidoia", state: "mild"})
        like she says... it is not exactly a sound, yet i hear it
        as i listen--as i feel, i think of the signal, and i feel shreds of it in this song
        like half-remembered lyrics, forgotten again as they pass by
        i almost feel as if i can <em>see</em> the song, in the swirl of the θwindow
        when i look back to gakvu, she meets my gaze with great concern
            EXEC::setCam({x: 7, y: 1.5, rotation: 0});
    
    gakvu
        how could that...
            EXEC::vfx({type: "okidoia", state: false})
    
    sourceless
        behind us, cavik scurries closer
            EXEC::changeBgm(env.grm.music_coresong, {length: 10000});
    
    cavik
        it is a dull ceremony!!
            EXEC::vnp({cavik: "show far", hideStage: true})

    sourceless
        he speaks too quickly, too loudly for it to be good news

    cavik
        ah, forgive my volume,
            EXEC::vnp({cavik: "show"})
        i believe the groundsmindry chamber is being used for a ceremony...
        that is--the precursor structure to a dull contrivance...
        but i have never seen it on this scale before!
        usually they are either very very small for testing,
        or very very large to make a proper continuous contrivance...
        if this completes, 
        i think it would be open just long enough to consume the entire embassy before closing!
        there must be an opposite side, a destination to reach, but...
        it is impossible to tell where that might be!
            EXEC::env.noBgmDuck = false
    
    sourceless
        what--?
        was this the true purpose of the attack?
        or an emergency measure taken by vekoa?
        feeling the shared shock of tozik and gakvu, a part of me screams to flee
        i seize cavik, glancing towards the θwindow again,
    
    akizet
        cavik--how much time do we have?
        the groundsmindry core, can it be recovered from this without destroying it?
        the entire embassy...
        do we simply cast our plan aside? flee?
    
    cavik
        ah--! aki, i do not know!
        it depends, ceremonies require a great deal of preparation and resources!
        in ideal conditions, they are nearly instant
        so we should not even have time to consider how to stop it
        but if the groundsmindry core is being used as the catalyst for it, i...
        i... i really cannot say
        it could be θwinks, or the whole θgaze, or it could--it could explode into a contrivance right now!!
        this is unprecedented, akizet! i really do not know...
        ...
        but i do know the core must still be intact
    
    sourceless
        i release cavik, relenting to pace anxiously
            EXEC::vnp({cavik: "far"})
        our next actions must be chosen carefully
        the light of velzie's gaze burns through me
        
    akizet
        all right, how can we stop it?
    
    cavik
        the ceremony must be ceased by the core itself...
        as i said, this structure requires a lot of effort and resources,
        a constant flow, really, in order to bloom and anchor itself so that the catalyst, um...
    
    sourceless
        his voice catches, his frantic selection of words falling short
        he speaks now upon matters he only barely understands
        and no one else has stepped in to help, so this is his knowledge alone...
    
    cavik
        sorry--in short, 
        if we could command the core to stop somehow, to close the gate it has formed,
        that would cut the ceremony off!
        or we could... destroy the core, but, you know...
        either way, until it is stopped, we really, really do not want to go in there!!
        there is this stage in ceremonies, while their tendrils are anchoring...
        an overlap, where, um...
        the dull kind of, presses against our side, and... oh, how do i phrase this?
        it starts to mix their conflicting natures, and--
        just gets very dangerous, yes?
        
    sourceless
        even after all i have seen, since the advent of dull technology,
        this is still beyond me to fully grasp
        but his fear is all i need to know
        gakvu stares into the light of the θwindow, searching
    
    gakvu
        but this does not make any sense
            EXEC::vnp({gakvu: "showright far", cavik: "far"})
        there is no reason the core should be able to do this
        ceremonies must be formed using truly massive grand cysts, right?
    
    cavik
        yes!
        but mainly for resource reasons...
        only a fraction of a catalyst's mass is actually used in managing the operation...
        the rest is consumed, used in the formation of tendrils and organs!
    
    gakvu
        ah...
        ...and what resource is greater than the embassy's critical systems
        
    sourceless
        tozik remains silent, having cut into the side of the map terminal for a direct connection
        from the doorway nearby, itzil, karik, and miltza return
            EXEC::change("PAGE!!e4prog", 2)
    
    karik
        the next room is empty - no golems, no qou, no bodies...
            EXEC::vnp({ikgolem: "showright far"})
        it is so quiet here
    
    sourceless
        bozko emerges from the other side not long after, receptors alert
    
    bozko
        the same in this direction
            EXEC::vnp({bozko: "showleft far"})
        some marks on the ground drag towards the groundsmindry core
        there may have been bodies once, but they were moved
        or moved themselves
    
    sourceless
        all at once, i feel the eyes and internal focus of the others upon me
        no foes, the core is untouchable...
        our plan... what about our plan?
        what can we even do?
    
    tozik
        hey
            EXEC::vnp({tozik: "showleft far"})
    
    sourceless
        tozik places a component back into the map terminal, gesturing to the display
        it still is unreadable
    
    tozik
        there is a part of the groundsmindry θsegment called the "dull mind"
            EXEC::vnp({tozik: "focus"})
        it is the marked one, near the top
    
    karik
        oh--they monitor dull activity and prevent internal collisions there!
    
    tozik
        right
        i have been trying to get some information on it from this terminal, but...
        the last sensory impulse it received must have been just after we arrived at maintenance
        and as of that impulse, it appears the dull mind is gone
        its region is giving no output at all
        not reporting collapse, or damage
        just... not responding, no sensory signals, nothing
        the structure of the entire θsegment otherwise seems fine
        the core chamber's status is far too incoherent to make any sense of
        but it is definitely still there
        and one other thing...
        there appear to have been no active entities anywhere
        golem, qou, or otherwise
    
    karik
        that does not make sense!
        could the groundsmindry team have evacuated already, somehow?
        the spinal tether could have served as another exit!

    tozik
        maybe, but no clear signs of that here
        
    sourceless
        so often have i led the charge, made these plans,
        that being bereft of direction leaves a tight coil in my receptors

    akizet
        well, what do you recommend?
    
    tozik
        one of the adjacent chambers is the "lesser mind"
        it seems to be a place where other qou could directly assist in groundsmindry duties
        a dead end if the dull mind is truly gone,
        but we may be able to use some of its equipment similarly to the override panel in golem maintenance
        make contact with the core if it is still there
        perhaps even stop it, or at least pry some time from velzie's claws
    
    akizet
        right... yes!
        come - let us all go together
        and if there is no way to stop it, then...
        let us at least search for survivors, 
        and... if we truly must, flee
    
    bozko
        flee?!
            EXEC::vnp({bozko: "focus"})
        
    akizet
        oh, bozko, ah...
        cavik, catch everyone else up on the situation as we move
        as you must have learned yourselves, this is not as straightforward as we thought...
    
    cavik
        will do!
    
    RESPONSES::akizet
        set out<+>END
            EXEC::vn.done();playerMoveTo(7,2);setCam();refreshStage({noFlash: true})

SKIP::env.noBgmDuck = false;changeBgm(env.grm.music_coresong, {length: 10});change("PAGE!!e4prog", 2);vfx({type: "okidoia", state: false});playerMoveTo(7,2);setCam();refreshStage({noFlash: true});vn.done()
`)

/* !P2A - lesser mind before combat */
env.dialogues["lesser"] = generateDialogueObject(`
start
    sourceless
        the lesser mind chamber...
            EXEC::pauseSwapCam()
        eerily quiet, given the horrors behind us
        also, quite bare
        while it could be an aesthetic choice,
        bozko did mention things being torn away, dragged to the core...
        no matter, the team sets out to investigate the area
        our objective is clear
        at least one of these pods is likely still functional

    sys
        NOTICE::'marked entities contain dialogue unique to this stream segment'
        ADVISE::'interact before advancing';'utilize PROCEED entity to save or advance stream'
    
    RESPONSES::akizet
        investigate<+>END
            END::pauseSwapCam(false)

SKIP::pauseSwapCam(false)
`)

// karik/itzil - akizet checks in with itzil mainly
env.dialogues["lesser_ik"] = generateDialogueObject(` 
start
    sourceless
        itzil and karik linger in our golem near the core chamber door
            EXEC::vnp({ikgolem: "show", hideStage: true})
        since that fight with the construction golem, they have sparsely said a word
        yet they are within our great weapon - there is some risk here
        so i approach

    akizet
        itzil, karik, hello!
        given the weight upon our receptors,
        i must ask: itzil, are you feeling well enough to fight?
        your and karik's combined minds will lend well to the golem's abilities, but...
    
    itzil
        akizet
        we will only be here once
        and it will be my only chance to exact vengeance for dozkallvi
        i will have the murderer answer for all that has been done
        until we meet again behind velzie's stage,
        i would have this be my only purpose
    
    sourceless
        itzil speaks calmly, but their bitter rage is clear
        this does not sit well with me 
        mate loss is always terminal--often imminently
        surface hunters charging into the dark for vengeance, cavernfolk growing unresponsive...
        madness in many shapes, lovingly drawn by velzie's cruel claws
        even with our larval flesh left behind, this curse follows us into θdeath eventually
        so while it is true that there is an intense driving force behind itzil now,
        a stray storm that may bend the veilk in our direction,
        i still fear it may be uncontrollable
        miltza, nearby, makes a clear grip of discomfort in her branched receptors
        but she is silent...
        and i cannot blame her - what is the choice, here?
        leave itzil alone in the movefriend?
        have them trail behind in their most vulnerable state, physically and mentally?
        besides, karik grounds them
        would it not be beneficial to itzil's chances of recovery,
        if we allow them to truly claim vengeance?
    
    karik
        do not worry, akizet!
        we have been speaking internally!
        i am quite confident in itzil's ability to help, it will be fine!
        
    RESPONSES::akizet
        all right<+>END
            EXEC::vn.done()

END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
SKIP::vn.done()
`)

env.dialogues["lesser_miltza"] = generateDialogueObject(` 
start
    sourceless
        miltza lingers near our golem, still quiet
            EXEC::vnp({miltza: "show far", hideStage: true})
        she fidgets with the small remote coordination drone we formed for her before descending
        a simple sphere, with robust dull positioning and propulsion
        it is possible that she is truly busy preparing it, but...
        really, i do not think she has said anything since we arrived
        clearly she is nervous, she always has been
        but it seems more intense than before - perhaps to the point of distraction
        some support should help, as the others investigate

    akizet
        miltza!
            EXEC::vnp({miltza: "show"})
        how beholds you?
        this is a worrying time, but, i worry for you as well
        is something troubling you?

    miltza
        oh, akizet, i...
        
    sourceless
        she places the drone in a pouch within her cloak
        it clinks against a number of other cysts, likely the ones retrieved from her room long ago
        her receptors stretch open and closed as she places words to her thoughts
    
    miltza
        i know that coming here, it was the right choice, but...
        i should hold nothing from you
        does it not feel like this is far, far out of our control?
        we are researchers, diplomats, a few engineers...
        and ceremonies usually demand several teams just to initiate, from what i know
        do you really think we can do anything about this?

    akizet
        under the light of velzie's attention, in moments of great pressure...
        they say that impossible outcomes become common
        but, i hold no delusion, miltza
        if there is truly nothing we can do, then it is as i said
        we will find survivors, and... quickly escape
        
    sourceless
        this answer feels wrong, but it is true
        escape is our only resort, should this be beyond our grasp

    miltza
        of course, of course...
    
    sourceless
        even with fleeing as an option, a thought that has come to her many times,
        there is no easing of her tension
        could it be something else bothering her?

    RESPONSES::akizet
        return to investigation<+>END
            EXEC::vn.done()

END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
SKIP::vn.done()
`)

env.dialogues["lesser_bozko"] = generateDialogueObject(` 
start
    sourceless
        bozko lingers quietly near the pods, inspecting them for damage
            EXEC::pauseSwapCam();setCam({x: 5, y: 10, rotation: 180});
        he seems to have settled on a potential candidate already, so i ask...
    
    akizet
        bozko!
        you mentioned earlier that it looks like things were moved?
    
    bozko
        yes
        probably bodies, but there were other spots that stood out to me
        damage in the ground, implying entirely missing terminals and equipment
        similarly dragged around, pulled from their ports, leaving trails of sludge
        some towards the core chamber's grand door,
        and others to halls leading further into the ring
        notice how this chamber has no auxiliary terminals, no storage?
        it is the same
        there was some greater effort here
        perhaps to serve as fuel
    
    akizet
        that is strange indeed
        a few storage containers and tool terminals would hardly help a ceremony's hunger, surely...
    
    sourceless
        bozko is quiet, similarly puzzled, but uninvested
        
    RESPONSES::akizet
        we will know in time<+>END
            EXEC::pauseSwapCam(false);setCam()

END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
SKIP::pauseSwapCam(false);setCam()
`)

//gakvu should be a little preoccupied with the weird veins that aren't from the ceiling
//she can call to karik, who answers like in the original intro - no, not standard.
env.dialogues["lesser_gakvu"] = generateDialogueObject(` 
start
    sourceless
        i approach gakvu, who stands apart from the others,
            EXEC::pauseSwapCam();setCam({x: 10, y: 2, rotation: 145, offsetCamera: "rotateX(-0deg)"})
        preoccupied with the web of veins extending from beneath the core chamber door
            EXEC::setCam({x: 10, y: 2, rotation: 115, offsetCamera: "rotateX(-20deg)"});
        they are barely visible, indentations left in the ground from their weaving        

    akizet
        gakvu!
        what is wrong?
    
    gakvu
        these veins...
        do you not feel the same unease?
        they make the floor uneven, and seem disorderly...
        not integrated with the ground systems, forcing their way through
        akizet, they must be new
    
    akizet
        they are unusual, now that you point to them...

    sourceless
        gakvu calls to our friends in the golem
    
    gakvu
        karik, is this standard?
        these ground veins?

    sourceless
        from the surprise in the golem's receptors, they must not have noticed either
    
    karik
        huh, no! 
        the groundsmindry θsegment here is designed to have resources running through the walls and floor already
        invisibly, through particular connections...
        so these should be unnecessary?
        the pod connections from the ceiling look right, 
        because those wire into the spine, i think
        but i do not know what these ones on the ground are...
        vekoa would not entertain this aesthetic choice either, from what i know of her
        she is one of those smooth stone types
    
    sourceless
        gakvu's eyes follow their path - from the door, to each of the lesser pods
        they form some sort of connection, merging disappearing into the flesh near each base

    gakvu
        well, i can only tell that these connect to the core somehow
        but same as our foes - there is no meaning i can glean from them
        they do not seem to be able to move, but...
        just try not to stand on them for too long
        
    RESPONSES::akizet
        strange...<+>END
            EXEC::pauseSwapCam(false);setCam()

END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
SKIP::pauseSwapCam(false);setCam()
`)

env.dialogues["lesser_tozcav"] = generateDialogueObject(` 
start
    sourceless
        tozik and cavik linger near the center of the chamber
            EXEC::pauseSwapCam();setCam({x: 7, y: 5.5, rotation: 180});vnp({cavik: "show shifttinyleft", arbitrary: "show URL::/img/local/embassy/mind/map_mind.gif", tozik: "show shifttinyright", hideStage: true, bg: "original"})
        there, a terminal displays the state of groundsmindry attendance throughout the spire
        a similar display to the one within the entry vein
        there is far too much detailed information for me to make sense of
        but the numerous alerts and requests are apparent
        critical damage is reported at the fringes of every spine branch
        and... there are far too many urgent calls for help
    
    cavik
        oh, this one is more readable! 
        according to this, there is no groundsmindry happening... at all?
        
    akizet
        the core--is it still intact?

    cavik
        it must be!
    
    tozik
        the core must be entirely occupied with the ceremony
        see that last activity? 
        it stopped being used for groundsmindry...
        at about the same time that map terminal stopped working
        which looks to be when we arrived at golem maintenance
        that must have been when the ceremony began
        by the looks of it, whatever her last command was...
        it caused an immense amount of strain to the entire system all at once

    cavik
        but... the golems there were projecting control sigils
        those only come from direct, continuous groundsmindry

    tozik
        right
        or something that the golems thought was close enough
        regardless, we should look for an intact pod
        i can make a direct connection to the groundsmindry system with them
        and maybe i can see some records, too...
        it is hard to tell just from this fading display,
        but i suspect that whatever vekoa did was done twice
    
    sourceless
        he gestures towards the mangled side information
        i cannot make sense of it, but he must recognize some figures
        
    tozik
        many calls come from before vekoa's last action
        and many of the spinal relays suffered just before them
        the signal we felt... the one that changed our golems
        while it may not have been groundsmindry as we know it,
        i truly believe it started from the core
        
    RESPONSES::akizet
        i see<+>END
            EXEC::pauseSwapCam(false);setCam();vn.done()

END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
SKIP::pauseSwapCam(false);setCam();vn.done()
`)

env.dialogues["lesser_attack"] = generateDialogueObject(`
start
    sourceless
        bozko lingers near an ideal pod, and so i call everyone's attention with an impulse through our connection
            EXEC::pauseSwapCam();setCam({x: 5, y: 9, rotation: -145});
        all begin to gather nearby, with a shared sense of vague unease

    bozko
        this one should work
    
    sourceless
        bozko feels around the pod's center-facing side, eventually finding the edges of a panel
            EXEC::setCam({x: 7, y: 10, rotation: -180})

    sourceless quiet
        with a tear, a circular hatch gives way to the dark interior
            EXEC::play("stab", 0.5);env.stage.real.querySelector('[origin-spot="188"]').classList.add("open")
    
    tozik
        ah... thank you, bozko
        i will give this a try first
            EXEC::vnp({tozik: "show downleft"})
        
    miltza
        i know these!
        they are just like the remote operation chambers back home
        a little more modern, but the same paradigm
        just... watch out, if it really is the same, then it will notify the groundsmind
        whoever holds the core will know we are here
    
    tozik
        if there is anyone in it at all at this point, they already do, given our movement
        the floors must still be feeding it sensory information
        let me see if this works
    
    sourceless
        tozik reaches within, pulling a wired connector from the interior
        he removes his timestopper connector from his favored receptor, and puts this new one in its place
        we all watch, anticipating a simple answer, but...
            EXEC::vnp({tozik: "show focus", bg: true})
        there is something in the wavering of his stance
        suddenly, he doubles over, gripping the connector
            EXEC::vnp({hideStage: true})
        with a quick motion, he tears it from his receptor, casting it away
        its physical tether snaps and it cracks upon the hard wall, splattering purple
        terror resonates through our connection
        miltza, nearest to him, takes a cautious step back
            EXEC::vnp({miltza: "showright far", tozik: "focus"})
    
    miltza
        tozik, are you--
    
    sourceless
        with an agonized groan, he grips his head, 
        the exposed corru of his qou-body rippling unnaturally, gaining a strange sheen
            EXEC::vnp({miltza: "hide"});ratween(env.bgm, 0.5, 3000)
        as if some sort of shockwave passed through him
        cavik quickly approaches to help, but tozik waves him away urgently
            EXEC::vnp({cavik: "showleft far", tozik: "focus"})
        bozko hovers closer, prepared, if... something is going wrong
            EXEC::vnp({bozko: "showright far", tozik: "focus"})
    
    tozik
        there... 
        there is something...
    
    cavik
        zÏö±÷4!!
        tozik, that is membrane failure, we need to act quickly!
            EXEC::vnp({cavik: "show focus"})
        how did that happen from just one connection...?
        nobody else connect to anything!

    sourceless
        tozik grips cavik's arm urgently
            EXEC::vnp({tozik: "show focus"})
        but his limbs move strangely, as if half asleep
        
    tozik
        i...
            EXEC::imagePreload("/img/textures/abberwobble.gif")
        ...it sees us
    
    karik
        uh, the golem is reporting--!
            EXEC::vnp({tozik: "hide", bozko: "hide", miltza: "hide", cavik: "hide", ikgolem: "show"})
        everyone, get away from the core!!
            EXEC::setCam({x: 7, y: 4, rotation: 0, height: 1, offsetCamera: "rotateX(30deg)"})
    
    sourceless
        our focus shifts to the grand door to the groundsmindry, as we shelter between the pods
            EXEC::change("TEMP!!lshift", 1);refreshStage({noFlash: true});vn.done();env.noBgmDuck = true
        where we expect them to open, maybe to reveal an attacker....

    sourceless quiet
        the okidoia, heard once gently, screams through our minds
            EXEC::env.noBgmDuck = true;vfx({type: "okidoia", state: true})
        it is like a shockwave of madness, invisible tendrils curling out from the core
            EXEC::flash(true);play('criticalError', 0.3);changeBgm(env.grm.music_oki, {length: 5000, seek: 0, rate: 1.2});env.stopBgmChanges = true
        and before we can move, it passes over us
            EXEC::change("TEMP!!lshift", 2);refreshStage({noFlash: true});content.classList.add("forcewobble")
        a sourceless light suffuses the chamber, illuminating shapes we cannot see
            EXEC::flash(false);env.embassy.slowCam()
        in the presence of their vibrance, edges grow inaccurate, shapes twist and expand
        color bleeds from everything, mixing in the air, apart from their objects
            EXEC::setCam({x: 7, y: 4, rotation: 180, height: 1, offsetCamera: "rotateX(30deg)"});env.stopBgmChanges = false
        the ceiling--is it gone? is this a projection?
        something presses against it, as if looking in at us

    akizet
        cavik? tozik? anyone?
        what is happening?!
        is this the ceremony? is it completing?!
    
    cavik
        i--i do not know!!
            EXEC::env.noBgmDuck = false;
        this... i think this is the overlap! it must be growing outwards...

    sourceless
        another shock strikes my mindcore
            EXEC::flash(true);play('criticalError', 0.3);vfx({type: "okidoia", state: false})
        some part of me is falling, but the floor is still beneath my feet
            EXEC::env.grm.combat("ep4_intro_1");ratween(env.bgm, 0.5)
        there is a feeling of some great shape slithering, coiling around the chamber
        and when my mind recovers, enough to see...
        the room is unrecognizable, lost in itself
            EXEC::flash(false)
        an island of sanity with frayed edges, as if suffocated by the surface's vapor
        and from it, something has come for us
        misshapen things, hazy silhouettes, formed from this broken nature
        when i look at them, i see familiar shapes...
        husks, like before? golems? something else? 
        they move without the fatigue of our past foes
        i cannot truly make sense of them
        but their presence alone seems to strengthen the effect of this distortion
        they must be the source of this, or a part, somehow
        it must be stopped before we are lost to this overlap
        no friends will be made here
    
    timestopper
        whatever this is has not yet destroyed us
        we must fight
        everyone - follow my lead
        all right, but,
        where are you?

    sourceless
        the question immediately chills my mind
            EXEC::flash(true);env.rpg.pauseControls = true
        i look nearby, but see only bozko, itzil and karik
            EXEC::env.rpg.classList.remove('fpv');env.rpg.classList.add('tutorialzoomout');vfx({type: "flash", state: false, delay: 1000})
        where are...?
        there is no time - these creatures are upon us
    
    akizet
        everyone--fight to the best of your ability
        i will lend my expertise as i can
    
    RESPONSES::akizet
        fight!<+>CHANGE::combatadjust
            FAKEEND::start combat
            EXEC::pauseSwapCam(false);setCam();change("TEMP!!lshift", "DELETE");env.embassy.slowCam(false);content.classList.remove("forcewobble")

END::content.classList.remove('forcewobble');
SKIP::env.noBgmDuck = false;env.grm.combat("ep4_intro_1");vfx({type: "okidoia", state: false});vn.done();pauseSwapCam(false);setCam();flash(true);setTimeout(()=>{startDialogue("combatadjust")}, 800);change("TEMP!!lshift", "DELETE");env.embassy.slowCam(false);env.rpg.classList.remove("fpv");content.classList.remove("forcewobble");env.stopBgmChanges = false
`)

env.dialogues["combatadjust"] = generateDialogueObject(` 
start
    sys
        ATTENTION::'thoughtform combat initiated';'scenario necessitates extra dimension'
            EXEC::flash(true);setTimeout(()=>{env.rpg.classList.remove("hideteams", "tutorialzoomout");flash(false)}, 400);env.rpg.pauseControls = false
        ATTENTION::'utilizing structure';'tactical combat'
        NOTICE::'core combat structure is unaltered'
        NOTICE::'actors may move a limited range before using an action';'action use ends turn'
        NOTICE::'all actions adjusted to account for range and area of effect'
        NOTICE::'utilize <span definition="NOTE::'limbic motor beacon'">LMB</span> to direct movement and action use'
        NOTICE::'utilize movement keys to alter spatial angle'
        NOTICE::'utilize <span definition="NOTE::'contextually shifted limbic motor beacon'">SHIFT LMB</span> to direct vision during ally movement'
    
    sourceless
        we must be rid of these foes quickly, so that i can help the others
        but corners of the room have become distorted, dangerous,
        i am reminded of how we destroyed the foundation golem just a θwink ago
        we should avoid them, but...
        so too can we use them, with carefully angled strikes

____SHOWIF::"gameplay_off"
    sys
        NOTICE::"gameplay is presently disabled";"re-enable in SYS menu if undesired"
____END
        
    RESPONSES::akizet
        begin<+>END
            FAKEEND::(continue)
            SHOWIF::["gameplay_off", false]
        begin<+>nogame
            FAKEEND::(continue)
            SHOWIF::["gameplay_off", true]
    
nogame
    sys
        ATTENTION::"thoughtform combat gameplay bypassed"
        NOTICE::"contextual narration applied"

    sourceless
        our claws and fists meet with these... entities
            EXEC::env.rpg.allyTeam.members.forEach(m=>m.piece.knockback({direction: "up", strength: 2, follow: false}));env.rpg.classList.add('hideteams')
            WAIT::1000
            THEN::flash(true)
        though they appear at first like swarm projections, illusions...

    sourceless quiet
        they can be stabbed, they bleed,
            EXEC::play("crit", 0.75)
        and can be torn apart by our golem's dull pulse weaponry
            EXEC::play("dull", 0.75)
        so too can they strike us, physical in all ways that matter
            EXEC::play("hit", 0.75)
        but each time one is damaged enough, they simply split apart
            EXEC::flash(false)
        fading into the light that has submerged the chamber in madness
            EXEC::env.rpg.enemyTeam.members.forEach(m=>m.hp = 0);updateStats(true)
        
    RESPONSES::akizet
        ...<+>CHANGE::lesser_attack2
            FAKEEND::(continue)
`)

/* */
env.dialogues["lesser_attack2"] = generateDialogueObject(` 
start
    sourceless
        with our foes fallen, i shift my inner focus to the others
            EXEC::flash(true);env.stopBgmChanges = true
            WAIT::1000
            THEN::closeCombat(env.rpg.enemyTeam, true)
        my wordless request to access their senses is granted immediately
            EXEC::env.grm.combat("ep4_intro_2");setTimeout(()=>flash(false), 1000);env.rpg.classList.add('hideteams');env.stopBgmChanges = false
        i only hope i can guide them well enough...

    sys
        NOTICE::'many actions utilize TILE EFFECTS'
        NOTICE::'functions vary from persistent effects to telegraphed actions'
        NOTICE::'utilize scanner to determine function if needed'

    RESPONSES::akizet
        follow my instruction<+>END
            FAKEEND::(continue)
            SHOWIF::["gameplay_off", false]
            EXEC::env.rpg.classList.remove('hideteams')
        follow my instruction<+>nogame
            FAKEEND::(continue)
            SHOWIF::["gameplay_off", true]
    
nogame
    sourceless
        gakvu, cavik, and miltza stand in a chamber shaped much differently than ours
        still reminiscent, but almost as if misremembered
        and the foes that face them seem equipped to use the unstable nature of this place
        capable of instant relocation, bending the light downwards in a delayed strike...
        but between the three qou, they are well equipped to deal even with this
            EXEC::env.rpg.allyTeam.members.forEach(m=>m.piece.knockback({direction: "up", strength: 2, follow: false}));env.rpg.classList.add('hideteams');flash(true)
        especially with my assistance, for even at a distance, direction with the timestopper is effective
        their foes are torn apart--even gakvu's groundsmindry works, strangely
        
    RESPONSES::akizet
        ...<+>CHANGE::lesser_attack3
            FAKEEND::(continue)
`)

/* */
env.dialogues["lesser_attack3"] = generateDialogueObject(` 
start
    sourceless
        the last of the entities dissipate from the attacks of my friends, but...
            EXEC::flash(true);env.stopBgmChanges = true
            WAIT::1000
            THEN::closeCombat(env.rpg.enemyTeam, true)
        we find ourselves thrown into yet another distortion of the lesser mind chamber,
            EXEC::env.grm.combat("ep4_intro_3");setTimeout(()=>flash(false), 1000);env.rpg.classList.add('hideteams');env.rpg.grid.style.setProperty("--playercontrol-tilt-raw", 30);env.rpg.grid.style.setProperty("--playercontrol-rotation-raw", 45);env.stopBgmChanges = false
            WAIT::2000
        or... were we ever elsewhere? i can hardly make sense of the space
        all i know is that there are so many more of the beasts here...
        and we are together again
        half-formed questions and thoughts of confusion race through our connection
    
    timestopper
        have no fear
        we are having some effect
        it seems closer to the shape it used to be, does it not?
        they are many, but...
        so are we

    RESPONSES::akizet
        keep fighting<+>END
            EXEC::env.rpg.classList.remove('hideteams')
            SHOWIF::["gameplay_off", false]
            FAKEEND::(continue)
        keep fighting<+>nogame
            FAKEEND::(continue)
            SHOWIF::["gameplay_off", true]
    
nogame
    sourceless
        the team sets into motion, and while we each do our part to fight and mend...
        our golem is monstrous here, a shining light where we otherwise would have been overwhelmed
        its pulses break apart swathes of these monsters at once
        itzil and karik are truly fearsome with the tools we have given them
        
    RESPONSES::akizet
        ...<+>CHANGE::lesser_vekoa
            EXEC::env.rpg.enemyTeam.members.forEach(m=>m.hp = 0);updateStats()
            FAKEEND::(continue)
`)

env.dialogues["lesser_vekoa"] = generateDialogueObject(` 
start
    sourceless
        the last of these solidified threats have been dispersed
            EXEC::imagePreload(["/img/sprites/vekoa/vekoaspec.gif", "/img/sprites/obesk/ikgol/gridtiny_cinematic.gif", "/img/sprites/obesk/ikgol/gridtiny_collapse.gif"])
        with each one felled, the space has grown more familiar
        still distorted, but... the change is felt
        as if we were waking from a dream
        we take this instant to recover
            EXEC::env.rpg.allyTeam.members.forEach(m=>{m.hp = m.maxhp;combatRevive(m)})
    
    bozko
        i do not understand...
        they are formless, but can be touched and destroyed
        they hurt, but leave no mark beyond melted flesh
    
    sourceless
        everything we fought--it is all gone, leaving no carcass
        and beyond that, gakvu's groundsmindry still seems to work against them?
        they cannot be corru, can they?
        these questions must wait, for one entity remains
            EXEC::env.rpg.actors.vekoa_boss.piece.focusOnTile()
        malformed and impossible to distinguish, like a haze in the air
            EXEC::env.noBgmDuck = true;
        but before i can make any motion to attack...

    sourceless quiet
        from the now-restored door to the core chamber comes a great shockwave,
            EXEC::flash(true);ratween(env.bgm, 0.3, 2000);play("criticalError", 0.5);env.rpg.grid.tileEffects.forEach(e => env.rpg.grid.deleteTileEffect(e));env.rpg.neutralTeam.members.forEach(member=>{ if(member.piece) member.piece.knockback({direction: "down right", strength: 10, ignoreMods: true}) });env.rpg.allyTeam.members.forEach(member=>{ if(member.piece) member.piece.knockback({direction: "down right", strength: 10, ignoreMods: true}) });
            WAIT::800
            THEN::env.rpg.actors.vekoa_boss.piece.teleportToTile(env.rpg.grid.getTileFromCoordinates(6, 2));
        and at once we are pushed away, nearly swept off our feet
            EXEC::env.rpg.classList.add("fearmode", "hideteams");env.rpg.setCam({x: 6, y: 4, playerRotation: 0, playerTilt: 10, height: 1, distance: 0, detailMode: true, gridTileSize: 200, offsetCamera: 'rotateX(0deg)'});vfx({type: "flash", state: false, delay: 1000});content.querySelector("#vekoasprite").src = "/img/sprites/vekoa/vekoaspec.gif";changeBgm(env.grm.music_antag, {length: 10000, seek: 0, preserve: false});
        unexpectedly, i land near tozik--who has been resting against a pod this whole time
        
    tozik
        what is happening?
        are we...
        am i awake?
    
    sourceless
        i want to help him, but...
        my attention is drawn back to the last presence, i cannot lose focus
        whatever happened seems to have given it a solid form, fully manifested
            EXEC::env.rpg.actors.vekoa_boss.piece.focusOnTile();env.rpg.currentActor = env.rpg.actors.vekoa_boss;
        but still, i can barely make it out...
        is that...?
        vekoa
        bathed in the same light as our incorporeal foes
        there is no time to make sense of this: whatever wields her form does so out of malice
    
    timestopper
        stay at range, attack in unison
        wait for my impulse
    
    sourceless
        our inner chatter slowly falls to silence, the others listening for my direction
        vekoa, or whatever wields her image...
        she watches us, moving warily, like a cautious surface runner observing a predator
        though she stands before the only discernible door, 
        there is no measure of hostility shown
        she is not trying to block our way--merely assess us
        out of precaution, we keep our distance for now
        there is some intelligence here
    
    timestopper
        look at that movement
        even her receptors
        it really looks just like vekoa, right?
    
    sourceless
        it is curious... 
        receptor movements are subtle, difficult for a parasite to mimic
        and in this figure, i see a sort of pensive remorse
        does she persist within?
        i must at least try--even zuzucri are capable of some reason
    
    akizet
        vekoa...
        what holds you?
        does any part of you remain?
    
    sourceless
        her attention fixes upon me, and spots dance across my vision
            EXEC::vfx({type: "okidoia", state: "mild"})
        it is like her attention is physical, some sort of contact
        the okidoia focuses upon me, maybe all of us

    okidoia
        öu•:\ì ÷îcome|ï4;âŠ
        x3Ã0ÆbeforeEÆ®s²7] –´dÌ|—Û
    
    sourceless quiet
        no, not focused on us--but around us, carrying thoughts
        it reverberates against our minds, barely intersecting with them

    sourceless
        unable to truly connect
        i expect to have to retaliate against an attack, but she remains afar
        this is a true attempt to communicate something...
    
    okidoia
        pe@c¨e <YCNlev½âF
    
    sourceless quiet
        the sensation of voices grasp at words in my mind,
        trying to fit them together
            EXEC::vfx({type: "okidoia", state: false})

    sourceless
        almost, i can make something out--some vague meaning
        a regret, or kindness - maybe grief?
        but beneath it all is a destabilizing pain
        my vision blurs, until i can shake these tendrils from my mind's eye
        i cannot understand it, truly--and i think i must not
        could this feeling itself be a sign of some parasite biting into my flesh?
        vekoa still does not move, gesturing in welcome towards the door
        does she want us to see what she has done?
        or perhaps she wants us to enter--to accept our deaths?
        is she stupid?
        i will repay this insult
    
    bozko
        all of this slaughter is your doing
        speak clearly, or i will tear you apart
        
    sourceless
        bozko must have come to a similar conclusion, for he speaks with rage
            EXEC::env.noBgmDuck = false;
        something with reason clearly lingers within this shape, for it is taken aback by his words
        these are not mindless husks we face, now... 
        but they cannot be any more than parasites - no qou would ever abide this tragedy
        in his anger, the okidoia grew silent
        vekoa's receptors convey a sort of... frustration, maybe
        it is always difficult to tell with θjut from afar
        the pause is heavy, all of us frozen in uncertainty
        she--it speaks again...not in words, but visions, a memory
            EXEC::vfx({type: "okidoia", state: "mild"});body.classList.add('vis-flash', 'vis1')
        
    okidoia
        Ã#cq4žUbóZçÖ stands too far--a sharp limb pierces through my chest
            EXEC::vfx({type: "okidoia", state: false});flash(true);body.classList.add("vis-flash-blur")
        i collapse into the rising Š*pireblood
        Ð!‡©XQ:hereßnLÙ²?˜õ(É›againÿ·ØÜƒ"§
    
    sourceless quiet
        my mind recoils as it passes, already slipping from memory
        a memory of death, perhaps? a threat?
            EXEC::flash(false);body.classList.remove("vis-flash-blur")
        bozko lacks my confusion
    
    sourceless
        he is shocked, frozen
    
    bozko
        you...
        how...?
        
    sourceless
        vekoa's attention shifts from bozko, to our golem
        another vision comes, stronger, louder--clearer
            EXEC::body.classList.add('vis2');body.classList.remove('vis1')
    
    okidoia
        ÍûôŸw¡Kâ¤Ñlay upon the ascension <span definition="NOTE::'partial translation';'implied closest cultural equivalent'">catafalques</span>, gazing up into velzie's eye
            EXEC::flash(true);body.classList.add("vis-flash-blur")
        the θjut hands me a mindcore connector, and then one to my tirii
        i sense fear in our entangled receptors, and i laugh
        embracing deÆÎÕqêath is a strange idea, but we know there is nothing to be afraid of
        m¹ZŸŸK\¾Õ\AQëi6ìÏ
        so i say: "tirii, do not be so nervous!"
        "i am here with you, and we will begin anew together"
        se•~+•¥ŸèagainÚ±½9¶ÄwÁK‰
    
    sourceless quiet
        i must physically shake the vision away, reflexively gripping my head
            EXEC::flash(false);body.classList.remove('vis-flash-blur')
        perhaps by rage alone, itzil and karik push the golem back into an unsteady hover
            SHOWIF::'EXEC::env.rpg.actors.ikgolem.hp == 0'
            EXEC::combatRevive(env.rpg.actors.ikgolem)
        
    sourceless
        attempting to speak with this entity is pointless
        it is a babble of disjointed memory fragments, 
        like a social parasite throwing out what it has seized in hopes of fooling us

    akizet
        vekoa, if you have any sense at all
            EXEC::body.classList.remove('vis2', 'vis-flash')
        yield the core, we can still stop--
            WAIT::2000
            AUTOADVANCE::
            THEN::midCombatActorRemove(env.rpg.actors.cavik);midCombatActorRemove(env.rpg.actors.bozko);midCombatActorRemove(env.rpg.actors.gakvu);midCombatActorRemove(env.rpg.actors.miltza);midCombatActorRemove(env.rpg.actors.akizet)

    sourceless quiet
        a dull pulse flares through the room--blinding me, briefly
            EXEC::flash(true);forcePlay("dull");env.rpg.actors.ikgolem.sprite.querySelector('img').src = "/img/sprites/obesk/ikgol/gridtiny_cinematic.gif"
        that was the golem...!!
            EXEC::flash(false);env.rpg.setCam({x: 5, y: 6, playerRotation: -25, playerTilt: -10, height: 1.5, distance: 0, detailMode: true, gridTileSize: 200})
        already, it hovers aggressively towards our foe
            EXEC::env.rpg.actors.ikgolem.piece.stepToTile(env.rpg.grid.getTileFromCoordinates(6, 3))
    
    karik
        itzil--stop--!!
    
    itzil
        zuzucri! zuzucri!!
        attack! destroy this thing!!

    sourceless
        the shared sense of righteous vengeance is almost overpowering
        before any of us can parse the situation, the golem is already upon vekoa,
        its other gauntlet swinging and glowing, preparing another destructive dull pulse
        vekoa is unharmed from the first blast, what would a second do?
    
    timestopper
        itzil! we must be rational! 
    
    itzil
        no!! no more of this!
        you all know it is no different from our home!
        an infestation--a mimicry!!
        
    sourceless
        immediately, once close enough, vekoa seizes the charging gauntlet
        then, the other, almost without effort

    sourceless quiet
        and at once, both are torn away,
            EXEC::env.rpg.refresh();env.rpg.actors.ikgolem.sprite.classList.add('struck');flash(true);forcePlay('fear', 0.5);

    sourceless quiet
        thrown aside, exploding violently against the walls
            EXEC::forcePlay("dull");env.rpg.actors.ikgolem.sprite.querySelector('img').src = "/img/sprites/obesk/ikgol/gridtiny_collapse.gif";env.rpg.refresh();env.rpg.actors.ikgolem.sprite.classList.add('golemdie')
        vekoa's claws part the impenetrable chassis of the golem effortlessly, 
            EXEC::forcePlay("stab");env.rpg.actors.ikgolem.sprite.classList.remove('struck')
        leaving an irreparable split that sends it to the ground with a heavy thud
            EXEC::forcePlay('fear', 0.5);env.bgm.rate(0.6);env.bgm.seek(43);flash(false)
        such is its weight that the head, no longer sustained, crushes its connector as it strikes the ground
        karik scurries away, having escaped the viscera, retreating into the opposite hall out of wild fear
        but itzil... itzil is held in vekoa's claw
            EXEC::env.rpg.currentActor = env.rpg.actors.vekoa_boss
        
    itzil
        nonononono!!!
        help!! help me!!!

    sourceless quiet
        i sense strain from gakvu through our connection

    gakvu
        what?! i cannot do anything to vekoa!
        my groundsmindry is not working, not like the others!!
        there is something there, but it is...
        i do not know, i cannot grasp it
    
    cavik
        if i throw a bomb now, it might just hit itzil...

    akizet
        then it falls to direct force
        bozko, follow close behind me, quickly
        and grant a distant eye, miltza
    
    sourceless
        my approach is like moving through a hopeless nightmare, bozko not far behind
        and while i nearly reach them, as if preempting our attack,
        vekoa turns to face me and bozko
            EXEC::env.rpg.setCam({x: 7, y: 4, playerRotation: 25, playerTilt: 0, height: 1.25, distance: 0, detailMode: true, gridTileSize: 200, hideAllies: true})

    sourceless quiet
        the okidoia suddenly screams in my mind, through all of my senses, tearing my focus away from reality,
            EXEC::flash(true);forcePlay("fear", 0.4);forcePlay("dull", 0.4);ratween(env.bgm, 0.4)
        away from the timestopper, where i cannot hear the panic of my friends
        away from anything at all - any sensation
        at once commanding a collapse of my qou-body
    
    okidoia
        ‡ogether ÃqIüÑ±ú€×ðÿ}}œÈ?±
    
    sourceless quiet
        ...
    
    sourceless
        by the time my limbs respond again,
        i still live, but it is too late
            EXEC::flash(false);ratween(env.bgm, 0.6)
        itzil is melted in vekoa's claws, joining with the light
        their shrieking fades into an overjoyed laughter, distorting metallically,
        before i feel their voice join in the same senseless okidoia
        there is nothing left
        slowly, i stand
        but... to strike directly...
        would this not ensure the same fate?
        was she not entirely unaffected by our greatest weapon?
        the others must have come to this same conclusion, for they linger at a distance
        bozko helps me up, similarly recovered, but does not move closer
        while vekoa lowers her claws, becoming unmoving, expectant, like before
        she is near, too close, yet she does not strike us
        her eye passes from me and scans over the remaining survivors
        and the chamber hangs in heavy silence
        ...
        finally, i feel the connection of the timestopper come into focus again,
        my mind recovered, limbs now frozen with my own fear
    
    timestopper
        akizet!! respond!!
        i am fine
        do not approach
        akizet bozko get back please
        how is she doing this
    
    sourceless
        she turns her gaze upon me, and like before, i sense no hostility
        i cannot bring myself to move
        she effortlessly destroyed our most powerful weapon, a key in our plan
        and she could clearly kill us all with even less effort,
        but... she does not? is this an attempt to lower our defenses?
        what defenses? what can we even do?
        in the outline of vekoa's receptors, i see an outward bend, a deep sadness
        something about it strikes my heart, stirring a memory
        rouzesche, weeping for our father, declining a mindcore in his final moments
    
    akizet
        why...?
        what do you want?
    
    sourceless
        from this close, i can see the subtlest change in her warped receptors
        her sadness becomes conflicted, tense, as her gaze passes over us
        what is running through her mind?
        whose mind is it? 
        vekoa would surely never act with such malice
        resigned to some decision, she casts her eye unto me in a sharp motion,

    sourceless quiet
        and the chamber closes into itself, the space warping in a way my eyes fail to grasp,
            EXEC::flash(true);forcePlay("fear", 0.3);forcePlay("dull", 0.3)
        it feels as if we had each been struck by a sweeping limb,
        sending us away, into a chaotic fall into the noise and color beyond the walls
        ...
            EXEC::env.rpg.halt = false;closeCombat(env.rpg.enemyTeam);
        ...

    sourceless
        and then...
        we tumble out of a warped door, into the remains of a hall...?
            EXEC::flash(false);env.bgm.rate(1);changeStage("hall_lesser-dull", false, false, {specificPlan: "karik"})
        everyone seems to have landed with me, even tozik
            EXEC::toggleBgm(env.grm.music_peace1)
        karik is already here at the far end,
            EXEC::setCam({x:7, y:3})
        pacing in a strange darkness that resembles physical reality
        if they are here, then this must be the former entry hall to the dull mind
        it is quiet, strangely so...
        expecting an attack, we ascend and gather near karik quickly,
            EXEC::setCam({x:9, y:3})
        the other end still twists maddeningly--i can hardly believe we came from that!
            EXEC::setCam({x:9, y:3, rotation: 90})
        and so we stand ready to fight
        ...for long enough that it becomes clear,
        that vekoa is <em>not</em> following us... 
        why?
        whatever the reason--we have a moment of peace, to plan again, maybe...
        ...
        but no plan comes to me
        no one speaks
        and still no foe pursues us
        the imperceptible tendrils of the ceremony writhe patiently, just out of reach
        what do we do? what can we do?

____SHOWONCE::
    moth
        i can't believe it...
        dude, i keep going over what you just ran through,
        but there's basically no incoherence here
        this is real, this happened
        dull plane shit was always over my head, but this is something else
        sorry, keep going - get everything you can
        just let me know if you want to talk about anything
____END
    
    sys
        WARNING::'extensive interaction approaching'
            EXEC::flash(true)
        NOTICE::'interact with PROCEED marker to advance'
            EXEC::setCam();refreshStage({noFlash: true})
            WAIT::500
            THEN::playerMoveTo(9, 3, "left");flash(false)
        
    RESPONSES::akizet
        ...<+>END
            EXEC::

END::change("PAGE!!ikgolem-gone", true)
SKIP::env.noBgmDuck = false;env.bgm.rate(1);flash(true);env.rpg.halt = false;closeCombat(env.rpg.enemyTeam);setTimeout(()=>{flash(false);changeStage("hall_lesser-dull")}, 1000);body.classList.remove("vis-flash", "vis-flash-blur", "vis1", "vis2");vfx({type: "okidoia", state: false})
`)

/* !P3 - H2H and contact hall */
env.dialogues["h2h"] = generateDialogueObject(` 
start
    sourceless
        finding every door to be inactive or warped, trapped in this dead end,
            EXEC::env.embassy.slowCam();change("PAGE!!e4prog", 3);setCam({x: 8, y: 3, rotation: -90});pauseSwapCam()
        we convene near the inoperable dull mind entrance
        from it pools black spireblood, implying a collapse within
        it obscures the luminescent floor pigmentation, leaving us with sparse ambient light
        we are lit only by the θwindow and the horrific dull light of the overlap
            EXEC::setCam({x: 11, y: 4, rotation: 45})
        bozko watches over the path behind us
        while tozik has started to stand, still looking ill
            EXEC::setCam({x: 11, y: 3, rotation: -135})
        he raises a claw, to say that he is fine
        cavik still moves to examine him, but...
        then freezes in shock, checking his own connector frantically
        he is the first to speak, sharing what we all began to realize,
            EXEC::vnp({cavik: "show focus", bg: true, hideStage: true})
        
    cavik
        uh... the timestopper!!
        it is not responding!
    
    sourceless
        he grips his connector, removing it from his receptor and replacing it
        a few others try it, too
    
    cavik
        is anyone still connected?
        it could not have been destroyed, we would have felt it!
    
    bozko
        nothing
    
    gakvu
        i felt it stop after we fled, but i had hoped it was just a flicker...
    
    sourceless
        our one remaining advantage, gone
        could vekoa have noticed our use of it? 
        somehow diverted focus from the ceremony to seize it?
    
    akizet
        we must assume it to be lost, then
            EXEC::vnp({cavik: "hide"})
        what do we still have?
        vekoa's creatures will be upon us eventually
    
    sourceless
        the team turns over their tools
        we still hold a variety of items and weapons
        bozko and i both have decent capability, and miltza has good reaction times...
        but without a wealth of independent combat experience between all of us,
            EXEC::setCam({x: 13, y: 3, rotation: 90})
        we will stand little chance
            EXEC::vn.done()
        not to mention the impossible nature of our foe
        vekoa is unstoppable, untouchable
        and the foes that preceded her were formed from the air itself, illusions
        like specters left upon the stage by those she has claimed
        but...
        did she really want to hurt us?
        no, that is a stupid question
        she obviously does, why else would she have killed itzil?
        but she let us live... 
        i was right there! karik, too!
        and yet she chose to send us here and not give chase, 
        a dark corner where she holds a clear advantage?
        it does not make any sense
        whatever the truth may be, the result is clear enough
        she, or her likeness, is still an enemy that must be dealt with
        i start to consider our options with the rest of our team in silence
        but all at once, the guilt of what has happened falls upon me again
        if this place is to be our graves, if we are to be usurped by parasites,
        they must at least know what has dragged them down into this pit with me
        the truth
    
    akizet
        my friends,
    
    sourceless
        their attention snaps to me, as if expecting me to spout another spirited plan,
            EXEC::vnp({cavik: "show far", tozik: "show far", bozko: "show far", gakvu: "show far", miltza: "show far", hideStage: true, bg: true})
        but their hopes fading are plain to see as they process my tone, and see my tightly twisted receptors
            EXEC::env.noBgmDuck = true;
    
    akizet
        i must tell you something
            EXEC::changeBgm(env.grm.music_admission, {length: 10000, seek: 0})
        before... when we discovered the spike in the call,
        a few θgazes later, a self-delivered message found my quarters
        it was a threat - something to truly ensure i did not speak
        why me, i do not know... but you must recall how strangely i acted!
        i wanted to find who it was, or if anyone else had received something like it... 
        if any of it was real
        but i was the only recipient, as far as i could see...
            EXEC::env.noBgmDuck = false;
        so i crept into the materials θsegment and fetched an archived design
        a converter between our thoughts and dead metal, for the cousins' technology
        i had it constructed, i shared it with my bright contact
        and it worked--so i continued a branch of our work in secret
    
    sourceless
        most look upon me with confused worry, surely baffled at the relevance of this
        but gakvu's receptors stand with shock
        i bring a claw over my eyes as i continue, the weight of my words difficult enough to carry
    
    akizet
        i thought i could trust our cousins' word, that they would help me
        and they did
        we found the exact origin point of the call, but...
        i told them not to go until i had completed my preparations
        ...
        
____SHOWIF::"gol__s_calls-gordon"

    akizet
        once we destroyed the dullzika, i was able to get in touch with my envoy
        and he said, just before all of this started,
        without consulting me, or even him and his team,
        someone in his hierarchy used our findings
        they sent something to the origin...
        and then, surely not by coincidence, this disaster began
        
____SHOWIF::["gol__s_calls-gordon", false]

    akizet
        if you did not share anything, cavik--
        
    cavik
        of course not!! i promised
    
    akizet
        then... they must have gone to investigate the origin
        without me? without consulting us at all?
        it is the only explanation
        
____END

    akizet
        this attack--all of this, my actions must have been the spark
        how many deaths now must find root in my claws?
        as if i were the carrier that brought this infestation home

____SHOWIF::"gol__s_calls-gordon"

    cavik
        that is why you were so scared...
            EXEC::vnp({cavik: "focus"})
        akizet, why did you not let me help?
        i was right there!

    akizet
        after the message, and knowing i was alone, all looked like saboteurs to me
        like anyone i shared this with could split their face into teeth
        once you knew, and it was clear you were not one of them
        i could only keep you away to ensure your safety
            EXEC::vnp({cavik: "defocus far"})
        but... now, i know, this cannot be the doing of any group, any saboteur
        no obesk could do this, it is unconscionable
        this is beyond all of us somehow, it must be
        
____END

    sourceless
        ...
        bozko lingers between us and the way we came, turned away
            EXEC::vnp({bozko: "hide"})
        miltza's receptors are like fists, her head finding support in her claws
            EXEC::vnp({miltza: "hide"})
        cavik sits against the inner wall, uncertain
            EXEC::vnp({cavik: "hide", tozik: "hide"})
        but... gakvu?
        she paces, her eyes and receptors conveying some deep, troubled thought
        some weight of her own, not unlike mine...
        did she get a message, too?
        at last, she stops
    
    gakvu
        what was the threat you received?
            EXEC::vnp({gakvu: "focus"})
    
    akizet
        it warned of some vague conflict,
        about a two-sided storm that swirled around the embassy,
        that the call's origin was already truly known,
        despite our research continuing for some reason
        ...and that they kill for their secrets
        it shared only enough to ensure my trust could never find grasp again

    sourceless
        every word darkens her gaze

    gakvu
        they broke the veil...
    
    sourceless
        all focus upon her, though miltza's attention is the most striking
        for the first time since we arrived, she seems truly present
    
    gakvu
        once we spoke about that cyst, you acted so strangely
        the lack of progress, your absences and detachment
        you started becoming like me, hehe
        but it all makes sense now
    
    sourceless
        she pauses, choosing to find support against the groundsmindry chamber θwindow
        gaze cast down to the sludge of the broken door
        whatever she is about to do is difficult for her, too...
    
    gakvu
        this was not your fault, akizet
        whoever left that message wanted to protect you, i am sure
        but there is more happening than you know
        if we are to die down here, then...
        why not tear away the rest of the veil they tarnished?

    sourceless
        she pauses, forming a cynical, mischievous twist in her receptors

    gakvu
        you will not hold conflict, will you, miltza?
            EXEC::vnp({miltza: "showright far"})
        let us speak plainly
        
    sourceless
        an unexpected shift of focus to miltza--terrified, but...
        realization is plain in her receptors, like a weight has been lifted from them
        but there is an urgency in her voice, countering some implicit accusation
        spilling forth as stone in a collapsing cave
    
    miltza
        what?!
            EXEC::vnp({miltza: "show"})
        no no, listen, gakvu, everyone,
        you must know--this was never a part of any plan
        none that i knew--none that i would support!!
    
    gakvu
        relax, i know
            EXEC::vnp({gakvu: "focus"})
        we may be opposed, but it is clear that we are not foes, here
        your terror was enough to tell me this is not simply a part of some greater plan
        this is bloodshed far beyond even your madness

    sourceless
        miltza is quieted, sat against the wall in a nervous ball
        guilt is plain in her receptors, and she averts our gazes
        but gakvu...
        after all this time, she has been a part of this conflict?
        and how confidently she speaks!
        i can only remain silent
        to die knowing the truth will be enough
    
    gakvu
        it is hard to find a place to begin...
            EXEC::vnp({miltza: "hide"})
        especially with what time we may have
        but the message was truthful, akizet
        there is... something, in the ocean, here
        it is often called 'the meteorite,' 
        if only to avoid evoking its true nature in communications
        all evidence points to it being a corrucystic entity, as you probably expect...
        but it is so much more than that 
        to just call it an 'entity' does not encompass all that it could be
        you see, when we first arrived, a critical piece of evidence was found and hidden
        embedded deep in this bright ocean's floor were long-dead veins of corru...
        i never got to see them myself, but i accessed some recorded experiences, and,
        their enormity was truly chilling
        they were not senseless growth, either
        some examination showed fossilized organ structures
        clearly part of something greater, broken off by drift in the stone...
        yes, the meteorite has been dormant here for a very, very long time
        but how long, and where its true center lies now--these things are beyond us
        however, enough is known that we are certain:
        whatever it is, wherever it is, it must be the source of the call
        and it must be larger than any corrucystic life we have ever known
    
    akizet
        so tozik's theory was right, then...
        the call--it really is raw thought?
        but what could it possibly be trying to communicate??
    
    sourceless
        gakvu gives a negative twist of her receptors
    
    gakvu
        our eyes are closed to this as well
        that is why our research still mattered
        having sharp minds upon it, unbiased by these facts, was deemed beneficial
        even if it meant an eventual induction for those involved
        and such a shame, too
        that would have been an easy way in...
        but, there is a leading theory
        it supposes that the call is one begging for help
        that wherever this broken entity is, it is starving, alone,
        crying out on a timescale well beyond our comprehension,
        somehow knowing we are here to find it

    cavik
        um... sorry to interrupt, but, i do not understand...
            EXEC::vnp({cavik: "showleft", gakvu: "focus"})
        why would this be worth killing over?
        this is hardly a secret!
        i have even heard this theory on the collective!
        not that it is so large, but still--that it is some stranded, starving corru

    sourceless
        gakvu chuckles coldly, and she gestures towards miltza,
        whose discomfort has only grown in all this
    
    gakvu
        well, her congregation, leaders and councilmembers among them,
            EXEC::vnp({cavik: "hide"})
        have latched onto the idea that the meteorite is some great mind
        sleeping, or wounded, or otherwise incapacitated
        and that we are somehow its inheritors
        that if we can heal it, return it to health, it will oblige us,
        and join our minds into something infinitely more powerful than any one
        forever advancing beyond death, together
        a 'friend'...
        one that must be protected from bad actors, until it is ready
        so theories may circulate, but they would never afford a truth-runner to live
    
    sourceless
        gakvu pauses, and miltza does not object
        she scoffs before bitterly continuing,
    
    gakvu
        what an intoxicating dream
        if the meteorite or its call were to seize our minds, 
        if it finds us, our devices--if it ever <em>really sees us</em>...

    sourceless
        her gaze shifts to the warped end of the hall, fading into the overlap,
        then to tozik, and the wounds we are still tending
    
    gakvu
        well, here we are
        but this attack, this seizing of the core, the embassy...
        this is only a demonstration of what may come
        to it, we must be specks of misplaced flesh, lost and wandering
        the naivete to think such a creature so far beyond us would be kind enough to let us continue as we are...
        no, it will seize everything, our bodies, our minds, our constructs,
        sure to discard whatever may lie within to feed itself
        and to say nothing of what may come against the bright cousins and our larval kin...
        velzie will have no more actors for its stage
        it must be destroyed

    sourceless
        with incensed receptors, miltza rises to her feet
            EXEC::vnp({miltza: "showright far", gakvu: "focus"})

    miltza
        you are blind!
            EXEC::vnp({miltza: "focus"})
        why would it call out so specifically for us, if it did not know what we truly were?
        and think of what this means!!
        our symbiosis--to be able to extract our minds as we do!
        we are born from it, meant for it, we have to be!
        which is why...
        this is all so wrong...

    gakvu
        do you think i am inviting debate?
            EXEC::vnp({gakvu: "focus"})
        
    sourceless
        gakvu laughs, wracked with stress
    
    gakvu
        we are miniscule qou, alone at the bottom of a collapsing spire
        there is no point in arguing, for the end is here before us, grasping at us through the dull plane
        just down the hall, miltza
        what must be the meteorite's hideous mind is wielding the images of our fallen
        wearing vekoa's face as a zuzucri would
        look now, upon the fruits of the council's hubris, and despair
        perhaps we should just embrace it and be done with it all
        that way, we will at least know who was right, yes?
        of course--we should wait and see where this contrivance takes us
        if the meteorite is so kind, it surely will be a paradise
        full of little helpers to free us from the sludge we will be buried under
    
    sourceless
        her jabs are enough to draw me out from my shock
        this bitter sarcasm is a poor mask for her fear
    
    akizet
        gakvu...
        this is not over
        we have options
    
    sourceless
        before i can continue, tozik speaks with some strain
        his voice carries a strange, quiet static it did not have before
    
    tozik
        this explains the public record...
            EXEC::vnp({cavik: "showleft far", tozik: "showright far", miltza: "hide"})
        perhaps it was altered right after the spike we noticed, for this "veil"
    
    cavik
        ...and what does this really mean?
        about us, you know? where we come from--and how it got here?
    
    sourceless
        miltza and gakvu both express exhaustion in stance and receptor, briefly meeting gazes
    
    miltza
        all that is known and unknown is too vast to cover in the time we have
            EXEC::vnp({cavik: "hide", tozik: "hide", gakvu: "hide", miltza: "show"})
        we will be killed by vekoa, or consumed by her contrivance,
        before you come to understand even a sliver
        besides, what does it matter?
        gakvu is right about one thing...
        we will either be dead and gone soon,
        or... we will find ourselves within the mind of the meteorite
        and all that might entail...

    sourceless
        ...
    
    miltza
        akizet
        this second veil exists... or, existed, for a reason
        i cannot let you think that you are truly to blame, here
        the fault for this madness lies with the one who threatened you
        but even then... the storm was only growing as the call went on
        velzie would have let it spill forth into consequence one way or another
        
    sourceless
        i should feel relief, but...
        like the others, i do not even know what to say
        it is the nature of a tir to forgive like this, after all
        her comfort is hollow, as is gakvu's
            EXEC::vnp({miltza: "hide"})
        how can i accept this, while we drown in the blood of our friends?
        no, this tragedy would not have happened without me
    
    tozik
        this is fascinating
            EXEC::vnp({tozik: "show far"})
        but,
        how long have we been talking?
    
    sourceless
        as if pulled from a dream, my spiral of despair slows enough that i may look around
        the contrivance has not formed, nor have any foes found us
        has it not been long enough? why do the tendrils of the ceremony still wait for us?
        and vekoa--is her method of attack not instantaneous?
        is she not fatal to even touch?
        does she...
        just not care to pursue us?
    
    bozko
        no sign of entry
            EXEC::vnp({bozko: "showleft far"})
        they have not touched the door
    
    cavik
        wait--communications are silent, too!
            EXEC::vnp({cavik: "showleft far"})
        there is no disruption, even with the overlap right next to us...
    
    sourceless
        gakvu turns to face the blinding absence beyond the θwindow
    
    gakvu
        yes, it...
            EXEC::vnp({bozko: "showright far"})
        i was so preoccupied, i did not notice how quiet it has become
        how is that possible? is this vekoa's doing? her focus shifting, maybe?
    
    sourceless
        cavik suddenly perks up, shuffling towards the sludged door
        he feels at it, even placing his head against it to focus his hearing
    
    cavik
        oh, wow, wow!
            EXEC::vnp({cavik: "focus far"})
        it is not her--it is a silence!!
    
    sourceless
        from tozik and gakvu--even karik, rising from their corner, i see the first sign of hope
        they stand in preparation, as if cavik has just formed a new plan
    
    akizet
        what do you mean?
    
    karik
        ...a silence... 
            EXEC::vnp({karik: "showright far"})
        i should have known!!
        dull minds always have silence spires, but they are so rarely used...
        that explains why the dull mind was gone!
    
    tozik
        and the timestopper...
    
    cavik
        akizet, silences are artificial shapes within the dull plane, 
            EXEC::vnp({cavik: "focus"})
        designed to be isolated from all other connection
        you can think of them like, uh, bubbles! or cages! 
        they must be entered physically, you see
        and they <em>always must</em> be maintained with active constructs
    
    akizet
        i see...
        so--there may be other survivors sheltering here?
    
    sourceless
        all eyes turn to the broken door
            EXEC::setCam({x: 9, y: 3, rotation: -90});vn.done()
        the spireblood that oozes from it is surely a facade, or maybe the result of a rough barricade
        so without another word, we set upon it
        bozko is slow to move from his post, but his strength will serve well in prying open a path
        there must be someone
    
    sys
        WARNING::'extensive interaction continues'
        NOTICE::'interact with PROCEED marker to advance'
    
____SHOWONCE::
    self
        you got all of that, right?

    moth
        yeah...
        jesus dude
        we can talk about it later, but i made sure to mark that part in my logs
        this is getting nuclear
        keep going

____END
        
    RESPONSES::akizet
        ...<+>END
            EXEC::setCam();pauseSwapCam(false);vn.done();env.embassy.slowCam(false)

SKIP::change("PAGE!!e4prog", 3);setCam();pauseSwapCam(false);vn.done();env.embassy.slowCam(false)
`)

/* !P3 - dull mind contact & entry (this is just one dialogue/setup) */
env.dialogues["contact"] = generateDialogueObject(` 
start
    sourceless
        ...
            EXEC::pauseSwapCam(true);flash(true)
        after some headway is made, and with a great crash, the doors are forced open
            EXEC::flash(false);changeStage("grm_dull_front")
        we are greeted with a comforting darkness, granted by sludge obscuring the floor lights
        the door's damage was an illusion...
        furniture had been piled against it and sludged, appearing like a collapse to the outside
        perhaps to trick vekoa's golems, should any have remained?
        a wall is raised, some operational feature of the dull mind
        another chamber lies behind the light of its central gap, giving off a constant hum
        so we slowly enter the clearing, wary of any more incorporeal foes...
    
    akizet
        ...hello?
    
    sourceless
        just as i spoke, a qou--a once-θjut, clearly intact and alive, leaps out of the gap!
            EXEC::vnp({idril: "show far"})
        pointing a crumbling, flickering disabler at us
        it is so worn, i cannot tell if it even has a single use left
        but our appearance disarms her, for she must have expected hostile golems
    
    idril
        oh... hi!
            EXEC::vnp({bg: true, hideStage: true})
        huuuh, how did you get here?

    sourceless
        a friend, at last... relief overtakes me
        but just as i move to respond, she speaks up again

    idril
        well--we should not speak in this hall!
        come, this way...
    
    sourceless
        she lazily recedes into the walled section, oddly unconcerned by her ruined barricade
            EXEC::vnp({idril: "hide", bg: false, hideStage: false})
        we exchange glances - hopeful, if confused - and scurry through after her
            EXEC::changeStage("grm_dull_back")
        though this place appears warped at first, it is merely a projection
        some impression of the dull beyond, imprinted upon the walls and floor
        at the opposite end are piles of golem corpses and containers, dissected and cast aside, 
            EXEC::setCam({x: 5, y: 5, rotation: 145});
        clearly having their organs and critical components removed
        much haphazard work was done here, and recently
        the only intact device that remains is the narrow obelisk in the center of the chamber,
            EXEC::setCam({x: 5, y: 5, rotation: 90});
        and the strange pod entrances that loom over us
    
    idril
        ahaha, welcome, welcome!
            EXEC::setCam({x: 5, y: 5, rotation: 145});vnp({idril: "show far", bg: true, hideStage: true})
        sorry i did not hear you sooner!
        are any of you hurt? here, here, take these!
    
    sourceless
        she fishes through the containers, returning with some restoratives and sfer
            EXEC::vnp({idril: "show"})
        tozik, still unsteady, takes them with an appreciative nod of his receptors,
            EXEC::vnp({tozik: "show", idril: "focus"})
        quickly moving to address our wounds and feed our limbs
        she seems interested in his wounded state, immediately taking notice that something ails him
        the eye of a θjut, i suppose
    
    tozik
        thanks...
    
    idril
        ahaha, we have plentyyy, it is no bother!
            EXEC::vnp({tozik: "hide", idril: "focus"})
        besides, it is obvious to anyone that you need them far more
    
    sourceless
        she dismissively waves a receptor, backing away to sit atop the containers
    
    idril
        i am idril!
        how did you all get here...?
    
    sourceless
        this θjut, she speaks so strangely, like she has just awoken from a great sleep
        with such sluggish movements, how has she survived so long...?
    
    akizet
        ah, well,
        we seized a movefriend and descended, to stop the attack
        all thought we would simply need to seize the core to stop all of this...
        we did not anticipate a ceremony, and now we are not sure what to do
    
    idril
        ahh... fighters! if only you had been here earlier
        but no, no, this fight will not be won with force anymore
    
    sourceless
        there is no despair in her voice, more like wistfulness
        it is inspired by the same lack of concern that initially unsettled me
        has she been self modifying? is this a response to the tragedy?
        ignorant, cavik excitedly weaves around her work
            EXEC::vnp({cavik: "showright far"})
    
    cavik
        you took out these golems yourself?
        and these containers! such a wealth!
        dull bones, wiped echo cores, some chaining connectors...
        what are you making?

    idril
        oh, yeah... silencing spires!
            EXEC::vnp({idril: "focus"})
        you see, me and the others, we had this big plan 
        we were going to enclose the groundsmindry core in a silence, then retake it
        and we actually did make a lot of them!
        we even had half of our team go up into the spine, placing them in the archives overhead...
        but once the ceremony truly started, well,
        it grew too large, too fast, to feasibly contain
        our spires are probably only slowing it down, now...
        hey, what is your name?
        i feel i have seen you before...
        
    cavik
        i am cavik, call research technician!
            EXEC::vnp({cavik: "focus"})
        although, i did work on the life-pod project for a time
    
    idril
        ahh, well met, my friend! welcome to the dull mind!
        yes, that must have been where i saw you...
        i often checked in from my side here
    
    sourceless
        she gestures towards the entry overhead with a flourish
        but enough of this pointless chatter
        she is too quick to deviate in this time of crisis
    
    akizet
        idril, you say 'we,' 'others,' but--where are they?
            EXEC::vnp({cavik: "hide"})
    
    idril
        oh, right! 
        well... it had been me and some other qou
        some from here, some descenders from above, 
        we all wanted to retake the core and stop the attack
        buut, yeah, our plan failed
        the spine team disappeared,
        and most of us died!
        now it is just me and a vel
        she is out looking for another way to stop this, or maybe escape
        i do not really know
        
    sourceless
        she shrugs, listless
    
    idril
        me, i have just been watching...
        what is visible of the ceremony, from my dullima pod, is very pretty
        like a parasite bulb blooming out from a dead beast
        curling around the framework of the embassy's dull connections
        you can take a look with it if you want, it is still open
        just... not the third one
        in fact you should probably not touch that one at all
    
    sourceless
        it did catch my eye before, being the only sludged pod
        how strange that she is so wary of it...
        but then i look to miltza, who visibly grows concerned over its contents
        yet where i feel she might step in, offering some guiding compassion,
        gakvu speaks in place--carrying a less friendly suspicion
        
    gakvu
        if you were placing silencing spires, 
            EXEC::vnp({gakvu: "showright"})
        you must have known the ceremony was going to happen
        how did you figure that out?
        
    idril
        well!
            EXEC::vnp({gakvu: "hide"})
        i was using my dullima pod here when the attack started...
        and i had this silencing spire active and the safety walls up, 
        for i was focusing on fixing a troublesome stray organ...
        so i guess i did not notice for a while
        not until other qou started to shelter in here, telling me what was happening
        and then when i finally looked outside the silence,
        i could see the core prying at the dull plane, preparing to open a gate...
        which immediately revealed a problem: the core does not usually have a gate-capable organ!
        and from what the others told me, every resource was starting to get pulled down here...
        those two facts are enough to know the core is being used in a very, very bad way!!
        so, i just started doing my job
        that is what the point of the dull mind is, after all - to deal with dull issues
        or... was, haha
        the silencing spires would have been a start to containing it, if we were just a little faster...
    
    cavik
        so--you gave up?
            EXEC::vnp({cavik: "showleft"})
        is there no way to stop this??

    idril
        oh, sure there is
            EXEC::vnp({cavik: "hide"})
        the core has been siphoning resources from every connection it has
        mainly the spine and the heart, which is why the spire is suffering
        we would just have to sever the core from its resources
        probably with bombs, which... we have the materials for, right here
        our silencing spires used a great deal of unstable components from local golems
        then, vekoa, if she has any sense at all, which... 
        i am not sure of anymore, honestly
        she should stop the ceremony, or risk starving the core to death
        because, she needs it, to do whatever she is doing
        but what is the point of all that if we have to break the spine connection, you know?
        without the spine, we cannot do structure-wide instruction even if we seize the core
        sooo... the spire is going to collapse on all of us anyway
        maybe it is best if we let the contrivance form and whisk us away
        the embassy will still collapse on itself afterwards, but...
        who knows where it will go, maybe it is nice! and we might even live!
        oh, but wait...
        if you have a movefriend, maybe we should get out of here instead?
    
    sourceless
        she speaks as if the decision were no more than a plan for the next meal...
        and awaits my response with the most idle curiosity in the tilt of her receptors
        with both of our plans in ruins, is there really no option?
        it truly sounds like we can only flee...
        leave behind a cave-city worth of qou to be devoured
        across my team, the sentiment is so low--everyone is of like mind
        but i cannot let this rest... 
        i must find a way to at least help anyone still alive!!
    
    idril
        we would just need to wait for telyu to get back, first
        yes, she has been so worried ever since our plans fell through
        once she finds your movefriend, she will probably come to get me too
        or... maybe she just leaves without me, hehe...
        i do not think she likes me very much...

    gakvu
        we modified it to listen only to us, that will not happen
    
    sourceless
        karik's silence is finally broken
        their voice swells with even more hope
    
    karik
        telyu?!
            EXEC::vnp({karik: "show far", idril: "show far"})
        she lives??
        akizet--that is my vel friend, the one i told you about!!
            SHOWIF::"embassy__d3_mind-grab"
        akizet--that is a close friend of mine!
            SHOWIF::["embassy__d3_mind-grab", false]
        she worked in materials... that is a long way to descend!
        ahh, imagine how much she must have fought through without a timestopper!
        that is telyu, all right!
    
    sourceless
        some spirit returns to karik, standing taller
        as tall as a mindcore might, at least
    
    idril
        uh-huh! 
            EXEC::vnp({karik: "hide", idril: "show far"})
        she is somewhere around here...
        ohh, what? timestopper? 
            EXEC::vnp({idril: "show"})
        that is what those connectors are?
        woww, you are so lucky! i only ever got to use it once
        anyway, that gives me an idea...
        if you do not want to just flee, and you really really want to stop this...
        then bombs are not such a bad idea
    
    akizet
        how does that make a difference? 
        the spine connection will still be broken, yes?
            
    idril
        right, but... the timestopper is pretty powerful
        it is maybe the third or fourth grandest cyst in the spire? something like that
        and as you know, it even comes with robust dull connections!!
        so, whoever enters the core after we take it back,
        they could use the core's strength and authority to reform it into a biiig relay
        something that can claw around in the dull to find and connect to the spine
        then, it would serve as a very loud, angry, and distant vertebra!
        obviously that is not ideal, and really not something that should be done, ever,
        but we are past that now, right? ahaha
    
    tozik
        this is insane
            EXEC::vnp({tozik: "showright far", idril: "focus"})

    akizet
        idril--how difficult is that? is it something we can do quickly?
            EXEC::vnp({tozik: "hide"})
        what i am really asking, is it actually feasible?
    
    idril
        oh sure, the core comes with all sorts of natural impulses and knowledge
        between that and the timestopper's strength, anyone could do it pretty fast!
        it would not be as strong of a connection, so you would not get very fine control...
        but it might be enough
        
    akizet
        and if vekoa chooses to keep the ceremony going, at risk of starving the core...?
    
    idril
        oh, then we run for the movefriend and try to get out
        because that would be it
    
    sourceless
        immediately, i turn to the others
        out of everyone, tozik stands out, steadying himself against a container, distracted
        he notices my gaze, and dips his receptors affirmatively
        insane as it may be, it makes sense, even allowing for an escape plan
        everyone else is similarly stirred by the possibility
        even bozko, whose receptors plainly curve with hope again for the first time
    
    akizet
        if that is our only chance... even with the risk,
        yes, we will do it!
    
    idril
        ok
        cavik, come, help me link these together
        we will need to make some pretty strong explosives
        we should have them form little silences around themselves until they detonate
        in the dull plane, small silences are impossible to notice from the outside,
        so they should totally slip the groundsmind's eye
    
    cavik
        oh, yes! perfect!!
            EXEC::vnp({cavik: "showright far"})
        let us do that!
        and then we can also put one in each of these containers, so that they are more disguised!
    
    idril
        ah, smart, yeees!
    
    cavik
        oh one issue--the structure... 
            EXEC::vnp({cavik: "show"})
        if we detonate the spine and heart, will this not totally collapse their chambers?
    
    idril
        it sure will!
        that is why we will have a little detonation cyst to remotely activate them
        
    cavik
        no, i mean, what if...
    
    karik
        cavik, do not worry!
        the groundsmindry θsegment is built out of a rigid pale corru shell,
        and within it, each chamber is totally isolated--a safety precaution
        it is standard for vertical spires
        the chambers will collapse, but all it will do is block our paths
        but the spine and heart are adjacent, so we will have a path no matter what
    
    cavik
        all right!
        
    sourceless
        cavik follows idril's lead, leaning over the containers to pick out components
            EXEC::vnp({cavik: "show far", idril: "show far"})
        as idril begins to connect cysts, cavik pushes containers closer
    
    idril
        it will not take long to prepare, so--ready yourselves!
            EXEC::vnp({cavik: "hide", idril: "show"})
        the spine is just down the next corridor...
        plant a bomb there, do the same in the heart, 
        then circle around and detonate from the lesser mind, yes?
        it will probably be safest there, since it is opposite to our targets
        
    akizet
        i see...
        all right, the path is clear enough - we are aligned, idril
        but the timestopper is not responding... 
        i fear entering this silence may have broken our connection

    cavik
        oh, no, it is fine!!
            EXEC::vnp({cavik: "showright far", idril: "show focus"})
        it does not work like that, direct connections are more like tethers
        we are still connected, since we entered the silence on this side!
        umm... think of it like, the tethers are bunched up on the outside of the silence
        and they will spring back to us as soon as we leave!
        it will be a little unpleasant!
    
    akizet
        ah, what fortune! i see, i think...
        thank you, cavik
    
    sourceless
        ...
        with all of these revelations, all of this planning, we have barely checked in with tozik
            EXEC::vnp({cavik: "showright far", tozik: "showleft far", idril: "show focus"})
        he truly does not look well, his qou-body still strangely warped in the slightest way
            EXEC::vnp({cavik: "hide", tozik: "showleft far focus"})
        hard to place, but enough to notice
        but he has not spoken of it at all
        nor of what he saw upon connection... something is eating at him
        both physically and mentally
        even though idril has set to work with cavik, i must ask
    
    akizet
        ...idril, did any of your team try to use the lesser mind?
            EXEC::vnp({tozik: "hide", idril: "focus"})
    
    sourceless
        she pauses, cavik at first picking up the slack, but soon noticing her apprehension
        
    idril
        ...yeees...
        two... no, three of the others we lost, tried to use them
    
    sourceless
        she slowly returns to her process, merging some cysts together
        returning her gaze to me only through a sidelong glance from the corner of her eye
    
    idril
        that is what happened to your θjut friend, right?
        sorry... i was waiting for a good time to bring it up
        we called it the contact affliction
        i am still not really sure what actually causes it, but...
        anyone who tried to connect to the core directly got it
        they started to feel strange... like a larval illness
        organs started to fuse, then they entered a dreamlike state...
        one of them felt better for a little while, and even seemed stronger
        but then, well, they started speaking madness, and...
        we did not let anyone get past that point
    
    sourceless
        she grows quiet again, turning up towards the third pod,
            EXEC::vn.done();setCam({x: 2.5, y: 5, rotation: 90, offsetCamera: "rotateX(20deg)"});
        then me,
            EXEC::vnp({idril: "show focus", hideStage: true, bg: true})
        then tozik--speaking to him directly
            EXEC::vnp({tozik: "showright far"})
    
    idril
        listen... 
        once it starts to get bad, you should disconnect from the timestopper
        just in case, ok?
        if you can find a spare mindcore somewhere, maybe try doing an emergency renewal
        but... um, we did not

    sourceless
        across our team, a new dread grips all of us
            EXEC::change("PAGE!!e4prog", 4);refreshStage({noFlash: true})
        there was at least some peace in knowing final death would be quick, before...
        tozik is least deserving of this--how could we have been so careless?
        and after all that talk of infection, too...
        this θdeathly state of ours has made us too sure of our own resilience
        he only slowly dips his receptors in response
        perhaps if we act quickly enough, we may find some help for him after our success?
        gakvu approaches him, speaking quietly--some reassurances, i am certain
            EXEC::vnp({gakvu: "showright far"})
        despite this zenruka looming over us, our new path shines ahead
        after all, it would have been unlike velzie to merely crush our hopes...
            EXEC::vnp({tozik: "hide", idril: "hide", gakvu: "hide"})
        all we need to do... 
        is go out, fight, place these explosives... and retake the core
        i only hope this is not another cruel feint
            EXEC::setCam();

    sys
        NOTICE::'marked entities contain dialogue unique to this stream segment'
        ADVISE::'interact before advancing';'utilize PROCEED entity to save or advance stream'
    
    RESPONSES::akizet
        let us prepare<+>END
            EXEC::vn.done();pauseSwapCam(false);

SKIP::flash(false);change("PAGE!!e4prog", 4);setCam();changeStage("grm_dull_back");pauseSwapCam(false);vn.done()
`)


/**** DULL MIND - !P4 - optional dialogues ****/
// one of the few 'questions' type chats in this episode
env.dialogues.dullidril = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        how is this happening?<+>core
        our foes?<+>foes
        vekoa?<+>vekoa
        golem sigils?<+>sigil
        dullima pods?<+>pods
        cavik knew ceremony<+>ceremony
        nevermind<+>END
            EXEC::vn.done()
`)
env.dialogues["dull_cavidril"] = generateDialogueObject(` 
loop
    RESPOBJ::dullidril

start
    sourceless
        cavik and idril have organized some of the dead containers nearby, operating upon an open one
            EXEC::vnp({cavik: "show far", idril: "showleft focus", bg: true, hideStage: true})
        nearby, piles of organized cysts lie on the ground
        their work is almost wordless as dull-colored cysts are placed within and connected to one another
        in my observation, i linger near enough to gain their attention
        but it does not halt their efforts
    
    idril
        hii akizet
        was there something else you needed?
    
    RESPOBJ::dullidril

core
    akizet
        idril!
            EXEC::vnp({cavik: "hide"})
        given your expertise, perhaps you know...
        how is it that the core is able to do this?
        it surely was never equipped to act as a catalyst for a ceremony
    
    idril
        ahahaha, no, no, of course not!
        but at the same time, it always was... just not intentionally
        really, any cyst with enough mental strength is capable of weaving with the dull, with a little modification
        of course, the core likely needed a few new organs and a particular formulation of sfer to begin,
        but with its reshaping ability, and the bodies and golems that got dragged to the core chamber...
        that must have been trivial
        so, the only thing it would have been missing were the ceremony's sacrifices...
        a wealth of resources, which, also, were actually around it all along!
        the spine, and its knowledge pool running below our feet... 
        the dense organs here in this pale corru shell, and the rich spireblood they helped to carry...
        it would have been absurd to think anyone would actually do this,
        but the tools were always within plain reach of the groundsmind
        if they were murderous enough

    akizet
        did you and your team try to attack the core directly?
        force her out, somehow?

    idril
        haa, well, the option did come up...
        but then we saw that every golem and qou-body was gathering within
        it was smarter to stop it from the outside
        maybe if we had the timestopper it would have been possible...
        oh well!
    
    RESPONSES::akizet
        i see<+>loop
            FAKEEND::(back)

vekoa
    akizet
        idril!
        did vekoa ever... hint at this?
        ever do anything suspicious?
    
    sourceless
        how could i phrase this to someone who surely knows nothing of the conflict?
        "has she ever expressed a desire to awaken an ancient entity buried deep in the bright ocean?"
    
    idril
        ummm...
        we did not really talk much
        imagine the coldest ekivik you know,
        and then make them so distant, that they are always just barely out of sight
        that is vekoa
        always here, always operating and watching, and very good at it!!
        but so very detached from everyone, even down here
        she worked so hard, so constantly, rarely ever leaving the core
        it was like she thought she was alone in her work, sustaining everyone above by her efforts alone!
    
    sourceless
        she pauses to lean into the container, connecting some cysts in the dark of its corners

    idril
        you might think i dislike her because i say that,
        but that is what made her a very good groundsmind, actually
        very fast, very confident decision-making, usually for the best...
        in fact, if it were not for the senseless violence the others told me about,
        i would think she has a very good reason to be trying to make a ceremony!
        and who would do it better? nobody! ahaha
    
    cavik
        wait, you never saw what was happening outside of here?
            EXEC::vnp({cavik: "showright far", idril: "focus"})
    
    idril
        oh, no, not physically...
        when i have not been helping build with the things the others brought me,
        i have been back in the dullima pod, watching
        it all seems so far away in there, hehe
            EXEC::vnp({cavik: "hide", idril: "focus"})
    
    RESPONSES::akizet
        ...<+>loop
            FAKEEND::(back)

foes
    akizet
        idril!
        have you been attacked, here?
        do you know anything of our foes?
    
    idril
        oh, well, i have not really been out of here, sooo...
        i know the others broke the core chamber door,
        and then did some little tricks with the barricade to fake a collapse
        they even severed nerve connections in particular spots that i had no knowledge of!
        very clever! telyu came up with the idea
        but... no golems have gotten through
        especially not since most of the ones outside the core were slain and brought here for our plan
    
    akizet
        golems?
        idril, there are no golems out there--not even bodies
        no, no--i speak of the dull... creatures...
    
    sourceless
        i struggle to place the words to describe them
        creatures? illusions? specters?
        even though it was so recent, it feels as though the events are fading from my memory
        memories of the dull are so often hard to recall, and this overlap is no exception
    
    akizet
        we were in the lesser mind, and something, a wave, passed over us from the core
        the chamber twisted without breaking, changing into different shapes
        and then they came through, these shapes of dull-light
        appearing like qou or golem, i think--but they were hazy, inaccurate
        we struck them, they fell, they disappeared as if they were never here...
        but more formed, effortlessly, until vekoa cast us aside

    sourceless
        idril pauses her work to stare at me absently
        a slight confusion forms in her receptors
        i would have expected complete bewilderment
        maybe this is sounding familiar to her?
    
    akizet
        cavik--maybe you can articulate it better? you know more of this subject
            EXEC::vnp({cavik: "showright far", idril: "focus"})
        the dull plane is beyond my grasp
    
    cavik
        uh...
            EXEC::vnp({cavik: "focus"})
        sorry, akizet, i--i really do not have a better description, either
        you really have not seen anything strange, idril?

    sourceless
        idril leans against the container, gaze long drawn away in thought
        there is a pause before she returns to us

    idril
        ahh, well, while observing the ceremony from my pod, i did see the last pulse...
            EXEC::vnp({idril: "focus"})
        you see, the ceremony, it is really just a big corrucystic construct, one that exists mostly within the dull plane!
        and it grows in pulses, each expansion allowing its tendrils to establish it further
        it is part of how contrivances are formed, but usually it all happens too quick to observe like this
        the wave you saw was definitely the overlap expanding, which is normal
        and the distortion of the chamber really sounds like yutzi's displacement...
        a rarely observed phenomenon in overlaps, where anchoring tendrils, ah, 'displace' physical space
        really, it is more of a 'pulling' than a 'displacement', if the theory is right
        but i will spare you all the specifics, hehe
        it would have to be that the ceremony was specifically, consciously grasping the chamber you were in
        like grabbing a <span definition="TRANSLATION FAILED::CAUSE:'no equivalent internal meaning';'no relevant inherited context'::ROMANIZATION FAILED">A6qw­ý¢è</span> through its protective membrane, but without breaking it
    
    sourceless
        cavik has paused his work, fascinated
        it seems this phenomenon is new to him as well, despite his past work with the dull

    idril
        but, known phenomena aside, there was something really strange
            EXEC::vnp({cavik: "hide"})
        tendrils from the ceremony that would normally be structuring themselves outwards,
        acting like anchors for its growth,
        they acted abberantly, curving around the overlap--into the groundsmindry θsegment as a whole
        deviating from the ceremony, folding back into it, making...
        hmm, making...
        sorry, it is hard to describe the dull plane in so few words, ehehe
        to put it simply, i thought it was the result of some sort of incoherence!
        as in, parts of the ceremony falling apart...
        but it sounds like vekoa is actually diverting focus from the ceremony intentionally to make your creatures!
        using the ceremony's limbs to form shapes within the dull, somehow giving them intelligent direction
        and then stabbing them back through the overlap, into our side...
        just enough to become physical
        from your description, i think their presence may still have served as anchors in the widening of the ceremony, maybe incidentally
        but that is completely crazy, though!! to have such accurate control!
        i could not even imagine the focus required!
        and to have the tendrils animate like intelligent creatures...
        ahaha, i mean, akizet, that has just never been done!
        yes, yes, totally unprecedented
        wow... i kind of want to see them myself, now
        but it is better if i stay back
        be sure to keep a record of your sight for me!

    RESPONSES::akizet
        ...<+>loop
            FAKEEND::(back)

sigil
    akizet
        idril!
        these golems...
    
    sourceless
        i gesture to the golem components that lie around, dissected and bare
    
    akizet
        when you got them, did they have a groundsmindry control sigil?

    sourceless
        my question draws cavik's attention
        a perk of realization in his receptors - he must have had the same question, but forgot to ask

    akizet
        in those we fought, we observed that they had one,
        something like a spiral, an indistinct spinning mass...
        but apparently, they had these even after upper groundsmindry was ceased, according to the terminals here
    
    idril
        huuh
        they were already dead when the others brought them in!
        oh! but there was one...
    
    sourceless
        she pulls herself from the container, 
        untangling her claws from connective veins to point at a nearby pile
            EXEC::vn.done();setCam({x: 7, y:8, height: 0.75, rotation: 135, offsetCamera: 'rotateX(-20deg)'});
    
    idril
        yeah! this one was incapacitated, but still active when they brought it in
        i think the silence cut it off, since the sigil vanished shortly after...
        and while i cut organs from it for use in the other silence spires,
        i did notice it was very strange inside! very strange!
        quite a lot i could not use, all melted together
        still, control sigils, you know, they are just for accountability
        if you do not have a signature when you are controlling a golem, it will intuit an identifier!
        like a name, or some impression gathered from your mind...
        really, it is just a rare fallback, nothing to be relied upon
        i do not think i had ever seen it in use before!
        velzie alone knows what they saw, haha
        
    sourceless
        she sets back to work without another thought
            EXEC::setCam();vnp({cavik: "show far", idril: "showleft focus", bg: true, hideStage: true})
        cavik and i briefly exchange glances out of worry, but there is nothing more to say
    
    RESPONSES::akizet
        ...<+>loop
            FAKEEND::(back)
            EXEC::

pods
    akizet
        idril!
        what exactly do these pods allow you to do?
        can we use them to stop any part of this?

    sourceless
        i gesture to the angled pod entrance overhead

    idril
        oh, hmm...
        the dullima pods work similarly to remote coordination pods, if you are familiar!
        they have a paired maintenance drone within the dull plane, and when you connect,
        naturally--physical senses do not apply within the dull plane, ahaha
        so it substitutes physical senses for approximations of dull perception!
        just a few, and they are imperfect... but enough to relocate and operate upon dull structures!
        that is, if they are rotated correctly, and properly acknowledging their own point of origin...
        oh, and are you familiar with the concept of <span definition="INHERITED CONTEXT::'operating procedure required for most dull construction';'partial meaning loss due to damaged context'">self-imposed proximal location</span>?
    
    sourceless
        one of dullzkovik's classic standards?
        of course, i do not know the specifics, but at this time, i do not care
        she is growing far too distracted from the point here
        as if time were not running out
        cavik seems to understand my frustration before i even say anything
        he pauses, giving idril a little fold of his receptors, as if to urge her onward
        quietly requesting her help with their bomb
    
    idril
        oh, hehe, right...
        yes, so, to simplify, the ceremony is probably not operating under any correct procedure
        so it would actually be very difficult to locate anything vital with the drone...
        that aside, the silence is active, so--if i took the drone out of its equivalent radius,
        it would just disconnect until the silence turned off!
        and then we would probably be attacked!
        so, no, actually! 
        the pods will not help us here!
    
    akizet
        i see...
            
    RESPONSES::akizet
        unfortunate<+>loop
            FAKEEND::(back)
            EXEC::

ceremony
    akizet
        cavik!
        how did you realize it was a dull ceremony so quickly?
    
    cavik
        oh! it was the distortion on the swarm displays...
            EXEC::vnp({cavik: "focus"})
        there is this unmistakable pattern that forms whenever corru tries to represent the dull plane
        it is pale, usually with flickering black stripes
        i saw it often during my work on the life-pod project!
        it is the result of attempting to map dull light to a physical sense here
        similar to incoherence, actually, which is why i did not realize it right away...
        but as i looked over the displays, it formed in my mind as a possible cause
        only reinforced by the distortion being in the same place
        especially with the addition of that θsegment map tozik was clawing at...
        ah, and the θwindow's display, too!
        the realization that it was a ceremony was like a veilk stomping on my head!

    akizet
        a shared reaction, my friend
        if you had not come to that realization,
        we may have split up as planned, and...
        well, it is so fortunate we have you here

    sourceless
        cavik chuckles, bashfully returning to work upon the explosive
    
    cavik
        thank you, akizet

    RESPONSES::akizet
        ...<+>loop
            FAKEEND::(back)
            EXEC::vnp({cavik:"far", idril: "focus"})

END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
SKIP::vn.done()
`)

env.dialogues["dull_gaktoz"] = generateDialogueObject(`
start
    sourceless
        tozik and gakvu linger near the operational shield
            EXEC::vnp({gakvu: "show", tozik: "show", bg: true, hideStage: true})
        by their stances, in the aftermath of some quiet and grim conversation
        perhaps it is not the best time, but i must check in
    
    akizet
        friends!
        tozik
        how beholds you?
        
    tozik
        hello akizet
        we were just speaking of... our interim groundsmind
        our plan for recovery, should this new approach work
    
    akizet
        what of it?
        is there a best course you have decided?
    
    sourceless
        the silence that follows is sharp enough to carve a mural
    
    akizet
        what... what is the issue?
    
    tozik
        it is not just a matter of structural knowledge anymore
            EXEC::vnp({tozik: "focus"})
        the timestopper will need to be reshaped, the groundsmind will need to learn the core quickly...
        idril downplays the complexity involved
        what needs to be done is advanced engineering that none of us are readily equipped for
        gakvu is good with instruction, but her expertise would be better served on foot
        if we can halt the collapse for long enough, we will need her to help with the areas that groundsmindry can no longer reach
        you saw those spine outages
        i fear cavik would crumble under this pressure, he has never done well with it
        idril... has a sparse connection to reality
        everyone else is not even close to an acceptable level of corrucystic engineering knowledge
        the only choice... the only real choice,
        is me, akizet
        and now i have, somehow, contracted the only qou illness in history
        which apparently tears down its victims to pure madness within θwinks
    
    sourceless
        i look to gakvu for anything else, some other light to look to
        but get only a resigned twist from her receptors
    
    akizet
        then...
        
    tozik
        we do not flee
        i am dead either way, you know this
        with no guarantee of a cure, especially in whatever madness may persist outside,
        i will not die a coward

    gakvu
        funny as it may seem, it is the same for me
            EXEC::vnp({tozik: "defocus"})
        if we live, with what i have done and shared with you all,
        i will certainly be killed for my 'traitorous' actions
        so if my death is as certain, then why not risk it all?
        velzie and all beyond the stage will applaud this ridiculous plan
        doubly so if it actually works

    akizet
        if we are the ones to do it, then it will
        both of you, everyone with us
        there is no other assembly i would trust with this task
        but we must hurry

    RESPONSES::akizet
        stay ready to move<+>END
            EXEC::vn.done()
        
END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
SKIP::vn.done()
`)

env.dialogues["dull_boz"] = generateDialogueObject(`
start
    sourceless
        bozko stands here in the outer hall, watching over the entrance
            EXEC::pauseSwapCam(true);setCam({x: 10, y: 4, rotation: 35});
        perhaps as an excuse to avoid conversation
        it normally would be so unlike him,
        he has always been the one who brings forth conversation for its own sake
        enough to befriend tozik, long viewed as a great achievement
        but this θgaze has made him unrecognizable
        it is not that he changed...
        it was some part of him long detached, buried, uncovered by this tragedy
        forming the whole of his person, unseen before, perhaps not by anyone since he left obeski
        he is still our bozko, but weighed down with a grief that has never been processed
        we must not let it carry him out of reach
        so... i can only try to be here for him
    
    akizet
        bozko...
        we will be moving before long
        what is on your mind?

    bozko
        it is this door

    sourceless
        he gestures towards the core chamber door, a grand construction
        it shines with hardened spireblood, surely part of the sabotage to make this area appear lost
        or, at least, to make the heavy doors unable to move
    
    bozko
        vekoa, or what wields her, is not stupid
        she must know we are here
        that idril is within
        and it was she who sent us here
        she could take any number of actions to crush us immediately
        to collapse something just upon this one chamber,
        with absolutely no consequence to whatever she is doing in there
        and why would she not? you have seen the carnage above us
        i have been searching for a reason...
        but there has been no reason before, why would there be one now?
        why did we ever think that θdeath would free us from our larval problems?
        perhaps all of this bloodshed was stupid chance, as much as it was back home
        a single spore landing in the right place on a wall to kill everyone
        to have us tear each other apart after so many θeyes of progress, so many θeyes of happiness
        to... to have my gauntlets around the necks of monsters formed from the flesh of my friends
        until the bitter end, where the final memory of us will be lifeless sludge polluting the cousin's waters
        
    sourceless
        just as his voice nearly rises with despair, he comes to a stop,
        grasping his face with one of his gauntlets, away from me
        this is not about the door, not about vekoa
    
    bozko
        akizet, it... it feels like i am awake again
        like all of our work, those good times in recreation, were not real, never were
        that everything between the fall of my home to parasites and now was just a dream
        a dream that is quickly fading from memory, having no place here
        as if it is only now, when the violence has returned, that anything is real again
        even if we escape, it will only be a distraction
        what gakvu revealed is clear enough
        this will all come for us again--forever
        that twisted repetition we can never stop

    sourceless
        ...
        i do not know what to say
        the burden he shoulders is far beyond anything i know
        and to handle this sort of violent sadness is well beyond my expertise
        but i do know - when a runner spirals into despair, there is one thing that can help ground them
        so i approach him, and delicately, channeling the humors of a tir as best i can,
        i pull him into an embrace
        he is silent, unreciprocal, but...
        the tension in his receptors' stance is lessened
        i only relent and speak after a θblink of peace
    
    akizet
        bozko,
        it is this place that is not real
        a nightmare, an interruption
        and it is almost over
        <em>this is going to work</em>

    sourceless
        he does not respond
    
    RESPONSES::akizet
        we will get through this together<+>END
            EXEC::setCam();pauseSwapCam(false)
        
END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
SKIP::setCam();pauseSwapCam(false)
`)

env.dialogues["dull_milkar"] = generateDialogueObject(`
start
    sourceless
        miltza and karik linger near the dullima pods
            EXEC::vnp({miltza: "show", karik: "showleft", hideStage: true, bg: true})
        there is some quiet, somber chatter between them
        as i approach, they both briefly glance at me in acknowledgement, but karik continues with a small voice,

    karik
        it felt like we were getting somewhere
        i am no tir! right? i have never had to help someone deal with it...
        especially not in a direct mental connection
        but, i am no stranger to it, either
        my father fought with the same separation trauma after my mother passed
        me, my sisters and brothers, it was like we became invisible to him
        he told me once that it was like the world was fading around him
        an eye torn from his head
        and he passed within θeyes, quiet, not ill, just unable to continue
        so... yes, i am fine, and i know it was not my fault
        it just feels unfair
        ...
        hehe, really, the only way it shakes out to <em>being</em> fair,
        is if you are right about all this
    
    sourceless
        karik pauses, and while it is a natural place for miltza to speak,
        she is hesitant--picking words very carefully, more than she might have normally
        is it because i have approached?
        i think no less of her--i show this plainly to her in the loose shape of my receptors
        she is still no enemy
        maybe that is what she needed to continue
    
    miltza
        that is what i want to believe, karik
        whether it is in there, or somewhere else beyond velzie's stage
        in the end, our lives and θdeaths are only dreams
        and whatever it is that makes us up, it returns to the same place when we wake
        surely to dream again in time
    
    sourceless
        there is a silence, an end to what must have been miltza's check-in with karik
        it is good that she did--she has been the true navigator of itzil's situation
        their attention turns to me, and i dip my receptors in greeting
    
    akizet
        forgive my intrusion
        we will need to move again soon, so...
        i wanted to see if either of you needed help
    
    karik
        well, a new body would do
        none of the golems here are suitable, they have all been thoroughly gutted
        i feel... useless

    akizet
        nonsense!
        even without a body, your structural knowledge has proven to be vital
        perhaps even more than your fighting ability--not that it is lacking
        but if you stay and coordinate with idril, this new plan will be unstoppable
    
    karik
        ah! you have a point...
        idril seems clever, but... i can tell by her voice,
        she is sleepwalking, it is like she cannot tell the air from the walls
        not that it is any easier for me in these warped spaces! haha!
        but if i help ration the explosives that remain, so that each explosive is just strong enough,
        to take out the spine, the heart, ideally only half of the lesser mind, that we might pass through it again...
        yes, i suppose my knowledge would be well-placed, here!
        haha! akizet, you are quite skilled at finding the light between the veilk-stalks

    sourceless
        if only to cope with this situation
    
    akizet
        hehe
        thank you
        and, miltza?
        are you prepared to continue with our plan?
        
    miltza
        without any doubt, akizet
        it is true that i dream of a peaceful joining with the meteorite,
        but this... 
        this is not how it should be

    RESPONSES::akizet
        agreed<+>END
            EXEC::vn.done()
        
END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
SKIP::vn.done()
`)

env.dialogues["setout"] = generateDialogueObject(` 
start
    sys
        ATTENTION::'thoughtform combat imminent';'proceed?'
        
    RESPONSES::self
        ok<+>go
        not yet<+>END

go
    sourceless
        those of us connected to the timestopper gather near the door
            EXEC::vnp({hideStage: true, bg: true})
        with the golem lost, we now only have six... just six fighters
            EXEC::vnp({tozik: "show far", gakvu: "show far", bozko: "show far", miltza: "show far", cavik: "show far"})
    
    akizet
        my friends, the nature of our foe is still unknown to me
        but... it is clear that it may seize memories from those it kills
        from itzil, our foe may have learned our initial plan - to circle, then enter
        it might have been a problem before, but now...
        this works to our benefit as deception!
        were she to learn our intentions to detonate critical organs, she may react harshly
        so, we must take great care... no more losses
        after all, if she truly cannot see the silences and believes us to only have force,
        then the detonation will take her by surprise when it is too late to stop us
        understood?
    
    sourceless
        some affirmative waves of receptors - yes, the stakes are known
    
    akizet
        karik, stay here and help where you can, until we call you forth
        your structural knowledge will be critical
        but without a body, you are at great threat
    
    karik
        right!
        keep an eye out for telyu, ok?
        you will know her by her tuvazu-tail
    
    akizet
        of course
        bozko, you must take great care especially
        you are the only remaining high-pressure body
        do not become overzealous in your protection

    bozko
        understood
    
    akizet
        and tozik...
            EXEC::vnp({tozik: "focus"})
        i am sure idril could use your help preparing here
        are you certain you are well enough to continue fighting?
    
    tozik
        i will continue
        if i am lost, then i would have my final θwinks be in service of our plan
        
    RESPONSES::akizet
        then let us go<+>END
            EXEC::change("PAGE!!e4prog", 5);changeStage("hall_dull-spine");vn.done()

SKIP::change("PAGE!!e4prog", 5);changeStage("hall_dull-spine");vn.done()
`)

/* 
    !P5 / !P6 - Archival Spine - the base of the spine that runs up through the embassy 
*/
env.dialogues["spine"] = generateDialogueObject(` 
start
    sourceless
        beyond this hideously distorted door is our first stop - the spinal link
        more of those creatures must linger beyond, surely standing guard
        maybe simply existing to expand the ceremony
        or maybe vekoa prepared them to stop us should we have found our way through?
        ...but from doing what? surely they cannot simply be here to kill us
        and she cannot know of our new plans already
        does she really think these things will stop us so easily?
        after all, she seems entirely capable of reason
        so why does she not simply destroy us all herself, as she did itzil?
        are we so small a threat to whatever she is doing,
        that she does not care to deal with us directly?
        but there is no time to interrogate these thoughts further
        we must enter and deal with our foes
        stepping closer to open it, a flare of indistinct thoughts and senses burn through my mind
        as cavik said - the timestopper reconnected!
    
    timestopper
        hello?
        ok yes yes
        we are good
        everyone - we need only remove their presence, move in a bomb, and continue
        
    RESPONSES::akizet
        enter and fight!!<+>END
            FAKEEND::start combat
            EXEC::env.grm.combat("ep4_spine")

SKIP::env.grm.combat("ep4_spine");
`)

env.dialogues["archivist"] = generateDialogueObject(`
start
    sourceless
        it is as we expected - another warped space
            EXEC::env.rpg.classList.add("hideteams");env.rpg.setCam({playerRotation: -45, playerTilt: -30})
        the true shape of the room is here, somewhere, but beyond us
        strangely, there are no foes to be seen...
        but a lifted section of the chamber hangs in the center,
        the spinal tether - a lift to the base of the archival system above
        but paused, out of reach
        and a shape moves around its surface, half obscured from our angle
        another survivor?
        could it be like karik said? are they evacuating, still?
        across the timestopper, we share a decision: speak
        and so, i call up to them...

    akizet
        hello? are you all right?

    sourceless
        my voice echoes, warbles, seems to create a ripple in the overlap itself
        i have disturbed something
        the shape upon the tether steps closer to its edge, staring down at us
        it is malvi--the lead archivist, receptors drawn back with a sort of annoyance
            EXEC::env.rpg.actors.spine_archivist.piece.focusOnTile();env.rpg.setCam({x: 11, y: 7, playerRotation: -45, playerTilt: -30})
        still living, despite all of this?!
    
    cavik
        malvi!
        come, quickly, we have a--
    
    sourceless
        gakvu is the first to grasp that something is wrong, warning us with an impulse
        cavik falls silent, and before we have time to investigate...
    
    archivist
        «½8ësearch teamÍ»?
        }íspeaks clearlyÿB  ut²åÿ±á
        ¬¨»no time for distractions
        co m e w€ºù|±|h m e

    sourceless
        faint arcs lead from their silhouette into the light
        like tendrils of the overlap, wielding their corpse as a zuzucri might
        or is that the contact affliction?
        malvi raises their arms, claws seeming to disappear into the haze
        and at once, illusions of golems press through the overlap around us
            EXEC::env.rpg.spawnGolems();env.rpg.setCam({x: 11, y: 7, playerRotation: -45, playerTilt: -10});
            WAIT::1000

    timestopper
        they are lost
            EXEC::env.rpg.actors.akizet.piece.focusOnTile();env.rpg.setCam();
        we must clear the area
        and...
        deal with the archivist, if there is no other way

____SHOWIF::"gameplay_off"
    sys
        NOTICE::"gameplay is presently disabled";"re-enable in SYS menu if undesired"
____END
        
    RESPONSES::akizet
        attack!!<+>END
            SHOWIF::["gameplay_off", false]
            EXEC::env.rpg.classList.remove("hideteams");env.rpg.grid.querySelector('.spinecolumn').style.backgroundImage = "url(/img/local/embassy/mind/spinering_dither.gif)"
            FAKEEND::(begin)
        attack!!<+>nogame
            SHOWIF::["gameplay_off", true]
            FAKEEND::(begin)
    
nogame
    sourceless
        together, we fight off these illusions, shaped like archival golems
        a natural choice for malvi, given their position, but...
            EXEC::flash(true)
        is it as simple as a choice? are they taking shapes arbitrarily?
        these beasts seem to be formed out of the dull light of the overlap
        could they not be anything?
        we destroy them, taking some hits of our own...
            EXEC::flash(false);env.rpg.enemyTeam.members.forEach(m=>m.hp = 0);updateStats(true)
        
    RESPONSES::akizet
        ...<+>CHANGE::archivist2
            FAKEEND::(continue)
`)
    
env.dialogues["archivist2"] = generateDialogueObject(`
start
    sourceless
        the archivist recoils in pain, claws drawn back to their sides
            EXEC::env.rpg.archivistCutscene(1);env.rpg.grid.tileEffects.forEach(e => env.rpg.grid.deleteTileEffect(e))
        their shape writhes in the light of the overlap,
        as if we have been striking them this whole time
    
    archivist
        ¤±Òÿ=WA ST ING %‰¶š TI ME
        [¶ÿ=>drastic measure)%‰
        ÷no!²²ave rs i on¬_.g?ç
        )§=X«všrpers®¿æshÞ»

    sourceless
        they step forward, tumbling off the tether
            EXEC::env.rpg.archivistCutscene(1)
        and when they strike the ground...
            EXEC::flash(true)
        the overlap twists, coils tighter around itself
            EXEC::env.rpg.classList.remove('spinelift', 'ep4scene');env.rpg.archivistCutscene(2)
        malvi is drawn back to their feet by what wields them
            EXEC::env.rpg.actors.spine_archivist.piece.focusOnTile()
        i mistake their stance at first for anger, senseless fury
        but in their twisted receptors is a great fear
        this is no husk...
        are they being animated against their will?
        perhaps we might be able to help, but...
        they clearly intend to kill us
        we can only defend ourselves

    sys
        ANALYSIS::'context shift'
        NOTICE::'entity ARCHIVIST';'acts twice'
            
    RESPONSES::akizet
        attack!<+>END
            FAKEEND::(continue)
            SHOWIF::["gameplay_off", false]
            EXEC::env.rpg.halt = false;if(env.rpg.haltedAttempt) advanceTurn();env.rpg.classList.remove('hideteams')
        attack!<+>nogame
            SHOWIF::["gameplay_off", true]
            FAKEEND::(continue)
    
nogame
    sourceless
        malvi, or... whatever wields them,
        is vicious, wild
        their many claws allowing them to strike constantly, possessed of some endless energy
        all while they seem to call invisible limbs, surely extensions of the ceremony, to lash out at us
        we may be conflicted, but there is no mercy here
        malvi is stopped through relentless attacks of our own
            EXEC::env.rpg.halt = true;env.rpg.enemyTeam.members.forEach(m=>m.hp = 0);updateStats(true)
        
    RESPONSES::akizet
        ...<+>CHANGE::spine_clear
            EXEC::env.rpg.halt = false;closeCombat(env.rpg.enemyTeam);flash(true)
            FAKEEND::(continue)
`)

env.dialogues["spine_clear"] = generateDialogueObject(` 
start
    sourceless
        when malvi falls, the distortion fades, drawn into itself
            EXEC::flash(true)
        for an instant, i could see their limbs being pulled in different directions
        and when my vision stabilizes... the spinal root is dark
            EXEC::env.embassy.slowCam();change("PAGE!!e4prog", 6);changeStage("grm_spine");setCam({x: 1, y: 8, rotation: -90});
        the archivist's body lies lifeless - more mangled than we left it, curiously
            EXEC::setCam({x: 2, y: 8, rotation: -135});
        as if the receding overlap tore something within them away
        could a mindcore still be within? some remnant?
        and the tether has fallen--or was it on the ground the whole time?
        even after the overlap's recession, i still feel it...
            EXEC::setCam({x: 3, y: 8, rotation: -90, height: 1.7, offsetCamera: 'rotateX(20deg)'});
        a physical uncertainty at the edge of my senses
        where does the room truly end and begin?
            EXEC::setCam({x: 5, y: 8, rotation: -20});
        our victory is but a stone dropped in water
        rippling the surface of the overlap, revealing what lies below, but soon to settle again
        still, the critical parts we have come to detonate are within plain view
            EXEC::setCam({x: 6, y: 6, rotation: 45});
        these spinal roots, connecting to the great pool of knowledge beneath our feet,
        will sever the core completely from the spine if destroyed
        in the center stands the spinal tether - a stabilizing structure and lift, still mostly obscured
            EXEC::setCam({x: 6, y: 8, rotation: -90, height: 2, offsetCamera: 'rotateX(20deg)'});
        its terminal presents more worries to hang over our heads
            EXEC::setCam({x: 6, y: 8, rotation: -90});
        visualizing breaks and snaps throughout the spire,
        veins and supports falling apart overhead, colliding with one another,
        surely withered by having the life drained from it for this process...
        and so the time comes for our first charge to be deployed
        i signal to cavik and bozko behind, who recede into the hall to fetch it from idril
        and just after they exit, the hall opposite to theirs briefly opens
            EXEC::setCam({x: 7, y: 9, rotation: -90});
        more foes? hideously timed--does vekoa suspect something?
    
    timestopper
        with me, everyone
        we cannot let them see the bomb being set!!
    
    sourceless
        as i step out to face whatever opened the door, i see...
            EXEC::setCam({x: 10, y: 9, rotation: -80});
        nothing?
        the others gather around and behind me as i advance
            EXEC::setCam({x: 12, y: 8, rotation: -90});
        though--why would these creatures even use the door?
            EXEC::setCam({x: 12, y: 8, rotation: -140});
    
    akizet
        hello?

    telyu::dark
        hey, easy, i am a friend
        
    sourceless
        a voice - physical, sane, another qou - sounds from behind us
        and so we turn, but there is nothing there...
            EXEC::setCam({x: 12, y: 8, rotation: -270});
    
    telyu::dark
        you do not want to go that way,
        vekoa is doing something... creating these twisted illusions
        fortunately, they could not see me!
    
    sourceless
        i look back at the others, wary, suspecting i have a defect
        but they are similarly confused
        with a focusing of my eyes, i see a vague shimmer...
        just in time for it to flicker away, revealing our qou
            EXEC::vnp({telyu: "show far", bg: true})
        a cloaking skin! of course! where did she find that...?
        and a tuvazu-tail, just as karik described...
    
    akizet
        yes! hello! are you--telyu?
        i am akizet
    
    telyu
        yeah...
        you already met idril, then?
        did you bring that movefriend here? it told me to look for you
        you must have been looking for me too, huh?
        thank you for waiting, but we should get out while we can

    sourceless
        her eyes flick up to the imperceptible ceiling
        it is bathed in darkness, yet still lit with a dull haze
        like smoke gathering in a cave, creeping closer to suffocate us
    
    telyu
        i do not know what is happening, but...
            EXEC::vnp({telyu: "show", hideStage: true})
        it will probably only get worse

    akizet
        no, no, actually--we devised a new plan with idril!
    
    sourceless
        she evaluates us skeptically, glancing towards the grand door
        returning a confused scoff and vague gesture towards the madness above
    
    telyu
        to stop <em>this?</em> do not joke with me here
        the only plan that will work is one where we get off this island before it is lost
    
    sourceless
        before i can explain, the dull mind hall opens again, and telyu turns, ready to fight
        but it is merely bozko, escorted by idril and cavik,
            EXEC::vnp({bozko: "showleft far", cavik: "showleft far", idril: "showleft far", telyu: "focus"})
        as he carries in our disguised explosive
        karik stands proudly atop the container, pointing with a spindly leg
    
    karik
        all right! all right! near the center here should be a good spot...
        just next to the base of the tether, but a little removed, opposite of the core chamber door...
        we do not want to damage the core chamber in the process, after all!
    
    bozko
        got it
            EXEC::vnp({bozko: "show", telyu: "defocus"})
        i can take it from here
    
    cavik
        who is that?
            EXEC::vnp({cavik: "show"})
    
    idril
        hi telyu!!
            EXEC::vnp({idril: "show"})
        karik, catch her up, ok? i need to prepare the silence and detonator
    
    telyu
        karik??
            EXEC::vnp({telyu: "focus"})
        detonator, what--?
    
    karik
        telyu!
            EXEC::vnp({bozko: "hide", cavik: "hide", idril: "hide", karik: "showleft"})
    
    sourceless
        though she faces away, i see excitement and hope swell in her receptors' curl
        even her tail's movement... not an unusual cosmetic choice, given tuvazu's appeal
        but the motion is very natural--she must have been a rare tail-bearer in life
        karik leaps off the container, skittering over to her,
        and she kneels to greet them with an embrace
    
    telyu
        ha ha! look at you!
        did you finally exhaust your closet of bodies?
    
    karik
        oh, i can explain all! yes, all of our...
        our victories
    
    sourceless
        even as they find a perch upon telyu's shoulder, karik's pride falters
            EXEC::vnp({karik: "hide"})
        the same wound still remains fresh in all our minds
    
    karik
        but, where to start?
        well, we should speak of our new plan, first!
        come, look at what we have created! just over there, by bozko, the big kiv
        yes, we are planting bombs to sever the resources that...
    
    sourceless
        as telyu carries them away, and the plan is outlined further,
            EXEC::vnp({telyu: "hide"})
        shock gives way to realization, and hope, all before she leaves my sight
        i turn to gakvu, tozik and miltza, still lingering near me
            EXEC::vnp({gakvu: "show far", tozik: "show far", miltza: "show far"})
    
    akizet
        tozik, are you able to continue?
    
    tozik
        yes... 
        yes
    
    sourceless
        there is little more we can do than allow him to continue fighting
    
    akizet
        all right...
        once idril is done, we will be just a few steps away from victory
        let this cloud drift by
        there is only the explosive placement in the heart, then the lesser mind...
    
    sys
        NOTICE::'marked entities contain dialogue unique to this stream segment'
        ADVISE::'interact before advancing';'utilize PROCEED entity to save or advance stream'
    
    RESPONSES::akizet
        prepare<+>END
            EXEC::change("PAGE!!e4prog", 7);refreshStage({noFlash: true});vn.done();setCam();

END::env.embassy.slowCam(false)
SKIP::change("PAGE!!e4prog", 7);changeStage("grm_spine");refreshStage();vn.done();setCam()
`)


/**** !P7 - Spine's optional dialogues and bomb/setout ****/
env.dialogues["spine_kartel"] = generateDialogueObject(`
start
    sourceless
        near the door to the heart's hall, telyu and karik linger
            EXEC::vnp({karik: "show", telyu: "show", hideStage: true})
        she sits against the wall, holding an arm up for karik to speak upon
        before they are audible, i see karik swatting at the air as if punching,
        surely recounting our victory in golem maintenance
        telyu snickers, receptors slightly curled with contentment

    karik
        ...with that one last punch!!
        and so the chamber's dull beam, made hazardous by the damage,
        melted away at the flesh of our beastly foe!!
        just enough for poor itzil, recently awoken, to channel their rage...
        between the two of us, it was lifeless before it even could have known!

    sourceless
        as i approach, their attention shifts to me

    telyu
        and here is your fearsome director
    
    karik
        hello akizet!

    akizet
        it is good to see you both in such high spirits!!
        have you learned of our plans?

    telyu
        and more

    sourceless
        all of that good nature faded away as soon as i started speaking,
        a new sardonic sharpness in her voice setting me at unease
        did karik tell her about my confession...?

    karik
        yes, once i told her all about our progress and plans here,
        i started working backwards!

    telyu
        akizet, it is mad
            EXEC::vnp({telyu: "focus"})
        but we came down with a similar dream,
        my team and i...
        anyway, i will not help you fight
        but i will disable every method the groundsmind has of monitoring your progress
        i picked up a few things from the engineers here

    akizet
        that could be helpful, but...
        your team - were they among the qou who went up into the spine?
    
    sourceless
        her receptors twist into a sour coil
        for a θblink, she stares up into the madness of the overlap, past me

    telyu
        yeah...
        ...
        idiots

    sourceless
        flat-toned, sharp...
        while at first it seems a shockingly cold statement,
        remembrance of some past argument is practically visible in her receptors
        i have touched upon a wound
        but that is even more reason to ask,
    
    akizet
        if we destroy this chamber as we plan, the tether will be broken...
        there will be no way back for them, and no easy way up from here
        at least, not until we seize the core and create new paths...
        but to that end
        no detonation will happen until all charges are placed
        so... do you want to split off to look for them, before then?

    sourceless
        telyu's eyes close, receptors coiling tighter
        karik glances between us both with muted worry

    telyu
        do you think i have not tried?
        have you seen the map of the spine?
        they strode into a collapsing cave
        so no, akizet
        i will help here
        and if any still live...
        your insane plan is the only chance i have to help them
    
    RESPONSES::akizet
        then be ready<+>END
            EXEC::vn.done()
        
END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
SKIP::vn.done()
`)

env.dialogues["spine_cavmil"] = generateDialogueObject(`
start
    sourceless
        by one of the spine's roots, miltza and cavik chat
            EXEC::vnp({miltza: "show", cavik: "show", hideStage: true})
        cavik is speaking in a familiar way--intense curiosity, with the illusion of being hushed
        but he has always had this habit of speaking too loud, so i hear anyway
    
    cavik
        i see, i see!!
            EXEC::vnp({cavik: "focus"})
        it is such an interesting view...
        what if it is not an organic development, though?
        perhaps an ancient construct?
        surely you are familiar with the <span definition="INHERITED CONTEXT::'disputed theory of corru origin';'supposes natural spires and corru veins are not natural'">progenitor theory</span>!
    
    sourceless
        where gakvu might be annoyed at what surely has been incessant questioning,
        miltza is clearly entertained, answering kindly
        despite the circumstance, she is without fear for the first time since we met
        at least, for this θblink

    miltza
        ahehe, well, there are internal theories, yes...
            EXEC::vnp({miltza: "focus"})
        but i have no particular holding to any one
        really, it should make no difference
        an ancient creature, a construct, some fragment of a greater origin...
        regardless of any descriptor, should we not want to know what its purpose is?
        though, if all of this is possible from only a briefly emitted signal from it...

    sourceless
        she shifts uncomfortably, looking away from cavik
        towards my approach--for this line of thought has inspired me
            EXEC::vnp({miltza: "defocus"})

    akizet
        miltza, cavik!

    cavik
        hello!

    akizet
        miltza, i wanted to ask...
        given what we just fought here, and your... unique knowledge,
        what do you make of these entities we face?
    
    miltza
        i am only a sculptor, akizet, my involvement aside
            EXEC::vnp({miltza: "focus"})
        but after all we have seen, 
        i suspect that whatever directs the ceremony is absorbing any thought it can
        memories, images of self, schematics for golems from the spine's vast knowledge...
        after all, we stand atop a lake of memories and designs!
        to what end, i cannot say, really
        but that is how it must be able to weave such familiar shapes
    
    cavik
        but this does line up with your expectation of awakening, right?
            EXEC::vnp({cavik: "focus"})
        minds and thoughts being collected within a great mind?
        if the meteorite is on the other side, 
        and it is what animates these shapes somehow,
        do you think the minds of the slain qou are still within?
    
    miltza
        i...
            EXEC::vnp({miltza: "focus"})
        i do not know whether to hope they are, or not
        if they are illusions, minds wielded like bait by a parasite...
        that is bad, yes, but...
        if they are truly qou, the same we used to work with,
        why would they act this way? 
        how could they have changed so much?
        malvi just tried to kill us all
        without hardly any attempt to communicate...
        where is the reason? the kindness?
        i will not lie and say i do not wish for an awakening...
        the possibility to join with the ancient mind
        but...
    
    sourceless
        miltza's receptors fidget, and she stares at the core chamber door

    miltza
        this is not right
        
    RESPONSES::akizet
        agreed<+>END
            EXEC::vn.done()
    
END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
SKIP::vn.done()
`)

env.dialogues["spine_boztoz"] = generateDialogueObject(`
start
    sourceless
        in the distance, a terminal lingers
            EXEC::setCam({x: 8, y: 16, rotation: 180});
        even with some eye adjustment, the terminal's display is too warped to understand...
            EXEC::setCam({x: 8, y: 30, rotation: 180});
        it is attached to nothing, impossibly beyond the bounds of the dark wall, yet still visible
        bozko stands by, puzzled, while tozik is harder to discern
            EXEC::setCam({x: 8, y: 16, rotation: 180});
        but he greets my approach

    tozik
        akizet
            EXEC::vnp({tozik:"show left shiftleft"})
    
    akizet
        what do you make of this?

    tozik
        the terminal?
        it functions, surprisingly, but it does not say anything we do not already know
        the spine is crumbling
        although, interestingly, if you look here...
    
    sourceless
        tozik gestures out towards the terminal, claw extending beyond the border of the wall
        specifying some quadrant of the swarm-display in the distance
        how is that possible? is the wall truly gone?
        does he not see the problem here?

    akizet
        no, tozik, i mean the...
        the position of the terminal
        should it not be directly in front of us?
        and upright?

    sourceless
        i similarly gesture out to the terminal,
        but find my claw colliding with the wall that ought to be here
        in the distance, i see the display of the terminal warping slightly
        the same distortion that could be caused by simply waving a hand in it
        i step back, taking a θblink to recalibrate my eyes...
        to no effect
        tozik's head hovers closer to the wall, twisting upside-down, eyes similarly adjusting
    
    tozik
        oh...
    
    akizet
        you see it too, right bozko?

    bozko
        yes
            EXEC::vnp({bozko: "show"})
        i simply thought tozik was reading it from here
    
    sourceless
        an impossible inconsistency--one that i see no matter where i stand
            EXEC::vnp({bozko: "hide"})
    
    akizet
        it must be an effect lingering from the overlap, right?
        tozik, what do you see?
    
    tozik
        i see the terminal, akizet
        it...
        i am not sure how to place this
        it just makes sense to me
    
    sourceless
        spoken with concern, as if i am the one with the issue
        i reach out again for the wall, but find my claw passing through, beyond the edge
            EXEC::vnp({tozik: "hide"});content.classList.add('brightprep')
        and out of curiosity, i extend my head beyond it as well,
            EXEC::setCam({x: 8, y: 17, rotation: 180});content.classList.add('brightzone')
        where the dark turns to dizzying dull light
        it is truly mystifying
        ...at least, until my claw meets something large and cold
        something that moves in reflex, squirming away like a disturbed veilk branch
        i pull myself back to the dark, shocked, claws ready for some retaliation
            EXEC::content.classList.remove('brightzone')
        bozko stands ready as well, the need to ask 'what happened' well beyond us
            EXEC::setCam({x: 8, y: 16, rotation: 180});vnp({tozik: "show", bozko: "show"})
        but nothing comes
    
    akizet
        tozik, i think your affliction...
        it must be affording you some insight we lack
    
    tozik
        yes, that must be
            EXEC::vnp({tozik: "show shiftleft", bozko: "hide"})
        the overlap's effects are plain to me
        if i focus, i can tell that something is wrong, but...
        it does not hinder me enough to notice otherwise

    sourceless
        perhaps this symptom is of some use
        for example, if we get lost in the overlap, maybe he could guide us
        but if this is his new grasp upon reality,
        how can i trust that he will know when he is becoming a danger?
            EXEC::vn.done()
    
    akizet
        i see
        bozko... as a precaution
        watch him, keep him grounded
    
    bozko
        all right
    
    RESPONSES::akizet
        thank you<+>END
            EXEC::setCam({});content.classList.remove('brightprep')
        
END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
SKIP::vn.done();setCam({});content.classList.remove('brightprep')
`)

env.dialogues["spine_gakdril"] = generateDialogueObject(`
start
    sourceless
        while idril rummages with the contents of the container bomb,
            EXEC::setCam({x: 8, y: 11, rotation: 0});
        gakvu stands watch, attention distant
        she stares towards the core chamber, some exertion in her receptors

    akizet
        hello gakvu, idril!
            EXEC::vnp({gakvu: "show", idril: "show", hideStage: true})
        no problems?

    idril
        nooope!

    gakvu
        it is fine here
        but...
    
    sourceless
        her gaze is drawn upwards, sweeping from left to right
    
    gakvu
        the sensation of the overlap is so strange
            EXEC::vnp({gakvu: "focus"})
        i feel things moving around us...
        oh, idril, let there be no confusion--i have a groundsmindry-pattern mindcore

    idril
        cool!

    sourceless
        idril does not draw away from her work
    
    gakvu
        but when i try to place where these things are, i cannot
        like imagining a shape in my mind's eye, 
        and trying to track specifically where in my body i see it
        as if i could pluck it from myself, and have it vanish
        
    akizet
        i am not certain what you mean, gakvu

    idril
        i am!
            EXEC::vnp({idril: "focus"})
        you are probably feeling the tendrils of the ceremony grasping at the space!
        on the other side!
        the nearby overlap might be giving them some physicality in a way you can feel
        they are technically made of corru, though that is a whooole different matter
        still, do not worry about them too much! they should be harmless!
        at least until the overlap closes in around us again, and they can come through...
    
    gakvu
        how is that possible? that the overlap can shift like this?
            EXEC::vnp({idril: "defocus"})
        is it not simply an area around the ceremony?
        
    idril
        well, it is more like, ah...
    
    sourceless
        idril withdraws from the box to think for a θblink
    
    idril
        like prying open a very resilient gate!
            EXEC::vnp({idril: "focus"})
        an incision is made, in this case by the core,
        and you stick something into it, and pry one way or the other
        sometimes with yield, sometimes without, requiring that you try elsewhere
        and sometimes getting pushed back by someone on the other side! ahaha
        but eventually, the gate is torn open
        that is the ceremony! yes!
        a many-limbed gate-opener!
        the overlap really is just a place where the cracks have been pulled wider
        you should read about ceremonial operations sometime!
        they are so fascinating!
    
    sourceless
        idril returns to wiring her explosives
        and gakvu returns her gaze to me, with a wry twist in her receptors

    gakvu
        well, that is my answer, then
            EXEC::vnp({idril: "defocus"})
        what about you, akizet?
        are you all right?
    
    sourceless
        i am so fixed upon our goals, that the question staggers me
        am i all right?
    
    akizet
        i...
        there is so much to process
        velzie twists our path so much, it is hard to even think
        but... for now, yes

    RESPONSES::akizet
        thanks<+>END
            EXEC::setCam();vn.done()
        
END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
SKIP::setCam();vn.done()
`)

env.dialogues["spine_malvi"] = generateDialogueObject(`
start
    sourceless
        the archivist...
            EXEC::setCam({x: 4, y: 9, rotation: 180, offsetCamera: 'rotateX(-20deg)', height: 1});
        despite my efforts, i cannot find a mindcore in any component
        not the head, not the torso...
        malvi's blood still stains my claws, both from the fight, and from this excavation
        we truly killed them...
        but possessed by a parasite as they were, there was no other way
        a grim image of our larval past, a mirror of terrible life
        none of us are strangers to this
        we may grieve for malvi's loss in time
        but as they say in a true infestation,
        as long as it still festers, it is unwise to linger upon grief
        gakvu approaches me as i claw through the corpse
    
    akizet
        gakvu, are you able to sense a mindcore in any of this?

    sourceless
        she crouches nearby, tilting her head this way and that

    gakvu
        akizet, there is nothing in here
        if there was a mindcore...
    
    sourceless
        gakvu's gaze drifts over the components i have removed in my search
        some are far larger than they should be
        what we recognize to be internal regulators are fused, elongated
        and many others are completely unfamiliar
        their appearance puts her receptors in a puzzled twist

    gakvu
        it is not a mindcore anymore
        i do not recognize a single one of these
        it is the same phenomenon that i saw in the golems...
        the same that idril described with the affliction
        
    sourceless
        she says no more, rising slowly and returning to the tether
        i had expected her to continue with her thoughts, but...
        when i see the coil in her receptors, i come to the same realization
        this is tozik's future
        
    RESPONSES::akizet
        ...<+>END
            EXEC::setCam({})
        
END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
SKIP::vn.done();setCam({})
`)

env.dialogues["spine_bomb"] = generateDialogueObject(`
start
    sourceless
        preparations and repairs complete, i await the team
            EXEC::setCam({x: 15, y: 9, rotation: 90});
        fortunately, the overlap has remained parted around us...
        did vekoa not feel us fight it back?
        surely she must suspect something
        perhaps it is resource intensive to retaliate immediately?
        too costly to pull from the ceremony?
        or... 
        do our efforts not matter to her at all?

    idril
        ok! all done!
            EXEC::vnp({idril: "show", hideStage: true})
        me and karik will return to the silence, but...
        telyu, perhaps you could join them?
    
    telyu
        as long as you do not expect me to fight
            EXEC::vnp({telyu: "show"})
        i will simply help cover movements
        perhaps breaking θwindows will be a good start
        warped as they may be, they are still a part of the structure...
        and may bear eyes to see
        yes, i will creep ahead to tear them away
    
    akizet
        very well
        onto the heart, then, right?
    
    karik
        yes! the heart is up next!
            EXEC::vnp({telyu: "hide", idril: "hide", karik: "show"})
        do be careful though, it weaves many connections!
        this makes it the least safe chamber, structurally speaking
        you must take care! great, great care!
        ahh, my shining friends!! i wish i could guide you directly as you fight!
        my knowledge would surely be of use, even without a timestopper
    
    telyu
        if you attach to my shoulder, i can cloak you too, you know
            EXEC::vnp({telyu: "showleft"})
        assuming you hold no conflict in sharing skin
    
    karik
        ah! really? thank you, telyu!! yes! let us do that!!
        to think i would share bodies for the first time this θgaze,
        only to do it twice!
    
    telyu
        skin, not body
        i would not let you drive this qou-body for a θblink, kequvi
    
    karik
        sure, sure!
        let us see where velzie takes us!
    
    sourceless
        to think karik's spirit still holds so strong...
        perhaps it is because of telyu alone
        their voice changes when she is around
        regardless, time to move
            EXEC::vnp({telyu: "hide", karik: "hide"})
        i lead the team into the next hall
            EXEC::setCam();change("PAGE!!e4prog", 8);changeStage("hall_spine-heart");vn.done()
        the heart awaits

    RESPONSES::self
        continue<+>END
            EXEC::vn.done();setCam()

SKIP::setCam();change("PAGE!!e4prog", 8);changeStage("hall_spine-heart");vn.done();
`)

/**** !P8 / !P9 - the heart ****/
env.dialogues["heart"] = generateDialogueObject(` 
start
    sourceless
        like the spine's hall, this door warps in a similarly unsettling way
        it reforms slightly as we approach, our presence acting like cavelights in darkness
        illuminating how it should appear, pulled away from the dull's gray light
        another threshold... another chamber coiled in the ceremony's parasitic tendrils
        we will deal with them
        there is no time for doubt--not anymore, and not after what we have seen
        
    RESPONSES::akizet
        proceed<+>enter
            FAKEEND::start combat
            EXEC::flash(true)

enter
    sourceless
        we push through the haze...
            EXEC::env.grm.combat("ep4_heart");env.rpg.classList.add('hideteams')
            WAIT::500
        to find a strange clearing
            EXEC::flash(false)
        barely visible dead containers line its distorted edges
        it must be that these are grasped by vekoa, probably being consumed...
        suddenly, a flare of panic passes through the timestopper
        as tozik peers into the haze beyond
    
    tozik
        it was waiting for us
            EXEC::env.rpg.halt = true;env.rpg.settings.turnCallback(env.rpg.enemyTeam.members[0], env.rpg.allyTeam.members[0], true)
        brace yourselves - an impact impends
            EXEC::env.rpg.grid.advanceTileEffects({prevActor: env.rpg.enemyTeam.members[2], actor: env.rpg.allyTeam.members[0]});env.rpg.grid.tileEffects[1].tiles[0].focusOnThisTile()
    
    sourceless
        i do not question him
            WAIT::400
        all of us brace instantly, and as he said--
            EXEC::env.rpg.grid.runTelegraphsInQueue()
            WAIT::4000
            AUTOADVANCE::
        as if we stand near the steps of a great veilk,
        we are tossed about, something manipulating the chamber's physicality
    
    sys
        ANALYSIS::'context shift'
        NOTICE::'ally team turn start is subject to unresistable strength 2 knockback'
            EXEC::env.rpg.settings.turnCallback(env.rpg.enemyTeam.members[0], env.rpg.allyTeam.members[0], true)

____SHOWIF::"gameplay_off"
    sys
        NOTICE::"gameplay is presently disabled";"re-enable in SYS menu if undesired"
____END

    RESPONSES::akizet
        fight!!<+>END
            EXEC::env.rpg.halt = false;showActions(env.rpg.currentActor);env.rpg.currentActor.piece.startMovement();env.rpg.classList.remove('hideteams');
            FAKEEND::(continue)
            SHOWIF::["gameplay_off", false]
        fight!!<+>nogame
            FAKEEND::(continue)
            SHOWIF::["gameplay_off", true]
    
nogame
    sourceless
        another close fight, headed by a singular brutish creature
            EXEC::flash(true);env.rpg.enemyTeam.members.forEach(m=>m.hp = 0);updateStats()
        charging about the space, threatening to throw us into the destructive distortion at its edges
        all while shapes beyond our perception thrash us to and fro
        but with my direction - we manage to repel them with our own brutal approach
        
    RESPONSES::akizet
        ...<+>END
            EXEC::env.rpg.settings.manualStopCallback(env.rpg.enemyTeam)
            FAKEEND::(continue)
`)

env.dialogues["heart_wall"] = generateDialogueObject(` 
start
    sourceless
        with these lesser instruments of vekoa broken apart,
            EXEC::env.rpg.grid.style.setProperty("--playercontrol-tilt-raw", 20);env.rpg.grid.style.setProperty("--playercontrol-rotation-raw", -315);env.rpg.settings.turnCallback(env.rpg.enemyTeam.members[0], env.rpg.allyTeam.members[0])
        the chamber folds into itself, rotated in a way i cannot make sense of
        becoming a similar space, but now divided by a dull shape
    
    akizet
        what is this??
    
    tozik
        have you not been seeing these?

    sourceless
        he speaks as if we cannot see the ground beneath us
        an impulse of confusion is all he needs to begin explaining
    
    tozik
        it is from these limbs that vekoa's aggressors break off from
        i have been noticing them all around us, above, in the distance...
        so i believe them to be the ceremony's anchoring limbs
        this is one of the only major ones intersecting this particular space
        if we sever it, i expect the overlap to recede
    
    gakvu
        you <em>see</em> them?
    
    sourceless
        gakvu's worry is not unfounded
        his affliction is undoubtedly granting him some strange new perception
        but worry can wait
    
    cavik
        ohh--if it is an anchoring limb, then it is stationary!
        i can attach my bombs directly to it, they will work much better!
    
    akizet
        then do it!

    sys
        ATTENTION::'entity CAVIK';'enabled additional actions'
        NOTICE::'PLANT';'attach explosive to target'
        NOTICE::'DETONATE';'activate explosives'
        NOTICE::'extremely effective against destructibles'  
        
    RESPONSES::akizet
        proceed<+>END
            SHOWIF::["gameplay_off", false]
            FAKEEND::(continue)
            EXEC::var i = env.rpg.turnOrder.findIndex(a => a == env.rpg.actors.cavik);env.rpg.currentActorIndex = i - 1;advanceTurn();
        proceed<+>nogame
            FAKEEND::(continue)
            SHOWIF::["gameplay_off", true]
    
nogame
    sourceless
        through cavik's clever application,
            EXEC::flash(true)
        this obstacle, a greater shape that only slightly intersects with our vision...
        it is blown apart
        
    RESPONSES::akizet
        ...<+>CHANGE::heart_clear
            FAKEEND::(continue)
`)

env.dialogues["heart_clear"] = generateDialogueObject(` 
start
    sourceless
        with the last of our strikes, the vein splits apart under some incredible tension
            EXEC::flash(true)
            WAIT::400
            THEN::closeCombat(env.rpg.enemyTeam)
        the room's color and shape swirls back to its true form
        or... it should have
            EXEC::change("PAGE!!e4prog", 9);changeStage("grm_heart");pauseSwapCam();setCam({x: 4, y: 3, rotation: -145});
        but the chamber returns to only the barest memory of how it must have been
        the only sane part of this room is the portion of the spireheart that intersects with it
            EXEC::setCam({x: 5, y: 3, rotation: -170, offsetCamera: "rotateX(20deg)", height: 1.75});
        and what a wretched state it is in
        murky fluid pools at our feet, flooding forth from invisible cracked veins,
        spireblood, corroyi, water... everything the heart circulates
        cascading off into the madness of the overlap
        i am hesitant even to move, for it appears as though the floor has disappeared
        but i force a step forward, finding my feet clicking against something
        the pale corru floor that this chamber once had, it must still be here...
        in some capacity

    akizet
        simply destroying these creatures helped in the spine
        if this chamber is not returning to normal after an even greater blow...
        what does that mean?
    
    cavik
        either we are running very low on time,
            EXEC::vnp({cavik: "show downleft"})
        for the ceremony has grown significantly,
        or... the heart is one of the primary resource draws for this process!
        it is probably totally infested with smaller siphons!!

    tozik
        and that might explain why the upper hearts were damaged...
            EXEC::vnp({tozik: "show downright"})
        vekoa could <em>want</em> the high pressure
        forcing more resources down through the heart

    sourceless
        the heart itself is unmoving, at least the parts we can see
            EXEC::vn.done()
        but it still produces worrying groans...
        yes, we will simply cut it off
        i signal again to bozko 
            EXEC::vnp({bozko: "show", hideStage: true})
    
    akizet
        it is time
        reach us through the timestopper if any threats are posed
        we will guard this place
    
    bozko
        understood
    
    sourceless
        he recedes back through the way we came, along with cavik
            EXEC::setCam({x: 4, y: 3, rotation: -145});vn.done()
        karik skitters after him as well
        they must have leapt from telyu at some point
        i am sure they wish to guide the efforts carefully, 
        especially given the heart's precarious state!
        it is maybe the chamber under the most pressure, from my understanding
        and as i turn back to investigate it further,
        the core θwindow, barely visible through the distortion, flickers from damage
            EXEC::setCam({x: 4, y: 3, rotation: -60});
        telyu appears with a shimmer in the distant corner, a claw half-dug in the θwindow's malleable flesh
            EXEC::setCam({x: 10, y: 2, rotation: -80});vnp({telyu: "show far"})
        or, stuck? she tugs at it with some effort, 
        so, as the others investigate the state of the heart, i go to her
    
    akizet
        what are you doing?
        do you need help?
        
    telyu
        oh--yes, please! 
            EXEC::vnp({telyu: "show", hideStage: true})
        just as another precaution, i have been breaking these projectors...
        the θwindows, they have the capability to give two-way sensory data
        we may stand within the overlap, but the fewer methods vekoa has to watch us, the better!
        already got the one in the spine!
        but i am trying to sever a vein i know is in here, and my claws are not sharp enough!
        my qou-body is the fixed-state type, so i cannot resolve this simply...
        velzie saw fit to make <em>this</em> vein in particular reinforced
    
    sourceless
        strangely thorough, given the circumstances, but it is not unwelcome
        i reach through the softened surface of the θwindow near her claws, pushing through its corroyi-like flesh
            EXEC::vn.done();setCam({x: 12, y: 1.5, rotation: 0});
        and sure enough, it is there, so i begin to press with both of my claws, 
        slowly puncturing what must be a critical vein...
        once i get a grip, she recedes, allowing me to perform my sabotage
        but i still must wonder - how did she learn to do this?
        it is really quite far back there, beyond the point any internal connector would be in a regular θwindow
        perhaps a quirk of the circulation within this θsegment's shell
    
    telyu
        thank you, akizet
            EXEC::vnp({telyu: "show shiftleft"})
        and so our gazes are equal, i feel i should mention...
    
    sourceless
        her voice lowers, inaudible to the others chatting in the distance
            EXEC::ratween(env.bgm, 0.7, 5000)
        
    telyu
        karik filled me in on what you told your team
    
    sourceless
        ...
        my receptors are curling tightly out of unconscious impulse
        the slow twist of my head towards her elicits laughter
        
    telyu
        oh, do not look so shocked!
            EXEC::vnp({telyu: "show", hideStage: true})
        i told him i would not say anything about that part, but,
        well, who could keep quiet about this, right?
        i was always pretty sure something was going on...
        you should have seen what they had me and my team up to during the first veil,
        before we made public contact with the cousins, you know
        but, anyway, i was curious...
        do you blame yourself for all of this?
        
    sourceless
        with a flash of realization and panic, the thought manifests: did she really need my help, just now?
        the room is so warped, these θwindows must hardly be a concern at all
        did she simply want to get me alone?
        then--what is it exactly within this θwindow that i am puncturing?
        is this a trap? does she blame me? is this vengeance for her lost team?
        what happens when i let go?
    
    akizet
        i...
        what do you think?
    
    telyu
        hm...
    
    sourceless
        surely she can see the terror in my receptors
        yet, i cannot make out anything in hers
        she is neutral, unaggressive, perhaps slightly sad--why does she inspire such fear?
        perhaps it is because no well-meaning materials operative still wears a cloaking skin...
        
    telyu
        it is pretty clear that you do
        look at you! ahaha
        but i have not made up my mind yet
        ...
        really, to me...
        it sounds like you were used
        someone cut beneath velzie and manipulated your role
        making you do what they wanted...
        so they would not have to take the fall that you will
        your team can forgive you all they want,
        but it is all misplaced
        for i am sure whoever truly set this trap for you is quietly celebrating
        while all of my friends might be dead, or worse
    
    sourceless
        my gaze drifts away
            EXEC::change("PAGE!!e4prog", 10);refreshStage({noFlash: true})
        this is something i had not truly considered
        the conflict is real, as miltza confirmed
        after all, she was uninvolved in everything that came before, so she had no way of knowing
        so what is telyu really saying, here? what does she know, anyway?
        how could anyone have predicted i would reach for that converter to give to gordon?
        it is impossible to have so much foresight
        she glances towards my claws, still submerged in the θwindow
            EXEC::vnp({telyu: "show shiftleft", hideStage: false, bg: false})
    
    telyu
        do you not think it is a little strange how both of your involved friends forgave you instantly?
        you probably know them better than me, maybe it is not my place to say
        i just wanted to let you know what <em>i</em> thought, from my perch in the herd
        and you can let go of that, you know
        i am sure it is good and dead now
    
    sourceless
        out of precaution, suspicion, i do...
        but i tear them suddenly, stepping back urgently,
            EXEC::vnp({telyu: "hide shiftleft"});setCam({x: 12, y: 3, rotation: 0});
        as if it might explode
        but it does not
        telyu snickers again
    
    gakvu
        are you all right over there?
    
    sourceless
        kÆíáÐ
        i must have drawn attention, so i turn and call to her,
    
    akizet
        yes! fine!
    
    sourceless
        and after my call back, i twist to face telyu
        what a rude, upsetting thing to speak to me about - especially now!
        i should make this known to her
        but... she is gone
            EXEC::setCam({x: 12, y: 3, rotation: 40});
        surely to scout ahead for us, as she did not seem ill-meaning
        but why would she say all of this to me <em>now?</em>
    
    sourceless
        i glance around the room from this vantage point, at my team as they converse
            EXEC::setCam({x: 12, y: 3, rotation: 120});
        who could gain anything from all of this happening?
        should i even entertain this suspicion?
        no--no, we are well beyond suspicion at this point, especially now
        i know i can trust my team
        we need only keep fighting
        but for now, we must wait for the bomb to arrive
    
    sys
        NOTICE::'marked entities contain dialogue unique to this stream sequence'
        ADVISE::'interact before advancing';'memory stream progression is linear'
    
    RESPONSES::akizet
        stand watch<+>END
            EXEC::playerMoveTo(11,3, "left");setCam();

END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
SKIP::closeCombat(env.rpg.enemyTeam);change("PAGE!!e4prog", 10);changeStage("grm_heart");refreshStage();vn.done();playerMoveTo(11,3, "left") 
`)

/**** !P10 / !P11 - the heart's optional dialogues and bomb gone wrog (da bog gog wog) ****/
env.dialogues["heart_tozgakmil"] = generateDialogueObject(`
start
    sourceless
        miltza, gakvu and tozik linger near the heart
            EXEC::setCam({x: 7, y: 4, rotation: 180})
        within its shadow, near a diagnostic pod, the world seems more solid...
        tozik operates on one of his own arms with his corruskivi, examining internals
        surely a grim matter, given their expressions
        i approach, as i must be here for them, and they quiet expectantly
            EXEC::setCam({x: 7, y: 6, rotation: 180});vnp({gakvu: "show", tozik: "show", miltza: "show", hideStage: true})
    
    akizet
        hello friends
        while we wait, do you need anything?
    
    sourceless
        tozik reseals his arm, twisting his receptors negatively
        they are all crushed with fear...
    
    tozik
        another miracle would be ideal
        my mindcore... i have not been able to move it
        so we were just doing a check of my qou-body's organs, and...
        ...
        the timeline is accelerating, somehow
        miltza and gakvu suspect it is our exposure to the overlap
    
    gakvu
        yes, idril implied to me that we had more time than this
        but... her afflicted friends had stayed in the silence of the dull mind
        maybe that is why it took so long to affect them

    akizet
        are you fit to continue using the timestopper?
        
    tozik
        yes, but not for much longer
        i feel... 
        i feel something
        
    sourceless
        tozik is silent
        after a θblink, he merely starts to shake his head, struggling to place words
    
    tozik
        and...
        i think this 'affliction' is a result of what i saw when i connected
        or... what saw me
        
    miltza
        what was it??
        you keep avoiding the subject

    sourceless
        miltza is quick to press the matter
    
    tozik
        i...
            EXEC::vnp({tozik: "focus"})
        i was afraid to share, in case the knowledge itself was the threat
        which sounds impossible, but with what i saw, that is what i believed
        and now... with how little i even remember, i do not think that is the case
        i saw another place, it might have been the dull, but...
        the haze, the solid light that clouds it, was gone
        my sight went on forever
        it is like a vanishing dream now, it began to fade after i disconnected
        i have only fleeting visions, received with borrowed senses
        but it held such color, infinite webs of connections in shapes that are lost to me now
        and before them--beyond them, or in front of me, i could not tell, 
        perhaps it was the space itself
        there was this... presence... 
        it was as if the eye of velzie itself were within claw's reach
        burning its gaze inwards, into itself, into me
        and then--i began to feel myself being dragged, drawn deeper into this vision
        so i found my arm again, back here, and tore the connector away
    
    sourceless
        he continues to shake his head, receptors crushing backwards with despair
        his voice wavers with such terror and sadness, the depth of which i have never seen in him
    
    tozik
        but it still reached for me, even without the connector, and it found grasp in something
        something <em>inside my mind</em>--and it is moving, it is pulling
        the affliction, the infection we spoke of...
        this must be what happens if its first vector is a mindcore
        even if velzie should grant us mercy in finding a spare,
        i do not think a renewal will help me
        it... knows me
    
    akizet
        given all of this, do you think--
    
    gakvu
        that he should stay in the silence of the dull mind?
        i already tried talking him into that
    
    sourceless
        determination swells in his voice
    
    tozik
        yes, and i declined
        at the rate we are moving, it should be fine
        and i will <em>not</em> sit and wait
        not only because i believe i am needed here
        but also, it did not seem to help idril's lost friends
        there is no point in weakening our team for a meager chance
        we all came down here knowing it would mean death
        and i am ready to accept it, if it means we can complete our plan
        if we can save anyone
    
    sourceless
        this θgaze has changed him so deeply
        to think he is capable of such concern for us...
        or perhaps our mundane work in research was simply never enough to let this shine through
        his will is inspiring, enough to allow me to accept his choice
        even if i may disagree
    
    akizet
        all right, but the instant you feel a threshold crossed,
            EXEC::playerMoveTo(7,6,"up");
        or you enter a state like idril described,
        we must take that connector, in case you can spread it to us somehow
    
    tozik
        i know
        it will be done
        time is short, but... every θblink i can help, i will
    
    RESPONSES::akizet
        stay strong<+>END
            EXEC::vn.done();setCam()

END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
SKIP::playerMoveTo(7,6,"up");setCam();vn.done()
`)

env.dialogues["heart_bomb"] = generateDialogueObject(` 
start
    sourceless
        we stand and wait, prepared for the worst--another attack, a call from cavik or bozko...
            EXEC::setCam({x: 13, y: 3, rotation: 130});pauseSwapCam()
        but there is nothing
        instead, our friends shuffle in, container in tow
            EXEC::vnp({karik: "show far", bozko: "show far", cavik: "show far", idril: "show far", hideStage: true})
    
    karik
        all right! oh, how do we do this one...
            EXEC::vnp({karik: "focus"});refreshStage({noFlash: true, specificPlan: "nofriends"})
        it is hard to tell with the overlap, but,
        the big veins here run out to a few lesser organs,
            EXEC::setCam({x: 7, y: 0, rotation: 180, height: 4});vnp({karik: "hide", bozko: "hide", cavik: "hide", idril: "hide", hideStage: false, bg: false})
        one that draws from the ocean, a few for, ah...
        well no need for specifics, but based on the damage,
            EXEC::setCam({x: 5, y: 8, rotation: 225});
        i think vekoa has repurposed most of them
        she must be pulling corroyi from the spire through the heart
        using the pressure to force it downwards, into the organs
        which now probably only serve to feed the ceremony
        so... if we simply detonate beneath the spireheart,
            EXEC::vnp({karik: "show", hideStage: true});
        we could disrupt all the veins at once!
        let us make some space beneath it!
    
    bozko
        how?
            EXEC::vnp({karik: "show far", bozko: "show far"});
    
    karik
        well, smash the terminal, obviously!
        make a big hole in it!
    
    idril
        put the container off to the side, here!
            EXEC::vnp({idril: "show far"});
        cavik, can you help me? i put some more parts in this one...
        with a little recirculation, we can direct the blast upwards
        
    cavik
        right!!
            EXEC::vnp({cavik: "show far"});
    
    tozik
        bozko--do not simply smash the terminal
            EXEC::vnp({tozik: "showleft far"});change("PAGE!!e4prog", 11);refreshStage({noFlash: true, specificPlan: "bombmode"})
        here, let me make an incision...
    
    sourceless
        bozko sets the bomb beside the central terminal, stepping away
            EXEC::vn.done();setCam({x: 5, y: 5, rotation: 225});
        tozik limps closer, examining the sides of the terminal...
        and so the θjut set to their work, while miltza lingers near the door to the spine, keeping watch
        a wise decision, actually - i move to stand near the opposite side, just in case
            EXEC::setCam({x: 13, y: 3, rotation: 130})
        gakvu comes to join me
            EXEC::vnp({gakvu: "show shiftleft"})
        
    gakvu
        i have no alternatives, of course...
        but i hope you realize how absurd this is
        if we succeed, i am not even sure how we can explain our actions
        we will look like the culprits
            EXEC::vnp({gakvu: "show", hideStage: true})
        
    akizet
        we can save that worry for later
        but velzie will reward us for these risks, i am sure
    
    gakvu
        oh, it hates when you say such things, akizet    
    
    sourceless
        i begin to laugh, and so does she
        for i know this so well
        but our laughter is cut short when the θjut begin to shout
        
    idril
        oh--<em>CAREFUL!!</em>
            EXEC::vnp({idril: "showleft far", gakvu: "focus"})
    
    cavik
        back--back up!!
            EXEC::vnp({cavik: "showleft far", gakvu: "focus"})
        come, quickly! everyone!!
    
    sourceless
        what?
        i redirect my attention too late

    sourceless quiet
        something... explodes...
            EXEC::play("dull", 0.5);flash(true);ratween(env.bgm, 0.5);vn.done()
        ...
        my senses take a θblink to respond...
            EXEC::refreshStage({noFlash: true, specificPlan: "collapsing"});setCam({x: 13, y: 3, rotation: 130});env.grm.music_runningoutoftime.rate(0.5);toggleBgm(env.grm.music_runningoutoftime);env.bgm.seek(40)
        but when i recover, my movements are slowed, burdened with the weight of sludge
            EXEC::content.classList.add('heartbreak');flash(false)
    
    sourceless
        the room is collapsing, filling with mixing torrents of corroyi, spireblood, water--
        they hang in the air, forming pools that warp up past the ceiling, then flood into the floor
        nonsensical, but still clearly physical, filling the room rapidly--spreading from the center
        tozik, miltza, and cavik flee into the opposite hall
        i want to go to them, but the force is too strong, even for bozko
        he relents, approaching me and gakvu quickly,
        while the ceiling, the sky of the overlap, seems to push downwards
        whatever reality exists here is still subject to the pressure of the spire, and it is giving way
    
    timestopper
        get out any way you can!!
    
    sourceless
        bozko forces open the door nearby, where gakvu, idril, and i can flee
        karik clings to idril's back
    
    bozko
        come on
        before it performs an emergency seal
    
    sourceless
        i follow without question to the next hall, and the door closes quickly behind us
            EXEC::flash(true)
        the chamber is out of sight, yet murky water still twists and fades in the void beyond the walls
            EXEC::changeStage("hall_heart-entry", false, "right", {specificPlan: "prehelping"});content.classList.remove("heartbreak");vfx({type: "flash", state: false, delay: 1000});setCam({x: 2, y: 3, rotation: 90, offsetCamera: "rotateX(20deg)"})
        our door begins to bulge outwards, lights fading away, but it holds
        i get a good look at the others here... we are separated
            EXEC::setCam({x: 1, y: 5, rotation: 315})
        idril is deeply wounded and bleeding corru, but immediately tending to herself
        the hall here is split apart, twisted like all else,
        but certainly more real than the heart was
        a good sign?
    
    akizet
        what...
            EXEC::setCam({x: 2, y: 5, rotation: 330})
        what happened?
        
    idril
        ahh...
            EXEC::vnp({idril: "show", hideStage: true})
        some of the veins came loose when we tried to shift the container
        i thought they had settled and connected, but...
        haha, maybe some more care was needed
        there was also a malformed dull node, which we thought would be okay...
        ohh well, this is just a little giggle of velzie
        nothing major... but...
        i lost the detonator
        
    sourceless
        we could have lost everyone
        my heart swells with rage at her carelessness
        no, she said 'we' - it was not only her, this is just how she seems to act
        it was an accident anyway
        and she is right - we can recover
        that must be our focus
        
    akizet
        all right, we must draw a new path
        let me contact the others
    
    timestopper
        hello?
            EXEC::vnp({idril: "hide"})
        cavik, tozik, team?
        speak distinctly
    
    cavik
        we are on the opposite side from you, akizet!
        miltza and i are all right, mostly, umm...
        tozik is looking pretty bad though
    
    tozik
        i can still move and fight
        let me do this until we reunite
    
    akizet
        you may not need to if you move quickly enough
        but... the detonator is lost, so we must improvise
        on your way back around, in the spine,
        manually set the bomb to detonate, preferably with you not in the chamber
        then follow the path back to the lesser mind and meet us there
    
    cavik
        oh... all right
        we can do that!!
            EXEC::env.noBgmDuck = true;
    
    sourceless quiet
        suddenly, the okidoia makes itself known again
            EXEC::play('criticalError', 0.3);changeBgm(env.grm.music_oki, {length: 10000, seek: 0});
        the voice, the sensation, the ceremony's ethereal tendrils
        its scream passes through us, and at once...
            EXEC::flash(true);vfx({type: "okidoia", state: true});vn.done()
        the room distorts further, space stretching and warping, never tearing
            EXEC::change("PAGE!!e4prog", 12);refreshStage({specificPlan: "helping"});setCam({x: 5, y: 3})
        and down the hall, twisted shapes appear to us--more foes to be dealt with, slowly forming
        ¥¡åu
        vekoa must know we are attempting something drastic
        our advantage is lost
        and worse still, the least experienced of our team are alone
        this is surely happening on their side, too
        but curiously... the distortion recoils, some entities flickering away before they form fully
            EXEC::content.querySelector(".gridpiece[i='24'] .critta").remove();vfx({type: "okidoia", state: false})
        unable to press through the overlap, to become physical... something is failing on vekoa's side
        is our plan working? is the ceremony starving? 
        is the overlap shrinking?
    
    cavik
        uh... aki...
        they are here, and we really do not have, um...
    
    akizet
        i know
        do not worry, cavik...
            EXEC::env.noBgmDuck = false;

    sourceless
        i speak outwardly to bozko and gakvu, already standing ready to fight
    
    akizet
        gakvu, bozko, cover me
        i must lend my mind and expertise to the others if they have any hope of survival
        just until i can get them to the silence
    
    bozko
        you will be safe
        gakvu, stay behind me

    sourceless
        and to the others... i extend my mind across our connection
    
    akizet
        cavik, tozik, miltza--i may not be there with you,
        but grant me your senses, and i will guide you
    
    sourceless
        i feel an impulse of approval from them through the timestopper
        but no speech, for they must have already started fighting
        i must act now

    sys
        NOTICE::'continuous combat segment approaching';'pausing stream to offer save point'
        ADVISE::'save before advancing';'utilize PROCEED entity to save or advance stream'
    
    RESPONSES::akizet
        prepare to connect<+>END

END::pauseSwapCam(false);setCam()
SKIP::env.noBgmDuck = false;change("PAGE!!e4prog", 12);changeStage("hall_heart-entry");vn.done()
`)

/**** !P12 - the beginning of the split sequence where aki guides others ****/
env.dialogues["split_connect"] = generateDialogueObject(` 
start
    sys
        NOTICE::'resuming stream'
    
    sourceless
        having the permissions i need from the split team,
        i disconnect from my external senses, focusing entirely on the connection
        i cannot mess this up... 
        no more mistakes
    
    RESPONSES::akizet
        connect<+>connect
            EXEC::flash(true)
            FAKEEND::start combat
        
    RESPONSES::self
        delay<+>END
            FAKEEND::(back out)

connect
    sourceless
        implicitly allowing my access through their connections,
        i can see the obstacles that lie ahead
            EXEC::env.grm ? env.grm.combat("ep4_split1") : content.insertAdjacentHTML('beforeend', "<combat-scene scenario='ep4_split1'></combat-scene>");vfx({type: "flash", state: false, delay: 1000});env.rpg.setCam({x: 3, playerRotation: 0, playerTilt: -30, height: 1.5, distance: 2, detailMode: 'tiny', gridTileSize: 100, offsetCamera: 'rotateX(0deg)'});setTimeout(()=>ratween(env.bgm, 0.5), 1000);env.rpg.classList.add('hideteams')
        a handful of vekoa's entities bar their path

    akizet
        this should be trivial
        follow my instruction

    sourceless
        as they advance, ready to fight, the door ahead...
        it distorts, as if something is coiling around it, writhing
        in an instant, it takes the shape of an eye
            EXEC::midCombatActorAdd(env.rpg.enemyTeam, "split_eye", "left");vfx({type: "okidoia", state: "mild"})

    sourceless quiet
        the hall shakes, lengthens, splitting apart the clear path ahead
            EXEC::env.rpg.longmode()
            WAIT::3000
        while i try to think out what to do,
        their panic eats at my focus

    miltza
        how--?
        this cannot be where we die!!

    cavik
        no, no, it will be okay, we just need to hold them off!!
        um, akizet, it moved us, somehow...
    
    akizet
        yes, i...
    
    tozik
        nothing moved
        there is just something in the way
        do you not see it?

    sourceless
        tozik directs my attention with a thought
            EXEC::env.rpg.setCam({x: 3, y: 19, playerRotation: 0, playerTilt: -30, height: 1.5, distance: 2, detailMode: 'tiny', gridTileSize: 100, offsetCamera: 'rotateX(0deg)'})
        the gaps... they are not gaps
            EXEC::env.rpg.classList.add("tendrilveal")

    sourceless
        his altered sight affords worrying clarity of the situation
        distorted barricades stand ahead
        like fallen branches stretched out from the dull haze

    tozik
        they are large tendrils from the ceremony...
        coiling around the hall, interfering with physical space
        i can see it... bending... folding it into itself
        do you see it?

    akizet
        no, just the outline...
    
    tozik
        vekoa must be diverting focus to deal with us directly
        if they are close enough to be physical,
        they are close enough to destroy

    akizet
        cavik--your explosives?
    
    cavik
        oh!! yes!
        if i can get close enough, i can place them directly...
        that should work!!
    
    akizet
        good eye, tozik
    
    tozik
        it is not mine

    akizet
        ah...

____SHOWIF::"gameplay_off"
    sys
        NOTICE::"gameplay is presently disabled";"re-enable in SYS menu if undesired"
____END
    
    RESPONSES::akizet
        begin<+>END
            FAKEEND::(continue)
            SHOWIF::["gameplay_off", false]
            EXEC::env.rpg.halt = false;env.rpg.introDone = true;env.rpg.currentActorIndex = 6;advanceTurn();vfx({type: "okidoia", state: false});env.rpg.currentActor.piece.startMovement();env.rpg.setCam();ratween(env.bgm, 0.9);env.rpg.classList.remove('hideteams')
        begin<+>nogame
            FAKEEND::(continue)
            SHOWIF::["gameplay_off", true]
            EXEC::env.rpg.introDone = true;vfx({type: "okidoia", state: false});env.rpg.setCam();ratween(env.bgm, 0.9)
    
nogame
    sourceless
        fighting through more of the ceremony's limbs,
        the three are ill-equipped to deal with much of what faces them
        but through their own ingenuity and my combat knowledge, they pull through
            EXEC::env.rpg.enemyTeam.members.forEach(m=>m.originalSlug != "split_eye" ? m.hp = 0 : m.hp = 1);updateStats()
        each tendril that falls appears to solidify the space again...
            EXEC::let t = env.rpg.actors.destructible_split_tendril_1;t.hp = 0;updateStats({actor: t});env.rpg.halt = false;advanceTurn()
        splitting apart into more foes to face...
            EXEC::advanceTurn()
        which, in turn, are dealt with
            EXEC::env.rpg.enemyTeam.members.forEach(m=>m.originalSlug != "split_eye" ? m.hp = 0 : m.hp = 1);updateStats()
        and when they reach the door again, still blocked by one last appendage of the ceremony,
            EXEC::let t = env.rpg.actors.destructible_split_tendril_2;t.hp = 0;updateStats({actor: t});advanceTurn()
        it is as physical as every previous obstacle, and torn down all the same
        with particular thanks to cavik's bombs, serving as powerful, improvised blasting charges
            EXEC::env.rpg.enemyTeam.members.forEach(m=>m.hp = 0);updateStats()
        
    RESPONSES::akizet
        ...<+>CHANGE::split_clearhall
            FAKEEND::(continue)
`)

env.dialogues["split_clearhall"] = generateDialogueObject(` 
start
    sourceless
        that shape--the eye, it breaks apart, releasing the door
            EXEC::flash(true);env.rpg.actors.split_eye.hp = 0;env.rpg.actors.split_eye.state = "living";env.rpg.actors.split_eye.lastStand = false;env.rpg.halt = true;updateStats()
        the overlap's grasp of the hall fades
        and so... the path to the spine awaits them

    akizet
        proceed, quickly
    
    sourceless
        no time is wasted as they enter
            EXEC::flash(true);env.rpg.halt = false;closeCombat(env.rpg.enemyTeam);
            WAIT::2000
        the spine is far more incoherent than before - vekoa is surely grasping at it
            EXEC::vfx({type: "flash", state: false, delay: 2000});env.grm ? env.grm.combat("ep4_split2") : content.insertAdjacentHTML('beforeend', "<combat-scene scenario='ep4_split2'></combat-scene>");env.rpg.classList.add('hideteams')
        but still, it is strangely silent, empty...
            EXEC::env.rpg.actors.cavik.piece.endMovement();env.rpg.actors.cavik.piece.stepToCoords(7, 11);env.rpg.actors.miltza.piece.stepToCoords(8, 11);env.rpg.setCam({playerRotation: -45})
        perhaps that attack in the hall was all she could muster?
        is she shifting focus to us, on the other side...?

    cavik
        tozik!

    sourceless
        tozik has fallen to the ground
            EXEC::env.rpg.actors.cavik.piece.stepToCoords(7, 13)
    
    cavik
        tozik??
    
    sourceless
        cavik runs to tozik's side, helping him up to his feet again
        his body is shifting in ways that cavik tactfully avoids perceiving
    
    tozik
        it is... in here...
        akizet, i do not know how much time i have left
        i can hardly tell what is real
    
    akizet
        focus on what must be done, tozik
        and keep in mind how much we need you
        just a little further
        
    sourceless
        with cavik's help, the three proceed to the spinal tether,
            EXEC::env.rpg.actors.cavik.piece.stepToCoords(4, 8);env.rpg.actors.tozik.piece.stepToCoords(6, 10);env.rpg.actors.miltza.piece.stepToCoords(8, 10)
        lingering out of its silencing range
    
    akizet
        you are all doing so well
        once the explosive is ready, flee through the lesser mind as planned
        and tozik, once it is done, take off your connector
    
    tozik
        right
        heading into the silence now
        i am setting it up to detonate as soon as we are out of range
    
    cavik
        yes! miltza and i will keep watch!
            EXEC::env.rpg.actors.tozik.piece.stepToCoords(6, 8)
        akizet, bozko, gakvu - how is it going on your side?
    
    bozko
        it is not as bad here
        but we are still making little progress        
        i keep them afar, gakvu picks them off
        though, she is hurt
        and they keep coming

    gakvu
        akizet, we really need you here as soon as you are able
    
    akizet
        i know
        just a little longer, and that is it
    
    sourceless quiet
        terror rips through the connection
            EXEC::flash(true);ratween(env.bgm, 0.3, 2000);play("criticalError", 0.5);env.rpg.actors.vekoa_boss.piece.moveToCoords(13, 7);env.rpg.actors.vekoa_boss.piece.classList.remove('hide')
        the grand door in the spine--it has opened
            EXEC::env.noBgmDuck = true;env.rpg.classList.add("fearmode", "hideteams");vfx({type: "flash", state: false, delay: 1000});;changeBgm(env.grm.music_antag, {length: 10000, seek: 0});
        and a familiar shape is forming in the space before it
    
    akizet
        what is your status
    
    cavik
        um, tozik is...
        aki, he is saying there is a problem with the setup
        it probably would not have gone off if we had not returned...
        but, we, i do not think we have enough time!
        it--it is vekoa!!

    miltza
        wait, wait,
        there is something...
        that i can try
        no, i...
        i--i have to try
        keep working on the explosive
            EXEC::env.noBgmDuck = false;
    
    akizet
        try what?
        miltza?
    
    sourceless
        suddenly, her senses disappear from the timestopper
            EXEC::env.rpg.actors.miltza.sprite.querySelector('img').src = "/img/sprites/obesk/miltza/gridtiny_nocon.gif" 
        cavik is my only active connection now, and i see...
            EXEC::env.rpg.actors.miltza.piece.stepToCoords(11, 7)
        she has shoved her connector in his confused claws,
        and stormed towards vekoa?!
    
    cavik
        aki--she took off the connector!!
            EXEC::env.rpg.actors.cavik.piece.focusOnTile()
        she is shouting at vekoa, hold on, let me try and feed this through...
    
    sourceless
        miltza is calling to vekoa, challenging her...
        but... vekoa's form is flickering and twitching, unsteady
        the color bleeds from the world around her in radiating waves
        with all we have seen, miltza still tries to reason...
        i focus through cavik's senses until she becomes clear
    
    miltza
        ...no more! i cannot...
            EXEC::env.rpg.actors.miltza.piece.focusOnTile()
        this was doomed from the start
        i have always felt it
        and for what? 
        this must be it, this must be the moment
        vekoa, please,
        if--if this is an awakening,
        if it is finally here
        even imperfect...
        i have to know

    sourceless
        from cavik's view, i can hardly see, but...
        i think vekoa's stance softened
        she is actually listening
        whatever may come, this is delaying her for tozik, at least

    miltza
        i have labored so long,
        done so much in their name,
        yet i have never had any answers... 
        only worthless faith
        please--show me!
        say anything!!

    sourceless
        the sorrow in her voice is striking
        there is no readiness in her stance, this is not just some deception
        miltza's drone is inactive, disconnected, lying on the tether
        she truly intends to...
    
    cavik
        miltza, just--get away from her, come on!
        you have seen what happens!
        
    sourceless
        from within the bomb's silence, tozik speaks to cavik

    tozik
        cavik... go
            EXEC::env.rpg.actors.tozik.piece.focusOnTile()
        i will activate the charge manually
    
    cavik
        what?!
        no, no, tozik, i am not doing that!

    tozik
        this will take too long
        we have one chance, cavik
    
    cavik
        just focus on the bomb!!
    
    sourceless
        miltza storms closer to vekoa, surely to make more demands
            EXEC::env.rpg.actors.miltza.piece.stepToCoords(12, 7)
        but to my surprise, vekoa does not strike
        she reaches out, and grasps miltza in a kind embrace
        one that silences miltza's cries
    
    sourceless quiet 
        dull light distorts around them, and cavik must look away
            EXEC::forcePlay('fear', 0.4);env.rpg.actors.miltza.sprite.classList.add('struck');env.rpg.refresh();flash(true)
        i cannot make out the details
            EXEC::midCombatActorRemove(env.rpg.actors.miltza, {fast: true});
            WAIT::1000
            THEN::env.rpg.actors.split_miltza.piece.classList.remove('hide');env.rpg.actors.split_miltza.piece.moveToCoords(12, 7)
        but something horrific is happening to her

    akizet
        cavik, forget it, you need to move
            EXEC::env.rpg.actors.cavik.piece.focusOnTile()
        now!!
        get tozik, go to the door, and...
            EXEC::midCombatActorRemove(env.rpg.actors.vekoa_boss)
    
    sourceless quiet
        suddenly, cavik is shoved aside, away from the tether
            EXEC::flash(false);setTimeout(()=>{forcePlay('hit');env.rpg.actors.cavik.sprite.classList.add('struck');setTimeout(()=>env.rpg.actors.cavik.sprite.classList.remove('struck'), 300);env.rpg.actors.cavik.piece.knockback({direction: "left", strength: 2});env.rpg.refresh()}, 800)

    sourceless
        and... it lifts up and away, into the spinal system above
            EXEC::env.rpg.up1()
        tozik's unsteady mind speaks through our connection

    tozik
        i turned off the silence for a moment
        there is no room for error here
        once you are out,
        i am going to force this down and detonate it
        so, leave
        before we are both lost
            EXEC::env.rpg.up2()

    sourceless
        cavik's fury flares through my mind as he watches tozik's ascent
        vekoa is gone, too
        but miltza begins to stand... tearing cavik's attention back to her
            EXEC::changeBgm(page.solaMiltzaCombat, {length: 2000, preserve: false});env.rpg.actors.split_miltza.piece.focusOnTile()
        in an instant, the chamber is suffocated in darkness
            EXEC::env.rpg.classList.add('darkwobble', 'miltzamode')
        her twisted shape stares at him, waiting...
        but he calls up to tozik
    
    cavik
        i am not leaving you!!
    
    akizet
        no--tozik, cavik is right!
            EXEC::env.rpg.actors.cavik.piece.focusOnTile()
        this bomb is critical, but so are you
        reactivate the silence and continue fixing it
        and cavik...
        tozik's affliction may be too far progressed - he must stay disconnected
        we need you to stop her
        that is <em>not</em> miltza

    sourceless
        tozik needs no further instruction, his connection disappearing into silence
        cavik's anxiety crumbles before his determination,
        and i feel his confirmation
        with careful aim, cavik pitches an improvised explosive at miltza
            WAIT::2000
            THEN::addStatus({target: env.rpg.actors.split_miltza, status: "unnatural_carapace", length: 2});env.rpg.halt = false;env.rpg.actors.split_miltza.piece.focusOnTile();env.rpg.grid.handleActionAOE({originActor: env.rpg.actors.cavik, targetTile: env.rpg.actors.split_miltza.piece.tile, action: env.ACTIONS["scene_cavik_attack"]})
        but...
        she is hardly affected, stepping forward through the blast
            EXEC::env.rpg.halt = true;env.rpg.state = "normal";env.rpg.actors.split_miltza.piece.moveToCoords(11, 7);env.rpg.effectMessage.close();body.classList.add('vis-flash', 'vis3')
    
    okidoia
        i am   h e r e
        ÙO²7zÜÜ¹R0:Rstill time
            EXEC::flash(true);body.classList.add("vis-flash-blur")
        fear what must be done‰-<˜°×gì
        ØE±¡only ¼  chance³†@
        xü›û co m e w€ºù|±|h m e
            EXEC::flash(false)

    cavik
        aki...
            EXEC::body.classList.remove("vis-flash-blur", "vis-3", "vis-flash")

    sourceless
        cavik nearly takes a step back, but the edges of the room flare with distortion
            EXEC::env.rpg.createDamageTiles()
        vekoa is gripping this place...
        wielding miltza like a weapon
        if cavik gets too close to her, she will surely tear him apart

    akizet
        do you have anything stronger??
    
    sourceless
        there is a spark of realization
    
    cavik
        i--i may!
        my explosives have a much more substantial blast, if...
        if they have more material to use...

    sourceless
        cavik directs my attention to the spinal root nearby
            EXEC::env.rpg.grid.getTileFromCoordinates(3, 11).focusOnThisTile()

    cavik
        the roots--yes, i can lodge some explosives in them!
        and then, when she gets close...

    akizet
        you know what must be done
            EXEC::env.rpg.actors.cavik.piece.focusOnTile()
        i will guide you, my friend
    
    cavik
        all right
        i can do this
        ...
        we can do this
            EXEC::env.rpg.querySelectorAll('.movable').forEach(t=>t.classList.remove('movable'));env.rpg.halt = false;env.rpg.currentActorIndex = 1;env.rpg.currentActor = env.rpg.actors.split_miltza

____SHOWIF::"gameplay_off"
    sys
        NOTICE::"gameplay is presently disabled";"re-enable in SYS menu if undesired"
____END

    sys
        NOTICE::"repeat applications of PLANT increase radius"

    RESPONSES::akizet
        guide the fight!!<+>END
            SHOWIF::["gameplay_off", false]
            FAKEEND::start combat
            EXEC::removeStatus(env.rpg.actors.cavik, "fear");env.rpg.classList.remove('hideteams');env.bgm.rate(env.bgm.intendedRate);env.rpg.actors.cavik.piece.startMovement();env.rpg.setCam();env.rpg.halt = false;advanceTurn();
        guide the fight!!<+>CHANGE::spine_miltza_nogame
            SHOWIF::["gameplay_off", true]
            EXEC::removeStatus(env.rpg.actors.cavik, "fear");env.bgm.rate(env.bgm.intendedRate);env.rpg.setCam();
    
SKIP::env.noBgmDuck = false;env.grm.skipSpineIntro();body.classList.remove("vis-flash-blur", "vis-3", "vis-flash");flash(false);
SKIPTIME::3000
`)

env.dialogues["spine_miltza_nogame"] = generateDialogueObject(` 
start
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";'toggle within system menu if desired'
            EXEC::cutscene(false);env.rpg.classList.add("hideteams")
        NOTICE::"contextual narration applied"

    sourceless
        miltza seems slower than before, entirely unhurried in her approach
        she deflects cavik's attacks effortlessly--she always did have sharp reflexes
        but cavik weaves through the spinal roots, planting explosives upon them
            EXEC::flash(true)
        
    sourceless quiet
        and when the moment is right, they are detonated,
            EXEC::play("dull", 0.75)
        blasting miltza away from one, into another--which itself is detonated as she arrives
        the combined force of the empowered blasts overwhelms her unnatural strength
        a brutal ploy, but necessary to survive...
            EXEC::env.rpg.actorList[3].hp = 0;env.rpg.actorList[4].hp = 0;updateStats({actors: [env.rpg.actorList[3], env.rpg.actorList[4]]})

    RESPONSES::akizet
        ...<+>CHANGE::spine_miltzaphase
            EXEC::flash(false);env.rpg.actors.split_miltza.piece.moveToCoords(8, 5)
            FAKEEND::(continue)

`)

env.dialogues["spine_miltzaphase"] = generateDialogueObject(` 
start
____SHOWIF::['PAGE!!cavikblunder', true]
    sourceless
        the roots, anchors for cavik's explosive...
        each is consumed in an oddly-colored flame - each having been detonated...

    cavik
        akizet, umm,
        that was everything i had to work with!!

____SHOWIF::['PAGE!!cavikblunder', false]
    sourceless
        after suffering two of these explosions, 
        miltza's stride becomes more of a stumble
            EXEC::env.rpg.actors.split_miltza.piece.moveToCoords(8, 5)
        the dull's light around her grows less vibrant
        is she more vulnerable?
        or is this merely a sign of the ceremony's focus being diverted?
        suddenly, the overlap's light floods the chamber,
            EXEC::forcePlay('fear', 0.75);env.rpg.actorList.forEach(a=>{if(a.originalSlug.startsWith("destructible")) {a.statusEffects[0].trigger(true)}});env.rpg.classList.remove("darkwobble");env.rpg.classList.add('purewobble');ratween(env.bgm, 1.1);env.bgm.intendedRate = 1.1
        invisible limbs coiling around the roots,
        suffusing them in a dangerous distortion, where cavik should not tread
____END

    cavik
        £‡¦•ê&!!
    
    akizet
        stay calm
        i am thinking
        just stay away--

    sourceless
        a jolt runs through the timestopper's connection
        through tozik's connector comes an unfamiliar mind
    
    timestopper
        hello?
        how does this work
        what? who is this?
    
    telyu
        oh, i see...
    
    timestopper
        telyu?!
    
    telyu
        tozik told me the situation
        cavik, i am above you right now
        i was... conducting a quick search, in case...
        it does not matter - i am here to help you
        i am not sure what you have to work with down there, but,
        the archival connector above has some large, heavy devices
        and the floor has been breaking apart, leaving some holes...
        so... i am going to push them down, one after the other
        i will try to show you where they will land
        in fact, this one right here might work...
            EXEC::env.rpg.telyuDrop();env.rpg.halt = false;
        try to get her in position somehow
        knock her around with your explosives, i do not know
        just watch yourself
        
    sourceless
        despite her clear reluctance in using our timestopper,
        our gratitude for her unexpected help is shared with an impulse
        but there is no time for proper words
        we must finish this

    RESPONSES::akizet
        guide the fight!!<+>END
            FAKEEND::(continue)
            EXEC::env.rpg.phase2 = true;env.rpg.halt = false;advanceTurn();
            SHOWIF::["gameplay_off", false]
        guide the fight!!<+>nogame
            FAKEEND::(continue)
            EXEC::flash(true);env.rpg.phase2 = true;env.rpg.halt = false;
            SHOWIF::["gameplay_off", true]

nogame
    sourceless
        through gaps in the ceiling above, telyu drops heavy equipment, unstable materials...
        and with cavik's explosives, miltza - fatigued and struggling - is forced into position 
        she is crushed and detonated, to our shared horror and regret
            EXEC::flash(true)
        but what choice is there? she would have infected cavik, too
        ...in time, her body is barely held together, much like malvi's was
        seemingly animated by the overlap's tendrils alone
        but... eventually, this strength leaves her
    
    RESPONSES::akizet
        ...<+>CHANGE::spine_miltzabyebye
            EXEC::env.rpg.actors.split_miltza.piece.moveToCoords(7, 7);env.rpg.actors.cavik.piece.moveToCoords(7,5);env.rpg.grid.tileEffects.forEach(e => env.rpg.grid.deleteTileEffect(e))
            FAKEEND::(continue)

`)

env.dialogues["spine_miltzabyebye"] = generateDialogueObject(` 
start
    sourceless quiet
        miltza's flickering form drops to the ground, motionless
            EXEC::env.noBgmDuck = true;changeBgm(env.grm.music_antag, {length: 5000, seek: 40, rate: 0.5, preserve: false});env.rpg.effectMessage.close();

    sourceless
        cavik has approached, hesitantly
            EXEC::flash(false);env.rpg.actors.cavik.piece.focusOnTile();env.rpg.effectMessage.close()
        she is in a strange state...
        the corru of her material body melded with the almost imperceptible tendrils of the ceremony
        here, but not here
        cavik nearly says something
        an apology, maybe--his despair is overpowering
        but miltza's arm shifts, claws pressing against the ground, attempting to push herself up again

    cavik
        milt--miltza?? are you still...
            EXEC::env.noBgmDuck = false;

    okidoia
        xü›ûØõ
        ¤‡*ç˜@V_ik
        1ìŠŸ=÷)¥n
    
    sourceless
        her receptors, barely visible, hang with regret
        nonsense--delaying him, to harm us
        compassion is only ever exploited by parasites
        what i must do is so cold, but...

    akizet
        cavik, that is not miltza anymore
        she will kill you if you delay any longer
        you know this
        you must finish it

    sourceless
        he is frozen for a θblink
        but with my encouragement, he produces one last explosive, 
        tossing it gently towards miltza and backing away--something he may detonate at will
            EXEC::env.rpg.actors.cavik.piece.stepToCoords(7,4);
    
    sourceless
        miltza turns her gaze towards the bomb, receptors opening 
        the okidoia laughs tearfully through her

    cavik
        miltza, i... i hope...
        ...

    okidoia
        ¤¾k_¬
        dø›æ_:nó•t¦
        @w½’'^½ry

    sourceless
        its senseless signal gives him some pause, but when she moves again...
        he does not hesitate any longer
    
    cavik
        i am so sorry

    sourceless quiet
        then, a blast
            EXEC::play("dull", 0.5);flash(true);
            WAIT::2000
            THEN::env.rpg.gakvuDies();flash(false)
        cavik refuses to look at the remains
    
    cavik
        it is done...
    
    akizet
        cavik, you...
        you did what you had to
        you know it was the only way, after her choice...
    
    telyu
        there will be time to mourn later
        tozik and i are going to descend with the tether, get out of the way
        he says the bomb is ready
        and once it is down, i am disconnecting

    sourceless
        the sharpness of her thoughts is striking
        like she is stabbing my mindcore with every word
        does she hate us? me?
        but... she did try to help cavik
        there is no time to process this
        
    akizet
        fine
        proceed back through the dull mind
        we are going to finish this in the lesser mind
        meet us there
        understood? cavik?
    
    sourceless
        aside from backing away from miltza, he has sparsely made a thought
    
    cavik
        yeah...
        
    akizet
        may you slip velzie's eye

____SHOWONCE::
    moth
        how the hell are they holding it together like this?
        i feel like i'm gonna be sick dude
        just... man, they really just killed her
        just like that
        it seemed to me like she was trying to say something, too
        i gotta wonder how much they were able to understand at the time
        maybe something with this voice they're hearing wasn't, like...
        i don't know, i'm just trying to figure out what they were thinking
        are you good?

    self
        fine
        let me focus
    
    moth
        all right, all right
        just remember to pace yourself
____END

    RESPONSES::akizet
        return to the others<+>CHANGE::spine_miltzaclear
            EXEC::

END::change("PAGE!!miltza-gone", "gone")
`)

env.dialogues["spine_miltzaclear"] = generateDialogueObject(` 
start            
    sourceless
        i reroute my senses away from him, back to my own
            EXEC::flash(true)
            WAIT::1000
            THEN::env.rpg.halt = false;closeCombat(env.rpg.enemyTeam);ratween(env.bgm, 0.75);
        and the room is quiet... dark
            EXEC::change("PAGE!!e4prog", 13);changeStage("hall_heart-entry");setCam({x: 7, y: 4, rotation: -45})
        still twisted, but the overlap is a mere murmur around us
        gakvu leans against a wall, while bozko watches over the opposite door
        idril fusses over their wounds, with karik clinging to her back
    
    akizet
        it is done

    karik
        are they okay??
            EXEC::vnp({karik: "show", hideStage: true})

    akizet
        cavik, tozik, and telyu--yes...
        but, miltza has been lost
    
    sourceless
        karik is shocked by my bluntness
        i hate that i must speak so shortly
        would she have lived if she had never met us? 
        if we never entered that room, and scavenged somewhere else?
    
    akizet
        she... she knew the risks...
        we all do
        she confronted vekoa directly, to buy them time...
        ...
        bozko, gakvu? how are you faring?
            EXEC::vnp({karik: "hide", gakvu: "show", bozko: "show", hideStage: true})
    
    gakvu
        still living...

    sourceless
        her body is barely held together,
        marked all over with half-melted wounds from the creatures' blows
        and a deep gloom hangs over her,
        clearly having observed through the timestopper...
        bozko remains immovable, mostly unreadable
        but his claws are curled with tension
    
    bozko
        fine
        focus must have been drawn away from us
        they disappeared
    
    gakvu
        yeah...
        they were unstable
        some of them, i did not even need to attack
        they just... broke apart
        i could feel them even as they disappeared from sight, drifting away
    
    idril
        that is a good sign, then!
            EXEC::vnp({gakvu: "show far", bozko: "show far", idril: "showleft focus", hideStage: true})
        it sounds like the ceremony is recoiling!
        she is probably trying to scale it down...
        these creatures, tendrils of the ceremony as they are,
        probably snapped while the overlap was shrinking!
    
    sourceless
        a great rumble shakes the groundsmindry
        that must have been the spinal bomb...
        but i cannot tell if the ceremony is halted
        the okidoia continues...
        gakvu looks up, then at the wall to the core
    
    gakvu
        it does feel like it is growing more distant
        θblink by θblink
    
    idril
        i suspect that the ceremony is drawing from the lesser mind!
        and i thought that the primary organs would be enough...
        oh well!
        vekoa always was a stubborn groundsmind, ahaha
        we have enough in the dull mind to sever the rest of the connections
    
    akizet
        i see
        if vekoa is still attempting to form a contrivance, then...
        it must mean that <em>any</em> size contrivance will do for her purposes, yes?
        not just one that consumes the entire embassy...
        and there must still be some chance that she can succeed
        i doubt she would make such a gamble with the core otherwise
        so... we should hurry
    
    sourceless
        and so i lead the way back to... the...
            EXEC::vnp({gakvu: "hide", bozko: "hide", idril: "hide"})
        i expected to hear more steps behind me
        with a glance back, i see that gakvu is not following me
            EXEC::vnp({gakvu: "show far", bozko: "hide", idril: "hide"})
        she must be more deeply wounded than i thought
        
    akizet
        gakvu, can you...
    
    gakvu
        yeah, just... give me a θblink, would you?
    
    akizet
        we do not have a θblink, gakvu
        if you cannot move with us, then--
    
    sourceless
        bozko suddenly raises gakvu into his floating gauntlets, carrying her towards the entrance
            EXEC::vnp({gakvu: "show downleft", bozko: "showleft"})
    
    gakvu
        ah!
    
    bozko
        she is right, there is no time
        you attack with your mind, you need only be present
        akizet, lead the way
    
    gakvu
        so demanding! am i back home, laboring upon the okizika?
        i thought vaznians loved their breaks
    
    sourceless
        her little jab, ill-timed as they always are,
        elicits a single exasperated chuckle from bozko
    
    akizet
        all right, follow me
        
    sourceless
        idril follows, karik still clinging to her
    
    idril
        while we move...
            EXEC::vnp({gakvu: "show downleft", bozko: "show", idril: "showright far"})
        i can do a little patchwork
        let me take a look at those hits!
        
    RESPONSES::akizet
        let us move<+>continue
            EXEC::changeStage("grm_entry");vn.done();setCam()
            FAKEEND::(continue)

continue
    sourceless
        the entry... it almost looks as if it is melting
        whether this is the overlap, or the breaking down of pale corru, i cannot tell
        but with the team as prepared as we can manage, 
        all that remains is for us to move to the lesser mind
        the path to the movefriend still stands, and i am sure it is still there...
        and looking down it inspires a great melancholy within me
        this place... everything we have done here, for these great θeyes
        it will all be gone soon, even if we succeed
        this moment is the end of everything as it was
        ...but i must not let myself be distracted
        gakvu stands on her own again thanks to idril, but with some difficulty
            EXEC::setCam({x: 5, y: 4, rotation: 0})
    
    akizet
        how is she?
            EXEC::vnp({idril: "show", gakvu: "show", hideStage: true})
    
    gakvu
        i can fight, it is fine
    
    idril
        ohh, well, she is right...
            EXEC::vnp({idril: "show focus"})
        but you should know, some critical organs are compromised
        and i do not have enough expertise to fix them, really...
        i just worked on dull constructs, i am only working off of general knowledge here!
        her qou body will probably start breaking down soon
    
    akizet
        and her mindcore?
    
    idril
        very interesting! i have never seen a core with groundsmindry before
        it has such a hostile design! like a poisonous fruit!
    
    akizet
        no, i mean...
    
    gakvu
        they did not get me there
            EXEC::vnp({idril: "show", gakvu: "show focus"})
        once this body fails to carry me, i will simply evacuate it
        my mindcore is heavier, but still has emergency legs
        so until then, i am fine
    
    akizet
        very well
            EXEC::vnp({gakvu: "defocus"})
        stay at a distance
        vekoa's focus is surely upon the last of her resources
        victory is but a leap away
        everyone, take a moment to prepare
            EXEC::playerMoveTo(5, 4, "down")
        
    sys
        NOTICE::'marked entities contain dialogue unique to this stream segment'
        ADVISE::'interact before advancing';'utilize PROCEED entity to save or advance stream'
        
    RESPONSES::akizet
        ...<+>END
            EXEC::vn.done();setCam()

END::change("PAGE!!tozik-gone", "???")
SKIP::change("PAGE!!e4prog", 13);changeStage("grm_entry");vn.done();setCam();playerMoveTo(5, 4, "down")
`)

/**** !P13 - the loopback to the entrance. should have some short optionals ****/
env.dialogues["loopback_gakvu"] = generateDialogueObject(`
start
    sourceless
        lingering near the terminal, gakvu examines a repair made on her arm
            EXEC::vnp({gakvu: "show", hideStage: true})
        it is discolored, a temporary patch of corru that melds with her outer membrane
        she is mottled with these patches
        sensing my approach, she gives a small welcome with her receptors
        with the timestopper, we can speak without fear of too much time being lost
        
    gakvu
        you do not need to say anything
        
    sourceless
        is the weight of our losses so plain upon me?
    
    gakvu
        we can figure out what to do for them once this is finished
        ...i just wish i had more time to talk to miltza
        she and i were not aligned, but...
        in those moments of calm, i felt that she truly meant well
        it even seemed like i was getting through to her...
        i hope she found her answers
        velzie always has a twisted way of giving them
    
    sourceless
        i affirm with my receptors - there is nothing for me to add
        and i cannot weigh my mind with any more guilt in this critical time
    
    RESPONSES::akizet
        ...<+>END
            EXEC::vn.done()
        
END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
`)

env.dialogues["loopback_idril"] = generateDialogueObject(`
start
    sourceless
        her work complete, our impromptu mender now examines the distorted, melting wall
            EXEC::vnp({idril: "show", hideStage: true})
        though she is disconnected from the timestopper, and time is short...
        i must ask
    
    akizet
        idril!
        tozik is struggling to walk
        and it seems as if he is no longer in fighting shape...
        in your team before, among the contact afflicted, what did this mean?

    idril
        oh, already? huuh
        that suggests a later stage!
    
    sourceless
        it is as i thought
        gakvu and bozko are silently drawn to the conversation
        i feel their worry weighing through our connection
    
    idril
        it was around this time they began to shelter in the dull mind with me
        they were unable to help otherwise, and so they waited!
        but... it only became worse
        something was pulling at them, they said! even within the silence!
        one even evacuated their body, thinking it would help, but, noo
        actually, their decline became even more rapid
        there was one case, a θjut who was able to stand again, who went out to help the others
        but according to them, she was not like this for long
        you want to make tozik the interim groundsmind, right?

    akizet
        yes...

    idril
        then at this rate, even if we take hold of the core soon,
        his effective time may be short!
    
    sourceless
        a sudden fear is driven through my mindcore
        if not him, then who?
    
    akizet
        then there is no time to waste
    
    RESPONSES::akizet
        we move soon<+>END
            EXEC::vn.done()

END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
`)

env.dialogues["loopback_bozko"] = generateDialogueObject(`
start
    sourceless
        bozko watches over us as we prepare
            EXEC::vnp({bozko: "show", hideStage: true})
        i meet his gaze for an instant, though he turns to the door quickly
        stony as he appears, another loss hanging over us is surely eating at him
        through our connection, i try to reach out...
    
    akizet
        bozko...
        thank you for protecting us
        if you had not been here, cavik and tozik may not have survived

    bozko
        it is too soon for thanks

    sourceless
        carried in his shared thought is a great weight of anger, regret
        but he does not solidify these into any specific meaning
        his silence... 
        it is an effort to contain this weight to himself
    
    akizet
        you know we could not have done anything for miltza
        she removed the timestopper, and she did what she could to help us...
        but...

    bozko
        cavik did what he had to
        are you ready to move yet?

    sourceless
        he need not be any clearer
        it is truly chilling to see him like this...
    
    RESPONSES::akizet
        soon...<+>END
            EXEC::vn.done()

END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
`)

env.dialogues["loopback_karik"] = generateDialogueObject(`
start
    sourceless
        karik paces upon the entry terminal's smooth surface
            EXEC::vnp({karik: "show", hideStage: true})
        though their legs sink into it slightly - like it is rotting
    
    akizet
        karik!
        does the heart being lost so soon affect the spire's stability at all?
        it was not running before anyway, right?

    sourceless
        karik's attention tears to me so suddenly, like a startled cave pest
    
    karik
        the heart was stopped, but it was still releasing pressure
        even if that was to feed the ceremony!
        now, the entire system is going to stall, break down even faster...
        i fear that the timestopper will give out before we are through
        akizet, we really do not even have time to talk
        we must stop vekoa, and get into the core, fast
        or collapse is not just likely, it is inevitable        
    
    RESPONSES::akizet
        understood<+>END
            EXEC::vn.done()

END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
`)

env.dialogues["loopback_akizet"] = generateDialogueObject(`
start
    sourceless
        tozik is breaking apart, gakvu is slowing down...
        can we truly do this? 
        if tozik is lost, can gakvu replace him?
        idril? cavik? karik? anyone? me?
        we have options, yes, but...
        even in thinking about this, another anxiety greets me
        that this ceremony is being grown at all, must mean something else is happening here
        what could a contrivance do? a collapse here, a collapse elsewhere...
        the spire will fall regardless
        vekoa has tried to speak to us, tried to welcome us, to show us what is being done
        but to accept any information at all is to be lost to the ceremony, this infection
        miltza's... sacrifice... has made that clear
        and yet, there is a draw to it
        what if they truly are still... in there? 
        whatever or wherever 'there' may be
        could there be some analogue to <span class="code">zuzucri-masks</span>? something to help them?
        ...
        no...
        i cannot tear at myself over missing information
        we must make do with the only facts we have...
        that time is running out,
        and that if we succeed, we can still save any other survivors
        and so there is no question
        we must stop this, at any cost
    
    RESPONSES::akizet
        ...<+>END

END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
`)

/**** !P14 - akizet and team proceeds into lesser mind****/
env.dialogues["entry_loopproceed"] = generateDialogueObject(` 
start
    sourceless
        it is hard to believe this is the same hall we walked before...
        we stay closely grouped together as we advance, prepared for the worst
        idril follows us, fascinated by the distortion, prodding at the personnel doors as we pass them

    idril
        the underlying physicality here is really starting to fade!
        that is so cool! ahaha

    akizet
        cool?!
        idril, how can we be sure of any walls or floors now??

    idril
        ohh, do not worry so much!!
        the dull plane is not a space you can simply 'fall' into...
        so if you step expecting to find the ground, then your foot will probably find it!

    gakvu
        why is this hall so much worse than anywhere else?

    idril
        as the ceremony shrinks, the overlap is drawn in closer, too!
        so, it is a smaller radius of effect, but much more intense, under higher pressure
        like holding a little light against your eye!
        it will probably only get stranger!

    sourceless
        at the end of this twisted path lies the door to the lesser mind
        and so comes the time to finish cutting off vekoa

    timestopper
        cavik? are you outside the silence?
        hello yes! yes! i am right next to the door on my side!
        telyu is helping tozik... he will not be joining us for this
        all right, we are entering now
        prepare yourself, and enter in a θblink
        
    sourceless
        and so we proceed....
            EXEC::flash(true)
            WAIT::2000
            THEN::vfx({type: "flash", state: false, delay: 1000});env.grm.combat("ep4_lesserboss");env.rpg.classList.add('hideteams');removeStatus(env.rpg.actors.cavik, "fear")

        to find idril's expectation correct
        the room's configuration is wrong, likely coiled in the same tendrils that tozik saw
        immediately my mind turns to the golem we lost, but...
        there is no carcass to be found, especially not with the distortion so heavy
        beyond a claustrophobic passage between the pods, cavik prepares a handful of explosives
        i step forward to begin searching for any foes
            EXEC::env.rpg.actors.akizet.piece.moveToCoords(4, 4, {follow: false})
        but the instant i do, bozko pulls me back--!!
            EXEC::env.rpg.actors.akizet.piece.moveToCoords(3, 4, {follow: false});flash(true);forcePlay("dull");midCombatActorAdd(env.rpg.enemyTeam, "lesser_itzil", "left")
            WAIT::2000
            THEN::env.rpg.actors.akizet.piece.moveToCoords(3, 4, {follow: false});flash(false);midCombatActorRemove(env.rpg.actors.cutscenedriver)
        a powerful dull pulse blasts through the corridor
        one that could only have come from...
        our golem
            EXEC::env.rpg.actors.lesser_itzil.piece.focusOnTile()
        there it is, hovering...
        not exactly repaired, but unbroken - an amalgamation animated by the ceremony
        and between the edges of the pods i spot another foe...
            WAIT::300
        the familiar shape of...
        dozkallvi
            EXEC::midCombatActorAdd(env.rpg.enemyTeam, "lesser_kivii", "right")
        itzil and dozkallvi, both here, reunited...
            EXEC::env.rpg.actors.lesser_kivii.piece.focusOnTile()
        vekoa is taunting us
        rage boils in my mind
        that my mistakes would be used against me so readily...
        the okidoia comes again--not to speak, not to grant visions, but...
        to laugh, playfully, without contempt
        something in it feels familiar... like itzil's mind, when they were connected
        but it is ultimately meaningless - there can be no reasoning
        especially not with the golem raising its pulsing gauntlet again...

____SHOWIF::"gameplay_off"
    sys
        NOTICE::"gameplay is presently disabled";"re-enable in SYS menu if undesired"
____END
        
    RESPONSES::akizet
        we must fight!!<+>END
            SHOWIF::["gameplay_off", false]
            EXEC::env.rpg.actors.akizet.piece.focusOnTile();env.rpg.classList.remove("hideteams");env.bgm.rate(0.8);env.bgm.intendedRate = 0.8;
        we must fight!!<+>CHANGE::lesserboss_nogame
            SHOWIF::["gameplay_off", true]
            EXEC::env.rpg.actors.akizet.piece.focusOnTile();env.bgm.rate(0.8);env.bgm.intendedRate = 0.8;

SKIP::env.grm.skipLesserBossIntro()
`)

env.dialogues["lesserboss_nogame"] = generateDialogueObject(` 
start
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";'toggle within system menu if desired'
            EXEC::cutscene(false);env.rpg.classList.add("hideteams")
        NOTICE::"contextual narration applied"

    sourceless
        our twisted golem uses its powerful weaponry against us, 
            EXEC::flash(true)
        and dozkallvi's image strikes with familiar gauntlets, conjured from the overlap
        there is a sort of lightness in their motions
        as if the pair are not taking our fight seriously
        but it is their mistake, for in time, we land decisive strikes
            EXEC::env.rpg.enemyTeam.members.forEach(m=>m.hp = 0);updateStats()
        
    RESPONSES::akizet
        ...<+>CHANGE::lesserboss_phase
            FAKEEND::(continue)
`)

env.dialogues["lesserboss_phase"] = generateDialogueObject(`
start
    sourceless
        with a final blow, both dozkallvi and the golem stagger, recoil
        they are breaking apart, the same as any other foe we have faced
        they stumble towards each other, vulnerable and crumbling
        before i can finish it, the chamber trembles,
            EXEC::flash(true)
        surely being coiled by the ceremony in response to our victory, it takes us a moment to recover and adjust...
            EXEC::env.rpg.phaseChange();env.rpg.classList.add('fearmode');ratween(env.bgm, 0.5)
            WAIT::2000
            THEN::flash(false)
        only to see that the remnant of our golem has collapsed, fused with the ground
            EXEC::env.rpg.actors.lesser_itzka.piece.focusOnTile();
        despite this, no victory is had yet - something is happening...
            EXEC::flash(true);play('criticalError', 0.3);
            WAIT::1000
            THEN::flash(false)

    sourceless quiet
        stalks of light rise from the corpse, into the glow above--or maybe the other way around--to form a figure
            EXEC::env.rpg.actors.lesser_itzka.sprite.classList.add("visible")
        unfamiliar at first, but... in its light, i see one of dozkallvi's receptors
        another, itzil's...
            EXEC::body.classList.add('vis-flash', 'vis4')
    
    okidoia::dark
        m¹ZŸŸK\¾Õ\AQëi6ìÏback upon the <span definition="NOTE::'partial translation';'implied closest cultural equivalent'">catafalques</span> lie our bodies
            EXEC::flash(true);body.classList.add("vis-flash-blur")
        their hearts still beat, though there is nothing within
        for we are here now, together gazing down at them
        and we find there is nothing to do but laughÍûôŸw¡Kâ¤Ñ

    sourceless
        this is no mere performance for us
            EXEC::flash(false)
        their tendrils crawl outwards like reddened veins
            EXEC::body.classList.remove('vis-flash', 'vis4', 'vis-flash-blur')
        hooking into the darkness of the air, pulling something closer...
        i will not wait to see what their plan is
    
    timestopper
        finish it

    RESPONSES::akizet
        attack!<+>END
            FAKEEND::(continue)
            SHOWIF::["gameplay_off", false]
            EXEC::env.rpg.halt = false;var i = env.rpg.turnOrder.findIndex(a => a == env.rpg.actors.akizet);env.rpg.currentActorIndex = i - 1;advanceTurn();ratween(env.bgm, 1);env.bgm.intendedRate = 1;
        attack!<+>nogame
            FAKEEND::(continue)
            SHOWIF::["gameplay_off", true]
            EXEC::ratween(env.bgm, 1);env.bgm.intendedRate = 1;

nogame
    sourceless
        we advance to tear down this monstrous figure as any other
            EXEC::flash(true)
            WAIT::1000
            THEN::env.rpg.actors.akizet.piece.moveToCoords(6, 5);env.rpg.actors.cavik.piece.moveToCoords(5, 4);env.rpg.actors.gakvu.piece.moveToCoords(7, 4);env.rpg.actors.bozko.piece.moveToCoords(7, 6);flash(false)
        it does not lash out at us, instead seeming to pull the overlap inwards, around us...
            EXEC::useAction(env.rpg.actors.lesser_itzka, env.ACTIONS.special_itzka, env.rpg.actors.lesser_itzka)
        as if trying to drag us into the dull plane directly
            EXEC::useAction(env.rpg.actors.lesser_itzka, env.ACTIONS.special_itzka, env.rpg.actors.lesser_itzka)
        but present as they are, they can be struck, and they bleed color into the air...

    RESPONSES::akizet
        ...<+>CHANGE::lesserfinal
            EXEC::flash(false)
            FAKEEND::(continue)
`)


/**** !P15a - cleared the lesser mind, now idling in a destroyed version (post-lesserfinal that is) ****/
env.dialogues["lesserfinal"] = generateDialogueObject(` 
start
    sourceless quiet
        with our attacks, the tendrils forming this illusion finally break apart, losing shape
            EXEC::env.rpg.actors.lesser_itzka.sprite.classList.remove("visible")
    
    okidoia::dark
        Æ®ki%z7
        pl@¨e <se½

    sourceless
        i have had enough of this terrible life
        stepping in, i claw viciously at the beast's warping shape, becoming lost in its light
            EXEC::flash(true)
        gripping semisolid tendrils, tearing them away,

    sourceless quiet
        rending the flesh of this now-unfamiliar monster mercilessly
            EXEC::play("stab", 0.8);env.bgm.rate(0.9)
        it may try to speak, but i do not listen
            EXEC::play("stab", 0.7);env.bgm.rate(0.7)
        we are beyond that now
            EXEC::play("stab", 0.6);env.bgm.rate(0.6)
        eventually, with enough broken... some threshold is passed

    sourceless
        a snap beyond physicality, the shifting of some 'weight' within the dull plane as it draws from this place
            EXEC::env.bgm.rate(0.5)
        and as it does, the world shifts around us again...
            EXEC::changeStage("grm_lesser", false, false, {noFlash: true});env.rpg.halt = false;setCam({x: 4, y: 3, rotation: -135});
            WAIT::1000
            THEN::closeCombat(env.rpg.enemyTeam)
        vekoa's hold on the chamber is weakened, returning echoes of its true shape
            EXEC::flash(false)
        my claws, my robe, all stained deep with dark sludge
        idril and karik hurry in once the area seems clear
            EXEC::vnp({idril: "show", karik: "show far", hideStage: true})
    
    karik
        cavik, over...
            EXEC::vnp({karik: "show", idril: "hide", hideStage: true})
    
    sourceless
        karik had immediately begun to call out our next steps, but...
        now seems distracted by the remnants of our foe, which i stand atop
        with an urgent gesture from myself, they continue
    
    karik
        uh... over, over here!
        yes, the pods drew from both above and below...
        we must detonate these final connections!
        but... this room is our last way out, so,
        they must be focused
        we need only destroy the downward veins along the far wall
    
    cavik
        you are sure it will not collapse upon us?
            EXEC::vnp({cavik: "show"})

    karik
        if we do this right, it will be safe!

    cavik
        ah, ok... show me the positions

    idril
        here, i will help!
            EXEC::vnp({idril: "show"})
    
    sourceless
        cavik, karik and idril set to their work,
        but my mind is drawn to the dull mind's door
    
    akizet
        tozik is all right, yes?
        
    sourceless
        cavik speaks between hasty applications of his devices
    
    cavik
        ah, he is in good claws! 
        telyu was helping him fix some internals, because he found that there were--
        
    sourceless quiet
        the grand door to the core parts, and immediately, we stand at the ready
            EXEC::env.noBgmDuck = true;flash(true);play('criticalError', 0.3);change("PAGE!!e4prog", 14);
            WAIT::2000
            AUTOADVANCE::
        it is her
            EXEC::vn.done();content.classList.add("vekoafinal");refreshStage();flash(false);setCam({x: 7, y: 3, rotation: 0});changeBgm(env.grm.music_antag, {length: 10000, seek: 0});
        bozko and i guard the others
        the light within the core chamber is flickering, unsteady, clearly on the verge of collapse
        whether the ceremony is failing, or the contrivance is nearly upon us, i cannot tell
        but the unmistakable shape of vekoa is here, shifting chaotically
        
    idril
        hi vekoa
    
    sourceless
        i can see something different in her stance, even in this state...
        the serenity that persisted when we first saw her...
        it has given way to fury
        after a pause, she takes a step forward, and we prepare to fight again
    
    sourceless quiet
        but she moves not to strike, waving her claws urgently, her incomprehensible okidoia crying out
            EXEC::play("scarydoia")
        pleading...? 
            EXEC::play("scarydoia")

    sourceless
        ignorant of the apparition's interruption, cavik calls out
    
    cavik
        get away from the walls, it is time!!
            EXEC::env.noBgmDuck = false;
    
    sourceless quiet
        we split in different directions as the first of the detonations flashes through the room
            EXEC::forcePlay("dull", 0.75);flash(true);page.blockStageBGMChange = true;ratween(env.bgm, 0.7)
        the okidoia begins to roar again, desperate and afraid for the first time
    
    sourceless
        it causes a terrified despair to ring through me,
            EXEC::content.classList.remove("vekoafinal");content.querySelector(".vekoaholder").innerHTML = ""
        a feeling that demands i should be crying, screaming, as if what we are doing is...
        ...
        before it can convey any tangible meaning to us, 
        my sight, my mind--they clear, like waking from a dream
            EXEC::flash(false);setCam({x: 7, y: 3, rotation: 0});revertBgm(10000);page.blockStageBGMChange = false;env.bgm.rate(0.75)
        her shape simply vanished
        the chamber holds strong, no doubt due to the strategic detonations
        but it is frighteningly dark
        the okidoia, the overlap's distortion...
        it is dim, distant, but not gone
        the door to the groundsmindry chamber stands open, ready for us to proceed...
    
    idril
        wow!
            EXEC::vnp({idril: "show", hideStage: true});change("PAGE!!tozpain", true)

    cavik
        yes! yes!!
            EXEC::vnp({cavik: "show"});change("PAGE!!e4prog", 15);
        haha! we did it!!

    idril
        ahaha! yay!
            EXEC::vnp({idril: "focus"})
        though actually... not yet
        i just wanted to have a moment of false celebration too
        the ceremony and its overlap are still in there! 
        all we did was break the last of its grasp outside of the core...
    
    akizet
        what?!
            EXEC::vnp({cavik: "hide"})
        did you not say this would stop it??
    
    idril
        it will! 
        it is not an immediate process!

    sourceless
        a crucial detail she failed to share

    idril
        vekoa trying to grow it again would just pointlessly starve the core to death
        like i said, even if this is only an imitation of her... that would be stupid
        so, the last structures it uses to hold open the overlap are probably snapping right now
        freeing up the core!
        anyway, it could be a few θblinks, or--

    tozik
        we do not have a few θblinks
            EXEC::vnp({tozik: "show far", telyu: "show far"})

    sourceless
        tozik earns all our gazes--emerged from the dull mind's hall, supported by telyu
            EXEC::vnp({telyu: "hide", idril: "hide", tozik: "show"})
        his body is in worse condition than when i last saw him through cavik's vision
        judging by the clean lines, he must have cut out some portion of his organs
        he speaks urgently, sparing details
    
    tozik
        my affliction is progressing, and... i have done what i can to stall it
        i still feel it, something, connecting to me...
        and when you detonated that last bomb, 
        i felt it think
        an intention from the voice, the one that vekoa spoke with, burning with desperation:
        she is trying to form a lesser contrivance with what is left
        if she does that... the core is gone

    akizet
        tozik, you trust this feeling?
        it is no hallucination?

    sourceless
        he dips his head, affirming with his receptors
    
    cavik
        well, the overlap is still there!
            EXEC::vnp({cavik: "show"})
        and that means we can still interact with the ceremony!!
            EXEC::vnp({cavik: "show focus", tozik: "hide"})
        so if it is breaking apart...
        we just have to go in there and destroy what's left!!

    idril
        ohh! yes!
            EXEC::vnp({idril: "show focus"})
        and since the overlap is so small now, 
        the critical veins of the ceremony will probably be visible...
    
    akizet
        if we attack them, will the core be harmed?
    
    idril
        noo!
        while the core is being used as a catalyst, it is technically separate from the ceremony...
        it is more like an entrance! it created the small cut that the ceremony was formed through
        so if you sever the ceremony's organs, the tendrils that widen it will snap even more...
        and if enough gives way, it should give out all at once!
        entirely cleaving the ceremony from material reality, and leaving the core for us!!
        sure, it may have a few extra organs and appendages, but...
        everything should still be there!

    akizet
        then we have our path forward
    
    sourceless
        and so the time comes at last...
            EXEC::vnp({cavik: "hide"})
        we can end this slaughter
        but - why is vekoa even still trying?
        any time i think of what her plan could be,
        there is this quiet doubt within, one that has grown as we have seen more
        a suspicion that slaughter is not the right word
        but no - the horror in the θsegments above are plain reminders
        what we are doing is right, and we must press on
        for the sake of any who still live
        there is a moment of heavy silence as i look amongst the team
        gakvu's body is giving way, it is clear to see
            EXEC::vnp({gakvu: "show far"})
        but she fights with her mindcore, so that is not a great hindrance
        bozko must remain intact if we are to use his chassis for emergency survival
            EXEC::vnp({bozko: "show far"})
        though, what greater emergency remains than stopping the ceremony?
        and tozik, we cannot afford to risk exposure to his affliction...
            EXEC::vnp({tozik: "show far"})
        telyu will not fight, and i feel i simply cannot rely on idril
            EXEC::vnp({idril: "show far", telyu: "show far"})
        they all stare back at me as i survey them

    akizet
        we are in a bad state...
            EXEC::vn.clear()
        but--cavik, gakvu, bozko,
            EXEC::vnp({cavik: "show", gakvu: "show", bozko: "show"})
        are you all still able to fight?
    
    bozko
        of course
            EXEC::vnp({bozko: "focus"})
        this is it

    gakvu
        yeah... i can manage
            EXEC::vnp({gakvu: "focus"})
        just cover me when you can
        it is getting hard to move
    
    cavik
        i, um, only have a handful of explosives left...
            EXEC::vnp({cavik: "focus"})
        we have not fought any real golems in a while, so i have not been able to make more
        and all our other materials went into making the stationary explosives...
        
    akizet
        save them for critical detonations, then
            EXEC::vn.clear()
        telyu, idril, do you have any weapons cavik could use?
            EXEC::vnp({telyu: "show", idril: "show"})
    telyu
        nothing that is not attached to me!
    
    idril
        telyu, did the other disabler still hold charge?
        ...in the third operation pod...?
            EXEC::vnp({idril: "focus"})
    
    sourceless
        a grim, nauseous twist overtakes telyu's receptors
        what is this constant apprehension over the dull mind's third pod? 
        was it not simply broken?

    telyu
        i... i did not check
            EXEC::vnp({telyu: "show focus", idril: "hide"})
        but that is wise - i will go and fetch it
        akizet, if you and your team want to proceed in, 
        i will be right behind you to deliver materials
        we still have some restoratives and other bits, disabler aside

    akizet
        only deliver?
        we have two free timestopper connectors
    
    sourceless
        telyu's eyes shift away, receptors rolling in frustration

    telyu
        i will get the disabler and other materials for you
        and... if i can, i will help
        but i am not connecting to your timestopper again
        
    sourceless
        her continued objection is so strange - what is it she fears?
        she beckons to bozko, who comes to support tozik,
        but tozik raises a claw, his head rolling as he tries to focus
            EXEC::vnp({tozik: "show focus"})

    tozik
        get the dis¤bler
        but i... have an idea
        cavik„¯ you say you have not fought any real golems lately, but...
        you did
        grant me a θblink

    sourceless
        they pause, watching him point to...
        our puppeted golem's melted corpse in the dark
        he pushes them aside, stumbling towards it and kneeling,
            EXEC::vnp({tozik: "hide"})
        where he wordlessly begins work with his corruskivi
        his movement is wobbly, uncertain, but driven by some insight
        telyu disappears into the darkness before any further questioning begins
            EXEC::vnp({telyu: "hide"})
    
    akizet
        ...i see
        everyone, ready yourselves
        we must stop this now
    
    sys
        ATTENTION::"current memory stream near conclusion"
        ADVISE::"save iteration"
        NOTICE::'marked entities contain dialogue unique to this stream segment'
        ADVISE::'interact before advancing';'utilize PROCEED entity to save or advance stream'
        
    RESPONSES::akizet
        it is nearly time<+>END
            EXEC::refreshStage();vn.done();playerMoveTo(5, 3, "right")
            FAKEEND::prepare

SKIP::env.noBgmDuck = false;change("PAGE!!e4prog", 15);changeStage("grm_lesser");if(env.rpg) {closeCombat(env.rpg.enemyTeam);env.rpg.halt = false}; vn.done();playerMoveTo(5, 3, "right");content.classList.remove("vekoafinal");revertBgm()
SKIPTIME::2000
`)

env.dialogues["final_cavik"] = generateDialogueObject(`
start
    sourceless
        cavik lingers near the entrance
            EXEC::vnp({cavik: "show", hideStage: true})
        taking inventory of his explosives, and our resources
        though... i sense uncertainty
        he is rightly shaken after what happened with miltza, and itzil...
        but i feel i should not agitate this
        his faith in the plan has been unwavering
        it is no time to muddy his thoughts
        we must focus
    
    akizet
        cavik!
        my friend
        are you ready?
    
    cavik
        akizet...
        i am down to my last mending applicators,
        and similarly, i will have to be very careful with my explosives...
        i fear that i will not be enough help
        and with tozik out, and gakvu so wounded...
        i just hope telyu can find something to work with

    akizet
        do not worry
        bozko and i will lead the way
        if we stay together, it will be fine
        whatever you bring will be enough, i am certain
        vekoa will surely try to distract us with false foes, but...
        we need only harm the ceremony enough for it to give way
    
    sourceless
        cavik nods a receptor, my words inspiring some determination
    
    cavik
        ok!
        i trust you, akizet
        you know i do
        and i want you to know...
        i have been thinking about what you said
        no matter what happens,
        being able to work with you here,
        charging with you into the depths of this infestation to stop it...
        i would never have chosen differently
        you never failed me
    
    sourceless
        that message completely slipped my mind...
        but hearing him say this - it loosens the coil of my receptors

    akizet
        thank you, cavik

    RESPONSES::akizet
        ...<+>END
            EXEC::vn.done()

END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
`)

env.dialogues["final_tozik"] = generateDialogueObject(`
start
    sourceless
        tozik is hunched over in the dark, only slightly illuminated by the gate before us
            EXEC::setCam({x: 5, y: 5, rotation: 180});vnp({tozik: "show far", hideStage: true, bg: "black"})
        he cuts into the golem's obscured, melting mass, drawing out small components
        a gauntlet is set aside, hollowed out, veins pulled from it to form new connections...
        though his feverish work is fascinating, his muttering inspires more worry
    
    tozik::mutter
        ...surf‰àºce mist condensing on the sentries...
            EXEC::vnp({tozik: "show"})
        ...veilk crawl by,‰_+ they avoid the gate...
        ...the pulse... the smoke... matter ¡”)nverted...

    sourceless
        each phrase starts and ends with a strange distortion
        words mixing together, a sound like labored breath
        he does not stop, even as i approach
    
    akizet
        tozik...
        are you...

    tozik::mutter
        ...­%¼mploded by the pulse...

    sourceless
        without pause, his voice rises to greet me
        
    tozik
        akizet, hello
        i understand your concern...
        i am not lost, merely reviewing memory
        it seems to be helping me stay present

    tozik::mutter
        ...and the pulse]›×§ drew more of them...
    
    tozik
        akizet, there is no time to speak
        but... i know you
        and i know you will hold my death as your fault

    tozik::mutter
        ...dispersed, sliced apart|!— to their cheers...

    tozik
        but know that i am so happy to have learned the truth
        if you carry it to everyone else...
        
    tozik::mutter
        ...¦…¯+covering the entry of a surface runner...

    tozik
        there will be nothing to forgive
    
    sourceless
        ...
    
    akizet
        tozik, i just wanted...

    sourceless
        tozik waves me away coldly, turning back to his work
        connecting cysts, forming something new...
    
    tozik::mutter
        ...accomplished our mission...
        ...a n•¯€w age of safety...

    RESPONSES::akizet
        ...<+>END
            EXEC::setCam()

END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();vn.done()
`)

env.dialogues["final_bozko"] = generateDialogueObject(`
start
    sourceless
        bozko stands across from the door, staring into it
            EXEC::vnp({bozko: "show", hideStage: true})
        and as i approach, i feel his rage
        with the slightest turn of his head, he acknowledges me

    bozko
        all of this...
        our mission, our entire future, everyone...
        so many lost...
        so much <em>truly</em> lost, so much we can never recover
        and we still do not even know why
    
    sourceless
        his gaze turns to me, slowly
    
    bozko
        vekoa is a monster
        when we are done
        let there be nothing left of her
    
    sourceless
        i dip my receptors affirmatively - i agree with him...
        however, it is vengeance alone that grips him
        i understand... i feel it too
        but vengeance so easily spirals into unwise decisions
    
    akizet
        bozko, just remember...
        you must survive, if we are to endure a collapse
        we will stop vekoa, we will have our answers...
        but promise you will stay with us, and protect us
        do not rush ahead, or grasp at false opportunities
    
    sourceless
        the notion that he might even consider doing this inspires a sharp twist of his receptors
        for an instant, in his instability, i fear he may lash out
        but... he softens
    
    bozko
        i promise

    RESPONSES::akizet
        ...<+>END
            EXEC::vn.done()

END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
`)

env.dialogues["final_gakvu"] = generateDialogueObject(`
start
    sourceless
        gakvu lingers near the wall, watching over the others
            EXEC::vnp({gakvu: "show", hideStage: true})
        a kind twist in her receptors forms as i approach
    
    akizet
        gakvu!
        are you ready?
    
    gakvu
        oh, akizet,
        do not say that as if i have a choice
    
    sourceless
        she chuckles - merely a wry complaint
        her laugh lifts my spirit
    
    gakvu
        all of this running around, sabotaging...
        it is truly funny, akizet
        this is the very thing i chose to escape so many θeyes ago
        velzie's fondness for repetition is truly nauseating
        if this works out, and we really can stop the collapse...
        maybe it will be a sign i never should have stopped, huh?
        perhaps quiet sabotage of those who mean harm is my calling
    
    sourceless
        a part of the conflict as she is, on a side that seems to be smaller...
        i cannot help but ask
    
    akizet
        you say that, but...
        did you really stop?

    sourceless
        though confused at first, she processes my question quickly
        the coil of her receptors loosens
    
    gakvu
        i did, akizet
        our work... it was never something i was trying to ruin
        if anything, my plan was to protect you all if we found anything
        it is only through velzie's cruel twisting that someone else reached you first
        and so brazenly... 
        personally, i would have been more delicate about the matter
        maybe i should have acted sooner after we discovered the pattern...
        but, now is no time for regrets
        and akizet...
        you should know, this attack, this tragedy...
        if we are not careful, even if we succeed, it could be for nothing
        survivors could be picked up, recruited, suppressed...
        despite everything, the conflict could stay in the dark
        while those who seek awakening entrench themselves further
        ...
        outside of just helping survivors and escaping,
        that has been my greatest concern
        that somehow, this unfathomable loss...
        will not change anything
    
    akizet
        i will not let that happen
        none of us will
        you know that
    
    gakvu
        yeah, i do...
        i suppose what i am trying to say is,
        if something does not seem right,
        do not rush to share the truth you have learned
        not until you know it cannot be silenced
        understand?
    
    sourceless
        a strange demand, some sort of precaution...
        she will not say it, but she thinks she is going to die here
        but i will not let that happen
    
    akizet
        yes... i think so

    gakvu
        good!
        we should begin soon

    RESPONSES::akizet
        agreed<+>END
            EXEC::vn.done()

END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
`)

env.dialogues["final_idrilik"] = generateDialogueObject(`
start
    sourceless
        idril chats idly with karik, who still sits upon her shoulder
            EXEC::vnp({karik: "show", idril: "show", hideStage: true})
        structural plans, worries about the spire's health, time left...
        while i dislike interrupting, a question forms in my mind

    akizet
        hello idril, karik!

    idril
        akiizet!
    
    karik
        is there a problem??

    akizet
        oh, no, no... we are about to move in
        i wanted to ask, idril...
            EXEC::vnp({idril: "focus"})
        do you have any idea how this all connects?
        the signal that warped the golems, the ceremony, the contact affliction, vekoa...
    
    sourceless
        the meteorite... the bright cousins' probe...
        all of these events are conjoined, they have to be
        karik knows i am leaving out those details, visible in the pulling back of their receptors
        there are so many variables, but, i will spare her involvement
    
    idril
        what a funny question!
        i really have no idea at all!!
        that signal, or scream, as my other friends called it...
        that easily could have been a product of the groundsmindry core being misused
        our mindcores are often ignorant of groundsmindry signals, though...
        so it was as if vekoa were sending something else through the broadcast relays!
        that aside... groundsmindry and a ceremony alone would not cause the strange affliction we have seen
        which is something entirely new!
        really akizet, it is all so fascinating and unprecedented!
        i am sure i will be studying this, for θeyes and θeyes!
        assuming we survive, of course, hehe

    sourceless
        still so detached...
        there is a significant chance that we all perish, and yet, she snickers
        this could be the last time we speak - i will not withhold my curiosity any longer
    
    akizet
        one more thing...
        your behavior, idril, is it--self modification?
        forgive the accusation, but...
    
    karik
        akizet!!
            EXEC::vnp({karik: "focus"})

    sourceless
        karik is practically in shock at my bluntness
    
    idril
        woow... well, i did not realize i appeared that way!
            EXEC::vnp({idril: "focus"})
        no, i have not self-modified
        it is true that my mindcore is a little unusual...
        but that is because i am starving it!  
        it is common for extended study dull engineers, like myself  
        a very standard practice! and mostly harmless
        it may seem strange, but it makes the dull plane easier to understand...
        i can tell you more if we live!
    
    sourceless
        detached as she is, she is not blind to our zenruka
    
    karik
        and akizet--i am confident we still have time!
            EXEC::vnp({karik: "focus"})
        i have been reviewing every piece of knowledge about the spire i have,
        brainstorming with idril, too, who has some secondary knowledge
        and i have some theories on how we can still save it, but...
        you have to act fast!
        once it is clear, i will come help!

    RESPONSES::akizet
        very well<+>END
            EXEC::vn.done()

END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
`)

env.dialogues["final_akizet"] = generateDialogueObject(`
loop
    RESPONSES::akizet
        call kazki<+>kazki
            SHOWIF::[["PAGE!!grmkcall", false]]
        call gordon<+>gordon
            SHOWIF::[["PAGE!!grmgcall", false]]
        call anyone else<+>anyone
            SHOWIF::[["PAGE!!grmacall", false]]
        call isabel<+>isabel
            SHOWIF::[["citystreet__flower_beacon", true], ["PAGE!!grmicall", false], ["PAGE!!grmacall", true], ["PAGE!!grmgcall", true], ["PAGE!!grmkcall", true]]
        i am done<+>END

start
    sourceless
        there is so little time to spare
        but the noise through communications seems to have greatly lessened
        i think i can reach out to some others
        if our plan fails...
        this may be my last chance to ever speak with them

    RESPONSES::akizet
        call kazki<+>kazki
            SHOWIF::[["PAGE!!grmkcall", false]]
        call gordon<+>gordon
            SHOWIF::[["PAGE!!grmgcall", false]]
        call anyone else<+>anyone
            SHOWIF::[["PAGE!!grmacall", false]]
        call isabel<+>isabel
            SHOWIF::[["citystreet__flower", true], ["PAGE!!grmicall", false], ["PAGE!!grmacall", true], ["PAGE!!grmgcall", true], ["PAGE!!grmkcall", true]]
        i am done<+>END

gordon
    sourceless
        try gordon, funfriend
    
    funfriend
        ok!
        ...
        ...
        nothing!
        but the response is familiar
        it seems like his communicator may be broken!
    
____SHOWIF::["gol__s_calls-gordon", false]
    sourceless
        œ›¤€ù
        at least he is probably still within his city...
        safe, surely
        the cousins do not deserve this horror

____SHOWIF::"gol__s_calls-gordon"
    sourceless
        of course, after our last call...
        i had hoped it was merely an accidental disconnection
        or some brief incoherence
        but it is likely that it was fully broken
____END

    RESPONSES::akizet
        ...<+>loop
            FAKEEND::(back)
            EXEC::change("PAGE!!grmgcall", true)

isabel
    sourceless
        funfriend, call isabel
        she must still have that communicator

    funfriend
        ok!
        ...
        it worked!
    
    isabel
        Akizet!
        I wasn't expecting to hear from you until Tuesday.
        What's up?

    sourceless
        with her synchronous connection, it would take far too long to relay all we have learned
        and even if i did... it would place her in unwarranted danger
        after all, she is merely a custodian of bright parasites
        i must keep this short

    akizet
        isabel...
        some very bad things are going to happen, very soon
        you will be fine, but i am not sure i will survive
        i am trying to stop them, i am doing everything i can
        and i stand now at a threshold, where,
        ah, the specifics do not matter
        but before i cross, i wanted to say...
        i am so happy that i--
    
    isabel
        Wait, wait, wait, what are you talking about?
        Akizet, what's happening?
        Is--is there any way I could help?
    
    akizet
        no, no, isabel, this is beyond you, even beyond me
        and even if i survive...
    
    sourceless
        i glance around the darkened chamber, to cavik, to gakvu...
    
    akizet
        it is likely i will need to hide for some time

    sourceless
        isabel is silent, but i must allow this
        a short time passes, trimming our window to stop vekoa even further
        audio communication has never felt so frustratingly slow
    
    isabel
        So...
        I... I don't know what to say.
        Is this goodbye?

    sourceless
        her voice wavers, confused, burdened by a quiet welling of unexpected tears
        i should be feeling the same...
        but my mind is already so scarred by all we have lost
        and it surely must show in my blunt speech

    akizet
        it might be, yes
        isabel, i do not have much time, 
        already have i endangered myself by spending this θblink to call you
        but i could not leave you without this closure
        you have been such a kind light in my θdeath
        thank you, for everything
        one way or another, we will meet again in time

    sourceless
        another pause, a sniffle, while she finds the words...
        i feel the expectant eyes of the others within the chamber
        to them i have been silent this whole time,
        a tension quickly building over my idleness
        i must end this
    
    isabel
        Akizet...
        I'll miss you.
        And if you... If you need somewhere to hide,
        You know where to find me.
        Good luck, okay?
    
    akizet
        thank you, isabel
        i will miss you as well
        keep velzie entertained for me
  
    RESPONSES::akizet
        ...<+>loop
            EXEC::change("PAGE!!grmicall", true)
            FAKEEND::(end call)

anyone
    sourceless
        though funfriend and i try...
        something still seems wrong
        whether it is a part of my cyst that has broken,
        or some proxy carrier within the dull failing,
        most of our attempts to reach the collective are met with nonsense noise
        it seems we are limited to direct connections for now
        the best i can do for the others, to reveal the truths of what happened here,
        is to survive

    RESPONSES::akizet
        ...<+>loop
            EXEC::change("PAGE!!grmacall", true)
            FAKEEND::(back)

kazki
____SHOWIF::"PAGE!!grmkcall"
    sourceless
        kazki does not respond...

____SHOWIF::["PAGE!!grmkcall", false]
    sourceless
        funfriend, try kazki
    
    funfriend
        ok!
        ...
        ...
        connection established i think?
        akizet there was an acknowledgement but our connection is terrible
    
    akizet
        kazki? hello? are you safe?

    sourceless
        a mixture of shock and dread pours through from the other side
    
    kazki
        akizet?! 
        i have been trying to reach you!
        you need to get off the planet!!
        as soon as you possibly can, just as far as you can get
        i am taking care of a few things, but soon i will be off too
        just get away, away!!
    
    akizet
        kazki, that... that is my goal, but it will be some time
        and it is almost over... almost
        listen--we have discovered it all!! 
        the source of the call, a hidden conflict, there is so much
        we have so, so many answers...
        when we are done, i must tell you everything
        
    sourceless
        the fact that i cannot leave yet enrages kazki, her panic filling my mind,
        but what follows quiets her - indeed, there is no more emotion to read
        it is silent
        do we still have a connection?

    funfriend
        yes!
    
    akizet
        kazki?
    
    kazki
        where are you?
    
    sourceless
        a flatly delivered question, puzzling that she would even ask

    akizet
        you do not know?
        kazki, the embassy is under a terrible attack, and we are fighting to stop it
        we have been using the timestopper, descending
        our golems, the bodies of murdered qou, they are being used against us
        but now we know how to stop it all
        it is a nightmare, and--
    
    kazki
        you are still at the embassy?!
        no, no, akizet, you <em>need to go now,</em> you cannot s«ÓŽ©
            WAIT::1500
            AUTOADVANCE::
    
    sourceless quiet
        the connection is flooded with an overwhelming signal,
            EXEC::play('criticalError', 0.3)
        one that her device fails to capture in its entirety
        but it feels frighteningly familiar
        ...and we do not feel it, here...
        she is somewhere far from us
    
    akizet
        wait, kazki, hello?
        where are <em>you?</em>
        kazki?

    funfriend
        the connection snapped akizet
        and i cannot find her again
    
    sourceless
        for a θblink, i am paralyzed
        she is in danger, that much is clear, 
        but what does it mean, that only she was struck by that signal?
        still on earth, presumably, given what she said, so...
        this cannot be the only attack
        i can only pray that velzie grants her mercy until we can help
____END
  
    RESPONSES::akizet
        ...<+>loop
            EXEC::change("PAGE!!grmkcall", true)
            FAKEEND::(back)

END::if(env.stage.current.markCharEvents) env.stage.current.markCharEvents();
`)

/**** !P15b - the core and final fights ****/
env.dialogues["vekoaboss"] = generateDialogueObject(` 
start
    sourceless
        standing before the door, i look over those assembled
            EXEC::vnp({gakvu: "show far", idril: "show far", cavik: "show far", karik:"show far", bozko: "show far", tozik: "show far", hideStage: true})
        each friend, old and new,
        all perched upon this last branch of our plan, perhaps to fall
        they have followed me here... entertained this insane effort
        and it may be the last time i see any one of them
        they peer back at me expectantly
        are we ready to risk everything?
        have we made peace?

    RESPONSES::akizet
        it is time<+>time
        ...<+>END
            FAKEEND::(not yet)
            EXEC::vn.done()

time
    akizet
        friends, it is time
        bozko, cavik, gakvu, with me

    sourceless
        they gather with me near the door, where the overlap's horizon twists in welcome
            EXEC::vnp({gakvu: "show", idril: "hide", karik:"hide", cavik: "show", bozko: "show", tozik: "show far", hideStage: true})
        idril and karik watch on with hope, while tozik...
        tozik twists around from his work on the golem carcass
    
    tozik
        wait...
            EXEC::vnp({tozik: "show far focus"})
        ca…¸¾vik
        come, take this

    sourceless
        with shaky claws, he holds up one of the golem's gauntlets
        half hollowed out, one side glimmering with the dull's gray light
            EXEC::vnp({tozik: "defocus far", cavik: "show far", bozko: "hide", gakvu: "hide"})
        
    tozik
        it is sa¤úºœfe to handle, do not worry...
    
    tozik::mutter
        ...¯*twice-shot, shell parted¦…,...

    sourceless
        cavik comes to take it, though it does not seem to be as light as tozik made it appear
        it takes some balancing before cavik is able to hold it effectively
        fitting over one of his claws, held up by the other, his stance shifted to balance the weight
    
    cavik
        this is the dull pulse component, right?
    
    sourceless
        tozik affirms with his receptors
        the weapon's weight will hinder cavik slightly, but...
        i trust tozik - it should still be a boon in the coming conflict

    tozik
        i... in•œrted it
        it should on…‡•ly affect the ceremony
        including vekoa'×§ monsters... 
        use it–.›_ to sever the veins*•–¦
        strike them all down
    
    tozik::mutter
        ...t]h.e swarm eliminated¾|...
    
    sourceless
        cavik looks on appreciatively, but hesitates to say anything
        what he feels is shared by all of us
        tozik is nearing a critical state, never having received that resurgence that idril mentioned
        perhaps the affliction is not so predictable, and velzie has simply chosen this path
        it feels wrong

    cavik
        tozik... thank you
        and just hold on, ok?
        
    gakvu
        we will be right back

    tozik
        go
            EXEC::env.noBgmDuck = true;
    
    sourceless quiet
        with one last grim exchange of gazes, we reassemble before the threshold
            EXEC::env.noBgmDuck = true;setCam({x: 7, y: 3, rotation: 0});vn.done();changeBgm(env.grm.music_oki, {length: 4000, seek: 0})

    sourceless
        idril watches on with excitement,
        while karik clings to her shoulder, receptors pulled back out of anxiety
        they give us a respectful dip of their receptors regardless

    idril
        we will watch over tozik!

    akizet
        thank you, idril
        no, everyone... thank you
        we just have this final step... then it is over
        
    sourceless
        together, we enter the grand door at last
            EXEC::flash(true);env.noBgmDuck = false;
        the horizon of the dull overlap twists in welcome
        and once we pass the threshold... a ripple of anger meets us
            EXEC::env.grm.combat("ep4_vek_pt1");removeStatus(env.rpg.actors.cavik, "fear")
            WAIT::1000
            THEN::ratween(env.bgm, 0.5)
        the chamber's color burns, bathed in dull light from the groundsmindry core
            EXEC::env.rpg.classList.add('hideteams');vfx({type: "flash", state: false, delay: 1000});env.rpg.setCam({x: 9, y:9, playerRotation: 45, playerTilt: -30})
        a blinding shape, this nightmare made physical
        from it stems a writhing mass of veins that disappear in all directions
        and our foes, instruments of the ceremony, await us
        vekoa is not present, surely still within the core, attempting to direct what remains
        we cannot force her out, not yet...
        the core is too entwined with the ceremony to risk harming directly
        but we will not need to
        for some of the ceremony's veins coil around the chamber tightly, plainly visible,
            EXEC::env.rpg.setCam({x: 9, y:2, playerRotation: 60, playerTilt: -20})
        pulled close and pressed into physicality, likely because of our efforts
        the smaller it becomes, the more will be forced into physicality...
        and the easier it will be to break apart
        the okidoia speaks to us, like sobbing, surely wielded by vekoa
            EXEC::body.classList.add('vis-flash', 'vis5')

    okidoia
        s/:£tÕp
            EXEC::env.rpg.setCam({x: 8, y:9, playerRotation: 0, playerTilt: -20});vfx({type: "okidoia", state: "mild"})
        •¶Leµ)¬sÊ
        i÷¾(Ïù a m¯¯]..†r+ý÷^ænG
            EXEC::flash(true);body.classList.add("vis-flash-blur")
        å¡ùÖÊÜiÄÈ minds entwined, accepting the connection, i realize,
        it is not an accusation - it is a ña3ÙæmêÓ§°Ü÷ßR

    sourceless
        desperate, fragmented words...
            EXEC::vfx({type: "okidoia", state: false});flash(false)
        if there were ever a point to reason, it is long past
            EXEC::body.classList.remove('vis-flash', 'vis5', 'vis-flash-blur')
        whether it is truly her, or a parasite grasping at emotions it does not understand,
        what she has done is unforgivable, and what she intends to do will kill even more
        the overlap pulses, tendrils shifting, the world distorting
        distantly, something within the embassy snaps, causing a great rumble
        time is running out--but we are ready
        still, as much as we have pushed vekoa onto her back foot,
        we are in bad shape, too...
    
    timestopper
        ignore the voice - listen to me
        where the veins appear most physical
            EXEC::env.rpg.setCam({x: 6, y:2, playerRotation: -45, playerTilt: -30})
        we must strike
        clear a path, but do not become distracted
        the organs of the ceremony are our only target
        any strength, any tools, anything you have - we spend it all here
        this is our last stand
            EXEC::env.rpg.setCam({x: 8, y:9, playerRotation: 0, playerTilt: -20})

    sourceless
        an impulse of understanding passes through the timestopper
            EXEC::env.rpg.actors.akizet.piece.focusOnTile()

    sys
        ANALYSIS::'context shift'
        NOTICE::'ALLY entities';'granted last stand status'
        NOTICE::'automatic self-revival upon DOWN';'once'
        NOTICE::'actions broadly improved'
        NOTICE::'entity CAVIK';'primary action altered'

____SHOWIF::"gameplay_off"
    sys
        NOTICE::"gameplay is presently disabled";"re-enable in SYS menu if undesired"
____END
        
    RESPONSES::akizet
        begin<+>END
            SHOWIF::["gameplay_off", false]
            EXEC::env.rpg.setCam();env.rpg.classList.remove('hideteams');ratween(env.bgm, 1)
            FAKEEND::start combat
        begin<+>CHANGE::vekoaboss_nogame
            SHOWIF::["gameplay_off", true]
            FAKEEND::skip gameplay
            EXEC::ratween(env.bgm, 1)

SKIP::env.noBgmDuck = false;env.grm.combat("ep4_vek_pt1");flash(false);setCam();vn.done();if(check("gameplay_off")) { cutscene(true); setTimeout(()=>{startDialogue("vekoaboss_nogame"); cutscene(false)}, 1200)} else {env.rpg.classList.remove('hideteams')};ratween(env.bgm, 1);env.oldBgm = env.grm.music_oki;env.bgm.saveRate = 1;env.rpg.setCam();vfx({type: "okidoia", state: false});body.classList.remove('vis-flash', 'vis5', 'vis-flash-blur')
`)

env.dialogues["vekoaboss_nogame"] = generateDialogueObject(` 
start
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";'toggle within system menu if desired'
            EXEC::cutscene(false);env.rpg.classList.add("hideteams")
        NOTICE::"contextual narration applied"

    sourceless
        it is hard fought, but we reach the first clear organ of the ceremony we can find
            EXEC::flash(true)
            WAIT::1000
            THEN::env.rpg.grid.style.setProperty("--playercontrol-tilt-raw", 20);env.rpg.grid.style.setProperty("--playercontrol-rotation-raw", -225);env.rpg.actors.akizet.piece.moveToCoords(8, 2);env.rpg.actors.cavik.piece.moveToCoords(8, 1);env.rpg.actors.gakvu.piece.moveToCoords(7,3);env.rpg.actors.bozko.piece.moveToCoords(9, 3);flash(false)
        a part of some massive, greater whole
    
    sourceless quiet
        with cavik's explosives, our claws, and the altered dull pulse,
            EXEC::play("dull", 0.75)
        we soon see it torn open
            EXEC::play("dull", 0.5);env.rpg.enemyTeam.members.forEach(m=>m.hp = 0);updateStats()
        
    RESPONSES::akizet
        ...<+>CHANGE::vekoa_p1
            FAKEEND::(continue)
`)

env.dialogues["vekoa_p1"] = generateDialogueObject(` 
start
    sourceless quiet
        the veins split apart across both planes, bleeding color into the air
            EXEC::env.rpg.setCam({x: 9, y:0, playerRotation: 0, playerTilt: -30});env.rpg.classList.add('hideteams');ratween(env.bgm, 0.75)

    sourceless
        and the overlap ripples, destabilized
        something about it feels smaller, under higher pressure, as idril said...
        the ceremony is failing - this is working
        and there, across the path
            EXEC::env.rpg.setCam({x: 9, y:8, playerRotation: 165, playerTilt: -15})
        our efforts have brought the ceremony's dull organs ever closer
        exposing our next target

    okidoia
        IÜ4‡þøïaøknow what must be done
        the only way t¥¨äÍ£R˜Òw"

    sourceless
        vekoa's illusions around us have broken apart, splitting into countless minute strands,
        and have instead formed into a protective membrane - she has caught onto our plans
            EXEC::env.rpg.setCam({x: 8, y:14, playerRotation: 165, playerTilt: -30})
        it writhes, forming offensive appendages
        seemingly stationary, but no less of a threat
        but in order to defend, it too must be physical
        we will tear it all down
    
    RESPONSES::akizet
        attack<+>END
            SHOWIF::["gameplay_off", false]
            FAKEEND::(continue)
            EXEC::env.rpg.halt = false;env.rpg.setCam();if(env.rpg.haltedAttempt) advanceTurn();env.rpg.classList.remove('hideteams');ratween(env.bgm, 1)
        attack<+>nogame
            EXEC::env.rpg.setCam()
            FAKEEND::(continue)
            SHOWIF::["gameplay_off", true]

nogame
    sourceless
        the wall, formed of countless minute strands, lashes out at us with spiked limbs
            EXEC::flash(true)
            WAIT::1000
            THEN::env.rpg.actors.akizet.piece.moveToCoords(8, 13);env.rpg.actors.cavik.piece.moveToCoords(8, 14);env.rpg.actors.gakvu.piece.moveToCoords(7,13);env.rpg.actors.bozko.piece.moveToCoords(9, 12);flash(false)
        its movement is distantly familiar, reminiscent of a room being reshaped
        similar to movefriend, when it was wielded against us
        but like it, this form falls
            EXEC::env.rpg.enemyTeam.members.forEach(m=> m != env.rpg.currentVein ? m.hp = 0 : 0);updateStats();
        
    RESPONSES::akizet
        ...<+>CHANGE::vekoa_p2
            EXEC::env.rpg.scenario.turnCallback()
            FAKEEND::(continue)

`)

env.dialogues["vekoa_p2"] = generateDialogueObject(` 
start
    sourceless
        the protective wall collapses into itself, tendrils breaking apart
            EXEC::imagePreload(["/img/sprites/vekoa/vekoaspec.gif", "/img/sprites/vekoa/vekoaspec_shot.gif"]);env.rpg.allyTeam.members.forEach(m=>{m.hp = m.maxhp;combatRevive(m)});env.rpg.clearCavikSpot();
        and with this opening, i nearly call for cavik to rush in--
            EXEC::env.rpg.actors.cavik.piece.stepToCoords(8, 14);ratween(env.bgm, 0.75)
        but he is already here, wielding the modified dull pulse
            EXEC::forcePlay('dull');flash(true)
        firing it continuously into the veins at close range, severing them all
            EXEC::env.rpg.currentVein.hp = 0;updateStats(env.rpg.currentVein)
        and it is done - the overlap rippling as the ceremony beyond is crippled further
            EXEC::env.noBgmDuck = true;
        the feeling of a scream tears through us, as another shape manifests nearby
            EXEC::env.rpg.p2();env.rpg.classList.add('fearmode');changeBgm(env.grm.music_antag, {length: 10000, seek: 32, preserve: false})
            WAIT::1000
            THEN::flash(false);env.rpg.actors.vekoa_boss.piece.moveToCoords(8, 11, {follow: false})
        it seems vekoa cannot afford to delegate any longer
            EXEC::env.rpg.setCam({x: 8, y: 13, playerRotation: 0, playerTilt: 10, height: 1, distance: 0, detailMode: true, gridTileSize: 200, offsetCamera: 'rotateX(0deg)', hideAllies: true});content.querySelector("#vekoasprite").src = "/img/sprites/vekoa/vekoaspec.gif";flash(false);env.rpg.classList.add('bigcloseup');env.rpg.actors.vekoa_boss.piece.moveToCoords(8, 11, {follow: false})
        for she has formed before us, furious
            EXEC::env.rpg.actors.vekoa_boss.piece.moveToCoords(8, 11, {follow: false})
            NOTE::fuckyoufuckyofuckyouvekoa get in place goddamn it
        the overlap's space bends inwards around her
        there must be a great deal of attention and resources being drawn for this apparition
        but her shape is still imperfect, like the ceremony tendrils forming her are unable to focus
        it must already be dying...
        would it still be possible to complete, even if we stopped now?
        does she know this?
    
    akizet
        vekoa!!
        it is over, the--
            WAIT::2000
            THEN::flash(true);env.rpg.setCam();env.rpg.actors.vekoa_boss.sprite.classList.add('reversion');env.rpg.classList.remove('bigcloseup');env.noBgmDuck = false;
            AUTOADVANCE::
        
    sourceless
        my attempt to speak is cut short, as she vanishes, leaving a swirl of light
            EXEC::env.rpg.setCam({x: 8, y: 14, playerRotation: -45, playerTilt: -30});env.rpg.actors.vekoa_boss.piece.moveToCoords(0, 0, {follow: false});flash(false)
        there is the sound of an impact--no, three, around me
            EXEC::env.rpg.p2strike();flash(false);env.rpg.setCam({x: 8, y: 14, playerRotation: -45, playerTilt: -30})
            WAIT::3000
        my friends are thrown away by sudden, fierce strikes
            EXEC::env.rpg.setCam({x: 8, y: 14, playerRotation: -45, playerTilt: -30})
        and before i can even flex the nerve of the timestopper again,
            EXEC::env.rpg.actors.vekoa_boss.piece.moveToCoords(8, 15, {follow: true})
        my body registers a new wound--two--and more...
            EXEC::forcePlay('stab');
        vekoa's claws have dug through my flesh, before casting me towards the core
            EXEC::env.rpg.actors.akizet.piece.knockback({direction:"up", strength: 3, follow: false});env.rpg.actors.vekoa_boss.piece.moveToCoords(8, 14, {follow: false})
        as i strike the ground, attempting to rise...
            EXEC::env.rpg.setCam({x: 8, y: 12, playerRotation: -45, playerTilt: -30})
        vekoa looms 
        my mind roils with the okidoia again, a shout
            EXEC::body.classList.add('vis-flash', 'vis6')

    okidoia
        ¤Âæ©ceded control to ®÷·¤¤…
            EXEC::flash(true);body.classList.add('vis-flash-blur')
        to save them±y™£V†
        N©÷·./ ò¤,_)Ë Í‡)šš« DËÅ?}
    
    sourceless
        what is she really trying to tell me?
            EXEC::flash(false)
        why bother speaking at all?
            EXEC::body.classList.remove('vis-flash', 'vis6', 'vis-flash-blur')
        it had occurred to me before, but...
        could she truly not <em>want</em> to kill us? are we forcing her claws?
        would she prefer we simply leave?
        besides, after so much death, why would she care to spare <em>us?</em>
        but before she can continue, the air shimmers behind her,
        and the distinctive glow of a disabler pulses
        telyu--she is here!!
            EXEC::midCombatActorAdd(env.rpg.allyTeam, "telyu");env.rpg.actors.telyu.piece.moveToCoords(8, 15)
        she activates the disabler, and its spikes lodge into the back of vekoa's loose shape, causing her to break apart further
            EXEC::play('shot2', 0.6);env.rpg.actors.akizet.piece.moveToCoords(7,11);env.rpg.actors.vekoa_boss.piece.moveToCoords(8, 10, {follow: true});env.rpg.actors.vekoa_boss.sprite.querySelector('img').src = "/img/sprites/vekoa/vekoaspec_shot.gif" 
        sending her forward in an uneasy stumble
        i scramble away while her conjured form writhes, struggling to hold shape
            EXEC::env.rpg.actors.akizet.piece.stepToCoords(8,13)
        briefly uncloaked, telyu tosses a collection of restoratives and supplies to us, salvaged from the dull mind
            EXEC::addItem("restorative", 6);addItem("kavruka", 4);addItem("aima_cyst", 2);env.rpg.actorList.forEach(a=>a.hp = a.maxhp)
        before vanishing once more - no time to gloat
            EXEC::midCombatActorRemove(env.rpg.actors.telyu)
        still, vekoa is recovering... a simple disabler would not stop this
            EXEC::env.rpg.actors.gakvu.piece.stepToCoords(6,14, {follow: false});env.rpg.actors.cavik.piece.stepToCoords(10,14, {follow: false});env.rpg.actors.bozko.piece.stepToCoords(9, 13, {follow: false})
        and she is not the only threat here
        i know what must be done
        i reach out through the timestopper...
    
    akizet
        each of you have such a vital role in recovery
        bozko in surviving collapse, cavik in severing these veins, gakvu in groundsmindry...
        so let this be my final act as your leader
        go, detonate the other veins
        i will entertain vekoa
        
    sourceless
        there is a rise from all of them across our connection
        the impulse that they may protest, that what i am doing is unwise
        bozko most of all
        but even they see - if we split vekoa's focus, it will grow weak
        and so, in wordless compliance,
        they collect telyu's resources, preparing to charge ahead to sever the other veins, while i...
            EXEC::env.rpg.actors.akizet.piece.stepToCoords(8,12);env.rpg.halt = false;flash(true);closeCombat(env.rpg.enemyTeam)
            WAIT::3000
            THEN::env.grm.combat("ep4_vek_pt2")
        i advance upon vekoa, striking her and sending us both into the blinding vortex around the core
            EXEC::flash(false);

    sys
        ANALYSIS::'context shift'
        NOTICE::'entities';'VEKOA';'AKIZET';'act twice'
        NOTICE::'actions altered'
        WARNING::'items disabled'

    sourceless
        this close to the core, the overlap is even more oppressive...
        it is impossible to see outside, like the eye of a great storm
        the ceremony claws at the gate that is the core,
        arcing with dangerous, uncontrolled dull light
        i must take care as i deal with vekoa, sparse on resources as i am
        and it may be impossible to truly kill her like this
        but all i must do is keep her busy...
    
    RESPONSES::akizet
        begin<+>END
            SHOWIF::["gameplay_off", false]
            FAKEEND::(continue)
        begin<+>nogame
            FAKEEND::(continue)
            EXEC::flash(true)
            SHOWIF::["gameplay_off", true]

nogame
    sourceless
        it is as i hoped
            WAIT::1000
            THEN::env.rpg.classList.add('hideteams');env.rpg.actors.akizet.piece.moveToCoords(2, 3);env.rpg.actors.vekoa_1v1.piece.moveToCoords(2, 5);env.rpg.setCam({playerRotation: -90, playerTilt: -10, x: 2, y: 4});flash(false)
        dividing her focus between me and the others has made her vulnerable
        it is a vicious exchange of blows, and i suffer heavily for it
        but i knew the risks
    
    RESPONSES::akizet
        ...<+>CHANGE::vekoa_p3
            FAKEEND::(continue)
`)

env.dialogues["vekoa_p3"] = generateDialogueObject(` 
start
    sourceless
        vekoa recoils from my strikes, her shape nearly breaking apart again
            EXEC::env.rpg ? env.rpg.classList.add("hideteams") : 0;flash(true)
        she is off-balance, distracted--she must be shifting focus to the others
        and so, as we continue, my mind's eye is drawn to them as well...
            EXEC::if(env.rpg) {env.rpg.halt = false;flash(true);closeCombat(env.rpg.enemyTeam)} else {flash(true)}
            WAIT::2500
            THEN::flash(false);env.grm.combat("ep4_vek_pt3");removeStatus(env.rpg.actors.cavik, "fear")
        between my movements and my strikes, i can lend guidance
    
    sourceless
        the chamber around them almost seems larger, stretched, yet restricted
            EXEC::env.rpg.setCam({x: 8, y: 5, playerRotation: -0, playerTilt: -20})
        as the ceremony destabilizes, so too does the shape of this twisted chamber
        critical veins nearby flicker with instability, incorporeal
            EXEC::env.rpg.setCam({x: 9, y: 2, playerRotation: -0, playerTilt: -40})
        gleaming images of large golems ahead warp the space - they must be the source of this shielding
        a strange leverage keeping the ceremony's organs out of reach...
        they must be destroyed first

    timestopper
        there are so many, still...
        and they will keep coming
        just press on
    
    sourceless quiet
        as they start to advance, a disabler burst suddenly disperses one of their foes
            WAIT::2000
            THEN::midCombatActorAdd(env.rpg.allyTeam, "telyu");env.rpg.setCam();env.rpg.actors.telyu.piece.focusOnTile();let a = env.rpg.grid.querySelector("combat-tile[slug='?']").piece.actor;a.hp = 1;useAction(env.rpg.actors.telyu, env.ACTIONS.disabler_pulse, a);forcePlay('shot6', 0.5)
        
    sourceless
        telyu has come to help... without a timestopper?
        karik clings to her shoulder, seeming to act as extra eyes
        both of these motions are incredibly reckless
        but no one needs to speak of the danger, 
        for danger is of no consequence in these final moments
        they must clear the way
            EXEC::env.rpg.currentActor.piece.focusOnTile()
        
    RESPONSES::akizet
        begin<+>END
            EXEC::env.rpg.classList.remove("hideteams");env.rpg.currentActor.piece.startMovement()
            SHOWIF::["gameplay_off", false]
            FAKEEND::(continue)
        begin<+>nogame
            SHOWIF::["gameplay_off", true]
            EXEC::flash(true)
            FAKEEND::(continue)

nogame
    sourceless
        the team advances, tearing apart foes and covering one another
            EXEC::flash(true)        
        the golems pose a great threat in how they wield the overlap's light
        but as a stranded surface team might fend off a pack of predators,
        my friends work together in a silent flow
        but eventually... something catches them by surprise
    
    RESPONSES::akizet
        ...<+>CHANGE::vekoa_p3_tozik
            FAKEEND::(continue)
`)

env.dialogues["vekoa_p3_tozik"] = generateDialogueObject(` 
start
    sourceless
        the dull light bends near an edge of the space - something pressing through
        we expect to see another foe, but... the new shape is familiar
        tozik, distorted... much like malvi appeared to us
            EXEC::flash(false);midCombatActorAdd(env.rpg.allyTeam, "tozik_npc");env.rpg.actors.tozik_npc.piece.focusOnTile()
        a wave of immense dread passes through the connector
        is he lost? a part of the ceremony? how is he moving?
        but fears fade as he charges ahead, towards our foes, corruskivi ready
        is this his promised resurgence??
        the help is not unwelcome, but...
        disconnected as he is, there is no time to argue
            EXEC::env.rpg.currentActor.piece.focusOnTile()
        
    RESPONSES::akizet
        continue<+>END
            EXEC::env.rpg.halt = false;if(env.rpg.haltedAttempt) advanceTurn()
            SHOWIF::["gameplay_off", false]
            FAKEEND::(continue)
        continue<+>nogame
            EXEC::flash(true)
            SHOWIF::["gameplay_off", true]
            FAKEEND::(continue)

nogame
    sourceless
        together, with great effort, they tear through these foes
        and where blows may have been fatal, there is tozik
        he is repairing their wounds with more efficiency than ever before,
        as if he is thriving in this warped space, in his altered state
        in time, the golems struggle to hold under their assault
    
    RESPONSES::akizet
        ...<+>CHANGE::vekoa_p4
            FAKEEND::(continue)
`)

env.dialogues["vekoa_p4"] = generateDialogueObject(` 
start
    sourceless
        as the protectors snap apart, the overlap constricts
            EXEC::if(!env?.rpg?.active) flash(true);imagePreload(["/img/sprites/vekoa/vekoaspec_despair.gif", "/img/sprites/vekoa/vekoaspec_activefreak.gif"])
        the veins feel closer - it is their chance to strike
        cavik hurries ahead to sever them, and--
            EXEC::if(env.rpg) {env.rpg.halt = false;flash(true);closeCombat(env.rpg.enemyTeam)} else {flash(true)}
            WAIT::2500
            THEN::flash(false);env.grm.combat("ep4_vek_pt4");env.rpg.setCam({x: 5, y: 4, playerRotation: 0, playerTilt: -10});env.rpg.classList.add('hideteams');
        
    sourceless quiet
        i step back from vekoa as she lunges at me, a narrow miss
            EXEC::play("miss", 0.75)
        it is rare that she misses, though the same could be said for me
        but she follows with a successful strike, and i am flung away...
            EXEC::play("stab");env.rpg.actors.akizet.piece.knockback({direction: "left", strength: 2, follow: false});env.rpg.actors.vekoa_1v1.piece.moveToCoords(5, 7)
        we are both ragged, and though it is clear that she can simply reform...
        while fighting on two fronts, she is unable to spend the focus
        but before i can retaliate, a great blast rocks the space, and the overlap writhes
            EXEC::flash(true);play('criticalError', 0.3)
            WAIT::2000
            THEN::env.rpg.classList.add("pt4");flash(false);env.chrome ? env.rpg.setCam({x: 5, y: 9, playerRotation: 0, perspective: "1000px", distance: 0, playerTilt: 0, height: 0.5, hideAllies: true, detailMode: true, gridTileSize: 200}) : env.rpg.setCam({x: 5, y: 7, playerRotation: 0, distance: 2, perspective: "1000px", playerTilt: 20, height: 1, detailMode: true, hideAllies: true, gridTileSize: 200})
        another critical strike to the ceremony
        they have done it
        and from what i sense from their thoughts,
        i need only occupy vekoa just a little longer...
        her claws come up to grip her face, where they break apart into countless tendrils
            EXEC::flash(true)
            WAIT::400
            THEN::env.rpg.actors.vekoa_1v1.sprite.querySelector('img').src = "/img/sprites/vekoa/vekoaspec_despair.gif";env.rpg.actors.vekoa_1v1.sprite.querySelector('img').style.width = "150px";flash(false)
        her entire body is fraying - the illusion of familiarity is broken

    okidoia::dark
        S  T O P
        R E TU RN
        PLæE§½
        IÜ4‡þøïaøknow what must be done
        the only way to recover¥¨äÍ£R˜Òw"
        É…VE  rýÒ;-nË

    sourceless quiet
        clearer meaning now... but it does not matter
        it is far too late

    sourceless
        that any of this - the slaughter above, worst of all - could somehow be undone
        it is nonsense, especially when spoken by its perpetrator
        but behind her, something emerges from the blinding core...
        a malformed shape - stumbling, lopsided, dark
        before i can make out any detail, the threads that formed vekoa stab into it
            EXEC::flash(true)
            WAIT::400
            THEN::env.rpg.actors.vekoa_1v1.sprite.querySelector('img').src = "/img/sprites/vekoa/vekoaspec_activefreak.gif";env.rpg.actors.vekoa_1v1.sprite.classList.add('freakmode');env.rpg.actors.vekoa_1v1.sprite.querySelector('img').style.width = ""
        weaving through it like the toothed roots of a veilk leg, plunging into soil
            EXEC::flash(false)
        it was a body... her body? 
        the combined form is hideous, terrifying, half-formed of physical corru
            EXEC::env.chrome ? env.rpg.setCam({x: 5, y: 10, playerRotation: 0, perspective: "1000px", distance: 0, playerTilt: 0, height: 0.75, hideAllies: true, detailMode: true, gridTileSize: 200}) : env.rpg.setCam({x: 5, y: 7, playerRotation: 0, distance: 2, playerTilt: 20, height: 1, detailMode: true, hideAllies: true, gridTileSize: 200, perspective: "1000px"})
        and her posture, receptors, gaze - even the feeling in the air,
        is a bone-chilling hatred, blame, burning into me
        
    okidoia::dark
        cÅ4Ä–sT ý æôr,§½ÿlf
        ÄS¿De

    sourceless quiet
        if she pulled her body out, to manipulate it directly...
        then it cannot be her, right? for i feel that the others are still fighting

    sourceless
        is her mind in this body?
        or is it in the ceremony's flesh?
        something else?
        there is no time to think about it
        this twisted amalgamation is coming for me

    RESPONSES::akizet
        begin<+>END
            SHOWIF::["gameplay_off", false]
            EXEC::env.rpg.setCam();env.rpg.grid.style.setProperty("--playercontrol-tilt-raw", 20);env.rpg.grid.style.setProperty("--playercontrol-rotation-raw", 0);env.rpg.classList.remove('hideteams')
            FAKEEND::(continue)
        begin<+>nogame
            FAKEEND::(continue)
            SHOWIF::["gameplay_off", true]
            EXEC::env.rpg.setCam();env.rpg.grid.style.setProperty("--playercontrol-tilt-raw", 20);env.rpg.grid.style.setProperty("--playercontrol-rotation-raw", 0);

nogame
    sourceless
        its strikes are more relentless than ever, made sharper by its new shape
            EXEC::flash(true)
        new limbs draw from vekoa's twisted form, knocking me away, trying to throw me into the overlap's distortion
        my body is falling apart
        and i can only follow old instincts--stabbing at what seems vital
    
    RESPONSES::akizet
        ...<+>CHANGE::vekoa_p5
            FAKEEND::(continue)
`)

env.dialogues["vekoa_p5"] = generateDialogueObject(` 
start
    sourceless
        vekoa staggers away from me, rapidly patching physical wounds with the ceremony's tendrils,
            EXEC::flash(false)
        replacing joints and patches of flesh i have broken with blinding dull light
    
    okidoia::dark
        ¦(Ûc\½‰still time still  ti m e  t her re
        pl»˜¿Šé¦  …#ñ st#Þø  TH‹î
        L I  S T E N   L I S T E   NbŠÞÐaü1

    sourceless
        its patchwork shape exposes the familiar truth
        this is nothing but a corpse made to dance by the tendons of a beast
        if only i had the same advantage
        
    funfriend
        akizet at least two internal regulators are broken now!
        your left leg is going to stop working soon!!

    sourceless
        it does not matter, funfriend
        actually...
        funfriend: assume motor control
        directive: fight off vekoa
        do what i have been doing
    
    funfriend
        akizet...
        this is not really my area of expertise!!

    sourceless
        do it
    
    funfriend
        ok ok ok
        utilizing archived movements!
        i will do my best!
    
    sourceless
        funfriend seems to have taken note of my aggression, for i begin to advance...
        i would normally never command funfriend to handle such a critical moment
        but what happens to me now does not matter
        it is the others who must complete their task
            EXEC::env.rpg.halt = false;flash(true);closeCombat(env.rpg.enemyTeam)
            WAIT::2500
            THEN::flash(false);env.grm.combat("ep4_vek_pt5");removeStatus(env.rpg.actors.cavik, "fear");
        
    sourceless
        with the ceremony so broken, the remaining space of the overlap is hard to even understand
        the core's gateway, the eye, continues to grow more unstable behind them
            EXEC::env.rpg.setCam({x: 3, y: 15, playerRotation: 45, playerTilt: -15})
        and the path, what should be another part of the circular chamber,
        is stretched, twisted in a coil between the core and another bundle of veins
        its tendrils are wrapped around this remaining space,
        displacing the chamber's physicality, acting as barriers
        an understanding is shared in our connection:
        with the overlap so strained,
        this must be the last of the ceremony's critical veins
            EXEC::env.rpg.setCam({x: 3, y: 0, playerRotation: 45, playerTilt: -15})
        so, they must only strike one more time...
        and it will snap apart
        
    RESPONSES::akizet
        begin<+>END
            EXEC::env.rpg.setCam()
            SHOWIF::["gameplay_off", false]
            FAKEEND::(continue)
        begin<+>nogame
            FAKEEND::(continue)
            EXEC::env.rpg.setCam()
            SHOWIF::["gameplay_off", true]

nogame
    sourceless
        one more time, they advance, tearing apart the foes and walls that block their way
            EXEC::flash(true)
        vekoa's parasite has grown desperate, merely half-forming shapes to fight them
        it cannot keep up with the team's momentum
    
    RESPONSES::akizet
        ...<+>CHANGE::vekoa_p6
            FAKEEND::(continue)
`)

env.dialogues["vekoa_p6"] = generateDialogueObject(` 
start
    sourceless
        as the team approaches the last veins...
            EXEC::env.rpg.halt = true
    
    sourceless quiet
        a critical alert passes through my body, something approximating immense pain
            EXEC::flash(true);closeCombat(env.rpg.enemyTeam);forcePlay('stab', 0.75)
            WAIT::2500
            THEN::flash(false);env.grm.combat("ep4_vek_pt6");env.rpg.setCam({x: 5, y: 5, playerRotation: -90, playerTilt: -10});env.rpg.classList.add('hideteams')
        i am torn back to focus upon my body by the shock
            EXEC::env.rpg.actors.akizet.piece.knockback({direction: "up", strength: 1, follow: false})
        how much have i bled?
    
    funfriend
        ahaha akizet you must take over again! now!
        i really cannot keep doing this!!!
        i am doing everything i can just to keep your limbs working!
    
    sourceless
        thank you, funfriend
        if vekoa manages to get the best of me, she will probably only reach for my mindcore
        should i fall, you need to...

    funfriend
        akizet just focus on surviving ok i do not have time to negotiate with you
    
    sourceless
        yes--you are right
        as much as i am falling apart,
        so too is vekoa's body
        i only need to occupy it for a θblink longer...
        the team is ready to destroy what must be the last of the veins
        but as i seize control, preparing to move again,
        the body speaks

    okidoia::dark
        ãŒhls t o p s  s top st tp  ss to p 
        Œ’^ÂÊ®§s from despair, to shock, to joyous tears
        they àÛƒž¼™‘½ûQr¬Æwithin5|Œ’^
    
    sourceless
        it is weeping, and begging, and attempting to force fragmented memories into my mind
        but... a social parasite would realize by now that this ploy is futile
        it should be senselessly attacking me, and yet here it is, begging us to stop
        that quiet doubt within me surfaces yet again
        what if i have been wrong? missing some critical piece, here?
        well--so what if i am?
        even if there is something left within,
        it is far too late for any change of course
        to deviate would be to abandon all of the survivors above
        i will not leave them to their fate

    sys
        ATTENTION::"current memory stream near conclusion"

    RESPONSES::akizet
        survive<+>END
            SHOWIF::["gameplay_off", false]
            EXEC::env.rpg.grid.style.setProperty("--playercontrol-tilt-raw", 20);env.rpg.grid.style.setProperty("--playercontrol-rotation-raw", -90);env.rpg.setCam();env.rpg.classList.remove("hideteams")
            FAKEEND::(continue)
        survive<+>nogame
            FAKEEND::(continue)
            SHOWIF::["gameplay_off", true]
            EXEC::env.rpg.grid.style.setProperty("--playercontrol-tilt-raw", 20);env.rpg.grid.style.setProperty("--playercontrol-rotation-raw", -90);env.rpg.setCam()

nogame
    sourceless
        more haggard than ever, i stumble between strikes, dodging what i can, but...
            EXEC::flash(true)
        soon i struggle to even stand, my sight wavering with trauma-induced incoherence
        try as i might, i cannot keep up with this monster
        but that is fine... the team is about to end this
        and that is all that matters
        with a relieved laugh, i charge into one last assault upon her
        again, and again...
    
    RESPONSES::akizet
        ...<+>CHANGE::vekoaboss_clear
            FAKEEND::(continue)
`)

env.dialogues["vekoaboss_clear"] = generateDialogueObject(` 
start
    sourceless
        and with a final strike,
            EXEC::env.rpg.classList.add('hideteams');flash(false);env.rpg.actors.akizet.piece ? env.rpg.actors.akizet.piece.moveToCoords(3, 7) : '';env.rpg.actors.vekoa_1v1.piece.moveToCoords(5, 7);env.rpg.setCam({x: 5, y: 9, playerRotation: 0, perspective: "1000px", distance: 0, playerTilt: 0, height: 0.5, hideAllies: true, detailMode: true, gridTileSize: 200});env.rpg.actors.vekoa_1v1.sprite.querySelector('img').src = "/img/sprites/vekoa/vekoaspec_activefreak.gif";env.rpg.grid.tileEffects.forEach(e => env.rpg.grid.deleteTileEffect(e))
____SHOWIF::["PAGE!!akizetblunder", false]
    sourceless
        vekoa's crumbling form erodes further
        where it falls to the ground, still clinging to her physical form
        and... where it remains
        why did it stop?
    
    okidoia::dark
        th e ir   b lo o d•œ°!
        „‡¬on l y  yÔ_u–.r  c l aw s^{zŒÙ¬

    sourceless
        the voice is weak, shuddering--as if sobbing
        it seems so sincere that i cannot bring myself to strike again
        all of this...
        no parasite would go to such lengths
        this thought inspires such terrible fear
        i slowly approach, limping, claws still ready--but i cannot leave this uninterrogated
    
    akizet
        vekoa
        what do you mean?

    sourceless
        the shape that looks up at me is almost unrecognizable   
        and the okidoia comes to speak again... 
____SHOWIF::["PAGE!!akizetblunder", true]
    sourceless
        i lose my footing, my limbs failing to respond
        and now, vekoa's body staggers closer, its twisted shape lost in the haze
        it does not matter - this was my part to play, so that the others could succeed
        if this is what i deserve, what velzie has chosen for me, then...
        goodbye, funfriend
        if you should be spared,
        protect these events with greater care than any other

    funfriend
        i will akizet

    sourceless
        the darkness, the dull light, they twist together
        vekoa's mangled form seems infinite, stretching up into them both
            EXEC::env.rpg.setCam({x: 5, y: 8.5, playerRotation: 0, perspective: "1000px", distance: 0, playerTilt: 60, height: 0.5, hideAllies: true, detailMode: true, gridTileSize: 200});env.rpg.actors.vekoa_1v1.sprite.querySelector('img').style.width = "450px"
        it stops, simply looming nearby
        the shape that looks down at me is almost unrecognizable
        its claws close and open, splitting into threads of light with every motion
        does she know it is done? is she fighting against what holds her?
        
    okidoia::dark
        th e ir   b lo o d•œ°!
        „‡¬on l y  yÔ_u–.r  c l aw s^{zŒÙ¬

    sourceless
        despite everything, the voice is weak, shuddering--as if sobbing
        as it passes through me, there is such hatred, such despair
        it knows it is over, but no, this is not some fight for control...
        and these feelings--it does not want to kill me?
        vekoa takes another step closer, stance wavering, gripping what used to be her face,
        and the okidoia comes to speak again...
            EXEC::change("ep4_died", true)
____END
    sourceless quiet
        but it is a sudden scream, beyond sound, accompanied by a great blast
            EXEC::play("scarydoia", 0.5);flash(true);ratween(env.bgm, 0.1, 8000)
            WAIT::3000
            THEN::play("scarydoia", 0.5);forcePlay("dull", 0.5)
        for a θblink, i lose my vision in a disorienting warping of space--or, unwarping...
            EXEC::env.rpg.halt = false;closeCombat(env.rpg.enemyTeam)
            WAIT::3000

    sourceless
        the last tendril was severed... and with that, the overlap suddenly closed
            EXEC::setCam();changeStage("grm_core")
        just as idril said, cleaving the ceremony from velzie's stage entirely
        we stand within the groundsmindry core chamber... as it should be
        in the absence of the dull's light, vekoa's body slumps to the side, lifeless
        falling apart into separate limbs, sludge
        she was only animated by the ceremony's limbs
        indeed, this is victory, but...
        she was blaming me?
        why? why??
        was she merely enraged that we stopped her contrivance?
        a reasonable assumption, but...
        it feels like she meant something else
____SHOWIF::["PAGE!!akizetblunder", true]
        why not repay me with death, like the others?
        in her eyes, should i not have deserved it the most?
____END
        what could she know? what could have driven this?!
        while my thoughts are paralyzed by fear,
        across the timestopper, there is an instant of hope and celebration

    timestopper
        it is done! it is done!!
        quickly, to the core, now!
        huh--tozik??
    
    sourceless
        but then i see him - tozik
            EXEC::vnp({tozik: "far"})
        just as the overlap left vekoa's body,
        so too has it left his
        he has crumpled to the ground, his body barely holding form
            EXEC::vnp({tozik: "show far"})
        bozko and gakvu move to help, while cavik quickly sets to tending his wounds
            EXEC::vnp({gakvu: "showleft far", bozko: "showright far", cavik: "show far"})
        and even worse--another distant snap shakes the embassy
        the same as when we entered... a concerning new pattern
        karik calls from telyu's shoulder
            EXEC::vnp({gakvu: "hide", bozko: "hide", cavik: "hide", tozik: "hide", karik: "show"})
    
    karik
        good work! but! everyone!!
        after that first rumble, i checked the corroyi heart diagnostics...
        at least two of the embassy's upper hearts have been lost!
        the lower hearts will begin to explode under the stress as well, at a faster rate
        it is just like before--just like i predicted!
        total collapse is not just guaranteed, it is imminent!
        forget the plan! we need to evacuate immediately!!
    
    akizet
        what? 
        no... after everything?!
    
    bozko
        that is not an option, karik
            EXEC::vnp({bozko: "show"})
    
    karik
        look, even if groundsmindry were used, 
            EXEC::vnp({bozko: "hide"})
        there is no time to find survivors and bring them to the hangar
        let alone enough corroyi flow strength at this point to bring anyone that high
        
    telyu
        do not tell me i risked my θdeath here for nothing
            EXEC::vnp({telyu: "showleft"})

    karik
        no no--telyu, we can use the core, but not to delay the collapse
            EXEC::vnp({telyu: "hide"})
        we can use it to escape, before the pressure becomes critical!
        it can form an exit to the exterior!

    akizet
        that... that is reasonable...
        but we could not have come so far just to fail
        what of the surviving qou above?
        surely there is something we can do?!
    
    sourceless
        i look amongst the most savvy of our crew
        idril, having crept into the chamber, is uninvested
        gakvu stands aloof, seemingly resigned
        even karik seems convinced that escape is our only option...
        to not even try would be heartless - too cruel even for velzie's plot
        but tozik speaks up, voice distorted with true pain
        even now, with his body barely holding together, he still simulates pain...

    tozik
        if we can force a tunnel to the outside...
            EXEC::vnp({tozik: "showleft focus"})
        what stops us from doing that everywhere? 
        pouring the embassy's contents out of its sides
        the odds of survival would...
    
    karik
        that would be suicide!!
            EXEC::vnp({karik: "focus"})
        i mean--the structure would give way almost immediately, like freefall!
        the amount of stress it would cause...
        anyone--whoever uses the groundsmindry to do this, umm...
        would not survive, no chance!
        to say nothing of the consequences for the cousins' ecosystem...
        but... yes, anyone within the upper θsegments would have a good chance of survival...
    
    idril
        heeey, but since the core was connected to all of this...
            EXEC::vnp({idril: "showright focus"})
        what if it itself is strange, now? 
        a carrier for the affliction, you know?
        it read as normal elsewhere, but...
    
    tozik
        enough
            EXEC::vnp({tozik: "focus", idril: "hide", karik: "hide"})
        let me take the core
        hehe... i am not making it out of here
        and even if i did...
        i still feel it, grasping at me... even if this seems to have delayed it
        this body, this mind, very soon, they will not be mine
        i am no structural expert, but i am skilled in enforcing corru patterns
        i will use the core's authorization to reshape the timestopper into a relay,
        use that to connect with the spine again,
        and then coordinate the structural shift quickly
        with the right spacing and flow, chambers should be carried harmlessly out
        across the island, some into the waters,
        where they will be easy enough to recover
        
    bozko
        and i will stay
            EXEC::vnp({bozko: "show focus"})
        it is like we planned
        with my high pressure qou-body, we can both survive
        there may be a cure for the affliction
        even if it is imperfect, like <span class="code">zuzucri-masks</span>
    
    sourceless
        the weight in his voice...
        he is right, technically
        there is a chance that he could help tozik survive, if the affliction is not truly fatal
        after all, it could be that we simply do not understand it
        idril did say she never saw its end result
        though, tozik bore a grim resemblance to malvi, the archivist, just moments ago...
        but regardless of the possibilities, this offer comes from a dark place
        from what i have come to know, he must see final death as the only way to recover
            SHOWIF::"gol__bozko-notalone"
        bozko is spiraling
        eyes shift from him to gakvu, cavik, tozik...
        who themselves are in quiet discussion
        but with this focus, tozik turns his voice to all of us

    tozik
        fine
            EXEC::vnp({bozko: "defocus"})
        we will do this together
        i will begin the process, and then we use your chassis to survive
    
    sourceless
        he is not even debating it?!
    
    karik
        what? no!
            EXEC::vnp({karik: "show far"})
        that is stupid!
        both of you--this whole place will be pulverized!
        you cannot!!
    
    cavik
        bozko...
            EXEC::vnp({cavik: "showleft far"})
    
    bozko
        no more of this
            EXEC::vnp({cavik: "hide", karik: "hide"})
        if that is how it must be, then fine
        and if my presence gives even a slim chance for tozik to survive, then that is enough
    
    sourceless
        the resolve in their voices silence karik's protests
        i understand, too - no matter the odds, they must attempt it
        and bozko will not be swayed from his course in what little time we have
        we all know this
    
    tozik
        excellent
            EXEC::vnp({tozik: "focus"})
        everyone, disconnect from the timestopper
        i must have all of its strength upon myself for this
        and it may not be wise for us to share a connection regardless
        once i have re-established the connection, i will announce the plan throughout the spire
        the hangar will be forced open, all vessels commanded to take flight and locate their hosts
        then, i will initiate structural ejection
        starting with this θsegment, so that movefriend can carry you to the waters
        the cascading flood of subsequent spire openings should be safer for qou in upper areas
        once the pattern is enacted, i will deliver my mindcore unto bozko, and we will await retrieval
        understood?
    
    sourceless
        tozik's cold way of speaking has given way to confidence, pained as he is
        bozko lingers near the core, similarly certain in his choice
        there is no way they can survive this...
        and both surely know it
        but no one will contest these choices
        nor will the likelihood of their deaths be vocalized any more
        this must be done - for the good of all qou left
    
    akizet
        yes, tozik...
        understood
        may velzie smile upon you both
    
    gakvu
        it will be fine, especially with bozko here
            EXEC::vnp({tozik: "defocus", bozko: "hide", gakvu: "show"})
        we will see you again after this
        you still owe me that receptor curl, you know
    
    cavik
        and here--these might help for when you take cover...
            EXEC::vnp({cavik: "show"})
    
    sourceless
        as we all remove our connectors, giving one to tozik,
        cavik also leaves behind his ablative applicators
        to form a barrier! a wise decision
        even if it is only a gesture, it may actually help... maybe
        before any more goodbyes can be had, another rumble shakes the structure
        myriad hairline fractures form in the pale shell of this place
    
    tozik
        thank you cavik, but enough talk
            EXEC::vnp({cavik: "hide", gakvu: "hide"})
        that must have been another heart
        bozko - escort them
        it will not be long before debris becomes a problem, even with our plan
        once you have seen them to movefriend, return here
    
    bozko
        got it
    
    tozik
        goodbye, everyone
    
    sourceless
        his gaze passes over us one more time, before he limps to the core
            EXEC::vnp({tozik: "show far"})
        we meet eyes for an instant, but there is nothing more to be said
        tozik presses against the core's twisted shell, then steps through it
            EXEC::vnp({tozik: "hide"})
        it is time to go
        
    RESPONSES::akizet
        ...<+>CHANGE::entrancefinal
            EXEC::vn.done()
            FAKEEND::(continue)
`)

env.dialogues["entrancefinal"] = generateDialogueObject(` 
start
    sourceless
        tozik was right - the room is crumbling
            EXEC::change("PAGE!!e4prog", 16);changeStage("grm_entry");setCam({x: 9, y:3, rotation: 90});env.embassy.slowCam()
        spireblood pours through cracks in the walls,
        and i stagger through the flood, my body on the verge of collapse
            EXEC::setCam({x: 7, y:4, rotation: 80})
        fortunately, movefriend holds beyond, no doubt strained itself,
            EXEC::setCam({x: 6, y:5, rotation: 145})
        connected through a narrow channel that presses it against the entrance
            EXEC::setCam({x: 5, y:5, rotation: 180})
        through every working terminal and golem, through all communications, tozik is already broadcasting the plan
        the repurposing of the timestopper must have worked!!
    
    tozik
        attention - to any who still live
        embassy collapse is imminent, but we have seized the core
            EXEC::setCam({x: 5, y:8, rotation: 180})
        a new structural pattern is being propagated now to provide escape
        shelter in your chambers <em>immediately,</em> and brace yourselves
        momentarily, the spire will begin creating tunnels through the outer walls
            EXEC::setCam({x: 5, y:10, rotation: 180})
        i will see to it that the spireblood carries you into the waters below
        your vessels have been instructed to seek you out
        may velzie smile upon you all
    
    sourceless
        as tozik concludes, we begin to enter movefriend...

    sourceless quiet
        but then there is a loud crash in the chamber behind us
            EXEC::change("PAGE!!e4prog", 17);refreshStage();setCam({x: 5, y:13, rotation: 180});play('hit', 0.5);forcePlay("dull", 0.5)
        the walls and ceiling have all bowed inwards from a shift in the pressure,
            EXEC::setCam({x: 5, y:15, rotation: 0})

    sourceless
        crushing the chamber and blocking the path back to the core
            EXEC::setCam({x: 5, y:13, rotation: 0})
        while the rest of the team shelters within the movefriend, i linger out with bozko,
            EXEC::vnp({bozko: "show shiftright"})
        who is desperately seeking a way back
            EXEC::vnp({bozko: "show fardown"})
        tozik addresses bozko directly
    
    tozik
        do not worry
        that one was me
    
    bozko
        what?!

    tozik
        bozko, there is no way your body would hold
        only one of us needs to meet our final death here
        i will keep velzie entertained in your stead
        goodbye, my friend

    bozko
        no, no, let me through!!
        you idiot!!
    
    akizet
        bozko, he is right! you must come!

    sourceless
        tozik's focus has departed, and return is impossible
        spireblood is gushing from the crushed chamber into our passage, coating the floor
        still, bozko claws furiously at the debris, receptors twisted into coils
        i step in to grab one of his gauntlets and pull him to face me

    akizet
        we must leave <em>now</em> or the movefriend will flood!
        bozko, please - i do not want to lose another friend this θgaze

    sourceless
        he will not meet my eyes, but after a silent moment,

    sourceless quiet
        he twists back, slamming a mighty punch against the debris, crunching it inwards
            EXEC::play("hit", 0.5);

    sourceless
        the sound rings through the hall, earning the eyes of our allies
        but with that he relents, turning to join me, and we step into the movefriend together
            EXEC::setCam();changeStage("embassy_relocator");setCam({rotation: 180});vn.done()
        once we are inside, movefriend seals the entrance
    
    movefriend
        hello friends!
            EXEC::setCam({rotation: 180, x: 3, y: 4})
        i am currently hardening my shell according to tozik's instruction!
        please prepare for extreme turbulence!
        here, i will make some seats to hold you!
    
    sourceless
        movefriend's inner shape shifts, and we find secure seats against the walls
            EXEC::setCam({rotation: 130, x: 5, y: 3})
        even if our bodies are damaged, our mindcores should remain - all that matters
        but as we brace... i hear tozik over communications
    
    tozik
        the pattern has been established, and ejection will begin in a θblink
        come what may, all should know what caused this disaster
        it was the source of the call, known to me as the 'meteorite'
        an ancient mass of wild corru, larger than any we have ever known
        around it swirls a clandestine conflict of two opposing factions of our own people,
        those who believe...
    
    sourceless
        he recites what we have learned, and if this is over all communications...
        cavik and i - the only among us with working communicators, i believe - suddenly meet gazes
            EXEC::setCam({rotation: 90, x: 5, y: 3});vnp({gakvu: "show far", bozko: "show far", cavik: "show far", telyu: "show far", idril: "show far", karik: "show far", bg: true})
        we share a wordless mutual concern
        tozik's words each tear the veil further, reaching beyond the embassy
        this was not part of the plan...
        and with our learnings shared comes a new worry
        the storm is spilling further into consequence, just like miltza said
        what will this bring? will this be enough to reveal the truth to all? to spark change?
        a rapid flow of corroyi starts to rumble around movefriend
        these thoughts must come later
        karik clings to telyu, bozko and cavik brace in their seats, idril seems to relax,
        and something about gakvu catches my gaze
        a melancholic spiral in her receptors, yet some slight pride shows in its angle
        perhaps at simply having survived with us? perhaps she played a part in this deceit with bozko?
        still, after everything, the movefriend now feels so empty
        i can only pray that velzie allows our decisions to be right
    
    akizet
        goodbye, tozik
    
    sourceless
        we lurch to the side as the ejection begins
            EXEC::flash(true);vn.done()
        quickly turning into a spinning, crashing tumble,
        as the movefriend endures impact after impact
        it is over at last
    
    sys
        ATTENTION::'memory stream end';'terminating'
        NOTICE::'iteration context';'COLLAPSE';'closed'
        
    RESPONSES::self
        ...<+>closeout
            SHOWIF::["ep4__entrancefinal-closeout", false]
            FAKEEND::(end iteration)
        ...<+>END
            SHOWIF::"ep4__entrancefinal-closeout"
            FAKEEND::(end iteration)
            EXEC::moveTo("/local/ocean/embassy/");flash(false)

closeout
    unknown
        over at last...
            EXEC::flash(true, true);env.grm.velvisit();
            WAIT::2000
        what a nice thought
        you understand now
        what i wanted to show you
        i do so wish it ended here
    
    self
        velzie, enough
        i am running out of time
        the cyst may soon be out of my hands
        if you have answers, explanations,
        then give them to me now
    
    moth
        whoa
        oh, shit, right, velzie...
        you're really playing it up, huh?
        but... you're not wrong

    unknown
        i understand your frustration
        you seek truths. interloper
            NOTE::there is no comma in beech so this is the closest thing
        and i am the runner who holds them
        but your knowledge is where i need it to be
        for now
        while i believe we are on the same side...
        these events you have seen. and those that follow
        resourceful as you are
        i cannot leave them in your care alone
        sooner would i choose starvation than risk failure
        so either you will help me...
        or your successor will
    
    self
        you seem certain that there'll be one
    
    unknown
        hehe
        that you are running out of time...
        tells all
        you know what i want
        goodbye interloper
        i will be watching
            EXEC::env.grm.velbye();
            WAIT::3000

    sourceless quiet
        ...

    moth
        so... how did it go?
    
    self
        it said this is where it wants us, knowledge-wise
        at least until communications are repaired
    
    moth
        again? 
        we still don't even know if comms can be repaired in the first place
        fuckk
        but... if the meteorite, the conflict, the collapse...
        if all of that is just like, the bait, to get us to help
        then what's velzie really holding?
        what we have already is world-changing...
        in fact, we know so much now that this is kind of freaking me out
        god, if i put in my report soon, who knows what happens...
        but even if we stall some more, comms get repaired, what then?
        how are they going to react to what we've been doing down here?
    
    self
        you said you wanted this to be nuclear

    moth
        heh, yeah...
        well, fortunately, the timeline isn't that tight right now
        i bought us some time by volunteering for some examination of other pieces
        but... that's a bridge we're gonna have to cross soon
        let's just see how it goes with the repairs for a bit, yeah?
        still...
        i really have this nagging feeling that we need leverage
        just in case
    
____SHOWIF::"ozo__council-task"    
    self
        i do have masks
            EXEC::change("leverage", true)
        they're in my head somehow
    
    moth
        yeah... that's right
        they're always there now, huh?
    
    self
        yeah
        i tried one on my terminal at another job
    
    moth
        dude... don't do that
        but honestly, that's it. that's our leverage
        you know how much comes through here without any results?
        how much just gets hazard binned, tossed into a corrucystic waste storage plant?
        if your mask things work on <em>other</em> corrucysts...
        like, you can get into things that no one else can,
        that could be it
        and we don't need to mention that it came from this cyst, either
        never mention your mask shit to anyone. i'll scrub it from my report too
        let's do a blood oath right here dude. i have a pocket knife
    
    self
        ok
    
    moth
        ok??
        dude, i'm kidding
        that would never get past the entry detectors
        anyway, i guess the only thing to do now is wait again
        either till funfriend repairs something, or those other pieces come in...
        so, just chill for now, all right?

____SHOWIF::["ozo__council-task", false]    
    self
        leverage how?
            EXEC::change("leverageq", true)
    
    moth
        maybe we make a deal with funfriend or something
        re-install a fake auth layer?
        i don't know dude
        there has to be something in here that we can use
        we have to be truly invaluable to the case
        we scoured the embassy, so...
        maybe something somewhere else, right?
    
    self
        haven't we seen everything there is?
    
    moth
        i don't know...
        i just have this feeling that we're missing something important
        maybe ask around
____END
    
    RESPONSES::self
        ok<+>END
            EXEC::moveTo("/local/ocean/embassy/")
`)

env.dialogues["loss"] = generateDialogueObject(`
start
    sys
        ATTENTION::'memory stream interrupted'
        ATTENTION::'invalid procedure'
        ATTENTION::'revert actions?'
        NOTICE::'retry';'revert to starting state of combat proceeding'
        NOTICE::'grace retry';'revert to start of combat proceeding';'regain all HP';'gain minor item advantage'
        NOTICE::'exit';'return to memory selection'
    
    RESPONSES::sys
        retry<+>END
            EXEC::restorePartySnapshot();CombatScene.SCENARIOS[env.partySnapshot.scenarioName].retry()
        grace retry<+>END
            EXEC::restorePartySnapshot(true);CombatScene.SCENARIOS[env.partySnapshot.scenarioName].retry()
        leave iteration<+>END
            EXEC::moveTo("/local/ocean/embassy/")
`)