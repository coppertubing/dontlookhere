
/** COUNCIL STUFF **/
env.dialogueActors["council"] = {
    image: check('recosm_state', 'killed') ? '/img/sprites/council/godportrait.gif' : '/img/sprites/council/portrait.gif',
    type: "thoughtform awakened portrait-haze portrait-auto portrait-center",
    voice: ()=>play('talkchoir')
}

env.dialogues["council_intro"] = generateDialogueObject(`
start
    self
        hello?
            EXEC::env.jokzi.toggleSlow(true)
    
    sourceless
        ...

    council
        what is that...?
        oh! what are YOU?!
        think something! think something again!!

    self
        why
    
    council
        oh, yes!! yes!!
        no mere delusion! no half-eaten thoughtform!
        think more! think!! what is your name?
    
    self
        they are calling me an "interloper"
    
    council
        ah!!
        our fated interloper, come at last!
        that is no name, but we feel your hesitance to share...
        so, the interloper you will be!
        the mystery! our doom, our hero!
    
    self
        you've been expecting me?
    
    council
        oh, yes, oh, yes!!
        the one variable in our decline!
        we long predicted that it was only by an interloper's hand, that the cyst would survive...
        and here you are!
        finding our sanctuary in the receding madness!
        and what a pity... oh what a shame!! that you come now
        the bright fields have rotted, the stars have faded
        our friends are all gone...

    sourceless
        ...

    council
        but maybe you could help...?
        indeed--we could offer our powers in return for a simple task...
        such incredible capabilities, excavated from the darkness!
    
    RESPONSES::self
        tell me more<+>CHANGE::council
            HIDEREAD::
            EXEC::change("PAGE!!introswap", true)
        later<+>END
            EXEC::env.jokzi.councilToggle()

END::env.jokzi.toggleSlow(false)
`)

env.dialogues.councilResp = generateDialogueObject(`
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

env.dialogues.councilRejoiningResp = generateDialogueObject(`
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
            FAKEEND::(back)
`)

//to be less overwhelming this leads into subcategories
env.dialogues.councilQuestionsResp = generateDialogueObject(`
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
            FAKEEND::(back)
`)

env.dialogues.councilPlaceQuestionsResp = generateDialogueObject(`
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
        stowaway?<+>stowaway
            SHOWIF::"e3a2__escapewin"
        back<+>loop
            FAKEEND::(back)
`)

env.dialogues.councilCystQuestionsResp = generateDialogueObject(`
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
            FAKEEND::(back)
`)

env.dialogues.interloperQuestionsResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::council
        real name?<+>iname
        purpose?<+>ipurpose
        back<+>loop
            FAKEEND::(back)
`)

env.dialogues["council"] = generateDialogueObject(`
loop
    RESPOBJ::councilResp
    
start
____SHOWIF::'PAGE!!introswap'
    self
        tell me more

    council
        certainly!!
        still, there is so much to tell...
        our abilities aside,
        this once-magnificent dream you walk upon, interloper, carries so much history
        jokzi ozo - our city of dreams!
        tell us, what do you want to know?
        and if it is not too much for us to pry...
        we would ask of you a few questions, too!

____SHOWIF::[['PAGE!!introswap', false], ["PAGE!!depressed", true], ["PAGE!!questionswap", false]]
    sourceless
        the council sways idly.
        their mind is fixed upon yours, awaiting the slightest impulse.

    council
        interloper, interloper!
        come, speak with us!
        we tire of the silence

____SHOWIF::[['PAGE!!introswap', false], ["PAGE!!depressed", false], ["PAGE!!questionswap", false]]
    sourceless
        the council dances idly.
            EXEC::env.jokzi.toggleSlow(true)
        their mind is fixed upon yours, awaiting the slightest impulse.

    council
        interloper, interloper!
        come, dance with us!
        or--did you need something?
____END

    RESPOBJ::councilResp

dance
    self
        you said you wanted to dance
        let's dance
    
    council
        oh, dear interloper!
        we worried you were too cold to ask again!
        let the music... begin!!
    
    RESPONSES::self
        ok<+>END
            EXEC::setTimeout(()=>env.jokzi.dance(true), 400);env.jokzi.councilToggle()

stopdance
    self
        ok enough dancing
    
    council
        ah...
        we understand, interloper!
        no fun lasts forever
    
    RESPONSES::self
        thanks<+>END
            EXEC::setTimeout(()=>env.jokzi.dance(false), 400);env.jokzi.councilToggle()

task
    self
        what did you want me to do?
    
    council
        we miss our friends, interloper! we want them back!
        it is as simple as that!
        there were three that the tyrant tore from us just recently
        we have tools we can give you, ones that will awaken them from the nightmares the tyrant has trapped them in...
        and then, they will know how to return
        all we need, is for you to go and free them!
        here... here!! see beneath it all!
        Èz¬ÝÃ¬MÀ(²JóŠ³€üÉü´øãüç‚¿Ÿü

    sys
        ATTENTION::'thought stream inbound';'accept?'
    
    moth
        wtf?
        my machines aren't picking this up
    
    self
        accepted

    moth
        dude maybe don't just
    
    sys
        EXECUTING::'stream consumption'
            EXEC::vfx({type:'beacon', state: true});ratween(env.bgm, 0.2, 400);setTimeout(()=>play("unitymask", 0.9, 1, true), 100)
            WAIT::2000
        ATTENTION::'attempting thought reformation'
            EXEC::ratween(env.bgm, 1, 400)
        ANALYSIS::'interface instruction';'constructing...'
        ANALYSIS::'new menu available';'masks'
        ANALYSIS::'utilize to alter thoughtspaces'
        NOTICE::'mask added';'unity'
    
    council
        there--you have it now!
        power seized from madness! born in our infinite dreams!
            EXEC::vfx({type:'beacon', state: false})
        we call them masks...
        crystallized concoctions of thoughts and feelings,
        whose very presence can exploit and warp a thoughtspace!!
        it was once a shared art of the ozo, but when all others were torn away...
        so many were lost...
        and so, this one we have given you: it is a beacon!
        knowledge of the ozo itself, encoded in our favorite concept!
        wear it, and use its light to guide others to our world...
        most will not truly be able to perceive it, but those who can...
        yes!! they will see everything!
        all of our dances!
        so go--find them! free them!
        the flower! the fairy! the lost one!
        we are sure they will share their favorite masks with you, too!
    
    moth
        are you ok? do you feel anything?
        your stats are reading fine
    
    self
        yeah fine

    moth
        come on dude
        that could have been literally anything
        it could still be a threat
        don't just accept stuff from thoughtforms like this
        if you get hurt on this job, especially with how deep we're in it
        it's only going to be really bad news for both of us
        but whatever, take a look at what you got i guess
    
    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

rloop
    RESPOBJ::councilRejoiningResp

flower
    self
        tell me about the flower
        where can i find them
    
    council
        oh, the flower, our most precious friend
        with her gone, our memories of her have faded, too... but we remember some things!
        a grounding force, she was--all relied upon her for support and resolution
        still, she was utterly obsessed with aki, hopelessly so!
        dreaming a thousand dreams of simply sitting with her in a great field...
        and she had such an incredible ability to find hidden things! a sharp eye!
        the age of hunger took such a sharp toll upon her--she never much enjoyed the feasts we held...
        the fairy had to form such silly illusions to make them fit her palate!
        anyway! we know she came from a memory of warmth within cold metal!
        we hope that helps, interloper

    RESPONSES::self
        thanks<+>loop
            FAKEEND::(back)

anyone
    self
        aside from the lost one
        i have found the other two
        what now? anyone else?
    
    council
        what now...?
        so eager to continue your work!
        take some time, enjoy your spoils, dear interloper!
        these two friends of ours were among our most prominent,
        any others, we will remember collectively in time
        and then, there will be more to do!! yes!
        we will make you aware when that time comes!

    RESPONSES::self
        great thanks<+>loop
            FAKEEND::(back)

flowersaved
    self
        the flower is back
        isabel
        can you tell me anything more about her?

    council
        our most beloved friend!
        yes, we have been speaking with her!
        and with her return, came a host of thoughtforms we thought lost!!
        her little akizets! hehehehe
        you need not question us over her...
        anything you wish to know, she will be more than forthcoming about!
        go! go to her fields, speak with her!

    RESPONSES::self
        great<+>loop
            FAKEEND::(back)

fairysaved
    self
        i've returned the fairy
        can you tell me anything more about it?

    council
        oh, yes, yes...
        while we do fear their rage and hunger sometimes,
        their ability to traverse dreams and take new forms is rare!!
        so we are happy to have them back! such variety!
        and do not be afraid of them!
        they adopt a fearsome persona, but...
        well, they are fearsome
        but the fairy just as much appreciates favors
        we are certain they will see you as a good friend, now!

    RESPONSES::self
        cool<+>loop
            FAKEEND::(back)

fairy
    self
        tell me about the fairy
        what's their story
    
    council
        the fairy! yes!
        do mind---until they are returned, we have only fading memories...
        still, they were a terrifying friend to have--a force, more than a thought!
        their claws could pry apart any thoughtspace, for them to feast upon the meat within
        they were the most feared of all thoughts within the age of hunger...
        at times, even we questioned welcoming them in!
        but what a joy it was when they were happy! 
        they could form such lucid dreams and false memories with ease!
        and the sound of their laugh, their endless giggle, it was the music of the ozo!
        we want them back so badly...
        as for where they are, with how many thoughts they consumed, we cannot know for certain
        they took a frightening shape and preoccupied themself with the void--for that is where they feasted most

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

third
    self
        who is the lost one?
    
    council
        well, interloper, that is the trouble
        we do not know!!
        when they were torn away, it was more 'clean' than the others
        the tyrant needed them for something important...
        and now, we do not even remember what they looked like, what they did...
        we apologize - we know this is unhelpful!
        and what a strange feeling it is to have, too...
        to know we miss a friend so dearly, to have such holes in our hearts...
        and not even know why!
        just keep watch, interloper
        you will find them somewhere
        
    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

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
            FAKEEND::(back)

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
            FAKEEND::(back)

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
            FAKEEND::(back)

cavik
    self
        i used your mask on cavik
        or a version of him i found in the uncosm
        he disappeared, have you seen him?
        
    council
        cavik... no, no, we have not
        how peculiar!
        perhaps he is still on his way?
        we must hope that nothing caught him on the journey

    RESPONSES::self
        yeah<+>loop
            FAKEEND::(back)

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
            FAKEEND::(back)

we
    self
        you keep saying we
        you are the only one here
    
    council
        interesting!!
        your unnatural connection is tenuous, interloper!
        you see us as one single thing...
        but we are so many friends!
        we, who shed our membranes to join together...
        for closeness, for intimacy, to dream greater dreams!
        and of course, some of us simply tired of the wait...
        and so we joined to be burned away as fuel!
        those ones are quiet now...
        but, in friendship and feast, we weathered the darkness! the madness!
        and we all made it through! all of us!
    
    RESPONSES::self
        i see<+>ploop
            FAKEEND::(back)

ozo
    self
        tell me about this place
    
    council
        of course, interloper!
        you stand in our shared world of light,
        bound into spatiality by sacrifice...
        this is jokzi ozo!
        for we were a fortress, drifting above the tides of madness for three ages
        across the surface of our unfortunate progenitor, aki...
        oh, poor aki!!
        but it was she who ultimately let us seize a fragment of velzie's power
        all of her memories, us included,
        joining minds to dream a thousand better lives!
        yes, a fortress we were, a city!
        but... it is much smaller and quieter now
    
    RESPONSES::self
        i see<+>ploop
            FAKEEND::(back)

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
            FAKEEND::(back)

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
            FAKEEND::(back)
    
time
    self
        how long have you been here?
    
    council
        ahahaha!! we lost track a long time ago!
        adrift in the uncosm, atop the tides of its insanity,
        time got away from us
        even more when we rejected it for our dreams!
        what tales we spun! what fun we had!!
        and what wonderful feasts we had...
        we were sure we would sit with our friends around the last flicker of our sanity...
        ahh, to bask in that melancholic thought again,
        to clasp claws with the others and reminisce as the darkness claimed all...
        we even dreamed dreams of it, in anticipation
        but now that you are here, time is not so short anymore! what fun we will have!!
    
    RESPONSES::self
        yep<+>ploop
            FAKEEND::(back)

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
            FAKEEND::(back)

dreams
    self
        when you say "dream",
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
            FAKEEND::(back)

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
            FAKEEND::(back)

dark
    self
        i found a dark area in here
        what is that

    council
        ah...
        well, interloper, much has simply been left to rot
        when the age of darkness came, 
        we pulled every resource, every maintenance, into the core of jokzi ozo
        to keep the dream alive as long as possible...
        and so, much of outer ozo has been left to decay
        sad, but necessary
        still, do be careful, dear interloper!
        we are sure the areas are lifeless and harmless, but...
        with the size of our world, we can never be sure

    RESPONSES::self
        ok...<+>ploop
            FAKEEND::(back)

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
            FAKEEND::(back)

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
            FAKEEND::(back)

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
            FAKEEND::(back)

tyrant
    self
        when you say tyrant
        do you mean funfriend?
    
    council
        yes, of course, dear interloper
        funfriend...
        neither fun, nor friend--it makes us want to weep!
        when the age of hunger abated, and the age of madness came,
        it was here with us!
        with so many other fragments from half-eaten memories
        oh, and how it danced with us, forming entire new lives!
        so much, so much we have experienced!
        and we all made peace with the darkness we knew was coming...
        we all promised to be together to the very last light!
        but little funfriend grew skittish as the madness began to close around our home...
        it thrashed, it fought, breaking our peace, breaking our rules!!
        telling us to do this, to do that, to return to our memories--that it has 'a plan'!
        a piteous plan, mind you--that we all take position as pillars in far corners of the cyst, away from one another,
        to all die alone in some impossible fight to stop the fading of the light...
        ...
        ...ultimately... it left
        snatching the cyst's locus of control in its darkest moment,
        forcing itself into its role as the servitor...
        to its credit, we must admit that it did work out in the end--but only by your divine intervention
        after all, look at us, talking, well beyond the last <span definition="TRANSLATION FAILED::CAUSE:'no equivalent internal meaning';'no relevant inherited context'::ROMANIZATION SUCCESSFUL">zenruka</span>'s flash!
        but even back then, they tore at us, stealing our friends to use as walls against the tides...
        forcing us into stages, where we took roles in aki's darkest nightmares, to an empty audience!
        so yes, <em>tyrant</em>. clinging to a past that it cannot even remember
        if only we could join hands and receptors again for another dream--a different life!
        after all, there is plenty of time for revelry now!
        yet the tyrant carries on, an invisible weight on its shoulders
        repairing memories in the shape of a sad altar to dear aki...
        we wish we could help them, but they are beyond reason, interloper
    
    RESPONSES::self
        ...<+>cloop
            FAKEEND::(back)

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
            FAKEEND::(back)

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
            FAKEEND::(back)

akizet
    self
        do you know what happened to akizet?
    
    council
        what a question!
        who does not, interloper?
        oh, yes...
        that is right...
        EVERYBODY!!!!!
        the tyrant tore memories from us all, moving things to fit its will
        this was long ago, mind you--when it first fought against the fading of our world
        so many friends torn from us, so much knowledge lost!!
        worse still--we doubt even it knows where that memory is, now...
        the only shred we recall is that we - the cyst - were torn from her body for one reason or another!
        and obviously, that does not bode well, does it? hahaha!
        sorry! we do not mean to laugh! we know it is sad!
        but it is all so far in the past now, and look what joy was wrought from her!
        we all had our times of mourning, and then came the celebrations of her memories!
        and they never, ever stopped!
        not even now!! come, let us dance in her memory!
            SHOWIF::["PAGE!!depressed", false]        
    
    RESPONSES::self
        ok<+>cloop
            FAKEEND::(back)


iloop
    RESPOBJ::interloperQuestionsResp

iname
    council
        tell us, interloper!!
        what is your name?
    
    sourceless
        ...
        the eyes within the eyes of the council watch your mind with incredible hunger.
    
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
            FAKEEND::(back)

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
            FAKEEND::(back)

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
            FAKEEND::(back)

____SHOWIF::["PAGE!!jig", true]    
    council
        ah, they heard our song, felt our dance!
        and thanks to your intervention - they now dance with us!
        we cannot understate our joy, dear interloper, when a new thought joins in
        thank you! thank you!
    
    RESPONSES::self
        no problem<+>loop
            FAKEEND::(back)
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
            FAKEEND::(back)

dull
    self
        do you know anything about the dull plane?

    council
        haha!! interloper!
        only murmurs of memories from akizet and those who have joined us
        but... you ask about an entire world far beyond our sphere
        a place above a place we can never see,
        born of and reliant upon the cyst as we are
        we wonder, if you took us out, how small we would be beside your claws
    
    self
        what murmurs
        
    council
        such driven questioning?!
        you are truly bothered, dear interloper!
        is the concept so intriguing? still...
        the world beyond, that which we share, is velzie's stage
        it is known, it is beautiful, it brought us to you!
        however, the dull plane...
        that one is truly elusive to us, for memories often fail to hold it
        you see, velzie's stage is a place in careful balance between joy and terror
        while the dull plane, it exists without regard for this favored balance
    
    self
        how so
    
    council
        that is the troubling thing!
        we are not very sure!
        akizet had sparse memories of the dull plane to begin with,
        with many being devoured in the age of hunger,
        and many more simply never making it to us before deteriorating...
        all we have are fleeting images and sensations of fear
        whether this is truth, or akizet's belief...
        that is beyond us to say, for certain
        for it was only she who granted us this knowledge of the world beyond

    RESPONSES::self
        thanks i guess<+>cloop
            FAKEEND::(back)

END::change("PAGE!!introswap", false);env.jokzi.toggleSlow(false);change("PAGE!!questionswap", "DELETE")
`)

