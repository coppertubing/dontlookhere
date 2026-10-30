function actionget () {
    let string = ``

    for (const action in env.ACTIONS) {
        const actionobj = env.ACTIONS[action]

        let actionstring = `


/* - ${action} - */

env.ACTIONS.${action}.name = \`${actionobj.name}\`;`

        if ("desc" in actionobj) actionstring += `
env.ACTIONS.${action}.desc = \`${actionobj.desc}\`;`
        if ("verb" in actionobj) actionstring += `
env.ACTIONS.${action}.verb = \`${actionobj.verb}\`;`


        if ("usage" in actionobj) {
            actionstring += `
`
            for (const [key, value] of Object.entries(actionobj.usage)) {
                actionstring += `
env.ACTIONS.${action}.usage.${key} = `
                if (typeof value === 'function') actionstring += value + ';'; else actionstring += `\`${value}\`;`
            }
        }

        if ("details" in actionobj) {
            actionstring += `
`
            for (const [key, value] of Object.entries(actionobj.details)) {
                actionstring += `
env.ACTIONS.${action}.details.${key} = `
                if (typeof value === 'function') actionstring += value + ';'; else actionstring += `\`${value}\`;`
            }
        }
        

        string += actionstring
    }

    return string
}

actionget()