getLocalizationForPage(true);
if (document.getElementsByClassName("cor-rudev").length == 0) document.querySelector(".devs").insertAdjacentHTML('afterend', cor_ru.devElement)
cor_ru.observerPageObserve();
cor_ru.processStatic(true);
cor_ru.processMenu(true);
processTranslation();
processTranslation(document.querySelector(`#mindspike-scanner`));
cor_ru.processWeirdTranslation(".mindsci-status");
cor_ru.stepKeyClean();
    
    console.log("%cyay! should work... - @cor-RU", 'color:rgb(229, 142, 22)')
    console.log("%ccontact @dutokrisa, @shatteredstars or @bra1nslug_ if you have any questions, suggestions or bugs to report... - @cor-RU", 'color:rgb(229, 142, 22)')
    
        
setTimeout(()=>chatter({actor: 'corruru', text: `cor-RU успешно инициализирован! @dutokrisa, @shatteredstars и @bra1nslug_ благодарят вас за использование`, readout: true}), 500)
setTimeout(()=>chatter({actor: 'corruru', text: `нашли баг, ошибку в тексте, странную фичу или у вас просто есть предложение? напишите нам!`, readout: true}), 3000)
        