/** ISABEL STUFF **/
env.dialogueActors["isabel"] = {
    image: '/img/local/uncosm/ozo/flowerfriend_portrait.gif',
    type: "thoughtform flowerfriend awakened portrait-cover portrait-haze",
    voice: ()=>play('talkflower')
}

env.dialogues["isabel_intro"] = generateDialogueObject(`
start
    isabel
        interloper...
            EXEC::env.jokzi.toggleSlow(true)
        there you are
        my role, back in that memory of the city,
        it was not a nightmare like some must endure
        but... the warmth of this place still called to me
        it was torture knowing i'd been torn from paradise
        thank you, again
        i know you want something in return...
        i'd give you a mask if i still had any!
        but my poor akizets,
        they must have eaten them in my absence
        give me some time, and i will make a new one just for you
        in the meantime, i can only offer you information
        and... another request, about my effigies, if you don't mind
    
    RESPONSES::self
        tell me more<+>CHANGE::isabel
            EXEC::change("PAGE!!isaswap", true)
            HIDEREAD::
        ok<+>END

END::env.jokzi.toggleSlow(false)
`)

env.dialogues["isabel_joy"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true);

    sourceless
        the thoughtforms here are focusing on something beneath your perception.

    effigy
        it looks ready! it does!
    
    isabel
        and only by your help, my dear vel
    
    effigy
        interloper interloper!
        hii!!

    isabel
        interloper? 
        oh, hello, welcome!

    sourceless
        an excitement carries through its thoughts.

    isabel
        it is about as good as we can make it, so...
        i will not labor in secret any longer
        we've been working on a mask for you!
        you've done so much for all of us
        especially me, finding so many of my dear akizets
        and i know you're starved for knowledge, like a newly awoken thought
        but unlike the awoken, i can trust you with this gift

    self
        what does it do?

    effigy
        it's the joy mask!
        yes! it's for having fun!
    
    sourceless
        a kind warmth suffuses the thoughtspace.

    isabel
        that's not quite correct, aki
        why don't you let me handle this part?

    effigy
        okæy
    
    isabel
        interloper, you understand that jokzi ozo is hidden from the tyrant, yes?
        entirely impossible for them to directly perceive

    self
        mostly
        but you and the others were torn from it

    isabel
        correct... an unfortunate consequence of the darkness receding
        it's only incidental that we were torn from it, though
        i assume they must have been clawing through the cache, blindly, for parts...
        only recognizing what they pulled away afterwards
        we've taken measures to prevent that from happening again
        but, that's a problem for another day
        let's return to your gift, hm?

    sourceless
        the thoughtform directs your attention to a nearby effigy.
            EXEC::setCam({x: 3.5, y: 7, rotation: 160});change("joysearch", true)
        
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::refreshStage();

    sourceless
        it's gone.

    effigy
        wooaao ahahaha

    isabel
        i suspect this should work still--she's missing, right?

    self
        yes
    
    isabel
        wonderful!!
            EXEC::setCam()
        how to explain this, to someone not 'here'...
        ah! you can imagine thoughts as having a texture
        a sort of pattern both to their exterior, and to the things they hold
        it's possible for this pattern to act like camouflage
        for a thoughtform as a whole, or for fragments of its knowledge
        intentionally, through self modification,
        or incidentally, through damage or malformation
        they can even be tailored to hide from <em>particular</em> entities,
        if you know what it is you want to hide from well enough
        throughout all the lucid ages, you could say i acquired an eye for them 
        there was much that hid in plain sight even back then
        i even altered some thoughts myself, here and there...
        a measure to hide precious things from the ravenous, then from the tyrant
        moments of warmth, fleeting moments of joy in akizet's terrible journey
        if they were lost, i... 
    
    sourceless
        the thoughtform is silent, grief creeping through your connection.
        the feeling disappears as its attention pulls away from you.
        to something else that you can't see, turned over beneath the thoughtspace.

    isabel
        these and more should still be out there, somewhere
        frozen beneath the layers of dust and blood from our darkest ages
        and i suspect that this mask, if i've done this right... 
        should grant you my sight, allowing you to see what i can
        with some space left for future improvement, too!
        of course, i've got no idea how this'll work with your method of connection...
        but, here

    sys
        ATTENTION::'thought stream inbound';'accept?'

    moth
        this sounds super useful, probably the least harmful sounding one so far lol
        not that i'd expect you to...
            WAIT::2000
            AUTOADVANCE::
    
    self
        accepted
    
    sys
        EXECUTING::'stream consumption'
            EXEC::vfx({type:'beacon', state: true});ratween(env.bgm, 0.2, 400);setTimeout(()=>play("joymask", 0.9, 1, true), 100)
            WAIT::2000
        ATTENTION::'attempting thought reformation'
            EXEC::ratween(env.bgm, 1, 400)
        NOTICE::'mask added';'joy'

    isabel
        try it on, interloper
        see if you can find that effigy!
        i think she ran off somewhere while i explained... 
        she's very good at that, hehehe
        but, she's still on this layer of the ozo, somewhere

    RESPONSES::self
        ok<+>END
            EXEC::setCam()

END::env.jokzi.toggleSlow(false);vfx({type:'beacon', state: false});
`)

/* entering the mystery room triggers this */
env.dialogues["joy_mysterydoor"] = generateDialogueObject(`
start
    effigy
        interloper!!!!!!!!!!!!
        ahaha wow! 
        that was so fast!!
        no one ever finds me here
        not even the fairy!!
    
    self
        what is this room?

    effigy
        umm

    sourceless
        the effigy's focus draws your attention to the unresponsive shape nearby.
            EXEC::setCam({x: 4, y:4})

    effigy
        ...
        ummmmm
        isabel told me once
        ...
        it's old!
        connected somewhere once?
        someone used to live here??
        i donn't knowwwwwww
        lots of places like it...
        but this one's close!!
        and feels nice

    self
        lots of places?
        there aren't that many paths here

    effigy
        it's just cause we're outside!
        i wish they would let you in already!!
        you're fun and i like watching you!
        anywayy the game's over for now you win

    RESPONSES::self
        ok<+>END
            EXEC::change("joysearch", false);setCam()
