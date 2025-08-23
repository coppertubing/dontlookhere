/*
    cor-RU - a full russian adaptation mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/their-waters.js
    adaptation for /local/ocean

    progress: as of 23.08.2025
*/


env.localization.page['localocean'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "you can really tell this was a long time ago, jesus. look at how small their island is": "бож, и впрямь видно что это было очень давно. гляди какой мелкий у них остров",

        "stilted shore": cor_ru.entity_menu["stilted shore"].name,

        "dive": "нырнуть",
        "rise": "вынырнуть",
    }, 
    entityDescriptions: {
        "the embassy": cor_ru.entity_menu["the embassy"].desc,
        'gate::the depths': cor_ru.entity_menu["gate::the depths"].desc,
        'stilted shore': cor_ru.entity_menu["stilted shore"].desc,
    }
}

if(check('hub__funfriend-ep1fed')) cor_ru.embassyCoherent(); // --ep!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1