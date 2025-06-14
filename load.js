cor_ru.observer.page.func()
cor_ru.processReadout()
cor_ru.observer.page.observe()

document.addEventListener('corru_resources_added', ()=>{cor_ru.updateResources()})

// setTimeout(()=>chatter({actor: 'corruru', text: `cor-RU успешно инициализирован! @dutokrisa и @bra1nslug_ благодарят вас за использование`, readout: true}), 500)
// setTimeout(()=>chatter({actor: 'corruru', text: `нашли баг, ошибку в тексте, странную фичу или у вас просто есть предложение? напишите нам!`, readout: true}), 3000)