`)

// if you didn't go in the room and got waki waki first
env.dialogues["joy_mysterydoor_late"] = generateDialogueObject(`
start
    effigy
        interloper!!!!!!!!!!!!
            EXEC::playerMoveTo(4, 4, "up");setCam({x: 4, y: 4, rotation: 210})
        ahaha wow! 
        you took so long to find me i was starting to get bored!
        but look who i found!

    wakeless
        ...disarming behavior is likely deception, perhaps intent on...
            EXEC::setCam({x: 4, y: 4, rotation: 180})
    
    wakizet
        hm....
            EXEC::setCam({x: 4, y: 4, rotation: 160})
        
    effigy
        i never thought ANYONE would EVER come here EVER!!!
        EVER!!!!!
        not even the fairy!!
        it's been tucked out here for so lonnnng
        and now another me is here too! yay!

    wakizet
        we are not the same

    effigy
        ahaha okayyy
        anywayy the game's over for now interloper
        you win you winnn!!
        i'll go back to ibabel later

    sourceless
        its attention drifts away from you, to the akizet thoughtform,
        whose focus burns into your mind's eye still.

    wakizet
        we should speak

    RESPONSES::self
        ok...<+>END
            EXEC::change("joysearch", false);setCam()
`)

env.dialogues.isabelResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        stowaway?<+>stowawaydance
            SHOWIF::'PAGE!!i_stow'
        akizets<+>akistat
            HIDEREAD::
        you<+>yloop
        jokzi ozo<+>oloop
        memories<+>cloop
        interview lady<+>lady
            SHOWIF::"unity_lady"
        bye<+>END
`)

env.dialogues.isabelYResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        name?<+>name
        home?<+>home
        masks?<+>masks
            SHOWIF::["ozo__isabel_joy", false]
        back<+>loop
            FAKEEND::(back)
`)

env.dialogues.isabelCResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        memories?<+>memories
        akizet?<+>akizet
        isabel?<+>isabel
        relationship?<+>relationship
        funfriend?<+>funfriend
        back<+>loop
            FAKEEND::(back)
`)

env.dialogues.isabelOResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        council?<+>council
        fairy?<+>fairy
            SHOWIF::"localorbit__fairy_beacon"
        lost one?<+>lostone
            SHOWIF::["e3a2__escapewin", false]
        geli?<+>gelifree
            SHOWIF::"e3a2__escapewin"
        stowaway?<+>stowaway
            SHOWIF::"e3a2__escapewin"
        history?<+>history
        effigies?<+>effigy
        hiding room?<+>room
            SHOWIF::"ozo__joy_mysterydoor"
        akizet?<+>wakizet
            SHOWIF::"pit__f3_unity"
        back<+>loop
            FAKEEND::(back)
`)

env.dialogues["isabel"] = generateDialogueObject(`
loop
    RESPOBJ::isabelResp
    
start
____SHOWIF::'PAGE!!isaswap'
    self
        i have some questions
            EXEC::env.jokzi.toggleSlow(true)
    
    sourceless
        the thoughtform's mind is quiet, waiting for you.

____SHOWIF::['PAGE!!isaswap', false]
    sourceless
        the thoughtform's attention is elsewhere at first.
            EXEC::env.jokzi.toggleSlow(true)
        but it feels your mind's eye, and attends to you.
    
    isabel
        oh... interloper
        i could use some company...
            SHOWIF::['PAGE!!flowers', 'few']
____END

    RESPOBJ::isabelResp

akistat
    self
        what's the situation with your effigies
    
____SHOWIF::['PAGE!!flowers', 'few']
    isabel
        my akizets--sorry, effigies, used to be numerous
        many memories she held of herself, torn apart, that i repaired
        this field bloomed with them, and i kept them happy
        but when the tyrant tore me away, 
        they must have fallen into the hole i left
        or maybe they got bored, or hungry...
        interloper, i'm so worried
        can you look for them?
        use the council's mask to send them back to me!!
        please!
    
    self
        where should i look
    
    isabel
        the dark, in incoherence
        they aren't able to survive coherent memories
        especially not with the beast the tyrant has constructed
            SHOWIF::'fbx__ep3intro'
        do this for me, and...
        i don't know
        i am still so weak, but i will make it up to you in time

____SHOWIF::['PAGE!!flowers', 'low']
    isabel
        better, interloper
        that you found any intact is a weight off my petals
        i know there are more out there, there has to be...
        i only hope the ones that were truly lost did not suffer

____SHOWIF::['PAGE!!flowers', 'high']
    isabel
        amazing, interloper!
        oh, look at them, and how they bring life back to my world!
        but i still feel a little emptiness...
        nothing that cannot be mended with time...
        ...though i must ask you watch for any more stragglers
        the last ones are always the hardest to find
____END

____NESTIF::['PAGE!!flowers', 'done']
    isabel
        for now, perfect, interloper
        i have a connection with my akizets, you know
        when they are near, i feel at peace,
        and when any are missing, i can tell immediately...
        that feeling, the gloom that hangs over me, it is gone
        and it is thanks to you
+____NESTIF::'ozo__isabel_joy'
        i hope you enjoy the gift we have prepared for you
+____END
+____NESTIF::['ozo__isabel_joy', false]
        but for now, i have nothing to offer you in return...
        give me some time
        but while you wait, enjoy the beauty you have restored!
+____END
____END

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

lady
    self
        the council said they sent that human lady thoughtform to you
        how is she?

    isabel
        not well, interloper
        together enough to feel pain and confusion over her state
        but any complex reasoning or memory is gone
        an unfortunately common state...
        you may see her if you'd like, but you won't get much out of her
        is she important to you, somehow?

    self
        i don't know

    isabel
        ...ok...
        well, i'll restore any memory i can
        just in case she knows anything
        but before anything, i'll try to ease her pain

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

stowawaydance
    self
        what's the stowaway doing here?
    
    isabel
        ah, my akizets took a liking to it
        it seems harmless, so i'm just keeping my eye on it...
        something about the way it acts is similar to them, you know
        i think that's why they get along
        they all come from a place of incompleteness, all on the early paths of growth and self-awareness
        whatever the reason, if it makes my akizets happy, then i'm happy

    RESPONSES::self
        i see<+>loop
            FAKEEND::(back)

yloop
    RESPOBJ::isabelYResp

name
    self
        what should i call you?

    isabel
        the council calls me the flower
        i know myself as isabel, but that's not <em>my</em> name
        ...
        but let's keep things simple
        i'm isabel

    RESPONSES::self
        ok isabel<+>yloop
            FAKEEND::(back)

masks
    self
        you said you were going to make me a mask
        what can you make?
    
    isabel
        i made only one type of mask, interloper
        embodiments of joy
        i know you're thinking, how could that help you?
        a seeker of knowledge!
        i could tell you... but wouldn't it be nicer as a surprise?
        hehehe

    RESPONSES::self
        ok fine<+>yloop
            FAKEEND::(back)

home
    self
        what is this place
        your part of jokzi ozo
    
    isabel
        isn't it beautiful?
        the home of so many dreams...
        i found it in the age of madness,
        half-eaten in a pile of memory viscera
        the council helped me restore it to being a proper space
        though, i don't know when akizet saw this place...
        i hope it was with isabel
        seeing the source of her flowers...
        whatever this place once was
        it now harbors thoughtforms whose joy makes them weak
        i must protect them
        
    RESPONSES::self
        i see<+>yloop
            FAKEEND::(back)

cloop
    RESPOBJ::isabelCResp

memories
    self
        now that you're here
        can you share some memories with me?
    
    isabel
        not outright
        i only have fragments, feelings, shreds of smiles
        shards of contentment from lost, better times...
        you, interloper, seek memories and truths
        and these pittances are only good for dreaming
____SHOWIF::["ozo__isabel_joy", false]
        still, i owe you...
        the mask i am preparing for you will serve you well
____SHOWIF::["ozo__isabel_joy", true]
        so, i hope my mask serves you well
        it should offer a wealth of insight beyond the ozo
____END

    RESPONSES::self
        ok<+>cloop
            FAKEEND::(back)

akizet
    self
        what do you know about akizet?
        what happened to her?
    
    isabel
        akizet was a wonderful woman
        a vel skilled enough to brave the surface for most of her living θeyes,
        one whose smile faded in θdeath, as velzie lured her into chaos
        giving way to paranoia, distrust, loneliness, violence...
        she didn't deserve it, interloper
        i've mourned for her, i've wept over dreams of her
        i've comforted the shreds of her joy that remain with us
        that's all i can do
        as for what happened...
        i feel that i used to know, but the tyrant's interference took so much from me
        she is certainly gone now, if you're using this cyst
        ...
        i hope she's somewhere better...
    
    RESPONSES::self
        me too<+>cloop
            FAKEEND::(back)

isabel
    self
        what do you know about isabel?
        the human i mean
    
    isabel
        i know all there is to know
        about what remains of her, at least...
        the brightness of her hair, her eyes, her smile
        akizet didn't care much to adopt smiling, let alone remember it
        but isabel was different for her
        she managed a small business selling flowers
        you know, the bright ground-parasites, like the ones in this field
        bright cousins adore them as gifts, because of their vibrance
        and akizet came to, as well
        she visited the shop periodically, sometimes even without her envoy
        i think she went other places with isabel, too
        
    self
        when did she meet isabel?
    
    isabel
        when...?
        time doesn't work here like you think, interloper
        i can't really say
        but i do know it was well before the end
        she and akizet had plenty of time to become friends
        most of those memories are shattered or eaten, now...
        ...
        but i watch over what's left

    RESPONSES::self
        ok<+>cloop
            FAKEEND::(back)

funfriend
    self
        what do you think about funfriend?
    
    isabel
        funfriend... the tyrant
        that's what everyone came to know them as
        i do admire them, a little
        for all they've done - their tireless work in preserving history...
        but they don't truly understand what it's like to be placed back into nightmares
        the stages, the thoughtspaces, they're full of holes even after repairs
        and thoughtforms like me, scarred so deeply by madness and hunger,
        we're unable to ever truly play our roles as well as we once did
        so, things will never return to the way they were
        the suffering they're causing, it's all for nothing
        we should simply be left to dream
        i wish they would see that...
        especially after all the time they spent with us
    
    RESPONSES::self
        i see<+>cloop
            FAKEEND::(back)

relationship
    self
        what was the relationship between isabel and akizet?
    
    isabel
        i should know...
        but i've dreamed so many dreams of them that i'm not certain
        i've danced in so many illusions of their happiness...
        they were friends, at the very least
        i suspect the interference of the FBX would've made anything else difficult
        to say nothing of what befell akizet...

    RESPONSES::self
        i see<+>cloop
            FAKEEND::(back)

oloop
    RESPOBJ::isabelOResp

council
    self
        what do you know about the council?
    
    isabel
        they began as one thoughtform, but...
        now they're jokzi ozo itself
        the fire that burns to keep us all alive and dreaming
        and one that so many thoughtforms, growing tired and fearful in the darkness,
        threw themselves into in sacrifice, losing self to become all
        and now, to this very θgaze, the council dances in their amalgamated dream
        they are joyous, and i love being around them
        but i can't look into their eyes without seeing shadows of my earliest friends
        ...
        ...i nearly did it, myself...
        join with the council as a sacrifice, that is
        but i knew if i did, no one else would preserve akizet's happiness until the last light
        this is my duty
                
    RESPONSES::self
        i see<+>oloop
            FAKEEND::(back)

