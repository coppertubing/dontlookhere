
if(typeof env.COMBAT_ACTORS == "undefined") env.COMBAT_ACTORS = {
    generic: {
        name: "GENERATED",
        maxhp: 10,
        hp: 10,
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
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
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

    tutorial_golem: {
        name: "Golem",
        maxhp: 20,
        hp: 20,
        actions: ["foe_stab", "malfunction"],
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
        reactions: {} //SILENT CREATURE
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

    archival_golem: {
        name: "Archival Golem",
        maxhp: 40,
        hp: 30,
        actions: ["windup"],
        windupActions: ["archival_smash"],
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
        reactions: {} //SILENT CREATURE
    },

    bstrdlight: {
        name: "BSTRDlight",
        maxhp: 40,
        hp: 30,
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

    maintcloak: {
        name: "Jutskin",
        maxhp: 30,
        hp: 20,
        actions: ["special_barrier_allies", "stab"],
        graphic: `
            <div class="sprite-wrapper maintcloak" id="%SLUG-sprite-wrapper">
                <div class="spritestack" style="transform-style: preserve-3d;">
                    <img class="sprite" src="/img/sprites/combat/foes/maintcloak.gif">
                    <img class="sprite" src="/img/sprites/combat/foes/mainthead.gif">
                    <img class="sprite" src="/img/sprites/combat/foes/mainthead.gif">

                    <div class="target" entity="jutskin"></div>
                </div>
            </div>
        `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
        turnCheck: "maintcloak"
    },

    bstrdboss: {
        name: "BSTRD Golem",
        readoutActor: "bstrd",
        maxhp: 80,
        hp: 80,
        lastStand: "bstrd",
        statusImmunities: ["stun"],
        actions: ["incoherent_gundown"],
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
                </div>

                <div class="target" entity="bstrd golem"></div>
            </div>
            `,
        reactions: {
            receive_destabilized: ["WOaoOAw"],
            receive_rez: ["AHAHA :^) GOT U"],
            puncture: ["OOUUEU"],
            destabilized: ["DOUBLE BULLETS !!"],
        }
    },

    bstrdboss_lowintensity: {
        slug: "bstrdboss_lowintensity",
        name: "BSTRD Golem",
        readoutActor: "bstrd",
        maxhp: 50,
        hp: 50,
        statusImmunities: ["stun"],
        actions: ["special_fullauto"],
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
        maxhp: 70,
        hp: 60,
        actions: ["special_archiveshelf_annihilate"],
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
        maxhp: 15,
        hp: 15,
        actions: [
            "akizet_attack",
            "stab", 
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
        },
    },

    gakvu: {
        name: "Gakvu",
        readoutActor: "gakvu",
        maxhp: 10,
        hp: 10,
        unique: true,
        actions: ["gakvu_attack", "destabilize", "evade"],
        sceneActions: ["scene_gakvu_attack", "destabilize", "scene_evade"],
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
            receive_redirection: ["bozko??"],
        },
    }, 

    tozik: {
        name: "Tozik",
        readoutActor: "tozik",
        maxhp: 10,
        hp: 10,
        unique: true,
        actions: ["tozik_attack", "mend", "evade"],
        sceneActions: ["tozik_attack", "scene_parasite", "scene_mend"],
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
        unique: true,
        actions: ["miltza_attack", "spy", "evade"],
        sceneActions: ["scene_miltza_attack", "scene_spy", "scene_evade"],
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
            crit: ["die!! die!!"],
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
        unique: true,
        actions: ["bozko_attack", "guard", "shell"],
        sceneActions: ["scene_bozko_attack", "scene_pull", "scene_guard"],
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
        initialStatusEffects: [["fear", 1]],
        maxhp: 10,
        hp: 10,
        unique: true,
        actions: ["cavik_attack", "special_barrier_allies", "evade"],
        sceneActions: ["scene_cavik_attack", "special_barrier_allies", "scene_evade"],
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
            receive_redirection: ["thank you, bozko!", "i will cover you!"],
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
        actions: ["brawl", "windup"],
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

        reactions: {
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
            give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ", "", "", "", "", "", ""],
        },

        regenAllSprites: (ungeneratedOnly = false) => { //used in combat and stage stuff
            let query = '.husk.sprite-wrapper'
            if(ungeneratedOnly) query = '.husk.sprite-wrapper:not(.generated)'
            document.querySelectorAll('.husk.sprite-wrapper').forEach(sprite=>{
                env.COMBAT_ACTORS.husk.events.onSpriteCreation(sprite)
            })
        },
        
        events: {
            onSpriteCreation: (sprite) => {
                if(content.querySelector("critta-map")) { return }

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
        actions: ["mend", "tozik_attack", "foe_stab"],
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
        actions: ["special_self_destruct", "berserk", "foe_stab"],
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

    kivii: {
        name: "Dozkallvi",
        maxhp: 175,
        hp: 175,
        actions: ["speak", "speak", "speak", "spy_target", "enemy_shell"],
        statusImmunities: ["stun"],
        graphic: `
            <div class="sprite-wrapper kivii" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img class="sprite" src="/img/sprites/combat/foes/kivii/combat.gif" id="%SLUG-sprite">
                    <div class="target" entity="dozkallvi"></div>
                </div>
            </div>
            `,
        reactions: {
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
            give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ", "", "", "", "", "", ""],
        },
        initialStatusEffects: [["conjoined", 1]],
    },

    kivii_gauntlet: {
        name: "Gauntlet",
        maxhp: 175,
        hp: 175,
        actions: ["windup", "kivii_grasp"],
        windupActions: ["archival_smash"],
        graphic: `
            <div class="sprite-wrapper kiviigauntlet" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/combat/foes/kivii/gauntlet.gif" id="%SLUG-sprite">
                <div class="target" entity="gauntlet"></div>
            </div>
            `,
        reactions: {},
        initialStatusEffects: [["conjoined", 1]],
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

    translation_golem: {
        name: "Translation Core",
        maxhp: 80,
        hp: 80,
        actions: ["special_chant"],
        statusImmunities: ["stun"],
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
        maxhp: 3,
        hp: 3,
        actions: ["speak", "husk_attack_weak"],
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
        initialStatusEffects: [["ethereal", 1]],
        turnCheck: "hallucinations",
        events: {
            onSpriteCreation: (sprite) => {
                if(!sprite) return

                let basis = sprite.querySelector('img.basis')
                let base = sprite.querySelector('img.base')
                let eyes = sprite.querySelector('img.eyes')

                if(env.hallucinator == "generic") {
                    basis.src = `/img/sprites/combat/foes/hallucinations/gakvu.png`
                    base.src = `/img/sprites/combat/foes/hallucinations/gakvu.png`
                    eyes.src = `/img/sprites/combat/foes/hallucinations/gakvu_eyes.png`
                } else {
                    if(env.hallucinator == "ikgolem" && env.ep4) env.hallucinator == "ikgolem_ep4"
                    basis.src = `/img/sprites/combat/foes/hallucinations/${env.hallucinator}.png`
                    base.src = `/img/sprites/combat/foes/hallucinations/${env.hallucinator}.png`
                    eyes.src = `/img/sprites/combat/foes/hallucinations/${env.hallucinator}_eyes.png`                    
                }
            }
        }
    },

    boss_golem: {
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

    critta_pawn: {
        name: "WRK",
        specialClass: "daemonactor",
        maxhp: 20,
        actions: ["revise", "mad_claw", "evade"],
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

    critta_knight: {
        name: "CLW",
        specialClass: "daemonactor",
        maxhp: 30,
        actions: ["cripple", "exploit", "surge"],
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="clw"></div>
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

    critta_bishop: {
        name: "NET",
        specialClass: "daemonactor",
        maxhp: 25,
        actions: ["speak", "parasite", "empower", "rez"],
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
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="enfc"></div>
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

    critta_queen: {
        name: "SEER",
        specialClass: "daemonactor",
        maxhp: 45,
        actions: ["windup"],
        windupActions: ["special_rule", "wound_lastresort"],
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
        specialClass: "daemonactor",
        maxhp: 50,
        actions: ["windup"],
        windupActions: ["special_judgement"],
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
        actions: ["special_chant_mega"],
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
        specialClass: "daemonactor",
        maxhp: 10,
        actions: ["husk_attack_rot", "surge"],
        initialStatusEffects: [["ethereal", 1]],
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
        statusImmunities: ["stun"],
        initialStatusEffects: [["mimic", 1], ["conjoined", 1]],
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
        maxhp: 1000000,
        specialClass: "mainfoe daemonactor",
        statusImmunities: ["stun"],
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
            onInitialize: (actor) => { 
                let impulseStrength = Math.max(env.crittaMap.getModQty("global_anti") - 5, 0)
                let selections = shuffle(env.crittaMap.possibleZoneComponents.map(component => component.slug).splice(0, env.crittaMap.tension))

                actor.alterations = [] // just to trigger alterations
                actor.components = {}
                let slotShuffle = shuffle(["primary", "secondary", "utility"])

                for (const slotName of slotShuffle) {
                    let selection = false
                    selection = selections.shift()

                    if(selection) actor.components[slotName] = selection.replace("intrusive", "light");
                    else break
                }
                
                if(impulseStrength) {
                    let possibleImpulses = shuffle(Object.entries(env.STATUS_EFFECTS).filter(entry => entry[1].impulse))
                    possibleImpulses = possibleImpulses.filter(entry => !["ichor_last_stand"].includes(entry[0]))
                    for (let i = 0; i < impulseStrength; i++) {
                        actor.alterations.push(["STATUS", possibleImpulses.sample()[0], "IMPULSE"])
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
        specialClass: "intrusiveactor mainfoe",
        statusImmunities: ["stun"],
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
        actions: ["guard"],
        initialStatusEffects: [["weak_point", 1]],
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
        maxhp: 200,
        specialClass: "intrusiveactor",
        actions: ["frenzy", "special_restorative_barrier", "coordination"],
        initialStatusEffects: [["impatient", 1]],
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
        actions: ["revise", "special_mass_destabilize"],
        initialStatusEffects: [["impatient", 1], ["active_support", 1]],
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
        initialStatusEffects: [["ominous_timer", 1]],
        statusImmunities: ["stun"],
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
        hp: 6,
        move: 2,
        actions: ["arch_whelm"],
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

    arch_puncher: {
        //knockback-focused basic enemy
        name: "Figure",
        maxhp: 15,
        hp: 15,
        move: 3,
        actions: ["arch_punch"],
        initialStatusEffects: [["ethereal_passive", 1]],
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

    arch_bomber: {
        name: "Shape",
        maxhp: 15,
        hp: 15,
        move: 3,
        /* Bomb + shape AOE thrown on foes. */
        actions: ["arch_bomb"],
        initialStatusEffects: [["ethereal_passive", 1]],
        graphic: `
        <div class="sprite-wrapper spectral autosize" id="%SLUG-sprite-wrapper" style="width: 120px;position: absolute;bottom: 0;">
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
        name: "Golem", //obviously rename this
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
        move: 0,
        actions: ["special_arch_support"],
        initialStatusEffects: [["ethereal_passive", 1]],
        
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
        graphic: `
            <div class="sprite-wrapper destructible marbletable nofilter" id="%SLUG-sprite-wrapper">
            </div>
            `,
        initialStatusEffects: [["destructible_cross", 10]],
    },

    destructible_adull: {
        name: "Altar",
        maxhp: 10,
        hp: 10,
        actions: ["nothing"],
        standClass: "destructible",
        tileClass: "destructiblebearer",
        graphic: `<div class="sprite-wrapper destructible adull nofilter" id="%SLUG-sprite-wrapper">
            <div class="target" entity="adull's altar"></div>
            <div class="adullgfx">
                <img src="/img/local/embassy/f2_bright.gif">
                <img src="/img/local/embassy/f2_bright.gif">
            </div>
        </div>`,
        initialStatusEffects: [["ethereal", 10]],
    },

    destructible_minishelf: {
        name: "Pillar",
        maxhp: 10,
        hp: 10,
        actions: ["nothing"],
        standClass: "destructible",
        tileClass: "destructiblebearer",
        graphic: `<div class="sprite-wrapper destructible adull nofilter" id="%SLUG-sprite-wrapper">
            <div class="target" entity="priority branch"></div>
            <div class="adullgfx">
                <img src="/img/local/embassy/mind/littleshelf.gif">
                <img src="/img/local/embassy//mind/littleshelf.gif">
            </div>
        </div>`,
        initialStatusEffects: [["ethereal", 10]],
    },

    destructible_box: {
        name: "Container",
        maxhp: 10,
        hp: 10,
        actions: ["nothing"],
        standClass: "destructible",
        tileClass: "destructiblebearer",
        immunities: {
            scene_edge: true
        },
        graphic: `<div class="sprite-wrapper destructible box nofilter" id="%SLUG-sprite-wrapper" style="width: var(--gridTileSize); height: var(--gridTileSize)">
            <div class="deadtainer warp"><span></span><span></span><span></span><span></span><span></span></div>
        </div>`,
        initialStatusEffects: [["ethereal", 10]],
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
        actions: ["truly_nothing"],
        initialStatusEffects: [["shroud_vekoa", 1]],
        immunities: {
            scene_edge: true
        },
        graphic: `
        <div class="sprite-wrapper vekoa autosize" id="%SLUG-sprite-wrapper" style="width: 100px">
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
        actions: ["special_archivist"],
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

    /* EP4 heart */
    destructible_heart_wall: {
        name: "Tendril",
        maxhp: 200,
        hp: 200,
        actions: ["special_heartwall"],
        wallWidth: 5,
        standClass: "destructible",
        tileClass: "destructiblebearertall",
        lastStand: true,
        unique: true,
        immunities: {
            knockback: true,
            stun: true,
        },
        initialStatusEffects: [["destructible_wall", 1], ["ethereal_passive", 1]],
        graphic: `<div class="sprite-wrapper destructible splittendril solid" id="%SLUG-sprite-wrapper"><div class="target" entity="ceremony tendril"></div></div>`,
    },

    /* EP4 split enemies */
    destructible_split_tendril_1: {
        name: "Interfering Tendril",
        maxhp: 20,
        hp: 20,
        unique: true,
        actions: ["nothing"],
        standClass: "destructible",
        tileClass: "destructiblebearertall",
        initialStatusEffects: [["destructible_wall", 1], ["ethereal_passive", 1]],
        graphic: `<div class="sprite-wrapper destructible splittendril" id="%SLUG-sprite-wrapper"><div class="target" entity="ceremony tendril"></div></div>`,
    },

    destructible_split_tendril_2: {
        name: "Interfering Tendril",
        maxhp: 20,
        hp: 20,
        unique: true,
        actions: ["nothing"],
        standClass: "destructible",
        tileClass: "destructiblebearertall",
        initialStatusEffects: [["destructible_wall", 1], ["ethereal_passive", 1]],
        graphic: `
            <div class="sprite-wrapper destructible splittendril" id="%SLUG-sprite-wrapper"><div class="target" entity="ceremony tendril"></div></div>`,
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
    },

    destructible_spineroot: {
        //roots used in the miltzer fight to plant bombs on
        //despite listed hp, can only be killed through certain means, controlled by status
        name: "Spinal Root",
        maxhp: 10,
        hp: 10,
        initialStatusEffects: [["destructible_spinalroot", 1]],
        actions: ["nothing"],
        standClass: "destructible",
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

        actions: ["tele_dullflare_evil",],
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
        maxhp: 40,
        hp: 40,
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
        //create big empty space to navigate once destroyed
        maxhp: 20,
        hp: 20,
        initialStatusEffects: [["destructible_lesserpod", 1], ["ethereal_passive", 1]],
        actions: ["nothing"],
        lastStand: true,
        standClass: "destructible",
        tileClass: "destructiblebearertall",
        graphic: `
            <div class="sprite-wrapper destructible" id="%SLUG-sprite-wrapper">
                <div class="dyp" style="display: flex;justify-content: center;align-items: center;">
                    <div class="dypcontent pyramid pyrapod noveins" style="--dyp-width: 3;--dyp-height: 3;--dyp-image: transparent;">
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

    /* EP4 final phase 1 - Vekoa fight */
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
        standClass: "static",
        actions: ["special_eye_boss"],
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
        tileClass: "destructiblebearertall",
        initialStatusEffects: [["destructible_wall", 1], ["ethereal_passive", 1], ["invisible", 1], ["immobile_hardskip", 1]],
        graphic: `
            <div class="sprite-wrapper destructible splittendril" id="%SLUG-sprite-wrapper"><div class="target" entity="ceremony tendril"></div></div>
            `,
    },

    destructible_split_tendril_4: {
        name: "Interfering Tendril",
        maxhp: 150,
        hp: 150,
        unique: true,
        actions: ["nothing"],
        standClass: "destructible",
        tileClass: "destructiblebearertall",
        initialStatusEffects: [["destructible_wall", 1], ["ethereal_passive", 1], ["invisible", 1], ["immobile_hardskip", 1]],
        graphic: `
            <div class="sprite-wrapper destructible splittendril" id="%SLUG-sprite-wrapper"><div class="target" entity="ceremony tendril"></div></div>
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
        initialStatusEffects: [["destructible_epicenter_vein", 1], ["immobile_hardskip", 1]],
        immunities: {
            stun: true,
            scene_edge: true
        },
        actions: ["truly_nothing"],
        standClass: "destructible",
        graphic: `
            <div class="sprite-wrapper destructible finalveins" id="%SLUG-sprite-wrapper">
                <img class="sprite veins" src="/img/local/embassy/mind/ceremonyveintop.gif" id="%SLUG-sprite">
                <div class="target" entity="ceremony vein"></div>
                <img class="sprite veins" src="/img/local/embassy/mind/ceremonyveinbottomtwist.gif" id="%SLUG-sprite">
            </div>
        `,
    },
    
    vekoa_golem: {
        name: "Golem",
        maxhp: 80,
        hp: 80,
        initialStatusEffects: [["ethereal_passive", 1], ["vekoa_golem", 1]],
        immunities: {
            stun: true,
            scene_edge: true
        },
        actions: ["tele_dullflare_evil", "special_tele_golemblast"],
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
    
    vekoa_final: {
        name: "vekoa?",
        maxhp: 0,
        hp: 0,
        move: 0,
        unique: true,
        lastStand: true,
        actions: ["vekoa_swipe"],
        initialStatusEffects: [["boss_vekoa", 1]],
        immunities: {
            stun: true,
            scene_edge: true,
        },      
        graphic: `
        <div class="sprite-wrapper vekoa autosize" id="%SLUG-sprite-wrapper" style="width: 100px">
            <div class="target" entity="vekoa"></div>
            <img class="sprite" id="vekoasprite" src="/img/sprites/vekoa/vekoahaze.gif" id="%SLUG-sprite">
        </div>
        `,

        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        }
    },
}

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

    'tutorial_golem': {
        enemies: ["tutorial_golem"]
    },

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

    'archivetutorial': {
        enemies: ["maintcloak", "archival_golem"],
        rewards: ['satik_cyst'],
        class: "bastard",
        advanceRate: 1000,
        bgmRate: 0.75,
        getBgm: ()=> {return env.embassy.music_bstrdcombat}
    },

    'archivecommon': {
        enemies: ["bstrdlight", "maintcloak", "archival_golem"],
        rewards: ['kavruka', 'aima_cyst'],
        class: "bastard",
        advanceRate: 1000,
        bgmRate: 0.75,
        getBgm: ()=> {return env.embassy.music_bstrdcombat}
    },

    'archivedouble': {
        enemies: ["archival_golem", "bstrdlight", "maintcloak", "archival_golem"],
        rewards: ['kavruka', 'satik_cyst'],
        class: "bastard",
        advanceRate: 1000,
        bgmRate: 0.75,
        getBgm: ()=> {return env.embassy.music_bstrdcombat}
    },

    'archivecontainers': {
        enemies: ["container", "container", "container", "bstrdlight", "container", "container", "container"],
        rewards: ['satik_cyst'],
        class: "bastard",
        advanceRate: 1000,
        bgmRate: 0.75,
        getBgm: ()=> {return env.embassy.music_bstrdcombat}
    },

    'archivecloaktainer': {
        enemies: ["container", "container", "maintcloak", "container", "container"],
        rewards: ['kavruka'],
        class: "bastard",
        advanceRate: 1000,
        bgmRate: 0.75,
        getBgm: ()=> {return env.embassy.music_bstrdcombat}
    },

    'archiveshelfminiboss': {
        enemies: ["bstrdlight", "bstrdshelf", "maintcloak"],
        rewards: ['satik_cyst'],
        class: "bastard bstrdshelf",
        advanceRate: 1000,
        bgmRate: 0.75,
        getBgm: ()=> {return env.embassy.music_bstrdcombat}
    },

    'bstrdboss': {
        enemies: ["maintcloak", "bstrdboss", "bstrdlight"],
        rewards: ['kavruka', 'aima_cyst'],
        advanceRate: 1000,
        bgmRate: 0.75,
        getBgm: ()=> {return env.embassy.music_bstrdcombat}
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
        class: "intrusivefight summonerboss",
        advanceRate: 1000,
        bgmRate: 0.3,
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

    'g_mboss': {
        enemies: ["kivii_gauntlet", "kivii", "kivii_gauntlet"],
        rewards: ['disabler'],
        class: "kivii",
        advanceRate: 1000,
        bgmRate: 0.85
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
        help: "'golem utilizing assault rifle';'strikes quickly, randomly and inaccurately'",
        enemies: ["queen", "bstrdboss_lowintensity", "bishop"],
        class: "miniboss"
    },

    'c_golem_dullzika': {
        name: "Dullzika",
        help: "'conjures puncture-inflicting foes';'destabilizes'",
        enemies: ["dull_keeper"],
        class: "miniboss summonerboss"
    },

    'c_golem_kivii': {
        name: "Greater Husk",
        help: "'high density of conjoined thoughtforms';'utilizes windup attacks and fear'",
        enemies: ["bishop", "kivii_gauntlet", "kivii", "kivii_gauntlet", "bishop"],
        class: "miniboss"
    },

    'c_daemon_dct': {
        enemies: ["container", "critta_jester", "container"],
        class: "summonerboss miniboss",
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
            enemies: ["pawn", "rook", "king", "rook", "pawn"]
        },
        'critta_2_1': {
            enemies: ["rook", "king", "queen", "bishop"]
        },
        'critta_2_2': {
            enemies: ["pawn", "knight", "queen", "knight", "pawn",]
        },
        'critta_2_3': {
            enemies: ["pawn", "bishop", "king", "bishop", "pawn"]
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
            enemies: ["pawn", "rook", "pawn"]
        },
        'critta_1_1': {
            enemies: ["pawn", "knight", "pawn"]
        },
        'critta_1_2': {
            enemies: ["pawn", "knight", "bishop"]
        },
        'critta_1_3': {
            enemies: ["bishop", "knight", "bishop"]
        },
        'critta_1_4': {
            enemies: ["knight", "bishop", "knight"]
        },
        'critta_1_5': {
            enemies: ["knight", "knight"]
        },
        'critta_1_6': {
            enemies: ["rook", "rook"]
        },
        'critta_1_7': {
            enemies: ["bishop", "pawn", "rook"]
        },
        'critta_1_8': {
            enemies: ["rook", "rook", "knight"]
        },
        'critta_1_9': {
            enemies: ["king"]
        },

    //easy
    '0': ['critta_0_0', 'critta_0_1', 'critta_0_2', 'critta_0_3', 'critta_0_4', 'critta_0_5'],
        'critta_0_0': {
            enemies: ["pawn", "pawn"]
        },
        'critta_0_1': {
            enemies: ["pawn", "bishop"]
        },
        'critta_0_2': {
            enemies: ["knight"]
        },
        'critta_0_3': {
            enemies: ["pawn", "knight"]
        },
        'critta_0_4': {
            enemies: ["rook"]
        },
        'critta_0_5': {
            enemies: ["knight", "bishop"]
        },
}

//combat groups define what can spawn in different critta formation slots
//entries can be either strings (single enemies), or arrays of enemies to spawn in that spot
if(typeof env.COMBAT_GROUPS == "undefined") env.COMBAT_GROUPS = {
    collapse: {
        name: "early collapse",
        pawn: [["container"]],
        knight: ["attendant"],
        bishop: ["veilklight"],
        rook: ["attendant"],
        queen: ["maintcloak"],
        king: ["archival_golem"],
        miniboss_formations: ["c_cluster", "c_collapse_shelf", "c_collapse_gungol"]
    },

    golem: {
        name: "golem maintenance",
        pawn: ["basic_golem"],
        knight: ["husk"],
        bishop: ["surgeon_golem"],
        rook: ["pressure_golem"],
        queen: ["constructor_golem", "surgeon_golem"], 
        king: ["dull_golem"], 
        miniboss_formations: ["c_cluster", "c_golem_dullzika", "c_golem_kivii"]
    },

    daemon: {
        name: "daemons",
        pawn: ["critta_pawn"],
        knight: ["critta_knight"],
        bishop: ["critta_bishop"],
        rook: ["critta_rook"],
        queen: ["critta_queen"],
        king: ["critta_king"],
        miniboss_formations: ["c_daemon_dct", "c_daemon_spwn", "c_daemon_imp"]
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

        //ichor
        parasite: {
            slug: "parasite",
            name: "Parasitic Siphon",
            image: "/img/sprites/combat/augs/parasite.gif",
            description: "'connect corruskivi with additional sfer retrieval drone';'attach to foes for ally restoration on contact'",
            alterations: [["tozik_attack", "parasite"]],
            component: ["primary", "ichor"],
            cost: 2
        },

        optimize: {
            slug: "optimize",
            name: "Ukuzu Restorative",
            image: "/img/sprites/combat/augs/optimize.gif",
            description: "'encourage ally to act twice at cost of lesser mending ability';'named after seasonal spore fog known to increase energy'",
            alterations: [["mend", "optimize"]],
            component: ["secondary", "ichor"],
            cost: 2
        },   

        final_sacrifice: {
            slug: "final_sacrifice",
            name: "Final Offering",
            image: "/img/sprites/combat/augs/sacrifice.gif",
            description: "'extend self beyond limits';'consume HP for extreme damage'",
            alterations: [["sacrifice", "special_final_sacrifice"]],
            component: ["utility", "ichor"],
            cost: 2
        },    

        //eyes
        distraction: {
            slug: "distraction",
            name: "Distraction",
            image: "/img/sprites/combat/augs/distract.gif",
            description: "'take a more defensive role';'attack with a clever feint and grant allies safety'",
            alterations: [["exploit", "miltza_attack"]],
            component: ["primary", "eyes"],
            cost: 2
        },

        ultra_spy: {
            slug: "ultra_spy",
            name: "Find Flaw",
            image: "/img/sprites/combat/augs/ultraspy.gif",
            description: "'enhance sight';'mark enemy vulnerable to extreme critical damage'",
            alterations: [["spy", "ultra_spy"]],
            component: ["secondary", "eyes"],
            cost: 2
        },

        enact: {
            slug: "enact",
            name: "Planned Attack",
            image: "/img/sprites/combat/augs/sacrifice.gif",
            description: "'recede to plot a chain of attacks';'consume evasion for extra primary usage'",
            alterations: [
                ["coordination", "plot"],
                ["ADD", "special_enact"]
            ],
            component: ["utility", "eyes"],
            cost: 2
        },    

        //claws
        bazruka: {
            slug: "bazruka",
            name: "Bazruka",
            image: "/img/sprites/combat/augs/bazruka.gif",
            description: "'upgrade explosive';'likely to cause shrapnel puncture wounds'",
            alterations: [["cavik_attack", "bazruka"]],
            component: ["primary", "claws"],
            cost: 2
        },

        frenzy: {
            slug: "frenzy",
            name: "Frenzy",
            image: "/img/sprites/combat/augs/claw.gif",
            description: "'equip additional stabbing weaponry';'may inspire cascade of attacks'",
            alterations: [["stab", "frenzy"]],
            component: ["secondary", "claws"],
            cost: 2
        },

        wild_surge: {
            slug: "wild_surge",
            name: "Wild Surge",
            image: "/img/sprites/combat/augs/surge.gif",
            description: "'overexert self for extreme effectiveness';'next targeted action is used across entire team'",
            alterations: [["surge", "wild_surge"]],
            component: ['utility', 'claws'],
            cost: 2
        },   

        //bone
        wound: {
            slug: "wound",
            name: "Wound",
            image: "/img/sprites/combat/augs/cripple.gif",
            description: "'aggressive alteration';'inflict damage increasing wound instead of weakness'",
            alterations: [["bone_break", "lesser_wound"]],
            component: ["primary", "bone"],
            cost: 2
        },

        restorative_barrier: {
            slug: "restorative_barrier",
            name: "Mending Applicators",
            image: "/img/sprites/combat/augs/barrier.gif",
            description: "'utilize advanced satik applicators on team';'barrier mends wounds while active'",
            alterations: [["shell", "special_restorative_barrier"]],
            component: ["utility", "bone"],
            cost: 2
        },

        martyr: {
            slug: "martyr",
            name: "Martyr",
            image: "/img/sprites/combat/augs/spike.gif",
            description: "'stand before team';'redirect all incoming attacks';'retaliate'",
            alterations: [["guard", "special_guard_all_bonus"]],
            component: ['secondary', 'bone'],
            cost: 2
        },    

        //light
        revise: {
            slug: "revise",
            name: "Revise",
            image: "/img/sprites/combat/augs/revise.gif",
            description: "'grasp at false structures';'turn beneficial statuses against foes'",
            alterations: [["mad_claw", "revise"]],
            component: ["primary", "light"],
            cost: 2
        },

        mass_destabilize: {
            slug: "mass_destabilize",
            name: "Groundsmindry Relays",
            image: "/img/sprites/combat/augs/massdestabilize.gif",
            description: "'broadcast destabilizing signal';'includes allies';'fatal if misused'",
            alterations: [["destabilize", "special_mass_destabilize"]],
            component: ["secondary", "light"],
            cost: 2
        },  

        invoke_madness: {
            slug: "invoke_madness",
            name: "Invoke Madness",
            image: "/img/sprites/combat/augs/surge.gif",
            description: "'utilize horrific discoveries';'terrify and confuse foes'",
            alterations: [["special_invite_storm", "special_invoke_madness"]],
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