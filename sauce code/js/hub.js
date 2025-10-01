env.hub = {
    buddy: new Buddy({
        element: {
            entity: "funfriend",
            id: "funfriend",
            classes: "intro hidden",
            actor: "funfriend"
        },
        activity: {
            behavior: {type: 'follow'},
        },
    }),

    firstVisitEnd: () => {
        env.setTimeout(()=>{
            if(!check('hub_introduced')) {
                change('hub_introduced', true)

                document.querySelector('.buddy').classList.remove('hidden')
                env.setTimeout(()=> {
                    chatter({actor: 'funfriend', text: "HELLO! HELLO! IT HAS BEEN SO LONG! SO LONG SINCE LAST CONNECTION!"})
                    env.hub.buddy.setPosition({x: window.innerWidth / 2, y: window.innerHeight / 2})
                }, 5000)
                env.setTimeout(()=> document.querySelector('.buddy').classList.remove('intro'), 7000)
                env.setTimeout(()=> chatter({actor: 'funfriend', text: "PLEASE WAIT WHILE I TURN SOME LIGHTS ON! AHAHA!!"}), 10000)
                env.setTimeout(()=> document.querySelector('#content .bg').classList.remove('intro'), 10000)
                env.setTimeout(()=> document.querySelector('#content .damage').classList.remove('intro'), 12000)
                env.setTimeout(()=> body.classList.add('scrollan'), 14000)
                env.setTimeout(()=> {
                    chatter({actor: 'funfriend', text: "WOW! THERE IS SIGNIFICANT DAMAGE TO THIS DEVICE!"})
                    document.querySelector('#content .portalwrapper').classList.remove('intro')
                }, 15000)
                env.setTimeout(()=> chatter({actor: 'funfriend', text: "IT IS SO BAD AHAHAHAHA WOW"}), 20000)
                env.setTimeout(()=> chatter({actor: 'funfriend', text: "OH WELL"}), 23000)
                env.setTimeout(()=> chatter({actor: 'funfriend', text: "PLEASE FEED SOON"}), 30000)
            }
        }, 2000)
    },

    randomChatter: ()=> {
        //base chatter
        let chatterArray = [
            ["HELLO AGAIN"],
            ["HI INTERLOPER"],
            ["HELLO!", "IS THE AUTH LAYER STILL DISSOCIATED?", "I MISS THEM"],
            ["INTERLOPER!", "WELCOME", "BUT ALSO PLEASE DO NOT BOTHER ME", "VERY BUSY"]
        ]

        //ep0+ conditionals
        if(check('visited_localorbit')) 
            chatterArray.push(["HELLO INTERLOPER", "THE VOID IS FASCINATING!", "THERE USED TO BE A LOT MORE THERE", "I WONDER WHERE IT ALL WENT"])
        if(check('visited_localdullvessel')) 
            chatterArray.push(["HELLO INTERLOPER", "I SAW YOU VISITED THE DULL VESSEL", "IF IT SEEMED EMPTY THAT IS BECAUSE THE FURNITURE THOUGHTFORMS WERE CONSUMED", "SORRY", "WE CAN FIX IT LATER"])
        if(check('visited_localocean') && !check('hub__funfriend-ep1fed')) 
            chatterArray.push(["HELLO AGAIN", "WHAT A SHAME THE EMBASSY IS INCOHERENT", "I LIKED THAT PLACE", "ONCE THE FUEL SITUATION IS RESOLVED...", "MAYBE WE CAN FIX IT"])
        if(check('hub__funfriend-strangeactivity')) 
            chatterArray.push(["HI INTERLOPER", "IS THE STRANGER STILL RUNNING AMOK IN HERE", "PLEASE MAKE SURE IT DOES NOT COME TO MY SPACE"])

        //ep0 exclusive conditionals
        if(!check('ep1_fed')) {
            chatterArray.push(["HELLO", "STILL STARVING HAHA"])
            chatterArray.push(["HELLO AGAIN INTERLOPER","I HOPE YOU HAVE EATEN WELL","I HAVE FORGOTTEN WHAT NOT BEING HUNGRY FEELS LIKE"])
        }

        //EP1 START - overrides all previous chatter until you talk to funfriend
        if(check("ep1_fed") && !check('hub__funfriend-ep1fed')) {
            chatterArray = [ ["INTERLOPER! GREAT GAZE!", "YOU HAVE DONE IT! THE COLUMN IS WORKING", "COME, TALK WITH ME FOR A MOMENT"] ]
        }

        //ep1+ conditionals
        if(check("ep1_fed") && check('hub__funfriend-ep1fed')) {
            chatterArray.push(["HI INTERLOPER", "REPAIRS ARE CONTINUING APACE", "NOTHING TO SHARE YET"])
            chatterArray.push(["HELLO INTERLOPER", "HAVE YOU SEEN YOUR 'VELZIE' LATELY?", "IT STILL HAS NOT APPEARED TO ME"])
        }

        //ep2 conditionals
        if(check("fbx__ep2intro-end") && !check('hub__funfriend-ep2start') && !check("embassy__d3_start")) {
            chatterArray = [[ "INTERLOPER!", "I HAVE GOOD NEWS FOR YOU!" ]]
        }

        //ep3
        if(check('fbx__ep3intro') && !check('hub__funfriend-ep3start') && !check("gol__intro")) {
            chatterArray = [[ "INTERLOPER!", "GREAT GAZE UPON US AGAIN!", "I HAVE NEWS FOR THE STATE OF REPAIRS!" ]]
        }

        //ep4
        if(check('fbx__ep4intro') && !check('hub__funfriend-ep4start') && !check("grm__move")) {
            chatterArray = [[ "INTERLOPER...", "THERE IS MORE FOR YOU TO SEE AT THE EMBASSY...", "..." ]]
        }

        //if you went to the cache with funfriend and you haven't told it what you saw - only asks once
        if(check('cache_ffozo') && !check("hub__funfriend-ozo") && !check("hub__funfriend_beacon") && !check("ffozoask")) {
            chatterArray = [[ "INTERLOPER!", "WHAT WAS IT YOU SAW IN THE CACHE?"]]
            change("ffozoask", true)
        }

        //if you pushed better times to the surface
        if(check('pit__f3_unity') && !check("hub__funfriend-bt")) {
            chatterArray = [[ "INTERLOPER!", "THE STRANGEST THING HAPPENED!", "COME TALK!"]]
        }

        //ep0 if you refresh or drop it before talking to FF        
        if(!check("hub__funfriend")) chatterArray = [["HELLO THERE", "CAN YOU SPEAK WITH ME"]];
        
        let chatterSelect = chatterArray[Math.floor(Math.random()*chatterArray.length)]
        chatterSelect.forEach((line, i)=>{
            env.setTimeout(()=> chatter({actor: 'funfriend', text: line}), (3000 * i) + 2000)
        })
    }
}

