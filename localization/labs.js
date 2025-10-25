/*
    cor-RU - a russian localization mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/labs.js
    localization for /local/uncosm/pit

    progress: nothin (figure out beskletters) as of 06.10.2025
*/

env.localization.page['pit'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "this place reads so weird. it's totally broken apart, but i'm still picking up this really focused oppressive gloom over it": "",
        
        "::CONNECTION_COHERENCY_REDUCTION::'instability detected'": "",
        "::CONNECTION_COHERENCY_REDUCTION::'critical instability detected'": "",
        "::CONNECTION_DISRUPTION::'retracing';'last coherent position'": "",
        "'severe data overload'": "'значительная перегрузка данных'",
        "::'closest coherent position updated'": "",


        "something is coming.": "",
        "something's attention sweeps the area for movement.": "",
        "the attention recedes.": "",

        

        "…wïT„]storm greets meolÌfB2.Âæ2½•Î:89new hybridizationË‚Dˆ/š…": "",
        "3ÖDcÍt works behind meµ\"����pD¹”somehow not privy to my own work¶ZkZ·…": "",
        "…k˜í’Ücheering and clappingu�š�¼ZÌ�llmàcelebration is short lived as #[½implicationmC¢)settlesÇ»": "",
        "Ðž@DJ=h–z=ever watch football?­�ìÕ�ˆE ŽÕdead metal writhes, infested with the storm'slÝîe£õ": "",
        "…X›[�ka simple confusione}o#[simple accidentD6'and now cavik¼": "",
        "w¬0²you are scaring meå‘À0ìTè89stopË‚D¥È…": "",
        "…G$C¡ÔæLgÌˆ9Ë‰IT IS ME‘2f «½¯½WITH ALL THAT ENTAILS=ÐƒÛÎ^/¾1": "",
        "…Öl«breach of access×¤„0�¸£–È}Sorry, Akizet. I thoughtØ½ëîso similar¶}": "",
        "…ÁÀ�ð…Íãswirling endlesslyã�šqÖïìstress manifests as wind tearing at my mind;ÂºG €�üÔÖ…": "",
        "…HQWHl'blueprints' as the cousins say\"œ÷- ™5A]Á¨„capable of sustaining the depth's pressure:ÑÑ�¸Ó5¨x˜": "",
        "Q÷°Ýlpreparations commenced7ìN{Ç½ßÝ·ÌRÞ…soon all will be knownÍãsw…": "",
        "…€âX²åweeksãÉGregular sessions with gakvu and tozik8J1)‘Roccupy attention for a whileå…": "",
        "…æŒ/(wait for me±ÖÝ›n�ædo not do not do not“w": "",
        "¡ÔæLgÌˆ9Ëagree uneasily‰IT ‘2f H„how about a drink�Iž�¯x›æ«½¯…": "",
        "Ó}�®uncharacteristicïž�ö&worry in the director's eyes‚±�ŒL”Ûã…": "",



        "ækiZ¥Ét": cor_ru.entity_menu['ækiZ¥Ét'].name,
        "akizet": 'акизет',
        "keycard": "", // --- назвать пропускным...
            "my 'keycard', found again! very good": "",
            "i will not have to ask for another... again...": "",
            "this should grant me entry to my region": "",

            "ah. i have forgotten my 'keycard' in the other chamber again": "",
            "the cousins hold so many secrets, so many locked doors": "",
            "but i suppose we are balanced in this way": "",
            "yes, it should be around here still": "",

    }, 
    entityDescriptions: {
        "ækiZ¥Ét": cor_ru.entity_menu['ækiZ¥Ét'].desc,
        "keycard": `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection','experiential bridge'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'thin identifying sheet';'contains some strange magnetism';'a fascinating technology'</span>`,
        
    }
}

// === DIALOGUES === //


// == MOTH == //

env.localization.page['pit'].dialogues.mthresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        oppressive impulse?<+>impulse
        roaming entities?<+>ravenous
            SHOWIF::"pit__beastintro"

        nevermind<+>CHANGE::++moth
            FAKEEND::(back)
`)
env.localization.page['pit'].dialogues[`mth++pit`] = generateDialogueObject(`
loop
    RESPOBJ::mthresp

start
    self
        question about this space

    moth
        what's up?
    
    RESPOBJ::mthresp

impulse
    self
        what do you mean by 'oppressive gloom'?

    moth
        okay, well, to preface, there's this emotional analysis component we've got
        gives me a decent surface level impression of the emotional vibe of a memory
        it's like a list of percentages assigned to standard codes for a huge array of emotions
        usually it doesn't give any useful info we don't already get from the actual content of the memory, so i tend not to watch it too closely
        it's a gamble with corrucystic stuff especially
        i just don't think i've ever seen it so clear before...
        this whole place gives off a weird mix of sadness and violent anger
        you're the one connected, you don't feel it?
        
    self
        i can kind of hear it i guess

____SHOWIF::["pit__f1", false]
    moth
        weird
        whatever it is, 
        i really don't think it's coming from the broken up memory bits here
        it's too coherently read when everything else is all chewed apart
        not sure what to make of that yet

