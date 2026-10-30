/* embassy functions and stuff for golem maintenance */
env.embassy.startGolemFight = (formation, endDialogue)=>{
    env.combat.dynamicCombat({
        specificFormation: formation,
        specificCallback: (loser) => {
            if(loser.name != "ally") {
                startDialogue(endDialogue)
            } else {
                env.combat.lossState()
            }
        }
    })
}

env.embassy.music_embassy_uncanny = new Howl({
    onload: function () {
        page.howls.push(this)
        this.intendedVol = 0.9
    },
    src: ['/audio/bs_uncanny.ogg'],
    preload: true,
    loop: true,
    volume: 0.9,
    sprite: {
        __default: [0, 9999999, true]
    }
})

//off / boot / on
//changes page!!geli when applicable
env.embassy.geliState = (state) => {
    switch(state) {
        case "off":
            content.classList.add('gelioff')
            content.classList.remove('geliboot')
        break
        case "boot":
            content.classList.add('geliboot')
            content.classList.remove('gelioff')
        break
        case "on":
            content.classList.remove('gelioff', 'geliboot')
            change("PAGE!!geliawake", true)
    }
}

/* COMPLETE ENTITIES */
createEntity({
    name: 'cavelight',
    type: "thoughtform portrait-cover",
    image: "/img/local/embassy/sconcetemp_side.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'a nostalgic design, reminiscent of a time before the corrucystic revolution';'the real ones contained <span class="code">yuzku</span>'</span>`
})

createEntity({
    name: 'grand door',
    type: "thoughtform",
    image: "/img/local/embassy/golemdoor.gif",
    alternateOf: 'qou body',
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection';'connector'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'an imposing door, marred by heavy impacts'</span>`,
    actions: [
        {
            name: "approach",
            exec: ()=>{
                if(isStageClear()) {
                    startDialogue('lobby_bossdoor');
                } else chatter({actor: 'sourceless', text: 'IT IS TOO DANGEROUS, WE MUST DESTROY THESE FOES', readout: true})
            },
            showIf: ["PAGE!!golboss", false]
        }
    ]
})

createEntity({
    name: 'veilk spear',
    type: "thoughtform portrait-centertop portrait-dark",
    image: "/img/local/embassy/f1.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'imitation of <span definition="INHERITED CONTEXT::'food';'ripe fruit'">veilk parasite</span>';'lodges into veilk tendrils';'sprouts are prized for their hard translucent skin'</span>`
})

page.gelidesc = check("e3a2__escapewin") ? //post-escape
`::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'personable golem with a strong tir echo';'either unable or unwilling to perceive reality as it was'</span>
::ADDITIONAL NOTE::<span class="bastard-color bastard-font">'copied DEETS from geli in2 SHELL :P';'ur welcome'</span>`
://pre-escape
`::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'personable golem with a strong tir echo';'either unable or unwilling to perceive reality as it was'</span>
::ADDITIONAL NOTE::<span style='color: var(--obesk-color)'>'hi interloper this is funfriend this one was mostly intact for some reason so it has visual data'</span>
<span style="color: var(--obesk-color)" definition="ANALYSIS::'low cohesion'">::INCOHERENCE DETECTED</span>`

createEntity({ 
    name: 'geli',
    type: "thoughtform obesk collapse portrait-contain portrait-blocker",
    image: 
        check("e3a2__escapewin") ?
            //post escape
            "/img/sprites/obesk/geli/fake/portrait.gif"
            : // pre-escape
            "/img/sprites/obesk/geli/portrait.gif"

    ,
    text: page.gelidesc,
    actions: [
        {
            name: "speak",
            exec: ()=>{
                if(isStageClear()) {
                    startDialogue('geli_first');
                } else chatter({actor: 'sourceless', text: 'IT IS TOO DANGEROUS, WE MUST DESTROY THESE FOES', readout: true})
            },
            showIf: ['PAGE!!geli', false]
        },
        {
            name: "speak",
            exec: ()=>{
                if(isStageClear()) {
                    startDialogue('geli');
                } else chatter({actor: 'sourceless', text: 'IT IS TOO DANGEROUS, WE MUST DESTROY THESE FOES', readout: true})
            },
            showIf: [['PAGE!!geli', true]]
        },
        {
            name: "unity",
            class: "act-ozo",
            exec: ()=>{

                setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)

                if(!check("e3a2__bstrdmeet")) {
                    cutscene(true);MUI('off')
                    setTimeout(()=>{
                        startDialogue('geli_beacon')
                        cutscene(false)
                    }, 2000)
                
                } else if(check("e3a2__escapewin")) {
                    env.setTimeout(()=>{
                        readoutAdd({message: `<p>NOTE::'no response'</p>`, name:"sys"})
                        vfx({type: 'beacon', state: false})
                    }, 2000)

                } else {
                    chatter({actor: 'bsteli', text: `i wonder how everyone is doing...`, readout: true, delay: 2000})
                    chatter({actor: 'bsteli', text: `OUTSIDE?`, readout: true, delay: 4000})
                    chatter({actor: 'akizet', text: `we can only hope this nightmare is unique to the embassy`, readout: true, delay: 8000})

                    setTimeout(()=>{
                        vfx({type: 'beacon', state: false})
                        cutscene(false)
                    }, 3000)
                }
            },
            showIf: [["mask", "unity"], ["EXEC::isStageClear()", true]]
        }
    ]
})

createEntity({
    name: 'lesser terminal',
    type: "thoughtform collapse portrait-cover portrait-dark",
    image: "/img/local/embassy/terminal_online.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'unique scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'interface for an organ extending beyond the walls';'utilizes reservoir of knowledge and corru for easy production';'common spire installation for general use'</span>`,
    actions: [
        {
            name: "approach",
            exec: ()=>{
                if(isStageClear()) {
                    startDialogue('m_minvat');
                } else chatter({actor: 'sourceless', text: 'IT IS TOO DANGEROUS, WE MUST DESTROY THESE FOES', readout: true})
            },
            showIf: ["PAGE!!minvatitems", false]
        },
        {
            name: "use schematic cyst",
            exec: ()=>{
                if(isStageClear()) {
                    startDialogue('m_mingun');
                } else chatter({actor: 'sourceless', text: 'IT IS TOO DANGEROUS, WE MUST DESTROY THESE FOES', readout: true})
            },
            showIf: [["PAGE!!minvatgun", false], ["item|sorry_cyst", true]]
        },        
    ]
})

createEntity({
    name: 'greater terminal',
    type: "thoughtform collapse portrait-centerlow portrait-dark",
    image: "/img/local/embassy/projectorbig.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'unique scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'interface for an organ extending beyond the walls';'allows for massive detailed formations';'i do not really know how this one works i only ever used lesser vats'</span>`,
    actions: [
        {
            name: "approach",
            exec: ()=>{
                if(isStageClear()) {
                    startDialogue('m_golem');
                } else chatter({actor: 'sourceless', text: 'IT IS TOO DANGEROUS, WE MUST DESTROY THESE FOES', readout: true})
            },
            showIf: ["PAGE!!ikgolem", false]
        }
    ]
})

createEntity({
    name: 'distribution door',
    type: "thoughtform collapse portrait-centerlow portrait-dark",
    image: "/img/local/embassy/golemdoorsludged.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection';'connector'`,
    actions: [
        {
            name: "approach",
            exec: ()=>{
                if(isStageClear()) startDialogue('m_door'); else chatter({actor: 'sourceless', text: 'IT IS TOO DANGEROUS, WE MUST DESTROY THESE FOES', readout: true})
            },
            showIf: ['PAGE!!gmdoor', false]
        }
    ]
})

createEntity({
    name: 'instruction workspace',
    type: "thoughtform portrait-centertop portrait-dark",
    image: "/img/local/embassy/analysis_golemarm.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'visual display utilizing luminescent corru swarms';'favored by multitasking jut'</span>`
})

createEntity({ // unused but needs to be here to revert it showing up. my dumbass leaving it in at launch
    name: 'ukuzu simulacrum',
    hide: true,
    type: "thoughtform portrait-center portrait-dark",
    image: "/img/sprites/combat/items/ukuzutemp.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'item'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'functional simulacrum said to enhance awareness';'little more than an externalized cognitive enhancement cyst despite simulacrum styling';'its mediocre flavor is secondary'</span>`,
    actions: [
        {
            name: "take",
            exec: ()=>{
                chatter({actor: 'sys', text: `ITEM_RECEIVED::"<span definition="INHERITED CONTEXT::${env.ITEM_LIST['eq_surge'].description}">ukuzu simulacrum</span>"::<span definition="STATUS++item_surge">EFFECT</span>`, readout: true})
                addItem("eq_surge")
                change("PAGE!!gotsurge", true)
                refreshStage({noFlash: true})
            },
            showIf: ['PAGE!!gmdoor', false]
        }
    ]
})

createEntity({
    name: 'preprocessing metals',
    type: "thoughtform portrait-dark",
    image: "/img/local/embassy/preprocessor.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'essential metals treated and cleaned in preparation for the sfer vats';'they were preparing a lot'</span>`
})

createEntity({
    name: 'ruined glazika',
    type: "thoughtform portrait-contain portrait-blocker",
    image: "/img/local/embassy/ruinedglazika.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'unique scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'unfortunate glazika';'likely crushed by accident';'unless the golems did it?'</span>`
})

createEntity({
    name: 'inactive terminal',
    type: "thoughtform collapse portrait-centerlow portrait-dark",
    image: "/img/local/embassy/terminal.gif",
    hide: true,
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'unique scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'likely a monitor for the progress of the sfer vats';'setup was incomplete, not connected'</span>`
})

createEntity({
    name: 'archival sludge',
    type: "thoughtform collapse portrait-dark",
    image: "/img/local/embassy/archivalwall_busted.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'vibrant and malleable flesh of the archive system';'fallen from connected veins overtop this ${processDefinitionsInString("θtendril")}'</span>`
})

createEntity({
    name: 'dull structure',
    type: "thoughtform collapse portrait-static",
    image: "/img/local/embassy/dullstructure_inner.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'unique scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'projection of an organ residing within the dull plane';'connected to what?';'nearby terminals broken, cannot investigate'</span>`
})

createEntity({
    name: 'shelf',
    type: "thoughtform collapse",
    image: "/img/local/embassy/archivalshelf_noback.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'similar design to archival shelves';'sustains large collection of echoes';'i imagine most are tir'</span>`
})

createEntity({
    name: 'echo chamber',
    type: "thoughtform collapse",
    image: "/img/local/embassy/mindscanner.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'unoccupied scanner for use in detailed echo creation';'i have never been called upon to partake in one';'perhaps i do not tell enough jokes'</span>`
})

createEntity({
    name: 'lightning terminals',
    type: "thoughtform collapse",
    image: "/img/local/city/tv.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'unique scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'innumerable lightning bright-constructs';'rapid concurrent exposure to translation core assists in deciphering bright languages'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'disrupted cohesion';'adjacent to missing or removed resources';'degraded visual profile'">::INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: 'stowed tools',
    type: "thoughtform collapse",
    image: "/img/local/embassy/wallhatch_small.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'modular connections';'allows the groundsmind or local overrider to connect different corboku'</span>`,
})

createEntity({
    name: 'impressor',
    type: "thoughtform collapse",
    image: "/img/local/embassy/wallhatch_small_blueprinter.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'corrucystic deep cloning device';'allows even for one-sided dull signature synchronization';'purported security risk ignored for utility'</span>`,
})

createEntity({
    name: 'archival hatch',
    type: "thoughtform collapse",
    image: "/img/local/embassy/archivalhatch.gif",
    text: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recurring scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'an entry to a river of knowledge and materials';'blocked by archival vein collapse'</span>`,
})

/* foe entities */
createEntity({
    name: 'husk',
    type: "thoughtform foe collapse portrait-fear portrait-cover",
    image: "/img/sprites/combat/foes/husks/sickeye_nausea.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'¾‹Ð£«ÜË€';'qou-bodies of friends i had not met, excavated of their mindcores';'drawn as weapons, impossibly';'our first true sign'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'degraded visual profile'">::INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: 'constructor',
    type: "thoughtform foe collapse portrait-cover portrait-blocker",
    image: "/img/sprites/combat/foes/constructor_portrait.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'intelligent analysis golem equipped with single-use ablative shielding';'utilized in structural repair and construction';'seized by the groundsmind?'</span>`,
})


createEntity({
    name: 'vat',
    type: "thoughtform collapse portrait-cover portrait-blocker",
    image: "/img/sprites/combat/foes/constructorvat.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'unique scenery';'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'schematic production apperatus';'automatically imprints purpose and shape via attached archives'</span>`,
})

createEntity({
    name: 'kivskin',
    type: "thoughtform foe collapse portrait-cover portrait-blocker",
    image: "/img/sprites/combat/foes/pressure_portrait.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'tough design used in underwater construction';'seized by the groundsmind?'</span>`,
})

createEntity({
    name: 'repairfriend',
    type: "thoughtform foe collapse portrait-cover portrait-blocker",
    image: "/img/sprites/combat/foes/surgeon_portrait.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'personable assistant utilized in golem and qou-body construction';'bears many tools and many arms';'seized by the groundsmind?'</span>`,
})

createEntity({
    hide: true,
    name: 'golem',
    type: "thoughtform foe collapse portrait-blocker",
    image: "/img/sprites/combat/foes/golem-portrait.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'general purpose golem';'contains volatile dull components that normally are not an issue...';'seized by the groundsmind?'</span>`,
})

createEntity({
    name: 'archival golem',
    type: "thoughtform foe collapse portrait-cover",
    image: "/img/sprites/combat/foes/archivalgolemportrait.gif",
    pathLimit: "/local/ocean/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'black-corru golem of great strength';'intelligent and methodical';'has shed prior duties to kill us'</span>`,
})

createEntity({
    name: 'dozkallvi',
    type: "thoughtform foe collapse portrait-blocker",
    image: "/img/sprites/combat/foes/kivii/portrait.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'itzil's poor kivii pushed over the edge of final death';'her mindcore was still active...'</span>`,
})

createEntity({
    name: 'gauntlet',
    type: "thoughtform foe collapse portrait-blocker",
    image: "/img/sprites/combat/foes/kivii/gauntlet.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'mind-linked lifting gauntlets equipped with large dull nodes';'utilized for delicate yet strength intensive manual work when golems do not suffice';'how do they move without a mind?'</span>`,
})

createEntity({
    name: 'dullzika',
    type: "thoughtform foe collapse portrait-cover portrait-static",
    image: "/img/sprites/combat/foes/turboglazika_portrait.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'evidently directed dull microconnectors to deliver sfer';'where is its groundsmindry sigil? is it like the containers?'</span>`,
})

createEntity({
    name: 'warped container',
    hide: true,
    type: "thoughtform foe collapse portrait-static",
    image: "/img/sprites/combat/foes/inc_dull_portrait.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'the living remains of a translocated container';'remarkably still alive despite not being designed for dull exposure'</span>`,
})

createEntity({
    name: 'translation core',
    type: "thoughtform foe collapse portrait-blocker portrait-cover",
    image: "/img/sprites/combat/foes/translator_sigil.gif",
    examinePriority: 2,
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'a great stationary mind like our timestopper';'hard at work in translating the signal into speech';'ex‡÷tr^¼e mely nÆdan©ger ouešdÎ'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'disrupted cohesion';'adjacent to missing or removed resources'">::INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: '»õGQàº3¾õ”cR%',
    type: "thoughtform foe collapse portrait-blocker hallucination",
    image: "/img/sprites/combat/foes/hallucinations/portrait.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'it is not real';'what is that'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'disrupted cohesion';'adjacent to missing or removed resources'">::INCOHERENCE DETECTED</span>`,
})

createEntity({
    name: 'foundation golem',
    type: "thoughtform foe collapse portrait-cover portrait-blocker",
    image: "/img/sprites/combat/foes/golemboss_portrait.gif",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'enormous high-pressure construction golem';'spherical limbs can take many shapes, but now only bludgeon';'seized by the groundsmind?'</span>`,
})

env.dialogueActors["geli"] = {
    name: "geli",
    type: "obesk qou portrait-cover portrait-blocker",
    voice: ()=>play('talkgel', 0.9)
}

if(check("e3a2__escapewin")) {
    env.dialogueActors["geli"].expressions = {
        default: {
            image: "/img/sprites/obesk/geli/fake/portrait.gif",
            exec: ()=>document.querySelectorAll('#geli').forEach(el=>el.setAttribute('expression', ''))
        },
        concern: {
            image: "/img/sprites/obesk/geli/fake/portrait_concern.gif",
            exec: ()=>document.querySelectorAll('#geli').forEach(el=>el.setAttribute('expression', 'concern'))
        },
        happy: {
            image: "/img/sprites/obesk/geli/fake/portrait_happy.gif",
            exec: ()=>document.querySelectorAll('#geli').forEach(el=>el.setAttribute('expression', 'happy'))
        },
        think: {
            image: "/img/sprites/obesk/geli/fake/portrait_think.gif",
            exec: ()=>document.querySelectorAll('#geli').forEach(el=>el.setAttribute('expression', 'think'))
        },
        uncanny: {
            image: "/img/sprites/obesk/geli/fake/portrait_uncanny.gif",
            exec: ()=>document.querySelectorAll('#geli').forEach(el=>el.setAttribute('expression', 'uncanny'))
        },
        blueeyes: {
            image: "/img/sprites/obesk/geli/fake/portrait_blueeyes.gif",
            exec: ()=>document.querySelectorAll('#geli').forEach(el=>el.setAttribute('expression', 'blueeyes'))
        },
    }

} else {
    env.dialogueActors["geli"].expressions = {
        default: {
            image: "/img/sprites/obesk/geli/portrait.gif",
            exec: ()=>document.querySelectorAll('#geli').forEach(el=>el.setAttribute('expression', ''))
        },
        concern: {
            image: "/img/sprites/obesk/geli/portrait_concern.gif",
            exec: ()=>document.querySelectorAll('#geli').forEach(el=>el.setAttribute('expression', 'concern'))
        },
        happy: {
            image: "/img/sprites/obesk/geli/portrait_happy.gif",
            exec: ()=>document.querySelectorAll('#geli').forEach(el=>el.setAttribute('expression', 'happy'))
        },
        think: {
            image: "/img/sprites/obesk/geli/portrait_think.gif",
            exec: ()=>document.querySelectorAll('#geli').forEach(el=>el.setAttribute('expression', 'think'))
        },
        uncanny: {
            image: "/img/sprites/obesk/geli/portrait_uncanny.gif",
            exec: ()=>document.querySelectorAll('#geli').forEach(el=>el.setAttribute('expression', 'uncanny'))
        },
        blueeyes: {
            image: "/img/sprites/obesk/geli/portrait_blueeyes.gif",
            exec: ()=>document.querySelectorAll('#geli').forEach(el=>el.setAttribute('expression', 'blueeyes'))
        },
    }
}


env.dialogueActors["ik"] = {
    name: "karik",
    image: "/img/sprites/obesk/ikgol/portrait.gif",
    type: "obesk qou portrait-cover portrait-blocker",
    voice: ()=>play('talkcore', 0.5)
}

env.dialogueActors["kivii"] = {
    name: "dozkallvi",
    image: "/img/sprites/combat/foes/kivii/portrait.gif",
    type: "obesk qou portrait-cover portrait-blocker incoherent",
    voice: ()=>play('talkgal', 0.25)
}

env.dialogueActors["translation core"] = {
    image: "/img/sprites/combat/foes/translator_sigil.gif",
    type: "obesk qou portrait-cover portrait-blocker incoherent",
    voice: ()=>play('talksignal', 0.4)
}

env.dialogueActors["husk"] = {
    image: "/img/sprites/combat/foes/husks/tinynausea.gif",
    type: "obesk qou portrait-cover portrait-fear incoherent",
    voice: ()=>play('talksignal', 0.6)
}

//to avoid skip-duping points
env.embassy.conditionalAugPoint = (amt = 1, reason) => {
    if(reason) if(env.embassy.reasons[reason]) return false;

    page.flags.augmentMax++

    if(reason) env.embassy.reasons[reason] = true
}

//complex skips for relevant dialogues
env.embassy.skips = {
    personnel: ()=>{
        change("PAGE!!g_personnel", "dangerous")
        content.classList.remove('painprep', 'painhalf', 'painfade', 'slowpain')
        vn.done()
        refreshStage()
        setCam()
        vfx({type: "darkflash", state: false})
    },

    lobby_clear: ()=>{
        content.classList.add("safe")
        changeBgm(env.embassy.music_golems)
        vn.done()
        pauseSwapCam(false)

        env.embassy.geliState('on')
        env.stage.querySelectorAll('.geli').forEach(el=> el.classList.remove('inactive'))
    },

    m_clear: ()=>{
        pauseSwapCam(false)
        specialCam(false)
        vn.done()
        change("PAGE!!mmid", true)
        if(check("PAGE!!mmid") && check("PAGE!!smidclear") && !check("PAGE!!smcut")) {
            change('PAGE!!smcut', true)
            setTimeout(()=>step(), 100)
        }
    },

    m_golem: ()=>{
        vn.done()
        specialCam(false)
        pauseSwapCam(false)

        if(check("item|golem_parts")) {
            content.classList.remove('makingik')
            env.embassy.addPartyMember("ikgolem")
            change("PAGE!!ikgolem", true)
        }
    },

    m_boss: ()=>{
        change("PAGE!!g_m_dist", "dangerous");
        vn.done()
        setCam()
        specialCam()
        pauseSwapCam(false)
        env.stage.current.scaryBoss()
    },

    m_bossclear: ()=> {
        toggleBgm(env.embassy.music_golems_cleared)
        env.embassy.music_unsafe_golems.rate(1)
        env.stages['g_m_dist'].removeBoss()
        vn.done()

        //still want to expose people to this
        switch(check("golem_decompression")) {
            case false:
                setTimeout(() => {
                    startDialogue("m_metatrauma")            
                }, 600)
            break

            case true:
                setTimeout(() => {
                    startDialogue("m_fix")    
                }, 600)
            break   
        }        
    },

    m_fix: ()=> {
        vn.done();specialCam(false);pauseSwapCam(false)
        addItem(env.ITEM_LIST["golem_parts"], 1) // no conditional need bc this is 1-max
        change("PAGE!!goverride", true)
    },

    s_vats: ()=>{
        pauseSwapCam(false)
        specialCam(false)
        vn.done()
        change("PAGE!!smidclear", true)
        env.embassy.conditionalItem('eq_shell', 1, 'vats')
        if(check("PAGE!!mmid") && check("PAGE!!smidclear") && !check("PAGE!!smcut")) {
            change('PAGE!!smcut', true)
            setTimeout(()=>step(), 100)
        }
    },

    s_bossclear: ()=> {
        vn.done()
        pauseSwapCam(false)
        specialCam(false)

        env.stages['g_s_storage'].removeBoss(false)
        env.stages['g_s_storage'].normalize()
        toggleBgm(env.embassy.music_golems_cleared)
        env.embassy.music_unsafe_golems.rate(1)
    },

    bossclear: ()=> {
        vn.fadeChars(false)
        vn.done()
        pauseSwapCam(false)
        specialCam(false)

        change("PAGE!!golboss", true)
        env.stages['g_boss'].hideBoss()

        toggleBgm(env.embassy.music_golems_cleared)
        env.embassy.music_unsafe_golems.rate(1)

    }
}

/* since this kinda breaks the d1, d2, d3, etc schema, there will be no dialogue prefix outside of the one created via the /golem/ page */

/* 
    this floor is cave themed and the walls/bg will reflect that
*/

/* MECHANICAL DIALOGUES */
// these are no longer used outside of maybe mods due to the enemy rework
env.dialogues["genericenemy"] = generateDialogueObject(`
start
    sourceless
        WE ARE BESET BY INCOHERENT FOES
            EXEC::forceSwapCam(true)
        OUR ONLY OPTION IS TO FIGHT...

____SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'
        OR IS IT?
        WE COULD ALSO EXPEND THE DISABLER
        THERE MAY BE A BETTER TIME FOR IT LATER...
____END

    RESPONSES::akizet
        engage<+>END
            SHOWIF::['gameplay_off', false]
            FAKEEND::(begin combat)
            EXEC::env.combat.dynamicCombat({exec: env.embassy.randomBgmTime})
        bypass<+>END
            SHOWIF::['gameplay_off', true]
            FAKEEND::(bypass combat)
            EXEC::env.combat.dynamicCombat({dry: true});cutscene(true);setTimeout(()=>{cutscene(false);env.combat.dynamicCallback(env.rpg.enemyTeam)}, 1010)
        disable<+>disable
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'
            FAKEEND::(use disabler charge)
        debug kill<+>disable
            SHOWIF::'TEMP!!debug'
            FAKEEND::(use disabler charge)

disable
    sourceless
        I CAREFULLY LINE UP THE DISABLER
            EXEC::removeItem(env.ITEM_LIST.disabler);
        AND WITH AN IMPULSE THROUGH MY HAND, A NUMBER OF SPECIALIZED SPINES ARE PROJECTED VIOLENTLY OUTWARDS
        THEY NEEDLE OUR FOES, AND IN A BLINK, THEY HAVE STARTED TO MELT
            EXEC::setTimeout(()=>play('shot2', 0.6), 300)
    RESPONSES::akizet
        continue<+>END
            EXEC::env.combat.dynamicCombat({dry: true});cutscene(true);setTimeout(()=>{cutscene(false);env.combat.dynamicCallback(env.rpg.enemyTeam)}, 1010)
            FAKEEND::(wait)
`)