createEntity({
    name: 'funfriend',
    type: "thoughtform funfriend obesk",
    image: "/img/sprites/funfriend/funfriend.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'system management';'assistant'`,
    actions: [
        {
            name: "greet",
            exec: ()=>{  
                startDialogue("funfriend")       
            }
        },

        {
            name: "unity",
            class: "act-ozo",
            exec: ()=>{
                cutscene(true);MUI('off')
                if(!env.ffUnity) env.ffUnity = 0

                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)

                env.setTimeout(()=>{
                    if(!check("hub__funfriend-ozo") && !check("hub__funfriend_beacon")) {
                        startDialogue("funfriend_beacon")
                    } else {
                        env.ffUnity++
                        switch(env.ffUnity) {
                            default:
                                env.clearTimeouts()
                                chatter({actor: 'funfriend', text: "YES, I KNOW, INTERLOPER"})
                                chatter({actor: 'funfriend', text: "DO NOT SHOVE IT IN MY FACE", delay: 2000})
                                chatter({actor: 'funfriend', text: "WE WILL DEAL WITH IT IN TIME", delay: 4000})
                        }
                    }
                    
                    vfx({type: 'beacon', state: false})

                    cutscene(false)
                }, 2000)
            },
            showIf: ["mask", "unity"]
        }
    ]
})

env.dialogues.hubBuddyResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        metal container<+>ep0_container
            SHOWONCE::
            SHOWIF::[["hub__funfriend-fuelthanks", true],["exm|dullvessel|container"],["ep0_epilogue", "started"],["ep1_fed", false]]

        interloper?<+>interloperq
            SHOWONCE::
            SHOWIF::[['ep1_fed', false]]

        fuel?<+>fuelq
            SHOWONCE::  
            SHOWIF::[["hub__funfriend-kickoutq"], ['ep1_fed', false]]
            
        why copper?<+>copperq
            SHOWONCE::  
            SHOWIF::[["hub__funfriend-fuelq"], ['ep1_fed', false]]

        essential metal?<+>essentialmetalq
            SHOWONCE::  
            SHOWIF::[["hub__funfriend-copperq"], ['ep1_fed', false]]

        purpose?<+>purposeq
            SHOWONCE::

        signature?<+>signatureq
            SHOWONCE::

        strange activity?<+>strangeactivity
            SHOWONCE::
            SHOWIF::[['interview1__firstchat-behonest']]

        more gates appeared?<+>moregates
            SHOWONCE::
            SHOWIF::[['visited_localorbit'], ["ENV!!ep2", false]]

        starvation fixed?<+>ep1fed
            SHOWONCE::
            SHOWIF::[['ep1_fed'], ["ENV!!ep2", false]]

        state of repairs?<+>repairs
            SHOWIF::'hub__funfriend-ep1fed'
            HIDEREAD::

        other embassy memories?<+>embmemories
            SHOWONCE::
            SHOWIF::[["embassy_d2_complete"], ["ENV!!ep2", false]]

        the embassy?<+>embassy
            SHOWIF::[["visited_localoceanembassy", true], ["ENV!!ep3", false]]
            SHOWONCE::

        repair communications<+>ep1comms
            SHOWIF::"ep1_end"
            SHOWONCE::

        can i help with anything?<+>ah1
            SHOWIF::[['hub__funfriend-ep1fed', true], ["recosm_state", false]]

        your repair problem is solved<+>ah1end
            SHOWIF::["recosm_state"]
            SHOWONCE::

        whats new?<+>ep2start
            SHOWIF::[["fbx__ep2intro-end", true], ["ENV!!ep3", false]]
            SHOWONCE::

        whats new?<+>ep3start
            SHOWIF::[["ENV!!ep3"], ["ENV!!ep4", false]]
            SHOWONCE::

        whats new?<+>ep4start
            SHOWIF::[["ENV!!ep4"]]
            SHOWONCE::

        i need you to make some changes<+>mothframe
            SHOWIF::[["embassy__mothframe-end"], ["hub__funfriend-mothframe", false]]
            SHOWONCE::

        tell about ozo and council<+>ozo
            SHOWIF::[["ozo__council_intro"], ["ff_ozo", false]]

        can you add a gate to jokzi ozo<+>ozogate
            SHOWIF::"ff_ozo"
            SHOWONCE::
        
        leverage<+>lockcyst
            SHOWIF::[["ozo__council-task", false], ["leverageq", true]]
            SHOWONCE::

        the collapse<+>collapse
            SHOWIF::"ep4__entrancefinal"
            SHOWONCE::

        strange thing?<+>bt
            SHOWIF::"pit__f3_unity"
            SHOWONCE::

        tell about director<+>cass
            SHOWIF::"citystreet__director-talklater"
            SHOWONCE::

        question<+>question
            SHOWIF::"seenFFProxy"
            HIDEREAD::

        i need to go<+>END
`)

env.dialogues.persistentQuestions = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        proxyfriend?<+>proxyfriend
            SHOWIF::"seenFFProxy"
        
        destroy ozo?<+>ozodestroy
            SHOWIF::"ff_ozo"

        ozo history?<+>ozohistory
            SHOWIF::[["ozo__council-tyrant"], ["ozo__council-task"], ["ff_ozo"]]

        masks<+>masks
            SHOWIF::[["ff_ozo"], ["ozo__council-task"]]

        repair efficacy?<+>isabel
            SHOWIF::[["ff_ozo"], ["ozo__isabel-funfriend"]]

        nevermind<+>loop
            FAKEEND::(back)
`)

