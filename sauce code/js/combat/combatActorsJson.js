
// for reused actor reactions
if(typeof env.COMBAT_REACTIONS == "undefined") env.COMBAT_REACTIONS = {
    basic_incoherent: {
        catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
        dead: ["¿", "???"]
    },

    husk: {
        evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er", "", "", "", "", "", ""],
        crit: ["Ü di¢ö1€Oe Î", "R E TU RN", "", "", "", "", "", ""],
        receive_crit: ["hu r ts", "", "", "", "", "", ""],
        receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ", "", "", "", "", "", ""],
        puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ", "", "", "", "", "", ""],
        receive_buff: ["µÿÁiKp%Ñ", "", "", "", "", "", ""],
        receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct", "", "", "", "", "", ""],
        receive_vulnerable: ["ƒøÊ=è¶", "s e e", "", "", "", "", "", ""],
        receive_carapace: ["MËºY¾Ñ", "", "", "", "", "", ""],
        receive_redirection: ["f ina l ly aw  ake", "", "", "", "", "", ""],
        stun: ["o u  t ou t o ut", "ou to u t o  ut", "", "", "", "", "", ""],
        regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e", "", "", "", "", "", ""],
        give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ", "ḧỂḺᵽ", "ḧỂḺᵽ YºŮ", "ⱤEMŒM BEɌ", "", "", "", "", "", ""],
    },
    
    perturbed: {
        catchall: ["...", "", "", "", "", "", ""],
    },

    silent_creature: {}
}

