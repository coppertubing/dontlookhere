object = {
}

function getementitied(ending) {
    stringEnt = `        "`
    for(i=0;i<Object.keys(object).length;i++) {
        stringEnt += Object.keys(object)[i] + `": cor_ru.entity_menu["` + Object.keys(object)[i] + `"].` + ending + `,
        "`
    }

    return console.log(stringEnt)
}

getementitied('name')
getementitied('desc')