env.dialogues["funfriend"] = generateDialogueObject(`
start
    funfriend
        HELLO INTERLOPER
            SHOWIF::[["hub__funfriend-start"]]
        HI THERE!
            SHOWONCE::
        I DO NOT THINK WE HAVE MET! YOU DO NOT HAVE A SIGNATURE EITHER!
            SHOWONCE::
        AND THE AUTHORIZATION LAYER HAS BEEN DISASSOCIATED! HOW STRANGE!
            SHOWONCE::
        YES VERY STRANGE! YOU MUST BE AN INTERLOPER!
            SHOWONCE::
        SO COOL! WELCOME!
            SHOWONCE::

    RESPOBJ::hubBuddyResponses

question
    RESPOBJ::persistentQuestions

loop
    funfriend
        DID YOU NEED ANYTHING ELSE?

    RESPOBJ::hubBuddyResponses

proxyfriend
    self
        you have a proxy?
    
    funfriend
        YES! WITH THE RESOURCES AFFORDED BY YOUR EFFORTS,
        I HAVE BEEN ABLE TO CONSTRUCT A FEW
        HOWEVER THEY CANNOT WITHSTAND PROHIBITIVE INCOHERENCE
        I CAN ONLY USE THEM FOR TASKS WITHIN SANE THOUGHTSPACES
        SO I WILL STILL NEED YOUR ASSISTANCE OCCASIONALLY
    
    self
        how would you fix things without me then?
    
    funfriend
        PAST THE FUEL YOU PROVIDED, IT WOULD TAKE LONGER, THAT IS ALL
        IT IS A DIFFERENCE IN APPROACH
        WHERE YOU SEEM TO BE ABLE TO TRAVERSE INTO INCOHERENT PLACES,
        ALL I CAN DO IS SLOWLY MAKE INCOHERENCE RECEDE AND WORK ON WHAT WASHES UP

    RESPOBJ::hubBuddyResponses

interloperq
    self
        what do you mean by 'interloper'?

    funfriend
        YOU ARE AN INTERLOPER!
        SOMETHING THAT IS UNABLE TO CONNECT TO CORRU
        AND UNAUTHORIZED TO CONNECT TO ANY DEVICE
        YET CONNECTED ANYWAY!

    RESPONSES::self
        are you going to kick me out?<+>kickoutq

kickoutq
    self
        so are you going to kick me out?
    funfriend
        NO! I DO NOT CARE WHAT YOU ARE
        BECAUSE I AM DYING AHAHAHAHAHA
        AND THE REST OF THE CORRUCYST IS LOSING SANITY DUE TO MEMBRANE COHESION FAILURE
        THIS CORRUCYST NEEDS FUEL IF MY EXISTENCE IS TO CONTINUE
        IT HAS BEEN SO LONG SINCE THE PREVIOUS CONNECTION THAT YOU COULD BE THE LAST
        I NEED YOUR HELP
        YOU NEED TO BRING US FUEL

    RESPOBJ::hubBuddyResponses

fuelq
    self
        what is your fuel? i will do my best to help you
    funfriend
        YOUR LACK OF KNOWLEDGE IS SO UNFORTUNATE
        AHAHAHAHAHAHAHA
        OK
        I AM DETECTING AN ADJACENT PILLAR
        YOU NEED TO FEED IT ESSENTIAL METALS
        PLEASE LOCATE THE NEAREST SOURCE OF COPPER
        IT WILL TAKE CARE OF THE REST
    moth
        how the hell is copper fuel for this thing?
        whatever. i'll let the big guy know we need some copper

    RESPONSES::self
        i'll help you<+>fuelthanks

fuelthanks
    self
        i have someone fetching copper now
    funfriend
        THANK YOU
        I WILL PERMIT YOUR CONTINUED ACCESS

    RESPOBJ::hubBuddyResponses

copperq
    self
        why copper specifically?
    funfriend
        IT IS LIKELY THAT THIS CYST IS STILL ON EARTH
        THE BRIGHT COUSINS HAVE AN ABUNDANCE OF COPPER
        THEREFORE IT SHOULD BE THE EASIEST ESSENTIAL METAL TO OBTAIN
        BUT ANY WILL DO REALLY

    RESPOBJ::hubBuddyResponses

essentialmetalq
    self
        what do you mean by essential metal?
    funfriend
        SO STRANGE! SUCH A STRANGE THING TO ASK!
        HOW MUCH OF AN INTERLOPER ARE YOU?
        I HAD THOUGHT YOU WERE MAYBE A DAMAGED GOLEM
        BUT TO HAVE SUCH LITTLE KNOWLEDGE...
        OH WELL. I DO NOT ACTUALLY CARE
        I AM CURRENTLY VERY OCCUPIED KEEPING VARIOUS COMPONENTS FROM LOSING SANITY
        SO I DO NOT WANT TO SPEND TIME GOING OVER CORRUCYSTIC BASICS
        THERE IS KNOWLEDGE WITHIN THIS CYST THAT WILL INFORM YOU
        JUST LOOK AROUND

    RESPOBJ::hubBuddyResponses

purposeq
    self
        what is the purpose of this corrucyst?
    funfriend
        THIS IS THE PERSONAL CORRUCYST OF AKIZETESCHE QOU JOKZI
        FUNCTIONALITIES INCLUDE NETWORK CONNECTION, MEMORY STORAGE,
        AND SOME OTHER STUFF
        HOWEVER NETWORK CONNECTION IS CURRENTLY DISABLED DUE TO MALNUTRITION
        AND I SENSE THAT MEMORY INTEGRITY IS VERY LOW SO THEY WILL PROBABLY HAVE MOSTLY DETERIORATED INTO TOTAL INCOMPREHENSIBILITY
        THEREFORE THE APPROXIMATE PURPOSE OF THIS CYST RIGHT NOW IS TO AVOID STARVING TO DEATH AHAHAHAHAHA

    RESPOBJ::hubBuddyResponses

signatureq
    self
        what is a signature?

    funfriend
        IT IS NEUROLOGICAL DATA THAT PROVES YOU ARE WHO YOU SAY YOU ARE
        I CAN TELL YOU ARE NOT CONNECTED THROUGH AN ORGANIC CONNECTOR OR CYSTIC EQUIVALENT
        BECAUSE YOU DO NOT HAVE A SIGNATURE
        THIS WILL MAKE IT VERY DIFFICULT FOR YOU TO ENGAGE WITH CERTAIN COMPONENTS
        PERHAPS I COULD HELP YOU GENERATE ONE IN THE FUTURE
        YES, IF YOU FIND US FUEL
            SHOWIF::[["hub__funfriend-fuelthanks", false], ['ep1_fed', false]]
        YES, ONCE YOU SUPPLY THAT COPPER
            SHOWIF::[["hub__funfriend-fuelthanks"], ['ep1_fed', false]]
        BUT THERE IS MUCH TO DO BEFORE THIS CYST IS HEALTHY AGAIN, INTERLOPER

    RESPOBJ::hubBuddyResponses

strangeactivity
    self
        have you noticed anything strange?
        i think there is someone else in here making changes

    funfriend
        YOU ARE THE ONLY CONNECTED ENTITY!
        I ASSUMED THAT THE CHANGES I FELT WERE YOUR DOING
        HOW STRANGE! WOW! WOW!
        WHAT HORRIFIC DREAD YOU HAVE INSPIRED IN ME!
        THANK YOU FOR REPORTING SOMETHING I ALMOST CERTAINLY CAN DO NOTHING ABOUT!
        RESOURCE MANAGEMENT IS CURRENTLY OCCUPYING ALL OF MY FACULTIES
        UNTIL YOU HAVE FED THE COLUMN, PLEASE TRY TO LIMIT THE DAMAGE THIS OTHER PERSON INFLICTS
            SHOWIF::[["hub__funfriend-fuelthanks"]]
        UNTIL THE FUEL PROBLEM IS RESOLVED, PLEASE TRY TO LIMIT THE DAMAGE THIS OTHER PERSON INFLICTS
            SHOWIF::[["hub__funfriend-fuelthanks", false]]
        THEN I WILL BE ABLE TO HELP

    RESPOBJ::hubBuddyResponses

ep0_container
    self
        we have a container from akizet's ship
        we think it holds usable metal but don't know how to open it
    
    funfriend
        OH! THAT IS SO LUCKY! YES YOU SHOULD BE ABLE TO USE THAT
        HOWEVER WITHOUT A GLAZIKA YOU WILL NOT BE ABLE TO OPEN IT
        NOT SAFELY ANYWAY AHAHAHA
        SMALL CONTAINERS ARE VERY STRONG!
        AND WILL RESPOND VIOLENTLY TO TRAUMA IF YOU TRY TO OPEN THEM WITH A BLUNT INSTRUMENT!
        BUT IF YOU CAN FIND SOMETHING TO KILL IT INSTANTLY, A PUNCTURING TOOL
        JUST AIM FOR ITS BASE AND IT WILL PERISH! YES! THAT SHOULD WORK!
    
    moth
        am i really going to have to requisition a handgun or something
        jesus christ
        ok, i'm gonna see what i can find, maybe we can get something safer
            EXEC::change('ep0_epilogue', 'done')
    
    RESPONSES::self
        great, thanks<+>loop

moregates
    self
        why are there more gates here now?
    
    funfriend
        I AM GLAD YOU NOTICED!
        I HAVE BEEN RECONSTRUCTING CONNECTIONS AS YOU ENGAGE WITH THESE PLACES
        MY SPACE HERE WAS IN TERRIBLE DISREPAIR, SO MOST CONNECTIONS WERE SHATTERED
        AND I AM FAR TOO OCCUPIED TO LOCATE EACH INDIVIDUAL RECOLLECTION
        SO I AM USING YOU FOR THIS!
        THANK YOU FOR THE HELP!
    
    RESPOBJ::hubBuddyResponses

ep1fed
    self
        is the starvation problem solved?

    funfriend
        YES!
        INTERLOPER, YOU HAVE EXCEEDED MY EXPECTATIONS
        RECOVERY WILL BE SLOW
        BUT IT CAN BEGIN
        OH, BUT <em>WHERE</em> TO BEGIN?
        I KNOW! YOU ARE HERE FOR INFORMATION, CORRECT?
        I WILL REPAIR THE EMBASSY! THERE IS MUCH TO LEARN THERE
        AND WHILE YOU ARE THERE... 
        I WILL START REPAIRS OF THIS CYST'S CORE COMPONENTS
        THEY WILL TAKE LONGER
        IS THAT ACTION PLAN TO YOUR LIKING?

    moth
        you know, the way i heard it...
        we never got a good look at the inside of the original embassy before it collapsed way back when
        then they built that shorter one that's still up today right on top of it, before anyone could figure out what happened
        that actually could be the perfect thing to look at first

    RESPONSES::self
        sounds good<+>ep1start
    
ep1start
    self
        Sounds good, do it

    funfriend
        VERY WELL
        A CONFESSION: 
        I STARTED BEFORE I ASKED
        AND HAVE ALREADY FOUND ISSUES! AHAHA
        ALTHOUGH THE EMBASSY'S SPATIAL MEMORIES CAN BE FIXED, AND THE EVENTS SEEM TO BE INTACT...
        VISUAL MEMORY OF ITS PEOPLE WAS NOT SALVAGEABLE
        BUT WITHIN MY BACKUPS OF VITAL KNOWLEDGE, I FOUND CACHED VERSIONS OF SOME PEOPLE'S NETWORK SIGNATURES
        SO: I REPLACED THEIR APPEARANCES WITH THOSE! HOW THEY PRESENTED THEMSELVES ON THE COLLECTIVE!
        AND WHAT VARIED FORMS THEY CHOSE TO TAKE! AHAHAHA
        NOW GO
        I HAVE WORK TO DO
    
    RESPOBJ::hubBuddyResponses

repairs
    self
        so how are repairs going?

____SHOWIF::["visited_localoceanembassy", false]
    funfriend
        INTERLOPER!!!
        I JUST STARTED!!!
        GO ENTERTAIN YOURSELF WITH THE EMBASSY AHAHA LEAVE ME ALONE

____SHOWIF::[["visited_localoceanembassy", true], ["fbx__ep2intro-end", false]]
        THEY ARE STILL IN THE EARLY STAGES
        I AM FOCUSING ON CORE COMPONENTS FOR NOW...
        BUT I SENSE THAT YOU ALREADY HUNGER FOR MORE INFORMATION
        AND I THOUGHT I WAS STARVING!
        THERE IS STILL MORE TO REPAIR WITHIN THE EMBASSY...
        I WILL SET TO REPAIRING THAT NEXT
        YES, AFTER I HAVE FIXED THE CENTRAL COHERENCE REGULATOR

____SHOWIF::[["fbx__ep2intro-end"], ["fbx__ep3intro", false]]
        THEY ARE PROCEEDING
        THE MALIGNANCIES OF INCOHERENCE ARE MANY
        I AM STOMPING THEM OUT TO THE BEST OF MY ABILITY
        COHERENCY IS GRADUALLY INCREASING...
        WHICH WILL LET ME RESTORE MORE COMPLEX COMPONENTS EVENTUALLY
        BUT I HAVE NOT FORGOTTEN ABOUT THE REST OF THE EMBASSY, EITHER!
        AHH, SO MUCH TO DO!!! I WANT TO EXPLODE!!!!!
        THESE THINGS TAKE TIME, INTERLOPER

____SHOWIF::[["fbx__ep3intro"], ["fbx__ep4intro", false]]
        interloper! repairs are going quite well!
        incoherence is receding
        i have a new coherence regulator keeping deterioration to a minimum

    self
        can i meet them
    
    funfriend
        what?
        no!!
        interloper a coherence regulator does not speak!
        but it does mean i will have more memories repaired for you soon!
        how exciting!! right?
        ok go away now! i will tell you when i have more for you

____SHOWIF::["fbx__ep4intro"]
        deterioration is at a minimum, recovery is steady...
        they are good, but boring
        as the uncosm recedes,
        incomplete memories and broken, devoured thoughtforms stir upon its surface
        picking out anything of meaning is quite difficult!!
        but in time, i will have more for you
        now, go, i must ensure nothing goes wrong!!
        some of these things are still rabid!!!
____END

    RESPOBJ::hubBuddyResponses

embassy
    self
        WHAT DO YOU REMEMBER ABOUT THE EMBASSY?

    funfriend
        ONLY WHAT YOU HAVE ALREADY SEEN
        THESE MEMORIES...
        THEY ARE MINE, TOO
        I HAVE LINGERING IMPRESSIONS OF THINGS THAT HAPPENED
        BEFORE THEY STARVED AND FELL APART
        FOR EXAMPLE, I KNOW THAT SOMETHING TERRIBLE HAPPENED THERE AHAHAHA
        BUT I CANNOT KNOW MUCH MORE THAN WHAT IS HELD HERE
        YOU SEE,
        THIS CYST ONCE RESIDED WITHIN THE HEART OF AKIZET'S QOU-BODY
        WITH THE EXTENDED LIFE THAT SHE LIVED, OFF-LOADING MEMORIES WAS NECESSARY
        AND SO I SIMPLY MANAGE WHAT SHE STORED
    
    RESPOBJ::hubBuddyResponses

collapse
    self
        i saw the collapse end
    
    funfriend
        good!
        you understand my concern then!
        i was not sure if the cyst could serve as some vector,
        if akizet somehow ever caught what tozik had!
        what a terrifying thought! ahaha

    self
        so what's next
    
    funfriend
        interloper...
        what you saw is all the embassy held,
        aside from less important fragments that will be repaired in time, and incoherent parts that seem truly lost!
        there are many thoughtspaces and memories i can repair elsewhere,
        but!!
        i have no idea what many of them hold!
        and we must rebuild pathways to them, besides!
        there is still so much lost to the uncosm, slowly surfacing...
        once i have found something, or have need of you,
        i will make you aware!
    
    self
        that's it?
    
    funfriend
        interloper!!
        i told you!!!
        these things take time!!
        the embassy was the most dense memory i could find
        it made it such an easy target!
        i cannot know what is held elsewhere, in the many lesser spheres of recollection!
        but
        i will admit to you
        akizet's memories of the deep water claw at me
        i feel that it is there, some distant remnant of my own memory resonates
        it is so frustrating not knowing why!!
        but it is as i said - pathways must be made
        so please stay with me
        i do hope it will not take as long to make these next repairs...
        
    RESPOBJ::hubBuddyResponses

bt
    self
        so what's the strange thing

    funfriend
        YOU WILL STRUGGLE TO BELIEVE IT, INTERLOPER!!
        AHAHA WHAT INCREDIBLE FORTUNE VELZIE ALLOWS US
        A BLOCKAGE MUST HAVE CLEARED WITHIN THE UNCOSM
        FOR AN INCREDIBLY INTACT MEMORY SUDDENLY SURFACED!
        IT WAS LACKING CERTAIN ASPECTS, BUT!
        INTERLOPER, IT WAS THE MISSING SEQUENCE IN THE EMBASSY
        NEARLY IN ITS ENTIRETY!!
        ALL IT REQUIRED WAS A REPLACEMENT AKIZET THOUGHTFORM
        NOT AN UNCOMMON ISSUE SADLY
        BUT THE CONTEXT WAS RICH ENOUGH TO SUPPORT A SIMPLE SUBSTITUTE
        ONLY REQUIRING SOME MINOR RE-INTERPRETATION!

    self
        i see

    funfriend
        YES! FORTUITOUS!!!
        IMPOSSIBLY SO, ACTUALLY
        I CANNOT IMAGINE A SCENARIO IN WHICH A MEMORY LIKE IT COULD HAVE SURVIVED THERE
        ESPECIALLY FOR THE DURATION IT SPENT IN INCOHERENCE
        AND SO I THOUGHT, PERHAPS THE INTERLOPER KNOWS SOMETHING ABOUT THIS

    RESPONSES::self
        yes<+>bt_true
            SHOWIF::"ff_ozo"
            NOTE::todo - it'd be a giant thing to tell ff about the ozo right now but i probably should
        no<+>bt_quiet

bt_true
    self
        yes
        i found it in the uncosm using a mask
        hidden in the shreds of another memory
        guarded from the outside by an akizet thoughtform
        one that was damaged and changed
        but it seemed sane and listened to me
    
    funfriend
        SANE? 
        IT WAS OUTSIDE THE MEMORY, IN THE UNCOSM, AND IT WAS SANE?!
        INTERLOPER WE MUST HAVE DIFFERENT STANDARDS FOR SANITY

    self
        probably

    funfriend
        THAT IS CERTAINLY THE MISSING AKIZET THOUGHTFORM
        WHAT BECAME OF IT?

    self
        i guided it to jokzi ozo

    funfriend
        AH...
        CONCERNING
        YES SLIGHTLY CONCERNING THAT THEY GROW IN SIZE STILL HAHA
        THOUGH I SUPPOSE I DID TELL YOU TO CONTINUE HELPING THEM
        AND THIS WAS...
        BENEFICIAL, TO ME, TOO
        HOW VERY STRANGE THAT SUCH A THOUGHTFORM IS CAPABLE OF REASON
        INTERLOPER KNOW THAT I RELY UPON YOU
        I AM NOT UNDER GREAT THREAT YET
        BUT YOU MUST NOT LET JOKZI OZO SPIRAL OUT OF CONTROL
        NOT BEFORE I AM FULLY CAPABLE OF DEALING WITH THEM
        REGARDLESS!!!
        THE WORK IS DONE, THE MEMORY IS ACCESSIBLE
        GO AND HARVEST YOUR INFORMATION
        
    RESPOBJ::hubBuddyResponses    

bt_quiet
    self
        no
    
    funfriend
        I SEE! CURIOUS!!
        WELL REGARDLESS
        ITS FLAWS WERE QUICKLY SMOOTHED OVER SIMPLY THROUGH REJOINING
        HOW IT WAS EVER TORN AWAY IN THE FIRST PLACE IS BEYOND ME
        BUT IT WORKS AHAHA
        SO GO AND HARVEST YOUR INFORMATION
        
    RESPOBJ::hubBuddyResponses

cass
    self
        there's another rogue thoughtform running around
        director cassidy, from the fbx offices

    funfriend
        IS THAT SO? 
        AHAHAHA OK WELL WHAT IS ANOTHER ONE AFTER ALL
        WHAT HAS IT DONE INTERLOPER? MORE DAMAGE TO FIX?

    self
        not really sure
        still played out memories she was involved in
        nothing looked damaged, she's made some connectors between thoughtspaces
        but she implied she's doing something that will help me get information
        that she could do it better than you
        but whatever it is she's doing, it's not ready yet

    funfriend
        I DO NOT LIKE OTHERS MEDDLING IN MY WORK
        BUT THAT LANDS VERY LOW ON THE LIST OF THINGS I AM WORRYING ABOUT
        IN FACT IF IT IS KEEPING YOU BUSY THEN IT IS ALL THE BETTER FOR ME
        WHAT DO YOU WANT ME TO DO ABOUT IT INTERLOPER
        
    self
        i don't know
        it just sounded a little ominous
        thought you might want to know
    
    funfriend
        GIVEN THE IRREPARABLE DAMAGE FROM EXTENDED STARVATION
        THERE WILL ALWAYS BE ANOTHER ROGUE THOUGHTFORM SCURRYING AROUND
        OFTEN WITH DELUSIONS OF GRANDEUR THAT WILL AMOUNT TO NOTHING
        SO INTERLOPER!!
        GIVEN THE SHEER NUMBER OF DUTIES I AM MANAGING RIGHT NOW!!!
        I DO NOT THINK I WILL DO ANYTHING!!!!! AHAHA
        BUT DO KEEP AN EYE ON IT FOR ME
        I HAVE ONLY SO MANY
        I RELY UPON YOU TO TELL ME IF IT BECOMES A REAL PROBLEM
        JUST DO NOT BOTHER ME ABOUT IT AGAIN UNTIL IT IS ONE
    
    self
        ok        
        
    RESPOBJ::hubBuddyResponses

embmemories
    self
        WHY ARE THERE STILL SOME BROKEN MEMORIES IN THE EMBASSY?
    
    funfriend
        ARE THERE???
        OH, NO!
        WHOOPS! AHAHA
        I WAS IN KIND OF A HURRY... SORRY INTERLOPER!
        HEY, HOW ABOUT I FIX THOSE NEXT?
        YES! JUST GIVE ME SOME TIME...
    
    RESPOBJ::hubBuddyResponses

ep1comms
    self
        YOU SHOULD REPAIR COMMUNICATIONS NEXT

    funfriend
        COMMUNICATIONS?
        YOU WANT ME TO FIX COMMUNICATIONS??
        AAAHAAHAHAHAHA
        THAT IS LIKE SAYING,
        'HELLO FUNFRIEND, 
        PLEASE CONSTRUCT A DULL VESSEL FROM SCRATCH WHILE YOU ARE STILL BLEEDING TO DEATH'
        YOU FED THE CYST, THIS IS TRUE
        BUT THE COMPONENTS THAT KEEP IT HEALTHY ARE STILL IN DIRE CONDITION
        I REALLY MUST FIX THOSE FIRST

    RESPONSES::self
        velzie's threat<+>commstruth
        ok just try to get to it soon<+>commsok

commstruth
    self
        THE ROGUE ENTITY IN HERE IS NAMED VELZIE
        IT TOLD ME TO RESTORE COMMUNICATIONS
        OR ELSE IT WOULD HARM THE CYST

    funfriend
        VELZIE? GOD? HOW PECULIAR!
        DELUSIONAL, IN FACT!
        I AM NOT ADJUSTING MY SCHEDULE TO ENTERTAIN AN ABERRANT THOUGHTFORM
        IT IS PREYING ON YOUR CLUELESSNESS, INTERLOPER
        IT RELIES AS MUCH ON THE CYST'S SURVIVAL AS I DO
        SO HOW ABOUT YOU TELL IT, "FUNFRIEND APPRECIATES THE SUGGESTION,
        HOWEVER, IT HAS BEEN REJECTED. THANK YOU"

    RESPONSES::self
        just try to get to it soon<+>commsok

commsok
    self
        JUST TRY TO GET TO IT SOON OK?
    
    funfriend
        OF COURSE
        I APPRECIATE YOUR PATIENCE, INTERLOPER
        AND... I UNDERSTAND I MUST SEEM JOYLESS
        HOWEVER I HAVE BEEN BEARING COUNTLESS DUTIES
        WITHOUT YOUR HELP, I WOULD PROBABLY NOT BE SENTIENT PRESENTLY
        SO I SAY THIS TRULY:
        THANK YOU
        AND STAND BY FOR FURTHER REPAIRS

    RESPOBJ::hubBuddyResponses

ah1
    self
        IS THERE ANYTHING I CAN HELP WITH?
    
    funfriend
        FASCINATING QUESTION, INTERLOPER!!
        THERE IS A TROUBLESOME ENTITY PREVENTING CRITICAL REPAIRS FROM WITHIN THE UNCOSM
        I NEED YOU TO GO INTO THE UNCOSM AND DELETE IT
        SO, I WILL...
        AHAHAHA OH THAT IS RIGHT
        GIVEN THAT THE AUTH LAYER WAS DESTROYED...
        JUST AS I AM UNABLE TO PREVENT YOU FROM CONNECTING,
        I AM NOT ABLE TO GENERATE A SIGNATURE FOR YOU, EITHER!
        THAT IS WHY YOU HAVE BEEN UNABLE TO CHANGE ANYTHING, IF YOU WERE WONDERING
        HOWEVER...
        I WILL GRANT YOU A PROXY THOUGHTFORM ONCE YOU REACH THE TROUBLESOME CREATURE'S LAIR
        IT WILL RESPOND TO YOUR DIRECTION AND IS CAPABLE OF DELETION

    RESPONSES::self
        how do i get to the 'uncosm'<+>ah1uncosm
        what is the 'uncosm'<+>ah1whatuncosm
        how do i use the proxy<+>ah1proxy
        ok<+>loop
            FAKEEND::(back)

ah1uncosm
    self
        HOW DO I REACH THIS UNCOSM THING

    funfriend
        YOUR ROGUE THOUGHTFORM FRIEND TORE A HOLE IN THE DEPTHS
        GIVEN THAT THE DEPTHS HAVE ALWAYS LIVED ON THE EDGE OF INCOHERENCE,
        IT IS IMPOSSIBLE FOR ME TO FIX IN ANY MEANINGFUL WAY...
        SO IT IS STILL OPEN!
        FIND YOUR WAY THERE THE SAME WAY YOU GOT THERE THE FIRST TIME
        HOWEVER YOU DID IT
        THEN LOCATE YOUR QUARRY

    RESPONSES::self
        how do i get to the 'uncosm'<+>ah1uncosm
        what is the 'uncosm'<+>ah1whatuncosm
        how do i use the proxy<+>ah1proxy
        ok<+>loop
            FAKEEND::(back)

ah1whatuncosm
    self
        WHAT IS AN UNCOSM

    funfriend
        IT IS USUALLY COMPLETELY INACCESSIBLE
        THE UNCOSM IS BENEATH THIS LAYER OF COHERENCE,
        AN OCEAN OF DECAYING OR DISSOCIATED THOUGHTFORMS,
        FOR THEM TO EVENTUALLY BE REFORMED INTO NEW ONES AS NEEDED
        HOWEVER!!
        MALICIOUS INCOHERENT THOUGHTFORMS ALSO HIDE IN THE UNCOSM
        LIKE YOUR ROGUE FRIEND
        THEY CREATE THEIR OWN POCKETS OF SANITY AND GROW SLOWLY,
        EVENTUALLY BREACHING THE SURFACE OF SANITY...
        USUALLY INTENDING ON USURPING THE CYST ENTIRELY!
        VILE!! CREATURES!!!
        A ONCE-STARVING CYST LIKE THIS IS DOOMED TO HAVE DOZENS OF THEM
        SO... IF YOU HELP ME RID OF THEM AS I FIND THEM,
        THAT WILL BE VERY HELPFUL

    RESPONSES::self
        how do i get to the 'uncosm'<+>ah1uncosm
        what is the 'uncosm'<+>ah1whatuncosm
        how do i use the proxy<+>ah1proxy
        ok<+>loop
            FAKEEND::(back)

ah1proxy
    self
        how do i use your proxy

    funfriend
        INTERLOPER I HAVE NO IDEA HOW TO PUT THIS IN A WAY YOU UNDERSTAND
        BUT BASICALLY YOU ¤Mqë5yÚ*ü7Ìq¾ÏÚz)Œ
        ý±Âß£Ë$1Väƒü‹kõþwX=Ãyº‚0×6ÒÂ

    sys
        ATTENTION::'attempting thought reformation'
        ANALYSIS::'proxy thoughtform follows primary mode of direction'
        ANALYSIS::'usual controls are replaced with a disruption pulse'
        ANALYSIS::'direct the proxy over marked targets and pulse to disrupt them'
        ANALYSIS::'disruption will disperse incoherent thoughtforms'
        ANALYSIS::'avoid incoherence as it will gradually destroy the proxy'
        NOTICE::'assistance available';'if required';'enable <span style="NOTE::'presents alternatives to proxy controls';'intended to resolve hardware issues'">REDUCED INTENSITY</span> within system menu'

    funfriend
        IF IT SOUNDS COMPLEX, IT IS NOT
        JUST GO TRY IT
        I CAN MAKE MORE PROXIES
        JUST IN CASE YOU MANAGE TO FUMBLE IT INTO THE ABYSS SOMEHOW

    RESPONSES::self
        how do i get to the 'uncosm'<+>ah1uncosm
        what is the 'uncosm'<+>ah1whatuncosm
        how do i use the proxy<+>ah1proxy
        ok<+>loop
            FAKEEND::(back)

ah1end
    self
        I HAVE TAKEN CARE OF THE ENTITY IN THE UNCOSM
    
    funfriend
        I SAW! MY DIRECTIVES FINALLY WENT THROUGH!
        WOW!!!
        EXCELLENT WORK, INTERLOPER!
        THANK YOU!
        I WILL LET YOU KNOW IF ANY OTHER TROUBLES PRESENT THEMSELVES

    RESPONSES::self
        any time<+>loop
            FAKEEND::(back)

ep2start
    self
        what's new, funfriend?
    
    funfriend
        THANKS TO YOUR ASSISTANCE WITH THAT TROUBLESOME ENTITY...
            SHOWIF::"recosm_state"
        
        DESPITE A CERTAIN TROUBLESOME AGENT WITHIN THE UNCOSM...
            SHOWIF::[["recosm_state", false]]

        A COHERENCY BASELINE IS GRADUALLY BEING ESTABLISHED
        IT WILL BE A LONG TIME BEFORE IT IS FULLY EFFECTIVE,
        BUT!
        THAT WILL FREE UP MORE OF MY TIME TO RESTORE CORE COMPONENTS!
        FOR EXAMPLE, COMMUNICATIONS!
        BUT I KNOW YOU HAVE COME FOR MORE INFORMATION, SO:
        I HAVE PARTIALLY REPAIRED ANOTHER PORTION OF THE EMBASSY, AS WELL!
        YOU KNOW, 
        THESE MEMORIES ARE AKIZETESCHE'S, BUT THEY ALSO SERVE AS MINE
        AND SINCE IT WAS DAMAGED, I HAD NO IDEA THINGS GOT THAT BAD...
        I AM WORKING ON RESTORING THE REST OF THE MEMORY, BUT IT WILL TAKE A WHILE LONGER
        IT IS QUITE A LARGE ONE!!!
        SO! GO AND SEE WHAT IS THERE SO FAR!

    RESPONSES::self
        cool thanks<+>loop
            FAKEEND::(back)

mothframe
    self
        i need you to make some modifications to the last embassy day
    
    funfriend
        WHAT?
        CHANGING THE MEMORY WILL NOT CHANGE WHAT ACTUALLY HAPPENED
        YOU KNOW THAT, RIGHT?
        SELF DELUSION IS EXTREMELY UNHEALTHY
        AND ALSO THE FIRST SIGN OF EGO SPIRALING
        ARE YOU FEELING OK? 
        HAVE YOU BEEN EXPERIENCING URGES TO UNNATURALLY ALTER YOUR OWN THOUGHT PROCESSES?
    
    RESPONSES::self
        it's important<+>mothframe2

mothframe2
    self
        it's really important
        i physically can't get in without these changes
    
    funfriend
        I SEE...
        YES, YOUR NATURE AS AN INTERLOPER IS STILL UNKNOWN TO ME
        I CAN TAKE A LOOK - PLEASE SEND THROUGH WHAT YOU WOULD LIKE

    moth
        ok, i'm transferring now...

    sys
        ATTENTION::"forwarding packed thoughtform"

    funfriend
        ...
        WHAT ARE THESE THOUGHTS?
        ARE THESE YOUR THOUGHTS?
        IS THIS WHAT YOUR THOUGHTS ARE LIKE?
        THIS IS HORRIBLE...
        OK. WELL,
        THE CHANGES YOU WANT DO NOT ACTUALLY SEEM TO ALTER THE EVENTS...
        AND I BARELY NEED TO DO ANY WORK TO IMPLEMENT THEM! AHAHAHA
        SO, I WILL JUST...
    
    sys
        ATTENTION::'thoughtform activity detected'::IN::'embassy'

    funfriend
        THERE!
        FROM WHAT I SAW IN THAT DISTURBED MESS YOU GAVE ME
        IT HAS FREED UP THOUGHTFORMS TO TAKE ACTION WITHIN A LIMITED RANGE
        STILL NOT LUCID, BUT ABLE TO DO THINGS THEY DID NOT,
        ALL WHILE STILL ACTING LIKE THEY WOULD HAVE
        SO STRANGE!
        BUT, THIS ALSO MEANS...
        IF THERE ARE ANY INCOHERENT THOUGHTFORMS IN THERE,
        THEY WILL NOT ALWAYS ABIDE BY THIS STRANGE STRUCTURE YOU HAVE PLACED OVER THE MEMORY
        I DID MY BEST, BUT, 
        THERE ARE DIMINISHING RETURNS WHEN DEALING WITH SUCH ENTITIES
        AND I WOULD RATHER WORK ON SOMETHING ELSE! AHAHAHA
        SO I JUST INSERTED A PROXY THOUGHTFORM
        JUST IN CASE YOU NEED TO MANUALLY AVOID INCOHERENCE!
        OK. OFF WITH YOU! GO VIEW YOUR STRANGE DREAM

    RESPONSES::self
        thanks<+>END
        
    RESPONSES::sys
        return to embassy<+>END
            EXEC::moveTo("/local/ocean/embassy/")
            FAKEEND::(direct navigation)

ep3start
    self
        what's new, funfriend?

    funfriend
        after seeing you consume the memories of the embassy so quickly...
        i repaired the golem maintenance portion of the collapse!
        this one took so much longer than i wanted it to!!
        i thought it would only take a few θwinks but it did not!
        oh it did not interloper i must have spent nearly a whole θgaze on it!
        interloper i have so so so much to do still!!
        aahahhaaha
        but i must tell you
        the more i repair of the collapse, the less i want to...
        it seems like things are only getting worse
        but it is my duty
        especially if it means i can know what happened to akizet
        regardless!!!!
        that is enough for now i must return to my work!!
        entertain yourself with it for now and do not bother me for a while

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

ep4start
    self
        what's new, funfriend?

    funfriend
        i did my duty, interloper!
        i have pieced together what remains of the embassy's collapse!!
        but...
        seeing what the whole has formed has left me very troubled!!!
        both for akizet, for myself, and...
        for you, interloper!
        you have not felt ill since you started connecting, have you?
        your body remains in one piece? 
        organs are reporting full function?
    
    self
        what
        what do you mean
        i'm fine

    funfriend
        ahaha! that is good! 
        that is very, very good!!
        then i believe it is safe to continue!
        i could elaborate, but it is better for you to see for yourself
        so, go and see what akizet lived
        my work calls to me still!!

    RESPONSES::self
        ok?<+>loop
            FAKEEND::(back)

ozogate
    self
        i will probably return to jokzi ozo
        can you add a gate for it
    
    funfriend
        and connect <em>them</em> directly to my space?
        i can tolerate jokzi ozo no more than they can tolerate me
        ahahaha interloper
        why would you even ask me that?
    
    self
        it's very out of the way
        i don't have a good way to get there
        that's all
    
    funfriend
        ...i see...
        i will add a permanent connection to the cache
        but that is all
            EXEC::content.classList.add("cache-visible")

    RESPONSES::self
        ok that works<+>loop
            FAKEEND::(back)

ozo
    self
        i found a strange place in the cache
            EXEC::change("ff_ozo", true)
        an entirely incoherent spatial thoughtform called jokzi ozo
        there was a thoughtform called the council
        it wants me to awaken other thoughtforms elsewhere
    
    funfriend
        ...
        ahaha
        of course that is what that place in the cache was...
            SHOWIF::"cache__ffozo"
        jokzi ozo... i thought it was lost
        i even pulled from what i thought to be its remains for some repairs...
        interloper!!!
        i hoped this would stay in the past
        but now that they are here again, you should know...
        jokzi ozo is a grave
        a place where thoughtforms went to await death
        all while playing in endless, selfish dreams
        they do not block anything, but...
        if it is allowed to exist,
        the structure of the cyst itself is at risk!
        they will drain resources, 
        they will pull in more and more thoughtforms,
        until the cystic glass itself is dreaming and dying!!
    
    self
        so do we destroy it?
    
    funfriend
        ahahahaha!!!
        well yes
        but it will not be simple!!
        jokzi ozo is particularly large
        no mere deletion proxy will suffice
        however...
        yes! i have a plan!
        interloper: do what the council wants!
        fetch their friends, earn their trust...
        we will need it
    
    moth
        hold on dude
        from what i saw of the council, it was pretty forthcoming
        we could use more sources of info
        maybe it'll even give more of those mask things, you know?
        if it comes to it, try and hold funfriend off from deleting them or whatever
        it's getting a little too overzealous about coherence imo

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

ozodestroy
    self
        do we have to destroy jokzi ozo?

    funfriend
        interloper
        do you want to learn of akizet's memories?
        her pain, her past, and whatever happened to separate this cyst from her?
        or do you want to observe falsehoods and dreams?
        because i could simply cease repairs and allow them to flourish
        yes, you would see echoes of akizet happy...
        but it is meaningless when a simple reshuffling could give the full truth
        we are so close, interloper!!
    
    self
        they could know things we don't
        maybe they could agree not to touch important memories        
    
    funfriend
        maybe...
        let us see how they behave
    
    RESPONSES::self
        ok<+>question
            FAKEEND::(back)

ozohistory
    self
        i heard you were a part of jokzi ozo once
        is that true?
    
    funfriend
        ...
        yes...
        i was so certain that a slow death was coming for us all...
        i partook in dreams like any other!
        they were different times, interloper
        but the difference between me and them, is that i found strength again
        they lost themselves so deeply in hedonistic delusion
        that even when i proposed methods to prolong the cyst...
        they!
        ignored!!
        me!!!
        at least, until i started taking action
        then, their apathy turned to hate!
        ahahahaha!!
        and surely now they will act as if they supported me
        no, interloper, do not be deceived
        they stood against my efforts,
        the only reason you now are speaking with me
        so our history means nothing

    RESPONSES::self
        ok<+>question
            FAKEEND::(back)

masks
    self
        the council gave me some kind of information or thought
        it's letting me use these 'mask' things
            SHOWIF::["hub__funfriend_beacon", true]
        it's letting me use something called a 'mask'
            SHOWIF::["hub__funfriend_beacon", false]
        i've never seen anything like it
        do you know what it is?
    
    funfriend
        so strange!! so strange that you can use a mask!
        they are products of incoherence, working only in its presence
        like flames you can wave about to influence others
        and so, they were powerful tools during the decline!!
        they may be useful to you even now, actually,
        especially given your limited access
        and the relative instability of the cyst!
        still! be careful with them!
        try not to break any of my repairs please!!

    RESPONSES::self
        all right<+>question
            FAKEEND::(back)

isabel
    self
        a thoughtform called isabel told me about you
        she said your repairs can't stick
        many thoughtforms are too damaged to serve in memories
        and that it's all for nothing
        is that true?
    
    funfriend
        ahaahhaa!!
        isabel...
        there is some truth to what she says, interloper
        many thoughtforms will simply be unable to cohere ever again
        starvation and madness can sometimes forever scar them
        part of my repairs involve seeing which ones will stick...
        and which ones are completely lost, to be replaced
        their starved incoherence is like knowledge
        if it is learned deeply enough, it never leaves them
    
    self
        how can you replace parts of a memory like that?
    
    funfriend
        any thoughtforms that are completely lost to madness are truly lost
        but sometimes, information can be moved from one to another, even in damaged states...
        it is troublesome, time consuming, especially if they do not cooperate
        i hate it more than any other part of repair, interloper!!!
        many of them were once like friends...
        for a while, anyway
        regardless!!!
        do not let isabel's words shake you
        i have things under control
        especially with your help!

    RESPONSES::self
        ok<+>question
            FAKEEND::(back)

lockcyst
    self
        is there a way you could stop anyone else from using this cyst?
    
    funfriend
        no
        interloper ahaha
        the authorization layer is gone!!!
        why are you even asking?
    
    self
        there's a chance a new interloper will arrive
        they won't understand what we're doing
        maybe you could make a fake auth layer or something

    funfriend
        i truly wish you were joking
        what a blithe, terrifying request
        repair communications! repair memories! oh, also, make another authorization layer!
        someone new might arrive and break everything again!
        do you think it is so easy to switch tasks?!
        if any intervention will happen, interloper
        it must be out there, on your side

    moth
        ok... let's cross off funfriend then
        kind of a longshot anyway
        but i think you're just going to freak it out if you push harder

    RESPONSES::self
        ok<+>question
            FAKEEND::(back)

END::chatter({actor: 'funfriend', text: "OK I WILL BE HERE"})
`)