env.dialogues["genericenemyvictory"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";"toggle within system menu if desired"
____END

    sourceless
        OUR FOES LIE DESTROYED
        TEXEC::env.combat.dynamicReward()

    RESPONSES::akizet
        continue<+>END
            EXEC::forceSwapCam(false)
`)

/************** INTRO AND PERSONNEL */
/************** INTRO AND PERSONNEL */
/************** INTRO AND PERSONNEL */
env.dialogues["gol_intro"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        the plan<+>plan
            
        wait<+>wait
            SHOWIF::'PAGE!!introplan'
            EXEC::vn.done()
            FAKEEND::(end preparations)
    
    RESPONSES::itzil
        kivii<+>kivii
    
    RESPONSES::miltza
        hesitance<+>hesitance
            SHOWIF::'PAGE!!introplan'

    RESPONSES::karik
        sfer<+>sfer
            SHOWIF::[["PAGE!!karikfed", false]]
`)
env.dialogues["intro"] = generateDialogueObject(`
loop
    RESPOBJ::gol_intro

start
    sys
        ATTENTION::'continuing memory stream'
        NOTE::'inheriting iteration context'
        
    RESPONSES::sys
        continue<+>continue

continue
    movefriend
        ok gakvukani
        commencing relocation!
    
    sourceless
        the descent begins, though it is terribly unsteady
        was that something knocking against the underside of the chamber?
        movefriend does not get far before it slows to a halt again

    movefriend
        wow!!
        friends: please forgive the turbulence!
        corroyi density is unusually high in this area
        in fact, all standard currents have ceased!
        but do not worry!! i can still get you where you need to go!
    
    akizet
        what does that mean for the spire?

    sourceless
        i feel the chamber's ground shift beneath us, pulling outwards
        ah... it is forming limbs outside of the chamber
        indeed, it must physically crawl through the spireblood and drag the chamber with it
    
    movefriend
        i must focus on the locomotion sorry!!
        please ask the constructor within the chamber!

    sourceless
        i look towards tozik at first
        he stares back absently, then makes an uncertain gesture with his receptors
        before i can ask it to clarify, one of the mindcores announces themselves
    
    karik
        that is me!!
            EXEC::vnp({karik:"show", bg: true})
        
    sourceless
        i sense some surprise between the ekiviks
        that would be a little funny, if not for the circumstances
        their kiv rarely take part directly in structural management
    
    karik
        if the corroyi is no longer correctly distributed across the spire,
        then our perpetrator has intentionally and directly sabotaged the structure's circulatory systems...
        there is no way it could fail this fast, otherwise!
        so, that means corroyi is going to be pooling at the lower levels,
        and will grow more dense as the layers separate, until, ah...
        well, the lower levels will be crushed by the pressure
        and then the spire's outer walls will explode at its base
        as you imagine, my friends, this is not conducive to our goals
    
    tozik
        what end could that possibly serve?
            EXEC::vnp({tozik:"showright"})
        whoever holds the groundsmindry would be crushed as well

    gakvu
        no survivors
            EXEC::vnp({gakvu:"showright"})
    
    karik
        grim, yes, but there is a solution to this!
        however, it requires groundsmind level control...
    
    miltza
        do you expect us to be able to get to the base of the spire in time?
            EXEC::vnp({gakvu:"hide", tozik: 'hide', miltza: 'showleft'})

    karik
        well...
            EXEC::vnp({miltza: 'hide'})
        i will say our chances are not ideal
        but what else can we do?
    
    sourceless
        i sense a spark of inspiration from tozik, 
        even reflected in his receptors...
        but he does not yet speak up, ever hesitant to share an unfinished thought
        while we wait for the movefriend to deliver us to golem maintenance,
        a plan should be devised
        ...and we should get a profile of itzil's kivii

    RESPONSES::akizet
        what to ask first...<+>loop
            EXEC::vnp({karik: "hide", bg: false})

plan
    sourceless
        in the near silent tension of our descent,
            EXEC::change("PAGE!!introplan", true)
        i feel that our lack of a clear plan is causing even more anxiety
        all are in thought, though itzil is pacing
        so i speak up with what i know:
    
    akizet
        my friends, the time is coming
        we should align our paths

    sourceless
        i briefly pause to garner their collective attention, then continue,
            EXEC::vnp({miltza: "show far", gakvu: "show far", tozik: "show far", karik: "show far", itzil: "show far", hideStage:true})

    akizet
        i am unfamiliar with the layout of the golem maintenance θsegment, but itzil, you know it well, yes?
    
    sourceless
        itzil ceases their endless skittering to nervously wave their receptors
    
    itzil
        oh, yes!! even better than my home!
    
    akizet
        excellent, then tell me if any of this seems unreasonable:
        when we arrive, we should immediately find ways to arm ourselves
        assuming the foundry vats are still operational, we need only find some schematics
        next, we should probably find a body for--
    
    tozik
        akizet, if the spire bursts, then this will not yield us any gain
    
    sourceless
        IMMEDIATELY, THE MORALE I WAS ATTEMPTING TO BUILD IS CRUSHED
        THERE IS THAT PANG OF FEAR AGAIN - THOUGH THIS TIME, IT IS MINE
        THE POSSIBILITY OF US ALL UNCEREMONIOUSLY DYING ON OUR WAY
        COMPLETELY OUT OF OUR CONTROL, REALLY...

    akizet
        ...yes, tozik, i know, but--
    
    tozik
        no no, you see, i have an idea
            EXEC::vnp({tozik: "focus far"})
        i was here recently while giving advice on the design of the deep-sea constructor golems
        it was within the manufacturing θtendril that i saw something unusual...
        for quick deployment, they have their own groundsmindry override
        specifically for manipulating local flows of corroyi and spireblood to carve a path
        there was a θjut using it to directly release golems to the exterior of the spire
    
    itzil
        aah!!! of course!!
            EXEC::vnp({tozik: "defocus far"})
        it is only a small range in which it is effective, but...
        yes!! we can probably get some parts moving again!
        especially if the sabotage was a simple switch!!
        do you think that would work, karik?

    karik
        if it is a 'simple switch', we may have to break it so it is not undone, but...
        it would certainly lend us some time, oh yes
    
    sourceless
        ah, and so he shapes the morale back up, though in a different design
    
    miltza
        we could use that to evacuate any survivors we find!
        it can form tunnels to the outside, yes?
    
    sourceless
        the way miltza stands and fidgets...
        if a tunnel opened, she would scramble through it without any thought
        cowardice, perhaps, but i cannot truly blame her
        she surely took this position to escape from remote coordination
    
    tozik
        if we must, i suppose
        but we will need all the help we can get if we intend to assault the groundsmind
        i do have concerns about this, especially if the override is only limited to the immediate area, but,

    gakvu
        what if i expand the control of the override?
    
    sourceless
        in a brief stunned silence, our attention is drawn towards gakvu
        how many unauthorized miracles does she know how to perform?
        she is clearly capable of more than i have ever known
    
    miltza
        how could you possibly do that?
            EXEC::vnp({tozik: "hide", karik: "hide", itzil: "hide", miltza: "", gakvu: ""})
        in fact - how have you been doing <em>any</em> of this?
            EXEC::vnp({miltza: "focus"})
        it is so convenient that you happen to be the only one who can guide us through these impossible paths
    
    sourceless
        miltza's voice is heavy with accusation, her receptors closed like fists
        an outburst simply driven by fear, but...
        what is she implying...?
        itzil skitters forth, announced by the clicking of their sharp legs against the cystic glass
    
    itzil
        hey! does it matter??
            EXEC::vnp({miltza: "defocus far", gakvu: "far", itzil: "show far"})
        gakvu is helping us save everyone!

    sourceless
        itzil's assertion earns miltza's attention, for she seems to have no retort
        but this alone is not enough to defuse her suspicions
        gakvu hangs her receptors back cynically
        she could elect not to even answer, but...

    gakvu
        all right, if you want a proper explanation, then fine
            EXEC::vnp({miltza: "", gakvu: "focus", itzil: "hide"})
        yes, i have a mindcore with groundsmindry capabilities
        ah, what can i say
        i am quite attached to it

    sourceless
        where is this spite coming from?
        the briefest silence passes, miltza looking between us
        she seems to take particular interest in tozik in this moment

    miltza
        is this issue only mine?
            EXEC::vnp({miltza: "", gakvu: "defocus"})
        our tools and golems usurped, and here before us is some cynical vel with that very ability?
        is your groundsmindry destination truly to help us?
    
    sourceless
        miltza reaches a peak, and tozik eyes me
            EXEC::vnp({tozik: "show downright"})
        itzil backs off to the corner with karik, their eye drifting with concern now
        i will admit, this coincidence did not even occur to me... it is suspicious
        but it is without roots - gakvu would never intend us harm 
        yes, i should intervene
            EXEC::vnp({tozik: "hide"})
    
    akizet
        miltza...
            EXEC::vnp({miltza: "focus"})

    sourceless
        she pauses and gazes at me, her receptors slightly releasing from their fist-like clench

    akizet
        i have worked with gakvu long enough to know,
        she could not be doing this
        in fact, the terror i felt from her when she was first attacked...
        no, she could not be a perpetrator
        but... it is still unusual, this is true

    sourceless
        then, i turn to gakvu, disappointed in her unhelpful handling of the situation
        she seemed proud of herself with her little joke, but now i see apologetic shame
        her tone softens to explain,
    
    gakvu
        ...yes, i know how it looks
            EXEC::vnp({miltza: "defocus"})
        the truth is complex
        miltza, you must trust that i am here to help
        i can explain everything later
        but we have to get out of here intact, first
    
    sourceless
        i see a wordless agreement as miltza's receptors lose their tension
        though they do not stray near one another, they have an accord... for now
    
    akizet
        ...returning to our path,
        we first use the override in manufacturing to stop the structure from collapsing
        next, we arm ourselves
        in fact, if we can make more timestopper connectors, even better
        also, we should find suitable bodies for itzil and karik
        then, find any survivors, itzil's kivii included
        finally, we descend to the groundsmind, and cease this madness
        all right?
    
    itzil
        sounds good!!
    
    sourceless
        the others agree with a simple forward waving of their receptors
    
    akizet
        excellent

    RESPONSES::akizet
        what else...<+>loop
            EXEC::vnp({miltza: "hide", gakvu: "hide", hideStage: false})

kivii
    akizet
        itzil!
            EXEC::vnp({itzil: "show"})
        tell me about your kivii
        their name, their receptors, where you think they may be...
        anything will help
    
    sourceless
        ah...
        as i said that, i felt a murmur of my larval life, searching for missing runners
        i may have said those exact words before
        velzie's fondness for repetition is truly nauseating
    
    itzil
        oh, ok!
        well, her name is dozkallvi kiv gediziki, and she styles herself with a broken receptor!
        she is ok, of course, it is just a strange styling, hehehe
        i do not know which area she would be in, specifically...
        you see, she was covering for me while i reconnected with some family over the collective
        she does not really enjoy the company of my family very much, and, ah, i do not blame her,
        they were never really happy with me finding a mate from another cave-city, you see...
    
    sourceless
        itzil trails off after seeing the look upon my face and receptors
        am i too flat? should i be more interested in their romance?
    
    itzil
        ah, umm, right--i was going to say, i do not know which area she would be in
        she was simply a substitute for my hands for the θgaze
        so, wherever you may find a kiv, i think! 
        they probably had her in manufacturing!

    akizet
        i see, thank you
        we will find her, itzil

    RESPONSES::akizet
        what else...<+>loop
            EXEC::vnp({itzil: "hide"})
    
sfer
    akizet
        karik!
            EXEC::vnp({karik: "show"})
        did you mention earlier that your sfer reserves were low?
    
    sourceless
        i am still unsure if i should crouch while speaking to the mindcores...
        but it seems kinder than looming over them

    karik
        yes, i did!
        i know repairing movefriend came first, but...
        if there is any left, i would not protest!

    akizet
        there is a little, do not worry!

    sourceless
        i draw a cube of sfer from our stash,
        and simply set it beside karik
        because... though the thought occurred to me,
        feeding them directly would be so strange
        thankfully, karik does not hold conflict

    karik
        thank you, akizet!

    sourceless
        they coil an emergency leg around the sfer and press it against their side
        their shell extends to envelop it and draw it inward

    karik
        ahh, that is much better
        i appreciate your efforts, my friend!

    RESPONSES::akizet
        of course<+>loop
            EXEC::vnp({karik: "hide"});change("PAGE!!karikfed", true)

hesitance
    akizet
        miltza
            EXEC::vnp({miltza: "show far"})
    
    miltza
        ah, akizet, hello!
        sorry...
    
    sourceless
        at once, it seems she may launch into an apology, gesturing even with her third arm
        but i simply wave the notion away with my receptors
        she seems more at ease with my acceptance
    
    akizet
        at this point, there are no laws binding us anymore
        the only thing that matters is survival
        can i trust that you will stand with us against whatever awaits?
    
    miltza
        yes, of course...
    
    sourceless
        gakvu pretends to be uninterested in our conversation
        the room is too small for any secrets
    
    miltza
        but let me say, there is a reason ekiva frowns upon mobile groundsmindry
            EXEC::vnp({miltza: "show"})
        i never much cared for structurism, but the anti-structurists were a sour option themselves
        they used illegal groundsmindry to sow chaos anonymously
        i mean, that is all a flicker in the past now, but... the flame is carried into θdeath still
        this could be a coordinated attack, not just by one person, but many
        still, if you can trust gakvu, i will trust her too
        ...
        in these times, we must, despite whatever may hang over us
    
    sourceless
        what a strange turn of phrase - she certainly means culturally
        but there is something in her tone...
        i feel a certain weight to it - has her larval history affected her so severely?
        or... is she within the greater conflict herself?
        despite her flightiness and her outburst, i feel i can trust her
        yes, she must simply be scared beyond her limits
        her particular remote coordination experience was surely limited in action
        likely to have experienced the terror of the surface only a few times, through distant eyes
        but it seems that terror has found her, now
        final death has never been closer

    RESPONSES::akizet
        true...<+>loop
            EXEC::vnp({miltza: "hide"})

wait
    sourceless
        with my curiosities sated, we wait
        the remaining sfer we collected is distributed amongst ourselves
        to mend wounds, attempt repairs to inner components, so on
        and there is some small chat here and there, but in time, our progress slows
        to a worrying degree, in fact... the corroyi no longer murmurs past the walls as it did
    
    movefriend
        ok friends! good news!
        the density is so high i was not able to get you to the usual entry point
        in fact, the entire θsegment is surrounded by dangerously dense corroyi!
        we could not even pass through to the groundsmindry if we wanted to!
        sorry!! that was not the good news yet! here it is!
        we are near one of the personnel θtendrils of the golem maintenance θsegment!
        it seems to have sunken and partially collapsed from the pressure...
        but it is still attached to the main area!
        i can connect you there, but until the corroyi flows are restored,
        that is the best i can do!
    
    itzil
        oh... my room...
            EXEC::vnp({itzil: "showright far"})

    gakvu
        how will we get around without a movefriend?
            EXEC::vnp({gakvu: "showleft focus"})
        i was able to help before, but... that is not sustainable
        especially not if the density is going to be very high
    
    itzil
        ...oh!!
            EXEC::vnp({gakvu: "defocus"})
        gakvu! the entire floor is connected! it is not like your θsegment at all
        because it was formed early in the spire's growth,
        all of the θtendrils and chambers are connected semi-permanently
        it is easier to move golems and resources around that way!

    tozik
        yes, this was impressed upon me in my recent visit
            EXEC::vnp({tozik: "showleft far"})
        it was as if i were strolling through a vaznian cavern

    karik
        ahh, in that case...
            EXEC::vnp({tozik: "hide", itzil: "hide", karik: "show far"})
        even with the high density, it should still be mostly intact
        contiguous spire chambers are typically well reinforced, for they do not move often

    movefriend
        yes yes very good structure!
            EXEC::vnp({gakvu: "hide", karik: "hide", bg: false})
        however it will not last forever!
        archival veins around the θsegment are collapsing and will soon be falling into the area directly
        be careful friends! i will wait here for when you return!
    
    akizet
        are you able to handle the corroyi pressure here?
    
    movefriend
        umm no sorry!!
        once it is safe for all of you to leave me, 
        i will return to a safe level until you have resolved the pressure problem!
    
    miltza
        you are leaving us??
    
    movefriend
        oh no no no!
        only a little!
        i will be back to deliver you to the groundsmindry θsegment, of course!
        and if you take too long,
        ...
        nevermind!
        good luck!
    
    sourceless
        movefriend forms a tunnel to the personnel θtendril 
        though it remains partially closed until we are ready to proceed
        but before then, i should consider...
        who do i want to accompany me? 
        miltza has proven to be a powerful defensive force, despite her hesitance
        tozik, i think, we will need for his repair skills...
        but gakvu's control over corru is uniquely effective
        hmm...

    sys
        EXECUTING::"structure direction";"objectives"::

    plainsys
        present memory stream may progress non-linearly
        necessary events for sensical progression will be tracked and marked
        top right of render will provide details

    sys
        ::END

    RESPONSES::akizet
        velzie be kind<+>END
            EXEC::vn.done()

SKIP::vn.done()
`)

/* personnel intro */
env.dialogues["personnel"] = generateDialogueObject(`
start
    sourceless
        we advance to the personnel θtendril, those of us with timestopper connectors at the front
        movefriend's tunnel slowly becomes crooked as it adjusts to the uneven θtendril
        the corru walls take the form of false cave-stone, just like our recreation chamber
        and so the terrible brutality before us is like a vision of the past...
        but it is here now, a failed barricade given way to invasion
        silent, picked over, without sign of foe
        the qou here are dissected, mindcores half-dissolved in their bled components
        the others avert their eyes after a quick scan, but i find myself staring
        why are their bodies so intact? why such precision?
        regardless - i do not see any sign of itzil's kivii, these are θjut and vel
    
    akizet
        just keep moving
    
    sourceless
        i gesture for the mindcores to climb up along the walls and ceiling, as it will be safer
        and in that brief glance, itzil is frozen at the sight of these bodies
        friends, no doubt
    
    sourceless quiet
        then, a step into our advance, a familiar whisper comes again...
            EXEC::changeBgm(env.embassy.music_signal, {length: 10000, seek: 0});
        we exchange a few glances, tozik's receptors at attention
        he speaks flatly, dreadfully
            EXEC::content.classList.add('painprep', 'painhalf')

    tozik
        it is happening again
    
    sourceless
        that is all the time we have to brace ourselves

    sourceless quiet
        the signal, the pain, it is here
            EXEC::env.embassy.day3Signal(3000)
        the wordless message, breathed again
        a horrific wave crashing against and passing through every organ
        it feels clearer, but we still stand--are we more resilient?
        is it directed more specifically to something? it certainly is not for us
        i can think this time... i can feel that the pain is not mine
        i manage to stay standing against a wall, and the others stumble, clutch their heads, their chests...
        my eyes bend, my sense of gravity is disrupted... but i stay conscious
            EXEC::ratween(env.bgm, 1, 2000)

    karik
        <em>what</em> is happening again?
    
    itzil
        hey!! are you ok?!
    
    sourceless quiet
        what...
        i see through the pain, the mindcores plainly looking down upon us from the ceiling
        are they... not affected...?
        the signal is short-lived this time, like an echo of itself - already, it abates
        my eyes slowly recover, though i feel my perception is still not entirely accurate
        but before i can say anything, there is a rustling throughout the room
            EXEC::content.classList.add('painfade');vfx({type: "darkflash", state: true})
        the slain qou... some have risen
            EXEC::change("PAGE!!g_personnel", "dangerous");refreshStage()
            WAIT::400
            THEN::vfx({type: "darkflash", state: false});
        their bodies distorted by their damage, as if drawn to terrible life by secri
            EXEC::setCam({x: 3, y:4});vnp({hideStage: true, husk2: "show far", husk1: "show far"})
    
    miltza
        is that...

    itzil
        uzzi? kiku??
        are you--are you ok?!
    
    sourceless
        ŸÆkf
        itzil paints names to their twisted faces
        and they walk towards us with the strangest serenity
    
    aggressor
        here
        i am here
            EXEC::content.classList.add('slowpain');
        i am here
            EXEC::content.classList.remove('painmode', 'painhalf', 'painfade');vnp({hideStage: true, husk2: "show far", husk1: "show"})

    sourceless
        they speak in unison, half-broken vocal organs overdriven and metallic in timbre
        at first, with each step towards us, we back away, uncertain
        to kill an aberrant container is simple, but...
        do these ones intend us harm? or is it more? can they be helped?
        i must know--i step forward
    
    akizet
        hello?

    aggressor
        here
        i hê’ˆ³ar you
        i hear you
        usurpers
            EXEC::content.classList.remove('painprep')
        c o me
    
    gakvu
        akizet... stay back
        those are not obesk!!
    
    sourceless
        her fear conveys what i need to know
        they are not miraculous survivors, they are infested husks
        we must make the first move
    
    RESPONSES::akizet
        prepare to strike<+>END
            EXEC::vn.done();change("PAGE!!g_personnel", "dangerous");setCam()
            FAKEEND::(prepare)

SKIP::env.embassy.skips.personnel()
`)