____SHOWIF::["pit__f1", true]
    moth
        weird
        still, that akizet thoughtform probably has something to do with it
        maybe it's like some sort of warding mechanism she set up to scare off scavengers
____END
    
    RESPONSES::self
        i see<+>loop
            FAKEEND::(back)

ravenous
    self
        what can you tell about the entities here?
        the thoughtforms moving around
        trying to bite me or something
        can't really tell what they're supposed to be

    moth
        it's about as bad as it looks lmao
        they're so fucked up it's hard to really make sense of them on my end too
        we're basically looking into an ecosystem nobody has ever seen before
        these are some really unique adaptations
        like, the first type you saw, the ones that fake coherence
        they have just random bits of memory looped into themselves
        probably to lure other things closer to 'catch' them

____SHOWIF::"spida"
    self
        what about the big one
        hangs around some sort of infested area
        only went after me when i went into it
        
    moth
        oh yeah, i wanted to mention that!!
        so after you made that first one angry, i looked over some of the data...
        and based on the movement i could detect,
        it seems like what you stepped on <em>was</em> the thoughtform
        or, like, some part of it stretched out over a segment of the thoughtspace
        i could tell because the whole thing vibrated
        and the shape that was reaching for you was like a pseudopodium
        feeling around for the disturbance, trying to grab you
        fascinating stuff


____SHOWIF::"thelooker"
    self
        there was one that looked like a coat or something
        it only moves when i'm not looking

    moth
        those ones are actually super easy for me to pick up
        probably some sort of luring technique to predate on whatever the predators are down here
        interestingly there's no inherited context or any knowledge inside them
        i can tell by how small they are
        they're really just like little animals

____END
    
    RESPONSES::self
        all right<+>loop
            FAKEEND::(back)
`)


// == INTROS == //

env.localization.page['pit'].dialogues["intro"] = generateDialogueObject(`
start
    sourceless
        you feel moth tap at the table, drawing your attention.

    moth
        hey, what did you just do?
    
    self
        there was something new in the cache
        it just brought me to this dark place

    moth
        interesting...
____SHOWIF::"++mothbeneath"
        this is kinda like those other broken up places you've been
        but... worse
____END
        it's pretty much just noise on my end,
        but the pieces that i can make out are all pretty cohesive
        i'm pretty sure this was one memory once
        it's just been completely torn apart
        or "chewed apart" might be more appropriate
        anyway, the fact i can make anything out is good news
        there's probably some info we can squeeze out of it
        get to looking buddy

    RESPONSES::self
        ok<+>END
`)
env.localization.page['pit'].dialogues["introdescent"] = generateDialogueObject(`
start
    moth
        ok.
        so that was really strange
____SHOWIF::"++mothbeneath"
        this is kinda like those other broken up places you've been
        but... worse
____END

    self
        yeah
        how is this the closest coherent position?

    moth
        uh, i'm still trying to figure that out
        looks like this is way deeper in the cyst
        a few things in my logs suggest there was some sort of connection between the city and here at some point
        i guess there was enough of a trail for your spike to work off of...
        anyway, this place is pretty much just noise on my end
        but the pieces that i can make out are all pretty cohesive
        i'm pretty sure this was one memory once
        it's just been completely torn apart
        or "chewed apart" might be more appropriate
        anyway, the fact that i can make anything out is good news
        there's probably some info we can squeeze out of it
        get to looking buddy

    RESPONSES::self
        ok<+>END
`)
env.localization.page['pit'].dialogues["introdrowning"] = generateDialogueObject(`
start
    moth
        ok.
        so that was really strange
        it still kinda reads like you're in that in-between space
        but it's... way noisier, way worse

    self
        did i go through that door?
    
    moth
        doesn't look like it?
        i mean it's hard for me to tell in the first place
        but this reads more like you entered a new thoughtspace entirely

    self
        yeah
        how is this the closest coherent position?

    moth
        uh, i'm still trying to figure that out
        looks like this is way deeper in the cyst
        a few things in my logs suggest there was some sort of connection between the city and here at some point
        i guess there was enough of a trail for your spike to work off of...
        anyway, this place is pretty much just noise on my end
        but the pieces that i can make out are all pretty cohesive
        i'm pretty sure this was one memory once
        it's just been completely torn apart
        or "chewed apart" might be more appropriate
        anyway, the fact i can make anything out is good news
        there's probably some info we can squeeze out of it
        get to looking buddy

    RESPONSES::self
        ok<+>END
`)
env.localization.page['pit'].dialogues["altintro"] = generateDialogueObject(`
start
    moth
        oh, here again?
        ok, it's in the uncosm, from a hole in the cache... 
        that kind of supports my theory that it was a direct part of a memory once
        pretty obvious with all the fbx stuff, but,
        it's like there's this big gap that was left by it getting pulled down here

    RESPONSES::self
        ok<+>END
`)
env.localization.page['pit'].dialogues["altdescent"] = generateDialogueObject(`
start
    moth
        ok, that was kind of concerning
        but there's no damage that wasn't already there,
        and your spike was totally fine, so...
        i guess you just kinda fell out, huh?

