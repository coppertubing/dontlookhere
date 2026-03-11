/*
    cor-RU - a russian localization mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/bright-moon.js
    localization for /local/orbit/moon

    progress: done as of 18.01.2026
*/

env.localization.page['moon'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "looks like this must have been during a solar eclipse... i'd go up there to watch too if it was that easy": "похоже это было во время солнечного затмения... вот бы и мне можно было так легко посмотреть",
        "looks like this must have been during a lunar eclipse... i'd go up there to watch too if it was that easy": "похоже это было во время лунного затмения... вот бы и мне можно было так легко посмотреть",

        "about this place": "об этом месте",

        "haunted by velzie": cor_ru.entity_menu['haunted by velzie'].name,
        "‡Ä%æ¼Ý": cor_ru.entity_menu['‡Ä%æ¼Ý'].name,
        "our dull anchor": cor_ru.entity_menu['our dull anchor'].name,
        "gate::the dull contrivance": cor_ru.entity_menu['our dull anchor'].name,
    }, 
    entityDescriptions: {
        "haunted by velzie": cor_ru.entity_menu['haunted by velzie'].desc,
        "‡Ä%æ¼Ý": cor_ru.entity_menu['‡Ä%æ¼Ý'].desc,
        "our dull anchor": cor_ru.entity_menu['our dull anchor'].desc,
        "gate::the dull contrivance": cor_ru.entity_menu['our dull anchor'].desc,
    }
}

// === DIALOGUES === //

env.localization.page['moon'].dialogues.mthresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        лунное затмение<+>lunar
        постройка?<+>base
        неважно<+>CHANGE::++moth
            FAKEEND::(назад)
`)
env.localization.page['moon'].dialogues[`mth++moon`] = generateDialogueObject(`
loop
    RESPOBJ::mthresp

start
    self
        вопрос

    moth
        чё как?
    
    RESPOBJ::mthresp

lunar
    self
        ты говоришь что солнечное затмение

    moth
        ага?
        выглядит так будто воспоминание именно об этом

    self
        земля больше луны
        
    moth
        окей, очевидно, и что с того?

    self
        значит это - лунное затмение

    moth
        чел, мы смотрим на солнце с луны с землёй посередине
        солнце затмевается, это солнечное затмение
        нет?

    self
        это и есть лунное затмение

    moth
        чего?
        окей погоди, разве лунное затмение это не когда...

    sourceless
        ......
    
    moth
        бля походу всё таки наоборот
        лады, ну, запомню

    RESPONSES::self
        окей<+>loop
            FAKEEND::(назад)
    
base
    self
        что это за штука у них на луне

    moth
        это их главный якорь открытия!
        до сих пор там, кстати
        любопытно то, что согласно данным лунных спутников,
        в наши дни к нему летает больше обесковых кораблей чем к земле лол
        мы не слишком много знаем о конкретных деталях, но...
        он соответствует своему названию - тянет открытие за собой, каким-то образом
        как утверждается, у открытия нет никакого гравитационного присутствия, поэтому он необходим
        точно знаю что он держит открытие над орбитальной плоскостью солнца
        достаточно в сторонке чтобы не было проблем, достаточно близко чтобы можно было удобно путешествовать
        вроде как был всего один случай когда какой-то астероид даже приблизился к нему

    RESPONSES::self
        окей<+>loop
            FAKEEND::(назад)
`)



getLocalizationForPage(true) // --- ensuring that Nothing Gets Fucked Up

// === TRANSLATING DA BEECH === //

cor_ru.processSpecificTranslation(document.querySelectorAll(".loose-thought"), "text")

document.querySelectorAll('#content .loose-thought .title').forEach(e=>{e.remove()})

document.querySelectorAll('#content .loose-thought').forEach(e=>{e.insertAdjacentHTML('beforeend', `<div class="title">${e.getAttribute('text')}</div>`)})

new Lettering('#content .loose-thought .title').letters()

document.querySelectorAll("#content .loose-thought .title > span").forEach((e, i) => e.style.animationDelay = `${-1 * (i * 0.25)}s`)