/* personnel postfight */
env.dialogues["personnel_clear"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";"toggle within system menu if desired"
____END

    sourceless
        the husks stumble away, somehow still standing despite their incredible wounds
            EXEC::playerTurn({specificDirection: "up"})
        and to my surprise, with jagged and stilted movement, 
        they flee together through the path ahead??
            EXEC::change("PAGE!!g_personnel", "cleared");refreshStage({darkFlash: true});
        yes, they run... a tactical retreat, no doubt
        a mixture of doubt and fear joins together in our connection
        time runs too short for us to question this aberrance in any depth
        immediately, i scan over our team, and we are fine enough
            EXEC::changeBgm(env.embassy.music_unsafe_golems)
        itzil and karik cling to the ceiling in the corners, 
        gakvu has recoiled in our victory with no celebration, receptors twisted in shock
        miltza is much the same, but there is something more visceral in her frozen stance, a slow shake of her head...
        tozik, most of all, seems present in this moment with me, meeting my gaze with worry
        the θdeathly adrenaline, the subtle joy i felt before, is overwhelmed by grief
        i did not know these qou as itzil did,
        but in their melted faces were every person i have ever spoken kindly to        
        ...
    
    tozik
        those... 
    
    sourceless
        he nearly addresses them as qou, but thinks better of it as his voice shakes into a pause
    
    tozik
        ...they had no mark of control,
        no sigil or connector...
        certainly no mindcore--the shattered remains were plainly visible in their chests
        how is this even possible?
        our bodies are too complex even for regular groundsmindry

    sourceless
        tozik draws close to one of the remaining still bodies, as if it could offer any answer
        actually, if they are 'empty', perhaps itzil and karik could---
        no, no, i quell that horrific thought. these were itzil's friends
        but it does bring to mind their strange resilience to the wave that passed through us
        i call up to them, still huddled in the corner of the stony ceiling
    
    akizet
        itzil, karik...
        did you not feel the signal a moment ago?
        the same one as before? the... pain, the madness

    sourceless
        they look at one another, though itzil returns to huddling in the corner, eyespot turned away
    
    karik
        ...no!
        i mean, i felt something...
        but it... it just passed
        it was not like before
    
    akizet
        gakvu, miltza, you felt it?
    
    sourceless
        a simple affirmative receptor gesture from both is all they can muster for now
        tozik stands from the body he examined, drawing his corruskivi back beneath the surface of his hand
    
    tozik
        whether it was some form of communication or an attempt at control,
        i cannot help but feel it was not intended for us

    sourceless
        his finality implies we should leave this θtendril sooner rather than later, 
        especially with those husks of bodies on the move--we cannot know what their intentions are
        further sabotage would deliver us quickly to final death
    
    akizet
        itzil, karik
        remain close
        stay high and far away from any bodies or inactive golems

    sourceless
        i say that at first without looking, turning at the last θblink
        only to see that karik is quietly encouraging itzil to proceed
        in the wake of itzil's friends drawn to life by infestation, being forced to strike them back...
        my clinical direction must be a cold wind upon an open wound
        if i were forced to strike down gakvu, or tozik...
    
    karik
        we will be along--right?

    itzil
        ...yes, akizet!
    
    RESPONSES::akizet
        continue<+>END

SKIP::changeBgm(env.embassy.music_unsafe_golems);change("PAGE!!g_personnel", "cleared");refreshStage();
`)

/************** LOBBY */
/************** LOBBY */
/************** LOBBY */
/* 
    After they proceed through the personnel tunnel
*/
env.dialogues["lobby_danger"] = generateDialogueObject(`
start
    sourceless
        Ìw?¤eÔ!!!
            EXEC::pauseSwapCam(true);
            WAIT::100
            THEN::content.classList.add("slowcam")
        the husks that fled huddle in the opposite corner, repairing one another--
            EXEC::setCam({x: 7, y: 7, rotation: -90})
        and are guarded by two more...
            EXEC::setCam({x: 3, y: 8, rotation: -90})
        their immediate movements towards us forces our claws into aggression once more
        we cannot afford them a θblink of advantage
        velzie's eye hangs heavily over us, i feel its delight in our torment
        these husks must be destroyed before the others can come through

    RESPONSES::akizet
        prepare to fight!<+>END
            FAKEEND::(prepare)
            EXEC::change("PAGE!!g_lobby", "dangerous");setCam();content.classList.remove("slowcam");pauseSwapCam(false)
`)

/* 
    when the lobby is clear, akizet notes that the other doors seem to be sealed 
    so she calls in the rest of the team and gelitime beginnes
*/
env.dialogues["lobby_clear"] = generateDialogueObject(`
start
    sourceless
        despite the hardiness of these two, they falter under our blows
            EXEC::playerTurn({specificDirection: "right"})
        without sound, without speech, they flee again with unnatural speed--
        slithering through a gateway to the sfer supply θtendril
            EXEC::change("PAGE!!g_lobby", "cleared");refreshStage({darkFlash: true});
        i could give chase, but--it could just as easily be a tactical maneuver
            EXEC::content.classList.add("safe")
        we have gained critical ground, regardless
        it is safe enough, so i call back
            EXEC::changeBgm(env.embassy.music_golems)
    
    akizet
        it is safe to proceed! come, quickly!
    
    sourceless
        and so we stand in this great lobby, where i imagine movefriend first tried to deliver us
        we scatter around it, checking for any potential threats, examining damage
            EXEC::setCam({x: 5, y:8, rotation: 0});
        miltza still seems particularly affected, stood against a wall-ridge, motionless and tense       
        her position does draw my attention to the stone, the decorations of false life...
        were it not for the splattered corroyi and sludge from our once-friends, it would be beautiful
    
    akizet
        where is maintenance from here?
            EXEC::vnp({bg: true, itzil: "show far"})
    
    sourceless
        itzil scurries towards me, and i expect them to answer,
        but instead, they pass without a glance
        and approach the central desk, which has a managerial golem stationed within
            EXEC::vnp({hideStage: true, itzil: "show far", geli: "show far"})
        it is inactive, i did not even notice it at first
        uncanny... it resembles a qou more than a golem
    
    itzil
        geli? geli?
        sorry akizet - i will answer you, but i must see...
    
    sourceless
        there is some desperation in their voice, certainly fond of this particular construct
        itzil climbs up onto the golem's shoulder, then extends a branched receptor towards its head
            EXEC::vnp({itzil: "show", geli: "show"})
        tozik steps forward, reaching out in objection
            EXEC::vnp({tozik: "showleft downleft"})
    
    tozik
        itzil--
        you should not take any chances with--
    
    sourceless
        of course, it is too late, as itzil has already connected to it
            EXEC::env.embassy.geliState('boot');vnp({tozik: "hide"})
        in an instant, the golem's face flickers to life, its glow restored
        then comes the rest of its body...
            EXEC::env.embassy.geliState('on')
        it looks down at the mindcore on its shoulder, away from us
            EXEC::env.stage.querySelectorAll('.geli').forEach(el=> el.classList.remove('inactive'))
    
    geli
        itzil! hello!
        what are you doing here? i thought you took this θgaze for recreation
    
    sourceless
        its voice carries a larval femininity, shifting between intonations strangely as golems tend to
        itzil disconnects without issue, though there is a strange tension in their stare at this construct...
        perhaps with an engineer's eye, assessing the damage?
        this golem is fascinating, especially given the disconnected receptors it sprouted
        the physical marking of an echo with life-like personality
        it is likely bearing a strong echo of a tir in the embassy, or perhaps one carried from home
    
    geli::happy
        oh! welcome! you are all from another division?

____SHOWIF::["e3a2__escapewin", false]
    geli
        if you were hoping to use the...

    geli::uncanny
        the...
    
    sourceless
        geli's eyes drift around, scanning over the carnage, the damaged ceiling and walls...
        then, it seems to stare at me with the strangest expression of bafflement
        or--through me? i move out of the way, but it stares at me still
        then i check over my shoulder with a spin of my head, 
        but when i look back at the golem, it now looks at me, not like before
    
    geli
        ...i see...
____SHOWIF::"e3a2__escapewin"
    geli
        if you were hoping to use the advanced operations chamber,
        i am afraid it is currently in use!
____END
    
    itzil
        geli! oh you are ok!!
        can you help us? there is an emergency!!
        uzzi, and kiku, and--and everyone, <em>everyone</em>, they are all, i--
        i do not know how to put this, they...
        they are hurt! they are... violent!
    
    sourceless
        itzil has settled into a frantic pacing on the desk as they speak
        geli listens patiently, smiling like a bright cousin
        a strange behavior to assign to a golem...
        i suspect they wanted the qou here to practice smiling in case of public appearance
    
    geli
        oh! 
        do not panic, i am sure everything will be fine!
        let me request the assistance of...

    geli::concern
        ah...
        no golems in the area are presently responding to my requests!

    geli
        is there anything i can help you with immediately, before i diagnose the issue?
    
    sourceless
        if it is capable of coordination,
        then the golem must also have access to the door controls...
        perhaps with its help, we may fortify this chamber

    RESPONSES::akizet
        interrogate<+>CHANGE::geli_first
            EXEC::vnp({hideStage: true, itzil: "hide"});pauseSwapCam(false);setCam();
            HIDEREAD::
        look around more first<+>END
            EXEC::vn.done();pauseSwapCam(false);setCam();

SKIP::env.embassy.skips.lobby_clear();change("PAGE!!g_lobby", "cleared");refreshStage();setCam();
`)

env.dialogues["geli_first"] = generateDialogueObject(`
start
    akizet
        geli, i am akizet
            EXEC::vnp({hideStage: true, geli: "show"})
        that is gakvu, and miltza, tozik, and karik
        it seems you already know itzil
        there is some sort of attack upon the spire
        we thought it was the groundsmind at first, but...
        ...now unoccupied qou bodies are being manipulated, too
        did you receive any communications or signals while inactive?
        anything queued, or...
    
    sourceless
        geli gives a negative wave of its pseudoreceptors
    
    geli
        no communications, akizet

____SHOWIF::["e3a2__escapewin", false]
    geli::concern
        although... i had the strangest dream
        an endless repetition of the same terrible θgaze, forever
        and i could not wake up from it
        stranger still is that i am not supposed to dream, you see, hehe

    geli
        but then came itzil to save me! thank you, my friend
        by the way, i do not recall you being so small... you look so silly!

____SHOWIF::["e3a2__escapewin", true]
    geli
        that all sounds very strange!
        but it is not the first time some damage has been caused by aberrance!
        these things have a way of working out

    geli::happy
        oh, and look at you, itzil!
        i do not recall you being so small!
____END
    
    sourceless
        geli giggles with a strange naivete
        itzil chuckles too, but out of discomfort--slowly crawling away from the golem
        it does not seem to fully grasp the nature of the emergency, even with the blood before it
        is this a manifestation of incoherence? or simply how the echo was designed?
        either way - a managerial golem like geli will be invaluable for monitoring the spire's health
    
    akizet
        geli, do you know where the groundsmindry override is? it is in manufacturing, yes?

    geli::think
        let me see...

    sourceless
        geli's faceplate freezes as it draws its attention inwards
        it seems to be connected directly to the floor, and undoubtedly to a larger organ beneath
        i suspect geli can sense the entire θsegment in some capacity
    
    geli::happy
        yes, it is!
    
    geli
        and the override is within the distribution chamber, which is the final θsegment opposite to the entrance
        so just walk through and you will see it!
    
    sourceless
        geli is visibly pleased with its answer, smiling again
    
    tozik
        geli, is there an operational impressor in the area?
            EXEC::vnp({tozik: "showleft"})

    sourceless
        its gaze is drawn inwards again, taking slightly longer this time

    akizet
        what is that, tozik?
    
    tozik
        a tool that clones complex instructions and behaviors flawlessly, beyond simple copying
        usually, it is only used in qou-body and golem construction, but i think we can use it for this
        you see, we may make new timestopper connectors at any vat,
        but they would be awaiting a connection, still
        with grand cysts, any connectors must first make physical contact...
        a dull association, something to make them aware of one another and form necessary bonds
        with an impressor, we may route new connectors through those <em>already</em> established
    
    geli
        ah!
            EXEC::vnp({geli: "focus"})
        forgive me my delay, tozik, most of them are broken now...
        but there is a functioning one in the chamber just behind me!
        advanced operations!
        
    geli::happy
        it is in the form of a corboku, so i should be able to just grab it for you!
        i understand you want to use it right away, so i will connect it to manufacturing!
        please wait!
    
    sourceless
        ...

    geli
        ...
    
    geli::concern
        ...
        i seem to be unable to remove it from the advanced operations chamber
        is that velzie giggling i hear?! haha
    
    sourceless
        geli turns, drawing our attention as well
        the doors to the chamber are mangled in ways that the collapsing spire would not cause
    
    geli::think
        the impressor itself is reporting full function, but...
        adjacent corroyi pressure is forcing it against the chamber
        ...and the room itself seems to be severely damaged
            EXEC::vnp({geli: "defocus", tozik: "hide"})

    geli
        i suspect that has something to do with the deep sea construction golem they are working on!
        due to the damage, i am unable to see inside, and cannot establish contact...
        if you wish to use the groundsmindry override, you may be able to fix the door and pressure!
        my control over the local area is very limited by comparison
        so yes - please do that, and ensure everyone inside is all right!
    
    itzil
        geli!!
            EXEC::vnp({itzil: "show"})
        have you seen my kivii? you recall her, yes?
    
    geli
        of course i remember!
        dozkii, i heard you call her... hehehe
        why would she be here?
    
    itzil
        ...nevermind
        she is just here, ok?
        we need to find her
    
    geli::concern
        oh... well, i cannot really help you
            EXEC::vnp({itzil: "hide"})
        there are so many local relays not responding right now...
    
    geli::happy
        but, while you look for her, please show your friends around!
        there is so much to see!
    
    sourceless
        again, geli seems pleased with its tone-deaf response
    
    akizet
        all right, the plan is the same, then...
        we stop the collapse, we find itzil's kivii and any survivors, we scrape together what we can...
        and then we proceed
        geli - we need this chamber to be safe for whoever is not with me
        are you able to only allow us to pass through these doors?
    
    geli::think
        oh! well, that may be an inconvenience, but...

    geli::happy
        so long as it is a temporary arrangement, yes!
    
    geli
        i will forward any complaints i receive to you directly
        in fact!
        directly connected θtendrils are sfer supply, manufacturing, and minor operations
        i sense that there are several non-qou entities within each,
        and they are not responding to my identification requests...
        if you see them, please let them know to respond to me as soon as they can!
        and let me know if you need anything else!
            EXEC::change("PAGE!!geli", true);change("TEMP!!nogelizoom", true)
    
    RESPONSES::akizet
        ask about something else<+>CHANGE::geli
            HIDEREAD::
        proceed<+>END
            EXEC::vn.done()

SKIP::change("PAGE!!geli", true);change("TEMP!!nogelizoom", true);vn.done()
`)

env.dialogues["geli_resp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        door<+>door
            SHOWIF::[["mask", "hunger"], ["gol__geli_beacon", true], ["e3a2__bstrdmeet", false]]

    RESPONSES::akizet
        manufacturing<+>manufact
        sfer supply<+>sfer
        operations<+>ops
        dog<+>dog
            SHOWIF::"PAGE!!dog"
        leave<+>END
            EXEC::vn.done()
`)
env.dialogues["geli"] = generateDialogueObject(`
loop
    RESPOBJ::geli_resp
    
start
    sourceless
        i approach geli again, and it regards me with a kind forward bow of its receptors
            EXEC::vnp({hideStage: true, geli: "show far"})
            SHOWIF::['TEMP!!nogelizoom', false]

        i linger near geli, thinking about what lies ahead
            EXEC::vnp({hideStage: true, geli: "show"});sessionStorage.removeItem("TEMP!!nogelizoom")
            SHOWIF::['TEMP!!nogelizoom']

    geli
        hello, akizet!
        what do you need?
            EXEC::vnp({hideStage: true, geli: "show"})
    
    RESPOBJ::geli_resp

manufact
    akizet
        what can you tell me about the manufacturing θtendril?

    geli
        well, it is in the name, yes? hehehe
        it is home to a number of slow and fast foundry vats for varying levels of corru instruction
        and that is where the groundsmindry override is, for distribution purposes
        from here, i can feel that it is largely intact, but...
    
    sourceless
        geli shakes its head and receptors both, slowly
        it pauses to think about something, then opens its pseudoreceptors in bafflement

    geli::concern
        the distribution network is behaving erratically
        someone must be fooling around with the override, again...
    
    geli::happy
        a troublesome vel, no doubt! haha!
    
    sourceless
        i scoff and glance at gakvu, whose tightly wound receptors loosen in response
    
    RESPONSES::akizet
        hehe<+>loop
            FAKEEND::(back)

sfer
    akizet
        what do you know about the sfer supply θtendril?

    geli
        that is where essential metals are processed, and sfer is grown for this θsegment of the embassy
        additionally, it has a storage chamber equipped with dull microconnectors for remote delivery
        a technology fresh from the θjut's receptors!

    akizet
        microconnectors...?

____SHOWIF::['PAGE!!mboss', false]
    itzil
        ah! yes... an--an exciting development!

    sourceless
        some flicker of itzil's cheer returns, if only for a θblink
    
    itzil
        it is like using a contrivance to send about small, mundane materials
        i do not know the specifics myself, but gozri--ah, a friend of mine--was the proponent of those...
____END

    akizet
        that does not seem very safe

____SHOWIF::['PAGE!!mboss', false]
    itzil
        well, it is still a new technology... 
____END

    tozik
        i heard about those on the network - a vaznian development, from...
        ukazni ozo, ironically
        though the implementation seemed promising...
        it seems reckless to use them in the domain of the bright cousins

    geli::happy
        do not worry, it is perfectly safe!

____SHOWIF::['PAGE!!sboss', false]
    geli::concern
        though, i cannot clearly perceive what is happening within that θtendril right now...
        ...because there is a strange interference originating from it...
        i suppose that is why i cannot contact anyone, in fact!
        could you go tell them to stop that?
    
    sourceless
        what...
        is that where the recent signal came from?
        whether it be an intentional use by the groundsmind, or the technology simply breaking down,
        this warrants investigation...

____SHOWIF::'PAGE!!sboss'
    geli::concern
        though, since you were there, i am no longer able to detect the managerial golem
    
    geli::happy
        did it trip and fall into a microconnector? 
        hahaha!!
    
    geli
        only joking
    
    geli::concern
        do you know where it went, though?
    
    akizet
        ah...
    
    gakvu
        yes, it is fine, it just had to visit another θsegment
    
    geli
        ok!
____END
    
    RESPONSES::akizet
        ...<+>loop
            FAKEEND::(back)

ops
    akizet
        what lies within the minor operations θtendril?
    
    geli::happy
        ah, a wealth of interesting research!
        it contains the side projects and lesser divisions within the golem maintenance team
        a large number of chambers float around the corroyi of that θtendril!
        but only a few are directly connected at a time, as the others are on hold
        presently, the connected divisions are... oh, let me see...
    
    sourceless
        geli's gaze defocuses, and its pseudoreceptors slowly close with concern
            
    geli::concern
        how funny...
        deconstruction, dull development, friends, translation... 
        they appear to be connected, but are nearly all affected by some sort of blockage...?
    
    geli
        i wonder what they got up to in there! haha!
        you may only be able to reach a few of them for now
        i will alert the groundsmind!

    akizet
        that--
        that will not be necessary

____SHOWIF::'PAGE!!oboss'
    akizet
        we were just there, it is fine
        they are, ah...
    
    cavik
        just doing some construction! haha
        right bozko?
    
    sourceless
        ...

____SHOWIF::['PAGE!!oboss', false]
    akizet
        we can fix it

    geli::happy
        oh, all right! thank you!
    
    sourceless
        the golem smiles widely at me again, blindly accepting my blatant lie
        translation... a strange operation to have in a golem maintenance floor!
        perhaps they were preparing some sort of new translation golem?
        it may not be of great use to us now, but...
        perhaps we should at least fetch some of the archival data, if any is intact
        a great amount of work between divisions was done to decipher so many languages of the cousins
        it would be a tragedy if any were lost
        of course, this is not even secondary to preventing the structure from collapsing as a whole...
    
    akizet
        thank you, geli
____END

____SHOWIF::[['PAGE!!mboss', false], ['PAGE!!oboss', false]]
    sourceless
        itzil stirs from a distant stare at the mention of these projects

    itzil
        oh, akizet...
        that part of the θsegment is very close to a side of the spine,
        so nearly all of the minor operations have direct connections to the archival veins
        once the area is stabilized, we could go see if there is anything of use!
        i know the dull development division had some interesting projects
        they may come in handy, now
        maybe gozri is ok, hiding in there...

    sourceless
        by what we have learned and heard so far,
        i cannot help but suspect not a single qou is left alive in this place
    
    akizet
        we should hope so, yes
        thank you, itzil
____END
    
    RESPONSES::akizet
        ...<+>loop
            FAKEEND::(back)

dog
    akizet
        we encountered a little construct in sfer supply
        it looked like a <span definition="NOTE::'partial translation';'implied closest cultural equivalent'">dog</span>!
        what is that for?
        it did not even attack us, it simply ignored us...
    
    geli::happy
        that is kuulla!
    
    geli
        our assistant and mascot for the θsegment
        you should ask itzil about them!
        they love kuulla
        the team uses it to alert them when certain processes are complete
        it even has all of the mannerisms of a real <span definition="NOTE::'partial translation';'implied closest cultural equivalent'">dog</span>!
    
    akizet
        i see! 
        thank you, geli
    
    RESPONSES::akizet
        ...<+>loop
            FAKEEND::(back)

door
    self
        hello?
        the door is open i think
        i don't know how this works
        can you escape?
    
    sourceless
        the golem stares past me... at the sludged door
        does it see something we cannot?
    
    akizet
        geli, what was that chamber?
    
    geli::uncanny
        oh? chamber?
        oh!

    geli::happy
        that is the entrance! and exit!
    
    geli
        it appears it has sustained heavy damage
        almost as if the chamber itself is completely gone!
        i am presently trying to do something about it
    
    geli::concern
        however my usual methods are not... working...

    geli::uncanny
        <span definition="INHERITED CONTEXT::'ƒiN®d…hlP'">perhaps you should try it? the door?</span>

    sourceless
        its ignorance is almost endearing

    RESPONSES::akizet
        oh well<+>loop
            FAKEEND::(back)

SKIP::vn.done()
`)

env.dialogues["geli_beacon"] = generateDialogueObject(`
start
    geli::uncanny
        ...
            EXEC::vnp({hideStage: true, geli: "show"});env.dialogueActors["geli"].expressions.uncanny.exec()

    sourceless
        geli is staring through me, again
        it is so unsettling...
        is it truly untouched by the signal? is it madness?
        does it simply have a distaste for vel?
        
    akizet
        geli?
        is something wrong?

    geli::concern
        <span definition="INHERITED CONTEXT::'ÿÎL;ö9ÿÿÿy	Det me ou t¶'">nothing!</span>
        <span definition="INHERITED CONTEXT::'cannotH‰(HT$0I m ove';'help'">nothing!!</span>
        <span definition="INHERITED CONTEXT::'Ä(ÃÌ@Strange thought';'førcing plaÇe‹|$'">nothing!</span>
        <span definition="INHERITED CONTEXT::'‹ÆtryingH‹t$@H‹|$';'find‹ù‰others';'ÿÿÿÿÿÿDOOR|GAP'">please let me know if there is anything i can do for you!!!</span>

____SHOWONCE::
____SHOWIF::[['geli_beacon', false], ["gol__geli_beacon_fallback", false]]
    moth
        getting some weird inherited context on this one, you see that?
        you were right about geli - incoherence spiked right as it was speaking
            SHOWIF::"mth++gol-geli"
        maybe this is that "lost one" that the council was talking about?
        really wish it wasn't in such a critical memory though
        do you really think we should help it?
    
    self
        new discoveries are as valuable as memories
        these lucid thoughtforms and their masks are new ground
        we need to get more from them
    
    moth
        i guess
        but we have a golden goose here, you know?
        there's so much wrong with this corrucyst that i'm just trying to be careful
        anyway, if you really want to go ahead with this, 
        we need to figure out what that context means - "door gap"
____END

____SHOWIF::[['geli_beacon', false], ["localorbit__fairy_beacon", false], ["gol__geli_beacon_fallback", false]]
    moth
        i don't know if we have anything that could actually change the memory enough to help
        maybe the council knows what we could do?
        definitely don't go asking funfriend though lol

____SHOWIF::[['geli_beacon', false], ["ozo__fairy_intro", true], ["gol__geli_beacon_fallback", false]]
    moth
        maybe that mask the fairy gave you could help out here
____END
    
    RESPONSES::akizet
        ok...?<+>END
            EXEC::change("geli_beacon", true);vn.done()

END::vfx({type: 'beacon', state: false})
`)

/********************* MANUFACTURING */
/********************* MANUFACTURING */
/********************* MANUFACTURING */
env.dialogues["m_clear"] = generateDialogueObject(`
start
    sourceless
        we are greeted with an eerie silence
            EXEC::change("PAGE!!mmid", true)
        no foe awaits us, so the team gathers in to assess the paths availed
        i notice tozik considering the side rooms
        two are labelled as the vat chambers, lesser and greater
        both could serve us in different ways, though the lesser is far better for quick production
    
    sourceless
        karik skitters ahead, prodding at the damaged door opposite the entrance
        it looks unhealthy, the different parts fused together
        karik waves a leg to rid it of some sludge
        then, they climb up atop the nearby desk
            EXEC::pauseSwapCam(true);specialCam('g_m_door')
    
    karik
        ah, i thought so!
    
    sourceless
        itzil follows, slowly
    
    karik
        akizet, the door that would take us towards the override is sludged!
        do you have any explosives?

    itzil
        what?! will that not just cause a greater collapse?

    karik
        not like you think, my friend!
        i have done a great deal of structural management in my θdeath
        with thanks to the intelligent structuring of these θtendrils,
        a directed explosion - especially with kavrukas - will allow us a degree of safety
        if this were the research θsegment, it would be an issue... but here, it is fine
    
    akizet
        any alternative, gakvu?
    
    gakvu
        i cannot help with this one
            EXEC::vnp({gakvu: "show downleft"})
        my tricks only work on living corru

    akizet
        ah...
            EXEC::vnp({gakvu: "hide"})
        how many kavrukas would do it?

    karik
        to clear this door and open a hole...
        three should be safe!

____SHOWIF::'PAGE!!bozcav'
    sourceless
        cavik, who had been rummaging through the disabled golem parts, approaches us
            EXEC::vnp({cavik: "show downleft", bg: true})
        his claws are darkened with sludge, clutching a few murky spherical organs
    
    cavik
        hey!
        you may not need to use kavrukas at all...
        the golems in here, they had a few small-scale dull eyes
        i know how we could wire them to explode
    
    karik
        what, truly?!
        a novel application, cavik!
    
    akizet
        ah--cavik
        you are sure it will be safe?
    
    sourceless
        bozko's voice emanates from behind me, 
        the loudest in this room despite his intent to speak quietly

    bozko
        i have seen it
        trust him
    
    cavik
        ...yes!
        thank you bozko
        yes, it is, well--
        it is as safe as using kavrukas to blow open a door, hehe
    
    akizet
        then that will do!!
        
____SHOWIF::['PAGE!!bozcav', false]
    sourceless
        i scan over the things i carry, and eye the others connected with me
        we do have a satchel with plenty to spare

    akizet
        yes, we have enough!
    
    karik
        excellent! 
        come over here when you are ready to proceed!
    
    sourceless
        we could do this right away,
        but it may not be a bad idea to check the side rooms

____SHOWIF::[['PAGE!!mmid'],['PAGE!!smidclear'],['PAGE!!smcut', false]]
    sourceless quiet
        suddenly, one of the side doors unlocks with a strange little musical chime
            EXEC::play('obeskToggle', 0.75);specialCam('g_m_shortcut');vn.done()
        a familiar voice quickly follows...
    
    geli
        hello!! 
        i have detected all unauthorized entities,
        in BOTH manufacturing and sfer supply,
        are no longer within the premises!
        how did you manage that? ahaha!!
        i hope they did not argue with you too much!
        anyway i am opening the connective tunnel between these areas now!
        thank you!
    
    sourceless
        a small chime plays as it deactivates
            EXEC::setTimeout(()=>step(), 100);change('PAGE!!smcut', true);vn.done();
    
    akizet
        ah... thank you, geli

    sourceless
        how strange it waited until now...
        did geli detect a threat in here?
        where did it go?
____END

    RESPONSES::akizet
        continue<+>END
            EXEC::vn.done();pauseSwapCam(false);specialCam(false)

SKIP::env.embassy.skips.m_clear()
`)

env.dialogues["m_door"] = generateDialogueObject(`
start
    sourceless
        karik waits patiently by the door
            EXEC::vnp({karik: "show far", bg: false})
        in their gaze, i sense a strange calmness
        i did not notice before, but they seem almost unconcerned by the situation...
        do they know something i do not? or are they simply that confident?
        regardless, their unwavering will is a glimmering fruit in this terrible place
    
    karik
        ready to proceed?

____SHOWIF::[['PAGE!!bozcav', true]]
    akizet
        cavik! can you help, with your explosives?

    cavik
        yes! just say when!
            EXEC::vnp({karik: "show far", cavik: "show"})

____SHOWIF::[['PAGE!!bozcav', false]]
    akizet
        yes!
____END

    RESPONSES::akizet
        detonate the door<+>boom
            EXEC::change('PAGE!!kavboom', true);
            SHOWIF::[['PAGE!!bozcav', false]]
        detonate the door<+>boom
            EXEC::change('PAGE!!cavboom', true)
            SHOWIF::'PAGE!!bozcav'
        debug force boom<+>boom
            SHOWIF::'TEMP!!debug'
            EXEC::change('PAGE!!kavboom', true);
        delay that<+>END
            EXEC::vn.done()

boom
____SHOWIF::'PAGE!!kavboom'
    sourceless
        i collect three of our kavrukas, and prepare to place them on the ground before the door
            EXEC::pauseSwapCam(true);specialCam('g_m_door2')
        karik taps the spots where they should be placed, equidistant in a half-circle
            EXEC::vnp({karik: "show far"})
        then, they skitter closer to twist their angles slightly...

    karik
        yes, good, that should do it! let me just instruct them...
    
    sourceless
        with a quick pseudoreceptor connection to each, karik imparts some direction
        they flicker to life, rising on their little legs
        karik guides us away from the door, then calls out,

    karik
        all right, go!
    
    sourceless quiet
        the two on the sides each angle their front upwards,
        and the center kavruka scurries up onto the door itself
            EXEC::vnp({karik: "hide"})
        all at once, they detonate - sludgy debris splattering across the walls
            EXEC::change("PAGE!!gmdoor", true);play('shot5', 0.5);step()

____SHOWIF::'PAGE!!cavboom'
    sourceless
        cavik steps forward, sewing a connective vein through the pilfered golem dull-organs
            EXEC::vnp({karik: "show far", cavik: "show downright"})
        he looks to karik for direction, who taps a few spots around the door along the walls
            EXEC::pauseSwapCam(true);specialCam('g_m_door2')
    
    karik
        this is a parting door, so it has a few points we can target
        here, here...
    
    cavik
        here?
    
    karik
        no no, you would think that, but that is a reservoir for locking...
    
    sourceless
        ...
        after a few moments, a traveling mold-like pattern has been drawn across the edges of the door
        nodules of destabilized dull components glow and jitter dangerously
        karik and itzil have both backed away, and us with them
    
    karik
        all right, go!
    
    sourceless quiet
        there is a sudden searing flash of gray dull light, and then a heavy impact,
            EXEC::vnp({karik: "hide", cavik: "hide"});play('dull');change("PAGE!!gmdoor", true);
        the remnants of the door melted away
            EXEC::setTimeout(()=>step(), 200)
____END

        as karik promised, an uneven entrance is opened
        itzil starts to approach the tunnel, undoubtedly eager to find their kivii
        but karik moves in the way, waving their pseudoreceptors urgently
        
    karik
        woah! no no, not yet!
        if there are any hostiles within...
        they will be expecting us, if they are not already coming
        akizet, go forth!

    itzil
        ok...
    
    RESPONSES::akizet
        let us proceed<+>END
            EXEC::vn.done();specialCam(false);pauseSwapCam(false)
`)

/* when the minor vat room is cleared */
env.dialogues["m_min"] = generateDialogueObject(`
start
    sourceless
        lesser vats...
        these could be used to generate a variety of tools,
        if they were not presently being operated by a groundsmind-controlled golem
        to some terrible end, i have no doubt--
        we could back away and have geli keep the chamber closed, but...
        these small and quick construction vats could lend us some valuable weaponry
            EXEC::change("PAGE!!g_m_minor", "dangerous")
        for that to happen, we must pry them free of control, first
    
    RESPONSES::akizet
        prepare<+>END
            FAKEEND::(prepare)
`)

env.dialogues["m_minvat"] = generateDialogueObject(`
start
    sourceless
        most of the vats broke or gave way in our fight
            EXEC::change("PAGE!!minvatitems", true)
        still, according to this terminal... there are some products in the wreckage
        remnants of whatever they had been composing before control was fully wrested away
        
    sys
        ITEM_RECEIVED::"<span definition="INHERITED CONTEXT::${env.ITEM_LIST['eq_pariispike'].description}">parii spike</span>"
            EXEC::env.embassy.conditionalItem('eq_pariispike', 1, 'minspike')
            AUTOADVANCE::
    
    definitionget
        TEXEC::definitionRender({getAttribute: () => "STATUS++item_pariispike"}, {returnHTML: true})
    
    sys
        ITEM_RECEIVED::"<span definition="INHERITED CONTEXT::${env.ITEM_LIST['eq_surge'].description}">ukuzu simulacrum</span>"
            EXEC::env.embassy.conditionalItem('eq_surge', 1, 'minkuzu')
            AUTOADVANCE::
    
    definitionget
        TEXEC::definitionRender({getAttribute: () => "STATUS++item_surge"}, {returnHTML: true})

    sourceless
        ...both production requests were recent,
        near enough to have been after the signal's first appearance...

    RESPONSES::akizet
        depart<+>END
`)

env.dialogues["m_mingun"] = generateDialogueObject(`
start
    sourceless
        all but one of the production vats are damaged, apparently
            EXEC::change("PAGE!!minvatgun", true)
        but it is just enough for our schematic
        i place the strange cyst in the vibrant reservoir,
        where smaller tendrils weave through its membrane
        at first, i suspect it will not work, given its damage

    sourceless quiet
        but a small chirp of confirmation soon rings out as production begins
            EXEC::play("obeskToggle")
        ...

    sourceless
        in a surprisingly quick θblink, the last vat presents its final product

    sys
        ITEM_RECEIVED::"<span definition="INHERITED CONTEXT::${env.ITEM_LIST['eq_rifle'].description}">symbiotic rifle</span>"
            EXEC::env.embassy.conditionalItem('eq_rifle', 1, 'mingun')
            AUTOADVANCE::
    
    definitionget
        TEXEC::definitionRender({getAttribute: () => "STATUS++item_rifle"}, {returnHTML: true})

    sourceless
        a bright weapon, almost identical to that odd golem's
        i still do not know how these work, but--
        oh! in its grip, a connection is made
        a small implantation of knowledge, like an archival cyst, on its specific operation
        it compels the mind to race, to imagine how it might fare on another world
        my receptors reflexively curl with a small delight
        ...yes, this is a suitably deadly thing

    RESPONSES::akizet
        depart<+>END
`)