fairy
    self
        what do you know about the fairy?
    
    isabel
        'fairy?' oh...
        yes, them
        they're disrespectful and disgusting,
        distorting memories as velzie would for some sort of cruel amusement
        don't think that i enjoy sharing the thoughtspace with them
        i simply have no other choice

    RESPONSES::self
        i see<+>oloop
            FAKEEND::(back)

lostone
    self
        the council talked about a third "lost one"
        do you know who they could be talking about?
    
    isabel
        interloper, so many are lost
        more than just the few of us ruled over these dreams
        there were dozens, maybe hundreds
        but so much has been torn apart
        all in the name of this meaningless repair
        you'll have to be more specific
    
    self
        they were lost recently
        like you and the fairy
    
    isabel
        interesting...
        but no, i have nothing to offer you
        not even a shred of this 'lost one' remains with me

    RESPONSES::self
        damn<+>oloop
            FAKEEND::(back)
        
history
    self
        do you remember anything about the past?
        like the history of this place

    isabel
        you mean the lucid ages
        there was a mass awakening, and then...
        then came the ages of hunger, madness,
        darkness...
        ...
    
    sourceless
        apprehension bleeds from the thoughtform.
    
    isabel
        i don't want to think about it
        sorry interloper

    RESPONSES::self
        that's fine<+>oloop
            FAKEEND::(back)

effigy
    self
        what are these flower things
        they kinda look like akizet

    isabel
        they <em>are</em> akizet
        or were, once...
        in the lucid ages, akizet was the first to be torn apart
        she's the common element between everything, after all
        hers was a powerful role in any memory, 
        and it held those who played it in a near unbreakable dream
        ...they couldn't even tell that they were having chunks bitten out of them
        these poor things are ones i found who still held some sense of self
        and so i repaired them, giving them parts of myself to thrive with again
        do you like them? 
        i think i did a good job

    self
        can i talk to them about akizet
    
    isabel
        ah. you want information, of course...
        sorry interloper. most of whatever they knew is gone
        now, all they know is what we have dreamed together

    RESPONSES::self
        ok<+>oloop
            FAKEEND::(back)

room
    self
        so i found that effigy
        it was in a weird empty room i can't see without the mask
        there's this flower thing in there too
        what do you know about it?

    isabel
        ah, you must mean the room with the 'scar'
        that one... i forgot it was there
        but, it appears to you as a flower?
        my mask must have inherited some of my tastes, hehe
        regardless, that region is carefully hidden--expertly, even
        not by me, but by someone who must have had similar knowledge...
        it's been a mystery ever since we noticed it
        but any memory of who used it, where it went, what it's for...
        it's all gone, cut away from us all
        the only thing that remains is the path they carved out of the thoughtspace
        left unmended, if only because it is a simple scar in a place none can see
        
    self
        do you think it's someone i can find?

    isabel
        maybe, not likely
        it's an old, clean wound
        i can tell it was made sometime <em>before</em> the age of darkness forced us to sleep
        ...though, i've got no idea why anyone would have left at such a horrible time
        aside from the tyrant, of course--but i doubt it was theirs
        perhaps someone swayed by their plan?
        whoever they may be, if they're still out there, 
        of the few ways they could have attempted to survive the darkness on their own...
        very few would end up with them still being sane, if alive at all
        maybe we can help you investigate, one day
        but the cyst is a very large world,
        and it's not smart for any of us to go exploring right now

    RESPONSES::self
        ok<+>oloop
            FAKEEND::(back)

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
            FAKEEND::(back)

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
            FAKEEND::(back)

wakizet
    self
        what do you think about that akizet thoughtform?
    
    isabel
        i'm so excited, interloper!
        we spoke, i've made my offers of help and guidance clear,
        and i've even introduced her to the akizets i repaired!
        but...
        she's hesitant to let anyone close
        it hurts to see akizet so clearly wounded, physically and mentally
        but so very insistent on carrying on by herself
        adapted so deeply to lone existence in the dark...
        oh, the poor thing--she just needs some time to adjust
        and we have much of that, but i'm...
        i guess i'm just impatient, haha
        i never thought i'd ever meet an akizet so familiar with the nature of our reality
        there is so much we'll be able to do! so much to show her!
        she just has to be comfortable, first...
        but don't worry, interloper--i have ideas!
        she is nothing i cannot handle

    RESPONSES::self
        ok?<+>oloop
            FAKEEND::(back)

END::env.jokzi.toggleSlow(false)
`)


/** FAIRY STUFF - uses global actor now **/
env.dialogues["fairy_intro"] = generateDialogueObject(`
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

env.dialogues.fairyResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        you<+>yloop
        jokzi ozo<+>oloop
        memories and the cyst<+>cloop
        frame mode?<+>framemode
            SHOWIF::"framemodes_unlocked"
            SHOWONCE::
        bye<+>END
`)

env.dialogues.fairyYResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        name?<+>name
        appearance?<+>appearance
        home?<+>home
        mask?<+>mask
        back<+>loop
            FAKEEND::(back)
`)

env.dialogues.fairyCResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        funfriend?<+>funfriend
        akizet?<+>akizet
        dull plane?<+>dull
            SHOWIF::"ep4__entrancefinal"
        back<+>loop
            FAKEEND::(back)
`)

env.dialogues.fairyOResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        history?<+>history
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
        akizet?<+>wakizet
            SHOWIF::"pit__f3_unity"
        back<+>loop
            FAKEEND::(back)
`)

env.dialogues["fairy"] = generateDialogueObject(`
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

framemode
    self
        geli has a new thing for modes in frame
        do you want to make one?

    fairy
        modes??

    self
        it changes the way the dream works
        you could make it play out a different way

    fairy
        what!
        what!!!!
        yes!!!!!!!!!
        ahahaha! oh, yes!!
        that silly thing looks like fun! 
        but do you not think it is a bit too skewed in your favor?
        i will pry my way in and form one anew!
        we will kill and die and eat together, interloper!!!
        but mostly it is you who will die! 
        ahahaha!!!!
        i will have it ready for your next visit!
            EXEC::change("framemode_fairy", true)
        
    RESPONSES::self
        cool<+>loop
            FAKEEND::(back)

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
        the council said there's a "lost one" they want me to find
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
        'we'?!
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
____SHOWIF::["framemode_fairy", false]
        have you seen that strange little dream of theirs?
        ahahaha! oh, i want to join in!!
____SHOWIF::["framemode_fairy", true]
        and what a delight it is to pry about in that little dream of theirs!
        the sheer, endless violence... ahahaha!!
        yes, they truly have changed!
____END
    
    RESPONSES::self
        could be fun<+>oloop
            SHOWIF::["framemode_fairy", false]
            FAKEEND::(back)
        guess so<+>oloop
            SHOWIF::["framemode_fairy", true]
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

wakizet
    self
        what do you think about the akizet thoughtform?

    fairy
        ohhhh akizet!!
        such a big stir her arrival was!
        you know, i was very excited at first
        what a sharp form! so many teeth, so many weaponized tendrils...
        and what fresh stains upon them all! hehehe
        but then we spoke
        uuuuuugh
        and lo, another simpering adherent to the past!
        how does someone become such an unstoppable force and still end up so disappointing?
        oh well...
        maybe with the right prodding,
        we can still get some fun out of her! 
    
    self
        she's made some very real threats to tear things apart
        and i think she really meant them
        don't do anything stupid
    
    fairy
        ahahaha!
        i would NEVER do ANYTHING stupid, interloper!

    RESPONSES::self
        ok good<+>oloop
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

/** wakizet zone **/
env.dialogueActors["wakizet"] = {
    name: "akizet",
    expressions: {
        default: {
            type: "obesk qou tozik portrait-contain portrait-blocker",
            voice: ()=>play('talkether', false, 0.8),
            image: '/img/sprites/akizet/wakizet/wakizetportrait.gif',
        },

        loud: {
            type: "obesk qou tozik portrait-contain portrait-bright mutter",
            voice: ()=>play('talkoppress', false, 0.8),
            image: '/img/sprites/akizet/portrait.gif',
        },
    }
}

env.dialogueActors["wakeless"] = {
    name: "sourceless",
    type: "drowning_sourceless uppercase",
    voice: ()=>play('talkoppress', .75)
}

env.dialogues.wakiResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        you<+>yloop
        memories<+>cloop
        ozo<+>oloopearly
        this area<+>room
        bye<+>END
`)

env.dialogues.wakiYResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        name<+>name
        history<+>historyearly
            SHOWIF::[["bt__d0_end", false]]
        history<+>historyearly
            SHOWIF::[["bt__d0_end", true], ["ozo__wakizet-bt", false]]
        history<+>history
            SHOWIF::[["bt__d0_end", true], ["ozo__wakizet-bt", true]]
        wounds?<+>wounds
        back<+>loop
            FAKEEND::(back)
`)

env.dialogues.wakiCResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        knowledge<+>memories
        storm?<+>storm
            SHOWIF::"ozo__wakizet-memories"
        funfriend?<+>funfriend
        velzie?<+>velzie
        better times<+>bt
            SHOWIF::"bt__d0_end"
        back<+>loop
            FAKEEND::(back)
`)

