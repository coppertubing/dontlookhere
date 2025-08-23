thing = {

    receive_rez: ["ah, it works again!"],
    regen: ["much better"],
    evade: ["stop that!", "deflected!"],
    crit: ["ahaha...", "incredible!"],
    crit_buff: ["i hope that helps!"],
    miss: ["÷°ò!!"],
    destabilized: ["..."],
    dead: ["no! get up, get up!", "the body is not responding!!"],
    receive_crit: ["how--?!"],
    receive_puncture: ["the chassis!!"],
    receive_buff: ["excellent"],
    receive_destabilized: ["something is so wrong..."],
    puncture: ["losing cohesion fast!"],
    stun: ["it will not respond!!"],
    receive_carapace: ["more armor! yes!"],
    receive_repairs: ["thank you, thank you"],
    receive_fear: ["what did this to you?!", "i feel sick..."],
    receive_redirection: ["what?", "unnecessary, but thanks"],
}

function textEscape(text) {
let textEscaped = ``;
for(let i = 0; i < text.length; i++) {
let vorbereitung = '"' + text[i] + '": "",'
textEscaped = textEscaped.concat(`
    `, vorbereitung)
}
return textEscaped
}

function crittaescape(crittawhat) {
let escaped = "";
for (let i = 0; i < Object.keys(crittawhat).length; i++) {
escaped += textEscape(Object.values(crittawhat)[i])
}
return escaped
}

console.log(crittaescape(thing))