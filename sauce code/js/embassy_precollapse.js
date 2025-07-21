//ents
createEntity({
    name: 'recollection::AÃ¦Â§<Ã¤YfÂ¹L',
    type: "thoughtform",
    image: "/img/textures/corruripple.gif",
    text: `::EXPERIENTIAL THOUGHTFORM
    ::NON-RENDERABLE
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'destination exceeds incoherence threshold';'recommend repair'">::PROHIBITIVE INCOHERENCE</span>`,
    hide: true
})

createEntity({
    name: 'recollection::Ã¸Â¥Â¬Ã€â€°',
    type: "thoughtform",
    image: "/img/textures/corruripple.gif",
    text: `::EXPERIENTIAL THOUGHTFORM
    ::NON-RENDERABLE
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'destination exceeds incoherence threshold';'recommend repair'">::PROHIBITIVE INCOHERENCE</span>`,
    hide: true
})

createEntity({
    name: 'recollection::â€žÂ²!Ã„Ã«Â±#RÃ£',
    type: "thoughtform",
    image: "/img/textures/corruripple.gif",
    text: `::EXPERIENTIAL THOUGHTFORM
    ::NON-RENDERABLE
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'destination exceeds incoherence threshold';'recommend repair'">::PROHIBITIVE INCOHERENCE</span>`,
    hide: true
})

createEntity({
    name: 'recollection::discovery',
    type: "thoughtform",
    image: "/img/textures/corruripple.gif",
    text: `::EXPERIENTIAL THOUGHTFORM
    ::ALERT::<span style="color:var(--bright-color)">'contiguous stream';'on recollection end';'resets stream to start'</span>
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'the last good gaze'</span>`,
    actions: [
        {
            name: "experience",
            exec: ()=>{
                env.embassy.setDay(1)
            }
        }
    ]
})

createEntity({
    name: 'recollection::suspicion',
    type: "thoughtform",
    image: "/img/textures/corruripple.gif",
    text: `::EXPERIENTIAL THOUGHTFORM
    ::ALERT::<span style="color:var(--bright-color)">'contiguous stream';'on recollection end';'resets stream to start'</span>
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'the eye of velzie arcs with glee'</span>`,
    actions: [
        {
            name: "experience",
            exec: ()=>{
                env.embassy.setDay(2)
            }
        }
    ]
})

createEntity({
    name: 'recollection::collapse',
    type: "thoughtform collapse",
    image: "/img/textures/corruripple.gif",
    text: `::EXPERIENTIAL THOUGHTFORM
    ::ALERT::<span style="color:var(--bright-color)">'utilizes'::INTERNAL_ITERATION::'methods'</span>
    ::NOTE::<span style="color:var(--bright-color)">'ability to save and revisit iteration will be available'</span>
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'i wish he listened'</span>`,
    actions: [
        {
            name: "experience",
            exec: ()=>{
                startDialogue("mothframe")
            },
            showIf: [['hub__funfriend-mothframe2', false], ['collapseSave', false], ['embassy__mothframe-end', false]]
        },
        {
            name: "experience",
            exec: ()=>{
                startDialogue("mothframe_still")
            },
            showIf: [['hub__funfriend-mothframe2', false], ['embassy__mothframe-end'], ['collapseSave', false]]
        },

        //start new save, no existing save - only experienced when you're totally new
        {
            name: "experience",
            exec: ()=>{
                env.embassy.setDay(3)
            },
            showIf: [['hub__funfriend-mothframe2', true], ['collapseSave', false], ['ENV!!ep3', false]]
        },

        //PRE-EP3 general 'already have a save' warning
        {
            name: "new iteration",
            exec: ()=>{
                startDialogue('d3_newsavewarning')
            },
            showIf: [['collapseSave'], ['ENV!!ep3', false]]
        },

        //EP3 - new iteration starts a different dialogue that lets you select which part
        {
            name: "new iteration",
            exec: ()=>{
                startDialogue('d3_partselection')
            },
            showIf: [['ENV!!ep3']]
        },

        //general load save
        {
            name: "load iteration",
            exec: ()=>{
                let save = check('collapseSave')

                switch(save.pageFlags["PAGE!!embassy_day"]) {
                    //since we didn't let people after movefriend (stupidly) need to jump through some hoops
                    case 3:
                        if( //these should be all collapse part 1 saves
                            (!save.pageFlags["PAGE!!movefriendqueued"]) || //haven't reached mf yet
                            (save.pageFlags["PAGE!!movefriendqueued"] && save.pageFlags["PAGE!!ep3queuecheck"]) || //reached mf, but triggered new ep3 check too
                            (save.pageFlags["PAGE!!ep2xplore"]) || //they're in explore mode
                            (!check("ENV!!ep3")) //they're otherwise not even in ep3 yet
                        ) { //load normally (like it did in EP2)
                            content.classList.add('collapse', 'show-vn')
                            env.loadedSave = true
                            env.embassy.loadCollapseSave()
                            env.embassy.setDay(3, {skipDialogue: true, specificZone: page.saveZone ? page.saveZone : 'embassy_relocator'})
                        } 
                        
                        else if( //this will be all pre ep3 launch saves that cleared MF but couldn't save. why did i do that lol
                            save.pageFlags["PAGE!!movefriendqueued"] && 
                            !save.pageFlags["PAGE!!ep3queuecheck"] &&
                            !save.pageFlags["PAGE!!ep2xplore"] &&
                            check("ENV!!ep3")
                        ) {
                            change("TEMP!!ep2skip", true)
                            change("TEMP!!ep2->ep3transfer", true)
                            moveTo("/local/ocean/embassy/golem/")
                        }

                    break

                    case 3.5:
                        moveTo("/local/ocean/embassy/golem/")
                    break

                    case 3.99:
                        moveTo("/local/ocean/embassy/groundsmindry/")
                    break
                }
                
            },
            showIf: 'collapseSave'
        }
    ]
})

createEntity({
    name: 'attendant',
    type: "thoughtform obesk attendant",
    image: "/img/local/embassy/spiredroneportrait.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'a common and utilitous appendage of the groundsmind'</span>`,
    actions: [
        {
            name: "greet",
            exec: ()=>{
                startDialogue('d1_attendant')
            }, 
            showIf: ["PAGE!!embassy_day", 1]
        },
        {
            name: "greet",
            exec: ()=>{
                startDialogue('d2_attendant')
            }, 
            showIf: ["PAGE!!embassy_day", 2]
        }
    ]
})

createEntity({
    name: 'mystery cyst',
    type: "thoughtform",
    image: "/img/local/embassy/messagecyst.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'a prying of my eyes'</span>`,
    actions: [
        {
            name: "examine",
            exec: ()=>{
                startDialogue('cyst')
            }, 
            showIf: [["PAGE!!embassy_day", 2], ["PAGE!!cystmelted", false]]
        }
    ]
})

createEntity({
    name: 'disrupted movefriend',
    alternateOf: "movefriend",
    hide: true,
    type: "thoughtform",
    image: "/img/local/embassy/liftfrienddarker.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection';'connector'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'one of many within the flesh of the embassy';'broken by the attack'</span>`,
    actions: [
        {
            name: "repair",
            exec: ()=>{  
                startDialogue("d3_relocator_later")
            },
            showIf: ()=>{return (check("PAGE!!movefriendqueued"))}
        }
    ]
})

createEntity({
    name: 'my seat',
    type: "thoughtform",
    image: "/img/sprites/obesk/chair.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection';'experiential bridge'`,
    actions: [
        {
            name: "start the meeting",
            exec: ()=>{  
                startDialogue("discovery")
            },
            showIf: [["PAGE!!embassy_day", 1], ["PAGE!!d1_kbcollected"]]
        },
        {
            name: "start the meeting",
            exec: ()=>{  
                startDialogue("discovery_notyet")
            },
            showIf: [["PAGE!!embassy_day", 1], ["PAGE!!d1_kbcollected", false]]
        }
    ]
})

createEntity({
    name: 'barfriend',
    type: "thoughtform obesk",
    image: "/img/sprites/obesk/golemportrait.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'a favorite from vaznian and ekivik regions both'</span>`,
    actions: [
        {
            name: "greet",
            exec: ()=>{  
                startDialogue("barfriend")
            },
            showIf: [["PAGE!!embassy_day", 1]]
        },
        {
            name: "greet",
            exec: ()=>{  
                startDialogue("barfriend")
            },
            showIf: [["PAGE!!embassy_day", 2]]
        },
        {
            name: "greet",
            exec: ()=>{  
                if(isStageClear()) {
                    startDialogue("d3_barfriend")
                } else chatter({actor: 'sourceless', text: 'IT IS TOO DANGEROUS, WE MUST DESTROY THESE FOES', readout: true})
            },
            showIf: [["PAGE!!embassy_day", 3]]
        }
    ]
})

createEntity({
    name: 'orange simulacrum',
    type: "thoughtform",
    image: "/img/local/embassy/drinkybigorange.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'a delightful reconstruction of the bright-fruit by the materials initiative'</span>`,
    actions: [
        {
            name: "sip-u-lacrum",
            exec: ()=>{  
                content.classList.add('sipping')
                change('PAGE!!citrusip', "++")
                chatter({actor: 'sourceless', text: 'THE SIMULACRUM STAYS THE SAME, BUT THE TASTE REGISTERS CLEARLY', readout: true})
                setTimeout(()=>chatter({actor: 'sourceless', text: 'THE BRIGHTNESS OF IT DISTORTS MY FEATURES AND SENDS MY RECEPTORS INTO A REFLEXIVE CURL', readout: true}), 3000)
                setTimeout(()=>chatter({actor: 'sourceless', text: 'STRONG!! BUT THE CITRUS INSPIRES A PLEASANT SATIATION', readout: true}), 7000)
                setTimeout(()=>{content.classList.remove('sipping')}, 5000)
            },
            showIf: ()=> {return !content.classList.contains('sipping')}
        }
    ]
})

/* misc furniture */
createEntity({
    name: 'veilklight',
    type: "thoughtform",
    image: "/img/local/embassy/lamp.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'these lights have a nostalgic <span definition="INHERITED CONTEXT::'food';'ripe fruit'">veilk parasite</span> design'</span>`
})

createEntity({
    name: 'rejuvenation chamber',
    type: "thoughtform",
    image: "/img/local/embassy/sleepchamber.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'offering the comfort of sleep, even in <span definition="NOTE::INHERITED CONTEXT::'implies altered living state'">death</span>'</span>`
})

createEntity({
    name: 'kalstik stand',
    type: "thoughtform",
    image: "/img/sprites/obesk/dd2.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'i have no <span definition="TRANSLATION FAILED::CAUSE:'no equivalent internal meaning';'no relevant inherited context'::ROMANIZATION SUCCESSFUL">kalstik</span>, i simply enjoy the unoccupied display'</span>`
})

