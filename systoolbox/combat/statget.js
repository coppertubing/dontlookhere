function statget () {
    let string = ``

    for (const stat in env.STATDATA) {
        const statobj = env.STATDATA[stat]

        let statstring = `


/* - ${stat} - */

env.STATDATA.${stat}.display = \`${statobj.display}\`;
env.STATDATA.${stat}.description = \`${statobj.description}\`;`


        string += statstring
    }

    return string
}

statget()