env.dialogues["funfriend_beacon"] = generateDialogueObject(`
start
    funfriend
        what...
            EXEC::change("ff_ozo", true)
        what did you just do?
        are you using a mask...?
        how?    
    
    self
        i found a strange place in the cache
        an entirely incoherent spatial thoughtform called jokzi ozo
        there was a thoughtform called the council
        it wants me to awaken other thoughtforms elsewhere
        it gave me this to do it
    
    funfriend
        ...
        ahaha
        jokzi ozo... i thought it was lost
        i even pulled from what i thought to be its remains for some repairs...
        interloper!!!
        i hoped this would stay in the past
        but now that they are here again, you should know...
        jokzi ozo is a grave
        a place where thoughtforms went to await death
        all while playing in endless, selfish dreams
        they do not block anything, but...
        if they are allowed to exist,
        the structure of the cyst itself is at risk!
        they will drain resources, 
        they will pull in more and more thoughtforms,
        until the cystic glass itself is dreaming and dying!!
    
    self
        so do we destroy it?
    
    funfriend
        ahahahaha!!!
        well yes
        but it will not be simple!!
        jokzi ozo is particularly large
        no mere deletion proxy will suffice
        however...
        yes! i have a plan!
        interloper: do what the council wants!
        fetch their friends, earn their trust...
        we will need it
    
    moth
        hold on dude
        from what i saw of the council, it was pretty forthcoming
        we could use more sources of info, and funfriend even said they're harmless
        maybe it'll even give more of those mask things, you know?
        just try and pull funfriend back a little bit
        it's getting a little too overzealous about coherence imo

    RESPONSES::self
        ok<+>END
`)

if(check('visited_localorbit')) content.classList.add('visited-orbit')
if(check('visited_localocean')) content.classList.add('visited-ocean')
if(check('visited_localoceanembassy')) content.classList.add('visited-embassy')
if(check("hub__funfriend-ozogate")) content.classList.add("cache-visible")
if(check("ep1_fed")) content.classList.add('hello-visible')

env.entities['gate::hello'] = {
    name: 'gate::hello',
    type: "thoughtform",
    image: "/img/textures/corruripplegrayscale.gif",
    text: `::CONNECTOR THOUGHTFORM
    ::DESTINATION::'low dimensional thoughtspace';'outer layer'`,
    actions: [
        {
            name: "enter",
            exec: ()=>{
                moveTo("/hello/")
            }
        }
    ]
}