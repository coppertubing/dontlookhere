chatterthing = `chatter({actor: 'moth', text: 'is that framing device code?', readout: true, delay: 3000})
            chatter({actor: 'moth', text: "shit... it's probably got a memory leak", readout: true, delay: 6000})

                chatter({actor: 'moth', text: "well, not really that surprised i guess. anything goes now that the firmament has a hole", readout: true, delay: 12000})

                chatter({actor: 'moth', text: "i hope that bstrd thing hasn't gotten out", readout: true, delay: 12000})`

function chatterEscape(chatter) {
    let chatterEscaped = chatter.replaceAll("setTimeout(()=>{ chatter({actor: '", "/*")
    chatterEscaped = chatter.replaceAll("setTimeout(()=>{chatter({actor: '", "/*")
    chatterEscaped = chatter.replaceAll("setTimeout(()=>chatter({actor: '", "/*")
    chatterEscaped = chatterEscaped.replaceAll("chatter({actor: '", "/*")
    chatterEscaped = chatterEscaped.replaceAll('chatter({actor: "', "/*")
        chatterEscaped = chatterEscaped.replaceAll("chatter({ actor: '", "/*")
    chatterEscaped = chatterEscaped.replaceAll('chatter({ actor: "', "/*")

    chatterEscaped = chatterEscaped.replaceAll("', text: `", "*/ \"")
    chatterEscaped = chatterEscaped.replaceAll("', text: '", "*/ \"")
    chatterEscaped = chatterEscaped.replaceAll("', text: \"", "*/ \"")
    chatterEscaped = chatterEscaped.replaceAll('", text: \"', "*/ \"")
    chatterEscaped = chatterEscaped.replaceAll('", text:\"', "*/ \"")
    chatterEscaped = chatterEscaped.replaceAll('", text: \'', "*/ \"")

    chatterEscaped = chatterEscaped.replaceAll(/[0-9]/g, "")

    chatterEscaped = chatterEscaped.replaceAll("`}), )", '": "",')
    chatterEscaped = chatterEscaped.replaceAll("'}), )", '": "",')

    chatterEscaped = chatterEscaped.replaceAll("`})", '": "",')
    chatterEscaped = chatterEscaped.replaceAll("'})", '": "",')

    chatterEscaped = chatterEscaped.replaceAll("', readout: true}) }, )", '": "",')
    chatterEscaped = chatterEscaped.replaceAll("\", readout: true}) }, )", '": "",')

    chatterEscaped = chatterEscaped.replaceAll("\", readout: true, delay: })", '": "",')
    chatterEscaped = chatterEscaped.replaceAll("', readout: true, delay: })", '": "",')
    chatterEscaped = chatterEscaped.replaceAll("`, readout: true, delay: })", '": "",')

    chatterEscaped = chatterEscaped.replaceAll("', readout: true})", '": "",')
    chatterEscaped = chatterEscaped.replaceAll("\", readout: true})", '": "",')

    chatterEscaped = chatterEscaped.replaceAll("})", ': "",')



    chatterEscaped = chatterEscaped.replaceAll("await wait()", '')
    chatterEscaped = chatterEscaped.replaceAll(", )", '')
    chatterEscaped = chatterEscaped.replaceAll("env.", '')

    return chatterEscaped
}

console.log (chatterEscape(chatterthing))