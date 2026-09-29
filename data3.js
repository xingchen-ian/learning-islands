// 澜大培优暑假中考必备词汇储备 - 基础篇 List 1
// 字段说明：
//   id          序号
//   word        单词 / 词组
//   pos         词性
//   meaning     中文释义
//   section     出处（按 list 分组）
//   derivatives 词性转换 [{ word, pos, meaning, example?: { en, cn } }]
//   usage       用法 / 搭配 [String]
//   example     例句 { en, cn }
//   synonyms / antonyms 近义 / 反义

const STORE_SUFFIX = 'summer1';  // 独立存储键，与 U1/U2 隔离

const UNIT_INFO = {
  "title": "暑假中考词汇 List 1",
  "subtitle": "基础篇 · 词汇练习",
  "total": 40
};

const VOCAB = [
  {
    "id": 1,
    "word": "surprise",
    "pos": "n./v.",
    "meaning": "惊奇，诧异／使惊奇，使诧异",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "surprised",
        "pos": "adj.",
        "meaning": "感到惊讶的",
        "example": {
          "en": "I was surprised at the news.",
          "cn": "我对这个消息感到惊讶。"
        }
      },
      {
        "word": "surprising",
        "pos": "adj.",
        "meaning": "令人惊讶的",
        "example": {
          "en": "The result is surprising.",
          "cn": "结果令人惊讶。"
        }
      }
    ],
    "usage": [
      "to one's surprise 令某人惊讶的是",
      "in surprise 惊讶地",
      "surprise sb. 使某人惊讶"
    ],
    "example": {
      "en": "To my surprise, he passed the exam.",
      "cn": "令我惊讶的是，他通过了考试。"
    }
  },
  {
    "id": 2,
    "word": "abroad",
    "pos": "adv.",
    "meaning": "到国外；在国外",
    "section": "List 1 基础篇",
    "usage": [
      "go abroad 出国",
      "study abroad 出国留学",
      "from abroad 从国外",
      "at home and abroad 国内外"
    ],
    "example": {
      "en": "He wants to study abroad.",
      "cn": "他想出国留学。"
    },
    "antonyms": [
      {
        "word": "home",
        "pos": "adv./n.",
        "meaning": "在家；家（反义）"
      }
    ]
  },
  {
    "id": 3,
    "word": "limit",
    "pos": "n./v.",
    "meaning": "极限；限制；限度；界限／限制；限定",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "limited",
        "pos": "adj.",
        "meaning": "有限的",
        "example": {
          "en": "Our time is limited.",
          "cn": "我们的时间是有限的。"
        }
      },
      {
        "word": "unlimited",
        "pos": "adj.",
        "meaning": "无限的",
        "example": {
          "en": "The Internet gives us unlimited information.",
          "cn": "互联网给我们提供了无限的信息。"
        }
      }
    ],
    "usage": [
      "limit ... to... 把……限制在……以内",
      "there is no limit to... ……是无限的",
      "speed limit 限速",
      "time limit 时间限制"
    ],
    "example": {
      "en": "You should limit your screen time.",
      "cn": "你应该限制看屏幕的时间。"
    }
  },
  {
    "id": 4,
    "word": "widely",
    "pos": "adv.",
    "meaning": "宽阔地；广泛地；普遍地",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "wide",
        "pos": "adj./adv.",
        "meaning": "宽的；广泛的／宽阔地",
        "example": {
          "en": "The river is very wide.",
          "cn": "这条河很宽。"
        }
      },
      {
        "word": "widen",
        "pos": "v.",
        "meaning": "加宽；变宽",
        "example": {
          "en": "They plan to widen the road.",
          "cn": "他们计划拓宽这条路。"
        }
      }
    ],
    "usage": [
      "be widely used 被广泛使用",
      "widely known 广为人知",
      "speak widely of 广泛谈论"
    ],
    "example": {
      "en": "English is widely used in the world.",
      "cn": "英语在世界范围内被广泛使用。"
    }
  },
  {
    "id": 5,
    "word": "March",
    "pos": "n.",
    "meaning": "三月",
    "section": "List 1 基础篇",
    "usage": [
      "注意首字母大写（月份专有名词）",
      "缩写：Mar."
    ],
    "example": {
      "en": "My birthday is in March.",
      "cn": "我的生日在三月。"
    }
  },
  {
    "id": 6,
    "word": "frightening",
    "pos": "adj.",
    "meaning": "恐怖的；令人害怕的",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "frighten",
        "pos": "v.",
        "meaning": "使惊吓；使恐惧",
        "example": {
          "en": "The loud noise frightened the baby.",
          "cn": "巨大的噪音把婴儿吓到了。"
        }
      },
      {
        "word": "frightened",
        "pos": "adj.",
        "meaning": "受惊的；害怕的",
        "example": {
          "en": "She looked frightened.",
          "cn": "她看起来很害怕。"
        }
      }
    ],
    "usage": [
      "a frightening experience 一次可怕的经历",
      "frightening news 令人恐惧的消息"
    ],
    "example": {
      "en": "It was a frightening experience.",
      "cn": "那是一次可怕的经历。"
    },
    "synonyms": [
      {
        "word": "scary",
        "pos": "adj.",
        "meaning": "可怕的（近义）"
      },
      {
        "word": "horrible",
        "pos": "adj.",
        "meaning": "恐怖的（近义）"
      }
    ]
  },
  {
    "id": 7,
    "word": "horrible",
    "pos": "adj.",
    "meaning": "令人恐惧的；恐怖的；极讨厌的",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "horribly",
        "pos": "adv.",
        "meaning": "非常；极其糟糕地",
        "example": {
          "en": "He played horribly.",
          "cn": "他表现得很糟糕。"
        }
      }
    ],
    "usage": [
      "horrible weather 糟糕的天气",
      "feel horrible 感觉很糟",
      "a horrible accident 一场可怕的事故"
    ],
    "example": {
      "en": "The food tasted horrible.",
      "cn": "这食物尝起来糟透了。"
    }
  },
  {
    "id": 8,
    "word": "operate",
    "pos": "v.",
    "meaning": "动手术，开刀；操作；运转；（机器等）运行",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "operation",
        "pos": "n.",
        "meaning": "手术；操作；运营",
        "example": {
          "en": "He had an operation last week.",
          "cn": "他上周做了手术。"
        }
      },
      {
        "word": "operator",
        "pos": "n.",
        "meaning": "操作员；接线员",
        "example": {
          "en": "She works as a telephone operator.",
          "cn": "她是一名电话接线员。"
        }
      }
    ],
    "usage": [
      "operate on sb. 给某人做手术",
      "operate a machine 操作机器",
      "operate on 对……起作用"
    ],
    "example": {
      "en": "The doctor operated on his leg.",
      "cn": "医生给他腿部做了手术。"
    }
  },
  {
    "id": 9,
    "word": "fisherman",
    "pos": "n.",
    "meaning": "渔夫，钓鱼的人",
    "section": "List 1 基础篇",
    "usage": [
      "复数形式：fishermen（不规则变化）",
      "go fishing 去钓鱼"
    ],
    "example": {
      "en": "The fisherman caught a big fish.",
      "cn": "渔夫钓到了一条大鱼。"
    }
  },
  {
    "id": 10,
    "word": "seldom",
    "pos": "adv.",
    "meaning": "很少，不常",
    "section": "List 1 基础篇",
    "usage": [
      "seldom 位于句首时，句子需要部分倒装：Seldom do I... 我很少……",
      "seldom = rarely 几乎不"
    ],
    "example": {
      "en": "I seldom eat fast food.",
      "cn": "我很少吃快餐。"
    },
    "antonyms": [
      {
        "word": "often",
        "pos": "adv.",
        "meaning": "经常（反义）"
      },
      {
        "word": "usually",
        "pos": "adv.",
        "meaning": "通常（反义）"
      }
    ]
  },
  {
    "id": 11,
    "word": "marry",
    "pos": "v.",
    "meaning": "（使）成婚，结婚；嫁；娶",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "married",
        "pos": "adj.",
        "meaning": "已婚的",
        "example": {
          "en": "They have been married for ten years.",
          "cn": "他们已经结婚十年了。"
        }
      },
      {
        "word": "marriage",
        "pos": "n.",
        "meaning": "婚姻",
        "example": {
          "en": "A happy marriage needs love and trust.",
          "cn": "幸福的婚姻需要爱和信任。"
        }
      }
    ],
    "usage": [
      "marry sb. 与某人结婚",
      "get married 结婚",
      "be married to sb. 与某人结婚"
    ],
    "example": {
      "en": "She married a doctor.",
      "cn": "她和一位医生结婚了。"
    }
  },
  {
    "id": 12,
    "word": "resource",
    "pos": "n.",
    "meaning": "资源",
    "section": "List 1 基础篇",
    "usage": [
      "natural resources 自然资源",
      "human resources 人力资源",
      "water resources 水资源",
      "renewable resources 可再生资源"
    ],
    "example": {
      "en": "We should protect our natural resources.",
      "cn": "我们应该保护自然资源。"
    }
  },
  {
    "id": 13,
    "word": "lawyer",
    "pos": "n.",
    "meaning": "律师",
    "section": "List 1 基础篇",
    "usage": [
      "consult a lawyer 咨询律师",
      "hire a lawyer 聘请律师"
    ],
    "example": {
      "en": "His father is a famous lawyer.",
      "cn": "他的父亲是一位著名的律师。"
    }
  },
  {
    "id": 14,
    "word": "furniture",
    "pos": "n.",
    "meaning": "（总称）家具",
    "section": "List 1 基础篇",
    "usage": [
      "不可数名词，不能说 a furniture 或 two furnitures",
      "a piece of furniture 一件家具",
      "pieces of furniture 多件家具"
    ],
    "example": {
      "en": "They bought some new furniture.",
      "cn": "他们买了一些新家具。"
    }
  },
  {
    "id": 15,
    "word": "partner",
    "pos": "n.",
    "meaning": "搭档；同伴；伙伴",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "partnership",
        "pos": "n.",
        "meaning": "合作关系；合伙关系",
        "example": {
          "en": "They work in partnership.",
          "cn": "他们合作工作。"
        }
      }
    ],
    "usage": [
      "dancing partner 舞伴",
      "business partner 商业伙伴",
      "partner with 与……合作/搭档"
    ],
    "example": {
      "en": "He is my tennis partner.",
      "cn": "他是我的网球搭档。"
    }
  },
  {
    "id": 16,
    "word": "harmful",
    "pos": "adj.",
    "meaning": "有害的；导致损害的",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "harm",
        "pos": "n./v.",
        "meaning": "伤害；危害／造成伤害",
        "example": {
          "en": "Smoking can harm your health.",
          "cn": "吸烟会损害你的健康。"
        }
      },
      {
        "word": "harmless",
        "pos": "adj.",
        "meaning": "无害的",
        "example": {
          "en": "This medicine is harmless.",
          "cn": "这种药是无害的。"
        }
      }
    ],
    "usage": [
      "be harmful to 对……有害",
      "harmful chemicals 有害化学物质",
      "do harm to 对……造成伤害"
    ],
    "example": {
      "en": "Smoking is harmful to your health.",
      "cn": "吸烟对健康有害。"
    }
  },
  {
    "id": 17,
    "word": "nervous",
    "pos": "adj.",
    "meaning": "紧张的；焦虑的",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "nerve",
        "pos": "n.",
        "meaning": "神经；勇气",
        "example": {
          "en": "She has nerves of steel.",
          "cn": "她有着钢铁般的神经（胆子很大）。"
        }
      }
    ],
    "usage": [
      "be nervous about 对……感到紧张",
      "feel nervous 感到紧张",
      "a nervous breakdown 神经崩溃"
    ],
    "example": {
      "en": "I always feel nervous before exams.",
      "cn": "考试前我总是感到紧张。"
    },
    "antonyms": [
      {
        "word": "calm",
        "pos": "adj.",
        "meaning": "冷静的（反义）"
      },
      {
        "word": "relaxed",
        "pos": "adj.",
        "meaning": "放松的（反义）"
      }
    ]
  },
  {
    "id": 18,
    "word": "challenge",
    "pos": "n./v.",
    "meaning": "挑战；质疑／向……挑战",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "challenging",
        "pos": "adj.",
        "meaning": "具有挑战性的",
        "example": {
          "en": "It's a challenging job.",
          "cn": "这是一份具有挑战性的工作。"
        }
      }
    ],
    "usage": [
      "face a challenge 面临挑战",
      "accept a challenge 接受挑战",
      "challenge sb. to sth. 向某人挑战做某事",
      "meet the challenge 迎接挑战"
    ],
    "example": {
      "en": "Learning English is a challenge for me.",
      "cn": "学英语对我来说是一个挑战。"
    }
  },
  {
    "id": 19,
    "word": "western",
    "pos": "adj.",
    "meaning": "西方的；西部的",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "west",
        "pos": "n./adv./adj.",
        "meaning": "西部；西方／向西／西部的",
        "example": {
          "en": "The sun sets in the west.",
          "cn": "太阳在西边落下。"
        }
      }
    ],
    "usage": [
      "Western culture 西方文化",
      "Western food 西餐",
      "the West 西方国家"
    ],
    "example": {
      "en": "I like Western food very much.",
      "cn": "我很喜欢西餐。"
    },
    "antonyms": [
      {
        "word": "eastern",
        "pos": "adj.",
        "meaning": "东方的；东部的（反义）"
      }
    ]
  },
  {
    "id": 20,
    "word": "manage",
    "pos": "v.",
    "meaning": "管理；经营；处理；设法对付；完成（困难的事）；明智地使用",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "manager",
        "pos": "n.",
        "meaning": "经理；管理者",
        "example": {
          "en": "She is the manager of this hotel.",
          "cn": "她是这家酒店的经理。"
        }
      },
      {
        "word": "management",
        "pos": "n.",
        "meaning": "管理；经营",
        "example": {
          "en": "Good management is important for success.",
          "cn": "良好的管理对成功很重要。"
        }
      }
    ],
    "usage": [
      "manage to do sth. 设法做成某事（强调成功）",
      "manage without 没有……也行",
      "manage one's time 管理时间"
    ],
    "example": {
      "en": "He managed to finish the work on time.",
      "cn": "他设法按时完成了工作。"
    }
  },
  {
    "id": 21,
    "word": "immediately",
    "pos": "adv.",
    "meaning": "立即，马上",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "immediate",
        "pos": "adj.",
        "meaning": "立即的；直接的",
        "example": {
          "en": "We need immediate action.",
          "cn": "我们需要立即采取行动。"
        }
      }
    ],
    "usage": [
      "immediately = at once = right now",
      "do sth. immediately 立即做某事"
    ],
    "example": {
      "en": "Please come here immediately.",
      "cn": "请立即到这里来。"
    }
  },
  {
    "id": 22,
    "word": "painting",
    "pos": "n.",
    "meaning": "画，油画，水彩画；绘画（艺术）",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "paint",
        "pos": "v./n.",
        "meaning": "绘画；油漆／颜料；油漆",
        "example": {
          "en": "She likes to paint flowers.",
          "cn": "她喜欢画花。"
        }
      },
      {
        "word": "painter",
        "pos": "n.",
        "meaning": "画家；油漆工",
        "example": {
          "en": "He is a famous painter.",
          "cn": "他是一位著名画家。"
        }
      }
    ],
    "usage": [
      "oil painting 油画",
      "watercolour painting 水彩画",
      "a painting by... 由……创作的画"
    ],
    "example": {
      "en": "There is a beautiful painting on the wall.",
      "cn": "墙上有一幅美丽的画。"
    }
  },
  {
    "id": 23,
    "word": "mistake",
    "pos": "n./v.",
    "meaning": "（言语或行为上的）错误，失误／弄错，误解",
    "section": "List 1 基础篇",
    "usage": [
      "make a mistake 犯错误",
      "by mistake 错误地；无意中",
      "learn from mistakes 从错误中学习",
      "mistake A for B 把A误认为B"
    ],
    "example": {
      "en": "Don't be afraid of making mistakes.",
      "cn": "不要怕犯错误。"
    }
  },
  {
    "id": 24,
    "word": "nationality",
    "pos": "n.",
    "meaning": "国籍；民族",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "nation",
        "pos": "n.",
        "meaning": "国家；民族",
        "example": {
          "en": "The whole nation celebrated the victory.",
          "cn": "全国人民庆祝了这场胜利。"
        }
      },
      {
        "word": "national",
        "pos": "adj.",
        "meaning": "国家的；民族的；全国的",
        "example": {
          "en": "It's a national holiday.",
          "cn": "这是一个全国性的假日。"
        }
      }
    ],
    "usage": [
      "What nationality are you? 你是什么国籍？",
      "dual nationality 双重国籍"
    ],
    "example": {
      "en": "What is your nationality?",
      "cn": "你的国籍是什么？"
    }
  },
  {
    "id": 25,
    "word": "income",
    "pos": "n.",
    "meaning": "收入；所得",
    "section": "List 1 基础篇",
    "usage": [
      "monthly income 月收入",
      "annual income 年收入",
      "low income 低收入",
      "income tax 所得税"
    ],
    "example": {
      "en": "His monthly income is quite high.",
      "cn": "他的月收入相当高。"
    }
  },
  {
    "id": 26,
    "word": "instruction",
    "pos": "n.",
    "meaning": "用法说明；命令，指令；指示；指导；（复数）操作指南",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "instruct",
        "pos": "v.",
        "meaning": "指示；指导；命令",
        "example": {
          "en": "The teacher instructed us to be quiet.",
          "cn": "老师指示我们要安静。"
        }
      },
      {
        "word": "instructor",
        "pos": "n.",
        "meaning": "教员；教练；指导者",
        "example": {
          "en": "He works as a swimming instructor.",
          "cn": "他是一名游泳教练。"
        }
      }
    ],
    "usage": [
      "follow instructions 遵循说明",
      "give instructions 发出指令",
      "instructions on how to use... 关于如何使用……的说明"
    ],
    "example": {
      "en": "Please read the instructions carefully.",
      "cn": "请仔细阅读说明书。"
    }
  },
  {
    "id": 27,
    "word": "satisfied",
    "pos": "adj.",
    "meaning": "满足的；满意的",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "satisfy",
        "pos": "v.",
        "meaning": "使满意；满足",
        "example": {
          "en": "Nothing can satisfy him.",
          "cn": "没有什么能让他满足。"
        }
      },
      {
        "word": "satisfaction",
        "pos": "n.",
        "meaning": "满意；满足",
        "example": {
          "en": "He smiled with satisfaction.",
          "cn": "他满意地笑了。"
        }
      }
    ],
    "usage": [
      "be satisfied with 对……感到满意",
      "to one's satisfaction 使某人满意的是"
    ],
    "example": {
      "en": "I'm satisfied with your work.",
      "cn": "我对你的工作很满意。"
    },
    "antonyms": [
      {
        "word": "dissatisfied",
        "pos": "adj.",
        "meaning": "不满意的（反义）"
      }
    ]
  },
  {
    "id": 28,
    "word": "straight",
    "pos": "adj./adv.",
    "meaning": "一直的；直的；正直的／一直地；直接地；坦率地",
    "section": "List 1 基础篇",
    "usage": [
      "go straight 直走",
      "a straight line 一条直线",
      "tell sb. straight 坦率地告诉某人",
      "straight away 立刻；马上"
    ],
    "example": {
      "en": "Go straight and turn left.",
      "cn": "直走然后左转。"
    }
  },
  {
    "id": 29,
    "word": "necessary",
    "pos": "adj.",
    "meaning": "必需的，必要的",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "necessarily",
        "pos": "adv.",
        "meaning": "必要地；必然地",
        "example": {
          "en": "Expensive doesn't necessarily mean good.",
          "cn": "贵不一定意味着好。"
        }
      },
      {
        "word": "unnecessary",
        "pos": "adj.",
        "meaning": "不必要的",
        "example": {
          "en": "Don't worry about unnecessary things.",
          "cn": "不要担心不必要的事情。"
        }
      }
    ],
    "usage": [
      "it is necessary (for sb.) to do sth. （某人）有必要做某事",
      "if necessary 如有必要",
      "when necessary 必要时"
    ],
    "example": {
      "en": "It is necessary to learn English well.",
      "cn": "学好英语是必要的。"
    }
  },
  {
    "id": 30,
    "word": "thought",
    "pos": "n.",
    "meaning": "思想；想法；思考（think 的过去式和过去分词）",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "think",
        "pos": "v.",
        "meaning": "想；认为；思考",
        "example": {
          "en": "I think you are right.",
          "cn": "我认为你是对的。"
        }
      },
      {
        "word": "thoughtful",
        "pos": "adj.",
        "meaning": "体贴的；深思的",
        "example": {
          "en": "Thank you for being so thoughtful.",
          "cn": "谢谢你这么体贴。"
        }
      }
    ],
    "usage": [
      "deep in thought 陷入沉思",
      "give thought to 考虑",
      "on second thought 再三考虑后",
      "at the thought of 一想到……"
    ],
    "example": {
      "en": "He sat there deep in thought.",
      "cn": "他坐在那里陷入沉思。"
    }
  },
  {
    "id": 31,
    "word": "perfect",
    "pos": "adj./v.",
    "meaning": "完美的；极好的／使完美；完善",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "perfectly",
        "pos": "adv.",
        "meaning": "完美地；完全地",
        "example": {
          "en": "She speaks English perfectly.",
          "cn": "她的英语说得完美无缺。"
        }
      }
    ],
    "usage": [
      "practice makes perfect 熟能生巧",
      "present perfect 现在完成时",
      "nothing is perfect 人无完人"
    ],
    "example": {
      "en": "Practice makes perfect.",
      "cn": "熟能生巧。"
    }
  },
  {
    "id": 32,
    "word": "floor",
    "pos": "n.",
    "meaning": "地面；地板；（楼房的）层",
    "section": "List 1 基础篇",
    "usage": [
      "on the floor 在地板上",
      "the ground floor 底层（英式）/ first floor 一楼（美式）",
      "the third floor 三楼（美式）= the second floor（英式）",
      "dance floor 舞池"
    ],
    "example": {
      "en": "My classroom is on the third floor.",
      "cn": "我的教室在三楼。"
    }
  },
  {
    "id": 33,
    "word": "excellent",
    "pos": "adj.",
    "meaning": "极好的，优秀的；杰出的",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "excellence",
        "pos": "n.",
        "meaning": "优秀；卓越",
        "example": {
          "en": "She won an award for excellence.",
          "cn": "她因卓越表现获奖了。"
        }
      }
    ],
    "usage": [
      "excellent in 在……方面优秀",
      "an excellent student 一个优秀的学生",
      "excellent work 出色的工作"
    ],
    "example": {
      "en": "He is an excellent student.",
      "cn": "他是一个优秀的学生。"
    }
  },
  {
    "id": 34,
    "word": "Christmas",
    "pos": "n.",
    "meaning": "圣诞节",
    "section": "List 1 基础篇",
    "usage": [
      "Merry Christmas! 圣诞快乐！",
      "Christmas Eve 平安夜（12月24日）",
      "Christmas tree 圣诞树",
      "Christmas present 礼物",
      "at Christmas 在圣诞节期间"
    ],
    "example": {
      "en": "We celebrate Christmas with our family.",
      "cn": "我们和家人一起庆祝圣诞节。"
    }
  },
  {
    "id": 35,
    "word": "state",
    "pos": "n./v.",
    "meaning": "状态；情形；国家；（美国的）州／陈述；说明",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "statement",
        "pos": "n.",
        "meaning": "声明；陈述",
        "example": {
          "en": "The company made a statement.",
          "cn": "公司发表了一份声明。"
        }
      }
    ],
    "usage": [
      "in a state of 处于……状态",
      "the United States 美国",
      "state one's opinion 陈述某人的观点"
    ],
    "example": {
      "en": "The building is in a bad state.",
      "cn": "这座建筑状况很差。"
    }
  },
  {
    "id": 36,
    "word": "similar",
    "pos": "adj.",
    "meaning": "相似的，像的",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "similarity",
        "pos": "n.",
        "meaning": "相似之处",
        "example": {
          "en": "There are many similarities between them.",
          "cn": "他们之间有很多相似之处。"
        }
      }
    ],
    "usage": [
      "be similar to 与……相似",
      "similarly 同样地；类似地",
      "in a similar way 以相似的方式"
    ],
    "example": {
      "en": "Your idea is similar to mine.",
      "cn": "你的想法和我的很相似。"
    },
    "antonyms": [
      {
        "word": "different",
        "pos": "adj.",
        "meaning": "不同的（反义）"
      }
    ]
  },
  {
    "id": 37,
    "word": "strict",
    "pos": "adj.",
    "meaning": "严格的；严密的；精确的",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "strictly",
        "pos": "adv.",
        "meaning": "严格地",
        "example": {
          "en": "The rules are strictly followed.",
          "cn": "这些规则被严格遵循。"
        }
      }
    ],
    "usage": [
      "be strict with sb. 对某人严格",
      "be strict in sth. 在某方面严格",
      "a strict teacher 一位严格的老师"
    ],
    "example": {
      "en": "My mother is strict with my studies.",
      "cn": "我妈妈对我的学习要求很严格。"
    }
  },
  {
    "id": 38,
    "word": "society",
    "pos": "n.",
    "meaning": "社会；社团；协会",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "social",
        "pos": "adj.",
        "meaning": "社会的；社交的",
        "example": {
          "en": "Social media is very popular.",
          "cn": "社交媒体非常流行。"
        }
      }
    ],
    "usage": [
      "modern society 现代社会",
      "make a contribution to society 为社会做贡献",
      "build a harmonious society 构建和谐社会"
    ],
    "example": {
      "en": "We should help build a better society.",
      "cn": "我们应该帮助建设一个更好的社会。"
    }
  },
  {
    "id": 39,
    "word": "exchange",
    "pos": "n.&v.",
    "meaning": "交换；交流；兑换",
    "section": "List 1 基础篇",
    "derivatives": [
      {
        "word": "exchangeable",
        "pos": "adj.",
        "meaning": "可交换的；可兑换的",
        "example": {
          "en": "This ticket is not exchangeable.",
          "cn": "这张票不可退换。"
        }
      }
    ],
    "usage": [
      "exchange A for B 用A换B",
      "exchange ideas 交流思想",
      "student exchange 学生交流",
      "foreign exchange 外汇"
    ],
    "example": {
      "en": "We exchanged phone numbers.",
      "cn": "我们交换了电话号码。"
    }
  },
  {
    "id": 40,
    "word": "nearby",
    "pos": "adv./adj.",
    "meaning": "在附近；附近的",
    "section": "List 1 基础篇",
    "usage": [
      "a nearby school 附近的学校",
      "live nearby 住在附近",
      "nearby = close by 在附近"
    ],
    "example": {
      "en": "Is there a supermarket nearby?",
      "cn": "附近有超市吗？"
    },
    "synonyms": [
      {
        "word": "close",
        "pos": "adj./adv.",
        "meaning": "近的；接近（近义）"
      }
    ]
  }
];
