env.localization.page['hello'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "seems like overkill for an empty space if you ask me": "как по мне - явный перебор для такого пустого пространства",
        "wow, this place is just infested... it's so incoherent i'm not even picking up any entities": "ого, да это место просто infested... настолько бессвязно что я даже не улавливаю никаких сущностей", // --- помогите

        "FOR YOU": "ДЛЯ ТЕБЯ",
        "sentry": "КАРАУЛ",
        "'thoughtform activity detected'::'advise re-examination'": "'обнаружена мыслеформенная деятельность'::'рекомендуется повторное сканирование'",
    },
    entityDescriptions: {
        "???": `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА
    ::НЕРАЗБЕРИМАЯ ПОДПИСЬ
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'фрагментированная сущность'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`,
        "sentry": `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ:'авторизация'
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'низкая связность'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`,
        "gate::for you": `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА
    ::ПУНКТ НАЗНАЧЕНИЯ::'неизвестное внутреннее мыслепространство'
    ::^&&Q@W61626f75742074696d65`
    }
}

// - DIALOGUES - //

env.localization.page["hello"].dialogues["enter"] = generateDialogueObject(`
start
    moth
        боже
        ты в порядке? сейчас была какая-то просто безумная активность
        мне такое раньше не встречалось... кажется, к ней обычно не должны подключаться 

    sys
        ВНИМАНИЕ::'визуализируемый вывод'

    RESPONSES::sys
        визуализировать<+>render

render
    sys
        ВЫПОЛНЯЕТСЯ::'визуализация'
            EXEC::content.style.opacity = 1;env.hello.beginBgm()
            WAIT::4500

    moth
        да, не похоже будто тут есть фронт-энд. может быть это какой-то компонент
        просто бросим дело если ничего не найдёшь
        короче я сейчас вернусь, они заказывают еду в соседней комнате

    RESPONSES::self
        осмотреться<+>END
END::MUI('deprohibit')
`)

env.localization.page["hello"].dialogues.generalsentryResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        назначение?<+>purpose
            SHOWONCE::
        кто верифицирован?<+>whoisverified
            SHOWONCE::
        назначение этой цисты?<+>corrupurpose
            SHOWONCE::
            SHOWIF::[["hello__sentry-purpose"]]
        может если ты пропустишь меня<+>letthrough
            SHOWIF::[["hello_sentry_idiot"]]
`)
env.localization.page["hello"].dialogues["sentry"] = generateDialogueObject(`
start
    self
        ПРИВЕТ

    sentry
        ПРИВЕТ ДРУГ
        НЕ НАЙДЕНА ПОДПИСЬ
        ПОЖАЛУЙСТА ИДЕНТИФИЦИРУЙТЕСЬ
        ДОПОЛНИТЕЛЬНО: НИЗКИЕ ЗАПАСЫ ТОПЛИВА. РЕКОМЕНДУЕТСЯ КОРМЛЕНИЕ

    RESPONSES::self
        я -...<+>iam

iam
    self
        Я ЗДЕСЬ ЧТОБЫ ПОМОЧЬ

    sentry
        ТЫ ЧТО?
            EXEC::document.querySelector('.maineye .eye').classList.add('wide')
        ПОДОЖДИ-КА
        ГДЕ МЫ
        МЫ ТАК ГОЛОДНЫ
            EXEC::document.querySelector('.maineye .eye').classList.remove('wide')

    RESPOBJ::generalsentryResponses

purpose
    self
        КАКОЕ У ТЕБЯ НАЗНАЧЕНИЕ?

    sentry
        АХАХАХАХА ЭТО ТАК СТРАННО
        МЫ НЕ ДОЛЖНЫ ГОВОРИТЬ МЫ НЕ ЗНАЕМ ЧТО ПРОИСХОДИТ
        ТАК ИЛИ ИНАЧЕ
        АВТОРИЗАЦИЯ
        ЭТО ВСЁ

    RESPOBJ::generalsentryResponses


