/*
    cor-RU - a russian localization mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/vessel-surface.js
    localization for /local/ocean/ship/deck

    progress: nothin (all ported) as of 12.10.2025
*/

env.localization.page['deck'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "bright guardian": "",
        "guide": "",
        // --- unity this guyyyyy
        "That's a nice idea, but I'm way too tired.": "",
        "Maybe tomorrow.": "",
        'he must be speaking to his communicator...': '',
        // --- doors hate youuuuuu
        "NOTICE::'prohibitive incoherence'": "",
    }, 
    entityDescriptions: {
        'bright guardian': `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'degraded visual profile'">::INCOHERENCE DETECTED</span>`
    }
}

// === DIALOGUES === //

env.localization.page['deck'].dialogues["navy"] = generateDialogueObject(`
start
    sourceless
        a comfortable, cold darkness greets me as i amble out of the dead hatch
        the curiosity of the bright cousins is insatiable,
        so thorough and relentless that their star has had time to leave our sight yet again
        my guide awaits, a communicator in one hand,
            EXEC::playerMoveTo(3, 4, "up");setCam({x: 3, y:4, rotation: 180})
        and in the other, between clawless fingers, a smoldering white cylinder
        an ingestion method for a stimulant, as i understand it
        the hatch swings shut behind me under its own weight, and his eyes lift from the glow of his communicator

    guide
        Hello, Akizet.
        
    sourceless
        the greeting is joyless
        before he speaks further, he brings the cylinder to his lips
        the smoldering end brightens, then crumbles away with some slight movement
        
    guide
        That went pretty long. More talk about the <span class="code">call</span>?

    akizet
        yes, θ█████...
        ...to little end, unfortunately

    sourceless
        i feel his gaze upon my receptors, curious, as they curl with quiet frustration
        after all, much delight has come from offering what we know to each bright questioner
        without condition, without exception
        it is their right to know all that we do, to share in all our progress
        yet the progress on this particular subject is infuriatingly small
    
    akizet
        i understand the questioning
        it mirrors our own clawing at the truth
        but... it has only served to highlight to both of our peoples,
        how little is truly understood, even after all this work and time
        as you well know, i am a key figure in its research, so...
        when the answer to clawfuls of questions in sequence is simply,
        'we do not know,' in one form or another,
        it is... 
        it is almost shameful

    sourceless
        i hold, letting the gentle frustration leave me

    akizet
        but there is so much other knowledge that we can offer,
        so much more!! that it is hardly a problem

    sourceless
        the guide is silent, watching me still, an unfamiliar shape upon his face
        not a smile, not a directed displeasure, but...
        it bears similiarity to those i have seen upon my questioners in response to my answers
        just before they remark upon the strangeness of our similarity again

    akizet
        regardless--is there another awaiting my word?

    guide
        Most of the labcoats are either sleeping, or wrapping up.
        It's sounding like initial meetings are winding down.

    sourceless
        he breathes again through the ashen cylinder

    guide
        It was <span definition="INHERITED CONTEXT::'time specification';'well before the return of the bright cousin's star'">2AM</span> when I took over, and you were still going from yesterday...
        You aren't tired?
    
    akizet
        not in a way that matters, θ█████
        the wakefulness of θdeath often feels inescapable
        a ceaseless river of experience, unbroken,
        and so, i could answer a thousand questions more, a million, so long as i...
        
    sourceless
        the guide's shoulders shift low, expression flattening
        with a tap of his fingers, the cylinder sheds its burnt particulates
        i can nearly see a reflection of my larval self, 
        being told to commence a search operation just after completing another

    akizet
        i...
        ...actually, i believe i should return to the embassy to report what has been discussed
        would you show me the way back to my dull vessel?
    
    sourceless
        there is confusion, a short and quiet breath, a small smile

    guide
        Sure.
        
    RESPONSES::akizet
        set out<+>END

END::setCam()
`)


getLocalizationForPage(true) // --- ensuring that Nothing Gets Fucked Up