function itemget () {
    let string = ``

    for (const item in env.ITEM_LIST) {
        const itemobj = env.ITEM_LIST[item]

        let itemstring = `


/* - ${item} - */

env.ITEM_LIST.${item}.name = \`${itemobj.name}\`;`

        if ("description" in itemobj) itemstring += `
env.ITEM_LIST.${item}.description = \`${itemobj.description}\`;`

        if ("oocnote" in itemobj) itemstring += `
env.ITEM_LIST.${item}.oocnote = \`${itemobj.oocnote}\`;`
        

        string += itemstring
    }

    return string
}

itemget()