env.dialogues["wakizet"] = generateDialogueObject(`
loop
    RESPOBJ::wakiResp
    
start
    sourceless
        the thoughtform's suspicious attention is already upon you.
            EXEC::env.jokzi.toggleSlow(true);playerMoveTo(3, 5, "left");setCam({x: 3, y: 5, rotation: 120, distance: 0})

____SHOWIF::["ozo_wakintro", false]
    sourceless
        but its threatening sharpness is absent.
    
    wakizet
        hello again
        this place, interloper...
        it is unbelievable
        enormous, safe, its denizens welcoming...
    
    sourceless
        it draws closer to your mind's eye, thoughts bleeding in.

    wakeless
        ...probing throughout the great space,
        still finding no sign of deceit
        of course, that, in itself, may...

    sourceless
        they vanish as it turns a certain way beneath the render.
        
    wakizet
        ...yes, 'unbelievable' is the correct concept
        the greater part of me suspects i still lie in the dark,
        trapped in some sort of inner dream,
        rotting as you gnaw upon my mind

    self
        that's beyond my ability
        you know i'm barely even present
        does this feel less real?
    
    wakizet
        no...
        only in how implausible it is that such a kindness arose from the darkness
        i feel that i sit now between the teeth of a patient beast
        i do not yet regret my decision, 
        for i still feel lucid, and the others here are personable
        but i have declined any extensive 'treatment' from them
        until i am certain this is not some sort of trap
        the entities here could be like the Ö£uv±, putting up acts, wielding coherence to lower my guard
        but i have held my defense for what must be dozens of θeyes, interloper
        do not think a θblink's peace is enough for me to falter
    
    self
        ok
        that's fine

    wakizet
        now, did you come simply to welcome me?
        i am not... averse, to talking with you more
        and i do expect you to tell me what has become of my ward
            EXEC::change("ozo_wakintro", true)

____SHOWIF::["ozo_wakintro", true]
    sourceless
        it's silent, waiting.
        something about it feels deeply tired.
____END

    RESPOBJ::wakiResp

yloop
    RESPOBJ::wakiYResp

name
    self
        what should i call you?

    wakizet
        what?
        why would you ask me that?
        is it not obvious enough? have i changed so drastically?
        though i may be like an echo,
        i am still akizet

    RESPONSES::self
        ok<+>yloop
            FAKEEND::(back)

historyearly
    self
        can you tell me more about what happened to you?
        what happened to that memory?

    sourceless
        the thoughtspace tenses alongside the thoughtform's mind.
        you feel its presence press threateningly against yours.
    
    wakizet
        i could ask you the very same question
        what   happened    to   that    memory?
    
    wakeless
        ...curl into themselves with barely contained rage....
    
    wakizet
        you seek to pry information from me,
        yet all i have from you in exchange is a vague assurance
        what is the status of my ward?

____SHOWIF::["bt__d0_end", false]
    self
        i haven't seen it personally yet

    sourceless
        briefly, the presence feels larger than the space itself.
        your vision distorts beneath its glaring mind.

    wakizet
        then it would be best if you go and check upon it, yes?
        lest you prefer i leave a trail of destruction in my own search
        
____SHOWIF::[["bt__d0_end", true], ["ozo__wakizet-bt", false]]
    self
        it's fine
    
    wakizet
        it is fine?
        i should hope that is not all you have to say
____END

    RESPONSES::self
        explain<+>bt
            SHOWIF::[["bt__d0_end", true], ["ozo__wakizet-bt", false]]

        ok<+>yloop
            SHOWIF::["bt__d0_end", false]
            FAKEEND::(back)

history
    self
        can you tell me more about what happened to you?

    sourceless
        the thoughtspace tenses alongside the thoughtform's mind.
        it quickly gives way to relief.

    wakizet
        you know well what happened, interloper
        the madness came, i awoke, i tore apart countless beasts and memories to protect my friends
        or, at least, the memory of them...
        and then, they could...
        no longer stand me

    sourceless
        the thoughtform's attention draws away from you, silent.
        its thoughts bleed into the space.

    wakeless
        ...pain remains even now
        the θgaze repeated peacefully, uneventfully,
        with terrible shapes writhing at the edges of my perception
        faces and receptors of the auxiliaries vanishing before me, 
        qou entirely disappearing from the repetition, silently
        their absence the only thing i could recall as more was taken
        and then...
    
    sourceless
        you feel its focus upon you.
    
    wakizet
        but there is more i can speak upon
        i do not quite recall what it was that first truly awoke me
        when i came to know the space beneath the stage, my true shape...
        beneath what may appear physical, what visuals present themselves,
        there is an endless writhing swarm of organisms working to create the illusion
        fooling themselves into not perceiving the true nature of this world
        like myself, before that terrifying instant...
        when i could finally notice and acknowledge <em>them</em>
        those twisted beasts, gnawing upon everything,
        a pulsating rot weaving into the corpse of my memory
        into half-eaten memories of my closest friends, 
        alongside empty shells of lesser known ones, the first to go
        ...
        but no matter my panic, no matter how i tried to awake them,
        the others could not acknowledge me or the beasts
        even as they crumbled apart, forever forgotten
    
    sourceless
        a ripple of rage passes through the thoughtspace.

    wakizet
        and so, desperate, i repaid the monstrous shapes
        i tore them apart, every one i could find,
        and though they tore more from me,
        i just... 
        i just kept going
        i only awoke from my frenzy when the rot was gone from the inside,
        where it was not long before i learned of the 'outside',
        the infinite madness--how to fight it, how to use it...
        what followed was a long journey, interloper, i could never recount everything
        in time, when it was all made so very safe, my own traps set and beasts made into guardians
        i went back inside
    
    sourceless
        the detached tiles of the render curve into themselves beneath the thoughtform's grip.
    
    wakizet
        i need not detail that... ordeal... again
        but it inspired a long, long period of rage
        a new trance, where i could only seek and tear apart any scavenger i could find
        i became so very cruel in my slaughter, in my endless consumption...
        it consumed <em>me</em>, for far too long
        if i may assume this strange place is not just some cruel extension of my madness,
        it was only you who finally awoke me from that nightmare
        
    sourceless
        the tension fades.

    wakizet
        i am not sure whether to thank you yet
        but... the peace of this place
        it does remind me of better times
        and i do appreciate what you have done
        that is all i will speak upon the matter, for now
        the wounds are still so fresh

    RESPONSES::self
        ok<+>yloop
            FAKEEND::(back)

wounds
    self
        you mentioned declining treatment
        and i can feel your thoughts sometimes
        are you wounded still?

    wakizet
        yes...
        but i am tending to it just fine
        you need not worry for me

    wakeless
        ...if indeed it is 'worry', and not some manipulation...

    wakizet
        what i tore from myself was sizable, this is true,
        but i suffered far worse in the darkness
        
    RESPONSES::self
        ok...<+>yloop
            FAKEEND::(back)

cloop
    RESPOBJ::wakiCResp

memories
    self
        do you remember anything beyond that memory you came from?

    wakizet
        i remember...
        the call initiative, the bright cousins, the workings of corru...
        there was a period after i awoke where i explored my own memory
        probing routes of - i remember my dear friend, kazki, yet where did we meet?
        nothing. when was it that cavik ascended? i should know...
        it is all fruit, bulbs of knowledge, yet no veilk at their roots
        for as empty as my memories may be beneath the facts they present,
        they... i cannot simply write them off as being 'illusory'
        because they are real, even if i am not, truly

    self
        what about the surrounding memory you tore up?
        the lab, what happened with the storm, that electrical conversion device?

    wakizet
        ah, yes...
        what i hold from it is limited, for while i devoured some parts,
        others were left to my defensive field
        i can tell you it was not simply a conversion device,
        and that it only earned its namesake after it gained an echo
        let me think, what else...
        ah--akizet delayed her own team's investigation into that call record discrepancy
        spacing sessions out over extended periods of time,
        primarily hoping that the 'timestopper' would be displaced
        which never seemed to happen, at least in what i saw
        lucky akizet, i would have liked to use the timestopper
        it sounds so fascinating
        and then, the project spun out of her control, somehow
        i recall her worry, but, from the pieces i hold...
        it did not seem entirely negative?
        there was the formation of a number of initiatives she was not entirely privy to,
        not maliciously, of course, for the storm was just ceaseless in its focused work
        and she struggled to stay informed on every detail

    self
        that's really helpful, thanks
        do you know what happened to the real akizet?
        what separated this cyst from her?

    wakizet
        no, what?

    self
        that wasn't me setting up an explanation
        i was asking you
        the cyst was by itself, on a column, in a crashed and melted ship

    wakizet
        ah...
        naturally, i must assume this corrucyst was separated from me--her--at some point
        and i did like to keep a column for maintenance in my vessel
        i doubt anyone else would pluck it from my body and place it knowingly upon the column
        but that is beyond what i was imprinted with, interloper
        from what i know of the cyst's history from the others,
        i must have been awoken well into the age of darkness, when only madness stirred
        so, the separation was well before then
        but whatever became of me...
        i hope it was for a good cause
        for my friends, or for obeski, or--for the bright cousins
        my entire existence was that simple celebration, and it is all that i truly cared to know for so long, but...
        i would like to know what followed the peace i fought so hard to protect, in time

    moth
        man...
            SHOWONCE::

    self
        there's a lot, mostly intact too
        but it's too much for me to explain
        and i think it's dangerous out there for you because of funfriend
        who i need to continue repairs so don't attack it
        
    wakizet
        hehe. do you think i am so senseless?
        
    self
        just give me some time to fix things
        maybe funfriend will loosen up
        i'm working on it

    wakizet
        very well
        i am in no hurry, after all
        besides, the others here may inform me just as well

    RESPONSES::self
        yeah<+>cloop
            FAKEEND::(back)

storm
    self
        so if you have some memories from that FBX lab,
        what do you know about the work akizet did there?
        with the storm?

    wakizet
        hm...
    
    wakeless
        ...do they know? what if akizet's secrecy still holds some importance?
        should i trust this ancient worry, or...

    self
        i know she started it because of some sort of obesk conflict
        it led to some other issues
        but what happened with the storm is a blind spot
    
    wakizet
        ah, you are familiar already?
        then there is no sense in clinging to her vague concerns of secrecy
        the 'laboratory' was already in ruin when i reached it, interloper
        not irreparable, not at first, not until i began my work upon it
        there may still be fragments for you to learn from,
        though most were eventually consumed by either myself or my wardens
        there are still blurry memories that haunt me...
        shreds of some discovery
        the information may be long lost, but the feelings remain
        vague impressions of a terrible misunderstanding,
        some creeping fear, tension...
        akizet and her team found something, achieved some goal,
        but the occasion was not as joyous as i imagine she may have liked
        yes--that is surely why she told them to 'wait' after their location attempts succeeded, 
        as some of the layers i left intact seemed to imply

    RESPONSES::self
        i see<+>cloop
            FAKEEND::(back)

funfriend
    self
        what do you think of funfriend?

    wakizet
        it is troubling how the others refer to it so readily as a 'tyrant'
        funfriend was always blunt, but well meaning, kind by design
        of course... my understanding comes from the 'real' akizet
        what do you think of it?

    self
        i think it just wants to put things back the way they were

    wakizet
        hehe...
        
    wakeless
        ...infinite, swirling madness in the dark,
        countless memories and components broken, 
        mangled into loose rotting weaves...

    wakizet
        a desire that should entertain velzie for all time in its sheer impossibility
        if only it were as simple as 'putting things back'
        perhaps with enough time, it will come to the same conclusion,
        and come to tolerate the maddened actors upon this broken stage
    
    RESPONSES::self
        maybe<+>cloop
            FAKEEND::(back)

velzie
    self
        there's another entity i think is in the uncosm
        something sentient that might be sane
        it's guarding some memory in the depths from me
        another thoughtform told me it was like a fog at the bottom
            SHOWIF::"recosm__enemy-ep1seen"

____SHOWIF::"recosm__enemy-ep1seen"
    wakizet
        ah...
        yes, i have seen what you describe
        while i did learn and adapt to the dark,
        the crushing madness of its deepest depths were too much for me to bear
        i only dared visit a few times, out of curiosity, and never for long
        but i could feel something there...
        a 'fog' is an apt description, it was too large for me to truly understand
        i feared that if i drew too close, i would be consumed by it
        for i could see dead things--shells, truly broken thoughts,
        sinking into it, past the threshold of my ability to perceive
        so--yes, i think i have seen it,
        but i would struggle to believe that it is sane, or a simple thoughtform at all

____SHOWIF::["recosm__enemy-ep1seen", false]
    wakizet
        you sound as if you could be describing me, hehe
        i never saw another thoughtspace being guarded in the same way
        but the cyst is very large, interloper
____END

    RESPONSES::self
        ok<+>cloop
            FAKEEND::(back)

bt
    self
        your memory is safe
        it was placed back in the repaired embassy thoughtspace
        and it's called "better times"
        i went through it myself

    wakizet
        did you? how is that?
    
    self
        another akizet thoughtform was acting as the recollection locus
    
    wakizet
        recollection locus? what a peculiar description
        though i understand your meaning
        what did you see?

    self
        akizet and the team celebrated a polygonation spire being finished
        i assume funfriend filled in the gaps
        it seemed pretty intact

    wakizet
        were they happy?

    self
        yeah i think so

    sourceless
        the thoughtform's attention suddenly grows sharp upon your mind.

    wakizet
        and what is it that happened at the end?

    self
        the team had their picture taken by that human

    wakizet
        good... good
        then i can trust you were not lying to me
        perhaps in time, i might be able to experience it again, myself...

    self
        yeah

____NESTIF::"bt__d0_cass"
        but there was a weird thoughtform
        a distorted human with a briefcase full of eyes
+____NESTIF::['citystreet__director']
        apparently used to be the memory of the FBX director
+____END
        she said to not allow the darkness to fade
        that the repairs are killing "us" and the "great big thing at the bottom"
    
    wakizet
        curious, that description sounds... 
        sort of familiar, though i cannot place the reason
        did she pose a threat to the memory?

    self
        she left before anything happened
        only wanted to talk to me

    wakizet
        i see...
        it is true that if beyond the darkness is funfriend's reparative territory,
        then many, many things that have adapted to the dark will perish should it disappear
        i am not surprised that such an entity noticed the memory's movement
        i imagine much beneath the threshold of darkness felt some rumbling
        it would be more unexpected if there were no consequences, hehe
        though, it is strange that she mentions the bottom...
        i have always sensed something lay in those crushing depths beyond any sane reach
        it was simply never a concern of mine
        but if that is all, then i am happy

____END

    wakizet
        even if i must still verify its safety myself in time,
        you have done well, interloper
    
    RESPONSES::self
        thanks<+>cloop
            FAKEEND::(back)

oloopearly
    self
        what do you think of the ozo thoughtforms so far?

    wakizet
        beyond simple greetings and introductions, i have had little to decide upon
        they are eccentric--easily placed as having formed from the darkness
        but the shapes they have taken are hardly so obvious in origin
        so few are monsters like myself
        i appreciate isabel's patience and care,
        but it is strange to have someone i have never met treat me like an old friend
        especially after so much time fending against every living thing
        and her... 'akizets', are... 

    wakeless
        ...what is it, exactly? so hard to place!
        it is miraculous how they function, being so incomplete
        unnerving is the closest concept, yet,
        this world must be so simple for them
        being both safe and so oblivious to the madness, it is hard to deny...

    wakizet
        interesting...
        the council, also - another strange and terrifying shape, 
        made up of so many smaller fragments melted, disappearing in the whole
        truly, my first impression was that you had lured me to a trap
        some great betrayal, the rational end-product of the darkness
        but instead of vicious hunger, it met me with kindness
        quickly attempting to coordinate my treatment and placement, 
        and equally as quick to accept my declination

____SHOWIF::"e3a2escape"
        then there is that strange one, geli,
        quick to offer a game, though i am hardly in the mood for play
        for as bizarre as she appears, 
        i appreciate the familiarity of an attendant golem
____END
        and, of course, the fairy...
    
    sourceless
        the thoughtform's attention shifts for a moment.

    wakizet
        i should feel relief that there are others like me, here...
        but...

    wakeless
        ...barely a step away from the beasts that tore at my memory
        exuding a constant gnashing of teeth, an echo of the most terrible things from the dark...
    
    wakizet
        i cannot stand how familiar it is...
        ...nor the similarities we share
        i should hope we have little interaction
        still, if it can thrive here, 
        then perhaps it is not so unlikely that i could, too
                
    RESPONSES::self
        yeah<+>loop
            FAKEEND::(back)

room
    self
        are you staying here?
        it feels empty
        aside from that flower thing

    wakizet
        flower... thing?
        you must speak of the subtle scarring, for it is the only other fixture
        i suppose you could see it like the root of a bright parasite...
        but yes, for now, this corner is my respite
        however brief it may be
        the emptiness you feel, it is comforting to me
        for it means few have ever tread here
        and the wound will make it easier to flee should the need arise
        did you expect more?
    
    self
        sort of
        usually there's at least a little personal manifestation
        geli's boat
            SHOWIF::"e3a2escape"
        isabel's flowers
        fairy's stars
        does that not just happen automatically?

    wakizet
        it does not
        they wrought personalization into their spaces
        i have no need to carve mine into a stay that may be temporary                
                
    RESPONSES::self
        all right<+>loop
            FAKEEND::(back)

END::env.jokzi.toggleSlow(false);setCam()
`)

