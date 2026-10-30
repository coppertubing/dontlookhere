function effectget () {
    let string = ``

    for (const effect in env.STATUS_EFFECTS) {
        const effectobj = env.STATUS_EFFECTS[effect]

        let effectstring = `


/* - ${effect} - */

env.STATUS_EFFECTS.${effect}.name = \`${effectobj.name}\`;`

        if ("help" in effectobj) {
            effectstring += `
env.STATUS_EFFECTS.${effect}.help = `
            if (typeof effectobj.help === 'function') effectstring += effectobj.help + ';'; else effectstring += `\`${effectobj.help}\`;`}

        if ("strings" in effectobj) {
            effectstring += `
`
            for (const [key, value] of Object.entries(effectobj.strings)) {
                effectstring += `
env.STATUS_EFFECTS.${effect}.strings.${key} = `
                if (typeof value === 'function') effectstring += value + ';'; else effectstring += `\`${value}\`;`
            }
        }


        string += effectstring
    }

    return string
}

effectget()