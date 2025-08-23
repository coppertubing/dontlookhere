textthing = [
    "do you remember the rules?",
    "shut up! there is a war to be won!!",

                            `haha he a89 y934 ahiuiu `, 
                            `êád•7877 7 77 `, 
                            `hehea v0-9xjkl;'ehehe hehe`, 
                            `IMˆkPL ay  Game? ??`,

                            `hehehehehehehehehe`, 
                            `the ea ters`, 


                            `get out of the way!`,
                            `where are the rules`, 
                            `win wiin! !winN!!!`,
                            `everything is counting on this!`, 
                            `how many lives will be lost if they succeed??`, 
                            `move once attack once ok left left`,
                            `we will meet them beneath`,
                            `do not let them escape alive!`,
                            `have you heard their plans? sickening!!`,
                            `celki celki celki`,
                                                    `stop bothering me!`,
                        `there is no time for peace!!`,

                        `hold on we must finish this game`,
                        `and leave this unfinished?! no!`,

                            `if i am quick...`, 
                            `what was that? hello?`, 
                            `quiet...`, 
                            `it has to be here`,

                            `that would be nice... but i must finish my investigation`,


                            `just being here is so fun!`, 
                            `much better than maintenance work`, 
                            `board rules? game? why bother?`,
                            `do you know where my friend went?`,
                            `what? no thanks! my friend is here`,

                            `someone is missing`,
                            `where is she`,
                            `can we really make it?`,
                            `are you counting on me?`,
                            `kuulla would know what to do`,
                            `just another strange place... i want to go home`,


                            `ha ha ha!!`,
                            `ha haa!! ha ha ha!!`,
                            `hahaha!! haha!!`,
                            `hello`,
                            `i cannot leave when there are still foes to be crushed!`,

                            `‡Hƒøwh A_A^t was it fºr, then...`,

                                                        `quiet...`,
                            `...`,
                            `do you hear it too?`,
                            `...`,
                            `...`,
                            `...`,
                            `nice here.. .`,
                            `too loud...`,


                                                        `helo helllooo!`, 
                            `we are friends now ok`, 
                            `you are so soso cool!!!`, 
                            `do not worry we will find the rules ahaha`,
                            `hehehe we are having a good time!!` ,
                            `celki celki celki!`,
                            `aaw cool!! convince my friends and i will come!!`,


                             `wrong side? no i am ok`,
                            `turns out it is not so simple`,
                            `i want to play a different game`,
                            `seen any rules? me either`,
                            `how do i get out of here??`,
                            `what are we doing?`,
                            `i need to make some calls`,
                            `is there not a way out?`,
]

function textEscape(text) {
    let textEscaped = ``;
    for(let i = 0; i < text.length; i++) {
        let vorbereitung = '"' + text[i] + '": "",'
        textEscaped = textEscaped.concat(`
            `, vorbereitung)
    }
    return textEscaped
}
console.log(textEscape(textthing))