if(typeof env.COMBAT_ACTORS == "undefined") env.COMBAT_ACTORS = {
    generic: {
        name: "GENERATED",
        maxhp: 10, // note to modders - now, if you don't specify HP, it just falls back to maxHP
        actions: [
            "primary",
            "secondary", 
            "evade"
        ],
        portrait: `<img class="portrait" src="[[PORTRAITURL]]">`,
        portraitUrl: '/img/placeholdportrait.gif',

        //"generic" critta reactions are kind of blank slates
         reactions: {
            evade: ["missed", "close", "aa"],
            crit: ["ha", "perfect", "take that"],
            crit_buff: ["easy", "good"],
            miss: ["oh no", "i missed", "sorry"],
            dead: ["..."],
            puncture: ["bleeding"],
            regen: ["ahh", "feels good"],
            destabilized: ["…"],
            stun: ["oouaa", "eeou"],
            laugh: ["ehehe", "hehe", "haha", "ahaha"],
            receive_hit: ["ow", "ouch"],
            receive_crit: ["ow!", "ouch!"],
            receive_puncture: ["it cut me"],
            receive_buff: ["thank you", "very cool"],
            receive_destabilized: ["feels blurry"],
            receive_rez: ["i almost died?"],
            receive_carapace: ["oh, armor", "this will help"],
            receive_repairs: ["i feel better", "thanks"],
            receive_fear: ["what is that?", "what did it say?", "it is so unnatural", "this feels wrong"],
            receive_redirection: ["oh, thank you", "i will not let you down"],
        },
       
        events: { //reactions based on most numerous humor
            onSpawn: (actor, member) => {
                let effectiveMember = actor?.member?.components || member?.components

                if(actor) switch(actor.member.class) {
                    case "Sniper":
                        actor.specialReactions = actor.base.reactionPersonalities["eyes"]
                    break
                    case "Mimic":
                        actor.specialReactions = actor.base.reactionPersonalities["light"]
                    break
                }

                if(!effectiveMember) return;

                let types = []
                for (const slot in effectiveMember) types.push(effectiveMember[slot]);

                let totalCounts = types.reduce((count, str) => {
                    count[str] = (count[str] || 0) + 1;
                    return count
                }, {})

                let [mostNumerousType] = Object.entries(totalCounts).reduce((max, current) => (current[1] > max[1] ? current : max), ["", 0])

                if(mostNumerousType && actor) actor.specialReactions = actor.base.reactionPersonalities[mostNumerousType];
                else if(effectiveMember) return mostNumerousType

                if(actor.portraitUrl.includes("akieffigy")) {
                    actor.specialReactions = env.COMBAT_ACTORS.efgy.reactions
                    actor.box.classList.add('bstrdactor')
                }
            }
        },

        reactionPersonalities: { // critta personalities are fairly simple, leaning heavily into their humor since they know little else
            ichor: {
                evade: ["watch out!!"],
                crit: [ "yes!!", "everyone, follow my lead!"],
                crit_buff: [ "are you feeling better?", "do you need more?", "i have your back!"],
                miss: ["oh!! sorry... i missed...", "i messed up again...", "àœœm!!"],
                dead: ["..."],
                puncture: ["is there a heal to spare?", "what? i am fine!"],
                regen: ["feeling good!!"],
                destabilized: ["..."],
                stun: ["my arms..."],
                laugh: ["hehehehe", "ahaha!", "heehee!", "ehehehe!"],
                sacrifice: ["this is how it has to be..."],
                receive_hit: ["ÅÍ£"],
                receive_crit: ["aùÓŸ=ý!!"],
                receive_puncture: ["this is nothing...", "good thing it was me!"],
                receive_buff: ["for me? really?", "you should not have!", "ah, i will repay this!"],
                receive_destabilized: ["i can fix everything..."],
                receive_rez: ["i am back? we can fix this!!"],
                receive_carapace: ["no, i am fine!", "a shield for me?"],
                receive_repairs: ["if only we always had this..."],
                receive_fear: ["is this real...?"],
                receive_redirection: ["what are you doing?", "but they will hurt you!"],
            },
            eyes: {
                evade: ["nice try","not fast enough"],
                crit: ["this was inevitable","you will not last"],
                crit_buff: ["there you go","do not waste this"],
                miss: ["i need to focus","i was too slow"],
                dead: ["..."],
                puncture: ["i need this fixed","you are taking too long","help me now"],
                regen: ["a slow recovery"],
                destabilized: ["..."],
                stun: ["ah..."],
                laugh: ["ha ha ha ha", "heh heh", "ohoho", "hmhmhm"],
                give_vulnerable: ["there!", "i see an opening"],
                receive_hit: ["aaÍ","€ŸÀaa"],
                receive_crit: [" ÜÃ¼ÎüeÈ"],
                receive_puncture: ["this will need to be fixed","do not delay in mending me"],
                receive_buff: ["was that really your best?","that will do, for now"],
                receive_destabilized: ["it is happening again"],
                receive_rez: ["good"],
                receive_carapace: ["this will not last for long","i will need further shielding"],
                receive_repairs: ["it is better than nothing"],
                receive_fear: ["i...","what...","but..."],
                receive_redirection: ["quit wasting time and hit them","you will still be hit"],
        	},
            claws: {
                evade: ["ha! HA HA!!","HA! idiot!!"],
                crit: ["BURN! BLEED! DIE! DIE DIE DIE!", "BLEED! BURN!", "DIEDIEDIEDIEDIEDIE!!","DIE!"],
                crit_buff: ["you are WELCOME!","now KILL THEM!"],
                miss: ["DIE ALREADY!!","ñÔœþ}Ó !","º¥Ä¥’¥×!!!","USELESS!!"],
                dead: ["..."],
                puncture: ["i cannot fight like this!!!","help me! NOW NOW NOW NOW!"],
                regen: ["better than before..!","not healing FAST ENOUGH!"],
                destabilized: ["...","...","...","heheôíhôhehe"],
                stun: ["eåeaaaåauu"],
                laugh: ["eheheheheHEHEHAHAHAHA!!", "AAHAHAHAA!!", "HAA! ahaha!!", "eheHEEHeheh!!"],
                receive_hit: ["eåe!"],
                receive_crit: ["€EÙÓï#ÜÃ¼Î","ÃÍáÊ!!"],
                receive_puncture: ["OW!","you will PAY for this!","you-- I WILL KILL YOU!"],
                receive_buff: ["good!", "they will MELT beneath us!!", "it was ABOUT TIME!!"],
                receive_destabilized: ["DIE!! DIE DIE die DIE die die DIE!","HEHEHËHæ æAA!!!!"],
                receive_rez: ["NOTHING can stop me! NOTHING!","time to DIE!"],
                receive_carapace: ["they will not leave a scratch on me!!"],
                receive_repairs: ["good! more, NOW!","ugh!! finally!!"],
                receive_fear: ["this... changes NOTHING...!","ugh...","euuehh"],
                receive_redirection: ["better YOU than me!"],
        	},
            bone: { 
                evade: ["did you really think that would hit me?", "not so easy"],
                crit: [ "you will not get past me", "i will shatter you" ],
                crit_buff: [ "do not make me regret this"],
                miss: ["ßÐƒ"],
                dead: ["..."],
                puncture: ["let me fix this", "i must have something to stop this bleeding"],
                regen: ["good..."],
                destabilized: ["..."],
                stun: ["what--?"],
                laugh: ["heh", "hah", "oho", "hmh"],
                receive_crit: ["a cruel trick", "i see you now"],
                receive_puncture: ["this will not stop me"],
                receive_buff: ["feeling fine"],
                receive_destabilized: ["you all look so frail...", "you will never get past me now"],
                receive_rez: ["back again...", "it seems i can trust you, at least"],
                receive_carapace: ["they will not get through this", "perfect"],
                receive_fear: ["no--they are my friends!!", "they would never..."],
                give_redirection: ["stay behind", "look at me!"],
                receive_redirection: ["i do not need your help"],
            },
            light: {
                evade: ["i saw it!!", "over heËere ehehe", "missed missed missed ahahaha!!!", "unthinking thing!"],
                crit: ["AHAHA", "D«¶¾NK!!!", "this is ¤UR¬¶ world!"],
                crit_buff: ["life is literall¬y so easy", "i can ÷ú*¼see the cells...!", "do not worry, my friend!!", "trusst meÉe"],
                miss: ["eheheHAHA", "oh nooo ahaha!!", "stupid! stupi½id!!", "what!! cheater!!!", "use focus stupid!!"],
                dead: ["hahaå÷ú*¼-- ...", "HA«¶¾ß-- ...", "«hehe-- ...", "ha®½-- ..."],
                puncture: ["oww hahaa", "fix me! fix me f&5«ix  meœ fiºQôux mÆ!", "helloooo?? FIX ME!!", "i have blood??", "ohh haha that is verý¯Ÿ bad for m£+¤"],
                regen: ["yess¬"],
                destabilized: ["it mæm¬îV°0kes my voice funny", "hahaaå¬¬h#±aaahaha", "yo*¼u-„should ƒ„eel this¤"],
                stun: ["heavyy", "i want my turnnn", "boØringg[Œÿ:ä‘", "so s st upid", "b ored"],
                laugh: ["ahaAⱧȺȀ", "eȇĕhehehehɇ", "aHAHAahYS§“&I‘Ì¥‹gµž={ùa", "hee hee²<®¿hee!!", "ħħeheheḩeheḛ", "HẴĦẪ¬"],
                receive_crit: ["wooaaa big hit", "hahaa d onk", "n not fun nyy"],
                receive_puncture: ["it went thro¢u®gh”¨", "%—HÀÀ ðw Øw"],
                receive_buff: ["yee@¼±¬SS", "ha/¯qhaœ'ha"],
                receive_destabilized: ["•±NOW i will HURT them!", "i kn¨ow the ˜¥lines", "GOOD", "the wall i¼s ÇrÁ°rackˆ.ing"],
                receive_rez: ["reembodied!! the old one?", "ahahaaa thank you friend", "pulled from thÈe sea!¡!"],
                receive_carapace: ["cool!! cool!!", "this looks so cool on mee"],
                receive_repairs: ["ffeels nice"],
                receive_fear: ["fake... fake feeling¤’*s its fake","is this a¬ll there is?¢¤?", "i do not want to go ba¢k", "hëelp me heËl‡p", "where are we??", "i dd‰o not want t®¼o live th‡!¦s way"],
                receive_redirection: ["like one body!! haha!!", "brave! i like you!!"],
            },

        }
    },


    /* ing rework */

    // tutorial fight
    tutorial_golem: {
        name: "Golem",
        maxhp: 80,
        hp: 80,
        unique: true,
        actions: ["stab", "akizet_attack", "malfunction"],
        initialStatusEffects: [["story_tutorial_golem", 1], ["vulnerable", 1], ["vulnerable_guaranteed", 1]],
        graphic: `
            <div class="sprite-wrapper golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/golem.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/golem-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/golem-neck.gif" id="%SLUG-golemsprite-neck" class="sprite golemsprite-neck">
                    <img src="/img/sprites/combat/foes/golem-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/golem-leftarm.gif" id="%SLUG-golemsprite-leftarm" class="sprite golemsprite-leftarm">
                    <img src="/img/sprites/combat/foes/golem-rightarm.gif" id="%SLUG-golemsprite-rightarm" class="sprite golemsprite-rightarm">
                </div>

                <div class="target" entity="damaged golem"></div>
            </div>
            `,
        reactions: env.COMBAT_REACTIONS.silent_creature
    },

    // recreation fight
    listener: {
        name: "Listener",
        maxhp: 80,
        hp: 80,
        unique: true,
        actions: ["listener_signal_echo"],
        initialStatusEffects: [["story_listener", 1]],
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow listener spritestack">
                    <img class="sprite" src="/img/local/embassy/listener.gif">
                    <figure> 
                        <div class="cyst"></div>
                        <div class="cyst"></div>
                        <div class="cyst"></div>
                        <div class="callscreen"></div>
                    </figure>
                </div>

                <div class="target" entity="damaged listener"></div>
            </div>
            `,
        reactions: env.COMBAT_REACTIONS.silent_creature
    },

    container_exploder: {
        name: "Container",
        maxhp: 10,
        hp: 10,
        actions: ["container_exploder", "special_container_exploder_malfunction"],
        initialStatusEffects: [["story_container", 1]],
        graphic: `
            <div class="sprite-wrapper container-sprite" id="%SLUG-sprite-wrapper" container="kavruka">
                <div class="sprite">
                    <img class="sprite" src="/img/sprites/combat/foes/inc.gif" id="%SLUG-sprite">
                </div>
                <div class="target" entity="hostile container"></div>
            </div>
        `,
        reactions: env.COMBAT_REACTIONS.basic_incoherent
    },

    container_evader: {
        name: "Container",
        maxhp: 8,
        hp: 8,
        actions: ["container_evader", "container_evader_malfunction"],
        initialStatusEffects: [["story_container", 1]],
        graphic: `
            <div class="sprite-wrapper container-sprite" id="%SLUG-sprite-wrapper" container="evader">
                <div class="sprite">
                    <img class="sprite" src="/img/sprites/combat/foes/inc.gif" id="%SLUG-sprite">
                </div>
                <div class="target" entity="hostile container"></div>
            </div>
        `,
        reactions: env.COMBAT_REACTIONS.basic_incoherent
    },

    container_spy: {
        name: "Container",
        maxhp: 8,
        hp: 8,
        actions: ["spy", "daze_lastresort", "special_container_spy_malfunction"],
        initialStatusEffects: [["story_container", 1]],
        graphic: `
            <div class="sprite-wrapper container-sprite" id="%SLUG-sprite-wrapper" container="spy">
                <div class="sprite">
                    <img class="sprite" src="/img/sprites/combat/foes/inc.gif" id="%SLUG-sprite">
                </div>
                <div class="target" entity="hostile container"></div>
            </div>
        `,
        reactions: env.COMBAT_REACTIONS.basic_incoherent
    },

    container_sfer: {
        name: "Container",
        maxhp: 12,
        hp: 12,
        actions: ["container_sfer", "container_evader_malfunction" /* not a typo it's reused */],
        initialStatusEffects: [["story_container", 1]],
        graphic: `
            <div class="sprite-wrapper container-sprite" id="%SLUG-sprite-wrapper" container="sfer">
                <div class="sprite">
                    <img class="sprite" src="/img/sprites/combat/foes/inc.gif" id="%SLUG-sprite">
                </div>
                <div class="target" entity="hostile container"></div>
            </div>
        `,
        reactions: env.COMBAT_REACTIONS.basic_incoherent
    },

    personnel_attendant: {
        name: "Spire Attendant",
        maxhp: 60,
        hp: 60,
        unique: true,
        actions: ["attendant_counter_attack", "attendant_counter", "special_attendant_strike"],
        initialStatusEffects: [["story_attendant", 1]],
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <div class="attendant-sprite">
                    <img class="sprite" src="/img/local/embassy/spiredronebody.gif" id="%SLUG-sprite">
                </div>
                <div class="target" entity="attendant"></div>
            </div>
        `,
        reactions: env.COMBAT_REACTIONS.basic_incoherent
    },

    personnel_veilklight: {
        name: "Veilklight",
        maxhp: 20,
        hp: 20,
        actions: ["special_veilklight_channel"],
        altActions: ["spy", "mend", "daze_lastresort", "special_veilklight_malfunction"], //arbitrary, swapped to after using veilklight_channel
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <div class="veilksprite">
                    <img class="sprite" src="/img/sprites/combat/foes/foelampbase.gif" id="%SLUG-sprite">
                </div>
                <div class="target" entity="hostile veilklight"></div>
            </div>
        `,
        reactions: env.COMBAT_REACTIONS.basic_incoherent
    },

    movefoe_driver: {
        name: "Movefoe",
        unique: true,
        lastStand: true,
        maxhp: 500, // doesn't actually use or display HP this is just for shroud
        hp: 500,
        initialStatusEffects: [["story_movefoe", 1]],
        actions: ["special_movefoe_tumble", "special_movefoe_collide", "special_movefoe_pry"],
        altActions: ["incoherent_movefriend"], // arbitrary, swapped to in gimmick 'phase 2'
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <div class="lifter sprite"><figure></figure></div>
                <div class="target" entity="movefoe"></div>
            </div>
            `,
        reactions: env.COMBAT_REACTIONS.silent_creature
    },

    movefoe_relay: {
        name: "Flesh Segment",
        altName: "Exposed Relay", // arbitrary, swapped to by story_mfrelay status
        unique: true,
        maxhp: 40,
        hp: 40,
        initialStatusEffects: [["story_mfrelay", 1]],
        lastStand: true,
        actions: ["nothing"], // doesn't do a single freakan thing
        graphic: `
            <div class="sprite-wrapper mfrelay" id="%SLUG-sprite-wrapper">
                <div class="sprite"><figure></figure></div>
                <div class="target" entity="movefoe"></div>
            </div>
            `,
        reactions: env.COMBAT_REACTIONS.silent_creature
    },

    movefoe_tendrils: {
        name: "Tendril",
        maxhp: 30,
        hp: 30,
        actions: ["swipe"],
        lastStand: true,
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/combat/foes/tendrils.gif" id="%SLUG-sprite">
                <div class="target" entity="tendrils"></div>
            </div>
            `,
        reactions: env.COMBAT_REACTIONS.silent_creature
    },

    /* ing rework bstrd zone */
    archival_golem: {
        name: "Archival Golem",
        maxhp: 60,
        hp: 50,
        actions: ["windup"],
        windupActions: ["archival_smash"],
        initialStatusEffects: [["bstrd_archival", 1]],
        immunities: {},
        graphic: `
            <div class="sprite-wrapper archival-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/archivalgolem.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/archivalgolem-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/archivalgolem-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/archivalgolem-arms.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="archival golem"></div>
            </div>
            `,
        reactions: env.COMBAT_REACTIONS.silent_creature
    },

    maintcloak: {
        name: "Jutskin",
        maxhp: 50,
        hp: 40,
        initialStatusEffects: [["generic_can_malfunction", 1]],
        actions: ["special_maintcloak_barrier", "maintstab"],
        graphic: `
            <div class="sprite-wrapper maintcloak" id="%SLUG-sprite-wrapper">
                <div class="spritestack">
                    <img class="sprite maintbody" src="/img/sprites/combat/foes/maintcloak.gif">
                    <img class="sprite mainthead" src="/img/sprites/combat/foes/mainthead.gif">
                    <img class="sprite mainthead perp" src="/img/sprites/combat/foes/mainthead.gif">

                    <div class="target" entity="jutskin"></div>
                </div>
            </div>
        `,
        reactions: env.COMBAT_REACTIONS.basic_incoherent
    },

    /* ep3 ing rework zone */

    // husk gang - the main four, recurring
    husk_observer: {
        name: "Uzzi",
        readoutActor: "husk",
        maxhp: 40,
        hp: 40,
        actions: ["husk_declaration", "husk_target", "husk_coordinate"],
        initialStatusEffects: [["story_terriblelife", 1], ["husk_recognition", 1]],

        graphic: `
            <div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
                <div class="spritestack" id="%SLUG-sprite">
                    <img src="" class="sprite basis">
                    <div class="sprite toplayer"></div>
                    <div class="sprite bottomlayer"></div>
                </div>
                <div class="target" entity="husk"></div>
            </div>
        `,

        reactions: env.COMBAT_REACTIONS.husk,        
        events: { // referential to the original husk function which can take specific looks now
            onSpriteCreation: (sprite) => env.COMBAT_ACTORS["husk"].events.onSpriteCreation(sprite, "observer")
        }
    }, 

    husk_striker: {
        name: "Kiku",
        readoutActor: "husk",
        maxhp: 40,
        hp: 40,
        actions: ["maintstab", "husk_evade"],
        initialStatusEffects: [["story_terriblelife", 1], ["husk_hunger", 1]],

        graphic: `
            <div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
                <div class="spritestack" id="%SLUG-sprite">
                    <img src="" class="sprite basis">
                    <div class="sprite toplayer"></div>
                    <div class="sprite bottomlayer"></div>
                </div>
                <div class="target" entity="husk"></div>
            </div>
        `,

        reactions: env.COMBAT_REACTIONS.husk,        
        events: { // referential to the original husk function which can take specific looks now
            onSpriteCreation: (sprite) => env.COMBAT_ACTORS["husk"].events.onSpriteCreation(sprite, "striker")
        }
    }, 

    husk_support: {
        name: "Oulo",
        readoutActor: "husk",
        maxhp: 40,
        hp: 40,
        actions: ["parasite", "husk_rez", "husk_tap", "husk_windup"],
        windupActions: ["special_restorative_barrier"],
        initialStatusEffects: [["story_terriblelife", 1], ["husk_return", 1]],

        graphic: `
            <div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
                <div class="spritestack" id="%SLUG-sprite">
                    <img src="" class="sprite basis">
                    <div class="sprite toplayer"></div>
                    <div class="sprite bottomlayer"></div>
                </div>
                <div class="target" entity="husk"></div>
            </div>
        `,

        reactions: env.COMBAT_REACTIONS.husk,        
        events: { // referential to the original husk function which can take specific looks now
            onSpriteCreation: (sprite) => env.COMBAT_ACTORS["husk"].events.onSpriteCreation(sprite, "support")
        }
    }, 

    husk_guard: {
        name: "Tari",
        readoutActor: "husk",
        maxhp: 40,
        hp: 40,
        actions: ["cripple", "husk_guard"],
        initialStatusEffects: [["story_terriblelife", 1], ["husk_vengeance", 1]],

        graphic: `
            <div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
                <div class="spritestack" id="%SLUG-sprite">
                    <img src="" class="sprite basis">
                    <div class="sprite toplayer"></div>
                    <div class="sprite bottomlayer"></div>
                </div>
                <div class="target" entity="husk"></div>
            </div>
        `,

        reactions: env.COMBAT_REACTIONS.husk,        
        events: { // referential to the original husk function which can take specific looks now
            onSpriteCreation: (sprite) => env.COMBAT_ACTORS["husk"].events.onSpriteCreation(sprite, "guard")
        }
    }, 

    // this version only appears with the support husk in a simpler fight
    kivskin: {
        name: "Kivskin",
        maxhp: 40,
        hp: 30,
        actions: ["windup_jab", "kivskin_shell", "kivskin_guard_support_only", "kivskin_malfunction"],
        windupActions: ["archival_smash", "kivskin_malfunction"],
        initialStatusEffects: [["story_kivskin", 1]],
        graphic: `
            <div class="sprite-wrapper pressure-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/pressure.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/pressure-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/pressure-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/pressure-leftarm.gif" id="%SLUG-golemsprite-leftarm" class="sprite golemsprite-leftarm">
                    <img src="/img/sprites/combat/foes/pressure-rightarm.gif" id="%SLUG-golemsprite-rightarm" class="sprite golemsprite-rightarm">
                </div>

                <div class="target" entity="kivskin"></div>
            </div>
            `,
        reactions: env.COMBAT_REACTIONS.basic_incoherent
    },

    // constructor gets its own fight by itself
    constructor_boss: {
        name: "Constructor",
        specialClass: "mainfoe",
        unique: true,
        maxhp: 150,
        hp: 50,
        actions: ["special_constructor_carapace", "constructor_construct", "constructor_attack"],
        initialStatusEffects: [["story_constructor", 1]],
        graphic: `
            <div class="sprite-wrapper constructor-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/constructor.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/constructor-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/constructor-neck.gif" id="%SLUG-golemsprite-neck" class="sprite golemsprite-neck">
                    <img src="/img/sprites/combat/foes/constructor-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/constructor-arms.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="constructor"></div>
            </div>
            `,
        reactions: env.COMBAT_REACTIONS.basic_incoherent
    },

    constructor_vat: {
        name: "Vat",
        maxhp: 10,
        hp: 10,
        advanceTimeModifier: -1000,
        actions: ["constructor_vat"], // just increments construction
        initialStatusEffects: [["story_constructorvat", 1], ["ethereal_passive", 1]],
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/combat/foes/constructorvat.gif" class="sprite">
                <div class="target" entity="vat"></div>
            </div>
        `,
        reactions: env.COMBAT_REACTIONS.silent_creature
    },

    constructor_arm_stabber: {
        name: "Slender Limb",
        maxhp: 150,
        hp: 60,
        actions: ["maintstab"],
        initialStatusEffects: [["story_constructorarm", 1]],
        graphic: `
            <div class="sprite-wrapper constructlimb" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/combat/foes/constructor_stabber_arm.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
            </div>
            `,
        reactions: env.COMBAT_REACTIONS.silent_creature
    },

    constructor_arm_repair: {
        name: "Repair Limb",
        maxhp: 150,
        hp: 60,
        actions: ["special_restorative_barrier", "husk_tap"],
        initialStatusEffects: [["story_constructorarm", 1]],
        graphic: `
            <div class="sprite-wrapper constructlimb" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/combat/foes/constructor_surgeon_arm.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
            </div>
            `,
        reactions: env.COMBAT_REACTIONS.silent_creature
    },

    constructor_arm_stun: {
        name: "Heavy Limb",
        maxhp: 150,
        hp: 60,
        actions: ["bone_break"],
        initialStatusEffects: [["story_constructorarm", 1]],
        graphic: `
            <div class="sprite-wrapper constructlimb" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/combat/foes/constructor_puncher_arm.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
            </div>
            `,
        reactions: env.COMBAT_REACTIONS.silent_creature
    },

    constructor_arm_spy: {
        name: "Analytical Limb",
        maxhp: 150,
        hp: 60,
        actions: ["special_spy_all", "husk_coordinate", "husk_target"],
        initialStatusEffects: [["story_constructorarm", 1]],
        graphic: `
            <div class="sprite-wrapper constructlimb" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/combat/foes/constructor_repair_arm.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
            </div>
            `,
        reactions: env.COMBAT_REACTIONS.silent_creature
    },

    constructor_arm_malform: {
        name: "Malformed Core",
        maxhp: 150,
        hp: 60,
        actions: ["mad_claw", "special_veilklight_malfunction"],
        initialStatusEffects: [["story_constructorarm", 1]],
        graphic: `
            <div class="sprite-wrapper constructlimb malform" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/combat/foes/constructor_malformed_cores.gif" id="%SLUG-golemsprite-arms" class="sprite">
            </div>
            `,
        reactions: env.COMBAT_REACTIONS.silent_creature
    },

    // new kivii fight, same general vibe and progression as before though (stun focused)
    kivii: {
        name: "Dozkallvi",
        maxhp: 300,
        hp: 300,
        actions: ["husk_declaration", "husk_coordinate"], // kivii's arms are doing the hits
        initialStatusEffects: [["conjoined", 1], ["story_terriblelife", 1]],
        graphic: `
            <div class="sprite-wrapper kivii" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img class="sprite" src="/img/sprites/combat/foes/kivii/combat.gif" id="%SLUG-sprite">
                    <div class="target" entity="dozkallvi"></div>
                </div>
            </div>
            `,
        reactions: env.COMBAT_REACTIONS.husk
    },

    kivii_gauntlet: {
        name: "Gauntlet",
        maxhp: 300,
        hp: 300,
        actions: ["windup", "kivskin_malfunction"],
        windupActions: ["archival_smash", "kivskin_malfunction"], 
        graphic: `
            <div class="sprite-wrapper kiviigauntlet" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/combat/foes/kivii/gauntlet.gif" id="%SLUG-sprite">
                <div class="target" entity="gauntlet"></div>
            </div>
            `,
        reactions: {},
        initialStatusEffects: [["conjoined", 1], ["kivii_arm", 1]],
    },

    // repairfriend fight revolves around them restoring an archival golem
    repairfriend: {
        name: "Repairfriend",
        maxhp: 40,
        hp: 40,
        actions: ["repairfriend_swarm", "repairfriend_salvage"],
        initialStatusEffects: [["story_repairfriend", 1]],
        graphic: `
            <div class="sprite-wrapper surgeon-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/surgeon.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/surgeon-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/surgeon-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/surgeon-arms.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="repairfriend"></div>
            </div>
        `,
        reactions: env.COMBAT_REACTIONS.basic_incoherent
    },

    wounded_archival_golem: {
        name: "Archival Golem",
        maxhp: 60,
        hp: 1,
        actions: ["primary"],
        altActions: ["archival_smash"],
        initialStatusEffects: [["story_archival_repairing", 1], ["carapace", 10]],
        immunities: {},
        unique: true,
        graphic: `
            <div class="sprite-wrapper archival-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/archivalgolem.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/archivalgolem-head_damaged.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/archivalgolem-body_damaged.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/archivalgolem-arms_damaged.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="archival golem"></div>
            </div>
            `,
        reactions: env.COMBAT_REACTIONS.silent_creature
    },

    // reworked translation core is roughly the same but revolves around cloning your item sets
    // bring your own difficulty
    translation_golem: {
        name: "Translation Core",
        maxhp: 250,
        hp: 250,
        unique: true,
        specialClass: "mainfoe",
        actions: ["special_translation"],
        initialStatusEffects: [["story_translation", 1]],
        graphic: `
            <div class="sprite-wrapper wordfriend" id="%SLUG-sprite-wrapper">
                <div class="spinny">
                    <img src="/img/sprites/combat/foes/translator_core.gif" class="sprite diamond">
                    <img src="/img/sprites/combat/foes/translator_core.gif" class="sprite diamond">
                </div>

                <div class="orbs">
                    <div class="orb"></div>
                    <div class="orb"></div>
                    <div class="orb"></div>
                </div>

                <div class="orbs">
                    <div class="orb"></div>
                    <div class="orb"></div>
                </div>

                <div class="target" entity="translation core"></div>
            </div>
            `,
        reactions: {
            catchall: ["████ ███", "██ ██████", "█████ ████", "███", "███ ███ ███", "███ █ ████", "██████ ██", "█ ████", "████ █ █ █"],
            dead: ["███ █ █ █ ███"]
        }
    },

    hallucination: {
        name: "»õGQàº3¾õ”cR%",
        maxhp: 4,
        hp: 4,
        actions: ["hallucination_attack"],
        windupActions: ["archival_smash"], // just in case windup gets copied from IK
        initialStatusEffects: [["ethereal_passive", 1], ["story_hallucination", 1]],
        graphic: `
            <div class="sprite-wrapper hallucination" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img class="sprite basis" src="/img/sprites/combat/foes/hallucinations/akizet.png" id="%SLUG-sprite">
                    <img class="sprite base" src="/img/sprites/combat/foes/hallucinations/akizet.png" id="%SLUG-sprite">
                    <img class="sprite eyes" src="/img/sprites/combat/foes/hallucinations/akizet_eyes.png" id="%SLUG-sprite">
                </div>
                <div class="target" entity="»õGQàº3¾õ”cR%"></div>
            </div>
            `,
        reactions: {},
        events: {
            onSpriteCreation: (sprite) => {
                if(!sprite) return

                let basis = sprite.querySelector('img.basis')
                let base = sprite.querySelector('img.base')
                let eyes = sprite.querySelector('img.eyes')

                if(env?.hallucinator?.includes("generic") || !env.hallucinator) {
                    basis.src = `/img/sprites/combat/foes/hallucinations/gakvu_mimic.gif`
                    base.src = `/img/sprites/combat/foes/hallucinations/gakvu_mimic.gif`
                    eyes.src = `/img/sprites/combat/foes/hallucinations/gakvu_eyes_mimic.gif`
                    sprite.querySelector(".target").setAttribute("entity", "daemon mimic")
                } else {
                    if(env.hallucinator == "ikgolem" && env.ep4) env.hallucinator = "ikgolem_ep4"
                    basis.src = `/img/sprites/combat/foes/hallucinations/${env.hallucinator}.png`
                    base.src = `/img/sprites/combat/foes/hallucinations/${env.hallucinator}.png`
                    eyes.src = `/img/sprites/combat/foes/hallucinations/${env.hallucinator}_eyes.png`                    
                }
            }
        }
    },

    // foundation golem ing rework
    // kind of a standard fight - a heavy hitter occasionally reinforced by a bastard
    // since it uses a kivskin base, it has similar actions
    // but its arms are far more dangerous
    foundation_golem: {
        name: "Foundation Golem",
        maxhp: 100,
        hp: 100,
        actions: ["windup_jab", "kivskin_shell", "kivskin_malfunction"],
        windupActions: ["ik_attack", "dullflare", "kivskin_malfunction"],
        initialStatusEffects: [["story_foundation", 1]],
        graphic: `
            <div class="sprite-wrapper golemsprite bossgolem" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/golemboss.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/golemboss-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/golemboss-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/golemboss-arms.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="foundation golem"></div>
            </div>
        `,
        reactions: env.COMBAT_REACTIONS.basic_incoherent
    },

    lesserhusk: {
        name: "Husk",
        readoutActor: "husk",
        maxhp: 15,
        hp: 15,
        actions: ["stab", "speak", "husk_evade"],
        initialStatusEffects: [["story_terriblelife", 1]],

        graphic: `
            <div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
                <div class="spritestack" id="%SLUG-sprite">
                    <img src="" class="sprite basis">
                    <div class="sprite toplayer"></div>
                    <div class="sprite bottomlayer"></div>
                </div>
                <div class="target" entity="husk"></div>
            </div>
        `,

        reactions: env.COMBAT_REACTIONS.husk,        
        events: { // referential to the original husk function which can take specific looks now
            onSpriteCreation: (sprite) => env.COMBAT_ACTORS["husk"].events.onSpriteCreation(sprite, "striker")
        }
    }, 

    lesserhusk_stabber: {
        name: "Sharp Husk",
        readoutActor: "husk",
        maxhp: 20,
        hp: 20,
        actions: ["maintstab", "husk_evade"],
        initialStatusEffects: [["story_terriblelife", 1], ["husk_hunger", 1]],

        graphic: `
            <div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
                <div class="spritestack" id="%SLUG-sprite">
                    <img src="" class="sprite basis">
                    <div class="sprite toplayer"></div>
                    <div class="sprite bottomlayer"></div>
                </div>
                <div class="target" entity="husk"></div>
            </div>
        `,

        reactions: env.COMBAT_REACTIONS.husk,        
        events: { // referential to the original husk function which can take specific looks now
            onSpriteCreation: (sprite) => env.COMBAT_ACTORS["husk"].events.onSpriteCreation(sprite, "striker")
        }
    }, 

    lesserhusk_support: {
        name: "Husk",
        readoutActor: "husk",
        maxhp: 20,
        hp: 20,
        actions: ["parasite", "husk_tap", "husk_rez"],
        initialStatusEffects: [["story_terriblelife", 1], ["husk_lessersupport", 1]],

        graphic: `
            <div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
                <div class="spritestack" id="%SLUG-sprite">
                    <img src="" class="sprite basis">
                    <div class="sprite toplayer"></div>
                    <div class="sprite bottomlayer"></div>
                </div>
                <div class="target" entity="husk"></div>
            </div>
        `,

        reactions: env.COMBAT_REACTIONS.husk,        
        events: { // referential to the original husk function which can take specific looks now
            onSpriteCreation: (sprite) => env.COMBAT_ACTORS["husk"].events.onSpriteCreation(sprite)
        }
    }, 
    
    lesserhusk_observer: {
        name: "Husk",
        readoutActor: "husk",
        maxhp: 20,
        hp: 20,
        actions: ["husk_declaration", "husk_target", "husk_coordinate"],
        initialStatusEffects: [["story_terriblelife", 1], ["husk_lesserobserver", 1]],

        graphic: `
            <div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
                <div class="spritestack" id="%SLUG-sprite">
                    <img src="" class="sprite basis">
                    <div class="sprite toplayer"></div>
                    <div class="sprite bottomlayer"></div>
                </div>
                <div class="target" entity="husk"></div>
            </div>
        `,

        reactions: env.COMBAT_REACTIONS.husk,        
        events: { // referential to the original husk function which can take specific looks now
            onSpriteCreation: (sprite) => env.COMBAT_ACTORS["husk"].events.onSpriteCreation(sprite)
        }
    }, 
    
    lesserhusk_shielder: {
        name: "Husk",
        readoutActor: "husk",
        maxhp: 25,
        hp: 25,
        actions: ["special_carapace_allies", "constructor_construct", "repairfriend_swarm"],
        initialStatusEffects: [["story_terriblelife", 1], ["husk_lessershielder", 1]],

        graphic: `
            <div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
                <div class="spritestack" id="%SLUG-sprite">
                    <img src="" class="sprite basis">
                    <div class="sprite toplayer"></div>
                    <div class="sprite bottomlayer"></div>
                </div>
                <div class="target" entity="husk"></div>
            </div>
        `,

        reactions: env.COMBAT_REACTIONS.husk,        
        events: { // referential to the original husk function which can take specific looks now
            onSpriteCreation: (sprite) => env.COMBAT_ACTORS["husk"].events.onSpriteCreation(sprite)
        }
    }, 

    boss_golem: {
        name: "???",
        maxhp: 300,
        hp: 300,
        unique: true,
        actions: ["incoherent_golemboss", "golemboss_dullflare"],
        initialStatusEffects: [["story_foundation_possessed", 1]],
        lastStand: "bossgolem",
        graphic: `
            <div class="sprite-wrapper golemsprite bossgolem warped" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/golemboss.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/golemboss-head_warped.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/golemboss-body_warped.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/golemboss-arms_warped.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-arms">
                    <div class="sprite golemsprite-body corebits"></div>
                </div>

                <div class="target" entity="foundation golem"></div>
            </div>
            `,
        reactions: env.COMBAT_REACTIONS.husk,
    },
    
    /* end ing rework */

    container: {
        name: "Container",
        maxhp: 6,
        hp: 6,
        actions: ["attack", "attack", "attack", "skitter"],
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/combat/foes/inc.gif" id="%SLUG-sprite">
                <div class="target" entity="hostile container"></div>
            </div>
            `,
        reactions: env.COMBAT_REACTIONS.basic_incoherent,
        turnCheck: "container"
    },

    attendant: {
        name: "Spire Attendant",
        maxhp: 8,
        hp: 8,
        actions: ["attack", "foe_stab"],
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <div class="attendant-sprite">
                    <img class="sprite" src="/img/local/embassy/spiredronebody.gif" id="%SLUG-sprite">
                </div>
                <div class="target" entity="attendant"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        }
    },

    tendrils: {
        name: "Tendril",
        turnCheck: "tendrils",
        maxhp: 10,
        hp: 10,
        actions: ["swipe"],
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/combat/foes/tendrils.gif" id="%SLUG-sprite">
                <div class="target" entity="tendrils"></div>
            </div>
            `,
        reactions: {}
    },

    veilklight: {
        name: "Veilklight",
        maxhp: 10,
        hp: 10,
        actions: ["spy", "mend", "daze_lastresort"],
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <div class="veilksprite">
                    <img class="sprite" src="/img/sprites/combat/foes/foelampbase.gif" id="%SLUG-sprite">
                </div>
                <div class="target" entity="hostile veilklight"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        }
    },

    enemy_movefriend: {
        name: "Movefoe",
        maxhp: 60,
        hp: 60,
        statusImmunities: ["stun"],
        actions: ["incoherent_movefriend"],
        lastStand: "movefriend",
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <div class="lifter sprite"><figure></figure></div>
                <div class="target" entity="movefoe"></div>
            </div>
            `,
        reactions: {} //SILENT CREATURE
    },

    enemy_movefriend_lowintensity: {
        name: "Movefoe",
        maxhp: 60,
        hp: 60,
        statusImmunities: ["stun"],
        actions: ["movefriend_attack", "special_mass_destabilize", "special_movefriend_annihilate"],
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <div class="lifter sprite"><figure></figure></div>
                <div class="target" entity="movefoe"></div>
            </div>
            `,
        reactions: {} //SILENT CREATURE
    },

    bstrdlight: {
        name: "BSTRDlight",
        maxhp: 60,
        hp: 50,
        actions: ["spy", "mend", "special_mass_destabilize", "swipe", "rez"],
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <div class="veilksprite bstrdlight">
                    <img class="sprite" src="/img/sprites/combat/foes/bstrdlampbase.gif" id="%SLUG-sprite">
                </div>
                <div class="target" entity="bstrdlight"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
        turnCheck: "lastRezzer"
    },

    bstrdboss: {
        name: "BSTRD Golem",
        readoutActor: "bstrd",
        maxhp: 150,
        hp: 150,
        unique: true,
        lastStand: "bstrd",
        initialStatusEffects: [["bstrd_boss", 1]],
        actions: ["incoherent_gundown_draggable"],
        graphic: `
            <div class="sprite-wrapper archival-golem bstrd-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/bstbody.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/bsthead.gif" id="%SLUG-golemsprite-head">
                        <img src="/img/sprites/combat/foes/bstface.gif" id="%SLUG-golemsprite-face">
                    </div>
                    <img src="/img/sprites/combat/foes/bstbody.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/bstgun.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms gunlower">
                    <img src="/img/sprites/combat/foes/bstgunraise.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms gunraise">
                    <img src="/img/sprites/combat/foes/bstgunblam.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms gunblam">
                </div>

                <div class="target" entity="bstrd golem"></div>
            </div>
            `,
        reactions: {
            receive_destabilized: ["WOaoOAw"],
            receive_rez: ["AHAHA :^) GOT U"],
            puncture: ["OOUUEU"],
            destabilized: ["DOUBLE BULLETS !!"],
            steal: ["gime THAT", "thanks BOUDY :}", "LETS KEEP IT GOIG!!!!!"],
            enrage: ["no moe FUCKIN around.... !!!!"]
        }
    },

    bstrdboss_lowintensity: { // now only used in FRAME
        slug: "bstrdboss_lowintensity",
        name: "BSTRD Golem",
        readoutActor: "bstrd",
        maxhp: 70,
        hp: 70,
        actions: ["special_fullauto"],
        initialStatusEffects: [["frame_boss", 1]],        
        graphic: `
            <div class="sprite-wrapper archival-golem bstrd-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/bstbody.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/bsthead.gif" id="%SLUG-golemsprite-head">
                        <img src="/img/sprites/combat/foes/bstface.gif" id="%SLUG-golemsprite-face">
                    </div>
                    <img src="/img/sprites/combat/foes/bstbody.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/bstgun.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms gunlower">
                    <img src="/img/sprites/combat/foes/bstgunraise.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms gunraise">
                    <img src="/img/sprites/combat/foes/bstgunblam.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms gunblam">
                </div>

                <div class="target" entity="bstrd golem"></div>
            </div>
            `,
        reactions: {
            receive_destabilized: ["WOaoOAw"],
            receive_rez: ["AHAHA :^) GOT U"],
            puncture: ["OOUUEU"],
            destabilized: ["DoUBLE BULLets !!"],
        }
    },

    bstrdshelf: {
        name: "Pain Shelf",
        maxhp: 120,
        hp: 120,
        actions: ["special_archiveshelf_annihilate"],
        initialStatusEffects: [["bstrd_shelf", 1]],
        graphic: `
            <div class="sprite-wrapper bstrdshelf" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/combat/foes/archivalfoea.gif">
                <div class="target" entity="pain shelf"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        }
    },

    akizet: {
        name: "Akizet",
        readoutActor: "akizet",
        description: `'utilizes rapid puncturing strikes';'reaps puncture for large hits'`,
        maxhp: 15,
        hp: 15,
        actions: [
            "eviscerate",
            "frenzy", 
            "evade",
        ],
        sceneActions: [
            "scene_akizet_attack",
            "scene_frenzy",
            "scene_evade"
        ],
        portrait: `<img class="portrait" src="/img/sprites/akizet/eyes.gif">`,
        portraitUrl: '/img/sprites/akizet/eyes.gif',
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/akizet/gridtiny.gif" id="%SLUG-sprite">
            </div>
        `,
        reactions: {
            evade: ["far too close", "oaa!", "nearly..."],
            crit: [ ()=>env.combat.has('husk') || env.rpg.is2D ? "get away!" : "excellent!" ],
            crit_buff: [ ()=>env.combat.has('husk') || env.rpg.is2D ? "good" : "easy!"],
            miss: ["œ¦êA"],
            dead: ["..."],
            receive_hit: ["@#Æ$J"],
            receive_crit: ["ßÃÆM!!"],
            receive_puncture: ["i have felt worse", "a familiar feeling"],
            receive_buff: ["thank you", "we are unstoppable"],
            receive_destabilized: ["every cell... awake..."],
            receive_rez: ["that was close..."],
            puncture: ["i need to fix this", 
                ()=>env.combat.has('tozik') ? "tozik!" : "i need help!",
                ()=>env.combat.has('cavik') ? "cavik!" : "restoratives?!" 
            ],
            regen: ["this will do", "better..."],
            destabilized: ["..."],
            stun: ["my arms..."],
            receive_carapace: ["this armor...!", "very good"],
            receive_repairs: ["thank you, cavik", "better!"],
            receive_fear: ["no, no...", "the eyes...", "velzie forgive me"],
            receive_redirection: ["together!", "thank you, my friend", "we will destroy them"],
            frenzy: ["die—", "die!", "ªœp—", "ç2ªÔ!!", "¤¼C—", "{þÿU—"]
        },
    },

    gakvu: {
        name: "Gakvu",
        readoutActor: "gakvu",
        description: `'escalates conflict through damage manipulation'`,
        maxhp: 10,
        hp: 10,
        unique: true,
        actions: ["gakvu_attack", "destabilize", "evade"],
        sceneActions: ["gakvu_attack", "destabilize", "scene_evade"],
        portrait: `<img class="portrait" src="/img/sprites/obesk/gakvu/facetransparent.gif">`,
        portraitUrl: '/img/sprites/obesk/gakvu/facetransparent.gif',
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/obesk/gakvu/gridtiny.gif" style="height: 200px;" id="%SLUG-sprite">
            </div>
        `,
        reactions: {
            evade: [
                ()=>env.combat.has('husk') || env.rpg.is2D ? "ah!" : "haha!",
                ()=>env.combat.has('husk') || env.rpg.is2D ? "no!!" : "woaah!!",
            ],
            crit: [
                ()=>env.combat.has('husk') || env.rpg.is2D ? "clean..." : "it is simply that easy",
                ()=>env.combat.has('husk') || env.rpg.is2D ? "a few more like that..." : "that was lucky"
            ],
            crit_buff: ["so that goes there..."],
            miss: [
                ()=>env.combat.has('husk') || env.rpg.is2D ? "€Öä!" : "oh...",
                ()=>env.combat.has('husk') || env.rpg.is2D ? "it is too fast!!" : "too bad"
            ],
            dead: ["..."],
            receive_crit: ["Æ!!"],
            receive_puncture: ["i am... bleeding...?", "ow!! what..."],
            receive_buff: ["thanks"],
            receive_destabilized: ["may velzie look away"],
            receive_rez: [
                ()=>env.combat.has('husk') || env.rpg.is2D ? "thank you" : "my savior",
            ],
            puncture: ["such a strange feeling", "make this stop"],
            regen: [
                ()=>env.combat.has('husk') || env.rpg.is2D ? "feeling better" : "feeling good",
            ],
            destabilized: ["..."],
            stun: ["where did my eyes go?!"],
            receive_carapace: ["so heavy"],
            receive_repairs: ["thanks cavik"],
            receive_fear: ["stop looking at me!!", "get away from me!", "no, no no no", "what did it say??"],
            receive_redirection: [() => env.rpg?.lastAction?.user?.slug ? `${env.rpg?.lastAction?.user?.name?.toLowerCase()}??` : "really??"],
        },
    }, 

    tozik: {
        name: "Tozik",
        readoutActor: "tozik",
        description: `'maintains allies through stealing HP'`,
        maxhp: 10,
        hp: 10,
        unique: true,
        actions: ["tozik_attack", "newmend", "evade"],
        sceneActions: ["tozik_attack", "newmend", "scene_evade"],
        portrait: `<img class="portrait" src="/img/sprites/obesk/tozik/facecrop.gif">`,
        portraitUrl: '/img/sprites/obesk/tozik/facetransparent.gif',
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/obesk/tozik/gridtiny.gif" id="%SLUG-sprite">
            </div>
        `,
        reactions: {
            crit: [
                ()=>env.combat.has('husk') || env.rpg.is2D ? "good enough" : "hehe",
            ],
            crit_buff: ["keep going"],
            dead: ["..."],
            receive_destabilized: ["i hear it calling"],
            receive_rez: ["let us finish this"],
            puncture: ["i need to fix this"],
            destabilized: ["..."],
            stun: ["where..."],
            receive_carapace: ["thank you"],
            receive_repairs: ["that is better"],
            receive_fear: [()=> env.rpg.is2D ? "there is nothing here" : "hollowed out...", "and yet it moves", ()=> env.rpg.is2D ? "where are you?" :"what happened to you?", "that cannot be", "..."],
            receive_redirection: ["i will return the favor"],
        },
    },

    tozik_npc: {
        name: "Tozik",
        readoutActor: "tozik",
        maxhp: 10,
        hp: 10,
        unique: true,
        move: 0,
        immunities: {
            scene_edge: true
        },
        actions: ["truly_nothing"],
        initialStatusEffects: [["autoplay_tozik", 1]],
        portrait: `<img class="portrait" src="/img/sprites/obesk/tozik/facecrop_pain.gif">`,
        portraitUrl: '/img/sprites/obesk/tozik/facetransparent_pain.gif',
        graphic: `
            <div class="sprite-wrapper autosize" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/obesk/tozik/gridtiny_warp.gif" style="width: 100px;" id="%SLUG-sprite">
            </div>
        `,
        reactions: {
            crit: [
                ()=>env.combat.has('husk') || env.rpg.is2D ? "good enough" : "hehe",
            ],
            crit_buff: ["keep going"],
            dead: ["..."],
            receive_destabilized: ["i hear it calling"],
            receive_rez: ["let us finish this"],
            puncture: ["i need to fix this"],
            destabilized: ["..."],
            stun: ["where..."],
            receive_carapace: ["thank you"],
            receive_repairs: ["that is better"],
            receive_fear: [()=> env.rpg.is2D ? "there is nothing here" : "hollowed out...", "and yet it moves", ()=> env.rpg.is2D ? "where are you?" :"what happened to you?", "that cannot be", "..."],
            receive_redirection: ["i will return the favor"],
        },
    },


    miltza: {
        name: "Miltza",
        readoutActor: "miltza",
        maxhp: 10,
        hp: 10,
        description: `'coordinates highly effective evasive and offensive maneuvers'`,
        unique: true,
        actions: ["miltza_attack", "direction", "evade"],
        sceneActions: ["miltza_attack", "scene_miltza_direction", "scene_evade"],
        portrait: `<img class="portrait" src="/img/sprites/obesk/miltza/combatportrait.gif">`,
        portraitUrl: '/img/sprites/obesk/miltza/combatportrait.gif',
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/obesk/miltza/gridtiny.gif" id="%SLUG-sprite">
            </div>
        `,
        reactions: {
            evade: [
                ()=>env.combat.has('husk') || env.rpg.is2D ? "wah!!" : "i did it!",
            ],
            crit: [() => env.rpg?.lastAction?.user?.team?.name == env.rpg?.lastAction?.initialTarget?.team?.name ? `forward!! get them!!!` : "die!! die!!"],
            crit_buff: ["is that better??"],
            miss: [
                ()=>env.combat.has('husk') || env.rpg.is2D ? "how does it move like that?!" : "next time",
            ],
            dead: ["..."],
            receive_crit: ["Æöö!!"],
            receive_puncture: ["restorative, quick!"],
            receive_buff: ["thank you!"],
            receive_destabilized: ["die DIE!! DIE!! DIE!!!"],
            puncture: ["i am losing cohesion!"],
            stun: ["oaauuuau"],
            receive_carapace: ["a shell!"],
            receive_repairs: ["thank you, thank you!", "so much better"],
            receive_fear: [()=> env.rpg.is2D ? "this cannot be real" : "that one looks like...!", "stop...", "velzie take me from here", "stay away! away!!"],
            receive_redirection: ["what??", "oh, thank you!"],
        }
    }, 

    /* golem maintenance expansion */
    bozko: {
        name: "Bozko",
        readoutActor: "bozko",
        maxhp: 25,
        hp: 25,
        description: `'guards allies and counterattacks';'prioritizes armor over evasive maneuvering'`,
        unique: true,
        actions: ["bozko_attack", "guard", "shell"],
        sceneActions: ["bozko_attack", "scene_pull", "scene_guard"],
        portrait: `<img class="portrait" src="/img/sprites/obesk/bozko/combatportrait.gif">`,
        portraitUrl: '/img/sprites/obesk/bozko/combatportrait.gif',
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <img class="sprite" style="width: calc(var(--gridTileSize)* 1.5);max-width: unset;" src="/img/sprites/obesk/bozko/gridtiny.gif" id="%SLUG-sprite">
            </div>
        `,
        reactions: {
            regen: ["..."],
            evade: ["no", "not so easy"],
            crit: ["get away from them", "smashed to pieces"],
            crit_buff: ["take this"],
            miss: ["ßÐƒ"],
            destabilized: ["..."],
            dead: ["..."],
            receive_rez: ["get back up..."],
            receive_crit: ["you!"],
            receive_puncture: [
                ()=>env.combat.has('cavik') ? "cavik!" : "it punched through..." 
            ],
            receive_buff: ["keep it up"],
            receive_destabilized: ["i hear them again..."],
            puncture: ["blood everywhere"],
            stun: ["what--"],
            receive_carapace: ["good"],
            receive_repairs: ["..."],
            receive_fear: ["no...", "stay back!", "...", ()=> env.rpg.is2D ? "so many lost" : "is it really you...?"],
            receive_spikes: ["come on", "strike me now..."],
            give_redirection: ["stay behind", "look at me!"],
        }
    }, 

    cavik: {
        name: "Cavik",
        readoutActor: "cavik",
        initialStatusEffects: [["terror", 1]],
        maxhp: 10,
        hp: 10,
        unique: true,
        description: `'wears foes down through use of explosives';'maintains allies with mending barriers'`,
        actions: ["cavik_attack_disruption", "cavik_charge", "evade"],
        sceneActions: ["scene_cavik_attack", "cavik_charge", "scene_evade"],
        portrait: `<img class="portrait" src="/img/sprites/obesk/cavik/combatportrait.gif">`,
        portraitUrl: '/img/sprites/obesk/cavik/combatportrait.gif',
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/obesk/cavik/gridtiny.gif" id="%SLUG-sprite">
            </div>
        `,
        reactions: {
            receive_hit: ["ow!!"],
            regen: ["coming together again!"],
            evade: ["oh!!", "what?!"],
            crit: ["i got you!", "catch!"],
            crit_buff: ["this should help!"],
            miss: ["ah!"],
            destabilized: ["..."],
            dead: ["..."],
            receive_rez: ["what happened?!", "i am back..?"],
            receive_crit: ["ow, ow!!!"],
            receive_puncture: ["oh no..."],
            receive_buff: ["thank you!"],
            receive_destabilized: ["it hurts", "hurts", "someone is there", "i feel you", "i cannot wake up"],
            puncture: ["i need to seal this!"],
            stun: ["whhaahh"],
            receive_fear: ["akizet!!", ()=> env.rpg.is2D ? "speak no more! please!" : "i... i remember you...", "keep it away from me!", "h--help me!", "no, no no no"],
            receive_redirection: ["thank you!!", "i will cover you!"],
        },
        
        events: {
            onInitialize: (actor) => { 
                if(env?.rpg?.scenario?.name == "ep4_split2") {
                    actor.reactions = {} // silent cavikreature
                }
            },
        },
    }, 

    ikgolem: {
        name: "IK Golem",
        readoutActor: "karik",
        maxhp: 20,
        hp: 20,
        unique: true,
        description: `'utilizes windup to access powerful attacks';'no inherent defensive capability'`,
        actions: ["windup_jab", "ik_windup"],
        windupActions: ["ik_attack", "dullflare", "focused_windup"],
        sceneActions: ["ik_attack", "scene_dullflare", "evade"],
        portrait: `<img class="portrait" src="/img/sprites/obesk/ikgol/facetransparent.gif">`,
        portraitUrl: '/img/sprites/obesk/ikgol/facetransparent.gif',
        graphic: `
            <div class="sprite-wrapper" style="width: 250px" id="%SLUG-sprite-wrapper">
                <img class="sprite" style="width: calc(var(--gridTileSize)* 1.5);max-width: unset;" src="/img/sprites/obesk/ikgol/gridtiny.gif" id="%SLUG-sprite">
            </div>
        `,
        
        events: {
            onInitialize: (actor) => { 
                if(check("PAGE!!ikawake")) {
                    actor.portrait = `<img class="portrait" src="/img/sprites/obesk/ikgol/facetransparent_awake.gif">`
                    actor.portraitUrl = `/img/sprites/obesk/ikgol/facetransparent.gif`
                }
            },
        },

        reactions: {
            receive_rez: ["ah, it works again!"],
            regen: ["much better"],
            evade: ["stop that!", "deflected!"],
            crit: ["ahaha...", "incredible!"],
            crit_buff: ["i hope that helps!"],
            miss: ["÷°ò!!"],
            destabilized: ["..."],
            dead: ["no! get up, get up!", "the body is not responding!!"],
            receive_crit: ["how--?!"],
            receive_puncture: ["the chassis!!"],
            receive_buff: ["excellent"],
            receive_destabilized: ["something is so wrong..."],
            puncture: ["losing cohesion fast!"],
            stun: ["it will not respond!!"],
            receive_carapace: ["more armor! yes!"],
            receive_repairs: ["thank you, thank you"],
            receive_fear: ["what did this to you?!", "i feel sick..."],
            receive_redirection: ["what?", "unnecessary, but thanks"],
        }
    },
    
    telyu: { // autoplayer
        name: "Telyu",
        readoutActor: "telyu",
        maxhp: 10,
        hp: 10,
        unique: true,
        move: 0,
        actions: ["truly_nothing"],
        initialStatusEffects: [["autoplay_telyu", 1]],
        portrait: `<img class="portrait" src="/img/sprites/obesk/telyu/combatportraitkarik.gif">`,
        portraitUrl: '/img/sprites/obesk/telyu/combatportraitkarik.gif',
        graphic: `
            <div class="sprite-wrapper autosize" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/obesk/telyu/gridtiny.gif" style="height: 200px;" id="%SLUG-sprite">
            </div>
        `,
        events: {
            onPieceCreation: (sprite) => {
                if(env.rpg?.scenario?.name != "ep4_vek_pt1") {
                    sprite.querySelector('img').src = "/img/sprites/obesk/telyu/gridtinykarik.gif"
                }
            }
        }
    },

    //as of the ING update this is more of a template since most husks use special versions
    //but they all reference the sprite generation of this one
    husk: {
        name: "Husk",
        readoutActor: "husk",
        maxhp: 20,
        hp: 20,
        actions: ["husk_attack", "speak", "stab", "evade"],

        //graphic is controlled mainly by the sprite creation event below, check it out!
        graphic: `
            <div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
                <div class="spritestack" id="%SLUG-sprite">
                    <img src="" class="sprite basis">
                    <div class="sprite toplayer"></div>
                    <div class="sprite bottomlayer"></div>
                </div>
                <div class="target" entity="husk"></div>
            </div>
        `,

        reactions: env.COMBAT_REACTIONS.husk,

        regenAllSprites: (ungeneratedOnly = false) => { //used in combat and stage stuff
            let query = '.husk.sprite-wrapper'
            if(ungeneratedOnly) query = '.husk.sprite-wrapper:not(.generated)'
            document.querySelectorAll('.husk.sprite-wrapper').forEach(sprite=>{
                sprite.classList.remove('generated')

                let specialHuskContainer = sprite.closest('.specialhusk')
                if(specialHuskContainer) {
                    let huskClass = Array.from(specialHuskContainer.classList).find(c => c.startsWith('husk-'))
                    if(huskClass) {
                        env.COMBAT_ACTORS.husk.events.onSpriteCreation(sprite, huskClass.replace('husk-', ''))
                        return
                    }
                }
                
                env.COMBAT_ACTORS.husk.events.onSpriteCreation(sprite)
            })
        },
        
        events: {
            onSpriteCreation: (sprite, specificSet) => {
                //if(content.querySelector("critta-map")) { return } ING todo - temporary disable until we get crittaversions

                let types = [
                    {
                        name: "type1",
                        bottomCount: 2,
                        topCount: 3
                    },
                    {
                        name: "type2",
                        bottomCount: 2,
                        topCount: 2
                    },
                    {
                        name: "type3",
                        bottomCount: 2,
                        topCount: 2
                    },
                    {
                        name: "type4",
                        bottomCount: 2,
                        topCount: 3
                    },
                ]

                let type = types.sample()
                type.decidedT = rand(1, type.topCount + 1)
                type.decidedB = rand(1, type.bottomCount + 1)

                switch(specificSet) {
                    case 'observer':
                        type = types[1]
                        type.decidedT = 1
                        type.decidedB = 2
                    break

                    case 'striker':
                        type = types[3]
                        type.decidedT = 2
                        type.decidedB = 1
                    break

                    case 'guard':
                        type = types[2]
                        type.decidedT = 2
                        type.decidedB = 2
                    break

                    case 'support':
                        type = types[0]
                        type.decidedT = 1
                        type.decidedB = 1
                    break

                    case 'lessersupport':
                        type = types[0]
                        type.decidedT = 2
                        type.decidedB = 2
                    break

                    case 'lesserobserver':
                        type = types[1]
                        type.decidedT = 2
                        type.decidedB = 1
                    break

                    case 'lessershielder':
                        type = types[2]
                        type.decidedT = 1
                        type.decidedB = 1
                    break
                }

                sprite.setAttribute("type", type.name.replace('type', ''))
                sprite.setAttribute("b", type.decidedB)
                sprite.setAttribute("t", type.decidedT)
                sprite.querySelector("img.basis").src = `/img/sprites/combat/foes/husks/${type.name}_bottom${type.decidedB}.gif`
                sprite.classList.add('generated')
            }
        }
    }, 

    constructor_golem: {
        name: "Constructor",
        maxhp: 15,
        hp: 15,
        actions: ["attack", "barrier", "spy_analyze", "special_limited_carapace"],
        graphic: `
            <div class="sprite-wrapper constructor-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/constructor.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/constructor-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/constructor-neck.gif" id="%SLUG-golemsprite-neck" class="sprite golemsprite-neck">
                    <img src="/img/sprites/combat/foes/constructor-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/constructor-arms.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="constructor"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        }
    },

    pressure_golem: {
        name: "Kivskin",
        maxhp: 25,
        hp: 25,
        actions: ["bozko_attack", "guard"],
        graphic: `
            <div class="sprite-wrapper pressure-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/pressure.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/pressure-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/pressure-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/pressure-leftarm.gif" id="%SLUG-golemsprite-leftarm" class="sprite golemsprite-leftarm">
                    <img src="/img/sprites/combat/foes/pressure-rightarm.gif" id="%SLUG-golemsprite-rightarm" class="sprite golemsprite-rightarm">
                </div>

                <div class="target" entity="kivskin"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        }
    },

    dull_golem: {
        name: "Dullfriend",
        maxhp: 35,
        hp: 35,
        actions: ["brawl", "windup"],
        windupActions: ["ik_attack", "dullflare", "focused_windup"],
        graphic: `
            <div class="sprite-wrapper golemsprite bossgolem" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/golemboss.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/golemboss-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/golemboss-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/golemboss-arms.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="foundation golem"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        }
    },

    surgeon_golem: {
        name: "Repairfriend",
        maxhp: 15,
        hp: 15,
        actions: ["repairfriend_swarm", "barrier", "repairfriend_swarm_malfunction"],
        initialStatusEffects: [["generic_can_malfunction", 1]],
        graphic: `
            <div class="sprite-wrapper surgeon-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/surgeon.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/surgeon-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/surgeon-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/surgeon-arms.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="repairfriend"></div>
            </div>
        `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        }
    },

    basic_golem: {
        name: "Golem",
        maxhp: 15,
        hp: 15,
        actions: ["special_self_destruct", "berserk", "foe_stab", "malfunction"],
        initialStatusEffects: [["generic_can_malfunction", 1]],
        graphic: `
            <div class="sprite-wrapper golemsprite basic-golem" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/golem.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/golem-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/golem-neck.gif" id="%SLUG-golemsprite-neck" class="sprite golemsprite-neck">
                    <img src="/img/sprites/combat/foes/golem-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/golem-leftarm.gif" id="%SLUG-golemsprite-leftarm" class="sprite golemsprite-leftarm">
                    <img src="/img/sprites/combat/foes/golem-rightarm.gif" id="%SLUG-golemsprite-rightarm" class="sprite golemsprite-rightarm">
                </div>

                <div class="target" entity="golem"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        }
    },

    dull_keeper: {
        name: "Dullzika",
        maxhp: 80,
        hp: 80,
        specialClass: "mainfoe",
        actions: ["special_dullsummon", "special_dullbuff"],
        statusImmunities: ["stun"],
        graphic: `
            <div class="sprite-wrapper golemsprite dullzika" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/combat/foes/turboglazika.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                
                <div class="sprite golemsprite-head">
                    <img src="/img/sprites/combat/foes/turboglazika-hat.gif" id="%SLUG-golemsprite-head">
                </div>
                <img src="/img/sprites/combat/foes/turboglazika-eyes.gif" id="%SLUG-golemsprite-neck" class="sprite golemsprite-neck">
                <img src="/img/sprites/combat/foes/turboglazika-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">

                <div class="target" entity="dullzika"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        }
    },

    dull_container: {
        name: "Warped Container",
        maxhp: 2,
        hp: 2,
        actions: ["brawl_weak"],
        graphic: `
            <div class="sprite-wrapper dulltainer" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/combat/foes/inc_dull.gif" id="%SLUG-sprite">
                <div class="target" entity="warped container"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
        initialStatusEffects: [["ethereal", 1]],
    },

    boss_golem_old: {
        name: "foundation golem",
        maxhp: 175,
        hp: 175,
        actions: ["incoherent_golemboss"],
        statusImmunities: ["stun"],
        lastStand: "bossgolem",
        graphic: `
            <div class="sprite-wrapper golemsprite bossgolem" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/golemboss.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/golemboss-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/golemboss-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/golemboss-arms.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="foundation golem"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        }
    },

    geli: {
        name: "Geli",
        readoutActor: "bsteli::bstrd",
        maxhp: 15,
        hp: 15,
        actions: ["unfocused_shot", "windup_cover"],
        windupActions: ["focused_shot", "hold_aim"],
        initialStatusEffects: [["visionary_geli", 1]],
        specialClass: "bstrdactor",
        portrait: `<img class="portrait" src="[[PORTRAITURL]]">`,
        portraitUrl: '/img/sprites/obesk/geli/bsteli/combatportrait.gif',
        reactions: {
            evade: ["wow!", "aahAHaha!!"],
            crit: [ "ahaha! i GOT THEM!!" ],
            miss: ["oh NO!!", "WASTED BULLET", "WILL GET NEXT 1!"],
            dead: ["i CANT MOVE"],
            receive_hit: ["OW"],
            receive_crit: ["WHY DOES IT HURT SO BAD", ">:("],
            receive_puncture: ["WHY DOES IT HURT SO BAD"],
            receive_buff: ["}:^)"],
            receive_destabilized: ["WAKING UP AGAIN", "MEGA BULLET!!"],
            receive_rez: ["NICE 1"],
            puncture: [":("],
            regen: ["doing GOOD", "ahahaAhaha!!"],
            destabilized: ["WATCH THIS"],
            stun: ["uu382*((U*#*( U("],
            receive_fear: [":O", "O_O"],
        }
    },

    bstrd: {
        name: "BSTRD",
        readoutActor: "bstrd",
        maxhp: 20,
        hp: 20,
        actions: [
            "special_fullauto",
            "surge"
        ],
        specialClass: "bstrdactor",
        initialStatusEffects: [["impatient", 1]],
        portrait: `<img class="portrait" src="[[PORTRAITURL]]">`,
        portraitUrl: '/img/sprites/bstrd/combatportrait.gif',
        reactions: {
            evade: ["8)", "IT S0 EASY"],
            crit: [ "BL4MN!!", "PoW!!", ">%^)"],
            miss: ["SHT", "almost GOT U"],
            dead: ["aeaeu HUrts BAD!!"],
            receive_crit: ["YEAOUUCH!!"],
            receive_puncture: ["bleedink...", "GOT BUNCTURE"],
            receive_buff: ["TIME 2 GET EM ;}"],
            puncture: ["HEAL plz"],
            regen: [":)", "SO BACK"],
            stun: ["CANT AIM WTF help"],
            receive_fear: ["WTF O_O"],
            receive_destabilized: ["WOaoOAw"],
            receive_rez: ["AHAHA :^) WE BACK"],
            puncture: ["OOUUEU"],
            destabilized: ["DOUBLE BULLETS !!"],
        }
    },

    efgy: {
        name: "EFGY",
        readoutActor: "bstigy",
        maxhp: 20,
        hp: 20,
        actions: [
            "special_fullauto",
            "surge"
        ],
        specialClass: "bstrdactor",
        initialStatusEffects: [["impatient", 1]],
        portrait: `<img class="portrait" src="[[PORTRAITURL]]">`,
        portraitUrl: '/img/local/uncosm/ozo/akieffigy_portrait_bstrd_nobg.gif',
        reactions: {
            evade: ["O)", "COOL BREEZE!! YAY!!"],
            crit: [ "ISABEL LOOK!!", "BLAMM~!", "YAYAYAYA"],
            miss: ["wat!! geli how do i hit them", "ok i try again?", "can i redo my turn"],
            dead: ["waaa!! nooo!"],
            receive_crit: ["mny PETALS!!"],
            receive_puncture: ["i dont like this part", "buncgture"],
            receive_buff: ["OK I SHOOT BIG NEXT??"],
            puncture: ["oww wowawaoww"],
            regen: ["eheheeeaaahahaha", "okk!!! yes"],
            stun: ["the dream is broken!! help!"],
            receive_fear: ["O"],
            receive_destabilized: ["WOaoOAw"],
            receive_rez: ["ÿæÿ"],
            puncture: ["OOUUEU"],
            destabilized: ["DOUBLE BULLETS !!"],
        }
    },

    you: {
        name: "interloper",
        readoutActor: "self",
        maxhp: 10,
        hp: 10,
        actions: [
            "sidearm",
            "coordination"
        ],
        initialStatusEffects: [["retaliation", 1]],
        portrait: `<img class="portrait" src="[[PORTRAITURL]]">`,
        portraitUrl: '/img/portraits/interlopercombat_rainbowcuteo3o.png',
        reactions: {} //silent
    },

    /* e3a2 crittamode expansion */

    critta_pawn: { // ing revisit. goes all in on mad claw, just without the PERISH chance. random chance and status manipulation
        name: "WRK",
        specialClass: "daemonactor",
        maxhp: 20,
        actions: ["mad_claw", "husk_evade"],
        initialStatusEffects: [["daemon_rot", 1]],
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="wrk"></div>
                <figure class="daemon pawn accurate-position"> 
                    <img src="/img/sprites/daemons/pawn/base.gif">
                    <div class="eye"></div>
                    <div class="scraps noimg">
                        <div class="scrap"></div>
                        <div class="scrap"></div>
                        <div class="scrap"></div>
                        <div class="scrap"></div>
                        <div class="scrap"></div>
                    </div>
                </figure>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
        events: {
            onSpawn: () => change("daemon", "saw")
        },
    },

    critta_knight: { // ing revisit. accumulates damage they deal as 'construction'. at 10, they summon an IDEA
        name: "CLW",
        specialClass: "daemonactor",
        maxhp: 35, 
        actions: ["resource_claw", "surge"],
        initialStatusEffects: [["daemon_rot", 1], ["daemon_constructor", 1]],
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="clw"></div>
                <figure class="daemon knight accurate-position">
                    <img src="/img/sprites/daemons/knight/body.gif">
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="uparm">
                        <div class="downarm">
                            <div class="upclaw"></div>
                            <div class="downclaw"></div>
                        </div>
                    </div>
                </figure>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
        events: {
            onSpawn: () => change("daemon", "saw")
        },
    },

    critta_bishop: {
        name: "NET",
        specialClass: "daemonactor",
        maxhp: 25,
        actions: ["inject", "corrupt"],
        initialStatusEffects: [["daemon_rot", 1]],
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="net"></div>
                <figure class="daemon bishop accurate-position">
                    <img src="/img/sprites/daemons/bishop/base.gif">
                    <div class="eye"></div>
                    <div class="tendril"></div>
                    <div class="tendril"></div>
                    <div class="tendril"></div>
                    <div class="tendril"></div>
                    <div class="tendril"></div>
                </figure>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
        events: {
            onSpawn: () => change("daemon", "saw")
        },
    },

    critta_rook: {
        name: "ENFC",
        specialClass: "daemonactor",
        maxhp: 40,
        actions: ["enforce", "focused_guard"],
        initialStatusEffects: [["daemon_rot", 1]],
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="enfc"></div>
                <figure class="daemon rook accurate-position">
                    <img src="/img/sprites/daemons/rook/body.gif">
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="leftarm">
                        <div class="downarm">
                            <div class="upclaw"></div>
                            <div class="downclaw"></div>
                        </div>
                    </div>
                    <div class="rightarm">
                        <div class="downarm">
                            <div class="upclaw"></div>
                            <div class="downclaw"></div>
                        </div>
                    </div>
                </figure>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
        events: {
            onSpawn: () => change("daemon", "saw")
        },
    },

    critta_queen: {
        name: "SEER",
        specialClass: "daemonactor royalty",
        maxhp: 60,
        actions: ["windup"],
        windupActions: ["special_rule", "wound_lastresort"],
        initialStatusEffects: [["daemon_rot", 1]],
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="seer"></div>
                <figure class="daemon queen accurate-position">
                    <img src="/img/sprites/daemons/queen/core.gif">
                    <div class="eye"></div>
                    <div class="ring"></div>
                    <div class="ring"></div>
                    <div class="ring"></div>
                </figure>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
        events: {
            onSpawn: () => change("daemon", "saw")
        },
    },

    critta_king: {
        name: "ARCHN",
        specialClass: "daemonactor royalty",
        maxhp: 60,
        actions: ["windup"],
        windupActions: ["special_judgement"],
        initialStatusEffects: [["daemon_rot", 1]],
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="archn"></div>
                <figure class="daemon king accurate-position">
                    <img src="/img/sprites/daemons/king/angles.gif">
                    <img src="/img/sprites/daemons/king/angles.gif">
                    <div class="box center"></div>
                    <div class="box outer"></div>
                    <div class="ring"></div>
                    <div class="eye"></div>
                </figure>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
        events: {
            onSpawn: () => change("daemon", "saw")
        },
    },

    /* critta minibosses */
    critta_jester: {
        name: "DCT",
        maxhp: 500,
        unique: true,
        specialClass: "mainfoe daemonactor",
        actions: ["special_sillyspawn", "special_sillybuff"],
        statusImmunities: ["stun"],
        initialStatusEffects: [["untargetable", 1], ["appeasement", 1]],
        graphic: `
            <div class="sprite-wrapper daemonsprite jester" id="%SLUG-sprite-wrapper">
                <div class="target" entity="dct"></div>
                <figure class="daemon director accurate-position">
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="hand"></div>
                    <div class="hand"></div>
                </figure>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
        events: {
            onSpawn: () => change("daemon", "saw")
        },
    },

    critta_spawner: {
        name: "SPWN",
        maxhp: 500,
        specialClass: "mainfoe daemonactor",
        actions: ["frame_translation"],
        initialStatusEffects: [["daemon_rot", 1], ["frame_boss", 1]],
        statusImmunities: ["stun"],
        graphic: `
            <div class="sprite-wrapper daemonsprite jester" id="%SLUG-sprite-wrapper">
                <div class="target" entity="spwn"></div>
                <figure class="daemon spawner" style="animation-delay: -4s">
                    <img src="/img/sprites/daemons/spawner/body.gif">
                    <img src="/img/sprites/daemons/spawner/body.gif">
                </figure>
            </div>
            `,
        events: {
            onSpawn: () => change("daemon", "saw")
        },
    },

    critta_spawner_bee: {
        name: "IDEA",
        specialClass: "daemonactor tinyplate bstrdspeech",
        maxhp: 10,
        actions: ["husk_attack_rot"],
        initialStatusEffects: [["ethereal_passive", 1], ["daemon_rot", 1], ["daemon_hallucination", 1]],
        turnCheck: "genericEthereal",
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="idea"></div>
                <figure class="daemon bee"><div class="sides"><span></span><span></span><span></span><span></span><span></span><span></span></div></figure>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
    },  

    critta_impetus: {
        name: "IMP",
        maxhp: 600,
        actions: ["nothing"],
        specialClass: "daemonactor", 
        initialStatusEffects: [["mimic", 1], ["conjoined", 1], ["daemon_rot", 1], ["frame_boss", 1]],
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="imp"></div>
                <figure class="daemon impetus">
                    <img src="/img/sprites/daemons/imp/body.gif">
                    <div class="eye"></div>
                    <div class="ceptors"></div>
                </figure>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
        events: {
            onSpawn: () => change("daemon", "saw")
        },
    },

    // critta boss - loop version
    critta_boss: {
        name: "Firmament",
        unique: true,
        maxhp: 1000000,
        specialClass: "mainfoe daemonactor",
        actions: ["special_wallspawn"],
        initialStatusEffects: [["imperfect_reset", 5], ["permanent_hp", 1]],
        graphic: `
            <div class="sprite-wrapper thewall" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/daemons/wall/crack.gif">
            </div>
            `,
        reactions: {} //SILENT CREATURE
    },

    // critta boss - last stand version
    critta_boss_boat: {
        name: "Firmament",
        specialClass: "mainfoe daemonactor",
        maxhp: 1,
        unique: true,
        lastStand: "thewall",
        statusImmunities: ["stun"],
        actions: ["special_wallspawn_boat"],
        initialStatusEffects: [["untargetable_silent", 1]],
        graphic: `<div class="sprite-wrapper" id="%SLUG-sprite-wrapper" style="display: none"></div>`,
        
        events: {
            onSpawn: (actor) => {
                actor.hp = 0
                updateStats({actor})
            }
        },
        reactions: {} //SILENT CREATURE
    },

    critta_pawn_boat: {
        name: "WRK",
        specialClass: "daemonactor",
        maxhp: 10,
        actions: ["attack_weak"],
        initialStatusEffects: [["ethereal", 1]],
        graphic: `
            <div class="position-wrapper">
                <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                    <img class="sprite" src="/img/sprites/daemons/pawn/staticsmall.gif" id="%SLUG-sprite">
                </div>
            </div>
            `,
        reactions: {} //SILENT CREATURE
    },

    critta_knight_boat: {
        name: "CLW",
        specialClass: "daemonactor",
        maxhp: 30,
        actions: ["boat_clw_windup"],
        windupActions: ["special_boat_clw_grab"],
        initialStatusEffects: [["ethereal", 1]],
        graphic: `
            <div class="position-wrapper">
                <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                    <img class="sprite" src="/img/sprites/daemons/knight/staticsmall.gif" id="%SLUG-sprite">
                </div>
            </div>
            `,
        reactions: {} //SILENT CREATURE
    },

    critta_bishop_boat: {
        name: "NET",
        specialClass: "daemonactor",
        maxhp: 25,
        actions: ["parasite", "destabilize"],
        initialStatusEffects: [["ethereal", 1]],
        graphic: `
            <div class="position-wrapper">
                <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                    <img class="sprite" src="/img/sprites/daemons/bishop/staticsmall.gif" id="%SLUG-sprite">
                </div>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
    },

    critta_king_boat: {
        name: "ARCHN",
        specialClass: "daemonactor",
        maxhp: 200,
        actions: ["windup"],
        windupActions: ["special_judgement"],
        initialStatusEffects: [["ethereal", 1]],
        graphic: `
            <div class="position-wrapper king">
                <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                    <figure class="daemon king accurate-position">
                        <img src="/img/sprites/daemons/king/angles.gif">
                        <img src="/img/sprites/daemons/king/angles.gif">
                        <div class="box center"></div>
                        <div class="box outer"></div>
                        <div class="ring"></div>
                        <div class="eye"></div>
                    </figure>
                </div>
            </div>
            `,
        reactions: {} //SILENT CREATURE
    },

    critta_queen_boat: {
        name: "SEER",
        specialClass: "daemonactor",
        maxhp: 200,
        actions: ["windup"],
        windupActions: ["special_rule", "wound_lastresort"],
        initialStatusEffects: [["ethereal", 1]],
        graphic: `
            <div class="position-wrapper queen">
                <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                    <figure class="daemon queen accurate-position">
                        <img src="/img/sprites/daemons/queen/core.gif">
                        <div class="eye"></div>
                        <div class="ring"></div>
                        <div class="ring"></div>
                        <div class="ring"></div>
                    </figure>
                </div>
            </div>
            `,
        reactions: {} //SILENT CREATURE
    },

    critta_jester_boat: {
        name: "DCT",
        maxhp: 1000,
        specialClass: "mainfoe daemonactor",
        actions: ["special_boat_waveattack"],
        statusImmunities: ["stun"],
        initialStatusEffects: [["ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper daemonsprite jester" id="%SLUG-sprite-wrapper">
                <figure class="daemon director accurate-position">
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="hand"></div>
                    <div class="hand"></div>
                </figure>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
       
        events: { // we move the sprite to the ocean here
            onSpawn: (actor) => {
                let ocean = env.rpg.querySelector("#ocean")
                ocean.appendChild(actor.sprite)
            }
        },
    },

    // special e3a2 encounters
    falsecritta: { //falsecrittas are like daemon versions of your shells
        name: "Antishell",
        specialClass: "daemonactor",
        maxhp: 30,
        actions: [ "primary", "secondary", "evade" ],
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="anti"></div>
                <figure class="daemon falsecritta">
                    <img src="/img/sprites/daemons/falsecritta.gif">
                    <div class="eye"></div>
                </figure>
            </div>
        `,
       
        events: {
            //ING update: falsecrittas now always spawn with a full set of humors
            //further strength just gives them augments for those actions
            onInitialize: (actor) => { 
                let antiStrength = env.crittaMap.getModQty("global_anti")
                actor.alterations = []
                actor.components = {}
                let slots = ["primary", "secondary", "utility"]

                let selections = shuffle(shuffle(env.crittaMap.possibleZoneComponents.map(component => component.slug)).splice(0, 3))
                for (const slotName of slots) {
                    let selection = false
                    selection = selections.shift()
                    actor.components[slotName] = selection.replace("intrusive", "light")
                }

                //for each antiStrength over 1, get an augment for their selected components
                if(antiStrength > 1) {
                    let augmentSlots = shuffle(slots)
                    let augments = Object.entries(env.ACTOR_AUGMENTS.generic)
                    for(let i = 1; i < antiStrength; i++) {
                        let slot = augmentSlots.shift()
                        let augment = augments.find(aug=>aug[1].component[0] == slot && aug[1].component[1] == actor.components[slot])
                        if(augment) {
                            actor.alterations = actor.alterations.concat(augment[1].alterations)
                        }
                    }
                }

                console.log('generated anti', actor)
            },

            onSpriteCreation: (sprite) => {
                sprite.querySelector("img").src = [
                    `/img/sprites/daemons/falsecritta.gif`,
                    `/img/sprites/daemons/falsecritta2.gif`,
                    `/img/sprites/daemons/falsecritta3.gif`,
                    `/img/sprites/daemons/falsecritta4.gif`,
                    `/img/sprites/daemons/falsecritta5.gif`,
                ].sample()
            }
        },

        zonehpBonus: 5,
    },

    intrusive: {
        name: "???",
        maxhp: 500000,
        unique: true,
        specialClass: "intrusiveactor mainfoe",
        initialStatusEffects: [["intrusive", 1], ["stun_immune", 5]],
        actions: ["special_intrusive"],
        graphic: `
            <div class="sprite-wrapper intrusive maintrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/1.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        },
       
        events: {
            onSpawn: (actor) => {
                env.rpg.classList.add('hideteams', 'intrusivetro')
                setTimeout(()=>{
                    env.rpg.classList.remove("intrusivetro")
                    env.bgm.seek(27)
                }, 500)
                setTimeout(()=>{
                    env.rpg.classList.remove("hideteams")
                }, 15000)

                env.rpg.insertAdjacentHTML('beforeend', `
                <figure id="chancepanel" class="hidden" for="${actor.slug}">
                    <img src="/img/sprites/flantrusive/panelbase.gif">
                    <div class="wheel">
                        <ul>
                            <li class="d1">1</li>
                            <li class="d2">2</li>
                            <li class="d3">3</li>
                            <li class="d4">4</li>
                            <li class="d5">5</li>
                            <li class="d6">6</li>
                        </ul>
                    </div>
                    <div class="display">
                        <ol>
                            <li class="d1">1. life up</li>
                            <li class="d2">2. main up</li>
                            <li class="d3">3. unlucky</li>
                            <li class="d4">4. bomb</li>
                            <li class="d5">5. unlucky</li>
                            <li class="d6">6. change</li>
                        </ol>
                    </div>
                    <div class="result">
                        <div>
                            <span></span>
                        </div>
                    </div>
                </figure>`)

                actor.chancePanel = env.rpg.querySelector(`#chancepanel[for="${actor.slug}"]`)
                actor.chancePanel.result = actor.chancePanel.querySelector(".result span")
                actor.chancePanel.spin = (state) => { 
                    actor.chancePanel.removeAttribute("chosen")
                    actor.chancePanel.classList.toggle("spinning", state) 
                    actor.chancePanel.result.innerHTML = "???"
                }

                actor.chancePanel.stopAndResult = () => { 
                    let result = rand(1, 7)
                    actor.chancePanel.spin(false)
                    actor.chancePanel.setAttribute("chosen", result)

                    return result
                }

                if(!check("flan")) {
                    switch(check("e3a2escape")) {
                        case "complete":
                            change("flan", "post-escape")
                        break

                        default:
                            change("flan", "pre-escape")
                    }
                }
            }
        },
    },
    
    intrusive_blocker: {
        name: "???",
        maxhp: 300,
        specialClass: "intrusiveactor",
        actions: ["windup_jab", "kivskin_guard", "kivskin_malfunction"],
        windupActions: ["archival_smash"],
        initialStatusEffects: [["intrusive", 1], ["weak_point", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/2.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        },
    },
    
    intrusive_archival: {
        name: "???",
        maxhp: 400,
        hp: 300,
        specialClass: "intrusiveactor",
        initialStatusEffects: [["intrusive", 1], ["weak_point", 1], ["frame_archival", 1]],
        actions: ["windup"],
        windupActions: ["intrusive_smash"],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/3.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        },
    },
    
    intrusive_bishopfreak: {
        name: "???",
        maxhp: 150,
        specialClass: "intrusiveactor",
        actions: ["frenzy", "husk_target", "special_restorative_barrier", "husk_coordinate", "rez"],
        initialStatusEffects: [["intrusive", 1], ["impatient", 1], ["active_support", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/4.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        },
    },
    
    intrusive_statusoid: {
        name: "???",
        maxhp: 400,
        specialClass: "intrusiveactor",
        actions: ["windup"],
        windupActions: ["special_rule", "special_judgement", "wound_lastresort"],
        initialStatusEffects: [["intrusive", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/5.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        },
    },
    
    intrusive_bomblet: {
        name: "???",
        maxhp: 100,
        specialClass: "intrusiveactor",
        actions: ["nothing"],
        initialStatusEffects: [["intrusive", 1], ["ominous_timer", 1], ["ethereal_passive", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <div class="timer"></div>
                <img src="/img/sprites/flantrusive/6.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        },
    },

    //EP4 testing and unfinished archetypes
    sandboxer: {
        name: "sandbox",
        maxhp: 1111,
        hp: 1111,
        move: 0,
        unique: true,
        actions: ["nothing"],
        lastStand: true,
        initialStatusEffects: [["immobile", 1], ["shroud", 1]],
        graphic: `
        <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
            <img class="sprite" src="/img/sprites/combat/foes/attendant_spectral.gif" id="%SLUG-sprite">
        </div>
        `,
    },
    
    cutscenedriver: {
        name: "idiot",
        maxhp: 10000,
        hp: 10000,
        move: 0,
        unique: true,
        actions: ["truly_nothing"],
        initialStatusEffects: [["ethereal_passive", 1], ["immobile", 1]],
        graphic: `
        <div class="sprite-wrapper spectral autosize" id="%SLUG-sprite-wrapper">
            <img class="sprite" src="/img/viendbot.png" id="%SLUG-sprite" style="width: 50px;">
        </div>
        `,
    },
    
    //ep4 grid enemy archetypes, might not use all
    //types of 'spectrals' who serve  specific purposes in the new combat system
    arch_dummy: {
        //testing dummy
        name: "idiot",
        maxhp: 10000,
        hp: 10000,
        move: 0,
        actions: ["nothing"],
        initialStatusEffects: [["ethereal_passive", 1], ["immobile", 1]],
        
        graphic: `
        <div class="sprite-wrapper spectral autosize" id="%SLUG-sprite-wrapper">
            <div class="target" entity="spectral moron"></div>
            <img class="sprite" src="/img/viendbot.png" id="%SLUG-sprite" style="width: 50px;">
        </div>
        `,
    },

    arch_formless: {
        //basic enemy type that just runs and hits
        name: "Mass",
        maxhp: 10,
        hp: 1,
        move: 4,
        advanceModifier: 0.5,
        actions: ["formless_pull"],
        initialStatusEffects: [["ethereal_passive", 1]],
        graphic: `
        <div class="sprite-wrapper spectral autosize" id="%SLUG-sprite-wrapper">
            <div class="target" entity="spectral mass"></div>
            <img class="sprite" src="/img/sprites/combat/foes/constructor_spectral.gif" id="%SLUG-sprite">
        </div>
        `,
        
        events: {
            onPieceCreation: (sprite) => {
                sprite.querySelector("img").src = `/img/sprites/combat/foes/formless-eyes_${rand(1, 13)}.gif`
                sprite.classList.add('generated')
            }
        }
    },

    arch_formless_enraged: {
        //cribs the archivist's rampage as an extra freak during the finale
        name: "Enraged",
        maxhp: 10,
        hp: 3,
        move: 3,
        actions: ["tele_enraged_rampage"],
        initialStatusEffects: [["ethereal_passive", 1]],
        graphic: `
        <div class="sprite-wrapper spectral enragedformless autosize" id="%SLUG-sprite-wrapper">
            <div class="target" entity="spectral mass"></div>
            <img class="sprite" src="/img/sprites/combat/foes/constructor_spectral.gif" id="%SLUG-sprite">
        </div>
        `,
        
        events: {
            onPieceCreation: (sprite) => {
                sprite.querySelector("img").src = `/img/sprites/combat/foes/formless_enraged_${rand(1, 5)}.gif`
                sprite.classList.add('generated')
            }
        }
    },

    arch_puncher_tutorial: {
        //knockback-focused basic enemy
        //weakened version so you don't get fucked uppp in the very intro
        name: "Figure",
        maxhp: 20,
        hp: 20,
        move: 3,
        actions: ["arch_punch_weak"],
        lastResortActions: ["evade"],
        initialStatusEffects: [["ethereal_passive", 1], ["specter_puncher", 1]],
        graphic: `
        <div class="sprite-wrapper spectral autosize" id="%SLUG-sprite-wrapper">
            <div class="target" entity="spectral figure"></div>
            <img class="sprite" src="/img/sprites/combat/foes/shaped_1.gif" id="%SLUG-sprite">
        </div>
        `,
    },

    arch_puncher: {
        //knockback-focused basic enemy
        name: "Figure",
        maxhp: 20,
        hp: 20,
        move: 3,
        actions: ["arch_punch"],
        lastResortActions: ["evade"],
        initialStatusEffects: [["ethereal_passive", 1], ["specter_puncher", 1]],
        graphic: `
        <div class="sprite-wrapper spectral autosize" id="%SLUG-sprite-wrapper">
            <div class="target" entity="spectral figure"></div>
            <img class="sprite" src="/img/sprites/combat/foes/shaped_1.gif" id="%SLUG-sprite">
        </div>
        `,
    },

    arch_harasser: {
        // annoyer enemy
        // teleports to an enemy on turn start, teleports away on stab success
        name: "Attendant",
        maxhp: 15,
        hp: 15,
        move: 3,
        actions: ["special_arch_harasser_stab"],
        initialStatusEffects: [["ethereal_passive", 1]],
        graphic: `
        <div class="sprite-wrapper spectral autosize" id="%SLUG-sprite-wrapper">
            <div class="target" entity="spectral attendant"></div>
            <img class="sprite" src="/img/sprites/combat/foes/attendant_spectral.gif" id="%SLUG-sprite">
        </div>
        `,
    },

    arch_sniper: {
        name: "Attendant",
        maxhp: 15,
        hp: 10,
        move: 3,
        /* winds up to snipe */
        /*actions: ["windup"],*/
        actions: ["arch_tele_snipe_setup"],
        windupActions: ["arch_tele_snipe"],
        initialStatusEffects: [["ethereal_passive", 1], ["specter_sniper", 1]],
        graphic: `
        <div class="sprite-wrapper spectral autosize" id="%SLUG-sprite-wrapper">
            <div class="target" entity="spectral attendant"></div>
            <img class="sprite" src="/img/sprites/combat/foes/attendant_spectral.gif" id="%SLUG-sprite">
        </div>
        `,
    },

    arch_bomber: {
        name: "Shape",
        maxhp: 15,
        hp: 10,
        move: 4,
        /* biig bombs. now spawns a box thing you can move around before it detonates */
        actions: ["arch_bomb_spawn"],
        initialStatusEffects: [["ethereal_passive", 1], ["specter_bomber", 1]],
        graphic: `
        <div class="sprite-wrapper spectral autosize" id="%SLUG-sprite-wrapper">
            <div class="target" entity="spectral shape"></div>
            <img class="sprite" src="/img/sprites/combat/foes/shaped_2.gif" id="%SLUG-sprite">
        </div>
        `,
    },

    arch_channeler: {
        name: "Glazika",
        maxhp: 25,
        hp: 25,
        move: 3,
        actions: ["special_arch_tele_channel"],
        initialStatusEffects: [["ethereal_passive", 1]],
        graphic: `
        <div class="sprite-wrapper spectral autosize" id="%SLUG-sprite-wrapper">
            <div class="target" entity="spectral glazika"></div>
            <img class="sprite" src="/img/sprites/combat/foes/glazika_spectral.gif" id="%SLUG-sprite">
        </div>
        `,
    },

    arch_charger: {
        name: "Horror",
        maxhp: 50,
        hp: 50,
        move: 6,
        immunities: {
            stun: true
        },
        actions: ["tele_arch_hulk_rampage"],
        initialStatusEffects: [["ethereal_passive", 1], ["kb_immune", 1]],
        graphic: `
        <div class="sprite-wrapper spectral autosize riftcharger" id="%SLUG-sprite-wrapper">
            <div class="target" entity="spectral horror"></div>
            <img class="sprite" src="/img/sprites/combat/foes/formless_charger.gif" id="%SLUG-sprite">
        </div>
        `,
    },

    arch_puller: {
        name: "Golem",
        maxhp: 15,
        hp: 15,
        move: 4,
        /* like bozko's pull, but it does damage and is for enemies only */
        actions: ["arch_pull"],
        initialStatusEffects: [["ethereal_passive", 1]],
        
        graphic: `
        <div class="sprite-wrapper spectral autosize" id="%SLUG-sprite-wrapper">
            <div class="target" entity="spectral golem"></div>
            <img class="sprite" src="/img/sprites/combat/foes/golem_spectral.gif" id="%SLUG-sprite" style="transform: translateY(-10%)">
        </div>
        `,
    },

    arch_support: {
        name: "Jutskin",
        maxhp: 15,
        hp: 15,
        move: 1,
        actions: ["arch_supportdash", "maintstab"],
        initialStatusEffects: [["ethereal_passive", 1], ["specter_support", 1]],
        
        graphic: `
        <div class="sprite-wrapper spectral autosize" id="%SLUG-sprite-wrapper">
            <div class="target" entity="spectral jutskin"></div>
            <img class="sprite" src="/img/sprites/combat/foes/maintcloak_spectral.gif" id="%SLUG-sprite">
        </div>
        `,
    },

    /* destructibles */
    destructible_table: {
        name: "Display",
        maxhp: 10,
        hp: 10,
        actions: ["nothing"],
        standClass: "destructible",
        tileClass: "destructiblebearertall",
        painter: "nopainter",
        graphic: `
            <div class="sprite-wrapper destructible marbletable nofilter" id="%SLUG-sprite-wrapper">
            </div>
        `,
        initialStatusEffects: [["destructible", 1]]
    },

    destructible_adull: {
        name: "Altar",
        maxhp: 10,
        hp: 10,
        actions: ["nothing"],
        standClass: "destructible",
        tileClass: "destructiblebearer",
        painter: "nopainter",
        graphic: `<div class="sprite-wrapper destructible adull nofilter" id="%SLUG-sprite-wrapper">
            <div class="target" entity="adull's altar" listeningfor="--playercontrol-rotation" directattribute="true"></div>
            <div class="adullgfx">
                <img src="/img/local/embassy/f2_bright_combat.gif">
                <img src="/img/local/embassy/f2_bright_combat.gif">
            </div>
        </div>`,
        initialStatusEffects: [["ethereal", 10]],
    },

    destructible_minishelf: {
        name: "Pillar",
        maxhp: 3,
        hp: 3,
        actions: ["nothing"],
        standClass: "destructible",
        tileClass: "destructiblebearer",
        painter: "nopainter",
        graphic: `<div class="sprite-wrapper destructible adull nofilter" id="%SLUG-sprite-wrapper">
            <div class="target" entity="priority branch"></div>
            <div class="adullgfx">
                <img src="/img/local/embassy/mind/littleshelf.gif">
                <img src="/img/local/embassy//mind/littleshelf.gif">
            </div>
        </div>`,
        initialStatusEffects: [["destructible", 1], ["ethereal_passive", 1]],
    },

    destructible_volatile: {
        name: "Chemicals",
        maxhp: 10,
        hp: 10,
        actions: ["nothing"],
        standClass: "destructible",
        tileClass: "destructiblebearer",
        painter: "nopainter",
        graphic: `<div class="sprite-wrapper destructible box nofilter" id="%SLUG-sprite-wrapper" style="width: var(--gridTileSize); height: var(--gridTileSize)">
            <div class="deadtainer warp"><span></span><span></span><span></span><span></span><span></span></div>
        </div>`,
        initialStatusEffects: [["ethereal", 10], ["bomb_volatile", 1]],
    },

    destructible_box: {
        name: "Container",
        maxhp: 10,
        hp: 10,
        noHPDisplay: true,
        forceStatus: true,
        lastStand: true,
        immunities: {
            scene_edge: true
        },
        actions: ["nothing"],
        standClass: "destructible",
        tileClass: "destructiblebearer",
        painter: "nopainter",
        graphic: `<div class="sprite-wrapper destructible box nofilter" id="%SLUG-sprite-wrapper" style="width: var(--gridTileSize); height: var(--gridTileSize)">
            <div class="deadtainer"><span></span><span></span><span></span><span></span><span></span></div>
        </div>`,
        initialStatusEffects: [["destructible", 1], ["ethereal_passive", 10], ["shroud_invincible", 1]],
    },

    destructible_blockage: {
        name: "Blockage",
        maxhp: 1,
        hp: 1,
        noHPDisplay: true,
        forceStatus: true,
        immunities: {
            scene_edge: true,
            knockback: true
        },
        actions: ["nothing"],
        graphic: `<div class="sprite-wrapper autosize destabomb" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/combat/foes/riftbomb.gif" id="%SLUG-sprite" style="animation: SHAKE 200ms infinite">
            </div>`,
        initialStatusEffects: [["destructible", 1], ["ethereal_passive", 10]],
    },

    destructible_bomb: { 
        name: "Rift",
        maxhp: 10,
        hp: 10,
        noHPDisplay: true,
        forceStatus: true,
        lastStand: true,
        actions: ["nothing"],
        immunities: {
            scene_edge: true
        },
        graphic: `
            <div class="sprite-wrapper autosize destabomb" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/combat/foes/riftbomb.gif" id="%SLUG-sprite" style="animation: SHAKE 200ms infinite">
            </div>`,
        initialStatusEffects: [["destructible", 1], ["shroud_invincible", 1]],
    },

    rift_item: { // unused
        name: "Material Rift",
        maxhp: 6,
        hp: 6,
        actions: ["nothing"],
        holdingItem: {
            name: "aima_cyst",
            qty: 2
        },
        graphic: `
            <div class="sprite-wrapper autosize" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/combat/dullsplosion.png" id="%SLUG-sprite" style="width: 200px">
            </div>`,
        initialStatusEffects: [["ethereal_passive", 1], ["lootbox", 1]],
    },

    // unique enemies for ep4
    vekoa_boss: {
        name: "???",
        maxhp: 100,
        hp: 100,
        move: 10,
        unique: true,
        lastStand: true,
        noHPDisplay: true,
        actions: ["truly_nothing"],
        initialStatusEffects: [["shroud_vekoa", 1]],
        immunities: {
            scene_edge: true
        },
        graphic: `
        <div class="sprite-wrapper vekoa autosize" id="%SLUG-sprite-wrapper">
            <img class="sprite" id="vekoasprite" src="/img/sprites/vekoa/vekoahaze.gif" id="%SLUG-sprite">
        </div>
        `,

        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        }
    },

    /* EP4 spine: archivist boss */
    spine_archivist: {
        name: "Archivist",
        maxhp: 80,
        hp: 80,
        move: 0,
        unique: true,
        actions: ["windup"],
        lastStandActions: ["archivist_charge"],
        statusImmunities: ["stun"],
        lastStand: true,
        initialStatusEffects: [["archivist_split_focus", 1], ["shroud", 1]],
        graphic: `
        <div class="sprite-wrapper autosize" id="%SLUG-sprite-wrapper">
            <div class="target" entity="possessed archivist"></div>
            <img class="sprite" src="/img/sprites/combat/foes/archivist1.gif" id="%SLUG-sprite">
        </div>
        `,
    },

    spine_archivist_ing: {
        name: "Archivist",
        maxhp: 160,
        hp: 160,
        move: 0,
        unique: true,

        actions: ["special_archivist_maintain"],
        defenseActions: ["special_archivist_raise", "special_archivist_maintain", "archival_smash"],
        lastStandActions: ["archivist_lunge"],

        statusImmunities: ["stun"],
        lastStand: true,
        initialStatusEffects: [["archivist_split_focus", 1], ["shroud", 1]],
        graphic: `
        <div class="sprite-wrapper autosize" id="%SLUG-sprite-wrapper">
            <div class="target" entity="possessed archivist"></div>
            <img class="sprite" src="/img/sprites/combat/foes/archivist1.gif" id="%SLUG-sprite">
        </div>
        `,
    },

    spine_keeper: {
        name: "Keeper",
        maxhp: 10,
        hp: 10,
        move: 3,
        actions: ["spine_golem_lunge"],
        windupActions: ["archival_smash"],
        initialStatusEffects: [["ethereal_passive", 1]],
        graphic: `
        <div class="sprite-wrapper spectral autosize" id="%SLUG-sprite-wrapper">
            <div class="target" entity="spectral archival golem"></div>
            <img class="sprite" src="/img/sprites/combat/foes/archivalgolem_spectral.gif" id="%SLUG-sprite">
        </div>`,
    },

    spine_keeper_ing: {
        name: "Keeper",
        maxhp: 60,
        hp: 35,
        move: 2,
        actions: ["spine_golem_jab", "special_spine_acquisition"],
        windupActions: ["archival_smash", "special_spine_acquisition"],
        initialStatusEffects: [["ethereal_passive", 1], ["specter_archival", 1]],
        graphic: `
        <div class="sprite-wrapper spectral autosize" id="%SLUG-sprite-wrapper">
            <div class="target" entity="spectral archival golem"></div>
            <img class="sprite" src="/img/sprites/combat/foes/archivalgolem_spectral.gif" id="%SLUG-sprite">
        </div>`,
    },

    /* EP4 heart */
    heart_parasite_old: {
        name: "Parasite",
        maxhp: 500,
        hp: 500,
        move: 0,
        unique: true,
        immunities: {
            pull: true,
            stun: true,
            scene_edge: true,
            knockback: true,
        },
        actions: ["special_heart_parasite_old"],
        initialStatusEffects: [["conjoined", 1], ["heart_parasite_old", 1]],
        graphic: `
        <div class="sprite-wrapper spectral autosize riftcharger" id="%SLUG-sprite-wrapper">
            <div class="target" entity="spectral horror"></div>
            <img class="sprite" src="/img/sprites/combat/foes/heart_freak.gif" id="%SLUG-sprite">
        </div>
        `,
    },

    heart_parasite: {
        name: "Parasite",
        maxhp: 500,
        hp: 500,
        move: 0,
        unique: true,
        lastStand: true,
        immunities: {
            pull: true,
            scene_edge: true,
            knockback: true,
        },
        standClass: "destructible",
        tileClass: "destructiblebearer",
        painter: "stand",
        actions: ["special_heart_parasite"],
        initialStatusEffects: [["destructible_cross", 1], ["heart_parasite", 1], ["puncture_weakness", 1]],
        graphic: `
        <div class="sprite-wrapper destructible autosize riftcharger" id="%SLUG-sprite-wrapper" listeningfor="--playercontrol-tilt--playercontrol-rotation" directattribute="true">
            <img class="sprite slice1" src="/img/sprites/combat/foes/heart_freak.gif" id="%SLUG-sprite">
            <img class="sprite slice2" src="/img/sprites/combat/foes/heart_freak.gif" id="%SLUG-sprite">
            <div class="target" entity="heart parasite"></div>
        </div>
        `,
    },

    heart_tendril: {
        name: "Tendril",
        maxhp: 500,
        hp: 500,
        move: 0,
        initialStatusEffects: [["conjoined", 1], ["resilient", 1], ["ethereal_passive", 1]],
        immunities: {
            scene_edge: true,
            knockback: true,
        },
        phase2Actions: ["heart_tendril_pull", "heart_tendril_swipe", "arch_bomb_spawn"],
        actions: ["tele_heart_tendril_square", "tele_heart_tendril_plus"],
        graphic: `
            <div class="sprite-wrapper autosize" id="%SLUG-sprite-wrapper">
                <div class="target" entity="parasitic limb"></div>
                <img class="sprite" src="/img/sprites/combat/foes/splittendril_attacker.gif" id="%SLUG-sprite">
            </div>
        `,
    },

    heart_tendril_lesser: {
        name: "Tendril",
        maxhp: 8,
        hp: 2,
        move: 0,
        initialStatusEffects: [["heart_siphon_attacker", 1], ["ethereal_passive", 1]],
        immunities: {
            scene_edge: true,
        },
        actions: ["opportunity", "heart_tendril_pull"],
        graphic: `
            <div class="sprite-wrapper autosize" id="%SLUG-sprite-wrapper">
                <div class="target" entity="parasitic limb"></div>
                <img class="sprite" src="/img/sprites/combat/foes/siphontendril_attacker_dangle.gif" id="%SLUG-sprite">
            </div>
        `,
    },

    heart_siphon: {
        name: "Siphon",
        maxhp: 15,
        hp: 10,
        move: 0,
        initialStatusEffects: [["heart_siphon", 1], ["ethereal_passive", 1], ["destructible_cross", 1], ["puncture_weakness", 1]],
        immunities: {
            scene_edge: true,
            knockback: true,
            pull: true,
        },
        actions: ["special_heart_siphon"],
        graphic: `
            <div class="sprite-wrapper autosize" id="%SLUG-sprite-wrapper">
                <div class="target" entity="parasitic siphon"></div>
                <img class="sprite" src="/img/sprites/combat/foes/siphontendril.gif" id="%SLUG-sprite">
            </div>
        `,
    },

    destructible_heart_wall_inner: {
        name: "Membrane",
        maxhp: 100,
        hp: 100,
        actions: ["nothing"],
        standClass: "destructible",
        tileClass: "destructiblebearertall",
        pieceClass: "destructible",
        unique: true,
        immunities: {
            knockback: true,
            stun: true,
            pull: true,
        },
        initialStatusEffects: [["heart_wall", 1], ["ethereal_passive", 1]],
        graphic: `<div class="sprite-wrapper destructible" id="%SLUG-sprite-wrapper">
            <div class="sprite parasitewall">
                <div class="pwall pwall-up pwinner"></div>
                <div class="pwall pwall-right pwinner"></div>
                <div class="pwall pwall-down pwinner"></div>
                <div class="pwall pwall-left pwinner"></div>
            </div>
        </div>`,
    },

    destructible_heart_wall_outer: {
        name: "Membrane",
        maxhp: 75,
        hp: 75,
        actions: ["nothing"],
        standClass: "destructible",
        tileClass: "destructiblebearertall",
        pieceClass: "destructible",
        unique: true,
        immunities: {
            knockback: true,
            stun: true,
            pull: true,
        },
        initialStatusEffects: [["heart_wall", 1], ["ethereal_passive", 1]],
        graphic: `<div class="sprite-wrapper destructible" id="%SLUG-sprite-wrapper">
            <div class="sprite parasitewall">
                <div class="pwall pwall-up"></div>
                <div class="pwall pwall-right"></div>
                <div class="pwall pwall-down"></div>
                <div class="pwall pwall-left"></div>
            </div>
        </div>`,
    },

    destructible_heart_wall: {
        name: "Tendril",
        maxhp: 200,
        hp: 200,
        actions: ["special_heartwall"],
        wallWidth: 5,
        standClass: "destructible",
        tileClass: "destructiblebearertall",
        pieceClass: "destructible",
        lastStand: true,
        unique: true,
        immunities: {
            knockback: true,
            stun: true,
        },
        initialStatusEffects: [["destructible_wall", 1], ["ethereal_passive", 1]],
        graphic: `<div class="sprite-wrapper destructible splittendril solid" id="%SLUG-sprite-wrapper"><div class="target" entity="ceremony tendril" listeningfor="--playercontrol-tilt--playercontrol-rotation" directattribute="true"></div></div>`,
    },

    /* EP4 split enemies */
    destructible_split_tendril_1: {
        name: "Interfering Tendril",
        maxhp: 20,
        hp: 20,
        unique: true,
        actions: ["nothing"],
        standClass: "destructible",
        pieceClass: "destructible",
        tileClass: "destructiblebearertall",
        initialStatusEffects: [["destructible_wall", 1], ["ethereal_passive", 1]],
        graphic: `<div class="sprite-wrapper destructible splittendril nofilter" id="%SLUG-sprite-wrapper"><div class="target" entity="ceremony tendril" listeningfor="--playercontrol-tilt--playercontrol-rotation" directattribute="true"></div></div>`,
    },

    destructible_split_tendril_2: {
        name: "Interfering Tendril",
        maxhp: 20,
        hp: 20,
        unique: true,
        actions: ["nothing"],
        standClass: "destructible",
        pieceClass: "destructible",
        tileClass: "destructiblebearertall",
        initialStatusEffects: [["destructible_wall", 1], ["ethereal_passive", 1]],
        graphic: `
            <div class="sprite-wrapper destructible splittendril nofilter" id="%SLUG-sprite-wrapper"><div class="target" entity="ceremony tendril"></div></div>`,
    },

    split_eye: {
        name: "Eye",
        maxhp: 20,
        hp: 20,
        move: 0,
        wallWidth: 1,
        unique: true,
        immunities: {
            knockback: true,
        },
        lastStand: true,
        initialStatusEffects: [["ethereal_passive", 1], ["destructible_wall", 1]],
        actions: ["special_tele_splitbeam"],
        graphic: `
            <div class="sprite-wrapper autosize" id="%SLUG-sprite-wrapper">
                <div class="target" entity="spectral eye"></div>
                <img class="sprite" src="/img/sprites/combat/foes/kazeye_mid.gif" id="%SLUG-sprite">
            </div>
        `,
    },

    /* EP4 spine revisit: miltza */
    /*
    split_miltza: {
        name: "Miltza?",
        maxhp: 60,
        hp: 60,
        move: 3,
        unique: true,
        lastStand: true,
        actions: ["miltza_charge"],
        initialStatusEffects: [["boss_miltza", 1]],
        graphic: `
            <div class="sprite-wrapper autosize spectral" id="%SLUG-sprite-wrapper">
                <div class="target" entity="possessed miltza"></div>
                <img class="sprite" src="/img/sprites/obesk/miltza/gridtiny_warp.gif" style="width: 110px" id="%SLUG-sprite">
            </div>
        `,
    },*/

    split_miltza: {
        name: "Miltza?",
        readoutActor: "okidoia",
        maxhp: 60,
        hp: 60,
        move: 3,
        unique: true,
        lastStand: true,
        actions: ["miltza_attack_evil", "special_miltza_spy"],
        lastResortActions: ["lastresort_split_jump"],
        initialStatusEffects: [["boss_miltza", 1]],
        graphic: `
            <div class="sprite-wrapper autosize spectral" id="%SLUG-sprite-wrapper">
                <div class="target" entity="possessed miltza"></div>
                <img class="sprite" src="/img/sprites/obesk/miltza/gridtiny_warp.gif" style="width: 110px" id="%SLUG-sprite">
            </div>
        `,
    },

    destructible_spineroot: {
        //roots used in the miltzer fight to plant bombs on
        //despite listed hp, can only be killed through certain means, controlled by status
        name: "Root",
        maxhp: 10,
        hp: 10,
        initialStatusEffects: [["destructible_spinalroot", 1]],
        immunities: {
            scene_edge: true,
        },
        actions: ["nothing"],
        standClass: "destructible",
        pieceClass: "destructible",
        tileClass: "destructiblebearer",
        lastStand: true,
        graphic: `<div class="sprite-wrapper destructible spinepool-actor" id="%SLUG-sprite-wrapper"></div>`,
    },

    /* ep4 lesser revisit - familiar foes */
    lesser_itzil: {
        name: "Golem",
        maxhp: 150,
        hp: 150,
        move: 5,
        unique: true,
        lastStand: true,

        actions: ["tele_veilksplitter",],
        altActions: ["special_tele_itzil"], //abritrary set controlled by status
        initialStatusEffects: [["lesserboss_alternating", 1], ["kb_immune", 1]],
        immunities: {
            scene_edge: true,
        },

        graphic: `
            <div class="sprite-wrapper autosize" id="%SLUG-sprite-wrapper">
                <div class="target" entity="reanimated golem"></div>
                <img class="sprite" src="/img/sprites/combat/foes/ikgolem_spectral.gif" id="%SLUG-sprite" style="width: 150px;transform: translateY(-25%);">
            </div>
        `,
    },

    lesser_kivii: {
        name: "Kiv",
        maxhp: 150,
        hp: 150,
        move: 4,
        unique: true,
        lastStand: true,

        actions: ["tele_kivii_grasp"],
        altActions: ["special_tele_kivii"], // abritrary, used in special status
        initialStatusEffects: [["lesserboss_alternating", 1]],
        immunities: {
            scene_edge: true
        },
        
        graphic: `
            <div class="sprite-wrapper autosize spectral" id="%SLUG-sprite-wrapper">
                <div class="target" entity="spectral kiv"></div>
                <img class="sprite" src="/img/sprites/combat/foes/kivii/spectral.gif" id="%SLUG-sprite" style="width: 100px">
            </div>
        `,
    },

    lesser_itzka: {
        name: "???",
        maxhp: 100,
        hp: 100,
        move: 0,
        unique: true,
        lastStand: true,

        actions: ["special_itzka"],
        immunities: {
            scene_edge: true,
            knockback: true,
            stun: true,
        },

        initialStatusEffects: [["lesserboss_overlap_collapse", 1]],
        standClass: "notilt nodie",
        graphic: `
            <div class="sprite-wrapper itzka autosize" id="%SLUG-sprite-wrapper" style="width: 100px">
                <div class="target" entity="spectral qou"></div>
                <img class="sprite" src="/img/sprites/combat/foes/itzkabase.gif" id="%SLUG-sprite">
            </div>
        `,
    },

    lesser_itzil_ing: {
        name: "Golem",
        maxhp: 150,
        hp: 150,
        move: 7,
        unique: true,
        lastStand: true,

        actions: ["tele_veilksplitter", "tele_dullpulse"],
        initialStatusEffects: [["story_reunited_itzil", 1], ["conjoined", 1], ["carapace", 20]],
        immunities: {
            scene_edge: true,
        },

        graphic: `
            <div class="sprite-wrapper autosize" id="%SLUG-sprite-wrapper">
                <div class="target" entity="reanimated golem"></div>
                <img class="sprite" src="/img/sprites/combat/foes/ikgolem_spectral.gif" id="%SLUG-sprite" style="width: 150px;transform: translateY(-25%);">
            </div>
        `,
    },

    lesser_kivii_ing: {
        name: "Kiv",
        maxhp: 150,
        hp: 150,
        move: 4,
        unique: true,
        lastStand: true,

        actions: ["special_dozka_knock", "special_kivii_summon"],
        initialStatusEffects: [["story_reunited_kivii", 1], ["conjoined", 1]],
        immunities: {
            scene_edge: true,
            knockback: true,
            pull: true,
        },
        
        graphic: `
            <div class="sprite-wrapper autosize spectral" id="%SLUG-sprite-wrapper">
                <div class="target" entity="spectral kiv"></div>
                <img class="sprite" src="/img/sprites/combat/foes/kivii/spectral.gif" id="%SLUG-sprite" style="width: 100px">
            </div>
        `,
    },

    lesser_kivii_gauntlet: {
        name: "Gauntlet",
        maxhp: 6,
        hp: 6,
        move: 0,
        actions: ["nothing"],
        immunities: {
            scene_edge: true,
        },
        graphic: `
            <div class="sprite-wrapper kiviigauntlet" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/combat/foes/kivii/gauntlet_warp.gif" id="%SLUG-sprite">
            </div>
            `,
        reactions: {},
        initialStatusEffects: [["gauntlet_aimer", 1]],
    },

    lesser_itzka_ing: {
        name: "???",
        maxhp: 70,
        hp: 70,
        move: 0,
        unique: true,
        lastStand: true,

        actions: ["special_itzka"],
        immunities: {
            scene_edge: true,
            knockback: true,
            stun: true,
        },

        initialStatusEffects: [["lesserboss_overlap_collapse", 1]],
        standClass: "notilt nodie",
        graphic: `
            <div class="sprite-wrapper itzka autosize" id="%SLUG-sprite-wrapper" style="width: 100px">
                <div class="target" entity="spectral qou"></div>
                <img class="sprite" src="/img/sprites/combat/foes/itzkabase.gif" id="%SLUG-sprite">
            </div>
        `,
    },
    
    destructible_lesserpod: {
        name: "Pod",
        //claim area in a big radius around them as pseudopieces, to be hit if no one is standing there
        //create pile of debris in each slot after destruction
        maxhp: 10,
        hp: 10,
        initialStatusEffects: [["destructible_lesserpod", 1], ["ethereal_passive", 1]],
        actions: ["nothing"],
        immunities: {
            scene_edge: true,
            knockback: true,
        },
        lastStand: true,
        standClass: "destructible",
        pieceClass: "destructible",
        tileClass: "destructiblebearertall",
        painter: "nopainter",
        graphic: `
            <div class="sprite-wrapper destructible" id="%SLUG-sprite-wrapper">
                <div class="dyp" style="display: flex;justify-content: center;align-items: center;">
                    <div class="dypcontent pyramid destructible pyrapod noveins" style="--dyp-width: 3;--dyp-height: 3;--dyp-image: transparent;">
                        <figure>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </figure>
                    </div>
                </div>
            </div>
        `,
    },
    
    destructible_lesserpod_debris: {
        name: "Shard",
        maxhp: 10,
        hp: 10,
        painter: "nopainter",
        initialStatusEffects: [["destructible", 1], ["ethereal_passive", 1]],
        actions: ["nothing"],
        graphic: `
            <div class="sprite-wrapper destructible" id="%SLUG-sprite-wrapper">
                <img src="/img/local/embassy/mind/tritest_warptran_combatdebris.gif" id="%SLUG-sprite" class="sprite" style="height: 150px">
            </div>
        `,
    },

    /* EP4 final phase 1 - Vekoa fight */
    finale_eye: { // PT1 of the finale uses this actor as a driver for the ambient mechanics
        name: "ceremony",
        maxhp: 0,
        hp: 0,
        move: 0,
        lastStand: true,
        unique: true,
        noOutline: true,
        standClass: "static",
        pieceClass: "noring",
        immunities: {
            knockback: true,
            pull: true,
        },
        actions: ["special_eye_pt1"],
        graphic: `
            <div class="sprite-wrapper ceremonyitself" id="%SLUG-sprite-wrapper">
                <div class="target" entity="ceremony"></div>
            </div>
        `,
    },

    finale_eyebeam: {
        name: "Gaze",
        maxhp: 10,
        hp: 10,
        move: 0,
        lastStand: true,
        actions: ["nothing"],
        initialStatusEffects: [["eyebeam_aimer", 1]],
        immunities: {
            scene_edge: true
        },
        graphic: `
            <div class="sprite-wrapper autosize" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/combat/foes/gazer.gif" id="%SLUG-sprite">
            </div>
        `,
    },

    vekqou_guard: {
        // stationary, guards the vein, accumulates carapace, knocks anyone nearby away
        name: "Kiv",
        maxhp: 100,
        hp: 100,
        move: 0,
        actions: ["shell", "bozko_attack"],
        initialStatusEffects: [["ethereal_passive", 1], ["specter_kiv", 1], ["story_terriblelife", 1]],
        graphic: `
        <div class="sprite-wrapper spectral autosize" id="%SLUG-sprite-wrapper">
            <div class="target" entity="vivid kiv"></div>
            <img class="sprite" src="/img/sprites/combat/foes/spectral_kiv.gif" id="%SLUG-sprite">
        </div>
        `,
    },

    vekqou_stabber: { 
        // pursues the targeted actor, uses a terror frenzy a la husk, but it has an arc, so it can hit multiple targets
        name: "Vel",
        maxhp: 75,
        hp: 75,
        move: 5,
        actions: ["scene_frenzy"],
        initialStatusEffects: [["ethereal_passive", 1], ["specter_vel", 1], ["story_terriblelife", 1]],
        graphic: `
        <div class="sprite-wrapper spectral autosize" id="%SLUG-sprite-wrapper">
            <div class="target" entity="vivid vel"></div>
            <img class="sprite" src="/img/sprites/combat/foes/spectral_vel.gif" id="%SLUG-sprite">
        </div>
        `,
    },

    vekqou_support: {
        // maintains a healing/repairing tether on both actors, throws bombs
        name: "Jut",
        maxhp: 50,
        hp: 50,
        move: 2,
        actions: ["arch_bomb_spawn"],
        initialStatusEffects: [["ethereal_passive", 1], ["specter_jut", 1], ["story_terriblelife", 1]],
        graphic: `
        <div class="sprite-wrapper spectral autosize" id="%SLUG-sprite-wrapper">
            <div class="target" entity="vivid jut"></div>
            <img class="sprite" src="/img/sprites/combat/foes/spectral_jut.gif" id="%SLUG-sprite">
        </div>
        `,
    },

    vekoa_1v1: {
        name: "Vekoa",
        maxhp: 50,
        hp: 50,
        move: 1,
        unique: true,
        lastStand: true,

        /* 
            1v1 vekoa has 3 parts
                pt2: base - a tense melee character that kind of mirrors akizet in this sequence
                
                other parts are handled by modifying at scenario start
                pt4: escalation - does the heart knock
                pt6: finale - may use a KB charge telegraph on a point near akizet

        */

        actions: ["vekfight_assault", "special_vekoa_rush"],
        initialStatusEffects: [["boss_vekoa", 1]],
        graphic: `
            <div class="sprite-wrapper autosize" id="%SLUG-sprite-wrapper">
                <div class="target" entity="vekoa"></div>
                <img class="sprite vekoa1v1" src="/img/sprites/vekoa/vekoaspec_active.gif" id="%SLUG-sprite">
            </div>
        `,
    },

    vekoa_eye: {
        name: "ceremony",
        maxhp: 0,
        hp: 0,
        move: 0,
        lastStand: true,
        unique: true,
        noOutline: true,
        standClass: "static",
        actions: ["special_eye_boss"],
        graphic: `
            <div class="sprite-wrapper ceremonyitself" id="%SLUG-sprite-wrapper">
                <div class="target" entity="ceremony"></div>
            </div>
        `,
    },

    vekoa_1v1_ing: {
        name: "Vekoa",
        maxhp: 150,
        hp: 150,
        move: 2,
        unique: true,
        lastStand: true,
        actions: ["vekfight_assault", "vekfight_frenzy", "special_vekoa_rush_ing"],
        initialStatusEffects: [["story_vekoa", 1]],
        graphic: `
            <div class="sprite-wrapper autosize" id="%SLUG-sprite-wrapper">
                <div class="target" entity="vekoa"></div>
                <img class="sprite vekoa1v1" src="/img/sprites/vekoa/vekoaspec_active.gif" id="%SLUG-sprite">
            </div>
        `,
    },

    vekoa_eye_ing: {
        name: "ceremony",
        maxhp: 0,
        hp: 0,
        move: 0,
        lastStand: true,
        unique: true,
        noOutline: true,
        standClass: "static",
        pieceClass: "noring",
        actions: ["special_eye"],
        graphic: `
            <div class="sprite-wrapper ceremonyitself" id="%SLUG-sprite-wrapper">
                <div class="target" entity="ceremony"></div>
            </div>
        `,
    },

    destructible_split_tendril_3: {
        name: "Interfering Tendril",
        maxhp: 60,
        hp: 60,
        unique: true,
        actions: ["nothing"],
        standClass: "destructible",
        pieceClass: "destructible",
        tileClass: "destructiblebearertall",
        direction: "down",
        wallWidth: 2,
        painter: "stand",
        initialStatusEffects: [["destructible_wall", 1], ["ethereal_passive", 1], ["invisible", 1], ["immobile_hardskip", 1]],
        graphic: `
            <div class="sprite-wrapper destructible splittendril spinewall" id="%SLUG-sprite-wrapper"><div class="target" entity="ceremony tendril" listeningfor="--playercontrol-tilt--playercontrol-rotation" directattribute="true"></div></div>
            `,
    },

    destructible_split_tendril_4: {
        name: "Interfering Tendril",
        maxhp: 75,
        hp: 75,
        unique: true,
        actions: ["nothing"],
        standClass: "destructible",
        pieceClass: "destructible",
        tileClass: "destructiblebearertall",
        direction: "down",
        wallWidth: 2,
        painter: "stand",
        initialStatusEffects: [["destructible_wall", 1], ["ethereal_passive", 1], ["invisible", 1], ["immobile_hardskip", 1]],
        graphic: `
            <div class="sprite-wrapper destructible splittendril spinewall" id="%SLUG-sprite-wrapper"><div class="target" entity="ceremony tendril" listeningfor="--playercontrol-tilt--playercontrol-rotation" directattribute="true"></div></div>
            `,
    },

    /* EP4 final phase 2 - epicenter */
    vekoa_epicenter_projectile: { // just used in testing i think
        name: "epicenter",
        maxhp: 50,
        hp: 50,
        move: 0,
        unique: true,

        actions: ["special_epicenter"],
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/viendbot.png" id="%SLUG-sprite" style="filter: invert(1)">
            </div>
        `,
    },
    
    destructible_epicenter_vein: {
        name: "Veins",
        maxhp: 80,
        hp: 80,
        move: 0,
        lastStand: true,
        painter: "nopainter",
        initialStatusEffects: [["destructible_epicenter_vein", 1], ["immobile_firmskip_silent", 1], ["finale_vein", 1], ["puncture_weakness", 1]],
        immunities: {
            stun: true,
            scene_edge: true,
            pull: true,
            knockback: true,
        },
        actions: ["truly_nothing"],
        standClass: "destructible",
        noOutline: true,
        graphic: `
            <div class="sprite-wrapper destructible finalveins" id="%SLUG-sprite-wrapper">
                <img class="sprite veins veintop" src="/img/local/embassy/mind/ceremonyveintop.gif" id="%SLUG-sprite">
                <div class="target" entity="ceremony vein" listeningfor="--playercontrol-rotation" directattribute="true"></div>
                <img class="sprite veins veinbot" src="/img/local/embassy/mind/ceremonyveinbottomtwist.gif" id="%SLUG-sprite">
            </div>
        `,
    },
    
    vekoa_golem: {
        name: "Golem",
        maxhp: 80,
        hp: 80,
        initialStatusEffects: [["ethereal_passive", 1],/* ["vekoa_golem", 1]*/],
        immunities: {
            stun: true,
            scene_edge: true
        },
        actions: ["itzil_split"],
        graphic: `
            <div class="sprite-wrapper autosize spectral" id="%SLUG-sprite-wrapper">
                <div class="target" entity="spectral dull golem"></div>
                <img class="sprite" src="/img/sprites/combat/foes/golemboss_spectral.gif" id="%SLUG-sprite">
            </div>
        `,
    },
    
    vekoa_wall: {
        name: "Wall",
        maxhp: 150,
        hp: 150,
        move: 0,
        lastStand: true,
        unique: true,
        initialStatusEffects: [["conjoined", 1], ["destructible_wall", 1]],
        immunities: {
            stun: true,
            scene_edge: true,
            knockback: true,
            pull: true,
        },
        actions: ["special_wall_undulate"],
        standClass: "destructible tendrilveal",
        tileClass: "destructiblebearertall",
        graphic: `<div class="sprite-wrapper destructible splittendril" id="%SLUG-sprite-wrapper"><div class="target" entity="ceremony tendril"></div></div>`,
    },
    
    vekoa_wall_tendril: {
        name: "Tendril",
        maxhp: 150,
        hp: 150,
        move: 0,
        lastStand: true,
        initialStatusEffects: [["conjoined", 1]],
        immunities: {
            stun: true,
            scene_edge: true,
            knockback: true,
        },
        actions: ["special_tendril_slam", "tele_tendril_swipe"],
        graphic: `
            <div class="sprite-wrapper autosize" id="%SLUG-sprite-wrapper">
                <div class="target" entity="ceremony tendril"></div>
                <img class="sprite" src="/img/sprites/combat/foes/splittendril_attacker.gif" id="%SLUG-sprite">
            </div>
        `,
    },

    /* ING rework ep4 revisit */
    ceremony_tendril_plus: {
        name: "Vein",
        maxhp: 30,
        hp: 30,
        immunities: {
            scene_edge: true,
            knockback: true,
            pull: true,
        },
        actions: ["nothing"],
        painter: "stand",
        standClass: "destructible",
        pieceClass: "destructible",
        tileClass: "destructiblebearertall",
        initialStatusEffects: [["immobile_firmskip_silent", 1], ["destructible_cross", 1], ["ethereal_passive", 1], ["story_ceremony_tendril", 1], ["puncture_weakness", 1]],
        graphic: `<div class="sprite-wrapper destructible splittendril vertical nofilter" id="%SLUG-sprite-wrapper" listeningfor="--playercontrol-tilt--playercontrol-rotation" directattribute="true"><div class="target" entity="ceremony tendril"></div></div>`,
    },
    
    destructible_spine_wall: {
        name: "Blockage",
        maxhp: 6,
        hp: 6,
        unique: true,
        actions: ["nothing"],
        standClass: "destructible",
        pieceClass: "destructible",
        tileClass: "destructiblebearertall",
        direction: "left",
        wallWidth: 1,
        painter: "stand",
        initialStatusEffects: [["immobile_firmskip_silent", 1], ["destructible_wall", 1], ["ethereal_passive", 1], ["story_ceremony_wall", 1]],
        graphic: `<div class="sprite-wrapper destructible splittendril spinewall rotated nofilter" id="%SLUG-sprite-wrapper"><div class="target" entity="ceremony tendril" listeningfor="--playercontrol-tilt--playercontrol-rotation" directattribute="true"></div></div>`,
    },
    
    destructible_split_wall: {
        name: "Blockage",
        maxhp: 20,
        hp: 20,
        actions: ["nothing"],
        standClass: "destructible",
        pieceClass: "destructible",
        tileClass: "destructiblebearertall",
        direction: "down",
        wallWidth: 2,
        painter: "stand",
        initialStatusEffects: [["immobile_firmskip_silent", 1], ["destructible_wall", 1], ["ethereal_passive", 1], ["story_ceremony_wall", 1], ["puncture_weakness", 1]],
        graphic: `<div class="sprite-wrapper destructible splittendril spinewall nofilter" id="%SLUG-sprite-wrapper"><div class="target" entity="ceremony tendril" listeningfor="--playercontrol-tilt--playercontrol-rotation" directattribute="true"></div></div>`,
    }, 
    
    split_advancer: {
        name: "???",
        maxhp: 100,
        hp: 100,
        move: 0,
        unique: true,
        lastStand: true,
        noHPDisplay: true,
        actions: ["special_split_advancer"],
        initialStatusEffects: [["story_encroaching", 1], ["shroud_invincible", 1]],
        immunities: {
            scene_edge: true,
        },
        graphic: `
            <div class="sprite-wrapper autosize" id="%SLUG-sprite-wrapper">
                <div class="target" entity="spectral eye"></div>
                <img class="sprite" src="/img/sprites/combat/foes/encroaching_eye.gif" id="%SLUG-sprite">
            </div>
        `,
    },    

    /* new finale pt3 boss */
    vekqou_archivist: {
        // return of malvi, summoning and forming golems
        name: "Archivist",
        readoutActor: "okidoia",
        maxhp: 200,
        hp: 200,
        move: 0,
        unique: true,
        actions: ["special_archivist_conjure"/*, "archivist_distance", "archivist_smash"*/],
        lastStand: true,
        initialStatusEffects: [["archivist_split_focus_finale", 1]],
        graphic: `
        <div class="sprite-wrapper autosize" id="%SLUG-sprite-wrapper">
            <div class="target" entity="vivid archivist"></div>
            <img class="sprite" src="/img/sprites/combat/foes/archivist1_spectral.gif" id="%SLUG-sprite">
        </div>
        `,
    },

    /* fucked up stage combat test */
    lookertest: {
        name: "Container",
        maxhp: 60,
        hp: 60,
        actions: ["attack", "attack", "attack", "skitter"],
        contactActions: ["attack"],
        initialStatusEffects: [["stagefighter", 1], ["ethereal_passive", 1]],
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/combat/foes/inc.gif" id="%SLUG-sprite">
                <div class="target" entity="hostile container"></div>
            </div>
            `,
    },
}

//tiny changes
env.COMBAT_ACTORS.destructible_spine_wall_1 = {... env.COMBAT_ACTORS.destructible_spine_wall}; 
env.COMBAT_ACTORS.destructible_spine_wall_2 = {... env.COMBAT_ACTORS.destructible_spine_wall}; env.COMBAT_ACTORS.destructible_spine_wall_2.direction = "down"; env.COMBAT_ACTORS.destructible_spine_wall_2.graphic = env.COMBAT_ACTORS.destructible_spine_wall_2.graphic.replace("spinewall rotated", "spinewall")
env.COMBAT_ACTORS.destructible_spine_wall_3 = {... env.COMBAT_ACTORS.destructible_spine_wall};

env.COMBAT_ACTORS.ceremony_tendril_plus_split = {... env.COMBAT_ACTORS.ceremony_tendril_plus }; 
    env.COMBAT_ACTORS.ceremony_tendril_plus_split.hp = 300; 
    env.COMBAT_ACTORS.ceremony_tendril_plus_split.maxhp = 300; 


//special editions of various ing rework actors for frame

//veilklight gets a start health cut
env.COMBAT_ACTORS.personnel_veilklight_frame = {... env.COMBAT_ACTORS.personnel_veilklight}
env.COMBAT_ACTORS.personnel_veilklight_frame.hp = 10
env.COMBAT_ACTORS.personnel_veilklight_frame.unique = false

//attendant gets a general health cut and new passive description
//their actions are the same, but the actions have checks within for how to act in frame
//the idea is that, since there can be more than one, they always alternate between counter+mark and stab
env.COMBAT_ACTORS.personnel_attendant_frame = {... env.COMBAT_ACTORS.personnel_attendant}
env.COMBAT_ACTORS.personnel_attendant_frame.hp = 15
env.COMBAT_ACTORS.personnel_attendant_frame.maxhp = 15
env.COMBAT_ACTORS.personnel_attendant_frame.unique = false

//kivskin get an adjustment to their guard so they can guard random allies
env.COMBAT_ACTORS.kivskin_frame = {... env.COMBAT_ACTORS.kivskin}
env.COMBAT_ACTORS.kivskin_frame.hp = 20
env.COMBAT_ACTORS.kivskin_frame.maxhp = 20
env.COMBAT_ACTORS.kivskin_frame.actions = ["windup_jab", "kivskin_shell", "kivskin_guard", "kivskin_malfunction"]

//both archival enemies need their max HP reduced
env.COMBAT_ACTORS.maintcloak_frame = {... env.COMBAT_ACTORS.maintcloak}
env.COMBAT_ACTORS.maintcloak_frame.hp = 25
env.COMBAT_ACTORS.maintcloak_frame.maxhp = 25

//archival golem specifically now starts with 6 carapace instead of just having it and stun immunity built in
//since vulnerability isn't a guarantee here and you can never tell when it'll show up
env.COMBAT_ACTORS.archival_golem_frame = {... env.COMBAT_ACTORS.archival_golem}
env.COMBAT_ACTORS.archival_golem_frame.hp = 30
env.COMBAT_ACTORS.archival_golem_frame.initialStatusEffects = [["frame_archival", 1]]

env.COMBAT_ACTORS.movefoe_frame = {... env.COMBAT_ACTORS.movefoe_driver}
env.COMBAT_ACTORS.movefoe_frame.lastStand = false
env.COMBAT_ACTORS.movefoe_frame.hp = 100
env.COMBAT_ACTORS.movefoe_frame.maxhp = 100
env.COMBAT_ACTORS.movefoe_frame.initialStatusEffects = [["daemon_rot", 1], ["frame_movefoe", 1]]

env.COMBAT_ACTORS.movefoe_tendrils_frame = {... env.COMBAT_ACTORS.movefoe_tendrils}
env.COMBAT_ACTORS.movefoe_tendrils_frame.lastStand = false
env.COMBAT_ACTORS.movefoe_tendrils_frame.hp = 15
env.COMBAT_ACTORS.movefoe_tendrils_frame.maxhp = 15
env.COMBAT_ACTORS.movefoe_tendrils_frame.initialStatusEffects = [["daemon_rot", 1], ["frame_tendril", 1]]

//golem maintenance alts for frame
//by the time you get here, especially to bosses and kings, you're probably way stronger than in the story
env.COMBAT_ACTORS.husk_guard_frame = {... env.COMBAT_ACTORS.husk_guard}
env.COMBAT_ACTORS.husk_guard_frame.hp = 25 
env.COMBAT_ACTORS.husk_guard_frame.maxhp = 35 // room to grow

env.COMBAT_ACTORS.foundation_golem_frame = {... env.COMBAT_ACTORS.foundation_golem}
env.COMBAT_ACTORS.foundation_golem_frame.hp = 80
env.COMBAT_ACTORS.foundation_golem_frame.maxhp = 80
env.COMBAT_ACTORS.foundation_golem_frame.initialStatusEffects = [["story_foundation_frame", 1]]

env.COMBAT_ACTORS.constructor_boss_frame = {... env.COMBAT_ACTORS.constructor_boss}
env.COMBAT_ACTORS.constructor_boss_frame.hp = 150 // starts at max
env.COMBAT_ACTORS.constructor_vat_frame = {... env.COMBAT_ACTORS.constructor_vat}
env.COMBAT_ACTORS.constructor_vat_frame.hp = 20 // these guys are twice as tough in this gamemode since you're strong af when you get here
env.COMBAT_ACTORS.constructor_vat_frame.maxhp = 20

env.COMBAT_ACTORS.translation_golem_frame = {... env.COMBAT_ACTORS.translation_golem}
env.COMBAT_ACTORS.translation_golem_frame.maxhp = 200 // basic HP bump for this guy
env.COMBAT_ACTORS.translation_golem_frame.hp = 200

/** 

VESTIGIAL SYSTEM LARGELY REPLACED BY STATUSES/PASSIVES BECOMING MORE ROBUST

**/

//env.COMBAT_TURNCHECKS is just something executed each turn for a given enemy - would be a part of the objects if they weren't regularly cloned
//turnInfo is an array consisting of: [action, validAttackTargets, validSupportTargets, attackTarget, supportTarget]
//return true if you want it to stop combat progression until you call advanceturn/updatestats
if(typeof env.COMBAT_TURNCHECKS == "undefined") env.COMBAT_TURNCHECKS = {
    //tendrils will not attack when movefriend is in last stand mode, if they're still alive somehow
    tendrils: (thisActor, turnInfo) => {
        let movefriend = env.rpg.enemyTeam.members.filter(member => member.slug.includes('movefriend'))
        let tendrils = env.rpg.enemyTeam.members.filter(member => member.slug.includes('tendril'))
        if(movefriend.length) movefriend = movefriend[0]; else return false;
        if(movefriend.state == "lastStand" || movefriend.state == "dead") {
            actionMessage(thisActor, "THE TENDRILS CURL AWAY");
            tendrils.forEach(actor => {
                actor.hp = 0
                updateStats({actor})
            })
            setTimeout(advanceTurn, 1000)
            return true
        }
    },

    //similar to above, but for hallucinations
    hallucinations: (thisActor, turnInfo) => {
        let boss = env.rpg.enemyTeam.members.filter(member => member.slug.includes('translation'))
        let hallucinations = env.rpg.enemyTeam.members.filter(member => member.slug.includes('hallucination'))
        if(boss.length) boss = boss[0]; else return false;
        if(boss.state == "dead") {
            actionMessage(thisActor, "THE HALLUCINATIONS FADE");
            hallucinations.forEach(actor => {
                actor.hp = 0
                updateStats({actor})
            })
            setTimeout(()=>advanceTurn(), 1000)
            return true
        }
    },

    //die if all enemies are ethereal and no solid ones remain
    genericEthereal: (thisActor, turnInfo) => {
        let livingSolid = env.rpg.enemyTeam.members.filter(member => !hasStatus(member, "ethereal") && member.state != "dead")
        let ethereal = env.rpg.enemyTeam.members.filter(member => hasStatus(member, "ethereal"))

        if(livingSolid.length) return false;
        actionMessage(thisActor, "ETHEREAL FOES FADE");
        ethereal.forEach(actor => {
            actor.hp = 0
            updateStats({actor})
        })
        setTimeout(()=>advanceTurn(), 1000)
        return true
    },

    //we want to prevent containers from spamming skitter when there's only one left
    container: (thisActor, turnInfo)=>{
        if(turnInfo.targets.enemy_alive.length == 0 && thisActor.actions.includes("skitter")) {
            thisActor.actions = thisActor.actions.filter(e => e !== 'skitter'); 
        }
    },

    //don't spam barrier if you're solo, little guy
    maintcloak: (thisActor, turnInfo)=>{
        if(turnInfo.targets.enemy_alive.length == 0 && thisActor.actions.includes("special_barrier_allies")) {
            thisActor.actions = thisActor.actions.filter(e => e !== 'special_barrier_allies'); 
        }
    },

    //enemies with this will have 'rez' disabled until they're the last one standing
    // distinct from disableIf because this will force it
    lastRezzer: (thisActor, turnInfo)=>{
        let deadBoss = env.rpg.enemyTeam.members.find(member=>member.slug.includes("bstrdboss") && member.state == "dead")
        if(turnInfo.targets.enemy_alive.length == 0 || deadBoss) {
            if(!thisActor.oldActions) thisActor.oldActions = thisActor.actions.filter(action=>action != "rez")
            thisActor.actions = ["rez"]  //we isolate rez temporarily
        } else if(thisActor.oldActions) { //they've rezzed someone, so we restore regular actions
            thisActor.actions = thisActor.oldActions
            thisActor.oldActions = null
        }
    }
}

if(typeof env.COMBAT_FORMATIONS == "undefined") env.COMBAT_FORMATIONS = {
    default_callback: (loser)=>{ 
        console.log(loser)
        if(loser.name != "ally" && env.rpg.settings.inciterID) {
            killStageEnemy(env.rpg.settings.inciterID)
        }
    },

    /* ing rework */

    'tutorial_golem': {
        enemies: ["tutorial_golem"],
        combatClass: "tutorialgolem",
        getBgm: ()=> env.embassy.music_unsafe,
        bgmRate: 0.75,
        turnCallback: (actor)=>{
            if(!check('PAGE!!skiptut')) {
                switch(actor.slug) {
                    case "akizet":
                        if(check('PAGE!!akitut')) {
                            startDialogue('d3_tutorial_akizet')
                            change('PAGE!!akitut', false)
                        }
                    break

                    case "gakvu":
                        if(!check("PAGE!!gaktut")) {
                            startDialogue('d3_tutorial_gakvu')
                            change('PAGE!!akitut', true)
                        }
                    break

                    case "tozik":
                        if(!check("PAGE!!toztut")) startDialogue('d3_tutorial_tozik')
                    break
                }
            }
        }
    },

    'recreation_survival': {
        enemies: ["listener", "container_evader", "container_evader"],
        getBgm: ()=> env.embassy.music_combat,
        class: "listenerfight",
        //startCallback: ()=> {env.rpg.combineTurns = "enemy"}
    },

    'personnel_attendant': {
        enemies: ["personnel_veilklight", "personnel_attendant", "personnel_veilklight"],
        getBgm: ()=> env.embassy.music_combat,
        class: "attendantfight",
        //startCallback: ()=> {env.rpg.combineTurns = "enemy"}
    },

    'movefriend_survival': {
        enemies: ["movefoe_driver", "movefoe_relay"],
        getBgm: ()=> env.embassy.music_p1boss,
        bgmRate: 0.75,
        class: "movefight",
        bg: `<div id="movefoe-bg" class="combatbg"></div>`,
        startCallback: ()=> {
            if(!check("PAGE!!mfcheck")) startDialogue("d3_movecmb")
        },
        turnCallback: () => { // tendrils in last stand get immobilized hard skip
            env.rpg.enemyTeam.members.forEach(m=>{
                if(
                    (
                        (m.state == "lastStand" && m.slug.includes("tendril")) ||
                        hasStatus(env.rpg.actors.movefoe_driver, "incoherent") && m.slug.includes("tendril")
                    ) && !hasStatus(m, "story_tendrilfinal")
                ) {
                    addStatus({target: m, status: "story_tendrilfinal", forceAdd: true })
                }
            })
        }
        //startCallback: ()=> {env.rpg.combineTurns = "enemy"}
    },

    'archive_intro': {
        enemies: ["archival_golem"],
        class: "bastard",
        bgmRate: 0.75,
        getBgm: ()=> env.embassy.music_bstrdcombat,
        startCallback: ()=>{
            env.rpg.enemyTeam.members[0].hp = 60
            combatHit(env.rpg.enemyTeam.members[0], {amt: 10, type: "barrier"})
        }
    },

    'archivecommon': {
        enemies: ["bstrdlight", "maintcloak", "archival_golem"],
        class: "bastard",
        bgmRate: 0.75,
        getBgm: ()=> env.embassy.music_bstrdcombat
    },

    'archivedouble': {
        enemies: ["archival_golem", "bstrdlight", "maintcloak", "archival_golem"],
        class: "bastard",
        bgmRate: 0.75,
        getBgm: ()=> env.embassy.music_bstrdcombat
    },

    'archivecloaktainer': {
        enemies: ["container_evader", "container_evader", "maintcloak", "container_sfer", "container_evader"],
        class: "bastard",
        advanceRate: 1000,
        bgmRate: 0.75,
        getBgm: ()=> env.embassy.music_bstrdcombat,
        startCallback: ()=> env.rpg.enemyTeam.members.forEach(m=>removeStatus(m, "ethereal", {forceRemoveStatus: true}))
    },

    'archivecontainers': {
        enemies: ["container_evader", "container_evader", "container_spy", "bstrdlight", "container_evader", "container_exploder", "container_evader"],
        class: "bastard summonerboss nofoewrap",
        bgmRate: 0.75,
        getBgm: ()=> env.embassy.music_bstrdcombat,
        turnCallback: () => {
            if(!env.rpg.noticedKavrukaUse) {
                let member = env.rpg.allyTeam.members.find(a=>hasStatus(a, "item_kavruka"))
                if(member) {
                    if(member.kavrukasLeft < 2) {
                        env.rpg.noticedKavrukaUse = true
                        change("PAGE!!archruka", true)
                    }
                }
            }
        },
        startCallback: ()=> {
            env.rpg.enemyTeam.members.find(m=>m.base.slug == "bstrdlight").box.classList.add("mainfoe")
            env.rpg.enemyTeam.members.forEach(m=>removeStatus(m, "ethereal", {forceRemoveStatus: true}))
        }
    },

    'archiveshelfminiboss': {
        enemies: ["bstrdlight", "bstrdshelf", "maintcloak"],
        class: "bastard bstrdshelf",
        bgmRate: 0.75,
        getBgm: ()=> env.embassy.music_bstrdcombat
    },

    'bstrdboss': {
        enemies: ["maintcloak", "bstrdboss", "bstrdlight"],
        class: "bastard",
        advanceRate: 1000,
        bgmRate: 0.75,
        getBgm: ()=> env.embassy.music_bstrdcombat,
        startCallback: ()=>{ //set up the lil dancin guys
            env.rpg.insertAdjacentHTML('beforeend', '<div id="bstrdancers"></div>')
            let dancers = document.querySelector('#bstrdancers')
            env.rpg.bstrdancerDetect = env.setInterval(()=>{
                if(env.bgm.seek() > 52 && env.bgm.seek() < 84) {
                    dancers.classList.add('dance')
                    if(env.bgm.seek() > 68) dancers.classList.add('double')
                } else {
                    dancers.classList.remove('dance')
                    setTimeout(()=>dancers.classList.remove('double'), 1000)
                }
            }, 1000)
        },
    },

    /* ep3 ing rework section */

    'golem_husks_1': {
        enemies: ["husk_striker", "husk_observer"],
        class: "ep3fight",
        getBgm: ()=> env.embassy.music_golems_combat
    },

    'golem_husks_2': {
        enemies: ["husk_support", "husk_guard"],
        class: "ep3fight",
        getBgm: ()=> env.embassy.music_golems_combat
    },

    'golem_husks_interlude': {
        enemies: ["kivskin", "husk_support", "kivskin"],
        class: "ep3fight",
        getBgm: ()=> env.embassy.music_golems_combat
    },

    'golem_husks_3': {
        enemies: ["husk_striker", "husk_support", "husk_guard", "husk_observer"],
        class: "ep3fight huskfinal",
        bg: `
            <div id="fakespritewrapper" class="sprite-wrapper golemsprite dullzika bgsprite">
                <img src="/img/sprites/combat/foes/turboglazika.gif" id="fake-golemsprite-base" class="sprite golemsprite-base" style="--baseTransform: translateX(0)">
                
                <div class="sprite golemsprite-head" style="--baseTransform: translateX(0)">
                    <img src="/img/sprites/combat/foes/turboglazika-hat.gif" id="fake-golemsprite-head" style="--baseTransform: translateX(0)">
                </div>
                <img src="/img/sprites/combat/foes/turboglazika-eyes.gif" id="fake-golemsprite-neck" class="sprite golemsprite-neck" style="--baseTransform: translateX(0)">
                <img src="/img/sprites/combat/foes/turboglazika-body.gif" id="fake-golemsprite-body" class="sprite golemsprite-body" style="--baseTransform: translateX(0)">

                <div class="target" entity="dullzika"></div>
            </div>
        `,
        getBgm: ()=> env.embassy.music_golems_combat,
        startCallback: ()=>{ // start weakened, but with the dullzika passive
            env.rpg.fakeDullzikaSprite = env.rpg.querySelector("#fakespritewrapper")
            env.rpg.enemyTeam.members.forEach(m=>{ 
                m.hp = 20 
                addStatus({target: m, status: "story_dullzika"})
            })
        },
    },

    'golem_constructor': {
        enemies: ["constructor_vat", "constructor_vat", "constructor_boss", "constructor_vat", "constructor_vat"],
        class: "summonerboss constructorzone",
        advanceRate: 1500,
        getBgm: ()=> env.embassy.music_golems_combat
    },

    'golem_kivii': {
        enemies: ["kivii_gauntlet", "kivii", "kivii_gauntlet"],
        class: "kivii",
        bgmRate: 0.85,
        getBgm: ()=> env.embassy.music_golems_combat
    },

    'golem_repair': {
        enemies: ["repairfriend", "wounded_archival_golem", "repairfriend"],
        class: "ep3fight",
        getBgm: ()=> env.embassy.music_golems_combat
    },

    'golem_translator': {
        enemies: ["translation_golem"],
        class: "translatorzone",
        getBgm: ()=> env.embassy.music_golems_tvcombat
    },

    'golem_boss': {
        enemies: ["foundation_golem"],
        class: "ep3fight bossgolem",
        bgmVol: 0.65,
        getBgm: ()=>{return env.embassy.music_golems_boss}
    },

    'golem_boss_final': {
        enemies: ["boss_golem"],
        class: "ep3fight huskfinal nowalls",
        bgmVol: 0.8,
        getBgm: ()=>{return env.embassy.music_golems_boss}
    },
    
    /* end ing rework */

    'quick_kill': {
        enemies: ["container"],
        rewards: ['kavruka', 'restorative']
    },

    'recreation_containers_1': {
        enemies: ["container", "container"],
        rewards: ['kavruka', 'restorative']
    },

    'recreation_containers_2': {
        enemies: ["container", "container", "container"],
        rewards: ['kavruka', 'restorative', 'aima_cyst']
    },

    'recreation_containers_3': {
        enemies: ["container", "veilklight", "container"],
        rewards: ['kavruka', 'restorative', 'aima_cyst']
    },

    'attendant_squad_1': {
        enemies: ["container", "attendant", "veilklight"],
        rewards: ['kavruka', 'restorative', 'aima_cyst']
    },

    'attendant_squad_2': {
        enemies: ["veilklight", "attendant", "veilklight"],
        rewards: ['kavruka', 'restorative', 'aima_cyst']
    },

    'attendant_squad_3': {
        enemies: ["container", "attendant", "veilklight"],
        rewards: ['kavruka', 'restorative', 'aima_cyst']
    },

    'movefriend': {
        enemies: ["tendrils", "enemy_movefriend", "tendrils"],
        rewards: ['kavruka', 'aima_cyst'],
        class: "movefight"
    },

    'movefriend_lowintensity': {
        enemies: ["tendrils", "enemy_movefriend_lowintensity", "tendrils"],
        rewards: ['kavruka', 'aima_cyst']
    },

    'bstrdboss_lowintensity': {
        enemies: ["maintcloak", "bstrdboss_lowintensity", "bstrdlight"],
        rewards: ['kavruka', 'aima_cyst'],
        advanceRate: 1000,
        bgmRate: 0.75,
        getBgm: ()=> {return env.embassy.music_bstrdcombat}
    },
    
    'husktest': {
        enemies: ["husk", "husk", "husk"],
        rewards: ['kavruka', 'restorative']
    },
    
    'intrusive': {
        name: "??????",
        help: "'unprocessable entity';'no context'",
        enemies: ["intrusive"],
        class: "intrusivefight summonerboss hideteams nomodifierintro",
        advanceRate: 1000,
        bgmRate: 0.3,
        startCallback: () => {
            setTimeout(() => {
                env.rpg.classList.remove("hideteams")                
            }, env?.crittaMap?.facedIntrusive ? 1000 : 16000)
            if(env.crittaMap) env.crittaMap.facedIntrusive = true
        },
        getBgm: ()=> {return env.intrusive}
    },

    'g_prelobby1': {
        enemies: ["husk", "husk"],
        rewards: ['kavruka', 'restorative', 'aima_cyst', 'satik_cyst', 'disabler'],
        advanceRate: 1000
    },

    'g_prelobby2': {
        enemies: ["basic_golem", "surgeon_golem"],
        rewards: ['restorative', 'satik_cyst'],
        advanceRate: 1000
    },

    'g_prelobby3': {
        enemies: ["pressure_golem", "husk"],
        rewards: ['restorative'],
        advanceRate: 1000
    },

    'g_m1': {
        enemies: ["basic_golem", "husk", "surgeon_golem"],
        rewards: ['kavruka'],
        advanceRate: 1000
    },

    'g_m2': {
        enemies: ["constructor_golem", "basic_golem", "husk"],
        rewards: ['kavruka'],
        advanceRate: 1000
    },

    'g_m3': {
        enemies: ["husk", "surgeon_golem", "husk"],
        rewards: ['kavruka'],
        advanceRate: 1000
    },

    'g_s1': {
        enemies: ["container", "husk", "basic_golem"],
        rewards: ['restorative'],
        advanceRate: 1000
    },

    'g_s2': {
        enemies: ["constructor_golem", "pressure_golem", "basic_golem"],
        rewards: ['kavruka', 'restorative', 'aima_cyst', 'satik_cyst', 'disabler'],
        advanceRate: 1000
    },

    'g_s3': {
        enemies: ["pressure_golem", "husk", "surgeon_golem"],
        rewards: ['kavruka', 'restorative', 'aima_cyst', 'satik_cyst', 'disabler'],
        advanceRate: 1000
    },

    'g_sboss': {
        enemies: ["dull_keeper"],
        rewards: ['kavruka', 'restorative', 'aima_cyst', 'satik_cyst', 'disabler'],
        advanceRate: 1000,
        class: "containerspam",
        getBgm: ()=> {return env.embassy.music_golems_combat},
        bgmRate: 0.75
    },

    'g_o1': {
        enemies: ["husk", "constructor_golem", "surgeon_golem"],
        rewards: ['restorative', 'satik_cyst'],
        advanceRate: 1000
    },

    'g_o2': {
        enemies: ["basic_golem", "basic_golem", "basic_golem"],
        rewards: ['kavruka', 'restorative', 'aima_cyst', 'satik_cyst', 'disabler'],
        advanceRate: 1000
    },

    'g_oboss': {
        enemies: ["constructor_golem", "translation_golem", "constructor_golem"],
        rewards: ['disabler'],
        advanceRate: 1000,
        class: "translatorzone"
    },

    'g_boss': {
        enemies: ["constructor_golem", "boss_golem", "husk"],
        rewards: ['disabler'],
        advanceRate: 1000,
        class: "bossgolem",
        bgmVol: 0.65,
        getBgm: ()=>{return env.embassy.music_golems_boss}
    },

    'stagecombat': {
        class: 'stagecombat',
        enemies: ["lookertest", "lookertest", "lookertest", "lookertest", ],
        hardOpen: true,
        getBgm: ()=> new Howl({
            onload: function () {
                page.howls.push(this)
                this.intendedVol = 1
            },
            src: ['/audio/panicloop.ogg'],
            preload: true,
            loop: true,
            volume: 1,
            sprite: {
                __default: [0, 58947, true]
            }
        }),
        startCallback: ()=>{
            env.rpg.effectLineTargetIsAlwaysOrigin = true
            setTimeout(()=>{
                body.classList.remove("cull-stage", "in-combat")
            }, env.ADVANCE_RATE)
        }
    },

    'e3a2standoff': {
        enemies: ["critta_boss_boat"],
        rewards: ['kavruka', 'restorative', 'aima_cyst', 'satik_cyst', 'disabler'],
        advanceRate: 500,
        getBgm: ()=> {
            if(check("e3a2__escapemusic")) {
                setTimeout(()=>{
                    env.e3a2.escape.intendedRate = 0.9
                    env.e3a2.escape.intendedVol = 0.75
                    env.e3a2.escape.rate(0.9)
                    env.e3a2.escape.volume(0.75)
                }, 2000)
                return env.e3a2.escape

            } else {
                return env.e3a2.miniboss
                
            }
        },
        class: "standoff summonerboss",
        sceneTemplate: `
            <div id="combat" class="intro team-intro">
                <div class="render-filter"></div>
                <div id="enemy-team" class="team"></div>
                <div id="ally-team" class="team"></div>
                <div id="e3a2stage">
                    <div id="ocean">
                        <div id="boat">
                            <div id="enemy-graphic"></div>

                            <div class="boatgfx controls"></div>
                            <div class="boatgfx side left"></div>
                            <div class="boatgfx side up"></div>
                            <div class="boatgfx side right"></div>
                            <div class="boatgfx side down"></div>
                            <div class="boatgfx interloper">
                                <div class="sprite-wrapper">
                                    <figure></figure>
                                </div>
                            </div>
                            <div class="boatgfx sprite-wrapper bstrd">
                                <div class="sprite-wrapper">
                                    <figure></figure>
                                </div>
                            </div>
                            <div class="boatgfx sprite-wrapper geli">
                                <div class="sprite-wrapper">
                                    <figure></figure>
                                </div>
                            </div>    
                            <div class="boatgfx kuulla"></div>                            
                        </div>
                        <boat-escape></boat-escape>
                    </div>
                </div>
            </div>
        `,
        turnCallback: () => {
            clearEffectLines()
            content.querySelectorAll(".position-wrapper").forEach(el=>{
                if(el.childElementCount == 0) el.remove()
            })
        }
    },

    /* 
        crittaformations
        rewards are determined by the crittamap
    */

    /* grouping by difficulty */
    //primary loop boss
    '4':['crittaboss'],
    'crittaboss': {
        enemies: ["critta_boss"],
        class: "summonerboss wallfight"
    },

    //minibosses
    'c_cluster': {
        name: "Cluster",
        help: "'no single primary target';'high density of hostile thoughtforms'",
        enemies: ["queen", "king", "king", "queen"],
        advanceRate: 1000,
        class: "miniboss"
    },

    'c_collapse_shelf': {
        name: "Pain Shelf",
        help: "'primary attacks offer responsive choice';'deadly single target strikes'",
        enemies: ["queen", "bstrdshelf", "bishop"],
        class: "miniboss"
    },

    'c_collapse_gungol': {
        name: "Gun Golem",
        help: "'golem utilizing assault rifle';'strikes rapidly, randomly and inaccurately'",
        enemies: ["queen", "bstrdboss_lowintensity", "bishop"],
        class: "miniboss"
    },

    'c_collapse_movefriend': { // ing - movefriend but it's a kraken
        name: "Wavefoe",
        help: "'utilizes sickly waters in accurate area attacks';'summons tendrils to support'",
        enemies: ["movefoe_frame"],
        class: "miniboss"
    },

    'c_golem_constructor': { // ing - golem_constructor but a little more dangerous
        name: "Constructor",
        help: "'constructs dangerous arms to increase HP and act as one';'race against time'",
        enemies: ["constructor_vat", "constructor_vat", "constructor_boss_frame", "constructor_vat", "constructor_vat"],
        class: "miniboss summonerboss"
    },

    'c_golem_translator': { // ing - translator core - might have overlap with SPWN but SPWN is going to be a scarier version of it (equipment AND impulses)
        name: "Translator",
        help: "'conjures terror-inflicting foes with area attack';'copies statuses and equipment from targets'",
        enemies: ["translation_golem_frame"],
        class: "miniboss summonerboss"
    },

    'c_golem_dullzika': { // shelved in favor of other summoners
        name: "Dullzika",
        help: "'conjures puncture-inflicting foes';'destabilizes'",
        enemies: ["dull_keeper"],
        class: "miniboss summonerboss"
    },

    'c_golem_kivii': {
        name: "Greater Husk",
        help: "'high density of conjoined thoughtforms';'prominently utilizes stun and terror'",
        enemies: ["bishop", "kivii_gauntlet", "kivii", "kivii_gauntlet", "bishop"],
        class: "miniboss"
    },

    'c_daemon_dct': {
        enemies: ["container", "critta_jester", "container"],
        class: "summonerboss miniboss downshift",
        name: "DCT",
        help: "'conjures foes from nearby memories';'damaged through rapid defeat of summons';\n'prepare for many targets'",
    },

    'c_daemon_spwn': {
        name: "SPWN",
        help: "'conjures fear and rot-inflicting foes';'wide area attacks'",
        enemies: ["bishop", "critta_spawner", "bishop"],
        class: "summonerboss miniboss",
    },

    'c_daemon_imp': {
        enemies: ["critta_impetus", "critta_impetus", "critta_impetus"],
        name: "IMP",
        help: "'trio';'mimics shell actions used';'unable to mimic items'",
        class: "miniboss"
    },

    //hard
    '2': ["critta_2_0",
        "critta_2_1",
        "critta_2_2",
        "critta_2_3",
    ],
        'critta_2_0': {
            enemies: ["pawn", "rook", "king", "rook", "pawn"],
            class: "downshift",
        },
        'critta_2_1': {
            enemies: ["rook", "king", "queen", "bishop"],
            class: "downshift",
        },
        'critta_2_2': {
            enemies: ["pawn", "knight", "queen", "knight", "pawn",],
            class: "downshift",
        },
        'critta_2_3': {
            enemies: ["pawn", "bishop", "king", "bishop", "pawn"],
            class: "downshift",
        },

    //normal
    '1': [
        "critta_1_0",
        "critta_1_1",
        "critta_1_2",
        "critta_1_3",
        "critta_1_4",
        "critta_1_5",
        "critta_1_6",
        "critta_1_7",
        "critta_1_8",
        "critta_1_9",
    ],
        'critta_1_0': {
            enemies: ["pawn", "rook", "pawn"],
            class: "downshift",
        },
        'critta_1_1': {
            enemies: ["pawn", "knight", "pawn"],
            class: "downshift",
        },
        'critta_1_2': {
            enemies: ["pawn", "knight", "bishop"],
            class: "downshift",
        },
        'critta_1_3': {
            enemies: ["bishop", "knight", "bishop"],
            class: "downshift",
        },
        'critta_1_4': {
            enemies: ["knight", "bishop", "knight"],
            class: "downshift",
        },
        'critta_1_5': {
            enemies: ["knight", "knight"],
            class: "downshift",
        },
        'critta_1_6': {
            enemies: ["rook", "rook"],
            class: "downshift",
        },
        'critta_1_7': {
            enemies: ["bishop", "pawn", "rook"],
            class: "downshift",
        },
        'critta_1_8': {
            enemies: ["rook", "rook", "knight"],
            class: "downshift",
        },
        'critta_1_9': {
            enemies: ["king"],
            class: "downshift",
        },

    //easy
    '0': ['critta_0_0', 'critta_0_1', 'critta_0_2', 'critta_0_3', 'critta_0_4'],
        'critta_0_0': {
            enemies: ["pawn", "pawn"],
            class: "downshift",
        },
        'critta_0_1': {
            enemies: ["pawn", "bishop"],
            class: "downshift",
        },
        'critta_0_2': {
            enemies: ["knight"],
            class: "downshift",
        },
        'critta_0_3': {
            enemies: ["pawn", "knight"],
            class: "downshift",
        },
        'critta_0_4': {
            enemies: ["rook"],
            class: "downshift",
        },
}

//combat groups define what can spawn in different critta formation slots
//entries can be either strings (single enemies), or arrays of enemies to spawn in that spot
if(typeof env.COMBAT_GROUPS == "undefined") env.COMBAT_GROUPS = {
    collapse: { // basic enemies with basic statuses! vuln, stun, occasional puncture, guarding, big hits...
        name: "common constructs",
        pawn: ["container_exploder", "container_evader", "container_spy", "container_sfer"],
        knight: ["personnel_attendant_frame"],
        bishop: ["personnel_veilklight_frame"],
        rook: ["kivskin_frame"],
        queen: ["maintcloak_frame"],
        king: ["archival_golem_frame"],

        //these are more or less verbatim their collapse versions, except gun golem, who's an inaccurate fastshooter without a gameplay gimmick change
        miniboss_formations: ["c_collapse_shelf", "c_collapse_gungol", "c_collapse_movefriend"] // no longer can experience cluster from collapse
    },

    golem: { // these guys start to mount statuses in a more threatening way. lots more puncture, terror introduced.
        name: "husks & golems",
        pawn: ["lesserhusk", "basic_golem"], // basic stabbing guy, and unstable spikes grunt
        knight: ["lesserhusk_stabber"], // stab-chainer. more offensive than the attendant frame and a little tankier, no counter
        bishop: ["surgeon_golem", "lesserhusk_observer"], // multipurpose ST barrier/repeat-stab siphon golem, alongside a bastard coordinator for vuln and stuff
        rook: ["husk_guard_frame"], // fills the same slot as kivskin_frame, BUT more defense focused and gets counter in addition to the guard. no reliance on windup
        queen: ["husk_support"], // bastard support who can windup to do a healing maintcloak style barrier and force attention, AND resurrect a few times. scary.
        king: ["foundation_golem_frame"], // story boss version as a regular enemy. archival golem on zzoust, since it can be high ST or AOE and gets a windup attack instead of just windup

        // ing notes. boss version alterations of golem maintenance are like:
        // constructor is more or less verbatim but with more starting HP
        // translator's hallucinations copy all item effects your characters have. It's so fucked already. no change except maybe HP
        // kivii's fine without change, especially since she has two bishop backers. that could be really scary.
        miniboss_formations: ["c_golem_constructor", "c_golem_translator", "c_golem_kivii"]
    },

    daemon: {
        name: "daemons",
        pawn: ["critta_pawn"], // random chance mad claw attack - terror, status inversions, stuns, this thing can be scary if you're unlucky
        knight: ["critta_knight"], // steals positive statuses and weakens, but also summons IDEAs after dealing enough damage
        bishop: ["critta_bishop"], // inflicts special status MALWARE, and heal-destabilizes allies, giving them the scary bonus gakvu passives 
        rook: ["critta_rook"], // counterguard with frenzy-like primary. the same as before, but now gets counter!
        queen: ["critta_queen"], // mass heal/buff and debuff/MALWARE across all actors. loses rez abilities in favor of focus (with that going to bishop). only added malware
        king: ["critta_king"], // one last windup themed midboss enemy, always uses hard hitting AOE and can keep it going with momentum. unchanged

        // ing notes for dese...
        // DCT as a "kill enemies to hurt the boss" makes it a firmament-lite, with the difference being that you can't wait out the clock... so I think conceptually it'll be the same
        // SPWN was meant to be the FRAME version of the translator fight, but with that now being in FRAME, it'll be an advanced version of the same fight. copies impulses as well as items... gyuuulp
        // IMPs as a "mimic what you do but not what you have" is conceptually cool but might be weak now. maybe that's okay. not changing much
        miniboss_formations: ["c_daemon_dct", "c_daemon_spwn", "c_daemon_imp"] // these bosses also remain unchanged for today. they WILL be getting reworked though.
    }
}

if(typeof env.ACTOR_AUGMENTS == "undefined") env.ACTOR_AUGMENTS = {
    all: {
        bstrd: {
            slug: "bstrd",
            name: "Symbiotic Rifle",
            image: "/img/sprites/combat/augs/bstrd.gif",
            description: "'adapted bright weaponry';'connects to internal ammunition generator';'use at cost of HP'",
            alterations: [["ADD", "special_fullauto_player"]],
            unlocks: "item|sorry_cyst",
            showIf: "item|sorry_cyst",
            cost: 2
        }
    },

    generic: { 
        // for generated characters only
        // these use a special alternate showIf where it checks for a component in a specific slot

        //claws
        bazruka: {
            slug: "bazruka",
            name: "Bazruka",
            image: "/img/sprites/combat/augs/bazruka.gif",
            description: "'direct action upgrade'",
            alterations: [["STATUS", "aug_claws_ied"]],
            component: ["primary", "claws"],
            cost: 2
        },

        rampage: {
            slug: "rampage",
            name: "Insatiable",
            image: "/img/sprites/combat/augs/claw.gif",
            description: "'direct action upgrade'",
            alterations: [["STATUS", "aug_claws_frenzy"]],
            component: ["secondary", "claws"],
            cost: 2
        },

        wild_surge: {
            slug: "wild_surge",
            name: "Wild Surge",
            image: "/img/sprites/combat/augs/surge.gif",
            description: "'passive effect'",
            alterations: [["STATUS", "aug_claws_surge"]],
            component: ['utility', 'claws'],
            cost: 2
        },   

        //ichor
        parasite: {
            slug: "parasite",
            name: "Parasite",
            image: "/img/sprites/combat/augs/parasite.gif",
            description: "'passive effect'",
            alterations: [["STATUS", "aug_ichor_skivi"]],
            component: ["primary", "ichor"],
            cost: 2
        },

        undying: {
            slug: "undying",
            name: "Undying",
            image: "/img/sprites/combat/augs/parasite.gif",
            description: "'direct action upgrade';'additional passive effect'",
            alterations: [["STATUS", "aug_ichor_tap"], ["newmend", "newmend_mega"]],
            component: ["secondary", "ichor"],
            cost: 2
        },   

        overextend: {
            slug: "overextend",
            name: "Overextend",
            image: "/img/sprites/combat/augs/sacrifice.gif",
            description: "'passive effect'",
            alterations: [["STATUS", "aug_ichor_sacrifice"]],
            component: ["utility", "ichor"],
            cost: 2
        },    

        //eyes
        followup: {
            slug: "followup",
            name: "Follow-up",
            image: "/img/sprites/combat/augs/distract.gif",
            description: "'passive effect'",
            alterations: [["STATUS", "aug_eyes_advantage"]],
            component: ["primary", "eyes"],
            cost: 2
        },

        deathmark: {
            slug: "deathmark",
            name: "Deathmark",
            image: "/img/sprites/combat/augs/ultraspy.gif",
            description: "'direct action upgrade';'passive effect'",
            alterations: [["STATUS", "aug_eyes_direction"], ["coordination", "direction"]],
            component: ["secondary", "eyes"],
            cost: 2
        },

        enact: {
            slug: "enact",
            name: "Siege",
            image: "/img/sprites/combat/augs/sacrifice.gif",
            description: "'direct action upgrade'",
            alterations: [["STATUS", "aug_eyes_enact"]],
            component: ["utility", "eyes"],
            cost: 2
        }, 

        //bone
        swing: {
            slug: "swing",
            name: "Momentous",
            image: "/img/sprites/combat/augs/cripple.gif",
            description: "'direct action upgrade'",
            alterations: [["STATUS", "aug_bone_swing"]],
            component: ["primary", "bone"],
            cost: 2
        },

        guard: {
            slug: "guard",
            name: "Cover",
            image: "/img/sprites/combat/augs/optimize.gif",
            description: "'direct action upgrade'",
            alterations: [["STATUS", "aug_bone_guard"]],
            component: ['secondary', 'bone'],
            cost: 2
        },    

        shell: {
            slug: "shell",
            name: "Martyr",
            image: "/img/sprites/combat/augs/spike.gif",
            description: "'direct action upgrade';'additional passive effect'",
            alterations: [["STATUS", "aug_bone_shell"]],
            component: ["utility", "bone"],
            cost: 2
        },

        //light
        revise: {
            slug: "revise",
            name: "Revision",
            image: "/img/sprites/combat/augs/revise.gif",
            description: "'direct action upgrade'",
            alterations: [["STATUS", "aug_light_claw"]],
            component: ["primary", "light"],
            cost: 2
        },

        destabilize: {
            slug: "destabilize",
            name: "Natural Extreme",
            image: "/img/sprites/combat/augs/massdestabilize.gif",
            description: "'passive effect'",
            alterations: [["STATUS", "aug_light_destabilize"]],
            component: ["secondary", "light"],
            cost: 2
        },  

        invoke_madness: {
            slug: "invoke_madness",
            name: "Invoke Madness",
            image: "/img/sprites/combat/augs/massdestabilize.gif",
            description: "'passive effect'",
            alterations: [["STATUS", "aug_light_storm"]],
            component: ["utility", "light"],
            cost: 2
        },
    },

    bozko: {
        frontline: {
            slug: "frontline",
            name: "Interceptor Cores",
            image: "/img/sprites/combat/augs/spike.gif",
            description: "'insert highly coordinated guiding minds into floating gauntlets';'wrest all enemy attention'",
            alterations: [["guard", "special_guard_all"]],
            cost: 1
        },

        cripple: {
            slug: "cripple",
            name: "Dull Projectors",
            image: "/img/sprites/combat/augs/cripple.gif",
            description: "'upgrade standard dull nodes to larger ones';'hit with greater concussive force'",
            alterations: [["bozko_attack", "cripple"]],
            cost: 1
        },
    },

    cavik: {
        bazruka: {
            slug: "bazruka",
            name: "Explosive Vat",
            image: "/img/sprites/combat/augs/bazruka.gif",
            description: "'form explosive devices rapidly from random materials with external cyst';'likely to cause shrapnel wounds'",
            alterations: [["cavik_attack", "bazruka"]],
            cost: 1
        },

        restorative_barrier: {
            slug: "restorative_barrier",
            name: "Mending Applicators",
            image: "/img/sprites/combat/augs/barrier.gif",
            description: "'utilize more advanced satik applicators';'upgraded barrier mends wounds while active'",
            alterations: [["special_barrier_allies", "special_restorative_barrier"]],
            cost: 2
        },
    },

    miltza: {
        drone: {
            slug: "drone",
            name: "Attack Drone",
            image: "/img/sprites/combat/augs/drone.gif",
            description: "'connect to remote coordinator drone';'automatically attack vulnerable targets'",
            alterations: [["STATUS", "attack_drone"]],
            cost: 1,

            unequipExec: ()=>{
                change("PAGE!!removedDrone", true)
            }
        },
    },

    akizet: {
        runner_claws: {
            slug: "runner_claws",
            name: "Surface Runner Claws",
            image: "/img/sprites/combat/augs/claw.gif",
            description: "'pair of many-pronged claw augments intended for climbing';'overhauls abilities with more visceral options'",
            alterations: [
                ["akizet_attack", "eviscerate"],
                ["stab", "frenzy"]
            ],
            cost: 2
        }     
    },

    gakvu: {
        countercall: {
            slug: "countercall",
            name: "Signal Inverter",
            image: "/img/sprites/combat/augs/countercall.gif",
            description: "'project dangerously incoherent data from translation core';'cause violent collapse in destabilized targets'",
            alterations: [["gakvu_attack", "countercall"]],
            unlocks: "item|core_translation",
            cost: 1
        },

        mass_destabilize: {
            slug: "mass_destabilize",
            name: "Groundsmindry Relays",
            image: "/img/sprites/combat/augs/massdestabilize.gif",
            description: "'cysts connected remotely';'broadcast destabilizing groundsmindry signal';'includes allies';'fatal if misused'",
            alterations: [["destabilize", "special_mass_destabilize"]],
            cost: 2
        },  
    },

    tozik: {
        parasite: {
            slug: "parasite",
            name: "Parasitic Siphon",
            image: "/img/sprites/combat/augs/parasite.gif",
            description: "'connect corruskivi with additional sfer retrieval drone';'attach to foes for ally restoration on contact'",
            alterations: [["tozik_attack", "parasite"]],
            cost: 1
        },

        optimize: {
            slug: "optimize",
            name: "Ukuzu Restorative",
            image: "/img/sprites/combat/augs/optimize.gif",
            description: "'encourage ally to act twice at cost of lesser mending ability';'named after seasonal spore fog known to increase waking energy'",
            alterations: [["mend", "optimize"]],
            cost: 1
        },          
    },
}