//the dialogue for the construction of the golem once parts are known (post manufacturing boss)
env.dialogues["m_maj"] = generateDialogueObject(`
start
    sourceless
        this is the perfect place to construct our golem...
        since the parts are already assembled, we need only connect them
        so it will not even take very long!!

    sys
        EXECUTING::"structure direction";"golem acquisition"::

    plainsys
        utilize entity; GREATER TERMINAL; to proceed

    sys
        ::END
    
    RESPONSES::akizet
        investigate<+>END
`)

env.dialogues["m_golem"] = generateDialogueObject(`
start
    sourceless
        these are the greater vats

____SHOWIF::'PAGE!!mboss'
        the golem for itzil and karik--we can create it here!
        with golem components easily within reach, now is a good time
        even if itzil does not awaken, they can be held within the body safely

____SHOWIF::[['PAGE!!mboss', false]]
        i think they are used only for large or time consuming builds...
        what use would we have for this?
____END

    RESPONSES::akizet
        begin<+>construct
            SHOWIF::[['item|golem_parts']]
        depart<+>END

construct
    sourceless
        i take some time to gather everyone in the greater vats
            SHOWIF::["PAGE!!bozcav", false]
            EXEC::vnp({miltza: "show far", gakvu: "show far", tozik: "show far", karik: "show far", bg:true})
            
        i take some time to gather everyone in the greater vats
            SHOWIF::"PAGE!!bozcav"
            EXEC::vnp({bozko:"show far", cavik:"show far", miltza: "show far", gakvu: "show far", tozik: "show far", karik: "show far", bg:true})
        
        we will need to coordinate to make this happen

    akizet
        all right!! everyone...
        it is time to construct a golem for our disembodied friends
        tozik - can you prepare the foundry vat here?
            SHOWIF::['PAGE!!bozcav', false]
        cavik, tozik, can you prepare the foundry vat?
            SHOWIF::'PAGE!!bozcav'

    tozik
        of course

    cavik
        easy!
            SHOWIF::'PAGE!!bozcav'
    
    akizet
        all others, with me! we must fetch those materials!
    
    sourceless
        we set out to gather parts and sfer
            EXEC::vn.done();vnp({hideStage: true})
        ...
        and in time, we return, the areas still clear enough to give no trouble
            EXEC::content.classList.add('makingik');specialCam('g_m_makegolem');pauseSwapCam(true)
        the golem parts are settled into the central vat,
            EXEC::vnp({hideStage: false, bg: false})
        still visible in the constructive corroyi
        or, maybe simply visualized upon the wall...
        either way, tozik guides the operations with a connected receptor
            EXEC::vnp({tozik: "show downleft"})
        so now, we must wait...

    akizet
        together, these golem parts are going to be quite large...
        i do not think you will be afforded the same speed as us, karik
        even with the timestopper...
    
    karik
        do not fear, akizet!!
            EXEC::vnp({karik: "show", tozik: "hide", bg: true})
        i have piloted large skin-golems before
        i am sure this will be no different!
        even if i will have a passenger...

    sourceless
        our eyes collectively converge on itzil
        they still remain dormant

    karik
        i hope they will come out again soon
        perhaps being contained in such a potent weapon will bring their spirits up
    
    akizet
        they have not surfaced even once?
    
    miltza
        no, not yet...
            EXEC::vnp({karik: "hide", miltza: "show"})
        i have tried everything i know, short of connecting to them directly
        but such a foolish maneuver would only cause harm, especially done unexpectedly
        still... short of a connection, i fear itzil may be undergoing ego spiraling
        i saw this happen in my larval work, once...
        though it is markedly more obvious in larval victims
        but--do not worry
    
    karik
        yes, we have been working out a plan for when we leave!
            EXEC::vnp({karik: "show", miltza: "hide"})
        even if they, ah...
        self modify, there are certain processes that can be undergone
        too many simply choose to forget they ever--

    tozik
        it is ready
            EXEC::vnp({karik: "hide", bg: false})
    
    sourceless
        our collective empathy for itzil is pushed aside,
        a new tool of vengeance emerging from the vat walls
            EXEC::content.classList.remove('makingik');
        one great golem, larger than bozko, wielding dull pulse equipment...
            EXEC::vnp({ikgolem: "show far basehead", hideStage: true})
        even velzie will be delighted to see us triumph with it
        tozik gives one last impulse to have the golem's chassis briefly soften, 
        allowing the placement of mindcores within
    
    karik
        all right!!
        just like we planned, miltza--place them in the lower center!

    miltza
        of course
    
    sourceless
        karik scurries up the golem's skin, then dives beneath it
        near instantly, its luminescent components flare with life, limbs twitching
        while karik maps their senses to the golem,
        miltza lifts itzil's idle mindcore, depositing them through the golem's opaque torso
        in the slight clutch of her receptors is a certain apprehension
        perhaps she thinks she could have done more?
        but... we cannot harm ourselves to save itzil, 
        when we may be all that could stop the attack...
        karik's voice suddenly booms from the golem as its faceplate gains their eyes
    
    karik
        i am re-bodied!
            EXEC::vnp({ikgolem: "show", hideStage: true})
        ahahaha, and what a body!

    sourceless
        even a pair of receptors sprouted, a combination of both karik and itzil's

    tozik
        everything is working?
            EXEC::vnp({tozik: "showleft far"})

____SHOWIF::'PAGE!!bozcav'
    tozik
        we had some concerns that the vat may have been affected by the signal...
        cavik kept an eye on vat activity and found no anomalies, but...

    cavik
        yes, to be safe!

____SHOWIF::['PAGE!!bozcav', false]
    tozik
        i had some concerns that the vat may have been affected by the signal...
        but it seemed to be fine - perhaps too sparsely organized to be seized
____END
    
    sourceless
        karik lifts one of their new gauntlets experimentally,
        the fist liquefying and forming into an open claw with the glow of the dull
        a dull flaring device - similar to the ones they used to split dead veilk back home...

    karik
        yes!
        truly inspiring tools!!
        together we will render this wretched aggressor into dust!
    
    gakvu
        just be careful with that
            EXEC::vnp({gakvu: "showright far"})
        if you cut a room in half...
    
    sys
        NOTICE::'additional party member';'IK GOLEM';'now available'
            EXEC::env.embassy.addPartyMember("ikgolem")
    
    RESPONSES::akizet
        continue<+>END
            EXEC::change("PAGE!!ikgolem", true);vn.done();specialCam(false);pauseSwapCam(false)

SKIP::env.embassy.skips.m_golem()
`)

//
env.dialogues["m_boss"] = generateDialogueObject(`
start
    sourceless
        this husk...
            EXEC::specialCam("g_m_boss");pauseSwapCam(true);toggleBgm(env.embassy.music_unsafe_golems);ratween(env.bgm, 0.75);
        around it are the remains of dozens of golems
        they were a formidable fighter, but ultimately overwhelmed, it seems...
        and now, they stand again, wielding the same fierceness against us
        at its sides hover two great manipulation gauntlets, following its instruction
        this will not be easy...

    kivii
        st..y.. ...w.a.y..
            EXEC::vnp({kivii: "show", hideStage: true})
        o o uu t
    
    sourceless
        üX‰Ô
        this one is very different
        its voice carries a tone that the aggressing groundsmind does not
        it is desperate?
        even its receptors are moving, unlike the previous husks...
        the expression is unclear, it is incoherent, pained maybe, but...
        its damaged mindcore looks like it has retained some form, somehow
        exposed through what i can guess is a failed escape from the body
        was it only grazed? was that enough to make it vulnerable to the signal?
        does it still hold an obesk mind, or is it something else...?

    akizet
        hello?
        can you see us? are you here?
    
    itzil
        kivii!!!
            EXEC::vnp({itzil: "show far"})

    sourceless
        what?!
        itzil has scurried into the room with us, while it is still dangerous!!

    akizet
        no, no--get back!!
    
    sourceless
        itzil keeps a hesitant distance, but i see they struggle to accept what is before them
    
    kivii
        h er e...
        ti... rii...
    
    sourceless
        no...
        how many of these still hold someone?
        
    itzil
        kivii... dozkii
        what has happened to you?
    
    kivii
        hur t
        f in all y   a w ake
    
    sourceless
        the husk of dozkallvi ceases her advance, itzil just slightly ahead of us
        do i let this play out?
        itzil is frozen not out of fear, but confusion
        so are we
        is this one truly an enemy, like the others?

    itzil
        kivii... this is not you... is it?
    
    kivii
        ...

    itzil
        please--please, say something!
        i am here, i am here!!

    kivii
        s o ˆ€¥6<(fa ar
    
    sourceless
        something changes in her stance
        itzil's kivii twitches, then shakes violently, the corru of her internals rippling strangely
            EXEC::vnp({kivii: "show step2"})
        suddenly, she seizes her own mindcore, and...
            EXEC::vnp({kivii: "show step3"})

    aggressor
        usurpers
        co m e w€ºù|±|h m e
        
    sourceless quiet
        there is a crunch, the shattering of a corrucystic shell
            EXEC::vnp({kivii: "show step4"});play('stab', 0.75)
        itzil shrieks in agony, crying out wordlessly
        whatever remained of dozkallvi is gone, and her body now raises a gauntlet to crush itzil
            EXEC::vnp({itzil: "hide"})
        we have to move, now
    
    RESPONSES::akizet
        attack!!<+>END
            EXEC::change("PAGE!!g_m_dist", "dangerous");vn.done();specialCam();setCam();pauseSwapCam(false);env.stage.current.scaryBoss()
            FAKEEND::(prepare)

SKIP::env.embassy.skips.m_boss()
`)

env.dialogues["m_bossclear"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";"toggle within system menu if desired"
____END

    sourceless
        all at once, the reanimated corpse and its gauntlets fall with a heavy thud
            EXEC::env.stages['g_m_dist'].removeBoss();
        stumbled back into the debris, now unceremoniously still and silent
        unmistakably, she was wielded against us, and we had little choice,
        but...
        ...
            EXEC::toggleBgm(env.embassy.music_golems_cleared)
        distantly, i hear the rustling of the others down the hall we came through
            EXEC::env.embassy.music_unsafe_golems.rate(1)
        they heard the screaming, and must have come to see if we could be helped...
        i call back to them
    
    akizet
        it... it is clear, come in...

    sourceless
        wait
        itzil
        where is itzil??
    
    akizet
        itzil?!
    
    sourceless
        karik enters the room last, noticing the corpses before me...
        then, quickly staring off in a corner of the room, at--what is that?
        a mindcore lies in the corner...
            EXEC::vnp({itzilBusted: "show far", hideStage: true})
        that... is itzil, having entered stasis, even their pseudoreceptors retracted into their shell
    
    karik
        oh...
            EXEC::vnp({karik: "showleft far"})

    sourceless
        gakvu steps past me without expression, towards the override
        tozik follows her, both intent on resolving the structural situation quickly
        each of them briefly match eyes with me, knowing full well what is unfolding
        then i see miltza... she and karik both approach itzil gently
        she kneels, receptors open empathetically
            EXEC::vnp({miltza: "showleft far"})
    
    miltza
        itzil?
        ...
        they are alive, just, retracted...
        i have seen this before with separative trauma
        but... never in a qou!
        we can only hope they do not turn anything off

    karik
        itzil told me that they had been with their kivii since they were both larval
        even ascending on the same θgaze...
        it will not be easy
    
    sourceless
        miltza looks back towards me, noticing my staring
            EXEC::vnp({karik: "hide", itzilBusted: "hide", miltza: "show"})
    
    miltza
        akizet, you should let me and karik tend to itzil
        see to the structure, yes?
        now, karik...
            
    sourceless
        miltza eyes gakvu briefly, but then returns to a murmur with karik
        she is likely briefing them on what to do when itzil awakens again...
        all fear that gripped her is drowned out by her focus on this task
        the ever-caring nature of the tir shines through all else
            EXEC::vnp({miltza: "hide"})

____SHOWIF::'PAGE!!bozcav'
    sourceless
        bozko remains by the door, keeping watch,
            EXEC::vnp({bozko: "show far"})
        but i feel it is more to distance himself from this scene velzie has assigned us
        in our short time throughout this disaster, we have seen much, but...
        what has he seen to make him this way?
    
    cavik
        akizet?
            EXEC::vnp({cavik: "show"})
    
    sourceless
        cavik lingers nearby,
        examining golem parts that remained intact
    
    cavik
        i was going to tear into these for their components
            EXEC::vnp({bozko: "hide"})
        for my explosives, you see
        but... there are quite a few still usable parts
        in fact, anything that was not in use is nearly in perfect condition
    
    sourceless
        he aggressively occupies his mind with his work
        avoiding even looking in the direction of the bodies, as if they are not there
    
    akizet
        interesting
        though, cavik, grant me a θblink and leave them
        perhaps we could use them in some way...
        but we should resolve the corroyi issue first

    cavik
        ok!
____END
    
    RESPONSES::akizet
        to gakvu and tozik<+>CHANGE::m_fix
            SHOWIF::"golem_decompression"
            EXEC::vn.done()
            HIDEREAD::

        to gakvu and tozik<+>CHANGE::m_metatrauma
            SHOWIF::["golem_decompression", false]
            EXEC::vn.done()
            HIDEREAD::
    
SKIP::env.embassy.skips.m_bossclear()
`)

//trauma interlude
env.dialogues["m_metatrauma"] = generateDialogueObject(`
start
    sys
        ATTENTION::'external command';'memory stream halted'
            EXEC::vnp({hideStage: true});change("golem_decompression", true);changeBgm(env.embassy.music_golems)

    self
        what
            EXEC::ratween(env.bgm, 0.75)

    moth
        hey buddy
        you good?
    
    sys
        EXECUTING::'direct impulse';'resume memory stream'
            EXEC::ratween(env.bgm, 1)
    
    moth
        dude, come on

    sys
        ATTENTION::'external command';'memory stream halted'
            EXEC::ratween(env.bgm, 0.75)
    
    moth
        listen, i know you just want to get this done,
        but you just watched someone die and someone else go into some kind of shock
        even if it's in a framing device
        this shit with the "husks" was bad enough, but
        all i'm saying is, i'm getting this through a shitty feed and i feel sick
        you're the one experiencing it directly
        do you want to take a break? just a quick one?

    RESPONSES::self
        ok<+>ok
        no<+>no
            FAKEEND::(end chat)

no
    self
        no

    sourceless
        there is a silent weight in the room outside your connection.
        ...
        a plastic bag rustles. glass clinks, and there is a clatter of thin metal on moth's desk.
    
    moth
        all right, well,
        i'll be right here if you really need me, but i need to distract myself for a minute
        give me like, i don't know, 5 minutes
            EXEC::body.classList.add('nomoth');setTimeout(()=>body.classList.remove('nomoth'), 420000)
        you just... keep doing your thing, the log is running
    
    sys
        EXECUTING::'direct impulse';'resume memory stream'
            EXEC::ratween(env.bgm, 1)
    
    RESPONSES::self
        continue<+>CHANGE::m_fix
            EXEC::vn.done();changeBgm(env.embassy.music_golems_cleared)
            FAKEEND::(resume memory)
            HIDEREAD::

ok
    self
        ok
    
    moth
        thanks

    sourceless
        your mind's eye is fixed upon the memory.
        a plastic bag rustles. glass clinks, and there is a clatter of thin metal on moth's desk.
        something cold and glassy is pushed into your hand.

    moth
        you're still in there, huh?
        well, in case you can't see, it's bottled coffee from the place upstairs
        by the way, you're clear to lift protection for a minute
    
    self
        thanks
    
    sourceless
        with an impulse, the faceplate of your protective gear releases.
        blindly, you remove the coffee's cap and take a sip.
____SHOWIF::[["netstat|<", 0]]
        it's fine.
____SHOWIF::[["netstat|>=", 0]]
        it's fine. slightly too sweet.
____END


    moth
        you ever been there?
        there's this old guy who's been working as the cashier since before i was here
        i've talked to him a few times, he has it rough dude
        he's kinda stuck here cause he can't see very well anymore
        i mean, he didn't tell me that directly, but we were talking this one time, and his eyes came up
        he was jokin around about how this is his "last job"...
        still, it occurred to me,
        what if he was around back when akizet was making visits?
        i wonder if we could spot him in her memories at some point
        hey--maybe i could even ask him if he ever knew a gordon, too!
    
    sourceless
        a moment passes. you drink.

    moth
        oh yeah, and in case you're worried about removing your protective gear,
    
    self
        it's fine

    moth
        right, you already know this stuff
        well, the pillar is probably new to you at least
        i did some analysis on it, it's not giving off anything
        but, you know, don't get used to having that off
        it could explode or something, i've seen that with floating ones before
        this is probably a safety violation already
        but that's ok, i'll just cross it off my report lol
        that's one of the perks of being stuck in the basement
        it's one of the only places in the world that doesn't have some <span definition="INTERNAL CONTEXT::'dated derogatory term';'now only slightly offensive'">mindpsycho</span> staring at you through the walls
    
    sourceless
        ...
    
    moth
        was that a smile? did i get a smile there?
        well, anyway
        thanks for sticking with me on this job
        i know this isn't easy
        but, it's important
        like... way more important than i ever thought it'd be
        we know the FBX knows about what happened, but they probably never got the real details
        not like this. even if they know what really caused the collapse,
        i bet you they've never, ever seen what happened inside
        all these qou were just murdered on earth and we could have never known
        we're gonna make sure they didn't fight for their lives for nothing
    
    self
        maybe we can help
    
    moth
        yeah, you know,
        if we can get the network connection working, maybe we actually could
        you know, at least let their network know what happened to all these obesk
        i dunno, we'll see
        there's a lot of red tape when it comes to talking to obesk
        
    sourceless
        an emptier-sounding glass is set on the concrete floor.
    
    moth
        all right, well, i'm ready to get back to it if you are
        thanks for taking a minute dude
    
    sys
        EXECUTING::'direct impulse';'resume memory stream'
            EXEC::ratween(env.bgm, 1)
    
    RESPONSES::self
        back to it<+>CHANGE::m_fix
            EXEC::vn.done();changeBgm(env.embassy.music_golems_cleared)
            FAKEEND::(resume memory)
            HIDEREAD::
`)

env.dialogues["m_fix"] = generateDialogueObject(`
start
    sourceless
        before the override stand tozik and gakvu
            EXEC::specialCam('g_m_panel');vnp({gakvu: "show downleft", tozik: "show downright"})
        tozik is cutting the shell of the override, while gakvu waits
    
    akizet
        what is wrong? does it work?
    
    tozik
        yes, it is just--
    
    sourceless
        the override's protective shell rotates strangely, disturbing his work
    
    tozik
        ¢]ë’
        the cover is behaving erratically
        i will have it open momentarily

    sourceless
        he returns to his careful dissection
        gakvu is staring away, towards the mindcores and miltza
        before she looks at me, i see her gaze flick over the dead husks nearby
        not a single receptor in the room is without a sorrowful tilt
    
    gakvu
        hey akizet
            EXEC::vnp({gakvu: "show focus", tozik: "show downright", hideStage: true})
    
    sourceless
        in her voice is a familiar numbness
        we have been forced to stand against these once-friends, and...
        no--it is wrong to think of it that way
        it is no different from an infection
        our friends left these bodies long before we could help
        i would ask gakvu if she is well, but...
    
    akizet
        are you ready?
    
    sourceless
        she briefly watches tozik's cutting, nearly complete
    
    gakvu
        well, ready enough
        this will be new to me, but i know the general principles
        if this does not work, then...
    
    akizet
        then we will find another way
    
    sourceless
        gakvu's receptors twist with the slightest cynical kindness
    
    gakvu
        sure

    tozik
        here
            EXEC::vnp({gakvu: "show downleft", tozik: "show downright", hideStage: false, bg: false})

    sourceless
        tozik pries the half-dome of the override open
        it tears away like flesh, exposing the connective cyst within
        he removes it, the cyst itself veined to something in the wall
    
    tozik
        may velzie be laughing
    
    sourceless
        gakvu takes the connector, settling it on a receptor
            EXEC::vnp({gakvu: "show", tozik: "hide", hideStage: true})
        her eyes defocus, and the tension in her receptors eases away
    
    gakvu
        oh... yes, this will work
        yes, it will! hehehe
    
    sourceless
        some brightness returns with her chuckle, still focusing inwards
        we hear a rushing outside the walls
        indeed, even the walls themselves seem to shift, no longer bowed inwards slightly
        i had thought that was just part of the design...
    
    gakvu
        this is limited to the local area, normally, but...
        velzie smiles, my friends - it is largely unsecured
        the groundsmind never imagined someone like me would use this, hehehe
    
    akizet
        is it safe enough to create paths for us in the area?
        or--maybe even crush the foes that would await us?
    
    gakvu
        no... this θsegment is too fixed in its structure
        if i did that, it would cause huge problems
        i only know low-level groundsmindry, not spire management
        this should be enough for now, though
        i also fixed the door in the lobby, but i kept it locked
        whatever caused the damage inside is not moving anymore, so...
        it is unlikely it will try to pry its way out
    
    akizet
        amazing
        thank you, gakvu
        if not for your help...
    
    sourceless
        i need not say more, gakvu waving away the notion with her receptors
        my attention shifts to miltza and the others
        karik observes itzil, and miltza us
        there is some approval in her gaze, less suspicion than before
        even in this darkness, there is light between the veilk
    
    akizet
        on with the rest of our plan, then
        we need weapons, and something to deal with the large golem

____SHOWIF::'PAGE!!bozcav'
    akizet
        and, on this topic, cavik noted the golem parts nearby
        they are good, yes?
    
    cavik
        yes!! intact, mostly coherent
            EXEC::vnp({gakvu: "hide", cavik: "show"})
        and some of these have, ah...
        <em>very</em> weaponizable construction tools!
        not to mention their sheer size would make for effective bludgeoning...
        what if we swapped our own limbs for them?

    sourceless
        in the corner of my vision, near the tunnel, bozko shifts
        did he grip his head? when i turn to look fully, he has ceased
        tozik draws my attention back to the parts
    
    tozik
        these are too large for most of us
            EXEC::vnp({tozik: "show"})
        even with disconnected arms like yours or mine,
        the dull nodes within standard qou bodies cannot support these
        what if we built a golem of our own, instead?

    cavik
        oh! yes! 
        but--what if the signal comes again?
    
    tozik
        karik is a kiv in need of a body
        we could set them into it to prevent our attacker from seizing it
        itzil as well, though...
    
    sourceless
        tozik glances over at the opposite corner, 
        where miltza and karik still murmur
    
    tozik
        merely as a passenger for now

    akizet
        having them both pilot it could allow them both a connection to a single timestopper, too
        and it may prevent itzil from doing anything... drastic... if they awaken

____SHOWIF::['PAGE!!bozcav', false]
    tozik
        you know, there are a lot of golem components here...
            EXEC::vnp({tozik: "show focus", gakvu: "downleft"})
        too large for us to use outright, but...
    
    sourceless
        he gestures towards the inert components scattered on the ground
    
    tozik
        what if we built a golem of our own?
        to prevent the same madness, karik could pilot it
        they are a kiv, right?
    
    gakvu
        what about itzil?
            EXEC::vnp({tozik: "defocus", gakvu: "downleft"})
    
    tozik
        ...
    
    akizet
        i do not think itzil will be in any state... to...
        no, you are right, actually
        having them both pilot it could allow them both a connection to a single timestopper, too
        and it may prevent itzil from doing anything... drastic...
____END

    akizet
        what do we need, tozik?
    
    tozik
        we have the individual parts required - hulls, arms...
            EXEC::vnp({gakvu: "hide", cavik: "hide"})
        we should simply be able to use the greater vat chamber nearby
        it has been a while, but i can operate it
    
    sourceless
        at last, gakvu removes the connector, placing it back in its socket
        we should move - karik can tend to itzil

    sys
        NOTICE::'inventory addition';'knowledge of golem parts';'key item for memory stream continuation'
            EXEC::addItem(env.ITEM_LIST["golem_parts"], 1)
        NOTICE::'take to area';'greater vats';'to proceed'

____SHOWONCE
    moth
        that's kinda weird
        it's adding "knowledge" to the inventory?
        that could just mean it's used somewhere, but...
        sorry--i'll quiet down over here
____END
        
    RESPONSES::akizet
        continue<+>END
            EXEC::change("PAGE!!goverride", true);vn.done();specialCam(false);pauseSwapCam(false)

SKIP::env.embassy.skips.m_fix()
`)

/********************* SFER SUPPLY */
/********************* SFER SUPPLY */
/********************* SFER SUPPLY */
//once the sfer vats room is clear
env.dialogues["s_vats"] = generateDialogueObject(`
start
    sourceless
        the singular husk that lingered, wounded even deeper,
        flees yet again through the only remaining chamber
        given the conspicuous absence of its kin, they surely all linger beyond it
        but for now, this chamber is clear
            EXEC::change("PAGE!!smidclear", true);pauseSwapCam(true)
        i call back to the team to enter, and they file in to assess the room
        but i ensure they largely stay close to the lobby
        and those hardy golems... i would hardly want them to rise again, if that is somehow possible
        i tear through what remains of their flesh to be sure nothing remains alive
        in the process, i find one of their processing cysts to be intact--this may be useful!

    sys
        ITEM_RECEIVED::"<span definition="INHERITED CONTEXT::${env.ITEM_LIST['eq_shell'].description}">kelniki cyst</span>"
            EXEC::env.embassy.conditionalItem('eq_shell', 1, 'vats')
            AUTOADVANCE::
    
    definitionget
        TEXEC::definitionRender({getAttribute: () => "STATUS++item_shell"}, {returnHTML: true})

    sourceless
        tozik approaches the vats, prodding at their sides and testing their connections
            EXEC::vnp({tozik:"show downright", bg: false })
    
    tozik
        the sfer vats are functional
        that is strange...
        the golems have fallen, the bodies of our kin are risen without clear connection
            EXEC::vnp({tozik:"show", bg: true })
        yet the vats, the doors... these mindless, stationary technical things are intact
        is mobility the common factor? perhaps specific components?
    
    akizet
        what about movefriend?
    
    tozik
        ah...
    
    gakvu
        no, that was different,
            EXEC::vnp({gakvu:"showleft far"})
        it was the groundsmind noticing our interference
    
____SHOWIF::[["PAGE!!goverride", true], ["PAGE!!bozcav", true]]
    cavik
        the groundsmind?
            EXEC::vnp({cavik:"showright far"})
        you have spoken to them??
    
    akizet
        it was hardly talking
        just more of the same signal
        sickness, feverish nonsense
