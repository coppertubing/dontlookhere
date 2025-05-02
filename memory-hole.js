env.localization.page['localuncosmwhere']: {dialogues: {},
    definitions: {}, 
    strings: {}, 
    entityDescriptions: {},
}

env.uncode = {
    input: content.querySelector('#code'),
    enter: ()=>{
        let value = env.uncode.input.value.toLowerCase().replaceAll(".", "").replaceAll("/", "")
        
        if(value.length) {
            env.uncode.input.blur()
            cutscene(true)
            play('destabilize', 0.5)
            ratween(env.bgm, 0.1)
            content.classList.add('memorydive')

            if(!check("hub__funfriend-ah1") && value == "recosm") {
                //fuck you lol
                location.href = `/img/sprites/obesk/larval/larval7.gif`
            }

            if (value == "кавик") value = "cavik"
            else if (value == "климент римский") value = "clemens romanus"
            else if (value == "корру") value = "corru"
            else if (value == "собака") value = "dog"
            else if (value == "серое") value = "dull"
            else if (value == "эффигия") value = "effigy"
            else if (value == "цветок") value = "flower"
            else if (value == "юмор") value = "humor"
            else if (value == "личиночный" || "личиночному") value = "larval"
            else if (value == "паразит") value = "parasite"
            else if (value == "простите" || "прости") value = "sorry"
            else if (value == "шпиль") value = "spire"
            else if (value == "поверхность") value = "surface"
            else if (value == "вейльк" || "вейльки") value = "veilk"
            else if (value == "юзку") value = "yuzku"
            else if (value == "зузукри") value = "zuzucri"
            else if (value == "зузукри-маски") value = "zuzucri-masks"

            fetch(`/local/uncosm/${value}/`).then(resp=>{
                if(resp.status == 404){
                    cutscene(false)
                    startDialogue('wrong')
                } else {
                    setTimeout(()=>{
                        cutscene(false)
                        moveTo(`/local/uncosm/${value}/`)
                    }, 4000)
                }
            })
        }
    }
}

env.localization.page['sec']: {dialogues: {},
    definitions: {}, 
    strings: {}, 
    entityDescriptions: {},
}



console.log("   %cmemory-hole.js successful - @cor-RU", 'color:rgb(229, 198, 22)')