// readability

horriblefuckingthing = [
    '',
    'not_found',
    'credits',
    'hello',
    'hub',

    'local/beneath',
        'local/beneath/car',
        'local/beneath/depths',
        'local/beneath/embassy',
        'local/beneath/parasite',
    'local/cache',
    'local/city',
        'local/city/street',
        'local/city/aquarium',
    'local/depths',
    'local/dullvessel',
    'local/ocean',
        'local/ocean/embassy',
            'local/ocean/embassy/golem',
            'local/ocean/embassy/groundsmindry',
        'local/ocean/polygonation',
        'local/ocean/ship',
            'local/ocean/ship/interview',
            'local/ocean/ship/deck',
            'local/ocean/ship/elsewhere',
    'local/orbit',
        'local/orbit/moon',
    'local/ozo',
    'local/uncosm',
        'local/uncosm/call',
        'local/uncosm/cavik',
        'local/uncosm/clemens romanus',
        'local/uncosm/corru',
        'local/uncosm/dog',
        'local/uncosm/dull',
        'local/uncosm/effigy',
        'local/uncosm/fairy',
        'local/uncosm/flower',
        'local/uncosm/humor',
        'local/uncosm/larval',
        'local/uncosm/no',
        'local/uncosm/parasite',
        'local/uncosm/pit',
        'local/uncosm/recosm',
        'local/uncosm/sorry',
        'local/uncosm/spire',
        'local/uncosm/surface',
        'local/uncosm/veilk',
        'local/uncosm/walker',
        'local/uncosm/where',
        'local/uncosm/yuzku',
        'local/uncosm/zuzucri',
        'local/uncosm/zuzucri-mask',
        'local/uncosm/zuzucri-masks',
    
        'js/beneath_embassy.js',
        'js/buddy_extern.js',
        'js/buddy.js',
        'js/bullethell_playermovement.js',
        'js/bullethell.js',
        'js/corru.js',
        'js/cystStage.js',
        'js/dialogue.js',
        'js/embassy_collapse.js',
        'js/embassy_golem.js',
        'js/embassy_groundsmindry_dialogue.js',
        'js/embassy_groundsmindry.js',
        'js/embassy_precollapse.js',
        'js/embassy_stages_golem.js',
        'js/embassy_stages_groundsmindry.js',
        'js/embassy_stages.js',
        'js/embassy.js',
        'js/fishy.js',
        'js/globalents.js',
        'js/hub.js',
        'js/jokziozo_dialogue.js',
        'js/jokziozo.js',
        'js/objectives.js',
            'js/combat/combat.js',
            'js/combat/combatActionsJson.js',
            'js/combat/combatActorsJson.js',
            'js/combat/combatGrid.js',
            'js/combat/combatGridScenarios.js',
            'js/combat/combatTileEffects.js',
            'js/combat/critta.js',
            'js/combat/fpfight.js',
        'js/shared/e3a2geli.js',

        'css/bullethell.css',
        'css/combat.css',
        'css/combatGrid.css',
        'css/corru.css',
        'css/crittamode.css',
        'css/cystStage.css',
        'css/eyes.css',
        'css/fpfight.css',
            'css/local/city.css',
            'css/local/embassy_global.css',
            'css/local/embassy_groundsmindry.css',
            'css/local/embassy.css',
            'css/local/homepage.css',
            'css/local/ozo.css',
            'css/local/sky.css',
        'css/stage/beneath.css',
        'css/stage/goodwalls.css',
]

differences = 0;

function fuckingGetThem(i = 0) {
    if (i == horriblefuckingthing.length) return console.log("checked " + horriblefuckingthing.length + ", found " + differences);

    corrucode = ``;
    ourcode = ``;
      
    fetch("https://corru.observer/" + horriblefuckingthing[i])
        .then((response) => response.text())
        .then((text) => corrucode = text)
        .then(() => {
            fetch("https://coppertubing.github.io./dontlookhere/sauce code/" + horriblefuckingthing[i])
                .then((response) => response.text())
                .then((text) => {
                    ourcode = new String(text).replaceAll('\r', '');

                    if (corrucode.length == ourcode.length) {
                        for (let char = 0; char < corrucode.length; char++) {
                            if (corrucode.charAt(char) == ourcode.charAt(char)) {}
                            else {
                                differences++;
                                console.error("OOPS FOUND A DIFFERENCE!!!!! (characters dont add up) PLEASE INSPECT THIS CLOSER: " + horriblefuckingthing[i]);
                                console.log(`${corrucode.charAt(char-5)}${corrucode.charAt(char-4)}${corrucode.charAt(char-3)}${corrucode.charAt(char-2)}${corrucode.charAt(char-1)}${corrucode.charAt(char)}${corrucode.charAt(char+1)}${corrucode.charAt(char+2)}${corrucode.charAt(char+3)}${corrucode.charAt(char+4)}${corrucode.charAt(char+5)} vs ${ourcode.charAt(char-5)}${ourcode.charAt(char-4)}${ourcode.charAt(char-3)}${ourcode.charAt(char-2)}${ourcode.charAt(char-1)}${ourcode.charAt(char)}${ourcode.charAt(char+1)}${ourcode.charAt(char+2)}${ourcode.charAt(char+3)}${ourcode.charAt(char+4)}${ourcode.charAt(char+5)}`)
                                for (let charLog = char+5; charLog<corrucode.length;charLog++) {
                                    if (corrucode.charAt(charLog) == ourcode.charAt(charLog)) {}
                                    else {
                                        console.log(`${corrucode.charAt(charLog-5)}${corrucode.charAt(charLog-4)}${corrucode.charAt(charLog-3)}${corrucode.charAt(charLog-2)}${corrucode.charAt(charLog-1)}${corrucode.charAt(charLog)}${corrucode.charAt(charLog+1)}${corrucode.charAt(charLog+2)}${corrucode.charAt(charLog+3)}${corrucode.charAt(charLog+4)}${corrucode.charAt(charLog+5)} vs ${ourcode.charAt(charLog-5)}${ourcode.charAt(charLog-4)}${ourcode.charAt(charLog-3)}${ourcode.charAt(charLog-2)}${ourcode.charAt(charLog-1)}${ourcode.charAt(charLog)}${ourcode.charAt(charLog+1)}${ourcode.charAt(charLog+2)}${ourcode.charAt(charLog+3)}${ourcode.charAt(charLog+4)}${ourcode.charAt(charLog+5)}`)
                                        charLog += 5
                                    }
                                }
                                console.info(corrucode, ourcode)
                                break
                            }
                        }
                    }
              		else {
                        differences++;
                        console.error("OOPS FOUND A DIFFERENCE!!!!! (lengths dont add up!) PLEASE INSPECT THIS CLOSER: " + horriblefuckingthing[i]);
                     console.log(corrucode.length, ourcode.length);
                        console.info(corrucode, ourcode)
                    }
                })
                .then(() => {
                    setTimeout(()=>fuckingGetThem(i+1), 10)
                })
        })
    return;
}

fuckingGetThem()