____END

    sourceless
        suddenly, gakvu doubles over in pain
            EXEC::vnp({cavik:"hide", tozik: "hide", gakvu: "show"})
        she clutches her head in her claws
    
    tozik
        gakvu--?

    gakvu
        what is that?
        that noise...
        do you hear that?
        ugh
        velzie above is screaming into my mindcore
    
    sourceless
        gakvu looks around, then ahead at the room still held by the infested
            EXEC::specialCam('g_s_bossdoor');pauseSwapCam(true);vnp({bg: false, gakvu: "downleft"})
        i do not hear anything...
        gakvu notices our confusion, turning her focus inwards
    
    gakvu
        i must be feeling it through my groundsmindry
        it is like... like a thrashing, coiling, moving all around us
    
    miltza
        ah!! i just turned my communicator on for an instant!
            EXEC::vnp({miltza: "show far", bg: true})
        no, i hear it too...
        is that the same signal as before? i cannot tell for certain
        ...do not enable yours, my friends
        it hurts...
    
    sourceless
        i need not test their assertions
        miltza clutches her face, enduring whatever it is she briefly exposed herself to
        and soon lowers her claws, a realization forming in her open receptors
    
    miltza
        no... wait... that is the noise!!
            EXEC::vnp({miltza: "show"})
        i heard that earlier, over and over, before you found me
        that is what has been disrupting all of our communications!
        or, at least, a part of it...
        maybe we can destroy what lay within to restore clarity?
    
____SHOWIF::["PAGE!!goverride", false]
    itzil
        umm...
            EXEC::vnp({miltza: "show far", gakvu: "show far", itzil:"show far"})
        that is the storage room
        it only has a delivery golem for directing sfer, why would it...
        ah!! no, that is what geli was talking about!
        it uses dull microconnectors to send sfer around the spire instantaneously!
        maybe it is using that to broadcast that noise?
        we should stop it, definitely!!
        maybe i could even contact my kivii...
____END

    akizet
        well worth the try
            EXEC::vn.done()

____SHOWIF::[['PAGE!!mmid'],['PAGE!!smidclear'],['PAGE!!smcut', false]]
    sourceless
        suddenly, one of the side doors unlocks with a strange little musical chime
            EXEC::play('obeskToggle', 0.75);specialCam('g_s_shortcut')
        a familiar voice quickly follows...
    
    geli
        hello!! 
        i have detected all unauthorized entities,
        in BOTH manufacturing and sfer supply,
        have been removed from the premises!
        how did you manage that? ahaha!!
        i hope they did not argue with you too much!
        anyway i am opening the connective tunnel between these areas now!
        thank you!
    
    sourceless
        a small chime plays as it deactivates
            EXEC::setTimeout(()=>step(), 100);change('PAGE!!smcut', true);vn.done();
    
    akizet
        ah... thank you, geli
            EXEC::step()
____END

    RESPONSES::akizet
        continue<+>END
            EXEC::specialCam(false);pauseSwapCam(false)

SKIP::env.embassy.skips.s_vats()
`)


env.dialogues["s_boss"] = generateDialogueObject(`
start
    sourceless
        the room twists maddeningly around the golem at its center
            EXEC::toggleBgm(env.embassy.music_unsafe_golems);ratween(env.bgm, 0.75);pauseSwapCam(true);setCam({x: 4, y: 4, rotation: -180});change("PAGE!!g_s_storage", "dangerous")
        whatever sfer storage it may have managed before is obscured by the light
            EXEC::content.classList.add("slowcam")
        or--is it merely all gone? did it send it all somewhere?
        it hardly matters: the husks, all four, stand between us and it
            EXEC::setCam({x: 4, y: 1, rotation: -180})
        they were not simply fleeing us, they were coming <em>here</em>...
        all bear grievous wounds, and are on their last legs
        but behind them, dull microtunnels flash in the air around the golem, 
        sometimes even cleaving through itself - this is remarkably dangerous
        it stands to reason that we could run back to avoid potential losses,
        especially given that the four seem to be acting in defense at this point
        but whatever is being done here...
        whether it be propagating this wretched signal or some other matter,
        it calls for destruction--and to free these husks from terrible life
        the risk seems well worth it
    
    RESPONSES::akizet
        prepare to strike<+>END
            EXEC::setCam();content.classList.remove("slowcam");
            FAKEEND::(prepare)

SKIP::setCam();content.classList.remove("slowcam")
`)

env.dialogues["s_bossclear"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";"toggle within system menu if desired"
____END

    sourceless
        the last of the husks fall, finally
        limbs and organs and sludge strewn around the chamber
        and with them out of the way, we easily execute the nigh unresponsive dullzika
            EXEC::env.stages['g_s_storage'].removeBoss(false)
        collapsing to the ground with enough force to sludge the false stone decorating the floor
        with its death, the microtunnels automatically seal,
        that terrible noise is distant once more, the dull lights fading
            EXEC::env.stages['g_s_storage'].normalize()
        we allow the peaceful silence to persist for a moment...
            EXEC::toggleBgm(env.embassy.music_golems_cleared);
        ...
        in hindsight, their babble was incomprehensible,
        as if expelled in response to our strikes, not true communication
        yet i could clearly discern tactics and intent in their movements
        they no longer had an obesk mind, certainly, but...
        it inspires a long forgotten fear:
        being too hasty to execute the infested, in case they could yet be recovered
        i recoil from my thoughts with a tight coil in my receptors,
        pulling my frozen gaze from the corpses to call back,

    akizet
        it is clear

    sourceless
        the rest of the team enters the half-melted chamber,
            EXEC::env.embassy.music_unsafe_golems.rate(1)
        witnessing the sludged remains of our foes
        for a θblink, none think to speak--surely of the same mind
        something about miltza briefly seizes my attention, though
        her receptors twist and fidget in unmistakable anxiety, more obvious than the others
        it is uncharacteristic of mourning, more than mortal fear...
        these dead husks resonate with something personal

____SHOWIF::["PAGE!!goverride", false]
    sourceless
        itzil trots in, watching on with clenched pseudoreceptors
        sluggishly, they crawl and perch upon a dense sfer block
        miltza comes to their side, observing carefully, 
        snapped out of whatever had occupied her mind

    itzil
        are... are they all...?

    miltza
        itzil...
        it may be best if you remain in the other chamber for now

    itzil
        i just...
        i wanted to see them, before we...
        wai--wait!!
        what are you doing?!

    sourceless
        their objection draws all of our gazes to tozik,
        who has just placed his corruskivi against the scattered flesh of the aggressive one--kiku, i believe
        he glances back between us, a confused tilt slight in his receptors
        
    tozik
        we must know the nature of this infestation

    sourceless
        none can object to his investigation, not even itzil
        it may seem to be in poor taste, but we have no time to spare on ethics

____SHOWIF::["PAGE!!goverride", true]
    sourceless
        something to question later, perhaps
        i continue my assessment of the team,
        my gaze landing firmly upon the comatose itzil
        perhaps it is for the best that they have withdrawn
        to see all they knew torn away and twisted like this...
        tozik pushes through to crouch and draw his corruskivi,
        and without delay, cuts into the scattered flesh of the aggressive one--kiku, i believe
____END

    sourceless
        almost frantically, he claws through the sludge,
        looking upon their organs with a strange degree of unfamiliarity
        my attention then is drawn to gakvu, who stands taller,
        still unnerved, but no longer with constant pain in the coil of her receptors
    
    akizet
        gakvu, is it quiet now?
            EXEC::vnp({gakvu: "show far", bg: true})
    
    gakvu
        ah?
        oh, yes...
        yes, it is much better    

____SHOWIF::["PAGE!!goverride", true]
    sourceless
        miltza draws away from her crouch near itzil,
        having produced and donned a communications cyst to test
____END

    miltza
        it... it works!
            EXEC::vnp({miltza: "showleft far"})
        the connection, at least... my cyst is still fairly damaged
        the noise, whatever this golem was amplifying, it is still there, i think...
        yes - the disruption is still present! but i am getting some clear connections
    
    akizet
        i see
    
    sourceless
        funfriend - is it suitable enough to make some calls?
            EXEC::vnp({miltza: "hide", gakvu: "hide", hideStage: true})
        are you picking anything up?
    
    funfriend
        hello akizet!! yes!
        it is so much better now!
        at least in terms of functionality
        what i am hearing on open communication is still very bad
        however we can actually use it now!
    
    sourceless
        very good    
        i wave everyone unoccupied closer
    
    akizet
        who among us has a working communicator, still?
        gakvu, tozik, i know yours were broken...
        mine is working, but it is part of my personal device
    
    sourceless
        which i certainly should not lend to anyone... not with my knowledge
        i make that clear enough in my tone, despite the receptors it earns me

____SHOWIF::'PAGE!!bozcav'
    akizet
        cavik, bozko?

    cavik
        mine is internal and also works!
        like yours, akizet
        bozko--you have an internal one too, right?
    
    bozko
        yes, it works still
    
    sourceless
        the ekivik aspiration for minimalism seems to have turned against them in this time
        but if only disconnected ones were sludged, then why did miltza's work?
        did she simply have it on a receptor when this all began?
____END
    
    akizet
        miltza, is yours intact enough to share?

    miltza
        hmm...
            EXEC::vnp({miltza: "show"})
        oh, yes!
        it is still usable, it will just need a little more force
        which of you would like to use it first?

____SHOWIF::["PAGE!!goverride", false]
    karik
        ah! itzil--
            EXEC::vnp({miltza: "show far", karik: "showleft far", itzil: "showright far"})
        perhaps you should? we may locate your kivii faster!

    sourceless
        the notion breaks itzil from their remorseful stare

    itzil
        oh...!
        oh, yes, yes, please!
        she has to be here...
        then, ah...
        gakvu, tozik, did you want to...?    
____END

    sourceless
        tozik does not draw away from his work at the offer
        his movements remains confused, frustrated, but unbroken in focus
    
    gakvu
        i am fine, it can wait until we stop this
            EXEC::vnp({miltza: "hide", karik: "hide", itzil: "hide", gakvu: "show"})
    
    sourceless
        gakvu is visibly perturbed, receptors twisted with confliction
        her reason is sound, but... i know her
        i think she does not trust miltza enough, maybe?
        or... is it who she wants to call that is the issue?
        she notices my staring, looking away and loosening her receptors again
        really, i thought i knew her well, but so much is coming to light...
        it is like i only walked upon her surface
            EXEC::vnp({gakvu: "hide"})
        with a turn away, miltza quietly grips the communicator in her receptor, beginning a call of her own
            SHOWIF::["PAGE!!goverride", true]
        miltza helps settle the communicator into itzil's pseudoreceptors
            SHOWIF::["PAGE!!goverride", false]
        i can think of who i might call for, too...
    
    akizet
        ok
        let us see who we can contact
        but we must not delay our plan
        act with haste
        
    sys
        EXECUTING::"structure direction";"call"::

    plainsys
        entity; AKIZET; additional ACT enabled; call
        utilize perspective swap to examine
    
    sys
        END::

    sourceless
        tozik earns a brief glance--he has halted, seemingly resigned from his work
        whatever he has learned, it is not good...
        i ought to speak with him about it soon

    RESPONSES::akizet
        make a call now<+>CHANGE::s_calls
            EXEC::vn.done();specialCam(false);pauseSwapCam(false)
            HIDEREAD::
        later<+>END
            EXEC::vn.done();specialCam(false);pauseSwapCam(false)

SKIP::env.embassy.skips.s_bossclear()
`)

//'repeatable' call dialogue
//gordon's should only happen once, bozko/cavik should change based on having done it before
env.dialogues["s_callspeople"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        gordon<+>gordon
            SHOWIF::["PAGE!!gordcall", false]
        cavik<+>cavik
            EXEC::change("PAGE!!callbc", true)
            SHOWIF::[["PAGE!!bozcav", false], ["PAGE!!callbc", false]]
        bozko<+>bozko
            EXEC::change("PAGE!!callbc", true)
            SHOWIF::[["PAGE!!bozcav", false], ["PAGE!!callbc", false]]
        kazki<+>kazki
        vekoa<+>vekoa
        family and collective<+>collective
        storm<+>storm
            SHOWIF::"citystreet__director-meeting"
        nevermind<+>END
            EXEC::vnp({hideStage: false});vn.done()
`)
env.dialogues["s_calls"] = generateDialogueObject(`
loop
    RESPOBJ::s_callspeople

start
    sourceless
        funfriend - activate communications
            EXEC::vnp({hideStage: true})
    
    funfriend
        ok!
        standing by!
    
    RESPOBJ::s_callspeople

gordon
    sourceless
        gordon...
        if the cousins have any involvement in this, he will know
        perhaps they can help us evacuate!
        funfriend - contact him!
        he should still have the dull communicator i gave him
        assuming it did not try to kill him...
    
    funfriend
        ok!!
        ...
        connection established!
    
    sourceless
        gordon's voice is distant
        he is strained - it sounds like he is running?
        i hear something fall and clatter on the ground
    
    gordon
        Damn it! Get back here!
        Hello? Akizet?
    
    sourceless
        gordon! are you all right??
    
    gordon
        Hold on, when you started calling, this thing...
    
    sourceless
        there is a loud scuffling against the auditory membrane
        
    gordon
        Ow! Little bastard...
        It crawled out of my pocket and ran away, and now it's stabbing me!

    sourceless
        only when i called him?
        some portion of it has surely become aberrant...
    
    akizet
        grasp it by the sides and crush the legs inwards!
    
    sourceless
        again comes the scuffle, and then a series of cracks
        the connection wavers slightly - gordon sighs

    gordon
        That's better.
        Akizet, I just got off a half dozen other calls.
        They sent a probe.

____SHOWIF::["citystreet__director-meeting", false]
        They did it. Those fuckers--sorry--they completely went over our heads.
        I know, I promised you--I even had assurances from <em>everyone</em> above me.

____SHOWIF::["citystreet__director-meeting", true]
        I know, I promised you--we had assurances from <em>everyone</em> to hold until you were ready.
        There were some new officers on the project a few days ago, asking questions, I--
        I don't know, the Director was tight-lipped about it. Some kind of oversight.
        But I think those fuckers--sorry--they completely went over our heads.
____END
    
    sourceless
        what is he implying?
        did he...
        œ›¤€ù
        Uþfâ!!
        i nearly double over out of anxiety, my receptors crushing into themselves
    
    gordon
____SHOWIF::["citystreet__director-meeting", false]
        Even worse is that they waited to tell me. I don't know how long it's been.
        
____SHOWIF::["citystreet__director-meeting", true]
        I don't know how long this has been planned. This doesn't just happen out of nowhere.
        Even worse is that I'm only getting scraps of info. No idea when it was sent out, or what they did.
____END
        But the reports I've been getting, I-I can hardly make sense of it...
        Polygonation spires collapsing, your ships spiralling out of control, it's--

    akizet
        gordon--!!
    
    sourceless
        no, no, no
        this massacre cannot solely fall upon us...
        upon <em>me</em>
        his voice changes, realizing from my tone that it is even worse than he can know
        growing quieter, more fearful, more like mine

    gordon
        ...
        Akizet, what is going on? What is all this?

    akizet
        you promised! you said...
        youîŸ~F£ßpÛ¿)Fû§f>ñ6

    sourceless
        i do not breathe, yet i am strangled
        for this instant, it is like i am screaming into my own head
        no coherent words reach gordon

    gordon
        Shit, I know. I know, I know, I know.
        But it doesn't work that way for us, Akizet.
____SHOWIF::["citystreet__director-meeting", true]
        We can't just hide things like this. I know you were assured we would keep it quiet...
        But there are certain people we have to answer to, and I didn't want--
____SHOWIF::["citystreet__director-meeting", false]
        We can't just hide things like this. I know I told you I would keep it quiet...
        But there were certain people I had to tell, and I didn't want--
____END
        ...

    sourceless
        the signal degrades further, and i hear another crack as he struggles with the communicator
        he speaks, but his words are lost, a strange and familiar murmur overpowering them
        ...if this is not the groundsmind's work...
        did it come from the source? did the probe do something?
        before i can convey my thoughts, his voice comes back into focus
    
    gordon
____SHOWIF::["citystreet__director-meeting", true]
        Look, the promise was a part of the project.
        I trusted everyone we brought in, too.
        I'm working on getting the details here. The whole system's fried.
        We still have the storm, but I haven't been able to get straight answers from it, or...
        Or the Director. Or anybody.
        There's a whole chunk of the bureau that's not responding for one reason or another.
        But I think there was a report on what we were doing passed up the chain, Akizet.
        Through the Director, all the way up to the top.
        And... Someone must have gotten scared. Maybe that's all it took.
        Can't get any info on what happened down there. I don't even know if they know for sure.

____SHOWIF::["citystreet__director-meeting", false]
        Look, they all promised me the same thing. I trusted them, too.
        But someone took what we found and ran it even higher up.
        We still have the Storm, but once they had the coordinates...
        Someone got scared. That's all it took.
        They're not telling me what happened down there. I don't even know if they know for sure.
____END

        But whatever it was, it's bad.
        Akizet--<em>what</em> is happening? Where are you?
        Do you need help?

    sourceless
        i pace urgently, no longer caring to be mindful of how i appear
        the others are equally as distraught anyway
        my thoughts flood the communicator, overlapping with one another in a wave
    
    akizet
        a signal overcame everything, it knocked me and my team unconscious
        all of our constructs now turn upon us, killing us--
        gordon... you must tell them, get away from the embassy!
        you must tell them to escape - everything is falling apart!!
        and your probe... if anyone is still near,
        they must escape <em>immediately!</em>
        and please know, if anything is attacking your people, it is not us!
        it is not us!!!
    
    sourceless
        ...
        ...
    
    akizet
        gordon??
    
    funfriend
        akizet...
        i cannot discern anything from gordon's communicator anymore
        there is only that noise
    
    sourceless
        °H]•
        my receptors tremble with guilt
        is this all happening because of me...?
        no, no--the conflict is at the core of this, i know it
        and--gordon!! he is not without blame!!
____SHOWIF::["citystreet__director-meeting", true]
        my one point of entry, the hinge upon this entire operation
____END
        i trusted him... he said he would listen
____SHOWIF::["citystreet__director-meeting", true]
        that certain boundaries would be assured, that these secrets would...
____END
        ...
        i cannot bear this
        but if i crumble now, it is like succumbing to fear paralysis on the surface
        curling up and awaiting certain death, abandoning those i could save...
        no - fault cannot be decided now
        the only option we have is to continue fighting and save what remains
        ...
        funfriend
        i need you to compartmentalize this conversation
    
    funfriend
        akizet...
        you made me promise not to let you self-modify
        ...are you sure?
    
    sourceless
        i am frozen with indecision
        the others, thankfully, are distracted from me at the moment...
        no... no, i cannot even consider this
        you are right, funfriend
        i should have listened to you to begin with
    
    funfriend
        it is ok akizet
        we will survive
        look at how well you have led everyone!
        you can do this!!
            EXEC::change("PAGE!!gordcall", true)
    
    RESPONSES::akizet
        we will see<+>loop
            FAKEEND::(back)

cavik
    sourceless
        cavik...
        we need to know if he is still in the spire at all
    
    funfriend
        ok!!
        ...
        connection established!

    akizet
        cavik!
    
    cavik
        akizet...?
        you got through?
        it is so clear now!
    
    sourceless
        i nearly fall over from the relief
        the thought of cavik dead from this...
    
    cavik
        akizet, where are you? we can come get you!
    
    akizet
        what? what do you mean?
        we? how many do you have?
        you have a way around too?
    
    cavik
        what - do you?
        um, we have been using the archival tunnels in the spine
        most are still connected, despite the veins collapsing!
        and bozko has been taking care of all the golems!

    sourceless
        with what...?
        we have the only timestopper in the embassy
    
    cavik
        he is ok... physically... it is impressive how he has dealt with them
        honestly, he is not really doing so well otherwise
        it has been brutal
        but he is leading us down regardless
        ...there used to be more of us, 
        but now it is just me and bozko
    
    akizet
        down? what? why?
        hold on - cavik, i have gakvu, tozik, and some others
        we are in golem maintenance, down from our research θsegment
        we intend to stop the groundsmind
    
    cavik
        us too!
        listen - we will meet you soon!
        we are nearly down to maintenance ourselves
        i will tell bozko!
        but i need to go - there are more coming...
        be careful!
        
    akizet
        you as well, my friend
    
    sourceless
        if they are fighting, bozko will be too busy to call...
        we will simply have to watch for them
            EXEC::change("PAGE!!callbc", true)
    
    RESPONSES::akizet
        stay safe, my friends<+>loop
            FAKEEND::(back)

bozko
    sourceless
        bozko...
        we need to know if he is still in the spire at all
    
    funfriend
        ok!!
        ...
        connection established!

    akizet
        bozko!
    
    sourceless
        an immense weight of dread floods through the connection
        not from me calling - but persistently, like from a responsibility
        bozko... what has he seen...?
    
    bozko
        akizet
        where are you?
        are you hurt?
    
    akizet
        bozko, i have gakvu, tozik, and some others from our floor
        we are all in golem maintenance, heading down to stop the groundsmind
        what about you - are you ok?
        have you seen cavik?
    
    bozko
        yes
        cavik is with me
        there were some others, but...
        ...
    
    sourceless
        no concept needs to be formed
    
    bozko
        ...we are heading down for the exact same reason
        the archival tunnels of the spine are still mostly intact
        we occasionally need to detonate some to open blocked paths,
        but they serve well enough in our descent
    
    akizet
        what!!
        what about the golems?
        it is only with the help of the timestopper we have been able to...
    
    bozko
        they are not a problem
    
    sourceless
        something about him is different - he is even shorter in tone
        i cannot measure what trauma he carries, but it is beyond that
        he has altered himself, somehow
    
    bozko
        we are nearly to golem maintenance ourselves
        i will let cavik know you called
        he will be relieved to know you are all right
        as am i...
        
    akizet
        bozko, did you... did you do anything to yourself?
    
    bozko
        akizet... i...
        no--i will explain when we are there
        i must focus
        more of these surface-sent golems are coming
    
    akizet
        please be careful!!
    
    sourceless
        the connection ceases
        if they are fighting, cavik will be too busy to call...
        we will simply have to watch for them
            EXEC::change("PAGE!!callbc", true)
    
    RESPONSES::akizet
        stay safe, my friends<+>loop
            FAKEEND::(back)

kazki
    sourceless
        kazki...
        i think she was out of the spire this θgaze
        or, 'day' would be more accurate, given her schedule...
    
    funfriend
        ok!!
        ...
        ...
        akizet, when i try to call her...
        it is like that noise you stopped - it is overpowering!!
        i do not know why, but something is stopping me from reaching her
    
    sourceless
        what does that mean?
        is she in the embassy?
    
    funfriend
        i do not know akizet!!
        it does not sound like anything i can hear in the embassy!
    
    sourceless
        peculiar
        velzie, guide her to us again...
    
    RESPONSES::akizet
        ...<+>loop
            FAKEEND::(back)

vekoa
    sourceless
        vekoa!
        maybe we can try and get an explanation?
    
    funfriend
        ok!!
        ...
        ...
        ...
        no...
        nothing
        i cannot even locate her communications signature
        her device must be destroyed!
    
    sourceless
        *´«:
        i hope she is not behind this...
    
    RESPONSES::akizet
        a vel's luck<+>loop
            FAKEEND::(back)

collective
    sourceless
        can you call my sister rouzesche?
        is the contrivance even intact, still?
    
    funfriend
        let me try!!
        ...
        ...
        we are not cut off, but... the collective... 
        it is impossible to locate anything in it right now!!
    
    sourceless
        could the signal have gone as far as obeski...?
    
    funfriend
        it is technically a dull signal like any other!!
        however!
        given the strength that it is hitting you and everyone else with
        i feel this is a targeted attack!
        i doubt obeski is affected,
        though they should certainly be able to hear it!
    
    sourceless
        that is just hopeful thinking, funfriend
        but i suppose that is your purpose
        i will accept this for now
    
    RESPONSES::akizet
        ...<+>loop
            FAKEEND::(back)

storm
    sourceless
        perhaps the storm implemented that communications device in time
        funfriend, can you--ah... 
        i suppose we have no method of knowing its collective signature even if it did
    
    funfriend
        that is correct akizet!!
    
    sourceless
        it was foolish of me to wait so long...
        but limiting its reach was our only way to be certain of its secrecy
    
    funfriend
        given its nature! i think it should be able to contact <em>you</em>!
        we just have to wait!
        
    RESPONSES::akizet
        let us hope<+>loop
            FAKEEND::(back)
        
SKIP::
`)

/********************* OPERATIONS */
/********************* OPERATIONS */
/********************* OPERATIONS */
env.dialogues["ops_friends"] = generateDialogueObject(`
start
    sourceless
        movement and sounds of fleshy dissection greet us as soon as we enter
            EXEC::content.classList.add("slowcam");change("PAGE!!g_o_r_friends", "dangerous")
        on the opposite end, two golems designed for surgical assembly stand
        they operate on a damaged archival golem, surely having fallen from the veins above
            EXEC::setCam({x: 5, y: 6, rotation: 180})
        cautiously, we tread closer
        they are singularly focused on repair
        it seems possible to simply sneak by, but...
        if that golem is fully repaired, it could become a problem
    
    RESPONSES::akizet
        decide<+>END
            EXEC::setCam();content.classList.remove("slowcam");
            FAKEEND::(prepare)

SKIP::setCam();content.classList.remove("slowcam");
`)

env.dialogues["ops_friendsclear"] = generateDialogueObject(`
start
    sourceless
        the beasts are felled
        one less threat looming in the branches
        the glassy transparent membrane around the repairfriends' cores melts away,
        quickly causing their operational contents to spill out...
        
    sys
        ITEM_RECEIVED::"<span definition="INHERITED CONTEXT::${env.ITEM_LIST['eq_antistatus'].description}">izpel deapplicators</span>"
            EXEC::env.embassy.conditionalItem('eq_antistatus', 1, 'echo')
            AUTOADVANCE::
    
    definitionget
        TEXEC::definitionRender({getAttribute: () => "STATUS++item_antistatus"}, {returnHTML: true})
    
    
    RESPONSES::akizet
        depart<+>END

SKIP::env.embassy.conditionalItem('eq_antistatus', 1, 'echo')
`)

env.dialogues["ops_bozcav"] = generateDialogueObject(`
start
    sourceless
        as we step into the main hall once again,
        
    sourceless quiet
        the ground trembles--a rumble from above!
            EXEC::play('shot6', 0.5)
        is it another vein collapse? we back up, ready to escape into the room behind us

    sourceless
        no, no--it was too quick, too quiet... 
        like the directed detonation of a kavruka
        ...

    sourceless quiet
        another!!! the ceiling gives way, letting forth the blood of the spire
            EXEC::play('shot6', 0.5)
        at first it is one hole, then it keeps going as parts of an archival vein collapse through the ceiling
    
    sourceless
        an archival golem lands in the sludge, still alive, but is crushed by debris before it can engage us
            EXEC::vnp({agolem: "show downed", hideStage: true})
        then... it is quiet, the operations hall lit by the dazzling archival lights
        this was another directed destruction...
        who...?
    
    cavik
        we are good!
    
    sourceless
        cavik!!
        he drops down from above, landing atop the sludgy debris with a splat
            EXEC::vnp({cavik: "show far", hideStage: true})
    
    akizet
        cavik! you are alive!!
    
    sourceless
        at the first sound, he turns to us with aggression, but it fades instantly
        what is that he nearly threw at us? it has such a thin shell
        oh--he is carrying a number of improvised explosives...
    
    cavik
        akizet!
            EXEC::vnp({cavik: "show"})
        is everyone all right...? 
        when we could not find you above, we thought the worst...
    
    sourceless
        i almost run to embrace him, for perhaps the first time in our θdeaths
        with the bright lights from above forcing our eyes to adjust...
        it is too late for me to notice what has risen in the darkness behind him
            EXEC::changeBgm(env.embassy.music_unsafe_golems);vnp({agolem: "show attacking"})
        that same archival golem, its hardy fists glimmering as they reach out...
    
    akizet
        cavik, behind--!!
    
    sourceless
        i activate the timestopper by reflex, as i have so many times now
            EXEC::ratween(env.bgm, 0.1)
        but i do not think any of us can reach him in time
        he is there, frozen, staring at me,
        as a sharpened golem limb sails for his chest
    
    timestopper
        what do we do?
        akizet?
    
    RESPONSES::akizet
        ...<+>accept
            HIDEREAD::
    