____SHOWIF::["pit__introdrowning", false]
    self
        felt that way
        how is this the closest coherent position?

    moth
        a few things in my logs suggest there was some sort of connection between the city and here at some point
        probably even a direct part of it, or maybe contained by it. idk
        pretty obvious with all the fbx stuff anyway
        based off how you got here earlier, it makes sense 
        through a pit in the cache, leading down into the uncosm...
        it's like there's this big tunnel that was left by it getting pulled down here
        wish there was an easier way to get down here lol that sucks

____SHOWIF::["pit__introdrowning", true]
    self
        again
        same as falling from that kazki room
        a little worse actually
    
    moth
        i'm surprised something like it didn't happen sooner tbh
        we're working in some real torn up places
____END

    RESPONSES::self
        yeah<+>END
`)
env.localization.page['pit'].dialogues["altdrowning"] = generateDialogueObject(`
start
    moth
        ok, that was kind of concerning
        but your spike was totally fine, so...
        i guess you just fell, huh?
        it still kinda reads like you're in that in-between space

    self
        did i go through that door?
    
    moth
        doesn't look like it?
        i mean it's hard for me to tell in the first place
        but this reads more like you entered a new thoughtspace entirely

____SHOWIF::["pit__introdescent", false]
    self
        felt that way
        how is this the closest coherent position?

    moth
        a few things in my logs suggest there was some sort of connection between the city and here at some point
        probably even a direct part of it, or maybe contained by it. idk
        pretty obvious with all the fbx stuff anyway
        based off how you got here earlier, it makes sense 
        through a pit in the cache, leading down into the uncosm...
        it's like there's this big tunnel that was left by it getting pulled down here
        wish there was an easier way to get down here lol that sucks
____END

    RESPONSES::self
        yeah<+>END
`)
env.localization.page['pit'].dialogues["nofreedom"] = generateDialogueObject(`
start
    sourceless
        a realization strikes you as you try to move forward.

    self
        i don't think there's any way to get through here

    moth
        what do you mean?

    self
        it's spatial but nothing is lining up right
        can we do anything about that?

    moth
        i don't think so, not directly...
        this is somewhere in the uncosm, so it's out of funfriend's range, i think
        maybe come back here later?

    RESPONSES::self
        ok<+>END