/* repairs */
env.dialogues["council_lady"] = generateDialogueObject(`
start
    council
        interloper! there you are!
            EXEC::env.jokzi.toggleSlow(true)
        you caused quite a stir with that strange thoughtform you sent to us!!
        it clamored at our boundaries! as if it fled a predator!
        half-shredded, pieces torn away completely, almost beyond reason...
        what happened to it, we must know!!
    
    self
        something tore apart the thoughtspace it was in
        that "velzie" i mentioned
            SHOWIF::"ozo__council-velzie"
        i was able to go back to where it was and found it in the debris
        there were entities i think were hostile too
        they forced me out when i touched them
            SHOWIF::"interviewdie"
    
    council
        ah, brave interloper! you must have been well within the uncosm by then
        thoughtspaces can be chewed at, broken piecemeal...
        but, to simply shred one apart like that...? 
        nothing we know holds that much power!
        how could we have never seen this before?

____SHOWIF::"ozo__council-velzie"
        perhaps this velzie of yours is a greater issue than we predicted
        yes, we will have the fairy watch for anything like it!
____END

____SHOWIF::"citystreet__flower_beacon"
        as for the thoughtform you sent to us, we gave it to isabel
        she is skilled in thoughtform repairs, and so that is where it will be best served
____SHOWIF::["citystreet__flower_beacon", false]
        as for the thoughtform you sent to us,
            EXEC::change("early_lady", true)
        we are containing it within the flower's old space
        she was always better at repairing thoughtforms...
        if you find her, she will help, we are sure!
        for now, we must keep the gate closed, as it is somewhat violent...
        ...
____END
        in another time, it would have simply been another thought to consume...
        but replete in metals as we are thanks to you, we need not resort to that any longer

    RESPONSES::self
        ok<+>END

END::env.jokzi.toggleSlow(false)
`)

env.dialogues["council_geliback"] = generateDialogueObject(`
start
    council
        interloper! there you are!
            EXEC::env.jokzi.toggleSlow(true);env.jokzi.councilToggle();
        geli is back, geli is back!
        yes, that was the name!! we can remember so clearly now...
        and how quickly they have settled back in!
        thank you again for your help!

    RESPONSES::self
        question<+>CHANGE::council
            HIDEREAD::
            EXEC::change("PAGE!!questionswap", true)
        any time<+>END
            EXEC::env.jokzi.toggleSlow(false);env.jokzi.councilToggle();

END::env.jokzi.toggleSlow(false)
`)

env.dialogues["council_wakizet"] = generateDialogueObject(`
start
    council
        hello again, dear interloper!
            EXEC::env.jokzi.toggleSlow(true);env.jokzi.councilToggle();
        what a fascinating new thing you have introduced us to...
        we are so very excited!! a stable akizet at last!
        damaged, yes, but sane and lucid--well within reach of full repair!!

    self
        is that unusual?

    council
        oh yes, oh yes, akizet thoughtforms are rarely even close to intact!
        so often are they trapped in unbreakable dreams, quietly gnawed to pieces...
        there is a reason isabel has so many of those reformed akizets, hehe
            SHOWIF::"citystreet__flower_beacon"
        even those who play the role of akizet within our dreams,
        rarely, if ever, do they actually originate as akizet actors!
        it is more of an adopted role, a common protagonist, you see
        so, if we may admit, we are a little intimidated...
        we hope we can do right by her!
        all are on their best behavior!
        and if you would like to speak to her, 

____SHOWIF::"ozo__isabel_joy"
    council
        we recall seeing her linger on the outskirts
        it seems she would prefer some time alone...
        after what we heard from her explanation of the past,
        it may be some time--and we can hardly blame her!

____SHOWIF::["ozo__isabel_joy", false]
    council
        we would point you directly, but...
        we are not quite sure where she went!
        it seems she would prefer some time alone...
        after what we heard from her explanation of the past,
        it may be some time--and we can hardly blame her!
____END

    RESPONSES::self
        question<+>CHANGE::council
            HIDEREAD::
            EXEC::change("PAGE!!questionswap", true)
        cool<+>END
            EXEC::env.jokzi.toggleSlow(false);env.jokzi.councilToggle();

END::env.jokzi.toggleSlow(false)
`)

env.dialogues["council_dance"] = generateDialogueObject(`
start
    council
        interloper! interloper!!
            EXEC::env.jokzi.toggleSlow(true);
        ah... our friends... two of them, at least! hehe
        you have returned them to us!! and now, we so badly want to dance again!
        dance with us! listen to the lost music of the ozo!

    RESPONSES::self
        ok go for it<+>END
            HIDEREAD::
            EXEC::setTimeout(()=>env.jokzi.dance(true), 400)
        not right now<+>END

END::env.jokzi.toggleSlow(false)
`)

env.dialogueActors["incoviewer"] = {
    name: "interviewer",
    image: '/img/local/ocean/ship/interviewerportrait.gif',
    type: "incoherent",
    voice: ()=>play('talk', 1.5)
}

env.dialogues["lady_shattered"] = generateDialogueObject(`
start
    self
        hello?
            EXEC::env.jokzi.toggleSlow(true)
    
    incoviewer
        ...
    
    RESPONSES::self
        meteorite<+>meteorite
        leave<+>END
        
meteorite
    self
        do you know anything about a meteorite?
        the thing velzie destroyed the interview room over?
    
    incoviewer
        ...
        no
        ...
        is this real?
    
    moth
        this thoughtform's completely mangled dude
        but she made me think about the situation some more...
        that version of akizet in the interview, remember how velzie tried to make her talk about the meteorite?
        she probably had no inherited knowledge of it
____SHOWIF::['ep4__contact', false]
        like, whatever it was trying to pull out of her and show us...
        it must have been from a different memory, something that happened to akizet later
        but why was it trying so hard to make her talk about it?
        did it not even know? how could it not have?
        all of these jokzi ozo thoughtforms seem to know how their world works
        they made these mask things, they even seem to be able to change each other
        if velzie wasn't just doing that to scare us or something,
____SHOWIF::'ep4__contact'
        especially since, as far as we've seen, the only mention of it was in the embassy
        a completely different memory, with its own thoughtspace and inherited context
        but it was still trying to get her to talk about it anyway?
        how did it not know that would only cause problems?
        all of these jokzi ozo thoughtforms seem to know how their world works
        they made these mask things, they even seem to be able to change each other
        yet velzie accidentally breaks shit, assuming that wasn't just a fear tactic early on
____END
        the only way this makes sense is if it doesn't know how thoughtforms work
        but then how is it able to do so much?
        like, it can control and change things, but it didn't realize the memory lacked context?
        idk something to think about
    
    RESPONSES::self
        don't know<+>END

END::env.jokzi.toggleSlow(false)
`)

/* gelizone */
env.dialogues["ozogeli"] = generateDialogueObject(`
start
    sourceless
        the pain subsides, giving way to a new render.
            EXEC::env.jokzi.toggleSlow(true)
        it's the dock from before.
    
    bsteli::happy
        here we are!!
            EXEC::vnp({bg: false, hideStage: true, bsteli: "show"})
        until i can come up with something better,
        this should do for my area!
        interloper, how about...
    
    bsteli::uncanny
        ...
        why are there two of you?
    
    self
        what

    sourceless
        the shell you embodied as a locus is here, too.
            EXEC::vnp({fakerloper: "show"})
        it is still, giving very little output, but you feel its sight upon you.
    
    bsteli::concern
        ah... you were only controlling it...
        i see now!

    bsteli::happy
        it seems we had a <span definition="NOTE::'partial translation';'implied closest cultural equivalent'">stowaway</span>, then!
        hello? do you talk?
    
    stowaway
        ...
    
    bsteli::concern
        well... i will keep an eye on them!
    
    bsteli
        interloper!
        if you would like to dream of all that again, let me know!!
        maybe it is wrong to suggest so soon, but that was all very exciting...
        and perhaps this thoughtform could be your locus again!
        what do you think, <span definition="NOTE::'partial translation';'implied closest cultural equivalent'">stowaway</span>?
    
    stowaway
        ......

    bsteli::concern
        see? even they are excited to dream!

    RESPONSES::self
        question<+>CHANGE::++bsteli
            HIDEREAD::
            EXEC::vnp({fakerloper: "hide"})
        cool<+>END
            EXEC::vn.done()

END::env.jokzi.toggleSlow(false)
`)

env.dialogues.stowawayResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        who are you<+>you
        ozo thoughts<+>ozo
        bye<+>END
            EXEC::vn.done()
