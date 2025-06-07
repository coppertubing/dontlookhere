env.localization.page['ozo'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "this place is wild": "дикое место",
        "about jokzi ozo": "о джокзи озо",


        /*isabel to unity*/ 'and what a home it is, right?': '',
    }, 
    entityDescriptions: {
    },
}



// ISABEL

env.localization.page['ozo'].dialogues["isabel_intro"] = generateDialogueObject(`
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

env.localization.page['ozo'].dialogues.isabelResp = generateDialogueObject(`
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

env.localization.page['ozo'].dialogues.isabelYResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        name?<+>name
        home?<+>home
        masks?<+>masks
        back<+>loop
            FAKEEND::(back)
`)

env.localization.page['ozo'].dialogues.isabelCResp = generateDialogueObject(`
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

env.localization.page['ozo'].dialogues.isabelOResp = generateDialogueObject(`
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

env.localization.page['ozo'].dialogues["isabel"] = generateDialogueObject(`
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

