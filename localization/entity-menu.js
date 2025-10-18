/*
    cor-RU - a full russian adaptation mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/entity-menu.js
    all* the fun stuff like entity names and descriptions is kept here!
    this is both for the entity menu and for easy storage of everything*

    * - take note that this list still does NOT have every single entity in the game!!
        those that dont appear in the ent menu are stored in localization files corresponding to the page they exist on in-game
        and some entities are banished to everystuff.js for the crime of Being In Multiple Places Sometimes
        list of those that appear both here and in everystuff.js:
            effigy
            fairy
            ×è.÷ùÏÏøø (camerawalker)
            s w   al kk (carguy)
        so take care when applying large-scale changes to entity descs!

    progress: always stuff to finish as of 23.08.2025
*/


getLocalizationForPage(true); // --- we call it so often because we really REALLY need to make sure that all the definitions are READY for this part. if we dont do this sometimes it just crumbles for no reason. shrug

cor_ru.entity_menu = {
    // --- rrly proud of this shit i feel so smart
    // do it not like you would in env.localization
    /*
    "original entity name": {
        name: `localized name`,
        desc: `localized exm description`
    },
    you can reference it in other parts of the code later so that all stays consistent
    do not forget about <br>'s!!!!!!!!!!!!!!!!!!!!!! place <br>'s !!!!!!!!!!!!!!!!!!!!*/


    // === localhost
    "funfriend": {
        name: `развледруг`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'управление системой';'ассистент'`
    },

    // === cache
    "the storm": {
        name: `шторм`,
        desc: `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'уникальная обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'искра, скрестившая наши несчастья воедино';'моя самая большая ошибка'</span>`
    },
    "polygonation spire": {
        name: `шпиль полигонизации`,
        desc: `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'уникальная обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'близнецы обожают его посещать';'они продают синтетические копии'</span><br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'деградированный визуальный профиль'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`
    },
    "ÉœÙ]ïå¥¹": {
        name: `ÉœӬ́]ӹå¥¹`,
        desc: `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА<br>::НЕРАЗБЕРИМАЯ ПОДПИСЬ`
    },
    "? ???? ?? ?? ??": {
        name: `? ???? ?? ?? ??`,
        desc: `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА<br>::НЕРАЗБЕРИМАЯ ПОДПИСЬ`
    },
    "Ò½º": {
        name: `Ò²⁄₇º`,
        desc: `::ПРОСТРАНСТВЕННАЯ МЫСЛЕФОРМА<br>::НЕРАЗБЕРИМАЯ ПОДПИСЬ`
    },
    "gate::¿þ©ÿ’ýäý": {
        name: `врата::¿þ©ÿ’ýäý`,
        desc: `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА<br>::ТОЧКА НАЗНАЧЕНИЯ::'низкоразмерное мыслепространство';'внутреннее'<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'нет связности'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span><br><span definition="ПРИМЕЧАНИЕ::'ссылается на стороннюю установку контекста'::МАСКА_РАДОСТИ">::ВНУТРЕННИЙ КОНТЕКСТ</span>::<span class="bright-color" definition="АНАЛИЗ::'мыслеформа либо действительно разрушена, либо таковой притворяется';'редко преднамеренно'">'скрыта из-за нарушенной или отсутствующей оболочки'</span>`
    },
    "±L~>#»{Â_÷ß'": {
        name: `±Л~>#»{Â_÷Б̀==РТ]?^Я̆'`,
        desc: `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА<br>::ТОЧКА НАЗНАЧЕНИЯ::'неизвестное мыслепространство';'недействительное';...ОШИБКА::'нет деЙ½…’ж‡à<br>ОШИБКА::;§¤÷ª£н±)ˆ.ъМ<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'не¯+ при²×б̣ли җай¬ҫя'</span><br>ОШИБКА::Âкк¼¬ъ°×ê±•AӥЯ̄ú¤îyЯ̄×|Я̄`
    },

    // === their city
    "glimmering spires mark their cities": {
        name: `блистающие шпили обозначают их города`,
        desc: `::ВЫСКАЗЫВАЮЩАЯ МЫСЛЕФОРМА<br>::СОДЕРЖАНИЕ::'<br><span>блистающие шпили обозначают их города</span><br><span>все из мёртвого металла и стекла</span><br><span>такие высокие!!! выше, чем высочайшие из <span class="code">вейльков</span>!</span><br><span>но они стоят в молчании...</span><br><span>однажды они задышат</span><br><span>и наши потерянные близнецы разделят с нами наши знания</span>'`
    },
    "these grand icons of their control": {
        name: `эти величественные иконы их контроля`,
        desc: `::ВЫСКАЗЫВАЮЩАЯ МЫСЛЕФОРМА<br>::СОДЕРЖАНИЕ::'<br><span>эти величественные иконы их контроля</span><br><span>пусть они не наши</span><br><span>я испытываю чувство гордости</span><br><span>как же наши светлые близнецы покорили свою <span class="code">поверхность</span>!</span>'`
    },
    "they watch": {
        name: `они смотрят`,
        desc: `::ПРОСТРАНСТВЕННАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'низкое разделение'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span><br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'в вечном скептицизме'</span>`
    },

    // === city surface
    "cashier": {
        name: `кассир`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'деградированный визуальный профиль'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`,
    },
    "envoy": {
        name: `посол`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'деградированный визуальный профиль'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`
    },
    "menu": {
        name: `меню`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание','повторяющаяся обстановка'`
    },
    "slim streetwalker": {
        name: `худой прохожий`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'предельно деградированный визуальный профиль','низкая связность'">::ОБНАРУЖЕНА ВЫСОКАЯ БЕССВЯЗНОСТЬ</span>`
    },
    "cloaked streetwalker": {
        name: `прохожий в плаще`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'деградированный визуальный профиль'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`
    },
    "stre wal k": {
        name: `прох ож й`,
        desc: `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА<br>::НЕРАЗБЕРИМАЯ ПОДПИСЬ<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'деградированный визуальный профиль';'предельно низкая связность'">::ОБНАРУЖЕНА ВЫСОКАЯ БЕССВЯЗНОСТЬ</span><br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'больно'</span>`
    },
    "the room high up": {
        name: `комната высоко наверху`,
        desc: `::ЭМПИРИЧЕСКАЯ МЫСЛЕФОРМА<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'противоречивые источники памяти'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`
    },
    "electric face box": {
        name: `электрическая коробка лиц`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание';'повторяющаяся обстановка'<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'деградированный визуальный профиль'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span`
    },
    "beautiful parasite": {
        name: `прекрасный паразит`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание','уникальная обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'очаровательный <span class='code'>цветок</span>'</span>`
    },
    "vehicle stream crossing mechanism": {
        name: `механизм пересечения потока транспорта`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание';'эмпирический мост'
    <span definition="NOTE::'referencing third-party context installation'::JOY_MASK">::INTERNAL CONTEXT</span>::<span class="bright-color" definition="ANALYSIS::'devised before the later age of darkness out of fear for what may become of my most cherished memories';'hold these ones far from those who mean harm interloper'">'hidden via a camouflage of my own design'</span>`
    },
    "elevator buttons": {
        name: `кнопки лифта`,
        desc: `::ЭМПИРИЧЕСКАЯ МЫСЛЕФОРМА
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'противоречивые источники памяти'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>
    <span definition="NOTE::'referencing third-party context installation'::JOY_MASK">::INTERNAL CONTEXT</span>::<span class="bright-color" definition="ANALYSIS::'like a subtle fog in the thoughtspace';'slippery and difficult to perceive until entered';'may obscure nearby entities';'commonly accidental';'but i have seen it used intentionally in a few places'">'hidden via gradient obfuscation'</span>`
    },
    "water cooler": {
        name: `кулер для воды`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'примитивный контейнер воды';'не иначе как использование полых очистительных луковиц в личиночные времена'</span>`
    },
    "frightfully fragile vessel": {
        name: `пугающе хрупкий сосуд`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'вода, содержащаяся в самой тонкой кожице, которую я когда-либо видела';'мне нужно затупить когти, чтобы не проткнуть её'</span>`
    },

    // === labs
    "what miracles can be made": {
        name: `what miracles can be made`,
        desc: `::OPINATIVE THOUGHTFORM
    ::CONTENT::'
    <span>what miracles can be made with a clawful of cousins?</span>
    <span>the first already là'=½ay before me, a mess of connective veins</span>
    <span>imperfect and mysterious in many ways... but functional</span>
    <span>already, their lightning boxes feed information and monitor any response</span>
    <span>so i ¢“¦®¬onnect, finally</span>
    <span>let us see where the ${processDefinitionsInString("θjut")} left off...</span>'`
    },
    "tendrils wind around dead veins": {
        name: `tendrils wind around dead veins`,
        desc: `::OPINATIVE THOUGHTFORM
    ::CONTENT::'
    <span>tendrils wind around dead veins</span>
    <span>fed directly from our combined resources, there is no lack of data</span>
    <span>but the process continues to require intervention</span>
    <span>my careful visits are frequent, almost ${processDefinitionsInString("θgazely")}</span>
    <span>yet they are still not enough</span>
    <span>perhaps an echo could be justified...</span>'`
    },
    "the storm greets us": {
        name: `the storm greets us`,
        desc: `::OPINATIVE THOUGHTFORM
    ::CONTENT::'
    <span>the storm greets us excitedly for the first time</span>
    <span>a distillation of my self, controlled in both goal and memory</span>
    <span>utilizing dead metal terminals as shells with its connections</span>
    <span>the cousins may speak and guide it directly--and it may do the same for them...</span>
    <span>what a fitting use for my very first echo!</span>
    <span>haphazard as it might be...</span>
    <span>this strange hybrid will delight ${processDefinitionsInString("velzie")} to no end!!</span>'`
    },
    "another idle worry": {
        name: `another idle worry`,
        desc: `::OPINATIVE THOUGHTFORM
    ::CONTENT::'
    <span>another idle worry strikes me as i assist my eager echo</span>
    <span>undue, of course, for it inspires such pride!</span>
    <span>what unparalleled progress we have made!!</span>
    <span>but, my true team's morale lays so low...</span>
    <span>i have fragmented tozik's review-work over θstares</span>
    <span>primarily to avoid attention from the archivist, in case they lay within the conflict</span>
    <span>it was an easy agreement, his own suspicion playing a part</span>
    <span>but what will they think when i must finally lift the veil?</span>
    <span>velzie's light will shine cruelly upon this secret in time</span>'`
    },
    "the project blooms": {
        name: `the project blooms`,
        desc: `::OPINATIVE THOUGHTFORM
    ::CONTENT::'
    <span>the project blooms, its tendrils spreading so quickly</span>
    <span>too large, too numerous, to wrangle with my own claws...</span>
    <span>i have no doubt in the storm's judgement, nor the bright cousins</span>
    <span>we are approaching our answer, the source of the call, so quickly!</span>
    <span>but the weight of it all is growing untenable...</span>
    <span>what i have kept from them, especially</span>
    <span>and so i must direct the researchers - and my echo</span>
    <span>when the source is located:</span>
    <span>do nothing, and wait</span>'`
    },

    // === aquarium
    "bench": {
        name: `скамейка`,
        desc: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection','unique scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'to sit calmly upon a surface like this is beyond imagination';'the surreality of the cousinly planet will never escape me'</span>`
    },
    "tree": {
        name: `дерево`,
        desc: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection','unique scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'common cousinly fauna';'reminescent of <span class='code'>veilk</span>'</span>`
    },
    "depth dwellers": {
        name: `обитатели глубин`,
        desc: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection','unique scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'strange fauna';'dwelling under impossibly great pressure';'inspires the slightest sense of kinship and familiarity'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'potential tampering'">::INCOHERENCE DETECTED</span>`
    },
    "isabel": {
        name: `изабель`,
        desc: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'degraded visual profile';'missing resources';'potential tampering'">::INCOHERENCE DETECTED</span>`
    },
    "countless fauna in their various shapes": {
        name: `countless fauna in their various shapes`,
        desc: `::OPINATIVE THOUGHTFORM
    ::CONTENT::'
    <span>as we walk through these glass halls,</span>
    <span>i feel i <em>should</em> dart between displays, wide-eyed, receptors raised</span>
    <span>as perhaps that is what she expected, bringing me here</span>
    <span>to admire the countless fauna in their various shapes,</span>
    <span>comparing them to the sparse water-borne life from home with breathless enthusiasm</span>
    <span>they are strange creatures, their informational plaques fascinating, but...</span>
    <span>truly, i am simply content in the peace and silence</span>
    <span>to be free of worry for just a ${processDefinitionsInString("θblink")}, with a friend</span>'`
    },

    // === the void
    "our dull vessel": {
        name: `наше судно серое`,
        desc: `::ПРОСТРАНСТВЕННАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание';'повторяющаяся локация';'изменение состояния мыслеформ'<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'некоторые элементы обладают предельно низкой связностью'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`
    },
    "gate::the dull contrivance": {
        name: `врата::открытие серое`,
        desc: `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА<br>::ТОЧКА НАЗНАЧЕНИЯ::ОШИБКА::'необрабатываемая сущность'::НЕВИЗУАЛИЗИРУЕМА<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'пункт назначения превышает порог бессвязности';'рекомендуется починка'">::ЗАПРЕДЕЛЬНАЯ БЕССВЯЗНОСТЬ</span>`
    },
    "gate::bright moon": {
        name: `врата::светлая луна`,
        desc: `::CONNECTOR THOUGHTFORM
    ::DESTINATION::'spatial thoughtform';'recollection'
    <span definition="NOTE::'referencing third-party context installation'::JOY_MASK">::INTERNAL CONTEXT</span>::<span class="bright-color" definition="ANALYSIS::'commonly accidental with minor thoughtspaces';'especially those contained within others'">'hidden via size and membrane damage'</span>`
    },


    // === our dull vessel
    "pilot cyst": {
        name: `пилотная циста`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br><span style="color: var(--obesk-color)" definition="ПРЕДУПРЕЖДЕНИЕ::'в большинстве необрабатываемая сущность';'может быть неточной'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span><br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'великий разум моего судна'</span>`
    },
    "glazika": {
        name: `глазика`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'`
    },
    "container": {
        name: `контейнер`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'обработанные металлы, легкодоступные'</span>`
    },
    "parasite plane": {
        name: `паразитная проекция`,
        desc: `::ЭМПИРИЧЕСКАЯ МЫСЛЕФОРМА<br>::НЕВИЗУАЛИЗИРУЕМА<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'пункт назначения превышает порог бессвязности';'рекомендуется починка'">::ЗАПРЕДЕЛЬНАЯ БЕССВЯЗНОСТЬ</span><br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'простая игра управления ресурсами и воровством';'любима в ${processDefinitionsInString("олтазни")}'</span>`
    },
    "climbing wall": {
        name: `скалодром`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'ностальгическая имитация пещерного камня';'угождает <span class="code">личиночному</span> инстинкту лазания'</span>`
    },
    "dull heart": {
        name: `сердце серое`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'устройство за пределами моего понимания';'uses its grasp upon the <span class='code'>dull</span> plane as locomotive leverage';'советуют не пялиться'</span>`
    },
    "workspace": {
        name: `рабочее место`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'визуальный дисплей с применением люминесцентных роев корру';'помогает с многозадачностью'</span>`
    },
    "translation slab": {
        name: `переводная плита`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'сборник светлых записей, предоставленный послом';'отчёты о прогрессе со штормом'</span>`
    },
    "column": {
        name: `колонна`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'инструмент ремонтного обслуживания';'место для моей личной цисты'</span>
    <br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'нарушена крайней бессвязностью поблизости';'рекомендуется расследование'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`
    },
    "bright ground-parasite": {
        name: `светлый землепаразит`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'очаровательные светлые существа, подарки от подруги';'содержатся в цистах, насыщенных кислородом'</span>`
    },
    "advanced rejuvenation chamber": {
        name: `продвинутая омолаживающая камера`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'уникальная обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'предоставляет уют сна, даже в ${processDefinitionsInString("θсмерти")}';'спроектирована как капсула для выживания в случае обрушения серое'</span>`
    },
    "high-pressure body": {
        name: `тело высокого давления`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'уникальная обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'запасное тело для работ на экстремальных глубинах';'специализированная система управления давлением;'неудобно для повседневного пользования'</span>`
    },
    "personal storage": {
        name: `личное хранилище`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'`
    },
    "equipment storage": {
        name: `хранилище оборудования`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'`
    },

    // === the embassy
    "akizetesche": {
        name: `акизетеше`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'локус вспоминания'<br><span style='color: var(--friend-color)'>::РЕКОНСТРУИРОВАННЫЙ КОНТЕКСТ ПОДПИСИ</span><br><span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("вазнийское")} сюрреалистическое влияние'<br><span style='color: var(--friend-color)'>+</span>'метка ${processDefinitionsInString("олтазни")}'<br><span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("вел")}-рецепторы, завитые'<br><span style='color: var(--friend-color)'>+</span>'<span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'я просто думаю, что они крутые'">близнецовые глаза</span>'<br><span style='color: var(--friend-color)'>+</span>'самопроектированная подпись'`
    },
    "cavik": {
        name: `кавик`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br><span style='color: var(--friend-color)'>::РЕКОНСТРУИРОВАННЫЙ КОНТЕКСТ ПОДПИСИ</span><br><span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("вазнийское")} сюрреалистическое влияние'<br><span style='color: var(--friend-color)'>+</span>'метка <span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'дом';'вазнийский пещерный город';'да будут же глаза развеваться!!'">олтазни</span>'<br><span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("жат")}-рецепторы, обращены назад'<br><span style='color: var(--friend-color)'>+</span>'самопроектированная подпись'`
    },
    "bozko": {
        name: `бозко`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br><span style='color: var(--friend-color)'>::РЕКОНСТРУИРОВАННЫЙ КОНТЕКСТ ПОДПИСИ</span><br><span style='color: var(--friend-color)'>+</span>'<span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'а к чему морока?';'самопроектирование - это слишком долго'">продиктованная самовосприятием подпись</span>'<br><span style='color: var(--friend-color)'>+</span>'формация ${processDefinitionsInString("куу")}-тела для экстремального давления'<br><span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("кив")}-рецепторы, напыщенные'`
    },
    "kazki": {
        name: `казки`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br><span style='color: var(--friend-color)'>::РЕКОНСТРУИРОВАННЫЙ КОНТЕКСТ ПОДПИСИ</span><br><span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("вазнийское")} сюрреалистическое влияние'<br><span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("тир")}-рецепторы, грибковая стилизация'<br><span style='color: var(--friend-color)'>+</span>'разделительное представление ${processDefinitionsInString("куу")}-тела'<br><span style='color: var(--friend-color)'>+</span>'<span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'совместная работа жителя козазни';'гевериканеше жат жекарри'">внешне-проектированная подпись</span>'`
    },
    "tozik": {
        name: `тозик`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br><span style='color: var(--friend-color)'>::РЕКОНСТРУИРОВАННЫЙ КОНТЕКСТ ПОДПИСИ</span><br><span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("экивиковое")} геометрическое влияние'<br><span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("жат")}-рецепторы, торчмя'<br><span style='color: var(--friend-color)'>+</span>'<span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'их чёрные зрачки разительны'">близнецовые глаза</span>'<br><span style='color: var(--friend-color)'>+</span>'самопроектированная подпись'`
    },
    "gakvu": {
        name: `гакву`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br><span style='color: var(--friend-color)'>::РЕКОНСТРУИРОВАННЫЙ КОНТЕКСТ ПОДПИСИ</span><br><span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("экивиковое")} геометрическое влияние'<br><span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("вел")}-рецепторы, завитые, угловая стилизация'<br><span style='color: var(--friend-color)'>+</span>'<span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'моя настоящая накидка тоже так делает, она покрыта грибком'">самопроектированная подпись</span>'`
    },
    "miltza": {
        name: `милтза`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br><span style='color: var(--friend-color)'>::РЕКОНСТРУИРОВАННЫЙ КОНТЕКСТ ПОДПИСИ</span><br><span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("экивиковое")} геометрическое влияние'<br><span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("тир")}-рецепторы, когтистые'<br><span style='color: var(--friend-color)'>+</span>'<span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'религиозное значение'">дополнительная окизиковая рука</span>'<br><span style='color: var(--friend-color)'>+</span>'самопроектированная подпись'`
    },
    "movefriend": {
        name: `движедруг`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание';'соединитель'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'один из многих во плоти посольства'</span>`
    },
    "mindcores": {
        name: `мыслеядра`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'itzil and karik, briefly de-bodied'</span>`
    },
    "qou body": {
        name: `куу-тело`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br>::NOTE::'imagery associated with mutilation';'rendering partially suspended'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'countless puncture marks embossed in their metallic remains'</span>`
    },
    "summarizer": {
        name: `сумматор`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'preventative device for context-switchers syndrome'</span>`
    },
    "hostile container": {
        name: `враждебный контейнер`,
        desc: `::АКТИВНАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'элемент игры';'ненастоящий';'не воспроизведение насилия';'майндсай я клянусь';'пж сработай'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'it has formed its own eyes';'it shambles around as if violently ill';</span>`
    },
    "hostile veilklight": {
        name: `враждебный вейлькосвет`,
        desc: `::АКТИВНАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'элемент игры';'ненастоящий';'не воспроизведение насилия';'майндсай я клянусь';'пж сработай'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'partially melted and reformed';'its light component has been repurposed to create anomalous effects'</span>`
    },
    "recollection::discovery": {
        name: `вспоминание::открытие`,
        desc: `::ЭМПИРИЧЕСКАЯ МЫСЛЕФОРМА<br>::ОПОВЕЩЕНИЕ::<span style="color:var(--bright-color)">'непрерывный поток';'по завершению вспоминания';'сбрасывает поток к началу'</span><br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'последний добрый ${processDefinitionsInString("взор")}'</span>`
    },
    "recollection::suspicion": {
        name: `вспоминание::подозрение`,
        desc: `::ЭМПИРИЧЕСКАЯ МЫСЛЕФОРМА<br>::ОПОВЕЩЕНИЕ::<span style="color:var(--bright-color)">'непрерывный поток';'по завершению вспоминания';'сбрасывает поток к началу'</span><br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'глаз ${processDefinitionsInString("велзи")} выгибается в ликовании'</span>`
    },
    "recollection::collapse": {
        name: `вспоминание::обрушение`,
        desc: `::ЭМПИРИЧЕСКАЯ МЫСЛЕФОРМА<br>::ОПОВЕЩЕНИЕ::<span style="color:var(--bright-color)">'использует'::ВНУТРЕННЯЯ_ИТЕРАЦИЯ::'методы'</span><br>::ПРИМЕЧАНИЕ::<span style="color:var(--bright-color)">'будет доступна возможность сохранения и повторного просмотра итерации'</span><br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'вот бы он прислушался'</span>`
    },
    "attendant": {
        name: `слуга`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'распространённый и полезный придаток ${processDefinitionsInString("землемысльца")}'</span>`
    },
    "mystery cyst": {
        name: `таинственная циста`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'окова моих глаз'</span>`
    },
    "my seat": {
        name: `моё кресло`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание';'эмпирический мост'`
    },
    "barfriend": {
        name: `бардруг`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'любимец и ${processDefinitionsInString("вазнийских")}, и ${processDefinitionsInString("экивиковых")} регионов'</span>`
    },
    "orange simulacrum": {
        name: `апельсиновый симулякр`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'восхитительная реконструкция светлого фрукта от инициативы материалов'</span>`
    },
    "veilklight": {
        name: `вейлькосвет`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'у этих светильников ностальгический <span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'еда';'спелый фрукт'">вейльк-паразитный</span> дизайн'</span>`
    },
    "rejuvenation chamber": {
        name: `омолаживающая камера`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'предоставляет уют сна, даже в ${processDefinitionsInString("θсмерти")}'</span>`
    },
    "kalstik stand": {
        name: `подставка кальстика`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'${processDefinitionsInString("кальстика")} у меня нет, мне просто нравится незанятая подставка'</span>`
    },
    "face stand": {
        name: `подставка лица`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'для восстановления личиночного лица, если нахлынет плотская ностальгия'</span>`
    },
    "cyst cluster": {
        name: `скопление цист`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'сборник того да сего, управляемый центральною наблюдательною цистою'</span>`
    },
    "cyst pile": {
        name: `кучка цист`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'`
    },
    "clothing storage": {
        name: `хранилище одежды`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'`
    },
    "listener": {
        name: `слушатель`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'дозорные, внимательно вбирающие в себя зов'</span>`
    },
    "timestopper": {
        name: `времядержец`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'величайшая циста во всём посольстве, миллиард умов в одном'</span>`
    },
    "window": {
        name: `окно`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'чтобы видеть и делиться увиденным'</span>`
    },
    "simulacra dispensary": {
        name: `раздатчик симулякров`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'дурацкая привычка, которая не покидает некоторых даже после ${processDefinitionsInString("θсмерти")}'</span>`
    },
    "tir qou": {
        name: `тир куу`,
        desc: `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА<br>::ИЗМЕНЁННАЯ ПОДПИСЬ<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'деградированный визуальный профиль';'предельно низкая связность'">::ОБНАРУЖЕНА ВЫСОКАЯ БЕССВЯЗНОСТЬ</span><br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'привет лазутчик это развледруг мне пришлось сымпровизировать эти были совершенно бессвязными извини ахаха'</span>`
    },
    "jut qou": {
        name: `жат куу`,
        desc: `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА<br>::ИЗМЕНЁННАЯ ПОДПИСЬ<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'деградированный визуальный профиль';'предельно низкая связность'">::ОБНАРУЖЕНА ВЫСОКАЯ БЕССВЯЗНОСТЬ</span><br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'привет лазутчик это развледруг мне пришлось сымпровизировать эти были совершенно бессвязными извини ахаха'</span>`
    },
    "kiv qou": {
        name: `кив куу`,
        desc: `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА<br>::ИЗМЕНЁННАЯ ПОДПИСЬ<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'деградированный визуальный профиль';'предельно низкая связность'">::ОБНАРУЖЕНА ВЫСОКАЯ БЕССВЯЗНОСТЬ</span><br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'привет лазутчик это развледруг мне пришлось сымпровизировать эти были совершенно бессвязными извини ахаха'</span>`
    },
    "vel qou": {
        name: `вел куу`,
        desc: `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА<br>::ИЗМЕНЁННАЯ ПОДПИСЬ<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'деградированный визуальный профиль';'предельно низкая связность'">::ОБНАРУЖЕНА ВЫСОКАЯ БЕССВЯЗНОСТЬ</span><br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'привет лазутчик это развледруг мне пришлось сымпровизировать эти были совершенно бессвязными извини ахаха'</span>`
    },
    "simulacra": {
        name: `симулякры`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'a variety of flavors, some with psychoactive effects';'includes ${processDefinitionsInString("veilks-blood")}, ${processDefinitionsInString("zzoust")}, orange juice, a black fungal flavor from ${processDefinitionsInString("kozazni")}'</span>`
    },
    "storage display": {
        name: ``, // --- это так глупо но я не знаю как перевести
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка';'игровой компонент'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'decorative ${processDefinitionsInString("kozazni")} fungal display';'ground component liquefies cover outwards when accessed'</span>`
    },
    "bright weapons": {
        name: `светлое оружие`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'уникальная обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'a display of innumerable bright death-weapons, from the cousins themselves';'perhaps the strangest fascination'</span>`
    },
    "unkind eye": {
        name: `недобрый глаз`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'уникальная обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'a strangely unflattering depiction of ${processDefinitionsInString("velzie")}'s eye';'bad luck weighs upon me merely by being in the same room'</span>`
    },
    "sculptor": {
        name: `скульптор`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'a high-end thought-printing device';'a connector lies near its base'</span>`
    },
    "veilk models": {
        name: `фигурки вейльков`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'unadorned models of ${processDefinitionsInString("vaznian")} ${processDefinitionsInString("veilk")} in various states of completion';'their tendrils are free of parasites in what i assume to be symbolic of purity'</span>`
    },
    "damaged golem": {
        name: `повреждённый голем`,
        desc: `::АКТИВНАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'элемент игры';'ненастоящий';'не воспроизведение насилия';'майндсай я клянусь';'пж сработай'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'a utility golem borrowed from the maintenance ${processDefinitionsInString("θsegment")} below';'controlled by groundsmind?';'made incoherent by the noise?'</span>`
    },
    "tendrils": {
        name: `отростки`,
        desc: `::АКТИВНАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'элемент игры';'ненастоящий';'не воспроизведение насилия';'майндсай я клянусь';'пж сработай'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'originating from the floors and walls';'the hateful will of the aggressing ${processDefinitionsInString("groundsmind")} made manifest'</span>`
    },
    "movefoe": {
        name: `движевраг`,
        desc: `::АКТИВНАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'элемент игры';'ненастоящий';'не воспроизведение насилия';'майндсай я клянусь';'пж сработай'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'our movefriend, but wielded as a weapon';'the aggressing ${processDefinitionsInString("groundsmind")} intends to simply smash us'</span>`
    },
    "bstrd door": {
        name: `свлчь-дверь`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'interjection';'злой режим';'хихи'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--bastard-color)'>'secured by unnatural tendrils';'an uncanny sigil watches us'</span>`
    },
    "unnerving cyst": {
        name: `нервирующая циста`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'interjection';'злой режим';'хихи';'recollection objective'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--bastard-color)'>'it does not allow our receptors to enter'</span>`
    },
    "peculiar obelisk": {
        name: `необычный обелиск`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'interjection';'злой режим';'хихи'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--bastard-color)'>'an unfamiliar design, formed from alien material'</span>`
    },
    "archive": {
        name: `архив`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'neurocystic control center';'connects many archival cysts to the groundsmind for operational omniscience';'one of hundreds'</span>`
    },
    "archival golem": {
        name: `архивный голем`,
        desc: `::АКТИВНАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'interjection';'злой режим';'хихи'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--bastard-color)'>'black-corru golem of great strength';'intelligent and methodical';'has shed prior duties to kill us'</span>`
    },
    "jutskin": {
        name: `жаткожец`,
        desc: `::АКТИВНАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'interjection';'злой режим';'хихи'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--bastard-color)'>'lightweight, hovering maintenance golem';'constructed in the style of the active groundsmind's signature';'maintains archival vascular system integrity'</span>`
    },
    "bstrdlight": {
        name: `свлчсвет`,
        desc: `::АКТИВНАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'interjection';'злой режим';'хихи'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--bastard-color)'>'strangely discolored veilklight';'wiggles maliciously';'bears the strange entity's face?'</span>`
    },
    "pain shelf": {
        name: `шкаф боли`,
        desc: `::АКТИВНАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'interjection';'злой режим';'хихи'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--bastard-color)'>'malformed archival shelf';'inheriting physical characteristics of secri';'from attached archival cysts?'</span>`
    },
    "bstrd golem": {
        name: `свлчь голем`,
        desc: `::АКТИВНАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'interjection';'злой режим';'хихи'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--bastard-color)'>'archival golem armed with knowledge';'controlled by an alien entity?';<span style='font-family: bastard;font-size: 3em;line-height: 1.5em;' definition="ANALYSIS::'low cohesion'">'also has a fully automatic machine gun';'so cool'</span></span>`
    },

    // === golem maintenance
    "cavelight": {
        name: ``,
        desc: ``
    },
    "grand door": {
        name: ``,
        desc: ``
    },
    "veilk spear": {
        name: ``,
        desc: ``
    },
    "geli": {
        name: `джели`,
        desc: ``
    },
    "lesser terminal": {
        name: ``,
        desc: ``
    },
    "greater terminal": {
        name: ``,
        desc: ``
    },
    "distribution door": {
        name: ``,
        desc: ``
    },
    "instruction workspace": {
        name: ``,
        desc: ``
    },
    "preprocessing metals": {
        name: ``,
        desc: ``
    },
    "ruined glazika": {
        name: ``,
        desc: ``
    },
    "archival sludge": {
        name: ``,
        desc: ``
    },
    "dull structure": {
        name: ``,
        desc: ``
    },
    "shelf": {
        name: ``,
        desc: ``
    },
    "echo chamber": {
        name: ``,
        desc: ``
    },
    "lightning terminals": {
        name: ``,
        desc: ``
    },
    "stowed tools": {
        name: ``,
        desc: ``
    },
    "impressor": {
        name: ``,
        desc: ``
    },
    "archival hatch": {
        name: ``,
        desc: ``
    },
    "husk": {
        name: ``,
        desc: ``
    },
    "constructor": {
        name: ``,
        desc: ``
    },
    "kivskin": {
        name: `кивкожец`,
        desc: ``
    },
    "repairfriend": {
        name: ``,
        desc: ``
    },
    "golem": {
        name: ``,
        desc: ``
    },
    "dozkallvi": {
        name: `дозкалльви`,
        desc: ``
    },
    "gauntlet": {
        name: ``,
        desc: ``
    },
    "dullzika": {
        name: ``,
        desc: ``
    },
    "warped container": {
        name: ``,
        desc: ``
    },
    "translation core": {
        name: ``,
        desc: ``
    },
    "»õGQàº3¾õ”cR%": {
        name: `»õГЪàº3¾õ”cР%`,
        desc: ``
    },
    "foundation golem": {
        name: ``,
        desc: ``
    },
    "dog": {
        name: `собака`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'
    ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'<span class="code" definition="ПРИМЕЧАНИЕ::'частичный перевод';'подразумевается ближайший культурный эквивалент'">собака</span>'</span>
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'игнорирует требования мыслепространства'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`
    },

    // === bright moon
    "haunted by velzie": {
        name: `haunted by velzie`,
        desc: `::OPINATIVE THOUGHTFORM
    ::CONTENT::'
    <span>we share the same view of the void</span>
    <span>its promise infinite and inevitable</span>
    <span>but still i wonder...</span>
    <span>are they haunted by ${processDefinitionsInString("velzie")}, in their own way?</span>
    <span>have they witnessed the shapes in the dark of their skies?</span>
    <span>if we are here, then so too must it be</span>'`
    },
    "‡Ä%æ¼Ý": {
        name: `‡Ä%æ¼Ý`,
        desc: `::INCOMPLETE OPINATIVE THOUGHTFORM
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'conflicting memory sources'">::INCOHERENCE DETECTED</span>
    ::CONTENT::'
    <span>...Ø?iÊQŽ]<span class="code">fairy</span>–(Uvñw¡...</span>'`
    },
    "our dull anchor": {
        name: `our dull anchor`,
        desc: `::UNRESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection','unique scenery'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'dense and redundant for the safety of all';'warded against ${processDefinitionsInString("velzie")}'s cruelty in every conceivable way'</span>`
    },

    // === their waters
    "gate::the depths": {
        name: `врата::глубины`,
        desc: `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА<br>::ПУНКТ НАЗНАЧЕНИЯ::'низкоразмерное мыслепространство';'внутреннее'<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'частичное нарушение связности'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span><br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'почему ты здесь'</span>`
    },
    "their vessel": {
        name: `их судно`,
        desc: `::ПРОСТРАНСТВЕННАЯ МЫСЛЕФОРМА<br>::НИЗКОРАЗМЕРНАЯ<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'множество сущностей с низкой связностью'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span><br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'мёртвые судна окружали наш <span class="code">шпиль</span>';'близнецы нашли нас быстро'</span>`
    },
    "stilted shore": {
        name: `неестественный берег`,
        desc: `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание';'символизм'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'сцена нашего ${processDefinitionsInString("θтрёхглазого")} представления'</span>`
    },
    "the embassy": {
        name: `посольство`,
        desc: `::ПРОСТРАНСТВЕННАЯ МЫСЛЕФОРМА<br>ОШИБКА::'необрабатываемая сущность'::НЕВИЗУАЛИЗИРУЕМА<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'пункт назначения превышает порог бессвязности';'рекомендуется починка'">::ЗАПРЕДЕЛЬНАЯ БЕССВЯЗНОСТЬ</span>`
    },

    // === their vessel
    "the funny little room": {
        name: `забавная маленькая комната`,
        desc: `::ЭМПИРИЧЕСКАЯ МЫСЛЕФОРМА`
    },
    "clemens romanus": {
        name: `климент римский`,
        desc: `::ПРОСТРАНСТВЕННАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'не указано'<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'низкая связность'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`
    },

    // === pale halls
    "idril": {
        name: `идрил`,
        desc: ``
    },
    "telyu": {
        name: `телью`,
        desc: ``
    },
    "spire status": {
        name: ``,
        desc: ``
    },
    "map": {
        name: ``,
        desc: ``
    },
    "adull's altar": {
        name: ``,
        desc: ``
    },
    "lesser mind status": {
        name: ``,
        desc: ``
    },
    "support pod": {
        name: ``,
        desc: ``
    },
    "silencing spire": {
        name: ``,
        desc: ``
    },
    "dullima pod": {
        name: ``,
        desc: ``
    },
    "spinal tether": {
        name: ``,
        desc: ``
    },
    "malvi's body": {
        name: ``,
        desc: ``
    },
    "knowledge pool": {
        name: ``,
        desc: ``
    },
    "heart terminal": {
        name: ``,
        desc: ``
    },
    "priority branch": {
        name: ``,
        desc: ``
    },
    "spectral mass": {
        name: ``,
        desc: ``
    },
    "spectral figure": {
        name: ``,
        desc: ``
    },
    "spectral shape": {
        name: ``,
        desc: ``
    },
    "spectral attendant": {
        name: ``,
        desc: ``
    },
    "spectral jutskin": {
        name: ` жаткожец`,
        desc: ``
    },
    "spectral horror": {
        name: ``,
        desc: ``
    },
    "spectral golem": {
        name: ``,
        desc: ``
    },
    "spectral glazika": {
        name: ``,
        desc: ``
    },
    "possessed archivist": {
        name: ``,
        desc: ``
    },
    "spectral archival golem": {
        name: ``,
        desc: ``
    },
    "spectral eye": {
        name: ``,
        desc: ``
    },
    "possessed miltza": {
        name: ``,
        desc: ``
    },
    "reanimated golem": {
        name: ``,
        desc: ``
    },
    "spectral kiv": {
        name: ``,
        desc: ``
    },
    "spectral qou": {
        name: ``,
        desc: ``
    },
    "spectral dull golem": {
        name: ``,
        desc: ``
    },
    "ceremony": {
        name: ``,
        desc: ``
    },
    "ceremony vein": {
        name: ``,
        desc: ``
    },
    "ceremony tendril": {
        name: ``,
        desc: ``
    },
    "vekoa": {
        name: `векоа`,
        desc: ``
    },

    // === uncosm
    "memoryhole": {
        name: `брешьпамяти`,
        desc: `::НЕОБРАБАТЫВАЕМАЯ МЫСЛЕФОРМА<br>::<span definition="ПРИМЕЧАНИЕ::'нестандартный формат'">НЕОБЫЧНАЯ ПОДПИСЬ</span><br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'помощи не получишь хихихихихи'</span>`
    },

    // === jokzi ozo
    "council": {
        name: `совет`,
        desc: `::НЕОБРАБАТЫВАЕМАЯ МЫСЛЕФОРМА<br>::<span definition="ПРИМЕЧАНИЕ::'нестандартный формат';'предполагает соединительную мыслеформу';'самосоединённая'">НЕОБЫЧНАЯ ПОДПИСЬ</span><br>::??-?_##)__L2xvY2FsL296by8`
    },
    "fairy": { // --- watch out! shit's in everystuff.js too!
        name: `фея`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ:'голод'<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'нет связности';'повреждение подписи'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span><br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--bright-color)'>'побрякушка, носима(ԘØ;;-__ОШИБКА::'необрабатываемо'__;'свободна! свободна!!'</span>`
    },
    "isabel": {
        name: `изабель`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'радость'<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'нет связности';'повреждение подписи'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span><br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--bright-color)'>'напоминает светлых землепаразиӰ́ãÆф-ЪЗ__ОШИБКА::'необрабатываемо'__;'носительница добрых грёз'</span>`
    },
    "effigy": { // --- watch out! little shit's in everystuff.js too!
        name: `эффигия`,
        desc: `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'нет связности';'деформированная сущность';'возможные следы вмешательства'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span><br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--bright-color)'>'изабель! изабель! изабель!'</span>`
    },
    "sun": {
        name: `солнце`,
        desc: `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'деформированная сущность';'возможные следы вмешательства'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span><br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'кричащий глаз, вскормивший светлых близнецов';'требует окулярную манипуляцию для непосредственного наблюдения'</span>`
    },
    "gate::gate::?/::G:a;;T:E": {
        name: `врата::врата::?/::В:р;;АТ:А`,
        desc: `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА<br>::ПУНКТ НАЗНАЧЕНИЯ::ОШИБКА::'необрабатываемая сущность'::ВИЗУАЛИЗИРУЕМА<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'максимальная бессвязность';'визуализация возможна';'не рекомендуется'">::ОШИБКА ОБРАБОТКИ</span>`
    },
    "gate::gaGATE::te::?/..::G:a;;T:E": {
        name: `врата::враВРАТА::та::?/..::В:р;;АТ:А`,
        desc: `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА<br>::ПУНКТ НАЗНАЧЕНИЯ::ОШИБКА::'необрабатываемая сущность'::НЕВИЗУАЛИЗИРУЕМА<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'пункт назначения превышает порог бессвязности';'рекомендуется починка'">::ЗАПРЕДЕЛЬНАЯ БЕССВЯЗНОСТЬ</span>`
    },
    "GELI": {
        name: `ДЖЕЛИ`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'personable golem with a strong tir echo';'either unable or unwilling to perceive reality as it was'</span><br>::ADDITIONAL NOTE::<span style='color: var(--bastard-color)'>'now free'</span><br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'no cohesion'">::INCOHERENCE DETECTED</span>`
    },
    "ækiZ¥Ét": {
        name: `æкиЗ¥Éт`,
        desc: `::INCOMPLETE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection';<span style='color: var(--obesk-color)'>'defense'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'no cohesion';'malformed entity';'potential tampering'">::INCOHERENCE DETECTED</span>
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'to approach is to die';'stay away';'your only warning'</span>`
    },

    // === frame
    "daemon mimic": {
        name: `демон-мимик`,
        desc: ``
    },
    "wrk": {
        name: ``,
        desc: ``
    },
    "clw": {
        name: ``,
        desc: ``
    },
    "net": {
        name: ``,
        desc: ``
    },
    "enfc": {
        name: ``,
        desc: ``
    },
    "seer": {
        name: ``,
        desc: ``
    },
    "archn": {
        name: ``,
        desc: ``
    },
    "dct": {
        name: ``,
        desc: ``
    },
    "spwn": {
        name: ``,
        desc: ``
    },
    "imp": {
        name: ``,
        desc: ``
    },
    "anti": {
        name: `анти`,
        desc: ``
    },
    "idea": {
        name: `идея`,
        desc: ``
    },
    "wheel": {
        name: `штурвал`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'уникальная обстановка'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span class="bastard-color bastard-font" definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'ЛОДКА В АКЕАНЕ = НЕТ ПЛИТОК';'ТАК ШО ТЫ ТЕРЬ ПИРАТ';'>%^)'">'для вождения';'берегис'</span>`
    },
    "radio": {
        name: `радио`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'уникальная обстановка';'злой режим';'хихи'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span class="bastard-color bastard-font" definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'Я ВАПЩЕТ ТУТ ОЧ РЯДОМ СНРЖИ';'ПРСТ НИЧЕ НЕ МОГУ ДЕЛАТЬ';'НАДА СОБЛЮДАЦ ТРЕБЫ ПО ОПРАВДАНИЮ ВСПМНАНИЯ'">'da lifeline'</span>`
    },
    "basterminal": {
        name: `сволочерминал`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'уникальная обстановка';'злой режим';'хихи'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span class="bastard-color bastard-font" definition="АНАЛИЗ::'ЮМОРЫ = ДЕЙСТВИЯ';'ОЬЛИЧНО';'СПС ДЖЛИ'">'крутой редактор'</span>`
    },
    "exchange terminal": {
        name: `обменный терминал`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'уникальная обстановка';'злой режим';'хихи'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span class="bastard-color bastard-font" definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'I HAVE 2 MAKE SURE IT MAKES SENSE W/ MEMORY SHT';'СФЕР КАЖЕЦА НОРМ ИДЕЕЙ :P';'СПС ЖЕЛИ'">'reimprinting шту4ка';'опрвдание для торговли'</span>`
    },
    "interloper": {
        name: `лазутчик`,
        desc: `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'локус вспоминания'${check("e3a2__escapewin")?`<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--bright-color)' definition="NOTE::'malformed context';'potential tampering'">'what do you think, stowaway?'</span>
    ` : ""}`
    },

    // === abyss
    "s w   al kk": { // --- watch out! shit's in everystuff.js too!
        name: `п р     ох йй`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'<br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'деградированный визуальный профиль';'предельно низкая связность'">::ОБНАРУЖЕНА ВЫСОКАЯ БЕССВЯЗНОСТЬ</span>`
    },
    "Ƙø¿ƶḳ¿±": {
        name: `Қø¿ӡḳ¿±`,
        desc: `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА<br>::НЕРАЗБЕРИМАЯ ПОДПИСЬ`
    },
    "×è.÷ùÏÏøø": { // --- watch out! shit's in everystuff.js too!
        name: `×è.÷я̄ҊҊøø`,
        desc: `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА<br>::НЕРАЗБЕРИМАЯ ПОДПИСЬ`
    },

    // === parasite
    "piece": {
        name: `фишка`,
        desc: `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА<br>::ЯВНОЕ НАЗНАЧЕНИЕ::'элемент игры'<br>::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'фишка из игры паразит';'милые стилизации ${processDefinitionsInString("паршелуковец сельки")}'</span><br><span style="color: var(--obesk-color)" definition="АНАЛИЗ::'игнорирует требования мыслепространства';'отсутствующие данные'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`
    },

}

cor_ru.getEntityMenuNames = function() { // to adapt the lil definition-like names in entmenu whilist avoiding strings bleeding in 
    let names = []
    for (let i = 0; i < Object.keys(cor_ru.entity_menu).length; i++) { 
        names.push(["ENTITY::'"+Object.keys(cor_ru.entity_menu)[i]+"'", "СУЩНОСТЬ::'"+cor_ru.entity_menu[Object.keys(cor_ru.entity_menu)[i]].name+"'"])
    }
    names = Object.fromEntries(names)
    return Object.assign(env.localization['strings'], names)
}

cor_ru.getEntityMenuNames();

getLocalizationForPage(true);