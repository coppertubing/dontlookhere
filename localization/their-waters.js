/*
    cor-RU - a full russian adaptation mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/their-waters.js
    adaptation for /local/ocean

    progress: vessel surface missing as of 12.10.2025
*/


env.localization.page['localocean'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "you can really tell this was a long time ago, jesus. look at how small their island is": "бож, и впрямь видно что это было очень давно. гляди какой у них мелкий остров",

        "stilted shore": cor_ru.entity_menu["stilted shore"].name,

        "dive": "нырнуть",
        "rise": "вынырнуть",
    }, 
    entityDescriptions: {
        'our dull vessel': cor_ru.entity_menu["our dull vessel"].desc,
        'their vessel': cor_ru.entity_menu["their vessel"].desc,
        "the embassy": cor_ru.entity_menu["the embassy"].desc,
        'gate::the depths': cor_ru.entity_menu["gate::the depths"].desc,
        'stilted shore': cor_ru.entity_menu["stilted shore"].desc,
        'gate::vessel surface': `::CONNECTOR THOUGHTFORM
    ::DESTINATION::'low dimensional thoughtspace';'internal'
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'partial cohesion failure'">::INCOHERENCE DETECTED</span>
    <span definition="NOTE::'referencing third-party context installation'::JOY_MASK">::INTERNAL CONTEXT</span>::<span class="bright-color" definition="ANALYSIS::'commonly accidental with minor thoughtspaces';'especially those contained within others'">'hidden via size and membrane damage'</span>`
    }
}

if(check('hub__funfriend-ep1fed')) cor_ru.embassyCoherent(); // --ep!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1



getLocalizationForPage(true) // --- ensuring that Nothing Gets Fucked Up