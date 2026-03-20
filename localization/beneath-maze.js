/*
    cor-RU - a russian localization mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/beneath-maze.js
    localization for /local/beneath/depths

    progress: done as of 11.03.2026
*/


env.localization.page['beneathdepths'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "don't look at me - keep going": "не смотри на меня - давай дальше",
        "looks like whatever this was is totally gone now": "походу чем бы это ни было - ему каюк",

        "unknown": 'НЕИЗВЕСТНО',

        /*sys*/ "ATTENTION::'extreme thoughtform activity';'advise end render'": "УВЕДОМЛЕНИЕ::'предельная мыслеформенная активность';'рекомендуется закончить визуализацию'", // "" не уверен насколько правильно... дуто проверь

        /*unknown*/ 'no no no': "нет нет нет",

        /*moth*/ "what the fuck? everything is locking up": "чё за херь? всё запирается",

        /*unknown*/ 'interloper you cannot be here': "лазутчик вам не положено находиться здесь",
        /*unknown*/ 'you must stay away': "вы должны держаться в стороне",
        /*unknown*/ 'for both our sakes': "ради нас обоих",

        /*moth*/ "buddy? do i need to pull a plug?": "дружище? мне вытащить вилку?",

        /*unknown*/ 'continue repairs and answers will come': "продолжайте починки и ответы явят себя",

        /*sys*/ "ERROR::'severe data overload';'throttling'": "ОШИБКА::'значительная перегрузка данных';'регулирование'",

        /*moth*/ "fuck fuck fuck fuck fuck": "блять блять блять блять блять",

        /*sys*/ "ERROR::'severe data overload';'retracing';'closest position'": "ОШИБКА::'значительная перегрузка данных';'возвращение';'ближайшая позиция'",

        
        // --- unity the shit out of velzie!!!
        'they are awake ...  happy ...': 'они пробудились ... счастливы ...', // "" опять вопрос а как мы переводим все эти awake или я вообще путаю. в общем весь лабиринт довольно дурацкий кусочек
        'i am glad': 'это радует',
        'but who ..?': "но кто ..?"
    }, 
    entityDescriptions: {
        'unknown': `::НЕОБРАБАТЫВАЕМАЯ МЫСЛЕФОРМА
::<span definition="ПРИМЕЧАНИЕ::'нестандартный формат';'предполагает пространственную мыслеформу'">НЕОБЫЧНАЯ ПОДПИСЬ</span>`,
    },
}



getLocalizationForPage(true) // --- ensuring that Nothing Gets Fucked Up