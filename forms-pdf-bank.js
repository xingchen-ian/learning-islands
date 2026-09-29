// forms-pdf-bank.js — 7A 预习卷(1)(2) 高频错题词库
// 来源：六年级英语预习练习(1)=7A U1 / 预习练习(2)=7A U2
// 三类：transform(词族转换) / eding(-ed/-ing形容词) / homo(同音/近形辨析)
// 字段：from / fromPos / toPos / answer / meaning / example{en,cn} / unit / cat
window.FORMS_PDF_BANK = [

/* ============================================================
   A. 词族转换（cat: 'transform'）
   从两份卷子中 NaoNao 反复出错的词族
============================================================ */

// ── Paper 1 (U1) 词族 ──
{ from: 'improve',   fromPos: 'v.',  toPos: 'v.-ing',    answer: 'improving',     meaning: '改善（进行时/非谓语）', example: { en: 'It is necessary for our students to keep improving.', cn: '我们的学生有必要不断进步。' }, unit: 'U1', cat: 'transform' },
{ from: 'luck',      fromPos: 'n.',  toPos: 'adv.',       answer: 'luckily',        meaning: '幸运地',               example: { en: 'Luckily, nobody was badly hurt.', cn: '幸运的是，没人受重伤。' }, unit: 'U1', cat: 'transform' },
{ from: 'lucky',     fromPos: 'adj.',toPos: 'adv.',       answer: 'luckily',        meaning: '幸运地',               example: { en: 'Luckily, he found his lost wallet.', cn: '幸运的是，他找到了丢失的钱包。' }, unit: 'U1', cat: 'transform' },
{ from: 'excite',    fromPos: 'v.',  toPos: 'adj.',       answer: 'excited',        meaning: '感到兴奋的（-ed修饰人）',example: { en: 'We are all excited to receive the news.', cn: '收到这个消息我们都很兴奋。' }, unit: 'U1', cat: 'transform' },
{ from: 'succeed',   fromPos: 'v.',  toPos: 'v.-ed',      answer: 'succeeded',      meaning: '成功（过去式）',         example: { en: 'He succeeded in passing the exam after hard work.', cn: '经过努力，他成功通过了考试。' }, unit: 'U1', cat: 'transform' },
{ from: 'fail',      fromPos: 'v.',  toPos: 'n.',          answer: 'failure',         meaning: '失败',                  example: { en: 'Failure is the mother of success.', cn: '失败是成功之母。' }, unit: 'U1', cat: 'transform' },
{ from: 'possible',  fromPos: 'adj.',toPos: 'adj.(反义)', answer: 'impossible',      meaning: '不可能的',             example: { en: "It's impossible for my aunt to be a teacher.", cn: '我阿姨不可能当老师。' }, unit: 'U1', cat: 'transform' },
{ from: 'discuss',   fromPos: 'v.',  toPos: 'n.',          answer: 'discussion',     meaning: '讨论',                  example: { en: "I'd like to have a further discussion about the report.", cn: '我想进一步讨论这份报告。' }, unit: 'U1', cat: 'transform' },
{ from: 'recover',   fromPos: 'v.',  toPos: 'v.-ed',       answer: 'recovered',      meaning: '恢复（过去式/分词）',   example: { en: 'I like reading books and I recovered from a bad week.', cn: '我喜欢读书，我从糟糕的一周中恢复了。' }, unit: 'U1', cat: 'transform' },
{ from: 'stick',     fromPos: 'v.',  toPos: 'adj.',        answer: 'sticky',         meaning: '粘的',                  example: { en: 'The floor is very sticky.', cn: '地板很黏。' }, unit: 'U1', cat: 'transform' },
{ from: 'stick',     fromPos: 'v.',  toPos: 'v.-ed(-pp)',  answer: 'stuck',          meaning: 'stuck（过去式/分词）', example: { en: 'He stuck the photo on the wall.', cn: '他把照片贴在墙上。' }, unit: 'U1', cat: 'transform' },
{ from: 'print',     fromPos: 'v.',  toPos: 'v.-ed/-pp',   answer: 'printed',        meaning: '打印（过去式/分词）',   example: { en: 'He printed a little sheep on his T-shirt yesterday.', cn: '他昨天在T恤上印了一只小羊。' }, unit: 'U1', cat: 'transform' },
{ from: 'print',     fromPos: 'v.',  toPos: 'v.-ing',      answer: 'printing',       meaning: '打印（进行时/非谓语）', example: { en: 'I saw him printing an article in my mother\'s office.', cn: '我看见他在妈妈办公室里打印一篇文章。' }, unit: 'U1', cat: 'transform' },
{ from: 'challenge', fromPos: 'n./v.',toPos: 'adj.',       answer: 'challenging',    meaning: '有挑战性的',           example: { en: 'Finding children for kids to play with has been the most challenging.', cn: '找孩子一起玩是最有挑战性的。' }, unit: 'U1', cat: 'transform' },
{ from: 'brave',     fromPos: 'adj.',toPos: 'adv.',        answer: 'bravely',        meaning: '勇敢地',               example: { en: 'Whatever happens, we should face it bravely.', cn: '无论发生什么，我们都应勇敢面对。' }, unit: 'U1', cat: 'transform' },
{ from: 'count',     fromPos: 'v.',  toPos: 'v.-ing',      answer: 'counting',       meaning: '数（进行时）',          example: { en: 'Counting cows passed the test through hard work.', cn: '经过努力，数牛通过了考试。' }, unit: 'U1', cat: 'transform' },
{ from: 'count',     fromPos: 'v.',  toPos: 'adj.',        answer: 'countless',      meaning: '无数的',               example: { en: 'There are countless stars in the sky.', cn: '天上有无数的星星。' }, unit: 'U1', cat: 'transform' },
{ from: 'feel',      fromPos: 'v.',  toPos: 'v.-ing',      answer: 'feeling',        meaning: '感觉（进行时）',        example: { en: 'I remember feeling nervous before the speech.', cn: '我记得演讲前感到很紧张。' }, unit: 'U1', cat: 'transform' },
{ from: 'feel',      fromPos: 'v.',  toPos: 'v.-ed',       answer: 'felt',           meaning: '感觉（过去式）',         example: { en: 'She felt sad after hearing the news.', cn: '听到这个消息她感到难过。' }, unit: 'U1', cat: 'transform' },
{ from: 'powerful',  fromPos: 'adj.',toPos: 'n.',          answer: 'power',          meaning: '力量；权力',            example: { en: 'Knowledge is power, so we should read more books.', cn: '知识就是力量，所以我们要多读书。' }, unit: 'U1', cat: 'transform' },
{ from: 'separate',  fromPos: 'v.',  toPos: 'v.-ed/-pp',   answer: 'separated',      meaning: '分开（过去式/分词）',   example: { en: 'They arrived at the party together, but I think they separated.', cn: '他们一起到达派对，但我觉得他们分开了。' }, unit: 'U1', cat: 'transform' },
{ from: 'test',      fromPos: 'n./v.',toPos: 'v.-ing',     answer: 'testing',        meaning: '测试（进行时）',        example: { en: 'Some experts keep testing pollution in the water.', cn: '一些专家持续检测水中的污染。' }, unit: 'U1', cat: 'transform' },
{ from: 'success',   fromPos: 'n.',  toPos: 'adj.',        answer: 'successful',     meaning: '成功的',               example: { en: 'His attempt was successful and everyone was happy.', cn: '他的尝试很成功，大家都很高兴。' }, unit: 'U1', cat: 'transform' },

// ── Paper 2 (U2) 词族 ──
{ from: 'cut',       fromPos: 'v.',  toPos: 'v.-ing',      answer: 'cutting',        meaning: '切（注意双写t！）',      example: { en: 'Paper cutting art was born about 2,000 years ago in China.', cn: '剪纸艺术大约2000年前诞生于中国。' }, unit: 'U2', cat: 'transform' },
{ from: 'win',       fromPos: 'v.',  toPos: 'v.-ed',       answer: 'won',            meaning: '赢（不规则过去式）',     example: { en: 'They won a new bicycle in the competition.', cn: '他们在比赛中赢得了一辆新自行车。' }, unit: 'U2', cat: 'transform' },
{ from: 'win',       fromPos: 'v.',  toPos: 'n.',          answer: 'winner',         meaning: '获胜者',                example: { en: 'The winner got a gold medal.', cn: '获胜者得到了一枚金牌。' }, unit: 'U2', cat: 'transform' },
{ from: 'design',    fromPos: 'v.',  toPos: 'n.',          answer: 'designer',       meaning: '设计师',               example: { en: 'He wants to become a famous fashion designer.', cn: '他想成为一名著名的时装设计师。' }, unit: 'U2', cat: 'transform' },
{ from: 'design',    fromPos: 'v.',  toPos: 'v.-ed',       answer: 'designed',       meaning: '设计（过去式）',         example: { en: 'The designer designed different clothes every day.', cn: '这位设计师每天设计不同的衣服。' }, unit: 'U2', cat: 'transform' },
{ from: 'practice',  fromPos: 'v.',  toPos: 'v.-ed',       answer: 'practiced',      meaning: '练习（过去式，美式）',   example: { en: 'He practiced the piano for two hours.', cn: '他练了两个小时钢琴。' }, unit: 'U2', cat: 'transform' },
{ from: 'practice',  fromPos: 'v.',  toPos: 'adj.',        answer: 'practical',      meaning: '实用的',               example: { en: 'This is a practical method.', cn: '这是一个实用的方法。' }, unit: 'U2', cat: 'transform' },
{ from: 'choose',    fromPos: 'v.',  toPos: 'v.-ed',       answer: 'chose',          meaning: '选择（不规则过去式）',   example: { en: 'There are a few volunteers who chose some Chinese paintings.', cn: '有一些志愿者选择了一些中国画。' }, unit: 'U2', cat: 'transform' },
{ from: 'choose',    fromPos: 'v.',  toPos: 'n.',          answer: 'choice',         meaning: '选择（名词）',           example: { en: 'Making the right choice is important.', cn: '做出正确的选择很重要。' }, unit: 'U2', cat: 'transform' },
{ from: 'face',      fromPos: 'v.',  toPos: 'v.-ed',       answer: 'faced',          meaning: '面对（过去式）',         example: { en: 'She faced many challenges but never gave up.', cn: '她面对许多挑战但从未放弃。' }, unit: 'U2', cat: 'transform' },
{ from: 'run',       fromPos: 'v.',  toPos: 'v.-ing',      answer: 'running',        meaning: '跑（双写n+ing）',        example: { en: 'My uncle is a great player and he likes running.', cn: '我叔叔是个伟大的运动员，他喜欢跑步。' }, unit: 'U2', cat: 'transform' },
{ from: 'pretend',   fromPos: 'v.',  toPos: 'v.-ed',       answer: 'pretended',      meaning: '假装（过去式）',         example: { en: 'He pretended not to hear me.', cn: '他假装没听见我。' }, unit: 'U2', cat: 'transform' },
{ from: 'collect',   fromPos: 'v.',  toPos: 'n.',          answer: 'collector',      meaning: '收藏家',               example: { en: 'My father is a stamp collector with over 500 stamps.', cn: '我父亲是一个有500多张邮票的收藏家。' }, unit: 'U2', cat: 'transform' },
{ from: 'collect',   fromPos: 'v.',  toPos: 'v.-ed',       answer: 'collected',      meaning: '收集（过去式）',         example: { en: 'Sally collected fifty CDs of Faylor Swift since she was ten.', cn: 'Sally从十岁起就收集了50张Taylor Swift的CD。' }, unit: 'U2', cat: 'transform' },
{ from: 'honest',    fromPos: 'adj.',toPos: 'adv.',        answer: 'honestly',       meaning: '诚实地',               example: { en: 'He answered the teacher\'s questions honestly.', cn: '他诚实地回答了老师的问题。' }, unit: 'U2', cat: 'transform' },
{ from: 'honest',    fromPos: 'adj.',toPos: 'adj.(反义)', answer: 'dishonest',      meaning: '不诚实的',             example: { en: 'A dishonest person is not trusted by others.', cn: '不诚实的人不被他人信任。' }, unit: 'U2', cat: 'transform' },
{ from: 'dream',     fromPos: 'v.',  toPos: 'v.-ed(-pt)',  answer: 'dreamt',         meaning: '做梦（不规则过去式）', example: { en: 'I dreamt of becoming a lawyer when I was a child.', cn: '我小时候梦想成为律师。' }, unit: 'U2', cat: 'transform' },
{ from: 'disappoint',fromPos: 'v.',  toPos: 'adj.',        answer: 'disappointed',   meaning: '感到失望的（-ed）',     example: { en: 'You looked very disappointed yesterday because of your poor marks.', cn: '因为成绩不好，你昨天看起来很失望。' }, unit: 'U2', cat: 'transform' },
{ from: 'support',   fromPos: 'v.',  toPos: 'adj.',        answer: 'supportive',     meaning: '支持的',               example: { en: 'A supportive family helps children grow.', cn: '支持型的家庭有助于孩子成长。' }, unit: 'U2', cat: 'transform' },
{ from: 'support',   fromPos: 'v.',  toPos: 'v.-ing',      answer: 'supporting',     meaning: '支持（-ing形式）',       example: { en: 'The supporting point is clear.', cn: '论点很清楚。' }, unit: 'U2', cat: 'transform' },
{ from: 'bright',    fromPos: 'adj.',toPos: 'adv.',        answer: 'brightly',       meaning: '明亮地',               example: { en: 'On the night of Mid-Autumn Festival, the moon were shining brightly.', cn: '中秋之夜，月亮明亮地照耀着。' }, unit: 'U2', cat: 'transform' },
{ from: 'crowd',     fromPos: 'v./n.',toPos: 'adj.',       answer: 'crowded',        meaning: '拥挤的',               example: { en: 'The street is crowded with people on weekends.', cn: '周末街上挤满了人。' }, unit: 'U2', cat: 'transform' },
{ from: 'follow',    fromPos: 'v.',  toPos: 'v.-ed',       answer: 'followed',       meaning: '跟随（过去式）',         example: { en: 'When my grandmother died, many days followed and I missed her so much.', cn: '我祖母去世后，很多天过去了，我非常想念她。' }, unit: 'U2', cat: 'transform' },
{ from: 'deep',      fromPos: 'adj.',toPos: 'adv.',        answer: 'deeply',         meaning: '深深地',               example: { en: 'We are deeply thankful that more choices make us live a happy life.', cn: '我们深深感激更多选择让我们过上幸福生活。' }, unit: 'U2', cat: 'transform' },
{ from: 'radio',     fromPos: 'n.',  toPos: 'n.-pl',       answer: 'radios',         meaning: '收音机（复数）',       example: { en: 'He bought three radios.', cn: '他买了三台收音机。' }, unit: 'U2', cat: 'transform' },

/* ============================================================
   B. -ed / -ing 形容词辨析（cat: 'eding'）
   核心规则：-ed 修饰"人（的感受）"，-ing 修饰"物（给人的感受）"
============================================================ */
{ from: 'disappoint',fromPos: 'v.',  toPos: 'adj.-ed',    answer: 'disappointed',   meaning: '感到失望的（人）',       example: { en: 'I was disappointed with the result.', cn: '我对结果感到失望。' }, unit: 'U2', cat: 'eding' },
{ from: 'disappoint',fromPos: 'v.',  toPos: 'adj.-ing',   answer: 'disappointing',  meaning: '令人失望的（物）',      example: { en: 'The result was disappointing.', cn: '结果是令人失望的。' }, unit: 'U2', cat: 'eding' },
{ from: 'excite',    fromPos: 'v.',  toPos: 'adj.-ed',    answer: 'excited',        meaning: '感到兴奋的（人）',       example: { en: 'The children were excited about the trip.', cn: '孩子们对这次旅行感到兴奋。' }, unit: 'U1', cat: 'eding' },
{ from: 'excite',    fromPos: 'v.',  toPos: 'adj.-ing',   answer: 'exciting',       meaning: '令人兴奋的（物）',      example: { en: 'It was an exciting game.', cn: '那是一场令人兴奋的比赛。' }, unit: 'U4', cat: 'eding' },
{ from: 'interest',  fromPos: 'v.',  toPos: 'adj.-ed',    answer: 'interested',     meaning: '感兴趣的（人）',       example: { en: 'I am interested in English.', cn: '我对英语感兴趣。' }, unit: 'U1', cat: 'eding' },
{ from: 'interest',  fromPos: 'v.',  toPos: 'adj.-ing',   answer: 'interesting',    meaning: '令人感兴趣的（物）',    example: { en: 'The book is very interesting.', cn: '这本书很有趣。' }, unit: 'U1', cat: 'eding' },
{ from: 'bore',      fromPos: 'v.',  toPos: 'adj.-ed',    answer: 'bored',          meaning: '感到无聊的（人）',       example: { en: 'I felt bored at the meeting.', cn: '我在会议上感到无聊。' }, unit: 'U1', cat: 'eding' },
{ from: 'bore',      fromPos: 'v.',  toPos: 'adj.-ing',   answer: 'boring',         meaning: '令人无聊的（物）',      example: { en: 'The movie was boring.', cn: '这部电影很无聊。' }, unit: 'U1', cat: 'eding' },
{ from: 'surprise',  fromPos: 'v.',  toPos: 'adj.-ed',    answer: 'surprised',      meaning: '感到惊讶的（人）',       example: { en: 'She was surprised at the news.', cn: '她对这个消息感到惊讶。' }, unit: 'U1', cat: 'eding' },
{ from: 'surprise',  fromPos: 'v.',  toPos: 'adj.-ing',   answer: 'surprising',     meaning: '令人惊讶的（物）',      example: { en: 'The result was surprising.', cn: '结果是令人惊讶的。' }, unit: 'U1', cat: 'eding' },
{ from: 'confuse',   fromPos: 'v.',  toPos: 'adj.-ed',    answer: 'confused',       meaning: '感到困惑的（人）',       example: { en: 'I was confused by his words.', cn: '我被他的话搞糊涂了。' }, unit: 'U1', cat: 'eding' },
{ from: 'confuse',   fromPos: 'v.',  toPos: 'adj.-ing',   answer: 'confusing',      meaning: '令人困惑的（物）',      example: { en: 'The question was confusing.', cn: '这个问题令人困惑。' }, unit: 'U1', cat: 'eding' },
{ from: 'frighten',  fromPos: 'v.',  toPos: 'adj.-ed',    answer: 'frightened',     meaning: '感到害怕的（人）',       example: { en: 'The child was frightened by the loud noise.', cn: '孩子被巨大的声响吓到了。' }, unit: 'U1', cat: 'eding' },
{ from: 'frighten',  fromPos: 'v.',  toPos: 'adj.-ing',   answer: 'frightening',    meaning: '令人害怕的（物）',      example: { en: 'It was a frightening experience.', cn: '那是一次可怕的经历。' }, unit: 'U1', cat: 'eding' },
{ from: 'amaze',     fromPos: 'v.',  toPos: 'adj.-ed',    answer: 'amazed',         meaning: '感到惊叹的（人）',       example: { en: 'I was amazed at her progress.', cn: '我对她的进步感到惊叹。' }, unit: 'U1', cat: 'eding' },
{ from: 'amaze',     fromPos: 'v.',  toPos: 'adj.-ing',   answer: 'amazing',        meaning: '令人惊叹的（物）',      example: { en: 'The view was amazing.', cn: '景色令人惊叹。' }, unit: 'U1', cat: 'eding' },
{ from: 'embarrass', fromPos: 'v.',  toPos: 'adj.-ed',    answer: 'embarrassed',    meaning: '感到尴尬的（人）',       example: { en: 'He was embarrassed when he forgot her name.', cn: '他忘记她的名字时感到尴尬。' }, unit: 'U1', cat: 'eding' },
{ from: 'embarrass', fromPos: 'v.',  toPos: 'adj.-ing',   answer: 'embarrassing',   meaning: '令人尴尬的（物）',      example: { en: 'It was an embarrassing mistake.', cn: '这是一个令人尴尬的错误。' }, unit: 'U1', cat: 'eding' },
{ from: 'exhaust',   fromPos: 'v.',  toPos: 'adj.-ed',    answer: 'exhausted',      meaning: '筋疲力尽的（人）',      example: { en: 'After the marathon, she was exhausted.', cn: '马拉松后她筋疲力尽。' }, unit: 'U1', cat: 'eding' },
{ from: 'exhaust',   fromPos: 'v.',  toPos: 'adj.-ing',   answer: 'exhausting',     meaning: '令人筋疲力尽的（物）',  example: { en: 'The training was exhausting.', cn: '训练让人筋疲力尽。' }, unit: 'U1', cat: 'eding' },
{ from: 'challenge', fromPos: 'v.',  toPos: 'adj.-ed',    answer: 'challenged',     meaning: '受到挑战的（人）',      example: { en: 'I feel challenged by this task.', cn: '这项任务让我感到有挑战性。' }, unit: 'U1', cat: 'eding' },
{ from: 'encourage', fromPos: 'v.',  toPos: 'adj.-ing',   answer: 'encouraging',    meaning: '令人鼓舞的（物）',      example: { en: 'That is encouraging news.', cn: '那是令人鼓舞的消息。' }, unit: 'MIDDLE', cat: 'eding' },

/* ============================================================
   C. 同音 / 近形词辨析（cat: 'homo'）
   格式：pair=[wordA, wordB], question区分两者含义/用法
============================================================ */
{ from: 'weak',      fromPos: 'adj.',toPos: 'homo',        answer: 'week',           meaning: 'weak=虚弱的 / week=周',    example: { en: 'I go to the library once a week.', cn: '我每周去一次图书馆。' }, unit: 'U1', cat: 'homo',
  pair: ['weak (虚弱的)', 'week (星期)'] },
{ from: 'breath',    fromPos: 'n.',  toPos: 'homo',        answer: 'breathe',        meaning: 'breath=名词(呼吸) / breathe=动词(呼吸)', example: { en: 'Take a deep breath and breathe slowly.', cn: '深吸一口气，慢慢呼吸。' }, unit: 'U1', cat: 'homo',
  pair: ['breath (n. 呼吸)', 'breathe (v. 呼吸)'] },
{ from: 'alive',     fromPos: 'adj.',toPos: 'homo',        answer: 'live',           meaning: 'alive=活着的(表语) / live=居住/现场(动/形)', example: { en: 'The fish is still alive. / I live in Shanghai.', cn: '鱼还活着。/ 我住在上海。' }, unit: 'U2', cat: 'homo',
  pair: ['alive (活着的，表语)', 'live (居住 v. / 现场直播 adj.)'] },
{ from: 'alive',     fromPos: 'adj.',toPos: 'homo',        answer: 'lively',         meaning: 'alive=活着的 / lively=活泼的/生动的', example: { en: 'The class is very lively today.', cn: '今天课堂很活跃。' }, unit: 'U2', cat: 'homo',
  pair: ['alive (活着的)', 'lively (活泼的/生动的)'] },
{ from: 'alive',     fromPos: 'adj.',toPos: 'homo',        answer: 'living',         meaning: 'alive=活着的 / living=活着的(定语)/生计', example: { en: 'He is the greatest living writer in China.', cn: '他是中国在世的最伟大作家。' }, unit: 'U2', cat: 'homo',
  pair: ['alive (活着的，表语)', 'living (活着的，定语/名词)'] },
{ from: 'fun',       fromPos: 'n.',  toPos: 'homo',        answer: 'funny',          meaning: 'fun=不可数名词(乐趣) / funny=形容词(有趣的/滑稽的)', example: { en: 'We had a lot of fun at the party. / He is a funny man.', cn: '我们在派对上玩得很开心。/ 他是个有趣的人。' }, unit: 'U2', cat: 'homo',
  pair: ['fun (n. 乐趣，不可数)', 'funny (adj. 有趣的/滑稽的)'] },
{ from: 'deep',      fromPos: 'adj.',toPos: 'homo',        answer: 'deeply',         meaning: 'deep=深的(形) / deeply=深深地(副，多抽象)', example: { en: 'The water is deep. / I am deeply moved.', cn: '水很深。/ 我深受感动。' }, unit: 'U2', cat: 'homo',
  pair: ['deep (adj. 深的)', 'deeply (adv. 深深地)'] },
{ from: 'weather',   fromPos: 'n.',  toPos: 'homo',        answer: 'whether',        meaning: 'weather=天气(名) / whether=是否(连)', example: { en: 'The weather is nice today. / I don\'t know whether he will come.', cn: '今天天气很好。/ 不知道他是否会来。' }, unit: 'U1', cat: 'homo',
  pair: ['weather (n. 天气)', 'whether (conj. 是否)'] },
{ from: 'through',   fromPos: 'prep.',toPos: 'homo',       answer: 'though',         meaning: 'through=穿过(介) / though=虽然(连)', example: { en: 'He walked through the door. / Though it rained, we went out.', cn: '他穿过门走了出去。/ 虽然下雨了，我们还是出去了。' }, unit: 'U1', cat: 'homo',
  pair: ['through (prep. 穿过)', 'though (conj. 虽然)'] },
{ from: 'quite',     fromPos: 'adv.',toPos: 'homo',        answer: 'quiet',          meaning: 'quite=相当(副) / quiet=安静的(形)', example: { en: 'It\'s quite good. / Please be quiet!', cn: '这相当好。/ 请安静！' }, unit: 'U1', cat: 'homo',
  pair: ['quite (adv. 相当)', 'quiet (adj. 安静的)'] },
{ from: 'country',   fromPos: 'n.',  toPos: 'homo',        answer: 'countryside',    meaning: 'country=国家/乡村 / countryside=农村(特指)', example: { en: 'China is a great country. / I grew up in the countryside.', cn: '中国是一个伟大的国家。/ 我在农村长大。' }, unit: 'U1', cat: 'homo',
  pair: ['country (国家/乡村)', 'countryside (农村，特指郊外)'] },
{ from: 'home',      fromPos: 'n.',  toPos: 'homo',        answer: 'hometown',       meaning: 'home=家 / hometown=故乡/家乡', example: { en: 'I went home. / I miss my hometown.', cn: '我回家了。/ 我想念我的故乡。' }, unit: 'U1', cat: 'homo',
  pair: ['home (家)', 'hometown (故乡/家乡)'] },
{ from: 'across',    fromPos: 'prep.',toPos: 'homo',       answer: 'cross',          meaning: 'across=穿过(介，强调在另一边) / cross=横穿(动词)', example: { en: 'He swam across the river. / Cross the street carefully.', cn: '他游过了河。/ 小心过马路。' }, unit: 'U1', cat: 'homo',
  pair: ['across (prep. 在...对面/穿过)', 'cross (v. 横穿)'] },
{ from: 'past',      fromPos: 'prep.',toPos: 'homo',       answer: 'passed',         meaning: 'past=经过(介)/过去的(形) / passed=pass的过去式(动)', example: { en: 'He walked past the bank. / The bus has already passed.', cn: '他走过银行。/ 公车已经开过去了。' }, unit: 'U1', cat: 'homo',
  pair: ['past (prep. 经过/adj. 过去的)', 'passed (v. pass的过去式)'] },

];
