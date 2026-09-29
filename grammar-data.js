/* ===== 语法冒险岛 · 6A + 6B + 7A 语法数据 =====
 * 6A 基于上海新教材六年级上册（2024 五四学制）Unit 1-6 语法
 * 6B 基于上海新教材六年级下册（2024 五四学制）Unit 1-6 语法
 * 7A 基于上海新教材七年级上册（2024 五四学制）U1-U6 课堂笔记
 * 字段说明：
 *   id       语法点唯一标识
 *   grade    分栏：'6A'（六上）/'6B'（六下）/'7A'（七上）
 *   title    语法点名称
 *   unit     对应教材单元
 *   emoji    图标
 *   color    主题色 class（c-*）
 *   summary  一句话概述
 *   lessons  讲解卡片 [{ title, points[], examples[{en,cn}], tips[] }]
 *   questions 练习题 [{ type: 'choice'|'fill', prompt, options?, answer, explain }]
 */

const GRAMMAR = [
/* ============================================================
   6A-G1 一般现在时（六上 U1 School life）
============================================================ */
{
  id: '6a-present',
  grade: '6A',
  title: '一般现在时（三单）',
  unit: '六上 U1 School life',
  emoji: '🏫',
  color: 'c-blue',
  summary: '表示习惯、事实、客观真理；第三人称单数加 s/es 是核心考点',
  lessons: [
    {
      title: '① 什么时候用一般现在时？',
      points: [
        '表示经常性、习惯性的动作：She reads books every day.',
        '表示事实或客观真理：The earth goes around the sun.',
        '表示现在的状态：There is a park near my home.',
        '常配 always / usually / often / every day / on Sundays'
      ],
      examples: [
        { en: 'She always gets up at 6:30.', cn: '她总是六点半起床。' },
        { en: 'We have English class every morning.', cn: '我们每天早上上英语课。' }
      ],
      tips: ['看到 always / often / every day → 一般现在时']
    },
    {
      title: '② 第三人称单数变化规则',
      points: [
        '一般直接加 s：run → runs, like → likes',
        '以 s/x/ch/sh 结尾加 es：fix → fixes, watch → watches',
        '辅音字母 + y 结尾，变 y 为 i 加 es：study → studies',
        '特殊：have → has；do → does；go → goes'
      ],
      examples: [
        { en: 'Tom studies French at school.', cn: '汤姆在学校学法语。' },
        { en: 'She has a dog and two cats.', cn: '她有一只狗和两只猫。' }
      ],
      tips: ['he/she/it 后动词一定要变三单，这是考试最爱考的坑']
    },
    {
      title: '③ 否定句与疑问句',
      points: [
        '否定：don\u0027t / doesn\u0027t + 动词原形',
        '疑问：Do / Does + 主语 + 动词原形?',
        'does 出现后，动词变回原形！She doesn\u0027t like... (不是 doesn\u0027t likes)',
        '回答：Yes, she does. / No, she doesn\u0027t.'
      ],
      examples: [
        { en: 'He doesn\u0027t play football on weekdays.', cn: '他工作日不踢足球。' },
        { en: 'Does she live in Shanghai?', cn: '她住在上海吗？' }
      ],
      tips: ['口诀：does 是"照妖镜"，后面的动词变回原形']
    },
    {
      title: '④ 时间介词 at / on / in',
      points: [
        'at + 具体时间点：at 8:15, at noon',
        'on + 星期/具体日期：on Monday, on Sept 5th',
        'in + 月份/季节/年份：in winter, in 2024',
        'must 表义务 / have to 表客观必要'
      ],
      examples: [
        { en: 'School starts at 8 o\u0027clock.', cn: '学校八点开始上课。' },
        { en: 'We must submit our homework today.', cn: '我们今天必须交作业。' }
      ],
      tips: ['at 点、on 天、in 月季年——时间介词口诀']
    }
  ],
  questions: [
    { type: 'choice', prompt: 'She ______ soccer every morning.', options: ['plays', 'play', 'playing', 'to play'], answer: 'plays', explain: 'she 三单 → 动词加 s：plays。' },
    { type: 'choice', prompt: 'My grandma often ______ TV at home.', options: ['watches', 'watch', 'watching', 'to watch'], answer: 'watches', explain: '以 ch 结尾加 es：watch → watches。' },
    { type: 'fill', prompt: 'Tom ______ (study) French at school. 用一般现在时填空', answer: 'studies', explain: '辅音+y 结尾 → 变 y 为 i 加 es：studies。' },
    { type: 'choice', prompt: 'He ______ like pears, but he likes apples.', options: ['doesn\u0027t', 'don\u0027t', 'isn\u0027t', 'not'], answer: 'doesn\u0027t', explain: 'he 三单否定 → doesn\u0027t + 动词原形 like。' },
    { type: 'choice', prompt: '______ she live in Shanghai?', options: ['Does', 'Do', 'Is', 'Are'], answer: 'Does', explain: 'she 三单疑问 → Does + 主语 + 动词原形。' },
    { type: 'fill', prompt: 'She ______ (have) a dog and two cats. 用三单形式填空', answer: 'has', explain: 'have 的三单特殊形式是 has。' },
    { type: 'choice', prompt: 'School starts ______ 8 o\u0027clock.', options: ['at', 'on', 'in', 'to'], answer: 'at', explain: 'at + 具体时间点：at 8 o\u0027clock。' },
    { type: 'choice', prompt: 'We have a PE class ______ Monday.', options: ['on', 'at', 'in', 'of'], answer: 'on', explain: 'on + 星期：on Monday。' },
      { type: 'choice', prompt: 'He ______ to school by bus every day.', options: ['go','goes','going','went'], answer: 'goes', explain: '三单 goes。' },
      { type: 'choice', prompt: 'My father ______ TV after dinner.', options: ['watch','watches','watching','watched'], answer: 'watches', explain: 'watch 以 ch 结尾加 es。' },
      { type: 'choice', prompt: '______ your sister like music?', options: ['Do','Does','Is','Are'], answer: 'Does', explain: 'your sister 三单 → Does。' },
      { type: 'choice', prompt: 'She ______ English very well.', options: ['speak','speaks','speaking','spoke'], answer: 'speaks', explain: '三单加 s。' },
      { type: 'choice', prompt: 'Tom ______ his homework every evening.', options: ['do','does','doing','did'], answer: 'does', explain: 'do 的三单是 does。' },
      { type: 'fill', prompt: 'The earth ______ (go) around the sun.', answer: 'goes', explain: '客观真理用一般现在时，the earth 三单。' },
      { type: 'choice', prompt: 'We ______ football after school.', options: ['play','plays','playing','played'], answer: 'play', explain: 'we 复数用原形。' },
      { type: 'choice', prompt: 'The shop ______ at eight in the morning.', options: ['open','opens','opening','opened'], answer: 'opens', explain: 'the shop 三单。' },
      { type: 'choice', prompt: '______ you often go to the library?', options: ['Do','Does','Is','Are'], answer: 'Do', explain: 'you 用 Do。' },
      { type: 'fill', prompt: 'My sister ______ (study) hard every day.', answer: 'studies', explain: '辅音+y 变 y 为 i 加 es。' },
      { type: 'choice', prompt: 'She ______ from Shanghai.', options: ['come','comes','coming','came'], answer: 'comes', explain: '三单加 s。' },
      { type: 'fill', prompt: 'It ______ (be) sunny in spring.', answer: 'is', explain: '天气用 it is。' },
      { type: 'choice', prompt: '______ your father like tea?', options: ['Do','Does','Is','Are'], answer: 'Does', explain: 'your father 三单。' },
      { type: 'choice', prompt: 'We have English ______ Monday.', options: ['at','on','in','of'], answer: 'on', explain: 'on + 星期。' },
      { type: 'fill', prompt: 'School starts ______ eight o\'clock.', answer: 'at', explain: 'at + 具体时间。' },
      { type: 'choice', prompt: 'He ______ breakfast at seven every morning.', options: ['have','has','having','had'], answer: 'has', explain: '三单 have → has。' },
      { type: 'choice', prompt: '______ there a park near your home?', options: ['Is','Are','Do','Does'], answer: 'Is', explain: 'there be 一般现在时疑问。' },
      { type: 'fill', prompt: 'They ______ (not) play basketball on weekdays.', answer: 'don\'t', explain: 'they 否定用 don\'t。' }
  ]
},

/* ============================================================
   6A-G2 人称代词 + 现在进行时（六上 U2 Family ties）
============================================================ */
{
  id: '6a-pronoun-prog',
  grade: '6A',
  title: '人称代词 + 现在进行时',
  unit: '六上 U2 Family ties',
  emoji: '👨‍👩‍👧',
  color: 'c-purple',
  summary: '主格/宾格/形容词性物主代词怎么分；be + doing 表示正在发生',
  lessons: [
    {
      title: '① 人称代词三兄弟',
      points: [
        '主格（作主语）：I, you, he, she, it, we, they',
        '宾格（作宾语）：me, you, him, her, it, us, them',
        '形容词性物主代词（后接名词）：my, your, his, her, its, our, their',
        '一句话分清楚：He (主) gives me (宾) his (形物代) book.'
      ],
      examples: [
        { en: 'He is an English teacher.', cn: '他是一位英语老师。（主格）' },
        { en: 'Please give me a piece of cake.', cn: '请给我一块蛋糕。（宾格）' }
      ],
      tips: ['动词后面用宾格，名词前面用形物代']
    },
    {
      title: '② 现在分词变化规则',
      points: [
        '一般直接加 ing：play → playing, sleep → sleeping',
        '以 e 结尾，去 e 加 ing：make → making',
        '重读闭音节双写末尾字母：sit → sitting, run → running',
        'be quiet! He is sleeping.'
      ],
      examples: [
        { en: 'Look! The dog is sitting on the chair.', cn: '看！那只狗正坐在椅子上。' },
        { en: 'My mother is making dinner in the kitchen.', cn: '我妈妈正在厨房做晚饭。' }
      ],
      tips: ['make→making, sit→sitting 是两个最常考的变化']
    },
    {
      title: '③ 现在进行时用法',
      points: [
        '结构：be (am/is/are) + 动词 ing',
        '表示正在发生的动作：I am studying English now.',
        '标志词：now, look, listen, at the moment',
        'be 随主语变化：I am / He is / They are'
      ],
      examples: [
        { en: 'What is Jeff doing? He is watching the match.', cn: '杰夫在干什么？他正在看比赛。' },
        { en: 'Listen! Someone is singing.', cn: '听！有人在唱歌。' }
      ],
      tips: ['看到 now / look / listen → 现在进行时']
    }
  ],
  questions: [
    { type: 'choice', prompt: '— What is Mr. Black? — ______ is an English teacher.', options: ['He', 'It', 'She', 'They'], answer: 'He', explain: 'Mr. 是男性，主格用 He。' },
    { type: 'choice', prompt: 'I am hungry. Please give ______ a piece of cake.', options: ['me', 'my', 'mine', 'I'], answer: 'me', explain: '动词 give 后接宾格 me。' },
    { type: 'choice', prompt: 'Be quiet! He is ______.', options: ['sleeping', 'sleeps', 'sleepping', 'sleep'], answer: 'sleeping', explain: '现在进行时 be + doing：sleeping。' },
    { type: 'choice', prompt: 'Look! The dog is ______ on the chair.', options: ['sitting', 'siting', 'sat', 'sits'], answer: 'sitting', explain: '重读闭音节双写 t：sit → sitting。' },
    { type: 'fill', prompt: 'My mother is ______ (make) dinner in the kitchen. 用现在分词填空', answer: 'making', explain: '以 e 结尾去 e 加 ing：make → making。' },
    { type: 'choice', prompt: '— What is Jeff doing? — He ______ the football match online.', options: ['is watching', 'watches', 'watched', 'will watch'], answer: 'is watching', explain: '正在做 → is watching。' },
    { type: 'choice', prompt: 'Tom is my brother. I like playing with ______ very much.', options: ['him', 'he', 'his', 'himself'], answer: 'him', explain: '介词 with 后接宾格 him。' },
    { type: 'choice', prompt: '______ is your mother talking on the phone? — No, she is cooking.', options: ['Is', 'Are', 'Do', 'Does'], answer: 'Is', explain: '现在进行时疑问：Is + 主语 + doing?。' },
      { type: 'choice', prompt: 'Look! The boys ______ football.', options: ['play','plays','are playing','played'], answer: 'are playing', explain: 'Look! 提示现在进行时。' },
      { type: 'fill', prompt: 'Listen! Someone ______ (sing) in the next room.', answer: 'is singing', explain: 'Listen! 现在进行时。' },
      { type: 'choice', prompt: '______ are my new classmates. They are friendly.', options: ['He','She','They','It'], answer: 'They', explain: 'they 作主语。' },
      { type: 'choice', prompt: 'Please give ______ the book. (Tom)', options: ['he','him','his','he\'s'], answer: 'him', explain: '动词后接宾格。' },
      { type: 'choice', prompt: 'This is ______ pen. (I)', options: ['my','me','mine','I'], answer: 'my', explain: '名词前用形容词性物主代词。' },
      { type: 'fill', prompt: 'She ______ (do) her homework now.', answer: 'is doing', explain: 'now 现在进行时。' },
      { type: 'choice', prompt: 'The children are ______ in the park. (run)', options: ['running','runing','runs','run'], answer: 'running', explain: '重读闭音节双写。' },
      { type: 'choice', prompt: 'These are ______ books. (we)', options: ['our','us','ours','we'], answer: 'our', explain: '名词前用 our。' },
      { type: 'fill', prompt: 'I am ______ (write) a letter to my friend.', answer: 'writing', explain: '去 e 加 ing。' },
      { type: 'choice', prompt: 'Look! The cat is ______. (sleep)', options: ['sleeping','sleeps','sleepping','slept'], answer: 'sleeping', explain: '现在进行时。' },
      { type: 'choice', prompt: 'My mother is ______ dinner in the kitchen. (cook)', options: ['cooking','cooks','cook','cooked'], answer: 'cooking', explain: '现在进行时。' },
      { type: 'fill', prompt: 'They are ______ (have) lunch now.', answer: 'having', explain: '现在进行时。' },
      { type: 'choice', prompt: 'Be quiet! The baby is ______.', options: ['sleep','sleeping','slept','sleeps'], answer: 'sleeping', explain: '现在进行时。' },
      { type: 'choice', prompt: 'This is ______ bag. (Lily)', options: ['her','she','hers','she\'s'], answer: 'her', explain: '名词前用 her。' },
      { type: 'choice', prompt: 'Are you ______ English now? (study)', options: ['studying','study','studys','studied'], answer: 'studying', explain: '现在进行时。' },
      { type: 'fill', prompt: 'Tom and I are ______ (play) games.', answer: 'playing', explain: '现在进行时。' },
      { type: 'choice', prompt: '______ is making a model plane. (Tom)', options: ['He','She','It','They'], answer: 'He', explain: '男性用 He。' },
      { type: 'choice', prompt: 'What ______ you doing now?', options: ['am','is','are','be'], answer: 'are', explain: 'you 用 are。' }
  ]
},

/* ============================================================
   6A-G3 名词的数（六上 U3 Food）
============================================================ */
{
  id: '6a-nouns',
  grade: '6A',
  title: '名词的数（可数/不可数）',
  unit: '六上 U3 Food',
  emoji: '🍎',
  color: 'c-teal',
  summary: '可数名词复数变化规则 + 不可数名词用法，是六上最基础的语法',
  lessons: [
    {
      title: '① 可数名词 vs 不可数名词',
      points: [
        '可数：可以用数目计算，有单复数：apple, book, student',
        '不可数：不能计数，无复数：water, milk, rice, information',
        '不可数名词前不能直接加 a/an 或数词',
        '不可数名词可用量词：a cup of tea, a piece of bread'
      ],
      examples: [
        { en: 'I like apples and oranges.', cn: '我喜欢苹果和橘子。（可数复数）' },
        { en: 'There is some milk in the glass.', cn: '杯子里有一些牛奶。（不可数）' }
      ],
      tips: ['water/milk/rice/bread/meat 都是不可数，别加 s']
    },
    {
      title: '② 可数名词复数规则变化',
      points: [
        '一般加 s：book → books, cat → cats',
        '以 s/x/ch/sh 结尾加 es：bus → buses, box → boxes, watch → watches',
        '辅音 + y 结尾，变 y 为 i 加 es：baby → babies, city → cities',
        '以 o 结尾：有生命加 es（tomato→tomatoes），无生命加 s（photo→photos）'
      ],
      examples: [
        { en: 'There are three boxes on the desk.', cn: '桌上三个盒子。' },
        { en: 'The babies are sleeping.', cn: '婴儿们在睡觉。' }
      ],
      tips: ['o 结尾口诀：英雄吃土豆西红柿（heroes, potatoes, tomatoes）加 es']
    },
    {
      title: '③ 不规则复数（六年级必背）',
      points: [
        'man → men, woman → women（男人女人）',
        'child → children（孩子）',
        'foot → feet, tooth → teeth（脚、牙）',
        '单复数同形：sheep, deer, fish；mouse → mice'
      ],
      examples: [
        { en: 'There are many children in the park.', cn: '公园里有很多孩子。' },
        { en: 'I have two feet, and you have two feet too.', cn: '我有两只脚，你也有两只脚。' }
      ],
      tips: ['sheep 单复数一样，一只羊 a sheep，两只羊 two sheep']
    }
  ],
  questions: [
    { type: 'choice', prompt: 'There are three ______ on the desk.', options: ['boxes', 'boxs', 'box', 'boxies'], answer: 'boxes', explain: 'box 以 x 结尾加 es：boxes。' },
    { type: 'fill', prompt: '写出复数：baby → ______', answer: 'babies', explain: '辅音+y 结尾，变 y 为 i 加 es：babies。' },
    { type: 'choice', prompt: 'I like ______. They are my favourite fruit.', options: ['oranges', 'orange', 'an orange', 'orangees'], answer: 'oranges', explain: '泛指喜欢某类食物用复数：oranges。' },
    { type: 'choice', prompt: 'There is some ______ in the glass.', options: ['milk', 'milks', 'a milk', 'the milks'], answer: 'milk', explain: 'milk 不可数，无复数形式。' },
    { type: 'fill', prompt: '写出复数：child → ______', answer: 'children', explain: 'child 的不规则复数：children。' },
    { type: 'choice', prompt: 'There are two ______ on the farm.', options: ['sheep', 'sheeps', 'a sheep', 'sheepes'], answer: 'sheep', explain: 'sheep 单复数同形。' },
    { type: 'choice', prompt: 'How many ______ do you have?', options: ['feet', 'foot', 'foots', 'feets'], answer: 'feet', explain: 'foot 的复数不规则：feet。' },
    { type: 'choice', prompt: 'I have a cup of ______ every morning.', options: ['tea', 'teas', 'a tea', 'the teas'], answer: 'tea', explain: 'tea 不可数，用量词 a cup of。' },
      { type: 'fill', prompt: '写出复数：box → ______', answer: 'boxes', explain: 'box 加 es。' },
      { type: 'choice', prompt: 'There are two ______ in the room.', options: ['watchs','watches','watch','watchies'], answer: 'watches', explain: 'watch 加 es。' },
      { type: 'fill', prompt: '写出复数：leaf → ______', answer: 'leaves', explain: 'f 结尾变 v 加 es。' },
      { type: 'choice', prompt: 'I have many ______ on the wall. (photo)', options: ['photos','photoes','photo','photoies'], answer: 'photos', explain: '无生命 o 加 s。' },
      { type: 'fill', prompt: '写出复数：potato → ______', answer: 'potatoes', explain: '有生命 o 加 es。' },
      { type: 'choice', prompt: 'There are many ______ in the zoo. (animal)', options: ['animal','animals','animalses','animalles'], answer: 'animals', explain: '规则复数加 s。' },
      { type: 'fill', prompt: '写出复数：family → ______', answer: 'families', explain: '辅音+y 变 y 为 i 加 es。' },
      { type: 'choice', prompt: 'I\'d like two ______ of tea, please.', options: ['cup','cups','cupes','a cup'], answer: 'cups', explain: '量词复数。' },
      { type: 'fill', prompt: '写出复数：knife → ______', answer: 'knives', explain: 'f 结尾变 v 加 es。' },
      { type: 'choice', prompt: 'There is some ______ on the table. (bread)', options: ['bread','breads','a bread','breades'], answer: 'bread', explain: '不可数名词。' },
      { type: 'fill', prompt: '写出复数：tooth → ______', answer: 'teeth', explain: '不规则复数。' },
      { type: 'choice', prompt: 'How many ______ are there in your class? (student)', options: ['student','students','studentes','a student'], answer: 'students', explain: 'how many 后接复数。' },
      { type: 'fill', prompt: '写出复数：woman → ______', answer: 'women', explain: '不规则复数。' },
      { type: 'choice', prompt: 'The ______ are playing in the yard. (child)', options: ['child','childs','children','childrens'], answer: 'children', explain: 'child 不规则复数。' },
      { type: 'fill', prompt: '写出复数：bus → ______', answer: 'buses', explain: 'bus 加 es。' },
      { type: 'choice', prompt: 'Please give me a piece of ______. (paper)', options: ['paper','papers','a paper','paperes'], answer: 'paper', explain: '不可数名词。' },
      { type: 'fill', prompt: '写出复数：tomato → ______', answer: 'tomatoes', explain: '有生命 o 加 es。' },
      { type: 'choice', prompt: 'How much ______ do you need? (water)', options: ['water','waters','a water','waters'], answer: 'water', explain: '不可数名词。' }
  ]
},

/* ============================================================
   6A-G4 情态动词 can + 频度副词（六上 U4 Sports）
============================================================ */
{
  id: '6a-can',
  grade: '6A',
  title: '情态动词 can + 频度副词',
  unit: '六上 U4 Sports',
  emoji: '⚽',
  color: 'c-coral',
  summary: 'can 表"能/会"，后接动词原形；频度副词表示动作频率',
  lessons: [
    {
      title: '① can 表示能力',
      points: [
        'can + 动词原形：表示"能、会"',
        '没有人称变化：He can swim. （不是 cans）',
        '否定：can\u0027t = cannot（不能、不会）',
        '疑问：Can + 主语 + 动词原形?'
      ],
      examples: [
        { en: 'I can play basketball very well.', cn: '我篮球打得很好。' },
        { en: 'She can\u0027t swim.', cn: '她不会游泳。' }
      ],
      tips: ['can 后面永远接动词原形！']
    },
    {
      title: '② can 的疑问句与回答',
      points: [
        'Can you play football? Yes, I can. / No, I can\u0027t.',
        'What can you do? I can cook meals.',
        'Can I join you? 我可以加入你们吗？（表请求）',
        'can 表能力、请求、允许'
      ],
      examples: [
        { en: '— Can you run fast? — Yes, I can.', cn: '—— 你能跑得快吗？—— 能。' },
        { en: 'Can I use your pen, please?', cn: '请问我能用你的钢笔吗？' }
      ],
      tips: ['Can I...? 是礼貌请求的万能句型']
    },
    {
      title: '③ 频度副词',
      points: [
        '频率从高到低：always > usually > often > sometimes > never',
        '位置：实义动词前（I often read books.）',
        'be 动词后（She is always happy.）',
        'How often 问频率：How often do you play basketball?'
      ],
      examples: [
        { en: 'They usually go swimming on weekends.', cn: '他们通常周末去游泳。' },
        { en: '— How often do you exercise? — Twice a week.', cn: '—— 你多久锻炼一次？—— 一周两次。' }
      ],
      tips: ['always 永远>usually 通常>often 经常>sometimes 有时>never 从不']
    }
  ],
  questions: [
    { type: 'choice', prompt: 'I ______ play basketball very well.', options: ['can', 'cans', 'can to', 'canning'], answer: 'can', explain: 'can + 动词原形，无人称变化。' },
    { type: 'choice', prompt: 'She ______ swim, but she can dance.', options: ['can\u0027t', 'can', 'don\u0027t', 'isn\u0027t'], answer: 'can\u0027t', explain: '但会跳舞 → 游泳不会 → can\u0027t。' },
    { type: 'choice', prompt: '— Can you play football? — Yes, I ______.', options: ['can', 'do', 'am', 'could'], answer: 'can', explain: 'can 问句肯定回答：Yes, I can.。' },
    { type: 'fill', prompt: 'They usually go ______ (swim) on weekends. 用动名词填空', answer: 'swimming', explain: 'go + doing：go swimming（去游泳）。' },
    { type: 'choice', prompt: 'She is ______ happy. (从频度副词选最合适的)', options: ['always', 'never', 'sometimes', 'all correct possible'], answer: 'all correct possible', explain: '频度副词都能放 be 后，语义不同但语法都对；此题考位置 → 放 be 动词后。' },
    { type: 'choice', prompt: '— ______ often do you play basketball? — Twice a week.', options: ['How', 'What', 'When', 'Where'], answer: 'How', explain: '问频率用 How often。' },
    { type: 'fill', prompt: 'I like ______ (run) because it makes me strong. 用动名词填空', answer: 'running', explain: 'like + doing：like running。' },
    { type: 'choice', prompt: 'He ______ play the violin every weekend, but his brother plays every day.', options: ['plays', 'play', 'playing', 'to play'], answer: 'plays', explain: 'he 三单 → plays。' },
      { type: 'choice', prompt: '______ you play chess?', options: ['Can','Do','Are','Is'], answer: 'Can', explain: 'can 表能力。' },
      { type: 'fill', prompt: 'He can ______ (swim) very fast.', answer: 'swim', explain: 'can 后接动词原形。' },
      { type: 'choice', prompt: 'I ______ ride a bike, but I can drive a car.', options: ['can','can\'t','could','should'], answer: 'can\'t', explain: '不会骑车。' },
      { type: 'choice', prompt: 'She ______ dance very well.', options: ['can','cans','is','are'], answer: 'can', explain: 'can 无人称变化。' },
      { type: 'fill', prompt: 'I usually get up ______ six o\'clock.', answer: 'at', explain: 'at + 时间点。' },
      { type: 'choice', prompt: 'He is ______ late for school. He always comes on time. (从不)', options: ['never','always','usually','often'], answer: 'never', explain: '从不迟到。' },
      { type: 'choice', prompt: '______ often do you go swimming?', options: ['How','What','When','Where'], answer: 'How', explain: 'How often 问频率。' },
      { type: 'fill', prompt: 'She ______ (can not) speak French.', answer: 'can\'t', explain: 'cannot 缩写。' },
      { type: 'choice', prompt: '______ you help me with this box?', options: ['Can','Am','Is','Are'], answer: 'Can', explain: 'can 表请求。' },
      { type: 'choice', prompt: 'They ______ play volleyball very well.', options: ['can','cans','is','are'], answer: 'can', explain: 'can 无人称变化。' },
      { type: 'fill', prompt: 'My brother usually does his homework ______ night.', answer: 'at', explain: 'at night。' },
      { type: 'choice', prompt: 'I ______ go to bed early. (通常)', options: ['usually','never','always never','sometimes'], answer: 'usually', explain: '通常。' },
      { type: 'choice', prompt: 'Can she ______ the piano?', options: ['play','plays','playing','played'], answer: 'play', explain: 'can 后接原形。' },
      { type: 'fill', prompt: 'He ______ (often) reads books after school.', answer: 'often', explain: '频度副词放实义动词前。' },
      { type: 'choice', prompt: '______ I borrow your pen, please?', options: ['Can','Am','Is','Are'], answer: 'Can', explain: 'can 表请求。' },
      { type: 'choice', prompt: 'She can ______ English songs.', options: ['sing','sings','singing','sang'], answer: 'sing', explain: 'can 后接原形。' },
      { type: 'fill', prompt: 'They sometimes ______ (watch) TV on weekends.', answer: 'watch', explain: 'sometimes + 一般现在时。' },
      { type: 'choice', prompt: 'I like ______ in summer. (swim)', options: ['swimming','swim','swims','swum'], answer: 'swimming', explain: 'like + doing。' }
  ]
},

/* ============================================================
   6A-G5 形容词比较级（基础）（六上 U5 Animals and us）
============================================================ */
{
  id: '6a-comparative',
  grade: '6A',
  title: '形容词比较级（基础）',
  unit: '六上 U5 Animals and us',
  emoji: '🐼',
  color: 'c-green',
  summary: '形容词 + er 表"更…"，than 引出比较对象，7A 比较级的铺垫',
  lessons: [
    {
      title: '① 比较级规则变化',
      points: [
        '一般加 er：fast → faster, strong → stronger',
        '以 e 结尾加 r：cute → cuter, nice → nicer',
        '辅音 + y 结尾，变 y 为 i 加 er：happy → happier',
        '重读闭音节双写：big → bigger, thin → thinner'
      ],
      examples: [
        { en: 'Pandas are cuter than tigers.', cn: '熊猫比老虎更可爱。' },
        { en: 'This box is bigger than that one.', cn: '这个盒子比那个大。' }
      ],
      tips: ['比较级 = 形容词原级 + er（短词）']
    },
    {
      title: '② than 引出比较对象',
      points: [
        '结构：A + be + 比较级 + than + B',
        'She is taller than her sister.',
        '比较级前可加 much / a little 表示程度',
        'much taller 高得多；a little faster 快一点'
      ],
      examples: [
        { en: 'Dogs are friendlier than cats.', cn: '狗比猫更友好。' },
        { en: 'He is much taller than his brother.', cn: '他比他弟弟高得多。' }
      ],
      tips: ['than 是"比"，前后是比较的两个人/物']
    },
    {
      title: '③ 常见易错',
      points: [
        '比较级用于两者之间，不能用最高级',
        '比较对象要同类：My bag is heavier than yours.',
        '不规则（六上先了解）：good → better, bad → worse',
        '后面详细学习在 7A U5'
      ],
      examples: [
        { en: 'My bag is heavier than yours.', cn: '我的包比你的重。' },
        { en: 'This film is better than that one.', cn: '这部电影比那部好。' }
      ],
      tips: ['good 的比较级是 better，不是 gooder！']
    }
  ],
  questions: [
    { type: 'fill', prompt: '写出比较级：fast → ______', answer: 'faster', explain: '一般直接加 er：faster。' },
    { type: 'fill', prompt: '写出比较级：cute → ______', answer: 'cuter', explain: '以 e 结尾加 r：cuter。' },
    { type: 'choice', prompt: 'Pandas are ______ than tigers.', options: ['cuter', 'cute', 'cutest', 'most cute'], answer: 'cuter', explain: '两者比较用比较级 cuter。' },
    { type: 'choice', prompt: 'This box is ______ than that one.', options: ['bigger', 'big', 'biggest', 'more big'], answer: 'bigger', explain: '重读闭音节双写 g：big → bigger。' },
    { type: 'choice', prompt: 'He is much ______ than his brother.', options: ['taller', 'tall', 'tallest', 'more tall'], answer: 'taller', explain: 'much + 比较级：高得多。' },
    { type: 'choice', prompt: 'My bag is heavier than ______.', options: ['yours', 'you', 'your', 'yours bag'], answer: 'yours', explain: '比较对象同类：yours = your bag。' },
    { type: 'choice', prompt: 'good 的比较级是 ______.', options: ['better', 'gooder', 'best', 'more good'], answer: 'better', explain: 'good 的不规则比较级：better。' },
    { type: 'fill', prompt: '写出比较级：happy → ______', answer: 'happier', explain: '辅音+y 结尾，变 y 为 i 加 er：happier。' },
      { type: 'fill', prompt: '写出比较级：big → ______', answer: 'bigger', explain: '重读闭音节双写。' },
      { type: 'choice', prompt: 'This box is ______ than that one. (heavy)', options: ['heavier','heavyer','more heavy','heaviest'], answer: 'heavier', explain: '辅音+y 变 y 为 i 加 er。' },
      { type: 'fill', prompt: '写出比较级：thin → ______', answer: 'thinner', explain: '重读闭音节双写。' },
      { type: 'choice', prompt: 'She is ______ than her sister. (tall)', options: ['taller','tall','tallest','more tall'], answer: 'taller', explain: '加 er。' },
      { type: 'fill', prompt: '写出比较级：nice → ______', answer: 'nicer', explain: '以 e 结尾加 r。' },
      { type: 'choice', prompt: 'My bike is ______ than yours. (good)', options: ['better','gooder','best','more good'], answer: 'better', explain: 'good 不规则比较级。' },
      { type: 'fill', prompt: '写出比较级：early → ______', answer: 'earlier', explain: '辅音+y 变 y 为 i 加 er。' },
      { type: 'choice', prompt: 'He runs ______ than me. (fast)', options: ['faster','fast','fastest','more fast'], answer: 'faster', explain: '加 er。' },
      { type: 'choice', prompt: 'Which is ______, this one or that one? (big)', options: ['bigger','big','biggest','more big'], answer: 'bigger', explain: '两者比较用比较级。' },
      { type: 'fill', prompt: '写出比较级：hot → ______', answer: 'hotter', explain: '重读闭音节双写。' },
      { type: 'choice', prompt: 'The weather today is ______ than yesterday. (warm)', options: ['warmer','warm','warmest','more warm'], answer: 'warmer', explain: '加 er。' },
      { type: 'fill', prompt: '写出比较级：easy → ______', answer: 'easier', explain: '辅音+y 变 y 为 i 加 er。' },
      { type: 'choice', prompt: 'Tom is ______ than Jack. (old)', options: ['older','old','oldest','more old'], answer: 'older', explain: '加 er。' },
      { type: 'choice', prompt: 'This film is ______ than that one. (interesting)', options: ['more interesting','interestinger','most interesting','interesting'], answer: 'more interesting', explain: '多音节词用 more。' },
      { type: 'choice', prompt: 'bad 的比较级是 ______.', options: ['worse','badder','worst','more bad'], answer: 'worse', explain: 'bad 不规则比较级。' },
      { type: 'fill', prompt: '写出比较级：long → ______', answer: 'longer', explain: '加 er。' },
      { type: 'choice', prompt: 'Dogs are ______ than cats. (friendly)', options: ['friendlier','more friendly','most friendly','friendlyer'], answer: 'friendlier', explain: '辅音+y 变 y 为 i 加 er。' },
      { type: 'choice', prompt: 'The boy is much ______ than his brother. (tall)', options: ['taller','tall','tallest','more tall'], answer: 'taller', explain: 'much + 比较级。' }
  ]
},

/* ============================================================
   6A-G6 一般将来时 + 附加疑问句（六上 U6 Travelling around China）
============================================================ */
{
  id: '6a-future-tag',
  grade: '6A',
  title: '一般将来时 + 附加疑问句',
  unit: '六上 U6 Travelling around China',
  emoji: '✈️',
  color: 'c-amber',
  summary: 'will / be going to 表将来；反意疑问句"前肯后否"是中考必考点',
  lessons: [
    {
      title: '① 一般将来时两种结构',
      points: [
        'will + 动词原形：表将来（较随意/即时决定）',
        'be going to + 动词原形：表计划/打算（有准备）',
        'I will visit Beijing next month. / I am going to visit Guilin.',
        '否定：won\u0027t / am not going to'
      ],
      examples: [
        { en: 'We are going to travel around China this summer.', cn: '今年夏天我们打算游遍中国。' },
        { en: 'It will be sunny tomorrow.', cn: '明天会是晴天。' }
      ],
      tips: ['be going to 有"打算"，will 更随意——考试爱考区分']
    },
    {
      title: '② 附加疑问句（反意疑问句）',
      points: [
        '结构："陈述句 + 简短疑问"，前肯后否、前否后肯',
        'He is a teacher, isn\u0027t he? 他是老师，不是吗？',
        'They aren\u0027t students, are they? 他们不是学生，对吗？',
        'there be 句型：There is a park, isn\u0027t there?'
      ],
      examples: [
        { en: 'Everyone is here, aren\u0027t they?', cn: '所有人都到了，是吗？' },
        { en: 'She can swim, can\u0027t she?', cn: '她会游泳，不是吗？' }
      ],
      tips: ['前肯后否、前否后肯——附加疑问句的铁律']
    },
    {
      title: '③ 附加疑问句回答（易错）',
      points: [
        '回答按事实，不管问句形式',
        '— He isn\u0027t a teacher, is he? — Yes, he is. 不，他是。（事实是）',
        '— No, he isn\u0027t. 是的，他不是。（事实不是）',
        '中文翻译容易反，做题按"事实"判断'
      ],
      examples: [
        { en: '— It isn\u0027t cold today, is it? — Yes, it is.', cn: '—— 今天不冷，是吗？—— 不，很冷。（按事实）' },
        { en: 'There are no books on the desk, are there?', cn: '桌上没有书，对吗？' }
      ],
      tips: ['回答看事实：事实是肯定的就 Yes，否定的就 No']
    }
  ],
  questions: [
    { type: 'choice', prompt: 'We ______ travel around China this summer.', options: ['are going to', 'is going to', 'will to', 'going to'], answer: 'are going to', explain: 'be going to + 动词原形，we 用 are。' },
    { type: 'choice', prompt: 'It ______ be sunny tomorrow.', options: ['will', 'is', 'are', 'does'], answer: 'will', explain: 'will + 动词原形表将来。' },
    { type: 'fill', prompt: 'I ______ going to visit my grandparents this weekend. （用 am / is / are 填空）', answer: 'am', explain: 'I 用 am：I am going to。' },
    { type: 'choice', prompt: 'He is a teacher, ______ he?', options: ['isn\u0027t', 'is', 'doesn\u0027t', 'does'], answer: 'isn\u0027t', explain: '前肯后否：is → isn\u0027t he?。' },
    { type: 'choice', prompt: 'They aren\u0027t students, ______ they?', options: ['are', 'aren\u0027t', 'do', 'don\u0027t'], answer: 'are', explain: '前否后肯：aren\u0027t → are they?。' },
    { type: 'choice', prompt: 'There is a park near here, ______ there?', options: ['isn\u0027t', 'is', 'are', 'aren\u0027t'], answer: 'isn\u0027t', explain: 'there be 的附加疑问句用 there：isn\u0027t there?。' },
    { type: 'choice', prompt: '— He isn\u0027t a teacher, is he? — ______. He teaches English.', options: ['Yes, he is', 'No, he isn\u0027t', 'Yes, he isn\u0027t', 'No, he is'], answer: 'Yes, he is', explain: '事实是老师 → Yes, he is.（译为"不，他是"）。' },
    { type: 'fill', prompt: 'We ______ (not) be late for the train. 用 will 的否定填空', answer: 'won\u0027t', explain: 'will not = won\u0027t：我们不会迟到。' },
      { type: 'choice', prompt: 'We ______ have a meeting tomorrow.', options: ['will','are','were','had'], answer: 'will', explain: 'tomorrow 表将来。' },
      { type: 'fill', prompt: 'She ______ going to visit Beijing next month.', answer: 'is', explain: 'be going to 结构。' },
      { type: 'choice', prompt: 'They ______ play football this afternoon.', options: ['are going to','is going to','will to','go to'], answer: 'are going to', explain: 'be going to。' },
      { type: 'choice', prompt: 'It ______ rain tomorrow.', options: ['won\'t','isn\'t','doesn\'t','didn\'t'], answer: 'won\'t', explain: 'will not 缩写。' },
      { type: 'fill', prompt: 'I ______ going to be a doctor.', answer: 'am', explain: 'I 用 am。' },
      { type: 'choice', prompt: 'He is a student, ______ he?', options: ['isn\'t','is','doesn\'t','does'], answer: 'isn\'t', explain: '前肯后否。' },
      { type: 'choice', prompt: 'You like coffee, ______ you?', options: ['don\'t','do','aren\'t','are'], answer: 'don\'t', explain: '前肯后否，实义动词用 don\'t。' },
      { type: 'fill', prompt: 'There ______ a test next week. (will)', answer: 'will be', explain: 'there will be。' },
      { type: 'choice', prompt: 'She can swim, ______ she?', options: ['can\'t','can','isn\'t','is'], answer: 'can\'t', explain: '前肯后否。' },
      { type: 'choice', prompt: 'They aren\'t teachers, ______ they?', options: ['are','aren\'t','do','don\'t'], answer: 'are', explain: '前否后肯。' },
      { type: 'fill', prompt: '______ you be free this weekend?', answer: 'Will', explain: 'Will you...?。' },
      { type: 'choice', prompt: 'It\'s a nice day, ______ it?', options: ['isn\'t','is','doesn\'t','does'], answer: 'isn\'t', explain: '前肯后否。' },
      { type: 'choice', prompt: 'He will ______ his homework tonight.', options: ['do','does','doing','did'], answer: 'do', explain: 'will 后接原形。' },
      { type: 'choice', prompt: 'There are many students, ______ there?', options: ['aren\'t','are','isn\'t','is'], answer: 'aren\'t', explain: 'there be 附加疑问。' },
      { type: 'fill', prompt: 'We ______ (not) be late for the train.', answer: 'won\'t', explain: 'will not。' },
      { type: 'choice', prompt: 'You were late yesterday, ______ you?', options: ['weren\'t','were','didn\'t','did'], answer: 'weren\'t', explain: '前肯后否。' },
      { type: 'choice', prompt: 'She is going to ______ a film this evening.', options: ['see','sees','seeing','saw'], answer: 'see', explain: 'be going to 后接原形。' },
      { type: 'choice', prompt: '______ we go to the park? (提建议)', options: ['Shall','Do','Are','Have'], answer: 'Shall', explain: 'Shall we...?。' }
  ]
},

/* ============================================================
   6B-G1 一般将来时（六下 U1 Everyone is different）
============================================================ */
{
  id: '6b-future',
  grade: '6B',
  title: '一般将来时 will/shall',
  unit: '六下 U1 Everyone is different',
  emoji: '🌟',
  color: 'c-blue',
  summary: 'will/shall + 动词原形：表示将来要发生的动作或状态，六下第一个新时态',
  lessons: [
    {
      title: '① 什么时候用一般将来时？',
      points: [
        '表示将来某个时间要发生的动作或存在的状态',
        '也表示将来经常、反复发生的动作',
        '常配 tomorrow / next week / this weekend / in the future 等时间',
        '这是六下第一次系统学"将来"概念'
      ],
      examples: [
        { en: 'We will have a class meeting tomorrow.', cn: '我们明天将举行班会。' },
        { en: 'I will visit my grandparents this weekend.', cn: '这周末我将去看望祖父母。' }
      ],
      tips: ['看到 tomorrow / next week 这类"将来时间词"，就用一般将来时']
    },
    {
      title: '② 怎么构成？',
      points: [
        '肯定：will / shall + 动词原形（shall 只用于第一人称 I / We，常被 will 替代）',
        '否定：will not = won\u0027t；shall not = shan\u0027t',
        '疑问：Will + 主语 + 动词原形...?',
        'will 在陈述句可用于任何人称，征求意见时常用第二人称'
      ],
      examples: [
        { en: 'I will be a scientist in the future.', cn: '我将来会成为科学家。' },
        { en: 'It won\u0027t rain tomorrow.', cn: '明天不会下雨。' }
      ],
      tips: ['will 后面永远跟动词原形，没有人称变化']
    },
    {
      title: '③ 疑问句与征求意见',
      points: [
        'Will you...? 常用于询问/请求：Will you be at home at seven?',
        'Shall I...? / Shall we...? 表示"要不要我/我们…"，征求意见',
        '肯定回答：Yes, I will. 否定：No, I won\u0027t.'
      ],
      examples: [
        { en: 'Will you help me with my homework?', cn: '你愿意帮我做作业吗？' },
        { en: 'Shall I open the window?', cn: '要我开窗吗？' }
      ],
      tips: ['Shall 只跟 I / we 搭配，其他用 Will']
    },
    {
      title: '④ 指示代词 this/that/these/those',
      points: [
        'this / these 指近处；that / those 指远处',
        'this / that 接单数名词；these / those 接复数名词',
        '打电话时：This is John. Who is that speaking?',
        'that / those 可替代前面提到过的名词避免重复'
      ],
      examples: [
        { en: 'These books are mine, and those are yours.', cn: '这些书是我的，那些是你的。' },
        { en: 'The weather in Shanghai is warmer than that in Beijing.', cn: '上海的天气比北京的暖和。' }
      ],
      tips: ['看到 these / those，后面的名词一定是复数']
    }
  ],
  questions: [
    { type: 'choice', prompt: 'We ______ have a class meeting tomorrow.', options: ['will', 'are', 'were', 'had'], answer: 'will', explain: 'tomorrow 是将来时间词 → will + 动词原形。' },
    { type: 'fill', prompt: 'I ______ (visit) my grandparents this weekend. 用一般将来时填空', answer: 'will visit', explain: 'this weekend 表将来 → will + 动词原形 visit。' },
    { type: 'choice', prompt: '______ you be at home at seven this evening?', options: ['Will', 'Are', 'Do', 'Were'], answer: 'Will', explain: 'Will + 主语 + 动词原形构成一般疑问句。' },
    { type: 'choice', prompt: 'It ______ rain tomorrow.', options: ['won\u0027t', 'isn\u0027t', 'doesn\u0027t', 'didn\u0027t'], answer: 'won\u0027t', explain: 'will not = won\u0027t（不会），表将来否定。' },
    { type: 'fill', prompt: '______ I open the window? （用 shall / will / do 之一）', answer: 'Shall', explain: 'Shall I...? 征求意见"要我…吗"，shall 只用于第一人称。' },
    { type: 'choice', prompt: '______ books on the desk are mine. (指着近处的书)', options: ['These', 'Those', 'This', 'That'], answer: 'These', explain: '近处 + 复数 → these，后面接复数名词 books。' },
    { type: 'fill', prompt: 'The days in summer are longer than ______ in winter. (用 that / those / it 填空)', answer: 'those', explain: 'those 替代前面提到的 the days，避免重复。' },
    { type: 'choice', prompt: 'I am going to ______ my grandma this weekend. (be going to 后接?)', options: ['visit', 'visiting', 'visited', 'visits'], answer: 'visit', explain: 'be going to + 动词原形，也表示将来（计划）。' },
      { type: 'choice', prompt: 'I ______ help you with your homework.', options: ['will','am','are','were'], answer: 'will', explain: 'will 表将来。' },
      { type: 'fill', prompt: 'We ______ (go) to the park tomorrow.', answer: 'will go', explain: 'will + 原形。' },
      { type: 'choice', prompt: 'Shall ______ open the door?', options: ['I','he','she','they'], answer: 'I', explain: 'Shall 只接第一人称。' },
      { type: 'choice', prompt: 'It ______ be sunny tomorrow.', options: ['will','is','are','does'], answer: 'will', explain: '将来时。' },
      { type: 'fill', prompt: '______ you come to my birthday party?', answer: 'Will', explain: 'Will you...?。' },
      { type: 'choice', prompt: 'He ______ visit his uncle next week.', options: ['will','is','does','did'], answer: 'will', explain: '将来时。' },
      { type: 'choice', prompt: 'These ______ are my new books. (近处复数)', options: ['these','those','this','that'], answer: 'these', explain: '近处复数用 these。' },
      { type: 'fill', prompt: '______ is my father over there. (远处单数)', answer: 'That', explain: '远处单数用 that。' },
      { type: 'choice', prompt: 'Will they ______ here on time?', options: ['be','are','is','being'], answer: 'be', explain: 'will 后接原形。' },
      { type: 'choice', prompt: 'I ______ go to school tomorrow. (不会)', options: ['won\'t','will','am','don\'t'], answer: 'won\'t', explain: 'will not。' },
      { type: 'fill', prompt: 'Look at ______ flowers. They are beautiful. (近处复数)', answer: 'these', explain: '近处复数 these。' },
      { type: 'choice', prompt: 'Shall we ______ a rest?', options: ['have','has','having','had'], answer: 'have', explain: 'shall 后接原形。' },
      { type: 'choice', prompt: 'The weather in Shanghai is warmer than ______ in Beijing. (替代)', options: ['that','this','those','these'], answer: 'that', explain: 'that 替代不可数。' },
      { type: 'fill', prompt: 'I will ______ (study) hard this term.', answer: 'study', explain: 'will 后接原形。' },
      { type: 'choice', prompt: '______ book do you like best? (哪个)', options: ['Which','This','These','Those'], answer: 'Which', explain: 'which 哪个。' },
      { type: 'choice', prompt: 'She won\'t ______ late for school.', options: ['be','is','are','being'], answer: 'be', explain: 'won\'t 后接原形。' },
      { type: 'fill', prompt: 'We shall ______ (meet) at the school gate.', answer: 'meet', explain: 'shall 后接原形。' },
      { type: 'choice', prompt: 'These apples are bigger than ______ on the table. (远处复数)', options: ['those','these','that','this'], answer: 'those', explain: 'those 替代复数。' }
  ]
},

/* ============================================================
   6B-G2 祈使句 + must（六下 U2 Rules around us）
============================================================ */
{
  id: '6b-imperative',
  grade: '6B',
  title: '祈使句 + 情态动词 must',
  unit: '六下 U2 Rules around us',
  emoji: '🚦',
  color: 'c-coral',
  summary: '祈使句表命令/请求/建议；must 表"必须"，mustn\u0027t 表"禁止"',
  lessons: [
    {
      title: '① 什么是祈使句？',
      points: [
        '用来表示命令、请求、建议、劝告的句子',
        '通常省略主语 you，以动词原形开头',
        '句末用句号或感叹号',
        '如：Be quiet! / Open the door, please.'
      ],
      examples: [
        { en: 'Keep quiet in the library.', cn: '在图书馆保持安静。' },
        { en: 'Please open the door.', cn: '请开门。' }
      ],
      tips: ['祈使句 = 直接说"动词"，主语 you 省略']
    },
    {
      title: '② 否定祈使句',
      points: [
        '否定：Don\u0027t + 动词原形',
        'Don\u0027t be late! 不要迟到！',
        'Don\u0027t run in the hallway. 不要在走廊跑。',
        '强调形式：Do + 祈使句（Do come! 一定要来！）'
      ],
      examples: [
        { en: 'Don\u0027t be late for school again!', cn: '别再迟到了！' },
        { en: 'Don\u0027t talk loudly in the hospital.', cn: '不要在病房大声说话。' }
      ],
      tips: ['否定祈使句用 Don\u0027t + 动词原形，be 也不例外（Don\u0027t be）']
    },
    {
      title: '③ 情态动词 must / mustn\u0027t',
      points: [
        'must 表"必须"，没有人称变化，后接动词原形',
        'mustn\u0027t (must not) 表"禁止、不允许"',
        'must 还可表有把握的推测"一定"（只用于肯定句）',
        'must 强调主观"必须"；have to 强调客观"不得不"'
      ],
      examples: [
        { en: 'We must follow the rules.', cn: '我们必须遵守规则。' },
        { en: 'You mustn\u0027t play with fire.', cn: '你不准玩火。' }
      ],
      tips: ['must 自己就是"必须"，mustn\u0027t 是"禁止"——正好相反']
    }
  ],
  questions: [
    { type: 'choice', prompt: '______ quiet in the library, please.', options: ['Keep', 'Keeps', 'Keeping', 'Kept'], answer: 'Keep', explain: '祈使句以动词原形开头：Keep quiet。' },
    { type: 'fill', prompt: '______ be late for school again! （用 Don\u0027t / Not / No 填空）', answer: 'Don\u0027t', explain: '否定祈使句：Don\u0027t + 动词原形。' },
    { type: 'choice', prompt: '______ run in the hallway.', options: ['Don\u0027t', 'Not', 'No', 'Isn\u0027t'], answer: 'Don\u0027t', explain: '否定祈使句用 Don\u0027t + 动词原形。' },
    { type: 'choice', prompt: 'We ______ follow the school rules.', options: ['must', 'mustn\u0027t', 'be', 'are'], answer: 'must', explain: 'must + 动词原形，表"必须"。' },
    { type: 'fill', prompt: 'You ______ play with fire. It\u0027s dangerous. （用 must / mustn\u0027t 填空）', answer: 'mustn\u0027t', explain: '玩火是被禁止的 → mustn\u0027t（禁止）。' },
    { type: 'choice', prompt: 'He must ______ a middle school student. He looks so young.', options: ['be', 'is', 'are', 'was'], answer: 'be', explain: 'must + 动词原形；这里是推测"一定"。' },
    { type: 'choice', prompt: '______ come to the party! (表示强调)', options: ['Do', 'Does', 'Did', 'Doing'], answer: 'Do', explain: 'Do + 祈使句表强调：一定要来！' },
    { type: 'choice', prompt: 'It\u0027s raining. I ______ take an umbrella.', options: ['have to', 'mustn\u0027t', 'don\u0027t have to', 'needn\u0027t'], answer: 'have to', explain: '下雨是客观情况 → have to（不得不）。' },
      { type: 'choice', prompt: '______ quiet, please!', options: ['Be','Is','Are','Do'], answer: 'Be', explain: '祈使句 Be quiet。' },
      { type: 'fill', prompt: '______ (not) open the door. It\'s cold.', answer: 'Don\'t', explain: '否定祈使句。' },
      { type: 'choice', prompt: 'You ______ finish your homework first.', options: ['must','mustn\'t','need','can\'t'], answer: 'must', explain: '必须。' },
      { type: 'choice', prompt: '______ touch the machine! It\'s dangerous.', options: ['Don\'t','Not','No','Isn\'t'], answer: 'Don\'t', explain: '否定祈使句。' },
      { type: 'fill', prompt: '______ (be) careful with the knife.', answer: 'Be', explain: '祈使句 Be careful。' },
      { type: 'choice', prompt: 'Students ______ wear school uniforms.', options: ['must','mustn\'t','needn\'t','can\'t'], answer: 'must', explain: '必须穿校服。' },
      { type: 'choice', prompt: '______ come in, please!', options: ['Please','Not','Don\'t','No'], answer: 'Please', explain: 'please 礼貌请求。' },
      { type: 'fill', prompt: 'You ______ (must not) smoke here.', answer: 'mustn\'t', explain: 'must not 禁止。' },
      { type: 'choice', prompt: '______ late for school again!', options: ['Don\'t be','Not be','Isn\'t','Don\'t'], answer: 'Don\'t be', explain: 'Don\'t be late。' },
      { type: 'choice', prompt: 'We ______ keep the classroom clean and tidy.', options: ['must','mustn\'t','can\'t','needn\'t'], answer: 'must', explain: '必须保持。' },
      { type: 'fill', prompt: '______ (do) your homework by eight o\'clock.', answer: 'Do', explain: '祈使句。' },
      { type: 'choice', prompt: 'You ______ park here. It\'s not allowed.', options: ['mustn\'t','must','can','should'], answer: 'mustn\'t', explain: '禁止停车。' },
      { type: 'choice', prompt: '______ the window, please.', options: ['Open','Opens','Opening','Opened'], answer: 'Open', explain: '祈使句。' },
      { type: 'fill', prompt: 'Don\'t ______ (run) in the corridor.', answer: 'run', explain: 'don\'t 后接原形。' },
      { type: 'choice', prompt: 'You ______ be tired after the long trip. (推测)', options: ['must','mustn\'t','can\'t','need'], answer: 'must', explain: 'must 表推测。' },
      { type: 'choice', prompt: '______ wait outside, please.', options: ['Please','Not','Don\'t','Isn\'t'], answer: 'Please', explain: 'please。' },
      { type: 'fill', prompt: '______ (not) waste water.', answer: 'Don\'t', explain: '否定祈使句。' },
      { type: 'choice', prompt: 'We ______ obey the traffic rules.', options: ['must','mustn\'t','needn\'t','don\'t'], answer: 'must', explain: '必须遵守。' }
  ]
},

/* ============================================================
   6B-G3 一般过去时（六下 U3 Festivals across cultures）★重点
============================================================ */
{
  id: '6b-past',
  grade: '6B',
  title: '一般过去时',
  unit: '六下 U3 Festivals across cultures',
  emoji: '⏰',
  color: 'c-amber',
  summary: '表示过去发生的动作或状态，是六下最重要、也是理解现在完成时的钥匙',
  lessons: [
    {
      title: '① 什么时候用一般过去时？',
      points: [
        '表示过去某个时间发生的动作或存在的状态',
        '常配 yesterday / last week / ... ago / just now / in 2020 等',
        '动作已经结束，与现在没有直接联系',
        '这是六下的重头戏，也是 7A 现在完成时的"前身"'
      ],
      examples: [
        { en: 'I visited my grandparents last weekend.', cn: '我上周末去看望了祖父母。' },
        { en: 'We celebrated the Mid-Autumn Festival last week.', cn: '我们上周庆祝了中秋节。' }
      ],
      tips: ['看到 yesterday / last week / ago → 用过去时']
    },
    {
      title: '② 规则动词过去式变化',
      points: [
        '一般情况：+ed（play → played, work → worked）',
        '以 e 结尾：+d（love → loved）',
        '辅音字母 + y 结尾：变 y 为 i 加 ed（study → studied）',
        '重读闭音节双写辅音 +ed（stop → stopped）'
      ],
      examples: [
        { en: 'He worked hard last year.', cn: '他去年很努力。' },
        { en: 'They studied English together yesterday.', cn: '他们昨天一起学英语。' }
      ],
      tips: ['记口诀：一般加ed，e尾只加d，辅y变i加ed，重读闭音节双写']
    },
    {
      title: '③ 不规则动词 + be 动词',
      points: [
        '不规则动词要特殊记忆：go→went, eat→ate, see→saw, have→had, do→did',
        'be 动词过去式：am/is→was, are→were',
        'There was / There were：过去"有"'
      ],
      examples: [
        { en: 'I had a wonderful experience last year.', cn: '去年我有一次美妙的经历。' },
        { en: 'The festival was wonderful.', cn: '那个节日很精彩。' }
      ],
      tips: ['不规则动词是必背清单，考试最爱考']
    },
    {
      title: '④ 否定句与疑问句',
      points: [
        '否定：didn\u0027t + 动词原形（I didn\u0027t eat mooncakes.）',
        '一般疑问：Did + 主语 + 动词原形？（Did you watch the race?）',
        '肯定回答：Yes, 主语 + did. 否定：No, 主语 + didn\u0027t.',
        '特殊疑问：疑问词 + did + 主语 + 动词原形？'
      ],
      examples: [
        { en: 'He didn\u0027t go to school yesterday.', cn: '他昨天没去上学。' },
        { en: 'Did you watch the dragon boat race?', cn: '你看龙舟赛了吗？' }
      ],
      tips: ['did 出现后，动词必须还原成原形！didn\u0027t go，不能说 didn\u0027t went']
    }
  ],
  questions: [
    { type: 'fill', prompt: '写出过去式：play → ______', answer: 'played', explain: '规则变化：直接 +ed。' },
    { type: 'fill', prompt: '写出过去式：study → ______', answer: 'studied', explain: '辅音字母 + y 结尾 → 变 y 为 i 加 ed。' },
    { type: 'choice', prompt: 'I ______ at home yesterday.', options: ['was', 'were', 'am', 'is'], answer: 'was', explain: 'I 后 be 动词过去式用 was。' },
    { type: 'choice', prompt: 'They ______ at the temple fair last week.', options: ['were', 'was', 'are', 'is'], answer: 'were', explain: 'They 复数 → were。' },
    { type: 'fill', prompt: '写出过去式：go → ______', answer: 'went', explain: '不规则动词：go → went。' },
    { type: 'choice', prompt: 'He ______ go to school yesterday because he was ill.', options: ['didn\u0027t', 'doesn\u0027t', 'wasn\u0027t', 'don\u0027t'], answer: 'didn\u0027t', explain: '过去时否定：didn\u0027t + 动词原形。' },
    { type: 'choice', prompt: '______ you watch the dragon boat race last week?', options: ['Did', 'Do', 'Does', 'Are'], answer: 'Did', explain: '过去时疑问：Did + 主语 + 动词原形。' },
    { type: 'fill', prompt: '写出过去式：eat → ______', answer: 'ate', explain: '不规则动词：eat → ate。' },
    { type: 'choice', prompt: 'I visited my grandma ______.', options: ['last week', 'next week', 'every day', 'tomorrow'], answer: 'last week', explain: '过去时配过去时间词：last week。' },
      { type: 'fill', prompt: '写出过去式：watch → ______', answer: 'watched', explain: '加 ed。' },
      { type: 'choice', prompt: 'I ______ TV last night.', options: ['watched','watch','watching','watches'], answer: 'watched', explain: 'last night 过去时。' },
      { type: 'fill', prompt: '写出过去式：stop → ______', answer: 'stopped', explain: '双写加 ed。' },
      { type: 'choice', prompt: 'She ______ a book yesterday. (read)', options: ['read','reads','reading','will read'], answer: 'read', explain: 'read 过去式同形。' },
      { type: 'choice', prompt: 'They ______ to the park last Sunday. (go)', options: ['went','go','goes','gone'], answer: 'went', explain: 'go 不规则。' },
      { type: 'fill', prompt: '写出过去式：have → ______', answer: 'had', explain: '不规则。' },
      { type: 'choice', prompt: 'He ______ not at school yesterday. (be)', options: ['was','were','is','are'], answer: 'was', explain: 'he 用 was。' },
      { type: 'choice', prompt: '______ you see him last week?', options: ['Did','Do','Does','Are'], answer: 'Did', explain: '过去时疑问。' },
      { type: 'fill', prompt: '写出过去式：come → ______', answer: 'came', explain: '不规则。' },
      { type: 'choice', prompt: 'We ______ a good time yesterday. (have)', options: ['had','have','has','having'], answer: 'had', explain: 'have 过去式 had。' },
      { type: 'choice', prompt: 'She didn\'t ______ to school yesterday. (go)', options: ['go','went','goes','gone'], answer: 'go', explain: 'didn\'t 后接原形。' },
      { type: 'fill', prompt: '写出过去式：make → ______', answer: 'made', explain: '不规则。' },
      { type: 'choice', prompt: 'There ______ a big tree here before. (be)', options: ['was','were','is','are'], answer: 'was', explain: '过去 there was。' },
      { type: 'choice', prompt: 'Did they ______ the match? (win)', options: ['win','won','wins','winning'], answer: 'win', explain: 'did 后接原形。' },
      { type: 'fill', prompt: '写出过去式：buy → ______', answer: 'bought', explain: '不规则。' },
      { type: 'choice', prompt: 'He ______ his homework last night. (do)', options: ['did','do','does','doing'], answer: 'did', explain: 'do 过去式 did。' },
      { type: 'choice', prompt: '______ your mother cook dinner yesterday?', options: ['Did','Do','Does','Is'], answer: 'Did', explain: '过去时疑问。' },
      { type: 'fill', prompt: '写出过去式：write → ______', answer: 'wrote', explain: '不规则。' }
  ]
},

/* ============================================================
   6B-G4 it 句型（六下 U4 Weather and our lives）
============================================================ */
{
  id: '6b-it',
  grade: '6B',
  title: 'it 句型',
  unit: '六下 U4 Weather and our lives',
  emoji: '🌤️',
  color: 'c-teal',
  summary: 'it 指天气/时间/距离；it 作形式主语表"做某事怎么样"',
  lessons: [
    {
      title: '① it 指天气 / 时间 / 距离',
      points: [
        '指天气：It is sunny today. 今天天气晴朗。',
        '指时间：It is ten o\u0027clock now. 现在十点了。',
        '指距离：It is far from here. 离这儿很远。',
        '这是 it 最基本的"空主语"用法'
      ],
      examples: [
        { en: 'It was rainy yesterday.', cn: '昨天下雨了。' },
        { en: 'It is very cold in winter.', cn: '冬天很冷。' }
      ],
      tips: ['问天气：What\u0027s the weather like? / How is the weather? 回答用 It is...']
    },
    {
      title: '② it 作形式主语',
      points: [
        '结构：It is + 形容词 + (for sb.) + to do sth.',
        '真正的主语是后面的 to do 部分',
        'It is important for us to learn English well.',
        'It is difficult to work out the problem.'
      ],
      examples: [
        { en: 'It is important for us to protect the environment.', cn: '保护环境对我们来说很重要。' },
        { en: 'It is fun to fly a kite in spring.', cn: '春天放风筝很有趣。' }
      ],
      tips: ['看到 It is + adj. + to do，记得"做…是…的"翻译']
    },
    {
      title: '③ it 作形式宾语',
      points: [
        '结构：find / think / make + it + 形容词 + to do sth.',
        'I find it easy to learn English.',
        '真正宾语是 to do 部分，it 是形式宾语'
      ],
      examples: [
        { en: 'I find it useful to read English every day.', cn: '我发现每天读英语很有用。' },
        { en: 'We think it important to keep quiet.', cn: '我们认为保持安静很重要。' }
      ],
      tips: ['find it + adj. + to do：发现做某事怎么样']
    }
  ],
  questions: [
    { type: 'choice', prompt: '______ is rainy today. Take an umbrella!', options: ['It', 'This', 'That', 'He'], answer: 'It', explain: '指天气用 it：It is rainy. 下雨了。' },
    { type: 'choice', prompt: '______ is ten o\u0027clock now. Time to go to bed.', options: ['It', 'This', 'He', 'She'], answer: 'It', explain: '指时间用 it。' },
    { type: 'choice', prompt: '______ is difficult for us to finish the work in one hour.', options: ['It', 'This', 'That', 'We'], answer: 'It', explain: 'it 作形式主语，真正主语是 to finish the work。' },
    { type: 'fill', prompt: 'It is important ______ us to learn English well. （用 for / of / to 填空）', answer: 'for', explain: 'It is + adj. + for sb. + to do：对某人来说做某事…。' },
    { type: 'choice', prompt: 'It\u0027s ______ today. Let\u0027s go swimming.', options: ['sunny', 'sun', 'suns', 'sunnier'], answer: 'sunny', explain: 'It\u0027s + 天气形容词：sunny（晴朗的）。' },
    { type: 'choice', prompt: 'I find ______ easy to finish this task.', options: ['it', 'this', 'that', 'them'], answer: 'it', explain: 'find it + adj. + to do：it 作形式宾语。' },
    { type: 'choice', prompt: 'It takes me two hours ______ my homework every day.', options: ['to do', 'do', 'doing', 'does'], answer: 'to do', explain: 'It takes sb. + 时间 + to do sth.：花费某人时间做某事。' },
    { type: 'choice', prompt: 'It\u0027s kind ______ you to help me.', options: ['of', 'for', 'to', 'with'], answer: 'of', explain: 'It is kind of sb. to do：某人做某事真好（人品质用 of）。' },
      { type: 'choice', prompt: '______ is raining outside. Take an umbrella!', options: ['It','This','That','He'], answer: 'It', explain: '指天气用 it。' },
      { type: 'fill', prompt: 'It is important ______ us to study hard.', answer: 'for', explain: 'It is + adj. + for sb.。' },
      { type: 'choice', prompt: '______ takes me twenty minutes to walk to school.', options: ['It','This','That','He'], answer: 'It', explain: 'It takes sb. time to do。' },
      { type: 'choice', prompt: 'It\'s time ______ go to bed.', options: ['to','for','of','at'], answer: 'to', explain: 'It\'s time to do。' },
      { type: 'fill', prompt: '______ is two kilometers from my home to school.', answer: 'It', explain: '指距离。' },
      { type: 'choice', prompt: 'We find ______ useful to read English aloud.', options: ['it','this','that','them'], answer: 'it', explain: 'find it + adj.。' },
      { type: 'choice', prompt: '______ is not easy to learn English well.', options: ['It','This','That','He'], answer: 'It', explain: 'it 作形式主语。' },
      { type: 'fill', prompt: 'It is kind ______ you to help me.', answer: 'of', explain: 'It is kind of sb.。' },
      { type: 'choice', prompt: 'It\'s ______ today. Let\'s go out and play.', options: ['sunny','sun','suns','sunner'], answer: 'sunny', explain: '天气形容词。' },
      { type: 'choice', prompt: 'It was ______ yesterday. (rain)', options: ['rainy','rain','rains','raining'], answer: 'rainy', explain: '天气形容词。' },
      { type: 'fill', prompt: 'It ______ (be) very cold in winter.', answer: 'is', explain: '一般现在时。' },
      { type: 'choice', prompt: 'I think ______ important to keep healthy.', options: ['it','this','that','them'], answer: 'it', explain: 'think it + adj.。' },
      { type: 'fill', prompt: '______ is half past six now.', answer: 'It', explain: '指时间。' },
      { type: 'choice', prompt: 'It takes me an hour ______ my homework. (do)', options: ['to do','do','doing','does'], answer: 'to do', explain: 'It takes... to do。' },
      { type: 'choice', prompt: 'It is fun ______ with friends. (play)', options: ['to play','play','playing','plays'], answer: 'to play', explain: 'It is fun to do。' },
      { type: 'choice', prompt: 'We think ______ our duty to protect the earth.', options: ['it','this','that','them'], answer: 'it', explain: 'think it our duty。' },
      { type: 'fill', prompt: '______ was windy yesterday.', answer: 'It', explain: '指天气。' },
      { type: 'choice', prompt: 'It\'s kind of you ______ me. (help)', options: ['to help','help','helping','helps'], answer: 'to help', explain: 'It\'s kind of sb. to do。' }
  ]
},

/* ============================================================
   6B-G5 情态动词 can/could/may/should（六下 U5 Green neighbourhood）
============================================================ */
{
  id: '6b-modal',
  grade: '6B',
  title: '情态动词 can/could/may/should',
  unit: '六下 U5 Green neighbourhood',
  emoji: '💡',
  color: 'c-purple',
  summary: '情态动词 + 动词原形：can 能力、could 过去/礼貌、may 允许、should 应该',
  lessons: [
    {
      title: '① 情态动词的共同特点',
      points: [
        '不能单独使用，后接动词原形构成谓语',
        '没有人称和数的变化（He can swim. 不加 s）',
        '变疑问把情态动词提前，变否定在情态动词后加 not',
        '六下重点掌握：can / could / may / should'
      ],
      examples: [
        { en: 'She can speak English well.', cn: '她英语说得很好。' },
        { en: 'You should not litter in the park.', cn: '你不应该在公园乱扔垃圾。' }
      ],
      tips: ['情态动词后面永远接动词原形！']
    },
    {
      title: '② can / could',
      points: [
        'can 表能力：I can swim.（我会游泳）',
        'can 表请求/允许：Can I use your pen?',
        'could 是 can 的过去式：I could swim at five.（五岁时会）',
        'could 表更礼貌的请求：Could I open the window?'
      ],
      examples: [
        { en: 'Can you help me with this box?', cn: '你能帮我搬这个箱子吗？' },
        { en: 'Jane could make a bag at the age of seven.', cn: '简七岁时就会做包了。' }
      ],
      tips: ['could 既可以表"过去会"，也可以表"礼貌请求"']
    },
    {
      title: '③ may / should',
      points: [
        'may 表允许：May I come in?（我可以进来吗）',
        'may 表可能：It may rain.（可能要下雨）',
        'should 表"应该"：We should save water.',
        'shouldn\u0027t 表"不应该"：You shouldn\u0027t waste food.'
      ],
      examples: [
        { en: 'May I have a bottle of water, please?', cn: '请问我能喝瓶水吗？' },
        { en: 'We should recycle plastic bottles.', cn: '我们应该回收塑料瓶。' }
      ],
      tips: ['should 是"应该"，是最"温柔"的建议；must 是"必须"，更强硬']
    }
  ],
  questions: [
    { type: 'choice', prompt: 'I ______ swim when I was five years old.', options: ['could', 'can', 'may', 'should'], answer: 'could', explain: '过去的"会" → could（can 的过去式）。' },
    { type: 'choice', prompt: '______ I use your pen, please?', options: ['May', 'Am', 'Do', 'Was'], answer: 'May', explain: 'May I...? 表允许"我可以…吗"。' },
    { type: 'choice', prompt: 'You ______ keep quiet in the library.', options: ['should', 'may', 'can', 'could'], answer: 'should', explain: 'should 表"应该"：你应该在图书馆保持安静。' },
    { type: 'choice', prompt: 'We ______ tell people to put plastic bottles in the recycling bin.', options: ['can', 'couldn\u0027t', 'mustn\u0027t', 'shouldn\u0027t'], answer: 'can', explain: 'can 表建议"可以"：我们可以告诉人们…。' },
    { type: 'fill', prompt: '______ I come in? （用 may / am / do 填空）', answer: 'May', explain: 'May I come in? 我可以进来吗？表允许。' },
    { type: 'choice', prompt: '______ I open the window to make the room bright? (更礼貌的说法)', options: ['Could', 'Am', 'Do', 'Is'], answer: 'Could', explain: 'could 表礼貌请求：Could I...? 更客气。' },
    { type: 'choice', prompt: 'You ______ litter here. It\u0027s not allowed.', options: ['can\u0027t', 'can', 'may', 'could'], answer: 'can\u0027t', explain: 'can\u0027t 表"不允许"：你不能在这里乱扔垃圾。' },
    { type: 'fill', prompt: 'You ______ (not) stay up too late. （用 should 的否定形式填空）', answer: 'shouldn\u0027t', explain: 'should not = shouldn\u0027t：不应该熬夜。' },
      { type: 'choice', prompt: 'You ______ return the book on time.', options: ['should','may','can','could'], answer: 'should', explain: 'should 应该。' },
      { type: 'fill', prompt: 'He can ______ (speak) three languages.', answer: 'speak', explain: 'can 后接原形。' },
      { type: 'choice', prompt: '______ I ask you a question?', options: ['May','Am','Do','Is'], answer: 'May', explain: 'May I...? 允许。' },
      { type: 'choice', prompt: 'You ______ be careful when crossing the road.', options: ['should','may','can','could'], answer: 'should', explain: '应该小心。' },
      { type: 'fill', prompt: 'She ______ (could) dance when she was four.', answer: 'could', explain: 'could 表过去能力。' },
      { type: 'choice', prompt: 'We ______ protect the environment.', options: ['should','may','can','could'], answer: 'should', explain: '应该保护。' },
      { type: 'choice', prompt: '______ you please pass the salt?', options: ['Could','Am','Do','Is'], answer: 'Could', explain: 'Could you please...?。' },
      { type: 'fill', prompt: 'They ______ (may) come to the party tomorrow.', answer: 'may', explain: 'may 表可能。' },
      { type: 'choice', prompt: 'You ______ eat too much fast food.', options: ['shouldn\'t','should','may','can'], answer: 'shouldn\'t', explain: '不应该。' },
      { type: 'choice', prompt: 'Can I ______ a bottle of water, please?', options: ['have','has','having','had'], answer: 'have', explain: 'Can I have...?。' },
      { type: 'fill', prompt: 'He should ______ (study) harder.', answer: 'study', explain: 'should 后接原形。' },
      { type: 'choice', prompt: 'May I ______ your phone for a moment?', options: ['use','uses','using','used'], answer: 'use', explain: 'may 后接原形。' },
      { type: 'choice', prompt: 'We ______ save water and electricity.', options: ['should','may','can','could'], answer: 'should', explain: '应该节约。' },
      { type: 'fill', prompt: 'You ______ (should not) waste your time.', answer: 'shouldn\'t', explain: 'should not。' },
      { type: 'choice', prompt: 'Could you ______ me the way to the station?', options: ['tell','tells','telling','told'], answer: 'tell', explain: 'could 后接原形。' },
      { type: 'choice', prompt: 'She can ______ the piano very well.', options: ['play','plays','playing','played'], answer: 'play', explain: 'can 后接原形。' },
      { type: 'fill', prompt: 'They should ______ (arrive) early tomorrow.', answer: 'arrive', explain: 'should 后接原形。' },
      { type: 'choice', prompt: '______ I have a look at your new bike?', options: ['May','Am','Do','Is'], answer: 'May', explain: 'May I...?。' }
  ]
},

/* ============================================================
   6B-G6 there be 结构（六下 U6 Famous people in history）
============================================================ */
{
  id: '6b-therebe',
  grade: '6B',
  title: 'there be 结构',
  unit: '六下 U6 Famous people in history',
  emoji: '🏛️',
  color: 'c-green',
  summary: 'There is/are + 某物 + 某地：表示"某地有…"，注意就近原则',
  lessons: [
    {
      title: '① 基本结构',
      points: [
        'There is / are + 某人某物 + 地点：某地有…',
        'There is + 单数名词 / 不可数名词',
        'There are + 复数名词',
        'There is a man at the door. 门口有个人。'
      ],
      examples: [
        { en: 'There is a book on the desk.', cn: '桌上有一本书。' },
        { en: 'There are many students in the classroom.', cn: '教室里有很多学生。' }
      ],
      tips: ['there be 表示"存在"，不表示"拥有"']
    },
    {
      title: '② 就近原则',
      points: [
        '主语是并列多个名词时，be 与最近的名词保持一致',
        'There is a teacher and many students in our class.',
        'There are many students and a teacher in our class.',
        '这是考试高频考点'
      ],
      examples: [
        { en: 'There is a pen and two books on the desk.', cn: '桌上有一支笔和两本书。' },
        { en: 'There are two books and a pen on the desk.', cn: '桌上有两本书和一支笔。' }
      ],
      tips: ['"靠近谁就跟谁一致"——there be 的就近原则']
    },
    {
      title: '③ 否定句与疑问句',
      points: [
        '否定：There isn\u0027t / aren\u0027t + ...（some 变 any）',
        '一般疑问：Is / Are there + ...?',
        '回答：Yes, there is/are. / No, there isn\u0027t/aren\u0027t.',
        '将来：There will be / There is going to be + ...'
      ],
      examples: [
        { en: 'There isn\u0027t any water in the glass.', cn: '杯子里没有水了。' },
        { en: 'There will be a meeting this afternoon.', cn: '今天下午将有一个会议。' }
      ],
      tips: ['否定和疑问句中，some 要变成 any']
    }
  ],
  questions: [
    { type: 'choice', prompt: 'There ______ a book on the desk.', options: ['is', 'are', 'am', 'be'], answer: 'is', explain: 'a book 单数 → There is。' },
    { type: 'choice', prompt: 'There ______ many students in the classroom.', options: ['are', 'is', 'am', 'be'], answer: 'are', explain: 'many students 复数 → There are。' },
    { type: 'choice', prompt: 'There ______ a teacher and many students in our class.', options: ['is', 'are', 'am', 'be'], answer: 'is', explain: '就近原则：离 be 最近的是 a teacher（单数）→ is。' },
    { type: 'fill', prompt: '______ there any water in the glass? （用 Is / Are 填空）', answer: 'Is', explain: 'water 不可数 → Is there...?。' },
    { type: 'choice', prompt: 'There ______ any milk in the bottle.', options: ['isn\u0027t', 'aren\u0027t', 'am not', 'is'], answer: 'isn\u0027t', explain: 'milk 不可数 → There isn\u0027t any milk.。' },
    { type: 'choice', prompt: 'There ______ a meeting this afternoon.', options: ['will be', 'will have', 'is having', 'has'], answer: 'will be', explain: 'there be 的将来式：There will be...（不能说 there will have）。' },
    { type: 'choice', prompt: 'The classroom ______ two doors. (表示"拥有")', options: ['has', 'there is', 'there are', 'have'], answer: 'has', explain: '表示"拥有"用 have/has，there be 表"存在"。' },
    { type: 'choice', prompt: 'There ______ some pens and a pencil on the desk.', options: ['are', 'is', 'am', 'be'], answer: 'are', explain: '就近原则：最近的是 some pens（复数）→ are。' },
      { type: 'choice', prompt: 'There ______ a river near the village.', options: ['is','are','am','be'], answer: 'is', explain: '单数 is。' },
      { type: 'fill', prompt: '______ there any bread in the box?', answer: 'Is', explain: '不可数用 Is。' },
      { type: 'choice', prompt: 'There ______ some milk in the fridge.', options: ['is','are','am','be'], answer: 'is', explain: '不可数用 is。' },
      { type: 'choice', prompt: 'There ______ two cats under the table.', options: ['are','is','am','be'], answer: 'are', explain: '复数 are。' },
      { type: 'fill', prompt: 'There ______ (not) any books on the desk.', answer: 'aren\'t', explain: '否定复数。' },
      { type: 'choice', prompt: 'There ______ a pen and three pencils on the desk.', options: ['is','are','am','be'], answer: 'is', explain: '就近原则。' },
      { type: 'choice', prompt: 'There ______ three pens and a pencil on the desk.', options: ['are','is','am','be'], answer: 'are', explain: '就近原则。' },
      { type: 'fill', prompt: 'There ______ a school in the town ten years ago. (be)', answer: 'was', explain: '过去 there was。' },
      { type: 'choice', prompt: 'There ______ many trees on the hill.', options: ['are','is','am','be'], answer: 'are', explain: '复数。' },
      { type: 'choice', prompt: '______ there a computer in your room?', options: ['Is','Are','Am','Be'], answer: 'Is', explain: '单数疑问。' },
      { type: 'fill', prompt: 'There ______ (be) a meeting tomorrow.', answer: 'will be', explain: 'there will be。' },
      { type: 'choice', prompt: 'There ______ some water in the bottle.', options: ['is','are','am','be'], answer: 'is', explain: '不可数。' },
      { type: 'choice', prompt: 'There aren\'t ______ apples in the basket.', options: ['any','some','a','an'], answer: 'any', explain: '否定用 any。' },
      { type: 'fill', prompt: 'There ______ two birds in the tree.', answer: 'are', explain: '复数。' },
      { type: 'choice', prompt: 'There is ______ orange on the table.', options: ['an','a','the','/'], answer: 'an', explain: 'orange 元音开头。' },
      { type: 'choice', prompt: 'There ______ a dog and two cats in the yard.', options: ['is','are','am','be'], answer: 'is', explain: '就近原则。' },
      { type: 'fill', prompt: 'There ______ many flowers in the garden in spring.', answer: 'are', explain: '复数。' },
      { type: 'choice', prompt: '______ there any sugar in the coffee?', options: ['Is','Are','Am','Be'], answer: 'Is', explain: '不可数。' }
  ]
},

/* ============================================================
   7A G1 现在完成时（U4）—— 暑假头号重点
============================================================ */
{
  id: 'present-perfect',
  grade: '7A',
  title: '现在完成时',
  unit: 'U4 科技与生活',
  emoji: '⏳',
  color: 'c-amber',
  summary: 'have/has + 过去分词：过去动作影响到现在，是 7A 最重要的新时态',
  lessons: [
    {
      title: '① 什么时候用现在完成时？',
      points: [
        '过去发生的动作，对现在有影响（结果看得见）',
        '动作从过去开始，一直持续到现在（可能继续到将来）',
        '它是「跨过去 + 现在」两个时间段的时态'
      ],
      examples: [
        { en: 'I have lost my key. I can\u0027t open the door.', cn: '我把钥匙弄丢了（现在开不了门）。' },
        { en: 'We have lived in Shanghai since 2018.', cn: '我们从2018年起就住在上海（现在还住着）。' }
      ],
      tips: ['记不住的话就记两个词：影响、持续']
    },
    {
      title: '② 怎么构成？',
      points: [
        '肯定：have / has + 动词过去分词（done）',
        '否定：have not (haven\u0027t) / has not (hasn\u0027t) + done',
        '疑问：Have / Has + 主语 + done...?',
        '第三人称单数用 has，其他人称用 have'
      ],
      examples: [
        { en: 'I have finished my homework.', cn: '我已经写完作业了。' },
        { en: 'Has she arrived yet?', cn: '她到了吗？' }
      ],
      tips: ['过去分词分规则（+ed）和不规则（要背），不规则动词表是必背清单']
    },
    {
      title: '③ 关键词（时间状语）',
      points: [
        'for + 一段时间：for two years（持续两年）',
        'since + 时间点：since 1998；since + 从句：since I was a child',
        'already（已经，肯定句）/ yet（还，否定和疑问）',
        'ever（曾经）/ never（从不）/ just（刚刚）'
      ],
      examples: [
        { en: 'She has taught English for ten years.', cn: '她教英语十年了。' },
        { en: 'He has been ill since last Monday.', cn: '他从上周一开始就生病了。' }
      ],
      tips: ['for + 段，since + 点——这是单选题最爱考的搭配']
    },
    {
      title: '④ 三个易混结构：been to / gone to / been in',
      points: [
        'have been to + 地点：去过（人已回来）',
        'have gone to + 地点：去了（人还没回来）',
        'have been in + 地点：在某地待了多久',
        '第三人称：has been to / has gone to...'
      ],
      examples: [
        { en: 'I have been to Beijing twice.', cn: '我去过北京两次（现在回来了）。' },
        { en: 'My father has gone to Beijing.', cn: '我爸去北京了（还没回来）。' }
      ],
      tips: ['看到“去了没回”就用 gone，这是高频考点']
    },
    {
      title: '⑤ 和一般过去时怎么区分？',
      points: [
        '一般过去时：只讲过去，和现在没关系（常配 yesterday, last week）',
        '现在完成时：强调对现在的影响或持续到现在',
        '口诀：过去时“翻篇了”，完成时“有后文”'
      ],
      examples: [
        { en: 'I bought a book yesterday. (只谈昨天)', cn: '我昨天买了本书。' },
        { en: 'I have bought the book, so I can read it now.', cn: '我已经买了这本书，现在可以看了。' }
      ],
      tips: ['有 yesterday/last week 用过去时；有 since/for/just/already 用完成时']
    }
  ],
  questions: [
    { type: 'choice', prompt: 'We ______ in Shanghai since 2018.', options: ['lived', 'have lived', 'are living', 'live'], answer: 'have lived', explain: 'since 2018 是“持续到现在”，用现在完成时 have lived。' },
    { type: 'choice', prompt: '—— Has your brother come back?  —— No, he has ______ to the library.', options: ['been', 'gone', 'went', 'goes'], answer: 'gone', explain: '“还没回来”→ 用 has gone to（去了没回）。' },
    { type: 'choice', prompt: 'I ______ my key. I can\u0027t find it anywhere.', options: ['lost', 'have lost', 'lose', 'am losing'], answer: 'have lost', explain: '弄丢钥匙对现在有影响（找不到），用现在完成时。' },
    { type: 'fill', prompt: 'She has taught English ______ ten years. (用 for 或 since 填空)', answer: 'for', explain: 'ten years 是一段时间 → for + 一段时间。' },
    { type: 'fill', prompt: 'He has been ill ______ last Monday. (用 for 或 since 填空)', answer: 'since', explain: 'last Monday 是一个时间点 → since + 时间点。' },
    { type: 'choice', prompt: '—— Must I hand in my homework now?  —— No, you ______.', options: ['mustn\u0027t', 'needn\u0027t', 'can\u0027t', 'shouldn\u0027t'], answer: 'needn\u0027t', explain: 'Must 问句的否定回答用 needn\u0027t（不必），mustn\u0027t 是“禁止”。' },
    { type: 'fill', prompt: '写出动词的过去分词：go → gone,  eat → ______', answer: 'eaten', explain: 'eat 是不规则动词：eat → ate → eaten。' },
    { type: 'choice', prompt: 'I ______ the film already. It was really wonderful.', options: ['see', 'saw', 'have seen', 'am seeing'], answer: 'have seen', explain: 'already 是现在完成时的标志词 → have seen。' },
    { type: 'fill', prompt: '写出动词的过去分词：write → wrote → ______', answer: 'written', explain: 'write 是不规则动词：write → wrote → written。' },
    { type: 'choice', prompt: 'My grandparents ______ in the countryside for twenty years.', options: ['live', 'lived', 'have lived', 'are living'], answer: 'have lived', explain: 'for twenty years 持续到现在 → 现在完成时。' },
      { type: 'choice', prompt: 'She ______ her homework already. (finish)', options: ['has finished','finished','finishes','finish'], answer: 'has finished', explain: 'already + 现在完成时。' },
      { type: 'fill', prompt: 'I ______ (see) this film twice.', answer: 'have seen', explain: '现在完成时。' },
      { type: 'choice', prompt: '______ you ever been to Beijing?', options: ['Have','Has','Do','Did'], answer: 'Have', explain: 'Have you ever...?。' },
      { type: 'choice', prompt: 'He ______ lived here since 2015.', options: ['has','have','is','does'], answer: 'has', explain: 'since + 现在完成时。' },
      { type: 'fill', prompt: 'We ______ (not finish) the work yet.', answer: 'haven\'t finished', explain: 'yet 否定。' },
      { type: 'choice', prompt: 'They have ______ the project. (complete)', options: ['completed','completes','completing','complete'], answer: 'completed', explain: 'have + 过去分词。' },
      { type: 'choice', prompt: '______ he come back yet?', options: ['Has','Have','Do','Did'], answer: 'Has', explain: 'yet 疑问。' },
      { type: 'fill', prompt: 'I have ______ (know) him for ten years.', answer: 'known', explain: 'for + 一段时间。' },
      { type: 'choice', prompt: 'She has ______ in Shanghai for three years. (live)', options: ['lived','lives','living','live'], answer: 'lived', explain: 'for + 一段时间。' },
      { type: 'choice', prompt: 'Have you ______ your keys? I can\'t find mine either. (find)', options: ['found','find','finds','finding'], answer: 'found', explain: 'have + 过去分词。' },
      { type: 'fill', prompt: 'He has ______ (be) to Shanghai twice.', answer: 'been', explain: 'have been to。' },
      { type: 'choice', prompt: 'I have ______ the book twice. (read)', options: ['read','reads','reading','reader'], answer: 'read', explain: 'read 过去分词同形。' },
      { type: 'choice', prompt: 'They have ______ here since Monday. (work)', options: ['worked','work','works','working'], answer: 'worked', explain: 'since + 现在完成时。' },
      { type: 'fill', prompt: '______ you finished your homework yet?', answer: 'Have', explain: 'Have you...?。' },
      { type: 'choice', prompt: 'She has ______ a doctor for five years. (be)', options: ['been','being','is','was'], answer: 'been', explain: 'for + 一段时间。' },
      { type: 'choice', prompt: 'We haven\'t ______ the good news yet. (hear)', options: ['heard','hear','hears','hearing'], answer: 'heard', explain: 'haven\'t + 过去分词。' },
      { type: 'fill', prompt: 'He has just ______ (go) out.', answer: 'gone', explain: 'has gone。' },
      { type: 'choice', prompt: 'I have ______ my keys. I can\'t open the door. (lose)', options: ['lost','lose','loses','losing'], answer: 'lost', explain: 'have + 过去分词。' }
  ]
},

/* ============================================================
   G2 情态动词 had better / need（U2）
============================================================ */
{
  id: 'modal',
  grade: '7A',
  title: '情态动词 had better / need',
  unit: 'U2 Strong mind',
  emoji: '💪',
  color: 'c-purple',
  summary: 'had better 表示建议“最好…”，need 有两种身份（情态动词/实义动词）',
  lessons: [
    {
      title: '① had better 怎么用？',
      points: [
        'had better + 动词原形：最好做某事（表建议）',
        '否定：had better not + 动词原形：最好不要做',
        '缩略形式：\u0027d better（I\u0027d better go now.）',
        '常用于即将发生的动作，提醒尽快行动'
      ],
      examples: [
        { en: 'You had better finish your homework first.', cn: '你最好先完成作业。' },
        { en: 'We had better not keep silent.', cn: '我们最好不要保持沉默。' }
      ],
      tips: ['had better 后面永远跟动词原形，没有人称和时态变化']
    },
    {
      title: '② need 作情态动词',
      points: [
        'need 作情态动词：need + 动词原形，多用于否定和疑问',
        '否定：needn\u0027t + 动词原形：不必',
        'Must...? 的否定回答 → No, you needn\u0027t.（不必）',
        'mustn\u0027t 是“禁止、不准”，不是“不必”'
      ],
      examples: [
        { en: 'You needn\u0027t worry about the test.', cn: '你不必为考试担心。' },
        { en: '—— Must I go now?  —— No, you needn\u0027t.', cn: '—— 我必须现在走吗？—— 不，你不必。' }
      ],
      tips: ['mustn\u0027t ≠ needn\u0027t！一个“禁止”，一个“不必”，必考点']
    },
    {
      title: '③ need 作实义动词',
      points: [
        'need to do sth.：需要做某事（人作主语）',
        'need doing = need to be done：需要被做（物作主语，主动表被动）',
        'The flowers need watering. = The flowers need to be watered.'
      ],
      examples: [
        { en: 'I need to buy some fruit.', cn: '我需要买些水果。' },
        { en: 'The car needs washing.', cn: '这辆车需要洗了。' }
      ],
      tips: ['物作主语 + need doing 是难点，注意主动形式表被动含义']
    }
  ],
  questions: [
    { type: 'choice', prompt: 'It\u0027s late. You ______ go to bed now.', options: ['had better', 'had better to', 'have better', 'would better'], answer: 'had better', explain: 'had better + 动词原形，表示“最好做…”。' },
    { type: 'fill', prompt: 'You had better ______ (not play) computer games too much.', answer: 'not play', explain: 'had better not + 动词原形：最好不要玩太多游戏。' },
    { type: 'choice', prompt: '—— Must I clean the room now?  —— No, you ______.', options: ['mustn\u0027t', 'needn\u0027t', 'can\u0027t', 'may not'], answer: 'needn\u0027t', explain: 'Must 问句否定回答用 needn\u0027t（不必）。' },
    { type: 'choice', prompt: 'You ______ smoke here. It\u0027s not allowed.', options: ['needn\u0027t', 'mustn\u0027t', 'don\u0027t have to', 'had better not to'], answer: 'mustn\u0027t', explain: '“不允许、禁止”用 mustn\u0027t。' },
    { type: 'fill', prompt: 'The flowers need ______ (water). (填动名词或不定式被动态)', answer: 'watering', explain: '物作主语 + need doing（= need to be watered），主动表被动。' },
    { type: 'choice', prompt: 'I need ______ my homework before dinner.', options: ['finish', 'finishing', 'to finish', 'finished'], answer: 'to finish', explain: '人作主语，need to do sth.：需要做某事。' },
    { type: 'fill', prompt: 'You had better ______ (keep) quiet in the library.', answer: 'keep', explain: 'had better + 动词原形 keep。' },
    { type: 'choice', prompt: '—— I\u0027m really tired.  —— You ______ have a rest.', options: ['had better', 'had better to', 'need to rest', 'both A and C'], answer: 'both A and C', explain: 'had better + do 和 need to do 都表示建议。' },
      { type: 'choice', prompt: 'You had better ______ to bed early. (go)', options: ['go','goes','going','went'], answer: 'go', explain: 'had better + 原形。' },
      { type: 'fill', prompt: 'He had better ______ (not) stay up late.', answer: 'not', explain: 'had better not。' },
      { type: 'choice', prompt: 'You needn\'t ______ today. It\'s Sunday. (work)', options: ['work','works','working','worked'], answer: 'work', explain: 'needn\'t + 原形。' },
      { type: 'choice', prompt: 'We ______ finish it on time. (need)', options: ['need to','need','needs','needed'], answer: 'need to', explain: 'need to do。' },
      { type: 'fill', prompt: 'She had better ______ (see) a doctor.', answer: 'see', explain: 'had better + 原形。' },
      { type: 'choice', prompt: '______ I come in? (请求允许)', options: ['May','Must','Need','Had'], answer: 'May', explain: 'May I...?。' },
      { type: 'choice', prompt: 'You had better ______ a good rest. (take)', options: ['take','takes','taking','took'], answer: 'take', explain: 'had better + 原形。' },
      { type: 'fill', prompt: 'They need ______ (buy) some food for the picnic.', answer: 'to buy', explain: 'need to do。' },
      { type: 'choice', prompt: 'You needn\'t ______ so early. The shop opens at ten. (get up)', options: ['get up','gets up','getting up','got up'], answer: 'get up', explain: 'needn\'t + 原形。' },
      { type: 'choice', prompt: 'He had better ______ his homework first. (do)', options: ['do','does','doing','did'], answer: 'do', explain: 'had better + 原形。' },
      { type: 'fill', prompt: 'We ______ (not need) to hurry. There\'s plenty of time.', answer: 'don\'t need', explain: 'don\'t need to。' },
      { type: 'choice', prompt: 'She needn\'t ______ anything about it. (say)', options: ['say','says','saying','said'], answer: 'say', explain: 'needn\'t + 原形。' },
      { type: 'choice', prompt: 'You had better not ______ late again. (be)', options: ['be','is','are','being'], answer: 'be', explain: 'had better not + 原形。' },
      { type: 'fill', prompt: 'You need ______ (wash) your hands before dinner.', answer: 'to wash', explain: 'need to do。' },
      { type: 'choice', prompt: 'He had better ______ more water. (drink)', options: ['drink','drinks','drinking','drank'], answer: 'drink', explain: 'had better + 原形。' },
      { type: 'choice', prompt: 'Need I ______ the dishes now? (wash)', options: ['wash','washes','washing','washed'], answer: 'wash', explain: 'need 情态动词 + 原形。' },
      { type: 'fill', prompt: 'You had better ______ (not) worry about it.', answer: 'not', explain: 'had better not。' },
      { type: 'choice', prompt: 'We need ______ the classroom after class. (clean)', options: ['to clean','clean','cleans','cleaning'], answer: 'to clean', explain: 'need to do。' }
  ]
},

/* ============================================================
   G3 比较级 / 最高级（U5）
============================================================ */
{
  id: 'comparative',
  grade: '7A',
  title: '形容词/副词比较级最高级',
  unit: 'U5 电影与艺术',
  emoji: '🎬',
  color: 'c-coral',
  summary: '比较级（-er/more）+ than，最高级（-est/most）+ the，规则变化要记牢',
  lessons: [
    {
      title: '① 规则变化',
      points: [
        '单音节：+er / +est：tall → taller → tallest',
        '以 e 结尾：+r / +st：nice → nicer → nicest',
        '辅音+y 结尾：变 y 为 i +er/+est：happy → happier → happiest',
        '重读闭音节双写：big → bigger → biggest'
      ],
      examples: [
        { en: 'Tom is taller than Jack.', cn: '汤姆比杰克高。' },
        { en: 'This is the biggest city in China.', cn: '这是中国最大的城市。' }
      ],
      tips: ['双写规则记住：big, hot, thin, fat, wet']
    },
    {
      title: '② 多音节词 + 不规则变化',
      points: [
        '多音节（2个以上音节）：more / most + 原级：beautiful → more beautiful → most beautiful',
        '不规则变化必背：good/well → better → best',
        'bad → worse → worst；many/much → more → most',
        'little → less → least；far → farther/further → farthest/furthest'
      ],
      examples: [
        { en: 'This film is more interesting than that one.', cn: '这部电影比那部更有趣。' },
        { en: 'She is the best student in our class.', cn: '她是班里最好的学生。' }
      ],
      tips: ['考试最爱考不规则变化，务必背熟']
    },
    {
      title: '③ 比较级修饰词（口诀）',
      points: [
        '口诀：“多多少少，甚至还挺远”',
        'much / a lot（…得多），a little / a bit（…一点）',
        'even / still（甚至更），rather（相当），far（远远…）',
        '修饰词 + 比较级：much taller, even better'
      ],
      examples: [
        { en: 'He is much taller than his brother.', cn: '他比他弟弟高得多。' },
        { en: 'This book is far more interesting.', cn: '这本书有趣得多。' }
      ],
      tips: ['very 不能修饰比较级，只能用 much / a little 这类词']
    },
    {
      title: '④ 常见错误与用法',
      points: [
        '不能双重比较：more taller ✗ → taller ✓',
        '最高级前要加 the：the tallest',
        'than any other + 单数名词：比较级表最高级含义',
        'He is taller than any other student in the class.'
      ],
      examples: [
        { en: 'Shanghai is bigger than any other city in China.', cn: '上海比中国其他任何城市都大。' },
        { en: 'She is the most careful student of all.', cn: '她是所有人中最细心的学生。' }
      ],
      tips: ['看到 more + 比较级 = 双重比较，一定是错的']
    }
  ],
  questions: [
    { type: 'fill', prompt: '写出比较级和最高级：big → ______ → ______', answer: 'bigger biggest', explain: '重读闭音节双写：big → bigger → biggest。' },
    { type: 'choice', prompt: 'This question is ______ than that one.', options: ['difficult', 'more difficult', 'most difficult', 'the most difficult'], answer: 'more difficult', explain: '多音节词用 more + 原级构成比较级。' },
    { type: 'choice', prompt: 'He is ______ than any other student in the class.', options: ['tall', 'taller', 'tallest', 'the tallest'], answer: 'taller', explain: 'than any other + 单数 = 最高级含义，但形式用比较级。' },
    { type: 'fill', prompt: '写出最高级：good → better → ______', answer: 'best', explain: 'good 是不规则变化：good → better → best。' },
    { type: 'choice', prompt: 'This film is ______ more interesting than that one.', options: ['very', 'too', 'much', 'so'], answer: 'much', explain: '比较级修饰词用 much（…得多），不用 very。' },
    { type: 'fill', prompt: '写出比较级：happy → ______', answer: 'happier', explain: '辅音+y 结尾，变 y 为 i 加 er：happy → happier。' },
    { type: 'choice', prompt: 'Which is ______, the sun or the moon?', options: ['big', 'bigger', 'biggest', 'the biggest'], answer: 'bigger', explain: '两者比较用比较级 bigger。' },
    { type: 'choice', prompt: 'She is the ______ student in our school.', options: ['more careful', 'most careful', 'careful', 'carefuller'], answer: 'most careful', explain: '多音节词最高级用 most + 原级，且最高级前有 the。' },
      { type: 'fill', prompt: '写出最高级：big → ______', answer: 'biggest', explain: '双写 + est。' },
      { type: 'choice', prompt: 'He is the ______ student in our class. (tall)', options: ['tallest','taller','tall','more tall'], answer: 'tallest', explain: '最高级。' },
      { type: 'fill', prompt: '写出比较级：interesting → ______', answer: 'more interesting', explain: '多音节用 more。' },
      { type: 'choice', prompt: 'This is the ______ book I\'ve ever read. (interesting)', options: ['most interesting','more interesting','interesting','interestinger'], answer: 'most interesting', explain: '最高级。' },
      { type: 'choice', prompt: 'She is ______ than her brother. (smart)', options: ['smarter','smartest','smart','more smart'], answer: 'smarter', explain: '比较级。' },
      { type: 'fill', prompt: '写出最高级：good → ______', answer: 'best', explain: 'good 不规则。' },
      { type: 'choice', prompt: 'Winter is the ______ season of the year. (cold)', options: ['coldest','colder','cold','more cold'], answer: 'coldest', explain: '最高级。' },
      { type: 'choice', prompt: 'The ______ you study, the more you learn. (hard)', options: ['harder','hardest','hard','more hard'], answer: 'harder', explain: 'the + 比较级。' },
      { type: 'fill', prompt: '写出比较级：beautiful → ______', answer: 'more beautiful', explain: '多音节用 more。' },
      { type: 'choice', prompt: 'He runs ______ than me. (fast)', options: ['faster','fastest','fast','more fast'], answer: 'faster', explain: '比较级。' },
      { type: 'choice', prompt: 'This is the ______ film I have ever seen. (good)', options: ['best','better','good','most good'], answer: 'best', explain: 'good 最高级。' },
      { type: 'fill', prompt: '写出最高级：early → ______', answer: 'earliest', explain: '辅音+y 变 y 为 i 加 est。' },
      { type: 'choice', prompt: 'Tom is ______ of the three brothers. (tall)', options: ['the tallest','taller','tall','more tall'], answer: 'the tallest', explain: '三者用最高级。' },
      { type: 'choice', prompt: 'My bag is ______ than yours. (heavy)', options: ['heavier','heaviest','heavy','more heavy'], answer: 'heavier', explain: '比较级。' },
      { type: 'fill', prompt: '写出比较级：easy → ______', answer: 'easier', explain: '辅音+y 变 y 为 i 加 er。' },
      { type: 'choice', prompt: 'Which is ______, the sun or the moon? (big)', options: ['bigger','biggest','big','more big'], answer: 'bigger', explain: '两者比较。' },
      { type: 'choice', prompt: 'She is the ______ girl in our class. (beautiful)', options: ['most beautiful','more beautiful','beautiful','beautifullest'], answer: 'most beautiful', explain: '多音节最高级。' },
      { type: 'fill', prompt: '写出最高级：hot → ______', answer: 'hottest', explain: '双写 + est。' }
  ]
},

/* ============================================================
   G4 as...as 同级比较（U6）
============================================================ */
{
  id: 'as-as',
  grade: '7A',
  title: 'as...as 同级比较',
  unit: 'U6 山水与自然',
  emoji: '🏔️',
  color: 'c-green',
  summary: 'as + 原级 + as（一样…），not as/so + 原级 + as（不如…）',
  lessons: [
    {
      title: '① 基本结构',
      points: [
        '肯定：as + 形容词/副词原级 + as：和…一样…',
        '否定：not as/so + 原级 + as：不如…',
        '中间必须用原级，不能用比较级',
        'as tall as / as fast as / as clever as'
      ],
      examples: [
        { en: 'She is as tall as her mother.', cn: '她和她妈妈一样高。' },
        { en: 'He doesn\u0027t run as fast as his brother.', cn: '他跑得不如他哥哥快。' }
      ],
      tips: ['as...as 中间一定是原级！as taller as ✗']
    },
    {
      title: '② 中间加名词的用法',
      points: [
        'as + 形容词 + a/an + 单数可数名词 + as：一样…的…',
        'She is as good a cook as her mother.',
        '也可以说：She is a cook as good as her mother.',
        '注意冠词位置：as good a cook（冠词在形容词后）'
      ],
      examples: [
        { en: 'This is as nice a day as we could wish.', cn: '这是我们能想到的再好不过的一天。' },
        { en: 'He is as hardworking a boy as his brother.', cn: '他和他哥哥一样是个勤奋的男孩。' }
      ],
      tips: ['as + adj + a/an + n. 的语序是考点']
    },
    {
      title: '③ 同级比较 vs 比较级',
      points: [
        '同级：as...as（一样），not as...as（不如）',
        '比较级：-er + than（更…）',
        '同义改写：A is not as tall as B. = B is taller than A.',
        '考试常考“同义句转换”'
      ],
      examples: [
        { en: 'Tom is not as tall as Jack. = Jack is taller than Tom.', cn: '汤姆不如杰克高 = 杰克比汤姆高。' },
        { en: 'This box is as heavy as that one.', cn: '这个箱子和那个一样重。' }
      ],
      tips: ['not as...as 和比较级互转，是句型转换题的高频考点']
    }
  ],
  questions: [
    { type: 'fill', prompt: 'She is ______ tall as her mother. (as / so / than)', answer: 'as', explain: '肯定句用 as + 原级 + as。' },
    { type: 'choice', prompt: 'He doesn\u0027t sing ______ well as his sister.', options: ['as', 'more', 'much', 'very'], answer: 'as', explain: '否定句 not as/so + 原级 + as：不如…唱得好。' },
    { type: 'choice', prompt: 'Tom is not as tall as Jack. 同义句：Jack is ______ Tom.', options: ['taller than', 'as tall as', 'shorter than', 'not taller than'], answer: 'taller than', explain: 'A 不如 B 高 = B 比 A 高：taller than。' },
    { type: 'fill', prompt: 'She is as good ______ cook as her mother. (a / an / the)', answer: 'a', explain: 'as + adj + a/an + 单数可数名词：as good a cook。' },
    { type: 'choice', prompt: 'This river is as ______ as that one.', options: ['long', 'longer', 'longest', 'the longest'], answer: 'long', explain: 'as...as 中间用原级 long。' },
    { type: 'choice', prompt: 'My bag is not as heavy as yours. = Your bag is ______ mine.', options: ['heavier than', 'as heavy as', 'lighter than', 'not heavier than'], answer: 'heavier than', explain: '我的包不如你的重 = 你的包比我的重。' },
    { type: 'fill', prompt: 'He runs ______ fast as a horse. (as / so / very)', answer: 'as', explain: '肯定句 as + 副词原级 + as。' },
      { type: 'choice', prompt: 'He is as ______ as his brother. (tall)', options: ['tall','taller','tallest','more tall'], answer: 'tall', explain: 'as...as 中间用原级。' },
      { type: 'fill', prompt: 'She runs as ______ (fast) as me.', answer: 'fast', explain: 'as...as 中间用原级。' },
      { type: 'choice', prompt: 'This book is not as ______ as that one. (interesting)', options: ['interesting','more interesting','most interesting','interestinger'], answer: 'interesting', explain: 'not as...as 用原级。' },
      { type: 'choice', prompt: 'He is as ______ as his father. (old)', options: ['old','older','oldest','more old'], answer: 'old', explain: 'as...as 原级。' },
      { type: 'fill', prompt: 'My bag is as ______ (heavy) as yours.', answer: 'heavy', explain: 'as...as 原级。' },
      { type: 'choice', prompt: 'She is not so ______ as her sister. (tall)', options: ['tall','taller','tallest','more tall'], answer: 'tall', explain: 'not so...as 用原级。' },
      { type: 'choice', prompt: 'I can run as ______ as you. (fast)', options: ['fast','faster','fastest','more fast'], answer: 'fast', explain: 'as...as 原级。' },
      { type: 'fill', prompt: 'This room is as ______ (big) as that one.', answer: 'big', explain: 'as...as 原级。' },
      { type: 'choice', prompt: 'He works as ______ as his brother. (hard)', options: ['hard','harder','hardest','more hard'], answer: 'hard', explain: 'as...as 原级。' },
      { type: 'choice', prompt: 'It\'s not as ______ today as yesterday. (hot)', options: ['hot','hotter','hottest','more hot'], answer: 'hot', explain: 'not as...as 原级。' },
      { type: 'fill', prompt: 'He is as ______ (clever) as his brother.', answer: 'clever', explain: 'as...as 原级。' },
      { type: 'choice', prompt: 'The movie is not so ______ as the book. (interesting)', options: ['interesting','more interesting','most interesting','interestinger'], answer: 'interesting', explain: 'not so...as 原级。' },
      { type: 'choice', prompt: 'She sings as ______ as a bird. (beautiful)', options: ['beautifully','beautiful','more beautiful','most beautiful'], answer: 'beautifully', explain: '副词 as...as。' },
      { type: 'fill', prompt: 'This problem is as ______ (difficult) as that one.', answer: 'difficult', explain: 'as...as 原级。' },
      { type: 'choice', prompt: 'He runs as ______ as a horse. (fast)', options: ['fast','faster','fastest','more fast'], answer: 'fast', explain: 'as...as 原级。' },
      { type: 'choice', prompt: 'You are as ______ as your mother. (kind)', options: ['kind','kinder','kindest','more kind'], answer: 'kind', explain: 'as...as 原级。' },
      { type: 'fill', prompt: 'It\'s as ______ (cold) as winter here.', answer: 'cold', explain: 'as...as 原级。' },
      { type: 'choice', prompt: 'He isn\'t as ______ as he looks. (old)', options: ['old','older','oldest','more old'], answer: 'old', explain: 'not as...as 原级。' }
  ]
},

/* ============================================================
   G5 基本句型 SVOO / SVOC（U1）
============================================================ */
{
  id: 'sentence-pattern',
  grade: '7A',
  title: '基本句型 SVOO / SVOC',
  unit: 'U1 Trying new things',
  emoji: '🧩',
  color: 'c-blue',
  summary: 'SVOO 双宾语（give sb sth），SVOC 宾补（make sb do）—— 写作的骨架',
  lessons: [
    {
      title: '① SVOO 双宾语结构',
      points: [
        '结构：主语 + 谓语 + 间接宾语（人）+ 直接宾语（物）',
        'give sb sth = give sth to sb',
        'buy sb sth = buy sth for sb',
        '常见动词：give, show, pass, send, teach, tell, buy, make'
      ],
      examples: [
        { en: 'My mum gives me a birthday gift.', cn: '妈妈给我一份生日礼物。' },
        { en: 'Please pass the book to him.', cn: '请把书递给他。' }
      ],
      tips: ['双宾语可以互换：give me a book = give a book to me']
    },
    {
      title: '② SVOC 宾语补足语结构',
      points: [
        '结构：主语 + 谓语 + 宾语 + 宾补（补充说明宾语）',
        'make sb do sth.：让某人做某事',
        'make sb/sth + adj.：使某人/物变得…',
        'find it + adj. + to do sth.：发现做某事…'
      ],
      examples: [
        { en: 'The good news made us happy.', cn: '这个好消息让我们很开心。' },
        { en: 'I find it difficult to learn English well.', cn: '我发现学好英语很难。' }
      ],
      tips: ['make/let/have 后跟动词原形（省略 to）是高频考点']
    },
    {
      title: '③ 使役动词 + 感官动词',
      points: [
        '使役动词3个：let / have / make + 宾语 + 动词原形',
        '感官动词：see, hear, watch, feel + 宾语 + 动词原形/doing',
        '被动语态中要还原 to：sb. is made to do sth.',
        'ask sb. to do sth.：让某人做某事（to 不能省）'
      ],
      examples: [
        { en: 'Let me help you.', cn: '让我帮你。' },
        { en: 'The teacher asked us to keep quiet.', cn: '老师让我们保持安静。' }
      ],
      tips: ['let/have/make 后省略 to；ask/tell/want 后保留 to']
    },
    {
      title: '④ 八大句子成分',
      points: [
        '主语 S：句子主角，动作发出者（The boy runs fast.）',
        '谓语 V：动词，主语做的动作',
        '宾语 O：动作的承受者（I read books.）',
        '表语 P：be 动词/系动词后的成分（She is happy.）',
        '定语：修饰名词（a new bike / the boy in red）',
        '状语：修饰动词/形容词/句子，表时间地点方式（run quickly）',
        '补语 C：补充说明宾语或主语（We call him Tom.）',
        '同位语：名词后进一步说明（Tom, my friend, ...）'
      ],
      examples: [
        { en: 'The tall boy runs quickly in the park.', cn: 'tall 是定语，quickly 是状语，in the park 是地点状语。' },
        { en: 'My sister is a doctor.', cn: 'My sister 是主语，is a doctor 里 a doctor 是表语。' }
      ],
      tips: ['判断成分先找谓语动词，再看它前面是主语、后面接什么']
    },
    {
      title: '⑤ 五大基本句型（句子的骨架）',
      points: [
        'SV 主谓：Birds fly.',
        'SVO 主谓宾：I like English.',
        'SVP 主系表：She is a student. / The soup tastes good.',
        'SVOO 主谓双宾：He gave me a book.',
        'SVOC 主谓宾补：The news made us happy.',
        '常见的系动词：be, look, sound, taste, smell, feel, become, get, keep'
      ],
      examples: [
        { en: 'The flowers smell nice.', cn: 'smell 是系动词，nice 是表语 → SVP。' },
        { en: 'My father bought me a new bike.', cn: 'me（间宾）+ a new bike（直宾）→ SVOO。' }
      ],
      tips: ['系动词后接形容词作表语，不能用副词——taste good 不说 taste goodly']
    },
    {
      title: '⑥ SVOC 四类宾补',
      points: [
        '名词作宾补：We call him Tom. / They elected him monitor.',
        '形容词作宾补：The news made us happy. / I found the room empty.',
        '动词原形作宾补：Let him go. / I saw him cross the street.',
        '介词短语/副词作宾补：We found him in the library. / Let me in.',
        '判断方法：宾语和补语之间可以加 be 连起来（him → Tom：He is Tom）'
      ],
      examples: [
        { en: 'The teacher made the class lively.', cn: 'lively 是形容词作宾补。' },
        { en: 'We found him in the library.', cn: 'in the library 是介词短语作宾补。' }
      ],
      tips: ['宾补用名词时前面不能加冠词：call him monitor（不说 a monitor）']
    },
    {
      title: '⑦ 直接宾语 vs 间接宾语',
      points: [
        '间接宾语（人）通常在前：give me a book',
        '直接宾语（物）：被给、被递、被教的东西',
        '把物放前面要加 to：give a book to me',
        '用 for 的动词：buy, make, cook, get, find（buy a bike for me）',
        '直接宾语是代词时必须后置：give it to me（不说 give me it）'
      ],
      examples: [
        { en: 'She sent me a postcard. = She sent a postcard to me.', cn: 'send 用 to。' },
        { en: 'I found a seat for her.', cn: 'find 用 for。' }
      ],
      tips: ['口诀：物是直宾人是间宾；物代词（it/them）后置加 to/for']
    },
    {
      title: '⑧ 引导词 that / which（定语从句初体验）',
      points: [
        '定语从句：跟在名词后面修饰它，像“谁/哪一个”的说明书',
        'that / which 都可以指物：The book (that) I bought is interesting.',
        '指人只能用 that 或 who：The boy who runs fast is Tom.',
        'that 在从句中作宾语时可以省略：The film (that) we saw was great.',
        '7A 只需要会认读，写作中先模仿课本例句使用'
      ],
      examples: [
        { en: 'This is the club that I joined.', cn: 'that 指代 club，在从句中作 joined 的宾语。' },
        { en: 'She is the girl who won the prize.', cn: '指人用 who/that。' }
      ],
      tips: ['指物 that/which 都行；指人用 who/that；先行词是 everything/all 时只用 that']
    }
  ],
  questions: [
    { type: 'choice', prompt: 'My mother ______ me a new schoolbag yesterday.', options: ['bought', 'buy', 'buys', 'buying'], answer: 'bought', explain: 'SVOO 结构 buy sb sth，昨天用过去时 bought。' },
    { type: 'choice', prompt: 'Please pass the salt ______ me.', options: ['to', 'for', 'at', 'with'], answer: 'to', explain: 'pass sth to sb：把某物递给某人。' },
    { type: 'fill', prompt: 'The news made us ______ (feel) happy. (动词原形填空)', answer: 'feel', explain: 'make + 宾语 + 动词原形（省略 to）。' },
    { type: 'choice', prompt: 'The teacher asked us ______ quiet in the library.', options: ['keep', 'to keep', 'keeping', 'kept'], answer: 'to keep', explain: 'ask sb to do sth.：让某人做某事，to 不能省。' },
    { type: 'choice', prompt: 'I find ______ difficult to learn English well.', options: ['this', 'that', 'it', 'what'], answer: 'it', explain: 'find it + adj. + to do sth.：it 作形式宾语。' },
    { type: 'fill', prompt: 'Let me ______ (show) you around our school.', answer: 'show', explain: 'let + 宾语 + 动词原形（省略 to）。' },
    { type: 'choice', prompt: 'He often tells __us interesting stories__. 划线部分是：', options: ['SVOO 双宾语', 'SVOC 宾补', 'SV 主谓', 'SVO 主谓宾'], answer: 'SVOO 双宾语', explain: 'us（间接宾语）+ stories（直接宾语）= SVOO 结构。' },
    { type: 'choice', prompt: 'My father bought a bike ______ me.', options: ['to', 'for', 'with', 'of'], answer: 'for', explain: 'buy sth for sb：为某人买某物（buy 用 for，不是 to）。' },
      { type: 'choice', prompt: 'He gave ______ a book. (me)', options: ['me','I','my','mine'], answer: 'me', explain: 'give sb. sth. 双宾。' },
      { type: 'fill', prompt: 'They call ______ (he) Xiao Ming.', answer: 'him', explain: 'call sb. sth. 宾格。' },
      { type: 'choice', prompt: 'She told ______ an interesting story. (we)', options: ['us','we','our','ours'], answer: 'us', explain: 'tell sb. sth.。' },
      { type: 'choice', prompt: 'The teacher made ______ happy. (we)', options: ['us','we','our','ours'], answer: 'us', explain: 'make + 宾语 + 宾补。' },
      { type: 'fill', prompt: 'Please pass ______ (I) the salt.', answer: 'me', explain: 'pass sb. sth.。' },
      { type: 'choice', prompt: 'We elected ______ monitor of our class. (he)', options: ['him','he','his','himself'], answer: 'him', explain: 'elect sb. sth.。' },
      { type: 'choice', prompt: 'He showed ______ his new bike. (I)', options: ['me','I','my','mine'], answer: 'me', explain: 'show sb. sth.。' },
      { type: 'fill', prompt: 'The news made ______ (she) sad.', answer: 'her', explain: 'make + 宾语 + 宾补。' },
      { type: 'choice', prompt: 'I\'ll buy ______ a nice present. (you)', options: ['you','your','yours','yourself'], answer: 'you', explain: 'buy sb. sth.。' },
      { type: 'choice', prompt: 'They named the baby ______. (Tom)', options: ['Tom','Tom\'s','to Tom','of Tom'], answer: 'Tom', explain: 'name sb. Tom。' },
      { type: 'fill', prompt: 'Could you lend ______ (I) your pen?', answer: 'me', explain: 'lend sb. sth.。' },
      { type: 'choice', prompt: 'The coach made the players ______ hard every day. (train)', options: ['train','trains','training','trained'], answer: 'train', explain: 'make sb. do。' },
      { type: 'choice', prompt: 'She asked ______ a very good question. (I)', options: ['me','I','my','mine'], answer: 'me', explain: 'ask sb. sth.。' },
      { type: 'fill', prompt: 'We found ______ (he) a very good teacher.', answer: 'him', explain: 'find sb. sth.。' },
      { type: 'choice', prompt: 'He taught ______ English last year. (we)', options: ['us','we','our','ours'], answer: 'us', explain: 'teach sb. sth.。' },
      { type: 'choice', prompt: 'The boss made them ______ twelve hours a day. (work)', options: ['work','works','working','worked'], answer: 'work', explain: 'make sb. do。' },
    { type: 'fill', prompt: 'Please give ______ (she) the letter.', answer: 'her', explain: 'give sb. sth.。' },
    { type: 'choice', prompt: 'I want ______ a doctor when I grow up. (be)', options: ['to be','be','being','was'], answer: 'to be', explain: 'want to do。' },
    { type: 'choice', prompt: '“She is a nurse.” 的句型结构是：', options: ['SVP 主系表', 'SVO 主谓宾', 'SV 主谓', 'SVOO 双宾'], answer: 'SVP 主系表', explain: 'be 动词 is 后接表语 a nurse → SVP 主系表结构。' },
    { type: 'choice', prompt: '“The flowers smell nice.” 中 nice 是：', options: ['表语', '宾语', '定语', '宾补'], answer: '表语', explain: 'smell 是系动词，系动词后面的形容词是表语 → SVP。' },
    { type: 'choice', prompt: '“We found him in the library.” 中 in the library 是：', options: ['宾补', '定语', '表语', '同位语'], answer: '宾补', explain: '补充说明宾语 him 在哪里 → 介词短语作宾补（SVOC）。' },
    { type: 'choice', prompt: '“They elected him monitor.” 中 monitor 是：', options: ['名词作宾补', '形容词作宾补', '间接宾语', '表语'], answer: '名词作宾补', explain: 'elect sb. sth.：名词作宾补，前面不加冠词。' },
    { type: 'fill', prompt: '间接宾语指（人/物），直接宾语指（人/物）。答案格式：间=人;直=物', answer: '间=人;直=物', explain: '间接宾语是人（接收者），直接宾语是物（被给的东西）。' },
    { type: 'choice', prompt: 'I bought her a gift. 若直接宾语换成代词 it，正确的说法是：', options: ['I bought it for her.', 'I bought her it.', 'I bought for her it.', 'I bought her for it.'], answer: 'I bought it for her.', explain: '直接宾语是代词（it/them）时必须后置：buy it for sb.。' },
    { type: 'choice', prompt: 'This is the club ______ I joined last month.', options: ['that', 'who', 'what', 'whose'], answer: 'that', explain: '先行词 club 是物，用 that/which 引导，作 joined 的宾语。' },
    { type: 'choice', prompt: 'The girl ______ is reading over there is my sister.', options: ['who', 'which', 'what', 'whose'], answer: 'who', explain: '先行词是人 → 用 who/that。' },
    { type: 'choice', prompt: '下列哪个句子是 SVOC 结构？', options: ['The news made us happy.', 'He gave me a book.', 'Birds fly.', 'She is a student.'], answer: 'The news made us happy.', explain: 'make + 宾语 us + 宾补 happy → SVOC。' },
    { type: 'choice', prompt: '下列哪个动词是系动词？', options: ['taste', 'give', 'pass', 'send'], answer: 'taste', explain: 'taste 是系动词，后接形容词作表语；其余是可接双宾的及物动词。' },
    { type: 'fill', prompt: 'We call ______ (he) Little Newton.', answer: 'him', explain: 'call sb. sth.：宾格 him + 名词宾补。' }
  ]
},

/* ============================================================
   7A-G-extra U1 短语与句型专项（课堂笔记补充）
============================================================ */
{
  id: 'u1-phrases',
  grade: '7A',
  title: 'U1 短语与句型专项',
  unit: 'U1 Trying new things',
  emoji: '🗣️',
  color: 'c-green',
  summary: '40+ 短语搭配、提建议句型辨析、金句仿写、Asking for clarification 课堂用语',
  lessons: [
    {
      title: '① 核心短语搭配（动词短语）',
      points: [
        'try something new 尝试新事物（不定代词 something 后置修饰）',
        'take up (doing) sth. 开始从事；占据时间空间',
        'go doing sth. 去做某事：go rock climbing / go swimming / go shopping',
        'keep on doing sth. 不断做某事 = keep doing sth.',
        'join + 组织/社团：join a dancing club；take part in + 活动',
        'make a time plan 制定时间计划 / set alarm clocks 设闹钟'
      ],
      examples: [
        { en: 'Why not take up a new hobby this term?', cn: '这学期为什么不培养一个新爱好呢？' },
        { en: 'He keeps on practising English every morning.', cn: '他每天早上坚持练英语。' }
      ],
      tips: ['something/somebody 是不定代词，形容词放后面：something new（不说 new something）']
    },
    {
      title: '② 提建议句型：why not + do vs what about + doing',
      points: [
        'Why not + 动词原形...? = Why don\u0027t you + 动词原形...?',
        'What about + doing...? / How about + doing...?（about 是介词，后接 doing）',
        'Let\u0027s + 动词原形...（表示一起做）',
        'You\u0027d better (not) + 动词原形（had better 最好）',
        '回答建议：Good idea! / Sounds great! / That\u0027s a good choice.'
      ],
      examples: [
        { en: 'Why not try something new? = What about trying something new?', cn: '为什么不试试新事物？/ 试试新事物怎么样？' },
        { en: 'How about joining the 3D printing club?', cn: '加入 3D 打印社团怎么样？' }
      ],
      tips: ['为什么后面接的动词形式不同：why not + 原形，what about + doing —— 这是单选高频考点']
    },
    {
      title: '③ 金句积累（写作加分句）',
      points: [
        'Every coin has its two sides. 事物都有两面性（谈利弊必用）',
        'It depends on how we use it. 这取决于我们怎么使用它',
        'It takes courage to try new things. 尝试新事物需要勇气',
        'Failure is the mother of success. 失败是成功之母',
        'Practice gives us confidence. 练习给我们自信',
        'Trust yourself and keep going. 相信自己，继续前进'
      ],
      examples: [
        { en: 'Every coin has its two sides, and so does the phone. It depends on how we use it.', cn: '事物都有两面性，手机也一样，取决于我们怎么用它。' }
      ],
      tips: ['金句放在作文开头或结尾，注意 so does + 主语的倒装用法']
    },
    {
      title: '④ Asking for clarification（听不懂怎么问）',
      points: [
        'Pardon? / Sorry? 请再说一遍（比 What? 更礼貌）',
        'Could you say that again, please?',
        'Could you speak more slowly, please?',
        'What does ... mean? / What\u0027s the meaning of ...?',
        'How do you spell it? / How do you say ... in English?',
        'Do you mean ...? 你是说……吗？（确认理解）',
        'I\u0027m sorry I don\u0027t understand. 对不起我没听懂',
        'Could you give me an example? 能举个例子吗？'
      ],
      examples: [
        { en: '—— What does "take up" mean? —— It means "to start doing".', cn: '—— take up 是什么意思？—— 意思是开始从事。' }
      ],
      tips: ['课堂用语在听力情景题里常考：听不懂要礼貌提问，用 Could you...最安全']
    }
  ],
  questions: [
    { type: 'choice', prompt: 'Why not ______ something new this term?', options: ['try', 'trying', 'to try', 'tries'], answer: 'try', explain: 'Why not + 动词原形。' },
    { type: 'choice', prompt: 'What about ______ the swimming club?', options: ['join', 'joining', 'to join', 'joins'], answer: 'joining', explain: 'about 是介词 → What about + doing。' },
    { type: 'choice', prompt: 'How about ______ rock climbing this weekend?', options: ['go', 'going', 'to go', 'goes'], answer: 'going', explain: 'How about + doing。' },
    { type: 'fill', prompt: 'He keeps on ______ (practise) English every day.', answer: 'practising', explain: 'keep on doing sth.。' },
    { type: 'choice', prompt: 'I have something new ______ you.', options: ['to tell', 'telling', 'tell', 'told'], answer: 'to tell', explain: 'something 后用不定式 to tell 作后置定语。' },
    { type: 'choice', prompt: '形容词修饰 something/somebody 时应放在：', options: ['不定代词后面', '不定代词前面', '都可以', '只能放句首'], answer: '不定代词后面', explain: 'something new / somebody important —— 后置修饰。' },
    { type: 'choice', prompt: 'My sister wants to ______ a dancing club.', options: ['join', 'take part', 'join in', 'attend to'], answer: 'join', explain: 'join + 组织/社团（成为成员）；take part in + 活动。' },
    { type: 'choice', prompt: 'You\u0027d better ______ too much time on games.', options: ['not spend', 'not to spend', 'don\u0027t spend', 'not spending'], answer: 'not spend', explain: 'had better (not) + 动词原形。' },
    { type: 'fill', prompt: 'Would you like ______ (visit) the science museum with us?', answer: 'to visit', explain: 'Would you like to do sth.。' },
    { type: 'choice', prompt: '“Every coin has its two sides.” 的意思是：', options: ['事物都有两面性', '钱是万能的', '熟能生巧', '失败是成功之母'], answer: '事物都有两面性', explain: '金句：谈利弊时的常用开头。' },
    { type: 'fill', prompt: 'It depends on ______ we use it. (填一个引导词，表示"如何")', answer: 'how', explain: 'depend on how...：取决于怎么做。' },
    { type: 'choice', prompt: '没听清对方的话，最礼貌的说法是：', options: ['Pardon?', 'What?', 'Repeat!', 'Say again now.'], answer: 'Pardon?', explain: 'Pardon? / Sorry? 最礼貌；What? 太随便。' },
    { type: 'choice', prompt: '—— ______ does "collect" mean?  —— It means "to gather things".', options: ['What', 'How', 'Which', 'Where'], answer: 'What', explain: 'What does ... mean? 问词义。' },
    { type: 'fill', prompt: '______ do you spell "curious"? (填疑问词)', answer: 'How', explain: 'How do you spell ...? 问拼写。' },
    { type: 'choice', prompt: '想请老师举例，应该说：', options: ['Could you give me an example?', 'Give me example.', 'Example, please now.', 'You example me.'], answer: 'Could you give me an example?', explain: 'Could you...? 是最礼貌的课堂请求句型。' },
    { type: 'choice', prompt: '—— Do you mean we should start now?  —— ______', options: ['Yes, that\u0027s right.', 'Yes, I mean not.', 'No, I don\u0027t mean it.', 'Sorry, I do.'], answer: 'Yes, that\u0027s right.', explain: 'Do you mean...? 的肯定回答：Yes, that\u0027s right.。' },
    { type: 'fill', prompt: 'It takes ______ (勇气) to try new things. (填英文单词)', answer: 'courage', explain: 'It takes courage to do sth. 做某事需要勇气。' },
    { type: 'choice', prompt: 'I like the film. —— I like it, ______.', options: ['too', 'also', 'either', 'as well as'], answer: 'too', explain: '肯定句句末用 too；also 放句中；either 用于否定句。' },
    { type: 'fill', prompt: '手机也一样：...and so ______ the phone. (填助动词)', answer: 'does', explain: 'so + 助动词 + 主语：so does the phone（倒装，表示"也一样"）。' },
    { type: 'choice', prompt: 'Why don\u0027t you ______ the teacher for help?', options: ['ask', 'asking', 'to ask', 'asked'], answer: 'ask', explain: 'Why don\u0027t you + 动词原形。' },
    { type: 'choice', prompt: 'The new hobby ______ too much of my time.', options: ['takes up', 'takes off', 'takes out', 'takes away'], answer: 'takes up', explain: 'take up 占据（时间/空间）。' },
    { type: 'fill', prompt: 'Let\u0027s ______ (make) a time plan first.', answer: 'make', explain: 'Let\u0027s + 动词原形。' },
    { type: 'choice', prompt: '听不懂时请对方说慢一点：', options: ['Could you speak more slowly, please?', 'Speak slow!', 'You speak too fast.', 'Slowly speak you.'], answer: 'Could you speak more slowly, please?', explain: 'Could you... please? 是礼貌请求。' },
    { type: 'fill', prompt: 'I\u0027m sorry I don\u0027t ______ (理解). (填英文单词)', answer: 'understand', explain: 'I don\u0027t understand. 我没听懂。' },
    { type: 'choice', prompt: 'What\u0027s the meaning of "overcome"? 也可以问：', options: ['What does "overcome" mean?', 'How means "overcome"?', 'What means "overcome"?', 'Which means "overcome"?'], answer: 'What does "overcome" mean?', explain: '两种问义句型：What does ... mean? = What\u0027s the meaning of ...?' },
    { type: 'choice', prompt: '为什么不试试新事物？（英文）', options: ['Why not try something new?', 'Why not to try new something?', 'Why not trying something new?', 'Why don\u0027t try something new?'], answer: 'Why not try something new?', explain: 'Why not + 原形；something new 后置。' },
    { type: 'fill', prompt: 'The phone has both advantages and ______ (缺点). (填英文单词)', answer: 'disadvantages', explain: 'advantages and disadvantages 优点和缺点。' },
    { type: 'choice', prompt: '他决定学游泳：He is ______ to learn swimming.', options: ['determined', 'determine', 'determination', 'determining'], answer: 'determined', explain: 'be determined to do sth. 下决心做某事。' }
  ]
},

/* ============================================================
   7A-G-extra 特殊疑问句与反意疑问句（U1 对话填空专项）
============================================================ */
{
  id: 'wh-question',
  grade: '7A',
  title: '特殊疑问句与反意疑问句',
  unit: 'U1 Trying new things',
  emoji: '❓',
  color: 'c-purple',
  summary: '疑问词选择 + 倒装语序 + 介词不丢 + 反意疑问句看主句 —— 对话填空的得分关键',
  lessons: [
    {
      title: '① 特殊疑问句怎么造？',
      points: [
        '公式：疑问词 + 助动词/be动词 + 主语 + 主要动词？',
        '有 be 动词：Where is your brother?',
        '有助动词（can/will/have）：When can you come?',
        '是一般动词：借 do / does / did —— What do you like? / What did he do?',
        '主语本身就是疑问词时不倒装：Who broke the window?（Who 作主语）'
      ],
      examples: [
        { en: 'How did you know that?', cn: '你怎么知道的？（did 借来构成过去时疑问句）' },
        { en: 'Who did you go with?', cn: '你和谁一起去的？（with 留在句末）' }
      ],
      tips: ['记住一句话：疑问句一定「有帮手」——be、情态动词、或 do/does/did 三者必居其一']
    },
    {
      title: '② 疑问词怎么选（看回答定疑问词）',
      points: [
        'What 问内容/事物：What did you make? → A model.',
        'Who 问人：Who helped you? → My teacher.',
        'Whose 问所属：Whose bag is this?',
        'When 问时间 / Where 问地点 / Why 问原因',
        'How 问方式：How did you know? → I heard it from Tom.',
        'How many + 复数 / How much + 不可数 / How often 问频率 / How long 问时长',
        'Which 问「哪一个」（有范围选择时）'
      ],
      examples: [
        { en: '—— I heard it from our classmate.  —— How did you know that?', cn: '回答讲的是「途径」，所以用 How（不是 Why）。' },
        { en: '—— Twice a week.  —— How often do you practise?', cn: '回答是频率 → 用 How often。' }
      ],
      tips: ['做题顺序反着来：先看答句，再定疑问词。答原因用 Why、答方式用 How、答时间用 When']
    },
    {
      title: '③ 介词不能丢（介词后置）',
      points: [
        'discuss sth. with sb. → Who did you discuss it with?',
        'talk to / play with / wait for / listen to / look after 同理',
        '问句末尾的介词不是多余的，它跟着动词来的',
        '背搭配时要连介词一起背，不要只背动词'
      ],
      examples: [
        { en: 'Who did you discuss the plan with?', cn: '你和谁讨论这个计划的？' },
        { en: 'What are you waiting for?', cn: '你在等什么？' }
      ],
      tips: ['漏掉句末介词 = 搭配不完整，这类扣分在批卷时几乎不给分']
    },
    {
      title: '④ 反意疑问句三步法',
      points: [
        '第 1 步：看主句的动词 —— 是 be 动词、助动词，还是普通动词？',
        '第 2 步：主句肯定 → 尾巴否定；主句否定 → 尾巴肯定',
        '第 3 步：尾巴的主语用代词（跟主句主语一致）',
        'be 动词主句：It was a brave choice, wasn\'t it?',
        '情态动词主句：You can swim, can\'t you?',
        '普通动词：He likes music, doesn\'t he?（借 does）',
        '过去时普通动词：They went home, didn\'t they?'
      ],
      examples: [
        { en: 'Eddie is watching Hobo work, isn\'t he?', cn: '主句是 is → 尾巴用 isn\'t he。' },
        { en: 'You won\'t give up, will you?', cn: '主句否定（won\'t）→ 尾巴肯定 will you。' }
      ],
      tips: ['最常见的错法：主句是 was，尾巴却写成 didn\'t —— 记住尾巴永远「继承」主句的动词类型']
    },
    {
      title: '⑤ 问句时态与对话语境一致',
      points: [
        '对话在聊「过去发生的事」→ 问句也用过去时（did / was / were / made）',
        '时间信号词：last month / last holiday / yesterday / just now / ...ago → 过去时',
        '对话在聊「现在的习惯 / 一般情况」→ 用现在时（do / does / is）',
        '答句的动词时态就是最好的提示：答句用 learned，问句就用 did ... learn',
        '最易错：聊过去的事却用现在时 —— What makes you succeed?（×）→ What made you succeed?（√）'
      ],
      examples: [
        { en: '—— I learned to swim last holiday. —— What made you keep trying?', cn: '语境是 last holiday → 用 made（不说 makes）。' },
        { en: '—— I play basketball every Friday. —— How often do you play?', cn: '语境是日常习惯 → 用现在时 do。' }
      ],
      tips: ['先扫一遍对话找时间词（last / ...ago / yesterday），再决定借 did 还是 do']
    },
    {
      title: '⑥ 三个高频坑',
      points: [
        '时态要跟上文：上文用过去时，问句也要用过去时（Why do you know → How did you know）',
        '不能用 Yes/No 回答特殊疑问句',
        '答句不必重复整个问句，但动词形式要对应',
        '对话填空先读完整段，答案线索通常就在空缺的上下句'
      ],
      examples: [
        { en: '—— I tried to make a model.  —— How did it go?', cn: '上文是 tried（过去时），问句也用过去时。' }
      ],
      tips: ['对话填空做两遍：第一遍通读抓逻辑，第二遍逐个填']
    }
  ],
  questions: [
    { type: 'choice', prompt: '—— I heard it from our classmate.  —— ___ did you know that?', options: ['Why', 'What', 'How', 'Who'], answer: 'How', explain: '回答讲的是获得消息的途径 → 用 How。' },
    { type: 'choice', prompt: '—— Twice a week.  —— ___ do you practise the piano?', options: ['How long', 'How often', 'How many', 'How much'], answer: 'How often', explain: 'Twice a week 是频率 → How often。' },
    { type: 'choice', prompt: '—— Two hours.  —— ___ did you spend on your homework?', options: ['How often', 'How long', 'How far', 'How much'], answer: 'How long', explain: 'Two hours 是时长 → How long。' },
    { type: 'choice', prompt: '—— My teacher.  —— ___ helped you with the project?', options: ['Who', 'Whose', 'Which', 'What'], answer: 'Who', explain: '回答是人 → Who（作主语时后面不倒装）。' },
    { type: 'choice', prompt: '—— Because I was afraid to fail.  —— ___ were you nervous?', options: ['How', 'When', 'Why', 'Where'], answer: 'Why', explain: 'Because 回答原因 → Why。' },
    { type: 'choice', prompt: 'Who did you discuss the plan ___ ?', options: ['with', 'for', 'to', 'about'], answer: 'with', explain: 'discuss sth. with sb.，介词 with 留在句末。' },
    { type: 'choice', prompt: 'What are you waiting ___ ?', options: ['with', 'for', 'at', 'to'], answer: 'for', explain: 'wait for sb./sth.。' },
    { type: 'choice', prompt: 'It was a brave choice, ___ ?', options: ['didn\'t it', 'wasn\'t it', 'was it', 'did it'], answer: 'wasn\'t it', explain: '主句是 It was → 尾巴用 wasn\'t it。' },
    { type: 'choice', prompt: 'You can swim very well, ___ ?', options: ['can you', 'can\'t you', 'do you', 'don\'t you'], answer: 'can\'t you', explain: '主句有情态动词 can，且为肯定 → 尾巴 can\'t you。' },
    { type: 'choice', prompt: 'He likes playing basketball, ___ ?', options: ['does he', 'doesn\'t he', 'is he', 'isn\'t he'], answer: 'doesn\'t he', explain: '主句是普通动词 likes（三单）→ 借 doesn\'t he。' },
    { type: 'choice', prompt: 'They went to the lab, ___ ?', options: ['didn\'t they', 'don\'t they', 'weren\'t they', 'did they'], answer: 'didn\'t they', explain: '主句是一般过去时 went → 尾巴 didn\'t they。' },
    { type: 'choice', prompt: 'You won\'t give up, ___ ?', options: ['won\'t you', 'will you', 'do you', 'don\'t you'], answer: 'will you', explain: '主句否定 → 尾巴用肯定 will you。' },
    { type: 'choice', prompt: 'There are many new things to try, ___ ?', options: ['are there', 'aren\'t there', 'isn\'t it', 'are they'], answer: 'aren\'t there', explain: 'There be 句型的反意疑问句用 aren\'t there。' },
    { type: 'choice', prompt: '—— We should be brave.  —— I agree ___ you.', options: ['with', 'to', 'for', 'on'], answer: 'with', explain: 'agree with sb. 同意某人（的观点）。' },
    { type: 'fill', prompt: '对划线部分提问：He tried a renewable energy model last week. (划线 a renewable energy model) → What ___ he try last week?', answer: 'did', explain: '问句问的是「试了什么」，过去时 → 借 did，后面的动词用原形 try。' },
    { type: 'fill', prompt: '对划线部分提问：It took him two hours to finish. (划线 two hours) → How ___ did it take him to finish?', answer: 'long', explain: '时长 → How long。' },
    { type: 'fill', prompt: '补全反意疑问句：Sunlight brings us renewable energy, ___ ___ ? (两词)', answer: 'doesn\'t it', explain: '主句 brings 是普通动词三单 → doesn\'t it。' },
    { type: 'fill', prompt: '补全反意疑问句：Lucy didn\'t join the club, ___ ___ ? (两词)', answer: 'did she', explain: '主句否定 → 尾巴肯定 did she。' },
    { type: 'choice', prompt: '—— ___ did you feel at first?  —— I didn\'t know how to start.', options: ['What', 'How', 'Why', 'Where'], answer: 'How', explain: '问「感觉怎么样」用 How（How did you feel?）。' },
    { type: 'choice', prompt: '—— ___ new things did you try before?  —— I tried rock climbing and 3D printing.', options: ['What', 'How', 'Why', 'Whose'], answer: 'What', explain: '回答列举了具体事物 → What。' },
    { type: 'choice', prompt: 'Which sentence is CORRECT?', options: ['Where you did go last week?', 'Where did you go last week?', 'Where did you went last week?', 'Where you went last week?'], answer: 'Where did you go last week?', explain: '借用 did 后，主要动词要还原成原形 → go。' },
    { type: 'choice', prompt: 'Which sentence is CORRECT?', options: ['Who did break the window?', 'Who broke the window?', 'Who did broke the window?', 'Who does broke the window?'], answer: 'Who broke the window?', explain: 'Who 作主语时不借用 do/did，直接用过去式 broke。' },
    { type: 'choice', prompt: '—— ___ is the biggest challenge?  —— To keep the power of the model steady.', options: ['What', 'How', 'Who', 'When'], answer: 'What', explain: '回答是一件事 → What。' },
    { type: 'choice', prompt: '对话填空：A: You tried a renewable energy model last week, didn\'t you?  B: Yes, I did. ___ did you know that?', options: ['Why', 'How', 'What', 'Who'], answer: 'How', explain: '问「怎么知道的」→ How did you know that?。' },
    { type: 'fill', prompt: '把搭配补完整：Who did you talk ___ ? (和谁谈话)', answer: 'to', explain: 'talk to sb.，介词 to 留在句末（也可用 with）。' },
    { type: 'choice', prompt: '—— ___ does he go to the club?  —— Every Friday.', options: ['How long', 'How often', 'When', 'What time'], answer: 'How often', explain: 'Every Friday 是频率 → How often；若答 on Friday 则可用 When。' },
    { type: 'choice', prompt: '—— ___ helped you fix the model?  —— My classmate did.', options: ['Who', 'Whom', 'Whose', 'What'], answer: 'Who', explain: '缺主语 → Who（不能加 did）。' },
    { type: 'choice', prompt: '（两人在聊上个月的长跑比赛）A: What ___ you succeed?  B: My strong mind and my parents\' encouragement.', options: ['makes', 'made', 'did make', 'making'], answer: 'made', explain: '语境是上个月的比赛（过去时）→ made。答句是事物（意志力和鼓励）→ 疑问词用 What。' },
    { type: 'choice', prompt: 'A: ___?  B: I learned to swim last holiday.', options: ['What do you learn last holiday', 'What did you learn last holiday', 'What did you learned last holiday', 'What you learned last holiday'], answer: 'What did you learn last holiday', explain: 'last holiday → 借 did；借了 did 主要动词还原成原形 learn。' },
    { type: 'fill', prompt: 'A: How ___ (be) the school art festival last Friday?  B: It was great!', answer: 'was', explain: 'last Friday + 答句 was → 问句也用 was。' },
    { type: 'choice', prompt: 'A: ___?  B: I usually read for half an hour before bed.', options: ['What did you do before bed', 'What do you usually do before bed', 'What are you do before bed', 'What you usually do before bed'], answer: 'What do you usually do before bed', explain: '答句有 usually、说的是日常习惯 → 问句用现在时 do。不是看到问句就想 did！' },
    { type: 'fill', prompt: 'A: Who ___ (teach) you to ride a bike last summer?  B: My uncle.', answer: 'taught', explain: 'Who 作主语不倒装（不加 did）；时态跟语境 last summer → teach 的过去式 taught。' },
    { type: 'choice', prompt: 'You learned to ride a bike last month, ___?', options: ['don\'t you', 'didn\'t you', 'did you', 'do you'], answer: 'didn\'t you', explain: '反意疑问句的时态也要跟主句：learned（过去时）→ 借 didn\'t；前肯后否 → didn\'t you。' }
  ]
},

/* ============================================================
   7A-G-extra 看答句写问句（输出型 · 对话填空 / 句型转换实战）
============================================================ */
{
  id: 'wh-write',
  grade: '7A',
  title: '看答句写问句',
  unit: 'U1 考试实战',
  emoji: '✍️',
  color: 'c-coral',
  summary: '给答句反推问句 —— 对话填空和句型转换的得分关键。五步反推法 + 21 道写句子练习',
  lessons: [
    {
      title: '① 五步反推法（先看答句，再写问句）',
      points: [
        '第 1 步：读答句，判断它在回答「什么信息」',
        '第 2 步：信息类型 → 疑问词（人→Who / 事物→What / 地点→Where / 时间→When / 原因→Why / 方式→How）',
        '第 3 步：扫时间信号词定时态（last / ago / yesterday → 过去时；usually / every → 现在时）',
        '第 4 步：按公式组装 —— 疑问词 + 助动词 + 主语 + 动词原形？',
        '第 5 步：回读一遍，检查「借了 did 之后主要动词有没有还原成原形」'
      ],
      examples: [
        { en: '—— I learned to swim last holiday.  —— What did you learn last holiday?', cn: '第 1 步：答句讲「学到了什么」→ What。第 3 步：last holiday → 借 did。' },
        { en: '—— Twice a week.  —— How often do you practise?', cn: '答句说的是频率 → How often；日常习惯 → 现在时 do。' }
      ],
      tips: ['出题人先写好答案再倒着问问题，你做题就必须倒过来：先看答句。答句是唯一的线索']
    },
    {
      title: '② 疑问词 ← 答句特征 反射表',
      points: [
        '人 → Who（作主语时不倒装：Who taught you?）',
        '事物 / 一件事情 → What',
        '所属关系 → Whose（Whose bike is it?）',
        '地点 → Where ｜ 时间点 → When',
        '原因 → Why（答句常以 Because 开头）',
        '方式 / 途径 / 感受 → How',
        '频率 → How often（twice a week / every day）',
        '时长 → How long（for two hours / three weeks）',
        '数量 → How many + 可数复数 ｜ How much + 不可数',
        '有范围里选一个 → Which'
      ],
      examples: [
        { en: '—— Because I wanted to make my parents proud.  —— Why did you keep trying?', cn: 'Because 是 Why 的招牌。' },
        { en: '—— It took me three weeks.  —— How long did it take you?', cn: 'three weeks 是时长 → How long；人称也要跟着换：me → you。' }
      ],
      tips: ['三个最省时间的反射：看到 Because 想 Why；看到 every / twice 想 How often；看到 for + 时间段想 How long']
    },
    {
      title: '③ 时态跟语境，不跟你的中文直觉',
      points: [
        '答句动词的时态就是最好的提示：答句用 learned，问句就用 did ... learn',
        '过去时信号词：last / yesterday / just now / ...ago / in 2024',
        '现在时信号词：usually / every day / often / always',
        '借了 did 之后，主要动词必须还原成原形：What did you learn?（不是 learned）',
        '最易错：聊过去的事却用现在时 —— What makes you succeed?（×）→ What made you succeed?（√）'
      ],
      examples: [
        { en: '—— My strong mind made me succeed.  —— What made you succeed?', cn: '答句用 made → 问句也用 made，不是 makes。' },
        { en: '—— I usually read for half an hour before bed.  —— How long do you read before bed?', cn: 'usually 说的是日常习惯 → 用 do，不是 did。' }
      ],
      tips: ['写完必自查一句：主要动词是原形还是过去式？借了 did 就必须是原形']
    },
    {
      title: '④ 反意疑问句：写尾巴三步',
      points: [
        '第 1 步：看主句的动词类型 —— be 动词 / 情态动词 / 普通动词',
        '第 2 步：前肯后否、前否后肯',
        '第 3 步：尾巴的主语换成对应代词',
        'be 动词主句 → 尾巴用 be：It was a brave choice, wasn\'t it?',
        '情态动词主句 → 尾巴用同一个情态：You can swim, can\'t you?',
        '普通动词三单 → doesn\'t；一般过去时 → didn\'t',
        'There be 句型：There are many new things to try, aren\'t there?'
      ],
      examples: [
        { en: 'Sunlight brings us renewable energy, doesn\'t it?', cn: 'brings 是三单 → 借 doesn\'t；主语换成代词 it。' },
        { en: 'Lucy didn\'t join the club, did she?', cn: '主句否定 → 尾巴用肯定 did she。' }
      ],
      tips: ['尾巴永远「继承」主句的动词类型 —— 主句是 was，尾巴不可能用 didn\'t']
    },
    {
      title: '⑤ 对划线部分提问：两步走',
      points: [
        '第 1 步：看划线部分「在句子里是什么成分」，据此定疑问词',
        '划线是宾语（试了什么）→ What did he try?',
        '划线是时间 → When did ...? ｜ 划线是地点 → Where did ...?',
        '划线是时长 → How long did it take ...? ｜ 划线是次数 → How many times has he ...?',
        '第 2 步：划掉之后，剩下部分要变成一般疑问句语序（借 do/does/did，或把 be/助动词提到主语前）',
        '别忘了借了 did 之后动词还原原形：tried → try'
      ],
      examples: [
        { en: 'Tom tried a renewable energy model last week. → What did Tom try last week?', cn: '划线是宾语 → What；过去时 → 借 did，tried 还原成 try。' },
        { en: 'He has been to Beijing three times. → How many times has he been to Beijing?', cn: '原句已有助动词 has，直接提到主语前，been 保持过去分词不变。' }
      ],
      tips: ['划线题两步走：① 划线部分 → 疑问词 ② 剩下部分 → 一般疑问句语序']
    }
  ],
  questions: [
    /* ---- 特殊疑问句：看答句写问句（12） ---- */
    { type: 'ask', kind: 'wh', prompt: 'I learned to swim last holiday.', hint: '答句讲的是「学到了什么」；last holiday 给了时态信号。', answer: 'What did you learn last holiday?', keys: ['what', 'did', 'learn'], explain: '信息类型 = 事物 → What；last holiday → 借 did，learn 还原原形（不能写 learned）。' },
    { type: 'ask', kind: 'wh', prompt: 'My uncle taught me.', hint: '答句缺的正是「谁」这个主语。', answer: 'Who taught you?', keys: ['who', 'taught'], explain: '问人且作主语 → Who，此时不倒装、不借 did；时态跟答句 → taught。' },
    { type: 'ask', kind: 'wh', prompt: 'It took me three weeks.', hint: 'three weeks 说的是「花了多久」；人称也要跟着换。', answer: 'How long did it take you?', keys: ['how long', 'did', 'take'], explain: 'three weeks 是时长 → How long；借 did 后 take 还原原形；答句的 me 在问句里换成 you。' },
    { type: 'ask', kind: 'wh', prompt: 'I go to the club twice a week.', hint: 'twice a week 是频率，而且说的是日常习惯。', answer: 'How often do you go to the club?', keys: ['how often', 'do', 'go'], explain: 'twice a week 是频率 → How often；日常习惯 → 现在时 do，不是 did。' },
    { type: 'ask', kind: 'wh', prompt: 'Because I wanted to make my parents proud.', hint: '答句是以哪个词开头的？', answer: 'Why did you keep trying?', keys: ['why', 'did', 'keep'], explain: 'Because 答原因 → Why；聊的是过去的事 → 借 did，keep 还原原形。' },
    { type: 'ask', kind: 'wh', prompt: 'I made the model with my classmates.', hint: '问「人」，而且 make 的搭配里有个介词必须留在句末。', answer: 'Who did you make the model with?', keys: ['who', 'did', 'make', 'with'], explain: 'make sth. with sb. → 介词 with 留在句末，不能丢；借 did 后 make 还原原形。' },
    { type: 'ask', kind: 'wh', prompt: 'I finished it yesterday afternoon.', hint: 'yesterday afternoon 是时间点。', answer: 'When did you finish it?', keys: ['when', 'did', 'finish'], explain: '时间点 → When；yesterday → 借 did，finish 还原原形。' },
    { type: 'ask', kind: 'wh', prompt: 'It\'s my cousin\'s bike.', hint: '答句回答的是「谁的」。', answer: 'Whose bike is it?', keys: ['whose', 'bike', 'is'], explain: '所属关系 → Whose；主句有 be 动词，不借 do，直接把 is 提到主语前。' },
    { type: 'ask', kind: 'wh', prompt: 'I felt nervous at first.', hint: '问的是「感觉怎么样」——用问方式的那个疑问词。', answer: 'How did you feel at first?', keys: ['how', 'did', 'feel'], explain: '问感受 / 方式 → How（不是 What）；答句 felt 是过去式 → 借 did，feel 还原原形。' },
    { type: 'ask', kind: 'wh', prompt: 'About twenty students joined the club.', hint: 'twenty students 是可数名词复数。', answer: 'How many students joined the club?', keys: ['how many', 'joined'], explain: '可数名词复数数量 → How many；How many students 本身就是主语，所以不倒装、不借 did，动词用 joined。' },
    { type: 'ask', kind: 'wh', prompt: 'I heard about it from our teacher.', hint: 'from our teacher 说的是「途径」，不是「原因」。', answer: 'How did you hear about it?', keys: ['how', 'did', 'hear'], explain: '途径 → How（这里不是 Why）；heard 是过去式 → 借 did，hear 还原原形。' },
    { type: 'ask', kind: 'wh', prompt: 'My strong mind and my parents\' encouragement made me succeed.', hint: '答句的主语是「事物」，而且是过去发生的事。', answer: 'What made you succeed?', keys: ['what', 'made'], explain: '事物 → What；What 作主语时不倒装、不借 did，动词跟语境用过去式 made（不是 makes）。' },

    /* ---- 反意疑问句：写出完整句子（5） ---- */
    { type: 'ask', kind: 'tag', prompt: 'Sunlight brings us renewable energy.', hint: '主句动词 bring 是三单，且是肯定句。', answer: 'Sunlight brings us renewable energy, doesn\'t it?', keys: ['doesn\'t it'], explain: '普通动词三单 brings → 借 doesn\'t；主语换成代词 it；前肯后否。' },
    { type: 'ask', kind: 'tag', prompt: 'Eddie is watching Hobo work.', hint: '主句是 be 动词，就用 be 做尾巴。', answer: 'Eddie is watching Hobo work, isn\'t he?', keys: ['isn\'t he'], explain: '主句是 is → 尾巴用 isn\'t；主语 Eddie 是男孩，代词用 he。' },
    { type: 'ask', kind: 'tag', prompt: 'You won\'t give up.', hint: '主句里已经有否定词了。', answer: 'You won\'t give up, will you?', keys: ['will you'], explain: '主句否定（won\'t）→ 尾巴用肯定 will you；前否后肯。' },
    { type: 'ask', kind: 'tag', prompt: 'Lucy didn\'t join the club.', hint: '主句是否定，尾巴要反过来。', answer: 'Lucy didn\'t join the club, did she?', keys: ['did she'], explain: '主句否定 → 尾巴肯定；主语 Lucy 换成 she → did she。' },
    { type: 'ask', kind: 'tag', prompt: 'There are many new things to try.', hint: 'There be 句型的尾巴用 be + there。', answer: 'There are many new things to try, aren\'t there?', keys: ['aren\'t there'], explain: 'There be 句型的反意疑问句用 aren\'t there（尾巴主语仍然用 there）。' },

    /* ---- 对划线部分提问（4） ---- */
    { type: 'ask', kind: 'rewrite', prompt: 'Tom tried __a renewable energy model__ last week.', hint: '划线部分是动词 tried 的宾语。', answer: 'What did Tom try last week?', keys: ['what', 'did', 'try'], explain: '划线是宾语 → What；last week → 借 did，tried 还原成 try。' },
    { type: 'ask', kind: 'rewrite', prompt: 'It took him __two hours__ to finish the model.', hint: '划线部分说的是「花了多久」。', answer: 'How long did it take him to finish the model?', keys: ['how long', 'did', 'take'], explain: '划线是时长 → How long；借 did 后 took 还原成 take。' },
    { type: 'ask', kind: 'rewrite', prompt: 'He has been to Beijing __three times__.', hint: '划线部分是「次数」。', answer: 'How many times has he been to Beijing?', keys: ['how many times', 'has', 'been'], explain: '次数 → How many times；原句已有助动词 has，直接把它提到主语前，been 保持过去分词不变。' },
    { type: 'ask', kind: 'rewrite', prompt: 'The film started __at seven o\'clock__.', hint: '划线部分是时间点。', answer: 'When did the film start?', keys: ['when', 'did', 'start'], explain: '时间点 → When；started 是过去式 → 借 did，start 还原原形。' }
  ]
},

/* ============================================================
   7A-G-extra 阅读简答三步法（U1 阅读答题规范）
============================================================ */
{
  id: 'reading-short',
  grade: '7A',
  title: '阅读简答三步法',
  unit: 'U1 阅读答题规范',
  emoji: '📖',
  color: 'c-teal',
  summary: '划关键词 → 回原文定位 → 同步时态人称：读懂不等于写对，答题规范才是得分点',
  lessons: [
    {
      title: '① 三步法：定位 — 摘句 — 对齐',
      points: [
        '第 1 步 划关键词：把问句里的疑问词、时间词、专有名词划出来（at first / how often / who）',
        '第 2 步 回原文定位：带着关键词扫读原文，找到那一句并划线',
        '第 3 步 对齐后抄写：抄下来时把「时态、人称、单复数」跟问句对齐',
        '答完自检一句：问句用 did、我答的动词也是过去式吗？'
      ],
      examples: [
        { en: '问：How did the writer feel at first? 原文：At first, I didn\'t know how to start. 答：He didn\'t know how to start.', cn: '关键词 at first 精准定位；问句 did → 答句也用过去时。' },
        { en: '问：What did the writer try to make last week? 答：He tried to make a small model.', cn: '问句里的 try to 在答句里必须保留，不能只答 made。' }
      ],
      tips: ['先定位再动笔，不要凭印象回答——简答题几乎不考「大意」，考的就是定位精度']
    },
    {
      title: '② 五种最常见的失分方式',
      points: [
        '答非所问：问「起初感觉如何」答成了后文情绪；问「谁帮了他」答成了「他做了什么」',
        '丢失问句里的关键词：问句有 try to，答句只写 made',
        '细节不精确：原文 less than once a week，答成 once a week（多答/少答限定词都算错）',
        '时态不匹配：问句用 did，答句用 is / feels',
        '答句不完整：只写一个词或短语，缺主语谓语（能答整句就答整句）'
      ],
      examples: [
        { en: '原文：Some do not have time to eat meals together more than once a week. 问：How often ...? 答：Less than once a week.', cn: '限定词 less than 不能丢。' }
      ],
      tips: ['把「限定词」当宝贝：less than / more than / almost / only 这类词一丢，意思就变了']
    },
    {
      title: '③ 常见问句 → 答句模板',
      points: [
        'What did ... do? → 主语 + 动词过去式 + 其他（He tried to make a model.）',
        'How did ... feel? → 主语 + felt / was + 形容词（He felt proud.）',
        'Why did ...? → Because + 主谓（Because the family members were closer.）',
        'How often ...? → 频率短语（Less than once a week.）',
        'What can we learn from the story? → 用一句话说启示（We should never give up.）',
        'Who ...? → 指人的名词（His teacher.）',
        '开放性收尾（补一句话）：I look forward to your reply. / Hope to hear from you soon.'
      ],
      examples: [
        { en: 'What can we learn from the story? → We should keep trying and never give up when facing difficulties.', cn: '启示类回答用 should / 祈使句更稳妥。' }
      ],
      tips: ['背 5 个万能答句开头：He tried to... / He felt... / Because... / We should... / I look forward to...']
    },
    {
      title: '④ 错题复盘：从「懂」到「写对」',
      points: [
        '把每次简答的错分成三类：定位错 / 形式错 / 抄写错',
        '定位错 → 练划关键词；形式错 → 练时态人称对齐；抄写错 → 答完默读一遍',
        '订正时不要只写正确答案，要写「我错在哪一类」',
        '同一篇短文隔三天再答一次，检验是不是真的会了'
      ],
      examples: [
        { en: '错：He is disappointed and unhappy. → 归类：定位错（答的是后文）+ 形式错（时态）', cn: '一次错误往往同时踩两个坑，归类后才知道该练什么。' }
      ],
      tips: ['简答题的提升快慢，取决于「归因」而不是「多做题」']
    }
  ],
  questions: [
    {
      type: 'short',
      passage: 'Trying new things is a great way to improve ourselves. Last week, I tried to make a small model by myself. At first, I didn\'t know how to start and I failed many times. Luckily, my teacher taught me some useful skills. I worked harder and more carefully than before. In the end, I succeeded. I shouted excitedly and felt very proud.',
      prompt: 'How did the writer feel at first?',
      answer: 'He didn\'t know how to start.',
      keys: ['didn\'t know', 'did not know', 'how to start'],
      explain: '关键词 at first 定位到第二句；问句用 did，答句也要用过去时 → He didn\'t know how to start. 常见错误：答成 He is disappointed and unhappy.（那是后文情绪，且时态错）。'
    },
    {
      type: 'short',
      passage: 'Trying new things is a great way to improve ourselves. Last week, I tried to make a small model by myself. At first, I didn\'t know how to start and I failed many times. Luckily, my teacher taught me some useful skills. I worked harder and more carefully than before. In the end, I succeeded. I shouted excitedly and felt very proud.',
      prompt: 'What did the writer try to make last week?',
      answer: 'He tried to make a small model.',
      keys: ['tried to make', 'small model'],
      explain: '问句里有 try to，答句必须保留 → He tried to make a small model. 只答 He made a small model. 会丢分（与问句形式不对应）。'
    },
    {
      type: 'short',
      passage: 'Trying new things is a great way to improve ourselves. Last week, I tried to make a small model by myself. At first, I didn\'t know how to start and I failed many times. Luckily, my teacher taught me some useful skills. I worked harder and more carefully than before. In the end, I succeeded. I shouted excitedly and felt very proud.',
      prompt: 'Who helped the writer later?',
      answer: 'His teacher (did).',
      keys: ['teacher'],
      explain: 'Who 问人，答指人的名词即可 → His teacher. 也可以答 His teacher helped him. 注意不要答成 He learned some skills.（答非所问）。'
    },
    {
      type: 'short',
      passage: 'Trying new things is a great way to improve ourselves. Last week, I tried to make a small model by myself. At first, I didn\'t know how to start and I failed many times. Luckily, my teacher taught me some useful skills. I worked harder and more carefully than before. In the end, I succeeded. I shouted excitedly and felt very proud.',
      prompt: 'What can we learn from the story? (用一句英文回答)',
      answer: 'We should never give up and keep trying when we face difficulties.',
      keys: ['never give up', 'keep trying', 'should'],
      explain: '启示类回答用 We should... / We can... 更稳妥，要包含「不要放弃、坚持尝试」的意思。'
    },
    {
      type: 'short',
      passage: 'After 7 months of planning, our housing estate took one night off. They called it "Family Night", a night for families to spend time together. On Family Night, families agreed to turn off TV, and not to answer the telephone. They ordered take-out pizza instead of spending time cooking. Among the activities, the most popular ones are board and card games. Playing them brought the family members closer.',
      prompt: 'How often do some American families have time to eat meals together?',
      answer: 'Less than once a week.',
      keys: ['less than', 'once a week'],
      explain: '原文是 do not have time to eat meals together more than once a week = 不到一周一次。限定词 less than 不能丢，只答 Once a week 意思就反了。'
    },
    {
      type: 'short',
      passage: 'After 7 months of planning, our housing estate took one night off. They called it "Family Night", a night for families to spend time together. On Family Night, families agreed to turn off TV, and not to answer the telephone. They ordered take-out pizza instead of spending time cooking. Among the activities, the most popular ones are board and card games. Playing them brought the family members closer.',
      prompt: 'Why did American families like board and card games best?',
      answer: 'Because playing them brought the family members closer.',
      keys: ['brought', 'closer'],
      explain: 'Why 问句用 Because 开头回答，并抄准原句核心信息 brought the family members closer（把家人拉得更近）。'
    },
    {
      type: 'short',
      passage: 'After 7 months of planning, our housing estate took one night off. They called it "Family Night", a night for families to spend time together. On Family Night, families agreed to turn off TV, and not to answer the telephone. They ordered take-out pizza instead of spending time cooking. Among the activities, the most popular ones are board and card games. Playing them brought the family members closer.',
      prompt: 'What is "Family Night"?',
      answer: 'It is a night for families to spend time together.',
      keys: ['night', 'families', 'together'],
      explain: '词义解释题要用原文定义句回答：a night for families to spend time together。'
    },
    {
      type: 'fill',
      prompt: '开放性收尾（补全信件结尾）：I look forward to your ______ . （填一个名词，表示“回信”）',
      answer: 'reply',
      explain: 'look forward to 中的 to 是介词，后面接名词/动名词 → your reply / hearing from you。不能写 receive（动词原形），也不说 look forward for。'
    },
    { type: 'choice', prompt: '简答题问：How did the writer feel at first? 下列回答最规范的是：', options: ['He is disappointed and unhappy.', 'He didn\'t know how to start.', 'His teacher helped him.', 'He made a small model.'], answer: 'He didn\'t know how to start.', explain: '定位 at first 那一句，并保持过去时；其余三项都答非所问或时态错误。' },
    { type: 'choice', prompt: '问：What did the writer try to make last week? 最规范的答句是：', options: ['A small model.', 'He made a small model.', 'He tried to make a small model.', 'Making a small model.'], answer: 'He tried to make a small model.', explain: '答句保留问句里的 try to，主谓完整。' },
    { type: 'choice', prompt: '问：How often do some families eat together? 最准确的答句是：', options: ['Once a week.', 'Less than once a week.', 'Every day.', 'Twice a week.'], answer: 'Less than once a week.', explain: '原文含 more than once a week 的否定，限定词 less than 必须保留。' },
    { type: 'choice', prompt: '简答题回答启示类问题（What can we learn from the story?），最好的句式是：', options: ['We should never give up.', 'Yes, we can.', 'Because it is good.', 'A small model.'], answer: 'We should never give up.', explain: '启示类用 We should / We can 句式，完整、直接、无语法风险。' }
  ]
},

/* ============================================================
   G6 物主代词 / 名词所有格（U3）
============================================================ */
{
  id: 'possessive',
  grade: '7A',
  title: '物主代词 / 名词所有格',
  unit: 'U3 职业与工作',
  emoji: '📦',
  color: 'c-teal',
  summary: '形容词性（my）+名词，名词性（mine）独立用；\u0027s 所有格表所属',
  lessons: [
    {
      title: '① 形容词性物主代词',
      points: [
        'my / your / his / her / its / our / their',
        '后面必须跟名词：my book, their school',
        '作用：作定语，修饰名词',
        '不能单独使用'
      ],
      examples: [
        { en: 'This is my desk.', cn: '这是我的课桌。' },
        { en: 'Their classroom is very bright.', cn: '他们的教室很明亮。' }
      ],
      tips: ['形容词性物主代词 = 名词的“保镖”，永远站在名词前面']
    },
    {
      title: '② 名词性物主代词',
      points: [
        'mine / yours / his / hers / its / ours / theirs',
        '后面不跟名词，独立使用（= 形容词性 + 名词）',
        'This is my book. = This book is mine.',
        '相当于“形容词性物主代词 + 名词”'
      ],
      examples: [
        { en: 'This umbrella is mine.', cn: '这把伞是我的。' },
        { en: 'Our school is bigger than theirs.', cn: '我们的学校比他们的大。' }
      ],
      tips: ['看后面有没有名词：有 → 形容词性；没有 → 名词性']
    },
    {
      title: '③ 名词所有格 \u0027s',
      points: [
        '单数名词 + \u0027s：Tom\u0027s book（汤姆的书）',
        '不以 s 结尾的复数 + \u0027s：children\u0027s toys（孩子们的玩具）',
        '以 s 结尾的复数 + \u0027：the teachers\u0027 office（老师们的办公室）',
        '表时间/距离：today\u0027s news, five minutes\u0027 walk'
      ],
      examples: [
        { en: 'This is Wang Yiming\u0027s seat.', cn: '这是王一鸣的座位。' },
        { en: 'It\u0027s about ten minutes\u0027 walk from here.', cn: '从这里走大约十分钟。' }
      ],
      tips: ['复数以 s 结尾只加撇号 \u0027，不规则的复数（children）加 \u0027s']
    }
  ],
  questions: [
    { type: 'choice', prompt: 'This is ______ book. ______ is on the desk.', options: ['my / Yours', 'mine / Your', 'my / Your', 'mine / Yours'], answer: 'my / Yours', explain: 'book 前用形容词性 my；第二空独立使用用名词性 Yours。' },
    { type: 'fill', prompt: 'This bag is ______ (my / mine), not yours.', answer: 'mine', explain: '后面没有名词，独立使用 → 名词性 mine。' },
    { type: 'fill', prompt: 'This is ______ (Tom) football. 用所有格填空', answer: 'Tom\u0027s', explain: '单数名词加 \u0027s：Tom\u0027s football。' },
    { type: 'choice', prompt: 'Our classroom is bigger than ______.', options: ['them', 'their', 'theirs', 'they'], answer: 'theirs', explain: '后面没有名词，比较的是“他们的教室”→ 名词性 theirs。' },
    { type: 'choice', prompt: '—— Whose pen is this?  —— It\u0027s ______.', options: ['my', 'mine', 'me', 'I'], answer: 'mine', explain: '回答“谁的”独立使用 → 名词性 mine。' },
    { type: 'fill', prompt: 'The ______ (teacher) office is on the second floor. 用所有格填空（以 s 结尾复数）', answer: 'teachers\u0027', explain: '复数以 s 结尾只加撇号：teachers\u0027 office。' },
    { type: 'choice', prompt: 'It\u0027s about ten minutes\u0027 ______ from here.', options: ['walks', 'walk', 'walking', 'to walk'], answer: 'walk', explain: 'ten minutes\u0027 walk：十分钟的路程，所有格表距离。' },
    { type: 'choice', prompt: 'These are ______ toys. The children love them.', options: ['children\u0027s', 'childrens\u0027', 'childrens', 'children'], answer: 'children\u0027s', explain: 'children 是不规则复数，加 \u0027s：children\u0027s toys。' },
      { type: 'choice', prompt: 'This is ______ book. (I)', options: ['my','me','mine','I'], answer: 'my', explain: '形容词性物主代词。' },
      { type: 'fill', prompt: 'That bag is ______ (he).', answer: 'his', explain: '名词性物主代词。' },
      { type: 'choice', prompt: 'These are ______ shoes. (she)', options: ['her','she','hers','she\'s'], answer: 'her', explain: '名词前用 her。' },
      { type: 'choice', prompt: 'This bike is ______. (they)', options: ['theirs','their','them','they'], answer: 'theirs', explain: '名词性物主代词。' },
      { type: 'choice', prompt: 'This pen is ______. (I)', options: ['mine','my','me','I'], answer: 'mine', explain: '名词性物主代词。' },
      { type: 'fill', prompt: '______ (he) name is Tom.', answer: 'His', explain: 'his 修饰名词。' },
      { type: 'choice', prompt: 'The house over there is ______. (they)', options: ['theirs','their','them','they'], answer: 'theirs', explain: '名词性物主代词。' },
      { type: 'choice', prompt: 'This is the ______ office. (teacher)', options: ['teacher\'s','teachers','teacher','teachers\''], answer: 'teacher\'s', explain: '名词所有格。' },
      { type: 'fill', prompt: '______ (we) classroom is bright and clean.', answer: 'Our', explain: 'our 修饰名词。' },
      { type: 'choice', prompt: 'The toys are ______. (children)', options: ['children\'s','childrens\'','childrens','children'], answer: 'children\'s', explain: '复数所有格。' },
      { type: 'choice', prompt: 'Is this ______ bag? (you)', options: ['your','yours','you','yours'], answer: 'your', explain: '名词前用 your。' },
      { type: 'fill', prompt: 'That is ______ (she) ruler.', answer: 'her', explain: 'her 修饰名词。' },
      { type: 'choice', prompt: 'The car is ______. (my father)', options: ['my father\'s','my father','my fathers','father\'s'], answer: 'my father\'s', explain: '名词所有格。' },
      { type: 'choice', prompt: 'These are ______ books. (they)', options: ['their','theirs','them','they'], answer: 'their', explain: '名词前用 their。' },
      { type: 'fill', prompt: 'This dog is ______ (I).', answer: 'mine', explain: '名词性物主代词。' },
      { type: 'choice', prompt: '______ book is on the desk. (Tom)', options: ['Tom\'s','Tom','Toms','the Tom'], answer: 'Tom\'s', explain: '名词所有格。' },
      { type: 'choice', prompt: 'The books on the shelf are ______. (we)', options: ['ours','our','us','we'], answer: 'ours', explain: '名词性物主代词。' },
      { type: 'fill', prompt: 'This is ______ (he) sister.', answer: 'his', explain: 'his 修饰名词。' }
  ]
}
];

/* 语法岛页面信息 */
const GRAMMAR_INFO = {
  title: '语法冒险岛',
  subtitle: '6A + 6B + 7A 语法专项 · 先学后练',
  grades: ['6A', '6B', '7A'],   // 分栏顺序：六上 → 六下 → 七上，由易到难
  total: GRAMMAR.length,
  counts: {
    '6A': GRAMMAR.filter(g => g.grade === '6A').length,
    '6B': GRAMMAR.filter(g => g.grade === '6B').length,
    '7A': GRAMMAR.filter(g => g.grade === '7A').length
  }
};