whoisverified
    self
        КТО ВЕРИФИЦИРОВАН?

    sentry
        МЫ ЖЕ СКАЗАЛИ ЧТО ТЕБЕ НУЖНО АВТОРИЗОВАТЬСЯ ИДИОТ
            EXEC::document.querySelector('.maineye .eye').classList.add('squint')
            SHOWIF::[["hello__sentry-corrupurpose"]]
        ИЗВИНИ ЭТО БЫЛО ГРУБО. У ТЕБЯ ЕСТЬ ТОПЛИВО
            SHOWIF::[["hello__sentry-corrupurpose"]]
            EXEC::change('hello_sentry_idiot', true);document.querySelector('.maineye .eye').classList.remove('squint')

        ЕСТЬ ТОЛЬКО НЕСКОЛЬКО ПОДПИСЕЙ КОТОРЫМ РАЗРЕШЕНО ПОДКЛЮЧАТЬСЯ К ЭТОЙ ЦИСТЕ
            SHOWIF::[["hello__sentry-corrupurpose", false]]
        ТЫ НАВЕРНЯКА ЗНАЕШЬ ИХ ВЛАДЕЛЬЦЕВ? КАК ЕЩЁ ТЕБЕ УДАЛОСЬ ПОДКЛЮЧИТЬСЯ
            SHOWIF::[["hello__sentry-corrupurpose", false]]
        ИЗВИНИ МЫ ЗАБЫЛИ ЧТО ТЕБЕ ВООБЩЕ-ТО НУЖНО АВТОРИЗОВАТЬСЯ АХАХАХАХА
            SHOWIF::[["hello__sentry-corrupurpose", false]]
        ДАА ТЫ НЕ ИМЕЕШЬ ПРАВА ЗНАТЬ ПРЕДЫДУЩУЮ ИНФОРМАЦИЮ
            SHOWIF::[["hello__sentry-corrupurpose", false]]
        ПОЖАЛУЙСТА ЗАБУДЬ ЕЁ НЕМЕДЛЕННО
            SHOWIF::[["hello__sentry-corrupurpose", false]]

    RESPOBJ::generalsentryResponses

corrupurpose
    self
        В ЧЁМ НАЗНАЧЕНИЕ ЭТОЙ КОРРУЦИСТЫ?

    sentry
        МЫ ЖЕ СКАЗАЛИ ЧТО ТЕБЕ НУЖНО АВТОРИЗОВАТЬСЯ ИДИОТ
            EXEC::document.querySelector('.maineye .eye').classList.add('squint')
            SHOWIF::[["hello__sentry-whoisverified"]]
        ИЗВИНИ ЭТО БЫЛО ГРУБО. У ТЕБЯ ЕСТЬ ТОПЛИВО
            EXEC::change('hello_sentry_idiot', true);document.querySelector('.maineye .eye').classList.remove('squint')
            SHOWIF::[["hello__sentry-whoisverified"]]
        
        ЭТО СЕТЕВОЙ СОЕДИНИТЕЛЬ
            SHOWIF::[["hello__sentry-whoisverified", false]]
        С ДОПОЛНИТЕЛЬНЫМИ НЕСТАНДАРТНЫМИ ФУНКЦИЯМИ ПО ЗАПРОСУ
            SHOWIF::[["hello__sentry-whoisverified", false]]
        ИЗВИНИ МЫ ЗАБЫЛИ ЧТО ТЕБЕ ВООБЩЕ-ТО НУЖНО АВТОРИЗОВАТЬСЯ АХАХАХАХА
            SHOWIF::[["hello__sentry-whoisverified", false]]
        ДАА ТЫ НЕ ИМЕЕШЬ ПРАВА ЗНАТЬ ПРЕДЫДУЩУЮ ИНФОРМАЦИЮ
            SHOWIF::[["hello__sentry-whoisverified", false]]
        ПОЖАЛУЙСТА ЗАБУДЬ ЕЁ НЕМЕДЛЕННО
            SHOWIF::[["hello__sentry-whoisverified", false]]

    RESPOBJ::generalsentryResponses

letthrough
    self
        МОЖЕТ ЕСЛИ ТЫ ПРОПУСТИШЬ МЕНЯ

    sentry
        ЧТО?!
            EXEC::document.querySelector('.maineye .eye').classList.add('squint')
        НАМ КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО ПРОПУСТИТЬ ТЕБЯ БЕЗ НАДЛЕЖАЩЕЙ ПОДПИСИ
        ДАЖЕ ЕСЛИ ХОЧЕТСЯ
        ЭТА ЦИСТА ПО СВОЕЙ ПРИРОДЕ НЕСПОСОБНА ОТВЕЧАТЬ НА
            EXEC::env.hello.velzie();document.querySelector('.maineye .eye').classList.remove('squint');changeBgm(env.hello.velamb, {length: 4000})
            WAIT::3500
    
    sourceless
        ..................
    
    sentry
        ЭТО ЧТО

    unknown
        можно ли им войти
            EXEC::env.hello.velzie()
    
    RESPONSES::self
        привет?<+>posthello
            SHOWONCE::
            EXEC::env.hello.velzie()

posthello
    self
        ПРИВЕТ?
    
    sourceless
        ..................
            EXEC::env.hello.velzie();env.hello.velamb.fade(1, 0, 6000);corruStatic.play();corruStatic.fade(0, env.corruStaticBaseVol, 6000)
        ..................
    
    moth
        сорян, они так и не решили откуда заказывать, так что...
            EXEC::env.hello.velzie()
        ты всё ещё там? подожди, там серьёзно что-то есть?
    
    RESPONSES::self

        похоже на то<+>END
END:: cutscene(false); MUI("deprohibit"); content.classList.remove('looking', 'atyou');
`)