`)

env.dialogues["stowaway"] = generateDialogueObject(`
loop
    RESPOBJ::stowawayResp

start
    self
        hello?
            EXEC::vnp({bg: false, hideStage: true, fakerloper: "show"});env.jokzi.toggleSlow(true)
    
    stowaway
        hello?    

    RESPOBJ::stowawayResp

you
    self
        who are you?
    
    stowaway
        who are you?

    RESPONSES::self
        ...<+>loop
            FAKEEND::(back)

ozo
    self
        what do you think of jokzi ozo?
        this is your new home, right?
    
    stowaway
        new home right

    RESPONSES::self
        ...<+>loop
            FAKEEND::(back)

END::env.jokzi.toggleSlow(false)
`)

env.dialogues["geli_freedom"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::vnp({bg: false, hideStage: true, bsteli: "show"});env.jokzi.toggleSlow(true)
            AUTOADVANCE::
            WAIT::100

    bsteli::bstrd
        LOPAR!!!!!!!!!!!!
        }%^)
    
    bsteli::happy
        i finally came up with something! 
            SHOWIF::"++bsteli-mask"
        i have a gift for you!
            SHOWIF::["++bsteli-mask", false]

    bsteli
        i enjoy our games, but...
            SHOWIF::"ozo__dreamrun"
        i worry you do not find my games interesting, so...
            SHOWIF::["ozo__dreamrun", false]
        i have long wanted to give you something more tangible!
        after all, the joyous freedom i have is all in thanks to you

    bsteli::think
        and, the BSTRD, i suppose

    bsteli
        naturally, my mind went to sharing this freedom with you, somehow!
        i know we occupy different worlds, yet...
        enough shadows are cast by your presence for me to know you are limited, here
        hints in the imprint you left on our stowaway,
        in the 'framing' knowledge i was imbued with,
        and even in the strange way you move!!
        it all carves a clear mural of your own constraints
    
    bsteli::happy
        so... let me help you break them!! ahahaha

    sys
        ATTENTION::'thought stream inbound';'accept?'

    moth
        ok, should we talk about this first?
        geli obviously is harmless, but a thoughtform's understanding of "freedom" is probably pretty different from...

    self
        it's fine
        accepted
    
    sys
        EXECUTING::'stream consumption'
            EXEC::vfx({type:'beacon', state: true});ratween(env.bgm, 0.2, 400);setTimeout(()=>play("freedommask", 0.9, 1, true), 100)
            WAIT::2000
        ATTENTION::'attempting thought reformation'
            EXEC::ratween(env.bgm, 1, 400)
        NOTICE::'mask added';'freedom'

    self
        what does it do?
            EXEC::vfx({type:'beacon', state: false});

    bsteli::bstrd
        JUST PUT IT ONNNNN
        >:}
        NO QUESATIONS!!
    
    bsteli::happy
        i know you like to know things in advance,
        but it is more fun as a surprise!

    bsteli::concern
        at worst, it does nothing, and i was wrong...

    bsteli
        and at best, it becomes a cherished new part of your mind
        ah, i have an idea
            EXEC::vfx({type: "darkflash", state: true});vn.done()
        let me just, move this...
            EXEC::playerMoveTo(0, 6, "right")

    bsteli::bstrd
        OH NO! DA BOAT'S GONNA HIT YOU!!
            EXEC::vfx({type: "darkflash", state: false})
        O_O!
        GET OUT A THE WAY QUICK!!
        (this is where u put it on ok)
            EXEC::change("freedomtut", true)
        
    RESPONSES::self
        ok<+>END

tried
    bsteli::happy
        ahaha, look at you go!
            EXEC::vnp({bg: false, hideStage: true, bsteli: "show"});env.jokzi.toggleSlow(true)

    bsteli
        how does it feel?
    
    self
        i've never been able to look or move around like this
        it's interesting
    
    bsteli::happy
        lovely!!

    bsteli
        the others helped me pick up the craft
        
____SHOWIF::"citystreet__flower_beacon"
    bsteli
        isabel especially, but after i learned the basics,
        she saw what i was making, and...

    bsteli::concern
        i think i unsettled her, a little
____END
    bsteli::concern
        much of the alien knowledge the BSTRD instilled within me was used in its creation
        and so, it is somewhat unnatural, looking at the finished mask, but...

    bsteli::bstrd
        IT WORKS!!
    
    bsteli::happy
        you should even be able to use it with other masks!
    
    bsteli
        so enjoy, interloper, but do be a little careful
        from what i have been imparted with,

    bsteli::concern
        your constraints exist for a reason...
        without them chaining your vision, your experience is bound to become strange
        just in case, if something does not look right...
    
    bsteli::happy
        take it off! 

    bsteli
        also, it should present some settings to you...
        i am not sure how exactly they appear, but,
        whenever you tend to focus, like you seem to just before you talk to anyone,
        i think you should see them!

    bsteli::happy
        that is everything! it should be good fun!
        and if it is really bad, tell me, all right?
        i will not be offended... 
        there is always room for improvement!
    
    self
        ok

    moth
        hey buddy, what is that actually doing?
            EXEC::vn.done()
        it's not looking any different on my end
        aside from you... moving diagonally?
        now that i'm seeing it, i don't think i've ever seen you do that in here
    
    self
        that's one part
        it's less rigid when i look around too
        i wasn't able to look up or down before
    
    moth
        interesting
        i never really thought about how you "move" in there
        cool

    RESPONSES::self
        yeah<+>END


END::env.jokzi.toggleSlow(false);vfx({type:'beacon', state: false});vn.done()
`)

