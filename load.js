getLocalizationForPage(true);
if (document.getElementsByClassName("cor-rudev").length == 0) document.querySelector(".devs").insertAdjacentHTML('afterend', cor_ru.devElement)
cor_ru.processStatic(true);
cor_ru.processMenu(true);
processTranslation();
processTranslation(document.querySelector(`#mindspike-scanner`));
cor_ru.processWeirdTranslation(".mindsci-status");
cor_ru.observerCommonObserve();
cor_ru.observerEntMenuObserve();
cor_ru.observerGadObserve();
cor_ru.observerDialogueObserve();
cor_ru.observerMasksObserve();
cor_ru.stepKeyImplement();
cor_ru.stepKeyClean();
cor_ru.observerPageObserve();
        
// setTimeout(()=>chatter({actor: 'corruru', text: `cor-RU успешно инициализирован! @dutokrisa и @bra1nslug_ благодарят вас за использование`, readout: true}), 500)
// setTimeout(()=>chatter({actor: 'corruru', text: `нашли баг, ошибку в тексте, странную фичу или у вас просто есть предложение? напишите нам!`, readout: true}), 3000)
        
document.addEventListener('corru_resources_added', ()=>{cor_ru.updateResources()})