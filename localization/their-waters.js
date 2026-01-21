/*
    cor-RU - a russian localization mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/their-waters.js
    localization for /local/ocean

    progress: done as of 18.01.2026
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
        'gate::vessel surface': `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА
    ::ТОЧКА НАЗНАЧЕНИЯ::'низкомерное мыслепространство';'внутреннее'
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'частичное нарушение связности'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>
    <span definition="ПРИМЕЧАНИЕ::'ссылается на стороннюю установку контекста'::МАСКА_РАДОСТИ">::ВНУТРЕННИЙ КОНТЕКСТ</span>::<span class="bright-color" definition="АНАЛИЗ::'как правило случайность в случаях с небольшими мыслепространствами';'особенно тех, что содержатся в других'">' скрыта посредством размера и повреждения мембраны'</span>`
    }
}

if(check('hub__funfriend-ep1fed')) cor_ru.embassyCoherent(); // --ep!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1



getLocalizationForPage(true) // --- ensuring that Nothing Gets Fucked Up