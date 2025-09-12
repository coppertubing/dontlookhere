
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
        they are calling me an 'interloper'
    
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
        the council sways idly
        their mind is fixed upon yours, awaiting the slightest impulse

    council
        interloper, interloper!
        come, speak with us!
        we tire of the silence

____SHOWIF::[['PAGE!!introswap', false], ["PAGE!!depressed", false], ["PAGE!!questionswap", false]]
    sourceless
        the council dances idly
            EXEC::env.jokzi.toggleSlow(true)
        their mind is fixed upon yours, awaiting the slightest impulse

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
        the only shred we recall is that we--the cyst--were torn from her body for one reason or another!
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
        the thoughtform's mind is quiet, waiting for you

____SHOWIF::['PAGE!!isaswap', false]
    sourceless
        the thoughtform's attention is elsewhere at first
            EXEC::env.jokzi.toggleSlow(true)
        but it feels your mind's eye, and attends to you
    
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

____SHOWIF::['PAGE!!flowers', 'done']
    isabel
        for now, perfect, interloper
        i have a connection with my akizets, you know
        when they are near, i feel at peace,
        and when any are missing, i can tell immediately...
        that feeling, the gloom that hangs over me, it is gone
        and it is thanks to you
        but for now, i have nothing to offer you in return...
        give me some time
        but while you wait, enjoy the beauty you have restored!
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
        still, i owe you...
        the mask i am preparing for you will serve you well

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
        the council talked about a third 'lost one'
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
        apprehension bleeds from the thoughtform
    
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

END::env.jokzi.toggleSlow(false)
`)


/** FAIRY STUFF **/
env.dialogueActors["fairy"] = {
    image: '/img/local/uncosm/ozo/sprite_portrait.gif', 
    type: "thoughtform fairy awakened portrait-haze portrait-auto portrait-center",
    voice: ()=>play('talkfairy')
}

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