env.localization.page['abyss'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "still not getting anything detailed here": "",
        "about whatever this is": "о том, чем бы это ни было"
    }, 
    entityDescriptions: {},
}


env.abyss.snap = (thing)=>{
    cutscene(true)
    play('click1')
    flash(true)

    let dl = ""
    let flag = ""
    switch(thing) {
        case "abyss":
            dl = 'https://coppertubing.github.io/cor-RU/img/local/beneath/bg/бездна.png'
            flag = "beneath_abysspic"
        break

        case "effigy":
            if(!check("effigy_sipper")) dl = 'https://coppertubing.github.io/cor-RU/img/local/beneath/bg/ЭФФИГИЯ.png';
            else dl = 'https://coppertubing.github.io/cor-RU/img/local/beneath/bg/всёчисто.png'
            flag = "beneath_effigypic"
        break

        case "nope":
            dl = 'https://coppertubing.github.io/cor-RU/img/local/beneath/bg/нетспасибо.png'
            flag = "beneath_nopic"
        break
 
        default:
            return
    }
}