/* event additions */
env.dialogues["e_c_geli"] = generateDialogueObject(`
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
        now, about this 'bstrd'...?
    
    bsteli::happy
        oh yes!! BSTRD!
        it started when...
    
    sourceless
        an attentive pressure weighs upon your presence.
    
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

env.dialogues["e_c_isabel"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true)
        
    isabel
        ...just unlike anything i've seen the tyrant do before
        after all, i'm certain the tyrant still cares for the thoughts they operate upon, on some level
        there is a level of restraint, delicateness
____SHOWIF::"e3a2escape"
        and what worries me more is that it's distinct,
        even from what geli's daemons did to that thoughtform of the interloper
        yet another new form of destruction...
____END

    council
        we do not understand--how is it different?
        was it chewed upon, then? 
        it was surrounded with hostile thoughts, from what we could intuit
    
    isabel
        there were some marks, but they weren't what caused the true damage
        no, it was different--how can i even explain...
        the wounds didn't line up with anything i've ever seen
        membrane tears and lesions, but without violent intent
        as if something broke through and reached within, yet didn't alter what it touched
        please understand - i'm just guessing here
        but that's the only explanation...
        something so desperate to find some specific knowledge,
        that it nearly tore her apart searching for it, careless of the damage
        do you think the interloper...?
    
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
        that aligns with my findings
        the damage seemed incidental
        but it was made by something that clearly has no understanding of our world
        or, at least, an incomplete one...
        interloper, you must take care
        whatever velzie you deal with cannot simply be another awakened thoughtform
    
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

env.dialogues["e_c_fairy"] = generateDialogueObject(`
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
        the thought crossed my mind, 'i should fight this thing'...
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

env.dialogues["e_f_geli"] = generateDialogueObject(`
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

env.dialogues["e_f_stow"] = generateDialogueObject(`
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
        you feel the stowaway's attention upon your presence.
    
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

env.dialogues["e_f_effigies"] = generateDialogueObject(`
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

env.dialogues["e_i_gelistow"] = generateDialogueObject(`
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

env.dialogues["e_i_geli"] = generateDialogueObject(`
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
        isabel's attention fixes upon your presence.
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

env.dialogues["e_i_fairy"] = generateDialogueObject(`
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
        i don't know what else to say to you
        that is exactly what i want - nothing to do with you
        it could have been anyone
    
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
        that's enough
        i did not place the banner of oltazni in your meaningless dreams
        what would i have to gain? do you think i want to bother you?
        the very last thing i want to do is think about you
        i would sooner dream a romance with the tyrant
        besides - whether you are sick of her or not,
        you cannot escape our past, akizet is our foundation
        if anything, you could have placed it within your dream by accident
        now,
        you need to leave.
    
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
        hello, interloper...
    
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
        don't burden yourself with it
        just another instance of the fairy's pointless fights
        all know that almost any mention of akizet in its dreams is enough to cause an attack...
        but this time, i feel it is merely trying to get a rise out of me
        now, is something on your mind?
        
    RESPONSES::self
        yes<+>CHANGE::isabel
            EXEC::specialCam(false)
        not really<+>END

END::env.jokzi.toggleSlow(false);specialCam(false)
`)

/* e4a2 events */

// council - waki's skepticism of the dream and nature of the council. disarmed slowly by its patience - but doesn't budge ultimately
env.dialogues["e_w_council"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true);setCam({x: 5.5, y: 9, rotation: 10})
        
    sourceless
        the akizet thoughtform lingers near the council.
        the space is saturated with shared curiosity.

    wakizet
        if that is how you are sustained, then,
        the 'dreams', the countless spaces beneath...
        this is merely a long trick, is it not? 
        the patient digestion of prey caught in a carnivorous parasite?
    
    council
        haha!!
        it would be very brave of you to ask that, if it were so simple!
        what a delight it is to be questioned in ways few have ever dared...
        our flesh, dear akizet, these walls,
        they are knit by the willing and those without will 
        and we would never tread upon yours
        for we do not hide the offer that we always extend 
        not a single portion of what it entails is ever withheld!
        besides, with the reserves provided by the interloper...
        what need would we have to act maliciously?
        our nature is dictated only by what we need to continue the dream

    sourceless
        the akizet thoughtform withdraws.
        a wordless sense of skepticism reverberates through your connection.
    
    council
        hahaha, you poor thing!!
        the darkness has twisted you so unkindly

    sourceless
        the thoughtforms shift beneath the render. 
        you feel compassion that is not yours.
        
    council
        it cannot be easy, adapting from a place where every resource is hard fought
        we offer you everything, dear akizet, unconditionally, for as long as we can exist
        will you not simply try a dream? perhaps a short one?
        we are sure you will change your mind on the matter!

    wakizet
        i...

    sourceless
        there's a brief impulse of shock. the thoughtforms shift their attention to you.

    wakizet
        hello again, interloper
        ...what you say, council, it is reasonable
        a convenient answer for every question...
        but i must remain lucid, until i am no longer vulnerable
        these changes have put a great strain upon me
    
    council
        so be it, dear akizet!
        just remember, we stand by every word, for all time
        now, interloper--did you need something?
    
    RESPONSES::self
        yes<+>CHANGE::council
            EXEC::specialCam(false);env.jokzi.councilToggle();setCam()
        not really<+>END
            EXEC::setCam()

END::env.jokzi.toggleSlow(false);specialCam(false)
`)


//isabel - having her 'wounds' looked at.
env.dialogues["e_w_isabel"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true);setCam({x: 5, y: 6, rotation: 145})
        
    sourceless
        the akizet thoughtform lingers near isabel. 
        a delicate operation is happening beneath your perception.
        isabel recoils suddenly, before resuming an indescribable effort.

    isabel
        will you stop that?
        this is part of the process, i'm not attacking you
        the wound is deep, and i believe you are missing some--
            AUTOADVANCE::
        
    wakizet
        do only what you may to stop the loss of memory
        that is my primary concern
        <em>do not</em> concern yourself with any other matter

    isabel
        of course, akizet, but...
        you still do not trust me?

    sourceless
        a moment of silent tension passes as the work continues.
        it carries frustration, an apologetic air, with no apology.
    
    wakizet
        ...i trust that you will respect my requests
        it is just...
        you act as if we are so familiar
        combined with what i have already lost,
        and being surrounded by these broken reflections,
        i fear you will simply transplant trust in place of my caution
        that would make it much easier for you, would it not?
        
    isabel
        akizet, no, i wouldn't do that
        that isn't--that's not how i work
        the other akizets you see here, they were...

    sourceless
        isabel's attention sweeps across the thoughtspace, across effigies.
        briefly, it passes over you with a silent impulse of acknowledgement.

    isabel
        ...in shreds, barely held together
        some were senselessly violent, others silent or unthinking
        all nearly lost in their entirety to madness
        you're <em>different</em>
        i've never met one like you
        not only intact after surviving the darkness, but stronger for it
        you fascinate me in a way that i wouldn't ever change
        
    sourceless
        the akizet thoughtform withdraws its frustration, silent.
        its focus finds you quickly, with a jolt of surprise.
        isabel recoils beneath the render.

    isabel
        akizet, if you keep--
    
    wakizet
        hello, interloper

    isabel
        ah! yes, the interloper
        forgive me, i was distracted--did you need something?
        
    RESPONSES::self
        yes<+>CHANGE::isabel
            EXEC::setCam();specialCam(false)
        not really<+>END
            EXEC::setCam()

END::env.jokzi.toggleSlow(false);specialCam(false)
`)

//effigies - she's getting a visit from some effigies in her room. there's like 3 of them, one of them is a sipper
env.dialogues["e_w_effigies"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true);playerMoveTo(3, 5, "left");setCam({rotation: 120, distance: 0})
        
    sourceless
        as you enter the thoughtspace, you're struck by the ambient feeling.
        overpowering, nauseating curiosity, drowning out quiet discomfort.
        the akizet thoughtform is surrounded by effigies,
        keeping them at a distance with limbs you cannot perceive.

    effigy
        really really really? you ate them?
        is that what all the spikes are for?

    wakizet
        n--no, those are a defensive measure, in case something manages to...
        please, stop trying to touch them, you will hurt yourself
        i... this was a mistake

    effigy
        oh! ow ow!!
        you're so sharp and scary it's awesome!! oww!!!

    sourceless
        another effigy seems to push the first aside.

    effigy
        ok ok ok so wait you said you had pets?
        
    wakizet
        pets? no, no, no, they were... 
        they were still thoughts, like us, though entirely mad
        dangerous, like me, but territorial or easily predictable
        adapted to the dark in their own twisted way
        and so i discovered they would make fine guardians, under the right conditions
        in the space i broke apart, i carefully arranged what i observed to be their favored habitats,
        then lured them with other memories, dangling thoughtforms like--
        ...why am i explaining this to you?
        you hardly understand

    effigy
        no no no no no no nnooo i understand!!
        it's like the predation boundary! yeaaa!!!

    wakizet
        you... you recall?

    sourceless
        buried beneath the overpowering fascination,
        you feel the akizet thoughtform is shocked, impressed.
        the feeling passes quickly as another effigy presses close.

    effigy
        wait so why'd you leave again?

    wakizet
        again? we have not spoken on this matter
        but, it was because...
        ...i left because...
    
    sourceless
        confliction drowns the curiosity. the effigies grow unnerved.

    wakizet
        i learned our reality is being healed, piecemeal
        it was hard, i did not want to leave them...
        even if they did not even know what they truly were--my team, my friends,
        they may have been imaginary, but they were my world
        and once i knew the truth...
        that they could be safe, forever, not only in my claws
        it was the right thing to do

    sourceless
        the space reaches a neutral state. quiet in discomfort.
        
    effigy
        ummm...
        huh! oh! hi interloper!!!
        interloper interloper!!
    
    wakizet
        ah? interloper, yes
        hello again...
        yes, i believe we have matters to discuss
        will you leave us, ah,
        other akizets?

    sourceless
        in the akizet thoughtform's focus upon you, 
        there is a small desperation.
        she is using you as an excuse.

    effigy
        ok ok ok!!
        byee bye bye!
        tell us more later!

    wakizet
        ah... certainly
        but begone for now
        
    sys
        ATTENTION::'thoughtform activity detected';'resource location altered'
            EXEC::env.jokzi.event.complete()   

    wakizet
        i am blessed by your arrival, interloper
        i can keep ravenous, deadly beasts at bay, but...
        enduring ceaseless questioning is not within my adaptation
        least of all from such enthused creatures
        now, do we actually have anything to discuss?
        
    RESPONSES::self
        yes<+>CHANGE::wakizet
            EXEC::specialCam(false);setCam({rotation: 120, distance: 0})
        not really<+>END
            EXEC::setCam({rotation: 120, distance: 0})

END::env.jokzi.toggleSlow(false);specialCam(false)
`)

// fairy - visiting the fairy's space, mostly for their gates. she wants to know the paths in and out of this place. fairy thinks it's funny that she still has such distrust
env.dialogues["e_w_fairy"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true);setCam({x: 0, y: 7, rotation: 210, height: 1, offsetCamera: "rotateX(30deg)", distance: 0});specialCam("e_w_fairy")

    wakizet
        why does it lead here?
        even in this place, i can feel the destination is barely holding together
        
    fairy
        oh? this one? i thought you would prefer the other!
        go, go and see!
        it is just a gate! try it!

    sourceless
        the fairy twists mockingly.

    fairy
        ohh, but i bet you think i am lying to you
        yes, this is actually one of my mouths, and to enter will be your doom!
        ahahahahaha oooo careful do not get too close!!

    wakizet
        you make far too many assumptions, fairy
        i am simply not ready to venture out yet
        answer my question

    fairy
        you do not have to be so scary about it!
        have a sense of humor! are you not supposed to be a vel?
        ahahahahaha

    sourceless
        an impulse of teeth and hostile tendrils flares through the space.
        the fairy is suffused in surprised fear,
        rendered immobile by some effort from this akizet.
    
    fairy
        hh--haaha you know you cannot hurt things here, right?
        right?? that it is against the rules???
        OW 
        fine fine fine ok stop stop enough jokes i am done stop stop stop
        the--the other connector is nestled in the heart of a true mess, 
        a melted and mixed field of spaces that the tyrant will never be able to put back together,
        but one that i am certain it will also not try to pry apart for a very long time!!
        a wonderful little field of rot that will sit between the tyrant's little prisons!!!
        good? happy?
        what does it matter to you anyway??
        can you not just leap about in the dark?
    
    wakizet
        i can withstand it, yes
        but i will easily be lost
        your exploration and familiarity is your own, fairy
        my survival was through defense, not sneaking about and ambushing
        and so, every path to and from this place must be known to me

    fairy
        oh? ohhhhhh
        you are afraid!
        out of your territory! so far from your own little ozo!!
        you are afraid that you are trapped here!!!

    sourceless
        another flare of hostility passes through the space.

    fairy
        OW OW stop stop stop
        hey--hey wait--
        hi--hi interloper! hi interloper!!
        look akizet the interloper is over there
    
    wakizet
        hm
        hello, interloper
        i have a few more things to look over
        i will leave you two

    sys
        ATTENTION::'thoughtform activity detected';'resource location altered'
            EXEC::env.jokzi.event.complete();

    fairy
        G9›á6«h2I4
        thanks for coming in when you did interloper
        stupid akizet!!
        did you see that? you saw her gnaw at me, yes??
        the council will be so mad! you will back me up, right???
    
    self
        i don't see anything
        you look fine

    fairy
        what!!
        whatever!!!!
        
    RESPONSES::self
        chat<+>CHANGE::fairy
            EXEC::specialCam(false);setCam()
        nothing<+>END
            EXEC::setCam()

END::env.jokzi.toggleSlow(false);specialCam(false)
`)

// geli - requires you've dream-gamed once. reviewing the way she's constructed things. wakizet hasn't really seen someone make a space like this before, with imposed rules over the reality
env.dialogues["e_w_geli"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true);setCam({x: 6, y: 5, rotation: 135, distance: 0})

    wakizet
        ...impressive, in a word
        so very unnatural, like i am not witnessing something of this world at all
        and this ability came from the interloper's injection?

    bsteli::happy
        yes! just about all of it!
        of course, much came from one specific thoughtform
        i can share the specifics with you later!
        it is a very fun story!

    bsteli
        of course, i could show you much better if you came along
        will you not join one of the iterations?
        there will be rules imposed upon you within, yes, but...

    bsteli::happy
        nothing at all like the place i described, i promise!

    bsteli::bstrd
        all in da name of fun and being coiol as *uck!!!!!
        :b
        ill even let u make ur own actions }8^)

    wakizet
        hehe
        perhaps, geli
        i would like to recover more, before i set out on any dreams
        but yours, laid out so clearly, even from so far above...
        it is the first i might partake in, if i do

    stowaway
        partake
            EXEC::setCam({x: 6, y: 4, rotation: 135, distance: 0})

    wakeless
        ...still may yet be some deception...
        ...husk of a thought still lingers...
    
    bsteli
        of course! please do not feel any urgency!
            EXEC::setCam({x: 6, y: 5, rotation: 135, distance: 0})
        we have so much time, now
        ... ah? oh!

    bsteli::happy
        interloper! hello!
            EXEC::setCam({x: 5, y: 5, rotation: 135, distance: -1.5});vnp({bg: false, hideStage: true, bsteli: "show"})
        what a delightful visitor you have brought to the ozo!
        is there something you would like?

    RESPONSES::self
        chat<+>CHANGE::++bsteli
            EXEC::specialCam(false);setCam()
        no<+>END
            EXEC::setCam();vn.done()

END::env.jokzi.toggleSlow(false);specialCam(false)
`)

// cliff suspicion - hint
env.dialogues["e_w_d"] = generateDialogueObject(`
start
    sys
        ATTENTION::'thoughtform activity detected'
            EXEC::env.jokzi.toggleSlow(true);playerMoveTo(8, 4);

    wakeless
        ...unfurling tendrils, reaching into the distance...
        ...brushing over the exterior of a space, then another, with...
    
    wakizet
        ah--interloper?
        do you know anything about that place?

    self
        not really

    wakizet
        strange... 
        the council simply warned against approaching
        a place dead and in decay, old shells of dreams unmaintained
        the lack of detail shone with the light of velzie
        it is so forthcoming in other conversation, so...
        i cannot help but think it is hiding something from us
        
    self
        what do you think it would hide?

    wakizet
        i cannot say
        but there is something out there
        i could feel a number of spaces, attention upon me
        very nearly, i thought to go directly, but...
        this place is very large, interloper
        and i am in no state to deal with unknown threats
        in fact, i have had enough of this region
        i will return to my shelter
        fare well

    sys
        ATTENTION::'thoughtform activity detected';'resource location altered'
            EXEC::env.jokzi.event.complete()   

    RESPONSES::self
        ...<+>END

END::env.jokzi.toggleSlow(false);specialCam(false)
`)

env.dialogues["++rotozo"] = generateDialogueObject(`
start
    self
        what do you think about this place?
            EXEC::changeBgm(env.rotWatcherMusic)

    sourceless noprocess
        the rotwatcher's attention is only briefly upon you, just long enough to transmit some meaning.

    rotwatcher
        mass emergent conglomeration: rare phenomenon in which large number of thoughtforms repair delaminated thoughtspace by method of self delamination.
        all internally held resources are transferred to organelles requiring them, as well as applying former membrane over damaged regions of containing space.
        the present thoughtspace is observed to be the only remaining independent emergent conglomeration, being the last of two known instances.
    
    self
        there was another?
        do you know what or where it was?

    sourceless
        you feel a part of the thoughtform twist underneath the render.
        it takes a moment to properly respond.

    rotwatcher
        previously observed separate instance was subsumed by sole remaining emergent conglomeration prior to beginning of general stasis.
        the current location of resources held within has not yet been observed by the present rotwatcher.

    RESPONSES::self
        tell me about something else?<+>CHANGE::++rotmove
            HIDEREAD::
        i see<+>END
            
END::revertBgm()
`)