`)
env.localization.page['pit'].dialogues["beastintro"] = generateDialogueObject(`
start
    sourceless
        your mind's eye is wrenched to the nearby thoughtform.
            EXEC::setCam({x: 21, y: 11, rotation: -90})
    
    beast
        ›YëRÌ€…c5¹grasping the…¤ù#îI†…external source…¬¬
        ÅÊ€·žgú…three weeks…6¥¶¢dëhow many θgazes is that»“Ìˆö¤ù#

    self
        what? hello?
        how did you do that?
        
    sourceless
        strangely, you don't feel the thoughtform's attention.
        yet you feel more of it brushing against your mind, prodding.
            EXEC::setCam({x: 21.5, y: 11, rotation: -90})

    beast
        0MÀ¾Þ¼Pf2smiles nervously at mekÜÀ@-‘readings normal…
        ö52+nIdeep sea worthyÕÛÂ–9ÏÙÞSfor whenV×Ú¬Ž¹
        –=%outside observer<£4¦&Ml»™new to the project? how many˜ñnX³

    sourceless
        there is no curiosity in it, only mechanical reflex.
        the mindspike's connection strains.
        the nonsense is slowly becoming overwhelming.
        there's just enough coherence to keep you stuck here.

    moth
        what are you talking to?
        
    self
        some kind of damaged thoughtform
        it just pulled me into this somehow
        i think it's getting worse

    beast
        ‰r«÷inside without other the good for how in*@$–‰when i p arking the lot is it+)“¶°æÌÌÛè&
        SÈÀ°S±F6öÖ¬m'lobster'SÍfÕEù–¢…å®2Ýê»õ4—[where does it end? i wonder if the storm has a limit to itsÂq0àê

    moth
        looks like a really damaged memory stream, to me...
        that's weird, it almost looks like it never ends, either
        shit, actually, there's like dozens of them, moving around this whole area
        i don't know what's going on here
        but they all have the same weird self-looping format, so i'm going to instate a block
        we can take it off later

    sys
        NOTICE::'stream ignore pattern updated'
    
    sourceless
        you find yourself able to pull away from the thoughtform.
            EXEC::setCam()
        something about it is still grasping at you, but it's stuck, just out of reach.

    moth
        ...the thing is, even attempted streams still run through your connection
        this is only ignored on a software level
        so too much at once will cause an overload, blocked or not
        that's how that velzie thing kicked you out once
        try not to get too close to these things
        do you think there's anything worth it here?
        it just looks like a bunch of incoherence to me

    self
        there's something big here
        i don't know what it is
        but i can see it
    
    moth
        all right, just be careful
        if it's anything like these little ones,
        it might be able to cause some equipment damage

    RESPONSES::self
        got it<+>END
`)


// == WAKIZET == //

env.localization.page['pit'].dialogues["meet"] = generateDialogueObject(`
start
    sourceless quiet
        a spike of noise pierces through your connection.
            EXEC::flash(true);play("criticalError", 0.5);env.ravenous.addDamageOverlay();toggleBgm(env.ravenous.waki)
        not enough to overload, but enough to hurt.
            EXEC::env.noVoiceStop = true

    sys
        WARNING::'abnormal thoughtspace activity detected'
            SILENT::
            EXEC::playerMoveTo(19, 46, "up")

    sourceless quiet
        it feels like you can't move.
            EXEC::flash(true)
        it's only a feeling.

    moth
        woah, buddy?
    
    self
        don't eject
        something's here
    
    moth
        seriously?
        all right, but i'm hovering over the button
    
    sourceless quiet
        claws pierce your flesh, strangling air from your lungs.
            EXEC::play("scarydoia", 0.2);vfx({type: "darkflash", state: true});playerMoveTo(19, 50, "up")
        a memory repeatedly bashed over your mind.
            EXEC::play("scarydoia", 0.2);env.ravenous.addDamageOverlay()
        the furious attention of a thoughtform surrounds you.
            EXEC::play("scarydoia", 0.2);setCam({offsetCamera: "rotateX(25deg)"})
        it bleeds in from every angle, from points beyond your perception.
            EXEC::play("scarydoia", 0.2)
        it's intentional, intelligent. it's something that wants you gone.

    self
        stop
        i'm here to help
        the cyst is-
            AUTOADVANCE::
            WAIT::2000

    wakizet
        deception
            EXEC::vfx({type: "darkflash", state: false})
        perish
            EXEC::env.noVoiceStop = false

    sourceless quiet
        the sensation intensifies, agonizing, even if entirely imagined.
            EXEC::play("scarydoia", 0.2)
        after a threshold, something pulls at your mind's eye.
            EXEC::play("scarydoia", 0.2);vfx({type: "darkflash", state: true});env.noVoiceStop = true
    
    sys
        ALERT::"recollection locus located";"attempting stream alignment"
            EXEC::setCam({x: 19, y: 51, rotation: 0, offsetCamera: "rotateX(-25deg)", height: 4, distance: 0})

    sourceless quiet
        new thoughts flood through your connection, your vision shifting.
            EXEC::env.ravenous.addDamageOverlay();env.ravenous.addDamageOverlay();vfx({type: "darkflash", state: false})
        
    wakeless
        ...vanished, my teeth passing through the indistinct shape to no effect
            EXEC::content.classList.add("slowcam");env.noVoiceStop = false
        such a meager thing should have been reduced to viscera, like all those before
            EXEC::setCam({x: 19, y: 51, rotation: 30, offsetCamera: "rotateX(-25deg)", height: 4, distance: 0})
        how could it have slipped free? 
        the subject of my hunger is gone, leaving me in an enraged search
            EXEC::setCam({x: 19, y: 51, rotation: -30, offsetCamera: "rotateX(-25deg)", height: 4, distance: 0})
        i still feel it here, somewhere...
        an alien presence brushes over my mind--is it within?!
        somewhere above, or beneath, impossible to place
        the beasts from the darkness could never have gained such an adaptation
        what is happening??

    self
        interloper

    sourceless
        your thought is delivered with a grimace.
        the space falls silent, your mind reeling.

    self
        i'm an interloper
        connected to the cyst
        repairing it

    wakeless
        a voice comes from within, coiling around my thoughts like a parasite
            EXEC::setCam({x: 19, y: 50, rotation: 0, offsetCamera: "rotateX(10deg)", height: 4, distance: 0})
        you think you can abuse such ancient hopes, now?
        insidious, disrespectful thing

    self
        i'm telling the truth
        i really am here to help
        just listen

    wakeless
        no more will i suffer you
        your flesh is beyond my reach

    wakeless quiet
        but with a writhing leap through the space's horizon,
            EXEC::play("criticalError", 0.5);setCam({x: 19, y: 49, rotation: 600, offsetCamera: "rotateX(-70deg)", height: 10, distance: 50})
            WAIT::2000
            THEN::vfx({type: "darkflash", state: true})
        i feel the wild teeth of the dark tear at your grasp

    sourceless quiet
        a sharp pain splits through your head. your vision is static.
            EXEC::play("scarydoia", 0.2);env.noVoiceStop = true

    wakeless
        your grip loosens, and soon it c
            AUTOADVANCE::
            WAIT::2000
    
    sys
        ALERT::"recollection locus lost"
        WARNING::'abnormal thoughtspace activity detected';'focal position disrupted'
        ERROR::'invalid render';'locating closest coherent position'
            EXEC::env.noVoiceStop = false

    RESPONSES::self
        what<+>CHANGE::fall
            EXEC::content.classList.remove("slowcam");toggleBgm(page.bgm)
`)
env.localization.page['pit'].dialogues["fall"] = generateDialogueObject(`
start
    sys
        NOTICE::'coherency relocation complete'
            EXEC::content.querySelector('#damage').remove();env.ravenous.damage = 0;changeStage("pit_outer", false, false, {noFlash: "true"});
            WAIT::500
            THEN::vfx({type: "darkflash", state: false});setCam()

    moth
        what the hell was that?
            EXEC::env.ravenous.savePos()
        recollection locus??

    self
        an akizet thoughtform
        i think

    moth
        yeah, i see what you mean...
        the logs bring it pretty close to other akizet signatures
        it's way different, but not totally incoherent
        at least not in the way the other stuff here is

    self
        i just need to talk to it again

    moth
        you think it'll go down any different?

    self
        the thoughts felt angry
        a little afraid
        but there was some hope too
        i think i can reason with it

    moth
        right, it's worth a shot if you can find it again
        but, new problem
        you remember how when you entered, it said something about a 'coherent location attempt'?
        your spike found that first memory fragment and treated it as the entry point
        like, that's how it would have entered the space again if you had left
        looks like it was just updated to see <em>this spot</em> as the entry point
        i think it's just grabbing at whatever it can
        is it even the same thoughtspace?
    
    self
        i still see that big thing i mentioned
        it's just farther away

    moth
        huh, okay
        makes sense tbh
        this spot is a little more readable, and i can get a decent scan of the area now
        it's got, like, islands of coherency... broken up bits of memory
        a big field of them around something i can't really make out
        probably that big thing you're seeing
        anyway, keep going
        an intact, lucid akizet could be a valuable resource
        and just in case, if you see any more coherent islands, 
        go to them so your spike can track them
        just in case it hits one of those retracing thresholds
        i haven't detected any activity from those coherent areas since you arrived either
        so maybe they're safe?

    RESPONSES::self
        ok<+>END
`)
env.localization.page['pit'].dialogues["f1"] = generateDialogueObject(`
start
    sourceless quiet
        an overwhelming attention presses upon you.
            EXEC::env.noVoiceStop = true;vfx({type: "darkflash", state: true});play("criticalError", 0.5);env.ravenous.addDamageOverlay();toggleBgm(env.ravenous.waki)
        the memory lurches, distant visions of teeth and claws sparking in your mind's eye, surrounding you.
            EXEC::playerMoveTo(19, 51, "up")
        but they disappear quickly, pulled away by the thoughtform's revulsion.
            EXEC::vfx({type: "darkflash", state: false});setCam({height: 2.5, offsetCamera: "rotateX(20deg)"})

    wakizet
        you, again?
            EXEC::env.stage.plane.style.setProperty("--perspective", "1500px");env.ravenous.addDamageOverlay()
        insidious thing
        your infestation will not work a second time

    self
        that's fine
        will you let me just speak to you

    sourceless
        the thoughtform's attention is sharp upon your mind.
            EXEC::env.stage.plane.style.setProperty("--perspective", "500px");
    
    self
        we found the cyst in the ocean, in a wrecked vessel
        funfriend and i have been repairing it
        we're just trying to put all the pieces back together
            EXEC::env.noVoiceStop = false;
    
    sourceless
        its undercurrent of rage grows weaker.
        you feel the looming tendrils beneath your perception curl away.
    
    self
        so i'm just curious
        what happened here?

    sourceless
        a bitter chill bleeds through your connection.
        imagined color and sound disappears.
        the thoughtform writhes with despair.

    wakizet
        what happened...?

    wakizet::loud
        a war«©á"<A war a WAR!!
            EXEC::content.classList.add('damagehit');env.stage.plane.style.setProperty("--perspective", "300px")
            WAIT::300
            THEN::content.classList.remove('damagehit');env.ravenous.addDamageOverlay()
    
    wakizet
        i awoke to their teeth
        to the familiar sight of all my friends joyously celebrating 
        as terrible shapes tore at the very memory of them
        and... and i... i had to...

    sourceless quiet
        the despair turns to skepticism.
        an ocean of eyes considers you from every angle.

    wakizet
        no... 
            EXEC::env.stage.plane.style.setProperty("--perspective", "1500px");
        you, some instrument of deception, another mutation in this terrible pit
        you seek to fester in my wounds

    self
        no, listen, i can help
        but i need to know what's going on first
    
    wakizet::loud
        SILENCE
            EXEC::content.classList.add('damagehit');env.stage.plane.style.setProperty("--perspective", "200px")
            WAIT::300
            THEN::content.classList.remove('damagehit');env.ravenous.addDamageOverlay()
    
    sourceless quiet
        the thoughtform rages, imperceptible teeth biting into your presence reflexively.
            EXEC::play("criticalError", 0.5);env.stage.plane.style.setProperty("--perspective", "100px")
            WAIT::300
            THEN::vfx({type: "darkflash", state: true});env.noVoiceStop = true
    
    sys quiet
        ALERT::"recollection locus located";"attempting stream alignment"

    wakeless quiet
        á›;+¼öèR¤y~ô±{^}ð
            EXEC::setCam({x:19, y:51, height: 2.5, offsetCamera: "rotateX(-20deg)", rotation: 0, distance: 0});env.ravenous.addDamageOverlay();env.noSfx = false
        i roil in the dark with rage, displacing fragments of a city long picked over
            EXEC::vfx({type:"darkflash", state: false});content.classList.add("slowcam");setCam({x:19, y:10, height: 2.5, offsetCamera: "rotateX(-40deg)", rotation: 0, distance: 20})
        the parasite is within, again, and my furious thoughts spill forth

    wakizet::loud
        'WHAT IS GOING ON'?
            EXEC::content.classList.add('damagehit');
            WAIT::300
            THEN::content.classList.remove('damagehit');env.ravenous.addDamageOverlay()

    wakizet
        stupid parasite
        is it not clear enough to you?
        must you hear my own admission?
        i tore apart other memories to use as bait...
        i killed and feasted upon the flesh of the wretched beasts that came...
        a war against <em>you</em> and <em>everything else</em> in the dark
        so that they may never hurt my memory, nor any other, ever again
        and it works, oh, it works, it has worked for so long
        i protected this memory, my ward,
            EXEC::setCam({x:19, y:40, height: 2.5, offsetCamera: "rotateX(-40deg)", rotation: 180, distance: 20})
        the last echo of a sane, happy world
        until i... i became... 
        it could no longer remain intact in my presence
        the celebrations and hope play on without me
        a necessary cost to protect what remains

    self
        so this big shape here, it's a memory?
        maybe we can repair it?
        i've helped funfriend repair several memories now

    wakeless
        an unwelcome, unfamiliar feeling swirls in my mind
        a welling, the urge to share all, to give up and break apart
        could there truly be something beyond this darkness?
        no, no, this is manipulation
        there is only madness in the dark, manipulating me
        it is here, in my thoughts--you are
        again i have taken your bait
        i tear at myself, piercing my own shell,
            EXEC::content.classList.add('damagehit');play("scarydoia", 0.2);setCam({x:24, y:22, height: 2.5, offsetCamera: "rotateX(-40deg) rotateY(20deg)", rotation: 0, distance: 30});env.stage.plane.style.setProperty("--perspective", "1000px");content.classList.add('slowcam');try{content.querySelector(".wakey").style.setProperty("--dyp-image", "url(/img/sprites/akizet/wakizet/wakizetmegahurt.gif)")}catch(e){}
            WAIT::300
            THEN::content.classList.remove('damagehit');env.ravenous.addDamageOverlay()
        until i can locate and pry the part that contains this parasite - you - away
            EXEC::content.classList.add('damagehit');play("scarydoia", 0.2);setCam({x:19, y:50, height: 2.5, offsetCamera: "rotateX(-80deg) rotateY(20deg)", rotation: 0, distance: 30});env.stage.plane.style.setProperty("--perspective", "1500px")
            WAIT::300
            THEN::content.classList.remove('damagehit');env.ravenous.addDamageOverlay()
        and there it is, th
            EXEC::vfx({type: "darkflash", state: true});env.stage.plane.style.removeProperty("--perspective")
            AUTOADVANCE::
            WAIT::2000
            THEN::env.stage.plane.style.setProperty("--perspective", "1500px");content.classList.remove('slowcam')
    
    sys
        ALERT::"recollection locus lost"
            EXEC::setCam({x:19, y:49, height: 1.5, offsetCamera: "rotateX(20deg)", distance: 0});

    sourceless
        the thoughtform grows unstable.
        you feel that it has severely damaged itself.
            EXEC::vfx({type: "darkflash", state: false})
        your mind's eye is shoved away.
            EXEC::setCam({x:19, y:49, height: 1.5, offsetCamera: "rotateX(20deg)", distance: 5})

    wakizet
        do not return
            EXEC::content.classList.add("slowcam");env.noVoiceStop = true

    wakizet::loud
        EVER!!
            EXEC::play("criticalError", 0.5);setCam({x: 19, y: 49, rotation: 600, offsetCamera: "rotateX(70deg)", height: 10, distance: 70})
            WAIT::2000
            THEN::vfx({type: "darkflash", state: true})
        
    sys
        WARNING::'abnormal thoughtspace activity detected'
        ERROR::'invalid render';'locating closest coherent position'
            EXEC::env.stage.plane.style.removeProperty("--perspective");toggleBgm(page.bgm)

    RESPONSES::self
        resume search<+>END
            EXEC::content.querySelector('#damage').remove();env.ravenous.damage = 0;changeStage("pit_melting", false, false, {noFlash: "true"});env.noVoiceStop = false;setTimeout(()=>{env.ravenous.savePos();vfx({type: "darkflash", state: false});setCam();content.classList.remove("slowcam")}, 500);
`)
env.localization.page['pit'].dialogues["f2"] = generateDialogueObject(`
start    
    sourceless
        a familiar presence presses against your mind.
            EXEC::playerMoveTo(19, 68, "up");vfx({type: "darkflash", state: true});toggleBgm(env.ravenous.waki)
        it's more cautious this time, and pulls away in recognition.
            EXEC::vfx({type: "darkflash", state: false});setCam({offsetCamera: "rotateX(30deg)"});env.stage.plane.style.setProperty("--perspective", "1000px")
        attentive rage boils around you.

    wakizet
        how long will you torment me?
        stupid thing
        even if it were 'repaired', 
        i am too far gone to ever play a part again, 
        forsaken in this monstrous form
        were you truly physical, i would have already rendered you to shreds
        i have accepted my place in the dark

    self
        i'm not lying about the repairs
        if you just look above the uncosm, you can see them
        we can fix this

    wakizet::loud
        FIX <em>THIS?!</em>
            EXEC::content.classList.add('damagehit');env.stage.plane.style.setProperty("--perspective", "700px")
            WAIT::300
            THEN::content.classList.remove('damagehit');env.ravenous.addDamageOverlay()

    sourceless
        your mind's eye is twisted to peer into the incoherent void.
            EXEC::setCam({offsetCamera: "rotateX(10deg)", rotation: 0})

    wakizet
        no... even funfriend would see this as betrayal
            EXEC::content.classList.add('slowcam');
            WAIT::100
            THEN::setCam({offsetCamera: "rotateX(30deg)", rotation: 180, height: 2});env.stage.plane.style.setProperty("--perspective", "1000px")
        what i have done to other memories just to protect mine
        yet in the rotting dark, alone, what option did i have?

    self
        even if that's true
        we can restore the memory you're protecting
        and there's another place, with sane thoughtforms just like you
        it's called jokzi ozo
        it's safe
        i can show you

    sourceless
        the thoughtform's glare presses into your mind from all angles.
            EXEC::env.stage.plane.style.setProperty("--perspective", "1500px")
    
    wakizet
        distract me with hope, so that you may ruin what remains?
        what is it you really want?
        did you come here looking for something to feast upon?
        these pieces of the city are already lost
        eat and begone
            EXEC::env.noVoiceStop = true

    sourceless
        there is a void of feeling, something pulled away beneath your perception.
            EXEC::setCam({offsetCamera: "rotateX(30deg)", rotation: 180, height: 2, distance: 10})
    
    sourceless quiet
        suddenly, the memory fragment is smashed apart.
            EXEC::content.classList.add('damagehit');content.querySelectorAll(".gridpiece").forEach(el=>{if(!el.firstElementChild) el.style.transform = \`rotateX(\${rand(0, 360)}deg) rotateY(\${rand(0, 360)}deg)\`});play("criticalError", 0.5);env.ravenous.addDamageOverlay();
            WAIT::300
            THEN::content.classList.remove('damagehit');content.classList.add('slowcam')
        your mind tumbles in the incoherence.
            EXEC::setCam({offsetCamera: "rotateX(-20deg)", distance: 30})
            WAIT::1000
            THEN::vfx({type: "darkflash", state: true});env.stage.plane.style.removeProperty("--perspective")
    
    wakizet::loud
        BEGONE!!
            EXEC::env.noVoiceStop = false
        
    sys
        WARNING::'abnormal thoughtspace activity detected'
        ERROR::'invalid render';'locating closest coherent position'
            EXEC::toggleBgm(page.bgm)

    RESPONSES::self
        resume search<+>END
            EXEC::content.classList.remove('slowcam');changeStage("pit_halls", false, false, {noFlash: true});setTimeout(()=>{env.ravenous.savePos();vfx({type: "darkflash", state: false})}, 500);setCam()
    
END::setCam()
`)
env.localization.page['pit'].dialogues["f3"] = generateDialogueObject(`
start
    sourceless quiet
        teeth pour into your mind.
            EXEC::playerMoveTo(38, 52, "up");setCam({offsetCamera: "rotateX(30deg)", height: 2});play("scarydoia", 0.2);env.noVoiceStop = true;env.ravenous.addDamageOverlay()
            WAIT::500
            THEN::env.ravenous.addDamageOverlay();toggleBgm(env.ravenous.waki)
    
    wakizet::loud
        DIE!!
            EXEC::content.classList.add('damagehit');env.ravenous.addDamageOverlay()
            WAIT::1000
            THEN::vfx({type: "darkflash", state: true});content.classList.remove('damagehit');env.ravenous.addDamageOverlay()

    sourceless quiet
        you focus through the pain.
            SHOWONCE::
    
    self
        would you stop
            SHOWONCE::
        just let me show you one thing
            SHOWONCE::

    sourceless
        the imagined pain ceases, and the memory spins.
            SHOWONCE::
        a heavy silence follows.
            SHOWONCE::
        suddenly, your vision distorts--
            AUTOADVANCE::
        
    sys
        WARNING::'abnormal thoughtspace activity detected'
        ERROR::'invalid render';'locating closest coherent position'
            EXEC::let pitpos = check("pitpos");changeStage(pitpos.stage, pitpos.i, pitpos.dir, {noFlash: true});setCam();content.querySelector('#damage').remove();env.ravenous.damage = 0;
            WAIT::1000
            THEN::vfx({type: "darkflash", state: false});toggleBgm(env.ravenous.pit2ex)
        
    RESPONSES::self
        try something else<+>END
            EXEC::env.noVoiceStop = false
`)
env.localization.page['pit'].dialogues["f3_unity"] = generateDialogueObject(`
start
    sourceless
        the mask's impulse resonates with the thoughtform.
            EXEC::toggleBgm(env.ravenous.waki)
    
    wakizet::loud
        YOU...
            EXEC::playerMoveTo(38, 52, "up");setCam({offsetCamera: "rotateX(30deg)", height: 2})
    
    wakizet
        that...
        what is that?
            EXEC::vfx({type: 'beacon', state: false});env.stage.plane.style.setProperty("--perspective", "400px")

    self
        jokzi ozo
        just like i said

    sourceless
        the thoughtform draws close, suffocating your mind's eye.
            EXEC::setCam({offsetCamera: "rotateX(25deg)", distance: -1, height: 2.3})
        thoughts bleed into the space from its wound.

    wakeless
        --tendril reaching up through the darkness
            EXEC::content.classList.add('slowcam')
        where the 'ozo' ought to be
            EXEC::setCam({offsetCamera: "rotateX(30deg)", distance: -1, height: 2.3, rotation: 150})
        and... something is there, 
        welcoming, hopeful, peaceful--it even reaches out to me, gently
        not only that, the darkness has receded?
        i have lived a whole life in the dark
        the bloodstains of my prey becoming permanent layers of skin
            EXEC::setCam({offsetCamera: "rotateX(40deg)", distance: -1, height: 2.3, rotation: 130})
        i flex my countless tendrils still cast into the dark,
        curling them back into myself, closer, around my precious memory
        giving this 'interloper' the barest thought has poisoned my mind
        the impossible notion of returning to a place of safety, 
        for both myself, and a future for my ward...
        even if it is only a chance, some manipulation
        i have had enough of this terrible life
        and i imagine my dreaming friends must miss their akizet
        the parasite remains still, no flesh to tear
            EXEC::setCam({offsetCamera: "rotateX(25deg)", distance: -1, height: 2.3})
        its uncanny existence, let alone its knowledge, is evidence enough
        it is no simple predator, but--
            EXEC::content.classList.remove('slowcam')

    sourceless
        it turns in an imperceptible way, its bleeding thoughts angled away from you.
        there is little anger in its attention.

    wakizet
        you... were not lying...
        ...if i were to entertain this,
        what of my memory? my ward?
        it may no longer welcome me, 
        but it cannot all have been for nothing
    
    self
        can you move it?
        if you push it up far enough, out of the uncosm
        funfriend will find it and try to repair it
        i can even make sure it's found quickly
        
    wakizet
        i can, yes...
        it would disturb my traps and fields of viscera
        but if this could be over, if...

    sourceless
        suddenly, you feel a furious edge against your mind.
            EXEC::env.stage.plane.style.setProperty("--perspective", "500px")

    wakizet
        if you lie to me,
        if this is deception,
        if you even tell truth, yet fail to protect my memory,
        i will tear everything apart
            EXEC::env.stage.plane.style.setProperty("--perspective", "700px")

    wakizet::loud
        i will tear <em>everything</em> apart
            EXEC::content.classList.add('damagehit');env.stage.plane.style.setProperty("--perspective", "1000px")
            WAIT::300
            THEN::content.classList.remove('damagehit');env.ravenous.addDamageOverlay()
        until not a single coherent thread of thought remains
            EXEC::content.classList.add('damagehit');env.stage.plane.style.setProperty("--perspective", "1100px")
            WAIT::300
            THEN::content.classList.remove('damagehit');env.ravenous.addDamageOverlay()
    
    wakizet
        ...
        do you understand?
    
    self
        yes

    sourceless
        the weight of the thoughtform's gaze is heavy upon you.
            EXEC::env.noVoiceStop = true;change("TEMP!!wakiget", true)
        it's silent for a long moment.
        then, the imagined threat ceases, and the space ripples and distorts.

____SILENT::
        suddenly, your vision grows unstable--
            EXEC::flash(true);change("TEMP!!pitdebug", "DELETE");play("criticalError", 0.5)
            AUTOADVANCE::
            WAIT::2000
        
    sys
        WARNING::'abnormal thoughtspace activity detected'
            EXEC::refreshStage({noFlash: true});env.stage.plane.style.removeProperty("--perspective");content.querySelector('#damage').remove();env.ravenous.damage = 0;setCam()

    sourceless
        the shape is gone, and so is the thoughtform.
            EXEC::flash(false);toggleBgm(env.ravenous.pit2ex)
____END

    moth
        ok, whatever she did with the recollection made a lot of noise
        there's no way funfriend didn't notice that
        maybe go check in with him
        huh. nice work buddy
            EXEC::env.noVoiceStop = false
        
    RESPONSES::self
        ok<+>END
`)


// == ROTWATCHER == //

env.localization.page['pit'].dialogues["++rotpit"] = generateDialogueObject(`
start
    self
        what do you think about this place?
            EXEC::changeBgm(env.rotWatcherMusic)

    sourceless noprocess
        the rotwatcher's attention is only briefly upon you, just long enough to transmit some meaning.

    rotwatcher
        guided spatial delamination: in which a thoughtspace and its organelles are deliberately damaged and subdivided by a thoughtform with the intention of cultivating a local ecosystem of insensate thoughtforms.
        small pockets of coherency remain in subdivisions connected loosely by thread-like remnants of the greater thoughtspaces, serving both as a form of bait for hostile entities and false refuge for thoughtforms treated as prey.
        it is observed that the present guided delamination results in a roughly spherical field of viscera. it is assumed to be oriented specifically to confuse and trap thoughtforms without cognitive draw, while acting as a defensive field against those with.
        the present thoughtspace is observed to be the only recorded instance of this phenomena. due to its immense danger, it is not advised that the present rotwatcher return for study with any common frequency nor for any extended duration.
        however: a large amount of uniquely adapted insensate thoughtforms are present and thus further study is necessary.

    RESPONSES::self
        tell me about something else?<+>CHANGE::++rotmove
            HIDEREAD::
        ok<+>END

END::toggleBgm(page.bgm)
`)

getLocalizationForPage(true) // --- ensuring that Nothing Gets Fucked Up