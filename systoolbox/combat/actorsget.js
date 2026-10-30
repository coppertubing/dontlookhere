function actorget() {
    let string = ``

    for (const actor in env.COMBAT_ACTORS) {
        const actorobj = env.COMBAT_ACTORS[actor]

        let actorstring = `


/* - ${actor} - */

env.COMBAT_ACTORS.${actor}.name = \`${actorobj.name}\`;`

        if ("reactions" in actorobj && Object.keys(actorobj.reactions).length != 0) {
            actorstring += `
`
            for ([key, value] of Object.entries(actorobj.reactions)) {
                actorstring += `
env.COMBAT_ACTORS.${actor}.reactions.${key} = `
                if (typeof value === 'function') actorstring += value + ';';
                else {
                    actorstring += `[`
                    for (reaction of value) if (typeof reaction === 'function') actorstring += ", " + reaction; else actorstring += `, '${reaction}'`
                    actorstring += `];`
                }
            }
        }

        string += actorstring + `

env.COMBAT_ACTORS.${actor}.cor_ru = {
    name: {
        gen: "",
        dat: "", 
        acc: "", 
        ins: "", 
        pre: ""
    },
    gender: 0
}`
    }

    return string
}

actorget()