createEntity({
    name: 'face stand',
    type: "thoughtform",
    image: "/img/sprites/obesk/dd1.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'to restore a larval face when the flesh nostalgia strikes'</span>`})

createEntity({
    name: 'cyst cluster',
    type: "thoughtform",
    image: "/img/sprites/obesk/cystrack.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'a collection of this and that, managed by a central monitoring cyst'</span>`})

createEntity({
    name: 'cyst pile',
    type: "thoughtform",
    image: "/img/sprites/obesk/cystline.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'`})

createEntity({
    name: 'clothing storage',
    type: "thoughtform",
    image: "/img/local/embassy/closet.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'`})

createEntity({
    name: 'listener',
    type: "thoughtform",
    image: "/img/local/embassy/listener.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'attentive sentinels to heed the call'</span>`
})

createEntity({
    name: 'timestopper',
    type: "thoughtform",
    image: "/img/local/embassy/timestopper.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'the grandest cyst in the embassy, a billion minds in one'</span>`,
    actions: [
        {
            name: "get another connector",
            exec: ()=>{
                startDialogue('d3_connector')
            }, 
            showIf: ["PAGE!!embassy_day", 3]
        }
    ]
})

createEntity({
    name: 'window',
    type: "thoughtform",
    image: "/img/local/embassy/timestopper.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'a minds eye, to share'</span>`
})

createEntity({
    name: 'simulacra dispensary',
    type: "thoughtform",
    image: "/img/local/embassy/drinky.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'a silly habit some carry even through <span definition="NOTE::INHERITED CONTEXT::'implies altered living state'">death</span>'</span>`
})

createEntity({
    name: 'tir qou',
    type: "thoughtform",
    image: "/img/sprites/randobesk/eyeportrait.gif",
    text: `::INCOMPLETE THOUGHTFORM
    ::ALTERED SIGNATURE
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'degraded visual profile';'extremely low cohesion'">::HIGH INCOHERENCE DETECTED</span>
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'hi interloper this is funfriend i had to improvise for these ones they were totally incoherent sorry ahaha'</span>`
})

createEntity({
    name: 'jut qou',
    type: "thoughtform",
    image: "/img/sprites/randobesk/eyeportrait.gif",
    text: `::INCOMPLETE THOUGHTFORM
    ::ALTERED SIGNATURE
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'degraded visual profile';'extremely low cohesion'">::HIGH INCOHERENCE DETECTED</span>
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'hi interloper this is funfriend i had to improvise for these ones they were totally incoherent sorry ahaha'</span>`
})

createEntity({
    name: 'kiv qou',
    type: "thoughtform",
    image: "/img/sprites/randobesk/eyeportrait.gif",
    text: `::INCOMPLETE THOUGHTFORM
    ::ALTERED SIGNATURE
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'degraded visual profile';'extremely low cohesion'">::HIGH INCOHERENCE DETECTED</span>
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'hi interloper this is funfriend i had to improvise for these ones they were totally incoherent sorry ahaha'</span>`
})

createEntity({
    name: 'vel qou',
    type: "thoughtform",
    image: "/img/sprites/randobesk/eyeportrait.gif",
    text: `::INCOMPLETE THOUGHTFORM
    ::ALTERED SIGNATURE
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'degraded visual profile';'extremely low cohesion'">::HIGH INCOHERENCE DETECTED</span>
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'hi interloper this is funfriend i had to improvise for these ones they were totally incoherent sorry ahaha'</span>`
})

/* day 1, 2 upgrades for env.embassy */
env.embassy.music = new Howl({
    onload: function () {page.howls.push(this)},
    src: ['/audio/embassy.ogg'],
    preload: true,
    loop: true,
    volume: 0,
    sprite: {
        __default: [0, 182000, true]
    }
})

//tracks whether the user has interacted with each character
//when all five have been talked to about the corrucyst, queues some internal dialogue with funfriend and ends the memory
env.embassy.d2progress = (characters = false) =>{
    if(characters) change(`PAGE!!d2${characters}cyst`, true)

    let progress = [check("PAGE!!d2kazkicyst"), check("PAGE!!d2bozkocavikcyst"), check("PAGE!!d2tozikcyst"), check("PAGE!!d2gakvucyst")]
    if(progress.every(Boolean) && !check('PAGE!!realized')) {
        //queues episode end, or cancels if you leave the page
        let queued = setInterval(()=>{
            if(page.name == "the-embassy") {
                    if(env.currentDialogue.canStart) {
                        content.classList.add('innerfocus')
                        cutscene(true)
                        setTimeout(()=>{
                            if(env.currentDialogue.canStart) { // seems redundant but this resulted in some silly calls
                                content.classList.add('cull-stage', 'cystfocus')
                                startDialogue('realization')
                                toggleBgm(env.embassy.music_suspense)
                                clearInterval(queued)
                                change('PAGE!!realized', true)
                                cutscene(false)
                            } 
                        }, 5000)
                    }
            } else {
                clearInterval(queued)
            }
        }, 1000)
    }
}

//add randobesk figure to specified element
env.embassy.randobesk = (destination) =>{
    destination.innerHTML = ""

    const options = {
        accessory: ['back', 'front', 'none'],
        receptors: ['jut', 'kiv', 'tir', 'vel']
    }

    const limits = {
        accessory: {
            back: 6,
            front: 6
        }, 
        body: 15,
        eyes: 45,
        head: 20,
        receptors: {
            jut: 8,
            kiv: 8,
            tir: 8,
            vel: 8
        }
    }

    let randobesk = document.createElement("figure")
    randobesk.classList.add('randobesk')

    let receptorType = options.receptors[Math.floor(Math.random()*options.receptors.length)]
    let accessoryType = options.accessory[Math.floor(Math.random()*options.accessory.length)]

    let x = `${accessoryType == 'front' ? `url(/img/sprites/randobesk/accessory/${accessoryType}accessory${rand(1, limits.accessory[accessoryType])}.png),` : ""}
    url(/img/sprites/randobesk/eyes/eyes${rand(1, limits.eyes)}.png), 
    url(/img/sprites/randobesk/receptors/receptor${receptorType}${rand(1, limits.receptors[receptorType])}.png),
    url(/img/sprites/randobesk/head/head${rand(1, limits.head)}.png), 
    url(/img/sprites/randobesk/body/body${rand(1, limits.body)}.png)${accessoryType == 'back' ? "," : ""}
    ${accessoryType == 'back' ? `url(/img/sprites/randobesk/accessory/${accessoryType}accessory${rand(1, limits.accessory[accessoryType])}.png)` : ""}`
    console.log(x)
    randobesk.style.backgroundImage = x

    //finish off with the target, based on receptors
    destination.insertAdjacentElement('beforeend', randobesk)
    randobesk.insertAdjacentHTML('afterend', `<div class="target" entity="${receptorType} qou"></div>`)
}

env.embassy.regenRandobesk = () => {
    document.querySelectorAll('#realgrid .randobesktile').forEach(e=>{
        env.embassy.randobesk(e)
    })
}

/* first load */
env.dialogues["quality"] = generateDialogueObject(` 
start
    moth
        woah... hold on
        dude, this is the most dense thoughtform i've seen in this thing yet
        like--this is pretty intense.
        what year was your mindspike from again? are you sure it can handle this?
        i mean, it's not really my business...
        but i'm gonna trigger quality selection just in case
    
    sys
        ATTENTION::'please select default rendering quality'
        NOTE::'quality can be changed within system menu'
        NOTE::'REGULAR';'all entities rendered';'animated thoughtforms'
        NOTE::'LOW';'renders only memory stream-necessary components'
        NOTE::'selecting LOW enables <span style="NOTE::'presents alternatives to proxy controls';'intended to resolve hardware issues'">REDUCED INTENSITY</span>';'toggle within system menu'

    RESPONSES::sys
        REGULAR<+>END
            EXEC::setTimeout(()=>{setQualityPreference('regular')}, 500)
        LOW<+>END
            EXEC::setTimeout(()=>{setQualityPreference('low');setIntensityPreference(true)}, 500)
`)

/* akizet self-talks */
env.dialogues["d1_akizet"] = generateDialogueObject(` 
start
    sourceless
        i should check in with the team... our focus approaches
            SHOWIF::["PAGE!!beenToResearch", false]
        kazki and bozko must be present before we can begin... where are they?
            SHOWIF::[["PAGE!!d1_kbcollected", false], ["PAGE!!beenToResearch", true]]
        it is time to begin - i should sit! my seat is the furthest one from the door, near the listeners
            SHOWIF::[["PAGE!!d1_kbcollected", true], ["PAGE!!beenToResearch", true]]

    RESPONSES::akizet
        there is work to do<+>END
    
    RESPONSES::self
        attempt to interact<+>interact
            SHOWONCE::

interact
    self
        hello, akizet?
        can you hear me?

    moth
        huh?
        oh... i get it

    sourceless
        ...

    moth
        i don't think that's going to work
        this memory is too coherent
        if we had a way to, like... damage thoughtforms, maybe
        but funfriend would be pissed
    
    RESPONSES::self
        damn<+>END
`)

env.dialogues["d2_akizet"] = generateDialogueObject(` 
start
    sourceless
        i must check that cyst, otherwise it will consume my thoughts
            SHOWIF::["PAGE!!cystmelted", false]
____SHOWIF::["PAGE!!cystmelted", true]
        there are still some team-members i should speak with... it has to be someone i know!!
        let me think, who is left?
        kazki...
            SHOWIF::["PAGE!!d2kazkicyst", false]
        bozko...
            SHOWIF::["PAGE!!d2bozkocavikcyst", false]
        cavik...
            SHOWIF::["PAGE!!d2bozkocavikcyst", false]
        tozik...
            SHOWIF::["PAGE!!d2tozikcyst", false]
        gakvu...
            SHOWIF:: ["PAGE!!d2gakvucyst", false]
        yes, that is it
____END

    RESPONSES::akizet
        my suspicions<+>who
            SHOWIF::["PAGE!!cystmelted", true]
        there is work to do<+>END

who
    sourceless
        it is only those who attended the focus who would know
        and they are all present in the embassy at this point in the Î¸gaze
        i should speak to kazki, even if she always seems innocent
        bozko is strong willed and i can imagine he would take such strange actions
        then there is cavik, who... maybe not him actually
        or, well, it is in his nature to share things like this,
        perhaps he received a similar message as well?
        tozik... maybe, he can be quite strange
        though the listener said they 'cared for me', so, probably not him
        gakvu... is probably the most likely suspect
        but i should speak to everyone

    RESPONSES::akizet
        there is work to do<+>END
`)

/* barfriend */
env.dialogueActors["barfriend"] = {
    elementID: "barfriend12",
    image: "/img/sprites/obesk/golemportrait.gif",
    type: "obesk uppercase",
    voice: ()=>play('talk', 1.5)
}

env.dialogues.barfriendresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        orange juice<+>orange
        nevermind<+>END
            EXEC::pauseSwapCam(false)
`)

env.dialogues["barfriend"] = generateDialogueObject(`
start
    sourceless
        the barfriend stands before a display of simulacra
            EXEC::pauseSwapCam(true)
        it is rare that the urge to interact with it ever strikes me
        however, this is one of those times
____SHOWIF::[["netstat|<", 0], ["citystreet_gotdrinks"]]
        that citric drink i had in the envoy's city...
        terrible as it was,
        it has awoken something
____SHOWIF::[["netstat|>=", 0]]
        another Î¸gaze upon this bright planet...
        it calls for an equally bright beverage
____END
    
    akizet
        barfriend!
    
    barfriend
        HELLO AKIZETESCHE

    RESPOBJ::barfriendresp

orange
    sourceless
        yes... <span definition="NOTE::'no translation required'">ORANGE</span> JUICE
        that is what i want
        an exotic taste--with the buzz of citric acid!

    akizet
        an orange juice simulacrum, please
    
    barfriend
        ok!
    
    sourceless
        the barfriend extends a tendril to the orange simulacra display
        it passes through the cystic wall like a hand through water
        eventually producing a spherical cup with the glow of orange juice
        although... real orange juice does not glow
____SHOWIF::[["netstat|<", 0]]
        but it looks kind of cool
____SHOWIF::[["netstat|>=", 0]]
        but it evokes the glow of a ripe celki
        befitting the flavor
____END
    
    barfriend
        here you go!
            EXEC::document.querySelectorAll('.drinklayer').forEach(e=>e.setAttribute('drink', 'orange'))
        please enjoy!!
    
    akizet
        thank you, barfriend

    RESPONSES::akizet
        depart<+>END
            EXEC::pauseSwapCam(false)
`)

/* relocator */
env.dialogues.embassyRelocatorResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        personnel<+>personnel
            SHOWIF::[['EXEC::env.embassy.relocatorReturn != \`personnel\`']]
            HIDEREAD::
        recreation<+>recreation
            SHOWIF::[['EXEC::env.embassy.relocatorReturn != \`recreation\`']]
            HIDEREAD::
        call research<+>research
            SHOWIF::[['EXEC::env.embassy.relocatorReturn != \`research\`']]
            HIDEREAD::
        nevermind<+>END
            EXEC::pauseSwapCam(false);
`)

env.dialogues["embassyRelocator"] = generateDialogueObject(`
start
    movefriend
        HI AKIZETESCHE!
            EXEC::pauseSwapCam(true)
        WHERE TO!
    
    RESPOBJ::embassyRelocatorResponses

personnel
    akizet
        personnel, please

    movefriend
        ok!
    
    sourceless
        the path i took to the relocator seals
        a moment later, a new hallway opens in place of the old one
            EXEC::env.embassy.relocatorDestination('personnel')

    movefriend
        see ya!
    
    RESPONSES::akizet
        thank you<+>END
            EXEC::pauseSwapCam(false)

recreation
    akizet
        the lower-away recreation hub, please

    movefriend
        OK!
    
    sourceless
        the path i took to the relocator seals
        a moment later, a new hallway opens in place of the old one
            EXEC::env.embassy.relocatorDestination('recreation')

    movefriend
        have fun!
    
    RESPONSES::akizet
        thank you<+>END
            EXEC::pauseSwapCam(false)

research
    akizet
        the call research center, please

    movefriend
        OK!
    
    sourceless
        the path i took to the relocator seals
        a moment later, a new hallway opens in place of the old one
            EXEC::env.embassy.relocatorDestination('research')

    movefriend
        enjoy your work!
    
    RESPONSES::akizet
        thank you<+>END
            EXEC::pauseSwapCam(false)
`)

/* DAY 1 - START */
env.dialogues["d1_start"] = generateDialogueObject(` 
start
    sourceless
        my consciousness resumes
        the rejuvenation chamber opens, and from outside flows the glow of the embassy's cystic glass
        through the distant dull contrivance, i feel another Î¸gaze has begun

    RESPONSES::akizet
        emerge from the chamber<+>emerge
            EXEC::content.classList.add('swapcam')
    
emerge
    sourceless
        i clamber out the chamber, my qou-body refreshed
        it feels the same as it did after my ascension
        a rare, lovely feeling - as though i could twist it into any shape
        but i have work to do...
        a focused meeting of my call research initiative is approaching
        and a fine occasion it is - we have some particularly unique equipment this time!
        i must assemble the team, then we may begin
    
    RESPONSES::akizet
        off to work<+>END

SKIP::content.classList.add('swapcam')
`)

/* DAY 1 - TOZIK */
env.dialogues["d1_tozik"] = generateDialogueObject(` 
start
    sourceless
        tozik sits in a terminal chair, connected by a receptor to the timestopper
            EXEC::pauseSwapCam(true);
        the time constriction that gives the grand cyst its name has not been activated
        he must be using it simply for its archival connections
        i clamber over the curve of the timestopper to greet him

    akizet
        hello, tozik!

    sourceless
        i see his acknowledgment of me with a small glance
            EXEC::vnp({hideStage: true, tozik: "show"})
        however his focus is inward, through the corrucystic vein
        tozik detests idle chatter, so i opt to keep this quick
    
    akizet
        are you prepared for the focus?
        actually, is that what you have been doing?
    
    tozik
        yes
        i am organizing the connected archival cysts
        something very interesting happened barely a Î¸wink ago
        you will hear about it in the focus
    
    akizet
        excellent
        we will speak soon, then
    
    RESPONSES::akizet
        fare well<+>END
            EXEC::pauseSwapCam(false);vn.done()
`)

/* DAY 1 - GAKVU */
env.dialogues["d1_gakvuresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        false environment?<+>false
        the complaint...<+>complaint
        your coat<+>coat
            SHOWIF::'gakpause'
        fare well for now<+>END
            EXEC::pauseSwapCam(false);vn.done()
`)

env.dialogues["d1_gakvu"] = generateDialogueObject(` 
start
    sourceless
        gakvu leans against a listener, eyes distant
            EXEC::pauseSwapCam(true);
        a false environment cyst sits upon one of her receptors
        when i approach and lean my head to either side, i cannot discern a logo upon it
        i wonder - is it another surface simulation? she has a morbid obsession with them
        of course, this earns her attention, and she gives me a jovial receptor gesture
            EXEC::vnp({hideStage: true, gakvu: "show"})
        
    gakvu
        hi akizet!
        ready for the focus?

    akizet
        yes!
        i was coming to ask you the same thing, actually
        do you have something?
    
    gakvu
        oh yeah!!
        tozik and i were tracking the call earlier, and...
    
    sourceless
        she glances towards tozik, who stares inward
    
    gakvu
        well, he found it, really
        but there was a spike in the call
        a distinct break from the normal baseline
        very interesting!
    
    akizet
        and what did you do?
    
    gakvu
        have you seen him? he has fused his skin to the chair!
        i had to fetch all of the archival cysts and feed them to the timestopper myself
        ah, with some help from cavik, of course

    sourceless
        i chuckle, and so does she, but i sense it is for a different reason
    
    gakvu
        did you need anything else?
        otherwise i will be here until the focus starts

    sourceless
        it pains me to do this
        but i should probably bring up the complaint
        
    RESPOBJ::d1_gakvuresp

complaint
    akizet
        there is a matter i must mention
        gakvu, you and i, we understand
        however... the balance of work, has
    
    gakvu
        bozko!

    sourceless
        what
        did bozko speak with her already??
        my confusion is laid bare in my receptors' curl
    
    gakvu
        was it not him?
        i know it was him!
        he just has a problem with ekivik
        
    sourceless
        i laugh, and urgently wave my hands and receptors dismissively
        she laughs, too--i am certain she appreciates my understanding of the dry ekivik wit
        
    akizet
        no no, gakvu...
        it does not matter who brought this to my attention
        i know you enjoy your efforts here,
        and above all else i know your ability to strike
        but to certain others, it is not so clear
        and with enough of these complaints, it will start to turn eyes towards me
        so, for my sake, 
        
    sourceless
        i pause to think of an elegant way to say this...
        "at least pretend to look busy when you are in here"?
        gakvu wrings her receptors smugly, knowing full well what i mean to say

    gakvu
        do not worry, i understand
    
    akizet
        good!

    RESPOBJ::d1_gakvuresp

false
    akizet
        what is that false environment you have on?

    gakvu
        ah! you see,
    
    sourceless
        i spy a strange, subtle apprehension in her receptor movements
        however she quickly launches into a spirited description

    gakvu
        this is one from my home
        a skilled veilk-hopper's memories, gamified
        so the veilk march towards the weather wall,
        and you must leap from veilk to veilk while they grow faster
        or else you are subsumed beyond the air's border!

    sourceless
        by the gesticulations of her receptors and hands,
        it is as if she is trying to barter with me
    
    akizet
        that sounds terrifying
    
    gakvu
        that is why it is so fun! you must try it sometime

    RESPOBJ::d1_gakvuresp

coat
    akizet
        your coat...
        i have never seen it off like that before!
        
    sourceless
        gakvu draws her attention outwards, to stare down at it
        she pulls at the false fabric, receptors slightly twisting in confusion
    
    gakvu
        oh
        that is strange!
        i never turn this off
    
    sourceless
        the twist in her receptors slowly grows more pronounced

    gakvu
        what did i just say?
            EXEC::ratween(env.bgm, 0.75, 3000);content.classList.add('incoherence')
        'turn it off'?
        it is fungus...
        wait, no--it is, a representation of fungus...
        that i emulate with my clothing!
    
    sourceless
        i watch her with some concern - she is saying things i already know
        like she is convincing herself... but, why? this is very strange
    
    akizet
        are you ok?

    gakvu
        ah...
        yes!
            EXEC::ratween(env.bgm, 1, 3000);content.classList.remove('incoherence')
        sorry... sometimes when i am using these false environments,
        i get context overlap!
        for a Î¸blink, it is like i am my signature rather than myself!
        i should really start pausing these things when talking, hehe

    sourceless
        the lights of her coat resume
            EXEC::change("gakpause", false);content.classList.remove('gakpause')

    moth
        interesting... that was some sort of memory leak
            SHOWONCE::
        incoherence spiked pretty bad
            SHOWONCE::
        avoid doing that kind of thing, ok?
            SHOWONCE::

    RESPOBJ::d1_gakvuresp
`)

/* DAY 1 - KAZKI + BOZKO */
env.dialogues["d1_kazkibozkoresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        our focus approaches<+>focus
            EXEC::change('PAGE!!d1_kbcollected', true)
        what was that about?<+>story
        anything happening?<+>talk
        fare well for now<+>END
            EXEC::specialCam(false);pauseSwapCam(false);vn.done()
`)

env.dialogues["d1_kazkibozko"] = generateDialogueObject(` 
start
    sourceless
        BOZKO AND KAZKI IDLE NEAR THE INNER WALL, THEIR CHATTER DROWNED OUT BY THE NUMEROUS OTHERS NEARBY
            EXEC::pauseSwapCam(true);
        KAZKI'S BRANCHED RECEPTORS GESTICULATE AS WILDLY AS HER HANDS WHILE SHE SPEAKS TO BOZKO
        HIS FOCUS LIES MOSTLY UPON THE <span definition="NOTE::'partial translation';'implied closest functional equivalent';'technological implication'">WINDOW</span>, OBSERVING THE COUSINS' RESEARCH VESSEL
        HER TALE BECOMES MORE DISTINCT AS I APPROACH
    
    kazki
        ... so i said, it is because my larval form was tir! and i told him of the function that entails...
        i even talked a little about that story from the kozazni excavation--you know the one, ah, when i was first starting work there
    
    bozko
        oh, no

    kazki
        and while i was saying these things, my funfriend was attempting to warn me about something, but i kept talking...
        and then when i was done, i checked to see what it was, and it was telling me to stop! 
        he was apparently expressing terror on his face! as though i might drench him in acid at random! 
        ahahaha!!

    sourceless
        BOZKO CHUCKLES AND ROLLS HIS RECEPTORS SLIGHTLY
        HE LOOKS FROM THE WINDOW TO KAZKI, WITNESSING MY APPROACH INCIDENTALLY
        WITH ANOTHER LITTLE RECEPTOR GESTURE, KAZKI TURNS TO FACE ME AS WELL, DELIGHTED
            EXEC::specialCam('kazkibozko');vnp({bg: true, kazki: "show", bozko: "show"})

    bozko
        hello, akizet

    kazki
        hi akizet!!
    
    akizet
        hello my friends
    
    RESPOBJ::d1_kazkibozkoresp
    
story
    sourceless
        I CANNOT CONTAIN MY CURIOSITY
        KAZKI'S STORIES, EVEN IF HYPERBOLIC, ARE ALWAYS ENTERTAINING

    akizet
        what was that story you were telling, kazki?
    
    sourceless
        HER BRANCHED RECEPTORS FAN OUTWARDS EXCITEDLY

    kazki
        ah! i was in the nation of australia recently! 
        for the polygonation spire meeting, you see
        it went well, but my contact was curious, because he had not seen a once-tir before, 
        and so he had a number of questions unrelated to the construction approval
        mostly about my receptors...
        which!! by the way! the construction was approved!
    
    bozko
        through some giggle of velzie, it occurred to her to share the events of her early larval work
    
    sourceless
        THE KOZAZNI EXCAVATION STORY...
        OF COURSE A CLUELESS BRIGHT COUSIN WOULD FEAR FOR THEIR LIFE AFTER HEARING THAT

    kazki
        it was in good nature! he found it funny after i explained away his fears!
    
    akizet
        i say this with a deep respect, kazki,
        with how much you share so readily with the cousins,
        your diplomatic successes always come as a surprise

    RESPOBJ::d1_kazkibozkoresp
    
talk
    akizet
        my friends, what news do you carry?
        for yourselves, of course
        we have the imminent focus to share our works
    
    sourceless
        BOZKO PEERS INTO THE ESTIMATION OF THE <span definition="NOTE::'partial translation';'implied closest functional equivalent';'technological implication'">WINDOW</span>
    
    bozko
        outside of our works,
        i have been observing the creatures of the water nearby
        a few dispatched <span definition="NOTE::'partial translation';'implied closest cultural equivalent'">golems</span> with relays
        here, look at this--see how they form great organized clouds?

    sourceless
        BOZKO REACHES INTO THE WINDOW, DISRUPTING THE DISPLAY, TO PULL A CONNECTIVE CYST FROM ITS INTERNAL DOCK
            EXEC::content.classList.add('bozkoceptor');vnp({fade: true})
        HE AFFIXES IT TO HIS CLOSEST RECEPTOR, AND ADJUSTS THE DISPLAY TO A RECOLLECTION
        THE WINDOW'S COLORS RIPPLE UNTIL THEY FIX UPON A MENTAL PROJECTION
            EXEC::content.classList.add('fishies')
        IT IS AS HE SAYS - A CLOUD OF IMPECCABLY ORIENTED WATER INHABITANTS
        HOW DO THEY DO IT? 

    akizet
        remarkable

    bozko
        and i am not the sole observer of the bright world's creatures among us
    
    sourceless
        BOZKO RETURNS THE CONNECTOR BENEATH THE WINDOW'S SURFACE
            EXEC::content.classList.remove('bozkoceptor')
        THE IMAGE SOON DISSIPATES
            EXEC::content.classList.remove('fishies');vnp({fade: false})
        HE GESTURES TOWARDS KAZKI TEASINGLY AFTER A MOMENT'S SILENCE

    kazki
        bozko!
    
    bozko
        although, she is taking a more live approach

    kazki
        bozko!!

    sourceless
        HER RECEPTORS CURL INTO THEMSELVES, LIKE BALLED FISTS

    kazki
        fine, fine!
            EXEC::vnp({kazki: "focus"})
        it is an experiment i am doing, akizet
        well, hmm, sort of
        on my trip to australia i found this little creature skittering around on a window
        so, i looked closer... and it had eight legs, vibrant stripes, and many large eyes! and it was staring at me!
        it even had armored skin, just like a <span definition="NOTE::'partial translation';'inherited description-generated noun'">cave keeper!</span>
        and--and i thought, 'ah, how cute!' and i wanted to keep it!

    sourceless
        WITH HOW EMOTIONALLY SHE WEIGHTS HER WORDS
        IT IS LIKE SHE EXPECTS ME TO SAY SHE SHOULD PUT IT BACK

    bozko
        so she made a cavity in her head
            EXEC::vnp({kazki: "defocus"})
    
    akizet
        what? are you--?

    kazki
        i am getting to that!!
            EXEC::vnp({kazki: "focus"})
        so... i went to pick it up, but it leaped into my hand!
        like it wanted to be with me! ah, but, by this time, some bright cousins were coming to see what i was doing...
        so i excused myself and went back to my vessel
        and i realized--there is no life support in our vessels, so, if i wanted to keep it alive... i had to think!
        with my head!
    
    akizet
        so you hollowed out your head,
        and are keeping it in an air pocket?

    kazki
        exactly!! do you want to see it???
    
    sourceless
        MY RECEPTORS DROOP SLIGHTLY, AND I CHUCKLE EXASPERATEDLY
        BOZKO FINDS MY REACTION VERY FUNNY
        INDEED, THIS IS BOTH A PROBLEM AND SOLUTION THAT ONLY A ONCE-TIR WOULD COME TO
    
    akizet
        of course i do

    sourceless
        KAZKI DIPS HER HEAD FORWARD, THE FEATURES OF HER FACE MELTING AWAY, AND THE COLOR OF HER SKIN FADING TO TRANSPARENCY
            EXEC::specialCam('kazkihead');content.classList.add('kazkihead')
        IT IS EMPTY, CLEAR AS THE BRIGHT COUSINS' GLASS, CONTAINING ONLY A SPACIOUS SPHERICAL CAVITY
        I TILT MY HEAD FROM SIDE TO SIDE, EVEN ADJUST THE ACCURACY OF MY EYES, BUT DO NOT SEE IT
        AT LEAST, NOT AT FIRST... BUT THEN IT IS THERE, SITTING SUSPENDED ON BARELY VISIBLE STRANDS OF ITS OWN CREATION
    
    sys
        ALERT::'memory of arachnid detected';'render?'

    RESPONSES::sys
        render<+>arthur
            EXEC::content.classList.add('spider')
        omit<+>arthur

arthur
    sourceless
        IT LOOKS AT ME, THEN RAISES ITS FORELEGS AND WAVES THEM BOTH FROM SIDE TO SIDE
        I IMAGINE THIS IS SOME SORT OF THREAT
    
    akizet
        i can see why you chose to keep it
    
    sourceless
        KAZKI REPLACES HER FACIAL FEATURES, PULLING HER HEAD BACK
            EXEC::specialCam('kazkibozko');content.classList.remove('kazkihead')
    
    kazki
        such life in its little eyes!
            EXEC::content.classList.remove('spider');vnp({kazki: "defocus"})

    RESPOBJ::d1_kazkibozkoresp

focus
    akizet
        our focus approaches, my friends
        are you prepared? do you have any topics to bring?
    
    sourceless
        THEY BOTH DIP THEIR RECEPTORS AFFIRMATIVELY

    kazki
        yes!
    
    akizet
        good! report to the signal chamber when you are ready
        i arranged for the timestopper to be used this time, so it will be quick
    
    bozko
        excellent
        we will be there shortly, you go ahead

    RESPOBJ::d1_kazkibozkoresp
`)

env.dialogues["d1_kazki_research"] = generateDialogueObject(`
start
    akizet
        ready to proceed, kazki?
    
    kazki
        <span definition="NOTE::'common phrase';'original pun untranslateable';'generated alternate pun';'retains level of wit'">absoqoutely!</span>
    
    akizet
        hehe, excellent
    
    RESPONSES::akizet
        we will start soon<+>END
`)

env.dialogues["d1_bozko_research"] = generateDialogueObject(`
start
    akizet
        ready to proceed, bozko?
    
    bozko
        of course
        i only wish i had more to share given our amenities this Î¸gaze
    
    akizet
        true!
        with the timestopper,
        it often seems like there is never enough
    
    RESPONSES::akizet
        we will start soon<+>END
`)

/* DAY 1 - CAVIK */

env.dialogues["d1_cavikresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        our focus approaches<+>focus
        closed loop theory?<+>theory
        anything happening?<+>talk
        fare well for now<+>END
            EXEC::pauseSwapCam(false);vn.done()
`)
env.dialogues["d1_cavik"] = generateDialogueObject(` 
start
    sourceless
        CAVIK ATTENDS TO THE ARCHIVAL CYSTS, OCCASIONALLY AFFIXING ONE TO A STOUT RECEPTOR
            EXEC::pauseSwapCam(true);
        THE CYSTS ARE ARRANGED IN NEAT PILES, SORTED BY THE SHADE OF THEIR VISCERA
        THOUGH HIS REGULAR UPKEEP ENSURES THAT NONE GROW TOO DARK OR STARVE
        HE SENSES MY APPROACH AND TURNS, CORDIALLY BOWING HIS HEAD AND RECEPTORS
            EXEC::vnp({cavik: "show", hideStage: true})
    
    cavik
        akizet! great gaze!
            
    akizet
        likewise, my friend
        what are you doing?

    cavik
        i was just conducting maintenance on some of our older archives
        and reminiscing! oh, the wild and obeski-centric theories they used to toss about!
        there is this old one i have been running through--a joint theory by none other than dullzkovik and azkavinesche!
        they called it the 'closed loop' - have you heard of it?
    
    akizet
        ah...

    sourceless
        OH NO
        OF COURSE I HAVE
        I SHOULD ENSURE HE DOES NOT FEEL IT APPROPRIATE TO SHARE THIS WITH THE BRIGHT COUSINS

    cavik
        i feel that it was almost formed as a satire of the more outlandish ones from the early era, but...
        there is something oddly compelling about it!
        oh--sorry, do you have need of me?
    
    RESPOBJ::d1_cavikresp

focus
    akizet
        our focus approaches, my friend
        are you prepared? do you have any topics to bring?
    
    sourceless
        I SENSE UNEASE FROM HIS STANCE

    cavik
        ahh!! it is really time already?
        oh, these old cysts do not have any time constriction... no wonder!
        ah, yes, yes, i will be ready!
        yes!
    
    akizet
        you do not need to press yourself, my friend
        it is a simple one
    
    cavik
        i know, i just hate when this happens
        i do not have anything to bring this time... but i will be ready!
    
    akizet
        excellent
    
    RESPOBJ::d1_cavikresp
    
theory
    sourceless
        I WOULD PREFER NOT TO CRUSH HIS INVESTIGATIVE SPIRIT
        BUT THESE EARLY THEORIES CARRY LESS WORTH THAN <span definition="NOTE::'partial translation';'inherited description-generated noun'">WALL-ROT</span>
        ESPECIALLY DULLZKOVIK'S, VELZIE'S SMILE UPON HIM
    
    akizet
        closed loop...
        is that the time--
    
    cavik
        time manipulation!! yes! let me remind you! 
        dullzkovik posited that one era... we learn to use the dull plane to traverse space four-dimensionally
        and our future selves eventually discover the home of the bright cousins, but far too late to meet them
        so--we create a contrivance just big enough to release a message to ourselves and signal its location!

    sourceless
        OH, CAVIK
        I TWIST MY RECEPTORS THOUGHTLESSLY, ACCIDENTALLY BARING MY SKEPTICISM
        
    cavik
        now--i know you must think it is ridiculous, 
        and it is! especially as it goes on, hehe
        but is it not inevitable at the same time?
        in our Î¸deaths, there is enough time to unravel any mystery--time manipulation included!
    
    akizet
        first...
        i do not think dullzkovik understood the full implication of creating a contrivance inside a planet at that point
        that was before the incident with the shared moon, you know
        and, time manipulation... 
        if we ever were to manage it,
        the mistakes that created us and our world would be gradually undone to right old wrongs
    
    cavik
        but we would never know if it was happening, would we? it would just 'be'!
        anyway, i will not seriously debate it with you--it is just a bit of fun
    
    sourceless
        TO BE SURE...
    
    akizet
        yes, of course!
        and--you are not going to share this with any cousins, correct?

    sourceless
        I SEE THE DEJECTION EVEN AS HE TRIES TO HIDE IT BENEATH AN ARCHIVAL CYST
        HOW JOYLESS I MUST SEEM, SUCH A TERRIBLE INVERSION OF OUR YOUTH
        BUT I REALLY WOULD PREFER NOT NEEDING TO FIX ANOTHER OVERSHARING INCIDENT
    
    cavik
        aki...
        i would not seriously entertain sharing <em>this</em> one.
        did you really think that?
        i know i made an incorrect step, but
    
    akizet
        cavik, cavik! i trust you, be at ease
        you know how i must be during these times
        do not feel at fault
    
    cavik
        of course, no, no, i understand

    sourceless
        Â¥IÃÃˆiÃ¦b4
        ANOTHER LITTLE DEATH TO HAUNT ME
    
    RESPOBJ::d1_cavikresp

talk
    akizet
        cavik, my friend, tell me
        what news do you carry?
        have you been enjoying your role?
        it is not often that we have time to speak plainly anymore

    cavik
        i have! the oceans are truly mesmerizing, nothing at all like home
        you should see all the artifacts that the cousins have simply left to the water!
        and on our expeditions, so many little creatures come up to examine our vessels
        has bozko told you about the one he has taken?
    
    sourceless
        FOR THAT MOMENT I HEARD AN ECHO OF LARVAL JOY IN HIS VOICE
        BUT IN THE SUBTLE TURN OF A RECEPTOR, I SEE HE FEELS HE SHOULD NOT HAVE SAID THAT
    
    cavik
        that is fine, right?
        you heard that from a veilk's whisper, not me
    
    akizet
        haha! it is! it is perfectly fine
        well, the groundsmind says we should not, since the cousins could get mad, but...
        i do not really care
        tell me - have you contributed any more to the <span definition="NOTE::'partial translation';'inherited description-generated noun'">life-pod</span> project?
    
    cavik
        ahh! no! not in some time
        but i hear they recently succeeded in sending a 'grain' back to obeski
        it is, of course, being held in deep quarantine, but...
        that it worked is promising alone
        even if the cyst itself was bigger than both of us combined!

    akizet
        remarkable, i must check in with them to see how they did it
        as trade continues, i imagine that organic materials will be the next leap in relations
        if you find the time again, you should join the effort!
        last i spoke with the team, they asked when they would see you again
    
    cavik
        really??
        i should! i will check in again with them!
    
    RESPOBJ::d1_cavikresp
`)


/* DAY 1 - ATTENDANT/GROUNDSMIND */
env.dialogueActors["attendant"] = {
    image: "/img/local/embassy/spiredroneportrait.gif",
    type: "obesk groundsmind uppercase",
    voice: ()=>play('talk', 0.8)
}

env.dialogues["d1_attendantresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        timestopper<+>timestopper
        that is all<+>leave
            FAKEEND::(leave)
`)

env.dialogues["d1_attendant"] = generateDialogueObject(` 
start
    sourceless
        I APPROACH THE ATTENDANT DRONE
            EXEC::pauseSwapCam(true)
        IT IS FACELESS AT THE MOMENT
        SO IT REGARDS ME WITH A SIMPLE STARE

    RESPONSES::akizet
        speak with groundsmind<+>groundsmind
        nevermind<+>END
            EXEC::pauseSwapCam(false);
    
groundsmind
    akizet
        the groundsmind, please

    attendant
        OF COURSE!

    sourceless
        THE DRONE STRAIGHTENS, AND A CONNECTIVE RIPPLE PASSES THROUGH ITS SKIN
        OUR GROUNDSMIND'S SYMBOL IS FORMED OVER ITS FACEPLATE
            EXEC::content.classList.add('groundsminded')
        
    akizet
        hello vekoa!!
    
    groundsmind
        akizetesche. speak

    RESPOBJ::d1_attendantresp
    
timestopper
    akizet
        i appreciate you affording us the timestopper
        how long was it again that we have it?

    groundsmind
        originally you had it for only a few Î¸gazes... 
        however: as of a few Î¸winks prior, it is indefinitely in the care of the call initiative
        the schedule has shifted due to materials no longer needing an upcoming simulation
        once another initiative has need of it, it will be transferred

    akizet
        really? we moved quite a bit of cystery to accommodate it,
        and still only the top barely fits in the room...
    
    groundsmind
        is this a request to have it removed post-use?
        this can be arranged
    
    akizet
        hmm... no, no
        the cysts were not vital, and this may be a boon
        it does shorten our meetings and plans by orders of magnitude
        if it becomes a bother, i will reach out again

    RESPOBJ::d1_attendantresp

leave
    akizet
        that is all!
    
    groundsmind
        excellent
        fare well
    
    sourceless
        THE DRONE DISCONNECTS FROM THE GROUNDSMIND AND STANDS STILL ONCE MORE
            EXEC::content.classList.remove('groundsminded')
    
    RESPONSES::akizet
        leave<+>END
            EXEC::pauseSwapCam(false);

END::content.classList.remove('groundsminded');
`)

/* DAY 1 - DISCOVERY */
env.dialogues["discovery_notyet"] = generateDialogueObject(` 
start
    sourceless
        this is where i will sit...
        once i have the team assembled.
        gakvu, tozik, and cavik are all here
        all but kazki and bozko
        i should tell them it is time for the focus
        they are probably in the recreational area!
    
    RESPONSES::akizet
        to recreation!<+>END
`)

env.dialogues["discovery"] = generateDialogueObject(` 
start
    sourceless
        the team is assembled around their seats, so i sit
    
    akizet
        everyone!
        let us begin
    
    sourceless
        i dip my head towards tozik, as he has already connected
        with an impulse, he instructs the grand cyst to lower wired cysts before each of us
        what a rare opportunity! i am certain that even gakvu is excited
        i raise the cyst to my right receptor, and its shell softens, becoming as viscous liquid
        it settles over my receptor, and the timestopper connects to me
        my mind is drawn into it, with the others - everyone is connected
            EXEC::content.classList.add('innerfocus')
    
    akizet
        commencing now!
            EXEC::env.embassy.setFocus('akizet')
    
    sourceless
        with a simple instruction, the grand cyst's additional neural processing activates
        its strength and processing speed is such that time... stops
        such a peculiar sensation - to observe in full cognitive capacity a world and body that cannot move
        though the cores of our minds are shelled from one another
        we each carry a new mind that feels as if it was always there - the grand cyst
            EXEC::content.classList.add('showfocus')
        and it thinks with us as one
            EXEC::content.classList.add('cull-stage')
    
    timestopper
        is this not peculiar?
            EXEC::env.embassy.setFocus(false)
        ahaha! how fun! 
        oh but i cannot tell which thought is mine
        how do we stay distinct again?
        silly! the last one was not so long ago
        but i will remind you
        you do it like this
    
    sourceless
        we each understand simply: think outwardly

    akizet
        you see?
            EXEC::env.embassy.setFocus('akizet')
        a reminder of our best practice here...
        it will be simpler to convey things of importance indistinctly
        but for discussion, you should stay distinct
        understood?

    timestopper
        yes! yes! yes stop
        yes oh i think i am yes
        echoing it sorry yes
    
    cavik
        that was me sorry
            EXEC::env.embassy.setFocus('cavik')
        this is only my second time using one of these
    
    timestopper
        it is ok!
    
    kazki
        you are too tense!
            EXEC::env.embassy.setFocus('kazki')
        just let it pass through you!
        that is how i stop echoing
    
    timestopper
        are we good? yes! ok
            EXEC::env.embassy.setFocus(false)
        now onto the matters of the call
    
    sourceless
        a great deal of information is transmitted between us
        long-overdue discussions and planning for expeditions
        in an instant, fast even within the altered time of the grand cyst,
        wordless knowledge is understood, assigned words only in afterthought
    
    timestopper
        ÃŠÃ¼â‚¬ÃŸÃ‘ÃºÅ½ÃžRÃ¹Ã£Ãâ„¢Ã·Ã»Ãœâ€ºÃ¶Â±ÃœÂ¨Ãµ*ÃœRÃ´mÃœÃœÃ³Å’ÃœÃ©Ã³SÃÃš
        Ã³ÃªÃ±XÃ²â€¦Ã±Ã´Ã°Â¨Ã±AÃ°ÃÃ²ÃŒÃ¯_Ã´Â°Ã¯â‚¬ÃµÃ®Ã¯
        Ã¿ÃŸÃ…Ã»Ã½ÃžhÃºGÃžÃ¡Ã¸Ã¾ÃœzÃ¶Ã¸Ã›Ã†Ã³]Ã›Ã¤Ã°Æ’Ã›Â©Ã­Â¾ÃšËœÃ©Ã—Ãš9
        Ã´Å¸ÃžÂÃ³]Ã¡â€˜Ã³UÃ¥AÃ´)ÃªÂÃ´
    
    sys
        ATTENTION::'large amount of unprocessable data';'advancing stream to next coherent data'
            EXEC::flash(true)
    
    sourceless
        ...
            EXEC::env.embassy.setFocus('kazki')
        ...
            EXEC::flash(false)
    
    timestopper
        POLYGONATION SPIRE IN GUAM IS LIKELY EASIEST
        KAZKI AGREES?
    
    kazki
        yes! i will organize a meeting
        they liked the last time we visited because it drew lots of attention!
        so a spire would be lucrative for us both! 

    bozko
        it does not need to be of the highest strength or quality
            EXEC::env.embassy.setFocus('bozko')
        there is no hard data backing my decision
        but... kazki's contacts have suggested the trench multiple times
        and if what they say is true, 
        it is one of the least explored places on this planet
        so there is certainly potential for the origin to be there, never seen 

    timestopper
        makes sense! no argument!
        no other leads yet anyway ahaha
        anything else before we disengage?
        no
        wait yes we have the spike
        see!
    
    sourceless
        in our collective minds eye, a visualization of the signal is shown
            EXEC::env.embassy.setFocus(false);content.classList.add('signal')
        a strange spike... but not unexpected given the dull contrivance's proximity
    
    timestopper
        that is peculiar
        this frequency looks unnatural
        it is too far from the call's baseline activity
        could it be an error?
        no - this is aggregate data from many listeners all across this planet
        did not help polygonation regrettably
        so what do we do about it?
        do we just mark it down?
    
    tozik
        wait

    sourceless
        identical memorized data from an archival cyst manifests
            EXEC::env.bgm.rate(0.9);content.classList.add('signal2')
        did he bring up the same record by accident?
            EXEC::env.bgm.rate(0.8)
        no... this is different
            EXEC::env.bgm.rate(0.7)
    
    tozik
        i have been searching through approximately twelve Î¸eyes of data
        this has happened once before. see?
        the same type of spike, with the same duration
    
    timestopper
        how many Î¸eyes ago was that? seven? eight?
    
    gakvu
        look
            EXEC::content.classList.add('signal3')
        that is exactly equidistant from the start of the call
    
    tozik
        exactly
        the exact same spike, at exactly fifty percent of the call
    
    timestopper
        how is that possible? could it be a coincidence?
        absolutely not
    
    tozik
        i have seen this before
            EXEC::env.embassy.setFocus('tozik')
        in my early studies, maybe even larval
        these are markers of raw thought - unoptimized, primal
        what corru knows and broadcasts instinctively, 
        and what early corrucystic pioneers used for communication
    
    sourceless
        a strange dread spreads through our shared mind
        why do i feel it too? is it mine? am i scared?
        this does not mean anything
        
    tozik
        in raw thought transmission, the signal spikes at regular intervals
        five equidistant times, once at the beginning
        and there are no recordings of the exact beginning...
        so that means it could be halfway done, if this is true
        
    timestopper
        ...
        but it has been broadcast for how long?
        how could a thought be that large?
        could we even
        ...
            EXEC::content.classList.remove('signal', 'signal2')

    sourceless
        the dread's claw bites into me, paralyzing my thoughts
        is it mine?? no one is commenting upon it - perhaps confused, themselves...
        so then who is scared? it is overwhelming
        i feel like tearing the cyst from my receptor, but i cannot move
        not without first turning off the time constriction
    
    timestopper
        it could be something else
        there are only two data points here
        a compelling theory but that means we must wait a long time
        are we all in agreement that we should probably tell no one about this
        what!
    
    cavik
        wait, why! this is huge!
            EXEC::env.embassy.setFocus('cavik')
        even just the possibility changes everything...
        you know what this means, right?
    
    akizet
        cavik... this is not a theory of fancy
            EXEC::env.embassy.setFocus('akizet')
        it is true that this does change everything...
        but we are still missing data. right?
    
    timestopper
        right yes we need more
        we cannot simply share it
        not while the evidence is incomplete

    akizet
        is anyone in disagreement?
    
    sourceless
        i sense a mixture of frustration and relief
        indeed, this is compelling, but it is simply a theory
        judging by the team's reactions, even sharing it as a possibility would be quite an upset
        without the theoretical first spike being recorded, it is hard to justify
        either way it is not worth interrogating at this time - we need only wait
        i take everyone's silence as confirmation
        
    akizet
        excellent
        adjourning

    timestopper
        bye everyone!
            EXEC::content.classList.remove('cull-stage', 'showfocus')

    sourceless
        the time constriction disengages. i remove the cyst from my receptor
            EXEC::env.bgm.rate(1)
        in real time, we had been sitting only for the length of a larval breath
        but immediately, everyone stands, relieved at their freedom
            EXEC::content.classList.remove('innerfocus')
        i dip my head and receptors towards the team, and return to my quarters
    
    RESPONSES::sys
        end recollection<+>END
            EXEC::change("embassy_d1_complete", true);corruRefresh()

SKIPNOTICE::this will end the memory stream
SKIP::content.classList.remove('cull-stage', 'showfocus');content.classList.remove('innerfocus');change("embassy_d1_complete", true);corruRefresh()
`)


/* DAY 2 - START + MESSAGECYST  */
env.dialogues["d2_start"] = generateDialogueObject(` 
start
    sourceless
        I AWAKEN FROM THE STILLNESS OF MY REJUVENATION
        THROUGH THE DISTANT DULL CONTRIVANCE, I FEEL ANOTHER Î¸gaze HAS BEGUN
            EXEC::env.embassy.slowCam()

        AND AS I CLAMBER OUT FROM MY CHAMBER, I SEE SOMETHING NEW...
            EXEC::specialCam('cystfocus')

        AN UNFAMILIAR CYST LAID UPON MY DESK
        WAS THIS THE ONE I LENT TO CAVIK, RETURNED IN MY SLUMBER?
        MAYBE THE DESIGN ARCHIVE FROM HOME I GAVE TO KAZKI...
        OR PERHAPS GAKVU'S FALSE ENVIRONMENT GAME?
            SHOWIF::[["embassy__d1_gakvu-false"]]
        I SHOULD CHECK TO BE SURE
            EXEC::env.embassy.slowCam()

    RESPONSES::akizet
        curious<+>END
            EXEC::specialCam(false);pauseSwapCam(false)
`)

env.dialogues["cyst"] = generateDialogueObject(` 
start
    sourceless
        PECULIAR...
            EXEC::pauseSwapCam(true)
        THIS CYST HAS NO DISTINCT SHELL
        A FLOURISHING SPIRAL MARKS IT... BUT I DO NOT KNOW WHAT THAT MEANS
        I SUPPOSE I SHOULD TRY IT ON AND SEE WHAT IT IS

    sys
        ATTENTION::"event required for continued stream";"skip ahead?"
            SHOWIF::"embassy__echo3"
    
    RESPONSES::akizet
        connect<+>connection
        leave it<+>END
            EXEC::pauseSwapCam(false);

    RESPONSES::sys
        skip<+>END
            SHOWIF::"embassy__echo3"
            EXEC::change("PAGE!!akiroomunlocked", true);change("PAGE!!cystmelted", true);content.classList.add('cystmelted');step();pauseSwapCam(false);
            FAKEEND::(skip sequence)

connection
    sourceless
        I RAISE THE CYST TO A RECEPTOR AND SETTLE IT
        AFTER A SMALL DELAY, IT ACTIVATES, AND A CONSCIOUSNESS MAKES ITSELF KNOWN
        AN ECHO WITH A MESSAGE LEFT FOR ME... 
            EXEC::vnp({echo: "show"})
        WE EXCHANGE WORDLESS MEANING, FORMING INTO THOUGHTS
    
    echo
        HELLO AKIZETESCHE!
    
    sourceless
        HELLO FRIEND! WHO IS THIS?
    
    echo
        I DO NOT KNOW. ALL MEMORY SAVE FOR MY MESSAGE HAS BEEN STRIPPED
        I FEEL THAT MY SPEAKER WANTED THIS MESSAGE TO BE DISCREET
            EXEC::content.classList.add('fade-stage')
        
    sourceless
        CURIOUS! BUT PLEASE GO ON
        
    echo
        EXCELLENT
        I WILL CONVEY THE MESSAGE TO THE BEST OF MY ABILITY
        HENCEFORTH: 'I' WILL REFERENCE MY SPEAKER

    sourceless
        the echo's message forms into imagery - a false environment that i allow my mind to enter
            EXEC::changeStage("echovision");vn.done()
        it is simple... simple enough that it should only occupy a fraction of a Î¸blink
        the echo awaits my engagement to continue

    RESPONSES::akizet
        go ahead<+>END
            FAKEEND::continue
            EXEC::pauseSwapCam(false);body.classList.add("pathstep0");env.embassy.echoChatter(1)
`)

env.dialogues["echo1"] = generateDialogueObject(` 
start
    echo
        the call, akizet
            EXEC::content.setAttribute("ech", "call");forceSwapCam(true);specialCam("ecall");change("PAGE!!e1", true)
        the initiative to study it, both here and home, holds certain conflicting groups
            EXEC::content.setAttribute("ech", "calleye");specialCam("eclaw")
        they have always known <em>what</em> its origin truly is,
        and they will resort to violence to keep this secret
            EXEC::content.setAttribute("ech", "calleyeclaw")
        while what we have discovered is indirect,
        a smaller organ in the whole of the truth,
        it is dangerous to hold as we do
        to share even a hint of it could meet us all with our final deaths
            EXEC::content.setAttribute("ech", "calleyeclawcrush")
        
    sourceless
        this notion alone is enough to spark anger
        the type of baseless theory a paranoid kiv might concoct

    akizet
        the council would never have approved our research if this were the case
            EXEC::specialCam("eaki")
        are you simply sowing suspicion? is this a threat?
        or is this a poorly timed prank? 
        velzie would be unimpressed

    echo
        please understand, there is much we still do not know
            EXEC::specialCam("echoclose")
        our research is entirely necessary
        especially with the unaffiliated, the unbiased, like you
        and i care about you, akizet
        you should not have to be a part of this
        but this sliver of truth we carry places us all in a terrible game
        one that velzie's cruel humor could not dream

    akizet
        so it was you who broadcast that dread in our focus

    echo
        a fraction of it, yes,
        but i am not the only one involved with this game
        i suspect others operate within our team
        and though they are friends all,
        this conflict seeks to place us as foes
        the claws of it reach far beyond us, too
            EXEC::content.setAttribute("ech", "crowd");specialCam("ecrowd")
        it is a cold wind that suffuses the entire embassy
        but this discovery of the raw thought pattern...
        it will become like a spirestorm
        none of us - not even would-be foes - want this to escalate
        so hear my plea:
            EXEC::content.removeAttribute("ech")
        you must take every measure to hide this
        we cannot risk any sliver of our knowledge escaping
        do you understand?

    sourceless
        despite my skepticism,
            EXEC::specialCam("eaki")
        i feel that this is heartfelt, truthful
        a difficult feeling to fake with an echo
        indeed, the tone is one of defensive panic
        so i must respond,
        
    RESPONSES::akizet
        yes, i understand<+>END
            FAKEEND::continue
            EXEC::forceSwapCam(false);specialCam("")

END::env.embassy.echoChatter(2)
`)

env.dialogues["echo2"] = generateDialogueObject(` 
start
    sourceless
        despite my agreement, i cannot dispel this uneasy coil in my receptors
            EXEC::pauseSwapCam(true)
        to have this dangled before me as a vague threat...
        but how else am i to respond, whether this is true or not?
        it is not as if i intended to share it in the first place...
        do they simply fear what might happen if i examine our theory more closely?
        in case there is a connection back to the source, i must continue my agreement

    akizet
        what happens next?

    echo
        for you, nothing
        i am taking every measure to protect our team
        even the misled traitors
        i have already hidden the archived discussion from our focus
        we will not speak, we will not share, you will not know who i am
        eventually, we will be forced to share our findings and reveal the truth
        but there is time to prepare the stage
        if this is not handled delicately,
        all of us - bright cousins included - will suffer terrible consequences
        they are innocent bystanders, they do not deserve what may come
        but if you allow me, 
        if you can trust this echo as i have pleaded to velzie you might,
        everything will be fine
        that is truly all i can tell you
        goodbye akizet
            EXEC::content.setAttribute("ech", "bye")

    akizet
        wait
        is there any proof you can share?
        anything at all?
        i want to trust you
        but i must know it to be true
        and what if we find something else?
        how much of our work is truly at risk??
    
    RESPONSES::akizet
        ...<+>END
            FAKEEND::continue
            EXEC::pauseSwapCam(false)

END::env.embassy.echoChatter(3)
`)

env.dialogues["echo3"] = generateDialogueObject(` 
start
    sourceless quiet
        i tear the cyst from my receptor before it can fully melt, throwing it to the table
            EXEC::pauseSwapCam(true);change("PAGE!!cystmelted", true);content.classList.add('cystmelted')

    sourceless
        the echo cyst self-destructed...
        what do i do? what can i do?
        i need guidance
        funfriend!! activate

    funfriend
        HELLO AKIZET!!
        HOW ARE Y
    
    sourceless
        should i even try asking who left it?
        but what if i ask the wrong person?
        these... groups. will one side think the other has tried to sway me?
        and what could they even be quarreling over?
        i have never heard once of any conflict
    
    funfriend
        SLOW DOWN I DO NOT EVEN KNOW WHAT YOU ARE TALKING ABOUT!
        LET ME SEE YOUR RECENT MEMORY PLEASE!
    
    sourceless
        i grant funfriend access to my short-term memory with an impulse
        but that does not matter, for i have already come to a conclusion
        yes--i know!
        i can ask the team, one by one--hide the details!
        i will say it is some mundane thing, some borrowed cyst being returned,
        but the speaker who placed it...
    
    funfriend
        AKIZET IT DOES NOT SEEM LIKE THEY WANT YOU INVOLVED
        WOULD IT NOT BE BETTER TO SIMPLY STAY QUIET LIKE THEY WANT?
        LIKE YOU ALREADY AGREED ANYWAY!
        IF THEY HAVE TAKEN THIS MEASURE, ASSUMING IT IS TRUTHFUL
        WHY WOULD THEY EVEN GIVE A SLIGHT HINT TO YOU IN-PERSON?

    sourceless
        they may hint unwillingly
        funfriend, i cannot simply let such claims go uninvestigated
        the speaker must know this as well
        doubly so if they are within our team
        but they are also watching my actions, so...
        i should still be careful with my words
        
    funfriend
        THIS IS A BAD IDEA

    sourceless
        thank you for your input funfriend
            EXEC::change("PAGE!!akiroomunlocked", true);step()

    RESPONSES::akizet
        i must investigate<+>END
            EXEC::pauseSwapCam(false)
`)

/* DAY 2 - ATTENDANT/GROUNDSMIND */
env.dialogues["d2_attendantresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        corrucyst in my room?<+>cyst
            SHOWIF::[['embassy__d2_attendant-personnel']]
        that is all<+>leave
            FAKEEND::(leave)
`)

env.dialogues["d2_attendant"] = generateDialogueObject(` 
start
    sourceless
        I APPROACH THE ATTENDANT DRONE
            EXEC::pauseSwapCam(true)
        IT IS FACELESS AT THE MOMENT
        SO IT REGARDS ME WITH A SIMPLE STARE

    RESPONSES::akizet
        did you see something?<+>personnel
            SHOWIF::[['stageroom', 'embassy_personnel']]
        speak with groundsmind<+>groundsmind
            SHOWIF::[['embassy__d2_attendant-personnel']]
        goodbye<+>END
            EXEC::pauseSwapCam(false)
    
personnel
    sourceless
        THOUGH THE DRONE IS FACELESS...
        THE SIMPLE ECHO THAT OBSERVES MAY STILL HAVE SEEN SOMETHING
    
    akizet
        hello! no connection required
        did you...
        see anything, go into my room?
    
    attendant
        A SPINDLE-LEGGED CORRUCYST ENTERED SOME Î¸winks AGO
        IT WAS ASSUMED TO BE A SELF-DELIVERING DEVICE
    
    sourceless
        INTERESTING... I SUPPOSE THAT MAKES SENSE
        THE SPEAKER MUST HAVE KNOWN THE ATTENDANT WOULD BE HERE
    
    attendant
        DO YOU REQUIRE ANYTHING ELSE

    RESPONSES::akizet
        did you see something?<+>personnel
            SHOWIF::[['stageroom', 'embassy_personnel']]
        speak with groundsmind<+>groundsmind
            SHOWIF::[['embassy__d2_attendant-personnel']]
        no thank you<+>END
            EXEC::pauseSwapCam(false)

groundsmind
    akizet
        the groundsmind, please

    sourceless
        THE DRONE STRAIGHTENS, AND A CONNECTIVE RIPPLE PASSES THROUGH ITS SKIN
        OUR GROUNDSMIND'S SYMBOL IS FORMED OVER ITS FACEPLATE
            EXEC::content.classList.add('groundsminded')
    
    groundsmind
        akizetesche. speak

    RESPONSES::akizet
        the cyst<+>cyst
        nevermind bye i am leaving<+>leave
            FAKEEND::(leave)
    
cyst
    akizet
        i had a self-delivered cyst on my desk, arriving during my slumber
        do you have any records of it?

    groundsmind
        that will depend on its features
        if you have it, present it
        otherwise: describe it

    sourceless
        Ã¥ADÃ‰:!Â±(:
        IT SELF DESTRUCTED...
        SHOULD I MENTION THE SPIRAL?
        NO--WHAT IF IT IS AN IDENTIFIER SOMEHOW?
        IT COULD MEAN SOMETHING DANGEROUS

    akizet
        umm,
        i do not really remember how it looked
        can you cross-check it with other attendants?
        did it form any relocation hallways?
    
    sourceless
        THE GROUNDSMIND IS SILENT FOR A MOMENT
        SHE MUST SEE ME LIKE A LARVAL FOOL
    
    groundsmind
        akizetesche,
        i cannot help you without a point of reference
        an innumerable amount of cysts are self-delivered every Î¸gaze
        and each are mundane in nature.
        what has you seeking information about this one in particular?

    sourceless
        BAD IDEA

    akizet
        it was, ah...
        actually, you know, i think i realize who sent it actually
        yes, it was a team-member, ahaha
        i will just go ask them!
        goodbye!

    sourceless
        I CASUALLY WALK AWAY IN A PANIC
        WHAT IF THE GROUNDSMIND IS A PART OF THIS?

    RESPONSES::akizet
        how embarrassing<+>END
            EXEC::pauseSwapCam(false)

leave
    akizet
        nothing! nevermind
        apologies for drawing your attention
    
    groundsmind
        excellent
        fare well
    
    sourceless
        THE DRONE DISCONNECTS FROM THE GROUNDSMIND AND STANDS STILL ONCE MORE
            EXEC::content.classList.remove('groundsminded')
    
    RESPONSES::akizet
        leave<+>END
            EXEC::pauseSwapCam(false)

END::content.classList.remove('groundsminded')
`)

/* DAY 2 - BOZKI + CAVIK */
env.dialogues["d2_bozkocavik"] = generateDialogueObject(` 
start
    sourceless
        CAVIK AND BOZKO SPEAK JOVIALLY BETWEEN A SET OF QUARTERS
            EXEC::pauseSwapCam(true)
        CURIOUS... THEIRS ARE NOT WITHIN THIS Î¸branch
        I APPROACH, MASKING MY SUSPICION WELL
    
    akizet
        bozko! cavik! hello! great gaze!
            EXEC::vnp({hideStage: true, cavik: "show", bozko: "show"})

    bozko
        akizet
    
    cavik
        hey akizet!! 

    akizet
        what brings you to this Î¸branch of the Î¸segment?

    cavik
        ah, we are just waiting for mokka!
        there is that brief marianas expedition we must attend today
    
    sourceless
        MOKKA... WHO IS THAT? 
        
    funfriend
        OFFLOADED MEMORY: MOKKANESCHE, AN EXCHANGE FROM MATERIALS!
        
    sourceless
        AH! YES. I FORGOT SHE WAS IN THIS Î¸branch, TOO
        I HAVE NOT SEEN HER IN A WHILE... 
        OUR AREAS OF OPERATION RARELY INTERSECT
    
    akizet
        from materials? what for?
    
    bozko
        thought it might be fun
        also... if there are any essential deposits in the area,
        that could speed up construction of the polygonation spire
    
    akizet
        ah, of course

    RESPONSES::akizet
        did either of you return a cyst?<+>cyst
        enjoy your trip<+>END
            EXEC::pauseSwapCam(false);vn.done()

cyst
    akizet
        my friends,
        did either of you return a cyst to my quarters recently?
        i awoke from my rejuvenation, and there was one waiting for me!
    
    cavik
        huh! no, not me!
        what was on it?
    
    sourceless
        FUNFRIEND: ASSUME NON-VERBAL MOTOR CONTROL
        DIRECTIVE: ACT NORMAL
    
    funfriend
        OK! AHAHA
        UTILIZING ARCHIVED MOVEMENTS!
        YOU LOOK SO CASUAL RIGHT NOW!

    akizet
        oh, it was just, a,
        archival cyst
        on secri... hunting habits
    
    sourceless
        IS IT JUST ME OR DOES BOZKO SEEM SKEPTICAL
        DID I MAKE A MISTAKE
    
    funfriend
        RELAX
        YOU DID MESS UP
        BUT THEY PROBABLY THINK YOU ARE LYING FOR ANOTHER REASON
    
    cavik
        oh!
        cool

    sourceless
        ...

    akizet
        bozko?
    
    sourceless
        HE TWISTS HIS RECEPTORS NEGATIVELY
    
    bozko
        the less i know about secri, the better
        why would someone leave you that?
    
    akizet
        oh, it was mine to begin with,
        i had lent it out to someone at some point
        i, ah, had it, because of a morbid fascination
        you know how it is--surface running
    
    bozko
        yeah, i get it

    funfriend
        RECOMMENDATION: BACK OUT
    
    akizet
        well, thank you anyway
        i need to get going
        enjoy your expedition
    
    cavik
        bye akizet!
            EXEC::env.embassy.d2progress('bozkocavik')
    
    RESPONSES::akizet
        bye<+>END
            EXEC::pauseSwapCam(false);vn.done()
`)


/* DAY 2 - GAKVU */
env.dialogues["d2_gakvuresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        cyst in my room<+>cyst
            EXEC::env.embassy.d2progress('gakvu')
        how is it going<+>how
        goodbye for now<+>bye
            FAKEEND::(leave)
`)
env.dialogues["d2_gakvu"] = generateDialogueObject(` 
start
    sourceless
        GAKVU SLOUCHES BEFORE A COMMUNAL CYST, CONNECTED BY A RECEPTOR
            EXEC::pauseSwapCam(true)
        AS I APPROACH, THE CHAIR ACROSS FROM HER SCUTTLES OUTWARDS FOR ME TO SIT
        THE CLICK OF ITS LITTLE LEGS AGAINST THE GLASSY FLOOR DRAWS GAKVU'S ATTENTION OUT OF HER CONNECTION
    
    gakvu
        oh, akizet! come, sit!

    akizet
        i am not interrupting anything, am i?
            EXEC::specialCam("gakvusit")
    
    gakvu
        not right now, just browsing environments
        i tire of mine
        the surface is exhilarating and terrifying, yes, but...
        you can only die so many times before it is boring!
    
    RESPOBJ::d2_gakvuresp

how
    akizet
        gakvu,
        how beholds you?
    
    sourceless
        A HARMLESS, COMMON QUESTION
        BUT I HAVE POSED IT SUCH THAT SHE KNOWS WHAT I MEAN
        SHE KIND OF LAUGHS, A CYNICAL DISAPPOINTMENT IN HER TONE
    
    gakvu
        well, my work is for nothing
        it does not bother me as much as it should,
        maybe because we never really knew what we were dealing with...

    akizet
        even if the theory is true, it was through your and tozik's work that this discovery occurred!
        besides, we still do not have all of the data
    
    gakvu
        yeah...

    akizet
        you could always join bozko's field expeditions
        perhaps we shift you and tozik to work more frequently with the bright cousins?

    sourceless
        HER EYES GROW DISTANT, HER ATTENTION DRAWN THROUGH THE CYST'S CONNECTION
        EVEN SO, SHE SPEAKS - SHE IS GOOD AT JUGGLING REALITY AND COLLECTIVE
    
    gakvu
        akizet,
        do you think anything else is possible?
        
    akizet
        ah, of course! there is the construction of, ah,

    gakvu
        no no, not work... i mean, the call.

    sourceless
        SHE CHOOSES HER WORDS CAREFULLY HERE IN PUBLIC
        BUT I KNOW WHAT SHE MEANS

    akizet
        truthfully... i am not sure
        it is in velzie's nature to place the truth before us, just out of reach
        and just as fitting for it to be an illusion
        i am not comfortable accepting it until we can prove it without doubt
    
    sourceless
        GAKVU IS QUIET FOR A LONG MOMENT, HER FACE STILL DISTANT
        I WORRY FOR AN INSTANT THAT SHE BALANCED TOO FAR INTO THE COLLECTIVE AND DID NOT HEAR ME
        BUT SHE EVENTUALLY RESPONDS, TEASING ME
    
    gakvu
        do you think every wall is a lie before you touch it?
        sometimes things are as simple as they seem
        velzie is not out to get you
        anyway, i do not really care
        i am fine with me and tozik continuing pattern identification
        that just means i have more time for my false environments
    
    RESPOBJ::d2_gakvuresp
    
cyst
    akizet
        gakvu, did you happen to have a cyst self-deliver to my room recently?
    
    gakvu
        huh?
    
    sourceless
        GAKVU'S ATTENTION IS DRAWN FULLY OUTWARDS, TOWARDS ME, WITH A WORRIED STARE
        AN UNCOMMON SIGHT, ONE THAT CATCHES ME OFF-GUARD
        SHE SEES MY SURPRISE CLEARLY FOR AN INSTANT
        FUNFRIEND - ASSUME MOTOR CONTROL. LOOK NORMAL
    
    funfriend
        OK!
        SHE WILL NOT SUSPECT A THING!

    gakvu
        no. what was it?
        when did it arrive?

    akizet
        ah, it was an... archival cyst, it appeared sometime during my rejuvenation
        it was on secri hunting habits
        i had given it to someone a while back... but i could not remember who
        and there it was! sitting on my table
        i thought, perhaps it was you--given your preoccupation with the surface
    
    sourceless
        DOES IT LOOK LIKE SHE SUSPECTS SOMETHING?
    
    funfriend
        NO - SHE ALWAYS LOOKS LIKE THAT

    gakvu
        oh, no no.
        huh... self-delivered
        someone on the team would have just given it to you in-person
        that is very, very strange
    
    sourceless
        THAT IS MOST CERTAINLY CONCERN IN HER VOICE
    
    akizet
        haha yes maybe it is a little strange hehe
        but it was just my secri cyst
    
    gakvu
        if i remember correctly, you are deathly afraid of them, right?
        why would you have that?
        recreational terror?
    
    funfriend
        OK SHE ACTUALLY PROBABLY THINKS YOU ARE LYING NOW
    
    sourceless
        BEHOLD, MY REDIRECTION:
    
    akizet
        shut up!!
        it is no different from your false environments!

    sourceless
        SHE LAUGHS QUIETLY, HAVING NO DEFENSE
        AND NOTHING MORE TO ADD ON THE MATTER, IT SEEMS

    RESPOBJ::d2_gakvuresp

bye
    akizet
        i should be going
        goodbye for now, my friend
    
    sourceless
        GAKVU WAVES HER FREE RECEPTOR ABSENTLY
    
    RESPONSES::akizet
        leave<+>END
            EXEC::pauseSwapCam(false)

END::specialCam(false)
`)

/* DAY 2 - TOZIK */
env.dialogues["d2_tozikresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        the cyst<+>cyst
            EXEC::env.embassy.d2progress('tozik')
        your thoughts<+>thoughts
        fare well for now<+>bye
            EXEC::vn.done()
            FAKEEND::(leave)
`)
env.dialogues["d2_tozik"] = generateDialogueObject(` 
start
    sourceless
        TOZIK STANDS NEAR THE ORANGE BAR, GRASPING A TASTE SIMULACRUM
            EXEC::pauseSwapCam(true)
        AN ODD HABIT... I COULD NEVER QUITE CONNECT WITH IT
        HIS ATTENTION IS INWARD, YET I SEE NO EXTERNAL CYST CONNECTED
        LOST IN THOUGHT, PERHAPS

    akizet
        hello tozik

    sourceless
        HE LOOKS AT ME AND TWISTS A STOUT RECEPTOR IN A SHORT GREETING
            EXEC::vnp({hideStage: true, tozik: "show"})
    
    tozik
        do you need something?
    
    RESPOBJ::d2_tozikresp

thoughts
    akizet
        you seem troubled
        as do we all, i suppose...
        but is something specific on your mind?
    
    sourceless
        A SOMEWHAT POINTED QUESTION...
        BUT IF HE HAD INVOLVEMENT WITH THE CYST, SURELY HE WOULD FLINCH
        ...
        AND... HE MERELY SIPS FROM THE BRIGHT SIMULACRUM
        IN THE SUBTLE MOVEMENTS OF HIS RECEPTORS, I SEE DISINTEREST
        BUT HE CONTINUES ANYWAY, TROUBLED ENOUGH TO SUSTAIN A RARE CONVERSATION
    
    tozik
        i had been curious... about whether the spike was observed from obeski
        surely others would have come to the same conclusion as us, there is a following of the call back home
        so i peered into a number of discussions through the collective...
        and discussion is rare. they seem to dismiss it as an error, or something to do with the contrivance

    sourceless
        HE PAUSES, INCONSPICUOUSLY LOOKING AROUND
        THE SAME EXPRESSION AS A SURFACE RUNNER AT REST
        DID HE RECEIVE A MESSAGE TOO?
        WHEN HE CONTINUES, HE LOWERS HIS VOICE
    
    tozik
        but the collective has all of our information available, including older records of the call
        the same ones we used to come to our... theory. in theory.
        so i checked, and... there is no record of the first spike
        no... that is incorrect
        the record exists, but, it is... wrong
        it is wrong
        there is no spike in the public version
        why is there one in ours?
    
    sourceless
        HE PAUSES AGAIN, LOOKING DOWN AT HIS TASTE SIMULACRUM
        I FIND MYSELF UNABLE TO ANSWER - THIS IS A BIZARRE DEVELOPMENT
        OUR ARCHIVES ARE PRIMARY SOURCES FROM THE VAZNIAN LISTENERS, THE OLDEST OF ALL
        AND PERHAPS THE MOST RELIABLE
        WHAT ARE THE ODDS OF A RECORDING ERROR HAPPENING AT THAT EXACT TIME?
        I NOTICE HIS gaze HAS DRAWN BACK UP TO ME, AND HE IS ENTERTAINED BY MY CONFUSION
    
    tozik
        you see now

    akizet
        i do... that is...
    
    tozik
        error or no, there is nothing to do but wait

    sourceless
        HE PUNCTUATES HIMSELF BY SIPPING AGAIN FROM HIS SIMULACRUM
        A LOOK AWAY AND WAGGLE OF A RECEPTOR TELLS ME ALL - LET US SPEAK NO MORE OF THIS

    RESPOBJ::d2_tozikresp
    
cyst
    akizet
        tozik, did you direct a cyst to my room recently?
        i found one on my desk after i awoke from rejuvenation
    
    tozik
        no
    
    sourceless
        HIS ANSWER IS STONY, FOCUS REMAINING INWARD, NOT EVEN LOOKING AT ME
        I RESPECT THAT HE DOES NOT PRY INTO THE MATTER
        SHOULD I PUSH HIM ON IT?
        
    funfriend
        THAT COULD BE FATAL AKIZET
        IF YOU MUST, AT LEAST BE GENTLE ABOUT IT

    akizet
        are you sure?
    
    sourceless
        MY REPEATED QUESTION EARNS HIS OUTWARD ATTENTION
        HE REGARDS ME WITH SILENCE, BUT SUCH PALPABLE DISINTEREST
        AFTER AN INSTANT OF GAZING, PERHAPS TO INTUIT WHAT I REALLY MEAN, HE RESPONDS
    
    tozik
        yes

    akizet
        all right
    
    sourceless
        WHEN I RELENT, HE RETURNS TO HIS THOUGHTS
        I DOUBT IT IS HIM... OR IF IT IS, HE TRULY WANTS TO GIVE NO HINTS

    RESPOBJ::d2_tozikresp

bye
    akizet
        bye tozik!

    sourceless
        HE NODS A RECEPTOR AT ME
    
    RESPONSES::akizet
        leave<+>END
            EXEC::pauseSwapCam(false)
`)

/* DAY 2 - KAZKI */
env.dialogues["d2_kazkiresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        the cyst<+>cyst
            EXEC::env.embassy.d2progress('kazki')
        your creature<+>creature
        fare well for now<+>bye
            EXEC::vn.done()
            FAKEEND::(leave)
`)
env.dialogues["d2_kazki"] = generateDialogueObject(` 
start
    sourceless
        SURPRISINGLY, KAZKI STANDS WITHIN THE VERY SAME RELOCATOR AS ME
            EXEC::pauseSwapCam(true)
        THE CHANCES OF THIS ARE SLIM, BUT SHE APPEARS TO BE LOITERING, WAITING FOR SOMETHING
        IS SHE WAITING FOR ME?
        HELD WITHIN ONE OF HER BRANCHED RECEPTORS IS A COMMUNICATIONS CYST
        WITH THE OTHER, SHE GIVES ME A KIND GREETING
            EXEC::vnp({hideStage: true, kazki: "show"})
    
    kazki
        hii akizet!
    
    akizet
        kazki!
        this is a surprise--i do not often see you linger in this Î¸segment
        what brings you here?
    
    kazki
        ohh, i am waiting for the crew!
        they are having their little expedition, 
        and i am headed to the shores to discuss the next polygonation spire... again
        but!! we are all setting out together
    
    akizet
        ah, of course

    RESPOBJ::d2_kazkiresp

creature
    akizet
        how is the little creature faring?

    kazki
        it is alive!!
        it does not move very much... but it reacts very quickly to my prodding!
        i have been speaking with a contact of mine, a bright cousin

    sourceless
        SHE WAGS THE COMMUNICATOR-BEARING RECEPTOR SLIGHTLY

    kazki
        and she says it is a 'arthropod'!
        so--i thought, i will call it 'arthur'!
        after the bureau construction contact!

    sourceless
        AH--ARTHUR
        A JITTERY ONE...
        IF ONLY I COULD BE THERE WHEN SHE OPENS HER HEAD TO SHOW THE CREATURE WITHIN TO HIM
        WAIT--WHAT WAS THAT SHE SAID?
    
    akizet
        you are on casual speaking terms with a bright cousin?
    
    sourceless
        WITH HER LARGE RECEPTORS, HER BASHFUL EXPRESSION IS DIFFICULT TO HIDE
        SHE MUST THINK I WILL TAKE ISSUE--WHY DOES SHE ALWAYS ASSUME THIS?

    akizet
        kazki, you know it is not an issue if you are
        the silent veil has long been drawn
        but--how are you communicating? 
    
    kazki
        oh!!
        you have not heard?
        it is a new development by the Î¸jut
        very recent! these new communicators...
        they allow a sort of connection to the human collective!
        the 'internet' they call it!
        it is very flat... and there are many problems with the connection
        but it is not so different from ours aside from that!

    sourceless
        HOW COULD THAT POSSIBLY WORK?
        THEIRS IS NOT DICTATED BY THOUGHT...
        AH, IT DOES NOT MATTER - SHE WOULD NOT KNOW ANYWAY

    akizet
        and you are using it to speak with a bright cousin?
    
    kazki
        yes!!
        is that not remarkable?? it is COOL!!!

    akizet
        fascinating...
        i must see about getting one of those

    RESPOBJ::d2_kazkiresp

cyst
    sourceless
        THIS SHOULD BE EASY
        KAZKI SIMPLY CANNOT HIDE ANY EMOTION

    akizet
        kazki, did you have a cyst delivered to my room recently?
    
    kazki
        huh? no!

    sourceless
        NOTHING... IT IS NOT HER

    kazki
        i have been so busy coordinating all of this!
        but i do have a few cysts i need to return to you...
        what was it?
    
    akizet
        ah, it was nothing of note, a mundane collection of memories
        
    kazki
        i can ask around for you!
    
    sourceless
        â€¦Â¤,Â¿â€¦Â¶Â¡Ã˜n

    funfriend
        RECOMMENDATION: DEFINITELY STOP THAT NOW

    sourceless
        I HAD NOT CONSIDERED THIS POSSIBILITY...
        BUT SHE ALWAYS GETS INVOLVED
        IF WORD SPREADS, THE SPEAKER WILL SUSPECT SOMETHING STRANGE IS HAPPENING

    akizet
        ah--no, no no
        no no, it is all right
    
    kazki
        are you sure??
        i have my communicator on right now, i could help!
    
    sourceless
        I WAVE MY RECEPTORS NEGATIVELY WITH PERHAPS TOO MUCH EMPHASIS, AND SHE RELENTS
        SHE SMILES LIKE A BRIGHT COUSIN WOULD, HER RECEPTORS TAKING ON A TEASING POSTURE

    kazki
        oh, i think i get it
        it was one of <em>those</em> cysts

    akizet
        no!! no no no

    kazki
        uh-huh!!

    funfriend
        ACTUALLY MAYBE LET HER THINK THAT SO SHE WILL STAY QUIET
    
    sourceless
        UUGH
        YOU ARE RIGHT... FINE
        I WILL ABIDE THIS EMBARRASSMENT
    
    akizet
        ...
        ok, it was,
        but please do not tell anyone
        
    kazki
        do not worry!!
        it is between us and the arthropod!

    RESPOBJ::d2_kazkiresp

bye
    akizet
        bye kazki!

    kazki
        bye!!
    
    RESPONSES::akizet
        leave<+>END
            EXEC::pauseSwapCam(false)
`)

/* DAY 2 - END OF EMBASSY */
env.dialogues["realization"] = generateDialogueObject(` 
start
    sourceless
        FUNFRIEND
            EXEC::content.classList.add('showaki');

    funfriend
        hello akizet!!

    sourceless
        that is everyone...
    
    funfriend
        yes it was!

    sourceless
        and nothing. i surely spoke to the speaker at some point
        but they must be well-practiced in subterfuge
        and did you notice - no one else seemed concerned

    funfriend
        what about gakvu? she seemed surprised
        
    sourceless
        true, but it is a strange matter to begin with
        what if none of this is real to begin with, and the message was simply made to confuse me?
        no, no joke would ever be taken this far
        they would simply have cracked at my confrontration...
        and to that end - could i be the only one who received this message?
        why not cavik?! i would have seen it in his receptors if he was also contacted!
        and he is the greatest threat of all to any secrecy!!
        so what if he is a part of this conflict, too??
    
    funfriend
        akizet everything is fine
        i understand your worry but there is no urgency here

    sourceless
        ...yes, you are right
        thank you funfriend
        i must calm myself, approach this rationally
        but you understand: i cannot trust my own team
        nor any qou--here or home
        it is like i am in a city usurped by <span class="code" definition="INHERITED CONTEXT::'violent parasitic surface fauna';'hijacks mind of victim for use as social camouflage';'ekivik profanity';'not intended to be profane here'">zuzucri</span>
        anyone could be compromised, a part of this 'game'
        and even if we continue our research work,
        what if we find something else too close to the truth? 
        will we be under even greater threat?
        do i do anything? do i simply wait for the truth?
        it will be so long... so many Î¸eyes
        funfriend you know i cannot simply stop my work
        especially if we are just beyond the threshold of understanding the call
        this is everything
    
    funfriend
        akizet, i cannot know what is right
        but you know what i will say already
        i feel that you should simply wait
        they said the team's research is still important
        and it sounds like they have this under control
        getting involved will probably not lead to anything good
        perhaps you could simply continue with your team,

    sourceless
        ah!
        i know!
        yes!
    
    funfriend
        akizet you really should probably not

    sourceless
        the bright cousins...
        the echo implied they know nothing!
        the envoy!
        yes, i must speak to him
        perhaps... if i place my words correctly,
        my research efforts could become two-fold
        one here, with my team, careful not to cross this invisible line...
        and another, more discreetly, with his bureau!
        where we may discover what these groups seek to hide
        yes, if i can simply know <em>what</em> it is, then...
    
    funfriend
        wait!!
        gordon has limited control, he is a part of a larger system!
        what of his leaders?
    
    sourceless
        he is...
        but our bright cousins are good with secrets
        they know so much that could raise concern already
        and not once has any of it ever hit their public mind
        indeed, they have very little correspondence outside of direct contacts
        and i am the only direct contact for the call research initiative
        though, there is kazki's construction contact...
        our cross-initiative ties will make for some sensitive matters to avoid

    funfriend
        they cannot detect the call with their own technology
        and they do not possess the biology to interact with ours
        how do you expect them to help you?
    
    sourceless
        perhaps we can share a few things...
        do you recall the murmurs of 'integrated bright technology'?
        since it was shelved...
        the technology division has stored much of the schematics plainly within embassy archives
        oh yes, this is coming together, is it not? how exciting

    funfriend
        akizet i do not like this idea! ahahaha
        but i will support you regardless

    sourceless
        excellent...
        to the vessel, then
        please contact him and tell him i am coming in person
        say that i have news of the call and that we must speak privately

    funfriend
        understood

    sys
        ATTENTION::'memory stream continues externally';'follow stream?'

____SHOWONCE::
    moth
        looks like this will take you to the street spatial thoughtform...
        i'm reading that it leads directly to something that's accessible there already
        weird... looks like it has more than before? specifically that chat with gordon
            SHOWIF::"citystreet__envoychat-start"
        i think funfriend fixed it? i didn't even know that part of it was busted
            SHOWIF::"citystreet__envoychat-start"
        or... maybe this thoughtform and the street are interwoven somehow.
            SHOWIF::"citystreet__envoychat-start"
        you said you hear music, right? does any of it sound familiar?
            SHOWIF::[["++mothglobal-why_music"],["citystreet__envoychat-start"]]
        because, it could be that when funfriend repaired this thoughtform, 
            SHOWIF::"citystreet__envoychat-start"
        he also repaired this memory stream into the city that had more data
            SHOWIF::"citystreet__envoychat-start"
        so if you don't follow the stream right now, you should still just be able to go there later and see it anyway
____END

    RESPONSES::sys
        follow stream<+>END
            EXEC::change("embassy_d2_complete", true);change("TEMP!!ep1_goingtogordon", true);moveTo("/local/city/street/")
        end recollection<+>END
            EXEC::change("embassy_d2_complete", true);env.bgm.pause();corruRefresh()
`)