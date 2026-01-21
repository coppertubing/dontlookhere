/*
    cor-RU - a russian localization mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/uncosm.js
    localization for /local/uncosm

    progress: fully finished as of 23.08.2025
*/


env.localization.page['localuncosm'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "the readout here is like... complete nonsense. is there even anything you can interact with? does it hurt?": "отсюда считывается просто... полный бред. ты хоть с чем-то можешь взаимодействовать? не больно?",

        "no no no no": "нет нет нет нет",
        "memory hole": "брешь памяти",
        "home": "дом"
    },

    entityDescriptions: {
        'no no no no': `::ВЫСКАЗЫВАЮЩАЯ МЫСЛЕФОРМА
::СОДЕРЖАНИЕ::'
<span>ОСТАНОВИСЬ ОСТАНОВИСЬ ОСТАНОВИСЬ</span>
<span>я знаю Я ЗНАЮ Я ЗНАЮ Я ЗНАЮ</span>
<span>ОСТАНОВИСЬ ОСТАНОВИСЬ Я ЗНАЮ ОСТАНОВИСЬ</span>
<span>ПРЕКРАТИ ПРЕКРАТИ</span>'`,
        'memory hole': `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА
::ТОЧКА НАЗНАЧЕНИЯ::'недействительно';..ОШИБКА::Й̵Óэ̇=ОШИБКА::;;::-¼¯-ꙗН£«â
ОШИБКА::ªъõ„'(‚ôЦ̌д7÷ Ц̌e`,
        "home": `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА
::ТОЧКА НАЗНАЧЕНИЯ::'низкомерное мыслепространство';'внутреннее'
<span style="color: var(--obesk-color)" definition="АНАЛИЗ::'полный провал абстракции';'всё ещё визуализируема'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`,
    }
}

// === DIALOGUES === //


// == ROTWATCHER == //

env.localization.page['localuncosm'].dialogues["++rotuncosm"] = generateDialogueObject(`
start
    self
        what do you think about the uncosm?
            EXEC::changeBgm(env.rotWatcherMusic)

    sourceless noprocess
        the rotwatcher's attention is only briefly upon you, just long enough to transmit some meaning.

    rotwatcher
        dissociative pool overflow: a state in which the natural thought allocation mechanism of the grand stage is overwhelmed by free-floating resources and insensate thoughtforms, including thoughtspaces.
        the dissociative pool's normal function has never been directly observed by the present rotwatcher, however extended viewing of its receding motion in post-stasis suggests that a balance of thoughtforms both within and without is necessary for the health of the grand stage.
        an abundance within the pool is observed to result in its swelling and overtaking of entities not intended for dissociation.
        additional effect suspected to lead to catastrophic collapse to the grand stage includes extensive presence of non-dissociated thoughtforms within the pool, henceforth referred to as 'rogue thoughtforms.'
        extended lack of maintenance by an active custodian or other external force results in the adaptation of rogue thoughtforms to evade or cripple the pool's passive and active mechanisms of control.
        continued overflow results in a cascade of further resources being overtaken by the swollen dissociative pool, subsequently consumed, damaged, or otherwise manipulated by rogue thoughtforms within.
        the current rotwatcher is observed to have been a subject of this damage and adaptation, though the mechanism by which it began and developed predates its active awareness.

    self
        think it'll get better with funfriend around?

    sourceless
        its attention is upon you again.
        some part of it twists beneath the render as it thinks.

    rotwatcher
        the custodian is observed to have reconstructed several core components of the dissociative pool.
        the pool's overflow status has been observed to recede as a result of their continued operation.
        however: the presence of innumerable rogue thoughtforms with θeyes of constant self adaptation and evolution to subsist within and upon the dissociative pool is likely to result in an ever-present emergent ecosystem.
        it has been observed that rogue thoughtforms within the pool rarely exit boundaries due to either specific adaptation or conscious avoidance of new enforcement mechanisms beyond.
        improvement in the grand stage's health is noted across all known metrics, however no confident conclusions may be made regarding the end-state of the dissociative pool at this time.

    RESPONSES::self
        tell me about something else?<+>CHANGE::++rotmove
            HIDEREAD::
        i see<+>END
        
END::revertBgm()
`)


getLocalizationForPage(true) // --- ensuring that Nothing Gets Fucked Up

// === TRANSLATING DA BEECH === //

cor_ru.processSpecificTranslation(document.querySelectorAll(".loose-thought"), "text")

document.querySelectorAll('#content .loose-thought .title').forEach(e=>{e.remove()})

document.querySelectorAll('#content .loose-thought').forEach(e=>{e.insertAdjacentHTML('beforeend', `<div class="title">${e.getAttribute('text')}</div>`)})

new Lettering('#content .loose-thought .title').letters()

document.querySelectorAll("#content .loose-thought .title > span").forEach((e, i) => e.style.animationDelay = `${-1 * (i * 0.25)}s`)