/*
    cor-RU - a full russian adaptation mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/beneath-car.js
    adaptation for /local/beneath/car
    (--- car guyyyyyyyyyyyy)

    progress: done as of 11.10.2025
*/

env.localization.page['car'] = {dialogues: {},
    definitions: {}, 
    strings: {
        'Þª†#¦¦Çî÷†y': `Ҧʸ†#¦¦Ӻǿҏ÷0д`,
        
        'Þª†#¦¦§†A·r»': `Ҧʸ†#¦¦§†вЕз́·ԭа̄`,
        
        'Þª†#¦¦Ò½º': `Ҧʸ†#¦¦Ò²⁄₇º`,

        'Þª†#¦¦h_¿ë': `Ҧʸ†#¦¦х_¿ë`,
        
        'Þª†#¦¦ìnÑ–R': `Ҧʸ†#¦¦ẞӈӲ–Ри`,
    }, 
    entityDescriptions: {
        'Þª†#¦¦Çî÷†y': `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА
    ::<span definition="ПРИМЕЧАНИЕ::'нестандартный формат';'подразумевает соединительную мыслеформу';'попытка интерпретации'">НЕОБЫЧНАЯ ПОДПИСЬ</span>`,
    
        'Þª†#¦¦§†A·r»': `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА
    ::<span definition="ПРИМЕЧАНИЕ::'нестандартный формат';'подразумевает соединительную мыслеформу';'попытка интерпретации'">НЕОБЫЧНАЯ ПОДПИСЬ</span>`,
    
        'Þª†#¦¦Ò½º': `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА
    ::<span definition="ПРИМЕЧАНИЕ::'нестандартный формат';'подразумевает соединительную мыслеформу';'попытка интерпретации'">НЕОБЫЧНАЯ ПОДПИСЬ</span>`,

        'Þª†#¦¦h_¿ë': `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА
    ::<span definition="ПРИМЕЧАНИЕ::'нестандартный формат';'подразумевает соединительную мыслеформу';'попытка интерпретации'">НЕОБЫЧНАЯ ПОДПИСЬ</span>`,
    
        'Þª†#¦¦ìnÑ–R': `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА
    ::<span definition="ПРИМЕЧАНИЕ::'нестандартный формат';'подразумевает соединительную мыслеформу';'попытка интерпретации'">НЕОБЫЧНАЯ ПОДПИСЬ</span>`,
    }
}

// === DIALOGUES === //

env.localization.page['car'].dialogues[`intro`] = generateDialogueObject(`
start
    sourceless
        ты ощущаешь множество прямых соединений с этим разобщённым мыслепространством.
            EXEC::flash(false)
    
    self
        некоторые из этих мест связные

    moth
        о, да
        ток эти соединения какие-то странноватые
        не то что полноценные соединительные врата
        они скорее как дырки в ткани?
        удивительно что развледруг их не засёк
        может они маленькие хз

    sourceless
        пусть она не проявляет себя визуально,
        ты чувствуешь присутствие увязавшейся за тобой мыслеформы.

    self
        поосторожнее, если куда-нибудь пойдёшь
        может сымитируй то, что от тебя это скрывало

    s w   al kk
        о ог ограани чч ение скорости

    RESPONSES::self
        ок<+>END
`)
/* ORIG DIALOGUE FOR COMPARISON ILL REMOVE THIS LATER
env.dialogues[`intro`] = generateDialogueObject(`
start
    sourceless
        you feel a number of direct connections to and from this disjointed thoughtspace.
            EXEC::flash(false)
    
    self
        some of these are coherent places

    moth
        huh, yeah
        these connections are kinda weird, too
        not like the usual proper connective gates
        more like holes that got torn open?
        surprised funfriend hasn't caught them
        maybe they're tiny idk

    sourceless
        though it isn't presenting visibly,
        you feel that loitering thoughtform's presence.

    self
        be careful if you go to any of these places
        maybe mimic whatever it was hiding this from you

    s w   al kk
        s sp speeed limit

    RESPONSES::self
        ok<+>END
`)

*/


getLocalizationForPage(true) // --- ensuring that Nothing Gets Fucked Up