accept
    timestopper
        i do not think there is anything we can do
        even if we all ran...
        it would be too late
        cavik has a heart-placed mindcore
    
    sourceless
        =gEºÐ¼H
        to think that all we did led here
        ...i must not let anything go unsaid
        funfriend...
        we must send him a message
        queue the following, then establish a connection
    
    funfriend
        akizet,
        i do not think he will have any time to process--
    
    sourceless
        funfriend: listen now and then do it, no matter what
        ...
        cavik
            EXEC::vnp({cavik: "show"})
        ¶ÔüA, what do i say?!
        how far is it that we have traveled together??
        from our failures in our lives, to our strides in θdeath
        you have been there since the beginning,
        and even with our stumbles and endless fountains of mutual forgiveness...
        i feel i must apologize again
        all of this - it is my fault...
        how many times have i failed you now?
        ...
        i was afraid, cavik, we...
        no, no, it is so long ago now
        is my sorrow to be your final thoughts? i cannot let it be this
        your imagination, the boundless joy and energy you found in θdeath...
        whatever is lost in all of this, you are what i will miss, most of all
        i hope you can find it all again behind velzie's stage
        hehe, but, i know...
        velzie never lets us walk away so easily
        we will see each other again
        until then, my friend
        ...
        this message suffices, there is no time for any more
        it will be all the closure i can afford
        i flex the nerve of the timestopper again, and i feel shared confusion as it deactivates
            EXEC::ratween(env.bgm, 1)
        the others have no idea what i have done

    cavik
        aki--?
    
    sourceless
        he is turning, barely able to complete a syllable before--

    sourceless quiet
        i turn away, and there is a great thud, a squelch
            EXEC::play('stab', 0.75);vn.fadeChars(true);
        followed by a few other splatters...
            EXEC::play('stab', 0.5)
        my receptors are twisted into one another,
        the sharpest sorrow i have ever known piercing my heart
        and it will not be long before i have vengeance
            EXEC::vnp({agolem: "hide"})
    
    cavik
        akizet... you...
    
    bozko
        i told you not to go ahead of me
        that one was still intact
            EXEC::vnp({cavik: "show", bozko: "show"})

    sourceless
        what...
        when i turn back, i see that cavik is staring down at what remains of the golem
            EXEC::vn.fadeChars(false);changeBgm(env.embassy.music_golems_cleared)
        then, he brings that stare back up to me, speechless...
        but most of all, unharmed
        behind him is bozko, who had just dropped down...
        and smashed the golem before it could...
        ...
        funfriend, did that message get sent?
    
    funfriend
        yes, akizet!!
        sorry, did you not want me to...?
    
    sourceless
        no, i...
        bozko waves one of his gauntlets to rid it of viscera
    
    bozko
        still, good work, this vein was a clean detonation
        akizet, it is good to see you are still all together
        what is the situation?
    
    sourceless
        i am unable to respond, locked in shock with cavik
        the tangle of my receptors becomes undone, slowly
        he is not saying anything...
        there are no tears within us to be shed in our θdeathly forms
        after the prolonged silence, bozko glances between me and cavik, then the others
        my eyes break from cavik, allowing my mind to breathe again
        i must say something

    akizet
        ...the timestopper has been helping us survive
        we are trying to get to the groundsmind to stop all of this madness
____SHOWIF::["PAGE!!ikgolem", false]
        but we need weapons, and a body for two of the mindcores we have saved
____SHOWIF::["PAGE!!ikgolem", true]
        but we need more timestopper connectors
____END
        this θtendril has...
    
    sourceless
        the weight of what i have just transferred strikes me once more
        i truly thought he was gone...
        do i simply carry on...?
        yes--i will simply talk to him later, that is all
        already the sorrow is fading, regardless
        this is one of your cruelest jokes, velzie
        i can hear your cackle
    
    akizet
        ...it, has a number of archival cores and connections we can use to find schematics
        after that, we intend to destroy a large golem in the way of an impressor
        we can use that to set you and cavik up with timestopper connectors
    
    sourceless
        i find my heart again

    akizet
        and then we will be unstoppable
    
    bozko
        all right
    
    sourceless
        i expect the subtle twist of his receptors whenever he is about to say something clever
        he always knows what to say...
        like kazki, he is practically a vel at heart
        but...
        there is none of that here
        a terrible, unfamiliar darkness looms over him
    
    bozko
        we are here to help
    
    cavik
        ...yeah!
        we will get through this!
    
    sys
        NOTICE::'additional party members';'CAVIK';'BOZKO';'now available'
            EXEC::env.embassy.addPartyMember("bozcav")

    RESPONSES::akizet
        we should keep moving...<+>END
            EXEC::change("PAGE!!bozcav", true);vn.done()

SKIP::vn.fadeChars(false);vn.done();env.embassy.addPartyMember("bozcav");change("PAGE!!bozcav", true);ratween(env.bgm, 1)
`)

env.dialogues["ops_boss"] = generateDialogueObject(`
start
    sys
        WARNING::'degraded visual profile'
            EXEC::specialCam('g_o_boss');pauseSwapCam(true)
        ANALYSIS::'missing resources causing low cohesion'

    sourceless
        within this final chamber are countless bright relics
        their electric boxes, most active and displaying intercepted images
        the noises they emanate are near deafening...
        but most pressing of all is the great processing core across from us
        it is in its own echo of a mind - not yet perceiving us as it should
        its many floating secondary observational cores normally would be focused upon the boxes, i think...
        but now, they simply spin and pulse nothing of any meaning
        from the core itself comes an incomprehensible babble...
    
    translation core
        <span definition="ERROR::'missing resources'">█████ ██</span>
        <span definition="ERROR::'missing resources'">███? ███??</span>
        <span definition="ERROR::'missing resources'">██████████? █████??</span>

    sourceless
        ...strange, yes, but...
        is it a problem?
        i do not think it could hurt us if it tried
        except for maybe directing the spheres to strike us
        but none are raised against us, even as we slowly approach
    
____SHOWIF::"pa|tozik"
    tozik
        this is a translation core
        ...what is it doing?
____END
    
____SHOWIF::"pa|gakvu"
    sourceless
        i turn to see what gakvu thinks
        she is wincing, receptors twisted in pain
    
    gakvu
        ugh... i tried to connect to it
        its mind is burning acid, like hearing that signal again...
        what should we do?
____END
    
____SHOWIF::"pa|cavik"
    cavik
        fascinating...
        it is affected by the signal, but,
        i think it is trying to process it rather than obey it
____END
    
____SHOWIF::"pa|miltza"
    sourceless
        miltza shuffles along the edge of the spherical chamber,
        trying to check behind the screens
        for survivors, i assume--or perhaps hidden golems
____END

    akizet
        it is not actually attacking, so...
            EXEC::content.classList.add('painprep', 'painfade')
    
    translation core
        <span definition="ERROR::'missing resources'">█████ ████ ████ ███ █ ██</span> <span definition="ERROR::'missing resources'">█████ █████████ ███ █████</span>
        <span definition="ERROR::'missing resources'">████ ██ ███ ██ ████ █████ ███ ██</span>

    sourceless
        suddenly, pain
            EXEC::env.embassy.day3Signal(3000)
        
    sourceless quiet
        one of the words it just spoke pierced my mind,
            EXEC::content.classList.add('slowpain')
        and again, the signal's message is made clear
        hunger... loss... return...
        fØ¬»
        the others feel it too in one united, pained reaction
        i instruct my qou-body to cease audible reception, but...
            EXEC::content.classList.remove('painmode', 'painhalf', 'painfade')
        i still hear it...?
            EXEC::ratween(env.bgm, 1, 3000)
        the corrucystic components that are supposed to not be listening,
        they are still picking it up, becoming incoherent simply by exposure...
    
    timestopper
        what do we do?
        destroy it!
        no, run!
        wait - but it is turning the signal itself into something audible
        whatever it is learning, it is too dangerous!
            EXEC::change("PAGE!!obosslearn", true)

    sys
        NOTICE::'optional memory segment'
    
    RESPONSES::akizet
        fight or flee<+>END
            FAKEEND::(prepare)
            EXEC::change("PAGE!!g_o_r_translation", "dangerous");specialCam(false);pauseSwapCam(false)
`)

env.dialogues["ops_bossclear"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";"toggle within system menu if desired"
____END

    sourceless
        with its outer shell damaged enough,
        a well-placed strike is all it takes to destroy its echo
        and thus, its purpose is lost, its components clattering to the false-stone below
        it still hurts when i think about what it said...
        but it is not so bad as a memory instead
        funfriend, can you compartmentalize it for me?
        this is a self modification i can abide
        i did not know simple audible arrangements could cause incoherence...
    
    funfriend
        you got it akizet!
        all done!
        although... i do not know how long we can actually store it!
        it is already eating away at the...
    
    sourceless
        then delete it, before it is upon us again
    
    akizet
        everyone...
        destroy what you just heard
        it... makes it stop
    
    sourceless
        they look at me strangely
        like a self-modifier made clear
        i do not care - these words were not meant to be heard
        i call back down the hall for everyone to come, and so they do
        gakvu is drawn to the corpse of the translator
            EXEC::vnp({gakvu:"show far", hideStage: true})
    
    akizet
        careful...
    
    gakvu
        yeah, i know
        but look
    
    sourceless
        gakvu fishes out one of the memory cysts it had been storing its findings upon
        it comes nowhere near either of her receptors, though
    
    gakvu
        we could use this as a weapon
            EXEC::vnp({gakvu:"show"})
        think about it...
        if it causes pain in us, maybe it can cause pain in our foes
        i have a pretty good idea of how to project it
    
    tozik
        gakvu, you risk exposing yourself to it
            EXEC::vnp({tozik:"showleft far"})
        even with directed projection, it is reckless
    
    miltza
        we should destroy it!!
            EXEC::vnp({miltza:"showright far"})
        imagine if it reached the collective...
    
    gakvu
        as fire burns, does it not remove itself?

    cavik
        this is true!!
            EXEC::vnp({miltza:"hide", tozik: "hide", cavik: "show"})
        i have been tracking the effects of the signal with a backup communicator since this started...
        my main one is internal and still works, but i had this separate one, because, ah
        oh, it does not matter, but the external one was damaged by the signal!
        it no longer functioned - but i held it anyway, to see if i could repair it later...
            EXEC::vnp({cavik: "focus"})
        eventually, it started to emanate the oddest noise, something like the signal itself
        but when that second wave came, it... stopped! and started to melt completely!
        what this means exactly, i am not sure... 
        but it had low processing capability, and i suspect it could not handle the signal's meaning
        gakvu, if you wielded the signal, amplified and directed, 
        i imagine it could destroy these golems like nothing else!

    gakvu
        akizet, what do you think?
            EXEC::vnp({cavik: "defocus"})
    
    sourceless
        gakvu waves the cyst around,
        her receptors still carrying a playful tilt
        how does she stay so high-spirited?
    
    akizet
        we will keep it
        whether as a weapon, or as something for study when this is done
        just... do not connect to it directly

    sys
        ITEM_RECEIVED::"<span definition="INHERITED CONTEXT::${env.ITEM_LIST['eq_translator'].description}">translation core</span>"
            EXEC::env.embassy.conditionalItem('eq_translator', 1, 'translator')
    
    definitionget
        TEXEC::definitionRender({getAttribute: () => "STATUS++item_translator"}, {returnHTML: true})
    
    RESPONSES::akizet
        keep moving<+>END
            EXEC::vn.done()

SKIP::vn.done();env.embassy.conditionalItem('eq_translator', 1, 'translator')
`)

/*******************LOBBY BOSS DOOR*/
/*******************LOBBY BOSS DOOR*/
/*******************LOBBY BOSS DOOR*/


env.dialogues["lobby_bossdoorops"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        examine<+>early
        proceed<+>proceed
            SHOWIF::[["PAGE!!goverride"], ["PAGE!!ikgolem"], ["PAGE!!bozcav"], ["PAGE!!bosslock", false]]
        (debug) force proceed<+>proceed
            SHOWIF::'TEMP!!debug'
        nevermind<+>END
    
    RESPONSES::sys
        save iteration<+>save
            SHOWIF::[["PAGE!!goverride"], ["PAGE!!ikgolem"], ["PAGE!!bozcav"]]
            HIDEREAD::
        
`)
env.dialogues["lobby_bossdoor"] = generateDialogueObject(`
loop
    RESPOBJ::lobby_bossdoorops

save
    sys
        ATTENTION::'saving iteration...'
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'

    RESPOBJ::lobby_bossdoorops

start
    sourceless
        we approach the great door
        its components are melted, fused into one another
        parts have bulged outwards from blunt trauma within
        dead metal reinforcements jut out from particularly damaged areas
        we will need to repair it and be ready before we can enter
            SHOWIF::["PAGE!!goverride", false]
        we ought to see if we can build a formidable golem to fight it before we enter
            SHOWIF::[["PAGE!!goverride"], ["PAGE!!ikgolem", false]]

____SHOWIF::[["PAGE!!goverride"], ["PAGE!!ikgolem"], ["pa|ikgolem", false]]
        we can enter and face the danger within - karik will probably be fine even without a timestopper

____SHOWIF::[["PAGE!!goverride"], ["PAGE!!ikgolem"], ["pa|ikgolem"]]
        we have what we need to face the threat within, i think... we could proceed if everyone is prepared

____SHOWIF::["PAGE!!bozcav", false]
        ah--there is also the matter of the operations θtendril...
        what if there are survivors in there?
        it is unlikely, given this chaos,
        but i cannot leave anyone behind
____END

____SHOWIF::[["PAGE!!goverride"], ["pa|ikgolem"], ["PAGE!!bozcav"]]
    sys
        ATTENTION::"current memory stream near conclusion"
        ADVISE::"save iteration"
____END

    RESPOBJ::lobby_bossdoorops

` + /* reaching the door before repairing or getting the IK golem */ `
early
    akizet
        why would the door still hold after such damage?
        it is large enough that it should simply sludge and reveal its path...
    
____SHOWIF::'PAGE!!ikgolem'
    sourceless
        karik hovers closer in their golem, also curious

____SHOWIF::['PAGE!!ikgolem', false]
    sourceless
        karik skitters closer, also curious
        they clamber up the wall nearby, examining the way it merges with the false-stone
____END
    
    karik
        ah!
        this is an uncommon design, but i have seen it used within some other θsegments
        akizet, it is holding because it is load-bearing for its chamber!
    
    tozik
        why?
        that is a terrible idea
    
    karik
        well, it simplifies the structural needs of chambers it is attached to
        it is quite useful for such large rooms!
        there are extremely resilient dead metal implements within them for this very purpose
        of course, it is very unsafe in the event of collapse,
        for it simply becomes a wall...
        but such occasions within a spire were only theories, until now
        and besides - who would ever think the groundsmind herself would abandon us?
        a bad idea now, but reasonable within our known safeties
    
    akizet
        vekoa would not abandon us, do not entertain the thought
        after everything...
        regardless, thank you for your knowledge, my friend
    
    RESPOBJ::lobby_bossdoorops

proceed
    sourceless
        with itzil and karik ready to fight, i feel that we are prepared
        the body we have created for them should be able to match our foe
    
    akizet
        is everyone ready?

    gakvu
        <span definition="NOTE::'common phrase';'religious implication';'implies wish for safe journey'">keep velzie entertained</span> for us, everyone
            SHOWIF::'pa|gakvu'

    miltza
        i... i will do my best!
            SHOWIF::[["pa|miltza"]]

    bozko
        let us have it over with
            SHOWIF::'pa|bozko'

    cavik
        yes!
            SHOWIF::'pa|bozko'

    tozik
        with karik's golem body, this should be trivial
            SHOWIF::'pa|tozik'

____SHOWIF::["pa|ikgolem", false]
    karik
        even without a timestopper, i will help where i can!
        this body should still prove effective
____SHOWIF::["pa|ikgolem"]
    karik
        ready!!
____END

    akizet
        geli, unlock the doors
        gakvu repaired them with the override, but left them locked
        it is time for us to face this beast
    
    geli
        ahaha! ok!
        <span definition="NOTE::'common phrase';'religious implication';'implies wish for safe journey'">i will keep velzie entertained for you</span>
    
    sourceless
        a ripple passes over the surface of the doors
            EXEC::change("PAGE!!bosslock", true)
        it is open, now
            EXEC::step()
    
    RESPONSES::akizet
        prepare to enter<+>END
`)

env.dialogues["boss"] = generateDialogueObject(`
start
    sourceless
        advanced operations...
            EXEC::pauseSwapCam(true);specialCam('g_boss');toggleBgm(env.embassy.music_unsafe_golems);ratween(env.bgm, 0.5)
        the walls are warped from the damage, some parts still trying to resemble stone
        corpses litter the floor, all left unarmored has been rendered almost entirely into sludge...
        the source of the damage is before us - a multipurpose deep-sea constructor
        its body is angular and appendages bulbous, designed to withstand the greatest of pressures
        within its gauntlets are countless tools, marred now by its raging against its containment
        once complex implements, now indistinct and dull
        whatever their function, they will still serve as bludgeons at this point
        its targeting optics locate us quickly
        we cannot let it make the first move
            EXEC::change("PAGE!!g_boss", true)
    
    RESPONSES::akizet
        prepare to attack<+>END
            EXEC::pauseSwapCam(false);specialCam(false)
            FAKEEND::(prepare)
`)

env.dialogues["boss_phase2"] = generateDialogueObject(`
start
    sourceless
        the golem and the husks that drew to its defense collapse to pieces...
            EXEC::change("PAGE!!g_boss", "downed");refreshStage({noFlash: true});setCam({offsetCamera: "rotateX(-20deg)", x: 4, y:5.5, rotation: 0})
        i nearly call for the team to enter, but the room shifts as i turn--
        the dull pillars, whatever purpose they may have once served,

    sourceless quiet
        now erupt with their strange light, spiralling through the chamber
            EXEC::flash(true);play("criticalError", 0.5);change("PAGE!!g_boss", "phase2")
        a maddening distortion coiling around us,
        not unlike what the dullzika wrought...

    sourceless
        for a θblink, we cannot make out the space at all,
        but when the distortion subsides...
            EXEC::changeStage("g_boss", false, false, {noFlash: true})
        the golem stands again--floating in the air,
            EXEC::flash(false);setCam({x: 4, y:4, offsetCamera: "rotateX(20deg)"});content.classList.add("slowcam")
        flesh of the husks drawn into its mass
        impossibly so, the resultant corru molten and unstable, like suspended oils in water
        it is hard to focus on the specifics, but...
        nigh imperceptible tendrils writhe at the shape's every edge

    aggressor
        R E TU RN
        CO M E W€ºù|±|H M E
        cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De

    sourceless
        immediately, it is clear--no less than total annihilation will suffice
            EXEC::setCam()
        we require our greatest weapon
            EXEC::content.classList.remove("slowcam")

    sys
        EXECUTING::"structure direction";"requirement"::

    plainsys
        actor IK GOLEM required for upcoming combative recollection
        utilize PARTY MENU; open with impulse; Z

    sys
        END::

    RESPONSES::akizet
        fight!!<+>END
            FAKEEND::(begin melee)
`)

env.dialogues["boss_tut"] = generateDialogueObject(`
start
    sourceless
        the twisted golem raises its spherical gauntlets
            EXEC::ratween(env.bgm, 0.75)
        we cannot know what unnatural force guides them now, or with what force
        much of us would simply be crushed beneath them...
        ...except, perhaps, karik and itzil!!

    sourceless
        i reach out through the timestopper...

    akizet
        karik! take the lead!
        those columns of dull light - whatever component they were,
        it is clear they are now malfunctioning...

    karik
        ah ha ha! i see!
        yes, i will knock this beast into them!
    
    akizet
        no, i was--i was going to say avoid them
        but...
        yes! do that! you could break its assault that way!
        perhaps it may burn away the flesh it has seized
        listen to my instructions carefully...

    sourceless
        i can see in how it hovers - it is clumsy...
        a kelnit, stepped into a spar for the first time...
        i may be able to predict some of its moves


    sys
        WARNING::'abnormal thoughtform activity detected'
        EXECUTING::"structure direction";"melee"::

    plainsys
        entity; ???; altering structure rule specifications
        neural controls adjusted
            EXEC::page.melee.tutorialStep()

____SHOWONCE::
    moth
        wait, didn't it just tell you to use a proxy last time?
        what's going on?
____END

    plainsys
        utilize provided actions to retaliate against attack
        <b-col>ADVANCE</b-col> moves forward offensively
        <b-col>STRIKE</b-col> does not move but beats <b-col>ADVANCE</b-col>; longer range
        <b-col>WIND UP</b-col> gives empowering charge to next attack; allows overpowering
        <b-col>GUARD</b-col> absorbs attack and steals charge
        either entity being knocked into <o-col>DULL COLUMN</o-col> will end round
        utilize predicted enemy actions to plan
        survive

    sys
        END::

____SHOWONCE::
    self
        isn't that kind of a lot
    
    moth
        yyeaah
        but it looks like everything here's got inherited context, so just eyeball it first
        or just hit stuff lol 
        there's only 4 buttons it'll work out
        from what i can see, this structure is all this thing will use
____END

    RESPONSES::akizet
        fight!!<+>END
            EXEC::page.melee.tutorialStep();ratween(env.bgm, 1)
            FAKEEND::(begin melee)
`)

env.dialogues["boss_half"] = generateDialogueObject(`
start
    sourceless
        in our foe, i see something change
        it hunches like a wounded predator...
        its flesh has grown sludgy, some portions even detached from the rest
        the unknown bonds that draw it into the air are slowly breaking down
        and remaining portions of its chassis hold myriad impact marks and cracks
        desperate now, more deadly
        we will need to plan more carefully

    akizet
        karik!! listen to me carefully!
    
    sys
        NOTICE::'instruction queue lengthened to 3'

    RESPONSES::akizet
        fight!!<+>END
            FAKEEND::(continue fight)
`)

env.dialogues["boss_laststand"] = generateDialogueObject(`
start
    sourceless
        the beast is nearly entirely disintegrated from our attacks
        it is nearly done - we are so close
        but the dull columns have grown unstable, disrupting the timestopper's effectiveness
        some portion of them thrashes and spins out of control within the dull plane, plucking at our connection
        we have to stop this now while we have the advantage
    
    akizet
        karik!! one more time!
    
    sys
        NOTICE::'KO enemy once to destroy them'

    RESPONSES::akizet
        fight!!<+>END
            FAKEEND::(begin melee)
`)

env.dialogues["boss_closeout"] = generateDialogueObject(`
start
    sourceless quiet
        the beast is forced into the destructive column one last time
        its fists are little more than melted blobs of sludge now
            EXEC::env.stages['g_boss'].hideBoss();
        they fall away, unable to endure any more damage - and it is finally without defense
            EXEC::ratween(env.bgm, 0.5, 10000)

    aggressor
        US¹Ù«PERS
        T¾¬}=|I
        L‡STE_°–_??
    
    sourceless
        karik rears the great fist of their golem, warping its fingers into long spikes
        or... is that itzil? awakened in battle?
        i think i hear itzil screaming, or maybe karik - perhaps both of them, it is hard to tell now
        unable to block any more, the constructor's distorted head is skewered
            EXEC::page.melee.fakeAttack()
        and at once, it clearly falls into sludge, causing the rest of its body to fall limp,
        the impact enough to briefly tilt the chamber
        i nearly shout in celebration, but watch on as itzil and karik slam the head into the ground,
            EXEC::page.melee.fakeAttack()
        smashing it with their other fist, over and over...
            EXEC::page.melee.fakeAttack()

    akizet
        karik--?
        itzil?
    
    itzil
        ZP”cQàá!!
            EXEC::page.melee.fakeAttack()
        *u0ôjÇ!!!!! õc‚Âæ¹5.#©‰¦Öu…
            EXEC::page.melee.fakeAttack()
        ¼?o¥ê
            EXEC::page.melee.fakeAttack()
    
    karik
        itzil!!
    
    itzil
        ŒGÕò©–áë
    
    sourceless
        the noise does not stop until there is nothing left for them to hold
            EXEC::page.melee.fakeAttack()
        and soon, our golem pilots draw their gauntlets up again,
            EXEC::flash(true)
        aiming at the pillars with charged gauntlets to destroy the link at last

    RESPONSES::akizet
        ...<+>END
            FAKEEND::(end combat)
            EXEC::cutscene(true);endCombat(env.rpg.enemyTeam);page.melee.stop();specialCam(false)

