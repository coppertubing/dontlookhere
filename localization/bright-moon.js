/*
    cor-RU - a russian localization mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/bright-moon.js
    localization for /local/orbit/moon

    progress: nothin as of 06.10.2025
*/

env.localization.page['moon'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "looks like this must have been during a solar eclipse... i'd go up there to watch too if it was that easy": "",
        "looks like this must have been during a lunar eclipse... i'd go up there to watch too if it was that easy": "",

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
        lunar eclipse<+>lunar
        structure?<+>base
        nevermind<+>CHANGE::++moth
            FAKEEND::(back)
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
        you said solar eclipse
            NOTE::inspired by rosy

    moth
        yeah?
        pretty sure that's what this is a memory of

    self
        the earth is bigger than the moon
        
    moth
        okay, obviously, what about it?

    self
        that makes this a lunar eclipse

    moth
        dude, we're seeing the sun from the moon with the earth in the way
        the sun is eclipsed, it's a solar eclipse
        right? 

    self
        that's what a lunar eclipse is

    moth
        what?
        okay hold on, isn't a lunar eclipse when the...

    sourceless
        ......
    
    moth
        shit i guess i had it backwards
        all right, well, noted

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)
    
base
    self
        what is that thing they have on the moon

    moth
        that's their main contrivance anchor!
        still up there today actually
        interestingly, according to lunar satellite data i've been following,
        it basically gets more direct obesk ship traffic than earth at this point lol
        we don't know too much about the specifics, still, but...
        it lives up to its name - keeps the contrivance pulled along, somehow
        allegedly the contrivance doesn't have any sort of gravitational presence, so it's necessary
        i do know it keeps the thing floating way over the sun's orbital plane 
        out of the way enough to not be a problem, close enough to allow for reasonable travel
        pretty sure there's only been one instance of an asteroid even getting close to it

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)
`)



getLocalizationForPage(true) // --- ensuring that Nothing Gets Fucked Up

// === TRANSLATING DA BEECH === //

cor_ru.processSpecificTranslation(document.querySelectorAll(".loose-thought"), "text")

document.querySelectorAll('#content .loose-thought .title').forEach(e=>{e.remove()})

document.querySelectorAll('#content .loose-thought').forEach(e=>{e.insertAdjacentHTML('beforeend', `<div class="title">${e.getAttribute('text')}</div>`)})

new Lettering('#content .loose-thought .title').letters()

document.querySelectorAll("#content .loose-thought .title > span").forEach((e, i) => e.style.animationDelay = `${-1 * (i * 0.25)}s`)