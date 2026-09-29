// 上海新教材 7A Unit 2 "Strong mind" 词汇数据
// 字段说明：
//   id          序号
//   word        单词 / 词组
//   pos         词性
//   meaning     中文释义
//   section     教材出处（按页码分组）
//   derivatives 词性转换 [{ word, pos, meaning, example?: { en, cn } }]
//   usage       用法 / 搭配 [String]
//   example     例句 { en, cn }
//   synonyms / antonyms 近义 / 反义

const STORE_SUFFIX = 'u2';  // 与 U1 区分的独立存储键

const VOCAB = [
  {
    "id": 1,
    "word": "fear",
    "pos": "n./v.",
    "meaning": "害怕",
    "section": "P30-31 Viewing & Listening",
    "derivatives": [
      {
        "word": "fearful",
        "pos": "adj.",
        "meaning": "可怕的；担心的",
        "example": {
          "en": "The child was fearful of the dark.",
          "cn": "那个孩子很怕黑。"
        }
      },
      {
        "word": "fearless",
        "pos": "adj.",
        "meaning": "无畏的",
        "example": {
          "en": "A fearless climber reached the top.",
          "cn": "一位无畏的登山者登上了顶峰。"
        }
      }
    ],
    "usage": [
      "in fear 在恐惧中",
      "fear to do sth. 害怕做某事",
      "Everyone can speak out without fear. 每个人都能无畏地表达自己。"
    ],
    "example": {
      "en": "Everyone can speak out without fear.",
      "cn": "每个人都能无畏地表达自己。"
    }
  },
  {
    "id": 2,
    "word": "proud",
    "pos": "adj.",
    "meaning": "骄傲的",
    "section": "P30-31 Viewing & Listening",
    "derivatives": [
      {
        "word": "pride",
        "pos": "n.",
        "meaning": "骄傲",
        "example": {
          "en": "He felt a sense of pride in his work.",
          "cn": "他对自己的工作感到骄傲。"
        }
      }
    ],
    "usage": [
      "be proud of 为……感到骄傲",
      "Everyone can be proud of themselves/who they are. 每个人都能为自己感到骄傲。"
    ],
    "example": {
      "en": "Everyone can be proud of themselves.",
      "cn": "每个人都能为自己感到骄傲。"
    }
  },
  {
    "id": 3,
    "word": "radio",
    "pos": "n.",
    "meaning": "收音机，广播",
    "section": "P30-31 Viewing & Listening",
    "usage": [
      "listen to the radio 听收音机",
      "a radio programme 一个广播节目",
      "复数形式：radios"
    ],
    "example": {
      "en": "I listen to the radio every morning.",
      "cn": "我每天早晨听收音机。"
    }
  },
  {
    "id": 4,
    "word": "deep",
    "pos": "adj./adv.",
    "meaning": "低的，深的；深深地",
    "section": "P30-31 Viewing & Listening",
    "derivatives": [
      {
        "word": "depth",
        "pos": "n.",
        "meaning": "深度",
        "example": {
          "en": "The river has a depth of ten metres.",
          "cn": "这条河有十米深。"
        }
      }
    ],
    "usage": [
      "a deep hole 一个深洞",
      "dig deep 深挖"
    ],
    "example": {
      "en": "They dug a deep hole in the garden.",
      "cn": "他们在花园里挖了一个深洞。"
    }
  },
  {
    "id": 5,
    "word": "weak",
    "pos": "adj.",
    "meaning": "柔弱的，薄弱的",
    "section": "P30-31 Viewing & Listening",
    "derivatives": [
      {
        "word": "weaken",
        "pos": "v.",
        "meaning": "使变弱",
        "example": {
          "en": "The illness weakened her body.",
          "cn": "这场病使她的身体变弱了。"
        }
      },
      {
        "word": "weakness",
        "pos": "n.",
        "meaning": "弱点，缺点；虚弱",
        "example": {
          "en": "His weakness is eating too much sugar.",
          "cn": "他的弱点是吃太多糖。"
        }
      }
    ],
    "usage": [
      "be weak in... 在……方面薄弱"
    ],
    "example": {
      "en": "He is weak in maths.",
      "cn": "他数学比较薄弱。"
    }
  },
  {
    "id": 6,
    "word": "rough",
    "pos": "adj.",
    "meaning": "粗糙的，崎岖的",
    "section": "P30-31 Viewing & Listening",
    "usage": [
      "a rough road 一条崎岖的路",
      "a deep and rough voice 低沉而粗犷的嗓音"
    ],
    "example": {
      "en": "We drove along a rough road.",
      "cn": "我们沿着一条崎岖的路行驶。"
    }
  },
  {
    "id": 7,
    "word": "belief",
    "pos": "n.",
    "meaning": "信念",
    "section": "P30-31 Viewing & Listening",
    "derivatives": [
      {
        "word": "believe",
        "pos": "v.",
        "meaning": "相信",
        "example": {
          "en": "I believe you can do it.",
          "cn": "我相信你能做到。"
        }
      }
    ],
    "usage": [
      "have a belief in... 有一个……的信念"
    ],
    "example": {
      "en": "She has a strong belief in herself.",
      "cn": "她对自己有坚定的信念。"
    }
  },
  {
    "id": 8,
    "word": "talent",
    "pos": "n.",
    "meaning": "天赋",
    "section": "P30-31 Viewing & Listening",
    "derivatives": [
      {
        "word": "talented",
        "pos": "adj.",
        "meaning": "有天赋的",
        "example": {
          "en": "She is a talented musician.",
          "cn": "她是一位有天赋的音乐家。"
        }
      }
    ],
    "usage": [
      "have a talent for 有……的天赋"
    ],
    "example": {
      "en": "He has a talent for drawing.",
      "cn": "他有绘画的天赋。"
    }
  },
  {
    "id": 9,
    "word": "programme",
    "pos": "n.",
    "meaning": "电视节目",
    "section": "P30-31 Viewing & Listening",
    "usage": [
      "a TV programme 一个电视节目",
      "make a radio programme 制作一个广播节目",
      "美式拼写：program"
    ],
    "example": {
      "en": "We watched a TV programme about animals.",
      "cn": "我们看了一个关于动物的电视节目。"
    }
  },
  {
    "id": 10,
    "word": "perform",
    "pos": "v.",
    "meaning": "表演；进行",
    "section": "P30-31 Viewing & Listening",
    "derivatives": [
      {
        "word": "performance",
        "pos": "n.",
        "meaning": "表演；表现",
        "example": {
          "en": "The band gave a great performance.",
          "cn": "乐队奉献了一场精彩的演出。"
        }
      }
    ],
    "usage": [
      "perform an operation 做手术"
    ],
    "example": {
      "en": "The students performed a play.",
      "cn": "学生们表演了一出话剧。"
    }
  },
  {
    "id": 11,
    "word": "afraid",
    "pos": "adj.",
    "meaning": "害怕的",
    "section": "P30-31 Viewing & Listening",
    "usage": [
      "be afraid of 害怕……",
      "Feifei used to be afraid of speaking. 菲菲以前害怕说话。"
    ],
    "example": {
      "en": "I am afraid of the dark.",
      "cn": "我怕黑。"
    },
    "synonyms": [
      {
        "word": "frightened",
        "pos": "adj.",
        "meaning": "害怕的（近义）"
      },
      {
        "word": "scared",
        "pos": "adj.",
        "meaning": "害怕的（近义）"
      }
    ]
  },
  {
    "id": 12,
    "word": "deal",
    "pos": "v./n.",
    "meaning": "处理；对付（deal-dealt-dealt）",
    "section": "P30-31 Viewing & Listening",
    "usage": [
      "deal with 处理；对付",
      "deal with fear 应对恐惧",
      "a great deal of 大量的，修饰不可数名词"
    ],
    "example": {
      "en": "We should deal with the problem now.",
      "cn": "我们现在应该处理这个问题。"
    }
  },
  {
    "id": 13,
    "word": "set up a special group",
    "pos": "短语",
    "meaning": "成立一个特别小组",
    "section": "P30-31 Viewing & Listening",
    "example": {
      "en": "They set up a special group to help others.",
      "cn": "他们成立了一个特别小组去帮助别人。"
    }
  },
  {
    "id": 14,
    "word": "a talk show",
    "pos": "n. 短语",
    "meaning": "一个访谈节目",
    "section": "P30-31 Viewing & Listening",
    "example": {
      "en": "He hosts a talk show on TV.",
      "cn": "他在电视上主持一档访谈节目。"
    }
  },
  {
    "id": 15,
    "word": "used to do sth.",
    "pos": "短语",
    "meaning": "过去常常做某事",
    "section": "P30-31 Viewing & Listening",
    "usage": [
      "Feifei used to be afraid of speaking. 菲菲以前害怕说话。"
    ],
    "example": {
      "en": "I used to play football every day.",
      "cn": "我以前每天踢足球。"
    }
  },
  {
    "id": 16,
    "word": "give talks/speeches",
    "pos": "短语",
    "meaning": "发表演讲",
    "section": "P30-31 Viewing & Listening",
    "example": {
      "en": "The teacher gave a talk to the class.",
      "cn": "老师给全班发表了演讲。"
    }
  },
  {
    "id": 17,
    "word": "keep telling me",
    "pos": "短语",
    "meaning": "一直告诉我",
    "section": "P30-31 Viewing & Listening",
    "example": {
      "en": "My mum keeps telling me to study hard.",
      "cn": "我妈妈一直告诉我好好学习。"
    }
  },
  {
    "id": 18,
    "word": "be brave enough",
    "pos": "短语",
    "meaning": "足够勇敢",
    "section": "P30-31 Viewing & Listening",
    "example": {
      "en": "Be brave enough to try new things.",
      "cn": "要足够勇敢去尝试新事物。"
    }
  },
  {
    "id": 19,
    "word": "kids like me",
    "pos": "短语",
    "meaning": "像我一样的孩子",
    "section": "P30-31 Viewing & Listening",
    "example": {
      "en": "Kids like me love playing outside.",
      "cn": "像我一样的孩子喜欢在外面玩。"
    }
  },
  {
    "id": 20,
    "word": "I can think of my height as a weakness.",
    "pos": "句型",
    "meaning": "我可以把我的身高看作是个弱点。",
    "section": "P30-31 Viewing & Listening",
    "example": {
      "en": "I can think of my height as a weakness.",
      "cn": "我可以把我的身高看作是个弱点。"
    }
  },
  {
    "id": 21,
    "word": "It's wrong to make fun of others.",
    "pos": "句型",
    "meaning": "嘲笑别人是不对的。",
    "section": "P30-31 Viewing & Listening",
    "usage": [
      "make fun of... 嘲笑…，取笑…"
    ],
    "example": {
      "en": "It's wrong to make fun of others.",
      "cn": "嘲笑别人是不对的。"
    }
  },
  {
    "id": 22,
    "word": "It's really important to feel good about ourselves.",
    "pos": "句型",
    "meaning": "我们对自己感觉良好真的很重要。",
    "section": "P30-31 Viewing & Listening",
    "usage": [
      "Feeling good about ourselves is really important. 我们对自己感觉良好真的很重要。"
    ],
    "example": {
      "en": "It's really important to feel good about ourselves.",
      "cn": "我们对自己感觉良好真的很重要。"
    }
  },
  {
    "id": 23,
    "word": "heart",
    "pos": "n.",
    "meaning": "心脏；内心；感情",
    "section": "P32-33 Speaking",
    "derivatives": [
      {
        "word": "warm-hearted",
        "pos": "adj.",
        "meaning": "热心的",
        "example": {
          "en": "She is a warm-hearted girl.",
          "cn": "她是一个热心的女孩。"
        }
      }
    ],
    "usage": [
      "The doctor listened to his heart. 医生听了他的心脏。",
      "from the bottom of one's heart 衷心地，打从心底里"
    ],
    "example": {
      "en": "The doctor listened to his heart.",
      "cn": "医生听了他的心脏。"
    }
  },
  {
    "id": 24,
    "word": "wrong",
    "pos": "adj./adv.",
    "meaning": "错误的；有故障的",
    "section": "P32-33 Speaking",
    "usage": [
      "do something wrong 做错事",
      "It's wrong to tell lies. 说谎是不对的。",
      "Something is wrong with the machine. 这台机器出毛病了。",
      "go wrong 出错；出故障"
    ],
    "example": {
      "en": "Something is wrong with the machine.",
      "cn": "这台机器出毛病了。"
    },
    "antonyms": [
      {
        "word": "right",
        "pos": "adj.",
        "meaning": "正确的（反义）"
      }
    ]
  },
  {
    "id": 25,
    "word": "difficulty",
    "pos": "n.",
    "meaning": "困难；难题；困境",
    "section": "P32-33 Speaking",
    "usage": [
      "have difficulty (in) doing sth. 做某事有困难",
      "The company is in financial difficulty. 这家公司处于财务困境中。",
      "meet (with)/face difficulties 面对困难",
      "复数形式：difficulties"
    ],
    "example": {
      "en": "I have difficulty learning maths.",
      "cn": "我学数学有困难。"
    }
  },
  {
    "id": 26,
    "word": "collect/raise money",
    "pos": "短语",
    "meaning": "筹钱",
    "section": "P32-33 Speaking",
    "example": {
      "en": "They collected money for the poor.",
      "cn": "他们为穷人筹钱。"
    }
  },
  {
    "id": 27,
    "word": "remember his grandpa",
    "pos": "短语",
    "meaning": "纪念他的爷爷",
    "section": "P32-33 Speaking",
    "example": {
      "en": "We planted a tree to remember his grandpa.",
      "cn": "我们种了一棵树来纪念他的爷爷。"
    }
  },
  {
    "id": 28,
    "word": "popular",
    "pos": "adj.",
    "meaning": "流行的，受欢迎的",
    "section": "P32-33 Speaking",
    "derivatives": [
      {
        "word": "popularity",
        "pos": "n.",
        "meaning": "普及；流行",
        "example": {
          "en": "The app gained popularity quickly.",
          "cn": "这个应用很快流行起来。"
        }
      }
    ],
    "usage": [
      "be popular with/among 受……欢迎",
      "This singer is very popular with young people. 这位歌手很受年轻人欢迎。",
      "a popular song 一首流行歌曲"
    ],
    "example": {
      "en": "This singer is very popular with young people.",
      "cn": "这位歌手很受年轻人欢迎。"
    }
  },
  {
    "id": 29,
    "word": "style",
    "pos": "n.",
    "meaning": "风格；样式",
    "section": "P32-33 Speaking",
    "usage": [
      "a new style of dress 一种新的服装样式",
      "in the style of 以……的风格方式"
    ],
    "example": {
      "en": "She likes the style of this dress.",
      "cn": "她喜欢这件连衣裙的样式。"
    }
  },
  {
    "id": 30,
    "word": "teenager",
    "pos": "n.",
    "meaning": "青少年",
    "section": "P32-33 Speaking",
    "usage": [
      "Most teenagers like listening to pop music. 大多数青少年喜欢听流行音乐。"
    ],
    "example": {
      "en": "Most teenagers like listening to pop music.",
      "cn": "大多数青少年喜欢听流行音乐。"
    }
  },
  {
    "id": 31,
    "word": "deal with fears",
    "pos": "短语",
    "meaning": "应对恐惧",
    "section": "P32-33 Speaking",
    "example": {
      "en": "We should learn to deal with fears.",
      "cn": "我们应该学会应对恐惧。"
    }
  },
  {
    "id": 32,
    "word": "go after/chase their dreams",
    "pos": "短语",
    "meaning": "追逐他们的梦想",
    "section": "P32-33 Speaking",
    "example": {
      "en": "They work hard to chase their dreams.",
      "cn": "他们努力拼搏去追逐梦想。"
    }
  },
  {
    "id": 33,
    "word": "honest",
    "pos": "adj.",
    "meaning": "诚实的",
    "section": "P32-33 Speaking",
    "derivatives": [
      {
        "word": "honesty",
        "pos": "n.",
        "meaning": "诚实",
        "example": {
          "en": "Honesty is the best policy.",
          "cn": "诚实是上策。"
        }
      }
    ],
    "usage": [
      "be honest with 对……诚实",
      "To be honest,... 老实说，……"
    ],
    "example": {
      "en": "Be honest with your friends.",
      "cn": "对你的朋友要诚实。"
    },
    "antonyms": [
      {
        "word": "dishonest",
        "pos": "adj.",
        "meaning": "不诚实的（反义）"
      }
    ]
  },
  {
    "id": 34,
    "word": "do something else",
    "pos": "短语",
    "meaning": "做一些别的事情",
    "section": "P32-33 Speaking",
    "example": {
      "en": "Let's do something else for fun.",
      "cn": "我们做点别的事找点乐子吧。"
    }
  },
  {
    "id": 35,
    "word": "alive",
    "pos": "adj.",
    "meaning": "活着的，在世的；有活力的，活跃的",
    "section": "P32-33 Speaking",
    "usage": [
      "表示“活着”，常作表语，如：He is still alive. 他还活着。",
      "keep Chinese traditions alive 继承中国传统",
      "Keep your mind alive. 保持思维活跃。"
    ],
    "example": {
      "en": "He is still alive after the accident.",
      "cn": "事故之后他还活着。"
    },
    "synonyms": [
      {
        "word": "living",
        "pos": "adj.",
        "meaning": "活着的（近义）"
      },
      {
        "word": "live",
        "pos": "adj.",
        "meaning": "活着的（近义，通常只修饰动物）"
      }
    ],
    "antonyms": [
      {
        "word": "dead",
        "pos": "adj.",
        "meaning": "死了的（反义）"
      }
    ]
  },
  {
    "id": 36,
    "word": "It takes much/a lot of time to do paper cutting",
    "pos": "句型",
    "meaning": "剪纸需要花费很多时间。",
    "section": "P32-33 Speaking",
    "example": {
      "en": "It takes much time to do paper cutting.",
      "cn": "剪纸需要花费很多时间。"
    }
  },
  {
    "id": 37,
    "word": "What makes you keep on with paper cutting?",
    "pos": "句型",
    "meaning": "是什么让你坚持剪纸这件事？",
    "section": "P32-33 Speaking",
    "example": {
      "en": "What makes you keep on with paper cutting?",
      "cn": "是什么让你坚持剪纸这件事？"
    }
  },
  {
    "id": 38,
    "word": "How do you feel about vegetable animals?",
    "pos": "句型",
    "meaning": "你对蔬菜动物有什么看法？",
    "section": "P32-33 Speaking",
    "usage": [
      "=What do you think of vegetable animals? 你对蔬菜动物有什么看法？"
    ],
    "example": {
      "en": "How do you feel about vegetable animals?",
      "cn": "你对蔬菜动物有什么看法？"
    }
  },
  {
    "id": 39,
    "word": "What do you like best about paper cutting?",
    "pos": "句型",
    "meaning": "你最喜欢剪纸的哪个方面？",
    "section": "P32-33 Speaking",
    "example": {
      "en": "What do you like best about paper cutting?",
      "cn": "你最喜欢剪纸的哪个方面？"
    }
  },
  {
    "id": 40,
    "word": "next to her name",
    "pos": "短语",
    "meaning": "在她名字旁边",
    "section": "P34-37 Reading",
    "example": {
      "en": "He wrote a note next to her name.",
      "cn": "他在她名字旁边写了一个便条。"
    }
  },
  {
    "id": 41,
    "word": "final",
    "pos": "adj.",
    "meaning": "最后的；最终的",
    "section": "P34-37 Reading",
    "derivatives": [
      {
        "word": "finally",
        "pos": "adv.",
        "meaning": "最后；终于",
        "example": {
          "en": "Finally, they won the game.",
          "cn": "最后他们赢了比赛。"
        }
      }
    ],
    "usage": [
      "the final exam 期末考试",
      "in the final team list 在最终的队员名单中"
    ],
    "example": {
      "en": "This is the final exam of the term.",
      "cn": "这是本学期的期末考试。"
    }
  },
  {
    "id": 42,
    "word": "later",
    "pos": "adj./adv.",
    "meaning": "后来的；以后的／后来",
    "section": "P34-37 Reading",
    "usage": [
      "at a later date = later 在以后的日子",
      "See you later. 再见；回头见。"
    ],
    "example": {
      "en": "See you later!",
      "cn": "回头见！"
    }
  },
  {
    "id": 43,
    "word": "funny",
    "pos": "adj.",
    "meaning": "有趣的；滑稽的；好笑的",
    "section": "P34-37 Reading",
    "derivatives": [
      {
        "word": "fun",
        "pos": "n./adj.",
        "meaning": "乐趣；娱乐／有趣的",
        "example": {
          "en": "We had a lot of fun at the party.",
          "cn": "我们在派对上玩得很开心。"
        }
      }
    ],
    "usage": [
      "a funny story 一个有趣的故事",
      "a girl in a funny costume 穿着滑稽服装的女孩"
    ],
    "example": {
      "en": "He told a funny story.",
      "cn": "他讲了一个有趣的故事。"
    }
  },
  {
    "id": 44,
    "word": "put on the costume",
    "pos": "短语",
    "meaning": "穿上演出服",
    "section": "P34-37 Reading",
    "example": {
      "en": "The actors put on the costume.",
      "cn": "演员们穿上了演出服。"
    }
  },
  {
    "id": 45,
    "word": "give up hope",
    "pos": "短语",
    "meaning": "放弃希望（give-gave-given）",
    "section": "P34-37 Reading",
    "usage": [
      "give up (doing) sth. 放弃（做）某事"
    ],
    "example": {
      "en": "Don't give up hope.",
      "cn": "不要放弃希望。"
    }
  },
  {
    "id": 46,
    "word": "be good for you",
    "pos": "短语",
    "meaning": "对你有好处",
    "section": "P34-37 Reading",
    "usage": [
      "be good for... 对……有好处"
    ],
    "example": {
      "en": "Vegetables are good for you.",
      "cn": "蔬菜对你有好处。"
    }
  },
  {
    "id": 47,
    "word": "instead",
    "pos": "adv.",
    "meaning": "代替；反而；却",
    "section": "P34-37 Reading",
    "usage": [
      "instead of (doing)... 代替；而不是",
      "I'll go instead of him. 我将代替他去。",
      "I will watch the game instead of playing in the game. 我会观看比赛，而不是参加比赛。"
    ],
    "example": {
      "en": "I will watch the game instead of playing.",
      "cn": "我会观看比赛，而不是参加比赛。"
    }
  },
  {
    "id": 48,
    "word": "ring",
    "pos": "n./v.",
    "meaning": "戒指；环；铃声／（使）发出钟声；打电话（ring-rang-rung）",
    "section": "P34-37 Reading",
    "usage": [
      "a wedding ring 一枚结婚戒指",
      "The bell is ringing. 铃在响。",
      "ring in my head 在我脑中回响",
      "ring sb. up = make a phone call to sb. 给某人打电话"
    ],
    "example": {
      "en": "The bell is ringing.",
      "cn": "铃在响。"
    }
  },
  {
    "id": 49,
    "word": "feel the call of the football field",
    "pos": "短语",
    "meaning": "感受到足球场的呼唤",
    "section": "P34-37 Reading",
    "example": {
      "en": "He felt the call of the football field.",
      "cn": "他感受到了足球场的呼唤。"
    }
  },
  {
    "id": 50,
    "word": "after all",
    "pos": "短语",
    "meaning": "毕竟",
    "section": "P34-37 Reading",
    "example": {
      "en": "He is, after all, just a child.",
      "cn": "毕竟，他只是个孩子。"
    }
  },
  {
    "id": 51,
    "word": "decide",
    "pos": "v.",
    "meaning": "决定；选定",
    "section": "P34-37 Reading",
    "derivatives": [
      {
        "word": "decision",
        "pos": "n.",
        "meaning": "决定；抉择",
        "example": {
          "en": "She made a big decision.",
          "cn": "她做了一个重大的决定。"
        }
      }
    ],
    "usage": [
      "decide (not) to do sth. 决定（不）做某事",
      "He decided to go abroad. 他决定出国。",
      "make a decision 做出一个决定"
    ],
    "example": {
      "en": "He decided to go abroad.",
      "cn": "他决定出国。"
    }
  },
  {
    "id": 52,
    "word": "become",
    "pos": "v.",
    "meaning": "变得；成为（become-became-become）",
    "section": "P34-37 Reading",
    "example": {
      "en": "She became a doctor.",
      "cn": "她成为了一名医生。"
    }
  },
  {
    "id": 53,
    "word": "through",
    "pos": "prep./adv.",
    "meaning": "穿过；通过／自始至终；从头到尾",
    "section": "P34-37 Reading",
    "usage": [
      "go through the forest 穿过森林",
      "Read the letter through. 把信从头到尾读一遍。"
    ],
    "example": {
      "en": "We walked through the forest.",
      "cn": "我们穿过了森林。"
    }
  },
  {
    "id": 54,
    "word": "through careful preparation",
    "pos": "短语",
    "meaning": "通过精心的准备",
    "section": "P34-37 Reading",
    "usage": [
      "make some preparation 做些准备"
    ],
    "example": {
      "en": "We won through careful preparation.",
      "cn": "我们通过精心的准备取得了胜利。"
    }
  },
  {
    "id": 55,
    "word": "breath",
    "pos": "n.",
    "meaning": "呼吸；气息",
    "section": "P34-37 Reading",
    "derivatives": [
      {
        "word": "breathe",
        "pos": "v.",
        "meaning": "呼吸",
        "example": {
          "en": "Breathe deeply and relax.",
          "cn": "深呼吸，放松一下。"
        }
      }
    ],
    "usage": [
      "take a deep breath (take-took-taken) 深吸一口气",
      "hold one's breath (hold-held-held) 屏住呼吸",
      "breathe deeply 深呼吸"
    ],
    "example": {
      "en": "Take a deep breath.",
      "cn": "深吸一口气。"
    }
  },
  {
    "id": 56,
    "word": "bright",
    "pos": "adj.",
    "meaning": "明亮的；聪明的；鲜艳的",
    "section": "P34-37 Reading",
    "derivatives": [
      {
        "word": "brightly",
        "pos": "adv.",
        "meaning": "明亮地；鲜明地",
        "example": {
          "en": "The sun shone brightly.",
          "cn": "阳光明亮地照耀着。"
        }
      }
    ],
    "usage": [
      "as bright as a sunflower 像向日葵一样灿烂",
      "a bright room 明亮的房间",
      "a bright student 聪明的学生",
      "bright colors 鲜艳的颜色"
    ],
    "example": {
      "en": "The room is bright and clean.",
      "cn": "房间明亮又干净。"
    }
  },
  {
    "id": 57,
    "word": "coach",
    "pos": "n./v.",
    "meaning": "教练；长途客车；四轮大马车／训练；指导",
    "section": "P34-37 Reading",
    "usage": [
      "a football coach 足球教练",
      "He coaches the basketball team. 他训练篮球队。"
    ],
    "example": {
      "en": "Our football coach is very kind.",
      "cn": "我们的足球教练很和善。"
    }
  },
  {
    "id": 58,
    "word": "run into the coach",
    "pos": "短语",
    "meaning": "偶遇教练（run-ran-run）",
    "section": "P34-37 Reading",
    "example": {
      "en": "I ran into the coach at the shop.",
      "cn": "我在商店偶遇了教练。"
    }
  },
  {
    "id": 59,
    "word": "enter",
    "pos": "v.",
    "meaning": "进入；参加；登记",
    "section": "P34-37 Reading",
    "derivatives": [
      {
        "word": "entrance",
        "pos": "n.",
        "meaning": "入口；进入",
        "example": {
          "en": "The entrance is on the left.",
          "cn": "入口在左边。"
        }
      }
    ],
    "usage": [
      "enter the room 进入房间",
      "enter (for) a competition （报名）参加比赛",
      "Why not enter for the designing competition? 为什么不报名参加设计比赛呢？",
      "enter one's name 登记姓名"
    ],
    "example": {
      "en": "Please enter the room quietly.",
      "cn": "请安静地进入房间。"
    }
  },
  {
    "id": 60,
    "word": "design",
    "pos": "n./v.",
    "meaning": "设计；图案；构思",
    "section": "P34-37 Reading",
    "derivatives": [
      {
        "word": "designer",
        "pos": "n.",
        "meaning": "设计师",
        "example": {
          "en": "He is a famous designer.",
          "cn": "他是一位著名的设计师。"
        }
      }
    ],
    "usage": [
      "the design of a building 建筑物的设计",
      "design a dress 设计一件连衣裙"
    ],
    "example": {
      "en": "She designed a beautiful dress.",
      "cn": "她设计了一件漂亮的连衣裙。"
    }
  },
  {
    "id": 61,
    "word": "chance",
    "pos": "n.",
    "meaning": "机会；可能性",
    "section": "P34-37 Reading",
    "usage": [
      "have a chance to do sth. 有机会做某事",
      "I have a chance to visit Beijing. 我有机会去北京。",
      "have no chance but to do sth. 别无选择只能做某事"
    ],
    "example": {
      "en": "I have a chance to visit Beijing.",
      "cn": "我有机会去北京。"
    }
  },
  {
    "id": 62,
    "word": "sink",
    "pos": "v.",
    "meaning": "下沉；沉没；下陷（sink-sank-sunk）",
    "section": "P34-37 Reading",
    "example": {
      "en": "The ship sank.",
      "cn": "船沉没了。"
    }
  },
  {
    "id": 63,
    "word": "crowd",
    "pos": "n./v.",
    "meaning": "人群；群众；一伙／挤满；使拥挤",
    "section": "P34-37 Reading",
    "derivatives": [
      {
        "word": "crowded",
        "pos": "adj.",
        "meaning": "拥挤的",
        "example": {
          "en": "The bus was crowded.",
          "cn": "公交车很拥挤。"
        }
      }
    ],
    "usage": [
      "a crowd of people 一群人",
      "The room was crowded with furniture. 房间里堆满了家具。"
    ],
    "example": {
      "en": "A crowd of people waited outside.",
      "cn": "一群人在外面等着。"
    }
  },
  {
    "id": 64,
    "word": "respond",
    "pos": "v.",
    "meaning": "回答；响应；作出反应",
    "section": "P34-37 Reading",
    "derivatives": [
      {
        "word": "response",
        "pos": "n.",
        "meaning": "回答；响应",
        "example": {
          "en": "She gave no response.",
          "cn": "她没有回应。"
        }
      }
    ],
    "usage": [
      "respond to... 对……作出反应",
      "He didn't respond to my question. 他没有回答我的问题。"
    ],
    "example": {
      "en": "He didn't respond to my question.",
      "cn": "他没有回答我的问题。"
    }
  },
  {
    "id": 65,
    "word": "disappoint",
    "pos": "v.",
    "meaning": "使失望；使扫兴",
    "section": "P34-37 Reading",
    "derivatives": [
      {
        "word": "disappointed",
        "pos": "adj.",
        "meaning": "失望的",
        "example": {
          "en": "I was disappointed at the news.",
          "cn": "我对这个消息感到失望。"
        }
      },
      {
        "word": "disappointing",
        "pos": "adj.",
        "meaning": "令人失望的",
        "example": {
          "en": "The film was disappointing.",
          "cn": "这部电影令人失望。"
        }
      },
      {
        "word": "disappointment",
        "pos": "n.",
        "meaning": "失望",
        "example": {
          "en": "To my disappointment, it rained.",
          "cn": "令我失望的是，下雨了。"
        }
      }
    ],
    "usage": [
      "disappoint sb. 使某人失望",
      "to one's disappointment 令某人失望的是",
      "With every disappointment comes a new chance! 每一次失望都会带来新的机会！"
    ],
    "example": {
      "en": "Don't disappoint your parents.",
      "cn": "不要让你的父母失望。"
    }
  },
  {
    "id": 66,
    "word": "Claire dreamed of playing on her school football team",
    "pos": "句型",
    "meaning": "Claire 梦想着在学校足球队踢球。",
    "section": "P34-37 Reading",
    "example": {
      "en": "Claire dreamed of playing on her school football team.",
      "cn": "Claire 梦想着在学校足球队踢球。"
    }
  },
  {
    "id": 67,
    "word": "Things won't always go your way",
    "pos": "句型",
    "meaning": "事情不会总是按照你的意愿发展。",
    "section": "P34-37 Reading",
    "example": {
      "en": "Things won't always go your way.",
      "cn": "事情不会总是按照你的意愿发展。"
    }
  },
  {
    "id": 68,
    "word": "had better + 动词原形",
    "pos": "短语",
    "meaning": "最好做某事（用于提建议）",
    "section": "P38-39 Grammar",
    "usage": [
      "You had better go to bed early. 你最好早点睡觉。",
      "缩写：You'd better...",
      "否定形式：had better not do 最好不要做某事"
    ],
    "example": {
      "en": "You had better go to bed early.",
      "cn": "你最好早点睡觉。"
    }
  },
  {
    "id": 69,
    "word": "blind",
    "pos": "adj./v.",
    "meaning": "失明，盲目／使失明，蒙蔽",
    "section": "P38-39 Grammar",
    "derivatives": [
      {
        "word": "blindly",
        "pos": "adv.",
        "meaning": "盲目地",
        "example": {
          "en": "Don't follow others blindly.",
          "cn": "不要盲目地跟从别人。"
        }
      },
      {
        "word": "blindness",
        "pos": "n.",
        "meaning": "失明",
        "example": {
          "en": "He suffered from blindness.",
          "cn": "他饱受失明之苦。"
        }
      }
    ],
    "usage": [
      "follow others blindly 盲目地跟从别人",
      "a blind man 一个盲人",
      "the blind 盲人群体",
      "be blind to... = turn a blind eye to... 对……视而不见",
      "The accident blinded him. 那场事故使他失明了。"
    ],
    "example": {
      "en": "Don't follow others blindly.",
      "cn": "不要盲目地跟从别人。"
    }
  },
  {
    "id": 70,
    "word": "make fun of",
    "pos": "短语",
    "meaning": "取笑；嘲弄",
    "section": "P38-39 Grammar",
    "usage": [
      "make fun of that poor kid 取笑那个穷孩子",
      "Don't make fun of others. 不要取笑别人。"
    ],
    "example": {
      "en": "Don't make fun of others.",
      "cn": "不要取笑别人。"
    }
  },
  {
    "id": 71,
    "word": "angry",
    "pos": "adj.",
    "meaning": "生气的；愤怒的",
    "section": "P38-39 Grammar",
    "derivatives": [
      {
        "word": "angrily",
        "pos": "adv.",
        "meaning": "愤怒地",
        "example": {
          "en": "He left angrily.",
          "cn": "他愤怒地离开了。"
        }
      },
      {
        "word": "anger",
        "pos": "n.",
        "meaning": "愤怒",
        "example": {
          "en": "He spoke in anger.",
          "cn": "他愤怒地说。"
        }
      }
    ],
    "usage": [
      "be angry with sb. 生某人的气",
      "be angry at/about sth. 因某事生气",
      "He is angry with me. 他生我的气。",
      "feel angry with my friend 对我的朋友感到生气",
      "She is angry at/about his words. 她对他的话感到生气。"
    ],
    "example": {
      "en": "He is angry with me.",
      "cn": "他生我的气。"
    }
  },
  {
    "id": 72,
    "word": "write a diary",
    "pos": "短语",
    "meaning": "写日记（复数 diaries）",
    "section": "P38-39 Grammar",
    "usage": [
      "复数：diaries"
    ],
    "example": {
      "en": "I write a diary every night.",
      "cn": "我每天晚上写日记。"
    }
  },
  {
    "id": 73,
    "word": "calm down / cool down",
    "pos": "短语",
    "meaning": "平静下来；镇定下来",
    "section": "P38-39 Grammar",
    "usage": [
      "可单独使用，也可接人作宾语。如：Calm down! 冷静点！Calm her down. 让她平静下来。"
    ],
    "example": {
      "en": "Calm down and think.",
      "cn": "冷静下来想一想。"
    }
  },
  {
    "id": 74,
    "word": "keep silent",
    "pos": "短语",
    "meaning": "保持沉默",
    "section": "P38-39 Grammar",
    "usage": [
      "He kept silent during the meeting. 会议期间他保持沉默。"
    ],
    "example": {
      "en": "He kept silent during the meeting.",
      "cn": "会议期间他保持沉默。"
    }
  },
  {
    "id": 75,
    "word": "in a...manner/way",
    "pos": "短语",
    "meaning": "以……的方式（manner 前常用形容词修饰）",
    "section": "P38-39 Grammar",
    "usage": [
      "in a calm manner/way 用一种冷静的方式",
      "in a polite manner/way 以礼貌的方式",
      "in a friendly manner/way 以友好的方式"
    ],
    "example": {
      "en": "He spoke in a polite manner.",
      "cn": "他以礼貌的方式说话。"
    }
  },
  {
    "id": 76,
    "word": "care about her height",
    "pos": "短语",
    "meaning": "在意她的身高",
    "section": "P38-39 Grammar",
    "example": {
      "en": "Don't care too much about her height.",
      "cn": "不要太在意她的身高。"
    }
  },
  {
    "id": 77,
    "word": "focus",
    "pos": "v./n.",
    "meaning": "集中（注意力、精力等）于／焦点；中心",
    "section": "P38-39 Grammar",
    "derivatives": [
      {
        "word": "focused",
        "pos": "adj.",
        "meaning": "集中的",
        "example": {
          "en": "Keep a focused mind.",
          "cn": "保持专注的心态。"
        }
      }
    ],
    "usage": [
      "focus on = pay attention to 集中于……",
      "Focus on your study. 专注于你的学习。",
      "focus on how she looks 关注她的外表",
      "the focus of attention 关注的焦点（复数 focuses）"
    ],
    "example": {
      "en": "Focus on your study.",
      "cn": "专注于你的学习。"
    }
  },
  {
    "id": 78,
    "word": "in the spelling competition",
    "pos": "短语",
    "meaning": "在拼写竞赛上",
    "section": "P38-39 Grammar",
    "example": {
      "en": "He won in the spelling competition.",
      "cn": "他在拼写竞赛中获胜了。"
    }
  },
  {
    "id": 79,
    "word": "worry",
    "pos": "v./n.",
    "meaning": "担心；担忧；烦恼（worry-worried-worried）",
    "section": "P38-39 Grammar",
    "derivatives": [
      {
        "word": "worried",
        "pos": "adj.",
        "meaning": "担心的；感到焦虑",
        "example": {
          "en": "I feel worried about the exam.",
          "cn": "我对考试感到焦虑。"
        }
      }
    ],
    "usage": [
      "worry about 为……担心",
      "Don't worry about me. 别为我担心。",
      "She has a lot of worries. 她有很多烦恼。"
    ],
    "example": {
      "en": "Don't worry about me.",
      "cn": "别为我担心。"
    }
  },
  {
    "id": 80,
    "word": "waste time playing games",
    "pos": "短语",
    "meaning": "浪费时间玩游戏",
    "section": "P38-39 Grammar",
    "usage": [
      "waste time doing sth. 浪费时间做某事"
    ],
    "example": {
      "en": "Don't waste time playing games.",
      "cn": "不要浪费时间玩游戏。"
    }
  },
  {
    "id": 81,
    "word": "deskmate",
    "pos": "n.",
    "meaning": "同桌",
    "section": "P40-41 Writing",
    "usage": [
      "My deskmate is very kind. 我的同桌非常友善。"
    ],
    "example": {
      "en": "My deskmate is very kind.",
      "cn": "我的同桌非常友善。"
    }
  },
  {
    "id": 82,
    "word": "bear",
    "pos": "v.",
    "meaning": "忍受；承受／生育；出生／携带；拿（bear-bore-born/borne）",
    "section": "P40-41 Writing",
    "usage": [
      "表示“忍受；承受”，如 I can't bear the pain. 我忍受不了这种疼痛。",
      "I can't/couldn't bear/stand the noise any more/longer. 我再也忍受不了这个噪音了。",
      "表示“生育；出生”，如 She bore a son last year. 她去年生了个儿子。",
      "表示“携带；拿”，如 bear a burden. 背负重担。"
    ],
    "example": {
      "en": "I can't bear the noise.",
      "cn": "我忍受不了这个噪音。"
    }
  },
  {
    "id": 83,
    "word": "keep pulling my hair",
    "pos": "短语",
    "meaning": "不停地拉扯我的头发",
    "section": "P40-41 Writing",
    "example": {
      "en": "Stop keeping pulling my hair!",
      "cn": "别再不停地拉扯我的头发了！"
    }
  },
  {
    "id": 84,
    "word": "while",
    "pos": "conj./n.",
    "meaning": "当…的时候；在…期间／然而；可是／一会儿；一段时间",
    "section": "P40-41 Writing",
    "usage": [
      "①当…的时候；在…期间，如 While I was reading, he came in. 我正在读书时，他进来了。",
      "②然而；可是，表对比，如 I like tea while she likes coffee. 我喜欢茶，而她喜欢咖啡。",
      "一会儿；一段时间，如 after a while 过了一会儿；think for a while 思考了一会儿"
    ],
    "example": {
      "en": "While I was reading, he came in.",
      "cn": "我正在读书时，他进来了。"
    }
  },
  {
    "id": 85,
    "word": "stop doing that",
    "pos": "短语",
    "meaning": "停止那样做",
    "section": "P40-41 Writing",
    "example": {
      "en": "Please stop doing that.",
      "cn": "请停止那样做。"
    }
  },
  {
    "id": 86,
    "word": "say sorry to me",
    "pos": "短语",
    "meaning": "跟我说对不起",
    "section": "P40-41 Writing",
    "example": {
      "en": "He said sorry to me.",
      "cn": "他跟我说了对不起。"
    }
  },
  {
    "id": 87,
    "word": "firmly",
    "pos": "adv.",
    "meaning": "坚定地；坚决地",
    "section": "P40-41 Writing",
    "derivatives": [
      {
        "word": "firm",
        "pos": "adj.",
        "meaning": "坚定的；牢固的",
        "example": {
          "en": "He has a firm belief.",
          "cn": "他有坚定的信念。"
        }
      }
    ],
    "usage": [
      "He held my hand firmly. 他紧紧地握住我的手。"
    ],
    "example": {
      "en": "He held my hand firmly.",
      "cn": "他紧紧地握住我的手。"
    }
  },
  {
    "id": 88,
    "word": "surprised",
    "pos": "adj.",
    "meaning": "感到惊讶的",
    "section": "P40-41 Writing",
    "derivatives": [
      {
        "word": "surprising",
        "pos": "adj.",
        "meaning": "令人惊讶的",
        "example": {
          "en": "The news was surprising.",
          "cn": "这个消息令人惊讶。"
        }
      },
      {
        "word": "surprise",
        "pos": "v./n.",
        "meaning": "使惊讶；惊喜",
        "example": {
          "en": "The gift surprised her.",
          "cn": "这个礼物让她惊喜。"
        }
      }
    ],
    "usage": [
      "be surprised at 对……感到惊讶",
      "I was surprised at his words. 我对他的话感到惊讶。"
    ],
    "example": {
      "en": "I was surprised at his words.",
      "cn": "我对他的话感到惊讶。"
    }
  },
  {
    "id": 89,
    "word": "finally",
    "pos": "adv.",
    "meaning": "最后；终于",
    "section": "P40-41 Writing",
    "usage": [
      "通常用于描述事情的最终结果或结束",
      "My worry finally went away. 我的担忧终于消失了。",
      "Finally, they reached the top of the mountain. 最后，他们到达了山顶。"
    ],
    "example": {
      "en": "Finally, they reached the top of the mountain.",
      "cn": "最后，他们到达了山顶。"
    }
  },
  {
    "id": 90,
    "word": "worse",
    "pos": "adj./adv.",
    "meaning": "更坏的；更差的／更坏；更差地（bad 比较级）",
    "section": "P40-41 Writing",
    "usage": [
      "The situation is getting worse. 情况变得更糟了。",
      "He did worse than before. 他做得比以前更差。"
    ],
    "example": {
      "en": "The situation is getting worse.",
      "cn": "情况变得更糟了。"
    }
  },
  {
    "id": 91,
    "word": "bravely",
    "pos": "adv.",
    "meaning": "勇敢地",
    "section": "P40-41 Writing",
    "derivatives": [
      {
        "word": "brave",
        "pos": "adj.",
        "meaning": "勇敢的",
        "example": {
          "en": "Be brave and try again.",
          "cn": "勇敢一点，再试一次。"
        }
      }
    ],
    "usage": [
      "He fought bravely. 他勇敢地战斗。",
      "It is helpful to speak out bravely. 勇敢地说出来是有帮助的。"
    ],
    "example": {
      "en": "He fought bravely.",
      "cn": "他勇敢地战斗。"
    }
  },
  {
    "id": 92,
    "word": "past",
    "pos": "adj./n./prep./adv.",
    "meaning": "过去的；昔日的／过去；往事／经过；超过／经过",
    "section": "P40-41 Writing",
    "usage": [
      "形容词：in the past few days 在过去的几天里",
      "名词：the past of the city 这座城市的过去",
      "介词：walk past the shop 走过商店",
      "副词：The car drove past. 汽车开过去了。"
    ],
    "example": {
      "en": "In the past few days, we worked hard.",
      "cn": "在过去的几天里，我们很努力。"
    }
  },
  {
    "id": 93,
    "word": "keep back our feelings",
    "pos": "短语",
    "meaning": "压抑我们自己的感受",
    "section": "P42-43 Discovery & Project",
    "example": {
      "en": "Don't keep back our feelings.",
      "cn": "不要压抑我们自己的感受。"
    }
  },
  {
    "id": 94,
    "word": "expert",
    "pos": "n./adj.",
    "meaning": "专家；行家／内行的",
    "section": "P42-43 Discovery & Project",
    "usage": [
      "an expert in history 历史方面的专家",
      "be expert at/in... 在……方面是内行"
    ],
    "example": {
      "en": "He is an expert in history.",
      "cn": "他是历史方面的专家。"
    }
  },
  {
    "id": 95,
    "word": "negative",
    "pos": "adj.",
    "meaning": "消极的；否定的；负面的",
    "section": "P42-43 Discovery & Project",
    "usage": [
      "deal with negative feelings 处理负面情绪",
      "a negative attitude 消极的态度"
    ],
    "example": {
      "en": "Don't be so negative.",
      "cn": "不要这么消极。"
    },
    "antonyms": [
      {
        "word": "positive",
        "pos": "adj.",
        "meaning": "积极的；肯定的；正面的（反义）"
      }
    ]
  },
  {
    "id": 96,
    "word": "make things better",
    "pos": "短语",
    "meaning": "让事情变得更好",
    "section": "P42-43 Discovery & Project",
    "example": {
      "en": "We should make things better.",
      "cn": "我们应该让事情变得更好。"
    }
  },
  {
    "id": 97,
    "word": "share similar experiences",
    "pos": "短语",
    "meaning": "分享类似的经历",
    "section": "P42-43 Discovery & Project",
    "example": {
      "en": "We share similar experiences.",
      "cn": "我们分享类似的经历。"
    }
  },
  {
    "id": 98,
    "word": "give advice / give suggestions",
    "pos": "短语",
    "meaning": "提出建议【U】／提出建议【C】",
    "section": "P42-43 Discovery & Project",
    "example": {
      "en": "Let me give you some advice.",
      "cn": "让我给你一些建议。"
    }
  },
  {
    "id": 99,
    "word": "give them a try",
    "pos": "短语",
    "meaning": "试试看它们",
    "section": "P42-43 Discovery & Project",
    "example": {
      "en": "Why not give them a try?",
      "cn": "为什么不试试看呢？"
    }
  },
  {
    "id": 100,
    "word": "chain",
    "pos": "n./v.",
    "meaning": "链子；链条；连锁店／束缚",
    "section": "P42-43 Discovery & Project",
    "usage": [
      "a gold chain 金链子",
      "a chain store 连锁店",
      "The dog was chained to the tree. 狗被用链子拴在树上。"
    ],
    "example": {
      "en": "The dog was chained to the tree.",
      "cn": "狗被用链子拴在树上。"
    }
  },
  {
    "id": 101,
    "word": "in the face of fears or difficulties",
    "pos": "短语",
    "meaning": "在面对恐惧或困难时",
    "section": "P42-43 Discovery & Project",
    "example": {
      "en": "We should be brave in the face of fears or difficulties.",
      "cn": "在面对恐惧或困难时，我们应该勇敢。"
    }
  },
  {
    "id": 102,
    "word": "pressure",
    "pos": "n.",
    "meaning": "压力；压强；压迫【U】",
    "section": "P42-43 Discovery & Project",
    "usage": [
      "pressure from studies 来自学习的压力",
      "under pressure 在压力下",
      "The pressure of work is too great. 工作压力太大了。"
    ],
    "example": {
      "en": "He is under pressure at work.",
      "cn": "他工作压力很大。"
    }
  },
  {
    "id": 103,
    "word": "set goals for our studies",
    "pos": "短语",
    "meaning": "为我们的学习设定目标",
    "section": "P42-43 Discovery & Project",
    "example": {
      "en": "We set goals for our studies.",
      "cn": "我们为学习设定了目标。"
    }
  },
  {
    "id": 104,
    "word": "work towards our goals",
    "pos": "短语",
    "meaning": "朝着我们的目标努力",
    "section": "P42-43 Discovery & Project",
    "example": {
      "en": "We work towards our goals every day.",
      "cn": "我们每天朝着目标努力。"
    }
  },
  {
    "id": 105,
    "word": "see them as a chance to grow",
    "pos": "短语",
    "meaning": "把它们看作成长的机会",
    "section": "P42-43 Discovery & Project",
    "example": {
      "en": "See them as a chance to grow.",
      "cn": "把它们看作成长的机会。"
    }
  },
  {
    "id": 106,
    "word": "ask for help",
    "pos": "短语",
    "meaning": "寻求帮助",
    "section": "P42-43 Discovery & Project",
    "example": {
      "en": "Don't be afraid to ask for help.",
      "cn": "不要害怕寻求帮助。"
    }
  },
  {
    "id": 107,
    "word": "feel lonely",
    "pos": "短语",
    "meaning": "感到孤独（lonely 孤独的／alone 独自）",
    "section": "P42-43 Discovery & Project",
    "usage": [
      "feel lonely 感到孤独",
      "You're not alone. 你不是一个人！"
    ],
    "example": {
      "en": "I feel lonely when I'm alone.",
      "cn": "我独自一人时感到孤独。"
    }
  },
  {
    "id": 108,
    "word": "It's wonderful to be a teenager.",
    "pos": "句型",
    "meaning": "成为青少年是一件很棒的事。",
    "section": "P42-43 Discovery & Project",
    "example": {
      "en": "It's wonderful to be a teenager.",
      "cn": "成为青少年是一件很棒的事。"
    }
  },
  {
    "id": 109,
    "word": "Have you heard of breathing exercises?",
    "pos": "句型",
    "meaning": "你听说过呼吸练习吗？",
    "section": "P42-43 Discovery & Project",
    "example": {
      "en": "Have you heard of breathing exercises?",
      "cn": "你听说过呼吸练习吗？"
    }
  },
  {
    "id": 110,
    "word": "control",
    "pos": "n./v.",
    "meaning": "控制；管理；支配",
    "section": "P42-43 Discovery & Project",
    "derivatives": [
      {
        "word": "controlled",
        "pos": "adj.",
        "meaning": "受控制的",
        "example": {
          "en": "The fire was controlled at last.",
          "cn": "火势最终被控制住了。"
        }
      },
      {
        "word": "controlling",
        "pos": "adj.",
        "meaning": "控制的；支配的",
        "example": {
          "en": "He has a controlling manner.",
          "cn": "他有一种支配性的态度。"
        }
      }
    ],
    "usage": [
      "out of control 失去控制",
      "under control 处于控制之下",
      "control one's temper 控制自己的脾气",
      "You feel it's hard to take control of/control your feelings. 你觉得很难控制自己的情绪。"
    ],
    "example": {
      "en": "You should control your temper.",
      "cn": "你应该控制自己的脾气。"
    }
  },
  {
    "id": 111,
    "word": "compare",
    "pos": "v.",
    "meaning": "比较；对比",
    "section": "P42-43 Discovery & Project",
    "derivatives": [
      {
        "word": "comparison",
        "pos": "n.",
        "meaning": "比较；对比",
        "example": {
          "en": "In comparison, this one is better.",
          "cn": "相比之下，这个更好。"
        }
      }
    ],
    "usage": [
      "compare ... with... 把……与……相比较",
      "compare ... to... 把……比作……",
      "Compare this photo with that one. 把这张照片和那张相比较。",
      "He compared the girl to a flower. 他把这个女孩比作一朵花。"
    ],
    "example": {
      "en": "Compare this photo with that one.",
      "cn": "把这张照片和那张相比较。"
    }
  },
  {
    "id": 112,
    "word": "We had better focus on our progress instead of comparing ourselves with others.",
    "pos": "句型",
    "meaning": "我们最好把注意力放在我们的进步上，而非和别人比较。",
    "section": "P42-43 Discovery & Project",
    "example": {
      "en": "We had better focus on our progress instead of comparing ourselves with others.",
      "cn": "我们最好把注意力放在我们的进步上，而非和别人比较。"
    }
  },
  {
    "id": 113,
    "word": "enemy",
    "pos": "n.",
    "meaning": "敌人；仇人；敌军",
    "section": "P42-43 Discovery & Project",
    "usage": [
      "The two countries were enemies during the war. 在战争期间，这两国是敌人。",
      "复数形式：enemies"
    ],
    "example": {
      "en": "The two countries were enemies during the war.",
      "cn": "在战争期间，这两国是敌人。"
    }
  },
  {
    "id": 114,
    "word": "attract",
    "pos": "v.",
    "meaning": "吸引；引起……的注意",
    "section": "P42-43 Discovery & Project",
    "derivatives": [
      {
        "word": "attraction",
        "pos": "n.",
        "meaning": "吸引；吸引力；吸引人的事物",
        "example": {
          "en": "The city has great attraction.",
          "cn": "这座城市很有吸引力。"
        }
      },
      {
        "word": "attractive",
        "pos": "adj.",
        "meaning": "吸引人的；有魅力的",
        "example": {
          "en": "She is an attractive girl.",
          "cn": "她是一个有魅力的女孩。"
        }
      }
    ],
    "usage": [
      "attract sb.'s attention 吸引某人的注意",
      "The beautiful scenery attracts many tourists. 美丽的风景吸引了许多游客。"
    ],
    "example": {
      "en": "The beautiful scenery attracts many tourists.",
      "cn": "美丽的风景吸引了许多游客。"
    }
  },
  {
    "id": 115,
    "word": "person",
    "pos": "n.",
    "meaning": "人；个人（复数 people）",
    "section": "P42-43 Discovery & Project",
    "usage": [
      "复数形式 people",
      "a person of great influence 有很大影响力的人"
    ],
    "example": {
      "en": "He is a kind person.",
      "cn": "他是一个善良的人。"
    }
  }
];

// 单元信息
const UNIT_INFO = {
  "title": "7A Unit 2  Strong mind",
  "subtitle": "强大的内心 · 词汇练习",
  "total": 115
};