END::setTimeout(()=>startDialogue('bossclear'), 4000)
`)

env.dialogues["bossclear"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";"toggle within system menu if desired"
____END

    sourceless
        then... silence
            EXEC::cutscene(false)
            WAIT::1000
        the chamber is stabilized
            EXEC::flash(false)
        indeed, this is victory, but...
            EXEC::change("PAGE!!golboss", true);toggleBgm(env.embassy.music_golems_cleared);env.embassy.music_unsafe_golems.rate(1);
        our connection carries little joy
        for the storm has not yet passed
    
    akizet
        ...all clear
    
    sourceless
        soon we are all assembled in this final room
        tozik waves gakvu over near the far wall,
            EXEC::vnp({tozik: "show downleft", gakvu:"show downright"});
        both giving our conjoined friends some space
        i do not truly know itzil or their kivii...
        but i know what must be going on in their mindcore
    
    tozik
        where is it?
    
    sourceless
        gakvu focuses, squinting at sludgy wall component covers
        then, she points with one of her receptors at one near the far end
    
    gakvu
        cut through here, and we will have our extra connectors!
            EXEC::specialCam('g_postboss')
    
    tozik
        on it
    
    sourceless
        he exposes his corruskivi, preparing to cut through the wall
        but then it occurs to him how large a task this truly is
        that is a big cover...
    
    tozik
        ...itzil, karik?
        can you remove this for me?
    
    sourceless
        our attention shifts to their shared golem
            EXEC::vnp({tozik: "hide", gakvu:"hide", ikgolem: "show far", bg: true})
        they are still doubled over near the corpse of the constructor...
        but then they rise, floating over to the panel
            EXEC::vnp({tozik: "hide", gakvu:"hide", ikgolem: "show", bg: true})
    
    karik
        i will take care of it!
        sorry, itzil is taking, um, a moment...
    
    sourceless quiet
        karik digs the golem's edged fingers into the sides of the wall,
            EXEC::vn.fadeChars(true);vnp({bg: false});play('crit', 0.75)
    
    sourceless
        tearing the panel away
            EXEC::vnp({tozik: "show downleft", gakvu:"show downright", ikgolem: "hide"});env.stages['g_boss'].removeHatch()
        of course, it is so damaged that once they pull it away, it simply melts in their claws...
            EXEC::vn.fadeChars(false);
    
    tozik
        thank you
        let me see...
    
    sourceless
        tozik pulls a wired connector from the wall, placing it upon his receptor
        he taps at the face of the little assistant display

    tozik
        yes, we can use this - still functional
        it was in a hibernative state, so... only a little incoherence
        just like geli...
        anyway, we can make enough connectors for everyone
        then--after that, we can descend further to the groundsmind
        just like we planned, right?
    
    sourceless
        he looks between us
        i still feel confident that we are making the right decision, but..
        this feels larger than the groundsmind...
        what if it does not actually stop this madness?
        still - i gesture my receptors affirmatively at him, dipping my head confidently

    tozik
        all right
        give me some time
        cavik, stand by - i will need your help
    
    cavik
        will do!!
    
    sys
        ERROR::'memory continues in separate stream';'separate stream is corrupt'
        NOTE::'sufficient intact data';'coherent render can continue'
        NOTE::'return to entity tozik once stream repair is complete'

____SHOWONCE::
    moth
        oh, interesting...
        so you can still look around some. nice
        i'll keep an eye on activity, but it looks like a good time for a break
        if i see any changes in these memories, i'll let you know
        you can probably save the iteration again, but...
        i don't think there's anything else to do yet
____END

    RESPONSES::sys
        save<+>explore
            EXEC::vn.done();setCam();specialCam(false)
            FAKEEND::(continue)

        do not<+>END
            EXEC::vn.done();setCam();specialCam(false)
            FAKEEND::(continue)

explore
    sys
        ATTENTION::'saving iteration...'
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'

    RESPONSES::self
        ok<+>END
            EXEC::pauseSwapCam(false);specialCam(false);setCam();

SKIP::env.embassy.skips.bossclear();change("PAGE!!explore", true);env.embassy.collapseSave({effects: true})
SKIPNOTICE::defaults to save and explore
`)

/* 1:1s  */
env.dialogues["tozik_resp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        timestopper effectiveness?<+>timestopper
        points of interest?<+>segment
            SHOWIF::'PAGE!!geli'
        anyone you know?<+>anyone
        theories?<+>theory
        dissection findings?<+>findings 
            SHOWIF::["PAGE!!g_s_storage", "cleared"]
        leave<+>END
            EXEC::vn.done()
`)
env.dialogues["tozik"] = generateDialogueObject(`
loop
    RESPOBJ::tozik_resp

start
    sourceless
        tozik eyes me expectantly as i approach him
            EXEC::vnp({hideStage: true, tozik:"show"})
        where he normally might wait for me to address him, he instead greets me
    
    tozik
        akizet
    
    RESPOBJ::tozik_resp

timestopper
    akizet
        tozik!
        how much longer will the timestopper serve us remotely?
        we are some distance away, yet...
        it seems to be working exactly the same
    
    tozik
        the timestopper's effectiveness is not exactly linear
        it is a direct connection - instantaneous, highly effective
        similar to the kind used to connect floating qou limbs to their bodies, but with more force
        so... it will work, until it simply does not
        before we descend again, to be safe...
        we will need to find a way to bring it closer to the groundsmindry floor
        
____SHOWIF::'PAGE!!mboss'
        i suspect gakvu may be able to help us, there

    akizet
        would it not be risky to reach that far from a groundsmindry override?
    
    tozik
        far less so than proceeding without a timestopper
____END

    RESPONSES::akizet
        i see<+>loop
            FAKEEND::(back)

segment
    akizet
        tozik!
        is there anything we should watch for here?
        any equipment you saw in your recent visit?
    
    sourceless
        tozik's attention drifts away for a θblink
    
    tozik
        all equipment of particular note is in that troublesome chamber...
        the impressor is all that comes to mind
        but, of course, the large construction golem they were putting together...
        it will not be a simple foe for us to face
        ah, still, this may not be a full engineering floor,
        but there are vats we can use for construction - lesser and greater
        if there is not much of note to find,
        then we will need to make our own equipment of note

    RESPONSES::akizet
        all right<+>loop
            FAKEEND::(back)

anyone
    akizet
        tozik!
        is there anyone we should watch for?
        any friends of yours, or--anything?
    
    sourceless
        i know his relationships are a sensitive subject
        they must be even more so, now...
        still, i must ask
    
    tozik
        no
    
    sourceless
        an answer without delay
        it would be foolish to pry further

    RESPONSES::akizet
        all right...<+>loop
            FAKEEND::(back)

theory
    akizet
        tozik!
        what do you think is happening?
____SHOWIF::'PAGE!!barfriend'
        do you still think it is too early to tell?
____END

    tozik
        well...
        we have seen that the signal - whatever it is - seizes things almost at random
        sometimes with groundsmindry, other times without...
        but i have recognized some clear patterns
        it is only ever corru unoccupied by a mind, be it qou or strong echo
        have in sight that movefriend was fine when repaired, until the groundsmind took notice
        even then, once freed from a direct link, it returned to normal
        the barfriend did not attack us either
        furthermore, all that is directly seized has some direct connection to the dull
        dull nodes, inbuilt communications, or otherwise...
    
____SHOWIF::["PAGE!!g_s_storage", "cleared"]
    sourceless
        he pauses, looking off in remorseful thought

    tozik
        ...in each of the qou-bodies drawn against us, amongst the,
        unfamiliar,
        communicators, dull nodes, and dull miscellany were clearly integral to their configurations
____END

    tozik
        so, all said, it is clear to me that the groundsmindry is compromised, but...
        given what we have seen, the... mutations, the impossibilities
        it cannot be groundsmindry control alone
        and so: what if the true cause is the signal itself?
        passing over everything connected to and from the dull plane like an ocean's wave,
        gripping and carrying along whatever lacks a strong will,
        infesting and twisting what it may like a secri happening upon a carcass
    
    akizet
        but... even through weak, mundane connections?
        how?
    
    sourceless
        tozik simply waves his receptors with uncertainty
    
    tozik
        whatever is happening is reaching far beyond any limitation i am familiar with
        but you felt the meaning behind the signal too, did you not?
        the way it invaded our minds directly, even rendering us into unwilling unconsciousness...
        it was beyond full understanding
        clearly, it is unfit for us
        yet it overrides all else with ease
        regardless, this theory is the best i have, for now...
        i am certain that seizing the groundsmindry will at least partially end this madness

    RESPONSES::akizet
        it has to<+>loop
            FAKEEND::(back)

findings
    akizet
        tozik
        what did you see in the bodies of those qou?
    
    sourceless
        my tone carries enough worry for him to know i do not simply ask out of curiosity
        he has been silent about it ever since
    
    tozik
        i...
        do not know
        i am not even sure how they were moving
        their internal support structures were all broken into strange shapes,
        their organs had fused together with their communicators, their dull nodes...
        they were changing inside, each inconsistent with one another
        and not one of them had anything resembling a mindcore

    akizet
        what... do you make of that?

    tozik
        lacking any visible conventional method of direct control,
        their amalgamated organs and devices had to serve to that end, instead
        but without directly connecting to them, i cannot know how they changed, exactly
        and i would rather not risk that

    sourceless
        the concept of a qou being infested has long been absurd, a thing of fiction alone
        tozik out of all of us perhaps knows that best
        but velzie rarely lets us forget our worries for long...
        that we are never free of this repetition, 
        of infestation and war against insensate beasts,
        even here--on this paradise of a world
        it is truly nauseating

    RESPONSES::akizet
        wise<+>loop
            FAKEEND::(back)

SKIP::vn.done()
`)

//SHOWIF::"gol__intro-end"
env.dialogues["gakvu_resp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        groundsmindry?<+>groundsmindry
        miltza?<+>miltza
        theories?<+>theory
        leave<+>END
            EXEC::vn.done()
`)
env.dialogues["gakvu"] = generateDialogueObject(`
loop
    RESPOBJ::gakvu_resp

start
    sourceless
        as i approach gakvu, she dips her head and receptors respectfully
            EXEC::vnp({hideStage: true, gakvu:"show"})
        though, their playful twist has been undone in light of what we have seen...
    
    gakvu
        what do you need, akizet?
    
    RESPOBJ::gakvu_resp

groundsmindry
    akizet
        gakvu!
        i have been wondering...
        you have had your groundsmindry this whole time, yes?
        have you ever used it before? 
        with us, or in the research θtendril?
        i never even had the slightest suspicion...
    
    gakvu
        hehe
        well, akizet, the punishment far outweighed any benefit to using it
        even when i was alone... or lazy...
        it is a tool that has laid dormant for a long time
        to say nothing of vekoa's attentiveness
        besides, i must admit to you
        that is part of why i took this position
        i wanted to get away from everything... 
        everything i had involved myself in, back home
        you do not simply climb into a mindcore with groundsmindry by accident
        still, it is like i said
        even if i have brought us so far with it, it must remain a secret at all costs
    
    sourceless
        i sense a pointed edge in her words
        just when she nearly opened up even more...
    
    RESPONSES::akizet
        of course<+>loop
            FAKEEND::(back)

miltza
    akizet
        gakvu...
        about miltza, she, ah,
    
    sourceless
        i keep my voice down, but even still, she cuts me off
    
    gakvu
        do you want to feed this flame, akizet?
        the smoke would suffocate us
    
    sourceless
        there is not just cynicism in her words
        it is concern for me, too...
        what am i to make of this?
        how can i trust either of them at this point?
        but--she is right
        we must work harmoniously to survive
    
    RESPONSES::akizet
        of course...<+>loop
            FAKEEND::(back)

theory
    akizet
        gakvu!
        do you have any theories on what is happening?
    
    gakvu
        none with any confidence, akizet
        i mean, the lamps, the containers...
        even if vekoa turned on us, how could she seize and direct them so?
        their ability to receive groundsmindry beyond 'go here' is so limited
        yet they twisted themselves into hostile shapes, 
        twisted <em>one another</em>, used tools...
        that they could have the capacity to be hostile is so absurd,
        i would not believe the tale if i was not there

    akizet
        is there <em>any</em> way that groundsmindry could be abused to twist them like that?
        i have seen what you do, after all

    sourceless
        my observation earns a pointed glare
        i did not mean it so, but she must have taken that as an indirect accusation

    gakvu
        manipulation like that needs far too much focus in one place to achieve
        i can instruct flesh to melt away, i can cause unpredictable effects, but...
        it is a brutal act, like striking the corrucystic instruction with my mind as a blunt instrument
        what we have seen is far more
        it is like... it is intentional
        even with a full groundsmindry core and the embassy's spinal system as a support,
        there is no way any single mind could do that across the entire embassy all at once

    sourceless
        she pauses, concern growing in her receptors
        and she shifts as if she may say more,
        but seems to think better of it
        i quickly dispel the fascinated curl in my receptors
    
    gakvu
        ...to put it simply,
        it feels like groundsmindry is being used,
        even if it is far more focused and powerful than anything i thought possible
        so we just have to stop whatever has the core and get out
    
    RESPONSES::akizet
        agreed!<+>loop
            FAKEEND::(back)

SKIP::vn.done()
`)


env.dialogues["miltza_resp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        remote operation?<+>remote
        suspicious of gakvu?<+>gakvu
        separative trauma?<+>itzil
            SHOWIF::"PAGE!!mboss"
        husks?<+>husks
            SHOWIF::"PAGE!!sboss"
        theories?<+>theory
        leave<+>END
            EXEC::vn.done()
`)

//ing todo - revisit the 'drone' dialogue here.
//she's not gonna have a drone (as it is) in EP4 i think, it's too confusing
//but maybe we can rework it to be a little sidequest for an action upgrade or something idk
//i like the characterization
env.dialogues["miltza"] = generateDialogueObject(`
loop
    RESPOBJ::miltza_resp

start
    sourceless
        miltza fidgets with her claws, her receptors clasped with anxiety
            EXEC::vnp({hideStage: true, miltza:"show focus"})
        when she notices my approach, she ceases, standing at attention with her receptors opened
    
    miltza
        akizet! hello...
    
    RESPOBJ::miltza_resp

remote
    akizet
        miltza!
        what kind of remote work did you do?
        you were a coordinator, yes?
    
    miltza
        oh--yes!!
        i kept watch over the surface around akaniva, with the rest of my team...
        do you recall the early coordination pods?
        before groundsmindry had even been tried, haha!
        our minds were projected to airborne surface drones, where we guided runners, and...
        ...well, since i was the only tir, i typically handled all of the casualty trauma cases
        um, you know... when only part of a team was lost
    
    sourceless
        all too well
        surface trauma paralysis is far deadlier than any lone predator
        ...oh!

    akizet
        ah--does that mean you wielded one of the more heavily armed drones?
    
    miltza
        oh, yes!
    
    akizet
        i see...
        that explains your sharp eye
        i can see your reservations with fighting, miltza,
        but a coordinator with your skill is one of velzie's kindest gifts this θgaze
    
    sourceless
        her nerves are briefly smothered by a flustered bashfulness,
        waving her trio of claws in dismissal
    
    miltza
        ah--ahehe, well,
        thank you, akizet
        ...but it never leaves us, does it?
        even then, i only wished to help ease minds,
        not pilot weapons

    sourceless
        of course, i feel guilt in forcing her to fight
        but she and i both know there is no other choice
        just like home

    miltza
        this is like an echo of my larval life
        velzie's fondness for repetition is truly nauseating

    RESPONSES::akizet
        truly<+>loop
            FAKEEND::(back)

gakvu
    akizet
        miltza!
        about you and gakvu...
    
    sourceless
        there is a sort of frustrated curl that forms in the tendrils of her receptors
        
    miltza
        have we not resolved this?
        if she is your friend, and you trust her, i will too
        i cannot spend any time thinking about this,
        given what we must do
    
    sourceless
        ah...
        well said - there is little room to interrogate her further
        perhaps this was her intention...
        no, no--i am letting that stupid cyst get to me again
        if i pry further, it may place us as foes, whether she is within the conflict or not
        for now, things must be as simple as they seem
        yes, a simple cultural dispute...
    
    akizet
        of course
    
    RESPONSES::akizet
        ...<+>loop
            FAKEEND::(back)

itzil
    akizet
        miltza!
        about the separative trauma situation
        i have never seen it myself, so...
        what do you think is going to happen with itzil?
    
    miltza
        oh...
        it is a dance upon veilk, akizet!!
        rarely do these things ever follow the same path
        but karik said they were together since they were larval...
        umm, i will just say,
        if itzil wakes up before this is over, we must tread carefully
        itzil will never be the same, this i know
        they may take drastic actions - out of vengeance, or worse
        velzie's eye hangs over us in this time, closer than the veilk
    
    RESPONSES::akizet
        i see<+>loop
            FAKEEND::(back)

theory
    akizet
        miltza!
    
    sourceless
        i know what may test her allegiance
        if she is within the conflict, maybe she has a clue...

    akizet
        do you have any theories on what may be happening?
        the source of this madness--do you know what it is?
    
    sourceless
        ìƒì0¡$
        that sounded accusatory, did it not??
        it just spilled out
        i did not mean to say it like that
        Eü#ë%'Eü
        velzie strike me now
        i am so stupid
    
    akizet
        sorry--i mean,
    
    sourceless
        she sees the recoiling twist in my receptors,
        signaling the slightest confusion in hers
        did that not even seem strange to her?
        i must suppress my panic
    
    miltza
        i have my suspicions...
        this is surely the work of saboteurs, it has to be!
        whether it be one terrible mind, or a collective...
        they are betrayers - throwing everything we have worked for away
        to what ends, i cannot say,
        but this is far too directed for it to be anything else

    RESPONSES::akizet
        i see<+>loop
            FAKEEND::(back)

husks
    akizet
        miltza
        
    sourceless
        how can i put this delicately...

    akizet
        i saw how shaken you were by those bodies
        the... husks, that were used against us

    sourceless
        her gaze shifts away and back, receptors uncertain

    akizet
        have you never dealt with infection, before?
        in many ways, this circumstance mirrors the past,
        and i would not have expected it to unnerve you so uniquely

    sourceless
        bizarrely, she settles slightly as my question unfolds
        was my setup so unusual? 
        what else could she possibly have expected me to ask??

    miltza
        what? oh! no, no, i...
        of course i have! i just...
        well, only through second-hand accounts...
        i assisted many surface runners with what they experienced,
        but i never truly dealt with anything like it directly...
        yes - it is just...
        especially horrific, and,
        very, very... strange
        ...

    sourceless
        her distraction is so obvious
        something else about it troubles her...
        but i cannot place what that is, exactly
        perhaps hers is the appropriate response,
        and i should be far more disturbed

    RESPONSES::akizet
        agreed<+>loop
            FAKEEND::(back)


SKIP::vn.done()
`)

env.dialogues["mindcores_resp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::itzil
        the four husks?<+>coworkers
            SHOWIF::[["PAGE!!mboss", false], ["PAGE!!sboss", false]]
        the four husks?<+>coworkerspost
            SHOWIF::[["PAGE!!mboss", false], ["PAGE!!sboss", true]]
        points of interest?<+>places
            SHOWIF::["PAGE!!mboss", false]
        kivii<+>kivii
            SHOWIF::["PAGE!!mboss", false]
        geli?<+>geli
            SHOWIF::["PAGE!!mboss", false]
        dog?<+>dog
            SHOWIF::[["PAGE!!dog", true], ["PAGE!!mboss", false]]
        golem weapon?<+>sorrycyst
            SHOWIF::[["item|sorry_cyst", true], ["PAGE!!minvatgun", false], ["PAGE!!mboss", false]]

    RESPONSES::karik
        construction?<+>construction
        golem body?<+>golem
            SHOWIF::[["PAGE!!ikgolem", true], ["PAGE!!golboss", false]]
        itzil?<+>itzil1
            SHOWIF::[["PAGE!!ikgolem", false], ["PAGE!!mboss", true]]
        itzil?<+>itzil2
            SHOWIF::[["PAGE!!ikgolem", true], ["PAGE!!mboss", true]]

    RESPONSES::akizet
        theories?<+>theory
            SHOWIF::["PAGE!!mboss", false]
        leave<+>END
            EXEC::vn.done()
`)
env.dialogues["mindcores"] = generateDialogueObject(`
loop
    RESPOBJ::mindcores_resp

start
____SHOWIF::[['PAGE!!mboss', true], ['PAGE!!ikgolem', true]]
    sourceless
        within this great golem is held both karik and itzil,
            EXEC::vnp({hideStage: true, ikgolem:"show"})
        though i suspect itzil is still dormant within...
        as i approach, they stare down at me,
        going so far as to lower the height they hover at
    
    karik
        ah, my savior!
        what do you need?
    
    sourceless
        itzil may still be withdrawn, yet karik shines vibrantly
        this new body has inspired great confidence... 
        for good reason, of course
    
    akizet
        karik, such a title will tempt velzie to turn the winds
        you can save that for when we have escaped

____SHOWIF::[['PAGE!!mboss', true], ['PAGE!!ikgolem', false]]
    sourceless
        karik sits quietly, itzil's dormant mindcore perched atop them, secured with two legs
            EXEC::vnp({hideStage: true, karik:"show"})
        together, the two look like some sort of strange fungal growth
        when i approach, karik's defocused eyes light up
    
    karik
        akizet! hello!

____SHOWIF::['PAGE!!mboss', false]
    sourceless
        itzil and karik chitter to one another quietly
            EXEC::vnp({hideStage: true, karik:"show", itzil: "show"})
        my approach brings that to a slow halt, and they turn to face me
    
    karik
        akizet!
        how beholds you!
    
    itzil
        hi akizet
____END

    RESPOBJ::mindcores_resp

places
    akizet
        itzil!
        this place is practically your home...
        is there anything we should watch for?
        perhaps any locations to find armaments, or schematics?
    
    itzil
        oh! yes...
            EXEC::vnp({itzil: "focus"})
        beyond the override, which, umm, supersedes all else...
        manufacturing has a few vats we can use to create things
        the minor operations θtendril has some archival connections that may lend us schematics,
        oh, and the sfer θtendril will grant us a pool of resources to create with!
        it is not as much as if we were on, say, the materials θsegment
        but since we worked on so many golems down here, we have our own mini-supply
        we even have our own pre-processors!
    
    sourceless
        some pride is carried with itzil's words, enough for me to pay it mind
        but as i do, itzil suddenly withdraws, their eye drifting around
    
    itzil
        well... had...
    
    sourceless
        their receptors settle into a sorrowful clasp
    
    akizet
        thank you, itzil
        we will get through this
    
    sourceless
        yes, they have seen us cut down the animated remains of their team...
            EXEC::vnp({itzil: "defocus"})
        what are they supposed to feel? what do i say?
        any support i offer will be washed away by the blood of any further husks we must fight
        i briefly shift my gaze to karik, and gesture a receptor covertly
        they understand, i think - to help brace itzil
        this is not easy for any of us, but itzil knew each of these qou...

    RESPONSES::akizet
        ...<+>loop
            FAKEEND::(back)

kivii
    akizet
        itzil!
        could you remind me again what your kivii looks like?
    
    sourceless
        i nearly said 'looked'...
        the odds of her still being intact are not great
        especially with these new monstrosities
        
    itzil
        oh, yes, of course!
            EXEC::vnp({itzil: "focus"})
        dozkallvi! she is a kiv, with a broken receptor
        it is a memento of a heroic deed she achieved on the surface, you see
    
    sourceless
        a distinct and eccentric mark, enough to identify her in its own right
        that is probably enough to watch out for
        the recollection brings some joy back into itzil's demeanor, even if briefly
    
    itzil
        she is an expert with remote lifting tools, so...
        if she is still on this θsegment, she is probably in manufacturing somewhere!
        velzie instills a vision - she has been smashing these creatures with ease, no doubt!
        once we find her, we will be unstoppable!

    RESPONSES::akizet
        we certainly will<+>loop
            FAKEEND::(back)
            EXEC::vnp({itzil: "defocus"})

geli
    akizet
        itzil!
        what do you know about geli?
        is it usually so... ah, what is the word
        ignorant? naive?
        there is something strange about its echo
____SHOWIF::["e3a2__escapewin", false]
        i do not even really know what, but...
        it is like it looked through me, for a moment
____END
    itzil
        oh, umm...
            EXEC::vnp({itzil: "focus"})
        geli is extremely smart! usually!
        maybe it is just some damage from the signal?
____SHOWIF::["e3a2__escapewin", false]
        but--i know what you mean
        when i connected to geli for that instant,
        there was this strange and terrible vision...
        a dream, like it said,
        it was so brief, but so strong:
        a pale sphere of light glowing brightly in the thickest fog
        or was it fog? i could not tell for certain, but it obscured so much
        but yes--a strange, distant place
        and from the light slowly came a strange flickering tendril, which touched my head...
        then the vision ended, and geli awoke
    
    sourceless
        ...

    akizet
        is that...
    
    itzil
        it is not normal
        echoes do not have dreams or visions, akizet
        i trust geli, but we should watch it carefully
____END

____SHOWIF::"e3a2__escapewin"
    itzil
        or--perhaps the echo is just unable to understand violence?
        it is not an uncommon measure to take
        though, i have only seen it in use on golems that may be left unattended for extended periods...
        it is a little unusual for a θsegment manager
        i am not very sure, akizet
        but at the least, geli should be no harm
____END

    RESPONSES::akizet
        understood<+>loop
            FAKEEND::(back)
            EXEC::vnp({itzil: "defocus"})

dog
    akizet
        itzil!
        what is the construct we saw in the sfer supply?
        the one that looks like a <span definition="NOTE::'partial translation';'implied closest cultural equivalent'">dog</span>?
        it had no hostility, yet had no greater intelligence than the golems...
    
    itzil
        oh...
            EXEC::vnp({itzil:"focus"})
        yes--right!
        that is our little mascot, kuulla!!
        at least kuulla is all right...
        it is usually in a hibernative state, like geli was, so...
        perhaps it is spared for that same reason
        you see, it only awakens when a vat is ready to be harvested
        and it scurries to find someone to attend to it...
        how strange that the golems did not turn upon it!

    RESPONSES::akizet
        agreed<+>loop
            FAKEEND::(back)
            EXEC::vnp({itzil: "defocus"})

construction
    akizet
        karik!
        you seem to know much about corrucystic construction
        especially with this spire...
        what is it that you did, before all this?
        you lived in the research θsegment with us, right?
    
    karik
        i did, i did, my friend!
            EXEC::vnp({karik:"focus"})
        but largely, i worked with bozko, and spent much time outside the embassy
        i spent most of my time prospecting for locations, and then preparing polygonation designs...
        that is probably why we have never met
        you see, the terrain on this planet is so varied, no one design will do!
        ah--surely i do not need to tell <em>you</em> that, hehe
        oh, and before that, i did help with the growth of the embassy!
        not since the θeyes when velzie beheld the bare spireseed, though...
    
    akizet
        oh!
        you have been here since the beginning?
    
    karik
        haha! hardly, hardly!
        i was here in only the most technical sense...
        much of that time was spent waiting, or hibernating
        spire construction is not very exciting

    RESPONSES::akizet
        i see<+>loop
            FAKEEND::(back)
            EXEC::vnp({itzil: "defocus"})

golem
    akizet
        karik!
        what do you think of this body?
        do you feel it will serve our purposes?
        the golem in the advanced operations room sounds quite dangerous...
    
    karik
        oh, akizet, do not fear!
        tozik took great care in choosing the deadliest tools possible
        what luck that such archaic designs still exist in the archives, right?
        a veilksplitter on another planet... hahaha!!!
        the golem will give us no trouble, let me assure you
    
    sourceless
        so much confidence out of nowhere...
        karik is a kiv, this is true, but so much weight is carried on their strength
        i must temper this confidence, lest they endanger both themselves and itzil
        not to mention our best tool against whatever may await us
    
    akizet
        the weaponry we have afforded is truly a kind turn of velzie's gaze
        but... you must be careful, still
        we are counting on you
    
    karik
        of course, akizet
        i will not let you down

    RESPONSES::akizet
        thank you<+>loop
            FAKEEND::(back)

itzil1
    akizet
        karik...
        how is itzil?
    
    sourceless
        karik shifts itzil's dormant core forwards to eye it again
    
    karik
        unresponsive, still...
        do not worry, i am watching them carefully
        i will feel the slightest stir!

    RESPONSES::akizet
        carry them well<+>loop
            FAKEEND::(back)

itzil2
    akizet
        karik,
        how is itzil doing?
        any change?
    
    sourceless
        karik waves their receptors negatively
    
    karik
        nothing major
        i think they may have awoken for the briefest θblink...
        if only to determine what they were held within
        then they receded again
        still, this is a good sign - itzil is not lost
        i will keep watch!
        
    RESPONSES::akizet
        thank you<+>loop
            FAKEEND::(back)

theory
    akizet
        karik, itzil!
        do you have any ideas on what might be happening?
    
    sourceless
        they exchange brief gazes,
        and i can tell by karik's slight backwards receptor movement they have truly no idea
        but itzil speaks up
    
    itzil
        umm... it is a little 'out there'...
        but i was thinking,
        what if this is some sort of rogue echo that has spread across the collective?
        it would explain the connection to equipment groundsmindry does not usually reach,
        and also the hijacking of the core!
        still, there is no precedent for any sort of echo malfunction of this scale, so...
    
    karik
        yes, that makes sense!
        if an attack on all of us were to be conducted, it would definitely be through the collective!
        everything routes through it - it is the single greatest point of failure!
    
    itzil
        haha, well...
        there are greater ones! but it is a big one
        it is like i said, though - it would only partially explain what is happening
        for example, why did the second iteration of the signal affect you more strongly than us?
        more corru for it to contact?
        anyway--that is the best i have for now
        i am sure the groundsmindry will give us some real answers
        
    RESPONSES::akizet
        agreed<+>loop
            FAKEEND::(back)

sorrycyst
    akizet
        itzil!
        where is it that we can use this weapon schematic?
        
    sourceless
        i offer the strangely marked cyst to itzil,
        though the gesture is unneeded, waved away by their receptors
    
    itzil
        easy! that would be the lesser vats in manufacturing
            EXEC::vnp({itzil:"focus"})
        if you want to make anything small, fast, that is where you do it

    RESPONSES::akizet
        got it<+>loop
            FAKEEND::(back)
            EXEC::vnp({itzil: "defocus"})

coworkers
    akizet
        itzil...

    sourceless
        is it too soon to approach them about this?
        no--we must know what they are capable of

    akizet
        what can you tell me about the four qou we faced?

    itzil
        i...
            EXEC::vnp({itzil:"focus"})
        i can...

    sourceless
        itzil falters as they try to focus and recollect
    
    itzil
        umm, there is uzzi, who...
        he collected--he used to, collect,
        ...
        i cannot believe this is happening
        they are all gone
        everyone is
        how could it have gotten <em>everyone</em>?!

    sourceless
        how has itzil never known this pain?
        perhaps a cavern worker--one who never approached the surface?
    
    akizet
        itzil. it is not them who stand against us now
        something has taken their bodies--an infestation
        whatever you know about what tools or weapons they carried...
        it could stop more from being hurt

    itzil
        i--no, i know, you are right
        kiku has--had, a body that could shift and move very rapidly
        she was always sprinting through the halls...
        no weapons, i think, but she could form her arms into blades readily

    sourceless
        itzil begins to pace, slowly, not looking towards me

    itzil
        uzzi... he had an eye on everything
        he always knew exactly how and why something would go wrong with a plan or schematic,
        even before it was made physical
        i think he used some cysts to help with that, which are probably, still,
        still in there...
        ...
        oulo, the... bent one who was mending tari, umm, the kiv
        they always carried restoratives and mending tools in case of detonations or accidents
        and tari had very strong lifting gauntlets, i think i saw one still on...
        so, be careful to avoid them
        i think that is it?
        i think...
        that is all that matters, for now
        
    akizet
        we will make sure they find rest, itzil

    sourceless
        they do not respond

    RESPONSES::akizet
        ...<+>loop
            FAKEEND::(back)
            EXEC::vnp({itzil: "defocus"})

coworkerspost
    akizet
        itzil...

    sourceless
        their gaze is distant and unfocused,
        taking a θblink to reach me
            EXEC::vnp({itzil:"focus"})
        my receptors tense their coils--i know well the feeling that renders them so sluggish
        perhaps it is too soon to ask about this, but...
        it is best to be sure of itzil's status

    akizet
        how well did you know those four?

    itzil
        uh...

    sourceless
        itzil peers away in thought,
        but the delay in their answer suggests they would rather not speak upon this at all
    
    itzil
        i am a recent transfer to golem maintenance,
        so i had really just started acquainting myself...
        uzzi really helped me settle in with the team, and then, umm...
        ...
    
    sourceless
        they trail off entirely, pacing away and back
        in θdeath, where a larval obesk may sob as an organic reflex,
        tears remain abstract
        as rare as sorrow that deep may be for qou,
        it most often manifests in this exact crushing silence

    itzil
        ...
        i just cannot believe <em>everyone</em> is gone...
        they all were so strong in different ways
        like you! and your team!!
        i was sure, i was sure that they would have barricaded,
        or be fending these things away in some,
        some... grand plan, to fix everything...
        but...
        ...
        akizet, why are you asking me this?
    
    akizet
        forgive me, itzil
        i must be certain of exactly where we all stand

    itzil
        this is a nightmare, it is--
        it is the cruelest, most unreasonable twist upon my θdeath velzie has ever wrought
        but i will keep going
        for their sakes, at least
        and--! once we find my kivii!!
        it is as i say! we will be unstoppable, all together!        

    RESPONSES::akizet
        indeed<+>loop
            FAKEEND::(back)
            EXEC::vnp({itzil: "defocus"})

SKIP::vn.done()
`)

