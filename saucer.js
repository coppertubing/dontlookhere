horriblefuckingthing = [
    '',
    'not_found',
    'hello',
    'hub',
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

    'local/beneath',
        'local/beneath/depths',
        'local/beneath/embassy',
        'local/beneath/parasite',
    'local/cache',
    'local/city',
        'local/city/street',
    'local/depths',
    'local/dullvessel',
    'local/ocean',
    'local/ocean/ship',
        'local/ocean/ship/interview',
        'local/ocean/ship/elsewhere',
    'local/embassy',
        'local/embassy/golem',
        'local/embassy/groundsmindry',
    'local/orbit',
    'local/ozo',
    'local/uncosm',
        'local/uncosm/cavik',
        'local/uncosm/clemens romanus',
        'local/uncosm/corru',
        'local/uncosm/dog',
        'local/uncosm/dull',
        'local/uncosm/effigy',
        'local/uncosm/flower',
        'local/uncosm/humor',
        'local/uncosm/larval',
        'local/uncosm/no',
        'local/uncosm/parasite',
        'local/uncosm/recosm',
        'local/uncosm/sorry',
        'local/uncosm/spire',
        'local/uncosm/surface',
        'local/uncosm/veilk',
        'local/uncosm/where',
        'local/uncosm/yuzku',
        'local/uncosm/zuzucri',
        'local/uncosm/zuzucri-masks',
]

function fuckingGetThem() {
    for (let i = 0; i < horriblefuckingthing.length; i++) {
        corrucode = ``;
        ourcode = ``;

        fetch("https://corru.observer/" + horriblefuckingthing[i])
            .then((response) => response.text())
            .then((text) => corrucode = text)
            .then(() => {
                fetch("https://coppertubing.github.io/cor-RU/sauce code/" + horriblefuckingthing[i])
                    .then((response) => response.text())
                    .then((text) => {
                        ourcode = text;

                        if (corrucode != ourcode) console.warn("OOPS FOUND A DIFFERENCE!!!!! PLEASE INSPECT THIS CLOSER: " + horriblefuckingthing[i])
                    })
            })
    }
    return;
}

fuckingGetThem()