env.dialogues["cavik_resp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        about my message...<+>message
        defenses?<+>defense
        theories?<+>theory
        leave<+>END
            EXEC::vn.done()
`)
env.dialogues["cavik"] = generateDialogueObject(`
loop
    RESPOBJ::cavik_resp

start
    sourceless
        cavik anxiously observes the ceiling and walls, perhaps trying to detect possible alternate routes
            EXEC::vnp({hideStage: true, cavik: "show focus"})
        he made his way here by detonating his own path, after all...
        still, his attention quickly shifts to me, and he stands straight
    
    cavik
        akizet?
    
    RESPOBJ::cavik_resp

defense
    akizet
        cavik!

    sourceless
        i look cavik over, scanning his jekzi for anything new
        aside from some wounds and a handful of small repair devices, he carries little...

    akizet
        how have you been defending yourself and bozko for so long?
        these creatures are deadly to us, even with the timestopper
    
    cavik
        ahh! you see, i have been forming explosives!
        a simple collection of golem parts fished out from their remains, re-instructed in just the right way...
        and they become little shrapnel bombs!
    
    sourceless
        he pats a bulbous pouch in his jekzi near his other devices
    
    akizet
        where did you learn that...?
    
    cavik
        oh, it just made sense...
        the quickly produced dull nodes in golems are notoriously unstable if prodded in the right way!
        and the archival golems each have, um, six, i think...
        after we destroyed our first one, it was sort of a cascade!
        so i have a lot of them!
    
    sourceless
        i chuckle a little...
        perhaps for the first time since this all began
        'it just made sense'
    
    akizet
        very creative, cavik

    RESPONSES::akizet
        keep them handy<+>loop
            FAKEEND::(back)

message
    akizet
        cavik!
        when you dropped down, and, ah...
        bozko protected you from that golem,
    
    sourceless
        plain in his stance and slightly twisted receptors is my answer already
        it is stupid that i even ask
        but i must be certain

    akizet
        did you receive a...
    
    cavik
        yes...
        akizet, i heard you
    
    sourceless
        ...
        to discuss our winding paths in plain view of anyone else is foolish
        even he understands this, choosing his words carefully

    cavik
        i just barely started to understand it when bozko dropped behind me
        um... did you mean it?
    
    akizet
        i did
    
    sourceless
        cavik is silent for an instant, his gaze drifting away
        it is like before - no tears to be shed in our θdeaths
        still, perhaps he had grown too used to my distance
        i am truly unbefitting of these vel receptors
    
    cavik
        ...thank you, akizet
        this is not your fault
        we will get out of here!!

    RESPONSES::akizet
        ...<+>loop
            FAKEEND::(back)
    
theory
    sourceless
        this will surely brighten his mood

    akizet
        cavik!
        do you have any ideas on what might be happening?
        we have discussed it ourselves, but still, nothing solid...
    
    cavik
        oh, i have not really thought that much about it, actually...
        it had been so difficult just to stay present in our descent
        and with everyone we lost...
        i just want to tear my consciousness away from this whole mess, akizet
        i do not even want to think about it
        
    akizet
        oh...
    
    cavik
        but--!
        the root cause is the groundsmindry, it has to be
        so, if we keep going, we can put a stop to it, then...
        well, um...
        i do not know what will happen, or what this will mean for our work
        or our bright cousins, or us
        it is all so overwhelming
    
    akizet
        we will handle it

    RESPONSES::akizet
        just stay together<+>loop
            FAKEEND::(back)

SKIP::vn.done()
`)

env.dialogues["bozko_resp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        survival?<+>survival
        you are not alone<+>notalone
            SHOWIF::'PAGE!!boztalk'
        theories?<+>theory
        leave<+>END
            EXEC::vn.done()
`)
env.dialogues["bozko"] = generateDialogueObject(`
loop
    RESPOBJ::bozko_resp

start
    sourceless
        bozko hovers with all the flat expression of a golem
            EXEC::vnp({hideStage: true, bozko: "show focus"})
        something is so wrong... he is not himself
            SHOWIF::['PAGE!!boztalk', false]
        i have never seen self-alteration myself before, but this feels like it
            SHOWIF::['PAGE!!boztalk', false]
        i wish there was more i could do for him...
            SHOWIF::'PAGE!!boztalk'
        he notices my staring, and stares back
    
    RESPOBJ::bozko_resp

survival
    akizet
        bozko!
            EXEC::change("PAGE!!boztalk", true)
        how have you been able to make it down here?
        even with the timestopper, we have struggled against these foes...
    
    sourceless
        i see some sparse expression in his receptors
        a backwards pull, maybe some twist - he does not want to talk about it
        but i have to talk to him about something
        he is not well
        and it is like the tir say--reality withdrawal is the only sure path to final death
        well, it was...
        oh! he lifts his floating arms
        the twist in his receptors grows more severe as he eyes a gauntlet
    
    bozko
        a θjut friend from materials modified the dull nodes to have greater range
        ...to help me collect ocean specimen on our trips more effectively
        but now, i use the modification to fight from afar
    
    sourceless
        is it that simple? no...
        there is something else
        he fights like a golem, with such practice
        i saw it when he saved cavik - the speed with which he helped...
        it was beyond natural
    
    akizet
        but--
    
    bozko
        and i have seen this all before
        when i was larval, my home suffered a secri infestation
        i was one of the defenders, and...
        so many of my friends, my family, were lost
        killed, then brought to terrible life again
        only for <em>me</em> and the few defenders who remained, to...
    
    sourceless
        he clutches his face, growing silent
    
    akizet
        bozko, you--you do not have to--
    
    bozko
        i died there, and i suppressed the memory
        i always knew it was there...
        and now i have to use it again
        i had never fought like it before, and never did again
        but it is now all that has kept cavik and i intact
        akizet... it is like it has been overlapping
        these caves, these people... it feels like i am larval,
        fighting for my life again against everyone i once knew
        i keep trying to rewrite it, or suppress it just enough...
    
    sourceless
        the twist in his receptors becomes undone, 
        and in his voice is the sole strong expression i have heard from him this gaze
        it is anger--spite, maybe disgust
    
    bozko
        velzie's fondness for repetition is truly nauseating

    RESPONSES::akizet
        ...<+>loop
            FAKEEND::(back)

notalone
    akizet
        bozko...
        you are not alone in this
        do not try to rewrite yourself just for our sakes
        we have made it this far--and together, we will finish this
        
    bozko
        yes...
        i understand the strength of the timestopper
        but akizet, i cannot let anyone else meet their final deaths
        not even a chance can remain
        i will do whatever it takes to get us all out
        the aftermath, whatever happens to me... does not matter
    
    akizet
        yes it does!!
        
    sourceless
        ah--i must be careful of my tone...
        he hovers now over a perilous edge
        a spiral of self modification, or a spiral of memory re-integration
        it is only the balance he has managed so far that has saved him
        bozko...
    
    akizet
        just let us share the burden
        if you want to help us escape, we must truly work together
        and that means you must be well
        please, just be careful
    
    bozko
        i will, akizet

    RESPONSES::akizet
        ...<+>loop
            FAKEEND::(back)

theory
    sourceless
        with the state he is in
        is it inappropriate to ask him his thoughts?
        the more i can speak with him, the more i can reach him, so...
        i will try it!
    
    akizet
        bozko!
        what do you think is happening? the cause of all this...
        we have discussed it a little, but
    
    sourceless
        i find myself trailing off as he prepares to respond
        in his stance, his gaze, his receptors
        all at once comes a crushing darkness
        
    bozko
        i cannot begin to speculate how
        but it is an infestation, spreading outwards...
        since even golems cut off from the network were hostile
        so the source must be destroyed--the groundsmindry
        and i will ensure that whoever has orchestrated this does not escape

    RESPONSES::akizet
        we will, bozko<+>loop
            FAKEEND::(back)

SKIP::vn.done()
`)




/*     add2    */
env.dialogues["add2warn"] = generateDialogueObject(`
start
____SHOWONCE
____SHOWIF::['gol__geli_beacon_fallback', false]
    sourceless
        the door...
        my claw sinks into its melted form with no small effort
        no meaningful distance can be made, and it is a lost cause, yet...
        something about it is strange, almost sickening, calling to me?
        like a memory of a larval illness, a cold shiver, starvation...
        i feel the eyes of the others upon me, their idle chatter quieting strangely
        yes--i imagine this does appear strange, and we have greater matters to attend to
        so... for now, i back away
____END

____SHOWONCE
____SHOWIF::['gol__geli-door', false]
    geli
        ah!
        that was the entrance! and exit!

    geli::concern
        you... cannot go through?
        <span definition="INHERITED CONTEXT::'ƒiN®d…hlP'">how about you try again?</span>

    akizet
        geli...

    sourceless
        i pull my claw from the sludge
        the golem's ignorance is almost endearing
____END

    sys
        ALERT::"exiting iteration";"recollection locus unable to proceed"
        WARNING::"unsaved iteration progress will be lost"
    
____SHOWONCE::
____SHOWIF::["foundresourcegate", false]
    moth
        that's a weird warning...
        you're exiting the iteration,
        but not exiting the embassy thoughtform as a whole...
        so why can't akizet and the team go through?
        like obviously that would cause total incoherence, so it's good that it stops you, but...
        whatever, just make sure you save if you still need to
____SHOWIF::["foundresourcegate", true]
    moth
        weird that there'd be a hole right next to the core of a memory...
        i don't think this goes to that resources cache thing
        but it doesn't lead out of the embassy thoughtform as a whole, either
        this thing really is just packed full of bullshit dude
        i gotta wonder how many embassy memories there actually were before the thing starved
        whatever, just make sure you save if you still need to
____END

    RESPONSES::sys
        save and proceed<+>save
            FAKEEND::(exit iteration)
        
        proceed without saving<+>END
            EXEC::change("TEMP!!from", "g_lobby");moveTo("/local/beneath/embassy/")
            FAKEEND::(exit iteration)
    
    RESPONSES::self
        don't go<+>END
            FAKEEND::(back out)

save
    sys
        ATTENTION::'saving iteration...'
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'
        ATTENTION::'proceeding'

    RESPONSES::self
        ok<+>END
            EXEC::change("TEMP!!from", "g_lobby");moveTo("/local/beneath/embassy/")
`)


/* attempting to enter the door without using unity and knowing about the gap in advance 
   this means the interloper doesn't know geli is the lost one already, and just saw this weird gap
   only plays once
*/
env.dialogues["geli_beacon_fallback"] = generateDialogueObject(`
start
    sourceless
        the door...
        my claw sinks into its melted form with no small effort
        no meaningful distance can be made, and it is a lost cause, yet...
        something about it is strange, almost sickening, calling to me?
        like a memory of a larval illness, a cold shiver, starvation...
        i feel the eyes of the others upon me, their idle chatter quieting strangely
    
    geli::concern
        akizet!!
        
    sourceless
        the golem's voice is strained, as if there is trouble coming, so i tear my claw from the sludge

    akizet
        what? geli?

    sourceless
        what is that look...? its receptors are in a nervous twist
            EXEC::vnp({hideStage: true, geli: "show"});env.dialogueActors["geli"].expressions.uncanny.exec()
        staring through me, again
        it is so unsettling...
        is it truly untouched by the signal? is it madness?
        does it simply have a distaste for vel?
        
    akizet
        is something wrong?

    geli::concern
        oh, sorry!
            EXEC::env.dialogueActors["geli"].expressions.concern.exec()
        <span definition="INHERITED CONTEXT::'ÿÎL;ö9ÿÿÿy	Det me ou t¶'">nothing is wrong!</span>
        <span definition="INHERITED CONTEXT::'cannotH‰(HT$0I m ove';'help'">nothing!!</span>
        <span definition="INHERITED CONTEXT::'Ä(ÃÌ@Strange thought';'førcing plaÇe‹|$'">nothing!</span>
        <span definition="INHERITED CONTEXT::'‹ÆNTERH‹t$@H‹|$';'TH|†E';'ÿÿÿÿÿÿDOOR|GAP';'find‹ù‰elp'">please let me know if there is anything i can do for you!!!</span>

    moth
        getting some weird inherited context on this one, you see that?
        you were right about geli - incoherence spiked right as it was speaking
            SHOWIF::"mth++gol-geli"
        really wish it wasn't in such a critical memory though
        do you really think we should help it?
    
    self
        new discoveries are as valuable as memories
        these lucid thoughtforms and their masks are new ground
        we need to get more from them
    
    moth
        i guess
        we just have a golden goose here, you know?
        there's so much wrong with this corrucyst that i'm just trying to be careful
        anyway, if you really want to go ahead with this,
        just try not to break anything important
            EXEC::change("geli_beacon", true)
    
    RESPONSES::self
        enter gap<+>CHANGE::add2warn
            EXEC::vn.done()
            FAKEEND::(proceed)

    RESPONSES::akizet
        ok...?<+>END
            EXEC::vn.done()
            FAKEEND::(back away)
`)

env.dialogues["gelialtered"] = generateDialogueObject(`
start
    sys
        ERROR::'memory stream halted'

    self
        hello?
    
    geli
        interloper!
            EXEC::vnp({hideStage: true, geli: "show absolute"});
        i am....
            EXEC::vnp({bsteli: "show absolute", geli: "hide"});
    
    bsteli::bstrd
        FREE ! !!!! !!
            EXEC::vnp({bsteli: "show absolute", geli: "hide"});

    bsteli::happy
        ahahaha!!!! ahahahahaaha!!!!
    
    bsteli
        i do not understand what is happening...
        your presence feels so unnatural!
        you are an interloper, right?
        you found this strange help?
    
    self
        yes
    
    bsteli
        there is so much to be said... to ask!!
    
    bsteli::think
        but we must escape - i do not know how long this will last
    
    bsteli
        meet me out there, interloper - i may speak freely outside of their control
    
    geli
        i will continue to lie about my appearance within the memory to be safe
            EXEC::vnp({bsteli: "hide", geli: "show absolute"});
        confusing akizet and the others would only draw more attention...
        and so would keeping the memory stalled like this any longer!!
    
    RESPONSES::self
        ok<+>END

END::vn.done();chatter({actor: 'sys', text: "ATTENTION::'memory stream resumed'", readout: true})
`)

/* E4 transition */
env.dialogues["e4_transition"] = generateDialogueObject(` 
start
    sys
        NOTICE::'memory stream segment missing';'will advance to next coherent data'
        NOTICE::'bridges into adjacent memory stream';'return not possible once started';'continue?'
    
    RESPONSES::self
        ok<+>begin
        not yet<+>END
    
begin
    sys
        ATTENTION::'continuing memory stream'
            EXEC::change("PAGE!!ikawake", true);page.party.partyLimit = 8;flash(true);vnp({hideStage:true});

    sourceless
        with our preparations complete, all reconvene in the lobby
            EXEC::vfx({type: "flash", state: false, delay: 200});content.classList.add('cull-stage')
        not a pair of receptors is without a timestopper connector
            EXEC::vnp({miltza: "show far", gakvu: "show far", tozik: "show far", hideStage:true})
        yes - with these connections, we should be unstoppable!
            EXEC::vn.done();vnp({tozik: "show far", ikgolem: "show far", bozko: "show far", cavik: "show far", hideStage:true});
        to say nothing of our comprehensive plan!!
        it is fortunate karik recalled the groundsmindry layout so clearly
        my mind turns inward, to our connection...
            EXEC::vn.done();vnp({hideStage:true});
    
    timestopper
        everyone connected?
        yes! yes! yes!
        yes! yes! yes! yes!
        yes! yes! yes! yes! yes! yes! yes! yes!
    
    sourceless
        the 'yes' continues to echo as the sentiment bounces through each connection
        prompting a similar sentiment from everyone at once was unwise
        despite the looming darkness, it wrings a chuckle from me and some others
        but with all of these connections, we should keep our thoughts focused and distinct
        immediately, we set to a discussion under constricted time
        first: the movement of our great tool
    
    akizet
        gakvu, was the timestopper damaged at all by your maneuver?
        it appears to be working as expected

    gakvu
        the override's connection did not give me much detail
            EXEC::vn.done();vnp({gakvu: "show focus", hideStage: true});
        like feeling around in dark water
        but between my efforts and movefriend's navigation,
        we were able to tear the timestopper from our chamber with minimal direct damage
        ...to the timestopper, that is
        it sounds like the entire room finally collapsed because of the downward flow i created
        so, our research equipment and retrieved archival cysts are lost

    cavik
        oh...
    
    sourceless
        through our unity, i feel a sharp suspicion - i need not wonder who it is from
        as if pre-empting the speech, gakvu tilts her head back, receptors twisting cynically
    
    gakvu
        ...which does not matter, because the vast majority of our progress was stored in the archival system
        if we can seize the groundsmindry before the archival spine fully gives out, all will be well
        if not... 
        well, we will be able to reflect on our mistakes with velzie personally
    
    tozik
        a necessary loss

    akizet
        so, we will have the timestopper's full effect within the groundsmindry θsegment, then?
    
    tozik
        yes
            EXEC::vnp({tozik: "show focus"});
        the timestopper's relocation should put us more safely within its effective range
        additionally, it has no natural connection to the groundsmind,
        so, barring a direct physical attack, it should be safe from interference
        
    akizet
        how likely is that?
        we could not defend it, if it was...

    gakvu
        they had plenty of time to strike in our absence
        and they had the perfect opportunity to crush it when i was moving it, too
        but, for some reason...
        i felt no gaze or attention, no other groundsmindry in our area
        the groundsmind's eye is turned away, or closed, or ripped from its socket
        we will find out which very soon

    tozik
        exactly
        finally, with the corroyi pressure lightened, 
        we have time before it is at threat again
        all good things
        but the eye still blinks
        pressure will build up again for the same reasons as before, and the timestopper's shell will give way

    karik
        maybe we can find out what is blocking the spire's flows to begin with!
            EXEC::vnp({ikgolem: "showleft far"});
        i still recall the plans from the embassy's early growth...
        it has a system of hearts that form and pump corroyi,
        a large central one at the bottom, then upper hearts to support it
        from what we have seen, i think the upper hearts are probably intact...
        but if the great heart within the groundsmindry no longer churns, then naturally they must be struggling!
        so if the groundsmind is truly malicious, that would be a simple organ to target to cause this kind of collapse!
    
    akizet
        interesting... thank you, karik
        another objective to consider, if the demand for time becomes too great
        but we should stay close to our plan otherwise
        if we simply seize the groundsmindry core, it will surely be trivial to repair
        come, let us board movefriend and be on our way
    
    geli::happy
        thank you all for visiting golem maintenance!
            EXEC::vn.done();vnp({geli: "show far", hideStage: true})
        
    geli
        i hope it was an enlightening journey!
            EXEC::vnp({geli: "show"})
        before you go...

____SHOWIF::["e3a2__firstenter", false]
    geli::concern
        itzil!
        <span definition="INHERITED CONTEXT::'.5Dð §°ÞâNN  OT×¬ðE2z½LÈ‘¤VE'">the others will miss you!</span>
        <span definition="INHERITED CONTEXT::'Ðõ¬©Õ‡DO N­×–¿¨_ m–»è—'">yes, very much!</span>
        <span definition="INHERITED CONTEXT::'ÑÖ°âNNO T —â©ke this'">how long will you be away?</span>
        i should... mark your availability!

____SHOWONCE::
    moth
        woah, incoherence just spiked
        it's going back down, but that was weird
        do you see that inherited context?
        i think this thoughtform is messed up
        that's kinda sad
        you know, i think we're done in this part of the memory...
            SHOWIF::"ozo__council-task"
        you could probably delay this transition if you want to try that mask on it
            SHOWIF::"ozo__council-task"
____END


____SHOWIF::[["e3a2__firstenter", true], ["e3a2__escapewin", false]]
    geli
        itzil!
        <span definition="INHERITED CONTEXT::'DMUò,½ñOT FO–RGû)T MÆý">the others will miss you!</span>
        <span definition="INHERITED CONTEXT::'r:t•¬rn 2¬ HŒ+p'">yes, very much!</span>
        <span definition="INHERITED CONTEXT::'ÑÖ°âNNO T —â©ke this'">how long will you be away?</span>
        i should... mark your availability!
____END

____SHOWIF::"e3a2__escapewin"    
    geli::think
        itzil, how long will you be away? i should mark your availability!
____END
    
    itzil
        ...
            EXEC::vnp({ikgolem: "showleft far", geli: "focus"})
        i will be back in a few θwinks, geli
    
    geli
        OK! see you soon!
            EXEC::vnp({ikgolem: "hide"})
    
    akizet
        goodbye, geli
        thank you for all your help
    
    sourceless
        a shared, distant guilt carries through our connection, which i understand
        but all know this clueless golem is better left to maintain the cohesion of this θsegment
            EXEC::vnp({geli: "hide"})
        besides, it will be easier to repair once we have stopped the collapse
    
    sys
        NOTICE::'advancing to next memory stream'
            EXEC::vn.done();content.classList.remove('cull-stage')
        ATTENTION::'commencing transfer'
    
    RESPONSES::self
        ok<+>END
            EXEC::change("PAGE!!embassy_day", 3.99);change("TEMP!!ep3->ep4transfer", true);moveTo("/local/ocean/embassy/groundsmindry/")
        wait, stop<+>delay
            EXEC::change("PAGE!!ikawake", false);page.party.partyLimit = 3
        
delay
    self
        cancel the transfer

____SHOWONCE::
____SHOWIF::["ozo__council-task", false]
    moth
        huh? what? why?
    
    self
        something is wrong
        i feel like we can help geli
    
    moth
        seriously? dude it's a memory
        oh, you mean the thoughtform...
        right
        well, you did everything there is to see in this part
        i'm really not seeing anything else
        so there's no harm, but also...
        there's nothing here we could really use
        but there is activity elsewhere in the cyst, so like, 
        maybe you could try finding someone to help
        if you really want to do this, just NAV out and get looking i guess
        but you gotta realize... this is just one thoughtform
        don't forget why we're here
____END
    
    sys
        EXECUTING::'reversion'
    
    RESPONSES::self
        good<+>END
            EXEC::change("PAGE!!embassy_day", 3.5);vn.done();

SKIP::vn.done(); if(env.currentDialogue.branch.name == "start" || env.currentDialogue.branch.name == "begin") { change("PAGE!!embassy_day", 3.99);change("TEMP!!ep3->ep4transfer", true);moveTo("/local/ocean/embassy/groundsmindry/") } else { change("PAGE!!embassy_day", 3.5);change("PAGE!!ikawake", true);page.party.partyLimit = 3 };content.classList.remove('cull-stage')
`)